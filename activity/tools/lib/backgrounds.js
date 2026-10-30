// The character's room, as a rig.json `background`: shared by the sprite
// rig's new-rig.js and the Live2D rig's live2d-rig.js.

import path from "node:path";

import { BACKGROUNDS_BY_LOCATION, BACKGROUND_ASSET_DIR, CHARACTER_ROOMS, backgroundPath } from "../../../constants/backgrounds.js";

/** The character's room background, relative to the rig dir, if it has one. */
export function roomBackground(character, rigDir) {
  const room = CHARACTER_ROOMS[character.toUpperCase()];
  const file = room && (BACKGROUNDS_BY_LOCATION[room] ?? []).find((f) => !/_PM\.png$/.test(f) && !/Entrance/.test(f));
  return file ? path.relative(rigDir, path.join(BACKGROUND_ASSET_DIR, backgroundPath(file))) : null;
}
