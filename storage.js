// JSON-file-backed relationship storage. When this moves to Postgres
// (see db/schema.sql), a replacement module just needs to export the same
// two functions with the same shapes so encounters.js doesn't change.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { getRelationshipLevel } from './constants/game.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, 'data');
const DATA_FILE = join(DATA_DIR, 'relationships.json');

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

export function getRelationship(userId, characterId) {
  const store = readStore();
  return store[userId]?.[characterId] || { affinity: 0, timesMet: 0 };
}

// Records a dialogue response and applies the given affinity gain (0-2,
// computed by the caller via getAffinityForResponse). Returns the updated
// relationship.
export function recordResponse(userId, characterId, gain) {
  const store = readStore();
  if (!store[userId]) store[userId] = {};
  const existing = store[userId][characterId] || { affinity: 0, timesMet: 0 };

  const updated = {
    affinity: existing.affinity + gain,
    timesMet: existing.timesMet + 1,
  };

  store[userId][characterId] = updated;
  writeStore(store);

  return { ...updated, gain, level: getRelationshipLevel(updated.affinity) };
}
