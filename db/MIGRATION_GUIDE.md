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

1. **Monthly Reset** — Set up a cron job (or manual query) on the last day of each month:
   ```javascript
   // Copy data to monthly_analytics and reset monthly counters
   // See SCHEMA.md for the exact query
   ```

2. **Build Analytics Page** — Use `getAnalyticsDashboard()` to power your analytics UI

3. **Monitor Usage** — Use the views to track engagement and character popularity

Done! 🎉
