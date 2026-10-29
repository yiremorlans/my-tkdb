// Renders a character's rig.json with node-canvas, beside its reference
// sprite and an onion-skin of the two, for checking placement without a
// browser (docs/hangout-activity.md §3.2).
//
//   node activity/tools/render-rig.js <character> --out <file.png>
//        [--outfit <name>] [--mood <name>] [--hands r=<pose>,l=<pose>] [--crop x,y,w,h]
//        [--zoom n] [--t seconds] [--blink 1] [--pose json] [--ref <file>]
//
// --ref compares against another image (path from the repo root) instead of
// the outfit's referenceImage, e.g. the source sprite a registered
// reference was made from.
// Uses activity/src/rig/skeleton.js, the same bone math as the renderer.

import fs from "node:fs";
import path from "node:path";
import { createCanvas, loadImage } from "canvas";

import {
  isVisible,
  moodParts,
  overlayMatrix,
  resolveMood,
} from "../src/rig/expressions.js";
import { Motion } from "../src/rig/motion.js";
import { bendRows, solve, spriteMatrix, validateRig, withOutfit } from "../src/rig/skeleton.js";

function arg(name, fallback = null) {
  const i = process.argv.indexOf(`--${name}`);
  return i === -1 ? fallback : process.argv[i + 1];
}

async function main() {
  const character = process.argv[2];
  const out = arg("out");
  if (!character || !out) {
    console.error("usage: node activity/tools/render-rig.js <character> --out <file.png> [--outfit o] [--mood m] [--hands r=pose,l=pose] [--crop x,y,w,h] [--zoom n]");
    process.exit(1);
  }
  const dir = path.join("assets/rig", character);
  const source = validateRig(JSON.parse(fs.readFileSync(path.join(dir, "rig.json"), "utf8")), {
    imageExists: (f) => fs.existsSync(path.join(dir, f)),
  });
  const rig = withOutfit(source, arg("outfit") ?? source.defaultOutfit);

  const images = new Map();
  const load = async (file) => {
    if (!images.has(file)) images.set(file, await loadImage(path.join(dir, file)));
    return images.get(file);
  };

  const handPoses = Object.fromEntries(
    (arg("hands") ?? "").split(",").filter(Boolean).map((kv) => kv.split("=")),
  );
  const moodName = arg("mood", "default");
  const mood = resolveMood(rig, moodName);
  const blink = arg("blink") ? resolveMood(rig, "blink") : null;
  // (--t can also land mid-blink; that's reported, not drawn.)
  const { show, hide } = moodParts(mood, blink);

  // --t <seconds> renders the idle motion at that time (stepped at 60fps
  // from 0 so the hair springs have settled the way the browser's would).
  let pose = {};
  let blinkNow = false;
  if (arg("t")) {
    const motion = new Motion(rig, { random: () => 0.5 });
    const end = Number(arg("t"));
    for (let t = 0; t <= end; t += 1 / 60) {
      pose = motion.pose(t, 1 / 60);
      blinkNow = motion.blinking(t);
    }
  }
  // Hand pose swaps replace the hand part's image (and its pivot/scale).
  const imageFor = new Map();
  for (const part of rig.parts) if (part.image) imageFor.set(part.id, part);
  for (const [side, hand] of Object.entries(rig.hands ?? {})) {
    const pose = hand.poses[handPoses[side] ?? hand.default];
    if (pose) imageFor.set(hand.part, pose);
  }

  const sizes = new Map();
  for (const [id, img] of imageFor) {
    const bitmap = await load(img.image);
    sizes.set(id, [bitmap.width, bitmap.height]);
  }
  // --pose '<json>' adds part rotations/offsets on top, e.g. to test a
  // lock at its limit: --pose '{"hair_front_lock":{"rotation":8}}'
  if (arg("pose")) {
    for (const [id, p] of Object.entries(JSON.parse(arg("pose")))) {
      pose[id] = { ...pose[id], ...p };
    }
  }
  const solved = solve(rig, pose, sizes);
  const zOf = (p) => p.z ?? 0;

  const { width: W, height: H } = rig.reference;
  const crop = (arg("crop") ?? `0,0,${W},${H}`).split(",").map(Number);
  const zoom = Number(arg("zoom", 1));
  const [cx, cy, cw, ch] = crop;

  const rigCanvas = createCanvas(cw * zoom, ch * zoom);
  const ctx = rigCanvas.getContext("2d");
  ctx.imageSmoothingQuality = "high";
  const visible = rig.parts
    .filter((p) => imageFor.has(p.id))
    .filter((p) => isVisible(p, { show, hide }))
    .sort((a, b) => zOf(a) - zOf(b));

  const overlayZ = rig.expressions?.overlayZ ?? Infinity;
  const setMatrix = (m) =>
    ctx.setTransform(
      m[0] * zoom, m[1] * zoom, m[2] * zoom, m[3] * zoom,
      (m[4] - cx) * zoom, (m[5] - cy) * zoom,
    );
  let overlaysDrawn = false;
  const drawOverlays = async () => {
    overlaysDrawn = true;
    const head = solved.get(rig.expressions.head).bone;
    const all = blink && !mood.noBlink ? [...mood.overlays, ...blink.overlays] : mood.overlays;
    for (const o of all) {
      setMatrix(overlayMatrix(rig, head, o));
      ctx.drawImage(await load(o.file), 0, 0);
    }
  };

  for (const part of visible) {
    if (!overlaysDrawn && zOf(part) > overlayZ) await drawOverlays();
    const img = await load(imageFor.get(part.id).image);
    const m = spriteMatrix(rig, part, solved.get(part.id).bone, sizes.get(part.id), imageFor.get(part.id));
    if (part.mesh?.bend) {
      // Bend mesh: draw horizontal bands, each with its row's matrix.
      const rows = bendRows(rig, part, solved, sizes.get(part.id), imageFor.get(part.id));
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
      setMatrix(m);
      ctx.drawImage(img, 0, 0);
    }
  }
  if (!overlaysDrawn) await drawOverlays();
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  const ref = await loadImage(arg("ref") ?? path.join(dir, rig.referenceImage));
  const pw = cw * zoom;
  const ph = ch * zoom;
  const sheet = createCanvas(pw * 3 + 20, ph);
  const s = sheet.getContext("2d");
  s.fillStyle = arg("bg", "#8e98a3");
  s.fillRect(0, 0, sheet.width, sheet.height);
  s.drawImage(rigCanvas, 0, 0);
  s.drawImage(ref, cx, cy, cw, ch, pw + 10, 0, pw, ph);
  s.drawImage(ref, cx, cy, cw, ch, 2 * pw + 20, 0, pw, ph);
  s.globalAlpha = 0.5;
  s.drawImage(rigCanvas, 2 * pw + 20, 0);
  fs.writeFileSync(out, sheet.toBuffer("image/png"));
  console.log(`[render-rig] ${rig.outfit ? `${rig.outfit}, ` : ""}${visible.length} parts, mood ${moodName}${blinkNow ? " (mid-blink)" : ""} → ${out}`);
}

main();
