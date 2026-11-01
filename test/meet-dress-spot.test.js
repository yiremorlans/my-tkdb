// Spot-bound outfits (rig.json `outfits.<name>.spots`): worn always and only
// at their background files, whatever the casual roll (meetActivity.js
// dressForVariant). Date and Gala outfits (`dateOnly`, `galaOnly`): never /meet's.
import { test, mock } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { createFakeSupabase } from './helpers/fakeSupabase.js';

const fake = createFakeSupabase({});
mock.module('@supabase/supabase-js', { namedExports: { createClient: () => fake.client } });
mock.module('../imageComposition.js', {
  namedExports: {
    composeEncounter: async () => Buffer.from('png'),
    composeSilhouetteEncounter: async () => Buffer.from('png'),
    composeWardingCard: async () => Buffer.from('png'),
    composeFieldReport: async () => Buffer.from('png'),
  },
});
const { dressForVariant, pickOutfit } = await import('../meetActivity.js');

const LIVE2D = path.join(import.meta.dirname, '..', 'assets', 'live2d');
const BG = path.join(import.meta.dirname, '..', 'assets', 'bg');
const first = () => 0;

const BOUND = {
  benkei: ['work', 'Darkwick_Campus_Store.png', 'Darkwick_Campus_Store_PM.png'],
  mio: ['work', 'Dionysia_Workshop.png', 'Dionysia_Workshop_2.png'],
  ren: ['roomwear', 'Jabberwock_Ren_Room.png', 'Jabberwock_Ren_Room_PM.png'],
};

for (const [id, [outfit, ...files]] of Object.entries(BOUND)) {
  test(`${id} wears ${outfit} at its spots on either roll`, () => {
    for (const file of files) {
      for (const rolled of ['uniform', 'casual']) {
        assert.deepStrictEqual(dressForVariant(id, rolled, file, first), { variant: 'casual', outfit });
      }
    }
  });

  test(`${id} never wears ${outfit} anywhere else`, () => {
    for (const spot of ['Darkwick_Courtyard.png', null]) {
      for (const rolled of ['uniform', 'casual']) {
        assert.deepStrictEqual(dressForVariant(id, rolled, spot, first), { variant: 'uniform', outfit: 'academy' });
      }
    }
  });
}

test('free casual outfits still go by the roll, at any spot', () => {
  assert.deepStrictEqual(dressForVariant('leo', 'casual', 'Darkwick_Courtyard.png', first), { variant: 'casual', outfit: 'casual' });
  assert.deepStrictEqual(dressForVariant('leo', 'uniform', 'Darkwick_Courtyard.png', first), { variant: 'uniform', outfit: 'academy' });
});

test('every rig.json spot is a background file on disk', () => {
  const onDisk = new Set(fs.readdirSync(BG, { recursive: true }).map((f) => path.basename(String(f))));
  for (const id of fs.readdirSync(LIVE2D)) {
    const file = path.join(LIVE2D, id, 'rig.json');
    if (!fs.existsSync(file)) continue;
    const rig = JSON.parse(fs.readFileSync(file, 'utf8'));
    for (const [name, o] of Object.entries(rig.outfits ?? {})) {
      for (const spot of o.spots ?? []) assert.ok(onDisk.has(spot), `${id}.${name}: ${spot} not in assets/bg`);
    }
  }
});

const occasionRig = {
  defaultOutfit: 'academy',
  outfits: {
    academy: { dialogueVariant: 'uniform' },
    date: { dialogueVariant: 'casual', dateOnly: true },
    gala: { dialogueVariant: 'casual', galaOnly: true },
  },
};

test('date and Gala outfits never win a /meet roll', () => {
  for (const r of [0, 0.5, 0.99]) {
    assert.deepStrictEqual(pickOutfit(occasionRig, 'casual', 'Darkwick_Courtyard.png', () => r), { variant: 'uniform', outfit: 'academy' });
    assert.deepStrictEqual(pickOutfit(occasionRig, 'uniform', null, () => r), { variant: 'uniform', outfit: 'academy' });
  }
});

test('a free casual outfit still wins with date and Gala outfits beside it', () => {
  const rig = { ...occasionRig, outfits: { ...occasionRig.outfits, casual: { dialogueVariant: 'casual' } } };
  for (const r of [0, 0.5, 0.99]) {
    assert.deepStrictEqual(pickOutfit(rig, 'casual', null, () => r), { variant: 'casual', outfit: 'casual' });
  }
});
