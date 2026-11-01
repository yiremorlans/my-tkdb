# Spec: Feedback prompts

Status: **design in progress** (grilling paused 2026-11-01, nothing built)
Last updated: 2026-11-01

An occasional ephemeral prompt that asks a player a short survey question
right after a normal command, so feedback can be gathered without a separate
form or DMs.

No design decision has been made by the user yet. §1 lists platform facts
that limit the design. §2 is the draft flow those facts point toward. §3 holds
every open question with a recommended answer, to pick up when the grilling
resumes. When a question is answered, move it to §4 (Settled).

---

## 1. Platform constraints (facts, not choices)

- **Ephemeral only works as a reply.** Discord shows an ephemeral message only
  as the response or followup to an interaction the user just made (a slash
  command or component click). The bot can't push one on its own.
- **Followup tokens last 15 minutes.** The prompt has to go out as a followup
  (`POST /webhooks/{app_id}/{token}`) soon after the triggering command's
  reply, not on a later schedule.
- **Modals open only from an interaction.** A modal (up to 5 text inputs) can
  be the response to a button click or a command, never a followup. Free text
  therefore needs two steps: ephemeral prompt → button → modal.
- **Ephemeral messages don't last.** They disappear when dismissed or when
  the client reloads, so an unanswered prompt is gone for good.
- The codebase already has `EPHEMERAL` in `utils.js` (CODING_STANDARDS §2.4:
  import it, don't redefine it).
- There's no per-user count of how many commands someone has run.
  `character_relationships.last_interaction_at` exists per user and
  character, but a "after N uses" trigger would need a new counter or a
  derived query.

## 2. Draft flow (follows from §1; details depend on §3)

1. A trigger command (`/roam` / `/meet`, pending Q3) sends its normal reply.
2. The handler checks whether this user is eligible for an active survey
   (Q2, Q4).
3. If they are, it sends an ephemeral followup with the question and its
   answer components, plus a "Not now" button.
4. A click on an answer is recorded. If the survey has a free-text part, the
   click opens a modal.
5. Answers, dismissals and "seen" markers go into Supabase (Q5, Q6) so nobody
   is asked the same survey twice.

---

## 3. Open questions

### Round 1 (asked 2026-10-28, unanswered)

**Q1. What it's for.** Targeted surveys (one id each, switched on for a
while, then closed), an always-on general feedback channel, or both?
→ Recommended: targeted surveys, each with an id and an active flag. A
standing `/feedback` command could come later for general feedback.

**Q2. Who gets asked.** Established players only (met at least a few
characters, or played for at least a few days), or everyone including
first-time players?
→ Recommended: established players only. New players would be judging a
game they haven't seen yet, and a survey is a bad first impression.

**Q3. Which commands trigger it.** Only `/roam` and `/meet`, the daily core
loop? Never on `/call`, `/riddle`, `/mission`, bond scenes or admin commands,
so it can't interrupt a story moment or a team activity.
→ Recommended: `/roam` and `/meet` only. A per-survey feature trigger (for
example, ask about riddles right after a riddle ends) could be an option
later.

**Q4. How often.** At most one survey prompt per user every 7 days, and any
one survey shown to them once, whether they answer, dismiss or ignore it?
→ Recommended: yes. Ignoring the prompt counts as having seen it, so nobody
gets nagged.

**Q5. Where results go.** A Supabase table only, read with SQL or a script,
or also posted to a private dev channel?
→ Recommended: Supabase only to start. A dev-channel post can be added later
for live answers.

**Q6. Anonymity.** Store answers with the Discord user id (deduplication,
connecting feedback to play depth, follow-up), and add a line to PRIVACY.md?
→ Recommended: store the user id and update PRIVACY.md.

### Later rounds (depend on round 1, not yet asked)

**Q7. Question format.** Buttons (👍/👎 or 1–5), a select menu, free text
via a modal, or a mix chosen per survey? Depends on Q1.
→ Leaning: set per survey. A quick scale by default, with an optional
"Tell us more" button that opens a modal.

**Q8. Questions per survey.** One question per prompt, or a short
multi-step survey (each answer opens the next question)?
→ Leaning: one question, plus the optional free-text follow-up. Multi-step
ephemeral flows lose people.

**Q9. Where surveys are defined.** A constants file
(`constants/surveys.js`: id, question, options, trigger, active flag, start
and end dates), or rows in a database table that can be switched without a
deploy?
→ Leaning: a constants file, to match how the rest of the content lives.

**Q10. Eligibility signal.** If Q2 is yes, what counts as "established":
characters met, days since first encounter, total affinity? Depends on Q2
and on which data already exists (see §1, no usage counter).

**Q11. Opt-out.** A permanent "Don't ask me again" button on the prompt, or
a `/settings`-style toggle? Depends on Q4.
→ Leaning: a "Don't ask again" button on every prompt.

**Q12. Thank-you response.** After an answer: a plain UI acknowledgment, a
short in-character line, or a small reward (💎 store credit)? A reward would
bias the answers and create an incentive to farm them (see the encounter
farming threat model).
→ Leaning: a plain acknowledgment that edits the prompt in place, no reward.
If it's in character, the line falls under the house dialogue rules.

**Q13. Placement.** A separate followup after the main reply, or extra
components attached to the main reply? Depends on Q3.
→ Leaning: a separate followup, so the dialogue reply isn't touched.

**Q14. Reading results.** Raw SQL only, a `scripts/` summary script, or an
admin subcommand (`/encdev feedback <survey>`)? Depends on Q5.

**Q15. Per server or global.** Are surveys global to all players, or can one
target a server (for example, a test server first)? Is eligibility counted
per user across all servers, or per server?
→ Leaning: global surveys, eligibility per user across servers, with an
optional `guilds` allowlist on a survey for testing.

## 4. Settled

(nothing yet)

## 5. Data model (draft, finalize after §3)

- `feedback_responses`: `user_id`, `survey_id`, `guild_id`, `answer`
  (text/jsonb), `comment` (nullable free text), `status`
  (`answered` | `dismissed` | `seen`), `created_at`. Unique on
  `(user_id, survey_id)`.
- Per-user `last_feedback_prompt_at` for the cooldown in Q4 (a column on an
  existing per-user table, or derived from `max(created_at)`).
- A new numbered migration in `db/migrations/`. Read the
  supabase-postgres-best-practices skill before writing it.
