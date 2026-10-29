// Hangout rig: idle motion and blink timing
// (docs/hangout-activity.md §4.1–4.2). Pure: turns time into a pose map for
// skeleton.js solve(). Every number comes from rig.json `motion` and
// `bones`, which the preview edits live.
//
// `rig.bones` names the parts each motion drives, so nothing here knows
// which character it is animating:
//   { "torso": "torso", "head": "head", "neck": "neck",
//     "arms": { "r": { "upper": "upper_arm_r", "fore": "forearm_r",
//                      "hand": "hand_r", "dir": 1 }, "l": { ... } } }
// `dir` mirrors a rotation for the other side.
//
// A twitch (twitch()) is a one-off flinch on top of the idle: the arm eases
// in toward the body and settles back. `motion.twitch` sets its size
// (forearm degrees; negative flips it outward), how much the upper arm
// follows, and how soon it peaks (s). The hand rides along unchanged.

const TAU = Math.PI * 2;

// Head sway is one house setting for every character and outfit (decided
// 2026-10-29), so all of them idle alike; it lives here, never in rig.json.
// rig.json `motion.sway` may only switch it off (`enabled`), for tests and
// the preview.
export const HEAD_SWAY = { speed: 0.08, amount: 0.8 };

/** Seconds a twitch takes to peak (rig.json `motion.twitch.peak`). */
const twitchPeak = (rig) => Math.max(0.01, rig.motion?.twitch?.peak ?? 0.14);

export class Motion {
  /** `random` is injectable so tests and previews can be deterministic. */
  constructor(rig, { random = Math.random } = {}) {
    this.rig = rig;
    this.random = random;
    // A motion is on unless rig.json sets `"enabled": false` on it.
    this.enabled = {};
    for (const name of ["breath", "sway", "hair", "arms", "twitch", "blink"]) {
      this.enabled[name] = rig.motion?.[name]?.enabled !== false;
    }
    this.hair = new Map(); // lock index → { angle, velocity }
    this.lastHead = 0;
    this.nextBlinkAt = null;
    this.blinkUntil = -1;
    this.twitches = {}; // arm side → { at, scale }
  }

  /** Starts a twitch on each arm in `sides` ("r", "l"); `scale` multiplies its size. */
  twitch(sides, t, scale = 1) {
    for (const side of sides) this.twitches[side] = { at: t, scale };
  }

  /**
   * Twitch strength at time t: one pulse peaking at 1 (× its scale) at
   * `peak`, gone by ~4× that. x²·e^(2(1−x)) starts from rest (no snap) and
   * settles without overshoot.
   */
  twitchPulse(side, t) {
    const tw = this.twitches[side];
    if (!tw || !this.enabled.twitch) return 0;
    const x = (t - tw.at) / twitchPeak(this.rig);
    if (x < 0 || x > 6) {
      if (x > 6) delete this.twitches[side];
      return 0;
    }
    return tw.scale * x * x * Math.exp(2 * (1 - x));
  }

  blinkInterval() {
    const mean = this.rig.motion?.blink?.meanInterval ?? 4;
    // Jittered around the mean, never so short it reads as a twitch.
    return Math.max(1.2, mean * (0.5 + this.random()));
  }

  /** True while the eyes should be shut. Call once per frame. */
  blinking(t) {
    if (!this.enabled.blink) return false;
    this.nextBlinkAt ??= t + this.blinkInterval();
    if (t >= this.nextBlinkAt) {
      this.blinkUntil = t + 0.12;
      // One blink in five is a double blink.
      this.nextBlinkAt = t + (this.random() < 0.2 ? 0.25 : this.blinkInterval());
    }
    return t < this.blinkUntil;
  }

  /** Pose map for solve(): part id → { rotation, scale, offset }. */
  pose(t, dt) {
    const rig = this.rig;
    const m = rig.motion ?? {};
    const bones = rig.bones ?? {};
    const pose = {};
    const add = (id, key, value) => {
      if (!id) return;
      pose[id] ??= {};
      if (key === "rotation") pose[id].rotation = (pose[id].rotation ?? 0) + value;
      else if (key === "offset") {
        const [x, y] = pose[id].offset ?? [0, 0];
        pose[id].offset = [x + value[0], y + value[1]];
      } else pose[id][key] = value;
    };

    const breathPhase = Math.sin(TAU * (m.breath?.speed ?? 0.25) * t);
    // Breathing is a slight rise of the upper body (amount = px), never a
    // scale: torso scale is inherited by the head and arms, so even 1-2%
    // read as the whole character swelling.
    if (this.enabled.breath) {
      const a = m.breath?.amount ?? 0.6;
      add(bones.torso, "offset", [0, -a * (0.5 + 0.5 * breathPhase)]);
    }

    let head = 0;
    if (this.enabled.sway) {
      const { speed: s, amount: a } = HEAD_SWAY;
      head = a * (0.7 * Math.sin(TAU * s * t) + 0.3 * Math.sin(TAU * s * 1.73 * t + 1.1));
    }
    add(bones.head, "rotation", head);

    // Hair locks: damped springs pushed by the head's angular velocity, so
    // they trail the sway instead of moving rigidly with it.
    const locks = rig.groups?.hair_locks ?? [];
    const headVel = dt > 0 ? (head - this.lastHead) / dt : 0;
    this.lastHead = head;
    locks.forEach((ids, i) => {
      const st = this.hair.get(i) ?? { angle: 0, velocity: 0 };
      const hs = m.hair?.speed ?? 0.4;
      const ha = m.hair?.amount ?? 3;
      if (this.enabled.hair && dt > 0) {
        const idle = ha * 0.35 * Math.sin(TAU * hs * t + i * 1.9);
        const stiffness = 60;
        const damping = 9;
        const force = -stiffness * (st.angle - idle) - damping * st.velocity - headVel * ha * 0.9;
        st.velocity += force * Math.min(dt, 0.05);
        st.angle += st.velocity * Math.min(dt, 0.05);
        st.angle = Math.max(-ha * 2, Math.min(ha * 2, st.angle));
      } else if (!this.enabled.hair) {
        st.angle = 0;
        st.velocity = 0;
      }
      this.hair.set(i, st);
      for (const id of ids) add(id, "rotation", st.angle);
    });

    for (const [side, arm] of Object.entries(bones.arms ?? {})) {
      const dir = arm.dir ?? 1;
      // Inward is against `dir`: the hand swings toward the body.
      const pulse = this.twitchPulse(side, t);
      if (pulse) {
        const jerk = -dir * (m.twitch?.amount ?? 1) * pulse;
        add(arm.upper, "rotation", jerk * (m.twitch?.upper ?? 0.15));
        add(arm.fore, "rotation", jerk);
      }
      if (!this.enabled.arms) continue;
      const a = m.arms?.amount ?? 0.4;
      add(arm.upper, "rotation", dir * a * breathPhase);
      add(arm.fore, "rotation", dir * a * 0.6 * breathPhase);
    }
    return pose;
  }
}
