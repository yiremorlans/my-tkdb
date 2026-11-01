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
// `twitch` (true, or a size multiplier) flinches: the tapped side for a
// side spot (hand_r, ear_l…), both sides otherwise (on Live2D the head and
// body pull away and the shoulders hitch; live2dRig.js FLINCH). By default
// the guarded spots flinch at new and known, scaled by sensitivity (chest
// 0.4, ears and belly 0.6, lips 0.8, hips 1 at new, less at known), and the
// lips and hips still a little at warm; hands and head pats don't. `fist` clenches the same hands for the reaction's
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

// How sensitive each spot is, least to most: head, hands and cheek, then chest,
// then ears and belly, then lips, then hips. A spot's rank raises how fast
// taps fill the annoyance meter (SPOT_ANNOYANCE) and how long its face
// holds (DEFAULT_REACTIONS durations); only the hips clench a fist. The lips
// are very guarded, not aggressive.
//
// Spots that fill the annoyance meter faster than a normal tap: the share
// of the threshold one tap adds. A normal tap (head, hands, a friendly cheek poke) adds 0.2
// of the default threshold, so it takes a run of quick taps; at the default
// decay chest 0.3 fills it on the fourth tap (taps under ~0.35s apart), ears
// and belly 0.45 on the third (~1s apart), lips 0.6 on the second (~1.1s
// apart), hips 0.75 on the second (~2.8s apart). A rig hotspot's own
// `annoyance` overrides this.
export const SPOT_ANNOYANCE = {
  chest: 0.3,
  ear_l: 0.45,
  ear_r: 0.45,
  belly: 0.45,
  lips: 0.6,
  hips: 0.75,
};

// A touch's face holds past a head pat's at the same tier (2s new/known,
// 2.4 warm, 2.6 spark/close, 3 bound) by the spot's sensitivity: chest
// +0.2s, ears and belly +0.4, lips +0.6, hips +0.8; hands and head pats
// don't. Rigs that restate a reaction keep these durations.
export const DEFAULT_REACTIONS = {
  headPat: {
    byTier: {
      new: { rank: 2, duration: 2 },
      warm: { rank: 2, duration: 2.4 },
      spark: { rank: 2, duration: 2.6 },
      bound: { rank: 2, duration: 3 },
    },
  },
  // A cheek poke is a friendly poke: as calm as a head pat, no flinch.
  // Touch-averse characters may flinch where their lines startle.
  cheekPoke: {
    byTier: {
      new: { rank: 1, duration: 2 },
      warm: { rank: 1, duration: 2.4 },
      spark: { rank: 1, duration: 2.6 },
      bound: { rank: 1, duration: 3 },
    },
  },
  handTap: {
    byTier: {
      new: { rank: 2, duration: 2 },
      warm: { rank: 2, duration: 2.4 },
      spark: { rank: 2, duration: 2.6 },
      bound: { rank: 2, duration: 3 },
    },
  },
  chestTouch: {
    byTier: {
      new: { rank: 0, duration: 2.2, twitch: 0.4 },
      known: { rank: 0, duration: 2.2, twitch: 0.3 },
      warm: { rank: 0, duration: 2.6 },
      spark: { rank: 1, duration: 2.8 },
      close: { rank: 2, duration: 2.8 },
      bound: { rank: 2, duration: 3.2 },
    },
  },
  bellyTouch: {
    byTier: {
      new: { rank: 0, duration: 2.4, twitch: 0.6 },
      known: { rank: 0, duration: 2.4, twitch: 0.4 },
      warm: { rank: 1, duration: 2.8 },
      spark: { rank: 1, duration: 3 },
      close: { rank: 2, duration: 3 },
      bound: { rank: 2, duration: 3.4 },
    },
  },
  lipsTouch: {
    byTier: {
      new: { rank: 0, duration: 2.6, twitch: 0.8 },
      known: { rank: 0, duration: 2.6, twitch: 0.6 },
      warm: { rank: 0, duration: 3, twitch: 0.3 },
      spark: { rank: 1, duration: 3.2 },
      close: { rank: 2, duration: 3.2 },
      bound: { rank: 2, duration: 3.6 },
    },
  },
  // Ears are as sensitive as the belly, short of the lips.
  earTouch: {
    byTier: {
      new: { rank: 0, duration: 2.4, twitch: 0.6 },
      known: { rank: 0, duration: 2.4, twitch: 0.4 },
      warm: { rank: 0, duration: 2.8 },
      spark: { rank: 1, duration: 3 },
      close: { rank: 2, duration: 3 },
      bound: { rank: 2, duration: 3.4 },
    },
  },
  hipsTouch: {
    byTier: {
      new: { rank: 0, duration: 2.8, fist: true, twitch: 1 },
      known: { rank: 0, duration: 2.8, fist: true, twitch: 0.7 },
      warm: { rank: 0, duration: 3.2, twitch: 0.5 },
      spark: { rank: 1, duration: 3.4 },
      close: { rank: 2, duration: 3.4 },
      bound: { rank: 2, duration: 3.8 },
    },
  },
  // The face for a /meet answer's outcome (docs/hangout-activity.md §11.2
  // step 5): the rung its gain lands on, so love/like match the faces a call
  // scene shows for a favorite and liked response at that tier. A flat answer
  // is indifference, never anger or annoyance: below spark the bottom rung is
  // an annoyed or serious face, so it plays the rig's `indifferent` mood
  // instead (a blank straight face or a look away); from spark the bottom
  // rung is already calm.
  answerLove: { rank: 2, duration: 3.2 },
  answerLike: { rank: 1, duration: 3 },
  answerFlat: {
    byTier: {
      new: { mood: "indifferent", duration: 2.6 },
      spark: { rank: 0, duration: 2.6 },
    },
  },
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
export function forTier(value, tier) {
  if (!value?.byTier) return value ?? null;
  for (let i = Math.max(0, DIALOGUE_TIERS.indexOf(tier)); i >= 0; i--) {
    const entry = value.byTier[DIALOGUE_TIERS[i]];
    if (entry) return entry;
  }
  return null;
}
