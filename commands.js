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

// Repurposed from "which house is your heart in" into the Inspector dossier
// (docs/scheduled-missions.md §9): rank, per-house mission points, and whatever
// mission you're currently holding. The old closest-house-by-affinity answer is
// kept as one line of it.
const HOUSE_COMMAND = {
  name: "house",
  description: "Your Inspector dossier — rank, mission record and current job",
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

// `assist` is an option rather than a subcommand for exactly the reason `dms`
// is on /bonds: Discord makes a command with subcommands invocable *only*
// through them, and bare /mission — the briefing — is the command this feature
// points people at constantly. So `/mission` alone reads the briefing and
// `/mission assist:True` posts the co-op call for backup.
const MISSION_COMMAND = {
  name: "mission",
  description: "Read the briefing for the mission you're holding",
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
  options: [
    {
      name: "assist",
      description: "Co-op missions: post a call for backup in the mission channel",
      type: 5, // BOOLEAN
      required: false,
    },
  ],
};

const DOCS_COMMAND = {
  name: "docs",
  description: "Errand missions: check your signatures and file the report",
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

// No autocomplete, same call as /call: working out who the report is describing
// is the game, and a dropdown of 26 names would hand it over.
const RIDDLE_COMMAND = {
  name: "riddle",
  description: "Riddle missions: name the student behind the anomaly report",
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
  options: [
    {
      name: "answer",
      description: "Who do you think it is? e.g. Sho, Shohei, Shohei Haizono",
      type: 3, // STRING
      required: true,
    },
  ],
};

// Per-guild setup for scheduled missions, alongside /encounters. Enable,
// disable and status only — the count (3/day), spacing (2h) and window
// (05:00-24:00 CT) are hard-coded constants, deliberately not per-guild.
const MISSIONS_COMMAND = {
  name: "missions",
  description: "Configure scheduled missions for this server",
  type: 1,
  default_member_permissions: "32", // MANAGE_GUILD
  integration_types: [0],
  contexts: [0],
  options: [
    {
      type: 1, // SUB_COMMAND
      name: "enable",
      description: "Start posting mission requests in this server",
      options: [
        {
          type: 7, // CHANNEL
          name: "channel",
          description: "Channel to post in (defaults to the encounters channel)",
          required: false,
          channel_types: [0], // GUILD_TEXT
        },
      ],
    },
    {
      type: 1,
      name: "disable",
      description: "Stop posting mission requests in this server",
    },
    {
      type: 1,
      name: "status",
      description: "Show whether missions are on, and today's request times",
    },
  ],
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
    {
      type: 1, // SUB_COMMAND
      name: "bond",
      description: "Fire a bond scene DM for testing, bypassing affinity",
      options: [
        {
          name: "character",
          description: "Who the scene is from (name or alias)",
          type: 3, // STRING
          required: true,
        },
        {
          name: "level",
          description: "Which level's scene to send",
          type: 3, // STRING
          required: true,
          choices: [
            { name: "Acquaintance", value: "acq" },
            { name: "Friend", value: "fri" },
            { name: "Close Friend", value: "cfr" },
            { name: "Confidant", value: "con" },
            { name: "Devoted", value: "dev" },
            { name: "Soulbound", value: "sol" },
          ],
        },
      ],
    },
  ],
};

// Owner-only test tooling for missions, mirroring ENCDEV_COMMAND. Hidden by
// default_member_permissions '0'; handleMissionDev then hard-gates on
// OWNER_DISCORD_ID, so even another server admin who can see it can't run it.
// Guild-install and guild-context only.
const MISSIONDEV_COMMAND = {
  name: "missiondev",
  description: "Owner only: trigger missions manually for testing",
  type: 1,
  default_member_permissions: "0",
  integration_types: [0],
  contexts: [0],
  options: [
    {
      type: 1, // SUB_COMMAND
      name: "spawn",
      description: "Force a mission request onto the board now",
      options: [
        {
          name: "type",
          description: "Which mission type (random if omitted)",
          type: 3, // STRING
          required: false,
          choices: [
            { name: "riddle", value: "riddle" },
            { name: "errand", value: "errand" },
            { name: "coop", value: "coop" },
          ],
        },
        {
          name: "house",
          description: "Force a house by name (random if omitted)",
          type: 3, // STRING
          required: false,
        },
      ],
    },
    {
      type: 1, // SUB_COMMAND
      name: "clear",
      description: "Withdraw this server's open mission request right now",
    },
    {
      type: 1, // SUB_COMMAND
      name: "sweep",
      description: "Finalize every mission past its deadline right now",
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
  MISSION_COMMAND,
  DOCS_COMMAND,
  RIDDLE_COMMAND,
  ENCOUNTERS_COMMAND,
  MISSIONS_COMMAND,
  ENCDEV_COMMAND,
  MISSIONDEV_COMMAND,
];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
