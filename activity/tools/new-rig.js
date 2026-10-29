// Scaffolds a new character's rig (docs/hangout-activity.md §3.5): a
// starting rig.json with the standard skeleton and one outfit, the outfit's
// atlas sliced into its folder, and a fit.json for fit-outfit.js to fill in.
//
//   node activity/tools/new-rig.js <character> [--outfit academy]
//        [--hair atlas|portrait] [--background <file in assets/bg>]
//        [--out <rig dir>] [--contact <dir>] [--force]
//
// Reads assets/rig/<character>/source/<character>_<outfit>_00.png (atlas)
// and <character>_<outfit>.png (reference sprite).
//
// The skeleton: root → hips → torso → neck → head (shared), and per outfit
// shoulder_{r,l} → upper_arm → forearm (hands come from the fit). Starting
// bone positions are measured from the reference sprite's own silhouette
// (its narrowest neck row and its crotch), never copied from another
// character, so they're only rough; fit.json's `bones` section sets them
// from the fitted parts on the first fit-outfit.js run.
//
// --hair picks the hair path (§3.2): "atlas" (default) fits the atlas's
// hair strands as head parts; "portrait" adds a portraitHair config for
// build-portrait-hair.js, for atlases whose strands are too warped to sit
// rigidly.

import fs from "node:fs";
import path from "node:path";

import { CHARACTER_ROOMS, backgroundPath, BACKGROUND_ASSET_DIR, BACKGROUNDS_BY_LOCATION } from "../../constants/backgrounds.js";
import { validateRig } from "../src/rig/skeleton.js";
import { readPng, sliceOutfit } from "./slice-atlas.js";

// House defaults (§3.2, decided 2026-10-28: the body stays nearly still,
// no hair sway). Tuned per character in the preview afterwards.
export const DEFAULT_MOTION = {
  breath: { speed: 0.2, amount: 0.6 },
  sway: { speed: 0.08, amount: 0.8 },
  hair: { enabled: false, speed: 0.4, amount: 3 },
  arms: { speed: 0.25, amount: 0.4 },
  blink: { meanInterval: 4 },
  bgPan: { speed: 0.022, amount: 0.01 },
};
export const DEFAULT_ANNOYANCE = { perTap: 1, decayPerSec: 0.9, threshold: 5, recoverSec: 4 };
// Joint ranges in degrees (r side; l mirrors).
const LIMITS = { neck: [-4, 4], head: [-7, 7], upper_arm_r: [-12, 22], forearm_r: [-110, 12] };
const mirror = ([a, b]) => [-b, -a];

/**
 * Landmarks of a reference sprite, from its alpha: figure top/bottom, the
 * narrowest row in the neck band, and the crotch (first row below mid-height
 * where the center column is clear).
 */
export function silhouette({ width: W, height: H, data }) {
  const rows = [];
  let top = -1;
  let bottom = -1;
  for (let y = 0; y < H; y++) {
    let x0 = -1;
    let x1 = -1;
    for (let x = 0; x < W; x++) {
      if (data[(y * W + x) * 4 + 3] > 128) {
        if (x0 < 0) x0 = x;
        x1 = x;
      }
    }
    rows.push([x0, x1]);
    if (x0 >= 0) {
      if (top < 0) top = y;
      bottom = y;
    }
  }
  const h = bottom - top;
  let neck = -1;
  let neckWidth = Infinity;
  for (let y = Math.round(top + 0.08 * h); y < top + 0.25 * h; y++) {
    const [a, b] = rows[y];
    if (a >= 0 && b - a < neckWidth) {
      neckWidth = b - a;
      neck = y;
    }
  }
  const centerX = (rows[neck][0] + rows[neck][1]) / 2;
  let crotch = Math.round(top + 0.5 * h);
  for (let y = Math.round(top + 0.4 * h); y < bottom; y++) {
    if (data[(y * W + Math.round(centerX)) * 4 + 3] < 64) {
      crotch = y;
      break;
    }
  }
  return { top, bottom, height: h, neck, neckWidth, centerX, crotch };
}

/** The scaffold rig.json for a character, from its sprite's landmarks. */
export function scaffoldRig({ character, outfit, sprite, background = null, hair = "atlas" }) {
  const s = silhouette(sprite);
  const r1 = (v) => Math.round(v);
  // Rough joints from the landmarks: the neck bone at the base of the
  // neck, the head pivot above it, shoulders a little below, the hips
  // above the crotch.
  const neckY = s.neck + 0.04 * s.height;
  const hipsY = s.crotch - 0.047 * s.height;
  const shoulderDx = 2.2 * s.neckWidth;
  const shoulderY = neckY + 0.03 * s.height;
  const upper = 0.136 * s.height;
  const bone = (id, parent, position, limits) => ({ id, parent, position, ...(limits ? { limits: { rotation: limits } } : {}) });
  const rig = {
    character,
    reference: { width: sprite.width, height: sprite.height },
    ...(background ? { background } : {}),
    stage: {
      landscape: { top: r1(s.top - 20), bottom: r1(hipsY - 40), centerX: r1(s.centerX) },
      portrait: { top: r1(s.top - 10), bottom: r1(hipsY + 160), centerX: r1(s.centerX) },
    },
    scale: 0.7,
    defaultOutfit: outfit,
    parts: [
      bone("root", null, [0, 0]),
      bone("hips", "root", [r1(s.centerX), r1(hipsY)]),
      bone("torso", "hips", [0, 0]),
      bone("neck", "torso", [0, r1(neckY - hipsY)], LIMITS.neck),
      bone("head", "neck", [0, r1(-0.038 * s.height)], LIMITS.head),
    ],
    bones: {
      torso: "torso", neck: "neck", head: "head",
      arms: {
        r: { upper: "upper_arm_r", fore: "forearm_r", hand: "hand_r", dir: 1 },
        l: { upper: "upper_arm_l", fore: "forearm_l", hand: "hand_l", dir: -1 },
      },
    },
    expressions: { head: "head", moods: { default: {} } },
    hotspots: {},
    ...(hair === "portrait"
      ? { portraitHair: { portrait: "default", maxY: null, lumMax: 255, diff: -1, feather: 14, z: 500, lockZ: 510, exclude: [], pinToBase: [], locks: [] } }
      : {}),
    annoyance: { ...DEFAULT_ANNOYANCE },
    motion: structuredClone(DEFAULT_MOTION),
    spriteSkin: { dilate: 5, skip: ["head", "hand_r", "hand_l"], underlays: [], shades: [] },
    outfits: {
      [outfit]: {
        atlas: `source/${character}_${outfit}_00.png`,
        dir: outfit,
        referenceImage: `source/${character}_${outfit}.png`,
        parts: [
          bone("shoulder_r", "torso", [r1(-shoulderDx), r1(shoulderY - hipsY)]),
          bone("upper_arm_r", "shoulder_r", [0, 0], LIMITS.upper_arm_r),
          bone("forearm_r", "upper_arm_r", [r1(-0.07 * upper), r1(upper)], LIMITS.forearm_r),
          bone("shoulder_l", "torso", [r1(shoulderDx), r1(shoulderY - hipsY)]),
          bone("upper_arm_l", "shoulder_l", [0, 0], mirror(LIMITS.upper_arm_r)),
          bone("forearm_l", "upper_arm_l", [r1(0.07 * upper), r1(upper)], mirror(LIMITS.forearm_r)),
        ],
      },
    },
  };
  return { rig, landmarks: s };
}

/**
 * The fit.json to start from: the usual body parts with their bones and
 * draw order, candidates left empty for whoever reads the contact sheets,
 * and `bones` anchored on those parts so the first fit places the skeleton.
 */
export function scaffoldFit() {
  const part = (id, parent, z, extra = {}) => ({ id, candidates: [], parent, z, ...extra });
  return {
    note: "Fill in each part's atlas candidates (ids from the contact sheets), run `fit-outfit.js --propose` for centers, confirm them, then fit. Parts are front to back. Rename, add or drop parts to suit the outfit; `bones` anchors must name fitted parts.",
    scales: { band: 0.03, step: 0.01 },
    minVisible: 0.15,
    blur: 0.6,
    targetBlur: 0.6,
    coverShared: true,
    rotations: [-14, 14, 2],
    parts: [
      { id: "hand_r", hand: true, candidates: "hands" },
      { id: "hand_l", hand: true, candidates: "hands" },
      part("sleeve_lower_r", "forearm_r", 216),
      part("sleeve_lower_l", "forearm_l", 216),
      part("sleeve_upper_r", "upper_arm_r", 218),
      part("sleeve_upper_l", "upper_arm_l", 218),
      part("top", "torso", 300),
      part("neck_skin", "torso", 190),
      part("pants_top", "hips", 105),
      part("leg_r", "hips", 100),
      part("leg_l", "hips", 101),
      part("foot_r", "hips", 98),
      part("foot_l", "hips", 99),
    ],
    bones: {
      hips: { parts: ["leg_r", "leg_l"], at: [0.5, 0.02] },
      neck: { part: "neck_skin", at: [0.5, 0.5] },
      head: { part: "neck_skin", at: [0.5, 0] },
      shoulder_r: { part: "sleeve_upper_r", at: [0.5, 0.08] },
      shoulder_l: { part: "sleeve_upper_l", at: [0.5, 0.08] },
      forearm_r: { part: "sleeve_upper_r", at: [0.5, 0.95] },
      forearm_l: { part: "sleeve_upper_l", at: [0.5, 0.95] },
    },
    hands: {
      pivot: [0.5, 0.05], z: 230, limits: [-35, 35], default: "relaxed",
      poses: {},
      sides: { r: { fit: "hand_r", parent: "forearm_r" }, l: { fit: "hand_l", parent: "forearm_l" } },
    },
  };
}

/** The character's room background, relative to the rig dir, if it has one. */
export function roomBackground(character, rigDir) {
  const room = CHARACTER_ROOMS[character.toUpperCase()];
  const file = room && (BACKGROUNDS_BY_LOCATION[room] ?? []).find((f) => !/_PM\.png$/.test(f) && !/Entrance/.test(f));
  return file ? path.relative(rigDir, path.join(BACKGROUND_ASSET_DIR, backgroundPath(file))) : null;
}

async function main() {
  const [character, ...rest] = process.argv.slice(2);
  const opt = (name, fallback = null) => {
    const i = rest.indexOf(`--${name}`);
    return i === -1 ? fallback : rest[i + 1];
  };
  if (!character) {
    console.error("usage: node activity/tools/new-rig.js <character> [--outfit academy] [--hair atlas|portrait] [--background <file>] [--out <dir>] [--contact <dir>] [--force]");
    process.exit(1);
  }
  const outfit = opt("outfit", "academy");
  const hair = opt("hair", "atlas");
  if (!["atlas", "portrait"].includes(hair)) throw new Error("--hair must be atlas or portrait");
  const srcDir = path.join("assets/rig", character);
  const rigDir = opt("out", srcDir);
  const rigFile = path.join(rigDir, "rig.json");
  if (fs.existsSync(rigFile) && !rest.includes("--force")) {
    throw new Error(`${rigFile} exists; pass --force to overwrite it`);
  }
  // --out writes elsewhere (a dry run): copy the sources and part-names.json across.
  if (rigDir !== srcDir) {
    fs.cpSync(path.join(srcDir, "source"), path.join(rigDir, "source"), { recursive: true });
    const names = path.join(srcDir, outfit, "part-names.json");
    if (fs.existsSync(names)) fs.cpSync(names, path.join(rigDir, outfit, "part-names.json"));
  }

  const spriteFile = path.join(rigDir, "source", `${character}_${outfit}.png`);
  const bgFile = opt("background");
  const background = bgFile ? path.relative(rigDir, path.join(BACKGROUND_ASSET_DIR, backgroundPath(bgFile))) : roomBackground(character, rigDir);
  const { rig, landmarks } = scaffoldRig({ character, outfit, sprite: readPng(spriteFile), background, hair });

  await sliceOutfit(rigDir, character, outfit, rig.outfits[outfit], { contact: opt("contact") });
  const namesFile = path.join(rigDir, outfit, "part-names.json");
  if (!fs.existsSync(namesFile)) fs.writeFileSync(namesFile, JSON.stringify({ names: {}, merge: [], ignore: [] }, null, 2) + "\n");
  const fitPath = path.join(rigDir, outfit, "fit.json");
  if (!fs.existsSync(fitPath)) fs.writeFileSync(fitPath, JSON.stringify(scaffoldFit(), null, 2) + "\n");

  validateRig(rig, { imageExists: (f) => fs.existsSync(path.join(rigDir, f)) });
  fs.writeFileSync(rigFile, JSON.stringify(rig, null, 2) + "\n");
  console.log(`[new-rig] ${rigFile}: ${character}/${outfit}, hair from the ${hair}`);
  console.log(`[new-rig] sprite landmarks: top ${landmarks.top}, neck ${landmarks.neck} (${landmarks.neckWidth} px wide), crotch ${landmarks.crotch}, bottom ${landmarks.bottom}`);
  console.log(`[new-rig] bones (rough until the first fit): hips ${rig.parts[1].position}, neck ${rig.parts[3].position}, head ${rig.parts[4].position}`);
  if (!background) console.log("[new-rig] no room background found; pass --background <file> or set rig.json `background`");
  console.log(`[new-rig] next: fill in ${fitPath} (candidates), then fit-outfit.js ${character} --propose`);
}

if (import.meta.url === `file://${process.argv[1]}`) main();
