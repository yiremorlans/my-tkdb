# Spec: Zenji's Advice Salon

Status: **design / not implemented**
Last updated: 2026-10-08

A daily public column run by Zenji Kotodama. Players submit short anonymous
notes (love advice, confessions, questions, anything in the Salon's spirit),
and once a day Zenji publishes **every** note from **every** server as one
shared issue, posted to each enabled server's channel with a thread for local
replies.

---

## 1. Canon

`constants/dialogue/reference.md` gets a short note under Zenji (part of this
work):

> **Advice Salon:** Zenji's open-submission column. Haku mentions it only in
> passing: he has nothing for Zenji's Advice Salon today. Zenji draws
> inspiration from what people send in, from people-watching, and from
> stories.

Everything else here (issue layout, cadence) is game framing, not canon. Zenji's
authored lines follow his reference.md voice: eccentric poet, metaphors, thinks
every Darkwick student is talented, sociable, unbothered by criticism.

---

## 2. Submitting

- **Who:** any user in a server with the Salon **enabled** (§4). Submitting
  from a server without it is refused with a short line.
- **How:** `/salon submit`, or the **Submit to the Salon** button on any issue.
  Both open the same modal (single paragraph field).
- **Length:** max **200 characters**: modal `max_length: 200`, plus a DB
  `CHECK (char_length(body) <= 200)`. Storage is trivial (~10k notes ≈ 2 MB).
- **Rate:** **one note per user per day** (UTC day), across all servers.
- **Anonymous** to readers. The author's Discord ID is stored for moderation
  only and never rendered.
- **Any topic** fitting an advice column; love is one theme, not the only one.
- **Banned users** (`user_activity.salon_banned`) are refused.
- Confirmation is ephemeral, a line from an authored Zenji pool
  (`SALON_RECEIVED_LINES`).

---

## 3. The daily issue

- Built at the **midnight UTC** rollover (same day key as the shop) from the
  previous day's notes.
- **Global:** the same issue goes to every enabled server.
- **No notes → no post.**
- Layout: one embed message per server.
  - Zenji's editor's intro, from an authored pool `SALON_INTROS` (~10), voice
    checked, no em dashes.
  - Every note, in submission order, separated cleanly. No author, no server
    name.
  - With ~23 active users, the worst case (~23 × 200 chars plus the intro) can
    pass one embed's 4096-char description, so split into a second embed in
    the same message; if the 6000-char message total would be exceeded, post
    the remainder as a follow-up message. No pagination.
  - `allowed_mentions: { parse: [] }` on every post, so a note can never ping.
  - A **Submit to the Salon** button (`salon:submit`).
- A **thread** is opened on each server's post every day an issue goes out.
  Replies stay local to that server.
- Thumbnail: Zenji, served by URL like the encounter reveal; dropped if
  `BASE_URL` is unset.

---

## 4. Server setup

- `/salon enable` / `disable` / `status` (Manage Server, same gating as
  `/missions`).
- Posts to the server's existing missions/encounters channel; no separate
  channel option.
- Own switch and failure counter on `guild_settings`: `salon_enabled`,
  `salon_post_failures` (auto-disable on repeated failure), so a broken Salon
  never turns off missions or encounters, and vice versa.

---

## 5. Moderation

- **Ban:** `user_activity.salon_banned BOOLEAN` blocks submission. Owner-only.
- **Remove:** owner-only `/salon remove id:<noteId>` marks the note removed so
  it is skipped if not yet published, and edits it out of posted copies where
  the message ids are known.
- No report button, no word filter (decided: ban + remove only).

---

## 6. Data model

New migration `031_advice_salon.sql`:

```sql
CREATE TABLE IF NOT EXISTS salon_notes (
  id              BIGSERIAL PRIMARY KEY,
  discord_user_id TEXT NOT NULL,          -- moderation only, never rendered
  guild_id        TEXT NOT NULL,          -- where it was submitted
  body            TEXT NOT NULL CHECK (char_length(body) BETWEEN 1 AND 200),
  day             DATE NOT NULL,          -- UTC day submitted
  published_at    TIMESTAMPTZ,
  removed_at      TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (discord_user_id, day)           -- one note per user per day
);

CREATE TABLE IF NOT EXISTS salon_posts (  -- for /salon remove edits
  day        DATE NOT NULL,
  guild_id   TEXT NOT NULL,
  message_id TEXT NOT NULL,
  thread_id  TEXT,
  PRIMARY KEY (day, guild_id, message_id)
);

ALTER TABLE guild_settings
  ADD COLUMN IF NOT EXISTS salon_enabled       BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS salon_post_failures INT     NOT NULL DEFAULT 0;

ALTER TABLE user_activity
  ADD COLUMN IF NOT EXISTS salon_banned BOOLEAN NOT NULL DEFAULT FALSE;
```

Service role only. Add a prune for published notes after a retention window
(e.g. 90 days), same pattern as `022_prune_missions.sql`.

---

## 7. Code touchpoints

| File | Change |
|---|---|
| `constants/salon.js` (new) | `SALON_INTROS`, `SALON_RECEIVED_LINES`, refusal lines |
| `salon.js` (new) | modal, submit handler, issue builder, poster, remove |
| `commands.js` | `/salon submit` / `enable` / `disable` / `status` / `remove` |
| `app.js` | route `salon:*` components and the modal submit |
| `encounterScheduler.js` (or a sibling) | daily rollover job posting the issue |
| `db/supabase.js` | note insert, day fetch, post record, remove |
| `constants/dialogue/reference.md` | Advice Salon canon note (§1) |
| `constants/validateContent.js` | no em dashes / "deadpan" in Zenji pools |

---

## 8. Tests

- One-per-day uniqueness; 201-char body rejected; banned user refused;
  submission from a disabled server refused.
- Issue builder: no notes → nothing; splits at embed/message limits; no
  author or guild in output; `allowed_mentions` empty.
- Removed notes are skipped.
- Post failure counter auto-disables only the Salon.

---

## 9. Settled (grilling session 2026-10-08)

- Name: **Advice Salon** (canon, passing Haku mention). Any topic.
- Global column: all servers' notes, published in full, every enabled server.
- Anonymous; Discord ID stored for moderation.
- 200-char cap, one per user per day, submit via command or issue button.
- Submitting requires the Salon enabled in that server.
- Posts to the missions/encounters channel, own enable switch; daily thread.
- Empty day posts nothing.
- Moderation: ban flag + owner remove only.
