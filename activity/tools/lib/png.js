// PNG file I/O and the "is this pixel solid" test shared by the rig tools.
// RGBA buffers here are row-major, 4 bytes per pixel, straight alpha.

import fs from "node:fs";
import { PNG } from "pngjs";

// Alpha above this counts as solid art for masks, silhouettes and edges.
// Anti-aliased rims sit below it, so a mask doesn't grow by a halo pixel.
export const SOLID_ALPHA = 128;

export function readPng(file) {
  return PNG.sync.read(fs.readFileSync(file));
}

export function writePng(file, width, height, data) {
  const png = new PNG({ width, height });
  data.copy ? data.copy(png.data) : png.data.set(data);
  fs.writeFileSync(file, PNG.sync.write(png));
}

/** Whether pixel `i` (index into width × height) of an RGBA buffer is solid. */
export function isSolid(rgba, i) {
  return rgba[i * 4 + 3] > SOLID_ALPHA;
}
