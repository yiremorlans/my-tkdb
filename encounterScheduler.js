// The tick loop behind public "call out" encounters (docs/public-encounters.md
// §3) and scheduled missions (docs/scheduled-missions.md §3). One interval for
// the whole process, two passes inside it, iterating every enabled guild — not
// a setTimeout per guild — because all the timing state lives in Postgres
// (guild_settings.last_encounter_at + next_gap_minutes for encounters,
// mission_slots_today + mission_slots_fired for missions). Nothing about either
// schedule is held in memory, so a redeploy has nothing to lose: the first tick
// after boot re-reads the table and compares elapsed time against the gap that
// was rolled before the restart. Time that passed while the process was down
// counts normally — a due encounter fires immediately, an undue one keeps its
// original anchor. No timers to re-arm, no drift, nothing reset.
//
// Assumes a single app instance. Two instances would double-fire every guild's
// spawn; if this is ever scaled out, gate runTick behind a Postgres advisory
// lock.

import { clearGuessCooldowns } from './constants/publicEncounters.js';
import { clearRiddleCooldowns } from './constants/missions.js';
import { isSpawnDue, spawnEncounter, sweepExpiredEncounters } from './publicEncounters.js';
import { runGuildMissionPass, sweepExpiredMissions } from './missions.js';
import { getActivePublicEncounter, getEnabledGuilds, getMissionGuilds } from './db/supabase.js';

// How often the loop looks for work. Must stay well under
// ENCOUNTER_WINDOW_MINUTES (2), or an encounter can outlive its own deadline by
// most of a tick before anything finalizes it.
const TICK_INTERVAL_MS = 25 * 1000;

// Minimum wall time between spawn *attempts* for one guild, enforced in memory
// and independently of the Postgres cadence anchor. Normally dead weight — a
// successful spawn pushes last_encounter_at 45+ minutes out, so this floor
// expires long before the anchor says "due" again. It matters only in the
// pathological case the anchor can't cover: a channel POST fails AND the
// clock-advance write that follows it also fails, leaving the anchor reading
// "due" every tick. Without this the loop retries a broken channel every 25s
// and spends all three post-failure strikes in ~75s — long enough to disable a
// guild that hit nothing worse than a transient Discord error.
const SPAWN_RETRY_FLOOR_MS = 5 * 60 * 1000;
const spawnAttemptAt = new Map(); // guild_id -> epoch ms of the last spawn attempt

let timer = null;
let ticking = false;

// Exported for the same reason as clearGuessCooldowns: the tick calls it when
// nothing is configured, and tests reset it between cases.
export function clearSpawnAttemptFence() {
  spawnAttemptAt.clear();
}

/**
 * One pass over every enabled guild. Exported so a test — or a future external
 * `/tick` endpoint for a host that sleeps — can drive it directly.
 */
export async function runTick(now = new Date()) {
  await runEncounterPass(now);
  await runMissionPass(now);
}

/**
 * The scheduled-missions half of the tick (docs/scheduled-missions.md §3).
 *
 * Missions ride this loop rather than an interval of their own: at three posts
 * a day the work per tick is one indexed read plus, on the rare tick where a
 * slot has come due, one spawn. All of the schedule state — today's three slot
 * times and which have fired — lives on guild_settings, so this is restart-safe
 * for exactly the reason the encounter cadence is: nothing is held in memory,
 * and the first tick after boot re-derives everything from the row.
 */
async function runMissionPass(now) {
  // Same reasoning as the encounter sweep: finalize every guild's expired
  // missions, not just the enabled ones, so an admin running `/missions
  // disable` mid-flight doesn't strand a request on the board forever.
  try {
    await sweepExpiredMissions(null, now);
  } catch (err) {
    console.error('[encounterScheduler] Mission sweep failed:', err.message);
  }

  let guilds;
  try {
    guilds = await getMissionGuilds();
  } catch (err) {
    console.error('[encounterScheduler] Could not read mission guilds:', err.message);
    return;
  }

  if (guilds.length === 0) {
    clearRiddleCooldowns();
    return;
  }

  for (const guild of guilds) {
    try {
      await runGuildMissionPass(guild, now);
    } catch (err) {
      console.error(`[encounterScheduler] Mission pass failed for guild ${guild.guild_id}:`, err.message);
    }
  }
}

async function runEncounterPass(now) {
  // Sweep every guild's expired encounters, not just the enabled ones. An
  // admin who runs `/encounters disable` while an encounter is in flight drops
  // their guild out of getEnabledGuilds() immediately — if the sweep were
  // scoped to that list, the in-flight row would never be finalized, its post
  // would sit showing a countdown that already ran out, and the row would stay
  // unresolved forever (and so never be pruned). §4 of the spec says a
  // disabled guild's in-flight encounter still finalizes normally; this is
  // what makes that true.
  try {
    await sweepExpiredEncounters(null, now);
  } catch (err) {
    console.error('[encounterScheduler] Sweep failed:', err.message);
  }

  let guilds;
  try {
    guilds = await getEnabledGuilds();
  } catch (err) {
    console.error('[encounterScheduler] Could not read guild settings:', err.message);
    return;
  }

  if (guilds.length === 0) {
    // Nothing configured anywhere — one cheap query and out. Drop any cooldown
    // entries still held from an encounter that is long gone, and the per-guild
    // retry fence with them.
    clearGuessCooldowns();
    clearSpawnAttemptFence();
    return;
  }

  // Sequential: at fewer than five guilds, concurrency buys nothing and would
  // only make the Discord rate-limit picture harder to reason about.
  for (const guild of guilds) {
    if (!guild.encounter_channel_id) continue;

    try {
      // The global sweep above already ran, so an encounter whose window just
      // closed has freed its guild to spawn again in this same tick.
      //
      // isSpawnDue measures elapsed time since the last spawn rather than
      // reading a stored target, so time that passed while the process was
      // down counts normally — a redeploy or an outage is caught up on the
      // first tick after boot, not reset.
      if (!isSpawnDue(guild, now)) continue;

      // In-memory backstop for the case the anchor can't cover — see
      // SPAWN_RETRY_FLOOR_MS. Space this guild's spawn attempts by at least that
      // floor no matter what the anchor says.
      const attemptedAt = spawnAttemptAt.get(guild.guild_id);
      if (attemptedAt != null && now.getTime() - attemptedAt < SPAWN_RETRY_FLOOR_MS) continue;

      // A guild with an encounter still in flight waits, however overdue its
      // cadence is — at most one live encounter per guild.
      const active = await getActivePublicEncounter(guild.guild_id, now);
      if (active) continue;

      spawnAttemptAt.set(guild.guild_id, now.getTime());
      await spawnEncounter(guild, new Date());
    } catch (err) {
      console.error(`[encounterScheduler] Spawn failed for guild ${guild.guild_id}:`, err.message);
    }
  }
}

/**
 * Start the loop. Safe to call twice — the second call is a no-op. The interval
 * is unref'd so it can never be the thing keeping a process alive (tests import
 * app.js and expect to exit).
 */
export function startEncounterScheduler() {
  if (timer) return timer;

  console.log(`[encounterScheduler] Starting, tick every ${TICK_INTERVAL_MS / 1000}s`);

  // Skip rather than queue: a tick that overran (a slow composite, a Discord
  // timeout) would otherwise have a second pass spawn a duplicate behind it.
  const tickOnce = () => {
    if (ticking) {
      console.warn('[encounterScheduler] Previous tick still running — skipping this one');
      return;
    }
    ticking = true;
    runTick()
      .catch((err) => console.error('[encounterScheduler] Tick failed:', err))
      .finally(() => {
        ticking = false;
      });
  };

  // setInterval waits a full period before its first call, which after a
  // redeploy is a dead window where anything already due sits waiting. Run one
  // pass straight away so a restart resumes immediately, and so a long outage
  // is caught up the moment the process is back rather than a tick later.
  tickOnce();

  timer = setInterval(tickOnce, TICK_INTERVAL_MS);

  timer.unref?.();
  return timer;
}

export function stopEncounterScheduler() {
  if (!timer) return;
  clearInterval(timer);
  timer = null;
  ticking = false;
}
