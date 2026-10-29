// Alpha of a rig's shared parts (rig.json top-level `parts`: the head, hair
// and face) at rest, as a PNG in reference px. Body fits for a new outfit
// start with this as covered, since those parts draw in front of the neck.
//   node activity/tools/authoring/shared_mask.mjs <character> <out.png>
import fs from "node:fs";
import path from "node:path";
import { createCanvas, loadImage } from "canvas";
import { isVisible, moodParts, resolveMood } from "../../src/rig/expressions.js";
import { solve, spriteMatrix } from "../../src/rig/skeleton.js";

const [character, out] = process.argv.slice(2);
const dir = path.join("assets/rig", character);
const { outfits, ...rig } = JSON.parse(fs.readFileSync(path.join(dir, "rig.json"), "utf8"));
const images = new Map();
const sizes = new Map();
for (const p of rig.parts) {
  if (!p.image) continue;
  const img = await loadImage(path.join(dir, p.image));
  images.set(p.id, img);
  sizes.set(p.id, [img.width, img.height]);
}
const solved = solve(rig, {}, sizes);
const visible = moodParts(resolveMood(rig, "default"));
const canvas = createCanvas(rig.reference.width, rig.reference.height);
const ctx = canvas.getContext("2d");
for (const p of rig.parts.filter((p) => p.image && isVisible(p, visible)).sort((a, b) => (a.z ?? 0) - (b.z ?? 0))) {
  ctx.setTransform(...spriteMatrix(rig, p, solved.get(p.id).bone, sizes.get(p.id)));
  ctx.drawImage(images.get(p.id), 0, 0);
}
fs.writeFileSync(out, canvas.toBuffer("image/png"));
console.log(`[shared-mask] ${out}`);
