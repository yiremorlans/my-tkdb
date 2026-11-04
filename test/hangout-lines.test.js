// Live2D touch lines (constants/hangout/<id>.js): every rigged character
// has a pool for every trigger at every authored tier, and the lines follow
// the house rules the dialogue validator checks for constants/dialogue/.
import { test } from 'node:test';
import assert from 'node:assert';
import { readdirSync } from 'node:fs';

const DIR = new URL('../constants/hangout/', import.meta.url);
const TIERS = ['new', 'known', 'warm', 'spark'];
const TRIGGERS = [
  'headPat', 'cheekPoke', 'lipsTouch', 'earTouch', 'handTap',
  'chestTouch', 'bellyTouch', 'hipsTouch', 'upset',
];
const BANNED = [/—/, /\bdeadpan/i];

const files = readdirSync(DIR).filter((f) => f.endsWith('.js'));

test('every Live2D character has a touch-line file', () => {
  const rigged = readdirSync(new URL('../assets/live2d/', import.meta.url), { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name !== 'vendor')
    .map((d) => d.name);
  for (const id of rigged) assert.ok(files.includes(`${id}.js`), `${id} has no constants/hangout/${id}.js`);
});

// Holds (activity/src/hangout/preview.js): a line on letting go of each
// hold from spark to bound, the caught tease's line at close and the break
// line at bound, and `teaseLetGo` (tease let go before its crest) at bound.
// `bound` carries only these; its touch triggers fall back to close.
const HOLD_POOLS = {
  spark: ['heartbeatHold', 'lipHold', 'handHold'],
  close: ['heartbeatHold', 'lipHold', 'handHold', 'caughtTease'],
  bound: ['heartbeatHold', 'lipHold', 'handHold', 'breakAway', 'teaseLetGo'],
};

// One test per character file: its touch pools, its hold pools, and its
// `daytime` set if it has one. A `daytime` set (Towa, who can't speak by day)
// covers the same tiers, triggers and holds, with no words in it: hums and
// sounds only, no letters at all.
for (const file of files) {
  test(`hangout lines: ${file}`, async () => {
    const { default: lines } = await import(new URL(file, DIR));

    for (const tier of TIERS) {
      assert.ok(lines[tier], `${file}: no ${tier} tier`);
      for (const trigger of TRIGGERS) {
        const pool = lines[tier][trigger];
        assert.ok(Array.isArray(pool) && pool.length, `${file}: ${tier}.${trigger} is empty`);
        for (const line of pool) {
          assert.equal(typeof line, 'string');
          assert.ok(line.trim(), `${file}: ${tier}.${trigger} has a blank line`);
          for (const re of BANNED) assert.ok(!re.test(line), `${file}: ${tier}.${trigger} "${line}" matches ${re}`);
        }
      }
    }

    for (const [prefix, tiers] of lines.daytime ? [['', lines], ['daytime.', lines.daytime]] : [['', lines]]) {
      for (const [tier, pools] of Object.entries(HOLD_POOLS)) {
        for (const trigger of pools) {
          const pool = tiers[tier]?.[trigger];
          assert.ok(Array.isArray(pool) && pool.length, `${file}: ${prefix}${tier}.${trigger} is empty`);
          for (const line of pool) {
            assert.ok(typeof line === 'string' && line.trim(), `${file}: ${prefix}${tier}.${trigger} has a blank line`);
            for (const re of BANNED) assert.ok(!re.test(line), `${file}: ${prefix}${tier}.${trigger} "${line}" matches ${re}`);
            if (prefix) assert.ok(!/\p{L}/u.test(line), `${file}: daytime.${tier}.${trigger} "${line}" has words`);
          }
        }
      }
    }

    if (lines.daytime) {
      for (const tier of TIERS) {
        for (const trigger of TRIGGERS) {
          const pool = lines.daytime[tier]?.[trigger];
          assert.ok(Array.isArray(pool) && pool.length, `${file}: daytime.${tier}.${trigger} is empty`);
          for (const line of pool) assert.ok(!/\p{L}/u.test(line), `${file}: daytime.${tier}.${trigger} "${line}" has words`);
        }
      }
    }
  });
}
