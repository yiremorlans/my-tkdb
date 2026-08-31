import { RESPONSE_TYPES } from './characters.js';

// How many characters /meet offers the user to pick from.
export const MEET_OPTION_COUNT = 4;

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
export const RELATIONSHIP_LEVELS = [
  { name: 'Stranger', min: 0, emoji: '' },
  { name: 'Acquaintance', min: 20, emoji: '🧡' },
  { name: 'Friend', min: 50, emoji: '🩷' },
  { name: 'Close Friend', min: 100, emoji: '💖' },
  { name: 'Confidant', min: 175, emoji: '💕' },
  { name: 'Devoted', min: 275, emoji: '❤️' },
  { name: 'Soulbound', min: 400, emoji: '❤️‍🔥' },
];

export function getRelationshipLevel(affinity) {
  let current = RELATIONSHIP_LEVELS[0];
  for (const level of RELATIONSHIP_LEVELS) {
    if (affinity >= level.min) current = level;
  }
  return current;
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
