// Announcements (docs/announcements.md): the once-a-day notice after a
// command, the free cooldown reset it can bank, and the startup check on the
// constants file.
import { beforeEach, describe, it, mock } from 'node:test';
import assert from 'node:assert/strict';
import { createMissionsHarness } from './helpers/missionsHarness.js';

const h = createMissionsHarness();
mock.module('@supabase/supabase-js', h.supabaseMock);
mock.module('../discordRest.js', h.discordRestMock);
await h.load();
const { fake } = h;

const { surfaceAnnouncements, handleAnnouncementClaim } = await import('../announcements.js');
const { validateAnnouncements, openAnnouncements, announcementText } = await import(
  '../constants/announcements.js'
);
const { handleCooldownReset } = await import('../missions/resets.js');
const { countCooldownResets } = await import('../db/supabase.js');

const OWNER = 'owner-1';
process.env.OWNER_DISCORD_ID = OWNER;

// Local-time anchors: "a day" is the server's local calendar day.
const DAY1_NOON = new Date(2026, 10, 7, 12, 0);
const DAY1_EVENING = new Date(2026, 10, 7, 20, 0);
const DAY2_MORNING = new Date(2026, 10, 8, 9, 0);

const MAINT = {
  id: 'maint-a',
  kind: 'maintenance',
  showFrom: new Date(2026, 10, 7, 0, 0).toISOString(),
  startsAt: new Date(2026, 10, 9, 12, 0).toISOString(),
};
const RESET = {
  id: 'reset-a',
  kind: 'reset',
  showFrom: new Date(2026, 10, 7, 0, 0).toISOString(),
  endsAt: new Date(2026, 10, 14, 0, 0).toISOString(),
  message: 'A free cooldown reset, on us.',
};
const LIST = [RESET, MAINT];

function collector() {
  const sent = [];
  return { sent, send: async (data) => { sent.push(data); } };
}

function clickBody(userId, message) {
  return { member: { user: { id: userId } }, message };
}

describe('surfaceAnnouncements', () => {
  beforeEach(h.fresh);

  it('sends nothing when no notice is open', async () => {
    const { sent, send } = collector();
    const result = await surfaceAnnouncements('user-a', send, DAY1_NOON, []);
    assert.equal(result.surfaced, false);
    assert.equal(sent.length, 0);
  });

  it('combines open notices into one ephemeral, maintenance first, with the claim button', async () => {
    const { sent, send } = collector();
    const result = await surfaceAnnouncements('user-a', send, DAY1_NOON, LIST);

    assert.deepEqual(result.ids, ['maint-a', 'reset-a']);
    assert.equal(sent.length, 1);
    assert.equal(sent[0].flags, 64);
    assert.ok(sent[0].content.indexOf('maintenance') < sent[0].content.indexOf('free cooldown'));
    assert.match(sent[0].content, /<t:\d+:F> \(<t:\d+:R>\)/);
    assert.equal(sent[0].components[0].components[0].custom_id, 'notice:claim:reset-a');
  });

  it('shows each notice at most once per local day', async () => {
    // The RPC stamps last_shown_at with the database clock, so it has to agree
    // with the `now` each call is made at.
    const at = (time) => { fake.setRpcNow(time); return time; };
    const { sent, send } = collector();
    await surfaceAnnouncements('user-a', send, at(DAY1_NOON), LIST);
    const again = await surfaceAnnouncements('user-a', send, at(DAY1_EVENING), LIST);
    assert.equal(again.surfaced, false);
    assert.equal(sent.length, 1);

    const tomorrow = await surfaceAnnouncements('user-a', send, at(DAY2_MORNING), LIST);
    assert.equal(tomorrow.surfaced, true);
    assert.equal(sent.length, 2);
  });

  it('counts per player, not globally', async () => {
    const { sent, send } = collector();
    await surfaceAnnouncements('user-a', send, DAY1_NOON, LIST);
    await surfaceAnnouncements('user-b', send, DAY1_NOON, LIST);
    assert.equal(sent.length, 2);
  });

  it('stops showing a maintenance notice once its start time passes', () => {
    const after = new Date(Date.parse(MAINT.startsAt) + 1000);
    assert.deepEqual(openAnnouncements(false, after, [MAINT]), []);
  });

  it('stops showing a reset offer once the player has claimed it', async () => {
    await handleAnnouncementClaim(clickBody('user-a', { content: 'x', components: [] }), 'reset-a', DAY1_NOON, LIST);
    const { sent, send } = collector();
    await surfaceAnnouncements('user-a', send, DAY2_MORNING, LIST);
    assert.equal(sent.length, 1);
    assert.equal(sent[0].components, undefined, 'only the maintenance notice is left');
  });

  it('shows testOnly notices to the owner alone', async () => {
    const testOnly = [{ ...MAINT, testOnly: true }];
    const { sent, send } = collector();
    await surfaceAnnouncements('user-a', send, DAY1_NOON, testOnly);
    assert.equal(sent.length, 0);
    await surfaceAnnouncements(OWNER, send, DAY1_NOON, testOnly);
    assert.equal(sent.length, 1);
  });
});

describe('notice:claim', () => {
  beforeEach(h.fresh);

  const NOTICE_MESSAGE = {
    content: 'notice text',
    components: [
      { type: 1, components: [{ type: 2, custom_id: 'notice:claim:reset-a' }] },
    ],
  };

  it('banks one reset and edits the notice in place', async () => {
    const { response } = await handleAnnouncementClaim(
      clickBody('user-a', NOTICE_MESSAGE), 'reset-a', DAY1_NOON, LIST,
    );
    assert.equal(response.type, 7, 'UPDATE_MESSAGE');
    assert.match(response.data.content, /^notice text\n\n✅/);
    assert.deepEqual(response.data.components, []);
    assert.equal(await countCooldownResets('user-a'), 1);
  });

  it('banks only once per player per offer', async () => {
    await handleAnnouncementClaim(clickBody('user-a', NOTICE_MESSAGE), 'reset-a', DAY1_NOON, LIST);
    const { response } = await handleAnnouncementClaim(
      clickBody('user-a', NOTICE_MESSAGE), 'reset-a', DAY1_NOON, LIST,
    );
    assert.equal(response.type, 4);
    assert.match(response.data.content, /already claimed/);
    assert.equal(await countCooldownResets('user-a'), 1);
  });

  it('refuses a click after the offer has ended', async () => {
    const late = new Date(Date.parse(RESET.endsAt) + 1000);
    const { response } = await handleAnnouncementClaim(
      clickBody('user-a', NOTICE_MESSAGE), 'reset-a', late, LIST,
    );
    assert.match(response.data.content, /ended/);
    assert.equal(await countCooldownResets('user-a'), 0);
  });

  it('refuses an unknown or non-reset id', async () => {
    for (const id of ['nope', 'maint-a']) {
      const { response } = await handleAnnouncementClaim(
        clickBody('user-a', NOTICE_MESSAGE), id, DAY1_NOON, LIST,
      );
      assert.match(response.data.content, /ended/);
    }
  });

  it('spends a claimed reset on both clocks from the cooldown reply', async () => {
    const now = new Date();
    fake.setRpcNow(now);
    for (const command of ['roam', 'meet']) {
      fake.tables.command_limits.push({
        discord_user_id: 'user-a',
        command_name: command,
        last_used_at: new Date(now.getTime() - 60_000).toISOString(),
      });
    }
    fake.tables.announcement_views.push({
      discord_user_id: 'user-a',
      announcement_id: 'reset-a',
      claimed_at: now.toISOString(),
    });

    const result = await handleCooldownReset(clickBody('user-a'), 'roam');
    assert.equal(result.outcome, 'both');
    assert.equal(fake.tables.command_limits.length, 0);
    assert.equal(await countCooldownResets('user-a'), 0);
  });

  it('spends mission credits before announcement ones', async () => {
    const now = new Date();
    fake.setRpcNow(now);
    fake.tables.command_limits.push({
      discord_user_id: 'user-a',
      command_name: 'roam',
      last_used_at: new Date(now.getTime() - 60_000).toISOString(),
    });
    fake.tables.mission_log.push({
      discord_user_id: 'user-a', house: 'Frostheim', mission_type: 'riddle',
      role: 'lead', points: 1, completed_at: now.toISOString(), reset_spent_at: null,
    });
    fake.tables.announcement_views.push({
      discord_user_id: 'user-a', announcement_id: 'reset-a', claimed_at: now.toISOString(),
    });

    await handleCooldownReset(clickBody('user-a'), 'roam');
    assert.ok(fake.tables.mission_log[0].reset_spent_at, 'mission credit spent');
    assert.equal(fake.tables.announcement_views[0].reset_spent_at, undefined, 'free one still banked');
  });
});

describe('validateAnnouncements', () => {
  it('accepts the shipped list', () => {
    const errors = [];
    validateAnnouncements(errors, undefined, 30);
    assert.deepEqual(errors, []);
  });

  it('accepts well-formed notices', () => {
    const errors = [];
    validateAnnouncements(errors, [
      { id: 'm-1', kind: 'maintenance', showFrom: '2026-11-07T00:00:00-06:00', startsAt: '2026-11-08T12:00:00-06:00' },
      { id: 'r-1', kind: 'reset', showFrom: '2026-11-08T00:00:00-06:00', endsAt: '2026-11-15T00:00:00-06:00', message: 'Hi.' },
    ]);
    assert.deepEqual(errors, []);
  });

  it('flags bad ids, duplicates, missing offsets, reversed windows and empty messages', () => {
    const errors = [];
    validateAnnouncements(errors, [
      { id: 'Bad:Id', kind: 'maintenance', showFrom: '2026-11-07T00:00:00Z', startsAt: '2026-11-08T00:00:00Z' },
      { id: 'dup', kind: 'maintenance', showFrom: '2026-11-07T00:00:00Z', startsAt: '2026-11-08T00:00:00Z' },
      { id: 'dup', kind: 'maintenance', showFrom: '2026-11-07T00:00', startsAt: '2026-11-08T00:00:00Z' },
      { id: 'rev', kind: 'maintenance', showFrom: '2026-11-09T00:00:00Z', startsAt: '2026-11-08T00:00:00Z' },
      { id: 'r', kind: 'reset', showFrom: '2026-11-07T00:00:00Z', endsAt: '2026-11-08T00:00:00Z', message: ' ' },
      { id: 'k', kind: 'party' },
    ]);
    const all = errors.join('\n');
    assert.match(all, /"Bad:Id": id must be/);
    assert.match(all, /"dup": duplicate id/);
    assert.match(all, /"dup": showFrom must be an ISO time with an offset/);
    assert.match(all, /"rev": showFrom must come before startsAt/);
    assert.match(all, /"r": a reset notice needs a message/);
    assert.match(all, /"k": kind must be/);
  });

  it('renders maintenance with only a start time', () => {
    const text = announcementText(MAINT);
    assert.match(text, /starts <t:\d+:F> \(<t:\d+:R>\)/);
    assert.equal((text.match(/<t:/g) || []).length, 2);
  });
});
