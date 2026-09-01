// buildHouseMessage: aggregates a user's per-character affinity into
// per-house totals and reports the house(s) they're most bonded to. Read-only
// (getUserRelationships is a plain select — see storage tests for why writes
// are confined to recordResponse).
import { test, mock } from 'node:test';
import assert from 'node:assert';
import { createFakeSupabase } from './helpers/fakeSupabase.js';
import { HOUSES } from '../constants/backgrounds.js';

process.env.SUPABASE_URL ??= 'http://fake.local';
process.env.SUPABASE_SERVICE_ROLE_KEY ??= 'fake-service-role-key';

const fake = createFakeSupabase({ character_relationships: [] });
mock.module('@supabase/supabase-js', {
  namedExports: { createClient: () => fake.client },
});

const { buildHouseMessage } = await import('../encounters.js');

function resetTable(rows = []) {
  fake.tables.character_relationships = rows.map((r) => ({ ...r }));
}

test('a user with no relationships at all is told they have not formed bonds', async () => {
  resetTable([]);
  const message = await buildHouseMessage('user-1');
  assert.match(message.content, /haven't formed any bonds yet/);
  assert.strictEqual(message.embeds, undefined);
});

test('a user with relationships but zero affinity everywhere gets the "no house bonds" message', async () => {
  resetTable([
    { discord_user_id: 'user-1', character_id: 'ren', affinity: 0 },
  ]);
  const message = await buildHouseMessage('user-1');
  assert.match(message.content, /haven't formed any bonds with any house/);
});

test('a single standout house is named directly (ren belongs to Jabberwock)', async () => {
  resetTable([
    { discord_user_id: 'user-1', character_id: 'ren', affinity: 30 },
    { discord_user_id: 'user-1', character_id: 'shohei', affinity: 5 },
  ]);
  const message = await buildHouseMessage('user-1');
  assert.match(message.content, new RegExp(`belongs to \\*\\*${HOUSES.JABBERWOCK}\\*\\*`));
});

test('a tie between two houses names both', async () => {
  resetTable([
    { discord_user_id: 'user-1', character_id: 'ren', affinity: 10 }, // Jabberwock
    { discord_user_id: 'user-1', character_id: 'shohei', affinity: 10 }, // Vagastrom
  ]);
  const message = await buildHouseMessage('user-1');
  assert.match(message.content, /equal bonds with/);
  assert.match(message.content, new RegExp(HOUSES.JABBERWOCK));
  assert.match(message.content, new RegExp(HOUSES.VAGASTROM));
});

test('affinity for an unknown character_id is ignored rather than throwing', async () => {
  resetTable([
    { discord_user_id: 'user-1', character_id: 'not-a-real-character', affinity: 50 },
  ]);
  await assert.doesNotReject(() => buildHouseMessage('user-1'));
  const message = await buildHouseMessage('user-1');
  assert.match(message.content, /haven't formed any bonds with any house/);
});
