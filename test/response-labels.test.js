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

// The chain is pinned by shape, not by the default strings themselves, so a
// copy edit to a fallback label doesn't break it.
test('a type the beat leaves out falls back by archetype, then to a generic default', () => {
  const labels = (character, beat) =>
    Object.values(RESPONSE_TYPES).map((type) => generateCharacterResponses(character, beat)[type].label);
  const kuudere = { id: 'no-such-character', archetype: ['Kuudere'] };
  const yandere = { id: 'no-such-character-2', archetype: ['Yandere'] };

  const generic = labels(NO_ARCHETYPE);
  const kuudereDefaults = labels(kuudere);
  const yandereDefaults = labels(yandere);
  for (const set of [generic, kuudereDefaults, yandereDefaults]) {
    for (const label of set) assert.ok(typeof label === 'string' && label.trim(), `empty label in ${set}`);
  }
  assert.notDeepStrictEqual(kuudereDefaults, generic, 'an archetype has its own defaults');
  assert.notDeepStrictEqual(kuudereDefaults, yandereDefaults, 'a different archetype yields a different set');

  // A beat that carries only `kind` keeps it, and the other types fall through
  // to that archetype's defaults.
  const partial = labels(kuudere, { kind: 'Kind (beat label)' });
  const kindAt = Object.values(RESPONSE_TYPES).indexOf(RESPONSE_TYPES.KIND);
  assert.strictEqual(partial[kindAt], 'Kind (beat label)');
  assert.deepStrictEqual(
    partial.filter((_, i) => i !== kindAt),
    kuudereDefaults.filter((_, i) => i !== kindAt),
  );
});
