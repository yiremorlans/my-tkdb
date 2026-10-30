// GET /api/activity/launch, which hangout version a launch asked for
// (activityRoutes.js handleActivityLaunch; `/encdev hangout version:`
// records it): only a valid session reads it, the reader is the session's
// user, an unknown version or an old launch falls back to v1.
import { test } from 'node:test';
import assert from 'node:assert';
import express from 'express';

import {
  LAUNCH_TTL_MS,
  activityRouter,
  handleActivityLaunch,
  hangoutLaunchFor,
  recordHangoutLaunch,
  signSessionToken,
} from '../activityRoutes.js';

const env = { ACTIVITY_SESSION_SECRET: 'session-secret' };
const NOW = new Date('2026-10-30T12:00:00Z');
const bearer = (userId, secret = env.ACTIVITY_SESSION_SECRET) => `Bearer ${signSessionToken(userId, secret, NOW)}`;

test('no session, a bad one, or another secret gets 401 and no version', () => {
  for (const auth of [undefined, '', 'Bearer', 'Bearer garbage', bearer('user-1', 'other-secret'), signSessionToken('user-1', 'session-secret', NOW)]) {
    const { status, body } = handleActivityLaunch(auth, { env }, NOW);
    assert.strictEqual(status, 401, String(auth));
    assert.strictEqual(body.version, undefined);
  }
});

test("a session reads its own user's launch, defaulting to v1", () => {
  recordHangoutLaunch('user-2', 'v2', NOW);
  assert.deepStrictEqual(handleActivityLaunch(bearer('user-2'), { env }, NOW), { status: 200, body: { version: 'v2' } });
  assert.deepStrictEqual(handleActivityLaunch(bearer('user-3'), { env }, NOW).body, { version: 'v1' });
});

test('an unknown version records as v1, and a launch expires back to v1', () => {
  recordHangoutLaunch('user-4', 'v9', NOW);
  assert.strictEqual(hangoutLaunchFor('user-4', NOW), 'v1');

  recordHangoutLaunch('user-5', 'v2', NOW);
  assert.strictEqual(hangoutLaunchFor('user-5', new Date(NOW.getTime() + LAUNCH_TTL_MS - 1)), 'v2');
  assert.strictEqual(hangoutLaunchFor('user-5', new Date(NOW.getTime() + LAUNCH_TTL_MS)), 'v1');
});

test('the mounted route answers over HTTP', async () => {
  const app = express();
  app.use('/api/activity', activityRouter);
  const server = app.listen(0);
  const secret = process.env.ACTIVITY_SESSION_SECRET;
  process.env.ACTIVITY_SESSION_SECRET = env.ACTIVITY_SESSION_SECRET;
  try {
    const { port } = server.address();
    recordHangoutLaunch('user-6', 'v2');
    const token = signSessionToken('user-6', env.ACTIVITY_SESSION_SECRET);
    const ok = await fetch(`http://localhost:${port}/api/activity/launch`, { headers: { Authorization: `Bearer ${token}` } });
    assert.strictEqual(ok.status, 200);
    assert.deepStrictEqual(await ok.json(), { version: 'v2' });
    const refused = await fetch(`http://localhost:${port}/api/activity/launch`);
    assert.strictEqual(refused.status, 401);
  } finally {
    if (secret === undefined) delete process.env.ACTIVITY_SESSION_SECRET;
    else process.env.ACTIVITY_SESSION_SECRET = secret;
    server.close();
  }
});
