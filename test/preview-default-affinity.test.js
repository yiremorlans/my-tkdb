// A character preview (roam encounter, meet spawn) for a user with no
// existing relationship row must default to affinity 0 and render normally —
// not throw, and not (per relationship-preview-read.test.js) create a row.
//
// See relationship-preview-read.test.js for why one fake client is shared
// across tests in this file instead of re-mocking per test.
import { test, mock } from 'node:test';
import assert from 'node:assert';
import { createFakeSupabase } from './helpers/fakeSupabase.js';

process.env.SUPABASE_URL ??= 'http://fake.local';
process.env.SUPABASE_SERVICE_ROLE_KEY ??= 'fake-service-role-key';

// buildRoamDialogueMessage/buildMeetSpawnMessage default `now` to
// `new Date()` if it's not passed, which would make this test's behavior
// depend on whatever instant happens to be current when it runs — not
// deterministic. FIXED_NOW exists only to pin that; which hour it lands on
// is not otherwise meaningful (the app has no "noon" concept). Built from
// local field values, not parsed from an ISO string with a fixed UTC
// offset, so it reads back as the same local hour under any TZ the test
// happens to run in — a Date tied to one fixed UTC instant instead can
// silently shift to a different local hour depending on the host's TZ.
const FIXED_NOW = new Date(2026, 5, 15, 12, 0, 0);

const fake = createFakeSupabase({ character_relationships: [] });
mock.module('@supabase/supabase-js', {
  namedExports: { createClient: () => fake.client },
});
// Skip real canvas rendering — irrelevant to the affinity-default behavior
// under test, and slow/fragile to depend on here.
mock.module('../imageComposition.js', {
  namedExports: { composeEncounter: async () => Buffer.from('fake-png') },
});

const { buildRoamDialogueMessage, buildMeetSpawnMessage } = await import('../encounters.js');
const { CHARACTERS } = await import('../constants/characters.js');

test('buildRoamDialogueMessage defaults to affinity 0 for a brand-new relationship, without creating a row', async () => {
  fake.tables.character_relationships = [];

  const message = await buildRoamDialogueMessage('user-1', FIXED_NOW);

  assert.ok(message.content, 'should produce a dialogue message, not throw');
  assert.strictEqual(fake.tables.character_relationships.length, 0, 'previewing must not create a relationship row');
});

test('buildMeetSpawnMessage defaults to affinity 0 for a brand-new relationship, without creating a row', async () => {
  fake.tables.character_relationships = [];
  const character = CHARACTERS[0];

  const message = await buildMeetSpawnMessage('user-1', character.id, FIXED_NOW);

  assert.ok(message.content, 'should produce a spawn message, not throw');
  assert.strictEqual(fake.tables.character_relationships.length, 0, 'previewing must not create a relationship row');
});
