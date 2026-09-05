// buildDossierMessage: /house, repurposed from "which house is your heart in"
// into the Inspector dossier (docs/scheduled-missions.md §9). Rank and the
// per-house tally come from SUM(mission_log.points) — never the mission count,
// because one errand can be worth four of them — and the old closest-house-by-
// affinity answer survives as one line of it.
import { test, mock } from 'node:test';
import assert from 'node:assert';
import { createFakeSupabase } from './helpers/fakeSupabase.js';
import { HOUSES } from '../constants/backgrounds.js';

process.env.SUPABASE_URL ??= 'http://fake.local';
process.env.SUPABASE_SERVICE_ROLE_KEY ??= 'fake-service-role-key';

const fake = createFakeSupabase({
  character_relationships: [],
  mission_log: [],
  missions: [],
});
mock.module('@supabase/supabase-js', {
  namedExports: { createClient: () => fake.client },
});

mock.module('../discordRest.js', {
  namedExports: {
    postChannelMessage: async () => ({ id: 'message-1' }),
    editChannelMessage: async () => ({}),
    openDmChannel: async () => 'dm-1',
    postChannelTyping: async () => {},
  },
});

const { buildDossierMessage } = await import('../missions.js');

function reset({ relationships = [], log = [], missions = [] } = {}) {
  fake.tables.character_relationships = relationships.map((r) => ({ ...r }));
  fake.tables.mission_log = log.map((r) => ({ ...r }));
  fake.tables.missions = missions.map((r) => ({ ...r }));
}

test('a user with no missions and no bonds is told there is nothing on record', async () => {
  reset();
  const message = await buildDossierMessage('user-1');
  assert.match(message.content, /No missions on record yet/);
  assert.strictEqual(message.embeds, undefined);
});

test('the old closest-house-by-affinity answer survives even with an empty record', async () => {
  reset({
    relationships: [
      { discord_user_id: 'user-1', character_id: 'ren', affinity: 30 }, // Jabberwock
      { discord_user_id: 'user-1', character_id: 'shohei', affinity: 5 }, // Vagastrom
    ],
  });
  const message = await buildDossierMessage('user-1');
  assert.match(message.content, new RegExp(`Closest house \\(by affinity\\): \\*\\*${HOUSES.JABBERWOCK}\\*\\*`));
});

test('rank comes from summed points, not the number of missions filed', async () => {
  // Three rows, forty-five house logs: Senior Inspector starts at 40, so
  // counting missions (3) instead of summed points would leave this player at
  // Novice — nowhere near ranked up.
  reset({
    log: [
      { discord_user_id: 'user-1', house: HOUSES.FROSTHEIM, mission_type: 'errand', points: 20, role: 'lead' },
      { discord_user_id: 'user-1', house: HOUSES.FROSTHEIM, mission_type: 'errand', points: 20, role: 'lead' },
      { discord_user_id: 'user-1', house: HOUSES.SINOSTRA, mission_type: 'riddle', points: 5, role: 'lead' },
    ],
  });

  const message = await buildDossierMessage('user-1');
  assert.match(message.content, /Rank: \*\*Senior Inspector\*\*/);
  assert.match(message.content, /45 house logs · 3 missions filed/);
});

test('another user’s mission_log rows never reach this dossier', async () => {
  reset({
    log: [
      { discord_user_id: 'user-1', house: HOUSES.FROSTHEIM, mission_type: 'riddle', points: 1, role: 'lead' },
      { discord_user_id: 'user-2', house: HOUSES.FROSTHEIM, mission_type: 'errand', points: 4, role: 'lead' },
    ],
  });

  const message = await buildDossierMessage('user-1');
  assert.match(message.content, /1 house log · 1 mission filed/);
});

test('per-house points are tallied and the busiest house takes the emblem', async () => {
  reset({
    log: [
      { discord_user_id: 'user-1', house: HOUSES.VAGASTROM, mission_type: 'riddle', points: 1, role: 'lead' },
      { discord_user_id: 'user-1', house: HOUSES.HOTARUBI, mission_type: 'errand', points: 3, role: 'lead' },
    ],
  });

  const message = await buildDossierMessage('user-1');
  assert.match(message.content, new RegExp(`By house: .*\\b${HOUSES.HOTARUBI} 3\\b`));
  assert.match(message.content, new RegExp(`\\b${HOUSES.VAGASTROM} 1\\b`));
  assert.strictEqual(message.embeds[0].title, HOUSES.HOTARUBI);
});

test('an assist counts toward the dossier exactly like a lead', async () => {
  reset({
    log: [
      { discord_user_id: 'user-1', house: HOUSES.OBSCUARY, mission_type: 'coop', points: 1, role: 'assist' },
      { discord_user_id: 'user-1', house: HOUSES.OBSCUARY, mission_type: 'coop', points: 1, role: 'lead' },
    ],
  });

  const message = await buildDossierMessage('user-1');
  assert.match(message.content, /2 house logs · 2 missions filed/);
});

test('a held errand shows as the current mission, with its signature progress', async () => {
  reset({
    log: [{ discord_user_id: 'user-1', house: HOUSES.DIONYSIA, mission_type: 'riddle', points: 1, role: 'lead' }],
    missions: [
      {
        id: 7,
        guild_id: 'guild-1',
        channel_id: 'channel-1',
        mission_type: 'errand',
        house: HOUSES.DIONYSIA,
        status: 'accepted',
        accepted_by: 'user-1',
        signatures: { mio: new Date().toISOString(), shion: null },
      },
    ],
  });

  const message = await buildDossierMessage('user-1');
  assert.match(message.content, new RegExp(`Current mission: \\*\\*${HOUSES.DIONYSIA}\\*\\* · errand · 1 / 2 signatures`));
});

test('with a record but nothing in hand, the current mission reads as none', async () => {
  reset({
    log: [{ discord_user_id: 'user-1', house: HOUSES.SINOSTRA, mission_type: 'riddle', points: 1, role: 'lead' }],
  });

  const message = await buildDossierMessage('user-1');
  assert.match(message.content, /Current mission: none/);
});

test('an unknown character_id in the relationship set is ignored rather than throwing', async () => {
  reset({
    relationships: [{ discord_user_id: 'user-1', character_id: 'not-a-real-character', affinity: 50 }],
  });

  await assert.doesNotReject(() => buildDossierMessage('user-1'));
  const message = await buildDossierMessage('user-1');
  assert.doesNotMatch(message.content, /Closest house/);
});
