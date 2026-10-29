// POST /api/activity/token, the Hangout Activity's sign-in
// (activityRoutes.js handleActivityToken; docs/hangout-activity.md §5.1,
// §6): bad or missing codes are rejected without a session, a good code
// yields a session token that verifies to the Discord user, anyone but the
// owner is refused while the hangout is owner-only, and the token itself
// rejects tampering, the wrong secret and expiry.
import { test } from 'node:test';
import assert from 'node:assert';
import express from 'express';

import {
  SESSION_TTL_MS,
  activityRouter,
  handleActivityToken,
  signSessionToken,
  verifySessionToken,
} from '../activityRoutes.js';

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
