# Spec: Warding cards

Status: **planned** (scaffolding in `constants/warding/`, not wired into any command)
Last updated: 2026-09-08

Warding cards are a rare reward that can surface at the end of a `/roam` or
`/meet` encounter: instead of the normal background + character composite, the
player is shown a piece of dedicated warding art for that character, with its
own short scene and a three-way choice that always grants a flat affinity bump.

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
4. Render the card as a two-message exchange (§3).

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

## 3. Rendering: two messages, three buttons, flat +2

Same two-message shape every `/roam` uses, so it clears Discord's 3s ack:

1. **Reply** — the card's `dialogue` hook as text, plus **one button** labelled
   with the card's `approach` line.
2. **On click** — image composition runs (`imageComposition.js` draws the
   dialogue box straight onto `assets/warding/<file>`; there is no background or
   character layer), and the message is edited to the art plus the `choice`.

The `choice` block mirrors a `bondScenes` choice, with two deliberate
differences from a normal encounter response row:

- **Exactly three buttons — `kind`, `playful`, `bold`.** No `NEUTRAL` fourth
  button. `index.js` validates this at load: `choice.options` is either `[]`
  (unwritten stub) or exactly those three keys.
- **The reward is flat.** Every one of the three grants `WARDING_AFFINITY_GAIN`
  (+2), regardless of the character or the pick. Only the `close` line differs.
  Normal encounters still vary the gain via `character.affinityByResponse`;
  warding does not, because a rare card is a reward, not a stat check.

Constants (`constants/warding/index.js`):

```
WARDING_CHANCE         = 0.10   // hit chance once the character has a live pool
WARDING_AFFINITY_GAIN  = 2      // flat, any of the three choices
WARDING_PITY           = 25     // pity counter start / refill value
```

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
any card whose `choice.options` is still `[]`. The stub *is* the "not ready"
signal — no extra flag. As cards get authored they enter pools automatically,
more encounters start counting toward pity, and the rate climbs toward 10% on
its own. **No retuning of `WARDING_PITY` is ever needed.**

`index.js` logs coverage at load:

```
[warding] 23/72 cards written, 9 character(s) with a live pool
```

As of this writing: 9 characters live (rui, shion, shohei, subaru, taiga,
tohma, towa, yuri, zenji), all 16 `shared.js` cards still stubs.

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

## 9. Open implementation tasks

Nothing below is built yet.

1. **DB:** one integer per player for the pity counter — a `warding_pity`
   column on the existing per-user relationship/limits table (or its own tiny
   table). Default `WARDING_PITY`. Decrement / refill in the same write that
   records the encounter response, for the same atomicity reasons
   `claimCommandUse` has.
2. **`/roam` (`buildRoamDialogueMessage`):** after the character draw, call
   `eligibleWardingCards`; if non-empty, read pity, decide hit/miss/forced,
   and on a hit branch to a warding message builder instead of the normal
   dialogue message. Cache the drawn card with the encounter like the normal
   spot/character payload.
3. **`/meet` (`buildMeetSpawnMessage`):** same decision after the player picks.
4. **Warding message builders:** `buildWardingDialogueMessage` (reply +
   `approach` button) and `buildWardingSpawnMessage` (composite + `choice`
   row), paralleling `buildRoamDialogueMessage` / `buildRoamSpawnMessage`.
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
