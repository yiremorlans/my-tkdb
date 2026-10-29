// Milestone-1 rig preview (dev only): the Activity's scene
// (hangout/scene.js) plus a debug drawer with buttons for every mood, reaction and hand pose, idle-motion sliders, an FPS
// readout with a 30fps cap, and the part editor that saves back to
// rig.json. See docs/hangout-activity.md §3.4.
//
// Everything is read from rig.json; open ?character=<id> for another rig,
// ?outfit=<name> for one of its outfits and ?hands=<set> for one of the
// outfit's hand sets.

import { Graphics, Sprite } from "pixi.js";

import { DEFAULT_REACTIONS, TIERS } from "../hangout/reactions.js";
import { MOBILE_FPS, startScene } from "../hangout/scene.js";
import { loadTexture } from "../rig/loader.js";
import { allParts, apply, invert, outfitNames } from "../rig/skeleton.js";

const params = new URLSearchParams(location.search);
const character = params.get("character") ?? "alan";
const base = `/assets/rig/${character}`;
const $ = (sel) => document.querySelector(sel);

async function main() {
  // ?leak=1: flat magenta behind him and no room, so any gap between
  // pieces shows up loudly. ?tier=warm starts at that relationship tier.
  const leakMode = params.has("leak");
  if (leakMode) document.body.classList.add("leak");
  let scene;
  try {
    scene = await startScene($("#stage"), {
      base,
      tier: params.get("tier"),
      outfit: params.get("outfit"),
      room: !leakMode,
      background: leakMode ? "#ff00ff" : "#000",
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

  // Moves a part by a reference-space delta, converted into its parent's
  // frame so the stored `position` stays parent-relative.
  function movePart(id, dx, dy) {
    const part = renderer.byId.get(id);
    const parent = part.parent ? renderer.boneOf(part.parent) : [1, 0, 0, 1, 0, 0];
    const inv = invert([parent[0], parent[1], parent[2], parent[3], 0, 0]);
    const [lx, ly] = apply(inv, [dx, dy]);
    part.position = [round(part.position[0] + lx), round(part.position[1] + ly)];
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
    if (moves[e.key]) movePart(part.id, ...moves[e.key]);
    else if (e.key === "q") part.rotation = round((part.rotation ?? 0) - 0.5 * step);
    else if (e.key === "e") part.rotation = round((part.rotation ?? 0) + 0.5 * step);
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
  for (const tier of TIERS) tierPick.append(new Option(tier, tier));
  tierPick.value = hangout.tier;
  tierPick.onchange = () => hangout.setTier(tierPick.value);
  tierRow.append(tierPick);

  const reactRow = section("Reactions");
  for (const name of Object.keys({ ...DEFAULT_REACTIONS, ...rig.reactions })) {
    if (name === "spendTime") continue; // the Spend time button below
    button(reactRow, name, () => hangout.react(name, scene.time));
  }
  button(reactRow, "Spend time", () => hangout.spendTime(scene.time));

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

  const motionRow = section("Idle motion");
  for (const [name, params] of Object.entries(rig.motion ?? {})) {
    // rig.json is the one record of each toggle, so "save rig.json" keeps
    // it; Motion keeps its own copy of the ones it runs.
    toggle(motionRow, name, () => params.enabled !== false, (v) => {
      params.enabled = v;
      if (name in motion.enabled) motion.enabled[name] = v;
    });
    for (const key of Object.keys(params)) {
      if (key === "enabled") continue;
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
  toggle(perfRow, "cap 30fps (mobile)", () => app.ticker.maxFPS === MOBILE_FPS, (v) => (app.ticker.maxFPS = v ? MOBILE_FPS : 0));

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
    const changes = changedValues();
    info.textContent =
      (part
        ? `${part.id}  parent ${part.parent ?? "-"}\nposition ${part.position.join(", ")}  rotation ${part.rotation ?? 0}  z ${part.z}\n`
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
    return out;
  }

  async function saveRig() {
    const res = await fetch(`/__rig/save?character=${character}`, {
      method: "POST",
      body: JSON.stringify(rig),
    });
    info.textContent = res.ok ? "saved rig.json" : `save failed: ${await res.text()}`;
  }

  // VN chrome: Spend time, the debug drawer, and layout-only placeholder
  // choices (the conversation itself comes from constants/hangout/<id>.js
  // in the next step).
  $("#btn-spend").onclick = () => hangout.spendTime(scene.time);
  $("#btn-debug").onclick = () => {
    panel.hidden = !panel.hidden;
  };
  const choices = $("#choices");
  const showChoices = () => {
    choices.replaceChildren(
      ...["(kind response)", "(bold response)", "(playful response)"].map((label) => {
        const b = document.createElement("button");
        b.className = "choice";
        b.textContent = label;
        b.onclick = () => {
          choices.hidden = true;
          hangout.react("handTap", scene.time);
          say("(Alan's reply placeholder)");
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

const round = (n) => Math.round(n * 100) / 100;

main().catch((err) => {
  $("#controls").textContent = `preview failed: ${err.message}`;
  console.error(`[preview] ${err.stack}`);
});
