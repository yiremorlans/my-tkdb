// A warding card (docs/warding-cards.md) is the only message this app sends
// with Discord's Components V2 tree, and the only encounter whose content is
// one inlined dialogue beat rather than a draw from a pool. The rules that
// come with that are easy to break by accident from either side — a stray
// `content` field makes Discord reject the whole message, a NEUTRAL button
// creeping in changes the reward shape, an emoji in a painted `greeting`
// renders as an empty box — so they are pinned here.
import { test, mock } from 'node:test';
import assert from 'node:assert';

process.env.SUPABASE_URL ??= 'http://fake.local';
process.env.SUPABASE_SERVICE_ROLE_KEY ??= 'fake-service-role-key';

// Real compositing is exercised in silhouette-composition.test.js; the card
// render is checked above the canvas here.
mock.module('../imageComposition.js', {
  namedExports: {
    composeEncounter: async () => Buffer.from('png'),
    composeWardingCard: async () => Buffer.from('warding-png'),
  },
});

const {
  buildWardingDialogueMessage,
  buildWardingPickedUpdate,
  buildWardingResultMessage,
  buildWardingSpawnMessage,
  disableWardingButtons,
  WARDING_MESSAGE_FLAGS,
} = await import('../encounters.js');
const { WARDING_CARDS } = await import('../constants/warding/index.js');
const { RESPONSE_STYLES } = await import('../constants/game.js');

const CONTAINER = 17;
const TEXT_DISPLAY = 10;
const ACTION_ROW = 1;
const BUTTON = 2;

const writtenCards = Object.entries(WARDING_CARDS)
  .filter(([, card]) => Object.keys(card.responses ?? {}).length > 0)
  .map(([key, card]) => ({ key, ...card }));

// Every card is drawn the same way, so one is enough for shape assertions;
// the whole set is swept only where the data itself is the thing under test.
const sample = writtenCards[0];

function buttonsIn(components) {
  return (components ?? []).flatMap((component) =>
    component.type === BUTTON ? [component] : buttonsIn(component.components),
  );
}

test('a warding card is one inlined dialogue beat, never a pool', () => {
  for (const card of writtenCards) {
    assert.equal(typeof card.line, 'string', `${card.key}.line`);
    assert.equal(typeof card.approach, 'string', `${card.key}.approach`);
    assert.equal(typeof card.greeting, 'string', `${card.key}.greeting`);
    assert.ok(card.line.length > 0, `${card.key}.line is empty`);
    // The old shape, and the shape a copy-pasted /roam beat would bring.
    assert.equal(card.dialogue, undefined, `${card.key} still has dialogue`);
    assert.equal(card.choice, undefined, `${card.key} still has choice`);
    assert.deepEqual(
      Object.keys(card.responses),
      ['kind', 'playful', 'bold'],
      `${card.key} responses`,
    );
    for (const [key, response] of Object.entries(card.responses)) {
      assert.ok(response.label, `${card.key}.${key}.label`);
      assert.ok(response.close, `${card.key}.${key}.close`);
      // Colour comes from RESPONSE_STYLES, so a per-response style would be
      // a second source of truth that silently wins or silently does nothing.
      assert.equal(response.style, undefined, `${card.key}.${key}.style`);
      assert.ok(response.label.length <= 30, `${card.key}.${key}.label > 30`);
    }
    assert.ok(card.approach.length <= 30, `${card.key}.approach > 30`);
  }
});

test('a painted greeting carries nothing the canvas cannot draw', () => {
  // The dialogue box is DejaVu Sans on a canvas: no emoji glyphs (they paint
  // as empty boxes) and no markdown (asterisks paint literally — which is why
  // drawDialogueBox strips them, but authored greetings should not rely on
  // that). The sparkle lives on the approach button instead.
  const emoji = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/u;
  for (const card of writtenCards) {
    assert.ok(!emoji.test(card.greeting), `${card.key}.greeting has an emoji`);
    assert.ok(!emoji.test(card.line), `${card.key}.line has an emoji`);
  }
});

test('step 1 is V2 text with the sparkle approach button', () => {
  const message = buildWardingDialogueMessage(sample);

  // A V2 message must not carry content or embeds — Discord rejects it.
  assert.equal(message.content, undefined);
  assert.equal(message.embeds, undefined);
  assert.equal(message.flags, WARDING_MESSAGE_FLAGS);
  assert.ok(message.flags & 32768, 'IS_COMPONENTS_V2 not set');
  assert.ok(message.flags & 64, 'not ephemeral');

  assert.ok(
    !message.components.some((c) => c.type === CONTAINER),
    'buttons are wrapped in a container',
  );

  const [text] = message.components;
  assert.equal(text.type, TEXT_DISPLAY);
  assert.equal(text.content, sample.line);

  const [button] = buttonsIn(message.components);
  assert.equal(button.label, sample.approach);
  assert.equal(button.emoji.name, '✨');
  // The tell only works if it is not the colour a /roam approach button uses.
  assert.notEqual(button.style, 1);
  assert.match(button.custom_id, /^ward:spawn:/);
});

test('step 2 is a plain V1 message: the art plus exactly three response buttons', async () => {
  const step1 = buildWardingDialogueMessage(sample);
  const encounterId = buttonsIn(step1.components)[0].custom_id.split(':')[2];

  const message = await buildWardingSpawnMessage(encounterId);

  // The art message is NOT V2 — the flag can't be dropped once set, so the
  // image lives in a message that never carries it. Ephemeral, art as an
  // attachment, buttons directly under it, no V2 components anywhere.
  assert.ok(!(message.flags & 32768), 'IS_COMPONENTS_V2 set on the art message');
  assert.ok(message.flags & 64, 'not ephemeral');
  assert.equal(message.files.length, 1);
  assert.ok(
    message.components.every((c) => c.type === ACTION_ROW),
    'a non-row component is on the art message',
  );

  const buttons = buttonsIn(message.components);
  assert.equal(buttons.length, 3, 'a warding card offers exactly three picks');
  assert.deepEqual(
    buttons.map((b) => b.custom_id.split(':')[3]),
    ['kind', 'playful', 'bold'],
  );
  for (const button of buttons) {
    const key = button.custom_id.split(':')[3];
    assert.equal(button.label, sample.responses[key].label);
    assert.equal(button.style, RESPONSE_STYLES[key]);
    assert.ok(!button.disabled);
  }
});

test('step 3 is the close as its own plain V1 message, no art, no buttons', () => {
  const message = buildWardingResultMessage(sample.key, 'playful', '+2 — **Devoted**');

  assert.ok(message.content.startsWith(sample.responses.playful.close));
  assert.ok(message.content.includes('+2'));
  assert.equal(message.components, undefined);
  assert.equal(message.files, undefined);
  // V2 text renders smaller than `content`, so the close must stay V1.
  assert.ok(!(message.flags & 32768));
  assert.ok(message.flags & 64, 'not ephemeral');
});

test('the pick edits the art message down to just the art', () => {
  const update = buildWardingPickedUpdate();

  assert.deepEqual(update.components, []);
  // Left out so the uploaded card image stays, and not V2 so the art message
  // never picks the flag up.
  assert.equal(update.attachments, undefined);
  assert.ok(!(update.flags & 32768));
});

test('an unwritten stub is never drawn, and never rendered if asked for', async () => {
  const { eligibleWardingCards, WARDING_CARDS } = await import(
    '../constants/warding/index.js'
  );
  const { CHARACTERS } = await import('../constants/characters.js');

  // The soft-rollout gate: a stub is in WARDING_CARDS so coverage tooling can
  // see it, but it must never reach a player. Soulbound so no minLevel gate is
  // doing the filtering instead.
  for (const character of CHARACTERS) {
    for (const card of eligibleWardingCards(character.id, 'Soulbound')) {
      assert.ok(
        Object.keys(card.responses).length > 0,
        `${character.id} can draw the unwritten ${card.key}`,
      );
    }
  }

  // And a caller that skips the draw and names a stub by key gets null, NOT a
  // message. A "nothing here" message would read to the caller as a card
  // shown — costing the player the encounter and refilling pity for a card
  // that never rendered. Null is the signal to fall back to a normal
  // encounter and count the roll as a miss.
  const stub = Object.entries(WARDING_CARDS).find(
    ([, card]) => Object.keys(card.responses ?? {}).length === 0,
  );
  assert.ok(stub, 'expected at least one unwritten card in the set');
  assert.equal(buildWardingDialogueMessage({ key: stub[0], ...stub[1] }), null);
  assert.equal(buildWardingDialogueMessage(undefined), null);
});

test('an expired or unknown card falls back instead of throwing', async () => {
  const gone = await buildWardingSpawnMessage('roam_0_nope');
  assert.equal(gone.content, 'The moment has passed.');
  // The fallback is a plain V1 message, so it must NOT claim to be V2.
  assert.ok(!(gone.flags & 32768));

  const unknown = buildWardingResultMessage('NotACard', 'kind');
  assert.equal(unknown.content, 'The moment has passed.');
});

test('disableWardingButtons disables every button', () => {
  const message = buildWardingDialogueMessage(sample);
  const disabled = disableWardingButtons(message.components);

  assert.ok(buttonsIn(disabled).every((b) => b.disabled));
  // Non-destructive: the tree it was handed is untouched, since the ack and
  // the cached original are the same objects.
  assert.ok(!buttonsIn(message.components)[0].disabled);
});
