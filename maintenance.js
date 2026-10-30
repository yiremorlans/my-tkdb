import { getAppSettings } from './db/supabase.js';

// Global kill switch (db/migrations/024, app_settings.maintenance_mode).
// Same operating model as guild_settings.locked (013): flipped by hand in
// SQL, never through a bot command, so nothing in-app can undo it.
//
// Cached briefly so this isn't a Supabase round trip on every single
// interaction — every command and every button click would otherwise hit
// the DB before doing anything else. 60s means a flag flipped in SQL takes
// effect for everyone within a minute, which is fine for an operator
// manually toggling a switch. It's longer than the scheduler's 45s tick
// (encounterScheduler.js TICK_INTERVAL_MS), so the tick reads it about every
// other pass instead of every pass; at 10s it re-read on every tick.
const CACHE_MS = 60 * 1000;
let cached = { settings: {}, at: -Infinity };

// The app_settings row, cached for CACHE_MS. One read serves every switch on
// it, so the maintenance check app.js runs on every interaction keeps the
// /meet off switch warm too.
//
// On a lookup error, serves the last cached row rather than hard-coding
// "off" — a blip right after maintenance was turned on shouldn't fling the
// gate back open, and one right after it was turned off shouldn't re-lock
// everyone out. Before the very first successful read every switch is off,
// same as the columns' own DEFAULT FALSE.
async function appSettings(now) {
  if (now - cached.at < CACHE_MS) return cached.settings;

  try {
    cached = { settings: await getAppSettings(), at: now };
  } catch (err) {
    console.error(`[maintenance] Serving cached app settings after read error: ${err.message}`);
  }
  return cached.settings;
}

/**
 * True while the app is in maintenance. Checked in app.js before any
 * command or component branch runs.
 */
export async function isMaintenanceModeActive(now = Date.now()) {
  return (await appSettings(now)).maintenance_mode ?? false;
}

/**
 * True while /meet picks should skip the Activity and give today's image
 * flow (app_settings.meet_activity_off, migration 035; docs/hangout-activity.md
 * §11.7). Read in app.js's meet:pick branch only; the rest of the bot is
 * unaffected.
 */
export async function isMeetActivityOff(now = Date.now()) {
  return (await appSettings(now)).meet_activity_off ?? false;
}

/**
 * True for the bot owner (OWNER_DISCORD_ID), who passes the maintenance gate
 * so /roam, /meet and their buttons can be tested live while everyone else is
 * locked out. userId comes from a signature-verified interaction, so it can't
 * be spoofed; unset OWNER_DISCORD_ID means nobody bypasses. Same single-
 * operator trust as the /encdev and /missiondev gates.
 */
export function isMaintenanceBypassUser(userId) {
  const owner = process.env.OWNER_DISCORD_ID;
  return Boolean(owner) && userId === owner;
}

// Test hook: force the next call to re-read instead of serving a cached
// row from an earlier test.
export function clearMaintenanceCache() {
  cached = { settings: {}, at: -Infinity };
}

export const MAINTENANCE_MESSAGE = 'App under maintenance, please try again later.';
