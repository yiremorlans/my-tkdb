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
// Purely a spam guard — never a reward gate. The first invoke is free, the
// second needs a 1-minute cooldown, and every one after that needs a flat 5
// minutes — re-armed on each invoke that goes through, never climbing further
// — specifically to stop "wait out the posted window, peek, repeat" rerolling
// — see commandLimits.js's comment above claimCommandInvoke.

const FIRST_REPEAT_MS = 60 * 1000;
const STEADY_MS = 5 * 60 * 1000;

test('claimCommandInvoke allows the first invoke and records it', () => {
  clearCommandInvokeThrottle();
  const t0 = 1_000_000;
  assert.strictEqual(claimCommandInvoke('flood-1', 'roam', t0).allowed, true);
});

test('claimCommandInvoke blocks a second invoke of the same command inside the first minute', () => {
  clearCommandInvokeThrottle();
  const t0 = 1_000_000;
  assert.strictEqual(claimCommandInvoke('flood-2', 'roam', t0).allowed, true);

  const again = claimCommandInvoke('flood-2', 'roam', t0 + FIRST_REPEAT_MS - 1);
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

test('claimCommandInvoke lets the second invoke back in after waiting exactly 1 minute', () => {
  clearCommandInvokeThrottle();
  const t0 = 1_000_000;
  assert.strictEqual(claimCommandInvoke('flood-4', 'roam', t0).allowed, true);
  assert.strictEqual(claimCommandInvoke('flood-4', 'roam', t0 + FIRST_REPEAT_MS).allowed, true);
});

test('claimCommandInvoke does not let a third invoke back in after just 1 more minute', () => {
  clearCommandInvokeThrottle();
  const t0 = 1_000_000;
  assert.strictEqual(claimCommandInvoke('flood-5', 'roam', t0).allowed, true); // invoke 1, free
  const t1 = t0 + FIRST_REPEAT_MS;
  assert.strictEqual(claimCommandInvoke('flood-5', 'roam', t1).allowed, true); // invoke 2, needed 1 minute
  // From here on it's a flat 5 minutes — 1 more minute isn't enough.
  assert.strictEqual(claimCommandInvoke('flood-5', 'roam', t1 + FIRST_REPEAT_MS).allowed, false);
});

test('claimCommandInvoke lets a third invoke back in after waiting the full 5 minutes', () => {
  clearCommandInvokeThrottle();
  const t0 = 1_000_000;
  assert.strictEqual(claimCommandInvoke('flood-6', 'roam', t0).allowed, true); // invoke 1, free
  const t1 = t0 + FIRST_REPEAT_MS;
  assert.strictEqual(claimCommandInvoke('flood-6', 'roam', t1).allowed, true); // invoke 2, needed 1 minute
  assert.strictEqual(claimCommandInvoke('flood-6', 'roam', t1 + STEADY_MS).allowed, true); // invoke 3, needed 5 minutes
});

test('claimCommandInvoke stays flat at 5 minutes for every further repeat, never climbing', () => {
  clearCommandInvokeThrottle();
  const t0 = 1_000_000;
  assert.strictEqual(claimCommandInvoke('flood-7', 'roam', t0).allowed, true); // invoke 1, free
  let t = t0 + FIRST_REPEAT_MS;
  assert.strictEqual(claimCommandInvoke('flood-7', 'roam', t).allowed, true); // invoke 2, needed 1 minute
  // Invokes 3 through 6 each need exactly 5 minutes since the previous one —
  // not 6, 7, 8 minutes or any other climb.
  for (let i = 0; i < 4; i++) {
    t += STEADY_MS;
    assert.strictEqual(claimCommandInvoke('flood-7', 'roam', t).allowed, true, `invoke #${i + 3}`);
  }
  assert.strictEqual(claimCommandInvoke('flood-7', 'roam', t + STEADY_MS - 1).allowed, false);
});

test('claimCommandInvoke: a blocked attempt is not a use — it moves nothing and costs nothing', () => {
  clearCommandInvokeThrottle();
  const t0 = 1_000_000;
  assert.strictEqual(claimCommandInvoke('flood-8', 'roam', t0).allowed, true); // invoke 1, free
  // A blocked retry partway through the first minute...
  assert.strictEqual(claimCommandInvoke('flood-8', 'roam', t0 + 40_000).allowed, false);
  // ...changes nothing: the second invoke is still allowed right on the
  // original 1-minute schedule, not pushed out by the blocked attempt.
  assert.strictEqual(claimCommandInvoke('flood-8', 'roam', t0 + FIRST_REPEAT_MS).allowed, true);
});

test('claimCommandInvoke is scoped per user — one user flooding does not block another', () => {
  clearCommandInvokeThrottle();
  const t0 = 1_000_000;
  assert.strictEqual(claimCommandInvoke('flood-9a', 'roam', t0).allowed, true);
  assert.strictEqual(claimCommandInvoke('flood-9a', 'roam', t0 + 100).allowed, false);
  assert.strictEqual(claimCommandInvoke('flood-9b', 'roam', t0 + 100).allowed, true);
});

// Regression: a command that claims its invoke slot and then fails (a server
// error building the picker/dialogue message) must not also cost the user the
// invoke-throttle window on top of the failure — app.js releases the slot in
// that catch, via releaseCommandInvoke.
test('releaseCommandInvoke frees the slot so a failed command can be retried immediately', () => {
  clearCommandInvokeThrottle();
  const t0 = 1_000_000;
  assert.strictEqual(claimCommandInvoke('flood-10', 'meet', t0).allowed, true);

  // Without releasing, the very next invoke would still be throttled.
  releaseCommandInvoke('flood-10', 'meet');
  assert.strictEqual(claimCommandInvoke('flood-10', 'meet', t0 + 1).allowed, true);
});

test('releaseCommandInvoke also wipes the steady 5-minute state, back to a free first invoke', () => {
  clearCommandInvokeThrottle();
  const t0 = 1_000_000;
  assert.strictEqual(claimCommandInvoke('flood-11', 'roam', t0).allowed, true); // invoke 1, free
  const t1 = t0 + FIRST_REPEAT_MS;
  assert.strictEqual(claimCommandInvoke('flood-11', 'roam', t1).allowed, true); // invoke 2, needed 1 minute

  releaseCommandInvoke('flood-11', 'roam');

  // Without the release, a 3rd invoke this soon after the 2nd would need the
  // full 5 minutes. A real claim (app.js) or a spent mission reset
  // (missions.js) calls this expecting the command usable right away instead.
  assert.strictEqual(claimCommandInvoke('flood-11', 'roam', t1 + 1).allowed, true);
});

test('releaseCommandInvoke only clears the named command, not the user\'s other one', () => {
  clearCommandInvokeThrottle();
  const t0 = 1_000_000;
  assert.strictEqual(claimCommandInvoke('flood-14', 'roam', t0).allowed, true);
  assert.strictEqual(claimCommandInvoke('flood-14', 'meet', t0).allowed, true);

  releaseCommandInvoke('flood-14', 'meet');
  assert.strictEqual(claimCommandInvoke('flood-14', 'meet', t0 + 1).allowed, true, 'meet was released');
  assert.strictEqual(claimCommandInvoke('flood-14', 'roam', t0 + 1).allowed, false, 'roam is untouched');
});
