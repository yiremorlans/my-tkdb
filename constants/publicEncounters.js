// Content and pure helpers for the public "call out" encounters
// (docs/public-encounters.md). Everything here is side-effect free and
// dependency-light so it can be unit tested without Discord or Supabase — the
// I/O lives in ../publicEncounters.js and ../encounterScheduler.js.

import { GENERAL_LOCATIONS, weightedBackgrounds } from "./backgrounds.js";
import { CHARACTERS, getFullName } from "./characters.js";

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

export const ENCOUNTER_TEASERS = [
  "You see a familiar figure in the distance… call out to them?",
  "Someone's standing just past the light. Do you know them?",
  "A silhouette lingers at the edge of the platform. Say a name?",
  "You catch a shape you recognize out of the corner of your eye.",
  "Someone you know is standing there, half in shadow.",
  "There's a figure up ahead. If you're quick, you could reach them!",
  "A shadow you almost recognize pauses on the walkway.",
  "Someone stops, just out of the light. You know that outline.",
  "A familiar shape waits at the far end of the corridor.",
  "There's a figure by the rail, not going anywhere yet.",
  "Someone slows down ahead of you, like they might be waiting.",
  "A silhouette cuts across the dark. You have seen them before.",
  "That outline is familiar. Call their name before they move on.",
  "Someone lingers where the light stops. Do you place them?",
  "A shape you recognize hesitates, half-turned away.",
];

// PATCHed in as the message content when a window closes unsolved — the
// silhouette is dropped alongside it and the name is never spoken.
export const MISSED_LINES = [
  "The moment has passed.",
  "They were gone before anyone could place them.",
  "The figure slips out of sight. Maybe next time.",
  "Whoever it was, they didn't wait around.",
  "You lost your chance this time.",
  "The shape dissolves back into the dark.",
];

// Only a wrong *real name* gets one of these (and starts the cooldown).
// Gibberish resolves to nothing and is answered with "I don't know who that
// is" — no cooldown, no penalty.
export const WRONG_GUESS_LINES = [
  "That's not them. They slip further away.",
  "No — the figure stays where they are.",
  "Wrong name. You feel the moment tightening.",
  "That isn't who's standing there.",
];

// --- winner lines -----------------------------------------------------------

// Collapses the six dialogue tiers onto the four registers the winner lines are
// authored at, mirroring RESPONSE_LABEL_TIER in characters.js. Add a bucket
// here and in WINNER_LINES together.
const WINNER_LINE_TIER = {
  new: "new",
  known: "new",
  warm: "warm",
  spark: "spark",
  close: "close",
  bound: "bound",
};

export const WINNER_LINES = {
  // House / mission themed — valid at any relationship tier, so these are
  // merged into every bucket's pool rather than replacing it.
  any: [
    "{user} flagged **{name}** down for a signature on the last **{house}** mission report.",
    "{user} caught **{name}** just before the next **{house}** briefing and pulled them aside.",
    "**{name}** was headed out on a **{house}** mission when {user} called out.",
    "{user} intercepted **{name}** between **{house}** missions — perfect timing.",
    "{user} caught **{name}** to sign off on the **{house}** anomaly report just in time.",
    "**{name}** turned at the sound of their name. {user} had a **{house}** mission to go over.",
    "{user} picked **{name}** out of the crowd and got to them first.",
    "{user} snagged **{name}** to walk through the **{house}** assignment.",
    "**{name}** almost vanished into the crowd, but {user} called it right and reeled them back for the **{house}** rundown.",
    "{user} matched the silhouette to **{name}** and waved them over before the **{house}** mission clock started.",
    "{user} caught up to **{name}** with a **{house}** dispatch order in hand.",
    "**{name}** stopped mid-step. {user} needed them for the **{house}** patrol roster.",
    "{user} logged **{name}** in for the **{house}** briefing with seconds to spare.",
    "The **{house}** debrief could wait — {user} had already called **{name}** over.",
    "{user} pinned down **{name}** between rounds of **{house}** business.",
  ],

  new: [
    "**{name}** doesn't quite place {user} yet, but stops anyway.",
    "{user} got a name out before **{name}** could disappear. A first, cautious nod.",
    "**{name}** studies {user} for a second, then decides they're worth a moment.",
    '"…Do I know you?" **{name}** asks — but they don\'t walk off. {user} guessed right.',
    "**{name}** gives {user} a measured look, then stays put.",
  ],

  warm: [
    "**{name}** breaks into an easy grin the second {user} calls out.",
    '"There you are." **{name}** falls into step beside {user} without missing a beat.',
    "{user} nailed the name and **{name}** laughs — caught, and not minding it.",
    "**{name}** was hoping it'd be {user}. The mission talk can wait a minute.",
    "**{name}** turns like they already knew it was {user}.",
  ],

  spark: [
    "**{name}** turns, sees {user}, and takes their time about answering.",
    "{user} says the name and **{name}**'s whole posture changes.",
    '"Of course it\'s you." **{name}** says it like {user} has been caught at something.',
    "**{name}** was already half-turned before {user} finished the name.",
    "{user} got there first, and **{name}** looks pleased about exactly that.",
  ],

  close: [
    "**{name}** would've known that voice anywhere. They cross straight to {user}.",
    "{user} barely finished the name before **{name}** was already turning, already smiling.",
    '"Took you long enough." **{name}** bumps {user}\'s shoulder and pretends the mission is why they stayed.',
    "**{name}** drops the debrief face entirely when it's {user} doing the calling.",
    "**{name}** was watching for {user} the whole time, if anyone asked. No one asked.",
  ],

  bound: [
    "**{name}** doesn't even look surprised — of course it's {user}. It's always {user}.",
    "{user} says the name and **{name}** is already there, mission report forgotten on the desk.",
    "\"You didn't have to guess. You know it's me.\" **{name}** takes {user}'s hand and the **{house}** briefing loses.",
    "**{name}** crosses to {user} like the rest of the room isn't there.",
    "The **{house}** paperwork hits the floor. **{name}** reached {user} first.",
  ],
};

// Fills {user} / {name} / {house} / {firstName}. An unknown placeholder
// resolves to '' rather than being left as literal braces in a public message.
export function fillTemplate(raw, vars = {}) {
  return String(raw).replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? "");
}

// `dialogueTier` is the winner's real tier (getDialogueTier). Returns the
// filled line for the reveal embed's description.
export function pickWinnerLine(dialogueTier, vars = {}) {
  const bucket = winnerLineBucket(dialogueTier);
  const pool = [
    ...WINNER_LINES.any,
    ...(WINNER_LINES[bucket] || WINNER_LINES.new),
  ];
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
    teaser: pickRandom(ENCOUNTER_TEASERS),
  };
}

// The public message body for a fresh silhouette post. Dialogue is never baked
// into the image for this feature — the teaser and every flavor line live in
// the Discord message.
export function buildEncounterContent(teaser, expiresAt) {
  const expiresUnix = Math.floor(new Date(expiresAt).getTime() / 1000);
  return `${teaser}\n\nType \`/call <name>\` to reach them — you have until <t:${expiresUnix}:R>.`;
}
