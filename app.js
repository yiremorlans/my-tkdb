import 'dotenv/config';
import express from 'express';
import {
  InteractionResponseType,
  InteractionType,
  verifyKeyMiddleware,
} from 'discord-interactions';
import {
  buildAffinityMessage,
  buildBondsMessage,
  buildMeetPickMessage,
  buildMeetSpawnMessage,
  buildResponseResultMessage,
  buildRoamDialogueMessage,
  buildRoamSpawnMessage,
} from './encounters.js';
import { handleCall, handleEncountersAdmin, handleEncounterDev } from './publicEncounters.js';
import {
  buildDossierMessage,
  cooldownReplyWithReset,
  handleCooldownReset,
  handleDocs,
  handleMission,
  handleMissionAccept,
  handleMissionAssistJoin,
  handleMissionDev,
  handleMissionFile,
  handleMissionsAdmin,
  handleRiddle,
} from './missions.js';
import {
  buildBondJournal,
  deliverBondScene,
  handleBondClick,
  handleBondReplayClick,
  setBondDmsEnabled,
  surfaceBondSceneResume,
} from './bondScenes.js';
import { startEncounterScheduler } from './encounterScheduler.js';
import {
  claimCommandInvoke,
  releaseCommandInvoke,
  checkCommandLimit,
  claimCommandUse,
} from './commandLimits.js';
import {
  trackUserActivity,
  trackCharacterEngagement,
  trackCommandUsage,
} from './db/supabase.js';
import { RESET_SPENT_LINES } from './constants/missions.js';
import { validateContent } from './constants/validateContent.js';
import { startGateway } from './gateway.js';

// Time of day drives which backgrounds and dialogue are eligible (the `_PM`
// evening cutoff — see constants/backgrounds.js). Discord never tells us a
// user's timezone, so we judge "evening" against one fixed zone for everyone:
// US Central. Set as a real env var in deploy config; this default just keeps
// an unconfigured host (which would otherwise be UTC) from drifting the window.
process.env.TZ ??= 'America/Chicago';
console.log(
  `[startup] timezone ${Intl.DateTimeFormat().resolvedOptions().timeZone} · ${new Date().toString()}`,
);

// Fail fast if characters.js and dialogue.js have drifted apart, rather than
// letting a character silently fall back to generic lines in production.
validateContent();

// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;

// Serve character/background art so Discord can load it by URL in message components
app.use('/assets', express.static('assets'));

// edit: true PATCHes the deferred response instead of posting a new followup —
// what a DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE ack needs, so the "thinking"
// placeholder becomes the real message rather than lingering beside it.
async function sendFollowup(interactionToken, messageData, timeoutMs = 15000, edit = false) {
  const base = `https://discord.com/api/v10/webhooks/${process.env.APP_ID}/${interactionToken}`;
  const url = edit ? `${base}/messages/@original` : base;
  const startTime = Date.now();
  console.log('[sendFollowup] Starting, timeout:', timeoutMs, 'ms');
  console.log('[sendFollowup] URL:', url.substring(0, 50) + '...');

  try {
    const form = new FormData();

    if (messageData.files && messageData.files.length > 0) {
      // Handle files separately
      const { files, ...dataWithoutFiles } = messageData;
      form.append('payload_json', JSON.stringify(dataWithoutFiles));
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        console.log(`[sendFollowup] Appending file: ${file.name}, size: ${file.attachment.length / 1024 / 1024}MB`);
        const blob = new Blob([file.attachment], { type: 'image/png' });
        form.append(`files[${i}]`, blob, file.name);
      }
    } else {
      const jsonData = JSON.stringify(messageData);
      console.log('[sendFollowup] Message data:', jsonData.substring(0, 200) + '...');
      form.append('payload_json', jsonData);
    }

    console.log('[sendFollowup] Sending fetch request to Discord, elapsed:', Date.now() - startTime, 'ms');
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    const fetchStart = Date.now();
    const response = await fetch(url, {
      method: edit ? 'PATCH' : 'POST',
      body: form,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    console.log('[sendFollowup] Response received:', response.status, '- took', Date.now() - fetchStart, 'ms');
    const responseText = await response.text();
    if (!response.ok) {
      console.error(`[sendFollowup] Failed: ${response.status}`, responseText);
      throw new Error(`Discord API error: ${response.status} - ${responseText}`);
    } else {
      console.log('[sendFollowup] Success! Total time:', Date.now() - startTime, 'ms');
    }
  } catch (err) {
    console.error('[sendFollowup] Error:', err.message, 'elapsed:', Date.now() - startTime, 'ms');
    throw err;
  }
}

// Anything that reaches out to Discord on its own initiative is held back under
// `npm test`, where app.js is imported to exercise the HTTP routes: the gateway
// and the encounter scheduler for the same reason at the bottom of this file,
// and the two bond-scene triggers here. bondScenes.js itself is unit-tested
// directly against a mocked discordRest.
const IS_TEST = process.env.npm_lifecycle_event === 'test';

// Grey out every button on a clicked bond message rather than removing it.
// Stripping (`components: []`) used to be how a used Continue/choice button
// went away, but it shrinks the message and shoves everything below it up
// the DM on every click — jarring mid-scene. Disabling keeps the message's
// height (and the rest of the conversation) put; a greyed button also still
// reads as "done" and can't be pressed twice, same as stripping did.
function disabledComponents(components) {
  return (components || []).map((row) => ({
    ...row,
    components: (row.components || []).map((b) => ({ ...b, disabled: true })),
  }));
}

// A bond scene owed a beat it couldn't deliver (no shared server, DMs closed,
// Discord down, a POST that failed mid-walk) waits on its row until the user's
// next command, which offers a one-press button to put it back in their DMs.
// The ephemeral message is only ever that button — the scene itself is never
// rendered here. Fire-and-forget, after the real reply has gone out: a pending
// scene must never delay or fail an encounter.
function maybeSurfaceBondScene(userId, interactionToken) {
  if (IS_TEST) return;
  surfaceBondSceneResume(userId, (messageData) => sendFollowup(interactionToken, messageData))
    .catch((err) => console.error('Error surfacing bond scene:', err));
}

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 * Parse request body and verifies incoming requests using discord-interactions package
 */
app.post('/interactions', verifyKeyMiddleware(process.env.PUBLIC_KEY), async (req, res) => {
  // Interaction id, type and data
  const { type, data, member, user } = req.body;
  const userId = member?.user?.id || user?.id;

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;

    if (name === 'roam') {
      // In-memory flood throttle, checked before the Supabase pre-check so a
      // spammed /roam never reaches the DB or buildRoamDialogueMessage. Scoped
      // to /roam alone — a /meet in the same minute is unaffected.
      const flood = claimCommandInvoke(userId, 'roam');
      if (!flood.allowed) {
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: flood.reason,
            flags: 64, // EPHEMERAL
          },
        });
      }
      const limit = await checkCommandLimit(userId, 'roam');
      if (!limit.allowed) {
        // The one place a banked mission reward is offered: a button to spend
        // it, attached only when the user is actually being turned away and
        // actually has one (docs/scheduled-missions.md §13).
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: await cooldownReplyWithReset(userId, 'roam', limit.reason),
        });
      }
      // Build and respond immediately (no await). User activity is only counted
      // once an encounter actually loads (the roam/spawn button below), not for
      // opening the prompt.
      try {
        const messageData = await buildRoamDialogueMessage(userId);
        res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: messageData,
        });
        maybeSurfaceBondScene(userId, req.body.token);
        return;
      } catch (err) {
        console.error('Error in /roam:', err);
        // The invoke-throttle slot above was claimed before this failure, on
        // the assumption the command would go on to produce something. It
        // didn't, so release it — otherwise a server error costs the user a
        // minute of "give it a minute" on top of the failure itself.
        releaseCommandInvoke(userId, 'roam');
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: 'Something went wrong wandering out. Try again?',
            flags: 64, // EPHEMERAL
          },
        });
      }
    }

    if (name === 'meet') {
      // Same in-memory flood throttle as /roam, but on its own /meet window.
      const flood = claimCommandInvoke(userId, 'meet');
      if (!flood.allowed) {
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: flood.reason,
            flags: 64, // EPHEMERAL
          },
        });
      }
      const limit = await checkCommandLimit(userId, 'meet');
      if (!limit.allowed) {
        // The one place a banked mission reward is offered: a button to spend
        // it, attached only when the user is actually being turned away and
        // actually has one (docs/scheduled-missions.md §13).
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: await cooldownReplyWithReset(userId, 'meet', limit.reason),
        });
      }
      // User activity is only counted once a character actually loads (the
      // meet/pick button below), not for opening the picker.
      try {
        // userId, because an errand holder's still-unsigned targets take
        // guaranteed slots in the pick list (docs/scheduled-missions.md §5).
        const messageData = await buildMeetPickMessage(userId);
        res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: messageData,
        });
        maybeSurfaceBondScene(userId, req.body.token);
        return;
      } catch (err) {
        console.error('Error in /meet:', err);
        // Same reasoning as /roam's catch: the invoke-throttle slot above was
        // claimed before this failure, so release it rather than making the
        // user eat a minute-long throttle on top of a server error.
        releaseCommandInvoke(userId, 'meet');
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: 'Something went wrong finding someone to meet. Try again?',
            flags: 64, // EPHEMERAL
          },
        });
      }
    }

    if (name === 'affinity') {
      // Extract character options from the interaction
      const options = data.options || [];
      const characterIds = [];

      for (const option of options) {
        if (option.name.startsWith('character_') && option.value) {
          characterIds.push(option.value);
        }
      }

      if (characterIds.length === 0) {
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: 'Please specify at least one character.',
            flags: 64, // EPHEMERAL
          },
        });
      }

      // Ack first: the avatars travel as attachments, which Discord only
      // accepts as multipart — so the real message goes out via sendFollowup.
      res.send({ type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE });

      (async () => {
        try {
          const messageData = await buildAffinityMessage(userId, characterIds);
          await sendFollowup(req.body.token, messageData, 15000, true);

          maybeSurfaceBondScene(userId, req.body.token);

          // Track user activity and command usage
          trackUserActivity(userId).catch(err => console.error('Error tracking user activity:', err));
          trackCommandUsage(userId, 'affinity').catch(err => console.error('Error tracking command usage:', err));
        } catch (err) {
          console.error('Error in /affinity:', err);
          try {
            await sendFollowup(req.body.token, {
              content: 'Something went wrong pulling up those relationships. Try again?',
            }, 15000, true);
          } catch (followupErr) {
            console.error('Failed to send error followup:', followupErr);
          }
        }
      })();
      return;
    }

    if (name === 'house') {
      // The Inspector dossier (docs/scheduled-missions.md §9). Same shape as
      // /affinity: the emblem is an attachment, so ack then follow up.
      // Ephemeral: it names the player's current mission's house and type,
      // which /mission and /docs otherwise keep private to the accepter.
      res.send({
        type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
        data: { flags: 64 }, // EPHEMERAL
      });

      (async () => {
        try {
          const messageData = await buildDossierMessage(userId);
          await sendFollowup(req.body.token, messageData, 15000, true);

          // Track user activity and command usage
          trackUserActivity(userId).catch(err => console.error('Error tracking user activity:', err));
          trackCommandUsage(userId, 'house').catch(err => console.error('Error tracking command usage:', err));
        } catch (err) {
          console.error('Error in /house:', err);
          try {
            await sendFollowup(req.body.token, {
              content: 'Something went wrong pulling up your dossier. Try again?',
            }, 15000, true);
          } catch (followupErr) {
            console.error('Failed to send error followup:', followupErr);
          }
        }
      })();
      return;
    }

    if (name === 'bonds') {
      // `dms` is an option rather than a subcommand on purpose: Discord makes a
      // command with subcommands *only* invocable through them, and bare
      // /bonds — the roster list — has to keep working. So `/bonds dms:off`
      // toggles the level-up DMs and `/bonds` alone is unchanged.
      // `/bonds character:<name>` is the relationship journal: what you have
      // finished with one person, each scene replayable in your DMs as many
      // times as you like — the same beats, the same buttons, just without
      // moving anything (bond:replay below). The scene's own closing DM
      // message offers the same replay directly (bond:replaystart), so this
      // command isn't the only way in.
      const characterOption = (data.options || []).find((o) => o.name === 'character');
      if (characterOption) {
        try {
          const messageData = await buildBondJournal(userId, characterOption.value);
          res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: messageData,
          });
          trackUserActivity(userId).catch(err => console.error('Error tracking user activity:', err));
          trackCommandUsage(userId, 'bonds').catch(err => console.error('Error tracking command usage:', err));
        } catch (err) {
          console.error('Error in /bonds character:', err);
          res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: { content: 'Something went wrong looking those up. Try again?', flags: 64 },
          });
        }
        return;
      }

      const dmsOption = (data.options || []).find((o) => o.name === 'dms');
      if (dmsOption) {
        const content = await setBondDmsEnabled(userId, dmsOption.value === 'on');
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: { content, flags: 64 }, // EPHEMERAL
        });
      }

      // Text-only (no attachments), so respond in-band like /roam — no defer.
      try {
        const messageData = await buildBondsMessage(userId);
        res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: messageData,
        });

        trackUserActivity(userId).catch(err => console.error('Error tracking user activity:', err));
        trackCommandUsage(userId, 'bonds').catch(err => console.error('Error tracking command usage:', err));
      } catch (err) {
        console.error('Error in /bonds:', err);
        res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: 'Something went wrong pulling up your bonds. Try again?',
            flags: 64, // EPHEMERAL
          },
        });
      }
      return;
    }

    if (name === 'call') {
      // Deferred + ephemeral. handleCall does up to three sequential Supabase
      // round-trips before it can answer; on a slow or contended connection
      // (several near-simultaneous /calls, a cold pool, the event loop busy
      // compositing a spawn) that can blow Discord's 3s budget, and the winner
      // would see "the application did not respond" even though the encounter
      // was already claimed and revealed. Deferring drops the deadline. The ack
      // is ephemeral, so only the caller sees the "thinking…" flash; the public
      // reveal is a channel-message edit inside afterReply and is unaffected.
      res.send({
        type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
        data: { flags: 64 }, // EPHEMERAL
      });

      (async () => {
        let result;
        try {
          result = await handleCall(req.body);
        } catch (err) {
          console.error('Error in /call:', err);
          result = { reply: { content: 'Something went wrong there. Try again?' }, afterReply: null };
        }

        try {
          // The defer already made the message ephemeral — drop the redundant
          // flag from the edit body.
          const { flags, ...body } = result.reply;
          await sendFollowup(req.body.token, body, 15000, true);
        } catch (followupErr) {
          console.error('Failed to send /call followup:', followupErr);
        }

        // Runs regardless of the followup: the reward grant and public reveal
        // must not hinge on the winner's ephemeral ack landing.
        result.afterReply?.().catch(err => console.error('Error in /call follow-up:', err));
      })();
      return;
    }

    if (name === 'encounters') {
      // Admin command, answered ephemerally and in-band. Only two DB round-trips
      // before the reply, and an admin re-running it costs nothing, so the 3s
      // budget is not a real risk here — no defer.
      let result;
      try {
        result = await handleEncountersAdmin(req.body);
      } catch (err) {
        console.error('Error in /encounters:', err);
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: 'Something went wrong there. Try again?',
            flags: 64, // EPHEMERAL
          },
        });
      }

      res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: result.reply,
      });

      result.afterReply?.().catch(err => console.error('Error in /encounters follow-up:', err));
      return;
    }

    // /mission, /docs and /riddle all answer ephemerally and all do two or
    // three sequential Supabase round trips before they can — and /mission
    // assist adds a channel POST on top. Deferred for the same reason /call is:
    // the 3s inline budget is not reliably enough, and the user seeing "the
    // application did not respond" after a mission was already claimed would be
    // the worst possible failure here.
    if (name === 'mission' || name === 'docs' || name === 'riddle' || name === 'missions') {
      res.send({
        type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
        data: { flags: 64 }, // EPHEMERAL
      });

      (async () => {
        const handlers = {
          mission: handleMission,
          docs: handleDocs,
          riddle: handleRiddle,
          missions: handleMissionsAdmin,
        };

        let result;
        try {
          result = await handlers[name](req.body);
        } catch (err) {
          console.error(`Error in /${name}:`, err);
          result = { reply: { content: 'Something went wrong there. Try again?' }, afterReply: null };
        }

        try {
          // The defer already made this ephemeral — drop the redundant flag.
          const { flags, ...body } = result.reply;
          await sendFollowup(req.body.token, body, 15000, true);
        } catch (followupErr) {
          console.error(`Failed to send /${name} followup:`, followupErr);
        }

        // Runs regardless of the followup: the analytics and the setup check
        // must not hinge on the user's ephemeral ack landing.
        result.afterReply?.().catch(err => console.error(`Error in /${name} follow-up:`, err));
      })();
      return;
    }

    if (name === 'encdev' || name === 'missiondev') {
      // Deferred + ephemeral: a manual spawn composes an image and POSTs it to
      // Discord, which can run past the 3s inline budget. The owner gets the
      // outcome (or the reason it failed) as the followup.
      res.send({
        type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
        data: { flags: 64 }, // EPHEMERAL
      });

      (async () => {
        let message;
        try {
          message =
            name === 'encdev'
              ? await handleEncounterDev(req.body)
              : await handleMissionDev(req.body);
        } catch (err) {
          console.error(`Error in /${name}:`, err);
          message = { content: 'Something went wrong there. Check the logs.' };
        }
        try {
          await sendFollowup(req.body.token, message, 15000, true);
        } catch (followupErr) {
          console.error(`Failed to send /${name} followup:`, followupErr);
        }
      })();
      return;
    }

    console.error(`unknown command: ${name}`);
    return res.status(400).json({ error: 'unknown command' });
  }

  /**
   * Handle button clicks from /meet and dialogue responses
   */
  if (type === InteractionType.MESSAGE_COMPONENT) {
    const customId = data.custom_id;
    const [action, ...rest] = customId.split(':');

    if (action === 'meet' && rest[0] === 'pick') {
      const characterId = rest[1];

      // Disable the character selection buttons by copying and modifying the original message
      const disabledComponents = req.body.message?.components?.map(row => ({
        ...row,
        components: row.components?.map(btn => ({ ...btn, disabled: true })) || [],
      })) || [];

      res.send({
        type: InteractionResponseType.UPDATE_MESSAGE,
        data: {
          content: req.body.message?.content || 'A few familiar faces catch your eye. Who do you want to meet?',
          components: disabledComponents,
          flags: 64,
        },
      });

      const timeoutHandle = setTimeout(() => {
        console.error('Meet pick command timed out after 120 seconds');
        sendFollowup(req.body.token, {
          content: '⏱️ This took too long to process. Try again?',
          flags: 64,
        }).catch(e => console.error('Failed to send timeout error:', e));
      }, 120000);

      (async () => {
        try {
          const messageData = await buildMeetSpawnMessage(userId, characterId);
          await sendFollowup(req.body.token, messageData);
          clearTimeout(timeoutHandle);

          // Not counted here — the flow is logged once at the response step
          // (the 'resp' handler below), keyed to this 'meet' origin.
        } catch (err) {
          console.error('Error in /meet pick:', err);
          clearTimeout(timeoutHandle);
          try {
            await sendFollowup(req.body.token, {
              content: `Error: ${err.message}`,
              flags: 64,
            });
          } catch (followupErr) {
            console.error('Failed to send error followup:', followupErr);
          }
        }
      })();
      return;
    }

    if (action === 'roam' && rest[0] === 'spawn') {
      const encounterId = rest[1];

      // Disable the approach button on the dialogue message so it can't be
      // clicked again while the spawn is being composed (or afterwards).
      const disabledComponents = req.body.message?.components?.map(row => ({
        ...row,
        components: row.components?.map(btn => ({ ...btn, disabled: true })) || [],
      })) || [];

      res.send({
        type: InteractionResponseType.UPDATE_MESSAGE,
        data: {
          content: req.body.message?.content || '',
          components: disabledComponents,
          flags: 64,
        },
      });

      const timeoutHandle = setTimeout(() => {
        console.error('Roam spawn command timed out after 120 seconds');
        sendFollowup(req.body.token, {
          content: '⏱️ This took too long to process. Try again?',
          flags: 64,
        }).catch(e => console.error('Failed to send timeout error:', e));
      }, 120000);

      (async () => {
        try {
          const messageData = await buildRoamSpawnMessage(encounterId);
          await sendFollowup(req.body.token, messageData);
          clearTimeout(timeoutHandle);

          // Not counted here — the flow is logged once at the response step
          // (the 'resp' handler below), keyed to this 'roam' origin.
        } catch (err) {
          console.error('Error in /roam spawn:', err);
          clearTimeout(timeoutHandle);
          try {
            await sendFollowup(req.body.token, {
              content: `Error: ${err.message}`,
              flags: 64,
            });
          } catch (followupErr) {
            console.error('Failed to send error followup:', followupErr);
          }
        }
      })();
      return;
    }

    if (action === 'resp') {
      // origin ('meet' | 'roam') identifies the flow this response completes;
      // absent on buttons rendered before this field was added — default 'meet'.
      const [characterId, responseTypeId, origin] = rest;
      const commandName = origin === 'roam' ? 'roam' : 'meet';

      (async () => {
        try {
          // The cooldown gate, at redemption rather than only at command-invoke.
          // The invoke check (in the /roam and /meet handlers) is read-only and
          // the clock is only stamped once a flow *completes* — here — so
          // without a gate at this point a user could fire /roam or /meet many
          // times before finishing any of them (every invoke check passes
          // because none has stamped yet), then click through all the queued
          // response buttons in one sitting, redeeming N affinity gains against
          // a "once per 3h" limit.
          //
          // claimCommandUse decides and stamps in one statement, so two
          // responses arriving inside the same round trip can't both pass; a
          // check-then-stamp pair would leave exactly that window open. Opening
          // a prompt and walking away still costs nothing, because nothing is
          // claimed before this point.
          const limit = await claimCommandUse(userId, commandName);
          if (!limit.allowed) {
            const collapsed = (req.body.message?.components || []).map(row => ({
              ...row,
              components: (row.components || []).map(btn => ({ ...btn, disabled: true })),
            }));
            res.send({
              type: InteractionResponseType.UPDATE_MESSAGE,
              data: {
                content: limit.reason,
                components: collapsed,
                flags: 64, // EPHEMERAL
              },
            });
            return;
          }

          // The slot is claimed and the cooldown already stamped by the claim
          // above. If the grant below fails the user is out this one turn —
          // the safe direction, and the same trade consumeAllEncounterBoosts
          // makes for the same reason.
          // `levelUp` is carried on the result but is not part of the message —
          // it is split off here so it never reaches Discord as a stray field.
          const { levelUp, ...messageData } = await buildResponseResultMessage(
            userId,
            characterId,
            responseTypeId,
            req.body.message?.components,
          );
          res.send({
            type: InteractionResponseType.UPDATE_MESSAGE,
            data: messageData,
          });

          // The bond scene for a level the user just crossed into
          // (docs/bond-scene-dms.md). Never awaited: the reply above must not
          // wait on Discord's DM endpoints, and a DM that can't be delivered —
          // the ordinary outcome for a user who shares no server with the bot —
          // must never surface as a /roam error. Everything it does is
          // idempotent at the database, so a retried interaction can't double it.
          if (levelUp && !IS_TEST) {
            deliverBondScene(userId, levelUp.characterId, levelUp.levelName)
              .catch(err => console.error('Error delivering bond scene:', err));
          }

          // The flow completed — log it against the command that started it
          // ('meet' or 'roam'), not as a separate 'respond'.
          trackUserActivity(userId).catch(err => console.error('Error tracking user activity:', err));
          trackCommandUsage(userId, commandName).catch(err => console.error('Error tracking command usage:', err));
          trackCharacterEngagement(userId, characterId).catch(err => console.error('Error tracking character engagement:', err));
        } catch (err) {
          console.error('Error in /resp:', err);
          res.send({
            type: InteractionResponseType.UPDATE_MESSAGE,
            data: {
              content: `Error: ${err.message}`,
              flags: 64,
            },
          });
        }
      })();
      return;
    }

    if (action === 'bond') {
      // bond:next:<charId>:<levelSlug>:<beatIndex>
      // bond:choice:<charId>:<levelSlug>:<choiceKey>
      // bond:optout:<charId>:<levelSlug>:x
      // bond:resume:<charId>:<levelSlug>:x
      // bond:replay:<charId>:<levelSlug>:x        (journal button — starts a replay)
      // bond:replaystart:<charId>:<levelSlug>:x   (the closing DM message's own button)
      // bond:rnext:<charId>:<levelSlug>:<beatIndex>    (pages a replay)
      // bond:rchoice:<charId>:<levelSlug>:<choiceKey>  (ends a replay)
      //
      // No user id in the custom_id — the interaction already carries the
      // clicker (req.body.user.id in a DM, member.user.id on the ephemeral
      // journal/resume message), and handleBondClick / handleBondReplayClick
      // ignore a click whose scene row isn't theirs.
      const [kind, charId, levelKey, arg] = rest;

      // Replay: bondScenes.js handleBondReplayClick posts the exact same
      // Continue / choice buttons a live scene does, for real, into the DM —
      // it just never touches bond_scene_progress or bond_keepsakes.
      if (kind === 'replaystart' || kind === 'rnext' || kind === 'rchoice') {
        // These three all live on a message already sitting in the DM (the
        // scene's own closing line, or an earlier replay beat), so the new
        // message landing there is confirmation enough — no followup.
        // `rnext`/`rchoice` grey out the button just used, same as a live
        // beat (see `disabledComponents` above for why not stripped).
        // `replaystart`'s button is left alone — nothing about the ACK
        // changes it — so the scene can be replayed again later.
        res.send(
          kind === 'replaystart'
            ? { type: InteractionResponseType.DEFERRED_UPDATE_MESSAGE }
            : {
                type: InteractionResponseType.UPDATE_MESSAGE,
                data: { components: disabledComponents(req.body.message?.components) },
              },
        );
        handleBondReplayClick(userId, { kind, characterId: charId, levelKey, arg })
          .catch(err => console.error('Error in bond replay:', err));
        return;
      }

      if (kind === 'replay') {
        // The journal's button might not be in the DM at all (/bonds can run
        // in a guild channel), so — unlike the three kinds above — this one
        // gets an explicit confirmation, the same shape as the resume
        // button's: deferred now, answered once the first beat lands or
        // doesn't.
        res.send({
          type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
          data: { flags: 64 }, // EPHEMERAL
        });
        handleBondReplayClick(
          userId,
          { kind, characterId: charId, levelKey, arg },
          { sendFollowup: (messageData) => sendFollowup(req.body.token, messageData, 15000, true) },
        ).catch(err => console.error('Error in bond replay:', err));
        return;
      }

      // ACK, which is the only thing here that uses the interaction. Every
      // bond button — scene or resume — is greyed out via `disabledComponents`
      // rather than stripped; correct for a stale click too, which just greys
      // a dead button and posts nothing.
      res.send({
        type: InteractionResponseType.UPDATE_MESSAGE,
        data: { components: disabledComponents(req.body.message?.components) },
      });

      // Everything after the ACK is a plain bot-token POST into the DM channel
      // stored on the row, with no deadline — which is exactly why a Continue
      // button in a bond scene still works weeks after it was rendered. The
      // webhook below is used only to answer the clicker about the mechanism
      // (the resume button confirming it sent, or explaining why it could not);
      // scene content never travels that way.
      handleBondClick(
        userId,
        { kind, characterId: charId, levelKey, arg },
        { sendFollowup: (messageData) => sendFollowup(req.body.token, messageData) },
      ).catch(err => console.error('Error in bond scene click:', err));
      return;
    }

    if (action === 'mission') {
      // mission:accept:<id>  — the public request's one button (§11)
      // mission:file:<id>    — /docs' Complete mission
      // mission:assist:<id>  — a second user backing up a co-op
      //
      // Answered inline rather than deferred: each is a single RPC round trip,
      // and 'accept' has to reply with UPDATE_MESSAGE to rewrite the shared
      // post, which a deferred ephemeral ack could not do.
      //
      // No user id in the custom_id — the interaction already carries the
      // clicker, and every claim is decided by the RPC against that id.
      const [kind, missionId] = rest;

      // mission:reset:<roam|meet> — spend a banked cooldown reset. Handled
      // apart from the three claim buttons because success here means dropping
      // the caller straight into the command they were blocked on, and those
      // builders live in encounters.js.
      if (kind === 'reset') {
        const command = missionId === 'meet' ? 'meet' : 'roam';

        let result;
        try {
          result = await handleCooldownReset(req.body, command);
        } catch (err) {
          console.error('Error in mission:reset:', err);
          result = {
            refusal: {
              type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
              data: { content: 'Something went wrong there. Try again?', flags: 64 },
            },
          };
        }

        // A refusal is a fresh ephemeral, so the "you're on cooldown" message
        // and its button survive — nothing was spent, and the offer should
        // still be there when it becomes worth taking.
        if (result.refusal) return res.send(result.refusal);

        // Spent. Replace that message in place with the command itself rather
        // than making them run it again — the click already said what they
        // wanted. Deferred because buildRoamDialogueMessage reads affinity and
        // buildMeetPickMessage reads the user's errand, and the spend has
        // already cost one round trip.
        res.send({ type: InteractionResponseType.DEFERRED_UPDATE_MESSAGE });

        (async () => {
          try {
            const messageData = command === 'roam'
              ? await buildRoamDialogueMessage(userId)
              : await buildMeetPickMessage(userId);

            // Say what was actually spent above the prompt. A 'both' reset
            // clears the command they didn't ask about too, and they'd have no
            // way to know that from a /roam prompt appearing on its own.
            await sendFollowup(req.body.token, {
              ...messageData,
              content: `${RESET_SPENT_LINES[result.outcome]}\n\n${messageData.content ?? ''}`.trim(),
            }, 15000, true);
          } catch (err) {
            // The reset is already spent and the cooldown really is clear, so
            // the reward is not lost — say so, and let them run the command.
            console.error('Error rendering after a cooldown reset:', err);
            try {
              await sendFollowup(req.body.token, {
                content: `${RESET_SPENT_LINES[result.outcome]} Something went wrong opening it though — run \`/${command}\` again.`,
                components: [],
              }, 15000, true);
            } catch (followupErr) {
              console.error('Failed to send cooldown reset error followup:', followupErr);
            }
          }
        })();
        return;
      }

      const handlers = {
        accept: handleMissionAccept,
        file: handleMissionFile,
        assist: handleMissionAssistJoin,
      };

      const handler = handlers[kind];
      if (!handler) {
        console.error(`unknown mission component: ${customId}`);
        return res.status(400).json({ error: 'unknown component interaction' });
      }

      let result;
      try {
        result = await handler(req.body, missionId);
      } catch (err) {
        console.error(`Error in mission:${kind}:`, err);
        result = {
          response: {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: { content: 'Something went wrong there. Try again?', flags: 64 },
          },
        };
      }

      res.send(result.response);

      // The reward writes and the cooldown resets, after the click has been
      // answered — a slow mission_log insert must never cost someone their
      // "you picked it up" reply.
      result.afterReply?.().catch(err => console.error(`Error in mission:${kind} follow-up:`, err));
      return;
    }

    console.error(`unknown component interaction: ${customId}`);
    return res.status(400).json({ error: 'unknown component interaction' });
  }

  console.error('unknown interaction type', type);
  return res.status(400).json({ error: 'unknown interaction type' });
});

// Exported (not just started) so tests can spin this up in-process and call
// server.close() afterward — importing app.js otherwise leaves the process
// unable to exit.
export const server = app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});

// Open the presence-only gateway session unless we're under `npm test`, where
// app.js is imported to exercise the HTTP routes and a live Discord connection
// would just leave the process hanging. No-ops too when DISCORD_TOKEN is unset.
// The encounter scheduler is held back for the same reason — it would tick
// against the test's fake Supabase and post to Discord for real.
if (process.env.npm_lifecycle_event !== 'test') {
  startGateway();
  startEncounterScheduler();
}
