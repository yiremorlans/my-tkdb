// Hangout: the Live2D model the Hangout class (hangout/hangout.js) drives.
// The rig is assets/live2d/<character>/rig.json: the keys Hangout and
// reactions.js read (character, annoyance, hotspots, expressions.moods,
// sounds, bones.arms), plus
//   outfits.<name>.model   the outfit's model3.json (converted from the game)
//   parts.<id>             Live2D drawable ids a hotspot's `part` names; its
//                          rect is in their combined bounds, as they move
//   expressions.moods      mood -> Live2D expressions stacked to draw it
//                          (smile_blush: smile + blush); outfits.<name>.
//                          expressions.moods adds moods only that outfit's
//                          model can draw. `tease` (optional) is his face
//                          while a tease hold runs (preview.js)
//   reactionPoses          reaction -> Live2D pose group it also plays, or
//                          { byTier: { <tier>: group } } (nearest lower tier);
//                          `guarded` is the pose he holds once locked out
//                          (Hangout LOCKOUT_TIERS), else m_udekumi, else
//                          the tier's upset pose. outfits.<name>.
//                          reactionPoses overrides keys for that outfit
//                          (a pose only its model has: Jo's m_hairtouch)
//   motion.idle.amount     how much of the idle clip's sway to keep (0-1)
//   motion.breath.amount   how much of the breathing to keep (0-1)
//   motion.sway.amount     the plugin's own head/body sway (CubismBreath),
//                          which the game doesn't use: 0 (off) unless set
//   heartRate              { resting, scale }: the heart monitor's resting
//                          bpm and how far holds raise it (PULSE)
//   crest                  { params: { id: value } } held while a tease
//                          crest is up (CREST_PARAMS; Lyca's ears)
//   holdGaze               "steady" (default) or "shy": during a hold, a shy
//                          gaze breaks eye contact now and then (SHY_GAZE)
//   partBlush              { parts?, color? }: tints those parts' drawables
//                          (default the ears, ear_r + ear_l) toward `color`
//                          (RGB 0-1, multiplied; default PART_BLUSH.color)
//                          as far as the face blushes (ParamCheek over its
//                          max), so the ears redden with a model that only
//                          blushes the cheeks. `{}` turns on the defaults
// The model breathes, blinks and runs physics itself.

import { Container } from "pixi.js";
import { Live2DModel, MotionPriority } from "untitled-pixi-live2d-engine/cubism";

import { TYPE_MS, typeSchedule } from "../hangout/hangout.js";
import { forTier } from "../hangout/reactions.js";
import { buildModelManifest, manifestPath } from "./manifest.js";
import { validateLive2DRig } from "./validate.js";

// Seconds a reaction's pose holds before its return clip plays.
const POSE_HOLD = 2.5;
// Seconds idle damping takes to ease in once a return lands, and out as a pose starts.
const IDLE_DAMP_IN = 0.8;
const IDLE_DAMP_OUT = 0.15;

// The mouth follows the line as it types (typeSchedule): each character
// sets how far it wants open (open vowels wide, i/u narrow, m/b/p shut,
// shut through the rests at sentence and clause breaks), and the mouth
// eases toward it, faster opening than closing. TALK_SETTLE is the seconds
// it takes to settle shut after the last character.
const TALK_SETTLE = 0.12;
const TALK_OPEN_TAU = 0.035;
const TALK_CLOSE_TAU = 0.055;
function mouthShape(c) {
  if (/[aoáàâäåóòôö]/i.test(c)) return 1;
  if (/[eéèêë]/i.test(c)) return 0.75;
  if (/[iuyíìîïúùûü]/i.test(c)) return 0.5;
  if (/[mbp]/i.test(c)) return 0.05;
  if (/\p{L}|\d/u.test(c)) return 0.3;
  if (c === " ") return 0.12;
  return 0;
}
// Words vary a little in emphasis, so lines don't flap at one height.
function wordGain(line, i) {
  const n = (line.slice(0, i).match(/\s+/g)?.length ?? 0) + line.length;
  return 0.8 + 0.2 * Math.abs(Math.sin(n * 12.9898) * 43758.5453 % 1);
}

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

// A shy "not right now" (shakeHead; the preview's caught tease): `turns`
// slow side-to-side turns of the head (ParamAngleX, `angle` degrees,
// fading as they go; the body follows by `body` of that, 0 so it's just
// the head), each `period`
// seconds, with the chin dipped by `chin` degrees while his eyes stay on
// yours (EyeBall pulled to center: no glancing down mid-shake, and any
// glance from the hold is overridden). The dip and eye contact come in over
// `in` seconds, hold through the shake and ease back over `settle`. Shared by every rig,
// like the flinch: only Towa's model has a head-shake clip of its own.
// A small gasp (gasp(); the caught tease): the lips part to `open` of the
// mouth's range with a hint of surprise, the brows up by `brow` and the
// eyes a touch wider (`eyes` more of their range), over `in` seconds,
// held `hold`, then eased shut over `out`. Talking owns the mouth, so a
// line said after it flaps over whatever is left.
const GASP = { open: 0.35, brow: 0.35, eyes: 0.12, in: 0.12, hold: 0.3, out: 0.55 };
// A brief widen (widen(); the lip and hand holds): the gasp's eyes and a
// touch of its brows, no parted lips, on its own slower timing so it reads
// as a moment's subtle surprise that settles back to his normal eyes.
// Shared by every rig. (Restored 2026-11-03 from 80aaa9a; the eyes-only
// `eyesAdd` version lost the surprise.)
const WIDEN = { brow: 0.15, eyes: 0.1, in: 0.18, hold: 0.35, out: 0.7, catch: true };
// The widen's catch (CATCH; widen() only, not the gasp): he goes still.
// His idle sway and breath hold where they were (`still` of the way, in
// over `in` seconds, held with the widen and let go over its `out`), then
// the breath he was holding goes out: ParamBreath dips toward its bottom by
// `exhale` of the range, peaking `exhaleAt` seconds after the widen starts
// to ease and gone `exhaleFor` later; and one ordinary blink (`blinkClose`
// shut, `blinkOpen` open again) at `blinkAt` of the way through the ease
// back. With the widen itself, the head draws back: chin up `chin` degrees
// (ParamAngleY), no body or shoulders (a shoulder lift read as too much
// and added nothing; a body pull-back and lean-in didn't look good; both
// cut 2026-11-04), on the widen's own timing. The flutter's half
// widen (scale < 1) keeps the stillness, chin and exhale at its scale but
// skips the blink.
const CATCH = { still: 0.9, in: 0.12, chin: 4, exhale: 0.35, exhaleAt: 0.35, exhaleFor: 1.1, blinkAt: 0.45, blinkClose: 0.08, blinkOpen: 0.14 };

const HEAD_SHAKE = { turns: 2, period: 0.6, angle: 7, body: 0, chin: 5, in: 0.25, settle: 0.8 };

// partBlush defaults: which parts redden, and the tint at a full blush.
const PART_BLUSH = { parts: ["ear_r", "ear_l"], color: [1, 0.62, 0.62] };

// Warmth (§12.7, prototype): the resting blush at full warmth, as a share of
// ParamCheek, and how much faster he breathes at full warmth.
// `curve` bends warmth's blush (warmth ^ curve) so a little warmth already
// shows: the blush art is too soft to see below about a third.
const WARMTH = { blush: 1, curve: 0.6, breathRate: 1.4 };

// Past the blush cap (§12.7 prototype): warmth the cheeks can't show any
// more deepens the blush patch itself (the drawables ParamCheek fades in,
// found at load) toward DEEP.patch, and the ears (partBlush) by the same
// factor on top of their full-blush tint, so the two stay one flush. `span`
// is the overflow (in ParamCheek units over its max) at their deepest.
const DEEP = { patch: [0.88, 0.62, 0.66], span: 0.6 };

// Most models draw one blush, faded in over ParamCheek's whole range; Ren's
// draws a normal blush halfway (0.5, his e_sekimen1_00) and a heavy one at
// the top (e_sekimen2_00). Warmth, holds and the crest are tuned to the one
// drawing, so they scale by the lowest nonzero ParamCheek keyform (1 on most
// models, 0.5 on his): a full flush lands on his normal blush, and the heavy
// one is left to his own faces and the very top of a tease.
export function blushUnit(parameters, cheek) {
  const keys = cheek == null ? null : parameters.keyValues?.[cheek];
  const max = cheek == null ? 1 : parameters.maximumValues[cheek] || 1;
  const first = keys ? Math.min(...Array.from(keys).filter((k) => k > 0)) : Infinity;
  return Number.isFinite(first) ? first / max : 1;
}

// A blush comes in as fast as its cause (a mood's e_sekimen_00, warmth, a
// hold, a crest) but never drops off with it: whenever what's on his cheeks
// is above where they'd be now, it dilutes toward there, losing a share of
// the difference every moment (exponential, time constant `tau` seconds:
// about two-thirds gone after tau, nearly all after 3 tau). So a reaction
// face ending, or a hold let go, leaves a flush that fades out slowly
// instead of the mood's 0.2s crossfade. The ears (partBlush) and the deep
// patch follow it, as they follow ParamCheek.
const BLUSH_FADE = { tau: 4 };

// Holds (prototype). A hold builds one level from 0 to 1 over `build`
// seconds and lets it fall over `release` seconds once let go. Each effect
// comes in over its own band of that level (`bands`, smoothstepped), scaled
// by the hold's weight for it (setHold); let go, every effect falls
// together from where it was (applyWarmth):
//   look       the hold look (HOLD_LOOK); first, so his eyes lead
//   blush      added to ParamCheek on top of warmth (overflow deepens it);
//              it falls with the level, leaving warmth's blush behind
//   heartbeat  breathing quickens up to HOLD.breathRate x, and his pulse
//              (heartRate) climbs
//   glance     just the glance at the touch (HOLD_LOOK glance*), then his
//              eyes go back to his mood's: no lowered lids or upward look
//   pulse      the heartbeat check: nothing shows on him (he keeps his
//              breathing even and acts cool); the monitor reads his pulse
//              (PULSE) as it already is, nudged up a little by the hand
//   lips       last, near the top: the lips part with each breath, up to
//              HOLD.lips of the mouth's range (wider with warmth), never
//              while he talks, relaxing a smile to HOLD.smile so the gap
//              shows
//   bliss      tease only, past the top of a long hold: his brows give way
//              (BLISS) and his eyes flutter shut now and then
const HOLD = {
  breathRate: 1.6,
  lips: 0.6,
  smile: 0.2,
  build: 8,
  // Seconds a mid-hold change of weights (the check sliding into tease)
  // crossfades over, instead of switching in one frame.
  blend: 2,
  // Effects that crossfade slower than `blend`: when a check turns into
  // tease, the heavy lids come in first and the panting (quicker breath,
  // parted lips) and bliss build after them, gradually.
  blendSlow: { heartbeat: 4.5, lips: 4.5, bliss: 4.5 },
  release: 4,
  bands: { look: [0, 0.3], glance: [0, 0.05], blush: [0, 0.7], pulse: [0, 0.4], heartbeat: [0.3, 1], lips: [0.8, 1], bliss: [0.85, 1] },
};

// Tease's bliss at full strength: the brows give way (ParamBrow*Form toward
// the soft, lifted-inner shape e_komari_00 uses, the brows themselves up a
// little by `browUp`), the lids grow heavy by `lids`, and every `every`
// seconds (a random span) the eyes fall shut for `blink` seconds, slower
// than a blink, before they open again.
const BLISS = { browForm: -0.8, browUp: 0.3, lids: 0.25, blink: [0.5, 0.8], every: [1.4, 3] };
// rig.json `bliss: { browForm, browUp }` overrides the brows for a
// character who doesn't go soft (Edward keeps his sharp, knowing brows).

// Tease's crest (setCrest, 0-1; the preview drives it): it's too much. His
// breath catches (breathing slows by up to `catch`), the blush climbs past
// its cap by `blush` (ParamCheek units, so the ears and patch deepen) and
// his eyes squeeze shut; his pulse climbs by `bpm`.
const CREST = { catch: 0.85, blush: 0.6, bpm: 25 };
// Bliss's rise (setRise, 0-1; holds.js drives it, preview only): it builds
// in him. Breath quicker by `breath`, lips parted wider by `lips`, lids
// heavier (bliss's `lids` toward RISE.lids) and the flutter coming `flutter`
// times as often, chin up `chin` and head tilted `tilt` degrees (leaning
// into it), his pulse up `bpm` more.
const RISE = { breath: 0.7, lips: 0.7, lids: 0.6, flutter: 2.5, chin: 7, tilt: 5, bpm: 14 };
// Bliss's peak (setRoll, 0-1; holds.js drives it): his eyes roll back under
// heavy lids. The irises go up to `up` (EyeBall units) and in to the
// middle, the lids close by `lids`, the brows lift by `brow`, and the
// flutter stops: the eyes hold there until the crest's squeeze shuts them.
const ROLL = { up: 0.9, lids: 0.45, brow: 0.25 };
// Bliss's eye contact (holds.js plead): while he talks, his heavy lids lift
// by `lids` of their weight and the flutter holds off, so he meets your eyes
// as he gets the words out; between lines they fall heavy again. Eased in
// over `in` seconds, out over `out`.
const CONTACT = { lids: 0.7, in: 0.25, out: 0.6 };
// rig.json `crest: { params: { <id>: value } }` sets parameters while a
// crest is up (Lyca's wolf ears pop out: ParamBeastEarOnoff 1). Set over
// the clips, before motion.ease, so an eased parameter pops at its own
// rate. On once the crest passes `on`, off again once it falls below `off`
// (through the break's slow comedown), so it doesn't flicker at the edge.
const CREST_PARAMS = { on: 0.8, off: 0.3 };

// The heart monitor's pulse (heartRate): how riled up he is right now,
// running all the time, so checking it shows that number at once. At
// rest he's at `resting` (fit young men, below the textbook 72); warmth
// (from taps, strokes, answers, tease) raises it by up to `warmth` bpm, a
// hand on his chest (the check, tease) nudges it up by `held` as the hold
// comes in, and a crest adds CREST.bpm. It lags its
// target like a real pulse, rising over about `rise` seconds and settling
// over `settle`. rig.json `heartRate: { resting, scale }` overrides it for
// a character (Zenji, a ghost, and Edward, a vampire, run very slow);
// `scale` multiplies the rise.
const PULSE = { resting: 60, warmth: 50, held: 6, rise: 1.5, settle: 5, sway: 3 };
// `sway`: the beat quickens by up to that many bpm as he breathes in and
// slows as he breathes out (heartRate; the breathing's own phase), so the
// beats bunch on the inhale like a real heart's. The monitor's number shows
// the steady pulse (pulseBpm) under it. `scale` shrinks it too.

// The hold look at full strength: eyes to the viewer (EyeBall toward 0,
// lifted by `lookUp` so he looks up through his lashes, any crescent smile
// undone), lids lowered by `lids`, chin dipped by `chin` degrees. When a
// hold starts he first glances at where he's touched (setHold `glance`, in
// EyeBall units) for `glanceHold` seconds, then lifts his eyes to yours
// over `glanceLift` seconds; his eyes follow faster than the rest of the
// look builds (`eyes` x its weight). The glance eases down over
// `glanceIn` seconds (a one-frame snap read as the irises jumping) and the
// head dips with it, up to `glanceChin` degrees for a glance straight down,
// so the eyes don't do all the travel; the dip lifts with the eyes.
export const HOLD_LOOK = {
  lookUp: 0.4,
  lids: 0.15,
  chin: 5,
  glanceIn: 0.35,
  glanceHold: 1.1,
  glanceLift: 1.1,
  // The heartbeat check's glance alone (setHold `peek`, no hold look)
  // is a quick look down: shorter in, held only briefly, and back up to
  // your eyes fast.
  peekIn: 0.25,
  peekHold: 0.6,
  peekLift: 0.4,
  glanceChin: 6,
  eyes: 1.6,
  // A repeat glance (setHold glanceEvery) goes straight down, not to the touch.
  glanceDown: [0, -0.7],
};

// rig.json `holdGaze`: "steady" (default) holds your eyes; "shy" breaks
// contact now and then, glancing aside and down (`to`) for `away` seconds
// every `every` seconds (a random span), his head turning a little with it
// (`turn` degrees aside, `dip` down). The glance moves on a critically
// damped spring (`settle`: seconds to about settle), so it eases out and
// in however it's cut short, never snapping. None starts while he's
// glancing at the touch or down (HOLD_LOOK glance), or within `gap`
// seconds after one, so the two never collide.
const SHY_GAZE = { to: [0.65, -0.35], away: [1, 1.7], every: [3, 5.5], settle: 0.55, turn: 5, dip: 2, gap: 1 };

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
    // An outfit's own moods (expressions only its model has: Haru's casual
    // open eyes) are added to the shared ones, never replacing the set.
    expressions: { ...shared.expressions, moods: { ...shared.expressions?.moods, ...outfit.expressions?.moods } },
    // Likewise an outfit's own poses override only the keys it names.
    reactionPoses: { ...shared.reactionPoses, ...outfit.reactionPoses },
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
    this.blushUnit = blushUnit(this.raw.parameters, this.paramIndex.get("ParamCheek"));
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
    this.talkLine = "";
    this.talkAt = [];
    this.talkLineStart = 0;
    this.talkOpen = 0;
    this.talkLast = 0;
    // The mood deltas talking releases: the clench and the lip-sync
    // parameters (a shout's open mouth would pin them open).
    this.mouthHold = [CLENCH_PARAM, ...lipSync].filter((id) => this.paramIndex.has(id));
    this.releaseAt = null;
    // Idle damping: the parameters the idle clip animates, scaled toward
    // rest before physics runs (so the hair calms with the head); breathing
    // after, since physics doesn't read it.
    this.idleParams = manifest.idleParams.map((id) => this.paramIndex.get(id)).filter((i) => i != null);
    this.idleUntil = 0; // a pose or its return owns the body until then
    // How much of the damping applies (0..1). It eases in as a pose's
    // return lands and out as a pose starts: switched in one frame, it
    // stepped the idle's arms toward rest (Tohma's flinched after every pose).
    this.dampWeight = 1;
    this.dampAt = performance.now();
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
    // Parameters rig.json motion.ease slows: { id: seconds } for a full
    // min-to-max change. The clips switch them in one 0.1s fade (Lyca's
    // ears pop out with ParamBeastEarOnoff); this ramps toward whatever the
    // motions want, before physics so the ears still bounce as they rise.
    this.eased = Object.entries(this.rig.motion?.ease ?? {})
      .map(([id, seconds]) => ({ i: this.paramIndex.get(id), seconds, value: null }))
      .filter((p) => p.i != null && p.seconds > 0);
    this.easeAt = performance.now();
    model.internalModel.on("afterMotionUpdate", () => {
      this.dampIdle();
      this.applyCatchIdle();
      this.applyCrestParams();
      this.applyEase();
    });
    model.internalModel.on("beforeModelUpdate", () => {
      this.dampBreath();
      this.blink();
      this.applyMood();
      this.applyWarmth();
      this.applyPartBlush();
      this.applyLips();
      this.applyFlinch();
      this.applyShake();
      this.applyGasp();
      this.applyTalk();
      this.applyHiddenParts();
    });
    this.setupPartBlush();
    this.setMood(this.moodName);
    this.startBreath();
    this.preloadPoses(motions);
  }

  // Clips otherwise load the first time they play, and playPose times the
  // hand-off to *_hold from the call, so a cold fetch (first visit, or
  // after a deploy changes the asset URLs) cut the pose short and snapped
  // it. Every pose rig.json reactionPoses names, at any tier, and the
  // guarded fallback, load in the background once the model is up. A
  // destroyed manager (the outfit changed) just stops loading.
  preloadPoses(motions) {
    const named = Object.values(this.rig.reactionPoses ?? {}).flatMap((p) => (typeof p === "string" ? [p] : Object.values(p?.byTier ?? {})));
    const poses = new Set([...named, "m_udekumi"].filter((p) => this.poses.includes(p)));
    for (const pose of poses) {
      for (const group of [pose, `${pose}_hold`, `${pose}_return`]) {
        motions.loadMotion(group, 0).catch(() => {});
      }
    }
  }

  // The game breathes on its own animation layer. m_breath writes every
  // parameter (mostly rest values) and would undo a held pose, so this
  // layer drives ParamBreath alone.
  async startBreath() {
    if (!this.durations.has("m_breath")) return;
    const ignore = [...this.paramIndex.keys()].filter((id) => id !== "ParamBreath");
    await this.model.parallelMotion([{ group: "m_breath", index: 0, priority: MotionPriority.IDLE, loop: true, ignoreParamIds: ignore }]);
  }

  /**
   * Mood names come from rig.expressions.moods; unknown ones show "default".
   * `fade` (seconds) overrides expressions.fade for this change (a
   * reaction's fadeOut).
   */
  setMood(name, fade) {
    const moods = this.rig.expressions?.moods ?? {};
    this.moodName = moods[name] ? name : "default";
    this.setExpressions(moods[name] ?? moods.default ?? [], fade);
  }

  /** Stacks the model's expressions by name, outside any mood (the preview). */
  setExpressions(exprs, fade) {
    const target = new Map();
    for (const expr of exprs) {
      for (const p of this.expressionParams.get(expr) ?? []) target.set(p.Id, (target.get(p.Id) ?? 0) + p.Value);
    }
    this.from = this.blended();
    this.current = target;
    this.fadeStart = performance.now();
    this.fadeLen = fade ?? null;
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
    const fade = (this.fadeLen ?? this.rig.expressions?.fade ?? 0.2) * 1000;
    const x = fade > 0 ? Math.min(1, (performance.now() - this.fadeStart) / fade) : 1;
    // A long fade (a reaction's fadeOut) eases in and out, so the brows set
    // off and settle gently instead of at full speed; the short default
    // stays linear.
    const k = this.fadeLen != null ? x * x * (3 - 2 * x) : x;
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
    const amount = this.rig.motion?.idle?.amount ?? 1;
    const now = performance.now();
    const dt = (now - this.dampAt) / 1000;
    this.dampAt = now;
    const idle = !this.posing && now >= this.idleUntil;
    const step = dt / (idle ? IDLE_DAMP_IN : IDLE_DAMP_OUT);
    this.dampWeight = Math.max(0, Math.min(1, this.dampWeight + (idle ? step : -step)));
    if (amount >= 1 || !this.dampWeight) return;
    const w = this.dampWeight * this.dampWeight * (3 - 2 * this.dampWeight); // smoothstep
    const k = 1 - (1 - amount) * w;
    const { values, defaultValues } = this.raw.parameters;
    for (const i of this.idleParams) values[i] = defaultValues[i] + (values[i] - defaultValues[i]) * k;
  }

  applyCrestParams() {
    const params = this.rig.crest?.params;
    if (!params) return;
    const c = this.crest ?? 0;
    this.crestParamsOn = this.crestParamsOn ? c > CREST_PARAMS.off : c >= CREST_PARAMS.on;
    if (!this.crestParamsOn) return;
    const { values, minimumValues, maximumValues } = this.raw.parameters;
    for (const [id, v] of Object.entries(params)) {
      const i = this.paramIndex.get(id);
      if (i != null) values[i] = Math.min(maximumValues[i], Math.max(minimumValues[i], v));
    }
  }

  applyEase() {
    const now = performance.now();
    const dt = Math.min(0.1, (now - this.easeAt) / 1000);
    this.easeAt = now;
    const { values, minimumValues, maximumValues } = this.raw.parameters;
    for (const p of this.eased) {
      const target = values[p.i];
      if (p.value == null) p.value = target; // start where the model loads
      const step = ((maximumValues[p.i] - minimumValues[p.i]) * dt) / p.seconds;
      p.value += Math.max(-step, Math.min(step, target - p.value));
      values[p.i] = p.value;
    }
  }

  // Scales the eyes by the blink's openness (0 shut, 1 open) instead of
  // setting them, so a pose or clip that narrows the eyes keeps doing so.
  // No blinking through a wink (a mood that shuts one eye, e_wink_00): the
  // open eye blinking with the other shut read badly. The blink weakens as
  // the wink fades in and comes back as it fades out.
  blink() {
    const now = performance.now();
    const dt = (now - this.lastBlinkAt) / 1000;
    this.lastBlinkAt = now;
    if (!this.eyeBlink || !this.blinkIds.length) return;
    let open = 1;
    this.eyeBlink.updateParameters({ setParameterValueById: (_, v) => (open = v) }, dt);
    const wink = this.winking();
    if (wink) open = 1 - (1 - open) * (1 - wink);
    // The widen's catch blinks once on its own (CATCH): none of his own
    // through it.
    if (this.gaspState?.k?.catch && this.gaspState.scale >= 1) open = 1;
    const { values } = this.raw.parameters;
    for (const i of this.blinkIds) values[i] *= open;
  }

  // 0-1, how far the mood shuts one eye and not the other (a wink). Half
  // the difference counts as a full wink: Rui's narrows the open eye a
  // little too (0.8 apart), which would leave a faint blink.
  winking() {
    const mood = this.blended();
    const l = mood.get("ParamEyeLOpen") ?? 0;
    const r = mood.get("ParamEyeROpen") ?? 0;
    return Math.min(1, Math.abs(l - r) / 0.5);
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

  // --- warmth (§12.7, prototype) --------------------------------------------
  // warmth.js keeps the value; the rig draws it over the mood: a resting
  // blush (ParamCheek, which every model's e_sekimen_00 adds), capped at the
  // parameter's max so a blush mood can't overshoot, and breathing that
  // quickens up to WARMTH.breathRate x by blending ParamBreath toward a
  // faster sine (the plugin can't speed up the m_breath clip itself).

  /** 0-1; 0 leaves the model exactly as the mood draws it. */
  setWarmth(w) {
    this.warmth = Math.min(1, Math.max(0, w));
  }

  applyWarmth() {
    const now = performance.now() / 1000;
    const dt = Math.min(0.1, now - (this.warmthAt ?? now));
    this.warmthAt = now;
    const w = this.warmth ?? 0;
    // Holds ease in and out rather than snapping (setHold). Building, each
    // effect comes in over its own band of the level; letting go, they all
    // fall together from where they were, so a late band (bliss's brows and
    // lids, the parted lips) doesn't drop out seconds before the blush and
    // breath and leave his idle face's brows under a still-flushed face.
    const prevLevel = this.holdLevel ?? 0;
    const level = prevLevel + (this.holding ? dt / HOLD.build : -dt / (this.holdRelease ?? HOLD.release));
    this.holdLevel = Math.min(1, Math.max(0, level));
    this.lidScale = 1;
    if (this.holding || prevLevel <= 0) {
      this.released = null;
      this.hold = {};
      for (const [key, [a, b]] of Object.entries(HOLD.bands)) {
        const x = Math.min(1, Math.max(0, (this.holdLevel - a) / (b - a)));
        this.hold[key] = (this.weightsNow()[key] ?? 0) * x * x * (3 - 2 * x);
      }
    } else {
      this.released ??= { level: prevLevel, hold: { ...this.hold } };
      const f = this.holdLevel / this.released.level;
      const release = this.holdRelease ?? HOLD.release;
      this.hold = {};
      for (const [key, v] of Object.entries(this.released.hold)) {
        // An effect with its own `fall` time gets there sooner.
        const own = this.holdFall?.[key];
        const fk = own ? Math.max(0, 1 - (1 - f) * (release / own)) : f;
        this.hold[key] = v * fk * fk * (3 - 2 * fk);
      }
      // `fall.lids`: the heavy lids (the hold look's and bliss's, flutter
      // included) lift on their own time, ahead of the brows and the rest.
      const own = this.holdFall?.lids;
      if (own) {
        const fk = Math.max(0, 1 - (1 - f) * (release / own));
        this.lidScale = f > 0 ? Math.min(1, (fk * fk * (3 - 2 * fk)) / (f * f * (3 - 2 * f))) : 0;
      }
    }
    const hb = this.hold.heartbeat;
    this.updatePulse(dt);
    const period = this.durations?.get("m_breath") ?? 3;
    const crest = this.crest ?? 0;
    const rate = (1 + (WARMTH.breathRate - 1) * w) * (1 + (HOLD.breathRate - 1) * hb) * (1 + RISE.breath * (this.rise ?? 0)) * (1 - CREST.catch * crest);
    this.breathPhase = ((this.breathPhase ?? 0) + (dt * rate) / period) % 1;
    this.cheekOverflow = 0;
    if (!this.model) return;
    const { values, minimumValues, maximumValues, defaultValues } = this.raw.parameters;
    const cheek = this.paramIndex.get("ParamCheek");
    if (cheek != null) {
      // What his cheeks would show now, uncapped, then diluted (BLUSH_FADE).
      // Warmth, hold and crest blush count in blush drawings (blushUnit),
      // so a model whose normal blush sits partway up the range (Ren's)
      // isn't pushed into its heavy one by the same flush.
      const added = w ** WARMTH.curve * WARMTH.blush + (this.hold.blush ?? 0) + CREST.blush * crest;
      const target = values[cheek] + added * (this.blushUnit ?? 1);
      const shown = this.cheekShown ?? target;
      this.cheekShown = target >= shown ? target : target + (shown - target) * Math.exp(-dt / BLUSH_FADE.tau);
      const want = this.cheekShown;
      this.cheekOverflow = Math.max(0, want - maximumValues[cheek]) / (maximumValues[cheek] || 1);
      values[cheek] = Math.min(maximumValues[cheek], want);
    }
    if (!w && hb < 0.01 && crest < 0.01) return;
    const b = this.breathIndex;
    if (b != null) {
      const k = this.rig.motion?.breath?.amount ?? 1;
      const sine = minimumValues[b] + ((maximumValues[b] - minimumValues[b]) * (1 - Math.cos(2 * Math.PI * this.breathPhase))) / 2;
      // A heartbeat hold breathes deeper as well as faster: past the rig's
      // damping (motion.breath.amount) toward the full range, or a rig
      // damped on a soft ParamBreath (Elias) shows no change at all.
      const depth = k + (1 - k) * hb;
      const quick = defaultValues[b] + (sine - defaultValues[b]) * depth;
      values[b] += (quick - values[b]) * Math.max(w, hb);
    }
  }

  /**
   * A hold in progress (prototype): { heartbeat, pulse, lips, look, peek,
   * blush, bliss }, each 0-1, and `glance` [x, y], where he looks first; {}
   * ends it. `peek` is the glance alone, without the hold look.
   * `lids` (default 1) scales the hold look's lowered lids: 0 keeps his
   * eyes at their normal opening (the lip and hand holds).
   * `glanceEvery` [min, max] seconds: once a glance is done, he glances
   * down (HOLD_LOOK.glanceDown) after a random span in that range, again
   * and again (tease); without it he glances once, at the touch. A shy
   * gaze (holdGaze) breaks eye contact on top of these.
   * Calling it again mid-hold (the heartbeat check sliding into tease)
   * keeps the level and crossfades to the new weights over HOLD.blend
   * seconds; a glance in progress carries on.
   * Ending it, `release` overrides HOLD.release: the seconds the effects
   * take to fall (tease's comedown after the break is far slower); `fall`
   * gives single effects their own, shorter time ({ lips: 8 }; `lids`
   * is the heavy lids alone, out of the look and bliss); and
   * `glances: false` ends the glancing at once.
   */
  setHold({ heartbeat = 0, pulse = 0, lips = 0, look = 0, peek = 0, blush = 0, bliss = 0, glance = null, glanceEvery = null, lids = 1 } = {}, { release = null, fall = null, glances = true } = {}) {
    this.holding = Boolean(heartbeat || pulse || lips || look || peek || blush || bliss);
    this.holdRelease = this.holding ? null : release;
    this.holdFall = this.holding ? null : fall;
    // Ending with `glances: false` stops any glance (and its repeats) now.
    if (!this.holding && !glances) this.glance = null;
    this.glancesOff = !this.holding && !glances;
    if (!this.holding) this.wasHolding = false;
    // Letting go, a glance (down, or at the touch) lifts from wherever it
    // is now, over glanceLift, and no more are scheduled: left to run its
    // hold, or a repeat landing mid-release, it was still dipping his head
    // when the hold look ran out and snapped back in one frame.
    if (!this.holding && this.glance?.to && !this.glance.lift) {
      const from = this.glanceToward();
      this.glance.every = null;
      this.glance.lift = { at: performance.now() / 1000, from };
    }
    // Letting go keeps the weights, so the effects fall with the level.
    if (!this.holding) return;
    const next = { heartbeat, pulse, lips, look, glance: peek, blush, bliss };
    this.holdLids = lids;
    const now = performance.now() / 1000;
    // Mid-hold, crossfade from where the weights are now (HOLD.blend), and
    // the glance in progress carries on; a new hold starts both fresh.
    const midHold = this.holdWeights && (this.holdLevel ?? 0) > 0 && this.wasHolding;
    this.blend = midHold ? { from: this.weightsNow(), at: now } : null;
    this.holdWeights = next;
    this.wasHolding = true;
    const peeks = peek && !look;
    const liftFor = peeks ? HOLD_LOOK.peekLift : HOLD_LOOK.glanceLift;
    const inFor = peeks ? HOLD_LOOK.peekIn : HOLD_LOOK.glanceIn;
    const holdFor = peeks ? HOLD_LOOK.peekHold : HOLD_LOOK.glanceHold;
    if (midHold && this.glance && (look || peek)) Object.assign(this.glance, { every: glanceEvery, liftFor, inFor, holdFor });
    else this.glance = look || peek ? { at: now, to: glance, every: glanceEvery, liftFor, inFor, holdFor } : null;
  }


  // The hold's weights this frame: holdWeights, or partway there from the
  // last ones while a crossfade (setHold mid-hold) runs.
  weightsNow() {
    const to = this.holdWeights ?? {};
    const b = this.blend;
    if (!b) return to;
    const t = performance.now() / 1000 - b.at;
    if (t >= Math.max(HOLD.blend, ...Object.values(HOLD.blendSlow))) {
      this.blend = null;
      return to;
    }
    const out = {};
    for (const key of new Set([...Object.keys(b.from), ...Object.keys(to)])) {
      const x = Math.min(1, t / (HOLD.blendSlow[key] ?? HOLD.blend));
      const k = x * x * (3 - 2 * x);
      out[key] = (b.from[key] ?? 0) + ((to[key] ?? 0) - (b.from[key] ?? 0)) * k;
    }
    return out;
  }

  // 0-1, how far the glance has gone onto the touch: eases in, holds, eases
  // back off; with `every`, the next one is scheduled once it's back.
  glanceToward() {
    const g = this.glance;
    if (!g?.to) return 0;
    const now = performance.now() / 1000;
    const glanceHold = g.holdFor ?? HOLD_LOOK.glanceHold;
    const glanceIn = g.inFor ?? HOLD_LOOK.glanceIn;
    const glanceLift = g.liftFor ?? HOLD_LOOK.glanceLift;
    if (g.every && now - g.at > glanceIn + glanceHold + glanceLift) {
      const [a, b] = g.every;
      g.at = now + a + Math.random() * (b - a);
      g.to = HOLD_LOOK.glanceDown;
    }
    const ease = (x) => {
      const c = Math.min(1, Math.max(0, x));
      return c * c * (3 - 2 * c);
    };
    if (g.lift) return g.lift.from * (1 - ease((now - g.lift.at) / glanceLift));
    const t = now - g.at;
    return ease(t / glanceIn) * (1 - ease((t - glanceIn - glanceHold) / glanceLift));
  }

  // The hold look: eye contact, lowered lids, a dipped chin. Over the mood,
  // so whatever face plays, he looks at you while you hold.
  applyHoldLook(h) {
    const { values, minimumValues, maximumValues } = this.raw.parameters;
    const set = (id, fn) => {
      const i = this.paramIndex.get(id);
      if (i != null) values[i] = Math.min(maximumValues[i], Math.max(minimumValues[i], fn(values[i])));
    };
    // Where the eyes go: the glance at the touch first, then up to you.
    let gx = 0;
    let gy = HOLD_LOOK.lookUp;
    let eyes = Math.min(1, h * HOLD_LOOK.eyes);
    let dip = 0;
    const g = this.glance;
    if (g?.to) {
      // 0 -> 1 onto the touch, held, then eases back to 0
      // A crest holds his eyes still: glances fade out as it builds.
      const toward = this.glanceToward() * (1 - (this.crest ?? 0));
      gx = g.to[0] * toward;
      gy = g.to[1] * toward + HOLD_LOOK.lookUp * (1 - toward);
      eyes = Math.max(eyes, toward);
      dip = HOLD_LOOK.glanceChin * Math.max(0, -g.to[1]) * toward;
      // Looking down, his eyes stay open: the heavy lids (this look's and
      // bliss's) lift as far as he's glancing down, or on some art (Haru's)
      // the lids, the dip and the lowered irises hide the eyes.
      this.glanceDown = g.to[1] < 0 ? toward : 0;
    } else {
      this.glanceDown = 0;
    }
    // A shy gaze's glances away stop at a crest, and after a hold that
    // ended with `glances: false` (the break); they wait out his other glances.
    const busy = g?.to ? this.glanceToward() > 0.02 : false;
    const shy = this.shyGlance(eyes, busy || this.glancesOff || (this.crest ?? 0) > 0.01);
    if (shy) {
      const k = shy.k;
      gx += (shy.dir * SHY_GAZE.to[0] - gx) * k;
      gy += (SHY_GAZE.to[1] - gy) * k;
      set("ParamAngleX", (v) => v + shy.dir * SHY_GAZE.turn * k * eyes);
      dip += SHY_GAZE.dip * k;
    }
    set("ParamEyeBallX", (v) => v + (gx - v) * eyes);
    set("ParamEyeBallY", (v) => v + (gy - v) * eyes);
    // A crescent smile (ParamEye*Smile) shuts the eyes; contact needs them open.
    for (const id of ["ParamEyeLSmile", "ParamEyeRSmile"]) set(id, (v) => v * (1 - eyes));
    const lidsUp = 1 - (this.glanceDown ?? 0);
    for (const id of ["ParamEyeLOpen", "ParamEyeROpen"]) set(id, (v) => v * (1 - HOLD_LOOK.lids * (this.holdLids ?? 1) * h * (this.lidScale ?? 1) * lidsUp));
    set("ParamAngleY", (v) => v - HOLD_LOOK.chin * h - dip);
  }

  // The glance alone (setHold `peek`): eyes and chin to the touch, held,
  // then back to whatever his mood has, the same timing as the hold look's.
  applyGlance(k) {
    const g = this.glance;
    if (!g?.to) return;
    const toward = k * this.glanceToward();
    if (toward < 0.001) return;
    const { values, minimumValues, maximumValues } = this.raw.parameters;
    const set = (id, fn) => {
      const i = this.paramIndex.get(id);
      if (i != null) values[i] = Math.min(maximumValues[i], Math.max(minimumValues[i], fn(values[i])));
    };
    set("ParamEyeBallX", (v) => v + (g.to[0] - v) * toward);
    set("ParamEyeBallY", (v) => v + (g.to[1] - v) * toward);
    for (const id of ["ParamEyeLSmile", "ParamEyeRSmile"]) set(id, (v) => v * (1 - toward));
    set("ParamAngleY", (v) => v - HOLD_LOOK.glanceChin * Math.max(0, -g.to[1]) * toward);
  }

  // A shy gaze's glances away, once he's met your eyes: { dir, k } with k
  // 0-1 how far away he's looking now, or null. `blocked` (another glance,
  // a crest, the break) starts none and eases one in progress back; so does
  // losing eye contact. k rides a spring, so cut short it still eases.
  shyGlance(eyes, blocked) {
    if (this.rig.holdGaze !== "shy") return null;
    const now = performance.now() / 1000;
    const span = ([a, b]) => a + Math.random() * (b - a);
    const s = (this.shy ??= { next: now + span(SHY_GAZE.every), until: 0, dir: 1, k: 0, v: 0, at: now });
    // A new hold (or the look back after a break) starts the wait afresh.
    if (now - s.at > 0.5) Object.assign(s, { next: now + span(SHY_GAZE.every), until: 0, k: 0, v: 0 });
    const dt = Math.min(0.1, now - s.at);
    s.at = now;
    const ok = eyes >= 0.9 && !blocked;
    if (!ok) s.next = Math.max(s.next, now + SHY_GAZE.gap);
    if (ok && now >= s.next && now >= s.until) {
      s.until = now + span(SHY_GAZE.away);
      s.next = s.until + span(SHY_GAZE.every);
      // Mostly the side he looked to last, now and then the other.
      if (Math.random() < 0.3) s.dir = -s.dir;
    }
    const target = ok && now < s.until ? 1 : 0;
    if (!ok) s.until = Math.min(s.until, now);
    // Critically damped spring toward the target (SHY_GAZE.settle).
    const w = 4.6 / SHY_GAZE.settle;
    s.v += (w * w * (target - s.k) - 2 * w * s.v) * dt;
    s.k += s.v * dt;
    if (s.k < 0.001 && target === 0) {
      s.k = 0;
      s.v = 0;
      return null;
    }
    return { dir: s.dir, k: Math.min(1, Math.max(0, s.k)) };
  }

  /** His pulse (PULSE), steady: the monitor's number. */
  get pulseBpm() {
    return this.bpm ?? this.rig.heartRate?.resting ?? PULSE.resting;
  }

  /** His heart's rate this instant: the pulse, swaying with his breath (PULSE.sway). */
  get heartRate() {
    const sway = PULSE.sway * (this.rig.heartRate?.scale ?? 1);
    return this.pulseBpm + sway * Math.sin(2 * Math.PI * (this.breathPhase ?? 0));
  }

  // Eases this.bpm toward where warmth and the crest put it (PULSE).
  updatePulse(dt) {
    const resting = this.rig.heartRate?.resting ?? PULSE.resting;
    const scale = this.rig.heartRate?.scale ?? 1;
    const h = this.hold ?? {};
    const held = PULSE.held * Math.max(h.heartbeat ?? 0, h.pulse ?? 0);
    const climb = PULSE.warmth * (this.warmth ?? 0) + held + CREST.bpm * (this.crest ?? 0) + RISE.bpm * (this.rise ?? 0);
    const target = resting + scale * climb;
    this.bpm ??= resting;
    const tau = target > this.bpm ? PULSE.rise : PULSE.settle;
    this.bpm += (target - this.bpm) * (1 - Math.exp(-dt / tau));
  }

  // Parted lips: the mouth opens a little with each inhale while a lip or
  // heartbeat hold runs; talking owns the mouth, so it pauses then.
  applyLips() {
    if (!this.hold) return;
    this.glanceDown = 0; // set by the hold look, if it runs
    if (this.hold.look > 0.01) this.applyHoldLook(this.hold.look);
    else if (this.hold.glance > 0.01) this.applyGlance(this.hold.glance);
    this.applyBliss(this.hold.bliss ?? 0);
    const part = this.hold.lips;
    if (part < 0.01 || !this.mouth?.length || this.talking) return;
    const inhale = (1 - Math.cos(2 * Math.PI * (this.breathPhase ?? 0))) / 2;
    const open = part * HOLD.lips * (0.6 + 0.4 * (this.warmth ?? 0)) * (0.55 + 0.45 * inhale) * (1 + RISE.lips * (this.rise ?? 0));
    const { values, maximumValues } = this.raw.parameters;
    for (const i of this.mouth) values[i] = Math.max(values[i], open * maximumValues[i]);
    // A smile's mouth shape draws a small opening shut, so the smile relaxes
    // toward HOLD.smile while the lips part.
    const form = this.paramIndex.get("ParamMouthForm");
    if (form != null && values[form] > HOLD.smile) values[form] += (HOLD.smile - values[form]) * part;
  }

  /**
   * Tease's crest (CREST), 0-1; the caller eases it. `eyes` (default k) is
   * how far his eyes are squeezed shut, apart so they can open at the break
   * while the rest of the crest comes down slowly.
   */
  setCrest(k, eyes = k) {
    const clamp = (v) => Math.min(1, Math.max(0, v));
    this.crest = clamp(k);
    this.crestEyes = clamp(eyes);
  }

  /** Bliss's rise (RISE), 0-1; the caller eases it. Works through bliss. */
  setRise(k) {
    this.rise = Math.min(1, Math.max(0, k));
  }

  /** Bliss's eye roll (ROLL), 0-1; the caller eases it. Works through bliss. */
  setRoll(k) {
    this.roll = Math.min(1, Math.max(0, k));
  }

  /** Bliss's eye contact while he talks (CONTACT); on only while holds.js asks. */
  setContact(on) {
    this.contactOn = Boolean(on);
  }

  // Tease's bliss (BLISS): brows give way, lids grow heavy, and the eyes
  // fall shut now and then. Over the hold look, so the flutter wins.
  applyBliss(k) {
    if (k < 0.01) {
      this.flutter = null;
      return;
    }
    const { values, minimumValues, maximumValues } = this.raw.parameters;
    const set = (id, fn) => {
      const i = this.paramIndex.get(id);
      if (i != null) values[i] = Math.min(maximumValues[i], Math.max(minimumValues[i], fn(values[i])));
    };
    const brows = { ...BLISS, ...this.rig.bliss };
    for (const id of ["ParamBrowLForm", "ParamBrowRForm"]) set(id, (v) => v + (brows.browForm - v) * k);
    for (const id of ["ParamBrowLY", "ParamBrowRY"]) set(id, (v) => v + brows.browUp * k);
    // The rise: chin up, head tilted, leaning into it.
    const rise = this.rise ?? 0;
    if (rise > 0.001) {
      set("ParamAngleY", (v) => v + RISE.chin * rise * k);
      set("ParamAngleZ", (v) => v + RISE.tilt * rise * k);
    }
    // The flutter: shut for a span, then open until the next; more often
    // as the rise builds.
    const now = performance.now() / 1000;
    const span = ([a, b]) => (a + Math.random() * (b - a)) / (1 + (RISE.flutter - 1) * rise);
    this.flutter ??= { from: now + span(BLISS.every) * 0.5, len: span(BLISS.blink) };
    const f = this.flutter;
    if (now > f.from + f.len) Object.assign(f, { from: now + span(BLISS.every), len: span(BLISS.blink) * (1 + (RISE.flutter - 1) * rise) });
    const t = (now - f.from) / f.len;
    // Eye contact while he talks (CONTACT) and the roll (ROLL) both hold
    // off the flutter; contact lifts the heavy lids too.
    const dt = Math.min(0.1, Math.max(0, now - (this.contactAt ?? now)));
    this.contactAt = now;
    const talking = this.contactOn && this.talking;
    this.contact = Math.max(0, Math.min(1, (this.contact ?? 0) + (talking ? dt / CONTACT.in : -dt / CONTACT.out)));
    const contact = this.contact;
    const roll = this.roll ?? 0;
    const shut = (t >= 0 && t <= 1 ? Math.sin(Math.PI * t) : 0) * (1 - contact) * (1 - roll);
    // A down-glance lifts the heavy lids and holds off the flutter (glanceDown).
    const lidsUp = 1 - (this.glanceDown ?? 0);
    const lids = (BLISS.lids + (RISE.lids - BLISS.lids) * rise) * (1 - CONTACT.lids * contact);
    const open = (1 - k * (this.lidScale ?? 1) * lidsUp * (lids + (1 - lids) * shut)) * (1 - ROLL.lids * roll * k) * (1 - (this.crestEyes ?? 0));
    for (const id of ["ParamEyeLOpen", "ParamEyeROpen"]) set(id, (v) => v * open);
    if (roll > 0.001) {
      const r = roll * k;
      set("ParamEyeBallX", (v) => v * (1 - r));
      set("ParamEyeBallY", (v) => v + (ROLL.up - v) * r);
      for (const id of ["ParamBrowLY", "ParamBrowRY"]) set(id, (v) => v + ROLL.brow * r);
    }
  }

  // --- hidden parts (preview only) -------------------------------------------
  // The preview's "Model parts" toggles and ?hide=PartHat,PartX: zero a
  // part's opacity every frame (after motions and pose3 have written theirs),
  // for seeing what a layer covers. Children of a part hide with it.

  get partIds() {
    return Array.from(this.raw.parts.ids);
  }

  setPartHidden(id, hidden) {
    this.hiddenParts ??= new Set();
    this.partRest ??= new Map();
    const { ids, opacities } = this.raw.parts;
    const i = ids.indexOf(id);
    if (i === -1) return;
    if (hidden) {
      // Nothing else writes most parts' opacity back, so keep what it was.
      if (!this.hiddenParts.has(id)) this.partRest.set(id, opacities[i]);
      this.hiddenParts.add(id);
    } else {
      this.hiddenParts.delete(id);
      opacities[i] = this.partRest.get(id) ?? 1;
    }
  }

  applyHiddenParts() {
    if (!this.hiddenParts?.size) return;
    // Straight into the core's part opacities: the framework's
    // setPartOpacityById wants an id handle, not a string, and no-ops.
    const { ids, opacities } = this.raw.parts;
    for (let i = 0; i < ids.length; i++) if (this.hiddenParts.has(ids[i])) opacities[i] = 0;
  }

  // --- part blush -----------------------------------------------------------
  // Runs after the mood and warmth, so it follows their blush as it fades.

  setupPartBlush() {
    const spec = this.rig.partBlush;
    this.blushDrawables = [];
    this.blushCheek = this.paramIndex.get("ParamCheek");
    const core = this.model.internalModel.coreModel;
    this.patchDrawables = this.findBlushPatch();
    for (const i of this.patchDrawables) {
      if (core.setOverrideFlagForDrawableMultiplyColors) core.setOverrideFlagForDrawableMultiplyColors(i, true);
      else core.setOverwriteFlagForDrawableMultiplyColors(i, true);
    }
    if (!spec) return;
    for (const part of spec.parts ?? PART_BLUSH.parts) {
      for (const id of this.rig.parts?.[part] ?? []) {
        const i = this.drawableIndex.get(id);
        if (i == null) continue;
        if (core.setOverrideFlagForDrawableMultiplyColors) core.setOverrideFlagForDrawableMultiplyColors(i, true);
        else core.setOverwriteFlagForDrawableMultiplyColors(i, true);
        this.blushDrawables.push(i);
      }
    }
    this.blushColor = spec.color ?? PART_BLUSH.color;
  }

  /** The drawables ParamCheek fades in (the cheek blush art), found by
   * updating the model once at no blush and once at full. */
  findBlushPatch() {
    const i = this.blushCheek;
    if (i == null) return [];
    const { values, minimumValues, maximumValues } = this.raw.parameters;
    const saved = Float32Array.from(values);
    values[i] = minimumValues[i];
    this.raw.update();
    const off = Float32Array.from(this.raw.drawables.opacities);
    values[i] = maximumValues[i];
    this.raw.update();
    const on = this.raw.drawables.opacities;
    const found = [];
    for (let d = 0; d < on.length; d++) if (on[d] - off[d] > 0.2) found.push(d);
    values.set(saved);
    this.raw.update();
    return found;
  }

  applyPartBlush() {
    if (this.blushCheek == null) return;
    const { values, maximumValues } = this.raw.parameters;
    const max = maximumValues[this.blushCheek] || 1;
    const deep = Math.min(1, (this.cheekOverflow ?? 0) / DEEP.span);
    const k = Math.min(1, Math.max(0, values[this.blushCheek] / max));
    if (k === this.blushShown && deep === this.deepShown) return;
    this.blushShown = k;
    this.deepShown = deep;
    const core = this.model.internalModel.coreModel;
    const [pr, pg, pb] = DEEP.patch;
    for (const i of this.patchDrawables ?? []) {
      core.setMultiplyColorByRGBA(i, 1 + (pr - 1) * deep, 1 + (pg - 1) * deep, 1 + (pb - 1) * deep, 1);
    }
    if (!this.blushDrawables?.length) return;
    const [r, g, b] = this.blushColor;
    const ear = (c, p) => (1 + (c - 1) * k) * (1 + (p - 1) * deep);
    for (const i of this.blushDrawables) {
      core.setMultiplyColorByRGBA(i, ear(r, pr), ear(g, pg), ear(b, pb), 1);
    }
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
    // 0, up to 1 at the peak, back.
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

  // --- head shake (HEAD_SHAKE) ----------------------------------------------

  /** A shy head shake, over whatever the mood and pose set. */
  shakeHead(scale = 1) {
    this.shakeState = { at: performance.now() / 1000, scale };
  }

  applyShake() {
    const st = this.shakeState;
    if (!st || !this.model) return;
    const { turns, period, angle, body, chin, in: rise, settle } = HEAD_SHAKE;
    const t = performance.now() / 1000 - st.at;
    const span = turns * period;
    if (t > span + settle) {
      this.shakeState = null;
      return;
    }
    const ease = (x) => {
      const c = Math.min(1, Math.max(0, x));
      return c * c * (3 - 2 * c);
    };
    // The turns fade as they go; the dip and eye contact hold, then settle.
    const sway = t < span ? Math.sin((2 * Math.PI * t) / period) * (1 - t / span) * ease(t / rise) : 0;
    const dip = ease(t / rise) * (1 - ease((t - span) / settle)) * st.scale;
    const { values, minimumValues, maximumValues } = this.raw.parameters;
    const set = (id, fn) => {
      const i = this.paramIndex.get(id);
      if (i != null) values[i] = Math.min(maximumValues[i], Math.max(minimumValues[i], fn(values[i])));
    };
    set("ParamAngleX", (v) => v + angle * sway * st.scale);
    set("ParamBodyAngleX", (v) => v + angle * body * sway * st.scale);
    set("ParamAngleY", (v) => v - chin * dip);
    set("ParamEyeBallX", (v) => v * (1 - dip));
    set("ParamEyeBallY", (v) => v * (1 - dip));
  }

  /** A small gasp (GASP): parted lips and a hint of surprise. */
  gasp(scale = 1) {
    this.gaspState = { at: performance.now() / 1000, scale, k: GASP };
  }

  /** A brief widen (WIDEN): the eyes a little wider for a moment, lips closed. */
  widen(scale = 1) {
    this.gaspState = { at: performance.now() / 1000, scale, k: { ...WIDEN, open: 0 } };
  }

  applyGasp() {
    const st = this.gaspState;
    if (!st || !this.model) return;
    const t = performance.now() / 1000 - st.at;
    const k = st.k ?? GASP;
    const easeAt = k.in + k.hold;
    const end = k.catch ? Math.max(easeAt + k.out, easeAt + CATCH.exhaleAt + CATCH.exhaleFor) : easeAt + k.out;
    if (t > end) {
      this.gaspState = null;
      return;
    }
    const ease = (x) => {
      const c = Math.min(1, Math.max(0, x));
      return c * c * (3 - 2 * c);
    };
    const w = st.scale * ease(t / k.in) * (1 - ease((t - k.in - k.hold) / k.out));
    const { values, minimumValues, maximumValues } = this.raw.parameters;
    const set = (id, fn) => {
      const i = this.paramIndex.get(id);
      if (i != null) values[i] = Math.min(maximumValues[i], Math.max(minimumValues[i], fn(values[i], maximumValues[i] - minimumValues[i])));
    };
    if (k.open) for (const i of this.mouth ?? []) values[i] = Math.max(values[i], k.open * maximumValues[i] * w);
    for (const id of ["ParamBrowLY", "ParamBrowRY"]) set(id, (v) => v + k.brow * w);
    for (const id of ["ParamEyeLOpen", "ParamEyeROpen"]) set(id, (v, range) => v + ((k.eyes ?? 0) * range + (k.eyesAdd ?? 0)) * w);
    if (k.catch) {
      set("ParamAngleY", (v) => v + CATCH.chin * w);
      this.applyCatch(st, t, easeAt, k.out, ease);
    }
  }

  // How still the widen's catch holds him now (0-1, CATCH), at its scale.
  catchStill(st, t, easeAt, out, ease) {
    return CATCH.still * st.scale * ease(t / CATCH.in) * (1 - ease((t - easeAt) / out));
  }

  // The catch on the idle clip's parameters (afterMotionUpdate, before
  // physics so the hair stills with him): held toward where they were as
  // the widen started.
  applyCatchIdle() {
    const st = this.gaspState;
    if (!st?.k?.catch || !this.model) return;
    const { values } = this.raw.parameters;
    st.idleSnap ??= this.idleParams.map((i) => values[i]);
    const t = performance.now() / 1000 - st.at;
    const ease = (x) => {
      const c = Math.min(1, Math.max(0, x));
      return c * c * (3 - 2 * c);
    };
    const still = this.catchStill(st, t, st.k.in + st.k.hold, st.k.out, ease);
    if (!still) return;
    this.idleParams.forEach((i, n) => (values[i] += (st.idleSnap[n] - values[i]) * still));
  }

  // The catch on the breath and eyes (after warmth, which writes the
  // breath while he's warm): the held breath, the breath out, the blink.
  applyCatch(st, t, easeAt, out, ease) {
    const { values, minimumValues, maximumValues } = this.raw.parameters;
    const b = this.breathIndex;
    if (b != null) {
      st.breathSnap ??= values[b];
      const still = this.catchStill(st, t, easeAt, out, ease);
      values[b] += (st.breathSnap - values[b]) * still;
      const x = (t - easeAt - CATCH.exhaleAt) / CATCH.exhaleFor; // -: rising, 0 peak, 1 gone
      const rise = CATCH.exhaleAt / CATCH.exhaleFor;
      const bump = x < 0 ? ease(1 + x / rise) : 1 - ease(x);
      if (t > easeAt && bump > 0) values[b] = Math.max(minimumValues[b], values[b] - CATCH.exhale * st.scale * bump * (maximumValues[b] - minimumValues[b]));
    }
    if (st.scale < 1 || !this.blinkIds.length) return;
    const from = easeAt + out * CATCH.blinkAt;
    const bt = t - from;
    if (bt < 0 || bt > CATCH.blinkClose + CATCH.blinkOpen) return;
    const shut = bt < CATCH.blinkClose ? ease(bt / CATCH.blinkClose) : 1 - ease((bt - CATCH.blinkClose) / CATCH.blinkOpen);
    for (const i of this.blinkIds) values[i] *= 1 - shut;
  }

  /**
   * Plays a one-shot clip (no _hold/_return, e.g. Towa's
   * m_shakehead_noloop) on the pose slot, if the model has it and no pose
   * is on. Returns whether it played.
   */
  playClip(group) {
    if (this.posing || !this.durations?.has(group)) return false;
    this.model.motion(group, 0, MotionPriority.FORCE);
    this.idleUntil = performance.now() + this.durations.get(group) * 1000;
    return true;
  }

  // --- talking --------------------------------------------------------------
  // Text-driven mouth, no audio: the mouth shapes each character of the line
  // as it types out, over whatever the mood and motion set.

  /**
   * Talks through `line` on the dialogue box's schedule (typeSchedule). A
   * clenched mood holds first (CLENCH_LEAD), so the mouth starts that late.
   */
  talk(line) {
    const now = performance.now() / 1000;
    if (now >= this.talkUntil + TALK_SETTLE) {
      this.talkStart = now + (this.clenched && this.releaseAt == null ? CLENCH_LEAD : 0);
      this.releaseAt ??= this.talkStart;
      this.talkOpen = 0;
    }
    this.talkLine = line;
    this.talkAt = typeSchedule(line);
    this.talkLineStart = Math.max(now, this.talkStart);
    const ms = this.talkAt.length ? this.talkAt[this.talkAt.length - 1] : 0;
    this.talkUntil = this.talkLineStart + ms / 1000;
  }

  /** Stops talking, e.g. when the player skips to the end of the line. */
  stopTalking() {
    this.talkUntil = Math.min(this.talkUntil, performance.now() / 1000);
  }

  get talking() {
    const now = performance.now() / 1000;
    return now >= this.talkStart && now < this.talkUntil + TALK_SETTLE;
  }

  /** How far the line wants the mouth open at `now` (0 shut, 1 wide). */
  talkTarget(now) {
    if (now >= this.talkUntil) return 0;
    const ms = (now - this.talkLineStart) * 1000;
    const at = this.talkAt;
    let i = 0;
    while (i < at.length && at[i] <= ms) i++;
    // i characters are out; the newest is the one being said. During a
    // rest (the next character is more than a beat away) the mouth shuts.
    if (i === 0) return 0;
    if (i < at.length && at[i] - ms > TYPE_MS * 1.5 && ms - at[i - 1] > TYPE_MS) return 0;
    return mouthShape(this.talkLine[i - 1]) * wordGain(this.talkLine, i - 1);
  }

  applyTalk() {
    const now = performance.now() / 1000;
    const dt = Math.min(0.1, Math.max(0, now - this.talkLast));
    this.talkLast = now;
    if (!this.mouth.length || !this.talking) {
      this.talkOpen = 0;
      return;
    }
    const target = this.talkTarget(now);
    const tau = target > this.talkOpen ? TALK_OPEN_TAU : TALK_CLOSE_TAU;
    this.talkOpen += (target - this.talkOpen) * (1 - Math.exp(-dt / tau));
    const settle = now > this.talkUntil ? Math.max(0, 1 - (now - this.talkUntil) / TALK_SETTLE) : 1;
    const open = Math.max(0, Math.min(1, this.talkOpen * settle));
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

  /**
   * Plays pose `name`; with `hold` (seconds), returns from it by itself.
   * The hand-offs are timed from when the clip starts, not from this call:
   * a clip that isn't loaded yet starts once its fetch lands, and timing
   * from the call cut it short and snapped it to its hold. Until then,
   * leavesAt is the estimate from now.
   */
  playPose(name, hold = null) {
    if (!this.poses.includes(name)) return false;
    this.clearPoseTimers();
    const seq = this.poseSeq;
    this.posing = name;
    this.poseHold = hold;
    const end = this.durations.get(name);
    this.leavesAt = hold != null ? performance.now() + (end + hold) * 1000 : null;
    Promise.resolve(this.model.motion(name, 0, MotionPriority.FORCE)).then((started) => {
      if (seq !== this.poseSeq) return; // left, or another pose took over, while it loaded
      if (!started) {
        this.posing = null;
        this.leavesAt = null;
        return;
      }
      this.later(end - 0.05, () => this.model.motion(`${name}_hold`, 0, MotionPriority.FORCE, { loop: true }));
      if (this.poseHold == null) return; // kept (keepPose) while it loaded
      this.returnTimer = this.later(end + this.poseHold, () => this.leavePose());
      this.leavesAt = performance.now() + (end + this.poseHold) * 1000;
    });
    return true;
  }

  leavePose() {
    if (!this.posing) return;
    this.clearPoseTimers();
    const ret = `${this.posing}_return`;
    this.model.motion(ret, 0, MotionPriority.FORCE);
    this.idleUntil = performance.now() + (this.durations.get(ret) ?? 0) * 1000;
    this.posing = null;
    this.leavesAt = null;
  }

  /**
   * Plays the pose rig.json `reactionPoses` gives reaction `name` at `tier`,
   * if any. Returns the seconds until the pose it's in starts returning
   * (null when it holds with no return, or there's no pose).
   */
  reactPose(name, tier) {
    const pose = forTier(this.rig.reactionPoses?.[name], tier);
    if (pose && this.posing !== pose) this.playPose(pose, POSE_HOLD);
    return pose && this.leavesAt != null ? Math.max(0, (this.leavesAt - performance.now()) / 1000) : null;
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
    this.leavesAt = null;
    this.poseHold = null; // a pose still loading doesn't schedule its return either
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

  // Also bumps poseSeq, so a pose still loading won't schedule its timers.
  clearPoseTimers() {
    this.poseTimers.forEach(clearTimeout);
    this.poseTimers = [];
    this.poseSeq = (this.poseSeq ?? 0) + 1;
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

/** The scene's motion hook: the model blinks and idles itself. */
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
