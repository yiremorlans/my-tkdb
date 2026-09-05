#!/usr/bin/env node
/**
 * voice-check — semantic voice + canon review of changed dialogue lines.
 *
 * The static rules (em dashes, 30-char labels, British spelling, reused
 * bond-scene lines) belong to constants/validateContent.js and run in
 * `npm test`. This script is the subjective layer on top: does a changed line
 * actually sound like the character in constants/dialogue/reference.md, and
 * does it stay inside canon (no invented traits, right register, house style)?
 *
 * It sends changed lines to the Claude API (claude-opus-5), one request per
 * character, so it costs credits. Use --dry-run to see the plan and estimate
 * first.
 *
 * This tool is kept local (not committed) and its deps are not in package.json.
 * One-time setup:  npm i --no-save @anthropic-ai/sdk zod
 *
 * Usage:
 *   node scripts/voice-check.js                       # working tree vs HEAD
 *   node scripts/voice-check.js --base main           # vs another git ref
 *   node scripts/voice-check.js --char leo,shion      # limit to characters
 *   node scripts/voice-check.js --all                 # every line, every file (costly)
 *   node scripts/voice-check.js --json                # machine-readable to stdout
 *   node scripts/voice-check.js --dry-run             # plan + token estimate, no API call
 *
 * Exit: 0 clean (no FAIL) · 1 at least one FAIL · 2 setup / usage error
 */
import "dotenv/config";
import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";

import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";

import { CHARACTERS } from "../constants/characters.js";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, "..");
const DIALOGUE_DIR = path.join(REPO, "constants", "dialogue");
const REFERENCE = path.join(DIALOGUE_DIR, "reference.md");

// ---------------------------------------------------------------------------
// House style rules — the project canon a reviewer has to hold in mind. Kept
// in sync with the auto-memory in .claude (dialogue-reference-source-of-truth,
// no-em-dashes-in-dialogue, american-spelling-only, honor-roll-capitalized,
// heebie-jeebie-house-canon, sho-teases-never-insults-mc, leo-intimidating-
// not-scary, elias-no-pet-names, negative-affinity-feature).
// ---------------------------------------------------------------------------
const HOUSE_RULES = `- constants/dialogue/reference.md is the source of truth for voice and traits.
  Never accept a line that invents a trait, backstory, age, or relationship the
  reference does not support.
- No em dashes in authored character lines. validateContent.js is the real
  guard for this, but flag any you see.
- American spelling only. EXCEPTION: Lucas is a canon UK transfer student and
  keeps British forms ("mum", "colour", "maths").
- "Honor Roll" is the MC's nickname — both words capitalized, never "Honor roll".
- "Heebie-Jeebie House" is the canon name of Shion's hangout. Never "Waku-Waku
  House", "Exciting House", or any other rename.
- Shohei ("Sho") teases the MC but never insults her. His aggressive register is
  aimed at Leo or at himself, not at her.
- Leo is intimidating socially and reputationally, not physically frightening —
  he says himself he does not hit people. A line that makes him scary in a
  bodily-harm way is off.
- Elias never uses pet names ("sugar", "darlin'", "sweetheart"). His warmth is
  the drawl and the courtesy, not endearments.
- Leo, Shion, Taiga, Romeo, Yuri, and Ritsu are volatile / enemies-to-lovers
  types. Thorny, sardonic, prickly registers are in character for them, not a
  defect.`;

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------
function parseCli() {
  let values;
  try {
    ({ values } = parseArgs({
      options: {
        base: { type: "string", default: "HEAD" },
        char: { type: "string", multiple: true },
        all: { type: "boolean", default: false },
        json: { type: "boolean", default: false },
        model: { type: "string", default: "claude-opus-5" },
        concurrency: { type: "string", default: "4" },
        "dry-run": { type: "boolean", default: false },
        help: { type: "boolean", default: false },
      },
    }));
  } catch (err) {
    fail(2, err.message);
  }
  if (values.help) {
    const doc = readFileSync(fileURLToPath(import.meta.url), "utf8")
      .split("\n")
      .slice(2, 26) // between /** and */
      .map((l) => l.replace(/^ \* ?/, ""));
    console.log(doc.join("\n").trim());
    process.exit(0);
  }
  const only = (values.char ?? [])
    .flatMap((c) => c.split(","))
    .map((c) => c.trim().toLowerCase())
    .filter(Boolean);
  return {
    ...values,
    only,
    concurrency: Math.max(1, parseInt(values.concurrency, 10) || 4),
  };
}

function fail(code, msg) {
  console.error(`voice-check: ${msg}`);
  process.exit(code);
}

// ---------------------------------------------------------------------------
// reference.md — split the flat text dump into per-character sections. Each
// section starts on a line that is exactly a character's firstName; the
// trailing "## Bond Scenes" block is shared context.
// ---------------------------------------------------------------------------
function loadReferenceSections(charById) {
  let md;
  try {
    md = readFileSync(REFERENCE, "utf8");
  } catch {
    return new Map();
  }
  const byFirstName = new Map(
    [...charById.values()].map((c) => [c.firstName, c.id]),
  );
  const lines = md.split("\n");
  const marks = [];
  lines.forEach((ln, i) => {
    const name = ln.trim();
    if (byFirstName.has(name))
      marks.push({ key: byFirstName.get(name), at: i });
    else if (ln.startsWith("## Bond Scenes"))
      marks.push({ key: "__bond__", at: i });
  });
  marks.sort((a, b) => a.at - b.at);
  const sections = new Map();
  marks.forEach((m, k) => {
    const end = k + 1 < marks.length ? marks[k + 1].at : lines.length;
    sections.set(m.key, lines.slice(m.at, end).join("\n").trim());
  });
  return sections;
}

// ---------------------------------------------------------------------------
// String-literal extraction — a tiny scanner good enough for these data files
// (single line per authored string, no template interpolation). Unescapes the
// common sequences so the model sees clean prose.
// ---------------------------------------------------------------------------
function stringLiterals(src) {
  const out = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (c === '"' || c === "'" || c === "`") {
      const q = c;
      i++;
      let v = "";
      while (i < src.length) {
        const d = src[i];
        if (d === "\\") {
          const n = src[i + 1] ?? "";
          v += n === "n" ? "\n" : n === "t" ? "\t" : n;
          i += 2;
          continue;
        }
        if (d === q) {
          i++;
          break;
        }
        v += d;
        i++;
      }
      out.push(v);
    } else if (c === "/" && src[i + 1] === "/") {
      break; // line comment — ignore the rest
    } else {
      i++;
    }
  }
  return out;
}

const SLUG = /^[a-z][a-z0-9_]{1,14}$/;
const EMOJI_ONLY = /^(?:\p{Extended_Pictographic}|️|‍|\p{Emoji_Modifier})+$/u;

function isProse(s) {
  const t = s.trim();
  if (t.length < 4) return false;
  if (SLUG.test(t)) return false; // "kind", "playful", "answered"
  if (EMOJI_ONLY.test(t)) return false; // keepsake.emoji
  if (/^[\d\s.,%$+-]+$/.test(t)) return false; // numeric
  if (/^\{[a-zA-Z]+\}$/.test(t)) return false; // lone placeholder
  return true;
}

// Best-effort field key from the raw source line: `close: "..."`, `label: "..."`.
function fieldKeyOf(rawLine) {
  const m = rawLine.match(/^\s*([a-zA-Z][a-zA-Z0-9_]*)\s*:\s*(?:\[\s*)?["'`]/);
  return m ? m[1] : null;
}

// ---------------------------------------------------------------------------
// Source of candidate lines: git diff (default) or a full scan (--all).
// Each item: { id, file, line, location, text }
// ---------------------------------------------------------------------------
function fromGitDiff(base, only) {
  let raw;
  try {
    raw = execFileSync(
      "git",
      ["diff", "--unified=0", "--no-color", base, "--", "constants/dialogue/"],
      { cwd: REPO, encoding: "utf8", maxBuffer: 128 * 1024 * 1024 },
    );
  } catch (err) {
    fail(
      2,
      `git diff failed (${err.status ?? "?"}). Is "${base}" a valid ref?`,
    );
  }
  const items = [];
  let file = null;
  let id = null;
  let newLine = 0;
  let section = "";
  for (const ln of raw.split("\n")) {
    if (ln.startsWith("+++ ")) {
      file = ln.startsWith("+++ b/") ? ln.slice(6).trim() : null;
      const m = file && file.match(/constants\/dialogue\/([a-z0-9_]+)\.js$/i);
      id = m ? m[1].toLowerCase() : null;
      continue;
    }
    if (ln.startsWith("@@")) {
      const m = ln.match(/@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@(.*)/);
      if (m) {
        newLine = parseInt(m[1], 10);
        section = m[2].trim().replace(/\{$/, "").trim();
      }
      continue;
    }
    if (!id) continue;
    if (only.length && !only.includes(id)) continue;
    if (ln.startsWith("+") && !ln.startsWith("+++")) {
      const body = ln.slice(1);
      const key = fieldKeyOf(body);
      const location =
        [section, key].filter(Boolean).join(" / ") || "(changed)";
      for (const lit of stringLiterals(body)) {
        if (isProse(lit))
          items.push({ id, file, line: newLine, location, text: lit.trim() });
      }
      newLine++;
    } else if (ln.startsWith(" ")) {
      newLine++;
    }
    // '-' lines do not advance the new-file line counter
  }
  return items;
}

function fromFullScan(only) {
  const files = readdirSync(DIALOGUE_DIR).filter(
    (f) =>
      f.endsWith(".js") &&
      (!only.length || only.includes(f.replace(/\.js$/, ""))),
  );
  const items = [];
  for (const f of files) {
    const id = f.replace(/\.js$/, "");
    const src = readFileSync(path.join(DIALOGUE_DIR, f), "utf8").replace(
      /^\s*\/\*[\s\S]*?\*\//,
      "",
    );
    const seen = new Set();
    for (const lit of stringLiterals(src)) {
      const t = lit.trim();
      if (isProse(lit) && !seen.has(t)) {
        seen.add(t);
        items.push({
          id,
          file: `constants/dialogue/${f}`,
          line: 0,
          location: "(full scan)",
          text: t,
        });
      }
    }
  }
  return items;
}

// ---------------------------------------------------------------------------
// Prompt assembly + review call
// ---------------------------------------------------------------------------
const Result = z.object({
  findings: z.array(
    z.object({
      index: z.number().int(),
      verdict: z.enum(["pass", "warn", "fail"]),
      reason: z.string(),
      suggested_fix: z.string(),
    }),
  ),
});

function systemPrompt(char, refSection, bondSection, needsBond) {
  const kw = (char.keywords ?? []).map((k) => `  - ${k}`).join("\n");
  return [
    `You review dialogue for a Discord dating-sim. For each CHANGED LINE, decide whether it sounds like ${char.firstName} and stays inside canon.`,
    "",
    "GROUND TRUTH — constants/dialogue/reference.md (authoritative for voice and traits):",
    refSection ||
      "(no reference.md section found for this character — judge from the structured traits below)",
    ...(needsBond && bondSection
      ? ["", "SHARED BOND-SCENE NOTES:", bondSection]
      : []),
    "",
    "STRUCTURED TRAITS — constants/characters.js:",
    `- firstName: ${char.firstName}`,
    `- archetype: ${JSON.stringify(char.archetype ?? [])}`,
    `- affinityByResponse: ${JSON.stringify(char.affinityByResponse ?? {})}  (which reply style lands: higher = resonates more)`,
    kw ? `- keywords:\n${kw}` : "- keywords: (none)",
    "",
    "HOUSE STYLE RULES — a violation is at least a WARN, usually a FAIL:",
    HOUSE_RULES,
    "",
    "VERDICTS:",
    "- pass: sounds like the character, no canon problem. Leave reason and suggested_fix as empty strings.",
    "- warn: understandable but slightly off — register drift, soft canon tension, a word choice the character would not pick. Give a reason and a suggested_fix.",
    "- fail: contradicts reference.md or the structured traits, invents a trait, breaks a house style rule, or reads as a different character. Give a reason and a suggested_fix.",
    "",
    "Judge voice and canon ONLY. Do NOT flag: line length, profanity that fits the character, {placeholders} such as {firstName} / {favResponse} / {timesMet}, or Markdown formatting (*italics*, leading > blockquotes, **{firstName}**: DM prefixes). Those are intentional.",
    "Return exactly one finding per changed line, in the same order, with matching index.",
  ].join("\n");
}

function userPrompt(char, lines) {
  const blocks = lines.map(
    (l, i) =>
      `[${i + 1}] location: ${l.location}${l.line ? `  (line ${l.line})` : ""}\n${l.text}`,
  );
  return `CHANGED LINES for ${char.firstName}:\n\n${blocks.join("\n\n")}`;
}

async function review(client, model, char, refSection, bondSection, lines) {
  const needsBond = lines.some((l) => /bond/i.test(l.location));
  const system = systemPrompt(char, refSection, bondSection, needsBond);
  const user = userPrompt(char, lines);

  const res = await client.messages.parse({
    model,
    max_tokens: 16000,
    output_config: { effort: "high", format: zodOutputFormat(Result) },
    system: [
      { type: "text", text: system, cache_control: { type: "ephemeral" } },
    ],
    messages: [{ role: "user", content: user }],
  });

  let findings = res.parsed_output?.findings;
  if (!findings) {
    const txt = res.content.find((b) => b.type === "text")?.text ?? "{}";
    findings = JSON.parse(txt).findings ?? [];
  }
  const byIndex = new Map(findings.map((f) => [f.index, f]));
  return lines.map((l, i) => {
    const f = byIndex.get(i + 1) ??
      findings[i] ?? { verdict: "pass", reason: "", suggested_fix: "" };
    return {
      ...l,
      verdict: f.verdict,
      reason: f.reason ?? "",
      fix: f.suggested_fix ?? "",
    };
  });
}

// Small concurrency limiter so a big --all run does not fan out 26 requests.
async function mapLimit(items, limit, fn) {
  const out = new Array(items.length);
  let cursor = 0;
  const workers = Array.from(
    { length: Math.min(limit, items.length) },
    async () => {
      while (cursor < items.length) {
        const idx = cursor++;
        out[idx] = await fn(items[idx], idx);
      }
    },
  );
  await Promise.all(workers);
  return out;
}

// ---------------------------------------------------------------------------
// Reporting
// ---------------------------------------------------------------------------
const GLYPH = { pass: "✓", warn: "⚠", fail: "✗" };

function printHuman(groups, summary, base, mode) {
  for (const g of groups) {
    const bad = g.findings.filter((f) => f.verdict !== "pass");
    console.log(`\n${g.file}`);
    if (bad.length === 0) {
      console.log(
        `  ${GLYPH.pass} all ${g.findings.length} changed line(s) pass`,
      );
      continue;
    }
    for (const f of bad) {
      const loc = f.location + (f.line ? `  line ${f.line}` : "");
      console.log(`  ${GLYPH[f.verdict]} ${f.verdict.toUpperCase()}  ${loc}`);
      console.log(indent(f.text, 6));
      console.log(indent(f.reason, 6, "> "));
      if (f.fix) console.log(indent(f.fix, 6, "fix: "));
    }
  }
  const parts = [
    `${summary.fail} fail`,
    `${summary.warn} warn`,
    `${summary.pass} pass`,
  ];
  console.log(
    `\n${mode === "all" ? "full scan" : `vs ${base}`} — ${parts.join(", ")} across ${groups.length} file(s)`,
  );
}

function indent(text, n, prefix = "") {
  const pad = " ".repeat(n);
  return String(text)
    .split("\n")
    .map((l, i) => pad + (i === 0 ? prefix : " ".repeat(prefix.length)) + l)
    .join("\n");
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const opts = parseCli();
  const charById = new Map(CHARACTERS.map((c) => [c.id, c]));
  const sections = loadReferenceSections(charById);

  const items = opts.all
    ? fromFullScan(opts.only)
    : fromGitDiff(opts.base, opts.only);
  const unknown = [...new Set(items.map((i) => i.id))].filter(
    (id) => !charById.has(id),
  );
  if (unknown.length)
    console.error(
      `voice-check: skipping unknown character file(s): ${unknown.join(", ")}`,
    );

  const byChar = new Map();
  for (const it of items) {
    if (!charById.has(it.id)) continue;
    if (!byChar.has(it.id)) byChar.set(it.id, []);
    byChar.get(it.id).push(it);
  }

  if (byChar.size === 0) {
    const where = opts.all
      ? "in constants/dialogue/"
      : `changed vs ${opts.base}`;
    if (opts.json)
      console.log(
        JSON.stringify(
          {
            base: opts.base,
            files: [],
            summary: { pass: 0, warn: 0, fail: 0 },
          },
          null,
          2,
        ),
      );
    else
      console.error(
        `voice-check: no dialogue lines ${where}${opts.only.length ? ` for ${opts.only.join(", ")}` : ""}.`,
      );
    process.exit(0);
  }

  // Plan + rough cost estimate (chars/4).
  const plan = [...byChar.entries()].map(([id, lines]) => {
    const char = charById.get(id);
    const sys = systemPrompt(
      char,
      sections.get(id) ?? "",
      sections.get("__bond__") ?? "",
      true,
    );
    const usr = userPrompt(char, lines);
    return {
      id,
      count: lines.length,
      tokens: Math.round((sys.length + usr.length) / 4),
    };
  });
  const estTokens = plan.reduce((a, p) => a + p.tokens, 0);
  if (!opts.json) {
    console.error(
      `voice-check · ${opts.all ? "full scan" : `working tree vs ${opts.base}`}`,
    );
    for (const p of plan) console.error(`  ${p.id}.js  ${p.count} line(s)`);
    console.error(
      `${plan.length} character(s) · ${plan.length} request(s) to ${opts.model} · ~${estTokens.toLocaleString()} input tokens (est.)`,
    );
  }
  if (opts["dry-run"]) {
    if (opts.json)
      console.log(
        JSON.stringify(
          { base: opts.base, plan, estimatedInputTokens: estTokens },
          null,
          2,
        ),
      );
    process.exit(0);
  }

  let client;
  try {
    client = new Anthropic();
  } catch {
    fail(
      2,
      "no credentials. Set ANTHROPIC_API_KEY in .env (see .env.sample) or run `ant auth login`.",
    );
  }

  let groups;
  try {
    groups = await mapLimit(
      [...byChar.entries()],
      opts.concurrency,
      async ([id, lines]) => {
        const char = charById.get(id);
        const findings = await review(
          client,
          opts.model,
          char,
          sections.get(id) ?? "",
          sections.get("__bond__") ?? "",
          lines,
        );
        return { id, file: lines[0].file, findings };
      },
    );
  } catch (err) {
    if (err instanceof Anthropic.AuthenticationError) {
      fail(
        2,
        "authentication failed. Set ANTHROPIC_API_KEY in .env or run `ant auth login`.",
      );
    }
    if (err instanceof Anthropic.RateLimitError)
      fail(2, "rate limited — retry in a moment or lower --concurrency.");
    if (err instanceof Anthropic.APIError)
      fail(2, `API error ${err.status ?? ""}: ${err.message}`);
    throw err;
  }

  const summary = { pass: 0, warn: 0, fail: 0 };
  for (const g of groups) for (const f of g.findings) summary[f.verdict]++;

  if (opts.json) {
    console.log(
      JSON.stringify(
        {
          base: opts.all ? null : opts.base,
          mode: opts.all ? "full-scan" : "diff",
          generatedAt: new Date().toISOString(),
          model: opts.model,
          files: groups.map((g) => ({
            file: g.file,
            id: g.id,
            findings: g.findings.map((f) => ({
              line: f.line || null,
              location: f.location,
              verdict: f.verdict,
              text: f.text,
              reason: f.reason,
              suggested_fix: f.fix,
            })),
          })),
          summary,
        },
        null,
        2,
      ),
    );
  } else {
    printHuman(groups, summary, opts.base, opts.all ? "all" : "diff");
  }

  process.exit(summary.fail > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err?.stack || String(err));
  process.exit(2);
});
