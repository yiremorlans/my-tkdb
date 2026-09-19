// getRandomDialogueBeat (docs/dialogue-approach-pairing.md): draws a
// `dialogue[tier]` line and its `approach` button as one unit instead of two
// independent pools. This is the guarantee the whole migration rests on, and
// the one thing that makes migrating characters one at a time — some fully
// paired, some still legacy, some mixed within a single tier — safe: nothing
// here is keyed by anything other than the one character/tier being drawn.
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
      // Old shape: two independent flat pools, same as every unmigrated
      // character today. Must behave exactly as it did before beats existed.
      [LEGACY_ID]: {
        dialogue: { new: ['Legacy line A', 'Legacy line B'] },
        approach: { new: ['Legacy approach 1', 'Legacy approach 2'] },
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
      // One tier, mid-migration: one beat next to one still-bare string. The
      // bare string has to fall through to the legacy `approach` pool.
      [MIXED_ID]: {
        dialogue: {
          new: [
            { line: 'Migrated line', approach: 'Migrated approach' },
            'Unmigrated line',
          ],
        },
        approach: { new: ['Fallback approach'] },
      },
      // Variant-keyed pool (Jo's uniform/casual): each variant resolved
      // independently, so one can be paired while the other still isn't.
      [VARIANT_ID]: {
        dialogue: {
          new: {
            uniform: [{ line: 'Uniform line', approach: 'Uniform approach' }],
            casual: ['Casual line'],
          },
        },
        approach: { new: ['Casual fallback approach'] },
      },
      [EMPTY_ID]: {},
    },
    SHARED_APPROACH_WHEN: [],
    SHARED_DIALOGUE_WHEN: [],
  },
});

const { getRandomDialogueBeat, getRandomDialogueEntry } = await import('../constants/characters.js');

function times(n, fn) {
  return Array.from({ length: n }, fn);
}

test('a legacy (unmigrated) tier draws line and approach independently, exactly as before beats existed', () => {
  const character = { id: LEGACY_ID };
  const draws = times(40, () => getRandomDialogueBeat(character, 'new'));
  for (const { line, approach } of draws) {
    assert.ok(['Legacy line A', 'Legacy line B'].includes(line));
    assert.ok(['Legacy approach 1', 'Legacy approach 2'].includes(approach));
  }
  // Independent picks: given enough draws, every line should eventually
  // appear with more than one approach (never artificially pinned).
  const approachesForA = new Set(
    draws.filter((d) => d.line === 'Legacy line A').map((d) => d.approach),
  );
  assert.ok(approachesForA.size > 1, 'a legacy line is not tied to one approach');
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

test('a tier mid-migration: the paired entry always keeps its own approach, the unmigrated entry falls back to the legacy pool', () => {
  const character = { id: MIXED_ID };
  const draws = times(40, () => getRandomDialogueBeat(character, 'new'));
  for (const { line, approach } of draws) {
    if (line === 'Migrated line') assert.strictEqual(approach, 'Migrated approach');
    else if (line === 'Unmigrated line') assert.strictEqual(approach, 'Fallback approach');
    else assert.fail(`unexpected line: ${line}`);
  }
});

test('a variant-keyed tier resolves each variant on its own — one variant can be paired while the other is still legacy', () => {
  const character = { id: VARIANT_ID };
  const uniformDraws = times(20, () => getRandomDialogueBeat(character, 'new', 'uniform'));
  for (const { line, approach } of uniformDraws) {
    assert.strictEqual(line, 'Uniform line');
    assert.strictEqual(approach, 'Uniform approach');
  }
  const casualDraws = times(20, () => getRandomDialogueBeat(character, 'new', 'casual'));
  for (const { line, approach } of casualDraws) {
    assert.strictEqual(line, 'Casual line');
    assert.strictEqual(approach, 'Casual fallback approach');
  }
});

test('migrating one character to beats does not change what an unrelated, still-legacy character draws', () => {
  // Same assertions as the legacy test above, run after the paired/mixed/
  // variant characters have already been drawn from in this same process —
  // nothing is cached or shared across characters.
  const character = { id: LEGACY_ID };
  for (const { line, approach } of times(20, () => getRandomDialogueBeat(character, 'new'))) {
    assert.ok(['Legacy line A', 'Legacy line B'].includes(line));
    assert.ok(['Legacy approach 1', 'Legacy approach 2'].includes(approach));
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
