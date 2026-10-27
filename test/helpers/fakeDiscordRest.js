// A stand-in for discordRest.js with a stub for every export, so a test only
// writes the functions it actually observes. mock.module fails the whole
// import graph when a mock is missing an export something imports, so a new
// discordRest.js export used to break every test that mocked the module by
// hand. The export list is read from discordRest.js's source, so it can't
// fall behind.
//
// Usage:
//   mock.module('../discordRest.js', {
//     namedExports: fakeDiscordRest({
//       postChannelMessage: async (channelId, body) => { ... },
//     }),
//   });
import { readFileSync } from 'node:fs';

const SOURCE = readFileSync(new URL('../../discordRest.js', import.meta.url), 'utf8');
const EXPORTS = [...SOURCE.matchAll(/^export (?:async )?function (\w+)/gm)].map((m) => m[1]);

// Shaped like what the real call resolves to, for the exports whose callers
// read the result. Every other export resolves to an empty object, or to
// nothing when the real one returns nothing.
const DEFAULTS = {
  postChannelMessage: async () => ({ id: 'message-1' }),
  openDmChannel: async () => 'dm-1',
  getGuildRoles: async () => [],
  editChannelMessageSafe: async () => {},
  deleteInteractionMessage: async () => {},
  postChannelTyping: async () => {},
};

export function fakeDiscordRest(overrides = {}) {
  // An override for a name discordRest.js doesn't export is a stale mock
  // (CODING_STANDARDS.md §9.4) or a typo; either way the test isn't testing
  // what it thinks.
  for (const name of Object.keys(overrides)) {
    if (!EXPORTS.includes(name)) throw new Error(`fakeDiscordRest: discordRest.js has no export "${name}"`);
  }

  const stubs = {};
  for (const name of EXPORTS) {
    stubs[name] = overrides[name] ?? DEFAULTS[name] ?? (async () => ({}));
  }
  return stubs;
}
