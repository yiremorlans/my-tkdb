#!/usr/bin/env node
/**
 * dialogue-pairing-report — snapshots how far each character is through the
 * dialogue/approach pairing migration (docs/dialogue-approach-pairing.md).
 *
 * For every character it reports, per tier (new/known/warm/spark/close/bound):
 *   - the raw `dialogue[tier]` entry count, and how many of those entries are
 *     already { line, approach } beats vs. still bare strings
 *   - DIALOGUE_POOL_TARGET_BY_TIER for that tier, so you can see whether a
 *     count that looks "done" actually hits the target
 * ...and separately, the `dialogueWhen` conditional block(s), if any: total
 * lines vs. how many are paired.
 *
 * A tier only counts as meeting its target when its PAIRED count reaches the
 * target; bare-string lines have no approach of their own and draw the
 * shared/generic label instead (see docs/dialogue-approach-pairing.md).
 *
 * Usage:
 *   node scripts/dialogue-pairing-report.js            # human-readable table
 *   node scripts/dialogue-pairing-report.js --json      # machine-readable, to stdout
 *
 * Used to regenerate the data embedded in the "Dialogue Pairing Tracker"
 * artifact after each round of migration — re-run this, then update and
 * republish that artifact with the fresh JSON.
 */
import { DIALOGUE } from "../constants/dialogue.js";
import { DIALOGUE_POOL_TARGET_BY_TIER } from "../constants/game.js";
import { CHARACTERS } from "../constants/characters.js";

const TIERS = ["new", "known", "warm", "spark", "close", "bound"];
const jsonMode = process.argv.includes("--json");

function isBeat(entry) {
  return !!entry && typeof entry === "object" && typeof entry.line === "string";
}

// Resolves a tier's raw value (array, or variant-keyed map like Jo's
// uniform/casual) to { count, pairedCount, variantNote, exists }. For a
// variant-keyed pool, reports the *minimum* across variants — a variant
// that lags behind another shouldn't be hidden by one that's ahead.
function analyzeTierValue(value) {
  if (value === undefined) {
    return { count: 0, pairedCount: 0, variantNote: null, exists: false };
  }
  if (Array.isArray(value)) {
    return {
      count: value.length,
      pairedCount: value.filter(isBeat).length,
      variantNote: null,
      exists: true,
    };
  }
  if (typeof value === "object") {
    const variants = Object.entries(value);
    const results = variants.map(([, arr]) => analyzeTierValue(arr));
    return {
      count: Math.min(...results.map((r) => r.count)),
      pairedCount: Math.min(...results.map((r) => r.pairedCount)),
      variantNote: variants.map(([key]) => key).join("/"),
      exists: true,
    };
  }
  return { count: 1, pairedCount: 0, variantNote: null, exists: true };
}

function analyzeDialogueWhen(dialogueWhen) {
  if (!dialogueWhen) return null;
  let total = 0;
  let paired = 0;
  const tierBreak = {};
  for (const block of dialogueWhen) {
    for (const tier of Object.keys(block.dialogue || {})) {
      const arr = block.dialogue[tier];
      if (!Array.isArray(arr)) continue;
      const p = arr.filter(isBeat).length;
      total += arr.length;
      paired += p;
      tierBreak[tier] = { count: arr.length, pairedCount: p };
    }
  }
  return { total, paired, tierBreak };
}

const nameById = Object.fromEntries(CHARACTERS.map((c) => [c.id, c.firstName || c.id]));
const order = Object.keys(DIALOGUE);

const rows = order.map((id) => {
  const content = DIALOGUE[id];
  const dialogueTiers = {};
  for (const tier of TIERS) {
    dialogueTiers[tier] = analyzeTierValue(content.dialogue?.[tier]);
  }
  return {
    id,
    name: nameById[id] || id,
    dialogueTiers,
    dialogueWhen: analyzeDialogueWhen(content.dialogueWhen),
  };
});

const report = {
  generatedAt: new Date().toISOString(),
  targets: DIALOGUE_POOL_TARGET_BY_TIER,
  order,
  rows,
};

if (jsonMode) {
  console.log(JSON.stringify(report, null, 2));
  process.exit(0);
}

// --- human-readable summary ---
console.log(`Targets: ${TIERS.map((t) => `${t}=${DIALOGUE_POOL_TARGET_BY_TIER[t]}`).join(", ")}\n`);

const header = ["character", ...TIERS.flatMap((t) => [`${t} d/p`]), "dW"].join("\t");
console.log(header);
for (const row of rows) {
  const cells = TIERS.map((t) => {
    const d = row.dialogueTiers[t];
    return `${d.count}/${d.pairedCount}`;
  });
  const dw = row.dialogueWhen ? `${row.dialogueWhen.paired}/${row.dialogueWhen.total}` : "-";
  console.log([row.id, ...cells, dw].join("\t"));
}
