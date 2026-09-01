// getReactionLine: the one-liner under a scored dialogue response. Keyed on
// relationship register (early/mid/deep, collapsed from the dialogue tier) and
// outcome (love/like/neutral/flat, from the response type + affinity gain).
// Shared by the whole roster, so the only per-character bit is the {name} fill.
import { test } from 'node:test';
import assert from 'node:assert';
import {
  REACTION_LINES,
  REGISTER_BY_TIER,
  getReactionLine,
} from '../constants/reactions.js';
import { RESPONSE_TYPES, getCharacterById, getFullName } from '../constants/characters.js';

const REGISTERS = ['early', 'mid', 'deep'];
const OUTCOMES = ['love', 'like', 'neutral', 'flat'];
const char = getCharacterById('taiga');
const name = getFullName(char);

test('every register has a non-empty pool for every outcome', () => {
  for (const register of REGISTERS) {
    for (const outcome of OUTCOMES) {
      const pool = REACTION_LINES[register]?.[outcome];
      assert.ok(Array.isArray(pool) && pool.length > 0, `${register}.${outcome} is empty`);
    }
  }
});

test('every dialogue tier maps to a real register', () => {
  for (const [tier, register] of Object.entries(REGISTER_BY_TIER)) {
    assert.ok(REACTION_LINES[register], `tier "${tier}" maps to unknown register "${register}"`);
  }
});

test('getReactionLine substitutes {name} and leaves no placeholder behind', () => {
  for (const tier of Object.keys(REGISTER_BY_TIER)) {
    for (const [type, gain] of [
      [RESPONSE_TYPES.KIND, 2],
      [RESPONSE_TYPES.KIND, 1],
      [RESPONSE_TYPES.KIND, 0],
      [RESPONSE_TYPES.NEUTRAL, 0],
    ]) {
      for (let i = 0; i < 40; i++) {
        const line = getReactionLine(char, tier, type, gain);
        assert.ok(typeof line === 'string' && line.length > 0);
        assert.doesNotMatch(line, /\{name\}/, `unsubstituted placeholder in: ${line}`);
      }
    }
  }
});

test('gain picks the outcome: 2 -> love, 1 -> like, 0 -> flat (non-neutral)', () => {
  const strip = (line) => line.replaceAll(name, '{name}');
  const inPool = (line, tier, outcome) =>
    REACTION_LINES[REGISTER_BY_TIER[tier]][outcome].includes(strip(line));

  for (let i = 0; i < 60; i++) {
    assert.ok(inPool(getReactionLine(char, 'new', RESPONSE_TYPES.BOLD, 2), 'new', 'love'));
    assert.ok(inPool(getReactionLine(char, 'new', RESPONSE_TYPES.BOLD, 1), 'new', 'like'));
    assert.ok(inPool(getReactionLine(char, 'new', RESPONSE_TYPES.BOLD, 0), 'new', 'flat'));
  }
});

test('a NEUTRAL response always draws from the neutral pool, whatever the gain', () => {
  const strip = (line) => line.replaceAll(name, '{name}');
  for (let i = 0; i < 60; i++) {
    const line = getReactionLine(char, 'spark', RESPONSE_TYPES.NEUTRAL, 0);
    assert.ok(REACTION_LINES.mid.neutral.includes(strip(line)), line);
  }
});

test('the register escalates with the relationship tier', () => {
  const strip = (line) => line.replaceAll(name, '{name}');
  const from = (tier) => strip(getReactionLine(char, tier, RESPONSE_TYPES.KIND, 2));

  for (let i = 0; i < 60; i++) {
    assert.ok(REACTION_LINES.early.love.includes(from('new')));
    assert.ok(REACTION_LINES.mid.love.includes(from('warm')));
    assert.ok(REACTION_LINES.deep.love.includes(from('bound')));
  }
});

test('an unknown tier falls back to the early register rather than throwing', () => {
  const strip = (line) => line.replaceAll(name, '{name}');
  const line = getReactionLine(char, undefined, RESPONSE_TYPES.KIND, 1);
  assert.ok(REACTION_LINES.early.like.includes(strip(line)));
});
