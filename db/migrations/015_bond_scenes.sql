-- ⚠️  IMPORTANT: These tables contain user data (Discord IDs and a record of
-- what each user has been sent privately). Keep them behind the service role;
-- never expose to anon/authenticated, and never publish raw rows.

-- Bond scenes — the level-up DMs (docs/bond-scene-dms.md).
--
-- When a relationship crosses into a new level the bot opens a DM and walks the
-- user through a short scene, one message per Continue click, ending on a choice
-- that grants a keepsake. Two tables carry that:
--
--   bond_scene_progress  where a given (user, character, level) scene is up to.
--                        Also the idempotency guard — the primary key is the
--                        whole "never send the same scene twice" story.
--   bond_keepsakes       what finishing one leaves behind.
--
-- There is deliberately NO expiry column and NO TTL anywhere in this migration.
-- A beat in a DM is posted with the bot token into a stored channel, so its
-- Continue button keeps working for as long as the message exists. A row that
-- has sat `in_progress` for a month is a user who hasn't clicked yet — a normal
-- resting state, not a stuck job. Nothing here is pruned; see the retention note
-- at the bottom.
--
-- What recovers a scene that stalls is not a timer but `pending_dm`: any beat
-- that was owed and did not land leaves the row in that state, and the user's
-- next command offers a one-press button to pick it back up.

-- ============================================================
-- bond_scene_progress — one row per (user, character, level)
-- ============================================================
CREATE TABLE IF NOT EXISTS bond_scene_progress (
  discord_user_id TEXT NOT NULL,
  character_id    TEXT NOT NULL,
  -- A RELATIONSHIP_LEVELS name ('Acquaintance' … 'Soulbound'). Stored as the
  -- name rather than an index because the names are load-bearing across
  -- game.js, /affinity and the dialogue tiers, and are never reordered.
  level_name      TEXT NOT NULL,

  -- queued          claimed, waiting behind an earlier unfinished scene with
  --                 the same character
  -- in_progress     started, with a live Continue sitting in the user's DMs.
  --                 Permanent-safe — it is waiting on a click, not on a clock.
  -- complete        the closing choice landed and the keepsake was granted
  -- pending_dm      a beat is OWED and did not land — either beat 0 never went
  --                 out (no shared guild, DMs closed, Discord down) or a later
  --                 beat's POST failed. There is nothing live to click, so the
  --                 resume button (§2.4) offers it on the user's next command.
  -- skipped_optout  the user has bond DMs turned off
  -- skipped_gone    no scene content resolved (character left the roster)
  status          TEXT NOT NULL DEFAULT 'queued'
    CHECK (status IN ('queued','in_progress','complete','pending_dm','skipped_optout','skipped_gone')),

  -- The DM channel every later beat is posted into. Load-bearing, not just for
  -- recovery: the whole sequence outlives the interaction token because beats
  -- go here with the bot token instead of through a webhook. NULL for inline.
  dm_channel_id   TEXT,

  -- Highest beat index posted so far; 0 right after beat 0. Drives the
  -- double-click / replay guard — a `bond:next:…:<n>` is only honoured when
  -- n = current_beat + 1.
  current_beat    INT,

  -- The closing choice, once made. Read by later dialogue (the `bondChoice`
  -- callback) so the relationship visibly remembers.
  choice_key      TEXT,

  completed_at    TIMESTAMP WITH TIME ZONE,
  created_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

  PRIMARY KEY (discord_user_id, character_id, level_name)
);

-- The two reads this feature does that aren't a primary-key lookup: "what is
-- unfinished for this user" (the inline fallback, at the top of a command) and
-- "is an earlier scene with this character still open" (the queue check).
CREATE INDEX IF NOT EXISTS idx_bond_scene_progress_user_status
ON bond_scene_progress (discord_user_id, status);

CREATE INDEX IF NOT EXISTS idx_bond_scene_progress_pair
ON bond_scene_progress (discord_user_id, character_id, status);

-- ============================================================
-- bond_keepsakes — what a finished scene leaves behind
-- ============================================================
-- Same class as encounter_milestones: bounded (at most six per bond),
-- player-visible progression, never pruned. Never spent, traded or scored — a
-- record of a moment, and the only tangible collectible in a game that
-- otherwise hides progression behind a heart bar.
--
-- The emoji and line are copied in from the scene's `keepsake` field at the
-- moment it is earned rather than looked up later, so re-authoring a character's
-- scene never rewrites a keepsake somebody already has.
CREATE TABLE IF NOT EXISTS bond_keepsakes (
  discord_user_id TEXT NOT NULL,
  character_id    TEXT NOT NULL,
  level_name      TEXT NOT NULL,
  emoji           TEXT NOT NULL,
  line            TEXT NOT NULL,
  earned_at       TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  PRIMARY KEY (discord_user_id, character_id, level_name)
);

CREATE INDEX IF NOT EXISTS idx_bond_keepsakes_user
ON bond_keepsakes (discord_user_id, character_id);

-- ============================================================
-- user_activity — the opt-out
-- ============================================================
-- A bot DM is user-visible outbound contact, so it has to be refusable. The
-- opt-out button on the very first bond DM a user ever receives sets this to
-- false; `/bonds dms:on` sets it back. Only an explicit false counts, so a row
-- written before this column existed still gets its scenes.
ALTER TABLE user_activity
  ADD COLUMN IF NOT EXISTS bond_dms_enabled BOOLEAN NOT NULL DEFAULT TRUE;

-- ============================================================
-- record_bond_scene — the claim
-- ============================================================
-- Step one of delivery, before any Discord call: INSERT … ON CONFLICT DO
-- NOTHING. Zero rows back means this level's scene already exists in some
-- state, so the caller stops — that is the entire idempotency story, and it
-- holds against a manual affinity edit in the DB, a replayed interaction, and
-- Discord double-firing the same component.
--
-- Deliberately not an upsert: a row that already exists must never be touched
-- here, whatever its status. Re-earning a level shows nothing.
--
-- Returns the claimed row, or NULL if somebody else already has it.
CREATE OR REPLACE FUNCTION public.record_bond_scene(
  p_user_id      TEXT,
  p_character_id TEXT,
  p_level_name   TEXT
)
RETURNS SETOF public.bond_scene_progress
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
AS $$
  INSERT INTO public.bond_scene_progress
    (discord_user_id, character_id, level_name, status)
  VALUES
    (p_user_id, p_character_id, p_level_name, 'queued')
  ON CONFLICT (discord_user_id, character_id, level_name) DO NOTHING
  RETURNING *;
$$;

-- ============================================================
-- complete_bond_scene — the closing choice, atomically
-- ============================================================
-- The last click of a scene has to do three things that must not come apart:
-- record the choice, close the row, and grant the keepsake. Done as three
-- round trips, a failure between them leaves a scene the user finished with no
-- keepsake to show for it, and nothing that would ever retry — the buttons are
-- gone by then.
--
-- The guard is `choice_key IS NULL`: only the first choice click for a row does
-- anything. A double-click, or Discord retrying the interaction, updates zero
-- rows and inserts no keepsake, so the grant is exactly-once without the caller
-- having to check first. Returns TRUE when this call was the one that closed
-- the scene.
CREATE OR REPLACE FUNCTION public.complete_bond_scene(
  p_user_id      TEXT,
  p_character_id TEXT,
  p_level_name   TEXT,
  p_choice_key   TEXT,
  p_emoji        TEXT,
  p_line         TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  closed_at TIMESTAMP WITH TIME ZONE;
BEGIN
  UPDATE public.bond_scene_progress
  SET choice_key   = p_choice_key,
      status       = 'complete',
      completed_at = NOW(),
      updated_at   = NOW()
  WHERE discord_user_id = p_user_id
    AND character_id    = p_character_id
    AND level_name      = p_level_name
    AND choice_key IS NULL
  RETURNING completed_at INTO closed_at;

  IF closed_at IS NULL THEN
    RETURN FALSE;
  END IF;

  -- earned_at is the scene's completed_at, not a second NOW() — they are the
  -- same event. ON CONFLICT DO NOTHING is belt-and-braces behind the choice_key
  -- guard above; a keepsake is never overwritten once earned.
  INSERT INTO public.bond_keepsakes
    (discord_user_id, character_id, level_name, emoji, line, earned_at)
  VALUES
    (p_user_id, p_character_id, p_level_name, p_emoji, p_line, closed_at)
  ON CONFLICT (discord_user_id, character_id, level_name) DO NOTHING;

  RETURN TRUE;
END;
$$;

-- ============================================================
-- RLS
-- ============================================================
-- Same shape as every other user-data table here: RLS on, one explicit deny
-- policy. The bot reads and writes with the service-role key, which bypasses
-- RLS; anon/authenticated see nothing. There is no anonymized view over either
-- table and no analytics built on them — what the game said to somebody in a
-- DM is not a metric.
ALTER TABLE bond_scene_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE bond_keepsakes      ENABLE ROW LEVEL SECURITY;

-- CREATE POLICY has no IF NOT EXISTS, so drop first to keep this file re-runnable.
DROP POLICY IF EXISTS "Block direct access" ON bond_scene_progress;
DROP POLICY IF EXISTS "Block direct access" ON bond_keepsakes;

CREATE POLICY "Block direct access" ON bond_scene_progress FOR SELECT USING (FALSE);
CREATE POLICY "Block direct access" ON bond_keepsakes      FOR SELECT USING (FALSE);

-- ============================================================
-- Retention
-- ============================================================
-- Both tables are kept forever and are absent from prune_encounter_data() on
-- purpose. They are the record of what a player has seen and earned, not
-- analytics: dropping a bond_scene_progress row would re-send a scene the user
-- has already read, and dropping a keepsake would take back a collectible.

-- To exercise by hand:
--   SELECT * FROM public.record_bond_scene('123456789', 'rui', 'Friend');
--   SELECT public.complete_bond_scene('123456789', 'rui', 'Friend',
--                                     'kind', '🔖', 'A pressed leaf, still in the book.');
--   SELECT * FROM bond_keepsakes WHERE discord_user_id = '123456789';
