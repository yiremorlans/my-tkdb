// /house: the Inspector dossier (docs/scheduled-missions.md).

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  inspectorRank,
  MISSION_TYPE_LABEL,
  MISSION_TYPES,
  missionProgressLine,
} from "../constants/missions.js";
import { getCharacterById } from "../constants/characters.js";
import { HOUSES } from "../constants/backgrounds.js";
import {
  getAcceptedMission,
  getMissionLogStats,
  getUserRelationships,
} from "../db/supabase.js";
import { MISSION_EMBED_COLOR, errandProgress } from "./shared.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// --- /house — the Inspector dossier -----------------------------------------

// The one line of the old /house kept: which house this player's heart is in,
// by summed affinity, alongside the record of what they have actually done.
// Returns `{ house, totals }` — `house` is that closest house for the dossier
// line, `totals` is the per-house affinity map the emblem uses to break a
// mission-points tie.
async function closestHouseByAffinity(userId) {
  const relationships = await getUserRelationships(userId).catch((err) => {
    console.error(
      "[missions] Could not read relationships for the dossier:",
      err.message,
    );
    return [];
  });

  const totals = {};
  for (const relationship of relationships || []) {
    const character = getCharacterById(relationship.character_id);
    if (!character?.house) continue;
    totals[character.house] =
      (totals[character.house] || 0) + (relationship.affinity || 0);
  }

  const ranked = Object.entries(totals)
    .filter(([, affinity]) => affinity > 0)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

  return { house: ranked[0]?.[0] || null, totals };
}

/**
 * `/house` — repurposed from "which house is your heart in" into the Inspector
 * dossier. Rank comes from SUM(points) over mission_log, not the mission count,
 * because an errand can be worth up to four of them.
 */
export async function buildDossierMessage(userId) {
  const [stats, mission, closest] = await Promise.all([
    getMissionLogStats(userId),
    getAcceptedMission(userId).catch((err) => {
      console.error(
        "[missions] Could not read the held mission for the dossier:",
        err.message,
      );
      return null;
    }),
    closestHouseByAffinity(userId),
  ]);
  const closestHouse = closest.house;

  if (!mission && stats.filed === 0) {
    return {
      content: closestHouse
        ? `**INSPECTOR DOSSIER**\n\nNo missions on record yet. Watch for a briefing in the channel and hit Accept first.\n\nClosest house (by affinity): **${closestHouse}**`
        : `**INSPECTOR DOSSIER**\n\nNo missions on record yet. Watch for a briefing in the channel and hit Accept first.`,
      allowed_mentions: { parse: [] },
    };
  }

  const rank = inspectorRank(stats.points);

  const lines = [
    `**INSPECTOR DOSSIER**`,
    "",
    `Rank: **${rank.name}**  ·  ${stats.points} house log${stats.points === 1 ? "" : "s"} · ${
      stats.filed
    } mission${stats.filed === 1 ? "" : "s"} filed`,
  ];

  // The ledger for the reward players hold rather than spend. The button that
  // actually spends one only ever appears on a cooldown-blocked /roam or /meet,
  // so this is where someone checks whether they have any.
  if (stats.banked > 0) {
    lines.push(
      `Cooldown resets banked: **${stats.banked}** — spend one from \`/roam\` or \`/meet\` while you're waiting.`,
    );
  }

  const houseRows = Object.entries(stats.byHouse)
    .filter(([, points]) => points > 0)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

  // Plain tally, not a bar chart: there's no per-house progression to visualize
  // (rank is the only ladder, and it's account-wide), so a bar here would only
  // imply a bar's usual meaning — progress toward something — that isn't real.
  if (houseRows.length) {
    lines.push(
      "",
      `By house: ${houseRows.map(([house, points]) => `${house} ${points}`).join(" · ")}`,
    );
  }

  if (mission) {
    let progress;
    if (mission.mission_type === MISSION_TYPES.ERRAND) {
      const { signed, required } = errandProgress(mission);
      progress = missionProgressLine(mission, { signed, required });
    } else {
      progress = missionProgressLine(mission);
    }
    lines.push(
      "",
      `Current mission: **${mission.house}** · ${
        MISSION_TYPE_LABEL[mission.mission_type] || mission.mission_type
      } · ${progress}`,
    );
  } else {
    lines.push("", "Current mission: none");
  }

  if (closestHouse)
    lines.push(`Closest house (by affinity): **${closestHouse}**`);

  // The emblem is the house this player has done the most FOR, not the one they
  // are fondest of. A points tie goes to whichever of the tied houses they are
  // closest to by affinity, so the emblem still means something when three
  // houses read "1"; recency only settles a tie the bonds leave level. A player
  // with a record but no house points (impossible today, but a cheap guard)
  // falls back to the affinity house.
  const emblemHouse = pickEmblemHouse(
    stats.byHouse,
    closest.totals,
    stats.latestByHouse,
    closestHouse,
  );
  const { embeds, files } = await emblemAttachment(emblemHouse);

  return {
    content: lines.join("\n"),
    embeds: embeds.length ? embeds : undefined,
    files: files.length ? files : undefined,
    allowed_mentions: { parse: [] },
  };
}

// Ranks houses by points, then affinity, then recency — the emblem's own
// tie-break rules. Deliberately re-derives from stats.byHouse rather than
// reusing the dossier's `houseRows` list above: that list is pre-sorted with
// ties broken alphabetically for a readable display line, and Array#sort is
// stable, so sorting it further would let a full tie (points, affinity, and
// recency all equal) silently fall back to alphabetical order instead of
// stats.byHouse's own order.
function pickEmblemHouse(byHouse, affinityByHouse, latestByHouse, fallbackHouse) {
  const affinity = affinityByHouse || {};
  const latest = latestByHouse || {};
  const ranked = Object.entries(byHouse || {})
    .filter(([, points]) => points > 0)
    .sort(
      (a, b) =>
        b[1] - a[1] ||
        (affinity[b[0]] || 0) - (affinity[a[0]] || 0) ||
        (latest[b[0]] || 0) - (latest[a[0]] || 0),
    );
  return ranked[0]?.[0] || fallbackHouse || null;
}

// Kept from the old /house: one authored line per house, now used as the
// caption on the dossier's emblem card.
const HOUSE_COMMENDATIONS = {
  [HOUSES.FROSTHEIM]:
    "Frostheim has your name on file, and Frostheim keeps its files.",
  [HOUSES.VAGASTROM]:
    "Vagastrom doesn't say thank you. It just stops giving you trouble.",
  [HOUSES.HOTARUBI]:
    "Hotarubi lit a lantern for you. Whether you noticed is another matter.",
  [HOUSES.DIONYSIA]:
    "Dionysia put your name on the guest list and left it there.",
  [HOUSES.MORTKRANKEN]:
    "Mortkranken has stopped calling you a specimen. Mostly.",
  [HOUSES.JABBERWOCK]:
    "Jabberwock would give you a free tour, if you asked. Or if you did not.",
  [HOUSES.OBSCUARY]:
    "Obscuary owes you a favor, and Obscuary remembers favors.",
  [HOUSES.SINOSTRA]: "Sinostra has your account marked in the black. Enjoy it.",
};

async function emblemAttachment(house) {
  if (!house) return { embeds: [], files: [] };

  const filename = `${house}.png`;
  let buffer = null;
  try {
    buffer = await fs.promises.readFile(
      path.join(__dirname, "..", "assets", "emblem", filename),
    );
  } catch (err) {
    console.error(
      `[missions] Could not load emblem for ${house}:`,
      err.message,
    );
  }

  return {
    embeds: [
      {
        title: house,
        description:
          HOUSE_COMMENDATIONS[house] || `${house} is glad of the help.`,
        image: buffer ? { url: `attachment://${filename}` } : undefined,
        color: MISSION_EMBED_COLOR,
      },
    ],
    files: buffer ? [{ attachment: buffer, name: filename }] : [],
  };
}
