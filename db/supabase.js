import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with service role key
// Service role bypasses RLS policies, required for bot backend operations
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * True if the two timestamps fall in the same UTC calendar month.
 * Used to lazily roll `commands_this_month` over at month boundaries so the
 * counter is correct even before the scheduled monthly reset job runs (see
 * db/migrations/005_monthly_reset.sql).
 */
function isSameUtcMonth(isoTimestamp, reference = new Date()) {
  if (!isoTimestamp) return false;
  const then = new Date(isoTimestamp);
  return (
    then.getUTCFullYear() === reference.getUTCFullYear() &&
    then.getUTCMonth() === reference.getUTCMonth()
  );
}

/**
 * Get or create a character relationship record
 */
export async function getOrCreateRelationship(userId, characterId) {
  const { data, error } = await supabase
    .from('character_relationships')
    .select('*')
    .eq('discord_user_id', userId)
    .eq('character_id', characterId)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
    console.error('Error fetching relationship:', error);
    throw error;
  }

  // If no relationship exists, create one
  if (!data) {
    const { data: newData, error: insertError } = await supabase
      .from('character_relationships')
      .insert([
        {
          discord_user_id: userId,
          character_id: characterId,
          affinity: 0,
          times_met: 0,
        }
      ])
      .select()
      .single();

    if (insertError) {
      // 23505 = unique_violation. A concurrent getOrCreateRelationship for the
      // same (discord_user_id, character_id) inserted the row between our SELECT
      // above and this INSERT — e.g. a /call win fires grantEncounterBoost and
      // incrementTimesMet at once for a character the winner has never met. The
      // row exists now, so read it back instead of failing the caller.
      if (insertError.code === '23505') {
        const { data: raced, error: reselectError } = await supabase
          .from('character_relationships')
          .select('*')
          .eq('discord_user_id', userId)
          .eq('character_id', characterId)
          .single();

        if (reselectError) {
          console.error('Error re-fetching relationship after insert race:', reselectError);
          throw reselectError;
        }

        return raced;
      }

      console.error('Error creating relationship:', insertError);
      throw insertError;
    }

    return newData;
  }

  return data;
}

/**
 * Update character affinity for a user
 */
export async function updateAffinity(userId, characterId, affinityChange) {
  const relationship = await getOrCreateRelationship(userId, characterId);

  const { data, error } = await supabase
    .from('character_relationships')
    .update({
      affinity: relationship.affinity + affinityChange,
      last_interaction_at: new Date().toISOString(),
    })
    .eq('discord_user_id', userId)
    .eq('character_id', characterId)
    .select()
    .single();

  if (error) {
    console.error('Error updating affinity:', error);
    throw error;
  }

  return data;
}

/**
 * Increment times_met counter
 */
export async function incrementTimesMet(userId, characterId) {
  const relationship = await getOrCreateRelationship(userId, characterId);

  const { data, error } = await supabase
    .from('character_relationships')
    .update({
      times_met: relationship.times_met + 1,
      last_interaction_at: new Date().toISOString(),
    })
    .eq('discord_user_id', userId)
    .eq('character_id', characterId)
    .select()
    .single();

  if (error) {
    console.error('Error incrementing times_met:', error);
    throw error;
  }

  return data;
}

/**
 * Update response type for a relationship
 */
export async function updateLastResponseType(userId, characterId, responseType) {
  const { data, error } = await supabase
    .from('character_relationships')
    .update({
      last_response_type: responseType,
      last_interaction_at: new Date().toISOString(),
    })
    .eq('discord_user_id', userId)
    .eq('character_id', characterId)
    .select()
    .single();

  if (error) {
    console.error('Error updating response type:', error);
    throw error;
  }

  return data;
}

/**
 * Get all relationships for a user
 */
export async function getUserRelationships(userId) {
  const { data, error } = await supabase
    .from('character_relationships')
    .select('*')
    .eq('discord_user_id', userId)
    .order('last_interaction_at', { ascending: false });

  if (error) {
    console.error('Error fetching user relationships:', error);
    throw error;
  }

  return data || [];
}

/**
 * Get a specific relationship
 */
export async function getRelationship(userId, characterId) {
  const { data, error } = await supabase
    .from('character_relationships')
    .select('*')
    .eq('discord_user_id', userId)
    .eq('character_id', characterId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching relationship:', error);
    throw error;
  }

  return data || null;
}

/**
 * Track user activity and command usage
 */
export async function trackUserActivity(userId) {
  // First, get or create the user activity record
  let userActivity = await getUserMonthlyActivity(userId);

  if (!userActivity) {
    // Create new user activity record
    const { data: newData, error: insertError } = await supabase
      .from('user_activity')
      .insert([
        {
          discord_user_id: userId,
          last_used_at: new Date().toISOString(),
          commands_this_month: 1,
          total_commands: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      ])
      .select()
      .single();

    if (insertError) {
      console.error('Error creating user activity:', insertError);
      throw insertError;
    }

    return newData;
  }

  // Update existing record with incremented counters. commands_this_month
  // restarts at 1 when the last activity was in a previous month.
  const now = new Date();
  const commandsThisMonth = isSameUtcMonth(userActivity.last_used_at, now)
    ? (userActivity.commands_this_month || 0) + 1
    : 1;

  const { data, error } = await supabase
    .from('user_activity')
    .update({
      last_used_at: now.toISOString(),
      commands_this_month: commandsThisMonth,
      total_commands: (userActivity.total_commands || 0) + 1,
      updated_at: now.toISOString(),
    })
    .eq('discord_user_id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error tracking user activity:', error);
    throw error;
  }

  return data;
}

/**
 * Track character engagement for analytics
 */
export async function trackCharacterEngagement(userId, characterId) {
  // Read the current counters so we can increment them. upsert can't express
  // `col = col + 1`, so this is a read-modify-write (racy under concurrent
  // interactions from the same user, but good enough for analytics).
  const { data: existing, error: readError } = await supabase
    .from('character_engagement')
    .select('commands_this_month, total_commands, last_interacted_at')
    .eq('discord_user_id', userId)
    .eq('character_id', characterId)
    .single();

  if (readError && readError.code !== 'PGRST116') { // PGRST116 = no rows found
    console.error('Error reading character engagement:', readError);
    throw readError;
  }

  // commands_this_month restarts at 1 when the last interaction was in a
  // previous month (matches the scheduled monthly reset in migration 005).
  const now = new Date();
  const commandsThisMonth = isSameUtcMonth(existing?.last_interacted_at, now)
    ? (existing?.commands_this_month || 0) + 1
    : 1;

  const { data, error } = await supabase
    .from('character_engagement')
    .upsert(
      {
        discord_user_id: userId,
        character_id: characterId,
        commands_this_month: commandsThisMonth,
        total_commands: (existing?.total_commands || 0) + 1,
        last_interacted_at: now.toISOString(),
        updated_at: now.toISOString(),
      },
      { onConflict: 'discord_user_id,character_id' }
    )
    .select()
    .single();

  if (error) {
    console.error('Error tracking character engagement:', error);
    throw error;
  }

  return data;
}

/**
 * Get most popular characters (by total commands)
 */
export async function getMostPopularCharacters(limit = 10) {
  const { data, error } = await supabase
    .from('character_engagement')
    .select('character_id, total_commands, COUNT(*) as user_count', { count: 'exact' })
    .order('total_commands', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching popular characters:', error);
    throw error;
  }

  return data || [];
}

/**
 * Get user's command activity for current month
 */
export async function getUserMonthlyActivity(userId) {
  const { data, error } = await supabase
    .from('user_activity')
    .select('*')
    .eq('discord_user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching user activity:', error);
    throw error;
  }

  return data || null;
}

/**
 * Get character popularity for current month
 */
export async function getCharacterPopularityThisMonth() {
  const { data, error } = await supabase
    .from('character_engagement')
    .select('character_id, commands_this_month, COUNT(DISTINCT discord_user_id) as unique_users', { count: 'exact' })
    .order('commands_this_month', { ascending: false });

  if (error) {
    console.error('Error fetching character popularity:', error);
    throw error;
  }

  return data || [];
}

/**
 * Get monthly analytics for a specific month
 */
export async function getMonthlyAnalytics(yearMonth) {
  const { data, error } = await supabase
    .from('monthly_analytics')
    .select('*')
    .eq('year_month', yearMonth)
    .order('commands_count', { ascending: false });

  if (error) {
    console.error('Error fetching monthly analytics:', error);
    throw error;
  }

  return data || [];
}

/**
 * ANONYMIZED ANALYTICS (GDPR/PRIVACY COMPLIANT - No Discord IDs)
 */

/**
 * Get most popular characters (anonymized)
 */
export async function getPopularCharactersAnalytics(limit = 10) {
  const { data, error } = await supabase
    .from('vw_popular_characters')
    .select('*')
    .limit(limit);

  if (error) {
    console.error('Error fetching popular characters analytics:', error);
    throw error;
  }

  return data || [];
}

/**
 * Get monthly character statistics (anonymized)
 */
export async function getMonthlyCharacterStatsAnalytics(yearMonth) {
  const { data, error } = await supabase
    .from('vw_monthly_character_stats')
    .select('*')
    .eq('year_month', yearMonth);

  if (error) {
    console.error('Error fetching monthly character stats:', error);
    throw error;
  }

  return data || [];
}

/**
 * Get platform-wide statistics (anonymized)
 */
export async function getPlatformStatsAnalytics() {
  const { data, error } = await supabase
    .from('vw_platform_stats')
    .select('*')
    .single();

  if (error) {
    console.error('Error fetching platform stats:', error);
    throw error;
  }

  return data || null;
}

/**
 * Get characters ranked by average affinity (anonymized)
 */
export async function getCharactersByAffinityAnalytics(limit = 10) {
  const { data, error } = await supabase
    .from('vw_characters_by_affinity')
    .select('*')
    .limit(limit);

  if (error) {
    console.error('Error fetching affinity rankings:', error);
    throw error;
  }

  return data || [];
}

/**
 * Get engagement trends over months (anonymized)
 */
export async function getEngagementTrendsAnalytics(months = 12) {
  const { data, error } = await supabase
    .from('vw_engagement_trends')
    .select('*')
    .limit(months);

  if (error) {
    console.error('Error fetching engagement trends:', error);
    throw error;
  }

  return data || [];
}

/**
 * Get complete analytics dashboard (anonymized)
 */
export async function getAnalyticsDashboard() {
  const [
    { data: platformStats, error: statsError },
    { data: topCharacters, error: charsError },
    { data: affinityRankings, error: affinityError },
    { data: trends, error: trendsError },
  ] = await Promise.all([
    supabase
      .from('vw_platform_stats')
      .select('*')
      .single(),
    supabase
      .from('vw_popular_characters')
      .select('*')
      .limit(5),
    supabase
      .from('vw_characters_by_affinity')
      .select('*')
      .limit(5),
    supabase
      .from('vw_engagement_trends')
      .select('*')
      .limit(6),
  ]);

  return {
    platformStats: platformStats || null,
    topCharacters: topCharacters || [],
    affinityRankings: affinityRankings || [],
    trends: trends || [],
    errors: { statsError, charsError, affinityError, trendsError },
  };
}

/**
 * Track individual command usage for analytics
 */
export async function trackCommandUsage(userId, commandName) {
  const { data, error } = await supabase
    .from('command_usage_log')
    .insert([
      {
        discord_user_id: userId,
        command_name: commandName,
        used_at: new Date().toISOString(),
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Error tracking command usage:', error);
    throw error;
  }

  return data;
}

/**
 * COMMAND COOLDOWNS
 *
 * command_limits holds one row per user per rate-limited command, with the
 * timestamp of that user's last completed encounter for it. Kept separate from
 * command_usage_log (analytics, append-only, prunable) so the cooldown never
 * depends on that log surviving.
 */

/**
 * Get last-used timestamps for several rate-limited commands in one round trip.
 * Returns an object with an entry for every name asked for: an ISO string, or
 * null if the user has never completed that command.
 */
export async function getCommandLimits(userId, commandNames) {
  const { data, error } = await supabase
    .from('command_limits')
    .select('command_name, last_used_at')
    .eq('discord_user_id', userId)
    .in('command_name', commandNames);

  if (error) {
    console.error('Error fetching command limits:', error);
    throw error;
  }

  const out = Object.fromEntries(commandNames.map((name) => [name, null]));
  for (const row of data || []) out[row.command_name] = row.last_used_at;
  return out;
}

/**
 * Atomically claim this user's cooldown slot for a command
 * (db/migrations/012_atomic_command_limit_claim.sql).
 *
 * One statement, so the "is the cooldown up?" check and the stamp cannot be
 * split: Postgres row-locks the conflict, and of N callers racing for the same
 * slot exactly one gets TRUE. This is the gate on actually granting a reward.
 * It replaced a getCommandLimits-then-upsert pair, which as two statements left
 * a window where two responses both passed the read before either wrote.
 *
 * Returns true if the caller may proceed (the cooldown is now stamped), false
 * if the slot is still held. Throws on a database error — a failure here means
 * the slot was NOT claimed, so the caller must fail closed.
 */
export async function claimCommandSlot(userId, commandName, cooldownSeconds) {
  const { data, error } = await supabase.rpc('claim_command_slot', {
    p_user_id: userId,
    p_command: commandName,
    p_cooldown_seconds: cooldownSeconds,
  });

  if (error) {
    console.error('Error claiming command slot:', error);
    throw error;
  }

  return data === true;
}

/**
 * Clear a user's cooldown. Omit commandName to clear every command for the user.
 * Intended for testing. Returns the number of rows removed.
 */
export async function clearCommandLimit(userId, commandName = null) {
  let query = supabase
    .from('command_limits')
    .delete()
    .eq('discord_user_id', userId);

  if (commandName) query = query.eq('command_name', commandName);

  const { data, error } = await query.select();

  if (error) {
    console.error('Error clearing command limit:', error);
    throw error;
  }

  return data?.length || 0;
}

/**
 * Get command usage statistics for a time period (anonymized)
 */
export async function getCommandUsageStats(days = 30) {
  const { data, error } = await supabase
    .from('command_usage_log')
    .select('command_name, COUNT(*) as usage_count', { count: 'exact' })
    .gte('used_at', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString())
    .group_by('command_name')
    .order('usage_count', { ascending: false });

  if (error) {
    console.error('Error fetching command usage stats:', error);
    throw error;
  }

  return data || [];
}

/**
 * PUBLIC ENCOUNTERS (docs/public-encounters.md)
 *
 * guild_settings holds each guild's independent schedule and channel, and
 * public_encounters one row per posted encounter, with resolved_at doubling as
 * the winner-race arbiter. There is deliberately no per-guess log — engagement
 * is measured as correct calls only, in encounter_win_stats below.
 * See db/migrations/010_create_public_encounters.sql.
 */

/**
 * Every guild the scheduler should tick for. Called once per tick, so it stays
 * a single indexed read over a table with fewer rows than the bot has guilds.
 */
/**
 * Every guild the scheduler should tick. `locked` is the owner's kill switch
 * (db/migrations/013) and outranks `enabled`, which is the server admin's — a
 * locked guild is invisible here no matter what its admins do with
 * `/encounters channel`.
 */
export async function getEnabledGuilds() {
  const { data, error } = await supabase
    .from('guild_settings')
    .select('*')
    .eq('enabled', true)
    .eq('locked', false);

  if (error) {
    console.error('Error fetching enabled guilds:', error);
    throw error;
  }

  return data || [];
}

/**
 * One guild's settings, or null if the feature was never configured there.
 */
export async function getGuildSettings(guildId) {
  const { data, error } = await supabase
    .from('guild_settings')
    .select('*')
    .eq('guild_id', guildId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching guild settings:', error);
    throw error;
  }

  return data || null;
}

/**
 * `/encounters channel` — point the feature at a channel and turn it on.
 * post_failures resets so a guild that auto-disabled after three bad posts is
 * given a clean slate by reconfiguring.
 */
export async function upsertGuildChannel(guildId, channelId, userId, { at, gapMinutes }) {
  const { data, error } = await supabase
    .from('guild_settings')
    .upsert(
      {
        guild_id: guildId,
        encounter_channel_id: channelId,
        enabled: true,
        // Anchor at "now" with a fresh gap, so the first encounter lands one
        // normal interval out rather than the instant the admin hits enter.
        last_encounter_at: at instanceof Date ? at.toISOString() : at,
        next_gap_minutes: gapMinutes,
        configured_by: userId,
        post_failures: 0,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'guild_id' }
    )
    .select();

  if (error) {
    console.error('Error saving guild encounter channel:', error);
    throw error;
  }

  return data?.[0] || null;
}

/**
 * `/encounters disable` (and the auto-disable after repeated post failures).
 */
export async function setGuildEnabled(guildId, enabled) {
  const { data, error } = await supabase
    .from('guild_settings')
    .update({ enabled, updated_at: new Date().toISOString() })
    .eq('guild_id', guildId)
    .select();

  if (error) {
    console.error('Error setting guild enabled flag:', error);
    throw error;
  }

  return data?.[0] || null;
}

/**
 * Re-anchor a guild's cadence to "an encounter just happened", with the gap to
 * wait before the next one. Called right after a post succeeds, so the interval
 * is independent of how fast that encounter gets solved.
 *
 * A failed post re-anchors too (so a broken channel isn't retried every tick)
 * but must leave `post_failures` alone — hence the explicit flag rather than
 * always clearing it here.
 */
export async function recordGuildSpawn(guildId, { at, gapMinutes, resetFailures = false }) {
  const { data, error } = await supabase
    .from('guild_settings')
    .update({
      last_encounter_at: at instanceof Date ? at.toISOString() : at,
      next_gap_minutes: gapMinutes,
      ...(resetFailures ? { post_failures: 0 } : {}),
      updated_at: new Date().toISOString(),
    })
    .eq('guild_id', guildId)
    .select();

  if (error) {
    console.error('Error recording guild spawn:', error);
    throw error;
  }

  return data?.[0] || null;
}

/**
 * Count one failed channel POST against a guild. Three consecutive failures
 * (bad permissions, a deleted channel) disable the feature there rather than
 * letting the scheduler retry into the void every cadence. Returns the new
 * count and whether this call disabled the guild.
 */
export async function bumpGuildPostFailure(guildId, threshold = 3) {
  const settings = await getGuildSettings(guildId);
  const failures = (settings?.post_failures || 0) + 1;
  const disabled = failures >= threshold;

  const { error } = await supabase
    .from('guild_settings')
    .update({
      post_failures: failures,
      ...(disabled ? { enabled: false } : {}),
      updated_at: new Date().toISOString(),
    })
    .eq('guild_id', guildId);

  if (error) {
    console.error('Error recording guild post failure:', error);
    throw error;
  }

  return { failures, disabled };
}

/**
 * Insert a new encounter row. The message_id is filled in afterwards, once the
 * channel POST comes back — the row exists first so a POST that fails still
 * has something to mark expired.
 *
 * Returns null (rather than throwing) when the guild already has an unresolved
 * encounter. A partial unique index enforces that, so two instances racing
 * during a rolling redeploy resolve to exactly one spawn: the loser sees a
 * unique violation here and quietly stands down.
 */
export async function createPublicEncounter({
  guildId,
  channelId,
  characterId,
  variant,
  background,
  teaser,
  expiresAt,
}) {
  const { data, error } = await supabase
    .from('public_encounters')
    .insert([
      {
        guild_id: guildId,
        channel_id: channelId,
        character_id: characterId,
        variant,
        background,
        teaser,
        expires_at: expiresAt instanceof Date ? expiresAt.toISOString() : expiresAt,
      }
    ])
    .select()
    .single();

  if (error) {
    // 23505 = unique_violation on idx_public_encounters_one_active: this guild
    // already has an unresolved encounter. Expected during a rolling redeploy,
    // when two instances briefly overlap; not an error worth shouting about.
    if (error.code === '23505') {
      console.log(`[supabase] Guild ${guildId} already has a live encounter — skipping spawn`);
      return null;
    }
    console.error('Error creating public encounter:', error);
    throw error;
  }

  return data;
}

/**
 * Repoint a live encounter at a different channel and message. Used when an
 * admin moves the guild's encounter channel mid-flight: every later step —
 * the win edit, the miss edit, the finalize sweep — reads channel_id and
 * message_id off this row, so updating them relocates the whole encounter.
 */
export async function setPublicEncounterLocation(id, channelId, messageId) {
  const { data, error } = await supabase
    .from('public_encounters')
    .update({ channel_id: channelId, message_id: messageId })
    .eq('id', id)
    .is('resolved_at', null)
    .select();

  if (error) {
    console.error('Error moving public encounter:', error);
    throw error;
  }

  return data?.[0] || null;
}

export async function setPublicEncounterMessageId(id, messageId) {
  const { data, error } = await supabase
    .from('public_encounters')
    .update({ message_id: messageId })
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error setting encounter message id:', error);
    throw error;
  }

  return data?.[0] || null;
}

/**
 * The guild's in-flight encounter, or null. Used both as the /call target and
 * as the scheduler's "is this guild busy?" guard.
 */
export async function getActivePublicEncounter(guildId, now = new Date()) {
  const { data, error } = await supabase
    .from('public_encounters')
    .select('*')
    .eq('guild_id', guildId)
    .is('resolved_at', null)
    .gt('expires_at', now.toISOString())
    .order('created_at', { ascending: false })
    .limit(1);

  if (error) {
    console.error('Error fetching active public encounter:', error);
    throw error;
  }

  return data?.[0] || null;
}

/**
 * Decide the winner. One conditional UPDATE — Postgres serializes the matching
 * row, so of two simultaneous correct calls exactly one comes back with a row
 * and the other with none. No explicit locking, no read-then-write race.
 * Returns the claimed row, or null if someone else already had it.
 */
export async function claimPublicEncounter(id, userId, at = new Date()) {
  const { data, error } = await supabase
    .from('public_encounters')
    .update({
      resolved_at: at.toISOString(),
      outcome: 'solved',
      solved_by: userId,
    })
    .eq('id', id)
    .is('resolved_at', null)
    .select();

  if (error) {
    console.error('Error claiming public encounter:', error);
    throw error;
  }

  return data?.[0] || null;
}

/**
 * Close out every window that ran out unsolved, optionally for one guild.
 * Returns the rows it finalized so the caller can edit each one's Discord post
 * to a "moment has passed" line. Conditional on resolved_at, so an encounter
 * solved in the same instant is never double-finalized.
 */
export async function finalizeExpiredEncounters(guildId = null, now = new Date()) {
  let query = supabase
    .from('public_encounters')
    .update({ resolved_at: now.toISOString(), outcome: 'expired' })
    .is('resolved_at', null)
    .lt('expires_at', now.toISOString());

  if (guildId) query = query.eq('guild_id', guildId);

  const { data, error } = await query.select();

  if (error) {
    console.error('Error finalizing expired encounters:', error);
    throw error;
  }

  return data || [];
}

/**
 * Close one encounter out as expired, whatever its window says. Used when a
 * channel POST fails: the row exists but nobody can see it, and leaving it
 * unresolved would block the guild's next spawn for the rest of the window.
 */
export async function expirePublicEncounter(id, at = new Date()) {
  const { data, error } = await supabase
    .from('public_encounters')
    .update({ resolved_at: at.toISOString(), outcome: 'expired' })
    .eq('id', id)
    .is('resolved_at', null)
    .select();

  if (error) {
    console.error('Error expiring public encounter:', error);
    throw error;
  }

  return data?.[0] || null;
}

/**
 * MONTHLY /call WIN LEADERBOARD (db/migrations/011_encounter_win_stats.sql)
 *
 * encounter_win_stats is a durable rollup written at win time — deliberately
 * not derived from public_encounters, so those raw rows can be pruned on a
 * 90-day retention window without taking the leaderboard with them.
 */

/**
 * Count one /call win for this user, in this guild, in the current UTC month.
 * Atomic INSERT ... ON CONFLICT inside Postgres: two wins in the same instant
 * (the same user solving in two guilds at once) can't lose a count the way a
 * read-modify-write would, and it costs one round trip on the win path rather
 * than two. Returns the user's new total for the month.
 */
export async function recordEncounterWin(userId, guildId) {
  const { data, error } = await supabase.rpc('record_encounter_win', {
    p_user_id: userId,
    p_guild_id: guildId,
  });

  if (error) {
    console.error('Error recording encounter win:', error);
    throw error;
  }

  return data ?? 0;
}

/**
 * 'YYYY-MM' for a date, in UTC — the convention monthly_analytics and
 * record_encounter_win both use.
 */
export function toYearMonth(date = new Date()) {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`;
}

/**
 * Who won the most /call encounters in a month, ranked.
 *
 * Omit `guildId` for a global board — rows are then summed across guilds in JS,
 * because PostgREST can't express the GROUP BY. That's a few hundred rows a
 * month at this guild count; revisit with a view if the bot ever grows.
 *
 * Returns `[{ userId, wins, lastWinAt }]`, highest first.
 */
export async function getEncounterLeaderboard({
  yearMonth = toYearMonth(),
  guildId = null,
  limit = 10,
} = {}) {
  let query = supabase
    .from('encounter_win_stats')
    .select('discord_user_id, guild_id, wins, last_win_at')
    .eq('year_month', yearMonth);

  if (guildId) query = query.eq('guild_id', guildId);

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching encounter leaderboard:', error);
    throw error;
  }

  const totals = new Map();
  for (const row of data || []) {
    const entry = totals.get(row.discord_user_id) || { userId: row.discord_user_id, wins: 0, lastWinAt: null };
    entry.wins += row.wins || 0;
    if (!entry.lastWinAt || (row.last_win_at && row.last_win_at > entry.lastWinAt)) {
      entry.lastWinAt = row.last_win_at;
    }
    totals.set(row.discord_user_id, entry);
  }

  return [...totals.values()]
    // Ties break on who got there first, so the ranking is stable.
    .sort((a, b) => b.wins - a.wins || String(a.lastWinAt).localeCompare(String(b.lastWinAt)))
    .slice(0, limit);
}

/**
 * One user's win count for a month — their own standing, without pulling the
 * whole board. Summed across guilds unless one is named.
 */
export async function getUserEncounterWins(userId, { yearMonth = toYearMonth(), guildId = null } = {}) {
  let query = supabase
    .from('encounter_win_stats')
    .select('wins')
    .eq('discord_user_id', userId)
    .eq('year_month', yearMonth);

  if (guildId) query = query.eq('guild_id', guildId);

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching user encounter wins:', error);
    throw error;
  }

  return (data || []).reduce((sum, row) => sum + (row.wins || 0), 0);
}

/**
 * ENCOUNTER REWARD MODEL (docs/public-encounters.md §16)
 *
 * A /call win never moves affinity. It grants a pending boost, spent on the
 * winner's next /roam or /meet with that character, and bumps a per-kind
 * milestone tally shown as "Moments together" in /affinity.
 */

/**
 * Add a boost for the winner, capped. Wins past the cap still record their
 * milestone; they just don't stack more boost. Returns the new value.
 */
export async function grantEncounterBoost(userId, characterId, cap = 2) {
  const relationship = await getOrCreateRelationship(userId, characterId);
  const next = Math.min((relationship.pending_encounter_boost || 0) + 1, cap);

  const { data, error } = await supabase
    .from('character_relationships')
    .update({ pending_encounter_boost: next })
    .eq('discord_user_id', userId)
    .eq('character_id', characterId)
    .select()
    .single();

  if (error) {
    console.error('Error granting encounter boost:', error);
    throw error;
  }

  return data?.pending_encounter_boost ?? next;
}

/**
 * Spend every pending boost for this character at once, returning how many
 * were consumed (0 if none). Two /call wins with the same character are one
 * reunion, not two, so the next authored response picks up their latest
 * moment and folds in the full bonus rather than dribbling +1 across two
 * /roams. The `> 0` guard is in the UPDATE itself, so two responses
 * completing at once can't both claim the same boosts.
 */
export async function consumeAllEncounterBoosts(userId, characterId) {
  const relationship = await getRelationship(userId, characterId);
  const current = relationship?.pending_encounter_boost || 0;
  if (current <= 0) return 0;

  const { data, error } = await supabase
    .from('character_relationships')
    .update({ pending_encounter_boost: 0 })
    .eq('discord_user_id', userId)
    .eq('character_id', characterId)
    .gt('pending_encounter_boost', 0)
    .select();

  if (error) {
    console.error('Error consuming encounter boosts:', error);
    throw error;
  }

  return (data?.length || 0) > 0 ? current : 0;
}

export async function recordEncounterMilestone({ userId, characterId, milestoneType }) {
  const { error } = await supabase.rpc('record_encounter_milestone', {
    p_user_id: userId,
    p_character_id: characterId,
    p_milestone_type: milestoneType,
  });

  if (error) {
    console.error('Error recording encounter milestone:', error);
    throw error;
  }
}

/**
 * The milestone kind the user last collected with a character, or null. Read
 * only when a boost is actually being spent, so it costs nothing on an ordinary
 * /roam — it's there to name the moment the warmer welcome is picking up from.
 * "Latest" is by last_at (the newest win of that kind), across all kinds.
 */
export async function getLatestEncounterMilestone(userId, characterId) {
  const { data, error } = await supabase
    .from('encounter_milestones')
    .select('*')
    .eq('discord_user_id', userId)
    .eq('character_id', characterId)
    .order('last_at', { ascending: false })
    .limit(1);

  if (error) {
    console.error('Error fetching latest encounter milestone:', error);
    throw error;
  }

  return data?.[0] || null;
}

/**
 * `{ milestone_type: total }` for the /affinity "Moments together" block. The
 * table is already a per-kind tally, so this is a direct read of each row's
 * `total` — a relationship has at most one row per milestone kind.
 */
export async function getEncounterMilestoneCounts(userId, characterId) {
  const { data, error } = await supabase
    .from('encounter_milestones')
    .select('milestone_type, total')
    .eq('discord_user_id', userId)
    .eq('character_id', characterId);

  if (error) {
    console.error('Error fetching encounter milestones:', error);
    throw error;
  }

  const counts = {};
  for (const row of data || []) {
    counts[row.milestone_type] = row.total;
  }
  return counts;
}

export default supabase;
