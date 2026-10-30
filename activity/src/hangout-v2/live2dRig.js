// Hangout v2 (proof): a Live2D model standing in for the sprite rig, so the
// Hangout class (hangout/hangout.js) drives it unchanged. The rig is
// assets/live2d/<character>/rig.json: the same keys Hangout and reactions.js
// read from a v1 rig.json (character, annoyance, hotspots, expressions.moods,
// sounds, bones.arms), plus
//   outfits.<name>.model   the outfit's model3.json (converted from the game)
//   parts.<id>             Live2D drawable ids a hotspot's `part` names; its
//                          rect is in their combined bounds, as they move
//   expressions.moods      mood -> Live2D expressions stacked to draw it
//                          (smile_blush: smile + blush)
//   reactionPoses          reaction -> Live2D pose group it also plays
//   motion.idle.amount     how much of the idle clip's sway to keep (0-1)
//   motion.breath.amount   how much of the breathing to keep (0-1)
//   motion.sway.amount     the plugin's own head/body sway (CubismBreath),
//                          which the game doesn't use: 0 (off) unless set
// The model breathes, blinks and runs physics itself, so the sprite rig's
// pose map and blink timing are ignored here.

import { Container } from "pixi.js";
import { Live2DModel, MotionPriority } from "untitled-pixi-live2d-engine/cubism";

// Seconds a reaction's pose holds before its return clip plays.
const POSE_HOLD = 2.5;

// Mouth flaps while a line types: syllables per second, and the seconds
// the mouth takes to settle shut after the last one.
const TALK_RATE = 7;
const TALK_SETTLE = 0.12;

/** Fetches `${baseUrl}/rig.json`, its sounds, and each outfit's expression files. */
export async function loadLive2DRig(baseUrl) {
  const res = await fetch(`${baseUrl}/rig.json`);
  if (!res.ok) throw new Error(`rig.json: HTTP ${res.status} at ${baseUrl}`);
  const rig = await res.json();
  const sounds = new Map();
  await Promise.all([...new Set(Object.values(rig.sounds ?? {}).flat())].map(async (file) => {
    const r = await fetch(`${baseUrl}/${file}`);
    if (r.ok) sounds.set(file, await r.arrayBuffer());
  }));
  return { rig, sounds, baseUrl };
}

/** Same shape as skeleton.js withOutfit: one outfit merged over the shared keys. */
function withOutfit(rig, name = rig.defaultOutfit) {
  const outfit = rig.outfits?.[name];
  if (!outfit) throw new Error(`unknown outfit ${name}`);
  const { outfits, defaultOutfit, ...shared } = rig;
  return {
    ...shared,
    ...outfit,
    outfit: name,
    parts: { ...shared.parts, ...outfit.parts },
    hotspots: { ...shared.hotspots, ...outfit.hotspots },
  };
}

export class Live2DRig {
  /** Use `Live2DRig.create`; the model loads asynchronously. */
  constructor({ source, baseUrl }) {
    this.source = source;
    this.baseUrl = baseUrl;
    this.view = new Container();
    this.handPose = {}; // no hand art swaps: the model's poses carry the hands
    this.moodName = "default";
    this.model = null;
  }

  static async create({ rig, baseUrl, outfit }) {
    const r = new Live2DRig({ source: rig, baseUrl });
    await r.setOutfit(outfit ?? rig.defaultOutfit);
    return r;
  }

  get outfit() {
    return this.rig.outfit;
  }

  /** Loads the outfit's model in place of the current one. */
  async setOutfit(name) {
    const rig = withOutfit(this.source, name);
    const url = `${this.baseUrl}/${rig.model}`;
    const model = await Live2DModel.from(url, { autoFocus: false, autoHitTest: false });
    this.model?.destroy();
    this.rig = rig;
    this.model = model;
    this.view.addChild(model);
    this.raw = model.internalModel.coreModel.getModel();
    this.paramIndex = new Map(Array.from(this.raw.parameters.ids, (id, i) => [id, i]));
    this.drawableIndex = new Map(model.internalModel.getDrawableIDs().map((id, i) => [id, i]));
    this.poseTimers = [];
    this.posing = null;

    // Expression files by name, and each clip's length for timing poses.
    const settings = model.internalModel.settings;
    const modelUrl = new URL(url, location.href);
    const fetchJson = async (file) => (await fetch(new URL(file, modelUrl))).json();
    this.expressionParams = new Map(await Promise.all((settings.expressions ?? []).map(async (e) => [e.Name, (await fetchJson(e.File)).Parameters])));
    this.durations = new Map(await Promise.all(Object.entries(settings.motions ?? {}).map(async ([group, [m]]) => [group, (await fetchJson(m.File)).Meta.Duration])));

    // Moods add their expressions' deltas after motions, blink and physics,
    // crossfading over `fade` seconds. The core restores its parameters
    // every frame, so the deltas never accumulate.
    this.current = new Map();
    this.from = new Map();
    this.fadeStart = 0;
    // The model's own lip-sync parameters (model3.json Groups "LipSync";
    // the plugin keeps the file as loaded in settings.json).
    const lipSync = (settings.json?.Groups ?? []).find((g) => g.Name === "LipSync")?.Ids ?? [];
    this.mouth = lipSync.map((id) => this.paramIndex.get(id)).filter((i) => i != null);
    this.talkStart = 0;
    this.talkUntil = 0;
    // Idle damping: the parameters the idle clip animates, scaled toward
    // rest before physics runs (so the hair calms with the head); breathing
    // after, since physics doesn't read it.
    this.idleParams = await this.animatedParams(settings, modelUrl, "Idle");
    this.idleUntil = 0; // a pose or its return owns the body until then
    this.breathIndex = this.paramIndex.get("ParamBreath");
    // The plugin's CubismBreath: its peaks as shipped, scaled by setSway.
    const sway = model.internalModel.breath?.getParameters();
    this.swayParams = sway ? Array.from({ length: sway.getSize() }, (_, i) => sway.at(i)) : [];
    this.swayPeaks = this.swayParams.map((p) => p.peak);
    this.setSway(this.rig.motion?.sway?.amount ?? 0);
    model.internalModel.on("afterMotionUpdate", () => this.dampIdle());
    model.internalModel.on("beforeModelUpdate", () => {
      this.dampBreath();
      this.applyMood();
      this.applyTalk();
    });
    this.setMood(this.moodName);
    this.startBreath();
  }

  // The game breathes on its own animation layer. m_breath writes every
  // parameter (mostly rest values) and would undo a held pose, so this
  // layer drives ParamBreath alone.
  async startBreath() {
    if (!this.durations.has("m_breath")) return;
    const ignore = [...this.paramIndex.keys()].filter((id) => id !== "ParamBreath");
    await this.model.parallelMotion([{ group: "m_breath", index: 0, priority: MotionPriority.IDLE, loop: true, ignoreParamIds: ignore }]);
  }

  /** Mood names come from rig.expressions.moods; unknown ones show "default". */
  setMood(name) {
    const moods = this.rig.expressions?.moods ?? {};
    const exprs = moods[name] ?? moods.default ?? [];
    this.moodName = moods[name] ? name : "default";
    const target = new Map();
    for (const expr of exprs) {
      for (const p of this.expressionParams.get(expr) ?? []) target.set(p.Id, (target.get(p.Id) ?? 0) + p.Value);
    }
    this.from = this.blended();
    this.current = target;
    this.fadeStart = performance.now();
  }

  /** The mood deltas on screen now, partway through any crossfade. */
  blended() {
    const fade = (this.rig.expressions?.fade ?? 0.2) * 1000;
    const k = fade > 0 ? Math.min(1, (performance.now() - this.fadeStart) / fade) : 1;
    const out = new Map();
    for (const id of new Set([...this.from.keys(), ...this.current.keys()])) {
      out.set(id, (this.from.get(id) ?? 0) * (1 - k) + (this.current.get(id) ?? 0) * k);
    }
    return out;
  }

  applyMood() {
    const { values, minimumValues, maximumValues } = this.raw.parameters;
    for (const [id, delta] of this.blended()) {
      const i = this.paramIndex.get(id);
      if (i == null || !delta) continue;
      values[i] = Math.min(maximumValues[i], Math.max(minimumValues[i], values[i] + delta));
    }
  }

  // --- idle damping ---------------------------------------------------------

  /** Core indices of the parameters a motion group's first clip changes. */
  async animatedParams(settings, modelUrl, group) {
    const file = settings.motions?.[group]?.[0]?.File;
    if (!file) return [];
    const clip = await (await fetch(new URL(file, modelUrl))).json();
    return clip.Curves
      .filter((c) => {
        const v = curveValues(c.Segments);
        return Math.max(...v) - Math.min(...v) > 1e-3;
      })
      .map((c) => this.paramIndex.get(c.Id))
      .filter((i) => i != null);
  }

  dampIdle() {
    const k = this.rig.motion?.idle?.amount ?? 1;
    if (k >= 1 || this.posing || performance.now() < this.idleUntil) return;
    const { values, defaultValues } = this.raw.parameters;
    for (const i of this.idleParams) values[i] = defaultValues[i] + (values[i] - defaultValues[i]) * k;
  }

  /** Scales the plugin's own sway: 0 off, 1 as the plugin ships it. */
  setSway(amount) {
    this.swayParams.forEach((p, i) => (p.peak = this.swayPeaks[i] * amount));
  }

  dampBreath() {
    const k = this.rig.motion?.breath?.amount ?? 1;
    if (k >= 1 || this.breathIndex == null) return;
    const { values, defaultValues } = this.raw.parameters;
    const i = this.breathIndex;
    values[i] = defaultValues[i] + (values[i] - defaultValues[i]) * k;
  }

  // --- talking --------------------------------------------------------------
  // Text-driven mouth flaps, no audio: the mouth opens and closes while a
  // line types out, over whatever the mood and motion set.

  /** Flaps the mouth for `seconds` (how long the line takes to type). */
  talk(seconds) {
    const now = performance.now() / 1000;
    if (now >= this.talkUntil) this.talkStart = now;
    this.talkUntil = now + seconds;
  }

  /** Stops flapping, e.g. when the player skips to the end of the line. */
  stopTalking() {
    this.talkUntil = Math.min(this.talkUntil, performance.now() / 1000);
  }

  get talking() {
    return performance.now() / 1000 < this.talkUntil + TALK_SETTLE;
  }

  applyTalk() {
    if (!this.mouth.length || !this.talking) return;
    const now = performance.now() / 1000;
    const t = now - this.talkStart;
    // Uneven syllables: two rates beating against each other, never quite
    // shut mid-line, then an ease to closed once the line is out.
    const flap = Math.abs(Math.sin(Math.PI * TALK_RATE * t)) * (0.65 + 0.35 * Math.sin(Math.PI * 1.3 * t + 1));
    const settle = now > this.talkUntil ? 1 - (now - this.talkUntil) / TALK_SETTLE : 1;
    const open = Math.max(0, Math.min(1, (0.1 + 0.9 * flap) * settle));
    const { values, maximumValues } = this.raw.parameters;
    for (const i of this.mouth) values[i] = Math.max(values[i], open * maximumValues[i]);
  }

  // --- poses ----------------------------------------------------------------
  // A pose plays like the game's Animator: its clip, then its looping
  // *_hold clip (its last frame) until left, then its *_return clip.
  // onFinish only fires for clips with sound, so hand-offs are timed from
  // each clip's own duration.

  /** Pose groups that have hold and return clips. */
  get poses() {
    return [...this.durations.keys()].filter((g) => this.durations.has(`${g}_hold`) && this.durations.has(`${g}_return`));
  }

  /** Plays pose `name`; with `hold` (seconds), returns from it by itself. */
  playPose(name, hold = null) {
    if (!this.poses.includes(name)) return false;
    this.clearPoseTimers();
    this.posing = name;
    this.model.motion(name, 0, MotionPriority.FORCE);
    const end = this.durations.get(name);
    this.later(end - 0.05, () => this.model.motion(`${name}_hold`, 0, MotionPriority.FORCE, { loop: true }));
    if (hold != null) this.later(end + hold, () => this.leavePose());
    return true;
  }

  leavePose() {
    if (!this.posing) return;
    this.clearPoseTimers();
    const ret = `${this.posing}_return`;
    this.model.motion(ret, 0, MotionPriority.FORCE);
    this.idleUntil = performance.now() + (this.durations.get(ret) ?? 0) * 1000;
    this.posing = null;
  }

  /** Plays the pose rig.json `reactionPoses` gives reaction `name`, if any. */
  reactPose(name) {
    const pose = this.rig.reactionPoses?.[name];
    if (pose && this.posing !== pose) this.playPose(pose, POSE_HOLD);
  }

  later(seconds, fn) {
    this.poseTimers.push(setTimeout(fn, seconds * 1000));
  }

  clearPoseTimers() {
    this.poseTimers.forEach(clearTimeout);
    this.poseTimers = [];
  }

  // --- what Hangout and the scene call --------------------------------------

  /**
   * A reference-space point (the model's canvas px) in part `id`'s
   * normalized bounds: the combined bounds of its visible drawables, so a
   * hotspot follows the art through poses. null if none is visible.
   */
  partUV(id, [x, y]) {
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    const opacities = this.raw.drawables.opacities;
    for (const drawable of this.rig.parts?.[id] ?? []) {
      const i = this.drawableIndex.get(drawable);
      if (i == null || opacities[i] < 0.5) continue;
      const b = this.model.internalModel.getDrawableBounds(i);
      x0 = Math.min(x0, b.x);
      y0 = Math.min(y0, b.y);
      x1 = Math.max(x1, b.x + b.width);
      y1 = Math.max(y1, b.y + b.height);
    }
    if (x0 === Infinity) return null;
    return [(x - x0) / (x1 - x0), (y - y0) / (y1 - y0)];
  }

  // The model has no hand art to swap and animates itself each tick.
  setHandPose() {}
  update() {}
  follow() {}
}

/** Every value a motion3 curve passes through (points and bezier handles). */
function curveValues(s) {
  const out = [s[1]];
  for (let i = 2; i < s.length; ) {
    const type = s[i];
    const n = type === 1 ? 6 : 2;
    for (let k = 2; k <= n; k += 2) out.push(s[i + k]);
    i += 1 + n;
  }
  return out;
}

/** Stands in for rig/motion.js Motion: the model blinks and idles itself. */
export class Live2DMotion {
  constructor() {
    this.enabled = {};
    this.nextBlinkAt = null;
  }

  twitch() {}

  blinking() {
    return false;
  }

  pose() {
    return {};
  }
}
