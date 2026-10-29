// Hangout rig pipeline: "sprite skins", the reference sprite's own pixels cut
// per bone group and laid over the atlas parts (docs/hangout-activity.md
// §3.2). The skins carry the sprite's exact shading and the small details
// the atlas pieces don't reproduce (chains, necklace, wristband, neck shadow).
// Atlas parts stay underneath and only show where motion uncovers them.
//
//   node activity/tools/build-sprite-skin.js <character> [--outfit <name>]
//
// With rig.json `outfits`, it works on one outfit (default: defaultOutfit):
// its reference sprite, its parts plus the shared ones, its `spriteSkin`.
// Skins go to <outfit dir>/skin/ and replace that outfit's skin_* parts.
//
// Configured by rig.json `spriteSkin`:
//   { "dilate": 3, "skip": ["head", "hand_r", "hand_l"],
//     "groups": [
//       { "id": "skin_torso_front", "bone": "torso", "zRange": [250, 399] },
//       { "id": "skin_sleeve_lower_r", "bone": "forearm_r",
//         "parts": ["sleeve_lower_r"], "mesh": { "bend": true, "zone": 0.35 } },
//       ... ] }
//
// 1. Renders the rest pose and records, per sprite pixel, the topmost part.
// 2. Each part maps to a group: one that names it in `parts`, else the group
//    whose `bone` is its nearest ancestor (and whose zRange holds its z).
//    Parts under `skip` keep their own art (the head has the portrait
//    layer; hands swap poses). Sprite pixels no part covers go to the
//    nearest covered pixel's group, within 8 px.
// 3. Each group's pixels, grown by `dilate` px under anything drawn above
//    it so motion opens no gaps, are cut from the sprite into
//    skin/<id>.png and attached to the group's bone just above its parts.

import fs from "node:fs";
import path from "node:path";
import { createCanvas, loadImage } from "canvas";

import { isVisible, moodParts, resolveMood } from "../src/rig/expressions.js";
import { invert, apply, solve, spriteMatrix, withOutfit } from "../src/rig/skeleton.js";
import { readPng, writePng } from "./slice-atlas.js";

const isSkin = (id) => id.startsWith("skin_");

async function main() {
  const character = process.argv[2];
  if (!character) {
    console.error("usage: node activity/tools/build-sprite-skin.js <character> [--outfit <name>]");
    process.exit(1);
  }
  const outfitIdx = process.argv.indexOf("--outfit");
  const dir = path.join("assets/rig", character);
  const rigFile = path.join(dir, "rig.json");
  const source = JSON.parse(fs.readFileSync(rigFile, "utf8"));
  const rig = withOutfit(source, outfitIdx === -1 ? source.defaultOutfit : process.argv[outfitIdx + 1]);
  const cfg = rig.spriteSkin;
  if (!cfg) throw new Error(`rig.json has no spriteSkin config${rig.outfit ? ` for ${rig.outfit}` : ""}`);
  rig.parts = rig.parts.filter((p) => !isSkin(p.id));
  const skinDir = path.posix.join(rig.dir ?? ".", "skin");
  // Skin parts this run makes; they replace the outfit's old ones at the end.
  const made = [];
  const add = (entry) => {
    rig.parts.push(entry);
    made.push(entry);
  };

  const sprite = readPng(path.join(dir, rig.referenceImage));
  const { width: W, height: H } = sprite;
  const byId = new Map(rig.parts.map((p) => [p.id, p]));
  const ancestors = (id) => {
    const out = [];
    for (let p = byId.get(id); p; p = byId.get(p.parent)) out.push(p.id);
    return out;
  };

  // part id → group index (-1: skipped, keeps its own art)
  const skip = new Set(cfg.skip ?? []);
  const groupOf = new Map();
  for (const part of rig.parts) {
    const chain = ancestors(part.id);
    if (chain.some((id) => skip.has(id))) {
      groupOf.set(part.id, -1);
      continue;
    }
    let g = cfg.groups.findIndex((gr) => gr.parts?.includes(part.id));
    if (g === -1) {
      for (const id of chain) {
        g = cfg.groups.findIndex((gr) => !gr.parts && gr.bone === id
          && (!gr.zRange || ((part.z ?? 0) >= gr.zRange[0] && (part.z ?? 0) <= gr.zRange[1])));
        if (g !== -1) break;
      }
    }
    groupOf.set(part.id, g);
  }

  // 1. Topmost part per pixel at rest.
  const sizes = new Map();
  const images = new Map();
  for (const part of rig.parts) {
    if (!part.image) continue;
    const img = await loadImage(path.join(dir, part.image));
    images.set(part.id, img);
    sizes.set(part.id, [img.width, img.height]);
  }
  const solved = solve(rig, {}, sizes);
  const visible = moodParts(resolveMood(rig, "default"));
  const drawn = rig.parts
    .filter((p) => p.image && isVisible(p, visible))
    .sort((a, b) => (a.z ?? 0) - (b.z ?? 0));
  const owner = new Int16Array(W * H).fill(-2); // -2: nothing drawn
  const ownerPart = new Array(W * H).fill(null); // topmost part id per pixel
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  // The rig's own rest render, for shade layers (step 5).
  const comp = createCanvas(W, H);
  const cctx = comp.getContext("2d");
  for (const part of drawn) {
    cctx.setTransform(...spriteMatrix(rig, part, solved.get(part.id).bone, sizes.get(part.id)));
    cctx.drawImage(images.get(part.id), 0, 0);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.setTransform(...spriteMatrix(rig, part, solved.get(part.id).bone, sizes.get(part.id)));
    ctx.drawImage(images.get(part.id), 0, 0);
    const alpha = ctx.getImageData(0, 0, W, H).data;
    const g = groupOf.get(part.id) ?? -1;
    for (let i = 0; i < W * H; i++) {
      if (alpha[i * 4 + 3] >= 128) {
        owner[i] = g;
        ownerPart[i] = part.id;
      }
    }
  }

  // 2. Sprite pixels nothing covers take the nearest covered pixel's group.
  const spriteA = (i) => sprite.data[i * 4 + 3];
  let frontier = [];
  for (let i = 0; i < W * H; i++) if (owner[i] !== -2) frontier.push(i);
  for (let step = 0; step < 8 && frontier.length; step++) {
    const next = [];
    for (const i of frontier) {
      const x = i % W;
      const y = (i - x) / W;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
        const j = ny * W + nx;
        if (owner[j] !== -2 || spriteA(j) < 16) continue;
        owner[j] = owner[i];
        next.push(j);
      }
    }
    frontier = next;
  }

  // 3. Cut each group from the sprite.
  const groupZ = cfg.groups.map((_, g) =>
    Math.max(...rig.parts.filter((p) => groupOf.get(p.id) === g && p.image).map((p) => p.z ?? 0)));
  // z of whatever owns a pixel (skipped art counts as on top), so a group
  // only grows under things drawn above it.
  const ownerZ = (i) => (owner[i] >= 0 ? groupZ[owner[i]] : owner[i] === -1 ? Infinity : -Infinity);
  const r = cfg.dilate ?? 3;
  fs.mkdirSync(path.join(dir, skinDir), { recursive: true });
  for (const [g, group] of cfg.groups.entries()) {
    const mask = new Uint8Array(W * H);
    for (let i = 0; i < W * H; i++) if (owner[i] === g) mask[i] = 1;
    // grow under higher layers only
    const grown = mask.slice();
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const i = y * W + x;
        if (!mask[i]) continue;
        for (let dy = -r; dy <= r; dy++) {
          for (let dx = -r; dx <= r; dx++) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
            const j = ny * W + nx;
            if (!grown[j] && ownerZ(j) > groupZ[g] && spriteA(j) > 0) grown[j] = 1;
          }
        }
      }
    }
    let x0 = W, y0 = H, x1 = -1, y1 = -1;
    for (let i = 0; i < W * H; i++) {
      if (!grown[i]) continue;
      const x = i % W;
      const y = (i - x) / W;
      x0 = Math.min(x0, x); x1 = Math.max(x1, x);
      y0 = Math.min(y0, y); y1 = Math.max(y1, y);
    }
    if (x1 < 0) {
      console.warn(`[skin] ${group.id}: no pixels, skipped`);
      continue;
    }
    const w = x1 - x0 + 1;
    const h = y1 - y0 + 1;
    const buf = Buffer.alloc(w * h * 4);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const si = (y0 + y) * W + (x0 + x);
        if (!grown[si]) continue;
        sprite.data.copy(buf, (y * w + x) * 4, si * 4, si * 4 + 4);
      }
    }
    const file = path.posix.join(skinDir, `${group.id}.png`);
    writePng(path.join(dir, file), w, h, buf);

    // Attach at the rest pose: the cut's top-left, in the bone's frame.
    const local = apply(invert(solved.get(group.bone).bone), [x0, y0]);
    const entry = {
      id: group.id,
      parent: group.bone,
      image: file,
      position: local.map((v) => Math.round(v * 100) / 100),
      pivot: [0, 0],
      scale: 1,
      z: groupZ[g] + 0.5,
    };
    if (group.mesh) entry.mesh = group.mesh;
    add(entry);
    console.log(`[skin] ${group.id}: ${w}x${h} at ${x0},${y0}, z ${entry.z}`);
  }
  // 4. Underlays: a part subtree's rest silhouette, cut from the sprite and
  // darkened, attached to another bone just behind it. When the head
  // tilts, the sliver it uncovers under the jaw and ears reads as shadow
  // instead of a gap.
  for (const u of cfg.underlays ?? []) {
    const subtree = new Set(rig.parts.filter((p) => ancestors(p.id).includes(u.from)).map((p) => p.id));
    const cover = new Uint8Array(W * H);
    for (const part of drawn) {
      if (!subtree.has(part.id) || isSkin(part.id)) continue;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.setTransform(...spriteMatrix(rig, part, solved.get(part.id).bone, sizes.get(part.id)));
      ctx.drawImage(images.get(part.id), 0, 0);
      const alpha = ctx.getImageData(0, 0, W, H).data;
      for (let i = 0; i < W * H; i++) if (alpha[i * 4 + 3] >= 128 && (u.belowY == null || i / W >= u.belowY)) cover[i] = 1;
    }
    let x0 = W, y0 = H, x1 = -1, y1 = -1;
    for (let i = 0; i < W * H; i++) {
      if (!cover[i] || spriteA(i) === 0) continue;
      const x = i % W;
      const y = (i - x) / W;
      x0 = Math.min(x0, x); x1 = Math.max(x1, x);
      y0 = Math.min(y0, y); y1 = Math.max(y1, y);
    }
    if (x1 < 0) continue;
    const w = x1 - x0 + 1;
    const h = y1 - y0 + 1;
    const tint = u.tint ?? 0.55;
    const buf = Buffer.alloc(w * h * 4);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const si = (y0 + y) * W + (x0 + x);
        if (!cover[si]) continue;
        const di = (y * w + x) * 4;
        for (let c = 0; c < 3; c++) buf[di + c] = Math.round(sprite.data[si * 4 + c] * tint);
        buf[di + 3] = sprite.data[si * 4 + 3];
      }
    }
    const file = path.posix.join(skinDir, `${u.id}.png`);
    writePng(path.join(dir, file), w, h, buf);
    const local = apply(invert(solved.get(u.bone).bone), [x0, y0]);
    add({
      id: u.id,
      parent: u.bone,
      image: file,
      position: local.map((v) => Math.round(v * 100) / 100),
      pivot: [0, 0],
      scale: 1,
      z: u.z,
    });
    console.log(`[skin] ${u.id}: underlay of ${u.from}, ${w}x${h}, z ${u.z}`);
  }

  // 5. Shade layers: where a part keeps its own (sharper) atlas art, the
  // sprite's shading over it, kept only where the sprite is darker than the
  // rig (a cast shadow the atlas piece lacks). Shadows are soft shapes, so
  // the sprite's lower resolution doesn't show.
  //   "shades": [{ "id": "skin_neck_shade", "part": "neck_skin",
  //                "bone": "torso", "minDiff": 12, "z": 190.5 }]
  // With "mode": "replace" (and `parts` instead of `part`) it copies the
  // sprite outright wherever those parts are on top: a patch over atlas art
  // that pokes out from under a sharper layer (the atlas face below the
  // portrait's jaw).
  const rest = cctx.getImageData(0, 0, W, H).data;
  const lum = (d, o) => 0.3 * d[o] + 0.59 * d[o + 1] + 0.11 * d[o + 2];
  for (const sh of cfg.shades ?? []) {
    const min = sh.minDiff ?? 12;
    const ramp = sh.ramp ?? 24;
    const alphaAt = new Float32Array(W * H);
    let x0 = W, y0 = H, x1 = -1, y1 = -1;
    const parts = new Set(sh.parts ?? [sh.part]);
    for (let i = 0; i < W * H; i++) {
      if (!parts.has(ownerPart[i]) || spriteA(i) < 128) continue;
      if (sh.mode === "replace") {
        // `rows: [y0, y1]` limits a patch to a band, fading out over its
        // last `fade` rows so it leaves no edge.
        const y = Math.floor(i / W);
        if (sh.rows && (y < sh.rows[0] || y > sh.rows[1])) continue;
        const fade = sh.fade ?? 10;
        alphaAt[i] = sh.rows ? Math.min(1, (sh.rows[1] - y) / fade) : 1;
        if (alphaAt[i] <= 0) continue;
      }
      else {
        const d = lum(rest, i * 4) - lum(sprite.data, i * 4);
        if (d <= min) continue;
        alphaAt[i] = Math.min(1, (d - min) / ramp);
      }
      const x = i % W;
      const y = (i - x) / W;
      x0 = Math.min(x0, x); x1 = Math.max(x1, x);
      y0 = Math.min(y0, y); y1 = Math.max(y1, y);
    }
    if (x1 < 0) continue;
    const w = x1 - x0 + 1;
    const h = y1 - y0 + 1;
    const buf = Buffer.alloc(w * h * 4);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const si = (y0 + y) * W + (x0 + x);
        if (!alphaAt[si]) continue;
        const di = (y * w + x) * 4;
        sprite.data.copy(buf, di, si * 4, si * 4 + 3);
        buf[di + 3] = Math.round(alphaAt[si] * 255);
      }
    }
    const file = path.posix.join(skinDir, `${sh.id}.png`);
    writePng(path.join(dir, file), w, h, buf);
    const local = apply(invert(solved.get(sh.bone).bone), [x0, y0]);
    add({
      id: sh.id,
      parent: sh.bone,
      image: file,
      position: local.map((v) => Math.round(v * 100) / 100),
      pivot: [0, 0],
      scale: 1,
      z: sh.z,
    });
    console.log(`[skin] ${sh.id}: ${sh.mode ?? "shade"} over ${[...parts].join(",")}, ${w}x${h}, z ${sh.z}`);
  }

  if (source.outfits) {
    const outfit = source.outfits[rig.outfit];
    outfit.parts = [...outfit.parts.filter((p) => !isSkin(p.id)), ...made];
  }
  fs.writeFileSync(rigFile, JSON.stringify(source, null, 2) + "\n");
}

main();
