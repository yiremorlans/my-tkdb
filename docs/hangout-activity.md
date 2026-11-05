# Spec: Hangout — Live2D Discord Activity

Status: **released 2026-10-31.** The Activity runs for everyone in Discord
on the Live2D rig, and every `/meet` pick opens it (§11; migration 035
before deploy, then `npm run register` to un-hide the entry point).
`OWNER_ONLY` in `activityRoutes.js` stays as the switch back.
Last updated: 2026-11-01

**Dates (§12)** were designed on 2026-11-01 and aren't built yet: a
three-beat date in this Activity, started from the `/meet` picker (entry
point not designed yet; the `/call` scene's date button went with call scenes
on 2026-11-04).

A new home for `/meet`; `/roam` stays exactly as it is. The Hangout is a **solo, private Discord Activity** where a character —
Alan first — idles in their own room as their **Live2D model**, the same
one the game uses. The user taps him for reactions and lines. It is becoming
the `/meet` interaction (§11): the encounter plays out in it, and answering
that encounter is its only affinity source (§11.3).

The rig is the game's own model, pulled from its cache and converted back to
Cubism files (§3), rendered with PixiJS and a Cubism plugin. Nobody rigs by
hand: the only hands-on step is tuning a character's `rig.json` (touch
spots, moods, reaction poses) in a dev-only preview (§3.4).

**Rig history.** The Hangout was first built on a code-rigged sprite (v1):
atlas parts on a bone hierarchy, nearly still by design. The Live2D models
replaced it as the rig on 2026-10-30, and v1 was deleted on 2026-11-04 (§8).

Launched by picking a name in `/meet`, or from the Activity's `launch`
entry-point command, which answers like `/meet` (§11.1). Private and unlisted: the bot's own servers
only, no App Directory listing, no monetization.

---

## 0. Relationship to other specs / shared infra

| Shared piece | Where it's defined | Used here for |
|---|---|---|
| `claimCommandUse`, 3h `COOLDOWN_MS` | `commandLimits.js`, `db/supabase.js` | the `/meet` reward gate on the answer (§11.3) |
| `levelChange`, `deliverBondScene` | `storage.js`, `bondScenes.js` | level-ups from the `/meet` answer fire the same bond-scene DM (§11.2) |
| `character_relationships` | `db/SCHEMA.md` | the affinity the `/meet` answer writes |
| `command_usage_log`, `character_engagement` | `db/SCHEMA.md` | analytics: `'meet'` for answers (§11.7), `'hangout_open'` for opens (§5.2) |
| `CHARACTER_ROOMS`, `backgroundPath` | `constants/backgrounds.js` | the room background (`Vagastrom_Alan_Room.png`) |
| Dialogue box look, fonts | `imageComposition.js`, `assets/fonts` | the Activity's UI styling (§4.4) |
| Alan's voice | `constants/dialogue/alan.js` | reference for drafting hangout lines (§4.3) |
| `DATE_LOCATIONS`, `assets/bg/date/` | `constants/backgrounds.js` | the date spots (§12.4) |

**Affinity sources.** [`bond-scene-dms.md`](./bond-scene-dms.md) and
[`scheduled-missions.md`](./scheduled-missions.md) both state that `/roam` and
`/meet` are the only things that move affinity. The Hangout keeps that rule:
it moves affinity only as `/meet`, through the answer (§11.3). Touches are
cosmetic. Dates (§12) are the second source: their answers pay, through
their own guard, not `/meet`'s.

---

## 1. Goals and non-goals

**Goals**
- A rigged character that feels alive with minimal movement — the rig is the
  main attraction.
- A data-driven pipeline: adding another character is new data files
  (the converted model, `rig.json`, lines), not new code.
- Reads and writes the existing tkdb data through the server, never directly
  from the browser.

**Out of scope for the first release**
- Shared multiplayer rooms (everyone in the voice call seeing the same
  character). The release is solo per user.
- Store-credit gifts, voice-driven lip sync (the mouth only flaps while a
  line types), cursor/eye tracking, walking, and motion the game's models
  don't have.
- Picking a character inside Discord: the Activity opens Alan until §11
  routes `/meet`'s pick into it. Other characters' rigs load in a plain
  browser with `?character=<id>`.
- Public listing.

---

## 2. Source art

| File | What it is | Role |
|---|---|---|
| The game's model bundle per character and outfit (`dialogueactors_assets_<name><outfit>_<hash>.bundle`, from the game's cache) | The Live2D model the game's dialogue scenes use: moc3, textures, physics, expressions, pose clips | converted into `assets/live2d/<id>/<outfit>/` (§3.5) |
| `assets/bg/vagastrom/Vagastrom_Alan_Room.png` | Alan's room | background |
| `assets/live2d/alan/sfx/*.wav` | Alan's reaction sounds | sounds (§4.2) |

**Rights.** This is Tokyo Debunker art, and the rig is the game's own model
files, extracted from its cache. Keeping the Activity private and unlisted
is what makes using it acceptable for now; going public waits on confirming
rights.

---

## 3. Rig pipeline

A character's rig is the game's own Live2D model for each outfit, converted
back to Cubism files, plus a `rig.json` that maps the Hangout's touch spots,
moods and reactions onto it. The model breathes, blinks, idles and runs its
physics itself; the Hangout only layers moods, reaction poses and talking on
top. Tooling lives in `activity/tools/` and runs with Node. Output goes to
`assets/live2d/<character>/`: one folder per outfit with the Cubism files,
and one `rig.json` for the character. The game's models share one 2000×2800
canvas, which is every rig's reference space.

### 3.1 `rig.json`

`activity/src/hangout/live2dRig.js` documents the format (including each
outfit's `dialogueVariant`, §11.5) and `validate.js`
checks it, in the browser on load and in
`test/hangout-rig.test.js` against every rig on disk. Alan's, trimmed:

```jsonc
{
  "character": "alan",
  "reference": { "width": 2000, "height": 2800 },    // the model canvas
  "background": "../../bg/vagastrom/Vagastrom_Alan_Room.png",
  "stage": {                                          // framing, per orientation
    "landscape": { "top": 66, "bottom": 1276, "centerX": 1000 },
    "portrait":  { "top": 85, "bottom": 1667, "centerX": 1000 }
  },
  "defaultOutfit": "academy",
  "outfits": {
    "academy": {
      "model": "academy/alan_academy.model3.json",
      "dialogueVariant": "uniform",                   // the /meet variant roll it answers to (§11.5)
      "parts": { "vest": ["ArtMesh134"], "pants": ["pants_R", "pants_L"] },
      "hotspots": { "chest": { "part": "vest", "rect": [0.18, 0.02, 0.82, 0.4] } }
    }
  },
  "parts": {                                          // id → Live2D drawable ids
    "face_base": ["FaceSkin"],
    "mouth": ["ArtMesh71"]
  },
  "hotspots": {
    "lips": { "part": "mouth", "rect": [-0.25, -2, 1.25, 3] },
    "head": { "part": "face_base", "rect": [0, -0.45, 1, 0.3] }
  },
  "expressions": {
    "fade": 0.2,                                      // crossfade, seconds
    "moods": {
      "smile": ["e_egao_00"],
      "smile_blush": ["e_egao_00", "e_sekimen_00"],   // stacked
      "upset": ["e_ikari_00", "e_ase_00"]
    }
  },
  "reactionPoses": { "headPat": "m_kubi", "upset": "m_angry" },
  "annoyance": { "perTap": 1, "decayPerSec": 0.9, "threshold": 5, "recoverSec": 4 },
  "motion": {
    "idle":   { "amount": 0.35 },                     // share of the idle clip's sway kept
    "breath": { "amount": 0.5 },
    "bgPan":  { "speed": 0.022, "amount": 0.01 }
  },
  "sounds": { "headPat": "../../rig/alan/sfx/alan_default_1.wav" }
}
```

- **Parts and hotspots.** A part is a list of the model's drawable ids; a
  hotspot's `rect` is normalized to the combined bounds of the part's
  visible drawables, read every tap, so it follows the art through poses.
  Outfit `parts` and `hotspots` merge over the shared ones (the body
  differs per outfit; the face doesn't).
- **Outfits.** Each outfit names its `model3.json`; `defaultOutfit` picks
  the one shown first. Which outfits each character gets is tracked in
  [`live2d-outfits.md`](./live2d-outfits.md): academy plus one of
  city / casual / work / roomwear.
- The model's own poses carry the hands; there's no skeleton, hand poses
  or blink timing in rig.json.

### 3.2 Expressions

Each mood is a stack of the model's own expression files (`exp3`), added
together and crossfaded over `expressions.fade`. A mood a reaction
names (§4.2) but the rig lacks shows `default`, and the validator lists it
as a warning rather than a failure. **Upset** is `serious` +
`sweat` where the model has no anger expression of its own.

Between reactions he rests on `default`, or on `restMood` (a mood, or
`{ "byTier": { … } }` taking the nearest lower tier's): Yuri rests
`serious` at new and known, `default` from warm.

### 3.3 Reaction poses

`reactionPoses` maps a reaction (§4.2) to one of the model's pose groups.
A pose plays like the game's own Animator: the pose clip, then its looping
`*_hold` clip (the converter writes it, pinned at the clip's last frame),
then after `POSE_HOLD` (2.5 s) its `*_return` clip. Like a reaction, a pose
can vary by tier: `{ "byTier": { "new": "m_odoroki", "spark": "m_wink" } }`
takes the nearest lower tier's entry, so a clip that carries its own face
(Rui's wink) waits for the tier whose face suits it. A reaction with no pose
is carried by the face, the line and the sound alone.

### 3.4 Preview and tuning

`activity/hangout.html`, local only (never built or deployed): the scene
over the character's room, plus a debug drawer with every mood, reaction,
touch spot and pose, the relationship tier, and a hotspot overlay.
`?character=<id>`, `?tier=<tier>`, `?pose=<group>`, `?room=0` (no room),
`?mobile=1` (30 fps cap). Rigs are tuned by hand in rig.json against it.

### 3.5 Pipeline tools (any character, any outfit)

Order for a new character or outfit:

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
   frame of every pose that has a `*_return`, model3.json, and the model's
   manifest (`<base>.manifest.json`: expression deltas, clip lengths and
   what the idle moves, so the rig loads one file instead of ~70; see
   `hangout/manifest.js`). After editing a motion or expression file by
   hand, `live2d-manifest.js <character>` rebuilds it; a test fails while
   one is stale. Files are
   `<character>_<outfit>.*` after the repo's ids. `--assets` takes an
   export made by hand. Converting Alan's bundle reproduces his committed
   files.
4. **`live2d-rig.js <character>`**: rig.json from Alan's as a template.
   Hotspot parts are picked from the model's part tree at rest (face skin,
   PartMouth, PartEar, the lowest arm pieces, the biggest torso piece, the
   legs), the stage is Alan's framing shifted to the face, moods and
   reaction poses are mapped onto the expressions and clips this model has,
   and the background is the character's room. The outfit gets a `dialogueVariant` (uniform for
   academy, casual otherwise; §11.5). It reproduces the academy rigs it wrote (2026-10-30) byte for
   byte, apart from Benkei, Elias, Jo and Shion's hand-tuned ears.

   It writes a fresh rig.json with only the one outfit, so for a
   character's **second outfit** run it with `--dry-run` and merge the
   new `outfits.<outfit>` entry by hand. Outfit `parts` merge over the
   shared ones, so where the second model's face, mouth, ear or hand
   drawables have different ids (Jo's femacademy), they go in the outfit's
   own `parts`. The shared moods and reaction poses are checked against
   every outfit's model, so each expression and pose they name must exist
   in both (Jo's annoyed/upset moved from `e_ikari_00` to `e_komari_00`,
   which femacademy has). The preview has no outfit picker: it shows
   `defaultOutfit`.
5. **Check it** in `hangout.html?character=<id>` with "show hotspots",
   and tune rig.json by hand where the picks are off.
6. **Validate:** `node --test test/hangout-rig.test.js`.

Every character has an academy model (2026-10-30; Benkei's is his
default bundle, `benkei_`). Second outfits so far: Benkei `work`
(`benkeiapron`), Jo `femacademy` (`jofemacademy`), Mio `work` (`miowork`)
and Ren `roomwear` (`renroomwear`)
([`live2d-outfits.md`](./live2d-outfits.md)).
---

## 4. The Activity

### 4.1 Idle motion

The model animates itself; rig.json only scales how much of it shows.

| Motion | Implementation |
|---|---|
| Idle | the model's own idle clip, its sway scaled by `motion.idle.amount` (0–1) |
| Breathing | the model's `m_breath` clip on its own layer, driving `ParamBreath` only so it never undoes a held pose; scaled by `motion.breath.amount` |
| Eased parameters | `motion.ease` maps a parameter id to the seconds a full change takes; the rig ramps it toward whatever the clips want, before physics (Lyca's ears, `ParamBeastEarOnoff`, rise over 0.2s instead of the clips' 0.1s fade) |
| Blink, hair, physics | the model's own (eye blink and physics3), not set per rig |
| Head/body sway | the Cubism plugin's own sway, which the game doesn't use: off unless `motion.sway.amount` is set |
| Talking | the mouth flaps while a line types out (~7 syllables/s) and settles shut after it, or at once when the box is clicked to finish the line; no audio |
| Background pan | the room (not the character) drifts on a slow wandering path, two mixed sines; `motion.bgPan` sets `speed` (cycles/s, default 0.022) and `amount` (fraction of the screen, default 0.01); the room is scaled up by twice `amount` so its edges never show; nothing to pan when no room is drawn |

### 4.2 Interactions

Every touch face is a **mood named per tier**: `DEFAULT_REACTIONS` in
`activity/src/hangout/reactions.js` sets the shared defaults, a rig's
`reactions` override them, and each mood is the rig's own set of Live2D
expressions (`expressions.moods`). Poses are separate (`reactionPoses`).
(Until 2026-11-04 a reaction could give a `rank` instead, picked off the
call scenes' PNG face ladder. Every rank was replaced with the mood it
resolved to, with no visible change, and the ladder was deleted.)

| Trigger | Default register | Alan (new/known · warm · spark · close/bound) |
|---|---|---|
| Head pat | welcome | close · surprise_blush · smile_blush · full_smile_blush; pose `m_kubi` |
| Hand tap (L/R) | welcome | close · surprise_blush · smile_blush · full_smile_blush |
| Cheek poke | friendly | sweat · surprise · surprise_blush · full_smile |
| Ear (L/R) | guarded, softens from spark | serious · serious · surprise_blush · full_smile_blush; as sensitive as the belly; three taps fill the annoyance meter |
| Lips | guarded, softens from spark | serious · serious · surprise_blush · full_smile_blush; very guarded, not aggressive: second only to the hips; pose `m_pocket` at new–warm, `m_kubi` from spark, `m_migikoshi` from close; two quick taps fill the annoyance meter |
| Chest | guarded, softens from spark | serious · serious · surprise_blush · full_smile_blush; the least sensitive guarded spot; four taps fill the annoyance meter |
| Belly | guarded, softens from warm | serious · surprise · surprise_blush · full_smile_blush; as sensitive as the ears; three taps fill the annoyance meter |
| Hips | guarded, softens from spark | the most guarded spot: serious at new/known/warm, blush only from spark; pose `m_udekumi` (arms crossed) at new–warm, `m_kubi` from spark, `m_migikoshi` from close; flinches hardest of every spot at new/known; two taps fill the annoyance meter |
| Spam-tapping | — | annoyance meter rises with fast repeated taps and decays over time; a run of quick normal taps fills it, fewer taps the more sensitive the spot (`SPOT_ANNOYANCE`: head = hands < chest < ears = belly < lips < hips). The more sensitive the spot, the longer its face holds too; past the threshold → **upset** + pose `m_angry` + a line ("…stop that."). The upset face holds until its line has typed out plus `UPSET_READ` (2.5s), or its `duration` or pose if longer, then eases into the next face over `SETTLE_FADE` (1.6s, smoothstepped) instead of the 0.2s crossfade, as every reaction's face does (a reaction's `fadeOut` overrides it; a face that shuts the eyes or swaps the eye art, such as a full smile, a wink or Ren's `e_shock_00`, fades back over 0.25s instead, and leaving a tongue or open grin, such as Taiga's `e_pero_00` or his big grin `e_choshi_02`, just the mouth does, for every rig: live2dRig.js `SNAP_BACK`). At new, known and warm (`LOCKOUT_TIERS`) he then locks out: once the upset face ends he holds his `guarded` face (rig.json `expressions.moods.guarded`, a face he can hold indefinitely: no sweat, no open mouth; set where his upset isn't a stronger `serious`), else `serious`, and a guarded pose (rig.json `reactionPoses.guarded`, else `m_udekumi`, else his upset pose; Edward's is `m_weak`) and ignores every tap until the tier changes. From spark, taps are ignored briefly, then he settles |

Every character has the same touch spots (`TOUCH_SPOTS` in
activity/src/hangout/reactions.js): head, cheek, lips, ear_l/ear_r,
hand_l/hand_r, chest, belly, hips. Left and right share one reaction; every other
spot has its own. The rungs per tier live in `DEFAULT_REACTIONS`. A
reaction also plays the pose rig.json `reactionPoses` gives it (§3.3); the
poses above are Alan's, and each character's are mapped onto the clips
their model has. The preview's
"Touch spots" row plays each spot.

#### Gestures (designed 2026-11-01, not built)

Besides taps, two gestures. Each has its own line pool (§4.3), and its face
and pose come off the same tier ladder as the spot it's on.

- **Stroke**: a drag across the **head** or **cheek** (`headStroke`,
  `cheekStroke`). Works in **every Hangout, at every tier**, on the spot's
  own rung (head 2, cheek 1). It's gentler than poking: a stroke adds
  **half** a tap's annoyance (`SPOT_ANNOYANCE` × 0.5).
- **Hold**: pressing and holding a spot for **0.6s+**. Holds are
  **date-only** (§12): `handHold` (hand) and `lipHold` (lips). Outside a
  date a long press is an ordinary tap. A date always runs at `close` or
  `bound`, so holds are written for those two tiers only and never need a
  guarded or lockout path. On a date they raise **no annoyance**.
  - `lipHold` is the **most intimate** gesture, above the hips on the
    sensitivity ladder, so its face holds the longest.
  - `handHold` carries Jin's stigma resonance (it only works holding the
    MC's hand) as his canon payoff.
  - Touch-averse characters (Yuri, Rui, Lyca, Ren, Subaru) read flustered,
    never upset; Zenji's lines answer the intention, never the contact; Rui
    wants what his curse refuses.
- **Hold feedback (preview prototype, 2026-11-01).** A held spot shows two
  faint rings per heartbeat under the finger. A chest (heartbeat) hold also
  shows a heart monitor: a beating heart, a scrolling ECG trace and his bpm,
  docked on the dialogue box's top edge beside the annoyance meter. Nothing
  goes at the stage's top, which Discord's Activity chrome covers.
- **Heartbeat check (preview prototype, redesigned 2026-11-02).** Warmth is
  built from taps and strokes; the chest hold reads it and adds none. He
  acts cool (a glance down at the touch, then his own eyes, never
  tease's soft lowered look; even breathing, closed lips, a faint flush)
  while the monitor gives him away. The monitor reads his pulse as it
  already is: it runs all the time (rest 60 bpm, plus up to 50 with
  warmth, plus 25 at a crest, lagging like a real pulse: about 1.5s
  rising, 5s settling), so a riled-up character reads high from the
  first beat and a rested one reads 60. The hand on his chest nudges it
  up a little (about +6 as the hold comes in), never a climb from rest. rig.json `heartRate: { resting, scale }` overrides it: Zenji (a
  ghost) and Edward (a vampire) rest at 24 and rise a third as far.
  The beat sways with his breathing (about ±3 bpm, faster on the inhale,
  slower on the exhale), so on the trace and rings the beats bunch as his
  chest rises; the number shows the steady pulse.
- **Tease (preview prototype, `bound` only).** From a chest hold,
  drag down (half the chest spot's height, mostly downward) and the hold
  becomes tease, crossfading over 2s from the check (the hold's level
  carries on, and so does a glance in progress): the first heartbeat
  hold's settings (quick deep breath, parted lips, full blush, 1.6×
  warmth) plus, near the top of a long hold,
  bliss: his brows give way and his eyes flutter shut now and then. A
  rig.json `moods.tease` is his face for the whole tease, back to his rest
  face when it ends (Haru's casual only: `e_kaigan_yowaki_00`, a
  hand-made copy of the game's one open-eyed face `e_kewashiikaigan_00`
  with worried brows from `e_kanashimi_00`, softened; academy and house
  have no open-eye art; Tohma: `e_eyesmile_00`, a hand-made
  faint smile in the lower lids only, no mouth or brows, so his serious
  mouth and bliss's given-way brows and heavy lids stay). An outfit's
  own moods go in `outfits.<name>.expressions.moods`, added to the shared
  ones and checked against that outfit's model alone. He
  glances down every 3-6s (straight down, not at the touch), eyes open:
  the heavy lids and flutter lift while he looks down, or on some art
  (Haru's) the eyes vanish. Shy-gaze
  characters (`holdGaze: "shy"`) do too, and still break eye contact
  as on every hold. Their glances away (Kaito, Lyca, Ritsu, Ren,
  Subaru, Yuri; live2dRig.js `SHY_GAZE`, retimed 2026-11-02) come every
  3-5.5s for 1-1.7s, the head turning a few degrees with the eyes, on a
  smooth spring that eases out and back even when cut short; none starts
  while he's glancing at the touch or down, or for 1s after.
  - **Caught tease (`close`).** The same drag down at close is stopped:
    he wants it and doesn't let it happen (close hints, nothing has
    happened yet). He lets it go on 1.2s first (the check carrying on as
    it is, no tease effects); let go sooner and the hold just ends. The
    hold ends on his side with a small flinch and a gasp (his lips part
    for about a second with a hint of surprise, brows up, eyes a touch
    wider; `GASP`), a shy face (a soft smile or
    smirk, flushed: `smile_blush`, or rig.json `moods.caught_shy` where
    that's a grin or shuts the eyes: Haku, Edward, Ritsu, Shion, Tohma,
    Yuri; Subaru and Romeo a blush alone; Haru's casual opens his eyes,
    `e_kaigan_yowaki_00`), a shy head shake ("not right now": a shared
    procedural shake, `HEAD_SHAKE`, two small fading turns with the chin
    dipped and eyes lowered; Towa plays his own `m_shakehead_noloop`
    clip), his `reactionPoses.caughtTease` pose where set, and, 0.6s
    after the gasp so his mouth moves with it, a "not yet"
    line (one per character, placeholder until drafted; Zenji answers the
    intention, Rui wants what his curse refuses). The shy face holds 6s,
    or until the line has typed out plus `UPSET_READ` if that's longer,
    then eases back over `SETTLE_FADE`, as every reaction's face does. No bliss, no crest.
    Poses set: `m_kubi` (hand to the neck) for Alan, Jin, Jiro, Lyca, Mio
    and Ren; Kaito `m_tere`, Haku `m_kaote`, Tohma `m_ago1_away` (his signature chin-in-hand), Lucas
    `m_iyagari`. The rest have the shake alone. With a pose, the
    procedural shake plays over it.
  - **Crest and break.** Tease peaks by overwhelming him, never a climax.
    Held on 2.5s past full bliss, a crest builds over 1.5s: his breath
    catches, the blush climbs past its cap into the ears, his eyes squeeze
    shut and his pulse jumps. rig.json `crest.params` sets parameters
    while it's up, popping in at their own `motion.ease` rate and back
    once the comedown is mostly over (`CREST_PARAMS`): Lyca's wolf ears
    pop out (`ParamBeastEarOnoff`). His eyes hold still as it builds: the
    down-glances and a shy gaze's glances away fade out, and the shy
    glances stay off through the comedown. 0.8s later he breaks away: the hold ends on
    his side, he flinches back into his bound `chestTouch` pose with an
    open-eyed `surprise_blush` face (some chestTouch faces close the eyes;
    rig.json `moods.break_away` replaces it, open-eyed: Tohma's sly eyes,
    flushed),
    and says a break line (one per character, drafted from his reference
    file; a placeholder until then). His squeezed eyes open at the break
    (0.5s); the rest of the comedown is slow: the crest's caught breath and
    deep blush ease off over 8s, the hold's blush, breath and bliss over
    16s (a hold's usual is 4s), all falling together so the given-way brows
    don't drop out ahead of the flush; his parted lips close sooner, over
    3s, his heavy lids (and the flutter) lift over 4s, and he stops
    glancing down once he breaks away; warmth stays at its cap and
    drifts as usual, and the monitor stays up 20s while his pulse settles.
    No line names tease (a tutorial hint may teach the gesture, 2026-11-05).
  - **Past the crest: bliss (preview only, 2026-11-03).** At bound, once a
    lip hold and a hand hold have both run in this hangout (any order, a
    hold that started counts; no date needed; reset when the tier
    changes), the crest doesn't break him away. He stops at the edge: the
    crest eases back to 0.7 and holds there, the finger can let go, and a
    beating heart shows over his chest for 4s. Taps on him do nothing.
    Miss it and he breaks away as above. Click it and bliss runs. Redone
    2026-11-03 (the first version did too much: a rose vignette, a
    heartbeat sync, heart bursts, a whispered line, all cut). No vignette
    or effects: the camera pushes in on his face over 2.2s (scene.js
    `setPush`: up to 1.45x, his face eased to the upper middle) and stays
    there; the heart monitor stays up. Two steps (holds.js `phase.step`):
    1. **Plead.** The crest's strain lets go (down to 0.15, his squeezed
       eyes open), he stops glancing down, his face goes soft (rig.json
       `moods.bliss`, else `smile_blush`), and the rise (live2dRig.js
       `setRise`) comes up to 0.45 over 2.5s: quicker breath, parted lips,
       heavy lids that flutter shut now and then. He gasps out his bound
       `blissPlead` lines in the box one after another, his mouth moving
       with the words, each after a small gasp (`renderer.gasp`), and
       never the same line twice running; each stays up 4s after it types
       out before the next gasp. While he talks he meets your
       eyes (live2dRig.js `CONTACT`: the heavy lids lift and the flutter
       holds off), then they fall heavy again between lines. Once the first
       line is out, three choices come up (`#bliss-choices`, his
       `blissChoices` labels, one per response type, /meet's glyphs;
       /meet's own choices hide meanwhile) and the lines keep coming until
       one is picked.
    2. **Peak, then the comedown** (seconds from the pick, holds.js
       `PEAK`). The choices go and the box fades. The rise climbs to full
       over 1.4s (his breath at its quickest), his eyes roll back under
       heavy lids over 1.1s (live2dRig.js `setRoll`, `ROLL`: irises up,
       lids lowered, brows lifted, no flutter), and at 2.6s they fall shut
       (the crest's squeeze, the crest itself kept low so his breath
       doesn't catch). At 5s the comedown starts: the rise eases off over
       7s, the roll lets go behind his shut eyes, the camera eases out over
       6s, and his eyes open slowly from 6.5s over 3s.
    At 9.5s the hold falls away as slowly as after the break, warmth
    stays capped, the monitor stays up 20s, and he says a `blissAfter`
    line for the type picked (`blissAfter: { kind, playful, bold }`). The
    pick changes only that line: no affinity. His soft face holds until
    the line has typed out plus `UPSET_READ` (6s at least, plus
    `TEASE_LINGER`), then eases back over `SETTLE_FADE`. The three pools
    are optional (Hangout `pool()` reads the keyed ones) and use shared
    placeholders until drafted per character; Ren's are the first draft.
    No line names tease. Gated by `attachHolds(..., { bliss: true })`,
    which only preview.js passes, so the Activity still breaks away at the
    crest. The drawer's "bliss: mark lip + hand done" and "bliss: jump to
    the edge" skip the setup. Timings live in holds.js `EDGE`, `BLISS`,
    `PLEAD` and `PEAK`.
- **Hold lines (preview prototype, 2026-11-02).** Letting go of a hold
  that ran says one line from that hold's pool in
  `constants/hangout/<id>.js`: `heartbeatHold` (chest), `lipHold` and
  `handHold`, at
  `spark`, `close` and `bound`. The caught tease says a close
  `caughtTease` line and the break a bound `breakAway` line. Tease let go
  before the crest says a bound `teaseLetGo` line (2026-11-02): he was
  close to the edge and you stopped; like every line, it never names
  tease. `bound`
  holds only these pools; its touch triggers fall back to `close`. Towa's
  `daytime` set has the same pools, wordless.
  The line plays with that hold's face (reactions.js `handHold`,
  `heartbeatHold`, `lipHold`: no flinch, the lips face held longest),
  calibrated per character in rig.json `reactions` to the lines and his
  temperament (2026-11-02), and no pose.
- **Hold face arc (preview prototype, 2026-11-03).** The lip and hand holds
  change his face while they run, not only on release (holds.js `ARC`).
  The opening widen is a subtle surprise over his own face (no `flustered`
  step; cut 2026-11-03, it buried the surprise; the shy rigs, `holdGaze:
  "shy"`, keep it, sooner: about 0.5–0.85s in, 2026-11-04), then he settles into that
  hold's release face for the tier: spark 6–8s, close
  4–5.5s, bound 3–4.5s, the lips 1.5s later. Settled, it catches up with
  him now and then (every 4.5–7.5s on the hand, 3–5.5s on the lips): a
  small widen and a puff of two hearts, his face staying settled (it used
  to flicker back to `flustered`, which read as cycling; cut 2026-11-03).
  Moving the finger during the hold sets a flicker off at once (at most
  every 1.5s), or puts off the settle if he hasn't settled. Hearts come
  quicker before he settles and slower once he's settled. Every timing
  is a random span. No heavy lids, glance down or parted lips.
- **Holds in the Activity (2026-11-03).** The holds above (rings, heart
  monitor, hearts, face arc, tease and caught tease) and the first-time
  hint live in hangout/holds.js, which both the Activity (main.js, /meet
  and the free hangout) and the preview attach; before this they were
  preview-only, so a long press in Discord was just a tap. For phones: the
  stage turns off text selection and iOS's long-press callout
  (hangout.css), which otherwise fire around 0.5s, before the 0.6s hold,
  and cancel the touch. Releasing over the VN box (pointerupoutside) ends
  a hold. pointercancel, which Pixi 8 ignores, is caught on the canvas: it
  drops a hold that hadn't started and lets go of one that had. Only the
  finger that started a hold moves or ends it.
- **Box fades during a hand hold (2026-11-03).** While a hand hold runs
  (from the moment it starts, not on press), the VN box fades to 12%
  opacity and stops taking pointer events, and the first-time hint hides,
  so his hand and the hearts aren't covered (holds.js `dimBox`,
  `body.hand-hold` in hangout.css). It fades back as the hold ends, in time
  for his release line. The lip and heartbeat holds keep the box (the
  heart monitor lives in its name plate).
- **Box fits its text (2026-11-03).** The VN box no longer holds 22% of
  the stage on wide screens: it's as tall as its line, one line at least,
  with slightly tighter padding. A line lays out in full (the untyped rest
  invisible) as it starts typing, so the box takes its final height at once
  instead of growing mid-line.
- **Blush fades gradually (2026-11-02).** A blush comes in as fast as its
  cause but never drops off with it: when the face that brought it ends, a
  hold is let go or warmth cools, the flush starts fading at once and
  dilutes slowly (live2dRig.js `BLUSH_FADE`, exponential, 4s time constant:
  nearly gone by about 12s), ears and deep patch with it. It doesn't
  linger and then drop.
- **Onboarding: tutorial chips (preview prototype, 2026-11-05).** A pill
  above the dialogue box teaches one gesture the first time it opens up,
  with a faint pointer on him where it applies (coach.js). Each chip shows
  **once per player, not per character** (localStorage, per browser; a
  server-side "hints seen" field is the plan once it reaches the
  Activity), clears when the gesture lands or after 9s, and steps aside
  while response choices show. `?hints=1` shows them again. The chips:

  | Tier | When | Pill | Pointer | Clears when |
  |---|---|---|---|---|
  | new, known | Hangout opens, he has an article | "Something of his reacts to a tap" | dot on the article | a tap on an article |
  | warm+ | Hangout opens, he has an article | "New: something of his comes off. Double-tap it" | dot on the article | an article comes off |
  | spark+ | Hangout opens | "New: press and hold his hand, lips or chest" | dot on his chest (the heartbeat hold opens the monitor) | a hold lands |
  | close, bound | a chest hold starts | "Checking his heartbeat? Try sliding down" | chevron drifting down from the finger | the slide registers (caught or tease); hidden, not seen, if let go first |
  | bound (bliss on) | Hangout opens | "New: hold his hand and lips first, then his chest" | dot on his hand | both holds have run |
  | bound (bliss on) | the edge's heart appears | "Tap the heart before it fades" | the heart itself | the heart is tapped; missed, it shows at the next edge |

  The article chips wait for a character who has an article (9 rigs) and
  never name it; the dot sits on its densest piece of art
  (live2dRig.js `drawablesAnchor`). Entry chips queue one at a time,
  lowest tier first; the slide and edge chips take the pill mid-gesture.
  The edge chip stays visible while tease dims the box (`.coach.keep`).

#### Removable articles (designed 2026-11-02, built in the preview 2026-11-05)

Some characters wear or carry an article the player can take off with a
**double-tap**. The first tap plays as a normal touch on the article; a
second tap on it within ~0.35s removes it instead and adds **no
annoyance**. Single taps everywhere stay instant (no waiting to tell a tap
from a hold). Removal is **warm**'s new interaction (user, 2026-11-05):
every article unlocks at **warm** and stays removable at every tier after.
Its pools (`<article>Pat`, `<article>Off`) vary by tier like every touch
pool (warm, spark, close, bound). New gestures beyond the head and cheek
strokes wait. Below the article's unlock tier a double-tap is just two
taps. Removed articles stay off for the rest of that Hangout and are back
next time. Double-tapping must not zoom the page on phones (the stage sets
`touch-action` to rule it out).

The rule for every article: **an article has its own touch spot and its
own line pool; removing it reveals the character's normal spot** (head,
belly, hand…), which then plays that spot's normal trigger and lines. The
normal triggers (`headPat`, `bellyTouch`…) always mean touching *him*. While
an article is on, the spot under it is off, so a tap on what shows around
it still counts as the article. The article's spot borrows the covered
spot's face and pose; only its lines are its own.

Removal plays its own reaction and line (`<article>Off`, always spoken,
like `upset`). The art fades out over a fraction of a second; there is no
removal animation. An article can require another to be removed first.

Per character, per outfit, in that outfit's rig.json entry: the art to hide
(a model part, else a drawable list, since some models don't group the
article into a part, or a parameter to hold off, as with Elias's lollipop), the spot it covers, the unlock tier, the removal
reaction, the article's own trigger, and any article it waits on. Hiding a
part zeroes its opacity after motions and pose3 write theirs; hiding
drawables needs its own path in live2dRig.js (drawable opacity is
recomputed by the core each update). The preview's "Model parts"
toggles (`?hide=PartX`) show what a part covers.

| Character | Article | Art | Covers | Notes |
|---|---|---|---|---|
| Shion | hat | `PartHat` (academy) | head | Unlocks at **warm** (moved from spark, 2026-11-05). Hat on: `hatPat` (the current hat-aware lines; the hints at taking it off need re-tiering now that it comes off at warm). Removal: `hatOff`. Hat off: `headPat` with bare-head lines ("...Hm. Your hand's cold.", "Keep going. You stop when I say."). Hair under the hat is drawn (checked in the preview). |
| Haru | Peekaboo | the outfit's `peekaboo` drawables (academy, casual, house) | belly | Peekaboo **hops out**; Haru reacts to him leaving (Haru's line, not Peekaboo's). His current `bellyTouch` lines (about Peekaboo) move to `peekabooPat`. Unlocks at **warm**. |
| Haru | sling bag | drawables TBD, every outfit | belly | A **second** double-tap, only once Peekaboo is out. The empty sling has no pool: a tap on it is a plain `bellyTouch` on Haru. Sling off: same `bellyTouch`. `bellyTouch` becomes a new pool about Haru's own belly. Check what's drawn under the sling. Unlocks at **warm**. |
| Tohma | monocle | `PartMonocle` (academy) | eye/cheek area (spot TBD) | Unlocks at **warm**. Lines and covered spot TBD. |
| Jiro | glasses | `PartMegane` (academy, casual, casual_2, house) | eye/cheek area (spot TBD) | Unlocks at **warm**. Lines and covered spot TBD. |
| Ren | phone | drawables TBD (no named part; check which outfits hold it) | hand | **Taken away** by the player, not set down by him. Encounter labels never touch his phone/game (Ren responses rule), so the lines have to make it land, tier by tier. Unlocks at **warm**. Lines TBD. |
| Shohei | bandana | `PartBandana` (academy, casual; also a `ParamBandana`) | head | His current headPat lines already guard it ("Watch the bandana."; close: "You can mess up the bandana. Just you."), so those move to `bandanaPat`. Check the hair drawn under it in the preview. Unlocks at **warm**. Lines TBD. |
| Benkei | name tag | work outfit only; no named part (`Part14` is the work-only part, unconfirmed), else drawables TBD | chest | Not on the academy outfit. Unlocks at **warm**. Lines TBD. |
| Elias | lollipop | no part; driven by parameters (`ParamCandyOnOff`, `ParamHandCandyOff`; `e_candy_00` and the `m_ame*` motions use them) | hand at warm, lips from spark | Unlocks at **warm**, where it can only be snatched while a pose shows it in his hand (the `m_ame*` poses); from **spark** it rests in his mouth and is taken from there (user, 2026-11-05). Hiding it means holding the parameter off after motions and expressions write theirs, a third art path beside part and drawables; the `m_ame*` poses would bring it back, so they need excluding once it's off. Lines TBD. |
| Leo | headphones | `PartHeadphone` (academy, casual; also a `ParamHeadphone`) | chest (worn around his neck) | His new-tier chestTouch already has "Hands off the headphones.", which moves to `headphonePat`. He's noise-sensitive (his ear lines; canon idle: "Ugh, everyone's so loud. I'm putting my headphones on"), so taking them is a real ask the lines carry, tier by tier. Unlocks at **warm**. Check what the neck/collar looks like under them. Lines TBD. |

**Build (2026-11-05).** `activity/src/hangout/articles.js`
(`attachArticles(scene)`), attached by preview.js and, since 2026-11-05,
by the Activity (main.js `attachTouch`, both /meet and the free hangout,
sharing one coach with holds). It wraps `hangout.tapAt` (which the scene and
holds.js both call, so holds chain through it) and `hangout.spotInfo`.
Config is rig.json `outfits.<name>.articles` (keys documented at the top of
articles.js: `part`, `drawables`, `params`, `rest`, `covers`, `blocks`,
`shownOnly`, `poses`, `requires`, `pool`, `hit`, `hotspots`, `tier`),
checked by validate.js against the outfit's moc3 and, in the tests, the
character's pools. The art fades out over 0.3s (`FADE`): parts through
`setPartHidden(id, hidden, fade)`, drawables after the core's update
(`setDrawablesHidden`), parameters held after every other layer
(`setHeldParams`). Removal blocks the poses that bring the article out
(`renderer.blockedPoses`). A spot's own hit area comes first; where no spot
is, the article's art is its touch area too (the monocle, the glasses, the
hat's crown). `<article>Off` faces default to reactions.js `articleOff`
(surprise at warm, blushing from spark), overridable per rig. Without
articles.js (the Activity) every article stays on, and a spot it covers
draws its `<article>Pat` lines (Hangout `spotInfo`), so moving Shion's hat
lines out of `headPat` doesn't put bare-head lines on his hat there. The
preview drawer has an "Articles" row (state, click to take off, reset),
`<article> (pat)` / `(off)` buttons in "Touch spots", resets them on a tier
change, and `?articles=off` starts them removed.

What each covers, as built: Shion `PartHat` (head); Haru `Part25` plus
Peekaboo's shadow meshes (belly; once he's out the belly spot moves onto
the chest part), then the sling (`Part24a`, house `Part4`, plus its shadow
meshes; no own touch area, it crosses his chest); Tohma `PartMonocle` and
Jiro `PartMegane` borrow the cheek's face and pose without taking the cheek
(`blocks: false`); Ren's phone (academy/roomwear `ArtMesh214`, house
`ArtMesh11`) covers `hand_l` and is only out in `m_phone*`; Shohei
`PartBandana` (head); Benkei's tag is drawables `ID` + `ArtMesh98` (work
only; `Part14` is the apron ties); Elias's lollipop is `ArtMesh14` (hand),
`ArtMesh16` (mouth) and the bitten `ArtMesh107`/`126`, `hand_r` while an
`m_ame*` pose shows it below spark, resting in his mouth from spark
(`ParamCandyOnOff` 1, paused during `m_ame*`), and off it holds
`ParamCandyOnOff` 0 and `ParamHandCandyOff` 1; Leo `PartHeadphone` (chest).
Leo's headphones and Benkei's tag let the heartbeat check through
(`holdThrough`, user 2026-11-05): a hold on them is the chest hold, and a
press that ends as a tap is still the article's. The lollipop in Elias's
mouth doesn't: a press on his lips is a lollipop tap until it's off.

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
not a rig.json setting, and no rig overrides it. Touch lines hold the same
way: after a line types out it stays up for `LINE_HOLD` (1.5s), and taps
before then still react but don't replace it. The upset line always
speaks. Sound plays only on the tapper's device, not
into the voice call, and the first tap unlocks audio. The ♪ button in the VN
box mutes it (remembered in localStorage) and shows only for characters with
sounds. Keep clips short, and export them mono at 22–24 kHz to keep the WAVs
small.

Starting values for the annoyance threshold and decay go in `rig.json`
(`annoyance: { perTap, decayPerSec, threshold, recoverSec }`) and get tuned in
the preview.

### 4.3 Lines

`constants/hangout/alan.js`, one pool per trigger: `headPat`, `cheekPoke`,
`lipsTouch`, `earTouch`, `handTap`, `chestTouch`, `bellyTouch`, `hipsTouch`, `upset`,
`greeting`. Gestures (§4.2) add `headStroke` and `cheekStroke` (every
tier) and `handHold` and `lipHold` (`close` and `bound` only, played on
dates). Removable articles (§4.2) add the article's own pool
(`hatPat`, `peekabooPat`…) and its removal pool (`hatOff`…). Claude drafts
them in Alan's voice from `constants/dialogue/alan.js`. **The user approves
them before release.** They're kept apart from the `/meet` dialogue files.

### 4.4 UI

The dialogue box and buttons match the bot's composited style in
`imageComposition.js`: same fonts from `assets/fonts`, same palette. Layout
works in portrait, so the character stays on screen on phones. The status line
shows his name, his relationship level and heart bar.

**Framing (2026-11-03).** Every screen gets the rig's `stage.portrait`
framing by default, hands included, so desktop players can reach them too.
Desktop only (Discord platform `desktop`, no coarse pointer) gets a
close-up button (⛶) in the VN box that swaps in `stage.landscape`, the VN
bust. It applies only while the stage is wide and is remembered per browser
(`hangout.closeUp`). Phones and tablets never get it, and a phone turned
sideways keeps the full framing. The preview has the same switch under
"Framing" in its drawer.

### 4.5 Runtime targets

- One build: plain web page, or Discord Activity when it detects it's in the
  Discord iframe (§6). Only then does it start the SDK and OAuth. Outside
  Discord, data features are off (preview and dev only).
- Discord desktop, web and mobile. Capped at 30 fps on mobile. Cubism Core
  is served from `/assets/live2d/vendor/`, never a third-party CDN.

### 4.6 Camera (designed 2026-11-01, not built)

The stage can push in on the character and ease back out. It works in
**every Hangout**. It's a transform on the stage container (character and
room together), so the rig, hotspots and hit tests don't change: pointer
coordinates go through the same transform.

- **Shots.** `wide` (the default framing, §3.1 `stage`) and `face` (the
  face_base part's bounds plus a margin, centered). A push takes about 0.6s
  in and 0.8s out, with an ease-in-out curve, and the room pan (§4.1) keeps
  drifting underneath.
- **When it pushes in:**
  - the `/meet` answer's reaction (§11.2 steps 5–6), easing out once the
    reaction line has typed out and held;
  - on a date (§12): a hold gesture, for as long as it's held (§4.2), and
    the parting beat's line.
- **Not on taps.** Ordinary touches and strokes never move the camera, so
  spam-tapping can't make it jitter. An upset eases back to `wide` at once.
- **The photo** (§12.6) is always taken at `wide`.
- **Bounds.** The push never shows past the room's edges: the zoom is
  capped so the scaled room still covers the screen (portrait framing on
  phones zooms less). With no room drawn, nothing caps it.
- **Per rig:** rig.json `camera.face` can nudge the face shot's
  `{ zoom, offsetY }` for a model whose face_base bounds frame badly. The
  preview gets a "Camera" row to play each shot.

---

## 5. Data

### 5.1 API (`/api/activity/*`, in `app.js` or a new `activityRoutes.js`)

| Route | Does |
|---|---|
| `POST /api/activity/token` | exchanges the Discord OAuth `code`, calls `users/@me`, returns the Discord access token for `sdk.authenticate` and a signed session token |
| `POST /api/activity/renew` | a fresh session token for a still-valid one, while a `/meet` answer is pending (§11.2) |
| `GET /api/activity/launch` | what the launch opens: `{ dev }`, an `/encdev hangout` free hangout or a `/meet` encounter (§6) |
| `GET /api/activity/encounter?instance=<id>` | the session user's own `/meet` encounter in that instance, or 404 (§11.2) |
| `POST /api/activity/answer` | `{ encounter, type }`: the one payout (§11.3) |

Each route except `token` requires `Authorization: Bearer <session token>`.
The `discord_user_id` comes **only** from the verified token, never from the
request body.

### 5.2 Analytics

Opening the Activity logs `'hangout_open'` to `command_usage_log`, for usage
tracking only. Answered encounters log as `'meet'` (§11.7).

---

## 6. Discord Activity setup

- Enable Activities on the existing application (`APP_ID`).
- Register the **entry-point command** (`launch`, `APP_HANDLER`, §11.1) in
  `commands.js` / `npm run register`.
- **Owner-only until release (milestone 4; released 2026-10-31, the
  hiding below is dropped and `OWNER_ONLY` is false).** The ways in are the owner's
  `/meet` picks (§11) and `/encdev hangout` (the free hangout, no
  encounter), which answers with `LAUNCH_ACTIVITY`. Everyone else's `/meet`
  stays the image (`activityOpenTo` in `activityRoutes.js`). The entry point
  still has to be registered (Discord rejects a bulk overwrite with no entry
  point once Activities are on) but is hidden with
  `default_member_permissions: "0"`, and
  `POST /api/activity/token` refuses anyone but `OWNER_DISCORD_ID` (403), so
  someone joining the owner's session sees a refusal line, not the scene.
  Release flips `OWNER_ONLY` in `activityRoutes.js` and drops the hiding.
- **Free hangout launch.** `/encdev hangout` opens the free hangout (no
  `/meet` encounter). `LAUNCH_ACTIVITY` can't pass that to the page, so the
  handler records the launch per user in memory (10 minutes) and the
  Activity reads it after sign-in from `GET /api/activity/launch` (Bearer
  session). No record means the `/meet` encounter.
- **URL mappings** in the Developer Portal: `/` → the Railway app (serving
  `activity/dist`), plus `/api` and `/assets`. The client loads nothing from
  third-party CDNs; PixiJS and the Live2D plugin are bundled by Vite, and
  the Live2D code loads as its own chunk with Cubism Core.
- **Asset caching:** the Activity loads repo assets through
  `/assets/v/<build>/...` (`main.js` `versioned`), which `app.js` serves as
  `/assets/...` with a one-year immutable cache, JSON and .moc3 gzipped
  (`assetGzip.js`, gzipped once per file and kept in memory). `<build>` is
  the deployed commit (`vite.config.js` ASSET_VERSION), so each deploy
  makes players fetch fresh files once and reopening a hangout between
  deploys loads nothing. The rig validator runs only under `vite serve`;
  in a build it would cost a request per file, and the tests already check
  every rig on disk.
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
  hangout.html        # Live2D rig preview (dev only, §3.4)
  src/
    main.js           # Activity entry: the scene + Discord sign-in
    hangout/          # scene, live2dRig.js (model, moods, poses, talking), the Hangout
                      #   class, reactions, hotspots, annoyance meter, dialogue box,
                      #   sounds, lines, meet.js (the /meet flow), validate.js, preview
    discord.js        # SDK init + auth, the /meet encounter calls (no-op outside Discord)
  tools/
    live2d-convert.js  live2d-rig.js  live2d-manifest.js   # Live2D models (§3.5)
    lib/backgrounds.js                                   # roomBackground
assets/live2d/
  vendor/live2dcubismcore.min.js
  <id>/rig.json  <id>/<outfit>/        # one per character; Cubism files per outfit
constants/hangout/alan.js
activityRoutes.js     # /api/activity/*
assetGzip.js          # gzipped, cached /assets/v/<build>/ files (§6)
meetActivity.js       # /meet as the Activity, server side (§11)
docs/hangout-activity.md
```

Express serves `activity/dist` (built at deploy) at `/`; built files sit
under `dist/static/` so they never collide with the repo's `/assets`.
`npm run build:activity` is added to the Railway build.

---

## 8. Milestones

1. **Rig preview (browser only).** Built first on the sprite rig (v1), then
   redone on Live2D (2026-10-30): converted models, rig.json,
   moods, reaction poses, hotspots, annoyance meter, and `hangout.html`.
   No Discord, auth or data.
   **Gate: the user signs off on the Live2D rig in the browser.**
2. **Activity shell.** Discord detection and SDK, `/hangout` as the
   entry-point command, the token route, URL mappings, the Railway build. The
   rigged Alan running inside Discord on desktop and mobile.
3. **Lines.** The user approves the drafted touch lines. Affinity comes
   with `/meet` (§11.3), not a Hangout route of its own.
4. **Release.** Live2D is the default launch (§6). Private, unlisted, on
   the bot's servers.
5. **Remove v1. Done 2026-11-04.** The sprite rig is deleted:
   `activity/preview.html`, `src/rig/`, `src/preview/`,
   `src/hangout/scene.js`, the sprite tools and their `tools/lib/` helpers,
   `assets/rig/`, `vite.config.js`'s `/__rig/save` plugin, the `pngjs` dev
   dependency, and `/encdev hangout`'s `version` option (the launch route
   now answers `{ dev }`). What Live2D used from v1 had already moved out
   on 2026-10-30 (the stage helpers to `src/hangout/stage.js`, Alan's sound
   to `assets/live2d/alan/sfx/`, `roomBackground` to
   `tools/lib/backgrounds.js`, the preview styles to
   `src/hangout/preview.css`).

---

## 9. Testing

`node --test` in `test/`:

- routes: reject missing, bad or expired tokens; ignore any user id in the
  body.
- `test/hangout-rig.test.js`: the Live2D rig validator's rules
  (missing models, expressions and pose clips, hotspot parts, drawable ids,
  each outfit's `dialogueVariant`), then every rig in
  `assets/live2d/` against the files on disk.

**Manual visual checklist** (preview, then Discord desktop and mobile):

- every reaction pose plays, holds and returns cleanly
- moods read correctly (stacked expressions, no stuck crossfade)
- touch spots follow the art through poses
- the annoyance meter triggers and recovers as expected
- portrait layout correct
- holds 30 fps on a mid-range phone

---

## 10. Open questions

Not decided during the design review. These are defaults until someone says
otherwise.

- **PM backgrounds**: the first release always uses
  `Vagastrom_Alan_Room.png`. Switching to `_PM` by `TZ` time of day is an
  easy add.
- **Lighting and effects (prototype first, 2026-11-01)**: candidates are a
  tint on the rig matched to the background (warm for restaurants, cool and
  dim for night streets and Obscuary), animated flicker for neon and
  candlelight, particles (rain for Hotarubi, petals, sparkles on water),
  background blur, and a vignette or soft shadow. Bloom is the heaviest on
  phones at the 30 fps cap. For every Hangout, not dates only. A
  throwaway toggle in the dev preview (`hangout.html`) comes first;
  nothing ships until the user has seen it. **Prototype built 2026-11-01**:
  `activity/src/hangout/effects.js`, the "Effects" rows in the preview
  drawer. Its auto rules are the candidates to ship: Hotarubi rain (always),
  a night grade from `isEveningHour` on day files only (`_PM` files are
  already night), the Obscuary grade, Frostheim snow, and a light blur
  (strength 2).
- **Outfit**: every Live2D rig has academy only so far; second outfits are
  tracked in [`live2d-outfits.md`](./live2d-outfits.md). Until §11, the
  Activity shows `defaultOutfit`. Once `/meet` moves into the Activity, the
  outfit follows the background (§11.5).

---

## 11. Future: `/meet` as the Activity

Status: **built 2026-10-30, released to everyone 2026-10-31.** Designed
2026-10-28, settled 2026-10-29. Code: `meetActivity.js` (the click, the
encounter, the answer, the fallback), `activityRoutes.js` (the routes),
`activity/src/hangout/meet.js` (the player's side), migration 035
(`meet_encounters`, the off switch, the usage path). Still to do: the
per-tier touch lines, which are writing (§11.6). Not yet tested in Discord: greying out the picker after a launch
(through `/meet`'s own token; the result stays in the Activity), followups
after a launch (the fallback), and the instance id from `with_response`.

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
   from `getAffinityForResponse`), set per tier in `DEFAULT_REACTIONS`
   (`answerLove` / `answerLike` / `answerFlat`): love `smile` → `full_smile` from spark; like `close` → `smile`
   from spark; flat `indifferent`, a content `close` from close. Answers
   never blush: blush is earned by touches and holds. A rig overrides them
   in its `reactions` with the character's own register (a smirk, a
   composed face), and may give love and like a pose
   (`reactionPoses.answerLove` / `answerLike`); flat stays still. Flat
   never reads as hurt; it's "didn't resonate".
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
8. **The hangout carries on**: touch spots and gestures (§4.2).

**Touches before answering.** Touch spots and gestures work any time. Before the answer, each one plays its reaction, mood and
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

Touch spots and gestures never call the server, so there's nothing to
farm.

### 11.4 Secret button (cut)

Cut on 2026-11-01, never built: no secret combos or secret scenes. The
heading stays so the section numbers don't shift.

### 11.5 Background and outfit

**Background.** The same pool `/meet` draws from today, via `turfSpots`
(`constants/backgrounds.js`): the character's house, their exclusive room
and `additionalLocations`, plus signature spots weighted up (Alan: The Pit
×1.5) and pinned in when they sit outside the house. `_PM` files only in
the evening, at `EVENING_PM_WEIGHT`. A houseless character (Benkei) keeps
`/meet`'s `TURF_PROBABILITY` split between his signature spot and a general
location. This replaces §10's fixed `Vagastrom_Alan_Room.png` for `/meet`.

**Outfit.** Two separate draws, exactly as `/meet` makes them today: the
background above, and the uniform/casual roll (`getImageVariant`, with the
`CASUAL_IMAGE_PROBABILITY_*` curve by level). Neither affects the other, so
Alan can be in academy in his room or casual at The Pit, as today. No new
picking logic:

- each outfit in `assets/live2d/<id>/rig.json` names the variant it counts
  as, `dialogueVariant: "uniform"` or `"casual"` (academy is uniform);
- the roll picks the outfit with that `dialogueVariant` (one at random if
  several share it). Where today's code falls back to the first image when
  the rolled variant has none, this falls back to `defaultOutfit`, and the
  variant becomes that outfit's, so the dialogue matches what's worn;
- the variant still keys dialogue as today (Jo's pronouns change between
  uniform and casual, `constants/dialogue/_shared.js`), and the beat is
  drawn last, so it always matches what the character is wearing.

Today only Benkei, Jo, Mio and Ren have a second outfit (2026-10-30), each
marked `"casual"`; everyone else's rolls land on academy and uniform, the
same as a character with no casual image today. Jo's is `femacademy`, the
outfit for the variant whose lines use she/her.
A second outfit (casual, city, work or roomwear,
[`live2d-outfits.md`](./live2d-outfits.md)) is marked `"casual"` and takes
the casual rolls.

**Spot-bound outfits (2026-11-01).** An outfit with `spots` (background
files) is worn only at those spots. There it joins the roll like any other
outfit (a casual roll picks among the casual outfits allowed there, a
uniform roll still gives academy); anywhere else it's never worn. With
`"always": true` as well, it's worn every time at its spots, whatever the
roll, and the variant becomes its `dialogueVariant`. The default outfit
can't be spot-bound, and `always` needs `spots` (`validate.js`). `dress`
gets the drawn background file from `drawBeatFor`, since the background is
drawn first.

Always there (`always: true`):

- Benkei `work`: `Darkwick_Campus_Store` (+ `_PM`)
- Mio `work`: `Dionysia_Workshop`, `Dionysia_Workshop_2`
- Ren `roomwear`: `Jabberwock_Ren_Room` (+ `_PM`)
- Ren's diner uniform (to come): `Darkwick_Mystery_Diner` files
- Yuri `house` (lab coat) and Jiro `house`: `Mortkranken_Lab` (+ `_PM`),
  `Mortkranken_Examination_Room`, `_2` (+ `_PM`)

Only there, through the roll:

- Haru, Towa and Ren `house` (the game's house jumpsuits): every Jabberwock
  background except `Jabberwock_Ren_Room`

Date and Gala outfits (`dateOnly`, `galaOnly`, [`live2d-outfits.md`](./live2d-outfits.md))
are never `/meet`'s: `pickOutfit` drops them before the spot and roll
checks. `validate.js` refuses one that's the default outfit, has `spots`, or
is both.

**Placement.** One framing per character (`rig.json` `stage`), the same on
every background; only the background pans behind them. No per-background
framing.

**Loading.** The Activity loads only the drawn outfit's images, not every
outfit's, so it opens faster on phones.

### 11.6 When §11 starts

Every character has a Live2D rig (Benkei's since 2026-10-30).

**Writing comes last**, after all the rigs exist: touch reaction lines per
tier and gesture lines (§4.3), drafted one character at a time from their
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

- **Outfits tied to backgrounds**: none for now; the outfit comes only from
  the variant roll. Once characters have second outfits, an outfit may be
  associated with backgrounds (roomwear with a room, say). If it is, it
  should weight the outfit there, not force it, so Alan can still be in
  academy in his room sometimes.
## 12. Dates

Status: **designed 2026-11-01, not built.** Settled in a design review with
the user on 2026-11-01. A date is a short, three-beat encounter in this
Activity at a date spot, started from the `/meet` picker (revised
2026-11-04, when call scenes and their date button were removed). It's the
Live2D rig's own feature: there's no image version of it.

### 12.1 Starting a date

- **From the `/meet` picker** (revised 2026-11-04). A date is asked for on
  a `/meet` picker, with a character drawn into it whom the player is at
  **Confidant or above** with (affinity ≥ 260). **The button isn't designed
  yet:** for now nothing in the picker starts a date, so dates have no entry
  point. `/roam` doesn't start dates.
- **No locked teasers.** A drawn character below Confidant shows no date
  option at all, locked or otherwise.
- **The launch** answers with `LAUNCH_ACTIVITY`, sent with
  `with_response=true` so the date is tied to the Activity instance, like
  §11.2, and greys out the picker like a name click (one launch per `/meet`
  message).
- **Every character, Benkei included.** No skip list. Each character's
  limits live in their lines (Rui's curse, Zenji answering the intention,
  Towa mute by day and so on), not in rules.
- **It is that `/meet`.** A date shares the `/meet` 3h cooldown: the
  arrival answer calls `claimCommandUse(userId, 'meet')` and stamps it, so
  the picker's other names then get the cooldown refusal, as after a `/meet`
  answer. Leaving before the arrival answer costs nothing, like leaving a
  `/meet` unanswered. (Revised 2026-11-04 from "separate from `/meet`": with
  dates on the picker, a separate cooldown would make every Confidant+ draw
  a free extra +2.)
- **Errands.** If the character is an unsigned errand target, the arrival
  answer signs the errand, as a `/meet` answer does.
- **The tier is fixed at launch:** `close` at Confidant, `bound` at
  Devoted and Soulbound. A level-up mid-date sends the bond-scene DM as
  usual, but the date's remaining beats stay on the tier it started with.

### 12.2 The date

In order:

1. **Arrival beat.** Its `line` under the name plate, then the four response
   buttons, as in §11.2 (types, colors, glyphs). The answer plays the face
   and the `getReactionLine` reaction like §11.2 steps 5–6. It **pays
   nothing**, so there's no gain line.
2. **Middle beat.** Same flow. Fave or like **+1**, flat 0, with the gain
   line from §11.2 step 7.
3. **Parting beat.** Same flow and payout: fave or like **+1**, flat 0.
   **A date pays at most +2.** The **Take a photo** button (§12.6)
   appears with this beat.
4. **Free time.** After the parting answer the date carries on as an
   ordinary Hangout at the date spot, with the music still playing: touch
   spots and gestures, holds included (§4.2), using the character's normal
   tier touch lines. No date-specific touch pools for now; they can be
   added later if dates feel flat.

**Each beat pays on its own answer**, atomically, like §11.3: the server
holds the drawn beats and their mood flags. Answering marks that beat
answered, so double clicks, two tabs and replays can't pay twice. The
client never sends a mood flag or beat key it could forge.

**Touches between beats** work as in §11.2: a touch plays its reaction and
line, then the VN box goes back to the current beat and its choices.

**Leaving mid-date** keeps whatever was already paid. The unfinished date
stays saved and can be reopened until every beat is answered. Unfinished
dates are cleaned up after a day, as housekeeping, like `/meet` encounters.

**A failed launch** (the Activity hasn't loaded the date within ~30s of
the click) gets an ephemeral **Go on your date** button that launches the
Activity again. The same button reopens a date the player left. There's no
image fallback.

### 12.3 Beats

- In the character's dialogue file, beside the `/meet` pools:
  `date: { close: { arrival, middle, parting }, bound: { … } }`. Each beat
  has a `line` and four `responses` (kind / playful / bold / neutral, the
  30-character limit).
- **About 2 beats per stage per tier:** 26 characters × 2 tiers × 6 beats
  ≈ 312 beats, drafted one character at a time from the reference file
  (voice-check workflow) and approved by the user.
- **Location-agnostic.** A beat never names or describes the spot, so any
  beat works at any of the date backgrounds.
- House rules apply as for encounters: no assumed time, the intimacy ladder
  (`close` hints subtly, `bound` treats it as already happened), and a
  tier's beats don't spend its bond scene's reveal.

### 12.4 Spot, outfit, music

**Spot.** A random draw from the 22 backgrounds in `DATE_LOCATIONS.DATE`
(`assets/bg/date/`); the character picks, the player doesn't. A `_PM`
file with a day counterpart follows `/meet`'s evening weighting
(`EVENING_PM_WEIGHT`). A PM-only spot (`Bach_Luxury_Cottage_PM`,
`Harajuku_Alley_PM`, `Harajuku_Takeshita_PM`, `Jiyuuno_megami_PM`,
`Shinjuku_Hanamichi_Street_PM`, `Shinjuku_Ramen_PM`) is always eligible.
This is the first thing to draw from `DATE_LOCATIONS`.

**Outfit.** Outfits in `assets/live2d/<id>/rig.json` can be marked
`dateOnly: true`. A date picks one of the character's date outfits at
random. `/meet` never draws them. A character with no date outfit wears
`defaultOutfit` until their art lands; the checklist is in
[`live2d-outfits.md`](./live2d-outfits.md). A date outfit still names a
`dialogueVariant`, so Jo's pronouns stay right, and the validator checks it.

**Music.** One looping track per background family. It fades in at the
arrival beat and plays through free time.

| Family | Backgrounds |
|---|---|
| beach | `Bach_Beach`, `Bach_Cottage`, `Bach_Cottage_Pool`, `Bach_Island_Shore`, `Bach_Island_VIP`, `Bach_Luxury_Cottage_PM` |
| café | `Cafe`, `Cafe_2`, `Shinjuku_Donut_Store` |
| restaurant | `Chuka_Restaurant`, `Shinjuku_Ramen_PM` |
| city | `Chuka_Sidestreet`, `Harajuku_Alley_PM`, `Harajuku_Takeshita_PM`, `Jiyuuno_megami_PM`, `Shinjuku`, `Shinjuku_Hanamichi_Street_PM`, `Tokyo_Bay` |

(`_PM` files go with their day file's family.) The user supplies the
tracks. They're served with the Activity's assets, never a third-party CDN,
and fetched only for the drawn family. **The music has its own toggle**
beside ♪, remembered in localStorage like ♪. Touch sounds and their shared
10-second cooldown (§4.2) don't change.

### 12.5 Gestures

Strokes work in every Hangout. **Holds (`handHold`, `lipHold`) work only on
dates**, at any point in the date, before or after the parting beat. See
§4.2.

### 12.6 Date photo

- **Take a photo** appears with the parting beat and can be used **once per
  date**, during the parting beat or free time.
- Pressing it hides the VN box, blurs the background, plays a pose (rig.json
  `reactionPoses.photo`, else the character's default idle), and captures
  the canvas: rig plus background.
- The Activity uploads the PNG to `POST /api/activity/photo` with the date.
  The server checks the date belongs to the session user and hasn't been
  photographed yet, stores the image (a Supabase Storage bucket plus a
  `date_photos` row: user, character, background, created), and the bot
  DMs it to the player as a keepsake.
- No affinity, no milestone.

### 12.7 Warmth (graded moods)

On a date, the blush and breathing aren't on/off: they deepen over the date.
The moods (§3.2) still pick the face; warmth is added on top of them,
written straight to the model's parameters after the expressions, the way
the flinch is (§4.2).

- **Warmth** is a value from 0 to 1, local to the date and never sent to the
  server. It starts at **0.2** at `close` and **0.4** at `bound`.
- **It rises** with a fave answer (+0.2), a liked answer (+0.1), a hold
  (+0.1 per second held, up to +0.3 per hold) and a stroke (+0.05). A flat
  answer doesn't lower it. It eases toward its new value over about a
  second rather than jumping.
- **It drives:**
  - `ParamCheek` (the blush every model's `e_sekimen_00` adds): a resting
    blush at `warmth × 0.6`, so even a mood without blush shows some. A
    blush mood adds on top, capped at the parameter's max.
  - breathing speed: the `m_breath` layer plays up to 1.4× faster at full
    warmth, and back to normal over a few seconds once nothing raises it.
- **It drifts down** slowly in free time (about −0.02 per 10s with no
  touch), never below its starting value.
- **Character limits still win.** Warmth adds blush only; faces stay as
  each character's moods and lines set them (Subaru's uneasy faces,
  Taiga's smirks). A model without `ParamCheek` skips the blush; the
  validator warns.
- **Ordinary Hangouts too, from spark up** (changed 2026-11-01; dates were
  first). /meet encounters and the free Hangout run a milder profile
  (`warmth.js` `hangout`): it starts at **0** at `spark`, `close` and
  `bound` (off below spark), rises **+0.05** per touch and nothing for an
  answer (changed 2026-11-03: blush is earned by touches and holds), caps at **0.4 / 0.6 / 0.7**
  by tier so a date still flushes him most, drifts down about **−0.05 per
  10s**, and an **upset clears it**. Holds don't feed it.
- **An answer is never a touch.** The /meet answer plays through the same
  reactions as a tap (`answerLove` / `answerLike` / `answerFlat`); warmth
  counts those as fave / liked / flat, so a flat answer never warms him
  (and outside dates no answer does).
- **Ears follow.** A rig with `partBlush` reddens its ears with
  `ParamCheek`, warmth included, so those characters flush at the ears as
  warmth climbs.

### 12.8 `/album`

- An **ephemeral**, paged gallery of **every** date photo the user has
  taken, across all characters, newest first, one per page.
- **No cap** on how many photos are kept.
- **Share** posts the photo on the current page publicly in the channel
  `/album` ran in, captioned `📸 {user} with **Alan Mido**` (no spot, no
  pronouns). One photo per click, no limit on shares.

### 12.9 Data and routes

- A saved date on the server, like a §11.2 encounter: user, character,
  tier, spot, outfit, the three drawn beats with their mood flags, which
  beats are answered, and whether the photo was taken. Plus `date_photos`
  and the storage bucket. One new migration (the next free number; 036 went
  to dropping the call-scene columns).
- Routes, all behind the session token (§5.1):
  `GET /api/activity/date?instance=<id>`, `POST /api/activity/date/answer`
  `{ date, stage, type }`, `POST /api/activity/photo`.
- `GET /api/activity/launch` learns a third kind: a date.
- Analytics: each answered date beat logs to `command_usage_log` as
  `'date'`.

### 12.10 Gala night

The Gala arc's finale ([`gala-reinstatement-arc.md`](./gala-reinstatement-arc.md)
§5.1.1) is a one-time date variant: the arc's partner, any tier, a fixed
venue, `galaOnly` formalwear, its own `gala` beat pools and no expiry. It
shares this section's answer route, photo, `/album` and warmth. The
differences are listed there, not here.

### 12.11 Open questions

- **Rarity** (stashed 2026-11-04). With dates on the picker, how often one is
  offered comes from the draw (a given Confidant+ character is in about 4/26
  of pickers, errand seeds aside). Whether that needs an extra chance roll or
  a cap isn't decided. The old 5% scene rate no longer applies.
- **The picker button** (deferred 2026-11-04): its layout and label. A second
  Action Row of `💞 <First name>` buttons was proposed and not taken.
- **`/call` boosts.** Whether a pending boost on the character applies to a
  date beat (and is spent) the way it applies to a `/meet` answer.

- **Photo forgery.** The photo is drawn on the player's device, so the
  server can't verify the pixels, and Share posts it publicly. Cheap
  guards: PNG only, exact canvas dimensions, a size cap. Anything stronger
  would mean rendering on the server.
- **Deleting a photo** from `/album`: not decided.
- **Intro narration** before the arrival beat (like `/meet`'s "agrees to
  meet you" line): none by default, since date spots have no display names.

---

## 13. Future: two-character scenes

Noted 2026-11-01, not designed. Two Live2D rigs on stage at once for canon
pairs (Alan and Tohma behind the garage, Haru with Towa tagging along). A
candidate home is a rare `/roam` variant with a "Join them" button that
launches the Activity with both rigs. It's a different entry point and pulls
in `/roam`'s public flow, so it gets its own design pass.
