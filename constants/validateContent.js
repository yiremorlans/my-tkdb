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

const TIERS = ["new", "known", "warm", "spark", "close", "bound"];

// Buttons are authored at fewer tiers than the dialogue — see
// RESPONSE_LABEL_TIER in constants/characters.js.
const RESPONSE_TIERS = ["new", "spark", "close", "bound"];

// Discord rejects a button whose label exceeds 80 characters, taking the whole
// encounter message down with it. Labels are authored prose, so check them.
const MAX_BUTTON_LABEL = 80;

// Response and approach slots may be a single string, a collection, or (for a
// character whose lines differ by outfit) a map of variant -> collection.
function collectLabels(value) {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object") {
    return Object.values(value).flatMap(collectLabels);
  }
  return [];
}

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

    // A missing approach set only costs the scene-specific flavor — the /roam
    // button still renders from APPROACH_LABEL_FALLBACK — so warn, don't fail.
    if (!content.approach) {
      warnings.push(`${id} has no approach labels — using the generic fallback`);
    } else {
      for (const tier of TIERS) {
        if (!content.approach[tier]) {
          warnings.push(`${id} has no "${tier}" approach label — falls back to "new"`);
        }
      }
      for (const label of collectLabels(content.approach)) {
        if (label.length > MAX_BUTTON_LABEL) {
          errors.push(
            `${id} approach label is ${label.length} chars (max ${MAX_BUTTON_LABEL}): "${label}"`,
          );
        }
      }
    }

    if (character.pmOnly && !content.amOnlyApproach) {
      warnings.push(`${id} is pmOnly but has no amOnlyApproach — reuses the spoken-hours labels`);
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
      for (const tier of RESPONSE_TIERS) {
        if (!entry[tier]) {
          warnings.push(`${id} has no "${type}" label at "${tier}"`);
          continue;
        }
        const labels = collectLabels(entry[tier]);
        if (new Set(labels).size !== labels.length) {
          warnings.push(`${id} repeats a "${type}" label at "${tier}"`);
        }
        for (const label of labels) {
          if (label.length > MAX_BUTTON_LABEL) {
            errors.push(
              `${id} ${type} label is ${label.length} chars (max ${MAX_BUTTON_LABEL}): "${label}"`,
            );
          }
          // Two identically worded buttons paying different affinity reads as a
          // bug to the player even though nothing throws.
          const seenAt = seen.get(`${tier}:${label}`);
          if (seenAt && seenAt !== type) {
            warnings.push(
              `${id} reuses "${label}" for both ${seenAt} and ${type} at "${tier}"`,
            );
          }
          seen.set(`${tier}:${label}`, type);
        }
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
