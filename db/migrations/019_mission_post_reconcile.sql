-- ⚠️  IMPORTANT: These tables contain user activity data (Discord IDs)
-- Only expose anonymized/aggregated data in public analytics
-- Never publish raw rows with discord_user_id

-- ============================================================
-- missions.post_reconcile_needed — the "the post never got updated" retry hook
-- ============================================================
-- A won claim (claim_mission -> 'claimed', migration 016) has to be followed by
-- an edit to the public channel post: swap the live Accept button out so nobody
-- else clicks a mission that is already taken. That edit goes out over the
-- interaction webhook in the moment of the click (app.js), and it can fail on
-- its own even though the RPC committed:
--
--   * the interaction token expired — a slow claim_mission ate Discord's 3s
--     ack window, so DEFERRED_UPDATE_MESSAGE never registered and every webhook
--     call on the token 404s ("Unknown Webhook")
--   * a transient Discord 5xx / gateway timeout on the edit itself
--   * the post was deleted, or the bot lost permissions in the channel
--
-- When that happens the row is 'accepted' but the post still shows a live
-- button, and no other sweep reconciles it: finalizeWithdrawnMission only edits
-- 'open' rows on withdrawal, and finalizeLapsedMission deliberately leaves an
-- accepted post alone (it already said "X picked up the mission" hours ago).
--
-- This flag is the backstop. app.js sets it when that edit throws;
-- reconcileMissionPosts() on the mission tick edits the post with the BOT token
-- (the interaction webhook is long dead by then) to a name-free "already taken"
-- line with the button stripped, and clears the flag on success.
ALTER TABLE missions
  ADD COLUMN IF NOT EXISTS post_reconcile_needed BOOLEAN NOT NULL DEFAULT FALSE;

-- Normally zero rows — a partial index keeps the tick's read cheap however long
-- the mission history grows, same pattern as missions_one_accepted_per_user.
CREATE INDEX IF NOT EXISTS idx_missions_post_reconcile
  ON missions (post_reconcile_needed) WHERE post_reconcile_needed;
