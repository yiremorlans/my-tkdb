// Sprite-skin config derived from the bones (activity/tools/lib/
// skin-config.js, docs/hangout-activity.md §3.5).
import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';

import { boneGroups, mergeById, skinConfig } from '../activity/tools/lib/skin-config.js';

const flat = {
  parts: [
    { id: 'root', parent: null, position: [0, 0] },
    { id: 'hips', parent: 'root', position: [0, 0] },
    { id: 'torso', parent: 'hips', position: [0, 0] },
    { id: 'head', parent: 'torso', position: [0, 0], image: 'h.png' },
    { id: 'face', parent: 'head', position: [0, 0], image: 'f.png' },
    { id: 'arm_r', parent: 'torso', position: [0, 0] },
    { id: 'arm_l', parent: 'torso', position: [0, 0] },
    { id: 'pants', parent: 'hips', position: [0, 0], image: 'p.png' },
    { id: 'shirt', parent: 'torso', position: [0, 0], image: 's.png' },
    { id: 'sleeve_r', parent: 'arm_r', position: [0, 0], image: 'r.png' },
    { id: 'sleeve_l', parent: 'arm_l', position: [0, 0], image: 'l.png' },
    { id: 'skin_torso', parent: 'torso', position: [0, 0], image: 'k.png' },
  ],
};

test('one group per bone with art, by depth then rig order, skipping skip subtrees', () => {
  assert.deepStrictEqual(boneGroups(flat, ['head']).map((g) => [g.id, g.bone]), [
    ['skin_hips', 'hips'], ['skin_torso', 'torso'], ['skin_arm_r', 'arm_r'], ['skin_arm_l', 'arm_l'],
  ]);
  // without the skip, head's own art makes torso (its parent) and head groups
  assert.ok(boneGroups(flat).some((g) => g.bone === 'head'));
});

test('an outfit replaces a bone\'s group, keeps it with {}, or drops it with []', () => {
  const groups = boneGroups(flat, ['head'], {
    torso: [{ id: 'skin_back', zRange: [0, 9] }, { id: 'skin_front', zRange: [10, 20] }],
    arm_r: [{ id: 'skin_cuff_r', parts: ['sleeve_r'], mesh: { bend: true } }, {}],
    arm_l: [],
  });
  assert.deepStrictEqual(groups.map((g) => g.id), ['skin_hips', 'skin_back', 'skin_front', 'skin_cuff_r', 'skin_arm_r']);
  assert.deepStrictEqual(groups[3], { id: 'skin_cuff_r', parts: ['sleeve_r'], mesh: { bend: true }, bone: 'arm_r' });
});

test('shared neck fixes merge by id; null drops one; new ids are added', () => {
  const shared = [{ id: 'a', rows: [1, 2], z: 1 }, { id: 'b', z: 2 }];
  assert.deepStrictEqual(mergeById(shared, { a: { rows: [1, 5] }, b: null, c: { z: 3 } }), [
    { id: 'a', rows: [1, 5], z: 1 }, { id: 'c', z: 3 },
  ]);
  assert.deepStrictEqual(mergeById(shared), shared);
});

test("Alan's outfits resolve to their skin groups and neck fixes", () => {
  const rig = JSON.parse(fs.readFileSync('assets/rig/alan/rig.json', 'utf8'));
  const academy = skinConfig(rig, 'academy');
  const roomwear = skinConfig(rig, 'roomwear');
  assert.deepStrictEqual(academy.groups.map((g) => g.id), [
    'skin_hips', 'skin_torso_back', 'skin_torso_front', 'skin_upper_arm_r', 'skin_upper_arm_l',
    'skin_sleeve_lower_r', 'skin_forearm_r', 'skin_sleeve_lower_l', 'skin_bracelet_l', 'skin_forearm_l',
  ]);
  assert.deepStrictEqual(roomwear.groups.map((g) => g.id), [
    'skin_hips', 'skin_torso', 'skin_upper_arm_r', 'skin_upper_arm_l', 'skin_forearm_r', 'skin_forearm_l',
  ]);
  const jaw = (c) => c.shades.find((s) => s.id === 'skin_jaw_patch').rows;
  assert.deepStrictEqual([jaw(academy), jaw(roomwear)], [[190, 242], [190, 256]]);
  assert.deepStrictEqual(academy.underlays, roomwear.underlays);
});

test('an outfit spriteSkin with a groups array is a complete config', () => {
  const legacy = { dilate: 2, groups: [{ id: 'skin_x', bone: 'torso' }] };
  const rig = { parts: flat.parts, spriteSkin: { dilate: 9 }, defaultOutfit: 'a', outfits: { a: { parts: [], spriteSkin: legacy } } };
  assert.strictEqual(skinConfig(rig, 'a'), legacy);
});
