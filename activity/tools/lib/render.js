// Node-side rig files and rendering shared by the tools (render-rig.js,
// check-rig.js, fit-outfit.js, align-hands.js, match-hands.js,
// register-head.js): reads and writes a character's rig.json and an outfit's
// fit.json, resolves one outfit, mood and hand poses, and
// draws the parts with node-canvas using skeleton.js, the same bone math as
// the browser renderer.

import fs from "node:fs";
import path from "node:path";
import { createCanvas, loadImage } from "canvas";
import { PNG } from "pngjs";

import { isVisible, moodParts, overlayMatrix, resolveMood } from "../../src/rig/expressions.js";
import { Motion } from "../../src/rig/motion.js";
import { apply, bendRows, solve, spriteMatrix, validateRig, withOutfit } from "../../src/rig/skeleton.js";

export const rigDir = (character) => path.join("assets/rig", character);

/** rig.json as on disk (outfits and all), validated against the files. */
export function readRig(character, { validate = true } = {}) {
  const dir = rigDir(character);
  const source = JSON.parse(fs.readFileSync(path.join(dir, "rig.json"), "utf8"));
  if (validate) validateRig(source, { imageExists: (f) => fs.existsSync(path.join(dir, f)) });
  return { dir, source };
}

/** Writes rig.json back in the repo's format (2-space JSON, newline). */
export function writeRig(character, source) {
  fs.writeFileSync(path.join(rigDir(character), "rig.json"), JSON.stringify(source, null, 2) + "\n");
}

/** Path of an outfit's fit.json (fit-outfit.js). */
export function fitFile(dir, outfit) {
  return path.join(dir, outfit.dir ?? ".", "fit.json");
}

/** Cached image loader rooted at the rig directory. */
export function imageLoader(dir) {
  const images = new Map();
  return async (file) => {
    if (!images.has(file)) images.set(file, await loadImage(path.join(dir, file)));
    return images.get(file);
  };
}

/**
 * Everything needed to draw one frame: the flattened outfit, the solved
 * bones and the visible parts in draw order.
 *   rig    flat rig (withOutfit result)
 *   hands  { r: poseName, l: poseName } (defaults: each side's default)
 *   mood   mood name (default "default"); blink: true adds the blink mood
 *   t      idle-motion time in seconds (stepped at 60fps from 0)
 *   pose   extra part rotations/offsets on top
 */
export async function prepareScene(rig, load, { hands = {}, mood: moodName = "default", blink = false, t = null, pose: extra = null } = {}) {
  const mood = resolveMood(rig, moodName);
  const blinkMood = blink ? resolveMood(rig, "blink") : null;
  const { show, hide } = moodParts(mood, blinkMood);

  let pose = {};
  let blinkNow = false;
  if (t != null) {
    const motion = new Motion(rig, { random: () => 0.5 });
    for (let s = 0; s <= t; s += 1 / 60) {
      pose = motion.pose(s, 1 / 60);
      blinkNow = motion.blinking(s);
    }
  }
  // Hand pose swaps replace the hand part's image (and its pivot/scale).
  const imageFor = new Map();
  for (const part of rig.parts) if (part.image) imageFor.set(part.id, part);
  for (const [side, hand] of Object.entries(rig.hands ?? {})) {
    const p = hand.poses[hands[side] ?? hand.default];
    if (p) imageFor.set(hand.part, p);
  }
  const sizes = new Map();
  for (const [id, img] of imageFor) {
    const bitmap = await load(img.image);
    sizes.set(id, [bitmap.width, bitmap.height]);
  }
  for (const [id, p] of Object.entries(extra ?? {})) pose[id] = { ...pose[id], ...p };
  const solved = solve(rig, pose, sizes);
  const zOf = (p) => p.z ?? 0;
  const visible = rig.parts
    .filter((p) => imageFor.has(p.id))
    .filter((p) => isVisible(p, { show, hide }))
    .sort((a, b) => zOf(a) - zOf(b));
  const overlays = blinkMood && !mood.noBlink ? [...mood.overlays, ...blinkMood.overlays] : mood.overlays;
  return { rig, load, mood, moodName, blinkNow, imageFor, sizes, solved, visible, overlays };
}

/**
 * Draws a scene into ctx. view = { cx, cy, zoom }: reference px (cx, cy)
 * lands at canvas (0, 0), scaled by zoom. `only` limits drawing to a
 * predicate over parts (overlays count as the id "overlays").
 */
export async function drawScene(ctx, scene, { cx = 0, cy = 0, zoom = 1 } = {}, only = null) {
  const { rig, load, solved, visible, imageFor, sizes } = scene;
  const zOf = (p) => p.z ?? 0;
  const overlayZ = rig.expressions?.overlayZ ?? Infinity;
  const setMatrix = (m) =>
    ctx.setTransform(
      m[0] * zoom, m[1] * zoom, m[2] * zoom, m[3] * zoom,
      (m[4] - cx) * zoom, (m[5] - cy) * zoom,
    );
  let overlaysDrawn = false;
  const drawOverlays = async () => {
    overlaysDrawn = true;
    if (only && !only({ id: "overlays" })) return;
    const head = solved.get(rig.expressions.head).bone;
    for (const o of scene.overlays) {
      setMatrix(overlayMatrix(rig, head, o));
      ctx.drawImage(await load(o.file), 0, 0);
    }
  };
  for (const part of visible) {
    if (!overlaysDrawn && zOf(part) > overlayZ) await drawOverlays();
    if (only && !only(part)) continue;
    const image = imageFor.get(part.id);
    const img = await load(image.image);
    if (part.mesh?.bend) {
      // Bend mesh: draw horizontal bands, each with its row's matrix.
      const rows = bendRows(rig, part, solved, sizes.get(part.id), image);
      const BANDS = 24;
      for (let b = 0; b < BANDS; b++) {
        const v0 = b / BANDS;
        const v1 = (b + 1) / BANDS;
        setMatrix(rows((v0 + v1) / 2));
        const sy = Math.floor(v0 * img.height);
        const sh = Math.ceil(v1 * img.height) - sy + 1; // 1px overlap hides band seams
        ctx.drawImage(img, 0, sy, img.width, sh, 0, sy, img.width, sh);
      }
    } else {
      setMatrix(spriteMatrix(rig, part, solved.get(part.id).bone, sizes.get(part.id), image));
      ctx.drawImage(img, 0, 0);
    }
  }
  if (!overlaysDrawn && rig.expressions) await drawOverlays();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

/** The whole reference frame rendered at 1:1, as a canvas. */
export async function renderFull(scene) {
  const { width: W, height: H } = scene.rig.reference;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingQuality = "high";
  await drawScene(ctx, scene);
  return canvas;
}

/** A part's drawn bounding box in reference px (rounded out, clamped). */
function partBox(scene, part, W, H) {
  const image = scene.imageFor.get(part.id);
  const [w, h] = scene.sizes.get(part.id);
  const m = spriteMatrix(scene.rig, part, scene.solved.get(part.id).bone, [w, h], image);
  let corners = [[0, 0], [w, 0], [0, h], [w, h]].map((c) => apply(m, c));
  if (part.mesh?.bend) {
    // A bent part can swing anywhere within its own radius of the joint.
    const r = Math.hypot(w, h) * 2;
    const [x, y] = apply(m, [w / 2, h / 2]);
    corners = [[x - r, y - r], [x + r, y + r]];
  }
  const xs = corners.map((c) => c[0]);
  const ys = corners.map((c) => c[1]);
  const x0 = Math.max(0, Math.floor(Math.min(...xs)) - 2);
  const y0 = Math.max(0, Math.floor(Math.min(...ys)) - 2);
  const x1 = Math.min(W, Math.ceil(Math.max(...xs)) + 2);
  const y1 = Math.min(H, Math.ceil(Math.max(...ys)) + 2);
  return x1 > x0 && y1 > y0 ? [x0, y0, x1 - x0, y1 - y0] : null;
}

/**
 * Topmost part per pixel at 1:1: `owner[i]` is an index into `ids` (or -1),
 * counting a part where its alpha is at least `alphaMin`. `layers` holds
 * each part's own alpha ({ id, box: [x, y, w, h], alpha }), covered or not.
 * Overlays are left out (they sit on the face, above everything a check
 * cares about).
 */
export async function ownership(scene, { alphaMin = 128 } = {}) {
  const { width: W, height: H } = scene.rig.reference;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingQuality = "high";
  const owner = new Int16Array(W * H).fill(-1);
  const ids = [];
  const layers = [];
  for (const part of scene.visible) {
    const box = partBox(scene, part, W, H);
    if (!box) continue;
    const [bx, by, bw, bh] = box;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(bx, by, bw, bh);
    await drawScene(ctx, scene, {}, (p) => p === part);
    const alpha = ctx.getImageData(bx, by, bw, bh).data;
    const k = ids.length;
    ids.push(part.id);
    const layer = new Uint8Array(bw * bh);
    for (let y = 0; y < bh; y++) {
      for (let x = 0; x < bw; x++) {
        const a = alpha[(y * bw + x) * 4 + 3];
        layer[y * bw + x] = a;
        if (a >= alphaMin) owner[(by + y) * W + bx + x] = k;
      }
    }
    layers.push({ id: part.id, box, alpha: layer });
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(bx, by, bw, bh);
  }
  return { owner, ids, layers, width: W, height: H };
}

/** RGBA pixels of a PNG or canvas at the reference size. */
export async function pixels(source, W, H) {
  const img = typeof source === "string" ? await loadImage(source) : source;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  return ctx.getImageData(0, 0, W, H).data;
}

/** Alpha of the shared parts at rest (the head covers the neck), 0..1 per px. */
export async function sharedCover(rig, dir) {
  const { outfits, defaultOutfit, ...shared } = rig;
  if (!shared.parts?.some((p) => p.image)) return null;
  const load = imageLoader(dir);
  const flat = { ...shared, hands: {} };
  const scene = await prepareScene(flat, load);
  const { width: W, height: H } = rig.reference;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  await drawScene(ctx, scene, {}, (p) => p.id !== "overlays");
  // Through a PNG round trip: the recorded fits were made against the
  // quantized mask, so reading the canvas directly would shift them.
  const png = PNG.sync.read(canvas.toBuffer("image/png"));
  const cov = new Float32Array(W * H);
  for (let i = 0; i < W * H; i++) cov[i] = png.data[i * 4 + 3] / 255 > 0.5 ? 1 : 0;
  return cov;
}

export { withOutfit };
