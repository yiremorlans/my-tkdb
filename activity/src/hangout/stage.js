// Hangout: the stage pieces every scene shares (the sprite rig's
// hangout/scene.js and the Live2D one's hangout-v2/scene.js): the phone frame
// cap, the VN box's typing, image loading and the stage framing.

import { Texture } from "pixi.js";

import { TYPE_MS } from "./hangout.js";

// docs/hangout-activity.md §4.5: the frame cap on phones.
export const MOBILE_FPS = 30;

// Pixi's own ticker.maxFPS truncates the elapsed time to whole ms, so a
// 30fps cap drops every frame that lands exactly on time (33.33 → 33) and
// draws every third vsync instead: ~20fps on 60Hz, ~15 in iOS Low Power.
// This drives the ticker from our own requestAnimationFrame with some slack
// for vsync jitter, so a cap of 30 is an even 30 on 60/90/120Hz screens.
// The app must be inited with `autoStart: false`. Returns the cap; set its
// `maxFPS` (0 = uncapped) to change it live.
const VSYNC_SLACK_MS = 4;

export function frameLoop(app, maxFPS = 0) {
  const cap = { maxFPS };
  let last = 0;
  const loop = (now) => {
    requestAnimationFrame(loop);
    if (cap.maxFPS && now - last < 1000 / cap.maxFPS - VSYNC_SLACK_MS) return;
    last = now;
    app.ticker.update(now);
  };
  requestAnimationFrame(loop);
  return cap;
}

// The VN box: each line types out (TYPE_MS a character, hangout.js); a
// click on the box finishes it.
export { TYPE_MS };

export function dialogueBox(box) {
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

// Plain <img> decode rather than Pixi's Assets, which decodes in a worker
// and is more machinery than ~150 small local PNGs need.
export function loadTexture(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(Texture.from(img));
    img.onerror = () => reject(new Error(`failed to load ${url}`));
    img.src = url;
  });
}

/**
 * How the rig's view sits on a width×height stage. rig.json `stage` picks
 * the reference rows that fill the stage height ({ top, bottom }) and the
 * column kept centered (centerX), so a crop is data, not code. `stage` may
 * instead hold `landscape` and `portrait` framings, chosen by the stage's
 * shape (a VN bust on a wide screen, more of him on a tall phone).
 * Without it the whole reference fits the height.
 */
export function stageFraming(rig, width, height) {
  const { width: refW, height: refH } = rig.reference;
  const stage = rig.stage ?? {};
  const pick = width > height ? stage.landscape : stage.portrait;
  const { top = 0, bottom = refH, centerX = refW / 2 } = pick ?? stage;
  const scale = height / (bottom - top);
  return { scale, x: width / 2 - centerX * scale, y: -top * scale };
}
