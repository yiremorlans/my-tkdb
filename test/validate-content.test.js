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
import { BOND_SCENE_PLACEHOLDERS } from '../constants/publicEncounters.js';

test('validateContent does not throw against the real character/dialogue catalog', () => {
  assert.doesNotThrow(() => validateContent());
});

test('validateContent reports its findings as { errors, warnings } without throwing when there are no errors', () => {
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
// every level, and no line may appear twice anywhere in the roster. These guard
// both halves of that.
test('every character has their own authored bond scene at all six levels', () => {
  const missing = [];
  for (const character of CHARACTERS) {
    const pool = DIALOGUE[character.id]?.bondScenes;
    for (const key of BOND_SCENE_KEYS) {
      if (!pool?.[key]) missing.push(`${character.id}.${key}`);
    }
  }
  assert.deepStrictEqual(missing, [], 'a missing scene would deliver nothing at that level');
});

test('no bond scene line is reused anywhere in the game', () => {
  const seen = new Map();
  const duplicates = [];

  const collect = (at, pool) => {
    for (const [key, scene] of Object.entries(pool || {})) {
      const lines = [
        ...scene.beats,
        scene.choice.prompt,
        ...scene.choice.options.map((o) => o.close),
        scene.keepsake.line,
      ];
      for (const line of lines) {
        const text = line.trim();
        if (seen.has(text)) duplicates.push(`${at}.${key} repeats ${seen.get(text)}`);
        else seen.set(text, `${at}.${key}`);
      }
    }
  };

  for (const character of CHARACTERS) collect(character.id, DIALOGUE[character.id]?.bondScenes);

  assert.deepStrictEqual(duplicates, [], 'two characters sending the same words gives the moment away');
});

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
  assert.deepStrictEqual(validateContent().warnings, [], 'and the catalog is clean again');
});

test('every bond scene choice button fits the 30-char cap the rest of the game uses', () => {
  const tooLong = [];
  const check = (at, pool) => {
    for (const [key, scene] of Object.entries(pool || {})) {
      for (const option of scene.choice.options) {
        if (option.label.length > MAX_BUTTON_LABEL_LENGTH) {
          tooLong.push(`${at}.${key}: "${option.label}" (${option.label.length})`);
        }
      }
    }
  };
  for (const character of CHARACTERS) check(character.id, DIALOGUE[character.id]?.bondScenes);

  assert.deepStrictEqual(tooLong, []);
});

test('every bond scene placeholder is one bondScenes.js can actually resolve', () => {
  const unknown = [];
  const check = (at, pool) => {
    for (const [key, scene] of Object.entries(pool || {})) {
      const lines = [
        ...scene.beats,
        scene.choice.prompt,
        ...scene.choice.options.map((o) => o.close),
        scene.keepsake.line,
      ];
      for (const line of lines) {
        for (const match of line.matchAll(/\{(\w+)\}/g)) {
          if (!BOND_SCENE_PLACEHOLDERS.includes(match[1])) unknown.push(`${at}.${key}: {${match[1]}}`);
        }
      }
    }
  };
  for (const character of CHARACTERS) check(character.id, DIALOGUE[character.id]?.bondScenes);

  assert.deepStrictEqual(unknown, [], 'fillTemplate resolves an unknown placeholder to an empty string');
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
const BRITISH_SPELLINGS = [
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
    for (const [british, american] of BRITISH_SPELLINGS) {
      const match = text.match(new RegExp(`\\b${british}[a-z]*\\b`, 'i'));
      if (match) found.push(`${at}: "${match[0]}" — use "${american}"`);
    }
  }

  assert.deepStrictEqual(found, [], 'the source localization is American English');
});
