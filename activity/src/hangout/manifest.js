// A Live2D model's manifest: what live2dRig.js needs from the model's
// expression and motion files at load, gathered into one file beside the
// model3.json (<base>.manifest.json) so a hangout opens with one request
// instead of one per file (~70 for a full model).
//
// - expressions: each expression's Parameters, by name (the mood deltas)
// - durations: each motion group's first clip length in seconds (pose timing)
// - idleParams: the parameter ids the Idle clip actually moves (idle damping)
//
// live2d-convert.js writes it with the model; tools/live2d-manifest.js
// rebuilds it after a motion or expression file is edited by hand, and
// test/live2d-manifest.test.js fails when one is stale. The browser falls
// back to building it from the files if it's missing.

/** The manifest's path for a model3.json path (same folder, same base). */
export function manifestPath(modelFile) {
  return modelFile.replace(/\.model3\.json$/, ".manifest.json");
}

/**
 * Builds the manifest for `model3` (the parsed model3.json). `readJson(file)`
 * loads a file named relative to the model3.json, sync or async.
 */
export async function buildModelManifest(model3, readJson) {
  const refs = model3.FileReferences ?? {};
  const expressions = Object.fromEntries(
    await Promise.all((refs.Expressions ?? []).map(async (e) => [e.Name, (await readJson(e.File)).Parameters])),
  );
  const clips = new Map();
  const clip = (file) => {
    if (!clips.has(file)) clips.set(file, Promise.resolve(readJson(file)));
    return clips.get(file);
  };
  const durations = Object.fromEntries(
    await Promise.all(Object.entries(refs.Motions ?? {}).map(async ([group, [m]]) => [group, (await clip(m.File)).Meta.Duration])),
  );
  const idleFile = refs.Motions?.Idle?.[0]?.File;
  const idleParams = idleFile ? animatedIds(await clip(idleFile)) : [];
  return { expressions, durations, idleParams };
}

/** The ids a motion3.json's curves actually change (the rig keeps the parameters). */
function animatedIds(motion) {
  return motion.Curves
    .filter((c) => {
      const v = curveValues(c.Segments);
      return Math.max(...v) - Math.min(...v) > 1e-3;
    })
    .map((c) => c.Id);
}

/** Every value a motion3 curve passes through (points and bezier handles). */
function curveValues(s) {
  const out = [s[1]];
  for (let i = 2; i < s.length; ) {
    const type = s[i];
    const n = type === 1 ? 6 : 2;
    for (let k = 2; k <= n; k += 2) out.push(s[i + k]);
    i += 1 + n;
  }
  return out;
}
