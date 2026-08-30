-- ⚠️  IMPORTANT: This table contains user activity data (Discord IDs)
-- Only expose anonymized/aggregated data in public analytics
-- Never publish raw rows with discord_user_id

-- Character Relationships Table (Affinity Tracking)
-- Tracks affinity scores between users and characters
CREATE TABLE IF NOT EXISTS character_relationships (
  id BIGSERIAL PRIMARY KEY,
  discord_user_id TEXT NOT NULL,
  character_id TEXT NOT NULL,
  affinity INT DEFAULT 0,
  times_met INT DEFAULT 0,
  last_interaction_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_response_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  -- Composite unique constraint to prevent duplicate entries
  UNIQUE(discord_user_id, character_id)
);

-- Indexes for efficient queries
CREATE INDEX IF NOT EXISTS idx_character_relationships_discord_user_id
ON character_relationships(discord_user_id);

CREATE INDEX IF NOT EXISTS idx_character_relationships_character_id
ON character_relationships(character_id);

CREATE INDEX IF NOT EXISTS idx_character_relationships_affinity
ON character_relationships(affinity DESC);

CREATE INDEX IF NOT EXISTS idx_character_relationships_last_interaction
ON character_relationships(last_interaction_at DESC);

-- Composite index for user-character lookups
CREATE INDEX IF NOT EXISTS idx_character_relationships_user_char
ON character_relationships(discord_user_id, character_id);

-- Note: RLS will be enabled in migration 004
