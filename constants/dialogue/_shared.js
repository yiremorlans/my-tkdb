// Authored content for every character, keyed by the ids in
// constants/characters.js. Kept separate from the character records so dialogue
// can grow — many lines per tier — without bloating character configuration,
// which is close to static by comparison.
//
// Each tier is a collection; one line is picked at random per encounter (see
// getRandomDialogueLine). `dialogue` tiers are normally string arrays, but may
// instead be keyed by image variant where a character's lines differ by outfit
// (Jo's pronouns change between uniform and casual).
//
// `approach` holds the label for the single button on the /roam narration
// message — the "Step forward" beat before the character is actually drawn. It
// is tiered like the dialogue so the invitation matches the scene the narration
// just set. A character omitted here falls back to the generic
// APPROACH_LABEL_FALLBACK in constants/characters.js.
//
// `responses` holds the button labels offered to the player. Only two tiers are
// stored: "close" and everything before it. Each slot is a collection, picked
// from at random like the dialogue, so a character the player sees often does
// not always get the same four buttons. A character omitted here, or missing
// a response type, falls back to archetype defaults in constants/characters.js —
// constants/validateContent.js reports any such gap at startup.
//
// Conditional pools (all optional, all per character):
//   `dialogueWhen`   → adds narration lines   (merged into `dialogue`)
//   `approachWhen`   → adds step-forward labels (merged into `approach`)
//   `responsesWhen`  → adds response-button labels (merged into `responses`,
//                      so its inner shape is { kind|playful|bold|neutral: { tier: [...] } })
// Each is a list of `{ when, <pool> }` blocks. Every field in `when` (time /
// location / background / event — see DIALOGUE_WHEN_DIMENSIONS in characters.js)
// is optional and ANDed; scalar or array. A matching block's lines are *added*
// to the base pool for that pick — never replace it. `SHARED_DIALOGUE_WHEN` and
// `SHARED_APPROACH_WHEN` are the same shape but apply to every character
// (roster-wide event greetings, generic scene flavor). There is no shared
// responses layer — a bespoke choice is always character-specific.

export const SHARED_DIALOGUE_WHEN = [
  // Whole-roster evening flavor for the general-location PM scenes, where an
  // encounter can be with anyone and most characters have no evening lines of
  // their own. Character-specific `dialogueWhen` blocks stack on top of this.
  {
    when: { time: "evening", location: ["Darkwick", "Galaxy Express", "Clementia"] },
    dialogue: {
      new: [
        "The path lamps have come on. Whoever's still out here, it's just the two of you now.",
        "Campus has gone quiet and low-lit. Footsteps carry further than they did at noon.",
      ],
      known: [
        "You fall into step together without discussing it. The lamps mark the way back.",
      ],
    },
  },
  // Event blocks (e.g. `when: { event: "star_festival" }`) slot in here once an
  // event system sets `ctx.event`. `Star_Festival` already works as a `location`.
];

export const SHARED_APPROACH_WHEN = [
  {
    when: { time: "evening", location: ["Darkwick", "Galaxy Express", "Clementia"] },
    approach: {
      new: ["Head in out of the dark", "Fall into step with them"],
    },
  },
];
