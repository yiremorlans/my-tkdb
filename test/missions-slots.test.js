// Scheduled missions (docs/scheduled-missions.md): rolling the day's slots,
// spawning a request into a slot, and reconciling a post whose edit failed.
// Setup lives in helpers/missionsHarness.js.
import { beforeEach, describe, it, mock } from 'node:test';
import assert from 'node:assert/strict';
import {
  CHANNEL,
  createMissionsHarness,
  guildRow,
  missionRow,
  slotGuild,
} from './helpers/missionsHarness.js';

const h = createMissionsHarness();
mock.module('@supabase/supabase-js', h.supabaseMock);
mock.module('../discordRest.js', h.discordRestMock);
await h.load();
const { fake, posts, edits, discordFail } = h;

const {
  MISSIONS_PER_DAY,
  MIN_GAP_MS,
  WINDOW_START_HOUR,
  WINDOW_END_HOUR,
  dueSlots,
  rollDailySlots,
  rollSignatureCount,
  pickSignatureTargets,
  getHouseRoster,
  MISSION_HOUSES,
} = await import('../constants/missions.js');
const {
  reconcileMissionPosts,
  runGuildMissionPass,
  spawnMission,
  sweepExpiredMissions,
} = await import('../missions/posts.js');

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
  beforeEach(h.fresh);

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
    await spawnMission(guildRow(), CHANNEL, new Date());
    await spawnMission(guildRow(), CHANNEL, new Date());

    const thumbs = posts.map((p) => p.body.embeds[0].thumbnail.url);
    assert.equal(thumbs.length, 2);
    for (const url of thumbs) {
      assert.match(url, /^https:\/\/tkdb\.test\/assets\/sprites\/Messenger_Cat(_2)?\.png$/);
    }
    assert.notEqual(thumbs[0], thumbs[1], 'consecutive requests send different cats');
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
    const guild = slotGuild(now, [new Date(now.getTime() - 60_000).toISOString()]);
    fake.tables.guild_settings.push({ ...guild });

    await runGuildMissionPass(guild, now);

    assert.equal(posts.length, 0, 'never two live requests');
    assert.deepEqual(fake.tables.guild_settings[0].mission_slots_fired, [0], 'the slot is still spent');
  });

  // The scheduler's global sweep is throttled (MISSION_SWEEP_INTERVAL_MS), so
  // a due slot can find a post whose TTL ran out but hasn't been swept yet.
  // That request is over; the slot must post a new one, not be spent on it.
  it('sweeps an expired-but-unswept request rather than spending the slot on it', async () => {
    fake.tables.missions.push(
      missionRow({ id: 1, status: 'open', post_expires_at: new Date(Date.now() - 60_000).toISOString() }),
    );

    const now = new Date();
    const guild = slotGuild(now, [new Date(now.getTime() - 60_000).toISOString()]);
    fake.tables.guild_settings.push({ ...guild });

    await runGuildMissionPass(guild, now);

    const old = fake.tables.missions.find((m) => m.id === 1);
    assert.equal(old.status, 'expired', 'the stale request is withdrawn');
    assert.ok(
      edits.some((e) => e.messageId === 'message-1'),
      'its post is edited down like any swept request',
    );
    assert.equal(posts.length, 1, 'the slot posts a fresh request');
    assert.ok(fake.tables.missions.some((m) => m.id !== 1), 'and records it as a new mission');
    assert.deepEqual(fake.tables.guild_settings[0].mission_slots_fired, [0]);
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

// --- 2b. reconciling a stranded post --------------------------------------
// A claim that committed but whose channel-post edit failed in the moment
// (app.js sets missions.post_reconcile_needed, migration 019). The mission tick
// retries that edit with the bot token; nothing else covers it.
describe('reconciling a stranded mission post', () => {
  beforeEach(h.fresh);

  it('edits the post to a name-free line and strips the button, then clears the flag', async () => {
    fake.tables.missions.push(
      missionRow({
        status: 'accepted',
        accepted_by: 'user-a',
        message_id: 'message-1',
        post_reconcile_needed: true,
      }),
    );

    await reconcileMissionPosts();

    assert.equal(edits.length, 1);
    assert.equal(edits[0].messageId, 'message-1');
    assert.match(edits[0].body.content, /already been picked up/);
    assert.deepEqual(edits[0].body.components, [], 'the live Accept button is gone');
    assert.deepEqual(edits[0].body.embeds, []);
    assert.equal(
      fake.tables.missions[0].post_reconcile_needed,
      false,
      'the flag is cleared so the next tick skips it',
    );
  });

  it('keeps the flag set when the retry edit also fails', async () => {
    fake.tables.missions.push(
      missionRow({ status: 'accepted', message_id: 'message-1', post_reconcile_needed: true }),
    );
    discordFail.edit = true;

    await reconcileMissionPosts();

    assert.equal(edits.length, 1, 'it tried');
    assert.equal(
      fake.tables.missions[0].post_reconcile_needed,
      true,
      'still flagged, so a later tick retries',
    );
  });

  it('drops the flag without an edit when the row never got a post id', async () => {
    fake.tables.missions.push(
      missionRow({ status: 'accepted', message_id: null, post_reconcile_needed: true }),
    );

    await reconcileMissionPosts();

    assert.equal(edits.length, 0, 'nothing to edit');
    assert.equal(fake.tables.missions[0].post_reconcile_needed, false);
  });

  it('leaves un-flagged missions alone', async () => {
    fake.tables.missions.push(
      missionRow({ status: 'accepted', accepted_by: 'user-a', message_id: 'message-1' }),
    );

    await reconcileMissionPosts();

    assert.equal(edits.length, 0);
  });

  it('runs as part of the expiry sweep', async () => {
    fake.tables.missions.push(
      missionRow({
        id: 2,
        status: 'accepted',
        accepted_by: 'user-a',
        message_id: 'message-9',
        post_reconcile_needed: true,
      }),
    );

    await sweepExpiredMissions(null, new Date());

    assert.equal(edits.length, 1, 'the sweep reconciled the stranded post');
    assert.equal(edits[0].messageId, 'message-9');
    assert.equal(fake.tables.missions[0].post_reconcile_needed, false);
  });
});
