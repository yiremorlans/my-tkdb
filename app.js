import 'dotenv/config';
import express from 'express';
import {
  InteractionResponseType,
  InteractionType,
  verifyKeyMiddleware,
} from 'discord-interactions';
import {
  buildAffinityMessage,
  buildHouseMessage,
  buildMeetPickMessage,
  buildMeetSpawnMessage,
  buildResponseResultMessage,
  buildRoamDialogueMessage,
  buildRoamSpawnMessage,
} from './encounters.js';
import { checkCommandLimit, recordCommandUsage } from './commandLimits.js';
import {
  trackUserActivity,
  trackCharacterEngagement,
  trackCommandUsage,
} from './db/supabase.js';
import { validateContent } from './constants/validateContent.js';

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
      const limit = await checkCommandLimit(userId, 'roam');
      if (!limit.allowed) {
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: limit.reason,
            flags: 64, // EPHEMERAL
          },
        });
      }
      // Build and respond immediately (no await). User activity is only counted
      // once an encounter actually loads (the roam/spawn button below), not for
      // opening the prompt.
      try {
        const messageData = await buildRoamDialogueMessage(userId);
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: messageData,
        });
      } catch (err) {
        console.error('Error in /roam:', err);
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
      const limit = await checkCommandLimit(userId, 'meet');
      if (!limit.allowed) {
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: limit.reason,
            flags: 64, // EPHEMERAL
          },
        });
      }
      // User activity is only counted once a character actually loads (the
      // meet/pick button below), not for opening the picker.
      const messageData = buildMeetPickMessage();
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: messageData,
      });
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
      // Same as /affinity: the emblem is an attachment, so ack then follow up.
      res.send({ type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE });

      (async () => {
        try {
          const messageData = await buildHouseMessage(userId);
          await sendFollowup(req.body.token, messageData, 15000, true);

          // Track user activity and command usage
          trackUserActivity(userId).catch(err => console.error('Error tracking user activity:', err));
          trackCommandUsage(userId, 'house').catch(err => console.error('Error tracking command usage:', err));
        } catch (err) {
          console.error('Error in /house:', err);
          try {
            await sendFollowup(req.body.token, {
              content: 'Something went wrong working out your house. Try again?',
            }, 15000, true);
          } catch (followupErr) {
            console.error('Failed to send error followup:', followupErr);
          }
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

      (async () => {
        try {
          const messageData = await buildResponseResultMessage(
            userId,
            characterId,
            responseTypeId,
            req.body.message?.components,
          );
          res.send({
            type: InteractionResponseType.UPDATE_MESSAGE,
            data: messageData,
          });

          // The flow completed — record it once, against the command that
          // started it ('meet' or 'roam'), not as a separate 'respond'. This is
          // also where the rolling cooldown clock starts (recordCommandUsage).
          const commandName = origin === 'roam' ? 'roam' : 'meet';
          recordCommandUsage(userId, commandName).catch(err => console.error('Error recording command cooldown:', err));
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
