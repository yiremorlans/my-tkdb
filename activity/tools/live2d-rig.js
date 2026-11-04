// Writes a Hangout rig (docs/hangout-activity.md §3) for a converted
// Live2D model: assets/live2d/<character>/rig.json, modeled on Alan's
// hand-tuned one (assets/live2d/alan/rig.json is the template).
//
//   node activity/tools/live2d-rig.js <character> [--outfit academy]
//        [--dry-run] [--force]
//
// A character with no rig.json gets a whole new one. With a rig.json
// already there, the file is hand-tuned (moods, poses, reactions, trimmed
// hotspots), so only the --outfit's entry under `outfits` is added or
// replaced, spliced into the text so nothing else moves. Shared parts
// whose drawables differ on the new model go in the outfit's own parts.
// The default outfit can't be merged this way (the shared parts are its
// model's): rewriting it, or the whole file, takes --force.
//
// Run it after live2d-convert.js. It measures the model at rest (Cubism
// Core, the vendored copy, run under Node) and fills in:
// - parts: hotspot drawables picked from the model's part tree (PartFace,
//   PartMouth, PartEar, PartUpperBody, PartArm*/PartHand*) and rest bounds;
// - stage: Alan's framing, shifted so the face sits where his does (every
//   game model shares the 2000x2800 canvas, so the scale carries over);
// - expressions.moods: each sceneFaces.js face mapped onto the expressions
//   this model has (the vocabularies differ per character);
// - reactionPoses: the closest pose clip to Alan's for each reaction;
// - background: the character's room;
// - the outfit's dialogueVariant (uniform for academy, casual otherwise),
//   which /meet's variant roll picks it by (docs/hangout-activity.md §11.5).
// Hotspots are a starting point: check them in the preview's "show
// hotspots" overlay (hangout.html?character=<id>).
//
//   node activity/tools/live2d-rig.js <character> --pose-hands [--dry-run]
//
// adds only the pose hands (withPoseHands) to an existing rig's hand parts,
// for rigs made before the generator measured poses.

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

import { roomBackground } from "./lib/backgrounds.js";

const REPO = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const LIVE2D = path.join(REPO, "assets/live2d");

// --- moods and poses ----------------------------------------------------------
// Each mood takes the first expression the model has. "angry" is only an
// ingredient of "upset" (Alan's upset is ikari + ase).

const SINGLE = {
  close: ["e_close_00"],
  smile: ["e_egao_00", "e_smile_00", "e_kusho_00", "e_yasashii_00", "e_jishin_00", "e_manmen_00"],
  full_smile: ["e_manmen_00", "e_egao_00", "e_smile_00", "e_ninmari_00", "e_amae_00", "e_yasashii_00"],
  blush: ["e_sekimen_00", "e_sekimen1_00"],
  surprise: ["e_odoroki_00"],
  sweat: ["e_ase_00"],
  serious: ["e_magao_00", "e_shinken_00", "e_ikari_00", "e_mukanshin_00", "e_fukigen_00"],
  annoyed: ["e_kire_00", "e_fukigen_00", "e_fuman_00", "e_ikari_00", "e_mad_00", "e_keibetsu_00", "e_suneru_00", "e_mu_00", "e_komari_00"],
  angry: ["e_ikari_00", "e_fukigen_00", "e_fuman_00", "e_kire_00", "e_mad_00", "e_keibetsu_00", "e_komari_00", "e_shinken_00"],
  sad: ["e_kanashimi_00", "e_kanasii_00", "e_kanasimi_00", "e_shobokure_00", "e_cry_00", "e_namida_00", "e_kurushimi_00", "e_shippai_00", "e_komari_00"],
  away: ["e_tsujo_away_00"],
  wink: ["e_wink_00"],
  lovestruck: ["e_dere_00"],
};
const COMBOS = {
  smile_blush: ["smile", "blush"],
  full_smile_blush: ["full_smile", "blush"],
  surprise_blush: ["surprise", "blush"],
  upset: ["angry", "sweat"],
};
const MOODS = ["close", "smile", "full_smile", "blush", "smile_blush", "full_smile_blush", "surprise", "surprise_blush", "sweat", "serious", "annoyed", "upset", "sad", "away", "wink", "lovestruck"];

// Alan's: kubi (hand to the neck), udekumi (arms crossed), angry, pocket.
// Arms crossed always reads as upset, so it's every rig's upset pose.
const POSES = {
  headPat: ["m_kubi", "m_atama", "m_kuchimoto", "m_tere", "m_poripori"],
  hipsTouch: ["m_tekumi", "m_ryoutekoshi"],
  upset: ["m_udekumi", "m_angry", "m_ikari", "m_fist", "m_kobushi", "m_akire", "m_hidarikoshi"],
};

export function mapMoods(expressions) {
  const has = new Set(expressions);
  const single = Object.fromEntries(Object.entries(SINGLE).map(([k, c]) => [k, c.find((e) => has.has(e))]));
  const moods = { default: [] };
  for (const mood of MOODS) {
    const exprs = (COMBOS[mood] ?? [mood]).map((m) => single[m]);
    if (exprs.every(Boolean)) moods[mood] = exprs;
  }
  return moods;
}

export function mapPoses(groups) {
  const has = new Set(groups);
  const poses = {};
  for (const [reaction, cands] of Object.entries(POSES)) {
    const pose = cands.find((c) => has.has(c) && has.has(`${c}_hold`) && has.has(`${c}_return`));
    if (pose) poses[reaction] = pose;
  }
  return poses;
}

// --- measuring ----------------------------------------------------------------

let core;

/** Cubism Core's browser build, run in a sandbox with the globals it expects. */
async function cubismCore() {
  if (core) return core;
  // Its console.log only prints the Core version banner: keep stdout clean.
  const quiet = { log: () => {}, warn: console.warn, error: console.error };
  const ctx = vm.createContext({ console: quiet, atob, WebAssembly, setTimeout, document: { currentScript: { src: "" } } });
  ctx.globalThis = ctx;
  vm.runInContext(fs.readFileSync(path.join(LIVE2D, "vendor/live2dcubismcore.min.js"), "utf8") + ";globalThis.Live2DCubismCore = Live2DCubismCore;", ctx);
  // Its wasm instantiates asynchronously: wait until a Moc can be made.
  for (let i = 0; i < 100 && !ctx.Live2DCubismCore?.Moc?.fromArrayBuffer; i++) await new Promise((r) => setTimeout(r, 20));
  for (let i = 0; i < 100; i++) {
    try {
      ctx.Live2DCubismCore.Version.csmGetVersion();
      break;
    } catch {
      await new Promise((r) => setTimeout(r, 20));
    }
  }
  return (core = ctx.Live2DCubismCore);
}

function evalCurve(s, t) {
  // motion3 segments: [t0, v0, type, ...]; 0 linear, 1 bezier, 2 stepped, 3 inverse stepped
  let t0 = s[0], v0 = s[1], i = 2;
  if (t <= t0) return v0;
  while (i < s.length) {
    const type = s[i];
    if (type === 1) {
      const [, y1, , y2, x3, y3] = s.slice(i + 1, i + 7);
      if (t <= x3) {
        const u = (t - t0) / (x3 - t0), a = 1 - u;
        return a * a * a * v0 + 3 * a * a * u * y1 + 3 * a * u * u * y2 + u * u * u * y3;
      }
      t0 = x3; v0 = y3; i += 7;
    } else {
      const [x1, y1] = [s[i + 1], s[i + 2]];
      if (t <= x1) return type === 0 ? v0 + ((t - t0) / (x1 - t0)) * (y1 - v0) : type === 2 ? v0 : y1;
      t0 = x1; v0 = y1; i += 3;
    }
  }
  return v0;
}

/**
 * A model posed by motion clips: frame(clip, t) sets every parameter and
 * part opacity to the clip's value at t seconds (null: defaults only) and
 * returns every drawable's id, ancestor part ids (nearest first), canvas-px
 * bounds (y down) and opacity.
 */
async function loadModel(model3File) {
  const C = await cubismCore();
  const dir = path.dirname(model3File);
  const model3 = JSON.parse(fs.readFileSync(model3File, "utf8"));
  const bytes = fs.readFileSync(path.join(dir, model3.FileReferences.Moc));
  const model = C.Model.fromMoc(C.Moc.fromArrayBuffer(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength)));
  const { parameters: P, parts: PT, drawables: D, canvasinfo: info } = model;
  const pIndex = new Map(Array.from(P.ids, (id, i) => [id, i]));
  const partIds = Array.from(PT.ids);
  const partOpacities = Float32Array.from(PT.opacities);
  const ancestors = (pi) => {
    const out = [];
    for (; pi >= 0; pi = PT.parentIndices[pi]) out.push(partIds[pi]);
    return out;
  };
  const parents = Array.from({ length: D.count }, (_, d) => ancestors(D.parentPartIndices[d]));
  const frame = (clip, t) => {
    for (let i = 0; i < P.count; i++) P.values[i] = P.defaultValues[i];
    for (let i = 0; i < PT.count; i++) PT.opacities[i] = partOpacities[i];
    for (const c of clip?.Curves ?? []) {
      if (c.Target === "Parameter" && pIndex.has(c.Id)) P.values[pIndex.get(c.Id)] = evalCurve(c.Segments, t);
      if (c.Target === "PartOpacity" && partIds.includes(c.Id)) PT.opacities[partIds.indexOf(c.Id)] = evalCurve(c.Segments, t);
    }
    model.update();
    const drawables = [];
    for (let d = 0; d < D.count; d++) {
      const v = D.vertexPositions[d];
      let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
      for (let k = 0; k < v.length; k += 2) {
        const x = v[k] * info.PixelsPerUnit + info.CanvasOriginX;
        const y = -v[k + 1] * info.PixelsPerUnit + info.CanvasOriginY;
        x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y);
      }
      drawables.push({ id: D.ids[d], parts: parents[d], box: [x0, y0, x1, y1].map(Math.round), opacity: D.opacities[d] });
    }
    return drawables;
  };
  const clip = (file) => JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
  return { model3, info, frame, clip };
}

/**
 * The model at rest (the idle clip's first frame): every drawable's id,
 * ancestor part ids (nearest first), canvas-px bounds (y down) and opacity.
 */
export async function measureModel(model3File) {
  const { model3, info, frame, clip } = await loadModel(model3File);
  const idle = model3.FileReferences.Motions?.m_default?.[0];
  return {
    model3,
    canvas: [info.CanvasWidth, info.CanvasHeight],
    drawables: frame(idle ? clip(idle.File) : null, 0),
    expressions: (model3.FileReferences.Expressions ?? []).map((e) => e.Name),
    groups: Object.keys(model3.FileReferences.Motions ?? {}),
  };
}

/**
 * The model through every pose: each motion clip but the idle and breath
 * ones and the game's lettered variants (m_ago_B, m_default_C: Hangout
 * plays none), sampled at its start, quarters and end (the drawables, per
 * frame).
 */
export async function measurePoses(model3File) {
  const { model3, frame, clip } = await loadModel(model3File);
  const frames = [];
  for (const [group, entries] of Object.entries(model3.FileReferences.Motions ?? {})) {
    if (group === "Idle" || group === "m_default" || group === "m_breath" || /_[A-Z](_|$)/.test(group)) continue;
    for (const { File } of entries) {
      const c = clip(File);
      const d = c.Meta?.Duration ?? 0;
      for (const t of [0, 0.25, 0.5, 0.75, 1]) frames.push(frame(c, t * d));
    }
  }
  return frames;
}

// --- hotspot parts ------------------------------------------------------------

const area = (b) => (b[2] - b[0]) * (b[3] - b[1]);
const midX = (b) => (b[0] + b[2]) / 2;
const largest = (xs) => xs.reduce((a, x) => (area(x.box) > area(a.box) ? x : a));
// The character's right is on screen left; every model is centered at x 1000.
const SIDES = [["r", (x) => x < 1000], ["l", (x) => x > 1000]];

/** Hotspot drawables by part name, and the face skin's bounds. */
export function pickParts(drawables) {
  const vis = drawables.filter((x) => x.opacity > 0.5 && x.box[0] < x.box[2]);
  const under = (name) => vis.filter((x) => x.parts.includes(name));
  const out = {};

  const face = largest(vis.filter((x) => x.parts[0] === "PartFace"));
  out.face_base = [face.id];
  const fb = face.box;

  const mouth = under("PartMouth");
  if (mouth.length) out.mouth = mouth.map((x) => x.id);
  else {
    // No mouth part (Alan): the thin closed-mouth line low in the face.
    const line = under("PartFace").filter((x) => x.box[3] - x.box[1] < 25 && Math.abs(midX(x.box) - 1000) < 40 && x.box[1] > fb[1] + 0.65 * (fb[3] - fb[1]) && x.box[1] < fb[3]);
    if (line.length) out.mouth = [line.reduce((a, x) => (area(x.box) < area(a.box) ? x : a)).id];
  }

  let ears = under("PartEar");
  if (!ears.length) {
    // Ears drawn in the face part, poking out past the face skin.
    ears = under("PartFace").filter((x) => x.box[2] - x.box[0] < 90 && (x.box[0] < fb[0] + 5 || x.box[2] > fb[2] - 5) && fb[1] < (x.box[1] + x.box[3]) / 2 && (x.box[1] + x.box[3]) / 2 < fb[3]);
  }
  for (const [s, test] of SIDES) {
    const e = ears.filter((x) => test(midX(x.box)));
    if (e.length) out[`ear_${s}`] = e.map((x) => x.id);
  }

  // Hands: the arm pieces whose bottoms sit lowest on each side at rest.
  // Hands raised or hidden at rest (above y 1150) get no hotspot.
  const arm = vis.filter((x) => x.parts.some((p) => /^Part(Arm|Hand)/.test(p)));
  for (const [s, test] of SIDES) {
    const a = arm.filter((x) => test(midX(x.box)));
    if (!a.length) continue;
    const low = Math.max(...a.map((x) => x.box[3]));
    if (low >= 1150) out[`hand_${s}`] = a.filter((x) => x.box[3] > low - 130).map((x) => x.id);
  }

  // (Their pose hands are added by withPoseHands, which needs the poses.)

  // Chest: the biggest centered torso piece (a vest, Alan's), or for a
  // jacket cut in two down the middle, the biggest of each half.
  const body = under("PartUpperBody").filter((x) => Math.abs(midX(x.box) - 1000) < 60 && x.box[2] - x.box[0] > 300);
  if (body.length) out.chest = [largest(body).id];
  else {
    const halves = under("PartUpperBody").filter((x) => x.box[3] - x.box[1] > 500 && x.box[2] - x.box[0] > 200);
    const [left, right] = SIDES.map(([, test]) => halves.filter((x) => test(midX(x.box))));
    if (left.length && right.length) out.chest = [largest(left).id, largest(right).id];
  }

  // Pants: the legs, tall pieces starting around the waist.
  const legs = vis.filter((x) => x.box[3] - x.box[1] > 800 && x.box[1] > 1100 && x.box[1] < 1500);
  if (legs.length) out.pants = legs.map((x) => x.id);
  return { parts: out, face: fb };
}

const shown = (x) => x.opacity > 0.5 && x.box[0] < x.box[2];

/**
 * A hand pick (`ids`, drawables visible at rest) plus its pose hands, so
 * the hotspot follows the hand through every pose. A pose swaps the hand
 * art for other drawables, which sit in (by the first rule that finds any):
 * - the same hand group, the part just inside the arm's outermost
 *   PartArm/PartHand (PartHandR, Jin's Part16), even with the arms crossed;
 * - for a PartHand* group, any PartHand* group in the same arm (Lyca's
 *   PartHand7, Shohei's PartHandR3 raised to the head);
 * - in a frame where none of those show, a group of the arm hidden at rest
 *   whose pieces end lowest on the arm then, as the rest pick (Yuri's and
 *   Rui's surprised hands).
 * Only drawables hidden at rest and shown in some frame of `frames`
 * (measurePoses) are added, so the rest bounds stay as picked. With a
 * PartHand* group among several (a pick reaching into the forearm, Leo's),
 * only those count.
 */
export function withPoseHands(rest, frames, ids) {
  const byId = new Map(rest.map((x) => [x.id, x]));
  const topOf = (x) => (x ? x.parts.findLastIndex((p) => /^Part(Arm|Hand)/.test(p)) : -1);
  const groupOf = (x) => (topOf(x) > 0 ? x.parts[topOf(x) - 1] : null);
  const picked = ids.map((id) => byId.get(id)).filter(Boolean);
  const arm = picked.length ? picked[0].parts[topOf(picked[0])] : null;
  let groups = [...new Set(picked.map(groupOf).filter(Boolean))];
  const named = groups.some((g) => /^PartHand/.test(g));
  if (named) groups = groups.filter((g) => /^PartHand/.test(g));
  const inArm = (x) => arm && x.parts.includes(arm);
  if (named) for (const x of rest) if (inArm(x) && /^PartHand/.test(groupOf(x) ?? "")) groups.push(groupOf(x));
  const hiddenAtRest = new Set(rest.filter(inArm).map(groupOf).filter((g) => g && !rest.some((x) => groupOf(x) === g && shown(x))));
  const add = new Set();
  for (const f of frames) {
    const hand = f.filter((x) => shown(x) && (ids.includes(x.id) || (!shown(byId.get(x.id)) && groups.some((g) => x.parts.includes(g)))));
    for (const x of hand) if (!ids.includes(x.id)) add.add(x.id);
    if (hand.length) continue;
    const armNow = f.filter((x) => shown(x) && inArm(x));
    if (!armNow.length) continue;
    const low = Math.max(...armNow.map((x) => x.box[3]));
    for (const x of armNow) if (hiddenAtRest.has(groupOf(x)) && x.box[3] > low - 130) add.add(x.id);
  }
  return [...ids, ...rest.filter((x) => add.has(x.id)).map((x) => x.id)];
}

/**
 * The belt line, in canvas px: the top of the waistband. The pants part is
 * the legs, which start lower, at the crotch; the waistband is the hip piece
 * above them (a wide lower-body drawable ending above mid-thigh). Its mesh
 * pads the art, so the belt sits about 25px below the mesh's top. With
 * several, the lowest top wins (the others run up under a vest or shirt).
 * Falls back to the pants top.
 */
export function beltLine(drawables, pantsIds) {
  const legs = drawables.filter((x) => pantsIds.includes(x.id));
  const pantsTop = Math.min(...legs.map((x) => x.box[1]));
  const hip = drawables.filter((x) => x.opacity > 0.5 && !pantsIds.includes(x.id) && x.parts.some((p) => /Lower|Under/i.test(p)) && !x.parts.some((p) => /Arm|Hand/.test(p)) && x.box[0] < 1000 && x.box[2] > 1000 && x.box[2] - x.box[0] > 300 && x.box[3] - x.box[1] > 250 && x.box[1] < pantsTop && x.box[3] < pantsTop + 400);
  return hip.length ? Math.max(...hip.map((x) => x.box[1])) + 25 : pantsTop;
}

const unionBox = (drawables, ids) => {
  const bs = drawables.filter((x) => ids.includes(x.id)).map((x) => x.box);
  return [Math.min(...bs.map((b) => b[0])), Math.min(...bs.map((b) => b[1])), Math.max(...bs.map((b) => b[2])), Math.max(...bs.map((b) => b[3]))];
};
const r2 = (x) => Math.round(x * 100) / 100;

// The chest spot in canvas px: at least this wide and tall, centered on the
// chest part and starting near its top. Chest pieces vary (a short jacket
// front, Jo's or Yuri's), so a fraction of the part would size it unevenly;
// rects may run past the part (x < 0, x > 1). Shared spots (hands) are
// listed first, so they still win where the chest overlaps them.
const CHEST_PX = 400;

/** The chest rect, in the chest part's space. */
export function chestRect(drawables, chestIds) {
  const [x0, y0, x1, y1] = unionBox(drawables, chestIds);
  const w = x1 - x0, h = y1 - y0;
  const r3 = (x) => Math.round(x * 1000) / 1000;
  return [r3(0.5 - CHEST_PX / 2 / w), 0.02, r3(0.5 + CHEST_PX / 2 / w), r3(0.02 + CHEST_PX / h)];
}

// The hips spot starts this far below the belt line (and the belly ends
// there), so a tap on the belt itself still reads as the belly.
const HIP_DROP = 35;

/**
 * The belly, in the chest part's space: from the chest spot's bottom down to
 * the belt line, where the hips spot starts. A short jacket ends above the
 * belt, so the rect can run past the part (y > 1).
 */
export function bellyRect(drawables, chestIds, pantsIds, chestRect) {
  const chest = unionBox(drawables, chestIds);
  // It ends where the hips spot's rounded start lands, rounded up to three
  // places, so the two meet with no gap and under a pixel of overlap.
  const pants = unionBox(drawables, pantsIds);
  const hipsTop = pants[1] + hipsRect(drawables, pantsIds)[1] * (pants[3] - pants[1]);
  return [0.14, chestRect[3], 0.86, Math.ceil(((hipsTop - chest[1]) / (chest[3] - chest[1])) * 1000) / 1000];
}

/**
 * The hips, in the pants part's space: from the belt line (above the legs'
 * top, so y < 0) down a fifth of the legs, and at least 350px below the
 * belt for legs that start at the waist instead of the crotch (Haru's).
 */
export function hipsRect(drawables, pantsIds) {
  const pants = unionBox(drawables, pantsIds);
  const h = pants[3] - pants[1];
  const belt = beltLine(drawables, pantsIds) + HIP_DROP;
  return [0.08, r2((belt - pants[1]) / h), 0.92, r2(Math.max(0.2, (belt + 350 - pants[1]) / h))];
}

// --- rig.json -----------------------------------------------------------------

export async function buildRig(character, outfit) {
  const alan = JSON.parse(fs.readFileSync(path.join(LIVE2D, "alan/rig.json"), "utf8"));
  const alanModel = await measureModel(path.join(LIVE2D, "alan", alan.outfits[alan.defaultOutfit].model));
  const { face: alanFace } = pickParts(alanModel.drawables);

  const dir = path.join(LIVE2D, character);
  const modelFile = `${outfit}/${character}_${outfit}.model3.json`;
  const m = await measureModel(path.join(dir, modelFile));
  if (m.canvas.join() !== [alan.reference.width, alan.reference.height].join()) {
    throw new Error(`${character}: canvas ${m.canvas.join("x")} isn't Alan's ${alan.reference.width}x${alan.reference.height}; set stage by hand`);
  }
  const { parts: found, face } = pickParts(m.drawables);

  const dy = face[1] - alanFace[1];
  const stage = Object.fromEntries(Object.entries(alan.stage).map(([k, v]) => [k, { top: v.top + dy, bottom: v.bottom + dy, centerX: v.centerX }]));

  const poses = await measurePoses(path.join(dir, modelFile));
  for (const k of ["hand_r", "hand_l"]) if (found[k]) found[k] = withPoseHands(m.drawables, poses, found[k]);
  const parts = Object.fromEntries(["face_base", "mouth", "ear_r", "ear_l", "hand_r", "hand_l"].filter((k) => found[k]).map((k) => [k, found[k]]));
  const outfitParts = {};
  const outfitHotspots = {};
  if (found.chest) {
    outfitParts.chest = found.chest;
    outfitHotspots.chest = { part: "chest", rect: chestRect(m.drawables, found.chest) };
  }
  if (found.chest && found.pants) outfitHotspots.belly = { part: "chest", rect: bellyRect(m.drawables, found.chest, found.pants, outfitHotspots.chest.rect) };
  if (found.pants) {
    outfitParts.pants = found.pants;
    outfitHotspots.hips = { part: "pants", rect: hipsRect(m.drawables, found.pants) };
  }

  const hotspots = {};
  // Alan's lips rect pads a thin closed-mouth line; a mouth part's union is
  // taller, so it's padded less.
  if (parts.mouth) hotspots.lips = { part: "mouth", rect: [-0.25, -0.5, 1.25, 1.5] };
  for (const k of ["ear_r", "ear_l", "hand_r", "hand_l"]) if (parts[k]) hotspots[k] = { part: k };
  hotspots.cheek = alan.hotspots.cheek;
  hotspots.head = alan.hotspots.head;

  const background = roomBackground(character, dir);

  return {
    character,
    reference: alan.reference,
    ...(background ? { background } : {}),
    stage,
    defaultOutfit: outfit,
    outfits: {
      [outfit]: {
        model: modelFile,
        dialogueVariant: outfit === "academy" ? "uniform" : "casual",
        parts: outfitParts,
        hotspots: outfitHotspots,
      },
    },
    parts,
    hotspots,
    bones: alan.bones,
    expressions: { fade: alan.expressions.fade, moods: mapMoods(m.expressions) },
    reactionPoses: mapPoses(m.groups),
    annoyance: alan.annoyance,
    motion: alan.motion,
  };
}

/**
 * The `outfits` entry for adding `outfit` (built by buildRig) to the
 * existing rig. A shared part is kept when all its drawables are in the new
 * model's pick (the same part, or a hand trim of it: ears without hair);
 * otherwise the pick goes in the outfit's own parts.
 * Returns the entry, those overrides, and the expressions and poses the
 * shared moods and reactionPoses name that the new model doesn't have.
 */
export function outfitEntry(existing, built, outfit, model3) {
  const entry = structuredClone(built.outfits[outfit]);
  const overrides = [];
  for (const [k, ids] of Object.entries(built.parts)) {
    const shared = existing.parts?.[k] ?? [];
    if (!shared.every((id) => ids.includes(id))) {
      entry.parts[k] = ids;
      overrides.push(k);
    }
  }
  const refs = model3.FileReferences;
  const have = new Set([...(refs.Expressions ?? []).map((e) => e.Name), ...Object.keys(refs.Motions ?? {})]);
  const named = JSON.stringify([existing.expressions?.moods, existing.reactionPoses]).match(/"[em]_[a-z0-9_]+"/g) ?? [];
  const missing = [...new Set(named.map((s) => s.slice(1, -1)))].filter((n) => !have.has(n));
  return { entry, overrides, missing };
}

/** Index just past the bracket matching the one at `open` (JSON text, string-aware). */
function closeOf(text, open) {
  let depth = 0;
  for (let i = open; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      for (i++; text[i] !== '"'; i++) if (text[i] === "\\") i++;
    } else if (c === "{" || c === "[") depth++;
    else if (c === "}" || c === "]") {
      if (--depth === 0) return i + 1;
    }
  }
  throw new Error("rig.json: unbalanced brackets");
}

/** `text` (a rig.json) with outfits[`name`] set to `entry`; every other byte stays as written. */
export function spliceOutfit(text, name, entry) {
  const key = text.indexOf('"outfits": {');
  if (key < 0) throw new Error('rig.json: no "outfits" object');
  const open = text.indexOf("{", key);
  const end = closeOf(text, open);
  // The outfits object's own keys: walk its entries, skipping each value.
  let last = null;
  for (let i = open + 1; i < end - 1; ) {
    const q = text.indexOf('"', i);
    if (q < 0 || q >= end - 1) break;
    const qEnd = text.indexOf('"', q + 1);
    const valueStart = text.indexOf("{", qEnd);
    const valueEnd = closeOf(text, valueStart);
    if (text.slice(q + 1, qEnd) === name) {
      return text.slice(0, valueStart) + formatValue(entry, 2) + text.slice(valueEnd);
    }
    last = valueEnd;
    i = valueEnd;
  }
  const insert = `${last === null ? "\n" : ",\n"}    ${JSON.stringify(name)}: ${formatValue(entry, 2)}`;
  const at = last ?? open + 1;
  return text.slice(0, at) + insert + text.slice(at);
}

/** The [open, end) span of the object value of `"key": {` at or after `from`, before `before`. */
function objectAt(text, key, from = 0, before = text.length) {
  const k = text.indexOf(`${JSON.stringify(key)}: {`, from);
  if (k < 0 || k >= before) return null;
  const open = text.indexOf("{", k);
  return [open, closeOf(text, open)];
}

/** `text` with `key`'s array in the object spanning [open, end) set to `ids` (added if missing). */
function spliceArray(text, [open, end], key, ids) {
  const value = `[${ids.map((x) => JSON.stringify(x)).join(", ")}]`;
  const k = text.slice(open, end).indexOf(`${JSON.stringify(key)}: [`);
  if (k >= 0) {
    const a = text.indexOf("[", open + k);
    return text.slice(0, a) + value + text.slice(closeOf(text, a));
  }
  const body = text.slice(open + 1, end - 1);
  if (!body.trim()) return `${text.slice(0, open)}{ ${JSON.stringify(key)}: ${value} }${text.slice(end)}`;
  const last = open + 1 + body.trimEnd().length;
  const sep = body.includes("\n") ? `,\n${body.match(/\n(\s*)"/)[1]}` : ", ";
  return text.slice(0, last) + sep + `${JSON.stringify(key)}: ${value}` + text.slice(last);
}

/**
 * The rig.json with every hand part (shared, and each outfit's own) given
 * its pose hands (withPoseHands), measured on the model that uses it. The
 * existing picks stay first and as they are (some are hand trimmed). An
 * outfit using the shared hands whose model finds different pose hands gets
 * its own. Everything else stays byte for byte.
 */
export async function addPoseHands(character) {
  const file = path.join(LIVE2D, character, "rig.json");
  let text = fs.readFileSync(file, "utf8");
  const rig = JSON.parse(text);
  const changes = [];
  const extend = async (outfit, ids) => {
    const modelFile = path.join(LIVE2D, character, rig.outfits[outfit].model);
    return withPoseHands((await measureModel(modelFile)).drawables, await measurePoses(modelFile), ids);
  };
  const same = (a, b) => a.length === b.length && a.every((x, i) => x === b[i]);
  const shared = {};
  for (const k of ["hand_r", "hand_l"]) {
    if (!rig.parts?.[k]) continue;
    shared[k] = await extend(rig.defaultOutfit, rig.parts[k]);
    if (!same(shared[k], rig.parts[k])) {
      const top = objectAt(text, "parts", text.indexOf('\n  "parts": {'));
      text = spliceArray(text, top, k, shared[k]);
      changes.push(`${k} +${shared[k].length - rig.parts[k].length}`);
    }
  }
  for (const [outfit, entry] of Object.entries(rig.outfits)) {
    for (const k of ["hand_r", "hand_l"]) {
      const own = entry.parts?.[k];
      if (!own && (outfit === rig.defaultOutfit || !shared[k])) continue;
      const ids = await extend(outfit, own ?? rig.parts[k]);
      if (own ? same(ids, own) : same(ids, shared[k])) continue;
      const outfits = objectAt(text, "outfits");
      const span = objectAt(text, outfit, outfits[0] + 1, outfits[1]);
      const parts = objectAt(text, "parts", span[0], span[1]);
      text = spliceArray(text, parts, k, ids);
      changes.push(`${outfit}.${k} ${own ? `+${ids.length - own.length}` : "own"}`);
    }
  }
  return { file, text, changes };
}

/** Alan's rig.json layout: objects open, short flat ones and arrays on one line. */
export function formatRig(rig) {
  return formatValue(rig, 0) + "\n";
}

/** formatRig's layout for one value nested `depth` levels in. */
function formatValue(value, depth) {
  const flat = (v) => typeof v !== "object" || v === null || (Array.isArray(v) && v.every((x) => typeof x !== "object" || x === null));
  const one = (v) => {
    if (Array.isArray(v)) return `[${v.map((x) => JSON.stringify(x)).join(", ")}]`;
    if (typeof v !== "object" || v === null) return JSON.stringify(v);
    const items = Object.entries(v).map(([k, x]) => `${JSON.stringify(k)}: ${one(x)}`);
    return items.length ? `{ ${items.join(", ")} }` : "{ }";
  };
  // Short: under 90 characters written out with ", " and ": " separators.
  const inline = (v) => flat(v) || (!Array.isArray(v) && Object.values(v).every(flat) && one(v).length - 2 < 90);
  const fmt = (v, depth) => {
    if (inline(v)) return one(v);
    const pad = "  ".repeat(depth + 1);
    return `{\n${Object.entries(v).map(([k, x]) => `${pad}${JSON.stringify(k)}: ${fmt(x, depth + 1)}`).join(",\n")}\n${"  ".repeat(depth)}}`;
  };
  return fmt(value, depth);
}

async function main() {
  const [character, ...rest] = process.argv.slice(2);
  const opt = (name, fallback = null) => {
    const i = rest.indexOf(`--${name}`);
    return i >= 0 ? rest[i + 1] : fallback;
  };
  if (!character) {
    console.error("usage: node activity/tools/live2d-rig.js <character> [--outfit academy] [--dry-run] [--force]");
    process.exit(1);
  }
  if (rest.includes("--pose-hands")) {
    const { file, text, changes } = await addPoseHands(character);
    if (rest.includes("--dry-run")) return process.stdout.write(text);
    if (changes.length) fs.writeFileSync(file, text);
    console.log(`[live2d-rig] ${character}: ${changes.length ? changes.join(", ") : "pose hands already in"}`);
    return;
  }
  const outfit = opt("outfit", "academy");
  const rig = await buildRig(character, outfit);
  const file = path.join(LIVE2D, character, "rig.json");
  if (fs.existsSync(file) && !rest.includes("--force")) {
    const before = fs.readFileSync(file, "utf8");
    const existing = JSON.parse(before);
    if (outfit === existing.defaultOutfit) {
      console.error(`[live2d-rig] ${file} exists and ${outfit} is its default outfit; --force rewrites the whole file (hand tuning is lost)`);
      process.exit(1);
    }
    const model3 = JSON.parse(fs.readFileSync(path.join(LIVE2D, character, rig.outfits[outfit].model), "utf8"));
    const { entry, overrides, missing } = outfitEntry(existing, rig, outfit, model3);
    const text = spliceOutfit(before, outfit, entry);
    if (rest.includes("--dry-run")) return process.stdout.write(text);
    fs.writeFileSync(file, text);
    console.log(`[live2d-rig] ${file}: ${existing.outfits[outfit] ? "replaced" : "added"} outfit ${outfit}`);
    console.log(`[live2d-rig] outfit parts: ${Object.keys(entry.parts).join(", ")}${overrides.length ? ` (own ${overrides.join(", ")}: drawables differ from the shared ones)` : ""}`);
    if (missing.length) console.log(`[live2d-rig] the ${outfit} model lacks ${missing.join(", ")}, which the shared moods/poses use: change them by hand`);
    console.log(`[live2d-rig] next: check hangout.html?character=${character}&outfit=${outfit} with "show hotspots"`);
    return;
  }
  const text = formatRig(rig);
  if (rest.includes("--dry-run")) return process.stdout.write(text);
  fs.writeFileSync(file, text);
  const moodsMissing = ["default", ...MOODS].filter((k) => !rig.expressions.moods[k]);
  console.log(`[live2d-rig] ${file}`);
  console.log(`[live2d-rig] hotspot parts: ${[...Object.keys(rig.parts), ...Object.keys(rig.outfits[rig.defaultOutfit].parts)].join(", ")}`);
  console.log(`[live2d-rig] poses: ${JSON.stringify(rig.reactionPoses)}`);
  if (moodsMissing.length) console.log(`[live2d-rig] no expression for: ${moodsMissing.join(", ")} (shown as default)`);
  if (!rig.background) console.log("[live2d-rig] no background: set rig.json `background` by hand");
  console.log(`[live2d-rig] next: check hangout.html?character=${character} with "show hotspots"`);
}

if (import.meta.url === `file://${process.argv[1]}`) main();
