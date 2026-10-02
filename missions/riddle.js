// Scheduled missions: /riddle, the riddle mission's answer command.
// See player.js for the module map.

import {
  BANKED_RESET_LINE,
  clearRiddleCooldowns,
  getRiddle,
  getRiddleCooldownRemaining,
  MISSION_TYPES,
  RIDDLE_WRONG_LINES,
  startRiddleCooldown,
} from "../constants/missions.js";
import { matchCharacterGuess, pickRandom } from "../constants/publicEncounters.js";
import { getCharacterById, getFullName } from "../constants/characters.js";
import {
  completeMission,
  getAcceptedMission,
  recordMissionCompletion,
  trackCommandUsage,
  trackUserActivity,
} from "../db/supabase.js";
import { ephemeral, missionTypeGuard, reportFailures, userIdOf } from "./shared.js";

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
    return {
      reply: ephemeral(pickRandom(RIDDLE_WRONG_LINES)),
      afterReply: null,
    };
  }

  let solved;
  try {
    solved = await completeMission(mission.id, userId, MISSION_TYPES.RIDDLE);
  } catch (err) {
    console.error("[missions] complete_mission failed:", err.message);
    return {
      reply: ephemeral("Something went wrong there. Try again?"),
      afterReply: null,
    };
  }

  if (!solved) {
    return { reply: ephemeral("That mission just closed."), afterReply: null };
  }

  const character = getCharacterById(riddle.answer);
  const name = character ? getFullName(character) : riddle.answer;

  return {
    reply: ephemeral(`Debunked. **${name}**.\n${BANKED_RESET_LINE}`),
    afterReply: async () => {
      clearRiddleCooldowns(mission.id);
      await Promise.allSettled([
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
