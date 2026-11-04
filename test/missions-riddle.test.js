// Scheduled missions (docs/scheduled-missions.md): riddles, the answer gate,
// the wrong-guess cooldown and the culprit reveal. Setup lives in
// helpers/missionsHarness.js.
import { beforeEach, describe, it, mock } from 'node:test';
import assert from 'node:assert/strict';
import {
  BASE_URL,
  IS_COMPONENTS_V2,
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

const {
  BANKED_RESET_LINE,
  STORE_CREDIT_LINE,
  MISSION_BOOST_LINE,
  MISSION_ERROR_LINE,
  RIDDLE_WRONG_LINES,
  getRiddle,
  RIDDLES,
  getHouseRoster,
} = await import('../constants/missions.js');
const { handleRiddle } = await import('../missions/riddle.js');
const { getCharacterById, getFullName } = await import('../constants/characters.js');

// --- 5. riddles -------------------------------------------------------------

describe('riddles', () => {
  beforeEach(h.fresh);

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

    const { reply, followup, afterReply } = await handleRiddle(
      command('user-a', [{ name: 'answer', value: RIDDLE.answer }]),
    );
    await afterReply();

    assert.match(replyText(reply), /Debunked/);
    assert.match(followup.content, /\*\*\+1 💎\*\* · 💎 1/);
    assert.equal(fake.tables.missions[0].status, 'completed');
    assert.equal(fake.tables.mission_log[0].points, 1);
    assert.equal(fake.tables.user_activity[0].store_credit, 1);
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
    assert.equal(rushed.reply.components, undefined, 'the cooldown reply shows no face');
    assert.equal(fake.tables.missions[0].status, 'accepted');

    const later = await handleRiddle(
      command('user-a', [{ name: 'answer', value: RIDDLE.answer }]),
      new Date(now.getTime() + 21_000),
    );
    assert.match(replyText(later.reply), /Debunked/);
  });

  it('leaves the riddle open to answer again, with no wait, when the solve fails', async () => {
    seedRiddle();
    fake.forceError('rpc', 'solve_riddle', { message: 'boom' });
    const now = new Date();

    const failed = await handleRiddle(
      command('user-a', [{ name: 'answer', value: RIDDLE.answer }]),
      now,
    );
    assert.equal(failed.reply.content, MISSION_ERROR_LINE);
    assert.equal(fake.tables.missions[0].status, 'accepted');
    assert.equal(fake.tables.mission_log.length, 0);

    // Not a wrong answer, so no cooldown: the retry goes straight through.
    const retry = await handleRiddle(
      command('user-a', [{ name: 'answer', value: RIDDLE.answer }]),
      new Date(now.getTime() + 1_000),
    );
    assert.match(replyText(retry.reply), /Debunked/);
    assert.equal(fake.tables.mission_log.length, 1);
  });

  // A wrong name draws the accused's annoyed face, with the generic line (no
  // accused dialogue, no name). A miss that names nobody goes out as text.
  for (const [what, answer, face] of [
    ['shows the accused their annoyed face on a wrong name', 'romeo', 'romeo/annoyed.png'],
    ['substitutes the serious face for an accused with no annoyed drawing', 'alan', 'alan/serious.png'],
    ['answers a miss in plain text, with no portrait', 'the janitor', null],
  ]) {
    it(`${what}, with the generic line`, async () => {
      seedRiddle();

      const { reply, afterReply } = await handleRiddle(command('user-a', [{ name: 'answer', value: answer }]));

      assert.equal(afterReply, null);
      assert.equal(reply.flags & 64, 64, 'ephemeral');
      assert.ok(RIDDLE_WRONG_LINES.includes(replyText(reply)), 'no accused dialogue, no name');
      if (face) {
        assert.equal(reply.flags & IS_COMPONENTS_V2, IS_COMPONENTS_V2);
        assert.equal(thumbnailOf(reply), `${BASE_URL}/assets/expressions/${face}`);
      } else {
        assert.equal(reply.components, undefined);
      }
    });
  }

  it('reveals the culprit caught out, and grants a pending boost with them', async () => {
    seedRiddle();

    const { reply, followup, afterReply } = await handleRiddle(
      command('user-a', [{ name: 'answer', value: RIDDLE.answer }]),
    );
    await afterReply();

    const culprit = getCharacterById(RIDDLE.answer);
    assert.equal(reply.flags & 64, 64, 'ephemeral');
    assert.equal(reply.components[0].components.length, 1, 'no buttons');
    assert.equal(thumbnailOf(reply), `${BASE_URL}/assets/expressions/${RIDDLE.answer}/sweat.png`);
    assert.deepEqual(replyText(reply).split('\n\n'), [
      `Debunked. **${getFullName(culprit)}**.`,
      `"${RIDDLE.winningLine}"`,
    ]);

    // The rewards ride in their own message, so the portrait stays small.
    assert.equal(followup.flags & 64, 64, 'ephemeral');
    assert.deepEqual(followup.content.split('\n\n'), [
      MISSION_BOOST_LINE(culprit.firstName),
      `${BANKED_RESET_LINE} ${STORE_CREDIT_LINE(1, 1)}`,
    ]);

    const row = fake.tables.character_relationships.find(
      (r) => r.discord_user_id === 'user-a' && r.character_id === RIDDLE.answer,
    );
    assert.equal(row.pending_encounter_boost, 1);
    assert.equal(row.affinity, 0, 'a boost, never affinity');
  });

  it('still shows the boost line when the cap means nothing new was added', async () => {
    seedRiddle();
    fake.tables.character_relationships.push({
      discord_user_id: 'user-a',
      character_id: RIDDLE.answer,
      affinity: 12,
      pending_encounter_boost: 1,
    });

    const { followup, afterReply } = await handleRiddle(
      command('user-a', [{ name: 'answer', value: RIDDLE.answer }]),
    );
    await afterReply();

    const culprit = getCharacterById(RIDDLE.answer);
    assert.ok(followup.content.includes(MISSION_BOOST_LINE(culprit.firstName)));
    assert.equal(fake.tables.character_relationships[0].pending_encounter_boost, 1, 'capped at 1');
  });

  it('answers nothing for someone holding no mission at all', async () => {
    const { reply } = await handleRiddle(command('user-a', [{ name: 'answer', value: 'jin' }]));
    assert.match(reply.content, /no mission/i);
  });
});
