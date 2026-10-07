// Content and pure helpers for the public "call out" encounters
// (docs/public-encounters.md). Everything here is side-effect free and
// dependency-light so it can be unit tested without Discord or Supabase — the
// I/O lives in ../publicEncounters.js and ../encounterScheduler.js.

import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import {
  backgroundPool,
  GENERAL_LOCATIONS,
  timeBucket,
} from "./backgrounds.js";
import { CHARACTERS, getAffinityForResponse, getCharacterById, getFullName } from "./characters.js";
import { RELATIONSHIP_LEVELS } from "./game.js";
import { pickRandom } from "./random.js";
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
// extra on the winner's next /roam or /meet with that character, capped at
// ENCOUNTER_BOOST_CAP. The one exception is a call scene (§17), whose single
// click grants CALL_SCENE_GAIN directly in place of the boost.
export const ENCOUNTER_BOOST_GAIN = 1;
// ...and a user can hold at most this many unspent boosts per character. Wins
// past the cap still record a milestone; they just don't stack more boost.
// Lowered from 2 to 1 (2026-09): a fully-stacked boost was adding up to +2 on
// top of a best-case base response of 2 — literally doubling a diligent
// /call-farmer's best single-response gain. Capping at 1 halves that ceiling
// (+1 max, ~50% bump instead of 100%) without touching how often /call,
// /roam or /meet can be run — see the encounter-farming-threat-model memory.
export const ENCOUNTER_BOOST_CAP = 1;

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

// Maps each dialogue tier to the register its winner lines are authored at —
// one-to-one. "known" (Acquaintance) used to fold into "new", which had
// second-meeting winners drawing first-introduction lines ("Wait, you know my
// name?"); it has its own register so "new" can stay Stranger's alone.
// Add a bucket here, in
// WINNER_LINE_BUCKETS and in WINNER_LINES together.
const WINNER_LINE_TIER = {
  new: "new",
  known: "known",
  warm: "warm",
  spark: "spark",
  close: "close",
  bound: "bound",
};

// The registers a character's `winnerLines` may be keyed by (the values of
// WINNER_LINE_TIER, deduped). constants/validateContent.js walks every
// character's pool against this list, so a typo'd bucket is reported at startup
// rather than silently never being picked.
export const WINNER_LINE_BUCKETS = ["new", "known", "warm", "spark", "close", "bound"];

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
//   {sinceMet}     the month name of character_relationships.created_at — when
//                  this player first met the character at all, not their last
//                  interaction. A bare month ("March"), so it reads after
//                  "since" ("since March") or "It's been ... since {sinceMet}".
//                  The Close Friend anchor (docs/bond-scene-dms.md §5.2):
//                  the level that reaches back to when this all started, not
//                  just to the last time they talked. Not yet enforced —
//                  validateContent checks that a placeholder is *known*, not
//                  that a level carries its anchor.
export const BOND_SCENE_PLACEHOLDERS = [
  "firstName",
  "house",
  "timesMet",
  "favResponse",
  "lastMoment",
  "since",
  "sinceMet",
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
//
// `daytime` is the same hard swap pickDialogueEntry makes for a pmOnly
// character (Towa): he can't speak until evening, so a daytime reveal draws
// from his wordless `daytimeWinnerLines` instead. validateContent requires that
// pool at every register for a pmOnly character, so the swap never falls
// through to his spoken lines.
export function winnerLinePool(bucket, characterId, { daytime = false } = {}) {
  const content = DIALOGUE[characterId];
  const lines =
    daytime && content?.daytimeWinnerLines
      ? content.daytimeWinnerLines
      : content?.winnerLines;
  const authored = lines?.[bucket];
  if (Array.isArray(authored) && authored.length > 0) return authored;
  return [...WINNER_LINES.any, ...(WINNER_LINES[bucket] || WINNER_LINES.new)];
}

// `dialogueTier` is the winner's real tier (getDialogueTier). Returns the
// filled line for the reveal embed's description. `characterId` selects that
// character's authored pool; omitting it is the generic pool. `daytime` picks
// a pmOnly character's wordless pool (see winnerLinePool).
export function pickWinnerLine(
  dialogueTier,
  vars = {},
  characterId = null,
  { daytime = false } = {},
) {
  const pool = winnerLinePool(winnerLineBucket(dialogueTier), characterId, {
    daytime,
  });
  return fillTemplate(winnerLineText(pickRandom(pool)), vars);
}

// A winner-line entry is a plain line, or `{ line, responses }` for one that
// can also open a call scene (§17.7). Either way, this is its text (undefined
// for a malformed entry, which validateContent reports).
export function winnerLineText(entry) {
  return typeof entry === "string" ? entry : entry?.line;
}

export function winnerLineBucket(dialogueTier) {
  return WINNER_LINE_TIER[dialogueTier] || "new";
}

// --- call scenes ------------------------------------------------------------
//
// A rare interactive variant of the win reveal (docs/public-encounters.md §17):
// the character's expression portrait, an authored `line`, and three response
// buttons only the winner can press. Content is the character's own winner
// lines that carry `responses` (§17.7).

// The share of eligible wins that become a scene. Game balance, not deploy
// config, for the same reason as the tuning constants above.
export const CALL_SCENE_CHANCE = 0.07;

// The three authored buttons. `neutral` has no slot here: the date button
// takes it. Shuffled on every post and drawn in one style
// (CALL_SCENE_BUTTON_STYLE), so the winner can't tell which type is which.
export const CALL_SCENE_RESPONSES = ["kind", "playful", "bold"];

// One Discord button style (1, primary) for all three answers. The date button
// keeps the neutral grey, since it isn't an answer.
export const CALL_SCENE_BUTTON_STYLE = 1;

// What a click grants when it lands on the character's favorite or liked
// response; the least-liked one grants nothing. Replaces the win's boost, which
// a scene win doesn't get. An unanswered scene gets that boost back at the
// closeout instead (§17.6).
export const CALL_SCENE_GAIN = 1;

// The answers in a fresh random order for one post.
export function shuffledSceneResponses(random = Math.random) {
  const order = [...CALL_SCENE_RESPONSES];
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

// The fourth button. Shown at every tier, always disabled until the date
// feature exists; only its lock emoji changes (dateButtonLocked).
export const DATE_BUTTON_LABEL = "Ask on a date";
const DATE_UNLOCK_AFFINITY = RELATIONSHIP_LEVELS.find((l) => l.name === "Close Friend").min;

export function dateButtonLocked(affinity) {
  return (affinity ?? 0) < DATE_UNLOCK_AFFINITY;
}

// The opening face of every scene, before anyone clicks.
const SCENE_OPENING_FACE = "default";

// register -> base affinityByResponse rank (2 fave, 1 like, 0 flat) -> face.
// §17.4.1. Faces are derived, never authored, so a scene carries no face data.
// The same rank picks the click's reaction line (constants/reactions.js), so
// face and reaction always agree. `swap` never applies to a scene.
export const SCENE_FACES = {
  new: { 2: "close", 1: "sweat", 0: "annoyed" },
  known: { 2: "close", 1: "sweat", 0: "annoyed" },
  warm: { 2: "surprise_blush", 1: "surprise", 0: "serious" },
  spark: { 2: "blush", 1: "surprise_blush", 0: "close" },
  close: { 2: "full_smile_blush", 1: "full_smile", 0: "smile" },
  bound: { 2: "full_smile_blush", 1: "full_smile", 0: "smile" },
};

// Per-character slots that replace the table's face outright, keyed like it
// (register -> rank). Sparse: an unlisted slot keeps the table's face. Files
// are named for the drawing, never for the response type.
const BLUSH_FAVE = { warm: { 2: "blush" } };
const SCENE_FACE_OVERRIDES = {
  alan: { new: { 0: "serious" }, known: { 0: "serious" }, spark: { 2: "smile_blush" } },
  edward: { new: { 0: "serious" }, known: { 0: "serious" }, ...BLUSH_FAVE, spark: { 2: "smile_blush" } },
  haku: { new: { 0: "serious" }, known: { 0: "serious" }, ...BLUSH_FAVE },
  benkei: { warm: { 0: "surprise" } },
  rui: { known: { 2: "wink", 1: "smile" }, ...BLUSH_FAVE },
  kaito: { warm: { 2: "blush" }, spark: { 2: "lovestruck" } },
  haru: BLUSH_FAVE,
  jo: { warm: { 2: "wink" } },
  leo: { warm: { 2: "wink" } },
  lucas: BLUSH_FAVE,
  mio: BLUSH_FAVE,
  shohei: BLUSH_FAVE,
  subaru: BLUSH_FAVE,
  towa: BLUSH_FAVE,
  zenji: BLUSH_FAVE,
};

function mappedFace(characterId, bucket, rank) {
  return SCENE_FACE_OVERRIDES[characterId]?.[bucket]?.[rank] ?? SCENE_FACES[bucket]?.[rank];
}

// Faces with a second drawing, picked 50/50 wherever the map lands on them.
const SCENE_FACE_ALTERNATES = {
  ren: { blush: "blush_2" },
  romeo: { blush: "blush_2" },
};

// Outfits with their own face set: Jo's casual silhouette is his girl look,
// so every face of that encounter, the opening included, uses the _girl file.
// Read off the encounter row's variant, never authored on the scene.
const SCENE_VARIANT_SUFFIXES = {
  jo: { casual: "_girl" },
};

const EXPRESSIONS_DIR = join(
  dirname(fileURLToPath(import.meta.url)),
  "../assets/expressions",
);

// A response's rank in the character's base affinityByResponse: 2 favorite,
// 1 liked, 0 least. Shared by the face map, the click's reaction line and its
// gain.
export function baseRank(characterId, choice) {
  const character = getCharacterById(characterId);
  return character ? getAffinityForResponse(character, choice) : 0;
}

/**
 * The portrait file (in assets/expressions/<id>/) for a scene at `bucket`:
 * the opening face when `choice` is null, otherwise the face for that
 * response's base rank. `variant` is the encounter row's; `random` only
 * decides an alternate drawing.
 */
export function sceneFace(characterId, bucket, choice, { variant, random = Math.random } = {}) {
  let face = SCENE_OPENING_FACE;
  if (choice) {
    face = mappedFace(characterId, bucket, baseRank(characterId, choice)) ?? SCENE_OPENING_FACE;
    const alternate = SCENE_FACE_ALTERNATES[characterId]?.[face];
    if (alternate && random() < 0.5) face = alternate;
  }
  const suffix = SCENE_VARIANT_SUFFIXES[characterId]?.[variant] ?? "";
  return `${face}${suffix}.png`;
}

// Every file sceneFace can return for this character at this register, across
// all of their outfits and alternates. The art gate and validateContent both
// check against it.
export function sceneFaceFiles(characterId, bucket) {
  const ranks = Object.keys(SCENE_FACES[bucket] || {});
  const faces = [SCENE_OPENING_FACE, ...ranks.map((rank) => mappedFace(characterId, bucket, rank))];
  for (const face of [...faces]) {
    const alternate = SCENE_FACE_ALTERNATES[characterId]?.[face];
    if (alternate) faces.push(alternate);
  }
  const suffixes = ["", ...Object.values(SCENE_VARIANT_SUFFIXES[characterId] || {})];
  return [...new Set(suffixes.flatMap((s) => faces.map((f) => `${f}${s}.png`)))];
}

// The art only changes with a deploy, so each answer is checked once.
const artReadyCache = new Map();

// Whether every face the map can produce at `bucket` exists on disk. Guards a
// character added to the roster before their expression art lands.
export function callSceneArtReady(characterId, bucket, expressionsDir = EXPRESSIONS_DIR) {
  const key = `${expressionsDir}:${characterId}:${bucket}`;
  if (!artReadyCache.has(key)) {
    artReadyCache.set(
      key,
      sceneFaceFiles(characterId, bucket).every((file) =>
        fs.existsSync(join(expressionsDir, characterId, file)),
      ),
    );
  }
  return artReadyCache.get(key);
}

/**
 * Roll for a scene on a win. Returns `{ bucket, scene }`, the scene being a
 * `{ line, responses }` winner line drawn exactly as the normal reveal draws
 * one (winnerLinePool, daytime swap included), or null for the normal reveal:
 * a miss on CALL_SCENE_CHANCE, a line from the shared fallback pool (the only
 * pool without button labels), or a face missing from the art. Every
 * character's own winner line carries labels (validateContent), so the rate is
 * CALL_SCENE_CHANCE whatever the pool's size. `force` (/encdev spawn
 * scene:true) skips only the roll.
 */
export function pickCallScene(
  dialogueTier,
  characterId,
  { daytime = false, force = false, expressionsDir } = {},
) {
  if (!force && Math.random() >= CALL_SCENE_CHANCE) return null;
  const bucket = winnerLineBucket(dialogueTier);
  const scene = pickRandom(winnerLinePool(bucket, characterId, { daytime }));
  if (!scene?.responses) return null;
  if (!callSceneArtReady(characterId, bucket, expressionsDir)) return null;
  return { bucket, scene };
}

// --- milestones -------------------------------------------------------------

// Content and picking live in ./milestones/ (shared.js is the default campus
// set, one file per character with their own). Re-exported here so the
// encounter code keeps a single import for the feature.
export {
  ENCOUNTER_MILESTONES,
  getMilestone,
  milestonePoolFor,
  pickMilestone,
} from "./milestones/index.js";

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

export { pickRandom };

// Picks the background for a new encounter: a uniform draw over the two public
// location pools concatenated. weightedBackgrounds (not the bare
// getAvailableBackgrounds) is what /roam and /meet use, so this inherits their
// exact behaviour — `_PM` files excluded during the day, and repeated
// EVENING_PM_WEIGHT times in the evening so the pick is biased toward them.
export function pickEncounterBackground(now = new Date()) {
  const pool = backgroundPool(ENCOUNTER_LOCATIONS, now);
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
  // The character is the encounter, drawn uniformly — every character has the
  // same odds every spawn. The background is picked afterward and completely
  // independently: it's only the setting the silhouette stands in, never scoped
  // to the character and never a hint toward who they are. The two draws
  // commute; character goes first purely so this reads in intent order.
  let character;
  if (overrides.characterId) {
    character = CHARACTERS.find((c) => c.id === overrides.characterId);
    if (!character) return null;
  } else {
    character = pickRandom(CHARACTERS);
  }

  const spot = pickEncounterBackground(now);
  if (!spot) return null;

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
  return `${teaser}\n\nType \`/call <name>\` to reach them. You have until <t:${expiresUnix}:R>.`;
}
