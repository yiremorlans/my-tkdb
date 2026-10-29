// Hangout: the annoyance meter for spam-tapping (docs/hangout-activity.md
// §4.2). Pure; time comes in as seconds so tests can drive it.
//
// Each tap adds `perTap`, or a share of `threshold` for a weighted spot
// (SPOT_ANNOYANCE in reactions.js); the level decays at `decayPerSec`. Crossing
// `threshold` makes the character upset, and taps are ignored for
// `recoverSec` while he settles. Values come from rig.json `annoyance`.

export class AnnoyanceMeter {
  constructor({ perTap = 1, decayPerSec = 0.8, threshold = 5, recoverSec = 4 } = {}) {
    this.config = { perTap, decayPerSec, threshold, recoverSec };
    this.reset();
  }

  reset() {
    this.value = 0;
    this.at = 0;
    this.recoverUntil = -Infinity;
  }

  level(t) {
    const { decayPerSec } = this.config;
    return Math.max(0, this.value - decayPerSec * Math.max(0, t - this.at));
  }

  recovering(t) {
    return t < this.recoverUntil;
  }

  /**
   * Registers a tap. `share`, when given, adds that fraction of `threshold`
   * instead of `perTap`. Returns "ignored", "upset" or "ok".
   */
  tap(t, share) {
    if (this.recovering(t)) return "ignored";
    const { perTap, threshold, recoverSec } = this.config;
    this.value = this.level(t) + (share == null ? perTap : share * threshold);
    this.at = t;
    if (this.value >= threshold) {
      this.value = 0;
      this.recoverUntil = t + recoverSec;
      return "upset";
    }
    return "ok";
  }
}
