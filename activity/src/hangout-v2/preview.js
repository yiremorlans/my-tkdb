// Hangout v2 preview (dev only): the v2 scene (hangout-v2/scene.js) plus a
// debug drawer with a character picker, buttons for every mood, reaction,
// touch spot and pose, the relationship tier, and a hotspot overlay. See
// hangout-v2.html. The VN box plays a /meet encounter with the Activity's
// own flow (meet.js), drawn by the dev server from the bot's own content
// (vite.config.js /__meet).
//
// ?character=<id> picks assets/live2d/<id>/rig.json; ?tier=<tier> the
// reaction tier; ?pose=<group> starts a pose; ?room=0 hides the room;
// ?mobile=1 caps it at 30fps like a phone.

import { Graphics } from "pixi.js";

import { DIALOGUE_TIERS } from "../../../constants/tiers.js";
import { loadLines } from "../hangout/lines.js";
import { DEFAULT_REACTIONS, TOUCH_SPOTS, forTier } from "../hangout/reactions.js";
import { MOBILE_FPS } from "../hangout/stage.js";
import { meetFlow } from "./meet.js";
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
      // ?time=day|evening overrides the hour (Towa's wordless daytime lines).
      lines: await loadLines(character, ["day", "evening"].includes(params.get("time")) ? { daytime: params.get("time") === "day" } : undefined),
      tier: params.get("tier"),
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
    newEncounter();
  };
  tierRow.append(tierPick);
  button(tierRow, "new /meet encounter", () => newEncounter());

  const reactRow = section("Reactions (with their poses)");
  for (const name of Object.keys({ ...DEFAULT_REACTIONS, ...renderer.rig.reactions })) {
    const pose = forTier(renderer.rig.reactionPoses?.[name], hangout.tier);
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
  // The Activity's own flow (meet.js), fed by the dev server's /__meet: the
  // tier's first level, no boost or errand, nothing recorded.
  const flow = meetFlow(scene, { box: $(".vn-box"), choices: $("#choices"), next: $("#btn-next") });

  async function newEncounter() {
    flow.stop();
    const q = new URLSearchParams({ character, tier: hangout.tier, variant: renderer.rig.dialogueVariant ?? "uniform" });
    const res = await fetch(`/__meet/beat?${q}`);
    const beat = await res.json();
    if (!res.ok) return say(`(no /meet encounter: ${beat.error})`);
    if (beat.background) scene.setBackground(beat.background).catch((err) => console.error(`[hangout-v2] ${err.message}`));
    flow.play(beat, async (type) => {
      const a = new URLSearchParams({ character, tier: hangout.tier, type, mood: beat.mood ? "1" : "0" });
      const answer = await fetch(`/__meet/answer?${a}`);
      const result = await answer.json();
      if (!answer.ok) throw new Error(result.error);
      return result;
    });
  }

  newEncounter();
  if (renderer.poses.includes(params.get("pose"))) renderer.playPose(params.get("pose"));
  window.__hangoutV2 = scene;
}

main().catch((err) => {
  $("#controls").textContent = `hangout v2 failed: ${err.message}`;
  console.error(`[hangout-v2] ${err.stack ?? err.message}`);
});
