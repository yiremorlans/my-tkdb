// Hangout rig: loads a character's rig.json and every image it names, and
// validates it before anything renders (docs/hangout-activity.md §3.2).
// The checks themselves live in skeleton.js validateRig so Node tests can
// run them without a browser.

import { Texture } from "pixi.js";

import { imagesOf, soundsOf, validateRig } from "./skeleton.js";

/**
 * Fetches `${baseUrl}/rig.json`, loads its images (every outfit's) as Pixi
 * textures and validates it, each outfit included. Throws one Error listing
 * every problem (unknown parents, cycles, missing images) rather than
 * rendering a half-built character. `rig` is returned as loaded, outfits
 * and all; RigRenderer picks the outfit. `sounds` maps each reaction sound
 * file to its bytes, for hangout/sounds.js to decode.
 */
export async function loadRig(baseUrl) {
  // Default caching: Express revalidates by ETag, and the dev server sends
  // no-store itself, so the preview still sees every save.
  const res = await fetch(`${baseUrl}/rig.json`);
  if (!res.ok) throw new Error(`rig.json: HTTP ${res.status} at ${baseUrl}`);
  const rig = await res.json();

  const textures = await loadEach(imagesOf(rig), (f) => loadTexture(`${baseUrl}/${f}`));
  const sounds = await loadEach(soundsOf(rig), (f) => loadBytes(`${baseUrl}/${f}`));

  validateRig(rig, { imageExists: (f) => textures.has(f), soundExists: (f) => sounds.has(f) });
  return { rig, textures, sounds, baseUrl };
}

// file → what `load` gave for it, for every file that loaded; validateRig
// reports the ones that didn't.
async function loadEach(files, load) {
  const loaded = new Map();
  const results = await Promise.allSettled(files.map(load));
  results.forEach((r, i) => {
    if (r.status === "fulfilled") loaded.set(files[i], r.value);
  });
  return loaded;
}

// Plain <img> decode rather than Pixi's Assets, which decodes in a worker
// and is more machinery than ~150 small local PNGs need.
export function loadTexture(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(Texture.from(img));
    img.onerror = () => reject(new Error(`failed to load ${url}`));
    img.src = url;
  });
}

async function loadBytes(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`failed to load ${url}`);
  return res.arrayBuffer();
}
