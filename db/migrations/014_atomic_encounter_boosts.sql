-- ⚠️  IMPORTANT: These functions touch character_relationships, which holds
-- Discord IDs. Keep them behind the service role; never expose to anon/authenticated.

-- Atomic grant and spend for the /call encounter boost.
--
-- The problem this replaces
-- ------------------------
-- Both halves of the boost ledger used to be read-modify-write across two
-- round trips, so both could lose a boost:
--
--   grantEncounterBoost   SELECT the row, compute LEAST(current + 1, cap) in
--                         JS, UPDATE it back. Two wins resolving in the same
--                         instant (the same user solving encounters in two
--                         guilds) both read 0, both write 1 — one win's reward
--                         is gone. The cap is 2, so this is a real loss, not a
--                         cap artifact.
--
--   consumeAllEncounter-  SELECT the pending count, then UPDATE it to 0 and
--   Boosts                credit the count it read. A win landing between those
--                         two statements is zeroed by the UPDATE but never
--                         credited to anyone. The `> 0` guard in the UPDATE
--                         stops two *responses* double-claiming, but it cannot
--                         see a grant that arrived after the SELECT.
--
-- Same fix as claim_command_slot (migration 012): stop deciding and writing
-- separately. The decision and the write become one event, under a row lock
-- Postgres takes for us.
--
-- One consequence worth stating: a win that lands mid-spend now blocks on the
-- lock and applies *after* the zeroing, so its boost survives to the winner's
-- next /roam instead of being eaten. That is the outcome the feature always
-- described.

-- ============================================================
-- grant_encounter_boost
-- ============================================================
-- One statement, and it creates the relationship row when the winner has never
-- met the character — so the /call win path no longer needs a
-- getOrCreateRelationship round trip before it (three trips become one).
--
-- The cap is a parameter rather than baked in here, so ENCOUNTER_BOOST_CAP in
-- constants/publicEncounters.js stays the single source of truth for game
-- balance — same reasoning as p_cooldown_seconds in migration 012. This
-- function is only ever called by the bot backend, so that argument is trusted.
--
-- Returns the new pending count.
CREATE OR REPLACE FUNCTION public.grant_encounter_boost(
  p_user_id      TEXT,
  p_character_id TEXT,
  p_cap          INT
)
RETURNS INT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  granted INT;
BEGIN
  -- The alias is what lets the DO UPDATE below refer to the *existing* row:
  -- inside ON CONFLICT the stored row is named by the insert target and the
  -- proposed row by EXCLUDED, and aliasing the target keeps that unambiguous
  -- under `SET search_path = ''`.
  --
  -- LEAST on the insert branch too, so a cap of 0 means 0 for a first win as
  -- well as a later one.
  INSERT INTO public.character_relationships AS cr
    (discord_user_id, character_id, affinity, times_met, pending_encounter_boost)
  VALUES
    (p_user_id, p_character_id, 0, 0, LEAST(1, p_cap))
  ON CONFLICT (discord_user_id, character_id) DO UPDATE
    SET pending_encounter_boost = LEAST(cr.pending_encounter_boost + 1, p_cap)
  RETURNING cr.pending_encounter_boost INTO granted;

  RETURN granted;
END;
$$;

-- ============================================================
-- consume_encounter_boosts
-- ============================================================
-- Spend every pending boost at once and return how many were spent. Two wins
-- with one character are a single reunion, not two, so the next authored
-- response folds in the whole bonus rather than dribbling +1 across two /roams.
--
-- SELECT ... FOR UPDATE takes the row lock; the function body is one
-- transaction, so the lock is held through the UPDATE and a concurrent
-- grant_encounter_boost waits rather than slipping between the two statements.
--
-- A missing row (never met this character) returns 0, not an error — the
-- ordinary case for a /roam with someone the user has no history with.
CREATE OR REPLACE FUNCTION public.consume_encounter_boosts(
  p_user_id      TEXT,
  p_character_id TEXT
)
RETURNS INT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  claimed INT;
BEGIN
  SELECT pending_encounter_boost INTO claimed
  FROM public.character_relationships
  WHERE discord_user_id = p_user_id
    AND character_id = p_character_id
  FOR UPDATE;

  IF claimed IS NULL OR claimed <= 0 THEN
    RETURN 0;
  END IF;

  UPDATE public.character_relationships
  SET pending_encounter_boost = 0
  WHERE discord_user_id = p_user_id
    AND character_id = p_character_id;

  RETURN claimed;
END;
$$;

-- To exercise by hand (cap 2 matches ENCOUNTER_BOOST_CAP):
--   SELECT public.grant_encounter_boost('123456789', 'rui', 2);
--   SELECT public.consume_encounter_boosts('123456789', 'rui');
-- To inspect the ledger:
--   SELECT discord_user_id, character_id, pending_encounter_boost
--   FROM character_relationships WHERE pending_encounter_boost > 0;
