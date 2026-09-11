-- ⚠️  IMPORTANT: house_progress contains user activity data (Discord IDs).
-- Same exposure rules as every other table here — service role only, no raw
-- rows in public analytics.

-- house_progress: a durable rollup written at completion time, the same shape
-- as encounter_win_stats (migration 011). mission_log stays the raw,
-- append-only completion ledger AND the banked-cooldown-reset credit store
-- (each unspent row IS a credit — migration 016), so it can never be pruned
-- wholesale. But the /house dossier's points, filed count and per-house tally
-- no longer need to sum the raw table to get those numbers: they're
-- incremented here at write time, so old completions can be pruned without
-- moving the dossier's numbers.
--
-- Banked resets are NOT rolled up here — they live and die with the
-- mission_log row that grants them (reset_spent_at), and the prune job below
-- only ever deletes rows that have already been spent. An unspent row is a
-- live credit and is kept regardless of age.
--
-- This replaces the unused `user_house_progress` view from migration 017: that
-- view re-summed mission_log live on every read, so it would have gone stale
-- the moment old rows were pruned, and nothing in the app ever actually
-- queried it — getMissionLogStats summed the raw table in JS instead. Dropped
-- below along with its placeholder rank function (the app has its own
-- inspectorRank in constants/missions.js).
DROP VIEW IF EXISTS user_house_progress;
DROP FUNCTION IF EXISTS calculate_house_rank(INT);

CREATE TABLE IF NOT EXISTS house_progress (
  discord_user_id    TEXT NOT NULL,
  house              TEXT NOT NULL,
  points             INT  NOT NULL DEFAULT 0,
  completions        INT  NOT NULL DEFAULT 0,
  last_completion_at TIMESTAMP WITH TIME ZONE,
  updated_at         TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  PRIMARY KEY (discord_user_id, house)
);

-- Every /house read is "all houses for this one user" — this is that query.
CREATE INDEX IF NOT EXISTS idx_house_progress_user ON house_progress (discord_user_id);

-- ============================================================
-- Backfill — one-time, safe to re-run
-- ============================================================
-- Folds every mission_log row that exists today into the rollup before
-- anything is ever pruned, so no player's history is lost the first time this
-- runs. ON CONFLICT means re-running this file (or applying it to a database
-- that already has some house_progress rows from a partial run) just
-- re-sums — it never double-counts.
INSERT INTO house_progress
  (discord_user_id, house, points, completions, last_completion_at, updated_at)
SELECT
  discord_user_id,
  house,
  SUM(points),
  COUNT(*),
  MAX(completed_at),
  NOW()
FROM mission_log
GROUP BY discord_user_id, house
ON CONFLICT (discord_user_id, house) DO UPDATE
  SET points             = EXCLUDED.points,
      completions        = EXCLUDED.completions,
      last_completion_at = EXCLUDED.last_completion_at,
      updated_at         = NOW();

-- ============================================================
-- record_mission_completion — the one write path from here on
-- ============================================================
-- Replaces the plain INSERT recordMissionCompletion used to do (db/supabase.js).
-- Same shape in (one completion) and out (the inserted mission_log row), but
-- now the log insert and the rollup bump happen in the same statement block,
-- so a completion can never land in one and not the other.
CREATE OR REPLACE FUNCTION public.record_mission_completion(
  p_user_id      TEXT,
  p_house        TEXT,
  p_mission_type TEXT,
  p_mission_id   BIGINT DEFAULT NULL,
  p_role         TEXT DEFAULT 'lead',
  p_points       INT DEFAULT 1
)
RETURNS public.mission_log
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_row public.mission_log;
BEGIN
  INSERT INTO public.mission_log
    (discord_user_id, house, mission_type, mission_id, role, points)
  VALUES
    (p_user_id, p_house, p_mission_type, p_mission_id, p_role, p_points)
  RETURNING * INTO v_row;

  INSERT INTO public.house_progress
    (discord_user_id, house, points, completions, last_completion_at)
  VALUES
    (p_user_id, p_house, p_points, 1, v_row.completed_at)
  ON CONFLICT (discord_user_id, house) DO UPDATE
    SET points             = public.house_progress.points + EXCLUDED.points,
        completions        = public.house_progress.completions + 1,
        last_completion_at = EXCLUDED.last_completion_at,
        updated_at         = now();

  RETURN v_row;
END;
$$;

-- ============================================================
-- Prune mission_log — spent rows only, 30-day retention
-- ============================================================
-- Unspent rows (reset_spent_at IS NULL) are live banked-reset credits and are
-- NEVER pruned, however old — see migration 016. Everything else is already
-- folded into house_progress above, so deleting it costs no dossier accuracy,
-- only long-tail per-completion audit trail.
CREATE INDEX IF NOT EXISTS idx_mission_log_spent_completed
  ON mission_log (completed_at) WHERE reset_spent_at IS NOT NULL;

CREATE OR REPLACE FUNCTION public.prune_mission_log()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  DELETE FROM public.mission_log
  WHERE reset_spent_at IS NOT NULL
    AND completed_at < now() - INTERVAL '30 days';
END;
$$;

-- ============================================================
-- Schedule it with pg_cron
-- ============================================================
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Replace any previous definition of this job.
SELECT cron.unschedule('prune-mission-log')
WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'prune-mission-log');

-- 03:45 UTC daily — clear of the command-log prune (03:15, migration 009) and
-- the encounter-data prune (03:30, migration 011).
SELECT cron.schedule(
  'prune-mission-log',
  '45 3 * * *',
  $$SELECT public.prune_mission_log();$$
);

-- ============================================================
-- Row Level Security
-- ============================================================
ALTER TABLE house_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Block direct access" ON house_progress;
CREATE POLICY "Block direct access" ON house_progress FOR SELECT USING (FALSE);

-- To run the prune by hand:
--   SELECT public.prune_mission_log();
-- To inspect run history:
--   SELECT * FROM cron.job_run_details WHERE jobid = (
--     SELECT jobid FROM cron.job WHERE jobname = 'prune-mission-log'
--   ) ORDER BY start_time DESC;
-- To change the retention window, edit the INTERVAL above and re-run this file.
