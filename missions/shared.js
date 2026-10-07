// Scheduled missions: the small pieces more than one mission module uses (the
// ephemeral reply shapes, the board's message shapes, errand progress and its
// house-change rule, the mission-type guard).
// See player.js for the module map.

import {
  ButtonStyleTypes,
  InteractionResponseFlags,
  InteractionResponseType,
  MessageComponentTypes,
} from "discord-interactions";
import { EPHEMERAL } from "../utils.js";
import { errandTargets } from "../db/supabase.js";
import { MISSION_NEXT_STEP } from "../constants/missions.js";

export function ephemeral(content) {
  return { content, flags: EPHEMERAL };
}

export function ephemeralResponse(content) {
  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: ephemeral(content),
  };
}

export function userIdOf(body) {
  return body.member?.user?.id || body.user?.id;
}

/**
 * Where this guild's missions post. Missions default to the encounter channel,
 * so a server that already runs `/encounters channel` can turn missions on with
 * no second setup step.
 */
export function resolveMissionChannel(guild) {
  return guild?.mission_channel_id || guild?.encounter_channel_id || null;
}

export function acceptRow(missionId, { disabled = false } = {}) {
  return [
    {
      type: MessageComponentTypes.ACTION_ROW,
      components: [
        {
          type: MessageComponentTypes.BUTTON,
          style: ButtonStyleTypes.PRIMARY,
          label: "Accept",
          custom_id: `mission:accept:${missionId}`,
          disabled,
        },
      ],
    },
  ];
}

// --- the messenger cat ------------------------------------------------------

// The courier who carries the board's requests, and the only face a public
// mission message ever wears. Two coats, alternating on the mission's own
// BIGSERIAL id, so consecutive requests in a channel never arrive with the
// same cat — parity that lives in the row rather than in a counter here, which
// means it survives a restart, is the same in every guild's channel, and is
// identical for every edit made to one post.
const MESSENGER_CATS = ["Messenger_Cat.png", "Messenger_Cat_2.png"];

// Deliberately not a house sprite or a location: the whole design rests on the
// post giving away neither the house nor the type, and a Frostheim courtyard
// would read as a tell whether or not it actually correlated. The cat is the
// same cat for every mission of every house.
function messengerCatUrl(missionId) {
  const file =
    MESSENGER_CATS[Math.abs(Number(missionId) || 0) % MESSENGER_CATS.length];
  return absoluteAssetUrl(`sprites/${file}`, `mission ${missionId}'s messenger cat`);
}

// The board's colour. Missions are house-blind in public, so this is fixed
// rather than drawn from the mission's house — the same reason the teaser is.
export const MISSION_EMBED_COLOR = 0x2669e6;

/**
 * A public mission message, in the same shape as an encounter reveal
 * (publicEncounters.js): one embed carrying the line, the board's colour and
 * the courier as a thumbnail. The cat is served from `/assets` rather than
 * uploaded, so a request post and every edit to it cost no attachment payload
 * at all — and the image survives an edit without being re-sent.
 *
 * Discord rejects the whole message (400 URL_TYPE_INVALID_URL) if the
 * thumbnail isn't an absolute URL, which is what messengerCatUrl returns when
 * BASE_URL is unset. That's a deploy-config gap and it must not cost the
 * channel its mission, so drop the cat and keep the text.
 */
export function missionEmbed(missionId, description) {
  const embed = { description, color: MISSION_EMBED_COLOR };

  const url = messengerCatUrl(missionId);
  if (url) embed.thumbnail = { url };

  return embed;
}

// `${BASE_URL}/assets/<relPath>`, or null (logged) when BASE_URL isn't an
// absolute http(s) URL: Discord rejects a whole message whose image URL isn't.
// Shared with the /call scenes (publicEncounters.js).
export function absoluteAssetUrl(relPath, what) {
  const url = `${process.env.BASE_URL || ""}/assets/${relPath}`;
  if (/^https?:\/\//i.test(url)) return url;
  console.error(`[assets] BASE_URL is unset or invalid — sending without ${what} (got "${url}")`);
  return null;
}

// An errand's progress, as the {unsigned targets, signed count, required
// count} that missionObjectiveLine/missionProgressLine each need — computed
// once per caller instead of filtering the same target list twice for the
// same two numbers. Shared by the briefing and the dossier.
export function errandProgress(mission) {
  const targets = errandTargets(mission);
  const unsigned = targets.filter((t) => !t.signed);
  return {
    unsigned,
    signed: targets.length - unsigned.length,
    required: targets.length,
  };
}

// The client-side mirror of change_errand_house's rules: "spent", "signed", or
// null while the change is still available.
export function houseChangeBlocker(mission, signed = errandProgress(mission).signed) {
  if (mission.house_changed_at) return "spent";
  if (signed > 0) return "signed";
  return null;
}

/**
 * The Chancellor's V2 message, laid out like a mission post: his line on the
 * left, his portrait (`face`, a file in assets/expressions/cornelius) as a
 * thumbnail on the right, in a container with the board's color bar. Served
 * from /assets like the messenger cat, so the granted edit swaps faces by URL.
 * Not ephemeral: an edit can't change that flag, so a new message adds it.
 */
export function chancellorMessage(face, text) {
  const url = absoluteAssetUrl(`expressions/cornelius/${face}`, "the Chancellor's portrait");
  const textDisplay = { type: MessageComponentTypes.TEXT_DISPLAY, content: text };
  // The bare text when there's no usable URL.
  const body = url
    ? {
        type: MessageComponentTypes.SECTION,
        components: [textDisplay],
        accessory: { type: MessageComponentTypes.THUMBNAIL, media: { url } },
      }
    : textDisplay;
  return {
    flags: InteractionResponseFlags.IS_COMPONENTS_V2,
    components: [{ type: MessageComponentTypes.CONTAINER, accent_color: MISSION_EMBED_COLOR, components: [body] }],
  };
}

// --- command guards ---------------------------------------------------------

// Same "what to do next" table busyLine() renders from (constants/missions.js)
// — one source of truth for the clause, capitalized and punctuated here for
// its spot in a full sentence.
function nextStepLine(mission) {
  const step = MISSION_NEXT_STEP[mission.mission_type] || "check it with `/mission`";
  return `${step[0].toUpperCase()}${step.slice(1)}.`;
}

// The "you need a mission of this type to run this command" guard shared by
// /mission assist, /docs and /riddle: no mission in hand, or the wrong kind of
// mission in hand, both bail with a pointer at the right command. Returns the
// ephemeral reply to send, or null when `mission` is the right type to
// proceed with.
export function missionTypeGuard(mission, type, { noMission, wrongType }) {
  if (!mission) return ephemeral(noMission);
  if (mission.mission_type !== type) {
    return ephemeral(`${wrongType} ${nextStepLine(mission)}`);
  }
  return null;
}

// --- reward writes ----------------------------------------------------------

// Promise.allSettled swallows rejections by design; this puts them back in the
// log, which matters because everything it wraps is a reward write. Hands the
// results back so a caller can still read them after logging.
export function reportFailures(label, prefix = "[missions]") {
  return (results) => {
    for (const result of results) {
      if (result.status === "rejected") {
        console.error(
          `${prefix} ${label} side-effect failed:`,
          result.reason?.message,
        );
      }
    }
    return results;
  };
}
