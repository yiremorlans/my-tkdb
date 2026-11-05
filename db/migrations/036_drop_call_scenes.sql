-- Call scenes were removed on 2026-11-04 (docs/public-encounters.md §17):
-- their faces had drifted from the Live2D rigs' expressions, and the click
-- paid affinity where a /call win should only ever leave a boost. Every win now
-- takes the normal reveal, boost and milestone. This reverses
-- 027_call_scenes.sql.
--
-- Old scene posts keep their buttons in Discord; app.js answers a click on one
-- with "That moment has passed." and reads nothing from the row. Scenes still
-- open at deploy lapse without their closeout boost. The `call_scene_*` rows
-- in command_usage_log stay as history.

DROP INDEX IF EXISTS idx_public_encounters_open_scene;

ALTER TABLE public_encounters
  DROP COLUMN IF EXISTS scene_message_id,
  DROP COLUMN IF EXISTS scene_resolved_at;
