// Live2D touch lines (constants/hangout/<id>.js): every rigged character
// has a pool for every trigger at every authored tier, and the lines follow
// the house rules the dialogue validator checks for constants/dialogue/.
import { test } from 'node:test';
import assert from 'node:assert';
import { existsSync, readFileSync, readdirSync } from 'node:fs';

import { TOUCH_SPOTS } from '../activity/src/hangout/reactions.js';

const DIR = new URL('../constants/hangout/', import.meta.url);
const TIERS = ['new', 'known', 'warm', 'spark'];
const TRIGGERS = [
  'headPat', 'cheekPoke', 'lipsTouch', 'earTouch', 'handTap',
  'chestTouch', 'bellyTouch', 'hipsTouch', 'upset',
];
const BANNED = [/—/, /\bdeadpan/i];
// `tier` and the tiers below it, nearest first (a missing pool's fallback).
const DIALOGUE_TIERS_UP_TO = (tier) => ['new', 'known', 'warm', 'spark', 'close', 'bound'].slice(0, ['new', 'known', 'warm', 'spark', 'close', 'bound'].indexOf(tier) + 1).reverse();

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
// Removable articles (rig.json `outfits.<name>.articles`, articles.js): below
// the unlock tier (warm) an article can't come off, so a trigger whose spot
// it covers in every outfit (Shion's hat over his head, Peekaboo over Haru's
// belly) can't play there and may be left out. The article's own
// `<article>Pat` pool has to be there instead (checked like the rest below).
const UNLOCK = ['new', 'known'];
function coveredBelowUnlock(id) {
  const file = new URL(`../assets/live2d/${id}/rig.json`, import.meta.url);
  if (!existsSync(file)) return () => null;
  const outfits = Object.values(JSON.parse(readFileSync(file, 'utf8')).outfits ?? {});
  const at = (covers, tier) => (covers?.byTier ? covers.byTier[tier] ?? (tier === 'known' ? covers.byTier.new : undefined) : covers);
  // The article covering `trigger`'s spot at `tier` in every outfit, or null.
  return (trigger, tier) => {
    if (!UNLOCK.includes(tier)) return null;
    const names = outfits.map((o) => Object.entries(o.articles ?? {}).find(([, a]) => !a.shownOnly && a.blocks !== false && [at(a.covers, tier)].flat().some((spot) => TOUCH_SPOTS[spot] === trigger))?.[0]);
    return names.length && names.every((n) => n && n === names[0]) ? names[0] : null;
  };
}

for (const file of files) {
  test(`hangout lines: ${file}`, async () => {
    const { default: lines } = await import(new URL(file, DIR));
    const covered = coveredBelowUnlock(file.replace(/\.js$/, ''));

    for (const tier of TIERS) {
      assert.ok(lines[tier], `${file}: no ${tier} tier`);
      // Article pools (hatPat, peekabooOff...) follow the same house rules.
      const articlePools = Object.keys(lines[tier]).filter((k) => /^[a-z]+(Pat|Off)$/.test(k));
      // So do pools a rig hotspot names for itself (Haru's prostheticTap).
      const spotPools = Object.keys(lines[tier]).filter((k) => /^[a-z]+Tap$/.test(k) && !TRIGGERS.includes(k));
      for (const trigger of [...TRIGGERS, ...articlePools, ...spotPools]) {
        const article = covered(trigger, tier);
        if (article && !lines[tier][trigger]) {
          const pat = DIALOGUE_TIERS_UP_TO(tier).map((t) => lines[t]?.[`${article}Pat`]).find(Boolean);
          assert.ok(pat?.length, `${file}: ${tier}.${trigger} is left to ${article}, but there's no ${article}Pat`);
          continue;
        }
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
