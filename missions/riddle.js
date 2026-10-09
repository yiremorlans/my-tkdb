// Scheduled missions: /riddle, the riddle mission's answer command.
// See player.js for the module map.

import {
  accusedFace,
  BANKED_RESET_LINE,
  clearRiddleCooldowns,
  CULPRIT_FACE,
  getRiddle,
  getRiddleCooldownRemaining,
  MISSION_BOOST_LINE,
  MISSION_ERROR_LINE,
  MISSION_TYPES,
  RIDDLE_WRONG_LINES,
  startRiddleCooldown,
} from "../constants/missions.js";
import {
  ENCOUNTER_BOOST_CAP,
  matchCharacterGuess,
  pickRandom,
} from "../constants/publicEncounters.js";
import { getCharacterById, getFullName } from "../constants/characters.js";
import {
  completeMission,
  getAcceptedMission,
  grantEncounterBoost,
  recordMissionCompletion,
  trackCommandUsage,
  trackUserActivity,
} from "../db/supabase.js";
import {
  ephemeral,
  ephemeralPortraitMessage,
  missionTypeGuard,
  reportFailures,
  userIdOf,
} from "./shared.js";

export async function handleRiddle(body, now = new Date()) {
  const userId = userIdOf(body);
  const rawGuess =
    body.data?.options?.find((o) => o.name === "answer")?.value ?? "";

  const mission = await getAcceptedMission(userId);
  const guardReply = missionTypeGuard(mission, MISSION_TYPES.RIDDLE, {
    noMission: "You have no mission to answer for.",
    wrongType: "Your current mission isn't a riddle.",
  });
  if (guardReply) return { reply: guardReply, afterReply: null };

  const riddle = getRiddle(mission.house, mission.riddle_id);
  if (!riddle) {
    console.error(
      `[missions] Mission ${mission.id} references unknown riddle ${mission.riddle_id}`,
    );
    return {
      reply: ephemeral(
        "That report has gone missing from the file. Nothing to answer.",
      ),
      afterReply: null,
    };
  }

  // The 20s gate is what stops someone typing all 26 names in quick
  // succession. It is checked before the match so a wrong answer can't be
  // probed for free.
  const remaining = getRiddleCooldownRemaining(
    mission.id,
    userId,
    now.getTime(),
  );
  if (remaining > 0) {
    return {
      reply: ephemeral(
        `Give it a moment — try again in ${Math.ceil(remaining / 1000)}s.`,
      ),
      afterReply: null,
    };
  }

  const guessedId = matchCharacterGuess(rawGuess);
  if (guessedId !== riddle.answer) {
    startRiddleCooldown(mission.id, userId, now.getTime());
    // An accusation (a real name, wrong) shows the accused's face; a miss
    // stays plain text. Same generic line either way and no printed name: the
    // face says who was accused (§20.2).
    const line = pickRandom(RIDDLE_WRONG_LINES);
    return {
      reply: guessedId
        ? ephemeralPortraitMessage(guessedId, accusedFace(guessedId), line)
        : ephemeral(line),
      afterReply: null,
    };
  }

  let solved;
  try {
    solved = await completeMission(mission.id, userId, MISSION_TYPES.RIDDLE);
  } catch (err) {
    console.error("[missions] complete_mission failed:", err.message);
    return {
      reply: ephemeral(MISSION_ERROR_LINE),
      afterReply: null,
    };
  }

  if (!solved) {
    return { reply: ephemeral("That mission just closed."), afterReply: null };
  }

  // The culprit reveal (§20.4). The name stays in the text because the
  // thumbnail is too small to identify anyone by face alone. The rewards go
  // in a second message so the portrait stays small; the boost line is fixed
  // before the grant resolves, which is why it never depends on it.
  const character = getCharacterById(riddle.answer);
  const name = character ? getFullName(character) : riddle.answer;
  const text = [`Debunked. **${name}**.`, `"${riddle.winningLine}"`].join("\n\n");
  const rewards = [
    MISSION_BOOST_LINE(character?.firstName ?? name),
    BANKED_RESET_LINE,
  ].join("\n\n");

  return {
    reply: ephemeralPortraitMessage(riddle.answer, CULPRIT_FACE, text),
    followup: ephemeral(rewards),
    afterReply: async () => {
      clearRiddleCooldowns(mission.id);
      // The boost spends on the next /roam or /meet with the culprit, like a
      // /call win's. No milestone and no affinity: missions never move
      // affinity directly.
      await Promise.allSettled([
        grantEncounterBoost(userId, riddle.answer, ENCOUNTER_BOOST_CAP),
        recordMissionCompletion({
          userId,
          house: mission.house,
          missionType: mission.mission_type,
          missionId: mission.id,
          role: "lead",
          points: 1,
        }),
        trackUserActivity(userId),
        trackCommandUsage(userId, "riddle"),
      ]).then(reportFailures("riddle solve"));
    },
  };
}
