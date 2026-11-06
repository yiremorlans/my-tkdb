# Spec: Announcements (ephemeral notices)

Status: **built** 2026-11-05. Run migration 037 before deploying.
Last updated: 2026-11-05

An ephemeral notice sent as a followup after a player's command, used to warn
players about upcoming maintenance (and when the app will be down), and to hand
out a free cooldown reset through a button.

Only §2 (Settled) holds user decisions. §3 holds open questions with Claude's
recommended answers.

---

## 1. Platform and codebase facts

- An ephemeral message can only go out as the response or followup to an
  interaction the player just made. The bot can't push one on its own, and the
  message is gone once dismissed or after a reload.
- Followup tokens last 15 minutes.
- `app_settings.maintenance_mode` (migration 024) is the existing kill switch,
  flipped in SQL and read through `maintenance.js` (60s cache). Owner bypasses.
- Banked cooldown resets already exist: mission completions are the ledger,
  `spend_cooldown_reset` (016, rewritten in 028) spends one, and it's offered
  only on the /roam and /meet cooldown reply (`missions/resets.js`). A
  non-co-op credit clears both clocks.
- "Today" in the app is the server's local calendar day
  (`localDayStart` in `constants/missions.js`).

## 2. Settled

- **Authoring (Q1):** notices are defined in a constants file
  (`constants/announcements.js`) and ship with a deploy.
- **Frequency (Q2):** shown at most once per player per day, from a lead-in
  start date until maintenance begins. Example: maintenance two days out,
  notices start going out tomorrow.
- **Triggers (Q3):** any player command or button that already replies
  ephemerally can carry it as a followup. Story moments are skipped (bond
  scenes, /call reveal, riddle and mission flows, the /meet Activity launch).
  Start with /roam, /meet, /affinity, /house, /bonds.
- **Free reset (Q4):** the button banks one cooldown reset, the same kind
  missions pay out, claimable once per player per notice.
- **Enforcement (Q5, revised by Q17):** notices only inform. You turn
  `maintenance_mode` on and off by hand in SQL, as today. Nothing in the app
  writes it.
- **Scope (Q6):** global, every server. No guild allowlist.
- **No fixed end:** maintenance has a planned start time but no fixed end
  time. A maintenance notice stops showing once its start time passes.
- **Voice (Q15):** plain system voice (UI strings), outside the character
  dialogue rules.
- **Times (Q16):** times are shown as Discord timestamps, so each player sees
  their own timezone. Only the start is shown, with no end and no duration
  estimate. The maintenance reply during the window stays the plain message.
- **Timestamp format (Q18):** `<t:X:F>` plus `<t:X:R>` ("Sunday, November 8,
  2026 at 12:00 PM (in 2 days)").
- **Day boundary (Q8):** the server's local calendar day, like missions.
- **Storage (Q9):** seen and claimed state lives in a Supabase table (new
  migration).
- **Reward notice frequency (Q10):** once a day while active, stops for a
  player once claimed.
- **Claim window (Q11):** the button only works while its notice is active;
  late clicks say it has expired. A banked reset never expires.
- **Reset strength (Q12):** clears both /roam and /meet, like a non-co-op
  mission reset.
- **Several notices (Q13):** one combined followup, maintenance first.
- **Eligibility (Q19):** every player who runs a trigger command, new players
  included.
- **Testing (Q20):** a `testOnly: true` flag shows a notice only to
  OWNER_DISCORD_ID.

## 3. Built

- `constants/announcements.js`: the `ANNOUNCEMENTS` list (shape and an
  example in its header), the text, and the startup check
  (`validateAnnouncements`, run from `validateContent`).
- `announcements.js`: `surfaceAnnouncements` (the followup) and
  `handleAnnouncementClaim` (`notice:claim:<id>`).
- `app.js`: `maybeSurfaceAnnouncements` after /roam and /meet (including the
  cooldown reply), /affinity, /house and /bonds.
- Migration 037: `announcement_views`, `mark_announcements_shown`,
  `claim_announcement_reset`, and `spend_cooldown_reset` spending claimed
  resets after mission credits. `countCooldownResets` and the dossier's
  banked count include them.

To post a notice: add it to `ANNOUNCEMENTS` with `testOnly: true`, deploy,
check it with your own account, then remove `testOnly` and deploy again.
Never reuse or rename an id that has gone out.
