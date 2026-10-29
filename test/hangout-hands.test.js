// Hand sets (skeleton.js withOutfit) and hand-pose matching
// (activity/tools/match-hands.js); docs/hangout-activity.md §3.2, §3.5.
import { test } from 'node:test';
import assert from 'node:assert';

import { assign, handMask, overlap } from '../activity/tools/match-hands.js';
import { writeOutfit } from '../activity/tools/fit-outfit.js';
import { handSetNames, imagesOf, validateRig, withOutfit } from '../activity/src/rig/skeleton.js';

const side = (part, img) => ({ part, default: 'relaxed', poses: { relaxed: { image: `parts/${img}.png` } } });
function rig(hands) {
  return {
    character: 't', reference: { width: 10, height: 10 }, scale: 1, defaultOutfit: 'a',
    parts: [{ id: 'root', parent: null, position: [0, 0] }],
    outfits: { a: { parts: [{ id: 'hand_r', parent: 'root', position: [0, 0], image: 'parts/w.png' }], hands } },
  };
}
const SETS = { defaultSet: 'white', sets: { white: { r: side('hand_r', 'w') }, bare: { r: side('hand_r', 'b') } } };

test('withOutfit flattens the chosen hand set; a single set is unchanged', () => {
  const r = rig(SETS);
  assert.deepStrictEqual(withOutfit(r, 'a').hands, SETS.sets.white);
  assert.deepStrictEqual([withOutfit(r, 'a').handSet, withOutfit(r, 'a').handSets], ['white', ['white', 'bare']]);
  assert.deepStrictEqual(withOutfit(r, 'a', { handSet: 'bare' }).hands, SETS.sets.bare);
  assert.throws(() => withOutfit(r, 'a', { handSet: 'blue' }), /unknown hand set blue/);
  const single = rig({ r: side('hand_r', 'w') });
  assert.strictEqual(withOutfit(single, 'a').handSets, undefined);
  assert.deepStrictEqual(handSetNames(single.outfits.a.hands), []);
});

test('every hand set is validated and its images loaded', () => {
  const r = rig(SETS);
  assert.deepStrictEqual(imagesOf(r).sort(), ['parts/b.png', 'parts/w.png']);
  assert.throws(() => validateRig(r, { imageExists: (f) => f !== 'parts/b.png' }), /hand set bare: missing image parts\/b.png/);
  const bad = rig({ defaultSet: 'nope', sets: { white: { r: side('hand_x', 'w') } } });
  const msg = (() => { try { validateRig(bad); return ''; } catch (e) { return e.message; } })();
  assert.match(msg, /defaultSet nope not in sets/);
  assert.match(msg, /hands.r: unknown part hand_x/);
});

test('fit.json hand sets become outfit hand sets on the same hand part', () => {
  const r = rig({});
  r.outfits.a.parts = [{ id: 'forearm_r', parent: 'root', position: [0, 0] }];
  const spec = {
    parts: [{ id: 'hand_r', hand: true, candidates: ['w1'] }],
    hands: {
      pivot: [0.5, 0.05], default: 'relaxed', poses: { relaxed: 'w1', fist: 'w2' }, set: 'white',
      sets: { bare: { poses: { relaxed: 'b1', fist: 'b2' }, poseScale: 0.66 } },
      sides: { r: { fit: 'hand_r', parent: 'forearm_r' } },
    },
  };
  writeOutfit(r, 'a', spec, { hand_r: { px: 0, py: 0, w: 10, h: 20, s: 0.7, flip: 0 } }, { log: () => {} });
  const { hands } = r.outfits.a;
  assert.deepStrictEqual(handSetNames(hands), ['white', 'bare']);
  assert.strictEqual(hands.sets.white.r.poses.fist.image, 'parts/w2.png');
  assert.deepStrictEqual(hands.sets.bare.r.poses.fist, { image: 'parts/b2.png', pivot: [0.5, 0.05], scale: 0.66 });
  assert.strictEqual(hands.sets.bare.r.part, 'hand_r');
  assert.doesNotThrow(() => validateRig(r));
});

test('assign pairs best overlaps first and reports what has no counterpart', () => {
  const r = assign({ open: { a: 0.4, b: 0.45 }, fist: { a: 0.9, b: 0.6 }, relaxed: { a: 0.8, b: 0.85 } }, 0.5);
  assert.deepStrictEqual(r.matches, { fist: { part: 'a', iou: 0.9 }, relaxed: { part: 'b', iou: 0.85 } });
  assert.deepStrictEqual([r.missing, r.unused], [['open'], []]);
});

test('overlap is 1 for the same mask, also when shifted a little', () => {
  const W = 240, H = 320;
  const a = new Uint8Array(W * H);
  const b = new Uint8Array(W * H);
  for (let y = 40; y < 80; y++) for (let x = 100; x < 130; x++) { a[y * W + x] = 1; b[(y + 2) * W + x + 3] = 1; }
  assert.strictEqual(overlap(a, a, 0), 1);
  assert.strictEqual(overlap(a, b, 4), 1);
});

test("Alan's roomwear hands match academy's poses, except academy's open glove", async () => {
  const dir = 'assets/rig/alan';
  const academy = withOutfit((await import('../assets/rig/alan/rig.json', { with: { type: 'json' } })).default, 'academy');
  const cands = ['p144', 'p145', 'p147', 'p153', 'p154', 'p155', 'p156'];
  const scores = {};
  for (const [name, pose] of Object.entries(academy.hands.r.poses)) {
    const m = await handMask(`${dir}/${pose.image}`, { scale: pose.scale });
    scores[name] = {};
    for (const c of cands) scores[name][c] = overlap(m, await handMask(`${dir}/roomwear/parts/${c}.png`, { scale: 0.69 }));
  }
  const r = assign(scores);
  assert.deepStrictEqual(Object.fromEntries(Object.entries(r.matches).map(([n, m]) => [n, m.part])), {
    relaxed: 'p153', curled: 'p155', loose: 'p145', back: 'p144', fist: 'p156', fist_side: 'p147', spread: 'p154',
  });
  assert.deepStrictEqual(r.missing, ['open']);
  // and roomwear's rig.json names agree with the match
  const roomwear = withOutfit((await import('../assets/rig/alan/rig.json', { with: { type: 'json' } })).default, 'roomwear');
  for (const [name, m] of Object.entries(r.matches)) {
    assert.strictEqual(roomwear.hands.r.poses[name].image, `roomwear/parts/${m.part}.png`, name);
  }
});

test('align-hands fits a wrist onto the forearm lines and the entry reproduces it', async () => {
  const { entryFor, fitLine, fitWrist } = await import('../activity/tools/align-hands.js');
  const { apply, spriteMatrix } = await import('../activity/src/rig/skeleton.js');
  const bone = [1, 0, 0, 1, 100, 200];
  // A drawing whose wrist is 40 px wide at x 20–60; the forearm is 20 px at x 92–112.
  const rows = Array.from({ length: 8 }, (_, i) => ({ y: i + 0.5, l: 20, r: 60 }));
  const left = fitLine([[150, 92], [190, 92]]);
  const right = fitLine([[150, 112], [190, 112]]);
  for (const flip of [1, -1]) {
    const fit = fitWrist(rows, { left, right, top: 204 }, { bone, flip, baseScale: 0.5 });
    assert.ok(Math.abs(fit.scale - 0.5) < 1e-6, 'scaled to the forearm width');
    const entry = entryFor(fit, bone, [80, 100]);
    const m = spriteMatrix({}, { id: 'hand' }, bone, [80, 100], { ...entry, flipX: flip < 0 });
    const [x0] = apply(m, [20, 0.5]);
    const [x1, y1] = apply(m, [60, 0.5]);
    assert.ok(Math.abs(Math.min(x0, x1) - 92) < 1e-3 && Math.abs(Math.max(x0, x1) - 112) < 1e-3, 'edges on the lines');
    assert.ok(Math.abs(y1 - 204) < 1e-3, 'top on the default pose top');
  }
});

test('a pose entry artRotation turns the art about its pivot', async () => {
  const { apply, spriteMatrix } = await import('../activity/src/rig/skeleton.js');
  const bone = [1, 0, 0, 1, 10, 10];
  const m = spriteMatrix({}, { id: 'hand' }, bone, [10, 10], { pivot: [0, 0], scale: 1, artRotation: 90 });
  assert.deepStrictEqual(apply(m, [0, 0]), [10, 10]);
  const [x, y] = apply(m, [5, 0]);
  assert.ok(Math.abs(x - 10) < 1e-9 && Math.abs(y - 15) < 1e-9);
});
