// Core behaviour of public "call out" encounters. Deliberately narrow: the
// things that would break the feature outright, not every branch it has.
//
//   1. Name matching   — typing a name IS the game
//   2. Spawn + expiry  — the scheduler loop that makes encounters exist
//   3. /call outcomes  — winning, losing the race, guessing wrong
//   4. The boost       — the one path that touches affinity
//
// Guard rails, admin commands, leaderboard maths and content-pool shape are all
// covered by reading the code; add tests here when something actually breaks.
import { beforeEach, describe, it, mock } from 'node:test';
import assert from 'node:assert/strict';
import { createFakeSupabase } from './helpers/fakeSupabase.js';

process.env.SUPABASE_URL ??= 'http://fake.local';
process.env.SUPABASE_SERVICE_ROLE_KEY ??= 'fake-service-role-key';
process.env.BASE_URL = 'https://example.test';

const GUILD = 'guild-1';
const CHANNEL = 'channel-1';
const NOW = new Date('2026-09-02T15:00:00Z');
const EXPIRES = new Date('2026-09-02T15:02:00Z');

const fake = createFakeSupabase({
  guild_settings: [],
  public_encounters: [],
  encounter_milestones: [],
  encounter_win_stats: [],
  character_relationships: [],
});
mock.module('@supabase/supabase-js', {
  namedExports: { createClient: () => fake.client },
});

const posts = [];
const edits = [];
mock.module('../discordRest.js', {
  namedExports: {
    postChannelMessage: async (channelId, body) => {
      posts.push({ channelId, body });
      return { id: `message-${posts.length}` };
    },
    editChannelMessage: async (channelId, messageId, body) => {
      edits.push({ channelId, messageId, body });
      return {};
    },
    // Unused by anything under test here — publicEncounters.js pulls in
    // bondScenes.js (for /encdev bond), which imports these statically, so the
    // mock has to provide them or the whole module graph fails to load.
    openDmChannel: async () => 'dm-channel-1',
    postChannelTyping: async () => {},
  },
});

// Real compositing is exercised in silhouette-composition.test.js; here it's a
// ~1s no-op in the way.
mock.module('../imageComposition.js', {
  namedExports: {
    composeEncounter: async () => Buffer.from('png'),
    composeSilhouetteEncounter: async () => Buffer.from('silhouette-png'),
    // Unused here, but missions.js imports it statically (via the scheduler),
    // so the mock has to provide it or the module graph fails to load.
    composeFieldReport: async () => Buffer.from('report-png'),
  },
});

const { handleCall, handleEncountersAdmin, spawnEncounter, sweepExpiredEncounters, rollGapMinutes } = await import('../publicEncounters.js');
const { runTick, clearSpawnAttemptFence } = await import('../encounterScheduler.js');
const { buildResponseResultMessage } = await import('../encounters.js');
const {
  recordEncounterMilestone,
  getEncounterMilestoneCounts,
  getOrCreateRelationship,
  grantEncounterBoost,
  consumeAllEncounterBoosts,
} = await import('../db/supabase.js');
const { clearGuessCooldowns, matchCharacterGuess } = await import('../constants/publicEncounters.js');
const { CHARACTERS, RESPONSE_TYPES } = await import('../constants/characters.js');

function guildRow(overrides = {}) {
  return {
    guild_id: GUILD,
    encounter_channel_id: CHANNEL,
    enabled: true,
    // NOT NULL DEFAULT FALSE in the schema (migration 013), so a real row always
    // carries it — the owner's kill switch, which outranks `enabled`.
    locked: false,
    post_failures: 0,
    // Far enough back that any rolled gap has elapsed.
    last_encounter_at: new Date(NOW.getTime() - 200 * 60 * 1000).toISOString(),
    next_gap_minutes: 45,
    ...overrides,
  };
}

function encounterRow(overrides = {}) {
  return {
    id: 7,
    guild_id: GUILD,
    channel_id: CHANNEL,
    message_id: 'message-live',
    character_id: 'rui',
    variant: 'uniform',
    background: 'Darkwick_Bus_Stop.png',
    teaser: 'A shape.',
    created_at: NOW.toISOString(),
    expires_at: EXPIRES.toISOString(),
    resolved_at: null,
    outcome: null,
    solved_by: null,
    ...overrides,
  };
}

function reset(tables = {}) {
  const contents = {
    guild_settings: [],
    public_encounters: [],
    encounter_milestones: [],
    encounter_win_stats: [],
    character_relationships: [],
    ...tables,
  };
  for (const [name, rows] of Object.entries(contents)) {
    fake.tables[name].length = 0;
    fake.tables[name].push(...rows.map((r) => ({ ...r })));
  }
  posts.length = 0;
  edits.length = 0;
  clearGuessCooldowns();
  clearSpawnAttemptFence();
}

function callBody({ userId = 'user-1', guess = 'rui' } = {}) {
  return {
    guild_id: GUILD,
    channel_id: CHANNEL,
    member: { user: { id: userId } },
    data: { name: 'call', options: [{ name: 'character', value: guess }] },
  };
}

beforeEach(() => reset());

// --- 1. name matching -------------------------------------------------------

describe('matchCharacterGuess', () => {
  it('accepts a first name, a full name, a surname and an alias', () => {
    assert.equal(matchCharacterGuess('Rui'), 'rui');
    assert.equal(matchCharacterGuess('  rui   MIZUKI '), 'rui');
    assert.equal(matchCharacterGuess('lucci'), 'romeo'); // last word of a 3-part name
    assert.equal(matchCharacterGuess('sho'), 'shohei');
  });

  it('resolves every character by first name', () => {
    // If this breaks, some character is simply unreachable in the game.
    for (const character of CHARACTERS) {
      assert.equal(matchCharacterGuess(character.firstName), character.id);
    }
  });

  it('returns null for typos and nonsense rather than fuzzy-matching', () => {
    for (const input of ['ruii', 'asdfgh', '', '   ', undefined]) {
      assert.equal(matchCharacterGuess(input), null);
    }
  });
});

// --- 2. spawn and expiry ----------------------------------------------------

describe('the scheduler loop', () => {
  it('posts a silhouette and re-anchors the cadence', async () => {
    reset({ guild_settings: [guildRow()] });

    await runTick(NOW);

    assert.equal(posts.length, 1);
    assert.equal(posts[0].channelId, CHANNEL);
    assert.equal(posts[0].body.files[0].name, 'encounter.png');

    const row = fake.tables.public_encounters[0];
    assert.equal(row.message_id, 'message-1');
    assert.ok(!posts[0].body.content.includes(row.character_id), 'the post never names them');

    const guild = fake.tables.guild_settings[0];
    assert.ok(new Date(guild.last_encounter_at).getTime() >= NOW.getTime(), 're-anchored');
    assert.ok(guild.next_gap_minutes > 0, 'a fresh gap was rolled');
  });

  it('never runs two encounters at once in a guild', async () => {
    reset({
      guild_settings: [guildRow()],
      public_encounters: [encounterRow({ expires_at: new Date(NOW.getTime() + 60_000).toISOString() })],
    });

    await runTick(NOW);
    assert.equal(posts.length, 0);
  });

  it('finalizes an expired encounter without revealing the name', async () => {
    reset({
      guild_settings: [guildRow()],
      public_encounters: [encounterRow({ expires_at: new Date(NOW.getTime() - 1000).toISOString() })],
    });

    await sweepExpiredEncounters(null, NOW);

    assert.equal(fake.tables.public_encounters[0].outcome, 'expired');
    assert.equal(edits.length, 1);
    assert.deepEqual(edits[0].body.attachments, [], 'the silhouette is dropped');
    assert.ok(!/rui/i.test(edits[0].body.content), 'a miss never speaks the name');
  });

  it('resumes an existing schedule across a restart instead of resetting it', async () => {
    // All timing lives in Postgres, so a fresh process picks up mid-gap.
    reset({
      guild_settings: [guildRow({
        last_encounter_at: new Date(NOW.getTime() - 30 * 60 * 1000).toISOString(),
        next_gap_minutes: 90,
      })],
    });

    await runTick(NOW);
    assert.equal(posts.length, 0, 'still 60 minutes early');

    await runTick(new Date(NOW.getTime() + 60 * 60 * 1000));
    assert.equal(posts.length, 1, 'fires on the original anchor, not a restarted clock');
  });

  it('spaces spawn attempts by the retry floor when the anchor still reads due', async () => {
    // Stand in for the compound failure #6 covers: a POST failed and the
    // clock-advance write failed too, so last_encounter_at never moved and no
    // encounter row exists. isSpawnDue stays true every tick.
    reset({ guild_settings: [guildRow()] });

    await runTick(NOW);
    assert.equal(posts.length, 1, 'first attempt goes out');

    // Force the pathological state back on: anchor far in the past, no active row.
    fake.tables.guild_settings[0].last_encounter_at = new Date(NOW.getTime() - 200 * 60 * 1000).toISOString();
    fake.tables.public_encounters.length = 0;

    await runTick(new Date(NOW.getTime() + 60 * 1000));
    assert.equal(posts.length, 1, 'one minute later: the in-memory floor blocks the retry');

    await runTick(new Date(NOW.getTime() + 6 * 60 * 1000));
    assert.equal(posts.length, 2, 'past the floor: the retry is allowed through');
  });

  it('forces a character/variant on a manual spawn and leaves the cadence alone', async () => {
    // The /encdev path: overrides passed through, guild_settings never written.
    reset({ guild_settings: [guildRow()] });
    const before = { ...fake.tables.guild_settings[0] };

    const row = await spawnEncounter(guildRow(), NOW, {
      characterId: 'rui',
      variant: 'uniform',
      reanchor: false,
    });

    assert.equal(row.character_id, 'rui');
    assert.equal(row.variant, 'uniform');
    assert.equal(posts.length, 1);

    const after = fake.tables.guild_settings[0];
    assert.equal(after.last_encounter_at, before.last_encounter_at, 'anchor untouched');
    assert.equal(after.next_gap_minutes, before.next_gap_minutes, 'no fresh gap rolled');
  });

  it('rolls a whole number of minutes — next_gap_minutes is an INT column', async () => {
    // The fake Supabase does not type-check, so a float here fails only in
    // real Postgres (22P02). Guard it directly.
    for (let i = 0; i < 200; i++) {
      const gap = rollGapMinutes();
      assert.ok(Number.isInteger(gap), `rollGapMinutes returned ${gap}`);
      assert.ok(gap >= 45 && gap <= 180, `rollGapMinutes returned ${gap}`);
    }
  });

});

// --- 3. /call ---------------------------------------------------------------

describe('/call', () => {
  it('claims the encounter, names the character and reveals it publicly', async () => {
    reset({ guild_settings: [guildRow()], public_encounters: [encounterRow()] });

    const { reply, afterReply } = await handleCall(callBody({ guess: 'Rui Mizuki' }), NOW);
    await afterReply();

    assert.match(reply.content, /That was \*\*Rui Mizuki\*\*\./);
    assert.equal(reply.flags, 64);

    const row = fake.tables.public_encounters[0];
    assert.equal(row.outcome, 'solved');
    assert.equal(row.solved_by, 'user-1');

    // The silhouette stays; the reveal rides in an added embed.
    const [edit] = edits;
    assert.equal(edit.body.content, null, 'content cleared so the winner is not tagged above the post');
    assert.equal('attachments' in edit.body, false, 'silhouette kept');
    assert.equal(edit.body.embeds[0].thumbnail.url, 'https://example.test/assets/cards/Rui_Mizuki.png');
    assert.match(edit.body.embeds[0].description, /<@user-1>/, 'the winner is mentioned inside the reveal line');
    assert.ok(!/[{}]/.test(edit.body.embeds[0].description), 'no unfilled placeholder');
  });

  it('gives exactly one of two simultaneous correct calls the win', async () => {
    reset({ guild_settings: [guildRow()], public_encounters: [encounterRow()] });

    const results = await Promise.all([
      handleCall(callBody({ userId: 'user-1' }), NOW),
      handleCall(callBody({ userId: 'user-2' }), NOW),
    ]);

    const winners = results.filter((r) => /That was/.test(r.reply.content));
    assert.equal(winners.length, 1, 'the atomic claim admits exactly one');
    assert.equal(results.filter((r) => r.afterReply === null).length, 1, 'the loser triggers nothing');
  });

  it('does not resolve the encounter on a wrong or unknown guess', async () => {
    reset({ guild_settings: [guildRow()], public_encounters: [encounterRow()] });

    const wrong = await handleCall(callBody({ guess: 'jin' }), NOW);
    const unknown = await handleCall(callBody({ guess: 'asdfgh' }), NOW);

    assert.match(unknown.reply.content, /don't know who that is/);
    assert.ok(!/That was/.test(wrong.reply.content));
    assert.equal(fake.tables.public_encounters[0].resolved_at, null);
    assert.equal(edits.length, 0);
  });

  it('makes a wrong real name wait, but never a typo', async () => {
    reset({ guild_settings: [guildRow()], public_encounters: [encounterRow()] });

    await handleCall(callBody({ guess: 'jin' }), NOW);
    const blocked = await handleCall(callBody({ guess: 'leo' }), new Date(NOW.getTime() + 3000));
    assert.match(blocked.reply.content, /try again in 7s/);

    await handleCall(callBody({ userId: 'user-2', guess: 'asdfgh' }), NOW);
    const free = await handleCall(callBody({ userId: 'user-2', guess: 'jin' }), NOW);
    assert.ok(!/try again in/.test(free.reply.content), 'gibberish costs nothing');
  });

  it('grants a boost and a milestone without moving affinity', async () => {
    reset({
      guild_settings: [guildRow()],
      public_encounters: [encounterRow()],
      character_relationships: [
        { discord_user_id: 'user-1', character_id: 'rui', affinity: 120, times_met: 4, pending_encounter_boost: 0 },
      ],
    });

    const { afterReply } = await handleCall(callBody(), NOW);
    await afterReply();

    const rel = fake.tables.character_relationships[0];
    assert.equal(rel.affinity, 120, 'a win must never move affinity directly');
    assert.equal(rel.pending_encounter_boost, 1);
    assert.equal(fake.tables.encounter_milestones.length, 1);
    assert.equal(fake.tables.encounter_milestones[0].total, 1, 'first win of a kind starts the tally at 1');
    assert.equal(fake.tables.encounter_win_stats[0].wins, 1);
  });

  it('bumps the per-kind tally instead of adding a row on a repeat', async () => {
    reset({});

    await recordEncounterMilestone({ userId: 'u1', characterId: 'rui', milestoneType: 'coffee_break' });
    await recordEncounterMilestone({ userId: 'u1', characterId: 'rui', milestoneType: 'coffee_break' });
    await recordEncounterMilestone({ userId: 'u1', characterId: 'rui', milestoneType: 'walked_to_class' });

    assert.equal(fake.tables.encounter_milestones.length, 2, 'one row per kind, not per win');
    assert.deepEqual(
      await getEncounterMilestoneCounts('u1', 'rui'),
      { coffee_break: 2, walked_to_class: 1 },
    );
  });

  it('creates the relationship exactly once when the winner has never met the character', async () => {
    // No character_relationships row seeded. grantEncounterBoost creates it
    // inside its own upsert (db/migrations/014) and incrementTimesMet then
    // updates it — in series, so the result is a single row with both writes
    // applied, not two INSERTs (one of which a real unique constraint would
    // reject, dropping a reward).
    reset({ guild_settings: [guildRow()], public_encounters: [encounterRow()] });

    const { afterReply } = await handleCall(callBody(), NOW);
    await afterReply();

    const rels = fake.tables.character_relationships.filter(
      (r) => r.discord_user_id === 'user-1' && r.character_id === 'rui',
    );
    assert.equal(rels.length, 1, 'exactly one relationship row');
    assert.equal(rels[0].times_met, 1, 'incrementTimesMet applied');
    assert.equal(rels[0].pending_encounter_boost, 1, 'grantEncounterBoost applied');
    assert.equal(rels[0].affinity, 0, 'a win never moves affinity');
  });
});

// --- getOrCreateRelationship, insert-race recovery ------------------------

describe('getOrCreateRelationship under an insert race', () => {
  it('re-reads the row when a concurrent insert already created it (23505)', async () => {
    reset({
      character_relationships: [
        { discord_user_id: 'racer', character_id: 'rui', affinity: 33, times_met: 7, pending_encounter_boost: 1 },
      ],
    });
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
    reset({ character_relationships: [] });
    fake.forceError('character_relationships', 'select', { code: 'PGRST116', message: 'No rows found' });
    fake.forceError('character_relationships', 'insert', { code: 'DB_DOWN', message: 'simulated outage' });

    await assert.rejects(
      () => getOrCreateRelationship('u', 'rui'),
      (err) => err.code === 'DB_DOWN',
    );
  });
});

// --- 4. the boost, spent on the next authored response ----------------------

describe('the encounter boost', () => {
  const relationship = (overrides = {}) => ({
    discord_user_id: 'user-1',
    character_id: 'rui',
    affinity: 60,
    times_met: 5,
    pending_encounter_boost: 0,
    ...overrides,
  });

  it('leaves an ordinary response untouched', async () => {
    reset({ character_relationships: [relationship()] });

    const message = await buildResponseResultMessage('user-1', 'rui', RESPONSE_TYPES.KIND);

    assert.ok(!/warmer welcome/.test(message.content));
    assert.equal(fake.tables.character_relationships[0].affinity, 62); // Rui's kind = 2
  });

  it('folds in every pending boost at once and clears them', async () => {
    reset({ character_relationships: [relationship({ pending_encounter_boost: 2 })] });

    const message = await buildResponseResultMessage('user-1', 'rui', RESPONSE_TYPES.KIND);

    assert.equal(fake.tables.character_relationships[0].affinity, 64, 'kind 2 + both boosts');
    assert.equal(fake.tables.character_relationships[0].pending_encounter_boost, 0, 'all spent');
    assert.match(message.content, /warmer welcome \(\+2\)/);
  });

  // Both halves of the ledger used to be a SELECT then an UPDATE, and a win
  // landing between the two was lost — wiped by the spend without being paid
  // out, or overwritten by a second grant that had read the same count. Both
  // are one statement now (db/migrations/014). The fake does not model row
  // locks, so what these pin is the shape that makes the lock possible: one
  // RPC, and no read-then-write against the table from JS.
  const boostTableWrites = () => fake.calls.filter(
    (c) => c.table === 'character_relationships' && c.op !== 'select',
  );

  it('stacks wins up to the cap, one statement per grant', async () => {
    reset({ character_relationships: [relationship()] });
    fake.calls.length = 0;

    assert.equal(await grantEncounterBoost('user-1', 'rui', 2), 1);
    assert.equal(await grantEncounterBoost('user-1', 'rui', 2), 2);
    assert.equal(await grantEncounterBoost('user-1', 'rui', 2), 2, 'held at the cap');

    assert.equal(
      fake.calls.filter((c) => c.table === 'rpc:grant_encounter_boost').length,
      3,
      'one RPC per win',
    );
    assert.equal(boostTableWrites().length, 0, 'no read-modify-write from JS');
  });

  it('creates the relationship in the grant itself for a never-met character', async () => {
    reset({});
    fake.calls.length = 0;

    assert.equal(await grantEncounterBoost('newcomer', 'rui', 2), 1);

    const rows = fake.tables.character_relationships;
    assert.equal(rows.length, 1, 'the upsert created the row');
    assert.equal(rows[0].pending_encounter_boost, 1);
    assert.equal(rows[0].affinity, 0, 'a win never moves affinity');
    assert.equal(boostTableWrites().length, 0, 'no separate INSERT to race');
  });

  it('credits the pending count and clears it in one statement', async () => {
    reset({ character_relationships: [relationship({ pending_encounter_boost: 2 })] });
    fake.calls.length = 0;

    assert.equal(await consumeAllEncounterBoosts('user-1', 'rui'), 2);

    assert.equal(fake.tables.character_relationships[0].pending_encounter_boost, 0);
    assert.equal(
      fake.calls.filter((c) => c.table === 'rpc:consume_encounter_boosts').length,
      1,
    );
    assert.equal(boostTableWrites().length, 0, 'the spend is not a JS read-then-write');
  });

  it('spends nothing, and writes nothing, for a character with no relationship row', async () => {
    reset({});
    fake.calls.length = 0;

    assert.equal(await consumeAllEncounterBoosts('newcomer', 'rui'), 0);

    assert.equal(fake.tables.character_relationships.length, 0, 'a spend never creates a row');
    assert.equal(boostTableWrites().length, 0);
  });
});

// --- 5. the owner's kill switch --------------------------------------------

// `locked` (migration 013) outranks `enabled`. A guild admin's own switch is
// `enabled`, and `/encounters channel` writes it back to true on every run —
// so a manual disable only sticks if something they can't reach enforces it.
// Every row below is `enabled: true` on purpose: the point is that `locked`
// wins anyway.
describe('a locked guild', () => {
  function adminBody({ userId = 'admin-1', permissions = '32', sub = 'status', options = [] } = {}) {
    return {
      guild_id: GUILD,
      member: { user: { id: userId }, permissions }, // '32' = MANAGE_GUILD
      data: { name: 'encounters', options: [{ type: 1, name: sub, options }] },
    };
  }

  it('is invisible to the scheduler even while enabled is true', async () => {
    reset({ guild_settings: [guildRow({ locked: true })] });

    await runTick(NOW);

    assert.equal(posts.length, 0, 'a locked guild must never spawn');
  });

  it('cannot be re-enabled with /encounters channel', async () => {
    reset({ guild_settings: [guildRow({ locked: true, enabled: false })] });

    const result = await handleEncountersAdmin(
      adminBody({ sub: 'channel', options: [{ name: 'channel', value: 'channel-2' }] }),
    );

    assert.match(result.reply.content, /aren't available/);
    const row = fake.tables.guild_settings[0];
    assert.equal(row.enabled, false, 'the upsert must not run and flip enabled back on');
    assert.equal(row.locked, true, 'nothing reachable from Discord clears the lock');
    assert.equal(row.encounter_channel_id, CHANNEL, 'the channel is not repointed either');
  });

  it('says nothing about why — the reply is the same for every subcommand', async () => {
    reset({ guild_settings: [guildRow({ locked: true })] });

    const status = await handleEncountersAdmin(adminBody({ sub: 'status' }));
    const disable = await handleEncountersAdmin(adminBody({ sub: 'disable' }));

    // No mention of locking, who did it, or that a lock exists at all.
    for (const result of [status, disable]) {
      assert.equal(result.reply.content, "Encounters aren't available in this server.");
      assert.doesNotMatch(result.reply.content, /lock/i);
    }
  });

  it('stops an already-posted encounter from being answerable', async () => {
    reset({
      guild_settings: [guildRow({ locked: true })],
      public_encounters: [encounterRow()],
    });

    const result = await handleCall(callBody({ guess: 'rui' }), NOW);

    assert.match(result.reply.content, /aren't set up/);
    assert.equal(result.afterReply, null, 'no reward path runs');
    assert.equal(fake.tables.public_encounters[0].resolved_at, null, 'the encounter is not claimed');
  });
});
