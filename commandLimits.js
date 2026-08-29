import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, 'data');
const DATA_FILE = join(DATA_DIR, 'commandLimits.json');

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

// Determine if current time is in AM (before 6 PM) or PM (6 PM or after).
export function getPeriod(now = new Date()) {
  return now.getHours() >= 18 ? 'pm' : 'am';
}

// Format today's date as YYYY-MM-DD for comparison.
function getDateString(now = new Date()) {
  return now.toISOString().split('T')[0];
}

// Reset command limits for a user (for testing).
export function resetCommandLimit(userId, command = null) {
  const store = readStore();
  if (!store[userId]) return false;

  if (command) {
    store[userId][command] = { am: null, pm: null };
  } else {
    store[userId] = {};
  }

  writeStore(store);
  return true;
}

// Check if the user can use a command right now. Returns { allowed, reason }.
// Each command (roam/meet) can be used once per period (AM/PM) per day.
export function checkCommandLimit(userId, command, now = new Date()) {
  const store = readStore();
  if (!store[userId]) store[userId] = {};
  if (!store[userId][command]) store[userId][command] = { am: null, pm: null };

  const period = getPeriod(now);
  const today = getDateString(now);
  const lastUsed = store[userId][command][period];

  // If never used in this period, or last used on a different day, allow it.
  if (!lastUsed || lastUsed !== today) {
    store[userId][command][period] = today;
    writeStore(store);
    return { allowed: true };
  }

  // Already used in this period today.
  let nextWindow;
  if (period === 'am') {
    nextWindow = 'after 6 PM today';
  } else {
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    nextWindow = `after midnight (${tomorrowStr})`;
  }
  return {
    allowed: false,
    reason: `You've already used /${command} in this time period. You can use it again ${nextWindow}.`,
  };
}
