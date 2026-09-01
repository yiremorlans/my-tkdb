// Supabase-backed relationship storage
// All affinity and relationship data is now stored in Postgres
import { getRelationshipLevel } from './constants/game.js';
import { updateAffinity, incrementTimesMet, updateLastResponseType } from './db/supabase.js';

// Records a dialogue response and applies the given affinity gain (0-2,
// computed by the caller via getAffinityForResponse). responseType is the
// RESPONSE_TYPES value the user picked. Returns the updated relationship.
export async function recordResponse(userId, characterId, gain, responseType) {
  try {
    // Update affinity in DB
    const updated = await updateAffinity(userId, characterId, gain);

    // Increment times_met
    await incrementTimesMet(userId, characterId);

    // Record which response type they chose
    if (responseType) {
      await updateLastResponseType(userId, characterId, responseType);
    }

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
