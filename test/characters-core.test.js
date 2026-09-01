// Pure logic against the real character catalog: id/alias resolution,
// affinity scoring per response type, name formatting, and location-based
// character selection. No DB, no I/O.
import { test } from 'node:test';
import assert from 'node:assert';
import {
  getAffinityForResponse,
  getCharacterById,
  getCharactersForLocation,
  getFullName,
  RESPONSE_TYPES,
  CHARACTERS,
} from '../constants/characters.js';
import { HOUSES, CHARACTER_ROOMS } from '../constants/backgrounds.js';

const ren = getCharacterById('ren');
const shohei = getCharacterById('shohei');
const benkei = getCharacterById('benkei'); // has no lastName

test('getCharacterById resolves canonical ids', () => {
  assert.ok(ren, 'fixture assumption: "ren" exists in the catalog');
  assert.strictEqual(ren.id, 'ren');
});

test('getCharacterById resolves an alias, case-insensitively and trimmed', () => {
  assert.ok(shohei, 'fixture assumption: "shohei" (alias "sho") exists in the catalog');
  assert.strictEqual(getCharacterById('sho')?.id, 'shohei');
  assert.strictEqual(getCharacterById('SHO')?.id, 'shohei');
  assert.strictEqual(getCharacterById('  sho  ')?.id, 'shohei');
});

test('getCharacterById returns null for an unknown or empty id', () => {
  assert.strictEqual(getCharacterById('not-a-real-character'), null);
  assert.strictEqual(getCharacterById(''), null);
  assert.strictEqual(getCharacterById(null), null);
  assert.strictEqual(getCharacterById(undefined), null);
});

test('every character resolves by its own id, with or without an aliases field', () => {
  for (const c of CHARACTERS) {
    assert.strictEqual(getCharacterById(c.id)?.id, c.id, `${c.id} should resolve by its canonical id`);
    assert.strictEqual(getCharacterById(c.id.toUpperCase())?.id, c.id, `${c.id} should resolve case-insensitively`);
  }
});

test('the aliases field, where present, is a normalized string array that collides with nothing', () => {
  const ids = new Set(CHARACTERS.map((c) => c.id));
  const claimedBy = new Map();
  for (const c of CHARACTERS) {
    if (!('aliases' in c)) continue; // characters without aliases are fine — nothing to check
    assert.ok(Array.isArray(c.aliases), `${c.id}.aliases must be an array when present`);
    for (const alias of c.aliases) {
      assert.strictEqual(typeof alias, 'string', `alias on ${c.id} must be a string`);
      assert.strictEqual(alias, alias.trim().toLowerCase(), `alias "${alias}" on ${c.id} must be stored lowercase and trimmed (getCharacterById only normalizes the lookup, not the catalog)`);
      assert.ok(!ids.has(alias), `alias "${alias}" on ${c.id} shadows a real character id`);
      assert.ok(!claimedBy.has(alias), `alias "${alias}" is claimed by both ${claimedBy.get(alias)} and ${c.id}`);
      claimedBy.set(alias, c.id);
      assert.strictEqual(getCharacterById(alias)?.id, c.id, `alias "${alias}" should resolve to ${c.id}`);
    }
  }
});

test('getAffinityForResponse always yields 0 for NEUTRAL, regardless of character', () => {
  assert.strictEqual(getAffinityForResponse(ren, RESPONSE_TYPES.NEUTRAL), 0);
});

test('getAffinityForResponse reads the character\'s own KIND/PLAYFUL/BOLD ranking', () => {
  // ren: { kind: 0, playful: 1, bold: 2 }
  assert.strictEqual(getAffinityForResponse(ren, RESPONSE_TYPES.KIND), 0);
  assert.strictEqual(getAffinityForResponse(ren, RESPONSE_TYPES.PLAYFUL), 1);
  assert.strictEqual(getAffinityForResponse(ren, RESPONSE_TYPES.BOLD), 2);
});

test('getAffinityForResponse defaults to 0 for a response type missing from affinityByResponse', () => {
  assert.strictEqual(getAffinityForResponse({ affinityByResponse: {} }, RESPONSE_TYPES.KIND), 0);
});

test('getFullName joins first and last name when both are present', () => {
  assert.strictEqual(getFullName(shohei), 'Shohei Haizono');
});

test('getFullName falls back to the first name alone when there is no last name', () => {
  assert.ok(benkei, 'fixture assumption: "benkei" exists and has no lastName');
  assert.strictEqual(getFullName(benkei), benkei.firstName);
});

test('getCharactersForLocation(isGeneral=true) returns every character regardless of location', () => {
  const result = getCharactersForLocation('anything', true);
  assert.strictEqual(result.length, CHARACTERS.length);
});

test('getCharactersForLocation resolves a character-exclusive room', () => {
  const result = getCharactersForLocation(CHARACTER_ROOMS.REN, false);
  assert.ok(result.some((c) => c.id === 'ren'));
});

test('getCharactersForLocation falls back to house membership when no room matches', () => {
  const result = getCharactersForLocation(HOUSES.JABBERWOCK, false);
  assert.ok(result.some((c) => c.id === 'ren'), 'ren belongs to Jabberwock house');
});
