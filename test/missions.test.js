// Core behaviour of scheduled missions (docs/scheduled-missions.md).
// Deliberately narrow: the things that would break the feature outright, not
// every branch it has.
//
//   1. Slot rolling  — three a day, banded and spaced, restart-safe
//   2. Spawn         — one live request per guild, a spent slot stays spent
//   3. Accept        — the claim race, and the "you already hold one" refusal
//   4. Errand        — signing at the response step, and filing the report
//   5. Riddle        — the answer gate and the wrong-guess cooldown
//   6. Co-op         — the helper, and the single coin flip shared by both
//
// The rewards (a mission_log row plus a cooldown reset) are checked at the
// table, because they are the only thing a mission actually pays out.
import { beforeEach, describe, it, mock } from 'node:test';
import assert from 'node:assert/strict';
import { createFakeSupabase } from './helpers/fakeSupabase.js';

process.env.SUPABASE_URL ??= 'http://fake.local';
process.env.SUPABASE_SERVICE_ROLE_KEY ??= 'fake-service-role-key';

const GUILD = 'guild-1';
const CHANNEL = 'channel-1';

const fake = createFakeSupabase({
  guild_settings: [],
  missions: [],
  mission_log: [],
  command_limits: [],
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
    openDmChannel: async () => 'dm-1',
    postChannelTyping: async () => {},
  },
});

const {
  DAILY_LEAD_CAP,
  MISSIONS_PER_DAY,
  MIN_GAP_MS,
  localDayStart,
  WINDOW_START_HOUR,
  WINDOW_END_HOUR,
  clearRiddleCooldowns,
  dueSlots,
  getRiddle,
  RIDDLES,
  rollDailySlots,
  rollSignatureCount,
  pickSignatureTargets,
  getHouseRoster,
  MISSION_HOUSES,
} = await import('../constants/missions.js');

const {
  cooldownReplyWithReset,
  handleCooldownReset,
  handleDocs,
  handleMission,
  handleMissionAccept,
  handleMissionAssistJoin,
  handleMissionFile,
  handleRiddle,
  runGuildMissionPass,
  spawnMission,
  sweepExpiredMissions,
} = await import('../missions.js');

const { buildResponseResultMessage } = await import('../encounters.js');
const { claimCommandInvoke, clearCommandInvokeThrottle } = await import('../commandLimits.js');

function reset() {
  fake.tables.guild_settings = [];
  fake.tables.missions = [];
  fake.tables.mission_log = [];
  fake.tables.command_limits = [];
  fake.tables.character_relationships = [];
  posts.length = 0;
  edits.length = 0;
  clearRiddleCooldowns();
  clearCommandInvokeThrottle();
}

function guildRow(overrides = {}) {
  return {
    guild_id: GUILD,
    encounter_channel_id: CHANNEL,
    missions_enabled: true,
    locked: false,
    mission_slots_fired: [],
    ...overrides,
  };
}

function click(userId, { nick = 'Inspector' } = {}) {
  return { member: { user: { id: userId, username: nick } } };
}

function command(userId, options = []) {
  return { guild_id: GUILD, member: { user: { id: userId, username: 'Inspector' } }, data: { options } };
}

function missionRow(overrides = {}) {
  return {
    id: 1,
    guild_id: GUILD,
    channel_id: CHANNEL,
    message_id: 'message-1',
    mission_type: 'riddle',
    house: 'Frostheim',
    teaser: 'a teaser',
    status: 'open',
    post_expires_at: new Date(Date.now() + 3600_000).toISOString(),
    ...overrides,
  };
}

// --- 1. slot rolling --------------------------------------------------------

describe('daily slot rolling', () => {
  it('rolls one slot per band, inside the window and never closer than the gap', () => {
    // Rolled a hundred times rather than once: every constraint here is a
    // property of a random draw, and a single sample proves nothing about the
    // re-roll loop that enforces the gap.
    for (let run = 0; run < 100; run++) {
      const day = new Date(2026, 8, 4, 12, 0, 0);
      const slots = rollDailySlots(day).map((iso) => new Date(iso));

      assert.equal(slots.length, MISSIONS_PER_DAY);

      for (const slot of slots) {
        assert.equal(slot.getDate(), day.getDate(), 'slots stay on the rolled day');
        assert.ok(slot.getHours() >= WINDOW_START_HOUR, `${slot} is before the window opens`);
        assert.ok(slot.getHours() < WINDOW_END_HOUR, `${slot} is after the window closes`);
      }

      for (let i = 1; i < slots.length; i++) {
        assert.ok(
          slots[i] - slots[i - 1] >= MIN_GAP_MS,
          `slots ${i - 1} and ${i} are closer than the minimum gap`,
        );
      }
    }
  });

  it('keeps every band wide enough for the minimum gap', () => {
    // The gap is what caps MISSIONS_PER_DAY: each band is WINDOW / N wide, and
    // once a band is narrower than MIN_GAP_MS the re-roll can't place a slot,
    // so the fallback fires on most days. Raising the count past 7 means
    // lowering the gap too, not just bumping this constant.
    const windowMs = (WINDOW_END_HOUR - WINDOW_START_HOUR) * 60 * 60 * 1000;
    assert.ok(
      windowMs / MISSIONS_PER_DAY > MIN_GAP_MS,
      `${MISSIONS_PER_DAY} bands of ${(windowMs / MISSIONS_PER_DAY / 3600e3).toFixed(2)}h cannot hold a ${MIN_GAP_MS / 3600e3}h gap`,
    );
  });

  it('reports a due slot once, and flags one the host slept through as stale', () => {
    const now = new Date(2026, 8, 4, 12, 0, 0);
    const slots = [
      new Date(now.getTime() - 6 * 3600_000).toISOString(), // long past — stale
      new Date(now.getTime() - 60_000).toISOString(), // just due
      new Date(now.getTime() + 3600_000).toISOString(), // not yet
    ];

    const due = dueSlots(slots, [], now);
    assert.deepEqual(
      due.map((s) => [s.index, s.stale]),
      [[0, true], [1, false]],
    );

    // A fired slot never comes back, which is what makes the pass restart-safe.
    assert.deepEqual(dueSlots(slots, [0, 1], now), []);
  });
});

// --- 2. spawn ---------------------------------------------------------------

describe('spawning a mission request', () => {
  beforeEach(reset);

  it('posts the teaser and one Accept button, and says nothing about house or type', async () => {
    const row = await spawnMission(guildRow(), CHANNEL, new Date());

    assert.equal(posts.length, 1);
    const { channelId, body } = posts[0];
    assert.equal(channelId, CHANNEL);

    // Same shape as an encounter reveal: one embed, no upload.
    assert.equal(body.embeds.length, 1);
    assert.equal(body.embeds[0].description, row.teaser);
    assert.equal(body.files, undefined);

    const button = body.components[0].components[0];
    assert.equal(button.label, 'Accept');
    assert.equal(button.custom_id, `mission:accept:${row.id}`);

    // The whole design rests on the post revealing neither.
    assert.doesNotMatch(body.embeds[0].description, new RegExp(MISSION_HOUSES.join('|')));
    assert.doesNotMatch(body.embeds[0].description, /errand|riddle|co-op/i);

    // The message id has to land, or the pickup edit has nothing to target.
    assert.equal(fake.tables.missions[0].message_id, 'message-1');
  });

  it('rides the messenger cat as a thumbnail, alternating on the mission id', async () => {
    process.env.BASE_URL = 'https://example.test';
    try {
      await spawnMission(guildRow(), CHANNEL, new Date());
      await spawnMission(guildRow(), CHANNEL, new Date());

      const thumbs = posts.map((p) => p.body.embeds[0].thumbnail.url);
      assert.equal(thumbs.length, 2);
      for (const url of thumbs) {
        assert.match(url, /^https:\/\/example\.test\/assets\/sprites\/Messenger_Cat(_2)?\.png$/);
      }
      assert.notEqual(thumbs[0], thumbs[1], 'consecutive requests send different cats');
    } finally {
      delete process.env.BASE_URL;
    }
  });

  it('drops the cat rather than the mission when BASE_URL is unset', async () => {
    delete process.env.BASE_URL;
    await spawnMission(guildRow(), CHANNEL, new Date());

    assert.equal(posts.length, 1);
    assert.equal(posts[0].body.embeds[0].thumbnail, undefined);
    assert.ok(posts[0].body.embeds[0].description);
  });

  it('freezes an errand’s targets at spawn, as students of its own house', async () => {
    // Force an errand rather than waiting on a 20% roll.
    const house = 'Dionysia';
    const count = rollSignatureCount(house);
    const targets = pickSignatureTargets(house, count);

    assert.ok(count >= 1 && count <= getHouseRoster(house).length);
    assert.equal(new Set(targets).size, targets.length, 'targets are distinct');
    for (const id of targets) {
      assert.ok(
        getHouseRoster(house).some((c) => c.id === id),
        `${id} is not a ${house} student`,
      );
    }
  });

  it('spends a slot without posting when a request is still on the board', async () => {
    fake.tables.missions.push(missionRow({ status: 'open' }));

    const now = new Date();
    const guild = guildRow({
      mission_slots_day: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`,
      mission_slots_today: [new Date(now.getTime() - 60_000).toISOString()],
      mission_slots_fired: [],
    });
    fake.tables.guild_settings.push({ ...guild });

    await runGuildMissionPass(guild, now);

    assert.equal(posts.length, 0, 'never two live requests');
    assert.deepEqual(fake.tables.guild_settings[0].mission_slots_fired, [0], 'the slot is still spent');
  });

  it('withdraws an unaccepted request once its post TTL runs out', async () => {
    fake.tables.missions.push(
      missionRow({ status: 'open', post_expires_at: new Date(Date.now() - 1000).toISOString() }),
    );

    const { withdrawn } = await sweepExpiredMissions(null, new Date());

    assert.equal(withdrawn.length, 1);
    assert.equal(fake.tables.missions[0].status, 'expired');
    assert.equal(edits.length, 1);
    assert.deepEqual(edits[0].body.components, [], 'the dead button is removed');
    assert.deepEqual(edits[0].body.attachments, [], 'the image goes with it');
  });
});

// --- 3. the Accept claim ----------------------------------------------------

describe('the Accept button', () => {
  beforeEach(reset);

  it('rewrites the post and disables the button for the winner only', async () => {
    fake.tables.missions.push(missionRow());

    const { response } = await handleMissionAccept(click('user-a', { nick: 'Ayaka' }), 1);

    assert.equal(response.type, 7); // UPDATE_MESSAGE
    assert.match(response.data.embeds[0].description, /has picked up the mission/);
    assert.equal(response.data.components[0].components[0].disabled, true);
    assert.equal(fake.tables.missions[0].accepted_by, 'user-a');
    assert.equal(fake.tables.missions[0].status, 'accepted');
  });

  it('leaves the post and its live button alone when someone loses the race', async () => {
    fake.tables.missions.push(missionRow());

    await handleMissionAccept(click('user-a'), 1);
    const { response } = await handleMissionAccept(click('user-b'), 1);

    assert.equal(response.type, 4); // CHANNEL_MESSAGE_WITH_SOURCE
    assert.equal(response.data.flags, 64); // EPHEMERAL
    assert.match(response.data.content, /Someone got there first/);
    assert.equal(fake.tables.missions[0].accepted_by, 'user-a', 'the winner keeps it');
  });

  it('turns a player away once they have taken their allowance for the day', async () => {
    // Accepted, not completed: taking missions and letting them lapse still
    // spends the server's requests, so it still spends the player's day.
    for (let i = 0; i < DAILY_LEAD_CAP; i++) {
      fake.tables.missions.push(
        missionRow({
          id: 100 + i,
          status: 'expired',
          accepted_by: 'user-a',
          accepted_at: new Date().toISOString(),
        }),
      );
    }
    fake.tables.missions.push(missionRow({ id: 200, status: 'open' }));

    const { response } = await handleMissionAccept(click('user-a'), 200);

    assert.equal(response.data.flags, 64); // EPHEMERAL
    assert.match(response.data.content, new RegExp(`${DAILY_LEAD_CAP} missions for today`));

    // The whole reason the cap exists: the request stays on the board for the
    // next person, exactly as a lost race would leave it.
    const offered = fake.tables.missions.find((r) => r.id === 200);
    assert.equal(offered.status, 'open');
    assert.equal(offered.accepted_by, undefined);
  });

  it('lets a different player take the request the capped one was refused', async () => {
    for (let i = 0; i < DAILY_LEAD_CAP; i++) {
      fake.tables.missions.push(
        missionRow({ id: 100 + i, status: 'expired', accepted_by: 'user-a', accepted_at: new Date().toISOString() }),
      );
    }
    fake.tables.missions.push(missionRow({ id: 200, status: 'open' }));

    await handleMissionAccept(click('user-a'), 200);
    const { response } = await handleMissionAccept(click('user-b'), 200);

    assert.equal(response.type, 7); // UPDATE_MESSAGE — a real pickup
    assert.equal(fake.tables.missions.find((r) => r.id === 200).accepted_by, 'user-b');
  });

  it('does not count yesterday against today', async () => {
    const yesterday = new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString();
    for (let i = 0; i < DAILY_LEAD_CAP + 2; i++) {
      fake.tables.missions.push(
        missionRow({ id: 100 + i, status: 'completed', accepted_by: 'user-a', accepted_at: yesterday }),
      );
    }
    fake.tables.missions.push(missionRow({ id: 200, status: 'open' }));

    const { response } = await handleMissionAccept(click('user-a'), 200);
    assert.equal(response.type, 7, 'the board is theirs again tomorrow');
  });

  it('counts today from local midnight, the same day the slot window uses', () => {
    const start = new Date(localDayStart(new Date(2026, 8, 5, 23, 30)));
    assert.equal(start.getHours(), 0);
    assert.equal(start.getDate(), 5, 'still the same local day at 23:30');
  });

  it('names the command that finishes the mission a busy user is already holding', async () => {
    fake.tables.missions.push(
      missionRow({ id: 1, mission_type: 'errand', status: 'accepted', accepted_by: 'user-a' }),
    );
    fake.tables.missions.push(missionRow({ id: 2, status: 'open' }));

    const { response } = await handleMissionAccept(click('user-a'), 2);

    assert.equal(response.data.flags, 64);
    assert.match(response.data.content, /\/docs/, 'points at the errand’s own command');
    // The mission they could not take is untouched and still open for someone
    // else — an ineligible click must never consume it.
    assert.equal(fake.tables.missions[1].status, 'open');
    assert.equal(fake.tables.missions[1].accepted_by, undefined);
  });
});

// --- 4. errands -------------------------------------------------------------

describe('errands', () => {
  beforeEach(reset);

  function seedErrand({ userId = 'user-a', targets = ['mio', 'shion'], signed = [] } = {}) {
    fake.tables.missions.push(
      missionRow({
        id: 1,
        mission_type: 'errand',
        house: 'Dionysia',
        status: 'accepted',
        accepted_by: userId,
        signatures: Object.fromEntries(
          targets.map((id) => [id, signed.includes(id) ? new Date().toISOString() : null]),
        ),
      }),
    );
  }

  const signatureRow = () => fake.tables.missions[0].signatures;

  it('signs a target off at the response step, and only a target', async () => {
    seedErrand();

    const hit = await buildResponseResultMessage('user-a', 'mio', 'kind');
    assert.match(hit.content, /Signature collected — 1 \/ 2/);

    // A non-target student of the same house does nothing. There are exactly N
    // target rows and filing needs all of them, so the reward is always N.
    const miss = await buildResponseResultMessage('user-a', 'jo', 'kind');
    assert.doesNotMatch(miss.content, /Signature collected/);

    const signed = Object.entries(signatureRow()).filter(([, at]) => at != null);
    assert.deepEqual(signed.map(([id]) => id), ['mio']);
  });

  it('signs a target once, however many times they are met', async () => {
    seedErrand();

    await buildResponseResultMessage('user-a', 'mio', 'kind');
    const again = await buildResponseResultMessage('user-a', 'mio', 'kind');

    assert.doesNotMatch(again.content, /Signature collected/);
    assert.equal(Object.values(signatureRow()).filter((at) => at != null).length, 1);
  });

  it('keeps the Complete mission button disabled, and names who is missing', async () => {
    seedErrand({ signed: ['mio'] });

    const { reply } = await handleDocs(command('user-a'));
    const button = reply.components[0].components[0];

    assert.equal(button.disabled, true);
    assert.match(reply.content, /🔒 Need 1 more/);
    assert.match(reply.content, /Shion Genkai/);
    assert.match(reply.content, /✅ Mio Susuhara/);
    assert.match(reply.content, /⬜ Shion Genkai/);
  });

  it('refuses to file early, even from a stale button', async () => {
    seedErrand({ signed: ['mio'] });

    const { response } = await handleMissionFile(click('user-a'), 1);

    assert.match(response.data.content, /still short a signature/);
    assert.equal(fake.tables.missions[0].status, 'accepted');
    assert.equal(fake.tables.mission_log.length, 0);
  });

  it('pays one point per signature and banks a reset rather than spending it', async () => {
    seedErrand({ signed: ['mio', 'shion'] });
    fake.tables.command_limits.push(
      { discord_user_id: 'user-a', command_name: 'roam', last_used_at: new Date().toISOString() },
      { discord_user_id: 'user-a', command_name: 'meet', last_used_at: new Date().toISOString() },
    );

    const { response, afterReply } = await handleMissionFile(click('user-a'), 1);
    await afterReply();

    assert.match(response.data.content, /\*\*\+2 house logs\*\*/);
    assert.match(response.data.content, /banked/i);
    assert.equal(fake.tables.missions[0].status, 'completed');

    assert.equal(fake.tables.mission_log.length, 1);
    assert.equal(fake.tables.mission_log[0].points, 2, 'one point per signature');
    assert.equal(fake.tables.mission_log[0].role, 'lead');
    assert.equal(fake.tables.mission_log[0].house, 'Dionysia');

    // The whole point of banking: the clock the player was already running is
    // untouched until they choose to spend.
    assert.equal(fake.tables.command_limits.length, 2, 'the cooldown is left alone');
    // The mission_log row IS the banked reset — unspent while reset_spent_at
    // is null, so there is no second table to check.
    assert.equal(fake.tables.mission_log[0].reset_spent_at, undefined);
  });

  it('sends someone holding a riddle to /riddle rather than the report sheet', async () => {
    fake.tables.missions.push(
      missionRow({ status: 'accepted', accepted_by: 'user-a', mission_type: 'riddle' }),
    );

    const { reply } = await handleDocs(command('user-a'));
    assert.match(reply.content, /\/riddle/);
    assert.equal(reply.components, undefined);
  });
});

// --- 5. riddles -------------------------------------------------------------

describe('riddles', () => {
  beforeEach(reset);

  const RIDDLE = RIDDLES.Frostheim[0];

  function seedRiddle(userId = 'user-a') {
    fake.tables.missions.push(
      missionRow({
        id: 1,
        mission_type: 'riddle',
        house: 'Frostheim',
        riddle_id: RIDDLE.id,
        status: 'accepted',
        accepted_by: userId,
      }),
    );
  }

  it('every authored riddle answers to a student of its own house', () => {
    for (const [house, pool] of Object.entries(RIDDLES)) {
      assert.ok(pool.length > 0, `${house} has no riddles`);
      for (const riddle of pool) {
        assert.ok(
          getHouseRoster(house).some((c) => c.id === riddle.answer),
          `${riddle.id} answers ${riddle.answer}, who is not in ${house}`,
        );
        assert.equal(getRiddle(house, riddle.id), riddle, `${riddle.id} is not retrievable by id`);
      }
    }
  });

  it('every student has exactly two riddles, and every riddle id is unique', () => {
    const byAnswer = new Map();
    const ids = new Set();
    for (const [house, pool] of Object.entries(RIDDLES)) {
      for (const riddle of pool) {
        assert.ok(!ids.has(riddle.id), `${riddle.id} is used twice`);
        ids.add(riddle.id);
        byAnswer.set(riddle.answer, (byAnswer.get(riddle.answer) || 0) + 1);
      }
      for (const character of getHouseRoster(house)) {
        assert.equal(
          byAnswer.get(character.id) || 0,
          2,
          `${character.id} has ${byAnswer.get(character.id) || 0} riddles, expected 2`,
        );
      }
    }
  });

  it('pays a point and banks a both-command reset on the right name', async () => {
    seedRiddle();
    fake.tables.command_limits.push({
      discord_user_id: 'user-a',
      command_name: 'roam',
      last_used_at: new Date().toISOString(),
    });

    const { reply, afterReply } = await handleRiddle(
      command('user-a', [{ name: 'answer', value: RIDDLE.answer }]),
    );
    await afterReply();

    assert.match(reply.content, /Debunked/);
    assert.equal(fake.tables.missions[0].status, 'completed');
    assert.equal(fake.tables.mission_log[0].points, 1);
    assert.equal(fake.tables.command_limits.length, 1, 'the cooldown is left alone');
    assert.equal(fake.tables.mission_log[0].reset_spent_at, undefined, 'banked, not spent');
  });

  it('costs a wrong answer a cooldown, and refuses the next guess inside it', async () => {
    seedRiddle();
    const now = new Date();

    const wrong = await handleRiddle(command('user-a', [{ name: 'answer', value: 'romeo' }]), now);
    assert.equal(wrong.afterReply, null);
    assert.equal(fake.tables.missions[0].status, 'accepted');

    // The gate is checked before the match, so even the right name has to wait
    // — that is what stops someone typing all 26 in quick succession.
    const rushed = await handleRiddle(
      command('user-a', [{ name: 'answer', value: RIDDLE.answer }]),
      new Date(now.getTime() + 5_000),
    );
    assert.match(rushed.reply.content, /try again in/);
    assert.equal(fake.tables.missions[0].status, 'accepted');

    const later = await handleRiddle(
      command('user-a', [{ name: 'answer', value: RIDDLE.answer }]),
      new Date(now.getTime() + 21_000),
    );
    assert.match(later.reply.content, /Debunked/);
  });

  it('answers nothing for someone holding no mission at all', async () => {
    const { reply } = await handleRiddle(command('user-a', [{ name: 'answer', value: 'jin' }]));
    assert.match(reply.content, /no mission/i);
  });
});

// --- 6. co-op ---------------------------------------------------------------

describe('co-op', () => {
  beforeEach(reset);

  function seedCoop() {
    fake.tables.missions.push(
      missionRow({
        id: 1,
        mission_type: 'coop',
        house: 'Obscuary',
        status: 'accepted',
        accepted_by: 'user-a',
        assist_message_id: 'assist-1',
      }),
    );
  }

  it('refuses to let the accepter back themselves up', async () => {
    seedCoop();
    const { response } = await handleMissionAssistJoin(click('user-a'), 1);

    assert.match(response.data.content, /can't back yourself up/);
    assert.equal(fake.tables.missions[0].status, 'accepted');
  });

  it('pays both users a point and banks each of them a single-command reset', async () => {
    seedCoop();
    for (const userId of ['user-a', 'user-b']) {
      fake.tables.command_limits.push(
        { discord_user_id: userId, command_name: 'roam', last_used_at: new Date().toISOString() },
        { discord_user_id: userId, command_name: 'meet', last_used_at: new Date().toISOString() },
      );
    }

    const { response, afterReply } = await handleMissionAssistJoin(click('user-b'), 1);
    await afterReply();

    assert.equal(response.type, 7); // UPDATE_MESSAGE on the assist post
    assert.match(response.data.embeds[0].description, /banked a cooldown reset/);
    assert.equal(fake.tables.missions[0].status, 'completed');
    assert.equal(fake.tables.missions[0].helper_user_id, 'user-b');

    const roles = fake.tables.mission_log.map((r) => [r.discord_user_id, r.role, r.points]);
    assert.deepEqual(roles.sort(), [['user-a', 'lead', 1], ['user-b', 'assist', 1]]);

    // Half a solo clear's value — one command rather than two — but which
    // command is left for each of them to decide when they spend it.
    assert.equal(fake.tables.command_limits.length, 4, "nobody's clock is touched yet");
    const banked = fake.tables.mission_log.filter((r) => r.reset_spent_at == null);
    assert.equal(banked.length, 2);
    assert.ok(banked.every((r) => r.mission_type === 'coop'), 'a co-op row is a one-command reset');
    assert.deepEqual(banked.map((r) => r.discord_user_id).sort(), ['user-a', 'user-b']);
  });

  it('turns a second helper away rather than paying twice', async () => {
    seedCoop();

    const first = await handleMissionAssistJoin(click('user-b'), 1);
    await first.afterReply();
    const second = await handleMissionAssistJoin(click('user-c'), 1);

    assert.match(second.response.data.content, /already covered/);
    assert.equal(fake.tables.mission_log.length, 2, 'still just the pair');
  });

  it('does not spend the helper’s own mission slot', async () => {
    seedCoop();
    // user-b is already running an errand of their own.
    fake.tables.missions.push(
      missionRow({ id: 2, mission_type: 'errand', status: 'accepted', accepted_by: 'user-b' }),
    );

    const { afterReply } = await handleMissionAssistJoin(click('user-b'), 1);
    await afterReply();

    assert.equal(fake.tables.missions[1].status, 'accepted', 'their own mission is untouched');
    assert.equal(fake.tables.missions[1].accepted_by, 'user-b');
  });
});

// --- /mission ---------------------------------------------------------------

describe('/mission', () => {
  beforeEach(reset);

  it('reveals the house, the type and the instructions to the holder', async () => {
    fake.tables.missions.push(
      missionRow({
        status: 'accepted',
        accepted_by: 'user-a',
        mission_type: 'riddle',
        house: 'Frostheim',
        riddle_id: RIDDLES.Frostheim[0].id,
      }),
    );

    const { reply } = await handleMission(command('user-a'));

    assert.equal(reply.flags, 64, 'the briefing is never public');
    assert.match(reply.content, /Frostheim/);
    assert.match(reply.content, /riddle/);
    assert.match(reply.content, new RegExp(RIDDLES.Frostheim[0].prompt.slice(0, 40)));
    assert.match(reply.content, /Answer with `\/riddle/, 'instructions are always present');
  });

  it('points at the next briefing when the user holds nothing', async () => {
    const now = new Date();
    const day = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    fake.tables.guild_settings.push(
      guildRow({
        mission_slots_day: day,
        mission_slots_today: [new Date(now.getTime() + 3600_000).toISOString()],
        mission_slots_fired: [],
      }),
    );

    const { reply } = await handleMission(command('user-a'), now);
    assert.match(reply.content, /next briefing lands around <t:\d+:t>/);
  });
});

// --- banked cooldown resets -------------------------------------------------

describe('banked cooldown resets', () => {
  beforeEach(reset);

  const HOURS_3 = 3 * 60 * 60 * 1000;

  function onCooldown(userId, commands = ['roam', 'meet'], ago = 60_000) {
    for (const command of commands) {
      fake.tables.command_limits.push({
        discord_user_id: userId,
        command_name: command,
        last_used_at: new Date(Date.now() - ago).toISOString(),
      });
    }
  }

  // A banked reset is just an unspent mission_log row. 'coop' clears one
  // command, anything else clears both — the scope is the mission type.
  function bank(userId, type = 'riddle', completedAt = new Date()) {
    fake.tables.mission_log.push({
      discord_user_id: userId,
      house: 'Frostheim',
      mission_type: type,
      role: type === 'coop' ? 'assist' : 'lead',
      points: 1,
      completed_at: completedAt.toISOString(),
      reset_spent_at: null,
    });
  }

  const banked = (userId) => fake.tables.mission_log.filter(
    (r) => r.discord_user_id === userId && r.reset_spent_at == null,
  );
  const spent = (userId) => fake.tables.mission_log.filter(
    (r) => r.discord_user_id === userId && r.reset_spent_at != null,
  );

  it('offers nothing when the player has none banked', async () => {
    const data = await cooldownReplyWithReset('user-a', 'roam', 'You can use /roam again in 2h.');

    assert.equal(data.content, 'You can use /roam again in 2h.');
    assert.equal(data.components, undefined, 'no button without a reward to spend');
    assert.equal(data.flags, 64);
  });

  it('attaches a spend button, routed to the command that was blocked', async () => {
    bank('user-a');
    const data = await cooldownReplyWithReset('user-a', 'meet', 'You can use /meet again in 2h.');

    const button = data.components[0].components[0];
    assert.equal(button.custom_id, 'mission:reset:meet');
    assert.match(data.content, /1 cooldown reset/);
  });

  it('spends one and clears both commands for a solo mission’s reward', async () => {
    onCooldown('user-a');
    bank('user-a', 'riddle');

    const { outcome, refusal } = await handleCooldownReset(click('user-a'), 'roam');

    assert.equal(outcome, 'both');
    assert.equal(refusal, null);
    assert.equal(fake.tables.command_limits.length, 0, 'both clocks cleared');
    assert.equal(spent('user-a')[0].reset_spent_on, 'both');
  });

  it('clears only the blocked command for a co-op’s reward, chosen at spend time', async () => {
    onCooldown('user-a');
    bank('user-a', 'coop');

    const { outcome } = await handleCooldownReset(click('user-a'), 'meet');

    assert.equal(outcome, 'meet');
    assert.deepEqual(fake.tables.command_limits.map((r) => r.command_name), ['roam']);
    assert.equal(spent('user-a')[0].reset_spent_on, 'meet');
  });

  it('spends the cheapest sufficient reset first, keeping the better one banked', async () => {
    onCooldown('user-a');
    bank('user-a', 'riddle', new Date(Date.now() - 10_000)); // older, but worth more
    bank('user-a', 'coop');

    await handleCooldownReset(click('user-a'), 'roam');

    assert.deepEqual(spent('user-a').map((r) => r.mission_type), ['coop']);
    assert.deepEqual(
      banked('user-a').map((r) => r.mission_type),
      ['riddle'],
      'the two-command reset survives',
    );
  });

  it('refuses, and keeps the reset, when that clock is already clear', async () => {
    // The exact case this whole design exists for: a mission finished minutes
    // before the cooldown lapsed must not quietly eat the reward.
    onCooldown('user-a', ['roam'], HOURS_3 + 1000);
    bank('user-a');

    const { outcome, refusal } = await handleCooldownReset(click('user-a'), 'roam');

    assert.equal(outcome, 'not_needed');
    assert.match(refusal.data.content, /still banked/);
    assert.equal(refusal.data.flags, 64);
    assert.equal(banked('user-a').length, 1, 'nothing was spent');
  });

  it('never spends twice on a double click', async () => {
    onCooldown('user-a');
    bank('user-a', 'coop');
    bank('user-a', 'coop');

    const first = await handleCooldownReset(click('user-a'), 'roam');
    const second = await handleCooldownReset(click('user-a'), 'roam');

    assert.equal(first.outcome, 'roam');
    // The first click cleared the clock, so the second finds nothing to fix and
    // hands the spare credit back rather than burning it.
    assert.equal(second.outcome, 'not_needed');
    assert.equal(spent('user-a').length, 1);
  });

  it('drops the in-memory invoke throttle for whatever it cleared', async () => {
    // The player is certainly inside the 60s flood window — the stamp was
    // written by the same /roam that turned them away and offered the button.
    // Without this, spending a reset would hand them a cleared cooldown and
    // then refuse to let them use it.
    onCooldown('user-a');
    bank('user-a', 'riddle');

    assert.equal(claimCommandInvoke('user-a', 'roam').allowed, true);
    assert.equal(claimCommandInvoke('user-a', 'meet').allowed, true);
    assert.equal(claimCommandInvoke('user-a', 'roam').allowed, false, 'throttled, as a real user would be');

    await handleCooldownReset(click('user-a'), 'roam');

    assert.equal(claimCommandInvoke('user-a', 'roam').allowed, true, '/roam is usable immediately');
    assert.equal(claimCommandInvoke('user-a', 'meet').allowed, true, 'and so is the command it also cleared');
  });

  it('leaves the other command’s throttle alone when only one was cleared', async () => {
    onCooldown('user-a');
    bank('user-a', 'coop');

    claimCommandInvoke('user-a', 'roam');
    claimCommandInvoke('user-a', 'meet');

    await handleCooldownReset(click('user-a'), 'meet');

    assert.equal(claimCommandInvoke('user-a', 'meet').allowed, true);
    assert.equal(
      claimCommandInvoke('user-a', 'roam').allowed,
      false,
      'a single-command reset frees one command, throttle included',
    );
  });

  it('does not touch the throttle when nothing was spent', async () => {
    onCooldown('user-a');

    claimCommandInvoke('user-a', 'roam');
    const { outcome } = await handleCooldownReset(click('user-a'), 'roam');

    assert.equal(outcome, 'none');
    assert.equal(claimCommandInvoke('user-a', 'roam').allowed, false);
  });

  it('says so plainly when there is nothing banked to spend', async () => {
    onCooldown('user-a');

    const { outcome, refusal } = await handleCooldownReset(click('user-a'), 'roam');

    assert.equal(outcome, 'none');
    assert.match(refusal.data.content, /no cooldown resets banked/i);
    assert.equal(fake.tables.command_limits.length, 2, 'the cooldown stands');
  });
});

// --- the /docs field report -------------------------------------------------

describe('the field report sheet', () => {
  beforeEach(reset);

  function seed(targets, signed = []) {
    fake.tables.missions.push(
      missionRow({
        id: 1,
        mission_type: 'errand',
        house: 'Frostheim',
        status: 'accepted',
        accepted_by: 'user-a',
        signatures: Object.fromEntries(
          targets.map((id) => [id, signed.includes(id) ? new Date().toISOString() : null]),
        ),
      }),
    );
  }

  it('composes nothing until there is a signature worth previewing', async () => {
    // The common case on a fresh errand. The text checklist already says who is
    // wanted, so an empty sheet would be payload for nothing.
    seed(['jin', 'tohma']);

    const { reply } = await handleDocs(command('user-a'));
    assert.equal(reply.files, undefined);
    assert.match(reply.content, /⬜ Jin Kamurai/);
  });

  it('rides along as one attachment, however many signatures it needs', async () => {
    seed(['jin', 'tohma', 'lucas', 'kaito'], ['jin', 'tohma']);

    const { reply } = await handleDocs(command('user-a'));

    // Four signatures on one canvas, not four files. The whole sheet is a
    // single upload whatever the target count.
    assert.equal(reply.files.length, 1);
    assert.equal(reply.files[0].name, 'field-report.png');
    assert.ok(reply.files[0].attachment.length > 0);
  });

  it('keeps the roster in the message text, so the image is never load-bearing', async () => {
    seed(['jin', 'tohma'], ['jin']);

    const { reply } = await handleDocs(command('user-a'));

    assert.match(reply.content, /✅ Jin Kamurai/);
    assert.match(reply.content, /⬜ Tohma Ishibashi/);
    assert.match(reply.content, /🔒 Need 1 more/);
  });

  it('every house character has signature art to sign with', async () => {
    // A target with no art would render a blank line on an otherwise signed
    // report, which reads as a bug rather than a flourish. Benkei is excluded
    // because he has no house and so can never be drawn as a target.
    const { readdirSync } = await import('node:fs');
    const have = new Set(readdirSync('assets/signatures'));

    for (const house of MISSION_HOUSES) {
      for (const character of getHouseRoster(house)) {
        const file = `${character.firstName}_${character.lastName.split(' ').pop()}.png`;
        assert.ok(have.has(file), `${character.id} has no signature at assets/signatures/${file}`);
      }
    }
  });
});
