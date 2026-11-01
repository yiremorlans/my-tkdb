// Warmth (docs/hangout-activity.md §12.7), PROTOTYPE: a 0-1 value that
// deepens the blush and quickens the breathing (live2dRig.js applyWarmth).
// Only the preview drives it so far. Two profiles:
//   date      the spec'd one (§12.7): starts at close 0.2 / bound 0.4,
//             rises with answers, holds and strokes, drifts back to its start
//   hangout   the proposal for ordinary Hangouts, spark and up only: starts
//             at 0, rises a little with each touch, capped lower than a
//             date, drifts back to 0 faster, and an upset clears it
// Warmth is local and cosmetic; nothing here reaches the server.

export const WARMTH_PROFILES = {
  date: {
    start: { close: 0.2, bound: 0.4 },
    cap: { close: 1, bound: 1 },
    driftPerSec: 0.002, // about -0.02 per 10s
    gains: { fave: 0.2, liked: 0.1, flat: 0, touch: 0, stroke: 0.05, holdPerSec: 0.1, holdMax: 0.3 },
    upsetClears: false,
  },
  hangout: {
    start: { spark: 0, close: 0, bound: 0 },
    cap: { spark: 0.4, close: 0.6, bound: 0.7 },
    driftPerSec: 0.005, // about -0.05 per 10s
    gains: { fave: 0.15, liked: 0.05, flat: 0, touch: 0.05, stroke: 0.05, holdPerSec: 0, holdMax: 0 },
    upsetClears: true,
  },
};

// How fast the shown value eases toward the target (per second, exponential).
const EASE = 3;

export class Warmth {
  /** `profile` is a WARMTH_PROFILES key; a tier it doesn't list means off. */
  constructor(profile, tier) {
    this.profile = WARMTH_PROFILES[profile] ?? null;
    this.setTier(tier);
  }

  setTier(tier) {
    this.tier = tier;
    this.on = this.profile?.start[tier] != null;
    this.floor = this.on ? this.profile.start[tier] : 0;
    this.cap = this.on ? this.profile.cap[tier] : 0;
    this.target = this.floor;
    this.value = this.floor;
    this.holdGained = 0;
  }

  /** Adds `amount`, within the tier's floor and cap. */
  bump(amount) {
    if (!this.on) return;
    this.target = Math.min(this.cap, Math.max(this.floor, this.target + amount));
  }

  /** A /meet or date answer: "fave", "liked" or "flat". */
  answer(kind) {
    this.bump(this.profile?.gains[kind] ?? 0);
  }

  /** A touch reaction by name (hangout.js react); "upset" may clear it. */
  reaction(name) {
    if (!this.on) return;
    if (name === "upset") {
      if (this.profile.upsetClears) this.target = this.floor;
      return;
    }
    this.bump(this.profile.gains.touch);
  }

  stroke() {
    this.bump(this.profile?.gains.stroke ?? 0);
  }

  /** `seconds` more of a hold; one hold adds at most holdMax. */
  hold(seconds) {
    if (!this.on) return;
    const g = this.profile.gains;
    const add = Math.min(g.holdPerSec * seconds, g.holdMax - this.holdGained);
    if (add > 0) {
      this.holdGained += add;
      this.bump(add);
    }
  }

  endHold() {
    this.holdGained = 0;
  }

  /** Drifts the target down and eases the shown value; returns the value. */
  update(dt) {
    if (!this.on) return (this.value = 0);
    this.target = Math.max(this.floor, this.target - this.profile.driftPerSec * dt);
    this.value += (this.target - this.value) * (1 - Math.exp(-EASE * dt));
    return this.value;
  }
}
