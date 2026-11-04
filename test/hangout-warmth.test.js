// Warmth (docs/hangout-activity.md §12.7): a /meet answer arrives through
// Hangout.react as answerLove/answerLike/answerFlat and counts as that
// answer, never as a touch, so a flat answer can't warm him.
import { test } from 'node:test';
import assert from 'node:assert';

import { Warmth, WARMTH_PROFILES, attachWarmth } from '../activity/src/hangout-v2/warmth.js';

const { gains } = WARMTH_PROFILES.hangout;

test('love and like answers count as fave and liked, not as touches', () => {
  const w = new Warmth('date', 'close');
  const date = WARMTH_PROFILES.date.gains;
  w.reaction('answerLove');
  assert.strictEqual(w.target, 0.2 + date.fave);
  w.reaction('answerLike');
  assert.strictEqual(w.target, 0.2 + date.fave + date.liked);
});

test('a /meet answer never warms him: blush is earned by touches and holds', () => {
  const w = new Warmth('hangout', 'close');
  for (const name of ['answerLove', 'answerLike', 'answerFlat']) w.reaction(name);
  assert.strictEqual(w.target, 0);
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
  scene.hangout.react('headPat', 0);
  assert.deepStrictEqual(reacted, ['headPat']);
  assert.strictEqual(w.target, gains.touch);
  scene.frame(0, 1);
  assert.strictEqual(drawn.length, 1);
  assert.ok(drawn[0] > 0);
});
