// Regression test for the crash risk introduced (and fixed) alongside the
// ghost-row fix: switching /roam's preview read off the old fallback-on-error
// getRelationship meant a genuine Supabase error (not just "no rows") could
// propagate uncaught out of the /interactions handler. Express 4 doesn't
// catch rejected async handlers, and app.js has no global error handler, so
// an uncaught rejection here would take the whole bot process down — not
// just fail the one request. This drives a real HTTP request, signed the way
// Discord actually signs interactions, at a real running instance of app.js,
// with Supabase forced to fail on the exact query /roam's preview read makes.
import { test, mock } from 'node:test';
import assert from 'node:assert';
import { createFakeSupabase } from './helpers/fakeSupabase.js';
import { generateDiscordKeyPair, signInteraction } from './helpers/discordSign.js';

const TEST_PORT = 38173;
process.env.PORT = String(TEST_PORT);
process.env.SUPABASE_URL ??= 'http://fake.local';
process.env.SUPABASE_SERVICE_ROLE_KEY ??= 'fake-service-role-key';

const { keyPair, publicKeyHex } = await generateDiscordKeyPair();
process.env.PUBLIC_KEY = publicKeyHex;

const fake = createFakeSupabase({ character_relationships: [], command_limits: [] });
mock.module('@supabase/supabase-js', {
  namedExports: { createClient: () => fake.client },
});

// Fix "now" so /roam's background selection reliably finds a daytime spot
// instead of depending on wall-clock time (see constants/backgrounds.js's
// evening/_PM cutoff). The -05:00 offset is safe regardless of the host's
// ambient TZ specifically because importing app.js below pins
// process.env.TZ to America/Chicago before any Date math runs — see
// preview-default-affinity.test.js's FIXED_NOW for what goes wrong without that
// pin in place.
mock.timers.enable({ apis: ['Date'] });
mock.timers.setTime(new Date('2026-06-15T12:00:00-05:00').getTime());

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

const roamCommand = {
  type: 2, // APPLICATION_COMMAND
  data: { name: 'roam' },
  member: { user: { id: 'user-db-error-test' } },
};

test('/roam responds with a graceful fallback (not a crash) when the relationship lookup fails', async () => {
  fake.forceError('character_relationships', 'select', { code: 'DB_DOWN', message: 'simulated outage' });

  const res = await postInteraction(roamCommand);
  const body = await res.json();

  assert.strictEqual(res.status, 200, 'the request itself must still be answered, not hang or 500');
  assert.strictEqual(body.type, 4); // CHANNEL_MESSAGE_WITH_SOURCE
  // Exact match on app.js's known fallback string, not a loose word scan —
  // real dialogue is free-text flavor content and can innocently contain
  // words like "wrong" (e.g. "holding a map the wrong way up") that would
  // false-match a pattern like /wrong|try again/i.
  assert.strictEqual(body.data.content, 'Something went wrong wandering out. Try again?');
  assert.strictEqual(body.data.components, undefined, 'the fallback has no approach button, unlike a real encounter');
});

test('/roam still works normally when Supabase is healthy', async () => {
  const res = await postInteraction({
    ...roamCommand,
    member: { user: { id: 'user-happy-path-test' } },
  });
  const body = await res.json();

  assert.strictEqual(res.status, 200);
  assert.strictEqual(body.type, 4);
  assert.ok(body.data.content, 'should produce real dialogue content on the happy path');
  assert.ok(body.data.components?.length > 0, 'a real encounter offers an approach button, unlike the error fallback');
});

test.after(() => {
  mock.timers.reset();
  server.close();
});
