// Spot-bound outfits (rig.json `outfits.<name>.spots`): worn only at their
// background files, through the casual roll there; with `always: true`, worn
// every time there whatever the roll (meetActivity.js pickOutfit). Date and
// Gala outfits (`dateOnly`, `galaOnly`): never /meet's.
import { test, mock } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { createFakeSupabase } from './helpers/fakeSupabase.js';

// db/supabase.js throws without these; CI has no .env.
process.env.SUPABASE_URL ??= 'http://fake.local';
process.env.SUPABASE_SERVICE_ROLE_KEY ??= 'fake-service-role-key';

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

const rigSpots = (id, outfit) =>
  JSON.parse(fs.readFileSync(path.join(LIVE2D, id, 'rig.json'), 'utf8')).outfits[outfit]?.spots ?? [];
const mortkranken = ['Mortkranken_Lab.png', 'Mortkranken_Lab_PM.png', 'Mortkranken_Examination_Room.png', 'Mortkranken_Examination_Room_2.png', 'Mortkranken_Examination_Room_PM.png'];
// Every Jabberwock background but Ren's room, read from disk, so a new
// Jabberwock map fails here until the jumpsuits list it too.
const jabberwock = fs.readdirSync(path.join(BG, 'jabberwock')).filter((f) => f.endsWith('.png') && !f.startsWith('Jabberwock_Ren_Room'));

// Worn every time at their spots (`always: true`).
const ALWAYS = {
  benkei: ['work', 'Darkwick_Campus_Store.png', 'Darkwick_Campus_Store_PM.png'],
  mio: ['work', 'Dionysia_Workshop.png', 'Dionysia_Workshop_2.png'],
  ren: ['roomwear', 'Jabberwock_Ren_Room.png', 'Jabberwock_Ren_Room_PM.png'],
  yuri: ['house', ...mortkranken],
  jiro: ['house', ...mortkranken],
};

// Worn only at their spots, through the roll (no `always`): the house
// jumpsuits anywhere in Jabberwock.
const ONLY_THERE = {
  haru: ['house', ...jabberwock],
  towa: ['house', ...jabberwock],
  ren: ['house', ...jabberwock],
};

// Each character's spot-bound outfits, gathered so there is one test per
// character (Ren has one of each kind).
const SPOT_BOUND = {};
for (const [table, always] of [[ALWAYS, true], [ONLY_THERE, false]]) {
  for (const [id, [outfit, ...files]] of Object.entries(table)) {
    (SPOT_BOUND[id] ??= []).push({ outfit, files, always });
  }
}

for (const [id, outfits] of Object.entries(SPOT_BOUND)) {
  test(`${id}: spot-bound outfits are worn at exactly their spots, and nowhere else`, () => {
    for (const { outfit, files, always } of outfits) {
      assert.deepStrictEqual([...rigSpots(id, outfit)].sort(), [...files].sort(), `${outfit} is bound to exactly its spots`);

      for (const file of files) {
        if (always) {
          // Worn there on either roll.
          for (const rolled of ['uniform', 'casual']) {
            assert.deepStrictEqual(dressForVariant(id, rolled, file, first), { variant: 'casual', outfit }, `${outfit} at ${file}, ${rolled} roll`);
          }
        } else {
          // Joins the casual roll there; a uniform roll is still academy.
          const casuals = new Set([0, 0.5, 0.99].map((r) => dressForVariant(id, 'casual', file, () => r).outfit));
          assert.ok(casuals.has(outfit), `${id} never draws ${outfit} at ${file}`);
          assert.deepStrictEqual(dressForVariant(id, 'uniform', file, first), { variant: 'uniform', outfit: 'academy' });
        }
      }

      for (const spot of ['Darkwick_Courtyard.png', null]) {
        for (const rolled of ['uniform', 'casual']) {
          for (const r of [0, 0.5, 0.99]) {
            assert.notStrictEqual(dressForVariant(id, rolled, spot, () => r).outfit, outfit, `${outfit} worn at ${spot}`);
          }
        }
      }
    }
  });
}

test('at an only-there spot, free casual outfits share the casual roll with it', () => {
  const rig = {
    defaultOutfit: 'academy',
    outfits: {
      academy: { dialogueVariant: 'uniform' },
      casual: { dialogueVariant: 'casual' },
      house: { dialogueVariant: 'casual', spots: ['Cave.png'] },
    },
  };
  assert.deepStrictEqual(pickOutfit(rig, 'casual', 'Cave.png', () => 0), { variant: 'casual', outfit: 'casual' });
  assert.deepStrictEqual(pickOutfit(rig, 'casual', 'Cave.png', () => 0.99), { variant: 'casual', outfit: 'house' });
  assert.deepStrictEqual(pickOutfit(rig, 'uniform', 'Cave.png', () => 0.99), { variant: 'uniform', outfit: 'academy' });
  assert.deepStrictEqual(pickOutfit(rig, 'casual', 'Field.png', () => 0.99), { variant: 'casual', outfit: 'casual' });
});

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
