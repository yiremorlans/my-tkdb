// Scheduled missions (docs/scheduled-missions.md §24): a co-op whose call for
// backup nobody answers completes for the lead alone, the house going in with
// them. Setup lives in helpers/missionsHarness.js.
import { beforeEach, describe, it, mock } from 'node:test';
import assert from 'node:assert/strict';
import {
  CHANNEL,
  click,
  createMissionsHarness,
  missionRow,
  replyText,
} from './helpers/missionsHarness.js';

const h = createMissionsHarness();
mock.module('@supabase/supabase-js', h.supabaseMock);
mock.module('../discordRest.js', h.discordRestMock);
await h.load();
const { fake, edits } = h;

const {
  DEBRIEF_LINES,
  MISSION_HOUSES,
  SOLO_COOP_AFTER_HOURS,
  getHouseRoster,
  soloDebriefLines,
} = await import('../constants/missions.js');
const { sweepExpiredMissions } = await import('../missions/posts.js');
const { handleMissionAssistJoin, handleMissionDebrief } = await import('../missions/player.js');
const { getFullName } = await import('../constants/characters.js');

const HOUR = 60 * 60 * 1000;

// A Discord snowflake minted at `date`, as the assist post's id would be.
function snowflakeAt(date) {
  return String((BigInt(date.getTime()) - 1420070400000n) << 22n);
}

// An accepted co-op whose call for backup went up `ageHours` ago.
function seedCall(ageHours, overrides = {}) {
  const now = new Date();
  fake.tables.missions.push(
    missionRow({
      id: 1,
      mission_type: 'coop',
      house: 'Obscuary',
      status: 'accepted',
      accepted_by: 'user-a',
      accepted_at: new Date(now - (ageHours + 1) * HOUR).toISOString(),
      accept_expires_at: new Date(now.getTime() + 40 * HOUR).toISOString(),
      assist_message_id: snowflakeAt(new Date(now - ageHours * HOUR)),
      ...overrides,
    }),
  );
}

describe('solo co-op (§24)', () => {
  beforeEach(h.fresh);

  it('completes an unanswered call for the lead alone once it is old enough', async () => {
    seedCall(SOLO_COOP_AFTER_HOURS + 0.1);

    const { solo } = await sweepExpiredMissions(null, new Date());

    assert.equal(solo.length, 1);
    const mission = fake.tables.missions[0];
    assert.equal(mission.status, 'completed');
    assert.equal(mission.helper_user_id, undefined, 'no helper is recorded');
    const logs = fake.tables.mission_log.filter((r) => r.mission_id === 1);
    assert.deepEqual(
      logs.map((r) => [r.discord_user_id, r.role, r.points, r.mission_type]),
      [['user-a', 'lead', 1, 'coop']],
      'the lead gets the same completion a two-player co-op gives them',
    );
  });

  it('edits the call into a solo completion that pings only the lead', async () => {
    seedCall(SOLO_COOP_AFTER_HOURS + 0.1);

    await sweepExpiredMissions(null, new Date());

    const edit = edits.find((e) => e.messageId === fake.tables.missions[0].assist_message_id);
    assert.ok(edit, 'the assist post is edited');
    assert.equal(edit.channelId ?? CHANNEL, CHANNEL);
    assert.equal(edit.body.content, '<@user-a>');
    assert.deepEqual(edit.body.allowed_mentions, { users: ['user-a'] });
    const text = edit.body.embeds[0].description;
    assert.match(text, /No other inspector answered the call, so <@user-a> went in with Obscuary\./);
    assert.match(text, /Mission complete/);
    assert.doesNotMatch(text, /\bboth\b|\btwo\b/i);
    const buttons = edit.body.components[0].components;
    assert.deepEqual(buttons.map((b) => b.custom_id), ['mission:debrief:1:lead']);
  });

  for (const [what, seed] of [
    ['a call younger than the wait', () => seedCall(SOLO_COOP_AFTER_HOURS - 0.5)],
    ['a co-op whose lead never called', () => seedCall(10, { assist_message_id: null })],
    ['a co-op someone already joined', () => seedCall(10, { helper_user_id: 'user-b', status: 'completed' })],
  ]) {
    it(`leaves ${what} alone`, async () => {
      seed();
      const before = { ...fake.tables.missions[0] };

      const { solo } = await sweepExpiredMissions(null, new Date());

      assert.equal(solo.length, 0);
      assert.equal(fake.tables.missions[0].status, before.status);
      assert.equal((fake.tables.mission_log || []).length, 0);
    });
  }

  it('turns a late Join click away once the house has gone in', async () => {
    seedCall(SOLO_COOP_AFTER_HOURS + 0.1);
    await sweepExpiredMissions(null, new Date());

    const { response } = await handleMissionAssistJoin(click('user-b'), 1);

    assert.match(response.data.content, /already covered/);
    assert.equal(fake.tables.mission_log.length, 1, 'no second completion');
  });

  it('reopens the co-op for the next sweep when the reward write fails', async () => {
    seedCall(SOLO_COOP_AFTER_HOURS + 0.1);
    fake.forceError('rpc', 'record_mission_completion', { message: 'boom' });

    const { solo } = await sweepExpiredMissions(null, new Date());

    assert.equal(solo.length, 0);
    assert.equal(fake.tables.missions[0].status, 'accepted', 'the close is undone');
  });

  it('debriefs the lead with a student whose line fits one inspector', async () => {
    seedCall(SOLO_COOP_AFTER_HOURS + 0.1);
    await sweepExpiredMissions(null, new Date());

    for (let i = 0; i < 20; i++) {
      fake.tables.missions[0].lead_debriefed_at = null;
      const { followup } = await handleMissionDebrief(click('user-a'), 1, 'lead');
      const [header, , quoted] = replyText(followup).split('\n');
      const student = getHouseRoster('Obscuary').find((c) => header === `**Debrief: ${getFullName(c)}**`);
      assert.ok(student, 'a student of the house');
      const line = quoted.replace(/^"|"$/g, '');
      assert.ok(soloDebriefLines(student.id).includes(line), `${student.id}: "${line}" is solo-safe`);
    }
  });

  it('refuses the debrief to anyone but the lead', async () => {
    seedCall(SOLO_COOP_AFTER_HOURS + 0.1);
    await sweepExpiredMissions(null, new Date());

    for (const role of ['lead', undefined]) {
      const { response } = await handleMissionDebrief(click('user-c'), 1, role);
      assert.match(response.data.content, /isn't yours/);
    }
    assert.equal(fake.tables.missions[0].lead_debriefed_at, undefined, 'nothing claimed');
  });

  it('has a solo-safe debrief line for every house, none of them plural', () => {
    for (const house of MISSION_HOUSES) {
      const lines = getHouseRoster(house).flatMap(({ id }) => soloDebriefLines(id));
      assert.ok(lines.length, `${house} has a student who can debrief a solo co-op`);
      for (const line of lines) {
        assert.doesNotMatch(line, /\byou two\b|\bboth\b|\beither of you\b|\bbetween you\b/i, line);
        assert.ok(Object.values(DEBRIEF_LINES).some((pool) => pool.includes(line)), 'drawn from the shared pool');
      }
    }
  });
});
