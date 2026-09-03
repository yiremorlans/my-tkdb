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
// `winnerLines` holds the public /call reveal lines, keyed by the registers in
// WINNER_LINE_BUCKETS (constants/publicEncounters.js) — the six dialogue tiers
// collapsed to five, with "known" folding into "new". A character's own pool
// replaces the shared SHARED_WINNER_LINES pool below rather than merging with
// it, so an authored reveal always sounds like them; a register left out falls
// back. {user} is the winner's mention, {name} their full name, and the reveal
// embed is the only place either is named — validateContent fails the build on
// a line missing one.
//
// One invariant these have that the tiered dialogue doesn't: a milestone
// afterline ("You both slipped off for a quick coffee after") is always
// appended beneath the winner line, so a line must end with the character
// staying with the caller. Leaving their own duty *for* the caller is fine and
// common; leaving the caller contradicts the beat that follows. Milestones are
// character-agnostic and gated only by tier, so don't write a line that
// forecloses one — in particular don't have them dispose of a *report*, which
// the signed_report milestone then has them signing.
//
// And the setting is not the character's own: an encounter spawns only at the
// two general ENCOUNTER_LOCATIONS, so the background could be any of Darkwick's
// corridors, courtyards, streets and classrooms or the Galaxy Express platform.
// A winner line therefore can't name a place, and can't put the character at
// their house's own venue — no lab for Yuri, no garden for Rui, no card table
// for Taiga. Write the crowd and the openness instead ("in full view of
// everyone", "through the crowd", "in the middle of campus"), and keep their
// work portable: what they set down or walk away from can travel, the room it
// belongs in cannot.
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

// --- public encounters (docs/public-encounters.md) --------------------------
//
// The roster-wide half of the /call feature's content. It lives here, with
// every other authored line, rather than beside the encounter helpers: the
// helpers in constants/publicEncounters.js pick from these pools and fill the
// placeholders, and hold no prose of their own.
//
// The teaser and missed pools are keyed by TIME_BUCKETS with an `any` pool
// merged into both, the same shape the `when: { time }` blocks above resolve
// to. Darkness is not a mood the feature owns at every hour — at midday the
// campus is a crush of students between classes and someone is lost in the
// crowd, and only in the evening is the same figure lost to the dark.

// Short by design — the spawn message already spells out how to answer and how
// long there is, so the teaser only has to point.
export const SHARED_ENCOUNTER_TEASERS = {
  any: [
    "Someone you know, up ahead.",
    "That outline's familiar. Call out?",
    "You've seen that walk before.",
    "A figure ahead. Know them?",
    "Someone slows, like they're waiting.",
    "Quick — you could still reach them.",
  ],
  day: [
    "A familiar figure in the between-class crowd.",
    "Someone you know, cutting through the crush.",
    "Half the academy's on this walkway. One you know.",
    "A familiar uniform in the queue ahead.",
    "The platform's packed. One figure isn't a stranger.",
    "Someone breaks off from a knot of students.",
    "A student you recognize, rows of heads away.",
    "Someone familiar, past the noticeboards.",
  ],
  evening: [
    "A silhouette at the edge of the lamplight.",
    "Someone stops past the last path light.",
    "A shape in shadow, end of the corridor.",
    "The walkway's emptied out. One figure left.",
    "A figure at the rail, unlit.",
    "Someone slips between the lamps ahead.",
    "The dark's nearly got them. Name them?",
    "A shadow you almost recognize, not moving.",
  ],
};

// PATCHed in as the message content when a window closes unsolved — the
// silhouette is dropped alongside it and the name is never spoken.
export const SHARED_MISSED_LINES = {
  any: [
    "The moment's passed.",
    "Whoever it was, they didn't wait.",
    "You missed your chance.",
  ],
  day: [
    "The crowd closes up. Whoever it was is somewhere in it now.",
    "Too slow — half the academy has walked through that spot since.",
    "Gone, off toward the lecture halls with everyone else.",
    "They round the corner with the rest of the between-class rush.",
  ],
  evening: [
    "The shape dissolves back into the dark.",
    "Gone before anyone could place them. The lamps don't reach that far.",
    "They step past the last light, and that's that.",
    "The dark takes the outline back.",
  ],
};

// Only a wrong *real name* gets one of these (and starts the cooldown).
// Gibberish resolves to nothing and is answered with "I don't know who that
// is" — no cooldown, no penalty.
export const SHARED_WRONG_GUESS_LINES = [
  "Not them. They slip further away.",
  "No — the figure stays put.",
  "Wrong name. The moment tightens.",
  "That's not who's standing there.",
  "Heads turn on the walkway. None of them are theirs.",
];

// The fallback /call reveal pool, used for any character with no `winnerLines`
// of their own at the register in play (see winnerLinePool). Deliberately
// voice-neutral, since it has to front any character on the roster; a
// character's authored lines replace it rather than mixing with it, so anything
// added here should stay something all 26 could plausibly do.
//
// `any` is house/mission themed and valid at every register, so it is merged
// into each register's pool rather than replacing it.
export const SHARED_WINNER_LINES = {
  any: [
    "{user} flagged **{name}** down to sign the **{house}** mission report.",
    "{user} caught **{name}** on the way to a **{house}** briefing.",
    "**{name}** was off on a **{house}** mission when {user} called out.",
    "{user} caught **{name}** between **{house}** missions — perfect timing.",
    "{user} grabbed **{name}** to sign the **{house}** anomaly report.",
    "**{name}** turned at their name. {user} had a **{house}** mission to go over.",
    "{user} picked **{name}** out of the crowd and got there first.",
    "{user} snagged **{name}** for the **{house}** assignment.",
    "**{name}** nearly slipped into the crowd, but {user} called them back.",
    "{user} matched the silhouette to **{name}** and waved them over.",
    "{user} caught up to **{name}**, **{house}** dispatch in hand.",
    "**{name}** stopped mid-step. {user} needed them for the **{house}** roster.",
    "{user} logged **{name}** for the **{house}** briefing with seconds to spare.",
    "The **{house}** debrief could wait — {user} already had **{name}**.",
    "{user} pinned **{name}** down between rounds of **{house}** business.",
  ],

  new: [
    "**{name}** doesn't quite place {user}, but stops anyway.",
    "{user} got the name out before **{name}** could go. A cautious nod.",
    "**{name}** studies {user} a second, then decides they're worth a moment.",
    '"…Do I know you?" **{name}** asks — but doesn\'t walk off. {user} got it right.',
    "**{name}** gives {user} a measured look, then stays.",
  ],

  warm: [
    "**{name}** grins the second {user} calls out.",
    '"There you are." **{name}** falls into step with {user}.',
    "{user} nailed the name and **{name}** laughs — caught, not minding it.",
    "**{name}** was hoping it'd be {user}. Mission talk can wait.",
    "**{name}** turns like they already knew it was {user}.",
  ],

  spark: [
    "**{name}** turns, sees {user}, and takes their time answering.",
    "{user} says the name and **{name}**'s whole posture changes.",
    "\"Of course it's you.\" **{name}** says it like {user}'s been caught at something.",
    "**{name}** was already half-turned before {user} finished.",
    "{user} got there first, and **{name}** looks pleased about it.",
  ],

  close: [
    "**{name}** knows that voice anywhere. Straight over to {user}.",
    "{user} barely finished the name before **{name}** was turning, smiling.",
    '"Took you long enough." **{name}** bumps {user}\'s shoulder.',
    "**{name}** drops the debrief face when it's {user} calling.",
    "**{name}** was watching for {user} the whole time. Not that they'd say so.",
  ],

  bound: [
    "**{name}** isn't even surprised — of course it's {user}. Always {user}.",
    "{user} says the name and **{name}**'s already there, report forgotten.",
    "\"You didn't have to guess.\" **{name}** takes {user}'s hand and the **{house}** briefing loses.",
    "**{name}** crosses to {user} like the room isn't there.",
    "The **{house}** paperwork hits the floor. **{name}** got to {user} first.",
  ],
};
