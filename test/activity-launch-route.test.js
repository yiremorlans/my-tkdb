// What a launch opens, read by the Activity after sign-in
// (activityRoutes.js): GET /api/activity/launch says whether it's an
// `/encdev hangout` free hangout (and in which version) or a /meet
// encounter, and GET /api/activity/encounter returns that user's own
// encounter (docs/hangout-activity.md §6, §11). Only a valid session reads
// either, the reader is always the session's user, and loading an encounter
// cancels its image fallback.
import { test, mock } from 'node:test';
import assert from 'node:assert';
import express from 'express';
import { createFakeSupabase } from './helpers/fakeSupabase.js';

process.env.SUPABASE_URL ??= 'http://fake.local';
process.env.SUPABASE_SERVICE_ROLE_KEY ??= 'fake-service-role-key';

const fake = createFakeSupabase({ meet_encounters: [], command_limits: [] });
mock.module('@supabase/supabase-js', {
  namedExports: { createClient: () => fake.client },
});

const {
  LAUNCH_TTL_MS,
  activityRouter,
  clearHangoutLaunch,
  handleActivityEncounter,
  handleActivityLaunch,
  hangoutLaunchFor,
  recordHangoutLaunch,
  signSessionToken,
} = await import('../activityRoutes.js');

const env = { ACTIVITY_SESSION_SECRET: 'session-secret' };
const NOW = new Date('2026-10-30T12:00:00Z');
const bearer = (userId, secret = env.ACTIVITY_SESSION_SECRET) => `Bearer ${signSessionToken(userId, secret, NOW)}`;
const BAD_SESSIONS = [undefined, '', 'Bearer', 'Bearer garbage', bearer('user-1', 'other-secret'), signSessionToken('user-1', 'session-secret', NOW)];

function encounterRow(overrides) {
  return {
    id: `enc-${fake.tables.meet_encounters.length + 1}`,
    character_id: 'alan',
    picker_message_id: 'picker-1',
    instance_id: null,
    interaction_token: 'click-token',
    background_file: 'Vagastrom_Alan_Room.png',
    outfit: 'academy',
    variant: 'uniform',
    tier: 'new',
    intro: 'Alan Mido agrees to meet you at **The Pit**.',
    notice: null,
    line: 'You again.',
    responses: { kind: 'Say hi', playful: 'Tease him', bold: 'Sit down', neutral: 'Nod' },
    mood: true,
    beat_key: 'aaaaaaaaaaaa',
    loaded_at: null,
    created_at: NOW.toISOString(),
    ...overrides,
  };
}

// --- GET /launch -------------------------------------------------------------

test('no session, a bad one, or another secret gets 401 and nothing', () => {
  for (const auth of BAD_SESSIONS) {
    const { status, body } = handleActivityLaunch(auth, { env }, NOW);
    assert.strictEqual(status, 401, String(auth));
    assert.strictEqual(body.version, undefined);
  }
});

test("a session reads its own user's launch; no dev launch means the Live2D /meet encounter", () => {
  recordHangoutLaunch('user-2', 'v1', NOW);
  assert.deepStrictEqual(handleActivityLaunch(bearer('user-2'), { env }, NOW), { status: 200, body: { version: 'v1', dev: true } });
  assert.deepStrictEqual(handleActivityLaunch(bearer('user-3'), { env }, NOW).body, { version: 'v2', dev: false });
});

test('an unknown version records as v2, a launch expires, and a /meet launch clears it', () => {
  recordHangoutLaunch('user-4', 'v9', NOW);
  assert.deepStrictEqual(hangoutLaunchFor('user-4', NOW), { version: 'v2', dev: true });

  recordHangoutLaunch('user-5', 'v1', NOW);
  assert.deepStrictEqual(hangoutLaunchFor('user-5', new Date(NOW.getTime() + LAUNCH_TTL_MS - 1)), { version: 'v1', dev: true });
  assert.deepStrictEqual(hangoutLaunchFor('user-5', new Date(NOW.getTime() + LAUNCH_TTL_MS)), { version: 'v2', dev: false });

  recordHangoutLaunch('user-6', 'v1', NOW);
  clearHangoutLaunch('user-6');
  assert.deepStrictEqual(hangoutLaunchFor('user-6', NOW), { version: 'v2', dev: false });
});

// --- GET /encounter ----------------------------------------------------------

test('the encounter route needs a session', async () => {
  for (const auth of BAD_SESSIONS) {
    const { status } = await handleActivityEncounter(auth, 'instance-1', { env }, NOW);
    assert.strictEqual(status, 401, String(auth));
  }
});

test("a user sees only their own encounter, never the mood flag or beat key, and loading it is stamped", async () => {
  const row = encounterRow({ discord_user_id: 'user-own', instance_id: 'instance-1' });
  fake.tables.meet_encounters.push(row, encounterRow({ discord_user_id: 'someone-else', instance_id: 'instance-1' }));

  const { status, body } = await handleActivityEncounter(bearer('user-own'), 'instance-1', { env }, NOW);
  assert.strictEqual(status, 200);
  assert.strictEqual(body.id, row.id);
  assert.strictEqual(body.character, 'alan');
  assert.strictEqual(body.name, 'Alan');
  assert.strictEqual(body.outfit, 'academy');
  assert.strictEqual(body.background, '/assets/bg/vagastrom/Vagastrom_Alan_Room.png');
  assert.deepStrictEqual(body.responses, row.responses);
  assert.strictEqual(body.mood, undefined, 'the mood flag stays on the server');
  assert.strictEqual(body.beatKey, undefined);
  assert.strictEqual(body.beat_key, undefined);
  assert.ok(fake.tables.meet_encounters.find((r) => r.id === row.id).loaded_at, 'loading stamps loaded_at, which cancels the fallback');
});

test('someone in the instance with no encounter of their own gets 404, not the scene', async () => {
  const { status, body } = await handleActivityEncounter(bearer('user-joiner'), 'instance-1', { env }, NOW);
  assert.strictEqual(status, 404);
  assert.deepStrictEqual(body, { error: 'no_encounter' });
});

test("another instance's encounter doesn't load; a launch with no instance id matches the newest without one", async () => {
  fake.tables.meet_encounters.push(encounterRow({ discord_user_id: 'user-two-launches', instance_id: 'instance-a' }));
  assert.strictEqual((await handleActivityEncounter(bearer('user-two-launches'), 'instance-b', { env }, NOW)).status, 404);

  const unknown = encounterRow({ discord_user_id: 'user-two-launches', instance_id: null, character_id: 'kaito' });
  fake.tables.meet_encounters.push(unknown);
  const { status, body } = await handleActivityEncounter(bearer('user-two-launches'), 'instance-b', { env }, NOW);
  assert.strictEqual(status, 200);
  assert.strictEqual(body.id, unknown.id);
});

test('a user on /meet cooldown gets the refusal, not an older picker\'s scene', async () => {
  fake.tables.meet_encounters.push(encounterRow({ discord_user_id: 'user-cooled', instance_id: 'instance-c' }));
  fake.tables.command_limits.push({ discord_user_id: 'user-cooled', command_name: 'meet', last_used_at: NOW.toISOString() });
  const { status } = await handleActivityEncounter(bearer('user-cooled'), 'instance-c', { env }, NOW);
  assert.strictEqual(status, 404);
});

test('the mounted routes answer over HTTP', async () => {
  const app = express();
  app.use('/api/activity', activityRouter);
  const server = app.listen(0);
  const secret = process.env.ACTIVITY_SESSION_SECRET;
  process.env.ACTIVITY_SESSION_SECRET = env.ACTIVITY_SESSION_SECRET;
  try {
    const { port } = server.address();
    recordHangoutLaunch('user-http', 'v1');
    const auth = { Authorization: `Bearer ${signSessionToken('user-http', env.ACTIVITY_SESSION_SECRET)}` };
    const ok = await fetch(`http://localhost:${port}/api/activity/launch`, { headers: auth });
    assert.strictEqual(ok.status, 200);
    assert.deepStrictEqual(await ok.json(), { version: 'v1', dev: true });
    assert.strictEqual((await fetch(`http://localhost:${port}/api/activity/launch`)).status, 401);

    fake.tables.meet_encounters.push(encounterRow({ discord_user_id: 'user-http', instance_id: 'instance-http' }));
    const enc = await fetch(`http://localhost:${port}/api/activity/encounter?instance=instance-http`, { headers: auth });
    assert.strictEqual(enc.status, 200);
    assert.strictEqual((await enc.json()).character, 'alan');
  } finally {
    if (secret === undefined) delete process.env.ACTIVITY_SESSION_SECRET;
    else process.env.ACTIVITY_SESSION_SECRET = secret;
    server.close();
  }
});
