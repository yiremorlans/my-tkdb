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

const ALL_COMMANDS = [ROAM_COMMAND, MEET_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
