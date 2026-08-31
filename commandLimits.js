import {
  getCommandLimit,
  recordCommandUse,
  clearCommandLimit,
} from './db/supabase.js';

// Each command (roam/meet) can be used once every 3 hours, tracked per user.
// The cooldown is anchored to the user's last *completed* encounter for that
// command (recorded via recordCommandUse at the dialogue-response step), not to
// when the command was invoked — opening a prompt and walking away costs
// nothing. State lives in Supabase (command_limits), so it survives deploys and
// restarts.
const COOLDOWN_MS = 3 * 60 * 60 * 1000;

// Mark a completed encounter. `command` is 'roam' or 'meet'. Fire-and-forget at
// the call site; failures are logged, not thrown.
export function recordCommandUsage(userId, command, now = new Date()) {
  return recordCommandUse(userId, command, now);
}

// Reset a user's cooldown (for testing). Omit `command` to clear both.
export function resetCommandLimit(userId, command = null) {
  return clearCommandLimit(userId, command);
}

// Turn a millisecond span into a short "2h 15m" / "45m" string.
function formatDuration(ms) {
  const totalMinutes = Math.max(1, Math.ceil(ms / 60000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours && minutes) return `${hours}h ${minutes}m`;
  if (hours) return `${hours}h`;
  return `${minutes}m`;
}

// Check if the user can use a command right now. Read-only — the cooldown is
// stamped later by recordCommandUsage once the encounter completes. Returns
// { allowed, reason }. On a Supabase error, fails open (allows the command)
// rather than locking everyone out.
export async function checkCommandLimit(userId, command, now = new Date()) {
  let lastUsedRaw;
  try {
    lastUsedRaw = await getCommandLimit(userId, command);
  } catch (err) {
    console.error('checkCommandLimit: failing open after lookup error:', err);
    return { allowed: true };
  }

  const lastUsed = lastUsedRaw ? new Date(lastUsedRaw).getTime() : null;
  const elapsed = lastUsed === null ? Infinity : now.getTime() - lastUsed;

  // Never used, or the 3-hour cooldown has fully elapsed.
  if (elapsed >= COOLDOWN_MS) {
    return { allowed: true };
  }

  // Still cooling down. Render the ready time as a Discord timestamp so it
  // shows in each viewer's own timezone — the server clock (often UTC) is not
  // the user's, and Discord doesn't tell us their timezone.
  const readyAt = new Date(lastUsed + COOLDOWN_MS);
  const readyAtTag = `<t:${Math.floor(readyAt.getTime() / 1000)}:t>`;
  return {
    allowed: false,
    reason: `You can use /${command} again in ${formatDuration(
      COOLDOWN_MS - elapsed,
    )} (around ${readyAtTag}).`,
  };
}
