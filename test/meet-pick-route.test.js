// The /meet command's initial picker: offers MEET_OPTION_COUNT distinct
// characters to choose from, gated by the same 3h cooldown as /roam. Signed
// the way Discord actually signs interactions (see roam-db-error-
// resilience.test.js for why), driven at a real running app.js instance.
//
// /meet acks with DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE and resolves over the
// interaction webhook (see mission-accept-route.test.js for why: checkCommandLimit
// and buildMeetPickMessage between them do several sequential Supabase round
// trips, which on a slow/timing-out connection can blow Discord's 3s ack
// budget), so global fetch is stubbed here too — localhost passes through,
// discord.com is captured instead of sent.
import { test, mock } from 'node:test';
import assert from 'node:assert';
import { createFakeSupabase } from './helpers/fakeSupabase.js';
import { generateDiscordKeyPair, signInteraction } from './helpers/discordSign.js';
import { MEET_OPTION_COUNT } from '../constants/game.js';

const TEST_PORT = 38174; // distinct from roam-db-error-resilience's port; separate process either way
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
    let payload = null;
    if (opts.body instanceof FormData) {
      const raw = opts.body.get('payload_json');
      payload = raw ? JSON.parse(raw) : null;
    } else if (typeof opts.body === 'string') {
      payload = JSON.parse(opts.body);
    }
    discordCalls.push({ url, method: opts.method || 'GET', payload });
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
function meetCommand(userId) {
  return {
    id: `interaction-${++tokenSeq}`,
    token: `token-${tokenSeq}`,
    type: 2, // APPLICATION_COMMAND
    data: { name: 'meet' },
    member: { user: { id: userId } },
  };
}

test('/meet offers a pick-list of distinct characters', async () => {
  discordCalls.length = 0;
  const res = await postInteraction(meetCommand('user-meet-happy-path'));
  const body = await res.json();

  assert.strictEqual(res.status, 200);
  assert.strictEqual(body.type, 5); // DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE
  assert.strictEqual(body.data.flags, 64); // EPHEMERAL

  await waitFor(() => discordCalls.length > 0);
  const followup = discordCalls[0];
  assert.equal(followup.method, 'PATCH');
  assert.match(followup.url, /\/webhooks\/app-under-test\/token-\d+\/messages\/@original$/);
  const buttons = followup.payload.components[0].components;
  assert.strictEqual(buttons.length, MEET_OPTION_COUNT);

  const ids = buttons.map((b) => b.custom_id);
  assert.ok(ids.every((id) => id.startsWith('meet:pick:')), 'every button should route to meet:pick:<characterId>');
  assert.strictEqual(new Set(ids).size, ids.length, 'the offered characters should be distinct');
});

test('/meet is blocked while its cooldown is active', async () => {
  discordCalls.length = 0;
  const userId = 'user-meet-on-cooldown';
  fake.tables.command_limits.push({
    discord_user_id: userId,
    command_name: 'meet',
    last_used_at: new Date().toISOString(),
  });

  const res = await postInteraction(meetCommand(userId));
  assert.strictEqual((await res.json()).type, 5); // still a deferred ack

  await waitFor(() => discordCalls.length > 0);
  const followup = discordCalls[0];
  assert.match(followup.payload.content, /again in/);
});

test.after(() => {
  globalThis.fetch = originalFetch;
  server.close();
});
