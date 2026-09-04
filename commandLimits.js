import {
  getCommandLimits,
  clearCommandLimit,
  claimCommandSlot,
} from './db/supabase.js';

// Each command (roam/meet) can be used once every 3 hours, tracked per user.
// The cooldown is anchored to the user's last *completed* encounter for that
// command (claimed via claimCommandUse at the dialogue-response step), not to
// when the command was invoked — opening a prompt and walking away costs
// nothing. State lives in Supabase (command_limits), so it survives deploys and
// restarts.
//
// Three entry points, and the differences are the whole point:
//   claimCommandInvoke — in-memory, seconds-scale. A per-user flood throttle
//                        over both commands, checked before anything touches
//                        the DB. Not a reward gate — just keeps a spammed
//                        /roam or /meet from doing real work every keystroke.
//   checkCommandLimit  — read-only, for the fast fail at command-invoke. Its
//                        answer is stale the moment it returns, so it must
//                        never be what guards a reward.
//   claimCommandUse    — decides and stamps atomically. This is the gate.
const COOLDOWN_MS = 3 * 60 * 60 * 1000;

// The commands that share this rolling cooldown. When any one of them is
// blocked, the message reports the state of all of them, so a user who typed
// /roam still learns where /meet stands (and vice versa).
const RATE_LIMITED_COMMANDS = ['roam', 'meet'];

// Reset a user's cooldown (for testing). Omit `command` to clear both.
export function resetCommandLimit(userId, command = null) {
  return clearCommandLimit(userId, command);
}

// ---------------------------------------------------------------------------
// Invoke-flood throttle (in-memory)
// ---------------------------------------------------------------------------
// The 3h cooldown guards the *reward*, claimed at the dialogue-response step.
// It says nothing about how often the command may be *invoked* — opening a
// picker and walking away is free by design. That leaves one gap: a user can
// still hammer /roam or /meet without ever responding, and every invoke costs
// a Supabase read, a message build (buildRoamDialogueMessage runs affinity
// lookups; the spawn button after it composes an image), a Discord round trip,
// and a line of channel noise.
//
// This is a per-user debounce over both commands together — they share the
// reward cooldown, so they share the flood throttle. It lives in memory:
// single app instance, the cost of a miss is one extra picker, and a deploy
// just hands everyone one free invoke. It is NOT a substitute for the DB
// cooldown, which stays the only thing between a user and a second reward.
const INVOKE_THROTTLE_MS = 60 * 1000;

// discord_user_id -> epoch ms of that user's last /roam or /meet invoke.
const lastInvokeAt = new Map();

// Drop aged-out entries. Amortized-cheap: entries expire after
// INVOKE_THROTTLE_MS, and this only walks the map once it has grown past a
// size normal load never reaches.
function sweepInvokeThrottle(now) {
  if (lastInvokeAt.size < 1024) return;
  for (const [userId, ts] of lastInvokeAt) {
    if (now - ts >= INVOKE_THROTTLE_MS) lastInvokeAt.delete(userId);
  }
}

// Claim this user's invoke slot for /roam + /meet: decide and stamp in one
// call, like claimCommandUse but in memory and on a seconds scale. Returns
// { allowed: true } and records the invoke, or { allowed: false, reason } when
// the previous invoke was under INVOKE_THROTTLE_MS ago. Call this first, before
// the Supabase pre-check, so a flood never reaches the DB or a message build.
export function claimCommandInvoke(userId, now = Date.now()) {
  const last = lastInvokeAt.get(userId);
  if (last !== undefined && now - last < INVOKE_THROTTLE_MS) {
    return { allowed: false, reason: 'One moment — give it a minute before opening another.' };
  }
  lastInvokeAt.set(userId, now);
  sweepInvokeThrottle(now);
  return { allowed: true };
}

// Test hook: wipe the throttle between cases (mirrors clearGuessCooldowns and
// clearSpawnAttemptFence).
export function clearCommandInvokeThrottle() {
  lastInvokeAt.clear();
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
// claimed later by claimCommandUse once the encounter completes. Returns
// { allowed, reason }. On a Supabase error, fails open (allows the command)
// rather than locking everyone out: this is only the invoke-time pre-check and
// the reward is gated separately, so being generous here costs nothing.
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

/**
 * Claim this user's slot for `command` — the gate on actually granting a
 * reward, as opposed to checkCommandLimit's read-only pre-check at the moment a
 * command is invoked.
 *
 * The distinction matters. checkCommandLimit asks a question; the answer is
 * stale the instant it returns. This claims the slot in the same statement that
 * decides, so two dialogue responses arriving together can't both pass (see
 * db/migrations/012). Call this immediately before granting, and only grant
 * when it returns allowed.
 *
 * Fails CLOSED, unlike checkCommandLimit: if the claim errors we don't know
 * whether the slot was taken, and assuming it wasn't is exactly what reopens
 * the stack-and-redeem farm. A read error costing someone one response is the
 * cheaper mistake.
 */
export async function claimCommandUse(userId, command, now = new Date()) {
  let claimed;
  try {
    claimed = await claimCommandSlot(userId, command, Math.round(COOLDOWN_MS / 1000));
  } catch (err) {
    console.error('claimCommandUse: failing closed after claim error:', err);
    return { allowed: false, reason: 'Something went wrong there. Try again?' };
  }

  if (claimed) return { allowed: true };

  // Refused. The claim deliberately doesn't report how long is left — re-read
  // for that, purely to render the message (both clocks, invoked one first).
  // This read never influences the decision, so it's safe for it to fail.
  const limit = await checkCommandLimit(userId, command, now).catch(() => null);
  return {
    allowed: false,
    reason: limit?.reason || 'You need to wait a while before doing that again.',
  };
}
