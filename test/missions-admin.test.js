// handleMissionsAdmin: /missions enable|disable|status — the per-guild setup
// command, the mission-side twin of /encounters. Deliberately narrow, matching
// the "a locked guild" block in public-encounters.test.js: the permission gate,
// the three subcommands, the encounter-channel fallback, and the owner lock
// outranking everything.
import { beforeEach, describe, it, mock } from 'node:test';
import assert from 'node:assert/strict';
import { createFakeSupabase } from './helpers/fakeSupabase.js';
import { fakeDiscordRest } from './helpers/fakeDiscordRest.js';

process.env.SUPABASE_URL ??= 'http://fake.local';
process.env.SUPABASE_SERVICE_ROLE_KEY ??= 'fake-service-role-key';

const GUILD = 'guild-1';
const CHANNEL = 'channel-1';

const fake = createFakeSupabase({ guild_settings: [], missions: [] });
mock.module('@supabase/supabase-js', {
  namedExports: { createClient: () => fake.client },
});

const posts = [];
mock.module('../discordRest.js', {
  namedExports: fakeDiscordRest({
    postChannelMessage: async (channelId, body) => {
      posts.push({ channelId, body });
      return { id: `message-${posts.length}` };
    },
  }),
});

const { handleMissionDev, handleMissionsAdmin } = await import('../missions/admin.js');
const { MISSION_POST_FAILURE_LIMIT } = await import('../constants/missions.js');

// '32' = MANAGE_GUILD. The command's default_member_permissions is only a
// default; handleMissionsAdmin re-checks the member's real permission bits.
const MANAGE_GUILD = '32';
const ADMINISTRATOR = '8';

function adminBody({
  userId = 'admin-1',
  permissions = MANAGE_GUILD,
  guildId = GUILD,
  sub = 'status',
  options = [],
} = {}) {
  return {
    guild_id: guildId,
    member: { user: { id: userId }, permissions },
    data: { name: 'missions', options: sub ? [{ type: 1, name: sub, options }] : [] },
  };
}

function guildRow(overrides = {}) {
  return {
    guild_id: GUILD,
    encounter_channel_id: CHANNEL,
    missions_enabled: false,
    mission_channel_id: null,
    mission_post_failures: 0,
    locked: false,
    ...overrides,
  };
}

function seed(rows = []) {
  fake.tables.guild_settings = rows.map((r) => ({ ...r }));
  posts.length = 0;
}

beforeEach(() => seed());

describe('the permission gate', () => {
  it('refuses when there is no guild at all (a DM)', async () => {
    const result = await handleMissionsAdmin(adminBody({ guildId: null }));
    assert.match(result.reply.content, /only works in a server/);
    assert.equal(result.reply.flags, 64);
    assert.equal(result.afterReply, null);
  });

  // A malformed permission string is refused rather than throwing.
  for (const [who, permissions] of [
    ['a member without Manage Server', '0'],
    ['a malformed permission string', 'not-a-number'],
  ]) {
    it(`refuses ${who}`, async () => {
      seed([guildRow()]);
      const result = await handleMissionsAdmin(adminBody({ sub: 'enable', permissions }));
      assert.match(result.reply.content, /Manage Server/);
      assert.equal(result.afterReply, null);
      assert.equal(fake.tables.guild_settings[0].missions_enabled, false, 'nothing was written');
    });
  }

  it('accepts a member whose only relevant bit is Administrator', async () => {
    seed([guildRow()]);
    const result = await handleMissionsAdmin(adminBody({ permissions: ADMINISTRATOR }));
    // Got past the gate to the real status line rather than the refusal.
    assert.doesNotMatch(result.reply.content, /Manage Server/);
  });
});

describe('/missions enable', () => {
  it('turns missions on for an explicit channel and clears the failure counter', async () => {
    seed([guildRow({ mission_post_failures: 4 })]);

    const result = await handleMissionsAdmin(
      adminBody({ sub: 'enable', options: [{ name: 'channel', value: 'channel-2' }] }),
    );

    assert.match(result.reply.content, /<#channel-2>/);
    const row = fake.tables.guild_settings[0];
    assert.equal(row.missions_enabled, true);
    assert.equal(row.mission_channel_id, 'channel-2');
    assert.equal(row.mission_post_failures, 0);
  });

  it('falls back to the encounter channel when no channel is given', async () => {
    seed([guildRow()]);

    const result = await handleMissionsAdmin(adminBody({ sub: 'enable' }));

    assert.match(result.reply.content, new RegExp(`<#${CHANNEL}>`));
    assert.equal(fake.tables.guild_settings[0].mission_channel_id, CHANNEL);
  });

  it('asks for a channel when there is nothing to fall back to', async () => {
    seed([guildRow({ encounter_channel_id: null })]);

    const result = await handleMissionsAdmin(adminBody({ sub: 'enable' }));

    assert.match(result.reply.content, /Pick a channel/);
    assert.equal(result.afterReply, null);
    assert.equal(fake.tables.guild_settings[0].missions_enabled, false, 'nothing was written');
  });

  it('runs a setup check post against the chosen channel after replying', async () => {
    seed([guildRow()]);

    const result = await handleMissionsAdmin(
      adminBody({ sub: 'enable', options: [{ name: 'channel', value: 'channel-2' }] }),
    );
    assert.equal(posts.length, 0, 'the check post waits for afterReply');

    await result.afterReply();
    assert.equal(posts.length, 1);
    assert.equal(posts[0].channelId, 'channel-2');
  });

  it('swallows a failing setup-check post — the enable still stands', async () => {
    seed([guildRow()]);
    const result = await handleMissionsAdmin(
      adminBody({ sub: 'enable', options: [{ name: 'channel', value: 'channel-2' }] }),
    );

    posts.push = () => {
      throw new Error('Missing Permissions');
    };
    await assert.doesNotReject(() => result.afterReply());
    assert.equal(fake.tables.guild_settings[0].missions_enabled, true);
  });
});

describe('/missions disable', () => {
  it('flips the switch off without touching the channel', async () => {
    seed([guildRow({ missions_enabled: true, mission_channel_id: CHANNEL })]);

    const result = await handleMissionsAdmin(adminBody({ sub: 'disable' }));

    assert.match(result.reply.content, /off for this server/i);
    const row = fake.tables.guild_settings[0];
    assert.equal(row.missions_enabled, false);
    assert.equal(row.mission_channel_id, CHANNEL);
  });
});

describe('/missions status', () => {
  for (const [reads, rows, patterns] of [
    ['never-set-up when the guild has no row', [], [/never been set up/i]],
    [
      'running when enabled with a channel',
      [guildRow({ missions_enabled: true, mission_channel_id: CHANNEL })],
      [/Running/, new RegExp(`<#${CHANNEL}>`)],
    ],
    ['off when disabled by hand', [guildRow({ missions_enabled: false, mission_channel_id: CHANNEL })], [/Off/]],
    [
      'stopped when disabled after repeated post failures',
      [guildRow({ missions_enabled: false, mission_channel_id: CHANNEL, mission_post_failures: MISSION_POST_FAILURE_LIMIT })],
      [/Stopped/],
    ],
  ]) {
    it(`reads as ${reads}`, async () => {
      seed(rows);
      const result = await handleMissionsAdmin(adminBody({ sub: 'status' }));
      for (const pattern of patterns) assert.match(result.reply.content, pattern);
    });
  }
});

// The owner's kill switch (migration 013) outranks the admin's switch and
// covers both features. Every subcommand gets the same blank refusal, nothing
// is written, and the lock is never cleared from here.
describe('a locked guild', () => {
  it('gives every subcommand the same refusal, with no mention of a lock', async () => {
    for (const sub of ['status', 'disable', 'enable']) {
      seed([guildRow({ locked: true, missions_enabled: true })]);
      const result = await handleMissionsAdmin(adminBody({ sub }));
      assert.equal(result.reply.content, "Missions aren't available in this server.");
      assert.doesNotMatch(result.reply.content, /lock/i);
      assert.equal(result.afterReply, null);
    }
  });

  it('cannot be re-enabled — the upsert never runs and the lock stays', async () => {
    seed([guildRow({ locked: true, missions_enabled: false })]);

    await handleMissionsAdmin(
      adminBody({ sub: 'enable', options: [{ name: 'channel', value: 'channel-2' }] }),
    );

    const row = fake.tables.guild_settings[0];
    assert.equal(row.missions_enabled, false);
    assert.equal(row.mission_channel_id, null);
    assert.equal(row.locked, true);
  });
});

describe('an unknown subcommand', () => {
  it('is answered rather than throwing', async () => {
    seed([guildRow()]);
    const result = await handleMissionsAdmin(adminBody({ sub: 'frobnicate' }));
    assert.match(result.reply.content, /Unknown subcommand/);
  });
});

describe('/missiondev chancellor', () => {
  it('previews the audience without touching anything', async () => {
    process.env.OWNER_DISCORD_ID = 'owner';
    process.env.BASE_URL = 'https://tkdb.test';
    fake.tables.missions = [];
    const dev = (options) => handleMissionDev({
      member: { user: { id: 'owner' } },
      data: { options: [{ name: 'chancellor', options }] },
    });

    try {
      // No errand, no guild settings, no server.
      const listening = await dev();
      assert.equal(listening.flags, 64 | 32768);
      const [section] = listening.components[0].components;
      assert.match(section.components[0].content, /\/request/);
      assert.match(section.accessory.media.url, /cornelius\/default\.png$/);

      const granted = await dev([{ name: 'face', value: 'granted' }]);
      const [grantedSection] = granted.components[0].components;
      assert.match(grantedSection.accessory.media.url, /cornelius\/close\.png$/);
      assert.doesNotMatch(grantedSection.components[0].content, /\{house\}/);

      assert.equal(fake.tables.missions.length, 0);
    } finally {
      delete process.env.OWNER_DISCORD_ID;
      delete process.env.BASE_URL;
    }
  });
});
