#!/usr/bin/env node
/**
 * response-pairing-report — snapshots how many of each dialogue[tier] beat's
 * four response types (kind/playful/bold/neutral) carry their own bespoke
 * `responses` override, instead of falling through to the generic per-tier
 * pool (docs/dialogue-greeting-pairing.md §2a — "Path A" of the response
 * pairing work, as distinct from "Path B", rescoping RESPONSE_LABEL_TIER
 * itself).
 *
 * Only counts entries that are already { line, approach } beats — a tier
 * still written as bare strings (not yet migrated by the
 * dialogue-approach-pairing project) has no beat to attach a response
 * override to at all, and reports as 0 beats / N/A rather than 0% covered.
 *
 * Usage:
 *   node scripts/response-pairing-report.js            # human-readable table
 *   node scripts/response-pairing-report.js --json      # machine-readable, to stdout
 *
 * Used to regenerate the "Response-button pairing" section embedded in the
 * "Dialogue Pairing Tracker" artifact — re-run this, then update and
 * republish that artifact with the fresh JSON (see its footer for the
 * approach-pairing half's own refresh instructions; this section follows the
 * same pattern under a second embedded data blob).
 */
import { DIALOGUE } from "../constants/dialogue.js";
import { CHARACTERS } from "../constants/characters.js";

const TIERS = ["new", "known", "warm", "spark", "close", "bound"];
const TYPES = ["kind", "playful", "bold", "neutral"];
const jsonMode = process.argv.includes("--json");

function isBeat(entry) {
  return !!entry && typeof entry === "object" && typeof entry.line === "string";
}

// Resolves a tier's raw value to its beat array, or null if the tier doesn't
// exist / has nothing beat-shaped. Variant-keyed pools (Jo's uniform/casual)
// report the shortest variant's beats, same rationale as
// dialogue-pairing-report.js's analyzeTierValue — a lagging variant shouldn't
// be hidden by one that's ahead.
function beatsFor(value) {
  if (value === undefined) return null;
  if (Array.isArray(value)) return value;
  if (typeof value === "object") {
    const arrays = Object.values(value).filter(Array.isArray);
    if (!arrays.length) return null;
    return arrays.reduce((min, arr) => (arr.length < min.length ? arr : min));
  }
  return null;
}

function analyzeTier(value) {
  const beats = beatsFor(value);
  if (!beats) return { beatCount: 0, types: null, totalSlots: 0, coveredSlots: 0 };

  const onlyBeats = beats.filter(isBeat);
  const types = {};
  let coveredSlots = 0;
  for (const type of TYPES) {
    const covered = onlyBeats.filter((b) => !!(b.responses && b.responses[type])).length;
    types[type] = covered;
    coveredSlots += covered;
  }
  return {
    beatCount: onlyBeats.length,
    types,
    totalSlots: onlyBeats.length * TYPES.length,
    coveredSlots,
  };
}

const nameById = Object.fromEntries(CHARACTERS.map((c) => [c.id, c.firstName || c.id]));
const order = Object.keys(DIALOGUE);

const rows = order.map((id) => {
  const content = DIALOGUE[id];
  const tiers = {};
  for (const tier of TIERS) {
    tiers[tier] = analyzeTier(content.dialogue?.[tier]);
  }
  return { id, name: nameById[id] || id, tiers };
});

const report = {
  generatedAt: new Date().toISOString(),
  tiers: TIERS,
  types: TYPES,
  order,
  rows,
};

if (jsonMode) {
  console.log(JSON.stringify(report, null, 2));
  process.exit(0);
}

// --- human-readable summary ---
console.log(
  `Response-button pairing (${TYPES.join("/")}) — coveredSlots / totalSlots per tier\n(a tier with 0 beats — not yet migrated to { line, approach } — shows as "-")\n`,
);

const header = ["character", ...TIERS].join("\t");
console.log(header);
for (const row of rows) {
  const cells = TIERS.map((t) => {
    const s = row.tiers[t];
    return s.beatCount === 0 ? "-" : `${s.coveredSlots}/${s.totalSlots}`;
  });
  console.log([row.id, ...cells].join("\t"));
}
