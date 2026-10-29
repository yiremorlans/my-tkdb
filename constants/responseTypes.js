// The /roam response types and the order their buttons are shown in. No
// imports, so the browser side (the Hangout Activity's preview) can use it
// too; constants/characters.js and constants/game.js re-export these.

export const RESPONSE_TYPES = {
  KIND: "kind",
  PLAYFUL: "playful",
  BOLD: "bold",
  NEUTRAL: "neutral",
};

// The order response buttons are shown in.
export const RESPONSE_TYPE_ORDER = [
  RESPONSE_TYPES.KIND,
  RESPONSE_TYPES.PLAYFUL,
  RESPONSE_TYPES.BOLD,
  RESPONSE_TYPES.NEUTRAL,
];
