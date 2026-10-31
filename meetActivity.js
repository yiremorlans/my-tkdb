// /meet as the Activity (docs/hangout-activity.md §11): the server side of a
// /meet pick that opens the Hangout Activity instead of composing an image.
//
//   handleMeetPickLaunch  the meet:pick click: cooldown, one encounter per
//                         picker, the draw, the launch (app.js)
//   loadMeetEncounter     what GET /api/activity/encounter shows
//   answerMeetEncounter   POST /api/activity/answer, the one payout
//   the fallback          today's image, ~30s after a launch the Activity
//                         never loaded (runMeetFallback)
//
// The routes themselves, and the session that names the user, are in
// activityRoutes.js. Everything that decides the payout (mood flag, beat key)
// is saved in meet_encounters (migration 035) and never comes back from the
// client: the Activity is a page the user can edit.
//
// Deliberately not here: which users get the Activity at all (the off switch,
// maintenance.js isMeetActivityOff, and the owner gate, activityRoutes.js
// activityOpenTo). app.js decides that before calling in.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { InteractionResponseType } from 'discord-interactions';
import { EPHEMERAL, IS_TEST } from './utils.js';
import { backgroundPath, timeBucket } from './constants/backgrounds.js';
import { getCharacterById } from './constants/characters.js';
import { RESPONSE_TYPE_ORDER } from './constants/responseTypes.js';
import {
  answerResponse,
  buildMeetEncounterMessage,
  disableComponents,
  drawMeetEncounter,
  WANDERED_OFF,
} from './encounters.js';
import { deliverBondScene } from './bondScenes.js';
import { checkCommandLimit, claimCommandUse, releaseCommandInvoke } from './commandLimits.js';
import { editInteractionMessage, launchActivityWithResponse } from './discordRest.js';
import {
  deleteMeetEncounter,
  getMeetEncounter,
  getUserMeetEncounters,
  markMeetEncounterLoaded,
  meetPickerUsed,
  saveMeetEncounter,
  trackCharacterEngagement,
  trackCommandUsage,
  trackUserActivity,
} from './db/supabase.js';
import { ephemeralResponse, reportFailures } from './missions/shared.js';

const LIVE2D_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), 'assets', 'live2d');

export const ALREADY_PICKED = 'You already picked someone from this list. Use /meet again for someone new.';

// --- outfit (§11.5) ---------------------------------------------------------

const rigOutfits = new Map(); // character id → { outfits, defaultOutfit } | null

function readRigOutfits(characterId) {
  if (!rigOutfits.has(characterId)) {
    try {
      const rig = JSON.parse(fs.readFileSync(path.join(LIVE2D_DIR, characterId, 'rig.json'), 'utf8'));
      rigOutfits.set(characterId, { outfits: rig.outfits ?? {}, defaultOutfit: rig.defaultOutfit });
    } catch (err) {
      console.error(`[meetActivity] No Live2D rig for ${characterId}: ${err.message}`);
      rigOutfits.set(characterId, null);
    }
  }
  return rigOutfits.get(characterId);
}

/**
 * What `characterId` wears for a rolled variant: an outfit whose rig.json
 * `dialogueVariant` matches (one at random if several do), else the rig's
 * `defaultOutfit`, and then the variant becomes that outfit's, so the
 * dialogue matches what's worn. No rig keeps the roll with no outfit.
 */
export function dressForVariant(characterId, rolled, random = Math.random) {
  const rig = readRigOutfits(characterId);
  if (!rig) return { variant: rolled, outfit: null };
  const matching = Object.keys(rig.outfits).filter((name) => rig.outfits[name].dialogueVariant === rolled);
  if (matching.length) return { variant: rolled, outfit: matching[Math.floor(random() * matching.length)] };
  const outfit = rig.outfits[rig.defaultOutfit] ? rig.defaultOutfit : Object.keys(rig.outfits)[0] ?? null;
  return { variant: rig.outfits[outfit]?.dialogueVariant ?? rolled, outfit };
}

// --- the picker's token ----------------------------------------------------

// The picker is /meet's own ephemeral reply, and Discord lets only the token
// that sent an ephemeral message edit it: the pick's token 404s (10008) at
// `@original` and at the picker's id alike. So whatever sends a picker hands
// its token over here, keyed by the picker's id, for the grey-out. No result
// goes onto the picker: the Activity already shows it. In memory, for a
// token's 15 minutes: a miss (a restart, another instance) only skips the
// edit, and handleMeetPickLaunch's picker check holds the line.
const PICKER_TOKEN_MS = 15 * 60 * 1000;
const pickerTokens = new Map(); // picker message id → { token, expires }

export function rememberPickerToken(pickerMessageId, token, now = Date.now()) {
  if (!pickerMessageId) return;
  for (const [id, entry] of pickerTokens) if (entry.expires <= now) pickerTokens.delete(id);
  pickerTokens.set(pickerMessageId, { token, expires: now + PICKER_TOKEN_MS });
}

function editPicker(pickerMessageId, body) {
  const entry = pickerMessageId ? pickerTokens.get(pickerMessageId) : null;
  if (!entry || entry.expires <= Date.now()) {
    return Promise.reject(new Error('no live token for the /meet message (restart, or past 15 minutes)'));
  }
  return editInteractionMessage(entry.token, '@original', body);
}

// --- the click (§11.1) ------------------------------------------------------

// A saved row back in drawMeetEncounter's shape, for the image fallback.
function encounterFromRow(row) {
  return {
    characterId: row.character_id,
    backgroundFile: row.background_file,
    variant: row.variant,
    intro: row.intro,
    notice: row.notice,
    line: row.line,
    responses: row.responses,
    mood: row.mood,
    beatKey: row.beat_key,
  };
}

const update = (content, components) => ({
  type: InteractionResponseType.UPDATE_MESSAGE,
  data: { content, components: disableComponents(components), flags: EPHEMERAL },
});

/**
 * The meet:pick click, when the Activity is open to this user. Returns one of:
 *
 * - `{ response }`: an ordinary interaction response for app.js to send (the
 *   cooldown text with the picker greyed out, "already picked", an unknown
 *   character). Nothing launched, nothing saved.
 * - `{ launched: true, afterLaunch }`: the Activity is launching (answered
 *   through the callback endpoint, so app.js only ends the HTTP request).
 *   afterLaunch saves the encounter, greys out the picker and starts the
 *   fallback timer; it never throws.
 * - `{ imageFlow: true }`: Discord refused the launch, so the interaction is
 *   still unanswered and app.js gives today's image flow instead.
 *
 * Everything before the launch has to fit in Discord's 3s (a launch can't
 * follow a deferred ack), which is why the reads run together. A throw from
 * here means nothing was launched.
 */
export async function handleMeetPickLaunch(body, userId, characterId, { sendFollowup }, now = new Date()) {
  const shown = body.message?.components;
  if (!getCharacterById(characterId)) return { response: update(WANDERED_OFF, shown) };

  const pickerMessageId = body.message?.id ?? null;
  // Independent: the cooldown, whether this picker already launched, and the
  // draw (its own relationship and recent-beat reads).
  const [limit, picked, encounter] = await Promise.all([
    checkCommandLimit(userId, 'meet', now),
    pickerMessageId ? meetPickerUsed(pickerMessageId) : false,
    drawMeetEncounter(userId, characterId, now, (variant) => dressForVariant(characterId, variant)),
  ]);

  // Nobody on /meet cooldown gets into the Activity: an older picker clicked
  // after an answer shows the cooldown text, buttons greyed, as an older
  // response button does. No encounter, so nothing left to reroll: the
  // invoke slot goes back, as at /meet itself.
  if (!limit.allowed) {
    releaseCommandInvoke(userId, 'meet');
    return { response: update(limit.reason, shown) };
  }
  // One encounter per /meet message, even if Discord wouldn't let the bot
  // grey the picker out after an earlier launch.
  if (picked) return { response: ephemeralResponse(ALREADY_PICKED) };

  let instanceId;
  try {
    instanceId = await launchActivityWithResponse(body.id, body.token);
  } catch (err) {
    console.error(`[meetActivity] Launch refused for ${userId}: ${err.message}`);
    return { imageFlow: true };
  }

  return {
    launched: true,
    afterLaunch: () => saveLaunchedEncounter({ body, userId, encounter, instanceId, pickerMessageId, sendFollowup }),
  };
}

async function saveLaunchedEncounter({ body, userId, encounter, instanceId, pickerMessageId, sendFollowup }) {
  // A launch answer can't update the picker, so it's greyed out with an edit,
  // through the token that sent it (rememberPickerToken).
  const greyOut = editPicker(pickerMessageId, {
    components: disableComponents(body.message?.components),
  }).catch((err) => console.warn(`[meetActivity] Could not grey out the picker for ${userId}: ${err.message}`));

  let row;
  try {
    row = await saveMeetEncounter({
      discord_user_id: userId,
      character_id: encounter.characterId,
      picker_message_id: pickerMessageId,
      instance_id: instanceId,
      interaction_token: body.token,
      background_file: encounter.backgroundFile,
      outfit: encounter.outfit,
      variant: encounter.variant,
      tier: encounter.tier,
      intro: encounter.intro,
      notice: encounter.notice,
      line: encounter.line,
      responses: encounter.responses,
      mood: encounter.mood,
      beat_key: encounter.beatKey,
    });
  } catch (err) {
    // The Activity opened with nothing to load, so it shows its refusal;
    // the image goes out now rather than in 30s.
    console.error(`[meetActivity] Could not save the encounter for ${userId}: ${err.message}`);
    await greyOut;
    await postFallback(body.token, encounter, sendFollowup, userId);
    return;
  }

  await greyOut;
  scheduleMeetFallback(row.id, body.token, sendFollowup);
}

// --- fallback (§11.7) -------------------------------------------------------

export const MEET_FALLBACK_MS = 30 * 1000;
let fallbackMs = MEET_FALLBACK_MS;

// No handle is kept to cancel it: the row's loaded_at, read when it fires,
// is what calls it off, and that also holds when the Activity loaded the
// encounter through another server instance.
function scheduleMeetFallback(encounterId, token, sendFollowup) {
  setTimeout(() => runMeetFallback(encounterId, token, sendFollowup), fallbackMs).unref?.();
}

async function postFallback(token, encounter, sendFollowup, userId) {
  try {
    // A composed PNG: the same 45s room as /meet's own image followup.
    await sendFollowup(token, await buildMeetEncounterMessage(encounter, 'fallback'), 45000);
  } catch (err) {
    console.error(`[meetActivity] Image fallback failed for ${userId}: ${err.message}`);
  }
}

/**
 * Discord tells the bot nothing when a launch fails, so if the Activity
 * hasn't loaded the encounter by now, post today's /meet result (image and
 * four buttons, origin 'fallback') on the click's token. It's answered the
 * normal way; if the Activity loads it later and both are answered, only the
 * first pays (the same cooldown claim). Never throws.
 */
async function runMeetFallback(encounterId, token, sendFollowup) {
  let row;
  try {
    row = await getMeetEncounter(encounterId);
  } catch (err) {
    console.error(`[meetActivity] Fallback check failed for encounter ${encounterId}: ${err.message}`);
    return;
  }
  // Loaded (the Activity works) or already answered: nothing to do.
  if (!row || row.loaded_at) return;
  await postFallback(token, encounterFromRow(row), sendFollowup, row.discord_user_id);
}

/** Test hook: the fallback delay (MEET_FALLBACK_MS when called with nothing). */
export function setMeetFallbackDelay(ms = MEET_FALLBACK_MS) {
  fallbackMs = ms;
}

// --- the Activity's side (§11.2, §11.3) ------------------------------------

/**
 * The encounter the Activity shows `userId` in `instanceId`, or null when
 * they have none of their own there (someone else's instance) or are on
 * /meet cooldown (an older picker's encounter after another was answered):
 * the Activity then shows its refusal, with no scene. A launch
 * whose instance id Discord didn't return matches the user's newest
 * encounter without one. Loading it stamps loaded_at, which cancels the
 * image fallback for good.
 */
export async function loadMeetEncounter(userId, instanceId, now = new Date()) {
  // Independent reads. The cooldown read fails open (checkCommandLimit), so
  // a blip shows the scene and the answer's claim still gates the payout.
  const [rows, limit] = await Promise.all([getUserMeetEncounters(userId), checkCommandLimit(userId, 'meet', now)]);
  if (!limit.allowed) return null;
  const row =
    (instanceId && rows.find((r) => r.instance_id === instanceId)) ||
    rows.find((r) => r.instance_id == null);
  if (!row) return null;

  if (!row.loaded_at) await markMeetEncounterLoaded(row.id, now);

  const character = getCharacterById(row.character_id);
  return {
    id: row.id,
    character: row.character_id,
    name: character?.firstName ?? row.character_id,
    outfit: row.outfit,
    tier: row.tier,
    background: row.background_file ? `/assets/bg/${backgroundPath(row.background_file)}` : null,
    // Judged at the spawn, like the line drawn then: Towa's touch lines stay
    // wordless by day (activity/src/hangout/lines.js).
    daytime: timeBucket(new Date(row.created_at)) === 'day',
    intro: row.intro,
    notice: row.notice,
    line: row.line,
    responses: row.responses,
  };
}

/**
 * Answers one encounter: `{ status, body, afterReply }` for the route.
 *
 * The cooldown claim (claimCommandUse) is the gate, exactly as for a
 * response button: whichever of a user's open encounters is answered first
 * pays, any other gets the cooldown text (409). The mood flag and beat key
 * come only from the saved row. Answering deletes the row, so a replay, a
 * second tab or a double click finds nothing (404). A claim that errored
 * keeps the row, so the player can try again.
 */
export async function answerMeetEncounter(userId, encounterId, responseType, now = new Date()) {
  if (!RESPONSE_TYPE_ORDER.includes(responseType)) return { status: 400, body: { error: 'bad_response' } };
  if (!['string', 'number'].includes(typeof encounterId)) return { status: 400, body: { error: 'bad_encounter' } };

  const row = await getMeetEncounter(encounterId);
  if (!row || row.discord_user_id !== userId) return { status: 404, body: { error: 'no_encounter' } };

  const limit = await claimCommandUse(userId, 'meet', now);
  if (limit.failed) return { status: 503, body: { error: 'try_again' } };

  const spend = () => deleteMeetEncounter(row.id)
    .catch((err) => console.error(`[meetActivity] Could not delete answered encounter ${row.id}: ${err.message}`));
  if (!limit.allowed) {
    await spend();
    return { status: 409, body: { error: 'cooldown', reason: limit.reason } };
  }

  let result;
  try {
    result = await answerResponse(userId, row.character_id, responseType, { mood: row.mood, beatKey: row.beat_key });
  } finally {
    await spend();
    // A genuine commit ends the rerolling session the invoke throttle was
    // escalating against, as the response button's does (app.js 'resp').
    releaseCommandInvoke(userId, 'meet');
  }
  if (!result) return { status: 404, body: { error: 'no_encounter' } };

  return {
    status: 200,
    body: {
      gain: result.baseGain,
      reaction: result.reaction,
      delta: result.deltaLine,
      signature: result.signatureLine,
    },
    afterReply: async () => {
      if (result.levelUp && !IS_TEST) {
        deliverBondScene(userId, result.levelUp.characterId, result.levelUp.levelName)
          .catch((err) => console.error(`[meetActivity] Bond scene for ${userId} failed: ${err.message}`));
      }
      await Promise.allSettled([
        trackUserActivity(userId),
        trackCommandUsage(userId, 'meet', { path: 'activity' }),
        trackCharacterEngagement(userId, row.character_id),
      ]).then(reportFailures('meet answer', '[meetActivity]'));
    },
  };
}
