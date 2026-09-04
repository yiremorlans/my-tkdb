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
  SHARED_ENCOUNTER_TEASERS,
  SHARED_MISSED_LINES,
  SHARED_WINNER_LINES,
  SHARED_WRONG_GUESS_LINES,
} from "./dialogue.js";
import {
  BACKGROUNDS_BY_LOCATION,
  LOCATION_KEYS,
  SPECIAL_BACKGROUNDS,
  TIME_BUCKETS,
} from "./backgrounds.js";
import {
  BOND_SCENE_KEYS,
  BOND_SCENE_MAX_BEATS,
  MAX_BUTTON_LABEL_LENGTH,
} from "./game.js";
import {
  BOND_SCENE_PLACEHOLDERS,
  WINNER_LINE_BUCKETS,
  WINNER_LINE_PLACEHOLDERS,
} from "./publicEncounters.js";

const TIERS = ["new", "known", "warm", "spark", "close", "bound"];

// Buttons are authored at fewer tiers than the dialogue — see
// RESPONSE_LABEL_TIER in constants/characters.js.
const RESPONSE_TIERS = ["new", "spark", "close", "bound"];

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

// /call reveal lines, per character or the shared fallback pool. For a
// character, absent or partial is legal — SHARED_WINNER_LINES fronts whatever
// is missing — but for the shared pool itself a missing register has nothing
// left to fall back to, so `required` promotes those to errors. A line that
// can't name the winner or the character is a broken public message either way.
function validateWinnerLines(at, winnerLines, errors, warnings, opts = {}) {
  const { required = false, extraBuckets = [] } = opts;
  if (winnerLines === undefined) {
    const message = `${at} has no winnerLines`;
    if (required) errors.push(message);
    else warnings.push(`${message} — /call reveals use the shared pool`);
    return;
  }
  if (typeof winnerLines !== "object" || winnerLines === null || Array.isArray(winnerLines)) {
    errors.push(`${at} winnerLines must be an object keyed by register`);
    return;
  }

  const buckets = [...extraBuckets, ...WINNER_LINE_BUCKETS];
  for (const bucket of Object.keys(winnerLines)) {
    if (!buckets.includes(bucket)) {
      warnings.push(`${at} winnerLines has unknown register "${bucket}" — never picked`);
    }
  }

  for (const bucket of buckets) {
    const lines = winnerLines[bucket];
    if (lines === undefined) {
      const message = `${at} has no "${bucket}" winner lines`;
      if (required) errors.push(message);
      else warnings.push(`${message} — that register uses the shared pool`);
      continue;
    }
    if (!Array.isArray(lines) || lines.length === 0) {
      errors.push(
        `${at} winnerLines.${bucket} is empty — winnerLinePool would fall through to the shared pool`,
      );
      continue;
    }
    if (new Set(lines).size !== lines.length) {
      warnings.push(`${at} repeats a winner line at "${bucket}"`);
    }
    for (const line of lines) {
      if (typeof line !== "string") {
        errors.push(`${at} winnerLines.${bucket} has a non-string line`);
        continue;
      }
      const used = [...line.matchAll(/\{(\w+)\}/g)].map((m) => m[1]);
      for (const key of used) {
        if (!WINNER_LINE_PLACEHOLDERS.includes(key)) {
          // fillTemplate resolves an unknown placeholder to '', so this ships a
          // sentence with a hole in it rather than throwing.
          errors.push(`${at} winnerLines.${bucket} uses unknown placeholder "{${key}}": "${line}"`);
        }
      }
      // The embed's winner line is the only place the reveal names either of
      // them — the message content is cleared and the milestone afterline
      // names neither.
      if (!used.includes("user")) {
        errors.push(`${at} winnerLines.${bucket} never mentions {user}: "${line}"`);
      }
      if (!used.includes("name") && !used.includes("firstName")) {
        errors.push(`${at} winnerLines.${bucket} never names the character: "${line}"`);
      }
    }
  }
}

// Bond scenes — the level-up DMs (docs/bond-scene-dms.md).
//
// A scene is one continuous exchange in one character's voice, so unlike the
// dialogue and response pools there is nothing to fall back on — not within a
// scene and not across characters. Every character owes a scene at every level,
// and a missing one is an error rather than a warning: at runtime it would mean
// a level-up that silently sends nothing.
//
// The uniqueness rule is the other half of that. Every beat, closing line and
// keepsake line has to be unique across the whole game: two characters sending
// the same words at the same level would give away that the moment is not
// really theirs, which is the one thing a private scene cannot survive.
function validateBondScene(at, scene, errors, warnings, seenLines) {
  if (!scene || typeof scene !== "object" || Array.isArray(scene)) {
    errors.push(`${at} must be an object with beats, choice and keepsake`);
    return;
  }

  // Every string a player can actually read, tagged with where it came from, so
  // both the placeholder check and the uniqueness check walk one list.
  const prose = [];

  // --- beats ---
  const { beats } = scene;
  if (!Array.isArray(beats) || beats.length === 0) {
    errors.push(`${at}.beats must be a non-empty array — the scene would post nothing`);
  } else {
    if (beats.length > BOND_SCENE_MAX_BEATS) {
      errors.push(
        `${at}.beats has ${beats.length} beats (max ${BOND_SCENE_MAX_BEATS}) — past that a DM stops being a moment`,
      );
    }
    beats.forEach((beat, i) => {
      if (typeof beat !== "string" || beat.trim() === "") {
        errors.push(`${at}.beats[${i}] is empty — that click would post a blank message`);
        return;
      }
      prose.push([`${at}.beats[${i}]`, beat]);
    });
  }

  // --- choice ---
  const { choice } = scene;
  if (!choice || typeof choice !== "object" || Array.isArray(choice)) {
    errors.push(`${at}.choice is missing — every scene ends on one`);
  } else {
    if (typeof choice.prompt !== "string" || choice.prompt.trim() === "") {
      errors.push(`${at}.choice.prompt is empty — the buttons would answer nothing`);
    } else {
      prose.push([`${at}.choice.prompt`, choice.prompt]);
    }

    const options = choice.options;
    if (!Array.isArray(options) || options.length < 2 || options.length > 3) {
      errors.push(`${at}.choice.options must hold 2-3 options`);
    } else {
      const keys = new Set();
      options.forEach((option, i) => {
        const where = `${at}.choice.options[${i}]`;
        if (!option || typeof option !== "object") {
          errors.push(`${where} is not an object`);
          return;
        }
        if (typeof option.key !== "string" || option.key.trim() === "") {
          errors.push(`${where}.key is empty — the pick could not be recorded`);
        } else if (keys.has(option.key)) {
          // Both buttons would write the same choice_key and only the first
          // would ever resolve to a closing line.
          errors.push(`${where}.key "${option.key}" is used twice in this scene`);
        } else {
          keys.add(option.key);
        }

        if (typeof option.label !== "string" || option.label.trim() === "") {
          errors.push(`${where}.label is empty`);
        } else if (option.label.length > MAX_BUTTON_LABEL_LENGTH) {
          errors.push(
            `${where}.label is ${option.label.length} chars (max ${MAX_BUTTON_LABEL_LENGTH}): "${option.label}"`,
          );
        }

        if (option.style !== undefined && ![1, 2, 3, 4].includes(option.style)) {
          errors.push(`${where}.style must be a Discord button style (1-4), got ${option.style}`);
        }

        if (typeof option.close !== "string" || option.close.trim() === "") {
          errors.push(`${where}.close is empty — picking it would end the scene on silence`);
        } else {
          prose.push([`${where}.close`, option.close]);
        }
      });
    }
  }

  // --- keepsake ---
  const { keepsake } = scene;
  if (!keepsake || typeof keepsake !== "object" || Array.isArray(keepsake)) {
    errors.push(`${at}.keepsake is missing — finishing the scene would grant nothing`);
  } else {
    if (typeof keepsake.emoji !== "string" || keepsake.emoji.trim() === "") {
      errors.push(`${at}.keepsake.emoji is empty`);
    }
    if (typeof keepsake.line !== "string" || keepsake.line.trim() === "") {
      errors.push(`${at}.keepsake.line is empty`);
    } else {
      prose.push([`${at}.keepsake.line`, keepsake.line]);
    }
  }

  for (const [where, text] of prose) {
    // fillTemplate resolves an unknown placeholder to '', so a typo ships as a
    // hole in the middle of a sentence rather than throwing.
    for (const match of text.matchAll(/\{(\w+)\}/g)) {
      if (!BOND_SCENE_PLACEHOLDERS.includes(match[1])) {
        errors.push(`${where} uses unknown placeholder "{${match[1]}}"`);
      }
    }

    const key = text.trim();
    const firstSeenAt = seenLines.get(key);
    if (firstSeenAt) {
      errors.push(`${where} repeats a line already used at ${firstSeenAt}`);
    } else {
      seenLines.set(key, where);
    }
  }
}

// A whole `bondScenes` pool. Every level
// is required in both: a character because the scene has to be theirs, and the
// shared pool because it is what a roster addition falls back to before anyone
// has written for them.
function validateBondScenes(at, pool, errors, warnings, seenLines) {
  if (pool === undefined) {
    errors.push(
      `${at} has no bondScenes — every character needs their own scene at each of the six levels`,
    );
    return;
  }
  if (typeof pool !== "object" || pool === null || Array.isArray(pool)) {
    errors.push(`${at} bondScenes must be an object keyed by level`);
    return;
  }

  for (const key of Object.keys(pool)) {
    if (!BOND_SCENE_KEYS.includes(key)) {
      warnings.push(`${at} bondScenes has unknown level "${key}" — never delivered`);
    }
  }

  for (const key of BOND_SCENE_KEYS) {
    if (pool[key] === undefined) {
      errors.push(`${at} has no "${key}" bond scene — that level-up would deliver nothing`);
      continue;
    }
    validateBondScene(`${at} bondScenes.${key}`, pool[key], errors, warnings, seenLines);
  }

  // Keepsake emojis are checked for reuse within one character, not across the
  // game. Two characters sharing 🚪 is fine and common — a player sees one
  // character's six at a time, and /bonds never puts two rosters side by side.
  // Within a single journal they sit in one list, where a repeat reads as a
  // rendering bug rather than two different keepsakes. A warning rather than an
  // error: it is a legibility call, and the near-misses that actually confuse
  // (📱 against 📲) are ones only a human can judge.
  const levelsByEmoji = new Map();
  for (const key of BOND_SCENE_KEYS) {
    const emoji = pool[key]?.keepsake?.emoji;
    if (typeof emoji !== "string" || emoji.trim() === "") continue;
    const norm = emoji.trim();
    if (!levelsByEmoji.has(norm)) levelsByEmoji.set(norm, []);
    levelsByEmoji.get(norm).push(key);
  }
  for (const [emoji, levels] of levelsByEmoji) {
    if (levels.length > 1) {
      warnings.push(
        `${at} reuses the keepsake emoji ${emoji} at ${levels
          .map((l) => `"${l}"`)
          .join(" and ")} — they show in the same journal`,
      );
    }
  }
}

// A time-keyed /call pool ({ any, day, evening }). What actually has to hold is
// that every hour of the day can draw something: pickTeaser and pickMissedLine
// merge `any` with the current bucket, so a bucket may be absent, but the merge
// must never come out empty.
function validateTimedPool(label, pools, errors, warnings) {
  if (!pools || typeof pools !== "object" || Array.isArray(pools)) {
    errors.push(`${label} must be an object keyed by time bucket`);
    return;
  }
  for (const key of Object.keys(pools)) {
    if (key !== "any" && !TIME_BUCKETS.includes(key)) {
      warnings.push(`${label} has unknown time bucket "${key}" — never picked`);
    }
  }
  for (const [key, lines] of Object.entries(pools)) {
    if (!Array.isArray(lines) || lines.some((l) => typeof l !== "string")) {
      errors.push(`${label}.${key} must be an array of strings`);
    }
  }
  for (const bucket of TIME_BUCKETS) {
    const merged = [...(pools.any || []), ...(pools[bucket] || [])];
    if (merged.length === 0) {
      errors.push(`${label} has nothing to draw from at "${bucket}"`);
    }
  }
}

export function validateContent() {
  const errors = [];
  const warnings = [];
  const ids = new Set(CHARACTERS.map((c) => c.id));

  // Every bond scene line the roster uses, so the same words can't appear in two
  // characters' scenes — or twice in one character's. Built up across the shared
  // pool and all 26 characters below; see validateBondScene.
  const bondSceneLines = new Map();

  for (const key of Object.keys(DIALOGUE)) {
    if (!ids.has(key)) {
      errors.push(`dialogue.js has "${key}", which is not a character id`);
    }
  }

  // The roster-wide /call pools. Nothing falls back to these, so a hole in one
  // is an outage of the feature's message rather than a downgrade.
  validateTimedPool("SHARED_ENCOUNTER_TEASERS", SHARED_ENCOUNTER_TEASERS, errors, warnings);
  validateTimedPool("SHARED_MISSED_LINES", SHARED_MISSED_LINES, errors, warnings);
  if (!Array.isArray(SHARED_WRONG_GUESS_LINES) || SHARED_WRONG_GUESS_LINES.length === 0) {
    errors.push("SHARED_WRONG_GUESS_LINES is empty — a wrong guess would answer with nothing");
  }
  validateWinnerLines("SHARED_WINNER_LINES", SHARED_WINNER_LINES, errors, warnings, {
    required: true,
    extraBuckets: ["any"],
  });

  validateWhenList(SHARED_DIALOGUE_WHEN, "SHARED_DIALOGUE_WHEN", "dialogue", errors, warnings);
  validateWhenList(SHARED_APPROACH_WHEN, "SHARED_APPROACH_WHEN", "approach", errors, warnings, {
    maxLabel: MAX_BUTTON_LABEL_LENGTH,
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
        if (label.length > MAX_BUTTON_LABEL_LENGTH) {
          errors.push(
            `${id} approach label is ${label.length} chars (max ${MAX_BUTTON_LABEL_LENGTH}): "${label}"`,
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

    validateWinnerLines(id, content.winnerLines, errors, warnings);

    validateBondScenes(id, content.bondScenes, errors, warnings, bondSceneLines);

    // Conditional pools are optional; when present, every block must be
    // well-formed and its `when` must reference real dimensions/values or it is
    // dead content.
    validateWhenList(content.dialogueWhen, `${id} dialogueWhen`, "dialogue", errors, warnings);
    validateWhenList(content.approachWhen, `${id} approachWhen`, "approach", errors, warnings, {
      maxLabel: MAX_BUTTON_LABEL_LENGTH,
    });
    validateWhenList(content.responsesWhen, `${id} responsesWhen`, "responses", errors, warnings, {
      tiers: RESPONSE_TIERS,
      maxLabel: MAX_BUTTON_LABEL_LENGTH,
      nested: true,
    });

    // CRITICAL: Check for empty dialogue pools (breaks random selection)
    if (content.dialogue) {
      for (const tier of TIERS) {
        const poolData = content.dialogue[tier];
        if (!poolData) continue;

        // Handle variant-keyed pools (uniform/casual)
        if (typeof poolData === 'object' && !Array.isArray(poolData)) {
          // Variant pool: check both variants exist if one is defined
          const variants = Object.keys(poolData);
          if (variants.length > 1) {
            for (const variant of variants) {
              const variantPool = poolData[variant];
              if (!Array.isArray(variantPool) || variantPool.length === 0) {
                errors.push(
                  `${id} dialogue[${tier}].${variant} is empty — random selection would fail`
                );
              }
            }
            // Ensure consistency: if one variant exists, the other should too
            if (variants.includes('uniform') && !variants.includes('casual')) {
              warnings.push(
                `${id} dialogue[${tier}] has "uniform" but missing "casual" variant`
              );
            }
            if (variants.includes('casual') && !variants.includes('uniform')) {
              warnings.push(
                `${id} dialogue[${tier}] has "casual" but missing "uniform" variant`
              );
            }
          } else if (Array.isArray(poolData)) {
            // Single variant, check it's not empty
            if (poolData.length === 0) {
              errors.push(
                `${id} dialogue[${tier}] is empty — random selection would fail`
              );
            }
          }
        } else if (Array.isArray(poolData)) {
          // Standard array pool
          if (poolData.length === 0) {
            errors.push(
              `${id} dialogue[${tier}] is empty — random selection would fail`
            );
          }
        }
      }
    }

    // CRITICAL: Check for empty approach pools (breaks /roam button)
    if (content.approach) {
      for (const tier of TIERS) {
        const poolData = content.approach[tier];
        if (!poolData) continue;

        // Same variant consistency check for approach
        if (typeof poolData === 'object' && !Array.isArray(poolData)) {
          const variants = Object.keys(poolData);
          if (variants.length > 0) {
            for (const variant of variants) {
              const variantPool = poolData[variant];
              if (!Array.isArray(variantPool) || variantPool.length === 0) {
                errors.push(
                  `${id} approach[${tier}].${variant} is empty — step-forward button would fail`
                );
              }
            }
          }
        } else if (Array.isArray(poolData)) {
          if (poolData.length === 0) {
            errors.push(
              `${id} approach[${tier}] is empty — step-forward button would fail`
            );
          }
        }
      }
    }

    // CRITICAL: Check for mismatched tiers between dialogue and responses
    const dialogueTiers = content.dialogue ? Object.keys(content.dialogue).filter(k => TIERS.includes(k)) : [];
    const responseTiers = content.responses ?
      new Set(Object.values(content.responses).flatMap(r => Object.keys(r).filter(k => RESPONSE_TIERS.includes(k)))) :
      new Set();

    // Response tiers should map to dialogue tiers (with RESPONSE_LABEL_TIER mapping)
    const requiredDialogueTiers = new Set();
    for (const rTier of responseTiers) {
      if (rTier === 'new') requiredDialogueTiers.add('new', 'known', 'warm');
      if (rTier === 'spark') requiredDialogueTiers.add('spark');
      if (rTier === 'close') requiredDialogueTiers.add('close');
      if (rTier === 'bound') requiredDialogueTiers.add('bound');
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

        // CRITICAL: Check for empty response label arrays
        if (labels.length === 0) {
          errors.push(
            `${id} ${type} labels at "${tier}" is empty — button selection would fail`
          );
        }

        if (new Set(labels).size !== labels.length) {
          warnings.push(`${id} repeats a "${type}" label at "${tier}"`);
        }
        for (const label of labels) {
          if (label.length > MAX_BUTTON_LABEL_LENGTH) {
            errors.push(
              `${id} ${type} label is ${label.length} chars (max ${MAX_BUTTON_LABEL_LENGTH}): "${label}"`,
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
