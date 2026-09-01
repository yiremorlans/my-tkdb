// Pure logic: affinity -> relationship level -> dialogue tier. No DB, no I/O.
import { test } from 'node:test';
import assert from 'node:assert';
import { getRelationshipLevel, getDialogueTier, RELATIONSHIP_LEVELS } from '../constants/game.js';

test('getRelationshipLevel returns Stranger below the first threshold', () => {
  assert.strictEqual(getRelationshipLevel(0).name, 'Stranger');
  assert.strictEqual(getRelationshipLevel(19).name, 'Stranger');
});

test('getRelationshipLevel is inclusive at each level boundary', () => {
  for (const level of RELATIONSHIP_LEVELS) {
    assert.strictEqual(
      getRelationshipLevel(level.min).name,
      level.name,
      `affinity ${level.min} should land exactly on "${level.name}"`,
    );
  }
});

test('getRelationshipLevel stays one level below just under a threshold', () => {
  // Friend starts at 50; one point under must still read Acquaintance, not Friend.
  assert.strictEqual(getRelationshipLevel(49).name, 'Acquaintance');
});

test('getRelationshipLevel never regresses below Stranger for negative affinity', () => {
  assert.strictEqual(getRelationshipLevel(-100).name, 'Stranger');
});

test('getRelationshipLevel reaches the top level at very high affinity', () => {
  assert.strictEqual(getRelationshipLevel(100000).name, 'Soulbound');
});

test('getDialogueTier maps every real relationship level to a known tier', () => {
  assert.strictEqual(getDialogueTier('Stranger'), 'new');
  assert.strictEqual(getDialogueTier('Acquaintance'), 'known');
  assert.strictEqual(getDialogueTier('Friend'), 'warm');
  assert.strictEqual(getDialogueTier('Close Friend'), 'spark');
  assert.strictEqual(getDialogueTier('Confidant'), 'close');
  assert.strictEqual(getDialogueTier('Devoted'), 'bound');
  assert.strictEqual(getDialogueTier('Soulbound'), 'bound');
});

test('getDialogueTier falls back to "new" for an unrecognized level name', () => {
  assert.strictEqual(getDialogueTier('Nonexistent Level'), 'new');
  assert.strictEqual(getDialogueTier(undefined), 'new');
});
