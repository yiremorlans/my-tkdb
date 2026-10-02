// validateContent() is the startup guard that catches characters.js and
// dialogue.js drifting apart (see its file header: this exact drift hid two
// real bugs in production before). Running it in CI, not just at boot,
// catches a future content edit that breaks the catalog before it ships.
import { test } from 'node:test';
import assert from 'node:assert';
import { validateContent } from '../constants/validateContent.js';
import { CHARACTERS } from '../constants/characters.js';
import { DIALOGUE } from '../constants/dialogue.js';
import { BOND_SCENE_KEYS, MAX_BUTTON_LABEL_LENGTH } from '../constants/game.js';

// validateContent() throws on any error, so returning at all means the real
// catalog is clean of every rule it enforces (bond scenes at all six levels,
// no reused bond line, button-label caps, resolvable placeholders, ...).
// The sweeps below cover only what it does not error on; the mutation tests
// prove it actually catches a violation.
test('validateContent returns { errors: [], warnings } against the real catalog', () => {
  const result = validateContent();
  assert.deepStrictEqual(result.errors, []);
  assert.ok(Array.isArray(result.warnings));
});

// --- bond scenes -------------------------------------------------------------
//
// Unlike the dialogue and response pools, a bond scene has no fallback at all —
// not within a scene and not across characters. It is one continuous exchange in
// one character's voice, used whole or not at all. So the catalog rule is
// stricter than anywhere else in the game — every character owes a scene at
// every level, and no line may appear twice anywhere in the roster. Both are
// validateContent errors, covered by the test above.
test('no character reuses a keepsake emoji across their own six scenes', () => {
  const repeats = [];
  for (const character of CHARACTERS) {
    const pool = DIALOGUE[character.id]?.bondScenes || {};
    const levelsByEmoji = new Map();
    for (const key of BOND_SCENE_KEYS) {
      const emoji = pool[key]?.keepsake?.emoji;
      if (!emoji) continue;
      if (!levelsByEmoji.has(emoji)) levelsByEmoji.set(emoji, []);
      levelsByEmoji.get(emoji).push(key);
    }
    for (const [emoji, levels] of levelsByEmoji) {
      if (levels.length > 1) repeats.push(`${character.id} ${emoji} ${levels.join('+')}`);
    }
  }
  // Sharing an emoji with another character is deliberate and widespread — a
  // player only ever sees one character's six at a time. Two of the same inside
  // one journal is the case that reads as a bug.
  assert.deepStrictEqual(repeats, []);
});

test('the keepsake emoji check warns rather than errors, and names both levels', () => {
  const scenes = DIALOGUE.alan.bondScenes;
  const original = scenes.friend.keepsake.emoji;
  try {
    scenes.friend.keepsake.emoji = scenes.acquaintance.keepsake.emoji;
    const { errors, warnings } = validateContent();

    assert.deepStrictEqual(errors, [], 'a repeat is a legibility call, not a broken scene');
    const hit = warnings.filter((w) => w.includes('reuses the keepsake emoji'));
    assert.strictEqual(hit.length, 1, `expected one warning, got: ${hit.join(' | ')}`);
    assert.match(hit[0], /alan/);
    assert.match(hit[0], /"acquaintance" and "friend"/, 'it says which two to look at');
  } finally {
    scenes.friend.keepsake.emoji = original;
  }
  const stillWarning = validateContent().warnings.filter((w) => w.includes('reuses the keepsake emoji'));
  assert.deepStrictEqual(stillWarning, [], 'and the catalog is clean again');
});

// Proves validateContent() would actually catch a violation instead of
// silently passing one through, the same way the keepsake-emoji test above
// pins the bondScenes check's own behavior rather than just today's data.
test('validateContent flags an over-length beat approach — as a single string or inside an array', () => {
  // validateContent() throws (not returns) once errors is non-empty — see its
  // own tail — so this has to catch the throw and read its message, unlike
  // the keepsake-emoji test above, which only ever produces warnings.
  const beats = DIALOGUE.benkei.dialogue.known;
  const target = beats.find((b) => b && typeof b === 'object' && typeof b.approach === 'string');
  assert.ok(target, 'benkei.known should have at least one single-string-approach beat to mutate');
  const original = target.approach;
  try {
    target.approach = 'A'.repeat(MAX_BUTTON_LABEL_LENGTH + 1);
    assert.throws(
      () => validateContent(),
      new RegExp(`benkei dialogue\\[known\\] beat approach is ${MAX_BUTTON_LABEL_LENGTH + 1} chars \\(max ${MAX_BUTTON_LABEL_LENGTH}\\)`),
    );
  } finally {
    target.approach = original;
  }

  // Same check, but the label lives inside an `approach: [...]` array.
  const arrayTarget = beats.find((b) => b && typeof b === 'object' && Array.isArray(b.approach));
  assert.ok(arrayTarget, 'benkei.known should have at least one array-approach beat to mutate');
  const originalArray = arrayTarget.approach;
  try {
    arrayTarget.approach = [originalArray[0], 'B'.repeat(MAX_BUTTON_LABEL_LENGTH + 1)];
    assert.throws(
      () => validateContent(),
      new RegExp(`benkei dialogue\\[known\\] beat approach is ${MAX_BUTTON_LABEL_LENGTH + 1} chars \\(max ${MAX_BUTTON_LABEL_LENGTH}\\)`),
    );
  } finally {
    arrayTarget.approach = originalArray;
  }

  assert.doesNotThrow(() => validateContent(), 'and the catalog is clean again');
});

// Same as the approach-throws test above, but for a beat's `responses` —
// proving validateContent() actually catches an over-length response label on
// the beat itself, which is the only place response labels live.
test('validateContent flags an over-length beat response — as a single string or inside an array', () => {
  // Inject the responses rather than hunting the catalog for a beat of the
  // right shape: which beats carry `responses`, and whether as strings or
  // arrays, changes as characters migrate, and the validator has to handle
  // both shapes regardless.
  const beat = DIALOGUE.benkei.dialogue.known.find((b) => b && typeof b === 'object');
  assert.ok(beat, 'benkei.known should have at least one object beat to mutate');
  const hadResponses = Object.prototype.hasOwnProperty.call(beat, 'responses');
  const original = beat.responses;
  const tooLong = new RegExp(`benkei dialogue\\[known\\] beat playful response is ${MAX_BUTTON_LABEL_LENGTH + 1} chars \\(max ${MAX_BUTTON_LABEL_LENGTH}\\)`);
  try {
    beat.responses = { ...original, playful: 'A'.repeat(MAX_BUTTON_LABEL_LENGTH + 1) };
    assert.throws(() => validateContent(), tooLong);

    beat.responses = { ...original, playful: ['Fine', 'B'.repeat(MAX_BUTTON_LABEL_LENGTH + 1)] };
    assert.throws(() => validateContent(), tooLong);
  } finally {
    if (hadResponses) beat.responses = original;
    else delete beat.responses;
  }

  assert.doesNotThrow(() => validateContent(), 'and the catalog is clean again');
});

// --- localization ------------------------------------------------------------
//
// The source localization is American English, and reference.md (the canon the
// voices are grounded in) is written that way too. Several characters are
// British-coded — Edward, Zenji, Lucas — and their register makes it very easy
// to drift into British spellings while authoring them. That drift is invisible
// in review and reads as inconsistent voice across the roster, so it is pinned
// here rather than left to a proof-read. For Edward and Zenji, British-coded
// voice comes from word choice, not orthography. Lucas is the one exception:
// reference.md has him as an actual transfer student from Darkwick's UK
// sister school, so his own lines are allowed real British spelling as part
// of his voice — it is not drift for him the way it is for everyone else.
const BRITISH_SPELLING_EXEMPT_PREFIXES = ['DIALOGUE.lucas.'];
//
// Deliberately absent from the list: `dialogue`, `glamour`, `toward(s)` and
// adjectival `burnt`, all of which are correct American English.
const BRITISH_SPELLING_LIST = [
  ['armour', 'armor'], ['behaviour', 'behavior'], ['cancelled', 'canceled'],
  ['centre', 'center'], ['colour', 'color'], ['defence', 'defense'],
  ['draught', 'draft'], ['favour', 'favor'], ['flavour', 'flavor'],
  ['grey', 'gray'], ['honour', 'honor'], ['jewellery', 'jewelry'],
  ['labelled', 'labeled'], ['learnt', 'learned'], ['manoeuvre', 'maneuver'],
  ['marvellous', 'marvelous'], ['maths', 'math'], ['metre', 'meter'],
  ['modelled', 'modeled'], ['neighbour', 'neighbor'], ['offence', 'offense'],
  ['practise', 'practice'], ['programme', 'program'], ['pretence', 'pretense'],
  ['rumour', 'rumor'], ['sceptic', 'skeptic'], ['spelt', 'spelled'],
  ['theatre', 'theater'], ['travelled', 'traveled'], ['travelling', 'traveling'],
  ['whilst', 'while'], ['woollen', 'woolen'],
  // -ise verbs: the ending is the tell, so match the stem plus any inflection.
  ['apologis', 'apologiz'], ['authoris', 'authoriz'], ['categoris', 'categoriz'],
  ['criticis', 'criticiz'], ['emphasis', 'emphasiz'], ['finalis', 'finaliz'],
  ['memoris', 'memoriz'], ['organis', 'organiz'], ['prioritis', 'prioritiz'],
  ['realis', 'realiz'], ['recognis', 'recogniz'], ['socialis', 'socializ'],
  ['specialis', 'specializ'], ['summaris', 'summariz'], ['sympathis', 'sympathiz'],
  ['analys', 'analyz'], ['paralys', 'paralyz'],
];
const BRITISH_SPELLINGS = BRITISH_SPELLING_LIST.map(([british, american]) => [
  new RegExp(`\\b${british}[a-z]*\\b`, 'i'),
  american,
]);

// Every authored string in the catalog, wherever it sits in the tree. Walking
// the exports rather than the source files means comments and internal
// identifiers are out of scope — this is a rule about text players read.
function everyAuthoredString(value, at, out = []) {
  if (typeof value === 'string') out.push([at, value]);
  else if (Array.isArray(value)) value.forEach((v, i) => everyAuthoredString(v, `${at}[${i}]`, out));
  else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) everyAuthoredString(v, `${at}.${k}`, out);
  }
  return out;
}

test('no player-facing string uses a British spelling', () => {
  const strings = [
    ...everyAuthoredString(DIALOGUE, 'DIALOGUE'),
    ...everyAuthoredString(CHARACTERS, 'CHARACTERS'),
  ];
  const found = [];

  for (const [at, text] of strings) {
    if (BRITISH_SPELLING_EXEMPT_PREFIXES.some((prefix) => at.startsWith(prefix))) continue;
    for (const [pattern, american] of BRITISH_SPELLINGS) {
      const match = text.match(pattern);
      if (match) found.push(`${at}: "${match[0]}" — use "${american}"`);
    }
  }

  assert.deepStrictEqual(found, [], 'the source localization is American English');
});
