// Regression test for the mission:accept dispatch in app.js.
//
// The bug: the Accept button was answered INLINE — app.js awaited
// handleMissionAccept (claim_mission RPC + a briefing re-read) and only then
// called res.send(result.response). When Supabase was slow (a Gateway Timeout
// spike), those two round trips overran Discord's 3-second interaction window.
// A missed window kills the token: the UPDATE_MESSAGE that rewrites the shared
// post is dropped even though claim_mission already committed — leaving a
// claimed mission with a live Accept button no sweep reconciles — and every
// followup on the dead token 404s ("Unknown Webhook").
//
// The fix: ack immediately with DEFERRED_UPDATE_MESSAGE, then resolve the post
// over the webhook (PATCH @original for a win, a flags:64 followup for a
// refusal). A post edit that still fails flags the row so the mission tick's
// reconcile pass fixes it later.
//
// Driven at a real running app.js instance, interactions signed the way Discord
// signs them (see roam-db-error-resilience.test.js), with global fetch stubbed
// so the followup calls app.js makes to discord.com are captured, not sent.
import { test, mock } from 'node:test';
import assert from 'node:assert/strict';
import { createFakeSupabase } from './helpers/fakeSupabase.js';
import { generateDiscordKeyPair, signInteraction } from './helpers/discordSign.js';

const TEST_PORT = 38175; // distinct from the other route tests; separate process anyway
process.env.PORT = String(TEST_PORT);
process.env.APP_ID = 'app-under-test';
process.env.SUPABASE_URL ??= 'http://fake.local';
process.env.SUPABASE_SERVICE_ROLE_KEY ??= 'fake-service-role-key';

const { keyPair, publicKeyHex } = await generateDiscordKeyPair();
process.env.PUBLIC_KEY = publicKeyHex;

const fake = createFakeSupabase({
  missions: [],
  guild_settings: [],
  user_activity: [],
  command_usage_log: [],
});
mock.module('@supabase/supabase-js', {
  namedExports: { createClient: () => fake.client },
});

const { server } = await import('../app.js');

// --- stub global fetch: localhost passes through, discord.com is captured -----
const originalFetch = globalThis.fetch;
const discordCalls = [];
// Per-test knobs, reset in resetHarness().
let claimDelayMs = 0;
let claimResolvedAt = 0;
let failOriginalPatch = false;

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

    const status = isOriginalEdit && failOriginalPatch ? 500 : 200;
    return new Response(JSON.stringify({ id: 'stub-message' }), {
      status,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  throw new Error(`unexpected fetch in test: ${url}`);
};

// Wrap the fake's rpc so a test can make claim_mission slow and observe when it
// actually resolved — the whole point of the fix is that the ack does not wait
// for it.
const realRpc = fake.client.rpc.bind(fake.client);
fake.client.rpc = async (name, args) => {
  if (name === 'claim_mission') {
    if (claimDelayMs) await new Promise((r) => setTimeout(r, claimDelayMs));
    const result = await realRpc(name, args);
    claimResolvedAt = Date.now();
    return result;
  }
  return realRpc(name, args);
};

function resetHarness() {
  fake.tables.missions = [];
  discordCalls.length = 0;
  claimDelayMs = 0;
  claimResolvedAt = 0;
  failOriginalPatch = false;
}

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
function acceptClick(missionId, userId, { nick = 'Ayaka' } = {}) {
  return {
    id: `interaction-${++tokenSeq}`,
    token: `token-${tokenSeq}`,
    type: 3, // MESSAGE_COMPONENT
    data: { custom_id: `mission:accept:${missionId}`, component_type: 2 },
    message: { id: 'post-message-1' },
    member: { user: { id: userId, username: nick } },
    guild_id: 'guild-1',
    app_permissions: '0',
  };
}

function openMission(id) {
  return {
    id,
    guild_id: 'guild-1',
    channel_id: 'channel-1',
    message_id: 'post-message-1',
    mission_type: 'coop', // no house roster / riddle lookup needed for the briefing
    house: 'Frostheim',
    teaser: 'a teaser',
    status: 'open',
    post_expires_at: new Date(Date.now() + 3_600_000).toISOString(),
  };
}

const followups = () => discordCalls.filter((c) => !c.isOriginalEdit);
const originalEdits = () => discordCalls.filter((c) => c.isOriginalEdit);

test('acks with a deferred update immediately, without waiting on the claim', async () => {
  resetHarness();
  fake.tables.missions.push(openMission('m-defer'));
  claimDelayMs = 300;

  const startedAt = Date.now();
  const res = await postInteraction(acceptClick('m-defer', 'user-defer'));
  const body = await res.json();
  const ackedAt = Date.now();

  assert.equal(res.status, 200);
  assert.equal(body.type, 6, 'DEFERRED_UPDATE_MESSAGE — not a type 4/7 built after the claim');
  assert.equal(claimResolvedAt, 0, 'the ack went out before the slow claim resolved');
  assert.ok(ackedAt - startedAt < 250, `ack took ${ackedAt - startedAt}ms — it waited on the 300ms claim`);

  await waitFor(() => originalEdits().length > 0);
});

test('a win rewrites the shared post via the interaction webhook and disables the button', async () => {
  resetHarness();
  fake.tables.missions.push(openMission('m-win'));

  const res = await postInteraction(acceptClick('m-win', 'user-win', { nick: 'Ayaka' }));
  assert.equal((await res.json()).type, 6);

  await waitFor(() => originalEdits().length > 0 && followups().length > 0);

  const edit = originalEdits()[0];
  assert.equal(edit.method, 'PATCH');
  assert.match(edit.url, /\/webhooks\/app-under-test\/token-\d+\/messages\/@original$/);
  assert.match(edit.payload.embeds[0].description, /^\*\*Ayaka\*\* has picked up the mission/);
  assert.equal(edit.payload.components[0].components[0].disabled, true, 'the Accept button is greyed out');

  const row = fake.tables.missions.find((r) => r.id === 'm-win');
  assert.equal(row.status, 'accepted');
  assert.equal(row.accepted_by, 'user-win');
});

test('the winner still gets the ephemeral pickup briefing as a followup', async () => {
  resetHarness();
  fake.tables.missions.push(openMission('m-brief'));

  await postInteraction(acceptClick('m-brief', 'user-brief'));
  await waitFor(() => followups().length > 0);

  const briefing = followups()[0];
  assert.equal(briefing.method, 'POST');
  assert.ok(!briefing.isOriginalEdit, 'a new followup, not an edit to the post');
  assert.equal(briefing.payload.flags, 64, 'ephemeral — only the clicker sees it');
  assert.match(briefing.payload.content, /MISSION BRIEFING|\/mission/);
});

test('a lost race disables the shared button and tells the clicker why', async () => {
  resetHarness();
  fake.tables.missions.push(openMission('m-race'));

  await postInteraction(acceptClick('m-race', 'user-first'));
  await waitFor(() => originalEdits().length === 1 && followups().length === 1);
  discordCalls.length = 0;

  const res = await postInteraction(acceptClick('m-race', 'user-second'));
  assert.equal((await res.json()).type, 6, 'still a deferred ack, even for a refusal');

  await waitFor(() => originalEdits().length > 0 && followups().length > 0);

  // The mission is already taken, so its post must stop taking clicks — the
  // button is disabled here too, not only on the win.
  const edit = originalEdits()[0];
  assert.equal(edit.method, 'PATCH');
  assert.match(edit.url, /\/messages\/@original$/);
  assert.equal(edit.payload.components[0].components[0].disabled, true);

  const refusal = followups()[0];
  assert.equal(refusal.method, 'POST');
  assert.equal(refusal.payload.flags, 64);
  assert.match(refusal.payload.content, /Someone got there first/);

  assert.equal(
    fake.tables.missions.find((r) => r.id === 'm-race').accepted_by,
    'user-first',
    'the first clicker keeps it',
  );
});

test('a busy/capped refusal leaves the still-open post and its live button alone', async () => {
  resetHarness();
  // user-cap already holds a mission — a second click is 'busy', and the board
  // request stays open for whoever clicks next.
  fake.tables.missions.push({
    ...openMission('m-held'),
    status: 'accepted',
    accepted_by: 'user-cap',
    accepted_at: new Date().toISOString(),
  });
  fake.tables.missions.push(openMission('m-open'));

  const res = await postInteraction(acceptClick('m-open', 'user-cap'));
  assert.equal((await res.json()).type, 6);

  await waitFor(() => followups().length > 0);

  assert.equal(originalEdits().length, 0, 'a still-open mission keeps its live button');
  assert.equal(followups()[0].payload.flags, 64);
  assert.equal(
    fake.tables.missions.find((r) => r.id === 'm-open').status,
    'open',
    'the request is still on the board',
  );
});

test('a post edit that fails flags the row for the reconcile sweep — the claim still stands', async () => {
  resetHarness();
  fake.tables.missions.push(openMission('m-flag'));
  failOriginalPatch = true;

  const res = await postInteraction(acceptClick('m-flag', 'user-flag'));
  assert.equal((await res.json()).type, 6);

  await waitFor(() => originalEdits().length > 0);
  // give app.js's catch (which awaits flagMissionPostForReconcile) a beat
  await waitFor(() => fake.tables.missions.find((r) => r.id === 'm-flag')?.post_reconcile_needed === true);

  const row = fake.tables.missions.find((r) => r.id === 'm-flag');
  assert.equal(row.status, 'accepted', 'the claim committed even though the post edit failed');
  assert.equal(row.post_reconcile_needed, true, 'the row is queued for reconcileMissionPosts');
});

test.after(() => {
  globalThis.fetch = originalFetch;
  server.close();
});
