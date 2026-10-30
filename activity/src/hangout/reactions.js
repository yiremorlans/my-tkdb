// Hangout: the shared touch spots and how each one reacts at each
// relationship tier (docs/hangout-activity.md §4.2). Every character has the
// same spots; a rig.json only places them on its art (`hotspots`) and may
// override a reaction (`reactions.<name>`), merged over these defaults.
//
// Tiers are constants/tiers.js DIALOGUE_TIERS (Stranger → new …
// Devoted/Soulbound → bound).
//
// A reaction is { mood | rank, then?: [seconds, mood], duration?, line?,
// twitch?, fist? }, or
// { byTier: { <tier>: reaction } } to vary by tier. A tier with no entry
// uses the nearest lower tier's. Moods a character lacks fall back to
// "default".
//
// `rank` picks the mood off the expression ladder (constants/sceneFaces.js
// rankFace): 2 the face a call scene shows for a favorite response at that
// tier, 1 a liked one, 0 the least. So a touch draws the same faces as the
// character's encounters, overrides included. Welcome spots (head, hands)
// sit on the top rung; guarded ones (lips, ears, chest, hips) start on the bottom
// and climb from spark. The belly is in between: guarded at first, a liked
// face from warm.
//
// `twitch` (true, or a size multiplier) flinches the arm: the tapped side
// for a side spot (hand_r, ear_l…), both arms otherwise. By default only a
// hand tap twitches. `fist` clenches the same hands for the reaction's
// duration.
//
// `sound` plays a clip (a file under the rig's directory, or a list to pick
// one from; sounds.js). A character adds clips through rig.json
// `sounds: { <reaction>: file | [files] | { byTier: { <tier>: … } } }`,
// which layers over the reaction without restating its faces; a reaction's
// own `sound` wins.

import { rankFace } from "../../../constants/sceneFaces.js";
import { DIALOGUE_TIERS } from "../../../constants/tiers.js";

// Spot names every rig places, and the reaction each one triggers.
export const TOUCH_SPOTS = {
  head: "headPat",
  cheek: "cheekPoke",
  lips: "lipsTouch",
  ear_l: "earTouch",
  ear_r: "earTouch",
  hand_l: "handTap",
  hand_r: "handTap",
  chest: "chestTouch",
  belly: "bellyTouch",
  hips: "hipsTouch",
};

// Spots that fill the annoyance meter faster than a normal tap: the share
// of the threshold one tap adds, following how guarded the spot is. A
// normal tap adds 0.2 of the default threshold, so it takes a run of quick
// taps; at the default decay belly 0.3 fills it on the fourth tap (taps
// under ~0.35s apart), lips, ears and chest 0.45 on the third (~1s apart), hips
// 0.75 on the second (~2.8s apart). A rig hotspot's own `annoyance`
// overrides this.
export const SPOT_ANNOYANCE = {
  belly: 0.3,
  lips: 0.45,
  ear_l: 0.45,
  ear_r: 0.45,
  chest: 0.45,
  hips: 0.75,
};

export const DEFAULT_REACTIONS = {
  headPat: {
    byTier: {
      new: { rank: 2, duration: 2 },
      warm: { rank: 2, duration: 2.4 },
      spark: { rank: 2, duration: 2.6 },
      bound: { rank: 2, duration: 3 },
    },
  },
  cheekPoke: {
    byTier: {
      new: { rank: 1, duration: 2 },
      warm: { rank: 1, duration: 2.2 },
      close: { rank: 1, duration: 2.4 },
      bound: { rank: 1, duration: 2.6 },
    },
  },
  handTap: {
    byTier: {
      new: { rank: 2, duration: 2, twitch: true },
      warm: { rank: 2, duration: 2.4 },
      close: { rank: 2, duration: 2.6 },
      bound: { rank: 2, duration: 2.8 },
    },
  },
  chestTouch: {
    byTier: {
      new: { rank: 0, duration: 2.4 },
      spark: { rank: 1, duration: 2.6 },
      close: { rank: 2, duration: 2.6 },
      bound: { rank: 2, duration: 3 },
    },
  },
  bellyTouch: {
    byTier: {
      new: { rank: 0, duration: 2.4 },
      warm: { rank: 1, duration: 2.4 },
      close: { rank: 2, duration: 2.6 },
      bound: { rank: 2, duration: 3 },
    },
  },
  lipsTouch: {
    byTier: {
      new: { rank: 0, duration: 2.4 },
      spark: { rank: 1, duration: 2.6 },
      close: { rank: 2, duration: 2.6 },
      bound: { rank: 2, duration: 3 },
    },
  },
  // Ears are as guarded as the lips.
  earTouch: {
    byTier: {
      new: { rank: 0, duration: 2.4 },
      spark: { rank: 1, duration: 2.6 },
      close: { rank: 2, duration: 2.6 },
      bound: { rank: 2, duration: 3 },
    },
  },
  hipsTouch: {
    byTier: {
      new: { rank: 0, duration: 2.6, fist: true },
      known: { rank: 0, duration: 2.4 },
      spark: { rank: 1, duration: 2.6 },
      close: { rank: 2, duration: 2.6 },
      bound: { rank: 2, duration: 3 },
    },
  },
  // The face for a /meet answer's outcome (docs/hangout-activity.md §11.2
  // step 5): the rung its gain lands on, so love/like/flat match the faces a
  // call scene shows for a favorite, liked and least response at that tier.
  answerLove: { rank: 2, duration: 3.2 },
  answerLike: { rank: 1, duration: 3 },
  answerFlat: { rank: 0, duration: 2.6 },
  upset: { mood: "upset", duration: 4 },
};

/**
 * The reaction `name` plays at `tier` for this rig, or null. Falls back to
 * the nearest lower tier, and to "default" for moods the rig lacks.
 */
export function resolveReaction(rig, name, tier) {
  const picked = forTier(rig.reactions?.[name] ?? DEFAULT_REACTIONS[name], tier);
  if (!picked) return null;
  const moods = rig.expressions?.moods ?? {};
  const moodOrDefault = (m) => (m && !moods[m] ? "default" : m);
  const { rank, ...reaction } = picked;
  const mood = picked.mood ?? (rank != null ? rankFace(rig.character, tier, rank) : undefined);
  return {
    ...reaction,
    sound: picked.sound ?? forTier(rig.sounds?.[name], tier) ?? undefined,
    mood: moodOrDefault(mood),
    then: picked.then ? [picked.then[0], moodOrDefault(picked.then[1])] : undefined,
  };
}

// The tier's entry of a `{ byTier }` value (else the nearest lower tier's),
// or the value itself when it doesn't vary by tier.
function forTier(value, tier) {
  if (!value?.byTier) return value ?? null;
  for (let i = Math.max(0, DIALOGUE_TIERS.indexOf(tier)); i >= 0; i--) {
    const entry = value.byTier[DIALOGUE_TIERS[i]];
    if (entry) return entry;
  }
  return null;
}
