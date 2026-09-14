# Pairing a beat's payoff `greeting` to its `line`/`approach`

**Status:** proposed, not started. No code in this doc has shipped yet — this
is the plan to follow when the work begins. Nothing here is required to ship
other content; `temperamentDialogue` and `getTemperamentGreeting` keep working
exactly as they do today until a tier is actually migrated.

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

### `/meet` gets the same benefit, with no pool of its own

`/meet` (`buildMeetSpawnMessage`, `encounters.js:449-489`) currently calls
`getRandomDialogueLine`, which does the same pool resolution as
`getRandomDialogueBeat` (same `pmOnly`/`dialogueWhen`/variant handling) but
keeps only `.line`, discarding everything else. It should draw the whole beat
and prefer `greeting` — but not via `getRandomDialogueBeat` itself, since
that always resolves an `approach` too (falling through to
`getRandomApproachLabel`'s own pool walk for an unmigrated tier) that `/meet`
never renders. Instead, factor the shared entry-pick out of
`getRandomDialogueBeat` into a private `pickDialogueEntry(character, tier,
variant, ctx)` — the pool resolution, `pmOnly`/`dialogueWhen` handling, and
`pickRandom`, with no opinion on approach or greeting — and give `/meet` its
own thin wrapper over it:

```js
// getRandomDialogueBeat, unchanged in shape, now delegates entry-picking:
export function getRandomDialogueBeat(character, tier, variant = null, ctx = {}) {
  const entry = pickDialogueEntry(character, tier, variant, ctx);
  if (!entry) return { line: "...", approach: pickRandom(APPROACH_LABEL_FALLBACK), greeting: null };
  const { line, approachOptions, greetingOptions } = entry;
  const approach = approachOptions
    ? pickRandom(approachOptions)
    : getRandomApproachLabel(character, tier, variant, ctx); // only /roam pays for this
  const greeting = greetingOptions ? pickRandom(greetingOptions) : null;
  return { line, approach, greeting };
}

// /meet's draw: same beat, minus the approach resolution it never renders.
export function getRandomDialogueGreeting(character, tier, variant = null, ctx = {}) {
  const entry = pickDialogueEntry(character, tier, variant, ctx);
  if (!entry) return "...";
  return entry.greetingOptions ? pickRandom(entry.greetingOptions) : entry.line;
}
```

`/meet` calls `getRandomDialogueGreeting`. Its fallback is the beat's own
`line` — never an independent `getTemperamentGreeting` draw — so `/meet`
never reads `temperamentDialogue` at all, before or after migration; that
pool stays reserved for `/roam`'s transitional fallback. Because the fallback
value is exactly what `getRandomDialogueLine` was already extracting, this
ships as a zero-visible-diff no-op for every unmigrated beat: `/meet`'s
caption doesn't change until the beat it draws actually has a `greeting`.

**This makes `getRandomDialogueLine` dead code.** It was only ever called
from `/meet` (`encounters.js:475`) — `getRandomDialogueGreeting` replaces
that call outright. `test/dialogue-beat-pairing.test.js` calls it directly to
assert a migrated beat unwraps to its `.line` and never renders
`[object Object]`; that assertion should move onto
`getRandomDialogueGreeting` (same guarantee, plus the `greeting` case) rather
than keep exercising a function nothing calls anymore. Remove
`getRandomDialogueLine` once that test is migrated — don't leave it exported
with no callers.

**This only changes the caption's source, nothing else about `/meet`.**
`/meet` still renders its four response choices exactly as today —
`responseActionRow(character.id, false, tier, 'meet', dialogueCtx)`
(`encounters.js:486`) is untouched. "`/meet` never renders a button" above
refers only to the `/roam`-exclusive **approach** button (the "step forward"
button on `/roam`'s pre-message, which `/meet` has no equivalent step for) —
not to the response buttons, which both commands show identically.

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
