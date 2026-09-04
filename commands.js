import "dotenv/config";
import { InstallGlobalCommands } from "./utils.js";

const ROAM_COMMAND = {
  name: "roam",
  description: "Wander around Darkwick and see who you run into",
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

const MEET_COMMAND = {
  name: "meet",
  description: "Pick someone to meet up with",
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

const AFFINITY_COMMAND = {
  name: "affinity",
  description: "Check your relationship status with characters",
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
  options: [
    {
      name: "character_1",
      description: "First character (e.g., ren, leo, romeo)",
      type: 3, // STRING
      required: true,
    },
    {
      name: "character_2",
      description: "Second character (optional)",
      type: 3, // STRING
      required: false,
    },
    {
      name: "character_3",
      description: "Third character (optional)",
      type: 3, // STRING
      required: false,
    },
    {
      name: "character_4",
      description: "Fourth character (optional)",
      type: 3, // STRING
      required: false,
    },
    {
      name: "character_5",
      description: "Fifth character (optional)",
      type: 3, // STRING
      required: false,
    },
  ],
};

const HOUSE_COMMAND = {
  name: "house",
  description: "See which house you're closest to",
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

// `dms` is an option rather than a subcommand: Discord makes a command with
// subcommands invocable *only* through them, and bare /bonds — the roster list
// — has to keep working. `/bonds dms:off` turns off the level-up DMs
// (docs/bond-scene-dms.md §4.9); the same switch is offered as a button on the
// first bond DM a user ever gets.
const BONDS_COMMAND = {
  name: "bonds",
  description: "See everyone you've bonded with, ranked by closeness",
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
  options: [
    {
      name: "character",
      description: "Look back on your moments with one character (e.g. ren, leo)",
      type: 3, // STRING
      required: false,
    },
    {
      name: "dms",
      description: "Turn private level-up messages on or off",
      type: 3, // STRING
      required: false,
      choices: [
        { name: "on", value: "on" },
        { name: "off", value: "off" },
      ],
    },
  ],
};

// No autocomplete on `character`: recognizing the silhouette and typing the
// name accurately is the game. See docs/public-encounters.md §7.
const CALL_COMMAND = {
  name: "call",
  description: "Call out to the figure in the encounter channel",
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
  options: [
    {
      name: "character",
      description: "Who do you think it is? e.g. Sho, Shohei, Shohei Haizono",
      type: 3, // STRING
      required: true,
    },
  ],
};

// Per-guild setup for public encounters. default_member_permissions '32' is
// MANAGE_GUILD, so only server admins even see this command. Guild-install and
// guild-context only — there is nothing to configure in a DM.
const ENCOUNTERS_COMMAND = {
  name: "encounters",
  description: "Configure public call-out encounters for this server",
  type: 1,
  default_member_permissions: "32",
  integration_types: [0],
  contexts: [0],
  options: [
    {
      type: 1, // SUB_COMMAND
      name: "channel",
      description: "Set the channel encounters post in (enables the feature)",
      options: [
        {
          type: 7, // CHANNEL
          name: "channel",
          description: "Target channel",
          required: true,
          channel_types: [0], // GUILD_TEXT
        },
      ],
    },
    {
      type: 1,
      name: "disable",
      description: "Stop posting encounters in this server",
    },
    {
      type: 1,
      name: "status",
      description: "Show the current encounter settings",
    },
  ],
};

// Owner-only test tooling for public encounters. default_member_permissions
// '0' hides it from everyone without Administrator; handleEncounterDev then
// hard-gates on OWNER_DISCORD_ID, so even another server admin who can see it
// can't run it. Guild-install and guild-context only.
const ENCDEV_COMMAND = {
  name: "encdev",
  description: "Owner only: trigger encounters manually for testing",
  type: 1,
  default_member_permissions: "0",
  integration_types: [0],
  contexts: [0],
  options: [
    {
      type: 1, // SUB_COMMAND
      name: "spawn",
      description: "Force an encounter to appear now",
      options: [
        {
          name: "character",
          description: "Force a character (name or alias); random if omitted",
          type: 3, // STRING
          required: false,
        },
        {
          name: "variant",
          description: "Which art to use (defaults to the usual 50/50)",
          type: 3, // STRING
          required: false,
          choices: [
            { name: "uniform", value: "uniform" },
            { name: "casual", value: "casual" },
          ],
        },
      ],
    },
    {
      type: 1, // SUB_COMMAND
      name: "clear",
      description: "Expire this server's live encounter right now",
    },
  ],
};

const ALL_COMMANDS = [
  ROAM_COMMAND,
  MEET_COMMAND,
  AFFINITY_COMMAND,
  HOUSE_COMMAND,
  BONDS_COMMAND,
  CALL_COMMAND,
  ENCOUNTERS_COMMAND,
  ENCDEV_COMMAND,
];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
