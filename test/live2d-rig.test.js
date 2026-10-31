// live2d-rig.js adding an outfit to an existing, hand-tuned rig.json, and
// finding the hand art each pose swaps in.
import { test } from 'node:test';
import assert from 'node:assert';

import { outfitEntry, spliceOutfit, withPoseHands } from '../activity/tools/live2d-rig.js';

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

// A drawable: id, ancestor parts (nearest first), box, shown or hidden.
const d = (id, parts, box, on = true) => ({ id, parts, box, opacity: on ? 1 : 0 });

test('withPoseHands adds the hand art poses swap in, keeping the rest pick first', () => {
  const rest = [
    d('hand', ['PartHandR', 'PartArmR'], [600, 1300, 700, 1580]),
    d('cuff', ['PartHandR', 'PartArmR'], [600, 1250, 700, 1320]), // trimmed off the pick
    d('wave', ['PartHandR', 'PartArmR'], [0, 0, 0, 0], false),
    d('point', ['PartHand7', 'PartArmR'], [0, 0, 0, 0], false),
    d('never', ['PartHandR', 'PartArmR'], [0, 0, 0, 0], false),
    d('forearm', ['PartArmR2', 'PartArmR'], [620, 1000, 720, 1300]),
    d('other', ['PartHandL', 'PartArmL'], [0, 0, 0, 0], false),
  ];
  const frames = [
    // Same hand group, raised: the arm's lowest piece is the forearm now.
    [d('wave', ['PartHandR', 'PartArmR'], [500, 500, 700, 700]), d('forearm', ['PartArmR2', 'PartArmR'], [600, 700, 700, 1000])],
    // Another PartHand* group in the same arm.
    [d('point', ['PartHand7', 'PartArmR'], [500, 900, 700, 1100]), d('other', ['PartHandL', 'PartArmL'], [1300, 1300, 1400, 1500])],
  ];
  assert.deepStrictEqual(withPoseHands(rest, frames, ['hand']), ['hand', 'wave', 'point']);
});

test('withPoseHands falls back to a rest-hidden group ending lowest on the arm', () => {
  // Yuri's surprised hand: unnamed groups, none of the hand group showing.
  const rest = [
    d('hand', ['Part17', 'PartArmL'], [1250, 1300, 1350, 1560]),
    d('spread', ['Part22', 'PartArmL'], [0, 0, 0, 0], false),
    d('elbow', ['Part29', 'PartArmL'], [0, 0, 0, 0], false),
    d('sleeve', ['Part40', 'PartArmL'], [1150, 700, 1350, 1100]),
  ];
  const frames = [[
    d('spread', ['Part22', 'PartArmL'], [1200, 1290, 1390, 1430]),
    d('elbow', ['Part29', 'PartArmL'], [1250, 980, 1320, 1050]),
    d('sleeve', ['Part40', 'PartArmL'], [1150, 700, 1350, 1100]),
  ]];
  assert.deepStrictEqual(withPoseHands(rest, frames, ['hand']), ['hand', 'spread']);
});
