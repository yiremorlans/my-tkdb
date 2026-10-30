// Milestone-1 rig preview (dev only): the Activity's scene
// (hangout/scene.js) plus a debug drawer with buttons for every mood, reaction and hand pose, idle-motion sliders, an FPS
// readout with a 30fps cap, and the part editor that saves back to
// rig.json. See docs/hangout-activity.md §3.4. A "Live2D poses" row plays
// poses measured from the game's Live2D motions (proof; preview only).
//
// Everything is read from rig.json; open ?character=<id> for another rig,
// ?outfit=<name> for one of its outfits and ?hands=<set> for one of the
// outfit's hand sets; ?pose=<name> starts a Live2D pose. The background is
// flat magenta unless ?room=1.

import { Graphics, Sprite } from "pixi.js";

import { RESPONSE_TYPE_ORDER } from "../../../constants/responseTypes.js";
import { DIALOGUE_TIERS } from "../../../constants/tiers.js";
import { loadLines } from "../hangout/lines.js";
import { DEFAULT_REACTIONS, TOUCH_SPOTS } from "../hangout/reactions.js";
import { startScene } from "../hangout/scene.js";
import { MOBILE_FPS, loadTexture } from "../hangout/stage.js";
import { allParts, apply, invert, outfitNames, roundTo, spriteMatrix } from "../rig/skeleton.js";

const params = new URLSearchParams(location.search);
const character = params.get("character") ?? "alan";
const base = `/assets/rig/${character}`;
const $ = (sel) => document.querySelector(sel);
const displayName = character[0].toUpperCase() + character.slice(1);

async function main() {
  // Flat magenta behind the character by default, so any gap between
  // pieces shows up loudly; ?room=1 shows the room instead. ?leak=1 also
  // hides the dialogue and HUD. ?tier=warm starts at that relationship tier.
  const leakMode = params.has("leak");
  if (leakMode) document.body.classList.add("leak");
  const room = params.has("room") && !leakMode;
  $("#vn-name").textContent = displayName;
  let scene;
  try {
    scene = await startScene($("#stage"), {
      base,
      lines: await loadLines(character),
      tier: params.get("tier"),
      outfit: params.get("outfit"),
      room,
      background: room ? "#000" : "#ff00ff",
    });
  } catch (err) {
    $("#controls").textContent = err.message;
    $("#controls").hidden = false;
    console.error(`[preview] ${err.message}`);
    return;
  }
  const { app, rig, renderer, motion, hangout, say } = scene;
  if (params.get("hands") && renderer.rig.handSets?.includes(params.get("hands"))) hangout.setHandSet(params.get("hands"));
  const original = JSON.parse(JSON.stringify(rig));

  // The outfit's reference sprite, faded over the rig while editing.
  const reference = new Sprite(await loadTexture(`${base}/${renderer.rig.referenceImage}`));
  reference.alpha = 0.4;
  reference.zIndex = 1e6;
  reference.visible = false;
  reference.eventMode = "none";
  renderer.view.addChild(reference);
  const outline = new Graphics();
  outline.zIndex = 1e6 + 1;
  renderer.view.addChild(outline);

  // --- frame loop ---------------------------------------------------------
  let frames = 0;
  let fpsClock = performance.now();
  const editor = { on: false, freeze: true, selected: null };
  scene.frame = (t, dt) => {
    if (editor.on && editor.freeze) renderer.update({}, { blink: false });
    else hangout.frame(t, dt);
    drawOutline();
    $("#meter-fill").style.width = `${Math.min(100, (hangout.meter.level(t) / hangout.meter.config.threshold) * 100)}%`;
    frames++;
    const now = performance.now();
    if (now - fpsClock > 500) {
      $("#fps").textContent = `${Math.round((frames * 1000) / (now - fpsClock))} fps`;
      frames = 0;
      fpsClock = now;
    }
  };

  // --- taps and the editor ------------------------------------------------
  scene.onTap = ({ spot, result }) => {
    $("#spot").textContent = spot ? `${spot}: ${result}` : "";
  };
  let drag = null;
  scene.onPointer = (type, point) => {
    if (!editor.on) return false;
    if (type === "down") {
      const id = pickPart(point);
      if (id) selectPart(id);
      drag = editor.selected ? { last: point } : null;
    } else if (type === "move" && drag && editor.selected) {
      movePart(editor.selected, point[0] - drag.last[0], point[1] - drag.last[1]);
      drag.last = point;
    } else if (type === "up") {
      drag = null;
    }
    return true;
  };

  function pickPart(point) {
    let best = null;
    for (const part of renderer.rig.parts) {
      const uv = renderer.partUV(part.id, point);
      if (!uv || uv[0] < 0 || uv[0] > 1 || uv[1] < 0 || uv[1] > 1) continue;
      if (!best || (part.z ?? 0) > (best.z ?? 0)) best = part;
    }
    return best?.id ?? null;
  }

  // The hand pose a hand part is drawing, or null for any other part. Every
  // pose hangs off the one wrist bone, so the editor nudges the pose shown
  // (its pivot and artRotation), never the bone: moving the bone to line up
  // one pose would knock the others out.
  function shownPose(id) {
    for (const [side, hand] of Object.entries(renderer.rig.hands ?? {})) {
      if (hand.part === id) return { side, entry: hand.poses[renderer.handPose[side]] };
    }
    return null;
  }

  // Poses the editor has changed, shaped like hand-fits.json per outfit
  // ({ <outfit>: { <side>: { <image>: pose entry } } }) and saved to it too
  // so fit-outfit.js keeps them.
  const editedPoses = {};
  function markPose({ side, entry }) {
    const image = entry.image.split("/").pop().replace(/\.png$/, "");
    ((editedPoses[renderer.rig.outfit] ??= {})[side] ??= {})[image] = entry;
  }

  // Moves a part by a reference-space delta, converted into its parent's
  // frame so the stored `position` stays parent-relative.
  function movePart(id, dx, dy) {
    const part = renderer.byId.get(id);
    const pose = shownPose(id);
    if (pose) {
      // spriteMatrix maps the pivot to the bone origin, so shifting the
      // drawing by d moves the pivot by −L⁻¹·d (L: its linear part).
      const size = renderer.sizes.get(id);
      const m = spriteMatrix(renderer.rig, part, renderer.boneOf(id), size, pose.entry);
      const [ix, iy] = apply(invert([m[0], m[1], m[2], m[3], 0, 0]), [dx, dy]);
      const [px, py] = pose.entry.pivot ?? part.pivot ?? [0.5, 0.5];
      pose.entry.pivot = [roundTo(px - ix / size[0], 4), roundTo(py - iy / size[1], 4)];
      markPose(pose);
      return showSelection();
    }
    const parent = part.parent ? renderer.boneOf(part.parent) : [1, 0, 0, 1, 0, 0];
    const inv = invert([parent[0], parent[1], parent[2], parent[3], 0, 0]);
    const [lx, ly] = apply(inv, [dx, dy]);
    part.position = [roundTo(part.position[0] + lx, 2), roundTo(part.position[1] + ly, 2)];
    showSelection();
  }

  function drawOutline() {
    outline.clear();
    if (!editor.on || !editor.selected) return;
    const id = editor.selected;
    const node = renderer.nodes.get(id);
    const bone = renderer.boneOf(id);
    if (bone) {
      outline.circle(bone[4], bone[5], 4).fill(0xff3b6b);
    }
    if (node?.visible) {
      const b = node.getBounds();
      const tl = renderer.view.toLocal({ x: b.x, y: b.y });
      const br = renderer.view.toLocal({ x: b.x + b.width, y: b.y + b.height });
      outline.rect(tl.x, tl.y, br.x - tl.x, br.y - tl.y).stroke({ width: 1.5, color: 0xffd34d });
    }
  }

  window.addEventListener("keydown", (e) => {
    if (!editor.on || !editor.selected || e.target.tagName === "INPUT") return;
    const part = renderer.byId.get(editor.selected);
    const step = e.shiftKey ? 10 : 1;
    const moves = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
    const pose = shownPose(part.id);
    const turn = (deg) => {
      if (!pose) return void (part.rotation = roundTo((part.rotation ?? 0) + deg, 2));
      const r = roundTo((pose.entry.artRotation ?? 0) + deg, 2);
      if (r) pose.entry.artRotation = r;
      else delete pose.entry.artRotation;
      markPose(pose);
    };
    if (moves[e.key]) movePart(part.id, ...moves[e.key]);
    else if (e.key === "q") turn(-0.5 * step);
    else if (e.key === "e") turn(0.5 * step);
    else if (e.key === "[") part.z = (part.z ?? 0) - 1;
    else if (e.key === "]") part.z = (part.z ?? 0) + 1;
    else return;
    e.preventDefault();
    const node = renderer.nodes.get(part.id);
    if (node) node.zIndex = part.z;
    showSelection();
  });

  // --- controls -----------------------------------------------------------
  const panel = $("#controls");
  const section = (title) => {
    const h = document.createElement("h3");
    h.textContent = title;
    panel.append(h);
    const row = document.createElement("div");
    row.className = "row";
    panel.append(row);
    return row;
  };
  const button = (row, label, onClick) => {
    const b = document.createElement("button");
    b.textContent = label;
    b.onclick = onClick;
    row.append(b);
    return b;
  };
  const slider = (parent, label, get, set, min, max, step = 0.01) => {
    const wrap = document.createElement("label");
    wrap.className = "slider";
    const input = Object.assign(document.createElement("input"), { type: "range", min, max, step, value: get() });
    const out = document.createElement("output");
    out.textContent = get();
    input.oninput = () => {
      set(Number(input.value));
      out.textContent = input.value;
    };
    wrap.append(label, input, out);
    parent.append(wrap);
  };
  const toggle = (parent, label, get, set) => {
    const wrap = document.createElement("label");
    wrap.className = "toggle";
    const input = Object.assign(document.createElement("input"), { type: "checkbox", checked: get() });
    input.onchange = () => set(input.checked);
    wrap.append(input, label);
    parent.append(wrap);
  };

  const outfits = outfitNames(rig);
  if (outfits.length) {
    const outfitRow = section("Outfit");
    const outfitPick = document.createElement("select");
    for (const name of outfits) outfitPick.append(new Option(name, name));
    outfitPick.value = renderer.outfit;
    outfitPick.onchange = () => switchOutfit(outfitPick.value);
    outfitRow.append(outfitPick);
  }

  async function switchOutfit(name) {
    hangout.setOutfit(name);
    reference.texture = await loadTexture(`${base}/${renderer.rig.referenceImage}`);
    showHands();
    showHandSets();
    showPoses();
    showPartList();
    selectPart(null);
    const url = new URL(location.href);
    url.searchParams.set("outfit", name);
    url.searchParams.delete("hands");
    history.replaceState(null, "", url);
  }

  // Hand sets (gloves on/off) are per outfit; the row only shows with two or more.
  const handSetRow = section("Hand set");
  const handSetPick = document.createElement("select");
  handSetPick.onchange = () => {
    hangout.setHandSet(handSetPick.value);
    showHands();
    const url = new URL(location.href);
    url.searchParams.set("hands", handSetPick.value);
    history.replaceState(null, "", url);
  };
  handSetRow.append(handSetPick);
  function showHandSets() {
    const sets = renderer.rig.handSets ?? [];
    handSetPick.replaceChildren(...sets.map((name) => new Option(name, name)));
    handSetPick.value = renderer.rig.handSet ?? "";
    handSetRow.hidden = sets.length < 2;
    if (handSetRow.previousElementSibling?.tagName === "H3") handSetRow.previousElementSibling.hidden = sets.length < 2;
  }

  const moodRow = section("Moods");
  for (const name of Object.keys(rig.expressions?.moods ?? {})) {
    if (name === "blink") continue;
    button(moodRow, name, () => hangout.setBase({ mood: name }));
  }
  button(moodRow, "blink now", () => (motion.nextBlinkAt = scene.time));

  const tierRow = section("Relationship tier");
  const tierPick = document.createElement("select");
  for (const tier of DIALOGUE_TIERS) tierPick.append(new Option(tier, tier));
  tierPick.value = hangout.tier;
  tierPick.onchange = () => hangout.setTier(tierPick.value);
  tierRow.append(tierPick);

  const reactRow = section("Reactions");
  for (const name of Object.keys({ ...DEFAULT_REACTIONS, ...rig.reactions })) {
    button(reactRow, name, () => hangout.react(name, scene.time));
  }

  // One button per placed touch spot, playing it as a tap there would (a
  // hand tap twitches that arm).
  const spotRow = section("Touch spots");
  for (const spot of Object.keys(TOUCH_SPOTS)) {
    button(spotRow, spot, () => {
      if (!hangout.rig.hotspots?.[spot]) return say(`(${spot} isn't placed on this outfit)`);
      hangout.react(hangout.rig.hotspots[spot].reaction ?? TOUCH_SPOTS[spot], scene.time, spot);
    });
  }

  // Hands are per outfit, so their rows are rebuilt on an outfit switch.
  const handRows = document.createElement("div");
  panel.append(handRows);
  function showHands() {
    handRows.replaceChildren();
    for (const [side, hand] of Object.entries(renderer.rig.hands ?? {})) {
      const h = document.createElement("h3");
      h.textContent = `Hand ${side}`;
      const row = document.createElement("div");
      row.className = "row";
      handRows.append(h, row);
      for (const pose of Object.keys(hand.poses)) {
        button(row, pose, () => hangout.setBase({ hands: { [side]: pose } }));
      }
    }
  }
  showHands();
  showHandSets();

  // --- Live2D poses (proof) -----------------------------------------------
  // Poses measured from the game's Live2D motions, per art piece, as
  // parent-relative bone rotations sampled per frame, plus hand swaps
  // (<outfit dir>/live2d-poses.json). They add on top of the idle motion.
  // A pose with `return` holds its last frame until clicked again, then
  // plays its return clip, as the game does. Preview only for now.
  const live = { clip: null, start: 0, hold: false };
  const poseRow = section("Live2D poses");
  let poseClips = {};
  async function showPoses() {
    poseRow.replaceChildren();
    live.clip = null;
    const res = await fetch(`${base}/${renderer.rig.dir}/live2d-poses.json`);
    poseClips = res.ok ? (await res.json()).poses : {};
    const returns = new Set(Object.values(poseClips).map((c) => c.return));
    for (const name of Object.keys(poseClips).filter((n) => !returns.has(n))) {
      const b = button(poseRow, name.replace(/^m_/, ""), () => {
        if (live.clip === name && live.hold && poseClips[name].return) {
          b.classList.remove("on");
          return playPose(poseClips[name].return);
        }
        poseRow.querySelectorAll("button").forEach((x) => x.classList.remove("on"));
        b.classList.add("on");
        playPose(name);
      });
    }
    if (!poseRow.children.length) poseRow.textContent = "(no live2d-poses.json for this outfit)";
  }
  function playPose(name) {
    live.clip = name;
    live.start = scene.time;
    live.hold = false;
  }
  // Linear between the measured frames; past the end a held pose keeps its
  // last frame and any other clip stops adding.
  function sampleClip(clip, t) {
    const n = Object.values(clip.rotation)[0]?.length ?? 1;
    const f = Math.min(n - 1, Math.max(0, t * clip.fps));
    const i = Math.floor(f);
    const k = f - i;
    const out = {};
    for (const [bone, v] of Object.entries(clip.rotation)) out[bone] = v[i] + (v[Math.min(n - 1, i + 1)] - v[i]) * k;
    return out;
  }
  const idlePose = motion.pose.bind(motion);
  motion.pose = (t, dt) => {
    const pose = idlePose(t, dt);
    const clip = poseClips[live.clip];
    if (!clip) return pose;
    const at = t - live.start;
    if (at >= clip.duration && !clip.return) {
      live.clip = null;
      return pose;
    }
    if (at >= clip.duration) live.hold = true;
    for (const [bone, deg] of Object.entries(sampleClip(clip, at))) {
      pose[bone] ??= {};
      pose[bone].rotation = (pose[bone].rotation ?? 0) + deg;
    }
    for (const [side, steps] of Object.entries(clip.hands ?? {})) {
      let hand = steps[0][1];
      for (const [stepAt, name] of steps) if (at >= stepAt) hand = name;
      if (hangout.baseHands[side] !== hand) hangout.setBase({ hands: { [side]: hand } });
    }
    return pose;
  };
  await showPoses();
  if (poseClips[params.get("pose")]) playPose(params.get("pose"));

  const motionRow = section("Idle motion");
  for (const [name, params] of Object.entries(rig.motion ?? {})) {
    // rig.json is the one record of each toggle, so "save rig.json" keeps
    // it; Motion keeps its own copy of the ones it runs.
    toggle(motionRow, name, () => params.enabled !== false, (v) => {
      params.enabled = v;
      if (name in motion.enabled) motion.enabled[name] = v;
    });
    for (const key of Object.keys(params)) {
      if (key === "enabled" || typeof params[key] !== "number") continue;
      const max = key === "meanInterval" ? 10 : key === "speed" ? 2 : Math.max(1, params[key] * 4);
      slider(motionRow, `${name}.${key}`, () => params[key], (v) => {
        params[key] = v;
        if (name === "bgPan" && key === "amount") scene.layout(); // re-cover for the new overscan
      }, 0, max, max / 400);
    }
  }

  const annoyRow = section("Annoyance");
  for (const key of Object.keys(hangout.meter.config)) {
    const max = key === "threshold" ? 15 : 6;
    slider(annoyRow, key, () => hangout.meter.config[key], (v) => {
      hangout.meter.config[key] = v;
      rig.annoyance[key] = v;
    }, 0, max, 0.1);
  }

  const perfRow = section("Performance");
  toggle(perfRow, "cap 30fps (mobile)", () => scene.frameCap.maxFPS === MOBILE_FPS, (v) => (scene.frameCap.maxFPS = v ? MOBILE_FPS : 0));

  // --- part editor --------------------------------------------------------

  const editRow = section("Part editor");
  toggle(editRow, "edit parts", () => editor.on, (v) => {
    editor.on = v;
    reference.visible = v;
  });
  toggle(editRow, "freeze motion while editing", () => editor.freeze, (v) => (editor.freeze = v));
  slider(editRow, "ref opacity", () => reference.alpha, (v) => (reference.alpha = v), 0, 1, 0.05);
  const picker = document.createElement("select");
  function showPartList() {
    picker.replaceChildren(new Option("(pick a part)", ""));
    for (const part of renderer.rig.parts) picker.append(new Option(part.id, part.id));
  }
  showPartList();
  picker.onchange = () => selectPart(picker.value || null);
  editRow.append(picker);
  button(editRow, "save rig.json", saveRig);
  button(editRow, "download", () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(rig, null, 2) + "\n"], { type: "application/json" }));
    a.download = "rig.json";
    a.click();
  });
  const info = document.createElement("div");
  info.className = "editor-info";
  info.textContent = "Click or pick a part. Drag or arrows to move (shift ×10), q/e rotate, [ ] z-order.";
  panel.append(info);

  function selectPart(id) {
    editor.selected = id;
    picker.value = id ?? "";
    showSelection();
  }

  function showSelection() {
    const part = editor.selected && renderer.byId.get(editor.selected);
    const pose = part && shownPose(part.id);
    const changes = changedValues();
    info.textContent =
      (part
        ? `${part.id}  parent ${part.parent ?? "-"}\nposition ${part.position.join(", ")}  rotation ${part.rotation ?? 0}  z ${part.z}\n` +
          (pose ? `pose ${renderer.handPose[pose.side]}  pivot ${pose.entry.pivot?.join(", ")}  turn ${pose.entry.artRotation ?? 0} (moves/turns this pose only)\n` : "")
        : "") + `\n${changes.length} changed:\n${changes.join("\n")}`;
  }

  // Changes across every outfit, not just the one on screen.
  function changedValues() {
    const key = ({ outfit, part }) => (outfit ? `${outfit}/${part.id}` : part.id);
    const before = new Map(allParts(original).map((e) => [key(e), e.part]));
    const out = [];
    for (const entry of allParts(rig)) {
      const { part } = entry;
      const was = before.get(key(entry));
      for (const k of ["position", "rotation", "z"]) {
        if (JSON.stringify(was?.[k]) !== JSON.stringify(part[k])) {
          out.push(`${key(entry)}.${k}: ${JSON.stringify(was?.[k])} → ${JSON.stringify(part[k])}`);
        }
      }
    }
    for (const [outfit, sides] of Object.entries(editedPoses)) {
      for (const [side, poses] of Object.entries(sides)) {
        for (const [image, entry] of Object.entries(poses)) {
          out.push(`${outfit}/hand ${side}/${image}: pivot ${entry.pivot.join(", ")}  turn ${entry.artRotation ?? 0}`);
        }
      }
    }
    return out;
  }

  async function saveRig() {
    const res = await fetch(`/__rig/save?character=${character}`, {
      method: "POST",
      body: JSON.stringify({ rig, handFits: editedPoses }),
    });
    info.textContent = res.ok ? "saved rig.json" : `save failed: ${await res.text()}`;
  }

  // --- VN chrome ----------------------------------------------------------

  // VN chrome: the debug drawer, and layout-only placeholder
  // choices (the conversation itself comes from constants/hangout/<id>.js
  // in the next step).
  $("#btn-debug").onclick = () => {
    panel.hidden = !panel.hidden;
  };
  // Hides the dialogue box and choices to see the whole character (H too).
  const hideUi = $("#btn-hide-ui");
  const toggleUi = () => {
    const hidden = document.body.classList.toggle("hide-ui");
    hideUi.setAttribute("aria-pressed", String(hidden));
    hideUi.title = hidden ? "Show dialogue (H)" : "Hide dialogue (H)";
  };
  hideUi.onclick = toggleUi;
  addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "h" && !e.target.closest("input, select, textarea")) toggleUi();
  });
  // The four /roam response types in RESPONSE_TYPE_ORDER, each marked by a
  // one-color glyph in place of its emoji and button color. The glyphs are
  // deliberately abstract so they don't give the type away.
  const RESPONSE_GLYPHS = { kind: "☼", playful: "♪", bold: "⚡\uFE0E", neutral: "♢" };
  const choices = $("#choices");
  const showChoices = () => {
    choices.replaceChildren(
      ...RESPONSE_TYPE_ORDER.map((type) => {
        const icon = RESPONSE_GLYPHS[type];
        const label = `(${type} response)`;
        const b = document.createElement("button");
        b.className = "choice";
        const glyph = document.createElement("span");
        glyph.className = "choice-icon";
        glyph.setAttribute("aria-hidden", "true");
        glyph.textContent = icon;
        b.append(glyph, label);
        b.onclick = () => {
          choices.hidden = true;
          say(`(${displayName}'s reply placeholder)`);
        };
        return b;
      }),
    );
    choices.hidden = false;
  };
  $("#btn-next").onclick = showChoices;

  say(hangout.line("greeting") ?? "");
  showChoices();

}


main().catch((err) => {
  $("#controls").textContent = `preview failed: ${err.message}`;
  console.error(`[preview] ${err.message}`);
});
