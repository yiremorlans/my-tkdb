import { createCanvas, loadImage, registerFont } from 'canvas';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Try to register Liberation fonts from common paths
const fontPaths = [
  '/usr/share/fonts/truetype/liberation/LiberationMono-Regular.ttf',
  '/usr/local/share/fonts/LiberationMono-Regular.ttf',
  '/nix/store/fonts/LiberationMono-Regular.ttf',
];

for (const fontPath of fontPaths) {
  if (fs.existsSync(fontPath)) {
    try {
      registerFont(fontPath, { family: 'Liberation Mono' });
      console.log('[imageComposition] Registered font from:', fontPath);
      break;
    } catch (e) {
      console.log('[imageComposition] Failed to register', fontPath, ':', e.message);
    }
  }
}

// Composite a background and character image on canvas, optionally with dialogue.
// Returns a buffer containing the PNG-encoded composite image.
export async function composeEncounter(bgFilename, charFilename, dialogue = null) {
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
  ctx.drawImage(charImg, charX, charY);

  // Draw dialogue box if provided.
  if (dialogue) {
    console.log('[composeEncounter] Drawing dialogue box');
    const padding = 24;
    const fontSize = 30;
    const lineHeight = 40;

    // White text.
    ctx.fillStyle = '#ffffff';
    ctx.font = `${fontSize}px sans-serif`;
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
