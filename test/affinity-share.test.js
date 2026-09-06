// /affinity is ephemeral, with a Share button that reposts the same status to
// the channel. Two layers are covered here: buildAffinityMessage's new
// `shareButton` / `sharedBy` options, and the `affinity:share` component route
// that greys the button out on click. The route half is driven at a real
// running app.js instance, signed the way Discord signs interactions (see
// meet-pick-route.test.js).
import { test, mock } from 'node:test';
import assert from 'node:assert';
import { createFakeSupabase } from './helpers/fakeSupabase.js';
import { generateDiscordKeyPair, signInteraction } from './helpers/discordSign.js';

const TEST_PORT = 38175; // distinct from the other route tests' ports
process.env.PORT = String(TEST_PORT);
process.env.SUPABASE_URL ??= 'http://fake.local';
process.env.SUPABASE_SERVICE_ROLE_KEY ??= 'fake-service-role-key';

const { keyPair, publicKeyHex } = await generateDiscordKeyPair();
process.env.PUBLIC_KEY = publicKeyHex;

const fake = createFakeSupabase({ character_relationships: [], command_limits: [] });
mock.module('@supabase/supabase-js', {
  namedExports: { createClient: () => fake.client },
});

const { buildAffinityMessage } = await import('../encounters.js');
const { server } = await import('../app.js');

function reset() {
  fake.tables.character_relationships = [];
  fake.calls.length = 0;
}

// --- buildAffinityMessage options -------------------------------------------

test('shareButton appends a Share button carrying the resolved character ids', async () => {
  reset();
  const message = await buildAffinityMessage('user-1', ['sho', 'ren'], { shareButton: true });
  const button = message.components[0].components[0];
  assert.strictEqual(button.label, 'Share');
  assert.strictEqual(button.custom_id, 'affinity:share:shohei.ren');
});

test('the Share custom_id stays within Discord\'s 100-char cap at the max of five characters', async () => {
  reset();
  const message = await buildAffinityMessage(
    'user-1',
    ['shohei', 'subaru', 'edward', 'benkei', 'taiga'],
    { shareButton: true },
  );
  assert.ok(message.components[0].components[0].custom_id.length <= 100);
});

test('without shareButton there is no components row (unchanged default)', async () => {
  reset();
  const message = await buildAffinityMessage('user-1', ['ren']);
  assert.strictEqual(message.components, undefined);
});

test('sharedBy makes it the public repost: attribution header, no Share button', async () => {
  reset();
  const message = await buildAffinityMessage('user-1', ['ren'], { sharedBy: 'Kanae', shareButton: true });
  assert.match(message.content, /^Kanae shared their relationship status:/);
  assert.ok(!/<@/.test(message.content), 'the sharer is named in plain text, not an @tag');
  assert.strictEqual(message.components, undefined);
  // mentions stay parsed off so a name that looks like a handle can't ping
  assert.deepStrictEqual(message.allowed_mentions, { parse: [] });
});

// --- affinity:share component route ----------------------------------------

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

test('clicking Share greys the button out on the private message (UPDATE_MESSAGE)', async () => {
  const res = await postInteraction({
    type: 3, // MESSAGE_COMPONENT
    data: { custom_id: 'affinity:share:leo.ren' },
    member: { user: { id: 'user-share-click' } },
    message: {
      components: [
        {
          type: 1,
          components: [
            { type: 2, style: 2, label: 'Share', custom_id: 'affinity:share:leo.ren' },
          ],
        },
      ],
    },
  });
  const body = await res.json();

  assert.strictEqual(res.status, 200);
  assert.strictEqual(body.type, 7); // UPDATE_MESSAGE
  assert.strictEqual(body.data.components[0].components[0].disabled, true);
});

test.after(() => {
  server.close();
});
