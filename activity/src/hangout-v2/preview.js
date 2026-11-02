// Hangout v2 preview (dev only): the v2 scene (hangout-v2/scene.js) plus a
// debug drawer with a character picker, buttons for every mood, reaction,
// touch spot and pose, the relationship tier, and a hotspot overlay. See
// hangout-v2.html. The VN box plays a /meet encounter with the Activity's
// own flow (meet.js), drawn by the dev server from the bot's own content
// (vite.config.js /__meet).
//
// ?character=<id> picks assets/live2d/<id>/rig.json; ?tier=<tier> the
// reaction tier (default spark); ?pose=<group> starts a pose; ?room=0 hides the room;
// ?mobile=1 caps it at 30fps like a phone.

import { Graphics } from "pixi.js";

import { DIALOGUE_TIERS } from "../../../constants/tiers.js";
import { loadLines } from "../hangout/lines.js";
import {
  DEFAULT_REACTIONS,
  TOUCH_SPOTS,
  forTier,
} from "../hangout/reactions.js";
import { MOBILE_FPS } from "../hangout/stage.js";
import { hotspotAt } from "../hangout/hotspots.js";
import { GRADES, PARTICLE_KINDS, autoEffects, createEffects } from "./effects.js";
import { meetFlow } from "./meet.js";
import { HOLD_LOOK } from "./live2dRig.js";
import { startScene } from "./scene.js";
import { Warmth } from "./warmth.js";

const params = new URLSearchParams(location.search);
const character = /^[a-z0-9_-]+$/.test(params.get("character") ?? "")
  ? params.get("character")
  : "alan";
// Every character with a Live2D rig, for the drawer's picker. The glob only
// lists the paths; nothing is loaded.
const CHARACTERS = Object.keys(
  import.meta.glob("../../../assets/live2d/*/rig.json"),
)
  .map((f) => f.split("/").at(-2))
  .sort();
// Every background, for the effects prototype's picker (paths only).
const BACKGROUNDS = Object.keys(import.meta.glob("../../../assets/bg/**/*.png"))
  .map((f) => f.replace(/^(\.\.\/)+/, ""))
  .sort();
const $ = (sel) => document.querySelector(sel);

async function main() {
  $("#vn-name").textContent = character[0].toUpperCase() + character.slice(1);
  let scene;
  try {
    scene = await startScene($("#stage"), {
      base: `assets/live2d/${character}`,
      // ?time=day|evening overrides the hour (Towa's wordless daytime lines).
      lines: await loadLines(
        character,
        ["day", "evening"].includes(params.get("time"))
          ? { daytime: params.get("time") === "day" }
          : undefined,
      ),
      // The preview opens at spark (holds and warmth live there); ?tier= overrides.
      tier: params.get("tier") ?? "spark",
      // ?outfit=<name> picks a rig outfit; unknown names fall back to the default.
      outfit: params.get("outfit"),
      room: params.get("room") !== "0",
      background: "#1b1824",
    });
  } catch (err) {
    $("#controls").textContent = err.message;
    $("#controls").hidden = false;
    console.error(`[hangout-v2] ${err.stack ?? err.message}`);
    return;
  }
  const { renderer, hangout, say } = scene;

  // --- frame loop: HUD and hotspot overlay ----------------------------------
  const overlay = new Graphics();
  overlay.zIndex = 1e6;
  renderer.view.addChild(overlay);
  let showSpots = params.has("spots");
  let frames = 0;
  let fpsClock = performance.now();
  const effects = createEffects(scene);
  scene.effects = effects;
  // Warmth prototype (§12.7): off until the drawer's Warmth row picks a mode.
  // Warmth starts on (the ordinary Hangout profile); the picker turns it off.
  let warmth = new Warmth("hangout", hangout.tier);
  let warmthManual = null; // the slider pins a value while dragged
  let holdFrame = null; // the holds prototype's per-frame step (below)
  scene.frame = (t, dt) => {
    hangout.frame(t, dt);
    effects.frame(t, dt);
    holdFrame?.(dt);
    const w = warmthManual ?? warmth.update(dt);
    renderer.setWarmth(w);
    const warmOut = $("#warmth-out");
    if (warmOut) warmOut.textContent = warmth.on || warmthManual != null ? w.toFixed(2) : "off";
    drawSpots();
    $("#meter-fill").style.width =
      `${hangout.locked ? 100 : Math.min(100, (hangout.meter.level(t) / hangout.meter.config.threshold) * 100)}%`;
    frames++;
    const now = performance.now();
    if (now - fpsClock > 500) {
      $("#fps").textContent =
        `${Math.round((frames * 1000) / (now - fpsClock))} fps`;
      frames = 0;
      fpsClock = now;
    }
  };
  scene.onTap = ({ spot, result }) => {
    $("#spot").textContent = spot ? `${spot}: ${result}` : "";
  };

  // Each hotspot's rect, from its part's current bounds (partUV inverted).
  function drawSpots() {
    overlay.clear();
    if (!showSpots) return;
    for (const spot of Object.values(renderer.rig.hotspots ?? {})) {
      const a = renderer.partUV(spot.part, [0, 0]);
      const b = renderer.partUV(spot.part, [1, 1]);
      if (!a || !b) continue;
      // uv = (p - origin) / size, so size = 1 / (b - a) and origin = -a * size.
      const w = 1 / (b[0] - a[0]);
      const h = 1 / (b[1] - a[1]);
      const [x0, y0, x1, y1] = spot.rect ?? [0, 0, 1, 1];
      overlay
        .rect(
          -a[0] * w + x0 * w,
          -a[1] * h + y0 * h,
          (x1 - x0) * w,
          (y1 - y0) * h,
        )
        .stroke({ width: 4, color: 0xffd34d });
    }
  }

  // --- holds (prototype) ------------------------------------------------------
  // Press and hold the chest (heartbeat), lips or a hand for HOLD_PRESS
  // seconds. From spark the hold runs (live2dRig.js setHold, HOLD_EFFECTS):
  // the look, blush, quickened breath and parted lips as that hold has
  // them, warmth climbs (warmth.hold), and a ring under the finger beats
  // with his heart rate. Below spark, or released
  // early, it's an ordinary tap. The drawer's buttons do the same without
  // aiming. Preview only: no lines of its own yet.
  //
  // The chest hold is the heartbeat check: warmth comes from taps and
  // strokes, and the check reads it. He acts cool (his own eyes, steady
  // breath, closed lips, a faint flush) while the monitor shows how worked up he is.
  // Tease (secret, bound only): from a chest hold, drag down (TEASE_DRAG of
  // the chest spot's height, mostly downward) and the hold turns into the
  // old heartbeat hold plus bliss. Nothing on screen mentions it.
  const HOLD_PRESS = 0.6;
  const HOLD_SPOTS = { chest: "heartbeat", lips: "lips", hand_l: "hand", hand_r: "hand" };
  // What each hold does (live2dRig.js setHold). The hand hold has no parted
  // lips or quickened breath: just the look and a gentler flush.
  const HOLD_EFFECTS = {
    // No hold look (the lowered lids, eyes up through the lashes are tease's):
    // he glances down at the touch (peek), then his eyes go back to his
    // mood's, playing it cool.
    heartbeat: { pulse: 1, peek: 1, blush: 0.25 },
    // No parted lips on the lips hold: the look and a flush.
    lips: { look: 1, blush: 0.7 },
    hand: { look: 1, blush: 0.4 },
    // The first heartbeat hold's settings, plus bliss past the top.
    // After the first glance at the touch, he glances down every few
    // seconds (glanceEvery); a shy gaze also breaks eye contact.
    tease: { heartbeat: 1, lips: 1, look: 1, blush: 1, bliss: 1, glanceEvery: [3, 6] },
  };
  // How much each hold warms him (warmth.hold scale): what's left on his
  // face once the hold's own blush falls away. The heartbeat check reads
  // warmth rather than adding to it.
  const HOLD_WARMTH = { heartbeat: 0, lips: 1.3, hand: 1, tease: 1.6 };
  const TEASE_TIER = "bound";
  const TEASE_DRAG = 0.5;

  // The caught tease (close): the same drag down, a tier early, and he
  // stops it. He wants it and doesn't let it happen: the hold ends on his
  // side, a small flinch and gasp (lips part, a hint of surprise:
  // live2dRig.js gasp), a shy face (CAUGHT_MOOD), a shy head
  // shake ("not right now": live2dRig.js shakeHead, or the model's own
  // CAUGHT_CLIP where it has one, Towa's), his caughtTease pose if rig.json
  // sets one (reactionPoses.caughtTease; none otherwise, the shake carries
  // it) and a "not yet" line. No bliss, no crest.
  const CAUGHT_TIER = "close";
  // `after`: seconds he lets the drag go on (the check carrying on as it
  // is) before he catches it; let go sooner and it's just the hold ending.
  // `line`: seconds after the catch his line starts, once the gasp has
  // parted his lips, so his mouth moves with the words after it.
  const CAUGHT = { after: 1.2, flinch: 0.4, poseHold: 2, face: 4, line: 0.6 };
  const CAUGHT_CLIP = "m_shakehead_noloop";
  // Shy about it: a soft smile or smirk, flushed. smile_blush where that
  // reads soft and keeps the eyes open; rig.json moods.caught_shy where it
  // doesn't (Haku's is a grin; Edward, Ritsu, Shion, Tohma and Yuri's shut
  // the eyes; Haru's casual opens his; Subaru and Romeo have no soft open-eyed smile, so a blush).
  const CAUGHT_MOOD = "caught_shy";
  const CAUGHT_MOOD_DEFAULT = "smile_blush";
  // Placeholder lines, one per character, drafted later from each
  // reference/<id>.md; anyone without one says CAUGHT_FALLBACK. Zenji's
  // answers the intention, never the contact; Rui's wants what his curse
  // refuses.
  const CAUGHT_LINES = {};
  const CAUGHT_FALLBACK = "Not yet.";
  function catchTease() {
    holding = null;
    renderer.setHold({});
    warmth.endHold();
    renderer.flinch(null, CAUGHT.flinch);
    const t = scene.time;
    const face = renderer.rig.expressions?.moods?.[CAUGHT_MOOD] ? CAUGHT_MOOD : CAUGHT_MOOD_DEFAULT;
    renderer.setMood(face);
    hangout.pendingMood = null;
    hangout.moodUntil = t + CAUGHT.face;
    const pose = forTier(renderer.rig.reactionPoses?.caughtTease, hangout.tier);
    if (pose) renderer.playPose(pose, CAUGHT.poseHold);
    if (pose || !renderer.playClip(CAUGHT_CLIP)) renderer.shakeHead();
    // A small gasp, then the line.
    renderer.gasp();
    const line = CAUGHT_LINES[character] ?? CAUGHT_FALLBACK;
    setTimeout(() => hangout.say(line), CAUGHT.line * 1000);
  }

  // Tease's peak: it's too much for him, not a climax. Held on past full
  // bliss for CREST.after seconds, the crest builds over CREST.build (his
  // breath catches, the blush climbs into the ears, his eyes squeeze shut:
  // live2dRig.js setCrest); full for CREST.hold, he breaks away. The hold
  // ends on his side (the finger's release does nothing), he flinches back
  // into his bound chestTouch pose with BREAK_MOOD's face and says a break line. Then a
  // slow comedown: his squeezed eyes open over CREST.eyesOpen seconds, the
  // rest of the crest (caught breath, deep blush) eases off over CREST.fall
  // seconds, the hold's blush, breath and bliss over CREST.release (not a
  // hold's usual 4s), his parted lips over CREST.lipsFall, his heavy lids
  // (and the flutter) over CREST.lidsFall, and no more glancing down. Warmth stays at its cap and drifts as usual, and the
  // monitor stays up for CREST.afterglow while his pulse settles.
  const CREST = { after: 2.5, build: 1.5, hold: 0.8, fall: 8, eyesOpen: 0.5, release: 16, lipsFall: 3, lidsFall: 4, afterglow: 20, flinch: 0.8 };
  // Placeholder break lines, one per character, to be drafted from each
  // reference/<id>.md; anyone without one says BREAK_FALLBACK.
  const BREAK_LINES = {};
  const BREAK_FALLBACK = "Okay. Okay, that's enough.";
  // His face as he breaks away: eyes open, caught out, flushed. Every rig
  // has this mood.
  const BREAK_MOOD = "surprise_blush";
  let crest = 0; // 0-1, eased
  let squeeze = 0; // his eyes' share of the crest; drops fast at the break
  let crestClock = 0; // seconds at full bliss, then into the crest
  let afterglowUntil = 0;

  function crestFrame(dt) {
    const teasing = holding?.on && holding.kind === "tease";
    const full = teasing && (renderer.hold?.bliss ?? 0) > 0.99;
    crestClock = full ? crestClock + dt : 0;
    const want = full && crestClock > CREST.after ? 1 : 0;
    crest = want ? Math.min(1, crest + dt / CREST.build) : Math.max(0, crest - dt / CREST.fall);
    squeeze = want ? crest : Math.max(0, Math.min(crest, squeeze - dt / CREST.eyesOpen));
    // Eased, so the comedown tapers rather than stopping on a line.
    const ease = (x) => x * x * (3 - 2 * x);
    renderer.setCrest(ease(crest), ease(squeeze));
    if (full && crest >= 1 && crestClock > CREST.after + CREST.build + CREST.hold) breakAway();
  }
  function breakAway() {
    holding = null;
    crestClock = 0;
    // Once he's broken away he stops glancing down, and his lips close and
    // heavy lids lift sooner (CREST.lipsFall, lidsFall) than the rest.
    renderer.setHold({}, { release: CREST.release, fall: { lips: CREST.lipsFall, lids: CREST.lidsFall }, glances: false });
    warmth.endHold();
    warmth.bump(1);
    afterglowUntil = scene.time + CREST.afterglow;
    renderer.flinch(null, CREST.flinch);
    hangout.moodUntil = scene.time; // lets go of TEASE_MOOD's hold
    hangout.react("chestTouch", scene.time, "chest");
    // The chestTouch pose and timing, but his face is BREAK_MOOD: some bound
    // chestTouch faces close the eyes (Haku's e_egao_00 crescent smile),
    // which read as the crest's squeeze never letting go.
    renderer.setMood(BREAK_MOOD);
    hangout.say(BREAK_LINES[character] ?? BREAK_FALLBACK);
  }
  const TAP_REACTION = { chest: "chestTouch", lips: "lipsTouch", hand_l: "handTap", hand_r: "handTap" };
  const holdOpen = () => DIALOGUE_TIERS.indexOf(hangout.tier) >= DIALOGUE_TIERS.indexOf("spark");
  let holding = null; // { spot, kind, point, held, on }
  const pulse = new Graphics();
  pulse.zIndex = 1e6 + 1;
  renderer.view.addChild(pulse);
  let beatClock = 0;

  function beginHold(spot, point, kind = HOLD_SPOTS[spot]) {
    holding = { spot, kind, point, start: point, held: 0, on: false };
  }
  // A chest hold dragged down far enough turns into tease, at bound only.
  // At close the same drag is caught instead (catchTease).
  function maybeTease() {
    const tier = hangout.tier;
    if (holding?.kind !== "heartbeat" || (tier !== TEASE_TIER && tier !== CAUGHT_TIER) || !holding.start) return;
    const [dx, dy] = [holding.point[0] - holding.start[0], holding.point[1] - holding.start[1]];
    if (dy < TEASE_DRAG * spotHeight("chest") || dy < Math.abs(dx)) return;
    if (tier === CAUGHT_TIER) {
      holding.catchAt ??= holding.held + CAUGHT.after;
      return;
    }
    holding.kind = "tease";
    if (holding.on) renderer.setHold({ ...HOLD_EFFECTS.tease, glance: glanceAt(holding.point) });
    teaseFace();
  }
  // TEASE_MOOD, where rig.json has one (Haru's casual open eyes), is his
  // face for the whole tease: held until the hold ends, then his rest face.
  // Without it the tease plays over his resting face.
  const TEASE_MOOD = "tease";
  function teaseFace() {
    if (!renderer.rig.expressions?.moods?.[TEASE_MOOD]) return;
    renderer.setMood(TEASE_MOOD);
    hangout.pendingMood = null;
    hangout.moodUntil = Infinity;
  }
  function startHold() {
    if (!holdOpen()) {
      say(`(${holding.kind} hold opens at spark; this is a tap at ${hangout.tier})`);
      const { spot } = holding;
      holding = null;
      hangout.react(TAP_REACTION[spot], scene.time, spot);
      return;
    }
    if (!warmth.on) {
      warmPick.value = "hangout";
      warmPick.onchange();
    }
    holding.on = true;
    beatClock = 0;
    // The hold's own interaction: no tap reaction (no flinch, pose or tap
    // line); the hold look and its blush (live2dRig.js setHold) build over
    // his resting face and fall away after.
    renderer.setHold({ ...HOLD_EFFECTS[holding.kind], glance: glanceAt(holding.point ?? spotCenter(holding.spot)) });
  }
  function endHold() {
    if (!holding) return;
    const { on, spot, point, kind } = holding;
    holding = null;
    renderer.setHold({});
    warmth.endHold();
    if (kind === "tease") hangout.moodUntil = scene.time;
    if (!on && point) scene.onTap?.(hangout.tapAt(point, scene.time));
    else if (!on) hangout.react(TAP_REACTION[spot], scene.time, spot);
  }
  scene.onPointer = (type, point) => {
    if (type === "down") {
      const spot = hotspotAt(renderer.rig, renderer, point);
      if (!HOLD_SPOTS[spot]) return false;
      beginHold(spot, point);
      return true;
    }
    if (type === "move" && holding?.point) {
      holding.point = point;
      maybeTease();
    }
    if (type === "up") endHold();
    return false;
  };

  holdFrame = (dt) => {
    if (holding) {
      holding.held += dt;
      if (holding.held >= HOLD_PRESS && !holding.on) startHold();
      if (holding?.on) warmth.hold(dt, HOLD_WARMTH[holding.kind]);
      if (holding?.catchAt != null && holding.held >= holding.catchAt) catchTease();
    }
    crestFrame(dt);
    drawPulse(dt);
  };

  // Where his eyes go first: toward the touch, as EyeBall x/y (down is -),
  // from its offset to the middle of his face.
  function glanceAt([px, py]) {
    const [fx, fy] = spotCenter("cheek");
    const clamp = (v) => Math.max(-1, Math.min(1, v));
    return [clamp((px - fx) / 500) * 0.7, clamp(-(py - fy) / 400) * 0.8];
  }

  // A hotspot rect's height, in the model's reference space.
  function spotHeight(id) {
    const spot = renderer.rig.hotspots?.[id];
    const a = spot && renderer.partUV(spot.part, [0, 0]);
    const b = spot && renderer.partUV(spot.part, [1, 1]);
    if (!a || !b) return 200;
    const [, y0, , y1] = spot.rect ?? [0, 0, 1, 1];
    return (y1 - y0) / (b[1] - a[1]);
  }

  // The middle of a hotspot's rect, in the model's reference space.
  function spotCenter(id) {
    const spot = renderer.rig.hotspots?.[id];
    const a = spot && renderer.partUV(spot.part, [0, 0]);
    const b = spot && renderer.partUV(spot.part, [1, 1]);
    if (!a || !b) return [1000, 1300];
    const w = 1 / (b[0] - a[0]);
    const h = 1 / (b[1] - a[1]);
    const [x0, y0, x1, y1] = spot.rect ?? [0, 0, 1, 1];
    return [-a[0] * w + ((x0 + x1) / 2) * w, -a[1] * h + ((y0 + y1) / 2) * h];
  }

  // Lub-dub: two faint rings per beat at his heart rate (renderer.heartRate),
  // widening and fading under the finger, on every hold. Kept thin and low:
  // the heart monitor carries the heartbeat, the rings just say "held".
  function drawPulse(dt) {
    pulse.clear();
    drawHint(dt);
    if (holding?.on || scene.time < afterglowUntil) beatClock = (beatClock + dt / (60 / renderer.heartRate)) % 1;
    drawMonitor(dt);
    if (!holding?.on) return;
    const [x, y] = holding.point ?? spotCenter(holding.spot);
    for (const [start, strength] of [[0, 1], [0.28, 0.6]]) {
      const p = beatClock - start;
      if (p < 0 || p > 0.5) continue;
      const k = p / 0.5;
      pulse.circle(x, y, 28 + 46 * k).stroke({ width: 2.5 * (1 - k) + 1, color: 0xff8fa8, alpha: 0.4 * strength * (1 - k) });
    }
  }

  // --- heart monitor (heartbeat hold) ----------------------------------------
  // A beating heart, a scrolling ECG trace and his bpm while a chest hold
  // runs, docked on the dialogue box's top edge beside the meter (not the
  // stage top: Discord's chrome covers it); it fades out on release. The
  // trace's spike lands on the ring's "lub" (beatClock 0) and the heart
  // thumps with both beats.
  const monitor = $("#heart-monitor");
  const heartIcon = monitor.querySelector(".heart");
  const ecg = $("#ecg").getContext("2d");
  const ECG_SECONDS = 2; // trace width, in seconds of signal
  const trace = []; // recent y samples (0 = baseline), newest last
  let traceT = 0;
  // One beat of an ECG, phase 0-1 (spike at 0): small P before, the QRS
  // spike, then a T wave; flat between.
  const ecgAt = (phase) => {
    const bump = (c, w, h) => {
      const d = ((phase - c + 1.5) % 1) - 0.5; // wrapped distance to c
      return h * Math.exp(-(d * d) / (2 * w * w));
    };
    return bump(0.92, 0.025, 0.12) + bump(0.0, 0.008, 1) + bump(0.03, 0.008, -0.35) + bump(0.98, 0.006, -0.15) + bump(0.3, 0.04, 0.25);
  };
  function drawMonitor(dt) {
    const on = (holding?.on && (holding.kind === "heartbeat" || holding.kind === "tease")) || scene.time < afterglowUntil;
    monitor.classList.toggle("on", Boolean(on));
    if (!on) {
      trace.length = 0;
      return;
    }
    const { width: w, height: h } = ecg.canvas;
    const step = ECG_SECONDS / w;
    for (traceT += dt; traceT >= step; traceT -= step) trace.push(ecgAt(beatClock));
    if (trace.length > w) trace.splice(0, trace.length - w);
    ecg.clearRect(0, 0, w, h);
    ecg.lineWidth = 3;
    ecg.lineJoin = "round";
    ecg.strokeStyle = "#ff8fa8";
    ecg.beginPath();
    const x0 = w - trace.length;
    trace.forEach((v, i) => ecg[i ? "lineTo" : "moveTo"](x0 + i, h * 0.62 - v * h * 0.5));
    ecg.stroke();
    const after = (start) => (beatClock >= start ? Math.exp(-(beatClock - start) * 14) : 0);
    const thump = Math.max(after(0), 0.6 * after(0.28));
    heartIcon.style.transform = `scale(${1 + 0.22 * thump})`;
    $("#bpm").textContent = Math.round(renderer.pulseBpm);
  }

  // --- onboarding: first-time hold hint ---------------------------------------
  // The first time a player is at spark or above, a pill above the box says
  // the holds exist, and a faint dot breathes on his hand to show where. It goes
  // once a hold lands (remembered in localStorage, so once per browser) or
  // after HINT_SECONDS. ?hints=1 shows it again. Strokes get a line here once
  // they're built (§4.2).
  const HINT_KEY = "hangout.holdHintSeen";
  const HINT_SECONDS = 9;
  const coach = $("#coach");
  let hint = null; // { left } seconds until it fades
  const hintSeen = () => {
    if (params.get("hints") === "1") return false;
    try {
      return localStorage.getItem(HINT_KEY) === "1";
    } catch {
      return false;
    }
  };
  function markHintSeen() {
    try {
      localStorage.setItem(HINT_KEY, "1");
    } catch {}
  }
  function maybeShowHint() {
    if (hint || !holdOpen() || hintSeen()) return;
    hint = { left: HINT_SECONDS };
    coach.textContent = "New: press and hold his hand, lips or chest";
    coach.classList.remove("fade");
    coach.hidden = false;
  }
  function endHint() {
    if (!hint) return;
    hint = null;
    markHintSeen();
    coach.classList.add("fade");
    setTimeout(() => (coach.hidden = true), 500);
  }
  function drawHint(dt) {
    if (!hint) return;
    hint.left -= dt;
    if (hint.left <= 0 || holding?.on) return endHint();
    const id = renderer.rig.hotspots?.hand_r ? "hand_r" : "hand_l";
    if (!renderer.rig.hotspots?.[id]) return;
    const [x, y] = spotCenter(id);
    const k = (1 - Math.cos(scene.time * Math.PI)) / 2; // ~2s breath
    pulse.circle(x, y, 14 + 10 * k).fill({ color: 0xffffff, alpha: 0.12 + 0.18 * k });
  }
  maybeShowHint();

  // --- controls -------------------------------------------------------------
  const panel = $("#controls");
  const section = (title) => {
    const h = document.createElement("h3");
    h.textContent = title;
    const row = document.createElement("div");
    row.className = "row";
    panel.append(h, row);
    return row;
  };
  const button = (row, label, onClick) => {
    const b = document.createElement("button");
    b.textContent = label;
    b.onclick = onClick;
    row.append(b);
    return b;
  };

  // Switching reloads the page for that character, keeping the tier.
  const charRow = section("Character");
  const charPick = document.createElement("select");
  for (const id of CHARACTERS)
    charPick.append(new Option(id[0].toUpperCase() + id.slice(1), id));
  charPick.value = character;
  charPick.onchange = () => {
    const next = new URLSearchParams(location.search);
    next.set("character", charPick.value);
    next.set("tier", hangout.tier);
    next.delete("pose");
    next.delete("outfit");
    location.search = next;
  };
  charRow.append(charPick);

  // Outfits reload too, so the /meet demo draws from that outfit's variant.
  const outfitNames = Object.keys(renderer.source.outfits ?? {});
  if (outfitNames.length > 1) {
    const outfitPick = document.createElement("select");
    for (const name of outfitNames) outfitPick.append(new Option(name, name));
    outfitPick.value = renderer.outfit;
    outfitPick.onchange = () => {
      const next = new URLSearchParams(location.search);
      next.set("outfit", outfitPick.value);
      next.set("tier", hangout.tier);
      location.search = next;
    };
    charRow.append(outfitPick);
  }

  // Named model parts (PartHat, PartHairFront...), toggled off to see what
  // a layer covers; ?hide=PartHat,PartX starts them hidden. Preview only.
  const partRow = section("Model parts (toggle to hide)");
  const startHidden = new Set((params.get("hide") ?? "").split(",").filter(Boolean));
  for (const id of renderer.partIds.filter((id) => /^Part[A-Za-z]/.test(id))) {
    const b = button(partRow, id.replace(/^Part/, ""), () => {
      const hide = !b.classList.contains("on");
      b.classList.toggle("on", hide);
      renderer.setPartHidden(id, hide);
    });
    if (startHidden.has(id)) b.click();
  }

  const moodRow = section("Moods (Live2D expressions)");
  for (const name of Object.keys(renderer.rig.expressions?.moods ?? {})) {
    button(moodRow, name, () => hangout.setBase({ mood: name }));
  }

  // Every expression the model ships, moods or not; toggles stack, so a
  // candidate mood (e_odoroki_00 + e_sekimen_00) can be tried before it goes
  // into rig.json. A mood button or reaction replaces the stack.
  const exprRow = section("All model expressions (toggles stack)");
  const stack = new Set();
  for (const name of renderer.expressionParams.keys()) {
    const b = button(exprRow, name.replace(/^e_/, ""), () => {
      stack.has(name) ? stack.delete(name) : stack.add(name);
      b.classList.toggle("on", stack.has(name));
      renderer.setExpressions([...stack]);
      say(stack.size ? [...stack].join(" + ") : "(no expressions)");
    });
  }
  button(exprRow, "clear", () => {
    stack.clear();
    exprRow.querySelectorAll("button").forEach((x) => x.classList.remove("on"));
    renderer.setExpressions([]);
  });

  const tierRow = section("Relationship tier");
  const tierPick = document.createElement("select");
  for (const tier of DIALOGUE_TIERS) tierPick.append(new Option(tier, tier));
  tierPick.value = hangout.tier;
  tierPick.onchange = () => {
    hangout.setTier(tierPick.value);
    warmth.setTier(tierPick.value);
    maybeShowHint();
    newEncounter();
  };
  tierRow.append(tierPick);
  button(tierRow, "new /meet encounter", () => newEncounter());

  const reactRow = section("Reactions (with their poses)");
  for (const name of Object.keys({
    ...DEFAULT_REACTIONS,
    ...renderer.rig.reactions,
  })) {
    const pose = forTier(renderer.rig.reactionPoses?.[name], hangout.tier);
    button(reactRow, pose ? `${name} · ${pose.replace(/^m_/, "")}` : name, () =>
      hangout.react(name, scene.time),
    );
  }

  const spotRow = section("Touch spots");
  for (const spot of Object.keys(TOUCH_SPOTS)) {
    button(spotRow, spot, () => {
      if (!renderer.rig.hotspots?.[spot])
        return say(`(${spot} isn't placed on this outfit)`);
      hangout.react(
        renderer.rig.hotspots[spot].reaction ?? TOUCH_SPOTS[spot],
        scene.time,
        spot,
      );
    });
  }
  const spotToggle = button(spotRow, "show hotspots", () => {
    showSpots = !showSpots;
    spotToggle.classList.toggle("on", showSpots);
  });

  // A pose button plays and holds it; a second click plays its return.
  const poseRow = section("Poses (hold until clicked again)");
  for (const pose of renderer.poses) {
    const b = button(poseRow, pose.replace(/^m_/, ""), () => {
      poseRow
        .querySelectorAll("button")
        .forEach((x) => x.classList.remove("on"));
      if (renderer.posing === pose) return renderer.leavePose();
      renderer.playPose(pose);
      b.classList.add("on");
    });
  }

  // How much idle sway and breathing to keep (rig.json motion.idle/breath
  // .amount); live only, copy a value you like into rig.json.
  const idleRow = section("Idle motion");
  for (const name of ["idle", "breath", "sway"]) {
    const params = ((renderer.rig.motion ??= {})[name] ??= {});
    const wrap = document.createElement("label");
    wrap.className = "slider";
    const fallback = name === "sway" ? 0 : 1;
    const input = Object.assign(document.createElement("input"), {
      type: "range",
      min: 0,
      max: 1,
      step: 0.05,
      value: params.amount ?? fallback,
    });
    const out = document.createElement("output");
    out.textContent = input.value;
    input.oninput = () => {
      params.amount = Number(input.value);
      if (name === "sway") renderer.setSway(params.amount);
      out.textContent = input.value;
    };
    wrap.append(`${name}.amount`, input, out);
    idleRow.append(wrap);
  }

  // --- warmth prototype (docs/hangout-activity.md §12.7) ---------------------
  // "date" is the spec'd profile (close/bound only); "hangout" the proposal
  // for ordinary Hangouts (spark+ only, lower cap, upset clears it). Taps
  // and real /meet answers feed it; the buttons stand in for gestures that
  // aren't built yet. Dragging the slider pins a value to judge the look.
  const warmRow = section("Warmth (prototype, §12.7)");
  const warmPick = document.createElement("select");
  for (const [v, label] of [["", "off"], ["date", "date (close/bound)"], ["hangout", "ordinary Hangout (spark+)"]])
    warmPick.append(new Option(label, v));
  warmPick.onchange = () => {
    warmth = new Warmth(warmPick.value || null, hangout.tier);
    warmthManual = null;
    if (warmPick.value && !warmth.on)
      say(`(warmth "${warmPick.value}" is off at ${hangout.tier}: pick ${warmPick.value === "date" ? "close or bound" : "spark, close or bound"})`);
  };
  warmPick.value = "hangout";
  warmRow.append(warmPick);
  const warmOut = Object.assign(document.createElement("output"), { id: "warmth-out" });
  warmRow.append(warmOut);
  button(warmRow, "fave answer", () => warmth.answer("fave"));
  button(warmRow, "liked answer", () => warmth.answer("liked"));
  button(warmRow, "stroke", () => warmth.stroke());
  button(warmRow, "hold 1s", () => {
    warmth.hold(1);
    warmth.endHold();
  });
  button(warmRow, "reset", () => warmth.setTier(hangout.tier));
  // Press-and-hold buttons for the holds, without aiming at the model.
  // Live tuning of the hold look (live2dRig.js HOLD_LOOK); copy values you
  // like back into the constant.
  for (const [key, max] of [["lookUp", 0.6], ["lids", 0.4], ["chin", 10], ["glanceIn", 1], ["glanceHold", 2.5], ["glanceLift", 2.5], ["glanceChin", 12]]) {
    const wrap = document.createElement("label");
    wrap.className = "slider";
    const input = Object.assign(document.createElement("input"), { type: "range", min: 0, max, step: max / 40, value: HOLD_LOOK[key] });
    const out = Object.assign(document.createElement("output"), { textContent: HOLD_LOOK[key] });
    input.oninput = () => {
      HOLD_LOOK[key] = Number(input.value);
      out.textContent = Number(input.value).toFixed(2);
    };
    wrap.append(`hold look: ${key}`, input, out);
    warmRow.append(wrap);
  }
  for (const [label, spot, kind] of [["hold: heartbeat", "chest"], ["hold: lips", "lips"], ["hold: hand", "hand_r"], ["hold: tease (bound)", "chest", "tease"]]) {
    const b = button(warmRow, label, () => {});
    b.onpointerdown = () => {
      if (kind === "tease" && hangout.tier !== TEASE_TIER) return say(`(tease is ${TEASE_TIER} only; this is ${hangout.tier})`);
      beginHold(spot, null, kind);
    };
    b.onpointerup = b.onpointerleave = () => holding?.spot === spot && endHold();
  }
  button(warmRow, "caught tease (close)", () =>
    hangout.tier === CAUGHT_TIER ? catchTease() : say(`(the caught tease is ${CAUGHT_TIER} only; this is ${hangout.tier})`),
  );
  const pinWrap = document.createElement("label");
  pinWrap.className = "slider";
  const pin = Object.assign(document.createElement("input"), { type: "range", min: 0, max: 1, step: 0.05, value: 0 });
  pin.oninput = () => (warmthManual = Number(pin.value));
  pin.onchange = () => (warmthManual = null);
  pinWrap.append("pin while dragging", pin);
  warmRow.append(pinWrap);
  const react = hangout.react.bind(hangout);
  hangout.react = (name, t, spot) => {
    const out = react(name, t, spot);
    warmth.reaction(name);
    return out;
  };

  // Phones run the Activity at MOBILE_FPS (main.js); this previews that.
  const perfRow = section("Performance");
  const capWrap = document.createElement("label");
  capWrap.className = "toggle";
  const cap = Object.assign(document.createElement("input"), {
    type: "checkbox",
    checked: params.has("mobile"),
  });
  cap.onchange = () => (scene.frameCap.maxFPS = cap.checked ? MOBILE_FPS : 0);
  capWrap.append(cap, "cap 30fps (mobile)");
  perfRow.append(capWrap);
  if (cap.checked) scene.frameCap.maxFPS = MOBILE_FPS;

  // --- effects prototype (docs/hangout-activity.md §10) ------------------------
  // Throwaway: every candidate effect, live. "auto" applies the rules that
  // would ship (Hotarubi rain, TZ night grade on day files, light blur).
  const fx = effects.state;
  const fxControls = [];
  const fxRow = (title) => section(title);
  const control = (row, label, el, read, write) => {
    const wrap = document.createElement("label");
    wrap.className = el.type === "checkbox" ? "toggle" : "slider";
    const out = el.type === "range" ? document.createElement("output") : null;
    const sync = () => {
      write(el);
      if (out) out.textContent = el.value;
    };
    el.oninput = el.onchange = () => {
      effects.set(read(el));
      if (out) out.textContent = el.value;
    };
    wrap.append(...(el.type === "checkbox" ? [el, label] : [label, el]), ...(out ? [out] : []));
    row.append(wrap);
    fxControls.push(sync);
  };
  const range = (min, max, step) => Object.assign(document.createElement("input"), { type: "range", min, max, step });
  const check = () => Object.assign(document.createElement("input"), { type: "checkbox" });
  const select = (options) => {
    const el = document.createElement("select");
    for (const o of options) el.append(new Option(o, o));
    return el;
  };
  const refreshFx = () => fxControls.forEach((f) => f());

  const placeRow = fxRow("Effects · background and auto rules (prototype)");
  const bgPick = document.createElement("select");
  const groups = {};
  bgPick.append(new Option("(current)", ""));
  for (const path of BACKGROUNDS) {
    const dir = path.split("/").at(-2);
    groups[dir] ??= bgPick.appendChild(Object.assign(document.createElement("optgroup"), { label: dir }));
    groups[dir].append(new Option(path.split("/").pop().replace(/\.png$/, ""), path));
  }
  bgPick.onchange = () => bgPick.value && scene.setBackground(bgPick.value);
  placeRow.append(bgPick);
  const timePick = select(["auto", "day", "evening"]);
  placeRow.append(timePick);
  const why = document.createElement("p");
  why.className = "fx-why";
  const runAuto = () => {
    const a = autoEffects(scene.backgroundUrl, new Date(), timePick.value);
    effects.set({ rain: a.rain, particles: a.particles, grade: a.grade, gradeStrength: a.gradeStrength, blur: a.blur });
    why.textContent = `auto: ${a.why.length ? a.why.join(" · ") : "no rule matched (day file, daytime)"} · blur 2`;
    refreshFx();
  };
  timePick.onchange = runAuto;
  button(placeRow, "apply auto rules", runAuto);
  const autoOnChange = check();
  autoOnChange.checked = true;
  const autoWrap = document.createElement("label");
  autoWrap.className = "toggle";
  autoWrap.append(autoOnChange, "re-run auto when the background changes");
  placeRow.append(autoWrap);
  button(placeRow, "all off", () => {
    effects.set({ rain: false, particles: null, grade: "none", rigLight: false, blur: 0, flicker: false, vignette: 0, grain: false });
    why.textContent = "";
    refreshFx();
  });
  placeRow.after(why);
  scene.onBackground = () => {
    effects.apply();
    if (autoOnChange.checked) runAuto();
  };

  const weatherRow = fxRow("Effects · weather and particles");
  control(weatherRow, "rain", check(), (el) => ({ rain: el.checked }), (el) => (el.checked = fx.rain));
  control(weatherRow, "rain density", range(0.1, 2, 0.1), (el) => ({ rainDensity: Number(el.value) }), (el) => (el.value = fx.rainDensity));
  control(weatherRow, "rain layer ", select(["both", "behind", "front"]), (el) => ({ rainLayer: el.value }), (el) => (el.value = fx.rainLayer));
  control(weatherRow, "particles ", select(["none", ...PARTICLE_KINDS]), (el) => ({ particles: el.value === "none" ? null : el.value }), (el) => (el.value = fx.particles ?? "none"));
  control(weatherRow, "particle density", range(0.1, 2, 0.1), (el) => ({ particleDensity: Number(el.value) }), (el) => (el.value = fx.particleDensity));
  control(weatherRow, "particle layer ", select(["behind", "front", "both"]), (el) => ({ particleLayer: el.value }), (el) => (el.value = fx.particleLayer));

  const lightRow = fxRow("Effects · color grade and light");
  control(lightRow, "grade ", select(Object.keys(GRADES)), (el) => ({ grade: el.value }), (el) => (el.value = fx.grade));
  control(lightRow, "grade strength", range(0, 1, 0.05), (el) => ({ gradeStrength: Number(el.value) }), (el) => (el.value = fx.gradeStrength));
  control(lightRow, "light the rig too (touches the rig)", check(), (el) => ({ rigLight: el.checked }), (el) => (el.checked = fx.rigLight));
  control(lightRow, "rig grade strength", range(0, 1, 0.05), (el) => ({ rigStrength: Number(el.value) }), (el) => (el.value = fx.rigStrength));
  control(lightRow, "flicker (neon / candle)", check(), (el) => ({ flicker: el.checked }), (el) => (el.checked = fx.flicker));

  const lensRow = fxRow("Effects · lens");
  control(lensRow, "background blur", range(0, 10, 0.5), (el) => ({ blur: Number(el.value) }), (el) => (el.value = fx.blur));
  control(lensRow, "vignette", range(0, 0.9, 0.05), (el) => ({ vignette: Number(el.value) }), (el) => (el.value = fx.vignette));
  control(lensRow, "film grain (whole stage)", check(), (el) => ({ grain: el.checked }), (el) => (el.checked = fx.grain));

  if (params.get("bg")) scene.setBackground(params.get("bg"));
  runAuto();

  // --- VN chrome ------------------------------------------------------------
  $("#btn-debug").onclick = () => {
    panel.hidden = !panel.hidden;
    document.body.classList.toggle("drawer-open", !panel.hidden);
    // Pixi's resizeTo only watches the window, so nudge it to re-fit the
    // canvas to the stage's new width.
    dispatchEvent(new Event("resize"));
  };
  const toggleUi = () => {
    const hidden = document.body.classList.toggle("hide-ui");
    $("#btn-hide-ui").setAttribute("aria-pressed", String(hidden));
  };
  $("#btn-hide-ui").onclick = toggleUi;
  // DEBUG default: start with the drawer open.
  panel.hidden = false;
  document.body.classList.add("drawer-open");
  dispatchEvent(new Event("resize"));
  addEventListener("keydown", (e) => {
    if (
      e.key.toLowerCase() === "h" &&
      !e.target.closest("input, select, textarea")
    )
      toggleUi();
  });

  // --- /meet (docs/hangout-activity.md §11.2) --------------------------------
  // The Activity's own flow (meet.js), fed by the dev server's /__meet: the
  // tier's first level, no boost or errand, nothing recorded.
  const flow = meetFlow(scene, {
    box: $(".vn-box"),
    choices: $("#choices"),
    next: $("#btn-next"),
  });

  async function newEncounter() {
    flow.stop();
    const q = new URLSearchParams({
      character,
      tier: hangout.tier,
      variant: renderer.rig.dialogueVariant ?? "uniform",
    });
    const res = await fetch(`/__meet/beat?${q}`);
    const beat = await res.json();
    if (!res.ok) return say(`(no /meet encounter: ${beat.error})`);
    if (beat.background)
      scene
        .setBackground(beat.background)
        .catch((err) => console.error(`[hangout-v2] ${err.message}`));
    flow.play(beat, async (type) => {
      const a = new URLSearchParams({
        character,
        tier: hangout.tier,
        type,
        mood: beat.mood ? "1" : "0",
      });
      const answer = await fetch(`/__meet/answer?${a}`);
      const result = await answer.json();
      if (!answer.ok) throw new Error(result.error);
      return result;
    });
  }

  newEncounter();
  if (renderer.poses.includes(params.get("pose")))
    renderer.playPose(params.get("pose"));
  window.__hangoutV2 = scene;
}

main().catch((err) => {
  $("#controls").textContent = `hangout v2 failed: ${err.message}`;
  console.error(`[hangout-v2] ${err.stack ?? err.message}`);
});
