// Every beat /meet or /roam can draw must be fully authored.
//
// /meet and /roam draw from the very same pool (pickDialogueEntry in
// characters.js: the tier's `dialogue`, or `daytimeDialogue` for a pmOnly
// character in the daytime). So instead of sampling random draws and
// hoping to hit the one incomplete beat, this walks the whole catalog and
// checks every beat that any draw could return.
//
// That walk is exhaustive. The conditional `when` layer — a character's
// `dialogueWhen` and a roster-wide SHARED_DIALOGUE_WHEN — used to be merged in
// on top of the base pool and was exempt from these checks, which is precisely
// how an evening encounter shipped a "..." caption. It is deleted, data and
// machinery both, so nothing the checks below skip can reach a draw: whatever
// comes back, at any hour, had to pass them. There is one dialogue format now,
// the beat.
//
//   /meet needs:  line + responses with all four kinds (it captions the image
//                 with the `line`, never the `greeting`)
//   /roam needs:  line + approach + greeting + responses with all four kinds
//
// A missing piece doesn't crash anything at runtime — it silently degrades
// (the "..." greeting, or an archetype response label that knows nothing about
// the beat). That's exactly why it has to fail here instead.
import { test } from 'node:test';
import assert from 'node:assert';
import {
  CHARACTERS,
  RESPONSE_TYPES,
  getRandomDialogueBeat,
  getRandomDialogueEntry,
} from '../constants/characters.js';
import { DIALOGUE } from '../constants/dialogue.js';

const TIERS = ['new', 'known', 'warm', 'spark', 'close', 'bound'];
const RESPONSE_KINDS = Object.values(RESPONSE_TYPES);

// A field authored as one string or an array of interchangeable options.
function hasText(value) {
  const options = Array.isArray(value) ? value : [value];
  return (
    options.length > 0 &&
    options.every((o) => typeof o === 'string' && o.trim().length > 0)
  );
}

// Flattens one pool (`{ tier: [...] | { variant: [...] } }`) into
// [{ at, entry }] for every entry a draw at any tier/variant could return.
function poolEntries(at, pool) {
  const out = [];
  for (const [tier, tierData] of Object.entries(pool || {})) {
    const variants = Array.isArray(tierData) ? { '': tierData } : tierData;
    for (const [variant, entries] of Object.entries(variants || {})) {
      const where = variant ? `${at}.${tier}.${variant}` : `${at}.${tier}`;
      (Array.isArray(entries) ? entries : [entries]).forEach((entry, i) => {
        out.push({ at: `${where}[${i}]`, entry });
      });
    }
  }
  return out;
}

// Every enforced beat reachable through pickDialogueEntry, for every character
// (the conditional `when` pools are excluded, see the header).
function drawableBeats() {
  const out = [];
  for (const character of CHARACTERS) {
    const content = DIALOGUE[character.id];
    if (!content) continue;
    out.push(...poolEntries(`${character.id}.dialogue`, content.dialogue));
    if (character.pmOnly && content.daytimeDialogue) {
      out.push(...poolEntries(`${character.id}.daytimeDialogue`, content.daytimeDialogue));
    }
  }
  return out;
}

const isBeat = (e) => !!e && typeof e === 'object' && typeof e.line === 'string';

function missingGreeting({ at, entry }) {
  if (!isBeat(entry)) return `${at}: bare string, not a beat`;
  return hasText(entry.greeting) ? null : `${at}: no greeting`;
}

function missingResponses({ at, entry }) {
  if (!isBeat(entry)) return `${at}: bare string, not a beat`;
  const missing = RESPONSE_KINDS.filter((kind) => !hasText(entry.responses?.[kind]));
  return missing.length ? `${at}: responses missing ${missing.join(', ')}` : null;
}

function missingLine({ at, entry }) {
  if (!isBeat(entry)) return `${at}: bare string, not a beat`;
  return entry.line.trim() ? null : `${at}: no line`;
}

function missingLineAndApproach({ at, entry }) {
  if (!isBeat(entry)) return `${at}: bare string, not a beat`;
  const problems = [];
  if (!entry.line.trim()) problems.push('line');
  if (!hasText(entry.approach)) problems.push('approach');
  return problems.length ? `${at}: no ${problems.join(' or ')}` : null;
}

function problemsIn(beats, ...checks) {
  return beats.flatMap((b) => checks.map((check) => check(b)).filter(Boolean));
}

const BEATS = drawableBeats();

test('the beat walk actually finds beats for the whole roster (guards the checks below against passing on nothing)', () => {
  const characters = new Set(BEATS.map((b) => b.at.split('.')[0]));
  for (const character of CHARACTERS) {
    if (DIALOGUE[character.id]?.dialogue) {
      assert.ok(characters.has(character.id), `${character.id} contributed no beats`);
    }
  }
  assert.ok(BEATS.length > 500, `only ${BEATS.length} beats found`);
});

// --- /meet ---------------------------------------------------------------

test('/meet: every drawable beat has a line', () => {
  assert.deepStrictEqual(problemsIn(BEATS, missingLine), []);
});

test('/meet: every drawable beat has responses for all four kinds', () => {
  assert.deepStrictEqual(problemsIn(BEATS, missingResponses), []);
});

// --- /roam ---------------------------------------------------------------

test('/roam: every drawable beat has a line and an approach', () => {
  assert.deepStrictEqual(problemsIn(BEATS, missingLineAndApproach), []);
});

test('/roam: every drawable beat has a greeting', () => {
  assert.deepStrictEqual(problemsIn(BEATS, missingGreeting), []);
});

test('/roam: every drawable beat has responses for all four kinds', () => {
  assert.deepStrictEqual(problemsIn(BEATS, missingResponses), []);
});

// --- the real draw functions, not just the data --------------------------
//
// The data checks above prove every beat is complete; these prove the draw
// functions hand that completeness through instead of dropping it (a beat
// that loses its greeting or responses between the pool and the caller would
// pass the checks above and still ship a "..." caption). They draw at both
// EVENING and DAYTIME and exempt nothing, so a conditional pool reconnected to
// pickDialogueEntry fails here on its first uncaptioned line.

const DRAWS_PER_COMBO = 20;
const EVENING = new Date('2026-01-01T20:00:00');
const DAYTIME = new Date('2026-01-01T12:00:00');

function combos() {
  const out = [];
  for (const character of CHARACTERS) {
    if (!DIALOGUE[character.id]) continue;
    for (const tier of TIERS) {
      for (const variant of Object.keys(character.images || {})) {
        for (const now of [EVENING, DAYTIME]) {
          out.push({ character, tier, variant, ctx: { now } });
        }
      }
    }
  }
  return out;
}

test('/roam: getRandomDialogueBeat always returns line, approach, greeting and all four response kinds', () => {
  const failures = new Set();
  for (const { character, tier, variant, ctx } of combos()) {
    for (let i = 0; i < DRAWS_PER_COMBO; i++) {
      const beat = getRandomDialogueBeat(character, tier, variant, ctx);
      const gaps = [];
      if (!hasText(beat.line) || beat.line === '...') gaps.push('line');
      if (!hasText(beat.approach)) gaps.push('approach');
      if (!hasText(beat.greeting) || beat.greeting === '...') gaps.push('greeting');
      const missing = RESPONSE_KINDS.filter((k) => !hasText(beat.responses?.[k]));
      if (missing.length) gaps.push(`responses.${missing.join('/')}`);
      if (gaps.length) failures.add(`${character.id}.${tier}.${variant}: ${gaps.join(', ')}`);
    }
  }
  assert.deepStrictEqual([...failures], []);
});

test('/meet: getRandomDialogueEntry always returns a real line and all four response kinds', () => {
  const failures = new Set();
  for (const { character, tier, variant, ctx } of combos()) {
    for (let i = 0; i < DRAWS_PER_COMBO; i++) {
      const entry = getRandomDialogueEntry(character, tier, variant, ctx);
      const gaps = [];
      if (!hasText(entry.line) || entry.line === '...') gaps.push('line');
      const missing = RESPONSE_KINDS.filter((k) => !hasText(entry.responses?.[k]));
      if (missing.length) gaps.push(`responses.${missing.join('/')}`);
      if (gaps.length) failures.add(`${character.id}.${tier}.${variant}: ${gaps.join(', ')}`);
    }
  }
  assert.deepStrictEqual([...failures], []);
});

// --- one dialogue format ---------------------------------------------------
//
// The `when` layer is gone from the draw, so a `dialogueWhen` block added back
// to a dialogue file would be silently dead content — authored, reviewed, never
// shown. validateContent errors on one; this is the same guard in the suite, so
// it fails whether or not the validator is run.
test('no character carries a dialogueWhen block', () => {
  const offenders = CHARACTERS.filter((c) => DIALOGUE[c.id]?.dialogueWhen !== undefined).map(
    (c) => c.id,
  );
  assert.deepStrictEqual(offenders, []);
});

// Nothing outside a beat can supply a line, so the pool walk above is the whole
// catalog. Guards the walk against a new pool key appearing beside `dialogue`
// and going unchecked, the way `daytimeDialogue` did.
test('a character carries no dialogue pool the beat walk does not cover', () => {
  const KNOWN = new Set(['dialogue', 'daytimeDialogue', 'bondScenes', 'winnerLines']);
  const unknown = new Set();
  for (const character of CHARACTERS) {
    for (const key of Object.keys(DIALOGUE[character.id] || {})) {
      if (!KNOWN.has(key)) unknown.add(`${character.id}.${key}`);
    }
  }
  assert.deepStrictEqual([...unknown], []);
});
