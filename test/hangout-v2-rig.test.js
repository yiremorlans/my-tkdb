// rig.json validation for Hangout v2, the Live2D hangout
// (activity/src/hangout-v2/validate.js validateLive2DRig): each rule against
// small inline fixtures, then every character's rig in assets/live2d/
// against the files on disk.
import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

import { validateLive2DRig } from '../activity/src/hangout-v2/validate.js';

// --- fixtures ---------------------------------------------------------------

function rig(overrides = {}) {
  return {
    character: 'test',
    reference: { width: 2000, height: 2800 },
    background: '../../bg/room.png',
    stage: {
      landscape: { top: 60, bottom: 1270, centerX: 1000 },
      portrait: { top: 85, bottom: 1660, centerX: 1000 },
    },
    defaultOutfit: 'academy',
    outfits: {
      academy: {
        model: 'academy/test.model3.json',
        dialogueVariant: 'uniform',
        parts: { vest: ['ArtMesh1'] },
        hotspots: { chest: { part: 'vest', rect: [0.2, 0, 0.8, 0.4] } },
      },
    },
    parts: { face_base: ['FaceSkin'] },
    hotspots: { cheek: { part: 'face_base', rect: [0.1, 0.5, 0.9, 0.8] }, head: { part: 'face_base' } },
    expressions: { moods: { default: [], smile: ['e_egao_00'], smile_blush: ['e_egao_00', 'e_sekimen_00'] } },
    reactionPoses: { headPat: 'm_kubi' },
    motion: { idle: { amount: 0.35 }, breath: { amount: 0.5 } },
    sounds: { headPat: 'sfx/pat.wav' },
    ...overrides,
  };
}

function model3() {
  return {
    FileReferences: {
      Moc: 'test.moc3',
      Expressions: [
        { Name: 'e_egao_00', File: 'expressions/e_egao_00.exp3.json' },
        { Name: 'e_sekimen_00', File: 'expressions/e_sekimen_00.exp3.json' },
      ],
      Motions: {
        m_kubi: [{ File: 'motions/m_kubi.motion3.json' }],
        m_kubi_hold: [{ File: 'motions/m_kubi_hold.motion3.json' }],
        m_kubi_return: [{ File: 'motions/m_kubi_return.motion3.json' }],
      },
    },
  };
}

// Files the fixture rig names, keyed by their path from the rig folder.
function files(overrides = {}) {
  return {
    'academy/test.model3.json': model3(),
    'academy/test.moc3': new Set(['FaceSkin', 'ArtMesh1']),
    '../../bg/room.png': true,
    'sfx/pat.wav': true,
    ...overrides,
  };
}

function opts(fs = files()) {
  return {
    readJson: (f) => fs[f] ?? null,
    fileExists: (f) => f in fs,
    mocIds: (f) => fs[f] ?? new Set(),
  };
}

const problems = async (r, o = opts()) => {
  try {
    await validateLive2DRig(r, o);
    return '';
  } catch (err) {
    return err.message;
  }
};

// --- rules ------------------------------------------------------------------

test('a well-formed rig validates', async () => {
  assert.strictEqual(await problems(rig()), '');
});

test("a missing model, or one that doesn't load, is rejected", async () => {
  assert.match(await problems(rig(), opts(files({ 'academy/test.model3.json': null }))), /outfits\.academy: model academy\/test\.model3\.json does not load/);
  const throwing = { ...opts(), readJson: () => { throw new SyntaxError('bad json'); } };
  assert.match(await problems(rig(), throwing), /does not load/);
  const r = rig();
  delete r.outfits.academy.model;
  assert.match(await problems(r), /outfits\.academy: `model` must name a model3\.json/);
});

test("a mood naming an expression the model lacks is rejected", async () => {
  const r = rig();
  r.expressions.moods.blush = ['e_sekimen_01'];
  assert.match(await problems(r), /moods\.blush: unknown expression e_sekimen_01/);
});

test('a reaction pose needs its group, a _hold and a _return', async () => {
  const m = model3();
  delete m.FileReferences.Motions.m_kubi_return;
  const msg = await problems(rig({ reactionPoses: { headPat: 'm_kubi', upset: 'm_angry' } }), opts(files({ 'academy/test.model3.json': m })));
  assert.match(msg, /reactionPoses\.headPat: no motion group m_kubi_return/);
  assert.match(msg, /reactionPoses\.upset: no motion group m_angry\n/);
  assert.match(msg, /reactionPoses\.upset: no motion group m_angry_hold/);
  assert.doesNotMatch(msg, /no motion group m_kubi_hold/);
});

test("a reaction pose must name a known reaction: a default, or the rig's own", async () => {
  assert.match(await problems(rig({ reactionPoses: { headPet: 'm_kubi' } })), /reactionPoses\.headPet: unknown reaction/);
  const own = rig({ reactionPoses: { wave: 'm_kubi' }, reactions: { wave: { mood: 'smile', duration: 2 } } });
  assert.strictEqual(await problems(own), '');
});

test("a hotspot must name a shared or outfit part, and a rect is 4 numbers", async () => {
  const r = rig();
  r.hotspots.lips = { part: 'mouth' };
  r.hotspots.cheek.rect = [0.1, 0.5, 0.9];
  r.outfits.academy.hotspots.hips = { part: 'pants', rect: [0, 0, 1, '0.2'] };
  const msg = await problems(r);
  assert.match(msg, /hotspots\.lips: unknown part mouth/);
  assert.match(msg, /hotspots\.cheek: rect must be 4 numbers/);
  assert.match(msg, /hotspots\.hips: unknown part pants/);
  assert.match(msg, /hotspots\.hips: rect must be 4 numbers/);
  assert.doesNotMatch(msg, /hotspots\.chest/);
});

test("a part's drawables must be in the outfit's moc3", async () => {
  const r = rig();
  r.parts.mouth = ['ArtMesh71'];
  r.outfits.academy.parts.vest = 'ArtMesh1';
  const msg = await problems(r);
  assert.match(msg, /parts\.mouth: unknown drawable ArtMesh71/);
  assert.match(msg, /parts\.vest must be a list of drawable ids/);
  assert.doesNotMatch(msg, /FaceSkin/);
});

test('without mocIds the drawable check is skipped', async () => {
  const r = rig();
  r.parts.mouth = ['ArtMesh71'];
  const { mocIds, ...rest } = opts();
  assert.strictEqual(await problems(r, rest), '');
});

test('the moc3 path resolves against the model3.json folder', async () => {
  const seen = [];
  await validateLive2DRig(rig(), { ...opts(), mocIds: (f) => (seen.push(f), new Set(['FaceSkin', 'ArtMesh1'])) });
  assert.deepStrictEqual(seen, ['academy/test.moc3']);
});

test('an outfit needs a dialogueVariant of uniform or casual', async () => {
  const outfit = (dialogueVariant) => ({ outfits: { academy: { ...rig().outfits.academy, dialogueVariant } } });
  assert.match(await problems(rig(outfit(undefined))), /dialogueVariant must be one of uniform, casual/);
  assert.match(await problems(rig(outfit('roomwear'))), /dialogueVariant must be one of/);
  assert.strictEqual(await problems(rig(outfit('casual'))), '');
});

test('reference and stage must be numeric', async () => {
  const r = rig({ reference: { width: 2000 } });
  delete r.stage.portrait;
  r.stage.landscape.top = '60';
  const msg = await problems(r);
  assert.match(msg, /reference\.height must be a number/);
  assert.match(msg, /stage\.landscape\.top must be a number/);
  assert.match(msg, /stage\.portrait\.bottom must be a number/);
  assert.doesNotMatch(msg, /reference\.width/);
});

test('motion amounts, when set, are between 0 and 1', async () => {
  const msg = await problems(rig({ motion: { idle: { amount: 1.5 }, breath: { amount: -0.1 }, sway: { amount: 'some' } } }));
  assert.match(msg, /motion\.idle\.amount must be between 0 and 1/);
  assert.match(msg, /motion\.breath\.amount must be between 0 and 1/);
  assert.match(msg, /motion\.sway\.amount must be between 0 and 1/);
  assert.strictEqual(await problems(rig({ motion: { sway: { amount: 0 }, bgPan: { speed: 0.02 } } })), '');
});

test('a missing background or sound file is rejected', async () => {
  const r = rig({ sounds: { headPat: 'sfx/pat.wav', handTap: ['sfx/tap1.wav', 'sfx/tap2.wav'] } });
  const present = files({ 'sfx/tap1.wav': true });
  delete present['../../bg/room.png'];
  const msg = await problems(r, opts(present));
  assert.match(msg, /missing file \.\.\/\.\.\/bg\/room\.png/);
  assert.match(msg, /missing file sfx\/tap2\.wav/);
  assert.doesNotMatch(msg, /tap1/);
});

test('a bad defaultOutfit and an empty outfits are rejected', async () => {
  assert.match(await problems(rig({ defaultOutfit: 'pajamas' })), /defaultOutfit pajamas not in outfits/);
  assert.match(await problems(rig({ outfits: {}, defaultOutfit: undefined })), /`outfits` must name at least one outfit/);
});

test('a problem every outfit shares is reported once, unprefixed', async () => {
  const r = rig();
  r.outfits.roomwear = { ...r.outfits.academy, model: 'roomwear/test.model3.json' };
  r.parts.mouth = ['ArtMesh71'];
  r.outfits.roomwear.hotspots = { chest: { part: 'shirt' } };
  const msg = await problems(r, opts(files({ 'roomwear/test.model3.json': model3(), 'roomwear/test.moc3': new Set(['FaceSkin', 'ArtMesh1']) })));
  assert.strictEqual(msg.match(/unknown drawable ArtMesh71/g).length, 1);
  assert.doesNotMatch(msg, /outfits\.\w+: parts\.mouth/);
  assert.match(msg, /outfits\.roomwear: hotspots\.chest: unknown part shirt/);
});

test('every problem is reported at once', async () => {
  const r = rig({ reference: {}, reactionPoses: { headPet: 'm_nope' } });
  r.expressions.moods.sad = ['e_kanashimi_00'];
  const msg = await problems(r);
  for (const p of [/reference\.width/, /unknown reaction/, /no motion group m_nope/, /moods\.sad/]) assert.match(msg, p);
});

test('ladder moods the rig lacks are warnings, not failures', async () => {
  const warnings = await validateLive2DRig(rig(), opts());
  // The fixture only has smile and smile_blush; the ladder also wants these.
  for (const face of ['close', 'sweat', 'annoyed', 'surprise_blush', 'blush', 'full_smile_blush']) {
    assert.ok(warnings.some((w) => w.includes(`no ${face} `)), face);
  }
  assert.ok(!warnings.some((w) => w.includes('no smile ')));
  // Per-character overrides count: Rui's known tier winks.
  const rui = await validateLive2DRig(rig({ character: 'rui' }), opts());
  assert.ok(rui.some((w) => w.includes('no wink ')));
});

// --- every character's rig --------------------------------------------------

const ROOT = 'assets/live2d';

// Drawable ids sit in the .moc3 as NUL-padded ASCII in fixed-width slots,
// so a NUL on both sides marks a whole id rather than the tail of a longer
// one. It also matches part and parameter ids, which is close enough here.
function mocIds(file) {
  const bytes = fs.readFileSync(file);
  return { has: (id) => bytes.includes(Buffer.from(`\0${id}\0`, 'latin1')) };
}

const characters = fs
  .readdirSync(ROOT, { withFileTypes: true })
  .filter((d) => d.isDirectory() && d.name !== 'vendor')
  .map((d) => d.name);

test('every character folder has a rig', () => {
  assert.ok(characters.includes('alan'), 'alan is the reference rig');
});

for (const id of characters) {
  test(`${id}'s Live2D rig validates against the files on disk`, async (t) => {
    const dir = path.join(ROOT, id);
    const r = JSON.parse(fs.readFileSync(path.join(dir, 'rig.json'), 'utf8'));
    assert.strictEqual(r.character, id, 'rig.json character matches its folder');
    const warnings = await validateLive2DRig(r, {
      readJson: (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')),
      fileExists: (f) => fs.existsSync(path.join(dir, f)),
      mocIds: (f) => mocIds(path.join(dir, f)),
    });
    for (const w of warnings) t.diagnostic(w);
  });
}
