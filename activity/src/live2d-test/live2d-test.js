// Live2D plugin test (dev only): Alan's Live2D model, converted from the
// game, through untitled-pixi-live2d-engine on the app's pixi.js. Checks the
// plugin bundles with Vite and runs with Cubism Core served from /assets
// (Discord's proxy allows no third-party CDN). See live2d-test.html.
//
// Poses play like the game's Animator: the pose clip, then its looping
// *_hold clip (the pose's last frame) until clicked again, then *_return.
// ?pose=<group> starts one; ?expr=<name> sets an expression.

import { Application, extensions, VERSION } from "pixi.js";
import { Live2DModel, Live2DPlugin, MotionPriority } from "untitled-pixi-live2d-engine/cubism";

const MODEL = "assets/live2d/alan/academy/alan_academy.model3.json";
const params = new URLSearchParams(location.search);
const $ = (sel) => document.querySelector(sel);
const log = (msg) => ($("#status").textContent = msg);

function button(row, label, onClick) {
  const b = document.createElement("button");
  b.textContent = label;
  b.onclick = onClick;
  row.append(b);
  return b;
}

async function motionJson(file) {
  return (await fetch(new URL(file, new URL(MODEL, location.href)))).json();
}

async function main() {
  extensions.add(Live2DPlugin);
  const app = new Application();
  await app.init({ resizeTo: $("#stage"), preference: "webgl", background: "#1b1824", antialias: true, resolution: Math.min(devicePixelRatio, 2), autoDensity: true });
  $("#stage").prepend(app.canvas);

  const model = await Live2DModel.from(MODEL);
  model.anchor.set(0.5, 1);
  app.stage.addChild(model);
  const fit = () => {
    const { width, height } = model.internalModel;
    model.scale.set(Math.min(app.screen.width / width, (app.screen.height - 40) / height) * 0.9);
    model.position.set(app.screen.width / 2, app.screen.height - 30);
  };
  fit();
  addEventListener("resize", fit);

  const groups = model.internalModel.settings.motions;
  const durations = {};
  await Promise.all(Object.entries(groups).map(async ([name, [entry]]) => {
    durations[name] = (await motionJson(entry.File)).Meta.Duration;
  }));

  // --- breath layer ---------------------------------------------------------
  // The game runs breathing on its own layer. m_breath writes all 51 curves
  // (mostly rest values), which would wipe a held pose, so this layer drives
  // ParamBreath only.
  const breathIgnore = (await motionJson(groups.m_breath[0].File)).Curves.map((c) => c.Id).filter((id) => id !== "ParamBreath");
  let breathing = false;
  const breathBtn = button($("#layers"), "breath layer", async () => {
    breathing = !breathing;
    breathBtn.classList.toggle("on", breathing);
    if (breathing) {
      await model.parallelMotion([{ group: "m_breath", index: 0, priority: MotionPriority.IDLE, loop: true, ignoreParamIds: breathIgnore }]);
    } else {
      for (const manager of model.internalModel.parallelMotionManager) manager.stopAllMotions();
    }
  });

  // --- poses ----------------------------------------------------------------
  // onFinish only fires for motions with sound, so the hand-off to the hold
  // clip is timed from the pose's own duration.
  let held = null;
  let holdTimer = 0;
  const poseButtons = {};
  const enter = (pose) => {
    held = null;
    clearTimeout(holdTimer);
    Object.values(poseButtons).forEach((b) => b.classList.remove("on"));
    poseButtons[pose].classList.add("on");
    log(`playing ${pose}`);
    model.motion(pose, 0, MotionPriority.FORCE);
    holdTimer = setTimeout(async () => {
      held = pose;
      const ok = await model.motion(`${pose}_hold`, 0, MotionPriority.FORCE, { loop: true });
      log(ok ? `holding ${pose}; click again to return` : `couldn't start ${pose}_hold`);
    }, durations[pose] * 1000 - 50);
  };
  const leave = (pose) => {
    held = null;
    clearTimeout(holdTimer);
    poseButtons[pose].classList.remove("on");
    log(`playing ${pose}_return`);
    model.motion(`${pose}_return`, 0, MotionPriority.FORCE);
  };
  const poses = Object.keys(groups).filter((name) => groups[`${name}_return`] && groups[`${name}_hold`]);
  for (const pose of poses) {
    poseButtons[pose] = button($("#poses"), pose.replace(/^m_/, ""), () => (held === pose ? leave(pose) : enter(pose)));
  }

  // --- expressions ----------------------------------------------------------
  const expressions = model.internalModel.settings.expressions ?? [];
  for (const { Name } of expressions) {
    const b = button($("#exprs"), Name.replace(/^e_/, ""), () => {
      model.expression(Name);
      $("#exprs").querySelectorAll("button").forEach((x) => x.classList.remove("on"));
      b.classList.add("on");
    });
  }

  log(`OK: pixi ${VERSION}, ${poses.length} poses, ${expressions.length} expressions, physics ${model.internalModel.physics ? "on" : "missing"}`);
  if (params.get("expr")) model.expression(params.get("expr"));
  if (poses.includes(params.get("pose"))) enter(params.get("pose"));
  window.__live2dTest = { model, app };
}

main().catch((err) => {
  log(`live2d test failed: ${err.message}`);
  console.error(`[live2d-test] ${err.stack ?? err.message}`);
});
