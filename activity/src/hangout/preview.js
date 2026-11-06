// Hangout preview (dev only): the scene (scene.js) plus a
// debug drawer with a character picker, buttons for every mood, reaction,
// touch spot and pose, the relationship tier, and a hotspot overlay. See
// hangout.html. The VN box plays a /meet encounter with the Activity's
// own flow (meet.js), drawn by the dev server from the bot's own content
// (vite.config.js /__meet).
//
// ?character=<id> picks assets/live2d/<id>/rig.json; ?tier=<tier> the
// reaction tier (default spark); ?pose=<group> starts a pose; ?room=0 hides the room;
// ?mobile=1 caps it at 30fps like a phone; ?articles=off starts the
// removable articles (articles.js) taken off.

import { Graphics } from "pixi.js";

import { DIALOGUE_TIERS } from "../../../constants/tiers.js";
import { loadLines } from "./lines.js";
import {
  DEFAULT_REACTIONS,
  TOUCH_SPOTS,
  forTier,
} from "./reactions.js";
import { MOBILE_FPS } from "./stage.js";
import { GRADES, PARTICLE_KINDS, autoEffects, createEffects } from "./effects.js";
import { meetFlow } from "./meet.js";
import { attachHolds } from "./holds.js";
import { attachArticles } from "./articles.js";
import { attachCoach } from "./coach.js";
import { HOLD_LOOK } from "./live2dRig.js";
import { startScene } from "./scene.js";
import { Warmth } from "./warmth.js";

const params = new URLSearchParams(location.search);
const character = /^[a-z0-9_-]+$/.test(params.get("character") ?? "")
  ? params.get("character")
  : "alan";
// Every character with a Live2D rig, for the drawer's picker. The glob only
// lists the paths; nothing is loaded.
const CHARACTERS = Object.keys(
  import.meta.glob("../../../assets/live2d/*/rig.json"),
)
  .map((f) => f.split("/").at(-2))
  .sort();
// Every background, for the effects prototype's picker (paths only).
const BACKGROUNDS = Object.keys(import.meta.glob("../../../assets/bg/**/*.png"))
  .map((f) => f.replace(/^(\.\.\/)+/, ""))
  .sort();
const $ = (sel) => document.querySelector(sel);

async function main() {
  $("#vn-name").textContent = character[0].toUpperCase() + character.slice(1);
  let scene;
  try {
    scene = await startScene($("#stage"), {
      base: `assets/live2d/${character}`,
      // ?time=day|evening overrides the hour (Towa's wordless daytime lines).
      lines: await loadLines(
        character,
        ["day", "evening"].includes(params.get("time"))
          ? { daytime: params.get("time") === "day" }
          : undefined,
      ),
      // The preview opens at spark (holds and warmth live there); ?tier= overrides.
      tier: params.get("tier") ?? "spark",
      // ?outfit=<name> picks a rig outfit; unknown names fall back to the default.
      outfit: params.get("outfit"),
      room: params.get("room") !== "0",
      background: "#1b1824",
    });
  } catch (err) {
    $("#controls").textContent = err.message;
    $("#controls").hidden = false;
    console.error(`[hangout] ${err.stack ?? err.message}`);
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
  const effects = createEffects(scene);
  scene.effects = effects;
  // Warmth prototype (§12.7): off until the drawer's Warmth row picks a mode.
  // Warmth starts on (the ordinary Hangout profile); the picker turns it off.
  let warmth = new Warmth("hangout", hangout.tier);
  let warmthManual = null; // the slider pins a value while dragged
  scene.frame = (t, dt) => {
    hangout.frame(t, dt);
    effects.frame(t, dt);
    const w = warmthManual ?? warmth.update(dt);
    renderer.setWarmth(w);
    const warmOut = $("#warmth-out");
    if (warmOut) warmOut.textContent = warmth.on || warmthManual != null ? w.toFixed(2) : "off";
    drawSpots();
    $("#meter-fill").style.width =
      `${hangout.locked ? 100 : Math.min(100, (hangout.meter.level(t) / hangout.meter.config.threshold) * 100)}%`;
    frames++;
    const now = performance.now();
    if (now - fpsClock > 500) {
      $("#fps").textContent =
        `${Math.round((frames * 1000) / (now - fpsClock))} fps`;
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
      overlay
        .rect(
          -a[0] * w + x0 * w,
          -a[1] * h + y0 * h,
          (x1 - x0) * w,
          (y1 - y0) * h,
        )
        .stroke({ width: 4, color: 0xffd34d });
    }
  }

  // --- holds (holds.js) -------------------------------------------------------
  // The drawer's buttons below run them without aiming; a hold turns the
  // warmth picker back on if it was off.
  // The tutorial chips (coach.js), shared by holds and articles; ?hints=1
  // shows them again.
  const coach = attachCoach(scene, { replay: params.get("hints") === "1" });
  const holds = attachHolds(scene, {
    warmth: () => warmth,
    onStart: () => {
      if (warmth.on) return;
      warmPick.value = "hangout";
      warmPick.onchange();
    },
    debug: say,
    coach,
    // Tease past the crest (holds.js): preview only for now.
    bliss: true,
  });
  const { TEASE_TIER, CAUGHT_TIER } = holds;
  scene.holds = holds;

  // --- removable articles (articles.js) ---------------------------------------
  // Double-tap an article to take it off (warm up). Attached after holds, so
  // its tapAt wraps the one holds and the scene call.
  let refreshArticles = () => {};
  const articles = attachArticles(scene, {
    startOff: params.get("articles") === "off",
    onChange: () => refreshArticles(),
    coach,
  });
  scene.articles = articles;

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
  for (const id of CHARACTERS)
    charPick.append(new Option(id[0].toUpperCase() + id.slice(1), id));
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

  // Named model parts (PartHat, PartHairFront...), toggled off to see what
  // a layer covers; ?hide=PartHat,PartX starts them hidden. Preview only.
  const partRow = section("Model parts (toggle to hide)");
  const startHidden = new Set((params.get("hide") ?? "").split(",").filter(Boolean));
  for (const id of renderer.partIds.filter((id) => /^Part[A-Za-z]/.test(id))) {
    const b = button(partRow, id.replace(/^Part/, ""), () => {
      const hide = !b.classList.contains("on");
      b.classList.toggle("on", hide);
      renderer.setPartHidden(id, hide);
    });
    if (startHidden.has(id)) b.click();
  }

  // ?param=ParamSunGlassesON:1,ParamX:0 holds model parameters at a value
  // over everything else, to see art a switch shows or hides. Preview only.
  const held = Object.fromEntries(
    (params.get("param") ?? "").split(",").map((kv) => kv.split(":")).filter(([id, v]) => id && v !== undefined && !Number.isNaN(Number(v))).map(([id, v]) => [id, Number(v)]),
  );
  if (Object.keys(held).length) renderer.setPreviewParams(held);

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
    // Articles come back on a tier change.
    articles.reset();
    warmth.setTier(tierPick.value);
    articles.offerHints();
    holds.maybeShowHint();
    newEncounter();
  };
  tierRow.append(tierPick);
  button(tierRow, "new /meet encounter", () => newEncounter());

  const reactRow = section("Reactions (with their poses)");
  for (const name of Object.keys({
    ...DEFAULT_REACTIONS,
    ...renderer.rig.reactions,
  })) {
    const pose = forTier(renderer.rig.reactionPoses?.[name], hangout.tier);
    button(reactRow, pose ? `${name} · ${pose.replace(/^m_/, "")}` : name, () =>
      hangout.react(name, scene.time),
    );
  }

  const spotRow = section("Touch spots");
  for (const spot of Object.keys(TOUCH_SPOTS)) {
    button(spotRow, spot, () => {
      if (!renderer.rig.hotspots?.[spot])
        return say(`(${spot} isn't placed on this outfit)`);
      hangout.react(
        renderer.rig.hotspots[spot].reaction ?? TOUCH_SPOTS[spot],
        scene.time,
        spot,
      );
    });
  }
  // Each article's touch and removal reactions (the removal one plays
  // without taking it off; the Articles row below does that).
  for (const { name } of articles.list()) {
    button(spotRow, `${name} (pat)`, () => articles.pat(name));
    button(spotRow, `${name} (off)`, () => articles.offReaction(name));
  }
  const spotToggle = button(spotRow, "show hotspots", () => {
    showSpots = !showSpots;
    spotToggle.classList.toggle("on", showSpots);
  });

  // Removable articles: each one's state, live (on/off, whether it's out
  // right now and a double-tap would take it); click one to take it off.
  const articleList = articles.list();
  if (articleList.length) {
    const articleRow = section(`Articles (double-tap, ${articles.DOUBLE_TAP}s; warm up)`);
    const states = new Map();
    for (const { name } of articleList) {
      states.set(name, button(articleRow, name, () => articles.remove(name)));
    }
    button(articleRow, "reset", () => articles.reset());
    refreshArticles = () => {
      for (const a of articles.list()) {
        const b = states.get(a.name);
        const state = a.off ? "off" : !a.present ? "not out" : a.removable ? "on · removable" : "on";
        b.textContent = `${a.name}: ${state}${a.requires && !a.off ? ` (after ${a.requires})` : ""} · ${a.covers}`;
        b.classList.toggle("on", a.off);
      }
    };
    setInterval(refreshArticles, 250);
    refreshArticles();
  }

  // A pose button plays and holds it; a second click plays its return.
  const poseRow = section("Poses (hold until clicked again)");
  for (const pose of renderer.poses) {
    const b = button(poseRow, pose.replace(/^m_/, ""), () => {
      poseRow
        .querySelectorAll("button")
        .forEach((x) => x.classList.remove("on"));
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
    const input = Object.assign(document.createElement("input"), {
      type: "range",
      min: 0,
      max: 1,
      step: 0.05,
      value: params.amount ?? fallback,
    });
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

  // --- warmth prototype (docs/hangout-activity.md §12.7) ---------------------
  // "date" is the spec'd profile (close/bound only); "hangout" the proposal
  // for ordinary Hangouts (spark+ only, lower cap, upset clears it). Taps
  // and real /meet answers feed it; the buttons stand in for gestures that
  // aren't built yet. Dragging the slider pins a value to judge the look.
  const warmRow = section("Warmth (prototype, §12.7)");
  const warmPick = document.createElement("select");
  for (const [v, label] of [["", "off"], ["date", "date (close/bound)"], ["hangout", "ordinary Hangout (spark+)"]])
    warmPick.append(new Option(label, v));
  warmPick.onchange = () => {
    warmth = new Warmth(warmPick.value || null, hangout.tier);
    warmthManual = null;
    if (warmPick.value && !warmth.on)
      say(`(warmth "${warmPick.value}" is off at ${hangout.tier}: pick ${warmPick.value === "date" ? "close or bound" : "spark, close or bound"})`);
  };
  warmPick.value = "hangout";
  warmRow.append(warmPick);
  const warmOut = Object.assign(document.createElement("output"), { id: "warmth-out" });
  warmRow.append(warmOut);
  button(warmRow, "fave answer", () => warmth.answer("fave"));
  button(warmRow, "liked answer", () => warmth.answer("liked"));
  button(warmRow, "stroke", () => warmth.stroke());
  button(warmRow, "hold 1s", () => {
    warmth.hold(1);
    warmth.endHold();
  });
  button(warmRow, "reset", () => warmth.setTier(hangout.tier));
  // Press-and-hold buttons for the holds, without aiming at the model.
  // Live tuning of the hold look (live2dRig.js HOLD_LOOK); copy values you
  // like back into the constant.
  for (const [key, max] of [["lookUp", 0.6], ["lids", 0.4], ["chin", 10], ["glanceIn", 1], ["glanceHold", 2.5], ["glanceLift", 2.5], ["peekIn", 1], ["peekHold", 2.5], ["peekLift", 2.5], ["glanceChin", 12]]) {
    const wrap = document.createElement("label");
    wrap.className = "slider";
    const input = Object.assign(document.createElement("input"), { type: "range", min: 0, max, step: max / 40, value: HOLD_LOOK[key] });
    const out = Object.assign(document.createElement("output"), { textContent: HOLD_LOOK[key] });
    input.oninput = () => {
      HOLD_LOOK[key] = Number(input.value);
      out.textContent = Number(input.value).toFixed(2);
    };
    wrap.append(`hold look: ${key}`, input, out);
    warmRow.append(wrap);
  }
  for (const [label, spot, kind] of [["hold: heartbeat", "chest"], ["hold: lips", "lips"], ["hold: hand", "hand_r"], ["hold: tease (bound)", "chest", "tease"]]) {
    const b = button(warmRow, label, () => {});
    b.onpointerdown = () => {
      if (kind === "tease" && hangout.tier !== TEASE_TIER) return say(`(tease is ${TEASE_TIER} only; this is ${hangout.tier})`);
      holds.beginHold(spot, null, kind);
    };
    b.onpointerup = b.onpointerleave = () => holds.holding?.spot === spot && holds.endHold();
  }
  // Past the crest (holds.js bliss): needs a lip and a hand hold this
  // hangout at bound; these skip the setup.
  button(warmRow, "bliss: mark lip + hand done", () => {
    if (hangout.tier !== TEASE_TIER) return say(`(bliss is ${TEASE_TIER} only; this is ${hangout.tier})`);
    holds.primeBliss();
  });
  button(warmRow, "bliss: jump to the edge", () => {
    if (!holds.blissReady) return say(`(needs ${TEASE_TIER} and a lip + hand hold first)`);
    holds.reachEdge();
  });
  button(warmRow, "caught tease (close)", () =>
    hangout.tier === CAUGHT_TIER ? holds.catchTease() : say(`(the caught tease is ${CAUGHT_TIER} only; this is ${hangout.tier})`),
  );
  const pinWrap = document.createElement("label");
  pinWrap.className = "slider";
  const pin = Object.assign(document.createElement("input"), { type: "range", min: 0, max: 1, step: 0.05, value: 0 });
  pin.oninput = () => (warmthManual = Number(pin.value));
  pin.onchange = () => (warmthManual = null);
  pinWrap.append("pin while dragging", pin);
  warmRow.append(pinWrap);
  const react = hangout.react.bind(hangout);
  hangout.react = (name, t, spot, opts) => {
    const out = react(name, t, spot, opts);
    warmth.reaction(name);
    return out;
  };

  // Phones run the Activity at MOBILE_FPS (main.js); this previews that.
  const perfRow = section("Performance");
  const capWrap = document.createElement("label");
  capWrap.className = "toggle";
  const cap = Object.assign(document.createElement("input"), {
    type: "checkbox",
    checked: params.has("mobile"),
  });
  cap.onchange = () => (scene.frameCap.maxFPS = cap.checked ? MOBILE_FPS : 0);
  capWrap.append(cap, "cap 30fps (mobile)");
  perfRow.append(capWrap);
  if (cap.checked) scene.frameCap.maxFPS = MOBILE_FPS;

  // The Activity's desktop close-up button (main.js): the landscape bust in
  // place of the default full framing, on a wide window only.
  const frameRow = section("Framing");
  const closeWrap = document.createElement("label");
  closeWrap.className = "toggle";
  const closeUp = Object.assign(document.createElement("input"), { type: "checkbox" });
  closeUp.onchange = () => scene.setCloseUp(closeUp.checked);
  closeWrap.append(closeUp, "close-up (desktop)");
  frameRow.append(closeWrap);

  // --- effects prototype (docs/hangout-activity.md §10) ------------------------
  // Throwaway: every candidate effect, live. "auto" applies the rules that
  // would ship (Hotarubi rain, TZ night grade on day files, light blur).
  const fx = effects.state;
  const fxControls = [];
  const fxRow = (title) => section(title);
  const control = (row, label, el, read, write) => {
    const wrap = document.createElement("label");
    wrap.className = el.type === "checkbox" ? "toggle" : "slider";
    const out = el.type === "range" ? document.createElement("output") : null;
    const sync = () => {
      write(el);
      if (out) out.textContent = el.value;
    };
    el.oninput = el.onchange = () => {
      effects.set(read(el));
      if (out) out.textContent = el.value;
    };
    wrap.append(...(el.type === "checkbox" ? [el, label] : [label, el]), ...(out ? [out] : []));
    row.append(wrap);
    fxControls.push(sync);
  };
  const range = (min, max, step) => Object.assign(document.createElement("input"), { type: "range", min, max, step });
  const check = () => Object.assign(document.createElement("input"), { type: "checkbox" });
  const select = (options) => {
    const el = document.createElement("select");
    for (const o of options) el.append(new Option(o, o));
    return el;
  };
  const refreshFx = () => fxControls.forEach((f) => f());

  const placeRow = fxRow("Effects · background and auto rules (prototype)");
  const bgPick = document.createElement("select");
  const groups = {};
  bgPick.append(new Option("(current)", ""));
  for (const path of BACKGROUNDS) {
    const dir = path.split("/").at(-2);
    groups[dir] ??= bgPick.appendChild(Object.assign(document.createElement("optgroup"), { label: dir }));
    groups[dir].append(new Option(path.split("/").pop().replace(/\.png$/, ""), path));
  }
  bgPick.onchange = () => bgPick.value && scene.setBackground(bgPick.value);
  placeRow.append(bgPick);
  const timePick = select(["auto", "day", "evening"]);
  placeRow.append(timePick);
  const why = document.createElement("p");
  why.className = "fx-why";
  const runAuto = () => {
    const a = autoEffects(scene.backgroundUrl, new Date(), timePick.value);
    effects.set({ rain: a.rain, particles: a.particles, grade: a.grade, gradeStrength: a.gradeStrength, blur: a.blur });
    why.textContent = `auto: ${a.why.length ? a.why.join(" · ") : "no rule matched (day file, daytime)"} · blur 2`;
    refreshFx();
  };
  timePick.onchange = runAuto;
  button(placeRow, "apply auto rules", runAuto);
  const autoOnChange = check();
  autoOnChange.checked = true;
  const autoWrap = document.createElement("label");
  autoWrap.className = "toggle";
  autoWrap.append(autoOnChange, "re-run auto when the background changes");
  placeRow.append(autoWrap);
  button(placeRow, "all off", () => {
    effects.set({ rain: false, particles: null, grade: "none", rigLight: false, blur: 0, flicker: false, vignette: 0, grain: false });
    why.textContent = "";
    refreshFx();
  });
  placeRow.after(why);
  scene.onBackground = () => {
    effects.apply();
    if (autoOnChange.checked) runAuto();
  };

  const weatherRow = fxRow("Effects · weather and particles");
  control(weatherRow, "rain", check(), (el) => ({ rain: el.checked }), (el) => (el.checked = fx.rain));
  control(weatherRow, "rain density", range(0.1, 2, 0.1), (el) => ({ rainDensity: Number(el.value) }), (el) => (el.value = fx.rainDensity));
  control(weatherRow, "rain layer ", select(["both", "behind", "front"]), (el) => ({ rainLayer: el.value }), (el) => (el.value = fx.rainLayer));
  control(weatherRow, "particles ", select(["none", ...PARTICLE_KINDS]), (el) => ({ particles: el.value === "none" ? null : el.value }), (el) => (el.value = fx.particles ?? "none"));
  control(weatherRow, "particle density", range(0.1, 2, 0.1), (el) => ({ particleDensity: Number(el.value) }), (el) => (el.value = fx.particleDensity));
  control(weatherRow, "particle layer ", select(["behind", "front", "both"]), (el) => ({ particleLayer: el.value }), (el) => (el.value = fx.particleLayer));

  const lightRow = fxRow("Effects · color grade and light");
  control(lightRow, "grade ", select(Object.keys(GRADES)), (el) => ({ grade: el.value }), (el) => (el.value = fx.grade));
  control(lightRow, "grade strength", range(0, 1, 0.05), (el) => ({ gradeStrength: Number(el.value) }), (el) => (el.value = fx.gradeStrength));
  control(lightRow, "light the rig too (touches the rig)", check(), (el) => ({ rigLight: el.checked }), (el) => (el.checked = fx.rigLight));
  control(lightRow, "rig grade strength", range(0, 1, 0.05), (el) => ({ rigStrength: Number(el.value) }), (el) => (el.value = fx.rigStrength));
  control(lightRow, "flicker (neon / candle)", check(), (el) => ({ flicker: el.checked }), (el) => (el.checked = fx.flicker));

  const lensRow = fxRow("Effects · lens");
  control(lensRow, "background blur", range(0, 10, 0.5), (el) => ({ blur: Number(el.value) }), (el) => (el.value = fx.blur));
  control(lensRow, "vignette", range(0, 0.9, 0.05), (el) => ({ vignette: Number(el.value) }), (el) => (el.value = fx.vignette));
  control(lensRow, "film grain (whole stage)", check(), (el) => ({ grain: el.checked }), (el) => (el.checked = fx.grain));

  if (params.get("bg")) scene.setBackground(params.get("bg"));
  runAuto();

  // --- VN chrome ------------------------------------------------------------
  $("#btn-debug").onclick = () => {
    panel.hidden = !panel.hidden;
    document.body.classList.toggle("drawer-open", !panel.hidden);
    // Pixi's resizeTo only watches the window, so nudge it to re-fit the
    // canvas to the stage's new width.
    dispatchEvent(new Event("resize"));
  };
  const toggleUi = () => {
    const hidden = document.body.classList.toggle("hide-ui");
    $("#btn-hide-ui").setAttribute("aria-pressed", String(hidden));
  };
  $("#btn-hide-ui").onclick = toggleUi;
  // DEBUG default: start with the drawer open.
  panel.hidden = false;
  document.body.classList.add("drawer-open");
  dispatchEvent(new Event("resize"));
  addEventListener("keydown", (e) => {
    if (
      e.key.toLowerCase() === "h" &&
      !e.target.closest("input, select, textarea")
    )
      toggleUi();
  });

  // --- /meet (docs/hangout-activity.md §11.2) --------------------------------
  // The Activity's own flow (meet.js), fed by the dev server's /__meet: the
  // tier's first level, no boost or errand, nothing recorded.
  const flow = meetFlow(scene, {
    box: $(".vn-box"),
    choices: $("#choices"),
    next: $("#btn-next"),
  });

  async function newEncounter() {
    flow.stop();
    const q = new URLSearchParams({
      character,
      tier: hangout.tier,
      variant: renderer.rig.dialogueVariant ?? "uniform",
    });
    const res = await fetch(`/__meet/beat?${q}`);
    const beat = await res.json();
    if (!res.ok) return say(`(no /meet encounter: ${beat.error})`);
    if (beat.background)
      scene
        .setBackground(beat.background)
        .catch((err) => console.error(`[hangout] ${err.message}`));
    flow.play(beat, async (type) => {
      const a = new URLSearchParams({
        character,
        tier: hangout.tier,
        type,
        mood: beat.mood ? "1" : "0",
      });
      const answer = await fetch(`/__meet/answer?${a}`);
      const result = await answer.json();
      if (!answer.ok) throw new Error(result.error);
      return result;
    });
  }

  newEncounter();
  if (renderer.poses.includes(params.get("pose")))
    renderer.playPose(params.get("pose"));
  window.__hangoutV2 = scene;
}

main().catch((err) => {
  $("#controls").textContent = `hangout failed: ${err.message}`;
  console.error(`[hangout] ${err.stack ?? err.message}`);
});
