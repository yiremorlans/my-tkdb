// Scheduled missions (docs/scheduled-missions.md §21): the co-op debrief, one
// boost each for the lead and the helper, and the /mission reminder. Setup
// lives in helpers/missionsHarness.js.
import { beforeEach, describe, it, mock } from 'node:test';
import assert from 'node:assert/strict';
import {
  BASE_URL,
  click,
  command,
  createMissionsHarness,
  missionRow,
  replyText,
  thumbnailOf,
} from './helpers/missionsHarness.js';

const h = createMissionsHarness();
mock.module('@supabase/supabase-js', h.supabaseMock);
mock.module('../discordRest.js', h.discordRestMock);
await h.load();
const { fake } = h;

const { DEBRIEF_LINES, MISSION_BOOST_LINE, getHouseRoster } = await import('../constants/missions.js');
const { handleMission, handleMissionDebrief } = await import('../missions/player.js');
const { getFullName } = await import('../constants/characters.js');

// --- co-op debrief ---------------------------------------------------------

describe('co-op debrief', () => {
  beforeEach(h.fresh);

  const HOUSE = 'Obscuary';

  // A co-op user-a led and user-b backed up, already complete.
  function seedCompletedCoop(overrides = {}) {
    fake.tables.missions.push(
      missionRow({
        id: 1,
        mission_type: 'coop',
        house: HOUSE,
        status: 'completed',
        accepted_by: 'user-a',
        helper_user_id: 'user-b',
        completed_at: new Date().toISOString(),
        ...overrides,
      }),
    );
  }

  function holdBoost(userId, characterId) {
    fake.tables.character_relationships.push({
      discord_user_id: userId,
      character_id: characterId,
      affinity: 0,
      pending_encounter_boost: 1,
    });
  }

  // Which student a debrief reply drew, read back off its header line.
  function drawnStudent(data) {
    const header = replyText(data).split('\n')[0];
    return getHouseRoster(HOUSE).find((c) => header === `**Debrief: ${getFullName(c)}**`);
  }

  // The completion post as Discord hands it back on a click.
  const completionPost = {
    components: [{
      type: 1,
      components: [
        { type: 2, style: 1, label: 'Debrief: Yire', custom_id: 'mission:debrief:1:lead' },
        { type: 2, style: 1, label: 'Debrief: Alex', custom_id: 'mission:debrief:1:helper' },
      ],
    }],
  };
  const postClick = (userId) => ({ ...click(userId), message: completionPost });
  // The post edit a debrief click answers with, as the buttons' disabled flags.
  const disabledOf = (response) => {
    assert.equal(response.type, 7, 'an edit of the clicked message');
    return response.data.components[0].components.map((b) => Boolean(b.disabled));
  };

  it('greys out each player\'s button on the post as they claim it, leaving the other live', async () => {
    seedCompletedCoop();

    const first = await handleMissionDebrief(postClick('user-a'), 1, 'lead');
    assert.deepEqual(disabledOf(first.response), [true, false]);
    assert.equal(first.response.data.components[0].components[0].label, 'Debrief: Yire', 'labels kept');

    const second = await handleMissionDebrief(
      { ...postClick('user-b'), message: first.response.data }, 1, 'helper',
    );
    assert.deepEqual(disabledOf(second.response), [true, true]);
  });

  // A new ephemeral either way; the post is left alone and nothing is stamped.
  for (const [who, body, role] of [
    ['a player pressing the other one\'s button', () => postClick('user-a'), 'helper'],
    ['anyone who was not on the co-op', () => click('user-c'), undefined],
  ]) {
    it(`refuses ${who}`, async () => {
      seedCompletedCoop();

      const { response } = await handleMissionDebrief(body(), 1, role);

      assert.match(response.data.content, /isn't yours/);
      assert.equal(fake.tables.missions[0].lead_debriefed_at, undefined);
      assert.equal(fake.tables.missions[0].helper_debriefed_at, undefined);
    });
  }

  it('greys out a button still live after its debrief was claimed', async () => {
    seedCompletedCoop({ lead_debriefed_at: new Date().toISOString() });

    const { response, followup } = await handleMissionDebrief(postClick('user-a'), 1, 'lead');

    assert.match(followup.content, /already been debriefed/);
    assert.deepEqual(disabledOf(response), [true, false]);
  });

  it('greys out the reminder\'s button on claim, leaving the rest of /mission alone', async () => {
    seedCompletedCoop({ id: 1, house: HOUSE, accepted_by: 'user-z', helper_user_id: 'user-a' });
    fake.tables.missions.push(
      missionRow({ id: 5, status: 'accepted', accepted_by: 'user-a', mission_type: 'errand', house: 'Frostheim', signatures: { jin: null } }),
    );
    const { reply } = await handleMission(command('user-a'));
    const reminderButton = reply.components.at(-1).components[0];
    assert.equal(reminderButton.custom_id, 'mission:debrief:1:helper', 'names their role');
    assert.equal(reminderButton.label, 'Debrief');

    const { response } = await handleMissionDebrief({ ...click('user-a'), message: reply }, 1, 'helper');

    const buttons = response.data.components.flatMap((row) => row.components);
    assert.ok(buttons.filter((b) => b !== buttons.at(-1)).every((b) => !b.disabled), 'the errand keeps its buttons');
    assert.equal(buttons.at(-1).disabled, true);
  });

  it('leaves the shared button on an older completion post live for the other player', async () => {
    seedCompletedCoop();
    const oldPost = { components: [{ type: 1, components: [{ type: 2, label: 'Debrief', custom_id: 'mission:debrief:1' }] }] };

    const { response } = await handleMissionDebrief({ ...click('user-a'), message: oldPost }, 1);

    assert.equal(response.data.components[0].components[0].disabled, undefined);
  });

  it('gives the lead and the helper one debrief each, from the co-op house', async () => {
    seedCompletedCoop();

    for (const [userId, column] of [['user-a', 'lead_debriefed_at'], ['user-b', 'helper_debriefed_at']]) {
      const { response, followup, afterReply } = await handleMissionDebrief(postClick(userId), 1);
      await afterReply();

      assert.equal(response.type, 7, 'greys the post; the debrief is a new message');
      assert.equal(followup.flags & 64, 64, 'ephemeral');
      assert.equal(followup.components[0].components.length, 1, 'no buttons');

      const student = drawnStudent(followup);
      assert.ok(student, `drew a ${HOUSE} student`);
      assert.equal(thumbnailOf(followup), `${BASE_URL}/assets/expressions/${student.id}/smile.png`);

      const [, quoted, boost, ...rest] = replyText(followup).split('\n\n');
      assert.ok(DEBRIEF_LINES[student.id].some((line) => quoted === `"${line}"`), 'the line, in quotes');
      assert.equal(boost, MISSION_BOOST_LINE(student.firstName));
      assert.deepEqual(rest, [], 'no banked-reset line: the post carries it');

      assert.ok(fake.tables.missions[0][column], `${column} stamped`);
      const row = fake.tables.character_relationships.find(
        (r) => r.discord_user_id === userId && r.character_id === student.id,
      );
      assert.equal(row.pending_encounter_boost, 1);
    }
  });

  it('refuses a second click, granting once', async () => {
    seedCompletedCoop();

    const first = await handleMissionDebrief(postClick('user-a'), 1);
    await first.afterReply();
    const second = await handleMissionDebrief(postClick('user-a'), 1);

    assert.match(second.followup.content, /already been debriefed/);
    assert.equal(second.followup.components, undefined, 'no portrait');
    assert.equal(second.afterReply, undefined);
    assert.equal(fake.tables.character_relationships.length, 1);
  });

  it('refuses a mission that never completed', async () => {
    seedCompletedCoop({ status: 'expired', helper_user_id: null, completed_at: null });

    const { response } = await handleMissionDebrief(click('user-a'), 1);
    assert.match(response.data.content, /already closed/);
  });

  it('skips students the player already holds a boost with', async () => {
    seedCompletedCoop();
    const roster = getHouseRoster(HOUSE);
    const [open, ...held] = roster;
    for (const c of held) holdBoost('user-a', c.id);

    const { followup } = await handleMissionDebrief(postClick('user-a'), 1);
    assert.equal(drawnStudent(followup).id, open.id);
  });

  it('falls back to the whole house when every student is already held, still showing the boost line', async () => {
    seedCompletedCoop();
    for (const c of getHouseRoster(HOUSE)) holdBoost('user-a', c.id);

    const { followup, afterReply } = await handleMissionDebrief(postClick('user-a'), 1);
    await afterReply();

    const student = drawnStudent(followup);
    assert.ok(student);
    assert.ok(replyText(followup).includes(MISSION_BOOST_LINE(student.firstName)));
    assert.ok(
      fake.tables.character_relationships.every((r) => r.pending_encounter_boost === 1),
      'capped at 1',
    );
  });

  it('reminds /mission of the newest unclaimed debrief, with a count of the rest', async () => {
    const earlier = new Date(Date.now() - 3600_000).toISOString();
    seedCompletedCoop({ id: 1, house: 'Frostheim', completed_at: earlier });
    seedCompletedCoop({ id: 2, house: HOUSE, accepted_by: 'user-z', helper_user_id: 'user-a' });

    const { reply } = await handleMission(command('user-a'));

    assert.match(reply.content, new RegExp(`debrief from your ${HOUSE} co-op is waiting`));
    assert.match(reply.content, /\+1 more/);
    const button = reply.components.at(-1).components[0];
    assert.equal(button.custom_id, 'mission:debrief:2:helper');

    const claimed = await handleMissionDebrief({ ...click('user-a'), message: reply }, 2, 'helper');
    await claimed.afterReply();
    const next = await handleMission(command('user-a'));
    assert.equal(next.reply.components.at(-1).components[0].custom_id, 'mission:debrief:1:lead');
    assert.doesNotMatch(next.reply.content, /more/);
  });

  it('shows the reminder below a mission the player is holding', async () => {
    seedCompletedCoop();
    fake.tables.missions.push(
      missionRow({
        id: 5,
        status: 'accepted',
        accepted_by: 'user-a',
        mission_type: 'errand',
        house: 'Frostheim',
        signatures: { jin: null },
      }),
    );

    const { reply } = await handleMission(command('user-a'));

    assert.match(reply.content, /MISSION BRIEFING/);
    assert.ok(reply.content.indexOf('debrief') > reply.content.indexOf('MISSION BRIEFING'));
    const ids = reply.components.flatMap((row) => row.components.map((c) => c.custom_id));
    assert.ok(ids.some((id) => id.startsWith('mission:house:5')), 'the errand keeps its button');
    assert.ok(ids.includes('mission:debrief:1:lead'));
  });

  it('never reminds about an expired co-op, or one already claimed', async () => {
    seedCompletedCoop({ id: 1, status: 'expired', helper_user_id: null });
    seedCompletedCoop({ id: 2, lead_debriefed_at: new Date().toISOString() });

    const { reply } = await handleMission(command('user-a'));
    assert.doesNotMatch(reply.content, /debrief/);
    assert.equal(reply.components, undefined);
  });
});
