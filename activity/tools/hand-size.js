// Compares each rest hand's size in the rig with the reference sprite's
// (docs/hangout-activity.md §3.5): a hand fitted at the wrong scale still
// lands on the sprite with a low error, so it's measured, not eyeballed.
//
//   node activity/tools/hand-size.js <character> [--outfit <name>] [--hand-set <name>]
//
// Per side, counts opaque pixels below the wrist (from 20% down the hand's
// image, so the cuff above isn't counted) inside the hand's drawn box, in
// the rig's rest render and in the sprite, and prints the linear ratio
// sprite / rig. Over 1 the rig's hand is small: multiply its scale by the
// ratio. The house tolerance is ±1.5%.

import path from "node:path";

import { apply, spriteMatrix } from "../src/rig/skeleton.js";
import { imageLoader, pixels, prepareScene, readRig, renderFull, withOutfit } from "./lib/render.js";

const TOLERANCE = 0.015;
const SOLID = 128;

export async function handSizes(character, outfit, { handSet } = {}) {
  const { dir, source } = readRig(character);
  const rig = withOutfit(source, outfit ?? source.defaultOutfit, { handSet });
  const { width: W, height: H } = rig.reference;
  const sprite = await pixels(path.join(dir, rig.referenceImage), W, H);
  const scene = await prepareScene(rig, imageLoader(dir));
  const rest = (await renderFull(scene)).getContext("2d").getImageData(0, 0, W, H).data;
  const out = {};
  for (const side of Object.keys(rig.hands ?? {})) {
    const id = rig.hands[side].part;
    const part = scene.rig.parts.find((p) => p.id === id);
    const image = scene.imageFor.get(id);
    const [w, h] = scene.sizes.get(id);
    const m = spriteMatrix(scene.rig, part, scene.solved.get(id).bone, [w, h], image);
    const corners = [[0, 0], [w, 0], [0, h], [w, h]].map((c) => apply(m, c));
    const xs = corners.map((c) => c[0]);
    const x0 = Math.max(0, Math.floor(Math.min(...xs)) - 6);
    const x1 = Math.min(W, Math.ceil(Math.max(...xs)) + 6);
    // 20% down the drawn box, not the image: a pose drawn upside down
    // (`artRotation` 180, Romeo's gloves) has its wrist at the image's bottom.
    const ys = corners.map((c) => c[1]);
    const y0 = Math.round(Math.min(...ys) + 0.2 * (Math.max(...ys) - Math.min(...ys)));
    const y1 = Math.min(H, Math.ceil(Math.max(...ys)) + 8);
    let rigArea = 0;
    let spriteArea = 0;
    for (let y = y0; y < y1; y++) {
      for (let x = x0; x < x1; x++) {
        const i = (y * W + x) * 4 + 3;
        if (rest[i] >= SOLID) rigArea++;
        if (sprite[i] >= SOLID) spriteArea++;
      }
    }
    const ratio = Math.sqrt(spriteArea / rigArea);
    out[side] = { part: id, scale: image.scale ?? part.scale, rigArea, spriteArea, ratio, ok: Math.abs(ratio - 1) <= TOLERANCE };
  }
  return out;
}

async function main() {
  const [character, ...rest] = process.argv.slice(2);
  if (!character) {
    console.error("usage: node activity/tools/hand-size.js <character> [--outfit <name>] [--hand-set <name>]");
    process.exit(1);
  }
  const opt = (name) => (rest.includes(`--${name}`) ? rest[rest.indexOf(`--${name}`) + 1] : undefined);
  const sizes = await handSizes(character, opt("outfit"), { handSet: opt("hand-set") });
  for (const [side, s] of Object.entries(sizes)) {
    const verdict = s.ok ? "ok" : s.ratio > 1 ? `small: try scale ${(s.scale * s.ratio).toFixed(3)}` : `large: try scale ${(s.scale * s.ratio).toFixed(3)}`;
    console.log(`[hand-size] ${s.part.padEnd(7)} scale ${s.scale}  sprite/rig ${s.ratio.toFixed(3)}  ${verdict}`);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) main();
