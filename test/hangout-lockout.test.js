// Hangout lockout: maxing the annoyance meter at new/known/warm locks him
// out (activity/src/hangout/hangout.js LOCKOUT_TIERS).
import test from 'node:test';
import assert from 'node:assert';

import { GUARDED_MOOD, Hangout, LOCKOUT_TIERS } from '../activity/src/hangout/hangout.js';

function setup(tier) {
  const rig = {
    character: 'test',
    hotspots: { head: { part: 'head' } },
    expressions: { moods: { default: {}, serious: {}, upset: {}, smile: {} } },
    reactions: { headPat: { mood: 'smile' }, upset: { mood: 'upset', duration: 4 } },
    annoyance: { perTap: 1, decayPerSec: 0, threshold: 3, recoverSec: 1 },
  };
  const calls = [];
  const renderer = {
    rig, moodName: 'default', handPose: {},
    partUV: () => [0.5, 0.5],
    setMood(name) { this.moodName = name; },
    guard: (t) => calls.push(['guard', t]),
    lockPose: (t) => calls.push(['lockPose', t]),
    unguard: () => calls.push(['unguard']),
    update() {},
  };
  const motion = { blinking: () => false, pose: () => ({}), twitch() {} };
  const said = [];
  const hangout = new Hangout({ renderer, motion, tier, say: (l) => said.push(l), lines: { headPat: ['hi'], upset: ['stop'] } });
  return { hangout, renderer, calls, said };
}

test('lockout tiers are new, known and warm', () => {
  assert.deepStrictEqual(LOCKOUT_TIERS, ['new', 'known', 'warm']);
});

for (const tier of LOCKOUT_TIERS) {
  test(`${tier}: maxing the meter upsets him, then he turns guarded and ignores taps`, () => {
    const { hangout, renderer, calls, said } = setup(tier);
    assert.strictEqual(hangout.tapAt([0, 0], 0).result, 'ok');
    assert.strictEqual(hangout.tapAt([0, 0], 0.1).result, 'ok');
    assert.strictEqual(hangout.tapAt([0, 0], 0.2).result, 'locked');
    assert.strictEqual(renderer.moodName, 'upset');
    assert.ok(said.includes('stop'));
    assert.deepStrictEqual(calls, [['lockPose', tier]]);
    hangout.frame(3, 0.1);
    assert.strictEqual(renderer.moodName, 'upset');
    assert.deepStrictEqual(calls, [['lockPose', tier]]);
    hangout.frame(4.3, 0.1);
    assert.strictEqual(renderer.moodName, GUARDED_MOOD);
    assert.deepStrictEqual(calls, [['lockPose', tier], ['guard', tier]]);
    // Long after the meter's own recovery, taps still do nothing.
    const before = said.length;
    assert.strictEqual(hangout.tapAt([0, 0], 60).result, 'ignored');
    hangout.frame(61, 0.1);
    assert.strictEqual(renderer.moodName, GUARDED_MOOD);
    assert.strictEqual(said.length, before);
  });
}

test('spark: upset recovers as before, no lockout', () => {
  const { hangout, renderer, calls } = setup('spark');
  hangout.tapAt([0, 0], 0);
  hangout.tapAt([0, 0], 0.1);
  assert.strictEqual(hangout.tapAt([0, 0], 0.2).result, 'upset');
  hangout.frame(5, 0.1);
  assert.strictEqual(renderer.moodName, 'default');
  assert.deepStrictEqual(calls, []);
  assert.strictEqual(hangout.tapAt([0, 0], 5).result, 'ok');
});

test('changing tier lifts the lockout', () => {
  const { hangout, renderer, calls } = setup('new');
  for (const t of [0, 0.1, 0.2]) hangout.tapAt([0, 0], t);
  hangout.frame(5, 0.1);
  hangout.setTier('known');
  assert.ok(calls.some(([c]) => c === 'unguard'));
  hangout.frame(5.1, 0.1);
  assert.strictEqual(renderer.moodName, 'default');
  assert.strictEqual(hangout.tapAt([0, 0], 6).result, 'ok');
});

test('a long upset line keeps the face up until it has been read, then eases out', async () => {
  const { typeDuration, UPSET_READ, SETTLE_FADE } = await import('../activity/src/hangout/hangout.js');
  const { hangout, renderer, calls } = setup('new');
  const line = 'I said stop. I mean it, I really do not like being poked like that, not at all.';
  hangout.lines = { headPat: ['hi'], upset: [line] };
  const fades = [];
  const setMood = renderer.setMood;
  renderer.setMood = function (name, fade) { fades.push([name, fade]); setMood.call(this, name); };
  for (const t of [0, 0.1, 0.2]) hangout.tapAt([0, 0], t);
  const end = 0.2 + typeDuration(line) / 1000 + UPSET_READ;
  assert.ok(end > 4.2, 'the line outlasts the reaction duration');
  hangout.frame(end - 0.1, 0.1);
  assert.strictEqual(renderer.moodName, 'upset');
  assert.ok(!calls.some(([c]) => c === 'guard'));
  hangout.frame(end + 0.05, 0.1);
  assert.strictEqual(renderer.moodName, GUARDED_MOOD);
  assert.deepStrictEqual(fades.at(-1), [GUARDED_MOOD, SETTLE_FADE]);
});

test('a rig with its own guarded mood holds that instead of serious once locked out', () => {
  const { hangout, renderer } = setup('new');
  renderer.rig.expressions.moods.guarded = {};
  for (const t of [0, 0.1, 0.2]) hangout.tapAt([0, 0], t);
  hangout.frame(30, 0.1);
  assert.strictEqual(renderer.moodName, 'guarded');
  hangout.setTier('known');
  hangout.frame(30.1, 0.1);
  assert.strictEqual(renderer.moodName, 'default');
});
