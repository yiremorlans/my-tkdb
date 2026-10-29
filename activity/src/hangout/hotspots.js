// Hangout: which hotspot a tap lands on (docs/hangout-activity.md §4.2).
// Hotspots come from rig.json `hotspots`, each a part plus an optional rect
// in that part's normalized image space ([x0, y0, x1, y1]; whole image if
// absent). Listed order is priority, so put small spots before large ones.

/** Name of the hotspot under a reference-space point, or null. */
export function hotspotAt(rig, renderer, point) {
  for (const [name, spot] of Object.entries(rig.hotspots ?? {})) {
    const uv = renderer.partUV(spot.part, point);
    if (!uv) continue;
    const [x0, y0, x1, y1] = spot.rect ?? [0, 0, 1, 1];
    if (uv[0] >= x0 && uv[0] <= x1 && uv[1] >= y0 && uv[1] <= y1) return name;
  }
  return null;
}
