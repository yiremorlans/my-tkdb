// Pure logic: day/evening cutoff, background eligibility. Timezone-sensitive
// by design — isEveningHour checks the hour in EVENING_TIMEZONE
// (America/Chicago) explicitly via Intl, independent of the host process's
// own ambient timezone (see EVENING_TIMEZONE's comment for why: a plain
// now.getHours() would depend on process.env.TZ, which isn't reliably
// pinned). A Date has no timezone of its own — it's one absolute instant —
// so atHour() below writes the -05:00 offset explicitly in the ISO string
// to build "that hour, in Chicago" as an instant, rather than using local
// Date methods, which would only happen to line up if this test process's
// own TZ were also America/Chicago.
import { test } from 'node:test';
import assert from 'node:assert';
import {
  isEveningHour,
  timeBucket,
  isEveningBackground,
  isGeneralLocation,
  getAvailableBackgrounds,
  weightedBackgrounds,
  EVENING_HOUR,
  EVENING_PM_WEIGHT,
  HOUSES,
  GENERAL_LOCATIONS,
  EVENT_LOCATIONS,
} from '../constants/backgrounds.js';

// June 15 2026 is CDT (UTC-5) in America/Chicago (verified: Intl reports
// "CDT" for this date) — fixed to one known date/offset rather than
// deriving it, so this doesn't need to reason about DST transitions.
function atHour(hour) {
  return new Date(`2026-06-15T${String(hour).padStart(2, '0')}:00:00-05:00`);
}

test('isEveningHour is false right up to the cutoff and true from it on', () => {
  assert.strictEqual(isEveningHour(atHour(EVENING_HOUR - 1)), false);
  assert.strictEqual(isEveningHour(atHour(EVENING_HOUR)), true);
  assert.strictEqual(isEveningHour(atHour(23)), true);
  assert.strictEqual(isEveningHour(atHour(0)), false);
});

test('timeBucket returns null with no clock context, so a `when.time` rule simply never matches', () => {
  assert.strictEqual(timeBucket(null), null);
  assert.strictEqual(timeBucket(undefined), null);
});

test('timeBucket returns "day" or "evening" derived from the same isEveningHour cutoff', () => {
  assert.strictEqual(timeBucket(atHour(EVENING_HOUR - 1)), 'day');
  assert.strictEqual(timeBucket(atHour(EVENING_HOUR)), 'evening');
});

test('isEveningBackground recognizes the _PM filename convention', () => {
  assert.strictEqual(isEveningBackground('Frostheim_Balcony_PM.png'), true);
  assert.strictEqual(isEveningBackground('Frostheim_Ballroom.png'), false);
});

test('isGeneralLocation is true for general and event locations, false for a house', () => {
  assert.strictEqual(isGeneralLocation(GENERAL_LOCATIONS.DARKWICK), true);
  assert.strictEqual(isGeneralLocation(EVENT_LOCATIONS.STAR_FESTIVAL), true);
  assert.strictEqual(isGeneralLocation(HOUSES.FROSTHEIM), false);
});

test('getAvailableBackgrounds excludes _PM backgrounds during the day', () => {
  const day = getAvailableBackgrounds(HOUSES.FROSTHEIM, atHour(EVENING_HOUR - 1));
  assert.ok(day.length > 0, 'Frostheim should have at least one daytime background');
  assert.ok(day.every((f) => !isEveningBackground(f)), 'no _PM background should be offered during the day');
});

test('getAvailableBackgrounds includes every background (day and _PM) in the evening', () => {
  const day = getAvailableBackgrounds(HOUSES.FROSTHEIM, atHour(EVENING_HOUR - 1));
  const evening = getAvailableBackgrounds(HOUSES.FROSTHEIM, atHour(EVENING_HOUR));
  assert.ok(evening.length > day.length, 'evening should be a strict superset that adds the _PM backgrounds');
  assert.ok(evening.some((f) => isEveningBackground(f)));
});

test('weightedBackgrounds repeats each _PM file EVENING_PM_WEIGHT times in the evening', () => {
  const day = getAvailableBackgrounds(HOUSES.FROSTHEIM, atHour(EVENING_HOUR - 1));
  const evening = getAvailableBackgrounds(HOUSES.FROSTHEIM, atHour(EVENING_HOUR));
  const pmFiles = evening.filter((f) => isEveningBackground(f));
  const dayFiles = evening.filter((f) => !isEveningBackground(f));
  assert.ok(pmFiles.length > 0, 'fixture assumption: Frostheim has at least one _PM background');

  const weighted = weightedBackgrounds(HOUSES.FROSTHEIM, atHour(EVENING_HOUR));

  for (const file of pmFiles) {
    const count = weighted.filter((f) => f === file).length;
    assert.strictEqual(count, EVENING_PM_WEIGHT, `${file} should appear ${EVENING_PM_WEIGHT}x in the weighted pool`);
  }
  for (const file of dayFiles) {
    const count = weighted.filter((f) => f === file).length;
    assert.strictEqual(count, 1, `${file} should appear exactly once (unweighted) in the weighted pool`);
  }
  assert.strictEqual(weighted.length, dayFiles.length + pmFiles.length * EVENING_PM_WEIGHT);
  // Sanity check against the fixture read at the top of this file: this
  // isn't asserting a coincidence, it's asserting the actual weighting math.
  assert.deepStrictEqual(new Set(weighted), new Set(day.concat(pmFiles)), 'no file should be invented or dropped, only repeated');
});

test('weightedBackgrounds applies no weighting during the day (no _PM files present to weight)', () => {
  const day = getAvailableBackgrounds(HOUSES.FROSTHEIM, atHour(EVENING_HOUR - 1));
  const weighted = weightedBackgrounds(HOUSES.FROSTHEIM, atHour(EVENING_HOUR - 1));
  assert.deepStrictEqual(weighted, day);
});

test('getAvailableBackgrounds returns an empty list for an unknown location', () => {
  assert.deepStrictEqual(getAvailableBackgrounds('not-a-real-location', atHour(12)), []);
});
