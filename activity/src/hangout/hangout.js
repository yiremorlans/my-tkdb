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
//
// At the LOCKOUT_TIERS (new, known, warm) maxing the meter locks him: he plays the
// upset as usual, then once it ends turns guarded (his `guarded` face, else `serious`, and
// the renderer's `guard` pose if it has one) and ignores every tap after,
// until the tier changes.

import { DIALOGUE_TIERS } from "../../../constants/tiers.js";

import { AnnoyanceMeter } from "./annoyance.js";
import { hotspotAt } from "./hotspots.js";
import { PLACEHOLDER_LINES } from "./placeholderLines.js";
import { SPOT_ANNOYANCE, TOUCH_SPOTS, coveredSpots, forTier, resolveReaction } from "./reactions.js";

// Seconds a reaction holds when it doesn't set `duration`.
const DEFAULT_DURATION = 2.4;

// Seconds after a clip plays before any reaction may play another.
export const SOUND_COOLDOWN = 10;

// The VN box types a line at one character per TYPE_MS (scene.js).
export const TYPE_MS = 28;

// Extra ms the typing (and his mouth) rests after a break mid-line: a
// sentence end or ellipsis ("...", "!?"), a comma-type clause break, and a
// stammer's hyphen ("Wh-Wha"). Nothing rests after the line's last character.
export const SENTENCE_PAUSE_MS = 340;
export const CLAUSE_PAUSE_MS = 140;
export const STAMMER_PAUSE_MS = 70;

function pauseAfter(line, i) {
  const c = line[i];
  const next = line[i + 1];
  if (next == null) return 0;
  if (/\s/.test(next)) {
    if (/[.!?…]/.test(c)) return SENTENCE_PAUSE_MS;
    if (/[,;:]/.test(c)) return CLAUSE_PAUSE_MS;
    return 0;
  }
  // "I...I": an ellipsis rests even with no space after it.
  if ((c === "." && line.slice(i - 2, i + 1) === "...") || c === "…") {
    if (next !== "." && /[\p{L}\d]/u.test(next)) return SENTENCE_PAUSE_MS;
  }
  // "Wh-Wha", "s-suppose": a hyphen after a short fragment that restarts.
  if (c === "-") {
    const frag = line.slice(0, i).match(/(\p{L}{1,3})$/u)?.[1];
    if (frag && next.toLowerCase() === frag[0].toLowerCase()) return STAMMER_PAUSE_MS;
  }
  return 0;
}

/** Ms from the start of typing at which each character of `line` appears. */
export function typeSchedule(line) {
  const at = [];
  let t = 0;
  for (let i = 0; i < line.length; i++) {
    t += TYPE_MS + (i > 0 ? pauseAfter(line, i - 1) : 0);
    at.push(t);
  }
  return at;
}

/** Ms `line` takes to type out, pauses included. */
export function typeDuration(line) {
  const at = typeSchedule(line);
  return at.length ? at[at.length - 1] : 0;
}

// Seconds a touch line stays up after it finishes typing before another tap
// may replace it.
export const LINE_HOLD = 1.5;

// A `then: ["line", mood]` face comes in AFTER_LINE_SETTLE seconds after the
// line types out (once the mouth has shut; live2dRig.js TALK_SETTLE) and
// shows at least AFTER_LINE_HOLD seconds.
export const AFTER_LINE_SETTLE = 0.15;
export const AFTER_LINE_HOLD = 1.2;

// Tiers where maxing the annoyance meter locks him out for good.
export const LOCKOUT_TIERS = ["new", "known", "warm"];

// The face he holds once locked out: rig.json `expressions.moods.guarded`,
// a face he can hold until the tier changes (no sweat, no open mouth), for a
// character whose upset isn't a stronger `serious`; else GUARDED_MOOD.
export const GUARDED_MOOD = "serious";

// The upset face outlasts its line: it holds until the line has typed out
// plus UPSET_READ seconds to read it (or the reaction's `duration`, or its
// pose, if longer).
export const UPSET_READ = 2.5;

// Every reaction's face (taps, upset, hold releases, answers) eases back
// into the resting or guarded face over SETTLE_FADE seconds, smoothstepped,
// instead of the 0.2s mood crossfade: it carries into his pose's return and
// settles after the body does. A reaction's `fadeOut` overrides it.
export const SETTLE_FADE = 1.6;

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
    this.locked = false; // maxed out at a LOCKOUT_TIERS tier: taps ignored
    this.guardAt = null; // when the upset ends and he turns guarded
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
    if (this.locked || this.guardAt != null) {
      this.locked = false;
      this.guardAt = null;
      this.meter.reset();
      this.renderer.unguard?.();
    }
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
    const pool = this.pool(trigger) ?? PLACEHOLDER_LINES[trigger] ?? [];
    return Array.isArray(pool) && pool.length ? pool[Math.floor(this.random() * pool.length)] : null;
  }

  /**
   * `trigger`'s pool as authored, for the nearest tier that has it (see
   * line), or null. Most are line arrays; bliss's `blissChoices` and
   * `blissAfter` are keyed by response type.
   */
  pool(trigger) {
    if (!DIALOGUE_TIERS.some((tier) => this.lines[tier])) return this.lines[trigger] ?? null;
    for (let i = DIALOGUE_TIERS.indexOf(this.tier); i >= 0; i--) {
      const pool = this.lines[DIALOGUE_TIERS[i]]?.[trigger];
      if (pool) return pool;
    }
    return null;
  }

  /** The hotspot's own line pool (rig.json hotspot `line`) if this tier has one, else null. */
  spotLine(spot) {
    const name = this.rig.hotspots?.[spot]?.line;
    return name && this.pool(name)?.length ? name : null;
  }

  /** A tap at a reference-space point. Returns what happened, for the UI. */
  tapAt(point, t) {
    const spot = hotspotAt(this.rig, this.renderer, point);
    if (!spot) return { spot: null, result: "miss" };
    if (this.locked) return { spot, result: "ignored" };
    const info = this.spotInfo(spot);
    const result = this.meter.tap(t, info.annoyance);
    if (result === "ignored") return { spot, result };
    if (result === "upset" && LOCKOUT_TIERS.includes(this.tier)) {
      this.locked = true;
      this.react("upset", t, spot);
      this.renderer.lockPose?.(this.tier);
      // He turns guarded once the upset face ends (react and the v2 scene
      // set how long that is: line, duration, pose).
      this.guardAt = Math.max(this.moodUntil, t + (resolveReaction(this.rig, "upset", this.tier)?.duration ?? DEFAULT_DURATION));
      return { spot, result: "locked" };
    }
    if (result === "upset") this.react("upset", t, spot);
    else this.react(info.reaction, t, spot, info.line ? { line: info.line } : undefined);
    return { spot, result };
  }

  /**
   * What a tap on `spot` adds to the meter and plays: { annoyance, reaction,
   * line? }. `line` names the pool, when it isn't the reaction's own.
   *
   * Removable articles (rig.json `articles`; docs/hangout-activity.md §4.2)
   * can only come off where articles.js is attached (the Activity and the
   * preview). Without
   * it every article stays on, so a spot one covers draws that article's
   * `<article>Pat` lines (Shion's head pats land on his hat), keeping the
   * face and pose of the spot unless the rig sets a `<article>Pat` reaction. Articles that are only out in some poses
   * (`shownOnly`) leave the spot alone. articles.js passes `worn: false`
   * and decides itself.
   *
   * A hotspot's `line` names a pool of its own for that one spot (Haru's
   * prosthetic right hand: `hand_r` draws `prostheticTap`), keeping the
   * spot's face and pose; a tier with no such pool keeps the reaction's.
   */
  spotInfo(spot, { worn = true } = {}) {
    const hotspot = this.rig.hotspots[spot] ?? {};
    const info = { annoyance: hotspot.annoyance ?? SPOT_ANNOYANCE[spot], reaction: hotspot.reaction ?? TOUCH_SPOTS[spot] };
    const own = this.spotLine(spot);
    if (own) info.line = own;
    if (!worn) return info;
    for (const [name, a] of Object.entries(this.rig.articles ?? {})) {
      if (a.shownOnly || a.blocks === false || !coveredSpots(a.covers, this.tier).includes(spot)) continue;
      if (a.pool !== false && this.pool(`${name}Pat`)) {
        info.line = `${name}Pat`;
        if (this.rig.reactions?.[info.line]) info.reaction = info.line;
      }
      break;
    }
    return info;
  }

  /**
   * Plays reaction `name`; `spot` is the touch spot that set it off, if any.
   * `line` draws the line from that pool instead of the reaction's own;
   * `fade` (seconds) eases the mood in over that instead of the rig's
   * default (a hold's release face, holds.js endHold).
   */
  react(name, t, spot, { line, fade } = {}) {
    const r = resolveReaction(this.rig, name, this.tier);
    if (!r) return;
    const side = spot?.match(/_([lr])$/)?.[1];
    const sides = side ? [side] : Object.keys(this.rig.bones?.arms ?? {});
    if (r.twitch) this.motion.twitch(sides, t, r.twitch === true ? 1 : r.twitch);
    const duration = r.duration ?? DEFAULT_DURATION;
    if (r.fist) this.clench(sides, t, duration);
    this.pendingMood = null;
    const upset = name === "upset";
    // The upset line always speaks; other touch lines wait out the current one.
    const text = upset || !spot || t >= this.lineReadyAt ? this.line(line ?? r.line ?? name) : null;
    if (r.mood) {
      this.renderer.setMood(r.mood, fade);
      this.moodUntil = t + duration;
      if (upset && text) this.moodUntil = Math.max(this.moodUntil, t + typeDuration(text) / 1000 + UPSET_READ);
      this.moodFadeOut = r.fadeOut ?? SETTLE_FADE;
    }
    if (r.then) {
      // `then: ["line", mood]` waits for the line to finish typing (and his
      // mouth to settle), for a face that can't share the mouth with
      // talking (Taiga's tongue-out leer), then holds it AFTER_LINE_HOLD.
      if (r.then[0] === "line") {
        const at = t + (text ? typeDuration(text) / 1000 + AFTER_LINE_SETTLE : 0);
        this.pendingMood = { at, mood: r.then[1] };
        if (r.mood) this.moodUntil = Math.max(this.moodUntil, at + AFTER_LINE_HOLD);
      } else this.pendingMood = { at: t + r.then[0], mood: r.then[1] };
    }
    const sounds = [r.sound ?? []].flat();
    if (sounds.length && t >= this.soundReadyAt) {
      this.play(sounds[Math.floor(this.random() * sounds.length)]);
      this.soundReadyAt = t + SOUND_COOLDOWN;
    }
    if (!text) return;
    this.say(text);
    this.lineReadyAt = t + typeDuration(text) / 1000 + LINE_HOLD;
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
    if (this.guardAt != null && t >= this.guardAt) {
      this.guardAt = null;
      this.baseMood = this.rig.expressions?.moods?.guarded ? "guarded" : GUARDED_MOOD;
      this.moodUntil = -Infinity;
      this.pendingMood = null;
      this.renderer.guard?.(this.tier);
    }
    if (this.pendingMood && t >= this.pendingMood.at) {
      if (t < this.moodUntil) this.renderer.setMood(this.pendingMood.mood);
      this.pendingMood = null;
    }
    if (t >= this.moodUntil && this.renderer.moodName !== this.baseMood) {
      // A reaction's `fadeOut` eases its face back.
      this.renderer.setMood(this.baseMood, this.moodFadeOut ?? undefined);
      this.moodFadeOut = null;
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
