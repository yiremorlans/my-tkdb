# Spec: Scheduled missions

Status: **built** (including the §20 culprit reveal and §21 co-op debrief expansions; §22 records the 2026-10-08 reward balance review)
Last updated: 2026-10-08

> **As built.** Everything below is implemented. Where the code differs from
> this document, the code is right and the difference is listed here:
>
> - **Migration is `016_create_missions.sql`**, not `011`, and it is the only
>   one. Public encounters shipped first and took `010`; `011`-`015` went to
>   encounter win stats, atomic command limits, the guild lock, atomic boosts
>   and bond scenes.
> - **Two tables, not four.** §10 specifies `missions`, `mission_signatures` and
>   `mission_log`, and the banking change below originally added a fourth for
>   credits. Both satellites are folded into their parents, because neither was
>   ever read on its own — each was only fetched alongside the row it hangs off,
>   so it cost a second round trip on every read path and bought nothing a
>   column could not hold:
>   - `mission_signatures` → **`missions.signatures`** JSONB,
>     `{"<character_id>": null | "<timestamp>"}`. The key count is what
>     `signatures_required` was, so the two can no longer disagree.
>     `sign_errand_target()` still flips one entry in a single conditional
>     `UPDATE`, so the concurrency story is unchanged.
>   - the banked resets → **`mission_log.reset_spent_at`**. A completion grants
>     exactly one reset and there is already exactly one log row per completion,
>     so the credit IS the row, unspent while `reset_spent_at IS NULL`. Its
>     scope is derived from `mission_type` rather than stored.
>
>   Measured effect: `/docs` and the `/mission` briefing are one round trip each
>   rather than two, the dossier three rather than five, and the signature flip
>   at the response step a constant one call whether or not the player has an
>   errand at all.
> - **`/mission assist` is `/mission assist:True`.** Discord makes a command
>   with subcommands invocable *only* through them, and bare `/mission` — the
>   briefing, which every instruction block points at — has to keep working. So
>   `assist` is a boolean option, exactly as `dms` is on `/bonds` for the same
>   reason. Every user-facing string says `assist:True`.
> - **Mission post failures get their own counter and switch**
>   (`guild_settings.mission_post_failures`, auto-disabling `missions_enabled`)
>   rather than reusing encounters' `post_failures` / `enabled`. §16 said "reuse
>   the encounter handling", but sharing the counter would let a broken mission
>   channel silence public encounters that are posting fine.
> - **`getCharactersByHouse` no longer exists.** It was removed from
>   `constants/characters.js` before this feature was built (that file now only
>   answers "where can this character be found", not the reverse). The house
>   roster helper is `getHouseRoster(house)` in `constants/missions.js`, which
>   is missions' only caller.
> - **A public mission message is an embed, in the same shape as an encounter
>   reveal** (`publicEncounters.js`): a description, the board's colour, and the
>   messenger cat as a `thumbnail`. The cat is served from `/assets/sprites`
>   rather than uploaded, so a request post and every edit to it carry no
>   attachment payload at all. Two coats (`Messenger_Cat.png`,
>   `Messenger_Cat_2.png`) alternate on the mission's BIGSERIAL `id`, so
>   consecutive requests never arrive with the same cat and every edit to one
>   post keeps the cat it was posted with. Never a house sprite or a house
>   background, which would read as a tell about the withheld house. If
>   `BASE_URL` is unset the thumbnail is dropped and the text still posts —
>   the same fallback the encounter reveal uses.
> - **`/docs` renders a composited field report.** §5 describes only the text
>   checklist; the reply now also carries one signature block per target, with
>   the character's real signature art from `assets/signatures/` dropped onto
>   the line once they have been met, and the date beside it. All 25 house
>   characters have art (Benkei has no house, so is never a target) — a test
>   pins that, because a target with no art would render a blank line on an
>   otherwise signed sheet and read as a bug.
>
>   Unlike the messenger cat this cannot be URL-served: the cat is one static
>   file every viewer shares, so Discord fetches it once and caches it forever,
>   while the sheet is per-player, per-mission state and has no static file to
>   point at. The cost is bounded instead — the whole sheet is ONE attachment
>   however many targets it has, signatures are never upscaled past 1:1 (which
>   was most of the bytes: ~93 KB before, ~71 KB after), the sheet is only as
>   tall as its target count, and a report with nothing signed yet is not
>   composed at all, so a fresh errand costs no image payload until it has
>   earned one. For scale, one `/roam` encounter image is ~527 KB. The text
>   checklist is always in the message, so a failed compose costs the flourish
>   and nothing else.
> - **`/house` moved to `missions.js`** as `buildDossierMessage`, rather than
>   being rewritten in place in `encounters.js`. The dossier is mission-shaped;
>   `encounters.js` no longer has a `/house` section at all.
> - **At most one request is posted per tick.** If two slots come due together
>   after an outage, the second waits for the next tick rather than landing
>   back-to-back in the channel.
> - **Open questions in §19 are all still open** — nothing there was decided as
>   part of building this. The one exception is that `/docs` kept its name.
>
> **Change after the first build (2026-09-05): cooldown resets are banked.**
> §5, §6, §7 and §13 below all say a completed mission calls
> `resetCommandLimit` and clears the clock on the spot. It no longer does.
>
> - Completing a mission leaves its `mission_log` row unspent
>   (`reset_spent_at IS NULL`) and touches `command_limits` not at all.
> - The player spends it from a **Use a cooldown reset** button that appears
>   *only* on the "you're still on cooldown" reply to `/roam` or `/meet`, and
>   only when they actually hold one. Clicking it clears the cooldown and drops
>   them straight into the command it cleared: the one they were blocked on,
>   or for a co-op reset, the longer of the two waits (migration 028).
> - **Why:** clearing the clock at completion time quietly punished good
>   timing. A player who solved a riddle with four minutes left on their
>   cooldown got four minutes of value out of the same reward another player
>   got three hours from, and nothing in the game told them to wait. Banking it
>   makes the reward worth the same to everyone, and makes *when* to spend it a
>   decision rather than an accident.
> - **The co-op coin flip is gone.** §7 and §13 originally rolled `roam` or `meet` once and
>   apply it to both users. Banked, that produces a reset stamped `roam` that
>   is worth nothing to someone who later wants `/meet` — the exact waste this
>   change exists to prevent. A co-op now banks a `single`-scope reset for each
>   user, and *which* command it clears is decided when they spend it: the
>   longer of the two waits (migration 028). Solo missions bank a
>   `both`-scope reset, so the "co-op is worth half a solo clear" gap in
>   decision 4 is preserved.
> - Nothing can be wasted by a mistimed click: `spend_cooldown_reset` refuses
>   (keeping the credit) if that clock is already clear, and refuses if nothing
>   is banked. `/house` shows how many the player is holding.
> - A successful spend also drops the **in-memory invoke throttle**
>   (`releaseCommandInvoke`) for every command it cleared. That throttle is a
>   60s per-command debounce stamped at command-invoke, so the player is always
>   inside it when they click — the stamp came from the very `/roam` or `/meet`
>   that turned them away. Leaving it would refuse them the reward they just
>   paid for. It only ever shortens the seconds-scale debounce, never the 3h
>   reward cooldown, so it cannot buy a second reward; and it is bounded by
>   having earned a reset to spend. A refusal (`none` / `not_needed`) spends
>   nothing and leaves the throttle alone.
> - The offer is **not** attached to the redemption-gate refusal at the
>   dialogue-response step (`claimCommandUse` in the `resp` handler). That path
>   means the player stacked prompts rather than waited, and the reward belongs
>   at the command, not mid-flow.
>
> **Change after the first build (2026-09-05): 6 requests a day, 2 per player.**
> §3 and §18 decision 1 originally said 3 slots a day. It is now **6**, with a new
> **`DAILY_LEAD_CAP = 2`** enforced inside `claim_mission`.
>
> - **Why 6:** sized against roughly 20 active players. At 3/day the average
>   player won one request a week, too scarce for a feature with four commands
>   and a dossier behind it. At 6 it is one per three or four days, and still
>   under half the ~13 encounter posts the same channel already gets each day.
> - **7 is the ceiling** this slot algorithm supports. Each band is
>   `WINDOW / N` wide and has to hold `MIN_GAP_MS`, so the re-roll starts
>   hitting its fallback at 8 (2% of days), does so half the time at 9, and at
>   10 the last slot spills past midnight on every roll. Going higher means
>   lowering `MIN_GAP_MS`, not just the count. There is a test pinning this.
> - **Why the cap:** count alone does nothing for distribution. The board is
>   first-click-wins, so 6/day mostly hands more of it to the same always-online
>   players, and "one held at a time" barely slows them when a riddle can be
>   solved inside a minute. At 6/day with a cap of 2, at least three different
>   players win something each day.
> - It counts missions **accepted**, not completed. Accepting is what denies
>   everyone else; a player who takes two and lets both lapse has still spent
>   the server's requests and must not be handed a fresh attempt for failing.
> - **Assists count too (migration 029, 2026-10-08).** The cap is on missions
>   *taken*: accepts plus co-op assists (`helper_user_id`, counted by
>   `completed_at`, since a co-op completes in the same write that records its
>   helper). Before this a capped player could keep answering every call for
>   backup and bank a log and a reset each time. `claim_coop_helper` returns
>   `'capped'` (after `'taken'` / `'self'`) and the call stays live for the
>   next inspector. **One mission at a time includes assists:** a player
>   holding their own accepted mission is refused with `'busy:<type>'`, the
>   same answer `claim_mission` gives (`'capped'` is reported first).
>   Both claims take a per-user advisory lock (`pg_advisory_xact_lock`) before
>   counting, so a player's simultaneous clicks on two posts are serialized and
>   can't both slip under the cap.
> - `'capped'` is reported ahead of `'busy:<type>'` when both apply: telling
>   someone to go finish their current mission implies another is waiting for
>   them afterwards, which at cap is false.
> - **Banked resets are deliberately NOT capped.** §19's "per-day completion
>   cap" question is answered on the *lead* side instead. A hold cap on resets
>   would bind only on the one or two players who win most requests — and since
>   those players earn up to 2/day, any cap low enough to matter would sit on
>   them permanently and put them back on use-it-or-lose-it, which is the exact
>   thing banking removed. Supply is the limiter: at 6 requests a day shared
>   across ~20 players, the average player earns well under one reset a day. If
>   a burst ever does need bounding, cap the **spend rate** (resets cashed per
>   day) rather than the balance, so nothing earned is ever destroyed.

Six times a day, at unpredictable-but-spread times, a scheduled job posts a
public **mission request** into the same channel the public "call out"
encounters use. The post is an embed carrying the messenger cat, a rotating
Darkwick-Academy-flavored line ("Calling Inspector — a new mission request!",
"Come to the Chancellor's office for a briefing!"), and one **Accept** button.
The first user to click it "picks up" the mission: the button is disabled and
the post edits to `{username} has picked up the mission`. **The post never says
which house the mission is for, or what type it is** — the accepter learns that
only by running `/mission`.

A user may hold **at most one** accepted mission at a time. Missions come in
three types, rolled at spawn:

| Type | Weight | What you do | Reward |
|---|---:|---|---|
| **Riddle** | 45% | Solve a debunk riddle with `/riddle <answer>` | **1 log point** · banked reset clearing **both** `/roam` + `/meet` · pending boost with the culprit (§20) |
| **Errand** | 45% | Meet **N specific students** of the mission's house (N rolled at spawn, `1 .. house roster size`) — they're **boosted in your `/roam` / `/meet`** while the errand is open — then file with `/docs` | **N log points** (one per signature) · banked reset clearing **both** `/roam` + `/meet` · no boost (§22) |
| **Co-op** | 10% | Call a partner with `/mission assist:True`; another user backs you up | **1 log point each** (both users) · a banked **single** reset each (clears the longer of the two waits) · a debrief boost each (§21) |

Completed missions add **log points** — one per riddle/co-op, N per errand —
tallied per house and surfaced through `/house`, which is **repurposed** from
"which house is your heart in" into an **Inspector dossier** (rank from total
points, per-house point tally, current pending mission).

This is a new, standalone feature. It does not change the affinity curve —
`/roam` and `/meet` remain the only things that move a relationship. Mission
rewards are `mission_log` points plus a cooldown reset, never affinity.

---

## 0. Relationship to `public-encounters.md`

This feature **shares infrastructure** with the public "call out" encounters
feature ([`public-encounters.md`](./public-encounters.md)). If that feature is
built first, the shared pieces already exist; if not, they must be built here.

| Shared piece | Where it's defined | Used here for |
|---|---|---|
| `guild_settings` table + `/encounters`-style admin config | public-encounters §4, §10 | this spec **adds columns** (§10) and an admin subcommand (§4) |
| Scheduler tick loop (`encounterScheduler.js`) | public-encounters §3 | missions ride the same `setInterval` — one tick, add a mission pass |
| `postChannelMessage` / `editChannelMessage` REST helpers | public-encounters §11 | the mission post + the pick-up / withdrawal edits |
| `matchCharacterGuess(input)` name matcher | public-encounters §7.1 | `/riddle` answer matching |
| Bot **guild install**, `DISCORD_TOKEN`, Serverless disabled | [`channel-call-response-feature.md`](./channel-call-response-feature.md) | the bot must be a guild member that can POST + edit + attach files in the channel |

Nothing here needs new dependencies or new privileged intents.

**Recommended order: ship `public-encounters.md` first.** It establishes every
shared piece above — `guild_settings` + the `/encounters`-style admin config,
the scheduler tick loop, the multipart channel POST/edit helpers,
`matchCharacterGuess`, and the operational setup (bot guild install, token,
Serverless off). Sequencing missions second keeps this feature a small diff:
`missions.js`, `constants/missions.js`, migration `011`, the scheduler's mission
pass, four commands, and the `/house` refactor. If missions must ship first,
pull that shared infra into this feature's scope and renumber the migration to
`010_`.

---

## 1. Feasibility summary

| Need | Already in place |
|---|---|
| Recurring scheduler | Long-lived Express process; the encounter tick loop |
| Post an embed + button, edit it later | `postChannelMessage` / `editChannelMessage` (public-encounters §11) |
| First-click arbitration + "max one held" | Supabase, atomic conditional `UPDATE` in an RPC + a **partial unique index** (§11) |
| Reset a user's `/roam` + `/meet` cooldown | `resetCommandLimit(userId, command?)` in `commandLimits.js` already exists (`clearCommandLimit` in `db/supabase.js`) |
| Riddle answer matching | `matchCharacterGuess` (public-encounters §7.1) |
| Wrong-guess throttle | in-memory `Map`, same pattern as `/call`'s 10s cooldown |
| Signature source | `recordResponse` at the `/roam` / `/meet` response step (`encounters.js:402`) — the exact point a "meeting" becomes real |
| House rosters | `getCharactersByHouse(house)` (`constants/characters.js:965`) |
| House emblems for `/house` | `assets/emblem/<House>.png` (all 8 houses) |

**New capability:** none beyond what public-encounters already introduces (the
bot initiating + editing channel messages).

**Effort:** ~2–3 days on top of public-encounters' shared infra. The three
mission types are largely independent; the riddle type is the smallest, co-op
the fiddliest (a second public button + a second claim path).

---

## 2. End-to-end lifecycle (per guild)

```
scheduler tick (shared with encounters; every ~25s, per enabled guild):

  ROLL DAY: if guild.mission_slots_day != today(localTZ):
    └─ mission_slots_today = 6 random timestamps, one per equal sixth of
       05:00–24:00 America/Chicago, >= 2h apart  (all fixed, not configurable)
       mission_slots_day = today; mission_slots_fired = []

  FINALIZE:
    ├─ missions WHERE status='open'      AND now() >= post_expires_at
    │    └─ status='expired'; edit post → MISSION_WITHDRAWN_LINES entry, drop embed, remove button
    └─ missions WHERE status='accepted'  AND now() >= accept_expires_at
         └─ status='expired' (slot frees via the partial index; no channel edit — the pickup post already moved on)

  SPAWN: for each slot i in mission_slots_today not in mission_slots_fired,
         with slot_time <= now():
    ├─ if slot_time is > STALE_SLOT_MINUTES late           → mark fired, skip (host was asleep)
    ├─ if guild already has a status='open' mission        → mark fired, skip (never two live requests)
    ├─ roll house (uniform over 8) + type (riddle 45 / errand 45 / coop 10)
    ├─ type='riddle' → pick a riddle from RIDDLES[house]
    ├─ type='errand' → signatures_required = randInt(1, getCharactersByHouse(house).length)
    ├─ INSERT missions row (status='open', post_expires_at = now + POST_TTL_HOURS)
    ├─ pick a MISSION_TEASERS line, build the embed (cat alternates on mission id)
    ├─ POST to guild.mission_channel_id (or encounter_channel_id) with one Accept button
    │    → store message_id; on failure mark row 'expired', bump post_failures (reuse encounter handling)
    └─ mark slot i fired

Accept button  (custom_id: mission:accept:<id>)
  └─ claim_mission(id, userId)  →  'claimed' | 'taken' | 'busy:<type>'   (§11)
       ├─ 'claimed'      → UPDATE_MESSAGE: content "{username} has picked up the mission.", button disabled
       ├─ 'taken'        → ephemeral "Someone got there first."       (post untouched, button stays live)
       └─ 'busy:<type>'  → ephemeral naming the command that finishes their CURRENT mission
                           (errand → /docs, riddle → /riddle, coop → /mission assist); post untouched

/mission            (ephemeral) → reveal house + type + objective + progress + always-on instructions (§8)
/docs               (ephemeral) → errand only: roster + signature checklist + "Complete mission" button (§5)
/riddle <answer>    (ephemeral) → riddle only: match, reward on correct, 20s cooldown on wrong (§6)
/mission assist      (public)   → coop only, NOT deferred: the reply itself is the "Join the mission" post,
                                  in the channel it's run from. Names the lead in plain text, pings nobody.
                                  No ephemeral ack. (§7)
```

---

## 3. Scheduler — 6 missions/day, banded random times

Runs inside the existing encounter tick (`encounterScheduler.js`). No new
interval.

### Slot generation (once per local day, per guild)

**Fixed, not admin-configurable** — constants in `constants/missions.js`:
**6 slots/day** (raised from 3 on 2026-09-05; 7 is the ceiling, see the top note), active window **05:00–24:00 America/Chicago** (19h),
consecutive slots **≥ 2h apart**.

```js
const MISSIONS_PER_DAY  = 6;
const WINDOW_START_HOUR  = 5;          // 05:00 CT
const WINDOW_END_HOUR    = 24;         // midnight CT
const MIN_GAP_MS         = 2 * 3600_000;

function rollDailySlots(localDate) {
  const startMs = atLocalHour(localDate, WINDOW_START_HOUR);           // today 05:00 CT
  const spanMs  = (WINDOW_END_HOUR - WINDOW_START_HOUR) * 3600_000;    // 19h
  const bandMs  = spanMs / MISSIONS_PER_DAY;                           // ~3h10m
  const slots = [];
  for (let i = 0; i < MISSIONS_PER_DAY; i++) {
    let t;
    do {
      t = startMs + i * bandMs + Math.random() * bandMs;
    } while (i > 0 && t - slots[i - 1] < MIN_GAP_MS);                  // re-roll if < 2h after previous
    slots.push(t);
  }
  return slots.map((ms) => new Date(ms).toISOString());
}
```

- **One mission per sixth-of-day** (each band ~3h10m) → an early-morning player
  and a late-night player each get a shot most days.
- The time still moves up to ~3h day to day within its band — no fixed
  "it's always 2pm" pattern.
- Band widths (~3h10m) still absorb the 2h re-roll; the fallback only starts
  firing at 8 slots (test-pinned).
- Optional anti-lock (skip unless it feels needed): reject a fresh roll landing
  within 30 min of *yesterday's* same-band slot.

### State (on `guild_settings`, §10)

| Column | Meaning |
|---|---|
| `mission_slots_day` | the local date `mission_slots_today` was rolled for |
| `mission_slots_today` | `JSONB` array of 6 ISO timestamps |
| `mission_slots_fired` | `JSONB` array of the slot indices already posted |

Fully restart-safe: on boot the tick re-reads the row, regenerates only if
`mission_slots_day` is stale, and posts any due-and-unfired slot.

### Staleness

If the host slept across a slot and it is now more than `STALE_SLOT_MINUTES`
(90) late, mark it fired without posting — better to lose that mission than to
post at an odd hour. At 6/day this is acceptable.

### Single live request

Never post a second `open` mission while one is still `open` for that guild. If
a slot comes due and an `open` mission exists, mark the slot fired and move on
(that slot is spent).

---

## 4. Admin setup — `/missions` (extends the `/encounters` pattern)

Add a `missions` subcommand group to the existing admin command, or a sibling
`/missions` command. `default_member_permissions: "32"` (Manage Guild),
`integration_types: [0]`, `contexts: [0]`. **Enable / disable / status only —
count (3), gap (2h) and window (05:00–24:00 CT) are hard-coded (§3).**

```js
options: [
  { type: 1, name: 'enable',  description: 'Start posting missions in this server',
    options: [{ type: 7, name: 'channel', description: 'Channel (defaults to the encounters channel)', required: false, channel_types: [0] }] },
  { type: 1, name: 'disable', description: 'Stop posting missions in this server' },
  { type: 1, name: 'status',  description: 'Show whether missions are running in this server' },
]
```

- `enable` → upsert `guild_settings`: `missions_enabled = true`,
  `mission_channel_id = <id or NULL>`, clear `mission_slots_day` so the next
  tick rolls fresh slots. Reply ephemerally with the channel — **not** the times.
- `disable` → `missions_enabled = false`. Any in-flight mission finalizes
  normally.
- `status` → running/off state, the channel, and the post-failure count. It does
  **not** show the day's slot times: a server admin who could see the schedule
  is halfway to owning it, the same reason the slots aren't admin-configurable
  (§3). The times live behind `/encdev missions`, which is owner-only
  (`OWNER_DISCORD_ID`, via `handleEncounterDev`) — a read-only line of `<t:…:t>`
  stamps, struck through once fired.
- The scheduler's mission pass skips a guild unless `missions_enabled = true`
  **and** it has a resolvable channel (`mission_channel_id` or
  `encounter_channel_id`).

---

## 5. Type: Errand (signatures) — `/docs`

### Objective

`signatures_required` (`N`) is rolled at spawn: a uniform random integer from
**1 to the house's roster size** (`getCharactersByHouse(house).length`). Then
`N` specific **signature targets** are drawn at random from that roster and
frozen — one `mission_signatures` row each, `signed_at = NULL` (§10). So
Mortkranken errands target 1–2 students, most houses 1–3, Frostheim and
Dionysia 1–4.

`/mission` reveals the house **and names the targets**: *"Darkwick needs signoff
from **{House}** to complete report. Track down **Jin Kamurai**, **Leo Kurosagi**
and **Alan Mido**."*

### Earning a signature

At the `/roam` / `/meet` response-completion point (`recordResponse`,
`encounters.js:402`), after the existing tracking calls, if the user has an
`accepted` **errand** and `characterId` is one of that mission's still-unsigned
targets:

```sql
UPDATE mission_signatures SET signed_at = NOW()
 WHERE mission_id = $missionId AND character_id = $characterId AND signed_at IS NULL;
```

- **Only the `N` named targets count** — meeting a non-target student of the
  same house does nothing. No "cap" logic: there are exactly `N` target rows and
  filing needs every one signed, so the reward is always exactly `N` points.
- A `/roam` that surfaces a target counts the same as a deliberate `/meet`.
  Because `/roam` and `/meet` share a 3h cooldown, an `N ≥ 2` errand is a
  multi-session job **even with the target boost (below)** — the "slow burn"
  type, which is why it is weighted lowest. An `N = 1` errand is one meeting for
  1 point.
- Signatures flip automatically, but the mission is **not filed** until the user
  clicks **Complete mission** in `/docs` — the "return to base and do the
  paperwork" beat. The slot stays occupied until then.

### Boosting the target characters

While the user holds this `accepted` errand, its **still-unsigned targets are
boosted in that user's `/roam` and `/meet`** — otherwise chasing 2–4 specific
students through a random `/roam` (26 characters) and a 4-option `/meet`, inside
48h and against a 3h cooldown, is close to hopeless.

- **`/roam`** — the unsigned targets are injected into the character roll with
  heavy weight (`ERRAND_ROAM_TARGET_BIAS`, tuned so roughly every other roam
  surfaces a still-needed target). Normal roll when the user has no active
  errand or every target is already signed.
- **`/meet`** — the unsigned targets take **guaranteed slots** in the pick list
  (`MEET_OPTION_COUNT = 4`); remaining slots fill at random as today. 4 unsigned
  targets → every slot is a target; 1 → one slot is.
- The boost only changes **which characters appear**, never how often the user
  may `/roam` / `/meet` — the shared cooldown is untouched. It makes the errand
  *possible*, not free.
- Per-user and self-contained: each builder checks the invoking user's own
  active errand. No global state; other players are unaffected.

`buildMeetPickMessage()` (`app.js:171`) is called with no arguments today — it
gains a `userId` parameter to look up the active errand.
`buildRoamDialogueMessage(userId)` already has the id.

### `/docs` (ephemeral)

- No pending mission → *"You have no field paperwork right now."*
- Pending mission is a riddle → *"Your current mission is a riddle — answer it
  with `/riddle`."*
- Pending mission is co-op → *"Your current mission needs a partner — call one
  with `/mission assist`."*
- Pending **errand** → render the house roster with `✅` / `⬜` per student and
  a single button:

```
DARKWICK FIELD REPORT — Frostheim   ·   3 signatures
✅ Jin Kamurai
⬜ Leo Kurosagi
⬜ Alan Mido

🔒 Need 2 more — Leo Kurosagi, Alan Mido
[ Complete mission ]   ← disabled
```

  - The roster is exactly the `N` targets — `✅` signed, `⬜` not.
  - all targets signed → button **enabled**, label `Complete mission`.
  - any unsigned → button **disabled**. Discord shows no tooltip on a disabled
    button and labels cap at `MAX_BUTTON_LABEL_LENGTH = 30`
    (`constants/game.js:10`), so the detail goes in the message text (the `🔒`
    line), naming the unsigned targets: `🔒 Need {k} more — {Name}[, {Name}…]`.
  - `custom_id: mission:file:<missionId>`.

### Filing (button → `file_errand` RPC, §11)

`file_errand(missionId, userId)` → `'filed' | 'not_ready' | 'gone'`:

- `'filed'` → ephemeral *"Report filed. {House} owes you one — **+N**."* Then
  fire-and-forget: `recordMissionCompletion({ …, role: 'lead', points: N })`
  (one `mission_log` row worth `N` points, `N = signatures_required` from the
  row the caller already loaded for `/docs`), **`resetCommandLimit(userId)`
  (both `/roam` and `/meet`)**, analytics.
- `'not_ready'` → ephemeral *"You're still short a signature."* (a stale button
  can't file early — the RPC re-counts against `signatures_required`).
- `'gone'` → ephemeral *"That mission's already closed."* (expired mid-`/docs`).

### House change (button → `change_errand_house` RPC, migration 025)

Added 2026-10 after feedback that an errand could land a house the player
doesn't care about. A **Request new house** button (`mission:house:<id>`)
sits on the pickup briefing, `/mission` and `/docs` of every errand:

- Rerolls the house uniformly over the **other** seven, then redraws `N` and
  the targets against the new roster. Free.
- **Once per mission, and only before the first signature.** After that the
  button renders disabled with a 🔒 line saying why (Discord shows no tooltip).
  `change_errand_house` re-checks both under the row lock and stamps `house_changed_at` in
  the same write, so a stale button or double-click returns `'spent'`/`'signed'`.
- The 48h window, the daily lead cap and the reward rule are untouched.
- On success the clicked message is redrawn in place for the new house: a
  `/docs` click (`mission:house:<id>:docs`) gets the new, empty report sheet;
  a briefing click gets the new briefing.

**The Chancellor's audience** (added 2026-10). One click in five
(`CHANCELLOR_AUDIENCE_CHANCE`) skips the reroll and opens an audience instead:
a separate ephemeral V2 message laid out like a mission post (text left,
Cornelius' `default.png` from `assets/expressions/cornelius` as a thumbnail on
the right, served from `BASE_URL/assets`) telling the player to `/request` a house.

- The audience spends nothing. It only opens while the change is still
  available, and a re-click while it's open reopens it rather than rerolling.
- `/request house:<house>` (choices: the eight houses; the errand's current
  house is refused and the audience stays open) runs the same
  `change_errand_house` RPC with the named house and a fresh draw.
- On success, both messages from the click are edited in place through its
  webhook token: the audience swaps to `close.png` with a granted line, and the
  briefing/report sheet is redrawn exactly as a normal change. That token dies
  15 minutes after the click, so whatever can't be edited rides on
  `/request`'s own reply instead.
- The audience is stamped as `missions.chancellor_audience_at` (migration 026),
  so it survives a restart. The stamp is never cleared: the audience counts as
  open only while the change is still available (unspent, nothing signed), so
  spending it or collecting a signature closes it for good. Opening one is the
  only extra write; a re-click reopens off the row, and `/request` reads it off
  the mission it already loads.
- The click's token and the audience message id stay in memory as edit
  handles that expire with the token (15 min), never in the database. Without
  them (a restart, a slow player) `/request` still changes the house and
  carries the result on its own reply.
- Testing: `/missiondev chancellor [face]` (owner only) is a cosmetic preview
  of the audience message (`listening` = default.png, `granted` = close.png).
  It needs no errand and reads or writes nothing.

---

## 6. Type: Riddle (debunk) — `/riddle`

### Reveal

`/mission` shows the riddle prompt + *"Answer with `/riddle <your answer>`.
Solve it and your `/roam` and `/meet` cooldowns reset on the spot."*

### Riddle pool (`constants/missions.js`)

```js
export const RIDDLES = {
  [HOUSES.HOTARUBI]: [
    { id: 'hotarubi_bell', answer: 'haru',
      prompt: 'A bell in the bamboo rings with no hand near it. The student who tends the shrine each dawn would know its voice. Name them.' },
    // …exactly two per student of that house, keyed to their own script
  ],
  [HOUSES.FROSTHEIM]: [ /* … */ ],
  // … all 8 houses
};
```

- `answer` is a character id; the mission stores `riddle_id` at spawn so two
  accepters who drew different missions face different riddles.
- Every student gets exactly two, so a house's pool never collapses to one
  known report; `test/missions.test.js` holds the count at two.
- Non-character-answer riddles (buttons A/B/C, keyword) are a possible later
  variant; v1 is "name the student", matched by `matchCharacterGuess`.

### `/riddle <answer>` (ephemeral)

1. No pending mission / not a riddle mission → redirect line (mirror `/docs`).
2. In-memory wrong-guess cooldown (`Map<`${missionId}:${userId}`, epochMs>`,
   `RIDDLE_WRONG_COOLDOWN_SECONDS = 20`). Within the window →
   *"Give it a moment — try again in {n}s."*
3. `matchCharacterGuess(input)`:
   - resolves to `riddle.answer` → **correct** (step 4)
   - resolves to a different character, or nothing → **wrong**: set the cooldown,
     reply with a `RIDDLE_WRONG_LINES` entry. No hard attempt cap; the 20s gate
     is what stops brute-forcing 26 names, and the riddle dies with the mission
     (`accept_expires_at`).
4. **Correct** — `complete_mission(missionId, userId, 'riddle')` RPC
   (`UPDATE … SET status='completed' WHERE id AND accepted_by AND status='accepted'`):
   - row updated → ephemeral *"Debunked. **{Full Name}**. Cooldowns cleared —
     go."* Then fire-and-forget:
     `recordMissionCompletion({ …, role: 'lead', points: 1 })`,
     **`resetCommandLimit(userId)` (both)**, analytics.
   - 0 rows (expired in the same instant) → *"That mission just closed."*

---

## 7. Type: Co-op (escort) — `/mission assist`

### Reveal

`/mission` shows: *"You need backup. Run `/mission assist` to call for a
partner — the first inspector to back you up clears it for both of you, and you
both walk away with a cooldown reset."*

### `/mission assist` (public — the one non-deferred, non-ephemeral mission command)

Unlike bare `/mission` / `/docs` / `/riddle`, this path is **not** deferred:
app.js routes `/mission` with `assist:True` straight to `handleMission` and
answers inline. One Supabase read (`getAcceptedMission`) sits on the 3s path and
there is no channel POST — the call-for-backup post *is* the interaction
response (`CHANNEL_MESSAGE_WITH_SOURCE`). If that budget is ever blown the lead
sees "This interaction failed" and nothing posts — a clean no-op they re-run.

Guard refusals (ephemeral, private to the lead):

- Not a pending co-op mission → ephemeral redirect.
- Live assist post already exists (`missions.assist_message_id` set) → *"Your
  call for backup is already up in {channel}."*
- Run outside the mission channel → *"Run `/mission assist:True` in {channel},
  where the mission was posted."* Since the post lands wherever the command is
  run, it has to be run where the inspectors watching for missions will see it.

Otherwise the reply is the public post:

```
content: 🚨 {lead} needs help during this house mission!          allowed_mentions: { parse: [] }
embed:   First inspector to back them up clears it for both of you — one house
         log each, plus a banked cooldown reset.
[ Join the mission ]      custom_id: mission:assist:<missionId>
```

  The lead is named in plain text in the message **content**, with no `<@id>`
  tag, and `allowed_mentions` is closed off entirely — so the post pings nobody,
  same as the pickup post. An unanswered co-op still burns a slot for two
  people, but the lead is the one who ran the command, so a ping back to them
  bought little. The **house** still stays out of the post — the helper learns
  nothing until they've clicked.

  There is no ephemeral confirmation — the public post is the only
  acknowledgement. Its id isn't in hand (Discord posted the reply for us), so
  app.js reads it back with `GET …/messages/@original` and hands it to
  `afterReply`, which stores it as `assist_message_id`.

### Join button → `claim_coop_helper` RPC (§11)

`claim_coop_helper(missionId, clickerId)` → `'joined' | 'self' | 'taken'`:

- `'self'` (clicker is the accepter) → ephemeral *"You can't back yourself up."*
- `'taken'` (already helped / expired / not co-op) → ephemeral *"That mission's
  already covered."*
- `'joined'`:
  - `UPDATE_MESSAGE` on the assist post → *"**{helper}** answered the call for
    backup. Mission complete."*, button disabled.
  - Fire-and-forget for **both** users:
    - `recordMissionCompletion({ …, points: 1 })` for each — accepter
      `role='lead'`, helper `role='assist'`, same `house`, same `mission_id`.
    - one banked **single**-scope reset each (the `mission_log` row is the
      credit); which command it clears is decided at spend time, the longer
      of the two waits (migration 028). No coin flip.
    - analytics for both.
  - Assisting follows the Accept rules (migration 029). A helper who holds
    their own `accepted` mission is refused (`'busy:<type>'`, the usual busy
    line), and the assist counts toward their `DAILY_LEAD_CAP` (`'capped'`).
    Either refusal is ephemeral and leaves the post live. The assist never
    sets `accepted_by` (the co-op completes in the same write), so it never
    occupies the helper's slot afterwards.

### If nobody clicks

`accept_expires_at` passes → the scheduler marks the mission `expired`, the slot
frees. Optionally edit the assist post to a "the moment passed" line if
`assist_message_id` is set.

---

## 8. `/mission` (ephemeral) — always carries instructions

`integration_types: [0, 1]`, `contexts: [0, 1, 2]`, no options.

- No `accepted` mission for the user → show the next slot time:
  *"No active mission. The next briefing lands around `<t:…:t>`."* (next unfired
  slot in `mission_slots_today`, or "tomorrow" if the day is spent).
- Has an `accepted` mission → a three-part body, **instructions always present**:

```
MISSION BRIEFING  ·  {House}  ·  {type label}

{objective line}

Progress: {progress line}

{instruction block for this type}
```

| Type | Progress line | Instruction block |
|---|---|---|
| errand | `2 / N signatures` | `Targets are boosted during /meet and /roam while mission is active. Meet them, then check the sheet and file it with /docs. One house log per signature, plus a banked cooldown reset that clears both.` |
| riddle | `unsolved` | `Answer with /riddle <your answer>. Solve it for one house log, plus a banked cooldown reset: spend it the next time /roam or /meet tells you to wait, and it clears both.` |
| coop | `waiting on a partner` / `partner post is live` | `Call a partner with /mission assist. The first inspector to back you up completes it for both of you. One house log each, plus a banked cooldown reset that clears whichever of /roam or /meet has the longer wait.` |

The per-type "how you finish this" phrasing (`MISSION_NEXT_STEP`, §11.3) is the
same string the `busy:<type>` Accept response uses, so a user who clicks Accept
while already holding a mission is pointed at the exact command `/mission` would
tell them to run.

---

## 9. `/house` → **Inspector dossier** (repurpose)

Keep the command registration and the DEFERRED-ack + `sendFollowup` +
emblem-attachment shape of `buildHouseMessage` (`encounters.js:581`,
`app.js:225`). Replace the body.

```
INSPECTOR DOSSIER — @user

Rank: Senior Inspector          (45 house logs · 11 missions filed)
Next: Special Inspector at 90 house logs

By house
Frostheim   ███████░░░  7
Vagastrom   ████░░░░░░  4
Hotarubi    ██░░░░░░░░  2
Sinostra    ░░░░░░░░░░  0     (…only houses with ≥1, or show all — your call)

Current mission: Hotarubi · riddle · unsolved
Closest house (by affinity): Frostheim
```

- **Rank** from **`SUM(points)`** over `mission_log` for the user (lead + assist
  both count). The dossier also shows the raw `count(*)` ("missions filed")
  alongside, since an errand can be worth up to 4.

  ```js
  export const INSPECTOR_RANKS = [   // thresholds are POINT (house log) totals
    { min: 0,   name: 'Novice Inspector' },
    { min: 30,  name: 'Field Inspector' },
    { min: 80,  name: 'Senior Inspector' },
    { min: 180, name: 'Special Inspector' },
    { min: 320, name: "Chancellor's Right Hand" },
  ];
  ```

  Paced against `RELATIONSHIP_LEVELS` (constants/game.js), and doubled
  2026-09 alongside that table's own raise. The original pacing assumed
  ~0.36 house logs/day per average player in a single ~20-player guild. The
  measured rates in `docs/benkei-shop.md` §1 (all guilds, 2026-10-08) are
  much higher: ~1–2.2/day mid-pack and ~3–3.8/day for the top six, because
  `MISSIONS_PER_DAY` is per guild and players earn across guilds. Logs are also
  store credit now (§22), so rank pace and shop prices move together; retune
  both against the same `mission_log` numbers.

- **By house** from `SELECT house, SUM(points) FROM mission_log WHERE
  discord_user_id = $1 GROUP BY house`. Bar via `renderHeartBar`
  (`constants/game.js:114`) or a plain block bar; highest total first.
- **Current mission**: the user's `accepted` mission — `house · type · progress`
  (progress as in §8), or *"none"*.
- **Closest house (by affinity)**: keep one line of the old behavior — the
  top-affinity house from `getUserRelationships` — so nothing is lost.
- **Emblem attachment**: the house with the highest `SUM(points)` (tie → latest
  `completed_at`); if the user has zero missions, fall back to the top-affinity
  house emblem, or omit.
- No pending mission **and** no history → *"No missions on record yet. Watch
  {channel} for a briefing."*

---

## 10. Data model — migration `011_create_missions.sql`

`010_` is reserved by `public-encounters.md`. If missions ship first, renumber
to `010_` and move the `guild_settings` **creation** here.

```sql
-- guild_settings is created in 010_create_public_encounters.sql. Add mission
-- config + per-day slot state.
ALTER TABLE guild_settings
  ADD COLUMN IF NOT EXISTS mission_channel_id  TEXT,     -- NULL → fall back to encounter_channel_id
  ADD COLUMN IF NOT EXISTS missions_enabled    BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS mission_slots_day   DATE,
  ADD COLUMN IF NOT EXISTS mission_slots_today JSONB,
  ADD COLUMN IF NOT EXISTS mission_slots_fired JSONB NOT NULL DEFAULT '[]'::jsonb;
-- count / gap / window are hard-coded constants (§3), not per-guild columns.

CREATE TABLE IF NOT EXISTS missions (
  id                  BIGSERIAL PRIMARY KEY,
  guild_id            TEXT NOT NULL,
  channel_id          TEXT NOT NULL,
  message_id          TEXT,                       -- the channel post; set after POST succeeds
  mission_type        TEXT NOT NULL,              -- 'errand' | 'riddle' | 'coop'
  house               TEXT NOT NULL,              -- HOUSES value
  riddle_id           TEXT,                       -- key into RIDDLES[house]; NULL unless type='riddle'
  signatures_required INT,                        -- errand only: random 1..house roster size, frozen at spawn
  teaser              TEXT NOT NULL,              -- the MISSION_TEASERS line used
  created_at          TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  post_expires_at     TIMESTAMP WITH TIME ZONE NOT NULL,   -- created_at + POST_TTL_HOURS (2)
  accepted_by         TEXT,
  accepted_at         TIMESTAMP WITH TIME ZONE,
  accept_expires_at   TIMESTAMP WITH TIME ZONE,   -- accepted_at + ACCEPT_WINDOW_HOURS (48)
  helper_user_id      TEXT,                       -- coop only
  assist_message_id   TEXT,                       -- coop only: the public /mission assist post
  status              TEXT NOT NULL DEFAULT 'open',  -- 'open' | 'accepted' | 'completed' | 'expired'
  completed_at        TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_missions_guild_status ON missions (guild_id, status);

-- THE "at most one held mission per user" invariant. Completed/expired rows
-- leave the predicate, so the slot frees automatically — no cleanup job.
CREATE UNIQUE INDEX IF NOT EXISTS missions_one_accepted_per_user
  ON missions (accepted_by) WHERE status = 'accepted';

-- One row per errand signature TARGET, all inserted at spawn. signed_at flips
-- from NULL to a timestamp when the accepter meets that character. The errand
-- is filable when no NULLs remain. Row count == missions.signatures_required.
CREATE TABLE IF NOT EXISTS mission_signatures (
  mission_id   BIGINT NOT NULL REFERENCES missions(id) ON DELETE CASCADE,
  character_id TEXT NOT NULL,
  signed_at    TIMESTAMP WITH TIME ZONE,        -- NULL until the target is met
  PRIMARY KEY (mission_id, character_id)
);

CREATE TABLE IF NOT EXISTS mission_log (
  id              BIGSERIAL PRIMARY KEY,
  discord_user_id TEXT NOT NULL,
  house           TEXT NOT NULL,
  mission_type    TEXT NOT NULL,                  -- 'errand' | 'riddle' | 'coop'
  mission_id      BIGINT REFERENCES missions(id) ON DELETE SET NULL,
  role            TEXT NOT NULL DEFAULT 'lead',   -- 'lead' | 'assist'
  points          INT  NOT NULL DEFAULT 1,        -- errand: = signatures collected (1..4); riddle/coop: 1
  completed_at    TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_mission_log_user       ON mission_log (discord_user_id);
CREATE INDEX IF NOT EXISTS idx_mission_log_user_house ON mission_log (discord_user_id, house);

ALTER TABLE missions           ENABLE ROW LEVEL SECURITY;
ALTER TABLE mission_signatures ENABLE ROW LEVEL SECURITY;
ALTER TABLE mission_log        ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Block direct access" ON missions           FOR SELECT USING (FALSE);
CREATE POLICY "Block direct access" ON mission_signatures FOR SELECT USING (FALSE);
CREATE POLICY "Block direct access" ON mission_log        FOR SELECT USING (FALSE);
```

---

## 11. Race conditions — the Accept claim and friends

**Governing rule:** the channel post's Accept button is disabled on a confirmed
1-row win (`UPDATE_MESSAGE`, button + text) **and** on a `taken` result (button
only) — both mean the mission is claimed, so the post should stop taking clicks,
and the `taken` edit doubles as the fast self-heal for a win-edit that failed
(see §11.6). An **over-limit / busy** click, where the mission is still `open`,
gets an **ephemeral** reply and leaves the post and its live button untouched —
you cannot per-user disable a button on a shared message, so an over-limit user
*will* see an enabled button and click it; the handling below makes that safe.

The Accept dispatch is answered with `DEFERRED_UPDATE_MESSAGE` first, then
resolved over the interaction webhook (PATCH `@original` for the button edit, a
`flags: 64` followup for the ephemeral). The claim RPC does one or two Supabase
round trips before it knows the outcome, and a slow database would otherwise
overrun Discord's 3-second window: a missed window drops the button edit even
though the RPC committed, and 404s every followup ("Unknown Webhook").

### 11.1 `claim_mission` — one atomic statement in an RPC

The "mission is open" check and the "this user holds no other mission" check
must be the **same** statement, so an ineligible click updates **zero rows** and
the mission stays `open` for the next person.

```sql
CREATE OR REPLACE FUNCTION claim_mission(p_mission_id BIGINT, p_user_id TEXT)
RETURNS TEXT LANGUAGE plpgsql AS $$
BEGIN
  UPDATE missions
     SET accepted_by = p_user_id,
         accepted_at = NOW(),
         accept_expires_at = NOW() + INTERVAL '48 hours',   -- ACCEPT_WINDOW_HOURS
         status = 'accepted'
   WHERE id = p_mission_id
     AND status = 'open'
     AND NOT EXISTS (
       SELECT 1 FROM missions
        WHERE accepted_by = p_user_id AND status = 'accepted'
     );

  IF FOUND THEN
    RETURN 'claimed';
  ELSIF EXISTS (SELECT 1 FROM missions WHERE id = p_mission_id AND status = 'open') THEN
    -- mission still open ⇒ the blocker was this user's existing mission.
    -- Return its type so the caller can name the command that finishes it.
    RETURN 'busy:' || COALESCE(
      (SELECT mission_type FROM missions
        WHERE accepted_by = p_user_id AND status = 'accepted' LIMIT 1),
      'unknown');
  ELSE
    RETURN 'taken';  -- someone else has it
  END IF;
END;
$$;
```


### 11.2 The partial unique index is the real invariant

`NOT EXISTS` handles the common case cleanly (0 rows, no error, friendly
message), but it is vulnerable to **write skew**: one user double-clicking
**two different** fresh mission posts within a few milliseconds. Under Postgres
`READ COMMITTED`, both subqueries can read "no accepted mission" before either
commits, and both `UPDATE`s pass. `missions_one_accepted_per_user`
(§10) stops that — the second commit violates the constraint and raises
`23505`. The caller catches `23505` and treats it as `'busy:unknown'` (the
generic three-command line — it never received a mission type back).

### 11.3 Caller → Discord response

```js
// Shared with §8's instruction blocks — the "how you finish this type" phrasing.
const MISSION_NEXT_STEP = {
  errand: 'collect its signatures and file it with `/docs`',
  riddle: 'solve it with `/riddle`',
  coop:   'call a partner with `/mission assist`',
};
const busyLine = (type) =>
  `You already have a mission in progress — ${
    MISSION_NEXT_STEP[type] ??
    'wrap it up with `/docs`, `/riddle`, or `/mission assist`'
  } first.`;

let outcome;
try {
  ({ data: outcome } = await supabase.rpc('claim_mission',
    { p_mission_id: id, p_user_id: userId }));
} catch (e) {
  if (e.code === '23505') outcome = 'busy:unknown';   // simultaneous double-accept
  else throw e;
}

if (outcome?.startsWith('busy')) {
  // 'busy:errand' | 'busy:riddle' | 'busy:coop' | 'busy:unknown'
  return ephemeral(busyLine(outcome.split(':')[1]));
}
switch (outcome) {
  case 'claimed':                              // win: rewrite text + disable button
    return { response: { type: InteractionResponseType.UPDATE_MESSAGE, data: {
      content: `**${displayName}** has picked up the mission.`,
      components: [disabledAcceptRow],
    }}, followup: ephemeral(briefing) };
  case 'taken':                                // already claimed: disable button only
    return { response: { type: InteractionResponseType.UPDATE_MESSAGE, data: {
      components: [disabledAcceptRow],         // no text — a winner's line is not clobbered
    }}, followup: ephemeral("Someone got there first.") };
}
```

Both `claimed` and `taken` touch the post; only `busy`/`capped` (mission still
`open`) return an ephemeral and nothing else. The dispatch acks with
`DEFERRED_UPDATE_MESSAGE` and then PATCHes `@original` — so a slow
`claim_mission` cannot cost the button edit its 3-second window.

The `busy:unknown` fallback only hits on the rare `23505` path (a truly
simultaneous double-accept, where the caller never got a type back); it shows
the three-command line. Every ordinary "you already hold one" click carries the
type and names the single command.

### 11.4 Every race walked

| Race | Outcome |
|---|---|
| **Two eligible users, same fresh mission** | Postgres row lock serializes the two `UPDATE`s. First commits (`status='accepted'`) → win edit (text + disabled button). The second matches 0 rows → `'taken'` → button-only disable edit (idempotent when the win edit already landed) + "Someone got there first." ephemeral. |
| **Over-limit user clicks first, then user B** | User A's `UPDATE` fails `NOT EXISTS` → 0 rows, mission **stays `open`** → A gets `'busy:<type>'` (ephemeral names the command that finishes A's current mission), post never edited. User B's click a moment later hits an `open` mission → `'claimed'`. B was never blocked. |
| **One user, two different fresh missions, near-simultaneous** | `NOT EXISTS` may pass for both; the partial unique index rejects the second commit with `23505` → caller maps to `'busy:unknown'` (generic three-command line). User keeps exactly one. |
| **User completes old mission + accepts new one in the same instant** | Completion first → claim succeeds. Claim first → `NOT EXISTS` still sees the old `accepted` row → `'busy:<type>'`, user retries. Correct either way; the index also naturally frees the slot once the old row is `completed`. |
| **Accept vs. scheduler withdrawal (`post_expires_at`)** | Withdrawal is `UPDATE … SET status='expired' WHERE id AND status='open'`. Whichever commits first wins on `status='open'`; the loser matches 0 rows. If the user won, the withdrawal no-ops; if withdrawal won, the user gets `'taken'`. |
| **`/docs` "Complete mission" vs. scheduler `accept_expires_at`** | `file_errand` locks the row `FOR UPDATE` and re-checks `status='accepted'`; the expiry `UPDATE` does the same. One wins, the other returns `'gone'` / no-ops. |

### 11.5 The other two claim RPCs

```sql
CREATE OR REPLACE FUNCTION file_errand(p_mission_id BIGINT, p_user_id TEXT)
RETURNS TEXT LANGUAGE plpgsql AS $$
DECLARE unsigned INT;
BEGIN
  PERFORM 1 FROM missions
   WHERE id = p_mission_id AND accepted_by = p_user_id
     AND status = 'accepted' AND mission_type = 'errand'
   FOR UPDATE;
  IF NOT FOUND THEN RETURN 'gone'; END IF;

  SELECT count(*) INTO unsigned FROM mission_signatures
   WHERE mission_id = p_mission_id AND signed_at IS NULL;
  IF unsigned > 0 THEN RETURN 'not_ready'; END IF;

  UPDATE missions SET status = 'completed', completed_at = NOW() WHERE id = p_mission_id;
  RETURN 'filed';
END;
$$;

CREATE OR REPLACE FUNCTION claim_coop_helper(p_mission_id BIGINT, p_user_id TEXT)
RETURNS TEXT LANGUAGE plpgsql AS $$
DECLARE m missions;
BEGIN
  SELECT * INTO m FROM missions WHERE id = p_mission_id FOR UPDATE;
  IF NOT FOUND
     OR m.status <> 'accepted' OR m.mission_type <> 'coop' OR m.helper_user_id IS NOT NULL
  THEN RETURN 'taken'; END IF;
  IF m.accepted_by = p_user_id THEN RETURN 'self'; END IF;

  UPDATE missions
     SET helper_user_id = p_user_id, status = 'completed', completed_at = NOW()
   WHERE id = p_mission_id AND status = 'accepted' AND helper_user_id IS NULL;
  RETURN 'joined';
END;
$$;

-- riddle solve
CREATE OR REPLACE FUNCTION complete_mission(p_mission_id BIGINT, p_user_id TEXT, p_type TEXT)
RETURNS BOOLEAN LANGUAGE plpgsql AS $$
BEGIN
  UPDATE missions SET status = 'completed', completed_at = NOW()
   WHERE id = p_mission_id AND accepted_by = p_user_id
     AND status = 'accepted' AND mission_type = p_type;
  RETURN FOUND;
END;
$$;
```

`FOR UPDATE` row locks serialize the co-op join and the errand file against the
scheduler's expiry sweep; the winner mutates, the loser returns a terminal
status. `mission_log` writes are fire-and-forget **after** the RPC confirms.

### 11.6 The post edit can fail on its own — the reconcile backstop

`claim_mission` committing and the `@original` PATCH landing are two separate
network events. The RPC can win and the edit still fail: an interaction token
that expired (a slow claim ate the ack window), a transient Discord 5xx on the
edit, the post deleted, permissions pulled. The row is then `accepted` but the
post still shows a live Accept button, and neither expiry sweep touches it —
`finalizeWithdrawnMission` only edits `open` rows, `finalizeLapsedMission`
deliberately leaves an accepted post alone.

Two things close that gap:

1. **`missions.post_reconcile_needed`** (migration 019). `app.js` sets it when the
   accept edit throws. `reconcileMissionPosts()` runs on every mission tick (and
   inside `sweepExpiredMissions`), edits the post with the **bot token** — the
   interaction webhook is dead by then — to a name-free "already picked up" line
   with the button stripped, and clears the flag. A still-failing edit keeps its
   flag for the next tick.
2. **The `taken` button-disable edit** (§11.3). The next person to click a
   stranded post gets their click turned into a button-disable `UPDATE_MESSAGE`,
   so the post stops taking clicks immediately rather than waiting up to a tick
   for the sweep.

---

## 12. New `db/supabase.js` functions

| Function | Purpose |
|---|---|
| `getMissionGuilds()` | `guild_settings WHERE missions_enabled = true` — the scheduler's per-tick list |
| `rollGuildMissionSlots(guildId, day, slots)` | write `mission_slots_day/today`, reset `mission_slots_fired` |
| `markMissionSlotFired(guildId, index)` | append to `mission_slots_fired` |
| `createMission({ guildId, channelId, type, house, riddleId, signaturesRequired, teaser, postExpiresAt })` | INSERT the `missions` row, returns it |
| `createErrandTargets(missionId, characterIds[])` | bulk-INSERT the `N` `mission_signatures` target rows (`signed_at = NULL`) at spawn |
| `setMissionMessageId(id, messageId)` | after the POST succeeds |
| `getOpenMission(guildId)` | `status='open'` row for the single-live guard |
| `getAcceptedMission(userId)` | the user's held mission, for `/mission` `/docs` `/riddle` `/house` |
| `claimMission(id, userId)` | RPC wrapper (§11.1); returns `'claimed' \| 'taken' \| 'busy:errand' \| 'busy:riddle' \| 'busy:coop' \| 'busy:unknown'` |
| `fileErrand(id, userId)` | RPC wrapper; `'filed' \| 'not_ready' \| 'gone'` |
| `claimCoopHelper(id, userId)` | RPC wrapper; `'joined' \| 'self' \| 'taken'` |
| `completeMission(id, userId, type)` | RPC wrapper (riddle); `boolean` |
| `signErrandTarget(missionId, characterId)` | `UPDATE … SET signed_at = NOW() WHERE … AND signed_at IS NULL` `.select()`; returns whether a row flipped |
| `getErrandTargets(missionId)` | `[{ characterId, signed }]` for `/docs` and `/mission` |
| `getActiveErrandBoost(userId)` | `{ missionId, house, unsignedTargetIds[] }` (or null) — the per-user lookup the `/roam` roll and `/meet` picker use to bias toward unsigned targets |
| `setAssistMessageId(id, messageId)` | co-op: store the public assist post id |
| `finalizeExpiredMissions(guildId?)` | atomic `UPDATE … status='expired'` for `open`/`accepted` past their deadlines; returns finalized rows so the sweep can edit posts |
| `recordMissionCompletion({ userId, house, type, missionId, role, points })` | INSERT one `mission_log` row (`points` = `N` for errand, `1` for riddle/co-op) |
| `getMissionLogStats(userId)` | `{ points, filed, byHouse: { [house]: points } }` for `/house` — `points` = `SUM(points)`, `filed` = `count(*)` |

---

## 13. `commandLimits.js`

No new code — `resetCommandLimit(userId, command = null)` already exists
(`commandLimits.js`, delegating to `clearCommandLimit` in `db/supabase.js`).
Rename the "(for testing)" comment; it is now a real reward path.

- Errand / riddle reward: `resetCommandLimit(userId)` — clears **both**
  `/roam` and `/meet` (the shared 3h clock).
- Co-op reward: a banked `single`-scope reset for each user, spent on the
  longer of the two waits (migration 028). The original shared coin flip is
  gone (see the banking note at the top).

---

## 14. Flavor text (`constants/missions.js`)

```js
export const MISSION_TEASERS = [
  'Calling Inspector — a new mission request has come in.',
  'A special mission request just landed on the board.',
  "Report to the Chancellor's office for a new briefing.",
  'The Chancellor is asking for an inspector. Now.',
  'New assignment posted. First one to it takes it.',
  'A request has come down from the top. Who wants it?',
  'Field work available. The briefing is waiting.',
  'An anomaly report needs an inspector attached to it.',
  "There's a folder on the Chancellor's desk with your name space blank.",
  'One mission. One inspector. Move.',
  'The board just lit up. New request, house withheld.',
  'Someone upstairs needs this handled quietly. Accept?',
];

export const MISSION_PICKED_UP = (name) => `**${name}** has picked up the mission.`;

export const MISSION_WITHDRAWN_LINES = [
  'The request was withdrawn before anyone took it.',
  'Too slow — the Chancellor reassigned it internally.',
  'The folder came off the board. Maybe next time.',
  'Nobody moved on it. The mission lapsed.',
  'The briefing room went dark. Opportunity gone.',
];

export const RIDDLE_WRONG_LINES = [
  "That's not who's behind this. Look again.",
  'Wrong read on the evidence.',
  "The pieces don't point there.",
  'Not them. The anomaly persists.',
];

export const INSPECTOR_RANKS = [   // thresholds are mission_log POINT (house log) totals (§9)
  { min: 0,   name: 'Novice Inspector' },
  { min: 30,  name: 'Field Inspector' },
  { min: 80,  name: 'Senior Inspector' },
  { min: 180, name: 'Special Inspector' },
  { min: 320, name: "Chancellor's Right Hand" },
];

// signatures_required roll (§5): randInt(1, getCharactersByHouse(house).length)
// RIDDLES: { [house]: [ { id, prompt, answer /* character id */ } ] }  — see §6
```

Objective lines per `(type, house)` can start as one template each
(parameterized by house name) and grow into small per-house pools, exactly like
`ENCOUNTER_TEASERS` / `WINNER_LINES` in the encounters spec.

---

## 15. Tuning constants (`constants/missions.js`)

No new env vars — everything is a hard-coded constant. Nothing here is
admin-configurable.

| Constant | Value | Purpose |
|---|---|---|
| `MISSIONS_PER_DAY` | `6` | Slots per guild per local day (ceiling 7) |
| `WINDOW_START_HOUR` / `WINDOW_END_HOUR` | `5` / `24` | Active window, America/Chicago (05:00–midnight CT) |
| `MIN_GAP_MS` | `2h` | Minimum spacing between consecutive slots |
| `STALE_SLOT_MINUTES` | `90` | Skip a slot that comes due more than this late |
| `POST_TTL_HOURS` | `2` | Unaccepted post → withdrawn |
| `ACCEPT_WINDOW_HOURS` | `48` | Accepted-but-unfinished → expired, slot frees |
| `RIDDLE_WRONG_COOLDOWN_SECONDS` | `20` | Gap between wrong `/riddle` guesses (in-memory) |
| `WEIGHT_RIDDLE` / `WEIGHT_ERRAND` / `WEIGHT_COOP` | `45` / `45` / `10` | Type roll at spawn (co-op cut to a 10 floor 2026-09; see §22) |
| `DAILY_LEAD_CAP` | `2` | Missions taken per user per local day, accepts + assists (migration 029) |
| `ERRAND_ROAM_TARGET_BIAS` | `~0.5` | Chance a `/roam` by an errand holder is steered to a still-unsigned target instead of the normal roll |

`DISCORD_TOKEN`, `APP_ID`, `SUPABASE_*`, `BASE_URL` already present; this feature
adds nothing to `.env`.

---

## 16. Edge cases

| Case | Handling |
|---|---|
| Two users click Accept together | `claim_mission` row lock → one `'claimed'`, one `'taken'`; single `UPDATE_MESSAGE` (§11.4) |
| Over-limit user clicks Accept first | `'busy:<type>'` ephemeral naming the command to finish their held mission (`/docs` / `/riddle` / `/mission assist`); mission stays `open`; button live for everyone else (§11.4) |
| One user double-accepts two missions | Partial unique index → second commit `23505` → `'busy:unknown'` (§11.2) |
| Slot comes due while an `open` mission exists | Slot marked fired, skipped — never two live requests |
| Host asleep across a slot | Slot > 90 min late → marked fired, not posted |
| Accepted mission never finished | `accept_expires_at` → `status='expired'`, slot frees; no channel edit |
| Errand for Mortkranken (2 students) | `N` rolls 1–2; that many targets drawn from its 2 students, frozen at spawn |
| Errand rolls `N = 1` | One target, one meeting, 1 point (same value as a riddle) |
| Player meets a **non-target** student of the mission house | Nothing happens — only the `N` named targets sign |
| `/roam` surfaces a target (via the boost) | Signs it on response completion, same as a deliberate `/meet` |
| Player had high affinity with a target before pickup | Not auto-signed — must meet them again while the errand is `accepted` |
| All targets signed, errand not yet filed | Boost stops (nothing unsigned); `/docs` "Complete mission" button is enabled |
| `/meet` while holding an `N = 4` errand | All 4 pick slots are the unsigned targets |
| `/roam` / `/meet` with no active errand, or errand in a house whose targets are all signed | Normal roll / random picker — boost is a no-op |
| `/docs` "Complete" clicked with a stale button | `file_errand` re-checks for unsigned `mission_signatures` → `'not_ready'` |
| Co-op: accepter clicks own Join button | `'self'` → ephemeral refusal |
| Co-op: two helpers click together | `claim_coop_helper` row lock → one `'joined'`, one `'taken'` |
| Co-op: helper already has their own accepted mission | Refused with the busy line (`'busy:<type>'`, migration 029); post stays live for someone else |
| Co-op: helper is at the daily cap | `'capped'` → ephemeral refusal; post stays live for someone else |
| Co-op: nobody joins before expiry | Mission `expired`, slot frees; optional "moment passed" edit |
| `/riddle` brute-forcing names | 20s cooldown per wrong guess; riddle dies at `accept_expires_at` |
| `/mission` / `/docs` / `/riddle` with no pending mission | Ephemeral guidance (next slot time / redirect) |
| Mission channel POST fails (perms/deleted/5xx) | Row `expired`; reuse encounter `post_failures` handling |
| Process restart mid-day | Tick re-reads `guild_settings`; regenerates slots only if `mission_slots_day` stale; posts due-unfired slots |
| Multiple app instances | Out of scope — would double-fire the tick; needs a Postgres advisory lock around it (same caveat as encounters) |

---

## 17. Files added / changed

**New**

- `constants/missions.js` — `MISSION_TEASERS`, `MISSION_WITHDRAWN_LINES`,
  `RIDDLE_WRONG_LINES`, `RIDDLES`, `INSPECTOR_RANKS`, `ERRAND_ROAM_TARGET_BIAS`,
  `MISSION_NEXT_STEP`, objective templates, type-roll + slot-roll +
  `signatures_required` roll + target-subset pick helpers, the wrong-guess `Map`
- `missions.js` — `buildMissionPost(mission)`, `buildMissionRevealMessage(m)`
  (`/mission`), `buildDocsMessage(m)` (`/docs`), `handleRiddle(interaction)`,
  `handleMissionAssist(interaction)`, button handlers for
  `mission:accept|file|assist`, `finalizeMission(row)` — mirrors `encounters.js`
- `db/migrations/011_create_missions.sql` — §10, incl. the four RPC functions
  (§11)

**Changed**

- `encounterScheduler.js` — add the mission pass (roll-day / finalize / spawn;
  the errand spawn also calls `createErrandTargets`) to the existing tick
- `commands.js` — register `MISSION_COMMAND`, `DOCS_COMMAND`, `RIDDLE_COMMAND`,
  and the `/missions` admin subcommands
- `app.js` — route `name === 'mission' | 'docs' | 'riddle' | 'missions'`; route
  `custom_id` `mission:accept | mission:file | mission:assist`; pass `userId`
  into `buildMeetPickMessage`
- `encounters.js` —
  - `buildHouseMessage` → Inspector dossier (§9)
  - `buildResponseResultMessage`, after `recordResponse`: if the user has an
    `accepted` errand and `characterId` is a still-unsigned target, call
    `signErrandTarget` (§5)
  - `buildRoamDialogueMessage` — bias the character roll toward
    `getActiveErrandBoost(userId).unsignedTargetIds` (`ERRAND_ROAM_TARGET_BIAS`)
  - `buildMeetPickMessage(userId)` — new param; seed unsigned errand targets as
    guaranteed slots, fill the rest as today
- `db/supabase.js` — the functions in §12
- `commandLimits.js` — comment only (§13)
- `.env.sample`, `README.md`, `db/SCHEMA.md` — document the feature + config

---

## 18. Decisions locked in

1. **6 missions/day per guild** (originally 3), at banded random times — one uniform-random
   slot per equal sixth of a **fixed** 05:00–24:00 America/Chicago window,
   ≥ 2h apart. Count, gap and window are hard-coded constants, **not**
   admin-configurable. The admin command is enable / disable / status only.
   Spread for early-morning and late-night players, unpredictable day to day.
   Slot state in `guild_settings`; restart-safe.
2. **Type weights: riddle 45 / errand 45 / co-op 10** (originally 50 / 25 / 25), rolled at spawn with the
   house. Neither type nor house is shown in the channel — only `/mission`
   reveals them.
3. **At most one accepted mission per user**, enforced by a partial unique index
   `missions(accepted_by) WHERE status='accepted'` **plus** an atomic
   `claim_mission` RPC. An ineligible/ losing Accept click updates 0 rows and
   the post is never edited — the button stays live for the next person (§11).
   When the block is the user's *own* held mission, the RPC returns
   `busy:<type>` and the ephemeral reply names the command that finishes it
   (`/docs` / `/riddle` / `/mission assist`).
4. **Rewards** (never affinity). `mission_log` stores **points**; rank and the
   per-house tally are `SUM(points)` (§9).
   - **Errand** — `N = randInt(1, houseSize)` rolled at spawn, then `N` specific
     **target students** drawn from the house and named in `/mission` / `/docs`.
     Meeting a target via `/roam` / `/meet` signs it; **only targets count**.
     While the errand is held, its unsigned targets are **boosted in that
     user's `/roam` and `/meet`** (`ERRAND_ROAM_TARGET_BIAS`; guaranteed `/meet`
     slots) so the chase is feasible — the boost changes who appears, not the
     cooldown. A **Complete mission** button in `/docs` files it → **one
     `mission_log` row worth `N` points** (lead) + reset **both** `/roam` and
     `/meet` cooldowns.
   - **Riddle** — `/riddle <answer>` matched by `matchCharacterGuess`; correct
     → **1 point** (lead) + reset **both** cooldowns. Wrong → 20s cooldown, no
     cap.
   - **Co-op** — `/mission assist` posts a public **Join the mission** button; a
     *different* user clicks → **1 point each** for both (lead + assist) + a
     banked **single** reset each (longer wait at spend time). The helper does
     not hold the mission, but the assist counts toward their
     `DAILY_LEAD_CAP` and is refused while they hold their own (migration 029).
   - **Boosts** (§20, §21): riddle → the culprit, co-op → a debrief student
     for each player. Errand gets none, deliberately (§22).
5. **`/mission`, `/docs`, `/riddle` are ephemeral.** They reveal the house
   and/or per-user state. The only public mission command is `/mission assist`
   (another user must see and click its button). The public surface is the
   channel post + the `{username} has picked up the mission` edit.
6. **`/mission` always includes instructions** for the pending type (how `/docs`
   / `/riddle` / `/mission assist` work).
7. **`/house` is repurposed** into an Inspector dossier: rank from total
   `mission_log` **points** (`SUM(points)`), per-house point bars, missions-filed
   count, current pending mission. One line of the old "closest house by
   affinity" behavior is kept.
8. **Accepted-mission TTL 48h**, **unaccepted post TTL 2h** — both finalized by
   the scheduler; expiry frees the slot via the partial index.
9. Shares `guild_settings`, the scheduler tick, the channel REST helpers, and
   `matchCharacterGuess` with `public-encounters.md` (§0).

---

## 19. Open questions

- **Errand grind loop.** An `N ≥ 2` errand spends up to `N−1` cooldown-gated
  meets (the first is free if you're off cooldown) and pays `N` points + a full
  both-command reset — net cooldown-positive, and now point-positive too.
  *Partly answered:* `DAILY_LEAD_CAP = 2` (accepts + assists) bounds the chain
  at two missions a day, and banking removed the reset-timing exploit. Since
  logs became store credit (§22), watch errand-driven 💎 income against shop
  prices rather than rank pace.
- **Rank thresholds vs. scaled errands.** `INSPECTOR_RANKS` thresholds are point
  totals; a lucky run of `N = 4` errands climbs the ladder ~4× faster than a
  riddle streak. Rebalance the thresholds (or cap errand points) if progression
  feels too swingy once real data exists.
- **`N = 1` errands.** A 1-signature errand is one meeting for 1 point +
  full reset. Since §20 a riddle pays the same plus a culprit boost, so an
  `N = 1` errand is now the weakest roll in the pool. Fine at its frequency
  (1 in ~2 errand rolls for Mortkranken, 1 in 4 for Frostheim/Dionysia), or
  bump the floor to 2 for houses that can support it.
- **Target-boost strength.** `ERRAND_ROAM_TARGET_BIAS ≈ 0.5` means half an
  errand holder's `/roam`s aren't really random while the mission is open — does
  that dull `/roam`'s discovery feel? Options: lower the bias, or only apply it
  when the user's cooldown is actually ready.
- **`/meet` guaranteed vs. weighted.** Written as guaranteed slots for unsigned
  targets; a softer version just raises their odds in the 4-pick.
- **Reveal targets in `/mission`.** Currently `/mission` names them outright. A
  "you'll know them when you see them" version hides the names until the first
  `/docs`.
- ~~**Per-day completion cap.**~~ Answered: `DAILY_LEAD_CAP = 2` on missions
  taken (accepts + assists, migration 029), not on completions.
- **`/docs` name.** Reads like "documentation". `/report` or `/file` if that's
  clearer — cosmetic.
- **Expired accepted missions in the dossier.** Show an "unfiled" blemish count,
  or drop silently? Currently silent.
- ~~**Co-op reset roll.**~~ Answered by banking: no roll; each user's single
  reset clears the longer wait at spend time (migration 028).
- **Riddle answer types.** v1 is "name the student" only. Buttons (A/B/C) or
  keyword answers are a later variant.
- **Co-op weight.** Held at 10 until the debrief (§21) has been live long
  enough to measure how often a call for backup gets answered. Errand
  holders are locked out of assisting for as long as they hold one (up to
  48h), so the helper pool is smaller than the active roster. If most calls
  are answered, 15 is the next step (take it from riddle, not errand, per §22).
- **Assist post house leak.** Spec keeps the house out of the `/mission assist`
  post for consistency; confirm that's wanted vs. showing it to attract a
  helper.

---

## 20. Expansion: culprit reveal + accusations

Status: **built** 2026-10-08. `portraitMessage(characterId, face, text)` lives
in `missions/shared.js` with an `ephemeralPortraitMessage` variant, and also
drops the thumbnail when the face file doesn't exist. The boost line is
`MISSION_BOOST_LINE` in `constants/missions.js`. There is no accusation face
table: `accusedFace` falls back to serious wherever the art has no annoyed
drawing, and `validateContent()` fails the build on a missing mission
portrait. `app.js sendFollowup` keeps a reply's non-ephemeral flags
(IS_COMPONENTS_V2) when it edits a deferred ack.

Gives `/riddle` character art in both directions. A wrong guess that names a
real student shows that student's annoyed face. A correct guess shows the
culprit caught out, with an authored line, and grants a pending boost with
them. Both replies keep the Chancellor's audience layout (§20.3).

### 20.1 Terms

- **Culprit**: the riddle's `answer` character.
- **Accusation**: a wrong `/riddle` guess that `matchCharacterGuess` resolves
  to a real character. A guess that resolves to nobody is a **miss**.
- **Culprit reveal**: the reply to a correct `/riddle`.
- **Riddle winning line**: the authored line in a culprit reveal, one per
  riddle.

### 20.2 Accusation (wrong guess, names a real character)

- Reply is ephemeral, in the thumbnail layout (§20.3), with the accused's
  `annoyed.png`. Alan, Edward and Haku have no `annoyed` drawing and show
  `serious.png`, the same substitution `SCENE_FACE_OVERRIDES` makes for call
  scenes.
- The text is a `RIDDLE_WRONG_LINES` entry, unchanged. No accused dialogue, no
  printed name: the face says who was accused. Nothing new is authored.
- Applies to any accused character: the culprit's housemates, other houses,
  Benkei.
- The 20s wrong-guess cooldown starts exactly as today. An accusation costs
  nothing else and has no per-mission limit; it pays nothing, so there is
  nothing to farm.
- A **miss** is unchanged: plain ephemeral text, no portrait.
- The in-cooldown reply (*"Give it a moment…"*) is unchanged and shows no face.

### 20.3 Layout

Both replies reuse `chancellorMessage`'s shape (`missions/shared.js`): one V2
Container in the board's color, a Section holding the text as a Text Display
with the face as a Thumbnail accessory, served from
`/assets/expressions/<id>/<face>`. It needs a character id as well as a face,
so `chancellorMessage` becomes a thin wrapper over a shared
`portraitMessage(characterId, face, text)` (name is a suggestion). Sent with
the ephemeral flag added, as the audience does.

With no usable URL (`BASE_URL` unset, or the face file missing) the
thumbnail is dropped and the text sends on its own, the existing fallback.

Not the call scene gallery layout: that full-size portrait stays reserved for
call scenes.

### 20.4 Culprit reveal (correct guess)

Ephemeral, thumbnail layout, the culprit's `sweat.png`. **No buttons**: the
reward is automatic. The portrait's text, a blank line between the two:

1. `Debunked. **{Full Name}**.` (kept: the thumbnail is too small to identify
   by face alone)
2. The **riddle winning line** (§20.5), wrapped in straight `"…"` by the code
   (the content carries no quotes)

The rewards follow as a second ephemeral (the handler's `followup`, sent by
app.js only once the reveal has landed), so the portrait stays small. A blank
line between the two (2026-10-08):

1. The **boost line**: always shown, shared, plain, so every solver learns
   riddles grant a boost, e.g. *"A pending boost with {firstName} is waiting
   on your next `/roam` or `/meet`."* Wording is TBD, but it must stay true
   when the cap means nothing new was added (the player already holds one), so
   it states that a boost is waiting, never that one was just added. `{firstName}`
   only, no he/him about the character.
2. `BANKED_RESET_LINE`, unchanged

**Reward.** On a completed `complete_mission`, `afterReply` also calls
`grantEncounterBoost(userId, culprit, ENCOUNTER_BOOST_CAP)` alongside the
existing `recordMissionCompletion` and analytics writes, under the same
`reportFailures` net. Every solver qualifies; there is no "no `/call` win
this month" gate. The cap of 1 per character is the only limit, and the boost
spends on the next `/roam` or `/meet` with the culprit exactly like a `/call`
win's.

- No milestone is recorded. Milestones stay tied to encounters.
- No affinity is written. Missions still never move affinity directly; the
  boost only adds to a later authored response, as §16 of
  `public-encounters.md` describes.
- The reply text is fixed before the grant resolves, which is why the boost
  line never depends on the grant's result.

### 20.5 Content: riddle winning lines

- One `winningLine` field on every entry in `RIDDLES` (50 lines, two per house
  student), alongside `prompt`.
- Same at every tier, Stranger through Soulbound. No per-register variants.
- It nods to that riddle's report and is sheepish at being caught, then
  gives a reason to see the player again in the culprit's own voice: buying
  her silence, credit for catching them, or a plain invitation. Never an
  apology to her: she wasn't the one wronged. The boost line
  (§20.4) carries the mechanics, so the authored line never mentions boosts,
  `/roam` or `/meet`.
- **Towa** is always wordless here, at any hour (he can't speak by day):
  short described actions or humming, no spoken words. Every other character
  speaks.
- Ground every line in `constants/dialogue/reference.md` with the voice-check
  skill, and follow the house dialogue rules (no em dashes, American spelling
  except Lucas, per-character memories). A line must not answer the *other*
  riddle for the same student.
- `validateContent()` fails the build on a riddle with no `winningLine`, and
  the missions test pins it.

### 20.6 Code touch points

| File | Change |
|---|---|
| `missions/riddle.js` | accusation and culprit reveal replies; boost grant in `afterReply` |
| `missions/shared.js` | `portraitMessage` (or equivalent), `chancellorMessage` wraps it |
| `constants/missions.js` | `winningLine` on every riddle; boost line constant; accusation face table (`annoyed`, with the `serious` substitutes) |
| `constants/validateContent.js` | require `winningLine` |
| `test/missions.test.js` | accusation shows the accused's face; a miss shows none; reveal shows `sweat`, all four text lines, and grants the boost; boost line still shows when the grant is capped |

No migration: the boost reuses `grant_encounter_boost()` and
`character_relationships.pending_encounter_boost`.

### 20.7 Decisions locked in

1. Wrong guesses that name a real character get the accused's annoyed face
   and the generic wrong line, no accused dialogue.
2. Culprit reveal has no buttons; the boost is automatic.
3. Both replies are ephemeral and use the Chancellor's thumbnail layout, not
   the call scene gallery.
4. Culprit face is a fixed `sweat`.
5. Every solver gets the boost, capped at 1 per character; the boost line is
   always shown.
6. One riddle winning line per riddle, the same at every tier; Towa's is
   wordless.
7. No milestone for a solve.

---

## 21. Expansion: co-op debrief

Status: **built** 2026-10-08 (migration 030). `DEBRIEF_LINES` and
`pickDebriefStudent` live in `constants/missions.js`; the handler is
`missions/player.js handleMissionDebrief`. A failed read of the player's
pending boosts falls back to drawing from the whole house.

Gives a completed co-op a follow-up for both players: each one opens a private
**debrief** with one student from the co-op's house, drawn for them alone, and
gets a pending boost with that student. Same shape as the culprit reveal
(§20.4): portrait, authored line, boost line, no buttons on the reply.

### 21.1 Terms

- **Debrief**: the private follow-up a co-op player opens after the co-op
  completes. One per player per co-op: the lead's and the helper's are
  separate.
- **Debrief line**: the drawn student's authored line in a debrief.

### 21.2 The completion post

The co-op still completes on the helper's Join click (§7), which edits the
public assist post. Changes to that edit:

- `content: <@lead> <@helper>` with `allowed_mentions: { users: [leadId, helperId] }`.
  Both are pinged; the mentions go in `content` because embeds don't ping.
- The embed text, a blank line between each part (2026-10-08):
  `{helper} answered the call for backup.` / `**Mission complete.**` /
  `Both of you have banked a cooldown reset.` No "debrief waiting" line: the
  buttons say it.
- Two buttons, one per player, replacing the empty `components`:
  **[ Debrief: {lead} ]** (`mission:debrief:<missionId>:lead`) and
  **[ Debrief: {helper} ]** (`mission:debrief:<missionId>:helper`). Discord shows
  a button the same way to everyone, so one shared button couldn't be greyed
  out for just the player who claimed it (2026-10-08). The lead's name comes
  off the call post's `interaction_metadata.user` (account name, no nickname),
  falling back to "Lead"; labels are cut to `MAX_BUTTON_LABEL_LENGTH` with "…".

The banked-reset announcement stays on this post as today. The debrief does
not repeat it.

### 21.3 The Debrief button

The role comes from who clicked; a role in the custom_id (the post's buttons)
must match it.

- Clicker is `accepted_by` → the lead's debrief (`lead_debriefed_at`).
- Clicker is `helper_user_id` → the helper's debrief (`helper_debriefed_at`).
- Anyone else, or a player pressing the other one's button → ephemeral
  *"This debrief isn't yours."*
- Already claimed → ephemeral refusal (e.g. *"You've already been debriefed on
  that one."*), no portrait.
- Mission not `completed` (shouldn't happen from the post, but the custom_id
  is client-supplied) → *"That mission's already closed."*

**Greying out.** On a claim, the handler answers with an `UPDATE_MESSAGE` of
the message the button was clicked from, disabling each of this mission's
debrief buttons whose debrief is now claimed, and sends the debrief (or the
refusal) as its ephemeral `followup`. Labels are read back off the clicked
message; claim state off the row; the role off each button's custom_id. The
single role-less button on a completion post from before this change is never
greyed. A refused repeat click sends the same edit, so a button left live by a
lost edit heals on its next press.

**No expiry.** The button works for as long as the post exists, so a player
who was away at completion loses nothing. Pending boosts don't expire either.

**Claim.** One conditional update, no RPC:
`UPDATE missions SET <col> = now() WHERE id = $1 AND <col> IS NULL` via
`.update().eq('id', id).is(col, null).select()`. An empty result means already
claimed. A double click grants once.

**Draw** (at claim time, not stored, nothing later needs it): uniform over
`getHouseRoster(mission.house)`, excluding students the clicker already holds
a pending boost with (`getPendingEncounterBoosts`). If every student in the
house is excluded, draw from the full roster. The two players draw
independently and can get different students.

**Reward.** `afterReply` calls
`grantEncounterBoost(userId, drawnId, ENCOUNTER_BOOST_CAP)` plus analytics,
under `reportFailures`. No milestone, no direct affinity, same rules as §20.4.

### 21.4 The debrief reply

Ephemeral, thumbnail layout (`portraitMessage`, §20.3; not the call scene
gallery), the drawn student's
`smile.png`. Missing file or no `BASE_URL` → the existing text-only fallback.
**No buttons.** One message, a blank line between each part:

1. `**Debrief: {Full Name}**` (the thumbnail is too small to identify by face
   alone, same reason as §20.4's name line)
2. The **debrief line** (§21.6), wrapped in straight `"…"` by the code
3. The **boost line**: the same constant as §20.4, word for word, so both
   missions teach the same thing. It says a boost is waiting, never that one
   was just added, so it stays true when the cap blocked a new grant. Kept in
   the portrait here (unlike the riddle's), since it's the only reward line.

No banked-reset line: the completion post already carries it.

### 21.5 Reminder in `/mission`

For a player with any unclaimed debrief (a `completed` co-op where they are
the lead with `lead_debriefed_at IS NULL`, or the helper with
`helper_debriefed_at IS NULL`), `/mission` shows a line and a **[ Debrief ]**
button, `mission:debrief:<id>:<role>` with the player's own role,, e.g. *"🗂️ A debrief
from your {house} co-op is waiting."*

- Shown whether or not the player currently holds a mission; if they hold one,
  it sits below that mission's block.
- Several unclaimed → the newest, with "+N more". Each claim surfaces the next.
- The button works even if the assist post was deleted.
- `/mission` only. `/house` is unchanged.
- Expired co-ops never debrief: the query only matches `status='completed'`.

### 21.6 Content: debrief lines

- A `debriefLines` pool per house student, about two each (~50 lines), same
  at every tier.
- Each nods to having had inspectors working their house, in that student's
  own voice. The boost line carries the mechanics, so a debrief line never
  mentions boosts, `/roam` or `/meet`.
- **Towa** is always wordless here, as in §20.5.
- Ground every line in `constants/dialogue/reference.md` with the voice-check
  skill and follow the house dialogue rules. Don't echo the student's riddle
  winning lines or existing winnerLines.
- `validateContent()` fails the build on a house student with no debrief
  lines, and the missions test pins it.

### 21.7 Migration `030_coop_debrief.sql`

- `ALTER TABLE missions ADD COLUMN lead_debriefed_at TIMESTAMPTZ, ADD COLUMN helper_debriefed_at TIMESTAMPTZ;`
- Backfill so past co-ops don't surface as unclaimed:
  `UPDATE missions SET lead_debriefed_at = now(), helper_debriefed_at = now() WHERE mission_type = 'coop' AND status = 'completed';`
- A partial index for the `/mission` reminder lookup on completed co-ops with
  an unclaimed column.

No new table, no RPC.

### 21.8 Code touch points

| File | Change |
|---|---|
| `missions/player.js` | completion edit (pings, line, button); `mission:debrief` handler; `/mission` reminder |
| `missions/shared.js` | `portraitMessage` (shared with §20) |
| `constants/missions.js` | `debriefLines` (or on the character), debrief face, shared boost line constant, refusal lines |
| `db/supabase.js` | `claimDebrief(missionId, role)`, `getUnclaimedDebriefs(userId)` |
| `db/migrations/030_coop_debrief.sql` | columns, backfill, index |
| `app.js` | route `mission:debrief:<id>` |
| `constants/validateContent.js` | require debrief lines per house student |
| `test/missions.test.js` | pings both; lead and helper each claim once; outsider refused; second click refused; draw skips held boosts and falls back when all are held; boost line shows when capped; reminder lists newest + count; expired co-op has no reminder |

### 21.9 Decisions locked in

1. Both co-op players get their own debrief, drawn independently from the
   co-op's house; outsiders are refused.
2. Delivered by a **[ Debrief ]** button on the completion post, no expiry,
   one claim per player per co-op.
3. The completion post pings both players.
4. The debrief has no buttons; the boost is automatic, capped at 1 per
   student, and the boost line is always shown (the §20.4 constant).
5. The draw skips students the player already holds a boost with, falling
   back to the whole house.
6. Fixed `smile` face; header names the student in full.
7. `/mission` carries the reminder and its own Debrief button; `/house` doesn't.
8. Co-ops completed before launch are backfilled as claimed; expired co-ops
   never debrief.
9. No milestone, no direct affinity.

---

## 22. Reward balance (review 2026-10-08)

Reviewed after §20, §21 and migration 029 landed, with `docs/benkei-shop.md`
turning log points into store credit (💎). Each type now leads on a
different reward, and that split is intended:

| Type | Weight | Effort | Logs / 💎 | Reset | Boost | Leads on |
|---|---:|---|---|---|---|---|
| Riddle | 45 | under a minute | 1 | both | culprit (§20) | affinity per minute |
| Errand | 45 | `N` meetings, multi-session (avg `N` ≈ 2.06) | **`N`** | both | none | **store credit** |
| Co-op (each player) | 10 | one call / one click | 1 | single | debrief (§21) | the social path |

**Errand gets no boost, by decision.** On affinity alone a riddle now beats
an errand (an extra +1 boost for far less effort). That's fine because
errands are the only type that pays more than one log, and logs are now
the shop's currency. An errand averages ~2 💎 against a riddle's 1, so the
slow mission is the one that funds the shop. Giving errands a boost too
would make them win on both axes. Don't add one without revisiting shop
prices.

**Weights stay 45 / 45 / 10.** Riddle and errand are equal because they're
the two solo types, and each wins on a different reward. If co-op is raised
later (§19 "Co-op weight"), take the points from riddle so errand's share
of 💎 income doesn't drop.

**The assist cap is what keeps §21 safe.** After the debrief, every assist pays
a log, a reset and a boost. Without counting assists toward
`DAILY_LEAD_CAP` (migration 029), an always-online player could answer
every backup call and farm all three. The cap only binds on the top
clickers: assists were 61 of 614 completions in the 30 days before it
landed (`docs/benkei-shop.md` §1).

**Boosts don't break the affinity rule.** Mission boosts are +1 each, capped at
one pending per character (`ENCOUNTER_BOOST_CAP`), and only spend on a real
`/roam` / `/meet` response, so missions still never move affinity directly
(public-encounters §16).

**Measured (2026-10-08, 30 days, all guilds):** errands were 38% of
completions and 55% of points, so they really are where the 💎 comes from.

**What to watch:** errand-driven 💎 income against shop prices (the reset at
💎 10 is meant to stay out of daily reach once launch seeds are spent,
benkei-shop §2), and the co-op answer rate before touching its weight.
