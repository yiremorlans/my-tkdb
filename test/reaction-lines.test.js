// getReactionLine: the one-liner under a scored dialogue response. Keyed on the
// response type the player picked (kind/playful/bold/neutral), relationship
// register (early/mid/deep, collapsed from the dialogue tier) and, for the three
// scored types, outcome (love/like/flat, from the affinity gain). Shared by the
// whole roster: no name, no dialogue, just a short sentiment.
import { test } from 'node:test';
import assert from 'node:assert';
import {
  REACTION_LINES,
  REGISTER_BY_TIER,
  getReactionLine,
} from '../constants/reactions.js';
import { RESPONSE_TYPES, getCharacterById } from '../constants/characters.js';

const SCORED_TYPES = [RESPONSE_TYPES.KIND, RESPONSE_TYPES.PLAYFUL, RESPONSE_TYPES.BOLD];
const REGISTERS = ['early', 'mid', 'deep'];
const OUTCOMES = ['love', 'like', 'flat'];
const char = getCharacterById('taiga');

function allPools() {
  const pools = [];
  for (const type of SCORED_TYPES) {
    for (const register of REGISTERS) {
      for (const outcome of OUTCOMES) {
        pools.push([`${type}.${register}.${outcome}`, REACTION_LINES[type]?.[register]?.[outcome]]);
      }
    }
  }
  for (const register of REGISTERS) {
    pools.push([`neutral.${register}`, REACTION_LINES.neutral?.[register]]);
  }
  return pools;
}

test('every type has a non-empty pool for every register and outcome', () => {
  for (const [slot, pool] of allPools()) {
    assert.ok(Array.isArray(pool) && pool.length > 0, `${slot} is empty`);
  }
});

// Sized by draw frequency (see the reactions.js header): favourite-type `love`
// pools are biggest, rarely drawn slots smallest, neutral small.
const POOL_SIZES = {
  kind: { love: 12, like: 4, flat: 3 },
  playful: { love: 10, like: 6, flat: 4 },
  bold: { love: 10, like: 3, flat: 6 },
  neutral: 4,
};

test('each pool holds its intended number of lines in every register', () => {
  for (const register of REGISTERS) {
    for (const type of SCORED_TYPES) {
      for (const outcome of OUTCOMES) {
        assert.strictEqual(
          REACTION_LINES[type][register][outcome].length,
          POOL_SIZES[type][outcome],
          `${type}.${register}.${outcome}`,
        );
      }
    }
    assert.strictEqual(REACTION_LINES.neutral[register].length, POOL_SIZES.neutral, `neutral.${register}`);
  }
});

test('every dialogue tier maps to a real register', () => {
  for (const [tier, register] of Object.entries(REGISTER_BY_TIER)) {
    for (const type of SCORED_TYPES) {
      assert.ok(REACTION_LINES[type][register], `tier "${tier}" has no ${type}.${register}`);
    }
    assert.ok(REACTION_LINES.neutral[register], `tier "${tier}" has no neutral.${register}`);
  }
});

const MAX_WORDS = 9;

test('lines are short and carry no name placeholder, quoted dialogue, or em dash', () => {
  for (const [slot, pool] of allPools()) {
    for (const line of pool) {
      assert.doesNotMatch(line, /\{name\}/, `placeholder in ${slot}: ${line}`);
      assert.doesNotMatch(line, /["“”]/, `dialogue in ${slot}: ${line}`);
      assert.doesNotMatch(line, /—/, `em dash in ${slot}: ${line}`);
      assert.ok(line.split(/\s+/).length <= MAX_WORDS, `over ${MAX_WORDS} words in ${slot}: ${line}`);
    }
  }
});

test('no line appears in more than one slot', () => {
  const seen = new Map();
  for (const [slot, pool] of allPools()) {
    for (const line of pool) {
      assert.ok(!seen.has(line), `"${line}" is in both ${seen.get(line)} and ${slot}`);
      seen.set(line, slot);
    }
  }
});

test('the picked type and gain choose the pool: 2 -> love, 1 -> like, 0 -> flat', () => {
  for (const type of SCORED_TYPES) {
    for (let i = 0; i < 30; i++) {
      assert.ok(REACTION_LINES[type].early.love.includes(getReactionLine(char, 'new', type, 2)));
      assert.ok(REACTION_LINES[type].early.like.includes(getReactionLine(char, 'new', type, 1)));
      assert.ok(REACTION_LINES[type].early.flat.includes(getReactionLine(char, 'new', type, 0)));
    }
  }
});

test('a NEUTRAL response always draws from the neutral pool, whatever the gain', () => {
  for (let i = 0; i < 60; i++) {
    const line = getReactionLine(char, 'spark', RESPONSE_TYPES.NEUTRAL, 0);
    assert.ok(REACTION_LINES.neutral.mid.includes(line), line);
  }
});

test('the register escalates with the relationship tier', () => {
  const from = (tier) => getReactionLine(char, tier, RESPONSE_TYPES.KIND, 2);

  for (let i = 0; i < 60; i++) {
    assert.ok(REACTION_LINES.kind.early.love.includes(from('new')));
    assert.ok(REACTION_LINES.kind.mid.love.includes(from('warm')));
    assert.ok(REACTION_LINES.kind.deep.love.includes(from('bound')));
  }
});

test('an unknown tier falls back to the early register rather than throwing', () => {
  const line = getReactionLine(char, undefined, RESPONSE_TYPES.KIND, 1);
  assert.ok(REACTION_LINES.kind.early.like.includes(line));
});

test('an unknown response type falls back to the neutral pool rather than throwing', () => {
  const line = getReactionLine(char, 'warm', 'mystery', 1);
  assert.ok(REACTION_LINES.neutral.mid.includes(line));
});
