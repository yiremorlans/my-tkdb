# Spec: Bond scenes — level-up DMs

Status: **implemented** (Phase 1 + Phase 2 content)
Last updated: 2026-09-04

Built as specified below, with three deviations, all noted inline at the
relevant section:

- **All 156 scenes are authored, and there is no content fallback** (§5.3, §11).
  Every character has their own scene at each of the six levels.
  `constants/validateContent.js` makes a missing one an **error** rather than a
  warning, and additionally forbids reusing any beat, closing line or keepsake
  line anywhere in the game. `getBondScene` returning nothing means the
  character has left the roster (§8.8), never that content is pending.
- **`/bonds dms:on|off` is an option, not a subcommand** (§4.9). Discord makes a
  command with subcommands invocable *only* through them, which would have
  broken bare `/bonds`.
- **Phase 3 is partly built**: `/bonds character:<name>` ships as a journal
  with a replay gallery (§4.6) — every finished scene, replayable as many
  times as the player wants, the moment it's finished; there is no
  character-wide gate. A replay is the **original interaction again**, not a
  preview: the same beats and buttons, posted for real into the DM, just
  never touching `bond_scene_progress.choice_key` or `bond_keepsakes`. The
  scene's own closing DM message also carries a `🔁 Replay this scene` button
  (§4.6), so looking back doesn't require typing the command at all. Still
  unbuilt: `bondChoice` dialogue callbacks (§4.3) and evening variants (§4.5).
  The `choice_key` those read is being written from day one, so the data will
  be there when they are. The §4.4 history placeholders *are* resolved, since
  the reads were already in hand.

When a relationship crosses into a new level, the bot **opens a DM with the
Discord user** and starts a short, **character-specific scene** — a sequence of
prose beats delivered **one message per button click**, ending on a small
choice. The sequence has **no timer and no expiry**: each beat's `Continue`
button just sits in the DM until it's clicked, so the user can stop partway,
leave, and pick the conversation back up hours or days later by clicking where
they left off. One scene per `(character, level)`. `Stranger` is the starting
level and has no scene; the first scene fires on `Stranger → Acquaintance`, so
there are **six scenes per character** (Acquaintance, Friend, Close Friend,
Confidant, Devoted, Soulbound) — **156 total** across the roster, each written in
that character's voice from
[`constants/dialogue/reference.md`](../constants/dialogue/reference.md).

The scene is the reward for the climb: a private moment that only happens
between the two of you, that `/roam` and `/meet` never show, and that references
what actually happened to get here (how many times you've met, the response type
you lean on, the last public encounter you won). It **does not move affinity** —
`/roam` and `/meet` stay the only things that do (same rule as
[`scheduled-missions.md`](./scheduled-missions.md) and
[`public-encounters.md`](./public-encounters.md)). Finishing a scene leaves the
user a **keepsake** — a small memento in the character's voice — and a
**remembered choice** from its closing beat that colours later dialogue.

---

## 0. Relationship to other specs / shared infra

| Shared piece | Where it's defined | Used here for |
|---|---|---|
| Bot **guild install**, `DISCORD_TOKEN`, Serverless disabled | [`channel-call-response-feature.md`](./channel-call-response-feature.md) | a DM is a bot-initiated message on the `Bot <token>` auth path — the same prerequisite as posting to a channel |
| `postChannelMessage` / `editChannelMessage` REST helpers | `discordRest.js` (`public-encounters.md` §11) | the DM POST and every Continue-button edit; a DM channel id works in both verbatim |
| Component router (`custom_id` prefix dispatch) | `app.js` line 377 | a new `bond:` namespace for the Continue / choice buttons |
| Level resolution (`getRelationshipLevel`, `RELATIONSHIP_LEVELS`) | `constants/game.js` | detecting the crossing |
| `fillTemplate` + placeholder set | `constants/publicEncounters.js` | scene lines that name `times_met`, house, the latest encounter milestone |
| Per-character content files | `constants/dialogue/<id>.js` | the new `bondScenes` pool lives here, next to `dialogue` / `approach` / `responses` |
| Volatile-character tone | [`negative-affinity-enemies-to-lovers.md`](./negative-affinity-enemies-to-lovers.md) | Leo, Shion, Taiga, Romeo, Yuri, Ritsu get thorny scenes; if that spec ships, its negative crossings get their own rift scenes (§4.8) |

No new dependencies. No new privileged intents — a bot DM needs none; it needs
only to **share a guild with the user** (§2.3).

---

## 1. The trigger

### 1.1 Where the crossing is detected

`buildResponseResultMessage` in `encounters.js` is the single funnel for every
affinity change:

```
resp button (app.js)
  → buildResponseResultMessage(userId, characterId, responseTypeId, …)
    → recordResponse(userId, characterId, gain, responseType)   [storage.js]
      → updateAffinity(userId, characterId, gain)               [db/supabase.js]
```

`updateAffinity` already reads the row before it writes
(`relationship.affinity + affinityChange`), so the before-value is in hand at no
extra cost. Return the crossing from there:

- **`storage.js` `recordResponse`** — today returns `{ affinity, timesMet,
  gain, level }`. Add `previousLevel` and `leveledUp`:

  ```js
  const before = getRelationshipLevel(relationship.affinity); // relationship from updateAffinity's read
  const after  = getRelationshipLevel(updated.affinity);
  // …
  return {
    affinity: updated.affinity || 0,
    timesMet: (updated.times_met || 0) + 1,
    gain,
    level: after,
    previousLevel: before,
    leveledUp: RELATIONSHIP_LEVELS.indexOf(after) > RELATIONSHIP_LEVELS.indexOf(before),
  };
  ```

  `updateAffinity` must hand back the pre-write affinity (or the whole
  pre-write row) for this — a one-line change to its return, or pass the
  `getOrCreateRelationship` result back out.

- **`buildResponseResultMessage`** — already destructures `{ level }` from
  `recordResponse`. Also take `leveledUp` / `level`, and put them on its return
  object (it currently returns only `{ content, components, flags }`):

  ```js
  return { content, components, flags, levelUp: leveledUp ? { characterId, level } : null };
  ```

- **`app.js` `resp` handler** — after `res.send(...)`, alongside the existing
  fire-and-forget `trackUserActivity` / `trackCommandUsage` calls:

  ```js
  if (messageData.levelUp) {
    deliverBondScene(userId, messageData.levelUp.characterId, messageData.levelUp.level.name)
      .catch(err => console.error('Error delivering bond scene:', err));
  }
  ```

  Never awaited — the interaction reply must not wait on Discord's DM
  endpoints, and a DM failure must never surface as a `/roam` error.

### 1.2 Which crossings fire

- **Positive ladder only.** Gains are `0..2`, so affinity only climbs here; the
  only crossing is `previousIndex → previousIndex + 1` (or, with a big encounter
  boost spent, possibly two indexes — §8.1). `Stranger` has no scene, so the
  first real delivery is at `Acquaintance` (`affinity` reaches `20`).
- **A boost-spend counts.** `buildResponseResultMessage` folds pending `/call`
  boosts into `gain` before `recordResponse`. If that combined gain is what
  crosses the line, the scene still fires — the reunion earned it.
- **Never on the same level twice.** Idempotency is enforced at delivery
  (`bond_scene_progress`, §6) — a manual affinity edit in the DB, a replay, or a
  double-processed interaction can't re-send a scene the user has already seen.
- **Down-crossings: out of scope here.** Affinity only falls under
  `negative-affinity-enemies-to-lovers.md`, which is unbuilt. Its crossings
  (`Frenemy` / `Rival` / …) would get their own rift scenes — sketched in §4.8,
  not specified here.

---

## 2. Delivery

### 2.1 Opening the DM

New helper in `discordRest.js`:

```js
// POST /users/@me/channels { recipient_id } → { id, … }
// Discord caches these; still cheap to call every time. 403 here == "can't DM
// this user" (see §2.3) — caller treats it as a soft failure.
export async function openDmChannel(userId) { … }
```

Then `postChannelMessage(dmChannelId, { content, components })` — unchanged, the
DM channel id is an ordinary channel id on the `Bot <token>` path.

### 2.2 `deliverBondScene(userId, characterId, levelName)` — the orchestrator

New module `bondScenes.js`. Steps:

1. **Claim the scene.** Atomic `INSERT … ON CONFLICT DO NOTHING` into
   `bond_scene_progress` for `(userId, characterId, levelName)` with
   `status = 'queued'`. Zero rows inserted → this level's scene already exists
   (any status) → **stop**. This is the whole idempotency story; do it *before*
   any Discord call.
2. **Opt-out check.** If the user has `bond_dms_enabled = false` (§6), set the
   row `skipped_optout` and stop.
3. **Queue check.** If another row for the same `(user, character)` is `queued`
   or `in_progress` at a lower level, leave this one `queued` and **stop** — it
   is released when that one flips to `complete` (§8.4). One scene per character
   runs at a time.
4. **Resolve content.** `getBondScene(characterId, levelName)` from the
   character's `bondScenes` pool. Nothing resolves only if the character has
   left the roster (§8.8) — full coverage is a build error otherwise (§5.4).
5. **Render beat 0.** `fillTemplate` each line with the scene vars (§5.2).
6. **Open the DM** (`openDmChannel`). On 403 / any error → mark the row
   `pending_dm` and stop; §2.4 picks it up.
7. **POST beat 0** with `postChannelMessage(dmChannelId, …)`, carrying a
   `Continue` button (or, for a one-beat scene, the choice row directly).
   **Store `dm_channel_id` on the row** — it is load-bearing: *every* later beat
   is posted into it with the bot token (§3.2), never via an interaction
   webhook, so nothing in the sequence depends on a token that expires.
8. Mark the row `status = 'in_progress'`, `current_beat = 0`, `channel = 'dm'`.
   The rest is driven by button clicks (§3): each click posts the next beat as a
   fresh message and the sequence just waits, indefinitely, between clicks. The
   last beat's choice sets `completed_at`, flips `status` to `complete`, writes
   the keepsake (§4.2), and releases any `queued` sibling.

Everything after step 1 is best-effort: a failure leaves a claimed
`in_progress` row that §2.4 / §8 can resume or abandon, never a re-send. Because
there is no expiry, an `in_progress` row that never advances is a *normal*
resting state, not an error — the user simply hasn't clicked `Continue` yet.

### 2.3 The hard constraint: a shared guild

A bot can only DM a user who **shares a server with it** (or who has "direct
messages from server members" on for a shared server). This app is dual-install
(`integration_types: [0, 1]`) — a user who added it only as a **user app** and
never joined a server with the bot **cannot be DMed**. `openDmChannel` or the
POST returns `403 Cannot send messages to this user`.

That is not an error state — it's expected for a chunk of the user base.
Handling:

- Mark the `bond_scene_progress` row `pending_dm`.
- **Inline fallback (§2.4).**
- Optionally, once per user, a soft nudge appended to a `/roam` / `/meet` result
  or the `/affinity` footer: *"📨 {firstName} tried to reach you privately —
  add the bot to a server with you to get these."* **As built** this is not a
  throttled nudge on an unrelated message — it is the reply to a failed press of
  the resume button (§2.4), which is the moment it is actually useful, so no
  timestamp is stored.

### 2.4 The resume button — the *only* place anything is ephemeral

A DM is the **only** home a scene ever has. It persists there, it can be
re-read, and it is the thing the feature exists to deliver. There is no
ephemeral rendering of a scene and no second copy of one anywhere.

Ephemeral is used for exactly one thing: a **button** that puts a stalled scene
back into the DM where it belongs.

**When it appears.** A row is offered the button when a beat is *owed* and did
not land — `status = 'pending_dm'`. Three things produce that state:

| Cause | Row afterwards |
|---|---|
| Beat 0 never went out — no shared guild (§2.3), DMs closed, bot offline, `DISCORD_TOKEN` unset, Discord 5xx | `pending_dm`, `current_beat` NULL |
| A later beat's POST failed mid-walk — the ACK had already stripped the button the user clicked, so nothing live remains in the DM | `pending_dm`, `current_beat` = last beat actually seen |
| A claim stranded by a database failure before the scene started | `queued`, never surfaced directly — delivery is attempted instead, which tells a stranded claim apart from one legitimately waiting its turn (§8.4) |

An `in_progress` row is **never** offered the button: its `Continue` is sitting
in the DM and works indefinitely, so a second way in would duplicate a live
conversation. A `complete` row is done with.

**Ordering — one owed scene per character, lowest level first.** `pending_dm`
holds a character's slot exactly as hard as `in_progress` does (§2.5, §8.4). A
scene is written assuming every scene below it has been read — Devoted opens on
a history Acquaintance established — so a level the user hasn't got to yet
blocks the ones above it whether it is waiting on a click or on a delivery that
failed. A user the bot can't DM who climbs Ren to Devoted therefore ends up with
**one** `pending_dm` row (Acquaintance) and four `queued` behind it, not five
competing offers; finishing each one releases the next. Different characters
never block each other, so several may be owed at once — the button offers the
most recently claimed of them, one per command.

**What it looks like.** At the top of the user's next `/roam`, `/meet` or
`/affinity`, an ephemeral follow-up (`flags: 64`) carrying one line and one
button:

> 📨 **Ren** left you a message. · **[Open it]**

It is an envelope, not a preview — it deliberately reveals nothing about the
scene, because the whole premise is that the scene is read in private. One per
command, newest first, so a burst of level-ups can't wall off the encounter the
user actually asked for.

**What pressing it does.** `bond:resume:<charId>:<levelKey>:x`. The ACK
**disables** the button rather than stripping it (it is the only thing on its
message, so removing it would leave a bare line with no account of what
happened; greyed out it reads as *done* and can't be pressed twice). Then, off
the interaction:

- `current_beat` NULL → run delivery from the top, posting beat 0 into the DM.
- otherwise → re-post the one beat that was owed, and set the row back to
  `in_progress`.

Either way the user gets an ephemeral confirmation — *"Sent — Ren's message is
in your DMs."*

**When it can't work.** The bot can only DM someone it shares a guild with, and
this app is dual-install, so a user who added it only as a user app cannot be
reached at all (§2.3); nor can one who has "direct messages from server members"
switched off. The press fails, and the reply says so in the one way that helps:

> 📬 **Ren** tried to reach you privately, but I can't message you.
> Add the bot to a server you're in — or allow direct messages from server
> members — then press this again. *The message will still be here. Nothing is
> lost.*

That is the honest position and it is worth stating plainly: **this feature
needs the guild install.** Without it a user never reads a scene. Nothing is
destroyed while that's true — the row stays `pending_dm` forever, no expiry, the
keepsake ungranted but unclaimed, and the button returns on every command — so
the moment they share a server with the bot, the backlog is still waiting. But
it is a wall, not a graceful degradation, and the copy above exists to make it a
wall the user can climb rather than a silence they never explain.

### 2.5 One at a time

If a user crosses two levels with different characters in quick succession
(possible — different `/roam` and `/meet` flows), each is its own
`bond_scene_progress` row and its own DM. That's fine — they're distinct
conversations. What must not happen is **the same character** starting a second
scene while the first is still `in_progress`: the newer row is `queued` and
released on completion — see §8.4.

---

## 3. Scene shape & the Continue button

### 3.1 Anatomy

A scene is a **sequence of 1–4 beats** plus an optional **final choice**. Each
beat is its **own DM message** (`content`, ≤ ~1200 chars, well under Discord's
2000) — messages are never edited over the top of each other, so the whole scene
stays in the DM as a back-readable exchange. Beats `0..n-2` carry a single
`Continue` button; the last beat carries either nothing (scene ends) or a
**2–3 button choice row** (§4.1). A one-beat scene is just the last beat.

**One click → one new message.** Clicking `Continue` on beat *k*:

1. strips the button from beat *k*'s message (its text is untouched — it stays
   in the log as part of the conversation), and
2. **posts beat *k+1* as a new message** into the DM, with its own `Continue`
   (or the choice row).

**No expiry.** Every beat is posted with the **bot token** into the stored
`dm_channel_id` — not through the interaction webhook — so a beat's `Continue`
button keeps working indefinitely. The user can click through in one sitting or
answer beat 1 today and beat 2 next week; the button is just sitting in the DM
either way. `deliverBondScene` never re-sends and never times out a row.

```
custom_id grammar (fits Discord's 100-char limit):
  bond:next:<charId>:<levelKey>:<nextBeatIndex>
  bond:choice:<charId>:<levelKey>:<choiceKey>
levelKey: a short slug per level — acq | fri | cfr | con | dev | sol
```

`<userId>` is **not** in the `custom_id` — the interaction already carries the
clicker (`req.body.user.id` in a DM, `member.user.id` on the ephemeral resume
message).
The handler ignores clicks whose `bond_scene_progress` row doesn't belong to the
clicker.

### 3.2 Handler — `app.js` component router

New branch next to `meet` / `roam` / `resp`:

```js
if (action === 'bond') {
  const [kind, charId, levelKey, arg] = rest;      // kind: 'next' | 'choice'
  // 1. load the bond_scene_progress row for (userId, charId, level(levelKey))
  // 2. reject if missing / not this user / stale beat index (§3.3)
  // 3. ACK the click:  res.send({ type: 7 /* UPDATE_MESSAGE */,
  //                               data: { components: [] } })
  //    → strips the button from the clicked message, keeps its text
  // 4. post the next message with the BOT TOKEN into row.dm_channel_id:
  //      kind === 'next'   → postChannelMessage(dm, { content: beat[arg],
  //                            components: [ continue | choiceRow ] })
  //      kind === 'choice' → postChannelMessage(dm, { content: closingLine })  // no components
  //                          + persist choice_key (§4.3)
  // 5. advance current_beat; on the last beat set status='complete',
  //    completed_at=now(), and grant the keepsake (§4.2)
}
```

Step 3 (`UPDATE_MESSAGE`, `components: []`) is the only thing that uses the
interaction, and it fits well inside the 3-second ACK window. Step 4 is a plain
bot-token POST with no deadline — it is what makes the sequence outlive the
interaction token. If step 4 fails (Discord 5xx), the row's `current_beat` is
unchanged; recovery is §8.2 (a `/bonds` "▸ Continue" re-post), never an
auto-retry.

Stripping the button in step 3 makes each `Continue` single-use at the Discord
level; `current_beat` (§3.3) is the backstop for a click that races the edit or
replays an old `custom_id`.

`sendFollowup` is used in this handler for exactly one thing: answering the
**resume** button about the mechanism — that it sent, or why it couldn't (§2.4).
Scene content never travels that way.

### 3.3 Double-click / replay safety

The row stores `current_beat`. An incoming `bond:next:…:<n>` is honoured only if
`n === current_beat + 1`; anything else is a stale or duplicate click and gets a
bare `UPDATE_MESSAGE` (`components: []`) and **no new post**. `choice` is
honoured only once — after `choice_key` is set, further choice clicks get the
same bare ACK and post nothing. This makes every button idempotent regardless of
how long ago it was rendered — important precisely because buttons here never
expire.

### 3.4 Pacing touch (optional)

Before beat 0, and before each posted beat, fire `POST /channels/{id}/typing`
(no body) so the DM shows the bot "typing…" for a second. Pure flavour; skip it
for the resume button's own ephemeral reply (interactions can't show a typing
state).

---

## 4. Ideas to expand on — deepening the relationship

The user asked for directions beyond "a scene + a Continue button." These are
ordered roughly by value-to-effort. **§4.1 (closing choice) and §4.2 (keepsake)
are part of the core feature;** §4.3 is recommended; the rest are opt-in.

### 4.1 A closing choice in the character's response vocabulary

The last beat ends on a **2–3 button choice** drawn from the same emotional
palette as encounters — Kind / Playful / Bold (Cold for the six volatile
characters, matching `negative-affinity`'s 4th slot). Example, Kaito at
`Friend`:

> *"…so that's the shift rota sorted. You didn't have to stay for all that."*
> **[Tell him you wanted to]** · **[Say the company was decent]** · **[Ask what he's doing after]**

Each choice gets its **own authored closing line** from the character. The pick
is acknowledged immediately and **remembered** (§4.3). It does **not** move
affinity — it's tone, not score.

### 4.2 Keepsakes — core

Finishing a scene leaves the user a **keepsake**: a memento tied to that
character and that level — an emoji plus one line in the character's voice
(*"🧣 The scarf he lent you and never asked back."*, *"📷 A blurry photo neither
of you meant to keep."*). Written to `bond_keepsakes` (§6) the moment
`completed_at` is set — one per scene, so a maxed-out bond has a set of six.

Keepsakes are the **thing the user takes away** from the sequence, and the only
tangible collectible in a game that otherwise hides progression behind a heart
bar. Shown in `/bonds <character>` (§4.6) as a small list; optionally the newest
one trails the level line in `/affinity`. They are never spent, traded, or
scored — they're a record of a moment. Content lives in each scene's `keepsake`
field (§5.1), which every scene is required to carry, so every completion
grants something.

### 4.3 Remembered choices → dialogue callbacks

The §4.1 choice writes a small flag: `bond_scene_progress.choice_key`. Later
`/roam` / `/meet` dialogue can react to it by adding a `when` dimension to the
existing conditional-dialogue system:

```js
dialogueWhen: [
  { when: { bondChoice: 'friend:stayed' },
    dialogue: { warm: ["\"You said you wanted to stay, that time. I think about that.\""] } },
]
```

`DIALOGUE_WHEN_DIMENSIONS` in `constants/characters.js` gains `bondChoice`; the
matcher gains a lookup of the user's `choice_key`s for that character. Low
volume, high payoff — the relationship visibly *remembers*.

### 4.4 Scenes that reference real history

Author scene lines with `fillTemplate` placeholders so each delivery is
grounded in that player's run:

| Placeholder | Source |
|---|---|
| `{timesMet}` | `character_relationships.times_met` |
| `{house}` / `{firstName}` | `constants/characters.js` |
| `{favResponse}` | the character's `+2` type from `affinityByResponse` — "you always did lead with a joke" |
| `{lastMoment}` | `getLatestEncounterMilestone(userId, charId)` → the `hint` template already used by `describeBoost` |
| `{since}` | humanised `now − last_interaction_at` — "It's been a while" vs "Twice this week" |

### 4.5 Time-of-day variant

Reuse the `dialogueWhen` `time` bucket infra: a scene can carry an `evening`
variant so a late-night level-up reads differently. Same `TIME_BUCKETS`, same
`TZ` env var the encounter dialogue already uses. Optional per scene — most
won't need it; the romantic tiers (`Confidant`+) benefit most.

### 4.6 `/bonds character:<name>` — the journal and the replay gallery

**Built.** `/bonds` gains an optional `character`. Given one, it answers
ephemerally with what you have finished with that person: each completed scene
by level, with the keepsake it left, in ladder order.

**Replay unlocks per scene, the moment that scene is finished — there is no
character-wide gate.** Every completed level offers itself for replay straight
away; nothing about a level below Soulbound is any less replayable than
Soulbound itself. (An earlier version of this spec gated the whole gallery
behind that character's Soulbound scene, on the theory that browsing unpicked
endings turns every choice into a preview of itself. That's been dropped: the
points still never re-count and the pick you actually made is still the only
one written to `choice_key`, so nothing about *replaying* changes the
relationship — only *finishing new scenes* does, same as always.)

**A replay is the original interaction again.** It is not a preview or a
gallery page — it is the same beats, the same `Continue` button, the same
choice row at the end, posted for real into the player's DM at the same
one-message-per-click pace as the first time, with `handleBondReplayClick`
(`bondScenes.js`) calling the exact same `renderBeat` / `renderClosing` a live
scene uses. Picking an ending during a replay shows that option's real
authored closing line — including one not picked the first time — with
nothing marking which was the original; playing it again *is* playing it
again, not reading a diff of it.

The custom_id grammar gets four more kinds for this, all under `bond:` (§3.1):

```
  bond:replay:<charId>:<levelKey>:x        journal button — starts a replay, confirmed
  bond:replaystart:<charId>:<levelKey>:x   the closing DM message's own button — silent
  bond:rnext:<charId>:<levelKey>:<beatIndex>    pages a replay forward
  bond:rchoice:<charId>:<levelKey>:<choiceKey>  ends a replay on a pick
```

**The scene's own closing DM message carries a `🔁 Replay this scene` button**
(`bond:replaystart`), so a player can run the scene again right where they just
finished it, without typing `/bonds character:<name>` at all. Clicking it ACKs
with `DEFERRED_UPDATE_MESSAGE` — no change to the closing message at all, button
included — so it stays clickable for another replay whenever; then beat 0 goes
out as a **new** message via the bot token, same as any beat. `rnext` /
`rchoice` clicks on a replay's own messages ACK with `UPDATE_MESSAGE`
(`components: []`), stripping the button just used exactly like a live beat,
before posting the next beat or the closing line as another new message.
Nothing here needs a followup: the new message landing in the DM is the only
confirmation required.

The journal's `bond:replay` button is the one exception, because `/bonds` might
not have been run in the DM at all — it defers
(`DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE`, ephemeral), then edits that placeholder
into `📨 Sent — …'s scene is in your DMs.` once beat 0 either lands or doesn't,
the same shape as the resume button's confirmation (§2.4).

**A replay writes nothing to `bond_scene_progress` or `bond_keepsakes`.** The
row it's built from is read-only here — `getBondSceneRow` fetches it to confirm
the scene is finished and to find `dm_channel_id`, and nothing in this path
ever calls `advanceBondScene` or `completeBondScene`. That is load-bearing
rather than incidental: `choice_key` is what later dialogue reads (§4.3), so an
answer a player could quietly re-roll on a replay would make those callbacks
farmable. `complete_bond_scene`'s `choice_key IS NULL` guard (§6) is the
backstop even so — a bug in the replay path could not overwrite a recorded
answer if it tried.

Ownership and completion are both re-checked on **every** click rather than
trusted from the custom_id the click came in on — `getBondSceneRow` is scoped
to the clicking user's id, so a forged `characterId`/`levelKey` for someone
else's row, or for a level that user hasn't finished, resolves to nothing and
nothing is posted.

*Not built:* the level bar and the "Moments together" tally this section
originally also described. Both already exist in `/affinity`.

### 4.7 The Soulbound scene is different

At the top level, the scene is **longer (4 beats)** and the closing choice is a
genuine two-way beat — a confession answered, or held. Both paths get a full
authored ending, and the pick is a permanent `choice_key` that the `bound`
dialogue tier reads forever. It's the one scene allowed to feel like a finale.

### 4.8 Rift scenes (only if `negative-affinity` ships)

That spec's negative crossings — `Frenemy` / `Rival` / `Adversary`, then the
forked deep levels — are natural DM material: a cold message instead of a warm
one. The **Turn of Events** fork itself could be delivered as a DM with the
Accept / Reject buttons rather than (or as well as) an encounter. Cross-referenced
there, specified there, not here.

### 4.9 Consent & first-contact

The **first bond DM a user ever gets** opens with a one-line frame — *"{firstName}
sent you a message."* — and the first beat carries, alongside `Continue`, a
**[Don't message me like this]** button that sets `bond_dms_enabled = false`
(§6). Re-enable via a `/bonds dms on|off` subcommand. This is both etiquette and
a Discord-ToS-safe posture: bot DMs must be wanted.

### 4.10 Small touches

- **Typing indicator** before each beat (§3.4).
- **Streak acknowledgement** — the opening beat's `{since}` (§4.4) lets a scene
  greet a returning player differently from a daily one.
- **No public broadcast, ever.** Nothing about a level-up is posted to a
  channel. The game hides its numbers; this stays between the two of you.

---

## 5. Content model

### 5.1 Where it lives

A new pool on each `constants/dialogue/<id>.js` default export, beside
`dialogue` / `approach` / `responses`:

```js
bondScenes: {
  acquaintance: {
    beats: [
      "…",                       // beat 0 — posted on level-up
      "…",                       // beat 1 — posted when beat 0's Continue is clicked
    ],
    choice: {                    // required — trails the last beat
      prompt: "…",
      options: [
        { key: 'kind',    label: "Tell him you meant it", style: 3, close: "…" },
        { key: 'playful', label: "Laugh it off",          style: 1, close: "…" },
        { key: 'bold',    label: "Hold his gaze",         style: 4, close: "…" },
      ],
    },
    keepsake: { emoji: "🧣", line: "The scarf he lent you and never asked back." },
    when: [ /* optional time-bucket variants, same shape as dialogueWhen */ ],
  },
  friend:        { … },
  closeFriend:   { … },
  confidant:     { … },
  devoted:       { … },
  soulbound:     { beats: [ …4… ], choice: { … }, keepsake: { … } },
}
```

Level key = camelCase of the `RELATIONSHIP_LEVELS` name. **`beats` (1–4
strings), `choice`, and `keepsake` are all required** — every scene ends on a
choice and grants a keepsake. `when` is optional.

### 5.2 Scene vars for `fillTemplate`

`{firstName} {house} {timesMet} {favResponse} {lastMoment} {since}` — resolved
in `bondScenes.js` at delivery, list frozen in `constants/publicEncounters.js`
alongside the existing placeholder set so `validateContent` can check them.

### 5.3 Full coverage, and no content fallback

Every character has all six levels authored — 156 scenes — and §5.4 enforces it
at build time. There is deliberately **no** character-neutral pool to fall back
on when one is missing.

A scene is one continuous exchange in one voice, so a fallback's real effect
would be to turn a missing level from a build failure into a silent downgrade to
house style, which is the one failure mode a private scene can't survive. Better
that the build stops than that a character sends somebody else's words under
their own name.

The consequence to plan around: a character added to the roster can deliver no
scenes until theirs are written, and because a claimed row is never re-claimed
(§6), any level crossed in that window is lost for that player for good. Write
the six scenes in the same change that adds the character — §5.4 will stop you
either way. `getBondScene` resolving to nothing is handled as §8.8.

(Distinct from §2.4, which is about *delivery* rather than content: a scene the
bot couldn't post is re-offered as a button, never rendered somewhere else.)

### 5.4 Validation

`constants/validateContent.js` gains a `bondScenes` pass, mirroring the existing
tier-pool checks:

- every level key is one of the six known slugs → else **warning** "never
  delivered";
- `beats` present, 1–4, every entry a non-empty string;
- `choice` present, with a `prompt` and 2–3 `options`, each option having a
  non-empty `close` line;
- `keepsake` present, with a non-empty `emoji` and `line`;
- each `choice.options` label ≤ `MAX_BUTTON_LABEL_LENGTH` (**error** — same
  30-char cap as response buttons, build-breaking, per the existing rule);
- `choice.options[].key` unique within the scene; `style` ∈ {1,2,3,4};
- every `{placeholder}` in any beat / prompt / close / keepsake line is in the
  §5.2 set → else **error** (a typo ships as empty string today);
- a character missing `bondScenes` entirely, or missing a level → **error**;
  with no content fallback (§5.3) that level-up would deliver nothing at all;
- no beat, closing line or keepsake line is reused anywhere in the game — two
  characters sending the same words at the same level would give away that the
  moment is not really theirs.

### 5.5 Voice and the intimacy ladder

**The intimacy ladder** — the rule every scene in the game is written to, and
the reason these live in a DM rather than in `/roam`. Nobody else is in the
room, nothing here is ever posted to a channel, and the player reached this
level by climbing to it, so a scene is allowed to be closer than anything the
public commands will ever show — and it should be. A scene that reads like it
could have been said in a corridor has wasted the DM.

The closeness escalates with the level, and each step has to be past the last:

| Level | What the scene is |
|---|---|
| Acquaintance | Being messaged at all is the intimacy. Nobody has this number. They found a reason; the reason is thin. |
| Friend | An admission of having paid attention — they know something about you they had to have been watching to know. |
| Close Friend | Something private handed over: an object, a photo, a habit nobody else gets told about. First real physical closeness. |
| Confidant | The thing they don't tell people, at an hour they wouldn't tell it at. Sent because you are the one who gets to know. |
| Devoted | Touch, proximity, being kept. They act rather than hint, and the near-confession is right under it. |
| Soulbound | Said outright, and answered. Four beats and a real fork — both endings authored in full, neither one the wrong one. |

What that is **not**: explicit. The heat is in restraint — a hand not let go of,
someone crossing campus at three in the morning — never in anything graphic.
Keep it at the register of the game's own romance (longing, closeness, being
chosen) and let the reader fill in the rest.

**Voice.**

Every scene is written from `constants/dialogue/reference.md` — the same source
of truth the encounter dialogue uses. **Leo, Shion, Taiga, Romeo, Yuri, Ritsu**
get scenes that stay thorny even while warming (their `Cold` 4th slot in
`negative-affinity` is the tone reference); the warmth is in what they *do*, not
what they admit. `Heebie-Jeebie House` is Shion's hangout — never the
"Exciting/Waku-Waku House" translation variant.

**The intimacy ladder** — the rule every scene is written to. A bond scene is a
private message. Nobody else is in the room, nothing here is ever posted to a
channel, and the player reached this level by climbing to it, so these are
allowed to be closer than anything `/roam` or `/meet` will ever show, and they
should be. A scene that reads like it could have been said in a corridor has
wasted the DM. The closeness escalates with the level, and each one has to be a
step past the last:

| Level | What the scene is |
|---|---|
| Acquaintance | Being messaged at all is the intimacy. Nobody has this number. They found a reason; the reason is thin. |
| Friend | An admission of having paid attention — they know something about you they had to have been watching to know. |
| Close Friend | Something private handed over: an object, a photo, a habit nobody else gets told about. First real physical closeness, remembered rather than happening. |
| Confidant | The thing they don't tell people, at an hour they wouldn't tell it at. Sent because you are the one who gets to know. |
| Devoted | Touch, proximity, being kept. They act rather than hint, and the near-confession is right there under it. |
| Soulbound | Said outright, and answered. Four beats and a real fork. |

What that is not: explicit. The heat is in restraint, in a hand not let go of,
in someone crossing a campus at 3am rather than in anything graphic. Keep it at
the register of the game's own romance — longing, closeness, being chosen — and
let the reader fill the rest in.

---

## 6. Schema

One migration — next number is **`015`** (`014` is the atomic encounter-boost
functions).

### `bond_scene_progress`

One row per `(user, character, level)` — created when a scene is claimed,
carries it through delivery and the button walk, and is the idempotency guard.

| Column | Type | Purpose |
|---|---|---|
| `discord_user_id` | TEXT | Who crossed |
| `character_id` | TEXT | With whom |
| `level_name` | TEXT | `RELATIONSHIP_LEVELS` name — the scene key |
| `status` | TEXT | `queued` (claimed, waiting behind an earlier scene — §8.4) \| `in_progress` (started, one or more beats left) \| `complete` \| `pending_dm` (can't DM yet — §2.4) \| `skipped_optout` \| `skipped_gone` |
| `dm_channel_id` | TEXT | The DM channel every beat is posted into (§3.2 step 4). Load-bearing, not just for recovery |
| `current_beat` | INT | Highest beat posted so far; drives §3.3. `0` right after beat 0 |
| `choice_key` | TEXT | The §4.1 pick, once made; NULL otherwise. Read by `bondChoice` dialogue (§4.3) |
| `completed_at` | TIMESTAMP | Set when the last beat / choice lands — flips `status` to `complete`, releases any `queued` sibling (§8.4), and is the keepsake's `earned_at` |
| `created_at` / `updated_at` | TIMESTAMP | |
| `PRIMARY KEY (discord_user_id, character_id, level_name)` | — | The `ON CONFLICT DO NOTHING` target — one scene per level, forever |

There is **no expiry column and no TTL**. An `in_progress` row is a valid
permanent state; only the once-daily recovery sweep (§8.2) ever touches an old
one, and only to re-post a beat whose POST had failed — never to close it.

`record_bond_scene()` — `INSERT … ON CONFLICT DO NOTHING RETURNING *` — is the
claim in §2.2 step 1. RLS: same policy shape as `character_relationships`
(`discord_user_id = current_user_id()`), service-role for the bot.

### `bond_dms_enabled` on `user_activity` (or a tiny `user_prefs` row)

| Column | Type | Purpose |
|---|---|---|
| `bond_dms_enabled` | BOOLEAN NOT NULL DEFAULT true | §4.9 opt-out |

### `bond_keepsakes`

Every completed scene leaves the user a **keepsake** — a small memento in the
character's voice (§4.2). One row per `(user, character, level)`, written when
`bond_scene_progress.completed_at` is set.

| Column | Type | Purpose |
|---|---|---|
| `discord_user_id` | TEXT | Who earned it |
| `character_id` | TEXT | From whom |
| `level_name` | TEXT | Which scene granted it |
| `emoji` | TEXT | The item glyph — `🧣`, `📷`, `🔖` |
| `line` | TEXT | One line naming it, in that character's voice — *"The scarf he lent you and never asked back."* |
| `earned_at` | TIMESTAMP | = the scene's `completed_at` |
| `PRIMARY KEY (discord_user_id, character_id, level_name)` | — | One keepsake per scene; bounded at ≤ 6 per bond |

Same class as `encounter_milestones` — bounded, player-visible progression, RLS
by `discord_user_id`, never pruned. Surfaced in `/bonds <character>` (§4.6) and
optionally as a line in `/affinity`. The `line` + `emoji` come from the scene's
`keepsake` field in the character's `bondScenes` pool (§5.1), and are **copied
into the row when earned** rather than looked up later — so re-authoring a
character's scene never rewrites a keepsake somebody already has.

### Retention

`bond_scene_progress` and `bond_keepsakes` are **kept forever** — they're the
record of what the player has seen and earned, not analytics. Nothing to add to
`prune_*`.

---

## 7. Privacy

`PRIVACY.md` already covers per-user relationship data. Additions:

- A bot DM is user-visible outbound contact — it must be **opt-out-able** (§4.9)
  and never sent to a user who hasn't engaged (the trigger *is* engagement: they
  just completed a `/roam` or `/meet` response).
- Scene content is generic per level + light `fillTemplate` facts the user
  already knows about their own game. No new PII, nothing cross-user.
- `bond_scene_progress` is behind RLS like every other user table; there is **no
  anonymized view** and no analytics built on it.
- Nothing is posted publicly (§4.10).

---

## 8. Edge cases

1. **Two-level jump.** A large spent `/call` boost could take affinity from
   mid-`Acquaintance` past all of `Friend` into `Close Friend` in one response.
   `leveledUp` compares indexes, so detect the span and **run the highest
   crossed level's scene only**. For v1 (recommended): don't claim rows for the
   skipped levels at all — they're simply never shown, and their keepsakes never
   granted. Alternative: claim them `complete` with `completed_at = now()` and a
   keepsake, so `/bonds` recap lists them as auto-passed. Pick one; never start
   two sequences at once.
2. **A beat fails to post** (Discord 5xx on step 4). The ACK already stripped
   beat *k*'s button, so there's nothing in the DM to re-click. `current_beat`
   is unchanged, so the row still knows where it is. Recovery: `/bonds
   <character>` shows a **"▸ Continue with {firstName}"** entry for any
   `in_progress` row and re-posts the pending beat into `dm_channel_id` with the
   bot token. A once-daily sweep can do the same unprompted for rows untouched
   for >24h. No automatic retry inside the failed request.
3. **User waits a very long time.** Expected and supported — the button is a
   bot-token message component with no TTL. A click weeks later posts the next
   beat normally. Nothing to handle.
4. **Next level lands while a scene is unfinished.** User is on beat 1 of the
   `Friend` scene with Ren, runs another `/meet`, crosses into `Close Friend`.
   The `Close Friend` row is claimed (`status = 'queued'`) but **not started**
   while an earlier-level row for the same character is still `in_progress` —
   `deliverBondScene` checks for one first. When the `Friend` row flips to
   `complete`, a light release step (end of the `bond:` handler, or the daily
   sweep) starts the oldest `queued` row for that character. No time limit — if
   the user never finishes `Friend`, `Close Friend` waits. Different *characters*
   never block each other (§2.5).
5. **User-app-only install** (no shared guild). Every DM 403s → every scene
   fails, and the resume button (§2.4) explains what to add. **The feature does
   not work for these users until the guild install exists** — nothing is lost
   meanwhile, but nothing is read either.
6. **`DISCORD_TOKEN` unset / bot offline.** `openDmChannel` throws → `pending_dm`
   → the resume button, which will keep failing until it is set. Same as (5).
7. **Interaction double-fire** (Discord retries a component interaction). §3.3
   beat-index check makes every button idempotent; §2.2 step-1 claim makes
   delivery idempotent.
8. **Character deleted from the roster** between claim and delivery.
   `getBondScene` returns nothing → mark the row
   `skipped_gone` and stop. (Won't happen in practice — the roster is static —
   but the funnel shouldn't throw.)
9. **Affinity edited down then back up in the DB.** The `bond_scene_progress` PK
   means each level's scene fires **once ever**, not once per crossing. Re-earning
   a level shows nothing. Acceptable — the scene is a first-time moment.
10. **`npm test`.** `deliverBondScene` is skipped under `npm_lifecycle_event ===
   'test'` the same way `gateway.js` / the scheduler are, and unit-tested
   directly with a mocked `discordRest`.

---

## 9. Files touched

| File | Change |
|---|---|
| `db/migrations/015_bond_scenes.sql` | new — `bond_scene_progress`, `bond_keepsakes`, `record_bond_scene()`, `complete_bond_scene()`, `bond_dms_enabled`, RLS |
| `db/supabase.js` | `recordBondScene`, `getBondSceneRow`, `listBondScenes`, `advanceBondScene`, `completeBondScene` (writes `completed_at` + the keepsake in one statement), `getBondKeepsakes`, `getBondDmPref`, `setBondDmPref`, `listResumableBondScenes` |
| `db/SCHEMA.md` | document the new table(s) |
| `discordRest.js` | `openDmChannel(userId)`; `postChannelTyping(channelId)` if §3.4 |
| `storage.js` | `recordResponse` returns `previousLevel` / `leveledUp` |
| `db/supabase.js` `updateAffinity` | return (or expose) the pre-write affinity |
| `encounters.js` | `buildResponseResultMessage` returns `levelUp` |
| `bondScenes.js` | new — `deliverBondScene`, `getBondScene`, beat rendering, var resolution |
| `app.js` | `resp` handler fires `deliverBondScene`; new `bond:` branch in the component router (ACK + bot-token post, §3.2); `/bonds` gains `character` arg (recap + "▸ Continue") + `dms on\|off` (§4.6, §4.9) |
| `commands.js` | `/bonds` option + subcommands |
| `constants/dialogue/<id>.js` | `bondScenes` pool (beats + `choice` + `keepsake`) — 26 files, all six levels each |
| `constants/publicEncounters.js` | freeze the §5.2 placeholder list |
| `constants/validateContent.js` | `bondScenes` validation pass (§5.4) |
| `constants/characters.js` | `bondChoice` in `DIALOGUE_WHEN_DIMENSIONS` (§4.3, only with that feature) |
| `test/` | `bond-scenes.test.js` (delivery, idempotency, beat walk, resume/recovery), `validate-content.test.js` extension |

No dependency changes. No intent changes.

---

## 10. Non-goals

- **Do not move affinity from a scene.** Not on a choice, not on completion.
  `/roam` and `/meet` are the only affinity movers — keep that invariant.
- **Do not post anything to a channel.** No public level-up announcement, no
  "X and Y are now Close Friends." The game hides its numbers.
- **Do not gate `/roam` or `/meet` on finishing a scene.** A stalled or
  undelivered scene never blocks play; it queues or falls back.
- **Do not build a dialogue engine / branching tree.** Beats are linear; the one
  choice is a flat 2–3 options with authored closers. If scenes ever need real
  branching, that's its own spec with its own schema.
- ~~**Do not require the guild install to ship.**~~ **Reversed as built.** The
  original non-goal assumed an ephemeral rendering to fall back on; §5.3 and
  §2.4 removed it, so the guild install is now a **hard prerequisite**. A user
  the bot can't DM reads nothing — the resume button explains what to add and
  the scenes wait indefinitely, but they do wait. Set it up before release; see
  [`channel-call-response-feature.md`](./channel-call-response-feature.md).
- **Do not add art in v1.** Text only. `imageComposition.js` could render a
  scene card later; it's not needed for the mechanic and multiplies the asset
  and compose-time cost.
- **Do not reorder or rename `RELATIONSHIP_LEVELS`** to make keys prettier — the
  level names are load-bearing across `game.js`, `/affinity`, dialogue tiers.

---

## 11. Effort & phasing

**Phase 1 — mechanic + core (~3–4 days).** Migration `015`
(`bond_scene_progress` + `bond_keepsakes`), the trigger plumbing (§1),
`bondScenes.js` + `deliverBondScene`, `openDmChannel`, the `bond:` component
branch (ACK + bot-token beat post, no-expiry sequence), the `queued`/release
logic, the closing **choice** (§4.1) and the **keepsake** grant (§4.2), the
the resume button (§2.4), validation, tests.

**Phase 2 — per-character scenes (content-bound).** 156 scenes — 1–4 beats plus
a choice and a keepsake line each, from `reference.md`. Each is an isolated edit
to one `constants/dialogue/<id>.js` and needs no code change. This is the bulk
of the total effort and it's writing, not engineering. Landed in full before
release, which is why §5.3 has no fallback in it.

**Phase 3 — depth (opt-in, ~1–2 days each).** `bondChoice` dialogue callbacks
(§4.3). ~~`/bonds <character>` recap + replay (§4.6)~~ — built. History-grounded
`fillTemplate` vars (§4.4). Evening variants (§4.5). Rift scenes ride
`negative-affinity` if/when it ships (§4.8).

Risk is low: the trigger is a read the code already does, delivery is
best-effort and fully isolated from the interaction reply, the sequence uses
only the bot token so nothing in it can time out, and a scene that fails to post
is re-offered as a button (§2.4) rather than being lost. The one real
prerequisite is the guild install — without it a scene is never read, though it
is never destroyed either.
