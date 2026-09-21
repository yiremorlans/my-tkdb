import "dotenv/config";
import { InteractionResponseFlags } from "discord-interactions";
import { getGuildRoles } from "./discordRest.js";

// The ephemeral response flag, in one place: missions.js, encounters.js,
// publicEncounters.js and bondScenes.js each replied to the same interaction
// flag under their own locally re-derived alias (one of them as the raw
// number 64) before this. Import this instead of adding another one.
export const EPHEMERAL = InteractionResponseFlags.EPHEMERAL;

// The opt-in ping on scheduled public posts (fresh encounters, mission
// requests): whichever role in the guild is named PING_ROLE_NAME. Members give
// themselves that role to be notified; a guild without one gets no ping.
//
// Looked up by name per guild rather than stored, so there's nothing to
// configure. Results, misses included, are cached for PING_ROLE_TTL_MS so a
// busy tick isn't a roles fetch per post, while a role created or renamed
// later is still picked up within minutes.
export const PING_ROLE_NAME = "tkdb-inspectors";
const PING_ROLE_TTL_MS = 10 * 60 * 1000;
const pingRoleCache = new Map(); // guildId -> { roleId, at }

async function findPingRoleId(guildId) {
  const cached = pingRoleCache.get(guildId);
  if (cached && Date.now() - cached.at < PING_ROLE_TTL_MS) return cached.roleId;

  const roles = await getGuildRoles(guildId);
  // Case-insensitive, since role names are typed by hand in server settings.
  const role = roles.find((r) => r.name.toLowerCase() === PING_ROLE_NAME);
  const roleId = role?.id ?? null;
  pingRoleCache.set(guildId, { roleId, at: Date.now() });
  return roleId;
}

// Returns the mention to prepend to `content` and the allowed_mentions that
// lets exactly that role, and nothing else, ping. `enabled` false, no such
// role, or a failed lookup all mean no ping: a notification must never cost
// the post itself.
export async function pingRole(guildId, enabled = true) {
  const none = { mention: "", allowed_mentions: { parse: [] } };
  if (!enabled || !guildId) return none;

  let roleId;
  try {
    roleId = await findPingRoleId(guildId);
  } catch (err) {
    console.error(
      `[pingRole] Role lookup failed for guild ${guildId}:`,
      err.message,
    );
    return none;
  }

  if (!roleId) return none;
  return {
    mention: `<@&${roleId}>`,
    allowed_mentions: { parse: [], roles: [roleId] },
  };
}

export async function DiscordRequest(endpoint, options) {
  // append endpoint to root API URL
  const url = "https://discord.com/api/v10/" + endpoint;
  // Stringify payloads
  if (options.body) options.body = JSON.stringify(options.body);
  // Use fetch to make requests
  const res = await fetch(url, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      "Content-Type": "application/json; charset=UTF-8",
      "User-Agent":
        "DiscordBot (https://github.com/discord/discord-example-app, 1.0.0)",
    },
    ...options,
  });
  // throw API errors
  if (!res.ok) {
    const data = await res.json();
    console.log(res.status);
    throw new Error(JSON.stringify(data));
  }
  // return original response
  return res;
}

export async function InstallGlobalCommands(appId, commands) {
  // API endpoint to overwrite global commands
  const endpoint = `applications/${appId}/commands`;

  try {
    // This is calling the bulk overwrite endpoint: https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
    const response = await DiscordRequest(endpoint, {
      method: "PUT",
      body: commands,
    });
    console.log(`✅ Successfully registered ${commands.length} commands`);
  } catch (err) {
    console.error(err);
  }
}
