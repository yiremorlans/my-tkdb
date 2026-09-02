// buildBondsMessage: a plain-text roster of every character the user has at
// least 1 affinity point with, ranked closest first. Read-only
// (getUserRelationships is a plain select).
import { test, mock } from 'node:test';
import assert from 'node:assert';
import { createFakeSupabase } from './helpers/fakeSupabase.js';

process.env.SUPABASE_URL ??= 'http://fake.local';
process.env.SUPABASE_SERVICE_ROLE_KEY ??= 'fake-service-role-key';

const fake = createFakeSupabase({ character_relationships: [] });
mock.module('@supabase/supabase-js', {
  namedExports: { createClient: () => fake.client },
});

const { buildBondsMessage } = await import('../encounters.js');

function resetTable(rows = []) {
  fake.tables.character_relationships = rows.map((r) => ({ ...r }));
}

test('a user with no relationships is told they have not formed bonds', async () => {
  resetTable([]);
  const message = await buildBondsMessage('user-1');
  assert.match(message.content, /haven't formed any bonds yet/);
  assert.strictEqual(message.flags, 64);
});

test('characters below 1 affinity point are left out', async () => {
  resetTable([
    { discord_user_id: 'user-1', character_id: 'ren', affinity: 0 },
    { discord_user_id: 'user-1', character_id: 'shohei', affinity: 5 },
  ]);
  const message = await buildBondsMessage('user-1');
  assert.doesNotMatch(message.content, /Ren /);
  assert.match(message.content, /Shohei/);
});

test('bonds are listed one per line, greatest affinity first', async () => {
  resetTable([
    { discord_user_id: 'user-1', character_id: 'shohei', affinity: 5 },
    { discord_user_id: 'user-1', character_id: 'ren', affinity: 60 },
    { discord_user_id: 'user-1', character_id: 'edward', affinity: 25 },
  ]);
  const message = await buildBondsMessage('user-1');
  const lines = message.content.split('\n').slice(1); // drop the header
  assert.strictEqual(lines.length, 3);
  assert.match(lines[0], /^Ren .* — Friend/);
  assert.match(lines[1], /^Edward .* — Acquaintance/);
  assert.match(lines[2], /^Shohei .* — Stranger$/); // Stranger has no trailing emoji
});

test('an unknown character_id in the row set is skipped, not rendered', async () => {
  resetTable([
    { discord_user_id: 'user-1', character_id: 'not-a-real-character', affinity: 50 },
    { discord_user_id: 'user-1', character_id: 'ren', affinity: 10 },
  ]);
  const message = await buildBondsMessage('user-1');
  const lines = message.content.split('\n').slice(1);
  assert.strictEqual(lines.length, 1);
  assert.match(lines[0], /^Ren /);
});
