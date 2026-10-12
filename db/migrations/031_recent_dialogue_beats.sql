-- ⚠️  IMPORTANT: recent_dialogue_beats contains user data (Discord IDs). Same
-- exposure rules as every other table here — service role only.

-- Recent-beat skip for /roam and /meet (recentBeatWindow in
-- constants/characters.js).
--
-- One row per (user, character): beat_keys holds the short line hashes of the
-- last few beats that player answered from that character, newest first,
-- capped at p_cap (RECENT_DIALOGUE_BEAT_WINDOW in code). It is not a log and
-- never grows past that, so nothing here needs pruning.
--
-- A beat is recorded when it is answered (a response click that passed the
-- cooldown claim), not when it is drawn: a spawn the player drops leaves no
-- trace. The click only carries the beat's key, not the list, so the prepend
-- happens in here rather than as a read-then-write from the bot.
--
-- Kept off character_relationships on purpose: a spawn is only a preview and
-- must never create a relationship row (see readRelationship in encounters.js).
-- A row here is harmless for a character the player never answered.

CREATE TABLE IF NOT EXISTS recent_dialogue_beats (
  discord_user_id TEXT NOT NULL,
  character_id    TEXT NOT NULL,
  beat_keys       TEXT[] NOT NULL DEFAULT '{}',
  updated_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  PRIMARY KEY (discord_user_id, character_id)
);

ALTER TABLE recent_dialogue_beats ENABLE ROW LEVEL SECURITY;

-- CREATE POLICY has no IF NOT EXISTS, so drop first to keep this file re-runnable.
DROP POLICY IF EXISTS "Block direct access" ON recent_dialogue_beats;
CREATE POLICY "Block direct access" ON recent_dialogue_beats FOR SELECT USING (FALSE);

-- ============================================================
-- remember_dialogue_beat
-- ============================================================
-- Move p_beat_key to the front of this pair's list (dropping any older copy)
-- and keep the newest p_cap keys, in one statement: one round trip, and two
-- clicks landing together can't overwrite each other, since the upsert takes
-- the row lock. Same shape as grant_encounter_boost (migration 014).
CREATE OR REPLACE FUNCTION public.remember_dialogue_beat(
  p_user_id      TEXT,
  p_character_id TEXT,
  p_beat_key     TEXT,
  p_cap          INT
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.recent_dialogue_beats AS rb
    (discord_user_id, character_id, beat_keys, updated_at)
  VALUES
    (p_user_id, p_character_id, ARRAY[p_beat_key], NOW())
  ON CONFLICT (discord_user_id, character_id) DO UPDATE
    SET beat_keys = (
          pg_catalog.array_prepend(
            p_beat_key,
            pg_catalog.array_remove(rb.beat_keys, p_beat_key)
          )
        )[1:p_cap],
        updated_at = NOW();
END;
$$;
