import { getMaintenanceMode } from './db/supabase.js';

// Global kill switch (db/migrations/024, app_settings.maintenance_mode).
// Same operating model as guild_settings.locked (013): flipped by hand in
// SQL, never through a bot command, so nothing in-app can undo it.
//
// Cached briefly so this isn't a Supabase round trip on every single
// interaction — every command and every button click would otherwise hit
// the DB before doing anything else. 10s means a flag flipped in SQL takes
// effect for everyone within 10 seconds, which is fine for an operator
// manually toggling a switch and cheap for a check that runs this often.
const CACHE_MS = 10 * 1000;
let cached = { value: false, at: -Infinity };

/**
 * True while the app is in maintenance. Checked in app.js before any
 * command or component branch runs.
 *
 * On a lookup error, serves the last cached value rather than hard-coding
 * `false` — a blip right after maintenance was turned on shouldn't fling the
 * gate back open, and one right after it was turned off shouldn't re-lock
 * everyone out. Before the very first successful read this defaults to not
 * under maintenance, same as the column's own DEFAULT FALSE.
 */
export async function isMaintenanceModeActive(now = Date.now()) {
  if (now - cached.at < CACHE_MS) return cached.value;

  try {
    const value = await getMaintenanceMode();
    cached = { value, at: now };
    return value;
  } catch (err) {
    console.error('isMaintenanceModeActive: serving cached value after read error:', err);
    return cached.value;
  }
}

// Test hook: force the next call to re-read instead of serving a cached
// value from an earlier test.
export function clearMaintenanceCache() {
  cached = { value: false, at: -Infinity };
}

export const MAINTENANCE_MESSAGE = 'App under maintenance, please try again later.';
