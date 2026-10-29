// rig.json validation for the Hangout rig (activity/src/rig/skeleton.js
// validateRig), plus the real Alan rig loading clean. See
// docs/hangout-activity.md §9.
import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

import { AnnoyanceMeter } from '../activity/src/hangout/annoyance.js';
import { Hangout, SOUND_COOLDOWN } from '../activity/src/hangout/hangout.js';
import { DEFAULT_REACTIONS, TOUCH_SPOTS, resolveReaction } from '../activity/src/hangout/reactions.js';
import { DIALOGUE_TIERS } from '../constants/tiers.js';
import { resolveMood } from '../activity/src/rig/expressions.js';
import { apply, imagesOf, outfitNames, solve, soundsOf, validateRig, withOutfit } from '../activity/src/rig/skeleton.js';

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

const problems = (r, opts) => {
  try {
    validateRig(r, opts);
    return '';
  } catch (err) {
    return err.message;
  }
};

test('a well-formed rig validates', () => {
  assert.doesNotThrow(() => validateRig(rig()));
});

test('an unknown parent is rejected', () => {
  const r = rig();
  r.parts[2].parent = 'neck';
  assert.match(problems(r), /head: unknown parent neck/);
});

test('a parent cycle is rejected', () => {
  const r = rig();
  r.parts[0].parent = 'head';
  assert.match(problems(r), /cycle through/);
});

test('a self-parented part is a cycle', () => {
  const r = rig();
  r.parts[1].parent = 'torso';
  assert.match(problems(r), /cycle through torso/);
});

test('a missing image is rejected', () => {
  const r = rig();
  const msg = problems(r, { imageExists: (f) => f !== 'parts/head.png' });
  assert.match(msg, /missing image parts\/head.png/);
});

test('hand poses and overlay files count as images', () => {
  const r = rig({
    hands: { r: { part: 'head', default: 'open', poses: { open: { image: 'parts/hand.png' } } } },
    expressions: { head: 'head', moods: { smile: { source: 'overlay', file: 'overlays/smile.png' } } },
  });
  const msg = problems(r, { imageExists: (f) => f.startsWith('parts/head') || f.startsWith('parts/torso') });
  assert.match(msg, /missing image parts\/hand.png/);
  assert.match(msg, /missing image overlays\/smile.png/);
});

test('duplicate ids and references to unknown parts are rejected', () => {
  const r = rig({
    hotspots: { cheek: { part: 'face' } },
    expressions: { head: 'head', moods: { blink: { show: ['eye_closed'] } } },
  });
  r.parts.push({ id: 'head', parent: 'torso', position: [0, 0] });
  const msg = problems(r);
  assert.match(msg, /duplicate part id head/);
  assert.match(msg, /hotspots.cheek: unknown part face/);
  assert.match(msg, /moods.blink: unknown part eye_closed/);
});

test('every problem is reported at once', () => {
  const r = rig();
  r.parts[1].parent = 'nope';
  r.parts[2].parent = 'also_nope';
  const msg = problems(r);
  assert.match(msg, /torso: unknown parent nope/);
  assert.match(msg, /head: unknown parent also_nope/);
});

test('child positions are relative to the parent pivot and rotate with it', () => {
  const r = rig();
  const solved = solve(r, { torso: { rotation: 90 } });
  const head = solved.get('head').bone;
  // Head sits 40 above the torso pivot (50, 80); a 90° torso turn swings it right.
  const [x, y] = apply(head, [0, 0]);
  assert.ok(Math.abs(x - 90) < 1e-9 && Math.abs(y - 80) < 1e-9, `${x},${y}`);
});

test('rotation is clamped to the part limits', () => {
  const r = rig();
  r.parts[2].limits = { rotation: [-5, 5] };
  const a = solve(r, { head: { rotation: 40 } }).get('head').bone;
  const b = solve(r, { head: { rotation: 5 } }).get('head').bone;
  assert.deepStrictEqual(a, b);
});

test('layered moods merge their parts and overlays', () => {
  const r = rig({
    expressions: {
      head: 'head',
      moods: {
        serious: { source: 'overlay', file: 'overlays/serious.png', rect: [1, 2, 3, 4] },
        sweat: { source: 'atlas', show: ['torso'] },
        upset: { layers: ['serious', 'sweat'] },
      },
    },
  });
  const m = resolveMood(r, 'upset');
  assert.deepStrictEqual([...m.show], ['torso']);
  assert.deepStrictEqual(m.overlays.map((o) => o.file), ['overlays/serious.png']);
});

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

test("Alan's rig.json validates against the files on disk, every outfit", () => {
  const dir = 'assets/rig/alan';
  const r = JSON.parse(fs.readFileSync(path.join(dir, 'rig.json'), 'utf8'));
  assert.doesNotThrow(() =>
    validateRig(r, { imageExists: (f) => fs.existsSync(path.join(dir, f)) }),
  );
  for (const name of outfitNames(r)) {
    const flat = withOutfit(r, name);
    assert.ok(fs.existsSync(path.join(dir, flat.referenceImage)), `${name} reference image`);
  }
});

// Two outfits over a shared head: each brings its own torso art and hands.
function outfitRig() {
  const outfit = (name) => ({
    referenceImage: `source/${name}.png`,
    parts: [
      { id: 'shirt', parent: 'torso', position: [0, 0], image: `${name}/shirt.png`, z: 5 },
      { id: 'hand_r', parent: 'torso', position: [20, 0], image: `${name}/hand.png`, z: 6 },
    ],
    hands: { r: { part: 'hand_r', default: 'open', poses: { open: { image: `${name}/hand.png` } } } },
  });
  return rig({
    defaultOutfit: 'academy',
    hotspots: { head: { part: 'head' } },
    outfits: { academy: outfit('academy'), roomwear: outfit('roomwear') },
  });
}

test('a rig with outfits validates, and each outfit flattens onto the shared parts', () => {
  const r = outfitRig();
  assert.doesNotThrow(() => validateRig(r));
  assert.deepStrictEqual(outfitNames(r), ['academy', 'roomwear']);
  const flat = withOutfit(r, 'roomwear');
  assert.strictEqual(flat.outfit, 'roomwear');
  assert.strictEqual(flat.outfits, undefined);
  assert.strictEqual(flat.referenceImage, 'source/roomwear.png');
  assert.deepStrictEqual(flat.parts.map((p) => p.id), ['root', 'torso', 'head', 'shirt', 'hand_r']);
  // the same part objects, so an editor's changes reach rig.json
  assert.strictEqual(flat.parts[0], r.parts[0]);
  assert.strictEqual(flat.parts[3], r.outfits.roomwear.parts[0]);
  assert.strictEqual(withOutfit(r).outfit, 'academy');
});

test('a rig without outfits passes through withOutfit unchanged', () => {
  const r = rig();
  assert.strictEqual(withOutfit(r), r);
  assert.deepStrictEqual(outfitNames(r), []);
});

test("an outfit's problems are reported under its name", () => {
  const r = outfitRig();
  r.outfits.roomwear.parts[0].parent = 'chest';
  r.outfits.roomwear.hands.r.default = 'fist';
  const msg = problems(r);
  assert.match(msg, /outfits\.roomwear: shirt: unknown parent chest/);
  assert.match(msg, /outfits\.roomwear: hands\.r: default pose fist not in poses/);
  assert.doesNotMatch(msg, /outfits\.academy/);
});

test('a shared problem is reported once, not per outfit', () => {
  const r = outfitRig();
  r.parts[2].parent = 'neck';
  const msg = problems(r);
  assert.strictEqual(msg.match(/head: unknown parent neck/g).length, 1);
  assert.doesNotMatch(msg, /outfits\./);
});

test('every outfit\'s images are checked', () => {
  const r = outfitRig();
  assert.ok(imagesOf(r).includes('roomwear/shirt.png'));
  assert.ok(imagesOf(r).includes('academy/hand.png'));
  const msg = problems(r, { imageExists: (f) => f !== 'roomwear/shirt.png' });
  assert.match(msg, /outfits\.roomwear: missing image roomwear\/shirt.png/);
});

test('an outfit part may not reuse a shared id', () => {
  const r = outfitRig();
  r.outfits.academy.parts.push({ id: 'head', parent: 'torso', position: [0, 0] });
  assert.match(problems(r), /outfits\.academy: duplicate part id head/);
});

test('a bad defaultOutfit, unknown outfit keys and a missing parts list are rejected', () => {
  const r = outfitRig();
  r.defaultOutfit = 'pajamas';
  r.outfits.academy.motion = {};
  delete r.outfits.roomwear.parts;
  const msg = problems(r);
  assert.match(msg, /defaultOutfit pajamas not in outfits/);
  assert.match(msg, /outfits\.academy: unknown key motion/);
  assert.match(msg, /outfits\.roomwear: `parts` must be an array/);
});

test("an outfit's hotspots merge over the shared ones, and must name its own parts", () => {
  const r = outfitRig();
  r.outfits.academy.hotspots = { chest: { part: 'shirt', rect: [0, 0, 1, 0.5] } };
  r.outfits.roomwear.hotspots = { chest: { part: 'vest' } };
  assert.deepStrictEqual(Object.keys(withOutfit(r, 'academy').hotspots), ['head', 'chest']);
  assert.match(problems(r), /outfits\.roomwear: hotspots\.chest: unknown part vest/);
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

test('switching outfit hands the hangout the new hotspots and default hands', () => {
  const r = outfitRig();
  r.outfits.academy.hotspots = { chest: { part: 'shirt' } };
  r.outfits.roomwear.hands.r.poses.fist = { image: 'roomwear/hand.png' };
  r.outfits.roomwear.hands.r.default = 'fist';
  const renderer = {
    moodName: 'default',
    setMood(name) { this.moodName = name; },
    setOutfit(name) {
      this.rig = withOutfit(r, name);
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

test('every touch spot reacts at every tier', () => {
  const r = rig({ expressions: { head: 'head', moods: { default: {} } } });
  for (const reaction of new Set(Object.values(TOUCH_SPOTS))) {
    for (const tier of DIALOGUE_TIERS) {
      assert.ok(resolveReaction(r, reaction, tier), `${reaction} at ${tier}`);
    }
  }
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

test('a ranked reaction takes the face a call scene shows at that tier and rank', () => {
  const moods = Object.fromEntries(['default', 'close', 'serious', 'surprise_blush', 'smile_blush', 'blush'].map((m) => [m, {}]));
  const expressions = { head: 'head', moods };
  // the shared ladder: fave at warm is surprise_blush, at spark blush
  assert.strictEqual(resolveReaction(rig({ expressions }), 'headPat', 'warm').mood, 'surprise_blush');
  assert.strictEqual(resolveReaction(rig({ expressions }), 'headPat', 'spark').mood, 'blush');
  // a character's override wins: Alan's spark fave is smile_blush, his new flat serious
  const alan = rig({ character: 'alan', expressions });
  assert.strictEqual(resolveReaction(alan, 'headPat', 'spark').mood, 'smile_blush');
  assert.strictEqual(resolveReaction(alan, 'hipsTouch', 'new').mood, 'serious');
  assert.strictEqual(resolveReaction(alan, 'hipsTouch', 'new').rank, undefined);
});

test('a rig.json reaction overrides the shared default', () => {
  const r = rig({
    expressions: { head: 'head', moods: { default: {}, blush: {} } },
    reactions: { headPat: { mood: 'blush', duration: 1 } },
  });
  assert.strictEqual(resolveReaction(r, 'headPat', 'new').mood, 'blush');
});

test('reaction sounds are listed across byTier, and a missing one is rejected', () => {
  const r = rig({
    reactions: {
      headPat: { sound: 'sfx/pat.wav' },
      cheekPoke: { byTier: { new: { sound: ['sfx/a.wav', 'sfx/b.wav'] }, warm: { sound: 'sfx/a.wav' } } },
    },
  });
  assert.deepStrictEqual(soundsOf(r), ['sfx/pat.wav', 'sfx/a.wav', 'sfx/b.wav']);
  assert.deepStrictEqual(soundsOf(rig()), []);
  assert.match(problems(r, { soundExists: (f) => f !== 'sfx/b.wav' }), /missing sound sfx\/b\.wav/);
  assert.strictEqual(problems(r, { soundExists: () => true }), '');
});

test('rig.json sounds layer over a shared reaction by tier, keeping its faces', () => {
  const moods = Object.fromEntries(['default', 'close', 'surprise_blush'].map((m) => [m, {}]));
  const r = rig({
    expressions: { head: 'head', moods },
    sounds: { headPat: { byTier: { warm: 'sfx/warm.wav' } }, cheekPoke: ['sfx/a.wav', 'sfx/b.wav'] },
    reactions: { lipsTouch: { mood: 'close', sound: 'sfx/own.wav' } },
  });
  assert.strictEqual(resolveReaction(r, 'headPat', 'new').sound, undefined);
  assert.strictEqual(resolveReaction(r, 'headPat', 'spark').sound, 'sfx/warm.wav');
  assert.strictEqual(resolveReaction(r, 'headPat', 'warm').mood, 'surprise_blush');
  assert.deepStrictEqual(resolveReaction(r, 'cheekPoke', 'new').sound, ['sfx/a.wav', 'sfx/b.wav']);
  assert.strictEqual(resolveReaction(r, 'lipsTouch', 'new').sound, 'sfx/own.wav');
  assert.deepStrictEqual(soundsOf(r).sort(), ['sfx/a.wav', 'sfx/b.wav', 'sfx/own.wav', 'sfx/warm.wav']);
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

test('a twitch eases the arm in, peaks, and settles back to the idle', async () => {
  const { Motion } = await import('../activity/src/rig/motion.js');
  const r = rig({
    bones: { arms: { r: { upper: 'upper_arm_r', fore: 'forearm_r', hand: 'hand_r', dir: 1 } } },
    motion: { breath: { enabled: false }, sway: { enabled: false }, arms: { enabled: false }, twitch: { amount: 4, upper: 0.5, peak: 0.05 } },
  });
  const motion = new Motion(r, { random: () => 0.5 });
  motion.twitch(['r'], 1);
  assert.ok(Math.abs(motion.pose(1.05, 0.05).forearm_r.rotation + 4) < 1e-9, 'peaks inward at `amount`');
  assert.strictEqual(motion.pose(1.05, 0).upper_arm_r.rotation, motion.pose(1.05, 0).forearm_r.rotation * 0.5);
  assert.strictEqual(motion.pose(1.05, 0).hand_r, undefined, 'the hand rides along unchanged');
  assert.ok(Math.abs(motion.pose(1.005, 0.005).forearm_r.rotation) < 0.3, 'starts from rest, no snap');
  assert.strictEqual(motion.pose(1.31, 0.31).forearm_r, undefined, 'gone after 6× the peak');
  motion.pose(2, 0.6);
  assert.deepStrictEqual(motion.twitches, {});
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

test('Alan places every touch spot on every outfit', () => {
  const alan = JSON.parse(fs.readFileSync(path.resolve('assets/rig/alan/rig.json'), 'utf8'));
  for (const outfit of outfitNames(alan)) {
    const placed = Object.keys(withOutfit(alan, outfit).hotspots);
    for (const spot of Object.keys(TOUCH_SPOTS)) assert.ok(placed.includes(spot), `${outfit}: ${spot}`);
  }
});
