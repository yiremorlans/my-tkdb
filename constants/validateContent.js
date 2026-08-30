// Startup check that constants/characters.js and constants/dialogue.js agree.
//
// Splitting content out of the character records means the two files are keyed
// by the same ids and can drift apart. That drift is exactly what hid two bugs
// for as long as it did: a response label keyed "ed" when the id was "edward",
// and a character never added to the label set at all. Both degraded silently
// because a missing entry falls back to archetype defaults rather than failing.
//
// So: anything that leaves a character mute is an error, and anything that
// silently downgrades them is a warning.
import { CHARACTERS, RESPONSE_TYPES } from "./characters.js";
import { DIALOGUE } from "./dialogue.js";

const TIERS = ["new", "warm", "close"];

export function validateContent() {
  const errors = [];
  const warnings = [];
  const ids = new Set(CHARACTERS.map((c) => c.id));

  for (const key of Object.keys(DIALOGUE)) {
    if (!ids.has(key)) {
      errors.push(`dialogue.js has "${key}", which is not a character id`);
    }
  }

  for (const character of CHARACTERS) {
    const { id } = character;
    const content = DIALOGUE[id];

    if (!content) {
      errors.push(`${id} has no entry in dialogue.js — would render "..."`);
      continue;
    }

    if (!content.dialogue) {
      errors.push(`${id} has no dialogue`);
    } else {
      for (const tier of TIERS) {
        if (!content.dialogue[tier]) {
          warnings.push(`${id} has no "${tier}" dialogue — falls back to "new"`);
        }
      }
    }

    if (character.pmOnly && !content.amOnlyDialogue) {
      errors.push(`${id} is pmOnly but has no amOnlyDialogue`);
    }

    if (!content.temperamentDialogue) {
      warnings.push(`${id} has no temperamentDialogue — greets with "..."`);
    }

    // A missing response entry is legal (archetype defaults cover it) but is
    // almost always an oversight, so name it.
    const seen = new Map();
    for (const type of Object.values(RESPONSE_TYPES)) {
      const entry = content.responses?.[type];
      if (!entry) {
        warnings.push(`${id} has no "${type}" label — using archetype default`);
        continue;
      }
      for (const tier of ["new", "close"]) {
        if (!entry[tier]) {
          warnings.push(`${id} has no "${type}" label at "${tier}"`);
          continue;
        }
        // Two identically worded buttons paying different affinity reads as a
        // bug to the player even though nothing throws.
        const seenAt = seen.get(`${tier}:${entry[tier]}`);
        if (seenAt) {
          warnings.push(
            `${id} reuses "${entry[tier]}" for both ${seenAt} and ${type} at "${tier}"`,
          );
        }
        seen.set(`${tier}:${entry[tier]}`, type);
      }
    }
  }

  for (const warning of warnings) {
    console.warn("[content]", warning);
  }
  if (errors.length) {
    throw new Error(
      `Character content is invalid:\n  ${errors.join("\n  ")}`,
    );
  }

  return { errors, warnings };
}
