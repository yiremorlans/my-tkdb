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
// A per-user debounce over /roam + /meet together, checked before anything
// touches Supabase. Purely a spam guard — never a reward gate.

test('claimCommandInvoke allows the first invoke and records it', () => {
  clearCommandInvokeThrottle();
  const t0 = 1_000_000;
  assert.strictEqual(claimCommandInvoke('flood-1', t0).allowed, true);
});

const THROTTLE_MS = 60 * 1000;

test('claimCommandInvoke blocks a second invoke inside the throttle window', () => {
  clearCommandInvokeThrottle();
  const t0 = 1_000_000;
  assert.strictEqual(claimCommandInvoke('flood-2', t0).allowed, true);

  const again = claimCommandInvoke('flood-2', t0 + THROTTLE_MS - 1);
  assert.strictEqual(again.allowed, false);
  assert.match(again.reason, /minute/i);
});

test('claimCommandInvoke shares the window across /roam and /meet (one user, one throttle)', () => {
  clearCommandInvokeThrottle();
  const t0 = 1_000_000;
  // The command name is not passed in — the throttle is keyed by user alone, so
  // whichever command invoked first blocks the other for the window.
  assert.strictEqual(claimCommandInvoke('flood-3', t0).allowed, true);
  assert.strictEqual(claimCommandInvoke('flood-3', t0 + 30_000).allowed, false);
});

test('claimCommandInvoke lets the user back in once the window fully elapses', () => {
  clearCommandInvokeThrottle();
  const t0 = 1_000_000;
  assert.strictEqual(claimCommandInvoke('flood-4', t0).allowed, true);
  assert.strictEqual(claimCommandInvoke('flood-4', t0 + THROTTLE_MS).allowed, true);
});

test('claimCommandInvoke is scoped per user — one user flooding does not block another', () => {
  clearCommandInvokeThrottle();
  const t0 = 1_000_000;
  assert.strictEqual(claimCommandInvoke('flood-5a', t0).allowed, true);
  assert.strictEqual(claimCommandInvoke('flood-5a', t0 + 100).allowed, false);
  assert.strictEqual(claimCommandInvoke('flood-5b', t0 + 100).allowed, true);
});

test('claimCommandInvoke re-blocks after a throttled hit without extending the window from the hit', () => {
  clearCommandInvokeThrottle();
  const t0 = 1_000_000;
  assert.strictEqual(claimCommandInvoke('flood-6', t0).allowed, true);
  // A blocked attempt mid-window must not push the window out from itself.
  assert.strictEqual(claimCommandInvoke('flood-6', t0 + 40_000).allowed, false);
  assert.strictEqual(claimCommandInvoke('flood-6', t0 + THROTTLE_MS).allowed, true);
});
