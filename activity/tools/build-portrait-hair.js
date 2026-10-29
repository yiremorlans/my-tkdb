// Hangout rig pipeline: hair cut from the expression portrait, for rigs whose
// atlas hair strands are warped in the finished art and won't sit rigidly
// (Alan's do). See docs/hangout-activity.md §3.2.
//
//   node activity/tools/build-portrait-hair.js <character>
//
// Configured by rig.json `portraitHair`:
//   { "portrait": "default", "maxY": 440, "lumMax": 150, "diff": 40,
//     "feather": 6, "z": 500, "lockZ": 510,
//     "exclude": ["mouth", ...],         // part boxes left out unless teal (hair)
//     "pinToBase": ["lash_r", ...],      // part boxes whose non-teal pixels stay
//                                        // in the static base, never in a lock
//     "keepInBase": ["iris_l", ...],     // part boxes that stay in the base whole,
//                                        // teal or not (irises the color of the hair)
//     "jawClipY": 430, "jawGrow": 1,      // below it, only the face's own silhouette
//     "hairBelowJaw": [[x0, y0, x1, y1]], // …plus these boxes: strand tips past the clip
//     "locks": [ { "id": "hair_front", "rect": [x0, y0, x1, y1],
//                  "pivot": [x, y] }, ... ] }   // portrait px
//
// 1. Renders the rig's head parts (minus any hair) into portrait space, with
//    the same transform the expression overlays use.
// 2. The layer = portrait pixels darker than lumMax that differ from that
//    face render and sit above maxY. With lumMax 255 it carries every detail
//    the atlas face lacks (Alan: hair, shading, earrings, the default eyes).
//    `exclude` boxes keep only teal (hair) pixels.
// 3. Splits it into a static base plus one image per lock. Locks take only
//    teal pixels inside `pinToBase` boxes, so eyes never sway with the
//    fringe. Lock edges are feathered and overlap the base, so a rotating
//    lock never opens a gap.
// 4. Bakes a static shadow under each lock where the face would show
//    through when it sways (`shadowTint`, default 0.5).
// 5. Replaces the rig's hair parts (ids starting "hair_") and lock bones.

import fs from "node:fs";
import path from "node:path";
import { createCanvas, loadImage } from "canvas";

import { overlayMatrix } from "../src/rig/expressions.js";
import { invert, multiply, roundTo, solve, spriteMatrix } from "../src/rig/skeleton.js";
import { isSolid, readPng, writePng } from "./lib/png.js";

const isHair = (id) => id.startsWith("hair_");

async function renderFace(rig, dir, solved, sizes, width, height) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");
  const head = solved.get(rig.expressions.head).bone;
  // reference px → portrait px
  const toPortrait = invert(overlayMatrix(rig, head, { rect: [0, 0] }));
  const headParts = descendants(rig, rig.expressions.head);
  const parts = rig.parts
    // Hidden parts still count when listed in `faceParts` (a jaw hidden in
    // the render but still defining the face outline the clip follows).
    .filter((p) => p.image && !isHair(p.id) && headParts.has(p.id)
      && (!p.hidden || rig.portraitHair?.faceParts?.includes(p.id)))
    .sort((a, b) => a.z - b.z);
  for (const part of parts) {
    const m = multiply(toPortrait, spriteMatrix(rig, part, solved.get(part.id).bone, sizes.get(part.id)));
    ctx.setTransform(...m);
    ctx.drawImage(await loadImage(path.join(dir, part.image)), 0, 0);
  }
  return { data: ctx.getImageData(0, 0, width, height).data, toPortrait, head };
}

function descendants(rig, id) {
  const byId = new Map(rig.parts.map((p) => [p.id, p]));
  const out = new Set();
  for (const part of rig.parts) {
    for (let p = part; p; p = byId.get(p.parent)) {
      if (p.id === id) {
        out.add(part.id);
        break;
      }
    }
  }
  return out;
}

// Square min-filter (separable), radius r: shrinks a 0/1 mask by r px.
function erode(mask, width, height, r) {
  const pass = (src, horizontal) => {
    const out = new Float32Array(src.length);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let m = 1;
        for (let d = -r; d <= r && m; d++) {
          const xx = horizontal ? x + d : x;
          const yy = horizontal ? y : y + d;
          if (xx < 0 || yy < 0 || xx >= width || yy >= height) m = 0;
          else m = Math.min(m, src[yy * width + xx]);
        }
        out[y * width + x] = m;
      }
    }
    return out;
  };
  return pass(pass(mask, true), false);
}

// Weight 1 deep inside rect, ramping to 0 at its edge over `feather` px.
function rectWeight([x0, y0, x1, y1], feather, x, y) {
  const d = Math.min(x - x0, x1 - x, y - y0, y1 - y);
  return Math.max(0, Math.min(1, d / feather));
}

async function main() {
  const character = process.argv[2];
  if (!character) {
    console.error("usage: node activity/tools/build-portrait-hair.js <character>");
    process.exit(1);
  }
  const dir = path.join("assets/rig", character);
  const rigFile = path.join(dir, "rig.json");
  const rig = JSON.parse(fs.readFileSync(rigFile, "utf8"));
  const cfg = rig.portraitHair;
  if (!cfg) throw new Error("rig.json has no portraitHair config");

  const portrait = readPng(path.join("assets/expressions", character, `${cfg.portrait ?? "default"}.png`));
  const { width, height } = portrait;

  const sizes = new Map();
  for (const part of rig.parts) {
    if (!part.image) continue;
    const img = await loadImage(path.join(dir, part.image));
    sizes.set(part.id, [img.width, img.height]);
  }
  const solved = solve(rig, {}, sizes);
  const face = await renderFace(rig, dir, solved, sizes, width, height);

  // Part boxes, in portrait px.
  const boxOf = (id) => {
    const part = rig.parts.find((p) => p.id === id);
    if (!part?.image) throw new Error(`portraitHair names ${id}, which isn't a head part in rig.json`);
    const m = multiply(face.toPortrait, spriteMatrix(rig, part, solved.get(id).bone, sizes.get(id)));
    const [w, h] = sizes.get(id);
    const xs = [];
    const ys = [];
    for (const [u, v] of [[0, 0], [w, 0], [0, h], [w, h]]) {
      xs.push(m[0] * u + m[2] * v + m[4]);
      ys.push(m[1] * u + m[3] * v + m[5]);
    }
    return [Math.min(...xs) - 3, Math.min(...ys) - 3, Math.max(...xs) + 3, Math.max(...ys) + 3];
  };
  const within = (boxes) => (x, y) => boxes.some(([a, b, c, d]) => x >= a && x <= c && y >= b && y <= d);
  const inExclude = within((cfg.exclude ?? []).map(boxOf));
  const inPinned = within((cfg.pinToBase ?? []).map(boxOf));
  const teal = new Uint8Array(width * height);

  const { lumMax = 150, diff = 40, maxY = height, feather = 6 } = cfg;
  // Below jawClipY the layer keeps only pixels inside the face's own
  // outline (grown `jawGrow` px to keep the jaw line), so it ends along the
  // jaw instead of in a straight cut across the neck; the neck below comes
  // from the body art.
  const jawClipY = cfg.jawClipY ?? maxY;
  // Inside the grown band (outside the face proper) only the dark jaw
  // outline is kept: lighter portrait skin there ends in a visible second
  // line below the jaw.
  let inFace = null;
  let inBand = null;
  if (jawClipY < maxY) {
    const solid = new Float32Array(width * height);
    for (let i = 0; i < width * height; i++) solid[i] = isSolid(face.data, i) ? 0 : 1;
    const outside = erode(solid, width, height, cfg.jawGrow ?? 4);
    inFace = (x, y) => outside[y * width + x] === 0;
    inBand = (x, y) => solid[y * width + x] === 1;
  }
  const hair = new Float32Array(width * height);
  for (let y = 0; y < Math.min(maxY, height); y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const a = portrait.data[i + 3] / 255;
      if (a === 0) continue;
      if (inFace && y >= jawClipY) {
        // `hairBelowJaw` boxes hold strand tips that hang past the clip
        // beside the jaw; kept whole (their outlines are as dark as clothing)
        const tip = (cfg.hairBelowJaw ?? []).some(([a, b, c, d]) => x >= a && x < c && y >= b && y < d);
        if (!inFace(x, y) && !tip) continue;
        const o = (y * width + x) * 4;
        const l = (portrait.data[o] + portrait.data[o + 1] + portrait.data[o + 2]) / 3;
        if (inBand(x, y) && l > (cfg.jawLineLum ?? 110)) {
          // Lighter band pixels are face skin only while the jaw outline is
          // still ahead of them, looking down and outward (the jaw is steep
          // at the sides, so the line can be beside a pixel, not below it);
          // past the line they're neck, so they go.
          const out = x < (cfg.faceCenterX ?? width / 2) ? -1 : 1;
          let lineBelow = false;
          for (const [vx, vy] of [[0, 1], [out, 1], [out, 0]]) {
            for (let k = 1; k <= 6 && !lineBelow; k++) {
              const qx = x + vx * k;
              const qy = y + vy * k;
              if (qx < 0 || qx >= width || qy >= height) break;
              const q = (qy * width + qx) * 4;
              lineBelow = portrait.data[q + 3] > 200
                && (portrait.data[q] + portrait.data[q + 1] + portrait.data[q + 2]) / 3 <= (cfg.jawLineLum ?? 110);
            }
          }
          if (!lineBelow) continue;
        }
      }
      const [r, g, b] = [portrait.data[i], portrait.data[i + 1], portrait.data[i + 2]];
      if ((r + g + b) / 3 > lumMax) continue;
      const fa = face.data[i + 3] / 255;
      const d = Math.max(Math.abs(r - face.data[i]), Math.abs(g - face.data[i + 1]), Math.abs(b - face.data[i + 2]));
      // diff < 0 keeps every portrait pixel: on the face the portrait is
      // the truth, and skipping matching pixels lets the atlas face's own
      // (slightly offset) outline peek through as a double line.
      if (diff >= 0 && fa > 0.5 && d <= diff) continue;
      const isTeal = g > r + 12 && b > r + 8;
      if (inExclude(x, y) && !isTeal) continue;
      hair[y * width + x] = a;
      teal[y * width + x] = isTeal ? 1 : 0;
    }
  }

  const locks = cfg.locks ?? [];
  const layers = [{ id: "hair_base", weight: (x, y) => {
    // The base stays fully opaque under each lock's feathered edge and is
    // cut only where the lock is solid. Two half-transparent layers would
    // let the background show through the seam.
    for (const l of locks) if (rectWeight(l.rect, feather, x, y) >= 1) return 0;
    return 1;
  } }];
  // A lock never takes the non-teal pixels of a pinned box (an eye), nor
  // any pixel of a keepInBase box, and the base keeps them whatever the
  // lock weight.
  const inKept = within((cfg.keepInBase ?? []).map(boxOf));
  const pinned = (x, y) => inKept(x, y) || (inPinned(x, y) && !teal[y * width + x]);
  // The base keeps a pinned box 2 px wider than the lock gives it up, so
  // the lock's edge pixels sit on solid base: two half-covered edges drawn
  // as separate layers would leave a pale seam around the box.
  const near = (x, y) => {
    for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) if (pinned(x + dx, y + dy)) return true;
    return false;
  };
  layers[0].weight = ((inner) => (x, y) => (near(x, y) ? 1 : inner(x, y)))(layers[0].weight);
  for (const l of locks) {
    layers.push({ id: l.id, lock: l, weight: (x, y) => (pinned(x, y) ? 0 : rectWeight(l.rect, feather, x, y)) });
  }

  // The head's silhouette (hair or face), eroded by shadowMargin: where a
  // lock shadow may go.
  const margin = cfg.shadowMargin ?? 10;
  let interior = new Float32Array(width * height);
  for (let i = 0; i < width * height; i++) {
    interior[i] = hair[i] > 0.5 || isSolid(face.data, i) ? 1 : 0;
  }
  interior = erode(interior, width, height, margin);

  fs.mkdirSync(path.join(dir, "hair"), { recursive: true });
  const written = [];
  for (const layer of layers) {
    let x0 = width, y0 = height, x1 = -1, y1 = -1;
    const alpha = new Float32Array(width * height);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const a = hair[y * width + x] * layer.weight(x, y);
        if (a <= 0.004) continue;
        alpha[y * width + x] = a;
        x0 = Math.min(x0, x); x1 = Math.max(x1, x);
        y0 = Math.min(y0, y); y1 = Math.max(y1, y);
      }
    }
    if (x1 < 0) continue;
    const w = x1 - x0 + 1;
    const h = y1 - y0 + 1;
    const buf = Buffer.alloc(w * h * 4);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const si = (y0 + y) * width + (x0 + x);
        if (!alpha[si]) continue;
        const di = (y * w + x) * 4;
        portrait.data.copy(buf, di, si * 4, si * 4 + 3);
        buf[di + 3] = Math.round(alpha[si] * 255);
      }
    }
    const file = `hair/${layer.id}.png`;
    writePng(path.join(dir, file), w, h, buf);
    written.push({ ...layer, file, rect: [x0, y0, w, h] });

    // Under each lock, a static shadow: the lock's own shape in darkened
    // hair color, anywhere inside the head (face or hair mass). When the
    // lock sways, what it uncovers reads as hair in shadow, not bare skin or
    // background. Within `shadowMargin` px of the head's outer silhouette
    // nothing is added, so tips over empty background still move freely.
    if (!layer.lock) continue;
    const tint = cfg.shadowTint ?? 0.5;
    const sbuf = Buffer.alloc(w * h * 4);
    let any = false;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const si = (y0 + y) * width + (x0 + x);
        const a = Math.min(1, alpha[si] * 1.5) * interior[si];
        if (a <= 0.004) continue;
        const di = (y * w + x) * 4;
        for (let c = 0; c < 3; c++) sbuf[di + c] = Math.round(portrait.data[si * 4 + c] * tint);
        sbuf[di + 3] = Math.round(a * 255);
        any = true;
      }
    }
    if (any) {
      const sfile = `hair/${layer.id}_shadow.png`;
      writePng(path.join(dir, sfile), w, h, sbuf);
      written.push({ id: `${layer.id}_shadow`, shadow: true, file: sfile, rect: [x0, y0, w, h] });
    }
  }

  // Swap the hair in rig.json: drop atlas hair parts and old lock bones,
  // add one bone per lock (pivot from config) and the cut images.
  const oldLocks = new Set((rig.groups?.hair_locks ?? []).flat());
  rig.parts = rig.parts.filter((p) => !isHair(p.id) && !oldLocks.has(p.id));
  const s = rig.expressions.overlayScale;
  const [ox, oy] = rig.expressions.overlayOffset;
  const toHead = ([px, py]) => [ox + px * s, oy + py * s];
  const round = (v) => roundTo(v, 2);
  let z = cfg.z ?? 500;
  let lockZ = cfg.lockZ ?? z + 10;
  for (const layer of written) {
    const parent = layer.lock ? `${layer.id}_lock` : rig.expressions.head;
    const origin = layer.lock ? toHead(layer.lock.pivot) : [0, 0];
    if (layer.lock) {
      rig.parts.push({
        id: parent,
        parent: rig.expressions.head,
        position: origin.map(round),
        limits: { rotation: layer.lock.limits ?? [-8, 8] },
      });
    }
    const [tlx, tly] = toHead([layer.rect[0], layer.rect[1]]);
    rig.parts.push({
      id: layer.id,
      parent,
      image: layer.file,
      position: [round(tlx - origin[0]), round(tly - origin[1])],
      pivot: [0, 0],
      scale: s,
      // Shadows sit on the face but under the base, so the base's eyes stay on top.
      z: layer.lock ? lockZ++ : layer.shadow ? (cfg.z ?? 500) - 1 : z++,
    });
  }
  rig.groups ??= {};
  rig.groups.hair_locks = written.filter((l) => l.lock).map((l) => [`${l.id}_lock`]);
  fs.writeFileSync(rigFile, JSON.stringify(rig, null, 2) + "\n");
  for (const l of written) console.log(`[hair] ${l.id}: rect ${l.rect.join(",")}`);
}

main();
