# Spec: Gala Reinstatement Arc

Status: **design / not implemented**
Last updated: 2026-10-22

A new mission type gated behind the top Inspector rank, **Chancellor's Right
Hand** (`constants/missions.js` `INSPECTOR_RANKS`, 320 points). When a player
reaches it, the Chancellor summons them and asks which house they believe
deserves the **Laurel Crown**. The player makes that case, and then works a
one-time, multi-stage arc of `gala` missions toward that house winning it at
the reinstated Gala.

This is a **personal track**: each qualifying player runs their own arc
against their own house choice. It is not a shared guild-wide race, and
completing it doesn't affect any other player's arc. This matches how
`house_progress` already works today (`discord_user_id, house`, no guild
scoping); see §6.

### Where players stand (2026-10-22)

Read-only query on `house_progress` / `mission_log`. **Nobody has reached
Special Inspector (180), let alone Chancellor's Right Hand.** 22 players hold
points; the top totals are 166, 154, 146, 145, 126, 124, 103 (all Senior
Inspector). The top four earned 70 to 86 points over the last 30 days
(~2.8/day), which puts the leader at 320 around **mid-December 2026**. That
is the build window.

### Canon basis

Canon on the Gala itself is thin. The only lines are Ritsu's:

- `ritsu.md` Default 2: he will ensure the Gala is held this year and that
  Sinostra wears the Laurel Crown.
- `ritsu.md` Affinity LVL 23: progress "toward the reinstatement of the Gala".
- `ritsu.md` bio: "unconcerned with ethics ... for the sake of the Laurel
  Crown".

Nothing says what the Gala is, why it stopped, or how the Crown is judged.
**Don't invent any of that.** Every content idea below is anchored to a cited
reference line about the character, not to Gala lore.

---

## 0. Settled decisions

From the original design discussion (2026-09-15):

- Not fronted by one specific character. Ritsu was considered, but the arc
  draws from **whichever house the player picks**, using that house's roster
  (the `getHouseRoster` pattern errands already use). Ritsu can still
  *appear* in other houses' arcs as a rival (§4.3).
- The player picks a house **of their choice**, not necessarily their own MC
  house. The choice is **locked in** for the life of the arc.
- New `MISSION_TYPES.GALA` entry, reusing the existing roll → post → accept →
  complete → reward plumbing in `missions.js` / `constants/missions.js`.
- **One-time, multi-stage arc.** Once finished, it stays finished.
- **Personal track**, not a guild-wide pool.
- Points come from **`gala` completions**, a scored mission type of its own.
- **Board eligibility:** the shared per-guild board stays house-blind and
  first-click-wins. A `gala` mission can be Accepted by anyone, but the claim
  handler checks the accepter's own `gala_arcs` row. If they don't qualify (no
  arc, wrong house, or already finished), the claimed slot is converted in
  place into a normal errand/riddle/co-op for them, so nobody hits a dead end
  and no spawn is wasted.

Added 2026-10-22:

- **Gate is Chancellor's Right Hand (320), not Special Inspector.** The Gala
  is the endgame of the Inspector track. `inspectorRank()` already sums
  points across every house, so the check stays house-agnostic.
- **The arc opens with the Chancellor's summons (§1)**, an ephemeral
  follow-up with the messenger cat that leads into an audience with
  Cornelius. This replaces "the player has to know `/mission house:` exists"
  and answers the old nudge question.
- **Choosing the house is a narrative scene, not a form.** Cornelius asks
  which house the player thinks deserves the Laurel Crown, and the player
  answers with a case for that house. No "Sponsor {house}?" wording anywhere.
- **The rotating stage shapes (§3) are the direction, but TBD.** Stage
  count, order, thresholds and verbs are not locked.
- **Rewards (§5):** the Gala partner, the Laurel Crown title + public post,
  Gala items in Benkei's shop, and the guild ballroom record are all kept.
- **Gala partner callbacks (§5.1) are kept.**

---

## 1. The Chancellor's summons

### 1.1 Trigger

The mission completion that carries a player's total from below 320 to 320 or
above. Detect the crossing from the totals before and after the completion
write, the same way bond scenes detect a level crossing. A player who has a
`gala_arcs` row already never gets it again.

The normal completion reply posts exactly as it does today. The summons is a
**separate ephemeral follow-up** sent after it, so it never crowds the
completion line.

### 1.2 Flow

1. **The letter.** Ephemeral follow-up, messenger cat as the thumbnail (the
   same `Messenger_Cat.png` / `Messenger_Cat_2.png` the board uses), a short
   line that a letter has come from the Chancellor's office, and one button
   to open it.
2. **The audience.** Cornelius (`assets/expressions/cornelius/default.png`).
   He tells the player the Gala is being brought back and asks the question
   the whole arc hangs on: **which house deserves the Laurel Crown?**
3. **Making the case.** A select menu of the 8 houses, but each option reads
   as the player's *reason*, not a bare house name: the label names the house
   and the description gives a one-line case for it, written from that
   house's canon (§1.3).
4. **Cornelius weighs it.** A per-house reply where he responds to the case
   the player made, then asks whether they'll stand by it, because the choice
   can't be taken back. Two buttons: commit, or reconsider (back to the
   select). Button labels obey the 30-char limit.
5. **Granted.** Cornelius switches to `close.png` with a per-house line that
   accepts the player's case and sets the arc running. The `gala_arcs` row is
   created here and not before, so backing out at any earlier step leaves no
   state.

### 1.3 The case per house

The select's descriptions and Cornelius's replies need one anchor per house.
Candidates from the reference files; thin ones are marked and need grounding
before anything is written:

| House | Case anchor |
|---|---|
| Sinostra | Ritsu has already promised the Crown and has never made a promise he couldn't keep (`ritsu.md` Default 2). |
| Dionysia | The show: Jo's "from the moment today's curtain rises, our show begins" (`jo.md` Default 3); Mio builds the stage sets (`mio.md` bio). |
| Jabberwock | Haru's nonstop campaign for Jabberwock's popularity "by any means possible" (`haru.md` bio). |
| Frostheim | The elite house Kaito works so hard to belong to (`kaito.md` bio). Needs a second anchor. |
| Obscuary | The house that throws its own parties: Rui's New Year's party (`rui.md` New Year's 2), Edward's nights of "magic and wonder" (`edward.md` Christmas 1). |
| Hotarubi | Thin. Festival work is canon (`haku.md` Summer Noon, Hotarubi summer festivals in `jo.md`/`lucas.md`), but needs grounding. |
| Vagastrom | Thin. Alan's "unshakeable conviction" and the potential he admits Sho and Leo have (`alan.md` bio). Needs grounding. |
| Mortkranken | Thin. No house-pride line found yet. Needs grounding. |

### 1.4 Cornelius has no reference file

There is no `constants/dialogue/reference/cornelius.md`. The only canon line
is Benkei's (his manager is one of Cornelius's cats). His existing lines in
`constants/missions.js` (`CHANCELLOR_AUDIENCE_LINES`,
`CHANCELLOR_GRANTED_LINES`) are short narration, not dialogue. **Before any
summons dialogue is written, he needs a reference file**, or the audience
stays in that same narrated register ("He weighs your answer.") instead of
putting words in his mouth.

### 1.5 Coming back to it

An ephemeral message is gone once dismissed or the client reloads. The
command option from the original design becomes the way back in rather than
the way to start:

- **`/mission gala:True`** (boolean, the same shape as `assist:True`, so bare
  `/mission` keeps working).
  - Below 320: tells them the rank they need and where they stand.
  - At 320+ with no `gala_arcs` row: reopens the audience at step 2.
  - Row exists: shows arc status (house, stage, progress).
  - Row completed: shows the completed state (house, when, partner).

This replaces the earlier `house:<house>` STRING option, which would let a
player skip the scene by picking straight from a list.

---

## 2. Mission mechanics

`gala` missions spawn through the existing `spawnMission` roll, gated only at
Accept time (§0), so the spawner needs no guild-membership lookup.

- `MISSION_TYPES.GALA = "gala"` added to `constants/missions.js`.
- New `WEIGHT_GALA` constant folded into `rollMissionType()`'s total. With
  nobody eligible until mid-December, every gala spawn before then converts
  in place, so the weight is harmless now but should be tuned once a few
  players qualify. Keep §22 of `scheduled-missions.md` in mind: take any
  share from riddle, not errand, so errand's 💎 share doesn't drop.
- Spawn draws its house with `rollHouse()` like every other type. It does
  not target a specific player's chosen house; the guarded accept in §0
  handles mismatches.
- On completion: the same `record_mission_completion` dual-write as every
  other type, **plus** a bump to the player's `gala_arcs` row (points toward
  the current stage, stage advance when the threshold clears).
- The mission verb depends on the stage (§3), so `/docs`, `/riddle` and
  `/mission assist:True` each grow a `GALA` case rather than a new command.

---

## 3. Stages (TBD)

Direction, not locked: instead of three errands in a row, each stage borrows
a different existing mission type, so every stage plays differently and
almost everything is already built.

| Stage | Shape | Reuses | Beat |
|---|---|---|---|
| 1. Committee | Errand | `/docs`, signature flips | Get commitments from the chosen house's roster, each filling a Gala role (§4.1). |
| 2. Sabotage | Riddle | §20 culprit reveal + accusations | Someone is undermining the preparations; the player names who (§4.3). |
| 3. Gala night | Co-op | §21 debrief, assist cap | The player calls for backup; guildmates join, so a personal arc gets a social finale (§4.4). |

Open:

- Stage count and order.
- Point thresholds per stage (the original placeholder was 5 / 12 / 20).
- Whether stage 3's co-op counts toward `DAILY_LEAD_CAP` for helpers like
  any other assist (it probably should).
- What a gala completion pays besides arc points (logs/💎, a reset).

---

## 4. Content anchors

Everything here is a pointer to canon for writing, not drafted dialogue. Use
the voice-check skill per character. Seasonal voicelines are paraphrased,
never quoted (`winnerLines: no dialogue repeats` rule applies in spirit).

### 4.1 Committee roles (stage 1)

Each signature target fills a role written from their own canon. When a
house has no one for a role, the role is skipped; don't hand a role to
someone the reference doesn't support.

| Role | Who, and the source |
|---|---|
| Venue and set | **Mio**: builds stage sets, head stagehand (`mio.md` bio) |
| Outfits | **Jo**: his styling stigma dressed the host club (S2 E3, `jo.md`). **Rui**: made Edward's dressing gown (`edward.md` Winter Noon) |
| Music | **Rui**: the piano anomaly plays the bar's soundtrack (`rui.md` Fall Night). **Jin**: plays piano out of habit (`jin.md` Fall Night). **Zenji**: plays biwa for hours (`haku.md` Fall Noon). **Leo**: music in the Pit since they can't go clubbing (`leo.md` LVL 5) |
| Catering | **Jin**: "Tell the chef..." (`jin.md` LVL 2, Winter Evening). **Romeo**: Ginza mimosa cookies (`romeo.md` White Day 1). **Elias**: cake in the office (`elias.md` Affinity 21). **Sho**: food and the hot-food pot catalog (`shohei.md` Winter Evening) |
| Guest vetting | **Haku**: checks festival stalls so no charlatans get in (`haku.md` Summer Noon) |
| Promotion | **Haru**: marketing by any means (`haru.md` bio). **Leo**: influencer photos (`leo.md` bio). **Ren**: uploaded videos (`ren.md` LVL 21) |
| Records | **Ritsu**: notebook, binder, voice recorder (`ritsu.md` Default 5) |
| Photographer | **Jiro**: photographs Yuri (`jiro.md` Spring Evening) |

### 4.2 Signature beats with built-in friction

- **Jin**: "A party? I don't waste air on bootlickers. Try Tohma." (`jin.md`
  Default 2). He deflects to Tohma; his birthday line shows the turn ("You're
  planning it? ...I'll think about it."), because the player asked.
- **Jabberwock dress code**: Haru loves the jumpsuits (`haru.md` Fall Noon);
  Ren calls them a crime (`ren.md` Default 1).
- **Ren**: summer is "for extroverts and party animals" (`ren.md` Summer
  Morning). A reluctant yes.
- **Romeo**: makes the player aware of how much of his precious time they're
  using (`romeo.md` MC's Birthday 1). He names his price (Romeo responses rule).
- **Mortkranken**: Yuri made Jiro's Halloween costume and did the makeup
  (`jiro.md` Halloween 2), so Yuri dresses Jiro for the Gala.
- **Frostheim**: Kaito and Towa practice dancing together (`kaito.md` author
  note), cross-house dance practice.
- **Elias**: agrees warmly and vaguely. He never follows through (rule), but
  his signature still counts so the mechanic stays fair.
- **Shion**: signs because he feels like it, never as a favor (rule).

### 4.3 Sabotage suspects (stage 2)

- **Sinostra as rivals** when the player backs any other house. Ritsu's bio
  bends ethics for the Crown; Haru's "The Sinostra folks are causing a
  kerfuffle again" (`haru.md` LVL 6).
- **Sinostra arc**: Ritsu's records solve it. He logs where things were to
  the minute (`ritsu.md` LVL 2).
- **Shion** swaps something (decorations, seating cards) as a prank. Never
  explained, never a favor, no water/mermaid hints.
- The culprit is always a real character, as §20 riddles already require.

### 4.4 Gala night (stage 3)

- Opening beat sourced from Jo's curtain line (`jo.md` Default 3), paraphrased.
- **Taiga** dresses nice when he needs to (`taiga.md` bio); still ends on
  "Ciao!".
- **Obscuary** arcs: always night, so Gala night is their home turf.
- **Hotarubi** arcs: it always rains there; the venue is indoors and the rain
  is background, never a surprise.
- **Towa** works at the Gala because it's at night (mute by day).

### 4.5 Guardrails that apply across the arc

- Campus is never packed: the Gala is busy, not a crush.
- MC is never a thing, task or prize; the Crown is the house's.
- Spoilers (stigma/artifact reveals, `[spark+]` lines) stay out of the arc's
  shared content, since it isn't tier-gated. They may appear only in the
  partner scene at spark and up.

---

## 5. Rewards

### 5.1 Gala partner

At completion, the player picks one character **from the chosen house** to
go to the Gala with. They get a one-time DM scene shaped like a bond scene,
whose temperature comes from the player's tier with that character (spark+
reads romantic), plus a keepsake. Since choices earn affinity, the pick can
also grant a boost.

Callbacks to build the scene from:

- **Jin**: asks what color dress the MC is wearing so he might match his
  ascot tie (`jin.md` Christmas 1). Matching was his idea.
- **Jo**: wants to coordinate matching yukata (`jo.md` Summer Night), which
  becomes coordinated Gala outfits.
- **Leo**: wants the photo (`leo.md` Christmas 2, the costume he got her).
- **Lucas**: sincere "you look lovely" (`lucas.md` Christmas 2), chivalrous.
- **Edward**: nights of magic and wonder (`edward.md` Christmas 1).

Guardrails per character (existing rules):

- **Jin**: no PDA; affection shows in what he allows.
- **Rui**: distance and gloves even on the dance floor, never announced.
- **Zenji**: a dance would cost him; real contact is rare.
- **Alan**: no touch below spark.
- **Towa**: night, so he can speak; texts stay sparse and sticker-first.
- **Elias**: commits to nothing, no promises kept.
- **Subaru**: no stage showboating in public.

Open: the keepsake emoji per character (must not reuse their bond-scene
keepsakes), and whether characters the player has never met can be picked.

### 5.2 The Laurel Crown title + public post

A 👑 Laurel Crown title on the Inspector dossier (`/house`) and in
`/affinity`. On completion, a public post in the guild's mission channel
names the player and the house they brought the Crown to.

### 5.3 Gala items in Benkei's shop

Players at Chancellor's Right Hand have filed many errands and sit on 💎.
Optional Gala purchases give that 💎 somewhere to go, which also helps the
💎-vs-shop-price watch item in `scheduled-missions.md` §19.2. Benkei's
manager is one of Cornelius's cats (`benkei.md`), which ties the shop to the
Chancellor. Item list TBD; follow `docs/benkei-shop.md`.

### 5.4 Guild ballroom record

A read-only tally of which houses the guild's players have crowned, built
from `gala_arcs`. A personal track gets guild-wide flavor without becoming a
race. Where it renders (a `/mission gala:True` page, the dossier) is TBD.

---

## 6. Schema

```sql
-- One row per player, personal track. No guild_id, matching house_progress.
CREATE TABLE IF NOT EXISTS gala_arcs (
  discord_user_id      TEXT PRIMARY KEY,
  house                TEXT NOT NULL,           -- locked at the audience, never changes
  stage                INT  NOT NULL DEFAULT 0,
  points               INT  NOT NULL DEFAULT 0, -- cumulative, drives stage thresholds
  partner_character_id TEXT,                    -- set once at completion (§5.1)
  started_at           TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  completed_at         TIMESTAMP WITH TIME ZONE -- set when the final stage clears
);

ALTER TABLE gala_arcs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Block direct access" ON gala_arcs FOR SELECT USING (FALSE);
```

The row is created at the audience's commit step (§1.2), never at the
summons, so the summons itself needs no column: whether to send it is the
320 crossing plus "no row yet". `record_mission_completion` gets a
Gala-aware sibling or an optional bump in the same RPC, decided at
implementation time.

---

## 7. Feasibility

| Need | Already in place / small addition |
|---|---|
| Rank gate | `inspectorRank()` exists and is house-agnostic. |
| Crossing detection | Completion already knows the player's totals; compare before/after. |
| Summons UI | Messenger cat sprites, Cornelius `default`/`close` faces, and the audience pattern (`CHANCELLOR_*` in `constants/missions.js`) all exist. New: a select menu + confirm step. |
| House roster | `getHouseRoster(house)` backs errand targets. |
| Stage shapes | Errand, riddle (§20) and co-op (§21) are all built; each gets a `GALA` case. |
| Accept-time convert-in-place | New. `claim_mission` has no "wrong type for this accepter" path today. The one genuinely new mechanic. |
| Arc state | New `gala_arcs` table (§6). |
| Partner scene | Bond scene DM delivery (`docs/bond-scene-dms.md`) reused for a one-off scene. |
| Command surface | No new command: `gala` boolean on `/mission` (§1.5). |

---

## 8. Open questions

1. Cornelius's voice: write a reference file, or keep him narrated (§1.4)?
2. Case anchors for Frostheim, Hotarubi, Vagastrom, Mortkranken (§1.3).
3. Everything in §3 (stage count, order, thresholds, what a gala completion
   pays).
4. Partner keepsakes and whether unmet characters are pickable (§5.1).
5. Shop item list (§5.3) and where the ballroom record renders (§5.4).

---

## 9. Narrative content (not started)

All of it goes through the voice process; never invent canon.

- The letter line and Cornelius's opening question (§1.2).
- 8 house cases for the select, 8 "weighs it" replies, 8 granted lines.
- Stage transition lines.
- Per-role signature lines (§4.1) and the friction beats (§4.2).
- Sabotage riddles and culprit reveals (§4.3).
- Gala night co-op post and debriefs (§4.4).
- Completion post (§5.2) and a partner scene per eligible character (§5.1).
