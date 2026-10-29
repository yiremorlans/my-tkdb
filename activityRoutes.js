// Hangout Activity API: /api/activity/*, the server side of the Discord
// Activity (docs/hangout-activity.md §5.1, §6). For now only the OAuth
// token exchange; the state and spend-time routes land with milestone 3.
//
// Until release (milestone 4) the hangout is owner-only: it's launched from
// `/encdev hangout` (publicEncounters.js handleEncounterDevHangout), and this
// route refuses a session to anyone but OWNER_DISCORD_ID, which also covers
// someone joining the owner's running Activity from the voice channel.
//
// Sessions are a short-lived HMAC-signed token sent as a Bearer header, not a
// cookie: cookies are unreliable inside Discord's Activity iframe. The
// Discord user id a later route acts on comes only from a verified session
// token (verifySessionToken), never from a request body.

import crypto from 'node:crypto';
import express from 'express';

const DISCORD_API = 'https://discord.com/api/v10';

export const SESSION_TTL_MS = 60 * 60 * 1000;

// An OAuth code is ~30 chars; anything far longer isn't one, and isn't worth
// forwarding to Discord.
const MAX_CODE_LENGTH = 512;

const OWNER_ONLY = true;

const base64url = (value) => Buffer.from(value).toString('base64url');

function sessionSignature(payload, secret) {
  return crypto.createHmac('sha256', secret).update(payload).digest();
}

/**
 * A signed session token for `userId`, valid for SESSION_TTL_MS:
 * `<base64url payload>.<base64url HMAC-SHA256>`, payload `{ sub, exp }` with
 * `exp` in epoch ms.
 */
export function signSessionToken(userId, secret, now = new Date()) {
  const payload = base64url(JSON.stringify({ sub: userId, exp: now.getTime() + SESSION_TTL_MS }));
  return `${payload}.${sessionSignature(payload, secret).toString('base64url')}`;
}

/**
 * The Discord user id in a session token, or null when it's malformed,
 * signed with another secret, or expired. Never throws.
 */
export function verifySessionToken(token, secret, now = new Date()) {
  if (typeof token !== 'string' || !secret) return null;
  const [payload, signature, ...rest] = token.split('.');
  if (!payload || !signature || rest.length) return null;
  const expected = sessionSignature(payload, secret);
  const given = Buffer.from(signature, 'base64url');
  if (given.length !== expected.length || !crypto.timingSafeEqual(given, expected)) return null;
  try {
    const { sub, exp } = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (typeof sub !== 'string' || typeof exp !== 'number' || exp <= now.getTime()) return null;
    return sub;
  } catch {
    return null;
  }
}

// --- POST /api/activity/token ---------------------------------------------

const DISCORD_UNAVAILABLE = { status: 502, body: { error: 'discord_unavailable' } };

// One call to Discord: `{ status, json }`, with json null unless it answered
// 2xx with a body. status is 0 when the request never got an answer. Every
// failure is logged under `label`: a 4xx as a warning (usually a stale or
// replayed code), the rest as errors.
async function discordJson(label, fetchFn, url, init) {
  try {
    const res = await fetchFn(url, init);
    if (!res.ok) {
      const log = res.status < 500 ? console.warn : console.error;
      log(`[activity] ${label} rejected: HTTP ${res.status}`);
      return { status: res.status, json: null };
    }
    const json = await res.json();
    if (json == null) console.error(`[activity] ${label} returned no body`);
    return { status: res.status, json };
  } catch (err) {
    console.error(`[activity] ${label} failed: ${err.message}`);
    return { status: 0, json: null };
  }
}

/**
 * Exchanges the code from the SDK's `authorize()` for a Discord access token,
 * looks the user up with it, and returns `{ status, body }` for the router to
 * send. On success the body carries the access token (for the SDK's
 * `authenticate()`), a session token for our own routes, and the user.
 * Expected failures (no code, a code Discord rejects, anyone but the owner
 * while OWNER_ONLY) are 4xx bodies, not exceptions. No redirect_uri: Activity codes are issued without one.
 */
export async function handleActivityToken(body, { fetchFn = fetch, env = process.env } = {}, now = new Date()) {
  const code = body?.code;
  if (typeof code !== 'string' || !code || code.length > MAX_CODE_LENGTH) {
    return { status: 400, body: { error: 'missing_code' } };
  }
  const { APP_ID, DISCORD_CLIENT_SECRET, ACTIVITY_SESSION_SECRET } = env;
  if (!APP_ID || !DISCORD_CLIENT_SECRET || !ACTIVITY_SESSION_SECRET) {
    console.error('[activity] APP_ID, DISCORD_CLIENT_SECRET or ACTIVITY_SESSION_SECRET is unset');
    return { status: 500, body: { error: 'not_configured' } };
  }

  const exchange = await discordJson('token exchange', fetchFn, `${DISCORD_API}/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: APP_ID,
      client_secret: DISCORD_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code,
    }),
  });
  // A code Discord turns down is the caller's problem; anything else is ours.
  if (exchange.status >= 400 && exchange.status < 500) return { status: 401, body: { error: 'invalid_code' } };
  const accessToken = exchange.json?.access_token;
  if (typeof accessToken !== 'string') return DISCORD_UNAVAILABLE;

  const me = await discordJson('users/@me', fetchFn, `${DISCORD_API}/users/@me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const user = me.json;
  if (typeof user?.id !== 'string') return DISCORD_UNAVAILABLE;

  if (OWNER_ONLY && (!env.OWNER_DISCORD_ID || user.id !== env.OWNER_DISCORD_ID)) {
    console.warn(`[activity] session refused for ${user.id}: owner only`);
    return { status: 403, body: { error: 'not_available' } };
  }

  return {
    status: 200,
    body: {
      access_token: accessToken,
      session_token: signSessionToken(user.id, ACTIVITY_SESSION_SECRET, now),
      expires_in: SESSION_TTL_MS / 1000,
      user: { id: user.id, username: user.username, global_name: user.global_name ?? null },
    },
  };
}

// --- router ---------------------------------------------------------------

// JSON parsing is scoped to these routes: /interactions verifies Discord's
// signature over the raw body, so a global express.json() would break it.
export const activityRouter = express.Router();
activityRouter.use(express.json({ limit: '4kb' }));

activityRouter.post('/token', async (req, res) => {
  const { status, body } = await handleActivityToken(req.body);
  res.status(status).json(body);
});
