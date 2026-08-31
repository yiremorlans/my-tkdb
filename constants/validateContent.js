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
import {
  CHARACTERS,
  DIALOGUE_WHEN_DIMENSIONS,
  RESPONSE_TYPES,
} from "./characters.js";
import {
  DIALOGUE,
  SHARED_APPROACH_WHEN,
  SHARED_DIALOGUE_WHEN,
} from "./dialogue.js";
import {
  BACKGROUNDS_BY_LOCATION,
  LOCATION_KEYS,
  SPECIAL_BACKGROUNDS,
  TIME_BUCKETS,
} from "./backgrounds.js";

const TIERS = ["new", "known", "warm", "spark", "close", "bound"];

// Buttons are authored at fewer tiers than the dialogue — see
// RESPONSE_LABEL_TIER in constants/characters.js.
const RESPONSE_TIERS = ["new", "spark", "close", "bound"];

// Discord rejects a button whose label exceeds 80 characters, taking the whole
// encounter message down with it. Labels are authored prose, so check them.
const MAX_BUTTON_LABEL = 80;

const KNOWN_LOCATIONS = new Set(Object.values(LOCATION_KEYS));
const KNOWN_BACKGROUNDS = new Set([
  ...Object.values(BACKGROUNDS_BY_LOCATION).flat(),
  ...Object.values(SPECIAL_BACKGROUNDS),
]);

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

// A `when` field is scalar-or-array; return it as a list for checking.
function asList(v) {
  return v === undefined ? [] : Array.isArray(v) ? v : [v];
}

function validateWhenClause(when, at, errors, warnings) {
  if (when === undefined) return;
  if (typeof when !== "object" || when === null || Array.isArray(when)) {
    errors.push(`${at}.when must be an object`);
    return;
  }
  for (const key of Object.keys(when)) {
    if (!DIALOGUE_WHEN_DIMENSIONS.includes(key)) {
      errors.push(
        `${at}.when has unknown dimension "${key}" — matchesWhen ignores it, so the rule fires wider than written`,
      );
    }
  }
  for (const t of asList(when.time)) {
    if (!TIME_BUCKETS.includes(t)) {
      warnings.push(`${at}.when.time "${t}" is not a known bucket — never matches`);
    }
  }
  for (const loc of asList(when.location)) {
    if (!KNOWN_LOCATIONS.has(loc)) {
      warnings.push(`${at}.when.location "${loc}" is not a known location — never matches`);
    }
  }
  for (const bg of asList(when.background)) {
    if (!KNOWN_BACKGROUNDS.has(bg)) {
      warnings.push(`${at}.when.background "${bg}" is not a known background — never matches`);
    }
  }
  // `event` values are not checked — there is no event registry yet, and an
  // unmatched event rule is harmless (never fires) rather than dead-wrong.
}

function checkTierPool(pool, at, tiers, maxLabel, errors, warnings) {
  for (const tier of Object.keys(pool)) {
    if (!tiers.includes(tier)) {
      warnings.push(`${at} has unknown tier "${tier}" — never picked`);
      continue;
    }
    const labels = collectLabels(pool[tier]);
    if (labels.length === 0) {
      warnings.push(`${at}.${tier} is empty`);
    }
    if (maxLabel) {
      for (const label of labels) {
        if (label.length > maxLabel) {
          errors.push(`${at}.${tier} label is ${label.length} chars (max ${maxLabel}): "${label}"`);
        }
      }
    }
  }
}

// Validate a `{ when, <poolKey> }` list — `dialogueWhen`, `approachWhen`, the
// shared variants, or (with nested: true) `responsesWhen`, whose pool is keyed
// by response type before tier.
function validateWhenList(list, label, poolKey, errors, warnings, opts = {}) {
  if (list === undefined) return;
  const { tiers = TIERS, maxLabel = null, nested = false } = opts;
  if (!Array.isArray(list)) {
    errors.push(`${label} must be an array of { when, ${poolKey} } blocks`);
    return;
  }
  list.forEach((entry, i) => {
    const at = `${label}[${i}]`;
    if (!entry || typeof entry !== "object") {
      errors.push(`${at} is not an object`);
      return;
    }
    validateWhenClause(entry.when, at, errors, warnings);
    const pool = entry[poolKey];
    if (!pool || typeof pool !== "object") {
      errors.push(`${at} has no ${poolKey} pool`);
      return;
    }
    if (nested) {
      for (const type of Object.keys(pool)) {
        if (!Object.values(RESPONSE_TYPES).includes(type)) {
          warnings.push(`${at}.${poolKey} has unknown response type "${type}" — never used`);
          continue;
        }
        checkTierPool(pool[type], `${at}.${poolKey}.${type}`, tiers, maxLabel, errors, warnings);
      }
    } else {
      checkTierPool(pool, `${at}.${poolKey}`, tiers, maxLabel, errors, warnings);
    }
  });
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

  validateWhenList(SHARED_DIALOGUE_WHEN, "SHARED_DIALOGUE_WHEN", "dialogue", errors, warnings);
  validateWhenList(SHARED_APPROACH_WHEN, "SHARED_APPROACH_WHEN", "approach", errors, warnings, {
    maxLabel: MAX_BUTTON_LABEL,
  });

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

    if (character.pmOnly && !content.daytimeDialogue) {
      errors.push(`${id} is pmOnly but has no daytimeDialogue`);
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

    if (character.pmOnly && !content.daytimeApproach) {
      warnings.push(`${id} is pmOnly but has no daytimeApproach — reuses the evening labels`);
    }

    if (!content.temperamentDialogue) {
      warnings.push(`${id} has no temperamentDialogue — greets with "..."`);
    }

    // Conditional pools are optional; when present, every block must be
    // well-formed and its `when` must reference real dimensions/values or it is
    // dead content.
    validateWhenList(content.dialogueWhen, `${id} dialogueWhen`, "dialogue", errors, warnings);
    validateWhenList(content.approachWhen, `${id} approachWhen`, "approach", errors, warnings, {
      maxLabel: MAX_BUTTON_LABEL,
    });
    validateWhenList(content.responsesWhen, `${id} responsesWhen`, "responses", errors, warnings, {
      tiers: RESPONSE_TIERS,
      maxLabel: MAX_BUTTON_LABEL,
      nested: true,
    });

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
