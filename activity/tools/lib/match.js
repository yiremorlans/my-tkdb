// Template matching for rig fitting (fit-outfit.js), in plain JS. It follows
// OpenCV's template matching closely enough to land on the same pixels (so
// Alan's rig.json reproduces byte for byte): INTER_AREA
// downscaling, Gaussian kernels sized the way OpenCV sizes them for float
// images, reflect-101 borders, and Python's round-half-to-even for template
// sizes.
//
// Images here are { width, height, channels, data: Float32Array }, row-major,
// interleaved, 0-255.

import { readPng } from "./png.js";

// --- images -----------------------------------------------------------------

/** Python's round(): half to even, on the double as given. */
export function pyRound(x) {
  const f = Math.floor(x);
  const d = x - f;
  if (d > 0.5) return f + 1;
  if (d < 0.5) return f;
  return f % 2 === 0 ? f : f + 1;
}

/** A PNG as a 4-channel float image (straight alpha, RGB kept under α=0). */
export function loadRGBA(file) {
  const png = readPng(file);
  return { width: png.width, height: png.height, channels: 4, data: Float32Array.from(png.data) };
}

export function image(width, height, channels, data = new Float32Array(width * height * channels)) {
  return { width, height, channels, data };
}

/** Mirror left-right. */
export function flipX(img) {
  const { width: W, height: H, channels: C } = img;
  const out = image(W, H, C);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const s = (y * W + x) * C;
      const d = (y * W + (W - 1 - x)) * C;
      for (let c = 0; c < C; c++) out.data[d + c] = img.data[s + c];
    }
  }
  return out;
}

// --- resampling -------------------------------------------------------------

// OpenCV's area-resize weights along one axis: each destination pixel
// averages the source span it covers, weighted by overlap.
// (computeResizeAreaTab in OpenCV's resize.cpp, step for step.)
function areaTab(src, dst) {
  const scale = 1 / (dst / src);
  const f32 = Math.fround;
  const tab = [];
  for (let dx = 0; dx < dst; dx++) {
    const fsx1 = dx * scale;
    const fsx2 = fsx1 + scale;
    const cellWidth = Math.min(scale, src - fsx1);
    let sx1 = Math.ceil(fsx1);
    let sx2 = Math.floor(fsx2);
    sx2 = Math.min(sx2, src - 1);
    sx1 = Math.min(sx1, sx2);
    const w = [];
    if (sx1 - fsx1 > 1e-3) w.push([sx1 - 1, f32((sx1 - fsx1) / cellWidth)]);
    for (let sx = sx1; sx < sx2; sx++) w.push([sx, f32(1 / cellWidth)]);
    if (fsx2 - sx2 > 1e-3) w.push([sx2, f32(Math.min(Math.min(fsx2 - sx2, 1), cellWidth) / cellWidth)]);
    tab.push(w);
  }
  return tab;
}

// Bicubic weights (OpenCV's a = -0.75) along one axis, for upscaling.
function cubicTab(src, dst) {
  const scale = src / dst;
  const A = -0.75;
  const k = (x) => {
    x = Math.abs(x);
    if (x < 1) return ((A + 2) * x - (A + 3)) * x * x + 1;
    if (x < 2) return ((A * x - 5 * A) * x + 8 * A) * x - 4 * A;
    return 0;
  };
  const tab = [];
  for (let dx = 0; dx < dst; dx++) {
    const fx = (dx + 0.5) * scale - 0.5;
    const sx = Math.floor(fx);
    const t = fx - sx;
    const w = [];
    for (let i = -1; i <= 2; i++) w.push([Math.min(src - 1, Math.max(0, sx + i)), k(t - i)]);
    tab.push(w);
  }
  return tab;
}

/** Resize like cv2.resize: INTER_AREA when shrinking, else INTER_CUBIC. */
export function resize(img, dw, dh) {
  const { width: W, height: H, channels: C } = img;
  const shrink = dw <= W && dh <= H;
  const tx = shrink ? areaTab(W, dw) : cubicTab(W, dw);
  const ty = shrink ? areaTab(H, dh) : cubicTab(H, dh);
  // horizontal pass
  const mid = new Float64Array(dw * H * C);
  for (let y = 0; y < H; y++) {
    for (let dx = 0; dx < dw; dx++) {
      for (const [sx, w] of tx[dx]) {
        const s = (y * W + sx) * C;
        const d = (y * dw + dx) * C;
        for (let c = 0; c < C; c++) mid[d + c] += img.data[s + c] * w;
      }
    }
  }
  const out = image(dw, dh, C);
  for (let dy = 0; dy < dh; dy++) {
    for (const [sy, w] of ty[dy]) {
      for (let dx = 0; dx < dw; dx++) {
        const s = (sy * dw + dx) * C;
        const d = (dy * dw + dx) * C;
        for (let c = 0; c < C; c++) out.data[d + c] += mid[s + c] * w;
      }
    }
  }
  return out;
}

/** Template at art scale s (and mirrored), clipped to 0-255. */
export function scaled(img, s, flip = false) {
  const src = flip ? flipX(img) : img;
  const out = resize(src, Math.max(1, pyRound(img.width * s)), Math.max(1, pyRound(img.height * s)));
  for (let i = 0; i < out.data.length; i++) out.data[i] = Math.min(255, Math.max(0, out.data[i]));
  return out;
}

/** Rotated `deg` clockwise on screen about the center, on a grown square canvas (bicubic). */
export function rotated(img, deg) {
  const { width: w, height: h, channels: C } = img;
  const d = Math.ceil(Math.hypot(w, h));
  const r = (deg * Math.PI) / 180;
  const cos = Math.cos(r);
  const sin = Math.sin(r);
  const out = image(d, d, C);
  const A = -0.75;
  const k = (x) => {
    x = Math.abs(x);
    if (x < 1) return ((A + 2) * x - (A + 3)) * x * x + 1;
    if (x < 2) return ((A * x - 5 * A) * x + 8 * A) * x - 4 * A;
    return 0;
  };
  for (let y = 0; y < d; y++) {
    for (let x = 0; x < d; x++) {
      // inverse map: destination → source about the shared center
      const dx = x - d / 2;
      const dy = y - d / 2;
      const sx = cos * dx + sin * dy + w / 2;
      const sy = -sin * dx + cos * dy + h / 2;
      const x0 = Math.floor(sx);
      const y0 = Math.floor(sy);
      for (let c = 0; c < C; c++) {
        let v = 0;
        for (let j = -1; j <= 2; j++) {
          const yy = y0 + j;
          if (yy < 0 || yy >= h) continue;
          const wy = k(sy - yy);
          for (let i = -1; i <= 2; i++) {
            const xx = x0 + i;
            if (xx < 0 || xx >= w) continue;
            v += img.data[(yy * w + xx) * C + c] * wy * k(sx - xx);
          }
        }
        out.data[(y * d + x) * C + c] = v;
      }
    }
  }
  return out;
}

// --- blur -------------------------------------------------------------------

function gaussianKernel(sigma) {
  // OpenCV's size for float images: round(sigma * 4 * 2 + 1), made odd.
  const n = Math.round(sigma * 8 + 1) | 1;
  const half = (n - 1) / 2;
  const k = [];
  let sum = 0;
  for (let i = 0; i < n; i++) {
    const v = Math.exp(-((i - half) ** 2) / (2 * sigma * sigma));
    k.push(v);
    sum += v;
  }
  return k.map((v) => v / sum);
}

const reflect101 = (i, n) => {
  if (n === 1) return 0;
  while (i < 0 || i >= n) i = i < 0 ? -i : 2 * n - 2 - i;
  return i;
};

/** Separable Gaussian blur of the first `channels` channels (reflect-101 border). */
export function blur(img, sigma, channels = img.channels) {
  if (!sigma) return img;
  const { width: W, height: H, channels: C } = img;
  const k = gaussianKernel(sigma);
  const half = (k.length - 1) / 2;
  const tmp = new Float64Array(W * H * C);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      for (let c = 0; c < channels; c++) {
        let v = 0;
        for (let i = 0; i < k.length; i++) v += k[i] * img.data[(y * W + reflect101(x + i - half, W)) * C + c];
        tmp[(y * W + x) * C + c] = v;
      }
    }
  }
  const out = image(W, H, C, Float32Array.from(img.data));
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      for (let c = 0; c < channels; c++) {
        let v = 0;
        for (let i = 0; i < k.length; i++) v += k[i] * tmp[(reflect101(y + i - half, H) * W + x) * C + c];
        out.data[(y * W + x) * C + c] = v;
      }
    }
  }
  return out;
}

/** RGBA over a flat color → 3-channel. */
export function flatten(img, bg = [255, 0, 255]) {
  const { width: W, height: H } = img;
  const out = image(W, H, 3);
  for (let i = 0; i < W * H; i++) {
    const a = img.data[i * 4 + 3] / 255;
    for (let c = 0; c < 3; c++) out.data[i * 3 + c] = img.data[i * 4 + c] * a + bg[c] * (1 - a);
  }
  return out;
}

// --- peeling matcher --------------------------------------------------------

/**
 * Front-to-back "peeling" matcher. The target is a flattened, lightly
 * blurred sprite; `covered` (0..1 per pixel) marks what fits so far (and
 * the shared head) already explain, so a part tucked under another is
 * scored only where it shows.
 */
export class Peeler {
  constructor(target, covered, { minVisible = 0.35, blur: sigma = 1.0 } = {}) {
    this.P = target;
    this.W = target.width;
    this.H = target.height;
    this.cov = covered;
    this.minVisible = minVisible;
    this.sigma = sigma;
    this.cache = new Map();
  }

  /** { mask (0/1 per template px), T (blurred RGB), w, h, offsets, count } for a template. */
  template(key, img, s, flip) {
    const k = `${key}|${s}|${flip ? 1 : 0}`;
    if (!this.cache.has(k)) {
      const q = scaled(img, s, flip);
      const T = blur(q, this.sigma, 3);
      const n = q.width * q.height;
      const mask = new Uint8Array(n);
      const idx = [];
      for (let i = 0; i < n; i++) {
        if (q.data[i * 4 + 3] / 255 > 0.5) {
          mask[i] = 1;
          idx.push(i);
        }
      }
      this.cache.set(k, { mask, T, w: q.width, h: q.height, idx: Int32Array.from(idx) });
    }
    return this.cache.get(k);
  }

  /**
   * Best top-left within win = [x0, y0, x1, y1] (top-left range, inclusive,
   * clamped to the image) by masked RMS error over uncovered pixels.
   * Ties go to the first in row-major order, as cv2.minMaxLoc does.
   * `cutoff` (an error to beat, e.g. the best over other scales) only
   * speeds things up: positions that can't get under it are skipped, and
   * null comes back if none can.
   */
  score(key, img, s, flip, win = null, cutoff = Infinity) {
    const t = this.template(key, img, s, flip);
    const { w: tw, h: th, idx, T } = t;
    if (idx.length < 6 || th >= this.H || tw >= this.W) return null;
    let [x0, y0, x1, y1] = win ? [Math.max(0, win[0]), Math.max(0, win[1]), win[2], win[3]] : [0, 0, this.W - tw, this.H - th];
    x1 = Math.min(x1, this.W - tw);
    y1 = Math.min(y1, this.H - th);
    if (x1 < x0 || y1 < y0) return null;
    const W = this.W;
    const P = this.P.data;
    const cov = this.cov;
    const n = idx.length;
    // template pixel → offset in the target, and its blurred color
    const off = new Int32Array(n);
    const tr = new Float32Array(n * 3);
    for (let j = 0; j < n; j++) {
      const i = idx[j];
      const ty = (i / tw) | 0;
      off[j] = ty * W + (i - ty * tw);
      tr[j * 3] = T.data[i * 4];
      tr[j * 3 + 1] = T.data[i * 4 + 1];
      tr[j * 3 + 2] = T.data[i * 4 + 2];
    }
    let best = null;
    // Exact pruning: the visible count can only grow to n, so once
    // num / (3n) passes the best error², this position can't win.
    let bound = cutoff < 1e9 ? cutoff * cutoff * 3 * Math.max(n, 1) * (1 + 1e-9) : Infinity;
    for (let py = y0; py <= y1; py++) {
      for (let px = x0; px <= x1; px++) {
        const base = py * W + px;
        let num = 0;
        let cnt = 0;
        let pruned = false;
        for (let j = 0; j < n; j++) {
          if ((j & 1023) === 1023 && num > bound) {
            pruned = true;
            break;
          }
          const p = base + off[j];
          const wv = 1 - cov[p];
          if (wv === 0) continue;
          const pi = p * 3;
          const a = P[pi] - tr[j * 3];
          const b = P[pi + 1] - tr[j * 3 + 1];
          const c = P[pi + 2] - tr[j * 3 + 2];
          num += wv * (a * a + b * b + c * c);
          cnt += wv;
        }
        if (pruned) continue;
        const vis = cnt / n;
        const err = vis >= this.minVisible ? Math.sqrt(Math.max(num, 0) / Math.max(cnt * 3, 1)) : 1e9;
        if (!best || err < best.err) {
          best = { err, px, py, s, flip: flip ? 1 : 0, w: tw, h: th, vis };
          if (err < 1e9) bound = err * err * 3 * Math.max(n, 1) * (1 + 1e-9);
        }
      }
    }
    return best;
  }

  /**
   * The `k` best top-lefts in a window, at least `apart` px from each
   * other (local minima of the error map), best first.
   */
  candidates(key, img, s, flip, win, k = 5, apart = 8) {
    const t = this.template(key, img, s, flip);
    const [x0, y0] = [Math.max(0, win[0]), Math.max(0, win[1])];
    const x1 = Math.min(win[2], this.W - t.w);
    const y1 = Math.min(win[3], this.H - t.h);
    const all = [];
    for (let py = y0; py <= y1; py++) {
      for (let px = x0; px <= x1; px++) {
        const r = this.score(key, img, s, flip, [px, py, px, py]);
        if (r && r.err < 1e9) all.push(r);
      }
    }
    all.sort((a, b) => a.err - b.err);
    const out = [];
    for (const r of all) {
      if (out.every((o) => Math.hypot(o.px - r.px, o.py - r.py) >= apart)) out.push(r);
      if (out.length === k) break;
    }
    return out;
  }

  /** Marks a placed template's pixels as covered. */
  cover(fit, key, img) {
    const t = this.template(key, img, fit.s, fit.flip);
    for (let y = 0; y < t.h; y++) {
      const ty = fit.py + y;
      if (ty < 0 || ty >= this.H) continue;
      for (let x = 0; x < t.w; x++) {
        const tx = fit.px + x;
        if (tx < 0 || tx >= this.W) continue;
        if (t.mask[y * t.w + x]) this.cov[ty * this.W + tx] = 1;
      }
    }
  }
}
