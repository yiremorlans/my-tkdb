// The expression ladder: which portrait face a character shows at each
// dialogue tier for each response rank (docs/public-encounters.md §17.4.1).
// Call scenes pick their faces from it (constants/publicEncounters.js
// sceneFace), and the Hangout Activity's touch reactions draw from the same
// rungs (activity/src/hangout/reactions.js), so a character reacts with the
// same faces in both. No imports, so the browser side can load it.

// register -> base affinityByResponse rank (2 fave, 1 like, 0 flat) -> face.
// §17.4.1. Faces are derived, never authored, so a scene carries no face data.
// The same rank picks the click's reaction line (constants/reactions.js), so
// face and reaction always agree. `swap` never applies to a scene.
export const SCENE_FACES = {
  new: { 2: "close", 1: "sweat", 0: "annoyed" },
  known: { 2: "close", 1: "sweat", 0: "annoyed" },
  warm: { 2: "surprise_blush", 1: "surprise", 0: "serious" },
  spark: { 2: "blush", 1: "surprise_blush", 0: "close" },
  close: { 2: "full_smile_blush", 1: "full_smile", 0: "smile" },
  bound: { 2: "full_smile_blush", 1: "full_smile", 0: "smile" },
};

// Per-character slots that replace the table's face outright, keyed like it
// (register -> rank). Sparse: an unlisted slot keeps the table's face. Files
// are named for the drawing, never for the response type.
const BLUSH_FAVE = { warm: { 2: "blush" } };
const SCENE_FACE_OVERRIDES = {
  alan: { new: { 0: "serious" }, known: { 0: "serious" }, spark: { 2: "smile_blush" } },
  edward: { new: { 0: "serious" }, known: { 0: "serious" }, ...BLUSH_FAVE, spark: { 2: "smile_blush" } },
  haku: { new: { 0: "serious" }, known: { 0: "serious" }, ...BLUSH_FAVE },
  benkei: { warm: { 0: "surprise" } },
  rui: { known: { 2: "wink", 1: "smile" }, ...BLUSH_FAVE },
  kaito: { warm: { 2: "blush" }, spark: { 2: "lovestruck" } },
  haru: BLUSH_FAVE,
  jo: { warm: { 2: "wink" } },
  leo: { warm: { 2: "wink" } },
  lucas: BLUSH_FAVE,
  mio: BLUSH_FAVE,
  shohei: BLUSH_FAVE,
  subaru: BLUSH_FAVE,
  towa: BLUSH_FAVE,
  zenji: BLUSH_FAVE,
};

/**
 * The face (a file name in assets/expressions/<id>/, no extension) for
 * `rank` at `tier`: the character's override, else the table's.
 */
export function rankFace(characterId, tier, rank) {
  return SCENE_FACE_OVERRIDES[characterId]?.[tier]?.[rank] ?? SCENE_FACES[tier]?.[rank];
}
