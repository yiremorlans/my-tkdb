// Scheduled missions — the I/O half (docs/scheduled-missions.md).
// Content pools and pure helpers live in constants/missions.js; the tick that
// drives spawnMission/sweepExpiredMissions rides in encounterScheduler.js
// alongside the encounter pass.
//
// The shape here mirrors publicEncounters.js on purpose: slash handlers return
// `{ reply, afterReply }` so the reward writes and the channel edits happen
// after the user already has their answer, and component handlers return a
// ready-made interaction response so app.js stays a router.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ButtonStyleTypes, InteractionResponseType, MessageComponentTypes } from 'discord-interactions';

import {
  ACCEPT_WINDOW_HOURS,
  ASSIST_LAPSED_LINES,
  BANKED_RESET_LINE,
  busyLine,
  CAPPED_LINE,
  DAILY_LEAD_CAP,
  clearRiddleCooldowns,
  dueSlots,
  formatNameList,
  getRiddle,
  getRiddleCooldownRemaining,
  inspectorRank,
  localDayKey,
  localDayStart,
  MISSION_INSTRUCTIONS,
  MISSION_PICKED_UP,
  MISSION_POST_FAILURE_LIMIT,
  MISSION_TEASERS,
  MISSION_TYPE_LABEL,
  MISSION_TYPES,
  MISSION_WITHDRAWN_LINES,
  missionObjectiveLine,
  missionProgressLine,
  nextSlotAt,
  pickRandom,
  pickRiddle,
  pickSignatureTargets,
  POST_TTL_HOURS,
  RESET_BUTTON_LABEL,
  RESET_SPENT_LINES,
  resetOfferLine,
  RIDDLE_WRONG_LINES,
  rollDailySlots,
  rollHouse,
  rollMissionType,
  rollSignatureCount,
  startRiddleCooldown,
} from './constants/missions.js';
import { matchCharacterGuess } from './constants/publicEncounters.js';
import { composeFieldReport } from './imageComposition.js';
import { getCharacterById, getFullName } from './constants/characters.js';
import { HOUSES } from './constants/backgrounds.js';
import { editChannelMessage, postChannelMessage } from './discordRest.js';
import { redeemCooldownReset, releaseCommandInvoke } from './commandLimits.js';
import {
  bumpGuildMissionPostFailure,
  claimCoopHelper,
  claimMission,
  clearGuildMissionPostFailures,
  completeMission,
  countCooldownResets,
  createMission,
  enableGuildMissions,
  expireMission,
  errandTargets,
  fileErrand,
  finalizeExpiredMissions,
  getAcceptedMission,
  getGuildSettings,
  getMissionById,
  getMissionLogStats,
  getOpenMission,
  getUserRelationships,
  markMissionSlotFired,
  recordMissionCompletion,
  rollGuildMissionSlots,
  setAssistMessageId,
  setGuildMissionsEnabled,
  setMissionMessageId,
  trackCommandUsage,
  trackUserActivity,
} from './db/supabase.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const EPHEMERAL = 64;

function ephemeral(content) {
  return { content, flags: EPHEMERAL };
}

function ephemeralResponse(content) {
  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: ephemeral(content),
  };
}

function userIdOf(body) {
  return body.member?.user?.id || body.user?.id;
}

function displayNameOf(body) {
  const user = body.member?.user || body.user;
  return body.member?.nick || user?.global_name || user?.username || 'Someone';
}

/**
 * Where this guild's missions post. Missions default to the encounter channel,
 * so a server that already runs `/encounters channel` can turn missions on with
 * no second setup step.
 */
export function resolveMissionChannel(guild) {
  return guild?.mission_channel_id || guild?.encounter_channel_id || null;
}

function acceptRow(missionId, { disabled = false } = {}) {
  return [
    {
      type: MessageComponentTypes.ACTION_ROW,
      components: [
        {
          type: MessageComponentTypes.BUTTON,
          style: ButtonStyleTypes.PRIMARY,
          label: 'Accept',
          custom_id: `mission:accept:${missionId}`,
          disabled,
        },
      ],
    },
  ];
}

// --- spawn ------------------------------------------------------------------

/**
 * Roll one mission, insert it, and post the request. The house and the type are
 * decided here and deliberately never reach the channel: the post is a teaser,
 * an image and one Accept button, and the only way to learn what you picked up
 * is to run `/mission` after you have it.
 *
 * Returns the row on success, or null if nothing was posted.
 *
 * `overrides` is only ever passed by the owner-only /missiondev test command:
 * `{ house, missionType }` pin what the rollers would otherwise decide. The
 * normal scheduler path passes nothing and everything is rolled.
 */
export async function spawnMission(guild, channelId, now = new Date(), overrides = {}) {
  const house = overrides.house || rollHouse();
  const missionType = overrides.missionType || rollMissionType();
  const teaser = pickRandom(MISSION_TEASERS);

  let riddleId = null;
  let targetIds = null;

  if (missionType === MISSION_TYPES.RIDDLE) {
    const riddle = pickRiddle(house);
    // A house with no authored riddles would spawn an unanswerable mission.
    // Nothing has been posted yet, so standing down costs only this slot.
    if (!riddle) {
      console.error(`[missions] No riddles authored for ${house} — skipping spawn`);
      return null;
    }
    riddleId = riddle.id;
  }

  if (missionType === MISSION_TYPES.ERRAND) {
    targetIds = pickSignatureTargets(house, rollSignatureCount(house));
    if (targetIds.length === 0) {
      console.error(`[missions] ${house} has no roster to draw signatures from — skipping spawn`);
      return null;
    }
  }

  const row = await createMission({
    guildId: guild.guild_id,
    channelId,
    missionType,
    house,
    riddleId,
    // Frozen with the row itself, so a mission can never exist in the window
    // where it claims to be an errand but has nothing to collect.
    targetIds,
    teaser,
    postExpiresAt: new Date(now.getTime() + POST_TTL_HOURS * 60 * 60 * 1000),
  });

  let message;
  try {
    message = await postChannelMessage(channelId, {
      embeds: [missionEmbed(row.id, teaser)],
      components: acceptRow(row.id),
      // The request names nobody and pings nobody.
      allowed_mentions: { parse: [] },
    });
  } catch (err) {
    console.error(`[missions] Post failed for guild ${guild.guild_id}:`, err.message);

    // Nobody can see it, so it must not sit there as this guild's "open"
    // mission and block the next slot.
    await expireMission(row.id).catch((e) =>
      console.error('[missions] Failed to close orphaned mission row:', e.message),
    );

    const { failures, disabled } = await bumpGuildMissionPostFailure(
      guild.guild_id,
      MISSION_POST_FAILURE_LIMIT,
    ).catch((e) => {
      console.error('[missions] Failed to record mission post failure:', e.message);
      return { failures: 0, disabled: false };
    });
    if (disabled) {
      console.error(
        `[missions] Disabled missions for guild ${guild.guild_id} after ${failures} consecutive post failures`,
      );
    }
    return null;
  }

  // The request is live. Anything that fails past this point is not a post
  // failure — the mission exists and is acceptable, and the sweep will finalize
  // it on time either way.
  await setMissionMessageId(row.id, message.id).catch((e) =>
    console.error(
      `[missions] Mission ${row.id} posted but message_id wasn't saved — its pickup edit will be skipped:`,
      e.message,
    ),
  );
  await clearGuildMissionPostFailures(guild.guild_id).catch((e) =>
    console.error('[missions] Failed to clear mission post failures:', e.message),
  );

  console.log(
    `[missions] Spawned ${missionType} for ${house} in guild ${guild.guild_id} (mission ${row.id})`,
  );
  return { ...row, message_id: message.id };
}

// --- the messenger cat ------------------------------------------------------

// The courier who carries the board's requests, and the only face a public
// mission message ever wears. Two coats, alternating on the mission's own
// BIGSERIAL id, so consecutive requests in a channel never arrive with the
// same cat — parity that lives in the row rather than in a counter here, which
// means it survives a restart, is the same in every guild's channel, and is
// identical for every edit made to one post.
const MESSENGER_CATS = ['Messenger_Cat.png', 'Messenger_Cat_2.png'];

// Deliberately not a house sprite or a location: the whole design rests on the
// post giving away neither the house nor the type, and a Frostheim courtyard
// would read as a tell whether or not it actually correlated. The cat is the
// same cat for every mission of every house.
function messengerCatUrl(missionId) {
  const baseUrl = process.env.BASE_URL || '';
  const file = MESSENGER_CATS[Math.abs(Number(missionId) || 0) % MESSENGER_CATS.length];
  return `${baseUrl}/assets/sprites/${file}`;
}

// The board's colour. Missions are house-blind in public, so this is fixed
// rather than drawn from the mission's house — the same reason the teaser is.
const MISSION_EMBED_COLOR = 0x5865f2;

/**
 * A public mission message, in the same shape as an encounter reveal
 * (publicEncounters.js): one embed carrying the line, the board's colour and
 * the courier as a thumbnail. The cat is served from `/assets` rather than
 * uploaded, so a request post and every edit to it cost no attachment payload
 * at all — and the image survives an edit without being re-sent.
 *
 * Discord rejects the whole message (400 URL_TYPE_INVALID_URL) if the
 * thumbnail isn't an absolute URL, which is what messengerCatUrl returns when
 * BASE_URL is unset. That's a deploy-config gap and it must not cost the
 * channel its mission, so drop the cat and keep the text.
 */
function missionEmbed(missionId, description) {
  const embed = { description, color: MISSION_EMBED_COLOR };

  const url = messengerCatUrl(missionId);
  if (/^https?:\/\//i.test(url)) {
    embed.thumbnail = { url };
  } else {
    console.error(
      `[missions] BASE_URL is unset or invalid — posting mission ${missionId} without the messenger cat (got "${url}")`,
    );
  }

  return embed;
}

// --- expiry -----------------------------------------------------------------

/**
 * A request nobody took. Edit the post to a withdrawal line, drop the image and
 * remove the button so a stale click can't reach a dead mission.
 */
export async function finalizeWithdrawnMission(row) {
  clearRiddleCooldowns(row.id);
  if (!row.message_id) return;

  try {
    await editChannelMessage(row.channel_id, row.message_id, {
      content: pickRandom(MISSION_WITHDRAWN_LINES),
      attachments: [],
      components: [],
      embeds: [],
    });
  } catch (err) {
    console.error(`[missions] Could not edit withdrawn mission ${row.id}:`, err.message);
  }
}

/**
 * A mission somebody accepted and ran out of time on. The pickup post moved on
 * hours ago and says nothing that is now false, so it is left alone — the one
 * exception is a co-op assist post, which is still standing there offering a
 * button that will never pay out.
 */
export async function finalizeLapsedMission(row) {
  clearRiddleCooldowns(row.id);
  if (!row.assist_message_id) return;

  try {
    await editChannelMessage(row.channel_id, row.assist_message_id, {
      content: pickRandom(ASSIST_LAPSED_LINES),
      components: [],
      embeds: [],
    });
  } catch (err) {
    console.error(`[missions] Could not edit lapsed assist post ${row.id}:`, err.message);
  }
}

/**
 * Finalize everything past its deadline, for one guild or all of them. Called
 * from the scheduler tick, and the restart-safety net with it: the state this
 * works from is entirely in Postgres.
 */
export async function sweepExpiredMissions(guildId = null, now = new Date()) {
  const { withdrawn, lapsed } = await finalizeExpiredMissions(guildId, now);

  for (const row of withdrawn) await finalizeWithdrawnMission(row);
  for (const row of lapsed) await finalizeLapsedMission(row);

  return { withdrawn, lapsed };
}

// --- scheduler pass ---------------------------------------------------------

/**
 * One guild's mission pass: roll the day if it has turned over, then post any
 * slot that has come due.
 *
 * A slot is spent whether or not it produced a mission. That is what keeps the
 * feature to three requests a day even when the host was asleep, when a request
 * from the last band is still on the board, or when a post failed outright —
 * "the moment passed" is a real outcome here, not an error to retry.
 */
export async function runGuildMissionPass(guild, now = new Date()) {
  const channelId = resolveMissionChannel(guild);
  if (!channelId) return null;

  const today = localDayKey(now);
  let slotsToday = guild.mission_slots_today || [];
  let fired = guild.mission_slots_fired || [];

  if (guild.mission_slots_day !== today || slotsToday.length === 0) {
    slotsToday = rollDailySlots(now);
    fired = [];
    await rollGuildMissionSlots(guild.guild_id, today, slotsToday);
    console.log(`[missions] Rolled ${today} slots for guild ${guild.guild_id}: ${slotsToday.join(', ')}`);
  }

  for (const slot of dueSlots(slotsToday, fired, now)) {
    if (slot.stale) {
      console.log(
        `[missions] Slot ${slot.index} for guild ${guild.guild_id} came due too late — skipping`,
      );
      fired = [...fired, slot.index];
      await markMissionSlotFired(guild.guild_id, slot.index, fired);
      continue;
    }

    // Never two live requests. The board holds one folder at a time.
    const open = await getOpenMission(guild.guild_id);
    if (open) {
      console.log(
        `[missions] Guild ${guild.guild_id} still has mission ${open.id} open — spending slot ${slot.index}`,
      );
      fired = [...fired, slot.index];
      await markMissionSlotFired(guild.guild_id, slot.index, fired);
      continue;
    }

    await spawnMission(guild, channelId, now).catch((err) =>
      console.error(`[missions] Spawn failed for guild ${guild.guild_id}:`, err.message),
    );

    fired = [...fired, slot.index];
    await markMissionSlotFired(guild.guild_id, slot.index, fired);

    // One request per tick, at most. Two slots coming due together (a long
    // outage) would otherwise post both at once, back to back in the channel.
    break;
  }

  return { slotsToday, fired };
}

// --- Accept button ----------------------------------------------------------

/**
 * `mission:accept:<id>`.
 *
 * The post is only ever mutated on a confirmed win. A lost race or an
 * over-limit click gets an ephemeral and leaves the button live for the next
 * person — which matters, because a button on a shared message cannot be
 * disabled per user, so someone already holding a mission WILL click it.
 */
export async function handleMissionAccept(body, missionId, now = new Date()) {
  const userId = userIdOf(body);

  let outcome;
  try {
    outcome = await claimMission(missionId, userId, {
      acceptHours: ACCEPT_WINDOW_HOURS,
      dayStart: localDayStart(now),
      dailyLeadCap: DAILY_LEAD_CAP,
    });
  } catch (err) {
    console.error('[missions] claim_mission failed:', err.message);
    return { response: ephemeralResponse('Something went wrong picking that up. Try again?') };
  }

  if (typeof outcome === 'string' && outcome.startsWith('busy')) {
    return { response: ephemeralResponse(busyLine(outcome.split(':')[1])) };
  }

  // At their daily limit. Like every other refusal this leaves the request open
  // and its button live — which is the entire point of the cap, since the next
  // person to click is exactly who it was held back for.
  if (outcome === 'capped') {
    return { response: ephemeralResponse(CAPPED_LINE) };
  }

  if (outcome !== 'claimed') {
    return { response: ephemeralResponse('Someone got there first.') };
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
    afterReply: async () => {
      await Promise.allSettled([trackUserActivity(userId), trackCommandUsage(userId, 'mission')]);
    },
  };
}

// --- /mission ---------------------------------------------------------------

/**
 * The briefing. Ephemeral, always: it names the house, the type and (for an
 * errand) the exact students to chase, none of which the channel ever sees.
 *
 * The instruction block is always present, by design — a player holding a type
 * they don't know how to finish is a slot nobody can free.
 */
export async function buildMissionBriefing(userId, mission) {
  const label = MISSION_TYPE_LABEL[mission.mission_type] || mission.mission_type;

  let objective;
  let progress;

  if (mission.mission_type === MISSION_TYPES.ERRAND) {
    const targets = errandTargets(mission);
    objective = missionObjectiveLine(mission, {
      targetIds: targets.filter((t) => !t.signed).map((t) => t.characterId),
    });
    progress = missionProgressLine(mission, {
      signed: targets.filter((t) => t.signed).length,
      required: targets.length,
    });
  } else if (mission.mission_type === MISSION_TYPES.RIDDLE) {
    objective = missionObjectiveLine(mission, { riddle: getRiddle(mission.house, mission.riddle_id) });
    progress = missionProgressLine(mission);
  } else {
    objective = missionObjectiveLine(mission);
    progress = missionProgressLine(mission);
  }

  const deadline = mission.accept_expires_at
    ? `\nCloses <t:${Math.floor(new Date(mission.accept_expires_at).getTime() / 1000)}:R>.`
    : '';

  return [
    `**MISSION BRIEFING**  ·  ${mission.house}  ·  ${label}`,
    '',
    objective,
    '',
    `Progress: ${progress}${deadline}`,
    '',
    MISSION_INSTRUCTIONS[mission.mission_type] || '',
  ]
    .join('\n')
    .trim();
}

/**
 * `/mission` — the briefing, or where the next one lands.
 * `/mission assist:True` — the co-op call for backup (§7).
 */
export async function handleMission(body, now = new Date()) {
  const userId = userIdOf(body);
  const wantsAssist = Boolean(body.data?.options?.find((o) => o.name === 'assist')?.value);

  const mission = await getAcceptedMission(userId);

  if (wantsAssist) return handleMissionAssist(body, mission);

  if (!mission) {
    return { reply: ephemeral(await noMissionLine(body, now)), afterReply: null };
  }

  return {
    reply: ephemeral(await buildMissionBriefing(userId, mission)),
    afterReply: async () => {
      await Promise.allSettled([trackUserActivity(userId), trackCommandUsage(userId, 'mission')]);
    },
  };
}

/**
 * What someone with nothing in hand is told. In a server with missions running
 * this points at the next unfired slot, which is deliberately fine to reveal:
 * unlike an encounter, knowing when a request lands wins you nothing — you
 * still have to be first to the button.
 */
async function noMissionLine(body, now) {
  const guildId = body.guild_id;
  if (!guildId) return 'No active mission. Missions are handed out in servers, not here.';

  const guild = await getGuildSettings(guildId).catch(() => null);
  if (!guild?.missions_enabled || guild.locked) {
    return "No active mission. Missions aren't running in this server.";
  }

  if (guild.mission_slots_day !== localDayKey(now)) {
    return 'No active mission. The next briefing lands sometime today.';
  }

  const at = nextSlotAt(guild.mission_slots_today, guild.mission_slots_fired, now);
  const channel = resolveMissionChannel(guild);
  const where = channel ? ` Watch <#${channel}>.` : '';

  return at
    ? `No active mission. The next briefing lands around <t:${Math.floor(at / 1000)}:t>.${where}`
    : `No active mission. Today's briefings have all been handed out. Try again tomorrow.${where}`;
}

// --- /mission assist (co-op) ------------------------------------------------

async function handleMissionAssist(body, mission) {
  const userId = userIdOf(body);
  const guildId = body.guild_id;

  if (!mission) {
    return { reply: ephemeral('You have no mission to call backup for.'), afterReply: null };
  }
  if (mission.mission_type !== MISSION_TYPES.COOP) {
    return {
      reply: ephemeral(`Your current mission doesn't need a partner. ${nextStepLine(mission)}`),
      afterReply: null,
    };
  }
  if (!guildId) {
    return {
      reply: ephemeral('Call for backup from the server the mission came from.'),
      afterReply: null,
    };
  }
  if (mission.assist_message_id) {
    return {
      reply: ephemeral(`Your call for backup is already up in <#${mission.channel_id}>.`),
      afterReply: null,
    };
  }

  const name = displayNameOf(body);

  // The house stays out of the assist post for the same reason it stays out of
  // the request: the helper learns nothing until they have clicked.
  let message;
  try {
    message = await postChannelMessage(mission.channel_id, {
      embeds: [
        missionEmbed(
          mission.id,
          `🚨 **${name}** needs a partner in the field. First inspector to back them up clears it for both of you.`,
        ),
      ],
      components: [
        {
          type: MessageComponentTypes.ACTION_ROW,
          components: [
            {
              type: MessageComponentTypes.BUTTON,
              style: ButtonStyleTypes.PRIMARY,
              label: 'Join the mission',
              custom_id: `mission:assist:${mission.id}`,
            },
          ],
        },
      ],
      allowed_mentions: { parse: [] },
    });
  } catch (err) {
    console.error(`[missions] Assist post failed for mission ${mission.id}:`, err.message);
    return {
      reply: ephemeral(`Couldn't post your call for backup in <#${mission.channel_id}>. Try again?`),
      afterReply: null,
    };
  }

  return {
    reply: ephemeral(`Your call for backup is up in <#${mission.channel_id}>.`),
    afterReply: async () => {
      // If this write is lost the post is still live and still claimable — the
      // only cost is that a second /mission assist would post a duplicate.
      await setAssistMessageId(mission.id, message.id).catch((err) =>
        console.error(`[missions] Could not store assist_message_id for ${mission.id}:`, err.message),
      );
      await Promise.allSettled([trackUserActivity(userId), trackCommandUsage(userId, 'mission')]);
    },
  };
}

/**
 * `mission:assist:<id>` — a second user backing the accepter up. The helper
 * does not spend a mission slot of their own, so someone already holding a
 * mission can still answer a call for backup.
 */
export async function handleMissionAssistJoin(body, missionId) {
  const helperId = userIdOf(body);

  let mission;
  try {
    mission = await getMissionById(missionId);
  } catch (err) {
    console.error('[missions] Could not load co-op mission:', err.message);
    return { response: ephemeralResponse('Something went wrong there. Try again?') };
  }
  if (!mission) return { response: ephemeralResponse("That mission's already closed.") };

  let outcome;
  try {
    outcome = await claimCoopHelper(missionId, helperId);
  } catch (err) {
    console.error('[missions] claim_coop_helper failed:', err.message);
    return { response: ephemeralResponse('Something went wrong there. Try again?') };
  }

  if (outcome === 'self') {
    return { response: ephemeralResponse("You can't back yourself up.") };
  }
  if (outcome !== 'joined') {
    return { response: ephemeralResponse("That mission's already covered.") };
  }

  const helperName = displayNameOf(body);
  const leadId = mission.accepted_by;

  return {
    response: {
      type: InteractionResponseType.UPDATE_MESSAGE,
      data: {
        content: null,
        attachments: [],
        embeds: [
          missionEmbed(
            mission.id,
            `**${helperName}** backed up <@${leadId}>. Mission complete.\nBoth of you have banked a cooldown reset.`,
          ),
        ],
        components: [],
        allowed_mentions: { parse: [] },
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
          role: 'lead',
          points: 1,
        }),
        recordMissionCompletion({
          userId: helperId,
          house: mission.house,
          missionType: mission.mission_type,
          missionId: mission.id,
          role: 'assist',
          points: 1,
        }),
        trackUserActivity(helperId),
        trackCommandUsage(helperId, 'mission'),
      ]).then(reportFailures('co-op completion'));
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
      return `${target.signed ? '✅' : '⬜'} ${name}`;
    })
    .join('\n');

  const lines = [
    `**DARKWICK FIELD REPORT — ${mission.house}**   ·   ${targets.length} signature${
      targets.length === 1 ? '' : 's'
    }`,
    roster,
  ];

  if (!ready) {
    lines.push('', `🔒 Need ${unsigned.length} more — ${formatNameList(unsigned.map((t) => t.characterId))}`);
  }

  return {
    content: lines.join('\n'),
    files: await fieldReportFile(mission, targets),
    components: [
      {
        type: MessageComponentTypes.ACTION_ROW,
        components: [
          {
            type: MessageComponentTypes.BUTTON,
            style: ready ? ButtonStyleTypes.SUCCESS : ButtonStyleTypes.SECONDARY,
            label: 'Complete mission',
            custom_id: `mission:file:${mission.id}`,
            disabled: !ready,
          },
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
  return `${character.firstName}_${character.lastName.split(' ').pop()}.png`;
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
    return [{ attachment: buffer, name: 'field-report.png' }];
  } catch (err) {
    console.error(`[missions] Could not compose the field report for ${mission.id}:`, err.message);
    return undefined;
  }
}

function nextStepLine(mission) {
  switch (mission.mission_type) {
    case MISSION_TYPES.RIDDLE:
      return 'Answer it with `/riddle`.';
    case MISSION_TYPES.COOP:
      return 'Call a partner with `/mission assist:True`.';
    case MISSION_TYPES.ERRAND:
      return 'Collect its signatures and file it with `/docs`.';
    default:
      return 'Check it with `/mission`.';
  }
}

export async function handleDocs(body) {
  const userId = userIdOf(body);
  const mission = await getAcceptedMission(userId);

  if (!mission) {
    return { reply: ephemeral('You have no field paperwork right now.'), afterReply: null };
  }
  if (mission.mission_type !== MISSION_TYPES.ERRAND) {
    return {
      reply: ephemeral(`Your current mission isn't paperwork. ${nextStepLine(mission)}`),
      afterReply: null,
    };
  }

  return {
    reply: await buildDocsMessage(mission, errandTargets(mission)),
    afterReply: async () => {
      await Promise.allSettled([trackUserActivity(userId), trackCommandUsage(userId, 'docs')]);
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
    console.error('[missions] Could not load errand:', err.message);
    return { response: ephemeralResponse('Something went wrong there. Try again?') };
  }
  if (!mission || mission.accepted_by !== userId) {
    return { response: ephemeralResponse("That mission's already closed.") };
  }

  let outcome;
  try {
    outcome = await fileErrand(missionId, userId);
  } catch (err) {
    console.error('[missions] file_errand failed:', err.message);
    return { response: ephemeralResponse('Something went wrong filing that. Try again?') };
  }

  if (outcome === 'not_ready') {
    return { response: ephemeralResponse("You're still short a signature.") };
  }
  // 'filed:<points>' — the count comes back from the row the RPC locked and
  // checked, rather than being re-derived here from a copy that could have
  // moved on since /docs rendered it.
  if (typeof outcome !== 'string' || !outcome.startsWith('filed')) {
    return { response: ephemeralResponse("That mission's already closed.") };
  }

  const points = Number(outcome.split(':')[1]) || 1;

  return {
    response: {
      type: InteractionResponseType.UPDATE_MESSAGE,
      data: {
        content: `Report filed. ${mission.house} owes you one. **+${points} house log${points === 1 ? '' : 's'}**\n${BANKED_RESET_LINE}`,
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
          role: 'lead',
          points,
        }),
        trackUserActivity(userId),
        trackCommandUsage(userId, 'docs'),
      ]).then(reportFailures('errand filing'));
    },
  };
}

// --- /riddle ----------------------------------------------------------------

export async function handleRiddle(body, now = new Date()) {
  const userId = userIdOf(body);
  const rawGuess = body.data?.options?.find((o) => o.name === 'answer')?.value ?? '';

  const mission = await getAcceptedMission(userId);
  if (!mission) {
    return { reply: ephemeral('You have no mission to answer for.'), afterReply: null };
  }
  if (mission.mission_type !== MISSION_TYPES.RIDDLE) {
    return {
      reply: ephemeral(`Your current mission isn't a riddle. ${nextStepLine(mission)}`),
      afterReply: null,
    };
  }

  const riddle = getRiddle(mission.house, mission.riddle_id);
  if (!riddle) {
    console.error(`[missions] Mission ${mission.id} references unknown riddle ${mission.riddle_id}`);
    return { reply: ephemeral('That report has gone missing from the file. Nothing to answer.'), afterReply: null };
  }

  // The 20s gate is what stops someone typing all 26 names in quick
  // succession. It is checked before the match so a wrong answer can't be
  // probed for free.
  const remaining = getRiddleCooldownRemaining(mission.id, userId, now.getTime());
  if (remaining > 0) {
    return {
      reply: ephemeral(`Give it a moment — try again in ${Math.ceil(remaining / 1000)}s.`),
      afterReply: null,
    };
  }

  const guessedId = matchCharacterGuess(rawGuess);
  if (guessedId !== riddle.answer) {
    startRiddleCooldown(mission.id, userId, now.getTime());
    return { reply: ephemeral(pickRandom(RIDDLE_WRONG_LINES)), afterReply: null };
  }

  let solved;
  try {
    solved = await completeMission(mission.id, userId, MISSION_TYPES.RIDDLE);
  } catch (err) {
    console.error('[missions] complete_mission failed:', err.message);
    return { reply: ephemeral('Something went wrong there. Try again?'), afterReply: null };
  }

  if (!solved) {
    return { reply: ephemeral('That mission just closed.'), afterReply: null };
  }

  const character = getCharacterById(riddle.answer);
  const name = character ? getFullName(character) : riddle.answer;

  return {
    reply: ephemeral(`Debunked. **${name}**.\n${BANKED_RESET_LINE}`),
    afterReply: async () => {
      clearRiddleCooldowns(mission.id);
      await Promise.allSettled([
        recordMissionCompletion({
          userId,
          house: mission.house,
          missionType: mission.mission_type,
          missionId: mission.id,
          role: 'lead',
          points: 1,
        }),
        trackUserActivity(userId),
        trackCommandUsage(userId, 'riddle'),
      ]).then(reportFailures('riddle solve'));
    },
  };
}

// --- banked cooldown resets -------------------------------------------------

/**
 * The "you're still on cooldown" reply for /roam or /meet, with the offer to
 * spend a banked mission reward attached if the player holds one.
 *
 * This is the ONLY place the reward is ever surfaced as an action, and that is
 * deliberate: it appears exactly when it is worth something and nowhere else,
 * so it can't be spent on a clock that was about to run out anyway. A player
 * with nothing banked sees precisely the message they saw before missions
 * existed.
 *
 * The credit read only happens on a path that was already turning the user
 * away, so a normal /roam pays nothing for it. A failed read drops the offer
 * rather than the message — being told to wait is still the correct answer.
 */
export async function cooldownReplyWithReset(userId, command, reason) {
  let held = 0;
  try {
    held = await countCooldownResets(userId);
  } catch (err) {
    console.error('[missions] Could not count banked cooldown resets:', err.message);
  }

  if (held === 0) return { content: reason, flags: EPHEMERAL };

  return {
    content: `${reason}\n${resetOfferLine(held)}`,
    components: [
      {
        type: MessageComponentTypes.ACTION_ROW,
        components: [
          {
            type: MessageComponentTypes.BUTTON,
            style: ButtonStyleTypes.SUCCESS,
            label: RESET_BUTTON_LABEL,
            custom_id: `mission:reset:${command}`,
          },
        ],
      },
    ],
    flags: EPHEMERAL,
  };
}

/**
 * `mission:reset:<roam|meet>` — spend one banked reset.
 *
 * Returns `{ outcome, refusal }`. `outcome` is 'roam' | 'meet' | 'both' when a
 * credit was actually spent; anything else is a refusal, and `refusal` carries
 * the interaction response to send. app.js takes it from there, because what
 * happens on success is to drop the caller straight into /roam or /meet, and
 * those builders live in encounters.js.
 *
 * Every guard is inside the RPC (db/migrations/017), so a stale button on an
 * ephemeral from hours ago is safe to click: it either finds the clock already
 * clear and keeps the credit, or finds nothing banked and says so.
 */
export async function handleCooldownReset(body, command) {
  const userId = userIdOf(body);
  const outcome = await redeemCooldownReset(userId, command);

  if (outcome === 'not_needed') {
    return {
      outcome,
      refusal: ephemeralResponse(
        `\`/${command}\` is ready now — no need to spend anything. Your reset is still banked.`,
      ),
    };
  }
  if (outcome === 'none') {
    return {
      outcome,
      refusal: ephemeralResponse('You have no cooldown resets banked. Finish a mission to earn one.'),
    };
  }
  if (!RESET_SPENT_LINES[outcome]) {
    return { outcome, refusal: ephemeralResponse('Something went wrong spending that. Try again?') };
  }

  // The database cooldown is only half of what stands between the player and
  // the command. The other half is the in-memory flood throttle, and they are
  // certainly inside it: the stamp was written by the very `/roam` or `/meet`
  // that turned them away and offered this button seconds ago.
  //
  // Left alone it would refuse them the reward they just paid for — visibly so
  // on the path where the prompt fails to render and the followup tells them to
  // run the command again. Dropping the stamp is safe by that function's own
  // reasoning: it only ever shortens the seconds-scale debounce, never the 3h
  // reward cooldown, so it cannot buy a second reward. And it is bounded by
  // something real — a reset has to be earned, and spending one is what got us
  // here.
  //
  // A 'both' reset frees the command they didn't ask about too, so its throttle
  // goes as well. Someone blocked on /roam has usually just tried /meet.
  for (const cleared of outcome === 'both' ? ['roam', 'meet'] : [outcome]) {
    releaseCommandInvoke(userId, cleared);
  }

  return { outcome, refusal: null };
}

// --- /house — the Inspector dossier -----------------------------------------

// The one line of the old /house kept: which house this player's heart is in,
// by summed affinity, alongside the record of what they have actually done.
async function closestHouseByAffinity(userId) {
  const relationships = await getUserRelationships(userId).catch((err) => {
    console.error('[missions] Could not read relationships for the dossier:', err.message);
    return [];
  });

  const totals = {};
  for (const relationship of relationships || []) {
    const character = getCharacterById(relationship.character_id);
    if (!character?.house) continue;
    totals[character.house] = (totals[character.house] || 0) + (relationship.affinity || 0);
  }

  const ranked = Object.entries(totals)
    .filter(([, affinity]) => affinity > 0)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

  return ranked[0]?.[0] || null;
}

/**
 * `/house` — repurposed from "which house is your heart in" into the Inspector
 * dossier. Rank comes from SUM(points) over mission_log, not the mission count,
 * because an errand can be worth up to four of them.
 */
export async function buildDossierMessage(userId) {
  const [stats, mission, closestHouse] = await Promise.all([
    getMissionLogStats(userId),
    getAcceptedMission(userId).catch((err) => {
      console.error('[missions] Could not read the held mission for the dossier:', err.message);
      return null;
    }),
    closestHouseByAffinity(userId),
  ]);

  if (!mission && stats.filed === 0) {
    return {
      content: closestHouse
        ? `**INSPECTOR DOSSIER** — <@${userId}>\n\nNo missions on record yet. Watch for a briefing in the channel and hit Accept first.\n\nClosest house (by affinity): **${closestHouse}**`
        : `**INSPECTOR DOSSIER** — <@${userId}>\n\nNo missions on record yet. Watch for a briefing in the channel and hit Accept first.`,
      allowed_mentions: { parse: [] },
    };
  }

  const rank = inspectorRank(stats.points);

  const lines = [
    `**INSPECTOR DOSSIER** — <@${userId}>`,
    '',
    `Rank: **${rank.name}**  ·  ${stats.points} house log${stats.points === 1 ? '' : 's'} · ${
      stats.filed
    } mission${stats.filed === 1 ? '' : 's'} filed`,
  ];

  // The ledger for the reward players hold rather than spend. The button that
  // actually spends one only ever appears on a cooldown-blocked /roam or /meet,
  // so this is where someone checks whether they have any.
  if (stats.banked > 0) {
    lines.push(
      `Cooldown resets banked: **${stats.banked}** — spend one from \`/roam\` or \`/meet\` while you're waiting.`,
    );
  }

  const houseRows = Object.entries(stats.byHouse)
    .filter(([, points]) => points > 0)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

  // Plain tally, not a bar chart: there's no per-house progression to visualize
  // (rank is the only ladder, and it's account-wide), so a bar here would only
  // imply a bar's usual meaning — progress toward something — that isn't real.
  if (houseRows.length) {
    lines.push(
      '',
      `By house: ${houseRows.map(([house, points]) => `${house} ${points}`).join(' · ')}`,
    );
  }

  if (mission) {
    let progress;
    if (mission.mission_type === MISSION_TYPES.ERRAND) {
      const targets = errandTargets(mission);
      progress = missionProgressLine(mission, {
        signed: targets.filter((t) => t.signed).length,
        required: targets.length,
      });
    } else {
      progress = missionProgressLine(mission);
    }
    lines.push(
      '',
      `Current mission: **${mission.house}** · ${
        MISSION_TYPE_LABEL[mission.mission_type] || mission.mission_type
      } · ${progress}`,
    );
  } else {
    lines.push('', 'Current mission: none');
  }

  if (closestHouse) lines.push(`Closest house (by affinity): **${closestHouse}**`);

  // The emblem is the house this player has done the most FOR, not the one they
  // are fondest of — ties broken by whichever they filed for most recently. A
  // player with a record but no house points (impossible today, but a cheap
  // guard) falls back to the affinity house.
  const emblemHouse = pickEmblemHouse(stats, closestHouse);
  const { embeds, files } = emblemAttachment(emblemHouse);

  return {
    content: lines.join('\n'),
    embeds: embeds.length ? embeds : undefined,
    files: files.length ? files : undefined,
    allowed_mentions: { parse: [] },
  };
}

function pickEmblemHouse(stats, fallbackHouse) {
  const ranked = Object.entries(stats.byHouse)
    .filter(([, points]) => points > 0)
    .sort(
      (a, b) => b[1] - a[1] || (stats.latestByHouse[b[0]] || 0) - (stats.latestByHouse[a[0]] || 0),
    );
  return ranked[0]?.[0] || fallbackHouse || null;
}

// Kept from the old /house: one authored line per house, now used as the
// caption on the dossier's emblem card.
const HOUSE_COMMENDATIONS = {
  [HOUSES.FROSTHEIM]: 'Frostheim has your name on file, and Frostheim keeps its files.',
  [HOUSES.VAGASTROM]: "Vagastrom doesn't say thank you. It just stops giving you trouble.",
  [HOUSES.HOTARUBI]: 'Hotarubi lit a lantern for you. Whether you noticed is another matter.',
  [HOUSES.DIONYSIA]: 'Dionysia put your name on the guest list and left it there.',
  [HOUSES.MORTKRANKEN]: 'Mortkranken has stopped calling you a specimen. Mostly.',
  [HOUSES.JABBERWOCK]: 'Jabberwock would give you a free tour, if you asked. Or if you did not.',
  [HOUSES.OBSCUARY]: 'Obscuary owes you a favor, and Obscuary remembers favors.',
  [HOUSES.SINOSTRA]: 'Sinostra has your account marked in the black. Enjoy it.',
};

function emblemAttachment(house) {
  if (!house) return { embeds: [], files: [] };

  const filename = `${house}.png`;
  let buffer = null;
  try {
    buffer = fs.readFileSync(path.join(__dirname, 'assets', 'emblem', filename));
  } catch (err) {
    console.error(`[missions] Could not load emblem for ${house}:`, err.message);
  }

  return {
    embeds: [
      {
        title: house,
        description: HOUSE_COMMENDATIONS[house] || `${house} is glad of the help.`,
        image: buffer ? { url: `attachment://${filename}` } : undefined,
        color: 0x5865f2,
      },
    ],
    files: buffer ? [{ attachment: buffer, name: filename }] : [],
  };
}

// --- /missions (admin) ------------------------------------------------------

const PERMISSION_ADMINISTRATOR = 1n << 3n;
const PERMISSION_MANAGE_GUILD = 1n << 5n;

// `default_member_permissions` on the command is only a default — a server
// admin can grant /missions to any role under Integrations — so the permission
// is re-checked here against the member's real computed permissions.
function canManageMissions(member) {
  let permissions;
  try {
    permissions = BigInt(member?.permissions ?? '0');
  } catch {
    return false;
  }
  return (
    (permissions & PERMISSION_MANAGE_GUILD) === PERMISSION_MANAGE_GUILD ||
    (permissions & PERMISSION_ADMINISTRATOR) === PERMISSION_ADMINISTRATOR
  );
}

export async function handleMissionsAdmin(body) {
  const userId = userIdOf(body);
  const guildId = body.guild_id;

  if (!guildId) return { reply: ephemeral('This only works in a server.'), afterReply: null };

  if (!canManageMissions(body.member)) {
    console.warn(`[missions] Refused /missions from ${userId} in ${guildId} — lacks Manage Server`);
    return {
      reply: ephemeral('You need the **Manage Server** permission to configure missions.'),
      afterReply: null,
    };
  }

  const settings = await getGuildSettings(guildId);

  // The owner's kill switch (db/migrations/013) outranks the admin's switch and
  // covers both features, so a locked guild can't turn missions on either.
  if (settings?.locked) {
    console.warn(`[missions] Refused /missions in locked guild ${guildId} (from ${userId})`);
    return { reply: ephemeral("Missions aren't available in this server."), afterReply: null };
  }

  const sub = body.data?.options?.[0];
  const subcommand = sub?.name;

  if (subcommand === 'enable') {
    const channelId =
      sub.options?.find((o) => o.name === 'channel')?.value || settings?.encounter_channel_id || null;

    if (!channelId) {
      return {
        reply: ephemeral(
          'Pick a channel for missions, or set up `/encounters channel` first and missions will follow it.',
        ),
        afterReply: null,
      };
    }

    await enableGuildMissions(guildId, channelId);

    return {
      reply: ephemeral(
        [
          `Missions will post in <#${channelId}>.`,
          'Three requests a day, at times that move inside their band from one day to the next.',
          'The post never says which house or which type it is. Only the person who hits **Accept** finds that out, with `/mission`.',
          'I need **View Channel**, **Send Messages**, **Attach Files** and **Embed Links** there.',
        ].join('\n'),
      ),
      afterReply: async () => {
        // Surfaces a permissions problem now, at setup, rather than burning
        // three days of slots before the auto-disable notices.
        try {
          await postChannelMessage(channelId, {
            content: 'Mission requests will come through here. Watch the board.',
            allowed_mentions: { parse: [] },
          });
        } catch (err) {
          console.error(`[missions] Setup check failed for guild ${guildId}:`, err.message);
        }
      },
    };
  }

  if (subcommand === 'disable') {
    await setGuildMissionsEnabled(guildId, false);
    return {
      reply: ephemeral(
        'Missions are off for this server. Anything already in flight finishes normally.',
      ),
      afterReply: null,
    };
  }

  if (subcommand === 'status') {
    return { reply: ephemeral(missionStatusLine(settings)), afterReply: null };
  }

  return { reply: ephemeral('Unknown subcommand.'), afterReply: null };
}

function missionStatusLine(settings, now = new Date()) {
  if (!settings) {
    return 'Missions have never been set up here. Run `/missions enable` to start.';
  }

  const channelId = resolveMissionChannel(settings);
  const channel = channelId ? `<#${channelId}>` : null;
  const failures = settings.mission_post_failures || 0;

  if (!channel) {
    return '⚠️ **Not running** — no channel is set. Run `/missions enable`.';
  }
  if (!settings.missions_enabled && failures >= MISSION_POST_FAILURE_LIMIT) {
    return `⚠️ **Stopped** — ${failures} mission posts in a row failed to reach ${channel}, so I stopped trying.\nCheck I have **View Channel**, **Send Messages**, **Attach Files** and **Embed Links** there, then run \`/missions enable\` again.`;
  }
  if (!settings.missions_enabled) {
    return `⛔ **Off** — turned off with \`/missions disable\`. Run \`/missions enable\` to turn it back on.`;
  }

  const lines = [`✅ **Running** — posting in ${channel}.`];
  if (failures > 0) {
    lines.push(
      `⚠️ ${failures} recent post${failures === 1 ? '' : 's'} failed. After ${MISSION_POST_FAILURE_LIMIT} in a row I'll stop.`,
    );
  }

  // Unlike encounters, the schedule is safe to show: knowing when a request
  // lands wins nobody anything, because you still have to be first to the
  // button.
  if (settings.mission_slots_day === localDayKey(now) && settings.mission_slots_today?.length) {
    const fired = new Set((settings.mission_slots_fired || []).map(Number));
    const slots = settings.mission_slots_today.map((iso, index) => {
      const stamp = `<t:${Math.floor(new Date(iso).getTime() / 1000)}:t>`;
      return fired.has(index) ? `~~${stamp}~~` : stamp;
    });
    lines.push(`Today: ${slots.join(' · ')} (struck through = already posted)`);
  } else {
    lines.push("Today's times haven't been rolled yet — the next tick will do it.");
  }

  return lines.join('\n');
}

// --- /missiondev (owner-only test tooling) --------------------------------

// The same single-operator gate as /encdev: OWNER_DISCORD_ID, and nobody else.
// Unset means the command is off for everyone. It's also registered with
// default_member_permissions '0' so it never shows for non-admins — but that
// only hides it. This check is what enforces it, and anyone else is answered
// with a bare "Unknown command." so its existence isn't confirmed.
function isMissionDevOwner(userId) {
  const owner = process.env.OWNER_DISCORD_ID;
  return Boolean(owner) && userId === owner;
}

/**
 * `/missiondev` — manual mission tooling, restricted to OWNER_DISCORD_ID.
 * Exists only to exercise the spawn / accept / expiry path on demand instead of
 * waiting out the day's slots.
 *
 *   /missiondev spawn [type] [house]   force a request onto the board now
 *   /missiondev clear                  withdraw this guild's open request
 *   /missiondev sweep                  finalize everything past its deadline now
 *
 * A manual spawn never touches the guild's mission slots or the post-failure
 * counter — the real schedule is left exactly as it was, same as /encdev.
 *
 * Returns a plain message-data object (`{ content }`). app.js defers this
 * interaction ephemerally and delivers the return value as the followup, so the
 * whole thing runs with a ~15s budget rather than the 3s inline one.
 */
export async function handleMissionDev(body, now = new Date()) {
  const userId = userIdOf(body);
  const guildId = body.guild_id;

  if (!isMissionDevOwner(userId)) {
    console.warn(`[missions] /missiondev refused for ${userId} in ${guildId}`);
    return { content: 'Unknown command.' };
  }

  if (!guildId) return { content: 'This only works in a server.' };

  const guild = await getGuildSettings(guildId);
  if (!guild) {
    return { content: 'This server has no settings yet. Run `/missions enable` first.' };
  }

  // Respect your own kill switch, same as the admin command and /encdev. Kept
  // terse and free of any SQL — this is owner-only, but a Discord message is
  // screenshottable. See db/migrations/013 for how to clear a lock.
  if (guild.locked) {
    return { content: 'This server is locked. Missions stay off here.' };
  }

  const channelId = resolveMissionChannel(guild);
  if (!channelId) {
    return {
      content: 'No mission channel is set. Run `/missions enable` (or `/encounters channel`) first.',
    };
  }

  const sub = body.data?.options?.[0];
  const subcommand = sub?.name;

  if (subcommand === 'sweep') {
    const { withdrawn, lapsed } = await sweepExpiredMissions(guildId, now);
    return { content: `Swept: ${withdrawn.length} withdrawn, ${lapsed.length} lapsed.` };
  }

  if (subcommand === 'clear') {
    const open = await getOpenMission(guildId);
    if (!open) return { content: 'No open request on the board to clear.' };

    const expired = await expireMission(open.id);
    if (!expired) return { content: 'That request closed before it could be cleared.' };

    await finalizeWithdrawnMission(expired);
    return { content: `Withdrew request #${open.id}. You can \`/missiondev spawn\` again now.` };
  }

  if (subcommand === 'spawn') {
    const open = await getOpenMission(guildId);
    if (open) {
      return {
        content: `A request is already on the board (#${open.id}). Clear it with \`/missiondev clear\` first.`,
      };
    }

    const missionType = sub.options?.find((o) => o.name === 'type')?.value || undefined;

    const rawHouse = sub.options?.find((o) => o.name === 'house')?.value;
    let house;
    if (rawHouse) {
      house = Object.values(HOUSES).find(
        (h) => h.toLowerCase() === String(rawHouse).trim().toLowerCase(),
      );
      if (!house) return { content: `I don't know the house "${rawHouse}".` };
    }

    const row = await spawnMission(guild, channelId, now, { missionType, house });
    if (!row) {
      return {
        content:
          'Spawn failed — nothing was posted. Check the logs (the house may have no authored riddles, or no roster for an errand, or the channel POST was rejected).',
      };
    }

    return {
      content: `Posted a **${
        MISSION_TYPE_LABEL[row.mission_type] || row.mission_type
      }** for **${row.house}** as request #${row.id} in <#${channelId}>.`,
    };
  }

  return { content: 'Unknown subcommand.' };
}

// --- shared -----------------------------------------------------------------

// Promise.allSettled swallows rejections by design; this puts them back in the
// log, which matters because everything it wraps is a reward write.
function reportFailures(label) {
  return (results) => {
    for (const result of results) {
      if (result.status === 'rejected') {
        console.error(`[missions] ${label} side-effect failed:`, result.reason?.message);
      }
    }
  };
}
