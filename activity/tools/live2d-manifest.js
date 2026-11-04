// Rebuilds Hangout model manifests (activity/src/hangout/manifest.js):
// the expression deltas, clip lengths and idle parameters live2dRig.js
// loads in one request. live2d-convert.js writes one with every model; run
// this after editing a motion or expression file by hand.
//
//   node activity/tools/live2d-manifest.js [character...]
//
// With no character it rebuilds every model under assets/live2d/.
// test/live2d-manifest.test.js fails while any manifest is stale.

import fs from "node:fs";
import path from "node:path";

import { buildModelManifest, manifestPath } from "../src/hangout/manifest.js";

const REPO = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
export const LIVE2D_DIR = path.join(REPO, "assets/live2d");

const readJson = (file) => JSON.parse(fs.readFileSync(file, "utf8"));

/** Every model3.json under assets/live2d/<character>/<outfit>/, for `characters` (all if empty). */
export function modelFiles(characters = []) {
  const ids = characters.length ? characters : fs.readdirSync(LIVE2D_DIR).filter((d) => fs.existsSync(path.join(LIVE2D_DIR, d, "rig.json")));
  return ids.flatMap((id) => {
    const dir = path.join(LIVE2D_DIR, id);
    return fs.readdirSync(dir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .flatMap((d) => fs.readdirSync(path.join(dir, d.name)).filter((f) => f.endsWith(".model3.json")).map((f) => path.join(dir, d.name, f)));
  });
}

/** The manifest JSON text for the model3.json at `modelFile`, as written to disk. */
export async function manifestText(modelFile) {
  const dir = path.dirname(modelFile);
  const manifest = await buildModelManifest(readJson(modelFile), (file) => readJson(path.join(dir, file)));
  return JSON.stringify(manifest) + "\n";
}

/** Writes the manifest beside `modelFile`; returns its path. */
export async function writeManifest(modelFile) {
  const out = manifestPath(modelFile);
  fs.writeFileSync(out, await manifestText(modelFile));
  return out;
}

async function main() {
  const files = modelFiles(process.argv.slice(2));
  if (!files.length) {
    console.error("[live2d-manifest] no models found");
    process.exit(1);
  }
  for (const file of files) {
    const out = await writeManifest(file);
    console.log(`[live2d-manifest] ${path.relative(REPO, out)} (${fs.statSync(out).size} bytes)`);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) main();
