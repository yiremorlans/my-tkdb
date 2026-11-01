// Live2DRig guarded pose (activity/src/hangout-v2/live2dRig.js): when the
// upset pose is the guarded pose, the lockout keeps holding it instead of
// returning and playing it again. Pose hand-offs are timed from when the
// clip starts (it may still be loading when playPose is called).
import test, { mock } from 'node:test';
import assert from 'node:assert';

mock.module('pixi.js', { namedExports: { Container: class {} } });
mock.module('untitled-pixi-live2d-engine/cubism', { namedExports: { Live2DModel: {}, MotionPriority: { FORCE: 3, IDLE: 1 } } });
mock.timers.enable({ apis: ['setTimeout'] });
const { Live2DRig } = await import('../activity/src/hangout-v2/live2dRig.js');

function fakeRig(reactionPoses) {
  const r = Object.create(Live2DRig.prototype);
  r.rig = { reactionPoses };
  r.played = [];
  r.model = { motion: (group) => (r.played.push(group), Promise.resolve(true)) };
  r.durations = new Map(['m_udekumi', 'm_weak', 'm_think'].flatMap((g) => [[g, 1], [`${g}_hold`, 1], [`${g}_return`, 1]]));
  r.poseTimers = [];
  r.posing = null;
  r.idleUntil = 0;
  return r;
}

// Lets the clip's start (a resolved promise) land; setImmediate isn't mocked.
const flush = () => new Promise((resolve) => setImmediate(resolve));

test('upset pose = guarded pose: held through the lockout, played once, never returned', async () => {
  const r = fakeRig({ upset: { byTier: { new: 'm_udekumi' } } });
  r.reactPose('upset', 'new');
  await flush();
  r.lockPose('new');
  mock.timers.tick(4000); // past the upset pose's own return
  r.guard('new');
  mock.timers.tick(60000);
  assert.deepStrictEqual(r.played, ['m_udekumi', 'm_udekumi_hold']);
  assert.strictEqual(r.posing, 'm_udekumi');
});

test('a different guarded pose plays once the upset ends, and holds', async () => {
  const r = fakeRig({ upset: 'm_think', guarded: 'm_weak' });
  r.reactPose('upset', 'new');
  await flush();
  r.lockPose('new');
  mock.timers.tick(4000);
  await flush();
  r.guard('new');
  await flush();
  mock.timers.tick(60000);
  assert.deepStrictEqual(r.played, ['m_think', 'm_think_hold', 'm_think_return', 'm_weak', 'm_weak_hold']);
  assert.strictEqual(r.posing, 'm_weak');
});

// A model whose clips start only when the test says (a cold fetch).
function slowRig(reactionPoses) {
  const r = fakeRig(reactionPoses);
  r.pending = [];
  r.model = { motion: (group) => (r.played.push(group), new Promise((resolve) => r.pending.push(resolve))) };
  return r;
}

test('a slow-loading pose plays in full: its hold waits for the clip to start', async () => {
  const r = slowRig({ headPat: 'm_think' });
  r.reactPose('headPat', 'new');
  mock.timers.tick(3000); // still fetching: no hold, no return yet
  assert.deepStrictEqual(r.played, ['m_think']);
  r.pending.shift()(true);
  await flush();
  mock.timers.tick(900);
  assert.deepStrictEqual(r.played, ['m_think']); // the 1s clip is still playing
  mock.timers.tick(100);
  assert.deepStrictEqual(r.played, ['m_think', 'm_think_hold']);
});

test('a pose replaced while loading never starts its hold or return', async () => {
  const r = slowRig({ headPat: 'm_think', cheekPoke: 'm_weak' });
  r.reactPose('headPat', 'new');
  r.reactPose('cheekPoke', 'new');
  r.pending.shift()(true); // the first clip lands late
  r.pending.shift()(true);
  await flush();
  mock.timers.tick(1000);
  assert.deepStrictEqual(r.played, ['m_think', 'm_weak', 'm_weak_hold']);
});

test('a pose kept while loading holds with no return', async () => {
  const r = slowRig({ upset: 'm_udekumi' });
  r.reactPose('upset', 'new');
  r.lockPose('new');
  r.pending.shift()(true);
  await flush();
  mock.timers.tick(60000);
  assert.deepStrictEqual(r.played, ['m_udekumi', 'm_udekumi_hold']);
  assert.strictEqual(r.leavesAt, null);
});

test('a pose whose clip fails to load leaves the pose', async () => {
  const r = slowRig({ headPat: 'm_think' });
  r.reactPose('headPat', 'new');
  r.pending.shift()(false);
  await flush();
  mock.timers.tick(60000);
  assert.deepStrictEqual(r.played, ['m_think']);
  assert.strictEqual(r.posing, null);
});
