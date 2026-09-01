// recordResponse is the one path that should ever create or mutate a
// character_relationships row: a user actually picking a dialogue response.
// This guards that, after the ghost-row fix, that real path still works end
// to end for both a brand-new relationship and an existing one.
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

test('recordResponse creates the row and sets affinity, times_met and last_response_type together for a first-time interaction', async () => {
  resetTable([]);

  const result = await recordResponse('user-1', 'taiga', 2, 'warm');

  assert.strictEqual(result.affinity, 2);
  assert.strictEqual(result.timesMet, 1);
  assert.strictEqual(result.gain, 2);
  assert.ok(result.level, 'should resolve a relationship level for the new affinity');

  assert.strictEqual(fake.tables.character_relationships.length, 1);
  const row = fake.tables.character_relationships[0];
  assert.strictEqual(row.affinity, 2);
  assert.strictEqual(row.times_met, 1);
  assert.strictEqual(row.last_response_type, 'warm');
  assert.ok(row.last_interaction_at, 'a real interaction should stamp last_interaction_at');
});

test('recordResponse accumulates affinity and times_met on an existing relationship', async () => {
  resetTable([
    { discord_user_id: 'user-1', character_id: 'taiga', affinity: 3, times_met: 1, last_response_type: 'neutral' },
  ]);

  const result = await recordResponse('user-1', 'taiga', 1, 'warm');

  assert.strictEqual(result.affinity, 4);
  assert.strictEqual(result.timesMet, 2);

  const row = fake.tables.character_relationships[0];
  assert.strictEqual(row.affinity, 4);
  assert.strictEqual(row.times_met, 2);
  assert.strictEqual(row.last_response_type, 'warm');
});
