// Scheduled missions: an errand's one house change, both ways of spending it.
// The button (mission:house) either rerolls the house or opens the
// Chancellor's audience, and /request is the player's answer to that audience.
// They share the audience's edit handles and the change itself, so they live
// together. See player.js for the module map.

import { InteractionResponseType } from "discord-interactions";
import { EPHEMERAL } from "../utils.js";
import {
  CHANCELLOR_AUDIENCE_CHANCE,
  CHANCELLOR_AUDIENCE_LINES,
  CHANCELLOR_AUDIENCE_PROMPT,
  CHANCELLOR_FACES,
  CHANCELLOR_GRANTED_LINES,
  CHANCELLOR_REQUEST_LINES,
  drawErrandTargets,
  HOUSE_CHANGE_DONE_LINE,
  HOUSE_CHANGE_UNAVAILABLE_LINES,
  rollHouseChange,
} from "../constants/missions.js";
import { fillTemplate, pickRandom } from "../constants/publicEncounters.js";
import { editInteractionMessage } from "../discordRest.js";
import {
  changeErrandHouse,
  errandTargets,
  getAcceptedMission,
  getMissionById,
  openChancellorAudience,
  trackCommandUsage,
  trackUserActivity,
  unsignedSignatures,
} from "../db/supabase.js";
import {
  chancellorMessage,
  ephemeral,
  ephemeralResponse,
  houseChangeBlocker,
  userIdOf,
} from "./shared.js";
import { buildDocsMessage, buildMissionBriefing } from "./player.js";

// --- the house-change button ------------------------------------------------

// The Chancellor's audience (migration 026) is open while its stamp is set and
// the change it was granted for is still available. The stamp is never
// cleared: spending the change or collecting a signature closes it.
function chancellorAudienceOpen(mission) {
  return Boolean(mission?.chancellor_audience_at) && houseChangeBlocker(mission) === null;
}

/**
 * `mission:house:<id>[:docs]` — the errand's one free house change (migration 025).
 * Sits on the pickup briefing, /mission and /docs.
 *
 * Usually the new house (never the current one) and a fresh signature draw are
 * rolled here. One click in CHANCELLOR_AUDIENCE_CHANCE instead opens an
 * audience with the Chancellor: a separate V2 message with his portrait, and
 * the player names the house themselves with /request (handleRequest). Nothing
 * is spent by the audience itself; the change still goes through the same RPC.
 *
 * change_errand_house decides under the row lock whether the swap is still
 * allowed and stamps house_changed_at in the same write, so a stale button or a
 * double-click can't spend it twice. The 48h window, the daily lead cap and
 * the reward are untouched — it's the same mission with a different house.
 *
 * On success the message the button sat on is redrawn as the same kind of
 * message for the new house: a /docs click gets the new house's (empty) report
 * sheet, a briefing click gets the new briefing. `from` comes off the
 * custom_id's optional `:docs` suffix. `random` is injectable for tests.
 */
export async function handleMissionHouseChange(
  body,
  missionId,
  from = "briefing",
  { random = Math.random } = {},
) {
  const userId = userIdOf(body);
  const afterReply = async () => {
    await Promise.allSettled([
      trackUserActivity(userId),
      trackCommandUsage(userId, "mission"),
    ]);
  };

  let mission;
  try {
    mission = await getMissionById(missionId);
  } catch (err) {
    console.error("[missions] Could not load errand for a house change:", err.message);
    return {
      response: ephemeralResponse("Something went wrong there. Try again?"),
    };
  }
  if (!mission || mission.accepted_by !== userId) {
    return { response: ephemeralResponse("That mission's already closed.") };
  }

  // An open audience reopens instead of rerolling: the player already won it.
  const reopen = chancellorAudienceOpen(mission);
  if (reopen || random() < CHANCELLOR_AUDIENCE_CHANCE) {
    // The Chancellor doesn't hear a request he can't grant.
    const blocker = houseChangeBlocker(mission);
    if (blocker) {
      return { response: ephemeralResponse(houseChangeRefusalLine(blocker)) };
    }

    if (!reopen) {
      let opened;
      try {
        opened = await openChancellorAudience(mission.id, userId);
      } catch (err) {
        console.error("[missions] Could not open the Chancellor's audience:", err.message);
        return {
          response: ephemeralResponse("Something went wrong there. Try again?"),
        };
      }
      if (!opened) {
        return { response: ephemeralResponse("That mission's already closed.") };
      }
    }

    // Set before the message goes out so a fast /request still finds it; the
    // message id fills in once Discord returns it (onSent, app.js).
    const handles = {
      missionId: mission.id,
      from,
      token: body.token,
      messageId: null,
      expiresAt: Date.now() + INTERACTION_TOKEN_TTL_MS,
    };
    setAudienceHandles(userId, handles);

    const data = chancellorMessage(
      CHANCELLOR_FACES.listening,
      `${pickRandom(CHANCELLOR_AUDIENCE_LINES)}\n${CHANCELLOR_AUDIENCE_PROMPT}`,
    );
    return {
      response: {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: { ...data, flags: data.flags | EPHEMERAL },
      },
      onSent: (message) => {
        handles.messageId = message?.id ?? null;
      },
      afterReply,
    };
  }

  // rollHouseChange only offers houses with a roster, so a house always draws
  // at least one target.
  const house = rollHouseChange(mission.house);
  if (!house) {
    console.error(`[missions] No new house for mission ${mission.id} — refusing`);
    return {
      response: ephemeralResponse("Something went wrong there. Try again?"),
    };
  }

  let change;
  try {
    change = await applyHouseChange(mission, userId, house, from);
  } catch (err) {
    console.error("[missions] change_errand_house failed:", err.message);
    return {
      response: ephemeralResponse("Something went wrong there. Try again?"),
    };
  }
  if (!change.message) {
    return { response: ephemeralResponse(houseChangeRefusalLine(change.outcome)) };
  }

  return {
    response: {
      type: InteractionResponseType.UPDATE_MESSAGE,
      data: change.message,
    },
    afterReply,
  };
}

function houseChangeRefusalLine(outcome) {
  return HOUSE_CHANGE_UNAVAILABLE_LINES[outcome] || "That mission's already closed.";
}

/**
 * The write and the redraw both house-change paths share: a fresh draw for
 * `house`, the RPC, and on 'changed' the clicked message rebuilt for the new
 * house (`from`) with the done line at its foot. Returns `{ outcome, message }`,
 * `message` only on 'changed'. Throws if the RPC does.
 */
async function applyHouseChange(mission, userId, house, from) {
  const targetIds = drawErrandTargets(house);
  const outcome = await changeErrandHouse(mission.id, userId, house, targetIds);
  if (outcome !== "changed") return { outcome };

  // Rendered from what was just written rather than re-read: the RPC only
  // changed these three fields, and a second round trip here would only risk
  // the 15-minute followup window for nothing.
  const updated = {
    ...mission,
    house,
    signatures: unsignedSignatures(targetIds),
    house_changed_at: new Date().toISOString(),
  };
  const message =
    from === "docs"
      ? await buildDocsMessage(updated, errandTargets(updated))
      : await buildMissionBriefing(userId, updated);

  return {
    outcome,
    message: {
      ...message,
      // At the foot of the message, where the 🔒 line would otherwise sit.
      content: `${message.content}\n\n${HOUSE_CHANGE_DONE_LINE}`,
      // An edit of a message that is already ephemeral; /docs' builder sets
      // flags for its own fresh reply.
      flags: undefined,
      // The new house has nothing signed, so there's no field-report image
      // to show; clear any the old message carried.
      attachments: [],
    },
  };
}

// --- the Chancellor's audience (/request) -----------------------------------

// Discord interaction tokens stop working 15 minutes after the interaction.
const INTERACTION_TOKEN_TTL_MS = 15 * 60 * 1000;

// Per user: what /request needs to edit the click's two messages in place (the
// errand, which message the button sat on, the click's token, the audience
// message's id). Whether the audience is open lives on the row; these are only
// edit handles, so they stay in memory and expire with the token.
const chancellorAudiences = new Map();

function setAudienceHandles(userId, handles) {
  const now = Date.now();
  for (const [id, entry] of chancellorAudiences) {
    if (entry.expiresAt <= now) chancellorAudiences.delete(id);
  }
  chancellorAudiences.set(userId, handles);
}

function liveAudienceHandles(userId, missionId) {
  const handles = chancellorAudiences.get(userId);
  return handles?.missionId === missionId && handles.expiresAt > Date.now()
    ? handles
    : null;
}

export function clearChancellorAudiences() {
  chancellorAudiences.clear();
}

// An interaction-token edit that reports success instead of throwing.
async function tryEditInteraction(token, messageId, body, label) {
  try {
    await editInteractionMessage(token, messageId, body);
    return true;
  } catch (err) {
    console.error(`[missions] /request could not edit the ${label}:`, err.message);
    return false;
  }
}

/**
 * `/request house:<house>` — the player's answer to an open audience. Spends
 * the house change on the named house through the same RPC as the button, then
 * edits both messages from the click in place: the audience swaps to the
 * Chancellor's granted face, and the briefing or report sheet is redrawn for
 * the new house exactly as a normal change would. Whatever can't be edited (a
 * dead token, a restart) rides on /request's own reply instead.
 */
export async function handleRequest(body) {
  const userId = userIdOf(body);
  const house = body.data?.options?.find((o) => o.name === "house")?.value;

  const mission = await getAcceptedMission(userId);
  if (!chancellorAudienceOpen(mission)) {
    return { reply: ephemeral(CHANCELLOR_REQUEST_LINES.noAudience), afterReply: null };
  }
  // Kept open: the player can still name a different house.
  if (mission.house === house) {
    return {
      reply: ephemeral(fillTemplate(CHANCELLOR_REQUEST_LINES.sameHouse, { house })),
      afterReply: null,
    };
  }

  const handles = liveAudienceHandles(userId, mission.id);
  const change = await applyHouseChange(mission, userId, house, handles?.from);
  chancellorAudiences.delete(userId);
  if (!change.message) {
    return { reply: ephemeral(houseChangeRefusalLine(change.outcome)), afterReply: null };
  }

  const granted = fillTemplate(pickRandom(CHANCELLOR_GRANTED_LINES), { house });
  const [audienceEdited, messageEdited] = await Promise.all([
    Boolean(handles?.messageId) &&
      tryEditInteraction(
        handles.token,
        handles.messageId,
        chancellorMessage(CHANCELLOR_FACES.granted, granted),
        "audience",
      ),
    Boolean(handles) &&
      tryEditInteraction(handles.token, "@original", change.message, "briefing"),
  ]);

  const lead = audienceEdited ? null : granted;
  let reply;
  if (messageEdited) {
    reply = ephemeral(lead ?? CHANCELLOR_REQUEST_LINES.filed);
  } else {
    const { attachments, flags, ...message } = change.message;
    reply = { ...message, content: [lead, message.content].filter(Boolean).join("\n\n") };
  }

  return {
    reply,
    afterReply: async () => {
      await Promise.allSettled([
        trackUserActivity(userId),
        trackCommandUsage(userId, "request"),
      ]);
    },
  };
}
