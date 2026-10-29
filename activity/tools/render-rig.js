// Renders a character's rig.json with node-canvas, beside its reference
// sprite and an onion-skin of the two, for checking placement without a
// browser (docs/hangout-activity.md §3.2).
//
//   node activity/tools/render-rig.js <character> --out <file.png>
//        [--outfit <name>] [--mood <name>] [--hands r=<pose>,l=<pose>] [--crop x,y,w,h]
//        [--zoom n] [--t seconds] [--blink 1] [--pose json] [--ref <file>] [--bg <color>]
//        [--hand-set <name>]
//
// --ref compares against another image (path from the repo root) instead of
// the outfit's referenceImage, e.g. the source sprite a registered
// reference was made from.
// Uses activity/src/rig/skeleton.js (via lib/render.js), the same bone math
// as the renderer.

import fs from "node:fs";
import path from "node:path";
import { createCanvas, loadImage } from "canvas";

import { drawScene, imageLoader, prepareScene, readRig, withOutfit } from "./lib/render.js";

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
  const { dir, source } = readRig(character);
  const rig = withOutfit(source, arg("outfit") ?? source.defaultOutfit, { handSet: arg("hand-set") ?? undefined });
  const load = imageLoader(dir);

  const hands = Object.fromEntries(
    (arg("hands") ?? "").split(",").filter(Boolean).map((kv) => kv.split("=")),
  );
  const moodName = arg("mood", "default");
  // --t <seconds> renders the idle motion at that time (stepped at 60fps
  // from 0 so the hair springs have settled the way the browser's would);
  // landing mid-blink is reported, not drawn.
  // --pose '<json>' adds part rotations/offsets on top, e.g. to test a
  // lock at its limit: --pose '{"hair_front_lock":{"rotation":8}}'
  const scene = await prepareScene(rig, load, {
    hands,
    mood: moodName,
    blink: !!arg("blink"),
    t: arg("t") ? Number(arg("t")) : null,
    pose: arg("pose") ? JSON.parse(arg("pose")) : null,
  });

  const { width: W, height: H } = rig.reference;
  const crop = (arg("crop") ?? `0,0,${W},${H}`).split(",").map(Number);
  const zoom = Number(arg("zoom", 1));
  const [cx, cy, cw, ch] = crop;

  const rigCanvas = createCanvas(cw * zoom, ch * zoom);
  const ctx = rigCanvas.getContext("2d");
  ctx.imageSmoothingQuality = "high";
  await drawScene(ctx, scene, { cx, cy, zoom });

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
  console.log(`[render-rig] ${rig.outfit ? `${rig.outfit}, ` : ""}${scene.visible.length} parts, mood ${moodName}${scene.blinkNow ? " (mid-blink)" : ""} → ${out}`);
}

main();
