// Hangout: ties the rig to interaction (docs/hangout-activity.md §4.2).
// Hotspot taps, the annoyance meter and reactions (mood + line). Cosmetic
// and local: no server calls here.
//
// Reactions come from reactions.js (shared by every character, varying by
// relationship tier), with rig.json `reactions` overriding per character.
// `then` switches to a second mood after that many seconds, so a mood can
// build (a smile, then the blush) instead of snapping. A hotspot's reaction
// is its `reaction`, else the shared one for its spot name. `twitch` and
// `fist` move the arms and hands too (reactions.js). `sound` plays a clip
// through `play` (sounds.js): a file, or a list to pick one from. Sounds
// share a cooldown so spam-tapping can't spam clips; a reaction inside it
// still plays, just silently. Touch lines hold the same way: a tap while
// one is still typing out or being read reacts without a new line, so
// spam-tapping can't flip through the pool. The upset line always speaks.

import { DIALOGUE_TIERS } from "../../../constants/tiers.js";

import { AnnoyanceMeter } from "./annoyance.js";
import { hotspotAt } from "./hotspots.js";
import { PLACEHOLDER_LINES } from "./placeholderLines.js";
import { SPOT_ANNOYANCE, TOUCH_SPOTS, forTier, resolveReaction } from "./reactions.js";

// Seconds a reaction holds when it doesn't set `duration`.
const DEFAULT_DURATION = 2.4;

// Seconds after a clip plays before any reaction may play another.
export const SOUND_COOLDOWN = 10;

// The VN box types a line at one character per TYPE_MS (scene.js).
export const TYPE_MS = 28;

// Seconds a touch line stays up after it finishes typing before another tap
// may replace it.
export const LINE_HOLD = 1.5;

export class Hangout {
  constructor({ renderer, motion, say = () => {}, play = () => {}, lines = PLACEHOLDER_LINES, random = Math.random, tier = "new" }) {
    this.renderer = renderer;
    this.motion = motion;
    this.say = say;
    this.play = play;
    this.soundReadyAt = -Infinity;
    this.lineReadyAt = -Infinity;
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

  /**
   * The relationship tier reactions are drawn from (constants/tiers.js
   * DIALOGUE_TIERS). It also picks the resting mood: rig.json `restMood`, a
   * mood or `{ byTier }` (Yuri rests serious until warm), else "default".
   */
  setTier(tier) {
    if (!DIALOGUE_TIERS.includes(tier)) throw new Error(`unknown tier ${tier}`);
    this.tier = tier;
    this.baseMood = forTier(this.rig.restMood, tier) ?? "default";
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

  /**
   * A random line for `trigger`. `lines` is either one pool per trigger, or
   * a character's pools per tier (constants/hangout/<id>.js), where a tier
   * without that trigger uses the nearest lower tier's; a trigger with no
   * pool anywhere uses the placeholder.
   */
  line(trigger) {
    let pool = this.lines[trigger];
    if (DIALOGUE_TIERS.some((tier) => this.lines[tier])) {
      pool = null;
      for (let i = DIALOGUE_TIERS.indexOf(this.tier); i >= 0 && !pool; i--) pool = this.lines[DIALOGUE_TIERS[i]]?.[trigger];
    }
    pool ??= PLACEHOLDER_LINES[trigger] ?? [];
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
    const sounds = [r.sound ?? []].flat();
    if (sounds.length && t >= this.soundReadyAt) {
      this.play(sounds[Math.floor(this.random() * sounds.length)]);
      this.soundReadyAt = t + SOUND_COOLDOWN;
    }
    if (spot && name !== "upset" && t < this.lineReadyAt) return;
    const text = this.line(r.line ?? name);
    if (!text) return;
    this.say(text);
    this.lineReadyAt = t + (text.length * TYPE_MS) / 1000 + LINE_HOLD;
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
