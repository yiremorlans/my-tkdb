// Hangout rig.json validation (validateLive2DRig). The rig format is documented at the top of live2dRig.js.
// File access is injected, so the same checks run in the Node tests
// (test/hangout-rig.test.js, against the files on disk) and in the
// dev server (live2dRig.js loadLive2DRig, over fetch; a build skips it). No moc3 parsing here:
// drawable ids are only checked when the caller can look them up.

import { DEFAULT_REACTIONS, forTier } from "./reactions.js";
import { DIALOGUE_TIERS } from "../../../constants/tiers.js";

/**
 * Checks `rig` and the files it names. Throws one Error listing every
 * problem; otherwise resolves to a list of warnings (moods a reaction names
 * that the rig lacks, which show "default" instead).
 *
 * Paths handed to the callbacks are relative to the rig's folder (model
 * files resolved against their model3.json), e.g. "../../bg/x.png".
 * - readJson(path): the parsed file (sync or async); null or a throw if it
 *   doesn't load
 * - fileExists(path): whether the file is there (sync or async)
 * - mocIds(path): a `{ has(id) }` lookup of the .moc3's drawable ids, or
 *   omitted to skip that check (the browser has no cheap way to list them).
 *   It also answers part and parameter ids (they sit in the .moc3 the same
 *   way), which the removable articles' check uses
 * - lines: the character's Hangout lines (constants/hangout/<id>.js), or
 *   omitted to skip checking that each article's pools exist
 */
const POSE_ONLY_KEYS = new Set(["guarded", "caughtTease"]);

export async function validateLive2DRig(rig, { readJson, fileExists = () => true, mocIds, lines } = {}) {
  if (!rig || typeof rig !== "object") throw new Error("rig.json: not an object");
  const problems = [...layoutProblems(rig), ...motionProblems(rig.motion)];

  for (const file of [rig.background, ...Object.values(rig.sounds ?? {}).flat()]) {
    if (file != null && !(await fileExists(file))) problems.push(`missing file ${file}`);
  }

  // An article's removal is a reaction too (hatOff); its touch borrows the
  // covered spot's pose, so it has no pose key of its own.
  const articleNames = new Set(Object.values(rig.outfits ?? {}).flatMap((o) => Object.keys(o?.articles ?? {})));
  const reactions = new Set([...Object.keys(DEFAULT_REACTIONS), ...Object.keys(rig.reactions ?? {}), ...[...articleNames].map((a) => `${a}Off`)]);
  const poseKeys = [rig.reactionPoses, ...Object.values(rig.outfits ?? {}).map((o) => o.reactionPoses)];
  for (const [name, value] of poseKeys.flatMap((p) => Object.entries(p ?? {}))) {
    // Two pose keys aren't reactions: `guarded` (the lockout pose) and
    // `caughtTease` (the preview's caught tease at close: he stops your hand).
    if (!reactions.has(name) && !POSE_ONLY_KEYS.has(name)) problems.push(`reactionPoses.${name}: unknown reaction`);
    for (const tier of Object.keys(value?.byTier ?? {})) {
      if (!DIALOGUE_TIERS.includes(tier)) problems.push(`reactionPoses.${name}: unknown tier ${tier}`);
    }
  }
  // Reactions name their mood. `rank` (the old call-scene face ladder) was
  // removed on 2026-11-04; a leftover one would quietly play nothing.
  for (const [name, value] of Object.entries(rig.reactions ?? {})) {
    const entries = value?.byTier ? Object.entries(value.byTier) : [[null, value]];
    for (const [tier, entry] of entries) {
      if (entry && "rank" in entry) problems.push(`reactions.${name}${tier ? `.${tier}` : ""}: rank is gone; name a mood`);
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
    perOutfit.set(name, await outfitProblems(rig, name, { readJson, mocIds, lines }));
  }
  const everywhere = names.length > 1
    ? new Set([...perOutfit.values()].reduce((a, b) => a.filter((p) => b.includes(p))))
    : new Set();
  problems.push(...everywhere);
  for (const [name, own] of perOutfit) {
    for (const p of own) if (!everywhere.has(p)) problems.push(`outfits.${name}: ${p}`);
  }

  if (problems.length) throw new Error(`rig.json:\n  ${problems.join("\n  ")}`);
  return reactionMoodWarnings(rig);
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

async function outfitProblems(rig, name, { readJson, mocIds, lines }) {
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
  const poses = { ...rig.reactionPoses, ...outfit.reactionPoses };
  for (const [reaction, value] of Object.entries(poses)) {
    const groups = value?.byTier ? Object.values(value.byTier) : [value];
    for (const group of new Set(groups)) {
      for (const g of [group, `${group}_hold`, `${group}_return`]) {
        if (!motions[g]) problems.push(`reactionPoses.${reaction}: no motion group ${g}`);
      }
    }
  }

  const ids = mocIds && refs.Moc ? await mocIds(join(dirname(outfit.model), refs.Moc)) : null;
  problems.push(...articleProblems(outfit.articles, { hotspots, parts, ids, lines }));
  for (const [name, a] of Object.entries(outfit.articles ?? {})) {
    if (a?.offPose == null) continue;
    for (const g of [a.offPose, `${a.offPose}_hold`, `${a.offPose}_return`]) {
      if (!motions[g]) problems.push(`articles.${name}.offPose: no motion group ${g}`);
    }
  }
  if (ids) {
    for (const [id, drawables] of Object.entries(parts)) {
      if (!Array.isArray(drawables)) continue; // hotspotProblems reports it
      for (const d of drawables) if (!ids.has(d)) problems.push(`parts.${id}: unknown drawable ${d}`);
    }
  }
  return problems;
}

// Removable articles (articles.js): each names art the outfit's model has,
// a touch spot it covers, and any article it waits on; with `lines`, its
// pools exist: `<article>Pat` at some tier (unless `pool: false`) and
// `<article>Off` from the unlock tier.
const ARTICLE_KEYS = new Set(["part", "drawables", "params", "rest", "covers", "blocks", "shownOnly", "poses", "requires", "pool", "hit", "hotspots", "tier", "holdThrough", "offPose"]);

function articleProblems(articles, { hotspots, parts, ids, lines }) {
  if (articles == null) return [];
  if (typeof articles !== "object" || Array.isArray(articles)) return ["articles must map article names to their config"];
  const problems = [];
  const names = Object.keys(articles);
  const tiers = (v) => (v?.byTier ? Object.entries(v.byTier) : [[null, v]]);
  for (const [name, a] of Object.entries(articles)) {
    const at = `articles.${name}`;
    if (!/^[a-z][A-Za-z]*$/.test(name)) problems.push(`${at}: name must be camelCase letters (its pools are ${name}Pat, ${name}Off)`);
    if (!a || typeof a !== "object") {
      problems.push(`${at} must be an object`);
      continue;
    }
    for (const key of Object.keys(a)) if (!ARTICLE_KEYS.has(key)) problems.push(`${at}: unknown key ${key}`);
    if (a.part == null && !a.drawables?.length) problems.push(`${at}: needs a part or drawables to hide`);
    if (a.part != null && typeof a.part !== "string") problems.push(`${at}.part must be a part id`);
    else if (a.part && ids && !ids.has(a.part)) problems.push(`${at}: unknown part ${a.part}`);
    if (a.drawables != null && !(Array.isArray(a.drawables) && a.drawables.every((d) => typeof d === "string"))) problems.push(`${at}.drawables must list drawable ids`);
    else for (const d of a.drawables ?? []) if (ids && !ids.has(d)) problems.push(`${at}: unknown drawable ${d}`);
    for (const key of ["params", "rest"]) {
      for (const [tier, params] of tiers(a[key])) {
        if (params == null) continue;
        if (tier && !DIALOGUE_TIERS.includes(tier)) problems.push(`${at}.${key}: unknown tier ${tier}`);
        if (typeof params !== "object" || !Object.values(params).every((v) => typeof v === "number" && Number.isFinite(v))) {
          problems.push(`${at}.${key} must map parameter ids to numbers`);
          continue;
        }
        for (const id of Object.keys(params)) if (ids && !ids.has(id)) problems.push(`${at}.${key}: unknown parameter ${id}`);
      }
    }
    if (a.covers == null) problems.push(`${at}: needs \`covers\`, the touch spot it covers`);
    for (const [tier, spot] of a.covers == null ? [] : tiers(a.covers)) {
      if (tier && !DIALOGUE_TIERS.includes(tier)) problems.push(`${at}.covers: unknown tier ${tier}`);
      if (!hotspots[spot]) problems.push(`${at}.covers: no hotspot ${spot} on this outfit`);
    }
    for (const key of ["blocks", "shownOnly", "pool", "hit", "holdThrough"]) {
      if (a[key] != null && typeof a[key] !== "boolean") problems.push(`${at}.${key} must be true or false`);
    }
    if (a.poses != null) {
      try {
        new RegExp(a.poses);
      } catch {
        problems.push(`${at}.poses must be a regular expression`);
      }
    }
    if (a.requires != null && (!articles[a.requires] || a.requires === name)) problems.push(`${at}.requires: no article ${a.requires}`);
    else if (a.requires != null && names.indexOf(a.requires) > names.indexOf(name)) problems.push(`${at}.requires: list ${a.requires} before ${name}`);
    if (a.tier != null && !DIALOGUE_TIERS.includes(a.tier)) problems.push(`${at}.tier: unknown tier ${a.tier}`);
    for (const [spot, h] of Object.entries(a.hotspots ?? {})) {
      if (!parts[h?.part]) problems.push(`${at}.hotspots.${spot}: unknown part ${h?.part}`);
      const rect = h?.rect;
      if (rect != null && !(Array.isArray(rect) && rect.length === 4 && rect.every((v) => typeof v === "number" && Number.isFinite(v)))) {
        problems.push(`${at}.hotspots.${spot}: rect must be 4 numbers`);
      }
    }
    if (lines) {
      const from = DIALOGUE_TIERS.indexOf(a.tier ?? "warm");
      if (a.pool !== false && !DIALOGUE_TIERS.some((t) => lines[t]?.[`${name}Pat`]?.length)) problems.push(`${at}: no ${name}Pat lines`);
      if (!DIALOGUE_TIERS.slice(0, from + 1).reverse().some((t) => lines[t]?.[`${name}Off`]?.length)) problems.push(`${at}: no ${name}Off lines at ${DIALOGUE_TIERS[from]}`);
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

// Every mood a reaction can play on this rig, at any tier (its own entry or
// the default, then any `then` mood). One the rig lacks quietly shows
// "default" (reactions.js resolveReaction).
function reactionMoodWarnings(rig) {
  const moods = rig.expressions?.moods ?? {};
  const missing = new Map();
  const names = new Set([...Object.keys(DEFAULT_REACTIONS), ...Object.keys(rig.reactions ?? {})]);
  for (const name of names) {
    for (const tier of DIALOGUE_TIERS) {
      const picked = forTier(rig.reactions?.[name] ?? DEFAULT_REACTIONS[name], tier);
      for (const mood of [picked?.mood, picked?.then?.[1]]) {
        if (mood && !moods[mood] && !missing.has(mood)) missing.set(mood, name);
      }
    }
  }
  return [...missing].map(([mood, name]) => `expressions.moods: no ${mood} (${name} plays it; shows default)`);
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
