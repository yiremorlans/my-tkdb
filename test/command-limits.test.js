// checkCommandLimit's cooldown math: allowed before use, blocked mid-cooldown,
// allowed again once the 3h window elapses, and fails open (never locks a
// user out) if the DB lookup itself errors.
import { test, mock } from 'node:test';
import assert from 'node:assert';
import { createFakeSupabase } from './helpers/fakeSupabase.js';

process.env.SUPABASE_URL ??= 'http://fake.local';
process.env.SUPABASE_SERVICE_ROLE_KEY ??= 'fake-service-role-key';

const fake = createFakeSupabase({ command_limits: [] });
mock.module('@supabase/supabase-js', {
  namedExports: { createClient: () => fake.client },
});

const { checkCommandLimit } = await import('../commandLimits.js');

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
