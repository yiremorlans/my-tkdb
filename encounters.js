import { ButtonStyleTypes, InteractionResponseFlags, MessageComponentTypes } from 'discord-interactions';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  attributedLocations,
  getRandomBackgroundForCharacter,
  getRandomGeneralBackground,
  getLocationDisplayName,
  weightedBackgrounds,
  SPECIAL_BACKGROUNDS,
} from './constants/backgrounds.js';
import {
  CHARACTERS,
  generateCharacterResponses,
  getAffinityForResponse,
  getCharacterById,
  getFullName,
  getRandomCharacterImageVariant,
  getRandomApproachLabel,
  getRandomDialogueLine,
  getTemperamentGreeting,
  RESPONSE_TYPES,
} from './constants/characters.js';
import {
  MEET_OPTION_COUNT,
  RESPONSE_OPTION_POOL,
  RESPONSE_STYLES,
  RESPONSE_TYPE_ORDER,
  getDialogueTier,
  getRelationshipLevel,
  getRelationshipProgress,
  renderHeartBar,
} from './constants/game.js';
import { getReactionLine } from './constants/reactions.js';
import { composeEncounter } from './imageComposition.js';
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
} from './constants/publicEncounters.js';
import { ERRAND_ROAM_TARGET_BIAS } from './constants/missions.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CACHE_FILE = path.join(__dirname, '.roam-cache.json');

const EPHEMERAL_FLAG = InteractionResponseFlags.EPHEMERAL;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function pickRandomDistinct(list, count) {
  const pool = [...list];
  const picked = [];
  while (pool.length && picked.length < count) {
    const index = Math.floor(Math.random() * pool.length);
    picked.push(pool.splice(index, 1)[0]);
  }
  return picked;
}

// Determine character image variant based on relationship level.
// Stranger: always uniform. Higher levels gradually increase casual probability.
function getImageVariant(character, levelName) {
  // Probability of showing casual outfit at each level
  const casualProbability = {
    Stranger: 0,           // 0% casual
    Acquaintance: 0.25,    // 25% casual
    Friend: 0.40,          // 40% casual
    'Close Friend': 0.55,  // 55% casual
    Confidant: 0.70,       // 70% casual
    Devoted: 0.85,         // 85% casual
    Soulbound: 0.95,       // 95% casual
  };

  const probability = casualProbability[levelName] || 0;
  const useCasual = Math.random() < probability && character.images.casual;

  let variant = useCasual ? 'casual' : 'uniform';

  // Fallback to any available variant if chosen one doesn't exist
  if (!character.images[variant]) {
    variant = Object.keys(character.images)[0] || 'uniform';
  }

  return variant;
}

// Signature spots: given an already-chosen character, these backgrounds are
// this much likelier among the spots available to them.
//
// This is the inverse of the LOCATION_CHARACTER_AFFINITIES map it replaces,
// which boosted a *character* at a location. "Ren haunts the Mystery Diner"
// reads the same either way, but the direction matters: /roam used to pick the
// location first, so boosting a character there changed how often that
// character appeared at all. P(character) came out proportional to how many
// backgrounds their house had and inversely proportional to how many housemates
// shared it — 1.73% for Benkei against 6.22% for Edward, a 3.6x spread nobody
// authored. Weighting a *spot* for a character who has already been drawn
// expresses the same flavor and cannot touch the character distribution.
const CHARACTER_SIGNATURE_SPOTS = {
  ren: { [SPECIAL_BACKGROUNDS.DARKWICK_MYSTERY_DINER]: 2 },
  shohei: { [SPECIAL_BACKGROUNDS.DARKWICK_FOOD_TRUCK]: 2 },
  shion: { [SPECIAL_BACKGROUNDS.DARKWICK_DOCKS]: 2 },
  alan: { [SPECIAL_BACKGROUNDS.VAGASTROM_THE_PIT]: 2 },
  romeo: {
    [SPECIAL_BACKGROUNDS.SINOSTRA_VIP_ROOM_ENTRANCE]: 2,
    [SPECIAL_BACKGROUNDS.OBSCUARY_BAR]: 1,
  },
  rui: { [SPECIAL_BACKGROUNDS.OBSCUARY_BAR]: 1.5 },
  yuri: {
    [SPECIAL_BACKGROUNDS.MORTKRANKEN_LAB]: 2,
    [SPECIAL_BACKGROUNDS.MORTKRANKEN_LAB_PM]: 2,
  },
};

// Fraction of /roam encounters set on the character's own turf; the rest are
// general locations (Darkwick, Ultio, Galaxy Express, Clementia).
//
// A fixed constant, deliberately NOT derived from how many backgrounds a
// character's turf happens to hold. Deriving it would give Edward (Obscuary +
// a three-background private room) a different turf/out-and-about feel than
// Mio (a crowded Dionysia and no room) for reasons no one chose. It cannot
// affect who appears — the character is already drawn by the time this is read
// — only where they are when they do.
const TURF_PROBABILITY = 0.55;

// Every eligible background on this character's turf, with their signature
// spots repeated to weight them. Returns [] for a character with no attributed
// location that has anything eligible right now (Benkei, who has no house).
function turfSpots(character, now) {
  const signature = CHARACTER_SIGNATURE_SPOTS[character.id] || {};
  const pool = [];
  for (const locationKey of attributedLocations(character)) {
    for (const file of weightedBackgrounds(locationKey, now)) {
      for (let i = 0; i < Math.ceil(signature[file] || 1); i++) {
        pool.push({ locationKey, file });
      }
    }
  }
  return pool;
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
function responseActionRow(characterId, disabled = false, tier = 'new', origin = 'meet', ctx = {}) {
  const character = getCharacterById(characterId);
  const characterResponses = character ? generateCharacterResponses(character, tier, ctx) : {};

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

function loadCacheFile() {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const data = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
      const now = Date.now();
      const valid = {};
      for (const [id, entry] of Object.entries(data)) {
        if (entry.expiry > now) {
          valid[id] = entry;
        }
      }
      return valid;
    }
  } catch (err) {
    console.warn('[roamCache] Error loading cache:', err.message);
  }
  return {};
}

function saveCacheFile(cache) {
  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
  } catch (err) {
    console.error('[roamCache] Error saving cache:', err.message);
  }
}

function cacheRoamEncounter(encounterId, data) {
  const cache = loadCacheFile();
  cache[encounterId] = {
    ...data,
    expiry: Date.now() + 5 * 60 * 1000, // 5 min expiry
  };
  saveCacheFile(cache);
}

export function getCachedRoamEncounter(encounterId) {
  const cache = loadCacheFile();
  const entry = cache[encounterId];
  if (!entry) return null;

  const { expiry, ...data } = entry;
  return data;
}


export async function buildRoamDialogueMessage(userId, now = new Date()) {
  console.log('[buildRoamDialogueMessage] Starting...');
  const startTime = Date.now();

  // Character first, setting second — the same order /meet uses. This used to
  // draw the location first and then pick among whoever was attributed to it,
  // which made P(character) an accident of three unrelated things: how many
  // backgrounds their house happened to have, how many housemates shared it,
  // and whether they owned a private room. Drawing the character first makes it
  // exactly 1/CHARACTERS.length for everyone, and leaves the setting free to be
  // weighted however the flavor wants (TURF_PROBABILITY, signature spots, the
  // evening _PM bias) without any of it bending who shows up.
  console.log('[buildRoamDialogueMessage] Picking character...');
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
    console.log('[buildRoamDialogueMessage] No background available');
    return {
      content: 'You wander for a while, but nowhere seems worth stopping at.',
      flags: EPHEMERAL_FLAG,
    };
  }

  console.log(`[buildRoamDialogueMessage] Selected ${getFullName(character)} at ${spot.locationKey}`);

  console.log('[buildRoamDialogueMessage] Fetching relationship from DB...');
  const relStart = Date.now();
  const affinity = (await readRelationship(userId, character.id))?.affinity || 0;
  console.log('[buildRoamDialogueMessage] Got affinity after', Date.now() - relStart, 'ms');

  const level = getRelationshipLevel(affinity);
  const tier = getDialogueTier(level.name);
  const variant = getImageVariant(character, level.name);
  const dialogueCtx = {
    now,
    locationKey: spot.locationKey,
    backgroundFile: spot.file,
    event: null, // no event system yet — reserved for `when: { event }` rules
  };
  const dialogue = getRandomDialogueLine(character, tier, variant, dialogueCtx);
  const temperament = getTemperamentGreeting(character, tier);
  console.log('[buildRoamDialogueMessage] Got dialogue:', dialogue);
  console.log('[buildRoamDialogueMessage] Got temperament:', temperament);

  const charFilename = character.images[variant];

  const encounterId = generateEncounterId();
  // `now` is stored as epoch ms — the cache round-trips through JSON, so a Date
  // would come back a string. buildRoamSpawnMessage rehydrates it.
  cacheRoamEncounter(encounterId, {
    spot,
    character,
    charFilename,
    dialogue,
    temperament,
    tier,
    ctx: { ...dialogueCtx, now: now ? now.getTime() : null },
  });
  console.log(`[buildRoamDialogueMessage] Cached encounter ${encounterId}, elapsed: ${Date.now() - startTime}ms`);

  return {
    content: `*${dialogue}*`,
    components: [
      {
        type: MessageComponentTypes.ACTION_ROW,
        components: [
          {
            type: MessageComponentTypes.BUTTON,
            style: ButtonStyleTypes.PRIMARY,
            label: getRandomApproachLabel(character, tier, variant, dialogueCtx),
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

  const { spot, character, charFilename, temperament, tier, ctx } = encounter;
  const dialogueCtx = ctx
    ? { ...ctx, now: ctx.now != null ? new Date(ctx.now) : null }
    : {};
  console.log('[buildRoamSpawnMessage] Starting image composition...');
  const composeStart = Date.now();
  const imageBuffer = await composeEncounter(spot.file, charFilename, temperament);
  console.log(`[buildRoamSpawnMessage] Image composition took ${Date.now() - composeStart}ms`);

  return {
    content: `You wander into **${getLocationDisplayName(spot)}** and run into **${getFullName(character)}**...`,
    files: [{ attachment: imageBuffer, name: 'encounter.png' }],
    components: responseActionRow(character.id, false, tier, 'roam', dialogueCtx),
    flags: EPHEMERAL_FLAG,
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

  const affinity = (await readRelationship(userId, character.id))?.affinity || 0;
  const level = getRelationshipLevel(affinity);
  const tier = getDialogueTier(level.name);
  const variant = getImageVariant(character, level.name);
  const dialogueCtx = {
    now,
    locationKey: fallbackSpot?.locationKey ?? null,
    backgroundFile: fallbackSpot?.file ?? null,
    event: null,
  };
  const dialogue = getRandomDialogueLine(character, tier, variant, dialogueCtx);

  const charFilename = character.images[variant];

  const imageBuffer = await composeEncounter(fallbackSpot.file, charFilename, dialogue);

  const locationText = fallbackSpot ? ` at **${getLocationDisplayName(fallbackSpot)}**.` : '.';

  return {
    content: `${getFullName(character)} agrees to meet you${locationText}`,
    files: [{ attachment: imageBuffer, name: 'encounter.png' }],
    components: responseActionRow(character.id, false, tier, 'meet', dialogueCtx),
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
  // the next authored response with that character spends. Multiple wins with
  // one character are a single reunion, so this claims *all* pending boosts at
  // once rather than one per /roam. Consumed *before* the write so the bonus
  // folds into one affinity update: if that update then fails the user is out
  // those boosts, which is far better than the other ordering, where a failure
  // would leave spent boosts still claimable. A NEUTRAL response (gain 0) still
  // consumes them — the warmer welcome is the reunion, not the reply they picked.
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

  if (boostsSpent > 0) {
    deltaLine += `  ·  *${await describeBoost(userId, character, boostsSpent)}*`;
  }

  // The one point where a "meeting" becomes real is also the point an errand
  // signature is earned (docs/scheduled-missions.md §5). A /roam that happened
  // to surface a target counts exactly as much as a deliberate /meet.
  const signatureLine = await maybeSignErrandTarget(userId, characterId);

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
// missing (a win whose milestone insert failed still granted its boost). When
// several wins are being redeemed at once the clause still names one moment —
// the latest — and just reports the summed bonus.
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

export async function buildAffinityMessage(userId, characterIds) {
  // The options are free-text, so ids arrive untrimmed, in any case, and
  // possibly repeated — a repeat would collide on the attachment filename.
  const validCharacters = [];
  const invalidIds = [];
  const seen = new Set();

  for (const rawId of characterIds) {
    const charId = rawId.trim().toLowerCase();
    if (!charId) continue;

    const character = getCharacterById(charId);
    if (character) {
      // Dedupe on the resolved character so an alias (e.g. "sho") and the
      // canonical id ("shohei") don't produce two embeds — and a colliding
      // attachment filename — for the same person.
      if (seen.has(character.id)) continue;
      seen.add(character.id);
      validCharacters.push(character);
    } else {
      if (seen.has(charId)) continue;
      seen.add(charId);
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

  const affinities = await Promise.all(
    validCharacters.map((character) => readRelationship(userId, character.id)),
  );

  // Public-encounter wins never move affinity, so they'd otherwise leave no
  // trace here — the milestone tally is their whole visible progression.
  // A failed read drops the block rather than the embed.
  const milestoneCounts = await Promise.all(
    validCharacters.map((character) =>
      getEncounterMilestoneCounts(userId, character.id).catch((err) => {
        console.error(`Error loading milestones for ${character.id}:`, err);
        return {};
      }),
    ),
  );

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

    const formatLevel = (lvl) => (lvl.emoji ? `${lvl.name} ${lvl.emoji}` : lvl.name);
    const bar = renderHeartBar(ratio, level.heart);
    const parts = [formatLevel(level), bar];
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

  const header = 'Here\'s your relationship status:';

  return {
    content: unknownNote ? `${header}\n${unknownNote}` : header,
    embeds,
    files: files.length > 0 ? files : undefined,
  };
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
