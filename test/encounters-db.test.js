// Unit tests for the encounter-side data helpers: the relationship row's
// insert-race recovery and the milestone tally (db/supabase.js), and the
// /meet candidate draw that seeds errand targets (encounters.js). Driven
// against the fake Supabase, no Discord.
import { beforeEach, describe, it, mock } from 'node:test';
import assert from 'node:assert/strict';
import { createFakeSupabase } from './helpers/fakeSupabase.js';

process.env.SUPABASE_URL ??= 'http://fake.local';
process.env.SUPABASE_SERVICE_ROLE_KEY ??= 'fake-service-role-key';

const fake = createFakeSupabase({ character_relationships: [], encounter_milestones: [] });
mock.module('@supabase/supabase-js', {
  namedExports: { createClient: () => fake.client },
});

const { getEncounterMilestoneCounts, getOrCreateRelationship, recordEncounterMilestone } = await import(
  '../db/supabase.js'
);
const { pickMeetCandidates } = await import('../encounters.js');
const { HOUSES } = await import('../constants/backgrounds.js');
const { MEET_OPTION_COUNT } = await import('../constants/game.js');
const { getHouseRoster } = await import('../constants/missions.js');

function reset(relationships = []) {
  fake.tables.character_relationships = relationships.map((r) => ({ ...r }));
  fake.tables.encounter_milestones = [];
}

beforeEach(() => reset());

describe('getOrCreateRelationship under an insert race', () => {
  it('re-reads the row when a concurrent insert already created it (23505)', async () => {
    reset([
      { discord_user_id: 'racer', character_id: 'rui', affinity: 33, times_met: 7, pending_encounter_boost: 1 },
    ]);
    // First SELECT misses — as it would if it ran before the other writer's
    // INSERT landed — then our own INSERT loses to the unique constraint.
    fake.forceError('character_relationships', 'select', { code: 'PGRST116', message: 'No rows found' });
    fake.forceError('character_relationships', 'insert', {
      code: '23505',
      message: 'duplicate key value violates unique constraint',
    });

    const rel = await getOrCreateRelationship('racer', 'rui');

    assert.equal(rel.affinity, 33, 'returns the row the other writer created, not a fresh 0');
    assert.equal(rel.times_met, 7);
    assert.equal(fake.tables.character_relationships.length, 1, 'no duplicate row');
  });

  it('still throws on an insert error that is not a unique violation', async () => {
    reset();
    fake.forceError('character_relationships', 'select', { code: 'PGRST116', message: 'No rows found' });
    fake.forceError('character_relationships', 'insert', { code: 'DB_DOWN', message: 'simulated outage' });

    await assert.rejects(
      () => getOrCreateRelationship('u', 'rui'),
      (err) => err.code === 'DB_DOWN',
    );
  });
});

describe('recordEncounterMilestone', () => {
  it('bumps the per-kind tally instead of adding a row on a repeat', async () => {
    reset();

    await recordEncounterMilestone({ userId: 'u1', characterId: 'rui', milestoneType: 'coffee_break' });
    await recordEncounterMilestone({ userId: 'u1', characterId: 'rui', milestoneType: 'coffee_break' });
    await recordEncounterMilestone({ userId: 'u1', characterId: 'rui', milestoneType: 'walked_to_class' });

    assert.equal(fake.tables.encounter_milestones.length, 2, 'one row per kind, not per win');
    assert.deepEqual(
      await getEncounterMilestoneCounts('u1', 'rui'),
      { coffee_break: 2, walked_to_class: 1 },
    );
  });
});

describe('/meet errand seeding (pickMeetCandidates)', () => {
  const ids = (chars) => chars.map((c) => c.id);
  const frostheim = ids(getHouseRoster(HOUSES.FROSTHEIM));

  it('guarantees two of four unsigned targets, freshly drawn, and still offers four', () => {
    const seen = new Set();
    for (let i = 0; i < 200; i++) {
      const offered = ids(pickMeetCandidates(frostheim));
      assert.equal(offered.length, MEET_OPTION_COUNT);
      assert.equal(new Set(offered).size, offered.length);
      const seeded = offered.filter((id) => frostheim.includes(id));
      assert.ok(seeded.length >= 2, 'two targets are always guaranteed');
      seeded.forEach((id) => seen.add(id));
    }
    assert.equal(seen.size, frostheim.length, 'which targets are seeded varies call to call');
  });

  it('seeds the lone target when only one is unsigned', () => {
    for (let i = 0; i < 50; i++) {
      const offered = ids(pickMeetCandidates(['haku']));
      assert.equal(offered.length, MEET_OPTION_COUNT);
      assert.ok(offered.includes('haku'));
    }
  });

  it('is a plain random draw with nothing unsigned (fully signed, not yet filed)', () => {
    const offered = pickMeetCandidates([]);
    assert.equal(offered.length, MEET_OPTION_COUNT);
    assert.equal(new Set(ids(offered)).size, MEET_OPTION_COUNT);
  });
});
