// generateCharacterResponses: the drawn beat's own labels are the only
// character-specific source there is; a response type the beat doesn't carry
// falls through to an archetype-keyed default, and finally to a generic
// default with no archetype at all.
//
// There used to be a third layer between those two — a character-level
// `responses` pool drawn per label tier, independently of the line — and the
// tier-sharing rules that went with it (known/warm sharing "new"'s labels).
// Beat-level labels replaced it.
import { test } from 'node:test';
import assert from 'node:assert';
import { generateCharacterResponses, RESPONSE_TYPES } from '../constants/characters.js';

const NO_ARCHETYPE = { id: '__test_char__', archetype: [] };

test("a beat's own label is used for that response type", () => {
  const responses = generateCharacterResponses(NO_ARCHETYPE, {
    kind: 'Kind (beat label)',
  });
  assert.strictEqual(responses[RESPONSE_TYPES.KIND].label, 'Kind (beat label)');
});

test("a beat offering several interchangeable labels draws one of them", () => {
  const options = ['Tease him back', 'Play along', 'Call his bluff'];
  const drawn = new Set();
  for (let i = 0; i < 60; i += 1) {
    drawn.add(
      generateCharacterResponses(NO_ARCHETYPE, { playful: options })[RESPONSE_TYPES.PLAYFUL].label,
    );
  }
  assert.deepStrictEqual([...drawn].sort(), [...options].sort());
});

test("a response type the beat leaves out falls through to the archetype default", () => {
  const kuudere = { id: '__test_char_2__', archetype: ['Kuudere'] };
  const responses = generateCharacterResponses(kuudere, { kind: 'Kind (beat label)' });
  assert.strictEqual(responses[RESPONSE_TYPES.KIND].label, 'Kind (beat label)');
  assert.strictEqual(responses[RESPONSE_TYPES.PLAYFUL].label, 'Exchange wit with them');
  assert.strictEqual(responses[RESPONSE_TYPES.BOLD].label, 'Make a bold move');
  assert.strictEqual(responses[RESPONSE_TYPES.NEUTRAL].label, 'Stay quiet');
});

test('a character drawn with no beat at all falls back to archetype defaults', () => {
  const kuudere = { id: 'no-such-character', archetype: ['Kuudere'] };
  const responses = generateCharacterResponses(kuudere);
  assert.strictEqual(responses[RESPONSE_TYPES.KIND].label, 'Be honest with them');
  assert.strictEqual(responses[RESPONSE_TYPES.PLAYFUL].label, 'Exchange wit with them');
  assert.strictEqual(responses[RESPONSE_TYPES.BOLD].label, 'Make a bold move');
  assert.strictEqual(responses[RESPONSE_TYPES.NEUTRAL].label, 'Stay quiet');
});

test('a different archetype yields a different fallback set', () => {
  const yandere = { id: 'no-such-character-2', archetype: ['Yandere'] };
  const responses = generateCharacterResponses(yandere);
  assert.strictEqual(responses[RESPONSE_TYPES.PLAYFUL].label, 'Play their game');
  assert.strictEqual(responses[RESPONSE_TYPES.BOLD].label, 'Match their intensity');
  assert.strictEqual(responses[RESPONSE_TYPES.NEUTRAL].label, 'Observe them carefully');
});

test('a character with no archetype at all falls back to the generic defaults', () => {
  const responses = generateCharacterResponses(NO_ARCHETYPE);
  assert.strictEqual(responses[RESPONSE_TYPES.KIND].label, 'Offer kind words');
  assert.strictEqual(responses[RESPONSE_TYPES.PLAYFUL].label, 'Crack a joke');
  assert.strictEqual(responses[RESPONSE_TYPES.BOLD].label, 'Flirt boldly');
  assert.strictEqual(responses[RESPONSE_TYPES.NEUTRAL].label, 'Stay silent');
});
