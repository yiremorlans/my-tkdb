import 'dotenv/config';
import express from 'express';
import {
  InteractionResponseType,
  InteractionType,
  verifyKeyMiddleware,
} from 'discord-interactions';
import {
  buildMeetPickMessage,
  buildMeetSpawnMessage,
  buildResponseResultMessage,
  buildRoamDialogueMessage,
  buildRoamSpawnMessage,
  getCachedRoamEncounter,
} from './encounters.js';
import { checkCommandLimit, resetCommandLimit } from './commandLimits.js';
import {
  trackUserActivity,
  trackCharacterEngagement,
} from './db/supabase.js';

// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;

// Serve character/background art so Discord can load it by URL in message components
app.use('/assets', express.static('assets'));

async function sendFollowup(interactionToken, messageData, timeoutMs = 15000) {
  const url = `https://discord.com/api/v10/webhooks/${process.env.APP_ID}/${interactionToken}`;
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
      method: 'POST',
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
      const limit = checkCommandLimit(userId, 'roam');
      if (!limit.allowed) {
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: limit.reason,
            flags: 64, // EPHEMERAL
          },
        });
      }
      // Track user activity (fire and forget)
      trackUserActivity(userId).catch(err => console.error('Error tracking user activity:', err));

      // Build and respond immediately (no await)
      const messageData = await buildRoamDialogueMessage(userId);
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: messageData,
      });
    }

    if (name === 'meet') {
      const limit = checkCommandLimit(userId, 'meet');
      if (!limit.allowed) {
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: limit.reason,
            flags: 64, // EPHEMERAL
          },
        });
      }
      // Track user activity
      trackUserActivity(userId).catch(err => console.error('Error tracking user activity:', err));

      const messageData = buildMeetPickMessage();
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: messageData,
      });
    }

    if (name === 'testlimit') {
      resetCommandLimit(userId);
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: '✅ Command limits reset! You can now use `/roam` and `/meet` again.',
          flags: 64, // EPHEMERAL
        },
      });
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
          // Track character engagement
          trackCharacterEngagement(userId, characterId).catch(err => console.error('Error tracking character engagement:', err));

          const messageData = await buildMeetSpawnMessage(userId, characterId);
          await sendFollowup(req.body.token, messageData);
          clearTimeout(timeoutHandle);
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
      res.send({ type: InteractionResponseType.DEFERRED_UPDATE_MESSAGE });

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

          // Track character engagement for roam encounter
          const encounter = getCachedRoamEncounter(encounterId);
          if (encounter?.character?.id) {
            trackCharacterEngagement(userId, encounter.character.id).catch(err => console.error('Error tracking character engagement:', err));
          }

          await sendFollowup(req.body.token, messageData);
          clearTimeout(timeoutHandle);
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
      const [characterId, responseTypeId] = rest;

      (async () => {
        try {
          const messageData = await buildResponseResultMessage(userId, characterId, responseTypeId);
          res.send({
            type: InteractionResponseType.UPDATE_MESSAGE,
            data: messageData,
          });
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

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
