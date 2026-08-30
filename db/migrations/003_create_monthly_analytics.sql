-- ⚠️  IMPORTANT: This table contains user activity data (Discord IDs)
-- Only expose anonymized/aggregated data in public analytics
-- Never publish raw rows with discord_user_id

-- Monthly Analytics Snapshots Table
-- Stores monthly aggregated data for trend analysis and reporting
CREATE TABLE IF NOT EXISTS monthly_analytics (
  id BIGSERIAL PRIMARY KEY,
  year_month TEXT NOT NULL, -- Format: "2026-08" for easy sorting and filtering
  discord_user_id TEXT NOT NULL,
  character_id TEXT,
  commands_count INT DEFAULT 0,
  unique_days_active INT DEFAULT 0,
  first_interaction TIMESTAMP WITH TIME ZONE,
  last_interaction TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for analytics queries
CREATE INDEX IF NOT EXISTS idx_monthly_analytics_year_month
ON monthly_analytics(year_month DESC);

CREATE INDEX IF NOT EXISTS idx_monthly_analytics_discord_user_id
ON monthly_analytics(discord_user_id);

CREATE INDEX IF NOT EXISTS idx_monthly_analytics_character_id
ON monthly_analytics(character_id);

CREATE INDEX IF NOT EXISTS idx_monthly_analytics_commands_count
ON monthly_analytics(commands_count DESC);

-- Composite index for user-character monthly lookups
CREATE INDEX IF NOT EXISTS idx_monthly_analytics_user_char_month
ON monthly_analytics(year_month, discord_user_id, character_id);
