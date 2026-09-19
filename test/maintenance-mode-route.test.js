// The global maintenance kill switch (app_settings.maintenance_mode, db/
// migrations/024, maintenance.js). While it's on, every command and every
// component interaction should short-circuit to the maintenance message
// before touching any other table — except /encdev and /missiondev, which
// stay reachable for OWNER_DISCORD_ID (see the comment in app.js for why
// exempting them by name is still owner-only: both hard-gate on
// OWNER_DISCORD_ID inside their own handlers).
import { test, mock } from 'node:test';
import assert from 'node:assert';
import { createFakeSupabase } from './helpers/fakeSupabase.js';
import { generateDiscordKeyPair, signInteraction } from './helpers/discordSign.js';

const TEST_PORT = 38177; // distinct from the other route tests' ports
process.env.PORT = String(TEST_PORT);
process.env.APP_ID = 'app-under-test';
process.env.SUPABASE_URL ??= 'http://fake.local';
process.env.SUPABASE_SERVICE_ROLE_KEY ??= 'fake-service-role-key';
process.env.OWNER_DISCORD_ID = 'the-owner';

const { keyPair, publicKeyHex } = await generateDiscordKeyPair();
process.env.PUBLIC_KEY = publicKeyHex;

const fake = createFakeSupabase({
  app_settings: [{ id: 1, maintenance_mode: false }],
  character_relationships: [],
  command_limits: [],
});
mock.module('@supabase/supabase-js', {
  namedExports: { createClient: () => fake.client },
});

const { server } = await import('../app.js');
const { clearMaintenanceCache } = await import('../maintenance.js');

// /encdev's exemption test lets its handler run past the ack in the
// background (fire-and-forget, same as app.js itself never awaits it) — stub
// fetch so that background work can't reach the real network, same pattern
// as meet-pick-route.test.js.
const originalFetch = globalThis.fetch;
globalThis.fetch = async (input, opts = {}) => {
  const url = typeof input === 'string' ? input : input.url;
  if (url.includes(`localhost:${TEST_PORT}`)) return originalFetch(input, opts);
  return new Response(JSON.stringify({ id: 'stub-message' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

function setMaintenance(on) {
  fake.tables.app_settings[0].maintenance_mode = on;
  clearMaintenanceCache();
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
function command(name, userId, extra = {}) {
  return {
    id: `interaction-${++tokenSeq}`,
    token: `token-${tokenSeq}`,
    type: 2, // APPLICATION_COMMAND
    data: { name },
    member: { user: { id: userId } },
    ...extra,
  };
}

function component(customId, userId) {
  return {
    id: `interaction-${++tokenSeq}`,
    token: `token-${tokenSeq}`,
    type: 3, // MESSAGE_COMPONENT
    data: { custom_id: customId },
    member: { user: { id: userId } },
    message: { components: [] },
  };
}

test('a slash command is blocked with the maintenance message while maintenance is on', async () => {
  setMaintenance(true);
  const res = await postInteraction(command('meet', 'user-a'));
  const body = await res.json();

  assert.strictEqual(res.status, 200);
  assert.strictEqual(body.type, 4); // CHANNEL_MESSAGE_WITH_SOURCE
  assert.strictEqual(body.data.flags, 64); // EPHEMERAL
  assert.strictEqual(body.data.content, 'App under maintenance, please try again later.');
});

test('a component interaction is also blocked while maintenance is on', async () => {
  setMaintenance(true);
  const res = await postInteraction(component('meet:pick:kaito', 'user-b'));
  const body = await res.json();

  assert.strictEqual(body.type, 4);
  assert.strictEqual(body.data.content, 'App under maintenance, please try again later.');
});

test('/encdev stays reachable for the owner while maintenance is on', async () => {
  setMaintenance(true);
  const res = await postInteraction(command('encdev', 'the-owner'));
  const body = await res.json();

  // /encdev's own ack (deferred + ephemeral) — reaching it at all means the
  // maintenance gate let this one through, unlike the blocked cases above
  // which get an immediate CHANNEL_MESSAGE_WITH_SOURCE refusal instead.
  assert.strictEqual(body.type, 5); // DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE
});

test('the owner can run /meet and use its buttons while maintenance is on', async () => {
  setMaintenance(true);
  const cmd = await (await postInteraction(command('meet', 'the-owner'))).json();
  assert.strictEqual(cmd.type, 5); // /meet's normal deferred ack, not the refusal

  const btn = await (await postInteraction(component('meet:pick:kaito', 'the-owner'))).json();
  assert.notStrictEqual(btn.data?.content, 'App under maintenance, please try again later.');
});

test('the owner bypass does not extend to other users', async () => {
  setMaintenance(true);
  const body = await (await postInteraction(command('roam', 'not-the-owner'))).json();
  assert.strictEqual(body.data.content, 'App under maintenance, please try again later.');
});

test('commands work normally once maintenance is off', async () => {
  setMaintenance(false);
  const res = await postInteraction(command('meet', 'user-c'));
  const body = await res.json();

  assert.strictEqual(body.type, 5); // DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE, /meet's normal ack
});

test.after(() => {
  globalThis.fetch = originalFetch;
  server.close();
});
