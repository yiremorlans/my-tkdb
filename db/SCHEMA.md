# Database Schema Documentation

## Overview
The database tracks user activity, character engagement, and affinity relationships for analytics and personalization. All user data tables are protected with Row Level Security (RLS), and analytics are served through privacy-compliant views that never expose Discord user IDs.

## Tables

### `user_activity`
Tracks overall user engagement and usage patterns.

| Column | Type | Purpose |
|--------|------|---------|
| `id` | BIGSERIAL | Primary key |
| `discord_user_id` | TEXT (UNIQUE) | Discord user identifier |
| `last_used_at` | TIMESTAMP | When the user last ran a command |
| `commands_this_month` | INT | Commands executed in current month |
| `total_commands` | BIGINT | Lifetime command count |
| `created_at` | TIMESTAMP | Record creation time |
| `updated_at` | TIMESTAMP | Last update time |

**Use cases:**
- Track user engagement and activity streaks
- Identify most active users
- Reset monthly counters at month end

### `character_engagement`
Per-character usage analytics for determining popularity and user preferences.

| Column | Type | Purpose |
|--------|------|---------|
| `id` | BIGSERIAL | Primary key |
| `discord_user_id` | TEXT | Discord user identifier |
| `character_id` | TEXT | Character identifier |
| `commands_this_month` | INT | Commands for this character this month |
| `total_commands` | BIGINT | Lifetime commands for this character |
| `last_interacted_at` | TIMESTAMP | Most recent interaction |
| `created_at` | TIMESTAMP | Record creation time |
| `updated_at` | TIMESTAMP | Last update time |
| `UNIQUE(discord_user_id, character_id)` | - | One record per user-character pair |

**Use cases:**
- Track which characters users prefer
- Identify most popular characters overall
- Suggest new characters based on usage patterns
- Analytics: "Top 5 most used characters"

### `character_relationships` (existing)
Affinity tracking between users and characters.

| Column | Type | Purpose |
|--------|------|---------|
| `discord_user_id` | TEXT | Discord user identifier |
| `character_id` | TEXT | Character identifier |
| `affinity` | INT | Current affinity score |
| `times_met` | INT | Number of interactions |
| `last_interaction_at` | TIMESTAMP | Most recent interaction |
| `last_response_type` | TEXT | Type of last response |

**Use cases:**
- Track relationship depth with characters
- Drive dialogue variations based on affinity
- Persist character memory of user

### `monthly_analytics`
Historical snapshots of user and character activity for trend analysis.

| Column | Type | Purpose |
|--------|------|---------|
| `id` | BIGSERIAL | Primary key |
| `year_month` | TEXT | Month in "YYYY-MM" format (e.g., "2026-08") |
| `discord_user_id` | TEXT | Discord user identifier |
| `character_id` | TEXT | Character identifier (NULL for user-level stats) |
| `commands_count` | INT | Commands executed in that month |
| `unique_days_active` | INT | Days the user was active in that month |
| `first_interaction` | TIMESTAMP | First interaction in the month |
| `last_interaction` | TIMESTAMP | Last interaction in the month |
| `created_at` | TIMESTAMP | Record creation time (usually month end) |

**Use cases:**
- Monthly trend analysis
- Historical reporting
- Yearly summaries
- Usage patterns over time

### `command_usage_log`
Append-only analytics log — one row per command invocation. Written by
`trackCommandUsage()` in `db/supabase.js`; never read by the cooldown or
monthly-counter logic. RLS blocks direct `SELECT` (service role only).

| Column | Type | Purpose |
|--------|------|---------|
| `id` | BIGSERIAL | Primary key |
| `discord_user_id` | TEXT | Discord user identifier |
| `command_name` | TEXT | Command invoked (`roam`, `meet`, `affinity`, `house`, …) |
| `used_at` | TIMESTAMP | When the command was invoked (roam/meet: when the encounter completed) |
| `created_at` | TIMESTAMP | Record creation time |

**Retention:** a `pg_cron` job (`prune-command-usage-log`, migration
`009_prune_command_usage_log.sql`) deletes rows older than 90 days at 03:15 UTC
daily. Run it manually with `SELECT public.prune_command_usage_log();`.

### `command_limits`
Per-command cooldown state. One row per user per rate-limited command (`roam`, `meet`), holding the timestamp of that user's last **completed** encounter for it. Read by `checkCommandLimit()` to enforce the rolling 3-hour cooldown in `commandLimits.js`. Deliberately separate from `command_usage_log` (analytics, append-only, prunable) so rate-limiting never depends on that log surviving.

| Column | Type | Purpose |
|--------|------|---------|
| `discord_user_id` | TEXT | Discord user identifier |
| `command_name` | TEXT | `roam` or `meet` |
| `last_used_at` | TIMESTAMP | When the user last completed this command's encounter |
| `created_at` | TIMESTAMP | Record creation time |
| `PRIMARY KEY (discord_user_id, command_name)` | - | One record per user-command pair |

**Use cases:**
- Enforce the rolling 3-hour cooldown per command, per user
- Survives deploys/restarts (previously a gitignored local JSON file)

### `guild_settings`
Per-guild configuration for public "call out" encounters (see `docs/public-encounters.md`). One row per guild that has ever run `/encounters channel`. The scheduler in `encounterScheduler.js` iterates rows `WHERE enabled = true` on every tick.

Only the channel and the on/off switch are per-guild. Cadence and window are fixed constants in `constants/publicEncounters.js` (`ENCOUNTER_MIN_MINUTES` etc.), identical everywhere and not configurable at runtime; this table deliberately carries no override columns for them. Add them back alongside an `/encounters` subcommand that writes them, not before.

| Column | Type | Purpose |
|--------|------|---------|
| `guild_id` | TEXT (PK) | Discord guild identifier — the PK is what guarantees one encounter channel per server; `/encounters channel` upserts on it, so re-running the command moves the channel rather than adding one |
| `encounter_channel_id` | TEXT | Channel encounters post in |
| `enabled` | BOOLEAN | Whether the scheduler ticks for this guild |
| `last_encounter_at` | TIMESTAMP | When this guild last spawned — the cadence anchor, in the same shape as `command_limits.last_used_at` |
| `next_gap_minutes` | INT | Minutes to wait from that point; rolled fresh per spawn |
| `post_failures` | INT | Consecutive failed channel POSTs; 3 auto-disables the guild |
| `configured_by` | TEXT | Who ran `/encounters channel` |
| `created_at` / `updated_at` | TIMESTAMP | Record timestamps |

**Use cases:**
- Give each guild its own schedule, channel and in-flight encounter
- Survive redeploys with no timers to re-arm (all timing state is here, not in memory)

Readiness is derived as `now >= last_encounter_at + next_gap_minutes`, the way `/roam` and `/meet` derive theirs from `command_limits.last_used_at` — an elapsed-time check against a past event, never a stored "next spawn at HH:MM". Time that passes while the process is down therefore counts normally: a restart resumes the existing schedule rather than resetting it. It also means the database never holds the one fact the game depends on hiding; `/encounters status` shows no timing at all.

### `public_encounters`
One row per posted encounter. At most one per guild should be unresolved at any time.

| Column | Type | Purpose |
|--------|------|---------|
| `id` | BIGSERIAL | Primary key |
| `guild_id` / `channel_id` | TEXT | Where it was posted |
| `message_id` | TEXT | Set once the POST succeeds; NULL means nothing to edit later |
| `character_id` | TEXT | Who the silhouette is |
| `variant` | TEXT | `uniform` or `casual` |
| `background` | TEXT | Background filename |
| `teaser` | TEXT | The flavor line the post opened with |
| `expires_at` | TIMESTAMP | When the window closes |
| `resolved_at` | TIMESTAMP | Set on solve **or** expiry-finalize — also the winner-race arbiter |
| `outcome` | TEXT | `solved` or `expired` |
| `solved_by` | TEXT | Discord user id of the winner |

**Use cases:**
- Decide the winner with one conditional `UPDATE ... WHERE resolved_at IS NULL` — no locking
- Let a restart finalize whatever expired while the process was down

### `encounter_milestones`
A per-kind tally — one row per `(user, character, milestone_type)`, its `total` bumped on each `/call` win of that kind, not one row per win. The visible progression for a game that deliberately never touches affinity. Bounded (at most one row per milestone kind per relationship), so it never needs pruning. Written by `record_encounter_milestone()`, an atomic `INSERT ... ON CONFLICT DO UPDATE SET total = total + 1`.

| Column | Type | Purpose |
|--------|------|---------|
| `discord_user_id` | TEXT | Who won |
| `character_id` | TEXT | Who they reached |
| `milestone_type` | TEXT | Key of `ENCOUNTER_MILESTONES` |
| `total` | INT | Wins of this kind with this character |
| `first_at` | TIMESTAMP | First win of this kind |
| `last_at` | TIMESTAMP | Most recent win of this kind |
| `PRIMARY KEY (discord_user_id, character_id, milestone_type)` | - | One row per kind per relationship |

**Use cases:**
- The "Moments together" tally in `/affinity` — a direct read of `total` per kind
- Name the moment a boosted `/roam` response is picking up from — the kind with the newest `last_at`

> The earlier append-only shape (`id BIGSERIAL`, one row per win, `guild_id` / `source_encounter_id` / `created_at`) supported a per-win chronological timeline; nothing read it, so it was folded into this tally. Migration 010 migrates an existing table in place.

### `encounter_win_stats`
Monthly `/call` engagement, and the only per-user record this feature keeps. One row per user, per guild, per month — keyed by guild as well as user so both a per-server board (filter on `guild_id`) and a global one (sum across guilds) are available.

Engagement here means **reaching a character** — a correct `/call`. Wrong guesses are not recorded anywhere, so a player who calls out often and never gets there first does not appear. That is deliberate: the alternative was a per-guess log that nothing read.

Written at win time by `record_encounter_win()`, an atomic `INSERT ... ON CONFLICT DO UPDATE SET wins = wins + 1`, and **deliberately not derived from `public_encounters`** — that table is pruned at 90 days, and the leaderboard has to outlive it.

| Column | Type | Purpose |
|--------|------|---------|
| `discord_user_id` | TEXT | Who won |
| `guild_id` | TEXT | Which server |
| `year_month` | TEXT | `'YYYY-MM'`, UTC — same convention as `monthly_analytics` |
| `wins` | INT | Correct `/call` guesses that month |
| `last_win_at` | TIMESTAMP | Most recent win, used to break ranking ties |
| `created_at` / `updated_at` | TIMESTAMP | Record timestamps |
| `PRIMARY KEY (discord_user_id, guild_id, year_month)` | - | One row per user-guild-month |

**Use cases:**
- "Who is engaging with public encounters, and how often", per server or across all of them
- Survives the retention window on `public_encounters`

> ⚠️ A leaderboard is inherently identifying, so unlike the `vw_*` analytics views there is **no** anonymized view for this table. Keep it behind the service role.

### Retention

Migration 011 schedules `prune_encounter_data()` daily at 03:30 UTC:

| Table | Kept for | Why |
|---|---|---|
| `public_encounters` — unsolved | 7 days after `resolved_at` | Nobody reached the character; the row records only that the scheduler fired |
| `public_encounters` — solved | 90 days after `resolved_at` | Matches `command_usage_log`; unresolved rows are never touched |
| `encounter_win_stats` | 13 months | A full year plus the current month, so year-over-year still works |
| `encounter_milestones` | forever | Player-visible progression (`/affinity`), not analytics — and a bounded per-kind tally, so it has nothing to prune |

> `character_relationships` also gains `pending_encounter_boost INT NOT NULL DEFAULT 0` in migration 010 — the unspent wins a user holds with that character. A `/call` win increments it (capped at `ENCOUNTER_BOOST_CAP`); the next completed `/roam` or `/meet` response with that character spends one and adds `ENCOUNTER_BOOST_GAIN` to its gain. Both are constants in `constants/publicEncounters.js`. Both sides go through the atomic `grant_encounter_boost()` / `consume_encounter_boosts()` functions in migration 014 — never a read-then-write, which used to drop a boost when a win and a spend overlapped.

## Helper Functions

### Activity Tracking
```javascript
// Track a user running a command
await trackUserActivity(userId);

// Track which character the user interacted with
await trackCharacterEngagement(userId, characterId);
```

### Command Cooldowns
```javascript
// Read a user's last-used timestamp for a command (ISO string or null)
await getCommandLimit(userId, commandName);

// Stamp "used now" — called once an encounter actually completes
await recordCommandUse(userId, commandName);

// Clear a user's cooldown (testing); omit commandName to clear all
await clearCommandLimit(userId, commandName);
```

### Analytics Queries
```javascript
// Get most popular characters
await getMostPopularCharacters(limit = 10);

// Get user's current month stats
await getUserMonthlyActivity(userId);

// Get character popularity this month
await getCharacterPopularityThisMonth();

// Get all analytics for a specific month
await getMonthlyAnalytics("2026-08");

// Get dashboard summary data
await getAnalyticsDashboard();
```

## Monthly Counter Reset Logic

At the end of each month:
1. **Snapshot** current `user_activity` and `character_engagement` data to `monthly_analytics`
2. **Reset** `commands_this_month` counters to 0 in both tables
3. Keep `total_commands` for lifetime tracking

This is automated by migration `005_monthly_reset.sql`, which installs
`public.snapshot_and_reset_monthly_counters()` and a `pg_cron` job
(`monthly-counter-reset`) that runs it at 00:00 UTC on the 1st of each month.
Run it manually any time with:

```sql
SELECT public.snapshot_and_reset_monthly_counters();
```

As a safety net, `trackUserActivity()` / `trackCharacterEngagement()` in
`db/supabase.js` also roll `commands_this_month` back to 1 when a row's last
activity was in a previous UTC month, so the counter stays correct even if the
cron job is delayed or disabled.

## Security & Privacy

### Row Level Security (RLS)
All user data tables have RLS enabled:
- `user_activity` — Users can only view/edit their own activity
- `character_engagement` — Users can only view/edit their own engagement
- `character_relationships` — Users can only view/edit their own relationships

Policies use `discord_user_id = current_user_id()` to enforce user isolation. Since you're the only user, you can access all data via authenticated requests.

### Privacy-Compliant Analytics Views
All public analytics are served through anonymized views that **never expose Discord IDs**:
- `vw_popular_characters` — Most used characters
- `vw_monthly_character_stats` — Monthly per-character stats
- `vw_platform_stats` — Overall platform statistics
- `vw_characters_by_affinity` — Character rankings by average affinity
- `vw_engagement_trends` — Engagement trends over time

These views are safe to expose publicly or publish in an analytics dashboard.

## Analytics Functions

Query anonymized analytics with these GDPR-compliant functions:

```javascript
// Get most popular characters
await getPopularCharactersAnalytics(limit = 10);

// Get monthly stats for a specific month
await getMonthlyCharacterStatsAnalytics("2026-08");

// Get platform-wide statistics
await getPlatformStatsAnalytics();

// Get characters ranked by affinity
await getCharactersByAffinityAnalytics(limit = 10);

// Get engagement trends (monthly)
await getEngagementTrendsAnalytics(months = 12);

// Get complete dashboard (all above data)
await getAnalyticsDashboard();
```

## Suggested Analytics Pages

1. **Dashboard**
   - Total users this month
   - Most popular characters
   - Top active users
   - Monthly trend graph

2. **Character Analytics**
   - Character popularity (all-time and monthly)
   - User engagement per character
   - Affinity distribution

3. **User Analytics**
   - User retention (monthly active users)
   - Command frequency over time
   - Character preference diversity

4. **Recommendations**
   - Suggest unpopular characters to users
   - Recommend new characters based on affinity levels
   - Engagement alerts for inactive users
