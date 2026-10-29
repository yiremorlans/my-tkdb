// Sprite-skin config for one outfit (build-sprite-skin.js,
// docs/hangout-activity.md §3.5), derived from the bones so an outfit only
// lists what differs.
//
// rig.json top-level `spriteSkin` is shared by every outfit: `dilate`,
// `dilateConnected` (growth stops at the sprite's transparent gaps instead
// of jumping them; default false), `reach` (how far, in px, an uncovered sprite pixel looks for a group;
// default 8), `skip` (subtrees that keep their own art), `noGrowUnder`
// (parts no skin grows under: hands tucked under a cuff, whose pose swaps
// would leave the sprite's wrist behind), `restHands` (each hand's default
// pose cut from the sprite, build-sprite-skin.js step 6), and the neck fixes (`underlays`,
// `shades`). An outfit's `spriteSkin` holds overrides only:
//
//   "spriteSkin": {
//     "groups": {                      // bone → its groups, replacing the default one
//       "torso": [{ "id": "skin_torso_back", "zRange": [0, 209] },
//                 { "id": "skin_torso_front", "zRange": [250, 399] }],
//       "forearm_r": [{ "id": "skin_sleeve_lower_r", "parts": ["sleeve_lower_r"],
//                       "mesh": { "bend": true, "zone": 0.35 } }, {}],
//       "upper_arm_r": [{ "z": 218.5 }] },    // a skin's z, when its parts sit lower
//     "shades": { "skin_jaw_patch": { "rows": [190, 256] } }  // merged by id; null drops one
//   }
//
// By default every bone with art (the parent of a non-skin image part
// outside `skip`) gets one group, `skin_<bone>`, ordered by depth then rig
// order. A group spec of `{}` is that default group; `[]` gives the bone no
// skin. An outfit `spriteSkin` whose `groups` is an array is a complete
// config on its own (the older shape) and is used as is.

import { withOutfit } from "../../src/rig/skeleton.js";

const isSkin = (id) => id.startsWith("skin_");

/** Shared entries with the outfit's per-id overrides merged over them. */
export function mergeById(shared = [], own = null) {
  if (Array.isArray(own)) return own;
  const out = [];
  for (const entry of shared) {
    if (own && entry.id in own) {
      if (own[entry.id] !== null) out.push({ ...entry, ...own[entry.id] });
    } else out.push(entry);
  }
  for (const [id, entry] of Object.entries(own ?? {})) {
    if (entry && !shared.some((e) => e.id === id)) out.push({ id, ...entry });
  }
  return out;
}

/** Default bone groups for a flat (single-outfit) rig, with overrides. */
export function boneGroups(flat, skip = [], overrides = {}) {
  const byId = new Map(flat.parts.map((p) => [p.id, p]));
  const chain = (id) => {
    const out = [];
    for (let p = byId.get(id); p; p = byId.get(p.parent)) out.push(p.id);
    return out;
  };
  const skipped = (id) => chain(id).some((a) => skip.includes(a));
  const order = new Map(flat.parts.map((p, i) => [p.id, i]));
  const bones = new Set(Object.keys(overrides));
  for (const p of flat.parts) {
    if (p.image && !isSkin(p.id) && p.parent != null && !skipped(p.id)) bones.add(p.parent);
  }
  const sorted = [...bones]
    .filter((b) => byId.has(b))
    .sort((a, b) => chain(a).length - chain(b).length || order.get(a) - order.get(b));
  const groups = [];
  for (const bone of sorted) {
    for (const spec of overrides[bone] ?? [{}]) groups.push({ id: `skin_${bone}`, ...spec, bone });
  }
  return groups;
}

/** The resolved spriteSkin config ({ dilate, dilateConnected, reach, skip, noGrowUnder, restHands, groups, underlays, shades }) for one outfit. */
export function skinConfig(source, outfitName = source.defaultOutfit) {
  const own = (source.outfits ? source.outfits[outfitName]?.spriteSkin : source.spriteSkin) ?? {};
  if (Array.isArray(own.groups)) return own;
  const shared = source.outfits ? source.spriteSkin ?? {} : {};
  const flat = withOutfit(source, outfitName);
  const skip = own.skip ?? shared.skip ?? [];
  return {
    dilate: own.dilate ?? shared.dilate ?? 3,
    dilateConnected: own.dilateConnected ?? shared.dilateConnected ?? false,
    reach: own.reach ?? shared.reach ?? 8,
    skip,
    noGrowUnder: own.noGrowUnder ?? shared.noGrowUnder ?? [],
    restHands: own.restHands ?? shared.restHands ?? false,
    groups: boneGroups({ ...flat, parts: flat.parts.filter((p) => !isSkin(p.id)) }, skip, own.groups ?? {}),
    underlays: mergeById(shared.underlays, own.underlays),
    shades: mergeById(shared.shades, own.shades),
  };
}
