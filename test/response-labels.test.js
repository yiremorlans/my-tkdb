// generateCharacterResponses: authored dialogue-tier labels (shared register
// per RESPONSE_LABEL_TIER) take priority; a character with no authored label
// for a response type falls through to an archetype-keyed default, and
// finally to a generic default with no archetype at all. Mocks dialogue.js
// so the tier-sharing behavior (known/warm sharing "new"'s labels; spark
// having its own) is exercised deterministically, independent of any real
// character's authored content drifting over time.
import { test, mock } from 'node:test';
import assert from 'node:assert';

const WITH_CONTENT_ID = '__test_char_with_content__';

mock.module('../constants/dialogue.js', {
  namedExports: {
    DIALOGUE: {
      [WITH_CONTENT_ID]: {
        responses: {
          kind: { new: ['Kind (new-tier label)'], spark: ['Kind (spark-tier label)'] },
        },
      },
    },
    SHARED_APPROACH_WHEN: [],
    SHARED_DIALOGUE_WHEN: [],
  },
});

const { generateCharacterResponses, RESPONSE_TYPES } = await import('../constants/characters.js');

test('an authored label at "new" is also used for the "known" and "warm" tiers (shared register)', () => {
  const character = { id: WITH_CONTENT_ID, archetype: [] };
  assert.strictEqual(
    generateCharacterResponses(character, 'known')[RESPONSE_TYPES.KIND].label,
    'Kind (new-tier label)',
  );
  assert.strictEqual(
    generateCharacterResponses(character, 'warm')[RESPONSE_TYPES.KIND].label,
    'Kind (new-tier label)',
  );
});

test('the "spark" tier uses its own authored label, not the "new" one', () => {
  const character = { id: WITH_CONTENT_ID, archetype: [] };
  assert.strictEqual(
    generateCharacterResponses(character, 'spark')[RESPONSE_TYPES.KIND].label,
    'Kind (spark-tier label)',
  );
});

test('a character with no authored content at all falls back to archetype defaults', () => {
  const kuudere = { id: 'no-such-character', archetype: ['Kuudere'] };
  const responses = generateCharacterResponses(kuudere, 'new');
  assert.strictEqual(responses[RESPONSE_TYPES.KIND].label, 'Be honest with them');
  assert.strictEqual(responses[RESPONSE_TYPES.PLAYFUL].label, 'Exchange wit with them');
  assert.strictEqual(responses[RESPONSE_TYPES.BOLD].label, 'Make a bold move');
  assert.strictEqual(responses[RESPONSE_TYPES.NEUTRAL].label, 'Stay quiet');
});

test('a different archetype yields a different fallback set', () => {
  const yandere = { id: 'no-such-character-2', archetype: ['Yandere'] };
  const responses = generateCharacterResponses(yandere, 'new');
  assert.strictEqual(responses[RESPONSE_TYPES.PLAYFUL].label, 'Play their game');
  assert.strictEqual(responses[RESPONSE_TYPES.BOLD].label, 'Match their intensity');
  assert.strictEqual(responses[RESPONSE_TYPES.NEUTRAL].label, 'Observe them carefully');
});

test('a character with no archetype at all falls back to the generic defaults', () => {
  const generic = { id: 'no-such-character-3', archetype: [] };
  const responses = generateCharacterResponses(generic, 'new');
  assert.strictEqual(responses[RESPONSE_TYPES.KIND].label, 'Offer kind words');
  assert.strictEqual(responses[RESPONSE_TYPES.PLAYFUL].label, 'Crack a joke');
  assert.strictEqual(responses[RESPONSE_TYPES.BOLD].label, 'Flirt boldly');
  assert.strictEqual(responses[RESPONSE_TYPES.NEUTRAL].label, 'Stay silent');
});
