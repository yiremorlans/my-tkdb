-- ⚠️  IMPORTANT: This table contains user activity data (Discord IDs)
-- A leaderboard is inherently identifying — there is no anonymized view for it.
-- Keep it behind the service role and never publish raw rows.

-- Monthly /call engagement, plus retention for public_encounters.
--
-- Two separate jobs here:
--
--   1. A durable monthly rollup (encounter_win_stats) — one small row per
--      user, per guild, per month. This is the whole per-user analytics story:
--      who engages with public encounters and how often. Engagement is defined
--      as *reaching a character* — a correct /call. Wrong guesses are not
--      recorded anywhere, so a player who calls out often and never gets there
--      first does not appear here. That is deliberate; the alternative was a
--      per-guess log that nothing read.
--   2. Retention on public_encounters, which had none — it grows with every
--      spawn. The rollup survives that pruning because it is written at win
--      time (record_encounter_win below) rather than reconstructed from those
--      rows afterwards.

-- ============================================================
-- encounter_win_stats
-- ============================================================
-- Keyed by guild as well as user so both readings of "who won most" are
-- available: filter by guild_id for one server's board, or sum across guilds
-- for a global one. At fewer than five guilds the extra rows are negligible.
CREATE TABLE IF NOT EXISTS encounter_win_stats (
  discord_user_id TEXT NOT NULL,
  guild_id        TEXT NOT NULL,
  year_month      TEXT NOT NULL,  -- 'YYYY-MM', UTC, same convention as monthly_analytics
  wins            INT  NOT NULL DEFAULT 0,
  last_win_at     TIMESTAMP WITH TIME ZONE,
  created_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  PRIMARY KEY (discord_user_id, guild_id, year_month)
);

-- The leaderboard query is "one month, ranked" — this serves it directly.
CREATE INDEX IF NOT EXISTS idx_encounter_win_stats_month
ON encounter_win_stats (year_month, wins DESC);

-- ============================================================
-- record_encounter_win
-- ============================================================
-- One atomic statement, so two wins landing in the same instant (the same user
-- solving encounters in two guilds at once) can't lose a count the way a
-- read-modify-write would. Also one round trip rather than two, which matters:
-- this runs on the /call win path.
--
-- year_month is derived from now() in UTC here rather than passed in, so the
-- month boundary can never disagree between the app process and the database.
CREATE OR REPLACE FUNCTION public.record_encounter_win(
  p_user_id  TEXT,
  p_guild_id TEXT
)
RETURNS INT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  new_wins INT;
BEGIN
  INSERT INTO public.encounter_win_stats
    (discord_user_id, guild_id, year_month, wins, last_win_at)
  VALUES
    (p_user_id, p_guild_id, to_char((now() AT TIME ZONE 'UTC'), 'YYYY-MM'), 1, now())
  ON CONFLICT (discord_user_id, guild_id, year_month) DO UPDATE
    SET wins        = public.encounter_win_stats.wins + 1,
        last_win_at = now(),
        updated_at  = now()
  RETURNING wins INTO new_wins;

  RETURN new_wins;
END;
$$;

-- An earlier version of this file tracked a per-encounter guess_count, fed by
-- a trigger on public_encounter_guesses, so retention could tell "someone
-- responded" from "nobody looked". Engagement is correct-calls-only now, which
-- makes those the same question as outcome = 'solved' — so the column, the
-- trigger and the guess log are all gone. Drop them if present.
--
-- DROP TRIGGER ... IF EXISTS still needs its table to exist, and migration 010
-- already drops public_encounter_guesses — so guard the trigger drop on the
-- table still being there. (A DROP TABLE ... CASCADE took the trigger with it
-- anyway; this branch only matters if 011 is run against a database where the
-- guess log somehow still exists.)
DO $$
BEGIN
  IF to_regclass('public.public_encounter_guesses') IS NOT NULL THEN
    DROP TRIGGER IF EXISTS trg_bump_encounter_guess_count ON public.public_encounter_guesses;
  END IF;
END $$;
DROP FUNCTION IF EXISTS public.bump_encounter_guess_count();
ALTER TABLE public_encounters DROP COLUMN IF EXISTS guess_count;

-- ============================================================
-- Retention
-- ============================================================
-- Windows, all easy to change — edit the INTERVALs and re-run this file:
--
--   public_encounters, unsolved  7 days  — nobody reached the character, so the
--                                          row records only that the scheduler
--                                          fired. Note this covers encounters
--                                          people guessed at and missed: wrong
--                                          guesses are not tracked anywhere, so
--                                          they are indistinguishable from an
--                                          encounter nobody saw.
--   public_encounters, solved   90 days  — matches command_usage_log (migration 009)
--   encounter_win_stats        13 months — a full year plus the current month, so
--                                          year-over-year comparisons still work
--
-- NOT pruned: encounter_milestones. Those are a player's visible collection
-- ("Moments together" in /affinity), not analytics — they are gameplay state
-- and deleting them would silently erase progress. It is also a bounded tally
-- (one row per milestone kind per relationship), so it does not grow the way
-- the append-only tables do and has nothing to prune.
CREATE OR REPLACE FUNCTION public.prune_encounter_data()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Nobody reached the character. Kept a week so a dead channel is still
  -- legible as a run of unsolved encounters, then dropped.
  DELETE FROM public.public_encounters
  WHERE resolved_at IS NOT NULL
    AND outcome = 'expired'
    AND resolved_at < now() - INTERVAL '7 days';

  -- Somebody did. The win itself is already rolled up in encounter_win_stats,
  -- which outlives this by a year — the raw row is kept only for recent
  -- operational history.
  --
  -- Both arms are conditional on resolved_at: an unresolved row is either in
  -- flight or waiting for the scheduler, and must not be deleted from under
  -- either.
  DELETE FROM public.public_encounters
  WHERE resolved_at IS NOT NULL
    AND outcome = 'solved'
    AND resolved_at < now() - INTERVAL '90 days';

  -- Lexicographic comparison is correct for a zero-padded 'YYYY-MM'.
  DELETE FROM public.encounter_win_stats
  WHERE year_month < to_char((now() AT TIME ZONE 'UTC') - INTERVAL '13 months', 'YYYY-MM');
END;
$$;

-- ============================================================
-- Schedule it with pg_cron
-- ============================================================
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Replace any previous definition of this job.
SELECT cron.unschedule('prune-encounter-data')
WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'prune-encounter-data');

-- 03:30 UTC daily — clear of the command-log prune (03:15) and the monthly
-- counter reset (00:00 on the 1st).
SELECT cron.schedule(
  'prune-encounter-data',
  '30 3 * * *',
  $$SELECT public.prune_encounter_data();$$
);

-- ============================================================
-- Row Level Security
-- ============================================================
ALTER TABLE encounter_win_stats ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Block direct access" ON encounter_win_stats;
CREATE POLICY "Block direct access" ON encounter_win_stats FOR SELECT USING (FALSE);

-- To run the prune by hand:
--   SELECT public.prune_encounter_data();
-- To inspect run history:
--   SELECT * FROM cron.job_run_details WHERE jobid = (
--     SELECT jobid FROM cron.job WHERE jobname = 'prune-encounter-data'
--   ) ORDER BY start_time DESC;
