-- ⚠️  IMPORTANT: missions, mission_log and user_activity contain user data
-- (Discord IDs). Same exposure rules as every other table here — service role
-- only.

-- Each mission's closing claim and its completion write become one call.
--
-- Since migration 032 the completion message shows the new 💎 balance, so the
-- app recorded the completion (record_mission_completion) before replying:
-- a second round trip after the claim on every riddle solve, errand filing and
-- co-op join. The two were also separate transactions, so a claim that closed
-- the mission followed by a failed write left the player with nothing — no
-- house log, no banked reset, no 💎 — on a mission that could not be retried.
--
-- Each function below claims and records in one transaction: the reply waits
-- on one call again, and a failed write rolls the claim back, leaving the
-- mission open for the player to try again. The house written is the one on
-- the row the claim locked, not the app's earlier copy of the mission.
--
-- These are NEW functions beside complete_mission, file_errand and
-- claim_coop_helper, which this file leaves alone. Code deployed before this
-- migration still calls the old ones and records separately; if the old ones
-- recorded too, every completion between this migration and the deploy would
-- be banked twice. The old three are dropped with the shop's migration
-- (docs/benkei-shop.md, phase 2).
--
-- Unlike most functions here, these three are not SECURITY DEFINER and set no
-- search_path, on purpose: they run with the caller's privileges, as the three
-- they replace do. join_coop_and_record calls mission_claim_blocker (029),
-- which names its tables unqualified and needs the caller's search_path to
-- find them. record_mission_completion keeps its own SECURITY DEFINER.

-- ============================================================
-- solve_riddle — complete_mission (016) + the completion
-- ============================================================
-- Returns the new store_credit balance, or NULL when the mission had already
-- closed (expired in the same instant, or solved by a double submit), which
-- the caller reports as "that mission just closed" without paying out.
CREATE OR REPLACE FUNCTION public.solve_riddle(p_mission_id BIGINT, p_user_id TEXT)
RETURNS INT
LANGUAGE plpgsql
AS $$
DECLARE
  v_house TEXT;
BEGIN
  UPDATE public.missions SET status = 'completed', completed_at = NOW()
   WHERE id = p_mission_id AND accepted_by = p_user_id
     AND status = 'accepted' AND mission_type = 'riddle'
  RETURNING house INTO v_house;
  IF NOT FOUND THEN RETURN NULL; END IF;

  RETURN public.record_mission_completion(
    p_user_id, v_house, 'riddle', p_mission_id, 'lead', 1
  );
END;
$$;

-- ============================================================
-- file_errand_and_record — file_errand (016) + the completion
-- ============================================================
-- Returns 'filed:<points>:<balance>' | 'not_ready' | 'gone'. The points are
-- the signature count read from the locked row, as before.
CREATE OR REPLACE FUNCTION public.file_errand_and_record(p_mission_id BIGINT, p_user_id TEXT)
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  v_mission public.missions;
  v_points  INT;
  v_balance INT;
BEGIN
  SELECT * INTO v_mission FROM public.missions
   WHERE id = p_mission_id AND accepted_by = p_user_id
     AND status = 'accepted' AND mission_type = 'errand'
   FOR UPDATE;
  IF NOT FOUND THEN RETURN 'gone'; END IF;

  IF EXISTS (
    SELECT 1 FROM jsonb_each(v_mission.signatures) WHERE value = 'null'::jsonb
  ) THEN
    RETURN 'not_ready';
  END IF;

  UPDATE public.missions SET status = 'completed', completed_at = NOW()
   WHERE id = p_mission_id;

  v_points := (SELECT count(*) FROM jsonb_object_keys(v_mission.signatures));
  v_balance := public.record_mission_completion(
    p_user_id, v_mission.house, 'errand', p_mission_id, 'lead', v_points
  );
  RETURN 'filed:' || v_points || ':' || v_balance;
END;
$$;

-- ============================================================
-- join_coop_and_record — claim_coop_helper (029) + both completions
-- ============================================================
-- Returns 'joined' | 'self' | 'taken' | 'capped' | 'busy:<type>', exactly as
-- claim_coop_helper does. On 'joined' both rows are written: the lead's and
-- the helper's assist. The public post shows no totals, so no balance comes
-- back.
--
-- The two writes go in user-id order rather than lead-first. Each one locks
-- that user's house_progress and user_activity rows until commit, so two
-- co-ops between the same pair, with the roles swapped, would otherwise lock
-- in opposite orders and could deadlock.
CREATE OR REPLACE FUNCTION public.join_coop_and_record(
  p_mission_id     BIGINT,
  p_user_id        TEXT,
  p_day_start      TIMESTAMP WITH TIME ZONE DEFAULT NULL,
  p_daily_lead_cap INT DEFAULT NULL
)
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  m         public.missions;
  v_blocker TEXT;
  v_writer  RECORD;
BEGIN
  PERFORM pg_advisory_xact_lock(hashtext('mission_claims'), hashtext(p_user_id));

  SELECT * INTO m FROM public.missions WHERE id = p_mission_id FOR UPDATE;
  IF NOT FOUND
     OR m.status <> 'accepted' OR m.mission_type <> 'coop' OR m.helper_user_id IS NOT NULL
  THEN RETURN 'taken'; END IF;
  IF m.accepted_by = p_user_id THEN RETURN 'self'; END IF;

  v_blocker := public.mission_claim_blocker(p_user_id, p_day_start, p_daily_lead_cap);
  IF v_blocker IS NOT NULL THEN RETURN v_blocker; END IF;

  UPDATE public.missions
     SET helper_user_id = p_user_id, status = 'completed', completed_at = NOW()
   WHERE id = p_mission_id;

  FOR v_writer IN
    SELECT * FROM (VALUES (m.accepted_by, 'lead'), (p_user_id, 'assist')) AS w(user_id, role)
    ORDER BY user_id
  LOOP
    PERFORM public.record_mission_completion(
      v_writer.user_id, m.house, 'coop', p_mission_id, v_writer.role, 1
    );
  END LOOP;

  RETURN 'joined';
END;
$$;

-- New functions: have PostgREST pick them up now rather than on its next
-- cache refresh, or the deploy's first completions fail until then.
NOTIFY pgrst, 'reload schema';
