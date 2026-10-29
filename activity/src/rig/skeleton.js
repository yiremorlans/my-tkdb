// Hangout rig: rig.json validation and the bone math. No PixiJS here, so the
// Node tools (activity/tools/render-rig.js) and the browser renderer
// (renderer.js) place parts with exactly the same code.
// See docs/hangout-activity.md §3.2 for the rig.json shape.
//
// Conventions:
// - Every part is a bone. `position` is where the bone's pivot sits in its
//   parent's frame (reference px), whose origin is the parent's pivot. A root
//   part's position is in reference space.
// - `pivot` is normalized within the part's image. Imageless parts are pure
//   bones (hips, shoulders) and have no pivot.
// - Art scale (`scale`, else the rig's `scale`) and `flipX` apply to the
//   part's own image only, never to children. Animated bone scale (breathing)
//   does inherit, so the shoulders rise with the chest.
// - `z` is global: draw order ignores the hierarchy, which is how the arms
//   (children of the torso) draw behind the vest.

// --- outfits ----------------------------------------------------------------

// Outfits. rig.json may hold several outfits for one character:
//   { "parts": [shared parts], "defaultOutfit": "academy",
//     "outfits": { "academy": { "referenceImage", "parts", "hands",
//                               "spriteSkin", ... }, "roomwear": { ... } } }
// Top-level `parts` are shared by every outfit (the skeleton's core bones and
// the head with its hair and face). Each outfit adds its own body parts and
// may set any of OUTFIT_KEYS; `hotspots` merge over the shared ones, the rest
// replace. `dir` is where the outfit's generated assets live (parts/, skin/,
// parts.json), relative to the rig directory; `atlas` is its source atlas.
// withOutfit() flattens one outfit into the single-outfit shape everything
// else (solve, the renderer, the tools) works on. `spriteSkin` is read only
// by the tools: an outfit's holds overrides that activity/tools/lib/
// skin-config.js merges over the rig's shared one.
export const OUTFIT_KEYS = [
  "parts", "hands", "spriteSkin", "referenceImage", "reference", "scale", "hotspots", "atlas", "dir",
];

/** Outfit names, the default first. Empty for a rig without `outfits`. */
export function outfitNames(rig) {
  const names = Object.keys(rig.outfits ?? {});
  const first = rig.defaultOutfit ?? names[0];
  return names.includes(first) ? [first, ...names.filter((n) => n !== first)] : names;
}

// Hand sets. An outfit's `hands` is one set ({ r, l }), or several the app
// can swap between (gloves on or off), all on the same hand parts:
//   "hands": { "defaultSet": "white",
//              "sets": { "white": { "r": {...}, "l": {...} }, "bare": { ... } } }
// withOutfit() flattens the chosen set into `hands`, and lists the set
// names in `handSets` (with the chosen one in `handSet`).

/** Hand set names for an outfit's `hands`, the default first ([] for a single set). */
export function handSetNames(hands) {
  const names = Object.keys(hands?.sets ?? {});
  const first = hands?.defaultSet ?? names[0];
  return names.includes(first) ? [first, ...names.filter((n) => n !== first)] : names;
}

/**
 * rig.json with one outfit applied, in the flat single-outfit shape. Part
 * objects are shared with `rig`, not copied, so edits to the result (the
 * preview's part editor) land in the source. A rig without `outfits` is
 * returned as is. `handSet` picks one of the outfit's hand sets (default:
 * its defaultSet).
 */
export function withOutfit(rig, name = rig.defaultOutfit, { handSet } = {}) {
  if (!rig.outfits) return withHandSet(rig, handSet);
  const outfit = rig.outfits[name];
  if (!outfit) throw new Error(`unknown outfit ${name}`);
  const { outfits, defaultOutfit, ...shared } = rig;
  return withHandSet({
    ...shared,
    ...outfit,
    outfit: name,
    parts: [...(shared.parts ?? []), ...(outfit.parts ?? [])],
    hotspots: { ...shared.hotspots, ...outfit.hotspots },
  }, handSet);
}

function withHandSet(flat, handSet) {
  const names = handSetNames(flat.hands);
  if (!names.length) {
    if (handSet) throw new Error(`no hand sets${flat.outfit ? ` in ${flat.outfit}` : ""}`);
    return flat;
  }
  const set = handSet ?? names[0];
  if (!flat.hands.sets[set]) throw new Error(`unknown hand set ${set}`);
  return { ...flat, hands: flat.hands.sets[set], handSet: set, handSets: names };
}

/**
 * Every part in rig.json with the outfit that owns it (null for shared
 * parts), so an editor can diff or list parts across outfits.
 */
export function allParts(rig) {
  const out = (rig.parts ?? []).map((part) => ({ outfit: null, part }));
  for (const [name, outfit] of Object.entries(rig.outfits ?? {})) {
    for (const part of outfit.parts ?? []) out.push({ outfit: name, part });
  }
  return out;
}

// --- validation -------------------------------------------------------------

/**
 * Throws a list of problems as one Error if rig.json is malformed. With
 * outfits, each outfit is validated as its flattened rig; a problem every
 * outfit shares (a shared part's) is listed once, the rest under
 * `outfits.<name>`.
 */
export function validateRig(rig, { imageExists = () => true, soundExists = () => true } = {}) {
  if (!rig || typeof rig !== "object") throw new Error("rig.json: not an object");
  const missingSounds = soundsOf(rig).filter((f) => !soundExists(f)).map((f) => `missing sound ${f}`);
  // head sway is shared (motion.js HEAD_SWAY); a rig may only switch it off
  const sway = Object.keys(rig.motion?.sway ?? {}).filter((k) => k !== "enabled");
  if (sway.length) missingSounds.push(`motion.sway.${sway.join(", ")}: head sway is shared (motion.js HEAD_SWAY), not set per rig`);
  if (!rig.outfits) {
    const problems = [...rigProblems(rig, imageExists), ...missingSounds];
    if (problems.length) throw new Error(`rig.json:\n  ${problems.join("\n  ")}`);
    return rig;
  }

  const problems = [...missingSounds];
  const names = Object.keys(rig.outfits);
  if (!names.length) problems.push("`outfits` is empty");
  if (rig.defaultOutfit != null && !rig.outfits[rig.defaultOutfit]) {
    problems.push(`defaultOutfit ${rig.defaultOutfit} not in outfits`);
  }
  const perOutfit = new Map();
  for (const name of names) {
    const outfit = rig.outfits[name];
    const own = [];
    for (const key of Object.keys(outfit ?? {})) {
      if (!OUTFIT_KEYS.includes(key)) own.push(`unknown key ${key}`);
    }
    if (!Array.isArray(outfit?.parts)) own.push("`parts` must be an array");
    else {
      own.push(...handSetProblems(outfit.hands));
      own.push(...rigProblems(withOutfit(rig, name), imageExists));
      // every other hand set's hands too, under its name
      for (const set of handSetNames(outfit.hands).slice(1)) {
        for (const p of handProblems(withOutfit(rig, name, { handSet: set }), imageExists)) own.push(`hand set ${set}: ${p}`);
      }
    }
    perOutfit.set(name, own);
  }
  const everywhere = names.length > 1
    ? new Set([...perOutfit.values()].reduce((a, b) => a.filter((p) => b.includes(p))))
    : new Set();
  problems.push(...everywhere);
  for (const [name, own] of perOutfit) {
    for (const p of own) if (!everywhere.has(p)) problems.push(`outfits.${name}: ${p}`);
  }
  if (problems.length) throw new Error(`rig.json:\n  ${problems.join("\n  ")}`);
  return rig;
}

// Problems in one flat (single-outfit) rig.
function rigProblems(rig, imageExists) {
  const problems = [];
  if (!Array.isArray(rig.parts) || !rig.parts.length) {
    return ["`parts` must be a non-empty array"];
  }

  const byId = new Map();
  for (const part of rig.parts) {
    if (!part.id) problems.push("a part has no id");
    else if (byId.has(part.id)) problems.push(`duplicate part id ${part.id}`);
    else byId.set(part.id, part);
  }

  for (const part of rig.parts) {
    if (part.parent != null && !byId.has(part.parent)) {
      problems.push(`${part.id}: unknown parent ${part.parent}`);
    }
    if (!Array.isArray(part.position) || part.position.length !== 2) {
      problems.push(`${part.id}: position must be [x, y]`);
    }
    const limits = part.limits?.rotation;
    if (limits && !(Array.isArray(limits) && limits[0] <= limits[1])) {
      problems.push(`${part.id}: limits.rotation must be [min, max]`);
    }
  }

  for (const id of findCycle(rig.parts, byId)) {
    problems.push(`cycle through ${id}`);
  }

  for (const file of imagesOf(rig)) {
    if (!imageExists(file)) problems.push(`missing image ${file}`);
  }

  const known = (id) => byId.has(id);
  problems.push(...handProblems(rig, () => true));
  for (const [name, group] of Object.entries(rig.groups ?? {})) {
    for (const id of group.flat()) {
      if (!known(id)) problems.push(`groups.${name}: unknown part ${id}`);
    }
  }
  for (const [name, mood] of Object.entries(rig.expressions?.moods ?? {})) {
    for (const id of [...(mood.show ?? []), ...(mood.hide ?? [])]) {
      if (!known(id)) problems.push(`moods.${name}: unknown part ${id}`);
    }
    for (const layer of mood.layers ?? []) {
      if (!rig.expressions.moods[layer]) problems.push(`moods.${name}: unknown layer ${layer}`);
    }
  }
  for (const [name, spot] of Object.entries(rig.hotspots ?? {})) {
    if (!known(spot.part)) problems.push(`hotspots.${name}: unknown part ${spot.part}`);
  }
  return problems;
}

function handSetProblems(hands) {
  if (!hands?.sets) return [];
  const problems = [];
  if (!Object.keys(hands.sets).length) problems.push("hands.sets is empty");
  if (hands.defaultSet != null && !hands.sets[hands.defaultSet]) problems.push(`hands.defaultSet ${hands.defaultSet} not in sets`);
  for (const key of Object.keys(hands)) if (key !== "sets" && key !== "defaultSet") problems.push(`hands: unknown key ${key} beside sets`);
  return problems;
}

// A flat rig's hands: known parts, a default pose that exists, and (with
// `imageExists`) every pose image on disk.
function handProblems(rig, imageExists) {
  const ids = new Set(rig.parts.map((p) => p.id));
  const problems = [];
  for (const [side, hand] of Object.entries(rig.hands ?? {})) {
    if (!ids.has(hand.part)) problems.push(`hands.${side}: unknown part ${hand.part}`);
    if (hand.default && !hand.poses?.[hand.default]) {
      problems.push(`hands.${side}: default pose ${hand.default} not in poses`);
    }
    for (const pose of Object.values(hand.poses ?? {})) {
      if (pose.image && !imageExists(pose.image)) problems.push(`missing image ${pose.image}`);
    }
  }
  return problems;
}

function findCycle(parts, byId) {
  const state = new Map(); // undefined = unseen, 1 = on stack, 2 = done
  const cyclic = [];
  for (const start of parts) {
    const path = [];
    let id = start.id;
    while (id != null && byId.has(id) && state.get(id) !== 2) {
      if (state.get(id) === 1) {
        cyclic.push(id);
        break;
      }
      state.set(id, 1);
      path.push(id);
      id = byId.get(id).parent;
    }
    for (const p of path) state.set(p, 2);
  }
  return cyclic;
}

// --- images and draw order --------------------------------------------------

/**
 * Every image file rig.json names, relative to the rig's directory, across
 * all outfits.
 */
export function imagesOf(rig) {
  if (rig.outfits) {
    return [...new Set(Object.keys(rig.outfits).flatMap((name) => {
      const sets = handSetNames(rig.outfits[name].hands);
      return (sets.length ? sets : [undefined]).flatMap((handSet) => imagesOf(withOutfit(rig, name, { handSet })));
    }))];
  }
  const files = new Set();
  for (const part of rig.parts) if (part.image) files.add(part.image);
  const sets = rig.hands?.sets ? Object.values(rig.hands.sets) : [rig.hands ?? {}];
  for (const hand of sets.flatMap((set) => Object.values(set))) {
    for (const pose of Object.values(hand.poses ?? {})) files.add(pose.image);
  }
  for (const mood of Object.values(rig.expressions?.moods ?? {})) {
    if (mood.file) files.add(mood.file);
  }
  return [...files];
}

/**
 * Every sound file rig.json names (`sounds`, and any reaction's `sound`; a
 * file or a list, maybe by tier), relative to the rig's directory. Both are
 * shared by every outfit.
 */
export function soundsOf(rig) {
  const files = new Set();
  const add = (v) => fileList(v).forEach((f) => files.add(f));
  const tiers = (v) => (v?.byTier ? Object.values(v.byTier) : [v]);
  for (const r of Object.values(rig.reactions ?? {})) tiers(r).forEach((t) => add(t?.sound));
  for (const s of Object.values(rig.sounds ?? {})) tiers(s).forEach(add);
  return [...files];
}

/** A `sound` value (one file, a list of files, or none) as a list. */
export function fileList(value) {
  return [value ?? []].flat();
}

/** `n` rounded to `digits` decimal places, the precision rig.json keeps. */
export function roundTo(n, digits) {
  return Math.round(n * 10 ** digits) / 10 ** digits;
}

/** Parts ordered so every parent comes before its children. */
export function topoOrder(rig) {
  const byId = new Map(rig.parts.map((p) => [p.id, p]));
  const done = new Set();
  const order = [];
  const visit = (part) => {
    if (done.has(part.id)) return;
    if (part.parent != null) visit(byId.get(part.parent));
    done.add(part.id);
    order.push(part);
  };
  rig.parts.forEach(visit);
  return order;
}

// --- bone math --------------------------------------------------------------

// 2D affine as [a, b, c, d, tx, ty]: x' = a*x + c*y + tx, y' = b*x + d*y + ty.
export const IDENTITY = [1, 0, 0, 1, 0, 0];

export function multiply(m, n) {
  return [
    m[0] * n[0] + m[2] * n[1],
    m[1] * n[0] + m[3] * n[1],
    m[0] * n[2] + m[2] * n[3],
    m[1] * n[2] + m[3] * n[3],
    m[0] * n[4] + m[2] * n[5] + m[4],
    m[1] * n[4] + m[3] * n[5] + m[5],
  ];
}

export function apply(m, [x, y]) {
  return [m[0] * x + m[2] * y + m[4], m[1] * x + m[3] * y + m[5]];
}

export function invert(m) {
  const det = m[0] * m[3] - m[1] * m[2];
  return [
    m[3] / det,
    -m[1] / det,
    -m[2] / det,
    m[0] / det,
    (m[2] * m[5] - m[3] * m[4]) / det,
    (m[1] * m[4] - m[0] * m[5]) / det,
  ];
}

export function boneLocal(x, y, deg, sx, sy) {
  const r = (deg * Math.PI) / 180;
  const cos = Math.cos(r);
  const sin = Math.sin(r);
  return [cos * sx, sin * sx, -sin * sy, cos * sy, x, y];
}

export function clampRotation(part, deg) {
  const limits = part.limits?.rotation;
  return limits ? Math.min(limits[1], Math.max(limits[0], deg)) : deg;
}

/**
 * World matrices for every part under `pose`, a map of part id →
 * { rotation (deg, added to rest and clamped to limits), scale: [sx, sy],
 *   offset: [dx, dy] }. Returns Map id → { bone, sprite }, where `sprite`
 * maps image px to reference px (null for imageless parts).
 */
export function solve(rig, pose = {}, sizes = new Map()) {
  const out = new Map();
  for (const part of topoOrder(rig)) {
    const p = pose[part.id] ?? {};
    const rot = clampRotation(part, (part.rotation ?? 0) + (p.rotation ?? 0));
    const [sx, sy] = p.scale ?? [1, 1];
    const [dx, dy] = p.offset ?? [0, 0];
    const local = boneLocal(part.position[0] + dx, part.position[1] + dy, rot, sx, sy);
    const parentBone = part.parent == null ? IDENTITY : out.get(part.parent).bone;
    const bone = multiply(parentBone, local);
    out.set(part.id, { bone, sprite: spriteMatrix(rig, part, bone, sizes.get(part.id)) });
  }
  return out;
}

// --- drawing ----------------------------------------------------------------

/**
 * How the rig's view sits on a width×height stage. rig.json `stage` picks
 * the reference rows that fill the stage height ({ top, bottom }) and the
 * column kept centered (centerX), so a crop is data, not code. `stage` may
 * instead hold `landscape` and `portrait` framings, chosen by the stage's
 * shape (a VN bust on a wide screen, more of him on a tall phone).
 * Without it the whole reference fits the height.
 */
export function stageFraming(rig, width, height) {
  const { width: refW, height: refH } = rig.reference;
  const stage = rig.stage ?? {};
  const pick = width > height ? stage.landscape : stage.portrait;
  const { top = 0, bottom = refH, centerX = refW / 2 } = pick ?? stage;
  const scale = height / (bottom - top);
  return { scale, x: width / 2 - centerX * scale, y: -top * scale };
}

/** Image px → reference px for a part, given its bone and image size. */
export function spriteMatrix(rig, part, bone, size, image = part) {
  if (!size) return null;
  // Art scale is a number, or [sx, sy] for a part stretched to bridge a gap.
  const s = image.scale ?? part.scale ?? rig.scale ?? 1;
  const [sx, sy] = Array.isArray(s) ? s : [s, s];
  const [px, py] = image.pivot ?? part.pivot ?? [0.5, 0.5];
  const flip = (image.flipX ?? part.flipX) ? -1 : 1;
  // Pivot to origin, then art scale (and mirror) about the pivot, then the
  // art's own turn (`artRotation`, deg; hand poses drawn at another angle).
  const art = [sx * flip, 0, 0, sy, -px * size[0] * sx * flip, -py * size[1] * sy];
  const turned = image.artRotation ? multiply(boneLocal(0, 0, image.artRotation, 1, 1), art) : art;
  return multiply(bone, turned);
}

/**
 * Per-row matrices for a mesh-bent part (mesh.bend). The part hangs off a
 * joint bone (its parent, e.g. the forearm at the elbow). Row v (0 = top of
 * the image, 1 = bottom) is the part at rest relative to the frame above
 * the joint, rotated about the joint by a share of the joint's angle:
 * none at the top, all of it past `mesh.zone`. Blending the angle rather
 * than vertex positions keeps the sleeve's width as it wraps the elbow; a
 * position blend collapses it to a sliver at large angles.
 * Returns (v) => image px → reference px matrix.
 */
export function bendRows(rig, part, solved, size, image = part) {
  const byId = new Map(rig.parts.map((p) => [p.id, p]));
  const joint = byId.get(part.parent);
  const actual = spriteMatrix(rig, part, solved.get(part.id).bone, size, image);
  if (!joint) return () => actual;
  const above = joint.parent ? solved.get(joint.parent).bone : IDENTITY;
  const jointRest = multiply(above, boneLocal(joint.position[0], joint.position[1], joint.rotation ?? 0, 1, 1));
  const restBone = multiply(jointRest, [1, 0, 0, 1, part.position[0], part.position[1]]);
  const rest = spriteMatrix(rig, part, restBone, size, image);
  const jointBone = solved.get(joint.id).bone;
  const theta = Math.atan2(jointBone[1], jointBone[0]) - Math.atan2(jointRest[1], jointRest[0]);
  const [jx, jy] = [jointBone[4], jointBone[5]];
  const zone = part.mesh?.zone ?? 0.3;
  return (v) => {
    const x = Math.min(1, v / zone);
    const k = x * x * (3 - 2 * x); // smoothstep
    const a = theta * k;
    const cos = Math.cos(a);
    const sin = Math.sin(a);
    // rotate about the joint
    const R = [cos, sin, -sin, cos, jx - cos * jx + sin * jy, jy - sin * jx - cos * jy];
    // rows past the zone use the actual matrix, so breathing scale etc. carry
    return k >= 1 ? actual : multiply(R, rest);
  };
}
