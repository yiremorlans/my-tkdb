-- ⚠️  IMPORTANT: This function touches command_limits, which holds Discord IDs.
-- Keep it behind the service role; never expose it to anon/authenticated.

-- Atomic cooldown claim for the rate-limited commands (/roam, /meet).
--
-- The problem this replaces
-- ------------------------
-- The cooldown used to be enforced as two separate statements: a SELECT to ask
-- "is this user off cooldown?", then, once the flow completed, an UPSERT to
-- stamp it. Between those two, nothing held the slot. Two dialogue responses
-- arriving inside one round trip would both read the old timestamp, both pass,
-- and both grant affinity — so a user who queued up several /roam prompts
-- before completing any of them could redeem them all against a "once per 3h"
-- limit. Narrowing the gap made that harder but never closed it; a gap of any
-- width is still a gap.
--
-- The fix is to stop asking and stamping separately. This is one statement:
-- Postgres takes a row lock on the conflicting row, so of N callers racing for
-- the same slot exactly one comes back with a row and the rest come back empty.
-- The decision and the write are the same event, which is what makes it safe.
--
-- Semantics
-- ---------
--   no row yet                  -> INSERT wins, RETURNING yields a row  -> TRUE
--   row older than the cooldown -> DO UPDATE's WHERE passes             -> TRUE
--   row inside the cooldown     -> DO UPDATE's WHERE fails, no row      -> FALSE
--
-- A FALSE return means the caller must not grant anything. It does not say how
-- long is left — commandLimits.js re-reads for that, but only to render the
-- message, never to make the decision.
--
-- The cooldown length is a parameter rather than baked in here, so COOLDOWN_MS
-- in commandLimits.js stays the single source of truth for game balance. This
-- function is only ever called by the bot backend, so that argument is trusted.
CREATE OR REPLACE FUNCTION public.claim_command_slot(
  p_user_id          TEXT,
  p_command          TEXT,
  p_cooldown_seconds INT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  claimed_at TIMESTAMPTZ;
BEGIN
  -- The alias is what lets the WHERE below refer to the *existing* row. Inside
  -- ON CONFLICT DO UPDATE, the stored row is referenced by the insert target's
  -- name and the proposed row by EXCLUDED; aliasing the target keeps that
  -- unambiguous under `SET search_path = ''`.
  INSERT INTO public.command_limits AS cl (discord_user_id, command_name, last_used_at)
  VALUES (p_user_id, p_command, now())
  ON CONFLICT (discord_user_id, command_name) DO UPDATE
    SET last_used_at = now()
    WHERE cl.last_used_at < now() - make_interval(secs => p_cooldown_seconds)
  RETURNING cl.last_used_at INTO claimed_at;

  -- NULL means the DO UPDATE's WHERE excluded the row: someone (possibly this
  -- same user milliseconds ago) already holds the slot.
  RETURN claimed_at IS NOT NULL;
END;
$$;

-- To claim by hand while testing (3h = 10800s):
--   SELECT public.claim_command_slot('123456789', 'roam', 10800);
-- To hand a slot back:
--   DELETE FROM command_limits WHERE discord_user_id = '123456789';
