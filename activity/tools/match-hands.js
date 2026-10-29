// Names a new outfit's (or hand set's) hand poses by matching them against
// an existing outfit's poses (docs/hangout-activity.md §3.5).
//
//   node activity/tools/match-hands.js <character> --outfit <new>
//        [--from <outfit>] [--from-set <set>] [--set <set>]
//        [--candidates p1,p2,...] [--min 0.5] [--write]
//
// Each candidate atlas part and each existing pose is drawn at its
// reference scale with its wrist pivot on a common point, and compared by
// silhouette overlap (IoU, best over a few px of shift). Pairs are taken
// best first; a pose whose best partner is under --min has no counterpart
// and is flagged (roomwear has no "open"), as are candidates nothing took.
//
// Candidates default to the new outfit's fit.json hand entries (or, for
// --set, that set's current poses). --write puts the names into fit.json:
// `hands.poses`, or `hands.sets.<set>.poses` for another hand set of the
// same outfit (white gloves vs bare hands).

import fs from "node:fs";
import path from "node:path";
import { createCanvas, loadImage } from "canvas";

import { withOutfit } from "../src/rig/skeleton.js";
import { fitFile } from "./fit-outfit.js";
import { readRig } from "./lib/render.js";

const CANVAS = [240, 320];
const ORIGIN = [120, 24];

/** Binary alpha of an image drawn at `scale` with its pivot at ORIGIN. */
export async function handMask(file, { scale = 1, pivot = [0.5, 0.05], flipX = false } = {}) {
  const img = await loadImage(file);
  const [W, H] = CANVAS;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  const [sx, sy] = Array.isArray(scale) ? scale : [scale, scale];
  const f = flipX ? -1 : 1;
  ctx.setTransform(sx * f, 0, 0, sy, ORIGIN[0] - pivot[0] * img.width * sx * f, ORIGIN[1] - pivot[1] * img.height * sy);
  ctx.drawImage(img, 0, 0);
  const data = ctx.getImageData(0, 0, W, H).data;
  const mask = new Uint8Array(W * H);
  for (let i = 0; i < W * H; i++) mask[i] = data[i * 4 + 3] > 128 ? 1 : 0;
  return mask;
}

/** Best IoU of two masks over shifts within ±r px. */
export function overlap(a, b, r = 4, [W, H] = CANVAS) {
  let best = 0;
  for (let dy = -r; dy <= r; dy++) {
    for (let dx = -r; dx <= r; dx++) {
      let inter = 0;
      let union = 0;
      for (let y = 0; y < H; y++) {
        const yb = y + dy;
        for (let x = 0; x < W; x++) {
          const xb = x + dx;
          const va = a[y * W + x];
          const vb = xb >= 0 && yb >= 0 && xb < W && yb < H ? b[yb * W + xb] : 0;
          if (va && vb) inter++;
          if (va || vb) union++;
        }
      }
      if (union && inter / union > best) best = inter / union;
    }
  }
  return best;
}

/**
 * Pairs pose names with candidates, best overlap first. scores[name][cand]
 * → { matches: { name: { part, iou } }, missing: [name], unused: [cand] }.
 */
export function assign(scores, min = 0.5) {
  const pairs = [];
  for (const [name, row] of Object.entries(scores)) {
    for (const [cand, iou] of Object.entries(row)) pairs.push([iou, name, cand]);
  }
  pairs.sort((a, b) => b[0] - a[0]);
  const matches = {};
  const taken = new Set();
  for (const [iou, name, cand] of pairs) {
    if (iou < min || matches[name] || taken.has(cand)) continue;
    matches[name] = { part: cand, iou };
    taken.add(cand);
  }
  const names = Object.keys(scores);
  const cands = [...new Set(Object.values(scores).flatMap((row) => Object.keys(row)))];
  return {
    matches: Object.fromEntries(names.filter((n) => matches[n]).map((n) => [n, matches[n]])),
    missing: names.filter((n) => !matches[n]),
    unused: cands.filter((c) => !taken.has(c)),
  };
}

async function main() {
  const [character, ...rest] = process.argv.slice(2);
  const opt = (name, fallback = null) => {
    const i = rest.indexOf(`--${name}`);
    return i === -1 ? fallback : rest[i + 1];
  };
  const outfitName = opt("outfit");
  if (!character || !outfitName) {
    console.error("usage: node activity/tools/match-hands.js <character> --outfit <new> [--from <outfit>] [--from-set <set>] [--set <set>] [--candidates p1,p2] [--min 0.5] [--write]");
    process.exit(1);
  }
  const { dir, source } = readRig(character, { validate: false });
  const fromName = opt("from", source.defaultOutfit);
  const from = withOutfit(source, fromName, { handSet: opt("from-set") ?? undefined });
  const outfit = source.outfits[outfitName];
  const specFile = fitFile(dir, outfit);
  const spec = fs.existsSync(specFile) ? JSON.parse(fs.readFileSync(specFile, "utf8")) : { parts: [] };
  const set = opt("set");
  const mainSet = spec.hands?.set ?? null;
  const intoSet = set && set !== mainSet;

  let candidates = opt("candidates")?.split(",");
  if (!candidates && intoSet) candidates = Object.values(spec.hands?.sets?.[set]?.poses ?? {});
  if (!candidates?.length) {
    candidates = [...new Set(spec.parts.filter((e) => e.hand && Array.isArray(e.candidates)).flatMap((e) => e.candidates))];
  }
  if (!candidates.length) throw new Error("no candidates: pass --candidates or list them on fit.json's hand entries");

  const ref = from.hands?.r;
  if (!ref) throw new Error(`${fromName} has no hands to match against`);
  const scale = Number(opt("scale")) || spec.scale || outfit.scale || source.scale;
  const partsDir = path.join(dir, outfit.dir ?? ".", "parts");
  const pivot = spec.hands?.pivot ?? Object.values(ref.poses)[0].pivot ?? [0.5, 0.05];

  const refMasks = {};
  for (const [name, pose] of Object.entries(ref.poses)) {
    refMasks[name] = await handMask(path.join(dir, pose.image), { scale: pose.scale ?? from.scale, pivot: pose.pivot ?? pivot });
  }
  const candMasks = {};
  for (const c of candidates) candMasks[c] = await handMask(path.join(partsDir, `${c}.png`), { scale, pivot });
  const scores = {};
  for (const [name, m] of Object.entries(refMasks)) {
    scores[name] = {};
    for (const [c, cm] of Object.entries(candMasks)) scores[name][c] = overlap(m, cm);
  }
  const min = Number(opt("min", 0.5));
  const { matches, missing, unused } = assign(scores, min);

  console.log(`[match-hands] ${outfitName}${set ? `/${set}` : ""} against ${fromName}${from.handSet ? `/${from.handSet}` : ""} (${candidates.length} candidates at scale ${scale})`);
  for (const [name, m] of Object.entries(matches)) {
    const runner = Object.entries(scores[name]).filter(([c]) => c !== m.part).sort((a, b) => b[1] - a[1])[0];
    console.log(`  ${name.padEnd(10)} → ${m.part}  IoU ${m.iou.toFixed(2)}${runner ? `   (next: ${runner[0]} ${runner[1].toFixed(2)})` : ""}`);
  }
  for (const name of missing) {
    const best = Object.entries(scores[name]).sort((a, b) => b[1] - a[1])[0];
    console.log(`  ${name.padEnd(10)} → no counterpart (best ${best?.[0]} at IoU ${best?.[1].toFixed(2)}, under ${min} or taken)`);
  }
  if (unused.length) console.log(`  unmatched candidates: ${unused.join(", ")}`);

  if (rest.includes("--write")) {
    const poses = Object.fromEntries(Object.entries(matches).map(([n, m]) => [n, m.part]));
    spec.hands ??= {};
    if (intoSet) {
      spec.hands.sets ??= {};
      spec.hands.sets[set] = { ...spec.hands.sets[set], poses };
    } else {
      spec.hands.poses = poses;
      if (set) spec.hands.set = set;
    }
    fs.writeFileSync(specFile, JSON.stringify(spec, null, 2) + "\n");
    console.log(`[match-hands] wrote ${Object.keys(poses).length} poses to ${specFile}`);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) main();
