-- ⚠️  IMPORTANT: These tables contain user activity data (Discord IDs)
-- Only expose anonymized/aggregated data in public analytics
-- Never publish raw rows with discord_user_id

-- Public "call out" encounters (docs/public-encounters.md)
-- A scheduler posts a silhouetted character into each configured guild's
-- channel; the first user to /call the right name wins. Everything the
-- scheduler needs to survive a restart lives here — there are no in-process
-- timers holding cadence state.

-- ============================================================
-- guild_settings — per-guild feature config
-- ============================================================
-- One row per guild that has ever configured the feature. The scheduler
-- iterates rows WHERE enabled = true.
--
-- Only the channel and the on/off switch are per-guild. Cadence and window are
-- fixed constants in constants/publicEncounters.js — identical in every server,
-- not configurable at runtime, and this table deliberately carries no override
-- columns for them. An earlier draft had
-- cadence_min_minutes / cadence_max_minutes / window_minutes here, but nothing
-- ever wrote them, so they were dead weight that read as a working feature.
-- Add them back alongside an /encounters subcommand that sets them, not before.
CREATE TABLE IF NOT EXISTS guild_settings (
  guild_id             TEXT PRIMARY KEY,
  encounter_channel_id TEXT,
  enabled              BOOLEAN NOT NULL DEFAULT FALSE,
  -- Cadence is anchored the same way /roam and /meet are (command_limits):
  -- store when it last happened, not when it should next happen, and derive
  -- readiness from elapsed time. The gap is randomised per spawn, so unlike
  -- those fixed 3-hour cooldowns the rolled interval has to be stored with it.
  last_encounter_at    TIMESTAMP WITH TIME ZONE, -- when this guild last spawned
  next_gap_minutes     INT,                      -- minutes to wait from that point
  post_failures        INT NOT NULL DEFAULT 0,   -- consecutive POST failures; 3 -> auto-disable
  configured_by        TEXT,
  created_at           TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at           TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Drops the dead override columns if an earlier version of this file already
-- created them. Harmless on a fresh database.
ALTER TABLE guild_settings DROP COLUMN IF EXISTS cadence_min_minutes;
ALTER TABLE guild_settings DROP COLUMN IF EXISTS cadence_max_minutes;
ALTER TABLE guild_settings DROP COLUMN IF EXISTS window_minutes;

-- Superseded by last_encounter_at + next_gap_minutes above. Storing the future
-- target meant the database literally held "the next spawn is at HH:MM", which
-- is the one fact this feature must not hand anybody.
ALTER TABLE guild_settings DROP COLUMN IF EXISTS next_encounter_at;

-- ============================================================
-- public_encounters — one row per posted encounter
-- ============================================================
-- At most one row per guild should be unresolved (resolved_at IS NULL) at any
-- time; the scheduler enforces that by checking for an active row before it
-- spawns. resolved_at is also the winner-race arbiter: the claim is a single
-- conditional UPDATE ... WHERE resolved_at IS NULL, so exactly one concurrent
-- /call can ever come back with a row.
CREATE TABLE IF NOT EXISTS public_encounters (
  id           BIGSERIAL PRIMARY KEY,
  guild_id     TEXT NOT NULL,
  channel_id   TEXT NOT NULL,
  message_id   TEXT,                       -- set after the POST succeeds
  character_id TEXT NOT NULL,
  variant      TEXT NOT NULL,              -- 'uniform' | 'casual'
  background   TEXT NOT NULL,              -- bg filename
  teaser       TEXT NOT NULL,
  created_at   TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  expires_at   TIMESTAMP WITH TIME ZONE NOT NULL,
  resolved_at  TIMESTAMP WITH TIME ZONE,   -- set on solve OR expiry-finalize
  outcome      TEXT,                       -- 'solved' | 'expired'
  solved_by    TEXT                        -- discord_user_id of the winner
);

CREATE INDEX IF NOT EXISTS idx_public_encounters_active
ON public_encounters (guild_id, resolved_at, expires_at);

-- At most one unresolved encounter per guild, enforced by the database rather
-- than by the scheduler's read-then-insert.
--
-- The application already checks getActivePublicEncounter() before spawning,
-- but that check and the INSERT are two statements: during a rolling redeploy
-- the outgoing and incoming instances overlap for a few seconds, and both can
-- pass the check before either inserts. This index makes that lose loudly
-- (unique violation, handled as "someone else got there first") instead of
-- silently posting two encounters into the same channel.
--
-- If this fails to create, a guild already has two unresolved rows; resolve the
-- older one by hand, then re-run:
--   UPDATE public_encounters SET resolved_at = now(), outcome = 'expired'
--   WHERE resolved_at IS NULL AND id NOT IN (
--     SELECT max(id) FROM public_encounters WHERE resolved_at IS NULL GROUP BY guild_id
--   );
CREATE UNIQUE INDEX IF NOT EXISTS idx_public_encounters_one_active
ON public_encounters (guild_id)
WHERE resolved_at IS NULL;

-- There is deliberately no guess log. Engagement is measured as correct calls
-- only (encounter_win_stats, migration 011); wrong guesses are not recorded
-- anywhere, so a per-guess table would be write-only storage. An earlier
-- version of this file created public_encounter_guesses — drop it if present.
DROP TABLE IF EXISTS public_encounter_guesses CASCADE;

-- ============================================================
-- Reward model — pending boost + milestone log
-- ============================================================
-- A /call win never moves affinity directly (that stays the /roam + /meet
-- authored-dialogue loop, throttled by the 3-hour cooldown). Instead a win
-- grants a pending boost, spent on the winner's next authored response with
-- that character, and records a milestone shown in /affinity.
--
-- NOTE: the affinity table is character_relationships (migration 000), not
-- "relationships" — the spec's shorthand.
ALTER TABLE character_relationships
  ADD COLUMN IF NOT EXISTS pending_encounter_boost INT NOT NULL DEFAULT 0;

-- Per-(user, character, milestone_type) tally. One row per *kind* of moment a
-- user has collected with a character, its `total` bumped on every new win of
-- that kind — not one row per win. That is all "Moments together" in /affinity
-- needs (a count per milestone type), and it keeps the table bounded: at most
-- one row per milestone type per relationship instead of growing forever.
--
-- The trade is that individual wins are no longer individually dated — there is
-- no per-win "what happened after" timeline, only first_at / last_at per kind.
-- Nothing reads such a timeline; the boosted-/roam clause only needs the kind
-- touched most recently (ORDER BY last_at).
CREATE TABLE IF NOT EXISTS encounter_milestones (
  discord_user_id TEXT NOT NULL,
  character_id    TEXT NOT NULL,
  milestone_type  TEXT NOT NULL,  -- key of ENCOUNTER_MILESTONES
  total           INT  NOT NULL DEFAULT 0,
  first_at        TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  last_at         TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  PRIMARY KEY (discord_user_id, character_id, milestone_type)
);

-- Fold an earlier append-only version of this table (id BIGSERIAL, one row per
-- win) into the tally shape by grouping its rows into per-type counts. Safe to
-- re-run: it only fires while the legacy `id` column is still present.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name  = 'encounter_milestones'
      AND column_name = 'id'
  ) THEN
    ALTER TABLE public.encounter_milestones RENAME TO encounter_milestones_legacy;

    CREATE TABLE public.encounter_milestones (
      discord_user_id TEXT NOT NULL,
      character_id    TEXT NOT NULL,
      milestone_type  TEXT NOT NULL,
      total           INT  NOT NULL DEFAULT 0,
      first_at        TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
      last_at         TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
      PRIMARY KEY (discord_user_id, character_id, milestone_type)
    );

    INSERT INTO public.encounter_milestones
      (discord_user_id, character_id, milestone_type, total, first_at, last_at)
    SELECT discord_user_id, character_id, milestone_type,
           COUNT(*), MIN(created_at), MAX(created_at)
    FROM public.encounter_milestones_legacy
    GROUP BY discord_user_id, character_id, milestone_type;

    DROP TABLE public.encounter_milestones_legacy;
  END IF;
END $$;

-- ============================================================
-- record_encounter_milestone — atomic tally bump
-- ============================================================
-- Same shape and reasoning as record_encounter_win (migration 011): one
-- statement, so two wins of the same kind landing in the same instant can't
-- lose a count the way a read-modify-write would, and one round trip on the
-- /call win path. Returns the new total for that (user, character, kind).
CREATE OR REPLACE FUNCTION public.record_encounter_milestone(
  p_user_id        TEXT,
  p_character_id   TEXT,
  p_milestone_type TEXT
)
RETURNS INT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  new_total INT;
BEGIN
  INSERT INTO public.encounter_milestones
    (discord_user_id, character_id, milestone_type, total, first_at, last_at)
  VALUES
    (p_user_id, p_character_id, p_milestone_type, 1, now(), now())
  ON CONFLICT (discord_user_id, character_id, milestone_type) DO UPDATE
    SET total   = public.encounter_milestones.total + 1,
        last_at = now()
  RETURNING total INTO new_total;

  RETURN new_total;
END;
$$;

-- ============================================================
-- Row Level Security
-- ============================================================
-- Service role (the bot backend) bypasses RLS; direct queries see nothing.
ALTER TABLE guild_settings           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public_encounters        ENABLE ROW LEVEL SECURITY;
ALTER TABLE encounter_milestones     ENABLE ROW LEVEL SECURITY;

-- CREATE POLICY has no IF NOT EXISTS, so drop first to keep this file
-- re-runnable like the CREATE TABLE / ADD COLUMN statements above.
DROP POLICY IF EXISTS "Block direct access" ON guild_settings;
DROP POLICY IF EXISTS "Block direct access" ON public_encounters;
DROP POLICY IF EXISTS "Block direct access" ON encounter_milestones;

CREATE POLICY "Block direct access" ON guild_settings           FOR SELECT USING (FALSE);
CREATE POLICY "Block direct access" ON public_encounters        FOR SELECT USING (FALSE);
CREATE POLICY "Block direct access" ON encounter_milestones     FOR SELECT USING (FALSE);
