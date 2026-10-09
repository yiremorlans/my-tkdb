// Tokutaisei ("Toku") isn't in CHARACTERS yet, so /affinity resolves her as a
// special case: her card is only her name and avatar, with no affinity or
// milestones of her own.
import { test, mock } from 'node:test';
import assert from 'node:assert';
import { createFakeSupabase } from './helpers/fakeSupabase.js';

process.env.SUPABASE_URL ??= 'http://fake.local';
process.env.SUPABASE_SERVICE_ROLE_KEY ??= 'fake-service-role-key';

const fake = createFakeSupabase({ character_relationships: [], encounter_milestones: [] });
mock.module('@supabase/supabase-js', {
  namedExports: { createClient: () => fake.client },
});

const { buildAffinityMessage } = await import('../encounters.js');

function reset({ relationships = [], milestones = [] } = {}) {
  fake.tables.character_relationships = relationships.map((r) => ({ ...r }));
  fake.tables.encounter_milestones = milestones.map((r) => ({ ...r }));
  fake.calls.length = 0;
}

test('"tokutaisei" and "toku" both resolve to her card, deduped', async () => {
  reset();
  const message = await buildAffinityMessage('user-1', ['tokutaisei', 'Toku']);
  assert.strictEqual(message.embeds.length, 1);
  assert.strictEqual(message.embeds[0].title, 'Tokutaisei');
  assert.strictEqual(message.embeds[0].image.url, 'attachment://Tokutaisei.png');
  assert.doesNotMatch(message.content, /Unknown character/);
});

test('her card is only her name and avatar, with no affinity or moments', async () => {
  reset({
    relationships: [{ discord_user_id: 'user-1', character_id: 'ren', affinity: 300 }],
    milestones: [{ discord_user_id: 'user-1', character_id: 'ren', milestone_type: 'a', total: 3 }],
  });
  const [embed] = (await buildAffinityMessage('user-1', ['toku'])).embeds;
  assert.strictEqual(embed.title, 'Tokutaisei');
  assert.strictEqual(embed.image.url, 'attachment://Tokutaisei.png');
  assert.strictEqual(embed.description, undefined);
});

test('she sits alongside roster characters and rides in the Share custom_id', async () => {
  reset();
  const message = await buildAffinityMessage('user-1', ['ren', 'toku'], { shareButton: true });
  assert.deepStrictEqual(message.embeds.map((e) => e.title), ['Ren Shiranami', 'Tokutaisei']);
  assert.strictEqual(message.components[0].components[0].custom_id, 'affinity:share:ren.tokutaisei');
});
