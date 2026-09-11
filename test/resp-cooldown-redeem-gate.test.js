// Regression: the 3h /roam + /meet cooldown must be re-checked when a dialogue
// response is redeemed, not only when the command is invoked. The invoke check
// is read-only and the clock is only stamped once a flow completes (the 'resp'
// button), so without a check at redemption a user could fire /roam or /meet
// many times before finishing any — every invoke check passes because none has
// stamped yet — then click through all the queued response buttons and redeem
// N affinity gains against a "once per 3h" limit.
//
// This also covers the fix for a second, related bug: the 'resp' handler used
// to answer INLINE — app.js awaited claimCommandUse and buildResponseResultMessage
// (several DB round trips) and only then called res.send(). A slow database
// overran Discord's 3s interaction window; missing it dropped the reply (though
// the claim and the affinity write had already committed), Discord told the
// clicker "This interaction failed", and the reflexive second click landed on
// an already-claimed slot — showing the cooldown notice in place of the +N the
// first click had actually earned. The fix: ack immediately with
// DEFERRED_UPDATE_MESSAGE, then PATCH the result (or the cooldown refusal) over
// the webhook.
//
// Driven at a real running app.js instance with interactions signed the way
// Discord signs them (see meet-pick-route.test.js), with global fetch stubbed
// so the followup calls app.js makes to discord.com are captured, not sent.
import { test, mock } from 'node:test';
import assert from 'node:assert';
import { createFakeSupabase } from './helpers/fakeSupabase.js';
import { generateDiscordKeyPair, signInteraction } from './helpers/discordSign.js';

const TEST_PORT = 38176; // distinct from the other route tests' ports
process.env.PORT = String(TEST_PORT);
process.env.APP_ID = 'app-under-test';
process.env.SUPABASE_URL ??= 'http://fake.local';
process.env.SUPABASE_SERVICE_ROLE_KEY ??= 'fake-service-role-key';

const { keyPair, publicKeyHex } = await generateDiscordKeyPair();
process.env.PUBLIC_KEY = publicKeyHex;

const fake = createFakeSupabase({ character_relationships: [], command_limits: [] });
mock.module('@supabase/supabase-js', {
  namedExports: { createClient: () => fake.client },
});

const { server } = await import('../app.js');

// --- stub global fetch: localhost passes through, discord.com is captured -----
const originalFetch = globalThis.fetch;
const discordCalls = [];

globalThis.fetch = async (input, opts = {}) => {
  const url = typeof input === 'string' ? input : input.url;

  if (url.includes(`localhost:${TEST_PORT}`)) return originalFetch(input, opts);

  if (url.includes('discord.com/api')) {
    const method = opts.method || 'GET';
    const isOriginalEdit = url.endsWith('/messages/@original');
    let payload = null;
    if (opts.body instanceof FormData) {
      const raw = opts.body.get('payload_json');
      payload = raw ? JSON.parse(raw) : null;
    } else if (typeof opts.body === 'string') {
      payload = JSON.parse(opts.body);
    }
    discordCalls.push({ url, method, isOriginalEdit, payload });

    return new Response(JSON.stringify({ id: 'stub-message' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  throw new Error(`unexpected fetch in test: ${url}`);
};

async function waitFor(predicate, { timeout = 2000, interval = 10 } = {}) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    if (predicate()) return;
    await new Promise((r) => setTimeout(r, interval));
  }
  throw new Error('waitFor timed out');
}

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

let tokenSeq = 0;
// A dialogue-response button click for the given flow. The shown components are
// what the handler greys out and echoes back on the result / cooldown message.
function respInteraction(userId, characterId, responseType, origin) {
  return {
    id: `interaction-${++tokenSeq}`,
    token: `token-${tokenSeq}`,
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

const originalEdits = () => discordCalls.filter((c) => c.isOriginalEdit);

test('stacked /roam responses only redeem once per cooldown window', async () => {
  discordCalls.length = 0;
  const userId = 'user-stacked-roam';
  const characterId = 'taiga';

  // First redemption: acks deferred, then lands, grants affinity, stamps the
  // cooldown, and PATCHes the result onto @original.
  const first = await postInteraction(respInteraction(userId, characterId, 'kind', 'roam'));
  const firstBody = await first.json();
  assert.strictEqual(first.status, 200);
  assert.strictEqual(firstBody.type, 6, 'DEFERRED_UPDATE_MESSAGE — not a type 4/7 built after the redemption');

  await waitFor(() => originalEdits().length === 1);
  const afterFirst = affinityFor(userId, characterId);
  assert.notStrictEqual(afterFirst, null, 'the first response should create the relationship row');
  assert.doesNotMatch(originalEdits()[0].payload.content, /again in/, 'the first redemption should land, not cooldown');

  const stamped = fake.tables.command_limits.find(
    (r) => r.discord_user_id === userId && r.command_name === 'roam',
  );
  assert.ok(stamped, 'the first completed response should stamp the roam cooldown');

  // Second redemption from another queued prompt in the same window: also acked
  // deferred, then refused over the same PATCH path — never inline — and
  // affinity does not move.
  const second = await postInteraction(respInteraction(userId, characterId, 'kind', 'roam'));
  const secondBody = await second.json();
  assert.strictEqual(second.status, 200);
  assert.strictEqual(secondBody.type, 6, 'still a deferred ack, even for a refusal');

  await waitFor(() => originalEdits().length === 2);
  const cooldownEdit = originalEdits()[1];
  assert.match(cooldownEdit.payload.content, /again in/, 'the second redemption should return the cooldown notice');
  assert.strictEqual(
    affinityFor(userId, characterId),
    afterFirst,
    'a blocked redemption must not grant more affinity',
  );
});

test('a /meet response is blocked when the meet cooldown is already active', async () => {
  discordCalls.length = 0;
  const userId = 'user-meet-cooldown-redeem';
  fake.tables.command_limits.push({
    discord_user_id: userId,
    command_name: 'meet',
    last_used_at: new Date().toISOString(),
  });

  const res = await postInteraction(respInteraction(userId, 'taiga', 'kind', 'meet'));
  const body = await res.json();
  assert.strictEqual(res.status, 200);
  assert.strictEqual(body.type, 6);

  await waitFor(() => originalEdits().length === 1);
  assert.match(originalEdits()[0].payload.content, /again in/);
  assert.strictEqual(affinityFor(userId, 'taiga'), null, 'no affinity row should be created for a blocked redemption');
});

test.after(() => {
  globalThis.fetch = originalFetch;
  server.close();
});
