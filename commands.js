import 'dotenv/config';
import { InstallGlobalCommands } from './utils.js';

const ROAM_COMMAND = {
  name: 'roam',
  description: 'Wander around Darkwick and see who you run into',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

const MEET_COMMAND = {
  name: 'meet',
  description: 'Pick someone to meet up with',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

const AFFINITY_COMMAND = {
  name: 'affinity',
  description: 'Check your relationship status with characters',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
  options: [
    {
      name: 'character_1',
      description: 'First character (e.g., ren, leo, romeo)',
      type: 3, // STRING
      required: true,
    },
    {
      name: 'character_2',
      description: 'Second character (optional)',
      type: 3, // STRING
      required: false,
    },
    {
      name: 'character_3',
      description: 'Third character (optional)',
      type: 3, // STRING
      required: false,
    },
    {
      name: 'character_4',
      description: 'Fourth character (optional)',
      type: 3, // STRING
      required: false,
    },
    {
      name: 'character_5',
      description: 'Fifth character (optional)',
      type: 3, // STRING
      required: false,
    },
  ],
};

const HOUSE_COMMAND = {
  name: 'house',
  description: 'See which house you\'re closest to',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

const ALL_COMMANDS = [ROAM_COMMAND, MEET_COMMAND, AFFINITY_COMMAND, HOUSE_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
