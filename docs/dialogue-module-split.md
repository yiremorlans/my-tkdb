# Refactor: split `constants/dialogue.js` into per-character modules

**Status:** proposed, not started. Mechanical, no behaviour change. Do it as its
own commit/PR — never bundled with a content or logic change.

---

## 1. Why

`constants/dialogue.js` is ~5.8k lines: 26 self-contained character blocks plus
two shared lists. Each character now carries up to six pools —
`dialogue`, `dialogueWhen`, `approachWhen`, `responsesWhen`,
`temperamentDialogue`, `approach`, `responses` — and the conditional-dialogue
work will keep growing them.

This is not a runtime problem (one module, imported twice, no measurable cost).
It is a human one:

- A one-character edit sits in a 5.8k-line file — noisy diffs, easy to lose in
  review.
- Two people editing different characters conflict on the same file.
- Jump-to-symbol and folding are the only way to navigate it.

The forcing function is **multiple editors / frequent conflicts / review
friction**. If it is one person editing rarely, this can wait — it is cosmetic
until then.

## 2. Current state (facts to preserve)

- **File:** `constants/dialogue.js`, ~5797 lines.
- **Exports:** `DIALOGUE` (object keyed by character id), `SHARED_DIALOGUE_WHEN`
  (array), `SHARED_APPROACH_WHEN` (array).
- **Importers (only two):**
  - `constants/characters.js` — `import { DIALOGUE, SHARED_APPROACH_WHEN, SHARED_DIALOGUE_WHEN } from "./dialogue.js";`
  - `constants/validateContent.js` — same three names.
- **Character ids, in file order:** jin, kaito, lucas, tohma, alan, leo, shohei,
  subaru, zenji, haku, elias, jo, mio, shion, jiro, yuri, ren, haru, towa,
  edward, rui, lyca, taiga, ritsu, romeo, benkei (26).
- **No cross-references between character blocks** — each is a pure data literal.
- **No computed keys** in `DIALOGUE` itself (all ids are plain identifiers), but
  blocks use inline comments and prose with apostrophes, so the modules must stay
  `.js`, not JSON.
- **Contract enforcement:** `validateContent()` (run at startup from `app.js`)
  already fails loudly on a missing/malformed character or conditional block.
  This is what makes the split safe.

## 3. Target structure

```
constants/
  dialogue.js                 ← 3-line barrel, re-exports from dialogue/index.js
  dialogue/
    index.js                  ← assembles DIALOGUE, re-exports the shared lists
    _shared.js                ← SHARED_DIALOGUE_WHEN, SHARED_APPROACH_WHEN + the
                                 header doc comment describing the pool shapes
    jin.js                    ← export default { dialogue, dialogueWhen, ... }
    kaito.js
    …                         ← one file per character id
    benkei.js
```

### `constants/dialogue/jin.js`

```js
// Only jin's content. Same object that used to sit under `jin:` in DIALOGUE.
export default {
  dialogue: { /* … */ },
  dialogueWhen: [ /* … */ ],
  approachWhen: [ /* … */ ],
  temperamentDialogue: { /* … */ },
  approach: { /* … */ },
  responses: { /* … */ },
};
```

### `constants/dialogue/index.js`

```js
import jin from "./jin.js";
import kaito from "./kaito.js";
// … 26 imports, file order preserved for readable diffs

export { SHARED_DIALOGUE_WHEN, SHARED_APPROACH_WHEN } from "./_shared.js";

export const DIALOGUE = {
  jin, kaito, lucas, tohma, alan, leo, shohei, subaru, zenji, haku,
  elias, jo, mio, shion, jiro, yuri, ren, haru, towa, edward, rui,
  lyca, taiga, ritsu, romeo, benkei,
};
```

### `constants/dialogue.js` (barrel — keeps every other import unchanged)

```js
export { DIALOGUE, SHARED_DIALOGUE_WHEN, SHARED_APPROACH_WHEN } from "./dialogue/index.js";
```

`characters.js` and `validateContent.js` keep importing from `"./dialogue.js"`
verbatim. Optionally repoint them at `"./dialogue/index.js"` and delete the
barrel — but the barrel costs nothing and keeps the diff to just the new
directory.

## 4. Migration steps

1. `mkdir constants/dialogue`.
2. Create `constants/dialogue/_shared.js`: move `SHARED_DIALOGUE_WHEN`,
   `SHARED_APPROACH_WHEN`, and the block-shape header comment out of
   `dialogue.js`. Keep its own imports if any (currently none).
3. For each character id, in file order: create `constants/dialogue/<id>.js`
   with `export default { …that character's object… }`. Copy the block body
   verbatim; drop the trailing comma that separated it from the next character.
4. Create `constants/dialogue/index.js` with the 26 imports + `DIALOGUE`
   assembly + shared re-export (section 3).
5. Replace `constants/dialogue.js` contents with the one-line barrel.
6. Run the checks in section 5. Nothing else should change.

Do it in one commit. It will be a large diff; that is expected and is the reason
to keep it separate from feature work.

## 5. Verification (must all hold, before == after)

- `node --check` passes on every new file.
- `node -e "import('./constants/validateContent.js').then(m => { const r = m.validateContent(); console.log(r.errors.length, r.warnings.length); })"`
  prints `0 0` (same as before the split).
- `node -e "import('./constants/dialogue.js').then(m => console.log(Object.keys(m.DIALOGUE).length))"`
  prints `26`.
- `Object.keys(DIALOGUE)` order is unchanged (some pickers don't care, but keep
  it stable for reviewable diffs and any future ordered iteration).
- A spot check: for a few `(character, tier)` pairs, the set of possible
  `getRandomDialogueLine` / `getTemperamentGreeting` / `getRandomApproachLabel`
  outputs is identical to a pre-split run (seed or enumerate the pools).
- `git grep -n "eveningDialogue\|eveningTemperament"` still returns nothing
  (those were removed in the conditional-dialogue refactor).

## 6. Non-goals — do not do these here

- **Do not** split a character across files (by tier, or by pool type). One
  character = one file. Its pools are read together.
- **Do not** convert to JSON/YAML or add a loader/registry/DB. That is only worth
  it if non-engineers start editing content, or localization / hot-reload is
  needed — a separate project with its own schema-validation story.
- **Do not** change `validateContent.js` logic. It should pass unmodified (only
  its import path may change, and only if you delete the barrel).
- **Do not** fold the `SHARED_*` lists into `index.js`. They are content, not
  wiring; `_shared.js` keeps them editable alongside the character files.
- **Do not** reorder or rename character ids as part of this.

## 7. Effort

Half a day, most of it careful copy-paste and diff review. Risk is low because
`validateContent()` covers the contract and there is no logic to move — but the
diff is big, so review it as "26 files each equal to one slice of the old file,
plus a barrel," not line by line.

## 8. Later, if content editing moves off engineers

Per-file `.js` is the ceiling for this refactor. The next step (own project):
data files (`constants/dialogue/<id>.yaml`) + a build or load step + JSON-schema
validation reusing the rules already in `validateContent.js`. Only pursue it when
there is a real non-engineer editing workflow to serve.
