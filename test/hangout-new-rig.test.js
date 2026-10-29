// New-character scaffold (activity/tools/new-rig.js, docs/hangout-activity.md
// §3.5).
import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';

import { roomBackground, scaffoldFit, scaffoldRig, silhouette } from '../activity/tools/new-rig.js';
import { readPng } from '../activity/tools/slice-atlas.js';
import { apply, solve, validateRig, withOutfit } from '../activity/src/rig/skeleton.js';

// A stick figure: head 20 wide, neck 6 wide, body 30 wide, two legs.
function figure() {
  const width = 60, height = 200;
  const data = new Uint8Array(width * height * 4);
  const fill = (x0, x1, y0, y1) => {
    for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) data[(y * width + x) * 4 + 3] = 255;
  };
  fill(20, 40, 10, 30); // head
  fill(27, 33, 30, 36); // neck
  fill(15, 45, 36, 110); // body
  fill(15, 28, 110, 190); // legs
  fill(32, 45, 110, 190);
  return { width, height, data };
}

test('silhouette finds the figure, its neck and its crotch', () => {
  const s = silhouette(figure());
  assert.deepStrictEqual([s.top, s.bottom, s.neck, s.neckWidth, s.centerX, s.crotch], [10, 189, 30, 5, 29.5, 110]);
});

test('the scaffold rig has the standard skeleton, validates, and places joints from its own sprite', () => {
  const { rig } = scaffoldRig({ character: 'test', outfit: 'academy', sprite: figure() });
  assert.doesNotThrow(() => validateRig(rig));
  assert.deepStrictEqual(rig.parts.map((p) => p.id), ['root', 'hips', 'torso', 'neck', 'head']);
  assert.deepStrictEqual(rig.outfits.academy.parts.map((p) => `${p.id}<${p.parent}`), [
    'shoulder_r<torso', 'upper_arm_r<shoulder_r', 'forearm_r<upper_arm_r',
    'shoulder_l<torso', 'upper_arm_l<shoulder_l', 'forearm_l<upper_arm_l',
  ]);
  assert.deepStrictEqual(rig.outfits.academy, { ...rig.outfits.academy, dir: 'academy', atlas: 'source/test_academy_00.png', referenceImage: 'source/test_academy.png' });
  const solved = solve(withOutfit(rig));
  const y = (id) => apply(solved.get(id).bone, [0, 0])[1];
  assert.ok(y('head') < y('neck') && y('neck') < y('shoulder_r') && y('shoulder_r') < y('hips'));
  assert.ok(Math.abs(y('neck') - 37) <= 1, `neck at ${y('neck')}`); // base of this figure's neck
});

test("Yuri's scaffold puts his head lower than Alan's, from his own sprite", () => {
  const sprite = (c) => readPng(`assets/rig/${c}/source/${c}_academy.png`);
  const headY = (c) => {
    const { rig } = scaffoldRig({ character: c, outfit: 'academy', sprite: sprite(c) });
    return apply(solve(withOutfit(rig)).get('head').bone, [0, 0])[1];
  };
  assert.ok(headY('yuri') - headY('alan') > 40);
});

test('the scaffold fit.json anchors every bone it sets on a part it fits', () => {
  const fit = scaffoldFit();
  const ids = new Set(fit.parts.map((p) => p.id));
  for (const [bone, b] of Object.entries(fit.bones)) {
    for (const id of b.parts ?? [b.part]) assert.ok(ids.has(id), `${bone} → ${id}`);
  }
});

test('a character with a room gets it as the background', () => {
  const bg = roomBackground('alan', 'assets/rig/alan');
  assert.strictEqual(bg, '../../bg/vagastrom/Vagastrom_Alan_Room.png');
  assert.ok(fs.existsSync(`assets/rig/alan/${bg}`));
  assert.strictEqual(roomBackground('nobody', 'assets/rig/nobody'), null);
});
