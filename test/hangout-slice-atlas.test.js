// Atlas slicing (activity/tools/slice-atlas.js, docs/hangout-activity.md
// §3.1): positional ids, and the part-names.json `ignore` list for helper
// shapes.
import { test } from 'node:test';
import assert from 'node:assert';

import { slice } from '../activity/tools/slice-atlas.js';

// A 60x30 atlas with opaque squares at the given [x, y, size].
function atlas(squares) {
  const width = 60, height = 30;
  const data = Buffer.alloc(width * height * 4);
  for (const [x0, y0, n] of squares) {
    for (let y = y0; y < y0 + n; y++) for (let x = x0; x < x0 + n; x++) data.fill(255, (y * width + x) * 4, (y * width + x) * 4 + 4);
  }
  return { width, height, data };
}

const SQUARES = [[2, 2, 21], [30, 2, 21], [2, 25, 4]];

test('ignored regions get no id, take no fragments, and the rest keep their reading order', () => {
  // The 4px square is a fragment of the first square, 3px above it.
  const plain = slice(atlas(SQUARES));
  assert.deepStrictEqual(plain.parts.map((p) => [p.id, p.fragments]), [['p000', 1], ['p001', 0]]);
  const ignored = slice(atlas(SQUARES), { ignore: [[0, 0, 25, 25]] });
  assert.deepStrictEqual(ignored.parts.map((p) => [p.id, p.rect[0]]), [['p000', 28], ['p001', 0]]);
  assert.deepStrictEqual(ignored.ignored, [[2, 2, 21, 21]]);
});

test('a rect only ignores regions entirely inside it', () => {
  const r = slice(atlas(SQUARES), { ignore: [[0, 0, 22, 22]] });
  assert.strictEqual(r.parts.length, 2);
  assert.deepStrictEqual(r.ignored, []);
});

test('an empty ignore list slices exactly like no list', () => {
  const a = slice(atlas(SQUARES));
  const b = slice(atlas(SQUARES), { ignore: [] });
  assert.deepStrictEqual(b.parts.map((p) => [p.id, p.rect, p.buf]), a.parts.map((p) => [p.id, p.rect, p.buf]));
});
