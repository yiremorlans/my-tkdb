// Regression: the 3h /roam + /meet cooldown must be re-checked when a dialogue
// response is redeemed, not only when the command is invoked. The invoke check
// is read-only and the clock is only stamped once a flow completes (the 'resp'
// button), so without a check at redemption a user could fire /roam or /meet
// many times before finishing any — every invoke check passes because none has
// stamped yet — then click through all the queued response buttons and redeem
// N affinity gains against a "once per 3h" limit.
//
// Driven at a real running app.js instance with interactions signed the way
// Discord signs them (see meet-pick-route.test.js).
import { test, mock } from 'node:test';
import assert from 'node:assert';
import { createFakeSupabase } from './helpers/fakeSupabase.js';
import { generateDiscordKeyPair, signInteraction } from './helpers/discordSign.js';

const TEST_PORT = 38176; // distinct from the other route tests' ports
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

// A dialogue-response button click for the given flow. The shown components are
// what the handler greys out and echoes back on the result / cooldown message.
function respInteraction(userId, characterId, responseType, origin) {
  return {
    type: 3, // MESSAGE_COMPONENT
    data: { custom_id: `resp:${characterId}:${responseType}:${origin}` },
    member: { user: { id: userId } },
    message: {
      components: [
        {
          type: 1,
          components: [
            { type: 2, style: 1, label: 'Say something kind', custom_id: `resp:${characterId}:${responseType}:${origin}` },
          ],
        },
      ],
    },
  };
}

function affinityFor(userId, characterId) {
  const row = fake.tables.character_relationships.find(
    (r) => r.discord_user_id === userId && r.character_id === characterId,
  );
  return row ? row.affinity : null;
}

test('stacked /roam responses only redeem once per cooldown window', async () => {
  const userId = 'user-stacked-roam';
  const characterId = 'taiga';

  // First redemption: lands, grants affinity, stamps the cooldown.
  const first = await postInteraction(respInteraction(userId, characterId, 'kind', 'roam'));
  const firstBody = await first.json();
  assert.strictEqual(first.status, 200);
  assert.strictEqual(firstBody.type, 7); // UPDATE_MESSAGE
  const afterFirst = affinityFor(userId, characterId);
  assert.notStrictEqual(afterFirst, null, 'the first response should create the relationship row');

  const stamped = fake.tables.command_limits.find(
    (r) => r.discord_user_id === userId && r.command_name === 'roam',
  );
  assert.ok(stamped, 'the first completed response should stamp the roam cooldown');

  // Second redemption from another queued prompt in the same window: refused,
  // and affinity does not move.
  const second = await postInteraction(respInteraction(userId, characterId, 'kind', 'roam'));
  const secondBody = await second.json();
  assert.strictEqual(second.status, 200);
  assert.match(secondBody.data.content, /again in/, 'the second redemption should return the cooldown notice');
  assert.strictEqual(secondBody.data.flags, 64, 'the cooldown notice is ephemeral');
  assert.strictEqual(
    affinityFor(userId, characterId),
    afterFirst,
    'a blocked redemption must not grant more affinity',
  );
});

test('a /meet response is blocked when the meet cooldown is already active', async () => {
  const userId = 'user-meet-cooldown-redeem';
  fake.tables.command_limits.push({
    discord_user_id: userId,
    command_name: 'meet',
    last_used_at: new Date().toISOString(),
  });

  const res = await postInteraction(respInteraction(userId, 'taiga', 'kind', 'meet'));
  const body = await res.json();

  assert.strictEqual(res.status, 200);
  assert.match(body.data.content, /again in/);
  assert.strictEqual(affinityFor(userId, 'taiga'), null, 'no affinity row should be created for a blocked redemption');
});

test.after(() => {
  server.close();
});
