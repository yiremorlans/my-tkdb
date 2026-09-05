-- ⚠️  IMPORTANT: These tables contain user activity data (Discord IDs)
-- Only expose anonymized/aggregated data in public analytics
-- Never publish raw rows with discord_user_id

-- Scheduled missions (docs/scheduled-missions.md)
-- Six times a local day a scheduler posts a public "mission request" with a
-- single Accept button into each configured guild's channel. The first user to
-- click picks it up; what the mission actually IS (house + type) is only ever
-- revealed to the accepter, through /mission.
--
-- Everything the scheduler needs to survive a restart lives here: the day's
-- slot times and which of them have already fired are columns on
-- guild_settings, so there are no in-process timers holding schedule state.
--
-- TWO tables, deliberately. An earlier draft of this feature had four, adding
-- `mission_signatures` (one row per errand target) and `mission_cooldown_resets`
-- (one row per banked reward). Neither was ever read on its own — both were
-- only ever fetched alongside the row they hang off — so each cost a second
-- round trip on every read path and bought nothing a column could not hold.
-- They are folded in here as `missions.signatures` and
-- `mission_log.reset_spent_at`. See the notes on each.

-- ============================================================
-- guild_settings — mission config + per-day slot state
-- ============================================================
-- The table itself is created in 010_create_public_encounters.sql. Missions
-- ride on the same row so one guild has one config.
--
-- As with encounters, only the channel and the on/off switch are per-guild.
-- Count, spacing, window and the per-player daily cap are fixed constants in
-- constants/missions.js — identical in every server and not configurable at
-- runtime. This table deliberately carries no override columns for them.
ALTER TABLE guild_settings
  ADD COLUMN IF NOT EXISTS mission_channel_id     TEXT,     -- NULL -> fall back to encounter_channel_id
  ADD COLUMN IF NOT EXISTS missions_enabled       BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS mission_slots_day      DATE,     -- local date mission_slots_today was rolled for
  ADD COLUMN IF NOT EXISTS mission_slots_today    JSONB,    -- array of ISO timestamps, one per band
  ADD COLUMN IF NOT EXISTS mission_slots_fired    JSONB NOT NULL DEFAULT '[]'::jsonb, -- slot indices already posted
  -- Deliberately NOT guild_settings.post_failures: a mission post failing must
  -- never switch off public encounters, and vice versa. Same threshold, same
  -- auto-disable behaviour, its own counter and its own switch.
  ADD COLUMN IF NOT EXISTS mission_post_failures  INT NOT NULL DEFAULT 0;

-- ============================================================
-- missions — one row per posted mission request
-- ============================================================
-- At most one row per guild should be 'open' at a time (the scheduler skips a
-- slot rather than post a second live request). Unlike public_encounters that
-- is a soft rule, not an index: a spent slot is simply spent, and the cost of
-- a rare double-post during a rolling redeploy is one extra mission, not a
-- corrupted claim.
--
-- status is the whole state machine:
--   open      -> posted, nobody has picked it up
--   accepted  -> claimed by accepted_by, running against accept_expires_at
--   completed -> filed / solved / backed up
--   expired   -> post TTL ran out unclaimed, or the accept window ran out
CREATE TABLE IF NOT EXISTS missions (
  id                BIGSERIAL PRIMARY KEY,
  guild_id          TEXT NOT NULL,
  channel_id        TEXT NOT NULL,
  message_id        TEXT,                       -- the channel post; set after POST succeeds
  mission_type      TEXT NOT NULL,              -- 'errand' | 'riddle' | 'coop'
  house             TEXT NOT NULL,              -- a HOUSES value; never shown in the channel
  riddle_id         TEXT,                       -- key into RIDDLES[house]; NULL unless type='riddle'

  -- Errand only. `{"<character_id>": null | "<signed timestamp>"}`, drawn from
  -- the house roster and frozen at spawn — so the key count IS the old
  -- signatures_required column, and the two can no longer disagree.
  --
  -- JSONB rather than a child table because this list is never queried on its
  -- own: every read of it (/docs, the /mission briefing, the dossier's progress
  -- line, the /roam and /meet target boost) already has the mission row in hand,
  -- and it is at most four entries. sign_errand_target() below still flips one
  -- entry in a single conditional statement, so nothing about the concurrency
  -- story is weaker than a row-per-target table would have been.
  signatures        JSONB,

  teaser            TEXT NOT NULL,              -- the MISSION_TEASERS line used
  created_at        TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  post_expires_at   TIMESTAMP WITH TIME ZONE NOT NULL,   -- created_at + POST_TTL_HOURS
  accepted_by       TEXT,
  accepted_at       TIMESTAMP WITH TIME ZONE,
  accept_expires_at TIMESTAMP WITH TIME ZONE,   -- accepted_at + ACCEPT_WINDOW_HOURS
  helper_user_id    TEXT,                       -- coop only
  assist_message_id TEXT,                       -- coop only: the public /mission assist post
  status            TEXT NOT NULL DEFAULT 'open',
  completed_at      TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_missions_guild_status ON missions (guild_id, status);

-- Serves the per-player daily lead cap's count. The partial index below covers
-- only currently-held missions, which is a different question.
CREATE INDEX IF NOT EXISTS idx_missions_accepted_by_at ON missions (accepted_by, accepted_at);

-- THE "at most one held mission per user" invariant, and the reason no cleanup
-- job is needed: completed/expired rows leave the partial index's predicate, so
-- finishing a mission (or letting it lapse) frees the slot by itself.
--
-- claim_mission's NOT EXISTS handles the ordinary case with a friendly message,
-- but it is vulnerable to write skew — one user double-clicking two DIFFERENT
-- fresh mission posts within a few milliseconds, where under READ COMMITTED
-- both subqueries can read "no accepted mission" before either commits. This
-- index is what actually stops that: the second commit raises 23505 and the
-- caller reports it as "you already have a mission".
CREATE UNIQUE INDEX IF NOT EXISTS missions_one_accepted_per_user
  ON missions (accepted_by) WHERE status = 'accepted';

-- ============================================================
-- mission_log — the durable completion record AND the reward ledger
-- ============================================================
-- Deliberately not derived from `missions`: this is the Inspector dossier's
-- whole progression (/house), so it must outlive any pruning of the raw
-- mission rows. `points` is what ranks and per-house bars are summed from —
-- an errand is worth its signature count, a riddle or a co-op exactly 1.
--
-- It is also the banked-reset ledger, which is why there is no separate credits
-- table. A completion grants exactly one reset, and there is already exactly
-- one row here per completion, so the credit IS the row: unspent while
-- reset_spent_at IS NULL. That gets the audit trail (which mission paid for
-- which cleared cooldown) for free, and lets the dossier read a player's rank,
-- their per-house tally and their unspent balance out of one query.
--
-- The reset's SCOPE is derived rather than stored: a co-op clears one command,
-- anything else clears both. That is a fact about mission_type, so storing it
-- twice would only create a way for the two to disagree.
CREATE TABLE IF NOT EXISTS mission_log (
  id              BIGSERIAL PRIMARY KEY,
  discord_user_id TEXT NOT NULL,
  house           TEXT NOT NULL,
  mission_type    TEXT NOT NULL,                  -- 'errand' | 'riddle' | 'coop'
  mission_id      BIGINT REFERENCES missions(id) ON DELETE SET NULL,
  role            TEXT NOT NULL DEFAULT 'lead',   -- 'lead' | 'assist'
  points          INT  NOT NULL DEFAULT 1,
  completed_at    TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  -- The banked cooldown reset this completion granted. NULL = still held.
  reset_spent_at  TIMESTAMP WITH TIME ZONE,
  reset_spent_on  TEXT                            -- 'roam' | 'meet' | 'both'
);
CREATE INDEX IF NOT EXISTS idx_mission_log_user       ON mission_log (discord_user_id);
CREATE INDEX IF NOT EXISTS idx_mission_log_user_house ON mission_log (discord_user_id, house);
-- The only hot read: "how many unspent does this user hold", asked on the
-- cooldown-blocked path of /roam and /meet. Partial, so it stays small however
-- long the completion history grows.
CREATE INDEX IF NOT EXISTS idx_mission_log_unspent
  ON mission_log (discord_user_id) WHERE reset_spent_at IS NULL;

-- The two tables this feature no longer has. Harmless on a fresh database; on
-- one where an earlier draft of this migration ran, this is what collapses it.
DROP TABLE IF EXISTS mission_signatures CASCADE;
DROP TABLE IF EXISTS mission_cooldown_resets CASCADE;
ALTER TABLE missions DROP COLUMN IF EXISTS signatures_required;

-- ============================================================
-- Claim RPCs — every race that matters is one atomic statement
-- ============================================================
-- Governing rule for the callers: the channel post is only ever mutated on a
-- confirmed 1-row win. Every other outcome (lost the race, already holding a
-- mission, at the daily cap, mission already gone) is an ephemeral reply that
-- leaves the post and its live button untouched — you cannot per-user disable a
-- button on a shared message, so an ineligible user WILL click it, and that has
-- to be safe.

-- The Accept button. The "mission is open" test, the "this user holds no other
-- mission" test and the daily cap test are all the SAME statement, so an
-- ineligible click updates zero rows and the mission stays open for the next
-- person.
--
-- The daily cap counts missions ACCEPTED since p_day_start, not ones finished:
-- accepting is the act that denies everyone else, so taking two and letting
-- both lapse spends the player's day either way. The day boundary is passed in
-- because "today" means the local day the slot window is drawn against, and
-- constants/missions.js already owns that conversion.
--
-- Returns 'claimed' | 'taken' | 'capped' | 'busy:<type>'.
CREATE OR REPLACE FUNCTION claim_mission(
  p_mission_id     BIGINT,
  p_user_id        TEXT,
  p_accept_hours   INT DEFAULT 48,
  p_day_start      TIMESTAMP WITH TIME ZONE DEFAULT NULL,
  p_daily_lead_cap INT DEFAULT NULL
)
RETURNS TEXT LANGUAGE plpgsql AS $$
DECLARE v_led_today INT;
BEGIN
  UPDATE missions
     SET accepted_by = p_user_id,
         accepted_at = NOW(),
         accept_expires_at = NOW() + (p_accept_hours * INTERVAL '1 hour'),
         status = 'accepted'
   WHERE id = p_mission_id
     AND status = 'open'
     AND NOT EXISTS (
       SELECT 1 FROM missions
        WHERE accepted_by = p_user_id AND status = 'accepted'
     )
     -- A NULL cap or day start disables the limit.
     AND (
       p_daily_lead_cap IS NULL OR p_day_start IS NULL
       OR (
         SELECT count(*) FROM missions
          WHERE accepted_by = p_user_id AND accepted_at >= p_day_start
       ) < p_daily_lead_cap
     );

  IF FOUND THEN
    RETURN 'claimed';
  ELSIF EXISTS (SELECT 1 FROM missions WHERE id = p_mission_id AND status = 'open') THEN
    -- Still open, so the blocker was this user rather than a lost race.
    IF p_daily_lead_cap IS NOT NULL AND p_day_start IS NOT NULL THEN
      SELECT count(*) INTO v_led_today FROM missions
       WHERE accepted_by = p_user_id AND accepted_at >= p_day_start;

      -- Reported ahead of 'busy' when both apply. Telling someone to go finish
      -- their current mission implies another is waiting for them afterwards,
      -- and at cap that is false.
      IF v_led_today >= p_daily_lead_cap THEN RETURN 'capped'; END IF;
    END IF;

    RETURN 'busy:' || COALESCE(
      (SELECT mission_type FROM missions
        WHERE accepted_by = p_user_id AND status = 'accepted' LIMIT 1),
      'unknown');
  ELSE
    RETURN 'taken';
  END IF;
END;
$$;

-- Sign one errand target off, at the /roam or /meet response step.
--
-- Takes the USER rather than a mission id: the caller (encounters.js, at the
-- moment a meeting becomes real) knows who responded and to whom, but not
-- whether either has anything to do with a mission. Resolving that here turns
-- what was a lookup plus a conditional write into one round trip on a path
-- every single response pays for.
--
-- The `signatures->>p_character_id IS NULL` guard is what makes it idempotent:
-- meeting the same target twice signs once. Returns the new progress as
-- {"signed": n, "total": n, "house": "..."} , or NULL if nothing was signed —
-- which is the overwhelmingly common case, since most responses have no errand
-- behind them at all.
CREATE OR REPLACE FUNCTION sign_errand_target(p_user_id TEXT, p_character_id TEXT)
RETURNS JSONB LANGUAGE plpgsql AS $$
DECLARE v_mission missions;
BEGIN
  UPDATE missions
     SET signatures = jsonb_set(signatures, ARRAY[p_character_id], to_jsonb(NOW()))
   WHERE accepted_by = p_user_id
     AND status = 'accepted'
     AND mission_type = 'errand'
     AND signatures ? p_character_id
     AND signatures->>p_character_id IS NULL
  RETURNING * INTO v_mission;

  IF NOT FOUND THEN RETURN NULL; END IF;

  RETURN jsonb_build_object(
    'house', v_mission.house,
    'total', (SELECT count(*) FROM jsonb_object_keys(v_mission.signatures)),
    'signed', (SELECT count(*) FROM jsonb_each(v_mission.signatures) WHERE value <> 'null'::jsonb)
  );
END;
$$;

-- The /docs "Complete mission" button. FOR UPDATE serializes this against the
-- scheduler's accept_expires_at sweep: whichever locks the row first wins, the
-- other sees the terminal state and reports it.
--
-- The unsigned re-count is what makes a stale button harmless — a report that
-- was short a signature when it was rendered cannot be filed by clicking an
-- old message. Returns 'filed:<points>' | 'not_ready' | 'gone', with the point
-- value read from the same locked row so the caller cannot pay out a count
-- that disagrees with what it just checked.
CREATE OR REPLACE FUNCTION file_errand(p_mission_id BIGINT, p_user_id TEXT)
RETURNS TEXT LANGUAGE plpgsql AS $$
DECLARE v_mission missions;
BEGIN
  SELECT * INTO v_mission FROM missions
   WHERE id = p_mission_id AND accepted_by = p_user_id
     AND status = 'accepted' AND mission_type = 'errand'
   FOR UPDATE;
  IF NOT FOUND THEN RETURN 'gone'; END IF;

  IF EXISTS (
    SELECT 1 FROM jsonb_each(v_mission.signatures) WHERE value = 'null'::jsonb
  ) THEN
    RETURN 'not_ready';
  END IF;

  UPDATE missions SET status = 'completed', completed_at = NOW() WHERE id = p_mission_id;
  RETURN 'filed:' || (SELECT count(*) FROM jsonb_object_keys(v_mission.signatures));
END;
$$;

-- The co-op "Join the mission" button. The helper does NOT spend a mission
-- slot of their own — assisting is a free social bonus, which is why nothing
-- here touches accepted_by (and so nothing touches the partial unique index).
CREATE OR REPLACE FUNCTION claim_coop_helper(p_mission_id BIGINT, p_user_id TEXT)
RETURNS TEXT LANGUAGE plpgsql AS $$
DECLARE m missions;
BEGIN
  SELECT * INTO m FROM missions WHERE id = p_mission_id FOR UPDATE;
  IF NOT FOUND
     OR m.status <> 'accepted' OR m.mission_type <> 'coop' OR m.helper_user_id IS NOT NULL
  THEN RETURN 'taken'; END IF;
  IF m.accepted_by = p_user_id THEN RETURN 'self'; END IF;

  UPDATE missions
     SET helper_user_id = p_user_id, status = 'completed', completed_at = NOW()
   WHERE id = p_mission_id AND status = 'accepted' AND helper_user_id IS NULL;
  RETURN 'joined';
END;
$$;

-- The riddle solve. One conditional UPDATE; FOUND is false if the mission
-- expired in the same instant, which the caller reports as "that mission just
-- closed" rather than paying out.
CREATE OR REPLACE FUNCTION complete_mission(p_mission_id BIGINT, p_user_id TEXT, p_type TEXT)
RETURNS BOOLEAN LANGUAGE plpgsql AS $$
BEGIN
  UPDATE missions SET status = 'completed', completed_at = NOW()
   WHERE id = p_mission_id AND accepted_by = p_user_id
     AND status = 'accepted' AND mission_type = p_type;
  RETURN FOUND;
END;
$$;

-- ============================================================
-- Banked cooldown resets — spent straight out of mission_log
-- ============================================================
-- Finishing a mission used to clear the /roam and /meet cooldowns on the spot.
-- That quietly punished good timing: a player who solved a riddle with four
-- minutes left on their clock got four minutes of value out of the same reward
-- another player got three hours from, and nothing about the mission told them
-- to wait. So the reward is BANKED — an unspent mission_log row — and spent by
-- the player, from a button that only appears on the "you're still on cooldown"
-- reply to /roam or /meet. You cannot waste it by finishing a mission at the
-- wrong moment, and you cannot spend it on a clock that is already clear.
--
-- The cooldown check, the credit pick and both writes are one statement block
-- under one transaction, which is what makes every double-click safe:
--
--   * clicking twice with one credit — the second call finds nothing unspent
--     and returns 'none'. Never two spends.
--   * clicking twice with two credits — the first cleared the clock, so the
--     second returns 'not_needed' and the spare credit is kept. A stale button
--     on an old ephemeral cannot quietly eat a reward.
--   * two clients racing the same credit — SKIP LOCKED hands the row to one of
--     them and the other looks past it, so neither blocks and neither
--     double-spends.
--
-- Returns 'roam' | 'meet' | 'both' (what was cleared), 'none' (nothing banked)
-- or 'not_needed' (that clock is already clear).
--
-- p_cooldown_seconds is a parameter for the same reason claim_command_slot's
-- is: COOLDOWN_MS in commandLimits.js stays the single source of truth.
CREATE OR REPLACE FUNCTION spend_cooldown_reset(
  p_user_id          TEXT,
  p_command          TEXT,
  p_cooldown_seconds INT
)
RETURNS TEXT LANGUAGE plpgsql AS $$
DECLARE
  v_last   TIMESTAMP WITH TIME ZONE;
  v_credit mission_log;
  v_result TEXT;
BEGIN
  -- Locked before the credit is touched, so a /roam completing in the same
  -- instant cannot re-stamp the clock behind this and strand a spent reset.
  SELECT last_used_at INTO v_last FROM command_limits
   WHERE discord_user_id = p_user_id AND command_name = p_command
   FOR UPDATE;

  IF NOT FOUND OR v_last <= NOW() - (p_cooldown_seconds * INTERVAL '1 second') THEN
    RETURN 'not_needed';
  END IF;

  -- Cheapest sufficient credit first. A co-op's reset clears one command, which
  -- serves the command they are blocked on just as well as a solo mission's
  -- two-command reset would — so spend the co-op one and leave the better one
  -- banked. Oldest first within a scope.
  SELECT * INTO v_credit FROM mission_log
   WHERE discord_user_id = p_user_id AND reset_spent_at IS NULL
   ORDER BY (mission_type <> 'coop'), completed_at
   LIMIT 1
   FOR UPDATE SKIP LOCKED;

  IF NOT FOUND THEN RETURN 'none'; END IF;

  IF v_credit.mission_type = 'coop' THEN
    v_result := p_command;
    DELETE FROM command_limits
     WHERE discord_user_id = p_user_id AND command_name = p_command;
  ELSE
    v_result := 'both';
    DELETE FROM command_limits
     WHERE discord_user_id = p_user_id AND command_name IN ('roam', 'meet');
  END IF;

  UPDATE mission_log
     SET reset_spent_at = NOW(), reset_spent_on = v_result
   WHERE id = v_credit.id;

  RETURN v_result;
END;
$$;

-- ============================================================
-- RLS — service role only, same as every other table here
-- ============================================================
ALTER TABLE missions    ENABLE ROW LEVEL SECURITY;
ALTER TABLE mission_log ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Block direct access" ON missions;
DROP POLICY IF EXISTS "Block direct access" ON mission_log;
CREATE POLICY "Block direct access" ON missions    FOR SELECT USING (FALSE);
CREATE POLICY "Block direct access" ON mission_log FOR SELECT USING (FALSE);
