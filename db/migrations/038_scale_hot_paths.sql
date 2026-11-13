-- ⚠️  Run before deploying the code that calls these functions.
--
-- Scale pass on the per-interaction write path (2026-11-12 audit).
--
-- 1. record_response: one atomic statement for a dialogue answer, replacing
--    updateAffinity + incrementTimesMet + updateLastResponseType, which were
--    five sequential round trips (two read-then-writes and an update). The
--    read-then-writes also lost updates when two writes for the same pair
--    overlapped (a double click, or a /call win landing during a /meet).
-- 2. track_user_activity / track_character_engagement: the same fix for the
--    analytics counters, each was a read then a write.
-- 3. Drops indexes that only duplicated a UNIQUE constraint or served the
--    unused vw_* views. The timestamp/counter ones changed on every write,
--    which also kept Postgres from using HOT (in-place) updates.
-- 4. Drops the five vw_* analytics views: nothing reads them, and they were
--    granted to PUBLIC, so anyone with the anon key could run full-table
--    aggregates against the database.
--
-- Re-runnable: CREATE OR REPLACE / DROP ... IF EXISTS throughout.

-- ============================================================
-- record_response
-- ============================================================
-- Creates the row for a never-met pair, then adds p_gain to affinity, bumps
-- times_met, stamps last_interaction_at and (when given) last_response_type.
-- Returns the updated row as JSON plus `previous_affinity`, the value before
-- this write, which levelChange (storage.js) needs to detect a level-up.
--
-- p_response_type NULL keeps the stored one, so incrementTimesMet (a /call
-- win: no answer picked, no affinity) is this same call with gain 0.
--
-- The FOR UPDATE row lock is held to the end of the function, so a concurrent
-- call for the same pair waits and then reads the committed value: no lost
-- updates, and previous_affinity is always the true pre-write value.
CREATE OR REPLACE FUNCTION public.record_response(
  p_user_id       TEXT,
  p_character_id  TEXT,
  p_gain          INT,
  p_response_type TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  prev_affinity INT;
  updated       public.character_relationships;
BEGIN
  INSERT INTO public.character_relationships
    (discord_user_id, character_id, affinity, times_met)
  VALUES
    (p_user_id, p_character_id, 0, 0)
  ON CONFLICT (discord_user_id, character_id) DO NOTHING;

  SELECT COALESCE(cr.affinity, 0) INTO prev_affinity
  FROM public.character_relationships cr
  WHERE cr.discord_user_id = p_user_id AND cr.character_id = p_character_id
  FOR UPDATE;

  UPDATE public.character_relationships cr
  SET affinity            = COALESCE(cr.affinity, 0) + p_gain,
      times_met           = COALESCE(cr.times_met, 0) + 1,
      last_response_type  = COALESCE(p_response_type, cr.last_response_type),
      last_interaction_at = NOW()
  WHERE cr.discord_user_id = p_user_id AND cr.character_id = p_character_id
  RETURNING cr.* INTO updated;

  RETURN pg_catalog.to_jsonb(updated)
    || pg_catalog.jsonb_build_object('previous_affinity', prev_affinity);
END;
$$;

-- ============================================================
-- track_user_activity
-- ============================================================
-- One upsert. commands_this_month restarts at 1 when the previous command
-- was in an earlier UTC month, same rule as the monthly reset (migration 005)
-- so the count is right even before that job runs.
CREATE OR REPLACE FUNCTION public.track_user_activity(p_user_id TEXT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.user_activity AS ua
    (discord_user_id, last_used_at, commands_this_month, total_commands, created_at, updated_at)
  VALUES
    (p_user_id, NOW(), 1, 1, NOW(), NOW())
  ON CONFLICT (discord_user_id) DO UPDATE
    SET commands_this_month = CASE
          WHEN pg_catalog.date_trunc('month', ua.last_used_at AT TIME ZONE 'UTC')
             = pg_catalog.date_trunc('month', NOW() AT TIME ZONE 'UTC')
          THEN COALESCE(ua.commands_this_month, 0) + 1
          ELSE 1
        END,
        total_commands = COALESCE(ua.total_commands, 0) + 1,
        last_used_at   = NOW(),
        updated_at     = NOW();
END;
$$;

-- ============================================================
-- track_character_engagement
-- ============================================================
CREATE OR REPLACE FUNCTION public.track_character_engagement(
  p_user_id      TEXT,
  p_character_id TEXT
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.character_engagement AS ce
    (discord_user_id, character_id, commands_this_month, total_commands,
     last_interacted_at, created_at, updated_at)
  VALUES
    (p_user_id, p_character_id, 1, 1, NOW(), NOW(), NOW())
  ON CONFLICT (discord_user_id, character_id) DO UPDATE
    SET commands_this_month = CASE
          WHEN pg_catalog.date_trunc('month', ce.last_interacted_at AT TIME ZONE 'UTC')
             = pg_catalog.date_trunc('month', NOW() AT TIME ZONE 'UTC')
          THEN COALESCE(ce.commands_this_month, 0) + 1
          ELSE 1
        END,
        total_commands     = COALESCE(ce.total_commands, 0) + 1,
        last_interacted_at = NOW(),
        updated_at         = NOW();
END;
$$;

-- Backend only. Postgres grants EXECUTE to PUBLIC by default, and record_response
-- takes the affinity gain as an argument, so the anon key must not reach it.
REVOKE EXECUTE ON FUNCTION public.record_response(TEXT, TEXT, INT, TEXT) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.track_user_activity(TEXT) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.track_character_engagement(TEXT, TEXT) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.record_response(TEXT, TEXT, INT, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.track_user_activity(TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.track_character_engagement(TEXT, TEXT) TO service_role;

-- ============================================================
-- Redundant / unused indexes
-- ============================================================
-- Each (discord_user_id, character_id) lookup is served by the table's UNIQUE
-- constraint index, and user_activity's by its UNIQUE (discord_user_id).
-- The *_character_id indexes stay: cheap, and the column never changes.
DROP INDEX IF EXISTS public.idx_character_relationships_discord_user_id;
DROP INDEX IF EXISTS public.idx_character_relationships_user_char;
DROP INDEX IF EXISTS public.idx_character_relationships_affinity;
DROP INDEX IF EXISTS public.idx_character_relationships_last_interaction;

DROP INDEX IF EXISTS public.idx_character_engagement_discord_user_id;
DROP INDEX IF EXISTS public.idx_character_engagement_user_char;
DROP INDEX IF EXISTS public.idx_character_engagement_total_commands;
DROP INDEX IF EXISTS public.idx_character_engagement_last_interacted;

DROP INDEX IF EXISTS public.idx_user_activity_discord_user_id;
DROP INDEX IF EXISTS public.idx_user_activity_last_used_at;

-- ============================================================
-- Unused public analytics views
-- ============================================================
DROP VIEW IF EXISTS public.vw_popular_characters;
DROP VIEW IF EXISTS public.vw_monthly_character_stats;
DROP VIEW IF EXISTS public.vw_platform_stats;
DROP VIEW IF EXISTS public.vw_characters_by_affinity;
DROP VIEW IF EXISTS public.vw_engagement_trends;
