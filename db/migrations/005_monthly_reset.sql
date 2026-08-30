-- ⚠️  IMPORTANT: This migration adds the monthly counter reset job.
-- It snapshots the month that just ended into monthly_analytics and then
-- zeroes commands_this_month on user_activity and character_engagement.
-- total_commands is lifetime and is never reset.

-- ============================================================
-- Snapshot + reset function
-- ============================================================
-- Runs on the 1st of each month (UTC). "The month that just ended" is
-- yesterday's month, e.g. run at 2026-09-01 00:00 UTC -> year_month '2026-08'.
-- Both the snapshot and the reset are idempotent, so a re-run is harmless.

CREATE OR REPLACE FUNCTION public.snapshot_and_reset_monthly_counters()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  ym TEXT := to_char((now() AT TIME ZONE 'UTC') - INTERVAL '1 day', 'YYYY-MM');
BEGIN
  -- Per-user totals for the month (character_id IS NULL)
  IF NOT EXISTS (
    SELECT 1 FROM public.monthly_analytics
    WHERE year_month = ym AND character_id IS NULL
  ) THEN
    INSERT INTO public.monthly_analytics
      (year_month, discord_user_id, character_id, commands_count, last_interaction, created_at)
    SELECT ym, discord_user_id, NULL, commands_this_month, last_used_at, now()
    FROM public.user_activity
    WHERE commands_this_month > 0;
  END IF;

  -- Per-character engagement for the month
  IF NOT EXISTS (
    SELECT 1 FROM public.monthly_analytics
    WHERE year_month = ym AND character_id IS NOT NULL
  ) THEN
    INSERT INTO public.monthly_analytics
      (year_month, discord_user_id, character_id, commands_count, last_interaction, created_at)
    SELECT ym, discord_user_id, character_id, commands_this_month, last_interacted_at, now()
    FROM public.character_engagement
    WHERE commands_this_month > 0;
  END IF;

  -- Reset the rolling monthly counters (keep total_commands)
  UPDATE public.user_activity
    SET commands_this_month = 0, updated_at = now()
    WHERE commands_this_month <> 0;

  UPDATE public.character_engagement
    SET commands_this_month = 0, updated_at = now()
    WHERE commands_this_month <> 0;
END;
$$;

-- ============================================================
-- Schedule it with pg_cron
-- ============================================================
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Replace any previous definition of this job.
SELECT cron.unschedule('monthly-counter-reset')
WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'monthly-counter-reset');

-- 00:00 UTC on the 1st of every month.
SELECT cron.schedule(
  'monthly-counter-reset',
  '0 0 1 * *',
  $$SELECT public.snapshot_and_reset_monthly_counters();$$
);

-- To run it by hand (e.g. to backfill or test):
--   SELECT public.snapshot_and_reset_monthly_counters();
-- To inspect run history:
--   SELECT * FROM cron.job_run_details WHERE jobid = (
--     SELECT jobid FROM cron.job WHERE jobname = 'monthly-counter-reset'
--   ) ORDER BY start_time DESC;
