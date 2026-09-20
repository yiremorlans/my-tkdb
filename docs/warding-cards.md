# Spec: Warding cards

Status: **phase 1 shipped, phase 2 deferred** (as of 2026-09-20)

- **Phase 1 — content and rendering. Done.** The cards themselves
  (`constants/warding/`), the compositor (`composeWardingCard`), the three
  Components V2 builders (`encounters.js`), the `ward:` click routing
  (`app.js`) and the owner-only `/encdev warding` preview all exist and work.
- **Phase 2 — the pity system and the pull rates, deferred.** Nothing rolls
  for a warding card during `/roam` or `/meet`, and no pity counter is stored
  or read anywhere. A player cannot encounter a warding card today; the
  preview is the only way to see one. §9 is that phase's task list.

Last updated: 2026-09-20

Warding cards are a rare reward that can surface at the end of a `/roam` or
`/meet` encounter: instead of the normal background + character composite, the
player is shown a piece of dedicated warding art for that character, with its
own short scene and a three-way choice that always grants a flat affinity bump.
The content is one inlined dialogue beat (`line` / `approach` / `greeting` /
`responses`) — see §3.

The card content and pool logic already live in `constants/warding/` (one file
per character for solo cards, `shared.js` for multi-character cards, merged by
`index.js`). What this spec adds is: the trigger, the probability tuning, the
pity system, the flat reward, and the soft-rollout gate.

---

## 1. Where it fits in the flow

Both commands are unchanged up to the point the character is fixed:

- `/roam` draws one character uniformly from the roster (`buildRoamDialogueMessage`).
- `/meet` shows a 4-character picker and the player chooses one (`buildMeetSpawnMessage`).

After the character is fixed:

1. Compute `eligibleWardingCards(characterId, levelName)` — the character's
   written, unlocked cards (see §5, §6). If that pool is empty, skip everything
   below; the encounter proceeds normally and pity is untouched.
2. Decide **hit or miss**:
   - **Forced hit** if the player's pity counter is at 0 (see §4).
   - Otherwise **hit** with probability `WARDING_CHANCE` (0.10).
   - **Miss** otherwise → normal encounter, and the pity counter ticks down by 1.
3. On a hit: `pickWardingCardForCharacter` returns one card, uniform over the
   eligible pool. Showing it **refills pity to `WARDING_PITY`**.
4. Render the card as the three-step exchange in §3.

`/meet` and `/roam` share a single 3-hour cooldown (`commandLimits.js`), so a
player completes at most 8 encounters/day, realistically 2–5.

---

## 2. The pool: `characters` membership

The draw is by the card's `characters` array, not the filename. A card is in a
character's pool if `card.characters.includes(characterId)` — so a `rui` draw
can land on `Rui`, `Rui_2`, `Rui_Edward`, `Haku_Rui`, `Lyca_Edward_Rui`, …
Solo and shared cards are pooled together and the pick is uniform across the
whole pool.

Helpers in `constants/warding/index.js`:

| Function | Returns |
|---|---|
| `wardingCardsForCharacter(id)` | every card `id` appears on, written or not, gate or not — the raw view, for coverage tooling |
| `eligibleWardingCards(id, levelName)` | the above minus unwritten stubs (§5) minus `minLevel`-gated cards the player hasn't unlocked (§6) — **this is what the roll and pity use** |
| `pickWardingCardForCharacter(id, levelName, rng?)` | one card uniform from the eligible pool, or `null` |

---

## 3. Rendering: the dialogue beat, on card art

A warding card carries **one inlined dialogue beat** and fills the same render
slots `/roam` fills, with the same four field names a `constants/dialogue` beat
uses. A beat is a pool member drawn from a tier; a card is a single authored
moment bolted to one piece of art, so there are no tiers, no variants and no
arrays — the fields sit flat on the card:

```js
Rui: {
  file: "Rui.png",
  characters: ["rui"],
  title: "Just a Moment More",
  line: "\"...I've watched you leave it sitting there for an hour.\"",
  approach: "Hold his eyes across the bar",
  greeting: "*He leans on the bar...* \"Stay till close?...\"",
  responses: {
    kind:    { label: "Say you're staying till close", close: "..." },
    playful: { label: "Hold his gaze on purpose",      close: "..." },
    bold:    { label: "Say looking isn't enough",      close: "..." },
  },
}
```

Same three-step shape every `/roam` uses, so it clears Discord's 3s ack:

1. **Reply** — the card's `line` as plain text, plus **one button** labelled
   with the card's `approach`.
2. **On click** — image composition runs (`imageComposition.js` paints the
   card's `greeting` into a dialogue box drawn straight onto
   `assets/warding/<file>`; there is no background or character layer), and the
   art plus the three `responses` buttons are sent as a new plain (non-V2)
   message. The step-1 message stays, with its button disabled, as in `/roam`.
3. **On a pick** — the art message is edited to drop its buttons (the art
   stays), and that response's `close` is sent as a new V2 text message under
   it, in the slot a normal encounter gives `getReactionLine`.

| Render slot | `/roam` beat | warding card |
|---|---|---|
| step-1 reply text | `line` | `line` |
| step-1 button | `approach` | `approach` |
| painted into the image | `greeting` | `greeting` |
| response buttons | `responses[type]` | `responses[key].label` |
| text under the image | `getReactionLine()` | `responses[key].close` |

Two deliberate differences from a normal encounter response row:

- **Exactly three buttons — `kind`, `playful`, `bold`.** No `NEUTRAL` fourth
  button. `index.js` validates this at load: `responses` is either `{}`
  (unwritten stub) or exactly those three keys, each with a `label` and a
  `close`. There is no per-response `style`: the row uses `RESPONSE_STYLES`
  (`constants/game.js`) like every other response row.
- **The reward is flat.** Every one of the three grants `WARDING_AFFINITY_GAIN`
  (+2), regardless of the character or the pick. Only the `close` line differs.
  Normal encounters still vary the gain via `character.affinityByResponse`;
  warding does not, because a rare card is a reward, not a stat check.

**The rare-encounter tell.** Nothing in the card data marks it. The tell is
added at render, on the step-1 approach button: a ✨ on the button's `emoji`
field plus a button colour no other approach button uses (§3a). It rides on
`emoji` rather than inside `label` so it costs none of the 30 characters a
label is allowed — `Subaru_2`'s label is already 30.

It cannot go on the painted `greeting`: the dialogue box is drawn with
DejaVu Sans on a canvas, which has no emoji glyphs, so a ✨ there renders as an
empty box. The same goes for Discord markdown — `*italics*` paint as literal
asterisks, so `composeWardingCard` strips emphasis markers before wrapping the
text. Warding `greeting`s should be written plain, exactly as `/roam`
greetings already are.

Constants (`constants/warding/index.js`):

```
WARDING_CHANCE         = 0.10   // hit chance once the character has a live pool
WARDING_AFFINITY_GAIN  = 2      // flat, any of the three choices
WARDING_PITY           = 25     // pity counter start / refill value
```

---

## 3a. Components V2

Only two warding messages use Discord's V2 component tree (`IS_COMPONENTS_V2`,
`1 << 15`): step 1 (the `line` and the approach button) and step 3 (the
`close`). The art message between them is plain V1 — the composed PNG as an
attachment with the response buttons under it. Everything else in the app is
`content` + `embeds`. There is no `CONTAINER` and no accent bar anywhere.

**Why separate messages.** The flag is fixed at creation and **an edit cannot
drop it**, so V2 can only be kept off the art by never putting the art in a V2
message. Each step is therefore its own message: step 2 is a followup to the
step-1 click, and step 3's `close` is a followup to the response click, while
the step-2 message is edited only to remove its buttons
(`buildWardingPickedUpdate`).

**The rule that comes with V2**, pinned by `test/warding-card-render.test.js`:
a V2 message must carry **no `content` and no `embeds`**. Text is a
`TEXT_DISPLAY` component. Discord rejects the message otherwise. The step-1
ack that disables the approach button re-sends the whole V2 tree rather than a
`content` + rows pair (`disableWardingButtons`).

**The tell, in full:**

| | normal `/roam` | warding |
|---|---|---|
| step-1 button colour | `PRIMARY` (blurple) | `SUCCESS` (green) |
| step-1 button emoji | none | ✨ |
| response button colours | `RESPONSE_STYLES` | `RESPONSE_STYLES` (unchanged) |

The response buttons keep the normal colours on purpose: a warding pick means
the same thing a normal pick means. `SUCCESS` is the approach button's colour
because the other three styles are all spoken for on the response row that
follows, and green is the only one left that does not read as a warning.

**Builders** (`encounters.js`), parallel to the `/roam` three:

| Builder | Step |
|---|---|
| `buildWardingDialogueMessage(card)` | `line` + sparkle approach button — **returns `null`** if the card cannot be rendered; the caller falls back to the normal encounter and counts the roll as a miss (§4) |
| `buildWardingSpawnMessage(encounterId)` | art + three response buttons — plain V1 |
| `buildWardingPickedUpdate()` | the edit that removes the buttons from the art message |
| `buildWardingResultMessage(cardKey, responseKey, deltaLine)` | `close` as its own V2 text message |

`buildWardingResultMessage` is pure rendering: the affinity grant, the pity
refill and the errand signature belong to the caller, which passes what it
wrote as `deltaLine`. `buildWardingPickedUpdate` sends no `attachments` key at
all, so the edit leaves the uploaded card image on the message.

**Previewing it.** `/encdev warding` (owner only) renders a card straight to
the caller — `character:` draws from that character's written cards, `card:`
takes an exact key like `Rui_2`, neither draws at random. It grants nothing,
writes nothing, claims no cooldown and ignores pity; it exists so the render
can be looked at before the feature is wired into `/roam` and `/meet`.

---

## 4. Pity system

**One counter per player, shared across `/roam` and `/meet`.** Not per
character — see §7.

| Event | Effect on the counter |
|---|---|
| Start / any warding card shown (roll or pity) | set to `WARDING_PITY` (25) |
| Completed encounter, character had a live pool, no card shown | `-1` |
| Encounter featuring a character with no live pool (Benkei; any not-yet-authored character) | no change |
| Command invoked but not completed (picker opened, walked away) | no change |
| Counter at 0, next encounter with a live-pool character | **force a card**, then refill to 25 |
| Roll said hit, but the card could not be rendered | treated as a miss: `-1`, and the player gets the normal encounter |

**Nothing moves the counter until the encounter is completed and written.**
Deciding a hit does not refill it; rendering a card does not refill it. The
refill rides on the same write that records the player's response (§9.1),
which only a card the player actually saw and answered can reach. That is what
makes the last row safe rather than a hole: a hit that cannot be rendered
never reaches the write, so it cannot refill pity for a card nobody saw, and
the player is not charged an encounter for it either.

The case is not hypothetical — it is what `buildWardingDialogueMessage`
returning `null` means (§3a). Any caller that treats a decided hit as
"card shown" before the render succeeds reintroduces the hole.

No explicit "carry" flag is needed: the forced-hit check is gated on the
character having a live pool, so a counter sitting at 0 simply waits through any
Benkei / uncovered-character encounters until the next warding-capable one
consumes it.

**Why 25.** At `WARDING_CHANCE` = 0.10 the wait to a first card is geometric:

| Percentile | Encounters to first card | ≈ days @ 3/day | ≈ days @ 8/day |
|---|---|---|---|
| 50% | 7 | 2.3 | 0.9 |
| 75% | 14 | 4.7 | 1.8 |
| 90% | 22 | 7.7 | 2.9 |
| 95% | 29 | 10.0 | 3.8 |
| 99% | 44 | 15.3 | 5.8 |

Mean ≈ 10. A hard pity at 25 sits around the 92nd percentile:

| Pity N | P(a player ever hits pity) | Effective mean pulls | Effective rate |
|---|---|---|---|
| 20 | 12% | 9.0 | 11.1% |
| **25** | **8%** | **9.6** | **10.4%** |
| 30 | 5% | 9.9 | 10.1% |

So pity trims the unlucky tail (worst case ~3 days of maxed play, ~8 days at a
casual 3/day) while barely moving the average — the 10% still feels like 10%.
Lower N to ~20 for a tighter frustration ceiling; raise to ~30 for a guarantee
that almost never visibly fires.

Note: `/roam` picks the character randomly, so its real rate is
`0.10 × (live characters / 26)` until coverage is complete (§5). `/meet` lets
the player steer toward a covered character, so it trends to a flat 10% sooner.
The pity counter is the same either way.

---

## 5. Soft rollout

Ship the mechanic now; do not wait for all 26 characters. The fallback (empty
pool → normal encounter) is already the designed behaviour for an uncovered
character, so partial coverage is a supported state.

**The gate is per card, not per character:** `eligibleWardingCards` filters out
any card whose `responses` is still `{}`. The stub *is* the "not ready"
signal — no extra flag. As cards get authored they enter pools automatically,
more encounters start counting toward pity, and the rate climbs toward 10% on
its own. **No retuning of `WARDING_PITY` is ever needed.**

`index.js` logs coverage at load:

```
[warding] 30/72 cards written, 13 character(s) with a live pool
```

As of this writing: 13 characters live (edward, leo, mio, ren, rui, shion,
shohei, subaru, taiga, tohma, towa, yuri, zenji), all 16 `shared.js` cards
still stubs.

**Hold the public announcement** until every house has at least one covered
character — until then it's a stealth surprise, which fits its "rare
serendipity" design. Authoring priority: one solo card per remaining character
first (breadth), then shared cards as bonus (each shared card is harder to write
but lifts 2–3 pools at once).

---

## 6. `minLevel` (future)

No card uses `minLevel` today, so every written card is eligible for every
player. If gated cards are added later, a low-level player's eligible pool can
be empty even for a "covered" character — which correctly lowers their rate and
leaves their pity untouched for that character's encounters, same as an
uncovered character. Nothing else changes.

---

## 7. Why the pity counter is global, not per character

`/roam` fixes the character randomly (1/26 per roam). A per-character counter
would advance ~26× slower — roughly 720 roams to bring one character's counter
to 25 through `/roam` alone — so for any roam-driven or variety player every
per-character counter would sit near zero forever and pity would never fire.
The tail it exists to cap would stay uncapped.

A global counter measures the thing that actually frustrates players — "many
encounters, no warding card at all" — and a player chasing one specific
character's card already has the lever: repeat `/meet` on them. The global pity
then almost always pays out as that character anyway, because their encounters
are the only warding rolls happening.

Per-character pity only becomes worth it alongside explicit targeting (a focus
pick, warding banners) or if `/meet` stopped sharing a cooldown with `/roam`.

---

## 8. Benkei

Benkei has no warding art. `constants/warding/benkei.js` exports `{}` (a stub,
present only to keep `index.js`'s import list one-per-character). He never enters
a pool and never counts toward pity — a `/roam` that draws Benkei is just a
normal encounter. If he gets art later, `wardingCardWritten` picks it up with no
code change.

---

## 9. Phase 2: pity and pull rates (deferred, not started)

**This is the whole of what is left, and none of it is built.** Phase 1 gave
warding cards content and a render; phase 2 is what makes them *happen* to a
player — the roll during `/roam` and `/meet`, the pity counter behind it, and
the affinity it pays out. Until it lands, `/roam` and `/meet` are untouched by
any of this, and a warding card is reachable only through `/encdev warding`.

Deliberately deferred on 2026-09-20 rather than left half-wired: the roll and
the counter are the part that touches every player's encounters and the
database, so it is its own piece of work rather than a tail on the rendering.
Phase 1 is safe to sit in production in the meantime, because nothing in the
player-facing commands reaches it.

1. **DB:** one integer per player for the pity counter — a `warding_pity`
   column on the existing per-user relationship/limits table (or its own tiny
   table). Default `WARDING_PITY`. Decrement / refill in the same write that
   records the encounter response, for the same atomicity reasons
   `claimCommandUse` has.
2. **`/roam` (`buildRoamDialogueMessage`):** after the character draw, call
   `eligibleWardingCards`; if non-empty, read pity, decide hit/miss/forced,
   and on a hit branch to a warding message builder instead of the normal
   dialogue message. Cache the drawn card with the encounter like the normal
   spot/character payload. **If `buildWardingDialogueMessage` returns `null`,
   carry on and build the normal encounter** — the hit is spent as a miss, and
   since pity only moves at the response write (§4) nothing else needs undoing.
3. **`/meet` (`buildMeetSpawnMessage`):** same decision after the player picks.
4. ~~**Warding message builders.**~~ **Done** — see §3a. The three builders,
   `composeWardingCard`, the `ward:` click routing in `app.js` and the
   `/encdev warding` preview all exist. What is NOT done is everything that
   touches state: the routing grants no affinity, refills no pity, claims no
   cooldown and signs no errand. That work lands in the `ward:resp` branch,
   where `buildWardingResultMessage`'s `deltaLine` is filled in.
5. **Response handler:** a `custom_id` namespace for the warding choice (e.g.
   `ward:<characterId>:<key>`), granting `WARDING_AFFINITY_GAIN` flat, refilling
   pity, and going through `claimCommandUse` on the same `roam`/`meet` cooldown
   the normal `resp:` path uses. Errand signatures (`maybeSignErrandTarget`)
   should still fire — a warding encounter is still a meeting.
6. **Miss path:** wherever a warding-capable encounter completes without a card,
   decrement pity in the same response write.
7. **Tests:** pool membership incl. shared cards; the written/`minLevel` gates;
   pity decrement / refill / forced-hit; flat reward; the 3-key validation
   throwing on a 4th option.
