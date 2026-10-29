// Hangout rig pipeline, step 3: expression overlays for the moods the atlas
// can't make (docs/hangout-activity.md §3.3).
//
//   node activity/tools/build-overlays.js <character> [--threshold n]
//
// For each mood in rig.json with "source": "overlay" and a "portrait" name,
// subtracts assets/expressions/<character>/default.png from
// <portrait>.png, keeps only the changed pixels (grown and feathered a
// little so the patch blends into the atlas face), crops to them, and writes
// assets/rig/<character>/overlays/<mood>.png. The crop goes back into
// rig.json as the mood's `rect`. Atlas moods are never touched: atlas parts
// come first, overlays only fill gaps.

import fs from "node:fs";
import path from "node:path";

import { readPng, writePng } from "./slice-atlas.js";

// A pixel counts as changed when any channel moves more than this.
const DEFAULT_THRESHOLD = 20;
// Grow the changed mask by this many px, then feather over FEATHER px, so a
// patch edge never cuts through a stroke's anti-aliasing.
const GROW = 2;
const FEATHER = 2;

/** Changed-pixel mask (0..1 per px) between two same-size RGBA images. */
export function diffMask(a, b, threshold = DEFAULT_THRESHOLD) {
  const { width, height } = a;
  const mask = new Float32Array(width * height);
  for (let i = 0; i < width * height; i++) {
    let d = 0;
    for (let c = 0; c < 4; c++) d = Math.max(d, Math.abs(a.data[i * 4 + c] - b.data[i * 4 + c]));
    if (d > threshold) mask[i] = 1;
  }
  return mask;
}

// Chebyshev-distance grow then a linear feather: 1 inside the grown mask,
// fading to 0 over FEATHER px outside it.
function growAndFeather(mask, width, height) {
  const reach = GROW + FEATHER;
  const out = new Float32Array(mask.length);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (!mask[y * width + x]) continue;
      for (let dy = -reach; dy <= reach; dy++) {
        const ny = y + dy;
        if (ny < 0 || ny >= height) continue;
        for (let dx = -reach; dx <= reach; dx++) {
          const nx = x + dx;
          if (nx < 0 || nx >= width) continue;
          const dist = Math.max(Math.abs(dx), Math.abs(dy));
          const v = dist <= GROW ? 1 : 1 - (dist - GROW) / (FEATHER + 1);
          const j = ny * width + nx;
          if (v > out[j]) out[j] = v;
        }
      }
    }
  }
  return out;
}

/** Builds one overlay. Returns { rect, buf, changed } or null if nothing changed. */
export function buildOverlay(base, expr, threshold = DEFAULT_THRESHOLD) {
  if (base.width !== expr.width || base.height !== expr.height) {
    throw new Error("expression and default sizes differ");
  }
  const { width, height } = base;
  const raw = diffMask(base, expr, threshold);
  const changed = raw.reduce((n, v) => n + v, 0);
  if (!changed) return null;
  const mask = growAndFeather(raw, width, height);

  let x0 = width, y0 = height, x1 = -1, y1 = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (!mask[y * width + x]) continue;
      x0 = Math.min(x0, x); x1 = Math.max(x1, x);
      y0 = Math.min(y0, y); y1 = Math.max(y1, y);
    }
  }
  const w = x1 - x0 + 1;
  const h = y1 - y0 + 1;
  const buf = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const si = (y0 + y) * width + (x0 + x);
      const m = mask[si];
      if (!m) continue;
      const di = (y * w + x) * 4;
      expr.data.copy(buf, di, si * 4, si * 4 + 3);
      buf[di + 3] = Math.round(expr.data[si * 4 + 3] * m);
    }
  }
  return { rect: [x0, y0, w, h], buf, changed };
}

function main() {
  const character = process.argv[2];
  if (!character) {
    console.error("usage: node activity/tools/build-overlays.js <character> [--threshold n]");
    process.exit(1);
  }
  const ti = process.argv.indexOf("--threshold");
  const threshold = ti === -1 ? DEFAULT_THRESHOLD : Number(process.argv[ti + 1]);

  const rigDir = path.join("assets/rig", character);
  const rigFile = path.join(rigDir, "rig.json");
  const rig = JSON.parse(fs.readFileSync(rigFile, "utf8"));
  const exprDir = path.join("assets/expressions", character);
  const base = readPng(path.join(exprDir, "default.png"));
  fs.mkdirSync(path.join(rigDir, "overlays"), { recursive: true });

  for (const [mood, def] of Object.entries(rig.expressions?.moods ?? {})) {
    if (def.source !== "overlay") continue;
    const exprFile = path.join(exprDir, `${def.portrait ?? mood}.png`);
    if (!fs.existsSync(exprFile)) {
      console.warn(`[overlays] ${mood}: no ${exprFile}, skipped`);
      continue;
    }
    const built = buildOverlay(base, readPng(exprFile), threshold);
    if (!built) {
      console.warn(`[overlays] ${mood}: identical to default, skipped`);
      continue;
    }
    def.file = `overlays/${mood}.png`;
    def.rect = built.rect;
    writePng(path.join(rigDir, def.file), built.rect[2], built.rect[3], built.buf);
    console.log(`[overlays] ${mood}: ${built.changed} changed px, rect ${built.rect.join(",")}`);
  }
  fs.writeFileSync(rigFile, JSON.stringify(rig, null, 2) + "\n");
}

if (import.meta.url === `file://${process.argv[1]}`) main();
