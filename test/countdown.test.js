// Countdown channels (docs/countdown.md): /countdown setup, /event, and the
// scheduler's rename pass, against the fake Supabase and a mocked Discord.
// Day counting and name formats are covered in countdown-names.test.js; this
// file is about which channel gets renamed when, and what gets stored.
import { beforeEach, describe, it, mock } from 'node:test';
import assert from 'node:assert/strict';
import { createFakeSupabase } from './helpers/fakeSupabase.js';
import { fakeDiscordRest } from './helpers/fakeDiscordRest.js';

process.env.SUPABASE_URL ??= 'http://fake.local';
process.env.SUPABASE_SERVICE_ROLE_KEY ??= 'fake-service-role-key';

const GUILD = 'guild-1';
const VOICE = 'voice-1';
const OTHER_VOICE = 'voice-2';
const CATEGORY = 'category-1';
// Wed Nov 11 2026, 7 AM Pacific (the default zone): the Nov 12 Wishing Well
// is "in 1 day".
const NOW = new Date('2026-11-11T15:00:00Z');

const fake = createFakeSupabase({ guild_settings: [], countdown_channels: [], countdown_events: [] });
mock.module('@supabase/supabase-js', {
  namedExports: { createClient: () => fake.client },
});

// Discord stand-in: channels by id, every rename recorded, and per-channel
// failures to throw on the next rename.
const channels = new Map();
const renames = [];
const renameErrors = new Map(); // channelId -> status
function discordError(status) {
  const err = new Error(`Discord API error: ${status}`);
  err.status = status;
  return err;
}
mock.module('../discordRest.js', {
  namedExports: fakeDiscordRest({
    getChannel: async (id) => {
      if (!channels.has(id)) throw discordError(404);
      return { ...channels.get(id) };
    },
    renameChannel: async (id, name) => {
      if (renameErrors.has(id)) throw discordError(renameErrors.get(id));
      renames.push({ id, name });
      channels.get(id).name = name;
      return { id, name };
    },
  }),
});

const {
  clearCountdownPassClock,
  countdownAutocomplete,
  handleCountdownAdmin,
  handleEvent,
  runCountdownPass,
} = await import('../countdown.js');

const MANAGE_GUILD = '32';

function body(command, sub, options = [], { group = null, permissions = MANAGE_GUILD } = {}) {
  const leaf = { type: 1, name: sub, options };
  return {
    guild_id: GUILD,
    member: { user: { id: 'admin-1' }, permissions },
    data: { name: command, options: [group ? { type: 2, name: group, options: [leaf] } : leaf] },
  };
}

const setChannel = (kind, channelId) =>
  handleCountdownAdmin(body('countdown', kind, [{ name: 'channel', value: channelId }]), NOW);

function row(kind) {
  return fake.tables.countdown_channels.find((r) => r.guild_id === GUILD && r.kind === kind);
}

// Runs a handler's afterReply, which is where immediate renames happen.
async function run(resultPromise) {
  const result = await resultPromise;
  await result.afterReply?.();
  return result;
}

beforeEach(() => {
  fake.tables.guild_settings = [];
  fake.tables.countdown_channels = [];
  fake.tables.countdown_events = [];
  channels.clear();
  channels.set(VOICE, { id: VOICE, type: 2, name: 'Lounge' });
  channels.set(OTHER_VOICE, { id: OTHER_VOICE, type: 2, name: 'Music' });
  channels.set(CATEGORY, { id: CATEGORY, type: 4, name: 'Info' });
  renames.length = 0;
  renameErrors.clear();
  clearCountdownPassClock();
});

describe('/countdown wishingwell', () => {
  it('renames the channel at once and saves its old name', async () => {
    const { reply } = await run(setChannel('wishingwell', VOICE));

    assert.deepEqual(renames, [{ id: VOICE, name: '💎 Wishing Well: in 1 day' }]);
    assert.equal(row('wishingwell').channel_id, VOICE);
    assert.equal(row('wishingwell').original_name, 'Lounge');
    assert.equal(row('wishingwell').rendered_name, '💎 Wishing Well: in 1 day');
    assert.match(reply.content, /💎 Wishing Well: in 1 day/);
    assert.match(reply.content, /Connect.*deny/i);
  });
});

describe('/countdown setup refusals', () => {
  it("won't point both kinds at one channel", async () => {
    await run(setChannel('wishingwell', VOICE));
    renames.length = 0;

    const { reply } = await run(setChannel('customevent', VOICE));

    assert.match(reply.content, /already the Wishing Well countdown/);
    assert.deepEqual(renames, []);
    assert.equal(row('customevent'), undefined);
  });

  it('refuses without Manage Channels and saves nothing', async () => {
    renameErrors.set(VOICE, 403);

    const { reply } = await run(setChannel('wishingwell', VOICE));

    assert.match(reply.content, /Manage Channels/);
    assert.equal(row('wishingwell'), undefined);
  });

  it("refuses a channel the bot can't see", async () => {
    const { reply } = await run(setChannel('wishingwell', 'hidden-1'));
    assert.match(reply.content, /View Channel/);
    assert.equal(row('wishingwell'), undefined);
  });

  it('recommends View-only for a category', async () => {
    const { reply } = await run(setChannel('wishingwell', CATEGORY));
    assert.match(reply.content, /category/);
    assert.match(reply.content, /Don't deny Connect/);
  });

  it('refuses members without Manage Server', async () => {
    const result = await handleCountdownAdmin(
      body('countdown', 'status', [], { permissions: '0' }),
      NOW,
    );
    assert.match(result.reply.content, /Manage Server/);
  });
});

describe('moving and disabling', () => {
  it('moving restores the old channel and keeps the first saved name', async () => {
    await run(setChannel('wishingwell', VOICE));
    await run(setChannel('wishingwell', OTHER_VOICE));

    assert.equal(channels.get(VOICE).name, 'Lounge');
    assert.equal(channels.get(OTHER_VOICE).name, '💎 Wishing Well: in 1 day');
    assert.equal(row('wishingwell').original_name, 'Music');
  });

  it('re-running on the same channel keeps its original name', async () => {
    await run(setChannel('wishingwell', VOICE));
    await run(setChannel('wishingwell', VOICE));
    assert.equal(row('wishingwell').original_name, 'Lounge');
  });

  it('disable restores the name and keeps the event list', async () => {
    await run(handleEvent(body('event', 'create', [
      { name: 'name', value: 'Fan Meet' },
      { name: 'date', value: '2026-11-14' },
    ]), NOW));
    await run(setChannel('customevent', VOICE));
    assert.equal(channels.get(VOICE).name, 'Fan Meet: in 3 days');

    await run(handleCountdownAdmin(body('countdown', 'customevent', [], { group: 'disable' }), NOW));

    assert.equal(channels.get(VOICE).name, 'Lounge');
    assert.equal(row('customevent').channel_id, null);
    assert.equal(fake.tables.countdown_events.length, 1);
  });
});

describe('/event', () => {
  const create = (name, date) =>
    run(handleEvent(body('event', 'create', [
      { name: 'name', value: name },
      { name: 'date', value: date },
    ]), NOW));

  it('renames the custom event channel when the nearest event changes', async () => {
    await run(setChannel('customevent', VOICE));
    assert.equal(channels.get(VOICE).name, 'No events scheduled');
    // Past the setup rename's guard.
    fake.tables.countdown_channels[0].renamed_at = new Date(NOW.getTime() - 10 * 60 * 1000).toISOString();

    await create('Fan Meet', '2026-11-14');

    assert.equal(channels.get(VOICE).name, 'Fan Meet: in 3 days');
  });

  it('holds an immediate rename inside the 5-minute guard', async () => {
    await run(setChannel('customevent', VOICE));
    renames.length = 0;

    await create('Fan Meet', '2026-11-14');

    assert.deepEqual(renames, []);
  });

  it('numbers events without reusing IDs', async () => {
    await create('One', '2026-11-20');
    await create('Two', '2026-11-21');
    await run(handleEvent(body('event', 'delete', [{ name: 'event', value: 2 }]), NOW));
    const { reply } = await create('Three', '2026-11-22');
    assert.match(reply.content, /"Three" \(Nov 22\) #3/);
  });

  it('replies to delete with what it removed', async () => {
    await create('Fan Meet', '2026-11-14');
    const { reply } = await run(handleEvent(body('event', 'delete', [{ name: 'event', value: 1 }]), NOW));
    assert.equal(reply.content, 'Deleted "Fan Meet" (Nov 14) #1');
  });

  it('refuses the 25th event', async () => {
    for (let i = 0; i < 24; i++) await create(`Event ${i}`, '2026-12-01');
    const { reply } = await create('One too many', '2026-12-01');
    assert.match(reply.content, /already has 24 events/);
    assert.equal(fake.tables.countdown_events.length, 24);
  });

  it('refuses an edit with neither name nor date', async () => {
    await create('Fan Meet', '2026-11-14');
    const { reply } = await run(handleEvent(body('event', 'edit', [{ name: 'event', value: 1 }]), NOW));
    assert.match(reply.content, /name, a new date, or both/);
  });

  it('lists upcoming events by date, then #ID', async () => {
    await create('Anniversary', '2026-12-02');
    await create('Fan Meet', '2026-11-14');
    const { reply } = await run(handleEvent(body('event', 'list'), NOW));
    assert.equal(reply.content, 'Nov 14, 2026 - Fan Meet - #2\nDec 02, 2026 - Anniversary - #1');
  });
});

describe('the scheduler pass', () => {
  async function configured(kind = 'wishingwell', channelId = VOICE) {
    await run(setChannel(kind, channelId));
    renames.length = 0;
  }
  const later = (minutes) => new Date(NOW.getTime() + minutes * 60 * 1000);

  it('renames once after local midnight and stays quiet until the next day', async () => {
    await configured();
    const nov12 = new Date('2026-11-12T08:02:00Z'); // 00:02 PST

    await runCountdownPass(nov12);
    clearCountdownPassClock();
    await runCountdownPass(new Date(nov12.getTime() + 10 * 60 * 1000));

    assert.deepEqual(renames, [{ id: VOICE, name: '💎 Wishing Well: Today!' }]);
  });

  it('prunes past events and moves the channel to the next one', async () => {
    fake.tables.countdown_events.push(
      { guild_id: GUILD, event_number: 1, name: 'Old', event_date: '2026-11-11' },
      { guild_id: GUILD, event_number: 2, name: 'Next', event_date: '2026-11-13' },
    );
    await configured('customevent');

    await runCountdownPass(new Date('2026-11-12T09:00:00Z')); // 1 AM PST Nov 12

    assert.deepEqual(fake.tables.countdown_events.map((e) => e.event_number), [2]);
    assert.equal(channels.get(VOICE).name, 'Next: in 1 day');
  });

  it('clears only the failing kind after three failures in a row', async () => {
    await configured('wishingwell', VOICE);
    await configured('customevent', OTHER_VOICE);
    renameErrors.set(VOICE, 404);

    for (const day of ['2026-11-12', '2026-11-13', '2026-11-14']) {
      clearCountdownPassClock();
      await runCountdownPass(new Date(`${day}T12:00:00Z`));
    }

    assert.equal(row('wishingwell').channel_id, null);
    assert.match(row('wishingwell').disabled_reason, /deleted/);
    assert.equal(row('customevent').channel_id, OTHER_VOICE);

    const { reply } = await handleCountdownAdmin(body('countdown', 'status'), NOW);
    assert.match(reply.content, /Stopped.*deleted/);
  });

  it("doesn't count a Discord outage as a failure", async () => {
    await configured();
    renameErrors.set(VOICE, 503);

    await runCountdownPass(later(60 * 24));

    assert.equal(row('wishingwell').rename_failures, 0);
  });

  it('re-setup after an auto-disable keeps the real original name', async () => {
    await configured('wishingwell', VOICE);
    renameErrors.set(VOICE, 403);
    for (const day of ['2026-11-12', '2026-11-13', '2026-11-14']) {
      clearCountdownPassClock();
      await runCountdownPass(new Date(`${day}T12:00:00Z`));
    }
    assert.equal(row('wishingwell').channel_id, null);
    renameErrors.clear();

    await run(setChannel('wishingwell', VOICE));

    assert.equal(row('wishingwell').original_name, 'Lounge');
  });

  it("doesn't count a rate limit as a failure", async () => {
    await configured();
    renameErrors.set(VOICE, 429);

    await runCountdownPass(later(60 * 24));

    assert.equal(row('wishingwell').rename_failures, 0);
    assert.equal(row('wishingwell').channel_id, VOICE);
  });

  it('skips a locked guild', async () => {
    await configured();
    fake.tables.guild_settings.push({ guild_id: GUILD, locked: true });

    await runCountdownPass(later(60 * 24));

    assert.deepEqual(renames, []);
  });

  it('reads Supabase at most once per five minutes', async () => {
    await configured();
    await runCountdownPass(later(60 * 24));
    renames.length = 0;
    fake.tables.countdown_channels[0].rendered_name = 'drifted';
    fake.tables.countdown_channels[0].renamed_at = null;

    await runCountdownPass(later(60 * 24 + 1));

    assert.deepEqual(renames, []);
  });
});

describe('/countdown timezone', () => {
  it('re-renders both channels in the new zone', async () => {
    // 4 AM Nov 12 Pacific is the Wishing Well's day there, but in Tokyo
    // (9 PM Nov 12) the 10 PM EST start falls on Nov 13.
    const t = new Date('2026-11-12T12:00:00Z');
    await run(handleCountdownAdmin(body('countdown', 'wishingwell', [{ name: 'channel', value: VOICE }]), t));
    assert.equal(channels.get(VOICE).name, '💎 Wishing Well: Today!');
    fake.tables.countdown_channels[0].renamed_at = null;

    await run(handleCountdownAdmin(body('countdown', 'timezone', [{ name: 'tz', value: 'asia/tokyo' }]), t));

    assert.equal(fake.tables.guild_settings[0].countdown_timezone, 'Asia/Tokyo');
    assert.equal(channels.get(VOICE).name, '💎 Wishing Well: in 1 day');
  });

  it('rejects an unknown zone', async () => {
    const { reply } = await handleCountdownAdmin(body('countdown', 'timezone', [{ name: 'tz', value: 'Mars/Base' }]), NOW);
    assert.match(reply.content, /don't recognize/);
  });
});

describe('event autocomplete', () => {
  it('matches on the event name and returns the #ID as the value', async () => {
    for (const [name, date] of [['Fan Meet', '2026-11-14'], ['Anniversary', '2026-12-02']]) {
      await run(handleEvent(body('event', 'create', [
        { name: 'name', value: name },
        { name: 'date', value: date },
      ]), NOW));
    }
    const autocomplete = body('event', 'delete', [{ name: 'event', value: 'fan', focused: true }]);

    assert.deepEqual(await countdownAutocomplete(autocomplete, NOW), [
      { name: 'Nov 14 · Fan Meet · #1', value: '1' },
    ]);

    const { reply } = await run(handleEvent(body('event', 'delete', [{ name: 'event', value: '1' }]), NOW));
    assert.match(reply.content, /Deleted "Fan Meet"/);
  });
});
