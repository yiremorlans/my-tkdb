-- ⚠️  IMPORTANT: This migration adds RLS to character_relationships and creates
-- privacy-compliant analytics views that never expose discord_user_id

-- Enable Row Level Security on character_relationships
ALTER TABLE character_relationships ENABLE ROW LEVEL SECURITY;

-- Policy: Service role (bot backend) writes via bypass; direct queries see nothing
-- This protects raw user data while allowing backend writes via service role key
CREATE POLICY "Block direct access" ON character_relationships
  FOR SELECT
  USING (FALSE);

-- ============================================================
-- ANONYMIZED ANALYTICS VIEWS (No PII - Safe to publish)
-- ============================================================

-- View: Most popular characters (all-time)
CREATE OR REPLACE VIEW public.vw_popular_characters AS
SELECT
  ce.character_id,
  COUNT(DISTINCT ce.discord_user_id) as unique_users,
  COALESCE(SUM(ce.total_commands), 0) as total_commands,
  COALESCE(AVG(cr.affinity), 0)::NUMERIC(10,2) as avg_affinity,
  MAX(ce.last_interacted_at) as most_recent_interaction
FROM character_engagement ce
LEFT JOIN character_relationships cr ON ce.discord_user_id = cr.discord_user_id
  AND ce.character_id = cr.character_id
GROUP BY ce.character_id
ORDER BY total_commands DESC;

-- View: Monthly character popularity (from monthly_analytics)
CREATE OR REPLACE VIEW public.vw_monthly_character_stats AS
SELECT
  year_month,
  character_id,
  SUM(commands_count) as total_commands,
  COUNT(DISTINCT discord_user_id) as unique_users,
  MIN(first_interaction) as first_interaction,
  MAX(last_interaction) as last_interaction
FROM monthly_analytics
WHERE character_id IS NOT NULL
GROUP BY year_month, character_id
ORDER BY year_month DESC, total_commands DESC;

-- View: Overall platform statistics (no user IDs)
CREATE OR REPLACE VIEW public.vw_platform_stats AS
SELECT
  (SELECT COUNT(DISTINCT discord_user_id) FROM character_engagement) as total_users,
  (SELECT COUNT(DISTINCT character_id) FROM character_engagement) as total_characters_interacted,
  (SELECT COALESCE(SUM(total_commands), 0) FROM character_engagement) as platform_total_commands,
  (SELECT AVG(affinity)::NUMERIC(10,2) FROM character_relationships) as avg_user_character_affinity;

-- View: Top characters by affinity
CREATE OR REPLACE VIEW public.vw_characters_by_affinity AS
SELECT
  character_id,
  COUNT(DISTINCT discord_user_id) as users_with_relationship,
  AVG(affinity)::NUMERIC(10,2) as avg_affinity,
  MIN(affinity) as min_affinity,
  MAX(affinity) as max_affinity,
  PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY affinity) as median_affinity
FROM character_relationships
GROUP BY character_id
ORDER BY avg_affinity DESC;

-- View: Engagement trends (monthly)
CREATE OR REPLACE VIEW public.vw_engagement_trends AS
SELECT
  year_month,
  SUM(commands_count) as monthly_commands,
  COUNT(DISTINCT discord_user_id) as monthly_active_users,
  (SUM(commands_count)::NUMERIC / NULLIF(COUNT(DISTINCT discord_user_id), 0))::NUMERIC(10,2) as avg_commands_per_user
FROM monthly_analytics
GROUP BY year_month
ORDER BY year_month DESC;

-- Grant public read access to analytics views (no PII exposed)
GRANT SELECT ON public.vw_popular_characters TO PUBLIC;
GRANT SELECT ON public.vw_monthly_character_stats TO PUBLIC;
GRANT SELECT ON public.vw_platform_stats TO PUBLIC;
GRANT SELECT ON public.vw_characters_by_affinity TO PUBLIC;
GRANT SELECT ON public.vw_engagement_trends TO PUBLIC;
