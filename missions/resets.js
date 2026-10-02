// Scheduled missions: banked cooldown resets, the reward a cleared mission
// pays out, offered on a /roam or /meet cooldown reply and spent from there.
// See player.js for the module map.

import { ButtonStyleTypes, MessageComponentTypes } from "discord-interactions";
import { EPHEMERAL } from "../utils.js";
import {
  RESET_BUTTON_LABEL,
  RESET_SPENT_LINES,
  resetOfferLine,
} from "../constants/missions.js";
import { redeemCooldownReset, releaseCommandInvoke } from "../commandLimits.js";
import { countCooldownResets } from "../db/supabase.js";
import { ephemeralResponse, userIdOf } from "./shared.js";

/**
 * The "you're still on cooldown" reply for /roam or /meet, with the offer to
 * spend a banked mission reward attached if the player holds one.
 *
 * This is the ONLY place the reward is ever surfaced as an action, and that is
 * deliberate: it appears exactly when it is worth something and nowhere else,
 * so it can't be spent on a clock that was about to run out anyway. A player
 * with nothing banked sees precisely the message they saw before missions
 * existed.
 *
 * The credit read only happens on a path that was already turning the user
 * away, so a normal /roam pays nothing for it. A failed read drops the offer
 * rather than the message — being told to wait is still the correct answer.
 */
export async function cooldownReplyWithReset(userId, command, reason) {
  let held = 0;
  try {
    held = await countCooldownResets(userId);
  } catch (err) {
    console.error(
      "[missions] Could not count banked cooldown resets:",
      err.message,
    );
  }

  if (held === 0) return { content: reason, flags: EPHEMERAL };

  return {
    content: `${reason}\n${resetOfferLine(held)}`,
    components: [
      {
        type: MessageComponentTypes.ACTION_ROW,
        components: [
          {
            type: MessageComponentTypes.BUTTON,
            style: ButtonStyleTypes.SUCCESS,
            label: RESET_BUTTON_LABEL,
            custom_id: `mission:reset:${command}`,
          },
        ],
      },
    ],
    flags: EPHEMERAL,
  };
}

/**
 * `mission:reset:<roam|meet>` — spend one banked reset.
 *
 * Returns `{ outcome, refusal }`. `outcome` is 'roam' | 'meet' | 'both' when a
 * credit was actually spent; anything else is a refusal, and `refusal` carries
 * the interaction response to send. app.js takes it from there, because what
 * happens on success is to drop the caller straight into /roam or /meet, and
 * those builders live in encounters.js.
 *
 * Every guard is inside the RPC (db/migrations/016), so a stale button on an
 * ephemeral from hours ago is safe to click: it either finds the clock already
 * clear and keeps the credit, or finds nothing banked and says so.
 */
export async function handleCooldownReset(body, command) {
  const userId = userIdOf(body);
  const outcome = await redeemCooldownReset(userId, command);

  if (outcome === "not_needed") {
    return {
      outcome,
      refusal: ephemeralResponse(
        `\`/${command}\` is ready now — no need to spend anything. Your reset is still banked.`,
      ),
    };
  }
  if (outcome === "none") {
    return {
      outcome,
      refusal: ephemeralResponse(
        "You have no cooldown resets banked. Finish a mission to earn one.",
      ),
    };
  }
  if (!RESET_SPENT_LINES[outcome]) {
    return {
      outcome,
      refusal: ephemeralResponse(
        "Something went wrong spending that. Try again?",
      ),
    };
  }

  // The database cooldown is only half of what stands between the player and
  // the command. The other half is the in-memory flood throttle, and they are
  // certainly inside it: the stamp was written by the very `/roam` or `/meet`
  // that turned them away and offered this button seconds ago.
  //
  // Left alone it would refuse them the reward they just paid for — visibly so
  // on the path where the prompt fails to render and the followup tells them to
  // run the command again. Dropping the stamp is safe by that function's own
  // reasoning: it only ever shortens the seconds-scale debounce, never the 3h
  // reward cooldown, so it cannot buy a second reward. And it is bounded by
  // something real — a reset has to be earned, and spending one is what got us
  // here.
  //
  // A 'both' reset frees the command they didn't ask about too, so its throttle
  // goes as well. Someone blocked on /roam has usually just tried /meet.
  for (const cleared of outcome === "both" ? ["roam", "meet"] : [outcome]) {
    releaseCommandInvoke(userId, cleared);
  }

  return { outcome, refusal: null };
}
