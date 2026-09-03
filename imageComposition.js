import { createCanvas, loadImage, registerFont } from 'canvas';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Railway's container ships no system fonts and no fontconfig config, so
// fontconfig resolves nothing and every glyph renders as a tofu box. Shipping
// our own face and registering it here gives canvas something to draw with
// regardless of what the host provides. Must run before any context is created.
const DIALOGUE_FONT_FAMILY = 'DejaVu Sans';
const DIALOGUE_FONT_PATH = join(__dirname, 'assets/fonts/DejaVuSans.ttf');

if (!fs.existsSync(DIALOGUE_FONT_PATH)) {
  throw new Error(
    `Dialogue font missing at ${DIALOGUE_FONT_PATH} — dialogue would render as boxes.`,
  );
}
registerFont(DIALOGUE_FONT_PATH, { family: DIALOGUE_FONT_FAMILY });
console.log('[imageComposition] Registered dialogue font:', DIALOGUE_FONT_PATH);

// Background + character on a canvas sized to the background, with the
// character centered horizontally and stood on the bottom edge. Internal:
// every public compositor starts here, so character positioning can never
// drift between /roam's dialogue scenes and a public encounter's silhouette.
// `drawCharacter: false` lays down the background and works out where the
// character goes without painting it — for callers that draw their own
// treatment of it (composeSilhouetteEncounter) and must not have the real art
// underneath, where antialiased edges would bleed through.
async function drawEncounterBase(bgFilename, charFilename, { drawCharacter = true } = {}) {
  const bgPath = join(__dirname, `assets/bg/${bgFilename}`);
  const charPath = join(__dirname, `assets/chars/${charFilename}`);

  console.log('[composeEncounter] Loading images:', bgPath, charPath);
  const loadStart = Date.now();
  const bgImg = await loadImage(bgPath);
  console.log('[composeEncounter] BG loaded in', Date.now() - loadStart, 'ms');
  const charLoadStart = Date.now();
  const charImg = await loadImage(charPath);
  console.log('[composeEncounter] Char loaded in', Date.now() - charLoadStart, 'ms');

  // Use background dimensions as canvas size.
  console.log('[composeEncounter] Creating canvas:', bgImg.width, 'x', bgImg.height);
  const canvas = createCanvas(bgImg.width, bgImg.height);
  const ctx = canvas.getContext('2d');

  // Draw background.
  console.log('[composeEncounter] Drawing background');
  ctx.drawImage(bgImg, 0, 0);

  // Draw character centered horizontally and positioned in the lower half vertically.
  console.log('[composeEncounter] Drawing character at', charImg.width, 'x', charImg.height);
  const charX = (canvas.width - charImg.width) / 2;
  const charY = canvas.height - charImg.height;
  if (drawCharacter) ctx.drawImage(charImg, charX, charY);

  return { canvas, ctx, charImg, charX, charY };
}

// Composite a background and character image on canvas, optionally with dialogue.
// Returns a buffer containing the PNG-encoded composite image.
export async function composeEncounter(bgFilename, charFilename, dialogue = null) {
  const { canvas, ctx } = await drawEncounterBase(bgFilename, charFilename);

  // Draw dialogue box if provided.
  if (dialogue) {
    console.log('[composeEncounter] Drawing dialogue box');
    const padding = 24;
    const fontSize = 30;
    const lineHeight = 40;

    // White text.
    ctx.fillStyle = '#ffffff';
    ctx.font = `${fontSize}px "${DIALOGUE_FONT_FAMILY}"`;
    ctx.textBaseline = 'top';

    // Wrap text and calculate required height.
    const maxWidth = canvas.width - 2 * padding;
    const words = dialogue.split(' ');
    let line = '';
    const lines = [];

    for (const word of words) {
      const testLine = line + (line ? ' ' : '') + word;
      const metrics = ctx.measureText(testLine);

      if (metrics.width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = testLine;
      }
    }
    if (line) lines.push(line);

    // Calculate box height based on number of lines.
    const boxHeight = lines.length * lineHeight + 2 * padding;

    // Semi-transparent black box at the bottom.
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, canvas.height - boxHeight, canvas.width, boxHeight);

    // Draw text lines.
    ctx.fillStyle = '#ffffff';
    let y = canvas.height - boxHeight + padding;
    for (const lineText of lines) {
      ctx.fillText(lineText, padding, y);
      y += lineHeight;
    }
  }

  console.log('[composeEncounter] Converting to PNG buffer');
  const bufferStart = Date.now();
  const buffer = canvas.toBuffer('image/png');
  console.log('[composeEncounter] Buffer created in', Date.now() - bufferStart, 'ms, size:', buffer.length);
  return buffer;
}

// Public "call out" encounters only: the same scene, but the character painted
// out as a solid black cutout so the channel sees a shape and not a face. No
// dialogue box, ever — the teaser and every flavor line live in the Discord
// message instead (docs/public-encounters.md §5).
//
// This is the single composite the feature ever makes: a win keeps this image
// and adds a reveal embed beside it, a miss drops it. `reveal` is here only so
// a future version can ask for the un-overlaid scene; nothing calls it today.
export async function composeSilhouetteEncounter(bgFilename, charFilename, { reveal = false } = {}) {
  const { canvas, ctx, charImg, charX, charY } = await drawEncounterBase(
    bgFilename,
    charFilename,
    // A silhouette draws its own blacked-out copy below; only a reveal wants
    // the real art on the canvas.
    { drawCharacter: reveal },
  );

  if (!reveal) {
    // The blackout has to happen on a canvas holding *only* the character, not
    // on the composite: the background already makes the full canvas opaque, so
    // a source-atop fill there would land a black rectangle over the scene
    // rather than a cutout. Drawn off to the side, source-in keeps the
    // character's alpha and replaces every color with black — a clean
    // silhouette, edges included — which then drops onto the background at the
    // same position the real art would have taken.
    console.log('[composeSilhouetteEncounter] Filling character silhouette');
    const cutout = createCanvas(charImg.width, charImg.height);
    const cutoutCtx = cutout.getContext('2d');
    cutoutCtx.drawImage(charImg, 0, 0);
    cutoutCtx.globalCompositeOperation = 'source-in';
    cutoutCtx.fillStyle = '#000';
    cutoutCtx.fillRect(0, 0, charImg.width, charImg.height);

    ctx.drawImage(cutout, charX, charY);
  }

  const bufferStart = Date.now();
  const buffer = canvas.toBuffer('image/png');
  console.log('[composeSilhouetteEncounter] Buffer created in', Date.now() - bufferStart, 'ms, size:', buffer.length);
  return buffer;
}
