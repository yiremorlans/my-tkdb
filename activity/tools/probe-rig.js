// Lists the parts drawn at sprite pixels, bottom to top, for tracing a
// leak or a wrong-colored patch to the part that draws it
// (docs/hangout-activity.md §3.5).
//
//   node activity/tools/probe-rig.js <character> [--outfit <name>] [--mood <name>] x,y [x,y ...]
//
// Each part counts where its own alpha is over 10 (faint edges included,
// since those are what show as a tinted outline). The last one listed is
// on top. Overlays (moods) aren't parts, so they aren't listed.

import { imageLoader, ownership, prepareScene, readRig, withOutfit } from "./lib/render.js";

async function main() {
  const args = process.argv.slice(2);
  const opt = (name) => {
    const i = args.indexOf(`--${name}`);
    return i === -1 ? null : args.splice(i, 2)[1];
  };
  const outfit = opt("outfit");
  const mood = opt("mood") ?? "default";
  const [character, ...points] = args;
  if (!character || !points.length) {
    console.error("usage: node activity/tools/probe-rig.js <character> [--outfit <name>] [--mood <name>] x,y [x,y ...]");
    process.exit(1);
  }
  const { dir, source } = readRig(character);
  const rig = withOutfit(source, outfit ?? source.defaultOutfit);
  const scene = await prepareScene(rig, imageLoader(dir), { mood });
  const { layers } = await ownership(scene);
  for (const pt of points) {
    const [x, y] = pt.split(",").map(Number);
    const stack = layers
      .filter(({ box: [bx, by, bw, bh], alpha }) => x >= bx && y >= by && x < bx + bw && y < by + bh && alpha[(y - by) * bw + (x - bx)] > 10)
      .map(({ id, box: [bx, by, bw], alpha }) => `${id}(${alpha[(y - by) * bw + (x - bx)]})`);
    console.log(`${x},${y}: ${stack.join(" < ") || "(nothing)"}`);
  }
}

main();
