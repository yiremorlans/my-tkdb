# Spec: Benkei's shop & the Lost & Found

Status: **design / not implemented**
Last updated: 2026-10-08

Shopkeep Benkei's campus store, open 24/7 (canon), as a private `/shop`
command. Players spend **💎 store credit** (a wallet seeded from and fed by
house mission points) on a small rotating daily stock of consumables. A second
page, the **Lost & Found**, occasionally holds a character's lost belonging that
the player can return for free, which opens an extra meeting with them.

Every shop interaction is **ephemeral**. Nothing here is posted publicly.

---

## 1. Store credit (💎)

- **One wallet per user**, not per house. Benkei has no house; the store does
  not care where the points came from. Column: `user_activity.store_credit INT
  NOT NULL DEFAULT 0` (one row per user already, no new table).
- **Seeded once, in the migration**, as a full copy of each player's lifetime
  `SUM(house_progress.points)`. No cap, no fraction: long-time players earned
  it, and the per-day quantity caps (§3) bound how fast a large balance can turn
  into items.
  - Users with `house_progress` rows but no `user_activity` row get one
    inserted by the seed.
- **Fed going forward** by every mission completion: whatever
  `recordMissionCompletion` adds to `house_progress.points` (lead *and*
  assist rows, `N` for an errand, `1` for riddle/co-op) is added to
  `store_credit` **in the same write**, so the two cannot drift.
- **Spent only by shop purchases.** Mission points, ranks and the `/house`
  dossier never go down. The two numbers diverge from the first purchase on,
  by design.
- User-facing name: **store credit**, always shown with 💎 (`💎 12`).

### Earning-rate reference (2026-10-08, 21 users)

From `mission_log`: active players earn roughly **10–23 points / week**; the
top six cleared **85–115 / 30 days** (~3/day); the middle of the pack ~1.5/day.
Prices in §2 are set against those numbers.

---

## 2. Items

| Item | Price | Daily appearance | Per-user qty | Held as |
|---|---|---|---|---|
| **Cooldown reset** | 💎 10 | 35% | 1–3 | `user_activity.bought_resets INT` |
| **Chancellor's envelope** | 💎 7 | 25% | always ×1 | `user_activity.envelopes INT` |
| **House compass** | 💎 5 | 50% | 1–3 | `user_activity.compasses INT` |
| **Fresh picks** | 💎 3 | 60% | 1–3 | `user_activity.fresh_picks INT` |

The reset is deliberately the most expensive item: even the most active player
cannot buy one a day from earnings alone (~3–4 days top, ~weekly mid).

Players can **hold any number** of every item. There is no inventory command;
held counts appear in the shop page footer and on the button/select that
spends them (§4).

### 2a. Cooldown reset

- Sold **as a single**: the same scope a co-op mission credit redeems as —
  it clears whichever of `/roam` / `/meet` has the longer wait (migration 028).
- **Joins the existing banked pool.** The player sees one combined reset count
  (unspent `mission_log` credits + `bought_resets`) and spends it from the same
  cooldown-reply button (`missions/resets.js`). No new table.
- `spend_cooldown_reset` (new migration, rewriting 028's) spends mission credits
  first in their current order, then a bought reset (decrement
  `bought_resets`, co-op scope). `countCooldownResets` returns the sum.
- Buying is never refused because the player already holds resets; price and
  the daily quantity are the limit.

### 2b. Chancellor's envelope

- Guarantees the next errand **house-change** click opens the Chancellor's
  audience instead of the 1-in-5 `CHANCELLOR_AUDIENCE_CHANCE` roll
  (`missions/houseChange.js`).
- Can be bought with no open errand and held for later.
- Spent at the click, only on the path where the audience actually opens (the
  existing "the Chancellor doesn't hear a request he can't grant" guard still
  applies first, so a blocked change never eats an envelope).

### 2c. House compass

- Used from the **`/roam` reply**: when the player holds ≥1, the reply carries
  a string select, **🧭 Use a compass (N held)…**, listing the 7 houses.
  Choosing a house spends one compass and redraws the encounter from that
  house's roster in the same message.
- The house is chosen at **use**, not purchase, so compasses are a plain count.
- The player sees the draw first, so a compass is never spent on a draw they
  were happy with. The 3h cooldown is still only claimed at the response step;
  the in-memory invoke throttle is unaffected.
- No compasses held → no select; `/roam` is unchanged.

### 2d. Fresh picks

- Used from the **`/meet` picker**: when the player holds ≥1, the picker gets a
  **🔄 Fresh picks (N)** button. Clicking spends one and redraws the
  candidates (`buildMeetPickMessage` with a new draw).
- Does not touch the cooldown.

### 2e. Later (not in the launch scope)

- **Riddle hint**: an authored hint for the player's open riddle, priced above
  the 1 point a riddle pays.
- **Errand swap**: replace one unsigned errand target.
- **Salon headline**: the player's next Advice Salon note leads the issue
  (`docs/advice-salon.md`).
- Rejected: any item that grants affinity directly. Affinity stays
  encounter-earned.

---

## 3. Daily rotation

- Day boundary: **midnight UTC**. A day key `YYYY-MM-DD` drives everything.
- **Stock is global** (same items for everyone, every server), derived from a
  seeded RNG on the day key. Nothing stored.
  - Each item rolls its own appearance chance (§2 table).
  - If fewer than **2** items rolled in, top up to 2 from the misses (seeded,
    weighted by the same chances).
- **Quantity is per user**, derived from a seeded RNG on `userId + dayKey`:
  1–3 for each item, envelope always 1. Nothing stored for the cap itself.
- **Bought-today counts** are stored so the cap holds across clicks:
  `user_activity.shop_day DATE` + `shop_bought JSONB` (`{"reset": 2, ...}`),
  reset lazily when `shop_day` is not today. No stock is shared between users,
  so there are no races between players.

---

## 4. `/shop` UI

Components V2, ephemeral, two pages with ◀ ▶ buttons
(`shop:page:<1|2>`).

### Page 1: Benkei's counter

- Thumbnail: Benkei's **default expression** (`assets/expressions/benkei/…`),
  served by URL from `BASE_URL` like the messenger cat (no attachment). If
  `BASE_URL` is unset, the thumbnail is dropped and the text still renders.
- A greeting from a small authored pool, `BENKEI_SHOP_GREETINGS` (~8 lines),
  in his voice: young, casual former professor, kind; his manager is one of
  Cornelius' cats. Ground with the voice-check skill. No em dashes.
- One row per stocked item: name, one-line description, price, and a
  **Buy · 💎N** button (`shop:buy:<itemId>`), disabled when the player can't
  afford it or has bought today's quantity (`Sold out` / `Need 💎N`).
- Footer: balance and held counts, e.g.
  `💎 23 · Resets 2 · Compasses 1 · Fresh picks 0 · Envelopes 0`.

### Page 2: Lost & Found

- Thumbnail: a manager-cat sprite (`assets/sprites/Messenger_Cat*.png`).
- Lists the day's items (§5), each with **Return to {firstName}**
  (`shop:return:<characterId>`). Labels stay ≤30 chars
  (`MAX_BUTTON_LABEL_LENGTH`).
- Empty day: a short "nothing turned in today" line.
- Already claimed today: the list shows, buttons disabled.

### Buying

- One click, no confirmation.
- One atomic RPC, `buy_shop_item(user, item, price, day, cap)`: lock the
  `user_activity` row, reset the day counters if stale, check balance and
  bought-today vs cap, deduct `store_credit`, increment the held count and
  `shop_bought`. Returns `bought | insufficient | sold_out`. Double-clicks are
  safe.
- The interaction is answered with an update to the same message (re-rendered
  page 1 with the new balance), plus a short Benkei confirmation line.
- Price, appearance chance and cap live in one constant table
  (`constants/shop.js`, `SHOP_ITEMS`) so the RPC is passed them and game
  balance is written down in one place (same pattern as `COOLDOWN_MS`).

---

## 5. Lost & Found

- Each user rolls each day (seeded on `userId + dayKey`, nothing stored):
  **10%** chance anything turns up.
- On a lucky day: **1–3 items**, weighted **60 / 30 / 10**, each from a
  **different** character.
- Pool: **all 26 characters, Benkei included**, starting with **one item
  each**: `LOST_ITEMS` in `constants/shop.js`, `{ characterId, item }`.
  Every item is a belonging grounded in `constants/dialogue/reference.md`;
  never invented canon. Thin-canon characters get something generic and safe.
  - Watch the per-character rules (e.g. Zenji's doll Saburo is always with him,
    so never "lost"; Subaru's stigma reads belongings, so his own lost item
    is fine but don't make the return about reading it).
- **One claim per day.** `user_activity.lost_found_claimed_on DATE`.
- **Return to {firstName}**:
  1. Atomically set `lost_found_claimed_on = today` (refuse if already set).
     Marked at the click, so a double-click can't open two meetings.
  2. Open a meeting with that character immediately via
     `buildMeetSpawnMessage(userId, characterId)`, **outside the `/meet`
     cooldown** (it neither checks nor claims it).
  3. The response step appends the narrator clause
     **"…thankful you returned their {item},"** in the place where the boost
     suffix goes (`describeBoost`, `encounters.js:778`). **No +1 boost.** The
     free meeting is the reward. Affinity for the chosen response is granted
     normally; errand signatures count as on any meeting.
- Unclaimed items vanish at the rollover. No holding a lost item.
- Origin tag for the spawned meeting: `origin = 'lostfound'`, so the response
  handler knows not to claim the cooldown and to use the thank-you clause.

---

## 6. Data model

New migration `030_benkei_shop.sql`, columns on `user_activity` only:

```sql
ALTER TABLE user_activity
  ADD COLUMN IF NOT EXISTS store_credit          INT   NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS bought_resets         INT   NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS envelopes             INT   NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS compasses             INT   NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS fresh_picks           INT   NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS shop_day              DATE,
  ADD COLUMN IF NOT EXISTS shop_bought           JSONB NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS lost_found_claimed_on DATE;
-- CHECK (store_credit >= 0) and >= 0 on every count.
```

Plus:
- Seed: upsert `store_credit = SUM(house_progress.points)` per user.
- `record_mission_completion` (or the app write that bumps `house_progress`):
  also `store_credit += points`.
- `buy_shop_item(...)` RPC (§4).
- `spend_cooldown_reset` rewrite: fall through to `bought_resets` (§2a).
- Small spend RPCs, each a conditional decrement returning whether it spent:
  `spend_compass`, `spend_fresh_picks`, `spend_envelope`,
  `claim_lost_found(user, day)`.

Service role only, same RLS story as every other table.

---

## 7. Code touchpoints

| File | Change |
|---|---|
| `constants/shop.js` (new) | `SHOP_ITEMS`, `LOST_ITEMS`, `BENKEI_SHOP_GREETINGS`, seeded daily stock / qty / lost-found helpers |
| `shop.js` (new) | `/shop` page builders, buy / page / return handlers |
| `commands.js` | `/shop` |
| `app.js` | route `shop:*` components |
| `encounters.js` | compass select on `/roam` reply; fresh-picks button on `/meet` picker; `lostfound` origin + thank-you clause |
| `missions/resets.js`, `commandLimits.js` | combined reset count |
| `missions/houseChange.js` | envelope check before the 1-in-5 roll |
| `db/supabase.js` | wrappers for the new RPCs / columns |
| `constants/validateContent.js` | label lengths, every `LOST_ITEMS.characterId` exists, one item per character, no em dashes in Benkei lines |
| `db/schema.sql`, `db/SCHEMA.md` | new columns |

---

## 8. Tests

- Daily stock is deterministic per day key and always ≥2 items.
- Per-user qty deterministic per `userId + dayKey`, in 1–3, envelope 1.
- Lost & Found: ~10% hit rate over many seeds; 1–3 distinct characters.
- `buy_shop_item`: insufficient / sold out / stale-day reset / success.
- Combined reset count = mission credits + bought; spend order mission-first.
- Envelope forces the audience and is not spent when the change is blocked.
- Return claim is single-use per day; the meeting skips the cooldown.
- Content: all 26 characters have a lost item; labels ≤30 chars.

---

## 9. Settled (grilling session 2026-10-08)

- One wallet; seeded in full in the migration; fed by every completion row.
- Store credit 💎. Stock global, qty per user (random 1–3), ≥2 items a day,
  every item rotates (reset not guaranteed).
- Bought resets join the one combined pool, co-op (single) scope; no new table.
- Holding multiples of everything is allowed; counts on `user_activity`.
- Compass is applied from a select on the `/roam` reply; house chosen at use.
- Lost & Found is **free**, rare (10%), 1–3 items, one claim a day, returned
  immediately; extra meeting outside cooldown, thank-you clause, no boost.
- All 26 characters including Benkei, one item each to start.
- Page 1 thumbnail = Benkei default expression; page 2 = cat sprite.
- No purchase confirmation.
