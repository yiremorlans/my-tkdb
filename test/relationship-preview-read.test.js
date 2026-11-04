// Regression tests for the ghost-row bug: a preview read (e.g. /affinity,
// /house, or a /roam or /meet dialogue preview) must never insert a
// character_relationships row for a character the user has never actually
// responded to. Only recordResponse (a completed interaction) may write. A
// preview for a user with no row defaults to affinity 0 and renders normally.
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

// buildRoamDialogueMessage/buildMeetSpawnMessage default `now` to
// `new Date()` if it's not passed, which would make these tests depend on
// whatever instant happens to be current when they run. FIXED_NOW exists only
// to pin that; which hour it lands on is not otherwise meaningful. Built from
// local field values, not parsed from an ISO string with a fixed UTC offset,
// so it reads back as the same local hour under any TZ.
const FIXED_NOW = new Date(2026, 5, 15, 12, 0, 0);

const fake = createFakeSupabase({ character_relationships: [] });
mock.module('@supabase/supabase-js', {
  namedExports: { createClient: () => fake.client },
});
// Skip real canvas rendering — irrelevant to the affinity-default behavior
// under test, and slow/fragile to depend on here.
mock.module('../imageComposition.js', {
  namedExports: {
    composeEncounter: async () => Buffer.from('fake-png'),
    // encounters.js imports this statically for the warding builders.
    composeWardingCard: async () => Buffer.from('fake-warding-png'),
  },
});

const { getRelationship } = await import('../db/supabase.js');
const { buildRoamDialogueMessage, buildMeetSpawnMessage } = await import('../encounters.js');
const { CHARACTERS } = await import('../constants/characters.js');

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

test('buildRoamDialogueMessage defaults to affinity 0 for a brand-new relationship, without creating a row', async () => {
  resetTable([]);

  const message = await buildRoamDialogueMessage('user-1', FIXED_NOW);

  assert.ok(message.content, 'should produce a dialogue message, not throw');
  assert.strictEqual(fake.tables.character_relationships.length, 0, 'previewing must not create a relationship row');
});

test('buildMeetSpawnMessage defaults to affinity 0 for a brand-new relationship, without creating a row', async () => {
  resetTable([]);
  const character = CHARACTERS[0];

  const message = await buildMeetSpawnMessage('user-1', character.id, FIXED_NOW);

  assert.ok(message.content, 'should produce a spawn message, not throw');
  assert.strictEqual(fake.tables.character_relationships.length, 0, 'previewing must not create a relationship row');
});
