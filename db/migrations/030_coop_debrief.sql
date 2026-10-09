-- ⚠️  IMPORTANT: missions contains user activity data (Discord IDs). Same
-- exposure rules as every other table here — service role only.

-- Co-op debriefs (docs/scheduled-missions.md §21).
--
-- Each player in a completed co-op opens one private debrief, off the
-- completion post's Debrief button or /mission's reminder. These two columns
-- are the one-claim-per-player arbiters: the claim is a single conditional
-- UPDATE ... WHERE <col> IS NULL (db/supabase.js claimDebrief), so a double
-- click claims once. No RPC: nothing else has to change in the same write.

ALTER TABLE missions
  ADD COLUMN IF NOT EXISTS lead_debriefed_at   TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS helper_debriefed_at TIMESTAMP WITH TIME ZONE;

-- Co-ops completed before launch never had a debrief to claim. Mark them
-- claimed so /mission doesn't surface a backlog of reminders for them.
UPDATE missions
   SET lead_debriefed_at   = COALESCE(lead_debriefed_at, NOW()),
       helper_debriefed_at = COALESCE(helper_debriefed_at, NOW())
 WHERE mission_type = 'coop' AND status = 'completed';

-- /mission's reminder lookup (getUnclaimedDebriefs), one query per role. Only
-- unclaimed completed co-ops are indexed, so both stay tiny: a row drops out
-- the moment its player claims.
CREATE INDEX IF NOT EXISTS idx_missions_unclaimed_lead_debrief
  ON missions (accepted_by)
  WHERE mission_type = 'coop' AND status = 'completed' AND lead_debriefed_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_missions_unclaimed_helper_debrief
  ON missions (helper_user_id)
  WHERE mission_type = 'coop' AND status = 'completed' AND helper_debriefed_at IS NULL;

-- New columns: have PostgREST pick them up now rather than on its next cache
-- refresh, or the first debrief claims fail until then.
NOTIFY pgrst, 'reload schema';
