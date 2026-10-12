-- ⚠️  IMPORTANT: user_activity contains user data (Discord IDs). Same exposure
-- rules as every other table here — service role only.

-- Store credit (💎), phase 1 of docs/benkei-shop.md (§0, §1): the wallet goes
-- live before the shop does. One balance per user on user_activity, seeded
-- once from lifetime mission points and fed by every completion from here on.
-- Nothing spends it yet.

-- ============================================================
-- Column + one-time seed
-- ============================================================
-- The seed only runs in the same block that adds the column. Re-running this
-- file once the shop is live must never reset anyone's balance back to their
-- lifetime points (which would refund every purchase), so a second run skips
-- both the ALTER and the seed.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'user_activity'
      AND column_name = 'store_credit'
  ) THEN
    ALTER TABLE public.user_activity
      ADD COLUMN store_credit INT NOT NULL DEFAULT 0
      CONSTRAINT user_activity_store_credit_nonnegative CHECK (store_credit >= 0);

    -- A full copy of lifetime points, no cap (benkei-shop §1). Players with
    -- house_progress rows but no user_activity row get one here.
    INSERT INTO public.user_activity (discord_user_id, store_credit)
    SELECT discord_user_id, SUM(points)
    FROM public.house_progress
    GROUP BY discord_user_id
    ON CONFLICT (discord_user_id) DO UPDATE
      SET store_credit = EXCLUDED.store_credit,
          updated_at   = NOW();
  END IF;
END;
$$;

-- ============================================================
-- record_mission_completion — now also feeds store_credit
-- ============================================================
-- Same arguments as migration 021. The credit is added in the same statement
-- block as the house_progress bump, so the two can't drift: whatever a
-- completion adds to house points (lead and assist rows alike, N for an
-- errand) it adds to the wallet too.
--
-- Now returns the new store_credit instead of the mission_log row (no caller
-- read the row), so the completion message can show what was actually banked.
-- A changed return type needs the old function dropped first.
DROP FUNCTION IF EXISTS public.record_mission_completion(TEXT, TEXT, TEXT, BIGINT, TEXT, INT);

CREATE FUNCTION public.record_mission_completion(
  p_user_id      TEXT,
  p_house        TEXT,
  p_mission_type TEXT,
  p_mission_id   BIGINT DEFAULT NULL,
  p_role         TEXT DEFAULT 'lead',
  p_points       INT DEFAULT 1
)
RETURNS INT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_completed_at TIMESTAMP WITH TIME ZONE;
  v_balance INT;
BEGIN
  INSERT INTO public.mission_log
    (discord_user_id, house, mission_type, mission_id, role, points)
  VALUES
    (p_user_id, p_house, p_mission_type, p_mission_id, p_role, p_points)
  RETURNING completed_at INTO v_completed_at;

  INSERT INTO public.house_progress
    (discord_user_id, house, points, completions, last_completion_at)
  VALUES
    (p_user_id, p_house, p_points, 1, v_completed_at)
  ON CONFLICT (discord_user_id, house) DO UPDATE
    SET points             = public.house_progress.points + EXCLUDED.points,
        completions        = public.house_progress.completions + 1,
        last_completion_at = EXCLUDED.last_completion_at,
        updated_at         = now();

  INSERT INTO public.user_activity (discord_user_id, store_credit)
  VALUES (p_user_id, p_points)
  ON CONFLICT (discord_user_id) DO UPDATE
    SET store_credit = public.user_activity.store_credit + EXCLUDED.store_credit,
        updated_at   = now()
  RETURNING store_credit INTO v_balance;

  RETURN v_balance;
END;
$$;

-- To check the seed against lifetime points (should return no rows while
-- nothing can be spent):
--   SELECT ua.discord_user_id, ua.store_credit, hp.total
--   FROM user_activity ua
--   JOIN (SELECT discord_user_id, SUM(points) AS total
--         FROM house_progress GROUP BY discord_user_id) hp USING (discord_user_id)
--   WHERE ua.store_credit <> hp.total;
