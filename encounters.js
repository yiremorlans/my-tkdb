import {
  ButtonStyleTypes,
  InteractionResponseFlags,
  MessageComponentTypes,
} from 'discord-interactions';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { EPHEMERAL as EPHEMERAL_FLAG } from './utils.js';
import {
  getRandomBackgroundForCharacter,
  getRandomGeneralBackground,
  getLocationDisplayName,
  turfSpots,
  TURF_PROBABILITY,
} from './constants/backgrounds.js';
import {
  CHARACTERS,
  generateCharacterResponses,
  getAffinityForResponse,
  getCharacterById,
  getFullName,
  getRandomCharacterImageVariant,
  getRandomDialogueBeat,
  getRandomDialogueEntry,
  RESPONSE_TYPES,
} from './constants/characters.js';
import {
  CASUAL_IMAGE_PROBABILITY_BY_LEVEL,
  MEET_OPTION_COUNT,
  RESPONSE_STYLES,
  RESPONSE_TYPE_ORDER,
  getDialogueTier,
  getRelationshipLevel,
  getRelationshipProgress,
  renderHeartBar,
} from './constants/game.js';
import { getReactionLine } from './constants/reactions.js';
import { WARDING_CARDS, wardingCardWritten } from './constants/warding/index.js';
import { composeEncounter, composeWardingCard } from './imageComposition.js';
import { recordResponse } from './storage.js';
// readRelationship is the non-creating read. A character being shown —
// via /affinity, /house, a /roam encounter, or a /meet pick — is only a
// preview and must not insert a relationship row. Only recordResponse
// (the user actually picking a reply) counts as a real "meeting" and
// creates/updates the row, atomically, via getOrCreateRelationship.
import {
  consumeAllEncounterBoosts,
  getActiveErrandBoost,
  getEncounterMilestoneCounts,
  getLatestEncounterMilestone,
  getRelationship as readRelationship,
  getUserRelationships,
  signErrandTarget,
} from './db/supabase.js';
import {
  ENCOUNTER_BOOST_GAIN,
  ENCOUNTER_MILESTONES,
  fillTemplate,
  getMilestone,
  pickRandom,
} from './constants/publicEncounters.js';
import { ERRAND_ROAM_TARGET_BIAS } from './constants/missions.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function pickRandomDistinct(list, count) {
  const pool = [...list];
  const picked = [];
  while (pool.length && picked.length < count) {
    const index = Math.floor(Math.random() * pool.length);
    picked.push(pool.splice(index, 1)[0]);
  }
  return picked;
}

function getImageVariant(character, levelName) {
  const probability = CASUAL_IMAGE_PROBABILITY_BY_LEVEL[levelName] || 0;
  const useCasual = Math.random() < probability && character.images.casual;

  let variant = useCasual ? 'casual' : 'uniform';

  if (!character.images[variant]) {
    variant = Object.keys(character.images)[0] || 'uniform';
  }

  return variant;
}

// Affinity → level → dialogue tier → image variant for this user and
// character, in one shot — the same derivation /roam (buildRoamDialogueMessage)
// and /meet (buildMeetSpawnMessage) both need before drawing a line.
async function getCharacterProgress(userId, character) {
  const affinity = (await readRelationship(userId, character.id))?.affinity || 0;
  const level = getRelationshipLevel(affinity);
  const tier = getDialogueTier(level.name);
  const variant = getImageVariant(character, level.name);
  return { level, tier, variant };
}

// Pick where an already-chosen character is found. Their own turf most of the
// time, a general location otherwise; a character with no eligible turf right
// now falls through to general rather than returning nothing.
function selectRoamSpot(character, now) {
  if (Math.random() < TURF_PROBABILITY) {
    const turf = turfSpots(character, now);
    if (turf.length) return pickRandom(turf);
  }
  return getRandomGeneralBackground(now);
}

// `origin` ('meet' | 'roam') rides along in the custom_id so the response
// click can be logged against the command that started the flow — the flow is
// only counted once, at the response step (see the 'resp' handler in app.js).
// `beatResponses` is the { kind, playful, bold, neutral } labels off the
// specific beat that was drawn — see getRandomDialogueBeat (/roam) and
// getRandomDialogueEntry (/meet). It is the only source of character-specific
// labels; without one every button falls to its archetype default, which is
// what the disabled re-render at the result step does.
function responseActionRow(characterId, disabled = false, origin = 'meet', beatResponses = null) {
  const character = getCharacterById(characterId);
  const characterResponses = character
    ? generateCharacterResponses(character, beatResponses)
    : {};

  return RESPONSE_TYPE_ORDER.map((responseType) => {
    const option = characterResponses[responseType] || { label: 'Respond' };
    return {
      type: MessageComponentTypes.ACTION_ROW,
      components: [
        {
          type: MessageComponentTypes.BUTTON,
          style: RESPONSE_STYLES[responseType],
          label: option.label,
          custom_id: `resp:${characterId}:${responseType}:${origin}`,
          disabled,
        },
      ],
    };
  });
}

// Grey out a set of components exactly as they were shown. Response labels are
// picked at random per encounter, so re-deriving the row for the result message
// would show the player a different set of buttons than the one they clicked.
function disableComponents(rows) {
  if (!rows?.length) return null;
  return rows.map((row) => ({
    ...row,
    components: (row.components || []).map((button) => ({ ...button, disabled: true })),
  }));
}

// --- errand targeting -------------------------------------------------------

// A user holding a scheduled errand (docs/scheduled-missions.md §5) has to run
// into N *specific* students inside 48h, against a shared 3-hour cooldown. At
// 26 characters and a four-option picker that is close to hopeless unheld, so
// their still-unsigned targets are boosted in their own /roam and /meet while
// the errand is open.
//
// The boost changes only WHO appears. It never touches the cooldown, and it is
// entirely per-user — each builder looks up the invoking user's own errand, so
// nothing here is global state and nobody else's rolls move.
//
// Read failures degrade to "no boost" rather than failing the command: a
// missions outage must not take /roam and /meet down with it.
async function unsignedErrandTargets(userId) {
  if (!userId) return [];
  try {
    const boost = await getActiveErrandBoost(userId);
    return boost?.unsignedTargetIds || [];
  } catch (err) {
    console.error('Error reading errand boost:', err);
    return [];
  }
}

// --- /roam ---------------------------------------------------------------

function generateEncounterId() {
  return `roam_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// In-memory, single-instance (same assumption encounterScheduler.js makes):
// a /roam pick lives 5 minutes between the "approach" prompt and the click
// that spawns it, so it never needs to survive a redeploy. Keyed by
// encounterId; pruned lazily on access rather than on a timer, since nothing
// here needs to reclaim memory on a schedule.
const roamCache = new Map();

function pruneExpiredRoamCache(now = Date.now()) {
  for (const [id, entry] of roamCache) {
    if (entry.expiry <= now) roamCache.delete(id);
  }
}

function cacheRoamEncounter(encounterId, data) {
  pruneExpiredRoamCache();
  roamCache.set(encounterId, { ...data, expiry: Date.now() + 5 * 60 * 1000 });
}

export function getCachedRoamEncounter(encounterId) {
  pruneExpiredRoamCache();
  const entry = roamCache.get(encounterId);
  if (!entry) return null;

  const { expiry, ...data } = entry;
  return data;
}

export async function buildRoamDialogueMessage(userId, now = new Date()) {
  // Character first, setting second — the same order /meet uses. This used to
  // draw the location first and then pick among whoever was attributed to it,
  // which made P(character) an accident of three unrelated things: how many
  // backgrounds their house happened to have, how many housemates shared it,
  // and whether they owned a private room. Drawing the character first makes it
  // exactly 1/CHARACTERS.length for everyone, and leaves the setting free to be
  // weighted however the flavor wants (TURF_PROBABILITY, signature spots, the
  // evening _PM bias) without any of it bending who shows up.
  //
  // Uniform over the whole roster, unless this user is holding an errand — see
  // unsignedErrandTargets. ERRAND_ROAM_TARGET_BIAS of the time the roll is
  // steered to somebody they still need; the rest of the time it is the same
  // 1/CHARACTERS.length draw as always, so /roam still surprises them.
  const errandTargets = await unsignedErrandTargets(userId);
  const character =
    errandTargets.length && Math.random() < ERRAND_ROAM_TARGET_BIAS
      ? getCharacterById(pickRandom(errandTargets)) || pickRandom(CHARACTERS)
      : pickRandom(CHARACTERS);

  const spot = selectRoamSpot(character, now);
  if (!spot) {
    return {
      content: 'You wander for a while, but nowhere seems worth stopping at.',
      flags: EPHEMERAL_FLAG,
    };
  }

  const { tier, variant } = await getCharacterProgress(userId, character);
  const dialogueCtx = {
    now,
    locationKey: spot.locationKey,
    backgroundFile: spot.file,
    event: null, // no event system yet — reserved for `when: { event }` rules
  };
  // Drawn together, not independent picks — the approach button, the payoff
  // caption, and the four response buttons all answer the same line the
  // player just read (see getRandomDialogueBeat). The payoff image's caption
  // is the beat's own `greeting`, with no second draw behind it: every
  // drawable beat carries one. `responses` carries the beat's four
  // button labels; a type the beat leaves out drops to the archetype default.
  const {
    line: dialogue,
    approach,
    greeting,
    responses: beatResponses,
  } = getRandomDialogueBeat(character, tier, variant, dialogueCtx);

  const charFilename = character.images[variant];

  const encounterId = generateEncounterId();
  cacheRoamEncounter(encounterId, {
    spot,
    characterId: character.id,
    charFilename,
    dialogue,
    greeting,
    beatResponses,
  });

  return {
    content: `*${dialogue}*`,
    components: [
      {
        type: MessageComponentTypes.ACTION_ROW,
        components: [
          {
            type: MessageComponentTypes.BUTTON,
            style: ButtonStyleTypes.PRIMARY,
            label: approach,
            custom_id: `roam:spawn:${encounterId}`,
          },
        ],
      },
    ],
    flags: EPHEMERAL_FLAG,
  };
}

export async function buildRoamSpawnMessage(encounterId) {
  const encounter = getCachedRoamEncounter(encounterId);
  if (!encounter) {
    return {
      content: 'The moment has passed.',
      flags: EPHEMERAL_FLAG,
    };
  }

  const { spot, characterId, charFilename, greeting, beatResponses } = encounter;
  const character = getCharacterById(characterId);
  const imageBuffer = await composeEncounter(spot.file, charFilename, greeting);

  return {
    content: `You wander into **${getLocationDisplayName(spot)}** and run into **${getFullName(character)}**...`,
    files: [{ attachment: imageBuffer, name: 'encounter.png' }],
    components: responseActionRow(character.id, false, 'roam', beatResponses),
    flags: EPHEMERAL_FLAG,
  };
}

// --- warding cards ---------------------------------------------------------
//
// PHASE 1 ONLY (as of 2026-09-20): these builders render a warding card, and
// nothing in /roam or /meet calls them. The only caller is the owner-only
// /encdev warding preview (publicEncounters.js). Phase 2 — rolling
// WARDING_CHANCE for every player during /roam and /meet, and the pity counter
// behind it — is deferred and unbuilt; see docs/warding-cards.md §9. Until it
// lands, no player can encounter one of these, nothing here grants affinity,
// and no pity counter exists to move.
//
// The rare outcome /roam and /meet can land on (docs/warding-cards.md). These
// three builders are the roam builders with a different base image and a
// different message format, and they read a card exactly the way the roam
// builders read a dialogue beat: `line` is the step-1 text, `approach` labels
// the button that reveals it, `greeting` is painted into the art, and the
// picked response's `close` replaces the buttons.
//
// COMPONENTS V2, ON THE TEXT MESSAGES ONLY. Unlike every other message this
// app sends, the two warding text messages — step 1 (`line` + approach button)
// and step 3 (`close`) — are built with Discord's V2 component tree
// (IS_COMPONENTS_V2, 1 << 15) rather than `content` + `embeds`. The art message
// between them (step 2) is a plain V1 message: the composed PNG as an
// attachment with the response buttons under it, exactly like a /roam reveal.
// The flag is fixed at creation and an edit cannot drop it, so V2 is kept off
// the art by making each step its own message: step 2 is a followup to the
// step-1 click, and step 3's `close` is a followup to the response click while
// the step-2 message is edited to remove its buttons. The green approach
// button plus its sparkle is the "this one is rare" signal, and it costs the
// player nothing to read: the encounter still plays exactly like a /roam.
//
// The V2 rule the two text builders have to respect: a V2 message must NOT
// carry `content` or `embeds`. Every string is a TEXT_DISPLAY component
// instead. Discord rejects the message otherwise.

// EPHEMERAL, plus the opt-in to the V2 component tree. Only the step-1 and
// step-3 text messages carry this; the art message is plain EPHEMERAL_FLAG.
export const WARDING_MESSAGE_FLAGS =
  EPHEMERAL_FLAG | InteractionResponseFlags.IS_COMPONENTS_V2;

// The approach button. Deliberately NOT the PRIMARY blurple a /roam approach
// button uses — the step-1 message is otherwise identical in shape to a normal
// encounter, so the colour swap plus the sparkle is what tells the player this
// one is different before any art has loaded. SUCCESS is the pick because the
// other three styles are all spoken for on the response row that follows
// (kind/playful/bold/neutral -> RESPONSE_STYLES), and green is the only one
// that never reads as a warning.
const WARDING_APPROACH_STYLE = ButtonStyleTypes.SUCCESS;

// Unicode, not a guild emoji: this app is dual-install and a custom emoji
// would render as a broken box for anyone using it outside the home server.
// It sits on the button's `emoji` field rather than inside `label`, so it
// costs none of the 30 characters a label is allowed.
const WARDING_SPARKLE = { name: '✨' };

const WARDING_IMAGE_NAME = 'warding.png';

// kind / playful / bold in the order RESPONSE_TYPE_ORDER shows them, minus the
// NEUTRAL a warding card never offers. Derived rather than hardcoded so the
// three warding buttons can never drift out of order with a normal response
// row; index.js already guarantees a written card has exactly these keys.
const WARDING_RESPONSE_ORDER = RESPONSE_TYPE_ORDER.filter(
  (type) => type !== RESPONSE_TYPES.NEUTRAL,
);

// Grey out every button in a V2 component tree. Used for the ack that disables
// the approach button the moment it is clicked — which, on a V2 message, has to
// re-send the whole tree rather than a `content` + rows pair.
export function disableWardingButtons(components) {
  return (components || []).map((component) => {
    if (component.type === MessageComponentTypes.BUTTON) {
      return { ...component, disabled: true };
    }
    if (Array.isArray(component.components)) {
      return { ...component, components: disableWardingButtons(component.components) };
    }
    return component;
  });
}

// The three response buttons, kind / playful / bold. Colours come from
// RESPONSE_STYLES exactly as a normal encounter's do — a warding pick means
// the same thing a normal pick means, so it should not be recoloured — and
// there is no NEUTRAL fourth (docs/warding-cards.md §3).
function wardingResponseRows(cardKey, responses) {
  return WARDING_RESPONSE_ORDER.filter((key) => responses[key]).map((key) => ({
    type: MessageComponentTypes.ACTION_ROW,
    components: [
      {
        type: MessageComponentTypes.BUTTON,
        style: RESPONSE_STYLES[key],
        label: responses[key].label,
        custom_id: `ward:resp:${cardKey}:${key}`,
      },
    ],
  }));
}

/**
 * Step 1: the card's `line` as text, plus the single sparkle button that
 * reveals it. Parallel to buildRoamDialogueMessage's return, but V2.
 *
 * `card` is a WARDING_CARDS entry carrying its own `key` (what
 * pickWardingCardForCharacter returns).
 *
 * RETURNS NULL if the card cannot be rendered, and the caller MUST fall back
 * to the normal encounter when it does — the player is owed the encounter
 * they invoked, and a warding card that was never shown has to count as a
 * miss in every respect, including pity (docs/warding-cards.md §4). Returning
 * a "nothing here" message instead would be the worst of both: the player
 * loses the encounter AND the caller, which by this point has already decided
 * the roll was a hit, goes on to treat it as a card shown.
 *
 * This is also why nothing here writes pity. The refill belongs to the write
 * that records the player's response (§9), which only a rendered card can
 * ever reach; deciding a hit moves nothing on its own.
 */
export function buildWardingDialogueMessage(card) {
  // An unwritten stub has no line, no approach label and no responses, so it
  // would render as an empty text block over a label-less button — which
  // Discord rejects outright. The draw cannot produce one (eligibleWardingCards
  // filters stubs out, which is the soft-rollout gate), so reaching here with
  // one is a bug in the caller: loud in the log, invisible to the player, who
  // just gets the ordinary encounter.
  if (!wardingCardWritten(card)) {
    console.error(
      `[warding] refusing to render unwritten card "${card?.key ?? '(no key)'}" — ` +
        'falling back to a normal encounter',
    );
    return null;
  }

  const encounterId = generateEncounterId();
  cacheRoamEncounter(encounterId, { wardingCardKey: card.key });

  return {
    flags: WARDING_MESSAGE_FLAGS,
    components: [
      { type: MessageComponentTypes.TEXT_DISPLAY, content: card.line },
      {
        type: MessageComponentTypes.ACTION_ROW,
        components: [
          {
            type: MessageComponentTypes.BUTTON,
            style: WARDING_APPROACH_STYLE,
            label: card.approach,
            emoji: WARDING_SPARKLE,
            custom_id: `ward:spawn:${encounterId}`,
          },
        ],
      },
    ],
  };
}

/**
 * Step 2: the art, with `greeting` painted into its dialogue box, plus the
 * three response buttons. Parallel to buildRoamSpawnMessage.
 *
 * No location line and no "you run into X" header: a warding card is not a
 * place on the map, and naming the character would duplicate what the art
 * already says.
 */
export async function buildWardingSpawnMessage(encounterId) {
  const encounter = getCachedRoamEncounter(encounterId);
  const card = encounter?.wardingCardKey
    ? WARDING_CARDS[encounter.wardingCardKey]
    : null;
  if (!card) {
    return { content: 'The moment has passed.', flags: EPHEMERAL_FLAG };
  }

  const imageBuffer = await composeWardingCard(card.file, card.greeting);

  return {
    files: [{ attachment: imageBuffer, name: WARDING_IMAGE_NAME }],
    // Plain V1: the attachment is the art, with nothing but the buttons under
    // it. Deliberately not V2 (see the header above).
    flags: EPHEMERAL_FLAG,
    components: wardingResponseRows(encounter.wardingCardKey, card.responses),
  };
}

/**
 * The edit that ends step 2: the response buttons come off the art message and
 * nothing else changes. `attachments` is left out so the uploaded card image
 * stays on the message.
 */
export function buildWardingPickedUpdate() {
  return { components: [], flags: EPHEMERAL_FLAG };
}

/**
 * Step 3: the picked response's `close`, as its own V2 text message sent under
 * the art. The art message itself is not touched here — buildWardingPickedUpdate
 * strips its buttons — so no V2 flag ever lands on the image.
 *
 * Pure rendering: the affinity grant, the pity refill and the errand signature
 * all belong to the caller (docs/warding-cards.md §9), which passes whatever
 * it wrote in as `deltaLine` — the same "+2 — 💖 Close Friend" line a normal
 * encounter puts under its reaction.
 */
export function buildWardingResultMessage(cardKey, responseKey, deltaLine = null) {
  const card = WARDING_CARDS[cardKey];
  const response = card?.responses?.[responseKey];
  if (!response) {
    return { content: 'The moment has passed.', flags: EPHEMERAL_FLAG };
  }

  const text = [response.close, deltaLine].filter(Boolean).join('\n\n');

  return {
    flags: WARDING_MESSAGE_FLAGS,
    components: [{ type: MessageComponentTypes.TEXT_DISPLAY, content: text }],
  };
}

// --- /meet -----------------------------------------------------------------

/**
 * The /meet picker. `userId` is only used to look up an active errand: its
 * still-unsigned targets take guaranteed slots in the list, and the remaining
 * slots fill at random as before. Four unsigned targets means every slot is a
 * target; one means one slot is.
 *
 * The seeded targets are shuffled in with the rest so their position never
 * telegraphs which of the four is the one the mission wants.
 *
 * `candidates` bypasses all of it (tests, and the disabled re-render).
 */
export async function buildMeetPickMessage(userId = null, candidates = null, disabled = false) {
  let chars = candidates;

  if (!chars) {
    const targets = (await unsignedErrandTargets(userId))
      .map((id) => getCharacterById(id))
      .filter(Boolean)
      .slice(0, MEET_OPTION_COUNT);

    const seededIds = new Set(targets.map((character) => character.id));
    const rest = pickRandomDistinct(
      CHARACTERS.filter((character) => !seededIds.has(character.id)),
      MEET_OPTION_COUNT - targets.length,
    );

    chars = pickRandomDistinct([...targets, ...rest], MEET_OPTION_COUNT);
  }

  return {
    content: 'A few familiar faces catch your eye. Who do you want to meet?',
    components: [
      {
        type: MessageComponentTypes.ACTION_ROW,
        components: chars.map((character) => ({
          type: MessageComponentTypes.BUTTON,
          style: ButtonStyleTypes.SECONDARY,
          label: getFullName(character),
          custom_id: `meet:pick:${character.id}`,
          disabled,
        })),
      },
    ],
    flags: EPHEMERAL_FLAG,
  };
}

export async function buildMeetSpawnMessage(userId, characterId, now = new Date()) {
  const character = getCharacterById(characterId);
  if (!character) {
    return {
      content: 'They seem to have wandered off already.',
      flags: EPHEMERAL_FLAG,
    };
  }

  // Pools the character's house and exclusive room together (see
  // getRandomBackgroundForCharacter) so /meet can now land in either —
  // previously this only ever considered the house. Falls back to a
  // general location only for a character with neither (e.g. Benkei).
  const spot = getRandomBackgroundForCharacter(character, now);
  const fallbackSpot = spot || getRandomGeneralBackground(now);

  const { tier, variant } = await getCharacterProgress(userId, character);
  const dialogueCtx = {
    now,
    locationKey: fallbackSpot?.locationKey ?? null,
    backgroundFile: fallbackSpot?.file ?? null,
    event: null,
  };
  // Same single pick as /roam's getRandomDialogueBeat, minus the
  // approach/greeting resolution /meet doesn't render — `line` and
  // `responses` come from the one drawn beat, never two independent draws
  // (see getRandomDialogueEntry).
  const { line: dialogue, responses: beatResponses } = getRandomDialogueEntry(
    character,
    tier,
    variant,
    dialogueCtx,
  );

  const charFilename = character.images[variant];

  const imageBuffer = await composeEncounter(fallbackSpot.file, charFilename, dialogue);

  const locationText = fallbackSpot ? ` at **${getLocationDisplayName(fallbackSpot)}**.` : '.';

  return {
    content: `${getFullName(character)} agrees to meet you${locationText}`,
    files: [{ attachment: imageBuffer, name: 'encounter.png' }],
    components: responseActionRow(character.id, false, 'meet', beatResponses),
    flags: EPHEMERAL_FLAG,
  };
}

// --- dialogue response -------------------------------------------------------

export async function buildResponseResultMessage(
  userId,
  characterId,
  responseTypeId,
  shownComponents = null,
) {
  const character = getCharacterById(characterId);
  if (!character) {
    return {
      content: 'They seem to have wandered off already.',
      flags: EPHEMERAL_FLAG,
    };
  }

  const baseGain = getAffinityForResponse(character, responseTypeId);

  // A /call win never moves affinity itself — it leaves a pending boost that
  // the next authored response with that character spends. Consumed *before*
  // the write so the bonus folds into one affinity update: if that update
  // then fails the user is out the boost, which is far better than the other
  // ordering, where a failure would leave a spent boost still claimable. A
  // NEUTRAL response (gain 0) still consumes it — the warmer welcome is the
  // reunion, not the reply they picked.
  let boostsSpent = 0;
  try {
    boostsSpent = await consumeAllEncounterBoosts(userId, characterId);
  } catch (err) {
    console.error('Error consuming encounter boosts:', err);
  }

  const gain = baseGain + boostsSpent * ENCOUNTER_BOOST_GAIN;
  const { level, leveledUp } = await recordResponse(userId, characterId, gain, responseTypeId);

  const reaction = getReactionLine(
    character,
    getDialogueTier(level.name),
    responseTypeId,
    baseGain,
  );

  const delta = gain > 0 ? `+${gain}` : `${gain}`;
  let deltaLine = `${delta} — ${level.emoji ? `${level.emoji} ` : ''}**${level.name}**`;

  // Neither read depends on the other, so they go out together — the boost
  // suffix only when a boost was actually spent, same as before.
  //
  // The one point where a "meeting" becomes real is also the point an errand
  // signature is earned (docs/scheduled-missions.md §5). A /roam that happened
  // to surface a target counts exactly as much as a deliberate /meet.
  const [boostSuffix, signatureLine] = await Promise.all([
    boostsSpent > 0 ? describeBoost(userId, character, boostsSpent) : null,
    maybeSignErrandTarget(userId, characterId),
  ]);

  if (boostSuffix) {
    deltaLine += `  ·  *${boostSuffix}*`;
  }

  return {
    content: [`${reaction}\n${deltaLine}`, signatureLine].filter(Boolean).join('\n'),
    components: disableComponents(shownComponents) || responseActionRow(characterId, true),
    flags: EPHEMERAL_FLAG,
    // Not part of the message — the crossing, for app.js to act on after the
    // reply has gone out. A bond scene is a DM (docs/bond-scene-dms.md) and the
    // interaction must not wait on Discord's DM endpoints, so this is
    // deliberately data rather than a call made from in here. `level` is where
    // the user landed, and since a single gain can never clear two bands that
    // is always exactly one step above where they were.
    levelUp: leveledUp ? { characterId, levelName: level.name } : null,
  };
}

/**
 * Sign this character off, if the user is holding an errand that still wants
 * them. Returns the line to append to the response message, or null.
 *
 * Signatures flip here, silently and automatically, but the errand is NOT filed
 * until the holder clicks Complete mission in `/docs` — the "return to base and
 * do the paperwork" beat, and the reason the mission slot stays occupied until
 * they do.
 *
 * Never throws: a mission-side failure must not cost the player the affinity
 * they just earned, which is already written by this point.
 */
async function maybeSignErrandTarget(userId, characterId) {
  try {
    // One round trip, whether or not there is an errand behind this response —
    // and for almost every response there isn't. The RPC resolves the user's
    // held errand, checks this character is a still-unsigned target and flips
    // it, all in the one conditional statement.
    const progress = await signErrandTarget(userId, characterId);
    if (!progress) return null;

    const { signed, total } = progress;
    return signed >= total
      ? `📋 Signature collected — ${signed} / ${total}. File it with \`/docs\`.`
      : `📋 Signature collected — ${signed} / ${total}.`;
  } catch (err) {
    console.error('Error signing errand target:', err);
    return null;
  }
}

// The bonus clause on a boosted response, naming the encounter moment it is
// picking up from. Only reached when a boost was actually spent, so the extra
// read costs an ordinary /roam nothing — and it degrades to the generic phrasing
// rather than failing the response if the lookup errors or the milestone row is
// missing (a win whose milestone insert failed still granted its boost).
async function describeBoost(userId, character, boostsSpent) {
  const suffix = `a warmer welcome (+${boostsSpent * ENCOUNTER_BOOST_GAIN})`;

  try {
    const latest = await getLatestEncounterMilestone(userId, character.id);
    const milestone = latest && getMilestone(latest.milestone_type);
    if (milestone) {
      const hint = fillTemplate(milestone.hint, {
        name: getFullName(character),
        firstName: character.firstName,
        house: character.house || 'Darkwick',
      });
      return `picking up after ${hint} — ${suffix}`;
    }
  } catch (err) {
    console.error('Error reading latest encounter milestone:', err);
  }

  return `picking up where you left off — ${suffix}`;
}

// --- /affinity ---------------------------------------------------------------

// Avatar art in assets/avatar is named `FirstName_LastWord.png` — the last
// word of lastName, so "Romeo Scorpius Lucci" resolves to Romeo_Lucci.png.
function getAvatarFilename(character) {
  if (!character.firstName || !character.lastName) return null;
  const lastNamePart = character.lastName.split(' ').pop();
  return `${character.firstName}_${lastNamePart}.png`;
}

// The "Moments together" block: one row per milestone the user has collected
// with this character, most-collected first. Returns null — and the block is
// omitted entirely — when there are none, so an /affinity for someone they've
// never caught in a public encounter looks exactly as it did before.
function renderMomentsTogether(character, counts) {
  const vars = {
    name: getFullName(character),
    firstName: character.firstName,
    house: character.house || 'Darkwick',
  };

  const rows = Object.entries(counts || {})
    .filter(([type, count]) => count > 0 && ENCOUNTER_MILESTONES[type])
    // Ties fall back to the milestone key so the order is stable between runs.
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([type, count]) => {
      const milestone = ENCOUNTER_MILESTONES[type];
      return `${milestone.emoji} ${fillTemplate(milestone.label, vars)} — ×${count}`;
    });

  if (rows.length === 0) return null;
  return `**Moments together** 💞\n${rows.join('\n')}`;
}

// `opts.shareButton` appends a Share button that reposts this status publicly
// (app.js, the `affinity:share` component). `opts.sharedBy` is the sharer's
// plain display name (not an `<@id>` tag) and marks the message as that public
// repost: its header names who shared it and the button is never attached (the
// public copy has nothing left to share).
export async function buildAffinityMessage(userId, characterIds, opts = {}) {
  const { shareButton = false, sharedBy = null } = opts;
  // The options are free-text, so ids arrive untrimmed, in any case, and
  // possibly repeated — a repeat would collide on the attachment filename.
  const validCharacters = [];
  const invalidIds = [];
  const seen = new Set();

  for (const rawId of characterIds) {
    const charId = rawId.trim().toLowerCase();
    if (!charId) continue;

    const character = getCharacterById(charId);
    // Dedupe on the resolved character id, not the raw id, so an alias (e.g.
    // "sho") and the canonical id ("shohei") don't produce two embeds — and a
    // colliding attachment filename — for the same person.
    const key = character ? character.id : charId;
    if (seen.has(key)) continue;
    seen.add(key);

    if (character) {
      validCharacters.push(character);
    } else {
      invalidIds.push(rawId.trim());
    }
  }

  const unknownNote = invalidIds.length
    ? `Unknown character${invalidIds.length > 1 ? 's' : ''}: **${invalidIds.join('**, **')}**`
    : null;

  if (validCharacters.length === 0) {
    return {
      content: unknownNote || 'Please name at least one character.',
    };
  }

  // Neither batch depends on the other, so they go out together.
  //
  // Public-encounter wins never move affinity, so they'd otherwise leave no
  // trace here — the milestone tally is their whole visible progression.
  // A failed read drops the block rather than the embed.
  const [affinities, milestoneCounts] = await Promise.all([
    Promise.all(validCharacters.map((character) => readRelationship(userId, character.id))),
    Promise.all(
      validCharacters.map((character) =>
        getEncounterMilestoneCounts(userId, character.id).catch((err) => {
          console.error(`Error loading milestones for ${character.id}:`, err);
          return {};
        }),
      ),
    ),
  ]);

  // Build each embed alongside its attachment so an avatar that fails to load
  // drops the embed image instead of leaving a broken attachment:// reference.
  const embeds = [];
  const files = [];

  validCharacters.forEach((character, index) => {
    const { level, nextLevel, ratio } = getRelationshipProgress(
      affinities[index]?.affinity || 0,
    );
    const avatarFilename = getAvatarFilename(character);

    let imageBuffer = null;
    if (avatarFilename) {
      try {
        imageBuffer = fs.readFileSync(path.join(__dirname, 'assets', 'avatar', avatarFilename));
      } catch (err) {
        console.error(`Error loading avatar for ${character.id}:`, err);
      }
    }

    // No trailing name emoji here: the heart bar below already carries the
    // level's designated heart, so repeating it after the name is redundant.
    const bar = renderHeartBar(ratio, level.heart);
    const parts = [level.name, bar];
    if (!nextLevel) parts.push('Bond fully forged');

    const moments = renderMomentsTogether(character, milestoneCounts[index]);
    if (moments) parts.push('', moments);

    const description = parts.join('\n');

    embeds.push({
      image: imageBuffer ? { url: `attachment://${avatarFilename}` } : undefined,
      title: getFullName(character),
      description,
      color: level.color, // tracks the relationship level, not a fixed blurple
    });

    if (imageBuffer) {
      files.push({ attachment: imageBuffer, name: avatarFilename });
    }
  });

  const header = sharedBy
    ? `${sharedBy} shared their relationship status:`
    : 'Here\'s your relationship status:';

  const message = {
    content: unknownNote ? `${header}\n${unknownNote}` : header,
    embeds,
    files: files.length > 0 ? files : undefined,
    // The attribution is a plain-text name, never a mention — but mentions stay
    // parsed off anyway so a name that looks like `@someone` can't ping.
    ...(sharedBy ? { allowed_mentions: { parse: [] } } : {}),
  };

  // The private /affinity result carries a Share button that rebuilds this
  // same status as a public post. The click only carries the custom_id, so
  // the resolved character ids ride in it. Discord caps a custom_id at 100
  // chars; five canonical ids plus the prefix is ~50, but a defensive check
  // drops the button rather than emit an invalid component if that ever
  // stops holding.
  if (shareButton && !sharedBy) {
    const customId = `affinity:share:${validCharacters.map((c) => c.id).join('.')}`;
    if (customId.length <= 100) {
      message.components = [
        {
          type: MessageComponentTypes.ACTION_ROW,
          components: [
            {
              type: MessageComponentTypes.BUTTON,
              style: ButtonStyleTypes.SECONDARY,
              label: 'Share',
              custom_id: customId,
            },
          ],
        },
      ];
    }
  }

  return message;
}

// --- /bonds --------------------------------------------------------------

// A plain text roster of every character the user has any bond with, ranked
// closest first. No art or embeds — one "Name — Level" line per character,
// with the level's name emoji trailing (Stranger has none). Only characters
// with at least 1 affinity point are listed; an unknown character_id in the
// row set is skipped rather than shown as a broken line.
export async function buildBondsMessage(userId) {
  const relationships = await getUserRelationships(userId);

  const bonds = (relationships || [])
    .map((rel) => {
      const character = getCharacterById(rel.character_id);
      if (!character) return null;
      const affinity = rel.affinity || 0;
      if (affinity < 1) return null;
      return { name: getFullName(character), affinity, level: getRelationshipLevel(affinity) };
    })
    .filter(Boolean)
    // Greatest affinity first; ties fall back to name so the order is stable.
    .sort((a, b) => b.affinity - a.affinity || a.name.localeCompare(b.name));

  if (bonds.length === 0) {
    return {
      content: 'You haven\'t formed any bonds yet. Go out and meet people!',
      flags: EPHEMERAL_FLAG,
    };
  }

  const lines = bonds.map(({ name, level }) => {
    const emoji = level.emoji ? ` ${level.emoji}` : '';
    return `${name} — ${level.name}${emoji}`;
  });

  return {
    content: `**Your bonds**\n${lines.join('\n')}`,
    flags: EPHEMERAL_FLAG,
  };
}
