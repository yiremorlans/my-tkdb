-- ⚠️  IMPORTANT: This table contains user activity data (Discord IDs)
-- Only expose anonymized/aggregated data in public analytics
-- Never publish raw rows with discord_user_id

-- ============================================================
-- One-time rescale: preserve every existing player's heart-bar ratio across
-- the 2026-09 RELATIONSHIP_LEVELS stretch (constants/game.js)
-- ============================================================
-- Friend through Soulbound's thresholds moved up ~1.5x (Acquaintance's 20 was
-- deliberately left alone, so leveling spans more encounters without touching
-- how many points a single response earns. Left untouched, every existing
-- player's /affinity heart bar would visibly LOSE hearts on their next check
-- — same stored points, a farther-away next level — even though nothing was
-- taken from them. This rescales every existing row's `affinity` to the point
-- value that sits at the SAME ratio within its band under the new curve, so
-- the bar renders exactly as it did before the stretch. Rows created from
-- here on are born on the new curve and accrue against it normally.
--
-- Old band -> new band, and the per-band rescale factor:
--   Stranger      0-20    -> 0-20    (unchanged, no rescale)
--   Acquaintance  20-50   -> 20-75   (x 55/30)
--   Friend        50-100  -> 75-150  (x 75/50)
--   Close Friend  100-175 -> 150-260 (x 110/75)
--   Confidant     175-275 -> 260-415 (x 155/100)
--   Devoted       275-400 -> 415-600 (x 185/125)
--   Soulbound     400+    -> 600+    (flat +200 shift — open-ended, nothing to
--                                      take a ratio of)
--
-- db/migrate.js reruns every file in this directory on every deploy with no
-- migration-tracking table. A plain UPDATE here would not just repeat
-- harmlessly on the next redeploy — a row's post-rescale value can land
-- inside a DIFFERENT band's old range (e.g. a rescaled Acquaintance value can
-- exceed 50, the old Friend floor), so re-running the same CASE would rescale
-- it a second time using the wrong band and corrupt it. curve_v2_rescaled
-- guards against that exactly like missions.post_reconcile_needed (019)
-- guards a different rerun-safety problem: NULL until a row is touched, TRUE
-- forever after, and TRUE by default for every row created from here on —
-- new rows are already on the new curve and must never be rescaled.
ALTER TABLE character_relationships
  ADD COLUMN IF NOT EXISTS curve_v2_rescaled BOOLEAN;

UPDATE character_relationships
SET
  affinity = CASE
    WHEN affinity < 20  THEN affinity
    WHEN affinity < 50  THEN ROUND(20  + (affinity - 20)  * 55.0  / 30)::INT
    WHEN affinity < 100 THEN ROUND(75  + (affinity - 50)  * 75.0  / 50)::INT
    WHEN affinity < 175 THEN ROUND(150 + (affinity - 100) * 110.0 / 75)::INT
    WHEN affinity < 275 THEN ROUND(260 + (affinity - 175) * 155.0 / 100)::INT
    WHEN affinity < 400 THEN ROUND(415 + (affinity - 275) * 185.0 / 125)::INT
    ELSE                     600 + (affinity - 400)
  END,
  curve_v2_rescaled = TRUE
WHERE curve_v2_rescaled IS NOT TRUE
  AND affinity >= 0;

-- Anything the rescale above didn't touch (affinity NULL or negative — neither
-- occurs under the current, non-negative-only affinity model) still has to
-- end up TRUE, or it would be re-evaluated against the CASE above forever.
UPDATE character_relationships
SET curve_v2_rescaled = TRUE
WHERE curve_v2_rescaled IS NOT TRUE;

ALTER TABLE character_relationships
  ALTER COLUMN curve_v2_rescaled SET DEFAULT TRUE,
  ALTER COLUMN curve_v2_rescaled SET NOT NULL;
