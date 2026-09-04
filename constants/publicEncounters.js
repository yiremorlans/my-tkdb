// Content and pure helpers for the public "call out" encounters
// (docs/public-encounters.md). Everything here is side-effect free and
// dependency-light so it can be unit tested without Discord or Supabase — the
// I/O lives in ../publicEncounters.js and ../encounterScheduler.js.

import {
  GENERAL_LOCATIONS,
  timeBucket,
  weightedBackgrounds,
} from "./backgrounds.js";
import { CHARACTERS, getFullName } from "./characters.js";
import {
  DIALOGUE,
  SHARED_ENCOUNTER_TEASERS,
  SHARED_MISSED_LINES,
  SHARED_WINNER_LINES,
  SHARED_WRONG_GUESS_LINES,
} from "./dialogue.js";

// --- tuning -----------------------------------------------------------------

// Plain constants, deliberately not environment variables: these are game
// balance, not deployment config, and they are the same in every server and
// every deployment. Retuning one is a code change and a redeploy, which is the
// same bar as changing any other number in constants/ (RELATIONSHIP_LEVELS, the
// per-character affinity values, GUESS_COOLDOWN_MS below).

// Bounds on the gap between one encounter and the next in a server. Each guild
// rolls its own gap inside this range, so servers drift apart rather than
// spawning in lockstep.
export const ENCOUNTER_MIN_MINUTES = 45;
export const ENCOUNTER_MAX_MINUTES = 180;

// How long a posted encounter stays callable before the moment passes. The
// scheduler tick must stay well under this — see encounterScheduler.js.
export const ENCOUNTER_WINDOW_MINUTES = 2;

// Consecutive failed channel POSTs before a guild is auto-disabled. A wrong
// permission or a deleted channel shouldn't have the scheduler retrying into
// the void every cadence forever; /encounters status reports this state so an
// admin can see the feature stopped rather than quietly doing nothing.
export const POST_FAILURE_LIMIT = 3;

// A /call win never moves affinity. It grants a pending boost worth this much
// extra on the winner's next /roam or /meet with that character. Any boosts
// stacked from multiple wins are all redeemed on that one interaction, not one
// per /roam — two wins is a single reunion worth +2, not two nudged responses.
export const ENCOUNTER_BOOST_GAIN = 1;
// ...and a user can hold at most this many unspent boosts per character. Wins
// past the cap still record a milestone; they just don't stack more boost.
export const ENCOUNTER_BOOST_CAP = 2;

// --- generation -------------------------------------------------------------

// Only the two "anyone could be here" public locations are in the pool.
// GENERAL_LOCATIONS also has ULTIO and CLEMENTIA; both are intentionally left
// out. Note GALAXY is the string 'Galaxy Express' — 'Galaxy' is not a key in
// BACKGROUNDS_BY_LOCATION and would silently yield an empty pool.
export const ENCOUNTER_LOCATIONS = [
  GENERAL_LOCATIONS.DARKWICK,
  GENERAL_LOCATIONS.GALAXY,
];

// --- teasers, misses and wrong guesses --------------------------------------
//
// All four /call content pools are authored in constants/dialogue/_shared.js
// alongside every other line in the game; only the picking lives here. They are
// re-exported under their old names so the pools stay reachable from one import
// (and so a test can assert on them without reaching into dialogue internals).
export const ENCOUNTER_TEASERS = SHARED_ENCOUNTER_TEASERS;
export const MISSED_LINES = SHARED_MISSED_LINES;
export const WRONG_GUESS_LINES = SHARED_WRONG_GUESS_LINES;

// A time-keyed pool ({ any, day, evening }) flattened for the hour in question:
// the always-valid lines plus that bucket's. Same merge rule as the `when:
// { time }` dialogue blocks — the bucket adds to the base pool, never replaces
// it — so a pool with an empty or missing bucket still has lines to draw from.
function timedPool(pools, now) {
  const bucket = timeBucket(now);
  return [...(pools.any || []), ...((bucket && pools[bucket]) || [])];
}

// The teaser for a fresh spawn. Evening draws the shadow-and-lamplight lines;
// during the day the same figure is lost in a crowd of students instead.
export function pickTeaser(now = new Date()) {
  return pickRandom(timedPool(SHARED_ENCOUNTER_TEASERS, now));
}

// The "moment has passed" line for a window that closed unsolved, keyed to the
// hour the same way.
export function pickMissedLine(now = new Date()) {
  return pickRandom(timedPool(SHARED_MISSED_LINES, now));
}

// --- winner lines -----------------------------------------------------------

// Collapses the six dialogue tiers onto the five registers the winner lines are
// authored at — "known" folds into "new" and the rest map straight through,
// mirroring RESPONSE_LABEL_TIER in characters.js. Add a bucket here, in
// WINNER_LINE_BUCKETS and in WINNER_LINES together.
const WINNER_LINE_TIER = {
  new: "new",
  known: "new",
  warm: "warm",
  spark: "spark",
  close: "close",
  bound: "bound",
};

// The registers a character's `winnerLines` may be keyed by (the values of
// WINNER_LINE_TIER, deduped). constants/validateContent.js walks every
// character's pool against this list, so a typo'd bucket is reported at startup
// rather than silently never being picked.
export const WINNER_LINE_BUCKETS = ["new", "warm", "spark", "close", "bound"];

// Every placeholder fillTemplate knows how to resolve. Anything else is filled
// with '' rather than left as literal braces, so an unknown one is a silent
// hole in a public message — validateContent treats it as an error.
export const WINNER_LINE_PLACEHOLDERS = ["user", "name", "firstName", "house"];

// Every placeholder a bond scene (docs/bond-scene-dms.md) may use — beats,
// choice prompt, closing lines and keepsake line alike. Frozen here beside the
// /call set so constants/validateContent.js has one place to check both, and
// resolved in bondScenes.js at delivery.
//
// Deliberately a different, smaller set than WINNER_LINE_PLACEHOLDERS: a scene
// is a DM, so there is nobody to @-mention ({user} would be noise in a
// one-to-one thread) and no third party to introduce the character to — they
// are already talking. What a scene gets instead is the player's own history
// with them:
//
//   {firstName}    the character
//   {house}        their house, or "Darkwick"
//   {timesMet}     character_relationships.times_met, as a bare number
//   {favResponse}  the response type this player leans on, as a noun phrase
//                  ("a joke") — FAV_RESPONSE_PHRASE in constants/game.js
//   {lastMoment}   the last /call moment collected with them, as the same noun
//                  phrase describeBoost uses ("that coffee")
//   {since}        how long since the last interaction, as a noun phrase
//                  ("a few days"), so it reads after "It's been ..."
export const BOND_SCENE_PLACEHOLDERS = [
  "firstName",
  "house",
  "timesMet",
  "favResponse",
  "lastMoment",
  "since",
];

// The fallback /call reveal pool, authored in constants/dialogue/_shared.js
// with the rest of the game's prose and re-exported here so every caller has
// one import for the feature. Used only where a character has no winnerLines
// of their own at the register in play (see winnerLinePool).
export const WINNER_LINES = SHARED_WINNER_LINES;

// Fills {user} / {name} / {house} / {firstName}. An unknown placeholder
// resolves to '' rather than being left as literal braces in a public message.
export function fillTemplate(raw, vars = {}) {
  return String(raw).replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? "");
}

// The lines a win at `bucket` can draw from. A character with authored
// `winnerLines` for that register draws from those *alone* — the generic pool
// is a fallback, not a mixer, so a reveal for an authored character always
// sounds like them rather than like the house-mission boilerplate. A character
// missing the register (or missing winnerLines entirely) falls back, which is
// why an unauthored roster addition still reveals correctly.
export function winnerLinePool(bucket, characterId) {
  const authored = DIALOGUE[characterId]?.winnerLines?.[bucket];
  if (Array.isArray(authored) && authored.length > 0) return authored;
  return [...WINNER_LINES.any, ...(WINNER_LINES[bucket] || WINNER_LINES.new)];
}

// `dialogueTier` is the winner's real tier (getDialogueTier). Returns the
// filled line for the reveal embed's description. `characterId` selects that
// character's authored pool; omitting it is the generic pool.
export function pickWinnerLine(dialogueTier, vars = {}, characterId = null) {
  const pool = winnerLinePool(winnerLineBucket(dialogueTier), characterId);
  return fillTemplate(pickRandom(pool), vars);
}

export function winnerLineBucket(dialogueTier) {
  return WINNER_LINE_TIER[dialogueTier] || "new";
}

// --- milestones -------------------------------------------------------------

// new < known < warm < spark < close < bound
const TIER_RANK = { new: 0, known: 1, warm: 2, spark: 3, close: 4, bound: 5 };

// The themed "what happened after" moment a win records. `minTier` gates it to
// a real relationship depth, so a spark milestone can never land for a caller
// who is still an Acquaintance. `bucket` only nudges selection toward the
// register the public winner line used — every tier-eligible entry stays
// reachable. `label` is the /affinity tally row, `afterline` the ephemeral win
// reply, `hint` the callback in the next boosted /roam.
// Ordered loosely by how much of a relationship each one implies, which is
// also `minTier` order. Gating is cumulative, so a Devoted player can still
// draw a coffee break — depth adds options rather than replacing them.
//
// `hint` is read after the words "picking up after", so it wants to be a noun
// phrase ("that coffee", not "you had coffee").
export const ENCOUNTER_MILESTONES = {
  // --- Stranger and up: public, no intimacy assumed ---
  signed_report: {
    minTier: "new",
    emoji: "📋",
    bucket: "any",
    label: "Caught them for a {house} report signature",
    afterline: "They signed your {house} report on the way past.",
    hint: "that report hand-off",
  },
  coffee_break: {
    minTier: "new",
    emoji: "☕",
    bucket: "new",
    label: "Coffee breaks together",
    afterline: "You both slipped off for a quick coffee after.",
    hint: "that coffee",
  },
  walked_to_class: {
    minTier: "new",
    emoji: "🎒",
    bucket: "new",
    label: "Walked to class the same way",
    afterline: "Turns out you were headed the same direction anyway.",
    hint: "that walk to class",
  },

  // --- Acquaintance and up: shared errands, still incidental ---
  library_study: {
    minTier: "known",
    emoji: "📚",
    bucket: "new",
    label: "Studied across the same library table",
    afterline: "You both had reading to do. The table was big enough.",
    hint: "that study session",
  },
  vending_machine: {
    minTier: "known",
    emoji: "🥤",
    bucket: "new",
    label: "Split whatever the vending machine gave up",
    afterline: "The machine ate your money, so they bought instead.",
    hint: "that vending machine run",
  },

  // --- Friend and up: choosing each other's company ---
  walked_back: {
    minTier: "warm",
    emoji: "🌙",
    bucket: "warm",
    label: "Walked back to the dorms together",
    afterline: "You walked back toward the dorms, in no hurry.",
    hint: "that walk back",
  },
  shared_umbrella: {
    minTier: "warm",
    emoji: "🌧️",
    bucket: "warm",
    label: "Shared an umbrella across the quad",
    afterline: "It started raining. One umbrella between you.",
    hint: "the umbrella",
  },
  festival_stall: {
    minTier: "warm",
    emoji: "🎏",
    bucket: "warm",
    label: "Ran a festival stall together",
    afterline: "You got roped into the same stall for the whole afternoon.",
    hint: "the festival",
  },
  shared_earbuds: {
    minTier: "warm",
    emoji: "🎧",
    bucket: "warm",
    label: "Shared a pair of earbuds on the Galaxy Express",
    afterline: "One earbud each, the whole way back.",
    hint: "that train ride",
  },

  // --- Close Friend and up: skipping things, going somewhere private ---
  skipped_briefing: {
    minTier: "spark",
    emoji: "🚪",
    bucket: "spark",
    label: "Skipped a {house} briefing with them",
    afterline:
      "Neither of you made the next briefing. Nobody came looking, either.",
    hint: "that briefing you both missed",
  },
  movie_night: {
    minTier: "spark",
    emoji: "🎬",
    bucket: "spark",
    label: "Watched a movie in {firstName}'s room",
    afterline:
      "There was a movie on in {firstName}'s room. You stayed for all of it.",
    hint: "that movie",
  },
  rooftop_lunch: {
    minTier: "spark",
    emoji: "🌇",
    bucket: "spark",
    label: "Ate lunch on the roof, away from everyone",
    afterline: "Lunch on the roof. Nobody knew where either of you were.",
    hint: "the roof",
  },

  // --- Confidant and up: hours nobody else gets ---
  stayed_up: {
    minTier: "close",
    emoji: "🌌",
    bucket: "close",
    label: "Stayed up talking past curfew",
    afterline: "You lost track of the hour completely.",
    hint: "last night",
  },
  late_drive: {
    minTier: "close",
    emoji: "🚗",
    bucket: "close",
    label: "Went out on a drive with nowhere to be",
    afterline: "They drove. Neither of you suggested turning back.",
    hint: "that drive",
  },

  // --- Devoted and up ---
  watched_sunrise: {
    minTier: "bound",
    emoji: "🌅",
    bucket: "bound",
    label: "Watched the sun come up together",
    afterline: "It got light out before either of you went home.",
    hint: "that sunrise",
  },
};

// `tier` is the winner's REAL dialogue tier (getDialogueTier), not the
// collapsed WINNER_LINE_TIER bucket — the bucket is passed separately and only
// biases the draw. Returns a key of ENCOUNTER_MILESTONES.
export function pickMilestone(tier, winnerBucket) {
  const rank = TIER_RANK[tier] ?? 0;
  const eligible = Object.entries(ENCOUNTER_MILESTONES).filter(
    ([, m]) => TIER_RANK[m.minTier] <= rank,
  );
  if (eligible.length === 0) return "signed_report";

  const weighted = eligible.flatMap(([id, m]) =>
    m.bucket === winnerBucket || m.bucket === "any" ? [id, id] : [id],
  );
  return pickRandom(weighted);
}

export function getMilestone(type) {
  return ENCOUNTER_MILESTONES[type] || null;
}

// --- name matching ----------------------------------------------------------

function normalizeGuess(input) {
  return String(input ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

// Every string that resolves to a character, built once. A candidate claimed by
// more than one character is dropped rather than resolved arbitrarily — the
// guess is then treated as unknown (no cooldown, no penalty) instead of
// silently punishing a genuinely ambiguous name.
const GUESS_INDEX = (() => {
  const claims = new Map(); // candidate -> Set of character ids

  const claim = (candidate, id) => {
    const norm = normalizeGuess(candidate);
    if (!norm) return;
    if (!claims.has(norm)) claims.set(norm, new Set());
    claims.get(norm).add(id);
  };

  for (const character of CHARACTERS) {
    claim(getFullName(character), character.id);
    claim(character.id, character.id);
    claim(character.firstName, character.id);
    if (character.lastName) {
      claim(character.lastName, character.id);
      // "Romeo Scorpius Lucci" is also reachable as just "lucci".
      claim(character.lastName.split(" ").pop(), character.id);
    }
    for (const alias of character.aliases || []) claim(alias, character.id);
  }

  const index = new Map();
  for (const [candidate, ids] of claims) {
    if (ids.size === 1) index.set(candidate, [...ids][0]);
  }
  return index;
})();

// Resolves a free-text guess to a character id, or null when it matches
// nothing. Exact match only — a typo resolves to nothing rather than
// fuzzy-matching someone the player didn't name.
export function matchCharacterGuess(input) {
  return GUESS_INDEX.get(normalizeGuess(input)) || null;
}

// --- wrong-guess cooldown ---------------------------------------------------

// A wrong *real name* costs the caller a short pause before their next attempt.
// Single app instance, so this Map is authoritative and the guess path needs no
// DB round trip; a deploy mid-encounter just hands everyone one extra retry.
// (docs/public-encounters.md §8 shows 30_000 in its snippet but says 10s in
// its prose and in the locked decision at §15.5 — 10s is the decision.)
export const GUESS_COOLDOWN_MS = 10_000;

const guessCooldown = new Map(); // `${encounterId}:${userId}` -> epoch ms

function cooldownKey(encounterId, userId) {
  return `${encounterId}:${userId}`;
}

// Milliseconds still to wait, or 0 if this user may guess again now.
export function getGuessCooldownRemaining(
  encounterId,
  userId,
  now = Date.now(),
) {
  const last = guessCooldown.get(cooldownKey(encounterId, userId));
  if (last === undefined) return 0;
  return Math.max(0, GUESS_COOLDOWN_MS - (now - last));
}

export function startGuessCooldown(encounterId, userId, now = Date.now()) {
  guessCooldown.set(cooldownKey(encounterId, userId), now);
}

// Called when an encounter resolves, and periodically from the scheduler tick.
// Encounter ids are unique across guilds, so a guild's entries never collide
// with another's.
export function clearGuessCooldowns(encounterId = null) {
  if (encounterId === null) {
    guessCooldown.clear();
    return;
  }
  const prefix = `${encounterId}:`;
  for (const key of guessCooldown.keys()) {
    if (key.startsWith(prefix)) guessCooldown.delete(key);
  }
}

// --- shared ----------------------------------------------------------------

export function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// Picks the background for a new encounter: a uniform draw over the two public
// location pools concatenated. weightedBackgrounds (not the bare
// getAvailableBackgrounds) is what /roam and /meet use, so this inherits their
// exact behaviour — `_PM` files excluded during the day, and repeated
// EVENING_PM_WEIGHT times in the evening so the pick is biased toward them.
export function pickEncounterBackground(now = new Date()) {
  const pool = [];
  for (const locationKey of ENCOUNTER_LOCATIONS) {
    for (const file of weightedBackgrounds(locationKey, now)) {
      pool.push({ locationKey, file });
    }
  }
  if (pool.length === 0) return null;
  return pickRandom(pool);
}

// 50/50 uniform vs casual. Elias, Mio and Shion have no casual art and Benkei
// has `work` rather than `casual`, so they fall back and always appear in
// uniform — documented, not a bug.
export function pickEncounterVariant(character) {
  const wanted = Math.random() < 0.5 ? "casual" : "uniform";
  if (character.images?.[wanted]) return wanted;
  if (character.images?.uniform) return "uniform";
  return Object.keys(character.images || {})[0] || "uniform";
}

// The whole random half of a spawn, in one call — the scheduler adds only the
// guild, timestamps and the composited image. Returns null if no background is
// eligible right now (never happens with the current pools, but the scheduler
// treats it as "skip this tick" rather than posting a broken encounter).
//
// `overrides` is only ever passed by the owner-only /encdev test command:
//   - characterId: force this character instead of a uniform random draw. An
//     id that matches nobody returns null (the caller surfaces that).
//   - variant: force 'uniform' | 'casual'; ignored if that character has no
//     such art, falling back to the normal 50/50 pick.
export function generateEncounter(now = new Date(), overrides = {}) {
  const spot = pickEncounterBackground(now);
  if (!spot) return null;

  let character;
  if (overrides.characterId) {
    character = CHARACTERS.find((c) => c.id === overrides.characterId);
    if (!character) return null;
  } else {
    character = pickRandom(CHARACTERS);
  }

  const variant = character.images?.[overrides.variant]
    ? overrides.variant
    : pickEncounterVariant(character);

  return {
    character,
    characterId: character.id,
    background: spot.file,
    locationKey: spot.locationKey,
    variant,
    teaser: pickTeaser(now),
  };
}

// The public message body for a fresh silhouette post. Dialogue is never baked
// into the image for this feature — the teaser and every flavor line live in
// the Discord message.
export function buildEncounterContent(teaser, expiresAt) {
  const expiresUnix = Math.floor(new Date(expiresAt).getTime() / 1000);
  return `${teaser}\n\nType \`/call <name>\` to reach them — you have until <t:${expiresUnix}:R>.`;
}
