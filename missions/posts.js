// Scheduled missions: the channel side of a mission's life. Spawning and
// posting a request, the scheduler pass encounterScheduler.js drives, and the
// expiry sweep and post reconcile that close posts out.

import { pingRole } from "../utils.js";
import {
  ASSIST_LAPSED_LINES,
  clearRiddleCooldowns,
  drawErrandTargets,
  dueSlots,
  localDayKey,
  MISSION_POST_FAILURE_LIMIT,
  MISSION_POST_RECONCILED_LINE,
  MISSION_TEASERS,
  MISSION_TYPES,
  MISSION_WITHDRAWN_LINES,
  pickRiddle,
  POST_TTL_HOURS,
  rollDailySlots,
  rollHouse,
  rollMissionType,
  SWEEP_EDIT_CONCURRENCY,
} from "../constants/missions.js";
import { pickRandom } from "../constants/publicEncounters.js";
import {
  editChannelMessage,
  editChannelMessageSafe,
  postChannelMessage,
} from "../discordRest.js";
import {
  bumpGuildMissionPostFailure,
  clearGuildMissionPostFailures,
  clearMissionPostReconcile,
  createMission,
  expireMission,
  finalizeExpiredMissions,
  getMissionsNeedingPostReconcile,
  getOpenMission,
  markMissionSlotFired,
  rollGuildMissionSlots,
  setMissionMessageId,
} from "../db/supabase.js";
import { acceptRow, missionEmbed, resolveMissionChannel } from "./shared.js";

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
 * normal scheduler path passes nothing and everything is rolled. Only that
 * normal path pings the guild's opt-in role; a /missiondev test post stays
 * silent.
 */
export async function spawnMission(
  guild,
  channelId,
  now = new Date(),
  overrides = {},
) {
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
      console.error(
        `[missions] No riddles authored for ${house} — skipping spawn`,
      );
      return null;
    }
    riddleId = riddle.id;
  }

  if (missionType === MISSION_TYPES.ERRAND) {
    targetIds = drawErrandTargets(house);
    if (targetIds.length === 0) {
      console.error(
        `[missions] ${house} has no roster to draw signatures from — skipping spawn`,
      );
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

  // The request names nobody and pings nobody, except the opt-in role.
  const { mention, allowed_mentions } = await pingRole(
    guild.guild_id,
    Object.keys(overrides).length === 0,
  );

  let message;
  try {
    message = await postChannelMessage(channelId, {
      content: mention || undefined,
      embeds: [missionEmbed(row.id, teaser)],
      components: acceptRow(row.id),
      allowed_mentions,
    });
  } catch (err) {
    console.error(
      `[missions] Post failed for guild ${guild.guild_id}:`,
      err.message,
    );

    // Nobody can see it, so it must not sit there as this guild's "open"
    // mission and block the next slot.
    await expireMission(row.id).catch((e) =>
      console.error(
        "[missions] Failed to close orphaned mission row:",
        e.message,
      ),
    );

    const { failures, disabled } = await bumpGuildMissionPostFailure(
      guild.guild_id,
      MISSION_POST_FAILURE_LIMIT,
    ).catch((e) => {
      console.error(
        "[missions] Failed to record mission post failure:",
        e.message,
      );
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
    console.error(
      "[missions] Failed to clear mission post failures:",
      e.message,
    ),
  );

  console.log(
    `[missions] Spawned ${missionType} for ${house} in guild ${guild.guild_id} (mission ${row.id})`,
  );
  return { ...row, message_id: message.id };
}

// --- expiry -----------------------------------------------------------------

// Shared by finalizeWithdrawnMission and finalizeLapsedMission: edit one
// mission's post to its closing line, off editChannelMessageSafe's shared
// "skip if there's no post, log rather than throw on failure" handling
// (also used by finalizeEncounter in publicEncounters.js).
async function finalizeMissionPost(row, messageId, content, extra = {}) {
  clearRiddleCooldowns(row.id);
  await editChannelMessageSafe(
    row.channel_id,
    messageId,
    { content, components: [], embeds: [], ...extra },
    `[missions] Could not edit mission ${row.id} post`,
  );
}

/**
 * A request nobody took. Edit the post to a withdrawal line, drop the image and
 * remove the button so a stale click can't reach a dead mission.
 */
export async function finalizeWithdrawnMission(row) {
  await finalizeMissionPost(
    row,
    row.message_id,
    pickRandom(MISSION_WITHDRAWN_LINES),
    { attachments: [] },
  );
}

/**
 * A mission somebody accepted and ran out of time on. The pickup post moved on
 * hours ago and says nothing that is now false, so it is left alone — the one
 * exception is a co-op assist post, which is still standing there offering a
 * button that will never pay out.
 */
export async function finalizeLapsedMission(row) {
  await finalizeMissionPost(
    row,
    row.assist_message_id,
    pickRandom(ASSIST_LAPSED_LINES),
  );
}

/**
 * A mission whose claim committed but whose public post the bot never managed
 * to update in the moment — app.js's accept edit threw (the interaction token
 * had expired because a slow claim_mission ate Discord's ack window, a Discord
 * 5xx, the post deleted, permissions pulled). The row is 'accepted' (or has
 * since moved to completed/expired) but the post is still showing a live Accept
 * button that hands every later clicker "someone got there first" forever.
 *
 * Nothing else covers this: finalizeWithdrawnMission only edits 'open' rows,
 * and finalizeLapsedMission deliberately leaves an accepted post alone. app.js
 * sets missions.post_reconcile_needed on the failed edit (migration 019); this
 * is the retry, on every mission tick.
 *
 * The edit goes out with the bot token — the interaction webhook the original
 * used is long dead — to a name-free "already taken" line with the button
 * stripped. Best-effort per row: an edit that still fails keeps its flag for
 * the next tick.
 */
export async function reconcileMissionPosts(guildId = null) {
  let rows;
  try {
    rows = await getMissionsNeedingPostReconcile(guildId);
  } catch (err) {
    console.error(
      "[missions] Could not read posts needing reconcile:",
      err.message,
    );
    return;
  }

  for (const row of rows) {
    // Flag set on a row that never got a post id — nothing to edit, so just
    // drop the flag rather than retrying a no-op every tick.
    if (!row.message_id) {
      await clearMissionPostReconcile(row.id);
      continue;
    }

    try {
      await editChannelMessage(row.channel_id, row.message_id, {
        content: MISSION_POST_RECONCILED_LINE,
        attachments: [],
        components: [],
        embeds: [],
      });
      await clearMissionPostReconcile(row.id);
    } catch (err) {
      console.error(
        `[missions] Could not reconcile mission ${row.id} post:`,
        err.message,
      );
    }
  }
}

// Runs `fn` over `items` with at most `limit` in flight at once — a worker
// pool rather than batch-then-wait, so a fast edit picks up the next item
// immediately instead of waiting on the slowest one in its batch. Exists so a
// mass-expiry tick (a long outage clearing many guilds' missions at once)
// can't fire its Discord edits all in the same instant and burst past the
// rate limit; below `limit` items this behaves exactly like Promise.all.
async function mapLimit(items, limit, fn) {
  let cursor = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const item = items[cursor++];
      await fn(item);
    }
  });
  await Promise.all(workers);
}

/**
 * Finalize everything past its deadline, for one guild or all of them. Called
 * from the scheduler tick, and the restart-safety net with it: the state this
 * works from is entirely in Postgres.
 */
export async function sweepExpiredMissions(guildId = null, now = new Date()) {
  const { withdrawn, lapsed } = await finalizeExpiredMissions(guildId, now);

  // Independent per-row Discord edits — each already catches and logs its own
  // failure, so running them concurrently costs nothing a sequential loop had
  // that this doesn't. Capped rather than a bare Promise.all: a long outage
  // can expire missions across many guilds on the same tick, and firing every
  // edit at once risks bursting past Discord's rate limit.
  const edits = [
    ...withdrawn.map((row) => () => finalizeWithdrawnMission(row)),
    ...lapsed.map((row) => () => finalizeLapsedMission(row)),
  ];

  // reconcileMissionPosts retries a disjoint set of rows (the
  // post_reconcile_needed flag, left by a won-claim edit that failed in the
  // moment of the click in app.js) with no data dependency on the withdrawn/
  // lapsed edits above, so it rides alongside them rather than after them.
  await Promise.all([
    mapLimit(edits, SWEEP_EDIT_CONCURRENCY, (edit) => edit()),
    reconcileMissionPosts(guildId),
  ]);

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
  if (!channelId) return;

  const today = localDayKey(now);
  let slotsToday = guild.mission_slots_today || [];
  let fired = guild.mission_slots_fired || [];

  if (guild.mission_slots_day !== today || slotsToday.length === 0) {
    slotsToday = rollDailySlots(now);
    fired = [];
    await rollGuildMissionSlots(guild.guild_id, today, slotsToday);
    console.log(
      `[missions] Rolled ${today} slots for guild ${guild.guild_id}: ${slotsToday.join(", ")}`,
    );
  }

  for (const slot of dueSlots(slotsToday, fired, now)) {
    if (slot.stale) {
      console.log(
        `[missions] Slot ${slot.index} for guild ${guild.guild_id} came due too late — skipping`,
      );
      fired = await fireSlot(guild.guild_id, fired, slot.index);
      continue;
    }

    // Never two live requests. The board holds one folder at a time.
    const open = await getOpenMission(guild.guild_id);
    if (open) {
      console.log(
        `[missions] Guild ${guild.guild_id} still has mission ${open.id} open — spending slot ${slot.index}`,
      );
      fired = await fireSlot(guild.guild_id, fired, slot.index);
      continue;
    }

    // Independent writes — posting the mission and persisting which slot fired
    // don't depend on each other (a spawn failure is already swallowed by the
    // .catch below), so they run together rather than one after the other.
    const [, nextFired] = await Promise.all([
      spawnMission(guild, channelId, now).catch((err) =>
        console.error(
          `[missions] Spawn failed for guild ${guild.guild_id}:`,
          err.message,
        ),
      ),
      fireSlot(guild.guild_id, fired, slot.index),
    ]);
    fired = nextFired;

    // One request per tick, at most. Two slots coming due together (a long
    // outage) would otherwise post both at once, back to back in the channel.
    break;
  }
}

// Append `index` to the fired list and persist it — the "spend this slot,
// whether or not it produced a mission" write, shared by all three ways a due
// slot ends (stale, board already busy, spawned).
async function fireSlot(guildId, fired, index) {
  const next = [...fired, index];
  await markMissionSlotFired(guildId, index, next);
  return next;
}
