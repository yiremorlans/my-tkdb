-- ⚠️  IMPORTANT: missions contains user activity data (Discord IDs). Same
-- exposure rules as every other table here — service role only.

-- Retention for `missions` (migration 016), which had none: it grows with
-- every posted mission request, across every configured guild.
--
-- Safe to prune completed/expired rows on their own, unlike mission_log:
-- nothing reads `missions` for the dossier's stats (mission_log.mission_id is
-- only a soft reference, ON DELETE SET NULL — migration 016), and
-- house_progress (migration 021) is fed from mission_log at completion time,
-- never from this table. So there is no aggregate to keep in sync here.
--
-- `open` and `accepted` rows are never touched regardless of age: those are
-- live state (an open post with a real button on it, or someone's currently
-- held mission), not history. Only rows already closed out by
-- finalizeExpiredMissions/claim/file/complete (status IN ('completed',
-- 'expired')) are eligible.
--
-- Aged off `created_at` rather than `completed_at`, since an expired row never
-- gets a completed_at (only its status changes) — created_at is the one
-- timestamp both terminal states always have.

CREATE INDEX IF NOT EXISTS idx_missions_prune
  ON missions (created_at) WHERE status IN ('completed', 'expired');

CREATE OR REPLACE FUNCTION public.prune_missions()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  DELETE FROM public.missions
  WHERE status IN ('completed', 'expired')
    AND created_at < now() - INTERVAL '30 days';
END;
$$;

-- ============================================================
-- Schedule it with pg_cron
-- ============================================================
CREATE EXTENSION IF NOT EXISTS pg_cron;

SELECT cron.unschedule('prune-missions')
WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'prune-missions');

-- 03:50 UTC daily — clear of command-log (03:15), encounter-data (03:30) and
-- mission-log (03:45, migration 021).
SELECT cron.schedule(
  'prune-missions',
  '50 3 * * *',
  $$SELECT public.prune_missions();$$
);

-- To run it by hand:
--   SELECT public.prune_missions();
-- To inspect run history:
--   SELECT * FROM cron.job_run_details WHERE jobid = (
--     SELECT jobid FROM cron.job WHERE jobname = 'prune-missions'
--   ) ORDER BY start_time DESC;
-- To change the retention window, edit the INTERVAL above and re-run this file.
