// Supabase-backed relationship storage
// All affinity and relationship data is now stored in Postgres
import { getRelationshipLevel } from './constants/game.js';
import { getOrCreateRelationship, updateAffinity, incrementTimesMet } from './db/supabase.js';

export async function getRelationship(userId, characterId) {
  try {
    const relationship = await getOrCreateRelationship(userId, characterId);
    return {
      affinity: relationship.affinity || 0,
      timesMet: relationship.times_met || 0,
    };
  } catch (err) {
    console.error('Error fetching relationship from DB:', err);
    // Fallback to defaults if DB is unavailable
    return { affinity: 0, timesMet: 0 };
  }
}

// Records a dialogue response and applies the given affinity gain (0-2,
// computed by the caller via getAffinityForResponse). Returns the updated
// relationship.
export async function recordResponse(userId, characterId, gain) {
  try {
    // Update affinity in DB
    const updated = await updateAffinity(userId, characterId, gain);

    // Increment times_met
    await incrementTimesMet(userId, characterId);

    return {
      affinity: updated.affinity || 0,
      timesMet: (updated.times_met || 0) + 1,
      gain,
      level: getRelationshipLevel(updated.affinity || 0),
    };
  } catch (err) {
    console.error('Error recording response to DB:', err);
    throw err;
  }
}
