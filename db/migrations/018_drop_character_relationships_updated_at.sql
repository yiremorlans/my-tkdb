-- Drop the dead `updated_at` column on character_relationships.
--
-- Why it is dead
-- --------------
-- Migration 000 created it with DEFAULT now(), but nothing has ever written it
-- since:
--   * The three update paths in db/supabase.js — updateAffinity,
--     incrementTimesMet, updateLastResponseType — all stamp
--     `last_interaction_at` and leave `updated_at` alone.
--   * There is no BEFORE UPDATE trigger on the table.
--   * character_relationships has no monthly reset (its counters are
--     cumulative), so migration 005 never touches it either.
-- Result: on every row `updated_at` equals `created_at` and never moves, which
-- actively misleads anyone who queries it expecting a freshness signal.
-- `last_interaction_at` already is the domain "last touched" timestamp, and it
-- has its own index (idx_character_relationships_last_interaction).
--
-- This does NOT touch character_engagement.updated_at, which is genuinely
-- maintained (the upsert in trackCharacterEngagement writes it, and the monthly
-- reset in migration 005 bumps it without touching last_interacted_at — the one
-- case the two columns legitimately diverge).
--
-- Locking: DROP COLUMN is a catalog-only change in Postgres — the column is
-- marked dropped, the table is not rewritten. It takes ACCESS EXCLUSIVE on the
-- table for the duration, which on this small analytics table is instant.
-- Existing views (vw_platform_stats, vw_characters_by_affinity) reference only
-- `affinity` and the id columns, so none need recreating.

ALTER TABLE character_relationships
  DROP COLUMN IF EXISTS updated_at;
