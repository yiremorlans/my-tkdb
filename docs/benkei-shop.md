# Spec: Benkei's shop & the Lost & Found

Status: **design / not implemented**
Last updated: 2026-10-09

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

### Earning-rate reference (2026-10-08, `mission_log`, last 30 days, all guilds)

About 20 completions a day across all guilds (`MISSIONS_PER_DAY` is per
guild). Points per player over 30 days:

| Tier | 30-day points | Per day |
|---|---|---|
| Top six | 86–115 | ~3–3.8 |
| Middle seven | 30–66 | ~1–2.2 |
| Bottom seven | ≤ 12 | < 0.5 |

- **Errands are 38% of completions but 55% of points** (547 of 996).
- Assists were 61 of 614 rows, so counting them toward `DAILY_LEAD_CAP`
  (migration 029) barely moves these numbers. The cap already held the top
  players to ~4 points a day.
- **Seed sizes:** lifetime points top out at 133; the top six are all 100+.
- **Mission resets:** 465 of the 614 earned in the window were spent (76%).
  The three highest earners hold only 1–3 unspent, because they spend
  everything, while several mid-tier players are sitting on 15–29. A bought
  reset is mostly bought by the players who run out.

Prices in §2 are set against those numbers. Errands are the main source
(`N` points against 1 for a riddle or co-op), which is why they carry no
boost: see `docs/scheduled-missions.md` §22 before changing mission
rewards or weights.

---

## 2. Items

| Item | Price | Daily appearance | Per-user qty | Held as |
|---|---|---|---|---|
| **Cooldown reset** | 💎 10 | 35% | 1–3 | `user_activity.bought_resets INT` |
| **Chancellor's envelope** | 💎 9 | 25% | always ×1 | `user_activity.envelopes INT` |
| **House compass** | 💎 5 | 50% | 1–3 | `user_activity.compasses INT` |
| **Fresh picks** | 💎 3 | 60% | 1–3 | `user_activity.fresh_picks INT` |
| **Reassignment slip** | 💎 6 | 30% | always ×1 | `user_activity.slips INT` |

The reset is deliberately the most expensive item: from earnings alone even
the most active player cannot buy one a day (~3 days top, ~weekly mid).
**The seed breaks that at launch:** with up to 133 💎 seeded and a reset
buyable ~0.7 times a day (35% × 1–3), the top three can buy at that pace,
about 7 💎/day against ~3.8 earned, for roughly 5–7 weeks before income
becomes the limit. That's the accepted cost of seeding in full (§9).

**Nothing in the shop earns credit back.** The closest is an envelope sending
an errand to a four-student house, which lifts expected `N` from ~2.06 to
~2.5: about +0.44 💎 per errand, so paying back the envelope would take ~20
errands. Keep it that way. No item should raise mission payouts.

The reassignment slip (§2e) is held to zero payback by one rule: **a
reassigned errand always draws `N = 1`.** Without it, a riddle rerolled into
an errand would land on ~2 points against 1 about 82% of the time, roughly
+0.8 💎 back per slip, which was judged too high.

| From → To | Points before | Points after | Change |
|---|---|---|---|
| Riddle → errand (`N = 1`) | 1 | 1 | 0 |
| Riddle → co-op | 1 | 1 each | 0 |
| Co-op → riddle / errand (`N = 1`) | 1 | 1 | 0 |
| Errand (`N ≥ 1`) → riddle / co-op | N | 1 | 0 or less |

**Known skew: the compass favors small houses.** It redraws from the chosen
house's roster, so the chance of landing a specific student is 50% in
Mortkranken (2), 33% in most houses and 25% in Frostheim or Dionysia (4).
Accepted as is.

Players can **hold any number** of every item. There is no inventory command;
held counts appear in the shop's wallet header and on the button/select that
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
- **Copy is source-neutral.** Bought and mission resets are one pool, so no
  player-facing line may say where a reset came from. The cooldown offer
  (`resetOfferLine`, `constants/missions.js`) already reads "banked", not
  "banked from a mission/missions" (changed 2026-10-09). At shop launch, the
  empty-pool refusal in `missions/resets.js` ("Finish a mission to earn one.")
  also names the shop as a source, and the README's "Finishing a mission ...
  hands you a reset" paragraph gains the shop.

### 2b. Chancellor's envelope

- Guarantees the next errand **house-change** click opens the Chancellor's
  audience instead of the 1-in-5 `CHANCELLOR_AUDIENCE_CHANCE` roll
  (`missions/houseChange.js`).
- **Priced at 💎 9** (raised from 7, 2026-10-08). One envelope steers a whole
  errand: `N` boosted target meetings over up to 48h, worth about two
  compasses (💎 10). It sits just under the reset so the reset stays the most
  expensive item.
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

### 2e. Reassignment slip

Shop copy:

> **Reassignment slip** · 💎 6
> Swap your current mission for a different kind of job. Same house, new orders.

- Used from the **`/mission` briefing**: when the player holds ≥1 and the
  mission can still be reassigned, the briefing carries a **🔁 Reassign (N)**
  button. Clicking spends one slip and rerolls the mission's **type**, never
  to the same type, by the existing weights (riddle 45 / errand 45 / co-op 10)
  with the current type removed.
- **The house stays.** Changing the house is the envelope's job (§2b).
- The new mission is set up fresh: a new riddle, a newly drawn errand target,
  or an open co-op request.
- **A reassigned errand always draws `N = 1`** (one signature target), so a
  slip never pays credit back (§2 payback table).
- **Blocked once there's progress**: any errand signature collected, or a
  co-op partner already joined (same spirit as `houseChangeBlocker` in
  `missions/shared.js`). A riddle is never blocked: getting unstuck from one is
  the point.
- Spent only when the reroll actually happens, inside one RPC under the mission
  row lock (`reassign_mission`), so a blocked or stale click costs nothing.
- A slip can be used again on the reassigned mission; each use costs another
  slip and can't raise the payout.
- **Known gain, accepted:** co-op pays a *single* banked reset while riddle and
  errand pay *both*, so co-op → anything upgrades the reset. Escaping a co-op
  nobody answers is the slip's main use.

### 2f. Later (not in the launch scope)

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

**Wallet header (every page, every render).** The first text block of the
message, above the thumbnail section, is the player's balance and held counts,
e.g. `💎 23 · Resets 2 · Compasses 1 · Fresh picks 0 · Envelopes 0 · Slips 0`.
It is rendered on both pages and on every update (page flips, buys, returns),
so the player always sees what they have without scrolling. It is read from
the same `user_activity` row the render already loads, so it costs no extra
query, and after a buy it shows the post-RPC balance.

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
  page 1 with the new balance in the wallet header), plus a short Benkei confirmation line.
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
  ADD COLUMN IF NOT EXISTS slips                 INT   NOT NULL DEFAULT 0,
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
  `reassign_mission` (spends a slip and rerolls the type under the row lock),
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
| `missions/player.js` | 🔁 Reassign button on the `/mission` briefing |
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
- Slip: never rerolls to the same type; reassigned errand has exactly 1
  target; blocked after a signature or a joined partner, slip kept.
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
- Balance + held counts are a wallet header at the top of both pages, never a
  footer (2026-10-09).
- Envelope 💎 9 (raised from 7, 2026-10-08 balance review).
- Reassignment slip 💎 6, ~30%, ×1; type reroll, house kept; reassigned
  errand is `N = 1` so payback is zero (2026-10-09).
