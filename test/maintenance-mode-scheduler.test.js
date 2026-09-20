// The maintenance kill switch (app_settings.maintenance_mode, db/migrations/
// 024) also has to stop encounterScheduler.js's own 45s tick loop, not just
// app.js's /interactions route — the scheduler spawns public encounters and
// fires mission slots on its own timer, independently of any interaction, so
// the app.js gate alone would leave it posting into every enabled guild
// while maintenance is on. See the comment on runTick in encounterScheduler.js.
import { describe, it, mock } from 'node:test';
import assert from 'node:assert/strict';
import { createFakeSupabase } from './helpers/fakeSupabase.js';

process.env.SUPABASE_URL ??= 'http://fake.local';
process.env.SUPABASE_SERVICE_ROLE_KEY ??= 'fake-service-role-key';
process.env.BASE_URL = 'https://example.test';

const GUILD = 'guild-1';
const CHANNEL = 'channel-1';
const NOW = new Date('2026-09-02T15:00:00Z');

const fake = createFakeSupabase({
  app_settings: [{ id: 1, maintenance_mode: false }],
  guild_settings: [
    {
      guild_id: GUILD,
      encounter_channel_id: CHANNEL,
      enabled: true,
      locked: false,
      post_failures: 0,
      last_encounter_at: new Date(NOW.getTime() - 200 * 60 * 1000).toISOString(),
      next_gap_minutes: 45,
    },
  ],
  public_encounters: [],
  encounter_milestones: [],
  encounter_win_stats: [],
  character_relationships: [],
});
mock.module('@supabase/supabase-js', {
  namedExports: { createClient: () => fake.client },
});

const posts = [];
mock.module('../discordRest.js', {
  namedExports: {
    postChannelMessage: async (channelId, body) => {
      posts.push({ channelId, body });
      return { id: `message-${posts.length}` };
    },
    editChannelMessage: async () => ({}),
    editChannelMessageSafe: async () => {},
    openDmChannel: async () => 'dm-channel-1',
    postChannelTyping: async () => {},
  },
});

mock.module('../imageComposition.js', {
  namedExports: {
    composeEncounter: async () => Buffer.from('png'),
    composeSilhouetteEncounter: async () => Buffer.from('silhouette-png'),
    composeWardingCard: async () => Buffer.from('warding-png'),
    composeFieldReport: async () => Buffer.from('report-png'),
  },
});

const { runTick } = await import('../encounterScheduler.js');
const { clearMaintenanceCache } = await import('../maintenance.js');

function setMaintenance(on) {
  fake.tables.app_settings[0].maintenance_mode = on;
  clearMaintenanceCache();
}

describe('the scheduler tick under maintenance', () => {
  it('skips spawning while maintenance is on', async () => {
    setMaintenance(true);
    posts.length = 0;

    await runTick(NOW);

    assert.equal(posts.length, 0, 'no encounter should be posted while under maintenance');
    assert.equal(
      fake.tables.guild_settings[0].last_encounter_at,
      new Date(NOW.getTime() - 200 * 60 * 1000).toISOString(),
      'the cadence anchor should not move either — nothing about the pass ran',
    );
  });

  it('resumes spawning once maintenance is off', async () => {
    setMaintenance(false);
    posts.length = 0;

    await runTick(NOW);

    assert.equal(posts.length, 1, 'a spawn attempt runs normally once maintenance clears');
  });
});
