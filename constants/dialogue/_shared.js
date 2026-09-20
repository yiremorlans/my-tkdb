// Authored content for every character, keyed by the ids in
// constants/characters.js. Kept separate from the character records so dialogue
// can grow — many lines per tier — without bloating character configuration,
// which is close to static by comparison.
//
// Each tier is a collection; one line is picked at random per encounter (see
// getRandomDialogueBeat / getRandomDialogueEntry). `dialogue` tiers are
// normally string arrays, but may instead be keyed by image variant where a
// character's lines differ by outfit (Jo's pronouns change between uniform
// and casual — see withPronounVariants below).
//
// `approach` is the label for the single button on the /roam narration message
// — the "Step forward" beat before the character is actually drawn. It is not a
// pool of its own any more: it lives on the beat, next to the line it invites,
// and every drawable beat carries one. The separate tiered `approach` pools,
// `approachWhen`, and SHARED_APPROACH_WHEN are all gone.
//
// REQUIRED: write every `dialogue` entry as a { line, approach } pair, never a
// bare string — `approach` a label, or an array of labels when more than one
// reaction genuinely fits the same beat. getRandomDialogueBeat
// (constants/characters.js) draws the line and its button together, so the
// invitation always answers the scene the player just read. A bare string has
// nothing left to fall back to: the independent `approach` pools that used to
// label one are deleted, and it would render APPROACH_LABEL_FALLBACK's generic
// "Step forward", which is the bug this shape exists to prevent — that's how a
// line and a button end up describing two different moments. See
// docs/dialogue-approach-pairing.md and constants/dialogue/benkei.js (its
// new/known/warm/close/bound tiers) for a worked example.
//
// `responses` holds the four button labels offered to the player, and lives on
// the beat itself — `{ line, approach, greeting, responses: { kind, playful,
// bold, neutral } }`, each value one label or an array of interchangeable ones.
// There is no character-level pool behind it: a beat missing a response type
// falls straight to the archetype defaults in constants/characters.js, which
// know nothing about the scene just shown. constants/validateContent.js reports
// any such gap at startup.
//
// `winnerLines` holds the public /call reveal lines, keyed by the registers in
// WINNER_LINE_BUCKETS (constants/publicEncounters.js) — the six dialogue tiers
// collapsed to five, with "known" folding into "new". A character's own pool
// replaces the shared SHARED_WINNER_LINES pool below rather than merging with
// it, so an authored reveal always sounds like them; a register left out falls
// back. {user} is the winner's name (plain text, no @tag), {name} their full name, and the reveal
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
// THE CONDITIONAL `when` LAYER IS REMOVED (2026-09-19). There is no
// `dialogueWhen`, no `SHARED_DIALOGUE_WHEN`, no `approachWhen`, no
// `SHARED_APPROACH_WHEN`, and no `matchesWhen`/`DIALOGUE_WHEN_DIMENSIONS`
// behind them — data and machinery both, deleted. validateContent errors if a
// `dialogueWhen` key reappears on a character, and test/beat-completeness
// checks the same thing, because a block added back would be authored,
// reviewed, and never shown.
//
// It was an older format than the beat: its entries were bare lines with no
// `greeting` and no `responses`. Merged on top of the base pool for a matching
// scene, they meant an evening draw could land on one, caption the payoff image
// "..." and drop all four buttons to archetype defaults that knew nothing about
// the scene. SHARED_DIALOGUE_WHEN applied to all 26 characters, so it hit the
// whole roster, including the 19 who never had a block of their own.
//
// One format now: the beat, { line, approach, greeting, responses }.
// Time-of-day flavor goes on a character's own `dialogue` beats, where it is a
// complete beat like every other. A line that only works after dark has to be
// written so it also reads at noon, or it doesn't go in — a base beat carries
// no time gate. The single exception is `daytimeDialogue`, the whole-pool hard
// swap a pmOnly character (Towa) gets for the daytime; its entries are beats
// too, held to exactly the same completeness.

// Authoring helper for a character whose dialogue pool is keyed by image
// variant purely because the pronouns change (currently just Jo: `he/him/his
// /himself` in `uniform`, `she/her/her/herself` in `casual`). Write the pool
// ONCE, in the `uniform` voice, with the pronoun wrapped in braces —
// `"{He}'s buried in paperwork"`, `"Ask if {he}'s free"` — and this expands it
// into the `{ uniform: [...], casual: [...] }` shape resolvePoolTier expects,
// swapping in the casual pronoun and preserving the token's original case
// (`{He}` → "He"/"She", `{he}` → "he"/"she"). Runs once at module load, not
// per-request, so there's no runtime cost. Covers `line`, `approach`
// (string or array), `greeting`, and every value in `responses` — the only
// fields a dialogue entry carries.
const PRONOUN_VARIANTS = {
  uniform: { he: "he", him: "him", his: "his", himself: "himself" },
  casual: { he: "she", him: "her", his: "her", himself: "herself" },
};

function applyPronouns(text, variant) {
  if (typeof text !== "string") return text;
  const map = PRONOUN_VARIANTS[variant];
  return text.replace(/\{(he|him|his|himself)\}/gi, (_, word) => {
    const replacement = map[word.toLowerCase()];
    return word[0] === word[0].toUpperCase()
      ? replacement.charAt(0).toUpperCase() + replacement.slice(1)
      : replacement;
  });
}

function expandPronounField(value, variant) {
  if (Array.isArray(value)) return value.map((v) => applyPronouns(v, variant));
  return applyPronouns(value, variant);
}

function expandPronounEntry(entry, variant) {
  const expanded = { ...entry };
  if (expanded.line !== undefined) {
    expanded.line = expandPronounField(expanded.line, variant);
  }
  if (expanded.approach !== undefined) {
    expanded.approach = expandPronounField(expanded.approach, variant);
  }
  if (expanded.greeting !== undefined) {
    expanded.greeting = expandPronounField(expanded.greeting, variant);
  }
  if (expanded.responses) {
    expanded.responses = Object.fromEntries(
      Object.entries(expanded.responses).map(([key, val]) => [
        key,
        expandPronounField(val, variant),
      ]),
    );
  }
  return expanded;
}

export function withPronounVariants(entries) {
  return {
    uniform: entries.map((entry) => expandPronounEntry(entry, "uniform")),
    casual: entries.map((entry) => expandPronounEntry(entry, "casual")),
  };
}

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
    "Quick, you could still reach them.",
  ],
  day: [
    "A familiar figure in the between-class crowd.",
    "Someone you know, cutting through the crush.",
    "Half the academy's on this walkway. One you know.",
    "A familiar uniform in the line ahead.",
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
    "Too slow, half the academy has walked through that spot since.",
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
  "No, the figure stays put.",
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
    "{user} caught **{name}** between **{house}** missions. Perfect timing.",
    "{user} grabbed **{name}** to sign the **{house}** anomaly report.",
    "**{name}** turned at their name. {user} had a **{house}** mission to go over.",
    "{user} picked **{name}** out of the crowd and got there first.",
    "{user} snagged **{name}** for the **{house}** assignment.",
    "**{name}** nearly slipped into the crowd, but {user} called them back.",
    "{user} matched the silhouette to **{name}** and waved them over.",
    "{user} caught up to **{name}**, **{house}** dispatch in hand.",
    "**{name}** stopped mid-step. {user} needed them for the **{house}** roster.",
    "{user} logged **{name}** for the **{house}** briefing with seconds to spare.",
    "The **{house}** debrief could wait. {user} already had **{name}**.",
    "{user} pinned **{name}** down between rounds of **{house}** business.",
  ],

  new: [
    "**{name}** doesn't quite place {user}, but stops anyway.",
    "{user} got the name out before **{name}** could go. A cautious nod.",
    "**{name}** studies {user} a second, then decides they're worth a moment.",
    '"…Do I know you?" **{name}** asks, but doesn\'t walk off. {user} got it right.',
    "**{name}** gives {user} a measured look, then stays.",
  ],

  warm: [
    "**{name}** grins the second {user} calls out.",
    '"There you are." **{name}** falls into step with {user}.',
    "{user} nailed the name and **{name}** laughs, caught, not minding it.",
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
    "**{name}** was watching for {user} the whole time.",
  ],

  bound: [
    "**{name}** isn't even surprised. Of course it's {user}. Always {user}.",
    "{user} says the name and **{name}**'s already there, report forgotten.",
    "\"You didn't have to guess.\" **{name}** takes {user}'s hand and the **{house}** briefing loses.",
    "**{name}** crosses to {user} like the room isn't there.",
    "The **{house}** paperwork hits the floor. **{name}** got to {user} first.",
  ],
};
