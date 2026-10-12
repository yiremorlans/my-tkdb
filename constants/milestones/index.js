// Encounter milestones: the themed "what happened after" moment a /call win
// records (docs/public-encounters.md).
//
// Entry shape. `tier` is the one relationship depth it is drawn at, so a spark
// milestone can never land for a caller who is still an Acquaintance.
// `bucket` only nudges selection toward the register the public winner line
// used. `label` is the /affinity tally row, `afterline` the ephemeral win
// reply, `hint` the callback in the next boosted /roam. A win draws from its
// own tier only (see pickMilestone), so earlier moments stay in the tally but
// stop being collected once the relationship moves past them.
//
// `hint` is read after the words "picking up after", so it wants to be a noun
// phrase ("that coffee", not "you had coffee"). It is also bond scenes'
// {lastMoment}, written in the character's own texts ("My head was on
// {lastMoment}."), so it has to read in both voices: never refer to the
// character in the third person ("that jacket", not "his jacket"). "you" is
// safe, since the narrator and the character both address the player.
//
// Files. ./shared.js is the campus-life set and the DEFAULT: a character with
// no file here draws from every entry in it. A character whose life doesn't
// fit campus life gets their own file exporting
//   { milestones: { <id>_<name>: entry, ... }, shared: ["<shared key>", ...] }
// and draws from their own moments plus the shared keys they list, nothing
// else. Prefix their keys with the character id: keys are unique across every
// file, since the tally stores only the key. A pool needs at least one
// `tier: "new"` entry or a Stranger has nothing to draw.
//
// A set can belong to a whole house instead: ./mortkranken.js is shared by
// Yuri and Jiro, its keys prefixed with the house, and every entry written to
// fit either of them. ./tea.js is the same idea for a habit rather than a
// house: Subaru, Haku and Tohma swap the coffee break for tea at {house}.

import { pickRandom } from "../random.js";
import shared from "./shared.js";
import benkei from "./benkei.js";
import edward from "./edward.js";
import elias from "./elias.js";
import haru from "./haru.js";
import jin from "./jin.js";
import mortkranken from "./mortkranken.js";
import rui from "./rui.js";
import shion from "./shion.js";
import shohei from "./shohei.js";
import tea from "./tea.js";
import towa from "./towa.js";
import zenji from "./zenji.js";

const CHARACTER_MILESTONES = {
  benkei,
  edward,
  elias,
  haku: tea,
  haru,
  jin,
  jiro: mortkranken,
  rui,
  shion,
  shohei,
  subaru: tea,
  tohma: tea,
  towa,
  yuri: mortkranken,
  zenji,
};

// new < known < warm < spark < close < bound
const TIER_RANK = { new: 0, known: 1, warm: 2, spark: 3, close: 4, bound: 5 };

// Every milestone by key, for lookups (getMilestone, /affinity, bond scenes).
export const ENCOUNTER_MILESTONES = { ...shared };

// Which keys each character with a file can collect.
const MILESTONE_POOLS = {};

// A house set is registered once, however many characters draw from it.
const registered = new Set();

for (const [characterId, set] of Object.entries(CHARACTER_MILESTONES)) {
  const { milestones, shared: keep } = set;
  MILESTONE_POOLS[characterId] = [...Object.keys(milestones), ...keep];
  if (registered.has(set)) continue;
  registered.add(set);

  for (const key of Object.keys(milestones)) {
    if (ENCOUNTER_MILESTONES[key]) {
      throw new Error(`Duplicate milestone key "${key}" in ${characterId}.js`);
    }
    ENCOUNTER_MILESTONES[key] = milestones[key];
  }
  for (const key of keep) {
    if (!shared[key]) {
      throw new Error(`${characterId}.js keeps unknown shared milestone "${key}"`);
    }
  }
}

const DEFAULT_MILESTONE_POOL = Object.keys(shared);

export function milestonePoolFor(characterId) {
  return MILESTONE_POOLS[characterId] ?? DEFAULT_MILESTONE_POOL;
}

// `tier` is the winner's REAL dialogue tier (getDialogueTier), not the
// collapsed WINNER_LINE_TIER bucket — the bucket is passed separately and only
// biases the draw. `characterId` picks the pool (see milestonePoolFor).
// The draw is from the caller's own tier: a Close Friend win collects a Close
// Friend moment, so the Confidant bond scene's {lastMoment} reads at the depth
// it was written for. A tier with nothing in this pool falls back to the
// nearest tier below that has something.
// Returns a key of ENCOUNTER_MILESTONES.
export function pickMilestone(tier, winnerBucket, characterId = null) {
  const pool = milestonePoolFor(characterId);
  let eligible = [];
  for (let rank = TIER_RANK[tier] ?? 0; rank >= 0 && eligible.length === 0; rank--) {
    eligible = pool.filter((id) => TIER_RANK[ENCOUNTER_MILESTONES[id].tier] === rank);
  }
  // Unreachable while every pool has a `tier: "new"` entry.
  if (eligible.length === 0) return pool[0];

  const weighted = eligible.flatMap((id) => {
    const { bucket } = ENCOUNTER_MILESTONES[id];
    return bucket === winnerBucket || bucket === "any" ? [id, id] : [id];
  });
  return pickRandom(weighted);
}

export function getMilestone(type) {
  return ENCOUNTER_MILESTONES[type] || null;
}

// Every milestone key written for `tier`, across all pools. Keys are unique
// across files, so this needs no character to be unambiguous.
export function milestoneKeysAtTier(tier) {
  return Object.keys(ENCOUNTER_MILESTONES).filter((id) => ENCOUNTER_MILESTONES[id].tier === tier);
}
