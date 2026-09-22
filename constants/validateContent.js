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
import {
  DIALOGUE,
  SHARED_ENCOUNTER_TEASERS,
  SHARED_MISSED_LINES,
  SHARED_WINNER_LINES,
  SHARED_WRONG_GUESS_LINES,
} from "./dialogue.js";
import { TIME_BUCKETS } from "./backgrounds.js";
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
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Mirrors bondScenes.js's STICKERS_DIR: a scene's `stickers[index]` names a
// file here, checked at build time so a typo'd filename fails the build
// instead of quietly dropping the image at delivery (bondScenes.js's
// loadSticker is soft-fail by design — that's for a disk problem in
// production, not for content that was never right).
const STICKERS_DIR = join(__dirname, "../assets/stickers");

const TIERS = ["new", "known", "warm", "spark", "close", "bound"];


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

// A migrated dialogue entry pairs its line with the approach label(s) that
// belong to it — { line, approach }, approach a string or an array of
// interchangeable labels for that beat (see getRandomDialogueBeat in
// characters.js). A tier not yet migrated is still a bare array of strings.
function isBeat(entry) {
  return !!entry && typeof entry === "object" && typeof entry.line === "string";
}

// True once every line in a dialogue tier — across every image variant, if
// the pool is keyed by one — carries its own approach, so no button in that
// tier ever needs the generic fallback label.
function tierIsFullyPaired(poolData) {
  if (Array.isArray(poolData)) {
    return poolData.length > 0 && poolData.every(isBeat);
  }
  if (poolData && typeof poolData === "object") {
    const variants = Object.values(poolData);
    return variants.length > 0 && variants.every(tierIsFullyPaired);
  }
  return false;
}

// True when every line in a dialogue tier carries its own `responses[type]`,
// so /roam never reaches the top-level pool (or the archetype default behind
// it) for that button. A bare-string line has no beat to override from.
function tierCoversResponse(poolData, type) {
  if (Array.isArray(poolData)) {
    return poolData.every((entry) => isBeat(entry) && !!entry.responses?.[type]);
  }
  if (poolData && typeof poolData === "object") {
    return Object.values(poolData).every((v) => tierCoversResponse(v, type));
  }
  return true;
}

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
      // A beat that carries a sticker may be empty: the sticker is the whole
      // message (Discord posts an attachment with no text), which is how Towa
      // texts. Without one, an empty beat would post a blank message.
      if (typeof beat === "string" && beat.trim() === "" && scene.stickers?.[i]) return;
      if (typeof beat !== "string" || beat.trim() === "") {
        errors.push(`${at}.beats[${i}] is empty — that click would post a blank message`);
        return;
      }
      prose.push([`${at}.beats[${i}]`, beat]);
    });
  }

  // --- stickers ---
  // Optional: `stickers[index]` names a file in assets/stickers attached
  // alongside that beat (bondScenes.js renderBeat). Checked against disk here
  // so a typo'd filename is a build error, not a sticker that silently never
  // shows up in someone's DM.
  if (scene.stickers !== undefined) {
    if (typeof scene.stickers !== "object" || Array.isArray(scene.stickers)) {
      errors.push(`${at}.stickers must be an object keyed by beat index`);
    } else {
      for (const [key, filename] of Object.entries(scene.stickers)) {
        const index = Number(key);
        if (!Array.isArray(beats) || !Number.isInteger(index) || index < 0 || index >= beats.length) {
          errors.push(`${at}.stickers has key "${key}", which is not a beat index in this scene`);
          continue;
        }
        if (typeof filename !== "string" || filename.trim() === "") {
          errors.push(`${at}.stickers[${key}] must name a file in assets/stickers`);
          continue;
        }
        if (!fs.existsSync(join(STICKERS_DIR, filename))) {
          errors.push(`${at}.stickers[${key}] "${filename}" does not exist in assets/stickers`);
        }
      }
    }
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

        // A close that carries a sticker may be empty: the sticker is the
        // whole reply (Discord posts an attachment with no text), which is how
        // Towa texts. Without one, an empty close would end on silence.
        if (typeof option.close === "string" && option.close.trim() === "" && option.sticker) {
          // sticker-only close
        } else if (typeof option.close !== "string" || option.close.trim() === "") {
          errors.push(`${where}.close is empty — picking it would end the scene on silence`);
        } else {
          prose.push([`${where}.close`, option.close]);
        }

        // Optional: `option.sticker` names a file in assets/stickers attached
        // alongside the close (bondScenes.js renderClosing) — same mechanism
        // as a beat's sticker, checked here so a typo'd filename is a build
        // error rather than an image that never shows up.
        if (option.sticker !== undefined) {
          if (typeof option.sticker !== "string" || option.sticker.trim() === "") {
            errors.push(`${where}.sticker must name a file in assets/stickers`);
          } else if (!fs.existsSync(join(STICKERS_DIR, option.sticker))) {
            errors.push(`${where}.sticker "${option.sticker}" does not exist in assets/stickers`);
          }
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

    // Every beat must carry its own `approach`. This was a warning while the
    // roster was mid-migration and a bare string could still draw a label from
    // the separate `approach` pools / SHARED_APPROACH_WHEN. Those are deleted,
    // so an unpaired line now renders APPROACH_LABEL_FALLBACK's generic "Step
    // forward" against a scene it knows nothing about — a defect, not a style
    // note. (The label length cap is checked per beat below.)
    const unpairedTiers = TIERS.filter(
      (tier) =>
        content.dialogue?.[tier] !== undefined &&
        !tierIsFullyPaired(content.dialogue[tier]),
    );
    if (unpairedTiers.length) {
      errors.push(
        `${id} has lines with no approach at ${unpairedTiers.join("/")} — nothing left to label them`,
      );
    }

    if (
      character.pmOnly &&
      !Object.values(content.daytimeDialogue || {}).every(tierIsFullyPaired)
    ) {
      errors.push(`${id} is pmOnly but has daytimeDialogue lines with no approach — nothing left to label them`);
    }

    validateWinnerLines(id, content.winnerLines, errors, warnings);

    // The /call reveal's version of the daytime swap: a pmOnly character can't
    // speak by day, so his daytime reveals need a wordless pool at every
    // register. Required in full, because a missing register would fall back
    // to the shared pool rather than to anything he'd do. Nobody else draws it.
    if (character.pmOnly) {
      validateWinnerLines(`${id} daytime`, content.daytimeWinnerLines, errors, warnings, {
        required: true,
      });
    } else if (content.daytimeWinnerLines !== undefined) {
      warnings.push(`${id} has daytimeWinnerLines but isn't pmOnly — never picked`);
    }

    validateBondScenes(id, content.bondScenes, errors, warnings, bondSceneLines);

    // The conditional `when` layer is removed — data, matcher and validator.
    // Its entries predated the beat and carried no greeting or responses, so a
    // draw that landed on one shipped a "..." caption. Nothing reads this key
    // any more, so a block reintroduced here would be silently dead content
    // rather than a working feature: fail instead, and point at the one format.
    if (content.dialogueWhen !== undefined) {
      errors.push(
        `${id} has a dialogueWhen block — that format is removed; write the lines as ${"`"}dialogue${"`"} beats { line, approach, greeting, responses } instead`,
      );
    }

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

    // CRITICAL: a migrated ({ line, approach }) beat must carry both halves —
    // a blank line, or an approach with nothing usable on it, breaks the
    // /roam message the same way an empty pool would.
    //
    // Both drawable pools, not just `dialogue`. A pmOnly character's
    // `daytimeDialogue` is the hard swap pickDialogueEntry draws instead of the
    // base pool for the whole daytime (Towa), so its beats render the same
    // Discord buttons and owe the same caps — it was simply never added to this
    // walk when response labels moved onto the beat.
    for (const [poolName, pool] of [
      ["dialogue", content.dialogue],
      ["daytimeDialogue", content.daytimeDialogue],
    ]) {
      if (!pool) continue;
      for (const tier of TIERS) {
        const poolData = pool[tier];
        if (!poolData) continue;
        const collections = Array.isArray(poolData)
          ? [poolData]
          : typeof poolData === "object"
            ? Object.values(poolData)
            : [];
        for (const entries of collections) {
          if (!Array.isArray(entries)) continue;
          for (const entry of entries) {
            if (!isBeat(entry)) continue;
            if (!entry.line.trim()) {
              errors.push(`${id} ${poolName}[${tier}] has a beat with an empty line`);
            }
            const approachLabels = Array.isArray(entry.approach)
              ? entry.approach
              : [entry.approach];
            if (
              approachLabels.length === 0 ||
              approachLabels.some((a) => typeof a !== "string" || !a.trim())
            ) {
              errors.push(
                `${id} ${poolName}[${tier}] beat has no valid approach label: "${entry.line}"`,
              );
              continue;
            }
            for (const label of approachLabels) {
              if (label.length > MAX_BUTTON_LABEL_LENGTH) {
                errors.push(
                  `${id} ${poolName}[${tier}] beat approach is ${label.length} chars (max ${MAX_BUTTON_LABEL_LENGTH}): "${label}"`,
                );
              }
            }
            // A beat's `responses` carries the same button-label cap as its
            // approach, keyed by RESPONSE_TYPES. The beat is the only place
            // response labels live, so this is the only place to check them.
            const seenLabels = new Map();
            for (const [type, value] of Object.entries(entry.responses || {})) {
              for (const label of collectLabels(value)) {
                if (label.length > MAX_BUTTON_LABEL_LENGTH) {
                  errors.push(
                    `${id} ${poolName}[${tier}] beat ${type} response is ${label.length} chars (max ${MAX_BUTTON_LABEL_LENGTH}): "${label}"`,
                  );
                }
                // The four buttons are rendered side by side off this one
                // beat, so two of them worded identically while paying
                // different affinity reads as a bug even though nothing throws.
                const seenAt = seenLabels.get(label);
                if (seenAt && seenAt !== type) {
                  warnings.push(
                    `${id} ${poolName}[${tier}] beat reuses "${label}" for both ${seenAt} and ${type}: "${entry.line}"`,
                  );
                }
                seenLabels.set(label, type);
              }
            }
          }
        }
      }
    }

    // Every beat should carry its own label for all four response types. A
    // type the beat leaves out drops to the archetype default (RESPONSE_FALLBACK
    // in constants/characters.js), which knows nothing about the scene just
    // shown — legal, but almost always an oversight, so name it. There is no
    // character-level pool behind the beat any more, so this is the last stop
    // before the archetype default.
    for (const type of Object.values(RESPONSE_TYPES)) {
      const gaps = TIERS.filter(
        (tier) =>
          content.dialogue?.[tier] !== undefined &&
          !tierCoversResponse(content.dialogue[tier], type),
      );
      if (gaps.length) {
        warnings.push(
          `${id} has no "${type}" label at ${gaps.join("/")} — using archetype default`,
        );
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
