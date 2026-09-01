# Husky Git Hooks

This project uses Husky to enforce code quality and content validation before commits.

## Pre-Commit Hook: Button Label Validation

**What it does:**
- Validates all response and approach button labels
- Ensures no label exceeds 30 characters (for mobile display)
- Prevents commits with invalid labels

**When it runs:**
- Automatically before every `git commit`
- Cannot be bypassed (without explicit `--no-verify` flag)

## For New Team Members

When you clone this repo and run `npm install`, Husky will automatically be set up:

```bash
git clone <repo>
cd my-tkdb
npm install  # Automatically runs "npm run prepare" which installs husky hooks
```

## Testing the Hook

Test that the hook works:
```bash
bash .husky/pre-commit
# Output: ✅ All button labels are valid!
```

## What Happens When Labels Are Too Long

If you add a response label that exceeds 30 characters:

```bash
$ git commit -m "Add new response"
🔍 Validating button label lengths...
❌ COMMIT BLOCKED: Button labels exceed the 30-character limit.
   Please fix the labels in constants/dialogue.js before committing.
```

The commit is rejected. Fix the label in `constants/dialogue.js` and try again.

## Bypassing the Hook (Not Recommended)

If absolutely necessary, you can skip the hook:

```bash
git commit --no-verify -m "message"
```

However, the app will still fail to start if labels are invalid (startup validation catches it).

## How It Works

1. **Local (Pre-Commit)** - Catches errors before git history
2. **Startup (Backend)** - Safety net if hook is bypassed
3. **Tests** - CI/CD validation in test suite

All three layers work together to ensure button labels stay mobile-friendly!
