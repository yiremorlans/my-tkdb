// Hangout v2 preview (dev only): the v2 scene (hangout-v2/scene.js) plus a
// debug drawer with a character picker, buttons for every mood, reaction,
// touch spot and pose, the relationship tier, and a hotspot overlay. See
// hangout-v2.html. The VN box plays a /meet encounter as §11.2 lays it out,
// drawn by the dev server from the bot's own content (vite.config.js
// /__meet).
//
// ?character=<id> picks assets/live2d/<id>/rig.json; ?tier=<tier> the
// reaction tier; ?pose=<group> starts a pose; ?room=0 hides the room;
// ?mobile=1 caps it at 30fps like a phone.

import { Graphics } from "pixi.js";

import { DIALOGUE_TIERS } from "../../../constants/tiers.js";
import { loadLines } from "../hangout/lines.js";
import { DEFAULT_REACTIONS, TOUCH_SPOTS } from "../hangout/reactions.js";
import { RESPONSE_TYPE_ORDER } from "../../../constants/responseTypes.js";
import { MOBILE_FPS, TYPE_MS } from "../hangout/stage.js";
import { startScene } from "./scene.js";

const params = new URLSearchParams(location.search);
const character = /^[a-z0-9_-]+$/.test(params.get("character") ?? "") ? params.get("character") : "alan";
// Every character with a Live2D rig, for the drawer's picker. The glob only
// lists the paths; nothing is loaded.
const CHARACTERS = Object.keys(import.meta.glob("../../../assets/live2d/*/rig.json"))
  .map((f) => f.split("/").at(-2))
  .sort();
const $ = (sel) => document.querySelector(sel);

async function main() {
  $("#vn-name").textContent = character[0].toUpperCase() + character.slice(1);
  let scene;
  try {
    scene = await startScene($("#stage"), {
      base: `assets/live2d/${character}`,
      lines: await loadLines(character),
      tier: params.get("tier"),
      room: params.get("room") !== "0",
      background: "#1b1824",
    });
  } catch (err) {
    $("#controls").textContent = err.message;
    $("#controls").hidden = false;
    console.error(`[hangout-v2] ${err.stack ?? err.message}`);
    return;
  }
  const { renderer, hangout, say, speak } = scene;

  // --- frame loop: HUD and hotspot overlay ----------------------------------
  const overlay = new Graphics();
  overlay.zIndex = 1e6;
  renderer.view.addChild(overlay);
  let showSpots = params.has("spots");
  let frames = 0;
  let fpsClock = performance.now();
  scene.frame = (t, dt) => {
    hangout.frame(t, dt);
    drawSpots();
    $("#meter-fill").style.width = `${Math.min(100, (hangout.meter.level(t) / hangout.meter.config.threshold) * 100)}%`;
    frames++;
    const now = performance.now();
    if (now - fpsClock > 500) {
      $("#fps").textContent = `${Math.round((frames * 1000) / (now - fpsClock))} fps`;
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
      overlay.rect(-a[0] * w + x0 * w, -a[1] * h + y0 * h, (x1 - x0) * w, (y1 - y0) * h).stroke({ width: 4, color: 0xffd34d });
    }
  }

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
  for (const id of CHARACTERS) charPick.append(new Option(id[0].toUpperCase() + id.slice(1), id));
  charPick.value = character;
  charPick.onchange = () => {
    const next = new URLSearchParams(location.search);
    next.set("character", charPick.value);
    next.set("tier", hangout.tier);
    next.delete("pose");
    location.search = next;
  };
  charRow.append(charPick);

  const moodRow = section("Moods (Live2D expressions)");
  for (const name of Object.keys(renderer.rig.expressions?.moods ?? {})) {
    button(moodRow, name, () => hangout.setBase({ mood: name }));
  }

  const tierRow = section("Relationship tier");
  const tierPick = document.createElement("select");
  for (const tier of DIALOGUE_TIERS) tierPick.append(new Option(tier, tier));
  tierPick.value = hangout.tier;
  tierPick.onchange = () => {
    hangout.setTier(tierPick.value);
    newEncounter();
  };
  tierRow.append(tierPick);
  button(tierRow, "new /meet encounter", () => newEncounter());

  const reactRow = section("Reactions (with their poses)");
  for (const name of Object.keys({ ...DEFAULT_REACTIONS, ...renderer.rig.reactions })) {
    const pose = renderer.rig.reactionPoses?.[name];
    button(reactRow, pose ? `${name} · ${pose.replace(/^m_/, "")}` : name, () => hangout.react(name, scene.time));
  }

  const spotRow = section("Touch spots");
  for (const spot of Object.keys(TOUCH_SPOTS)) {
    button(spotRow, spot, () => {
      if (!renderer.rig.hotspots?.[spot]) return say(`(${spot} isn't placed on this outfit)`);
      hangout.react(renderer.rig.hotspots[spot].reaction ?? TOUCH_SPOTS[spot], scene.time, spot);
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
      poseRow.querySelectorAll("button").forEach((x) => x.classList.remove("on"));
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
    const input = Object.assign(document.createElement("input"), { type: "range", min: 0, max: 1, step: 0.05, value: params.amount ?? fallback });
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

  // Phones run the Activity at MOBILE_FPS (main.js); this previews that.
  const perfRow = section("Performance");
  const capWrap = document.createElement("label");
  capWrap.className = "toggle";
  const cap = Object.assign(document.createElement("input"), { type: "checkbox", checked: params.has("mobile") });
  cap.onchange = () => (scene.frameCap.maxFPS = cap.checked ? MOBILE_FPS : 0);
  capWrap.append(cap, "cap 30fps (mobile)");
  perfRow.append(capWrap);
  if (cap.checked) scene.frameCap.maxFPS = MOBILE_FPS;

  // --- VN chrome ------------------------------------------------------------
  $("#btn-debug").onclick = () => {
    panel.hidden = !panel.hidden;
  };
  const toggleUi = () => {
    const hidden = document.body.classList.toggle("hide-ui");
    $("#btn-hide-ui").setAttribute("aria-pressed", String(hidden));
  };
  $("#btn-hide-ui").onclick = toggleUi;
  addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "h" && !e.target.closest("input, select, textarea")) toggleUi();
  });

  // --- /meet (docs/hangout-activity.md §11.2) --------------------------------
  // The intro as narration, then the beat's line and its four labels. A pick
  // plays the outcome's face, then the reaction and gain lines as narration,
  // and the hangout carries on. A touch before the answer plays its line,
  // then the beat and its choices come back.
  // Same glyphs as the v1 preview: one per type, abstract so they don't give
  // the type away.
  const RESPONSE_GLYPHS = { kind: "☼", playful: "♪", bold: "⚡\uFE0E", neutral: "♢" };
  const OUTCOME = { 2: "answerLove", 1: "answerLike", 0: "answerFlat" };
  const box = $(".vn-box");
  const choices = $("#choices");
  const next = $("#btn-next");
  const meet = { beat: null, step: null, back: null };
  const plain = (text) => text.replace(/\*\*(.+?)\*\*/g, "$1");
  const show = (text, { narration = false } = {}) => {
    box.classList.toggle("narration", narration);
    say(plain(text));
  };
  // Only touch lines come through here (Hangout's say), so only they move
  // his mouth.
  hangout.say = (line) => {
    box.classList.remove("narration");
    speak(line);
    if (meet.step === "intro" || meet.step === "beat") {
      choices.hidden = true;
      clearTimeout(meet.back);
      meet.back = setTimeout(showBeat, line.length * TYPE_MS + 2000);
    }
  };

  async function newEncounter() {
    clearTimeout(meet.back);
    choices.hidden = true;
    next.hidden = true;
    meet.step = null;
    const q = new URLSearchParams({ character, tier: hangout.tier, variant: renderer.rig.dialogueVariant ?? "uniform" });
    const res = await fetch(`/__meet/beat?${q}`);
    const beat = await res.json();
    if (!res.ok) return show(`(no /meet encounter: ${beat.error})`, { narration: true });
    meet.beat = beat;
    if (beat.background) scene.setBackground(beat.background).catch((err) => console.error(`[hangout-v2] ${err.message}`));
    meet.step = "intro";
    show(beat.notice ? `${beat.intro}\n${beat.notice}` : beat.intro, { narration: true });
    next.hidden = false;
  }

  function showBeat() {
    clearTimeout(meet.back);
    meet.step = "beat";
    next.hidden = true;
    show(meet.beat.line);
    choices.replaceChildren(
      ...RESPONSE_TYPE_ORDER.map((type) => {
        const b = document.createElement("button");
        b.className = "choice";
        const glyph = document.createElement("span");
        glyph.className = "choice-icon";
        glyph.setAttribute("aria-hidden", "true");
        glyph.textContent = RESPONSE_GLYPHS[type];
        b.append(glyph, meet.beat.responses[type]);
        b.onclick = () => answer(type);
        return b;
      }),
    );
    choices.hidden = false;
  }

  async function answer(type) {
    meet.step = "done";
    choices.hidden = true;
    const q = new URLSearchParams({ character, tier: hangout.tier, type, mood: meet.beat.mood ? "1" : "0" });
    const res = await fetch(`/__meet/answer?${q}`);
    const result = await res.json();
    if (!res.ok) return show(`(answer failed: ${result.error})`, { narration: true });
    hangout.react(OUTCOME[Math.max(0, Math.min(2, result.gain))], scene.time);
    show(`${result.reaction}\n${result.delta}`, { narration: true });
  }

  next.onclick = () => {
    if (meet.step === "intro") showBeat();
  };
  newEncounter();
  if (renderer.poses.includes(params.get("pose"))) renderer.playPose(params.get("pose"));
  window.__hangoutV2 = scene;
}

main().catch((err) => {
  $("#controls").textContent = `hangout v2 failed: ${err.message}`;
  console.error(`[hangout-v2] ${err.stack ?? err.message}`);
});
