// The /call reveal line. Two things matter and are easy to break silently:
//
//   1. A character with authored `winnerLines` must never draw a generic line
//      — the whole point of authoring them per character is that the reveal
//      sounds like that character.
//   2. Every line must survive the fill: the embed's winner line is the only
//      place the reveal names the winner or the character (the message content
//      is cleared, and the milestone afterline names neither), so a line that
//      loses one leaves a public message with a hole in it.
//
// The teaser/missed pools are time-keyed for the same reason the dialogue is —
// shadows are an evening register — so they get a draw-at-every-hour check.
import { test } from 'node:test';
import assert from 'node:assert';
import {
  SHARED_ENCOUNTER_TEASERS,
  SHARED_MISSED_LINES,
  SHARED_WINNER_LINES,
} from '../constants/dialogue.js';
import {
  WINNER_LINE_BUCKETS,
  fillTemplate,
  pickMissedLine,
  pickTeaser,
  pickWinnerLine,
  winnerLineBucket,
  winnerLinePool,
} from '../constants/publicEncounters.js';
import { CHARACTERS, getFullName } from '../constants/characters.js';

const DIALOGUE_TIERS = ['new', 'known', 'warm', 'spark', 'close', 'bound'];
const NOON = new Date('2026-09-02T12:00:00');
const NIGHT = new Date('2026-09-02T22:00:00');

const vars = (character) => ({
  user: '<@user-1>',
  name: getFullName(character),
  firstName: character.firstName,
  house: character.house || 'Darkwick',
});

test('every character has a non-empty pool at every register', () => {
  for (const character of CHARACTERS) {
    for (const bucket of WINNER_LINE_BUCKETS) {
      const pool = winnerLinePool(bucket, character.id);
      assert.ok(pool.length > 0, `${character.id}.${bucket} draws from nothing`);
    }
  }
});

test('an authored character never draws a shared line', () => {
  const shared = new Set(Object.values(SHARED_WINNER_LINES).flat());
  for (const character of CHARACTERS) {
    for (const bucket of WINNER_LINE_BUCKETS) {
      for (const line of winnerLinePool(bucket, character.id)) {
        assert.ok(
          !shared.has(line),
          `${character.id}.${bucket} fell back to the shared pool: "${line}"`,
        );
      }
    }
  }
});

test('a character with no authored lines falls back to the shared pool', () => {
  // The fallback path is unreachable through CHARACTERS today (all 26 are
  // authored at all five registers), so it is exercised through an id that
  // matches nobody — which is also what a roster addition looks like before
  // its lines are written.
  for (const bucket of WINNER_LINE_BUCKETS) {
    const pool = winnerLinePool(bucket, 'not-a-character');
    assert.deepStrictEqual(
      pool,
      [...SHARED_WINNER_LINES.any, ...SHARED_WINNER_LINES[bucket]],
      `${bucket} did not fall back`,
    );
  }
});

test('every line names the winner and the character once filled', () => {
  for (const character of CHARACTERS) {
    const filled = vars(character);
    for (const bucket of WINNER_LINE_BUCKETS) {
      for (const line of winnerLinePool(bucket, character.id)) {
        const out = fillTemplate(line, filled);
        assert.ok(out.includes(filled.user), `${character.id}.${bucket} lost the mention: "${line}"`);
        assert.ok(
          out.includes(filled.name) || out.includes(filled.firstName),
          `${character.id}.${bucket} lost the name: "${line}"`,
        );
        assert.ok(!/[{}]/.test(out), `${character.id}.${bucket} left a placeholder unfilled: "${out}"`);
      }
    }
  }
});

test('"known" collapses onto "new"; every other tier maps to itself', () => {
  assert.equal(winnerLineBucket('known'), 'new');
  for (const bucket of WINNER_LINE_BUCKETS) {
    assert.equal(winnerLineBucket(bucket), bucket);
  }
  // An unrecognized tier must not produce an empty pool.
  assert.equal(winnerLineBucket('nonsense'), 'new');
});

test('pickWinnerLine returns a filled line for every character at every tier', () => {
  for (const character of CHARACTERS) {
    for (const tier of DIALOGUE_TIERS) {
      const line = pickWinnerLine(tier, vars(character), character.id);
      assert.ok(line.length > 0 && !/[{}]/.test(line), `${character.id}/${tier}: "${line}"`);
    }
  }
});

test('teasers and missed lines draw something at any hour, and split day from evening', () => {
  for (const now of [NOON, NIGHT]) {
    assert.ok(pickTeaser(now).length > 0);
    assert.ok(pickMissedLine(now).length > 0);
  }

  // The evening-only pools must not be reachable during the day: the whole
  // point of the split is that "half in shadow" is an evening line.
  for (const pools of [SHARED_ENCOUNTER_TEASERS, SHARED_MISSED_LINES]) {
    const evening = new Set(pools.evening);
    const shared = pools.any.filter((line) => evening.has(line));
    assert.deepStrictEqual(shared, [], 'an evening line is also in the any pool');
    assert.ok(pools.day.length > 0 && pools.evening.length > 0);
  }
});
