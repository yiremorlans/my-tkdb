// Writes Alan's roomwear outfit into rig.json from body_roomwear.py's fits.
//   node activity/tools/authoring/outfit_from_fits.mjs <fits.json>
//
// A fit gives a part's top-left in reference px, its scale and flip; with
// pivot [0.5, 0.5] (or the hands' [0.5, 0.05]) that becomes `position` in
// the parent bone's frame. The arm bones are academy's: both sprites share
// the body frame. Re-running replaces outfits.roomwear except its skin_*
// parts, which build-sprite-skin.js regenerates.
import fs from "node:fs";
import path from "node:path";
import { readPng } from "../slice-atlas.js";
import { apply, invert, solve, withOutfit } from "../../src/rig/skeleton.js";

const dir = "assets/rig/alan";
const rigFile = path.join(dir, "rig.json");
const rig = JSON.parse(fs.readFileSync(rigFile, "utf8"));
const fits = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const OUT = "roomwear";
const part = (id) => `${OUT}/parts/${id}.png`;

// The arm bones (imageless) as academy has them.
const ARM_BONES = ["shoulder_r", "upper_arm_r", "forearm_r", "shoulder_l", "upper_arm_l", "forearm_l"];
const bones = rig.outfits.academy.parts.filter((p) => ARM_BONES.includes(p.id)).map((p) => structuredClone(p));
const boneRig = { ...withOutfit(rig, "academy"), parts: [...rig.parts, ...bones] };
const solved = solve(boneRig, {});
const origin = (bone) => solved.get(bone).bone;

const round = (v) => Math.round(v * 100) / 100;
// [id, fit name, parent bone, z, extra]
const PLACED = [
  ["foot_r", "foot_r", "hips", 98],
  ["foot_l", "foot_l", "hips", 99],
  ["leg_r", "leg_r", "hips", 100],
  ["leg_l", "leg_l", "hips", 101],
  ["pants_top", "pants_top", "hips", 105],
  ["forearm_skin_r", "forearm_r", "forearm_r", 184],
  ["forearm_skin_l", "forearm_l", "forearm_l", 184],
  ["neck_skin", "neck", "torso", 188],
  ["chest_skin", "chest_skin", "torso", 189],
  ["neck_line_r", "neck_line_r", "torso", 190.5],
  ["neck_line_l", "neck_line_l", "torso", 190.6],
  ["sleeve_r", "sleeve_r", "upper_arm_r", 196],
  ["sleeve_l", "sleeve_l", "upper_arm_l", 196],
  ["tee", "tee", "torso", 200],
  ["sleeve_cap_r", "sleeve_cap_r", "upper_arm_r", 210],
  ["sleeve_cap_l", "sleeve_cap_l", "upper_arm_l", 210],
];
// Placed by hand. The upper arm hardly shows (a sliver under the sleeve
// hem). Its atlas art already runs on the diagonal (bottom 18.5 px left of
// the image center), so it needs no rotation: its bottom is centerd on the
// arm just under the hem (x 254 / 513), widened to the sprite's 38 px
// there, overlapping the forearm's top. The wristband is drawn flat in the atlas but wraps
// the arm in the sprite, so it's squeezed to the sprite's measured band
// (x 226-266, y 555-569 solid; x 226-263, y 571-585 dashed).
const BY_HAND = [
  { id: "upper_arm_skin_r", image: "p151", parent: "upper_arm_r", center: [269.7, 398], scale: [0.85, 0.69], z: 185 },
  { id: "upper_arm_skin_l", image: "p151", parent: "upper_arm_l", center: [497.3, 398], scale: [0.85, 0.69], flipX: true, z: 185 },
  { id: "band_r", image: "p140", parent: "forearm_r", center: [246.5, 562.5], scale: [0.62, 0.58], z: 220 },
  { id: "band_r2", image: "p138", parent: "forearm_r", center: [245, 578.5], scale: [0.45, 0.54], z: 221 },
];

const local = (bone, [x, y]) => apply(invert(origin(bone)), [x, y]).map(round);
const parts = [...bones];
// Corrections to a fit, in reference px. The neck shows only 19% (the head
// and collar cover the rest), so its fit lands ~1 px right and 1.4 px narrow
// of the sprite's neck (x 356-411); a neck edge short of the sprite's
// outline leaves outline pixels no skin draws.
const ADJUST = { neck_skin: { centerX: 383.5, scale: [0.687, 0.67] } };
for (const [id, name, parent, z] of PLACED) {
  const f = fits[name];
  const adj = ADJUST[id] ?? {};
  const center = [adj.centerX ?? f.px + f.w / 2, f.py + f.h / 2];
  const p = { id, parent, image: part(f.part), position: local(parent, center), pivot: [0.5, 0.5], z, scale: adj.scale ?? f.s };
  if (f.flip) p.flipX = true;
  parts.push(p);
}
for (const b of BY_HAND) {
  const p = { id: b.id, parent: b.parent, image: part(b.image), position: local(b.parent, b.center), pivot: [0.5, 0.5], z: b.z, scale: b.scale };
  if (b.flipX) p.flipX = true;
  if (b.rotation) p.rotation = b.rotation;
  parts.push(p);
}

// Hands: academy's pose names, bare-hand art. Academy's "open" glove has no
// bare counterpart. The pivot sits at the wrist (top of the image).
const POSES = { relaxed: "p153", curled: "p144", loose: "p145", back: "p155", fist: "p156", fist_side: "p147", spread: "p154" };
const HAND_PIVOT = [0.5, 0.05];
const hands = {};
for (const [side, fore] of [["r", "forearm_r"], ["l", "forearm_l"]]) {
  const f = fits[`hand_${side}`];
  const wrist = [f.px + f.w * HAND_PIVOT[0], f.py + f.h * HAND_PIVOT[1]];
  const flipX = !!f.flip;
  parts.push({
    id: `hand_${side}`, parent: fore, image: part(POSES.relaxed), position: local(fore, wrist), pivot: HAND_PIVOT,
    z: 230, scale: f.s, ...(flipX ? { flipX } : {}), limits: { rotation: [-35, 35] },
  });
  hands[side] = {
    part: `hand_${side}`, default: "relaxed",
    poses: Object.fromEntries(Object.entries(POSES).map(([name, id]) => [
      name, { image: part(id), pivot: HAND_PIVOT, scale: f.s, ...(flipX ? { flipX } : {}) },
    ])),
  };
}

// The tee's chest, in its image's normalized space: the band under the
// collar, inside the side seams.
const tee = fits.tee;
const chest = [(300 - tee.px) / tee.w, (270 - tee.py) / tee.h, (468 - tee.px) / tee.w, (420 - tee.py) / tee.h].map(round);

const academy = rig.outfits.academy.spriteSkin;
const old = rig.outfits[OUT];
rig.outfits[OUT] = {
  atlas: "source/alan_roomwear_00.png",
  dir: OUT,
  referenceImage: `${OUT}/derived/alan_room_rig.png`,
  scale: 0.69,
  parts: [...parts, ...(old?.parts ?? []).filter((p) => p.id.startsWith("skin_"))],
  hands,
  spriteSkin: {
    dilate: academy.dilate,
    skip: academy.skip,
    groups: [
      { id: "skin_hips", bone: "hips" },
      { id: "skin_torso", bone: "torso" },
      { id: "skin_upper_arm_r", bone: "upper_arm_r" },
      { id: "skin_upper_arm_l", bone: "upper_arm_l" },
      { id: "skin_forearm_r", bone: "forearm_r" },
      { id: "skin_forearm_l", bone: "forearm_l" },
    ],
    underlays: academy.underlays,
    // Academy's neck fixes. The jaw patch runs further down than academy's
    // (rows to 256, not 242): the crew neck sits lower than the shirt
    // collar, and stopping at 242 faded the sprite's neck outline into the
    // atlas neck's thinner one mid-neck.
    shades: academy.shades.map((sh) => (sh.id === "skin_jaw_patch" ? { ...sh, rows: [sh.rows[0], 256] } : sh)),
  },
  hotspots: { chest: { part: "tee", rect: chest } },
};
// sanity: every image exists
for (const p of parts) if (p.image) readPng(path.join(dir, p.image));
fs.writeFileSync(rigFile, JSON.stringify(rig, null, 2) + "\n");
console.log(`[outfit] ${OUT}: ${parts.length} parts, chest rect ${chest}`);
