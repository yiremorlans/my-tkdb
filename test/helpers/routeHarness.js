// Shared plumbing for the route tests that drive a real running app.js over
// HTTP: a signed POST to /interactions, a polling wait for work app.js
// finishes after its ack, and a global fetch stub so nothing reaches Discord.
import { signInteraction } from './discordSign.js';

export async function postSignedInteraction(port, privateKey, body) {
  const bodyString = JSON.stringify(body);
  const { timestamp, signature } = await signInteraction(privateKey, bodyString);
  return fetch(`http://localhost:${port}/interactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Signature-Ed25519': signature,
      'X-Signature-Timestamp': timestamp,
    },
    body: bodyString,
  });
}

export async function waitFor(predicate, { timeout = 2000, interval = 10 } = {}) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    if (predicate()) return;
    await new Promise((r) => setTimeout(r, interval));
  }
  throw new Error('waitFor timed out');
}

// Replaces global fetch: requests to the app under test on localhost:<port>
// pass through, discord.com calls are recorded as { url, method,
// isOriginalEdit, payload } and answered with `status(call)` (200 by default),
// and anything else throws. Call restore() in test.after.
export function stubDiscordFetch(port, { status = () => 200 } = {}) {
  const originalFetch = globalThis.fetch;
  const calls = [];

  globalThis.fetch = async (input, opts = {}) => {
    const url = typeof input === 'string' ? input : input.url;

    if (url.includes(`localhost:${port}`)) return originalFetch(input, opts);

    if (url.includes('discord.com/api')) {
      let payload = null;
      if (opts.body instanceof FormData) {
        const raw = opts.body.get('payload_json');
        payload = raw ? JSON.parse(raw) : null;
      } else if (typeof opts.body === 'string') {
        payload = JSON.parse(opts.body);
      }
      const call = {
        url,
        method: opts.method || 'GET',
        isOriginalEdit: url.endsWith('/messages/@original'),
        payload,
      };
      calls.push(call);
      return new Response(JSON.stringify({ id: 'stub-message' }), {
        status: status(call),
        headers: { 'Content-Type': 'application/json' },
      });
    }

    throw new Error(`unexpected fetch in test: ${url}`);
  };

  return {
    calls,
    restore: () => {
      globalThis.fetch = originalFetch;
    },
  };
}
