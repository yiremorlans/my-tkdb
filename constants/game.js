import { RESPONSE_TYPES } from './characters.js';

// How many characters /meet offers the user to pick from.
export const MEET_OPTION_COUNT = 4;

// Maximum length for button labels (response and approach labels).
// Discord's native limit is 80 chars, but mobile clients truncate at ~30 chars
// for readability. Keep all labels at or under this to ensure they display
// fully on all devices without truncation.
export const MAX_BUTTON_LABEL_LENGTH = 30;

// Discord button styles: PRIMARY 1, SECONDARY 2, SUCCESS 3, DANGER 4.
export const RESPONSE_STYLES = {
  [RESPONSE_TYPES.KIND]: 3,
  [RESPONSE_TYPES.PLAYFUL]: 1,
  [RESPONSE_TYPES.BOLD]: 4,
  [RESPONSE_TYPES.NEUTRAL]: 2,
};

// The order response buttons are shown in.
export const RESPONSE_TYPE_ORDER = [
  RESPONSE_TYPES.KIND,
  RESPONSE_TYPES.PLAYFUL,
  RESPONSE_TYPES.BOLD,
  RESPONSE_TYPES.NEUTRAL,
];

// A collection of button phrasings per response type — one is picked at
// random each time an encounter is built, so the same 4 buttons don't
// always read identically. Add more phrasings here any time.
export const RESPONSE_OPTION_POOL = {
  [RESPONSE_TYPES.KIND]: [
    { label: 'Offer a kind word', emoji: '💛' },
    { label: 'Give a warm smile', emoji: '💛' },
    { label: 'Compliment them', emoji: '💛' },
  ],
  [RESPONSE_TYPES.PLAYFUL]: [
    { label: 'Tease them lightly', emoji: '😄' },
    { label: 'Crack a joke', emoji: '😄' },
    { label: 'Wink playfully', emoji: '😄' },
  ],
  [RESPONSE_TYPES.BOLD]: [
    { label: 'Flirt boldly', emoji: '🔥' },
    { label: 'Make a daring move', emoji: '🔥' },
    { label: 'Challenge them directly', emoji: '🔥' },
  ],
  [RESPONSE_TYPES.NEUTRAL]: [
    { label: 'Stay quiet', emoji: '😐' },
    { label: 'Give a neutral nod', emoji: '😐' },
    { label: 'Change the subject', emoji: '😐' },
  ],
};

// Relationships grow slowly (0-2 points per response, always 0 for a
// NEUTRAL response), so the level curve is spread out over a long time —
// meant to be built up over many, many encounters.
//
// `emoji` trails the level name in text; `heart` is the /affinity progress
// bar's filled cell; `color` tints the embed's left strip. `heart` and `color`
// track the level's tone — Stranger has no name emoji but still gets a purple
// heart and a matching strip so its bar reads in color like the rest.
export const RELATIONSHIP_LEVELS = [
  { name: 'Stranger', min: 0, emoji: '', heart: '💜', color: 0xa855f7 },
  { name: 'Acquaintance', min: 20, emoji: '🧡', heart: '🧡', color: 0xf4900c },
  { name: 'Friend', min: 50, emoji: '🩷', heart: '🩷', color: 0xf7a8c4 },
  { name: 'Close Friend', min: 100, emoji: '💖', heart: '💖', color: 0xff6fb5 },
  { name: 'Confidant', min: 175, emoji: '💕', heart: '💕', color: 0xff4fa3 },
  { name: 'Devoted', min: 275, emoji: '❤️', heart: '❤️', color: 0xed4245 },
  { name: 'Soulbound', min: 400, emoji: '❤️‍🔥', heart: '❤️‍🔥', color: 0xd22730 },
];

export function getRelationshipLevel(affinity) {
  let current = RELATIONSHIP_LEVELS[0];
  for (const level of RELATIONSHIP_LEVELS) {
    if (affinity >= level.min) current = level;
  }
  return current;
}

// The /affinity bar is built from colored heart emoji — no ```ansi code block,
// so no grey <pre> box: it sits inline in the embed description and wraps
// naturally on any screen.
//
// 10 cells is the sweet spot. The tightest band is Stranger (0..20), so each
// cell is worth 2 affinity points there — the smallest step a single response
// can add — which means every 2-point gain advances the bar by exactly one
// heart. More cells would show finer moves but a row of ~11+ emoji starts
// wrapping on narrow mobile; fewer would hide 2-point gains.
export const HEART_BAR_SEGMENTS = 10;

// The unfilled cell, shared by every level.
export const HEART_BAR_TRACK = '🤍';

// Progress from the current relationship level toward the next one, as a 0..1
// ratio — enough to draw a bar without ever exposing raw affinity points.
// At the top level there is no next level, so `nextLevel` is null and the
// ratio is a full 1.
export function getRelationshipProgress(affinity) {
  const value = Number.isFinite(affinity) ? affinity : 0;
  const level = getRelationshipLevel(value);
  const index = RELATIONSHIP_LEVELS.findIndex((l) => l.name === level.name);
  const nextLevel = RELATIONSHIP_LEVELS[index + 1] || null;

  if (!nextLevel) return { level, nextLevel: null, ratio: 1 };

  const span = nextLevel.min - level.min;
  const ratio = span > 0 ? (value - level.min) / span : 0;
  return { level, nextLevel, ratio: Math.max(0, Math.min(1, ratio)) };
}

// A heart bar like "💖💖💖💖🤍🤍🤍🤍🤍🤍": `fillHeart` for progress, 🤍 for the
// rest. `filled` uses floor, so a full bar of `fillHeart` only ever means the
// next level has actually been reached, never "almost".
export function renderHeartBar(ratio, fillHeart, segments = HEART_BAR_SEGMENTS) {
  const clamped = Math.max(0, Math.min(1, Number.isFinite(ratio) ? ratio : 0));
  const filled = Math.floor(clamped * segments);
  return fillHeart.repeat(filled) + HEART_BAR_TRACK.repeat(segments - filled);
}

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
