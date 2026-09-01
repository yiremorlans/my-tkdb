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

// Discord renders only a small foreground palette inside ```ansi code blocks.
// These are the codes we lean on for the /affinity bar — no true orange exists,
// so Acquaintance borrows yellow.
export const ANSI_COLORS = { gray: 30, red: 31, yellow: 33, pink: 35, white: 37 };

// Relationships grow slowly (0-2 points per response, always 0 for a
// NEUTRAL response), so the level curve is spread out over a long time —
// meant to be built up over many, many encounters.
//
// `color` tints the embed's left strip; `ansi` colors the filled part of the
// /affinity progress bar. Both track the level's heart emoji — Stranger has no
// emoji and stays white.
export const RELATIONSHIP_LEVELS = [
  { name: 'Stranger', min: 0, emoji: '', color: 0xe6e7e8, ansi: ANSI_COLORS.white },
  { name: 'Acquaintance', min: 20, emoji: '🧡', color: 0xf4900c, ansi: ANSI_COLORS.yellow },
  { name: 'Friend', min: 50, emoji: '🩷', color: 0xf7a8c4, ansi: ANSI_COLORS.pink },
  { name: 'Close Friend', min: 100, emoji: '💖', color: 0xff6fb5, ansi: ANSI_COLORS.pink },
  { name: 'Confidant', min: 175, emoji: '💕', color: 0xff4fa3, ansi: ANSI_COLORS.pink },
  { name: 'Devoted', min: 275, emoji: '❤️', color: 0xed4245, ansi: ANSI_COLORS.red },
  { name: 'Soulbound', min: 400, emoji: '❤️‍🔥', color: 0xd22730, ansi: ANSI_COLORS.red },
];

export function getRelationshipLevel(affinity) {
  let current = RELATIONSHIP_LEVELS[0];
  for (const level of RELATIONSHIP_LEVELS) {
    if (affinity >= level.min) current = level;
  }
  return current;
}

// How many segments the /affinity progress bar is drawn with.
export const PROGRESS_BAR_SEGMENTS = 10;

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

// A text progress bar like "██████░░░░". `filled` uses floor so a full bar
// only ever means the next level has actually been reached, never "almost".
export function renderProgressBar(ratio, segments = PROGRESS_BAR_SEGMENTS) {
  const clamped = Math.max(0, Math.min(1, Number.isFinite(ratio) ? ratio : 0));
  const filled = Math.floor(clamped * segments);
  return '█'.repeat(filled) + '░'.repeat(segments - filled);
}

// The same bar wrapped in a Discord ```ansi code block so the filled segments
// carry the level's color; the empty segments stay gray. `ansiColor` is one of
// ANSI_COLORS. Returns the full fenced block, ready to drop into a description.
export function renderAnsiProgressBar(ratio, ansiColor, segments = PROGRESS_BAR_SEGMENTS) {
  const clamped = Math.max(0, Math.min(1, Number.isFinite(ratio) ? ratio : 0));
  const filled = Math.floor(clamped * segments);
  const color = Number.isFinite(ansiColor) ? ansiColor : ANSI_COLORS.white;
  const fill = `[1;${color}m${'█'.repeat(filled)}[0m`;
  const rest = `[1;${ANSI_COLORS.gray}m${'░'.repeat(segments - filled)}[0m`;
  return `\`\`\`ansi\n${fill}${rest}\n\`\`\``;
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
