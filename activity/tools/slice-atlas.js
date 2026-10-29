// Hangout rig pipeline, step 1: split a character's texture atlas into one
// PNG per part (docs/hangout-activity.md §3.1).
//
//   node activity/tools/slice-atlas.js <character> [--outfit <name>] [--contact <dir>]
//
// Reads  assets/rig/<character>/source/<character>_<outfit>_00.png
// Writes assets/rig/<character>/<dir>/parts/<id>.png and <dir>/parts.json.
//
// The outfit defaults to rig.json's defaultOutfit. Its rig.json entry may
// name the atlas (`atlas`) and output folder (`dir`, relative to the rig
// directory); without one, the atlas follows the naming above and `dir` is
// the outfit's name. Image paths in rig.json are then <dir>/parts/<id>.png.
//
// Parts are alpha-connected regions (8-connected). A small fragment that sits
// within FRAGMENT_GAP px of exactly one larger region is merged into it (a
// chain link, a stroke split by a gap). A fragment near two or more regions is
// left standalone and listed under `ambiguous` in parts.json for a manual
// merge, never guessed. Optional manual merges and semantic names come from
// <dir>/part-names.json:
//
//   { "names": { "p012": "face_base" }, "merge": [["p100", "p101"]],
//     "ignore": [[450, 461, 31, 58]] }
//
// `ignore` lists atlas rects [x, y, w, h] holding helper shapes rather than
// art (flat-color masks, a blurred shadow blob). A region whose bounding box
// lies inside one is dropped before anything else: it gets no id, isn't
// merged with or reported near other parts, and is listed under `ignored`
// in parts.json. Atlases without `ignore` slice exactly as before.
//
// Ids are positional (reading order of the region's top-left), so they stay
// stable across re-runs of the same atlas.

import fs from "node:fs";
import path from "node:path";

import { readPng, writePng } from "./lib/png.js";

// Pixels at or below this alpha are background. Above zero so faint
// anti-alias halos don't chain neighboring parts together.
const ALPHA_MIN = 8;
// Regions smaller than this (in px) are fragments, candidates for merging.
const FRAGMENT_AREA = 400;
// Max bbox gap (px) between a fragment and the region it merges into.
const FRAGMENT_GAP = 3;
// Transparent border around each written part, so the renderer's texture
// sampling never clamps against an opaque edge when the part rotates.
const PAD = 2;

// --- alpha regions ----------------------------------------------------------

/** Labels alpha-connected regions. Returns { labels, regions }. */
export function labelRegions({ width, height, data }, alphaMin = ALPHA_MIN) {
  const labels = new Int32Array(width * height).fill(-1);
  const regions = [];
  const stack = new Int32Array(width * height);
  for (let start = 0; start < width * height; start++) {
    if (labels[start] !== -1 || data[start * 4 + 3] <= alphaMin) continue;
    const id = regions.length;
    const r = { id, x0: width, y0: height, x1: -1, y1: -1, area: 0 };
    let sp = 0;
    stack[sp++] = start;
    labels[start] = id;
    while (sp) {
      const i = stack[--sp];
      const x = i % width;
      const y = (i - x) / width;
      r.area++;
      if (x < r.x0) r.x0 = x;
      if (x > r.x1) r.x1 = x;
      if (y < r.y0) r.y0 = y;
      if (y > r.y1) r.y1 = y;
      for (let dy = -1; dy <= 1; dy++) {
        const ny = y + dy;
        if (ny < 0 || ny >= height) continue;
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx;
          if (nx < 0 || nx >= width) continue;
          const j = ny * width + nx;
          if (labels[j] !== -1 || data[j * 4 + 3] <= alphaMin) continue;
          labels[j] = id;
          stack[sp++] = j;
        }
      }
    }
    regions.push(r);
  }
  return { labels, regions };
}

// --- fragments and specks ---------------------------------------------------

// Speck filter: regions this small, or this faint, are atlas noise rather
// than art. They're reported in parts.json under `dropped`.
const SPECK_AREA = 12;
const SPECK_ALPHA = 64;

/** Per-region max alpha, for the speck filter. */
function maxAlphas({ data }, labels, count) {
  const max = new Uint8Array(count);
  for (let i = 0; i < labels.length; i++) {
    const l = labels[i];
    if (l !== -1 && data[i * 4 + 3] > max[l]) max[l] = data[i * 4 + 3];
  }
  return max;
}

/** Regions with a pixel within FRAGMENT_GAP px of any pixel of `frag`. */
function nearbyRegions(frag, labels, width, height) {
  const near = new Set();
  for (let y = frag.y0; y <= frag.y1; y++) {
    for (let x = frag.x0; x <= frag.x1; x++) {
      if (labels[y * width + x] !== frag.id) continue;
      for (let dy = -FRAGMENT_GAP; dy <= FRAGMENT_GAP; dy++) {
        const ny = y + dy;
        if (ny < 0 || ny >= height) continue;
        for (let dx = -FRAGMENT_GAP; dx <= FRAGMENT_GAP; dx++) {
          const nx = x + dx;
          if (nx < 0 || nx >= width) continue;
          const l = labels[ny * width + nx];
          if (l !== -1 && l !== frag.id) near.add(l);
        }
      }
    }
  }
  return near;
}

/**
 * Groups fragments into the one larger region they nearly touch. Returns
 * groups (each a list of region ids), the fragments that nearly touch more
 * than one larger region, and the specks dropped as noise.
 */
export function groupFragments(atlas, labels, regions, ignored = new Set()) {
  const alpha = maxAlphas(atlas, labels, regions.length);
  const speck = (r) => r.area < SPECK_AREA || alpha[r.id] < SPECK_ALPHA;
  const owner = regions.map((r) => (ignored.has(r.id) ? null : r.id));
  const ambiguous = [];
  const dropped = [];
  for (const frag of regions) {
    if (frag.area >= FRAGMENT_AREA || ignored.has(frag.id)) continue;
    const near = [...nearbyRegions(frag, labels, atlas.width, atlas.height)]
      .filter((id) => regions[id].area >= FRAGMENT_AREA);
    if (near.length === 1) owner[frag.id] = near[0];
    else if (speck(frag)) owner[frag.id] = null;
    else if (near.length > 1) ambiguous.push({ fragment: frag.id, near });
    if (owner[frag.id] === null) dropped.push(frag);
  }
  const groups = new Map();
  for (const r of regions) {
    const o = owner[r.id];
    if (o === null) continue;
    if (!groups.has(o)) groups.set(o, []);
    groups.get(o).push(r.id);
  }
  return {
    groups: [...groups.values()],
    ambiguous,
    dropped: dropped.map((r) => [r.x0, r.y0, r.x1 - r.x0 + 1, r.y1 - r.y0 + 1]),
  };
}

function unionBox(regions, ids) {
  const box = { x0: Infinity, y0: Infinity, x1: -1, y1: -1, area: 0 };
  for (const id of ids) {
    const r = regions[id];
    box.x0 = Math.min(box.x0, r.x0);
    box.y0 = Math.min(box.y0, r.y0);
    box.x1 = Math.max(box.x1, r.x1);
    box.y1 = Math.max(box.y1, r.y1);
    box.area += r.area;
  }
  return box;
}

// --- slicing ----------------------------------------------------------------

function readNames(outDir) {
  const file = path.join(outDir, "part-names.json");
  if (!fs.existsSync(file)) return { names: {}, merge: [], ignore: [] };
  const raw = JSON.parse(fs.readFileSync(file, "utf8"));
  return { names: raw.names ?? {}, merge: raw.merge ?? [], ignore: raw.ignore ?? [] };
}

/**
 * Regions whose bounding box lies inside one of the `ignore` rects. Their
 * pixels are unlabeled (-1) afterwards, so no fragment merges into them
 * and no part copies them as halo.
 */
function dropIgnored(labels, regions, width, ignore) {
  const ignored = new Set();
  for (const r of regions) {
    const inside = ignore.some(([x, y, w, h]) => r.x0 >= x && r.y0 >= y && r.x1 < x + w && r.y1 < y + h);
    if (!inside) continue;
    ignored.add(r.id);
    for (let yy = r.y0; yy <= r.y1; yy++) {
      for (let xx = r.x0; xx <= r.x1; xx++) if (labels[yy * width + xx] === r.id) labels[yy * width + xx] = -1;
    }
  }
  return ignored;
}

/** Slices `atlas` into parts. Pure apart from reading part-names.json. */
export function slice(atlas, { names = {}, merge = [], ignore = [] } = {}) {
  const { labels, regions } = labelRegions(atlas);
  const ignored = ignore.length ? dropIgnored(labels, regions, atlas.width, ignore) : new Set();
  const { groups, ambiguous, dropped } = groupFragments(atlas, labels, regions, ignored);

  // Positional ids: reading order by top edge (8px rows), then left edge.
  let parts = groups.map((ids) => ({ ids, box: unionBox(regions, ids) }));
  parts.sort(
    (a, b) => (a.box.y0 >> 3) - (b.box.y0 >> 3) || a.box.x0 - b.box.x0,
  );
  parts.forEach((p, i) => (p.id = `p${String(i).padStart(3, "0")}`));

  // Manual merges, keyed by positional id, fold into the first id listed.
  const byId = new Map(parts.map((p) => [p.id, p]));
  for (const ids of merge) {
    const [keep, ...rest] = ids.map((id) => {
      if (!byId.has(id)) throw new Error(`merge names unknown part ${id}`);
      return byId.get(id);
    });
    for (const p of rest) {
      keep.ids.push(...p.ids);
      byId.delete(p.id);
    }
    keep.box = unionBox(regions, keep.ids);
  }
  parts = [...byId.values()];

  const regionToPart = new Map();
  for (const p of parts) for (const r of p.ids) regionToPart.set(r, p.id);

  const out = parts.map((p) => {
    const x = Math.max(0, p.box.x0 - PAD);
    const y = Math.max(0, p.box.y0 - PAD);
    const w = Math.min(atlas.width, p.box.x1 + 1 + PAD) - x;
    const h = Math.min(atlas.height, p.box.y1 + 1 + PAD) - y;
    // Copy only this part's own pixels: other parts often poke into the box.
    const buf = Buffer.alloc(w * h * 4);
    const mine = new Set(p.ids);
    for (let yy = 0; yy < h; yy++) {
      for (let xx = 0; xx < w; xx++) {
        const si = (y + yy) * atlas.width + (x + xx);
        const label = labels[si];
        // Sub-threshold halo pixels are unlabeled; keep them when they touch
        // this part so edges stay anti-aliased.
        if (label === -1 ? !touches(labels, atlas, x + xx, y + yy, mine) : !mine.has(label)) continue;
        atlas.data.copy(buf, (yy * w + xx) * 4, si * 4, si * 4 + 4);
      }
    }
    return {
      id: p.id,
      name: names[p.id] ?? p.id,
      rect: [x, y, w, h],
      area: p.box.area,
      fragments: p.ids.length - 1,
      buf,
    };
  });

  const named = new Map();
  for (const p of out) {
    if (named.has(p.name)) throw new Error(`two parts named ${p.name}`);
    named.set(p.name, p);
  }

  return {
    parts: out,
    dropped,
    ignored: [...ignored].map((id) => {
      const r = regions[id];
      return [r.x0, r.y0, r.x1 - r.x0 + 1, r.y1 - r.y0 + 1];
    }),
    ambiguous: ambiguous.map((a) => ({
      fragment: regionToPart.get(a.fragment),
      near: a.near.map((r) => regionToPart.get(r)),
    })),
  };
}

function touches(labels, { width, height }, x, y, mine) {
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
      if (mine.has(labels[ny * width + nx])) return true;
    }
  }
  return false;
}

// --- output -----------------------------------------------------------------

async function writeContactSheets(parts, dir) {
  const { createCanvas } = await import("canvas");
  const CELL = 150;
  const COLS = 8;
  const ROWS = 7;
  const LABEL = 16;
  fs.mkdirSync(dir, { recursive: true });
  const perPage = COLS * ROWS;
  const files = [];
  for (let page = 0; page * perPage < parts.length; page++) {
    const slice = parts.slice(page * perPage, (page + 1) * perPage);
    const canvas = createCanvas(COLS * CELL, ROWS * (CELL + LABEL));
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#9aa3ad";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (const [i, p] of slice.entries()) {
      const cx = (i % COLS) * CELL;
      const cy = Math.floor(i / COLS) * (CELL + LABEL);
      ctx.fillStyle = i % 2 ? "#b6bec7" : "#c4ccd4";
      ctx.fillRect(cx + 2, cy + 2, CELL - 4, CELL - 4);
      const [, , w, h] = p.rect;
      const img = createCanvas(w, h);
      const id = img.getContext("2d").createImageData(w, h);
      id.data.set(p.buf);
      img.getContext("2d").putImageData(id, 0, 0);
      const s = Math.min((CELL - 10) / w, (CELL - 10) / h, 3);
      ctx.drawImage(img, cx + (CELL - w * s) / 2, cy + (CELL - h * s) / 2, w * s, h * s);
      ctx.fillStyle = "#111";
      ctx.font = "bold 13px sans-serif";
      ctx.fillText(`${p.name} ${w}x${h}`, cx + 4, cy + CELL + 12);
    }
    const file = path.join(dir, `contact-${String(page).padStart(2, "0")}.png`);
    fs.writeFileSync(file, canvas.toBuffer("image/png"));
    files.push(file);
  }
  return files;
}

/**
 * Slices one outfit's atlas into <rig dir>/<outfit dir>/parts and writes
 * parts.json (and contact sheets into `contact`, if given). `rigDir` is the
 * character's rig directory; `entry` is the outfit's rig.json entry (atlas,
 * dir), or {} for the naming convention.
 */
export async function sliceOutfit(rigDir, character, outfit, entry = {}, { contact = null, log = console.log } = {}) {
  const atlasFile = path.join(rigDir, entry.atlas ?? path.join("source", `${character}_${outfit}_00.png`));
  const outDir = path.join(rigDir, entry.dir ?? outfit);
  const atlas = readPng(atlasFile);
  const { parts, ambiguous, dropped, ignored } = slice(atlas, readNames(outDir));

  const partsDir = path.join(outDir, "parts");
  fs.rmSync(partsDir, { recursive: true, force: true });
  fs.mkdirSync(partsDir, { recursive: true });
  for (const p of parts) writePng(path.join(partsDir, `${p.name}.png`), p.rect[2], p.rect[3], p.buf);

  const manifest = {
    atlas: { file: path.relative(rigDir, atlasFile), width: atlas.width, height: atlas.height },
    pad: PAD,
    parts: Object.fromEntries(
      parts.map((p) => [p.name, { id: p.id, rect: p.rect, area: p.area, fragments: p.fragments }]),
    ),
    ambiguous,
    dropped,
    ...(ignored.length ? { ignored } : {}),
  };
  // atlas.file stays relative to the rig directory, like rig.json's paths.
  fs.writeFileSync(path.join(outDir, "parts.json"), JSON.stringify(manifest, null, 2) + "\n");

  log(`[slice] ${parts.length} parts → ${partsDir}`);
  if (dropped.length) log(`[slice] ${dropped.length} specks dropped as noise (rects in parts.json)`);
  if (ignored.length) log(`[slice] ${ignored.length} regions ignored (part-names.json ignore; rects in parts.json)`);
  if (ambiguous.length) log(`[slice] ${ambiguous.length} ambiguous fragments listed in parts.json`);
  if (contact) {
    const files = await writeContactSheets(parts, contact);
    log(`[slice] contact sheets: ${files.join(", ")}`);
  }
  return { parts, manifest };
}

// --- CLI --------------------------------------------------------------------

async function main() {
  const [character, ...rest] = process.argv.slice(2);
  const opt = (name) => {
    const i = rest.indexOf(`--${name}`);
    return i === -1 ? null : rest[i + 1];
  };
  const rigDir = path.join("assets/rig", character ?? "");
  const rigFile = path.join(rigDir, "rig.json");
  const rig = fs.existsSync(rigFile) ? JSON.parse(fs.readFileSync(rigFile, "utf8")) : {};
  const outfit = opt("outfit") ?? rig.defaultOutfit;
  if (!character || !outfit) {
    console.error("usage: node activity/tools/slice-atlas.js <character> [--outfit <name>] [--contact <dir>]");
    console.error("(--outfit is required when rig.json has no defaultOutfit)");
    process.exit(1);
  }
  await sliceOutfit(rigDir, character, outfit, rig.outfits?.[outfit] ?? {}, { contact: opt("contact") });
}

if (import.meta.url === `file://${process.argv[1]}`) main();
