// Live2DRig guarded pose (activity/src/hangout-v2/live2dRig.js): when the
// upset pose is the guarded pose, the lockout keeps holding it instead of
// returning and playing it again.
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
  r.model = { motion: (group) => r.played.push(group) };
  r.durations = new Map(['m_udekumi', 'm_weak', 'm_think'].flatMap((g) => [[g, 1], [`${g}_hold`, 1], [`${g}_return`, 1]]));
  r.poseTimers = [];
  r.posing = null;
  r.idleUntil = 0;
  return r;
}

test('upset pose = guarded pose: held through the lockout, played once, never returned', () => {
  const r = fakeRig({ upset: { byTier: { new: 'm_udekumi' } } });
  r.reactPose('upset', 'new');
  r.lockPose('new');
  mock.timers.tick(4000); // past the upset pose's own return
  r.guard('new');
  mock.timers.tick(60000);
  assert.deepStrictEqual(r.played, ['m_udekumi', 'm_udekumi_hold']);
  assert.strictEqual(r.posing, 'm_udekumi');
});

test('a different guarded pose plays once the upset ends, and holds', () => {
  const r = fakeRig({ upset: 'm_think', guarded: 'm_weak' });
  r.reactPose('upset', 'new');
  r.lockPose('new');
  mock.timers.tick(4000);
  r.guard('new');
  mock.timers.tick(60000);
  assert.deepStrictEqual(r.played, ['m_think', 'm_think_hold', 'm_think_return', 'm_weak', 'm_weak_hold']);
  assert.strictEqual(r.posing, 'm_weak');
});
