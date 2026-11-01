// A flat /meet answer reads as indifference (reactions.js answerFlat): no
// rig ever answers it with an angry or annoyed face, at any tier.
import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

import { resolveReaction } from '../activity/src/hangout/reactions.js';
import { DIALOGUE_TIERS } from '../constants/tiers.js';

const LIVE2D = path.join(import.meta.dirname, '..', 'assets', 'live2d');
// Expressions that read as anger, annoyance or displeasure.
const ANGRY = /^e_(ikari|kire|fukigen|fuman|keibetsu|sakebu|mu|komari|suneru|shinken|dada|shout|punpun)\d*_/;

const rigs = fs
  .readdirSync(LIVE2D)
  .filter((id) => fs.existsSync(path.join(LIVE2D, id, 'rig.json')))
  .map((id) => JSON.parse(fs.readFileSync(path.join(LIVE2D, id, 'rig.json'), 'utf8')));

test('every rig has an indifferent mood', () => {
  for (const rig of rigs) {
    assert.ok(rig.expressions?.moods?.indifferent, `${rig.character}: no indifferent mood`);
  }
});

test('a flat answer never plays an angry or annoyed face', () => {
  for (const rig of rigs) {
    for (const tier of DIALOGUE_TIERS) {
      const reaction = resolveReaction(rig, 'answerFlat', tier);
      for (const mood of [reaction.mood, reaction.then?.[1]].filter(Boolean)) {
        assert.ok(!/annoyed|upset|serious|displeased|irritated/.test(mood), `${rig.character} ${tier}: mood ${mood}`);
        for (const exp of rig.expressions.moods[mood] ?? []) {
          assert.ok(!ANGRY.test(exp), `${rig.character} ${tier}: ${mood} plays ${exp}`);
        }
      }
    }
  }
});
