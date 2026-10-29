// Dumps each default-visible image part's sprite matrix (image px → reference px).
import fs from "node:fs";
import path from "node:path";
import { readPng } from "../../tools/slice-atlas.js";
import { isVisible, moodParts, resolveMood } from "../../src/rig/expressions.js";
import { solve, spriteMatrix } from "../../src/rig/skeleton.js";
const dir = "assets/rig/alan";
const rig = JSON.parse(fs.readFileSync(path.join(dir, "rig.json"), "utf8"));
const sizes = new Map();
for (const p of rig.parts) if (p.image) { const i = readPng(path.join(dir, p.image)); sizes.set(p.id, [i.width, i.height]); }
const solved = solve(rig, {}, sizes);
const vis = moodParts(resolveMood(rig, "default"));
const out = rig.parts.filter((p) => p.image && isVisible(p, vis)).map((p) => ({
  id: p.id, image: path.join(dir, p.image), z: p.z, m: spriteMatrix(rig, p, solved.get(p.id).bone, sizes.get(p.id)),
}));
out.sort((a, b) => a.z - b.z);
fs.writeFileSync(process.argv[2], JSON.stringify(out));
console.log(out.length, "parts");
