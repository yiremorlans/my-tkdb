import { createCanvas, loadImage, registerFont } from 'canvas';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import { WARDING_ASSET_DIR } from './constants/warding/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Railway's container ships no system fonts and no fontconfig config, so
// fontconfig resolves nothing and every glyph renders as a tofu box. Shipping
// our own face and registering it here gives canvas something to draw with
// regardless of what the host provides. Must run before any context is created.
const DIALOGUE_FONT_FAMILY = 'DejaVu Sans';

// The canvas width the dialogue box's padding, font size and line height are
// authored for: a /roam composite is 1000x1000 (assets/bg). drawDialogueBox
// scales them off this, so widths other than 1000 keep the same proportions.
const DIALOGUE_REFERENCE_WIDTH = 1000;
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
  const [bgImg, charImg] = await Promise.all([loadImage(bgPath), loadImage(charPath)]);
  console.log('[composeEncounter] Images loaded in', Date.now() - loadStart, 'ms');

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

// The dialogue box: word-wrapped white text on a translucent black band across
// the bottom of the canvas, sized to however many lines the text wraps to.
// Shared by every compositor that paints a line onto art — /roam's background +
// character composite (composeEncounter) and a warding card's own art
// (composeWardingCard) — so the two can never drift apart. `label` only names
// the caller in the log line.
function drawDialogueBox(canvas, ctx, text, label = 'composeEncounter', textScale = 1) {
  console.log(`[${label}] Drawing dialogue box`);
  // The metrics are authored against a 1000px-wide canvas — a /roam composite,
  // which is exactly that — and scale with the canvas from there, so a card
  // rendered at a different width gets text of the same *relative* size rather
  // than a band that shrinks as the frame grows. At 1000 wide the scale is 1
  // and the numbers are the originals.
  const scale = (canvas.width / DIALOGUE_REFERENCE_WIDTH) * textScale;
  const padding = Math.round(24 * scale);
  const fontSize = Math.round(30 * scale);
  const lineHeight = Math.round(40 * scale);

  // White text.
  ctx.fillStyle = '#ffffff';
  ctx.font = `${fontSize}px "${DIALOGUE_FONT_FAMILY}"`;
  ctx.textBaseline = 'top';

  // Discord markdown means nothing inside a PNG: an *italic* stage direction
  // painted as-is shows the player literal asterisks. Emphasis markers are
  // stripped here, at the paint, rather than in the data — the same string may
  // still be sent as message text elsewhere, where the markdown does render.
  // /roam greetings carry none of these; warding greetings do, because they
  // were authored back when they were shown as message text.
  const plain = text.replace(/\*+/g, '');

  // Wrap text and calculate required height.
  const maxWidth = canvas.width - 2 * padding;
  const words = plain.split(' ');
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

// Composite a background and character image on canvas, optionally with dialogue.
// Returns a buffer containing the PNG-encoded composite image.
export async function composeEncounter(bgFilename, charFilename, dialogue = null) {
  const { canvas, ctx } = await drawEncounterBase(bgFilename, charFilename);

  if (dialogue) drawDialogueBox(canvas, ctx, dialogue);

  console.log('[composeEncounter] Converting to PNG buffer');
  const bufferStart = Date.now();
  const buffer = canvas.toBuffer('image/png');
  console.log('[composeEncounter] Buffer created in', Date.now() - bufferStart, 'ms, size:', buffer.length);
  return buffer;
}

// How much bigger a warding card's dialogue text is drawn than the proportional
// size a /roam composite gets. Cards are 944x2048 portraits, and Discord draws
// them height-capped, so they show far smaller on screen than a 1000px-wide
// /roam scene; the same relative text size came out unreadable.
const WARDING_TEXT_SCALE = 2;

// The width warding cards are composed at, and the one dimension the message
// gives us: the gallery is top-level, outside the Container, so nothing insets
// it. Discord hands that item the full width of the message content area —
// roughly 550 CSS px on desktop — so this is that at 2x, for HiDPI screens.
// Wider art is scaled down to it (by width, aspect ratio preserved); narrower
// art is left alone rather than upscaled. This is the only place the card's
// pixel size is decided.
//
// Height is NOT capped here: the card keeps its source aspect ratio. Note that
// Discord also caps how tall it will draw an image, so a very tall portrait is
// scaled down by the client to fit that cap and ends up narrower than this
// width on screen. Cropping the art toward a squarer aspect is the only lever
// that changes that; the width below is the ceiling, not a guarantee.
export const WARDING_RENDER_WIDTH = 1100;

// A warding card (docs/warding-cards.md): the art in assets/warding/ IS the
// whole image — no background layer, no character layer, nothing composited
// under it — and the card's `greeting` is painted into the same dialogue box a
// /roam scene uses. The canvas is at most WARDING_RENDER_WIDTH wide with the
// height following the source aspect ratio, so no card is ever wider than the
// message can show. Cards are portrait and much taller than a background, so a
// long greeting costs proportionally less of the frame than the same text
// would over a /roam composite.
export async function composeWardingCard(cardFilename, greeting = null) {
  const cardPath = join(__dirname, `${WARDING_ASSET_DIR}/${cardFilename}`);

  console.log('[composeWardingCard] Loading card:', cardPath);
  const loadStart = Date.now();
  const cardImg = await loadImage(cardPath);
  console.log('[composeWardingCard] Card loaded in', Date.now() - loadStart, 'ms');

  // Scaled BY WIDTH, height following the source aspect ratio — width is the
  // dimension the message gives us. Never upscaled, though: blowing 944px of
  // art up to 1100 buys no on-screen detail (the client shows it at ~550 CSS
  // px either way) and costs sharpness and a much heavier PNG, so art narrower
  // than the target is composed as authored.
  const width = Math.min(WARDING_RENDER_WIDTH, cardImg.width);
  const height = Math.round(cardImg.height * (width / cardImg.width));

  console.log(
    '[composeWardingCard] Scaling',
    `${cardImg.width}x${cardImg.height}`,
    '->',
    `${width}x${height}`,
  );
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(cardImg, 0, 0, width, height);

  if (greeting) drawDialogueBox(canvas, ctx, greeting, 'composeWardingCard', WARDING_TEXT_SCALE);

  console.log('[composeWardingCard] Converting to PNG buffer');
  const bufferStart = Date.now();
  const buffer = canvas.toBuffer('image/png');
  console.log('[composeWardingCard] Buffer created in', Date.now() - bufferStart, 'ms, size:', buffer.length);
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

// --- errand field report (docs/scheduled-missions.md §5) ---------------------

// The /docs sheet: one signature block per student the errand needs, with the
// character's real signature art dropped onto the line once they've been met.
// Purely a visual — the same roster is in the message text underneath, which is
// what a client with images turned off reads, and what /docs falls back to on
// its own if this throws.
//
// assets/signatures holds one 400x120 PNG per house character, named the way
// avatars are: `FirstName_LastWord.png`.
// 640 rather than 720: the signature art is 400px wide at source and is never
// upscaled, so a wider sheet would only add blank paper and bytes.
const REPORT_WIDTH = 640;
const REPORT_PADDING = 44;
const REPORT_HEADER_H = 132;
const REPORT_ROW_H = 124;
const REPORT_PAPER = '#f2ece0';
const REPORT_INK = '#2b2620';

/**
 * The ink's bounding box within a signature PNG.
 *
 * The art is a uniform 400x120 canvas, but how much of it each signature
 * actually fills varies a lot — "Jin K." occupies a fraction of the width that
 * "Tohma Ishibashi" needs. Scaling the raw canvas therefore renders some
 * signatures half the size of others for no reason the player can see. Fitting
 * the *ink* instead makes every block look deliberate.
 *
 * Returns null for a fully transparent image, so the caller can skip it rather
 * than divide by zero.
 */
function inkBounds(image) {
  const probe = createCanvas(image.width, image.height);
  const probeCtx = probe.getContext('2d');
  probeCtx.drawImage(image, 0, 0);
  const { data } = probeCtx.getImageData(0, 0, image.width, image.height);

  let minX = image.width;
  let minY = image.height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < image.height; y++) {
    for (let x = 0; x < image.width; x++) {
      // Alpha only: the ink is dark on transparent, and a low threshold keeps
      // antialiased edges from being cropped off.
      if (data[(y * image.width + x) * 4 + 3] > 8) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (maxX < 0) return null;
  return { x: minX, y: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

/**
 * `rows` is `[{ name, file, signedAt }]` — `file` is a filename in
 * assets/signatures, or null when that target hasn't signed yet. Kept as plain
 * data rather than character objects so this module stays ignorant of the
 * roster, the same way composeEncounter takes filenames.
 */
export async function composeFieldReport(house, rows) {
  const height = REPORT_HEADER_H + rows.length * REPORT_ROW_H + REPORT_PADDING - 12;
  const canvas = createCanvas(REPORT_WIDTH, height);
  const ctx = canvas.getContext('2d');

  // Paper, with a faint edge so it reads as a sheet rather than a background.
  ctx.fillStyle = REPORT_PAPER;
  ctx.fillRect(0, 0, REPORT_WIDTH, height);
  ctx.strokeStyle = 'rgba(43, 38, 32, 0.18)';
  ctx.lineWidth = 2;
  ctx.strokeRect(1, 1, REPORT_WIDTH - 2, height - 2);

  ctx.textBaseline = 'top';

  ctx.fillStyle = REPORT_INK;
  ctx.font = `28px "${DIALOGUE_FONT_FAMILY}"`;
  ctx.fillText('DARKWICK FIELD REPORT', REPORT_PADDING, REPORT_PADDING);

  const signedCount = rows.filter((r) => r.signedAt).length;
  ctx.font = `19px "${DIALOGUE_FONT_FAMILY}"`;
  ctx.fillStyle = 'rgba(43, 38, 32, 0.6)';
  ctx.fillText(
    `${house}   ·   ${signedCount} of ${rows.length} signature${rows.length === 1 ? '' : 's'} collected`,
    REPORT_PADDING,
    REPORT_PADDING + 40,
  );

  ctx.strokeStyle = 'rgba(43, 38, 32, 0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(REPORT_PADDING, REPORT_HEADER_H - 18);
  ctx.lineTo(REPORT_WIDTH - REPORT_PADDING, REPORT_HEADER_H - 18);
  ctx.stroke();

  const lineLeft = REPORT_PADDING;
  const lineRight = REPORT_WIDTH - REPORT_PADDING;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const ruleY = REPORT_HEADER_H + i * REPORT_ROW_H + 84;

    // The signature sits ON the rule, so it has to be drawn before it.
    if (row.file) {
      try {
        const sig = await loadImage(join(__dirname, `assets/signatures/${row.file}`));
        const ink = inkBounds(sig);
        if (ink) {
          const maxW = lineRight - lineLeft - 56;
          const maxH = 74;
          // Never past 1:1. Upscaling the art blurs the ink AND is most of what
          // this PNG costs to send — smooth interpolated edges over a large
          // area are exactly what PNG compresses worst, so a signature drawn
          // above its native size is paid for twice.
          const scale = Math.min(maxW / ink.width, maxH / ink.height, 1);
          const w = ink.width * scale;
          const h = ink.height * scale;
          // Sitting slightly low so the ink crosses the rule, the way a real
          // signature does rather than floating above it.
          ctx.drawImage(sig, ink.x, ink.y, ink.width, ink.height, lineLeft + 24, ruleY - h + 10, w, h);
        }
      } catch (err) {
        // A missing or unreadable file costs this row its flourish, not the
        // whole report.
        console.error(`[composeFieldReport] Could not load signature ${row.file}:`, err.message);
        ctx.fillStyle = REPORT_INK;
        ctx.font = `italic 26px "${DIALOGUE_FONT_FAMILY}"`;
        ctx.fillText('signed', lineLeft + 24, ruleY - 36);
      }
    }

    ctx.strokeStyle = 'rgba(43, 38, 32, 0.45)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(lineLeft, ruleY);
    ctx.lineTo(lineRight, ruleY);
    ctx.stroke();

    // Printed name under the line, the way a signature block prints it.
    ctx.font = `19px "${DIALOGUE_FONT_FAMILY}"`;
    ctx.fillStyle = row.signedAt ? 'rgba(43, 38, 32, 0.82)' : 'rgba(43, 38, 32, 0.42)';
    ctx.fillText(row.name, lineLeft, ruleY + 10);

    // Right-hand status: when it was signed, or what is still wanted.
    ctx.textAlign = 'right';
    if (row.signedAt) {
      const when = new Date(row.signedAt);
      ctx.fillStyle = 'rgba(43, 38, 32, 0.5)';
      ctx.fillText(
        Number.isNaN(when.getTime())
          ? 'signed'
          : when.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        lineRight,
        ruleY + 10,
      );
    } else {
      ctx.fillStyle = 'rgba(43, 38, 32, 0.32)';
      ctx.fillText('awaiting signature', lineRight, ruleY + 10);
    }
    ctx.textAlign = 'left';
  }

  // Level 9 over the default 6. The sheet is flat color and line art, so the
  // extra effort is cheap and the result is a file Discord serves to every
  // viewer of the ephemeral.
  return canvas.toBuffer('image/png', { compressionLevel: 9 });
}
