// Pins how a setting is weighted once the character is already drawn (the
// character-first order itself is guarded in
// roam-uniform-distribution.test.js):
// signature spots repeat in a character's turf pool, _PM files outweigh day
// files after EVENING_HOUR, and the public (campus) encounter keeps drawing its
// character first and its backdrop from the shared Darkwick pool regardless.
import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { getCharacterById } from '../constants/characters.js';
import {
  EVENING_PM_WEIGHT,
  TURF_PROBABILITY,
  backgroundPath,
  isEveningBackground,
  roamTurfProbability,
  turfSpots,
} from '../constants/backgrounds.js';
import {
  ENCOUNTER_LOCATIONS,
  generateEncounter,
} from '../constants/publicEncounters.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Midday and late evening in America/Chicago (CDT, UTC-5).
const DAY = new Date('2026-06-15T12:00:00-05:00');
const EVENING = new Date('2026-06-15T21:00:00-05:00');

function countsByFile(spots) {
  const counts = new Map();
  for (const { file } of spots) counts.set(file, (counts.get(file) || 0) + 1);
  return counts;
}

test("a signature spot repeats more than the rest of the character's turf", () => {
  const counts = countsByFile(turfSpots(getCharacterById('jin'), DAY));
  // Jin's room is weighted 4x; his house's ordinary spots are 1x.
  assert.strictEqual(
    counts.get('Frostheim_Jin_Room.png'),
    4 * counts.get('Frostheim_Ballroom.png'),
  );
});

test("Rui's 1.5x signature spot keeps its exact ratio", () => {
  const counts = countsByFile(turfSpots(getCharacterById('rui'), DAY));
  assert.strictEqual(
    counts.get('Obscuary_Bar.png') / counts.get('Obscuary_Entrance.png'),
    1.5,
  );
});

test('an off-turf signature spot pins that one file, not its whole location', () => {
  const spots = turfSpots(getCharacterById('ren'), DAY);
  const files = [...countsByFile(spots).keys()];
  assert.ok(files.includes('Darkwick_Mystery_Diner.png'));
  assert.deepStrictEqual(
    files.filter(
      (f) => f.startsWith('Darkwick_') && f !== 'Darkwick_Mystery_Diner.png',
    ),
    [],
  );
});

test('Haru can turn up at the Obscuary bar, unboosted', () => {
  const counts = countsByFile(turfSpots(getCharacterById('haru'), DAY));
  assert.strictEqual(
    counts.get('Obscuary_Bar.png'),
    counts.get('Jabberwock_Entrance.png'),
  );
});

test('/roam finds Benkei on turf less often than everyone else', () => {
  assert.ok(roamTurfProbability(getCharacterById('benkei')) < TURF_PROBABILITY);
  assert.strictEqual(
    roamTurfProbability(getCharacterById('jin')),
    TURF_PROBABILITY,
  );
});

test('turf draws no _PM backgrounds by day', () => {
  const spots = turfSpots(getCharacterById('kaito'), DAY);
  assert.ok(spots.length > 0);
  assert.ok(spots.every(({ file }) => !isEveningBackground(file)));
});

test('after 6 PM a _PM turf background outweighs its day counterpart', () => {
  const counts = countsByFile(turfSpots(getCharacterById('kaito'), EVENING));
  assert.strictEqual(
    counts.get('Frostheim_Entrance_PM.png'),
    EVENING_PM_WEIGHT * counts.get('Frostheim_Entrance.png'),
  );
});

test('a public encounter draws its character before its background', () => {
  const src = fs.readFileSync(
    path.join(__dirname, '..', 'constants/publicEncounters.js'),
    'utf8',
  );
  const body = src.slice(src.indexOf('export function generateEncounter'));
  const atCharacter = body.indexOf('pickRandom(CHARACTERS)');
  const atSpot = body.indexOf('pickEncounterBackground(now)');
  assert.ok(atCharacter !== -1 && atSpot !== -1);
  assert.ok(
    atCharacter < atSpot,
    'character must be drawn before the background',
  );
});

test('a public encounter backdrop is from the shared pool, in its folder', () => {
  for (const now of [DAY, EVENING]) {
    for (let i = 0; i < 50; i++) {
      const encounter = generateEncounter(now);
      assert.ok(ENCOUNTER_LOCATIONS.includes(encounter.locationKey));
      assert.ok(backgroundPath(encounter.background).startsWith('darkwick/'));
      if (now === DAY) assert.ok(!isEveningBackground(encounter.background));
    }
  }
});
