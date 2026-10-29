// Hangout: the scene both pages show (docs/hangout-activity.md §4). The rig
// over its room with the background pan, framed for the screen, the VN
// dialogue box, the frame loop and hotspot taps. activity/src/main.js (the
// Activity) runs it as is; the dev preview (preview/preview.js) adds its
// debug drawer, HUD and part editor on top through the hooks below.
//
// Everything is read from rig.json, so no character is hard-coded here.

import { Application, Sprite } from "pixi.js";

import { Hangout } from "./hangout.js";
import { TIERS } from "./reactions.js";
import { loadRig, loadTexture } from "../rig/loader.js";
import { Motion } from "../rig/motion.js";
import { RigRenderer } from "../rig/renderer.js";
import { outfitNames, stageFraming } from "../rig/skeleton.js";

// docs/hangout-activity.md §4.5: the frame cap on phones.
export const MOBILE_FPS = 30;

// The VN box: each line types out; a click on the box finishes it.
const TYPE_MS = 28;

function dialogueBox(box) {
  const text = box.querySelector(".vn-text");
  let typing = null;
  box.addEventListener("click", (e) => {
    if (e.target.closest(".vn-icon")) return;
    clearInterval(typing);
    text.textContent = text.dataset.full ?? "";
  });
  return (line) => {
    clearInterval(typing);
    text.textContent = "";
    text.dataset.full = line;
    let i = 0;
    typing = setInterval(() => {
      text.textContent = line.slice(0, ++i);
      if (i >= line.length) clearInterval(typing);
    }, TYPE_MS);
  };
}

/**
 * Loads `${base}/rig.json` and starts the scene in `stage` (an element
 * holding a `.vn-box`). Throws if the rig doesn't load or validate.
 *
 * Options: `loaded` (loadRig's promise, when the caller already started
 * loading it), `tier` (reactions.js TIERS, else "new"), `outfit` (else the
 * rig's default), `room: false` to skip the background, `background` (the
 * canvas color behind everything), `maxFPS` (0 = uncapped).
 *
 * The returned scene's hooks, all optional: `frame(t, dt)` replaces the
 * default per-frame update (hangout.frame);
 * `onPointer(type, point, e)` sees pointerdown/move/up first and returns true
 * to keep a pointerdown from tapping a hotspot; `onTap({ spot, result })`
 * hears the tap's outcome.
 */
export async function startScene(stage, { base, loaded, tier, outfit, room = true, background = "#000", maxFPS = 0 } = {}) {
  // The renderer doesn't need the rig to start, so both run at once.
  const app = new Application();
  const [{ rig, textures }] = await Promise.all([
    loaded ?? loadRig(base),
    app.init({
      resizeTo: stage,
      background,
      antialias: true,
      resolution: Math.min(devicePixelRatio, 2),
      autoDensity: true,
    }),
  ]);
  app.ticker.maxFPS = maxFPS;
  stage.prepend(app.canvas);

  const bg = room && rig.background ? new Sprite(await loadTexture(`${base}/${rig.background}`)) : null;
  if (bg) app.stage.addChild(bg);

  const renderer = new RigRenderer({ rig, textures, outfit: outfitNames(rig).includes(outfit) ? outfit : undefined });
  const motion = new Motion(renderer.rig);
  const say = dialogueBox(stage.querySelector(".vn-box"));
  const hangout = new Hangout({ rig: renderer.rig, renderer, motion, say, tier: TIERS.includes(tier) ? tier : "new" });
  app.stage.addChild(renderer.view);

  const scene = {
    app, rig, renderer, motion, hangout, say,
    time: 0,
    frame: (t, dt) => hangout.frame(t, dt),
    onPointer: null,
    onTap: null,
    layout,
  };

  // Background pan (rig.json motion.bgPan): the room drifts slowly on a
  // wandering path while the character stays put. It's scaled up by twice
  // the pan amount so its edges never come into view.
  let bgBase = null;
  function panBackground(time) {
    if (!bg || !bgBase) return;
    const p = rig.motion?.bgPan ?? {};
    const a = p.enabled !== false ? p.amount ?? 0.01 : 0;
    const w = (p.speed ?? 0.022) * Math.PI * 2;
    const { width, height } = app.screen;
    bg.position.set(
      bgBase.x + a * width * Math.sin(w * time),
      bgBase.y + a * height * 0.6 * Math.sin(w * 0.73 * time + 1.3),
    );
  }

  function layout() {
    const { width, height } = app.screen;
    if (bg) {
      const over = 1 + 2 * (rig.motion?.bgPan?.amount ?? 0.01);
      const s = Math.max(width / bg.texture.width, height / bg.texture.height) * over;
      bg.scale.set(s);
      bgBase = { x: (width - bg.texture.width * s) / 2, y: (height - bg.texture.height * s) / 2 };
      bg.position.set(bgBase.x, bgBase.y);
    }
    const { scale, x, y } = stageFraming(rig, width, height);
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
    scene.onTap?.(hangout.tapAt(point, scene.time));
  });
  app.stage.on("pointermove", (e) => scene.onPointer?.("move", toRef(e), e));
  app.stage.on("pointerup", (e) => scene.onPointer?.("up", toRef(e), e));
  app.stage.on("pointerupoutside", (e) => scene.onPointer?.("up", toRef(e), e));

  return scene;
}
