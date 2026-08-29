import { ButtonStyleTypes, InteractionResponseFlags, MessageComponentTypes } from 'discord-interactions';
import {
  getRandomBackground,
  getRandomBackgroundForLocation,
  getRandomGeneralBackground,
  isGeneralLocation,
} from './constants/backgrounds.js';
import {
  CHARACTERS,
  getAffinityForResponse,
  getCharacterById,
  getCharactersForLocation,
  getFullName,
  getRandomCharacterImageVariant,
  getRandomDialogueLine,
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

function responseActionRow(characterId) {
  return {
    type: MessageComponentTypes.ACTION_ROW,
    components: RESPONSE_TYPE_ORDER.map((responseType) => {
      const option = pickRandom(RESPONSE_OPTION_POOL[responseType]);
      return {
        type: MessageComponentTypes.BUTTON,
        style: RESPONSE_STYLES[responseType],
        label: option.label,
        emoji: { name: option.emoji },
        custom_id: `resp:${characterId}:${responseType}`,
      };
    }),
  };
}

// --- /roam ---------------------------------------------------------------

export async function buildRoamMessage(userId, now = new Date()) {
  const spot = getRandomBackground(now);
  if (!spot) {
    return {
      content: 'You wander for a while, but nowhere seems worth stopping at.',
      flags: EPHEMERAL_FLAG,
    };
  }

  const isGeneral = isGeneralLocation(spot.locationKey);
  const candidates = getCharactersForLocation(spot.locationKey, isGeneral);
  const character = pickRandom(candidates);

  const { affinity } = getRelationship(userId, character.id);
  const level = getRelationshipLevel(affinity);
  const tier = getDialogueTier(level.name);
  const dialogue = getRandomDialogueLine(character, tier);

  const variant = tier === 'new' ? 'uniform' : getRandomCharacterImageVariant(character);
  const charFilename = character.images[variant];

  const imageBuffer = await composeEncounter(spot.file, charFilename, dialogue);

  return {
    content: `You wander into **${spot.locationKey}** and run into **${getFullName(character)}**...`,
    files: [{ attachment: imageBuffer, name: 'encounter.png' }],
    components: [responseActionRow(character.id)],
    flags: EPHEMERAL_FLAG,
  };
}

// --- /meet -----------------------------------------------------------------

export function buildMeetPickMessage() {
  const candidates = pickRandomDistinct(CHARACTERS, MEET_OPTION_COUNT);
  return {
    content: 'A few familiar faces catch your eye. Who do you want to meet?',
    components: [
      {
        type: MessageComponentTypes.ACTION_ROW,
        components: candidates.map((character) => ({
          type: MessageComponentTypes.BUTTON,
          style: ButtonStyleTypes.SECONDARY,
          label: getFullName(character),
          custom_id: `meet:pick:${character.id}`,
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

  const { affinity } = getRelationship(userId, character.id);
  const level = getRelationshipLevel(affinity);
  const tier = getDialogueTier(level.name);
  const dialogue = getRandomDialogueLine(character, tier);

  const variant = tier === 'new' ? 'uniform' : getRandomCharacterImageVariant(character);
  const charFilename = character.images[variant];

  const imageBuffer = await composeEncounter(fallbackSpot.file, charFilename, dialogue);

  const locationText = fallbackSpot ? ` at **${fallbackSpot.locationKey}**.` : '.';

  return {
    content: `${getFullName(character)} agrees to meet you${locationText}`,
    files: [{ attachment: imageBuffer, name: 'encounter.png' }],
    components: [responseActionRow(character.id)],
    flags: EPHEMERAL_FLAG,
  };
}

// --- dialogue response -------------------------------------------------------

export function buildResponseResultMessage(userId, characterId, responseTypeId) {
  const character = getCharacterById(characterId);
  if (!character) {
    return {
      content: 'They seem to have wandered off already.',
      flags: EPHEMERAL_FLAG,
    };
  }

  const gain = getAffinityForResponse(character, responseTypeId);
  const { affinity, level } = recordResponse(userId, characterId, gain);

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
    flags: EPHEMERAL_FLAG,
  };
}
