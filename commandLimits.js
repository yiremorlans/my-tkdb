import {
  getCommandLimits,
  claimCommandSlot,
  spendCooldownReset,
  clearCommandLimits,
} from './db/supabase.js';

// Each command (roam/meet) can be used once every 3 hours, tracked per user.
// The cooldown is anchored to the user's last *completed* encounter for that
// command (claimed via claimCommandUse at the dialogue-response step), not to
// when the command was invoked — opening a prompt and walking away costs
// nothing. State lives in Supabase (command_limits), so it survives deploys and
// restarts.
//
// Three entry points, and the differences are the whole point:
//   claimCommandInvoke — in-memory, seconds-scale. A per-user, per-command
//                        flood throttle, checked before anything touches the
//                        DB. Not a reward gate — just keeps a spammed /roam or
//                        /meet from doing real work every keystroke.
//   checkCommandLimit  — read-only, for the fast fail at command-invoke. Its
//                        answer is stale the moment it returns, so it must
//                        never be what guards a reward.
//   claimCommandUse    — decides and stamps atomically. This is the gate.
const COOLDOWN_MS = 3 * 60 * 60 * 1000;

// The commands that share this rolling cooldown. When any one of them is
// blocked, the message reports the state of all of them, so a user who typed
// /roam still learns where /meet stands (and vice versa).
const RATE_LIMITED_COMMANDS = ['roam', 'meet'];

/**
 * Spend one banked mission reward on a cooldown the user is actually waiting
 * on (docs/scheduled-missions.md §13). The decision, the credit and the clear
 * all happen inside `spend_cooldown_reset` (db/migrations/016) — this only
 * supplies the cooldown length, so COOLDOWN_MS below stays the one place game
 * balance is written down.
 *
 * Returns 'roam' | 'meet' | 'both' for what was cleared, 'none' when the user
 * has nothing banked, or 'not_needed' when that clock is already clear.
 *
 * Fails CLOSED, like claimCommandUse: on an error we don't know whether a
 * credit was consumed, and reporting a success that didn't happen would cost
 * the player a real reward.
 */
export async function redeemCooldownReset(userId, command) {
  try {
    return await spendCooldownReset(userId, command, Math.round(COOLDOWN_MS / 1000));
  } catch (err) {
    console.error('redeemCooldownReset: failing closed after spend error:', err);
    return 'error';
  }
}

/**
 * Owner-only test helper (see /encdev reset). Unlike redeemCooldownReset this
 * isn't earned — it wipes both the 3h DB cooldown and the in-memory invoke
 * throttle for one or more commands, for one user, so manual testing doesn't
 * have to wait out either clock. Defaults to both rate-limited commands.
 * Throws on a DB error, same as the functions it wraps — this only ever runs
 * against the owner's own account, so failing loudly beats failing quietly.
 */
export async function devResetCommandLimits(userId, commands = RATE_LIMITED_COMMANDS) {
  await clearCommandLimits(userId, commands);
  for (const command of commands) releaseCommandInvoke(userId, command);
}

// ---------------------------------------------------------------------------
// Invoke-flood throttle (in-memory)
// ---------------------------------------------------------------------------
// The 3h cooldown guards the *reward*, claimed at the dialogue-response step.
// It says nothing about how often the command may be *invoked* — opening a
// picker and walking away is free by design. That leaves a gap beyond plain
// spam: a user who is off the 3h cooldown can peek at /roam or /meet, not
// like what comes up, wait out the flat window, and peek again — rerolling
// the random pick for free since nothing is claimed until they respond. A
// flat window doesn't touch that; waiting it out exactly is the whole
// exploit.
//
// So after the first (free) invoke, the second needs a 1-minute cooldown, and
// every one after that needs a flat 5 minutes — no further climb, just a
// constant cooldown once you're past the first repeat, re-armed on every
// invoke that goes through (claimCommandInvoke stamps `now` each time it
// allows one, so the 5 minutes always counts from the most recent invoke, not
// the first). A blocked (too-early) attempt changes nothing — it's a plain
// read-and-reject, not a use. Going /roam then /meet is one of each, which is
// normal play and stays free — this is keyed per command. It comes back down
// to a completely free first invoke only by actually claiming the command for
// real: releaseCommandInvoke wipes it, called once claimCommandUse succeeds,
// so a genuine commit ends the rerolling session this throttle is guarding
// against.
//
// It lives in memory: single app instance, the cost of a miss is one extra
// picker, and a deploy just hands everyone a fresh start. It is NOT a
// substitute for the DB cooldown, which stays the only thing between a user
// and a second reward.
const INVOKE_FIRST_REPEAT_COOLDOWN_MS = 60 * 1000;
const INVOKE_STEADY_COOLDOWN_MS = 5 * 60 * 1000;

// Purely a memory-hygiene bound, unrelated to the cooldown logic above:
// nothing about the throttle itself expires an entry early, so this only
// prunes ones truly abandoned (a user who invoked once and never came back).
const INVOKE_ENTRY_STALE_MS = 24 * 60 * 60 * 1000;

// "<discord_user_id>:<command>" -> { lastAt: epoch ms of that user's last
// *allowed* invoke of that command, count: allowed invokes recorded since the
// last reset, capped at 2 since the cooldown is already at its steady value
// by then }. Keyed by both so /roam and /meet throttle independently.
const lastInvokeAt = new Map();

// Drop long-abandoned entries. Amortized-cheap: this only walks the map once
// it has grown past a size normal load never reaches.
function sweepInvokeThrottle(now) {
  if (lastInvokeAt.size < 1024) return;
  for (const [key, entry] of lastInvokeAt) {
    if (now - entry.lastAt >= INVOKE_ENTRY_STALE_MS) lastInvokeAt.delete(key);
  }
}

// Claim this user's invoke slot for one command: decide and stamp in one
// call, like claimCommandUse but in memory and on a minutes scale. Returns
// { allowed: true } and records the invoke, or { allowed: false, reason }
// when this user's previous invoke *of this same command* was more recent
// than the currently required cooldown (free on the very first invoke, 1
// minute on the second, a flat 5 minutes on every one after that — see the
// comment above). A different command is never blocked by this one. Call this
// first, before the Supabase pre-check, so a flood never reaches the DB or a
// message build.
export function claimCommandInvoke(userId, command, now = Date.now()) {
  const key = `${userId}:${command}`;
  const entry = lastInvokeAt.get(key);

  if (!entry) {
    lastInvokeAt.set(key, { lastAt: now, count: 1 });
    sweepInvokeThrottle(now);
    return { allowed: true };
  }

  const required = entry.count === 1 ? INVOKE_FIRST_REPEAT_COOLDOWN_MS : INVOKE_STEADY_COOLDOWN_MS;
  const idleGap = now - entry.lastAt;

  if (idleGap < required) {
    // Blocked. Nothing is recorded — a rejected attempt isn't a use, so it
    // can't itself move the cooldown or the count.
    return {
      allowed: false,
      reason: `One moment — you can use /${command} again in ${formatDuration(required - idleGap)}.`,
    };
  }

  lastInvokeAt.set(key, { lastAt: now, count: Math.min(entry.count + 1, 2) });
  sweepInvokeThrottle(now);
  return { allowed: true };
}

// Wipe this user's invoke-throttle state for one command, back to a
// completely free first invoke. Two callers, two different reasons it's safe:
//   - The command handler claimed the slot via claimCommandInvoke and then
//     failed before producing anything (e.g. buildMeetPickMessage or
//     buildRoamDialogueMessage threw). Without this, a single failed /roam or
//     /meet still leaves the user facing a cooldown for a request that never
//     actually went through.
//   - claimCommandUse just succeeded for real (see app.js) — a genuine commit
//     ends the rerolling session this throttle guards against, so the next
//     window (three hours off, per the DB cooldown) starts clean rather than
//     carrying the steady 5-minute state forward.
// Also reused by the mission cooldown-reset flow (missions.js): spending a
// banked reset on the 3h DB cooldown is meant to make the command usable
// again immediately, so it clears this too rather than leaving the flood
// throttle refusing a reward the player just paid for.
// Safe to call broadly: this only ever shortens the in-memory window, never
// the 3h reward cooldown (claimCommandUse/checkCommandLimit), so it can't be
// used to redeem more than one reward per window.
export function releaseCommandInvoke(userId, command) {
  lastInvokeAt.delete(`${userId}:${command}`);
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
