# Coding Standards

How code in this repo is written. Drawn from the patterns the `missions/`
split settled on (the reference implementation for a feature module), plus
the `constants/dialogue/` per-character split.

These are rules for **code**. Character dialogue and other authored content
have their own rules: `constants/dialogue/reference.md` and the `voice-check`
skill.

When a rule here and existing code disagree, the rule wins for new code. Fix
old code only when you're already touching it.

---

## 1. Module layout

**1.1 Split a feature by seam, not by size.** Once a feature module gets too
big to navigate, split it into a directory with one file per seam: one
responsibility, or one command's lifecycle. `missions/` is the model: `player.js`
(Accept, `/mission`, `/docs`), `posts.js` (the channel side), `admin.js`,
`dossier.js`, `riddle.js`, `resets.js`, `houseChange.js`. Code that only exists
to serve one handler lives next to that handler.

**1.2 Every file opens with a header comment** that says what the file holds
and, if it helps, what it deliberately doesn't. Point to the design doc in
`docs/` where one exists.

```js
// Scheduled missions: /riddle, the riddle mission's answer command.
// See player.js for the module map.
```

**1.3 One file holds the module map.** The entry file (`missions/player.js`)
lists every sibling and what it owns. The other files point back to it
instead of repeating it. Update the map when you add, rename, or move a file.

**1.4 `shared.js` is a leaf.** It holds only what two or more siblings use,
and it never imports from a sibling. A helper used by one file stays in that
file.

**1.5 Sibling imports go one way.** A sibling may import from another
(`houseChange.js` → `player.js`, `admin.js` → `posts.js`), but never in a
cycle. If two files need each other, move the shared piece into `shared.js`.

**1.6 No compatibility shim after a split.** Delete the old file and point
every importer at the new module that owns the export (`app.js`, the
scheduler, tests). The only exception is a path a test intercepts with
`mock.module`: keep a barrel there, because moving the path silently breaks
the mock. `constants/dialogue.js` is one: it re-exports
`constants/dialogue/index.js`, and `test/dialogue-beat-pairing.test.js`
mocks it.

**1.7 Moving code means updating every reference to it in the same change.**
Comments, README's project tree, and test comments that name
`file.js functionName` all get updated. A stale path in a comment counts as a
bug.

**1.8 Mark sections inside long files** with a full-width divider:

```js
// --- /mission ---------------------------------------------------------------
```

## 2. Layering

**2.1 Content and pure logic live in `constants/<feature>.js`.** That covers
line pools, labels, rates, time windows, and pure helpers (`rollHouse`,
`localDayKey`, `busyLine`). Handler modules import them. They never define
user-facing copy pools inline. A one-off error string in a handler is fine.

**2.2 Only `db/supabase.js` talks to the database.** Handlers call its named
functions (`claimMission`, `getAcceptedMission`) and never build queries
themselves. Rules that need to hold up under concurrency belong in the RPC.
A client-side copy of a rule (`houseChangeBlocker`) is only there for the UI,
and its comment must say the RPC re-checks.

**2.3 Bot-initiated Discord calls go through `discordRest.js`.** Everything
else answers the interaction.

**2.4 Never re-derive a shared constant.** Import `EPHEMERAL` from `utils.js`,
`canManageEncounters` from `publicEncounters.js`, and so on, rather than
defining a local copy. `utils.js` has a comment about the time this went
wrong.

## 3. Handler contract

**3.1 `app.js` is a router.** Handlers return data, and `app.js` sends it.
A handler never writes to the HTTP response itself.

**3.2 Slash-command handlers return `{ reply, afterReply }`.** `reply` is the
message data. `afterReply` is an async function or `null`.

**3.3 Component (button) handlers return `{ response, followup?, afterReply? }`.**
`response` is a complete interaction response (`type` + `data`).

**3.4 Side effects go in `afterReply`.** Activity tracking, usage counters,
reward writes, and channel edits run after the user already has their answer.
Run independent writes with `Promise.allSettled`, and pass the results to
`reportFailures(label)` so a failure still gets logged:

```js
afterReply: async () => {
  await Promise.allSettled([
    trackUserActivity(userId),
    trackCommandUsage(userId, "riddle"),
  ]).then(reportFailures("riddle solve"));
},
```

**3.5 Expected outcomes are return values, not exceptions.** No mission,
wrong mission type, on cooldown, already taken: each of these returns an
ephemeral reply. Use a guard helper that returns either the reply or `null`
(`missionTypeGuard`), and bail out early with
`if (guardReply) return { reply: guardReply, afterReply: null };`.

**3.6 Read the user id with `userIdOf(body)`.** It covers both guild
(`member.user`) and DM (`user`) interactions.

## 4. Time and testability

**4.1 Anything time-dependent takes `now = new Date()` as its last
parameter** and passes it down. Don't call `new Date()` or `Date.now()` deep
inside logic that a test needs to control.

**4.2 Keep in-process state resettable.** Any module-level cache or map gets an
exported clear function (`clearChancellorAudiences`,
`clearRiddleCooldowns`) so tests and the scheduler can reset it.

## 5. Errors and logging

**5.1 Prefix every log line with the feature tag**, e.g. `[missions]`,
`[sendFollowup]`. Log `err.message`, not the whole error object, and include
the ids you would need to find the row again (`guild ${guildId}`,
`Mission ${mission.id}`).

**5.2 Best-effort pieces degrade, the message survives.** When an optional
part fails (a thumbnail URL, a banked-reset count, a briefing reload), log
it, drop that part, and still send the core reply. If the failure was the
user's actual request, send a short ephemeral apology ("Something went wrong
picking that up. Try again?").

**5.3 Use `console.warn` for things that are suspicious but handled**
(permission re-check denials). Use `console.error` for failures and
`console.log` for scheduler bookkeeping.

**5.4 Scheduler passes never throw out of a slot.** Catch and log per item,
so one guild or one post can't stall the tick for everyone else.

## 6. Concurrency

**6.1 Run independent work in parallel, and say why it's independent.** Use
`Promise.all` when there's no data dependency, with a comment naming why
(see `runGuildMissionPass`, `sweepExpiredMissions`). Do sequential work
sequentially, without apologizing for it.

**6.2 Cap any fan-out to Discord.** Use `mapLimit` with a named concurrency
constant (`SWEEP_EDIT_CONCURRENCY`), never a bare `Promise.all` over an
unbounded list of edits.

**6.3 Assume shared buttons get clicked by the wrong person.** A public
button can't be disabled per user, so every click path has to be harmless
when it loses a race. Re-assert the right state on the losing path instead
of trusting that the winner's edit landed.

## 7. Comments

**7.1 Comments explain why, not what.** Write about the invariant, the race,
the Discord quirk, the design decision, or the alternative you rejected and
the reason. Don't narrate the code.

**7.2 Use JSDoc (`/** … */`) on exported functions whose contract isn't
obvious** from the name: what they return, when they return `null`, and what
they deliberately never do. Simple helpers get a `//` line or nothing.

**7.3 Cite where things come from.** Name migrations (`migration 025`), RPCs
(`change_errand_house`), docs (`docs/scheduled-missions.md`), and the
`file.js functionName` on the other end of a cross-module dependency.

**7.4 Spelling is American** in identifiers, comments, and copy (`color`, not
`colour`). This repo's source localization is American.

## 8. Formatting

There's no formatter config committed, so match what's around you:

- ES modules, named exports only. `export default` is reserved for the
  per-character data files in `constants/dialogue/`.
- 2-space indent, semicolons, trailing commas in multi-line literals, and
  Prettier-style wrapping at about 80 columns.
- **Match the file's quote style.** Root modules (`app.js`, `encounters.js`,
  `publicEncounters.js`, tests) use single quotes. `missions/` and most of
  `constants/` use double quotes. Don't mix the two within a file, and don't
  reformat a file just to switch.
- Group imports by source: third-party first, then `../utils.js`, then
  `../constants/*`, then the other root modules, then `../db/supabase.js`,
  then `./` siblings. Within a braced import, sort names alphabetically.
- `custom_id`s are colon-namespaced by feature: `mission:accept:<id>`,
  `mission:house:<id>[:docs]`.

## 9. Tests

**9.1 Use `node:test` + `node:assert`, and run with `npm test`.** It must pass
before and after every change.

**9.2 Mock at module boundaries, before importing.** Call `mock.module(...)`
for `db/supabase.js`, `discordRest.js`, and `imageComposition.js` first, then
`await import(...)` the module under test.

**9.3 Import from the module that owns the export,** e.g.
`../missions/riddle.js`, not a re-export.

**9.4 Delete mock members once nothing imports them.** A stub that's only there
to satisfy a graph that no longer exists (the old `composeFieldReport` mock
in `public-encounters.test.js`) is dead weight. Remove it in the same change
that removes the dependency.

## 10. Refactors

**10.1 Keep mechanical refactors behavior-neutral and in their own
commit.** Splits, moves, and renames go in their own commit, separate from
feature work, with `npm test` green and unchanged before and after.

**10.2 Write down structural changes where the code lives.** Record a split
or a new module layout in the module map (§1.3) and the file headers. A
`docs/` plan for a big migration is fine while the migration is underway.
Once it's done, delete the plan rather than keeping it as history; git
already has that.

**10.3 Leave no tombstones.** When a pool, layer or API is removed, delete
it outright. Don't leave comments saying what used to be there ("No
`fooPool` left: every line was moved…"), and don't keep validators or tests
that name the removed thing. Guard against a reappearance in general terms,
e.g. an allowed-keys check instead of one aimed at the old key.
