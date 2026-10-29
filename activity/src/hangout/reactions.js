// Hangout: the shared touch spots and how each one reacts at each
// relationship tier (docs/hangout-activity.md §4.2). Every character has the
// same spots; a rig.json only places them on its art (`hotspots`) and may
// override a reaction (`reactions.<name>`), merged over these defaults.
//
// Tiers are the dialogue tiers from constants/game.js DIALOGUE_TIER_BY_LEVEL
// (Stranger → new … Devoted/Soulbound → bound). They're listed here rather
// than imported because game.js pulls in server-only modules; a test keeps
// the two in step.
//
// A reaction is { mood, then?: [seconds, mood], duration?, line? }, or
// { byTier: { <tier>: reaction } } to vary by tier. A tier with no entry
// uses the nearest lower tier's. Moods a character lacks fall back to
// "default".

export const TIERS = ["new", "known", "warm", "spark", "close", "bound"];

// Spot names every rig places, and the reaction each one triggers.
export const TOUCH_SPOTS = {
  head: "headPat",
  cheek: "cheekPoke",
  hand_l: "handTap",
  hand_r: "handTap",
  chest: "chestTouch",
};

export const DEFAULT_REACTIONS = {
  headPat: {
    byTier: {
      new: { mood: "surprise", duration: 2 },
      known: { mood: "sweat", duration: 2.2 },
      warm: { mood: "smile", duration: 2.4 },
      spark: { mood: "smile", then: [0.4, "smile_blush"], duration: 2.6 },
      close: { mood: "smile_blush", duration: 2.6 },
      bound: { mood: "full_smile", then: [0.5, "full_smile_blush"], duration: 3 },
    },
  },
  cheekPoke: {
    byTier: {
      new: { mood: "surprise", duration: 2 },
      warm: { mood: "surprise_blush", duration: 2.2 },
      close: { mood: "blush", duration: 2.4 },
      bound: { mood: "full_smile_blush", duration: 2.6 },
    },
  },
  handTap: {
    byTier: {
      new: { mood: "serious", duration: 2 },
      known: { mood: "surprise", duration: 2 },
      warm: { mood: "smile", duration: 2.4 },
      spark: { mood: "blush", duration: 2.4 },
      close: { mood: "smile_blush", duration: 2.6 },
      bound: { mood: "full_smile_blush", duration: 2.8 },
    },
  },
  chestTouch: {
    byTier: {
      new: { mood: "upset", duration: 2.4 },
      known: { mood: "sweat", duration: 2.2 },
      warm: { mood: "surprise_blush", duration: 2.4 },
      spark: { mood: "blush", duration: 2.6 },
      close: { mood: "smile_blush", duration: 2.6 },
      bound: { mood: "full_smile_blush", duration: 3 },
    },
  },
  upset: { mood: "upset", duration: 4 },
  spendTime: { mood: "full_smile_blush", duration: 3.2 },
};

/**
 * The reaction `name` plays at `tier` for this rig, or null. Falls back to
 * the nearest lower tier, and to "default" for moods the rig lacks.
 */
export function resolveReaction(rig, name, tier) {
  const r = rig.reactions?.[name] ?? DEFAULT_REACTIONS[name];
  if (!r) return null;
  let picked = r;
  if (r.byTier) {
    picked = null;
    for (let i = Math.max(0, TIERS.indexOf(tier)); i >= 0 && !picked; i--) {
      picked = r.byTier[TIERS[i]] ?? null;
    }
    if (!picked) return null;
  }
  const moods = rig.expressions?.moods ?? {};
  const known = (m) => (m && moods[m] ? m : m ? "default" : m);
  return {
    ...picked,
    mood: known(picked.mood),
    then: picked.then ? [picked.then[0], known(picked.then[1])] : undefined,
  };
}
