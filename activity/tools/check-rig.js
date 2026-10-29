// Checks one outfit of a character's rig against its reference sprite and
// prints the numbers, naming the parts involved (docs/hangout-activity.md
// §3.5).
//
//   node activity/tools/check-rig.js <character> [--outfit <name>] [--hand-set <name>] [--record] [--json]
//
// - leak:  pixels where the sprite is opaque (α ≥ 200) but the rig draws
//          nothing (α < 8) at rest; they show as magenta in ?leak=1. Named
//          by the parts drawn nearest them.
// - spill: rig paint (α ≥ 200) where the sprite is empty (α < 8). Named by
//          the part on top there.
// - holes: enclosed see-through pixels (α < 64, cut off from the frame's
//          edge) that a bone opens at its rotation limits, and at any extra
//          angles listed in checks.json `angles`, beyond the ones already
//          enclosed at rest. Named by the parts around them, and split into
//          "tear" (the rig was opaque there at rest: art pulled apart) and
//          "walled" (background closed in, e.g. between a bent arm and the
//          torso).
// - diff:  mean absolute difference from the reference sprite, both over
//          mid gray, per channel over the sprite's footprint (0-255).
//
// Baselines live in assets/rig/<character>/checks.json:
//   { "angles": { "forearm_r": [-60, 60] },
//     "baselines": { "<outfit>": { "leak": n, "spill": n, "diff": x,
//                                  "holes": { "forearm_r@-60": n } } } }
// --record writes this outfit's numbers there; test/hangout-rig-check.test.js
// fails when an outfit gets worse than its recorded numbers.

import fs from "node:fs";
import path from "node:path";

import { clampRotation } from "../src/rig/skeleton.js";
import { imageLoader, ownership, pixels, prepareScene, readRig, renderFull, rigDir, withOutfit } from "./lib/render.js";

const SPRITE_SOLID = 200;
const RIG_EMPTY = 8;
const RIG_SOLID = 200;
const SPRITE_EMPTY = 8;
const HOLE_ALPHA = 64;
const NEAR = 6; // px searched around a leak/hole for the parts next to it

export function checksFile(character) {
  return path.join(rigDir(character), "checks.json");
}

export function readChecks(character) {
  const file = checksFile(character);
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : { angles: {}, baselines: {} };
}

/** 4-connected components of a mask: [{ pixels: [i...], box: [x, y, w, h] }]. */
export function components(mask, W, H) {
  const seen = new Uint8Array(W * H);
  const out = [];
  for (let start = 0; start < W * H; start++) {
    if (!mask[start] || seen[start]) continue;
    const stack = [start];
    seen[start] = 1;
    const px = [];
    let x0 = W, y0 = H, x1 = -1, y1 = -1;
    while (stack.length) {
      const i = stack.pop();
      px.push(i);
      const x = i % W;
      const y = (i - x) / W;
      x0 = Math.min(x0, x); x1 = Math.max(x1, x);
      y0 = Math.min(y0, y); y1 = Math.max(y1, y);
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
        const j = ny * W + nx;
        if (mask[j] && !seen[j]) {
          seen[j] = 1;
          stack.push(j);
        }
      }
    }
    out.push({ pixels: px, box: [x0, y0, x1 - x0 + 1, y1 - y0 + 1] });
  }
  return out.sort((a, b) => b.pixels.length - a.pixels.length);
}

/** Enclosed see-through pixels: transparent and not connected to the edge. */
export function enclosed(rgba, W, H, alphaMax = HOLE_ALPHA) {
  const clear = (i) => rgba[i * 4 + 3] < alphaMax;
  const outside = new Uint8Array(W * H);
  const stack = [];
  for (let i = 0; i < W * H; i++) {
    const x = i % W;
    const y = (i - x) / W;
    if ((x === 0 || y === 0 || x === W - 1 || y === H - 1) && clear(i)) {
      outside[i] = 1;
      stack.push(i);
    }
  }
  while (stack.length) {
    const i = stack.pop();
    const x = i % W;
    const y = (i - x) / W;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
      const j = ny * W + nx;
      if (!outside[j] && clear(j)) {
        outside[j] = 1;
        stack.push(j);
      }
    }
  }
  const mask = new Uint8Array(W * H);
  for (let i = 0; i < W * H; i++) if (clear(i) && !outside[i]) mask[i] = 1;
  return mask;
}

// Part ids drawn on or within `radius` px of a component, covered or not:
// atlas parts first (most pixels first), then sprite skins, which only copy
// the sprite over them.
function partsNear(comp, own, radius = NEAR) {
  const counts = new Map();
  const [bx, by, bw, bh] = comp.box;
  const inComp = new Set(comp.pixels);
  const [x0, y0, x1, y1] = [bx - radius, by - radius, bx + bw + radius, by + bh + radius];
  for (const { id, box: [lx, ly, lw, lh], alpha } of own.layers) {
    let n = 0;
    for (let y = Math.max(y0, ly); y < Math.min(y1, ly + lh); y++) {
      for (let x = Math.max(x0, lx); x < Math.min(x1, lx + lw); x++) {
        if (alpha[(y - ly) * lw + (x - lx)] >= 128 && !inComp.has(y * own.width + x)) n++;
      }
    }
    if (n) counts.set(id, n);
  }
  const skin = (id) => id.startsWith("skin_");
  return [...counts.entries()]
    .sort((a, b) => skin(a[0]) - skin(b[0]) || b[1] - a[1])
    .map(([id]) => id);
}

function ownersAt(comp, own) {
  const counts = new Map();
  for (const i of comp.pixels) {
    const id = own.owner[i] < 0 ? "(edge)" : own.ids[own.owner[i]];
    counts.set(id, (counts.get(id) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([id]) => id);
}

// `shared`: the region's main part is shared by every outfit (the head and
// hair), so the same region shows up in each outfit's check.
const describe = (comps, name, sharedIds = new Set()) =>
  comps.map((c) => {
    const parts = name(c).slice(0, 4);
    return { px: c.pixels.length, box: c.box, parts, shared: sharedIds.has(parts[0]) };
  });

/** The poses the hole check tries: [label, pose] per bone limit and extra angle. */
export function holePoses(rig, angles = {}) {
  const out = [];
  for (const part of rig.parts) {
    const tries = new Set([...(part.limits?.rotation ?? []), ...(angles[part.id] ?? [])]);
    for (const deg of tries) {
      if (!deg) continue;
      // Angles past the limits clamp; skip a clamped duplicate.
      const actual = clampRotation(part, (part.rotation ?? 0) + deg) - (part.rotation ?? 0);
      const label = `${part.id}@${Math.round(actual * 100) / 100}`;
      if (!out.some(([l]) => l === label)) out.push([label, { [part.id]: { rotation: deg } }]);
    }
  }
  return out;
}

/**
 * Runs every check on one outfit. Returns { leak, spill, diff, holes,
 * details } where the first four are the numbers checks.json records and
 * `details` lists each region with the parts involved.
 */
export async function checkRig(character, outfit, { angles, handSet } = {}) {
  const { dir, source } = readRig(character);
  const rig = withOutfit(source, outfit ?? source.defaultOutfit, { handSet });
  angles ??= readChecks(character).angles ?? {};
  const load = imageLoader(dir);
  const { width: W, height: H } = rig.reference;
  const sprite = await pixels(path.join(dir, rig.referenceImage), W, H);

  const restScene = await prepareScene(rig, load);
  const rest = (await renderFull(restScene)).getContext("2d").getImageData(0, 0, W, H).data;
  const own = await ownership(restScene, { alphaMin: 1 });

  const leakMask = new Uint8Array(W * H);
  const spillMask = new Uint8Array(W * H);
  let leak = 0;
  let spill = 0;
  let diffSum = 0;
  let footprint = 0;
  for (let i = 0; i < W * H; i++) {
    const sa = sprite[i * 4 + 3];
    const ra = rest[i * 4 + 3];
    if (sa >= SPRITE_SOLID && ra < RIG_EMPTY) { leakMask[i] = 1; leak++; }
    if (ra >= RIG_SOLID && sa < SPRITE_EMPTY) { spillMask[i] = 1; spill++; }
    if (sa > 0) {
      footprint++;
      for (let c = 0; c < 3; c++) {
        const s = (sprite[i * 4 + c] * sa + 128 * (255 - sa)) / 255;
        const r = (rest[i * 4 + c] * ra + 128 * (255 - ra)) / 255;
        diffSum += Math.abs(s - r);
      }
    }
  }
  const diff = Math.round((diffSum / (footprint * 3)) * 1000) / 1000;

  const sharedIds = new Set((source.outfits ? source.parts : []).map((p) => p.id));
  const restHoles = enclosed(rest, W, H);
  const holes = {};
  const holeDetails = {};
  for (const [label, pose] of holePoses(rig, angles)) {
    const scene = await prepareScene(rig, load, { pose });
    const img = (await renderFull(scene)).getContext("2d").getImageData(0, 0, W, H).data;
    const mask = enclosed(img, W, H);
    let n = 0;
    let tear = 0;
    for (let i = 0; i < W * H; i++) {
      if (mask[i] && !restHoles[i]) {
        n++;
        if (rest[i * 4 + 3] >= HOLE_ALPHA) tear++;
      } else mask[i] = 0;
    }
    holes[label] = n;
    if (n) {
      const posedOwn = await ownership(scene, { alphaMin: 1 });
      holeDetails[label] = {
        tear,
        walled: n - tear,
        regions: describe(components(mask, W, H), (c) => partsNear(c, posedOwn, 2), sharedIds),
      };
    }
  }

  return {
    outfit: rig.outfit ?? null,
    leak,
    spill,
    diff,
    holes,
    details: {
      leak: describe(components(leakMask, W, H), (c) => partsNear(c, own), sharedIds),
      spill: describe(components(spillMask, W, H), (c) => ownersAt(c, own), sharedIds),
      holes: holeDetails,
    },
  };
}

/**
 * Where `result` is worse than `baseline`: a list of strings (empty when
 * it's no worse). Counts may not grow; diff may grow by at most 0.001.
 */
export function regressions(result, baseline) {
  const out = [];
  for (const key of ["leak", "spill"]) {
    if (result[key] > baseline[key]) out.push(`${key} ${baseline[key]} → ${result[key]}`);
  }
  if (result.diff > baseline.diff + 0.001) out.push(`diff ${baseline.diff} → ${result.diff}`);
  for (const [label, n] of Object.entries(result.holes)) {
    const was = baseline.holes?.[label] ?? 0;
    if (n > was) out.push(`holes ${label} ${was} → ${n}`);
  }
  return out;
}

function report(result, baseline) {
  const lines = [`[check-rig] ${result.outfit ?? "(no outfit)"}`];
  const was = (v, b) => (b == null ? "" : v === b ? " (= baseline)" : ` (baseline ${b})`);
  const regions = (list, max = 6) =>
    list.slice(0, max).map((r) => `    ${String(r.px).padStart(5)} px at ${r.box.join(",")}  ${r.parts.join(", ")}${r.shared ? "  [shared]" : ""}`)
      .concat(list.length > max ? [`    … ${list.length - max} more`] : []);
  lines.push(`  leak   ${result.leak} px${was(result.leak, baseline?.leak)}`, ...regions(result.details.leak));
  lines.push(`  spill  ${result.spill} px${was(result.spill, baseline?.spill)}`, ...regions(result.details.spill));
  lines.push(`  diff   ${result.diff}${was(result.diff, baseline?.diff)}`);
  lines.push("  holes");
  for (const [label, n] of Object.entries(result.holes)) {
    const d = result.details.holes[label];
    const split = d ? `  (tear ${d.tear}, walled ${d.walled})` : "";
    lines.push(`    ${label.padEnd(24)} ${n} px${was(n, baseline?.holes?.[label] ?? (baseline ? 0 : null))}${split}`);
    for (const r of (d?.regions ?? []).slice(0, 3)) {
      lines.push(`      ${String(r.px).padStart(5)} px at ${r.box.join(",")}  ${r.parts.join(", ")}`);
    }
  }
  return lines.join("\n");
}

async function main() {
  const [character, ...rest] = process.argv.slice(2);
  const opt = (name) => {
    const i = rest.indexOf(`--${name}`);
    return i === -1 ? null : rest[i + 1];
  };
  if (!character) {
    console.error("usage: node activity/tools/check-rig.js <character> [--outfit <name>] [--record] [--json]");
    process.exit(1);
  }
  const checks = readChecks(character);
  const result = await checkRig(character, opt("outfit"), { angles: checks.angles, handSet: opt("hand-set") ?? undefined });
  const key = (result.outfit ?? "_") + (opt("hand-set") ? `/${opt("hand-set")}` : "");
  const baseline = checks.baselines?.[key];
  if (rest.includes("--json")) console.log(JSON.stringify(result, null, 2));
  else console.log(report(result, baseline));
  if (rest.includes("--record")) {
    const { leak, spill, diff, holes } = result;
    checks.baselines = { ...checks.baselines, [key]: { leak, spill, diff, holes } };
    fs.writeFileSync(checksFile(character), JSON.stringify(checks, null, 2) + "\n");
    console.log(`[check-rig] recorded ${key} in ${checksFile(character)}`);
  } else if (baseline) {
    const worse = regressions(result, baseline);
    if (worse.length) {
      console.log(`[check-rig] WORSE than baseline: ${worse.join("; ")}`);
      process.exitCode = 1;
    }
  }
}

if (import.meta.url === `file://${process.argv[1]}`) main();
