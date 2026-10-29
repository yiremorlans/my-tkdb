# Rig authoring scripts (Alan, historical)

One-off Python/OpenCV scripts from fitting Alan's head, hair and academy
body. Kept as reference; they are not part of the app or the pipeline, and
their paths predate the move of academy's assets into `assets/rig/alan/academy/`.

**The maintained pipeline is the Node tools in `activity/tools/`**
(docs/hangout-activity.md §3.5): `new-rig.js`, `slice-atlas.js`,
`register-head.js`, `fit-outfit.js`, `match-hands.js`,
`build-sprite-skin.js`, `check-rig.js`, `render-rig.js`, plus
`build-overlays.js` and `build-portrait-hair.js`. Everything outfit-specific
is data (`<outfit dir>/fit.json`, `part-names.json`, rig.json), and rerunning
them on Alan reproduces his rig.json byte for byte.

They replaced these scripts (removed; see git history):

| Was | Now |
|---|---|
| `body_explicit.py`, `body_roomwear.py`, `outfit_from_fits.mjs` | `fit-outfit.js` + `academy/fit.json`, `roomwear/fit.json` |
| `shared_mask.mjs` | `fit-outfit.js` (`coverShared`) |
| `register_head.py` | `register-head.js` (`roomwear/fit.json` `registerHead`) |
| ad-hoc leak/hole checks | `check-rig.js` + `checks.json` |

**`rig.json` is the source of truth.** It has hand edits `build_rig.py` does
not reproduce (`neck_hires`, `jaw.hidden`, `portraitHair.jawClipY/jawGrow/
faceParts/diff`, the shared `spriteSkin` neck fixes, the reactions in
`activity/src/hangout/reactions.js`). Don't rerun `build_rig.py` over it.

Setup, if you do run one: `python3 -m venv .venv && .venv/bin/pip install numpy opencv-python-headless pillow`.
Each takes the data directory as its first argument
(`activity/tools/authoring/data`) and runs from the repo root.

| Script | What it did |
|---|---|
| `fit.py`, `peelcore.py` | template matching; front-to-back "peeling" fit (ported to `lib/match.js`) |
| `peel_head.py`, `peel_hair2.py`, `hair3.py`, `hair4.py`, `face_explicit.py`, `fit_moods.py` | head/hair/face/mood-part fits against `expressions/alan/*.png` |
| `body_fix*.py`, `peel_body2.py` | academy body-part fit experiments |
| `build_rig.py` | turned the fits into the first `rig.json` (historical, see above) |
| `dump_rig.mjs`, `refine.py`, `apply_refine.py` | sub-pixel refinement of academy body parts (now pinned in `academy/fit.json`) |
| `hand_scale.py` | +3% hand scale (sprite gloves are larger than the atlas hands) |
| `cutout2.py` | background removal for game screenshots against a registered clean background |
| `neck_hires.py` | the sharp neck patch (`academy/derived/neck_hires.png`) from a 2.26× screenshot |
| `pipeline.sh` | the order they ran in (paths need adjusting) |

`data/`: `p2s.npy` maps portrait px → sprite px; `s2shot_*.npy` sprite →
screenshot; `bg2shot_*.npy` clean background → screenshot.
