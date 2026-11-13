// recordResponse is the one path that should ever create or mutate a
// character_relationships row: a user actually picking a dialogue response.
// Creating and adding to the row is covered end to end through
// buildResponseResultMessage (public-encounters, resp-cooldown-redeem-gate);
// this pins the stamps only that real path writes.
//
// See relationship-preview-read.test.js for why one fake client is shared
// across tests in this file instead of re-mocking per test.
import { test, mock } from 'node:test';
import assert from 'node:assert';
import { createFakeSupabase } from './helpers/fakeSupabase.js';

process.env.SUPABASE_URL ??= 'http://fake.local';
process.env.SUPABASE_SERVICE_ROLE_KEY ??= 'fake-service-role-key';

const fake = createFakeSupabase({ character_relationships: [] });
mock.module('@supabase/supabase-js', {
  namedExports: { createClient: () => fake.client },
});

const { recordResponse } = await import('../storage.js');

function resetTable(rows = []) {
  fake.tables.character_relationships = rows.map((r) => ({ ...r }));
}

test('recordResponse stamps last_response_type and last_interaction_at on a real interaction', async () => {
  resetTable([]);

  await recordResponse('user-1', 'taiga', 2, 'warm');

  const [row] = fake.tables.character_relationships;
  assert.strictEqual(row.last_response_type, 'warm');
  assert.ok(row.last_interaction_at, 'a real interaction should stamp last_interaction_at');
});

test('recordResponse writes affinity, times_met and response type in one call', async () => {
  resetTable([{ discord_user_id: 'user-1', character_id: 'ren', affinity: 18, times_met: 3, last_response_type: 'kind' }]);
  const before = fake.calls.length;

  const result = await recordResponse('user-1', 'ren', 2, 'warm');

  assert.deepStrictEqual(
    fake.calls.slice(before).map((c) => c.table),
    ['rpc:record_response'],
    'one round trip, no read-then-write',
  );
  const [row] = fake.tables.character_relationships;
  assert.strictEqual(row.affinity, 20);
  assert.strictEqual(row.times_met, 4);
  assert.strictEqual(row.last_response_type, 'warm');
  assert.strictEqual(result.affinity, 20);
  assert.strictEqual(result.timesMet, 4);
  assert.strictEqual(result.leveledUp, true, '18 -> 20 crosses into the next level');
});

test('recordResponse creates the row for a never-met character', async () => {
  resetTable([]);

  const result = await recordResponse('user-2', 'jin', 1, 'neutral');

  assert.strictEqual(fake.tables.character_relationships.length, 1);
  assert.strictEqual(result.affinity, 1);
  assert.strictEqual(result.timesMet, 1);
  assert.strictEqual(result.leveledUp, false);
});

test('incrementTimesMet keeps affinity and the last response type', async () => {
  resetTable([{ discord_user_id: 'user-1', character_id: 'rui', affinity: 40, times_met: 5, last_response_type: 'tease' }]);
  const { incrementTimesMet } = await import('../db/supabase.js');

  await incrementTimesMet('user-1', 'rui');

  const [row] = fake.tables.character_relationships;
  assert.strictEqual(row.affinity, 40);
  assert.strictEqual(row.times_met, 6);
  assert.strictEqual(row.last_response_type, 'tease');
});

test('activity and engagement counters are single upserts that roll over by month', async () => {
  const { trackUserActivity, trackCharacterEngagement } = await import('../db/supabase.js');
  fake.tables.user_activity = [];
  fake.tables.character_engagement = [];

  fake.setRpcNow(new Date('2026-10-31T23:00:00Z'));
  await trackUserActivity('user-3');
  await trackCharacterEngagement('user-3', 'jo');
  await trackUserActivity('user-3');
  await trackCharacterEngagement('user-3', 'jo');
  assert.strictEqual(fake.tables.user_activity[0].commands_this_month, 2);
  assert.strictEqual(fake.tables.character_engagement[0].commands_this_month, 2);

  fake.setRpcNow(new Date('2026-11-01T00:30:00Z'));
  await trackUserActivity('user-3');
  await trackCharacterEngagement('user-3', 'jo');
  assert.strictEqual(fake.tables.user_activity[0].commands_this_month, 1, 'new UTC month restarts the count');
  assert.strictEqual(fake.tables.user_activity[0].total_commands, 3);
  assert.strictEqual(fake.tables.character_engagement[0].commands_this_month, 1);
  assert.strictEqual(fake.tables.character_engagement[0].total_commands, 3);
  fake.setRpcNow(new Date());
});
