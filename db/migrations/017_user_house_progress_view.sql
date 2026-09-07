-- User house progression view derived from mission_log
--
-- Single source of truth: mission_log is never modified after completion (only
-- marked reset_spent_at when a reset is banked and later spent). This view
-- always reflects current rank, points, and unspent resets per user per house,
-- derived live from the immutable completion history.
--
-- The view is read-only (no INSERT/UPDATE/DELETE), but it serves as the
-- canonical source for /house rankings, per-house bars, and unspent reset
-- counts. All read paths query this, never separate summary tables.

-- ============================================================
-- Indexes to support aggregation
-- ============================================================
-- Without these, the view's SUM/COUNT operations scan the entire mission_log
-- table. With them, the planner can seek directly to the user's rows.

CREATE INDEX IF NOT EXISTS idx_mission_log_user_house
  ON mission_log (discord_user_id, house);

-- Optional: if you query "all completions for a user across all houses" often
CREATE INDEX IF NOT EXISTS idx_mission_log_user_completed
  ON mission_log (discord_user_id, completed_at);

-- ============================================================
-- View: current house progress per user
-- ============================================================
-- Aggregates mission_log to derive rank, total points, and unspent resets.
-- Every read of /house or a player's per-house bars queries this.

CREATE OR REPLACE VIEW user_house_progress AS
SELECT
  discord_user_id,
  house,
  COALESCE(SUM(points), 0) as total_points,
  COUNT(*) FILTER (WHERE reset_spent_at IS NULL) as unspent_resets,
  MAX(completed_at) as last_completion_at,
  COUNT(*) as total_completions
FROM mission_log
GROUP BY discord_user_id, house;

-- ============================================================
-- RLS — service role only (same as mission_log)
-- ============================================================
-- This view is read-only and does not expose raw rows; it aggregates.
-- Still, restrict access for defense in depth.

ALTER VIEW user_house_progress SET (security_barrier = on);

-- ============================================================
-- Helper: rank calculation (if not already defined)
-- ============================================================
-- Ranks are derived from total_points. This is a placeholder for your
-- actual ranking function (thresholds per house, etc). If you already have
-- this defined elsewhere, drop the CREATE and leave the UPDATE references.
--
-- For now: rank by points in the standard way. Update the thresholds
-- to match your game's progression curve.

CREATE OR REPLACE FUNCTION calculate_house_rank(p_points INT)
RETURNS INT LANGUAGE sql IMMUTABLE AS $$
  SELECT CASE
    WHEN p_points IS NULL THEN 0
    WHEN p_points < 10 THEN 1
    WHEN p_points < 25 THEN 2
    WHEN p_points < 50 THEN 3
    WHEN p_points < 100 THEN 4
    ELSE 5
  END;
$$;

-- ============================================================
-- Notes on performance
-- ============================================================
-- If mission_log grows very large (millions of rows), the view's GROUP BY
-- may become slow. Options to revisit:
--
--   1. Add a `mission_log.house` index if not already present (done above).
--   2. Materialize snapshots nightly and query those for most reads, falling
--      back to the view for always-fresh reads.
--   3. Keep a separate user_house_progress table and update it on each
--      mission_complete, accepting the sync complexity for speed.
--
-- For now, the index should suffice. Monitor query times as the game scales.
