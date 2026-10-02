-- ⚠️  IMPORTANT: missions contains user activity data (Discord IDs). Same
-- exposure rules as every other table here — service role only.

-- The Chancellor's audience: a lucky errand house-change click lets the player
-- name the new house with /request instead of rolling one. This column records
-- that the audience was granted, so it survives a restart.
--
-- It is only ever set, never cleared. The audience counts as open while the
-- house change itself is still available (house_changed_at NULL, nothing
-- signed), which the app derives when it reads the row; spending the change or
-- collecting a signature closes it with no write here. change_errand_house
-- (migration 025) still gates the actual change under the row lock.

ALTER TABLE missions
  ADD COLUMN IF NOT EXISTS chancellor_audience_at TIMESTAMP WITH TIME ZONE; -- errand only: when the Chancellor agreed to hear a house request; open only while the house change is still available
