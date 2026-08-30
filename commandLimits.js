import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, 'data');
const DATA_FILE = join(DATA_DIR, 'commandLimits.json');

// Each command (roam/meet) can be used once every 3 hours, tracked per user.
// This is a rolling cooldown against the bot server's clock, so it doesn't
// depend on the invoking user's timezone (which Discord doesn't give us).
const COOLDOWN_MS = 3 * 60 * 60 * 1000;

function readStore() {
  if (!existsSync(DATA_FILE)) return {};
  try {
    return JSON.parse(readFileSync(DATA_FILE, 'utf-8'));
  } catch {
    return {};
  }
}

function writeStore(store) {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(DATA_FILE, JSON.stringify(store, null, 2));
}

// Reset command limits for a user (for testing).
export function resetCommandLimit(userId, command = null) {
  const store = readStore();
  if (!store[userId]) return false;

  if (command) {
    store[userId][command] = { lastUsed: null };
  } else {
    store[userId] = {};
  }

  writeStore(store);
  return true;
}

// Turn a millisecond span into a short "2h 15m" / "45m" string.
function formatDuration(ms) {
  const totalMinutes = Math.max(1, Math.ceil(ms / 60000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours && minutes) return `${hours}h ${minutes}m`;
  if (hours) return `${hours}h`;
  return `${minutes}m`;
}

// Check if the user can use a command right now. Returns { allowed, reason }.
export function checkCommandLimit(userId, command, now = new Date()) {
  const store = readStore();
  if (!store[userId]) store[userId] = {};
  if (!store[userId][command]) store[userId][command] = { lastUsed: null };

  const lastUsedRaw = store[userId][command].lastUsed;
  const lastUsed = lastUsedRaw ? new Date(lastUsedRaw).getTime() : null;
  const elapsed = lastUsed === null ? Infinity : now.getTime() - lastUsed;

  // Never used, or the 3-hour cooldown has fully elapsed.
  if (elapsed >= COOLDOWN_MS) {
    store[userId][command].lastUsed = now.toISOString();
    writeStore(store);
    return { allowed: true };
  }

  // Still cooling down.
  const readyAt = new Date(lastUsed + COOLDOWN_MS);
  const clockTime = readyAt.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
  return {
    allowed: false,
    reason: `You can use /${command} again in ${formatDuration(
      COOLDOWN_MS - elapsed,
    )} (around ${clockTime}).`,
  };
}
