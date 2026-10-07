# Spec: Public "call out" encounters

Status: **implemented** (code merged; the §1 prerequisites are still a manual,
one-time setup step per deployment). §17 (call scenes) is built (2026-10-06).
Last updated: 2026-10-07

### Where the implementation departs from this document

1. **The affinity table is `character_relationships`, not `relationships`**
   (migration 000). §16.4's `ALTER TABLE relationships` is written against the
   real table in `db/migrations/010_create_public_encounters.sql`.
2. **The wrong-guess cooldown is 10s.** §8's snippet says `30_000` but its own
   prose and the locked decision at §15.5 both say 10 seconds; 10s is what
   shipped, as `GUESS_COOLDOWN_MS`.
3. **§5's silhouette snippet is wrong and was not used verbatim.** Running
   `source-atop` + `fillRect` against the composite paints a black *rectangle*:
   the background has already made the whole canvas opaque, so "only where the
   destination has alpha" is everywhere, not just the character. The shipped
   version blacks the character out on its own offscreen canvas with
   `source-in` and draws that onto the background, which is a true cutout.
   `test/silhouette-composition.test.js` pins both halves of this.
4. **`aliases` for Lucas and Edward already existed** in `constants/characters.js`,
   so the §14 change to that file was a no-op.
5. **Cadence is anchored on the last spawn, not on a stored next-spawn time.**
   §3 and §10 keep `guild_settings.next_encounter_at` — a future target. That is
   replaced by `last_encounter_at` + `next_gap_minutes`, and readiness is
   `now >= last_encounter_at + next_gap_minutes`. Two reasons. It matches how
   `/roam` and `/meet` already work (`command_limits.last_used_at` plus a fixed
   cooldown; the only difference is that this gap is randomised per spawn, so it
   has to be stored alongside the anchor). And it keeps the database from
   literally holding "the next encounter is at HH:MM", which is the single fact
   the game depends on nobody having. Behaviour under restart is identical
   either way — both are pure Postgres state — but the anchor form reads as what
   it is: an elapsed-time check against a past event.
6. **Setting the channel again *moves* it, and closes out anything stranded.**
   §4 doesn't say what a second `/encounters channel` does. It replaces: the
   write is an upsert on `guild_settings.guild_id`, which is the PRIMARY KEY, so
   a guild structurally cannot have two encounter channels — there is no check
   in the handler because there is no state to check for. The reply names the
   channel being left behind.

   What the spec misses is that a move would strand any encounter still live in
   the old channel: its silhouette sits somewhere `/call` no longer accepts,
   counting down to a deadline nobody can answer. A live encounter now **comes
   with the channel**. Discord has no "move a message", so `moveEncounterToChannel`
   re-posts it — recomposing the silhouette from the `background`, `character_id`
   and `variant` already on the row — and repoints `channel_id` and `message_id`.
   Since the win edit, the miss edit and the finalize sweep all read those two
   columns off the row, that is what relocates the whole encounter; `expires_at`
   is untouched, so the deadline does not restart. The old post is edited to a
   pointer at the new channel with the silhouette dropped. If the re-post fails
   the encounter is expired where it stands rather than left unanswerable, and
   the repoint is conditional on `resolved_at`, so a win landing mid-move keeps
   its reveal in the channel it actually happened in. This is the only time the
   feature composites twice; it is a rare admin action, not the hot path.
7. **The Manage Server gate is enforced in the handler, not just declared.**
   §4 sets `default_member_permissions: '32'` and treats that as the whole
   permission story. It isn't: that value is a *default*, and a server admin can
   override it under Server Settings → Integrations to grant `/encounters` to
   any role. `handleEncountersAdmin` now re-checks the invoking member's real
   computed permissions (`member.permissions`, a bitfield inside the signed
   interaction body, so unforgeable) for Manage Server or Administrator, and
   fails closed on anything missing or malformed. It gates every subcommand, not
   just `disable` — `channel` can relocate encounters into a channel nobody
   reads, which stops the feature just as effectively.
8. **`/encounters status` is a health report, and shows no timing.** §4 has it
   list the channel, cadence, next spawn time and settings; the setup reply
   quoted the next spawn too. All timing is removed — the command is
   Manage-Guild-only, but an admin who can see the next spawn can camp the
   channel and win every encounter, and the cadence range brackets it just as
   well once you've seen one land. What remains answers one question, "is this
   working?", in a single line: **Running** (with the channel), **Running, with
   errors** (some posts failed, how many before it stops), **Stopped** (the
   auto-disable tripped — named separately from a deliberate `disable`, since
   reporting a broken bot as merely "off" hides it, with the permissions to
   check and how to restart), **Off**, or **Not running** (no channel set).
9. **A partial unique index enforces one live encounter per guild.**
   `CREATE UNIQUE INDEX ... ON public_encounters (guild_id) WHERE resolved_at IS NULL`.
   §13 lists "multiple app instances" as out of scope, but a *rolling* redeploy
   overlaps two instances for a few seconds by design, and the
   `getActivePublicEncounter`-then-`INSERT` guard is two statements. The index
   turns that race into a unique violation, which `createPublicEncounter`
   returns `null` for and `spawnEncounter` treats as "someone else got there
   first". Cheap insurance against the one duplicate the spec's guard can't stop.
10. **The scheduler runs one tick immediately on start**, not only after the
   first 25-second interval — so a redeploy resumes at once instead of leaving
   anything already due waiting out a dead window.
11. **`recordGuildSpawn` (was `setGuildNextEncounter`) takes an explicit `resetFailures` flag.** §3 has a
   successful post clear `post_failures`, but a *failed* post also has to move
   the clock forward (or a broken channel is retried every tick) — and doing
   that must not wipe the counter it just incremented.
12. **The `/call` handler reads the relationship in parallel with the claim.**
   §7 budgets one read plus one write for a win, but §16.1's win reply includes
   the milestone afterline, which needs the tier. The two calls are independent,
   so `Promise.all` gets the tier for no extra latency.
13. **Milestone templates use `{firstName}`, not `{name}`, for possessives**
   ("a movie in Rui's room" rather than "in Rui Mizuki's room").
14. **§16.7's open questions are unchanged**: no boost expiry, either `/roam` or
   `/meet` may spend the boost (whichever comes first), a flat +1 per win rather
   than a themed bonus response, and milestones stack without dedup. The next
   authored response redeems the pending boost for that character in one
   update (see §16.1), not as a separate nudge split across `/roam`s.

### Added beyond this spec

**The milestone set is 33 campus-life situations, not the 7 sketched in §16.2.**
Each is its own independent tally per user *per character* — `milestone_type` is
a discrete key, so "Moments together" renders one row per situation rather than
a single combined counter. Gating is cumulative: a Stranger draws from 3, a
Devoted from all 33. Each level unlocks one more than the last: 3 / 4 / 5 / 6 /
7 / 8 across new → known → warm → spark → close → bound, so every step up the
relationship curve visibly unlocks something, and more of it the longer the level
lasts. Benkei's pool follows the same curve.

**Milestones live in `constants/milestones/`, one file per character, with the
shared set as the default.** `shared.js` is the campus set above: student life
(reports, classes, dorms, briefings, curfew). A character with no file draws
from all of it. A character whose life doesn't fit gets a file exporting
`{ milestones, shared }`: their own `<id>_*` moments plus the shared keys they
keep, and nothing else, so their moments never reach anyone else's tally.
`index.js` assembles `ENCOUNTER_MILESTONES` (every key, for lookups), builds
the pools, and fails at import on a duplicate key or an unknown shared key.

- **Benkei** (`benkei.js`) isn't a student: he's the shopkeep at the 24/7
  campus store and used to be a professor. He keeps the campus moments that
  don't assume he's a student (`coffee_break`, `vending_machine`,
  `shared_umbrella`, `watched_sunset` and so on).
- **Jin** (`jin.js`) is a student but stays locked in the Frostheim captain's
  room, so he keeps only the campus moments that can happen in or from his room
  (`movie_night`, `storm_watch`, `stayed_up`, `lazy_day` and so on) plus his
  own `jin_*` set, which carries every tier since that list is thin.
- **Edward** (`edward.js`) is confined to Obscuary, sleeps through the day and
  can't take the sun, and doesn't attend class. His set is letters, parasol,
  YouTube and the devil's hour. No sunrise, no reading.
- **Elias** (`elias.js`) is a fourth-year on probation who runs errands for Jo,
  not a class-going student. His moments are walks, candy, coffee, snack runs.
- **Haru** (`haru.js`) runs Jabberwock day and night, so he doesn't regularly
  go to class. Feeding time, Peekaboo, tour fliers, chores, picking Ren up. No
  `walked_back`: canon has him unable to walk the caller home.
- **Rui** (`rui.js`) doesn't attend class and can't get tired. The bar, the
  kitchen and the garden, and none of the idle moments (`campus_bench`,
  `lazy_day`).
- **Shion** (`shion.js`) skips class and is a pariah on campus. Scaring people
  "happy", Mio's toolbox, the Heebie-Jeebie House, the docks.
- **Towa** (`towa.js`) can't speak by day and is more animal than student:
  wordless daytime moments (clover, humming) and night ones (stars, love
  stories, the tree on the hill).
- **Zenji** (`zenji.js`) is a ghost: he doesn't eat, can't be seen by most, and
  has no casual contact, so nothing needs a table, an umbrella or a hand-off.

The rest of the roster keeps the default. Skippers like Leo, Sho and Taiga are
still students whose lives fit the campus set, and Lyca attends class.

§16.2's `movie_hooky` is split into `skipped_briefing` and `movie_night` — they
were one entry doing two jobs, and they read better as separate collectibles.
Adding or renaming a milestone needs **no migration** (`milestone_type` is free
TEXT) and the `/affinity` renderer skips keys it no longer recognizes, so a
retired key stops displaying rather than breaking.

**Monthly win leaderboard + retention** (`db/migrations/011_encounter_win_stats.sql`).
This document specifies no analytics for `/call` and no retention for the tables
it creates, which left `public_encounters` and `public_encounter_guesses` growing
without bound. Migration 011 adds:

- `encounter_win_stats` — a durable rollup of correct guesses, keyed
  `(user, guild, YYYY-MM)`, written at win time by the atomic
  `record_encounter_win()`. Read with `getEncounterLeaderboard()` /
  `getUserEncounterWins()` in `db/supabase.js`.
- `prune_encounter_data()` on pg_cron, daily at 03:30 UTC — win stats at 13
  months, and `public_encounters` split on outcome: unsolved at 7 days (the row
  records only that the scheduler fired), solved at 90.

The rollup is written at win time rather than aggregated from
`public_encounters` on demand *because* those rows are now pruned; deriving the
board from them would quietly lose history at the 90-day mark.
`encounter_milestones` is exempt from pruning — it is player-visible
progression, not analytics, and since it is now a per-kind tally (one row per
`(user, character, milestone_type)`, bumped with a `total`, not one row per win)
it is bounded and has nothing to prune anyway.

**§10's `public_encounter_guesses` is dropped entirely.** The spec has it as an
append-only analytics log; in practice nothing ever read it — two writes, zero
readers. Engagement is defined as *reaching a character*, so it is measured by
`encounter_win_stats` alone and a wrong guess now writes no row anywhere. The
tradeoff, accepted deliberately: a player who calls out often and never wins is
invisible to analytics, and an encounter fifteen people guessed at and missed is
indistinguishable from one nobody looked at. Both were judged not worth a table
that grows with every keystroke. §8's note that the log "is still written for
analytics" no longer holds; the in-memory cooldown is the only thing limiting
retries, exactly as §8 otherwise describes.

**§12's environment variables do not exist.** The spec configures the feature
through `ENCOUNTER_MIN_MINUTES`, `ENCOUNTER_MAX_MINUTES`,
`ENCOUNTER_WINDOW_MINUTES`, `ENCOUNTER_TICK_SECONDS`, `ENCOUNTER_BOOST_GAIN` and
`ENCOUNTER_BOOST_CAP`. All six are now plain exported constants — the first five
in `constants/publicEncounters.js`, the tick interval in
`encounterScheduler.js` — and `.env.sample` carries none of them. They are game
balance rather than deployment config: identical in every server and every
deployment, so retuning one is a code change and a redeploy, the same bar as
changing `RELATIONSHIP_LEVELS` or a per-character affinity value. The names in
§12, §16.6 and throughout still refer to real identifiers; only their source
changed. `ENCOUNTER_CHANNEL_ID` and `ENCOUNTER_AFFINITY_GAIN` are absent exactly
as the spec says, so `.env` gains nothing at all from this feature.

**§10's `guild_settings` drops `cadence_min_minutes` / `cadence_max_minutes` /
`window_minutes`.** They were read by `resolveGuildConfig` but written by
nothing — `/encounters` has no subcommand for them — so they were NULL in every
row and the three settings were global in practice while reading as a working
per-guild feature. Cadence and window are now plainly global
(`resolveEncounterConfig()`, no arguments). Add the columns back alongside a
command that writes them, not before.

**`runTick` sweeps expired encounters across all guilds, not just enabled ones.**
§3 has the sweep inside the per-guild loop, but `/encounters disable` drops a
guild out of `getEnabledGuilds()` immediately — so a guild disabled mid-encounter
would never finalize the in-flight row, leaving its post showing a countdown that
had already run out and the row unresolved forever (and therefore never pruned).
§4's "any in-flight encounter is left to finalize normally" only holds with the
sweep hoisted out of the loop.

**`/encdev` — owner-only manual trigger.** Not in this spec. A global command
registered with `default_member_permissions: '0'` (hidden from non-admins) whose
handler hard-gates on the `OWNER_DISCORD_ID` env var and answers everyone else
with a bare "Unknown command." so the command's existence isn't confirmed.
`/encdev spawn [character] [variant]` forces one encounter immediately —
`character` takes a name/alias (resolved through `matchCharacterGuess`),
`variant` is `uniform`/`casual`; both optional. `/encdev clear` expires the
guild's live encounter so another can be spawned without waiting out the
2-minute window. A manual spawn passes `reanchor: false` to `spawnEncounter`, so
it never writes `guild_settings`: the real cadence anchor and the post-failure
counter are untouched, and a test spawn neither moves nor masks the live
schedule. Purely a testing aid — the cadence is otherwise 45–180 minutes.


A scheduled job posts a public, everyone-can-see encounter into a designated
channel — **one per Discord server** — on a random cadence. The character is
shown as a **black silhouette** over a real background. The first user to `/call {name}` with the correct name within a short window "reaches" them: the post is
edited to **add an embed** carrying a relationship-tiered flavor line unique to
that winner and that character (the line names them) and a small thumbnail of
the real character art — the big silhouette stays put beneath it. The winner
also gets a **pending boost** toward their next `/roam` / `/meet` with that
character plus a milestone — a win never moves affinity directly; see §16. If no
one gets it in time, the post's text edits to a non-committal "moment has
passed" line, the image is dropped, and the name is never spoken. **No new image
is ever composed** — the reveal thumbnail is the existing character asset served
by `/assets`.

**Multi-server:** the bot runs in a small number of guilds (< 5). Each guild has
its **own independent schedule, its own in-flight encounter, and its own
configured channel** — there is no single collective spawn time. Affinity is
keyed to the Discord **user** and is global: a user's relationship with a
character is the same in every server; only the encounter and its channel are
guild-scoped.

This is a new, standalone feature. It does not change `/roam`, `/meet`,
`/affinity`, or `/house`.

---

## 1. Feasibility summary

No new infrastructure or dependencies. Everything builds on what exists:

| Need | Already in place |
|---|---|
| Host a recurring scheduler | Long-lived Express process (`app.js`), single Railway instance |
| Black-silhouette rendering | `canvas` — extract a shared base helper in `imageComposition.js`, add a `composeSilhouetteEncounter` entry point (~4 lines of silhouette fill); `composeEncounter` untouched |
| Per-guild state + first-correct-answer arbitration | Supabase, service role, atomic conditional `UPDATE` |
| Post to a channel + edit that post later | Bot token already configured; standard Discord REST |
| Relationship tiers | `getRelationshipLevel` / `getDialogueTier` in `constants/game.js` |

**New capability:** the bot *initiating* a channel message (today it only
responds to interactions) and later *editing* it. Both are well-trodden Discord
endpoints.

**Scheduler is a REST cron loop, not a gateway bot.** No WebSocket / shard
concern for this feature — the scheduler ticks on a timer and posts via Discord
REST. The bot does now hold a lightweight presence-only gateway login
(`gateway.js`, added so it shows the green "online" dot); that is unrelated to
this feature and the scheduler does not use it.

**Assumption:** a single app instance. Two instances would double-fire the
scheduler for every guild; if the app is ever scaled out, gate the scheduler
tick behind a Postgres advisory lock.

**Effort:** ~1.5–2 days. Riskiest part is the multipart channel POST/edit (new
for this codebase). Silhouette compositing and the atomic claim are quick. The
per-guild machinery is straightforward at this scale.

### Prerequisites (one-time, before any of §2–§16)

The spec assumes the bot can already POST to a guild channel. Setup for that —
and the bot's re-invite and hosting requirements — is in
[`channel-call-response-feature.md`](./channel-call-response-feature.md). In
short:

1. **Guild install with the `bot` scope.** An interactions endpoint alone does
   not make the bot a guild member, and `commands.js` registers commands with
   `integration_types: [0, 1]` — a user-only install cannot post to a channel.
   Re-invite with scopes `bot` + `applications.commands` and channel permissions
   **View Channels + Send Messages + Attach Files + Embed Links** (Attach Files
   for the silhouette POST, Embed Links for the win edit's reveal embed — §5.1),
   permission integer **`52224`**.
2. **`DISCORD_TOKEN` present** (Developer Portal → Bot → Reset Token), distinct
   from `APP_ID` / `PUBLIC_KEY`. The §11 REST helpers send
   `Authorization: Bot ${DISCORD_TOKEN}`.
3. **Host stays awake.** The §3 tick loop only runs while the process runs — on
   Railway, disable **Serverless** for the service, or a sleeping container
   silently stops spawning encounters (§3 "Sleeping hosts").
4. **No privileged intents.** `/call` answers arrive as command options, so
   Presence / Server Members / Message Content stay off.

---

## 2. End-to-end lifecycle (per guild)

```
scheduler tick (every ~25s, iterates every enabled guild independently)
  for each guild G in guild_settings WHERE enabled = true:

    FINALIZE: public_encounters WHERE guild_id=G AND resolved_at IS NULL AND expires_at < now()
      └─ atomic UPDATE ... SET outcome='expired'
         └─ edit G's post → alternating "moment has passed" line,
            drop the image (attachments: []), identity never shown

    SPAWN: if G has no active encounter AND now() >= G.next_encounter_at:
      ├─ pick background  (Darkwick | Galaxy Express pools, _PM-gated by the fixed America/Chicago evening cutoff)
      ├─ pick character   (uniform random over all CHARACTERS)
      ├─ pick variant     (uniform | casual, 50/50; fall back to uniform if no casual art)
      ├─ pick teaser line
      ├─ INSERT public_encounters row (guild_id=G, expires_at = now + G.window_minutes)
      ├─ compose SILHOUETTE image (bg + solid-black character, NO dialogue box)
      ├─ POST to G.encounter_channel_id  → store message_id on the row
      └─ G.next_encounter_at = now() + random(G.cadence_min, G.cadence_max)

/call {name}   (only accepted in the calling guild's own encounter_channel_id)
  ├─ not in a guild (DM / user-install)  → ephemeral: "only works in a server"
  ├─ guild not configured                → ephemeral: "encounters aren't set up here"
  ├─ wrong channel                       → ephemeral: "you can only call out from <#channel>"
  ├─ no active encounter for this guild  → ephemeral: "no one to call out to right now"
  ├─ input matches nothing               → ephemeral: "don't know who that is"  (no cooldown, no penalty)
  ├─ input matches a DIFFERENT character → ephemeral: alternating "wrong" line, start 10s cooldown
  ├─ within 10s of your last wrong guess → ephemeral: "try again in Ns"
  └─ correct:
        atomic claim (UPDATE ... WHERE id=? AND resolved_at IS NULL)
          ├─ 0 rows  → ephemeral: "someone reached them first"
          └─ 1 row   → ephemeral: "That was {name}." + milestone afterline (§16.1)
                       async: grant pending boost + record milestone (§16),
                              derive tier from stored (unchanged) affinity,
                              edit post → ADD embed { tiered winner line,
                              thumbnail = character art URL }; silhouette
                              attachment untouched, no image composed
```

`next_encounter_at` for a guild is set **right after that guild's post
succeeds**, so each guild's cadence is independent of how fast its encounters get
solved and independent of every other guild.

---

## 3. Scheduler

New module `encounterScheduler.js`, started after `app.listen(...)` in `app.js`.

### One tick loop, no per-guild timers

A single `setInterval` every **~25 seconds**. Each tick:

1. `rows = guild_settings WHERE enabled = true` — indexed, trivial (< 5 rows).
2. For each guild, in sequence (or with a small `p-limit`, unnecessary at this
   scale):
   - **Finalize** any expired-but-unresolved encounter for that guild
     (`finalizeExpiredEncounters(guildId)`), then edit its Discord post to a
     `MISSED_LINES` entry.
   - **Spawn** check: if that guild has no active encounter
     (`resolved_at IS NULL AND expires_at > now()`) **and**
     `now() >= guild.next_encounter_at`, generate and post a new encounter for
     that guild, then set `guild.next_encounter_at = now() + random(min, max)`.
3. `guessCooldown` cleanup — drop entries whose encounter is no longer active
   (or just `guessCooldown.clear()`; see §8).

**Why a tick loop instead of `setTimeout` per guild:** all timing state lives in
Postgres (`guild_settings.next_encounter_at`), so the loop is fully
restart-safe — on boot it just starts ticking and re-reads the table. No timers
to re-arm, no drift, nothing lost on redeploy. Encounter expiry is accurate to
±one tick; keep the tick ≤ 25s since the window is 2 min.

Optionally arm a best-effort per-encounter `setTimeout(finalize, windowMs)` for a
crisper finalize, with the tick as the guaranteed backstop.

### Cadence (per guild)

- `guild_settings.cadence_min_minutes` / `cadence_max_minutes`, defaulting to the
  global `ENCOUNTER_MIN_MINUTES` / `ENCOUNTER_MAX_MINUTES` (45 / 180) when NULL.
- Gap for a guild = `cadence_min + random() * (cadence_max - cadence_min)` minutes.
- Each guild rolls its own gap. Two guilds never share a spawn clock.

### Enable / disable

- The scheduler runs whenever **any** guild has `enabled = true`.
- A guild with no `guild_settings` row, or `enabled = false`, or a null
  `encounter_channel_id`, is skipped entirely.
- If `guild_settings` is empty, the tick is a no-op (one cheap query per 25s).

### First run after (re)configuration

When an admin sets the channel (see §4), write
`next_encounter_at = now() + random(min, max)` so the first encounter lands one
normal interval later, not immediately.

### Post failure

If a guild's channel POST fails (bot lacks permission, channel deleted, Discord
5xx): mark the just-inserted row `outcome='expired', resolved_at=now()`,
increment `guild_settings.post_failures`, log. After 3 consecutive failures set
`enabled = false` for that guild (and optionally DM `configured_by`). A
successful post resets `post_failures` to 0.

### Sleeping hosts

A tick loop only fires while the process is running. If the host is configured to
sleep/scale-to-zero, ticks pause until an inbound request wakes it; encounters
then resume, re-anchored from each guild's `next_encounter_at`. Fix is an
external trigger (a `pg_cron` job hitting an HTTP `/tick` endpoint, or an
external cron pinging the app) — a scheduling-trigger concern, not a storage one.
A normally-running Railway service does not need this.

---

## 4. Admin setup command — `/encounters`

Per-guild configuration. Registered with
`default_member_permissions: "32"` (Manage Guild) so only server admins see it.

```js
const ENCOUNTERS_COMMAND = {
  name: 'encounters',
  description: 'Configure public call-out encounters for this server',
  type: 1,
  default_member_permissions: '32', // MANAGE_GUILD
  integration_types: [0],           // guild install only
  contexts: [0],                    // guild channels only
  options: [
    {
      type: 1, name: 'channel', description: 'Set the channel encounters post in (enables the feature)',
      options: [{ type: 7, name: 'channel', description: 'Target channel', required: true, channel_types: [0] }],
    },
    { type: 1, name: 'disable', description: 'Stop posting encounters in this server' },
    { type: 1, name: 'status',  description: 'Show the current encounter settings' },
  ],
};
```

Handler (`app.js`):

- Reject if `req.body.guild_id` is absent → *"This only works in a server."*
- `channel` → upsert `guild_settings` for `guild_id`:
  `encounter_channel_id = <id>`, `enabled = true`,
  `next_encounter_at = now() + random(min, max)`, `configured_by = userId`,
  `post_failures = 0`. Reply ephemerally with the channel and the approximate
  first-spawn time (`<t:...:R>`). Optionally post a one-time confirmation message
  to the target channel to surface any permission problem immediately.
- `disable` → `enabled = false`. Any in-flight encounter is left to finalize
  normally.
- `status` → show `encounter_channel_id`, `enabled`, next spawn time, cadence.

The global `ENCOUNTER_CHANNEL_ID` env var is **removed** — configuration is
entirely per-guild via this command.

---

## 5. Image: black-overlay silhouette

**The image is composed once, at spawn.** No second image is ever composed —
a win keeps the spawn silhouette, a miss drops it. `composeSilhouetteEncounter`
needs no `reveal` mode; the block below keeps it as an optional flag only in
case a future version wants an un-overlaid variant, but this version never
calls it with `reveal: true`.

### 5.1 What the resolution edit does to the image

Both resolutions are a plain JSON `PATCH` — no multipart, no `canvas`, no
recompose. The big silhouette attachment from spawn is the only composited
image the feature ever makes.

| Outcome | PATCH body | Renders as |
|---|---|---|
| **Win** | `{ content: '<@winnerId>', embeds: [ reveal ] }` — omit `attachments` | silhouette stays as the message's main image; an embed sits beneath it holding the tiered winner line + a thumbnail of the real character art |
| **Miss** | `{ content: missedLine, attachments: [] }` — no embed | silhouette removed; just the "moment has passed" text |

The **reveal embed** (win only):

```js
{
  description: pickWinnerLine(tier, { user, name, house }),  // §9.3
  color: level.color,                    // reuse the relationship level's color
  thumbnail: { url: getCharacterImageUrl(character, encounter.variant) },
  footer: { text: character.house || 'Darkwick' },
}
```

- `getCharacterImageUrl` (`constants/characters.js:997`) already builds
  `${BASE_URL}/assets/chars/<file>` — the same helper `/affinity` uses. No
  upload, no compositing; Discord fetches the asset over HTTPS.
- The `{user}` mention must be in **`content`**, not the embed — mentions inside
  an embed don't ping. Put the bare `<@winnerId>` (or a short lead) in `content`
  and the full flavor line in `description`.
- The thumbnail renders small (~80px). The full-body character cutout is legible
  enough at that size; a dedicated face-crop asset would read better if you ever
  want one, but it's not required.
- **Embed Links permission is required** for this edit (any bot message with an
  `embeds` array needs it). See §1 Prerequisites / §11 — permission `52224`.

Rationale for keeping the silhouette on a win: it becomes a stylized "solved"
stamp and preserves the channel's visual rhythm, while the embed does the actual
reveal. On a miss there's nothing to reveal, so the image just goes.

Replace-the-big-image-with-un-overlaid-art (recompose PNG + multipart PATCH with
`attachments:[{id:0}]` + `files[0]`) is the only option with real cost — the
multipart edit path, a 2nd ~1–2s composite, its own tests — and is explicitly
**out** (that was the original design; this supersedes it).

`imageComposition.js` today has a single
`composeEncounter(bgFilename, charFilename, dialogue = null)`. Rather than add a
`silhouette` branch inside it — the function `/roam` and `/meet` depend on —
extract its shared prefix into an internal helper and give this feature its own
entry point:

```js
// internal, not exported. Loads bg + char, sizes the canvas to the bg, draws
// the background, computes charX/charY, draws the character. Everything
// composeEncounter does today up to the dialogue box, moved verbatim.
async function drawEncounterBase(bgFilename, charFilename) {
  // ... existing load + createCanvas(bg.w, bg.h) + drawImage(bg)
  //     + charX/charY + drawImage(char) ...
  return { canvas, ctx, charImg, charX, charY };
}

// Unchanged public API and output — /roam and /meet keep calling this as-is.
export async function composeEncounter(bgFilename, charFilename, dialogue = null) {
  const { canvas, ctx } = await drawEncounterBase(bgFilename, charFilename);
  if (dialogue) {
    // ... existing dialogue-box block, verbatim ...
  }
  return canvas.toBuffer('image/png');
}

// New — public encounters only. No dialogue box, ever.
export async function composeSilhouetteEncounter(bgFilename, charFilename, { reveal = false } = {}) {
  const { canvas, ctx, charImg, charX, charY } = await drawEncounterBase(bgFilename, charFilename);
  if (!reveal) {
    ctx.globalCompositeOperation = 'source-atop';
    ctx.fillStyle = '#000';
    ctx.fillRect(charX, charY, charImg.width, charImg.height);
    ctx.globalCompositeOperation = 'source-over';
  }
  return canvas.toBuffer('image/png');
}
```

- The `/roam` / `/meet` path is byte-for-byte unchanged: `composeEncounter` keeps
  its exact signature and output. Only the shared setup moves, and both functions
  call the same helper, so character positioning can never drift between them.
- `source-atop` paints black only where the character's alpha already is → a
  clean cutout silhouette over the untouched background. The character PNGs are
  alpha cutouts, so this works directly.
- **Silhouette post (the only composite this feature makes):**
  `composeSilhouetteEncounter(bg, charFile)`.
- No second image is ever composed or uploaded. On a **win** the silhouette PNG
  from spawn stays put and a reveal embed is added (its thumbnail is a `/assets`
  URL, §5.1); on a **miss** the silhouette is dropped. Either way `canvas` is
  not touched on the guess path.
- Dialogue is **never** baked into the image for this feature. The teaser and
  all flavor text live in the Discord message body.

At < 5 guilds the composite cost (~1–2s each, a handful per hour total) is
negligible — no image cache or worker pool needed. If guild count ever grows,
disk-cache composited PNGs keyed `${bg}__${char}__${variant}.png`
(deterministic, reusable across guilds and time).

---

## 6. Encounter generation (`constants/publicEncounters.js`)

Identical for every guild; each call is independent.

### Background

Pool = `weightedBackgrounds(GENERAL_LOCATIONS.DARKWICK, now)` concatenated with
`weightedBackgrounds(GENERAL_LOCATIONS.GALAXY, now)`, then pick one entry
uniformly. Note `GENERAL_LOCATIONS.GALAXY` is the string `'Galaxy Express'`
(`'Galaxy'` is not a valid key and returns `[]`); `GENERAL_LOCATIONS.DARKWICK` is
`'Darkwick'`.

`weightedBackgrounds` (not the bare `getAvailableBackgrounds`) is what `/roam`
and `/meet` use, so this matches their behaviour exactly:

- `_PM` files are excluded during the day and included in the evening, judged
  against the fixed `America/Chicago` cutoff (`EVENING_HOUR` / `EVENING_TIMEZONE`
  in `constants/backgrounds.js`);
- in the evening each `_PM` file is repeated `EVENING_PM_WEIGHT` (= 3) times in
  the list, so a uniform pick over the concatenated pool is 3× more likely to
  land on an evening background — the bias `getAvailableBackgrounds` alone does
  not apply.

`GENERAL_LOCATIONS` also has `ULTIO` and `CLEMENTIA`; both are intentionally left
out of the encounter pool.

### Character

Uniform random over all `CHARACTERS` (all 26, Benkei included).

### Variant

50/50 `uniform` vs `casual`. If the chosen variant has no art
(`character.images.casual` is undefined for Elias, Mio, Shion; Benkei has
`work`, not `casual`), fall back to `uniform` (or the first key of
`character.images`). Net effect: those characters always appear in uniform.
Documented, not a bug.

### Teaser line

`SHARED_ENCOUNTER_TEASERS` in `constants/dialogue/_shared.js`, keyed by time of
day, picked with `pickTeaser(now)`:

```js
export const SHARED_ENCOUNTER_TEASERS = {
  any: ["Someone you know, up ahead.", "That outline's familiar. Call out?", /* ... */],
  day: ['A familiar figure in the between-class crowd.', /* ... */],
  evening: ['A silhouette at the edge of the lamplight.', /* ... */],
};
```

`any` merges into whichever `TIME_BUCKETS` pool is current — the same merge rule
as the `when: { time }` dialogue blocks. The split is the point: shadows and
half-light are an evening register, and at midday the same figure is lost in a
crush of students instead. Lines are deliberately short; the message body below
already carries the how and the deadline.

### Message content (silhouette post)

```
{teaser}

Type `/call <name>` to reach them. You have until <t:{expiresUnix}:R>.
```

No buttons/components (it's answered with a slash command).

---

## 7. `/call` slash command

### Registration (`commands.js`)

```js
const CALL_COMMAND = {
  name: 'call',
  description: 'Call out to the figure in the encounter channel',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
  options: [
    {
      name: 'character',
      description: 'Who do you think it is? e.g. Rui or Rui Mizuki',
      type: 3, // STRING
      required: true,
    },
  ],
};
```

Add `CALL_COMMAND` and `ENCOUNTERS_COMMAND` to `ALL_COMMANDS`. **No
autocomplete** on `character` — recognizing the silhouette and typing the name
accurately is the game.

### Handler (`app.js`, `APPLICATION_COMMAND`, `name === 'call'`)

All replies are ephemeral (`flags: 64`). Responds within the 3s budget: at most
**one DB read** for a wrong/blocked guess, one read + one atomic write for a
correct guess. Follow-up work (affinity boost, milestone, the message edit —
content + reveal embed, analytics) runs after `res.send`, fire-and-forget. No
image is composed on the guess path — the silhouette was rendered once at spawn
and the reveal thumbnail is a `/assets` URL.

Order of checks:

1. `req.body.guild_id` absent → `This only works in a server.`
2. Load `guild_settings` for `guild_id`. Missing / `enabled = false` /
   null channel → `Encounters aren't set up in this server.`
3. `req.body.channel_id !== guild.encounter_channel_id`
   → `You can only call out from <#${guild.encounter_channel_id}>.`
4. `getActivePublicEncounter(guildId)` → none, or `expires_at <= now`
   → `There's no one to call out to right now.`
5. `matchCharacterGuess(input)` (see §7.1):
   - no match → `I don't know who that is.` — **no cooldown, no penalty**
   - matches a different character → wrong (step 6)
   - matches the encounter's character → correct (step 7)
6. **Wrong real-name guess:**
   - in-memory cooldown check (§8). Within 10s of this user's last wrong guess
     for this encounter → `Give it a moment. Try again in ${n}s.`
   - otherwise set `guessCooldown[`${encounterId}:${userId}`] = Date.now()` and
     reply with an alternating line from `WRONG_GUESS_LINES`.
   - after `res.send`: append to the guesses log (fire-and-forget).
7. **Correct guess — atomic claim:**
   ```js
   const { data } = await supabase
     .from('public_encounters')
     .update({ resolved_at: new Date().toISOString(), outcome: 'solved', solved_by: userId })
     .eq('id', encounter.id)
     .is('resolved_at', null)
     .select();
   ```
   - `data.length === 0` → race lost → `Someone else reached them first.`
   - `data.length === 1` → this user won:
     - `res.send` ephemeral: `` That was **{Full Name}**. `` + the chosen
       milestone's `afterline` + a "your next `/roam` lands better" line (§16.1).
     - after send (async block):
       ```js
       // A win does NOT change affinity — see §16. Tier for the winner line and
       // for milestone gating comes from the current stored affinity.
       const rel   = await getRelationship(userId, characterId);
       const level = getRelationshipLevel(rel?.affinity ?? 0);
       const tier  = getDialogueTier(level.name);
       const winnerBucket  = WINNER_LINE_TIER[tier] || 'new';
       const milestoneType = pickMilestone(tier, winnerBucket);          // §16.2

       grantEncounterBoost(userId, characterId).catch(() => {});          // §16.1
       recordEncounterMilestone({                                        // §16.2, fire-and-forget
         userId, characterId, milestoneType,
         guildId: req.body.guild_id, sourceEncounterId: encounter.id,
       }).catch(() => {});
       incrementTimesMet(userId, characterId).catch(() => {});

       const line = pickWinnerLine(tier, {
         user: `<@${userId}>`,
         name: getFullName(character),
         house: character.house || 'Darkwick',
       });
       // Add a reveal embed; leave the spawn silhouette in place. No file is
       // composed or uploaded — the thumbnail is the /assets URL for the
       // character art. Omit `attachments` so the silhouette isn't dropped.
       // The mention goes in `content` (mentions inside an embed don't ping).
       await editChannelMessage(guild.encounter_channel_id, encounter.message_id, {
         content: `<@${userId}>`,
         embeds: [{
           description: line,
           color: level.color,
           thumbnail: { url: getCharacterImageUrl(character, encounter.variant) },
           footer: { text: character.house || 'Darkwick' },
         }],
       });
       // analytics, fire-and-forget:
       trackUserActivity(userId); trackCommandUsage(userId, 'call'); trackCharacterEngagement(userId, characterId);
       ```
     - clear the in-process finalize timer for this encounter (if armed).
     - if `getRelationship` throws, use `tier = 'new'` (milestone still recorded
       at `new`) and still edit the post.

### 7.1 Name matching (`matchCharacterGuess`)

```js
norm = input.trim().toLowerCase().replace(/\s+/g, ' ');
```

Candidate strings per character:

- full name — `getFullName(c)` (`${firstName} ${lastName}`)
- `firstName` (all 26 first names are unique — first name alone is accepted)
- `lastName` and the last word of `lastName` (covers "Romeo Scorpius Lucci" → "lucci")
- the character's own `aliases` array (already a per-character field consumed by
  `getCharacterById`; today only `shohei: ['sho']`). Extend it in
  `constants/characters.js` with `lucas: ['luca']` and `edward: ['ed']` — those
  two only.

Rules:

- `norm` equals a candidate for **exactly one** character → that character.
- resolves to the encounter's character → **correct**.
- resolves to a different valid character → **wrong** (cooldown applies).
- resolves to nothing → **unknown** (no cooldown, no penalty).
- Typos do not fuzzy-match; they resolve to nothing (unknown).

---

## 8. Wrong-guess cooldown — in-memory, no DB round trip

A per-user, per-encounter 30-second cooldown after a **wrong real-name** guess
(unknown/gibberish and correct guesses do not start it).

```js
// module scope in publicEncounters.js
const guessCooldown = new Map();          // `${encounterId}:${userId}` -> epoch ms
const GUESS_COOLDOWN_MS = 30_000;
```

- Single app instance → the Map is authoritative; no Supabase read/write needed
  on the guess path.
- `encounterId` is unique across guilds, so keys never collide between servers.
- Reset-on-deploy is harmless: worst case a user gets one extra retry during the
  rare moment a deploy lands mid-encounter.
- Entries are tiny and short-lived (encounters last `window_minutes`). Cleared in
  `finalizeEncounter()` and on the scheduler tick.
- With a 10s cooldown inside a 2-minute window, a user gets ~3 attempts.

The append-only `public_encounter_guesses` log is still written (after
`res.send`, fire-and-forget) for analytics only. It has **no** unique constraint
on `(encounter_id, discord_user_id)` — the cooldown, not the schema, limits
retries.

---

## 9. Flavor text

All four flavor pools are authored in `constants/dialogue/_shared.js` alongside
every other line in the game; `constants/publicEncounters.js` holds only the
pickers and re-exports the pools under their old names.

### 9.1 Missed opportunity (`SHARED_MISSED_LINES`)

PATCH `{ content: pickMissedLine(new Date()), attachments: [] }` — the
silhouette is **removed**; any components removed too. Identity is never
revealed. (Contrast the win edit, §7.3, which omits `attachments` and leaves the
silhouette in place.)

Time-keyed like the teasers, and for the same reason — a figure lost to the
crowd at noon, lost to the dark after the lamps come on:

```js
export const SHARED_MISSED_LINES = {
  any: ["The moment's passed.", "Whoever it was, they didn't wait.", /* ... */],
  day: ['The crowd closes up. Whoever it was is somewhere in it now.', /* ... */],
  evening: ['The shape dissolves back into the dark.', /* ... */],
};
```

### 9.2 Wrong guess (`SHARED_WRONG_GUESS_LINES`)

A flat pool — a wrong name reads the same at any hour.

```js
export const SHARED_WRONG_GUESS_LINES = [
  'Not them. They slip further away.',
  'No — the figure stays put.',
  'Wrong name. The moment tightens.',
  // ...
];
```

### 9.3 Winner lines — per character, relationship-tiered

Every line names `{user}` and the character. Placeholders: `{user}` (mention —
renders as the caller's server name), `{name}` (revealed full name),
`{firstName}`, `{house}` (`character.house`, or `Darkwick` for Benkei). The
reveal embed's winner line is the **only** place either of them is named —
`content` is cleared and the milestone afterline (§16.2) names neither — so
`validateContent()` fails the build on a line missing `{user}` or the name.

Tier comes from the winner's stored affinity with that character (global, not
per-guild): `getRelationshipLevel(affinity).name` → `getDialogueTier(...)`.
`WINNER_LINE_TIER` maps each of the six dialogue tiers to its own register.
`new` is Stranger's first introduction; `known` (Acquaintance) has met the
character before and must never read as a first meeting.

Lines are **per character**, authored beside that character's other content in
`constants/dialogue/<id>.js` and keyed by register:

```js
// constants/dialogue/taiga.js
winnerLines: {
  new: ['"Huh." **{name}** looks {user} over. "You got guts, kitten. Stupid ones, but guts."', /* ... */],
  warm: ['"Took your damn time." **{name}** had very obviously been waiting on {user}.', /* ... */],
  spark: [/* ... */], close: [/* ... */], bound: [/* ... */],
}
```

A character's own pool **replaces** the shared one for that register rather than
merging with it, so an authored reveal always sounds like them instead of like
house-mission boilerplate:

```js
export function winnerLinePool(bucket, characterId) {
  const authored = DIALOGUE[characterId]?.winnerLines?.[bucket];
  if (Array.isArray(authored) && authored.length > 0) return authored;
  return [...WINNER_LINES.any, ...(WINNER_LINES[bucket] || WINNER_LINES.new)];
}
```

`SHARED_WINNER_LINES` (`constants/dialogue/_shared.js`, re-exported as
`WINNER_LINES`) is therefore a **fallback**, not a mixer: it fronts a character
with no lines at the register in play, which is what keeps an unauthored roster
addition revealing correctly. Its `any` sub-pool is house/mission themed and
valid at every register, so it merges into each bucket. All 26 characters are
authored at all five registers today, so it is currently unreachable in
practice; `validateContent()` warns the moment that stops being true.

**Two invariants every line has to hold.**

*It has to end with the character staying with the caller.* A milestone
afterline (§16.2) is always appended beneath it. Walking off their own duty
toward the caller is fine and common ("**{name}** leaves the busted fixture
exactly where it is"); walking away from the caller contradicts the beat that
follows. Milestones are character-agnostic and gated only by tier, so don't
write a line that forecloses one — in particular, don't have the character
dispose of a **report**, which `signed_report` then has them signing.

*It can't name a place.* An encounter spawns only at the two general
`ENCOUNTER_LOCATIONS`, so the composited background is any of Darkwick's
corridors, courtyards, streets, classrooms and cafeteria, or the Galaxy Express
platform — and the line doesn't know which. It also can't put the character at
their own house's venue, which is never where an encounter is: no lab for Yuri,
no anomaly garden for Rui, no card table for Taiga, no couch for Ren. Write the
crowd and the openness instead ("in full view of everyone", "through the crowd",
"in the middle of campus"), and keep their work portable — what they set down or
walk away from can travel, the room it belongs in cannot.

---

## 10. Data model

New migration `db/migrations/010_create_public_encounters.sql` (`009_` is already
taken by `009_prune_command_usage_log.sql`). Follow the migration 008 style:
`IF NOT EXISTS`, `TIMESTAMP WITH TIME ZONE`, enable RLS with a "block direct
access" `SELECT` policy (service role bypasses).

```sql
-- Per-guild feature config. One row per guild that has ever configured the
-- feature. The scheduler iterates rows WHERE enabled = true.
CREATE TABLE IF NOT EXISTS guild_settings (
  guild_id             TEXT PRIMARY KEY,
  encounter_channel_id TEXT,
  enabled              BOOLEAN NOT NULL DEFAULT FALSE,
  cadence_min_minutes  INT,                         -- NULL = global default (45)
  cadence_max_minutes  INT,                         -- NULL = global default (180)
  window_minutes       INT,                         -- NULL = global default (2)
  next_encounter_at    TIMESTAMP WITH TIME ZONE,    -- this guild's cadence anchor
  post_failures        INT NOT NULL DEFAULT 0,      -- consecutive POST failures; 3 -> auto-disable
  configured_by        TEXT,
  created_at           TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at           TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- One row per public encounter, scoped to a guild. At most one row per guild
-- should be unresolved (resolved_at IS NULL) at any time.
CREATE TABLE IF NOT EXISTS public_encounters (
  id           BIGSERIAL PRIMARY KEY,
  guild_id     TEXT NOT NULL,
  channel_id   TEXT NOT NULL,
  message_id   TEXT,                        -- set after the POST succeeds
  character_id TEXT NOT NULL,
  variant      TEXT NOT NULL,               -- 'uniform' | 'casual'
  background   TEXT NOT NULL,               -- bg filename
  teaser       TEXT NOT NULL,
  created_at   TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  expires_at   TIMESTAMP WITH TIME ZONE NOT NULL,
  resolved_at  TIMESTAMP WITH TIME ZONE,    -- set on solve OR expiry-finalize
  outcome      TEXT,                        -- 'solved' | 'expired'
  solved_by    TEXT                         -- discord_user_id of the winner
);
CREATE INDEX IF NOT EXISTS idx_public_encounters_active
  ON public_encounters (guild_id, resolved_at, expires_at);

-- Append-only guess log. Analytics only; NO unique constraint on
-- (encounter_id, discord_user_id) — retries are limited by the in-memory
-- 10s cooldown, not the schema.
CREATE TABLE IF NOT EXISTS public_encounter_guesses (
  id              BIGSERIAL PRIMARY KEY,
  encounter_id    BIGINT NOT NULL REFERENCES public_encounters(id) ON DELETE CASCADE,
  discord_user_id TEXT NOT NULL,
  guess           TEXT NOT NULL,
  is_correct      BOOLEAN NOT NULL,
  guessed_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

ALTER TABLE guild_settings           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public_encounters        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public_encounter_guesses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Block direct access" ON guild_settings           FOR SELECT USING (FALSE);
CREATE POLICY "Block direct access" ON public_encounters        FOR SELECT USING (FALSE);
CREATE POLICY "Block direct access" ON public_encounter_guesses FOR SELECT USING (FALSE);
```

No `system_state` table — per-guild cadence state lives in `guild_settings`.

### New functions in `db/supabase.js`

| Function | Purpose |
|---|---|
| `getEnabledGuilds()` | `SELECT * FROM guild_settings WHERE enabled = true` — the scheduler's per-tick list |
| `getGuildSettings(guildId)` | one row, for the `/call` and `/encounters` handlers |
| `upsertGuildChannel(guildId, channelId, userId, nextAt)` | `/encounters channel` — set channel, `enabled=true`, `next_encounter_at`, reset `post_failures` |
| `setGuildEnabled(guildId, enabled)` | `/encounters disable` |
| `setGuildNextEncounter(guildId, at)` | called after a successful spawn |
| `bumpGuildPostFailure(guildId)` | increment `post_failures`; auto-disable at 3 |
| `createPublicEncounter({ guildId, channelId, characterId, variant, background, teaser, expiresAt })` | INSERT, returns the row (with `id`) |
| `setPublicEncounterMessageId(id, messageId)` | UPDATE after the POST succeeds |
| `getActivePublicEncounter(guildId)` | `SELECT ... WHERE guild_id=? AND resolved_at IS NULL AND expires_at > now() ORDER BY created_at DESC LIMIT 1` |
| `claimPublicEncounter(id, userId)` | Atomic `UPDATE ... SET resolved_at, outcome='solved', solved_by WHERE id AND resolved_at IS NULL` `.select()`; caller checks row count |
| `finalizeExpiredEncounters(guildId?)` | Atomic `UPDATE ... SET resolved_at=now(), outcome='expired' WHERE resolved_at IS NULL AND expires_at < now() [AND guild_id=?]` `.select()`; returns finalized rows so the sweep can edit their messages |
| `recordEncounterGuess({ encounterId, userId, guess, isCorrect })` | INSERT into the log; fire-and-forget |

The winner race is decided entirely by `claimPublicEncounter` — a single atomic
`UPDATE` statement in Postgres. No explicit locking.

### Reward-model storage

Migration 010 also adds `relationships.pending_encounter_boost`, the
`encounter_milestones` tally table and its atomic writer
`record_encounter_milestone()`, plus `grantEncounterBoost` /
`consumeAllEncounterBoosts` / `recordEncounterMilestone` /
`getEncounterMilestoneCounts` / `getLatestEncounterMilestone` in
`db/supabase.js`. Full definitions and the `/roam` / `/affinity` wiring are in
**§16**.

---

## 11. Discord REST — helpers

`utils.js` `DiscordRequest` is JSON-only. This feature needs:

```js
// POST /channels/{channelId}/messages — multipart: the silhouette PNG rides
// along as files[0]. Modeled on sendFollowup in app.js.
postChannelMessage(channelId, { content, files, allowed_mentions })

// PATCH /channels/{channelId}/messages/{messageId} — plain JSON, never a file:
//   win  → { content: '<@id>', embeds: [reveal] }   (omit attachments → silhouette stays)
//   miss → { content: missedLine, attachments: [] } (drop the silhouette, no embed)
editChannelMessage(channelId, messageId, { content, components, attachments, embeds })
```

Only the POST needs multipart / `FormData` + `payload_json` (like `sendFollowup`);
the edit is a plain JSON `PATCH`. Both use `Authorization: Bot ${DISCORD_TOKEN}`.

**Bot permissions in each guild's encounter channel:** View Channel, Send
Messages, Attach Files (the silhouette POST), **Embed Links** (the win edit's
reveal embed — §5.1). Permission integer `52224`. Missing permissions surface
via §3 "Post failure" handling.

---

## 12. Configuration (`.env` / `.env.sample`)

Per-guild settings are configured in Discord via `/encounters` (§4). The env vars
are **global defaults** only, used when a guild leaves a column NULL:

| Var | Default | Purpose |
|---|---|---|
| `ENCOUNTER_MIN_MINUTES` | `45` | Default lower bound of the gap between a guild's encounters |
| `ENCOUNTER_MAX_MINUTES` | `180` | Default upper bound of the gap between a guild's encounters |
| `ENCOUNTER_WINDOW_MINUTES` | `2` | Default `/call` window before the moment passes |
| `ENCOUNTER_BOOST_GAIN` | `1` | Extra affinity per pending boost, all redeemed together on the winner's next authored (`/roam` / `/meet`) response — see §16 |
| `ENCOUNTER_BOOST_CAP` | `1` (was `2`, lowered 2026-09 — see §16.1) | Max unspent boosts a user can hold per character (so the combined redemption tops out at +1) |
| `ENCOUNTER_TICK_SECONDS` | `25` | Scheduler tick interval |

`DISCORD_TOKEN`, `APP_ID`, `SUPABASE_*` are already present. **`BASE_URL`**
(already in `.env.sample`, used by `getCharacterImageUrl` /
`getBackgroundImageUrl`) must be set to the app's public HTTPS origin — the win
reveal embed's thumbnail is a `${BASE_URL}/assets/chars/...` URL Discord fetches
(§5.1). No `ENCOUNTER_CHANNEL_ID` — removed in favor of `guild_settings`. No
`ENCOUNTER_AFFINITY_GAIN` — a win grants no direct affinity (§16). Encounters
post silently (no role ping) in this version.

---

## 13. Edge cases

| Case | Handling |
|---|---|
| Two guilds spawn in the same tick | Handled independently in the per-guild loop; separate rows, separate channels |
| Overlapping encounters in one guild | Per-guild single-active guard (`getActivePublicEncounter(guildId)`); at most one unresolved row per guild |
| Process restarts mid-window | Next tick finds `expires_at < now AND resolved_at IS NULL` for each guild and finalizes; ≤ one tick late |
| Guild channel POST fails (perms / deleted / 5xx) | Row marked `outcome='expired'`; `post_failures++`; 3 consecutive → `enabled=false`; log |
| Two correct `/call`s in the same tick | `claimPublicEncounter` returns 1 row to exactly one; the other gets "someone reached them first" |
| Bot can't edit its own message | Winner ack + affinity already succeeded; log and move on |
| Character has no `casual` art | Always rendered in `uniform` (documented) |
| `/call` in a server with no config | "Encounters aren't set up in this server." |
| `/call` in a DM / user-install context | "This only works in a server." |
| `/call` in the wrong channel of a configured guild | "You can only call out from <#channel>." |
| `/call` for the right name after solve/expiry | "no one to call out to right now" / "someone reached them first" |
| `/call` with a typo or nonsense | "I don't know who that is." — no cooldown, no penalty |
| Winner never "met" this character before | `grantEncounterBoost` → `getOrCreateRelationship` creates the row (affinity 0, boost 1); milestone recorded at tier `new`; intended |
| Same user wins in two different guilds | Two separate encounters → boost caps at `ENCOUNTER_BOOST_CAP` (`1`); the second win still records its own milestone but adds no more boost; the winner's next `/roam` / `/meet` redeems the capped +1; intended |
| Win, then never runs `/roam` / `/meet` | Boosts sit unspent (no v1 expiry); the milestone tally still grows; no affinity is ever granted |
| Multiple app instances | Out of scope — would double-fire the tick for every guild; needs a Postgres advisory lock around the tick |
| `_PM` backgrounds / timezone | Judged against the fixed `America/Chicago` evening cutoff (`EVENING_HOUR` / `EVENING_TIMEZONE` in `constants/backgrounds.js`), same as `/roam` |
| Attachment size | Composited PNGs are already within Discord limits (same pipeline as `/roam`) |

---

## 14. Files added / changed

**New**

- `constants/publicEncounters.js` — `pickTeaser`, `pickMissedLine`,
  `winnerLinePool` / `pickWinnerLine`, `matchCharacterGuess`, `guessCooldown`
  Map + helpers, generation helper, `ENCOUNTER_MILESTONES` + `pickMilestone`
  (§16.2). Holds the pickers and the tuning constants; no prose of its own, and
  re-exports the pools below under their old names
- `constants/dialogue/_shared.js` — the roster-wide prose:
  `SHARED_ENCOUNTER_TEASERS`, `SHARED_MISSED_LINES`,
  `SHARED_WRONG_GUESS_LINES`, `SHARED_WINNER_LINES`
- `constants/dialogue/<id>.js` — each character's own `winnerLines` (§9.3)
- `publicEncounters.js` — `buildEncounterPost(guild)`, `finalizeEncounter(row)`
  (miss edit: text + `attachments: []`), `handleCall(interaction)` (win edit:
  reveal embed via `getCharacterImageUrl`) — mirrors the shape of `encounters.js`
- `encounterScheduler.js` — the per-guild tick loop
- `db/migrations/010_create_public_encounters.sql` — encounter tables **plus**
  `encounter_milestones` and `relationships.pending_encounter_boost` (§16.4)

**Changed**

- `imageComposition.js` — extract internal `drawEncounterBase` helper; add
  `composeSilhouetteEncounter`; `composeEncounter` signature and output unchanged
- `constants/characters.js` — add `aliases: ['luca']` to lucas, `aliases: ['ed']`
  to edward (§7.1)
- `commands.js` — register `CALL_COMMAND` and `ENCOUNTERS_COMMAND`
- `app.js` — route `name === 'call'` and `name === 'encounters'`; start the
  scheduler after `app.listen`
- `db/supabase.js` — the functions in §10 + the reward-model functions (§16.4)
- `encounters.js` — consume the boost in the `/roam` / `/meet` response path;
  "Moments together" block in `buildAffinityMessage` (§16.3)
- `utils.js` (or new `discordRest.js`) — `postChannelMessage` (multipart) /
  `editChannelMessage` (plain JSON: `content` / `embeds` / `attachments`)
- `.env.sample`, `README.md`, `db/SCHEMA.md` — document the feature and config

---

## 15. Decisions locked in

1. **Per-guild, independent.** Each of the (< 5) guilds has its own
   `guild_settings` row, its own `next_encounter_at`, its own in-flight
   encounter, and its own configured channel. No collective schedule.
2. **Affinity is global, user-keyed — and a `/call` win never moves it
   directly.** A win grants a *pending boost* (spent on the winner's next
   `/roam` / `/meet` with that character) and records a *milestone*; see §16.
   The winner-line tier is derived from the user's current global affinity.
   Only the encounter and channel are guild-scoped.
3. Configuration is per-guild via `/encounters channel|disable|status`
   (Manage Guild only). The `ENCOUNTER_CHANNEL_ID` env var is removed; env vars
   are global defaults only.
4. Scheduler is a single ~25s tick loop over `guild_settings WHERE enabled` — no
   per-guild `setTimeout`; all timing state in Postgres; restart-safe.
5. Wrong real-name guess → 10s cooldown before the next attempt, tracked in an
   in-memory Map (no DB round trip). Unknown/gibberish → no cooldown, no penalty.
6. **No second image is ever composed.** The resolution edit is a plain JSON
   `PATCH`. A **win** keeps the spawn silhouette and adds a reveal **embed**
   (tiered winner line + a `/assets` thumbnail of the real character art +
   tier color + house footer); `attachments` is omitted so the silhouette
   stays. A **miss** drops the image (`{ content, attachments: [] }`), no embed.
   On a miss the name is never spoken (`MISSED_LINES`); on a win it appears in
   the embed. The win edit needs **Embed Links** — permission `52224` (§5.1,
   §11).
7. Winner reward is a **pending boost + a milestone**, not direct affinity
   (§16). The boost adds `ENCOUNTER_BOOST_GAIN` (=1) to the winner's next
   authored response with that character and is capped at `ENCOUNTER_BOOST_CAP`
   (=1, lowered from 2 in 2026-09). The reveal embed's `description` is an
   alternating, relationship-tiered winner line naming the guessing Discord
   user (mention in `content` so it pings), the revealed character, and the
   character's house.
8. `/call` is accepted **only** in the calling guild's own configured encounter
   channel.
9. Response window is **2 minutes** (per-guild overridable); scheduler tick is
   ~25 seconds.
10. Every win also logs a **milestone** — a themed "what happened after" moment
    (`ENCOUNTER_MILESTONES`), gated by the winner's real relationship tier at
    win time and surfaced as a "Moments together" tally in `/affinity` (§16.2–3).

---

## 16. Reward model: encounter boost + milestone log

A `/call` win does **not** change affinity directly. Affinity only ever moves
through `/roam` and `/meet` — the authored-dialogue loop, throttled by the shared
3-hour cooldown (`commandLimits.js:13`). A win instead does two things:

1. **Boost** — grants a pending bonus that is spent on the winner's *next*
   `/roam` / `/meet` with that character.
2. **Milestone** — records a themed "what happened after your encounter" moment,
   shown as a running tally in `/affinity <character>`.

**Why.** Public encounters can otherwise become a second, faster affinity stream
that races users past tiers before they have seen each tier's authored dialogue.
Under this model a win only *amplifies one already-throttled authored
interaction*, capped at `ENCOUNTER_BOOST_CAP`, and only if the user actually
engages that dialogue, so the public game feeds the main loop instead of
bypassing it. The milestone log gives `/call` its own visible, collectible
progression that never touches the relationship curve.

### 16.1 Boost

- New column: `relationships.pending_encounter_boost INT NOT NULL DEFAULT 0`.
- **On a win:**
  `pending_encounter_boost = LEAST(pending_encounter_boost + 1, ENCOUNTER_BOOST_CAP)`
  (`ENCOUNTER_BOOST_CAP = 1`; lowered from `2` in 2026-09 — see the
  encounter-farming-threat-model memory). A win while a boost is already
  pending still records its own milestone; it does not add more boost.
- **On the next `/roam` / `/meet` with that character**, when a response is
  *completed* (the same point `recordResponse` runs today, `encounters.js:371`)
  and `pending_encounter_boost > 0`: add `pending_encounter_boost ×
  ENCOUNTER_BOOST_GAIN` (=1) to that response's gain, then zero the boost.
  A `NEUTRAL` response (gain 0) **still consumes** the boost — the warmer
  welcome is the reunion, not the pick.
- No expiry in v1. (If wanted later: a `boost_updated_at` column and a 7-day
  cutoff in `consumeAllEncounterBoosts`.)
- Tracked per character; boosts on different characters are independent.

**`/call` win reply (ephemeral)** — replaces the bare "+1." in §2 / §7.3:

```
That was **{Full Name}**.
{milestone.afterline}
Next time you `/roam` into {firstName}, you'll pick up right there — it lands better.
```

**Boosted `/roam` / `/meet` response** — the bonus is folded into the delta with
its own clause:

```
{reaction}
+{gain} — {level.emoji} **{level.name}**  ·  *picking up after {milestone.hint}, a warmer welcome (+{boostsSpent})*
```

`{boostsSpent}` is always `1` at the current cap, so the bonus shown is always
`+1`.

### 16.2 Milestones

New pool + picker in `constants/publicEncounters.js`:

```js
// new < known < warm < spark < close < bound
const TIER_RANK = { new: 0, known: 1, warm: 2, spark: 3, close: 4, bound: 5 };

export const ENCOUNTER_MILESTONES = {
  signed_report: {
    minTier: 'new', emoji: '📋', bucket: 'any',
    label: 'Caught them to sign a {house} report before they vanished',
    afterline: 'They signed your {house} report on the way past.',
    hint: 'that report hand-off',
  },
  coffee_break: {
    minTier: 'new', emoji: '☕', bucket: 'new',
    label: 'Coffee breaks together',
    afterline: 'You both slipped off for a quick coffee after.',
    hint: 'that coffee',
  },
  walked_back: {
    minTier: 'warm', emoji: '🌙', bucket: 'warm',
    label: 'Walked back to the dorms together',
    afterline: 'You walked back toward the dorms, in no hurry.',
    hint: 'that walk back',
  },
  shared_umbrella: {
    minTier: 'warm', emoji: '🌧️', bucket: 'warm',
    label: 'Shared an umbrella across the courtyard',
    afterline: 'It started raining. One umbrella between you.',
    hint: 'the umbrella',
  },
  movie_hooky: {
    minTier: 'spark', emoji: '🎬', bucket: 'spark',
    label: "Skipped a briefing to watch a movie in {name}'s room",
    afterline: "Neither of you made the next briefing — there was a movie on in {name}'s room.",
    hint: 'that movie',
  },
  rooftop_lunch: {
    minTier: 'spark', emoji: '🌇', bucket: 'spark',
    label: 'Ate lunch on the roof, away from everyone',
    afterline: 'Lunch on the roof. Nobody knew where either of you were.',
    hint: 'the roof',
  },
  stayed_up: {
    minTier: 'close', emoji: '🌌', bucket: 'close',
    label: 'Stayed up talking past curfew',
    afterline: 'You lost track of the hour completely.',
    hint: 'that late night',
  },
  // add freely — every entry needs { minTier, emoji, bucket, label, afterline, hint }
};

// tier: the winner's REAL dialogue tier (getDialogueTier), NOT the collapsed
// WINNER_LINE_TIER bucket. winnerBucket: the bucket the public line used, for a
// gentle thematic bias only.
export function pickMilestone(tier, winnerBucket) {
  const eligible = Object.entries(ENCOUNTER_MILESTONES)
    .filter(([, m]) => TIER_RANK[m.minTier] <= TIER_RANK[tier]);
  const weighted = eligible.flatMap(([id, m]) =>
    m.bucket === winnerBucket || m.bucket === 'any' ? [id, id] : [id]);
  return weighted[Math.floor(Math.random() * weighted.length)];
}
```

- Tier is evaluated **before** the win takes effect and is independent of any
  `/roam` in flight, so a `spark` milestone can never be recorded for a caller
  who is still a Friend.
- `{house}` / `{name}` / `{firstName}` are filled exactly as in `WINNER_LINES`.
- `bucket` only nudges selection; every tier-eligible milestone stays reachable.

### 16.3 `/affinity` output

`buildAffinityMessage` (`encounters.js:403`) gains a **Moments together** block
on each character's embed — milestone rows with count > 0, highest count first,
templates filled. Omitted entirely when the user has no milestones with that
character.

```
Rui Mizuki — Close Friend 💖

Moments together
📋 Signed off a Vagastrom report right before they vanished ×3
☕ Coffee breaks together ×4
🎬 Skipped a briefing to watch a movie in Rui's room ×2
🌧️ Shared an umbrella across the courtyard ×1
```

One `getEncounterMilestoneCounts(userId, characterId)` read per character
(`SELECT milestone_type, total ...` — the table is already a per-kind tally, so
no `GROUP BY`).

### 16.4 Data model (migration 010 additions)

```sql
ALTER TABLE relationships
  ADD COLUMN IF NOT EXISTS pending_encounter_boost INT NOT NULL DEFAULT 0;

-- Per-kind tally: one row per (user, character, milestone_type), its `total`
-- bumped on each win of that kind. Not one row per win — there is no per-win
-- timeline, only first_at / last_at per kind. Bounded, so never pruned.
CREATE TABLE IF NOT EXISTS encounter_milestones (
  discord_user_id TEXT NOT NULL,
  character_id    TEXT NOT NULL,
  milestone_type  TEXT NOT NULL,            -- key of ENCOUNTER_MILESTONES
  total           INT  NOT NULL DEFAULT 0,
  first_at        TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  last_at         TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  PRIMARY KEY (discord_user_id, character_id, milestone_type)
);

ALTER TABLE encounter_milestones ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Block direct access" ON encounter_milestones FOR SELECT USING (FALSE);

-- Atomic tally bump, same reasoning as record_encounter_win (migration 011).
CREATE OR REPLACE FUNCTION public.record_encounter_milestone(
  p_user_id TEXT, p_character_id TEXT, p_milestone_type TEXT
) RETURNS INT LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
DECLARE new_total INT;
BEGIN
  INSERT INTO public.encounter_milestones
    (discord_user_id, character_id, milestone_type, total, first_at, last_at)
  VALUES (p_user_id, p_character_id, p_milestone_type, 1, now(), now())
  ON CONFLICT (discord_user_id, character_id, milestone_type) DO UPDATE
    SET total = public.encounter_milestones.total + 1, last_at = now()
  RETURNING total INTO new_total;
  RETURN new_total;
END; $$;
```

An earlier revision created `encounter_milestones` append-only (`id BIGSERIAL`,
one row per win, `guild_id` / `source_encounter_id` / `created_at`); re-running
migration 010 folds those rows into the tally by `(user, character,
milestone_type)` and drops the old table.

New `db/supabase.js` functions:

| Function | Purpose |
|---|---|
| `grantEncounterBoost(userId, characterId, cap)` | RPC to `grant_encounter_boost()` (migration 014) — one upsert doing `pending_encounter_boost = LEAST(current + 1, cap)`, creating the row for a never-met winner; returns the new count |
| `consumeAllEncounterBoosts(userId, characterId)` | RPC to `consume_encounter_boosts()` (migration 014) — `SELECT ... FOR UPDATE` then zero, under one row lock; returns how many were spent (0 if none, or if there is no row) |
| `recordEncounterMilestone({ userId, characterId, milestoneType })` | RPC to `record_encounter_milestone()` — atomic `total = total + 1`; fire-and-forget |
| `getEncounterMilestoneCounts(userId, characterId)` | `{ milestone_type: total }` map for the `/affinity` block |
| `getLatestEncounterMilestone(userId, characterId)` | the kind with the newest `last_at` — names the moment a boosted `/roam` picks up from |

### 16.5 Wiring summary

- **`/call` win async block (§7.3):** `grantEncounterBoost` +
  `recordEncounterMilestone` replace the old `updateAffinity(..., 1)`.
  `incrementTimesMet` still fires. Winner-line tier = current stored affinity
  (unchanged by the win).
- **`/roam` / `/meet` response path (`encounters.js` ~line 370):** after
  `recordResponse`, call `consumeAllEncounterBoosts`; if it consumed any, add
  `count × ENCOUNTER_BOOST_GAIN` to the persisted gain and append the bonus
  clause (reporting the summed `+count`) to the reply.
- **`/affinity` (`encounters.js:403`):** add the "Moments together" block from
  `getEncounterMilestoneCounts`.

### 16.6 Config

| Var | Default | Purpose |
|---|---|---|
| `ENCOUNTER_BOOST_GAIN` | `1` | Extra affinity per pending boost, all spent together on the winner's next authored response with that character |
| `ENCOUNTER_BOOST_CAP` | `1` (was `2`, lowered 2026-09 — see §16.1) | Max unspent boosts per user per character |

`ENCOUNTER_AFFINITY_GAIN` is removed — a win grants no direct affinity.

### 16.7 Open questions

- **Boost expiry** — v1 has none. Add a 7-day cutoff if unspent boosts feel
  like they trivialize a later return.
- **Does `/meet` consume the boost, or only `/roam`?** Current call: whichever
  authored interaction with that character happens first.
- **Bonus response button vs. flat +1** — flat +1 for v1 (cheap, predictable).
  A themed 5th response option ("Bring up the movie", worth +2/+3) is the richer
  follow-up if the boost should feel like content, not a number.
- **Milestone dedup** — v1 lets a `milestone_type`'s `total` climb without
  bound. If some milestones should be one-time ("first walk home"), add a
  `unique` flag and have `record_encounter_milestone()` cap `total` at 1 (or
  `DO NOTHING`) for those keys.

---

## 17. Call scenes (built 2026-10-06)

A rare variant of the win reveal. On a scene hit the channel gets a public,
interactive moment instead of the usual reveal embed: the character's
expression portrait, a line, and response buttons only the winner can press.
Everything here is public. There is no private step.

A scene replaces the win's reward. It grants no boost and picks no milestone.
The winner's one click is the reward instead: +1 affinity for the character's
favorite or liked response, nothing for the least-liked one (revised
2026-10-06; this was flavor only at first).

### 17.1 Trigger

- After a correct `/call`, roll `CALL_SCENE_CHANCE = 0.1` (one global
  constant in `constants/publicEncounters.js`).
- On a hit, `pickCallScene` draws one winner line with `pickRandom` from
  `winnerLinePool`, the same pool and the same draw as the normal reveal
  (daytime swap included). Every character winner line carries button labels
  (§17.7), so the scene rate is 10% at every tier, whatever the pool's size.
- It falls back to the normal reveal when the drawn line has no labels (only
  the shared fallback pool, for a character with no authored line at that
  register) or when a face the map (§17.4.1) can produce for that tier is
  missing from `assets/expressions/<id>/` (plus the `_girl` files for Jo's
  casual variant, and `blush_2.png` where it's an alternate).
- All 26 encounter characters have the full face set as of 2026-10-06, so
  the art check only guards characters added later.

### 17.2 What the channel sees

1. **The silhouette post** is edited exactly as it is today to clear the
   text above the attachment (`content: null`), but **no reveal embed is
   added**. The silhouette image stays as it is.
2. **A new public message** (the scene) is posted in the encounter
   channel as a reply to the silhouette post (`message_reference`). It is a
   Components V2 message laid out like the Chancellor's audience
   (`chancellorMessage` in `missions/shared.js`), chosen over an embed for
   its larger thumbnail:
   - one Container with `accent_color: level.color`, holding a Section:
     `line` as a Text Display, and the opening face (`default.png`, see
     §17.4.1) as the Thumbnail accessory (`media.url` =
     `${BASE_URL}/assets/expressions/<id>/<face>`, already served by the
     `/assets` static route, so no attachment is uploaded). As in
     `chancellorMessage`, a non-absolute URL (`BASE_URL` unset) falls back
     to a bare Text Display and keeps the text.
   - one Action Row of four buttons: kind, playful and bold in a fresh
     random order on every post, all in one style, then date last
   The portrait shows who it was, so the post reads as solved without a
   "That was X" line.

The ephemeral `/call` ack to the winner keeps `That was **X**.` but swaps the
boost line for `They're waiting on your answer.` A scene win promises no
boost, and the closeout's fallback boost (§17.6) is never mentioned anywhere.

**Layout trial (2026-10-07).** A second layout, `gallery`, is being compared
against the thumbnail layout above. It reads like a `/roam` or `/meet`: the
line as a Text Display over a Media Gallery, inside the same accent-colored
Container, then the button row. The gallery image is the expression file
itself, the same URL the thumbnail uses, so a click swaps faces by URL. The
click and the closeout read the layout back off the post and keep it. Live
scenes still post as `thumbnail`; only `/encdev spawn scene:gallery` posts a
gallery scene (`scene:thumbnail` forces the current one).

### 17.3 Buttons

| Slot | Label | Custom ID | State |
|---|---|---|---|
| answer | `responses.kind` (authored) | `scene:<encounterId>:kind` | enabled |
| answer | `responses.playful` (authored) | `scene:<encounterId>:playful` | enabled |
| answer | `responses.bold` (authored) | `scene:<encounterId>:bold` | enabled |
| date | `Ask on a date` (fixed constant) | `scene:<encounterId>:date` | **always disabled** |

The three answers are shuffled on every post and share one style
(`CALL_SCENE_BUTTON_STYLE`, primary), so the winner can't tell which type is
which and the gain is a blind pick. The date button stays last, in the neutral
grey.

The date button replaces `neutral` and is not authored per scene. Its lock
is the button's `emoji` field, not part of the label:

- winner below Close Friend (affinity < 150): `🔒` + `Ask on a date`, disabled
- Close Friend and above (Close Friend, Confidant, Devoted, Soulbound): no
  emoji, still disabled. It reads as "unlocked, coming soon".

It isn't wired to anything yet, and it's shown at every tier, Stranger
included, for every character. A skip list (e.g. Benkei) is a decision for
when the date feature itself is designed. The handler rejects a `:date`
click anyway in case the button is ever enabled by mistake.

### 17.4 Clicking

- **One click, winner only:** the click claims the scene atomically, and
  only the winner's own open scene matches (`UPDATE ... SET
  scene_resolved_at = now() WHERE id = $1 AND solved_by = $2 AND
  scene_resolved_at IS NULL RETURNING ...`), so the winner's click is a
  single round trip. Only when the claim matches nothing is the row read, to
  pick the refusal: anyone but the winner gets an ephemeral
  `You're not part of this conversation.` *(Q23 default, wording not yet
  confirmed)*, and a losing race or a click on a closed scene gets a quiet
  `The moment has passed.` Neither edits the post.
- **The gain:** the click grants `CALL_SCENE_GAIN = 1` when the choice's rank
  in the character's **base** `affinityByResponse` is fave (2) or like (1),
  and nothing for flat (0). `swap` never applies. It goes straight through
  `updateAffinity`, not `recordResponse`: the win already counted the meeting
  in `times_met`. This is the one place `/call` moves affinity directly (a
  deliberate change to the 2026-09-03 farming audit), and the one-click claim
  caps it at +1 per win.
- **Level-up:** if the +1 crosses a level, the bond scene DM goes out the
  same way `/roam` sends it (`deliverBondScene`). Errand signatures stay with
  `/roam` and `/meet`.
- **The edit** (an `UPDATE_MESSAGE` response to the click):
  - the reaction **goes under** `line`, a blank line apart in the same Text
    Display; the opening line stays, read back off the clicked post
    (`body.message`). Replacing it let a shorter reaction narrow the
    container and slide the thumbnail left; keeping it means the face only
    swaps in place. A post with no readable line shows the reaction alone.
    The reaction is the shared `/roam` pool
    (`getReactionLine` in `constants/reactions.js`) for the chosen type, with
    the choice's base rank as the outcome (2 love, 1 like, 0 flat), led by
    `+1 — ` when a point was granted, the way `/roam` and `/meet` write a
    gain. A flat pick shows the reaction alone, with no `+0`. The chosen
    label isn't echoed.
  - the Thumbnail swaps to the face map's face for the choice (§17.4.1)
  - the register (reaction and face) and the accent color come from where the
    winner lands after the gain, the same post-gain read `/roam` makes
  - **the button row is removed**
  - there is no private follow-up: the `(+1)` is the whole report
- **Tracking:** the chosen response type is recorded through the existing
  engagement/command-usage helpers. Date-button impressions aren't tracked.

### 17.4.1 Face map

The scene's faces are derived, never authored. Every scene opens on
`default.png`. A click swaps to the face for the chosen response's rank in
the character's **base** `affinityByResponse` (fave = 2, like = 1, flat = 0;
`swap` never applies) at the register the winner reaches after the click's
gain:

| Response | Stranger (`new`) | Acquaintance (`known`) | Friend (`warm`) | Close Friend (`spark`) | Confidant (`close`) | Devoted / Soulbound (`bound`) |
|---|---|---|---|---|---|---|
| *opening line* | default | default | default | default | default | default |
| fave (2) | close | close | smile | surprise_blush | full_smile | full_smile_blush |
| like (1) | sweat | sweat | surprise | surprise | smile | blush |
| flat (0) | serious | serious | serious | serious | surprise | close |

One `SCENE_FACES` table in `constants/publicEncounters.js`, keyed
register → rank. Variants on top of it:

- **Jo, casual:** when the encounter row's `variant` is `casual` (silhouette
  `Jo_Kongoza_Casual.png`), every face, the opening included, uses its
  `_girl` file (`default_girl.png`, `smile_girl.png`, ...). It is read off
  the row, so a scene carries no flag for it. Jo's scenes share one pool
  across both looks, so his lines must read with either face set.
- **`blush_2` (Ren, Romeo):** wherever the map gives `blush.png`, a 50/50
  roll picks `blush_2.png` instead.
- **Character-specific faces** (`wink.png` for Leo, Rui and Jo, and any
  later ones) are not used yet. The map stays generic for now.
- **Date button:** it has no face. It's disabled and never changes the
  portrait.

An unanswered scene closes on its opening face (§17.6).

### 17.5 Milestone

None. A scene win picks, records and shows no milestone, so it never adds to
`/affinity`'s Moments together. A win that falls back to the normal reveal
(the scene post failed) gets its milestone as usual.

### 17.6 Unanswered scenes

When the next encounter spawns in a guild, any earlier scene in that guild
with `scene_message_id` set and `scene_resolved_at` null is closed out
before the new silhouette posts:

- `scene_resolved_at` is set, so a late click gets the quiet "moment has
  passed".
- The winner (`solved_by`) gets the boost the scene replaced
  (`grantEncounterBoost`, still capped at `ENCOUNTER_BOOST_CAP`). It's a
  quiet safety net that no copy mentions. It's granted even if the post can't
  be read back.
- The post is read back from Discord (`getChannelMessage`) and saved again
  without its button row, keeping the opening line, face and accent. Only
  the text, portrait URL and accent are copied, so read-only fields on the
  fetched components never reach the PATCH.

There's no timer of its own. A guild whose encounters are disabled keeps its
last scene open until encounters resume, which is acceptable.

**Accepted trade-off:** ignoring a scene is worth slightly more on average
than answering it (a sure +1 boost against a 2-in-3 chance at +1). Kept on
purpose: the gap is one point, the fallback is never advertised, and the
click is the fun part.

If the scene's row write fails after the post lands, the buttons can't be
answered or closed out, so the winner gets the fallback boost right away.

### 17.7 Content: every winner line is a scene

Scenes have no pool of their own (merged 2026-10-06; they were a separate
`callScenes` export at first). Every entry in a character's `winnerLines`
(and a pmOnly character's `daytimeWinnerLines`) is a `{ line, responses }`
object, at every register (all labeled 2026-10-06):

```js
winnerLines: {
  new: [
    {
      line: "**{name}** ... {user} ...",
      responses: { kind: "...", playful: "...", bold: "..." },
    },                                      // no face fields: see §17.4.1
  ],
},
```

- **Both reveals draw the same way.** The normal reveal (`pickWinnerLine`)
  and the scene (`pickCallScene`) both `pickRandom` from `winnerLinePool`.
  The reveal uses only the text (`winnerLineText`), so any line can show up
  as a plain reveal one day and a scene another.
- **Every line gets labels** (user decision 2026-10-06), even a finished
  moment; its buttons answer it.
- **The shared fallback pool stays plain strings** and never opens a scene.

Writing rules:

- `line` is a winner line and follows every winner-line rule in
  `_shared.js`. That includes ending with the character staying with the
  caller, because the normal reveal may still draw it with a milestone after
  it. In a scene, the click's reaction replaces `line`.
- The three labels answer `line` directly (no restated approach, no
  trailing adverbs, no default "Thank him"), and each is at most 30
  characters.
- The answer to a click is not authored: it comes from the shared reaction
  pool and stands alone in place of `line`, under the portrait. The usual
  house rules and the voice-check skill apply to `line` and the labels.
- A pmOnly character (Towa) draws his **daytime scenes from his wordless
  `daytimeWinnerLines`** (revised 2026-10-06; at first he had none by day),
  the same swap the normal reveal makes. Those lines carry labels too, and
  stay wordless.

`validateContent.js`:

- the line gets the ordinary winner-line checks with the rest of its pool
  (`{user}`, the character's name, known placeholders, repeats)
- a scene entry errors on any key besides `line` / `responses` (so a stray
  face or answer field is caught), no `line`, a missing
  `kind`/`playful`/`bold`, any other label key (`neutral`, `date`), or a
  label over 30 characters
- a plain string in a character's `winnerLines` or `daytimeWinnerLines`
  errors as having no button labels
- an object entry in the shared fallback pool errors as a non-string line
- a character register errors when the face map needs a file missing from
  the character's art (including Jo's `_girl` files)
- a `callScenes` export is rejected like any other unknown pool key

### 17.8 Data model

Migration `027_call_scenes.sql`, two nullable columns on `public_encounters`:

| Column | Type | Purpose |
|---|---|---|
| `scene_message_id` | TEXT | The scene post. Null means the win used the normal reveal. |
| `scene_resolved_at` | TIMESTAMPTZ | Set by the click or the closeout. It's the one-click arbiter, so the +1 or the fallback boost is granted exactly once. |

Partial index on `(guild_id) WHERE scene_message_id IS NOT NULL AND
scene_resolved_at IS NULL` for the closeout lookup. These columns are pruned
with the row at 90 days like everything else.

Nothing else is stored (trimmed 2026-10-06 from an earlier draft that kept
the register, pool index, milestone, winner name and color). The click
recomputes the register, face and color from the relationship after its gain
and replaces the text with the reaction, and the closeout reads its post back
from Discord.

### 17.9 Code touch points

- `constants/publicEncounters.js`: `CALL_SCENE_CHANCE`, `DATE_BUTTON_LABEL`,
  `winnerLineText`, and the scene draw (`pickCallScene` returns
  `{ bucket, scene }`, drawn with `pickRandom` from `winnerLinePool`).
- `publicEncounters.js` `handleCall`: roll and draw before `afterReply`. In
  `afterReply`, on a hit, do the silhouette edit with no embed, post the
  scene, and store the columns. Add a new `handleSceneClick(body)` and a
  closeout step in `spawnEncounter`.
- `app.js`: route the `scene:` custom_id prefix next to `ward:`.
- `discordRest.js`: `message_reference` on `postChannelMessage`, and
  `getChannelMessage` for the closeout.
- `db/`: migration plus the claim, store and closeout queries.
- `commands.js` + `handleEncounterDev`: a `scene` boolean on
  `/encdev spawn`. The force flag lives in an in-memory Map keyed by
  encounter id (dev tooling, so losing it on restart is fine) and makes that
  encounter's win skip the roll.
- `constants/dialogue/<id>.js`: scene entries in `winnerLines` (and Towa's
  `daytimeWinnerLines`). Every line at every register carries labels as of
  2026-10-06 (§17.7); the first pass, one Stranger (`new`) scene per
  character, was moved over unchanged from the old `callScenes` export.
- Tests: roll gating (no scenes / missing art means a normal reveal), the
  face map (each rank at each register, Jo casual -> `_girl`, `blush_2`
  alternate), the lock state at 149/150, no boost or milestone on a scene
  win, the answer order and shared style, the winner check, one-click claim
  with +1 for fave/like and nothing for flat, the closeout on spawn with its
  fallback boost, and the validator cases above.

### 17.10 Decisions locked in

- **Public, not ephemeral:** the buttons are on the public scene, and the
  winner check enforces who can use them.
- **The silhouette stays.** The text above it is cleared as today, it gets no
  embed, and the scene is a separate reply.
- **Three authored responses plus a fixed date button**, which is always
  disabled for now. The lock shows below Close Friend and is gone at Close
  Friend and above.
- **One click, +1 for fave/like, 0 for flat** (revised 2026-10-06 from
  flavor only). It replaces the win's boost. The answers are shuffled and
  share one style, so the pick is blind. The reaction replaces the line with
  `(+1)` after it, there's no follow-up, and the button row is removed.
- **No milestone on a scene win.**
- **Level-ups from a click** send the bond scene DM, as `/roam` does.
- **Faces are derived (2026-10-06):** the opening is always `default`, and
  a click's face follows the §17.4.1 map by base rank and register.
- **Answers are reactions (2026-10-06):** a click shows a line from the
  shared reaction pool for its type and base rank, not an authored reply. Scenes carry no
  face data. Jo casual uses the `_girl` set, and Ren/Romeo get `blush_2` as
  a 50/50 alternate. Character-specific faces (`wink`) are deferred.
- **Unanswered scenes close when the next spawn happens**, and the winner
  quietly gets the boost instead. Ignoring a scene paying slightly more on
  average is accepted.
- **Rate stays at 10%** for now (2026-10-06). Every register is labeled, so
  every character win is eligible; revisit once it has run live.
- **Scenes live in `winnerLines` (2026-10-06):** one pool, with an object
  entry `{ line, responses }` marking a line that can open a scene.
- **Scope:** call scenes only. Date encounters belong to a later `/roam`
  and `/meet` extension. Here the date button is only shown (locked), with
  no face and no reaction.

### 17.11 Open

- Q23 (the non-winner wording, `You're not part of this conversation.`) is
  still an assumed default. Q22 (no label echo) and Q24 (the closeout keeps
  the opening) were settled on 2026-10-06 with the reaction-replaces-line
  design.
