// Pure logic: affinity -> relationship level -> dialogue tier. No DB, no I/O.
import { test } from 'node:test';
import assert from 'node:assert';
import {
  getRelationshipLevel,
  getDialogueTier,
  getRelationshipProgress,
  renderHeartBar,
  RELATIONSHIP_LEVELS,
  HEART_BAR_SEGMENTS,
  HEART_BAR_TRACK,
} from '../constants/game.js';

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

test('getRelationshipProgress reports the ratio between the current and next level', () => {
  // Friend is 50, Close Friend is 100 — 75 is exactly halfway.
  const { level, nextLevel, ratio } = getRelationshipProgress(75);
  assert.strictEqual(level.name, 'Friend');
  assert.strictEqual(nextLevel.name, 'Close Friend');
  assert.strictEqual(ratio, 0.5);
});

test('getRelationshipProgress clamps to 0 at the bottom of a band and for negative affinity', () => {
  assert.strictEqual(getRelationshipProgress(50).ratio, 0); // exactly on Friend
  assert.strictEqual(getRelationshipProgress(-100).ratio, 0);
  assert.strictEqual(getRelationshipProgress(-100).level.name, 'Stranger');
});

test('getRelationshipProgress has no next level and a full ratio at the top', () => {
  const { level, nextLevel, ratio } = getRelationshipProgress(100000);
  assert.strictEqual(level.name, 'Soulbound');
  assert.strictEqual(nextLevel, null);
  assert.strictEqual(ratio, 1);
});

test('getRelationshipProgress tolerates non-finite affinity', () => {
  assert.strictEqual(getRelationshipProgress(undefined).level.name, 'Stranger');
  assert.strictEqual(getRelationshipProgress(NaN).ratio, 0);
});

test('every relationship level carries an embed color and a bar heart', () => {
  for (const level of RELATIONSHIP_LEVELS) {
    assert.strictEqual(typeof level.color, 'number', `${level.name} needs an embed color`);
    assert.strictEqual(typeof level.heart, 'string', `${level.name} needs a bar heart`);
    assert.ok(level.heart.length > 0);
    assert.notStrictEqual(level.heart, HEART_BAR_TRACK, `${level.name} fill must differ from the track`);
  }
  // Stranger has no name emoji but still gets a purple heart for its bar.
  assert.strictEqual(getRelationshipLevel(0).heart, '💜');
});

test('renderHeartBar is a fixed-count row of emoji — no code block, no ANSI', () => {
  const out = renderHeartBar(0.5, '💖');
  assert.ok(!out.includes('```'), 'no fenced code block');
  assert.ok(!out.includes(String.fromCharCode(27)), 'no ANSI escape bytes');
  assert.strictEqual([...out].length, [...'💖'.repeat(HEART_BAR_SEGMENTS)].length);
});

test('renderHeartBar fills with the given heart and pads the rest with the track', () => {
  assert.strictEqual(renderHeartBar(0, '💖'), HEART_BAR_TRACK.repeat(HEART_BAR_SEGMENTS));
  assert.strictEqual(renderHeartBar(1, '💖'), '💖'.repeat(HEART_BAR_SEGMENTS));
  assert.strictEqual(
    renderHeartBar(0.5, '💖'),
    '💖'.repeat(HEART_BAR_SEGMENTS / 2) + HEART_BAR_TRACK.repeat(HEART_BAR_SEGMENTS / 2),
  );
});

test('renderHeartBar never shows a full row of fill hearts before the next level', () => {
  // 0.99 of the way there must still leave at least one track heart.
  assert.ok(renderHeartBar(0.99, '💖').endsWith(HEART_BAR_TRACK));
});

test('a 2-point affinity gain advances the Stranger bar by exactly one heart', () => {
  // Stranger spans 0..20 across 10 cells, so one cell == 2 points.
  const filled = (a) => {
    const { level, ratio } = getRelationshipProgress(a);
    const bar = renderHeartBar(ratio, level.heart);
    return [...bar].filter((ch) => ch !== HEART_BAR_TRACK).length;
  };
  assert.strictEqual(filled(0), 0);
  assert.strictEqual(filled(2), 1);
  assert.strictEqual(filled(4), 2);
  assert.strictEqual(filled(6), 3);
  assert.strictEqual(filled(18), 9);
});
