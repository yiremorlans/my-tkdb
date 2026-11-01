// Warmth (docs/hangout-activity.md §12.7): a /meet answer arrives through
// Hangout.react as answerLove/answerLike/answerFlat and counts as that
// answer, never as a touch, so a flat answer can't warm him.
import { test } from 'node:test';
import assert from 'node:assert';

import { Warmth, WARMTH_PROFILES, attachWarmth } from '../activity/src/hangout-v2/warmth.js';

const { gains } = WARMTH_PROFILES.hangout;

test('a flat answer leaves warmth where it was', () => {
  const w = new Warmth('hangout', 'close');
  w.reaction('answerFlat');
  assert.strictEqual(w.target, 0);
});

test('love and like answers count as fave and liked, not as touches', () => {
  const w = new Warmth('hangout', 'close');
  w.reaction('answerLove');
  assert.strictEqual(w.target, gains.fave);
  w.reaction('answerLike');
  assert.strictEqual(w.target, gains.fave + gains.liked);
});

test('a touch reaction adds the touch gain; upset clears it', () => {
  const w = new Warmth('hangout', 'spark');
  w.reaction('pat');
  assert.strictEqual(w.target, gains.touch);
  w.reaction('upset');
  assert.strictEqual(w.target, 0);
});

test('ordinary Hangout warmth runs from spark up only', () => {
  for (const tier of ['new', 'known', 'warm']) assert.strictEqual(new Warmth('hangout', tier).on, false);
  for (const tier of ['spark', 'close', 'bound']) assert.strictEqual(new Warmth('hangout', tier).on, true);
});

test('attachWarmth feeds reactions and draws warmth each frame', () => {
  const drawn = [];
  const reacted = [];
  const scene = {
    hangout: { tier: 'close', react: (name) => reacted.push(name) },
    renderer: { setWarmth: (v) => drawn.push(v) },
    frame: () => {},
  };
  const w = attachWarmth(scene, 'hangout');
  scene.hangout.react('answerLove', 0);
  assert.deepStrictEqual(reacted, ['answerLove']);
  assert.strictEqual(w.target, gains.fave);
  scene.frame(0, 1);
  assert.strictEqual(drawn.length, 1);
  assert.ok(drawn[0] > 0);
});

test('attachWarmth skips a renderer without warmth (v1)', () => {
  const scene = { hangout: { tier: 'close', react() {} }, renderer: {}, frame() {} };
  assert.strictEqual(attachWarmth(scene, 'hangout'), null);
});
