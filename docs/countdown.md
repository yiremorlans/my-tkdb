# Spec: Countdown channels

Status: **built** 2026-10-27 (migration 034 must run before deploy, then `npm run register`)
Last updated: 2026-10-27 (Wishing Well run length added)

A channel whose name counts down to the next event: Tokyo Debunker
Wishing Well dates (global, the same for every server) and/or a server's own
custom events. Fully independent of public encounters and scheduled missions:
a server can run countdowns with neither of those enabled, and vice versa.

Every decision in §1–§9 was made by the user in a design review on
2026-10-25. §10 (storage) and §11 (scheduler) are implementation choices that
serve those decisions and may change during the build.

---

## 1. Two independent countdown channels

A server has at most **two** countdown channels, each optional and set up on
its own:

| Kind | Shows | Source |
|------|-------|--------|
| `wishingwell` | the next Wishing Well date | global constants file (§7) |
| `customevent` | the nearest of this server's custom events | `/event` (§6) |

- The Wishing Well channel **never** shows custom events, and the custom event
  channel never shows Wishing Well dates. No cross-kind ties to break.
- The two kinds can't point at the same channel (they would overwrite each
  other's name). Setting one to the other's channel is refused.
- There is no on/off toggle. A kind with no channel set is off.
- Creating events never creates channels. However many events exist, the
  custom event channel shows the nearest one; when it passes, the channel
  moves on to the next.

## 2. Counting days

- Days are **calendar days in the server's timezone**. Default
  `America/Los_Angeles` (US Pacific, changed from `America/New_York` on
  2026-10-27); changed with `/countdown timezone` (§5). Pacific puts the
  daily flip at 12 AM Pacific / 3 AM Eastern, so no North American member
  sees `Today!` before their own day starts. Discord servers
  have no timezone of their own, and a channel name is the same plain text for
  every viewer, so the bot has to pick one calendar per server.
- `X` = (event's local date) − (today's local date), in whole days.
- **"Today!" covers the event's entire local calendar day**, from 00:00 to
  23:59, regardless of the event's time of day. At local midnight the event
  drops off and the channel moves to the next one.
- Example, server on `America/New_York`: Wishing Well `1794538800` is
  Thu Nov 12 2026 10:00 PM EST, so the channel reads `Today!` all of Nov 12
  and `in 1 day` all of Nov 11. (US DST ends Nov 1 2026; IANA names handle it.)
- Wishing Well dates are Unix timestamps and are converted to the server's
  local date at render time. Custom events are stored as a local date (§6) and
  need no conversion.
- Same-day tie between two custom events: the one created first wins
  (lower `#ID`).
- **A Wishing Well runs 4 days** (`WISHING_WELL_DURATION_SECONDS`, §7), from
  its start time to exactly 96 hours later. While one is running, the channel
  reads `Today!` on its start day, then counts down to its **end**
  (`ends in 2 days`, `ends in 1 day`, `ends today`). The next start's
  countdown only appears once the running one has ended, at its end time
  rather than at local midnight (the scheduler pass lands it within ~5
  minutes, §11). Added 2026-10-27.

## 3. Channel name format

| State | Wishing Well channel | Custom event channel |
|-------|----------------------|----------------------|
| 2+ days | `💎 Wishing Well: in 6 days` | `Fan Meet: in 3 days` |
| 1 day | `💎 Wishing Well: in 1 day` | `Fan Meet: in 1 day` |
| event day | `💎 Wishing Well: Today!` | `Fan Meet: Today!` |
| running, 1+ days to end | `💎 Wishing Well: ends in 2 days` | n/a |
| running, end day | `💎 Wishing Well: ends today` | n/a |
| nothing upcoming | `💎 Wishing Well: TBA` | `No events scheduled` |

Allowed channel types are voice, stage and category (§5), all of which keep
caps, spaces, punctuation and plain emoji, so one format serves all three.
Discord's sidebar *displays* category names in ALL CAPS; the stored name is
unchanged. Text and announcement channels are excluded because Discord
lowercases and hyphenates their names, which would need a second format.
Custom server emoji (`<:diamond:…>`) can't be used in a channel name.

## 4. When the name changes

- **Daily:** in the first scheduler pass after local midnight (§11).
- **Immediately** on:
  - `/countdown wishingwell` / `/countdown customevent` (setting the channel)
  - `/countdown timezone` (both channels: the day count can shift by one)
  - `/event create` / `edit` / `delete`, when it changes what the custom
    event channel should show
- **Rate-limit guard:** Discord allows ~2 name edits per channel per 10
  minutes, and a third doesn't fail, it hangs until the window resets. An
  immediate rename is skipped if that channel was renamed under **5 minutes**
  ago; the next scheduler pass picks up the change once the guard clears.
- A rename is only sent when the computed name differs from the last name the
  bot wrote, so a quiet day costs no Discord calls.
- **Maintenance mode** pauses renames along with the rest of the scheduler
  tick; the first pass after maintenance ends catches up.
- A **locked** guild (`guild_settings.locked`, migration 013) is skipped, the
  same as encounters and missions.

## 5. `/countdown` (setup)

Manage Server only (`default_member_permissions: "32"`), guild-only
(`integration_types: [0]`, `contexts: [0]`), every reply ephemeral.

```
/countdown wishingwell channel:<voice | stage | category>
/countdown customevent channel:<voice | stage | category>
/countdown timezone tz:<IANA name>
/countdown disable wishingwell
/countdown disable customevent
/countdown status
```

- `channel` is a CHANNEL option restricted to voice, stage and category
  channels (`channel_types: [2, 13, 4]`). Admins pick it from Discord's
  picker; the bot stores the channel ID. Nobody types or pastes an ID.
  `channel_types` is only a filter: users never see the numbers. The picker
  lists matching channels by name with Discord's own icons (speaker for
  voice, broadcast for stage, categories as group headings). The option's
  description spells it out: `A voice, stage, or category channel to rename`.
- `disable` is a subcommand group with two subcommands, so it reads
  `/countdown disable wishingwell` with no `which:` parameter. Discord allows
  subcommand groups and plain subcommands side by side in one command.

**Setting a channel** (`wishingwell` / `customevent`):
1. Refuse if it's the other kind's current channel.
2. Check the bot can see the channel and has Manage Channels on it. If not,
   refuse and say what's missing.
3. Save the channel's **current name** (restored by `disable`).
4. Rename it immediately.
5. Reply with what it now shows plus recommended permissions for that type:
   - voice / stage: @everyone **View Channel: allow**, **Connect: deny**
   - category: @everyone **View Channel: allow**, nothing else. Don't deny
     Connect on a category: synced child voice channels inherit it.

   The admin creates and configures the channel; the bot never creates
   channels or edits permission overwrites.

Re-running it with a different channel moves the countdown: restore the old
channel's saved name first (best effort), then set up the new one.

**`/countdown timezone tz:`** takes an IANA name with autocomplete
(e.g. `America/New_York`, `Asia/Tokyo`). Rejects anything `Intl` doesn't
recognize. Shared by both kinds. Re-renders both channels immediately (§4).

**`/countdown disable <kind>`** stops renaming that kind and restores the
channel's saved name. Disabling `customevent` **keeps the event list**;
re-enabling picks up where it left off.

**`/countdown status`** shows, per kind: channel, what it shows now, last
rename time, and if it was auto-disabled (§9), why. Plus the timezone.

## 6. `/event` (custom events)

Manage Server only (the whole command, including `list`), guild-only, every
reply ephemeral.

```
/event create name:<text> date:<YYYY-MM-DD>
/event edit event:<autocomplete> [name:<text>] [date:<YYYY-MM-DD>]
/event delete event:<autocomplete>
/event list
```

- **Date only**, no time, in the server's timezone. Since days are counted in
  whole calendar days and an event lasts until the end of its day, a time
  would never change what the channel shows.
- `date` must be **today or later** (local) and **no more than ~2 years out**
  (catches typos like `2062`). Ephemeral error otherwise.
- `name`: trimmed, whitespace collapsed, **max 80 characters**, so the name
  plus `: in 999 days` stays under Discord's 100-character channel name limit.
- **Cap: 24 custom events per server.** Wishing Well dates don't count.
  `create` past the cap is refused.
- **IDs** are short numbers per server (`#1`, `#2`, …), **never reused**, so
  multiple events can share a name safely.
- **Autocomplete** on `event:` shows `Nov 14 · Fan Meet · #3`.
- `edit` requires at least one of `name` / `date`; neither given is refused.
- `delete` acts immediately, no confirm button. Replies with what it removed:
  `Deleted "Fan Meet" (Nov 14) #3`.
- `list`: custom events only (never Wishing Well), sorted by date then ID:

  ```
  Nov 14, 2026 - Fan Meet - #3
  Dec 02, 2026 - Server Anniversary - #5
  ```

- **Past events are deleted automatically** once their local day has ended
  (§11).
- Events exist independently of the channel: they can be created with no
  custom event channel set, and survive `/countdown disable customevent`.

## 7. Wishing Well dates

- A constants file, `constants/wishingWell.js`, exporting a sorted array of
  Unix timestamps (seconds). Updated by hand when new dates are announced and
  shipped with a deploy.
- Global: every server with a Wishing Well channel reads the same list.
- Every Wishing Well lasts the same `WISHING_WELL_DURATION_SECONDS` (4 days),
  exported from the same file, so only start times are listed.
- The bot ignores Wishing Wells that have ended, so pruning the file is
  optional cleanup. Only running and future dates need to be kept.
- When none remain, the channel reads `💎 Wishing Well: TBA` (§3).

Seed data as of 2026-10-25 (Eastern times for reference):

```js
export const WISHING_WELL_DATES = [
  1793458800, // Sat Oct 31 2026 11:00 AM EDT
  1794538800, // Thu Nov 12 2026 10:00 PM EST
  1796050800, // Mon Nov 30 2026 10:00 AM EST
  1797562800, // Thu Dec 17 2026 10:00 PM EST
  1798729200, // Thu Dec 31 2026 10:00 AM EST
];
```

## 8. `/wishingwell` (public list)

- Open to **everyone**, guild and DM contexts, reply **ephemeral**.
- Lists upcoming Wishing Well dates as `<t:…:F>` and `<t:…:R>`, so each viewer
  sees them in their own timezone, the same shape as the community's pinned
  date post:

  ```
  💎 Wishing Well Dates 💎
  - <t:1793458800:R> <t:1793458800:F>
  - <t:1794538800:R> <t:1794538800:F>
  ```

- A running Wishing Well stays listed until it ends, as
  `- Live now, ends <t:end:R> <t:end:F>`.
- Read-only, needs no setup, and works whether or not the server has a
  countdown channel. Empty list: "No Wishing Well dates announced yet."

## 9. Failures

- After **3 failed renames in a row** on one channel (deleted, bot lost
  Manage Channels, etc.), clear **only that kind's** channel setting. The
  other kind and the event list are untouched. Same rule as encounters'
  `post_failures`, but counted per kind, like missions counting separately
  from encounters (migration 016) so one broken channel can't silence the
  other.
- `/countdown status` reports the auto-disable and the reason.
- No saved-name restore after an auto-disable: the bot can't rename a channel
  it can't reach.
- A successful rename resets that kind's counter to 0.
- A rename skipped by the 5-minute guard (§4) is not a failure.

---

## 10. Storage (implementation)

New migration (next free number, currently `034`).

**`guild_settings`**, two new columns (a countdown-only server gets a row with
`enabled = false` and no encounter channel, which the table already allows):

| Column | Type | Purpose |
|--------|------|---------|
| `countdown_timezone` | TEXT NOT NULL DEFAULT `'America/Los_Angeles'` | IANA name for §2 |
| `next_event_number` | INT NOT NULL DEFAULT 1 | Next custom event `#ID`; only ever increments, so IDs are never reused |

**`countdown_channels`**, one row per (guild, kind):

| Column | Type | Purpose |
|--------|------|---------|
| `guild_id` | TEXT | FK-free, matches `guild_settings.guild_id` |
| `kind` | TEXT CHECK in (`wishingwell`, `customevent`) | |
| `channel_id` | TEXT | Target voice, stage or category channel; NULL when disabled |
| `original_name` | TEXT | Name saved at setup, restored by `disable` |
| `rendered_name` | TEXT | Last name the bot successfully wrote |
| `renamed_at` | TIMESTAMPTZ | For the 5-minute guard |
| `rename_failures` | INT NOT NULL DEFAULT 0 | Consecutive failures; 3 clears `channel_id` |
| `disabled_reason` | TEXT | Shown by `/countdown status` after an auto-disable |
| `configured_by` | TEXT | Who last set the channel |
| `created_at` / `updated_at` | TIMESTAMPTZ | |

PK `(guild_id, kind)`. A partial unique index on `(guild_id, channel_id)`
where `channel_id IS NOT NULL` enforces §1's "not the same channel".

**`countdown_events`**:

| Column | Type | Purpose |
|--------|------|---------|
| `guild_id` | TEXT | |
| `event_number` | INT | The `#ID`; unique per guild |
| `name` | TEXT CHECK length 1–80 | |
| `event_date` | DATE | Local date in the guild's timezone |
| `created_by` | TEXT | |
| `created_at` | TIMESTAMPTZ | |

PK `(guild_id, event_number)`, index on `(guild_id, event_date)`. Creation
goes through one RPC that checks the 24 cap, claims `next_event_number` and
inserts in a single transaction, so two admins creating at once can't exceed
the cap or share an ID.

Changing the timezone doesn't touch stored `event_date`s: they were entered as
local dates and stay those dates.

## 11. Scheduler pass (implementation)

A third pass in `encounterScheduler.js`'s `runTick`, alongside encounters and
missions, with its own guild list (servers with at least one
`countdown_channels.channel_id` set and `locked = false`). Not gated on
`enabled` or `missions_enabled`.

The tick runs every 45s, but the countdown pass only queries Supabase every
**5 minutes** (in-memory timestamp), to keep request volume down on the
free-tier instance (see `TICK_INTERVAL_MS`'s comment). So the daily rename
lands within ~5 minutes after local midnight.

Each run, per guild:
1. Compute today's local date from `countdown_timezone`.
2. Delete that guild's `countdown_events` with `event_date` < today.
3. For each configured kind, compute the name (§2, §3). If it differs from
   `rendered_name` and the 5-minute guard allows, PATCH the channel via
   `discordRest.js`; on success store `rendered_name` / `renamed_at` and
   reset `rename_failures`, on failure bump it (§9).

State lives in Postgres, as with the other passes, so a redeploy loses
nothing: the first pass after boot compares the computed name with
`rendered_name` and fixes anything that drifted while the process was down.

The immediate renames in §4 call the same render-and-rename helper the pass
uses, so there's one code path for "what should this channel say".

---

## Settled decisions (2026-10-25)

- Independent of encounters/missions; off = no channel set, no toggle.
- Two channels max: Wishing Well and custom event, never mixed.
- Calendar days in a per-server timezone, default `America/Los_Angeles` (was
  `America/New_York` until 2026-10-27), so the flip lands overnight for
  every North American member.
- "Today!" for the event's whole local day; drops off at local midnight.
- Wishing Wells run 4 days; while one runs the channel counts down to its
  end (`ends in X days` / `ends today`), and the next start shows only after
  it ends (2026-10-27).
- `💎 Wishing Well:` prefix; `💎 Wishing Well: TBA` / `No events scheduled`
  when empty; `in 1 day` singular.
- Rename in the first pass after local midnight, and immediately on any
  change, behind a 5-minute guard.
- Pauses with maintenance mode and catches up afterward.
- `/countdown wishingwell|customevent channel:`, `/countdown timezone`,
  `/countdown disable wishingwell|customevent` (no `which:`),
  `/countdown status`.
- Bot picks an existing voice, stage or category channel only; never
  creates one or edits permissions. Recommends View allow / Connect deny for
  @everyone (View allow only for a category). No text/announcement channels.
- `/countdown` and all of `/event` are Manage Server, ephemeral.
- `/wishingwell` is public and ephemeral, Wishing Well dates only.
- `/event list` never includes Wishing Well.
- Custom events: date only, today to ~2 years out, names ≤80 chars, 24 per
  server, short never-reused `#ID`s with autocomplete, no delete confirm,
  `edit` needs name or date.
- Same-day custom tie: created first wins.
- Past events auto-deleted.
- 3 consecutive rename failures clear only that kind's channel.
- `disable` restores the saved original name and keeps the event list.
- Changing the timezone re-renders immediately.
- Wishing Well dates live in a hand-maintained constants file.
