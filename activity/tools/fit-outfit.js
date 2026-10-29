// Fits an outfit's atlas parts against its reference sprite and writes them
// into rig.json (docs/hangout-activity.md §3.5). One data-driven tool for
// every character and outfit: everything outfit-specific is in
// <outfit dir>/fit.json.
//
//   node activity/tools/fit-outfit.js <character> [--outfit <name>]
//        [--propose] [--only id,id] [--dry]
//
// fit.json:
//   { "scale": 0.7,                             // band center (default: the outfit's scale)
//     "scales": { "band": 0.03, "step": 0.01 },  // searched around it
//     "minVisible": 0.15, "blur": 0.6,            // see lib/match.js Peeler
//     "coverShared": true,                        // the shared head starts out covered
//     "peel": true,                               // each fit covers what it explains
//     "rotations": [-14, 14, 2],                  // the search for `rotate: true`
//     "parts": [                                  // front to back
//       { "id": "tee", "candidates": ["p101"], "center": [384, 462], "radius": 30,
//         "flips": [0], "parent": "torso", "z": 200 },
//       { "id": "sleeve_cap_r", ..., "rotate": true },          // or a list of degrees
//       { "id": "band_r", ..., "image": "p140",                 // written image, if not the winner
//         "override": { "center": [246.5, 562.5], "scale": [0.62, 0.58], "flipX": false } },
//       { "id": "collar_back", ..., "write": false },           // fitted for coverage only
//       { "id": "pants", ..., "lines": "p210" },                // line art bound to its fill
//       { "id": "iris_r", ..., "parent": "head", "shared": true },  // the shared head
//       { "id": "neck_skin", ..., "clip": 2 } ],                // art cut to the sprite
//     "bones": { "shoulder_r": { "part": "sleeve_upper_r", "at": [0.5, 0.08] } },
//     "hands": { "pivot": [0.5, 0.05], "z": 230, "limits": [-35, 35], "default": "relaxed",
//                "poses": { "relaxed": "p153", ... },
//                "sides": { "r": { "fit": "hand_r", "parent": "forearm_r" }, ... },
//                "set": "white", "sets": { "bare": { "poses": { ... } } },  // optional hand sets
//                "mirrored": ["fist"] },     // poses drawn for the other hand (a set may override)
//     "hotspots": { "chest": { "part": "tee", "rect": [300, 270, 468, 420] } } }
//
// Parts: `candidates` are atlas part ids (or "hands" for every hand pose);
// each is template-matched within `radius` px of `center` (reference px)
// over the scales, `flips` (default both) and, if asked, rotations; the
// lowest error wins. A part's center comes from the fitted template's size.
// `override` replaces fitted values when writing (mostly hidden parts the
// fit can only cover, not place); a `null` in override.center keeps that
// axis. `pin` is an override the fit is only checked against: the tool
// prints how far the search lands from it, then writes the pin.
//
// `lines` binds a line-art layer to its fill: the template is the fill with
// the lines over it (at `offset` in atlas px from the fill's top-left), and
// both are written with one fit, the lines as `<id>_lines` just above the
// fill. Without `offset` the lines are aligned to the fill's edge; that's
// weak when they're mostly interior seams (it says so), so pin the offset
// once it looks right.
//
// `bones` sets bone positions from fits: `part` + `at` (normalized in the
// fitted part's image), `parts` + `at` (that point averaged over several,
// e.g. hips between the legs) or `at` alone (reference px), in the order
// listed. Shared bones can only be set from the default outfit.
//
// `shared` parts are the head every outfit shows (face layers, atlas hair):
// fitted like any other part but written to the top-level `parts`, under a
// shared bone, and only from the default outfit. List them first (they're
// in front of the collar) with their own `scales` when the atlas draws the
// head at another scale than the body. The shared head that `coverShared`
// starts out covered leaves these out, so a rerun fits them again instead
// of finding them already covered.
//
// --propose fills in `center` for parts that have none with a coarse
// whole-image search (marked "proposed": true for a human to confirm), and
// `scale` when neither fit.json nor the outfit has one (a wide search on
// the largest part), and writes fit.json only. A part's `within`
// ([x0, y0, x1, y1], reference px) keeps its search inside that box (hair
// strands inside the head), and its own `scales` replace the outfit's band.
// The scale estimate is only a start: an atlas can draw accessories and
// the head smaller than the body, so check it against two or three parts.
//
// `clip` (px) writes the part's art masked to the sprite's silhouette at
// rest, grown by that many px (shrunk if negative; 0 still leaves the art
// under the outline's soft edge), as derived/<id>_clip.png: for art that's
// right inside the sprite but spills past its edge (a neck base wider than
// the collar, a face blob rounder than the jaw). Motion can still show the
// cut edge, so keep it to parts that move little.
//
// Existing parts are updated in place (order kept, skin_* and parts the fit
// doesn't name untouched); new ones are appended in z order.

import fs from "node:fs";
import path from "node:path";

import { apply, invert, roundTo, solve, spriteMatrix, withOutfit } from "../src/rig/skeleton.js";
import { Peeler, blur, flatten, image, loadRGBA, pyRound, resize, rotated } from "./lib/match.js";
import { isSolid, readPng, writePng } from "./lib/png.js";
import { readHandFits } from "./lib/hand-fits.js";
import { fitFile, readRig, sharedCover, writeRig } from "./lib/render.js";

const round2 = (v) => roundTo(v, 2);

// --- search ranges ----------------------------------------------------------

/** The scales searched: the outfit's scale ± band, in steps. */
export function scaleBand(base, { band = 0.03, step = 0.01 } = {}) {
  const n = Math.round(band / step);
  const out = [];
  for (let i = -n; i <= n; i++) out.push(Math.round((base + i * step) * 100) / 100);
  return out;
}

function degrees(spec, rotate) {
  if (!rotate) return [0];
  if (Array.isArray(rotate)) return rotate;
  const [lo, hi, step] = spec.rotations ?? [-14, 14, 2];
  const out = [];
  for (let d = lo; d <= hi; d += step) out.push(d);
  return out;
}

// --- line art ---------------------------------------------------------------

/** Fill with its line art over it, as one RGBA image; offsets of each inside. */
export function bindLines(fill, lines, offset) {
  const [dx, dy] = offset;
  const x0 = Math.min(0, dx);
  const y0 = Math.min(0, dy);
  const w = Math.max(fill.width, dx + lines.width) - x0;
  const h = Math.max(fill.height, dy + lines.height) - y0;
  const out = image(w, h, 4);
  const over = (src, ox, oy) => {
    for (let y = 0; y < src.height; y++) {
      for (let x = 0; x < src.width; x++) {
        const s = (y * src.width + x) * 4;
        const d = ((y + oy) * w + (x + ox)) * 4;
        const a = src.data[s + 3] / 255;
        const b = out.data[d + 3] / 255;
        const outA = a + b * (1 - a);
        for (let c = 0; c < 3; c++) {
          out.data[d + c] = outA ? (src.data[s + c] * a + out.data[d + c] * b * (1 - a)) / outA : 0;
        }
        out.data[d + 3] = outA * 255;
      }
    }
  };
  over(fill, -x0, -y0);
  over(lines, dx - x0, dy - y0);
  return { img: out, fillAt: [-x0, -y0], linesAt: [dx - x0, dy - y0] };
}

/**
 * Where line art sits on its fill: the offset (line top-left from fill
 * top-left, atlas px) that lays the most line pixels on the fill's edge,
 * searched within `radius` px of centering the two.
 */
export function alignLines(fill, lines, radius = 12) {
  const edge = new Uint8Array(fill.width * fill.height);
  const solid = (x, y) => x >= 0 && y >= 0 && x < fill.width && y < fill.height && isSolid(fill.data, y * fill.width + x);
  for (let y = 0; y < fill.height; y++) {
    for (let x = 0; x < fill.width; x++) {
      if (solid(x, y) && (!solid(x - 1, y) || !solid(x + 1, y) || !solid(x, y - 1) || !solid(x, y + 1))) edge[y * fill.width + x] = 1;
    }
  }
  // grow the edge 1 px so a line drawn just outside still counts
  const near = edge.slice();
  for (let y = 0; y < fill.height; y++) {
    for (let x = 0; x < fill.width; x++) {
      if (!edge[y * fill.width + x]) continue;
      for (const [ex, ey] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = x + ex;
        const ny = y + ey;
        if (nx >= 0 && ny >= 0 && nx < fill.width && ny < fill.height) near[ny * fill.width + nx] = 1;
      }
    }
  }
  const ink = [];
  for (let y = 0; y < lines.height; y++) {
    for (let x = 0; x < lines.width; x++) if (isSolid(lines.data, y * lines.width + x)) ink.push([x, y]);
  }
  const cx = Math.round((fill.width - lines.width) / 2);
  const cy = Math.round((fill.height - lines.height) / 2);
  let best = { offset: [cx, cy], hits: -1, d: Infinity };
  for (let dy = cy - radius; dy <= cy + radius; dy++) {
    for (let dx = cx - radius; dx <= cx + radius; dx++) {
      let hits = 0;
      for (const [x, y] of ink) {
        const fx = x + dx;
        const fy = y + dy;
        if (fx >= 0 && fy >= 0 && fx < fill.width && fy < fill.height && near[fy * fill.width + fx]) hits++;
      }
      // ties go to the offset nearest the centered one
      const d = Math.hypot(dx - cx, dy - cy);
      if (hits > best.hits || (hits === best.hits && d < best.d)) best = { offset: [dx, dy], hits, d };
    }
  }
  return { offset: best.offset, hits: best.hits, share: ink.length ? best.hits / ink.length : 0 };
}

// --- fitting ----------------------------------------------------------------

/**
 * Runs the fits in fit.json order. Returns { fits: { id → fit }, peeler }.
 * A fit is { err, px, py, s, flip, w, h, vis, part, rot, center, lines? }.
 */
export async function runFits(spec, { target, cover, partImage, scales, only = null, log = console.log }) {
  const peeler = new Peeler(target, cover, { minVisible: spec.minVisible ?? 0.35, blur: spec.blur ?? 1.0 });
  const fits = {};
  const images = new Map(); // template key → RGBA image
  const keyed = (key, make) => {
    if (!images.has(key)) images.set(key, make());
    return images.get(key);
  };
  for (const entry of spec.parts) {
    if (only && !only.includes(entry.id)) continue;
    if (entry.proposed) log(`[fit] ${entry.id}: center is a proposal; confirm it (drop "proposed") once it looks right`);
    if (!entry.candidates) continue; // placed by override alone
    const candidates = entry.candidates === "hands" ? [...new Set(Object.values(spec.hands?.poses ?? {}))] : entry.candidates;
    const flips = entry.flips ?? [0, 1];
    const rots = degrees(spec, entry.rotate);
    const [cx, cy] = entry.center;
    const r = entry.radius ?? 20;
    const lines = entry.lines ? (typeof entry.lines === "string" ? { part: entry.lines } : entry.lines) : null;
    let best = null;
    for (const part of candidates) {
      let base = partImage(part);
      let bound = null;
      if (lines) {
        const art = partImage(lines.part);
        let offset = lines.offset;
        if (!offset) {
          const al = alignLines(base, art);
          offset = al.offset;
          if (part === candidates[0]) {
            log(`[fit] ${entry.id}: lines ${lines.part} aligned at ${offset.join(",")} (${Math.round(al.share * 100)}% of line px on the fill's edge)`
              + (al.share < 0.5 ? "; weak, check it in the render and pin lines.offset" : ""));
          }
        }
        bound = { ...bindLines(base, art, offset), offset };
        base = bound.img;
      }
      for (const deg of rots) {
        const key = `${part}${lines ? `+${lines.part}` : ""}${deg ? `@${deg}` : ""}`;
        const img = deg ? keyed(key, () => rotated(base, deg)) : keyed(key, () => base);
        for (const s of entry.scales ?? scales) {
          for (const flip of flips) {
            const tw = Math.max(1, pyRound(img.width * s));
            const th = Math.max(1, pyRound(img.height * s));
            const win = [cx - Math.floor(tw / 2) - r, cy - Math.floor(th / 2) - r, cx - Math.floor(tw / 2) + r, cy - Math.floor(th / 2) + r];
            const res = peeler.score(key, img, s, flip, win, best?.err);
            if (res && (!best || res.err < best.err)) best = { ...res, key, img, part, rot: deg, bound };
          }
        }
      }
    }
    if (!best) {
      log(`[fit] ${entry.id}: no placement inside the window`);
      continue;
    }
    if (spec.peel !== false) peeler.cover(best, best.key, best.img);
    const { key, img, bound, ...fit } = best;
    fit.center = [fit.px + fit.w / 2, fit.py + fit.h / 2];
    if (bound) {
      const fill = partImage(fit.part);
      const art = partImage(lines.part);
      fit.lines = {
        part: lines.part, offset: bound.offset, size: [img.width, img.height],
        fillAt: bound.fillAt, fillSize: [fill.width, fill.height],
        linesAt: bound.linesAt, linesSize: [art.width, art.height],
      };
    }
    fits[entry.id] = fit;
    log(`[fit] ${entry.id.padEnd(16)} ${fit.part}${fit.rot ? ` rot=${fit.rot}` : ""} err=${fit.err.toFixed(1)} s=${fit.s} flip=${fit.flip} c=(${fit.center.map((v) => v.toFixed(1)).join(",")}) vis=${fit.vis.toFixed(2)}`);
  }
  return { fits, peeler };
}

/**
 * Coarse whole-image search for parts without a center: the few best spots
 * on a shrunk sprite (by 4, or 2 for small parts), each re-scored at full
 * size, minus what earlier parts and the shared head cover. It helps the
 * human rather than replacing them: tiny and mostly hidden parts still need
 * a look. Side by name: `sides` maps an id suffix to the half of the image
 * it sits in (default { "_r": "left", "_l": "right" }: a character's right
 * is the viewer's left), and once one of a pair has a center its partner is
 * searched near the mirrored point. Returns { id → [x, y] }.
 */
export function proposeCenters(spec, { target, cover, partImage, scale, centerX = target.width / 2, log = console.log }) {
  const sides = spec.sides ?? { _r: "left", _l: "right" };
  const levels = new Map();
  const level = (factor) => {
    if (!levels.has(factor)) levels.set(factor, resize(target, Math.round(target.width / factor), Math.round(target.height / factor)));
    return levels.get(factor);
  };
  const minVisible = Math.max(spec.minVisible ?? 0.35, 0.5);
  const full = new Peeler(target, cover, { minVisible, blur: spec.blur ?? 1.0 });
  const scales = scaleBand(scale, spec.scales);
  const centers = Object.fromEntries(spec.parts.filter((e) => e.center).map((e) => [e.id, e.center]));
  const out = {};
  for (const entry of spec.parts) {
    if (!entry.candidates) continue;
    const candidates = entry.candidates === "hands" ? [...new Set(Object.values(spec.hands?.poses ?? {}))] : entry.candidates;
    const suffix = Object.keys(sides).find((k) => entry.id.endsWith(k));
    const partner = suffix && Object.keys(sides).map((k) => entry.id.slice(0, -suffix.length) + k).find((id) => id !== entry.id && centers[id]);
    // a part with its own scales (the head) is searched around their middle
    const own = entry.scales ?? scales;
    const base = entry.scales ? own[Math.floor(own.length / 2)] : scale;
    let best = null;
    for (const part of candidates) {
      const img = partImage(part);
      const factor = Math.min(img.width, img.height) * base < 96 ? 2 : 4;
      const small = level(factor);
      const cov = new Float32Array(small.width * small.height);
      for (let i = 0; i < cov.length; i++) {
        const x = (i % small.width) * factor;
        const y = Math.floor(i / small.width) * factor;
        cov[i] = cover[Math.min(target.height - 1, y) * target.width + Math.min(target.width - 1, x)];
      }
      const coarse = new Peeler(small, cov, { minVisible, blur: 0 });
      const s = base / factor;
      const tw = Math.max(1, Math.round(img.width * s));
      const th = Math.max(1, Math.round(img.height * s));
      let win = [0, 0, small.width, small.height];
      if (entry.within) {
        const [x0, y0, x1, y1] = entry.within.map((v) => v / factor);
        win = [x0, y0, x1 - tw, y1 - th].map(Math.round);
      } else if (partner) {
        const [mx, my] = [2 * centerX - centers[partner][0], centers[partner][1]];
        const r = 48 / factor;
        win = [mx / factor - tw / 2 - r, my / factor - th / 2 - r, mx / factor - tw / 2 + r, my / factor - th / 2 + r].map(Math.round);
      } else if (suffix) {
        const lim = Math.round(centerX / factor - tw / 2);
        win = sides[suffix] === "left" ? [0, 0, lim, small.height] : [lim, 0, small.width, small.height];
      }
      for (const flip of entry.flips ?? [0, 1]) {
        for (const c of coarse.candidates(`${part}/${factor}`, img, s, flip, win, 4, Math.max(tw, th) / 4)) {
          // re-score at full size around the coarse spot
          const cx = (c.px + c.w / 2) * factor;
          const cy = (c.py + c.h / 2) * factor;
          for (const sc of own) {
            const fw = Math.max(1, pyRound(img.width * sc));
            const fh = Math.max(1, pyRound(img.height * sc));
            const r = factor * 2;
            const fwin = [cx - fw / 2 - r, cy - fh / 2 - r, cx - fw / 2 + r, cy - fh / 2 + r].map(Math.round);
            const res = full.score(part, img, sc, flip, fwin, best?.err);
            if (res && (!best || res.err < best.err)) best = { ...res, part, img };
          }
        }
      }
    }
    if (!best) continue;
    full.cover(best, best.part, best.img);
    const center = [Math.round(best.px + best.w / 2), Math.round(best.py + best.h / 2)];
    if (!entry.center) {
      out[entry.id] = center;
      centers[entry.id] = center;
      log(`[propose] ${entry.id.padEnd(16)} center ≈ ${center.join(",")} (${best.part}, err ${best.err.toFixed(1)}, visible ${best.vis.toFixed(2)})`);
    }
  }
  return out;
}

/**
 * The outfit's art scale (atlas px → reference px), estimated from the
 * entry with the largest candidate: a wide coarse search over `range`
 * on the sprite shrunk by 4, then refined at full size. For a new outfit,
 * before the narrow per-part band means anything.
 */
export function estimateScale(spec, { target, cover, partImage, range = [0.4, 1.3, 0.02], log = console.log }) {
  let biggest = null;
  for (const entry of spec.parts) {
    if (!Array.isArray(entry.candidates)) continue;
    for (const part of entry.candidates) {
      const img = partImage(part);
      if (!biggest || img.width * img.height > biggest.img.width * biggest.img.height) biggest = { part, img, entry };
    }
  }
  if (!biggest) return null;
  const factor = 4;
  const small = resize(target, Math.round(target.width / factor), Math.round(target.height / factor));
  const cov = new Float32Array(small.width * small.height);
  for (let i = 0; i < cov.length; i++) {
    cov[i] = cover[Math.min(target.height - 1, Math.floor(i / small.width) * factor) * target.width + Math.min(target.width - 1, (i % small.width) * factor)];
  }
  const coarse = new Peeler(small, cov, { minVisible: 0.5, blur: 0 });
  const [lo, hi, step] = range;
  let best = null;
  for (let sc = lo; sc <= hi + 1e-9; sc += step) {
    const s = Math.round(sc * 100) / 100;
    for (const flip of biggest.entry.flips ?? [0, 1]) {
      const r = coarse.score(`${biggest.part}/scale`, biggest.img, s / factor, flip, null, best?.err);
      if (r && (!best || r.err < best.err)) best = { ...r, s };
    }
  }
  if (!best) return null;
  // refine at full size around the coarse spot
  const full = new Peeler(target, cover, { minVisible: 0.5, blur: spec.blur ?? 1.0 });
  const cx = (best.px + best.w / 2) * factor;
  const cy = (best.py + best.h / 2) * factor;
  let fine = null;
  for (let sc = best.s - step; sc <= best.s + step + 1e-9; sc += 0.01) {
    const s = Math.round(sc * 100) / 100;
    const w = pyRound(biggest.img.width * s);
    const h = pyRound(biggest.img.height * s);
    for (const flip of biggest.entry.flips ?? [0, 1]) {
      const r = full.score(biggest.part, biggest.img, s, flip, [cx - w / 2 - 8, cy - h / 2 - 8, cx - w / 2 + 8, cy - h / 2 + 8].map(Math.round), fine?.err);
      if (r && (!fine || r.err < fine.err)) fine = r;
    }
  }
  const scale = fine?.s ?? best.s;
  log(`[propose] scale ≈ ${scale} (from ${biggest.entry.id} = ${biggest.part}, err ${(fine ?? best).err.toFixed(1)})`);
  return scale;
}

// --- the head, from the portrait -------------------------------------------

/**
 * Where the expression portrait lies on the sprite: scale `k` and top-left
 * `at` (reference px, sub-pixel), so portrait px (u, v) → at + k·(u, v).
 * The portrait is the same drawing about 3× larger, so the head's parts
 * are fitted there, where an iris has 9× the pixels, and mapped onto the
 * sprite with this (Alan's head was fitted the same way). `head.at` is a
 * rough top-left, searched within `radius` px over `scales` [lo, hi, step].
 */
export function registerPortrait(portrait, { target, at, radius = 20, scales = [0.3, 0.4, 0.005], blur: sigma = 0 }) {
  const peeler = new Peeler(target, new Float32Array(target.width * target.height), { minVisible: 0.5, blur: sigma });
  const [lo, hi, step] = scales;
  const win = [at[0] - radius, at[1] - radius, at[0] + radius, at[1] + radius].map(Math.round);
  let best = null;
  const tryScale = (k, w) => {
    const r = peeler.score("portrait", portrait, k, 0, w, best?.err);
    if (r && (!best || r.err < best.err)) best = r;
  };
  for (let k = lo; k <= hi + 1e-9; k += step) tryScale(roundTo(k, 4), win);
  // finer scales around the best, near its spot
  const near = [best.px - 3, best.py - 3, best.px + 3, best.py + 3];
  for (let k = best.s - step; k <= best.s + step + 1e-9; k += step / 10) tryScale(roundTo(k, 4), near);
  // sub-pixel: a parabola through the error either side, per axis
  const e = (dx, dy) => peeler.score("portrait", portrait, best.s, 0, [best.px + dx, best.py + dy, best.px + dx, best.py + dy]).err;
  const vertex = (m, z, p) => {
    const d = m - 2 * z + p;
    return d > 0 ? Math.max(-0.5, Math.min(0.5, (m - p) / (2 * d))) : 0;
  };
  const e0 = best.err;
  const dx = vertex(e(-1, 0), e0, e(1, 0));
  const dy = vertex(e(0, -1), e0, e(0, 1));
  return { k: best.s, at: [roundTo(best.px + dx, 2), roundTo(best.py + dy, 2)], err: best.err };
}

/** A fit made on the portrait, moved onto the sprite. */
export function mapFit(f, { k, at: [x, y] }) {
  const m = {
    ...f,
    px: x + k * f.px, py: y + k * f.py, w: f.w * k, h: f.h * k, s: roundTo(f.s * k, 4),
    center: [x + k * f.center[0], y + k * f.center[1]],
  };
  m.onPortrait = { px: f.px, py: f.py, s: f.s };
  return m;
}

// --- writing rig.json -------------------------------------------------------

/**
 * Turns fits into rig.json parts, bones, hands and hotspots for one outfit,
 * updating `source` in place. Returns the list of written part ids.
 */
export function writeOutfit(source, outfitName, spec, fits, { log = console.log, handFits = {}, portrait = null } = {}) {
  const outfit = source.outfits[outfitName];
  const partPath = (id) => path.posix.join(outfit.dir && outfit.dir !== "." ? outfit.dir : "", "parts", `${id}.png`);
  const sharedIds = new Set(source.parts.map((p) => p.id));
  const byId = new Map([...source.parts, ...outfit.parts].map((p) => [p.id, p]));

  // Bones first: their positions move what's below them.
  for (const [boneId, b] of Object.entries(spec.bones ?? {})) {
    const bone = byId.get(boneId);
    if (!bone) throw new Error(`fit.json bones: unknown bone ${boneId}`);
    if (sharedIds.has(boneId) && outfitName !== source.defaultOutfit) {
      throw new Error(`fit.json bones: ${boneId} is shared; set it from the default outfit (${source.defaultOutfit})`);
    }
    let at = b.at;
    const anchors = b.parts ?? (b.part ? [b.part] : []);
    if (anchors.length) {
      // the same normalized point in each part, averaged (hips between the legs)
      const [u, v] = b.at ?? [0.5, 0.5];
      const pts = anchors.map((id) => {
        const f = fits[id];
        if (!f) throw new Error(`fit.json bones.${boneId}: no fit for ${id}`);
        return [f.px + (f.flip ? 1 - u : u) * f.w, f.py + v * f.h];
      });
      at = [0, 1].map((k) => pts.reduce((sum, pt) => sum + pt[k], 0) / pts.length);
    }
    const flat = withOutfit(source, outfitName);
    const solved = solve(flat, {});
    const parentBone = bone.parent == null ? [1, 0, 0, 1, 0, 0] : solved.get(bone.parent).bone;
    bone.position = apply(invert(parentBone), at).map(round2);
    log(`[fit] bone ${boneId} at ${at.map(round2).join(",")} → position ${bone.position.join(",")}`);
  }

  const solved = solve(withOutfit(source, outfitName), {});
  // The portrait's place on the head is where the expression overlays go.
  if (portrait) {
    const headAt = apply(solved.get(source.expressions.head ?? "head").bone, [0, 0]);
    source.expressions.overlayScale = roundTo(portrait.k, 5);
    source.expressions.overlayOffset = [0, 1].map((i) => round2(portrait.at[i] - headAt[i]));
    log(`[fit] portrait at ${portrait.at.join(",")} ×${portrait.k} → overlayOffset ${source.expressions.overlayOffset.join(",")}`);
  }
  const local = (bone, xy) => apply(invert(solved.get(bone).bone), xy).map(round2);
  // An image is an atlas part id (→ <dir>/parts/<id>.png) or a path
  // relative to the outfit dir (derived art, e.g. "derived/leg_r_faded.png").
  const outfitDir = outfit.dir && outfit.dir !== "." ? outfit.dir : "";
  const imagePath = (img) => (img.includes("/") ? path.posix.join(outfitDir, img) : partPath(img));
  const written = [];
  // Updating a part merges into the stored object, so its key order (and
  // any keys the fit doesn't manage) stay as they were.
  const MANAGED_OPTIONAL = ["flipX", "rotation"];
  const put = (list, part) => {
    const i = list.findIndex((p) => p.id === part.id);
    if (i === -1) list.push(part);
    else {
      const merged = { ...list[i], ...part };
      for (const k of MANAGED_OPTIONAL) if (!(k in part)) delete merged[k];
      list[i] = merged;
    }
    written.push(part.id);
  };

  const newParts = [];
  const sharedParts = new Set();
  for (const entry of spec.parts) {
    if (entry.write === false || entry.hand) continue;
    if (entry.shared) {
      if (outfitName !== source.defaultOutfit) {
        throw new Error(`fit.json ${entry.id} is shared; fit it from the default outfit (${source.defaultOutfit})`);
      }
      if (!sharedIds.has(entry.parent)) throw new Error(`fit.json ${entry.id} is shared; its parent ${entry.parent} must be a shared bone`);
      sharedParts.add(entry.id);
      if (entry.lines) sharedParts.add(`${entry.id}_lines`);
    }
    const f = fits[entry.id];
    const o = entry.override ?? entry.pin ?? {};
    if (!f && !o.center && !o.position) continue;
    const fitCenter = f?.center ?? [null, null];
    const center = o.center ? o.center.map((v, i) => v ?? fitCenter[i]) : fitCenter;
    const flip = "flipX" in o ? o.flipX : !!f?.flip;
    const p = {
      id: entry.id,
      parent: entry.parent,
      image: imagePath(entry.image ?? f.part),
      position: o.position ?? local(entry.parent, center),
      pivot: entry.pivot ?? [0.5, 0.5],
      z: entry.z,
      scale: o.scale ?? f.s,
    };
    if (flip) p.flipX = true;
    const rotation = o.rotation ?? (f?.rot && !o.center && !o.position ? f.rot : 0);
    if (rotation) p.rotation = rotation;
    if (entry.limits) p.limits = { rotation: entry.limits };
    if (entry.mesh) p.mesh = entry.mesh;
    if (entry.pin && f) {
      const pinned = o.position ? apply(solved.get(entry.parent).bone, o.position) : center;
      const d = [f.center[0] - pinned[0], f.center[1] - pinned[1]].map(round2);
      log(`[fit] ${entry.id.padEnd(16)} pinned; the search lands ${d.join(",")} px off, scale ${f.s} vs ${JSON.stringify(o.scale ?? f.s)}`);
    }
    newParts.push(p);
    if (f?.lines) {
      // The lines' center, from the fill's: both inside the bound template.
      const L = f.lines;
      const k = f.flip ? -1 : 1;
      const fillC = [L.fillAt[0] + L.fillSize[0] / 2, L.fillAt[1] + L.fillSize[1] / 2];
      const lineC = [L.linesAt[0] + L.linesSize[0] / 2, L.linesAt[1] + L.linesSize[1] / 2];
      const compC = [L.size[0] / 2, L.size[1] / 2];
      const s = typeof p.scale === "number" ? [p.scale, p.scale] : p.scale;
      const fillCenter = [f.center[0] + k * (fillC[0] - compC[0]) * s[0], f.center[1] + (fillC[1] - compC[1]) * s[1]];
      const lineCenter = [f.center[0] + k * (lineC[0] - compC[0]) * s[0], f.center[1] + (lineC[1] - compC[1]) * s[1]];
      if (!o.center && !o.position) p.position = local(entry.parent, fillCenter);
      const linesZ = typeof entry.lines === "object" ? entry.lines.z : undefined;
      newParts.push({ ...p, id: `${entry.id}_lines`, image: partPath(L.part), position: local(entry.parent, lineCenter), z: linesZ ?? entry.z + 0.01 });
    }
  }

  // Hands: the fitted pose's wrist; the default pose's art. A side's `pin`
  // ({ position, scale }) fixes the hand part; `poseScale` the poses'.
  // With `sets` ({ name: { poses, default?, poseScale? } }), the fitted
  // poses are set `set` and the outfit gets hand sets (skeleton.js).
  // `handFits` (hand-fits.json, from align-hands.js) gives a pose drawing
  // its own pivot, scale and turn per side, so its wrist joins the forearm
  // like the default pose's: { <side>: { <atlas part>: { pivot, scale, artRotation } } }.
  const h = spec.hands;
  const setHands = {};
  if (h) {
    const pivot = h.pivot ?? [0.5, 0.05];
    outfit.hands = {};
    for (const [side, { fit: fitId, parent, pin }] of Object.entries(h.sides)) {
      const f = fits[fitId];
      if (!f && !pin) throw new Error(`fit.json hands.${side}: no fit for ${fitId}`);
      const flipXv = pin && "flipX" in pin ? pin.flipX : !!f?.flip;
      const id = `hand_${side}`;
      const position = pin?.position ?? local(parent, [f.px + f.w * pivot[0], f.py + f.h * pivot[1]]);
      newParts.push({
        id, parent, image: imagePath(h.poses[h.default]), position, pivot,
        z: h.z ?? 230, scale: pin?.scale ?? f.s, ...(flipXv ? { flipX: flipXv } : {}), limits: { rotation: h.limits ?? [-35, 35] },
      });
      const poseScale = h.poseScale ?? pin?.scale ?? f.s;
      // `mirrored` poses are drawn for the other hand (Rui's fists): they
      // take the opposite flip, written out since a pose's own flipX
      // overrides the hand part's.
      const handSide = (poses, def, scale, mirrored = []) => ({
        part: id, default: def,
        poses: Object.fromEntries(Object.entries(poses).map(([name, img]) => {
          const flip = mirrored.includes(name) ? { flipX: !flipXv } : flipXv ? { flipX: true } : {};
          return [name, { image: imagePath(img), pivot, scale, ...flip, ...handFits[side]?.[img] }];
        })),
      });
      outfit.hands[side] = handSide(h.poses, h.default, poseScale, h.mirrored);
      // Extra hand sets (gloves off, other gloves) ride on the same hand
      // part; only their art (and optionally its scale) differs.
      for (const [name, set] of Object.entries(h.sets ?? {})) {
        setHands[name] ??= {};
        setHands[name][side] = handSide(set.poses, set.default ?? h.default, set.poseScale ?? poseScale, set.mirrored ?? h.mirrored);
      }
    }
    if (h.sets) {
      const main = h.set ?? "default";
      outfit.hands = { defaultSet: h.defaultSet ?? main, sets: { [main]: outfit.hands, ...setHands } };
    }
  }

  // Existing parts keep their slot; new ones go in z order.
  const listFor = (p) => (sharedParts.has(p.id) ? source.parts : outfit.parts);
  const existing = new Set([...source.parts, ...outfit.parts].map((p) => p.id));
  for (const p of newParts.filter((q) => existing.has(q.id))) put(listFor(p), p);
  for (const p of newParts.filter((q) => !existing.has(q.id)).sort((a, b) => (a.z ?? 0) - (b.z ?? 0))) put(listFor(p), p);

  for (const [name, hs] of Object.entries(spec.hotspots ?? {})) {
    const f = fits[hs.part];
    if (!f) throw new Error(`fit.json hotspots.${name}: no fit for ${hs.part}`);
    const [x0, y0, x1, y1] = hs.rect;
    outfit.hotspots = { ...outfit.hotspots, [name]: { part: hs.part, rect: [(x0 - f.px) / f.w, (y0 - f.py) / f.h, (x1 - f.px) / f.w, (y1 - f.py) / f.h].map(round2) } };
  }
  return written;
}

// --- clipping to the sprite --------------------------------------------------

/**
 * For each fit.json part with `clip`, its art with every pixel that lands
 * outside the sprite's silhouette at rest (grown by `clip` px) cleared,
 * written to <outfit dir>/derived/<id>_clip.png and set as its image.
 */
export function clipParts(source, outfitName, spec, dir, { log = console.log } = {}) {
  const outfit = source.outfits[outfitName];
  const outDir = path.join(dir, outfit.dir ?? ".");
  const sprite = readPng(path.join(dir, outfit.referenceImage));
  const { width: W, height: H } = sprite;
  const flat = withOutfit(source, outfitName);
  for (const entry of spec.parts.filter((e) => e.clip != null)) {
    const part = [...source.parts, ...outfit.parts].find((p) => p.id === entry.id);
    if (!part) continue;
    // writeOutfit has just set the atlas art again, so a rerun never clips a clip
    const art = readPng(path.join(dir, part.image));
    const sizes = new Map([[part.id, [art.width, art.height]]]);
    const m = spriteMatrix(flat, part, solve(flat, {}, sizes).get(part.id).bone, [art.width, art.height]);
    // clip > 0 grows the silhouette; clip < 0 shrinks it, so art stops
    // inside the sprite's soft outline instead of tinting it
    const r = Math.abs(entry.clip);
    const solidAt = (sx, sy) => sx >= 0 && sy >= 0 && sx < W && sy < H && isSolid(sprite.data, sy * W + sx);
    const inside = (x, y) => {
      for (let dy = -r; dy <= r; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          const hit = solidAt(Math.round(x + dx), Math.round(y + dy));
          if (entry.clip >= 0 && hit) return true;
          if (entry.clip < 0 && !hit) return false;
        }
      }
      return entry.clip < 0;
    };
    const out = Buffer.from(art.data);
    let cut = 0;
    for (let v = 0; v < art.height; v++) {
      for (let u = 0; u < art.width; u++) {
        const i = (v * art.width + u) * 4;
        if (!out[i + 3]) continue;
        const x = m[0] * (u + 0.5) + m[2] * (v + 0.5) + m[4];
        const y = m[1] * (u + 0.5) + m[3] * (v + 0.5) + m[5];
        if (!inside(x, y)) {
          out[i + 3] = 0;
          cut++;
        }
      }
    }
    const rel = path.posix.join("derived", `${entry.id}_clip.png`);
    fs.mkdirSync(path.join(outDir, "derived"), { recursive: true });
    writePng(path.join(outDir, rel), art.width, art.height, out);
    part.image = path.posix.join(outfit.dir && outfit.dir !== "." ? outfit.dir : "", rel);
    log(`[clip] ${entry.id}: ${cut} px outside the sprite cleared → ${part.image}`);
  }
}

// --- CLI --------------------------------------------------------------------

async function main() {
  const [character, ...rest] = process.argv.slice(2);
  const opt = (name) => {
    const i = rest.indexOf(`--${name}`);
    return i === -1 ? null : rest[i + 1];
  };
  if (!character) {
    console.error("usage: node activity/tools/fit-outfit.js <character> [--outfit <name>] [--propose] [--only id,id] [--dry]");
    process.exit(1);
  }
  const { dir, source } = readRig(character, { validate: false });
  const outfitName = opt("outfit") ?? source.defaultOutfit;
  const outfit = source.outfits?.[outfitName];
  if (!outfit) throw new Error(`no outfit ${outfitName} in rig.json`);
  const specFile = fitFile(dir, outfit);
  const spec = JSON.parse(fs.readFileSync(specFile, "utf8"));
  const outDir = path.join(dir, outfit.dir ?? ".");

  const targetFile = path.join(dir, spec.target ?? outfit.referenceImage);
  const target = blur(flatten(loadRGBA(targetFile)), spec.targetBlur ?? 0.6);
  const { width: W, height: H } = target;
  // The shared head covers the outfit's fit, minus the head parts this
  // fit.json places itself.
  const fitted = new Set(spec.parts.filter((e) => e.shared).flatMap((e) => [e.id, `${e.id}_lines`]));
  const coverRig = { ...source, parts: source.parts.filter((p) => !fitted.has(p.id)) };
  const cover = (spec.coverShared !== false && (await sharedCover(coverRig, dir))) || new Float32Array(W * H);
  const partCache = new Map();
  const partImage = (id) => {
    if (!partCache.has(id)) partCache.set(id, loadRGBA(path.join(outDir, "parts", `${id}.png`)));
    return partCache.get(id);
  };
  let scale = spec.scale ?? outfit.scale ?? source.scale;

  if (rest.includes("--propose")) {
    if (spec.scale == null && outfit.scale == null) {
      const estimate = estimateScale(spec, { target, cover: cover.slice(), partImage });
      if (estimate) spec.scale = scale = estimate;
    }
    const centers = proposeCenters(spec, { target, cover: cover.slice(), partImage, scale });
    for (const entry of spec.parts) {
      if (centers[entry.id]) Object.assign(entry, { center: centers[entry.id], radius: entry.radius ?? 30, proposed: true });
    }
    fs.writeFileSync(specFile, JSON.stringify(spec, null, 2) + "\n");
    console.log(`[propose] ${Object.keys(centers).length} centers written to ${specFile}`);
    return;
  }

  const only = opt("only")?.split(",") ?? null;
  // With `head`, the shared parts are fitted on the portrait and mapped
  // onto the sprite, where they cover what the body fits see.
  let portrait = null;
  let fits = {};
  let bodySpec = spec;
  if (spec.head) {
    const pimg = loadRGBA(path.join("assets/expressions", character, `${spec.head.portrait ?? "default"}.png`));
    portrait = registerPortrait(pimg, { target, ...spec.head });
    console.log(`[fit] portrait → sprite: ×${portrait.k} at ${portrait.at.join(",")} (err ${portrait.err.toFixed(1)})`);
    const ptarget = blur(flatten(pimg), spec.head.targetBlur ?? 1.0);
    const headSpec = { ...spec, parts: spec.parts.filter((e) => e.shared) };
    const onPortrait = await runFits(headSpec, {
      target: ptarget, cover: new Float32Array(ptarget.width * ptarget.height), partImage,
      scales: scaleBand(spec.head.partScale ?? 1.5, spec.head.partScales), only,
    });
    const mark = new Peeler(target, cover);
    for (const [id, f] of Object.entries(onPortrait.fits)) {
      fits[id] = mapFit(f, portrait);
      mark.cover({ ...fits[id], px: Math.round(fits[id].px), py: Math.round(fits[id].py) }, f.part, partImage(f.part));
    }
    bodySpec = { ...spec, parts: spec.parts.filter((e) => !e.shared) };
  }
  Object.assign(fits, (await runFits(bodySpec, { target, cover, partImage, scales: scaleBand(scale, spec.scales), only })).fits);
  fs.writeFileSync(path.join(outDir, "fits.json"), JSON.stringify(fits, null, 1) + "\n");
  if (only || rest.includes("--dry")) {
    console.log(`[fit] fits → ${path.join(outDir, "fits.json")} (rig.json not written${only ? " with --only" : ""})`);
    return;
  }
  const written = writeOutfit(source, outfitName, spec, fits, { handFits: readHandFits(outDir), portrait });
  clipParts(source, outfitName, spec, dir);
  writeRig(character, source);
  console.log(`[fit] ${outfitName}: wrote ${written.length} parts to rig.json`);
}

if (import.meta.url === `file://${process.argv[1]}`) main();
