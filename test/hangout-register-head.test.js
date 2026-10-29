// Head registration (activity/tools/register-head.js, docs/hangout-
// activity.md §3.5): ECC finds how a sprite's head is off the rig's, and the
// remap moves only the head.
import { test } from 'node:test';
import assert from 'node:assert';

import { describeAffine, findAffineECC, gray, headRegion, remapHead } from '../activity/tools/register-head.js';
import { readRig } from '../activity/tools/lib/render.js';
import { readPng } from '../activity/tools/lib/png.js';

// A smooth blob (gaussian bumps) on gray, drawn with a scale and offset.
function blob(W, H, s = 1, dx = 0, dy = 0) {
  const data = new Uint8Array(W * H * 4);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const u = (x - 40 - dx) / s;
      const v = (y - 40 - dy) / s;
      const val = 60 + 150 * Math.exp(-(u * u + v * v) / 200) + 60 * Math.exp(-((u - 12) ** 2 + (v + 8) ** 2) / 40);
      data.set([val, val, val, 255], (y * W + x) * 4);
    }
  }
  return { width: W, height: H, data };
}

test('ECC recovers a known scale and offset', () => {
  const W = 80, H = 80;
  const ref = blob(W, H);
  const src = blob(W, H, 0.98, 1.5, 3);
  const { M } = findAffineECC(gray(ref), gray(src), W, H, [15, 15, 65, 65]);
  const { scale, dx, dy } = describeAffine(M, [40, 40]);
  assert.ok(Math.abs(scale - 0.98) < 0.005, `scale ${scale}`);
  assert.ok(Math.abs(dx - 1.5) < 0.2 && Math.abs(dy - 3) < 0.2, `offset ${dx},${dy}`);
});

test('an identity remap leaves the sprite as it is, and rows past the blend are copied', () => {
  const img = blob(20, 20);
  const out = remapHead(img, [[1, 0, 0], [0, 1, 0]], [5, 10]);
  assert.deepStrictEqual([...out], [...img.data]);
  const moved = remapHead(img, [[1, 0, 3], [0, 1, 3]], [5, 10]);
  assert.deepStrictEqual([...moved.subarray(10 * 20 * 4)], [...img.data.subarray(10 * 20 * 4)]);
  assert.notDeepStrictEqual([...moved.subarray(0, 4 * 20 * 4)], [...img.data.subarray(0, 4 * 20 * 4)]);
});

test("Alan's room sprite draws the shared head ~1.3% smaller and lower; the box comes from the rig", async () => {
  const { dir, source } = readRig('alan');
  const { box, blend } = await headRegion(source, dir);
  assert.deepStrictEqual(blend, [226, 262]); // the head's bottom row → the neck bone
  const ref = readPng(`${dir}/source/alan_academy.png`);
  const src = readPng(`${dir}/source/alan_room.png`);
  const { M } = findAffineECC(gray(ref), gray(src), ref.width, ref.height, box);
  const { scale, dy } = describeAffine(M, [(box[0] + box[2]) / 2, blend[1]]);
  assert.ok(Math.abs(scale - 0.987) < 0.002, `scale ${scale}`);
  assert.ok(dy > 5 && dy < 7, `dy at the neck ${dy}`);
});
