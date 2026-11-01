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
//   reactionPoses          reaction -> Live2D pose group it also plays, or
//                          { byTier: { <tier>: group } } (nearest lower tier);
//                          `guarded` is the pose he holds once locked out
//                          (Hangout LOCKOUT_TIERS), else m_udekumi, else
//                          the tier's upset pose
//   motion.idle.amount     how much of the idle clip's sway to keep (0-1)
//   motion.breath.amount   how much of the breathing to keep (0-1)
//   motion.sway.amount     the plugin's own head/body sway (CubismBreath),
//                          which the game doesn't use: 0 (off) unless set
// The model breathes, blinks and runs physics itself, so the sprite rig's
// pose map and blink timing are ignored here.

import { Container } from "pixi.js";
import { Live2DModel, MotionPriority } from "untitled-pixi-live2d-engine/cubism";

import { forTier } from "../hangout/reactions.js";
import { buildModelManifest, manifestPath } from "./manifest.js";
import { validateLive2DRig } from "./validate.js";

// Seconds a reaction's pose holds before its return clip plays.
const POSE_HOLD = 2.5;

// Mouth flaps while a line types: syllables per second, and the seconds
// the mouth takes to settle shut after the last one.
const TALK_RATE = 7;
const TALK_SETTLE = 0.12;

// A mood that grits the teeth (ParamMouthForm2 up, e.g. e_shinken_00) draws
// a mouth the lip sync can't open. He holds the clench for CLENCH_LEAD
// seconds into a line, then the mood lets go of the mouth over
// CLENCH_RELEASE seconds and he talks; the mouth stays released until the
// mood changes. A clench that also bares the teeth (ParamTooth01, e.g. Leo's
// e_fukigen_02) lets go of them too, or they cover the flapping mouth;
// grins that show teeth without clenching keep them while talking.
const CLENCH_PARAM = "ParamMouthForm2";
const CLENCH_TEETH = "ParamTooth01";
const CLENCH_LEAD = 0.5;
const CLENCH_RELEASE = 0.15;

// A touch's flinch (reactions.js `twitch`): the head and body pull away
// from the touched side and the shoulders hitch, then ease back, over
// whatever the mood and pose set. Shared by every rig, like the sprite
// rig's twitch. Sizes are at twitch 1: head/body tilts in the parameter's
// own units (degrees), shoulders as a share of their range. `peak` is the
// seconds to the peak; it settles by ~6 peaks.
const FLINCH = { peak: 0.14, head: 5, body: 2.5, recoil: 3, shoulders: 0.5 };

/**
 * Fetches `${baseUrl}/rig.json` and its sounds. The dev server also checks
 * the rig against its files (validate.js); a build skips that, since the
 * tests check every rig on disk and the check costs a request per file.
 */
export async function loadLive2DRig(baseUrl) {
  const res = await fetch(`${baseUrl}/rig.json`);
  if (!res.ok) throw new Error(`rig.json: HTTP ${res.status} at ${baseUrl}`);
  const rig = await res.json();
  const sounds = new Map();
  await Promise.all([...new Set(Object.values(rig.sounds ?? {}).flat())].map(async (file) => {
    const r = await fetch(`${baseUrl}/${file}`);
    if (r.ok) sounds.set(file, await r.arrayBuffer());
  }));
  if (!import.meta.env?.DEV) return { rig, sounds, baseUrl };
  // No mocIds: the .moc3 isn't fetched until the model loads.
  const warnings = await validateLive2DRig(rig, {
    readJson: async (file) => {
      const r = await fetch(`${baseUrl}/${file}`);
      return r.ok ? r.json() : null;
    },
    fileExists: (file) => sounds.has(file) || fetch(`${baseUrl}/${file}`, { method: "HEAD" }).then((r) => r.ok, () => false),
  });
  for (const w of warnings) console.warn(`[hangout-v2] ${rig.character}: ${w}`);
  return { rig, sounds, baseUrl };
}

/**
 * The model's manifest (manifest.js), fetched beside its model3.json; built
 * from the expression and motion files if it's missing, with a warning.
 */
async function loadManifest(modelUrl, model3) {
  const base = new URL(modelUrl, location.href);
  const res = await fetch(new URL(manifestPath(base.pathname.split("/").pop()), base)).catch(() => null);
  if (res?.ok) return res.json();
  console.warn(`[hangout-v2] no manifest beside ${base.pathname}; run node activity/tools/live2d-manifest.js`);
  return buildModelManifest(model3, async (file) => (await fetch(new URL(file, base))).json());
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
    // A looping clip (the idle, a pose's hold) restarts its fade-in on every
    // loop by default, blending in from the rest pose for a moment, so
    // anything it holds away from rest flicks each loop (Zenji's arms every
    // 3s). The idle is preloaded; the rest load as they're played.
    const motions = model.internalModel.motionManager;
    motions.on("motionLoaded", (group, index, motion) => motion.setLoopFadeIn(false));
    (await motions.loadMotion(motions.groups.idle, 0))?.setLoopFadeIn(false);
    this.paramIndex = new Map(Array.from(this.raw.parameters.ids, (id, i) => [id, i]));
    this.drawableIndex = new Map(model.internalModel.getDrawableIDs().map((id, i) => [id, i]));
    this.poseTimers = [];
    this.posing = null;

    // Expression deltas by name, and each clip's length for timing poses.
    const settings = model.internalModel.settings;
    const manifest = await loadManifest(url, settings.json);
    this.expressionParams = new Map(Object.entries(manifest.expressions));
    this.durations = new Map(Object.entries(manifest.durations));

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
    // The mood deltas talking releases: the clench and the lip-sync
    // parameters (a shout's open mouth would pin them open).
    this.mouthHold = [CLENCH_PARAM, ...lipSync].filter((id) => this.paramIndex.has(id));
    this.releaseAt = null;
    // Idle damping: the parameters the idle clip animates, scaled toward
    // rest before physics runs (so the hair calms with the head); breathing
    // after, since physics doesn't read it.
    this.idleParams = manifest.idleParams.map((id) => this.paramIndex.get(id)).filter((i) => i != null);
    this.idleUntil = 0; // a pose or its return owns the body until then
    this.breathIndex = this.paramIndex.get("ParamBreath");
    // The plugin's CubismBreath: its peaks as shipped, scaled by setSway.
    const sway = model.internalModel.breath?.getParameters();
    this.swayParams = sway ? Array.from({ length: sway.getSize() }, (_, i) => sway.at(i)) : [];
    this.swayPeaks = this.swayParams.map((p) => p.peak);
    this.setSway(this.rig.motion?.sway?.amount ?? 0);
    // The plugin only blinks on frames where no motion plays, and the idle
    // and breath layers always play, so the rig blinks the model itself,
    // after the core saves its parameters (no clip writes the eyes, so
    // scaling them any earlier would compound frame to frame).
    this.eyeBlink = model.internalModel.eyeBlink;
    model.internalModel.eyeBlink = undefined;
    this.blinkIds = (settings.getEyeBlinkParameters?.() ?? []).map((id) => this.paramIndex.get(id)).filter((i) => i != null);
    this.lastBlinkAt = performance.now();
    model.internalModel.on("afterMotionUpdate", () => this.dampIdle());
    model.internalModel.on("beforeModelUpdate", () => {
      this.dampBreath();
      this.blink();
      this.applyMood();
      this.applyFlinch();
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
    this.moodName = moods[name] ? name : "default";
    this.setExpressions(moods[name] ?? moods.default ?? []);
  }

  /** Stacks the model's expressions by name, outside any mood (the preview). */
  setExpressions(exprs) {
    const target = new Map();
    for (const expr of exprs) {
      for (const p of this.expressionParams.get(expr) ?? []) target.set(p.Id, (target.get(p.Id) ?? 0) + p.Value);
    }
    this.from = this.blended();
    this.current = target;
    this.fadeStart = performance.now();
    // A new mood holds its mouth until the next line; mid-line, it lets go
    // as soon as the line's flaps start.
    const now = performance.now() / 1000;
    this.releaseAt = now < this.talkUntil + TALK_SETTLE ? Math.max(now, this.talkStart) : null;
  }

  /** Whether the mood on screen grits the teeth (see CLENCH_LEAD). */
  get clenched() {
    return (this.current.get(CLENCH_PARAM) ?? 0) > 0;
  }

  /** How far talking has released the mood's mouth (0 held, 1 let go). */
  mouthRelease() {
    if (this.releaseAt == null) return 0;
    return Math.max(0, Math.min(1, (performance.now() / 1000 - this.releaseAt) / CLENCH_RELEASE));
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
    const keep = 1 - this.mouthRelease();
    for (const [id, full] of this.blended()) {
      const i = this.paramIndex.get(id);
      const held = this.mouthHold.includes(id) || (id === CLENCH_TEETH && this.clenched);
      const delta = held ? full * keep : full;
      if (i == null || !delta) continue;
      values[i] = Math.min(maximumValues[i], Math.max(minimumValues[i], values[i] + delta));
    }
  }

  // --- idle damping ---------------------------------------------------------

  dampIdle() {
    const k = this.rig.motion?.idle?.amount ?? 1;
    if (k >= 1 || this.posing || performance.now() < this.idleUntil) return;
    const { values, defaultValues } = this.raw.parameters;
    for (const i of this.idleParams) values[i] = defaultValues[i] + (values[i] - defaultValues[i]) * k;
  }

  // Scales the eyes by the blink's openness (0 shut, 1 open) instead of
  // setting them, so a pose or clip that narrows the eyes keeps doing so.
  blink() {
    const now = performance.now();
    const dt = (now - this.lastBlinkAt) / 1000;
    this.lastBlinkAt = now;
    if (!this.eyeBlink || !this.blinkIds.length) return;
    let open = 1;
    this.eyeBlink.updateParameters({ setParameterValueById: (_, v) => (open = v) }, dt);
    const { values } = this.raw.parameters;
    for (const i of this.blinkIds) values[i] *= open;
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

  // --- flinch ---------------------------------------------------------------

  /** Flinches from a touch: `side` "l"/"r" for a side spot, else null. */
  flinch(side, scale = 1) {
    this.flinchState = { at: performance.now() / 1000, side, scale };
  }

  applyFlinch() {
    const f = this.flinchState;
    if (!f || !this.model) return;
    const x = (performance.now() / 1000 - f.at) / FLINCH.peak;
    if (x > 6) {
      this.flinchState = null;
      return;
    }
    // Same curve as rig/motion.js twitchPulse: 0, up to 1 at the peak, back.
    const pulse = f.scale * x * x * Math.exp(2 * (1 - x));
    const away = f.side === "l" ? 1 : f.side === "r" ? -1 : 0;
    const { values, minimumValues, maximumValues } = this.raw.parameters;
    const add = (id, delta) => {
      const i = this.paramIndex.get(id);
      if (i != null) values[i] = Math.min(maximumValues[i], Math.max(minimumValues[i], values[i] + delta));
    };
    add("ParamAngleZ", away * FLINCH.head * pulse);
    add("ParamBodyAngleZ", away * FLINCH.body * pulse);
    add("ParamBodyAngleY", -FLINCH.recoil * pulse);
    for (const s of f.side ? [f.side] : ["l", "r"]) {
      const i = this.paramIndex.get(s === "l" ? "ParamShoulderL" : "ParamShoulderR");
      if (i != null) add(s === "l" ? "ParamShoulderL" : "ParamShoulderR", FLINCH.shoulders * maximumValues[i] * pulse);
    }
  }

  // --- talking --------------------------------------------------------------
  // Text-driven mouth flaps, no audio: the mouth opens and closes while a
  // line types out, over whatever the mood and motion set.

  /**
   * Flaps the mouth for `seconds` (how long the line takes to type). A
   * clenched mood holds first (CLENCH_LEAD), so the flaps start that late.
   */
  talk(seconds) {
    const now = performance.now() / 1000;
    if (now >= this.talkUntil + TALK_SETTLE) {
      this.talkStart = now + (this.clenched && this.releaseAt == null ? CLENCH_LEAD : 0);
      this.releaseAt ??= this.talkStart;
    }
    this.talkUntil = now + seconds;
  }

  /** Stops flapping, e.g. when the player skips to the end of the line. */
  stopTalking() {
    this.talkUntil = Math.min(this.talkUntil, performance.now() / 1000);
  }

  get talking() {
    const now = performance.now() / 1000;
    return now >= this.talkStart && now < this.talkUntil + TALK_SETTLE;
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
    this.returnTimer = hold != null ? this.later(end + hold, () => this.leavePose()) : null;
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

  /** Plays the pose rig.json `reactionPoses` gives reaction `name` at `tier`, if any. */
  reactPose(name, tier) {
    const pose = forTier(this.rig.reactionPoses?.[name], tier);
    if (pose && this.posing !== pose) this.playPose(pose, POSE_HOLD);
  }

  /** Holds the guarded pose with no return: he's locked out (Hangout LOCKOUT_TIERS). */
  guard(tier) {
    const pose = this.guardedPose(tier);
    if (!pose) return;
    if (this.posing === pose) this.keepPose(); // still in it from the upset: just stay
    else this.playPose(pose);
  }

  /**
   * Called as the lockout starts: if the upset left him in the guarded pose,
   * he keeps holding it instead of returning and playing it again.
   */
  lockPose(tier) {
    if (this.posing && this.posing === this.guardedPose(tier)) this.keepPose();
  }

  /** rig.json reactionPoses.guarded, else m_udekumi, else the tier's upset pose. */
  guardedPose(tier) {
    const poses = this.rig.reactionPoses ?? {};
    return [forTier(poses.guarded, tier), "m_udekumi", forTier(poses.upset, tier)].find((p) => p && this.poses.includes(p)) ?? null;
  }

  /** Cancels the current pose's return, so it holds (its hold loop still starts). */
  keepPose() {
    clearTimeout(this.returnTimer);
    this.returnTimer = null;
  }

  /** Leaves the guarded pose (the tier changed). */
  unguard() {
    this.leavePose();
  }

  later(seconds, fn) {
    const id = setTimeout(fn, seconds * 1000);
    this.poseTimers.push(id);
    return id;
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

/** Stands in for rig/motion.js Motion: the model blinks and idles itself. */
export class Live2DMotion {
  /** `renderer` is the Live2DRig a reaction's twitch flinches. */
  constructor(renderer) {
    this.renderer = renderer;
    this.enabled = {};
    this.nextBlinkAt = null;
  }

  /** One side ("l"/"r") flinches away from it; both arms is a center spot. */
  twitch(sides, t, scale = 1) {
    this.renderer?.flinch(sides.length === 1 ? sides[0] : null, scale);
  }

  blinking() {
    return false;
  }

  pose() {
    return {};
  }
}
