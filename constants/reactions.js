// The one-liner printed under a dialogue response, "That lights them up." and
// friends. Previously four hardcoded strings in encounters.js, so every
// encounter that scored the same read identically. This spreads them across a
// collection keyed on three axes:
//
//   type → register → outcome → [lines]      (kind / playful / bold)
//   neutral → register → [lines]
//
//  type       The RESPONSE_TYPES value the player picked. The line reads as a
//             reaction to *that kind of move*: a bold pick that misses "doesn't
//             take the bait", a playful one "doesn't play along". Playful is
//             teasing, flirting, mischief, not only jokes. NEUTRAL always
//             gains 0, so it has no outcome axis, just one pool per register.
//  register   Which relationship stage we're in, collapsed from the six dialogue
//             tiers to three (see REGISTER_BY_TIER). The higher the affinity, the
//             more the reaction is allowed to land: "a raised brow" at `early`,
//             "that undoes them" at `deep`.
//  outcome    love    the player picked this character's favourite response type
//                     (gain 2). So kind.love is in effect the pool for
//                     characters who love kind: character flavor for free.
//             like    a liked-but-not-favourite type (gain 1)
//             flat    the character's least-preferred type (gain 0). It just
//                     didn't resonate — NOT dislike or hurt. affinityByResponse
//                     is a {2,1,0} permutation, so every character has one such
//                     type; landing in it is a non-event, not a rejection.
//
// One line is picked at random per slot, exactly like the dialogue pools. Lines
// are shared by the whole roster, so they read as a short sentiment, not a
// scene:
//   - short: a few words, nine at most (test-enforced).
//   - no name: the encounter already shows who this is. Refer to them as
//     "they"/"them" or not at all.
//   - no dialogue: nothing in quotes, nothing they say aloud, no laughing
//     (Towa can't speak by day).
//   - no touch: Alan has none before spark, Zenji's costs him, Rui keeps his
//     hands to himself, Jin does no PDA. A shared line can't know who it's for.
//   - no confession at `deep`: it covers Confidant, before Devoted's
//     "not a secret anymore".
//   - no repeats: a line lives in exactly one slot.
//
// Pools are sized by how often they're drawn, not evenly. Players usually hit
// a character's favourite, so `love` is the biggest (kind, the favourite of
// 16, slightly ahead of bold and playful); like/flat scale
// by how many characters rank that type there; neutral stays small. Sizes per
// register are pinned in test/reaction-lines.test.js (POOL_SIZES) — if the
// roster's rankings shift, revisit them there.
// Every slot is a collection — add lines any time; that is the whole point.
//
// If per-temperament voice is wanted later, add an archetype→bucket layer and
// nest these under it; getReactionLine already takes `character`, so no call
// site changes.

import { RESPONSE_TYPES } from "./characters.js";
import { pickRandom } from "./random.js";

// Six dialogue tiers → three reaction registers. Kept coarser than the dialogue
// tiers on purpose: the reaction only needs to know "still circling / getting
// close / together", not the exact level.
export const REGISTER_BY_TIER = {
  new: "early",
  known: "early",
  warm: "mid",
  spark: "mid",
  close: "deep",
  bound: "deep",
};

export const REACTION_LINES = {
  kind: {
    early: {
      love: [
        "Their guard drops a little.",
        "That reaches somewhere real.",
        "They didn't expect that.",
        "Their face softens.",
        "That gets through.",
        "They look at you differently now.",
        "Their shoulders ease.",
        "That means something to them.",
        "A real smile, small but there.",
        "Something in them unclenches.",
        "That disarms them.",
        "That sticks with them.",
      ],
      like: [
        "A grateful look.",
        "That eases them.",
        "They take it to heart.",
        "They seem touched.",
      ],
      flat: [
        "Kind, but it doesn't reach them.",
        "They accept it, nothing more.",
        "Sweet, but it slides past.",
      ],
    },
    mid: {
      love: [
        "That warms them through.",
        "That clearly touches them.",
        "That means more than they show.",
        "That hits home.",
        "They go quiet, moved.",
        "Exactly what they needed.",
        "They soak that in.",
        "That makes their day.",
        "They're glad, and it shows.",
        "That lands right where it should.",
        "Their whole face eases.",
        "They'll be thinking about that.",
      ],
      like: [
        "A grateful smile.",
        "That softens them.",
        "Some of the stiffness goes.",
        "They're glad it's you.",
      ],
      flat: [
        "Sweet, but not what they need.",
        "Nice, just not their way.",
        "Kind, but it misses.",
      ],
    },
    deep: {
      love: [
        "That goes straight to the heart.",
        "That undoes them.",
        "Overwhelmed, in a good way.",
        "Their eyes go soft.",
        "That's everything to them.",
        "They look at you like you hung the moon.",
        "They go still, then soften.",
        "They light up, just for you.",
        "That stays with them all day.",
        "They look at you like home.",
        "They can barely take it.",
        "That fills them right up.",
      ],
      like: [
        "They keep that one close.",
        "That settles somewhere deep.",
        "A soft, private look.",
        "Something tender crosses their face.",
      ],
      flat: [
        "They know you mean it.",
        "Not their language. They still hear it.",
        "It misses. Nothing lost.",
      ],
    },
  },
  playful: {
    early: {
      love: [
        "That catches their fancy.",
        "That wins a smile.",
        "That sparks something.",
        "You've got their interest.",
        "They can't help being charmed.",
        "Now they're curious.",
        "Now it's a game.",
        "Worth looking up for.",
        "A grin slips out.",
        "They like where this is going.",
      ],
      like: [
        "A crooked smile.",
        "A flicker of amusement.",
        "That intrigues them.",
        "They're entertained.",
        "A sidelong look.",
        "That gets a smirk.",
      ],
      flat: [
        "They don't play along.",
        "Not their kind of fun.",
        "It doesn't catch.",
        "They stay serious.",
      ],
    },
    mid: {
      love: [
        "They can't hide the grin.",
        "They're delighted.",
        "That brings out their mischief.",
        "Their eyes glint.",
        "They're all in.",
        "Their look lingers.",
        "They give it right back.",
        "They're amused despite themselves.",
        "Their whole mood lifts.",
        "They give in and grin.",
      ],
      like: [
        "That earns a grin.",
        "They're amused.",
        "They're game.",
        "A quick smirk.",
        "That tickles them.",
        "They're having fun.",
      ],
      flat: [
        "Not quite their speed.",
        "Fun, just not theirs.",
        "They let the game drop.",
        "A smile, but they pass.",
      ],
    },
    deep: {
      love: [
        "They're grinning before they know it.",
        "You know exactly how to get them.",
        "Pure mischief in their eyes.",
        "That's their favorite you.",
        "They light right up.",
        "They're helpless against that.",
        "A smirk they can't fight.",
        "Caught smiling, again.",
        "They're enjoying this too much.",
        "They're utterly charmed.",
      ],
      like: [
        "A fond grin.",
        "They shake their head, smiling.",
        "Amused, and fond of you.",
        "Their eyes crinkle.",
        "They're happy to humor you.",
        "Fond, and a little smug.",
      ],
      flat: [
        "They don't play, still smiling.",
        "Not their game, but it's yours.",
        "Lukewarm on that, never on you.",
        "No spark, but no less fond.",
      ],
    },
  },
  bold: {
    early: {
      love: [
        "That catches them off guard.",
        "Now they're paying attention.",
        "Bold. They like it.",
        "That earns a second look.",
        "Their interest sharpens.",
        "They didn't think you'd dare.",
        "That earns their respect.",
        "Not many would try that.",
        "They lean into it.",
        "Their curiosity is piqued.",
      ],
      like: [
        "That gets their attention.",
        "A raised brow.",
        "They respect the nerve.",
      ],
      flat: [
        "They don't take the bait.",
        "Bold, but it doesn't move them.",
        "The nerve is lost on them.",
        "It doesn't faze them.",
        "They don't rise to it.",
        "Bold, but not for them.",
      ],
    },
    mid: {
      love: [
        "They didn't see that coming.",
        "That gets a real reaction.",
        "Exactly their speed.",
        "That lights a spark.",
        "They like that. A lot.",
        "That's what they wanted.",
        "They're impressed.",
        "That's their kind of nerve.",
        "A sharp grin.",
        "That's a challenge they like.",
      ],
      like: [
        "They match your energy.",
        "They like the nerve.",
        "That gets them going.",
      ],
      flat: [
        "Bold, but it doesn't land.",
        "They let it go by.",
        "No bite, no harm.",
        "It doesn't rattle them.",
        "They shrug it off.",
        "Big swing, no hit.",
      ],
    },
    deep: {
      love: [
        "You still catch them off guard.",
        "That gets their heart going.",
        "They look at you like a dare.",
        "Their breath catches.",
        "That's why it's you.",
        "They're done for.",
        "Only you can do that.",
        "They're hooked, all over again.",
        "A look that says go on.",
        "You never stop surprising them.",
      ],
      like: [
        "A slow grin.",
        "They rise to it.",
        "They love your nerve.",
      ],
      flat: [
        "It doesn't reach them. They don't mind.",
        "They don't bite, and stay.",
        "A miss. They're still fond.",
        "Unmoved, still here.",
        "They shrug, still close.",
        "Bold, and it misses.",
      ],
    },
  },
  neutral: {
    early: [
      "Not much of a reaction.",
      "They let it pass.",
      "They keep their read to themselves.",
      "Hard to tell what they make of it.",
    ],
    mid: [
      "They take it in stride.",
      "It doesn't move the needle.",
      "They stay easy.",
      "Easy as ever.",
    ],
    deep: [
      "The quiet is a comfortable one.",
      "They don't need the silence filled.",
      "They let the moment be.",
      "Silence, and none of it awkward.",
    ],
  },
};

function outcomeFor(gain) {
  if (gain >= 2) return "love";
  if (gain === 1) return "like";
  return "flat";
}

// The reaction line for a scored response. `tier` is the dialogue tier
// (getDialogueTier(level.name)); `responseTypeId` is the RESPONSE_TYPES value the
// player picked; `gain` is the affinity it earned (0-2). An unknown type reads
// as neutral. `character` is unused today but kept in the signature so a
// temperament layer can be added without touching call sites.
export function getReactionLine(character, tier, responseTypeId, gain) {
  const register = REGISTER_BY_TIER[tier] || "early";
  const byType = REACTION_LINES[responseTypeId];
  if (responseTypeId === RESPONSE_TYPES.NEUTRAL || !byType) {
    return pickRandom(REACTION_LINES.neutral[register]);
  }
  return pickRandom(byType[register][outcomeFor(gain)]);
}
