# Spec: Scheduled missions

Status: **design / not implemented**
Last updated: 2026-09-02

Three times a day, at unpredictable-but-spread times, a scheduled job posts a
public **mission request** into the same channel the public "call out"
encounters use. The post has an attachment image, a rotating
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
| **Riddle** | 55% | Solve a debunk riddle with `/riddle <answer>` | **1 log point** · reset **both** `/roam` + `/meet` cooldowns |
| **Errand** | 20% | Meet **N specific students** of the mission's house (N rolled at spawn, `1 .. house roster size`) — they're **boosted in your `/roam` / `/meet`** while the errand is open — then file with `/docs` | **N log points** (one per signature) · reset **both** `/roam` + `/meet` cooldowns |
| **Co-op** | 25% | Call a partner with `/mission assist`; another user backs you up | **1 log point each** (both users) · reset **one** command (`/roam` **or** `/meet`, one coin flip applied to both) for **both** users |

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
| Post an image + button, edit it later | `postChannelMessage` / `editChannelMessage` (public-encounters §11) |
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
    └─ mission_slots_today = 3 random timestamps, one per equal third of
       05:00–24:00 America/Chicago, >= 2h apart  (all fixed, not configurable)
       mission_slots_day = today; mission_slots_fired = []

  FINALIZE:
    ├─ missions WHERE status='open'      AND now() >= post_expires_at
    │    └─ status='expired'; edit post → MISSION_WITHDRAWN_LINES entry, drop image, remove button
    └─ missions WHERE status='accepted'  AND now() >= accept_expires_at
         └─ status='expired' (slot frees via the partial index; no channel edit — the pickup post already moved on)

  SPAWN: for each slot i in mission_slots_today not in mission_slots_fired,
         with slot_time <= now():
    ├─ if slot_time is > STALE_SLOT_MINUTES late           → mark fired, skip (host was asleep)
    ├─ if guild already has a status='open' mission        → mark fired, skip (never two live requests)
    ├─ roll house (uniform over 8) + type (riddle 55 / errand 20 / coop 25)
    ├─ type='riddle' → pick a riddle from RIDDLES[house]
    ├─ type='errand' → signatures_required = randInt(1, getCharactersByHouse(house).length)
    ├─ INSERT missions row (status='open', post_expires_at = now + POST_TTL_HOURS)
    ├─ compose/pick the attachment image, pick a MISSION_TEASERS line
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
/riddle <answer>    (ephemeral) → riddle only: match, reward on correct, 60s cooldown on wrong (§6)
/mission assist      (public)   → coop only: post a "Join the mission" button in the channel (§7)
```

---

## 3. Scheduler — 3 missions/day, banded random times

Runs inside the existing encounter tick (`encounterScheduler.js`). No new
interval.

### Slot generation (once per local day, per guild)

**Fixed, not admin-configurable** — constants in `constants/missions.js`:
**3 slots/day**, active window **05:00–24:00 America/Chicago** (19h),
consecutive slots **≥ 2h apart**.

```js
const MISSIONS_PER_DAY  = 3;
const WINDOW_START_HOUR  = 5;          // 05:00 CT
const WINDOW_END_HOUR    = 24;         // midnight CT
const MIN_GAP_MS         = 2 * 3600_000;

function rollDailySlots(localDate) {
  const startMs = atLocalHour(localDate, WINDOW_START_HOUR);           // today 05:00 CT
  const spanMs  = (WINDOW_END_HOUR - WINDOW_START_HOUR) * 3600_000;    // 19h
  const bandMs  = spanMs / MISSIONS_PER_DAY;                           // ~6h20m
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

- **One mission per third-of-day** (each band ~6h20m) → an early-morning player
  and a late-night player each get a shot most days.
- The time still moves up to ~6h day to day within its band — no fixed
  "it's always 2pm" pattern.
- Band widths (~6h20m) comfortably absorb the 2h re-roll, so no risk of a stuck
  loop.
- Optional anti-lock (skip unless it feels needed): reject a fresh roll landing
  within 30 min of *yesterday's* same-band slot.

### State (on `guild_settings`, §10)

| Column | Meaning |
|---|---|
| `mission_slots_day` | the local date `mission_slots_today` was rolled for |
| `mission_slots_today` | `JSONB` array of 3 ISO timestamps |
| `mission_slots_fired` | `JSONB` array of the slot indices already posted |

Fully restart-safe: on boot the tick re-reads the row, regenerates only if
`mission_slots_day` is stale, and posts any due-and-unfired slot.

### Staleness

If the host slept across a slot and it is now more than `STALE_SLOT_MINUTES`
(90) late, mark it fired without posting — better to lose that mission than to
post at an odd hour. At 3/day this is acceptable.

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
  { type: 1, name: 'status',  description: "Show whether missions are on and today's slot times" },
]
```

- `enable` → upsert `guild_settings`: `missions_enabled = true`,
  `mission_channel_id = <id or NULL>`, clear `mission_slots_day` so the next
  tick rolls fresh slots. Reply ephemerally with the channel and today's
  remaining slot times (`<t:…:t>`).
- `disable` → `missions_enabled = false`. Any in-flight mission finalizes
  normally.
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

`/mission` reveals the house **and names the targets**: *"{House} needs sign-off
from **Jin Kamurai**, **Leo Kurosagi** and **Alan Mido**. Track them down —
they'll be easier to run into while this stays open."*

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
    // …several per house, keyed to that house's flavor
  ],
  [HOUSES.FROSTHEIM]: [ /* … */ ],
  // … all 8 houses
};
```

- `answer` is a character id; the mission stores `riddle_id` at spawn so two
  accepters who drew different missions face different riddles.
- Non-character-answer riddles (buttons A/B/C, keyword) are a possible later
  variant; v1 is "name the student", matched by `matchCharacterGuess`.

### `/riddle <answer>` (ephemeral)

1. No pending mission / not a riddle mission → redirect line (mirror `/docs`).
2. In-memory wrong-guess cooldown (`Map<`${missionId}:${userId}`, epochMs>`,
   `RIDDLE_WRONG_COOLDOWN_SECONDS = 60`). Within the window →
   *"Give it a moment — try again in {n}s."*
3. `matchCharacterGuess(input)`:
   - resolves to `riddle.answer` → **correct** (step 4)
   - resolves to a different character, or nothing → **wrong**: set the cooldown,
     reply with a `RIDDLE_WRONG_LINES` entry. No hard attempt cap; the 60s gate
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

### `/mission assist` (public — the one non-ephemeral mission command)

- Not a pending co-op mission → ephemeral redirect.
- Already has a live assist post (`missions.assist_message_id` set) → ephemeral
  *"Your call for backup is already up in {channel}."*
- Otherwise → `postChannelMessage` to the mission channel:

```
🚨 {accepter} needs a partner for a {House?}… actually — house withheld.
{accepter} needs a partner in the field. First to back them up clears it for both.
[ Join the mission ]      custom_id: mission:assist:<missionId>
```

  (Keep the house **out** of the assist post too — consistent with the pickup
  post. The helper learns nothing until they've clicked.) Store the returned id
  as `assist_message_id`.

### Join button → `claim_coop_helper` RPC (§11)

`claim_coop_helper(missionId, clickerId)` → `'joined' | 'self' | 'taken'`:

- `'self'` (clicker is the accepter) → ephemeral *"You can't back yourself up."*
- `'taken'` (already helped / expired / not co-op) → ephemeral *"That mission's
  already covered."*
- `'joined'`:
  - `UPDATE_MESSAGE` on the assist post → *"**{helper}** backed up
    **{accepter}**. Mission complete."*, button disabled.
  - Fire-and-forget for **both** users:
    - `recordMissionCompletion({ …, points: 1 })` for each — accepter
      `role='lead'`, helper `role='assist'`, same `house`, same `mission_id`.
    - **one coin flip**: `const cmd = Math.random() < 0.5 ? 'roam' : 'meet';`
      then `resetCommandLimit(accepterId, cmd)` **and**
      `resetCommandLimit(helperId, cmd)` — the *same* command reset for both.
    - analytics for both.
  - The helper does **not** consume a mission slot — assisting is a free social
    bonus, not their accepted mission. A helper who has their own `accepted`
    mission can still assist (the partial unique index is on `accepted_by`, not
    the helper).

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
| errand | `2 / N signatures` | `Your targets are boosted in your /roam and /meet while this is open. Meet them, then check the sheet and file with /docs — 1 point per signature.` |
| riddle | `unsolved` | `Answer with /riddle <your answer>. Solve it and your /roam and /meet cooldowns reset immediately.` |
| coop | `waiting on a partner` / `partner post is live` | `Call a partner with /mission assist. The first inspector to back you up completes it for both of you.` |

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

Rank: Senior Inspector          (17 pts · 11 missions filed)
Next: Special Inspector at 25 pts

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
  export const INSPECTOR_RANKS = [   // thresholds are POINT totals
    { min: 0,  name: 'Novice Inspector' },
    { min: 3,  name: 'Field Inspector' },
    { min: 10, name: 'Senior Inspector' },
    { min: 25, name: 'Special Inspector' },
    { min: 50, name: "Chancellor's Right Hand" },
  ];
  ```

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
  post_expires_at     TIMESTAMP WITH TIME ZONE NOT NULL,   -- created_at + POST_TTL_HOURS (6)
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

**Governing rule:** the channel post is mutated (`UPDATE_MESSAGE` to disable the
button + rewrite text) **only** on a confirmed 1-row win. Every other
outcome — lost race, over-limit, mission already gone — is an **ephemeral**
reply that leaves the post and its live button untouched. You cannot per-user
disable a button on a shared message, so an over-limit user *will* see an
enabled button and click it; the handling below makes that safe.

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
  case 'claimed':                              // ONLY branch that touches the post
    return res.send({ type: InteractionResponseType.UPDATE_MESSAGE, data: {
      content: `**${displayName}** has picked up the mission.`,
      components: [disabledAcceptRow],
    }});
  case 'taken':
    return ephemeral("Someone got there first.");
}
```

The `busy:unknown` fallback only hits on the rare `23505` path (a truly
simultaneous double-accept, where the caller never got a type back); it shows
the three-command line. Every ordinary "you already hold one" click carries the
type and names the single command.

### 11.4 Every race walked

| Race | Outcome |
|---|---|
| **Two eligible users, same fresh mission** | Postgres row lock serializes the two `UPDATE`s. First commits (`status='accepted'`); the second re-evaluates its `WHERE` against the updated row, matches 0 rows → `'taken'` → ephemeral, post untouched. Exactly one `UPDATE_MESSAGE`. |
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
- Co-op reward: one coin flip shared by both users —
  `const cmd = Math.random() < 0.5 ? 'roam' : 'meet';`
  `resetCommandLimit(leadId, cmd); resetCommandLimit(helperId, cmd);`

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

export const INSPECTOR_RANKS = [   // thresholds are mission_log POINT totals (§9)
  { min: 0,  name: 'Novice Inspector' },
  { min: 3,  name: 'Field Inspector' },
  { min: 10, name: 'Senior Inspector' },
  { min: 25, name: 'Special Inspector' },
  { min: 50, name: "Chancellor's Right Hand" },
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
| `MISSIONS_PER_DAY` | `3` | Slots per guild per local day |
| `WINDOW_START_HOUR` / `WINDOW_END_HOUR` | `5` / `24` | Active window, America/Chicago (05:00–midnight CT) |
| `MIN_GAP_MS` | `2h` | Minimum spacing between consecutive slots |
| `STALE_SLOT_MINUTES` | `90` | Skip a slot that comes due more than this late |
| `POST_TTL_HOURS` | `6` | Unaccepted post → withdrawn |
| `ACCEPT_WINDOW_HOURS` | `48` | Accepted-but-unfinished → expired, slot frees |
| `RIDDLE_WRONG_COOLDOWN_SECONDS` | `60` | Gap between wrong `/riddle` guesses (in-memory) |
| `WEIGHT_RIDDLE` / `WEIGHT_ERRAND` / `WEIGHT_COOP` | `55` / `20` / `25` | Type roll at spawn |
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
| Co-op: helper already has their own accepted mission | Allowed — assisting doesn't consume a slot |
| Co-op: nobody joins before expiry | Mission `expired`, slot frees; optional "moment passed" edit |
| `/riddle` brute-forcing names | 60s cooldown per wrong guess; riddle dies at `accept_expires_at` |
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

1. **3 missions/day per guild**, at banded random times — one uniform-random
   slot per equal third of a **fixed** 05:00–24:00 America/Chicago window,
   ≥ 2h apart. Count, gap and window are hard-coded constants, **not**
   admin-configurable. The admin command is enable / disable / status only.
   Spread for early-morning and late-night players, unpredictable day to day.
   Slot state in `guild_settings`; restart-safe.
2. **Type weights: riddle 55 / errand 20 / co-op 25**, rolled at spawn with the
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
     → **1 point** (lead) + reset **both** cooldowns. Wrong → 60s cooldown, no
     cap.
   - **Co-op** — `/mission assist` posts a public **Join the mission** button; a
     *different* user clicks → **1 point each** for both (lead + assist) + reset
     **one** command (`/roam` **or** `/meet`, a single coin flip applied to both
     users). Helper does not spend a mission slot.
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
8. **Accepted-mission TTL 48h**, **unaccepted post TTL 6h** — both finalized by
   the scheduler; expiry frees the slot via the partial index.
9. Shares `guild_settings`, the scheduler tick, the channel REST helpers, and
   `matchCharacterGuess` with `public-encounters.md` (§0).

---

## 19. Open questions

- **Errand grind loop.** An `N ≥ 2` errand spends up to `N−1` cooldown-gated
  meets (the first is free if you're off cooldown) and pays `N` points + a full
  both-command reset — net cooldown-positive, and now point-positive too. Watch
  whether dedicated players chain errand → reset → errand. Mitigations if
  needed: errand resets only one command (like co-op), a per-user daily
  completion cap, or scale the reset with `N` instead of always full.
- **Rank thresholds vs. scaled errands.** `INSPECTOR_RANKS` thresholds are point
  totals; a lucky run of `N = 4` errands climbs the ladder ~4× faster than a
  riddle streak. Rebalance the thresholds (or cap errand points) if progression
  feels too swingy once real data exists.
- **`N = 1` errands.** A 1-signature errand is one meeting for 1 point +
  full reset — strictly better value than a riddle for the same 1 point. Fine,
  or bump the `signatures_required` floor to 2 for houses that can support it.
- **Target-boost strength.** `ERRAND_ROAM_TARGET_BIAS ≈ 0.5` means half an
  errand holder's `/roam`s aren't really random while the mission is open — does
  that dull `/roam`'s discovery feel? Options: lower the bias, or only apply it
  when the user's cooldown is actually ready.
- **`/meet` guaranteed vs. weighted.** Written as guaranteed slots for unsigned
  targets; a softer version just raises their odds in the 4-pick.
- **Reveal targets in `/mission`.** Currently `/mission` names them outright. A
  "you'll know them when you see them" version hides the names until the first
  `/docs`.
- **Per-day completion cap.** Max-one-held already throttles hoarding. Add a
  hard "N missions filed per user per day/week" if a single fast clicker
  dominates all 3 daily posts.
- **`/docs` name.** Reads like "documentation". `/report` or `/file` if that's
  clearer — cosmetic.
- **Expired accepted missions in the dossier.** Show an "unfiled" blemish count,
  or drop silently? Currently silent.
- **Co-op reset roll.** One shared coin flip for both users (as written), or an
  independent roll each? Written as shared.
- **Riddle answer types.** v1 is "name the student" only. Buttons (A/B/C) or
  keyword answers are a later variant.
- **Assist post house leak.** Spec keeps the house out of the `/mission assist`
  post for consistency; confirm that's wanted vs. showing it to attract a
  helper.
