// Writes a Hangout v2 rig (docs/hangout-activity.md §3) for a converted
// Live2D model: assets/live2d/<character>/rig.json, modeled on Alan's
// hand-tuned one (assets/live2d/alan/rig.json is the template).
//
//   node activity/tools/live2d-rig.js <character> [--outfit academy]
//        [--dry-run]
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
// - background: v1's rig.json background, else the character's room;
// - the outfit's dialogueVariant (uniform for academy, casual otherwise),
//   which /meet's variant roll picks it by (docs/hangout-activity.md §11.5).
// Hotspots are a starting point: check them in the v2 preview's "show
// hotspots" overlay (hangout-v2.html?character=<id>).

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
 * The model at rest (the idle clip's first frame): every drawable's id,
 * ancestor part ids (nearest first), canvas-px bounds (y down) and opacity.
 */
export async function measureModel(model3File) {
  const C = await cubismCore();
  const dir = path.dirname(model3File);
  const model3 = JSON.parse(fs.readFileSync(model3File, "utf8"));
  const bytes = fs.readFileSync(path.join(dir, model3.FileReferences.Moc));
  const model = C.Model.fromMoc(C.Moc.fromArrayBuffer(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength)));
  const { parameters: P, parts: PT, drawables: D, canvasinfo: info } = model;
  const pIndex = new Map(Array.from(P.ids, (id, i) => [id, i]));
  const partIds = Array.from(PT.ids);
  for (let i = 0; i < P.count; i++) P.values[i] = P.defaultValues[i];
  const idle = model3.FileReferences.Motions?.m_default?.[0];
  if (idle) {
    for (const c of JSON.parse(fs.readFileSync(path.join(dir, idle.File), "utf8")).Curves) {
      if (c.Target === "Parameter" && pIndex.has(c.Id)) P.values[pIndex.get(c.Id)] = evalCurve(c.Segments, 0);
      if (c.Target === "PartOpacity" && partIds.includes(c.Id)) PT.opacities[partIds.indexOf(c.Id)] = evalCurve(c.Segments, 0);
    }
  }
  model.update();
  const ancestors = (pi) => {
    const out = [];
    for (; pi >= 0; pi = PT.parentIndices[pi]) out.push(partIds[pi]);
    return out;
  };
  const drawables = [];
  for (let d = 0; d < D.count; d++) {
    const v = D.vertexPositions[d];
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (let k = 0; k < v.length; k += 2) {
      const x = v[k] * info.PixelsPerUnit + info.CanvasOriginX;
      const y = -v[k + 1] * info.PixelsPerUnit + info.CanvasOriginY;
      x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y);
    }
    drawables.push({ id: D.ids[d], parts: ancestors(D.parentPartIndices[d]), box: [x0, y0, x1, y1].map(Math.round), opacity: D.opacities[d] });
  }
  return {
    model3,
    canvas: [info.CanvasWidth, info.CanvasHeight],
    drawables,
    expressions: (model3.FileReferences.Expressions ?? []).map((e) => e.Name),
    groups: Object.keys(model3.FileReferences.Motions ?? {}),
  };
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

/**
 * The belly, in the chest part's space: from the chest spot's bottom down to
 * the top of the pants, where the hips spot starts. A short jacket ends
 * above the pants, so the rect can run past the part (y > 1).
 */
export function bellyRect(drawables, chestIds, pantsIds, chestRect) {
  const box = (ids) => {
    const bs = drawables.filter((x) => ids.includes(x.id)).map((x) => x.box);
    return [Math.min(...bs.map((b) => b[0])), Math.min(...bs.map((b) => b[1])), Math.max(...bs.map((b) => b[2])), Math.max(...bs.map((b) => b[3]))];
  };
  const chest = box(chestIds);
  const bottom = (box(pantsIds)[1] - chest[1]) / (chest[3] - chest[1]);
  return [0.2, chestRect[3], 0.8, Math.round(bottom * 100) / 100];
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

  const parts = Object.fromEntries(["face_base", "mouth", "ear_r", "ear_l", "hand_r", "hand_l"].filter((k) => found[k]).map((k) => [k, found[k]]));
  const outfitParts = {};
  const outfitHotspots = {};
  const alanOutfit = alan.outfits[alan.defaultOutfit].hotspots;
  if (found.chest) {
    outfitParts.chest = found.chest;
    outfitHotspots.chest = { part: "chest", rect: alanOutfit.chest.rect };
  }
  if (found.chest && found.pants) outfitHotspots.belly = { part: "chest", rect: bellyRect(m.drawables, found.chest, found.pants, alanOutfit.chest.rect) };
  if (found.pants) {
    outfitParts.pants = found.pants;
    outfitHotspots.hips = { part: "pants", rect: alanOutfit.hips.rect };
  }

  const hotspots = {};
  // Alan's lips rect pads a thin closed-mouth line; a mouth part's union is
  // taller, so it's padded less.
  if (parts.mouth) hotspots.lips = { part: "mouth", rect: [-0.25, -0.5, 1.25, 1.5] };
  for (const k of ["ear_r", "ear_l", "hand_r", "hand_l"]) if (parts[k]) hotspots[k] = { part: k };
  hotspots.cheek = alan.hotspots.cheek;
  hotspots.head = alan.hotspots.head;

  const v1 = path.join(REPO, "assets/rig", character, "rig.json");
  const background = (fs.existsSync(v1) && JSON.parse(fs.readFileSync(v1, "utf8")).background) || roomBackground(character, dir);

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

/** Alan's rig.json layout: objects open, short flat ones and arrays on one line. */
export function formatRig(rig) {
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
  return fmt(rig, 0) + "\n";
}

async function main() {
  const [character, ...rest] = process.argv.slice(2);
  const opt = (name, fallback = null) => {
    const i = rest.indexOf(`--${name}`);
    return i >= 0 ? rest[i + 1] : fallback;
  };
  if (!character) {
    console.error("usage: node activity/tools/live2d-rig.js <character> [--outfit academy] [--dry-run]");
    process.exit(1);
  }
  const rig = await buildRig(character, opt("outfit", "academy"));
  const text = formatRig(rig);
  if (rest.includes("--dry-run")) return process.stdout.write(text);
  const file = path.join(LIVE2D, character, "rig.json");
  fs.writeFileSync(file, text);
  const moodsMissing = ["default", ...MOODS].filter((k) => !rig.expressions.moods[k]);
  console.log(`[live2d-rig] ${file}`);
  console.log(`[live2d-rig] hotspot parts: ${[...Object.keys(rig.parts), ...Object.keys(rig.outfits[rig.defaultOutfit].parts)].join(", ")}`);
  console.log(`[live2d-rig] poses: ${JSON.stringify(rig.reactionPoses)}`);
  if (moodsMissing.length) console.log(`[live2d-rig] no expression for: ${moodsMissing.join(", ")} (shown as default)`);
  if (!rig.background) console.log("[live2d-rig] no background: set rig.json `background` by hand");
  console.log(`[live2d-rig] next: check hangout-v2.html?character=${character} with "show hotspots"`);
}

if (import.meta.url === `file://${process.argv[1]}`) main();
