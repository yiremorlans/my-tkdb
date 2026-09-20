// getRandomDialogueBeat (docs/dialogue-approach-pairing.md): draws a
// `dialogue[tier]` line and its `approach` button as one unit instead of two
// independent pools. This is the guarantee the whole design rests on: a beat's
// own approach is the only source of its label. The layers that used to sit
// under it — the separate `approach` pools, `approachWhen`,
// SHARED_APPROACH_WHEN — are deleted, so all a bare string can reach now is
// APPROACH_LABEL_FALLBACK's generic label. No authored line is bare (see
// validateContent, which errors on one), but the picker still has to survive
// meeting one, which is what the bare-string cases below cover.
//
// Mocks dialogue.js with synthetic characters covering every shape the
// picker has to handle, independent of any real character's content drifting
// over time (same rationale as response-labels.test.js).
import { test, mock } from 'node:test';
import assert from 'node:assert';

const LEGACY_ID = '__test_legacy__';
const PAIRED_ID = '__test_paired__';
const ARRAY_APPROACH_ID = '__test_array_approach__';
const MIXED_ID = '__test_mixed__';
const VARIANT_ID = '__test_variant__';
const EMPTY_ID = '__test_empty__';

mock.module('../constants/dialogue.js', {
  namedExports: {
    DIALOGUE: {
      // Bare-string lines, no beats at all: nothing to carry an approach, so
      // the button comes from the generic fallback.
      [LEGACY_ID]: {
        dialogue: { new: ['Legacy line A', 'Legacy line B'] },
      },
      // New shape: every line is a beat, no separate `approach` pool at all.
      // A carries its own `responses` override; B carries none, so it must
      // fall through to null rather than borrow A's.
      [PAIRED_ID]: {
        dialogue: {
          new: [
            {
              line: 'Paired line A',
              approach: 'Approach for A',
              responses: { kind: 'Kind response for A' },
            },
            { line: 'Paired line B', approach: 'Approach for B' },
          ],
        },
      },
      // A beat's `approach` may be an array of interchangeable labels.
      [ARRAY_APPROACH_ID]: {
        dialogue: {
          new: [{ line: 'Only line', approach: ['Option 1', 'Option 2'] }],
        },
      },
      // One tier with a beat next to a bare string. The bare string has to
      // fall through to the generic label without disturbing its neighbor.
      [MIXED_ID]: {
        dialogue: {
          new: [
            { line: 'Migrated line', approach: 'Migrated approach' },
            'Unmigrated line',
          ],
        },
      },
      // Variant-keyed pool (Jo's uniform/casual): each variant resolved
      // independently, so one can be paired while the other isn't.
      [VARIANT_ID]: {
        dialogue: {
          new: {
            uniform: [{ line: 'Uniform line', approach: 'Uniform approach' }],
            casual: ['Casual line'],
          },
        },
      },
      [EMPTY_ID]: {},
    },
  },
});

const { getRandomDialogueBeat, getRandomDialogueEntry } = await import('../constants/characters.js');

function times(n, fn) {
  return Array.from({ length: n }, fn);
}

test('a bare-string line has no approach of its own, so it draws a non-empty generic label', () => {
  const character = { id: LEGACY_ID };
  for (const ctx of [{}, { locationKey: 'Nowhere' }, { now: new Date('2026-01-01T20:00:00') }]) {
    for (const { line, approach } of times(40, () => getRandomDialogueBeat(character, 'new', null, ctx))) {
      assert.ok(['Legacy line A', 'Legacy line B'].includes(line));
      assert.strictEqual(typeof approach, 'string');
      assert.ok(approach.length > 0);
    }
  }
});

test('a migrated tier never mismatches a line with another beat\'s approach', () => {
  const character = { id: PAIRED_ID };
  const draws = times(40, () => getRandomDialogueBeat(character, 'new'));
  for (const { line, approach } of draws) {
    if (line === 'Paired line A') assert.strictEqual(approach, 'Approach for A');
    else if (line === 'Paired line B') assert.strictEqual(approach, 'Approach for B');
    else assert.fail(`unexpected line: ${line}`);
  }
  // Both beats should actually get drawn over enough tries.
  assert.ok(draws.some((d) => d.line === 'Paired line A'));
  assert.ok(draws.some((d) => d.line === 'Paired line B'));
});

test('a beat\'s approach may be an array of interchangeable labels, and only those are drawn', () => {
  const character = { id: ARRAY_APPROACH_ID };
  const draws = times(40, () => getRandomDialogueBeat(character, 'new'));
  const seen = new Set(draws.map((d) => d.approach));
  for (const { line, approach } of draws) {
    assert.strictEqual(line, 'Only line');
    assert.ok(['Option 1', 'Option 2'].includes(approach));
  }
  assert.ok(seen.size > 1, 'both listed options should surface over enough draws');
});

test('a beat always keeps its own approach, even in a tier with bare-string lines', () => {
  const character = { id: MIXED_ID };
  for (const ctx of [{}, { locationKey: 'Nowhere' }]) {
    const draws = times(40, () => getRandomDialogueBeat(character, 'new', null, ctx));
    for (const { line, approach } of draws) {
      if (line === 'Migrated line') assert.strictEqual(approach, 'Migrated approach');
      else if (line === 'Unmigrated line') assert.ok(approach.length > 0);
      else assert.fail(`unexpected line: ${line}`);
    }
    assert.ok(draws.some((d) => d.line === 'Migrated line'));
  }
});

test('a variant-keyed tier resolves each variant on its own — one variant can be paired while the other has bare-string lines', () => {
  const character = { id: VARIANT_ID };
  const uniformDraws = times(20, () => getRandomDialogueBeat(character, 'new', 'uniform'));
  for (const { line, approach } of uniformDraws) {
    assert.strictEqual(line, 'Uniform line');
    assert.strictEqual(approach, 'Uniform approach');
  }
  const casualDraws = times(20, () => getRandomDialogueBeat(character, 'new', 'casual'));
  for (const { line, approach } of casualDraws) {
    assert.strictEqual(line, 'Casual line');
    assert.ok(approach.length > 0);
    assert.notStrictEqual(approach, 'Uniform approach');
  }
});

test('getRandomDialogueEntry (used by /meet, which has no approach button) unwraps a migrated beat to its line — never "[object Object]"', () => {
  const character = { id: PAIRED_ID };
  for (const { line } of times(20, () => getRandomDialogueEntry(character, 'new'))) {
    assert.strictEqual(typeof line, 'string');
    assert.ok(['Paired line A', 'Paired line B'].includes(line));
  }
});

test('getRandomDialogueEntry returns `responses` from the exact same pick as `line` — never a second, independent draw', () => {
  const character = { id: PAIRED_ID };
  for (const { line, responses } of times(40, () => getRandomDialogueEntry(character, 'new'))) {
    if (line === 'Paired line A') {
      assert.deepStrictEqual(responses, { kind: 'Kind response for A' });
    } else {
      assert.strictEqual(line, 'Paired line B');
      assert.strictEqual(responses, null);
    }
  }
});

test('a character with no dialogue content at all still returns a usable beat instead of throwing', () => {
  const character = { id: EMPTY_ID };
  const { line, approach } = getRandomDialogueBeat(character, 'new');
  assert.strictEqual(line, '...');
  assert.strictEqual(typeof approach, 'string');
  assert.ok(approach.length > 0);
});

test('an unknown character id falls back the same way for both the line and the approach', () => {
  const character = { id: 'no-such-character' };
  const { line, approach } = getRandomDialogueBeat(character, 'new');
  assert.strictEqual(line, '...');
  assert.ok(approach.length > 0);
});
