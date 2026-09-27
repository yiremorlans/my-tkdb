// Encounter milestones: the themed "what happened after" moment a /call win
// records (docs/public-encounters.md).
//
// Entry shape. `minTier` gates it to a real relationship depth, so a spark
// milestone can never land for a caller who is still an Acquaintance.
// `bucket` only nudges selection toward the register the public winner line
// used — every tier-eligible entry stays reachable. `label` is the /affinity
// tally row, `afterline` the ephemeral win reply, `hint` the callback in the
// next boosted /roam. Gating is cumulative, so depth adds options rather than
// replacing them.
//
// `hint` is read after the words "picking up after", so it wants to be a noun
// phrase ("that coffee", not "you had coffee").
//
// Files. ./shared.js is the campus-life set and the DEFAULT: a character with
// no file here draws from every entry in it. A character whose life doesn't
// fit campus life gets their own file exporting
//   { milestones: { <id>_<name>: entry, ... }, shared: ["<shared key>", ...] }
// and draws from their own moments plus the shared keys they list, nothing
// else. Prefix their keys with the character id: keys are unique across every
// file, since the tally stores only the key. A pool needs at least one
// `minTier: "new"` entry or a Stranger has nothing to draw.

import { pickRandom } from "../random.js";
import shared from "./shared.js";
import benkei from "./benkei.js";
import jin from "./jin.js";

const CHARACTER_MILESTONES = { benkei, jin };

// new < known < warm < spark < close < bound
const TIER_RANK = { new: 0, known: 1, warm: 2, spark: 3, close: 4, bound: 5 };

// Every milestone by key, for lookups (getMilestone, /affinity, bond scenes).
export const ENCOUNTER_MILESTONES = { ...shared };

// Which keys each character with a file can collect.
const MILESTONE_POOLS = {};

for (const [characterId, { milestones, shared: keep }] of Object.entries(
  CHARACTER_MILESTONES,
)) {
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
  MILESTONE_POOLS[characterId] = [...Object.keys(milestones), ...keep];
}

const DEFAULT_MILESTONE_POOL = Object.keys(shared);

export function milestonePoolFor(characterId) {
  return MILESTONE_POOLS[characterId] ?? DEFAULT_MILESTONE_POOL;
}

// `tier` is the winner's REAL dialogue tier (getDialogueTier), not the
// collapsed WINNER_LINE_TIER bucket — the bucket is passed separately and only
// biases the draw. `characterId` picks the pool (see milestonePoolFor).
// Returns a key of ENCOUNTER_MILESTONES.
export function pickMilestone(tier, winnerBucket, characterId = null) {
  const rank = TIER_RANK[tier] ?? 0;
  const eligible = milestonePoolFor(characterId).filter(
    (id) => TIER_RANK[ENCOUNTER_MILESTONES[id].minTier] <= rank,
  );
  // Unreachable while every pool has a `minTier: "new"` entry.
  if (eligible.length === 0) return milestonePoolFor(characterId)[0];

  const weighted = eligible.flatMap((id) => {
    const { bucket } = ENCOUNTER_MILESTONES[id];
    return bucket === winnerBucket || bucket === "any" ? [id, id] : [id];
  });
  return pickRandom(weighted);
}

export function getMilestone(type) {
  return ENCOUNTER_MILESTONES[type] || null;
}
