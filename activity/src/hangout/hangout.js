// Hangout: ties the rig to interaction (docs/hangout-activity.md §4.2).
// Hotspot taps, the annoyance meter, reactions (mood + line) and the
// Spend time debug path. Cosmetic and local: no server calls here.
//
// Reactions come from reactions.js (shared by every character, varying by
// relationship tier), with rig.json `reactions` overriding per character.
// `then` switches to a second mood after that many seconds, so a mood can
// build (a smile, then the blush) instead of snapping. A hotspot's reaction
// is its `reaction`, else the shared one for its spot name. `twitch` and
// `fist` move the arms and hands too (reactions.js). `sound` plays a clip
// through `play` (sounds.js): a file, or a list to pick one from. Sounds
// share a cooldown so spam-tapping can't spam clips; a reaction inside it
// still plays, just silently.

import { DIALOGUE_TIERS } from "../../../constants/tiers.js";
import { fileList } from "../rig/skeleton.js";

import { AnnoyanceMeter } from "./annoyance.js";
import { hotspotAt } from "./hotspots.js";
import { PLACEHOLDER_LINES } from "./placeholderLines.js";
import { SPOT_ANNOYANCE, TOUCH_SPOTS, resolveReaction } from "./reactions.js";

// Seconds a reaction holds when it doesn't set `duration`.
const DEFAULT_DURATION = 2.4;

// Seconds after a clip plays before any reaction may play another.
export const SOUND_COOLDOWN = 10;

export class Hangout {
  constructor({ renderer, motion, say = () => {}, play = () => {}, lines = PLACEHOLDER_LINES, random = Math.random, tier = "new" }) {
    this.renderer = renderer;
    this.motion = motion;
    this.say = say;
    this.play = play;
    this.soundReadyAt = -Infinity;
    this.lines = lines;
    this.random = random;
    this.meter = new AnnoyanceMeter(renderer.rig.annoyance);
    this.moodUntil = -Infinity;
    this.pendingMood = null; // { at, mood }
    this.baseMood = "default";
    this.baseHands = { ...renderer.handPose };
    this.handOverride = null; // { until, steps: [[at, pose]], sides }
    this.setTier(tier);
  }

  /** The outfit on screen (the renderer's flattened rig). */
  get rig() {
    return this.renderer.rig;
  }

  /** The relationship tier reactions are drawn from (constants/tiers.js DIALOGUE_TIERS). */
  setTier(tier) {
    if (!DIALOGUE_TIERS.includes(tier)) throw new Error(`unknown tier ${tier}`);
    this.tier = tier;
  }

  /**
   * Switches to another outfit (rig.json `outfits`). Hotspots and hands come
   * from the new outfit; the hands go back to its defaults.
   */
  setOutfit(name, handSet) {
    this.renderer.setOutfit(name, handSet);
    this.baseHands = { ...this.renderer.handPose };
    this.handOverride = null;
  }

  /** Switches the outfit's hand set (rig.json `hands.sets`); hands go back to its defaults. */
  setHandSet(name) {
    this.setOutfit(this.renderer.outfit ?? undefined, name);
  }

  line(trigger) {
    const pool = this.lines[trigger] ?? [];
    return pool.length ? pool[Math.floor(this.random() * pool.length)] : null;
  }

  /** A tap at a reference-space point. Returns what happened, for the UI. */
  tapAt(point, t) {
    const spot = hotspotAt(this.rig, this.renderer, point);
    if (!spot) return { spot: null, result: "miss" };
    const result = this.meter.tap(t, this.rig.hotspots[spot].annoyance ?? SPOT_ANNOYANCE[spot]);
    if (result === "ignored") return { spot, result };
    if (result === "upset") this.react("upset", t, spot);
    else this.react(this.rig.hotspots[spot].reaction ?? TOUCH_SPOTS[spot], t, spot);
    return { spot, result };
  }

  /** Spend time, debug path: plays the reaction with no data write. */
  spendTime(t) {
    this.react("spendTime", t);
  }

  /** Plays reaction `name`; `spot` is the touch spot that set it off, if any. */
  react(name, t, spot) {
    const r = resolveReaction(this.rig, name, this.tier);
    if (!r) return;
    const side = spot?.match(/_([lr])$/)?.[1];
    const sides = side ? [side] : Object.keys(this.rig.bones?.arms ?? {});
    if (r.twitch) this.motion.twitch(sides, t, r.twitch === true ? 1 : r.twitch);
    const duration = r.duration ?? DEFAULT_DURATION;
    if (r.fist) this.clench(sides, t, duration);
    this.pendingMood = null;
    if (r.mood) {
      this.renderer.setMood(r.mood);
      this.moodUntil = t + duration;
    }
    if (r.then) this.pendingMood = { at: t + r.then[0], mood: r.then[1] };
    const sounds = fileList(r.sound);
    if (sounds.length && t >= this.soundReadyAt) {
      this.play(sounds[Math.floor(this.random() * sounds.length)]);
      this.soundReadyAt = t + SOUND_COOLDOWN;
    }
    const text = this.line(r.line ?? name);
    if (text) this.say(text);
  }

  /**
   * Clenches `sides`' hands into a fist until t + `hold`. Straight to the
   * fist: "curled" faces another way, so stepping through it reads as the
   * hand flipping.
   */
  clench(sides, t, hold) {
    sides = sides.filter((s) => this.rig.hands?.[s]?.poses?.fist);
    if (!sides.length) return;
    this.handOverride = { until: t + hold, steps: [[t, "fist"]], sides };
  }

  /** Sets the resting mood and hand poses (the preview's buttons). */
  setBase({ mood, hands } = {}) {
    if (mood) {
      this.baseMood = mood;
      this.moodUntil = -Infinity;
      this.pendingMood = null;
      this.renderer.setMood(mood);
    }
    if (hands) Object.assign(this.baseHands, hands);
  }

  frame(t, dt) {
    if (this.pendingMood && t >= this.pendingMood.at) {
      if (t < this.moodUntil) this.renderer.setMood(this.pendingMood.mood);
      this.pendingMood = null;
    }
    if (t >= this.moodUntil && this.renderer.moodName !== this.baseMood) {
      this.renderer.setMood(this.baseMood);
    }
    const o = this.handOverride;
    if (o && t >= o.until) this.handOverride = null;
    for (const side of Object.keys(this.rig.hands ?? {})) {
      let pose = this.baseHands[side];
      if (this.handOverride?.sides.includes(side)) {
        for (const [at, p] of o.steps) if (t >= at) pose = p;
      }
      if (this.renderer.handPose[side] !== pose) this.renderer.setHandPose(side, pose);
    }
    const blink = this.motion.blinking(t);
    this.renderer.update(this.motion.pose(t, dt), { blink });
  }
}
