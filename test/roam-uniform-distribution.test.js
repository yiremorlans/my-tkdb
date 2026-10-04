// Pins the property that /roam and /meet select characters uniformly.
//
// This is a regression guard with history behind it. /roam used to pick the
// location first and then choose among whoever was attributed to it, which made
// a character's odds of appearing an accident of three unrelated things: how
// many backgrounds their house happened to hold, how many housemates shared it,
// and whether they owned a private room. The result ranged from 1.73% (Benkei,
// no house at all) to 6.22% (Edward, a three-background private room on top of
// Obscuary) — a 3.6x spread nobody authored, which players noticed as certain
// characters "showing up constantly".
//
// The fix was to invert the sampling order: draw the character uniformly first,
// then draw the setting conditional on them. That makes P(character) exactly
// 1/CHARACTERS.length by construction, and — the point worth protecting — lets
// the background side stay as weighted as the flavor wants (turf probability,
// signature spots, the evening _PM bias) without any of it bending who appears.
//
// These tests therefore assert the *structure* that guarantees uniformity, not
// a sampled distribution: a statistical test would be slow, flaky, and would
// still pass for a subtly biased implementation. No DB, no I/O.
import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CHARACTERS, getCharacterById } from '../constants/characters.js';
import {
  BACKGROUNDS_BY_LOCATION,
  CHARACTER_SIGNATURE_SPOTS,
  attributedLocations,
  getAvailableBackgrounds,
  getRandomBackgroundForCharacter,
  getRandomGeneralBackground,
  weightedBackgrounds,
  GENERAL_LOCATIONS,
  HOUSES,
} from '../constants/backgrounds.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Midday and late evening, so the _PM background swap is covered both ways.
const DAY = new Date('2026-09-03T17:00:00Z');
const EVENING = new Date('2026-09-04T01:00:00Z');

// Executable source of a function, with comments stripped — the ordering
// assertions below must not be satisfiable by prose in a comment.
function codeOf(file, marker) {
  const src = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
  const from = src.indexOf(marker);
  assert.notStrictEqual(from, -1, `fixture assumption: ${marker} exists in ${file}`);
  const body = src.slice(from);
  const end = body.indexOf('\n}\n');
  return body
    .slice(0, end === -1 ? undefined : end)
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split('\n')
    .map((line) => line.replace(/\/\/.*$/, ''))
    .join('\n');
}

test('/roam draws the character before, and independently of, the setting', () => {
  const code = codeOf('encounters.js', 'export async function buildRoamDialogueMessage');

  const atCharacter = code.indexOf('pickRandom(CHARACTERS)');
  const atSpot = code.indexOf('selectRoamSpot(character');

  assert.notStrictEqual(atCharacter, -1, 'character must be drawn with pickRandom(CHARACTERS)');
  assert.notStrictEqual(atSpot, -1, 'setting must be drawn with selectRoamSpot(character, ...)');
  assert.ok(atCharacter < atSpot, 'character must be drawn before the setting');

  // Nothing about where the encounter happens may inform who appears there.
  const beforePick = code.slice(0, atCharacter);
  assert.ok(
    !/\b(spot|locationKey|backgroundFile|selectRoamSpot|weightedBackgrounds)\b/.test(beforePick),
    'no location state may be read before the character is chosen',
  );
});

test('/meet draws the character before the setting too', () => {
  const code = codeOf('encounters.js', 'export async function buildMeetSpawnMessage');
  const atSpot = code.indexOf('getRandomBackgroundForCharacter(character');
  assert.notStrictEqual(atSpot, -1, '/meet resolves its setting from the chosen character');
  assert.ok(
    !/\b(getRandomGeneralBackground|weightedBackgrounds)\b/.test(code.slice(0, atSpot)),
    'no background may be drawn before the character is known',
  );
});

test('a character is never shown at a location not attributed to them', () => {
  // The containment property that makes the flat distribution safe to ship: a
  // Mortkranken character can turn up on Mortkranken grounds, in their own
  // room, or out in public — never in Frostheim. It holds because the two
  // branches of selectRoamSpot are each closed: the turf branch pools
  // attributedLocations(character) plus only the exact files named as that
  // character's signature spots (never the rest of their location), and the
  // general branch pools only GENERAL_LOCATIONS, which shares no key with
  // HOUSES.
  //
  // "Attributed" is a statement about scenery, not house standing. Lyca is an
  // Obscuary character; Hotarubi is on her list because she is plausibly seen
  // there, not because she is a member of it. So appearing at a house
  // background is never evidence of belonging to that house.
  const generalKeys = new Set(Object.values(GENERAL_LOCATIONS));
  const houseKeys = new Set(Object.values(HOUSES));

  assert.strictEqual(
    [...generalKeys].filter((key) => houseKeys.has(key)).length,
    0,
    'the general pool must contain no house, or the fallback would leak across houses',
  );

  // The turf branch is pinned exactly by the reachability test below (seen ==
  // attributed); here only the general branch needs sampling, and it does not
  // depend on the character.
  for (const now of [DAY, EVENING]) {
    for (let i = 0; i < 500; i++) {
      const key = getRandomGeneralBackground(now).locationKey;
      assert.ok(generalKeys.has(key), `the general draw reached ${key}, which is not public`);
    }
  }
});

test('Mortkranken characters never reach Frostheim', () => {
  // The concrete case, spelled out: neither Mortkranken character has Frostheim
  // among their locations, so Frostheim scenery must be unreachable for them.
  const mortkranken = CHARACTERS.filter((c) => c.house === 'Mortkranken');
  assert.ok(mortkranken.length > 0, 'fixture assumption: Mortkranken has characters');

  for (const character of mortkranken) {
    assert.ok(
      !attributedLocations(character).includes('Frostheim'),
      `fixture assumption: ${character.id} has no Frostheim location`,
    );
    for (const now of [DAY, EVENING]) {
      const seen = new Set();
      for (let i = 0; i < 3000; i++) {
        seen.add(getRandomBackgroundForCharacter(character, now).locationKey);
      }
      assert.ok(!seen.has('Frostheim'), `${character.id} reached Frostheim`);
    }
  }
});

test('every character has a reachable setting at any hour', () => {
  for (const now of [DAY, EVENING]) {
    for (const character of CHARACTERS) {
      const turf = getRandomBackgroundForCharacter(character, now);
      // A character with no turf at all would fall back to the general pool.
      const spot = turf || getRandomGeneralBackground(now);
      assert.ok(spot?.file, `${character.id} has no reachable background`);
    }
  }
});

// The location an off-turf signature spot pins in (Ren's Mystery Diner ->
// Darkwick), if that file is eligible right now.
function signatureLocations(character, now) {
  const files = Object.keys(CHARACTER_SIGNATURE_SPOTS[character.id] || {});
  return Object.entries(BACKGROUNDS_BY_LOCATION)
    .filter(([key, list]) =>
      files.some(
        (f) => list.includes(f) && getAvailableBackgrounds(key, now).includes(f),
      ),
    )
    .map(([key]) => key);
}

test('a character reaches their attributed locations and signature spots, and nothing else', () => {
  for (const now of [DAY, EVENING]) {
    for (const character of CHARACTERS) {
      const expected = new Set([
        ...attributedLocations(character).filter(
          (key) => weightedBackgrounds(key, now).length,
        ),
        ...signatureLocations(character, now),
      ]);
      if (expected.size === 0) continue; // no turf at all

      const seen = new Set();
      for (let i = 0; i < 2000; i++) {
        seen.add(getRandomBackgroundForCharacter(character, now).locationKey);
      }

      assert.deepStrictEqual(
        [...seen].sort(),
        [...expected].sort(),
        `${character.id} should reach exactly its attributed locations ` +
          'and signature spots',
      );
    }
  }
});

test('a borrowed location is reachable without changing the character\'s house', () => {
  // The three characters who can be found outside their own house. This is the
  // reason attributedLocations exists: before it they could only ever be shown
  // on their own house's turf, while the old location-first draw still counted
  // the borrowed house as extra chances to be *picked*. Exactly backwards — a
  // borrowed location should widen where they appear and nothing else.
  const expectations = {
    tohma: { house: 'Frostheim', alsoSeenAt: ['Vagastrom', 'Jin_Room'] },
    lyca: { house: 'Obscuary', alsoSeenAt: ['Hotarubi'] },
    haru: { house: 'Jabberwock', alsoSeenAt: ['Dionysia'] },
  };

  for (const [id, { house, alsoSeenAt }] of Object.entries(expectations)) {
    const character = getCharacterById(id);
    assert.ok(character, `fixture assumption: "${id}" exists in the catalog`);

    // Borrowing scenery must never make someone a second house's character.
    assert.strictEqual(
      character.house,
      house,
      `${id} belongs to exactly one house, and it is ${house}`,
    );

    for (const location of [house, ...alsoSeenAt]) {
      assert.ok(
        attributedLocations(character).includes(location),
        `${id} should be reachable at ${location}`,
      );
    }
  }
});

test('every character belongs to exactly one house', () => {
  // The catalog invariant that /house depends on: buildHouseMessage tallies
  // affinity by character.house alone, so a character with two houses would
  // silently have their bond counted once and attributed to whichever came
  // first. additionalLocations is scenery and must never be read as standing.
  for (const character of CHARACTERS) {
    if (character.house === null) continue; // Benkei is houseless by design
    assert.strictEqual(
      typeof character.house,
      'string',
      `${character.id} must have exactly one house, or null`,
    );
  }
});

test('/meet places a houseless character the way /roam does', () => {
  // A housed character is always on turf in /meet; Benkei's turf is only his
  // pinned campus store, so /meet mixes in general locations for him instead
  // of showing the store every time.
  const code = codeOf(
    'encounters.js',
    'export async function buildMeetSpawnMessage',
  );
  assert.match(
    code,
    /character\.house\s*\?\s*getRandomBackgroundForCharacter\(character, now\)\s*:\s*selectRoamSpot\(character, now, TURF_PROBABILITY\)/,
  );
});

test('Benkei, who has no house, has the campus store as his whole turf', () => {
  const benkei = getCharacterById('benkei');
  assert.ok(benkei, 'fixture assumption: "benkei" exists and has no house');
  assert.strictEqual(attributedLocations(benkei).length, 0);
  for (const now of [DAY, EVENING]) {
    assert.match(
      getRandomBackgroundForCharacter(benkei, now).file,
      /^Darkwick_Campus_Store(_PM)?\.png$/,
    );
  }
});
