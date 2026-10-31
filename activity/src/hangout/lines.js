// Hangout: the drafted per-character touch lines (constants/hangout/<id>.js,
// docs/hangout-activity.md §4.3), loaded on demand by the Activity and both
// previews. A character with none drafted gets the placeholders.
//
// A file with a `daytime` set (Towa, who can't speak by day) swaps to it by
// day, judged by the same evening cutoff as _PM backgrounds and the pmOnly
// dialogue swap (constants/backgrounds.js timeBucket).

import { timeBucket } from "../../../constants/backgrounds.js";

const FILES = import.meta.glob("../../../constants/hangout/*.js", { import: "default" });

/**
 * `character`'s lines by tier, or undefined (the placeholders) if none are
 * drafted. `daytime` defaults to the hour right now.
 */
export async function loadLines(character, { daytime = timeBucket(new Date()) === "day" } = {}) {
  const lines = await FILES[`../../../constants/hangout/${character}.js`]?.();
  return daytime && lines?.daytime ? lines.daytime : lines;
}
