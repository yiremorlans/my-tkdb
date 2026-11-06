-- Announcements (docs/announcements.md): ephemeral notices sent after a
-- player's command, warning of scheduled maintenance or offering a free
-- cooldown reset.
--
-- The notices themselves live in constants/announcements.js. This table holds
-- only the per-player side: when each player last saw each notice (so it goes
-- out at most once per local day), and whether they claimed a reset offer.
--
-- A claimed, unspent row is a banked cooldown reset, exactly like an unspent
-- mission_log row (016): spend_cooldown_reset below spends either, and it
-- clears both /roam and /meet, like a solo mission's reset. Spent rows keep
-- their claim, so the same offer can never be claimed twice.

CREATE TABLE IF NOT EXISTS announcement_views (
  discord_user_id TEXT NOT NULL,
  announcement_id TEXT NOT NULL,
  last_shown_at   TIMESTAMP WITH TIME ZONE,
  claimed_at      TIMESTAMP WITH TIME ZONE,
  reset_spent_at  TIMESTAMP WITH TIME ZONE,
  reset_spent_on  TEXT,
  PRIMARY KEY (discord_user_id, announcement_id)
);

-- The banked-credit lookup (countAnnouncementResets, spend_cooldown_reset):
-- only the handful of claimed-but-unspent rows per player.
CREATE INDEX IF NOT EXISTS idx_announcement_views_unspent
  ON announcement_views (discord_user_id, claimed_at)
  WHERE claimed_at IS NOT NULL AND reset_spent_at IS NULL;

-- Same posture as every other table: the service role bypasses RLS, and there
-- is no legitimate client-side reader.
ALTER TABLE announcement_views ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Block direct access" ON announcement_views;
CREATE POLICY "Block direct access" ON announcement_views FOR SELECT USING (FALSE);

-- Claim today's showing of each open notice in one statement. Returns the ids
-- this call actually claimed: never seen, or last seen before p_day_start, and
-- not a reset the player already claimed. Two commands landing together can't
-- both show the same notice, because the upsert's row lock decides.
CREATE OR REPLACE FUNCTION mark_announcements_shown(
  p_user_id   TEXT,
  p_ids       TEXT[],
  p_day_start TIMESTAMP WITH TIME ZONE
)
RETURNS TEXT[] LANGUAGE sql AS $$
  WITH shown AS (
    INSERT INTO announcement_views AS v (discord_user_id, announcement_id, last_shown_at)
    SELECT p_user_id, id, NOW() FROM unnest(p_ids) AS id
    ON CONFLICT (discord_user_id, announcement_id) DO UPDATE
       SET last_shown_at = EXCLUDED.last_shown_at
     WHERE v.claimed_at IS NULL
       AND (v.last_shown_at IS NULL OR v.last_shown_at < p_day_start)
    RETURNING v.announcement_id
  )
  SELECT COALESCE(array_agg(announcement_id), ARRAY[]::TEXT[]) FROM shown;
$$;

-- Claim one reset offer. TRUE when this call banked it, FALSE when the player
-- already had. Whether the offer is still open is checked in
-- announcements.js against the constants file, before this runs.
CREATE OR REPLACE FUNCTION claim_announcement_reset(
  p_user_id         TEXT,
  p_announcement_id TEXT
)
RETURNS BOOLEAN LANGUAGE sql AS $$
  WITH claimed AS (
    INSERT INTO announcement_views AS v (discord_user_id, announcement_id, claimed_at)
    VALUES (p_user_id, p_announcement_id, NOW())
    ON CONFLICT (discord_user_id, announcement_id) DO UPDATE
       SET claimed_at = NOW()
     WHERE v.claimed_at IS NULL
    RETURNING 1
  )
  SELECT EXISTS (SELECT 1 FROM claimed);
$$;

-- 028's spend, with announcement credits as a third source. Order: co-op
-- mission credits (cheapest), then other mission credits, then claimed
-- announcement resets, oldest first within each. Everything else is
-- unchanged.
CREATE OR REPLACE FUNCTION spend_cooldown_reset(
  p_user_id          TEXT,
  p_command          TEXT,
  p_cooldown_seconds INT
)
RETURNS TEXT LANGUAGE plpgsql AS $$
DECLARE
  v_cutoff  TIMESTAMP WITH TIME ZONE := NOW() - (p_cooldown_seconds * INTERVAL '1 second');
  v_row     RECORD;
  v_blocked BOOLEAN := FALSE;
  v_longest TEXT;
  v_credit  mission_log;
  v_notice  announcement_views;
  v_result  TEXT;
BEGIN
  -- One read locks both clocks before the credit is touched, so a /roam or
  -- /meet completing in the same instant cannot re-stamp either behind this
  -- and strand a spent reset. Most recent stamp first: the longest wait left,
  -- the clicked command on a tie.
  FOR v_row IN
    SELECT command_name, last_used_at FROM command_limits
     WHERE discord_user_id = p_user_id AND command_name IN ('roam', 'meet')
     ORDER BY last_used_at DESC, (command_name <> p_command)
     FOR UPDATE
  LOOP
    CONTINUE WHEN v_row.last_used_at <= v_cutoff;
    v_longest := COALESCE(v_longest, v_row.command_name);
    v_blocked := v_blocked OR v_row.command_name = p_command;
  END LOOP;

  IF NOT v_blocked THEN RETURN 'not_needed'; END IF;

  SELECT * INTO v_credit FROM mission_log
   WHERE discord_user_id = p_user_id AND reset_spent_at IS NULL
   ORDER BY (mission_type <> 'coop'), completed_at
   LIMIT 1
   FOR UPDATE SKIP LOCKED;

  IF FOUND THEN
    v_result := CASE WHEN v_credit.mission_type = 'coop' THEN v_longest ELSE 'both' END;
  ELSE
    SELECT * INTO v_notice FROM announcement_views
     WHERE discord_user_id = p_user_id
       AND claimed_at IS NOT NULL AND reset_spent_at IS NULL
     ORDER BY claimed_at
     LIMIT 1
     FOR UPDATE SKIP LOCKED;

    IF NOT FOUND THEN RETURN 'none'; END IF;
    v_result := 'both';
  END IF;

  DELETE FROM command_limits
   WHERE discord_user_id = p_user_id
     AND command_name = ANY (CASE WHEN v_result = 'both'
                                  THEN ARRAY['roam', 'meet']
                                  ELSE ARRAY[v_result] END);

  IF v_credit.id IS NOT NULL THEN
    UPDATE mission_log
       SET reset_spent_at = NOW(), reset_spent_on = v_result
     WHERE id = v_credit.id;
  ELSE
    UPDATE announcement_views
       SET reset_spent_at = NOW(), reset_spent_on = v_result
     WHERE discord_user_id = v_notice.discord_user_id
       AND announcement_id = v_notice.announcement_id;
  END IF;

  RETURN v_result;
END;
$$;
