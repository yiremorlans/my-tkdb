// Rebuilds a game Live2D model as plain Cubism files for Hangout v2
// (docs/hangout-activity.md §3.6): moc3, model3.json, physics3.json, one
// exp3.json per expression and one motion3.json per clip, plus a looping
// *_hold clip for every pose that has a *_return.
//
//   node activity/tools/live2d-convert.js <character> [--outfit academy]
//        (--bundle <file> | --assets <ExportedProject/Assets>)
//        [--ripper http://localhost:54321] [--out <dir>] [--force]
//
// The game ships each model as a Cubism SDK for Unity prefab inside an
// addressables bundle (dialogueactors_assets_<name><outfit>_<hash>.bundle,
// cached by the game under UnityCache/Shared/<x>/<hash>/__data). --bundle
// runs it through a headless AssetRipper server's "Unity project" export
// first; --assets takes an export made by hand. Files are named
// <character>_<outfit>.* after the repo's ids (the game says luca, sho).
//
// Nothing here reads Unity's binary formats: the moc3 is the CubismMoc
// asset's `_bytes` verbatim, and everything else comes from the
// MonoBehaviour YAML AssetRipper writes (a minimal parser below covers it).

import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const REPO = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");

// --- Unity YAML ---------------------------------------------------------------
// AssetRipper's MonoBehaviour YAML uses a small subset: nested mappings,
// "- " lists (of scalars or of mappings), flow maps like {x: 0, y: 1}, and
// "[]" for empty lists. Scalars are numbers where they parse as one.

const NUMBER = /^[-+]?(\d+\.?\d*|\.\d+)([eE][-+]?\d+)?$|^[-+]?Infinity$/;

function scalar(s) {
  s = s.trim();
  if (s === "[]") return [];
  if (s.startsWith("{") && s.endsWith("}")) {
    return Object.fromEntries(
      s.slice(1, -1).split(",").filter((p) => p.trim()).map((p) => {
        const i = p.indexOf(":");
        return [p.slice(0, i).trim(), scalar(p.slice(i + 1))];
      }),
    );
  }
  return NUMBER.test(s) ? Number(s) : s;
}

const indentOf = (line) => line.length - line.trimStart().length;

/** Parses the block starting at `lines[start]` at `indent`; returns [value, next line]. */
function parseBlock(lines, start, indent) {
  let i = start;
  let result = null;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }
    const cur = indentOf(line);
    const body = line.trim();
    if (cur < indent) break;
    if (body.startsWith("- ") || body === "-") {
      if (cur !== indent) break;
      result ??= [];
      const item = body === "-" ? "" : body.slice(2);
      if (item.includes(":") && !item.startsWith("{")) {
        // "- Key: value" opens a mapping item: reparse it at the item's indent.
        lines[i] = " ".repeat(cur + 2) + item;
        const [value, next] = parseBlock(lines, i, cur + 2);
        result.push(value);
        i = next;
      } else {
        result.push(scalar(item));
        i++;
      }
      continue;
    }
    if (cur !== indent || Array.isArray(result)) break;
    const colon = body.indexOf(":");
    const key = body.slice(0, colon);
    const val = body.slice(colon + 1);
    result ??= {};
    if (val.trim()) {
      result[key] = scalar(val);
      i++;
      continue;
    }
    let next = i + 1;
    while (next < lines.length && !lines[next].trim()) next++;
    if (next < lines.length) {
      const nind = indentOf(lines[next]);
      if (nind > indent || (nind === indent && lines[next].trim().startsWith("- "))) {
        [result[key], i] = parseBlock(lines, next, nind);
        continue;
      }
    }
    result[key] = null;
    i++;
  }
  return [result, i];
}

function monoBehaviourFields(text) {
  const lines = text.split("\n");
  return parseBlock(lines, lines.indexOf("MonoBehaviour:") + 1, 2)[0];
}

/** The CubismPhysicsController's `_rig` from the model's prefab. */
function findRig(prefabText) {
  for (const doc of prefabText.split("\n--- ")) {
    if (!doc.includes("\n  _rig:")) continue;
    const lines = doc.split("\n");
    return parseBlock(lines, lines.indexOf("  _rig:") + 1, 4)[0];
  }
  throw new Error("no CubismPhysicsController _rig found in the prefab");
}

// --- physics3 -----------------------------------------------------------------

const COMPONENT = { 0: "X", 1: "Y", 2: "Angle" };

export function rigToPhysics3(rig) {
  const settings = [];
  const dictionary = [];
  let totalIn = 0, totalOut = 0, vertices = 0;
  rig.SubRigs.forEach((sub, n) => {
    const id = `PhysicsSetting${n + 1}`;
    const outputs = sub.Output || [];
    dictionary.push({ Id: id, Name: outputs.length ? outputs[0].DestinationId : id });
    const input = (sub.Input || []).map((s) => ({
      Source: { Target: "Parameter", Id: s.SourceId },
      Weight: s.Weight,
      Type: COMPONENT[s.SourceComponent],
      Reflect: Boolean(s.IsInverted),
    }));
    const output = outputs.map((o) => {
      const type = COMPONENT[o.SourceComponent];
      return {
        Destination: { Target: "Parameter", Id: o.DestinationId },
        VertexIndex: o.ParticleIndex,
        Scale: { X: o.TranslationScale.x, Y: o.TranslationScale.y, Angle: o.AngleScale }[type],
        Weight: o.Weight,
        Type: type,
        Reflect: Boolean(o.IsInverted),
      };
    });
    const verts = sub.Particles.map((p) => ({
      Position: { X: p.InitialPosition.x, Y: p.InitialPosition.y },
      Mobility: p.Mobility,
      Delay: p.Delay,
      Acceleration: p.Acceleration,
      Radius: p.Radius,
    }));
    const norm = sub.Normalization;
    const range = (k) => ({ Minimum: norm[k].Minimum, Default: norm[k].Default, Maximum: norm[k].Maximum });
    settings.push({ Id: id, Input: input, Output: output, Vertices: verts, Normalization: { Position: range("Position"), Angle: range("Angle") } });
    totalIn += input.length;
    totalOut += output.length;
    vertices += verts.length;
  });
  return {
    Version: 3,
    Meta: {
      PhysicsSettingCount: settings.length,
      TotalInputCount: totalIn,
      TotalOutputCount: totalOut,
      VertexCount: vertices,
      EffectiveForces: {
        Gravity: { X: rig.Gravity.x, Y: rig.Gravity.y },
        Wind: { X: rig.Wind.x, Y: rig.Wind.y },
      },
      Fps: rig.Fps ?? 60,
      PhysicsDictionary: dictionary,
    },
    PhysicsSettings: settings,
  };
}

// --- motion3 ------------------------------------------------------------------

const BLEND = { 0: "Overwrite", 1: "Add", 2: "Multiply" };
const round5 = (x) => Math.round(x * 1e5) / 1e5;
const infinite = (s) => typeof s !== "number" || !Number.isFinite(s);

/**
 * Unity Hermite keyframes -> motion3 segments. The Cubism Unity importer
 * turns linear and bezier segments into slopes and stepped ones into
 * infinite slopes; this inverts that. With Unity's default 1/3 tangent
 * weights a Hermite span is exactly a cubic bezier with its control points
 * at 1/3 and 2/3 of the span.
 */
export function curveToSegments(keys) {
  const segs = [keys[0].time, keys[0].value];
  let points = 1;
  for (let k = 1; k < keys.length; k++) {
    const { time: t0, value: v0, outSlope: out } = keys[k - 1];
    const { time: t1, value: v1, inSlope: inS } = keys[k];
    const dt = t1 - t0;
    if (infinite(out)) segs.push(2, t1, v1);
    else if (infinite(inS)) segs.push(3, t1, v1);
    else if (dt > 0 && Math.abs(out - (v1 - v0) / dt) < 1e-4 && Math.abs(inS - (v1 - v0) / dt) < 1e-4) segs.push(0, t1, v1);
    else {
      segs.push(1, t0 + dt / 3, v0 + (out * dt) / 3, t1 - dt / 3, v1 - (inS * dt) / 3, t1, v1);
      points += 2;
    }
    points += 1;
  }
  return { segments: segs.map(round5), count: keys.length - 1, points };
}

function fadeToMotion3(fade, loop) {
  const curves = [];
  let segments = 0, points = 0;
  fade.ParameterIds.forEach((id, i) => {
    const keys = fade.ParameterCurves[i].m_Curve;
    if (!keys?.length) return;
    const c = curveToSegments(keys);
    curves.push({ Target: "Parameter", Id: id, Segments: c.segments });
    segments += c.count;
    points += c.points;
  });
  return {
    Version: 3,
    Meta: {
      Duration: fade.MotionLength,
      Fps: 60,
      Loop: loop,
      AreBeziersRestricted: true,
      FadeInTime: fade.FadeInTime,
      FadeOutTime: fade.FadeOutTime,
      CurveCount: curves.length,
      TotalSegmentCount: segments,
      TotalPointCount: points,
      UserDataCount: 0,
      TotalUserDataSize: 0,
    },
    Curves: curves,
  };
}

/**
 * A looping clip pinned at a pose's last frame. The game's Animator keeps a
 * pose up until its *_return clip plays; Live2D players drop back to Idle
 * when a clip ends, so live2dRig.js playPose plays this after the pose.
 * No fade-in, so the hand-off doesn't dip.
 */
export function holdMotion(motion) {
  const curves = motion.Curves.map((c) => {
    const last = c.Segments.at(-1);
    return { Target: c.Target, Id: c.Id, Segments: [0, last, 0, 1, last] };
  });
  return {
    Version: 3,
    Meta: { ...motion.Meta, Duration: 1, Loop: true, FadeInTime: 0, CurveCount: curves.length, TotalSegmentCount: curves.length, TotalPointCount: 2 * curves.length },
    Curves: curves,
  };
}

// --- convert ------------------------------------------------------------------

const writeJson = (file, value) => fs.writeFileSync(file, JSON.stringify(value, null, 2) + "\n");

/** Writes the model's Cubism files to `out` as `<base>.*`; returns a summary. */
export function convertExport(assets, base, out) {
  const mb = path.join(assets, "MonoBehaviour");
  const mbFiles = fs.readdirSync(mb).sort();
  const read = (f) => fs.readFileSync(path.join(mb, f), "utf8");
  fs.mkdirSync(path.join(out, "expressions"), { recursive: true });
  fs.mkdirSync(path.join(out, "motions"), { recursive: true });

  // The moc asset is usually <game name>.asset, but some bundles leave it
  // unnamed (MonoBehaviour.asset): take whichever MonoBehaviour holds bytes.
  const mocFile = mbFiles.find((f) => f.endsWith(".asset") && read(f).includes("\n  _bytes: "));
  if (!mocFile) throw new Error(`no CubismMoc asset in ${mb}`);
  const moc = Buffer.from(read(mocFile).match(/\n {2}_bytes: ([0-9a-f]+)/)[1], "hex");
  if (moc.subarray(0, 4).toString() !== "MOC3") throw new Error(`${mocFile}: moc data doesn't start with MOC3`);
  fs.writeFileSync(path.join(out, `${base}.moc3`), moc);

  const texture = `${base}_00.png`;
  fs.copyFileSync(path.join(assets, "Texture2D", "texture_00.png"), path.join(out, texture));

  const actors = path.join(assets, "Dialogue", "Actors");
  const prefab = fs.readdirSync(actors).flatMap((d) => fs.readdirSync(path.join(actors, d)).filter((f) => f.endsWith(".prefab")).map((f) => path.join(actors, d, f)))[0];
  if (!prefab) throw new Error(`no model prefab under ${actors}`);
  const physics = rigToPhysics3(findRig(fs.readFileSync(prefab, "utf8")));
  writeJson(path.join(out, `${base}.physics3.json`), physics);

  const expressions = [];
  for (const f of mbFiles.filter((f) => f.endsWith(".exp3.asset"))) {
    const e = monoBehaviourFields(read(f));
    const name = f.slice(0, -".exp3.asset".length);
    const file = `expressions/${name}.exp3.json`;
    writeJson(path.join(out, file), {
      Type: "Live2D Expression",
      FadeInTime: e.FadeInTime,
      FadeOutTime: e.FadeOutTime,
      Parameters: (e.Parameters || []).map((p) => ({ Id: p.Id, Value: p.Value, Blend: BLEND[p.Blend] })),
    });
    expressions.push({ Name: name, File: file });
  }

  // One group per clip so callers play them by name; "Idle" is what Live2D
  // runtimes loop by default, matching the game's resting state.
  const motions = {};
  for (const f of mbFiles.filter((f) => f.endsWith(".fade.asset"))) {
    const name = f.slice(0, -".fade.asset".length);
    const anim = path.join(assets, "AnimationClip", `${name}.anim`);
    const loop = fs.existsSync(anim) && fs.readFileSync(anim, "utf8").includes("m_LoopTime: 1");
    const motion = fadeToMotion3(monoBehaviourFields(read(f)), loop);
    writeJson(path.join(out, `motions/${name}.motion3.json`), motion);
    motions[name] = [{ File: `motions/${name}.motion3.json` }];
    if (mbFiles.includes(`${name}_return.fade.asset`)) {
      writeJson(path.join(out, `motions/${name}_hold.motion3.json`), holdMotion(motion));
      motions[`${name}_hold`] = [{ File: `motions/${name}_hold.motion3.json` }];
    }
  }
  if (motions.m_default) motions.Idle = motions.m_default;

  // Groups list only the parameters the moc has: some models have no
  // standard eyes (Haru's academy model blinks only its kaii's), and the
  // game doesn't blink those either.
  const has = (id) => moc.includes(Buffer.from(id));
  const groups = [
    ["EyeBlink", ["ParamEyeLOpen", "ParamEyeROpen"]],
    ["LipSync", ["ParamMouthOpenY"]],
  ].map(([Name, ids]) => ({ Target: "Parameter", Name, Ids: ids.filter(has) }));

  const sorted = Object.fromEntries(Object.entries(motions).sort(([a], [b]) => (a === "Idle") - (b === "Idle") || (a < b ? -1 : a > b ? 1 : 0)));
  writeJson(path.join(out, `${base}.model3.json`), {
    Version: 3,
    FileReferences: {
      Moc: `${base}.moc3`,
      Textures: [texture],
      Physics: `${base}.physics3.json`,
      Expressions: expressions,
      Motions: sorted,
    },
    Groups: groups,
  });

  const physicsIds = physics.PhysicsSettings.flatMap((s) => [...s.Input.map((i) => i.Source.Id), ...s.Output.map((o) => o.Destination.Id)]);
  return {
    moc: moc.length,
    physics: physics.Meta.PhysicsSettingCount,
    expressions: expressions.length,
    motions: Object.keys(motions).length - (motions.Idle ? 1 : 0),
    missingPhysicsIds: [...new Set(physicsIds)].filter((id) => !has(id)),
    groups: groups.map((g) => `${g.Name}: ${g.Ids.join(", ") || "none"}`),
  };
}

// --- AssetRipper ----------------------------------------------------------------
// AssetRipper's headless server (AssetRipper.GUI.* --headless --port N) takes
// form posts: LoadFolder loads every bundle in a folder, Export/UnityProject
// writes ExportedProject/. Both answer with a redirect when done.

async function ripBundle(bundle, ripper) {
  const work = fs.mkdtempSync(path.join(os.tmpdir(), "live2d-convert-"));
  const input = path.join(work, "in");
  fs.mkdirSync(input);
  fs.copyFileSync(bundle, path.join(input, "model.bundle"));
  const post = async (route, dir) => {
    const res = await fetch(`${ripper}/${route}`, { method: "POST", body: new URLSearchParams({ path: dir }), redirect: "manual" });
    if (res.status >= 400) throw new Error(`AssetRipper ${route}: HTTP ${res.status}`);
  };
  await post("LoadFolder", input);
  await post("Export/UnityProject", path.join(work, "out"));
  return path.join(work, "out", "ExportedProject", "Assets");
}

async function main() {
  const [character, ...rest] = process.argv.slice(2);
  const opt = (name, fallback = null) => {
    const i = rest.indexOf(`--${name}`);
    return i >= 0 ? rest[i + 1] : fallback;
  };
  if (!character || (!opt("bundle") && !opt("assets"))) {
    console.error("usage: node activity/tools/live2d-convert.js <character> [--outfit academy] (--bundle <file> | --assets <ExportedProject/Assets>) [--ripper http://localhost:54321] [--out <dir>] [--force]");
    process.exit(1);
  }
  const outfit = opt("outfit", "academy");
  const out = path.resolve(opt("out", path.join(REPO, "assets/live2d", character, outfit)));
  if (fs.existsSync(out) && !rest.includes("--force")) {
    console.error(`[live2d-convert] ${out} exists; pass --force to replace it`);
    process.exit(1);
  }
  const assets = opt("assets") ? path.resolve(opt("assets")) : await ripBundle(path.resolve(opt("bundle")), opt("ripper", "http://localhost:54321"));
  fs.rmSync(out, { recursive: true, force: true });
  const s = convertExport(assets, `${character}_${outfit}`, out);
  console.log(`[live2d-convert] ${out}: moc3 ${s.moc} bytes, ${s.physics} physics settings, ${s.expressions} expressions, ${s.motions} motions`);
  console.log(`[live2d-convert] groups: ${s.groups.join("; ")}`);
  if (s.missingPhysicsIds.length) console.log(`[live2d-convert] physics parameters missing from the moc3: ${s.missingPhysicsIds.join(", ")}`);
  console.log(`[live2d-convert] next: node activity/tools/live2d-rig.js ${character} --outfit ${outfit}`);
}

if (import.meta.url === `file://${process.argv[1]}`) main();
