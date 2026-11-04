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
