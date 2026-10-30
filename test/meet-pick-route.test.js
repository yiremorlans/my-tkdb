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
//
// Then the pick itself, as /meet as the Activity (docs/hangout-activity.md
// §11): the owner's click launches the Activity and saves the encounter,
// everyone else (until release) and everyone while the off switch is on get
// today's image, and a launch the Activity never loads falls back to the
// image.
import { test, mock } from 'node:test';
import assert from 'node:assert';
import { createFakeSupabase } from './helpers/fakeSupabase.js';
import { generateDiscordKeyPair } from './helpers/discordSign.js';
import { postSignedInteraction, stubDiscordFetch, waitFor } from './helpers/routeHarness.js';
import { MEET_OPTION_COUNT } from '../constants/game.js';

const TEST_PORT = 38174; // distinct from roam-db-error-resilience's port; separate process either way
process.env.PORT = String(TEST_PORT);
process.env.APP_ID = 'app-under-test';
process.env.SUPABASE_URL ??= 'http://fake.local';
process.env.SUPABASE_SERVICE_ROLE_KEY ??= 'fake-service-role-key';

const { keyPair, publicKeyHex } = await generateDiscordKeyPair();
process.env.PUBLIC_KEY = publicKeyHex;

process.env.OWNER_DISCORD_ID = 'the-owner';

const fake = createFakeSupabase({
  app_settings: [{ id: 1, maintenance_mode: false, meet_activity_off: false }],
  character_relationships: [],
  command_limits: [],
  meet_encounters: [],
});
mock.module('@supabase/supabase-js', {
  namedExports: { createClient: () => fake.client },
});
mock.module('../imageComposition.js', {
  namedExports: {
    composeEncounter: async () => Buffer.from('png'),
    // Unused here; encounters.js and publicEncounters.js import them.
    composeSilhouetteEncounter: async () => Buffer.from('silhouette-png'),
    composeWardingCard: async () => Buffer.from('warding-png'),
    composeFieldReport: async () => Buffer.from('report-png'),
  },
});

const { server } = await import('../app.js');
const { clearMaintenanceCache } = await import('../maintenance.js');
const { ALREADY_PICKED, setMeetFallbackDelay } = await import('../meetActivity.js');
const { clearHangoutLaunch, hangoutLaunchFor, recordHangoutLaunch } = await import('../activityRoutes.js');

// The launch callback answers with the instance it opened (with_response);
// `launchStatus` lets a test have Discord refuse it.
let launchStatus = 200;
const isLaunch = (call) => call.url.includes('/callback?with_response=true');
const { calls: discordCalls, restore: restoreFetch } = stubDiscordFetch(TEST_PORT, {
  status: (call) => (isLaunch(call) ? launchStatus : 200),
  body: (call) => (isLaunch(call)
    ? { interaction: { id: 'i', type: 3 }, resource: { type: 12, activity_instance: { id: 'instance-xyz' } } }
    : { id: 'stub-message' }),
});

const postInteraction = (body) => postSignedInteraction(TEST_PORT, keyPair.privateKey, body);

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

// --- the pick ----------------------------------------------------------------

const PICKER_ROW = {
  type: 1,
  components: ['kaito', 'jin', 'alan', 'rui'].map((id) => ({ type: 2, style: 2, label: id, custom_id: `meet:pick:${id}` })),
};

function pickClick(userId, characterId, pickerMessageId) {
  return {
    id: `interaction-${++tokenSeq}`,
    token: `token-${tokenSeq}`,
    type: 3, // MESSAGE_COMPONENT
    data: { custom_id: `meet:pick:${characterId}` },
    member: { user: { id: userId } },
    message: { id: pickerMessageId, content: 'Who do you want to meet?', components: [PICKER_ROW] },
  };
}

function setActivityOff(off) {
  fake.tables.app_settings[0].meet_activity_off = off;
  clearMaintenanceCache();
}

const encountersOf = (userId) => fake.tables.meet_encounters.filter((r) => r.discord_user_id === userId);
const imageFollowups = () => discordCalls.filter((c) => c.method === 'POST' && /\/webhooks\/app-under-test\/token-\d+$/.test(c.url));

function resetState() {
  discordCalls.length = 0;
  fake.tables.meet_encounters.length = 0;
  fake.tables.command_limits.length = 0;
  launchStatus = 200;
  setActivityOff(false);
  setMeetFallbackDelay();
}

test("the owner's pick launches the Activity and saves the encounter it'll load", async () => {
  resetState();
  recordHangoutLaunch('the-owner', 'v1'); // an earlier /encdev hangout
  const res = await postInteraction(pickClick('the-owner', 'alan', 'picker-launch'));
  assert.strictEqual(res.status, 202, 'answered through the callback, so the HTTP reply is empty');

  const launch = discordCalls.find(isLaunch);
  assert.ok(launch, 'LAUNCH_ACTIVITY goes to the callback endpoint');
  assert.match(launch.url, /\/interactions\/interaction-\d+\/token-\d+\/callback\?with_response=true$/);
  assert.deepStrictEqual(launch.payload, { type: 12 });

  await waitFor(() => encountersOf('the-owner').length === 1);
  const [row] = encountersOf('the-owner');
  assert.strictEqual(row.character_id, 'alan');
  assert.strictEqual(row.instance_id, 'instance-xyz', 'tied to the instance the launch opened');
  assert.strictEqual(row.picker_message_id, 'picker-launch');
  assert.strictEqual(row.outfit, 'academy');
  assert.strictEqual(row.variant, 'uniform');
  assert.strictEqual(typeof row.line, 'string');
  assert.deepStrictEqual(Object.keys(row.responses).sort(), ['bold', 'kind', 'neutral', 'playful']);
  assert.strictEqual(typeof row.mood, 'boolean');
  assert.match(row.intro, /^Alan .+ agrees to meet you/);

  await waitFor(() => discordCalls.some((c) => c.isOriginalEdit));
  const greyOut = discordCalls.find((c) => c.isOriginalEdit);
  assert.strictEqual(greyOut.method, 'PATCH');
  assert.ok(greyOut.payload.components[0].components.every((b) => b.disabled), 'the picker greys out after the launch');
  assert.deepStrictEqual(hangoutLaunchFor('the-owner'), { version: 'v2', dev: false }, 'a /meet launch opens the encounter, not the free hangout');
  assert.strictEqual(imageFollowups().length, 0, 'no image while the Activity has the encounter');
});

test('a second name on an already-picked picker gets "already picked", not a second encounter', async () => {
  resetState();
  await postInteraction(pickClick('the-owner', 'alan', 'picker-twice'));
  await waitFor(() => encountersOf('the-owner').length === 1);
  discordCalls.length = 0;

  const res = await postInteraction(pickClick('the-owner', 'jin', 'picker-twice'));
  const body = await res.json();
  assert.strictEqual(body.type, 4); // CHANNEL_MESSAGE_WITH_SOURCE
  assert.strictEqual(body.data.flags, 64);
  assert.strictEqual(body.data.content, ALREADY_PICKED);
  assert.ok(!discordCalls.some(isLaunch));
  assert.strictEqual(encountersOf('the-owner').length, 1);
});

test('an older picker still launches its own encounter', async () => {
  resetState();
  await postInteraction(pickClick('the-owner', 'alan', 'picker-old'));
  await postInteraction(pickClick('the-owner', 'jin', 'picker-new'));
  await waitFor(() => encountersOf('the-owner').length === 2);
  assert.deepStrictEqual(encountersOf('the-owner').map((r) => r.character_id).sort(), ['alan', 'jin']);
});

test('a pick on /meet cooldown shows the cooldown text with the picker greyed, and launches nothing', async () => {
  resetState();
  fake.tables.command_limits.push({ discord_user_id: 'the-owner', command_name: 'meet', last_used_at: new Date().toISOString() });
  const body = await (await postInteraction(pickClick('the-owner', 'alan', 'picker-cooldown'))).json();
  assert.strictEqual(body.type, 7); // UPDATE_MESSAGE
  assert.match(body.data.content, /again in/);
  assert.ok(body.data.components[0].components.every((b) => b.disabled));
  assert.ok(!discordCalls.some(isLaunch));
  assert.strictEqual(encountersOf('the-owner').length, 0);
});

test('the off switch gives today\'s image flow, even to the owner', async () => {
  resetState();
  setActivityOff(true);
  const body = await (await postInteraction(pickClick('the-owner', 'kaito', 'picker-off'))).json();
  assert.strictEqual(body.type, 7); // UPDATE_MESSAGE greying out the picker, as today
  await waitFor(() => imageFollowups().length === 1);
  const ids = imageFollowups()[0].payload.components.map((row) => row.components[0].custom_id);
  assert.ok(ids.every((id) => /^resp:kaito:\w+:meet\b/.test(id)), ids.join(', '));
  assert.ok(!discordCalls.some(isLaunch));
  assert.strictEqual(encountersOf('the-owner').length, 0);
});

test('until release, everyone but the owner keeps the image flow', async () => {
  resetState();
  const body = await (await postInteraction(pickClick('not-the-owner', 'kaito', 'picker-public'))).json();
  assert.strictEqual(body.type, 7);
  await waitFor(() => imageFollowups().length === 1);
  assert.ok(!discordCalls.some(isLaunch));
});

test('a launch Discord refuses falls back to the image flow on the same click', async () => {
  resetState();
  launchStatus = 400;
  const body = await (await postInteraction(pickClick('the-owner', 'kaito', 'picker-refused'))).json();
  assert.strictEqual(body.type, 7);
  await waitFor(() => imageFollowups().length === 1);
  assert.strictEqual(encountersOf('the-owner').length, 0);
});

test('an encounter the Activity never loads gets the image fallback, answered as a fallback', async () => {
  resetState();
  setMeetFallbackDelay(30);
  await postInteraction(pickClick('the-owner', 'jin', 'picker-fallback'));
  await waitFor(() => imageFollowups().length === 1);
  const [followup] = imageFollowups();
  const [row] = encountersOf('the-owner');
  assert.strictEqual(followup.payload.content.split('\n')[0], row.intro);
  const ids = followup.payload.components.map((r) => r.components[0].custom_id);
  assert.deepStrictEqual(ids.map((id) => id.split(':')[2]), ['kind', 'playful', 'bold', 'neutral']);
  for (const id of ids) {
    assert.ok(id.startsWith('resp:jin:') && id.split(':')[3] === 'fallback', id);
    assert.strictEqual(id.split(':')[4] === 'm', row.mood, 'the saved mood flag, from the server');
  }
  assert.deepStrictEqual(
    followup.payload.components.map((r) => r.components[0].label),
    ['kind', 'playful', 'bold', 'neutral'].map((type) => row.responses[type]),
    'the same four labels the Activity shows',
  );
});

test('once the Activity loads the encounter, the fallback never fires', async () => {
  resetState();
  setMeetFallbackDelay(80);
  await postInteraction(pickClick('the-owner', 'jin', 'picker-loaded'));
  await waitFor(() => encountersOf('the-owner').length === 1);
  encountersOf('the-owner')[0].loaded_at = new Date().toISOString();
  await new Promise((resolve) => setTimeout(resolve, 200));
  assert.strictEqual(imageFollowups().length, 0);
});

test('the Launch entry point answers like /meet, with the picker', async () => {
  discordCalls.length = 0;
  const res = await postInteraction({ ...meetCommand('user-launch-entry'), data: { name: 'launch', type: 4 } });
  assert.strictEqual((await res.json()).type, 5);
  await waitFor(() => discordCalls.length > 0);
  const buttons = discordCalls[0].payload.components[0].components;
  assert.strictEqual(buttons.length, MEET_OPTION_COUNT);
  assert.ok(buttons.every((b) => b.custom_id.startsWith('meet:pick:')));
});

test.after(() => {
  clearHangoutLaunch('the-owner');
  restoreFetch();
  server.close();
});
