-- ⚠️  IMPORTANT: these tables contain user activity data (Discord IDs). Same
-- exposure rules as every other table here — service role only, no raw rows
-- in public analytics.

-- ============================================================
-- One-time rescale: preserve every existing player's inspector rank across
-- the 2026-09 INSPECTOR_RANKS doubling (constants/missions.js)
-- ============================================================
-- Every threshold doubled uniformly this time (0/15/40/90/160 -> 0/30/80/
-- 180/320), unlike RELATIONSHIP_LEVELS' stretch in migration 020 where
-- Acquaintance's floor was deliberately left in place. A flat x2 on stored
-- points preserves every rescaled player's position exactly — no per-band
-- ratio math needed, unlike 020's CASE.
--
-- Only players who had already left Novice (old total points >= 15, the old
-- Field Inspector floor) get rescaled. Novice's own floor never moved (0
-- either way), so a player still there has nothing to preserve — leaving
-- their points untouched is simpler and touches less live data than doubling
-- a number that was never going to change their rank.
--
-- Both mission_log.points (the raw ledger) and house_progress.points (the
-- durable rollup, migration 021) are rescaled together, for the same reason
-- 020 had to touch character_relationships and nothing upstream of it: 021's
-- backfill INSERT ... ON CONFLICT DO UPDATE re-sums house_progress from
-- mission_log on every migration run (db/migrate.js reruns every file, every
-- time, with no tracking table). Doubling house_progress alone would get
-- stomped back down to the un-rescaled raw sum the very next time these files
-- run. Doubling both keeps the rollup self-consistent regardless of rerun
-- order.
--
-- inspector_curve_v2_rescaled guards both tables against being doubled twice,
-- exactly like character_relationships.curve_v2_rescaled (020) and
-- missions.post_reconcile_needed (019): NULL until a row is touched, TRUE
-- forever after (whether or not that row's points actually changed), and
-- TRUE by default for every row created from here on — new rows are already
-- earned on the doubled scale and must never be rescaled.

ALTER TABLE mission_log
  ADD COLUMN IF NOT EXISTS inspector_curve_v2_rescaled BOOLEAN;

ALTER TABLE house_progress
  ADD COLUMN IF NOT EXISTS inspector_curve_v2_rescaled BOOLEAN;

-- Players whose OLD total (summed across every house) had already cleared the
-- old Field Inspector floor. Rank is always summed across a player's full
-- house_progress roster (missions.js buildDossierMessage / getMissionLogStats),
-- never a single house's row, so eligibility has to be computed the same way.
WITH eligible_users AS (
  SELECT discord_user_id
  FROM house_progress
  GROUP BY discord_user_id
  HAVING SUM(points) >= 15
)
UPDATE house_progress hp
SET points = points * 2,
    inspector_curve_v2_rescaled = TRUE
FROM eligible_users eu
WHERE hp.discord_user_id = eu.discord_user_id
  AND hp.inspector_curve_v2_rescaled IS NOT TRUE;

WITH eligible_users AS (
  SELECT discord_user_id
  FROM house_progress
  GROUP BY discord_user_id
  HAVING SUM(points) >= 15
)
UPDATE mission_log ml
SET points = points * 2,
    inspector_curve_v2_rescaled = TRUE
FROM eligible_users eu
WHERE ml.discord_user_id = eu.discord_user_id
  AND ml.inspector_curve_v2_rescaled IS NOT TRUE;

-- Still-Novice players (and anything the join above didn't reach, e.g. a
-- mission_log row for a user with no house_progress row yet) never had their
-- points changed, but the flag still has to land TRUE or they'd be
-- re-evaluated against the eligibility check forever.
UPDATE house_progress
SET inspector_curve_v2_rescaled = TRUE
WHERE inspector_curve_v2_rescaled IS NOT TRUE;

UPDATE mission_log
SET inspector_curve_v2_rescaled = TRUE
WHERE inspector_curve_v2_rescaled IS NOT TRUE;

ALTER TABLE house_progress
  ALTER COLUMN inspector_curve_v2_rescaled SET DEFAULT TRUE,
  ALTER COLUMN inspector_curve_v2_rescaled SET NOT NULL;

ALTER TABLE mission_log
  ALTER COLUMN inspector_curve_v2_rescaled SET DEFAULT TRUE,
  ALTER COLUMN inspector_curve_v2_rescaled SET NOT NULL;
