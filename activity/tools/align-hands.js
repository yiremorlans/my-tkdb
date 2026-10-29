// Lines every hand pose's wrist up with the forearm, per side
// (docs/hangout-activity.md §3.5).
//
//   node activity/tools/align-hands.js <character> --outfit <name> [--set <set>] [--turn <deg>] [--write]
//
// The default pose is fitted to the sprite and joins the forearm; the other
// drawings sit at other angles, with their wrist elsewhere in the image and
// a little wider or narrower. For each side, the forearm's two edges are
// traced just above the default hand and extended down; each other pose's
// wrist edges (the top rows of its drawing) are fitted onto those lines by
// a scale and a shift, with its top where the default pose's top is, and
// with --turn also a turn (`artRotation`) up to that many degrees. The
// trace stays well above the wrist so bracelets and bands near it don't
// widen the arm. The result is a pivot, scale and turn per pose
// drawing and side. --write saves them to the outfit's hand-fits.json
// (read by fit-outfit.js) and applies them to rig.json.

import path from "node:path";
import { createCanvas, loadImage } from "canvas";

import { apply, boneLocal, invert, multiply, roundTo, spriteMatrix, withOutfit } from "../src/rig/skeleton.js";
import { isSolid } from "./lib/png.js";
import { writeHandFits } from "./lib/hand-fits.js";
import { drawScene, imageLoader, prepareScene, readRig, writeRig } from "./lib/render.js";

const ZOOM = 4; // forearm trace resolution (canvas px per reference px)
const WRIST_ROWS = 8; // image rows of a drawing's wrist that are fitted (below that, the palm flares)
const TRACE = [-40, -18]; // reference rows above the default hand's top traced on the forearm
const TURN_STEP = 0.5; // deg
const SCALES = { from: 0.85, to: 1.15, step: 0.01 }; // × the default pose's scale

/** Left/right edges of a drawing's wrist: its first WRIST_ROWS wide rows, image px. */
export function wristEdges({ data, width, height }, minWidth) {
  const rows = [];
  for (let y = 0; y < height && rows.length < WRIST_ROWS; y++) {
    let l = -1;
    let r = -1;
    for (let x = 0; x < width; x++) {
      if (isSolid(data, y * width + x)) {
        if (l < 0) l = x;
        r = x;
      }
    }
    if (l >= 0 && r - l + 1 >= minWidth) rows.push({ y: y + 0.5, l, r: r + 1 });
  }
  if (!rows.length) throw new Error("no wrist rows");
  return rows;
}

/** Least-squares line x = a + b·y through [y, x] points. */
export function fitLine(pts) {
  const n = pts.length;
  const my = pts.reduce((s, p) => s + p[0], 0) / n;
  const mx = pts.reduce((s, p) => s + p[1], 0) / n;
  let num = 0;
  let den = 0;
  for (const [y, x] of pts) {
    num += (y - my) * (x - mx);
    den += (y - my) ** 2;
  }
  const b = den ? num / den : 0;
  return { a: mx - b * my, b, at: (y) => mx - b * my + b * y };
}

/**
 * Best turn, scale and shift putting `rows` (wristEdges) on `forearm`
 * (forearmLines: its `left`/`right` edge lines and the reference y `top`
 * the wrist's top center lands on). `bone` is the hand bone; `flip` mirrors
 * the drawing. Returns { rot, scale, t, c, err } with c the image anchor
 * (top center) and t its reference position.
 */
export function fitWrist(rows, { left, right, top }, { bone, flip, baseScale, turn = 0 }) {
  const c = [(rows[0].l + rows[0].r) / 2, rows[0].y];
  const origin = apply(bone, [0, 0]);
  let best = null;
  for (let rot = -turn; rot <= turn + 1e-9; rot += TURN_STEP) {
    for (let k = SCALES.from; k <= SCALES.to + 1e-9; k += SCALES.step) {
      const s = baseScale * k;
      const m = multiply(bone, multiply(boneLocal(0, 0, rot, 1, 1), [s * flip, 0, 0, s, 0, 0]));
      const lin = (p) => {
        const q = apply(m, [p[0] - c[0], p[1] - c[1]]);
        return [q[0] - origin[0], q[1] - origin[1]];
      };
      // The anchor lands at (tx, top); tx (absolute) is solved below.
      const ty = top;
      const res = [];
      for (const row of rows) {
        for (const [x, line] of [[row.l, flip > 0 ? left : right], [row.r, flip > 0 ? right : left]]) {
          const q = lin([x, row.y]);
          res.push(q[0] - line.at(q[1] + ty));
        }
      }
      const tx = -res.reduce((a, b) => a + b, 0) / res.length;
      const err = res.reduce((a, r) => a + (r + tx) ** 2, 0) / res.length;
      if (!best || err < best.err) best = { rot, scale: s, t: [tx, ty], c, m, err };
    }
  }
  return best;
}

/** The pose entry (pivot, scale, artRotation) that places the fitted drawing. */
export function entryFor(fit, bone, size) {
  // spriteMatrix maps the pivot P to the bone origin; the fit maps c to t.
  // Same linear part L, so L·(c − P) = t − origin → P = c − L⁻¹(t − origin).
  const origin = apply(bone, [0, 0]);
  const L = [fit.m[0], fit.m[1], fit.m[2], fit.m[3], 0, 0];
  const d = apply(invert(L), [fit.t[0] - origin[0], fit.t[1] - origin[1]]);
  const P = [fit.c[0] - d[0], fit.c[1] - d[1]];
  const entry = { pivot: [roundTo(P[0] / size[0], 4), roundTo(P[1] / size[1], 4)], scale: roundTo(fit.scale, 4) };
  if (Math.abs(fit.rot) > 1e-9) entry.artRotation = roundTo(fit.rot, 1);
  return entry;
}

async function rgba(file) {
  const img = await loadImage(file);
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  return { ...ctx.getImageData(0, 0, img.width, img.height), width: img.width, height: img.height };
}

/**
 * The forearm a hand pose's wrist is fitted to: its edge lines (x = a + b·y,
 * reference px) traced above y = `top`, and `top` itself.
 */
async function forearmLines(rig, scene, handPart, origin, top) {
  const kids = new Map();
  for (const p of rig.parts) if (p.parent) kids.set(p.parent, [...(kids.get(p.parent) ?? []), p.id]);
  const arm = new Set();
  const walk = (id) => {
    arm.add(id);
    for (const k of kids.get(id) ?? []) walk(k);
  };
  walk(handPart.parent);
  arm.delete(handPart.id);

  const half = 60;
  const cx = origin[0] - half;
  const cy = origin[1] - half;
  const W = half * 2 * ZOOM;
  const canvas = createCanvas(W, W);
  const ctx = canvas.getContext("2d");
  await drawScene(ctx, scene, { cx, cy, zoom: ZOOM }, (p) => arm.has(p.id));
  const { data } = ctx.getImageData(0, 0, W, W);
  const left = [];
  const right = [];
  for (let ry = top + TRACE[0]; ry <= top + TRACE[1]; ry += 1 / ZOOM) {
    const y = Math.round((ry - cy) * ZOOM);
    if (y < 0 || y >= W) continue;
    // The opaque run nearest the wrist's x.
    const ox = Math.round((origin[0] - cx) * ZOOM);
    const on = (x) => isSolid(data, y * W + x);
    let x0 = ox;
    let x1 = ox;
    if (!on(ox)) continue;
    while (x0 > 0 && on(x0 - 1)) x0--;
    while (x1 < W - 1 && on(x1 + 1)) x1++;
    left.push([ry, cx + x0 / ZOOM]);
    right.push([ry, cx + (x1 + 1) / ZOOM]);
  }
  if (left.length < 4) throw new Error(`${handPart.id}: no forearm above the wrist to trace`);
  return { left: fitLine(left), right: fitLine(right), top };
}

async function main() {
  const [character, ...rest] = process.argv.slice(2);
  const opt = (name) => {
    const i = rest.indexOf(`--${name}`);
    return i >= 0 ? rest[i + 1] : undefined;
  };
  const outfitName = opt("outfit");
  if (!character || !outfitName) {
    console.error("usage: align-hands.js <character> --outfit <name> [--set <set>] [--turn <deg>] [--write]");
    process.exit(1);
  }
  const { dir, source } = readRig(character);
  const rig = withOutfit(source, outfitName, { handSet: opt("set") });
  const load = imageLoader(dir);
  const scene = await prepareScene(rig, load);
  const outfitDir = path.join(dir, source.outfits[outfitName].dir ?? ".");
  const newFits = {};

  for (const [side, hand] of Object.entries(rig.hands ?? {})) {
    const part = rig.parts.find((p) => p.id === hand.part);
    const bone = scene.solved.get(hand.part).bone;
    const origin = apply(bone, [0, 0]);
    const def = hand.poses[hand.default];
    const defImg = await rgba(path.join(dir, def.image));
    const flip = (def.flipX ?? part.flipX) ? -1 : 1;
    const defRows = wristEdges(defImg, 0.5 * Math.max(...wristEdges(defImg, 1).map((r) => r.r - r.l)));
    const defM = spriteMatrix(rig, part, bone, [defImg.width, defImg.height], def);
    const top = apply(defM, [(defRows[0].l + defRows[0].r) / 2, defRows[0].y])[1];
    const forearm = await forearmLines(rig, scene, part, origin, top);
    const minWidth = 0.6 * (defRows[0].r - defRows[0].l);

    const fits = {};
    console.log(`[align-hands] ${outfitName} ${side}: forearm ${forearm.left.at(top).toFixed(1)}–${forearm.right.at(top).toFixed(1)} at y ${top.toFixed(1)}`);
    for (const [name, pose] of Object.entries(hand.poses)) {
      if (name === hand.default) continue;
      const img = await rgba(path.join(dir, pose.image));
      const rows = wristEdges(img, minWidth);
      const fit = fitWrist(rows, forearm, { bone, flip, baseScale: def.scale ?? part.scale, turn: Number(opt("turn") ?? 0) });
      const entry = entryFor(fit, bone, [img.width, img.height]);
      const id = path.basename(pose.image, ".png");
      fits[id] = entry;
      console.log(`  ${name.padEnd(10)} ${id}  turn ${entry.artRotation ?? 0}°  scale ${entry.scale}  pivot ${entry.pivot.join(", ")}  rms ${Math.sqrt(fit.err).toFixed(2)} px`);
      if (rest.includes("--write")) Object.assign(pose, entry);
    }
    newFits[side] = fits;
  }

  if (rest.includes("--write")) {
    const handFits = writeHandFits(outfitDir, newFits);
    // Apply to the on-disk rig.json (the outfit's own hands, not the flattened copy).
    const target = source.outfits[outfitName];
    const setName = opt("set");
    const hands = setName && target.hands.sets ? target.hands.sets[setName] : target.hands;
    for (const [side, h] of Object.entries(hands)) {
      if (!h?.poses) continue;
      for (const pose of Object.values(h.poses)) {
        const fit = handFits[side]?.[path.basename(pose.image, ".png")];
        if (fit) Object.assign(pose, fit);
      }
    }
    writeRig(character, source);
    console.log(`[align-hands] wrote ${path.join(outfitDir, "hand-fits.json")} and rig.json`);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) main();
