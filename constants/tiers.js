// Relationship level → dialogue tier. No imports, so the browser side (the
// Hangout Activity, activity/src/hangout/reactions.js) can use it too;
// constants/game.js pulls in server-only modules.

// Groups relationship levels into dialogue tiers — see CHARACTERS'
// `dialogue` collections in constants/characters.js. Fewer tiers than levels,
// so several levels share a set of lines. 'known' keeps Acquaintance off the
// guarded first-meeting content, which belongs to Stranger alone; 'spark' is
// the flirtatious beat, and is Close Friend's alone so it can't fire at Friend;
// 'bound' is the romantic tier, and starts at Devoted so it can't fire earlier.
export const DIALOGUE_TIER_BY_LEVEL = {
  Stranger: 'new',
  Acquaintance: 'known',
  Friend: 'warm',
  'Close Friend': 'spark',
  Confidant: 'close',
  Devoted: 'bound',
  Soulbound: 'bound',
};

export function getDialogueTier(levelName) {
  return DIALOGUE_TIER_BY_LEVEL[levelName] || 'new';
}

/** The dialogue tiers, lowest first. */
export const DIALOGUE_TIERS = [...new Set(Object.values(DIALOGUE_TIER_BY_LEVEL))];
