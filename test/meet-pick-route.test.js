// The /meet command's initial picker: offers MEET_OPTION_COUNT distinct
// characters to choose from, gated by the same 3h cooldown as /roam. Signed
// the way Discord actually signs interactions (see roam-db-error-
// resilience.test.js for why), driven at a real running app.js instance.
import { test, mock } from 'node:test';
import assert from 'node:assert';
import { createFakeSupabase } from './helpers/fakeSupabase.js';
import { generateDiscordKeyPair, signInteraction } from './helpers/discordSign.js';
import { MEET_OPTION_COUNT } from '../constants/game.js';

const TEST_PORT = 38174; // distinct from roam-db-error-resilience's port; separate process either way
process.env.PORT = String(TEST_PORT);
process.env.SUPABASE_URL ??= 'http://fake.local';
process.env.SUPABASE_SERVICE_ROLE_KEY ??= 'fake-service-role-key';

const { keyPair, publicKeyHex } = await generateDiscordKeyPair();
process.env.PUBLIC_KEY = publicKeyHex;

const fake = createFakeSupabase({ character_relationships: [], command_limits: [] });
mock.module('@supabase/supabase-js', {
  namedExports: { createClient: () => fake.client },
});

const { server } = await import('../app.js');

async function postInteraction(body) {
  const bodyString = JSON.stringify(body);
  const { timestamp, signature } = await signInteraction(keyPair.privateKey, bodyString);
  return fetch(`http://localhost:${TEST_PORT}/interactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Signature-Ed25519': signature,
      'X-Signature-Timestamp': timestamp,
    },
    body: bodyString,
  });
}

function meetCommand(userId) {
  return {
    type: 2, // APPLICATION_COMMAND
    data: { name: 'meet' },
    member: { user: { id: userId } },
  };
}

test('/meet offers a pick-list of distinct characters', async () => {
  const res = await postInteraction(meetCommand('user-meet-happy-path'));
  const body = await res.json();

  assert.strictEqual(res.status, 200);
  assert.strictEqual(body.type, 4); // CHANNEL_MESSAGE_WITH_SOURCE
  const buttons = body.data.components[0].components;
  assert.strictEqual(buttons.length, MEET_OPTION_COUNT);

  const ids = buttons.map((b) => b.custom_id);
  assert.ok(ids.every((id) => id.startsWith('meet:pick:')), 'every button should route to meet:pick:<characterId>');
  assert.strictEqual(new Set(ids).size, ids.length, 'the offered characters should be distinct');
});

test('/meet is blocked while its cooldown is active', async () => {
  const userId = 'user-meet-on-cooldown';
  fake.tables.command_limits.push({
    discord_user_id: userId,
    command_name: 'meet',
    last_used_at: new Date().toISOString(),
  });

  const res = await postInteraction(meetCommand(userId));
  const body = await res.json();

  assert.strictEqual(res.status, 200);
  assert.match(body.data.content, /again in/);
  assert.strictEqual(body.data.flags, 64); // EPHEMERAL
});

test.after(() => {
  server.close();
});
