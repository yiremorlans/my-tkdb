# Spec: Public "call out" encounters

Status: **design / not implemented**
Last updated: 2026-08-31

A scheduled job posts a public, everyone-can-see encounter into a designated
channel — **one per Discord server** — on a random cadence. The character is
shown as a **black silhouette** over a real background. The first user to `/call`
the correct name within a short window "reaches" them: the post is edited to
reveal the un-overlaid image and a relationship-tiered flavor line, and the
winner gets a **pending boost** toward their next `/roam` / `/meet` with that
character (plus a milestone) — a win never moves affinity directly; see §16. If
no one gets it in time, the silhouette stays and the post edits to a
non-committal "moment has passed" line — the identity is never revealed.

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

**HTTP-interactions bot, no gateway.** There is no WebSocket / shard concern —
the scheduler is a cron-like loop, and this is simpler than a gateway bot would
be.

**Assumption:** a single app instance. Two instances would double-fire the
scheduler for every guild; if the app is ever scaled out, gate the scheduler
tick behind a Postgres advisory lock.

**Effort:** ~1.5–2 days. Riskiest part is the multipart channel POST/edit (new
for this codebase). Silhouette compositing and the atomic claim are quick. The
per-guild machinery is straightforward at this scale.

---

## 2. End-to-end lifecycle (per guild)

```
scheduler tick (every ~25s, iterates every enabled guild independently)
  for each guild G in guild_settings WHERE enabled = true:

    FINALIZE: public_encounters WHERE guild_id=G AND resolved_at IS NULL AND expires_at < now()
      └─ atomic UPDATE ... SET outcome='expired'
         └─ edit G's post: content only → alternating "moment has passed" line
            (silhouette image stays, identity never shown)

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
  ├─ input matches a DIFFERENT character → ephemeral: alternating "wrong" line, start 30s cooldown
  ├─ within 30s of your last wrong guess → ephemeral: "try again in Ns"
  └─ correct:
        atomic claim (UPDATE ... WHERE id=? AND resolved_at IS NULL)
          ├─ 0 rows  → ephemeral: "someone reached them first"
          └─ 1 row   → ephemeral: "That was {name}." + milestone afterline (§16.1)
                       async: grant pending boost + record milestone (§16),
                              derive tier from stored (unchanged) affinity,
                              recompose reveal image, edit post → reveal + tiered winner line
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
- **Silhouette post:** `composeSilhouetteEncounter(bg, charFile)`.
- **Reveal post:** `composeSilhouetteEncounter(bg, charFile, { reveal: true })` —
  same background, same character, same variant, no overlay, no dialogue box.
- Dialogue is **never** baked into the image for this feature. The teaser and
  all flavor text live in the Discord message body.

At < 5 guilds the composite cost (~1–2s each, a handful per hour total) is
negligible — no image cache or worker pool needed. If guild count ever grows,
disk-cache composited PNGs keyed `${bg}__${char}__${variant}__{sil|reveal}.png`
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

New pool `ENCOUNTER_TEASERS`, ~15 lines, e.g.:

```js
export const ENCOUNTER_TEASERS = [
  'You see a familiar figure in the distance… call out to them?',
  "Someone's standing just past the light. Do you know them?",
  'A silhouette lingers at the edge of the platform. Say a name?',
  'You catch a shape you recognize out of the corner of your eye.',
  'Someone you know is standing there, half in shadow.',
  "There's a figure up ahead. If you're quick, you could reach them.",
  'A shadow you almost recognize pauses on the walkway.',
  // ...
];
```

### Message content (silhouette post)

```
{teaser}

Type `/call <name>` to reach them — you have until <t:{expiresUnix}:R>.
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
correct guess. Heavier work (affinity, reveal-image recompose, message edit,
analytics) runs after `res.send`, fire-and-forget.

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
   - in-memory cooldown check (§8). Within 30s of this user's last wrong guess
     for this encounter → `Give it a moment — try again in ${n}s.`
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
       const revealImg = await composeSilhouetteEncounter(bg, charFile, { reveal: true });
       await editChannelMessage(guild.encounter_channel_id, encounter.message_id, {
         content: line,
         files: [{ attachment: revealImg, name: 'reveal.png' }],
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
- With a 30s cooldown inside a 2-minute window, a user gets ~3 attempts.

The append-only `public_encounter_guesses` log is still written (after
`res.send`, fire-and-forget) for analytics only. It has **no** unique constraint
on `(encounter_id, discord_user_id)` — the cooldown, not the schema, limits
retries.

---

## 9. Flavor text

### 9.1 Missed opportunity (`MISSED_LINES`)

Edit **content only**; the silhouette image stays; components removed. Identity
is never revealed.

```js
export const MISSED_LINES = [
  'The moment has passed.',
  'They were gone before anyone could place them.',
  'The figure slips out of sight. Maybe next time.',
  "Whoever it was, they didn't wait around.",
  'You lost your chance this time.',
  'The shape dissolves back into the dark.',
];
```

### 9.2 Wrong guess (`WRONG_GUESS_LINES`)

```js
export const WRONG_GUESS_LINES = [
  "That's not them. They slip further away.",
  'No — the figure stays where it is.',
  'Wrong name. You feel the moment tightening.',
  "That isn't who's standing there.",
];
```

### 9.3 Winner lines — relationship-tiered + house/mission themed

Every line names `{user}`. Placeholders: `{user}` (mention — renders as the
caller's server name), `{name}` (revealed full name), `{house}`
(`character.house`, or `Darkwick` for Benkei).

Tier comes from the winner's **post-increment** affinity with that character
(global, not per-guild): `getRelationshipLevel(affinity).name` →
`getDialogueTier(...)`. Resolver mirrors `RESPONSE_LABEL_TIER` in
`constants/characters.js` — authored at 4 registers, `WINNER_LINES.any` merged in
at every tier, expandable later:

```js
const WINNER_LINE_TIER = { new:'new', known:'new', warm:'new', spark:'spark', close:'close', bound:'bound' };

export function pickWinnerLine(dialogueTier, vars) {
  const bucket = WINNER_LINE_TIER[dialogueTier] || 'new';
  const pool = [...WINNER_LINES.any, ...(WINNER_LINES[bucket] || WINNER_LINES.new)];
  const raw = pool[Math.floor(Math.random() * pool.length)];
  return raw.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');
}
```

```js
export const WINNER_LINES = {
  // house / mission themed — valid at any relationship tier
  any: [
    '{user} flagged **{name}** down and got their signature on the last **{house}** mission report before they slipped away.',
    '{user} caught **{name}** just before the next **{house}** briefing and pulled them aside.',
    '**{name}** was headed to a **{house}** debrief when {user}, the inspector, called out.',
    '{user} intercepted **{name}** between **{house}** missions — perfect timing.',
    '{user} got **{name}** to sign off on the **{house}** anomaly report right as they were leaving.',
    '**{name}** turned at the sound of their name. {user} had a **{house}** mission to go over.',
    '{user} — honor roll — chased down **{name}** before the **{house}** patrol rotated out.',
    '{user} snagged **{name}** for a coffee break to walk through the **{house}** assignment.',
    '**{name}** almost vanished into the crowd, but {user} called it right and reeled them back for the **{house}** rundown.',
    '{user} matched the silhouette to **{name}** and waved them over before the **{house}** mission clock started.',
    '{user} caught up to **{name}** with a **{house}** dispatch order in hand.',
    '**{name}** stopped mid-step. {user} needed them for the **{house}** patrol roster.',
    '{user} logged **{name}** in for the **{house}** briefing with seconds to spare.',
    'The **{house}** debrief could wait — {user} had already called **{name}** over.',
    '{user} pinned down **{name}** before they could disappear into **{house}** business again.',
  ],

  new: [
    "**{name}** doesn't quite place {user} yet, but stops anyway.",
    '{user} got a name out before **{name}** could disappear. A first, cautious nod.',
    "**{name}** studies {user} for a second, then decides they're worth a moment.",
    '"…Do I know you?" **{name}** asks — but they don\'t walk off. {user} guessed right.',
    '**{name}** gives {user} a measured look, then stays put.',
  ],

  warm: [
    '**{name}** breaks into an easy grin the second {user} calls out.',
    '"There you are." **{name}** falls into step beside {user} without missing a beat.',
    '{user} nailed the name and **{name}** laughs — caught, and not minding it.',
    '**{name}** was hoping it\'d be {user}. The mission talk can wait a minute.',
    '**{name}** turns like they already knew it was {user}.',
  ],

  close: [
    "**{name}** would've known that voice anywhere. They cross straight to {user}.",
    '{user} barely finished the name before **{name}** was already turning, already smiling.',
    '"Took you long enough." **{name}** bumps {user}\'s shoulder and pretends the mission is why they stayed.',
    '**{name}** drops the debrief face entirely when it\'s {user} doing the calling.',
    '**{name}** was watching for {user} the whole time, if anyone asked. No one asked.',
  ],

  bound: [
    "**{name}** doesn't even look surprised — of course it's {user}. It's always {user}.",
    '{user} says the name and **{name}** is already there, mission report forgotten on the desk.',
    '"You didn\'t have to guess. You know it\'s me." **{name}** takes {user}\'s hand and the **{house}** briefing loses.',
    '**{name}** crosses to {user} like the rest of the room isn\'t there.',
    'The **{house}** paperwork hits the floor. **{name}** reached {user} first.',
  ],
};
```

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
-- 30s cooldown, not the schema.
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

Migration 010 also adds `relationships.pending_encounter_boost` and the
`encounter_milestones` table, plus `grantEncounterBoost` /
`consumeEncounterBoost` / `recordEncounterMilestone` /
`getEncounterMilestoneCounts` in `db/supabase.js`. Full definitions and the
`/roam` / `/affinity` wiring are in **§16**.

---

## 11. Discord REST — multipart helpers

`utils.js` `DiscordRequest` is JSON-only. Add multipart helpers (in `utils.js`
or a new `discordRest.js`), modeled on `sendFollowup` in `app.js`:

```js
// POST /channels/{channelId}/messages
postChannelMessage(channelId, { content, files, allowed_mentions })

// PATCH /channels/{channelId}/messages/{messageId}
// To swap the image, send attachments: [{ id: 0, filename: 'reveal.png' }] in
// payload_json plus files[0], which replaces the previous attachment.
editChannelMessage(channelId, messageId, { content, files, components })
```

Both use `Authorization: Bot ${DISCORD_TOKEN}` and `FormData` with a
`payload_json` part, exactly like `sendFollowup`.

**Bot permissions in each guild's encounter channel:** View Channel, Send
Messages, Attach Files. (Embed Links not required — the image is an attachment.)
Missing permissions surface via §3 "Post failure" handling.

---

## 12. Configuration (`.env` / `.env.sample`)

Per-guild settings are configured in Discord via `/encounters` (§4). The env vars
are **global defaults** only, used when a guild leaves a column NULL:

| Var | Default | Purpose |
|---|---|---|
| `ENCOUNTER_MIN_MINUTES` | `45` | Default lower bound of the gap between a guild's encounters |
| `ENCOUNTER_MAX_MINUTES` | `180` | Default upper bound of the gap between a guild's encounters |
| `ENCOUNTER_WINDOW_MINUTES` | `2` | Default `/call` window before the moment passes |
| `ENCOUNTER_BOOST_GAIN` | `1` | Extra affinity added to the winner's next authored (`/roam` / `/meet`) response — see §16 |
| `ENCOUNTER_BOOST_CAP` | `2` | Max unspent boosts a user can hold per character |
| `ENCOUNTER_TICK_SECONDS` | `25` | Scheduler tick interval |

`DISCORD_TOKEN`, `APP_ID`, `SUPABASE_*` are already present. No
`ENCOUNTER_CHANNEL_ID` — removed in favor of `guild_settings`. No
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
| Same user wins in two different guilds | Two separate encounters → boost caps at `ENCOUNTER_BOOST_CAP`; each still records a milestone; intended |
| Win, then never runs `/roam` / `/meet` | Boost sits unspent (no v1 expiry); the milestone log still grows; no affinity is ever granted |
| Multiple app instances | Out of scope — would double-fire the tick for every guild; needs a Postgres advisory lock around the tick |
| `_PM` backgrounds / timezone | Judged against the fixed `America/Chicago` evening cutoff (`EVENING_HOUR` / `EVENING_TIMEZONE` in `constants/backgrounds.js`), same as `/roam` |
| Attachment size | Composited PNGs are already within Discord limits (same pipeline as `/roam`) |

---

## 14. Files added / changed

**New**

- `constants/publicEncounters.js` — `ENCOUNTER_TEASERS`, `MISSED_LINES`,
  `WRONG_GUESS_LINES`, `WINNER_LINES`, `pickWinnerLine`, `matchCharacterGuess`,
  `guessCooldown` Map + helpers, generation helper,
  `ENCOUNTER_MILESTONES` + `pickMilestone` (§16.2)
- `publicEncounters.js` — `buildEncounterPost(guild)`, `finalizeEncounter(row)`,
  `handleCall(interaction)` (mirrors the shape of `encounters.js`)
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
- `utils.js` (or new `discordRest.js`) — multipart `postChannelMessage` /
  `editChannelMessage`
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
5. Wrong real-name guess → 30s cooldown before the next attempt, tracked in an
   in-memory Map (no DB round trip). Unknown/gibberish → no cooldown, no penalty.
6. On timeout the identity is **never revealed**; the post edits to an
   alternating `MISSED_LINES` entry and keeps the silhouette image.
7. Winner reward is a **pending boost + a milestone**, not direct affinity
   (§16). The boost adds `ENCOUNTER_BOOST_GAIN` (=1) to the winner's next
   authored response with that character and is capped at `ENCOUNTER_BOOST_CAP`
   (=2). The public post still edits to the reveal image plus an alternating,
   relationship-tiered winner line that names the guessing Discord user and the
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
Under this model a win can only *amplify one already-throttled authored
interaction* by roughly one good response, and only if the user actually engages
that dialogue — the public game feeds the main loop instead of bypassing it. The
milestone log gives `/call` its own visible, collectible progression that never
touches the relationship curve.

### 16.1 Boost

- New column: `relationships.pending_encounter_boost INT NOT NULL DEFAULT 0`.
- **On a win:**
  `pending_encounter_boost = LEAST(pending_encounter_boost + 1, ENCOUNTER_BOOST_CAP)`
  (`ENCOUNTER_BOOST_CAP = 2`). Wins past the cap still record a milestone; they
  do not stack more boost.
- **On the next `/roam` / `/meet` with that character**, when a response is
  *completed* (the same point `recordResponse` runs today, `encounters.js:371`)
  and `pending_encounter_boost > 0`: add `ENCOUNTER_BOOST_GAIN` (=1) to that
  response's gain, then decrement the boost by 1. A `NEUTRAL` response (gain 0)
  **still consumes** the boost — the warmer welcome is the reunion, not the pick.
- No expiry in v1. (If wanted later: a `boost_updated_at` column and a 7-day
  cutoff in `consumeEncounterBoost`.)
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
+{gain} — {level.emoji} **{level.name}**  ·  *picking up after {milestone.hint} — a warmer welcome (+1)*
```

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
    label: 'Shared an umbrella across the quad',
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
    hint: 'last night',
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
📋 Signed off a Vagastrom report right before they vanished — ×3
☕ Coffee breaks together — ×4
🎬 Skipped a briefing to watch a movie in Rui's room — ×2
🌧️ Shared an umbrella across the quad — ×1
```

One `getEncounterMilestoneCounts(userId, characterId)` read per character
(`SELECT milestone_type, count(*) ... GROUP BY milestone_type`).

### 16.4 Data model (migration 010 additions)

```sql
ALTER TABLE relationships
  ADD COLUMN IF NOT EXISTS pending_encounter_boost INT NOT NULL DEFAULT 0;

-- Append-only. One row per /call win. Also a real "after the encounter"
-- timeline (created_at ordering) for future use.
CREATE TABLE IF NOT EXISTS encounter_milestones (
  id                  BIGSERIAL PRIMARY KEY,
  discord_user_id     TEXT NOT NULL,
  character_id        TEXT NOT NULL,
  milestone_type      TEXT NOT NULL,            -- key of ENCOUNTER_MILESTONES
  guild_id            TEXT,
  source_encounter_id BIGINT REFERENCES public_encounters(id) ON DELETE SET NULL,
  created_at          TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_encounter_milestones_user_char
  ON encounter_milestones (discord_user_id, character_id);

ALTER TABLE encounter_milestones ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Block direct access" ON encounter_milestones FOR SELECT USING (FALSE);
```

New `db/supabase.js` functions:

| Function | Purpose |
|---|---|
| `grantEncounterBoost(userId, characterId)` | `getOrCreateRelationship`, then `pending_encounter_boost = LEAST(current + 1, ENCOUNTER_BOOST_CAP)`; returns the new value |
| `consumeEncounterBoost(userId, characterId)` | atomic `UPDATE ... SET pending_encounter_boost = pending_encounter_boost - 1 WHERE user+char AND pending_encounter_boost > 0` `.select()`; caller checks the row count |
| `recordEncounterMilestone({ userId, characterId, milestoneType, guildId, sourceEncounterId })` | INSERT into `encounter_milestones`; fire-and-forget |
| `getEncounterMilestoneCounts(userId, characterId)` | `{ milestone_type: count }` map for the `/affinity` block |

### 16.5 Wiring summary

- **`/call` win async block (§7.3):** `grantEncounterBoost` +
  `recordEncounterMilestone` replace the old `updateAffinity(..., 1)`.
  `incrementTimesMet` still fires. Winner-line tier = current stored affinity
  (unchanged by the win).
- **`/roam` / `/meet` response path (`encounters.js` ~line 370):** after
  `recordResponse`, call `consumeEncounterBoost`; if it consumed a row, add
  `ENCOUNTER_BOOST_GAIN` to the persisted gain and append the bonus clause to the
  reply.
- **`/affinity` (`encounters.js:403`):** add the "Moments together" block from
  `getEncounterMilestoneCounts`.

### 16.6 Config

| Var | Default | Purpose |
|---|---|---|
| `ENCOUNTER_BOOST_GAIN` | `1` | Extra affinity on the winner's next authored response with that character |
| `ENCOUNTER_BOOST_CAP` | `2` | Max unspent boosts per user per character |

`ENCOUNTER_AFFINITY_GAIN` is removed — a win grants no direct affinity.

### 16.7 Open questions

- **Boost expiry** — v1 has none. Add a 7-day cutoff if unspent boosts feel
  like they trivialize a later return.
- **Does `/meet` consume the boost, or only `/roam`?** Current call: whichever
  authored interaction with that character happens first.
- **Bonus response button vs. flat +1** — flat +1 for v1 (cheap, predictable).
  A themed 5th response option ("Bring up the movie", worth +2/+3) is the richer
  follow-up if the boost should feel like content, not a number.
- **Milestone dedup** — v1 allows the same `milestone_type` to stack to any
  count. If some milestones should be one-time ("first walk home"), add a
  `unique` flag and a `WHERE NOT EXISTS` guard in `recordEncounterMilestone`.
