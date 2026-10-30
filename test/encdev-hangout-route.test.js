// `/encdev hangout` (publicEncounters.js handleEncounterDevHangout), the only
// way into the Hangout Activity until release (docs/hangout-activity.md):
// the owner gets LAUNCH_ACTIVITY as the interaction's first response (it
// can't follow a deferred ack), everyone else the same refusal as the rest
// of /encdev, and the other /encdev subcommands keep their deferred ack. It
// opens the free hangout, and its `version` choice (Live2D v2 by default, v1
// the legacy sprite rig) is recorded for the Activity (activityRoutes.js).
import { test, mock } from 'node:test';
import assert from 'node:assert';
import { createFakeSupabase } from './helpers/fakeSupabase.js';
import { generateDiscordKeyPair } from './helpers/discordSign.js';
import { postSignedInteraction, stubDiscordFetch } from './helpers/routeHarness.js';

const TEST_PORT = 38179; // distinct from the other route tests' ports
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
const { hangoutLaunchFor } = await import('../activityRoutes.js');

// The deferred-ack case lets /encdev's handler run on in the background;
// keep that off the real network.
const { restore: restoreFetch } = stubDiscordFetch(TEST_PORT);

let tokenSeq = 0;
function encdev(subcommand, userId, extra = {}) {
  return {
    id: `interaction-${++tokenSeq}`,
    token: `token-${tokenSeq}`,
    type: 2, // APPLICATION_COMMAND
    guild_id: 'guild-1',
    data: { name: 'encdev', options: [{ type: 1, name: subcommand }] },
    member: { user: { id: userId } },
    ...extra,
  };
}

const post = async (body) => (await postSignedInteraction(TEST_PORT, keyPair.privateKey, body)).json();

test('the owner launches the Activity as the first response', async () => {
  const body = await post(encdev('hangout', 'the-owner'));
  assert.deepStrictEqual(body, { type: 12 }); // LAUNCH_ACTIVITY
});

test('version:v1 launches the same way and is remembered for the Activity to read', async () => {
  const body = await post(encdev('hangout', 'the-owner', {
    data: { name: 'encdev', options: [{ type: 1, name: 'hangout', options: [{ type: 3, name: 'version', value: 'v1' }] }] },
  }));
  assert.deepStrictEqual(body, { type: 12 });
  assert.deepStrictEqual(hangoutLaunchFor('the-owner'), { version: 'v1', dev: true });
});

test('a launch without a version is the Live2D free hangout', async () => {
  await post(encdev('hangout', 'the-owner'));
  assert.deepStrictEqual(hangoutLaunchFor('the-owner'), { version: 'v2', dev: true });
});

test('anyone else gets the ephemeral /encdev refusal, not a launch', async () => {
  const body = await post(encdev('hangout', 'someone-else'));
  assert.strictEqual(body.type, 4); // CHANNEL_MESSAGE_WITH_SOURCE
  assert.strictEqual(body.data.flags, 64); // EPHEMERAL
  assert.strictEqual(body.data.content, 'Unknown command.');
});

test('outside a server there is nothing to launch into', async () => {
  const body = await post(encdev('hangout', 'the-owner', { guild_id: undefined }));
  assert.strictEqual(body.type, 4);
  assert.strictEqual(body.data.content, 'This only works in a server.');
});

test('the other /encdev subcommands keep their deferred ack', async () => {
  const body = await post(encdev('missions', 'the-owner'));
  assert.strictEqual(body.type, 5); // DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE
});

test.after(() => {
  restoreFetch();
  server.close();
});
