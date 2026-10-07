// Call scenes (docs/public-encounters.md §17): the pure half. Which wins roll a
// scene, which face each click shows, and when the date button wears its lock.
// The Discord/DB half (post, click, closeout) is in public-encounters.test.js.
import { afterEach, describe, it, mock } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { DIALOGUE } from '../constants/dialogue.js';

const {
  CALL_SCENE_CHANCE,
  SCENE_FACES,
  dateButtonLocked,
  pickCallScene,
  sceneFace,
  sceneFaceFiles,
} = await import('../constants/publicEncounters.js');
const { CHARACTERS } = await import('../constants/characters.js');

// A fixed sequence of "random" draws, consumed in order.
function draws(...values) {
  let i = 0;
  return () => values[i++ % values.length];
}

// Benkei ranks playful 2, kind 1, bold 0 — read off the character record so
// the test can't drift from it.
const benkei = CHARACTERS.find((c) => c.id === 'benkei');
const byRank = Object.fromEntries(
  Object.entries(benkei.affinityByResponse).map(([type, rank]) => [rank, type]),
);

describe('sceneFace', () => {
  it('opens every register on default', () => {
    for (const bucket of Object.keys(SCENE_FACES)) {
      assert.equal(sceneFace('benkei', bucket, null), 'default.png');
    }
  });

  it('maps each rank at each register through the face table', () => {
    const expected = {
      new: ['serious', 'sweat', 'close'],
      known: ['serious', 'sweat', 'close'],
      warm: ['serious', 'surprise', 'smile'],
      spark: ['serious', 'surprise', 'surprise_blush'],
      close: ['surprise', 'smile', 'full_smile'],
      bound: ['close', 'blush', 'full_smile_blush'],
    };
    for (const [bucket, faces] of Object.entries(expected)) {
      faces.forEach((face, rank) => {
        assert.equal(sceneFace('benkei', bucket, byRank[rank]), `${face}.png`, `${bucket} rank ${rank}`);
      });
    }
  });

  it('uses the _girl set for Jo in casual, opening included', () => {
    assert.equal(sceneFace('jo', 'new', null, { variant: 'casual' }), 'default_girl.png');
    assert.equal(sceneFace('jo', 'new', null, { variant: 'uniform' }), 'default.png');
    const jo = CHARACTERS.find((c) => c.id === 'jo');
    const fave = Object.keys(jo.affinityByResponse).find((t) => jo.affinityByResponse[t] === 2);
    assert.equal(sceneFace('jo', 'warm', fave, { variant: 'casual' }), 'smile_girl.png');
  });

  it('swaps blush for blush_2 half the time for Ren and Romeo only', () => {
    for (const id of ['ren', 'romeo']) {
      const character = CHARACTERS.find((c) => c.id === id);
      const like = Object.keys(character.affinityByResponse).find((t) => character.affinityByResponse[t] === 1);
      assert.equal(sceneFace(id, 'bound', like, { random: () => 0.1 }), 'blush_2.png');
      assert.equal(sceneFace(id, 'bound', like, { random: () => 0.9 }), 'blush.png');
    }
    assert.equal(sceneFace('benkei', 'bound', byRank[1], { random: () => 0.1 }), 'blush.png');
  });
});

describe('sceneFaceFiles', () => {
  it('lists every face the map can produce, including alternates and Jo\'s _girl set', () => {
    assert.deepEqual(
      sceneFaceFiles('benkei', 'new').sort(),
      ['close.png', 'default.png', 'serious.png', 'sweat.png'],
    );
    assert.ok(sceneFaceFiles('ren', 'bound').includes('blush_2.png'));
    assert.ok(sceneFaceFiles('jo', 'new').includes('default_girl.png'));
    assert.ok(sceneFaceFiles('jo', 'new').includes('close_girl.png'));
  });
});

describe('pickCallScene', () => {
  // The roll and the draw both read Math.random, as pickWinnerLine's draw does.
  let random;
  const rolls = (...values) => { random = mock.method(Math, 'random', draws(...values)); };
  afterEach(() => random?.mock.restore());

  it('hits under the chance and misses at or over it', () => {
    rolls(CALL_SCENE_CHANCE - 0.01, 0);
    const hit = pickCallScene('new', 'benkei');
    assert.equal(hit.bucket, 'new');
    assert.ok(hit.scene.responses);
    random.mock.restore();

    rolls(CALL_SCENE_CHANCE);
    assert.equal(pickCallScene('new', 'benkei'), null);
  });

  it('draws from the same pool as the reveal, at every register', () => {
    for (const bucket of ['new', 'known', 'warm', 'spark', 'close', 'bound']) {
      const { scene } = pickCallScene(bucket, 'benkei', { force: true });
      assert.ok(DIALOGUE.benkei.winnerLines[bucket].includes(scene), bucket);
    }
  });

  it('never opens a scene from the shared fallback pool', () => {
    const own = DIALOGUE.benkei.winnerLines.bound;
    delete DIALOGUE.benkei.winnerLines.bound;
    try {
      assert.equal(pickCallScene('bound', 'benkei', { force: true }), null);
    } finally {
      DIALOGUE.benkei.winnerLines.bound = own;
    }
  });

  it('never opens a scene when a face the map needs is missing', () => {
    const empty = fs.mkdtempSync(path.join(os.tmpdir(), 'expressions-'));
    try {
      assert.equal(pickCallScene('new', 'benkei', { force: true, expressionsDir: empty }), null);
    } finally {
      fs.rmSync(empty, { recursive: true, force: true });
    }
  });

  it('skips the roll when forced', () => {
    rolls(0.99);
    assert.ok(pickCallScene('new', 'benkei', { force: true })?.scene);
  });

  it('draws Towa\'s daytime scenes from his wordless pool', () => {
    for (let i = 0; i < 20; i++) {
      const { scene } = pickCallScene('new', 'towa', { force: true, daytime: true });
      assert.ok(DIALOGUE.towa.daytimeWinnerLines.new.includes(scene), 'drawn from daytimeWinnerLines');
      assert.ok(!scene.line.includes('"'), `speaks by day: ${scene.line}`);
    }
  });
});

describe('dateButtonLocked', () => {
  it('locks below Close Friend and unlocks at it', () => {
    assert.equal(dateButtonLocked(0), true);
    assert.equal(dateButtonLocked(149), true);
    assert.equal(dateButtonLocked(150), false);
    assert.equal(dateButtonLocked(600), false);
  });
});
