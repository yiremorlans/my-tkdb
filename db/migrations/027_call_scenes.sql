-- ⚠️  IMPORTANT: public_encounters contains user activity data (Discord IDs).
-- Same exposure rules as every other table here — service role only.

-- Call scenes (docs/public-encounters.md §17): a rare /call win posts an
-- interactive scene reply instead of the reveal embed. Only what the click and
-- the closeout can't get elsewhere is stored: everything else is recomputed
-- from the relationship or read back off the post itself. Both nullable: a row
-- whose win used the normal reveal (or that was never won) leaves them NULL,
-- and they are pruned with the row at 90 days like everything else.
--
-- scene_resolved_at is the one-click arbiter, in the same shape as
-- resolved_at: the click claims it with a conditional
-- UPDATE ... WHERE scene_resolved_at IS NULL, so a double-click or a click
-- racing the closeout resolves to exactly one affinity grant.

ALTER TABLE public_encounters
  ADD COLUMN IF NOT EXISTS scene_message_id  TEXT,        -- the scene post; NULL means the win used the normal reveal
  ADD COLUMN IF NOT EXISTS scene_resolved_at TIMESTAMP WITH TIME ZONE; -- set by the click or the closeout

-- The closeout lookup on each spawn: this guild's scenes still waiting on a click.
CREATE INDEX IF NOT EXISTS idx_public_encounters_open_scene
ON public_encounters (guild_id)
WHERE scene_message_id IS NOT NULL AND scene_resolved_at IS NULL;
