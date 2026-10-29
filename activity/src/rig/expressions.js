// Hangout rig: mood resolution (docs/hangout-activity.md §3.3). No PixiJS.
//
// A mood in rig.json `expressions.moods` is one of:
//   { "source": "atlas",   "show": [partIds], "hide": [partIds] }
//   { "source": "overlay", "file": "overlays/smile.png", "rect": [x, y, w, h] }
//   { "layers": ["smile", "blush"] }          // composed from other moods
// plus optional "noBlink": true when the mood already closes the eyes.
//
// Atlas moods swap parts; overlay moods draw an image on the head. Swapping
// a mood from overlay to atlas (e.g. the atlas's open mouths) is a data
// change only.
//
// Overlay `rect` is the overlay's crop inside the expression portrait, in
// portrait px. `expressions.overlayScale` maps portrait px to reference px,
// and `overlayOffset` is where the portrait's top-left sits in the head
// part's bone frame.

import { multiply } from "./skeleton.js";

/** Flattens a mood (following `layers`) into { show, hide, overlays, noBlink }. */
export function resolveMood(rig, name, seen = new Set()) {
  const moods = rig.expressions?.moods ?? {};
  const mood = moods[name];
  if (!mood) throw new Error(`unknown mood ${name}`);
  if (seen.has(name)) throw new Error(`mood ${name} layers itself`);
  seen.add(name);

  const out = { show: new Set(), hide: new Set(), overlays: [], noBlink: !!mood.noBlink };
  for (const layer of mood.layers ?? []) {
    const sub = resolveMood(rig, layer, seen);
    sub.show.forEach((id) => out.show.add(id));
    sub.hide.forEach((id) => out.hide.add(id));
    out.overlays.push(...sub.overlays);
    out.noBlink ||= sub.noBlink;
  }
  for (const id of mood.show ?? []) out.show.add(id);
  for (const id of mood.hide ?? []) out.hide.add(id);
  if (mood.file) out.overlays.push({ file: mood.file, rect: mood.rect ?? [0, 0] });
  return out;
}

/** Shown/hidden part sets for a resolved mood (blink is applied on top). */
export function moodParts(resolved, blink = null) {
  const show = new Set(resolved.show);
  const hide = new Set(resolved.hide);
  if (blink && !resolved.noBlink) {
    blink.show.forEach((id) => {
      show.add(id);
      hide.delete(id);
    });
    blink.hide.forEach((id) => hide.add(id));
  }
  return { show, hide };
}

/** Whether a part draws under the given shown/hidden sets. */
export function isVisible(part, { show, hide }) {
  return part.hidden ? show.has(part.id) : !hide.has(part.id);
}

/** Overlay image px → reference px, riding on the head bone. */
export function overlayMatrix(rig, headBone, overlay) {
  const s = rig.expressions.overlayScale;
  const [ox, oy] = rig.expressions.overlayOffset ?? [0, 0];
  const [rx, ry] = overlay.rect;
  return multiply(headBone, [s, 0, 0, s, ox + rx * s, oy + ry * s]);
}
