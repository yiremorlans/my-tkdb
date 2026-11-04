// Scheduled missions (docs/scheduled-missions.md): errands, signing targets at
// the response step and filing the report, the house change and the
// Chancellor's audience (/request), and the /docs field report sheet. Setup
// lives in helpers/missionsHarness.js.
import { beforeEach, describe, it, mock } from 'node:test';
import assert from 'node:assert/strict';
import {
  click,
  command,
  createMissionsHarness,
  missionRow,
} from './helpers/missionsHarness.js';

const h = createMissionsHarness();
mock.module('@supabase/supabase-js', h.supabaseMock);
mock.module('../discordRest.js', h.discordRestMock);
await h.load();
const { fake, interactionEdits, discordFail } = h;

const { getHouseRoster, RIDDLES } = await import('../constants/missions.js');
const { handleDocs, handleMission, handleMissionAccept, handleMissionFile } = await import(
  '../missions/player.js'
);
const {
  handleMissionHouseChange,
  handleRequest,
  clearChancellorAudiences,
} = await import('../missions/houseChange.js');
const { buildResponseResultMessage } = await import('../encounters.js');

// --- 4. errands -------------------------------------------------------------

describe('errands', () => {
  beforeEach(h.fresh);

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
    assert.match(hit.content, /Signature collected: 1 \/ 2/);

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

  it('shows the store credit the completion actually banked, with the new balance', async () => {
    seedErrand({ signed: ['mio', 'shion'] });
    fake.tables.user_activity.push({ discord_user_id: 'user-a', store_credit: 5 });

    const { response } = await handleMissionFile(click('user-a'), 1);

    // Recorded before the reply, so the line reads back the write.
    assert.equal(fake.tables.user_activity[0].store_credit, 7, 'fed in the completion write');
    assert.equal(fake.tables.house_progress[0].points, 2, 'house points move by the same amount');
    assert.match(response.data.content, /\*\*\+2 💎\*\* · 💎 7$/);
  });

  it('starts a wallet for a player with no activity row yet', async () => {
    seedErrand({ signed: ['mio', 'shion'] });

    const { response } = await handleMissionFile(click('user-a'), 1);
    assert.match(response.data.content, /\*\*\+2 💎\*\* · 💎 2$/);
    assert.deepEqual(
      fake.tables.user_activity.map((r) => [r.discord_user_id, r.store_credit]),
      [['user-a', 2]],
    );
  });

  it('leaves the errand open to file again when the filing fails', async () => {
    seedErrand({ signed: ['mio', 'shion'] });
    fake.forceError('rpc', 'file_errand_and_record', { message: 'boom' });

    const { response } = await handleMissionFile(click('user-a'), 1);
    assert.match(response.data.content, /Something went wrong filing that/);
    assert.equal(fake.tables.missions[0].status, 'accepted');
    assert.equal(fake.tables.mission_log.length, 0);

    // The same button works on the retry.
    const retry = await handleMissionFile(click('user-a'), 1);
    assert.match(retry.response.data.content, /Report filed/);
    assert.equal(fake.tables.mission_log.length, 1);
  });

  it('sends someone holding a riddle to /riddle rather than the report sheet', async () => {
    fake.tables.missions.push(
      missionRow({ status: 'accepted', accepted_by: 'user-a', mission_type: 'riddle' }),
    );

    const { reply } = await handleDocs(command('user-a'));
    assert.match(reply.content, /\/riddle/);
    assert.equal(reply.components, undefined);
  });

  // --- house change (migration 025) ---

  // The Chancellor's audience is a 20% roll on the click; pin it either way.
  const NO_AUDIENCE = { random: () => 1 };
  const AUDIENCE = { random: () => 0 };

  const houseChangeButtonOf = (components) =>
    components[0].components.find((c) => c.custom_id.startsWith('mission:house:1'));

  it('offers a house change on the briefing and the report sheet of a fresh errand', async () => {
    seedErrand();

    const { reply: briefing } = await handleMission(command('user-a'));
    assert.equal(houseChangeButtonOf(briefing.components).disabled, false);
    assert.match(briefing.content, /Don't like the house\?/);
    assert.equal(briefing.flags, 64);

    const { reply: docs } = await handleDocs(command('user-a'));
    assert.equal(houseChangeButtonOf(docs.components).disabled, false);
    assert.equal(docs.components[0].components[0].custom_id, 'mission:file:1');
    assert.equal(houseChangeButtonOf(docs.components).custom_id, 'mission:house:1:docs');
  });

  it('redraws a /docs click as the new house\'s report sheet, not a briefing', async () => {
    seedErrand();

    const { response } = await handleMissionHouseChange(click('user-a'), 1, 'docs', NO_AUDIENCE);
    const row = fake.tables.missions[0];

    assert.equal(response.type, 7);
    assert.match(response.data.content, /New house assigned/);
    assert.match(response.data.content, new RegExp(`DARKWICK FIELD REPORT — ${row.house}`));
    assert.doesNotMatch(response.data.content, /MISSION BRIEFING/);
    assert.doesNotMatch(response.data.content, /already spent/, 'the 🔒 on the button says it');

    const [file, houseButton] = response.data.components[0].components;
    assert.equal(file.custom_id, 'mission:file:1');
    assert.equal(file.disabled, true, 'nothing signed for the new house yet');
    assert.equal(houseButton.disabled, true);
    assert.equal(houseButton.emoji?.name, '🔒');
    assert.equal(response.data.flags, undefined, 'an edit, not a new ephemeral');
  });

  it('carries the house-change button on the pickup briefing', async () => {
    fake.tables.missions.push(
      missionRow({ id: 1, mission_type: 'errand', house: 'Dionysia', status: 'open', signatures: { mio: null } }),
    );

    const { followup } = await handleMissionAccept(click('user-a'), 1);
    assert.equal(followup.flags, 64);
    assert.equal(houseChangeButtonOf(followup.components).disabled, false);
  });

  it('moves the errand to a different house with a fresh draw, once', async () => {
    seedErrand();
    const before = { ...fake.tables.missions[0] };

    const { response } = await handleMissionHouseChange(click('user-a'), 1, undefined, NO_AUDIENCE);
    const row = fake.tables.missions[0];

    assert.equal(response.type, 7, 'replaces the message the button sat on');
    assert.notEqual(row.house, 'Dionysia', 'never lands on the same house');
    assert.ok(row.house_changed_at);
    const roster = getHouseRoster(row.house).map((c) => c.id);
    const targets = Object.keys(row.signatures);
    assert.ok(targets.length >= 1 && targets.length <= roster.length);
    assert.ok(targets.every((id) => roster.includes(id)));
    assert.ok(Object.values(row.signatures).every((at) => at == null));

    // Same mission, same clock: only the house and the draw moved.
    assert.equal(row.accept_expires_at, before.accept_expires_at);
    assert.equal(row.status, 'accepted');
    assert.match(response.data.content, new RegExp(row.house));
    assert.equal(houseChangeButtonOf(response.data.components).disabled, true);
    assert.doesNotMatch(response.data.content, /already spent/, 'the 🔒 on the button says it');
    assert.match(response.data.content, /New house assigned\.[^\n]*$/, 'the done line closes the message');
    assert.doesNotMatch(response.data.content, /Don't like the house\?/, 'no offer once it is spent');

    // A stale button can't spend it twice.
    const house = row.house;
    const again = await handleMissionHouseChange(click('user-a'), 1, undefined, NO_AUDIENCE);
    assert.match(again.response.data.content, /already spent/);
    assert.equal(fake.tables.missions[0].house, house);
  });

  it('closes the house change once a signature is in', async () => {
    seedErrand({ signed: ['mio'] });

    const { reply } = await handleDocs(command('user-a'));
    assert.equal(houseChangeButtonOf(reply.components).disabled, true);
    assert.equal(houseChangeButtonOf(reply.components).emoji?.name, '🔒');
    assert.match(reply.content, /closes once a signature is in/);

    const { response } = await handleMissionHouseChange(click('user-a'), 1, undefined, NO_AUDIENCE);
    assert.match(response.data.content, /closes once a signature is in/);
    assert.equal(fake.tables.missions[0].house, 'Dionysia');
    assert.equal(fake.tables.missions[0].house_changed_at, undefined);
  });

  it("won't change the house on someone else's errand", async () => {
    seedErrand();

    const { response } = await handleMissionHouseChange(click('user-b'), 1, undefined, NO_AUDIENCE);
    assert.match(response.data.content, /already closed/);
    assert.equal(fake.tables.missions[0].house, 'Dionysia');
  });

  // --- the Chancellor's audience (/request) ---

  const requestCommand = (userId, house) => command(userId, [{ name: 'house', value: house }]);
  const clickWithToken = (userId) => ({ ...click(userId), token: 'click-token' });

  async function openAudience(from) {
    const result = await handleMissionHouseChange(clickWithToken('user-a'), 1, from, AUDIENCE);
    result.onSent?.({ id: 'audience-1' });
    return result;
  }

  it('sometimes opens an audience instead of rerolling, spending nothing', async () => {
    seedErrand();

    const { response } = await openAudience();
    assert.equal(response.type, 4, 'a new message beside the briefing, not an edit of it');
    assert.equal(response.data.flags, 64 | 32768, 'ephemeral and V2');
    assert.equal(response.data.content, undefined, 'V2 carries no content');
    const [section] = response.data.components[0].components;
    assert.equal(section.type, 9, 'text beside the portrait, like a mission post');
    assert.match(section.components[0].content, /Chancellor/);
    assert.match(section.components[0].content, /\/request/);
    assert.equal(section.accessory.type, 11);
    assert.equal(section.accessory.media.url, 'https://tkdb.test/assets/expressions/cornelius/default.png');

    assert.equal(fake.tables.missions[0].house, 'Dionysia');
    assert.equal(fake.tables.missions[0].house_changed_at, undefined);
    assert.ok(fake.tables.missions[0].chancellor_audience_at, 'stamped on the row');
  });

  it('keeps an audience open across a restart, answering on the reply', async () => {
    seedErrand();
    await openAudience();
    clearChancellorAudiences(); // what a restart does to the in-memory edit handles

    const { reply } = await handleRequest(requestCommand('user-a', 'Jabberwock'));
    const row = fake.tables.missions[0];
    assert.equal(row.house, 'Jabberwock');
    assert.ok(row.house_changed_at, 'spending the change closes the audience');
    assert.equal(interactionEdits.length, 0, 'no token to edit with');
    assert.match(reply.content, /Jabberwock/);
    assert.match(reply.content, /MISSION BRIEFING/);
  });

  it('reopens from the row after a restart without a second roll', async () => {
    seedErrand();
    await openAudience();
    clearChancellorAudiences();

    const { response } = await handleMissionHouseChange(clickWithToken('user-a'), 1, undefined, NO_AUDIENCE);
    assert.equal(response.data.flags, 64 | 32768);
    assert.equal(fake.tables.missions[0].house, 'Dionysia');
  });

  it('moves the errand to the named house and edits both messages in place', async () => {
    seedErrand();
    await openAudience();

    const { reply } = await handleRequest(requestCommand('user-a', 'Obscuary'));
    const row = fake.tables.missions[0];
    assert.equal(row.house, 'Obscuary');
    assert.ok(row.house_changed_at);
    const roster = getHouseRoster('Obscuary').map((c) => c.id);
    assert.ok(Object.keys(row.signatures).every((id) => roster.includes(id)));

    const audienceEdit = interactionEdits.find((e) => e.messageId === 'audience-1');
    assert.equal(audienceEdit.token, 'click-token');
    const [grantedSection] = audienceEdit.body.components[0].components;
    assert.equal(grantedSection.accessory.media.url, 'https://tkdb.test/assets/expressions/cornelius/close.png');
    assert.match(grantedSection.components[0].content, /Obscuary/);
    assert.equal(audienceEdit.body.flags, 32768, 'an edit keeps V2 and leaves ephemeral alone');

    const briefingEdit = interactionEdits.find((e) => e.messageId === '@original');
    assert.match(briefingEdit.body.content, /MISSION BRIEFING\*\*  ·  Obscuary/);
    assert.match(briefingEdit.body.content, /New house assigned/);
    assert.equal(houseChangeButtonOf(briefingEdit.body.components).disabled, true);

    assert.match(reply.content, /Request filed/);

    // The audience is over once it's been answered.
    const again = await handleRequest(requestCommand('user-a', 'Frostheim'));
    assert.match(again.reply.content, /isn't hearing requests/);
    assert.equal(fake.tables.missions[0].house, 'Obscuary');
  });

  it('redraws a /docs audience as the report sheet', async () => {
    seedErrand();
    await openAudience('docs');

    await handleRequest(requestCommand('user-a', 'Hotarubi'));
    const briefingEdit = interactionEdits.find((e) => e.messageId === '@original');
    assert.match(briefingEdit.body.content, /DARKWICK FIELD REPORT — Hotarubi/);
  });

  it('carries the new house on the reply when the click token has died', async () => {
    seedErrand();
    await openAudience();
    discordFail.interaction = true;

    const { reply } = await handleRequest(requestCommand('user-a', 'Sinostra'));
    assert.equal(fake.tables.missions[0].house, 'Sinostra');
    assert.match(reply.content, /Sinostra/);
    assert.match(reply.content, /MISSION BRIEFING/);
    assert.equal(reply.attachments, undefined);
  });

  it('refuses the current house and keeps the audience open', async () => {
    seedErrand();
    await openAudience();

    const { reply } = await handleRequest(requestCommand('user-a', 'Dionysia'));
    assert.match(reply.content, /already in Dionysia/);
    assert.equal(fake.tables.missions[0].house_changed_at, undefined);

    await handleRequest(requestCommand('user-a', 'Frostheim'));
    assert.equal(fake.tables.missions[0].house, 'Frostheim');
  });

  it('a signature closes an open audience for good', async () => {
    seedErrand();
    await openAudience();

    const hit = await buildResponseResultMessage('user-a', 'mio', 'kind');
    assert.match(hit.content, /Signature collected/);

    const { reply } = await handleRequest(requestCommand('user-a', 'Frostheim'));
    assert.match(reply.content, /isn't hearing requests/);
    assert.equal(fake.tables.missions[0].house, 'Dionysia');

    const { response } = await handleMissionHouseChange(clickWithToken('user-a'), 1, undefined, AUDIENCE);
    assert.match(response.data.content, /closes once a signature is in/);
  });

  it('refuses /request with no audience open', async () => {
    seedErrand();

    const { reply } = await handleRequest(requestCommand('user-a', 'Frostheim'));
    assert.match(reply.content, /isn't hearing requests/);
    assert.equal(fake.tables.missions[0].house, 'Dionysia');
  });

  it('never opens an audience once the change is closed', async () => {
    seedErrand({ signed: ['mio'] });

    const { response } = await handleMissionHouseChange(clickWithToken('user-a'), 1, undefined, AUDIENCE);
    assert.match(response.data.content, /closes once a signature is in/);
    const { reply } = await handleRequest(requestCommand('user-a', 'Frostheim'));
    assert.match(reply.content, /isn't hearing requests/);
  });

  it('never offers a house change on a riddle', async () => {
    fake.tables.missions.push(
      missionRow({ status: 'accepted', accepted_by: 'user-a', riddle_id: RIDDLES.Frostheim[0].id }),
    );

    const { reply } = await handleMission(command('user-a'));
    assert.equal(reply.components, undefined);
  });
});

// --- the /docs field report -------------------------------------------------

describe('the field report sheet', () => {
  beforeEach(h.fresh);

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
});
