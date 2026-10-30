-- ⚠️  IMPORTANT: meet_encounters contains user data (Discord IDs) and a
-- short-lived interaction token. Same exposure rules as every other table
-- here — service role only.

-- /meet as the Activity (docs/hangout-activity.md §11).
--
-- Three pieces, all for the one feature:
--
-- 1. meet_encounters — the encounter a /meet pick saves when it launches the
--    Activity instead of composing an image (meetActivity.js
--    handleMeetPickLaunch). The Activity is a browser page the user can edit,
--    so everything that decides the payout (mood flag, beat key) lives here
--    and never comes back from the client (§11.3). One row per click; the
--    answer route deletes it, so it can only be answered once. A row nobody
--    answers is pruned after a day (housekeeping, not a gameplay timer: the
--    encounter itself has no timer while the Activity stays open).
--
--    interaction_token is the click's webhook token, kept to grey out the
--    picker, post the ~30s image fallback and edit the result onto the
--    /meet message. Discord expires it 15 minutes after the click; after
--    that the edits just fail and are skipped.
--
-- 2. app_settings.meet_activity_off — the /meet-only off switch (§11.7).
--    While TRUE, clicking a name gives today's image flow for everyone; the
--    rest of the bot keeps running (unlike maintenance_mode, migration 024).
--    Same operating model: flipped by hand in SQL, never by a bot command,
--    and cached 60s in maintenance.js (isMeetActivityOff):
--
--      UPDATE app_settings SET meet_activity_off = TRUE  WHERE id = 1;
--      UPDATE app_settings SET meet_activity_off = FALSE WHERE id = 1;
--
-- 3. command_usage_log.path — which way a completed /meet went: 'activity'
--    (answered in the Activity) or 'fallback' (answered on the image the
--    bot posted because the Activity never loaded the encounter). NULL for
--    everything else, including /meet's plain image flow while the off
--    switch is on. Tells how reliably the Activity opens.
--
-- ⚠️ Run this BEFORE deploying the app code. The /meet pick reads
-- meet_activity_off (a missing column reads as off = FALSE, i.e. the
-- Activity), but saving an encounter needs meet_encounters, and a completed
-- Activity /meet logs its path into command_usage_log.

ALTER TABLE app_settings
  ADD COLUMN IF NOT EXISTS meet_activity_off BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE command_usage_log
  ADD COLUMN IF NOT EXISTS path TEXT CHECK (path IN ('activity', 'fallback'));

CREATE TABLE IF NOT EXISTS meet_encounters (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  discord_user_id   TEXT NOT NULL,
  character_id      TEXT NOT NULL,
  -- The /meet picker message the click came from: one encounter per picker,
  -- enforced by the click handler in case Discord refuses to grey it out.
  picker_message_id TEXT,
  -- The Activity instance the launch opened (with_response=true on the
  -- launch). NULL if Discord didn't return one; the Activity then loads
  -- the user's newest such encounter.
  instance_id       TEXT,
  interaction_token TEXT NOT NULL,
  -- The draw, in docs/hangout-activity.md §11.5's order.
  background_file   TEXT,
  outfit            TEXT,
  variant           TEXT NOT NULL,
  tier              TEXT NOT NULL,
  intro             TEXT NOT NULL,
  notice            TEXT,
  line              TEXT NOT NULL,
  -- { kind, playful, bold, neutral } → the label shown, already resolved.
  responses         JSONB NOT NULL,
  mood              BOOLEAN NOT NULL DEFAULT FALSE,
  beat_key          TEXT,
  -- Set when the Activity first loads it; the image fallback only fires
  -- while this is NULL.
  loaded_at         TIMESTAMP WITH TIME ZONE,
  created_at        TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_meet_encounters_user
  ON meet_encounters (discord_user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_meet_encounters_picker
  ON meet_encounters (picker_message_id);
CREATE INDEX IF NOT EXISTS idx_meet_encounters_created
  ON meet_encounters (created_at);

ALTER TABLE meet_encounters ENABLE ROW LEVEL SECURITY;

-- CREATE POLICY has no IF NOT EXISTS, so drop first to keep this file re-runnable.
DROP POLICY IF EXISTS "Block direct access" ON meet_encounters;
CREATE POLICY "Block direct access" ON meet_encounters FOR SELECT USING (FALSE);

-- ============================================================
-- prune_meet_encounters — unanswered encounters after a day
-- ============================================================
CREATE OR REPLACE FUNCTION public.prune_meet_encounters()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  DELETE FROM public.meet_encounters
  WHERE created_at < now() - INTERVAL '1 day';
END;
$$;

CREATE EXTENSION IF NOT EXISTS pg_cron;

SELECT cron.unschedule('prune-meet-encounters')
WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'prune-meet-encounters');

-- Hourly at :20, so an encounter is gone between 24 and 25 hours after the
-- click; clear of the daily 03:15–03:50 prune jobs.
SELECT cron.schedule(
  'prune-meet-encounters',
  '20 * * * *',
  $$SELECT public.prune_meet_encounters();$$
);

-- To run it by hand:
--   SELECT public.prune_meet_encounters();
