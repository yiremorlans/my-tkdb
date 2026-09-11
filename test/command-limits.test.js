// Two things live here.
//
// checkCommandLimit's cooldown math: allowed before use, blocked mid-cooldown,
// allowed again once the 3h window elapses, and fails open (never locks a
// user out) if the DB lookup itself errors. This is the read-only pre-check at
// command-invoke.
//
// claimCommandUse, the gate that actually guards a reward: it decides and
// stamps in one statement (db/migrations/012), refuses without extending the
// cooldown, and fails *closed* — the opposite of checkCommandLimit, because
// assuming an unclaimed slot is what reopens the stack-and-redeem farm.
import { test, mock } from 'node:test';
import assert from 'node:assert';
import { createFakeSupabase } from './helpers/fakeSupabase.js';

process.env.SUPABASE_URL ??= 'http://fake.local';
process.env.SUPABASE_SERVICE_ROLE_KEY ??= 'fake-service-role-key';

const fake = createFakeSupabase({ command_limits: [] });
mock.module('@supabase/supabase-js', {
  namedExports: { createClient: () => fake.client },
});

const {
  checkCommandLimit,
  claimCommandUse,
  claimCommandInvoke,
  releaseCommandInvoke,
  clearCommandInvokeThrottle,
} = await import('../commandLimits.js');

const COOLDOWN_MS = 3 * 60 * 60 * 1000;

function resetTable(rows = []) {
  fake.tables.command_limits = rows.map((r) => ({ ...r }));
}

test('checkCommandLimit allows a command the user has never used', async () => {
  resetTable([]);
  const result = await checkCommandLimit('user-1', 'roam');
  assert.strictEqual(result.allowed, true);
});

test('checkCommandLimit blocks a command still inside its 3h cooldown', async () => {
  const now = new Date('2026-06-15T12:00:00Z');
  resetTable([
    { discord_user_id: 'user-1', command_name: 'roam', last_used_at: new Date(now.getTime() - 60 * 1000).toISOString() },
  ]);
  const result = await checkCommandLimit('user-1', 'roam', now);
  assert.strictEqual(result.allowed, false);
  assert.match(result.reason, /again in/);
});

test('checkCommandLimit allows again the instant the cooldown fully elapses', async () => {
  const now = new Date('2026-06-15T12:00:00Z');
  resetTable([
    { discord_user_id: 'user-1', command_name: 'roam', last_used_at: new Date(now.getTime() - COOLDOWN_MS).toISOString() },
  ]);
  const result = await checkCommandLimit('user-1', 'roam', now);
  assert.strictEqual(result.allowed, true);
});

test('checkCommandLimit is scoped per command — a roam cooldown does not block meet', async () => {
  const now = new Date('2026-06-15T12:00:00Z');
  resetTable([
    { discord_user_id: 'user-1', command_name: 'roam', last_used_at: new Date(now.getTime() - 60 * 1000).toISOString() },
  ]);
  const result = await checkCommandLimit('user-1', 'meet', now);
  assert.strictEqual(result.allowed, true);
});

test('checkCommandLimit block message reports both commands, invoked one first', async () => {
  const now = new Date('2026-06-15T12:00:00Z');
  resetTable([
    { discord_user_id: 'user-1', command_name: 'roam', last_used_at: new Date(now.getTime() - 60 * 60 * 1000).toISOString() },
    { discord_user_id: 'user-1', command_name: 'meet', last_used_at: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString() },
  ]);
  const result = await checkCommandLimit('user-1', 'roam', now);
  assert.strictEqual(result.allowed, false);
  const lines = result.reason.split('\n');
  assert.match(lines[0], /^You can use \/roam again in/);
  assert.match(lines[1], /^You can use \/meet again in/);
});

test('checkCommandLimit block message shows the other command as ready when it is off cooldown', async () => {
  const now = new Date('2026-06-15T12:00:00Z');
  resetTable([
    { discord_user_id: 'user-1', command_name: 'meet', last_used_at: new Date(now.getTime() - 60 * 1000).toISOString() },
  ]);
  const result = await checkCommandLimit('user-1', 'meet', now);
  assert.strictEqual(result.allowed, false);
  const lines = result.reason.split('\n');
  assert.match(lines[0], /^You can use \/meet again in/);
  assert.strictEqual(lines[1], '/roam is ready now.');
});

test('checkCommandLimit fails open (allows) when the DB lookup errors', async () => {
  resetTable([]);
  fake.forceError('command_limits', 'select', { code: 'DB_DOWN', message: 'simulated outage' });
  const result = await checkCommandLimit('user-1', 'roam');
  assert.strictEqual(result.allowed, true);
});

// --- claimCommandUse -------------------------------------------------------

function stampFor(userId, command) {
  return fake.tables.command_limits.find(
    (r) => r.discord_user_id === userId && r.command_name === command,
  )?.last_used_at;
}

test('claimCommandUse takes the slot and stamps it when the user is off cooldown', async () => {
  resetTable([]);
  fake.setRpcNow(new Date('2026-06-15T12:00:00Z'));

  const result = await claimCommandUse('user-claim-1', 'roam');

  assert.strictEqual(result.allowed, true);
  assert.ok(stampFor('user-claim-1', 'roam'), 'claiming the slot should stamp the cooldown');
});

test('claimCommandUse refuses a second claim inside the window and does not extend the cooldown', async () => {
  resetTable([]);
  const t0 = new Date('2026-06-15T12:00:00Z');
  fake.setRpcNow(t0);

  assert.strictEqual((await claimCommandUse('user-claim-2', 'roam', t0)).allowed, true);
  const firstStamp = stampFor('user-claim-2', 'roam');

  // A minute later — the queued second redemption.
  const t1 = new Date(t0.getTime() + 60 * 1000);
  fake.setRpcNow(t1);
  const second = await claimCommandUse('user-claim-2', 'roam', t1);

  assert.strictEqual(second.allowed, false);
  assert.match(second.reason, /again in/, 'a refusal still reports when the slot frees up');
  assert.strictEqual(
    stampFor('user-claim-2', 'roam'),
    firstStamp,
    'a refused claim must not push the cooldown further out',
  );
});

test('claimCommandUse takes the slot again once the cooldown has fully elapsed', async () => {
  resetTable([]);
  const t0 = new Date('2026-06-15T12:00:00Z');
  fake.setRpcNow(t0);
  await claimCommandUse('user-claim-3', 'roam', t0);

  const t1 = new Date(t0.getTime() + COOLDOWN_MS);
  fake.setRpcNow(t1);

  assert.strictEqual((await claimCommandUse('user-claim-3', 'roam', t1)).allowed, true);
});

test('claimCommandUse is scoped per command — claiming roam leaves meet free', async () => {
  resetTable([]);
  const t0 = new Date('2026-06-15T12:00:00Z');
  fake.setRpcNow(t0);

  assert.strictEqual((await claimCommandUse('user-claim-4', 'roam', t0)).allowed, true);
  assert.strictEqual((await claimCommandUse('user-claim-4', 'meet', t0)).allowed, true);
});

test('claimCommandUse fails CLOSED when the claim errors (unlike checkCommandLimit)', async () => {
  resetTable([]);
  fake.setRpcNow(new Date('2026-06-15T12:00:00Z'));
  fake.forceError('rpc', 'claim_command_slot', { code: 'DB_DOWN', message: 'simulated outage' });

  const result = await claimCommandUse('user-claim-5', 'roam');

  assert.strictEqual(result.allowed, false, 'an unknown claim outcome must not grant a reward');
  assert.strictEqual(
    stampFor('user-claim-5', 'roam'),
    undefined,
    'a failed claim writes nothing',
  );
});

// --- claimCommandInvoke: the in-memory flood throttle ----------------------
// A per-user, per-command debounce, checked before anything touches Supabase.
// Purely a spam guard — never a reward gate. The window escalates by 2
// minutes per repeat invoke of the same command (capped at 10m), specifically
// to stop "wait out the posted window, peek, repeat" rerolling — see
// commandLimits.js's comment above claimCommandInvoke.

const THROTTLE_MS = 60 * 1000; // base window
const ESCALATION_MS = 2 * 60 * 1000;
const CAP_MS = 10 * 60 * 1000;
const IDLE_RESET_MS = 30 * 60 * 1000;

test('claimCommandInvoke allows the first invoke and records it', () => {
  clearCommandInvokeThrottle();
  const t0 = 1_000_000;
  assert.strictEqual(claimCommandInvoke('flood-1', 'roam', t0).allowed, true);
});

test('claimCommandInvoke blocks a second invoke of the same command inside the base window', () => {
  clearCommandInvokeThrottle();
  const t0 = 1_000_000;
  assert.strictEqual(claimCommandInvoke('flood-2', 'roam', t0).allowed, true);

  const again = claimCommandInvoke('flood-2', 'roam', t0 + THROTTLE_MS - 1);
  assert.strictEqual(again.allowed, false);
  assert.match(again.reason, /again in/i);
  assert.match(again.reason, /\/roam/, 'the message names the command that is throttled');
});

test('claimCommandInvoke throttles /roam and /meet independently', () => {
  clearCommandInvokeThrottle();
  const t0 = 1_000_000;
  // Each command carries its own window, as it does its own 3h cooldown: one
  // of each in the same minute is normal play.
  assert.strictEqual(claimCommandInvoke('flood-3', 'roam', t0).allowed, true);
  assert.strictEqual(claimCommandInvoke('flood-3', 'meet', t0 + 1_000).allowed, true);
  // ...and each still blocks its own repeat.
  assert.strictEqual(claimCommandInvoke('flood-3', 'roam', t0 + 30_000).allowed, false);
  assert.strictEqual(claimCommandInvoke('flood-3', 'meet', t0 + 30_000).allowed, false);
});

test('claimCommandInvoke does not let a repeat back in after just the base window', () => {
  clearCommandInvokeThrottle();
  const t0 = 1_000_000;
  // The whole point of escalation: after one prior invoke, the *next* repeat
  // needs base + 1*2min, not just the base window — waiting out exactly the
  // original 60s no longer works.
  assert.strictEqual(claimCommandInvoke('flood-4', 'roam', t0).allowed, true);
  assert.strictEqual(claimCommandInvoke('flood-4', 'roam', t0 + THROTTLE_MS).allowed, false);
});

// Note: a blocked probe counts as a strike too (by design — see the comment
// above claimCommandInvoke), so it isn't safe to probe "still blocked" one
// tick before a boundary and then immediately check "allowed" exactly at that
// same boundary — the probe itself pushes the boundary further out. Each test
// below checks one thing at a time for that reason.

test('claimCommandInvoke lets a repeat back in once its escalated window fully elapses', () => {
  clearCommandInvokeThrottle();
  const t0 = 1_000_000;
  assert.strictEqual(claimCommandInvoke('flood-5', 'roam', t0).allowed, true);
  const escalated = THROTTLE_MS + ESCALATION_MS; // one prior invoke
  assert.strictEqual(claimCommandInvoke('flood-5', 'roam', t0 + escalated).allowed, true);
});

test('claimCommandInvoke keeps escalating on each further repeat', () => {
  clearCommandInvokeThrottle();
  const t0 = 1_000_000;
  assert.strictEqual(claimCommandInvoke('flood-6', 'roam', t0).allowed, true); // strikes: 0 -> 1
  const t1 = t0 + THROTTLE_MS + ESCALATION_MS; // needs 1 prior invoke's worth
  assert.strictEqual(claimCommandInvoke('flood-6', 'roam', t1).allowed, true); // strikes: 1 -> 2
  const t2 = t1 + THROTTLE_MS + 2 * ESCALATION_MS; // needs 2 prior invokes' worth
  assert.strictEqual(claimCommandInvoke('flood-6', 'roam', t2).allowed, true); // strikes: 2 -> 3
  // Confirm the third invoke actually needed the escalated gap, not just the
  // base one: from t2, only the base window has now elapsed, and that's
  // already short of what three invokes' worth of escalation demands.
  assert.strictEqual(claimCommandInvoke('flood-6', 'roam', t2 + THROTTLE_MS).allowed, false);
});

test('claimCommandInvoke caps the escalated window at 10 minutes', () => {
  clearCommandInvokeThrottle();
  const t0 = 1_000_000;
  let t = t0;
  // Rack up enough strikes to blow well past the cap (10m needs 5 prior
  // invokes at 2min each), waiting exactly the currently-required window each
  // time so every one of these actually lands.
  const requiredAt = (strikes) => Math.min(THROTTLE_MS + strikes * ESCALATION_MS, CAP_MS);
  for (let strikes = 0; strikes < 8; strikes++) {
    assert.strictEqual(claimCommandInvoke('flood-7', 'roam', t).allowed, true, `invoke #${strikes + 1}`);
    t += requiredAt(strikes + 1);
  }
  // One tick under the cap from the last invoke: still blocked.
  assert.strictEqual(claimCommandInvoke('flood-7', 'roam', t - 1).allowed, false);
  // At exactly the cap: allowed — it never grew past 10 minutes despite 8
  // prior invokes (which would be 17 minutes uncapped).
  assert.strictEqual(claimCommandInvoke('flood-7', 'roam', t).allowed, true);
});

test('claimCommandInvoke re-blocks after a throttled hit without moving the clock from the hit', () => {
  clearCommandInvokeThrottle();
  const t0 = 1_000_000;
  assert.strictEqual(claimCommandInvoke('flood-8', 'roam', t0).allowed, true); // strikes 0 -> 1
  // A blocked retry mid-window still counts as a strike (strikes 1 -> 2), so
  // the next required wait is base + 2*2min = 5min...
  assert.strictEqual(claimCommandInvoke('flood-8', 'roam', t0 + 40_000).allowed, false);
  const escalated = THROTTLE_MS + 2 * ESCALATION_MS;
  // ...measured from the ORIGINAL invoke at t0, not from the blocked retry at
  // t0+40s. If the blocked hit had moved the clock, this would still be
  // blocked (it'd need to wait out `escalated` starting from t0+40_000).
  assert.strictEqual(claimCommandInvoke('flood-8', 'roam', t0 + escalated).allowed, true);
});

test('claimCommandInvoke resets the escalation after a long enough idle gap', () => {
  clearCommandInvokeThrottle();
  const t0 = 1_000_000;
  assert.strictEqual(claimCommandInvoke('flood-9', 'roam', t0).allowed, true); // strikes 0 -> 1
  // Walk away for the idle-reset window (30m) without ever invoking again.
  const t1 = t0 + IDLE_RESET_MS;
  // Treated as a fresh start: the base 60s window applies, not an escalated one.
  assert.strictEqual(claimCommandInvoke('flood-9', 'roam', t1).allowed, true);
  assert.strictEqual(claimCommandInvoke('flood-9', 'roam', t1 + THROTTLE_MS - 1).allowed, false);
});

test('claimCommandInvoke is scoped per user — one user flooding does not block another', () => {
  clearCommandInvokeThrottle();
  const t0 = 1_000_000;
  assert.strictEqual(claimCommandInvoke('flood-10a', 'roam', t0).allowed, true);
  assert.strictEqual(claimCommandInvoke('flood-10a', 'roam', t0 + 100).allowed, false);
  assert.strictEqual(claimCommandInvoke('flood-10b', 'roam', t0 + 100).allowed, true);
});

// Regression: a command that claims its invoke slot and then fails (a server
// error building the picker/dialogue message) must not also cost the user the
// invoke-throttle window on top of the failure — app.js releases the slot in
// that catch, via releaseCommandInvoke.
test('releaseCommandInvoke frees the slot so a failed command can be retried immediately', () => {
  clearCommandInvokeThrottle();
  const t0 = 1_000_000;
  assert.strictEqual(claimCommandInvoke('flood-11', 'meet', t0).allowed, true);

  // Without releasing, the very next invoke would still be throttled.
  releaseCommandInvoke('flood-11', 'meet');
  assert.strictEqual(claimCommandInvoke('flood-11', 'meet', t0 + 1).allowed, true);
});

test('releaseCommandInvoke also wipes any escalation built up, not just the base window', () => {
  clearCommandInvokeThrottle();
  const t0 = 1_000_000;
  assert.strictEqual(claimCommandInvoke('flood-12', 'roam', t0).allowed, true); // strikes 0 -> 1
  const t1 = t0 + THROTTLE_MS + ESCALATION_MS;
  assert.strictEqual(claimCommandInvoke('flood-12', 'roam', t1).allowed, true); // strikes 1 -> 2

  releaseCommandInvoke('flood-12', 'roam');

  // A real claim (app.js) or a spent mission reset (missions.js) calls this
  // expecting the command to be usable right away — not still facing the 3+
  // minute wait the accumulated strikes would otherwise demand.
  assert.strictEqual(claimCommandInvoke('flood-12', 'roam', t1 + 1).allowed, true);
});

test('releaseCommandInvoke only clears the named command, not the user\'s other one', () => {
  clearCommandInvokeThrottle();
  const t0 = 1_000_000;
  assert.strictEqual(claimCommandInvoke('flood-13', 'roam', t0).allowed, true);
  assert.strictEqual(claimCommandInvoke('flood-13', 'meet', t0).allowed, true);

  releaseCommandInvoke('flood-13', 'meet');
  assert.strictEqual(claimCommandInvoke('flood-13', 'meet', t0 + 1).allowed, true, 'meet was released');
  assert.strictEqual(claimCommandInvoke('flood-13', 'roam', t0 + 1).allowed, false, 'roam is untouched');
});
