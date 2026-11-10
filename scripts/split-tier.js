#!/usr/bin/env node
/**
 * split-tier — the mechanical half of the tier-split skill (steps 1, 2 and 4).
 *
 *   node scripts/split-tier.js <id> <tier>                    dry run
 *   node scripts/split-tier.js <id> <tier> --carry 3,7        dry run, beats 3 and 7 carried up
 *   node scripts/split-tier.js <id> <tier> --apply [--carry …] [--replace]
 *   node scripts/split-tier.js <id> --all [--carry <tier>:3,7 …] [--apply] [--replace]
 *
 * --all splits the unsplit tiers from new to close (bound is split on its
 * own) in ladder order, in memory, so a tier's carry-ups count toward the
 * next tier before that one is split; close carries land in bound as
 * candidates. It stops at
 * the first tier with no marks, and at the first tier over target (pick
 * --carry <tier>:n,… and re-run). --apply writes nothing unless every tier it
 * reached fits.
 *
 * Reads the ✓ marks in constants/dialogue/<id>.js dialogue.<tier> (a ✓ counts
 * anywhere inside a field, after it on the same line, or in a `// ✓` comment):
 *   ✓ on line      → whole beat to constants/roam/<id>.js
 *   ✓ on greeting  → { line: greeting, responses, mood? } to constants/meet/<id>.js
 *   ✓✓ on line     → both: whole beat to /roam, { line, responses, mood? } to /meet
 * Copies verbatim with marks stripped; a /meet line loses its outer "…" only
 * when it holds no inner quotes (otherwise it's flagged, not rewritten).
 *
 * Dry run prints each marked beat (numbered by position in the tier) and the
 * count against SPLIT_POOL_TARGET_BY_TIER / SPLIT_MOOD_TARGET_BY_TIER.
 *
 * --apply writes the copied beats into the meet/roam files, appends --carry
 * beats (verbatim, marks kept, `// candidate from <tier>`) to the next tier
 * in the dialogue file, and deletes the tier from the dialogue file. It
 * refuses when a pool is over target (pick beats with --carry), when the
 * meet/roam file already has the tier (unless --replace), or when the next
 * tier is already split. Bound overflow is dropped. Drafting and voice-check
 * stay manual; this script never writes new lines.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const TIERS = ["new", "known", "warm", "spark", "close", "bound"];
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Read from game.js's text: importing it loads every dialogue file, and a
// marked one isn't valid JS.
function readTargets(name) {
  const text = fs.readFileSync(path.join(ROOT, "constants/game.js"), "utf8");
  const at = text.indexOf(`export const ${name} =`);
  if (at < 0) throw new Error(`${name} not found in constants/game.js`);
  const body = text.slice(at, text.indexOf("};", at));
  const out = {};
  for (const m of body.matchAll(/DIALOGUE_POOL\.(MEET|ROAM)\]\s*:\s*(\{[^}]*\})/g)) {
    out[m[1].toLowerCase()] = new Function(`return (${m[2]});`)();
  }
  if (!out.meet || !out.roam) throw new Error(`couldn't read ${name}`);
  return out;
}
const SPLIT_POOL_TARGET_BY_TIER = readTargets("SPLIT_POOL_TARGET_BY_TIER");
const SPLIT_MOOD_TARGET_BY_TIER = readTargets("SPLIT_MOOD_TARGET_BY_TIER");

// ---------- text scanning (skips strings and comments) ----------

// Calls cb(i, ch, depth) for every code character in text[from, to).
// depth counts {, [ and ( opened since `from`.
function walk(text, from, to, cb) {
  let depth = 0;
  for (let i = from; i < to; i++) {
    const ch = text[i];
    if (ch === "/" && text[i + 1] === "/") {
      while (i < to && text[i] !== "\n") i++;
      continue;
    }
    if (ch === "/" && text[i + 1] === "*") {
      i = text.indexOf("*/", i + 2) + 1;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      i++;
      while (i < to && text[i] !== ch) {
        if (text[i] === "\\") i++;
        i++;
      }
      continue;
    }
    if (cb(i, ch, depth) === false) return;
    if (ch === "{" || ch === "[" || ch === "(") depth++;
    else if (ch === "}" || ch === "]" || ch === ")") depth--;
  }
}

function matching(text, open) {
  let end = -1;
  walk(text, open, text.length, (i, ch, depth) => {
    if ((ch === "}" || ch === "]" || ch === ")") && depth === 1) {
      end = i;
      return false;
    }
  });
  if (end < 0) throw new Error(`unbalanced bracket at ${open}`);
  return end;
}

// Top-level `key:` positions inside the object/array opened at `open`.
function keysOf(text, open) {
  const close = matching(text, open);
  const keys = [];
  walk(text, open, close, (i, ch, depth) => {
    if (depth !== 1 || !/[A-Za-z_$]/.test(ch) || /[\w$]/.test(text[i - 1])) return;
    const m = /^([A-Za-z_$][\w$]*)\s*:/.exec(text.slice(i, i + 64));
    if (m) keys.push({ key: m[1], at: i, valueAt: i + m[0].length });
  });
  return keys;
}

// Top-level `{…}` children of the array opened at `open`.
function objectsOf(text, open) {
  const close = matching(text, open);
  const out = [];
  walk(text, open, close, (i, ch, depth) => {
    if (ch === "{" && depth === 1) out.push({ start: i, end: matching(text, i) + 1 });
  });
  return out;
}

function nextBracket(text, from, ch) {
  let at = -1;
  walk(text, from, text.length, (i, c) => {
    if (c === ch) {
      at = i;
      return false;
    }
  });
  return at;
}

// ---------- serializing (prettier-style) ----------

function quote(s) {
  const dq = (s.match(/"/g) || []).length;
  const sq = (s.match(/'/g) || []).length;
  const q = dq > sq ? "'" : '"';
  const body = s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(new RegExp(q, "g"), "\\" + q);
  return q + body + q;
}

function prop(indent, key, valueSrc) {
  const one = `${indent}${key}: ${valueSrc},`;
  if (one.length <= 80) return one;
  return `${indent}${key}:\n${indent}  ${valueSrc},`;
}

function strings(indent, key, list) {
  const one = `${indent}${key}: [${list.map(quote).join(", ")}],`;
  if (one.length <= 80) return [one];
  return [`${indent}${key}: [`, ...list.map((s) => `${indent}  ${quote(s)},`), `${indent}],`];
}

// Keys in the beat's own order, so `mood` and the rest stay where they were.
function serializeBeat(beat, indent) {
  const i1 = indent + "  ";
  const lines = [`${indent}{`];
  for (const [key, value] of Object.entries(beat)) {
    if (typeof value === "string") lines.push(prop(i1, key, quote(value)));
    else if (typeof value === "boolean" || typeof value === "number") lines.push(`${i1}${key}: ${value},`);
    else if (Array.isArray(value)) lines.push(...strings(i1, key, value));
    else {
      lines.push(`${i1}${key}: {`);
      for (const [k, v] of Object.entries(value)) lines.push(...strings(i1 + "  ", k, v));
      lines.push(`${i1}},`);
    }
  }
  lines.push(`${indent}},`);
  return lines.join("\n");
}

// ---------- reading the marked tier ----------

function stripMarks(src) {
  return src
    .replace(/[ \t]*\/\/[ \t]*✓+[ \t]*(?=\n|$)/g, "")
    .replace(/[ \t]*✓/g, "");
}

function unquoteSpoken(s) {
  const m = /^\s*"([^"]*)"\s*$/.exec(s);
  return m ? m[1] : null;
}

function parseTier(text, tier) {
  const dlg = /\bdialogue\s*:\s*\{/.exec(text);
  if (!dlg) throw new Error("no dialogue: { … } block");
  const dlgOpen = dlg.index + dlg[0].length - 1;
  const tiers = keysOf(text, dlgOpen).filter((k) => TIERS.includes(k.key));
  const hit = tiers.find((k) => k.key === tier);
  const located = Object.fromEntries(
    tiers.map((k) => [k.key, { key: k, open: nextBracket(text, k.valueAt, "[") }])
  );
  if (!hit) return { located, beats: null };
  const open = located[tier].open;
  const beats = objectsOf(text, open).map((o, n) => {
    const raw = text.slice(o.start, o.end);
    const keys = keysOf(raw, 0);
    const seg = (key) => {
      const idx = keys.findIndex((k) => k.key === key);
      if (idx < 0) return "";
      const end = idx + 1 < keys.length ? keys[idx + 1].at : raw.length;
      // a trailing `// ✓` sits after the comma, before the next key: included
      return raw.slice(keys[idx].at, end);
    };
    const marks = (key) => (seg(key).match(/✓/g) || []).length;
    let beat;
    try {
      beat = new Function(`return (${stripMarks(raw)});`)();
    } catch (e) {
      throw new Error(`beat #${n + 1} doesn't parse after stripping marks: ${e.message}`);
    }
    return { n: n + 1, raw, beat, lineMarks: marks("line"), greetingMarks: marks("greeting") };
  });
  return { located, beats };
}

// ---------- meet/roam files ----------

function poolTierRange(text, tier) {
  const def = /export\s+default\s*(withPronounVariants\()?\s*\{/.exec(text);
  if (!def) throw new Error("no `export default {`");
  const open = def.index + def[0].length - 1;
  return { open, keys: keysOf(text, open).filter((k) => TIERS.includes(k.key)), tier };
}

function insertTier(text, tier, beatsSrc, replace) {
  const { open, keys } = poolTierRange(text, tier);
  const wrap = /withPronounVariants/.test(text.slice(0, open)) || /withPronounVariants\(\[/.test(text);
  const value = wrap ? `withPronounVariants([\n${beatsSrc}\n  ])` : `[\n${beatsSrc}\n  ]`;
  const block = `  ${tier}: ${value},\n`;
  const existing = keys.find((k) => k.key === tier);
  if (existing) {
    if (!replace) throw new Error(`already has ${tier} (pass --replace)`);
    const lineStart = text.lastIndexOf("\n", existing.at) + 1;
    const valOpen = nextBracket(text, existing.valueAt, wrap ? "(" : "[");
    let end = matching(text, valOpen) + 1;
    if (text[end] === ")") end++;
    if (text[end] === ",") end++;
    if (text[end] === "\n") end++;
    return text.slice(0, lineStart) + block + text.slice(end);
  }
  const close = matching(text, open);
  if (!/\S/.test(text.slice(open + 1, close))) {
    return text.slice(0, open) + `{\n${block}}` + text.slice(close + 1);
  }
  const later = keys.find((k) => TIERS.indexOf(k.key) > TIERS.indexOf(tier));
  const at = later ? text.lastIndexOf("\n", later.at) + 1 : text.lastIndexOf("\n", close) + 1;
  return text.slice(0, at) + block + text.slice(at);
}

// ---------- main ----------

const USAGE =
  "usage: node scripts/split-tier.js <id> <new|known|warm|spark|close|bound> [--carry 3,7] [--apply] [--replace]\n" +
  "       node scripts/split-tier.js <id> --all [--carry <tier>:3,7 …] [--apply] [--replace]";

function parseArgs(argv) {
  const [id, ...rest] = argv;
  const opts = { id, tier: null, all: false, apply: false, replace: false, carry: {} };
  for (let i = 0; i < rest.length; i++) {
    const arg = rest[i];
    if (arg === "--apply") opts.apply = true;
    else if (arg === "--replace") opts.replace = true;
    else if (arg === "--all") opts.all = true;
    else if (arg === "--carry") {
      const spec = rest[++i];
      if (!spec) throw new Error(USAGE);
      // "3,7" in single-tier mode; "warm:3,7" in --all mode.
      const m = /^(?:([a-z]+):)?([\d,]+)$/.exec(spec);
      if (!m) throw new Error(`--carry ${spec}: expected n,… or <tier>:n,…`);
      const key = m[1] ?? "";
      if (m[1] && !TIERS.includes(m[1])) throw new Error(`--carry ${spec}: unknown tier ${m[1]}`);
      opts.carry[key] = [...(opts.carry[key] ?? []), ...m[2].split(",").filter(Boolean).map(Number)];
    } else if (!opts.tier && TIERS.includes(arg)) opts.tier = arg;
    else throw new Error(`unknown arg ${arg}\n${USAGE}`);
  }
  if (!id || opts.all === Boolean(opts.tier)) throw new Error(USAGE);
  if (opts.all && opts.carry[""]) throw new Error("--all needs --carry <tier>:n,…");
  if (!opts.all) {
    for (const key of Object.keys(opts.carry)) {
      if (key && key !== opts.tier) throw new Error(`--carry ${key}:…: this run only splits ${opts.tier}`);
    }
    opts.carry = { [opts.tier]: [...(opts.carry[""] ?? []), ...(opts.carry[opts.tier] ?? [])] };
  }
  return opts;
}

// Splits one tier on in-memory texts. Returns the new texts (or null when a
// pool is over target), printing the marked beats and the count table.
function splitTier(src, id, tier, carry, replace) {
  const { located, beats } = parseTier(src.dialogue, tier);
  if (!beats) throw new Error(`dialogue.${tier} isn't in ${id}.js (already split?)`);
  const marked = beats.filter((b) => b.lineMarks || b.greetingMarks);
  if (!marked.length) throw new Error(`dialogue.${tier} has no ✓ marks`);

  for (const n of carry) {
    if (!marked.some((b) => b.n === n)) throw new Error(`--carry ${tier}:${n}: not a marked beat`);
  }

  const meet = [];
  const roam = [];
  const flags = [];
  console.log(`\n${id} ${tier}: ${beats.length} beats, ${marked.length} marked\n`);
  for (const b of marked) {
    const { beat } = b;
    const carried = carry.includes(b.n);
    const toRoam = b.lineMarks >= 1;
    let meetSrc = null;
    if (b.lineMarks >= 2 && b.greetingMarks) {
      throw new Error(`${tier} beat #${b.n}: ✓✓ on line and ✓ on greeting; which one is the /meet line?`);
    }
    if (b.lineMarks >= 2) meetSrc = "line";
    else if (b.greetingMarks) meetSrc = "greeting";
    if (b.lineMarks > 2 || b.greetingMarks > 1) flags.push(`#${b.n}: unusual mark count (line ${b.lineMarks}, greeting ${b.greetingMarks})`);

    const where = [toRoam && "roam", meetSrc && `meet(${meetSrc})`].filter(Boolean).join(" + ");
    console.log(`  #${String(b.n).padEnd(3)}${carried ? "CARRY " : ""}${where}${beat.mood ? "  [mood]" : ""}`);
    console.log(`        ${beat.line}`);
    if (carried) continue;

    if (toRoam) roam.push(beat);
    if (meetSrc) {
      let spoken = beat[meetSrc];
      if (Array.isArray(spoken)) {
        if (spoken.length !== 1) throw new Error(`${tier} beat #${b.n}: ${meetSrc} has ${spoken.length} variants; which is the /meet line?`);
        spoken = spoken[0];
      }
      const bare = unquoteSpoken(spoken);
      if (bare === null && /"/.test(spoken)) {
        flags.push(`#${b.n}: /meet line kept as-is, has inner quotes or narration: ${spoken}`);
      }
      // { line, responses, mood? } in the beat's key order.
      const m = {};
      for (const key of Object.keys(beat)) {
        if (key === "line") m.line = bare ?? spoken;
        else if (key === "responses") m.responses = beat.responses;
        else if (key === "mood") m.mood = beat.mood;
      }
      meet.push(m);
    }
  }

  const table = [
    ["meet", meet, SPLIT_POOL_TARGET_BY_TIER.meet[tier], SPLIT_MOOD_TARGET_BY_TIER.meet[tier]],
    ["roam", roam, SPLIT_POOL_TARGET_BY_TIER.roam[tier], SPLIT_MOOD_TARGET_BY_TIER.roam[tier]],
  ].map(([pool, list, target, moodTarget]) => {
    const moods = list.filter((b) => b.mood).length;
    return { pool, beats: list.length, target, draft: Math.max(0, target - list.length), moods, moodTarget, moodDraft: Math.max(0, moodTarget - moods) };
  });
  console.log("\n  pool  copied/target  to draft   moods/target  to flag");
  for (const r of table) {
    const over = r.beats > r.target || r.moods > r.moodTarget;
    console.log(`  ${r.pool}  ${String(r.beats).padStart(6)}/${String(r.target).padEnd(6)}  ${String(r.draft).padStart(8)}   ${String(r.moods).padStart(5)}/${String(r.moodTarget).padEnd(6)}  ${String(r.moodDraft).padStart(7)}${over ? "   OVER" : ""}`);
  }
  if (carry.length) console.log(`\n  carrying up: ${carry.map((n) => `#${n}`).join(", ")}`);
  if (flags.length) console.log(`\n  flags:\n${flags.map((f) => `    ${f}`).join("\n")}`);

  if (table.some((r) => r.beats > r.target || r.moods > r.moodTarget)) return null;

  // Carry-up target.
  const nextTier = TIERS[TIERS.indexOf(tier) + 1];
  const carried = beats.filter((b) => carry.includes(b.n));
  if (carried.length && nextTier && !located[nextTier]) {
    throw new Error(`next tier ${nextTier} is already split; ask the user where ${tier} #${carry.join(", #")} go`);
  }
  if (carried.length && !nextTier) console.log(`\n  bound overflow will be dropped: #${carry.join(", #")}`);

  const out = { ...src };
  if (meet.length) out.meet = insertTier(src.meet, tier, meet.map((b) => serializeBeat(b, "    ")).join("\n"), replace);
  if (roam.length) out.roam = insertTier(src.roam, tier, roam.map((b) => serializeBeat(b, "    ")).join("\n"), replace);

  let d = src.dialogue;
  if (carried.length && nextTier) {
    const nextOpen = located[nextTier].open;
    const nextClose = matching(d, nextOpen);
    const insertAt = d.lastIndexOf("\n", nextClose) + 1;
    const block = carried.map((b) => `      // candidate from ${tier}\n      ${b.raw},\n`).join("");
    d = d.slice(0, insertAt) + block + d.slice(insertAt);
  }
  // Delete the tier. Its positions still hold after the carry insert: the
  // next tier always comes after it in the file.
  const tierKey = located[tier].key;
  const lineStart = d.lastIndexOf("\n", tierKey.at) + 1;
  let end = matching(d, located[tier].open) + 1;
  if (d[end] === ")") end++; // withPronounVariants([ … ])
  if (d[end] === ",") end++;
  if (d[end] === "\n") end++;
  out.dialogue = d.slice(0, lineStart) + d.slice(end);
  return out;
}

// --all stops here for now; bound is split on its own (node … <id> bound).
const ALL_LAST_TIER = "close";

// Tiers still in the dialogue file, new through ALL_LAST_TIER, in ladder order.
function unsplitTiers(dialogueText) {
  const { located } = parseTier(dialogueText, "new");
  return TIERS.slice(0, TIERS.indexOf(ALL_LAST_TIER) + 1).filter((t) => located[t]);
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  const { id } = opts;
  const files = {
    dialogue: path.join(ROOT, "constants/dialogue", `${id}.js`),
    meet: path.join(ROOT, "constants/meet", `${id}.js`),
    roam: path.join(ROOT, "constants/roam", `${id}.js`),
  };
  const original = Object.fromEntries(Object.entries(files).map(([k, f]) => [k, fs.readFileSync(f, "utf8")]));

  // --all walks the unsplit tiers in order on in-memory texts, so each tier's
  // carry-ups count toward the next before it's split. It stops at the first
  // tier with no marks, and at the first tier over target (pick --carry
  // <tier>:n,… and re-run). Nothing is written unless every tier it reached
  // fits.
  let tiers = opts.all ? unsplitTiers(original.dialogue) : [opts.tier];
  if (!tiers.length) throw new Error(`${id} has no unsplit tiers from new to ${ALL_LAST_TIER}; split bound with: node scripts/split-tier.js ${id} bound`);
  for (const key of Object.keys(opts.carry)) {
    if (opts.carry[key].length && !tiers.includes(key)) throw new Error(`--carry ${key}:…: ${key} isn't an unsplit tier this run reaches (--all covers new–${ALL_LAST_TIER})`);
  }
  let src = original;
  const done = [];
  let blocked = null;
  for (const tier of tiers) {
    if (opts.all && !parseTier(src.dialogue, tier).beats.some((b) => b.lineMarks || b.greetingMarks)) {
      console.log(`\n${id} ${tier}: no ✓ marks, stopping here.`);
      break;
    }
    const next = splitTier(src, id, tier, opts.carry[tier] ?? [], opts.replace);
    if (!next) {
      blocked = tier;
      break;
    }
    src = next;
    done.push(tier);
  }
  if (!done.length && !blocked) throw new Error("nothing marked to split");

  if (blocked) {
    const flag = opts.all ? `--carry ${blocked}:n,…` : "--carry n,…";
    console.log(`\nOver target in ${blocked}: choose beats to carry up (${flag}) or moods to unflag.`);
    if (opts.apply) throw new Error(`nothing written; ${blocked} is over target`);
    return;
  }
  if (!opts.apply) {
    console.log(`\nDry run (${done.join(", ")}). Re-run with --apply to write.`);
    return;
  }
  const changed = Object.keys(files).filter((k) => src[k] !== original[k]);
  for (const k of changed) fs.writeFileSync(files[k], src[k]);
  console.log(`\nSplit ${done.join(", ")}. Wrote ${changed.map((k) => path.relative(ROOT, files[k])).join(", ")}.`);
}

try {
  main();
} catch (e) {
  console.error(`split-tier: ${e.message}`);
  process.exit(1);
}
