-- ⚠️  IMPORTANT: This migration adds a retention/prune job for command_usage_log.
-- command_usage_log is an append-only analytics log (one row per command
-- invocation, migration 007). Nothing prunes it today, so it grows without
-- bound. This installs a daily pg_cron job that deletes rows older than the
-- retention window. Rate-limiting (command_limits) and the monthly counters
-- (user_activity / character_engagement) are independent of this log, so
-- pruning it is safe and affects only long-tail analytics history.

-- ============================================================
-- Prune function
-- ============================================================
-- Deletes command_usage_log rows whose used_at is older than the retention
-- window (90 days). Idempotent: a re-run just deletes whatever has since aged
-- out. The existing idx_command_usage_log_used_at index serves the range scan.

CREATE OR REPLACE FUNCTION public.prune_command_usage_log()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- now() is timestamptz and used_at is timestamptz, so this compares two
  -- absolute instants — no timezone coercion to get wrong.
  DELETE FROM public.command_usage_log
  WHERE used_at < now() - INTERVAL '90 days';
END;
$$;

-- ============================================================
-- Schedule it with pg_cron
-- ============================================================
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Replace any previous definition of this job.
SELECT cron.unschedule('prune-command-usage-log')
WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'prune-command-usage-log');

-- 03:15 UTC every day (off the hour, and clear of the monthly reset at 00:00).
SELECT cron.schedule(
  'prune-command-usage-log',
  '15 3 * * *',
  $$SELECT public.prune_command_usage_log();$$
);

-- To run it by hand:
--   SELECT public.prune_command_usage_log();
-- To inspect run history:
--   SELECT * FROM cron.job_run_details WHERE jobid = (
--     SELECT jobid FROM cron.job WHERE jobname = 'prune-command-usage-log'
--   ) ORDER BY start_time DESC;
-- To change the retention window, edit the INTERVAL above and re-run this file.
