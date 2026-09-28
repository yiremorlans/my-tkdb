// Characters whose lives don't fit campus life (Benkei, Jin, Edward, Elias,
// Haru, Rui, Shion, Towa, Zenji) draw from their own set plus the shared
// moments they keep, and no set leaks into anyone else's pool.
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { ENCOUNTER_MILESTONES, milestonePoolFor } from '../constants/publicEncounters.js';

describe('milestonePoolFor', () => {
  it('gives Benkei his own moments plus the shared ones picked for him', () => {
    const pool = milestonePoolFor('benkei');
    const shared = pool.filter((key) => !key.startsWith('benkei_'));
    for (const key of ['coffee_break', 'watched_sunrise', 'made_playlist']) {
      assert.ok(shared.includes(key), key);
    }
    for (const key of ['signed_report', 'walked_to_class', 'movie_night']) {
      assert.ok(!pool.includes(key), key);
    }
  });

  it('gives a character with no file every shared moment', () => {
    const pool = milestonePoolFor('kaito');
    for (const key of ['long_way', 'inside_joke', 'movie_night']) {
      assert.ok(pool.includes(key), key);
    }
  });

  it('never gives a student one of Benkei\'s moments', () => {
    assert.ok(milestonePoolFor('rui').every((key) => !key.startsWith('benkei_')));
  });

  it('keeps Jin to his room-bound moments plus the shared ones that fit', () => {
    const pool = milestonePoolFor('jin');
    for (const key of ['jin_tea', 'jin_waltz', 'movie_night', 'signed_report']) {
      assert.ok(pool.includes(key), key);
    }
    for (const key of ['walked_to_class', 'festival_stall', 'stolen_glances', 'their_scarf']) {
      assert.ok(!pool.includes(key), key);
    }
    assert.ok(pool.every((key) => !key.startsWith('benkei_')));
  });

  it('never gives anyone else one of Jin\'s moments', () => {
    for (const id of ['rui', 'benkei']) {
      assert.ok(milestonePoolFor(id).every((key) => !key.startsWith('jin_')), id);
    }
  });

  const OWN_SETS = ['benkei', 'edward', 'elias', 'haru', 'jin', 'rui', 'shion', 'towa', 'zenji'];

  it('keeps every own set to its own character', () => {
    for (const owner of OWN_SETS) {
      for (const id of ['kaito', ...OWN_SETS.filter((other) => other !== owner)]) {
        assert.ok(
          milestonePoolFor(id).every((key) => !key.startsWith(`${owner}_`)),
          `${id} drew a ${owner}_ moment`,
        );
      }
    }
  });

  it('gives every own-set character something at every tier', () => {
    for (const id of OWN_SETS) {
      const tiers = new Set(milestonePoolFor(id).map((key) => ENCOUNTER_MILESTONES[key].minTier));
      for (const tier of ['new', 'known', 'warm', 'spark', 'close', 'bound']) {
        assert.ok(tiers.has(tier), `${id} has nothing at ${tier}`);
      }
    }
  });

  it('keeps class out of every pool for characters who never attend', () => {
    for (const id of ['edward', 'elias', 'haru', 'rui', 'shion', 'towa', 'zenji']) {
      const pool = milestonePoolFor(id);
      for (const key of ['walked_to_class', 'library_study']) {
        assert.ok(!pool.includes(key), `${id} has ${key}`);
      }
    }
  });

  it('respects the canon limits on the non-campus sets', () => {
    // Edward can't take the sun or read small print, and a midnight snack
    // reads as him feeding.
    for (const key of ['watched_sunrise', 'watched_sunset', 'borrowed_book', 'shared_book', 'midnight_snack']) {
      assert.ok(!milestonePoolFor('edward').includes(key), `edward has ${key}`);
    }
    // Zenji is a ghost: he doesn't eat and can't hand things over.
    for (const key of ['coffee_break', 'same_table', 'midnight_snack', 'shared_umbrella', 'their_scarf']) {
      assert.ok(!milestonePoolFor('zenji').includes(key), `zenji has ${key}`);
    }
    // Rui can't get tired, so he never sits idle.
    for (const key of ['campus_bench', 'lazy_day']) {
      assert.ok(!milestonePoolFor('rui').includes(key), `rui has ${key}`);
    }
  });

  // A hint is read by the narrator ("picking up after {hint}") and by the
  // character in their own bond scene texts ({lastMoment}), so it can't refer
  // to the character in the third person.
  it('writes every hint so the character can say it too', () => {
    for (const [key, { hint }] of Object.entries(ENCOUNTER_MILESTONES)) {
      assert.ok(!/\b(he|him|his|they|them|their)\b/i.test(hint), `${key}: "${hint}"`);
    }
  });
});

