-- Persistent relationship/affinity state, per Discord user per character.
--
-- character_id is a plain string matching a character's `id` in
-- constants/characters.js — intentionally no foreign key, since the
-- character/dialogue catalog lives in code (constants/*.js), not the
-- database. Adding a new character or dialogue line is a code change only,
-- never a migration.

CREATE TABLE IF NOT EXISTS character_relationships (
  discord_user_id TEXT NOT NULL,
  character_id TEXT NOT NULL,
  affinity INTEGER NOT NULL DEFAULT 0,
  times_met INTEGER NOT NULL DEFAULT 0,
  last_response_type TEXT,
  first_met_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_interaction_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (discord_user_id, character_id)
);

CREATE INDEX IF NOT EXISTS character_relationships_user_idx
  ON character_relationships (discord_user_id);
