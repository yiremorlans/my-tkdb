// The meet/roam split (constants/meet/, constants/roam/): a tier can move out
// of the shared `dialogue` pool into one pool per command. These prove the
// draw reads the right pool for each command, the validator keeps the two
// halves in step, and every split tier hits its size and mood targets.
//
// The draw and validator cases inject a split into Jin's 'known' and 'warm'
// tiers and put everything back afterwards, so they don't depend on which
// characters have been split for real.
import { test } from 'node:test';
import assert from 'node:assert';
import {
  CHARACTERS,
  dialogueBeatKey,
  dialogueTierPool,
  getRandomDialogueBeat,
  getRandomDialogueEntry,
} from '../constants/characters.js';
import { DIALOGUE, MEET_DIALOGUE, POOL_DIALOGUE, ROAM_DIALOGUE } from '../constants/dialogue.js';
import { DIALOGUE_POOL, DIALOGUE_POOL_KEYS } from '../constants/dialoguePools.js';
import { SPLIT_MOOD_TARGET_BY_TIER, SPLIT_POOL_TARGET_BY_TIER } from '../constants/game.js';
import { validateContent } from '../constants/validateContent.js';

const TIERS = ['new', 'known', 'warm', 'spark', 'close', 'bound'];
const DAY = new Date('2026-01-01T12:00:00');
const jin = CHARACTERS.find((c) => c.id === 'jin');

// A /meet beat made from a shared one: spoken line only, no approach/greeting.
const asMeet = (beat) => ({ line: `"Meet: ${beat.line}"`, responses: beat.responses });

// Split Jin's `tier` the way the tier-split skill does: /roam keeps the shared
// beats, /meet gets its own, and the shared tier is deleted. Returns undo.
function splitJin(tier) {
  const shared = DIALOGUE.jin.dialogue[tier];
  ROAM_DIALOGUE.jin[tier] = shared;
  MEET_DIALOGUE.jin[tier] = shared.map(asMeet);
  delete DIALOGUE.jin.dialogue[tier];
  return () => {
    DIALOGUE.jin.dialogue[tier] = shared;
    delete ROAM_DIALOGUE.jin[tier];
    delete MEET_DIALOGUE.jin[tier];
  };
}

function withSplit(tiers, fn) {
  const undo = tiers.map(splitJin);
  try {
    fn();
  } finally {
    undo.reverse().forEach((u) => u());
  }
}

const keys = (beats) => new Set(beats.map((b) => dialogueBeatKey(b.line)));
const times = (n, f) => Array.from({ length: n }, f);

test('an unknown pool key throws instead of quietly drawing the shared pool', () => {
  assert.throws(() => dialogueTierPool('jin', 'dat', 'new'), /Unknown dialogue pool "dat"/);
});

test('a split tier draws /meet from constants/meet/ and /roam from constants/roam/', () => {
  withSplit(['known'], () => {
    const meetKeys = keys(MEET_DIALOGUE.jin.known);
    const roamKeys = keys(ROAM_DIALOGUE.jin.known);
    for (const { beatKey } of times(40, () => getRandomDialogueEntry(jin, 'known', null, { now: DAY }))) {
      assert.ok(meetKeys.has(beatKey), '/meet drew a beat outside its split pool');
    }
    for (const { beatKey, greeting } of times(40, () => getRandomDialogueBeat(jin, 'known', null, { now: DAY }))) {
      assert.ok(roamKeys.has(beatKey), '/roam drew a beat outside its split pool');
      assert.ok(greeting, '/roam beat lost its greeting');
    }
    assert.strictEqual(dialogueTierPool('jin', DIALOGUE_POOL.MEET, 'known'), MEET_DIALOGUE.jin.known);
    assert.strictEqual(dialogueTierPool('jin', DIALOGUE_POOL.ROAM, 'known'), ROAM_DIALOGUE.jin.known);
  });
});

test('an unsplit tier still draws the shared pool for both commands', () => {
  withSplit(['known'], () => {
    const shared = keys(DIALOGUE.jin.dialogue.new);
    assert.ok(shared.has(getRandomDialogueEntry(jin, 'new', null, { now: DAY }).beatKey));
    assert.ok(shared.has(getRandomDialogueBeat(jin, 'new', null, { now: DAY }).beatKey));
    assert.strictEqual(dialogueTierPool('jin', DIALOGUE_POOL.MEET, 'new'), DIALOGUE.jin.dialogue.new);
  });
});

test('TIER_MIX mixes in the earlier tier from the same command', () => {
  withSplit(['warm'], () => {
    // rand 0.05 takes the mix: spark draws a warm beat.
    const mix = { now: DAY, rand: () => 0.05 };
    assert.ok(keys(MEET_DIALOGUE.jin.warm).has(getRandomDialogueEntry(jin, 'spark', null, mix).beatKey));
    assert.ok(keys(ROAM_DIALOGUE.jin.warm).has(getRandomDialogueBeat(jin, 'spark', null, mix).beatKey));
  });
});

test('validateContent accepts a split done in both commands', () => {
  withSplit(['known'], () => {
    assert.doesNotThrow(() => validateContent());
  });
});

test('validateContent rejects a tier split for one command only', () => {
  withSplit(['known'], () => {
    const meet = MEET_DIALOGUE.jin.known;
    delete MEET_DIALOGUE.jin.known;
    try {
      assert.throws(() => validateContent(), /jin "known" is split for roam only/);
    } finally {
      MEET_DIALOGUE.jin.known = meet;
    }
  });
});

test('validateContent rejects a split tier still left in the shared pool', () => {
  withSplit(['known'], () => {
    DIALOGUE.jin.dialogue.known = ROAM_DIALOGUE.jin.known;
    try {
      assert.throws(() => validateContent(), /jin dialogue\[known\] is split into meet\/roam and never drawn/);
    } finally {
      delete DIALOGUE.jin.dialogue.known;
    }
  });
});

test('validateContent rejects the same beat in both meet and roam', () => {
  withSplit(['known'], () => {
    const dupe = { line: ROAM_DIALOGUE.jin.known[0].line, responses: ROAM_DIALOGUE.jin.known[0].responses };
    MEET_DIALOGUE.jin.known.push(dupe);
    try {
      assert.throws(() => validateContent(), /jin has the same beat in meet and roam/);
    } finally {
      MEET_DIALOGUE.jin.known.pop();
    }
  });
});

test('validateContent rejects an approach or greeting on a /meet beat, and a /roam beat without an approach', () => {
  withSplit(['known'], () => {
    const meetBeat = MEET_DIALOGUE.jin.known[0];
    meetBeat.greeting = '"Unseen."';
    try {
      assert.throws(() => validateContent(), /jin meet\[known\] beat has a greeting, which \/meet never renders/);
    } finally {
      delete meetBeat.greeting;
    }
    const roamBeat = { ...ROAM_DIALOGUE.jin.known[0], line: '"No approach."' };
    delete roamBeat.approach;
    ROAM_DIALOGUE.jin.known = [...ROAM_DIALOGUE.jin.known, roamBeat];
    try {
      assert.throws(() => validateContent(), /jin roam\[known\] beat has no valid approach label/);
    } finally {
      ROAM_DIALOGUE.jin.known = ROAM_DIALOGUE.jin.known.slice(0, -1);
    }
  });
});

// The targets, per pool and tier. Jo's variant map carries the same beats once
// per outfit, so each variant is counted on its own.
test('every pool tier hits its size and mood targets', () => {
  const problems = [];
  for (const command of DIALOGUE_POOL_KEYS) {
    for (const [id, pool] of Object.entries(POOL_DIALOGUE[command])) {
      for (const tier of TIERS) {
        const data = pool[tier];
        if (data === undefined) continue;
        const variants = Array.isArray(data) ? { '': data } : data;
        for (const [variant, beats] of Object.entries(variants)) {
          const at = `${id} ${command}.${tier}${variant ? `.${variant}` : ''}`;
          const size = SPLIT_POOL_TARGET_BY_TIER[command][tier];
          const moods = SPLIT_MOOD_TARGET_BY_TIER[command][tier];
          const gotMoods = beats.filter((b) => b.mood === true).length;
          if (beats.length !== size) problems.push(`${at}: ${beats.length} beats, target ${size}`);
          if (gotMoods !== moods) problems.push(`${at}: ${gotMoods} moods, target ${moods}`);
        }
      }
    }
  }
  assert.deepStrictEqual(problems, []);
});
