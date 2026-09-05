# scripts/

Local dev tooling. Not loaded by the bot, not committed, deps not in
`package.json`.

## voice-check.js

Semantic voice + canon review of changed dialogue lines. Sends each changed
character's new lines, that character's `constants/dialogue/reference.md`
section, and the house style rules to `claude-opus-5`, and reports a
`pass | warn | fail` verdict per line with a suggested fix.

This is the subjective *validation* layer. The mechanical rules (30-char labels,
em dashes, British spelling, reused bond-scene lines) live in
`constants/validateContent.js` and run in `npm test` — run both. For *grounding*
before you write new dialogue (loading the right `reference.md` section and
traits into context — no API needed), see `.claude/skills/voice-check/SKILL.md`.

### One-time setup

The deps are intentionally not in `package.json`:

```
npm i --no-save @anthropic-ai/sdk zod
```

(Re-run after a clean `npm ci`.) Then set `ANTHROPIC_API_KEY` in your
environment or `.env` — or have an `ant auth login` profile.

### Usage

```
node scripts/voice-check.js                      # working tree vs HEAD
node scripts/voice-check.js --base main          # vs another git ref
node scripts/voice-check.js --char leo,shion     # limit to characters (comma or repeat)
node scripts/voice-check.js --json               # machine-readable to stdout
node scripts/voice-check.js --dry-run            # plan + token estimate, no API call
node scripts/voice-check.js --all                # full scan: every line, every file (~26 requests)
node scripts/voice-check.js --concurrency 8      # parallel requests (default 4)
```

Exit: `0` clean · `1` at least one FAIL · `2` setup/usage error.

One Claude API request per changed character. `--dry-run` prints the token
estimate first — use it before any large or unknown diff.
