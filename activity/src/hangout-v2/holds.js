// Holds (docs/hangout-activity.md §4, "Hold feedback" onward): press and
// hold his chest (the heartbeat check), lips or a hand, from spark. Shared
// by the Activity (main.js) and the dev preview (preview.js), which adds
// debug buttons through the returned handle.
//
// attachHolds(scene, options) takes over scene.onPointer and wraps
// scene.frame (call it after anything else replaces scene.frame, like
// attachWarmth). Options:
//   warmth    () => the Warmth it feeds (warmth.js); a getter, since the
//             preview swaps its Warmth when the drawer's picker changes
//   onStart   called as a hold starts (the preview turns warmth on)
//   debug     (text) => void for dev-only notes (the preview's `say`)
//   showHint  true shows the first-time hint even if it was seen (?hints=1)
// The page may have #heart-monitor (with .heart, #ecg, #bpm) and #coach;
// without them the monitor and hint are skipped.

import { Graphics } from "pixi.js";

import { DIALOGUE_TIERS } from "../../../constants/tiers.js";
import { forTier, resolveReaction } from "../hangout/reactions.js";
import { typeDuration, UPSET_READ, UPSET_FADE } from "../hangout/hangout.js";
import { hotspotAt } from "../hangout/hotspots.js";

const $ = (sel) => document.querySelector(sel);

export function attachHolds(scene, { warmth, onStart, debug, showHint = false }) {
  const { renderer, hangout } = scene;

  // Press and hold the chest (heartbeat), lips or a hand for HOLD_PRESS
  // seconds. From spark the hold runs (live2dRig.js setHold, HOLD_EFFECTS):
  // the look, blush, quickened breath and parted lips as that hold has
  // them, warmth climbs (warmth.hold), and a ring under the finger beats
  // with his heart rate. Below spark, or released
  // early, it's an ordinary tap. The drawer's buttons do the same without
  // aiming. Letting go of a hold that ran says a line from his HOLD_LINES
  // pool for that hold (constants/hangout/<id>.js, spark to bound).
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
    // The lip and hand holds, every tier: the look with his eyes at their
    // normal opening (lids: 0; heavy lids are tease's and the caught
    // tease's) and a flush. No parted lips. The hand hold is affection, not
    // pleasure; both open with a brief widen, no glance (startHold).
    lips: { look: 1, lids: 0, blush: 0.7 },
    hand: { look: 1, lids: 0, blush: 0.4 },
    // The first heartbeat hold's settings, plus bliss past the top.
    // After the first glance at the touch, he glances down every few
    // seconds (glanceEvery); a shy gaze also breaks eye contact.
    tease: { heartbeat: 1, lips: 1, look: 1, blush: 1, bliss: 1, glanceEvery: [3, 6] },
  };
  // Holds that open with a brief widen instead of a glance at the touch.
  const HOLD_WIDEN = new Set(["lips", "hand"]);
  // How much each hold warms him (warmth.hold scale): what's left on his
  // face once the hold's own blush falls away. The heartbeat check reads
  // warmth rather than adding to it.
  const HOLD_WARMTH = { heartbeat: 0, lips: 1.3, hand: 1, tease: 1.6 };
  // Each hold's release pool (and reaction face). Tease let go before the
  // crest has its own, `teaseLetGo`: he was close to the edge and you
  // stopped. Nothing he says names tease.
  const HOLD_LINES = { heartbeat: "heartbeatHold", lips: "lipHold", hand: "handHold", tease: "teaseLetGo" };
  // Seconds the faces after a tease (the let-go, the caught tease, the
  // break at the crest) hold past their usual time before his idle face:
  // he's still caught up in it.
  const TEASE_LINGER = 2;
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
  const CAUGHT = { after: 1.2, flinch: 0.4, poseHold: 2, face: 4 + TEASE_LINGER, line: 0.6 };
  const CAUGHT_CLIP = "m_shakehead_noloop";
  // Shy about it: a soft smile or smirk, flushed. smile_blush where that
  // reads soft and keeps the eyes open; rig.json moods.caught_shy where it
  // doesn't (Haku's is a grin; Edward's is his sharp e_smirk_00 smirk,
  // flushed; Ritsu, Shion, Tohma and Yuri's shut the eyes; Haru's casual opens his, his academy and house (no open-eye art) use e_kirismile_00; Subaru and Romeo have no soft open-eyed smile, so a blush).
  const CAUGHT_MOOD = "caught_shy";
  const CAUGHT_MOOD_DEFAULT = "smile_blush";
  // His close `caughtTease` pool (constants/hangout/<id>.js); anyone
  // without one says CAUGHT_FALLBACK. Zenji's answers the intention, never
  // the contact; Rui's wants what his curse refuses.
  const CAUGHT_FALLBACK = "Not yet.";
  function catchTease() {
    holding = null;
    renderer.setHold({});
    warmth()?.endHold();
    renderer.flinch(null, CAUGHT.flinch);
    const t = scene.time;
    const face = renderer.rig.expressions?.moods?.[CAUGHT_MOOD] ? CAUGHT_MOOD : CAUGHT_MOOD_DEFAULT;
    renderer.setMood(face);
    hangout.pendingMood = null;
    const line = hangout.line("caughtTease") ?? CAUGHT_FALLBACK;
    // Like upset's: the face outlasts its line (typed out, then UPSET_READ to
    // read it) and eases back over UPSET_FADE instead of snapping off.
    hangout.moodUntil = t + Math.max(CAUGHT.face, CAUGHT.line + typeDuration(line) / 1000 + UPSET_READ);
    hangout.moodFadeOut = UPSET_FADE;
    const pose = forTier(renderer.rig.reactionPoses?.caughtTease, hangout.tier);
    if (pose) renderer.playPose(pose, CAUGHT.poseHold);
    if (pose || !renderer.playClip(CAUGHT_CLIP)) renderer.shakeHead();
    // A small gasp, then the line.
    renderer.gasp();
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
  // His bound `breakAway` pool (constants/hangout/<id>.js); anyone without
  // one says BREAK_FALLBACK.
  const BREAK_FALLBACK = "Okay. Okay, that's enough.";
  // His face as he breaks away: eyes open, caught out, flushed. Every rig
  // has BREAK_MOOD_DEFAULT; rig.json moods.break_away replaces it where
  // surprise reads too serious (Tohma's sly eyes, flushed). Keep it
  // open-eyed: a shut-eye face reads as the crest's squeeze never letting go.
  const BREAK_MOOD = "break_away";
  const BREAK_MOOD_DEFAULT = "surprise_blush";
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
    warmth()?.endHold();
    warmth()?.bump(1);
    afterglowUntil = scene.time + CREST.afterglow;
    renderer.flinch(null, CREST.flinch);
    hangout.moodUntil = scene.time; // lets go of TEASE_MOOD's hold
    hangout.react("chestTouch", scene.time, "chest");
    hangout.moodUntil += TEASE_LINGER;
    // The chestTouch pose and timing, but his face is BREAK_MOOD: some bound
    // chestTouch faces close the eyes (Haku's e_egao_00 crescent smile),
    // which read as the crest's squeeze never letting go.
    renderer.setMood(renderer.rig.expressions?.moods?.[BREAK_MOOD] ? BREAK_MOOD : BREAK_MOOD_DEFAULT);
    hangout.say(hangout.line("breakAway") ?? BREAK_FALLBACK);
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
  // TEASE_MOOD, where rig.json has one (Haru's casual open eyes, his
  // academy and house kirismile, Edward's smirk, Tohma's faint smile in the eyes alone), is his face for the whole
  // tease: held until the hold ends, then his rest face.
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
      debug?.(`(${holding.kind} hold opens at spark; this is a tap at ${hangout.tier})`);
      const { spot } = holding;
      holding = null;
      hangout.react(TAP_REACTION[spot], scene.time, spot);
      return;
    }
    onStart?.();
    holding.on = true;
    beatClock = 0;
    // The hold's own interaction: no tap reaction (no flinch, pose or tap
    // line); the hold look and its blush (live2dRig.js setHold) build over
    // his resting face and fall away after.
    // The lip and hand holds don't glance at the touch: his eyes go a little
    // wider for a moment and settle back (live2dRig.js widen), surprise
    // rather than a look down. The others glance at the touch first.
    const widens = HOLD_WIDEN.has(holding.kind);
    renderer.setHold({ ...HOLD_EFFECTS[holding.kind], glance: widens ? null : glanceAt(holding.point ?? spotCenter(holding.spot)) });
    if (widens) {
      renderer.widen();
      startArc();
    }
  }

  // The face arc (the lip and hand holds): his face moves while you hold,
  // not only when you let go. The widen first (startHold), then he goes
  // flustered (ARC_FLUSTER) at `fluster` seconds into the hold, then settles
  // into the hold's release face (rig.json reactions handHold / lipHold at
  // that tier, so each character settles where his lines land) at `settle`,
  // later at lower tiers and later again on the lips (`lipsLater`): it takes
  // him longer to get used to it. Every timing is a random span, so no two
  // holds play the same.
  // Settled, he isn't done: now and then (`flutter`, seconds between, the
  // lips more often) it catches up with him again and he flusters for
  // `flutterFor` seconds, with a small widen and a puff of hearts, then
  // settles back. Moving your finger (a thumb over his hand, tracing his
  // lips) by `move` reference units sets one off at once, at most every
  // `moveGap` seconds; while he's still flustered it puts off the settle by
  // `moveDelay`. Hearts come quicker while he's flustered (`heartsFast`) and
  // slower once he's settled (`heartsSlow`, HEARTS.every multipliers).
  // His face is held for the whole hold; letting go plays the release
  // reaction as before.
  const ARC_FLUSTER = "flustered";
  const ARC = {
    fluster: [0.9, 1.6],
    settle: { byTier: { spark: [6, 8], close: [4, 5.5], bound: [3, 4.5] } },
    lipsLater: 1.5,
    flutter: { hand: [4.5, 7.5], lips: [3, 5.5] },
    flutterFor: [1, 1.6],
    flutterWiden: 0.5,
    flutterHearts: 2,
    move: 70,
    moveGap: 1.5,
    moveDelay: 1,
    heartsFast: 0.7,
    heartsSlow: 1.5,
    fadeIn: 0.25,
    fadeSettle: 0.9,
  };
  const arcRand = ([a, b]) => a + Math.random() * (b - a);
  function startArc() {
    const settle = arcRand(forTier(ARC.settle, hangout.tier) ?? ARC.settle.byTier.spark) + (holding.kind === "lips" ? ARC.lipsLater : 0);
    const settleFace = resolveReaction(renderer.rig, HOLD_LINES[holding.kind], hangout.tier)?.mood ?? ARC_FLUSTER;
    holding.arc = { phase: "surprise", flusterAt: arcRand(ARC.fluster), settleAt: settle, settleFace, moved: 0, movedAt: -Infinity };
    hangout.pendingMood = null;
    hangout.moodUntil = Infinity;
  }
  function arcFace(name, fade) {
    if (renderer.moodName !== name) renderer.setMood(name, fade);
  }
  function arcFrame() {
    const a = holding?.on && holding.arc;
    if (!a) return;
    const t = holding.held;
    if (a.phase === "surprise" && t >= a.flusterAt) {
      a.phase = "fluster";
      arcFace(ARC_FLUSTER, ARC.fadeIn);
    } else if ((a.phase === "fluster" && t >= a.settleAt) || (a.phase === "flutter" && t >= a.until)) {
      a.phase = "settled";
      a.flutterAt = t + arcRand(ARC.flutter[holding.kind]);
      arcFace(a.settleFace, ARC.fadeSettle);
    } else if (a.phase === "settled" && t >= a.flutterAt) flutter();
  }
  function flutter() {
    const a = holding.arc;
    a.phase = "flutter";
    a.until = holding.held + arcRand(ARC.flutterFor);
    arcFace(ARC_FLUSTER, ARC.fadeIn);
    renderer.widen(ARC.flutterWiden);
    for (let i = 0; i < ARC.flutterHearts; i++) spawnHeart(i * 0.12);
  }
  // Finger travel during a hold (scene.onPointer "move").
  function arcMove(from, to) {
    const a = holding?.on && holding.arc;
    if (!a || !from || a.phase === "surprise") return;
    a.moved += Math.hypot(to[0] - from[0], to[1] - from[1]);
    if (a.moved < ARC.move) return;
    a.moved = 0;
    if (holding.held - a.movedAt < ARC.moveGap) return;
    a.movedAt = holding.held;
    if (a.phase === "settled") flutter();
    else if (a.phase === "fluster") a.settleAt = Math.max(a.settleAt, holding.held + ARC.moveDelay);
  }
  // `cancelled`: the browser took the touch away (pointercancel: iOS's own
  // long-press gestures, a system swipe). A hold that ran still lets go as
  // usual; one that hadn't started yet is dropped, not turned into a tap.
  function endHold({ cancelled = false } = {}) {
    if (!holding) return;
    const { on, spot, point, kind } = holding;
    holding = null;
    renderer.setHold({});
    warmth()?.endHold();
    if (kind === "tease" || HOLD_WIDEN.has(kind)) hangout.moodUntil = scene.time; // lets go of the arc's held face
    // His release line, with that hold's face (reactions.js handHold /
    // heartbeatHold / lipHold; rig.json `reactions` per character).
    if (on) {
      hangout.react(HOLD_LINES[kind], scene.time);
      if (kind === "tease") hangout.moodUntil += TEASE_LINGER;
    } else if (cancelled) return;
    // Tap first: `onTap?.(tapAt(...))` skips the tap itself when onTap is
    // unset (the Activity sets none; only the preview's HUD does).
    else if (point) {
      const tap = hangout.tapAt(point, scene.time);
      scene.onTap?.(tap);
    }
    else hangout.react(TAP_REACTION[spot], scene.time, spot);
  }
  // Only the finger that started a hold moves or ends it (pointerId), so a
  // second finger on a phone doesn't cut it short; a second finger's press
  // while one is held is an ordinary tap. "cancel" is pointercancel
  // (scene.js).
  scene.onPointer = (type, point, e) => {
    const id = e?.pointerId;
    if (type === "down") {
      if (holding) return false;
      const spot = hotspotAt(renderer.rig, renderer, point);
      if (!HOLD_SPOTS[spot]) return false;
      beginHold(spot, point);
      holding.pointerId = id;
      return true;
    }
    if (!holding || (holding.pointerId != null && id != null && id !== holding.pointerId)) return false;
    if (type === "move" && holding.point) {
      arcMove(holding.point, point);
      holding.point = point;
      maybeTease();
    }
    if (type === "up") endHold();
    if (type === "cancel") endHold({ cancelled: true });
    return false;
  };

  // While a hand hold runs the dialogue box fades back (hangout.css
  // body.hand-hold) so it doesn't sit over his hand and the hearts; it
  // comes back as the hold ends and his release line types out.
  // A tease, and a chest hold dragged down at close until he catches it
  // (catchAt), fade it too (body.tease-hold), but his name plate stays: it
  // carries the heart monitor. The box comes back for the let-go, break or
  // "not yet" line.
  let boxDimmed = null;
  function dimBox() {
    const teasing = holding?.on && (holding.kind === "tease" || holding.catchAt != null);
    const dim = teasing ? "tease-hold" : holding?.on && holding.kind === "hand" ? "hand-hold" : null;
    if (dim === boxDimmed) return;
    if (boxDimmed) document.body.classList.remove(boxDimmed);
    if (dim) document.body.classList.add(dim);
    boxDimmed = dim;
  }

  function frame(dt) {
    if (holding) {
      holding.held += dt;
      if (holding.held >= HOLD_PRESS && !holding.on) startHold();
      if (holding?.on) warmth()?.hold(dt, HOLD_WARMTH[holding.kind]);
      if (holding?.catchAt != null && holding.held >= holding.catchAt) catchTease();
      arcFrame();
    }
    dimBox();
    crestFrame(dt);
    drawPulse(dt);
  }

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
    drawHearts(dt);
    if (!holding?.on) return;
    const [x, y] = holding.point ?? spotCenter(holding.spot);
    for (const [start, strength] of [[0, 1], [0.28, 0.6]]) {
      const p = beatClock - start;
      if (p < 0 || p > 0.5) continue;
      const k = p / 0.5;
      pulse.circle(x, y, 28 + 46 * k).stroke({ width: 2.5 * (1 - k) + 1, color: 0xff8fa8, alpha: 0.4 * strength * (1 - k) });
    }
  }

  // Small hearts (the lip and hand holds): while one runs, a heart floats up
  // from under the finger every `every` seconds (a random span), drifting
  // side to side, growing from `grow` to full size as it fades in, and
  // fading out over the back half of its `life`. Hearts already up finish
  // after you let go. Model reference units, like the rings.
  const HEARTS = { kinds: new Set(["lips", "hand"]), every: [0.55, 0.95], first: 0.4, life: [1.6, 2.3], rise: [110, 160], size: [26, 38], drift: 22, grow: 0.5, alpha: 0.75, color: 0xff8fa8 };
  const hearts = [];
  let heartWait = null;
  const heartRand = ([a, b]) => a + Math.random() * (b - a);
  // One heart from under the finger; `late` seconds behind (a puff's second heart).
  function spawnHeart(late = 0) {
    const [x, y] = holding.point ?? spotCenter(holding.spot);
    hearts.push({ x: x + (Math.random() - 0.5) * 40, y: y - 20, age: -late, life: heartRand(HEARTS.life), rise: heartRand(HEARTS.rise), size: heartRand(HEARTS.size), phase: Math.random() * Math.PI * 2, tilt: (Math.random() - 0.5) * 0.5 });
  }
  function drawHearts(dt) {
    if (holding?.on && HEARTS.kinds.has(holding.kind)) {
      heartWait ??= HEARTS.first;
      heartWait -= dt;
      if (heartWait <= 0) {
        spawnHeart();
        const phase = holding.arc?.phase;
        const pace = phase === "settled" ? ARC.heartsSlow : phase === "fluster" || phase === "flutter" ? ARC.heartsFast : 1;
        heartWait = heartRand(HEARTS.every) * pace;
      }
    } else heartWait = null;
    for (let i = hearts.length - 1; i >= 0; i--) {
      const h = hearts[i];
      h.age += dt;
      if (h.age < 0) continue;
      const k = h.age / h.life;
      if (k >= 1) {
        hearts.splice(i, 1);
        continue;
      }
      const cx = h.x + Math.sin(h.phase + h.age * 2.4) * HEARTS.drift * Math.min(1, k * 3);
      const cy = h.y - h.rise * h.age;
      const fadeIn = Math.min(1, h.age / 0.25);
      const alpha = HEARTS.alpha * fadeIn * (k < 0.5 ? 1 : 1 - (k - 0.5) / 0.5);
      const r = h.size * (HEARTS.grow + (1 - HEARTS.grow) * fadeIn);
      heartPath(pulse, cx, cy, r, h.tilt).fill({ color: HEARTS.color, alpha });
    }
  }
  // A heart of half-width `r` centered on (x, y), tilted by `tilt` radians.
  function heartPath(g, x, y, r, tilt) {
    const c = Math.cos(tilt);
    const s = Math.sin(tilt);
    const pt = (px, py) => [x + (px * c - py * s) * r, y + (px * s + py * c) * r];
    g.moveTo(...pt(0, 0.95));
    g.bezierCurveTo(...pt(-0.35, 0.6), ...pt(-1.05, 0.2), ...pt(-1, -0.35));
    g.bezierCurveTo(...pt(-0.95, -0.9), ...pt(-0.25, -1.05), ...pt(0, -0.55));
    g.bezierCurveTo(...pt(0.25, -1.05), ...pt(0.95, -0.9), ...pt(1, -0.35));
    g.bezierCurveTo(...pt(1.05, 0.2), ...pt(0.35, 0.6), ...pt(0, 0.95));
    g.closePath();
    return g;
  }

  // --- heart monitor (heartbeat hold) ----------------------------------------
  // A beating heart, a scrolling ECG trace and his bpm while a chest hold
  // runs, sliding out of his name plate (not the stage top: Discord's
  // chrome covers it); it tucks back in on release. The
  // trace's spike lands on the ring's "lub" (beatClock 0) and the heart
  // thumps with both beats.
  // The page may not have it (then the rings and hearts still run).
  const monitor = $("#heart-monitor");
  const heartIcon = monitor?.querySelector(".heart");
  const ecg = $("#ecg")?.getContext("2d");
  // Full-length trace: 2 s of signal across 168 canvas px. The trace scales
  // with the screen (preview.css), so a shorter one shows less time at the
  // same speed rather than squashing the beats.
  const ECG_STEP = 2 / 168; // seconds of signal per canvas px
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
    if (!monitor || !ecg) return;
    const on = (holding?.on && (holding.kind === "heartbeat" || holding.kind === "tease")) || scene.time < afterglowUntil;
    monitor.classList.toggle("on", Boolean(on));
    if (!on) {
      trace.length = 0;
      return;
    }
    // Match the backing store to the trace's on-screen size (2x, like the
    // full-size 84px -> 168).
    const cssW = Math.round(ecg.canvas.clientWidth * 2);
    const cssH = Math.round(ecg.canvas.clientHeight * 2);
    if (cssW && ecg.canvas.width !== cssW) ecg.canvas.width = cssW;
    if (cssH && ecg.canvas.height !== cssH) ecg.canvas.height = cssH;
    const { width: w, height: h } = ecg.canvas;
    const step = ECG_STEP;
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
    if (showHint) return false;
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
    if (!coach || hint || !holdOpen() || hintSeen()) return;
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


  const sceneFrame = scene.frame;
  scene.frame = (t, dt) => {
    sceneFrame(t, dt);
    frame(dt);
  };

  return {
    get holding() {
      return holding;
    },
    beginHold,
    endHold,
    catchTease,
    maybeShowHint,
    TEASE_TIER,
    CAUGHT_TIER,
  };
}
