// Hangout: the drafted per-character touch lines (constants/hangout/<id>.js,
// docs/hangout-activity.md §4.3), loaded on demand by the Activity and both
// previews. A character with none drafted gets the placeholders.

const FILES = import.meta.glob("../../../constants/hangout/*.js", { import: "default" });

/** `character`'s lines by tier, or undefined (the placeholders) if none are drafted. */
export async function loadLines(character) {
  const load = FILES[`../../../constants/hangout/${character}.js`];
  return load?.();
}
