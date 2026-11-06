import { DIALOGUE_POOL } from "./dialoguePools.js";
import { MEET_DIALOGUE } from "./meet/index.js";
import { ROAM_DIALOGUE } from "./roam/index.js";

export {
  DIALOGUE,
  SHARED_ENCOUNTER_TEASERS,
  SHARED_MISSED_LINES,
  SHARED_WRONG_GUESS_LINES,
  SHARED_WINNER_LINES,
} from "./dialogue/index.js";
export { MEET_DIALOGUE, ROAM_DIALOGUE };

// Every interaction-specific pool, keyed by DIALOGUE_POOL
// (constants/dialoguePools.js): { [pool]: { [characterId]: { [tier]: beats } } }.
export const POOL_DIALOGUE = {
  [DIALOGUE_POOL.MEET]: MEET_DIALOGUE,
  [DIALOGUE_POOL.ROAM]: ROAM_DIALOGUE,
};
