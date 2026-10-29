# Rig authoring scripts (Alan: academy, roomwear)

One-off Python/OpenCV scripts used to fit Alan's atlas parts against his
reference sprites and build `assets/rig/alan/rig.json`. Kept as reference
for authoring the next outfit or character; they are not part of the app.

**`rig.json` is the source of truth now.** It has hand edits that
`build_rig.py` does not reproduce (`neck_hires`, `jaw.hidden`,
`portraitHair.jawClipY/jawGrow/faceParts/diff`, `spriteSkin.shades`, the
shared reactions moved to `activity/src/hangout/reactions.js`). Don't rerun
`build_rig.py` over it; reuse the pieces.

Setup: `python3 -m venv .venv && .venv/bin/pip install numpy opencv-python-headless pillow`.
Every script takes the data directory as its first argument
(`activity/tools/authoring/data`) and runs from the repo root.

| Script | What it does |
|---|---|
| `fit.py`, `peelcore.py` | template matching; front-to-back "peeling" fit of parts against a target image |
| `peel_head.py`, `peel_hair2.py`, `hair3.py`, `hair4.py`, `face_explicit.py`, `fit_moods.py` | head/hair/face/mood-part fits against `expressions/alan/*.png` |
| `body_explicit.py`, `body_fix*.py`, `peel_body2.py` | body-part fits against the reference sprite (`body.json`) |
| `build_rig.py` | turned the fits into the first `rig.json` (historical, see above) |
| `dump_rig.mjs`, `refine.py`, `apply_refine.py` | sub-pixel refinement of body parts against the sprite |
| `hand_scale.py` | +3% hand scale (sprite gloves are larger than the atlas hands) |
| `cutout2.py` | background removal for game screenshots against a registered clean background |
| `neck_hires.py` | the sharp neck patch (`derived/neck_hires.png`) from a 2.26× screenshot |
| `pipeline.sh` | the order they ran in (paths need adjusting) |

**Roomwear** (second outfit; head shared, so only the body was fitted):

| Script | What it does |
|---|---|
| `register_head.py` | `alan_room.png` draws the head 1.3% smaller and ~6 px lower than the shared head; this moves the sprite's head onto the rig's, eased across the neck, body pixels untouched → `roomwear/derived/alan_room_rig.png`, the outfit's `referenceImage` |
| `shared_mask.mjs` | alpha of the shared head at rest, so fits treat it as covering the neck |
| `body_roomwear.py` | front-to-back fits of the roomwear parts (scale came out 0.68–0.69, not academy's 0.70) |
| `outfit_from_fits.mjs` | writes `outfits.roomwear` from the fits, plus hand-placed parts (upper arms, wristband) and corrections (neck) |

Order: `slice-atlas.js alan --outfit roomwear` → `register_head.py` →
`shared_mask.mjs` → `body_roomwear.py` → `outfit_from_fits.mjs` →
`build-sprite-skin.js alan --outfit roomwear` → `render-rig.js alan
--outfit roomwear` (add `--ref assets/rig/alan/source/alan_room.png` to
compare with the unregistered sprite).

`data/`: `p2s.npy` maps portrait px → sprite px; `s2shot_*.npy` sprite →
screenshot; `bg2shot_*.npy` clean background → screenshot.

Node tools in `activity/tools/` (`slice-atlas.js`, `build-overlays.js`,
`build-portrait-hair.js`, `build-sprite-skin.js`, `render-rig.js`) are the
maintained pipeline.
