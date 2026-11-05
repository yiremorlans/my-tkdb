// The shared Hangout engine (activity/src/hangout/*) that the Live2D
// Hangout builds on: the annoyance meter, reactions by tier and their
// sounds, restMood, outfit switching and touch-line holds. See
// docs/hangout-activity.md §9.
import { test } from 'node:test';
import assert from 'node:assert';

import { AnnoyanceMeter } from '../activity/src/hangout/annoyance.js';
import { AFTER_LINE_HOLD, AFTER_LINE_SETTLE, Hangout, LINE_HOLD, SOUND_COOLDOWN, TYPE_MS, typeDuration } from '../activity/src/hangout/hangout.js';
import { DEFAULT_REACTIONS, forTier, resolveReaction } from '../activity/src/hangout/reactions.js';

function rig(overrides = {}) {
  return {
    character: 'test',
    reference: { width: 100, height: 200 },
    scale: 1,
    parts: [
      { id: 'root', parent: null, position: [50, 100] },
      { id: 'torso', parent: 'root', position: [0, -20], image: 'parts/torso.png', z: 10 },
      { id: 'head', parent: 'torso', position: [0, -40], image: 'parts/head.png', z: 20 },
    ],
    ...overrides,
  };
}

test('the annoyance meter trips, ignores taps while recovering, then settles', () => {
  // Three quick taps reach 1 + 0.9 + 0.9 = 2.8, past the 2.5 threshold.
  const meter = new AnnoyanceMeter({ perTap: 1, decayPerSec: 1, threshold: 2.5, recoverSec: 2 });
  assert.strictEqual(meter.tap(0), 'ok');
  assert.strictEqual(meter.tap(0.1), 'ok');
  assert.strictEqual(meter.tap(0.2), 'upset');
  assert.strictEqual(meter.tap(1), 'ignored');
  assert.strictEqual(meter.tap(2.5), 'ok');
  // Slow taps decay away and never trip it.
  for (let t = 10; t < 30; t += 1.5) assert.strictEqual(meter.tap(t), 'ok');
});

test('a weighted tap adds its share of the threshold', () => {
  const meter = new AnnoyanceMeter({ perTap: 1, decayPerSec: 0.9, threshold: 5, recoverSec: 4 });
  assert.strictEqual(meter.tap(0, 0.75), 'ok');
  assert.strictEqual(meter.tap(2, 0.75), 'upset');
});

test('a head pat smiles, then blushes, then returns to the resting mood', () => {
  const r = rig({
    hotspots: {},
    expressions: { head: 'head', moods: { default: {}, smile: {}, smile_blush: {} } },
    reactions: { headPat: { mood: 'smile', then: [0.4, 'smile_blush'], duration: 2 } },
  });
  const renderer = {
    rig: r,
    moodName: 'default',
    handPose: {},
    setMood(name) { this.moodName = name; },
    update() {},
  };
  const motion = { blinking: () => false, pose: () => ({}) };
  const hangout = new Hangout({ renderer, motion });
  hangout.react('headPat', 10);
  assert.strictEqual(renderer.moodName, 'smile');
  hangout.frame(10.2, 0.2);
  assert.strictEqual(renderer.moodName, 'smile');
  hangout.frame(10.5, 0.3);
  assert.strictEqual(renderer.moodName, 'smile_blush');
  hangout.frame(12.1, 1.6);
  assert.strictEqual(renderer.moodName, 'default');
});

test('then: ["line", mood] waits for the line to type out', () => {
  const r = rig({
    hotspots: {},
    expressions: { head: 'head', moods: { default: {}, sultry: {}, leer: {} } },
    reactions: { headPat: { mood: 'sultry', then: ['line', 'leer'], duration: 1 } },
  });
  const renderer = { rig: r, moodName: 'default', handPose: {}, setMood(name) { this.moodName = name; }, update() {} };
  const motion = { blinking: () => false, pose: () => ({}) };
  const line = 'Quit squirming. You started this.';
  const hangout = new Hangout({ renderer, motion, lines: { headPat: [line] }, random: () => 0 });
  hangout.react('headPat', 10);
  const typed = 10 + typeDuration(line) / 1000;
  hangout.frame(typed - 0.05, 0.1);
  assert.strictEqual(renderer.moodName, 'sultry');
  hangout.frame(typed + AFTER_LINE_SETTLE + 0.01, 0.1);
  assert.strictEqual(renderer.moodName, 'leer');
  hangout.frame(typed + AFTER_LINE_SETTLE + AFTER_LINE_HOLD - 0.05, 0.1);
  assert.strictEqual(renderer.moodName, 'leer');
});

test('restMood picks the resting mood by tier', () => {
  const r = rig({
    hotspots: {},
    expressions: { head: 'head', moods: { default: {}, serious: {} } },
    restMood: { byTier: { new: 'serious', warm: 'default' } },
  });
  const renderer = { rig: r, moodName: 'default', handPose: {}, setMood(name) { this.moodName = name; }, update() {} };
  const motion = { blinking: () => false, pose: () => ({}) };
  const hangout = new Hangout({ renderer, motion, tier: 'known' });
  hangout.frame(0, 0);
  assert.strictEqual(renderer.moodName, 'serious');
  hangout.setTier('warm');
  hangout.frame(0.1, 0.1);
  assert.strictEqual(renderer.moodName, 'default');
});

test('switching outfit hands the hangout the new hotspots and default hands', () => {
  const outfits = {
    academy: { outfit: 'academy', hotspots: { chest: { part: 'shirt' } }, hands: { r: { default: 'open' } } },
    roomwear: { outfit: 'roomwear', hotspots: {}, hands: { r: { default: 'fist' } } },
  };
  const renderer = {
    moodName: 'default',
    setMood(name) { this.moodName = name; },
    setOutfit(name) {
      this.rig = outfits[name];
      this.handPose = { r: this.rig.hands.r.default };
    },
    update() {},
  };
  renderer.setOutfit('academy');
  const motion = { blinking: () => false, pose: () => ({}) };
  const hangout = new Hangout({ renderer, motion });
  hangout.setOutfit('roomwear');
  assert.strictEqual(hangout.rig.outfit, 'roomwear');
  assert.deepStrictEqual(hangout.baseHands, { r: 'fist' });
  assert.strictEqual(hangout.rig.hotspots.chest, undefined);
});

test('a tier with no entry uses the nearest lower one; missing moods fall back', () => {
  const r = rig({
    expressions: { head: 'head', moods: { default: {}, surprise: {} } },
    reactions: { cheekPoke: { byTier: { new: { mood: 'surprise' }, warm: { mood: 'surprise_blush' } } } },
  });
  // no "known" entry: it inherits "new" (surprise)
  assert.strictEqual(resolveReaction(r, 'cheekPoke', 'known').mood, 'surprise');
  // this rig has no surprise_blush: falls back to default
  assert.strictEqual(resolveReaction(r, 'cheekPoke', 'warm').mood, 'default');
  assert.ok(DEFAULT_REACTIONS.chestTouch.byTier.bound);
});

test('a rig.json reaction overrides the shared default', () => {
  const r = rig({
    expressions: { head: 'head', moods: { default: {}, blush: {} } },
    reactions: { headPat: { mood: 'blush', duration: 1 } },
  });
  assert.strictEqual(resolveReaction(r, 'headPat', 'new').mood, 'blush');
});

test('rig.json sounds layer over a shared reaction by tier, keeping its faces', () => {
  // The shared default's warm head-pat mood, read off DEFAULT_REACTIONS so a
  // face retune there doesn't break this.
  const warmHeadPat = forTier(DEFAULT_REACTIONS.headPat, 'warm').mood;
  const moods = Object.fromEntries(['default', 'close', warmHeadPat].map((m) => [m, {}]));
  const r = rig({
    expressions: { head: 'head', moods },
    sounds: { headPat: { byTier: { warm: 'sfx/warm.wav' } }, cheekPoke: ['sfx/a.wav', 'sfx/b.wav'] },
    reactions: { lipsTouch: { mood: 'close', sound: 'sfx/own.wav' } },
  });
  assert.strictEqual(resolveReaction(r, 'headPat', 'new').sound, undefined);
  assert.strictEqual(resolveReaction(r, 'headPat', 'spark').sound, 'sfx/warm.wav');
  assert.strictEqual(resolveReaction(r, 'headPat', 'warm').mood, warmHeadPat);
  assert.deepStrictEqual(resolveReaction(r, 'cheekPoke', 'new').sound, ['sfx/a.wav', 'sfx/b.wav']);
  assert.strictEqual(resolveReaction(r, 'lipsTouch', 'new').sound, 'sfx/own.wav');
});

test('a reaction with a sound plays one of its clips; one without plays nothing', () => {
  const r = rig({
    hotspots: {},
    expressions: { head: 'head', moods: { default: {} } },
    reactions: { headPat: { mood: 'default', sound: ['sfx/a.wav', 'sfx/b.wav'] }, cheekPoke: { mood: 'default' } },
  });
  const renderer = { rig: r, moodName: 'default', handPose: {}, setMood() {}, update() {} };
  const motion = { blinking: () => false, pose: () => ({}) };
  const played = [];
  const hangout = new Hangout({ renderer, motion, play: (f) => played.push(f), random: () => 0.6 });
  hangout.react('cheekPoke', 0);
  hangout.react('headPat', 0);
  assert.deepStrictEqual(played, ['sfx/b.wav']);
});

test('sounds wait out the cooldown; the reaction itself still plays', () => {
  const r = rig({
    hotspots: {},
    expressions: { head: 'head', moods: { default: {}, blush: {} } },
    reactions: { headPat: { mood: 'blush', sound: 'sfx/a.wav' } },
  });
  const renderer = { rig: r, moodName: 'default', handPose: {}, setMood(name) { this.moodName = name; }, update() {} };
  const motion = { blinking: () => false, pose: () => ({}) };
  const played = [];
  const hangout = new Hangout({ renderer, motion, play: (f) => played.push(f) });
  hangout.react('headPat', 10);
  renderer.moodName = 'default';
  hangout.react('headPat', 10 + SOUND_COOLDOWN - 0.1);
  assert.strictEqual(renderer.moodName, 'blush');
  assert.strictEqual(played.length, 1);
  hangout.react('headPat', 10 + SOUND_COOLDOWN);
  assert.strictEqual(played.length, 2);
});

test('a touch line holds while it types and reads; upset always speaks', () => {
  const r = rig({
    hotspots: {},
    expressions: { head: 'head', moods: { default: {}, blush: {} } },
    reactions: { headPat: { mood: 'blush' }, upset: { mood: 'default' } },
  });
  const renderer = { rig: r, moodName: 'default', handPose: {}, setMood(name) { this.moodName = name; }, update() {} };
  const motion = { blinking: () => false, pose: () => ({}) };
  const said = [];
  const lines = { headPat: ['abcd'], upset: ['no'] };
  const hangout = new Hangout({ renderer, motion, lines, say: (l) => said.push(l) });
  const ready = 10 + (4 * TYPE_MS) / 1000 + LINE_HOLD;
  hangout.react('headPat', 10, 'head');
  renderer.moodName = 'default';
  hangout.react('headPat', ready - 0.01, 'head');
  assert.strictEqual(renderer.moodName, 'blush', 'the reaction still plays');
  assert.deepStrictEqual(said, ['abcd']);
  hangout.react('upset', ready - 0.01, 'head');
  assert.deepStrictEqual(said, ['abcd', 'no']);
  hangout.react('headPat', 20, 'head');
  assert.deepStrictEqual(said, ['abcd', 'no', 'abcd']);
});

test('a side spot twitches and clenches its own arm; other spots both', () => {
  const pose = { image: 'h.png' };
  const hand = { default: 'relaxed', poses: { relaxed: pose, curled: pose, fist: pose } };
  const r = rig({
    expressions: { head: 'head', moods: { default: {}, upset: {} } },
    bones: { arms: { r: {}, l: {} } },
    hands: { r: hand, l: hand },
    reactions: { handTap: { mood: 'upset', twitch: true, fist: true, duration: 1 }, hipsTouch: { mood: 'upset', twitch: 2, duration: 1 } },
  });
  const twitched = [];
  const motion = { blinking: () => false, pose: () => ({}), twitch: (sides, t, scale) => twitched.push([sides, scale]) };
  const renderer = {
    rig: r,
    handPose: { r: 'relaxed', l: 'relaxed' },
    setMood() {},
    setHandPose(side, p) { this.handPose[side] = p; },
    update() {},
  };
  const hangout = new Hangout({ renderer, motion });
  hangout.react('handTap', 0, 'hand_l');
  hangout.frame(0.01, 0.01);
  assert.deepStrictEqual(renderer.handPose, { r: 'relaxed', l: 'fist' });
  hangout.frame(1.1, 1);
  assert.deepStrictEqual(renderer.handPose, { r: 'relaxed', l: 'relaxed' });
  hangout.react('hipsTouch', 2, 'hips');
  assert.deepStrictEqual(twitched, [[['l'], 1], [['r', 'l'], 2]]);
  hangout.frame(2.01, 0.01);
  assert.deepStrictEqual(renderer.handPose, { r: 'relaxed', l: 'relaxed' }, 'a twitch alone swaps no pose');
});
