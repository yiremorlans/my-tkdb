import { createCanvas, loadImage } from 'canvas';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Composite a background and character image on canvas, optionally with dialogue.
// Returns a buffer containing the PNG-encoded composite image.
export async function composeEncounter(bgFilename, charFilename, dialogue = null) {
  const bgPath = join(__dirname, `assets/bg/${bgFilename}`);
  const charPath = join(__dirname, `assets/chars/${charFilename}`);

  const bgImg = await loadImage(bgPath);
  const charImg = await loadImage(charPath);

  // Use background dimensions as canvas size.
  const canvas = createCanvas(bgImg.width, bgImg.height);
  const ctx = canvas.getContext('2d');

  // Draw background.
  ctx.drawImage(bgImg, 0, 0);

  // Draw character centered horizontally and positioned in the lower half vertically.
  // Adjust these offsets as needed for your art style.
  const charX = (canvas.width - charImg.width) / 2;
  const charY = canvas.height - charImg.height;
  ctx.drawImage(charImg, charX, charY);

  // Draw dialogue box if provided.
  if (dialogue) {
    const boxHeight = 100;
    const padding = 16;
    const fontSize = 18;
    const lineHeight = 24;

    // Semi-transparent black box at the bottom.
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, canvas.height - boxHeight, canvas.width, boxHeight);

    // White text.
    ctx.fillStyle = '#ffffff';
    ctx.font = `${fontSize}px Arial, sans-serif`;
    ctx.textBaseline = 'top';

    // Wrap text and draw it within the box.
    const maxWidth = canvas.width - 2 * padding;
    const words = dialogue.split(' ');
    let line = '';
    let y = canvas.height - boxHeight + padding;

    for (const word of words) {
      const testLine = line + (line ? ' ' : '') + word;
      const metrics = ctx.measureText(testLine);

      if (metrics.width > maxWidth && line) {
        ctx.fillText(line, padding, y);
        y += lineHeight;
        line = word;
      } else {
        line = testLine;
      }
    }
    if (line) ctx.fillText(line, padding, y);
  }

  return canvas.toBuffer('image/png');
}
