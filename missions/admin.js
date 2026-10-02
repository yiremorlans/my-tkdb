// /missions (per-guild admin) and /missiondev (owner-only test tooling).

import { EPHEMERAL } from "../utils.js";
import {
  CHANCELLOR_AUDIENCE_LINES,
  CHANCELLOR_AUDIENCE_PROMPT,
  CHANCELLOR_FACES,
  CHANCELLOR_GRANTED_LINES,
  MISSION_POST_FAILURE_LIMIT,
  MISSION_TYPE_LABEL,
} from "../constants/missions.js";
import { fillTemplate, pickRandom } from "../constants/publicEncounters.js";
import { canManageEncounters } from "../publicEncounters.js";
import { HOUSES } from "../constants/backgrounds.js";
import { postChannelMessage } from "../discordRest.js";
import {
  enableGuildMissions,
  expireMission,
  getGuildSettings,
  getOpenMission,
  setGuildMissionsEnabled,
} from "../db/supabase.js";
import {
  finalizeWithdrawnMission,
  spawnMission,
  sweepExpiredMissions,
} from "./posts.js";
import {
  chancellorMessage,
  ephemeral,
  resolveMissionChannel,
  userIdOf,
} from "./shared.js";

// --- /missions (admin) ------------------------------------------------------

// `default_member_permissions` on the command is only a default — a server
// admin can grant /missions to any role under Integrations — so the permission
// is re-checked here against the member's real computed permissions. Same
// "Manage Server" check /encounters admin uses, imported from there rather
// than redefined.
const canManageMissions = canManageEncounters;

export async function handleMissionsAdmin(body) {
  const userId = userIdOf(body);
  const guildId = body.guild_id;

  if (!guildId)
    return {
      reply: ephemeral("This only works in a server."),
      afterReply: null,
    };

  if (!canManageMissions(body.member)) {
    console.warn(
      `[missions] Refused /missions from ${userId} in ${guildId} — lacks Manage Server`,
    );
    return {
      reply: ephemeral(
        "You need the **Manage Server** permission to configure missions.",
      ),
      afterReply: null,
    };
  }

  const settings = await getGuildSettings(guildId);

  // The owner's kill switch (db/migrations/013) outranks the admin's switch and
  // covers both features, so a locked guild can't turn missions on either.
  if (settings?.locked) {
    console.warn(
      `[missions] Refused /missions in locked guild ${guildId} (from ${userId})`,
    );
    return {
      reply: ephemeral("Missions aren't available in this server."),
      afterReply: null,
    };
  }

  const sub = body.data?.options?.[0];
  const subcommand = sub?.name;

  if (subcommand === "enable") {
    const channelId =
      sub.options?.find((o) => o.name === "channel")?.value ||
      settings?.encounter_channel_id ||
      null;

    if (!channelId) {
      return {
        reply: ephemeral(
          "Pick a channel for missions, or set up `/encounters channel` first and missions will follow it.",
        ),
        afterReply: null,
      };
    }

    await enableGuildMissions(guildId, channelId);

    return {
      reply: ephemeral(
        [
          `Missions will post in <#${channelId}>.`,
          "Three requests a day, at times that move inside their band from one day to the next.",
          "The post never says which house or which type it is. Only the person who hits **Accept** finds that out, with `/mission`.",
          "I need **View Channel**, **Send Messages**, **Attach Files** and **Embed Links** there.",
        ].join("\n"),
      ),
      afterReply: async () => {
        // Surfaces a permissions problem now, at setup, rather than burning
        // three days of slots before the auto-disable notices.
        try {
          await postChannelMessage(channelId, {
            content:
              "Mission requests will come through here. Watch the board.",
            allowed_mentions: { parse: [] },
          });
        } catch (err) {
          console.error(
            `[missions] Setup check failed for guild ${guildId}:`,
            err.message,
          );
        }
      },
    };
  }

  if (subcommand === "disable") {
    await setGuildMissionsEnabled(guildId, false);
    return {
      reply: ephemeral(
        "Missions are off for this server. Anything already in flight finishes normally.",
      ),
      afterReply: null,
    };
  }

  if (subcommand === "status") {
    return { reply: ephemeral(missionStatusLine(settings)), afterReply: null };
  }

  return { reply: ephemeral("Unknown subcommand."), afterReply: null };
}

function missionStatusLine(settings) {
  if (!settings) {
    return "Missions have never been set up here. Run `/missions enable` to start.";
  }

  const channelId = resolveMissionChannel(settings);
  const channel = channelId ? `<#${channelId}>` : null;
  const failures = settings.mission_post_failures || 0;

  if (!channel) {
    return "⚠️ **Not running** — no channel is set. Run `/missions enable`.";
  }
  if (!settings.missions_enabled && failures >= MISSION_POST_FAILURE_LIMIT) {
    return `⚠️ **Stopped** — ${failures} mission posts in a row failed to reach ${channel}, so I stopped trying.\nCheck I have **View Channel**, **Send Messages**, **Attach Files** and **Embed Links** there, then run \`/missions enable\` again.`;
  }
  if (!settings.missions_enabled) {
    return `⛔ **Off** — turned off with \`/missions disable\`. Run \`/missions enable\` to turn it back on.`;
  }

  const lines = [`✅ **Running** — posting in ${channel}.`];
  if (failures > 0) {
    lines.push(
      `⚠️ ${failures} recent post${failures === 1 ? "" : "s"} failed. After ${MISSION_POST_FAILURE_LIMIT} in a row I'll stop.`,
    );
  }

  // The day's slot times are deliberately not shown here — a server admin who
  // could see the schedule is halfway to owning it. `/encdev missions` (owner
  // only) has them.
  return lines.join("\n");
}

// --- /missiondev (owner-only test tooling) --------------------------------

// The same single-operator gate as /encdev: OWNER_DISCORD_ID, and nobody else.
// Unset means the command is off for everyone. It's also registered with
// default_member_permissions '0' so it never shows for non-admins — but that
// only hides it. This check is what enforces it, and anyone else is answered
// with a bare "Unknown command." so its existence isn't confirmed.
function isMissionDevOwner(userId) {
  const owner = process.env.OWNER_DISCORD_ID;
  return Boolean(owner) && userId === owner;
}

/**
 * `/missiondev` — manual mission tooling, restricted to OWNER_DISCORD_ID.
 * Exists only to exercise the spawn / accept / expiry path on demand instead of
 * waiting out the day's slots.
 *
 *   /missiondev spawn [type] [house]   force a request onto the board now
 *   /missiondev clear                  withdraw this guild's open request
 *   /missiondev sweep                  finalize everything past its deadline now
 *
 * A manual spawn never touches the guild's mission slots or the post-failure
 * counter — the real schedule is left exactly as it was, same as /encdev.
 *
 * Returns a plain message-data object (`{ content }`). app.js defers this
 * interaction ephemerally and delivers the return value as the followup, so the
 * whole thing runs with a ~15s budget rather than the 3s inline one.
 */
export async function handleMissionDev(body, now = new Date()) {
  const userId = userIdOf(body);
  const guildId = body.guild_id;

  if (!isMissionDevOwner(userId)) {
    console.warn(`[missions] /missiondev refused for ${userId} in ${guildId}`);
    return { content: "Unknown command." };
  }

  // A cosmetic preview of the Chancellor's audience message, for checking the
  // layout and portraits. Reads and writes nothing, needs no errand, server or
  // channel. `face: granted` shows the confirmation with close.png, filled
  // with a random house.
  if (body.data?.options?.[0]?.name === "chancellor") {
    const face = body.data.options[0].options?.find((o) => o.name === "face")?.value;
    const data =
      face === "granted"
        ? chancellorMessage(
            CHANCELLOR_FACES.granted,
            fillTemplate(pickRandom(CHANCELLOR_GRANTED_LINES), {
              house: pickRandom(Object.values(HOUSES)),
            }),
          )
        : chancellorMessage(
            CHANCELLOR_FACES.listening,
            `${pickRandom(CHANCELLOR_AUDIENCE_LINES)}\n${CHANCELLOR_AUDIENCE_PROMPT}`,
          );
    return { ...data, flags: data.flags | EPHEMERAL };
  }

  if (!guildId) return { content: "This only works in a server." };

  const guild = await getGuildSettings(guildId);
  if (!guild) {
    return {
      content: "This server has no settings yet. Run `/missions enable` first.",
    };
  }

  // Respect your own kill switch, same as the admin command and /encdev. Kept
  // terse and free of any SQL — this is owner-only, but a Discord message is
  // screenshottable. See db/migrations/013 for how to clear a lock.
  if (guild.locked) {
    return { content: "This server is locked. Missions stay off here." };
  }

  const channelId = resolveMissionChannel(guild);
  if (!channelId) {
    return {
      content:
        "No mission channel is set. Run `/missions enable` (or `/encounters channel`) first.",
    };
  }

  const sub = body.data?.options?.[0];
  const subcommand = sub?.name;

  if (subcommand === "sweep") {
    const { withdrawn, lapsed } = await sweepExpiredMissions(guildId, now);
    return {
      content: `Swept: ${withdrawn.length} withdrawn, ${lapsed.length} lapsed.`,
    };
  }

  if (subcommand === "clear") {
    const open = await getOpenMission(guildId);
    if (!open) return { content: "No open request on the board to clear." };

    const expired = await expireMission(open.id);
    if (!expired)
      return { content: "That request closed before it could be cleared." };

    await finalizeWithdrawnMission(expired);
    return {
      content: `Withdrew request #${open.id}. You can \`/missiondev spawn\` again now.`,
    };
  }

  if (subcommand === "spawn") {
    const open = await getOpenMission(guildId);
    if (open) {
      return {
        content: `A request is already on the board (#${open.id}). Clear it with \`/missiondev clear\` first.`,
      };
    }

    const missionType =
      sub.options?.find((o) => o.name === "type")?.value || undefined;

    const rawHouse = sub.options?.find((o) => o.name === "house")?.value;
    let house;
    if (rawHouse) {
      house = Object.values(HOUSES).find(
        (h) => h.toLowerCase() === String(rawHouse).trim().toLowerCase(),
      );
      if (!house) return { content: `I don't know the house "${rawHouse}".` };
    }

    const row = await spawnMission(guild, channelId, now, {
      missionType,
      house,
    });
    if (!row) {
      return {
        content:
          "Spawn failed — nothing was posted. Check the logs (the house may have no authored riddles, or no roster for an errand, or the channel POST was rejected).",
      };
    }

    return {
      content: `Posted a **${
        MISSION_TYPE_LABEL[row.mission_type] || row.mission_type
      }** for **${row.house}** as request #${row.id} in <#${channelId}>.`,
    };
  }

  return { content: "Unknown subcommand." };
}
