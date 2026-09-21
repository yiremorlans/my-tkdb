// pingRole: the opt-in @mention on scheduled encounter and mission posts,
// found by role name per guild (utils.js). The mention must allow exactly that
// role, and every failure path must fall back to "no ping" rather than throw.
import { describe, it, mock } from 'node:test';
import assert from 'node:assert/strict';

let roles = {};
let calls = 0;
mock.module('../discordRest.js', {
  namedExports: {
    getGuildRoles: async (guildId) => {
      calls++;
      if (roles[guildId] instanceof Error) throw roles[guildId];
      return roles[guildId] ?? [];
    },
  },
});

const { pingRole } = await import('../utils.js');

const NONE = { mention: '', allowed_mentions: { parse: [] } };

describe('pingRole', () => {
  it('mentions the role named my-tkdb, case-insensitively, and allows only it', async () => {
    roles['g-1'] = [{ id: 'r-other', name: 'Mods' }, { id: 'r-1', name: 'My-TKDB' }];
    assert.deepEqual(await pingRole('g-1'), {
      mention: '<@&r-1>',
      allowed_mentions: { parse: [], roles: ['r-1'] },
    });
  });

  it('caches the lookup per guild', async () => {
    const before = calls;
    await pingRole('g-1');
    assert.equal(calls, before);
  });

  it('pings nobody when the guild has no such role', async () => {
    roles['g-2'] = [{ id: 'r-2', name: 'everyone-else' }];
    assert.deepEqual(await pingRole('g-2'), NONE);
  });

  it('pings nobody when the lookup fails', async () => {
    roles['g-3'] = new Error('Discord API error: 403');
    assert.deepEqual(await pingRole('g-3'), NONE);
  });

  it('pings nobody when disabled, without a lookup', async () => {
    const before = calls;
    assert.deepEqual(await pingRole('g-4', false), NONE);
    assert.equal(calls, before);
  });
});
