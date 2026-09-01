import {
  getCommandLimits,
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

// The commands that share this rolling cooldown. When any one of them is
// blocked, the message reports the state of all of them, so a user who typed
// /roam still learns where /meet stands (and vice versa).
const RATE_LIMITED_COMMANDS = ['roam', 'meet'];

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
  let timestamps;
  try {
    timestamps = await getCommandLimits(userId, RATE_LIMITED_COMMANDS);
  } catch (err) {
    console.error('checkCommandLimit: failing open after lookup error:', err);
    return { allowed: true };
  }

  const statusFor = (name) => {
    const lastUsed = timestamps[name] ? new Date(timestamps[name]).getTime() : null;
    const elapsed = lastUsed === null ? Infinity : now.getTime() - lastUsed;
    return { name, lastUsed, elapsed, ready: elapsed >= COOLDOWN_MS };
  };

  const invoked = statusFor(command);

  // Never used, or the 3-hour cooldown has fully elapsed.
  if (invoked.ready) {
    return { allowed: true };
  }

  // Still cooling down. Report every rate-limited command's state, invoked one
  // first, so the user sees both clocks whichever command they typed. Ready
  // times render as Discord timestamps so they show in each viewer's own
  // timezone — the server clock (often UTC) is not the user's, and Discord
  // doesn't tell us their timezone.
  const line = (status) => {
    if (status.ready) return `/${status.name} is ready now.`;
    const readyAt = new Date(status.lastUsed + COOLDOWN_MS);
    const readyAtTag = `<t:${Math.floor(readyAt.getTime() / 1000)}:t>`;
    return `You can use /${status.name} again in ${formatDuration(
      COOLDOWN_MS - status.elapsed,
    )} (around ${readyAtTag}).`;
  };

  const others = RATE_LIMITED_COMMANDS.filter((name) => name !== command).map(statusFor);
  return {
    allowed: false,
    reason: [invoked, ...others].map(line).join('\n'),
  };
}
