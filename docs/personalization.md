# Spec: Personalization — characters who notice your habits

Status: **planned** (nothing built)
Last updated: 2026-10-23

Characters should react to how *this* player actually plays: when they last
came by, where they spend their time, what they shared in a bond scene, when
they play, how steadily they show up, which house they work for, and two dates
a year, the day they met and the player's birthday. Characters also get
birthdays of their own.

Most of this is already in the database. Only the birthday input, the
occasion-DM ledger, and the recall content are new.

| § | Feature | Surface | New data |
|---|---|---|---|
| 2 | Absence | `/roam` `/meet` beat | none (`last_interaction_at`) |
| 3 | House-aware "where you've been" | `/roam` `/meet` beat | none (`character_engagement`) |
| 4 | Bond scene recall | `/roam` `/meet` beat | content only (`choice_key`, `bond_keepsakes`) |
| 5 | Usual moment | `/roam` `/meet` beat | none (`encounter_milestones`) |
| 6 | Night owl vs. day player | `/roam` `/meet` beat | none (`command_usage_log`) |
| 7 | Streaks | `/roam` `/meet` beat | none (`command_usage_log`) |
| 8 | Mission house loyalty | debrief + riddle culprit reveal | none (`mission_log`) |
| 9 | Anniversary DM | bot DM, yearly | `occasion_dms` |
| 10 | Player birthday DM | bot DM, yearly | `birthday_month/day`, `occasion_dms` |
| 11 | Character birthdays | beats, `/call`, `/affinity` | `birthday` on `constants/characters.js` |

---

## 0. Ground rules (every section)

- **Hint at the data, never show it.** Characters say "it's been a while", never
  "12 days". Every signal below is a **bucket**, and no raw count, date or
  percentage ever reaches authored text. The one exception is placeholders the
  game already exposes (`{timesMet}`, `{sinceMet}`).
- **Diegetic only.** A character can know what they would plausibly know:
  they've seen you around campus, heard you were at Obscuary, notice you
  usually turn up late. They never know about commands, cooldowns or the bot.
- **All existing voice rules apply.** Run the voice-check skill on every new
  line. Some rules matter more than usual here: [no assumed time] in DMs,
  [MC is never a thing], [Edward protects Rui/Lyca feelings], [Obscuary is
  always night], [Towa is mute by day], and [bond scenes: he can't see MC].
- **One personal beat per draw, at most.** If several signals are live, §1.3
  picks one. A player should never get two "I noticed…" moments stacked.
- **Choices earn affinity.** Personal beats are ordinary beats, so their
  responses score like any other. The DMs in §9 and §10 have no buttons, so
  they're choice-free.

## 1. The personal beat layer (§2–§7 share it)

### 1.1 Why this isn't `dialogueWhen` again

`dialogueWhen` was cut (2026-09-19) because its entries were bare lines with
no `approach`/`greeting`/`responses`, so a draw that landed on one shipped a
`"..."` caption. This layer is conditional too, but **every entry is a full
beat** from day one, `validateContent` enforces it like the main pools, and
signals are computed in code. Authors never write match rules. It's also what
`bond-scene-dms.md` §4.3 (stale) said a callback layer would need.

### 1.2 Shape

A new `personal` pool on each `constants/dialogue/<id>.js` default export,
beside `dialogue`/`approach`/`responses`. It's keyed by signal, then by tier
band, then holds full beats:

```js
personal: {
  absence: {
    long:  { early: [beat, …], late: [beat, …] },   // §2
    month: { early: [ … ], late: [ … ] },
  },
  awayHouse:   { early: [ … ], late: [ … ] },        // §3, uses {awayHouse}
  usualMoment: { early: [ … ], late: [ … ] },        // §5, uses {usualMoment}
  nightOwl:    { early: [ … ], late: [ … ] },        // §6
  dayPlayer:   { early: [ … ], late: [ … ] },
  streak:      { early: [ … ], late: [ … ] },        // §7
  birthday:    { early: [ … ], late: [ … ] },        // §11, his birthday
},
// §4 recall beats live on the bond scene itself, not here.
```

`beat` is the same `{ line, approach, greeting, responses }` shape as every
drawable beat. Tier bands: **early** = `known` + `warm`, **late** = `spark` +
`close` + `bound`. Nobody at `new` gets a personal beat, because a stranger has
nothing to notice. A band that has no beats skips the signal for that
character, which is a validator **warning**, not an error, so the roster can
fill in over time.

### 1.3 Signal resolution and priority

`resolvePersonalSignals(userId, character, now)` runs alongside `drawBeatFor`.
It uses the same `Promise.all`, and every read is best-effort: a failed read
means no signal, never a failed encounter. It returns the live signals, and
the draw takes the first one in this order:

1. `birthday` (§11): his birthday, first encounter of the day
2. `absence` (§2)
3. `recall` (§4)
4. `streak` (§7)
5. `awayHouse` (§3)
6. `nightOwl` / `dayPlayer` (§6)
7. `usualMoment` (§5)

Then it rolls that signal's **chance** (below). On a hit, the personal beat
replaces the normal draw, using the same `pickMixedBeat(own, extra, chance)`
seam the mood beats use. On a miss, the normal draw happens and nothing else
is tried, which keeps the layer rare. Personal beats go through the
recent-beat skip (migration 031) like any other beat.

| Signal | Chance | Note |
|---|---|---|
| `birthday` | 100% first encounter that day, then 0 | per player |
| `absence` | 100% | consumed when the click updates `last_interaction_at` |
| `recall` | 15% | |
| `streak` | 20% when the bucket is new, else 5% | |
| `awayHouse` | 15% | |
| `nightOwl`/`dayPlayer` | 10% | |
| `usualMoment` | 10% | |

The numbers are starting points, tuned in `constants/characters.js` beside
`recentBeatWindow`.

### 1.4 New placeholders

| Placeholder | Resolves to | Section |
|---|---|---|
| `{awayHouse}` | a house name | §3, §8 |
| `{usualMoment}` | a milestone `hint`, read as a noun phrase | §5 |

Both get added to the frozen placeholder list so `validateContent` can check
them. A personal beat using one is only drawable when it resolves. That's
guaranteed because the signal producing the beat is the same one that
produced the value.

---

## 2. Absence

**Signal:** `character_relationships.last_interaction_at` for this pair, read
at draw time. That's before the response click writes the new value, so the
gap is real.

| Bucket | Gap | Feel |
|---|---|---|
| (none) | < 7 days | normal draw |
| `long` | 7–29 days | "Thought you forgot about me." |
| `month` | 30+ days | a real reunion |

There's no "back already?" bucket. With a 3-hour cooldown, same-day visits are
the normal rhythm, not something to remark on.

**Grounding:** 22 reference files carry a canon **Welcome Back** voiceline.
That line is the register to build from, and it must not be quoted
([winnerLines: no dialogue repeats] applies in spirit).

**Combines with §3:** if the player was active elsewhere during the gap, an
absence beat may use `{awayHouse}` ("Heard you've been at Obscuary a lot").
`{awayHouse}` resolves whenever §3 would fire, even though only one beat is
drawn.

## 3. House-aware "where you've been"

**Signal:** `character_engagement.commands_this_month`, summed by the house of
each character (`constants/characters.js`). `{awayHouse}` = the player's top
house this month **if it isn't this character's house**, holds at least 40% of
the month's encounters, and has at least 6 of them. Benkei and other
house-less characters have no "own" house, so any top house counts.

Monthly counters reset on the 1st (migration 005), so early in the month the
6-encounter floor keeps this quiet, which is fine.

Lines say "a lot of time at {awayHouse}", never a character name. That keeps
it clear of Edward's Rui/Lyca rule and of rivalry between individual
characters. Volatile characters can be competitive about the house. Nobody
treats the MC as something one house won from another.

## 4. Bond scene recall

**Signal:** a completed `bond_scene_progress` row for this pair
(`choice_key IS NOT NULL`), at a level the relationship is still at or above.
One completed scene is picked at random. The newest scene is weighted ×2 so
recent ones come up more.

**Content lives on the scene**, beside `beats`/`choice`/`keepsake` in
`bondScenes.<level>`:

```js
recall: {
  any:     [beat, …],   // the scene's moment, whatever was chosen
  kind:    [beat, …],   // optional, keyed by the option `key` picked
  playful: [beat, …],
  bold:    [beat, …],
},
```

The draw uses the `choice_key` pool when it has beats and falls back to `any`.
A recall beat brings back what the scene was *about*: the moment, or the
intention behind what the player chose. The keepsake can come up too, but it
isn't the point.

Rules specific to recall:

- **Bond scenes are texts; recall beats are in person.** The framing is "what
  you said the other day", never "when you looked at me" ([bond scenes: he
  can't see MC]).
- **Don't re-spend a reveal.** A recall can't go further than the scene did,
  and it can't spend what a *later* scene is built on ([bond scenes calibrate
  tier range]).
- **Devoted recall carries the ring's meaning.** It's not a secret anymore, so
  recall at Devoted+ can happen where other people can see.
- The validator requires an `any` pool of at least 1 beat on every scene that
  has a `recall` block, and warns on scenes with none.

Volume: 156 scenes × 1–2 beats. Phase it per character (§12).

## 5. Usual moment

**Signal:** the `encounter_milestones` row with the highest `total` for this
pair, if `total >= 3`. `{usualMoment}` is that milestone's `hint`, filled the
same way `bondScenes.js` fills `{lastMoment}`. "We keep ending up at the
garage, huh."

Milestones repeat ([milestones repeat: no firsts]), so this is a pattern
line. It never names a first time.

## 6. Night owl vs. day player

**Signal:** the player's `roam`/`meet` rows in `command_usage_log` from the
last 30 days, sorted with `timeBucket()` (`constants/backgrounds.js`, the one
place hours get bucketed). This needs at least 10 rows.

- `nightOwl`: evening share ≥ 65%
- `dayPlayer`: evening share ≤ 35%
- in between: no signal

`command_usage_log` is pruned at 90 days and only the service role can read it.
The bot uses the service role, so no migration is needed. Compute once per
draw, or cache per user for an hour if the query shows up in latency.

These are **habit** lines ("you're always out this late"), not lines about the
current hour, so they can be drawn at any time. Character constraints:
Obscuary scenes never get daylight framing, so their `dayPlayer` beats are
about the player's habit, not the setting. Towa's `dayPlayer` beats are
wordless, like his `daytimeWinnerLines`.

## 7. Streaks

**Signal:** consecutive local days (game TZ, `localDayKey`) with at least one
completed `roam`/`meet`, counted back from today in `command_usage_log`. This
is global, not per character: a small campus means characters see you around
whoever you're visiting.

| Bucket | Days |
|---|---|
| `streak` | 7+ |

One bucket to start ("you've been around every day"). Splitting it into 7 /
30 later is just a constant. The "new bucket" chance in §1.3 means the beat is
most likely on the day the streak crosses 7, and then fades out. A broken
streak has no line of its own. Coming back after a gap is §2's job, per
character.

## 8. Mission house loyalty

**Signal:** the player's `mission_log` completions from the last 30 days,
grouped by `house`, at least 3 completions. Top house with ≥ 50% share = the
player's **mission house**.

**Surfaces:** two places where a house's character already talks to the player
privately:

- **Co-op debrief** (§21): each player claims their own debrief, so the line
  is per player even though `DEBRIEF_LINES` say "you two".
- **Riddle culprit reveal** (§20): after the culprit's `winningLine`.

**Content:** a per-character pool in `constants/missions.js`, next to
`DEBRIEF_LINES`:

```js
export const MISSION_LOYALTY_LINES = {
  jin: {
    home: ["…"],   // this mission's house is the player's mission house
    away: ["…"],   // their mission house is another one; uses {awayHouse}
  },
  …
};
```

The line is appended as its own paragraph with a 35% chance. It never shows
when there's no mission house. Benkei has no house and doesn't appear in either
surface, so he has no entry. These are spoken lines and need no responses
(missions have no response buttons there, so [choices earn affinity] isn't
affected).

---

## 9. Anniversary DM

Once a year, on the month and day of `character_relationships.created_at` (in
game TZ; Feb 29 → Feb 28 in non-leap years), the character sends one DM. The
first one comes a year after meeting.

- **Eligibility:** relationship at Friend or higher. `bond_dms_enabled` must be
  true, and the user must share a guild with the bot (`bond-scene-dms.md`
  §2.3).
- **Delivery:** a once-a-day pass on the existing scheduler tick, in the same
  restart-safe style as mission slots. Write the `occasion_dms` row first, then
  post (the bond-scene idempotency pattern). Mid-morning game time is fine. The
  text itself must not assume a time ([bond scenes: no assumed time]).
- **Shape:** one texted message, choice-free, opened with the usual
  `*{firstName} sent you a message.*` frame. It follows bond-scene text rules:
  no narration, no seeing MC. It can use `{sinceMet}` ("since we met in
  {sinceMet}") and `{timesMet}`.
- **Content:** `anniversary: { friend: "…", closeFriend: "…", confidant: "…", devoted: "…", soulbound: "…" }`
  on each `constants/dialogue/<id>.js`, picked by current level. The character
  set is the same as bond scenes, so the content is required and validated
  like bond scenes.
- **Several on one day:** if two characters were first met the same day, send
  them as separate DMs, highest affinity first.

## 10. Player birthday DM

### 10.1 Input

`/birthday set month:<1–12> day:<1–31>` (ephemeral, validated against the
month; Feb 29 allowed), `/birthday clear`, and bare `/birthday` to show what's
saved. **Month and day only, never a year.** Stored on `user_activity`:

| Column | Type | Purpose |
|---|---|---|
| `birthday_month` | SMALLINT NULL, CHECK 1–12 | |
| `birthday_day` | SMALLINT NULL, CHECK 1–31 | both NULL or both set |

The date can be changed any time. Changing it can't re-trigger a DM in the same
year because `occasion_dms` is keyed by year (§10.3), and the DM has no reward,
so there's nothing to farm.

Discovery: a one-time line appended to the first bond-scene DM's frame, or
mentioned in `/bonds`. It's never asked for in a channel.

### 10.2 The birthday card

On the day, one DM: a **card**.

- **Lead:** the character with the highest affinity (Friend+) writes the full
  message. That's `birthday.mc[level]` on their dialogue file, in the register
  of their canon **MC's Birthday** voicelines (25 of 26 reference files have
  them; **Benkei doesn't**, so his is authored from his reference file without
  a canon anchor).
- **Signatures:** up to 5 more characters at Close Friend+, ordered by
  affinity, each adding one short line (`birthday.sign`). They're rendered
  under the lead as a list, `**Kaito:** …`, to stay under Discord's 2000-char
  limit.
- If no character is at Friend+, nothing is sent.
- Same eligibility, delivery pass and ledger as §9. If an anniversary falls on
  the birthday, both are sent, birthday first.

### 10.3 `occasion_dms` (new table)

| Column | Type | Purpose |
|---|---|---|
| `discord_user_id` | TEXT | |
| `character_id` | TEXT | the lead for a birthday card; `''` is not used |
| `occasion` | TEXT | `anniversary` \| `birthday` |
| `year` | SMALLINT | game-TZ year it fired for |
| `status` | TEXT | `sent` \| `skipped_optout` \| `skipped_gone` |
| `created_at` | TIMESTAMP | |
| `PRIMARY KEY (discord_user_id, occasion, year, character_id)` | | one per occasion per year |

For a birthday, the PK includes the lead's `character_id`, but the claim is
`INSERT … WHERE NOT EXISTS (same user, 'birthday', year)`, so one card per
year no matter who leads. RLS by `discord_user_id`, like the other user tables.
Retention: prune rows older than 2 years. Only the current year's rows are
read.

## 11. Character birthdays

### 11.1 Constants

`birthday: { month, day }` on each character in `constants/characters.js`.
**The user supplies these. Never infer them from reference files.** (Some
reference files say a date in a voiceline, e.g. Alan's "April 25th"; that's
for checking against, not the source.) `validateContent` checks each one is a
real date.

### 11.2 What happens on the day

- **`/roam`/`/meet` with him:** the player's first encounter with him that day
  draws a `personal.birthday` beat (§1.3, top priority). The register comes
  from the canon **His Birthday** voicelines, not quoted. The MC is the one
  celebrating him; it's never her task or errand ([MC is never a thing]).
- **`/affinity`:** a 🎂 marker beside his name for the day.
- **`/call`:** the scheduler weights him ×3 for that guild's draws that day.
  Teasers stay generic ([shared teasers: no places]), so nothing in the
  channel gives him away.
- No DM. His birthday is something the player brings to him.

---

## 12. Phasing

1. **Code-only signals with content** (§2, §3, §5, §6, §7): the personal-beat
   layer, signal resolution, validator, placeholders. Content per character,
   starting with `absence` because it pays off most.
2. **§8 mission loyalty:** small and self-contained in `constants/missions.js`.
3. **§9 + §10 DMs:** migration (`occasion_dms`, birthday columns), the
   `/birthday` command, the daily pass, anniversary and birthday content.
4. **§11:** waits on the birthday constants from the user. Beats + `/affinity`
   marker first, `/call` weighting after.
5. **§4 recall:** the biggest content load (156 scenes). Do it a character at a
   time once phase 1's layer exists.

Every phase updates `db/SCHEMA.md` (where tables or columns change) and keeps
`PRIVACY.md` accurate.

## 13. Open questions

- §1.2 tier bands: is early = known+warm / late = spark+close+bound the right
  cut, or should personal beats follow all six tiers?
- §9 eligibility floor: Friend+, or does an Acquaintance anniversary make sense
  for characters met long ago but rarely visited?
- §10.2 signature count (5) and floor (Close Friend+).
- §11.2: should his birthday also give a boost or a Benkei shop item (cake)?
  Out of scope here; see `docs/benkei-shop.md`.

## 14. Relationship to other specs

- `bond-scene-dms.md` §4.3 (stale, remembered choices → callbacks) is
  **replaced by §4 here**. §4.5's time-of-day idea is unrelated to §6, which is
  about the player's habit, not the current hour.
- `scheduled-missions.md` §20 (culprit reveal) and §21 (debrief) are the
  surfaces for §8.
- `negative-affinity-enemies-to-lovers.md`: if it ships, the six volatile
  characters' §2 and §3 beats get a `cold` response like their other beats.
