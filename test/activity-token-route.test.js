// POST /api/activity/token, the Hangout Activity's sign-in
// (activityRoutes.js handleActivityToken; docs/hangout-activity.md §5.1,
// §6): bad or missing codes are rejected without a session, a good code
// yields a session token that verifies to the Discord user, anyone but the
// owner is refused while the hangout is owner-only, and the token itself
// rejects tampering, the wrong secret and expiry.
//
// Also the rest of the session's life with a /meet encounter (§11.2,
// §11.3): POST /renew keeps a pending answer signed in, and POST /answer
// pays once per cooldown, from the saved encounter only.
import { test, mock } from 'node:test';
import assert from 'node:assert';
import express from 'express';
import { createFakeSupabase } from './helpers/fakeSupabase.js';
import { getAffinityForResponse, getCharacterById } from '../constants/characters.js';

process.env.SUPABASE_URL ??= 'http://fake.local';
process.env.SUPABASE_SERVICE_ROLE_KEY ??= 'fake-service-role-key';

const fake = createFakeSupabase({
  meet_encounters: [],
  character_relationships: [],
  command_limits: [],
  recent_dialogue_beats: [],
  command_usage_log: [],
});
mock.module('@supabase/supabase-js', {
  namedExports: { createClient: () => fake.client },
});

const {
  SESSION_TTL_MS,
  activityRouter,
  handleActivityAnswer,
  handleActivityRenew,
  handleActivityToken,
  signSessionToken,
  verifySessionToken,
} = await import('../activityRoutes.js');

const env = {
  APP_ID: 'app-under-test',
  DISCORD_CLIENT_SECRET: 'client-secret',
  ACTIVITY_SESSION_SECRET: 'session-secret',
  OWNER_DISCORD_ID: 'user-42',
};
const NOW = new Date('2026-10-28T12:00:00Z');
const GOOD_CODE = 'good-code';

const json = (status, body) => new Response(JSON.stringify(body), {
  status,
  headers: { 'Content-Type': 'application/json' },
});

// Stands in for discord.com: only GOOD_CODE exchanges, and only the token it
// issues reads users/@me. Every call is recorded.
function fakeDiscord() {
  const calls = [];
  const fetchFn = async (url, init = {}) => {
    calls.push({ url: String(url), init });
    if (String(url).endsWith('/oauth2/token')) {
      const form = new URLSearchParams(String(init.body));
      if (form.get('code') !== GOOD_CODE || form.get('client_secret') !== env.DISCORD_CLIENT_SECRET) {
        return json(400, { error: 'invalid_grant' });
      }
      return json(200, { access_token: 'discord-access', token_type: 'Bearer', scope: 'identify' });
    }
    if (String(url).endsWith('/users/@me')) {
      if (init.headers?.Authorization !== 'Bearer discord-access') return json(401, { message: '401: Unauthorized' });
      return json(200, { id: 'user-42', username: 'honorroll', global_name: 'Honor Roll' });
    }
    throw new Error(`unexpected fetch ${url}`);
  };
  return { calls, fetchFn };
}

test('a missing or malformed code is rejected without calling Discord', async () => {
  const discord = fakeDiscord();
  for (const body of [undefined, {}, { code: '' }, { code: 42 }, { code: 'x'.repeat(513) }]) {
    const { status, body: out } = await handleActivityToken(body, { fetchFn: discord.fetchFn, env }, NOW);
    assert.strictEqual(status, 400, JSON.stringify(body));
    assert.strictEqual(out.session_token, undefined);
  }
  assert.strictEqual(discord.calls.length, 0);
});

test('a code Discord rejects returns 401 and no session', async () => {
  const discord = fakeDiscord();
  const { status, body } = await handleActivityToken({ code: 'stale-code' }, { fetchFn: discord.fetchFn, env }, NOW);
  assert.strictEqual(status, 401);
  assert.deepStrictEqual(body, { error: 'invalid_code' });
  assert.ok(!discord.calls.some((c) => c.url.endsWith('/users/@me')));
});

test('a good code returns the access token and a session token that verifies', async () => {
  const discord = fakeDiscord();
  const { status, body } = await handleActivityToken({ code: GOOD_CODE }, { fetchFn: discord.fetchFn, env }, NOW);
  assert.strictEqual(status, 200);
  assert.strictEqual(body.access_token, 'discord-access');
  assert.strictEqual(body.expires_in, 3600);
  assert.deepStrictEqual(body.user, { id: 'user-42', username: 'honorroll', global_name: 'Honor Roll' });
  assert.strictEqual(verifySessionToken(body.session_token, env.ACTIVITY_SESSION_SECRET, NOW), 'user-42');

  const exchange = new URLSearchParams(String(discord.calls[0].init.body));
  assert.strictEqual(exchange.get('client_id'), env.APP_ID);
  assert.strictEqual(exchange.get('grant_type'), 'authorization_code');
});

test('the user id comes from Discord, never from the request body', async () => {
  const discord = fakeDiscord();
  const { body } = await handleActivityToken(
    { code: GOOD_CODE, user_id: 'someone-else', sub: 'someone-else' },
    { fetchFn: discord.fetchFn, env },
    NOW,
  );
  assert.strictEqual(verifySessionToken(body.session_token, env.ACTIVITY_SESSION_SECRET, NOW), 'user-42');
});

test('anyone but the owner is refused a session while the hangout is owner-only', async () => {
  for (const owner of ['someone-else', '']) {
    const discord = fakeDiscord();
    const { status, body } = await handleActivityToken(
      { code: GOOD_CODE },
      { fetchFn: discord.fetchFn, env: { ...env, OWNER_DISCORD_ID: owner } },
      NOW,
    );
    assert.strictEqual(status, 403, `owner ${JSON.stringify(owner)}`);
    assert.deepStrictEqual(body, { error: 'not_available' });
  }
});

test('Discord being unreachable is a 502, not a throw', async () => {
  const fetchFn = async () => {
    throw new Error('ECONNRESET');
  };
  const { status } = await handleActivityToken({ code: GOOD_CODE }, { fetchFn, env }, NOW);
  assert.strictEqual(status, 502);
});

test('missing secrets refuse to issue a session', async () => {
  const discord = fakeDiscord();
  const { status } = await handleActivityToken(
    { code: GOOD_CODE },
    { fetchFn: discord.fetchFn, env: { ...env, ACTIVITY_SESSION_SECRET: '' } },
    NOW,
  );
  assert.strictEqual(status, 500);
  assert.strictEqual(discord.calls.length, 0);
});

test('session tokens reject tampering, the wrong secret and expiry', () => {
  const token = signSessionToken('user-42', 'session-secret', NOW);
  assert.strictEqual(verifySessionToken(token, 'session-secret', NOW), 'user-42');

  const [payload, signature] = token.split('.');
  const forged = Buffer.from(JSON.stringify({ sub: 'someone-else', exp: NOW.getTime() + SESSION_TTL_MS })).toString('base64url');
  assert.strictEqual(verifySessionToken(`${forged}.${signature}`, 'session-secret', NOW), null);
  assert.strictEqual(verifySessionToken(token, 'other-secret', NOW), null);

  const justBefore = new Date(NOW.getTime() + SESSION_TTL_MS - 1);
  const atExpiry = new Date(NOW.getTime() + SESSION_TTL_MS);
  assert.strictEqual(verifySessionToken(token, 'session-secret', justBefore), 'user-42');
  assert.strictEqual(verifySessionToken(token, 'session-secret', atExpiry), null);

  for (const bad of [undefined, '', 'garbage', `${payload}.`, `${payload}.${signature}.extra`]) {
    assert.strictEqual(verifySessionToken(bad, 'session-secret', NOW), null);
  }
});

test('the mounted route parses JSON and rejects a missing code over HTTP', async () => {
  const app = express();
  app.use('/api/activity', activityRouter);
  const server = app.listen(0);
  try {
    const { port } = server.address();
    const res = await fetch(`http://localhost:${port}/api/activity/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    assert.strictEqual(res.status, 400);
    assert.deepStrictEqual(await res.json(), { error: 'missing_code' });
  } finally {
    server.close();
  }
});

// --- POST /renew -------------------------------------------------------------

test('a valid session renews to a fresh token; an expired or forged one cannot', () => {
  const token = signSessionToken('user-42', env.ACTIVITY_SESSION_SECRET, NOW);
  const later = new Date(NOW.getTime() + SESSION_TTL_MS - 60 * 1000);
  const { status, body } = handleActivityRenew(`Bearer ${token}`, { env }, later);
  assert.strictEqual(status, 200);
  assert.strictEqual(body.expires_in, 3600);
  const past = new Date(NOW.getTime() + SESSION_TTL_MS + 30 * 60 * 1000);
  assert.strictEqual(verifySessionToken(token, env.ACTIVITY_SESSION_SECRET, past), null);
  assert.strictEqual(verifySessionToken(body.session_token, env.ACTIVITY_SESSION_SECRET, past), 'user-42', 'the renewed token outlives the old one');

  assert.strictEqual(handleActivityRenew(`Bearer ${token}`, { env }, new Date(NOW.getTime() + SESSION_TTL_MS)).status, 401);
  assert.strictEqual(handleActivityRenew(`Bearer ${signSessionToken('user-42', 'other-secret', NOW)}`, { env }, NOW).status, 401);
});

// --- POST /answer ------------------------------------------------------------

const bearer = (userId) => `Bearer ${signSessionToken(userId, env.ACTIVITY_SESSION_SECRET, new Date())}`;
const answer = (userId, body) => handleActivityAnswer(bearer(userId), body, { env });

let encounterSeq = 0;
function saveEncounter(userId, overrides = {}) {
  const row = {
    id: `enc-${++encounterSeq}`,
    discord_user_id: userId,
    character_id: 'jin',
    picker_message_id: `picker-${encounterSeq}`,
    instance_id: 'instance-1',
    interaction_token: `click-token-${encounterSeq}`,
    background_file: null,
    outfit: 'academy',
    variant: 'uniform',
    tier: 'new',
    intro: 'Jin Morisato agrees to meet you.',
    notice: null,
    line: '...',
    responses: { kind: 'a', playful: 'b', bold: 'c', neutral: 'd' },
    mood: false,
    beat_key: `beat${String(encounterSeq).padStart(8, '0')}`,
    loaded_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    ...overrides,
  };
  fake.tables.meet_encounters.push(row);
  return row;
}

const affinityOf = (userId, characterId) =>
  fake.tables.character_relationships.find((r) => r.discord_user_id === userId && r.character_id === characterId)?.affinity ?? null;
const encounterExists = (id) => fake.tables.meet_encounters.some((r) => r.id === id);

test('an answer pays once: the result comes back, the encounter is gone, a replay finds nothing', async () => {
  const row = saveEncounter('user-answer-once');
  const first = await answer('user-answer-once', { encounter: row.id, type: 'bold' });
  assert.strictEqual(first.status, 200);
  assert.strictEqual(typeof first.body.reaction, 'string');
  assert.match(first.body.delta, /^\+\d+ — /);
  assert.strictEqual(first.body.gain, getAffinityForResponse(getCharacterById('jin'), 'bold', { mood: false }));
  assert.ok(!encounterExists(row.id), 'answering deletes the encounter');
  const paid = affinityOf('user-answer-once', 'jin');
  assert.strictEqual(paid, first.body.gain);

  await first.afterReply();
  assert.ok(
    fake.tables.command_usage_log.some((r) => r.discord_user_id === 'user-answer-once' && r.command_name === 'meet' && r.path === 'activity'),
    'a completed Activity /meet logs as meet, tagged activity',
  );

  const replay = await answer('user-answer-once', { encounter: row.id, type: 'bold' });
  assert.strictEqual(replay.status, 404);
  assert.strictEqual(affinityOf('user-answer-once', 'jin'), paid, 'a replay pays nothing');
});

test('a second open encounter answered afterwards gets the cooldown refusal and is spent', async () => {
  const first = saveEncounter('user-two-encounters');
  const second = saveEncounter('user-two-encounters', { character_id: 'kaito', instance_id: 'instance-2' });

  assert.strictEqual((await answer('user-two-encounters', { encounter: first.id, type: 'kind' })).status, 200);
  const refused = await answer('user-two-encounters', { encounter: second.id, type: 'kind' });
  assert.strictEqual(refused.status, 409);
  assert.strictEqual(refused.body.error, 'cooldown');
  assert.match(refused.body.reason, /again in/);
  assert.strictEqual(affinityOf('user-two-encounters', 'kaito'), null, 'no affinity for the refused encounter');
  assert.ok(!encounterExists(second.id), 'a refused answer still spends the encounter');
});

test('the mood flag and beat key come from the saved encounter, never the request', async () => {
  // Jin's kind answer is worth 1 off a mood beat and 2 on one, so a forged
  // flag would show in the gain.
  const jin = getCharacterById('jin');
  assert.notStrictEqual(getAffinityForResponse(jin, 'kind', { mood: true }), getAffinityForResponse(jin, 'kind', { mood: false }));

  const row = saveEncounter('user-forger', { mood: false });
  const { status, body } = await answer('user-forger', {
    encounter: row.id, type: 'kind', mood: true, m: true, beatKey: 'forgedkey000', characterId: 'kaito',
  });
  assert.strictEqual(status, 200);
  assert.strictEqual(body.gain, getAffinityForResponse(jin, 'kind', { mood: false }));
  assert.strictEqual(affinityOf('user-forger', 'jin'), body.gain);
  assert.strictEqual(affinityOf('user-forger', 'kaito'), null);
  await new Promise((resolve) => setImmediate(resolve)); // recordAnsweredBeat isn't awaited
  const recent = fake.tables.recent_dialogue_beats.find((r) => r.discord_user_id === 'user-forger');
  assert.deepStrictEqual(recent.beat_keys, [row.beat_key]);
});

test("someone else's encounter, a bad response type or no session gets nothing", async () => {
  const row = saveEncounter('user-owner-of-it');
  assert.strictEqual((await answer('user-intruder', { encounter: row.id, type: 'kind' })).status, 404);
  assert.strictEqual((await answer('user-owner-of-it', { encounter: row.id, type: 'flirt' })).status, 400);
  assert.strictEqual((await answer('user-owner-of-it', { encounter: { $ne: null }, type: 'kind' })).status, 400);
  assert.strictEqual((await handleActivityAnswer('Bearer nope', { encounter: row.id, type: 'kind' }, { env })).status, 401);
  assert.ok(encounterExists(row.id), 'none of those spend it');
  assert.strictEqual(affinityOf('user-intruder', 'jin'), null);
});

test('a claim that errors keeps the encounter answerable', async () => {
  const row = saveEncounter('user-db-blip');
  fake.forceError('rpc', 'claim_command_slot', { code: 'DB_DOWN', message: 'simulated outage' });
  const blip = await answer('user-db-blip', { encounter: row.id, type: 'kind' });
  assert.strictEqual(blip.status, 503);
  assert.ok(encounterExists(row.id));
  assert.strictEqual((await answer('user-db-blip', { encounter: row.id, type: 'kind' })).status, 200);
});
