import { ButtonStyleTypes, InteractionResponseFlags, MessageComponentTypes } from 'discord-interactions';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  getRandomBackground,
  getRandomBackgroundForLocation,
  getRandomGeneralBackground,
  isGeneralLocation,
  HOUSES,
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
} from './constants/game.js';
import { composeEncounter } from './imageComposition.js';
import { getRelationship, recordResponse } from './storage.js';
// readRelationship is the non-creating read — /affinity and /house are
// read-only commands and must not insert rows for characters the user has
// never actually met (getRelationship above creates one on miss).
import {
  getRelationship as readRelationship,
  getUserRelationships,
} from './db/supabase.js';

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
            label: getRandomApproachLabel(character, tier, variant, now),
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

  const gain = getAffinityForResponse(character, responseTypeId);
  const { affinity, level } = await recordResponse(userId, characterId, gain, responseTypeId);

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
    components: disableComponents(shownComponents) || responseActionRow(characterId, true),
    flags: EPHEMERAL_FLAG,
  };
}

// --- /affinity ---------------------------------------------------------------

// Emoji for relationship levels
const AFFINITY_EMOJI = {
  Stranger: '',
  Acquaintance: '🧡',
  Friend: '🩷',
  'Close Friend': '💖',
  Confidant: '💕',
  Devoted: '❤️',
  Soulbound: '❤️‍🔥',
};

// Avatar art in assets/avatar is named `FirstName_LastWord.png` — the last
// word of lastName, so "Romeo Scorpius Lucci" resolves to Romeo_Lucci.png.
function getAvatarFilename(character) {
  if (!character.firstName || !character.lastName) return null;
  const lastNamePart = character.lastName.split(' ').pop();
  return `${character.firstName}_${lastNamePart}.png`;
}

export async function buildAffinityMessage(userId, characterIds) {
  // The options are free-text, so ids arrive untrimmed, in any case, and
  // possibly repeated — a repeat would collide on the attachment filename.
  const validCharacters = [];
  const invalidIds = [];
  const seen = new Set();

  for (const rawId of characterIds) {
    const charId = rawId.trim().toLowerCase();
    if (!charId || seen.has(charId)) continue;
    seen.add(charId);

    const character = getCharacterById(charId);
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

  const affinities = await Promise.all(
    validCharacters.map((character) => readRelationship(userId, character.id)),
  );

  // Build each embed alongside its attachment so an avatar that fails to load
  // drops the embed image instead of leaving a broken attachment:// reference.
  const embeds = [];
  const files = [];

  validCharacters.forEach((character, index) => {
    const level = getRelationshipLevel(affinities[index]?.affinity || 0);
    const avatarFilename = getAvatarFilename(character);

    let imageBuffer = null;
    if (avatarFilename) {
      try {
        imageBuffer = fs.readFileSync(path.join(__dirname, 'assets', 'avatar', avatarFilename));
      } catch (err) {
        console.error(`Error loading avatar for ${character.id}:`, err);
      }
    }

    const emoji = AFFINITY_EMOJI[level.name] || '';
    embeds.push({
      image: imageBuffer ? { url: `attachment://${avatarFilename}` } : undefined,
      title: getFullName(character),
      description: emoji ? `${level.name} ${emoji}` : level.name,
      color: 0x5865f2, // Discord blurple
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

// --- /house ---------------------------------------------------------------

// How many emblem cards a tie can show at once. Discord allows 10 embeds, but
// the emblems are the constraint, not the embed count — see buildHouseMessage.
const MAX_HOUSE_EMBEDS = 3;

// "A and B" / "A, B, and C" — houses are bolded to match the single-house line.
function formatHouseList(houses) {
  const bolded = houses.map((house) => `**${house}**`);
  if (bolded.length === 2) return bolded.join(' and ');
  return `${bolded.slice(0, -1).join(', ')}, and ${bolded[bolded.length - 1]}`;
}

const HOUSE_DESCRIPTIONS = {
  [HOUSES.FROSTHEIM]: [
    'A true Frostheim ally.',
    'Cold as ice, loyal as steel.',
    'Winter\'s favor rests upon you.',
    'You\'ve earned the respect of Frostheim.',
  ],
  [HOUSES.VAGASTROM]: [
    'A true Vagastrom ally.',
    'You\'ve proven yourself in the pit.',
    'The rebels stand with you.',
    'Vagastrom\'s fury flows through your bonds.',
  ],
  [HOUSES.HOTARUBI]: [
    'A true Hotarubi ally.',
    'The shrine welcomes you.',
    'Your spirit resonates with Hotarubi.',
    'Blessed by the flames of Hotarubi.',
  ],
  [HOUSES.DIONYSIA]: [
    'A true Dionysia ally.',
    'You\'ve captured the hearts of Dionysia.',
    'Dionysian spirits celebrate you.',
    'In Dionysia\'s embrace, you belong.',
  ],
  [HOUSES.MORTKRANKEN]: [
    'A true Mortkranken ally.',
    'Death itself recognizes your bond.',
    'The ghouls accept you as one of their own.',
    'Mortkranken\'s darkness has claimed your heart.',
  ],
  [HOUSES.JABBERWOCK]: [
    'A true Jabberwock ally.',
    'The beasts have chosen you.',
    'Wild and untamed, just like Jabberwock.',
    'Jabberwock\'s primal nature calls to you.',
  ],
  [HOUSES.OBSCUARY]: [
    'A true Obscuary ally.',
    'Secrets bind you to Obscuary.',
    'In shadow and whisper, you are home.',
    'Obscuary\'s mysteries are yours to uncover.',
  ],
  [HOUSES.SINOSTRA]: [
    'A true Sinostra ally.',
    'Wealth and favor flow your way.',
    'Sinostra\'s glamour shines upon you.',
    'You\'ve won the game of Sinostra.',
  ],
};

export async function buildHouseMessage(userId) {
  try {
    // Get all relationships for the user
    const relationships = await getUserRelationships(userId);

    if (!relationships || relationships.length === 0) {
      return {
        content: 'You haven\'t formed any bonds yet. Go out and meet people!',
      };
    }

    // Group affinity by house
    const houseAffinities = {};

    for (const house of Object.values(HOUSES)) {
      houseAffinities[house] = 0;
    }

    // Sum affinity by house
    for (const relationship of relationships) {
      const character = getCharacterById(relationship.character_id);
      if (character && character.house) {
        houseAffinities[character.house] += relationship.affinity || 0;
      }
    }

    // Find the maximum affinity
    const maxAffinity = Math.max(...Object.values(houseAffinities));

    // Find all houses with max affinity
    const topHouses = Object.entries(houseAffinities)
      .filter(([_, affinity]) => affinity === maxAffinity && affinity > 0)
      .map(([house, _]) => house);

    // If no houses have any affinity, return a message
    if (topHouses.length === 0 || maxAffinity === 0) {
      return {
        content: 'You haven\'t formed any bonds with any house yet.',
      };
    }

    // Every tied house is named in the content, but only the first few get an
    // emblem card — each emblem is a ~450KB attachment, so an 8-way tie would
    // otherwise push a multi-megabyte multipart body for one command.
    const shownHouses = topHouses.slice(0, MAX_HOUSE_EMBEDS);

    // Build embeds for top houses
    const embeds = [];
    const files = [];

    for (const house of shownHouses) {
      const descriptions = HOUSE_DESCRIPTIONS[house] || [`A true ${house} ally.`];
      const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
      const emblemFilename = `${house}.png`;

      let imageBuffer = null;
      try {
        imageBuffer = fs.readFileSync(path.join(__dirname, 'assets', 'emblem', emblemFilename));
      } catch (err) {
        console.error(`Error loading emblem for ${house}:`, err);
      }

      embeds.push({
        title: house,
        description: randomDescription,
        image: imageBuffer ? { url: `attachment://${emblemFilename}` } : undefined,
        color: 0x5865f2, // Discord blurple
      });

      if (imageBuffer) {
        files.push({ attachment: imageBuffer, name: emblemFilename });
      }
    }

    let content;
    if (topHouses.length === 1) {
      content = `Your heart belongs to **${topHouses[0]}**.`;
    } else {
      content = `You have equal bonds with ${formatHouseList(topHouses)}.`;
      if (topHouses.length > shownHouses.length) {
        content += `\nShowing the first ${shownHouses.length} emblems.`;
      }
    }

    return {
      content,
      embeds,
      files: files.length > 0 ? files : undefined,
    };
  } catch (err) {
    console.error('Error in buildHouseMessage:', err);
    throw err;
  }
}
