// Hangout Activity: Discord detection, Embedded App SDK start-up and sign-in
// (docs/hangout-activity.md §4.5, §6). The caller checks inDiscord() first;
// outside Discord the same build runs as a plain page with data features
// off.
//
// Flow: new DiscordSDK → ready() → authorize (identify) → POST
// /api/activity/token (activityRoutes.js handleActivityToken) →
// authenticate(). The session token that comes back is what milestone 3's
// /api/activity/* calls send as a Bearer header; cookies are unreliable in
// Discord's iframe.

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
 * Resolves to `{ sdk, user, sessionToken }`. Throws if any step of
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
  const { access_token: accessToken, session_token: sessionToken, user } = await res.json();

  await sdk.commands.authenticate({ access_token: accessToken });
  return { sdk, user, sessionToken };
}
