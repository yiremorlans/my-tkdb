# Spec: Gala Reinstatement Arc

Status: **design / not implemented**
Last updated: 2026-09-15

A new mission type gated behind the top two Inspector ranks (**Special
Inspector**, **Chancellor's Right Hand** — `constants/missions.js`
`INSPECTOR_RANKS`). Once a player qualifies, the Chancellor tasks them with
reviving the Gala. The player picks one house to sponsor, then works a
one-time, multi-stage arc of `gala` missions toward that house winning the
**Laurel Crown**.

This is a **personal track**: each qualifying player runs their own arc
against their own house choice. It is not a shared guild-wide race, and
completing it doesn't affect any other player's arc. This matches how
`house_progress` already works today (`discord_user_id, house` — no guild
scoping) — see §5.

---

## 0. Settled decisions (from design discussion)

- Gated on **rank alone** (Special Inspector or above), not on which house the
  player belongs to. `inspectorRank()` sums points across every house
  (`getMissionLogStats`), so this check is already house-agnostic.
- Not fronted by one specific character (originally considered: Ritsu, whose
  own high-affinity lines already reference "the reinstatement of the Gala"
  and Sinostra "wear[ing] the Laurel Crown" — `constants/dialogue/reference.md`
  lines 585, 631). Instead the arc's content draws from **whichever house the
  player picks**, using that house's existing roster — the same pattern
  `pickSignatureTargets`/`getHouseRoster` already use for errands, not one
  captain's dialogue file.
- Player picks a house **of their choice** — not necessarily their own MC
  house. The choice is **locked in** for the life of the arc (§3).
- New `MISSION_TYPES.GALA` entry, reusing the existing roll → post → accept →
  complete → reward plumbing in `missions.js` / `constants/missions.js`,
  rather than a standalone command flow.
- **One-time, multi-stage arc.** Fixed sequence of stages; once finished, it
  stays finished (no repeat, no reset).
- **Personal track**, not a guild-wide pool. Each player races their own
  chosen house's Crown independently of everyone else's choices.
- Points come from **`gala` completions**, a scored mission type of its own —
  not a bonus bolted onto errand/riddle/co-op.
- **No new command.** House selection and arc status are folded into the
  existing `/mission` command as an option (§1); filing progress reuses
  `/docs` (§2). This feature adds zero new command surfaces.
- **Board eligibility:** the shared per-guild board stays house-blind and
  first-click-wins, same as today. A `gala` mission can be Accepted by anyone,
  but the claim handler checks the accepter's own `gala_arcs` row. If they
  don't qualify (no arc, wrong house, or already finished), they are **not**
  bounced with a bare rejection — the claimed slot is converted in place into
  a normal errand/riddle/co-op for them, so nobody hits a dead end and no
  spawn is wasted. Only a matching, qualifying accepter actually gets the Gala
  briefing.

---

## 1. Starting the arc

No new command. A `house` option is added to the existing **`MISSION_COMMAND`**
(`commands.js`), the same shape as `/bonds dms:on|off` — an optional STRING
with `choices` for the 8 `HOUSES` values, not a subcommand, so bare `/mission`
keeps working exactly as it does today.

`handleMission` (`missions.js`) branches on it before the existing
assist/briefing logic, same position `wantsAssist` is checked today:

- **`/mission house:<house>`**
  - Requires rank ≥ Special Inspector (`inspectorRank(totalPoints).min >=
    180`). Below that: tell them the rank they need and where they stand.
  - No `gala_arcs` row yet → create one at stage 0, house locked to the
    choice, reply with the Chancellor's briefing (content TBD — see §7).
  - Row exists, same house → re-print current progress (stage, points)
    instead of restarting.
  - Row exists, **different** house → refused. The house is a one-time
    commitment, same spirit as Turn of Events' "permanent, cannot be undone"
    framing in the negative-affinity spec.
  - Row exists, `completed_at IS NOT NULL` → show the completed state (which
    house, when) rather than letting them start over.
- **`/mission`** (no options) — unchanged from today: the held mission's
  briefing, or `noMissionLine`'s status. Does **not** surface Gala arc state
  on its own, so a player with an active arc but no mission in hand isn't
  shown anything Gala-specific unless they pass `house:` again — same
  re-query, since that's cheap and keeps `/mission`'s bare-call behavior
  exactly as it is now rather than growing a second thing it reports on.

Not settled: whether an eligible-but-not-yet-started player gets a nudge
somewhere (e.g. in `noMissionLine` once they cross Special Inspector) rather
than needing to already know `/mission house:` exists. Flagging rather than
assuming.

---

## 2. Mission mechanics

`gala` missions spawn through the existing `spawnMission` roll, gated only at
Accept time (§0), so the spawner needs no guild-membership lookup. Concretely:

- `MISSION_TYPES.GALA = "gala"` added to `constants/missions.js`.
- New `WEIGHT_GALA` constant, folded into `rollMissionType()`'s total the same
  way `WEIGHT_COOP` is. Proposed default: **15**, pulled evenly off riddle and
  errand (45/45/10/15 → roughly 38/38/10/15 to keep the ratio close to
  today's). Not load-bearing — easy to retune once this is live, same as the
  co-op floor comment already invites.
- Spawn draws its house with `rollHouse()` same as every other type — it does
  **not** try to target a specific player's chosen house. That's what makes
  the guarded-accept-and-convert design in §0 necessary, and also what keeps
  the spawner simple.
- **Mission verb**: reuses the errand shape — collect commitments from N
  members of the rolled house (`getHouseRoster(house)`, same pool errand
  draws from), filed with the existing **`/docs`** command with type-aware
  copy rather than a new command — consistent with folding `/gala` into
  `/mission` above (§1), no new surface for this feature at all. The
  underlying signature-collection mechanic, target boosting during
  `/roam`/`/meet`, and progress line are otherwise identical to errand, so
  `/docs`'s existing `mission.mission_type === MISSION_TYPES.ERRAND` branches
  just need a parallel `GALA` case rather than new plumbing. Flavor text differs from errand's "signoff" framing —
  something like securing a venue, a performer, a guest confirmation — see §7.
- On completion: same dual-write `record_mission_completion` (`mission_log` +
  `house_progress`) as every other type, **plus** a bump to the player's
  `gala_arcs` row (§5) — points toward the current stage's threshold, and
  stage advancement when the threshold is cleared.

---

## 3. Stages

Proposed default: **3 stages**, each with a rising point threshold, mirroring
the existing rank curve's shape (round numbers, each stage costing more than
the last):

| Stage | Threshold (cumulative `gala_arcs.points`) | Narrative beat (placeholder) |
|---|---|---|
| 0 → 1 | 5 | Chancellor authorizes the effort; committee stood back up |
| 1 → 2 | 12 | Logistics secured (venue, guests, performers) |
| 2 → 3 (complete) | 20 | The Gala is held; chosen house is awarded the Laurel Crown |

`gala_arcs.completed_at` is set the moment stage 3 is reached. No further
`gala` missions should spawn-and-convert-eligible for that player once
finished (the Accept-time check in §0 already covers this — a finished row
just fails the "not yet completed" condition and the slot converts).

Not settled: exact thresholds/stage count. Completion **will** carry a
mechanical reward on top of the narrative payoff — what it actually is (a
title, a cosmetic dossier badge, something else) is TBD, along with the other
mechanics immediately around it (e.g. whether it interacts with the banked
cooldown-reset system the other three types already grant). Flagging rather
than deciding, since it's a reward-design call, not an architecture one.

---

## 4. Feasibility summary

| Need | Already in place / small addition |
|---|---|
| Rank gate | `inspectorRank()` already exists and is already house-agnostic. |
| House roster per house | `getHouseRoster(house)` already backs errand targets. |
| Mission type plumbing | `MISSION_TYPES`, `rollMissionType`, `missionObjectiveLine`, `missionProgressLine`, `MISSION_INSTRUCTIONS`, `MISSION_NEXT_STEP` all already switch on `mission.mission_type` — `gala` is one more `case`, not a new code path. |
| Accept-time eligibility + convert-in-place | New: today's `claim_mission` RPC/handler has no concept of "wrong type for this accepter" — every other type is acceptable by anyone. This is the one genuinely new mechanic. |
| Per-player arc state | New `gala_arcs` table (§5). Small, one row per player, same shape as `house_progress`. |
| Crown/stage progress write | Extends the existing dual-write pattern (`record_mission_completion`) with a third table bump, same transaction. |
| Command surface | No new command. `house` option on `MISSION_COMMAND` + a branch in `handleMission` (§1); `/docs` gets a `GALA` case alongside its existing `ERRAND` handling (§2). |
| Narrative content | Not started — Chancellor briefing, stage transitions, completion scene, per-house flavor text for the mission objective line. Bulk of the actual writing work; see §7. |

No new external dependencies. One migration (§5).

---

## 5. Schema

```sql
-- One row per player, personal track — no guild_id, matching house_progress's
-- existing convention (a player's Inspector standing isn't per-guild today,
-- so this doesn't introduce a new axis of scoping the rest of the feature
-- doesn't have).
CREATE TABLE IF NOT EXISTS gala_arcs (
  discord_user_id TEXT PRIMARY KEY,
  house           TEXT NOT NULL,             -- locked at creation, never changes
  stage           INT  NOT NULL DEFAULT 0,
  points          INT  NOT NULL DEFAULT 0,   -- cumulative, drives stage thresholds
  started_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  completed_at    TIMESTAMP WITH TIME ZONE   -- set when the final stage clears
);

-- RLS: service role only, same as every other table carrying discord_user_id
-- (house_progress, mission_log).
ALTER TABLE gala_arcs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Block direct access" ON gala_arcs FOR SELECT USING (FALSE);
```

`record_mission_completion` (migration 021) gets a Gala-aware sibling, or an
optional bump folded into the same RPC — TBD at implementation time, not an
architectural fork either way.

---

## 6. What still needs a real answer before implementation

Unlike the negative-affinity spec, this one has open items left deliberately
open rather than settled — surfacing them here instead of guessing narrative
or reward details that are the user's call:

1. Whether a not-yet-started, rank-eligible player gets nudged toward
   `/mission house:` anywhere, e.g. in `noMissionLine` (§1).
2. Exact stage count / thresholds / weight tuning (§2–3) — defaults above are
   placeholders sized by analogy to existing curves, not derived from data
   the way `INSPECTOR_RANKS` itself was.
3. What the completion reward actually is (§3) — mechanical reward is
   settled, its shape isn't.

---

## 7. Narrative content (not started)

Everything player-facing here is dialogue/narration and needs to go through
the normal voice process — ground each house's flavor text in
`constants/dialogue/reference.md` for that house's characters, never invent.
None of this is drafted yet:

- Chancellor's briefing line(s) that open the arc.
- Per-stage transition lines.
- Completion/Laurel Crown award scene, per house (8 variants).
- `missionObjectiveLine` / `MISSION_TEASERS`-equivalent flavor for the `gala`
  type, per house.
