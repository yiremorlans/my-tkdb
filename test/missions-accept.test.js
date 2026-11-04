// Scheduled missions (docs/scheduled-missions.md): the Accept claim race, the
// daily cap and the "you already hold one" refusal, the co-op helper, and the
// /mission briefing. Setup lives in helpers/missionsHarness.js.
import { beforeEach, describe, it, mock } from 'node:test';
import assert from 'node:assert/strict';
import {
  CHANNEL,
  click,
  command,
  createMissionsHarness,
  missionRow,
  slotGuild,
} from './helpers/missionsHarness.js';

const h = createMissionsHarness();
mock.module('@supabase/supabase-js', h.supabaseMock);
mock.module('../discordRest.js', h.discordRestMock);
await h.load();
const { fake, seedLeads, seedAssists } = h;

const {
  DAILY_LEAD_CAP,
  MISSION_ERROR_LINE,
  STORE_CREDIT_LINE,
  RIDDLES,
  localDayStart,
} = await import('../constants/missions.js');
const {
  handleMission,
  handleMissionAccept,
  handleMissionAssistJoin,
} = await import('../missions/player.js');

// --- 3. the Accept claim ----------------------------------------------------

describe('the Accept button', () => {
  beforeEach(h.fresh);

  it('rewrites the post and disables the button for the winner only', async () => {
    fake.tables.missions.push(missionRow());

    const { response } = await handleMissionAccept(click('user-a', { nick: 'Ayaka' }), 1);

    assert.equal(response.type, 7); // UPDATE_MESSAGE
    assert.match(response.data.embeds[0].description, /has picked up the mission/);
    assert.match(response.data.embeds[0].description, /^\*\*Ayaka\*\* has picked up the mission/, 'names the winner in bold, plain display name, no @tag');
    assert.equal(response.data.components[0].components[0].disabled, true);
    assert.equal(fake.tables.missions[0].accepted_by, 'user-a');
    assert.equal(fake.tables.missions[0].status, 'accepted');
  });

  it('chases the winner with an ephemeral briefing for what to do next', async () => {
    fake.tables.missions.push(missionRow());

    const { followup } = await handleMissionAccept(click('user-a'), 1);

    assert.ok(followup, 'a followup is returned for app.js to send');
    assert.equal(followup.flags, 64); // EPHEMERAL
    assert.match(followup.content, /MISSION BRIEFING|\/mission/);
  });

  it('disables the shared button when someone loses the race, and tells them so', async () => {
    fake.tables.missions.push(missionRow());

    await handleMissionAccept(click('user-a'), 1);
    const { response, followup } = await handleMissionAccept(click('user-b'), 1);

    // The mission is already taken — the post must stop taking clicks, so this
    // re-asserts the dead button rather than leaving it live (only the button
    // is touched, so a winner's "X picked it up" line is not clobbered).
    assert.equal(response.type, 7); // UPDATE_MESSAGE
    assert.equal(response.data.components[0].components[0].disabled, true);
    assert.equal(response.data.embeds, undefined, 'the winner line is left as-is');
    assert.equal(followup.flags, 64); // EPHEMERAL
    assert.match(followup.content, /Someone got there first/);
    assert.equal(fake.tables.missions[0].accepted_by, 'user-a', 'the winner keeps it');
  });

  it('refuses a busy player with the command that finishes their mission, leaving the request live', async () => {
    // user-a holds one already; clicking a second, still-open request is 'busy'
    // and must not disable that request's button for anyone else.
    fake.tables.missions.push(
      missionRow({ id: 1, mission_type: 'errand', status: 'accepted', accepted_by: 'user-a' }),
    );
    fake.tables.missions.push(missionRow({ id: 2, status: 'open' }));

    const { response } = await handleMissionAccept(click('user-a'), 2);

    assert.equal(response.type, 4); // CHANNEL_MESSAGE_WITH_SOURCE — a plain ephemeral
    assert.equal(response.data.flags, 64);
    assert.match(response.data.content, /\/docs/, 'points at the errand’s own command');
    // The mission they could not take is untouched and still open for someone
    // else — an ineligible click must never consume it.
    const offered = fake.tables.missions.find((r) => r.id === 2);
    assert.equal(offered.status, 'open');
    assert.equal(offered.accepted_by, undefined);
  });

  it('turns a player away once they have taken their allowance for the day', async () => {
    // Accepted, not completed: taking missions and letting them lapse still
    // spends the server's requests, so it still spends the player's day.
    seedLeads('user-a', DAILY_LEAD_CAP, new Date().toISOString());
    fake.tables.missions.push(missionRow({ id: 200, status: 'open' }));

    const { response } = await handleMissionAccept(click('user-a'), 200);

    assert.equal(response.data.flags, 64); // EPHEMERAL
    assert.match(response.data.content, new RegExp(`${DAILY_LEAD_CAP} missions for today`));

    // The whole reason the cap exists: the request stays on the board for the
    // next person, exactly as a lost race would leave it.
    const offered = fake.tables.missions.find((r) => r.id === 200);
    assert.equal(offered.status, 'open');
    assert.equal(offered.accepted_by, undefined);

    // And a different player can take it.
    const { response: next } = await handleMissionAccept(click('user-b'), 200);
    assert.equal(next.type, 7); // UPDATE_MESSAGE — a real pickup
    assert.equal(offered.accepted_by, 'user-b');
  });

  it('does not count yesterday against today', async () => {
    const yesterday = new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString();
    seedLeads('user-a', DAILY_LEAD_CAP + 2, yesterday);
    fake.tables.missions.push(missionRow({ id: 200, status: 'open' }));

    const { response } = await handleMissionAccept(click('user-a'), 200);
    assert.equal(response.type, 7, 'the board is theirs again tomorrow');
  });

  it('counts today from local midnight, the same day the slot window uses', () => {
    const start = new Date(localDayStart(new Date(2026, 8, 5, 23, 30)));
    assert.equal(start.getHours(), 0);
    assert.equal(start.getDate(), 5, 'still the same local day at 23:30');
  });
});

// --- 6. co-op ---------------------------------------------------------------

describe('co-op', () => {
  beforeEach(h.fresh);

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

  it('pings both players on the completion post and hands each their own Debrief button', async () => {
    seedCoop();

    const callPost = { interaction_metadata: { user: { id: 'user-a', username: 'lead-user', global_name: 'Yire' } } };
    const { response } = await handleMissionAssistJoin({ ...click('user-b', { nick: 'Alex' }), message: callPost }, 1);

    assert.equal(response.data.content, '<@user-a> <@user-b>');
    assert.deepEqual(response.data.allowed_mentions, { users: ['user-a', 'user-b'] });
    assert.deepEqual(response.data.embeds[0].description.split('\n\n'), [
      '**Alex** answered the call for backup.',
      '**Mission complete.**',
      'Both of you have banked a cooldown reset.',
      `${STORE_CREDIT_LINE(1)} each`,
    ]);
    const [lead, helper] = response.data.components[0].components;
    assert.equal(lead.custom_id, 'mission:debrief:1:lead');
    assert.equal(lead.label, 'Debrief: Yire');
    assert.equal(helper.custom_id, 'mission:debrief:1:helper');
    assert.equal(helper.label, 'Debrief: Alex');
  });

  it('falls back to a role name for a lead it cannot read, and never cuts a long name short', async () => {
    seedCoop();

    const longNick = 'A'.repeat(32); // Discord's nickname max
    const { response } = await handleMissionAssistJoin(click('user-b', { nick: longNick }), 1);

    const [lead, helper] = response.data.components[0].components;
    assert.equal(lead.label, 'Debrief: Lead');
    assert.equal(helper.label, `Debrief: ${longNick}`);
  });

  it('leaves the call for backup live when the join fails', async () => {
    seedCoop();
    fake.forceError('rpc', 'join_coop_and_record', { message: 'boom' });

    const { response } = await handleMissionAssistJoin(click('user-b'), 1);
    assert.equal(response.data.content, MISSION_ERROR_LINE);
    assert.equal(fake.tables.missions[0].status, 'accepted');
    assert.equal(fake.tables.mission_log.length, 0, 'neither side banked anything');

    const retry = await handleMissionAssistJoin(click('user-b'), 1);
    assert.match(retry.response.data.embeds[0].description, /Mission complete/);
    assert.equal(fake.tables.mission_log.length, 2);
  });

  it('turns a second helper away rather than paying twice', async () => {
    seedCoop();

    const first = await handleMissionAssistJoin(click('user-b'), 1);
    await first.afterReply();
    const second = await handleMissionAssistJoin(click('user-c'), 1);

    assert.match(second.response.data.content, /already covered/);
    assert.equal(fake.tables.mission_log.length, 2, 'still just the pair');
  });

  // One mission at a time: user-b is already holding one of their own.
  for (const [holding, type, points] of [
    ['running an errand', 'errand', /\/docs/],
    ['a co-op lead waiting on backup', 'coop', null],
  ]) {
    it(`turns a helper away while they hold a mission of their own: ${holding}`, async () => {
      seedCoop();
      fake.tables.missions.push(
        missionRow({ id: 2, mission_type: type, status: 'accepted', accepted_by: 'user-b' }),
      );

      const { response } = await handleMissionAssistJoin(click('user-b'), 1);

      assert.equal(response.data.flags, 64); // EPHEMERAL
      assert.match(response.data.content, /already have a mission in progress/);
      if (points) assert.match(response.data.content, points, 'points them at finishing it');
      assert.equal(fake.tables.missions[0].status, 'accepted', 'the call stays live');
      assert.equal(fake.tables.missions[0].helper_user_id, undefined);
      assert.equal(fake.tables.missions[1].status, 'accepted', 'their own mission is untouched');
    });
  }

  it('turns a helper away once they have taken their allowance for the day', async () => {
    seedCoop();
    seedLeads('user-b', DAILY_LEAD_CAP, new Date().toISOString());

    const { response } = await handleMissionAssistJoin(click('user-b'), 1);

    assert.equal(response.data.flags, 64); // EPHEMERAL
    assert.match(response.data.content, new RegExp(`${DAILY_LEAD_CAP} missions for today`));
    // Like a capped Accept, the call stays live for the next inspector.
    assert.equal(fake.tables.missions[0].status, 'accepted');
    assert.equal(fake.tables.missions[0].helper_user_id, undefined);

    const { response: next } = await handleMissionAssistJoin(click('user-c'), 1);
    assert.equal(next.type, 7, 'someone under the cap can still answer it');
  });

  it('counts assists toward the cap, for both assisting and accepting', async () => {
    seedAssists('user-b', DAILY_LEAD_CAP, new Date().toISOString());
    seedCoop();
    fake.tables.missions.push(missionRow({ id: 200, status: 'open' }));

    const assist = await handleMissionAssistJoin(click('user-b'), 1);
    assert.match(assist.response.data.content, new RegExp(`${DAILY_LEAD_CAP} missions for today`));
    assert.equal(fake.tables.missions.find((r) => r.id === 1).helper_user_id, undefined);

    const { response } = await handleMissionAccept(click('user-b'), 200);
    assert.match(response.data.content, new RegExp(`${DAILY_LEAD_CAP} missions for today`));
    assert.equal(fake.tables.missions.find((r) => r.id === 200).status, 'open');
  });

  it('does not count yesterday’s assists against today', async () => {
    const yesterday = new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString();
    seedAssists('user-b', DAILY_LEAD_CAP + 1, yesterday);
    seedCoop();

    const { response } = await handleMissionAssistJoin(click('user-b'), 1);
    assert.equal(response.type, 7);
  });
});

// --- /mission ---------------------------------------------------------------

describe('/mission', () => {
  beforeEach(h.fresh);

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

  it('briefs a fully signed errand as ready to file: no targets, no house change', async () => {
    const at = new Date().toISOString();
    fake.tables.missions.push(
      missionRow({
        status: 'accepted',
        accepted_by: 'user-a',
        mission_type: 'errand',
        house: 'Dionysia',
        signatures: { mio: at, shion: at },
      }),
    );

    const { reply } = await handleMission(command('user-a'));

    assert.doesNotMatch(reply.content, /Track down|nobody/);
    assert.match(reply.content, /Every signature from Dionysia is in\. The report is ready to file\./);
    assert.match(reply.content, /Open `\/docs` and click Complete mission/);
    assert.doesNotMatch(reply.content, /Meet them|House change|new house/);
    assert.equal(reply.components, undefined, 'no house-change button');
    assert.match(reply.content, /Progress: 2 \/ 2 signatures/);
  });

  it('points at the next briefing channel when the user holds nothing, without a time', async () => {
    const now = new Date();
    fake.tables.guild_settings.push(slotGuild(now, [new Date(now.getTime() + 3600_000).toISOString()]));

    const { reply } = await handleMission(command('user-a'), now);
    assert.match(reply.content, /next briefing lands later today/);
    assert.match(reply.content, new RegExp(`Watch <#${CHANNEL}>`), 'still names the channel');
    assert.doesNotMatch(reply.content, /<t:\d+/, 'never reveals the slot time');
  });
});
