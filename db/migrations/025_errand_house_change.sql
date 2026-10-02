-- ⚠️  IMPORTANT: missions contains user activity data (Discord IDs). Same
-- exposure rules as every other table here — service role only.

-- Errand house change: one free house change per held errand.
--
-- The problem this solves
-- ------------------------
-- An errand's house is rolled at spawn and the accepter only learns it after
-- clicking Accept. Landing a house whose students you don't care about meant
-- a 48h mission chasing them anyway, or letting it lapse and losing the day's
-- accept. "Request new house" swaps the house once, before any work has
-- been done on it.
--
-- The new house and its signature map are rolled in JS (constants/missions.js
-- owns the house rosters) and passed in. This function only decides whether
-- the swap is allowed, under the row lock, and writes it:
--
--   * once per mission — house_changed_at is set in the same write, so a stale
--     button or a double-click finds it set and gets 'spent'
--   * only before the first signature — after that the player has put work
--     into this house, and a house change would either waste it or carry it across
--   * the 48h window, the daily lead cap and the reward are all untouched
--
-- FOR UPDATE serializes this against sign_errand_target, file_errand and the
-- expiry sweep, so a signature landing in the same instant can't be wiped by
-- the new map.
--
-- Returns 'changed' | 'spent' | 'signed' | 'gone'.

ALTER TABLE missions
  ADD COLUMN IF NOT EXISTS house_changed_at TIMESTAMP WITH TIME ZONE; -- errand only: when the one house change was spent

CREATE OR REPLACE FUNCTION change_errand_house(
  p_mission_id BIGINT,
  p_user_id    TEXT,
  p_house      TEXT,
  p_signatures JSONB
)
RETURNS TEXT LANGUAGE plpgsql AS $$
DECLARE v_mission missions;
BEGIN
  SELECT * INTO v_mission FROM missions
   WHERE id = p_mission_id AND accepted_by = p_user_id
     AND status = 'accepted' AND mission_type = 'errand'
   FOR UPDATE;
  IF NOT FOUND THEN RETURN 'gone'; END IF;

  IF v_mission.house_changed_at IS NOT NULL THEN RETURN 'spent'; END IF;

  IF EXISTS (
    SELECT 1 FROM jsonb_each(v_mission.signatures) WHERE value <> 'null'::jsonb
  ) THEN
    RETURN 'signed';
  END IF;

  UPDATE missions
     SET house = p_house, signatures = p_signatures, house_changed_at = NOW()
   WHERE id = p_mission_id;
  RETURN 'changed';
END;
$$;
