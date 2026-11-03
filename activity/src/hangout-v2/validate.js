// Hangout v2 rig.json validation: the Live2D counterpart of skeleton.js
// validateRig. The rig format is documented at the top of live2dRig.js.
// File access is injected, so the same checks run in the Node tests
// (test/hangout-v2-rig.test.js, against the files on disk) and in the
// dev server (live2dRig.js loadLive2DRig, over fetch; a build skips it). No moc3 parsing here:
// drawable ids are only checked when the caller can look them up.

import { DEFAULT_REACTIONS } from "../hangout/reactions.js";
import { rankFace } from "../../../constants/sceneFaces.js";
import { DIALOGUE_TIERS } from "../../../constants/tiers.js";

// Response ranks the expression ladder has a rung for (sceneFaces.js).
const RANKS = [0, 1, 2];

/**
 * Checks `rig` and the files it names. Throws one Error listing every
 * problem; otherwise resolves to a list of warnings (moods the expression
 * ladder can pick that the rig lacks, which show "default" instead).
 *
 * Paths handed to the callbacks are relative to the rig's folder (model
 * files resolved against their model3.json), e.g. "../../bg/x.png".
 * - readJson(path): the parsed file (sync or async); null or a throw if it
 *   doesn't load
 * - fileExists(path): whether the file is there (sync or async)
 * - mocIds(path): a `{ has(id) }` lookup of the .moc3's drawable ids, or
 *   omitted to skip that check (the browser has no cheap way to list them)
 */
const POSE_ONLY_KEYS = new Set(["guarded", "caughtTease"]);

export async function validateLive2DRig(rig, { readJson, fileExists = () => true, mocIds } = {}) {
  if (!rig || typeof rig !== "object") throw new Error("rig.json: not an object");
  const problems = [...layoutProblems(rig), ...motionProblems(rig.motion)];

  for (const file of [rig.background, ...Object.values(rig.sounds ?? {}).flat()]) {
    if (file != null && !(await fileExists(file))) problems.push(`missing file ${file}`);
  }

  const reactions = new Set([...Object.keys(DEFAULT_REACTIONS), ...Object.keys(rig.reactions ?? {})]);
  for (const name of Object.keys(rig.reactionPoses ?? {})) {
    // Two pose keys aren't reactions: `guarded` (the lockout pose) and
    // `caughtTease` (the preview's caught tease at close: he stops your hand).
    if (!reactions.has(name) && !POSE_ONLY_KEYS.has(name)) problems.push(`reactionPoses.${name}: unknown reaction`);
    for (const tier of Object.keys(rig.reactionPoses[name]?.byTier ?? {})) {
      if (!DIALOGUE_TIERS.includes(tier)) problems.push(`reactionPoses.${name}: unknown tier ${tier}`);
    }
  }
  const rest = rig.restMood;
  for (const [tier, mood] of rest?.byTier ? Object.entries(rest.byTier) : rest != null ? [[null, rest]] : []) {
    if (tier && !DIALOGUE_TIERS.includes(tier)) problems.push(`restMood: unknown tier ${tier}`);
    if (!rig.expressions?.moods?.[mood]) problems.push(`restMood: no mood ${mood}`);
  }

  const names = Object.keys(rig.outfits ?? {});
  if (!names.length) problems.push("`outfits` must name at least one outfit");
  if (rig.defaultOutfit != null && !rig.outfits?.[rig.defaultOutfit]) {
    problems.push(`defaultOutfit ${rig.defaultOutfit} not in outfits`);
  }

  // Shared keys are checked against every outfit's model; a problem every
  // outfit has is reported once, unprefixed, as validateRig does.
  const perOutfit = new Map();
  for (const name of names) {
    perOutfit.set(name, await outfitProblems(rig, name, { readJson, mocIds }));
  }
  const everywhere = names.length > 1
    ? new Set([...perOutfit.values()].reduce((a, b) => a.filter((p) => b.includes(p))))
    : new Set();
  problems.push(...everywhere);
  for (const [name, own] of perOutfit) {
    for (const p of own) if (!everywhere.has(p)) problems.push(`outfits.${name}: ${p}`);
  }

  if (problems.length) throw new Error(`rig.json:\n  ${problems.join("\n  ")}`);
  return ladderWarnings(rig);
}

// --- shared keys ------------------------------------------------------------

function layoutProblems(rig) {
  const problems = [];
  const isNum = (v) => typeof v === "number" && Number.isFinite(v);
  for (const key of ["width", "height"]) {
    if (!isNum(rig.reference?.[key])) problems.push(`reference.${key} must be a number`);
  }
  for (const orientation of ["landscape", "portrait"]) {
    for (const key of ["top", "bottom", "centerX"]) {
      if (!isNum(rig.stage?.[orientation]?.[key])) problems.push(`stage.${orientation}.${key} must be a number`);
    }
  }
  return problems;
}

// The amounts scale the model's own motion, so outside 0-1 they'd
// exaggerate or invert it.
function motionProblems(motion = {}) {
  const problems = [];
  for (const key of ["idle", "breath", "sway"]) {
    const amount = motion[key]?.amount;
    if (amount == null) continue;
    if (typeof amount !== "number" || !(amount >= 0 && amount <= 1)) {
      problems.push(`motion.${key}.amount must be between 0 and 1`);
    }
  }
  for (const [id, seconds] of Object.entries(motion.ease ?? {})) {
    if (typeof seconds !== "number" || !(seconds > 0)) problems.push(`motion.ease.${id} must be a number of seconds above 0`);
  }
  return problems;
}

// --- one outfit -------------------------------------------------------------

async function outfitProblems(rig, name, { readJson, mocIds }) {
  const outfit = rig.outfits[name] ?? {};
  const parts = { ...rig.parts, ...outfit.parts };
  const hotspots = { ...rig.hotspots, ...outfit.hotspots };
  const problems = [...hotspotProblems(hotspots, parts), ...variantProblems(outfit), ...spotsProblems(rig, name), ...onlyProblems(rig, name), ...partBlushProblems(rig.partBlush, parts)];
  if (rig.holdGaze != null && !["steady", "shy"].includes(rig.holdGaze)) problems.push('holdGaze must be "steady" or "shy"');
  const crestParams = rig.crest?.params;
  if (rig.crest != null && !(crestParams && typeof crestParams === "object" && Object.values(crestParams).every((v) => typeof v === "number" && Number.isFinite(v)))) {
    problems.push("crest.params must map parameter ids to numbers");
  }
  if (rig.bliss != null && !(typeof rig.bliss === "object" && Object.entries(rig.bliss).every(([key, v]) => ["browForm", "browUp"].includes(key) && typeof v === "number" && Number.isFinite(v)))) {
    problems.push("bliss may only set browForm and browUp, as numbers");
  }
  if (rig.heartRate != null) {
    const { resting, scale } = rig.heartRate;
    if (resting != null && !(resting > 0)) problems.push("heartRate.resting must be a positive bpm");
    if (scale != null && !(scale >= 0)) problems.push("heartRate.scale must be 0 or more");
  }

  if (typeof outfit.model !== "string") return [...problems, "`model` must name a model3.json"];
  let model = null;
  try {
    model = await readJson(outfit.model);
  } catch {
    // reported below
  }
  const refs = model?.FileReferences;
  if (!refs) return [...problems, `model ${outfit.model} does not load`];

  const expressions = new Set((refs.Expressions ?? []).map((e) => e.Name));
  // Shared moods plus the outfit's own (outfits.<name>.expressions.moods).
  const moods = { ...rig.expressions?.moods, ...outfit.expressions?.moods };
  for (const [mood, exprs] of Object.entries(moods)) {
    if (!Array.isArray(exprs)) {
      problems.push(`moods.${mood} must be a list of expressions`);
      continue;
    }
    for (const e of exprs) if (!expressions.has(e)) problems.push(`moods.${mood}: unknown expression ${e}`);
  }

  // A pose needs its hold and return clips (live2dRig.js playPose).
  const motions = refs.Motions ?? {};
  for (const [reaction, value] of Object.entries(rig.reactionPoses ?? {})) {
    const groups = value?.byTier ? Object.values(value.byTier) : [value];
    for (const group of new Set(groups)) {
      for (const g of [group, `${group}_hold`, `${group}_return`]) {
        if (!motions[g]) problems.push(`reactionPoses.${reaction}: no motion group ${g}`);
      }
    }
  }

  if (mocIds && refs.Moc) {
    const ids = await mocIds(join(dirname(outfit.model), refs.Moc));
    for (const [id, drawables] of Object.entries(parts)) {
      if (!Array.isArray(drawables)) continue; // hotspotProblems reports it
      for (const d of drawables) if (!ids.has(d)) problems.push(`parts.${id}: unknown drawable ${d}`);
    }
  }
  return problems;
}

// /meet's variant roll (encounters.js getImageVariant) picks the outfit
// whose dialogueVariant matches (docs/hangout-activity.md §11.5).
const DIALOGUE_VARIANTS = ["uniform", "casual"];

function variantProblems(outfit) {
  return DIALOGUE_VARIANTS.includes(outfit.dialogueVariant)
    ? []
    : [`dialogueVariant must be one of ${DIALOGUE_VARIANTS.join(", ")}`];
}

// `spots` (optional): background files the outfit is worn only at, through
// the roll there; `always: true` makes it worn every time at them
// (meetActivity.js pickOutfit). The default outfit is the fallback everywhere
// else, so it can't be spot-bound.
function spotsProblems(rig, name) {
  const { spots, always } = rig.outfits[name];
  if (always != null && always !== true) return ["`always` must be true or left out"];
  if (always && spots == null) return ["`always` needs `spots`"];
  if (spots == null) return [];
  if (!Array.isArray(spots) || !spots.length || !spots.every((f) => typeof f === "string" && f.endsWith(".png"))) {
    return ["`spots` must list background .png files"];
  }
  return name === rig.defaultOutfit ? ["the default outfit can't have `spots`"] : [];
}

// `dateOnly` / `galaOnly` (optional): the outfit is worn only on dates or
// Gala night, never on /meet (meetActivity.js pickOutfit). The default
// outfit is everyone's fallback, so it can't be either, and an outfit is one
// occasion's: not both, and not spot-bound.
function onlyProblems(rig, name) {
  const o = rig.outfits[name];
  const problems = [];
  for (const key of ["dateOnly", "galaOnly"]) {
    if (o[key] != null && typeof o[key] !== "boolean") problems.push(`\`${key}\` must be true or false`);
  }
  const only = o.dateOnly === true || o.galaOnly === true;
  if (o.dateOnly === true && o.galaOnly === true) problems.push("an outfit can't be both `dateOnly` and `galaOnly`");
  if (only && o.spots != null) problems.push("a date or Gala outfit can't have `spots`");
  if (only && name === rig.defaultOutfit) problems.push("the default outfit can't be `dateOnly` or `galaOnly`");
  return problems;
}

function partBlushProblems(spec, parts) {
  if (spec == null) return [];
  const problems = [];
  // Unset parts means the ears (live2dRig.js PART_BLUSH).
  const names = spec.parts ?? ["ear_r", "ear_l"];
  if (!Array.isArray(names) || !names.length) problems.push("partBlush.parts must list parts");
  else for (const p of names) if (!parts[p]) problems.push(`partBlush: unknown part ${p}`);
  const c = spec.color;
  if (c != null && !(Array.isArray(c) && c.length === 3 && c.every((v) => typeof v === "number" && v >= 0 && v <= 1))) {
    problems.push("partBlush.color must be 3 numbers between 0 and 1");
  }
  return problems;
}

function hotspotProblems(hotspots, parts) {
  const problems = [];
  for (const [id, spot] of Object.entries(hotspots)) {
    if (!parts[spot?.part]) problems.push(`hotspots.${id}: unknown part ${spot?.part}`);
    const rect = spot?.rect;
    if (rect != null && !(Array.isArray(rect) && rect.length === 4 && rect.every((v) => typeof v === "number" && Number.isFinite(v)))) {
      problems.push(`hotspots.${id}: rect must be 4 numbers`);
    }
  }
  for (const [id, drawables] of Object.entries(parts)) {
    if (!Array.isArray(drawables)) problems.push(`parts.${id} must be a list of drawable ids`);
  }
  return problems;
}

// --- warnings ---------------------------------------------------------------

// Touch reactions pick their face off the ladder (reactions.js
// resolveReaction), so a missing rung quietly shows "default".
function ladderWarnings(rig) {
  const moods = rig.expressions?.moods ?? {};
  const missing = new Set();
  for (const tier of DIALOGUE_TIERS) {
    for (const rank of RANKS) {
      const face = rankFace(rig.character, tier, rank);
      if (face && !moods[face]) missing.add(face);
    }
  }
  return [...missing].map((face) => `expressions.moods: no ${face} (the expression ladder picks it; shows default)`);
}

// --- paths ------------------------------------------------------------------

function dirname(p) {
  const i = p.lastIndexOf("/");
  return i < 0 ? "" : p.slice(0, i);
}

// Joins and collapses "." / "dir/.." segments, keeping leading ".." (paths
// may climb out of the rig folder, like ../../bg/...).
function join(...segments) {
  const out = [];
  for (const s of segments.join("/").split("/")) {
    if (!s || s === ".") continue;
    if (s === ".." && out.length && out[out.length - 1] !== "..") out.pop();
    else out.push(s);
  }
  return out.join("/");
}
