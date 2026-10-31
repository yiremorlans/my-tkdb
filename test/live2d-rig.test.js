// live2d-rig.js adding an outfit to an existing, hand-tuned rig.json.
import { test } from 'node:test';
import assert from 'node:assert';

import { outfitEntry, spliceOutfit } from '../activity/tools/live2d-rig.js';

// Hand-tuned layout formatRig wouldn't write: odd spacing, a string with braces.
const TEXT = `{
  "character": "x",
  "outfits": {
    "academy": {"model": "academy/x_academy.model3.json", "dialogueVariant": "uniform"}
  },
  "parts": { "hand_l": ["ArtMesh1", "ArtMesh2"], "ear_r": ["ArtMesh5"] },
  "note":   "a } { [ string"
}
`;

const entry = (model) => ({ model, dialogueVariant: 'casual', parts: { chest: ['ArtMesh9'] }, hotspots: {} });

test('spliceOutfit adds an outfit and leaves the rest of the text alone', () => {
  const out = spliceOutfit(TEXT, 'casual', entry('casual/x_casual.model3.json'));
  assert.deepStrictEqual(Object.keys(JSON.parse(out).outfits), ['academy', 'casual']);
  assert.strictEqual(JSON.parse(out).outfits.casual.model, 'casual/x_casual.model3.json');
  const [head, tail] = TEXT.split('\n  },\n  "parts"');
  assert.ok(out.startsWith(head));
  assert.ok(out.endsWith('\n  },\n  "parts"' + tail));
});

test('spliceOutfit replaces an outfit already there', () => {
  const once = spliceOutfit(TEXT, 'casual', entry('casual/old.model3.json'));
  const twice = spliceOutfit(once, 'casual', entry('casual/x_casual.model3.json'));
  assert.strictEqual(twice, spliceOutfit(TEXT, 'casual', entry('casual/x_casual.model3.json')));
});

test('outfitEntry overrides shared parts the new model lacks, keeps hand trims', () => {
  const existing = JSON.parse(TEXT);
  existing.expressions = { moods: { sad: ['e_komari_00'], smile: ['e_smile_00'] } };
  existing.reactionPoses = { upset: { byTier: { new: 'm_udekumi' } } };
  const built = {
    outfits: { casual: entry('casual/x_casual.model3.json') },
    // hand_l: academy's pair isn't all there, so the outfit names its own;
    // ear_r: the shared one is a trim of the pick, so it's kept.
    parts: { hand_l: ['ArtMesh1'], ear_r: ['ArtMesh5', 'ArtMesh6'] },
  };
  const model3 = { FileReferences: { Expressions: [{ Name: 'e_smile_00' }], Motions: { m_udekumi: [] } } };
  const { entry: e, overrides, missing } = outfitEntry(existing, built, 'casual', model3);
  assert.deepStrictEqual(overrides, ['hand_l']);
  assert.deepStrictEqual(e.parts, { chest: ['ArtMesh9'], hand_l: ['ArtMesh1'] });
  assert.deepStrictEqual(missing, ['e_komari_00']);
});
