-- Global maintenance kill switch.
--
-- The problem this solves
-- ------------------------
-- Every other kill switch in this schema (guild_settings.locked, 013) is
-- scoped to one guild. There was no equivalent for the whole app: a way to
-- take every /roam, /meet, /call, /mission, /bonds, /affinity, /house, and
-- every button that continues one of them, and have all of it answer "under
-- maintenance" instead of touching the database, without a redeploy.
--
-- app_settings is a one-row singleton (id is CHECKed to 1, so a second row
-- can never be inserted) rather than a per-guild table, because this flag
-- has no guild scope — it is process-wide.
--
-- Same operating model as guild_settings.locked: nothing in the bot writes
-- this column. It is flipped by hand, in SQL:
--
--   UPDATE app_settings SET maintenance_mode = TRUE  WHERE id = 1;
--   UPDATE app_settings SET maintenance_mode = FALSE WHERE id = 1;
--
-- Read via db/supabase.js's getMaintenanceMode, itself only ever called
-- through maintenance.js's isMaintenanceModeActive, which caches the value
-- in memory for a few seconds so the flag doesn't cost a Supabase round trip
-- on every single interaction. Checked in two places, because user-driven
-- and scheduler-driven activity are two different code paths:
--   1. app.js, before any command or component branch runs — covers every
--      slash command and every button (/roam, /meet, /call, /mission,
--      /bonds, /affinity, /house, and everything that continues them).
--      /encdev and /missiondev are exempt from the block — both hard-gate on
--      OWNER_DISCORD_ID inside their own handlers already, so exempting them
--      by name only ever grants access to the bot owner, never to a guild
--      admin.
--   2. encounterScheduler.js's runTick — covers the 45s scheduler loop that
--      spawns public encounters and fires mission slots on its own timer,
--      independently of app.js. Without this, the app.js gate alone would
--      still leave the scheduler posting new activity into every enabled
--      guild while everyone else is locked out.
CREATE TABLE IF NOT EXISTS app_settings (
  id               SMALLINT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  maintenance_mode BOOLEAN NOT NULL DEFAULT FALSE,
  updated_at       TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

INSERT INTO app_settings (id, maintenance_mode)
VALUES (1, FALSE)
ON CONFLICT (id) DO NOTHING;

-- Same posture as every other table here: service role (what db/supabase.js
-- connects as) bypasses RLS entirely, so this only blocks direct
-- anon/authenticated access — there is no legitimate client-side reader of a
-- kill switch.
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Block direct access" ON app_settings;
CREATE POLICY "Block direct access" ON app_settings FOR SELECT USING (FALSE);
