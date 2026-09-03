# Database Migration Guide

## Prerequisites

1. **Supabase Project** — You should have a Supabase project set up
2. **Environment Variables** — Ensure your `.env` file has:
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```
   
   Find these in:
   - Supabase Dashboard → Settings → API
   - **Use the Service Role Key (not the Anon Key)**

## Step 1: Update Your Environment Variables

If you haven't already, add the service role key to your `.env`:

```bash
# .env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_service_role_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

> ⚠️ Keep the Service Role Key secret! Never commit it to git.

## Step 2: Run Migrations in Supabase

Go to your Supabase Dashboard:
1. Click **SQL Editor** in the left sidebar
2. Click **New Query**
3. Copy and paste the contents of each migration file **in order**:

### Migration 1: User Activity Table
- File: `db/migrations/001_create_user_activity.sql`
- Copy the entire SQL file and execute it
- Wait for success ✓

### Migration 2: Character Engagement Table
- File: `db/migrations/002_create_character_engagement.sql`
- Copy and execute
- Wait for success ✓

### Migration 3: Monthly Analytics Table
- File: `db/migrations/003_create_monthly_analytics.sql`
- Copy and execute
- Wait for success ✓

### Migration 4: RLS Policies & Analytics Views
- File: `db/migrations/004_enable_rls_and_analytics.sql`
- Copy and execute
- Wait for success ✓

### Migration 5: Monthly Counter Reset Job
- File: `db/migrations/005_monthly_reset.sql`
- Enables `pg_cron` and schedules `snapshot_and_reset_monthly_counters()` for
  00:00 UTC on the 1st of each month (snapshots the finished month into
  `monthly_analytics`, then zeroes `commands_this_month` on `user_activity` and
  `character_engagement`)
- Copy and execute
- Wait for success ✓

### Migration 6: monthly_analytics RLS + trends view fix
- File: `db/migrations/006_rls_monthly_analytics_and_trends_fix.sql`
- Enables RLS on `monthly_analytics` (missed in migration 3) and fixes a
  double-count in `vw_engagement_trends`
- Copy and execute
- Wait for success ✓

### Migration 7: Command Usage Log Table
- File: `db/migrations/007_create_command_usage_log.sql`
- Append-only analytics log — one row per command invocation
  (`discord_user_id`, `command_name`, `used_at`)
- Copy and execute
- Wait for success ✓

### Migration 8: Command Limits Table (Cooldowns)
- File: `db/migrations/008_create_command_limits.sql`
- One row per user per rate-limited command, holding the timestamp of that
  user's last completed encounter. Read by `checkCommandLimit()` to enforce the
  rolling 3-hour cooldown. Separate from `command_usage_log` so rate-limiting
  never depends on that log surviving
- Copy and execute
- Wait for success ✓

### Migration 9: Command Usage Log Prune Job
- File: `db/migrations/009_prune_command_usage_log.sql`
- Enables `pg_cron` and schedules `prune_command_usage_log()` for 03:15 UTC
  daily, deleting `command_usage_log` rows older than 90 days so the log stays
  bounded. Does not touch cooldowns or the monthly counters
- Run it by hand any time with `SELECT public.prune_command_usage_log();`
- Copy and execute
- Wait for success ✓

### Migration 10: Public Encounter Tables
- File: `db/migrations/010_create_public_encounters.sql`
- Creates `guild_settings`, `public_encounters` and `encounter_milestones`
  (a per-`(user, character, milestone_type)` tally with a `total`, plus the
  atomic `record_encounter_milestone()` that bumps it), and adds
  `pending_encounter_boost` to `character_relationships`. There is deliberately
  no per-guess log. See `docs/public-encounters.md`
- If an earlier run of this file created `encounter_milestones` in its old
  append-only shape (one row per win), re-running folds those rows into the
  tally by `(user, character, milestone_type)` and drops the old table
- Cadence is stored as `last_encounter_at` + `next_gap_minutes` (an elapsed-time
  anchor, like `command_limits.last_used_at`), so a redeploy resumes the
  existing schedule instead of resetting it, and the database never holds a
  literal next-spawn timestamp
- Adds a partial unique index (`guild_id WHERE resolved_at IS NULL`) so two
  instances overlapping during a rolling redeploy cannot both post an encounter.
  If it fails to create, a guild already has two unresolved rows — the file has
  the clean-up query in a comment
- Copy and execute
- Wait for success ✓

### Migration 11: Encounter Win Stats + Retention
- File: `db/migrations/011_encounter_win_stats.sql`
- Creates `encounter_win_stats` (monthly `/call` engagement — one row per user
  per guild per month) and `record_encounter_win()`, an atomic
  `INSERT ... ON CONFLICT` the bot calls via RPC on every win
- Also schedules `prune_encounter_data()` at 03:30 UTC daily, which is what
  keeps the encounter tables from growing forever:
  | Table | Kept for |
  |---|---|
  | `public_encounters` — unsolved | 7 days |
  | `public_encounters` — solved | 90 days |
  | `encounter_win_stats` | 13 months |
  | `encounter_milestones` | **not pruned** — player-visible progression, and a bounded per-kind tally with nothing to prune |
- Run it by hand any time with `SELECT public.prune_encounter_data();`
- Copy and execute
- Wait for success ✓

### Migration 12: Atomic Command Cooldown Claim
- File: `db/migrations/012_atomic_command_limit_claim.sql`
- Creates `claim_command_slot()`, which decides *and* stamps a `/roam` or
  `/meet` cooldown in one statement. It replaces a SELECT-then-UPSERT pair whose
  gap let two dialogue responses arriving together both pass the check and both
  grant affinity — the "queue up prompts, redeem them all at once" bypass
- Adds no table; `command_limits` (migration 8) is unchanged
- ⚠️ **Run this BEFORE deploying the app code that calls it.** `claimCommandUse`
  fails *closed* by design, so if the function is missing every dialogue
  response is refused with "Something went wrong there. Try again?" — `/roam`
  and `/meet` will hand out nothing until this migration lands
- Verify with: `SELECT public.claim_command_slot('test-user', 'roam', 10800);`
  → returns `true` the first time, `false` immediately after. Clean up with
  `DELETE FROM command_limits WHERE discord_user_id = 'test-user';`
- Copy and execute
- Wait for success ✓

### Migration 13: Guild Kill Switch (`locked`)
- File: `db/migrations/013_guild_settings_locked.sql`
- Adds `guild_settings.locked` (BOOLEAN NOT NULL DEFAULT FALSE) — an owner-only
  switch that outranks `enabled`
- Why it exists: `enabled` alone does not hold. `/encounters channel` is an
  upsert that writes `enabled: true` unconditionally, so any member with Manage
  Server can undo a manual disable with one command. **No bot command writes
  `locked`** — set it in SQL only
- Enforced in three places: `handleEncountersAdmin` (every subcommand refuses),
  `getEnabledGuilds` (the scheduler never sees the guild), and `handleCall` (a
  guild locked mid-flight stops being answerable)
- ⚠️ **Run this BEFORE deploying the app code.** `getEnabledGuilds` filters on
  the column, so if it's missing that query errors and **no guild spawns
  anywhere** until the migration lands
- Lock a guild:
  ```sql
  UPDATE guild_settings SET locked = TRUE, enabled = FALSE WHERE guild_id = '<guild id>';
  ```
- See who is locked:
  ```sql
  SELECT guild_id, enabled, locked, encounter_channel_id, configured_by
  FROM guild_settings ORDER BY locked DESC, guild_id;
  ```
- Unlocking sets only `locked = FALSE`; `enabled` stays false, so an admin has
  to run `/encounters channel` again to actually resume
- Copy and execute
- Wait for success ✓

## Step 3: Verify Migrations

In the Supabase Dashboard, click **Table Editor** and verify:

**Tables Created:**
- [ ] `user_activity`
- [ ] `character_engagement`
- [ ] `character_relationships` (should already exist, now has RLS)
- [ ] `monthly_analytics`

**Views Created:**
- [ ] `vw_popular_characters`
- [ ] `vw_monthly_character_stats`
- [ ] `vw_platform_stats`
- [ ] `vw_characters_by_affinity`
- [ ] `vw_engagement_trends`

## Step 4: Test Your Bot

Once migrations are complete, test that your bot can:

```javascript
// In your bot code
import { updateAffinity, trackUserActivity, trackCharacterEngagement } from './db/supabase.js';

// Test tracking user activity
await trackUserActivity('discord_user_123');

// Test tracking character engagement
await trackCharacterEngagement('discord_user_123', 'alice');

// Test updating affinity
await updateAffinity('discord_user_123', 'alice', 10);
```

If these work without errors, your database is ready! ✓

## Step 5: Deploy Analytics

To expose analytics publicly (without PII):

```javascript
// In your API/web endpoint
import { getAnalyticsDashboard } from './db/supabase.js';

app.get('/api/analytics', async (req, res) => {
  const analytics = await getAnalyticsDashboard();
  res.json(analytics); // Safe to send publicly - no Discord IDs
});
```

## Troubleshooting

### Error: "Missing SUPABASE_SERVICE_ROLE_KEY"
- Add `SUPABASE_SERVICE_ROLE_KEY` to your `.env` file
- Get it from Supabase Dashboard → Settings → API → Service Role Key

### Error: "Table already exists"
- This means the migration already ran
- Safe to re-run (CREATE IF NOT EXISTS handles this)

### Error: "RLS policy creation failed"
- Check that the table was created successfully in the previous step
- Verify the Supabase project is accessible

### Bot can't update affinity
- Verify `SUPABASE_SERVICE_ROLE_KEY` is correct in `.env`
- Service role key must be used (not Anon key)
- Restart your bot after updating `.env`

## What Got Deployed

### Tables
- **user_activity** — Tracks overall user engagement (monthly resets)
- **character_engagement** — Tracks per-character usage
- **character_relationships** — Affinity scores (existing, now with RLS)
- **monthly_analytics** — Historical snapshots for reporting

### Security
- ✅ RLS enabled on all user data tables
- ✅ Raw user data protected from direct queries
- ✅ Service role key required for bot updates
- ✅ Analytics views are public (no PII exposed)

### Analytics
- 5 anonymized views for safe public consumption
- 6 helper functions in `supabase.js`
- Complete dashboard data in one call

## Next Steps

1. **Monthly Reset** — Handled by migration 5 (`pg_cron` job
   `monthly-counter-reset`). Run it by hand any time with:
   ```sql
   SELECT public.snapshot_and_reset_monthly_counters();
   ```

2. **Build Analytics Page** — Use `getAnalyticsDashboard()` to power your analytics UI

3. **Monitor Usage** — Use the views to track engagement and character popularity

Done! 🎉
