// Tutorial chips (docs/hangout-activity.md §4, "Onboarding"): the pill above
// the dialogue box (#coach) that teaches one gesture the first time it opens
// up, with a faint pointer on him where it applies. Each chip shows once per
// player, not per character (remembered in localStorage), and clears when the
// gesture lands or after its time runs out. ?hints=1 (`replay`) shows them
// again, once each per page load.
//
// Two kinds of chip, both through offer():
//   entry    offered as a tier opens (on load, or the preview's tier
//            change). One shows at a time; the rest wait their turn, lowest
//            `rank` first, and are skipped if they no longer apply (`when`).
//   now      offered mid-gesture (the slide from a chest hold, the heart at
//            the edge). Takes the pill at once; an entry chip it pushes off
//            goes back in line, unseen.
//
// Pointer styles (drawn in the model's reference space, over him):
//   dot      a faint breathing dot (the hold and article chips)
//   down     a chevron drifting down from the point (the slide)
// Without `point` there's no pointer (the edge chip: the heart is its own).

import { Graphics } from "pixi.js";

const $ = (sel) => document.querySelector(sel);

// Seconds an entry chip stays up before it clears itself, and the gap
// before the next one in line.
export const HINT_SECONDS = 9;
const NEXT_GAP = 1.2;
const FADE_MS = 500;

/**
 * Attaches the chip pill to the scene and wraps scene.frame to draw the
 * pointer. Without #coach on the page, offers are ignored.
 */
export function attachCoach(scene, { replay = false } = {}) {
  const { renderer } = scene;
  const el = $("#coach");
  const doneHere = new Set(); // seen this page load (what ?hints=1 goes by)
  const queue = new Map(); // key -> entry chip waiting its turn
  let current = null; // { key, text, point, style, when, left, now, keep }
  let nextAt = 0;
  let hideTimer = null;

  const g = new Graphics();
  g.zIndex = 1e6 + 2;
  renderer.view.addChild(g);

  function seen(key) {
    if (doneHere.has(key)) return true;
    if (replay) return false;
    try {
      return localStorage.getItem(key) === "1";
    } catch {
      return false;
    }
  }
  function mark(key) {
    doneHere.add(key);
    try {
      localStorage.setItem(key, "1");
    } catch {}
  }

  function show(chip) {
    current = { ...chip, left: chip.seconds ?? HINT_SECONDS };
    if (!el) return;
    clearTimeout(hideTimer);
    el.textContent = chip.text;
    el.classList.toggle("keep", Boolean(chip.keep));
    el.classList.remove("fade");
    el.hidden = false;
  }
  function hide() {
    current = null;
    nextAt = scene.time + NEXT_GAP;
    if (!el) return;
    el.classList.add("fade");
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => (el.hidden = true), FADE_MS);
  }

  /**
   * Offers a chip. `key` is its localStorage key; `text` the pill; `point`
   * () => [x, y] | null for the pointer; `style` "dot" | "down"; `when`
   * () => whether it still applies (entry chips, checked as their turn
   * comes); `rank` its place in line (entry chips); `now` takes the pill at
   * once; `seconds` how long it stays up; `markOnTimeout` false leaves it
   * unseen when its time runs out (it shows again next time); `keep` stays
   * visible while the box is dimmed for tease (hangout.css .coach.keep).
   */
  function offer(chip) {
    if (!el || seen(chip.key) || current?.key === chip.key) return;
    if (chip.now) {
      if (current && !current.now) queue.set(current.key, current);
      show(chip);
      return;
    }
    queue.set(chip.key, chip);
  }
  /** The gesture landed: marks `key` seen and clears it if it's up. */
  function done(key) {
    queue.delete(key);
    mark(key);
    if (current?.key === key) hide();
  }
  /** Clears `key` without marking it seen (it can show again). */
  function drop(key) {
    queue.delete(key);
    if (current?.key === key) hide();
  }

  function nextInLine() {
    if (current || scene.time < nextAt || !queue.size) return;
    const line = [...queue.values()].sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0));
    for (const chip of line) {
      queue.delete(chip.key);
      if (seen(chip.key) || (chip.when && !chip.when())) continue;
      return show(chip);
    }
  }

  function draw(dt) {
    g.clear();
    if (!current) return;
    current.left -= dt;
    if (current.left <= 0 || (current.when && !current.when())) {
      const { key, markOnTimeout = true } = current;
      return markOnTimeout && current.left <= 0 ? done(key) : drop(key);
    }
    const p = current.point?.();
    if (!p) return;
    const [x, y] = p;
    const k = (1 - Math.cos(scene.time * Math.PI)) / 2; // ~2s breath
    if (current.style === "down") {
      // A chevron that drifts down from under the finger and fades, every ~1.4s.
      const u = (scene.time / 1.4) % 1;
      const cy = y + 40 + 70 * u;
      const a = 0.75 * Math.sin(Math.PI * u);
      // Shadowed like the dot, so it reads on a white shirt.
      const chevron = () => g.moveTo(x - 22, cy - 14).lineTo(x, cy).lineTo(x + 22, cy - 14);
      chevron().stroke({ width: 10, color: 0x000000, alpha: 0.3 * a, cap: "round", join: "round" });
      chevron().stroke({ width: 5, color: 0xffffff, alpha: a, cap: "round", join: "round" });
      return;
    }
    // A faint fill with a ring, shadowed so it reads on light art (Leo's
    // white headphones) as well as dark.
    const r = 14 + 10 * k;
    g.circle(x, y, r).fill({ color: 0xffffff, alpha: 0.12 + 0.18 * k });
    g.circle(x, y, r + 6).stroke({ width: 5, color: 0x000000, alpha: 0.18 + 0.14 * k });
    g.circle(x, y, r + 6).stroke({ width: 2.5, color: 0xffffff, alpha: 0.35 + 0.35 * k });
  }

  const sceneFrame = scene.frame;
  scene.frame = (t, dt) => {
    sceneFrame(t, dt);
    nextInLine();
    draw(dt);
  };

  return { offer, done, drop, seen, get current() { return current?.key ?? null; } };
}
