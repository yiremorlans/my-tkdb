// The one-liner printed under a dialogue response — "{name} lights up at that."
// and friends. Previously four hardcoded strings in encounters.js, so every
// encounter that scored the same read identically. This spreads them across a
// collection keyed on two axes:
//
//   register → outcome → [lines]
//
//  register   Which relationship stage we're in, collapsed from the six dialogue
//             tiers to three (see REGISTER_BY_TIER). The higher the affinity, the
//             more the reaction is allowed to land — a "measured nod" at `early`,
//             "pulls you close" at `deep`.
//  outcome    love    the player picked this character's favourite response type
//                     (gain 2)
//             like    a liked-but-not-favourite type (gain 1)
//             neutral the NEUTRAL response — the player didn't really engage
//                     (always gain 0)
//             flat    a genuine kind/playful/bold attempt in the character's
//                     least-preferred register (gain 0, non-neutral). It just
//                     didn't resonate — NOT dislike or hurt. affinityByResponse
//                     is a {2,1,0} permutation, so every character has one such
//                     register; landing in it is a non-event, not a rejection.
//
// One line is picked at random per outcome, exactly like the dialogue pools.
// `{name}` is substituted with the character's full name. Lines are shared by the
// whole roster, so keep them body-language-first and gender-neutral (they/them).
// Every slot is a collection — add lines any time; that is the whole point.
//
// If per-temperament voice is wanted later, add an archetype→bucket layer and
// nest these under it (REACTION_LINES[bucket][register][outcome]); getReactionLine
// already takes `character`, so no call site changes.

import { RESPONSE_TYPES, getFullName } from "./characters.js";

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
  early: {
    love: [
      "{name} lights up at that.",
      "{name}'s expression warms.",
      "That lands.",
      "{name} looks at you, curious now.",
      "{name} holds your gaze a moment.",
      "Something in {name} softens.",
    ],
    like: [
      "{name} seems to appreciate that.",
      "{name} gives a small nod.",
      "{name} looks pleased.",
      "That sits well with them.",
      "{name} unbends a little.",
      "{name} nods, warmer now.",
    ],
    neutral: [
      "{name} doesn't react much.",
      "{name} takes it in, says nothing.",
      "{name} doesn't move either way.",
      '"Sure," {name} says, flat.',
      "{name} lets it pass.",
      "{name} keeps their read to themselves.",
    ],
    flat: [
      "{name} isn't moved.",
      "Not their thing.",
      "{name} nods, politely.",
      "It doesn't spark anything.",
      "{name} doesn't warm to it.",
      "{name} lets it slide.",
    ],
  },
  mid: {
    love: [
      "{name} breaks into a real smile.",
      "{name} steps in closer.",
      "{name} laughs, caught off guard.",
      "That gets them.",
      "{name}'s look lingers.",
      "{name} grins, openly.",
    ],
    like: [
      "{name} warms to you.",
      "{name} bumps your shoulder.",
      "{name} eases up, pleased.",
      "That earns a real smile.",
      "{name} gives you a pleased look.",
      "{name} is glad you said it.",
    ],
    neutral: [
      "{name} takes it in stride.",
      '"Fair enough," {name} says.',
      "{name} shrugs, at ease.",
      "It doesn't move the needle.",
      "{name} lets it pass.",
      "{name} stays easy.",
    ],
    flat: [
      "It doesn't spark anything.",
      "{name} smiles, polite, moves on.",
      "Not what moves them.",
      "{name} nods without warming to it.",
      "No harm, no spark.",
      "{name} doesn't bite, doesn't mind.",
    ],
  },
  deep: {
    love: [
      "{name} pulls you close.",
      "{name} rests their forehead on yours.",
      "{name} takes your hand in both of theirs.",
      "Something tender crosses {name}'s face.",
      '"I love you," {name} says, easily.',
      "{name} holds on.",
    ],
    like: [
      "{name} tucks you against their side.",
      "{name} laces your fingers together.",
      "{name} leans on your shoulder.",
      "That earns a private smile.",
      "{name} pulls you in, content.",
      "{name} settles closer.",
    ],
    neutral: [
      "{name} leans into the quiet with you.",
      "{name} keeps hold of your hand.",
      "{name} settles against you.",
      "The quiet is a comfortable one.",
      "{name} doesn't need the silence filled.",
      "{name} stays close.",
    ],
    flat: [
      "{name} hums, unmoved, stays close.",
      "Not the way to reach them.",
      "{name} lets it pass, still warm.",
      "{name} just squeezes your hand.",
      "{name} shrugs, leans back in.",
      "Not their thing — no matter.",
    ],
  },
};

function outcomeFor(responseTypeId, gain) {
  if (responseTypeId === RESPONSE_TYPES.NEUTRAL) return "neutral";
  if (gain >= 2) return "love";
  if (gain === 1) return "like";
  return "flat";
}

// The reaction line for a scored response. `tier` is the dialogue tier
// (getDialogueTier(level.name)); `responseTypeId` is the RESPONSE_TYPES value the
// player picked; `gain` is the affinity it earned (0-2). `{name}` is filled in
// with the character's full name. `character` is unused today but kept in the
// signature so a temperament layer can be added without touching call sites.
export function getReactionLine(character, tier, responseTypeId, gain) {
  const register = REACTION_LINES[REGISTER_BY_TIER[tier] || "early"];
  const pool = register[outcomeFor(responseTypeId, gain)];
  const line = pool[Math.floor(Math.random() * pool.length)];
  return line.replace(/\{name\}/g, getFullName(character));
}
