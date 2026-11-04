// Hangout model manifests (activity/src/hangout/manifest.js): the
// builder against a small fixture, then every model under assets/live2d/
// has a manifest matching its files. Stale after a hand edit? Run
// node activity/tools/live2d-manifest.js <character>.
import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

import { buildModelManifest, manifestPath } from '../activity/src/hangout/manifest.js';
import { manifestText, modelFiles } from '../activity/tools/live2d-manifest.js';

test('manifestPath sits beside the model3.json', () => {
  assert.strictEqual(manifestPath('academy/rui_academy.model3.json'), 'academy/rui_academy.manifest.json');
});

test('buildModelManifest gathers expressions, clip lengths and what the idle moves', async () => {
  const files = {
    'expressions/e_smile_00.exp3.json': { Parameters: [{ Id: 'ParamMouthForm', Value: 1, Blend: 'Add' }] },
    'motions/m_default.motion3.json': {
      Meta: { Duration: 3 },
      Curves: [
        { Id: 'ParamAngleX', Segments: [0, 0, 0, 1.5, 4] }, // moves
        { Id: 'ParamAngleY', Segments: [0, 2, 0, 3, 2] }, // flat
        { Id: 'ParamBodyX', Segments: [0, 0, 1, 0.5, 0, 1, 0, 2, 0] }, // bezier, flat
      ],
    },
    'motions/m_kubi.motion3.json': { Meta: { Duration: 0.8 }, Curves: [] },
  };
  const model3 = {
    FileReferences: {
      Expressions: [{ Name: 'e_smile_00', File: 'expressions/e_smile_00.exp3.json' }],
      Motions: {
        m_default: [{ File: 'motions/m_default.motion3.json' }],
        m_kubi: [{ File: 'motions/m_kubi.motion3.json' }],
        Idle: [{ File: 'motions/m_default.motion3.json' }],
      },
    },
  };
  assert.deepStrictEqual(await buildModelManifest(model3, (f) => files[f]), {
    expressions: { e_smile_00: [{ Id: 'ParamMouthForm', Value: 1, Blend: 'Add' }] },
    durations: { m_default: 3, m_kubi: 0.8, Idle: 3 },
    idleParams: ['ParamAngleX'],
  });
});

for (const file of modelFiles()) {
  const name = path.relative(path.resolve('assets/live2d'), file);
  test(`${name}: manifest matches its files`, async () => {
    const out = manifestPath(file);
    assert.ok(fs.existsSync(out), `no ${path.basename(out)}; run node activity/tools/live2d-manifest.js`);
    assert.strictEqual(fs.readFileSync(out, 'utf8'), await manifestText(file), 'stale; run node activity/tools/live2d-manifest.js');
  });
}
