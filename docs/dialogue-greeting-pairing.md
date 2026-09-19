# Pairing a beat's payoff `greeting` to its `line`/`approach`

**Status:** mechanism shipped (2026-09-17), diverging from §2 in one
deliberate way — see the note there. Yuri was the pilot, not Benkei
(contrary to §4's suggestion) — all six tiers, including `spark`, both
`greeting` and the `responses` override from §2a. Benkei followed the same
day: `new`/`known`/`warm`/`close`/`bound` migrated first, with `spark`
initially left legacy for the same reason `dialogue`/`approach` pairing
skipped it (`approach.spark` was already expanded past `dialogue.spark`, no
clean bijection) — a later pass the same day closed that gap by expanding
`dialogue.spark` itself to the full 27-line target and pairing it too, so
Benkei ended up with every tier fully migrated and its `temperamentDialogue`,
`approach`, and `responses` pools removed entirely (nothing left over).

Jo migrated next (same day), in two passes like Benkei: pass 1 did
`new`/`known`/`warm`/`close`/`bound`, initially leaving `spark` legacy — same
`approach.spark` (27) vs. `dialogue.spark` (5) gap Benkei had before its own
follow-up pass. Jo's `dialogue` pools are variant-keyed (`uniform`/`casual`,
his two illustrated genders) — `greeting` and `responses` were authored once
per beat index and applied identically to both variants, since
`temperamentDialogue` and `responses` are shared, pronoun-neutral pools not
split by variant. Much of `temperamentDialogue.warm` turned out to duplicate
`dialogue.warm` almost line-for-line at the same index (both pools were
independently expanded to the same 18-line target covering the same scenes),
so only 7 of 18 found a non-redundant payoff pairing; the other 11 were left
as fallback rather than forced. `known`/`warm` had no pre-existing
`responses[type][tier]` pool to draw from at all (Jo's old `responses` object
only ever had `new`/`spark`/`close`/`bound` keys), so every `known`/`warm`
beat's `responses` is freshly authored rather than moved.

Pass 2 (user-directed, matching Benkei's precedent): `spark` was closed too,
same method — every one of the 27 existing `approach.spark` labels, all 5
existing `temperamentDialogue.spark` lines, and all 28 existing
`responses.*.spark` labels were placed onto a beat (temperament placed by fit
first, per the user's explicit instruction, before anything new was
authored) before the remaining ~17 beats and their greetings/responses were
authored net-new. `approach`, `temperamentDialogue.spark`, and the `spark`
key under every `responses` type are now gone from `jo.js` — nothing was left
over. `temperamentDialogue` and `getTemperamentGreeting` still work exactly
as before for any beat that hasn't been paired (other characters entirely) —
migration remains per-beat, not a mechanical sweep.

Pass 3 (user-directed, 2026-09-18): Jo's residual `temperamentDialogue`
(new 2, known 2, warm 11, bound 1) and the leftover `responses.*.close/bound`
labels (8) were placed onto beats and both objects deleted, so `jo.js` now
ends in the same state as `benkei.js`/`yuri.js` — every one of the 15 beats
per variant that lacked a `greeting` has one. Because the `warm` pool had
duplicated `dialogue.warm` line-for-line, most lines were trimmed to their
non-restating half or cross-placed onto a different beat that they answer
better; `temperamentDialogue.new`'s two lines were verbatim copies of
`dialogue.new` beat lines and were not placed as greetings.

Pass 4 (user-directed, 2026-09-18): the same residual-placement sweep for the
19 characters still carrying a `temperamentDialogue` object — alan, elias,
haku, haru, jin, jiro, kaito, leo, lucas, lyca, mio, ritsu, rui, shion,
shohei, subaru, taiga, tohma, zenji — done one character at a time. Every
leftover line was placed onto the beat it best answers (preferring a beat
with no `greeting` yet; otherwise as a second array option next to an
existing one), and the object was deleted from each file. No
`temperamentDialogue` object exists in any character file now, so
`getTemperamentGreeting` only ever serves the `"..."` default for a beat that
has no `greeting`. Two calls worth knowing: (a) `shion`'s one `new` leftover
("So you're still alive...") restated `dialogue.known[1]` almost verbatim, so
it was dropped rather than placed; (b) `alan.spark` had to gain paired
`approach` labels to carry a `greeting` at all (`validateContent` requires
every object-form beat to have an `approach`), so all 27 legacy
`approach.spark` labels were distributed across the 5 spark beats as
interchangeable options and the top-level `approach` object was removed —
`alan.spark` still has no per-beat `responses` and is still 5 lines against
the 27-line target.

---

## 1. The problem

`/roam` is a two-step reveal, and the two steps are drawn from pools that
don't know about each other:

1. `buildRoamDialogueMessage` (`encounters.js:334-335`) draws a **beat** —
   `{ line, approach }`, via `getRandomDialogueBeat` — and shows `line` as the
   ephemeral pre-message, with `approach` as the button that answers it.
2. When the player clicks `approach`, `buildRoamSpawnMessage` composes the
   payoff image using `temperament`, a line independently drawn from
   `temperamentDialogue[tier]` by `getTemperamentGreeting`
   (`characters.js:1299`) — a function whose own doc comment says it is
   "driven only by the character's temperament tier — **never** by time,
   location, or event." It has no idea which beat the player just read or
   which `approach` they picked.

So the player reads beat A, picks the approach that answers beat A
specifically, and the payoff caption on the actual encounter image can be an
unrelated line B. `/meet` doesn't have this problem — it only ever draws one
line (`getRandomDialogueLine`) and uses it directly as the image caption, no
second independent draw.

This is the same shape of bug `docs/dialogue-approach-pairing.md` fixed
between `dialogue` and `approach`: two pools, tiered identically, expanded to
the same `DIALOGUE_POOL_TARGET_BY_TIER` targets (`game.js:191-205` — the
comment there says outright that `approach` and `temperamentDialogue` are
"both tiered identically to `dialogue`"), drawn independently. A flat 5-line
pool per tier made an incongruous pair rare; a `bound` tier with 46 lines in
one pool and 46 unrelated lines in the other makes it the common case.

## 2. The fix: extend the beat with an optional `greeting`

A `dialogue[tier]` beat gains a third, optional field:

```js
dialogue: {
  known: [
    {
      line: 'He starts to say "back when I was advising" and catches\n        himself halfway through, looking sheepish about it.',
      approach: "Ask what he almost said",
      greeting: "\"...You weren't supposed to hear that part.\"",
    },
    {
      line: "The cat lets you scratch behind her ears now. He watches like\n        it's the highest honor she's ever handed out.",
      approach: "Scratch the cat's ears",
      // no greeting yet — falls through to the independent temperamentDialogue draw
    },
  ],
},
```

Like `approach`, `greeting` may be a single string or an array of
interchangeable options when more than one existing `temperamentDialogue`
line genuinely fits the same beat.

`getRandomDialogueBeat` returns `greeting` (or `null`) alongside `line` and
`approach`. `buildRoamDialogueMessage` caches it the same way it caches
`temperament` today (`encounters.js:344-352`); `buildRoamSpawnMessage` prefers
the cached `greeting` when present and only calls `getTemperamentGreeting` as
the fallback when the drawn beat didn't have one.

**Backward compatible by design, not by shim** — same guarantee the
`approach` pairing gave: a beat with no `greeting` behaves exactly as it does
today for `/roam`, an independent draw from whatever's left in
`temperamentDialogue[tier]`. `getTemperamentGreeting` stays exported and
untouched. Migration is per-beat and can happen one character (or one tier)
at a time.

### `/meet` gets the response-pairing benefit, deliberately NOT the caption one

**Shipped, diverging from the plan above by explicit decision:** `/meet`
keeps rendering `dialogue.line` as its caption — never `greeting`. That was a
deliberate call, not an oversight: `/meet` is the "just show me who's there"
command with no pre-message step to build anticipation for, and `.line` is
already written to work as a self-contained caption, where a `greeting` line
is written to answer a `line`/`approach` the player already read in `/roam`'s
two-step reveal. Showing a beat's `greeting` on `/meet` — with no prior line
to answer — would read like a non sequitur half the time. `/meet` still
avoided the *other* bug this doc exists to fix, though: previously it drew
`.line` and its four response-button labels from two independent pools (the
same disjointedness `greeting` fixes for `/roam`'s caption). That part is
fixed.

`/meet` (`buildMeetSpawnMessage`, `encounters.js`) used to call
`getRandomDialogueLine`, which did the same pool resolution as
`getRandomDialogueBeat` (same `pmOnly`/`dialogueWhen`/variant handling) but
kept only `.line`, discarding everything else — including, once beats gained
a `responses` field (see §2a below), whichever response-button overrides the
drawn beat carried. That function is gone. In its place, the shared
entry-pick was factored out of `getRandomDialogueBeat` into a private
`pickDialogueEntry(character, tier, variant, ctx)` — the pool resolution,
`pmOnly`/`dialogueWhen` handling, and `pickRandom`, with no opinion on
approach, greeting, or responses — and `/meet` got its own thin wrapper over
it, `getRandomDialogueEntry`, returning `{ line, responses }` from that same
single pick (never a second, independent draw — the reason this was worth
doing at all, not any meaningful performance concern):

```js
// getRandomDialogueBeat, unchanged in shape, now delegates entry-picking:
export function getRandomDialogueBeat(character, tier, variant = null, ctx = {}) {
  const entry = pickDialogueEntry(character, tier, variant, ctx);
  if (!entry) return { line: "...", approach: pickRandom(APPROACH_LABEL_FALLBACK), greeting: null, responses: null };
  const { line, approachOptions, greetingOptions, responses } = entry;
  const approach = approachOptions
    ? pickRandom(approachOptions)
    : getRandomApproachLabel(character, tier, variant, ctx); // only /roam pays for this
  const greeting = greetingOptions ? pickRandom(greetingOptions) : null;
  return { line, approach, greeting, responses };
}

// /meet's draw: same beat, minus the approach/greeting resolution it never
// renders — its caption stays `.line`, on purpose (see above).
export function getRandomDialogueEntry(character, tier, variant = null, ctx = {}) {
  const entry = pickDialogueEntry(character, tier, variant, ctx);
  if (!entry) return { line: "...", responses: null };
  return { line: entry.line, responses: entry.responses };
}
```

`test/dialogue-beat-pairing.test.js` covers `getRandomDialogueEntry`
directly, including a fixture case asserting `responses` always matches
whichever beat's `line` came back in the same call — the guarantee the whole
refactor exists for.

**This only changes where response-button labels come from, nothing else
about `/meet`.** `responseActionRow` still renders the same four buttons —
it now also accepts an optional `beatResponses` argument (`/roam` and `/meet`
both pass their drawn beat's `responses`; `null` falls through to the normal
per-tier pool, unchanged from before). "`/meet` never renders a button" above
refers only to the `/roam`-exclusive **approach** button (the "step forward"
button on `/roam`'s pre-message, which `/meet` has no equivalent step for) —
not to the response buttons, which both commands show identically, and which
now both prefer the drawn beat's own labels first.

### 2a. Response-button pairing: `responses` on the beat

The same disjointedness `greeting` fixes for the payoff caption also affects
the four response buttons (kind/playful/bold/neutral): they were drawn from
a flat per-tier pool, independent of which beat was shown, so a button could
reference a prop or theme from a completely different beat. A beat may now
carry an optional `responses: { kind, playful, bold, neutral }` field
(each optional; a string or an array of interchangeable options), consulted
by `generateCharacterResponses`/`responseLabel` before the normal per-tier
pool for whichever types it doesn't override. Same "move, don't copy, don't
force" authoring rule as `greeting` (§3 below) — and the same hard
constraint the greeting migration didn't have to worry about:
`validateContent.js` throws if a `responses[type][tier]` array is ever fully
emptied, so at least one generic fallback must stay behind per type/tier even
if every remaining beat gets a bespoke label eventually.

## 3. What "migrate a character" means

Per tier: read the existing `dialogue[tier]` beats and the tier's
`temperamentDialogue[tier]` pool side by side, and decide — line by line —
which temperament line(s) actually answer which beat. Move (don't copy) a
matched line out of `temperamentDialogue[tier]` and onto that beat's
`greeting`. Leave a temperament line in the shared pool if it's generic enough
to fit plausibly under any beat in that tier (a pure mood/expression line with
no specific referent) rather than force it onto one.

**This is authorial work, not a mechanical reshuffle** — do not script it. It
requires reading both pools and judging what answers what, exactly as the
`approach` pairing did.

**Don't force a pairing that isn't there.** If a tier's `dialogue` pool and
`temperamentDialogue` pool were expanded unevenly (one already at the tier's
target, the other still at the 5-line default — check the pairing tracker's
raw counts before assuming otherwise), leave the gap as an independent legacy
pool with a comment explaining why, rather than inventing throwaway greetings
or deleting already-written temperament lines to force a bijection. Note it
as follow-up instead.

**A useful property going in:** because `dialogue` and `temperamentDialogue`
already share the same per-tier target (`game.js:191-205`), a character whose
both pools are fully grown to target already has matching counts at every
tier (`new: 5, known: 13, warm: 18, spark: 27, close: 38, bound: 46`) — a
clean 1:1 assignment isn't asking for more total lines than the existing
sizing targets already call for. It's a reorganization of content that's
mostly already written, not a new authoring pass on top of the dialogue/
approach one.

## 4. Suggested pilot

Benkei is the natural first character: he's already the `dialogue`/`approach`
pairing pilot (`new`/`known`/`warm`/`close`/`bound` migrated), so his beats
already exist in the `{ line, approach }` shape and only need `greeting`
added — no separate beat-authoring pass first. Confirm `benkei.js`'s
`temperamentDialogue` tiers are populated at or near target before starting
(check the pairing tracker's raw counts, not just that the key exists).

**Done (2026-09-17):** migrated on the same day as Yuri, after the fact, in
two passes. First pass: `new`/`known`/`warm`/`close`/`bound` all carry
`greeting` and `responses` on every beat (20/20, 52/52, 72/72, 20/20, 20/20
via `node scripts/response-pairing-report.js`). `new`/`close`/`bound` paired
1:1 against `temperamentDialogue`, fully depleting those tiers. `known`/`warm`
initially left a small residual pool (1 and 4 lines) where nothing had a
genuine match — on user request, those were force-placed onto the
next-best-fit beat instead (some as a second `greeting` array option
alongside an already-good match, e.g. `known[1]`'s "let me carry it" beat
carrying both temperament lines about him insisting on carrying things).

Second pass, also on request: `spark` was NOT left legacy after all — its
pre-existing size gap (`approach.spark` already at the 27-line target,
`dialogue.spark` still 5) was closed by authoring 22 new `dialogue.spark`
lines, each paired to one of the 22 previously-unpaired `approach.spark`
labels (all 27 original approach labels now live on a beat), reusing the
existing 5 dialogue lines against the 27 approach pool and the 5
`temperamentDialogue.spark` lines for `greeting`, then authoring 22 new
greetings for the rest. `responses.spark`'s existing 28 labels (7 per type)
were redistributed across the 27 beats' best-fit slots, with ~80 new labels
authored for the remainder. Confirmed via `dialogue-pairing-report.js`
(benkei.spark now 27/27, hitting `DIALOGUE_POOL_TARGET_BY_TIER` for the
first time) and `response-pairing-report.js` (benkei.spark 108/108).

With every tier fully paired, `temperamentDialogue`, the top-level `approach`
object, and the top-level `responses` object are all gone from `benkei.js`
entirely (same end state as `yuri.js`) — nothing left for
`getTemperamentGreeting`/`getRandomApproachLabel`/`responseLabel` to fall
back to, except `dialogue.warm[4]` ("remembers exactly what you asked..."),
which genuinely has no `greeting` match and now falls through to
`getTemperamentGreeting`'s `"..."` default on an empty pool — a real (tiny)
UX gap worth another look, not a bug in the migration.

`validateContent()` and `npm test` both pass (316/316); benkei's warnings are
now the exact same shape yuri.js's are post-migration ("no temperamentDialogue
— greets with '...'", "no kind/playful/bold/neutral label — using archetype
default") — a known gap in `validateContent.js` (see §5) rather than a
defect. Caught and fixed 5 over-30-char `responses` labels by hand (ad hoc
Node script, since `validateContent.js` doesn't check beat-level `responses`
yet) before they'd have shipped silently — do this check by hand for the next
character too.

## 5. Validation (not yet written)

`constants/validateContent.js` currently only checks that
`content.temperamentDialogue` exists at all (`validateContent.js:591-593` —
"has no temperamentDialogue — greets with '...'"). That check needs to
survive migration (it's still meaningful for the shrinking fallback pool) and
gain a beat-level check to match the existing `approach` one
(`validateContent.js:570-585`): each `greeting`, or every entry of it if an
array, must be a non-empty string. No "fully paired" tracking exists yet for
`greeting` the way `tierIsFullyPaired` does for `approach` — that would need
extending, or a parallel helper, before a tracker can report on it
meaningfully.

## 6. Tracking progress

`scripts/dialogue-pairing-report.js` and the published **Dialogue Pairing
Tracker** artifact currently report `dialogue`/`approach` pairing only. Once
`greeting` support ships, both need a third dimension — raw
`temperamentDialogue` counts and how many beats carry a `greeting` — using
the same "paired count meets target, not raw count" rule §5 of the approach
doc established: a tier with `temperamentDialogue` expanded to full target but
0% of its beats carrying a `greeting` is exactly the bug this migration
exists to prevent, and should be flagged as "at risk" the same way an
unevenly-expanded `dialogue`/`approach` pair is today.

## 7. Rolling out to the rest of the roster

Not started for any character. Sequence: ship the mechanism (§2) and
validation (§5) first, behind no content change, then migrate the pilot (§4)
and confirm `/roam`'s payoff image reads coherently against its pre-message
for a range of tiers before continuing. After that, roll out incrementally —
character by character, prioritizing whichever characters get seen most in
`/roam` — the same way the `dialogue`/`approach` pairing did, not as a single
mechanical sweep.
