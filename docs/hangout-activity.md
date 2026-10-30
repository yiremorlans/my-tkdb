# Spec: Hangout — rigged-sprite Discord Activity

Status: **specced** (not started)
Last updated: 2026-10-28

A new feature, separate from `/roam` and `/meet` (which stay exactly as they
are). The Hangout is a **solo, private Discord Activity** where a character —
Alan first — idles in their own room as an **animated, code-rigged sprite**.
The user taps him for reactions and lines, and once per cooldown can
**Spend time** with him to earn a small amount of affinity.

The rig is built entirely in code (PixiJS) from art already on hand. There is
no Live2D, no Cubism Editor, and no `.moc3` — nothing is extracted from the
game, and nobody has to rig by hand. The only hands-on step is optionally
nudging parts in a dev-only editor (§3.4).

Launched from `/hangout` (the Activity's entry-point command) or the
voice-channel Activity launcher. Private and unlisted: the bot's own servers
only, no App Directory listing, no monetization.

---

## 0. Relationship to other specs / shared infra

| Shared piece | Where it's defined | Used here for |
|---|---|---|
| `command_limits`, `claimCommandSlot`, 3h `COOLDOWN_MS` | `commandLimits.js`, `db/supabase.js` | the hangout's own cooldown, under `command_name = 'hangout'` (§5.2) |
| `levelChange`, `deliverBondScene` | `storage.js`, `bondScenes.js` | level-ups from Spend time fire the same bond-scene DM (§5.3) |
| `character_relationships` | `db/SCHEMA.md` | the affinity Spend time writes |
| `command_usage_log`, `character_engagement` | `db/SCHEMA.md` | analytics, logged as `'hangout'` (§5.4) |
| `CHARACTER_ROOMS`, `backgroundPath` | `constants/backgrounds.js` | the room background (`Vagastrom_Alan_Room.png`) |
| Dialogue box look, fonts | `imageComposition.js`, `assets/fonts` | the Activity's UI styling (§4.4) |
| Alan's voice | `constants/dialogue/alan.js` | reference for drafting hangout lines (§4.3) |

**Deliberate rule change.** [`bond-scene-dms.md`](./bond-scene-dms.md) and
[`scheduled-missions.md`](./scheduled-missions.md) both state that `/roam` and
`/meet` are the only things that move affinity. The Hangout's Spend time is a
third, intentionally small source (+1, own cooldown). Update those two lines
when this ships.

---

## 1. Goals and non-goals

**Goals**
- A rigged character that feels alive with minimal movement — the rig is the
  main attraction.
- A data-driven pipeline: adding another character is new data files
  (`rig.json`, overlays, lines), not new code.
- Reads and writes the existing tkdb data through the server, never directly
  from the browser.

**Out of scope for v1**
- Shared multiplayer rooms (everyone in the voice call seeing the same
  character). v1 is solo per user.
- Store-credit gifts, lip sync, cursor/eye tracking, walking, large arm
  movements (overhead waves, hand behind head).
- Characters other than Alan.
- Public listing, and extracting or using game model files.

---

## 2. Source art

| File | What it is | Role |
|---|---|---|
| `alan_academy_00.png` (1858×1858) | Texture atlas: every part cut out — face base, eyes, brows, ears, ~80 hair strands, shirt, vest, sleeves, forearms, pants, boots, ~12 hand poses | the parts the rig is built from |
| `alan_academy.png` (768×1366) | Assembled full-body Alan | placement reference for rig authoring only; not rendered |
| `assets/expressions/alan/*.png` (562×562 each) | Flattened head portraits: `default`, `close`, `smile`, `full_smile`, `serious`, `surprise`, `sweat`, `blush`, `smile_blush`, `full_smile_blush`, `surprise_blush` | fallback source for expression overlays (§3.3) |
| `assets/bg/vagastrom/Vagastrom_Alan_Room.png` | Alan's room | background |

The atlas and reference sprite move into the repo under
`assets/rig/alan/source/`.

**Rights.** This is Tokyo Debunker art. Keeping the Activity private and
unlisted is what makes using it acceptable for now; going public waits on
confirming rights.

---

## 3. Rig pipeline

All tooling lives in `activity/tools/` and runs with Node. Output goes to
`assets/rig/<character>/` (one rig per character).

### 3.1 Slice

`slice-atlas.js` splits the atlas into one PNG per part by alpha-connected
regions, trims each, and writes `parts/<id>.png` plus `parts.json`
(id → source rect in the atlas). Tiny fragments (stray specks, pieces of a
larger part split by a gap) are grouped by proximity; anything ambiguous is
listed for a manual merge rather than guessed. The outfit's
`part-names.json` holds manual merges, names and an `ignore` list of atlas
rects with helper shapes rather than art (Yuri's flat magenta/green/orange
masks and blurred purple blob); ignored regions are dropped before ids are
assigned, so they never shift ids or show up as parts.

### 3.2 `rig.json`

One file per character, authored by Claude against `alan_academy.png` as
the reference, then tuned in the preview (§3.4). Shape:

```jsonc
{
  "character": "alan",
  "reference": { "width": 768, "height": 1366 },
  "scale": 0.41,                       // atlas px → reference px
  "parts": [
    {
      "id": "head",
      "image": "parts/face_base.png",
      "parent": "neck",
      "position": [384, 210],          // in parent space
      "pivot": [0.5, 0.92],            // normalized; rotation center
      "z": 40,
      "limits": { "rotation": [-6, 6] } // degrees
    },
    {
      "id": "forearm_r",
      "image": "parts/forearm_r.png",
      "parent": "upper_arm_r",
      "position": [12, 140],
      "pivot": [0.5, 0.04],
      "z": 22,
      "limits": { "rotation": [-5, 30] },
      "mesh": { "bend": true }          // optional mesh bend across the elbow
    }
  ],
  "groups": {
    "hair_locks": [["hair_front_l", "..."], ["hair_front_r", "..."], ["hair_side_l"], ["hair_back"]]
  },
  "hands": {
    "r": { "default": "hand_r_relaxed", "poses": ["hand_r_open", "hand_r_fist", "..."] },
    "l": { "default": "hand_l_relaxed", "poses": ["..."] }
  },
  "expressions": {
    "head": "head",
    "overlayScale": 0.62,
    "overlayOffset": [-4, 18],
    "moods": {
      "blink":   { "source": "atlas",   "parts": ["eye_l_closed", "eye_r_closed"] },
      "blush":   { "source": "overlay", "file": "overlays/blush.png" }
    }
  },
  "hotspots": {
    "head":  { "part": "head", "rect": [0.2, 0.0, 0.8, 0.45] },
    "cheek": { "part": "head", "rect": [0.25, 0.55, 0.75, 0.8] },
    "hand_l": { "part": "hand_l" },
    "hand_r": { "part": "hand_r" }
  },
  "motion": {
    "breath":  { "speed": 0.25, "amount": 0.012 },
    "hair":    { "speed": 0.4,  "amount": 3 },
    "arms":    { "speed": 0.25, "amount": 1.5 },
    "blink":   { "meanInterval": 4.0 }
  }
}
```

The renderer reads only this file and the images it names, so no character is
hard-coded.

**Outfits (added 2026-10-28).** One `rig.json` per character holds every
outfit. Top-level `parts` are shared (core bones, the head with its hair and
face); `outfits.<name>` holds each outfit's body parts, `hands`,
`spriteSkin`, `referenceImage`, `atlas`, `dir` (where its parts/ and skin/
live) and optional `scale` and `hotspots` (merged over the shared ones).
`defaultOutfit` picks the one shown first. `skeleton.js withOutfit()`
flattens one outfit into the shape above, so the renderer and tools are
otherwise unchanged; the loader validates every outfit, and the preview has
an outfit picker (`?outfit=<name>`). Alan has `academy` and `roomwear`.
Every outfit's assets live in its own folder (`academy/`, `roomwear/`:
parts/, skin/, derived/, parts.json, fit.json); shared head art cut from an
outfit's atlas keeps that outfit's path.

**Hand sets (decided 2026-10-28).** An outfit's `hands` is one set
(`{ r, l }`) or several on the same hand parts, for atlases with more than
one pair (Yuri: white gloves, surgical gloves, bare):
`"hands": { "defaultSet": "white", "sets": { "white": { "r", "l" }, "bare": { ... } } }`.
`withOutfit(rig, outfit, { handSet })` flattens the chosen set into `hands`
(and lists `handSets`), so the app can swap gloves at runtime
(`RigRenderer`/`Hangout.setHandSet`, e.g. from a reaction) without another
outfit. Only the set the sprite shows is fitted; the others are named by
`match-hands.js` against it. Preview: `?hands=<set>` and a picker.

**Hierarchy (Alan):** `root → hips → torso → { neck → head → { face layers,
hair locks }, shoulder_l/r → upper_arm → forearm → hand }`, legs static. Arms
layer behind the vest so the shoulder joint stays hidden.

**No body poses (decided 2026-10-28).** Full-body poses cut from
screenshots were built and cut after review: they didn't match the rig or
move. The body stays nearly still (minimal breath, slight head sway, no hair
sway) and reactions are carried by expressions, lines, a short arm twitch
and hand clenches (§4.2). Genuinely fluid motion would need a
mesh-deforming rig (Live2D or Spine), which §1 rules out for now.

**Hair from the portrait (decided 2026-10-28).** Alan's atlas hair strands
are warped in the finished art and won't sit rigidly, so the face is atlas
parts but the hair is cut from `expressions/alan/default.png` by
`activity/tools/build-portrait-hair.js` (config: `rig.json` `portraitHair`):
a static base plus 4 sway locks (crown, front, both sides). Other characters
can use either path.

### 3.3 Expressions

Each mood resolves in this order:

1. **Atlas parts first.** If the atlas has the pieces (e.g. a closed eye for
   blink, an alternate mouth or brow), the mood swaps those parts.
2. **Overlay fallback** — only when the atlas lacks the mood.
   `build-overlays.js` subtracts `expressions/<name>/default.png` from each
   expression file, keeping only the changed pixels (brows, eyes, mouth,
   blush), and writes transparent `overlays/<mood>.png`. Overlays attach to the
   `head` part, scaled and offset by `expressions.overlayScale` /
   `overlayOffset`, so they tilt with the head.

The slice step reports which moods the atlas covers, so `rig.json` records
the real source for each.

**v1 moods:** default, blink, smile, full smile, blush, smile + blush,
surprise, surprise + blush, sweat, and **upset** (`serious` + `sweat`; Alan has
no `annoyed` file).

**Known risk:** the expression portraits look slightly softer than the atlas
art. Check sharpness and alignment first thing in milestone 1. If a fallback
overlay looks visibly off, it stays out until fixed.

The same script runs for any character with a `default.png`, so Benkei, Elias
and the rest have a path in later.

### 3.4 Preview and tuning (milestone 1)

`activity/preview.html`, a local-only page (never deployed): Alan over his
room background, plus:

- every hotspot and the annoyance meter, working, with no data writes
- buttons to trigger each mood, reaction and hand pose
- a toggle and speed/amount sliders per idle motion, and per-arm angle limits
- the optional part editor: drag or nudge parts over a faded copy of
  `alan_academy.png`, then export changed values back into `rig.json`.
  A hand part moves/turns only the pose on screen (its `pivot` and
  `artRotation`), never the wrist bone every pose shares; saving also
  writes those poses to the outfit's `hand-fits.json` so `fit-outfit.js`
  keeps them (`align-hands.js --write` refits the non-default ones)

Milestone 1 ends when the user signs off on the look and feel here.

### 3.5 Pipeline tools (any character, any outfit)

Everything character- or outfit-specific is data: rig.json,
`<outfit dir>/fit.json` (fitting), `part-names.json` (slicing),
`checks.json` (quality baselines). Order for a new character or outfit:

1. **`new-rig.js <character> [--hair atlas|portrait]`** (new character):
   starting rig.json with the standard skeleton (root → hips → torso → neck
   → head; shoulder → upper_arm → forearm per side), `bones`, motion and
   annoyance defaults, one outfit, the atlas sliced into its folder, and a
   fit.json template. Starting joints are measured from the character's own
   sprite (narrowest neck row, crotch), never copied from another rig; the
   first fit sets them from the fitted parts (fit.json `bones`).
2. **`slice-atlas.js <character> --outfit <name>`** (§3.1).
3. **`register-head.js <character> --outfit <name>`** (second+ outfit):
   ECC on the head box finds how the outfit's sprite draws the shared head
   (alan_room.png: 1.33% smaller, ~6 px lower at the neck), reports it, and
   writes the registered sprite as the outfit's `referenceImage`.
4. **`fit-outfit.js <character> --outfit <name> [--propose]`**: fit.json
   lists candidate atlas parts, approximate centers, front-to-back order,
   parent bone, z, optional `rotate`, and overrides/pins for mostly hidden
   or hand-refined parts. Front-to-back peeling with the shared head
   covering the neck; scales in a narrow band around the outfit's scale;
   centers from the fitted template size. `--propose` estimates the scale
   and rough centers with a coarse whole-image search for a human to
   confirm. `lines` binds a line-art layer to its fill. Hand poses take
   their per-side pivot/scale from the outfit's hand-fits.json (step 5b).
   A `head` section fits the shared head instead: it registers the
   expression portrait onto the sprite and fits `shared: true` parts on the
   portrait (Yuri), writing `overlayScale`/`overlayOffset` from it. `clip`
   cuts a part's art to the sprite's silhouette at rest
   (`derived/<id>_clip.png`). Rerunning it on
   Alan reproduces rig.json byte for byte (academy is pinned to its
   refined values and reports how close the search lands).
5. **`match-hands.js <character> --outfit <new> [--from <outfit>] [--set <set>]`**:
   names hand poses by silhouette against an existing outfit's (or set's),
   and flags poses with no counterpart (roomwear has no "open").
5b. **`align-hands.js <character> --outfit <name> [--set <set>] [--turn <deg>] [--write]`**:
   lines every non-default hand pose's wrist up with the forearm, per side:
   the forearm's edges are traced above the default hand and each drawing's
   wrist is scaled and shifted onto them (optionally turned, `artRotation`).
   `--write` saves `<outfit>/hand-fits.json` (read by fit-outfit.js) and
   applies it to rig.json. Rerun it after a hand fit or new hand art.
6. **`build-sprite-skin.js`**: one skin group per bone with art; the
   character's shared `spriteSkin` holds the neck fixes (underlays, neck
   shade, jaw patch); an outfit's lists only overrides (academy: the
   front/back torso split, mesh-bent lower sleeves; roomwear: the jaw patch
   down to row 256).
7. **`check-rig.js <character> --outfit <name> [--record]`**: rest-pose leak
   (sprite opaque, rig empty: magenta in `?leak=1`) and spill, enclosed
   holes at each bone's rotation limits (plus checks.json `angles`, split
   into tears and walled-in background), and the mean diff vs the
   reference, each naming the parts involved. `test/hangout-rig-check.test.js`
   fails when an outfit gets worse than its recorded numbers. Alan's
   baselines include academy's boot leaks, its 870 px elbow gap at forearm
   ±60° (mostly background walled in by the bent arm), and the 17 px
   hair-crown leak both outfits share.
8. **`render-rig.js`** for a side-by-side with the reference (`--portrait`
   compares a mood with its own expression portrait, `--hotspots` outlines
   the touch points, `--grid` labels coordinates), and **`probe-rig.js`**
   for the parts drawn at a pixel, bottom to top.

### 3.6 Hangout v2 models (Live2D, added 2026-10-30)

v2 (§6, "Version") draws the game's own Live2D model instead of a sprite
rig: `assets/live2d/<id>/<outfit>/` holds the Cubism files and
`assets/live2d/<id>/rig.json` the v1-shaped keys `live2dRig.js` reads. The
game's models share one 2000x2800 canvas. Order for a new character or
outfit:

1. **Pull the game's cache from BlueStacks.** The game downloads each
   model's bundle the first time a scene needs it, so a character missing
   from the cache has to be played to first. With BlueStacks running:
   ```
   hd-adb connect 127.0.0.1:5555
   hd-adb -s 127.0.0.1:5555 pull /sdcard/Android/data/com.zigzagame.tokyodebunker <dir>
   ```
   (`hd-adb` is `/Applications/BlueStacks.app/Contents/MacOS/hd-adb`.) The
   catalog, `files/com.unity.addressables/catalog_*.json`, names each model
   bundle `dialogueactors_assets_<name><outfit>_<hash>.bundle` (game names:
   `luca`, `sho`, `jou` for Jo). The cached copy is
   `files/UnityCache/Shared/<x>/<hash>/__data`; no folder with that hash
   means it isn't downloaded yet.
2. **Start AssetRipper headless:** `AssetRipper.GUI.Premium --headless --port 54321`
   (the Free build takes the same flags).
3. **`live2d-convert.js <character> --bundle <__data>`**: AssetRipper's
   Unity-project export, then the moc3 (the CubismMoc asset's bytes),
   physics3 (from the prefab's CubismPhysicsController), exp3 and motion3
   files (Unity Hermite curves turned back into exact beziers, infinite
   slopes into stepped segments), a looping `*_hold` clip pinned at the last
   frame of every pose that has a `*_return`, and model3.json. Files are
   `<character>_<outfit>.*` after the repo's ids. `--assets` takes an
   export made by hand. Converting Alan's bundle reproduces his committed
   files.
4. **`live2d-rig.js <character>`**: rig.json from Alan's as a template.
   Hotspot parts are picked from the model's part tree at rest (face skin,
   PartMouth, PartEar, the lowest arm pieces, the biggest torso piece, the
   legs), the stage is Alan's framing shifted to the face, moods and
   reaction poses are mapped onto the expressions and clips this model has,
   and the background is v1's or the character's room. It reproduces the
   20 academy rigs it wrote (2026-10-30) byte for byte.
5. **Check it** in `hangout-v2.html?character=<id>` with "show hotspots",
   and tune rig.json by hand where the picks are off.

---

## 4. The Activity

### 4.1 Idle motion

| Motion | Implementation |
|---|---|
| Breathing | torso/shoulder scale on a slow sine |
| Blink | randomized interval around `meanInterval`, ~120 ms close |
| Head tilt/sway | `head` rotation, two mixed sines, within limits; one shared setting for every character (`motion.js` `HEAD_SWAY`), never per rig |
| Hair | 2–4 grouped locks, rotation lagging the head |
| Arms | small sway in step with the breath |
| Twitch | on a hand tap (new/known): that forearm (with a little upper arm) eases in toward the body and settles, ~0.6 s; the hand rides along unchanged; `motion.twitch` sets `amount` (deg), `upper`, `peak` (s) |
| Background pan | the room (not the character) drifts on a slow wandering path, two mixed sines; `motion.bgPan` sets `speed` (cycles/s, default 0.022) and `amount` (fraction of the screen, default 0.01); the room is scaled up by twice `amount` so its edges never show; nothing to pan when no room is drawn |

### 4.2 Interactions

Touch faces come off the same expression ladder as call scenes
(`SCENE_FACES` + `SCENE_FACE_OVERRIDES` in constants/sceneFaces.js,
docs/public-encounters.md §17.4.1): each spot sits on a rung (2 = the face
for a favorite response at that tier, 1 = a liked one, 0 = the least), and
the tier picks the face on that rung. Overrides carry over, so Alan's flat
face at new is `serious` and his spark fave is `smile_blush`.

| Trigger | Rung | Alan (new/known · warm · spark · close/bound) |
|---|---|---|
| Head pat | 2 | close · surprise_blush · smile_blush · full_smile_blush; no head movement (a moving flat head read as unnatural) |
| Hand tap (L/R) | 2 | close · surprise_blush · smile_blush · full_smile_blush; the arm twitches at new/known |
| Cheek poke | 1 | sweat · surprise · surprise_blush · full_smile |
| Ear (L/R) | 1 | sweat · surprise · surprise_blush · full_smile |
| Lips | 0, 1 from spark, 2 from close | serious · serious · surprise_blush · full_smile_blush |
| Chest | 0, 1 from spark, 2 from close | serious · serious · surprise_blush · full_smile_blush |
| Hips | 0, 1 from spark, 2 from close | the most guarded spot: serious with a clench at new, serious at known/warm, blush only from spark; two taps fill the annoyance meter (`SPOT_ANNOYANCE`) |
| Spam-tapping | — | annoyance meter rises with fast repeated taps and decays over time; past the threshold → **upset** + a line ("…stop that."), taps ignored briefly, then he settles |
| **Spend time** | — | full smile + blush, a special line, +1 affinity (§5) |

Every character has the same touch spots (`TOUCH_SPOTS` in
activity/src/hangout/reactions.js): head, cheek, lips, ear_l/ear_r,
hand_l/hand_r, chest, hips. Left and right share one reaction; every other
spot has its own. The rungs per tier live in `DEFAULT_REACTIONS`. A
reaction can also `twitch` the arm (the tapped side for an L/R spot, both
arms otherwise; by default only a hand tap twitches) and clench a `fist`
for its duration (guarded spots at low tiers). The preview's "Touch spots"
row plays each spot.

Hotspot reactions are cosmetic, unlimited and local, with no server call.
Every reaction plays the line for that trigger in the dialogue box.

A reaction can also play a short sound clip (activity/src/hangout/sounds.js).
Sounds are opt-in per character: rig.json `sounds` maps a reaction name to a
file under the rig's directory (`sfx/…`, WAV or Ogg), a list to pick one from at random,
or `{ byTier: { <tier>: … } }`. It layers over the shared reaction, so faces
don't have to be restated. A reaction's own `sound` wins. Clips are fetched
with the rig, a missing one fails validation like a missing image, and they
are decoded up front through Web Audio so a tap plays with no lag. Clips share a
10-second cooldown (`SOUND_COOLDOWN` in hangout.js), counted from the clip
that played: taps inside it, combos included, still react, silently, and
don't extend it. This is a rule for every rig: the cooldown is shared code,
not a rig.json setting, and no rig overrides it. Sound plays only on the tapper's device, not
into the voice call, and the first tap unlocks audio. The ♪ button in the VN
box mutes it (remembered in localStorage) and shows only for characters with
sounds. Keep clips short, and export them mono at 22–24 kHz to keep the WAVs
small.

The Spend time button is lit only when the cooldown is ready. Otherwise it
shows the time left, and pressing it plays a cooldown-not-ready line.

Starting values for the annoyance threshold and decay go in `rig.json`
(`annoyance: { perTap, decayPerSec, threshold, recoverSec }`) and get tuned in
the preview.

### 4.3 Lines

`constants/hangout/alan.js`, one pool per trigger: `headPat`, `cheekPoke`,
`lipsTouch`, `earTouch`, `handTap`, `chestTouch`, `hipsTouch`, `upset`,
`spendTime`, `cooldownNotReady`, `greeting`. Claude drafts
them in Alan's voice from `constants/dialogue/alan.js`. **The user approves
them before release.** They're kept apart from the `/meet` dialogue files.

### 4.4 UI

The dialogue box and buttons match the bot's composited style in
`imageComposition.js`: same fonts from `assets/fonts`, same palette. Layout
works in portrait, so the character stays on screen on phones. The status line
shows his name, his relationship level and heart bar, and the Spend time
cooldown.

### 4.5 Runtime targets

- One build: plain web page, or Discord Activity when it detects it's in the
  Discord iframe (§6). Only then does it start the SDK and OAuth. Outside
  Discord, data features are off (preview and dev only).
- Discord desktop, web and mobile. Capped at 30 fps on mobile; textures at
  2048 px or less.

---

## 5. Data

### 5.1 API (`/api/activity/*`, in `app.js` or a new `activityRoutes.js`)

| Route | Does |
|---|---|
| `POST /api/activity/token` | exchanges the Discord OAuth `code`, calls `users/@me`, returns the Discord access token for `sdk.authenticate` and a signed session token |
| `GET /api/activity/state?character=alan` | affinity, level, heart bar, hangout cooldown remaining |
| `POST /api/activity/spend-time` | `{ character }` → calls `hangout_spend_time`, returns new state plus `leveledUp` |

Each route except `token` requires `Authorization: Bearer <session token>`.
The `discord_user_id` comes **only** from the verified token, never from the
request body.

### 5.2 `hangout_spend_time(discord_user_id, character_id)` (new migration)

In one transaction:

1. claim the `'hangout'` row in `command_limits`. Fail with `cooldown` and the
   time remaining if it was used within 3h.
2. `affinity = affinity + 1`, `last_interaction_at = now()` in
   `character_relationships` (insert the row if it doesn't exist)
3. return the new and previous affinity

It does **not** touch `times_met`, which counts encounters.

`'hangout'` is its **own** cooldown. It must **not** be added to
`RATE_LIMITED_COMMANDS` in `commandLimits.js`, so the hangout and
`/roam`/`/meet` never block each other. It's one timer across all characters.

Because the check and the write are atomic, double-clicks, two tabs or a
replayed request can't grant twice.

### 5.3 Level-ups

After the function returns, the route runs `levelChange` on the result. If
`leveledUp`, it calls `deliverBondScene(userId, characterId, levelName)`, the
same call site `/roam` uses, so crossing a level from the hangout sends the
bond-scene DM exactly as `/meet` would.

### 5.4 Analytics

Each Spend time logs to `command_usage_log` and `character_engagement` with
command `'hangout'`. Opening the Activity also logs `'hangout_open'`, for
usage tracking only.

---

## 6. Discord Activity setup

- Enable Activities on the existing application (`APP_ID`).
- Register `/hangout` as the **entry-point command**, in `commands.js` /
  `npm run register`.
- **Owner-only until release (milestone 4).** The way in is `/encdev hangout`,
  which answers with `LAUNCH_ACTIVITY`. `/hangout` still has to be registered
  (Discord rejects a bulk overwrite with no entry point once Activities are
  on) but is hidden with `default_member_permissions: "0"`, and
  `POST /api/activity/token` refuses anyone but `OWNER_DISCORD_ID` (403), so
  someone joining the owner's session sees a refusal line, not the scene.
  Release flips `OWNER_ONLY` in `activityRoutes.js` and drops the hiding.
- **Version (added 2026-10-30).** `/encdev hangout version:v2` launches the
  Live2D proof (`activity/src/hangout-v2/`, rig `assets/live2d/<id>/rig.json`)
  instead of the sprite rig. `LAUNCH_ACTIVITY` can't pass it to the page, so
  the handler records it per user in memory (10 minutes) and the Activity
  reads it after sign-in from `GET /api/activity/launch` (Bearer session);
  anything else is v1. v2 loads Cubism Core from
  `/assets/live2d/vendor/` and its code as a separate chunk, only for a v2
  launch. `?version=v2` does the same in a plain browser.
- **URL mappings** in the Developer Portal: `/` → the Railway app (serving
  `activity/dist`), plus `/api` and `/assets`. The client loads nothing from
  third-party CDNs; PixiJS is bundled by Vite.
- Client flow: `new DiscordSDK(APP_ID)` → `ready()` → `authorize({ scope:
  ['identify'] })` → `POST /api/activity/token` → `authenticate()`.
- New env vars: `DISCORD_CLIENT_SECRET`, `ACTIVITY_SESSION_SECRET`. Add both
  to `.env.sample` and Railway.
- Session tokens are short-lived (1h) and signed, and are sent as Bearer
  headers rather than cookies, since cookies are unreliable in the iframe.
- Local Discord testing goes through the existing ngrok setup.

---

## 7. Layout in the repo

```
activity/
  index.html          # Activity entry (Vite)
  preview.html        # milestone-1 rig preview (dev only)
  src/
    main.js           # Activity entry: the scene + Discord sign-in
    rig/              # rig.json loader, renderer, motion, expressions
    hangout/          # scene (shared by both pages), hotspots, annoyance meter, dialogue box, Spend time
    preview/          # the preview's debug drawer, HUD and editor
    discord.js        # SDK init + auth (no-op outside Discord)
  tools/
    new-rig.js  slice-atlas.js  register-head.js  fit-outfit.js
    match-hands.js  align-hands.js  build-sprite-skin.js  check-rig.js
    render-rig.js  probe-rig.js  build-overlays.js  build-portrait-hair.js
    live2d-convert.js  live2d-rig.js   # Hangout v2 models (§3.6)
    lib/              # render (node-canvas, rig/fit files), match (template fits), png, skin-config
  vite.config.js
assets/rig/alan/
  source/  overlays/  hair/  rig.json  checks.json
  academy/  roomwear/   # parts/ skin/ derived/ parts.json fit.json fits.json
constants/hangout/alan.js
db/migrations/035_hangout.sql
activityRoutes.js
docs/hangout-activity.md
```

Express serves `activity/dist` (built at deploy) at `/`; built files sit
under `dist/static/` so they never collide with the repo's `/assets`.
`npm run build:activity` is added to the Railway build.

---

## 8. Milestones

1. **Rig preview (browser only).** Slice, `rig.json`, mood resolution
   (atlas first, then overlays), all idle motion, the arm chains, hotspots, annoyance meter, and the preview page with debug
   controls and the editor. No Discord, auth or data.
   **Gate: the user signs off on the rig in the browser.**
2. **Activity shell.** Discord detection and SDK, `/hangout` as the
   entry-point command, the token route, URL mappings, the Railway build. The
   rigged Alan running inside Discord on desktop and mobile.
3. **Affinity.** Migration with `hangout_spend_time`, the state and spend-time
   routes, cooldown UI, level-up handling, analytics. The user approves the
   drafted lines.
4. **Release.** Private, unlisted, on the bot's servers. Update the
   affinity-source rule in the two specs named in §0.

---

## 9. Testing

`node --test` in `test/`:

- `hangout_spend_time`: a first grant succeeds; a second within 3h returns
  `cooldown` and leaves affinity unchanged; concurrent calls grant once;
  `times_met` is unchanged; a missing relationship row gets created.
- routes: reject missing, bad or expired tokens; ignore any user id in the
  body; spend-time returns `leveledUp` across a level boundary and triggers
  `deliverBondScene`.
- `'hangout'` doesn't affect `/roam`/`/meet` cooldowns, and they don't affect
  it.
- the `rig.json` loader rejects unknown parents, cycles and missing images.

**Manual visual checklist** (preview, then Discord desktop and mobile):

- no visible seams at shoulder or elbow through the full arm range
- overlays aligned and sharp at every head angle
- blink and hair read naturally
- the annoyance meter triggers and recovers as expected
- portrait layout correct
- holds 30 fps on a mid-range phone

---

## 10. Open questions

Not decided during the design review. These are defaults until someone says
otherwise.

- **Banked cooldown resets** from missions (`mission_log`): v1 does **not**
  apply them to `'hangout'`.
- **PM backgrounds**: v1 always uses `Vagastrom_Alan_Room.png`. Switching to
  `_PM` by `TZ` time of day is an easy add.
- **Outfit**: Alan has academy and roomwear rigs; the preview switches
  between them. Which one the Activity shows (fixed, or following the
  uniform/casual choice used by `/meet`) is for later. Once `/meet` moves
  into the Activity, the outfit follows the background (§11.5).

---

## 11. Future: `/meet` as the Activity

Status: **specced, deferred.** Not built until every character has a rig
(§11.6); until then `/meet` stays the image message it is now. Designed
2026-10-28, settled 2026-10-29.

Once the roster is rigged, picking a character in `/meet` opens the Activity
with them, and the encounter plays out there instead of as a composed image
with buttons. `/roam` doesn't change.

### 11.1 Launch and access

- **`/meet` itself doesn't change.** It shows the same ephemeral message with
  four names: errand targets seeded in, boost labels, the invoke throttle
  and the cooldown check, all as today (`buildMeetPickMessage`).
- **Clicking a name opens the Activity.** The `meet:pick` click answers with
  `LAUNCH_ACTIVITY` (Discord allows it on button clicks) instead of
  composing the image.
- **The picker greys out after a pick**, as today: one encounter per `/meet`
  message. A launch answer can't update the message, so the bot edits it
  right after the launch. Discord's docs don't say whether that edit is
  allowed after a launch: **test it.** If it isn't, the server enforces it
  anyway: a second name on an already-picked message gets a short "already
  picked" reply, not a second encounter.
- **Cooldown is also checked at the click.** A name clicked on an older
  `/meet` message after the user has already answered (cooldown stamped)
  doesn't launch: the message shows the cooldown text and its buttons grey
  out, like today's `/meet` cooldown reply. Nobody on `/meet` cooldown gets
  into the Activity.
- **Older pickers still work, as today.** Two `/meet`s a minute apart (the
  invoke throttle allows the second after 1 minute) each give their own
  encounter, and a name clicked on either launches with that character.
  Only the first answer pays (§11.3).
- **No `/hangout`.** It was for testing only. Discord's built-in "Launch"
  entry-point command can't be removed (a bulk command overwrite without it
  fails with error 50240), so it's set to `APP_HANDLER` and behaves exactly
  like `/meet`: same cooldown check, same picker, same `meet` invoke
  throttle, so it can't be used to get around it.
- **Shared instances.** Everyone in a channel joins one Activity instance;
  Discord can't restrict who joins. Each user signs in separately and sees
  **only their own encounter**. Someone in the instance with no encounter of
  their own (or on cooldown) sees a refusal line and nothing else: no
  character, no touch spots.

### 11.2 The encounter

Each click saves its encounter on the server: background → outfit →
dialogue variant → beat (§11.5), plus the mood flag and `beatKey`. The
launch answer is sent with `with_response=true`, which returns the
Activity's instance id, so the server ties each launch to the click that
caused it and the Activity loads that encounter.

In order:

1. **The intro.** The line today's `/meet` message carries ("Alan Mido
   agrees to meet you at **The Pit**.") shows as italic narration with no
   name plate, with the mood notice (`moodNotice`) under it on mood beats.
2. **The beat.** The drawn beat's `line` under the character's name plate.
3. **Four response buttons.** The four choices (kind / playful / bold /
   neutral, in `RESPONSE_TYPE_ORDER`) stack above the box with the beat's
   labels, within the 30-character limit (the same pools `/roam` uses).
   - **Type indicator.** The `RESPONSE_STYLES` colors (kind green, playful
     blurple, bold red, neutral grey) as each button's edge, plus a small
     glyph per type so the type never depends on color alone.
4. **The pick.** The choices close and the answer route runs (§11.3).
5. **The face.** The rig plays a mood for the outcome (love / like / flat,
   from `getAffinityForResponse`), set per tier like the touch reactions in
   §4.2. Flat never reads as hurt; it's "didn't resonate".
6. **The reaction line.** The `getReactionLine` line from
   `constants/reactions.js`, the same one `/roam` and `/meet` print today
   ("That lights them up."), in italics with no name plate, since it's
   narration.
7. **The gain.** The same delta line `/roam` and `/meet` use today:
   `+2 — 🤝 **Friend**`, with the boost suffix and the errand signature line
   when they apply. A neutral pick shows `+0` the same way. A level-up sends
   the bond-scene DM as usual. The bot also tries to edit the `/meet`
   message to show the result, so Discord keeps a record like the image
   flow does; if Discord doesn't allow the edit after a launch, it's
   skipped.
8. **The hangout carries on**: touch spots, Spend time and the secret button
   (§11.4).

**Touches before answering.** Touch spots, Spend time and the secret button
work any time. Before the answer, each one plays its reaction, mood and
line, then the VN box returns to the beat's `line` and the four choices
reappear. Nothing leaves the player without the choices while the answer is
unrecorded.

**Exiting before answering** costs nothing, like walking away from today's
`/meet`: nothing is recorded, that picker is spent (its names are greyed
out), and the next encounter is a new `/meet`.

**Long visits.** The encounter waits as long as the Activity stays open; it
has no timer. The session token (1h, §6) only matters until the answer is
recorded, so while an answer is pending the Activity renews it before it
runs out. If a renewal fails, the four choices stay up with a "try again"
line; nothing is lost. Once the answer is recorded nothing else calls the
server, so leaving the Activity open afterwards doesn't matter.

### 11.3 Affinity: one payout per cooldown

The answer to the four choices is the **only** affinity source in the
Activity, behind the same two guards `/meet` has today:

- **Invoke throttle** (`claimCommandInvoke`, in memory): stops rapid
  rerolling of the picker. Unchanged, since typing `/meet` is unchanged. The
  answer route calls `releaseCommandInvoke` when it commits, as the `resp`
  handler does, and a failed launch releases it too, as a failed pick does.
- **Reward gate** (`claimCommandUse(userId, 'meet')`): one atomic
  decide-and-stamp of the 3h cooldown. The answer route calls it, then runs
  `buildResponseResultMessage`'s logic: boosts, `recordResponse`,
  `recordAnsweredBeat`, errand signature. Whichever encounter is answered
  first pays; any other open encounter answered afterwards gets the
  cooldown refusal, exactly like clicking an older message's response
  button today.

The saved encounter is never trusted from the client: the Activity is a
browser page the user can edit, so the mood flag and `beatKey` stay on the
server (a forged mood flag would raise the gain). Answering deletes the
encounter, so it can only be answered once. Double clicks, two tabs and
replayed requests can't pay twice. Unanswered encounters are cleaned up in
the background after a day, as housekeeping (not a gameplay timer).

Touch spots, Spend time and the secret button never call the server, so
there's nothing to farm. **Spend time is unlimited and cosmetic**: a
reaction and a line, no affinity, no cooldown. §5.2's
`hangout_spend_time` and the `'hangout'` cooldown aren't needed for §11,
and the "deliberate rule change" in §0 goes back to `/roam` and `/meet`
being the only affinity sources.

### 11.4 Secret button

Each character has a **fixed, unique secret combo** with no hints in any
line; players find it or share it.

- **Shape:** 2–3 steps, each one touch spot tapped 1–3 times in a row, e.g.
  head ×2 → cheek ×1 → hand ×2. No two characters share a combo.
- **Wrong taps:** a tap that doesn't match the next step resets the combo
  to the start and counts toward annoyance as normal. There's no time limit
  between taps, so slow and gentle works.
- **Annoyance:** taps that match the combo so far don't raise the meter. If
  the character gets upset **at any point during the visit**, the secret is
  locked until the next visit.
- **Once found**, the button appears in the VN box and stays for the rest
  of the visit; pressing it again replays the scene. It's gone when the
  Activity closes, and the next visit needs the combo again. Nothing is
  stored.
- **The scene** is a special line or short exchange written to land the
  character's **fave response type** (a tender scene for a kind-lover, a
  teasing one for a playful-lover…). Cosmetic: no affinity, no milestone.
- Combos and scenes live in the character's hangout data beside the line
  pools (`constants/hangout/<id>.js`).

### 11.5 Background and outfit

**Background.** The same pool `/meet` draws from today, via `turfSpots`
(`constants/backgrounds.js`): the character's house, their exclusive room
and `additionalLocations`, plus signature spots weighted up (Alan: The Pit
×1.5) and pinned in when they sit outside the house. `_PM` files only in
the evening, at `EVENING_PM_WEIGHT`. A houseless character (Benkei) keeps
`/meet`'s `TURF_PROBABILITY` split between his signature spot and a general
location. This replaces §10's fixed `Vagastrom_Alan_Room.png` for `/meet`.

**Outfit.** The uniform/casual draw (`getImageVariant` and the
`CASUAL_IMAGE_PROBABILITY_*` curve) doesn't apply. The outfit comes from the
rig's `outfits` and **fits the background**:

- each outfit in `rig.json` lists the backgrounds it can appear in
  (location keys, or files for a single spot), e.g. Alan's `roomwear` in
  his room, `academy` in the Vagastrom garage spots and The Pit;
- the background is drawn first, then one outfit at random among those
  that allow it.

**Dialogue variant.** The variant still keys dialogue (Jo's pronouns change
between uniform and casual, `constants/dialogue/_shared.js`), so each
outfit names the variant it counts as (`dialogueVariant: "uniform"` or
`"casual"`). The beat is drawn last, so it always matches what the
character is wearing.

**Placement.** One framing per character (`rig.json` `stage`), the same on
every background; only the background pans behind them. No per-background
framing.

**Loading.** The Activity loads only the drawn outfit's images, not every
outfit's, so it opens faster on phones.

### 11.6 When §11 starts

Every character has a rig, **and** their outfits between them cover every
background `/meet` can put them in. A test checks it for the whole roster,
so no character can land somewhere with nothing to wear.

**Writing comes last**, after all the rigs exist: touch reaction lines per
tier, secret scenes and combos, drafted one character at a time from their
reference file (voice-check workflow) and approved by the user, like §4.3.

### 11.7 Fallback and operations

- **Fallback by timeout.** Discord tells the bot nothing when a launch
  fails. If the Activity hasn't loaded the encounter within ~30s of the
  click, the bot posts today's `/meet` result (image + four response
  buttons) as a followup, and that encounter is answered the normal way.
  Once the Activity has loaded the encounter, the fallback is cancelled;
  taking your time afterwards never triggers it. If the image does arrive
  and both get answered, only the first pays (same reward gate). Depends on
  followups working after a launch: **test it.** If they don't, the backup
  is a manual way to ask for the message version from the picker.
- **`/meet`-only off switch.** A column in `app_settings` (the table
  maintenance mode uses, db/migrations/024), flipped by hand in SQL and
  cached for 60s like `maintenance.js`. When on, clicking a name gives
  today's image flow for everyone; the rest of the bot keeps running. Unlike
  maintenance mode, which takes the whole bot down. One small migration, no
  redeploy to flip it.
- **Analytics.** Completed `/meet`s log to `command_usage_log` as `'meet'`
  as today, tagged with the path (`activity` or `fallback`), to see how
  reliably the Activity opens.

### 11.8 Open questions

- **Secret scene by tier**: one scene per character (the default), or three
  versions in the `reactions.js` bands (early / mid / deep), each in the
  fave type's register.
