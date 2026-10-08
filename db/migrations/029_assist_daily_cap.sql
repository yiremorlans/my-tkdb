-- ⚠️  IMPORTANT: missions contains user activity data (Discord IDs). Same
-- exposure rules as every other table here — service role only.

-- Backing someone up now counts toward the per-player daily cap
-- (DAILY_LEAD_CAP, migration 016's claim_mission).
--
-- Assisting used to be a free social bonus that never touched the cap, so a
-- player at their two-a-day limit could keep answering every call for backup
-- and walk away with a house log and a banked reset each time. Now a day's
-- allowance is "missions taken": accepts (accepted_by / accepted_at, as
-- before) plus assists (helper_user_id / completed_at — a co-op completes in
-- the same write that records its helper, so completed_at is the assist time).
--
-- A player holds one mission at a time, and now that includes backing someone
-- up: a helper who holds an accepted mission of their own is refused with
-- 'busy:<type>', the same answer claim_mission gives. (An assist itself never
-- sets accepted_by — the co-op completes in the same write — so it never
-- occupies the slot afterwards.) Like claim_mission, both checks run inside the
-- call, so a refused click writes nothing and the call for backup stays live
-- for the next inspector.
--
-- Both claims also take a per-user advisory lock first. The count is a read,
-- so without it one player clicking two different posts in the same instant
-- (two Joins, or a Join and an Accept) could have both calls count under the
-- cap before either commits, and get through both. The lock is
-- transaction-scoped: the second call waits for the first to commit, then
-- counts again and sees it. Different players never share a lock, and every
-- path takes the user lock before any row lock, so there is no lock-order
-- deadlock. A hashtext collision only means two unrelated players
-- occasionally wait a few ms on each other.

CREATE INDEX IF NOT EXISTS idx_missions_helper_completed_at
  ON missions (helper_user_id, completed_at)
  WHERE helper_user_id IS NOT NULL;

-- Why this user can't take a mission right now, or NULL if they can: one rule
-- for both claims, Accept and Join. 'capped' is reported ahead of 'busy' when
-- both apply: telling someone to finish their current mission implies another
-- is waiting afterwards, and at cap that is false. A NULL cap or day start
-- disables the limit. The cap counts missions taken since p_day_start: accepts
-- plus assists.
--
-- Callers hold the per-user lock, so nothing this reads can change for the
-- user before they write.
CREATE OR REPLACE FUNCTION mission_claim_blocker(
  p_user_id        TEXT,
  p_day_start      TIMESTAMP WITH TIME ZONE,
  p_daily_lead_cap INT
)
RETURNS TEXT LANGUAGE plpgsql STABLE AS $$
DECLARE v_held TEXT;
BEGIN
  IF p_daily_lead_cap IS NOT NULL AND p_day_start IS NOT NULL
     AND (
       (SELECT count(*) FROM missions
         WHERE accepted_by = p_user_id AND accepted_at >= p_day_start)
       + (SELECT count(*) FROM missions
           WHERE helper_user_id = p_user_id AND completed_at >= p_day_start)
     ) >= p_daily_lead_cap
  THEN
    RETURN 'capped';
  END IF;

  SELECT mission_type INTO v_held FROM missions
   WHERE accepted_by = p_user_id AND status = 'accepted' LIMIT 1;
  IF FOUND THEN RETURN 'busy:' || COALESCE(v_held, 'unknown'); END IF;

  RETURN NULL;
END;
$$;

-- Same contract as migration 016. With the per-user lock, the eligibility
-- checks no longer need to live inside the UPDATE's WHERE (and be re-derived
-- after a zero-row match): lock the row, check, write. The partial unique index
-- missions_one_accepted_per_user still backstops it.
CREATE OR REPLACE FUNCTION claim_mission(
  p_mission_id     BIGINT,
  p_user_id        TEXT,
  p_accept_hours   INT DEFAULT 48,
  p_day_start      TIMESTAMP WITH TIME ZONE DEFAULT NULL,
  p_daily_lead_cap INT DEFAULT NULL
)
RETURNS TEXT LANGUAGE plpgsql AS $$
DECLARE v_blocker TEXT;
BEGIN
  PERFORM pg_advisory_xact_lock(hashtext('mission_claims'), hashtext(p_user_id));

  PERFORM 1 FROM missions WHERE id = p_mission_id AND status = 'open' FOR UPDATE;
  IF NOT FOUND THEN RETURN 'taken'; END IF;

  -- Still open, so any refusal is this user rather than a lost race.
  v_blocker := mission_claim_blocker(p_user_id, p_day_start, p_daily_lead_cap);
  IF v_blocker IS NOT NULL THEN RETURN v_blocker; END IF;

  UPDATE missions
     SET accepted_by = p_user_id,
         accepted_at = NOW(),
         accept_expires_at = NOW() + (p_accept_hours * INTERVAL '1 hour'),
         status = 'accepted'
   WHERE id = p_mission_id;
  RETURN 'claimed';
END;
$$;

-- The co-op Join button, now under the same rules as Accept. The argument list
-- changes, and CREATE OR REPLACE with a new signature would add an overload
-- beside the old one (and make two-argument calls ambiguous), so the old one is
-- dropped first.
--
-- Returns 'joined' | 'self' | 'taken' | 'capped' | 'busy:<type>'. 'taken' and
-- 'self' are checked first: a dead or self-owned call is reported as such
-- whatever the clicker's state. A refused click leaves the mission accepted
-- and unhelped.
DROP FUNCTION IF EXISTS claim_coop_helper(BIGINT, TEXT);

CREATE OR REPLACE FUNCTION claim_coop_helper(
  p_mission_id     BIGINT,
  p_user_id        TEXT,
  p_day_start      TIMESTAMP WITH TIME ZONE DEFAULT NULL,
  p_daily_lead_cap INT DEFAULT NULL
)
RETURNS TEXT LANGUAGE plpgsql AS $$
DECLARE
  m         missions;
  v_blocker TEXT;
BEGIN
  PERFORM pg_advisory_xact_lock(hashtext('mission_claims'), hashtext(p_user_id));

  SELECT * INTO m FROM missions WHERE id = p_mission_id FOR UPDATE;
  IF NOT FOUND
     OR m.status <> 'accepted' OR m.mission_type <> 'coop' OR m.helper_user_id IS NOT NULL
  THEN RETURN 'taken'; END IF;
  IF m.accepted_by = p_user_id THEN RETURN 'self'; END IF;

  v_blocker := mission_claim_blocker(p_user_id, p_day_start, p_daily_lead_cap);
  IF v_blocker IS NOT NULL THEN RETURN v_blocker; END IF;

  UPDATE missions
     SET helper_user_id = p_user_id, status = 'completed', completed_at = NOW()
   WHERE id = p_mission_id;
  RETURN 'joined';
END;
$$;

-- claim_coop_helper's argument list changed: have PostgREST pick it up now
-- rather than on its next cache refresh, or Join clicks fail until then.
NOTIFY pgrst, 'reload schema';
