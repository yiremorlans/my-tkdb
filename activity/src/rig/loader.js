// Hangout rig: loads a character's rig.json and every image it names, and
// validates it before anything renders (docs/hangout-activity.md §3.2).
// The checks themselves live in skeleton.js validateRig so Node tests can
// run them without a browser.

import { Texture } from "pixi.js";

import { imagesOf, validateRig } from "./skeleton.js";

/**
 * Fetches `${baseUrl}/rig.json`, loads its images (every outfit's) as Pixi
 * textures and validates it, each outfit included. Throws one Error listing
 * every problem (unknown parents, cycles, missing images) rather than
 * rendering a half-built character. `rig` is returned as loaded, outfits
 * and all; RigRenderer picks the outfit.
 */
export async function loadRig(baseUrl) {
  // Default caching: Express revalidates by ETag, and the dev server sends
  // no-store itself, so the preview still sees every save.
  const res = await fetch(`${baseUrl}/rig.json`);
  if (!res.ok) throw new Error(`rig.json: HTTP ${res.status} at ${baseUrl}`);
  const rig = await res.json();

  const files = imagesOf(rig);
  const textures = new Map();
  const results = await Promise.allSettled(files.map((f) => loadTexture(`${baseUrl}/${f}`)));
  results.forEach((r, i) => {
    if (r.status === "fulfilled") textures.set(files[i], r.value);
  });

  validateRig(rig, { imageExists: (f) => textures.has(f) });
  return { rig, textures, baseUrl };
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
