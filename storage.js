// Supabase-backed relationship storage
// All affinity and relationship data is now stored in Postgres
import { getRelationshipLevel, bondLevelIndex } from './constants/game.js';
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

    // updateAffinity hands back the affinity it read before writing, so the
    // crossing is free: `level` is where the user is now, `previousLevel` where
    // they were a moment ago, and `leveledUp` is the difference the bond-scene
    // DM hangs off (docs/bond-scene-dms.md §1.1).
    //
    // Compared by ladder position rather than by name so the check is
    // directional: only a move *up* the ladder is a level-up. Levels are never
    // skipped — the largest single gain is 4 (2 base + 2 spent /call boosts)
    // and the narrowest band is 20 wide — so this always advances one step, but
    // a plain `!==` would also fire on a step down.
    const previousLevel = getRelationshipLevel(updated.previous_affinity || 0);
    const level = getRelationshipLevel(updated.affinity || 0);

    return {
      affinity: updated.affinity || 0,
      timesMet: (updated.times_met || 0) + 1,
      gain,
      level,
      previousLevel,
      leveledUp: bondLevelIndex(level.name) > bondLevelIndex(previousLevel.name),
    };
  } catch (err) {
    console.error('Error recording response to DB:', err);
    throw err;
  }
}
