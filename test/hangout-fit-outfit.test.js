// Outfit fitting (activity/tools/fit-outfit.js, lib/match.js;
// docs/hangout-activity.md §3.5): the matcher's OpenCV-compatible pieces, and
// writing fits into rig.json. The search itself is slow (tens of seconds),
// so these replay the saved fits.json; rerunning fit-outfit.js on Alan
// reproduces rig.json byte for byte.
import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';

import { alignLines, scaleBand, writeOutfit } from '../activity/tools/fit-outfit.js';
import { readHandFits } from '../activity/tools/lib/hand-fits.js';
import { Peeler, image, pyRound, resize } from '../activity/tools/lib/match.js';
import { apply, solve, withOutfit } from '../activity/src/rig/skeleton.js';

const readJson = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));

test('pyRound rounds halves to even, like Python', () => {
  assert.deepStrictEqual([0.5, 1.5, 2.5, 2.4, 2.6, 17.5].map(pyRound), [0, 2, 2, 2, 3, 18]);
});

test('scaleBand spans the outfit scale ± band', () => {
  assert.deepStrictEqual(scaleBand(0.69), [0.66, 0.67, 0.68, 0.69, 0.7, 0.71, 0.72]);
  assert.deepStrictEqual(scaleBand(0.7, { band: 0.01 }), [0.69, 0.7, 0.71]);
});

test('area resize averages the source cells it covers', () => {
  const img = image(4, 1, 1, Float32Array.from([0, 100, 200, 40]));
  assert.deepStrictEqual([...resize(img, 2, 1).data], [50, 120]);
});

test('the peeler finds a template and skips covered pixels', () => {
  const W = 20, H = 20;
  const target = image(W, H, 3);
  for (let y = 5; y < 9; y++) for (let x = 11; x < 15; x++) target.data.fill(200, (y * W + x) * 3, (y * W + x) * 3 + 3);
  const tpl = image(4, 4, 4);
  for (let i = 0; i < 16; i++) tpl.data.set([200, 200, 200, 255], i * 4);
  const pk = new Peeler(target, new Float32Array(W * H), { minVisible: 0.5, blur: 0 });
  const r = pk.score('sq', tpl, 1, 0);
  assert.deepStrictEqual([r.px, r.py, r.err], [11, 5, 0]);
  pk.cover(r, 'sq', tpl);
  assert.strictEqual(pk.score('sq', tpl, 1, 0, [11, 5, 11, 5]).err, 1e9); // fully covered: not visible enough
});

for (const outfit of ['academy', 'roomwear']) {
  test(`writing Alan's ${outfit} from its saved fits reproduces rig.json`, () => {
    const rig = readJson('assets/rig/alan/rig.json');
    const dir = rig.outfits[outfit].dir;
    const base = dir && dir !== '.' ? `assets/rig/alan/${dir}` : 'assets/rig/alan';
    const before = structuredClone(rig.outfits[outfit]);
    writeOutfit(rig, outfit, readJson(`${base}/fit.json`), readJson(`${base}/fits.json`), { log: () => {}, handFits: readHandFits(base) });
    assert.strictEqual(JSON.stringify(rig.outfits[outfit]), JSON.stringify(before));
  });
}

test('line art is written with its fill, mirrored with it', () => {
  const rig = {
    character: 't', reference: { width: 100, height: 100 }, scale: 0.5, defaultOutfit: 'a',
    parts: [{ id: 'root', parent: null, position: [0, 0] }],
    outfits: { a: { dir: 'a', parts: [] } },
  };
  const spec = { parts: [{ id: 'pants', candidates: ['p1'], center: [50, 50], parent: 'root', z: 10, lines: 'p2' }] };
  // fill 20x40 and lines 10x40 at offset (12, 0): composite 22x40
  const lines = { part: 'p2', offset: [12, 0], size: [22, 40], fillAt: [0, 0], fillSize: [20, 40], linesAt: [12, 0], linesSize: [10, 40] };
  for (const flip of [0, 1]) {
    const r = structuredClone(rig);
    const fits = { pants: { part: 'p1', px: 44.5, py: 40, w: 11, h: 20, s: 0.5, flip, center: [50, 50], lines } };
    writeOutfit(r, 'a', spec, fits, { log: () => {} });
    const [fill, art] = r.outfits.a.parts;
    assert.deepStrictEqual([fill.id, art.id, art.z, art.image], ['pants', 'pants_lines', 10.01, 'a/parts/p2.png']);
    // composite center 11 → fill center 10 (−0.5 px at s 0.5), lines center 17 (+3 px)
    const k = flip ? -1 : 1;
    assert.deepStrictEqual(fill.position, [50 - 0.5 * k, 50]);
    assert.deepStrictEqual(art.position, [50 + 3 * k, 50]);
    assert.strictEqual(!!art.flipX, !!flip);
  }
});

test('alignLines lays an outline onto the fill edge', () => {
  const fill = image(10, 10, 4);
  for (let y = 2; y < 8; y++) for (let x = 2; x < 8; x++) fill.data[(y * 10 + x) * 4 + 3] = 255;
  // a 6x6 square outline
  const lines = image(6, 6, 4);
  for (let i = 0; i < 6; i++) for (const [x, y] of [[i, 0], [i, 5], [0, i], [5, i]]) lines.data[(y * 6 + x) * 4 + 3] = 255;
  const r = alignLines(fill, lines, 3);
  assert.deepStrictEqual(r.offset, [2, 2]);
  assert.strictEqual(r.share, 1);
});

test('fit bones land where the fitted part puts them', () => {
  const rig = {
    character: 't', reference: { width: 100, height: 100 }, scale: 1, defaultOutfit: 'a',
    parts: [{ id: 'root', parent: null, position: [0, 0] }, { id: 'hips', parent: 'root', position: [0, 0] }],
    outfits: { a: { dir: 'a', parts: [{ id: 'shoulder', parent: 'hips', position: [0, 0] }] } },
  };
  const spec = { parts: [], bones: { hips: { at: [50, 60] }, shoulder: { part: 'sleeve', at: [0.5, 0] } } };
  writeOutfit(rig, 'a', spec, { sleeve: { px: 30, py: 20, w: 10, h: 30, s: 1, flip: 0, center: [35, 35] } }, { log: () => {} });
  const solved = solve(withOutfit(rig, 'a'));
  assert.deepStrictEqual(apply(solved.get('shoulder').bone, [0, 0]), [35, 20]);
  assert.deepStrictEqual(rig.parts[1].position, [50, 60]);
});
