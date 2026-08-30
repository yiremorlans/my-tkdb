-- ⚠️  IMPORTANT: monthly_analytics holds raw Discord IDs. Migration 003 created
-- it without RLS (an oversight vs. the other user-data tables). This migration
-- closes that gap and fixes a double-count in vw_engagement_trends.

-- ============================================================
-- 1. Enable RLS on monthly_analytics
-- ============================================================
-- Matches the pattern used by user_activity / character_engagement /
-- character_relationships: RLS on, one explicit deny policy. The bot writes and
-- reads with the service-role key (bypasses RLS); snapshot_and_reset_monthly_
-- counters() is SECURITY DEFINER (also bypasses); the anonymized views run as
-- their owner, so PUBLIC access to them is unaffected.

ALTER TABLE monthly_analytics ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Block direct access" ON monthly_analytics;
CREATE POLICY "Block direct access" ON monthly_analytics
  FOR SELECT
  USING (FALSE);

-- ============================================================
-- 2. Fix vw_engagement_trends double-count
-- ============================================================
-- monthly_analytics stores two row types per month:
--   * character_id IS NULL     -> one row per user, their month total
--   * character_id IS NOT NULL -> one row per (user, character) breakdown
-- The original view summed commands_count across BOTH, roughly doubling
-- monthly_commands and avg_commands_per_user. Count only the per-user rows.

CREATE OR REPLACE VIEW public.vw_engagement_trends AS
SELECT
  year_month,
  SUM(commands_count) AS monthly_commands,
  COUNT(DISTINCT discord_user_id) AS monthly_active_users,
  (SUM(commands_count)::NUMERIC / NULLIF(COUNT(DISTINCT discord_user_id), 0))::NUMERIC(10,2) AS avg_commands_per_user
FROM monthly_analytics
WHERE character_id IS NULL
GROUP BY year_month
ORDER BY year_month DESC;

GRANT SELECT ON public.vw_engagement_trends TO PUBLIC;
