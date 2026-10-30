// Hangout v2 rig.json validation: the Live2D counterpart of skeleton.js
// validateRig. The rig format is documented at the top of live2dRig.js.
// File access is injected, so the same checks run in the Node tests
// (test/hangout-v2-rig.test.js, against the files on disk) and in the
// browser (live2dRig.js loadLive2DRig, over fetch). No moc3 parsing here:
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
export async function validateLive2DRig(rig, { readJson, fileExists = () => true, mocIds } = {}) {
  if (!rig || typeof rig !== "object") throw new Error("rig.json: not an object");
  const problems = [...layoutProblems(rig), ...motionProblems(rig.motion)];

  for (const file of [rig.background, ...Object.values(rig.sounds ?? {}).flat()]) {
    if (file != null && !(await fileExists(file))) problems.push(`missing file ${file}`);
  }

  const reactions = new Set([...Object.keys(DEFAULT_REACTIONS), ...Object.keys(rig.reactions ?? {})]);
  for (const name of Object.keys(rig.reactionPoses ?? {})) {
    if (!reactions.has(name)) problems.push(`reactionPoses.${name}: unknown reaction`);
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
  return problems;
}

// --- one outfit -------------------------------------------------------------

async function outfitProblems(rig, name, { readJson, mocIds }) {
  const outfit = rig.outfits[name] ?? {};
  const parts = { ...rig.parts, ...outfit.parts };
  const hotspots = { ...rig.hotspots, ...outfit.hotspots };
  const problems = [...hotspotProblems(hotspots, parts), ...variantProblems(outfit)];

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
  for (const [mood, exprs] of Object.entries(rig.expressions?.moods ?? {})) {
    if (!Array.isArray(exprs)) {
      problems.push(`moods.${mood} must be a list of expressions`);
      continue;
    }
    for (const e of exprs) if (!expressions.has(e)) problems.push(`moods.${mood}: unknown expression ${e}`);
  }

  // A pose needs its hold and return clips (live2dRig.js playPose).
  const motions = refs.Motions ?? {};
  for (const [reaction, group] of Object.entries(rig.reactionPoses ?? {})) {
    for (const g of [group, `${group}_hold`, `${group}_return`]) {
      if (!motions[g]) problems.push(`reactionPoses.${reaction}: no motion group ${g}`);
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
