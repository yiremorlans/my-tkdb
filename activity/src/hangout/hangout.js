// Hangout: ties the rig to interaction (docs/hangout-activity.md §4.2).
// Hotspot taps, the annoyance meter, reactions (mood + line) and the
// Spend time debug path. Cosmetic and local: no server calls here.
//
// Reactions come from reactions.js (shared by every character, varying by
// relationship tier), with rig.json `reactions` overriding per character.
// `then` switches to a second mood after that many seconds, so a mood can
// build (a smile, then the blush) instead of snapping. A hotspot's reaction
// is its `reaction`, else the shared one for its spot name.

import { AnnoyanceMeter } from "./annoyance.js";
import { hotspotAt } from "./hotspots.js";
import { PLACEHOLDER_LINES } from "./placeholderLines.js";
import { TOUCH_SPOTS, TIERS, resolveReaction } from "./reactions.js";

export class Hangout {
  constructor({ rig, renderer, motion, say = () => {}, lines = PLACEHOLDER_LINES, random = Math.random, tier = "new" }) {
    this.rig = rig;
    this.renderer = renderer;
    this.motion = motion;
    this.say = say;
    this.lines = lines;
    this.random = random;
    this.meter = new AnnoyanceMeter(rig.annoyance);
    this.moodUntil = -Infinity;
    this.pendingMood = null; // { at, mood }
    this.baseMood = "default";
    this.baseHands = { ...renderer.handPose };
    this.setTier(tier);
  }

  /** The relationship tier reactions are drawn from (reactions.js TIERS). */
  setTier(tier) {
    if (!TIERS.includes(tier)) throw new Error(`unknown tier ${tier}`);
    this.tier = tier;
  }

  /**
   * Switches to another outfit (rig.json `outfits`). Hotspots and hands come
   * from the new outfit; the hands go back to its defaults.
   */
  setOutfit(name) {
    this.renderer.setOutfit(name);
    this.rig = this.renderer.rig;
    this.motion.rig = this.renderer.rig;
    this.baseHands = { ...this.renderer.handPose };
  }

  line(trigger) {
    const pool = this.lines[trigger] ?? [];
    return pool.length ? pool[Math.floor(this.random() * pool.length)] : null;
  }

  /** A tap at a reference-space point. Returns what happened, for the UI. */
  tapAt(point, t) {
    const spot = hotspotAt(this.rig, this.renderer, point);
    if (!spot) return { spot: null, result: "miss" };
    const result = this.meter.tap(t);
    if (result === "ignored") return { spot, result };
    if (result === "upset") this.react("upset", t);
    else this.react(this.rig.hotspots[spot].reaction ?? TOUCH_SPOTS[spot], t);
    return { spot, result };
  }

  /** Spend time, debug path: plays the reaction with no data write. */
  spendTime(t) {
    this.react("spendTime", t);
  }

  react(name, t) {
    const r = resolveReaction(this.rig, name, this.tier);
    if (!r) return;
    this.pendingMood = null;
    if (r.mood) {
      this.renderer.setMood(r.mood);
      this.moodUntil = t + (r.duration ?? 2.4);
    }
    if (r.then) this.pendingMood = { at: t + r.then[0], mood: r.then[1] };
    const text = this.line(r.line ?? name);
    if (text) this.say(text);
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
    for (const side of Object.keys(this.rig.hands ?? {})) {
      const pose = this.baseHands[side];
      if (this.renderer.handPose[side] !== pose) this.renderer.setHandPose(side, pose);
    }
    const blink = this.motion.blinking(t);
    this.renderer.update(this.motion.pose(t, dt), { blink });
  }
}
