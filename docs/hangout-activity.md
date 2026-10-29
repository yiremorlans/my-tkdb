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
      "pivot": [0.5, 0.92],            // normalized; rotation centre
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
    "sway":    { "speed": 0.12, "amount": 2.5 },
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

**No arm gesture, no body poses (decided 2026-10-28).** Both were built and
cut after review: the rigid forearm lift read as unnatural, and full-body
poses cut from screenshots didn't match the rig or move. The body stays
nearly still (minimal breath, slight head sway, no hair sway) and reactions
are carried by expressions and lines. Genuinely fluid motion would need a
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
  `alan_academy.png`, then export changed values back into `rig.json`

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
   confirm. `lines` binds a line-art layer to its fill. Rerunning it on
   Alan reproduces rig.json byte for byte (academy is pinned to its
   refined values and reports how close the search lands).
5. **`match-hands.js <character> --outfit <new> [--from <outfit>] [--set <set>]`**:
   names hand poses by silhouette against an existing outfit's (or set's),
   and flags poses with no counterpart (roomwear has no "open").
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
8. **`render-rig.js`** for a side-by-side with the reference.

---

## 4. The Activity

### 4.1 Idle motion

| Motion | Implementation |
|---|---|
| Breathing | torso/shoulder scale on a slow sine |
| Blink | randomized interval around `meanInterval`, ~120 ms close |
| Head tilt/sway | `head` rotation, two mixed sines, within limits |
| Hair | 2–4 grouped locks, rotation lagging the head |
| Arms | small sway in step with the breath |

### 4.2 Interactions

| Trigger | Reaction |
|---|---|
| Head pat | smile, then blush ~0.4 s later; no head movement (a moving flat head read as unnatural) |
| Cheek poke | surprise + blush |
| Hand tap | smile |
| Spam-tapping | annoyance meter rises with fast repeated taps and decays over time; past the threshold → **upset** + a line ("…stop that."), taps ignored briefly, then he settles |
| **Spend time** | full smile + blush, a special line, +1 affinity (§5) |

Hotspot reactions are cosmetic, unlimited and local, with no server call.
Every reaction plays the line for that trigger in the dialogue box.

The Spend time button is lit only when the cooldown is ready. Otherwise it
shows the time left, and pressing it plays a cooldown-not-ready line.

Starting values for the annoyance threshold and decay go in `rig.json`
(`annoyance: { perTap, decayPerSec, threshold, recoverSec }`) and get tuned in
the preview.

### 4.3 Lines

`constants/hangout/alan.js`, one pool per trigger: `headPat`, `cheekPoke`,
`handTap`, `upset`, `spendTime`, `cooldownNotReady`, `greeting`. Claude drafts
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
    match-hands.js  build-sprite-skin.js  check-rig.js  render-rig.js
    build-overlays.js  build-portrait-hair.js
    lib/              # render (node-canvas), match (template fits), skin-config
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
  uniform/casual choice used by `/meet`) is for later.
