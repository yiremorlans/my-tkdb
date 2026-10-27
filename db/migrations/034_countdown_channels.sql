-- Countdown channels (docs/countdown.md §10). A voice, stage or category
-- channel whose name counts down to the next Wishing Well date or the next of
-- a server's own events. Independent of encounters and missions: a server can
-- run countdowns with neither enabled, which is why the scheduler finds these
-- guilds through countdown_channels rather than guild_settings.enabled.
--
-- No user data beyond who configured what (Discord IDs). Service role only,
-- like every other table here.

-- ============================================================
-- guild_settings — the server's countdown calendar
-- ============================================================
-- A countdown-only server gets a row with enabled = false and no encounter
-- channel, which the table already allows.
ALTER TABLE guild_settings
  -- IANA name. Discord servers have no timezone, and a channel name is the
  -- same text for every viewer, so each server picks one calendar (§2).
  ADD COLUMN IF NOT EXISTS countdown_timezone TEXT NOT NULL DEFAULT 'America/Los_Angeles',
  -- Next custom event #ID. Only ever increments, so IDs are never reused and
  -- two events can share a name safely.
  ADD COLUMN IF NOT EXISTS next_event_number  INT NOT NULL DEFAULT 1;

-- ============================================================
-- countdown_channels — one row per (guild, kind)
-- ============================================================
CREATE TABLE IF NOT EXISTS countdown_channels (
  guild_id        TEXT NOT NULL,              -- matches guild_settings.guild_id; no FK
  kind            TEXT NOT NULL CHECK (kind IN ('wishingwell', 'customevent')),
  channel_id      TEXT,                       -- NULL = this kind is off
  original_name   TEXT,                       -- saved at setup, restored by disable
  rendered_name   TEXT,                       -- last name the bot successfully wrote
  renamed_at      TIMESTAMP WITH TIME ZONE,   -- for the 5-minute rename guard
  rename_failures INT NOT NULL DEFAULT 0,     -- consecutive; 3 clears channel_id
  disabled_reason TEXT,                       -- why the auto-disable fired
  configured_by   TEXT,
  created_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  PRIMARY KEY (guild_id, kind)
);

-- The two kinds can't share a channel: each would overwrite the other's name.
CREATE UNIQUE INDEX IF NOT EXISTS countdown_channels_one_kind_per_channel
  ON countdown_channels (guild_id, channel_id)
  WHERE channel_id IS NOT NULL;

-- The scheduler's guild list.
CREATE INDEX IF NOT EXISTS countdown_channels_configured
  ON countdown_channels (guild_id)
  WHERE channel_id IS NOT NULL;

-- ============================================================
-- countdown_events — a server's custom events
-- ============================================================
-- event_date is a local date in the guild's timezone, entered that way. A
-- timezone change leaves it alone.
CREATE TABLE IF NOT EXISTS countdown_events (
  guild_id     TEXT NOT NULL,
  event_number INT NOT NULL,
  name         TEXT NOT NULL CHECK (char_length(name) BETWEEN 1 AND 80),
  event_date   DATE NOT NULL,
  created_by   TEXT,
  created_at   TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  PRIMARY KEY (guild_id, event_number)
);

CREATE INDEX IF NOT EXISTS countdown_events_by_date
  ON countdown_events (guild_id, event_date);

ALTER TABLE countdown_channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE countdown_events   ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- create_countdown_event — cap + #ID + insert in one transaction
-- ============================================================
-- Locking the guild_settings row serializes concurrent creates in one guild,
-- so two admins at once can't exceed the cap or claim the same #ID. Events
-- dated before p_today are past and get pruned first, so they never hold a
-- slot under the cap.
--
-- Returns the new event_number, or NULL when the guild is at p_cap.
CREATE OR REPLACE FUNCTION public.create_countdown_event(
  p_guild_id   TEXT,
  p_name       TEXT,
  p_event_date DATE,
  p_created_by TEXT,
  p_today      DATE,
  p_cap        INT
)
RETURNS INT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_number INT;
BEGIN
  INSERT INTO guild_settings (guild_id) VALUES (p_guild_id)
  ON CONFLICT (guild_id) DO NOTHING;

  SELECT next_event_number INTO v_number
    FROM guild_settings WHERE guild_id = p_guild_id
     FOR UPDATE;

  DELETE FROM countdown_events
   WHERE guild_id = p_guild_id AND event_date < p_today;

  IF (SELECT COUNT(*) FROM countdown_events WHERE guild_id = p_guild_id) >= p_cap THEN
    RETURN NULL;
  END IF;

  INSERT INTO countdown_events (guild_id, event_number, name, event_date, created_by)
  VALUES (p_guild_id, v_number, p_name, p_event_date, p_created_by);

  UPDATE guild_settings
     SET next_event_number = v_number + 1, updated_at = NOW()
   WHERE guild_id = p_guild_id;

  RETURN v_number;
END;
$$;
