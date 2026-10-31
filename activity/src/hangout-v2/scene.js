// Hangout v2 (proof): the v1 scene (hangout/scene.js) with the Live2D model
// (live2dRig.js) in place of the sprite rig. Same room, background pan,
// framing, VN box, frame loop and hotspot taps, and the same Hangout class,
// so reactions, the annoyance meter, lines and sounds behave as in v1. A
// reaction also plays the pose rig.json `reactionPoses` gives it, and his
// mouth moves while its touch line types out. The scene's `say` shows any
// other line (narration, the /meet beat) without moving it.
// The v2 preview (hangout-v2/preview.js) adds its debug drawer through
// the same hooks as v1's: frame, onPointer, onTap.

import { Application, extensions, Sprite } from "pixi.js";
import { Live2DPlugin } from "untitled-pixi-live2d-engine/cubism";

import { DIALOGUE_TIERS } from "../../../constants/tiers.js";

import { Hangout } from "../hangout/hangout.js";
import { Sounds } from "../hangout/sounds.js";
import { TYPE_MS, dialogueBox, frameLoop, loadTexture, stageFraming } from "../hangout/stage.js";
import { Live2DMotion, Live2DRig, loadLive2DRig } from "./live2dRig.js";

extensions.add(Live2DPlugin);

/**
 * Loads `${base}/rig.json` (a v2 rig) and starts the scene in `stage`.
 * Options as v1's startScene: `tier`, `outfit`, `lines`, `room`, `background`, `maxFPS`.
 * `place` is a background image URL to show instead of the rig's room (the
 * /meet place, docs/hangout-activity.md §11.5); it loads with the rig.
 */
export async function startScene(stage, { base, tier, outfit, lines, room = true, place = null, background = "#000", maxFPS = 0 } = {}) {
  const app = new Application();
  const [{ rig, sounds: soundBytes, baseUrl }, placeTexture] = await Promise.all([
    loadLive2DRig(base),
    place ? loadTexture(place) : null,
    app.init({ resizeTo: stage, background, antialias: true, resolution: Math.min(devicePixelRatio, 2), autoDensity: true, preference: "webgl", autoStart: false }),
  ]);
  const frameCap = frameLoop(app, maxFPS);
  stage.prepend(app.canvas);

  const roomTexture = !placeTexture && room && rig.background ? await loadTexture(`${base}/${rig.background}`) : null;
  let bg = placeTexture || roomTexture ? new Sprite(placeTexture ?? roomTexture) : null;
  if (bg) app.stage.addChild(bg);

  /** Swaps the background for another image (the /meet place, §11.5). */
  async function setBackground(url) {
    const texture = await loadTexture(url);
    if (bg) bg.texture = texture;
    else app.stage.addChildAt((bg = new Sprite(texture)), 0);
    layout();
  }

  const renderer = await Live2DRig.create({ rig, baseUrl, outfit: rig.outfits?.[outfit] ? outfit : undefined });
  const motion = new Live2DMotion();
  // He talks while a touch line types out; clicking the box to finish the
  // line (dialogueBox's own handler) shuts his mouth with it.
  const box = stage.querySelector(".vn-box");
  const typeLine = dialogueBox(box);
  const say = (line) => {
    renderer.stopTalking();
    typeLine(line);
  };
  const speak = (line) => {
    typeLine(line);
    renderer.talk((line.length * TYPE_MS) / 1000);
  };
  box.addEventListener("click", (e) => {
    if (!e.target.closest(".vn-icon, .vn-next")) renderer.stopTalking();
  });
  const sounds = new Sounds(soundBytes);
  const play = (file) => sounds.play(file);
  const hangout = new Hangout({ renderer, motion, say: speak, play, lines, tier: DIALOGUE_TIERS.includes(tier) ? tier : "new" });
  // Every reaction (taps, upset) also plays its pose, if any.
  const react = hangout.react.bind(hangout);
  hangout.react = (name, t, spot) => {
    react(name, t, spot);
    renderer.reactPose(name, hangout.tier);
  };
  app.stage.addChild(renderer.view);

  const scene = {
    app, rig: renderer.rig, renderer, motion, hangout, say, speak, sounds, frameCap,
    time: 0,
    frame: (t, dt) => hangout.frame(t, dt),
    onPointer: null,
    onTap: null,
    layout,
    setBackground,
  };

  // Background pan, as v1 (rig.json motion.bgPan).
  let bgBase = null;
  function panBackground(time) {
    if (!bg || !bgBase) return;
    const p = renderer.rig.motion?.bgPan ?? {};
    const a = p.enabled !== false ? p.amount ?? 0.01 : 0;
    const w = (p.speed ?? 0.022) * Math.PI * 2;
    const { width, height } = app.screen;
    bg.position.set(bgBase.x + a * width * Math.sin(w * time), bgBase.y + a * height * 0.6 * Math.sin(w * 0.73 * time + 1.3));
  }

  // Reference space is the model's canvas (rig.json `reference`), framed by
  // its `stage` like v1.
  function layout() {
    const { width, height } = app.screen;
    if (bg) {
      const over = 1 + 2 * (renderer.rig.motion?.bgPan?.amount ?? 0.01);
      const s = Math.max(width / bg.texture.width, height / bg.texture.height) * over;
      bg.scale.set(s);
      bgBase = { x: (width - bg.texture.width * s) / 2, y: (height - bg.texture.height * s) / 2 };
      bg.position.set(bgBase.x, bgBase.y);
    }
    const { scale, x, y } = stageFraming(renderer.rig, width, height);
    renderer.view.scale.set(scale);
    renderer.view.position.set(x, y);
  }
  app.renderer.on("resize", layout);
  layout();

  app.ticker.add((ticker) => {
    const dt = Math.min(ticker.deltaMS / 1000, 0.1);
    scene.time += dt;
    scene.frame(scene.time, dt);
    panBackground(scene.time);
  });

  app.stage.eventMode = "static";
  app.stage.hitArea = app.screen;
  const toRef = (e) => {
    const p = renderer.view.toLocal(e.global);
    return [p.x, p.y];
  };
  app.stage.on("pointerdown", (e) => {
    const point = toRef(e);
    if (scene.onPointer?.("down", point, e)) return;
    const tap = hangout.tapAt(point, scene.time);
    scene.onTap?.(tap);
  });
  app.stage.on("pointermove", (e) => scene.onPointer?.("move", toRef(e), e));
  app.stage.on("pointerup", (e) => scene.onPointer?.("up", toRef(e), e));

  return scene;
}
