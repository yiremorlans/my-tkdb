// Benkei isn't a Darkwick student, so his /call moments come from his own
// campus-store set plus four shared ones, and his set never leaks into anyone
// else's pool.
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { milestonePoolFor } from '../constants/publicEncounters.js';

describe('milestonePoolFor', () => {
  it('gives Benkei his own moments plus the shared ones picked for him', () => {
    const pool = milestonePoolFor('benkei');
    const shared = pool.filter((key) => !key.startsWith('benkei_'));
    for (const key of ['coffee_break', 'watched_sunrise', 'late_call']) {
      assert.ok(shared.includes(key), key);
    }
    for (const key of ['signed_report', 'walked_to_class', 'skipped_briefing']) {
      assert.ok(!pool.includes(key), key);
    }
  });

  it('never gives a student one of Benkei\'s moments', () => {
    assert.ok(milestonePoolFor('rui').every((key) => !key.startsWith('benkei_')));
  });
});
