// Pure logic: affinity -> relationship level -> dialogue tier. No DB, no I/O.
import { test } from 'node:test';
import assert from 'node:assert';
import {
  getRelationshipLevel,
  getDialogueTier,
  getRelationshipProgress,
  renderProgressBar,
  renderAnsiProgressBar,
  RELATIONSHIP_LEVELS,
  PROGRESS_BAR_SEGMENTS,
  ANSI_BAR_SEGMENTS,
  ANSI_BAR_FILL,
  ANSI_BAR_TRACK,
  ANSI_COLORS,
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

test('renderProgressBar draws a fixed-width bar and never hits full before the next level', () => {
  assert.strictEqual(renderProgressBar(0).length, PROGRESS_BAR_SEGMENTS);
  assert.strictEqual(renderProgressBar(0), '░'.repeat(PROGRESS_BAR_SEGMENTS));
  assert.strictEqual(renderProgressBar(1), '█'.repeat(PROGRESS_BAR_SEGMENTS));
  assert.strictEqual(renderProgressBar(0.5), '█████░░░░░');
  // 0.99 of the way there must still show at least one empty segment.
  assert.ok(renderProgressBar(0.99).endsWith('░'));
});

test('every relationship level carries an embed color and an ANSI bar color', () => {
  const ansiValues = new Set(Object.values(ANSI_COLORS));
  for (const level of RELATIONSHIP_LEVELS) {
    assert.strictEqual(typeof level.color, 'number', `${level.name} needs an embed color`);
    assert.ok(ansiValues.has(level.ansi), `${level.name} needs a known ANSI color`);
  }
  // Stranger has no heart emoji, so it stays white.
  assert.strictEqual(getRelationshipLevel(0).ansi, ANSI_COLORS.white);
});

test('renderAnsiProgressBar wraps a full-width bar in an ansi code block', () => {
  const esc = String.fromCharCode(27);
  const half = ANSI_BAR_SEGMENTS / 2;
  const out = renderAnsiProgressBar(0.5, ANSI_COLORS.pink);
  assert.ok(out.startsWith('```ansi\n'), 'is a fenced ansi block');
  assert.ok(out.endsWith('\n```'));
  // Half solid █ painted pink (35), the rest a gray ▒ track (30) — a glyph
  // distinct from the fill so the boundary is readable, and the strip always
  // spans its full width.
  assert.ok(out.includes(`${esc}[1;35m${ANSI_BAR_FILL.repeat(half)}${esc}[0m`));
  assert.ok(out.includes(`${esc}[1;30m${ANSI_BAR_TRACK.repeat(half)}${esc}[0m`));
  assert.notStrictEqual(ANSI_BAR_FILL, ANSI_BAR_TRACK, 'fill and track glyphs differ');
});

test('a one-point affinity difference moves the bar by one segment at Stranger', () => {
  // Stranger spans 0..20 and the bar is 20 wide, so each point is one segment.
  const bar = (a) => {
    const { level, ratio } = getRelationshipProgress(a);
    return renderAnsiProgressBar(ratio, level.ansi);
  };
  const count = (s, glyph) => (s.match(new RegExp(glyph, 'g')) || []).length;
  assert.strictEqual(count(bar(3), ANSI_BAR_FILL), 3);
  assert.strictEqual(count(bar(4), ANSI_BAR_FILL), 4);
  assert.strictEqual(count(bar(5), ANSI_BAR_FILL), 5);
});

test('renderAnsiProgressBar fills the whole strip at ratio 1 with no track', () => {
  const esc = String.fromCharCode(27);
  const out = renderAnsiProgressBar(1, ANSI_COLORS.red);
  assert.ok(out.includes(`${esc}[1;31m${ANSI_BAR_FILL.repeat(ANSI_BAR_SEGMENTS)}${esc}[0m`));
  assert.ok(!out.includes(`[1;30m`), 'no track when full');
  assert.ok(!out.includes(ANSI_BAR_TRACK));
});

test('renderAnsiProgressBar shows a full track and no fill at ratio 0', () => {
  const esc = String.fromCharCode(27);
  const out = renderAnsiProgressBar(0, ANSI_COLORS.pink);
  assert.ok(out.includes(`${esc}[1;30m${ANSI_BAR_TRACK.repeat(ANSI_BAR_SEGMENTS)}${esc}[0m`));
  assert.ok(!out.includes(ANSI_BAR_FILL));
});

test('renderAnsiProgressBar falls back to white for a missing color', () => {
  const esc = String.fromCharCode(27);
  const out = renderAnsiProgressBar(1, undefined);
  assert.ok(out.includes(`${esc}[1;37m${ANSI_BAR_FILL.repeat(ANSI_BAR_SEGMENTS)}${esc}[0m`));
});
