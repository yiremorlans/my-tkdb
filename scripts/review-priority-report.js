#!/usr/bin/env node
/**
 * review-priority-report — builds the Character Review Priority dashboard's
 * data file: one row per character with players in each dialogue tier, top
 * affinity and 7-day activity (from character_relationships), plus warm and
 * spark mood beat counts against MOOD_BEAT_TARGET_BY_TIER.
 *
 * Ranked by highest tier any player has reached, then players in that tier,
 * then top affinity.
 *
 * Also counts each character's primary and secondary players: grouping rows
 * by discord_user_id, a player's highest-affinity character is their primary
 * and the next is their secondary (ties go to the more recent interaction).
 * Only the counts are written, never Discord IDs.
 *
 * Reads Supabase with the service role key, so run it with the bot's .env.
 *
 * Writes review-priority.json at the repo root (gitignored). If one is
 * already there, prints what changed since it before overwriting.
 *
 * Usage:
 *   node --env-file=.env scripts/review-priority-report.js
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import { DIALOGUE } from "../constants/dialogue.js";
import { CHARACTERS } from "../constants/characters.js";
import {
  getRelationshipLevel,
  getDialogueTier,
  MOOD_BEAT_TARGET_BY_TIER,
} from "../constants/game.js";

const TIERS = ["new", "known", "warm", "spark", "close", "bound"];
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const PAGE_SIZE = 1000;

const OUT_PATH = new URL("../review-priority.json", import.meta.url);

async function fetchRelationships() {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
  const rows = [];
  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await supabase
      .from("character_relationships")
      .select("discord_user_id, character_id, affinity, last_interaction_at")
      .range(from, from + PAGE_SIZE - 1);
    if (error) throw error;
    rows.push(...data);
    if (data.length < PAGE_SIZE) return rows;
  }
}

function countMoods(beats) {
  return beats.filter((beat) => beat && beat.mood).length;
}

// Variant-keyed pools (Jo's uniform/casual) carry the same beats once per
// outfit, so count one variant rather than summing them.
function moodBeats(characterId, tier) {
  const pool = DIALOGUE[characterId]?.dialogue?.[tier] || [];
  if (Array.isArray(pool)) return countMoods(pool);
  return Math.max(0, ...Object.values(pool).map(countMoods));
}

// Per player, their top two characters by affinity (zero affinity doesn't count).
function countMains(relationships) {
  const byPlayer = new Map();
  for (const r of relationships) {
    if (r.affinity <= 0) continue;
    if (!byPlayer.has(r.discord_user_id)) byPlayer.set(r.discord_user_id, []);
    byPlayer.get(r.discord_user_id).push(r);
  }
  const primary = {};
  const secondary = {};
  for (const rows of byPlayer.values()) {
    rows.sort(
      (a, b) =>
        b.affinity - a.affinity ||
        new Date(b.last_interaction_at) - new Date(a.last_interaction_at),
    );
    const [first, second] = rows;
    primary[first.character_id] = (primary[first.character_id] || 0) + 1;
    if (second) secondary[second.character_id] = (secondary[second.character_id] || 0) + 1;
  }
  return { primary, secondary };
}

function buildRow(character, relationships, now) {
  const counts = Object.fromEntries(TIERS.map((tier) => [tier, 0]));
  let topAffinity = 0;
  for (const { affinity } of relationships) {
    counts[getDialogueTier(getRelationshipLevel(affinity).name)]++;
    topAffinity = Math.max(topAffinity, affinity);
  }
  const topTier = [...TIERS].reverse().find((tier) => counts[tier] > 0) || "new";

  const row = {
    character: character.firstName,
    id: character.id,
    top_tier: topTier,
    players_in_top_tier: counts[topTier],
    top_affinity: topAffinity,
    players: relationships.length,
  };
  for (const tier of TIERS) row[`players_${tier}`] = counts[tier];
  row.active_7d = relationships.filter(
    (r) => now - new Date(r.last_interaction_at).getTime() <= WEEK_MS,
  ).length;
  row.warm_moods = moodBeats(character.id, "warm");
  row.warm_mood_target = MOOD_BEAT_TARGET_BY_TIER.warm;
  row.spark_moods = moodBeats(character.id, "spark");
  row.spark_mood_target = MOOD_BEAT_TARGET_BY_TIER.spark;
  return row;
}

function printChanges(rows, prevRows) {
  const prevById = Object.fromEntries(prevRows.map((row) => [row.id, row]));
  for (const row of rows) {
    const prev = prevById[row.id] || {};
    const changes = Object.keys(row)
      .filter((key) => row[key] !== prev[key])
      .map((key) => `${key} ${prev[key]}→${row[key]}`);
    if (changes.length) console.log(`${row.rank} ${row.id}: ${changes.join(", ")}`);
  }
}

const relationships = await fetchRelationships();
const now = Date.now();
const mains = countMains(relationships);
const rows = CHARACTERS.map((character) => ({
  ...buildRow(
    character,
    relationships.filter((r) => r.character_id === character.id),
    now,
  ),
  players_primary: mains.primary[character.id] || 0,
  players_secondary: mains.secondary[character.id] || 0,
}));
rows.sort(
  (a, b) =>
    TIERS.indexOf(b.top_tier) - TIERS.indexOf(a.top_tier) ||
    b.players_in_top_tier - a.players_in_top_tier ||
    b.top_affinity - a.top_affinity,
);
rows.forEach((row, i) => (row.rank = i + 1));

if (existsSync(OUT_PATH)) printChanges(rows, JSON.parse(readFileSync(OUT_PATH, "utf8")));
writeFileSync(OUT_PATH, JSON.stringify(rows, null, 1));
console.log(`Wrote ${rows.length} rows to review-priority.json`);
