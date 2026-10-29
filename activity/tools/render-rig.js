// Renders a character's rig.json with node-canvas, beside its reference
// sprite and an onion-skin of the two, for checking placement without a
// browser (docs/hangout-activity.md §3.2).
//
//   node activity/tools/render-rig.js <character> --out <file.png>
//        [--outfit <name>] [--mood <name>] [--hands r=<pose>,l=<pose>] [--crop x,y,w,h]
//        [--zoom n] [--t seconds] [--blink 1] [--pose json] [--ref <file>] [--bg <color>]
//        [--hand-set <name>] [--portrait] [--hotspots] [--grid <step>]
//
// --ref compares against another image (path from the repo root) instead of
// the outfit's referenceImage, e.g. the source sprite a registered
// reference was made from.
// --portrait compares against the mood's own expression portrait instead,
// drawn where the overlays put it on the head (`<mood>.png`, else the
// mood's `portrait`, else its first layer's), over the sprite: how a mood
// is checked, since the sprite only shows the default face.
// --hotspots outlines each touch point on the rig panel, labelled.
// --grid <step> draws reference-px grid lines, labelled, on every panel,
// for reading coordinates (centers, rects) off the render.
// Uses activity/src/rig/skeleton.js (via lib/render.js), the same bone math
// as the renderer.

import fs from "node:fs";
import path from "node:path";
import { createCanvas, loadImage } from "canvas";

import { overlayMatrix } from "../src/rig/expressions.js";
import { spriteMatrix } from "../src/rig/skeleton.js";
import { drawScene, imageLoader, prepareScene, readRig, withOutfit } from "./lib/render.js";

function arg(name, fallback = null) {
  const i = process.argv.indexOf(`--${name}`);
  return i === -1 ? fallback : process.argv[i + 1];
}
const flag = (name) => process.argv.includes(`--${name}`);

/** The expression portrait a mood shows: its own file, its `portrait`, or its first layer's. */
function portraitFor(rig, character, mood, seen = new Set()) {
  const own = path.join("assets/expressions", character, `${mood}.png`);
  if (fs.existsSync(own)) return own;
  const def = rig.expressions?.moods?.[mood];
  if (!def || seen.has(mood)) return null;
  seen.add(mood);
  if (def.portrait) return path.join("assets/expressions", character, `${def.portrait}.png`);
  for (const layer of def.layers ?? []) {
    const p = portraitFor(rig, character, layer, seen);
    if (p) return p;
  }
  return null;
}

/** Each hotspot's corners in reference px: { name: [[x, y] ×4] }. */
function hotspotQuads(scene) {
  const { rig, solved, sizes, imageFor } = scene;
  const out = {};
  for (const [name, h] of Object.entries(rig.hotspots ?? {})) {
    const part = imageFor.get(h.part) ? rig.parts.find((p) => p.id === h.part) : null;
    const size = sizes.get(h.part);
    if (!part || !size) continue;
    const m = spriteMatrix(rig, part, solved.get(part.id).bone, size, imageFor.get(h.part));
    const [x0, y0, x1, y1] = h.rect ?? [0, 0, 1, 1];
    out[name] = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]].map(([u, v]) => {
      const [px, py] = [u * size[0], v * size[1]];
      return [m[0] * px + m[2] * py + m[4], m[1] * px + m[3] * py + m[5]];
    });
  }
  return out;
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

  let ref = await loadImage(arg("ref") ?? path.join(dir, rig.referenceImage));
  if (flag("portrait")) {
    const file = portraitFor(rig, character, moodName);
    if (!file) throw new Error(`--portrait: no expression portrait for mood ${moodName}`);
    const portrait = await loadImage(file);
    const withFace = createCanvas(W, H);
    const f = withFace.getContext("2d");
    f.drawImage(ref, 0, 0);
    const m = overlayMatrix(rig, scene.solved.get(rig.expressions.head ?? "head").bone, { rect: [0, 0] });
    f.setTransform(m[0], m[1], m[2], m[3], m[4], m[5]);
    f.drawImage(portrait, 0, 0);
    ref = withFace;
    console.log(`[render-rig] comparing against ${file}`);
  }
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
  s.globalAlpha = 1;
  const toPanel = (x, y, panel) => [(x - cx) * zoom + panel * (pw + 10), (y - cy) * zoom];
  if (flag("hotspots")) {
    s.font = "bold 13px sans-serif";
    s.lineWidth = 2;
    for (const [name, quad] of Object.entries(hotspotQuads(scene))) {
      s.strokeStyle = s.fillStyle = "#e0245e";
      s.beginPath();
      quad.forEach(([x, y], i) => (i ? s.lineTo(...toPanel(x, y, 0)) : s.moveTo(...toPanel(x, y, 0))));
      s.closePath();
      s.stroke();
      const [lx, ly] = toPanel(...quad[0], 0);
      s.fillText(name, lx + 3, ly + 14);
    }
  }
  const step = Number(arg("grid", 0));
  if (step > 0) {
    s.font = "11px sans-serif";
    s.lineWidth = 1;
    for (let panel = 0; panel < 3; panel++) {
      s.save();
      s.beginPath();
      s.rect(panel * (pw + 10), 0, pw, ph);
      s.clip();
      for (let gx = Math.ceil(cx / step) * step; gx <= cx + cw; gx += step) {
        const [x] = toPanel(gx, 0, panel);
        s.strokeStyle = "rgba(220,30,30,.45)";
        s.beginPath(); s.moveTo(x, 0); s.lineTo(x, ph); s.stroke();
        s.fillStyle = "#c01818"; s.fillText(gx, x + 2, 11);
      }
      for (let gy = Math.ceil(cy / step) * step; gy <= cy + ch; gy += step) {
        const [, y] = toPanel(0, gy, panel);
        s.strokeStyle = "rgba(30,60,220,.45)";
        s.beginPath(); s.moveTo(panel * (pw + 10), y); s.lineTo(panel * (pw + 10) + pw, y); s.stroke();
        s.fillStyle = "#1838c0"; s.fillText(gy, panel * (pw + 10) + 2, y - 2);
      }
      s.restore();
    }
  }
  fs.writeFileSync(out, sheet.toBuffer("image/png"));
  console.log(`[render-rig] ${rig.outfit ? `${rig.outfit}, ` : ""}${scene.visible.length} parts, mood ${moodName}${scene.blinkNow ? " (mid-blink)" : ""} → ${out}`);
}

main();
