-- ⚠️  IMPORTANT: This table contains user activity data (Discord IDs)
-- Only expose anonymized/aggregated data in public analytics
-- Never publish raw rows with discord_user_id

-- Command Usage Log Table
-- Tracks individual command invocations for detailed analytics
CREATE TABLE IF NOT EXISTS command_usage_log (
  id BIGSERIAL PRIMARY KEY,
  discord_user_id TEXT NOT NULL,
  command_name TEXT NOT NULL,
  used_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for analytics queries
CREATE INDEX IF NOT EXISTS idx_command_usage_log_command_name
ON command_usage_log(command_name);

CREATE INDEX IF NOT EXISTS idx_command_usage_log_discord_user_id
ON command_usage_log(discord_user_id);

CREATE INDEX IF NOT EXISTS idx_command_usage_log_used_at
ON command_usage_log(used_at DESC);

-- Composite index for command usage by user and time
CREATE INDEX IF NOT EXISTS idx_command_usage_log_user_time
ON command_usage_log(discord_user_id, used_at DESC);

-- Enable Row Level Security
ALTER TABLE command_usage_log ENABLE ROW LEVEL SECURITY;

-- Policy: Service role (bot backend) writes via bypass; direct queries see nothing
CREATE POLICY "Block direct access" ON command_usage_log
  FOR SELECT
  USING (FALSE);
