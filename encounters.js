import { ButtonStyleTypes, InteractionResponseFlags, MessageComponentTypes } from 'discord-interactions';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  getRandomBackground,
  getRandomBackgroundForLocation,
  getRandomGeneralBackground,
  isGeneralLocation,
  SPECIAL_BACKGROUNDS,
} from './constants/backgrounds.js';
import {
  CHARACTERS,
  generateCharacterResponses,
  getAffinityForResponse,
  getCharacterById,
  getCharactersForLocation,
  getFullName,
  getRandomCharacterImageVariant,
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
} from './constants/game.js';
import { composeEncounter } from './imageComposition.js';
import { getRelationship, recordResponse } from './storage.js';

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

// Character affinity preferences for special locations.
// Higher values = more likely to appear at that location.
const LOCATION_CHARACTER_AFFINITIES = {
  [SPECIAL_BACKGROUNDS.DARKWICK_MYSTERY_DINER]: { ren: 2 },
  [SPECIAL_BACKGROUNDS.DARKWICK_FOOD_TRUCK]: { shohei: 2 },
  [SPECIAL_BACKGROUNDS.DARKWICK_DOCKS]: { shion: 2 },
  [SPECIAL_BACKGROUNDS.VAGASTROM_THE_PIT]: { alan: 2 },
  [SPECIAL_BACKGROUNDS.SINOSTRA_VIP_ROOM_ENTRANCE]: { romeo: 2 },
  [SPECIAL_BACKGROUNDS.OBSCUARY_BAR]: { rui: 1.5, romeo: 1 },
  [SPECIAL_BACKGROUNDS.MORTKRANKEN_LAB]: { yuri: 2 },
  [SPECIAL_BACKGROUNDS.MORTKRANKEN_LAB_PM]: { yuri: 2 },
};

// Select a character using weighted probability based on location affinity.
// Characters with higher affinity for a location are more likely to appear there.
function selectCharacterAtLocation(candidates, location) {
  const affinities = LOCATION_CHARACTER_AFFINITIES[location] || {};

  // Build weighted pool: add characters based on affinity
  const weightedPool = [];
  for (const candidate of candidates) {
    const weight = affinities[candidate.id] || 1;
    // Add character to pool based on weight
    for (let i = 0; i < Math.ceil(weight); i++) {
      weightedPool.push(candidate);
    }
  }

  if (weightedPool.length === 0) {
    return pickRandom(candidates);
  }

  return pickRandom(weightedPool);
}

function responseActionRow(characterId, disabled = false, tier = 'new') {
  const character = getCharacterById(characterId);
  const characterResponses = character ? generateCharacterResponses(character, tier) : {};

  return RESPONSE_TYPE_ORDER.map((responseType) => {
    const option = characterResponses[responseType] || { label: 'Respond' };
    return {
      type: MessageComponentTypes.ACTION_ROW,
      components: [
        {
          type: MessageComponentTypes.BUTTON,
          style: RESPONSE_STYLES[responseType],
          label: option.label,
          custom_id: `resp:${characterId}:${responseType}`,
          disabled,
        },
      ],
    };
  });
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

  console.log('[buildRoamDialogueMessage] Getting random background...');
  const spot = getRandomBackground(now);
  if (!spot) {
    console.log('[buildRoamDialogueMessage] No background available');
    return {
      content: 'You wander for a while, but nowhere seems worth stopping at.',
      flags: EPHEMERAL_FLAG,
    };
  }

  console.log('[buildRoamDialogueMessage] Getting location info...');
  const isGeneral = isGeneralLocation(spot.locationKey);
  const candidates = getCharactersForLocation(spot.locationKey, isGeneral);

  // Use weighted selection based on location affinity
  const character = selectCharacterAtLocation(candidates, spot.file);

  console.log(`[buildRoamDialogueMessage] Selected ${getFullName(character)} at ${spot.locationKey}`);

  console.log('[buildRoamDialogueMessage] Fetching relationship from DB...');
  const relStart = Date.now();
  const { affinity } = await getRelationship(userId, character.id);
  console.log('[buildRoamDialogueMessage] Got affinity after', Date.now() - relStart, 'ms');

  const level = getRelationshipLevel(affinity);
  const tier = getDialogueTier(level.name);
  const variant = getImageVariant(character, level.name);
  const dialogue = getRandomDialogueLine(character, tier, variant, now);
  const temperament = getTemperamentGreeting(character, tier);
  console.log('[buildRoamDialogueMessage] Got dialogue:', dialogue);
  console.log('[buildRoamDialogueMessage] Got temperament:', temperament);

  const charFilename = character.images[variant];

  const encounterId = generateEncounterId();
  cacheRoamEncounter(encounterId, { spot, character, charFilename, dialogue, temperament, tier });
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
            label: 'Step forward',
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

  const { spot, character, charFilename, temperament, tier } = encounter;
  console.log('[buildRoamSpawnMessage] Starting image composition...');
  const composeStart = Date.now();
  const imageBuffer = await composeEncounter(spot.file, charFilename, temperament);
  console.log(`[buildRoamSpawnMessage] Image composition took ${Date.now() - composeStart}ms`);

  return {
    content: `You wander into **${spot.locationKey}** and run into **${getFullName(character)}**...`,
    files: [{ attachment: imageBuffer, name: 'encounter.png' }],
    components: responseActionRow(character.id, false, tier),
    flags: EPHEMERAL_FLAG,
  };
}

// --- /meet -----------------------------------------------------------------

export function buildMeetPickMessage(candidates = null, disabled = false) {
  const chars = candidates || pickRandomDistinct(CHARACTERS, MEET_OPTION_COUNT);
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

  let spot = null;
  if (character.house) {
    const file = getRandomBackgroundForLocation(character.house, now);
    if (file) spot = { locationKey: character.house, file };
  }
  const fallbackSpot = spot || getRandomGeneralBackground(now);

  const { affinity } = await getRelationship(userId, character.id);
  const level = getRelationshipLevel(affinity);
  const tier = getDialogueTier(level.name);
  const variant = getImageVariant(character, level.name);
  const dialogue = getRandomDialogueLine(character, tier, variant, now);

  const charFilename = character.images[variant];

  const imageBuffer = await composeEncounter(fallbackSpot.file, charFilename, dialogue);

  const locationText = fallbackSpot ? ` at **${fallbackSpot.locationKey}**.` : '.';

  return {
    content: `${getFullName(character)} agrees to meet you${locationText}`,
    files: [{ attachment: imageBuffer, name: 'encounter.png' }],
    components: responseActionRow(character.id, false, tier),
    flags: EPHEMERAL_FLAG,
  };
}

// --- dialogue response -------------------------------------------------------

export async function buildResponseResultMessage(userId, characterId, responseTypeId) {
  const character = getCharacterById(characterId);
  if (!character) {
    return {
      content: 'They seem to have wandered off already.',
      flags: EPHEMERAL_FLAG,
    };
  }

  const gain = getAffinityForResponse(character, responseTypeId);
  const { affinity, level } = await recordResponse(userId, characterId, gain);

  let reaction;
  if (responseTypeId === RESPONSE_TYPES.NEUTRAL) {
    reaction = `${getFullName(character)} doesn't seem to react much either way.`;
  } else if (gain === 2) {
    reaction = `${getFullName(character)} lights up at that.`;
  } else if (gain === 1) {
    reaction = `${getFullName(character)} seems to appreciate that.`;
  } else {
    reaction = `${getFullName(character)} doesn't seem impressed.`;
  }

  return {
    content: `${reaction}\n+${gain} affinity — **${level.name}** (${affinity})`,
    components: responseActionRow(characterId, true),
    flags: EPHEMERAL_FLAG,
  };
}
