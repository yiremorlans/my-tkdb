#!/usr/bin/env node
/**
 * warm-expressions — pre-warms Discord's media proxy for the expression art,
 * so a player's first /call scene portrait comes from Discord's CDN instead of
 * a cold fetch from our server. The proxy caches by source URL no matter who
 * triggered the fetch, so the bot DMs the URLs to you in media galleries (the
 * same component the scenes use), waits for them to load, then deletes them.
 *
 * Discord never confirms the proxy finished fetching, so WAIT_MS is a guess.
 * The proxy may also evict art nobody views for a while; rerun after adding or
 * editing art (an edited file keeps its URL, so rename it to bust the cache).
 *
 * Usage:
 *   node scripts/warm-expressions.js <your discord user id>             # all
 *   node scripts/warm-expressions.js <id> jin edward                    # characters
 *   node scripts/warm-expressions.js <id> jin/annoyed.png               # one file
 *
 * Needs DISCORD_TOKEN and BASE_URL (the deployed URL, not localhost) in .env,
 * and the bot must share a server with you to DM you.
 */
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { MessageComponentTypes, InteractionResponseFlags } from 'discord-interactions';
import { openDmChannel } from '../discordRest.js';

const API_BASE = 'https://discord.com/api/v10';
const EXPRESSIONS_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'assets', 'expressions');
const GALLERY_MAX = 10;
const WAIT_MS = 10_000;
const POST_GAP_MS = 1_200;

const [userId, ...filters] = process.argv.slice(2);
if (!/^\d+$/.test(userId || '')) {
  console.error('Usage: node scripts/warm-expressions.js <your discord user id> [character | character/file.png ...]');
  process.exit(1);
}

const baseUrl = process.env.BASE_URL || '';
if (!/^https?:\/\//i.test(baseUrl) || /localhost|127\.0\.0\.1/.test(baseUrl)) {
  console.error(`BASE_URL must be the deployed https URL Discord fetches from (got "${baseUrl}")`);
  process.exit(1);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// One retry loop for both posts and deletes: DMs share a per-channel limit, and
// a 429 tells us exactly how long to back off.
async function api(method, route, body) {
  for (;;) {
    const res = await fetch(`${API_BASE}${route}`, {
      method,
      headers: {
        Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
        ...(body ? { 'Content-Type': 'application/json' } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (res.status === 429) {
      const { retry_after = 1 } = await res.json().catch(() => ({}));
      await sleep(retry_after * 1000 + 100);
      continue;
    }
    if (!res.ok) throw new Error(`${method} ${route} → ${res.status} ${(await res.text()).slice(0, 300)}`);
    return res.status === 204 ? null : res.json();
  }
}

function expressionPaths() {
  const all = fs.readdirSync(EXPRESSIONS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .flatMap((d) => fs.readdirSync(path.join(EXPRESSIONS_DIR, d.name))
      .filter((f) => f.endsWith('.png'))
      .map((f) => `${d.name}/${f}`))
    .sort();
  if (!filters.length) return all;
  return all.filter((p) => filters.some((f) => p === f || p.startsWith(`${f}/`)));
}

const files = expressionPaths();
if (!files.length) {
  console.error(`No expression files match: ${filters.join(', ')}`);
  process.exit(1);
}

const batches = [];
for (let i = 0; i < files.length; i += GALLERY_MAX) batches.push(files.slice(i, i + GALLERY_MAX));

const channelId = await openDmChannel(userId);
console.log(`Warming ${files.length} expressions in ${batches.length} DMs…`);

const posted = [];
for (const [i, batch] of batches.entries()) {
  const message = await api('POST', `/channels/${channelId}/messages`, {
    flags: InteractionResponseFlags.IS_COMPONENTS_V2,
    components: [{
      type: MessageComponentTypes.MEDIA_GALLERY,
      items: batch.map((p) => ({ media: { url: `${baseUrl}/assets/expressions/${p}` } })),
    }],
  });
  posted.push(message.id);
  console.log(`  [${i + 1}/${batches.length}] ${batch[0]} … ${batch.at(-1)}`);
  await sleep(POST_GAP_MS);
}

console.log(`Waiting ${WAIT_MS / 1000}s for Discord to fetch them…`);
await sleep(WAIT_MS);

for (const id of posted) await api('DELETE', `/channels/${channelId}/messages/${id}`);
console.log('Done. Warm-up DMs deleted.');
