// Core behaviour of public "call out" encounters. Deliberately narrow: the
// things that would break the feature outright, not every branch it has.
//
//   1. Name matching   — typing a name IS the game
//   2. Spawn + expiry  — the scheduler loop that makes encounters exist
//   3. /call outcomes  — winning, losing the race, guessing wrong
//   4. The boost       — what a normal win grants
//   5. Call scenes     — the rare interactive reveal (§17), whose click
//                        grants +1 in place of the boost
//
// Guard rails, admin commands, leaderboard maths and content-pool shape are all
// covered by reading the code; add tests here when something actually breaks.
import { afterEach, beforeEach, describe, it, mock } from 'node:test';
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
    editInteractionMessage: async () => ({}),
    // Reads back what postChannelMessage recorded, as the /call scene closeout
    // does. Discord adds read-only fields to what it returns; the closeout
    // rebuilds rather than echoing them, so the stand-in adds one to prove it.
    getChannelMessage: async (channelId, messageId) => {
      const post = posts[Number(messageId.replace('message-', '')) - 1];
      if (!post) throw new Error(`Discord API error: 404 unknown message ${messageId}`);
      return { id: messageId, components: structuredClone(post.body.components).map((c) => ({ ...c, id: 1 })) };
    },
    // Mirrors the real editChannelMessageSafe: skip with no messageId, record
    // otherwise. Nothing here exercises its failure-swallowing path.
    editChannelMessageSafe: async (channelId, messageId, body) => {
      if (!messageId) return;
      edits.push({ channelId, messageId, body });
    },
    // Unused by anything under test here — publicEncounters.js pulls in
    // bondScenes.js (for /encdev bond), which imports these statically, so the
    // mock has to provide them or the whole module graph fails to load.
    openDmChannel: async () => 'dm-channel-1',
    postChannelTyping: async () => {},
    getGuildRoles: async () => [],
  },
});

// Real compositing is exercised in silhouette-composition.test.js; here it's a
// ~1s no-op in the way.
mock.module('../imageComposition.js', {
  namedExports: {
    composeEncounter: async () => Buffer.from('png'),
    composeSilhouetteEncounter: async () => Buffer.from('silhouette-png'),
    // Unused here too, but encounters.js imports it statically for the
    // warding builders (docs/warding-cards.md), same reason as below.
    composeWardingCard: async () => Buffer.from('warding-png'),
  },
});

const {
  callSceneMessage,
  clearCallSceneForces,
  forceCallScene,
  handleCall,
  handleEncountersAdmin,
  handleSceneClick,
  rollGapMinutes,
  spawnEncounter,
  sweepExpiredEncounters,
} = await import('../publicEncounters.js');
const { runTick, clearSpawnAttemptFence } = await import('../encounterScheduler.js');
const { buildMeetPickMessage, buildResponseResultMessage } = await import('../encounters.js');
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
  clearCallSceneForces();
}

function callBody({ userId = 'user-1', guess = 'rui', nick = 'Kanae' } = {}) {
  return {
    guild_id: GUILD,
    channel_id: CHANNEL,
    member: { nick, user: { id: userId } },
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
  // Every character has a Stranger scene, so an unpinned roll would turn one
  // of these normal reveals into a scene about one run in ten.
  let random;
  beforeEach(() => { random = mock.method(Math, 'random', () => 0.99); });
  afterEach(() => random.mock.restore());

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
    assert.match(edit.body.embeds[0].description, /Kanae/, 'the winner is named (plain text, no @tag) inside the reveal line');
    assert.ok(!/<@/.test(edit.body.embeds[0].description), 'no @mention tag in the reveal line');
    assert.ok(!/[{}]/.test(edit.body.embeds[0].description), 'no unfilled placeholder');
  });

  it('gives exactly one of two simultaneous correct calls the win', async () => {
    reset({ guild_settings: [guildRow()], public_encounters: [encounterRow()] });

    const results = await Promise.all([
      handleCall(callBody({ userId: 'user-1' }), NOW),
      handleCall(callBody({ userId: 'user-2' }), NOW),
    ]);

    // A scene win (rolled at random) has no reply, so count afterReply.
    const winners = results.filter((r) => r.afterReply !== null);
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
    assert.match(blocked.reply.content, /Try again in 7s/);

    await handleCall(callBody({ userId: 'user-2', guess: 'asdfgh' }), NOW);
    const free = await handleCall(callBody({ userId: 'user-2', guess: 'jin' }), NOW);
    assert.ok(!/Try again in/.test(free.reply.content), 'gibberish costs nothing');
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

  it('labels a boosted character in the /meet picker, and only theirs', async () => {
    reset({
      character_relationships: [
        relationship({ pending_encounter_boost: 1 }),
        relationship({ character_id: 'haku' }),
        relationship({ discord_user_id: 'someone-else', character_id: 'haku', pending_encounter_boost: 1 }),
      ],
    });
    const rui = CHARACTERS.find((c) => c.id === 'rui');
    const haku = CHARACTERS.find((c) => c.id === 'haku');

    const message = await buildMeetPickMessage('user-1', [rui, haku]);
    const labels = message.components[0].components.map((b) => b.label);

    assert.match(labels[0], / \+1$/);
    assert.doesNotMatch(labels[1], /\+/, "another user's boost never shows");
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

// --- 5. call scenes ----------------------------------------------------------

describe('call scenes', () => {
  // A V2 message: the container holds the text over a gallery of the portrait.
  function sceneParts(data) {
    const [container, row] = data.components;
    const [text, gallery] = container.components;
    return {
      accent: container.accent_color,
      text: text.content,
      face: gallery.items[0].media.url,
      buttons: row?.components ?? null,
    };
  }

  function clickBody({ userId = 'user-1', choice = 'kind', encounterId = 7 } = {}) {
    return {
      guild_id: GUILD,
      channel_id: CHANNEL,
      member: { user: { id: userId } },
      data: { custom_id: `scene:${encounterId}:${choice}` },
      // A component click carries the post it was made on.
      message: posts[0]?.body,
    };
  }

  async function winScene({ affinity = 0, characterId = 'benkei', variant = 'uniform' } = {}) {
    reset({
      guild_settings: [guildRow()],
      public_encounters: [encounterRow({ character_id: characterId, variant })],
      character_relationships: affinity
        ? [{ discord_user_id: 'user-1', character_id: characterId, affinity, times_met: 3 }]
        : [],
    });
    forceCallScene(7);
    const { afterReply } = await handleCall(callBody({ guess: characterId }), NOW);
    await afterReply();
    return fake.tables.public_encounters[0];
  }

  function relationship(characterId = 'benkei') {
    return fake.tables.character_relationships.find(
      (r) => r.discord_user_id === 'user-1' && r.character_id === characterId,
    );
  }

  it('posts a scene reply under the silhouette instead of the reveal embed', async () => {
    reset({ guild_settings: [guildRow()], public_encounters: [encounterRow({ character_id: 'benkei' })] });
    forceCallScene(7);
    const { reply, afterReply } = await handleCall(callBody({ guess: 'benkei' }), NOW);
    const lateReply = await afterReply();
    const row = fake.tables.public_encounters[0];

    assert.equal(reply, null, 'the scene names the character, so no ack');
    assert.equal(lateReply, null, 'the placeholder is deleted, not filled');

    const [post] = posts;
    assert.equal(post.channelId, CHANNEL);
    assert.deepEqual(post.body.message_reference.message_id, 'message-live');
    const { text, face, buttons } = sceneParts(post.body);
    assert.equal(face, 'https://example.test/assets/expressions/benkei/default.png');
    assert.match(text, /Kanae/);
    assert.ok(!/[{}]/.test(text), 'no unfilled placeholder');

    // Three answers in some order, one style, then the date button last.
    assert.deepEqual(
      buttons.slice(0, 3).map((b) => b.custom_id).sort(),
      ['scene:7:bold', 'scene:7:kind', 'scene:7:playful'],
    );
    assert.equal(new Set(buttons.slice(0, 3).map((b) => b.style)).size, 1, 'answers are indistinguishable');
    assert.equal(buttons[3].custom_id, 'scene:7:date');

    const [edit] = edits;
    assert.equal(edit.messageId, 'message-live');
    assert.deepEqual(edit.body, { content: null }, 'silhouette text cleared, no embed added');

    assert.equal(row.scene_message_id, 'message-1');
    assert.equal(row.scene_resolved_at ?? null, null);

    // The scene replaces the boost and the milestone.
    assert.equal(relationship()?.pending_encounter_boost ?? 0, 0, 'no boost on a scene win');
    assert.equal(fake.tables.encounter_milestones.length, 0, 'no milestone on a scene win');
    assert.equal(relationship()?.times_met, 1, 'still counts as a meeting');
  });

  it('renders the answers in the order it is given', async () => {
    const { shuffledSceneResponses } = await import('../constants/publicEncounters.js');
    const message = callSceneMessage({
      characterId: 'benkei',
      face: 'default.png',
      text: 'x',
      color: 0,
      buttons: {
        encounterId: 7,
        responses: { kind: 'a', playful: 'b', bold: 'c' },
        locked: true,
        order: shuffledSceneResponses(() => 0),
      },
    });
    assert.deepEqual(
      sceneParts(message).buttons.map((b) => b.custom_id),
      ['scene:7:playful', 'scene:7:bold', 'scene:7:kind', 'scene:7:date'],
    );
  });

  it('locks the date button below Close Friend and drops the lock at it', async () => {
    await winScene();
    const locked = sceneParts(posts[0].body).buttons[3];
    assert.equal(locked.disabled, true);
    assert.equal(locked.emoji?.name, '🔒');
    assert.equal(locked.label, 'Ask on a date');

    // No Close Friend register has scenes yet, so the unlocked button is read
    // straight off the builder.
    const unlocked = sceneParts(
      callSceneMessage({
        characterId: 'benkei',
        face: 'default.png',
        text: 'x',
        color: 0,
        buttons: { encounterId: 7, responses: { kind: 'a', playful: 'b', bold: 'c' }, locked: false },
      }),
    ).buttons[3];
    assert.equal(unlocked.disabled, true, 'still disabled: the date feature is not built');
    assert.equal(unlocked.emoji, undefined);
  });

  it('opens Jo in casual on his _girl face', async () => {
    await winScene({ characterId: 'jo', variant: 'casual' });
    assert.match(sceneParts(posts[0].body).face, /\/jo\/default_girl\.png$/);
  });

  it('turns away anyone but the winner and changes nothing', async () => {
    await winScene();

    const result = await handleSceneClick(clickBody({ userId: 'user-2' }), '7', 'kind', NOW);

    assert.equal(result.response.data.flags, 64);
    assert.match(result.response.data.content, /not part of this conversation/);
    assert.equal(fake.tables.public_encounters[0].scene_resolved_at ?? null, null);
  });

  it('answers the winner once with the reaction and +1 for a favorite', async () => {
    await winScene();
    const { REACTION_LINES } = await import('../constants/reactions.js');

    const first = await handleSceneClick(clickBody(), '7', 'kind', NOW);
    assert.equal(first.response.type, 7, 'UPDATE_MESSAGE');
    const { text, face, buttons } = sceneParts(first.response.data);
    // Benkei ranks kind 2 (fave) -> close at Stranger.
    assert.match(face, /\/benkei\/close\.png$/);
    assert.equal(buttons, null, 'the button row is gone');
    // The opening line stays (so the portrait doesn't shift) and the reaction
    // stacks under it: the same love pool /roam draws for a favorite pick at
    // Stranger, then the gain.
    const opening = sceneParts(posts[0].body).text;
    assert.ok(text.startsWith(`${opening}\n\n`), 'a blank line after the opening line');
    const match = text.slice(opening.length + 2).match(/^\+1 — (.*)$/s);
    assert.ok(match, `text: ${text}`);
    assert.ok(REACTION_LINES.kind.early.love.includes(match[1]), `reaction: ${match[1]}`);
    assert.equal(relationship().affinity, 1);
    assert.ok(fake.tables.public_encounters[0].scene_resolved_at);

    const second = await handleSceneClick(clickBody({ choice: 'playful' }), '7', 'playful', NOW);
    assert.equal(second.response.data.flags, 64, 'a second click gets a quiet ephemeral');
    assert.equal(relationship().affinity, 1, 'and grants nothing');
  });

  it('gives a liked answer +1 and the least-liked one nothing', async () => {
    await winScene();
    const liked = await handleSceneClick(clickBody({ choice: 'playful' }), '7', 'playful', NOW);
    assert.match(sceneParts(liked.response.data).text, /\n\n\+1 — /);
    assert.equal(relationship().affinity, 1);

    await winScene();
    const flat = await handleSceneClick(clickBody({ choice: 'bold' }), '7', 'bold', NOW);
    const { text, face } = sceneParts(flat.response.data);
    assert.ok(!/\n\n[+-]?\d/.test(text), 'no +0 on a least-liked pick');
    assert.match(face, /\/benkei\/annoyed\.png$/);
    assert.equal(relationship()?.affinity ?? 0, 0);
  });

  it('lays the scene out as text over a full-size portrait in a container', async () => {
    await winScene();
    const [container, row] = posts[0].body.components;
    assert.equal(container.type, 17, 'in a container');
    assert.equal(typeof container.accent_color, 'number');
    assert.deepEqual(container.components.map((c) => c.type), [10, 12], 'a Text Display, then a Media Gallery');
    assert.equal(row.type, 1);
  });

  it('never acts on the date button', async () => {
    await winScene();
    const result = await handleSceneClick(clickBody({ choice: 'date' }), '7', 'date', NOW);
    assert.equal(result.response.data.flags, 64);
    assert.equal(fake.tables.public_encounters[0].scene_resolved_at ?? null, null);
  });

  it('closes an unanswered scene as it opened and grants the boost instead', async () => {
    await winScene();
    const opening = sceneParts(posts[0].body);
    // The win resolved the encounter, so the guild is free to spawn again.
    edits.length = 0;

    await spawnEncounter(guildRow(), NOW, { reanchor: false });

    const closeout = edits.find((e) => e.messageId === 'message-1');
    assert.ok(closeout, 'the scene post was edited');
    const { text, face, buttons, accent } = sceneParts(closeout.body);
    assert.equal(text, opening.text, 'the opening line stays');
    assert.equal(face, opening.face);
    assert.equal(accent, opening.accent);
    assert.equal(buttons, null);
    assert.equal(closeout.body.components[0].id, undefined, 'nothing read-only echoed back');
    assert.ok(fake.tables.public_encounters[0].scene_resolved_at);
    assert.equal(relationship().pending_encounter_boost, 1, 'the fallback boost');
  });

  it('grants the fallback boost even when the scene post is gone', async () => {
    await winScene();
    posts.length = 0;
    edits.length = 0;

    await spawnEncounter(guildRow(), NOW, { reanchor: false });

    assert.ok(!edits.some((e) => e.messageId === 'message-1'), 'nothing to edit');
    assert.equal(relationship().pending_encounter_boost, 1);
  });

  it('keeps the normal reveal when the draw comes from the shared pool', async () => {
    const { DIALOGUE } = await import('../constants/dialogue.js');
    const own = DIALOGUE.benkei.winnerLines.bound;
    delete DIALOGUE.benkei.winnerLines.bound;
    try {
      reset({
        guild_settings: [guildRow()],
        public_encounters: [encounterRow({ character_id: 'benkei' })],
        character_relationships: [{ discord_user_id: 'user-1', character_id: 'benkei', affinity: 700, times_met: 3 }],
      });
      forceCallScene(7);
      const { afterReply } = await handleCall(callBody({ guess: 'benkei' }), NOW);
      await afterReply();

      assert.equal(posts.length, 0, 'no scene post');
      assert.ok(edits[0].body.embeds?.length, 'the reveal embed instead');
    } finally {
      DIALOGUE.benkei.winnerLines.bound = own;
    }
  });
});
