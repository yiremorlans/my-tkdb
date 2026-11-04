// Live2DRig blushUnit (activity/src/hangout/live2dRig.js): warmth, hold
// and crest blush scale by the model's lowest nonzero ParamCheek keyform, so
// Ren's model (a normal blush drawn at 0.5, a heavy one at 1) flushes like
// the one-drawing models instead of jumping to his heavy blush.
import test, { mock } from 'node:test';
import assert from 'node:assert';

mock.module('pixi.js', { namedExports: { Container: class {} } });
mock.module('untitled-pixi-live2d-engine/cubism', { namedExports: { Live2DModel: {}, MotionPriority: { FORCE: 3, IDLE: 1 } } });
const { blushUnit } = await import('../activity/src/hangout/live2dRig.js');

const params = (keys, max = 1) => ({ keyValues: [Float32Array.from(keys)], maximumValues: [max] });

test('a one-drawing blush (keys 0 and 1) scales by 1', () => {
  assert.strictEqual(blushUnit(params([0, 1]), 0), 1);
});

test("Ren's two-drawing blush (keys 0, 0.5, 1) scales by 0.5", () => {
  assert.strictEqual(blushUnit(params([0, 0.5, 1]), 0), 0.5);
});

test('no ParamCheek, or no keyforms, scales by 1', () => {
  assert.strictEqual(blushUnit(params([0, 1]), undefined), 1);
  assert.strictEqual(blushUnit({ maximumValues: [1] }, 0), 1);
});
