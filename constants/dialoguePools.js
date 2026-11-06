// The interaction-specific dialogue pools: one folder per pool under
// constants/ (constants/meet/, constants/roam/), one file per character,
// keyed by tier. Callers name a pool by DIALOGUE_POOL, never a bare string.
//
// Adding a pool (a future 'date' pool, say): add it to DIALOGUE_POOL and
// DIALOGUE_POOL_CONFIG, create constants/<key>/ with an index.js, register it
// in POOL_DIALOGUE (constants/dialogue.js), and give it targets in
// constants/game.js. The draw and validateContent read the config below and
// need no other change.
//
// No imports: constants/game.js and constants/characters.js both read this.
export const DIALOGUE_POOL = Object.freeze({
  MEET: "meet",
  ROAM: "roam",
});

// Per pool:
//   scene     — true when the interaction renders the full scene (approach
//               button, then greeting), so each beat owes { approach,
//               greeting }. False when it shows only the line and responses,
//               so a beat carrying either would be written and never seen.
//   splitsShared — true for the pools that the shared `dialogue` pool is
//               split into (the tier-split skill). A tier it lacks draws the
//               shared pool instead, and validateContent requires every
//               splitsShared pool to split a tier together, then the shared
//               tier to be deleted. False for a standalone pool (like a
//               future 'date'): it only draws its own beats, with no fallback.
export const DIALOGUE_POOL_CONFIG = Object.freeze({
  [DIALOGUE_POOL.MEET]: { scene: false, splitsShared: true },
  [DIALOGUE_POOL.ROAM]: { scene: true, splitsShared: true },
});

export const DIALOGUE_POOL_KEYS = Object.values(DIALOGUE_POOL);
export const SHARED_SPLIT_POOLS = DIALOGUE_POOL_KEYS.filter(
  (key) => DIALOGUE_POOL_CONFIG[key].splitsShared,
);
