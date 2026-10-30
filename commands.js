import "dotenv/config";
import { InstallGlobalCommands } from "./utils.js";
import { HOUSES } from "./constants/backgrounds.js";
import { EVENT_NAME_MAX } from "./constants/countdown.js";

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
// `/mission assist:true` posts the co-op call for backup.
//
// STRING, not BOOLEAN: a boolean option renders on Discord desktop as a
// mandatory True/False click-picker with no keyboard path, which some clients
// can't reach at all. A string lets people type the value — `wantsMissionAssist`
// (missions/player.js) reads anything but an explicit "false"/"no"/"0"/"off" as yes.
const MISSION_COMMAND = {
  name: "mission",
  description: "Read the briefing for the mission you're holding",
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
  options: [
    {
      name: "assist",
      description: 'Co-op missions: type "true" to post a call for backup in the mission channel',
      type: 3, // STRING
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

// The answer to the Chancellor's audience: a lucky errand house-change click
// opens one, and this names the house (missions/houseChange.js handleRequest). Choices
// rather than free text, so the house can never be misspelled; refusing the
// errand's current house is the handler's job.
const REQUEST_COMMAND = {
  name: "request",
  description: "Errand missions: name the house you want when the Chancellor hears you",
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
  options: [
    {
      name: "house",
      description: "The house your errand should move to",
      type: 3, // STRING
      required: true,
      choices: Object.values(HOUSES).map((house) => ({ name: house, value: house })),
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
      description: "Show whether missions are running in this server",
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

// Owner-only test tooling for public encounters (plus a read-only `missions`
// peek at the mission schedule, which is otherwise not shown anywhere).
// default_member_permissions '0' hides it from everyone without Administrator;
// handleEncounterDev then hard-gates on OWNER_DISCORD_ID, so even another server
// admin who can see it can't run it. Guild-install and guild-context only.
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
        {
          name: "scene",
          description: "Make this encounter's win a call scene (if the character has one at your tier)",
          type: 5, // BOOLEAN
          required: false,
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
      name: "reset",
      description: "Clear your /roam and /meet cooldowns (DB + invoke throttle) for testing",
      options: [
        {
          name: "command",
          description: "Which command to reset (defaults to both)",
          type: 3, // STRING
          required: false,
          choices: [
            { name: "roam", value: "roam" },
            { name: "meet", value: "meet" },
            { name: "both", value: "both" },
          ],
        },
      ],
    },
    {
      type: 1, // SUB_COMMAND
      name: "missions",
      description: "Show this server's mission slot times for today",
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
    {
      type: 1, // SUB_COMMAND
      name: "warding",
      description: "Preview a warding card render (grants nothing, writes nothing)",
      options: [
        {
          name: "character",
          description: "Draw from this character's written cards; random if omitted",
          type: 3, // STRING
          required: false,
        },
        {
          name: "card",
          description: "An exact card key, e.g. Rui_2 — wins over `character`",
          type: 3, // STRING
          required: false,
        },
      ],
    },
    {
      type: 1, // SUB_COMMAND
      name: "hangout",
      description: "Launch the free Hangout Activity here, no /meet encounter (docs/hangout-activity.md)",
      options: [
        {
          name: "version",
          description: "Which hangout to launch; v2 (Live2D) if omitted",
          type: 3, // STRING
          required: false,
          choices: [
            { name: "v2: Live2D", value: "v2" },
            { name: "v1: sprite rig (legacy)", value: "v1" },
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
    {
      type: 1, // SUB_COMMAND
      name: "chancellor",
      description: "Preview the Chancellor's audience message (cosmetic, touches nothing)",
      options: [
        {
          name: "face",
          description: "Which state to show (listening if omitted)",
          type: 3, // STRING
          required: false,
          choices: [
            { name: "listening (default.png)", value: "listening" },
            { name: "granted (close.png)", value: "granted" },
          ],
        },
      ],
    },
  ],
};

// Countdown channels (docs/countdown.md §5): a voice, stage or category
// channel whose name counts down to the next Wishing Well date or custom
// event. `disable` is a subcommand group so it reads `/countdown disable
// wishingwell` with no `which:` option; Discord allows groups and plain
// subcommands side by side. channel_types only filters Discord's picker;
// text channels are left out because Discord lowercases and hyphenates their
// names.
const COUNTDOWN_CHANNEL_OPTION = {
  type: 7, // CHANNEL
  name: "channel",
  description: "A voice, stage, or category channel to rename",
  required: true,
  channel_types: [2, 13, 4], // GUILD_VOICE, GUILD_STAGE_VOICE, GUILD_CATEGORY
};

const COUNTDOWN_COMMAND = {
  name: "countdown",
  description: "Set up channels that count down to Wishing Wells and events",
  type: 1,
  default_member_permissions: "32", // MANAGE_GUILD
  integration_types: [0],
  contexts: [0],
  options: [
    {
      type: 1, // SUB_COMMAND
      name: "wishingwell",
      description: "Rename a channel to count down to the next Wishing Well",
      options: [COUNTDOWN_CHANNEL_OPTION],
    },
    {
      type: 1,
      name: "customevent",
      description: "Rename a channel to count down to this server's next event",
      options: [COUNTDOWN_CHANNEL_OPTION],
    },
    {
      type: 1,
      name: "timezone",
      description: "Set the timezone countdown days are counted in",
      options: [
        {
          type: 3, // STRING
          name: "tz",
          description: "e.g. America/New_York or Asia/Tokyo",
          required: true,
          autocomplete: true,
        },
      ],
    },
    {
      type: 2, // SUB_COMMAND_GROUP
      name: "disable",
      description: "Stop a countdown and restore the channel's old name",
      options: [
        { type: 1, name: "wishingwell", description: "Stop the Wishing Well countdown" },
        { type: 1, name: "customevent", description: "Stop the custom event countdown (events are kept)" },
      ],
    },
    {
      type: 1,
      name: "status",
      description: "Show what each countdown channel shows",
    },
  ],
};

// The custom events /countdown customevent counts down to (docs/countdown.md
// §6). Manage Server for the whole command, `list` included. `event` has
// autocomplete: admins pick "Nov 14 · Fan Meet · #3" and the value is the #ID,
// so events can share a name. STRING rather than INTEGER so typing a name
// filters the list; an INTEGER field only accepts digits.
const EVENT_OPTION = {
  type: 3, // STRING
  name: "event",
  description: "Which event",
  required: true,
  autocomplete: true,
};

const EVENT_COMMAND = {
  name: "event",
  description: "Manage this server's custom countdown events",
  type: 1,
  default_member_permissions: "32", // MANAGE_GUILD
  integration_types: [0],
  contexts: [0],
  options: [
    {
      type: 1,
      name: "create",
      description: "Add an event",
      options: [
        { type: 3, name: "name", description: `Event name (up to ${EVENT_NAME_MAX} characters)`, required: true, max_length: EVENT_NAME_MAX },
        { type: 3, name: "date", description: "YYYY-MM-DD, in the server's countdown timezone", required: true },
      ],
    },
    {
      type: 1,
      name: "edit",
      description: "Change an event's name or date",
      options: [
        EVENT_OPTION,
        { type: 3, name: "name", description: `New name (up to ${EVENT_NAME_MAX} characters)`, required: false, max_length: EVENT_NAME_MAX },
        { type: 3, name: "date", description: "New date, YYYY-MM-DD", required: false },
      ],
    },
    {
      type: 1,
      name: "delete",
      description: "Remove an event",
      options: [EVENT_OPTION],
    },
    {
      type: 1,
      name: "list",
      description: "List upcoming events",
    },
  ],
};

// Public and read-only (docs/countdown.md §8): upcoming Wishing Well dates as
// Discord timestamps, so each viewer sees their own timezone.
const WISHINGWELL_COMMAND = {
  name: "wishingwell",
  description: "See upcoming Wishing Well dates",
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

// The Hangout Activity's entry point (docs/hangout-activity.md §6, §11.1).
// Type 4 (PRIMARY_ENTRY_POINT). Once Activities are on, Discord insists on
// an entry point and rejects any bulk overwrite without one (error 50240),
// so it can't be left out. Handler 1 (APP_HANDLER): Discord sends app.js an
// interaction for it, answered exactly like /meet (same picker, cooldown and
// invoke throttle), so it's no way around /meet. Until release it stays
// hidden like /encdev (default_member_permissions "0"), and the token route
// refuses everyone but OWNER_DISCORD_ID (activityRoutes.js).
const LAUNCH_COMMAND = {
  name: "launch",
  description: "Pick someone to meet up with",
  type: 4,
  handler: 1,
  default_member_permissions: "0",
  integration_types: [0],
  contexts: [0],
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
  REQUEST_COMMAND,
  ENCOUNTERS_COMMAND,
  MISSIONS_COMMAND,
  COUNTDOWN_COMMAND,
  EVENT_COMMAND,
  WISHINGWELL_COMMAND,
  LAUNCH_COMMAND,
  ENCDEV_COMMAND,
  MISSIONDEV_COMMAND,
];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
