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
 *
 * `components` matter for bond scenes (docs/bond-scene-dms.md): every beat of a
 * scene is posted here, with the bot token, rather than through an interaction
 * webhook — which is exactly why a scene's Continue button never expires.
 */
export async function postChannelMessage(
  channelId,
  { content, files, embeds, components, allowed_mentions } = {},
) {
  const payload = { content, embeds, components, allowed_mentions };
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

/**
 * Open (or re-open) the DM channel with a user and return its id.
 *
 * Discord dedupes these server-side — asking twice for the same recipient gives
 * back the same channel — so there is nothing to cache locally beyond the id we
 * store on the scene row.
 *
 * A bot can only DM someone it shares a guild with. This app is dual-install, so
 * a user who added it only as a user app and never joined a server with the bot
 * cannot be reached: that surfaces as a 403 here, or on the first POST into the
 * channel. Callers treat it as a soft failure and fall back to an ephemeral
 * reply, never as an error — it is the expected outcome for a chunk of the user
 * base, not a fault.
 */
export async function openDmChannel(userId) {
  const res = await fetch(`${API_BASE}/users/@me/channels`, {
    method: 'POST',
    headers: { ...authHeaders(), 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({ recipient_id: userId }),
  });

  if (!res.ok) throw await readError(res);
  const channel = await res.json();
  return channel.id;
}

/**
 * Show the "typing…" indicator in a channel for a few seconds. Pure flavour, so
 * every caller fires it without awaiting and ignores what it returns — a bond
 * scene beat must never fail to post because the typing hint didn't.
 */
export async function postChannelTyping(channelId) {
  const res = await fetch(`${API_BASE}/channels/${channelId}/typing`, {
    method: 'POST',
    headers: authHeaders(),
  });

  if (!res.ok) throw await readError(res);
}
