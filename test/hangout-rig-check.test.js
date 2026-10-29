// Rig quality guard (activity/tools/check-rig.js): every outfit with a
// recorded baseline in assets/rig/<character>/checks.json must be no worse
// than it: no more leak, spill or hole pixels, no higher mean diff. Rerun
// `node activity/tools/check-rig.js <character> --outfit <name> --record`
// after a deliberate improvement. See docs/hangout-activity.md §3.5.
import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

import { checkRig, enclosed, readChecks, regressions } from '../activity/tools/check-rig.js';

const characters = fs.readdirSync('assets/rig')
  .filter((c) => fs.existsSync(path.join('assets/rig', c, 'checks.json')));

for (const character of characters) {
  const { angles, baselines } = readChecks(character);
  // keys are "<outfit>" or "<outfit>/<hand set>"
  for (const [key, baseline] of Object.entries(baselines ?? {})) {
    const [outfit, handSet] = key.split('/');
    test(`${character} ${key}: no worse than its recorded check numbers`, async () => {
      const result = await checkRig(character, outfit === '_' ? undefined : outfit, { angles, handSet });
      assert.deepStrictEqual(regressions(result, baseline), []);
    });
  }
}

test('regressions flags any count that grows and a diff past the tolerance', () => {
  const base = { leak: 10, spill: 0, diff: 1.5, holes: { 'forearm_r@-60': 5 } };
  assert.deepStrictEqual(regressions({ ...base, holes: { 'forearm_r@-60': 5 } }, base), []);
  assert.deepStrictEqual(regressions({ ...base, diff: 1.5009 }, base), []);
  const worse = regressions({ leak: 11, spill: 1, diff: 1.51, holes: { 'forearm_r@-60': 6, 'hand_r@35': 1 } }, base);
  assert.deepStrictEqual(worse, [
    'leak 10 → 11', 'spill 0 → 1', 'diff 1.5 → 1.51', 'holes forearm_r@-60 5 → 6', 'holes hand_r@35 0 → 1',
  ]);
});

test('enclosed finds see-through pixels walled off from the frame edge', () => {
  // 5x5, opaque ring around a clear center, clear outer corner.
  const W = 5, H = 5;
  const rgba = new Uint8Array(W * H * 4);
  for (let y = 1; y <= 3; y++) for (let x = 1; x <= 3; x++) rgba[(y * W + x) * 4 + 3] = 255;
  rgba[(2 * W + 2) * 4 + 3] = 0;
  const mask = enclosed(rgba, W, H);
  assert.deepStrictEqual([...mask].map((v, i) => (v ? i : -1)).filter((i) => i >= 0), [12]);
});
