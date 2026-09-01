// The command layer for typed character names: /affinity is the only command
// where a player types a name as free text (options in commands.js:28-53).
// /meet resolves from a button custom_id carrying a canonical id
// (app.js:262) and /roam picks randomly, so neither exercises alias input —
// buildAffinityMessage is where "sho" / "ed" must behave the same as
// "shohei" / "edward".
//
// db/supabase.js builds its client once at module load, so the fake client
// is mocked once here and its table state reset per test (same pattern as
// relationship-preview-read.test.js).
import { test, mock } from 'node:test';
import assert from 'node:assert';
import { createFakeSupabase } from './helpers/fakeSupabase.js';

process.env.SUPABASE_URL ??= 'http://fake.local';
process.env.SUPABASE_SERVICE_ROLE_KEY ??= 'fake-service-role-key';

const fake = createFakeSupabase({ character_relationships: [] });
mock.module('@supabase/supabase-js', {
  namedExports: { createClient: () => fake.client },
});

const { buildAffinityMessage } = await import('../encounters.js');

function reset() {
  fake.tables.character_relationships = [];
  fake.calls.length = 0;
}

test('an alias resolves to the same character as its canonical id', async () => {
  reset();
  const byAlias = await buildAffinityMessage('user-1', ['sho']);
  const byId = await buildAffinityMessage('user-1', ['shohei']);
  assert.strictEqual(byAlias.embeds.length, 1);
  assert.strictEqual(byAlias.embeds[0].title, 'Shohei Haizono');
  assert.deepStrictEqual(
    byAlias.embeds.map((e) => e.title),
    byId.embeds.map((e) => e.title),
    '"sho" and "shohei" must produce the same embed',
  );
});

test('a second alias (ed -> edward) resolves too', async () => {
  reset();
  const message = await buildAffinityMessage('user-1', ['ed']);
  assert.strictEqual(message.embeds.length, 1);
  assert.strictEqual(message.embeds[0].title, 'Edward Hart');
});

test('an alias is resolved case-insensitively and trimmed, like a canonical id', async () => {
  reset();
  const message = await buildAffinityMessage('user-1', ['  SHO  ']);
  assert.strictEqual(message.embeds.length, 1);
  assert.strictEqual(message.embeds[0].title, 'Shohei Haizono');
});

test('an alias and its canonical id in the same command collapse to one embed', async () => {
  reset();
  const message = await buildAffinityMessage('user-1', ['shohei', 'sho', 'ed', 'edward']);
  assert.strictEqual(message.embeds.length, 2, 'shohei/sho -> one, ed/edward -> one');
  assert.deepStrictEqual(
    message.embeds.map((e) => e.title).sort(),
    ['Edward Hart', 'Shohei Haizono'],
  );
});

test('an unknown name is reported, not silently dropped or resolved', async () => {
  reset();
  const message = await buildAffinityMessage('user-1', ['notacharacter']);
  assert.ok(!message.embeds || message.embeds.length === 0, 'no character embed for an unknown name');
  assert.match(message.content, /Unknown character/i);
  assert.match(message.content, /notacharacter/);
});

test('a valid alias alongside an unknown name yields the embed plus an unknown note', async () => {
  reset();
  const message = await buildAffinityMessage('user-1', ['sho', 'notacharacter']);
  assert.strictEqual(message.embeds.length, 1);
  assert.strictEqual(message.embeds[0].title, 'Shohei Haizono');
  assert.match(message.content, /Unknown character.*notacharacter/is);
});

test('all-unknown input asks for a real name and creates no relationship row', async () => {
  reset();
  const message = await buildAffinityMessage('user-1', ['nope', '   ', '']);
  assert.ok(!message.embeds || message.embeds.length === 0);
  assert.match(message.content, /Unknown character|name at least one character/i);
  assert.strictEqual(fake.tables.character_relationships.length, 0);
});
