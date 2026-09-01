// Regression test for the ghost-row bug: a preview read (e.g. /affinity,
// /house, or a /roam or /meet dialogue preview) must never insert a
// character_relationships row for a character the user has never actually
// responded to. Only recordResponse (a completed interaction) may write.
//
// db/supabase.js builds its Supabase client once, at module load, so
// @supabase/supabase-js can only be mocked once per test file (a second
// mock.module call on an already-loaded consumer wouldn't rebind it anyway).
// All tests below share one fake client and reset its table state directly
// instead of re-mocking per test.
import { test, mock } from 'node:test';
import assert from 'node:assert';
import { createFakeSupabase } from './helpers/fakeSupabase.js';

process.env.SUPABASE_URL ??= 'http://fake.local';
process.env.SUPABASE_SERVICE_ROLE_KEY ??= 'fake-service-role-key';

const fake = createFakeSupabase({ character_relationships: [] });
mock.module('@supabase/supabase-js', {
  namedExports: { createClient: () => fake.client },
});

const { getRelationship } = await import('../db/supabase.js');

function resetTable(rows = []) {
  fake.tables.character_relationships = rows.map((r) => ({ ...r }));
  fake.calls.length = 0;
}

test('the non-creating getRelationship read never writes to character_relationships', async () => {
  resetTable([]);

  const result = await getRelationship('user-1', 'ren');

  assert.strictEqual(result, null, 'no row exists yet, so the read should return null');
  assert.strictEqual(fake.tables.character_relationships.length, 0, 'no row should have been created as a side effect');
  assert.ok(
    !fake.calls.some((c) => c.table === 'character_relationships' && c.op === 'insert'),
    'a preview read must never call insert',
  );
});

test('the non-creating getRelationship read returns the existing row without touching it', async () => {
  resetTable([
    { discord_user_id: 'user-1', character_id: 'ren', affinity: 5, times_met: 2, last_response_type: 'warm' },
  ]);

  const result = await getRelationship('user-1', 'ren');

  assert.strictEqual(result.affinity, 5);
  assert.strictEqual(result.times_met, 2);
  assert.ok(
    !fake.calls.some((c) => c.table === 'character_relationships' && c.op !== 'select'),
    'a preview read must only ever select, never mutate',
  );
});
