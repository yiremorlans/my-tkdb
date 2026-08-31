-- ⚠️  IMPORTANT: This table contains user activity data (Discord IDs)
-- Only expose anonymized/aggregated data in public analytics
-- Never publish raw rows with discord_user_id

-- Command Limits Table (Cooldown Tracking)
-- One row per user per rate-limited command, holding the timestamp of that
-- user's last *completed* encounter for the command. checkCommandLimit() reads
-- this to decide whether the rolling cooldown (see commandLimits.js) has
-- elapsed. This is deliberately separate from command_usage_log, which is an
-- append-only analytics log that may be pruned; rate-limiting must not depend
-- on that log surviving.
CREATE TABLE IF NOT EXISTS command_limits (
  discord_user_id TEXT NOT NULL,
  command_name TEXT NOT NULL,
  last_used_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  PRIMARY KEY (discord_user_id, command_name)
);

-- The primary key (discord_user_id, command_name) already indexes the only
-- lookup this table serves, so no additional index is needed.

-- Enable Row Level Security
ALTER TABLE command_limits ENABLE ROW LEVEL SECURITY;

-- Policy: Service role (bot backend) writes via bypass; direct queries see nothing
CREATE POLICY "Block direct access" ON command_limits
  FOR SELECT
  USING (FALSE);
