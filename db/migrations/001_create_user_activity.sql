-- ⚠️  IMPORTANT: This table contains user activity data (Discord IDs)
-- Only expose anonymized/aggregated data in public analytics
-- Never publish raw rows with discord_user_id

-- User Activity Tracking Table
-- Tracks overall user engagement and usage patterns
CREATE TABLE IF NOT EXISTS user_activity (
  id BIGSERIAL PRIMARY KEY,
  discord_user_id TEXT NOT NULL UNIQUE,
  last_used_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  commands_this_month INT DEFAULT 0,
  total_commands BIGINT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for quick lookups by user
CREATE INDEX IF NOT EXISTS idx_user_activity_discord_user_id
ON user_activity(discord_user_id);

-- Index for finding active users
CREATE INDEX IF NOT EXISTS idx_user_activity_last_used_at
ON user_activity(last_used_at DESC);

-- Enable Row Level Security
ALTER TABLE user_activity ENABLE ROW LEVEL SECURITY;

-- Policy: Service role (bot backend) writes via bypass; direct queries see nothing
-- This protects raw user data while allowing backend writes via service role key
CREATE POLICY "Block direct access" ON user_activity
  FOR SELECT
  USING (FALSE);
