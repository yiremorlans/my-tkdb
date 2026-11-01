// The Hangout touch spots' sensitivity order (reactions.js): hips > lips >
// ears = belly > chest > hands = head pats = cheek (a friendly poke). More sensitive spots fill the
// annoyance meter faster, hold their face longer and flinch harder, in the
// shared defaults and in every Live2D rig.
import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

import { DEFAULT_REACTIONS, SPOT_ANNOYANCE, resolveReaction } from '../activity/src/hangout/reactions.js';
import { DIALOGUE_TIERS } from '../constants/tiers.js';

// Least to most sensitive; spots in one group are equal.
const ORDER = [['headPat', 'handTap', 'cheekPoke'], ['chestTouch'], ['earTouch', 'bellyTouch'], ['lipsTouch'], ['hipsTouch']];

function assertOrdered(values, what) {
  ORDER.forEach((group, i) => {
    const vals = group.map((n) => values[n]);
    assert.ok(vals.every((v) => v === vals[0]), `${what}: ${group.join(' = ')} (${vals.join(', ')})`);
    if (i) {
      const below = values[ORDER[i - 1][0]];
      assert.ok(vals[0] > below, `${what}: ${group[0]} ${vals[0]} > ${ORDER[i - 1][0]} ${below}`);
    }
  });
}

test('the annoyance meter fills faster on more sensitive spots', () => {
  const share = (spot) => SPOT_ANNOYANCE[spot] ?? 0.2;
  assertOrdered({ headPat: share('head'), handTap: share('hand_l'), cheekPoke: share('cheek'), chestTouch: share('chest'), earTouch: share('ear_l'),
    bellyTouch: share('belly'), lipsTouch: share('lips'), hipsTouch: share('hips') }, 'SPOT_ANNOYANCE');
  assert.strictEqual(SPOT_ANNOYANCE.ear_l, SPOT_ANNOYANCE.ear_r);
});

test('default faces hold longer on more sensitive spots, at every tier', () => {
  const rig = { character: 'test', reactions: DEFAULT_REACTIONS };
  for (const tier of DIALOGUE_TIERS) {
    const d = Object.fromEntries(ORDER.flat().map((n) => [n, resolveReaction(rig, n, tier).duration]));
    assertOrdered(d, `default durations at ${tier}`);
  }
});

// Touch-averse: their lines carry the cheek, so it may flinch.
const AVERSE = ['yuri', 'rui', 'lyca', 'ren', 'subaru'];

const dir = path.join(import.meta.dirname, '..', 'assets', 'live2d');
for (const id of fs.readdirSync(dir).filter((d) => fs.existsSync(path.join(dir, d, 'rig.json')))) {
  test(`${id}: faces hold longer on more sensitive spots, at every tier`, () => {
    const rig = JSON.parse(fs.readFileSync(path.join(dir, id, 'rig.json'), 'utf8'));
    for (const tier of DIALOGUE_TIERS) {
      const d = Object.fromEntries(ORDER.flat().map((n) => [n, resolveReaction(rig, n, tier)?.duration]));
      assertOrdered(d, `${id} durations at ${tier}`);
    }
  });
  test(`${id}: no spot flinches harder than a more sensitive one`, () => {
    const rig = JSON.parse(fs.readFileSync(path.join(dir, id, 'rig.json'), 'utf8'));
    for (const tier of DIALOGUE_TIERS) {
      for (const n of ['headPat', 'handTap', ...(AVERSE.includes(id) ? [] : ['cheekPoke'])]) assert.ok(!resolveReaction(rig, n, tier)?.twitch, `${id} ${n} at ${tier} flinches`);
      const size = (n) => Number(resolveReaction(rig, n, tier)?.twitch ?? 0);
      const flat = ORDER.flat().slice(3);
      for (let i = 0; i < flat.length; i++) for (let j = i + 1; j < flat.length; j++) {
        const [a, b] = [flat[i], flat[j]];
        const rank = (n) => ORDER.findIndex((g) => g.includes(n));
        if (rank(a) < rank(b) && size(a) && size(b)) assert.ok(size(a) < size(b), `${id} at ${tier}: ${a} ${size(a)} < ${b} ${size(b)}`);
      }
    }
  });
}
