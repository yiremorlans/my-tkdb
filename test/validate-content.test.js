// validateContent() is the startup guard that catches characters.js and
// dialogue.js drifting apart (see its file header: this exact drift hid two
// real bugs in production before). Running it in CI, not just at boot,
// catches a future content edit that breaks the catalog before it ships.
import { test } from 'node:test';
import assert from 'node:assert';
import { validateContent } from '../constants/validateContent.js';
import { CHARACTERS } from '../constants/characters.js';
import { DIALOGUE, SHARED_WINNER_LINES } from '../constants/dialogue.js';
import { MAX_BUTTON_LABEL_LENGTH } from '../constants/game.js';

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
  // Sharing an emoji with another character is deliberate and widespread — a
  // player only ever sees one character's six at a time. Two of the same inside
  // one journal is the case that reads as a bug, and validateContent warns on it.
  const repeats = validateContent().warnings.filter((w) => w.includes('reuses the keepsake emoji'));
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

test('validateContent flags a room background not named <House>_<Name>_', () => {
  const kaito = CHARACTERS.find((c) => c.id === 'kaito');
  const original = kaito.house;
  try {
    // His room file is Frostheim_Kaito_Room.png, so a Vagastrom Kaito is misfiled.
    kaito.house = 'Vagastrom';
    assert.throws(
      () => validateContent(),
      /kaito's room background "Frostheim_Kaito_Room\.png" must be named Vagastrom_Kaito_…/,
    );
  } finally {
    kaito.house = original;
  }
  assert.doesNotThrow(() => validateContent(), 'and the catalog is clean again');
});

// --- localization ------------------------------------------------------------
//
// The source localization is American English, and constants/dialogue/reference/ (the canon the
// voices are grounded in) is written that way too. Several characters are
// British-coded — Edward, Zenji, Lucas — and their register makes it very easy
// to drift into British spellings while authoring them. That drift is invisible
// in review and reads as inconsistent voice across the roster, so it is pinned
// here rather than left to a proof-read. For Edward and Zenji, British-coded
// voice comes from word choice, not orthography. Lucas is the one exception:
// reference/lucas.md has him as an actual transfer student from Darkwick's UK
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

// `mood` is only meaningful from Friend on (MOOD_TIERS): a flag on an
// earlier beat, or anything but `true`, fails the build rather than quietly
// scoring a scene the player can't read yet.
test('validateContent rejects mood below warm and any mood value but true', () => {
  const known = DIALOGUE.benkei.dialogue.known.find((b) => b && typeof b === 'object');
  const spark = DIALOGUE.benkei.dialogue.spark.find((b) => b && typeof b === 'object');
  assert.ok(known && spark, 'benkei should have object beats at known and spark to mutate');
  try {
    known.mood = true;
    assert.throws(() => validateContent(), /benkei dialogue\[known\] beat has mood, which only applies at warm\/spark\/close\/bound/);
  } finally {
    delete known.mood;
  }
  try {
    spark.mood = 'yes';
    assert.throws(() => validateContent(), /benkei dialogue\[spark\] beat mood must be true or absent/);
    spark.mood = true;
    assert.doesNotThrow(() => validateContent(), 'mood: true at spark is valid');
  } finally {
    delete spark.mood;
  }
});

// Proves validateContent() would actually catch an over-length button label
// instead of silently passing one through, in every slot checkLabelLength
// guards on a beat: its approach and responses, each a single string or inside
// an array. The labels are injected rather than hunted for in the catalog,
// since which beats carry which shape changes as content is authored.
// validateContent() throws (not returns) once errors is non-empty, so each case
// reads the throw's message.
test('validateContent flags an over-length button label in every slot, as a string or inside an array', () => {
  const beat = DIALOGUE.benkei.dialogue.known.find((b) => b && typeof b === 'object');
  assert.ok(beat, 'benkei.known should have at least one object beat to mutate');
  const over = MAX_BUTTON_LABEL_LENGTH + 1;
  const tooLong = (what) => new RegExp(`${what} is ${over} chars \\(max ${MAX_BUTTON_LABEL_LENGTH}\\)`);
  const approach = tooLong('benkei dialogue\\[known\\] beat approach');
  const response = tooLong('benkei dialogue\\[known\\] beat playful response');

  const snapshot = structuredClone(beat);
  const restore = () => {
    for (const key of Object.keys(beat)) delete beat[key];
    Object.assign(beat, structuredClone(snapshot));
  };

  const cases = [
    [() => { beat.approach = 'A'.repeat(over); }, approach],
    [() => { beat.approach = ['Fine', 'B'.repeat(over)]; }, approach],
    [() => { beat.responses = { ...beat.responses, playful: 'A'.repeat(over) }; }, response],
    [() => { beat.responses = { ...beat.responses, playful: ['Fine', 'B'.repeat(over)] }; }, response],
  ];

  try {
    for (const [mutate, expected] of cases) {
      mutate();
      assert.throws(() => validateContent(), expected);
      restore();
    }
  } finally {
    restore();
  }

  assert.doesNotThrow(() => validateContent(), 'and the catalog is clean again');
});

// --- winner lines -----------------------------------------------------------

test('validateContent flags every malformed winner line', () => {
  const pool = DIALOGUE.benkei.winnerLines.new;
  const original = pool[0];
  const cases = [
    // Call scenes are gone (docs/public-encounters.md §17): an object entry is
    // no longer a valid line.
    [{ line: original, responses: { kind: 'a', playful: 'b', bold: 'c' } }, /benkei winnerLines\.new has a non-string line/],
    [original.replaceAll('{user}', 'someone'), /benkei winnerLines\.new never mentions \{user\}/],
    [original.replace(/\{(name|firstName)\}/g, 'him'), /benkei winnerLines\.new never names the character/],
    [`${original} {mood}`, /benkei winnerLines\.new uses unknown placeholder "\{mood\}"/],
  ];

  try {
    for (const [entry, expected] of cases) {
      pool[0] = entry;
      assert.throws(() => validateContent(), expected);
    }
  } finally {
    pool[0] = original;
  }

  assert.doesNotThrow(() => validateContent(), 'and the catalog is clean again');
});

test('the shared fallback pool takes plain strings only', () => {
  const pool = SHARED_WINNER_LINES.new;
  pool.push({ line: '**{name}** waves {user} over.', responses: { kind: 'a', playful: 'b', bold: 'c' } });
  try {
    assert.throws(() => validateContent(), /SHARED_WINNER_LINES winnerLines\.new has a non-string line/);
  } finally {
    pool.pop();
  }
});
