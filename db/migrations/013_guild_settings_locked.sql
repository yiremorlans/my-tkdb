-- Owner-side kill switch for one guild's encounters.
--
-- The problem this solves
-- ----------------------
-- Setting `enabled = false` by hand does not hold. `/encounters channel` is an
-- upsert that writes `enabled: true` unconditionally and clears post_failures,
-- so any member with Manage Server can undo a manual disable with one command
-- — and `/encounters status` actively tells them how ("run /encounters channel
-- to turn it back on"). `enabled` is the *server admin's* switch; there was no
-- switch that outranked them.
--
-- `locked` is that switch. Nothing a guild admin can run writes this column, so
-- it survives `/encounters channel`, `/encounters disable`, and the auto-
-- disable alike. It is set out-of-band, by the bot owner, in SQL.
--
-- Where it is enforced (three independent places, deliberately):
--   1. handleEncountersAdmin — every /encounters subcommand refuses early, so
--      a locked guild cannot reconfigure or re-enable itself.
--   2. getEnabledGuilds      — the scheduler never sees a locked guild, so even
--      if `enabled` were flipped true by some path this file didn't anticipate,
--      nothing spawns.
--   3. handleCall            — a live encounter in a guild locked mid-flight
--      stops being answerable.
--
-- An encounter already posted when the lock lands still finalizes normally via
-- the expiry sweep (which is global, not scoped to enabled guilds) — the same
-- behaviour `/encounters disable` has always had.
ALTER TABLE guild_settings
  ADD COLUMN IF NOT EXISTS locked BOOLEAN NOT NULL DEFAULT FALSE;

COMMENT ON COLUMN guild_settings.locked IS
  'Owner-only kill switch. No bot command writes this. When true the guild is '
  'invisible to the scheduler and every /encounters subcommand refuses, '
  'regardless of `enabled`. Set it in SQL, not from Discord.';

-- No index: this is filtered alongside `enabled` on a table with a handful of
-- rows, and guild_id is already the primary key.

-- ============================================================
-- Operating it
-- ============================================================
-- Lock a guild (clear `enabled` too, so /encounters status reads honestly and
-- any in-flight encounter is the last one):
--
--   UPDATE guild_settings SET locked = TRUE, enabled = FALSE
--   WHERE guild_id = '<guild id>';
--
-- Unlock — note this does NOT resume encounters on its own. `enabled` is still
-- false, so an admin has to run `/encounters channel` again, which is the
-- intended way back in:
--
--   UPDATE guild_settings SET locked = FALSE WHERE guild_id = '<guild id>';
--
-- See who is locked:
--
--   SELECT guild_id, enabled, locked, encounter_channel_id, configured_by
--   FROM guild_settings ORDER BY locked DESC, guild_id;
