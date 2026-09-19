# Pairing `dialogue` lines with their `approach` label

> **Current state (2026-09-19):** the migration described below is finished
> and the legacy pools are gone. No character has a top-level `approach`,
> `approachWhen` or `daytimeApproach`, and `getRandomApproachLabel` was
> replaced by the private `getFallbackApproachLabel` in
> `constants/characters.js`. A beat's own `approach` is always the first
> choice; only a bare-string line (e.g. `SHARED_DIALOGUE_WHEN`'s evening
> lines, or kaito's/subaru's spark/close evening lines) falls through to
> `SHARED_APPROACH_WHEN`, then `APPROACH_LABEL_FALLBACK`. The status and
> sections below are kept as history and describe the transitional design.

**Status:** mechanism shipped. `benkei.js` migrated as the pilot
(`new`/`known`/`warm`/`close`/`bound`; `spark` deliberately left legacy — see
§4). `alan.js` is migrated for `new`/`known`/`warm` (`spark`/`close`/`bound`
still legacy). `jo.js` is migrated for `new`/`known`/`warm`/`close`/`bound`
(`spark` left legacy, same shape as benkei's and alan's: `approach.spark` was
already expanded to the tier's target of 27 while `dialogue.spark` stayed at
5) — jo's variant-keyed (uniform/casual) pools were paired per variant, as
§6 flagged. All 7 characters with a `dialogueWhen`/`approachWhen`
conditional block (haku, jin, kaito, lucas, subaru, tohma, zenji — all a
single "evening" block) are migrated too: each block's `new`/`known`/`warm`
entries are now `{ line, approach }` pairs and `approachWhen` is deleted;
`taiga.js` is migrated for `new`/`known`/`warm` (`spark`/`close`/`bound`
still legacy, same reason as alan/jo: `dialogue.spark`/`close`/`bound` are
still 5 lines each against much larger targets, not padded to match
`approach`'s 4-line legacy pools there). kaito's and subaru's extra
`spark`/`close` evening lines had no `approachWhen` counterpart to pair with,
so those two tiers are left as bare
strings by design (see §4's "don't force a pairing that isn't there"), same
as benkei's `spark`. The other 18 characters have no `dialogueWhen` at all.
Base `dialogue`/`approach` pools for everyone but benkei, alan, and jo are
unmigrated and work exactly as before; nothing about this is required to
ship other content.

---

## 1. The problem

`/roam` shows one ambient `dialogue` line and one `approach` button below it.
Historically the two were picked with two independent `pickRandom()` calls
(`getRandomDialogueLine` and `getRandomApproachLabel`, both in
`constants/characters.js`) — same tier, otherwise unrelated. With a flat
5-line pool per tier the odds of a visible mismatch were low. They stopped
being low once `DIALOGUE_POOL_TARGET_BY_TIER` (`constants/game.js`) started
asking for much wider pools per tier as relationship levels widened
(`new: 5, known: 13, warm: 18, spark: 27, close: 38, bound: 46`): drawing two
much bigger pools independently makes an incongruous pair the common case,
not the rare one. The example that surfaced it — `benkei.js`'s `known` tier —
paired the line `He starts to say "back when I was advising" and catches
himself halfway through, looking sheepish about it.` with the button
`Scratch the cat's ears`, which reads like two different scenes.

Root cause: `approach` had been expanded on its own to hit the new pool-size
target, without a matching expansion of `dialogue` — the two grew unevenly
and kept drawing independently.

## 2. The fix: paired beats

A `dialogue[tier]` entry can now be a **beat** — `{ line, approach }` —
instead of a bare string:

```js
dialogue: {
  known: [
    {
      line: 'He starts to say "back when I was advising" and catches\n        himself halfway through, looking sheepish about it.',
      approach: "Ask what he almost said",
    },
    {
      line: "The cat lets you scratch behind her ears now. He watches like\n        it's the highest honor she's ever handed out.",
      approach: "Scratch the cat's ears",
    },
  ],
},
```

`approach` is a label, or an array of labels when more than one reaction
genuinely fits the same beat (kept as options, not flattened, so authored
variety survives — e.g. benkei's `"He's stopped asking whether you need
help. He just starts helping."` pairs with either `"Let him carry it"` or
`"Let him fuss"`).

`getRandomDialogueBeat(character, tier, variant, ctx)`
(`constants/characters.js`) draws one beat and returns `{ line, approach }` as
a unit — `encounters.js`'s `buildRoamDialogueMessage` calls it once instead of
calling `getRandomDialogueLine` and `getRandomApproachLabel` separately.

**Backward compatible by design, not by shim:** a tier left as a bare array of
strings behaves exactly as before — `getRandomDialogueBeat` picks the line,
finds no `approach` on it, and falls through to the old independent
`getRandomApproachLabel` pick. `getRandomDialogueLine` (still used by `/meet`,
which has no approach button) and `getRandomApproachLabel` are both untouched
and still exported; `getRandomDialogueLine` was only taught to unwrap a beat
object to its `.line` when a tier *has* been migrated, so `/meet` never
renders `[object Object]` for a migrated character. This means migration is
per-tier and can happen one character (or even one tier) at a time — nothing
elsewhere breaks while most of the roster is still unmigrated.

`dialogueWhen` / `SHARED_DIALOGUE_WHEN` conditional blocks work unchanged —
their entries may also be beats, and mix freely with a tier's base pool.
`approachWhen` / `SHARED_APPROACH_WHEN` are untouched; they still feed the
legacy independent-pick fallback.

## 3. Validation

`constants/validateContent.js`:

- A tier is "fully paired" when every entry in it (across every image
  variant, e.g. Jo's uniform/casual) is a beat. A fully paired tier having
  nothing under the legacy `approach[tier]` is no longer flagged as a gap.
- Each beat is checked directly: `line` must be non-empty; `approach` (or
  every entry of it, if an array) must be a non-empty string within
  `MAX_BUTTON_LABEL_LENGTH`.
- Everything that validated the old flat pools still runs, for whatever
  hasn't migrated yet.

## 4. What "migrate a character" means

Per tier: read the existing `dialogue[tier]` and `approach[tier]` arrays side
by side, match each line to the label(s) that actually belong to it (not by
position — the two are usually in different orders), fold matches into
`{ line, approach }`, and delete that tier from the `approach` block. Prefer
one clear pairing per line; reach for the `approach: [...]` array only when
two+ labels are genuinely interchangeable reactions to the same beat, not to
avoid making a call.

**This is authorial work, not a mechanical reshuffle** — do not script it.
It requires reading both pools and deciding what answers what.

**Don't force a pairing that isn't there.** `benkei.js`'s `spark` tier has 5
`dialogue` lines against 26 `approach` labels (the approach pool was already
expanded to the tier's pool-size target; the dialogue pool wasn't). Rather
than inventing 21 throwaway lines or deleting 21 already-written labels to
force a bijection, it was left as a legacy independent pool with a comment
explaining why, and flagged here as follow-up: `dialogue.spark` needs its own
expansion pass to the tier's target before it can pair with the `approach`
pool it already has.

## 5. Tracking progress

`scripts/dialogue-pairing-report.js` snapshots, per character and tier: the
raw `dialogue`/`approach` counts, how many `dialogue` entries are paired
beats, and the `dialogueWhen` paired/total split. `--json` emits that as data.
A published artifact, **Dialogue Pairing Tracker**
(https://claude.ai/code/artifact/76bbb275-91b1-4684-99aa-ea7e1ec2ee0a), reads
a snapshot of that data to show per-character/per-tier status at a glance,
plus an "at risk" list — a tier where `dialogue` and `approach` were expanded
to different sizes independently, 0% paired, so this exact bug is either
already live there or one independent edit away from being.

**A tier counts as meeting its target only once its PAIRED count reaches the
target** — matching raw counts between `dialogue` and `approach` is not
enough. `alan.spark` and `jo.spark` currently show why: `approach.spark` was
expanded to the full target (27) while `dialogue.spark` stayed at 5, 0%
paired — the same shape as the original benkei bug, just not yet caught. Read
the tracker before assuming a character "already has the lines" — a raw count
hitting the target and a tier actually being safe to draw from together are
different claims.

**To refresh the tracker:** run `node scripts/dialogue-pairing-report.js
--json`, replace the `const REPORT = {...}` data embedded in the artifact's
HTML, and republish to the same URL (pass that URL to the Artifact tool so it
updates in place rather than creating a new page).

## 6. Rolling out to the rest of the roster

Base `dialogue`/`approach` pools unmigrated (22 of 26 — every character
except benkei, alan, jo, and taiga): jin, kaito, lucas, tohma, leo, shohei,
subaru, zenji, haku, elias, mio, shion, jiro, yuri, ren, haru, towa, edward,
rui, lyca, ritsu, romeo.

Conditional `dialogueWhen`/`approachWhen` blocks: all 7 that have one are
migrated (§ Status). The other 19 have no conditional block at all — nothing
to migrate there; a `dialogueWhen` block added for one of them going forward
should be authored as beats from the start rather than as a parallel
`approachWhen`.

Do the base-pool rollout incrementally, character by character (or tier by
tier for a character whose pools are uneven like benkei's `spark`), reviewing
each one — not as a single mechanical sweep. A few things make certain files
slower than others:

- **`towa.js`** is `pmOnly` and carries a parallel `daytimeDialogue` /
  `daytimeApproach` pair for its non-evening lines — `getRandomDialogueBeat`
  already reads beats out of `daytimeDialogue` the same way, so the same
  per-tier migration applies there too.
