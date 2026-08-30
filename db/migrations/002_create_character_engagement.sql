-- ⚠️  IMPORTANT: This table contains user activity data (Discord IDs)
-- Only expose anonymized/aggregated data in public analytics
-- Never publish raw rows with discord_user_id

-- Character Engagement Analytics Table
-- Tracks per-character usage and popularity metrics
CREATE TABLE IF NOT EXISTS character_engagement (
  id BIGSERIAL PRIMARY KEY,
  discord_user_id TEXT NOT NULL,
  character_id TEXT NOT NULL,
  commands_this_month INT DEFAULT 0,
  total_commands BIGINT DEFAULT 0,
  last_interacted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  -- Composite unique constraint to prevent duplicate entries
  UNIQUE(discord_user_id, character_id)
);

-- Indexes for analytics queries
CREATE INDEX IF NOT EXISTS idx_character_engagement_discord_user_id
ON character_engagement(discord_user_id);

CREATE INDEX IF NOT EXISTS idx_character_engagement_character_id
ON character_engagement(character_id);

CREATE INDEX IF NOT EXISTS idx_character_engagement_total_commands
ON character_engagement(total_commands DESC);

CREATE INDEX IF NOT EXISTS idx_character_engagement_last_interacted
ON character_engagement(last_interacted_at DESC);

-- Composite index for user-character lookups
CREATE INDEX IF NOT EXISTS idx_character_engagement_user_char
ON character_engagement(discord_user_id, character_id);

-- Enable Row Level Security
ALTER TABLE character_engagement ENABLE ROW LEVEL SECURITY;

-- Policy: Service role (bot backend) writes via bypass; direct queries see nothing
-- This protects raw user data while allowing backend writes via service role key
CREATE POLICY "Block direct access" ON character_engagement
  FOR SELECT
  USING (FALSE);
