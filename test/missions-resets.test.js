// Scheduled missions (docs/scheduled-missions.md): banked cooldown resets, the
// only thing a mission pays out besides points, and so checked at the table.
// Setup lives in helpers/missionsHarness.js.
import { beforeEach, describe, it, mock } from 'node:test';
import assert from 'node:assert/strict';
import {
  click,
  createMissionsHarness,
} from './helpers/missionsHarness.js';

const h = createMissionsHarness();
mock.module('@supabase/supabase-js', h.supabaseMock);
mock.module('../discordRest.js', h.discordRestMock);
await h.load();
const { fake } = h;

const { cooldownReplyWithReset, handleCooldownReset } = await import('../missions/resets.js');
const { claimCommandInvoke } = await import('../commandLimits.js');

// --- banked cooldown resets -------------------------------------------------

describe('banked cooldown resets', () => {
  beforeEach(h.fresh);

  const HOURS_3 = 3 * 60 * 60 * 1000;

  // Every timestamp here is relative to this instant, and so is the rpc's own
  // clock. The "already clear" case below sits 1s past a 3h cooldown, and on
  // the wall clock that margin is whatever drift the suite has accumulated
  // since the fake was built — it tipped under load. Pinned, the margin is
  // exactly the 1s the test is written around.
  const NOW = new Date('2026-06-15T12:00:00Z');

  beforeEach(() => {
    fake.setRpcNow(NOW);
  });

  function onCooldown(userId, commands = ['roam', 'meet'], ago = 60_000) {
    for (const command of commands) {
      fake.tables.command_limits.push({
        discord_user_id: userId,
        command_name: command,
        last_used_at: new Date(NOW.getTime() - ago).toISOString(),
      });
    }
  }

  // A banked reset is just an unspent mission_log row. 'coop' clears one
  // command, anything else clears both — the scope is the mission type.
  function bank(userId, type = 'riddle', completedAt = NOW) {
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

  it('clears only one command for a co-op’s reward, the clicked one on a tie', async () => {
    onCooldown('user-a');
    bank('user-a', 'coop');

    const { outcome } = await handleCooldownReset(click('user-a'), 'meet');

    assert.equal(outcome, 'meet');
    assert.deepEqual(fake.tables.command_limits.map((r) => r.command_name), ['roam']);
    assert.equal(spent('user-a')[0].reset_spent_on, 'meet');
  });

  it('puts a co-op’s reward on the longer wait, not the clicked command', async () => {
    onCooldown('user-a', ['meet'], HOURS_3 - 8 * 60_000); // 8 minutes left
    onCooldown('user-a', ['roam'], 10 * 60_000); // 2h50m left
    bank('user-a', 'coop');

    const { outcome } = await handleCooldownReset(click('user-a'), 'meet');

    assert.equal(outcome, 'roam');
    assert.deepEqual(fake.tables.command_limits.map((r) => r.command_name), ['meet']);
    assert.equal(spent('user-a')[0].reset_spent_on, 'roam');
  });

  it('ignores an already-clear other clock when picking the longer wait', async () => {
    onCooldown('user-a', ['meet'], 60_000);
    onCooldown('user-a', ['roam'], HOURS_3 + 1000); // expired stamp, still on the table
    bank('user-a', 'coop');

    const { outcome } = await handleCooldownReset(click('user-a'), 'meet');

    assert.equal(outcome, 'meet');
  });

  it('spends the cheapest sufficient reset first, keeping the better one banked', async () => {
    onCooldown('user-a');
    bank('user-a', 'riddle', new Date(NOW.getTime() - 10_000)); // older, but worth more
    bank('user-a', 'coop');

    await handleCooldownReset(click('user-a'), 'roam');

    assert.deepEqual(spent('user-a').map((r) => r.mission_type), ['coop']);
    assert.deepEqual(
      banked('user-a').map((r) => r.mission_type),
      ['riddle'],
      'the two-command reset survives',
    );
  });

  it('spends every banked co-op reset before a two-command one, whatever the bank order', async () => {
    onCooldown('user-a');
    bank('user-a', 'coop', new Date(NOW.getTime() - 20_000));
    bank('user-a', 'riddle', new Date(NOW.getTime() - 10_000));
    bank('user-a', 'coop');

    await handleCooldownReset(click('user-a'), 'roam');
    await handleCooldownReset(click('user-a'), 'meet');

    assert.deepEqual(spent('user-a').map((r) => r.mission_type), ['coop', 'coop']);
    assert.deepEqual(banked('user-a').map((r) => r.mission_type), ['riddle']);
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

  // The player is certainly inside the 60s flood window: the stamp was written
  // by the same command that turned them away and offered the button. Without
  // dropping the throttle, spending a reset would hand them a cleared cooldown
  // and then refuse to let them use it.
  for (const [what, type, clicked, outcome, after] of [
    ['drops the in-memory invoke throttle for whatever it cleared', 'riddle', 'roam', 'both', { roam: true, meet: true }],
    ['leaves the other command’s throttle alone when only one was cleared', 'coop', 'meet', 'meet', { roam: false, meet: true }],
    ['does not touch the throttle when nothing was spent', null, 'roam', 'none', { roam: false, meet: false }],
  ]) {
    it(what, async () => {
      onCooldown('user-a');
      if (type) bank('user-a', type);

      assert.equal(claimCommandInvoke('user-a', 'roam').allowed, true);
      assert.equal(claimCommandInvoke('user-a', 'meet').allowed, true);
      assert.equal(claimCommandInvoke('user-a', 'roam').allowed, false, 'throttled, as a real user would be');

      const result = await handleCooldownReset(click('user-a'), clicked);

      assert.equal(result.outcome, outcome);
      for (const [name, allowed] of Object.entries(after)) {
        assert.equal(claimCommandInvoke('user-a', name).allowed, allowed, `/${name} usable: ${allowed}`);
      }
    });
  }

  it('says so plainly when there is nothing banked to spend', async () => {
    onCooldown('user-a');

    const { outcome, refusal } = await handleCooldownReset(click('user-a'), 'roam');

    assert.equal(outcome, 'none');
    assert.match(refusal.data.content, /no cooldown resets banked/i);
    assert.equal(fake.tables.command_limits.length, 2, 'the cooldown stands');
  });
});
