// Hangout Activity: Discord detection, Embedded App SDK start-up and sign-in
// (docs/hangout-activity.md §4.5, §6). The caller checks inDiscord() first;
// outside Discord the same build runs as a plain page with data features
// off.
//
// Flow: new DiscordSDK → ready() → authorize (identify) → POST
// /api/activity/token (activityRoutes.js handleActivityToken) →
// authenticate(). The session token that comes back is what the other
// /api/activity/* calls send as a Bearer header; cookies are unreliable in
// Discord's iframe. A session is `{ token, expiresIn }` (seconds), plus the
// SDK's instance id for the /meet encounter.

// Baked in at build time from APP_ID (vite.config.js `define`).
const CLIENT_ID = __DISCORD_CLIENT_ID__;

const query = new URLSearchParams(location.search);

/**
 * True inside Discord's Activity iframe: Discord launches it with frame_id,
 * instance_id and platform in the query, and the SDK refuses to start
 * without them.
 */
export function inDiscord() {
  return window.parent !== window && query.has("frame_id") && query.has("instance_id");
}

/** "mobile" or "desktop" inside Discord; null in a plain browser. */
export function discordPlatform() {
  return inDiscord() ? query.get("platform") : null;
}

/**
 * Starts the SDK and signs the user in; call it only when inDiscord().
 * Resolves to `{ sdk, user, session }`. Throws if any step of
 * the handshake fails; a refusal from the token route carries its HTTP
 * `status` (403: not the owner while the hangout is owner-only).
 */
export async function startDiscord() {
  if (!CLIENT_ID) throw new Error("no client id: APP_ID was unset when the Activity was built");

  // Loaded only here so the plain page never fetches the SDK.
  const { DiscordSDK } = await import("@discord/embedded-app-sdk");
  const sdk = new DiscordSDK(CLIENT_ID);
  await sdk.ready();

  const { code } = await sdk.commands.authorize({
    client_id: CLIENT_ID,
    response_type: "code",
    state: "",
    prompt: "none",
    scope: ["identify"],
  });

  // Root-relative: /api is one of the Activity's URL mappings, so inside
  // Discord this goes through its proxy to the bot's server.
  const res = await fetch("/api/activity/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });
  if (!res.ok) throw Object.assign(new Error(`token exchange: HTTP ${res.status}`), { status: res.status });
  const { access_token: accessToken, session_token: token, expires_in: expiresIn, user } = await res.json();

  await sdk.commands.authenticate({ access_token: accessToken });
  return { sdk, user, session: { token, expiresIn, instanceId: sdk.instanceId } };
}

const bearer = (session) => ({ Authorization: `Bearer ${session.token}` });

/**
 * What this launch opens (activityRoutes.js GET /launch): `{ version, dev }`.
 * `dev` is an `/encdev hangout` launch (the free hangout, in `version`);
 * otherwise it's a /meet encounter in Live2D. Falls back to the encounter if
 * the route can't answer, so a launch never fails on it.
 */
export async function launchInfo(session) {
  try {
    const res = await fetch("/api/activity/launch", { headers: bearer(session) });
    const { version, dev } = res.ok ? await res.json() : {};
    return { version: version === "v1" ? "v1" : "v2", dev: dev === true };
  } catch (err) {
    console.warn(`[discord] launch info unavailable: ${err.message}`);
    return { version: "v2", dev: false };
  }
}

// The click saves the encounter just after the launch, so the first ask can
// beat it to the database: ask a few times before calling it missing.
const ENCOUNTER_TRIES = 5;
const ENCOUNTER_RETRY_MS = 1000;

/**
 * This user's /meet encounter in this instance (GET /api/activity/encounter),
 * or null when they have none of their own here. Throws on anything else.
 */
export async function loadEncounter(session) {
  const q = new URLSearchParams(session.instanceId ? { instance: session.instanceId } : {});
  for (let attempt = 1; ; attempt++) {
    const res = await fetch(`/api/activity/encounter?${q}`, { headers: bearer(session) });
    if (res.ok) return res.json();
    if (res.status !== 404) throw new Error(`encounter: HTTP ${res.status}`);
    if (attempt >= ENCOUNTER_TRIES) return null;
    await new Promise((resolve) => setTimeout(resolve, ENCOUNTER_RETRY_MS));
  }
}

/**
 * Answers the encounter (POST /api/activity/answer): the result to show, or
 * `{ refused }` with the line for a cooldown or an encounter already
 * answered. Throws when it should be tried again (no network, an expired
 * session, a server error); the encounter is untouched then.
 */
export async function answerEncounter(session, encounterId, type) {
  const res = await fetch("/api/activity/answer", {
    method: "POST",
    headers: { ...bearer(session), "Content-Type": "application/json" },
    body: JSON.stringify({ encounter: encounterId, type }),
  });
  const body = await res.json().catch(() => ({}));
  if (res.ok) return body;
  if (res.status === 409) return { refused: body.reason };
  if (res.status === 404) return { refused: "That moment's already passed. Use /meet to find someone new." };
  throw new Error(`answer: HTTP ${res.status}`);
}

/**
 * Keeps `session` signed in while an answer is pending (§11.2): renews the
 * token (POST /api/activity/renew) a while before it runs out, and retries a
 * failed renewal every minute while the token is still good. Returns a
 * function that stops it.
 */
export function keepSessionAlive(session) {
  let timer;
  const schedule = (ms) => (timer = setTimeout(renew, Math.max(ms, 1000)));
  async function renew() {
    try {
      const res = await fetch("/api/activity/renew", { method: "POST", headers: bearer(session) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const { session_token: token, expires_in: expiresIn } = await res.json();
      Object.assign(session, { token, expiresIn });
      schedule(expiresIn * 750);
    } catch (err) {
      console.warn(`[discord] session renewal failed: ${err.message}`);
      schedule(60 * 1000);
    }
  }
  schedule((session.expiresIn ?? 3600) * 750);
  return () => clearTimeout(timer);
}
