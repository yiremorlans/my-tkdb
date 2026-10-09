// Scheduled missions — the player's side (docs/scheduled-missions.md).
// Content pools and pure helpers live in constants/missions.js; the tick that
// drives spawnMission/sweepExpiredMissions rides in encounterScheduler.js
// alongside the encounter pass.
//
// This file holds Accept, /mission and its co-op assist and debrief, and the
// errand's /docs and field report. The rest is split by seam:
//   houseChange.js  the errand's house change: the button, the Chancellor's
//                   audience and /request
//   riddle.js       /riddle
//   resets.js       banked cooldown resets (offered on a /roam or /meet cooldown)
//   posts.js        spawning, the scheduler pass, expiry and post reconcile
//   dossier.js      /house
//   admin.js        /missions and /missiondev
//   shared.js       reply/message shapes and helpers more than one of them uses
//
// The shape here mirrors publicEncounters.js on purpose: slash handlers return
// `{ reply, afterReply }` so the reward writes and the channel edits happen
// after the user already has their answer, and component handlers return a
// ready-made interaction response so app.js stays a router.

import {
  ButtonStyleTypes,
  InteractionResponseType,
  MessageComponentTypes,
} from "discord-interactions";
import { EPHEMERAL } from "../utils.js";
import {
  ACCEPT_WINDOW_HOURS,
  BANKED_RESET_LINE,
  busyLine,
  CAPPED_LINE,
  clearRiddleCooldowns,
  COOP_DEBRIEF_WAITING_LINE,
  DAILY_LEAD_CAP,
  DEBRIEF_BUTTON_LABEL,
  DEBRIEF_FACE,
  DEBRIEF_LINES,
  DEBRIEF_REFUSAL_LINES,
  debriefReminderLine,
  formatNameList,
  getRiddle,
  localDayKey,
  localDayStart,
  MISSION_BOOST_LINE,
  MISSION_ERROR_LINE,
  MISSION_INSTRUCTIONS,
  MISSION_PICKED_UP,
  MISSION_TYPE_LABEL,
  MISSION_TYPES,
  missionObjectiveLine,
  missionProgressLine,
  nextSlotAt,
  pickDebriefStudent,
  HOUSE_CHANGE_BUTTON_LABEL,
  HOUSE_CHANGE_HINT,
  HOUSE_CHANGE_UNAVAILABLE_LINES,
} from "../constants/missions.js";
import { ENCOUNTER_BOOST_CAP, pickRandom } from "../constants/publicEncounters.js";
import { composeFieldReport } from "../imageComposition.js";
import { pendingBoosts } from "../encounters.js";
import { getCharacterById, getFullName } from "../constants/characters.js";
import {
  claimCoopHelper,
  claimDebrief,
  claimMission,
  errandTargets,
  fileErrand,
  getAcceptedMission,
  getGuildSettings,
  getMissionById,
  getUnclaimedDebriefs,
  grantEncounterBoost,
  recordMissionCompletion,
  setAssistMessageId,
  trackCommandUsage,
  trackUserActivity,
} from "../db/supabase.js";
import {
  acceptRow,
  ephemeral,
  ephemeralPortraitMessage,
  ephemeralResponse,
  errandProgress,
  houseChangeBlocker,
  missionEmbed,
  missionTypeGuard,
  reportFailures,
  resolveMissionChannel,
  userIdOf,
} from "./shared.js";

// The accepter's name for a mission post, rendered **bold**: server nickname
// first, then the global display name, then the @handle. Plain text (no
// `<@id>` tag) so the post names them without pinging. The "Someone" fallback
// is left unbolded.
function displayNameOf(body) {
  const user = body.member?.user || body.user;
  const name = body.member?.nick || user?.global_name || user?.username;
  return name ? `**${name}**` : "Someone";
}

// The `assist` option on /mission is a free-typed string (see commands.js).
// It only ever means "yes, call for backup", so any value counts as yes
// unless it's an explicit negative — this is what lets `/mission assist:true`,
// `assist:True`, `assist:yes` all work, while `assist:false` still opts out.
const ASSIST_NEGATIVES = new Set(["false", "f", "no", "n", "0", "off"]);
export function wantsMissionAssist(body) {
  const opt = body.data?.options?.find((o) => o.name === "assist");
  if (!opt) return false;
  const value = String(opt.value ?? "").trim().toLowerCase();
  if (value === "") return false;
  return !ASSIST_NEGATIVES.has(value);
}

// --- Accept button ----------------------------------------------------------

// The per-player limits every claim (Accept and co-op Join) is checked against.
function claimLimits(now) {
  return { dayStart: localDayStart(now), dailyLeadCap: DAILY_LEAD_CAP };
}

// The ephemeral refusal for a claim this player can't make right now
// ('busy:<type>' or 'capped', from mission_claim_blocker), or null.
function claimRefusal(outcome) {
  if (outcome === "capped") return ephemeralResponse(CAPPED_LINE);
  if (typeof outcome === "string" && outcome.startsWith("busy")) {
    return ephemeralResponse(busyLine(outcome.split(":")[1]));
  }
  return null;
}

/**
 * `mission:accept:<id>`.
 *
 * The post's Accept button is disabled on a confirmed win AND on a 'taken'
 * result — both mean the mission is claimed, so it should stop taking clicks
 * (the 'taken' edit is also the fast self-heal for a win-edit that failed).
 * A 'busy'/'capped' click, where the mission is still open, gets an ephemeral
 * and leaves the button live for the next person — a shared button cannot be
 * disabled per user, so someone already holding a mission WILL click it, and
 * that has to be harmless.
 */
export async function handleMissionAccept(body, missionId, now = new Date()) {
  const userId = userIdOf(body);

  let outcome;
  try {
    outcome = await claimMission(missionId, userId, {
      acceptHours: ACCEPT_WINDOW_HOURS,
      ...claimLimits(now),
    });
  } catch (err) {
    console.error("[missions] claim_mission failed:", err.message);
    return {
      response: ephemeralResponse(
        "Something went wrong picking that up. Try again?",
      ),
    };
  }

  // Busy, or at their daily limit. Like every other refusal this leaves the
  // request open and its button live — which is the entire point of the cap,
  // since the next person to click is exactly who it was held back for.
  const refusal = claimRefusal(outcome);
  if (refusal) return { response: refusal };

  // 'taken' — someone else already holds it. Unlike 'busy'/'capped' (where the
  // mission is still open and its button must stay live for the next eligible
  // clicker), a 'taken' result is proof the mission is claimed, so the shared
  // post SHOULD be showing a dead button. Re-assert that here, not only on the
  // win: it's how a post whose win-edit failed (see app.js -> the reconcile
  // flag) stops taking clicks on the very next click instead of waiting for the
  // sweep. Only the button is touched — the winner's "X has picked up the
  // mission" line, if it landed, is left as-is, and the reconcile sweep still
  // owns fixing the text when the win-edit is what failed.
  if (outcome !== "claimed") {
    return {
      response: {
        type: InteractionResponseType.UPDATE_MESSAGE,
        data: { components: acceptRow(missionId, { disabled: true }) },
      },
      followup: ephemeral("Someone got there first."),
    };
  }

  // The briefing `/mission` would show, pushed to the accepter now as an
  // ephemeral so they learn the house, the type and their next step without
  // having to know `/mission` exists. Best-effort: if the row can't be
  // reloaded the pickup still stands and `/mission` is the fallback.
  let followup;
  try {
    const mission = await getAcceptedMission(userId);
    followup = mission
      ? { ...(await buildMissionBriefing(userId, mission)), flags: EPHEMERAL }
      : ephemeral(
          "You've picked up the mission. Run `/mission` for the briefing.",
        );
  } catch (err) {
    console.error(
      "[missions] Could not build the pickup briefing:",
      err.message,
    );
    followup = ephemeral(
      "You've picked up the mission. Run `/mission` for the briefing.",
    );
  }

  return {
    response: {
      type: InteractionResponseType.UPDATE_MESSAGE,
      data: {
        // `content` and `attachments` are cleared explicitly so a request
        // posted in the old text-plus-background shape edits cleanly into the
        // embed rather than keeping its first line and its upload above it.
        content: null,
        attachments: [],
        embeds: [missionEmbed(missionId, MISSION_PICKED_UP(displayNameOf(body)))],
        components: acceptRow(missionId, { disabled: true }),
        allowed_mentions: { parse: [] },
      },
    },
    followup,
    afterReply: async () => {
      await Promise.allSettled([
        trackUserActivity(userId),
        trackCommandUsage(userId, "mission"),
      ]);
    },
  };
}

// --- /mission ---------------------------------------------------------------

// An errand's house-change button (migration 025), plus the 🔒 line explaining
// it when a signature has greyed it out (null while it's live, and null once
// spent: the 🔒 on the button already says that). Mirrors change_errand_house's own
// checks so the button greys out before the click instead of after it — the
// RPC still re-checks under the row lock, which is what makes a stale button
// harmless. `signed` is the count the caller already has.
// `from` is which message the button sits on ("docs" or the briefing), carried
// in the custom_id so a successful change can redraw that same message rather
// than swapping a report sheet for a briefing.
function houseChangeControls(mission, signed, from = "briefing") {
  const blocker = houseChangeBlocker(mission, signed);
  return {
    note: blocker === "signed" ? HOUSE_CHANGE_UNAVAILABLE_LINES.signed : null,
    button: {
      type: MessageComponentTypes.BUTTON,
      // Colored while it can still be used, grey once spent or blocked.
      style: blocker ? ButtonStyleTypes.SECONDARY : ButtonStyleTypes.PRIMARY,
      label: HOUSE_CHANGE_BUTTON_LABEL,
      custom_id: `mission:house:${mission.id}${from === "docs" ? ":docs" : ""}`,
      disabled: blocker !== null,
      ...(blocker && { emoji: { name: "🔒" } }),
    },
  };
}

/**
 * The briefing, as `{ content, components }`. Ephemeral, always: it names the
 * house, the type and (for an errand) the exact students to chase, none of
 * which the channel ever sees.
 *
 * The instruction block is always present, by design — a player holding a type
 * they don't know how to finish is a slot nobody can free.
 *
 * An errand also carries its house-change button here, so it's on the pickup
 * briefing — the first moment the player learns the house — as well as on
 * /mission.
 */
export async function buildMissionBriefing(userId, mission) {
  const label =
    MISSION_TYPE_LABEL[mission.mission_type] || mission.mission_type;

  let objective;
  let progress;
  let houseChange = null;

  if (mission.mission_type === MISSION_TYPES.ERRAND) {
    const { unsigned, signed, required } = errandProgress(mission);
    objective = missionObjectiveLine(mission, {
      targetIds: unsigned.map((t) => t.characterId),
    });
    progress = missionProgressLine(mission, { signed, required });
    houseChange = houseChangeControls(mission, signed);
  } else if (mission.mission_type === MISSION_TYPES.RIDDLE) {
    objective = missionObjectiveLine(mission, {
      riddle: getRiddle(mission.house, mission.riddle_id),
    });
    progress = missionProgressLine(mission);
  } else {
    objective = missionObjectiveLine(mission);
    progress = missionProgressLine(mission);
  }

  const deadline = mission.accept_expires_at
    ? `\nCloses <t:${Math.floor(new Date(mission.accept_expires_at).getTime() / 1000)}:R>.`
    : "";

  const note = houseChange?.note;
  // Only offered while the change is live: not once spent, not once signed.
  const hint =
    houseChange && !note && !mission.house_changed_at ? ` ${HOUSE_CHANGE_HINT}` : "";

  const content = [
    `**MISSION BRIEFING**  ·  ${mission.house}  ·  ${label}`,
    "",
    objective,
    "",
    `Progress: ${progress}${deadline}`,
    "",
    `${MISSION_INSTRUCTIONS[mission.mission_type] || ""}${hint}`,
    ...(note ? ["", note] : []),
  ]
    .join("\n")
    .trim();

  if (!houseChange) return { content };

  return {
    content,
    components: [
      {
        type: MessageComponentTypes.ACTION_ROW,
        components: [houseChange.button],
      },
    ],
  };
}

/**
 * `/mission` — the briefing, or where the next one lands.
 * `/mission assist:true` — the co-op call for backup (§7).
 */
export async function handleMission(body, now = new Date()) {
  const userId = userIdOf(body);
  const wantsAssist = wantsMissionAssist(body);

  const mission = await getAcceptedMission(userId);

  if (wantsAssist) return handleMissionAssist(body, mission);

  // Independent reads: the briefing (or the no-mission line) never depends
  // on whether a debrief is waiting, and the reminder only appends below it.
  const [message, reminder] = await Promise.all([
    mission
      ? buildMissionBriefing(userId, mission)
      : noMissionLine(body, now).then((content) => ({ content })),
    debriefReminder(userId),
  ]);
  const reply = { ...withDebriefReminder(message, reminder), flags: EPHEMERAL };

  if (!mission) return { reply, afterReply: null };

  return {
    reply,
    afterReply: async () => {
      await Promise.allSettled([
        trackUserActivity(userId),
        trackCommandUsage(userId, "mission"),
      ]);
    },
  };
}

// The newest unclaimed co-op debrief as `{ line, button }`, or null (§21.5).
// Best-effort: a failed lookup costs the reminder, never /mission itself.
async function debriefReminder(userId) {
  let debriefs;
  try {
    debriefs = await getUnclaimedDebriefs(userId);
  } catch (err) {
    console.error(`[missions] Could not load debriefs for ${userId}:`, err.message);
    return null;
  }
  if (!debriefs.length) return null;

  const [newest] = debriefs;
  return {
    line: debriefReminderLine(newest.house, debriefs.length - 1),
    button: debriefButton(newest.id),
  };
}

// Puts the reminder below whatever /mission is already showing, its button in
// a row of its own.
function withDebriefReminder(message, reminder) {
  if (!reminder) return message;
  return {
    ...message,
    content: `${message.content}\n\n${reminder.line}`,
    components: [
      ...(message.components || []),
      { type: MessageComponentTypes.ACTION_ROW, components: [reminder.button] },
    ],
  };
}

function debriefButton(missionId) {
  return {
    type: MessageComponentTypes.BUTTON,
    style: ButtonStyleTypes.PRIMARY,
    label: DEBRIEF_BUTTON_LABEL,
    custom_id: `mission:debrief:${missionId}`,
  };
}

/**
 * What someone with nothing in hand is told. In a server with missions running
 * this points at the channel the next briefing lands in, but never the time:
 * a precise clock lets players line up on the Accept button before it posts,
 * so the slot is described only as "later today".
 */
async function noMissionLine(body, now) {
  const guildId = body.guild_id;
  if (!guildId)
    return "No active mission. Missions are handed out in servers, not here.";

  const guild = await getGuildSettings(guildId).catch(() => null);
  if (!guild?.missions_enabled || guild.locked) {
    return "No active mission. Missions aren't running in this server.";
  }

  if (guild.mission_slots_day !== localDayKey(now)) {
    return "No active mission. The next briefing lands sometime today.";
  }

  const at = nextSlotAt(
    guild.mission_slots_today,
    guild.mission_slots_fired,
    now,
  );
  const channel = resolveMissionChannel(guild);
  const where = channel ? ` Watch <#${channel}>.` : "";

  return at
    ? `No active mission. The next briefing lands later today.${where}`
    : `No active mission. Today's briefings have all been handed out. Try again tomorrow.${where}`;
}

// --- /mission assist (co-op) ------------------------------------------------

async function handleMissionAssist(body, mission) {
  const userId = userIdOf(body);
  const guildId = body.guild_id;

  const guardReply = missionTypeGuard(mission, MISSION_TYPES.COOP, {
    noMission: "You have no mission to call backup for.",
    wrongType: "Your current mission doesn't need a partner.",
  });
  if (guardReply) return { reply: guardReply, afterReply: null };

  if (!guildId) {
    return {
      reply: ephemeral(
        "Call for backup from the server the mission came from.",
      ),
      afterReply: null,
    };
  }
  if (mission.assist_message_id) {
    return {
      reply: ephemeral(
        `Your call for backup is already up in <#${mission.channel_id}>.`,
      ),
      afterReply: null,
    };
  }
  // The call for backup goes out as this command's own reply, so it lands in
  // the channel the command was run from. Run it anywhere but the mission
  // channel and the inspectors watching for missions would never see it — so
  // that's refused, with a pointer to the right channel.
  const invokedChannelId = body.channel_id ?? body.channel?.id ?? null;
  if (invokedChannelId && invokedChannelId !== mission.channel_id) {
    return {
      reply: ephemeral(
        `Run \`/mission assist:true\` in <#${mission.channel_id}>, where the mission was posted.`,
      ),
      afterReply: null,
    };
  }

  // The reply IS the public post — no defer, no ephemeral ack (app.js sends it
  // as a plain CHANNEL_MESSAGE_WITH_SOURCE). The lead is named in plain text,
  // not @mentioned, and allowed_mentions is closed off entirely, so the call
  // pings no one. The house still stays out of it — the helper learns nothing
  // until they have clicked.
  return {
    publicReply: {
      content: `🚨 ${displayNameOf(body)} needs help during this house mission!`,
      embeds: [
        missionEmbed(
          mission.id,
          "First inspector to back them up clears it for both of you — one house log each, plus a banked cooldown reset.",
        ),
      ],
      components: [
        {
          type: MessageComponentTypes.ACTION_ROW,
          components: [
            {
              type: MessageComponentTypes.BUTTON,
              style: ButtonStyleTypes.PRIMARY,
              label: "Join the mission",
              custom_id: `mission:assist:${mission.id}`,
            },
          ],
        },
      ],
      allowed_mentions: { parse: [] },
    },
    // `originalMessageId` is the id of the reply Discord posted for us, read
    // back from @original by app.js. If it's lost the post is still live and
    // still claimable — the only cost is that a second /mission assist would
    // post a duplicate.
    afterReply: async ({ originalMessageId } = {}) => {
      if (originalMessageId) {
        await setAssistMessageId(mission.id, originalMessageId).catch((err) =>
          console.error(
            `[missions] Could not store assist_message_id for ${mission.id}:`,
            err.message,
          ),
        );
      }
      await Promise.allSettled([
        trackUserActivity(userId),
        trackCommandUsage(userId, "mission"),
      ]);
    },
  };
}

/**
 * `mission:assist:<id>` — a second user backing the accepter up. Under the same
 * rules as an Accept (migration 029): it counts toward DAILY_LEAD_CAP, and
 * someone already holding a mission of their own can't answer a call for
 * backup. A refused click leaves the call live for the next inspector.
 */
export async function handleMissionAssistJoin(body, missionId, now = new Date()) {
  const helperId = userIdOf(body);

  let mission;
  try {
    mission = await getMissionById(missionId);
  } catch (err) {
    console.error("[missions] Could not load co-op mission:", err.message);
    return {
      response: ephemeralResponse(MISSION_ERROR_LINE),
    };
  }
  if (!mission)
    return { response: ephemeralResponse("That mission's already closed.") };

  let outcome;
  try {
    outcome = await claimCoopHelper(missionId, helperId, claimLimits(now));
  } catch (err) {
    console.error("[missions] claim_coop_helper failed:", err.message);
    return {
      response: ephemeralResponse(MISSION_ERROR_LINE),
    };
  }

  if (outcome === "self") {
    return { response: ephemeralResponse("You can't back yourself up.") };
  }
  const refusal = claimRefusal(outcome);
  if (refusal) return { response: refusal };
  if (outcome !== "joined") {
    return { response: ephemeralResponse("That mission's already covered.") };
  }

  const helperName = displayNameOf(body);
  const leadId = mission.accepted_by;

  // Both players are pinged so each learns their debrief is waiting (§21.2).
  // The mentions go in `content` because embeds never ping, and
  // allowed_mentions names exactly these two.
  return {
    response: {
      type: InteractionResponseType.UPDATE_MESSAGE,
      data: {
        content: `<@${leadId}> <@${helperId}>`,
        attachments: [],
        embeds: [
          missionEmbed(
            mission.id,
            `${helperName} answered the call for backup. Mission complete.\nBoth of you have banked a cooldown reset.\n${COOP_DEBRIEF_WAITING_LINE}`,
          ),
        ],
        components: [
          {
            type: MessageComponentTypes.ACTION_ROW,
            components: [debriefButton(mission.id)],
          },
        ],
        allowed_mentions: { users: [leadId, helperId] },
      },
    },
    afterReply: async () => {
      clearRiddleCooldowns(mission.id);

      // Two mission_log rows, which ARE the two banked resets — a co-op's is
      // worth one command against a solo clear's two, and which command it
      // clears is decided when they spend it rather than now. A reset stamped
      // 'roam' at completion would be worth nothing to someone who later wants
      // /meet, and a reward you can be handed in a useless form is the whole
      // problem banking these was meant to fix.
      await Promise.allSettled([
        recordMissionCompletion({
          userId: leadId,
          house: mission.house,
          missionType: mission.mission_type,
          missionId: mission.id,
          role: "lead",
          points: 1,
        }),
        recordMissionCompletion({
          userId: helperId,
          house: mission.house,
          missionType: mission.mission_type,
          missionId: mission.id,
          role: "assist",
          points: 1,
        }),
        trackUserActivity(helperId),
        trackCommandUsage(helperId, "mission"),
      ]).then(reportFailures("co-op completion"));
    },
  };
}

// --- co-op debrief ---------------------------------------------------------

/**
 * `mission:debrief:<id>` — one player's private follow-up to a completed
 * co-op (§21.3): a student from the co-op's house, drawn for them alone, and
 * a pending boost with that student. One button serves both players, so the
 * role comes from who clicked; anyone else is refused. No expiry: the button
 * works for as long as the post (or /mission's reminder) exists.
 */
export async function handleMissionDebrief(body, missionId, now = new Date()) {
  const userId = userIdOf(body);

  // Independent reads: the boosts only feed the draw, which needs the user,
  // not the mission. A failed boosts read degrades to drawing from the whole
  // house (encounters.js pendingBoosts).
  let mission;
  let boosts;
  try {
    [mission, boosts] = await Promise.all([
      getMissionById(missionId),
      pendingBoosts(userId),
    ]);
  } catch (err) {
    console.error(`[missions] Could not load co-op ${missionId} for debrief:`, err.message);
    return { response: ephemeralResponse(MISSION_ERROR_LINE) };
  }
  // The custom_id is client-supplied, so don't trust that it names a
  // completed co-op just because it came off one.
  if (mission?.mission_type !== MISSION_TYPES.COOP || mission.status !== "completed") {
    return { response: ephemeralResponse(DEBRIEF_REFUSAL_LINES.closed) };
  }

  const role =
    userId === mission.accepted_by
      ? "lead"
      : userId === mission.helper_user_id
        ? "helper"
        : null;
  if (!role) return { response: ephemeralResponse(DEBRIEF_REFUSAL_LINES.notYours) };

  // Drawn before the claim, so a house with nobody to draw can't spend it.
  // Skips students they already hold a boost with, where the grant would be
  // capped to nothing.
  const student = pickDebriefStudent(mission.house, Object.keys(boosts));
  if (!student) {
    console.error(`[missions] Mission ${mission.id} has no students in ${mission.house} to debrief`);
    return { response: ephemeralResponse(MISSION_ERROR_LINE) };
  }

  let claimed;
  try {
    claimed = await claimDebrief(mission.id, role, now);
  } catch (err) {
    console.error(`[missions] Could not claim debrief on ${mission.id}:`, err.message);
    return { response: ephemeralResponse(MISSION_ERROR_LINE) };
  }
  if (!claimed) return { response: ephemeralResponse(DEBRIEF_REFUSAL_LINES.claimed) };

  // Fixed before the grant resolves, so the boost line never depends on it.
  const text = [
    `**Debrief: ${getFullName(student)}**`,
    pickRandom(DEBRIEF_LINES[student.id]),
    MISSION_BOOST_LINE(student.firstName),
  ].join("\n");

  return {
    response: {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: ephemeralPortraitMessage(student.id, DEBRIEF_FACE, text),
    },
    // No milestone and no affinity: the boost only adds to a later authored
    // response, same as the culprit reveal's (riddle.js handleRiddle).
    afterReply: async () => {
      await Promise.allSettled([
        grantEncounterBoost(userId, student.id, ENCOUNTER_BOOST_CAP),
        trackUserActivity(userId),
        trackCommandUsage(userId, "mission"),
      ]).then(reportFailures("co-op debrief"));
    },
  };
}

// --- /docs (errand) ---------------------------------------------------------

/**
 * The field report sheet. Discord shows no tooltip on a disabled button and
 * caps labels at MAX_BUTTON_LABEL_LENGTH, so "why can't I press this" has to
 * live in the message text — hence the 🔒 line naming exactly who is still
 * missing.
 */
export async function buildDocsMessage(mission, targets) {
  const unsigned = targets.filter((t) => !t.signed);
  const ready = unsigned.length === 0;

  const roster = targets
    .map((target) => {
      const character = getCharacterById(target.characterId);
      const name = character ? getFullName(character) : target.characterId;
      return `${target.signed ? "✅" : "⬜"} ${name}`;
    })
    .join("\n");

  const lines = [
    `**DARKWICK FIELD REPORT — ${mission.house}**   ·   ${targets.length} signature${
      targets.length === 1 ? "" : "s"
    }`,
    roster,
  ];

  if (!ready) {
    lines.push(
      "",
      `🔒 Need ${unsigned.length} more — ${formatNameList(unsigned.map((t) => t.characterId))}`,
    );
  }

  const houseChange = houseChangeControls(
    mission,
    targets.length - unsigned.length,
    "docs",
  );
  if (houseChange.note) lines.push(houseChange.note);

  return {
    content: lines.join("\n"),
    files: await fieldReportFile(mission, targets),
    components: [
      {
        type: MessageComponentTypes.ACTION_ROW,
        components: [
          {
            type: MessageComponentTypes.BUTTON,
            style: ready
              ? ButtonStyleTypes.SUCCESS
              : ButtonStyleTypes.SECONDARY,
            label: "Complete mission",
            custom_id: `mission:file:${mission.id}`,
            disabled: !ready,
          },
          houseChange.button,
        ],
      },
    ],
    flags: EPHEMERAL,
  };
}

// Signature art is named the way avatar art is: `FirstName_LastWord.png`, so
// "Romeo Scorpius Lucci" resolves to Romeo_Lucci.png.
function signatureFilename(character) {
  if (!character?.firstName || !character?.lastName) return null;
  return `${character.firstName}_${character.lastName.split(" ").pop()}.png`;
}

/**
 * The composited sheet for /docs — one signature block per target, with the
 * character's real signature on the line once they have been met.
 *
 * One attachment however many targets there are: the signatures are drawn onto
 * a single canvas rather than sent as four separate files.
 *
 * Unlike the messenger cat on a mission post, this cannot be served from
 * `/assets` by URL. The cat is the same static file for everyone, so Discord
 * fetches it once and caches it forever; this sheet is per-player, per-mission
 * state — who has signed and when — so there is no static file to point at.
 * The cost is bounded instead: the signatures are never upscaled (which is what
 * most of the bytes used to be), the sheet is only as tall as the targets it
 * has, and a report with nothing on it yet isn't composed at all.
 *
 * Returns undefined on any failure, which leaves /docs as the text checklist it
 * was — the roster is in the message either way, so this is never load-bearing.
 */
async function fieldReportFile(mission, targets) {
  // Nothing collected yet: there is no preview to show, and the text checklist
  // already says so. This is the common case on a fresh errand, and skipping it
  // means an errand costs no image payload at all until it has earned one.
  if (!targets.some((target) => target.signed)) return undefined;

  try {
    const rows = targets.map((target) => {
      const character = getCharacterById(target.characterId);
      return {
        name: character ? getFullName(character) : target.characterId,
        file: target.signed ? signatureFilename(character) : null,
        signedAt: target.signedAt,
      };
    });

    const buffer = await composeFieldReport(mission.house, rows);
    return [{ attachment: buffer, name: "field-report.png" }];
  } catch (err) {
    console.error(
      `[missions] Could not compose the field report for ${mission.id}:`,
      err.message,
    );
    return undefined;
  }
}

export async function handleDocs(body) {
  const userId = userIdOf(body);
  const mission = await getAcceptedMission(userId);

  const guardReply = missionTypeGuard(mission, MISSION_TYPES.ERRAND, {
    noMission: "You have no field paperwork right now.",
    wrongType: "Your current mission isn't paperwork.",
  });
  if (guardReply) return { reply: guardReply, afterReply: null };

  return {
    reply: await buildDocsMessage(mission, errandTargets(mission)),
    afterReply: async () => {
      await Promise.allSettled([
        trackUserActivity(userId),
        trackCommandUsage(userId, "docs"),
      ]);
    },
  };
}

/**
 * `mission:file:<id>` — the "return to base and do the paperwork" beat. The RPC
 * re-counts unsigned targets, so a button rendered before the last signature
 * landed cannot file the report early.
 */
export async function handleMissionFile(body, missionId) {
  const userId = userIdOf(body);

  let mission;
  try {
    mission = await getMissionById(missionId);
  } catch (err) {
    console.error("[missions] Could not load errand:", err.message);
    return {
      response: ephemeralResponse(MISSION_ERROR_LINE),
    };
  }
  if (!mission || mission.accepted_by !== userId) {
    return { response: ephemeralResponse("That mission's already closed.") };
  }

  let outcome;
  try {
    outcome = await fileErrand(missionId, userId);
  } catch (err) {
    console.error("[missions] file_errand failed:", err.message);
    return {
      response: ephemeralResponse(
        "Something went wrong filing that. Try again?",
      ),
    };
  }

  if (outcome === "not_ready") {
    return { response: ephemeralResponse("You're still short a signature.") };
  }
  // 'filed:<points>' — the count comes back from the row the RPC locked and
  // checked, rather than being re-derived here from a copy that could have
  // moved on since /docs rendered it.
  if (typeof outcome !== "string" || !outcome.startsWith("filed")) {
    return { response: ephemeralResponse("That mission's already closed.") };
  }

  const points = Number(outcome.split(":")[1]) || 1;

  return {
    response: {
      type: InteractionResponseType.UPDATE_MESSAGE,
      data: {
        content: `Report filed. ${mission.house} owes you one. **+${points} house log${points === 1 ? "" : "s"}**\n${BANKED_RESET_LINE}`,
        components: [],
      },
    },
    afterReply: async () => {
      clearRiddleCooldowns(mission.id);
      await Promise.allSettled([
        recordMissionCompletion({
          userId,
          house: mission.house,
          missionType: mission.mission_type,
          missionId: mission.id,
          role: "lead",
          points,
        }),
        trackUserActivity(userId),
        trackCommandUsage(userId, "docs"),
      ]).then(reportFailures("errand filing"));
    },
  };
}
