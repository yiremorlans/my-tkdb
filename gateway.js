import {
  Client,
  GatewayIntentBits,
  ActivityType,
  Events,
} from 'discord.js';

// The /interactions HTTP endpoint in app.js is enough for slash commands, but
// an interactions-only app never opens a gateway connection, so Discord shows
// it permanently offline. This module holds a lightweight gateway session
// purely so the app registers a presence (the green dot). It reads no message
// content and handles no events beyond presence — Guilds is the minimum intent
// a login needs. discord.js reconnects on its own if the socket drops.

let client = null;

export function startGateway() {
  if (client) return client;

  const token = process.env.DISCORD_TOKEN;
  if (!token) {
    console.log('[gateway] DISCORD_TOKEN not set — staying interactions-only (bot will show offline)');
    return null;
  }

  client = new Client({ intents: [GatewayIntentBits.Guilds] });

  client.once(Events.ClientReady, (c) => {
    console.log(`[gateway] online as ${c.user.tag}`);
    c.user.setPresence({
      status: 'online',
      activities: [{ name: '/roam · /meet', type: ActivityType.Playing }],
    });
  });

  // Don't let a transient gateway error reach the process as an unhandled
  // rejection and take the web server down with it.
  client.on(Events.Error, (err) => console.error('[gateway] client error:', err));
  client.on(Events.ShardError, (err) => console.error('[gateway] shard error:', err));

  client.login(token).catch((err) => {
    console.error('[gateway] login failed:', err);
    client = null;
  });

  return client;
}
