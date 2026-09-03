// The silhouette is the whole premise of a public encounter: if it leaked the
// character's real colors the game would be over, and if it blacked out the
// background there'd be nothing to look at. This drives the real canvas
// pipeline over real assets and reads pixels back out — the one place in the
// feature where the actual output, not just the control flow, is checked.
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { loadImage, createCanvas } from 'canvas';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import { composeEncounter, composeSilhouetteEncounter } from '../imageComposition.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

const BG = 'Darkwick_Bus_Stop.png';
const CHAR = 'Rui_Mizuki_Uniform.png';

async function pixels(buffer) {
  const image = await loadImage(buffer);
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0);
  return { ctx, width: image.width, height: image.height };
}

function at(ctx, x, y) {
  const [r, g, b, a] = ctx.getImageData(x, y, 1, 1).data;
  return { r, g, b, a };
}

// Where the character actually is: centered horizontally, stood on the bottom
// edge — the same placement drawEncounterBase computes.
async function characterBox() {
  const bg = await loadImage(join(projectRoot, 'assets/bg', BG));
  const char = await loadImage(join(projectRoot, 'assets/chars', CHAR));
  return {
    x: (bg.width - char.width) / 2,
    y: bg.height - char.height,
    width: char.width,
    height: char.height,
    canvasWidth: bg.width,
    canvasHeight: bg.height,
  };
}

// A point inside the character's silhouette, found by comparing the plain
// composite against a background-only render — anywhere they differ is a pixel
// the character actually painted.
async function findCharacterPixel() {
  const box = await characterBox();
  const plain = await pixels(await composeEncounter(BG, CHAR));
  const bgImage = await loadImage(join(projectRoot, 'assets/bg', BG));
  const bgCanvas = createCanvas(bgImage.width, bgImage.height);
  bgCanvas.getContext('2d').drawImage(bgImage, 0, 0);
  const bgCtx = bgCanvas.getContext('2d');

  const centerX = Math.round(box.x + box.width / 2);
  for (let y = Math.round(box.y + box.height * 0.4); y < box.canvasHeight - 2; y += 2) {
    const composed = at(plain.ctx, centerX, y);
    const background = at(bgCtx, centerX, y);
    const differs =
      Math.abs(composed.r - background.r) +
      Math.abs(composed.g - background.g) +
      Math.abs(composed.b - background.b) > 40;
    if (differs) return { x: centerX, y };
  }
  return null;
}

describe('composeSilhouetteEncounter', () => {
  it('paints the character solid black', async () => {
    const point = await findCharacterPixel();
    assert.ok(point, 'expected to locate a pixel the character paints');

    const { ctx } = await pixels(await composeSilhouetteEncounter(BG, CHAR));
    const { r, g, b, a } = at(ctx, point.x, point.y);

    assert.equal(a, 255, 'the silhouette is opaque');
    assert.ok(r < 20 && g < 20 && b < 20, `expected black, got rgb(${r}, ${g}, ${b})`);
  });

  it('leaves the background untouched', async () => {
    const box = await characterBox();
    const silhouette = await pixels(await composeSilhouetteEncounter(BG, CHAR));
    const plain = await pixels(await composeEncounter(BG, CHAR));

    // Well outside the character's bounding box on both sides — a naive
    // source-atop fillRect over the composite would blacken this whole strip.
    const samples = [
      { x: Math.round(box.x / 2), y: box.canvasHeight - 30 },
      { x: Math.round(box.x + box.width + (box.canvasWidth - box.x - box.width) / 2), y: box.canvasHeight - 30 },
      { x: Math.round(box.canvasWidth / 2), y: 20 },
    ];

    for (const { x, y } of samples) {
      assert.deepEqual(
        at(silhouette.ctx, x, y),
        at(plain.ctx, x, y),
        `background changed at (${x}, ${y})`,
      );
    }
  });

});

describe('composeEncounter', () => {
  it('still bakes a dialogue box in at the bottom', async () => {
    // /roam and /meet depend on this and the refactor moved their shared setup.
    const withDialogue = await pixels(await composeEncounter(BG, CHAR, 'Hello there.'));
    const without = await pixels(await composeEncounter(BG, CHAR));

    const y = withDialogue.height - 30;
    const x = Math.round(withDialogue.width / 2);
    assert.notDeepEqual(at(withDialogue.ctx, x, y), at(without.ctx, x, y));
  });
});
