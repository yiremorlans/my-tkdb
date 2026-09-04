// Bond scenes — the level-up DMs. See docs/bond-scene-dms.md.
//
// When a relationship crosses into a new level, the bot opens a DM with the
// user and plays a short scene in that character's voice: a handful of prose
// beats, one message per Continue click, ending on a choice that leaves a
// keepsake behind. One scene per (character, level), ever.
//
// Two properties shape everything in this file.
//
// It never expires. Every beat after the first is posted with the bot token
// into a DM channel id stored on the scene's row — never through an interaction
// webhook — so a Continue button keeps working for as long as the message
// exists. A user can answer beat 1 tonight and beat 2 next month. A row sitting
// at `in_progress` is not a stuck job; it is somebody who hasn't clicked yet.
//
// It never blocks play. Delivery is fired and forgotten from the /roam and
// /meet response handlers and every failure inside it is soft: a beat that
// cannot be delivered — no shared guild with the bot, DMs closed, a Discord
// outage — parks the row as `pending_dm`, and the user's next command offers a
// one-press button to put it back in their DMs. Nothing here may ever surface
// as an error on an encounter.
//
// What it must not do is move affinity. /roam and /meet are the only things
// that do; a scene is the reward for the climb, not another rung of it.
import {
  getCharacterById,
  getFullName,
  RESPONSE_TYPES,
} from './constants/characters.js';
import { DIALOGUE } from './constants/dialogue.js';
import {
  bondLevelFromSlug,
  bondLevelIndex,
  bondLevelSlug,
  bondSceneKey,
  FAV_RESPONSE_PHRASE,
} from './constants/game.js';
import { fillTemplate, getMilestone, matchCharacterGuess } from './constants/publicEncounters.js';
import { openDmChannel, postChannelMessage, postChannelTyping } from './discordRest.js';
import {
  advanceBondScene,
  completeBondScene,
  getBondDmPref,
  getBondKeepsakes,
  getBondSceneRow,
  getLatestEncounterMilestone,
  getRelationship,
  listBondScenes,
  listResumableBondScenes,
  recordBondScene,
  setBondDmPref,
} from './db/supabase.js';

const EPHEMERAL_FLAG = 64;

// The statuses that still owe the user something, and therefore hold a
// character's slot. `queued` is included because a claim that never started is
// still a level the user has not read; the two `skipped_*` states and
// `complete` are done with and hold nothing.
const UNFINISHED = new Set(['queued', 'in_progress', 'pending_dm']);

// Discord component type ids, spelled out rather than imported: this module is
// exercised in tests without discord-interactions' enums and the two numbers
// have never changed.
const ACTION_ROW = 1;
const BUTTON = 2;

// --- content -----------------------------------------------------------------

/**
 * The scene for a (character, level), or null if this character has none.
 *
 * Every scene is authored in one character's voice — there is no house-style
 * fallback, because a scene is one continuous exchange and half of it in their
 * voice and half in someone else's would read worse than either. A missing
 * level is a build error (constants/validateContent.js), so null here means the
 * character has left the roster rather than that content is pending.
 */
export function getBondScene(characterId, levelName) {
  const key = bondSceneKey(levelName);
  if (!key) return null;
  // Resolved through getCharacterById so an alias ("sho") finds the same scene
  // as the canonical id.
  //
  // There is no house-style fallback pool. Every scene is one character's own
  // words at one level, and validateContent makes a missing one a build error,
  // so a null here means the id is not on the roster at all — and delivering
  // somebody else's private message under their name would be worse than
  // delivering nothing. deliverBondScene closes that row as `skipped_gone`.
  //
  // The cost of that choice: a character added to the roster before their
  // scenes are written cannot deliver any, and because a claimed row is never
  // re-claimed, the levels crossed in the meantime are gone for good. Write the
  // six scenes in the same change that adds the character — the build will
  // stop you either way.
  const id = getCharacterById(characterId)?.id || characterId;
  return DIALOGUE[id]?.bondScenes?.[key] || null;
}

// How long since the last interaction, as a noun phrase — the sentence around
// it supplies the verb ("It's been {since}"). Deliberately coarse: the point is
// to greet a returning player differently from a daily one, not to report an
// interval back at them.
function humaniseSince(lastInteractionAt, now = new Date()) {
  if (!lastInteractionAt) return 'a while';
  const elapsed = now.getTime() - new Date(lastInteractionAt).getTime();
  if (!Number.isFinite(elapsed) || elapsed < 0) return 'a while';

  const days = elapsed / 86_400_000;
  if (days < 1) return 'no time at all';
  if (days < 2) return 'a day';
  if (days < 7) return 'a few days';
  if (days < 30) return 'a few weeks';
  if (days < 365) return 'a few months';
  return 'the better part of a year';
}

// The response type this character pays 2 for — the one the player has been
// leaning on if they've been getting anywhere.
function favouredResponsePhrase(character) {
  const scores = character.affinityByResponse || {};
  const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0];
  return FAV_RESPONSE_PHRASE[best] || FAV_RESPONSE_PHRASE[RESPONSE_TYPES.KIND];
}

/**
 * The BOND_SCENE_PLACEHOLDERS values for one delivery. Every read here is
 * best-effort: a scene that can't name how many times you've met is still worth
 * sending, so a failed lookup degrades to a plain phrase rather than aborting.
 */
async function resolveSceneVars(userId, character, now = new Date()) {
  const vars = {
    firstName: character.firstName,
    house: character.house || 'Darkwick',
    timesMet: '0',
    favResponse: favouredResponsePhrase(character),
    // Read after "picking up from" or similar, so it has to be a noun phrase
    // even when there is no milestone to name.
    lastMoment: 'the last time',
    since: 'a while',
  };

  try {
    const relationship = await getRelationship(userId, character.id);
    if (relationship) {
      vars.timesMet = String(relationship.times_met || 0);
      vars.since = humaniseSince(relationship.last_interaction_at, now);
    }
  } catch (err) {
    console.error('Error reading relationship for bond scene vars:', err);
  }

  try {
    const latest = await getLatestEncounterMilestone(userId, character.id);
    const milestone = latest && getMilestone(latest.milestone_type);
    if (milestone) {
      vars.lastMoment = fillTemplate(milestone.hint, {
        name: getFullName(character),
        firstName: character.firstName,
        house: vars.house,
      });
    }
  } catch (err) {
    console.error('Error reading milestone for bond scene vars:', err);
  }

  return vars;
}

// --- rendering ---------------------------------------------------------------

// `kind` picks the custom_id namespace: 'next'/'choice' advance a live scene
// and are checked against bond_scene_progress.current_beat; 'rnext'/'rchoice'
// (§4.6) advance a replay and touch nothing in the database at all. Same
// buttons, same labels, different wiring underneath.
function continueButton(characterId, levelName, nextBeat, kind = 'next') {
  return {
    type: ACTION_ROW,
    components: [
      {
        type: BUTTON,
        style: 2, // SECONDARY — the scene is the message; the button is a page turn
        label: 'Continue',
        custom_id: `bond:${kind}:${characterId}:${bondLevelSlug(levelName)}:${nextBeat}`,
      },
    ],
  };
}

function choiceRow(characterId, levelName, choice, kind = 'choice') {
  return {
    type: ACTION_ROW,
    components: choice.options.map((option) => ({
      type: BUTTON,
      style: option.style || 2,
      label: option.label,
      custom_id: `bond:${kind}:${characterId}:${bondLevelSlug(levelName)}:${option.key}`,
    })),
  };
}

// The etiquette button on the very first bond DM a user ever receives (§4.9).
// It rides the same row as nothing else, is DANGER-styled, and is offered once —
// after that the switch lives at /bonds dms:off.
//
// The label names the scope on purpose. The button does not mean "not this
// message" or "not this character": it silences every character at once, which
// is not what "don't message me like this" sounds like next to one person's
// scene. The rest of the warning is on the beat itself (renderBeat) because 30
// chars cannot also hold "and what you miss will not come back".
function optOutRow(characterId, levelName) {
  return {
    type: ACTION_ROW,
    components: [
      {
        type: BUTTON,
        style: 4, // DANGER
        label: 'Turn off all bond messages',
        custom_id: `bond:optout:${characterId}:${bondLevelSlug(levelName)}:x`,
      },
    ],
  };
}

/**
 * One beat as a Discord message body: the filled prose, plus whatever the
 * reader needs to get to the next one.
 *
 * The closing beat carries the choice prompt appended to its own text — one
 * message, so the question and the buttons that answer it are never separated
 * by a scroll.
 *
 * `replay: true` renders the identical beat with `rnext`/`rchoice` buttons
 * instead of `next`/`choice` (§4.6) — everything else about it, including the
 * pacing and the choice prompt, is the same as the original delivery.
 * `firstEver` is meaningless for a replay and is never passed for one: nobody
 * needs the "sent you a message" frame or the opt-out button on a scene they
 * have already read once.
 */
export function renderBeat(scene, index, vars, { characterId, levelName, firstEver = false, replay = false } = {}) {
  const isLast = index === scene.beats.length - 1;
  const parts = [fillTemplate(scene.beats[index], vars)];

  // A frame line on a user's very first bond DM, so an unheralded message from
  // a bot reads as the game rather than as a stranger.
  if (index === 0 && firstEver) {
    parts.unshift(`*${vars.firstName} sent you a message.*`);
  }
  if (isLast && scene.choice?.prompt) {
    parts.push(fillTemplate(scene.choice.prompt, vars));
  }
  // The two things the button does that its label cannot fit, said while the
  // choice is still open rather than in the confirmation that follows it: the
  // switch is global, and the scenes it costs are not recoverable.
  if (index === 0 && firstEver) {
    parts.push(
      '*The button below turns these off for every character, not just '
      + `${vars.firstName}. Anything you miss while they are off is not sent to `
      + 'you later. You can turn them back on with* `/bonds dms:on`*.*',
    );
  }

  const components = [
    isLast
      ? choiceRow(characterId, levelName, scene.choice, replay ? 'rchoice' : 'choice')
      : continueButton(characterId, levelName, index + 1, replay ? 'rnext' : 'next'),
  ];
  if (index === 0 && firstEver) components.push(optOutRow(characterId, levelName));

  return { content: parts.join('\n\n'), components };
}

// The last message of a scene: the character's authored answer to the pick,
// with the keepsake named underneath it. Showing the keepsake here is the whole
// point of granting one — /bonds is where you go back to it, not where you find
// out it exists.
//
// It also carries the one button that gets a player into the replay gallery
// without typing /bonds character:<name> — see replayStartRow below.
function renderClosing(option, keepsake, vars, { characterId, levelName }) {
  const close = fillTemplate(option.close, vars);
  const line = fillTemplate(keepsake.line, vars);
  return {
    content: `${close}\n\n${keepsake.emoji} *${line}*`,
    components: [replayStartRow(characterId, levelName)],
  };
}

// Starts a replay of the scene just finished (§4.6): the same beats, the same
// Continue and choice buttons, posted for real into the DM by
// handleBondReplayClick — nothing about it is a preview. The button itself is
// left untouched on ACK (app.js: DEFERRED_UPDATE_MESSAGE) rather than
// stripped, so it can be clicked again for another replay whenever.
function replayStartRow(characterId, levelName) {
  return {
    type: ACTION_ROW,
    components: [
      {
        type: BUTTON,
        style: 2,
        label: '🔁 Replay this scene',
        custom_id: `bond:replaystart:${characterId}:${bondLevelSlug(levelName)}:x`,
      },
    ],
  };
}

// --- delivery ----------------------------------------------------------------

/**
 * Start the scene for a level the user has just crossed into.
 *
 * Fired and never awaited from the response handler, so it owns its own errors
 * completely: nothing it throws may reach the interaction reply. The order of
 * the first two steps is the important part — the row is claimed *before* any
 * Discord call, so a crash anywhere later can only ever fail to send a scene,
 * never send one twice.
 *
 * `alreadyClaimed` is the release path: a queued scene whose row exists and
 * whose turn has come (see releaseQueuedBondScene).
 */
export async function deliverBondScene(userId, characterId, levelName, { alreadyClaimed = false } = {}) {
  const character = getCharacterById(characterId);
  if (!character) return { delivered: false, reason: 'unknown-character' };
  if (!bondLevelSlug(levelName)) return { delivered: false, reason: 'no-scene-at-level' };

  // 1. Claim. Nothing back means this level's scene already exists in some
  //    state — a replayed interaction, a re-earned level, a double-processed
  //    click. Stop, silently: this is the ordinary way a duplicate ends.
  if (!alreadyClaimed) {
    const claimed = await recordBondScene(userId, character.id, levelName);
    if (!claimed) return { delivered: false, reason: 'already-claimed' };
  }

  // 2. Opt-out. Checked after the claim so a user who turns DMs back on later
  //    doesn't get the whole backlog at once — the levels they crossed while
  //    opted out stay closed, which is what "don't message me like this" meant.
  const pref = await getBondDmPref(userId);
  if (!pref.enabled) {
    await advanceBondScene(userId, character.id, levelName, { status: 'skipped_optout' });
    return { delivered: false, reason: 'opted-out' };
  }

  // 3. Queue. One scene per character at a time: a newer level waits behind any
  //    lower one still open, so the conversation stays in order. Different
  //    characters never block each other — they're different conversations.
  const siblings = await listBondScenes(userId, character.id);
  const earlier = siblings
    .filter(
      (row) =>
        row.level_name !== levelName &&
        UNFINISHED.has(row.status) &&
        bondLevelIndex(row.level_name) < bondLevelIndex(levelName),
    )
    .sort((a, b) => bondLevelIndex(a.level_name) - bondLevelIndex(b.level_name));

  if (earlier.length > 0) {
    // `pending_dm` blocks exactly as hard as `in_progress`. A scene is written
    // assuming every scene below it has been read — Devoted opens on a history
    // Acquaintance established — so a level the user has not got to yet holds
    // the ladder whether it is waiting on a click or on a delivery that failed.
    // Without this, a user the bot cannot DM accumulates one owed row per level
    // and is offered the highest first, which reads the relationship backwards.
    const holding = earlier.find((row) => row.status !== 'queued');
    if (holding) return { delivered: false, reason: 'queued-behind', behind: holding.level_name };

    // Everything in the way is `queued`: nothing is running and nothing is owed,
    // so these are claims that never started — a database blip anywhere between
    // step 1 and step 8 leaves exactly that, and nothing else would pick them
    // up. Start the lowest, which keeps the ladder in order; this level is
    // released in turn when that one completes.
    const stranded = earlier[0];
    await deliverBondScene(userId, character.id, stranded.level_name, { alreadyClaimed: true });
    return { delivered: false, reason: 'queued-behind', behind: stranded.level_name };
  }

  // 4. Content. Every roster character owes a scene at every level and the
  //    build enforces it, so nothing resolves here unless the character has
  //    left the roster — that row is closed rather than retried forever.
  const scene = getBondScene(character.id, levelName);
  if (!scene?.beats?.length) {
    await advanceBondScene(userId, character.id, levelName, { status: 'skipped_gone' });
    return { delivered: false, reason: 'no-content' };
  }

  // 5. Render beat 0. `firstEver` is true when this claim is the only bond scene
  //    row the user has *anywhere* — the etiquette frame and the opt-out button
  //    are offered once per person, not once per character, so this counts every
  //    row rather than reusing the per-character `siblings` read above.
  const vars = await resolveSceneVars(userId, character);
  const allRows = await listBondScenes(userId);
  const firstEver = allRows.filter((row) => row.level_name !== levelName
    || row.character_id !== character.id).length === 0;
  const beat = renderBeat(scene, 0, vars, { characterId: character.id, levelName, firstEver });

  // 6. Open the DM. A 403 here is "this user shares no server with the bot",
  //    which is expected rather than broken: the row waits as `pending_dm` and
  //    the next /roam, /meet or /affinity offers the resume button (§2.4).
  //    Logged at info rather than error for the same reason — it is a state the
  //    feature is designed around, not a fault to chase.
  let dmChannelId;
  try {
    dmChannelId = await openDmChannel(userId);
  } catch (err) {
    console.log(`[bond] cannot DM ${userId} (${err.message}); parked as pending_dm`);
    await advanceBondScene(userId, character.id, levelName, { status: 'pending_dm' });
    return { delivered: false, reason: 'pending-dm' };
  }

  // 7. Post beat 0 into the DM, and store the channel it went into — every
  //    later beat is posted there with the bot token, which is what makes the
  //    sequence outlive any interaction.
  try {
    // postChannelMessage is shared with the public-encounter scheduler, which
    // posts to guild channels; `dmChannelId` is a private bot<->user DM channel
    // (openDmChannel), so nothing here is ever visible to another player.
    postChannelTyping(dmChannelId).catch(() => {});
    await postChannelMessage(dmChannelId, beat);
  } catch (err) {
    console.error('Error posting first bond scene beat:', err);
    await advanceBondScene(userId, character.id, levelName, { status: 'pending_dm' });
    return { delivered: false, reason: 'post-failed' };
  }

  // 8. The rest is driven by clicks, with no deadline between them.
  await advanceBondScene(userId, character.id, levelName, {
    status: 'in_progress',
    dm_channel_id: dmChannelId,
    current_beat: 0,
  });

  return { delivered: true, dmChannelId };
}

/**
 * Start the oldest queued scene for a character, if one has been waiting. Called
 * when a scene completes, which is the only thing that can free the slot.
 *
 * Lowest level first: the levels were crossed in order and the scenes read in
 * order, so a user who climbed two levels during one unfinished scene gets the
 * nearer one next.
 */
export async function releaseQueuedBondScene(userId, characterId) {
  const rows = await listBondScenes(userId, characterId);
  // Same rule as the queue check: an owed level holds the slot just as a live
  // one does, so a scene whose delivery failed is never overtaken by the level
  // above it.
  const stillOpen = rows.some(
    (row) => row.status === 'in_progress' || row.status === 'pending_dm',
  );
  if (stillOpen) return null;

  const next = rows
    .filter((row) => row.status === 'queued')
    .sort((a, b) => bondLevelIndex(a.level_name) - bondLevelIndex(b.level_name))[0];
  if (!next) return null;

  await deliverBondScene(userId, characterId, next.level_name, { alreadyClaimed: true });
  return next.level_name;
}

// --- the button walk ---------------------------------------------------------

/**
 * Handle one bond button click, after app.js has already ACKed it by stripping
 * the button from the clicked message.
 *
 * Everything a scene says goes out on the bot token into the stored DM channel.
 * `sendFollowup` is used only to answer the clicker about the *mechanism* — the
 * resume button confirming it sent, or explaining why it could not — never to
 * deliver scene content.
 *
 * The whole function is a no-op for any click that isn't the exact next step:
 * a stale index, a second choice, a row belonging to somebody else. That is
 * deliberate and load-bearing, because these buttons never expire and so are
 * clickable long after the moment has passed.
 */
export async function handleBondClick(userId, { kind, characterId, levelKey, arg }, { sendFollowup } = {}) {
  const character = getCharacterById(characterId);
  const levelName = bondLevelFromSlug(levelKey);
  if (!character || !levelName) return { acted: false, reason: 'unparseable' };

  const row = await getBondSceneRow(userId, character.id, levelName);
  // A row that isn't there, or isn't this user's, is not an error worth
  // answering — the click already got its ACK.
  if (!row || row.discord_user_id !== userId) return { acted: false, reason: 'not-yours' };

  if (kind === 'optout') {
    await setBondDmPref(userId, false);
    await advanceBondScene(userId, character.id, levelName, { status: 'skipped_optout' });
    await post(row, {
      content:
        `Understood. Bond messages are now off for every character, not just ${character.firstName}.`
        + '\n\nThis scene ends here, and any level you cross while they are off is not sent to you '
        + 'later. *You can turn them back on any time with* `/bonds dms:on`*.*',
    });
    return { acted: true, reason: 'opted-out' };
  }

  const scene = getBondScene(character.id, levelName);
  if (!scene?.beats?.length) return { acted: false, reason: 'no-content' };
  const vars = await resolveSceneVars(userId, character);

  // The resume button (§2.4). The only thing it does is get the scene back into
  // the DM where it belongs — it never renders a beat itself.
  if (kind === 'resume') {
    if (row.status === 'complete') return { acted: false, reason: 'already-complete' };

    // A row that never started needs delivering; one that stalled mid-scene
    // needs the beat that did not land re-posted.
    const result = row.current_beat == null
      ? await deliverBondScene(userId, character.id, levelName, { alreadyClaimed: true })
      : await resumeStalledBeat(userId, character, levelName, scene, vars, row);

    if (sendFollowup) {
      await sendFollowup({
        content: result.delivered
          ? `📨 Sent — **${character.firstName}**'s message is in your DMs.`
          : undeliverableNotice(character),
        flags: EPHEMERAL_FLAG,
      }).catch((err) => console.error('Error answering bond resume:', err));
    }
    return { acted: result.delivered, reason: result.reason || 'resumed' };
  }

  if (kind === 'next') {
    const next = Number(arg);
    // The replay guard. Only the beat directly after the one on the row is
    // honoured; a duplicate click, an interaction Discord retried, or a
    // months-old custom_id posts nothing at all.
    if (!Number.isInteger(next) || next !== (row.current_beat ?? -1) + 1) {
      return { acted: false, reason: 'stale-beat' };
    }
    if (next >= scene.beats.length) return { acted: false, reason: 'past-end' };

    const beat = renderBeat(scene, next, vars, { characterId: character.id, levelName });
    const posted = await post(row, beat);
    // current_beat only moves once the beat is actually out, so a Discord 5xx
    // here leaves the row pointing at the last beat the user actually saw. The
    // ACK has already stripped the button they clicked, so nothing live remains
    // in the DM — `pending_dm` is what tells the next /roam or /meet to offer
    // the resume button. Never an automatic retry inside the failed request.
    if (!posted) {
      await advanceBondScene(userId, character.id, levelName, { status: 'pending_dm' });
      return { acted: false, reason: 'post-failed' };
    }

    await advanceBondScene(userId, character.id, levelName, { current_beat: next });
    return { acted: true, reason: 'beat-posted', beat: next };
  }

  if (kind === 'choice') {
    const option = scene.choice?.options?.find((o) => o.key === arg);
    if (!option) return { acted: false, reason: 'unknown-choice' };

    // The write is the guard: complete_bond_scene only closes a row whose
    // choice_key is still null, and grants the keepsake in the same statement.
    // A second click gets false back and posts nothing, so neither the closing
    // line nor the keepsake can ever land twice.
    const closed = await completeBondScene({
      userId,
      characterId: character.id,
      levelName,
      choiceKey: option.key,
      emoji: scene.keepsake.emoji,
      line: fillTemplate(scene.keepsake.line, vars),
    });
    if (!closed) return { acted: false, reason: 'already-answered' };

    await post(row, renderClosing(option, scene.keepsake, vars, { characterId: character.id, levelName }));

    // The slot with this character is free now — start whatever was waiting.
    await releaseQueuedBondScene(userId, character.id).catch((err) =>
      console.error('Error releasing queued bond scene:', err),
    );

    return { acted: true, reason: 'completed', choice: option.key };
  }

  return { acted: false, reason: 'unknown-kind' };
}

// Post one message of a scene into the DM it lives in. Returns whether it
// landed; every caller that advances state checks it first, because a beat that
// did not arrive must not move the row past it.
//
// A scene has exactly one home. There is no ephemeral rendering to fall back to
// — see §2.4 — so a failure here is recorded as `pending_dm` by the caller and
// picked up by the resume button on the user's next command.
async function post(row, message) {
  if (!row.dm_channel_id) return false;
  try {
    // Same shared helper the public-encounter scheduler uses, but
    // `dm_channel_id` is only ever written from openDmChannel, so this cannot
    // reach a guild channel.
    postChannelTyping(row.dm_channel_id).catch(() => {});
    await postChannelMessage(row.dm_channel_id, message);
    return true;
  } catch (err) {
    console.error('Error posting bond scene message:', err);
    return false;
  }
}

// --- the resume button (§2.4) ---------------------------------------------

// Why a button rather than the scene itself: a bond scene has exactly one home,
// and that is the user's DM, where it persists and can be re-read. An ephemeral
// copy would be a worse artifact than the thing the feature exists to deliver —
// unreadable an hour later, and impossible to come back to. So when a beat is
// owed and did not land, the user's next command offers a one-press way to put
// it where it belongs, and nothing else.
//
// This is the whole recovery story. It covers beat 0 never going out (no shared
// guild, DMs closed, Discord down), a mid-scene POST that failed, and a claim
// stranded by a database blip before it started — all of which leave a row with
// nothing live to click, and none of which lose anything: the row keeps its
// place and there is no expiry on any of it.

/**
 * The ephemeral nudge offered at the top of /roam, /meet and /affinity when a
 * scene is owed a beat. Returns what was surfaced, or why nothing was.
 *
 * One scene per command, newest first, so a burst of level-ups can't wall off
 * the encounter the user actually asked for. Nothing here renders a beat.
 */
export async function surfaceBondSceneResume(userId, sendFollowup) {
  const rows = await listResumableBondScenes(userId);
  if (rows.length === 0) return { surfaced: false, reason: 'nothing-pending' };

  const pref = await getBondDmPref(userId);
  if (!pref.enabled) return { surfaced: false, reason: 'opted-out' };

  // `pending_dm` is owed something and can be offered directly. A `queued` row
  // has no beat outstanding — it is usually waiting its turn behind an earlier
  // level with the same character, and only occasionally a stranded claim — so
  // it is never surfaced. Attempting delivery is what tells the two apart, and
  // deliverBondScene re-runs the queue check and holds it again if the wait was
  // legitimate.
  const owed = rows.find((r) => r.status === 'pending_dm');
  if (!owed) {
    const stranded = rows[0];
    const result = await deliverBondScene(userId, stranded.character_id, stranded.level_name, {
      alreadyClaimed: true,
    });
    return { surfaced: false, reason: result.delivered ? 'restarted' : 'still-queued' };
  }

  const character = getCharacterById(owed.character_id);
  const scene = character && getBondScene(owed.character_id, owed.level_name);
  if (!scene?.beats?.length) {
    await advanceBondScene(userId, owed.character_id, owed.level_name, { status: 'skipped_gone' });
    return { surfaced: false, reason: 'no-content' };
  }

  // Deliberately says nothing about what is in the scene. The whole point of a
  // private message is that it is read in private, so this is an envelope, not
  // a preview.
  const waiting = owed.current_beat == null ? 'left you a message' : 'was in the middle of something';

  await sendFollowup({
    content: `📨 **${character.firstName}** ${waiting}.`,
    components: [resumeRow(character.id, owed.level_name)],
    flags: EPHEMERAL_FLAG,
  });

  return { surfaced: true, character: character.id, level: owed.level_name };
}

function resumeRow(characterId, levelName) {
  return {
    type: ACTION_ROW,
    components: [
      {
        type: BUTTON,
        style: 1, // PRIMARY — this is the one thing to do with this message
        label: 'Open it',
        custom_id: `bond:resume:${characterId}:${bondLevelSlug(levelName)}:x`,
      },
    ],
  };
}

// Re-post the beat that was owed when a scene stalled mid-walk. `current_beat`
// is the last beat the user actually saw, so the one to send is the next.
async function resumeStalledBeat(userId, character, levelName, scene, vars, row) {
  const next = (row.current_beat ?? -1) + 1;
  if (next >= scene.beats.length) return { delivered: false, reason: 'past-end' };

  const beat = renderBeat(scene, next, vars, { characterId: character.id, levelName });
  if (!(await post(row, beat))) return { delivered: false, reason: 'post-failed' };

  await advanceBondScene(userId, character.id, levelName, {
    status: 'in_progress',
    current_beat: next,
  });
  return { delivered: true, reason: 'resumed' };
}

// Said when the button could not deliver. The failure is almost always that the
// bot shares no server with this user (the app is dual-install, so a user-app-only
// install cannot be DMed at all), and that is something they can fix — so this
// says what to do rather than apologising. Nothing is lost while it is unfixed:
// the row keeps its place and the button comes back next command.
function undeliverableNotice(character) {
  return [
    `📬 **${character.firstName}** tried to reach you privately, but I can't message you.`,
    '',
    "Add the bot to a server you're in — or allow direct messages from server members — then press this again.",
    '*The message will still be here. Nothing is lost.*',
  ].join('\n');
}

// --- the journal and the replay gallery (§4.6) --------------------------------
//
// A replay is the original interaction again: the same beats, the same
// Continue button, the same choice row at the end, posted for real into the
// user's DM with the bot token, at the same one-message-per-click pace as a
// live scene. The only thing that makes it a "replay" rather than a second
// scene is what it does *not* do — it never claims a row, never touches
// bond_scene_progress.choice_key, and never writes to bond_keepsakes. Every
// function below either only reads (buildBondJournal) or posts render output
// that `renderBeat` / `renderClosing` already produce with no side effects of
// their own (handleBondReplayClick) — the DB write that closes a *live* scene
// lives only in handleBondClick's 'choice' branch, nowhere in this section.
//
// Replay unlocks per scene, the moment that scene is finished — there is no
// character-wide gate. `complete_bond_scene`'s `choice_key IS NULL` guard still
// means a bug here could not overwrite a recorded answer if it tried, which is
// the actual safety property: a remembered choice the player can quietly
// re-roll would make the `bondChoice` dialogue callbacks farmable, but reading
// — or re-answering, in a replay that writes nothing — one back as many times
// as they like does not touch it.

/**
 * `/bonds character:<name>` — the relationship journal. Lists the scenes this
 * player has finished with one character and the keepsake each left behind,
 * and offers each one for replay.
 */
export async function buildBondJournal(userId, characterId) {
  // Resolved through matchCharacterGuess, not getCharacterById, so this accepts
  // every form /call teaches players to type: a full name, a surname, "lucci"
  // for Romeo. getCharacterById would only take the bare id or an alias, and
  // "Shohei Haizono" — the exact shape /call's own description shows — would
  // come back as a stranger to someone with a whole finished journal. Canonical
  // ids still resolve, so the journal button in the replay gallery is unaffected.
  const character = getCharacterById(matchCharacterGuess(characterId));
  if (!character) {
    return { content: "You haven't met anyone by that name.", flags: EPHEMERAL_FLAG };
  }

  const [rows, keepsakes] = await Promise.all([
    listBondScenes(userId, character.id),
    getBondKeepsakes(userId, character.id),
  ]);

  const finished = rows
    .filter((r) => r.status === 'complete')
    .sort((a, b) => bondLevelIndex(a.level_name) - bondLevelIndex(b.level_name));

  if (finished.length === 0) {
    return {
      content:
        `You and **${getFullName(character)}** haven't had a moment like that yet.` +
        '\n\n*Keep running /roam and /meet. Scenes arrive on their own when you cross ' +
        'into a new level with someone.*',
      flags: EPHEMERAL_FLAG,
    };
  }

  const byLevel = new Map(keepsakes.map((k) => [k.level_name, k]));
  const lines = finished.map((row) => {
    const keepsake = byLevel.get(row.level_name);
    const trailing = keepsake ? ` ${keepsake.emoji} *${keepsake.line}*` : '';
    return `**${row.level_name}** —${trailing}`;
  });

  return {
    content: `**You and ${getFullName(character)}**\n${lines.join('\n')}`
      + '\n\n*Pick one to have it again — the same scene, sent fresh to your DMs.*',
    components: replayRows(character.id, finished),
    flags: EPHEMERAL_FLAG,
  };
}

// Discord allows five buttons a row and five rows a message; six scenes fit in
// two rows with room to spare.
function replayRows(characterId, finished) {
  const buttons = finished.map((row) => ({
    type: BUTTON,
    style: 2,
    label: row.level_name,
    custom_id: `bond:replay:${characterId}:${bondLevelSlug(row.level_name)}:x`,
  }));

  const rows = [];
  for (let i = 0; i < buttons.length; i += 5) {
    rows.push({ type: ACTION_ROW, components: buttons.slice(i, i + 5) });
  }
  return rows;
}

/**
 * Drives a replay: `replay` / `replaystart` post beat 0, `rnext` posts the
 * beat after `arg`, `rchoice` posts the closing line for the option `arg`
 * names. Every one of them is a plain `post()` into the row's stored
 * `dm_channel_id` — the exact same call a live scene makes — so a replayed
 * beat is indistinguishable from the original one except that answering it
 * again writes nothing.
 *
 * `sendFollowup`, when given, is used for exactly one thing: telling the
 * clicker whether the first beat made it to their DM, for the one entry point
 * (the journal's own button) that might not be sitting in the DM already.
 * Every other kind is silent — the new message landing in the DM is the only
 * confirmation those need.
 */
export async function handleBondReplayClick(userId, { kind, characterId, levelKey, arg }, { sendFollowup } = {}) {
  const character = getCharacterById(characterId);
  const levelName = bondLevelFromSlug(levelKey);
  if (!character || !levelName) return { posted: false, reason: 'unparseable' };

  const row = await getBondSceneRow(userId, character.id, levelName);
  // Re-checked on every click rather than trusted from the custom_id it came
  // in on: getBondSceneRow is scoped to this userId, so a forged id for
  // someone else's row, or for a level never finished, resolves to nothing.
  if (!row || row.status !== 'complete') {
    if (sendFollowup) {
      await sendFollowup({
        content: "That scene isn't finished yet, so there's nothing to replay.",
        flags: EPHEMERAL_FLAG,
      }).catch((err) => console.error('Error answering bond replay:', err));
    }
    return { posted: false, reason: 'not-finished' };
  }

  const scene = getBondScene(character.id, levelName);
  if (!scene?.beats?.length) return { posted: false, reason: 'no-content' };
  const vars = await resolveSceneVars(userId, character);

  let posted = false;
  if (kind === 'replay' || kind === 'replaystart') {
    posted = await post(row, renderBeat(scene, 0, vars, { characterId: character.id, levelName, replay: true }));
  } else if (kind === 'rnext') {
    const next = Number(arg);
    if (!Number.isInteger(next) || next < 1 || next >= scene.beats.length) {
      return { posted: false, reason: 'out-of-range' };
    }
    posted = await post(row, renderBeat(scene, next, vars, { characterId: character.id, levelName, replay: true }));
  } else if (kind === 'rchoice') {
    const option = scene.choice?.options?.find((o) => o.key === arg);
    if (!option) return { posted: false, reason: 'unknown-choice' };
    posted = await post(
      row,
      renderClosing(option, scene.keepsake, vars, { characterId: character.id, levelName }),
    );
  } else {
    return { posted: false, reason: 'unknown-kind' };
  }

  if (sendFollowup) {
    await sendFollowup({
      content: posted
        ? `📨 Sent — **${character.firstName}**'s scene is in your DMs.`
        : undeliverableNotice(character),
      flags: EPHEMERAL_FLAG,
    }).catch((err) => console.error('Error answering bond replay:', err));
  }

  return { posted, reason: posted ? 'posted' : 'post-failed' };
}

/**
 * `/bonds dms:on|off`. Separate from the button so the switch is reachable
 * without a DM to press it in — which matters most for exactly the users who
 * can't be DMed.
 */
export async function setBondDmsEnabled(userId, enabled) {
  await setBondDmPref(userId, enabled);
  return enabled
    ? 'Bond messages are on. Cross into a new level with someone and they may write to you.'
    : 'Bond messages are off for every character. Nobody will write to you privately again, and any '
      + 'level you cross while they are off is not sent to you later. Turn them back on any time with '
      + '`/bonds dms:on`.';
}
