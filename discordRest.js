import 'dotenv/config';

// Bot-initiated channel messages. Everything else in this app answers an
// interaction (utils.js DiscordRequest, app.js sendFollowup); the public
// encounter scheduler is the first thing that starts a message of its own and
// edits it later, which is a different set of endpoints and a different auth
// header (`Bot <token>` rather than an interaction token in the URL).
//
// Requires the bot to actually be a guild member with View Channel + Send
// Messages + Attach Files + Embed Links in the target channel — permission
// integer 52224. See docs/channel-call-response-feature.md.

const API_BASE = 'https://discord.com/api/v10';

const USER_AGENT = 'DiscordBot (https://github.com/discord/discord-example-app, 1.0.0)';

function authHeaders() {
  const token = process.env.DISCORD_TOKEN;
  if (!token) throw new Error('DISCORD_TOKEN is not set — cannot post to a channel');
  return { Authorization: `Bot ${token}`, 'User-Agent': USER_AGENT };
}

async function readError(res) {
  // Discord returns JSON for real API errors and HTML/empty for gateway-level
  // failures; either way we only want it for the log line.
  const body = await res.text().catch(() => '');
  return new Error(`Discord API error: ${res.status} ${body.slice(0, 500)}`);
}

/**
 * POST a new message into a channel. Files ride along as multipart with the
 * rest of the payload in `payload_json`, the same shape sendFollowup uses.
 * Returns the created message object (its `id` is what a later edit needs).
 */
export async function postChannelMessage(channelId, { content, files, embeds, allowed_mentions } = {}) {
  const payload = { content, embeds, allowed_mentions };
  for (const key of Object.keys(payload)) {
    if (payload[key] === undefined) delete payload[key];
  }

  const form = new FormData();
  form.append('payload_json', JSON.stringify(payload));
  (files || []).forEach((file, i) => {
    form.append(`files[${i}]`, new Blob([file.attachment], { type: 'image/png' }), file.name);
  });

  const res = await fetch(`${API_BASE}/channels/${channelId}/messages`, {
    method: 'POST',
    headers: authHeaders(),
    body: form,
  });

  if (!res.ok) throw await readError(res);
  return res.json();
}

/**
 * PATCH an existing message. Plain JSON — this feature never edits a file in.
 *
 * Omitting `attachments` leaves the message's existing attachments alone (the
 * win edit, which keeps the silhouette and adds a reveal embed); passing
 * `attachments: []` removes them (the miss edit, which drops the image).
 */
export async function editChannelMessage(channelId, messageId, body) {
  const res = await fetch(`${API_BASE}/channels/${channelId}/messages/${messageId}`, {
    method: 'PATCH',
    headers: { ...authHeaders(), 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw await readError(res);
  return res.json();
}
