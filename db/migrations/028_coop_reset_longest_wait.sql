-- A co-op's one-command reset now clears whichever of /roam or /meet has the
-- longest wait left, not the command whose cooldown reply carried the button.
--
-- Both clocks are 3h but rarely in step, and the player can't see which one
-- the button is bound to. Someone blocked on /meet with 8 minutes left would
-- spend a reset worth 8 minutes while /roam sat on 2h50m. The longer wait is
-- always the one worth clearing, so the RPC decides it instead of the click.
--
-- Unchanged: the button's own command must still be cooling down (a stale
-- button on a clock that has since cleared keeps the credit), co-op credits
-- are spent before two-command ones, and a solo reset clears both. On a tie
-- the clicked command wins.

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

  -- Cheapest sufficient credit first. A co-op's reset clears one command, which
  -- serves the longer wait just as well as a solo mission's two-command reset
  -- would — so spend the co-op one and leave the better one banked. Oldest
  -- first within a scope.
  SELECT * INTO v_credit FROM mission_log
   WHERE discord_user_id = p_user_id AND reset_spent_at IS NULL
   ORDER BY (mission_type <> 'coop'), completed_at
   LIMIT 1
   FOR UPDATE SKIP LOCKED;

  IF NOT FOUND THEN RETURN 'none'; END IF;

  v_result := CASE WHEN v_credit.mission_type = 'coop' THEN v_longest ELSE 'both' END;

  DELETE FROM command_limits
   WHERE discord_user_id = p_user_id
     AND command_name = ANY (CASE WHEN v_result = 'both'
                                  THEN ARRAY['roam', 'meet']
                                  ELSE ARRAY[v_result] END);

  UPDATE mission_log
     SET reset_spent_at = NOW(), reset_spent_on = v_result
   WHERE id = v_credit.id;

  RETURN v_result;
END;
$$;
