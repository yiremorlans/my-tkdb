// Hangout: the stage pieces the scene (hangout/scene.js) and the /meet
// flow share: the phone frame cap, the VN box's typing, image loading and
// the stage framing.

import { Texture } from "pixi.js";

import { TYPE_MS, typeDuration, typeSchedule } from "./hangout.js";

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
export { TYPE_MS, typeDuration, typeSchedule };

export function dialogueBox(box) {
  const text = box.querySelector(".vn-text");
  let typing = null;
  // Publishes the box's height so .choices can sit just above it: a long
  // line grows the box upward and would otherwise run under the choices.
  new ResizeObserver(() => {
    box.parentElement.style.setProperty("--vn-box-h", `${box.offsetHeight}px`);
  }).observe(box);
  box.addEventListener("click", (e) => {
    if (e.target.closest(".vn-icon, .vn-next")) return;
    clearTimeout(typing);
    text.textContent = text.dataset.full ?? "";
  });
  // Rests at sentence and clause breaks (typeSchedule), so long lines read
  // in beats; the Live2D rig's mouth follows the same schedule. The untyped
  // rest is laid out invisibly, so the box (sized to its text, hangout.css)
  // takes the whole line's height at once and words don't jump lines.
  const typed = document.createElement("span");
  const rest = document.createElement("span");
  rest.style.visibility = "hidden";
  rest.setAttribute("aria-hidden", "true");
  return (line) => {
    clearTimeout(typing);
    text.dataset.full = line;
    typed.textContent = "";
    rest.textContent = line;
    text.replaceChildren(typed, rest);
    const at = typeSchedule(line);
    const start = performance.now();
    let i = 0;
    const step = () => {
      const now = performance.now() - start;
      while (i < at.length && at[i] <= now) i++;
      typed.textContent = line.slice(0, i);
      rest.textContent = line.slice(i);
      if (i < at.length) typing = setTimeout(step, at[i] - now);
    };
    typing = setTimeout(step, at[0] ?? 0);
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
 * instead hold `landscape` and `portrait` framings. The portrait one (more
 * of him, hands included) is the default on every screen; `closeUp` picks
 * the landscape VN bust instead, and only on a wide stage (the desktop
 * toggle, closeUpPref below). Without either the whole reference fits the
 * height.
 */
export function stageFraming(rig, width, height, { closeUp = false } = {}) {
  const { width: refW, height: refH } = rig.reference;
  const stage = rig.stage ?? {};
  const pick = closeUp && width > height ? stage.landscape : stage.portrait;
  const { top = 0, bottom = refH, centerX = refW / 2 } = pick ?? stage;
  const scale = height / (bottom - top);
  return { scale, x: width / 2 - centerX * scale, y: -top * scale };
}

// The desktop close-up toggle (stageFraming's `closeUp`), remembered per
// browser. Storage can be missing or throw (private windows): it's off then.
const CLOSE_UP_KEY = "hangout.closeUp";

export const closeUpPref = {
  get() {
    try {
      return localStorage.getItem(CLOSE_UP_KEY) === "1";
    } catch {
      return false;
    }
  },
  set(on) {
    try {
      localStorage.setItem(CLOSE_UP_KEY, on ? "1" : "");
    } catch {}
  },
};
