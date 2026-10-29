// An outfit's hand-fits.json: the pivot, scale and turn each hand pose
// drawing needs, per side ({ r: { <image>: fit }, l: { … } }). align-hands.js
// and the preview's part editor (through the dev server, vite.config.js)
// write it; fit-outfit.js reads it so a refit keeps them.

import fs from "node:fs";
import path from "node:path";

const fileOf = (outfitDir) => path.join(outfitDir, "hand-fits.json");

/** An outfit's hand-fits.json, or {} if it has none. */
export function readHandFits(outfitDir) {
  const file = fileOf(outfitDir);
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : {};
}

/**
 * Merges `fits` (same shape; each pose a pose entry or fit) into the
 * outfit's hand-fits.json, keeping only the fields a fit holds, and returns
 * the whole file as written.
 */
export function writeHandFits(outfitDir, fits) {
  const all = readHandFits(outfitDir);
  for (const [side, poses] of Object.entries(fits)) {
    const kept = Object.entries(poses).map(([image, pose]) => [image, fitOf(pose)]);
    all[side] = { ...all[side], ...Object.fromEntries(kept) };
  }
  fs.writeFileSync(fileOf(outfitDir), JSON.stringify(all, null, 2) + "\n");
  return all;
}

function fitOf({ pivot, scale, artRotation }) {
  return { pivot, scale, ...(artRotation ? { artRotation } : {}) };
}
