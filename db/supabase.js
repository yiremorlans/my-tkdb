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

  // Update existing record with incremented counters
  const { data, error } = await supabase
    .from('user_activity')
    .update({
      last_used_at: new Date().toISOString(),
      commands_this_month: (userActivity.commands_this_month || 0) + 1,
      total_commands: (userActivity.total_commands || 0) + 1,
      updated_at: new Date().toISOString(),
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
  const { data, error } = await supabase
    .from('character_engagement')
    .upsert(
      {
        discord_user_id: userId,
        character_id: characterId,
        last_interacted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
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

export default supabase;
