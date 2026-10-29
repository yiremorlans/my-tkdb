// Registers an outfit's sprite to the rig's shared head (docs/hangout-
// activity.md §3.5).
//
//   node activity/tools/register-head.js <character> [--outfit <name>]
//        [--source <sprite>] [--ref <sprite>] [--out <png>] [--dry]
//
// A new outfit's sprite can draw the shared head a little differently from
// the sprite the head was fitted to (alan_room.png: 1.3% smaller, ~6 px
// lower). The head is shared, so the sprite moves instead:
// 1. Detect: an ECC affine fit (as OpenCV's findTransformECC) of the
//    sprite's head onto the reference sprite's, inside the head box.
// 2. Report the scale and offset. Under half a pixel and 0.2%, nothing to do.
// 3. Otherwise remap the sprite: fully above the blend band, not at all
//    below it, eased across the neck in between; the body keeps its own
//    pixels. The result is the outfit's referenceImage for fitting and
//    sprite skins (default <outfit dir>/derived/<sprite>_rig.png); the
//    source sprite stays as it is.
//
// Defaults come from the rig: --ref is the default outfit's
// referenceImage, the head box is the shared parts' rest silhouette grown
// by 16 px, and the blend runs from its bottom row to the neck bone. The
// outfit's fit.json may set them under "registerHead":
//   { "source": "source/alan_room.png", "box": [x0, y0, x1, y1], "blend": [y0, y1] }

import fs from "node:fs";
import path from "node:path";

import { roundTo, solve, withOutfit } from "../src/rig/skeleton.js";
import { readPng, writePng } from "./lib/png.js";
import { fitFile, readRig, sharedCover, writeRig } from "./lib/render.js";

const round = (v, d = 4) => roundTo(v, d);

// --- image helpers ----------------------------------------------------------

/** Gray over mid gray, 0..1, rounded as OpenCV's cvtColor does. */
export function gray({ width: W, height: H, data }) {
  const out = new Float32Array(W * H);
  for (let i = 0; i < W * H; i++) {
    const a = data[i * 4 + 3] / 255;
    // OpenCV BGR→gray weights, on RGB data
    const r = Math.trunc(data[i * 4] * a + 128 * (1 - a));
    const g = Math.trunc(data[i * 4 + 1] * a + 128 * (1 - a));
    const b = Math.trunc(data[i * 4 + 2] * a + 128 * (1 - a));
    out[i] = Math.round(0.299 * r + 0.587 * g + 0.114 * b) / 255;
  }
  return out;
}

function blur5(img, W, H) {
  // OpenCV's 5-tap Gaussian for sigma 0: [1 4 6 4 1] / 16, reflect-101.
  const k = [1 / 16, 4 / 16, 6 / 16, 4 / 16, 1 / 16];
  const r101 = (i, n) => (i < 0 ? -i : i >= n ? 2 * n - 2 - i : i);
  const tmp = new Float32Array(W * H);
  const out = new Float32Array(W * H);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      let v = 0;
      for (let j = 0; j < 5; j++) v += k[j] * img[y * W + r101(x + j - 2, W)];
      tmp[y * W + x] = v;
    }
  }
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      let v = 0;
      for (let j = 0; j < 5; j++) v += k[j] * tmp[r101(y + j - 2, H) * W + x];
      out[y * W + x] = v;
    }
  }
  return out;
}

function bilinear(img, W, H, x, y) {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  if (x0 < 0 || y0 < 0 || x0 + 1 >= W || y0 + 1 >= H) return NaN;
  const fx = x - x0;
  const fy = y - y0;
  const i = y0 * W + x0;
  return (img[i] * (1 - fx) + img[i + 1] * fx) * (1 - fy) + (img[i + W] * (1 - fx) + img[i + W + 1] * fx) * fy;
}

function solve6(A, b) {
  // Gaussian elimination with partial pivoting, 6x6.
  const n = 6;
  const M = A.map((row, i) => [...row, b[i]]);
  for (let c = 0; c < n; c++) {
    let p = c;
    for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
    [M[c], M[p]] = [M[p], M[c]];
    for (let r = 0; r < n; r++) {
      if (r === c) continue;
      const f = M[r][c] / M[c][c];
      for (let k = c; k <= n; k++) M[r][k] -= f * M[c][k];
    }
  }
  return M.map((row, i) => row[n] / row[i]);
}

// --- ECC registration -------------------------------------------------------

/**
 * ECC affine alignment (Evangelidis & Psarakis, as OpenCV's
 * findTransformECC with MOTION_AFFINE and a 5-tap pre-blur). Returns the
 * 2x3 M mapping a template (reference) point to where it is in `input`,
 * and the final correlation.
 */
export function findAffineECC(template, input, W, H, box, { iterations = 500, eps = 1e-7 } = {}) {
  const T = blur5(template, W, H);
  const I = blur5(input, W, H);
  const gx = new Float32Array(W * H);
  const gy = new Float32Array(W * H);
  for (let y = 1; y < H - 1; y++) {
    for (let x = 1; x < W - 1; x++) {
      gx[y * W + x] = 0.5 * (I[y * W + x + 1] - I[y * W + x - 1]);
      gy[y * W + x] = 0.5 * (I[(y + 1) * W + x] - I[(y - 1) * W + x]);
    }
  }
  const [bx0, by0, bx1, by1] = box;
  const pts = [];
  for (let y = by0; y < by1; y++) for (let x = bx0; x < bx1; x++) pts.push([x, y]);
  const n = pts.length;
  let p = [1, 0, 0, 0, 1, 0]; // [a11, a12, tx, a21, a22, ty]
  let rho = -1;
  const tz = new Float64Array(n);
  const iz = new Float64Array(n);
  const J = Array.from({ length: 6 }, () => new Float64Array(n));
  const valid = new Uint8Array(n);
  for (let it = 0; it < iterations; it++) {
    let tm = 0;
    let im = 0;
    let cnt = 0;
    for (let k = 0; k < n; k++) {
      const [x, y] = pts[k];
      const wx = p[0] * x + p[1] * y + p[2];
      const wy = p[3] * x + p[4] * y + p[5];
      const v = bilinear(I, W, H, wx, wy);
      valid[k] = Number.isNaN(v) ? 0 : 1;
      if (!valid[k]) continue;
      iz[k] = v;
      tz[k] = T[y * W + x];
      const ggx = bilinear(gx, W, H, wx, wy);
      const ggy = bilinear(gy, W, H, wx, wy);
      J[0][k] = x * ggx; J[1][k] = y * ggx; J[2][k] = ggx;
      J[3][k] = x * ggy; J[4][k] = y * ggy; J[5][k] = ggy;
      tm += tz[k];
      im += iz[k];
      cnt++;
    }
    tm /= cnt;
    im /= cnt;
    let tn = 0;
    let inorm = 0;
    let corr = 0;
    for (let k = 0; k < n; k++) {
      if (!valid[k]) continue;
      tz[k] -= tm;
      iz[k] -= im;
      tn += tz[k] * tz[k];
      inorm += iz[k] * iz[k];
      corr += tz[k] * iz[k];
    }
    const H6 = Array.from({ length: 6 }, () => new Array(6).fill(0));
    const ip = new Array(6).fill(0);
    const tp = new Array(6).fill(0);
    for (let k = 0; k < n; k++) {
      if (!valid[k]) continue;
      for (let a = 0; a < 6; a++) {
        ip[a] += J[a][k] * iz[k];
        tp[a] += J[a][k] * tz[k];
        for (let b = a; b < 6; b++) H6[a][b] += J[a][k] * J[b][k];
      }
    }
    for (let a = 0; a < 6; a++) for (let b = 0; b < a; b++) H6[a][b] = H6[b][a];
    const newRho = corr / Math.sqrt(tn * inorm);
    const iph = solve6(H6, ip);
    const lambdaN = inorm - ip.reduce((s, v, a) => s + v * iph[a], 0);
    const lambdaD = corr - tp.reduce((s, v, a) => s + v * iph[a], 0);
    const lambda = lambdaN / lambdaD;
    const ep = new Array(6).fill(0);
    for (let k = 0; k < n; k++) {
      if (!valid[k]) continue;
      const e = lambda * tz[k] - iz[k];
      for (let a = 0; a < 6; a++) ep[a] += J[a][k] * e;
    }
    const dp = solve6(H6, ep);
    p = p.map((v, a) => v + dp[a]);
    if (Math.abs(newRho - rho) < eps) {
      rho = newRho;
      break;
    }
    rho = newRho;
  }
  return { M: [[p[0], p[1], p[2]], [p[3], p[4], p[5]]], rho };
}

/** Scale and offset of the sprite's head relative to the rig's, at a point. */
export function describeAffine(M, [cx, cy]) {
  const scale = Math.sqrt(Math.abs(M[0][0] * M[1][1] - M[0][1] * M[1][0]));
  const dx = M[0][0] * cx + M[0][1] * cy + M[0][2] - cx;
  const dy = M[1][0] * cx + M[1][1] * cy + M[1][2] - cy;
  return { scale, dx, dy };
}

// --- remapping --------------------------------------------------------------

/**
 * The sprite with its head moved onto the rig's: each output pixel samples
 * the sprite through M fully above blend[0], not at all below blend[1],
 * smoothstep-eased between (premultiplied bicubic; rows past the band are
 * copied untouched).
 */
export function remapHead(src, M, [b0, b1]) {
  const { width: W, height: H, data } = src;
  const out = Buffer.alloc(W * H * 4);
  const A = -0.75;
  const kern = (t) => {
    t = Math.abs(t);
    if (t < 1) return ((A + 2) * t - (A + 3)) * t * t + 1;
    if (t < 2) return ((A * t - 5 * A) * t + 8 * A) * t - 4 * A;
    return 0;
  };
  const last = Math.ceil(b1);
  for (let y = 0; y < H; y++) {
    if (y >= last) {
      data.copy ? data.copy(out, y * W * 4, y * W * 4, H * W * 4) : out.set(data.subarray(y * W * 4), y * W * 4);
      break;
    }
    let k = Math.min(1, Math.max(0, (b1 - y) / (b1 - b0)));
    k = k * k * (3 - 2 * k);
    for (let x = 0; x < W; x++) {
      const mx = x + k * (M[0][0] * x + M[0][1] * y + M[0][2] - x);
      const my = y + k * (M[1][0] * x + M[1][1] * y + M[1][2] - y);
      const x0 = Math.floor(mx);
      const y0 = Math.floor(my);
      const acc = [0, 0, 0, 0];
      for (let j = -1; j <= 2; j++) {
        const yy = y0 + j;
        if (yy < 0 || yy >= H) continue;
        const wy = kern(my - yy);
        for (let i = -1; i <= 2; i++) {
          const xx = x0 + i;
          if (xx < 0 || xx >= W) continue;
          const w = wy * kern(mx - xx);
          const s = (yy * W + xx) * 4;
          const a = data[s + 3] / 255;
          acc[0] += data[s] * a * w;
          acc[1] += data[s + 1] * a * w;
          acc[2] += data[s + 2] * a * w;
          acc[3] += data[s + 3] * w;
        }
      }
      const a = Math.min(255, Math.max(0, acc[3]));
      const d = (y * W + x) * 4;
      for (let c = 0; c < 3; c++) out[d + c] = a > 0 ? Math.min(255, Math.max(0, Math.round((acc[c] * 255) / Math.max(a, 1e-3)))) : 0;
      out[d + 3] = Math.round(a);
    }
  }
  return out;
}

/** Head box and blend band from the rig: shared silhouette grown by `pad`, bottom row → neck bone. */
export async function headRegion(source, dir, pad = 16) {
  const cov = await sharedCover(source, dir);
  const { width: W, height: H } = source.reference;
  let x0 = W, y0 = H, x1 = -1, y1 = -1;
  for (let i = 0; i < W * H; i++) {
    if (!cov?.[i]) continue;
    const x = i % W;
    const y = (i - x) / W;
    x0 = Math.min(x0, x); x1 = Math.max(x1, x);
    y0 = Math.min(y0, y); y1 = Math.max(y1, y);
  }
  if (x1 < 0) throw new Error("the rig has no shared head art to register against");
  const { outfits, defaultOutfit, ...shared } = source;
  const neckY = solve({ ...shared, hands: {} }, {}).get(source.bones?.neck ?? "neck").bone[5];
  return {
    box: [Math.max(0, x0 - pad), Math.max(0, y0 - pad), Math.min(W, x1 + pad), Math.min(H, y1 + pad)],
    blend: [y1, neckY],
  };
}

// --- CLI --------------------------------------------------------------------

async function main() {
  const [character, ...rest] = process.argv.slice(2);
  const opt = (name) => {
    const i = rest.indexOf(`--${name}`);
    return i === -1 ? null : rest[i + 1];
  };
  if (!character) {
    console.error("usage: node activity/tools/register-head.js <character> [--outfit <name>] [--source <sprite>] [--ref <sprite>] [--out <png>] [--dry]");
    process.exit(1);
  }
  const { dir, source } = readRig(character, { validate: false });
  const outfitName = opt("outfit") ?? source.defaultOutfit;
  const outfit = source.outfits[outfitName];
  const specFile = fitFile(dir, outfit);
  const cfg = (fs.existsSync(specFile) ? JSON.parse(fs.readFileSync(specFile, "utf8")).registerHead : null) ?? {};
  const fromRepo = (f) => (f ? path.relative(dir, f) : null);
  const srcRel = fromRepo(opt("source")) ?? cfg.source ?? outfit.referenceImage;
  const refRel = fromRepo(opt("ref")) ?? cfg.ref ?? withOutfit(source, source.defaultOutfit).referenceImage;
  if (outfitName === source.defaultOutfit && !opt("ref") && !cfg.ref) {
    console.log(`[register-head] ${outfitName} is the outfit the head was fitted to; nothing to register`);
    return;
  }
  const region = await headRegion(source, dir);
  const box = cfg.box ?? region.box;
  const blend = cfg.blend ?? region.blend;

  const src = readPng(path.join(dir, srcRel));
  const ref = readPng(path.join(dir, refRel));
  const { width: W, height: H } = src;
  const { M, rho } = findAffineECC(gray(ref), gray(src), W, H, box);
  const center = [(box[0] + box[2]) / 2, (box[1] + box[3]) / 2];
  const { scale, dx, dy } = describeAffine(M, center);
  console.log(`[register-head] ${outfitName}: ${srcRel} vs ${refRel}, head box ${box.join(",")}, blend ${blend.map((v) => round(v, 1)).join("-")}`);
  const pct = round(Math.abs(scale - 1) * 100, 2);
  console.log(`[register-head] the sprite draws the head ${pct}% ${scale < 1 ? "smaller" : "larger"}, ${round(Math.abs(dy), 2)} px ${dy > 0 ? "lower" : "higher"} and ${round(Math.abs(dx), 2)} px ${dx > 0 ? "right" : "left"} of the rig's (at the head box center; correlation ${round(rho)})`);
  console.log(`[register-head] affine ${JSON.stringify(M.map((r) => r.map((v) => round(v))))}`);
  if (Math.abs(scale - 1) < 0.002 && Math.hypot(dx, dy) < 0.5) {
    console.log("[register-head] within 0.2% and half a pixel: no registration needed");
    return;
  }
  const out = remapHead(src, M, blend);
  const outRel = path.posix.join(outfit.dir && outfit.dir !== "." ? outfit.dir : "", "derived", `${path.basename(srcRel, ".png")}_rig.png`);
  const outFile = opt("out") ?? path.join(dir, outRel);
  if (rest.includes("--dry")) {
    console.log("[register-head] --dry: nothing written");
    return;
  }
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  writePng(outFile, W, H, out);
  const err = (img) => {
    const g = gray({ width: W, height: H, data: img });
    const r = gray(ref);
    let s = 0;
    let n = 0;
    for (let y = box[1]; y < box[3]; y++) for (let x = box[0]; x < box[2]; x++) { s += Math.abs(g[y * W + x] - r[y * W + x]); n++; }
    return s / n;
  };
  console.log(`[register-head] head diff vs reference: ${round(err(src.data))} before, ${round(err(out))} after → ${outFile}`);
  if (outfit.referenceImage !== outRel && !opt("out")) {
    outfit.referenceImage = outRel;
    writeRig(character, source);
    console.log(`[register-head] rig.json outfits.${outfitName}.referenceImage = ${outRel}`);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) main();
