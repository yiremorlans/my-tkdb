// Hangout: the shared touch spots and how each one reacts at each
// relationship tier (docs/hangout-activity.md §4.2). Every character has the
// same spots; a rig.json only places them on its art (`hotspots`) and may
// override a reaction (`reactions.<name>`), merged over these defaults.
//
// Tiers are constants/tiers.js DIALOGUE_TIERS (Stranger → new …
// Devoted/Soulbound → bound).
//
// A reaction is { mood, then?: [seconds, mood], duration?, line?,
// twitch?, fist?, fadeOut? }, or
// { byTier: { <tier>: reaction } } to vary by tier. A tier with no entry
// uses the nearest lower tier's. Moods a character lacks fall back to
// "default".
//
// `mood` names one of the rig's own moods (rig.json `expressions.moods`, each
// a set of its Live2D expressions). Welcome spots (head, hands) start warm;
// guarded ones (lips, ears, chest, hips) start annoyed and soften from spark.
// The belly is in between: guarded at first, a surprised face from warm.
//
// `then` switches to a second mood that many seconds in; `then: ["line",
// mood]` switches once the line has typed out instead, for a face whose
// mouth can't talk (Taiga's tongue-out leer; hangout.js AFTER_LINE_HOLD).
//
// `twitch` (true, or a size multiplier) flinches: the tapped side for a
// side spot (hand_r, ear_l…), both sides otherwise (on Live2D the head and
// body pull away and the shoulders hitch; live2dRig.js FLINCH). By default
// the guarded spots flinch at new and known, scaled by sensitivity (chest
// 0.4, ears and belly 0.6, lips 0.8, hips 1 at new, less at known), and the
// lips and hips still a little at warm; hands and head pats don't. `fist` clenches the same hands for the reaction's
// duration.
//
// `fadeOut` (seconds, Live2D only) eases the reaction's face back to his
// resting one over that long (eased in and out) instead of expressions.fade, where a strong
// face (Elias's teaseLetGo smirk bends the brows hard) would snap back.
// Every reaction already eases back over SETTLE_FADE (hangout.js), so set it
// only to differ from that. A face that shuts his eyes or swaps the eye art
// (full smile, wink, Ren's shock, Kaito's lovestruck) needs no fadeOut: the renderer cuts its
// fade back short for every rig, and leaving a tongue or open grin (Taiga's
// leer, his big grin e_choshi_02) it cuts just the mouth's (live2dRig.js
// SNAP_BACK).
//
// `sound` plays a clip (a file under the rig's directory, or a list to pick
// one from; sounds.js). A character adds clips through rig.json
// `sounds: { <reaction>: file | [files] | { byTier: { <tier>: … } } }`,
// which layers over the reaction without restating its faces; a reaction's
// own `sound` wins.

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
      new: { mood: "close", duration: 2 },
      warm: { mood: "surprise_blush", duration: 2.4 },
      spark: { mood: "blush", duration: 2.6 },
      close: { mood: "full_smile_blush", duration: 2.6 },
      bound: { mood: "full_smile_blush", duration: 3 },
    },
  },
  // A cheek poke is a friendly poke: as calm as a head pat, no flinch.
  // Touch-averse characters may flinch where their lines startle.
  cheekPoke: {
    byTier: {
      new: { mood: "sweat", duration: 2 },
      warm: { mood: "surprise", duration: 2.4 },
      spark: { mood: "surprise_blush", duration: 2.6 },
      close: { mood: "full_smile", duration: 2.6 },
      bound: { mood: "full_smile", duration: 3 },
    },
  },
  handTap: {
    byTier: {
      new: { mood: "close", duration: 2 },
      warm: { mood: "surprise_blush", duration: 2.4 },
      spark: { mood: "blush", duration: 2.6 },
      close: { mood: "full_smile_blush", duration: 2.6 },
      bound: { mood: "full_smile_blush", duration: 3 },
    },
  },
  chestTouch: {
    byTier: {
      new: { mood: "annoyed", duration: 2.2, twitch: 0.4 },
      known: { mood: "annoyed", duration: 2.2, twitch: 0.3 },
      warm: { mood: "serious", duration: 2.6 },
      spark: { mood: "surprise_blush", duration: 2.8 },
      close: { mood: "full_smile_blush", duration: 2.8 },
      bound: { mood: "full_smile_blush", duration: 3.2 },
    },
  },
  bellyTouch: {
    byTier: {
      new: { mood: "annoyed", duration: 2.4, twitch: 0.6 },
      known: { mood: "annoyed", duration: 2.4, twitch: 0.4 },
      warm: { mood: "surprise", duration: 2.8 },
      spark: { mood: "surprise_blush", duration: 3 },
      close: { mood: "full_smile_blush", duration: 3 },
      bound: { mood: "full_smile_blush", duration: 3.4 },
    },
  },
  lipsTouch: {
    byTier: {
      new: { mood: "annoyed", duration: 2.6, twitch: 0.8 },
      known: { mood: "annoyed", duration: 2.6, twitch: 0.6 },
      warm: { mood: "serious", duration: 3, twitch: 0.3 },
      spark: { mood: "surprise_blush", duration: 3.2 },
      close: { mood: "full_smile_blush", duration: 3.2 },
      bound: { mood: "full_smile_blush", duration: 3.6 },
    },
  },
  // Ears are as sensitive as the belly, short of the lips.
  earTouch: {
    byTier: {
      new: { mood: "annoyed", duration: 2.4, twitch: 0.6 },
      known: { mood: "annoyed", duration: 2.4, twitch: 0.4 },
      warm: { mood: "serious", duration: 2.8 },
      spark: { mood: "surprise_blush", duration: 3 },
      close: { mood: "full_smile_blush", duration: 3 },
      bound: { mood: "full_smile_blush", duration: 3.4 },
    },
  },
  hipsTouch: {
    byTier: {
      new: { mood: "annoyed", duration: 2.8, fist: true, twitch: 1 },
      known: { mood: "annoyed", duration: 2.8, fist: true, twitch: 0.7 },
      warm: { mood: "serious", duration: 3.2, twitch: 0.5 },
      spark: { mood: "surprise_blush", duration: 3.4 },
      close: { mood: "full_smile_blush", duration: 3.4 },
      bound: { mood: "full_smile_blush", duration: 3.8 },
    },
  },
  // Letting go of a hold (date-only, spark to bound; docs/hangout-activity.md
  // §4.2) plays the hold's face with its release line (constants/hangout/
  // <id>.js heartbeatHold / lipHold / handHold). No flinch: he let it happen.
  // The lips hold is the most intimate gesture, so its face holds longest;
  // the heartbeat check is a chest touch he played cool through.
  handHold: {
    byTier: {
      spark: { mood: "blush", duration: 2.6 },
      close: { mood: "full_smile_blush", duration: 2.6 },
      bound: { mood: "full_smile_blush", duration: 3 },
    },
  },
  heartbeatHold: {
    byTier: {
      spark: { mood: "surprise_blush", duration: 2.8 },
      close: { mood: "full_smile_blush", duration: 2.8 },
      bound: { mood: "full_smile_blush", duration: 3.2 },
    },
  },
  lipHold: {
    byTier: {
      spark: { mood: "surprise_blush", duration: 3.6 },
      close: { mood: "full_smile_blush", duration: 3.6 },
      bound: { mood: "full_smile_blush", duration: 4 },
    },
  },
  // Tease (bound only, secret) let go before its crest: he was close to the
  // edge and you stopped. The longest-held face.
  teaseLetGo: { byTier: { bound: { mood: "full_smile_blush", duration: 4.4 } } },
  // The face for a /meet answer's outcome (docs/hangout-activity.md §11.2
  // step 5). Each tier keeps
  // fave > liked > flat and the fave face climbs tier to tier: a slight
  // smile, beaming from spark. Answers never blush: blush is earned by
  // touches and holds. A flat answer is indifference ("didn't resonate"),
  // never anger, annoyance or hurt; from close it's a quiet, content look.
  // A rig with its own register (a smirk, a composed face) overrides these
  // in rig.json `reactions`.
  answerLove: {
    byTier: {
      new: { mood: "smile", duration: 3.2 },
      spark: { mood: "full_smile", duration: 3.2 },
    },
  },
  answerLike: {
    byTier: {
      new: { mood: "close", duration: 3 },
      spark: { mood: "smile", duration: 3 },
    },
  },
  answerFlat: {
    byTier: {
      new: { mood: "indifferent", duration: 2.6 },
      close: { mood: "close", duration: 2.6 },
    },
  },
  upset: { mood: "upset", duration: 4 },
  // Taking off a removable article (articles.js, warm up): every
  // `<article>Off` reaction a rig doesn't set (rig.json `reactions.hatOff`)
  // plays this. Caught off guard at warm, warmer from spark.
  articleOff: {
    byTier: {
      warm: { mood: "surprise", duration: 3 },
      spark: { mood: "surprise_blush", duration: 3 },
      close: { mood: "smile_blush", duration: 3 },
      bound: { mood: "full_smile_blush", duration: 3.4 },
    },
  },
};

// `<article>Off` (hatOff, peekabooOff…) falls back to articleOff.
const ARTICLE_OFF = /^[a-z][A-Za-z]*Off$/;

/**
 * The reaction `name` plays at `tier` for this rig, or null. Falls back to
 * the nearest lower tier, and to "default" for moods the rig lacks.
 */
export function resolveReaction(rig, name, tier) {
  const fallback = DEFAULT_REACTIONS[name] ?? (ARTICLE_OFF.test(name) ? DEFAULT_REACTIONS.articleOff : undefined);
  const picked = forTier(rig.reactions?.[name] ?? fallback, tier);
  if (!picked) return null;
  const moods = rig.expressions?.moods ?? {};
  const moodOrDefault = (m) => (m && !moods[m] ? "default" : m);
  return {
    ...picked,
    sound: picked.sound ?? forTier(rig.sounds?.[name], tier) ?? undefined,
    mood: moodOrDefault(picked.mood),
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

// The touch spots an article's `covers` names at a tier: one spot or a
// list (Mio's apron covers chest and belly), either of them `{ byTier }`.
export function coveredSpots(covers, tier) {
  const value = forTier(covers, tier);
  return value == null ? [] : [value].flat();
}
