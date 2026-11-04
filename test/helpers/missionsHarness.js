// Shared setup for the scheduled-missions tests (test/missions-*.test.js,
// docs/scheduled-missions.md). One fake Supabase and one fake Discord REST
// that record what the missions code posts and edits.
//
// Module mocks are per file, so each test file still registers them itself,
// before importing anything under test:
//
//   const h = createMissionsHarness();
//   mock.module('@supabase/supabase-js', h.supabaseMock);
//   mock.module('../discordRest.js', h.discordRestMock);
//   await h.load();
//   beforeEach(h.fresh);
import { createFakeSupabase } from './fakeSupabase.js';
import { fakeDiscordRest } from './fakeDiscordRest.js';

export const GUILD = 'guild-1';
export const CHANNEL = 'channel-1';
export const BASE_URL = 'https://tkdb.test';
export const IS_COMPONENTS_V2 = 1 << 15;

export function createMissionsHarness() {
  process.env.SUPABASE_URL ??= 'http://fake.local';
  process.env.SUPABASE_SERVICE_ROLE_KEY ??= 'fake-service-role-key';

  const fake = createFakeSupabase({
    guild_settings: [],
    missions: [],
    mission_log: [],
    house_progress: [],
    command_limits: [],
    character_relationships: [],
  });

  const posts = [];
  const edits = [];
  // Flip discordFail.edit to make the next editChannelMessage calls throw, the
  // way a Discord 5xx or a deleted post would — the call is still recorded first.
  const discordFail = { edit: false, interaction: false };
  // Edits made through an interaction's webhook token (the Chancellor's /request).
  const interactionEdits = [];

  const discordRest = fakeDiscordRest({
    postChannelMessage: async (channelId, body) => {
      posts.push({ channelId, body });
      return { id: `message-${posts.length}` };
    },
    editChannelMessage: async (channelId, messageId, body) => {
      edits.push({ channelId, messageId, body });
      if (discordFail.edit) throw new Error('Discord API error: 500');
      return {};
    },
    // Mirrors the real editChannelMessageSafe: skip with no messageId, record
    // and swallow a failure rather than throwing.
    editChannelMessageSafe: async (channelId, messageId, body) => {
      if (!messageId) return;
      edits.push({ channelId, messageId, body });
    },
    editInteractionMessage: async (token, messageId, body) => {
      interactionEdits.push({ token, messageId, body });
      if (discordFail.interaction) throw new Error('Discord API error: 404');
      return { id: messageId };
    },
  });

  // In-memory state the missions code keeps between calls, loaded after the
  // test file has registered its mocks.
  let clearers = [];

  function reset() {
    fake.tables.guild_settings = [];
    fake.tables.missions = [];
    fake.tables.mission_log = [];
    fake.tables.house_progress = [];
    fake.tables.user_activity = [];
    fake.tables.command_limits = [];
    fake.tables.character_relationships = [];
    posts.length = 0;
    edits.length = 0;
    interactionEdits.length = 0;
    discordFail.edit = false;
    discordFail.interaction = false;
    delete process.env.BASE_URL;
    for (const clear of clearers) clear();
  }

  // `n` missions `userId` accepted at `at`. Status is irrelevant to the daily
  // cap: taking a mission spends the day whether it was finished or lapsed.
  function seedLeads(userId, n, at) {
    for (let i = 0; i < n; i++) {
      fake.tables.missions.push(
        missionRow({ id: 100 + i, status: 'expired', accepted_by: userId, accepted_at: at }),
      );
    }
  }

  // `n` co-ops `userId` backed up, completed at `at`.
  function seedAssists(userId, n, at) {
    for (let i = 0; i < n; i++) {
      fake.tables.missions.push(
        missionRow({
          id: 300 + i, // clear of seedLeads' ids
          mission_type: 'coop',
          status: 'completed',
          accepted_by: `lead-${i}`,
          accepted_at: at,
          helper_user_id: userId,
          completed_at: at,
        }),
      );
    }
  }

  return {
    fake,
    posts,
    edits,
    interactionEdits,
    discordFail,
    supabaseMock: { namedExports: { createClient: () => fake.client } },
    discordRestMock: { namedExports: discordRest },
    async load() {
      const { clearChancellorAudiences } = await import('../../missions/houseChange.js');
      const { clearRiddleCooldowns } = await import('../../constants/missions.js');
      const { clearCommandInvokeThrottle } = await import('../../commandLimits.js');
      clearers = [clearChancellorAudiences, clearRiddleCooldowns, clearCommandInvokeThrottle];
    },
    reset,
    // The usual beforeEach: a clean slate, with portraits served from BASE_URL.
    fresh() {
      reset();
      process.env.BASE_URL = BASE_URL;
    },
    seedLeads,
    seedAssists,
  };
}

export function guildRow(overrides = {}) {
  return {
    guild_id: GUILD,
    encounter_channel_id: CHANNEL,
    missions_enabled: true,
    locked: false,
    mission_slots_fired: [],
    ...overrides,
  };
}

// A guild whose slots were rolled for `now`'s local day (mission_slots_day is
// YYYY-MM-DD), none fired yet.
export function slotGuild(now, slots) {
  const day = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
  ].join('-');
  return guildRow({ mission_slots_day: day, mission_slots_today: slots, mission_slots_fired: [] });
}

export function click(userId, { nick = 'Inspector' } = {}) {
  return { member: { user: { id: userId, username: nick } } };
}

export function command(userId, options = []) {
  return { guild_id: GUILD, member: { user: { id: userId, username: 'Inspector' } }, data: { options } };
}

export function missionRow(overrides = {}) {
  return {
    id: 1,
    guild_id: GUILD,
    channel_id: CHANNEL,
    message_id: 'message-1',
    mission_type: 'riddle',
    house: 'Frostheim',
    teaser: 'a teaser',
    status: 'open',
    post_expires_at: new Date(Date.now() + 3600_000).toISOString(),
    ...overrides,
  };
}

// The text of a reply in either shape: plain `content`, or a V2 portrait
// message's Text Display (inside the Section when there's a thumbnail).
export function replyText(data) {
  if (data.content != null) return data.content;
  const [body] = data.components[0].components;
  return body.accessory ? body.components[0].content : body.content;
}

// A V2 portrait message's thumbnail URL, or null when it went out as text.
export function thumbnailOf(data) {
  return data.components?.[0]?.components?.[0]?.accessory?.media?.url ?? null;
}
