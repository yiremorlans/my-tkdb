# Spec: Negative affinity & the "Enemies to Lovers" path

Status: **design / not implemented**
Last updated: 2026-09-02

A second direction for the affinity number, for a small set of abrasive
characters — **Leo, Shion, Taiga, Romeo, Yuri, Ritsu** (`volatile: true`).

- These six have **no Neutral response**. Their 4th button is a **Cold** beat,
  live from the first meeting. Kind / Playful / Bold keep their normal positive
  values, so a volatile character can still be taken positive the ordinary way —
  but repeated Cold picks push affinity below zero.
- Below zero there are **two six-level ladders** that mirror the positive one in
  reverse, sharing their `min` values and their first three levels
  (**Frenemy → Rival → Adversary**). `affinity 0 → −1` sorts into Frenemy.
- The first three levels are reachable by anyone picking Cold. Crossing out of
  Adversary (`affinity ≤ TURN_OF_EVENTS_MIN`) makes the **next** `/roam` or
  `/meet` spawn a one-time **Turn of Events** encounter — unique narration, two
  choices, and which choice you make decides which deep ladder the last three
  levels come from:
  - **Accept** (favourable response) → the **Enemies to Lovers** ladder:
    **Wildfire / Consumed / Obsession**. Every response now drives affinity
    *more* negative. **Permanent, cannot be undone** — the encounter must say so
    before the choice commits.
  - **Reject** (hostile response) → the **Rejected** ladder:
    **Nemesis / Vendetta / Blood Feud**. Kind / Playful / Bold still thaw, so
    this is not permanent — a `'declined'` flag colours the character's dialogue
    forever, but they can be brought back toward neutral, and the Turn of Events
    can fire again later.

Every non-volatile character is completely untouched: they keep Neutral, and
their affinity floor stays `Stranger`.

---

## 1. How affinity moves, in each state

| State | `turn_state` | Kind / Playful / Bold | Cold (4th button) |
|---|---|---|---|
| **Positive** | `null` | normal `affinityByResponse` (`+2 / +1 / 0`) | volatile: **−2**; non-volatile: Neutral, `0` |
| **Negative pre-fork** | `null`, `affinity < 0` | still positive — this is how a character **thaws** back up | **−2** — this is how they sink |
| **Rejected** | `'declined'` | still positive — thaw is still possible | **−2** |
| **Enemies to Lovers** | `'enemies_to_lovers'` | **inverted**: `+2 → −2`, `+1 → −1`, `0 → 0` | **−1** |

**Cold weight.** The brief set Cold at `−1`. With the half-range dropped (§3),
the fork now sits at `−175` (the mirror of `Confidant`); at `−1` per Cold that's
~175 deliberate Cold picks to get there — roughly two months of always picking
Cold. Halving to **`−2` pre-fork / rejected is not too substantial**: it makes
the descent to the fork cost the same effort as the positive climb to
`Confidant` (~88 favourite-type picks). That symmetry is the point. On the EtL
track Cold drops back to `−1` — there the Kind/Playful/Bold inversion is the fast
lane, and Cold becomes the "still fighting it" slow burn, mirroring how Neutral
is the zero option on the positive side.

The EtL inversion is the whole mechanic of that track: every response drives
affinity **more negative**, so the EtL levels are a descent. Example: at
`affinity −200` on EtL, a Bold response (this character's `+2`) applies **−2** →
`−202`, toward the next EtL level.

Only Kind / Playful / Bold / Cold ever exist — **no 5th button is ever added.**
For volatile characters the 4th slot is Cold instead of Neutral; ordering,
styling, and the "one button per action row" layout are unchanged.

---

## 2. Feasibility summary

| Need | Already in place / small addition |
|---|---|
| Affinity that goes negative | `character_relationships.affinity` is a plain `INTEGER`, no `CHECK`; `updateAffinity` does `affinity + change`, no clamp. Only `getRelationshipLevel` floors at `Stranger` — that floor is what we replace. |
| A response that subtracts | For volatile characters, `RESPONSE_TYPES.NEUTRAL` is swapped for `RESPONSE_TYPES.COLD`; `getAffinityForResponse` returns `−2` (`−1` on the EtL track), or an inverted value for the other types on EtL. |
| Two negated ladders | New `turn_state` column (`null` / `'declined'` / `'enemies_to_lovers'`). Level resolution routes on `(affinity, turn_state, volatile)`; both ladders' `min` values are the positive ladder's, negated. |
| Turn of Events encounter | New branch in the `/roam` and `/meet` encounter builders when the crossing is detected; new `turn:<charId>:accept|reject` component handler in `app.js`, same shape as the existing `meet` / `roam` / `resp` handlers. |
| Unique dialogue & reactions | Same per-character `constants/dialogue/<id>.js` pools + a volatile-only reaction-line collection — see §7–8. Bulk of the work. |
| `/affinity` rendering | `renderHeartBar(ratio, fill)` is already generic on fill glyph + ratio. Pick fill / track / colour per stage. |

No new dependencies, no infra. One migration.

---

## 3. The ladders (positive `min` values, negated — no half-range)

`min` values live in `constants/game.js` and stay tunable.

| Positive (ref) | `min` | **Rejected path** | **EtL path** | shared `min` |
|---|---|---|---|---|
| Stranger | 0 | — | — | — |
| Acquaintance | 20 | **Frenemy** | **Frenemy** | `−1` |
| Friend | 50 | **Rival** | **Rival** | `−50` |
| Close Friend | 100 | **Adversary** | **Adversary** | `−100` |
| Confidant | 175 | **Nemesis** | **Wildfire** | `−175` |
| Devoted | 275 | **Vendetta** | **Consumed** | `−275` |
| Soulbound | 400 | **Blood Feud** | **Obsession** | `−400` |

- **Frenemy → Rival → Adversary** are shared and reached pre-fork by anyone
  picking Cold. **Frenemy** starts at `−1` (not `−20`) per the brief — the moment
  affinity is negative you're a Frenemy; every other level is an exact negation.
- `TURN_OF_EVENTS_MIN = −175` — the `Adversary →` boundary. Reaching it with
  `turn_state == null` fires the fork on the next encounter, so a player never
  actually resolves *into* the deep levels unresolved: they hover at Adversary
  until they Accept or Reject.
- After that, the deep three come from whichever fork was taken:
  `Nemesis / Vendetta / Blood Feud` (Reject) or `Wildfire / Consumed / Obsession`
  (Accept). Same spacing, same "deepest level has no next, ratio 1" rule as
  `Soulbound`.

### 3a. Rejected — its own track, one way out

`turn_state = 'declined'` is written on Reject and **never clears**.

**It is a self-contained track.** While `turn_state = 'declined'` and
`affinity < 0`, every level, every dialogue pool, and every response label comes
from the Rejected track's own content — **nothing is shared with the positive
ladder or the EtL track**, not even at the Frenemy / Rival / Adversary levels
(those get their own declined-flavour pools, distinct from the pre-fork
`friction` / `rivalry` / `enmity`). The character remembers the offer was made
and spat on, and everything they say carries it.

- **Descent.** Continued Cold picks (`−2`) sink the character down its own ladder
  past Adversary → **Nemesis → Vendetta → Blood Feud**. No cap. The Turn of
  Events does **not** re-fire during this descent — the choice was made.
- **The only way out is up.** Positive reactions (Kind / Playful / Bold, still
  `+2 / +1 / 0`) are the sole way to raise affinity. Thaw all the way to
  `affinity ≥ 0` and the character returns to the **positive** ladder at
  `Stranger` and its positive dialogue — a genuine reset of the relationship's
  direction. `turn_state` stays `'declined'` forever as a light flavour hook
  (the odd callback line — "we've done the enemies thing already"), but the
  bespoke Rejected content is only in play while `affinity < 0`.
- **Re-fire.** Once back to `affinity ≥ 0`, if the player later drives the
  character negative again and down to `≤ −175`, the Turn of Events fires a
  second time — a real second chance to Accept. Gated on
  `turn_low_watermark > −100` since the last decline (i.e. an actual climb out of
  the Rejected track happened), so it never re-spawns while they're still sunk in
  it.

### 3b. Enemies to Lovers — terminal

`turn_state = 'enemies_to_lovers'` is written on Accept (after a confirm step,
§7). All six levels resolve by `affinity`; response inversion is on. **No code
path sets `turn_state` away from this value** — it is the point of no return, and
the fork encounter must warn the player before it commits.

---

## 4. Level names

**Locked:**

| Position | Shared / Rejected / EtL |
|---|---|
| −1 | **Frenemy** (shared) |
| −50 | **Rival** (shared) |
| −100 | **Adversary** (shared) |
| −175 | Rejected: **Nemesis**  ·  EtL: **Wildfire** |
| −275 | Rejected: **Vendetta**  ·  EtL: **Consumed** |
| −400 | Rejected: **Blood Feud**  ·  EtL: **Obsession** |

Alternates, if any clash with a character's established voice:

- Frenemy — *Prickly · On Thin Ice · Thorn in Your Side · Sparring Partner*
- Rival — *Antagonist · Bad Blood · At Odds · Kept Score*
- Adversary — *Enemy · At War · Sworn Off · Hostile*
- **Nemesis** — *Sworn Enemy · Grudge · Marked · Enemy for Life*
- **Vendetta** — *Cold War · No Quarter · Warpath · Bad Blood (deep) · Blacklisted*
- **Blood Feud** — *Scorched Earth · Dead to Me · Salt the Earth · Nemesis Eternal · Point of No Return*
  (Blood Feud reads permanent but is mechanically thawable — pick *Scorched
  Earth* or *Dead to Me* if that framing matters.)
- Wildfire — *Caught · Ignition · Combustion · No Going Back*
- Consumed — *Devoured · Undertow · All-Consuming · Reckless*
- Obsession — *Fixation · Possessed · Ruinous · Yours Alone*

**Turn of Events** (the pivot beat, if surfaced as a named state):
*Breaking Point · The Last Straw · Flashpoint · Something Gives · Point of No
Return · Reckoning*.

### 4a. Emoji & colour tokens

Same three fields every `RELATIONSHIP_LEVELS` entry carries today: `emoji`
(trails the level name in text), `heart` (the filled bar cell), `color` (the
embed's left strip, a hex int). Positive ladder for reference ramps
purple → orange → pink → red → 🔥. The negative ladders each get their own ramp
so a glance at the strip colour says which track you're on.

**Shared negative — Frenemy → Rival → Adversary** (a souring ramp: grey → slate)

| Level | `emoji` | `heart` | `color` |
|---|---|---|---|
| Frenemy | 😒 | 🩶 | `0x9ca3af` cool grey |
| Rival | ⚔️ | 🩶 | `0x6b7280` slate |
| Adversary | 💢 | 🖤 | `0x4b5563` dark slate |

**Rejected deep — Nemesis → Vendetta → Blood Feud** (cold hatred: gunmetal → dried blood → near-black)

| Level | `emoji` | `heart` | `color` |
|---|---|---|---|
| Nemesis | 🗡️ | 🖤 | `0x3f3f46` gunmetal |
| Vendetta | 🩸 | 🖤 | `0x7f1d1d` dried blood |
| Blood Feud | 💀 | 🖤 | `0x450a0a` near-black crimson |

**EtL deep — Wildfire → Consumed → Obsession** (dangerous heat, deliberately *not*
the positive ladder's soft-pink romance ramp: ember → molten → blood-rose)

| Level | `emoji` | `heart` | `color` |
|---|---|---|---|
| Wildfire | 🔥 | ❤️‍🔥 | `0xea580c` ember |
| Consumed | 🌋 | ❤️‍🔥 | `0xb91c1c` molten crimson |
| Obsession | 🥀 | ❤️‍🔥 | `0x6b1d1d` blood-rose |

**Track banners** (the `/affinity` header line, §9) — `🖤` shared negative ·
`🗡️` Rejected · `❤️‍🔥` Enemies to Lovers.

**Swap-in alternates**

| Slot | Options |
|---|---|
| Frenemy emoji | 😒 · 🙄 · 😼 · ➖ |
| Rival emoji | ⚔️ · 🥊 · 🎭 |
| Adversary emoji | 💢 · 🗯️ · ⚡ |
| Nemesis emoji | 🗡️ · ☠️ · 🎯 |
| Vendetta emoji | 🩸 · ⛓️ · 🔪 |
| Blood Feud emoji | 💀 · 🥀 · ⚰️ · 🖤 |
| Wildfire emoji | 🔥 · 💥 · ⚡ |
| Consumed emoji | 🌋 · 🌪️ · 🕯️ |
| Obsession emoji | 🥀 · ⛓️ · 😈 · 💋 |
| Rejected bar cell | 🖤 (flat) · `💔→🖤→💀` (per-level progression) |
| EtL bar cell | ❤️‍🔥 (flat) · `🧡→❤️→❤️‍🔥` (per-level progression) |

`heart` must differ from the `🤍` track glyph (enforced by
`test/relationship-level.test.js`), so don't use 🤍 for any cell.

---

## 5. Data model

```sql
-- db/migrations/010_add_turn_state.sql
ALTER TABLE character_relationships
  ADD COLUMN IF NOT EXISTS turn_state TEXT
    CHECK (turn_state IN ('declined', 'enemies_to_lovers')),
  ADD COLUMN IF NOT EXISTS turn_resolved_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS turn_low_watermark INTEGER;  -- lowest affinity seen;
                                                        -- re-fire gate (§3a)
```

- `turn_state = NULL` → positive ladder for `affinity ≥ 0`; shared negative
  levels (Frenemy/Rival/Adversary) for `affinity < 0`; fork fires at
  `affinity ≤ −175`.
- `turn_state = 'declined'` → **permanent.** Rejected ladder for `affinity < 0`
  (all six levels), positive ladder for `affinity ≥ 0`; gates the fork, unlocks
  declined-flavour dialogue; re-fire per §3a.
- `turn_state = 'enemies_to_lovers'` → **permanent.** EtL ladder, response
  inversion on. Terminal.
- `getRelationship` / `getUserRelationships` already `select('*')` — new columns
  ride along with no query change.
- `/house` sums `affinity` per house — clamp each contribution to `≥ 0` so a
  grudge or an EtL descent can't drag a house total negative.

---

## 6. Level resolution refactor (`constants/game.js`)

`getRelationshipLevel(affinity)` today takes a bare number and is called that way
from `encounters.js`, `storage.js`, and tests. Keep that working.

- Add `REJECTED_LEVELS` and `ENEMIES_TO_LOVERS_LEVELS` — six entries each, the
  negated `min` values, first three entries identical (Frenemy/Rival/Adversary),
  last three differ by name only. Each entry carries `emoji` / `heart` / `color`.
- Add `TURN_OF_EVENTS_MIN = -175`.
- New `resolveLevel({ affinity, turnState, volatile })`:
  - `turnState === 'enemies_to_lovers'` → walk `ENEMIES_TO_LOVERS_LEVELS`.
  - `turnState === 'declined'` and `affinity < 0` → walk `REJECTED_LEVELS`.
  - `affinity < 0` (turnState null) → walk the shared first three, clamp to
    `Adversary` (the fork fires before anything deeper resolves).
  - else → `RELATIONSHIP_LEVELS` as today.
  - For the negated lists the walk compares "affinity ≤ min" and "next level" is
    the next-more-negative entry.
- `getRelationshipLevel(affinity)` becomes
  `resolveLevel({ affinity, turnState: null, volatile: false })` — unchanged for
  current callers.
- `getRelationshipProgress` gets the same entry point; on a negated ladder the
  ratio is `(level.min − affinity) / (level.min − nextLevel.min)`, clamped;
  deepest level → `ratio: 1`.
- `getDialogueTier` becomes `(levelName, turnState)` — the same level name maps
  to a different tier depending on the track (Adversary → `enmity` pre-fork,
  `nemesis` once `'declined'`). See §8a.

---

## 7. The Turn of Events flow

1. **Detection — at encounter build time.** In `buildRoamDialogueMessage` /
   `buildMeetSpawnMessage`, after the relationship read: if `character.volatile`,
   `affinity ≤ −175`, `turn_state !== 'enemies_to_lovers'`, and either
   `turn_state == null` or (`'declined'` and the §3a re-fire gate holds) → build
   the **Turn of Events** encounter instead of a normal one.
2. **The encounter.** Unique narration + art, two buttons:
   - `turn:<charId>:accept` — e.g. *"Let them in"*
   - `turn:<charId>:reject` — e.g. *"Twist the knife"*
   Narration and the Accept button state plainly that this is **permanent for
   this character and cannot be undone.**
3. **Accept is two-step.** `turn:<charId>:accept` swaps the message for a confirm
   prompt (*"There's no coming back from this. Sure?"*) with
   `turn:<charId>:accept:confirm` / `turn:<charId>:cancel`. Only `:confirm`
   writes `turn_state = 'enemies_to_lovers'` + `turn_resolved_at`.
4. **Reject is one step.** `turn:<charId>:reject` writes `turn_state = 'declined'`
   + `turn_resolved_at`; affinity untouched.
5. **Handler:** new `action === 'turn'` branch in `app.js`, alongside `meet` /
   `roam` / `resp`. Each choice replies with the opening beat of its ladder
   (Wildfire's first line, or Nemesis's).
6. **Idempotency.** After Accept, `turn_state` is terminal. After Reject, the
   §3a gate blocks an immediate re-spawn. If the player closes Discord mid-fork,
   detection still holds next encounter.

---

## 8. Dialogue & reactions (the long pole)

### 8a. Per-character pools — `constants/dialogue/<id>.js`, the six volatile only

| Level(s) | Dialogue tier | Track |
|---|---|---|
| Frenemy | `friction` | pre-fork only (`turn_state == null`) |
| Rival | `rivalry` | pre-fork only |
| Adversary | `enmity` | pre-fork only |
| *Turn of Events* | `turn` | the fork encounter |
| Frenemy, Rival | `spurned` | Rejected |
| Adversary, Nemesis | `nemesis` | Rejected |
| Vendetta, Blood Feud | `feud` | Rejected |
| Wildfire | `kindled` | EtL |
| Consumed | `consuming` | EtL |
| Obsession | `ruinous` | EtL |

Per character, per tier: `dialogue`, `temperamentDialogue`, `approach`, and
`responses` (`kind` / `playful` / `bold` / **`cold`** — no `neutral`). The `turn`
tier's `responses` are the Accept / Reject / confirm / cancel labels.

**The Rejected track is fully separate content (§3a).** Its three tiers
(`spurned` / `nemesis` / `feud`) cover all six of its levels and share nothing
with `friction` / `rivalry` / `enmity` or with the EtL tiers — a declined
character reads only these while `affinity < 0`, and reverts to the ordinary
positive tiers once `affinity ≥ 0`. Six volatile characters × (3 pre-fork + 1
fork + 3 Rejected + 3 EtL) = 10 new tiers each; this is the bulk of the authoring
work and the reason for the Leo-first vertical slice (§8e).

### 8b. Reactions — `constants/reactions.js`

The six volatile characters need a **unique reaction-line collection**, separate
from the shared roster `REACTION_LINES`:

- `outcomeFor` gains a `cold` outcome for the Cold pick; on the EtL track every
  non-zero `gain` is negative — map `−2 → 'love'` intensity, `−1 → 'like'`,
  `0 → 'flat'`, so a favourite-type pick still reads as the strongest beat, just
  a darker one.
- Add `VOLATILE_REACTION_LINES[register][outcome]` with registers for the shared
  negative levels, the Rejected deep levels, and the EtL levels. Per-character
  override slot kept open, same as the existing "archetype→bucket layer later"
  note in that file.

### 8c. Response generation — `constants/characters.js`

- `RESPONSE_TYPES.COLD = 'cold'`; for `character.volatile` the response set is
  `[KIND, PLAYFUL, BOLD, COLD]` (Cold takes Neutral's slot and style).
- `getAffinityForResponse(character, type, { turnState })`:
  - `COLD` → `−1` if `turnState === 'enemies_to_lovers'`, else `−2`.
  - `turnState === 'enemies_to_lovers'` → `−(affinityByResponse[type])` for
    kind / playful / bold.
  - otherwise unchanged.
- `generateCharacterResponses` gains `generateColdResponse` with an archetype
  fallback (Sadodere / Tsundere / Thugdere / Yandere / Kuudere).

### 8d. Validation — `constants/validateContent.js`

Extend `TIERS` / `RESPONSE_TIERS` **for volatile characters only** (non-volatile
must not be required to have `friction` etc., and must not carry a `cold` pool).
Run the `MAX_BUTTON_LABEL_LENGTH` (30) check over every new Cold / approach /
response / fork-button label — same hard-fail as today.

### 8e. Recommendation

Ship a vertical slice with **Leo** — every tier, every pool, reactions, art, the
`/affinity` colours, the fork flow end to end — then author the other five
against the frozen shape.

---

## 9. `/affinity` rendering

`renderHeartBar` unchanged — it fills with the current level's `heart` glyph
(§4a). Track cell stays `🤍`. Per stage:

| Stage | Bar cell (`heart`) | Strip `color` ramp | Bar direction | Banner line |
|---|---|---|---|---|
| Positive | existing hearts | existing (purple → 🔥) | toward next level | — |
| Negative pre-fork | 🩶 → 🖤 | `0x9ca3af` → `0x4b5563` (grey → dark slate) | fills as affinity **drops** toward the fork | `🖤 <level>` |
| Rejected | 🖤 | `0x3f3f46` → `0x450a0a` (gunmetal → near-black crimson) | toward the next Rejected level | `🗡️ Rejected — <level>` |
| Enemies to Lovers | ❤️‍🔥 | `0xea580c` → `0x6b1d1d` (ember → blood-rose) | toward the next EtL level | `❤️‍🔥 Enemies to Lovers — no going back` |

`getAvatarFilename` and the embed layout are untouched.

---

## 10. Other code touchpoints

- `encounters.js` — volatile response row builds `COLD` in the 4th slot;
  `buildRoamDialogueMessage` / `buildMeetSpawnMessage` branch to the Turn of
  Events encounter on detection; `disableComponents` already generic.
- `storage.js` / `db/supabase.js` — `recordResponse` passes `turn_state` into
  `getAffinityForResponse` and returns it; add `setTurnState(userId, charId,
  state)`; maintain `turn_low_watermark` on every write.
- `app.js` — new `action === 'turn'` branch (`accept` / `accept:confirm` /
  `cancel` / `reject`).
- `commands.js` — no new slash command; `/affinity` · `/roam` · `/meet` ·
  `/house` unchanged at the command layer.

---

## 11. Tests

- Shared negated levels: `−1 → Frenemy`, `−99 → Rival`, `−100 → Adversary`; with
  `turn_state = null`, `−300` still resolves to **Adversary** (cap).
- Rejected ladder: `turn_state = 'declined'`, `−175 → Nemesis`, `−300 →
  Vendetta`, `−450 → Blood Feud`.
- EtL ladder: `turn_state = 'enemies_to_lovers'`, `−300 → Consumed`.
- Non-volatile relationship never resolves below `Stranger`.
- Volatile response set: `[kind, playful, bold, cold]`, no `neutral`;
  `getAffinityForResponse(volatile, 'cold')` is `−2` pre-fork/declined, `−1` on
  EtL.
- EtL inversion: Bold on a `+2` character returns `−2`; the `0`-slot type
  returns `0`.
- Fork detection: fires at `affinity ≤ −175` with `turn_state = null`; does
  **not** fire once `'enemies_to_lovers'`; re-fires from `'declined'` only after
  the watermark shows a climb above `−100`.
- Accept needs the `:confirm` step to write `turn_state`; `cancel` leaves it
  `null`.
- Reject writes `'declined'` and it is **permanent** — a later thaw to
  `affinity ≥ 0` leaves `turn_state = 'declined'` (positive ladder resolves by
  affinity regardless).
- EtL is terminal: no code path clears `'enemies_to_lovers'`.
- Label length: every new label ≤ 30 chars (`test/validate-content.test.js`).
- `/house`: a negative / rejected / EtL relationship contributes `0`.

---

## 12. Rollout

1. **Constants + schema + resolver.** `REJECTED_LEVELS`,
   `ENEMIES_TO_LOVERS_LEVELS`, `TURN_OF_EVENTS_MIN`, migration 010,
   `resolveLevel`. `getRelationshipLevel(number)` behaviour unchanged; nothing
   user-visible yet.
2. **Cold response.** `RESPONSE_TYPES.COLD`, volatile response-set swap,
   `getAffinityForResponse` signature. Affinity can now go negative; `/affinity`
   renders the shared negative levels.
3. **Turn of Events.** Detection in the encounter builders, two-step Accept /
   one-step Reject, `turn:` handler, `turn_state` + watermark writes.
4. **Deep ladders live.** Response inversion, Rejected + EtL resolution,
   `/affinity` banner + colours. **Leo** dialogue + reactions vertical slice.
5. **Author the remaining five**, then polish: `validateContent` coverage,
   analytics (tag `turn_state` on `trackCharacterEngagement`), this doc →
   "applied".

---

## 13. Non-goals

- **No** negative path for non-volatile characters. They keep Neutral; their
  floor stays `Stranger`.
- **No 5th button, ever.** Volatile characters swap Neutral for Cold in the
  existing 4-slot layout.
- **Do not** make Kind / Playful / Bold negative anywhere except the EtL track,
  where the inversion is the defining mechanic.
- **No** passive affinity decay over time. Standing only moves on a response.
- **No** new slash command; no change to the `/roam` · `/meet` 3-hour cooldown.
- **Do not** provide any path out of `turn_state = 'enemies_to_lovers'`. It is
  permanent by design, and the fork encounter must warn the player first.
- **Do not** let a `'declined'` relationship re-spawn the Turn of Events without
  an intervening climb above Adversary.

---

## 14. Settled

1. Two negated ladders sharing `min` values and their first three levels — **no
   half-range**. Shared: Frenemy / Rival / Adversary. Rejected deep: Nemesis /
   Vendetta / Blood Feud. EtL deep: Wildfire / Consumed / Obsession.
2. Cold = **−2 pre-fork / rejected**, **−1 on EtL**. The halving is deliberate
   symmetry with the positive climb to `Confidant`.
3. Reject re-fires the Turn of Events, gated on an intervening climb above
   Adversary.
4. `turn_state = 'declined'` is **permanent** once set — a flavour flag for
   dialogue even after the relationship thaws positive.
5. Accept is two-step (confirm), given it is irreversible.

### Still open

- Exact `TURN_OF_EVENTS_MIN` — `−175` (Confidant mirror) assumed; could pull to
  `−100` (Close Friend mirror, fires straight out of Adversary) if the descent
  proves too long even at Cold `−2`.
- Final call on **Blood Feud** vs a less permanent-sounding name (*Scorched
  Earth* / *Dead to Me*), since that level is mechanically thawable.
- Whether the deep levels fold into the shared top-tier art / casual logic
  (`getImageVariant`) or get their own treatment.
