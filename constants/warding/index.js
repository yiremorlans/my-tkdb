// Warding cards: a rare outcome shared by /roam and /meet. See
// docs/warding-cards.md for the full spec, the probability analysis, and the
// pity system.
//
// --- PHASE 2 IS NOT BUILT (as of 2026-09-20) ---------------------------------
// Everything in this file that concerns the DRAW is spec, not behaviour. No
// warding card can reach a player today: /roam and /meet never call
// eligibleWardingCards or pickWardingCardForCharacter, nothing rolls
// WARDING_CHANCE, nothing stores or reads a pity counter, and nothing grants
// WARDING_AFFINITY_GAIN. Those three constants have no consumers.
//
// What IS built (phase 1) is the content and the render: the cards below, the
// compositor (composeWardingCard), the Components V2 builders in encounters.js
// and the owner-only /encdev warding preview that reaches them. The preview
// grants nothing and touches no state.
//
// Phase 2 — the pull rates and the pity system, applied to every player during
// /roam and /meet — is deliberately deferred, and is the task list in
// docs/warding-cards.md §9. The flow below describes what it will do.
// -----------------------------------------------------------------------------
//
// The command flow is unchanged up to the point the character is
// fixed (/roam draws one; /meet's player picks one):
//   1. The character is fixed exactly as it is today.
//   2. If that character has a non-empty eligible pool, roll WARDING_CHANCE
//      (10%) — or force a hit if the player's pity counter has reached 0. On a
//      miss, the command proceeds as a normal encounter and the pity counter
//      ticks down by one (see docs/warding-cards.md §pity).
//   3. On a hit, pick one warding card at random from that character's ELIGIBLE
//      pool — every card whose `characters` array includes the fixed character
//      (solo and shared alike, so a Ren draw can land on a Ren+Haru card), whose
//      `responses` are written (soft rollout — see eligibleWardingCards),
//      AND whose `minLevel` gate, if any, the player's relationship with that
//      character clears. The pick is uniform across that pool. Showing a card
//      refills the pity counter to WARDING_PITY. See pickWardingCardForCharacter.
//   4. Show the card. It keeps the two-message shape every /roam uses, and it
//      fills the same three render slots a dialogue beat fills: the command
//      replies instantly with the card's `line` as text plus one button
//      labelled `approach`; clicking it does the image composition and edits
//      the message to the art (with `greeting` painted into its dialogue box)
//      plus the response buttons. The button is what gets past Discord's 3s
//      ack and triggers the render, same as a normal encounter's "Step
//      forward" — but `approach` is authored per card so the label hints at
//      that specific moment.
//   5. `responses` offers exactly three buttons — kind / playful / bold, no
//      NEUTRAL fourth — and every one of them grants a flat WARDING_AFFINITY_GAIN
//      (+2). The pick only changes the `close` line, never the reward. The
//      `close` is shown as text under the card where the buttons were, taking
//      the slot a normal encounter gives getReactionLine.
// A character with no eligible card just never reaches step 3 — the command
// falls back to a normal encounter, exactly as for a character with no cards at
// all, and Benkei (no warding art, ./benkei.js exports {}) never counts toward
// pity.
//
// A warding card still goes through image composition like a /roam scene — its
// `greeting` is drawn onto the image in the same dialogue box
// (imageComposition.js) and the result is sent as a Discord attachment. The
// only difference from a normal encounter is the base layer: there is no
// background + character composite, the art in assets/warding/ IS the whole
// image, and the dialogue box is drawn straight onto it.
//
// --- file layout (mirrors constants/dialogue/) ---------------------------------
// One file per character for that character's SOLO cards (./ren.js -> Ren,
// Ren_2, Ren_3, ...). Every card with two or more characters lives in
// ./shared.js (Ren_Haru, Ren_Haru_Towa, Kaito_Lucas, ...), regardless of who
// is in it. Placement follows the asset filename: one name -> that character's
// file; two or more names -> shared.js. This index merges them into one map.
//
// --- entry shape -------------------------------------------------------------
// Keyed by the asset filename without its extension, so the merged map is 1:1
// with assets/warding/ and keys are globally unique. Each entry:
//   file       - the asset filename in assets/warding/
//   characters - constants/characters.js ids the card belongs to. Order does
//                not matter (the /roam lookup tests membership, not position).
//                Source of truth for the lookup; nothing parses the filename.
//                A solo file's cards all list just that id.
//   title      - short context line, filled by hand; grounds the beat below
//
// The rest of the entry is ONE dialogue beat, inlined. A card uses the same
// four field names a constants/dialogue beat uses — `line`, `approach`,
// `greeting`, `responses` — and they land in the same render slots, so the
// warding builders are the normal /roam builders with a different base image.
// The difference is that a beat is a pool member drawn from a tier, while a
// card is a single authored moment bolted to one piece of art: no tiers, no
// variants, no arrays, and the fields sit flat on the card.
//   line       - the step-1 reply, shown as plain text while nothing is
//                rendered yet (the beat's `line`). ONE string. Nothing in the
//                card marks it as rare: the tell is the sparkle on the
//                approach button, which encounters.js adds at render.
//   approach   - the label on the step-1 button that reveals the card (the
//                beat's `approach`). One authored string per card, <= 30
//                chars, second-person, hinting at this scene without
//                pre-empting a `responses` label. No tiers, no random pool —
//                a rare card gets one deliberate label.
//   greeting   - painted into the card art's dialogue box by
//                imageComposition.js when the player clicks through, exactly
//                as a beat's `greeting` is painted onto a /roam composite.
//                This is the line that carries the scene; `line` only hooks.
//                It is plain text on a canvas, so Discord markdown does
//                nothing (emphasis asterisks are stripped at the paint) and
//                the dialogue font has no emoji glyphs — an emoji there
//                renders as an empty box. Write it plain, as /roam greetings
//                are written.
//   responses  - { kind: { label, close }, playful: {...}, bold: {...} }
//                the three buttons shown under the art, in that order. EXACTLY
//                those three keys (no NEUTRAL fourth) — validated at load.
//                Leave `responses: {}` until written; that empty object is the
//                soft-rollout gate. `label` is the button text; `close` is the
//                line revealed as text under the card once it is clicked,
//                where the buttons were. There is no per-option `style`: the
//                row uses RESPONSE_STYLES (constants/game.js) like every other
//                response row, so kind/playful/bold stay green/blurple/red
//                everywhere. Every pick grants the same flat
//                WARDING_AFFINITY_GAIN; only the `close` differs.
//   minLevel   - OPTIONAL. A RELATIONSHIP_LEVELS name (game.js): "Stranger",
//                "Acquaintance", "Friend", "Close Friend", "Confidant",
//                "Devoted", "Soulbound". The card only enters the pool once the
//                player's relationship with the drawn character is at least
//                this level. Omit it (or use "Stranger") for a card that is
//                always eligible. Validated at load — a typo throws.

import { RELATIONSHIP_LEVELS } from "../game.js";

// One import per character in constants/characters.js, in the same order as
// constants/dialogue/index.js. A character with no warding art yet keeps a stub
// file that exports {} — listed here so adding art later is only an edit to
// that one file.
import jin from "./jin.js";
import kaito from "./kaito.js";
import lucas from "./lucas.js";
import tohma from "./tohma.js";
import alan from "./alan.js";
import leo from "./leo.js";
import shohei from "./shohei.js";
import subaru from "./subaru.js";
import zenji from "./zenji.js";
import haku from "./haku.js";
import elias from "./elias.js";
import jo from "./jo.js";
import mio from "./mio.js";
import shion from "./shion.js";
import jiro from "./jiro.js";
import yuri from "./yuri.js";
import ren from "./ren.js";
import haru from "./haru.js";
import towa from "./towa.js";
import edward from "./edward.js";
import rui from "./rui.js";
import lyca from "./lyca.js";
import taiga from "./taiga.js";
import ritsu from "./ritsu.js";
import romeo from "./romeo.js";
import benkei from "./benkei.js";
import shared from "./shared.js";

// Probability the warding roll hits, once the character is fixed and has a
// non-empty eligible pool. Applies identically to /roam and /meet. See
// docs/warding-cards.md for the encounter-rate and pity math behind this.
export const WARDING_CHANCE = 0.1;

// Affinity granted for ANY of a warding card's three choices (kind/playful/
// bold). Flat by design — a warding card is a rare reward, not a stat check, so
// the pick only changes the `close` line. Normal encounters still vary the gain
// per response via character.affinityByResponse; warding does not.
export const WARDING_AFFINITY_GAIN = 2;

// Pity: a single per-player counter, shared across /roam and /meet, that starts
// (and refills, on any warding card shown) at WARDING_PITY. Every completed
// encounter with a warding-capable character that does NOT show a card ticks it
// down by one; at 0 the next warding-capable encounter forces a card. Encounters
// featuring a character with no eligible pool (Benkei today, and any character
// still short of authored cards) never touch it. WARDING_PITY sits near the
// 92nd percentile of the geometric wait at WARDING_CHANCE, so pity fires for
// only ~8% of players and the effective rate rises only to ~10.4%.
export const WARDING_PITY = 25;

// Directory under the repo root where warding art lives. The compositor
// (imageComposition.js) reads `${WARDING_ASSET_DIR}/<card.file>` off disk and
// draws the card's dialogue box onto it — mirrors how composeEncounter loads
// from assets/bg/. Not a public URL: the composed image is sent as an
// attachment, same as a /roam scene.
export const WARDING_ASSET_DIR = "assets/warding";

// Ladder position of a RELATIONSHIP_LEVELS name; -1 if it isn't one. Stranger
// is 0, Soulbound is the top. The `minLevel` gate is a >= comparison on this.
function relationshipLevelIndex(levelName) {
  return RELATIONSHIP_LEVELS.findIndex((l) => l.name === levelName);
}

// Whether a card's affinity gate (if it has one) is open for a player at the
// given relationship level. No `minLevel` -> always open. An unknown or missing
// player level is treated as Stranger (index 0), so only ungated cards pass.
export function wardingCardUnlocked(card, levelName) {
  if (!card?.minLevel) return true;
  const need = relationshipLevelIndex(card.minLevel);
  const have = Math.max(0, relationshipLevelIndex(levelName));
  return have >= need;
}

// Per-character solo sources, keyed by the id every card in the file must
// belong to. `shared` is merged separately since its cards span ids.
const SOLO_SOURCES = {
  jin,
  kaito,
  lucas,
  tohma,
  alan,
  leo,
  shohei,
  subaru,
  zenji,
  haku,
  elias,
  jo,
  mio,
  shion,
  jiro,
  yuri,
  ren,
  haru,
  towa,
  edward,
  rui,
  lyca,
  taiga,
  ritsu,
  romeo,
  benkei,
};

// Build the flat map once, at module load, and fail loudly on the mistakes
// copy-pasting card entries invites: a duplicate key (two files claiming one
// asset), a solo file listing a card that isn't that character's, a shared file
// listing a solo card, and a `minLevel` that isn't a real relationship level.
function buildWardingCards() {
  const merged = {};

  const add = (key, card, origin) => {
    if (merged[key]) {
      throw new Error(
        `Duplicate warding card key "${key}" (again in ${origin}). Keys are ` +
          `asset filenames and must be unique across constants/warding/.`,
      );
    }
    if (card.minLevel && relationshipLevelIndex(card.minLevel) === -1) {
      throw new Error(
        `Warding card "${key}" (${origin}) has minLevel "${card.minLevel}", ` +
          `which is not a RELATIONSHIP_LEVELS name. Use one of: ` +
          `${RELATIONSHIP_LEVELS.map((l) => l.name).join(", ")}.`,
      );
    }
    // A card is either an unwritten stub (responses: {}) or fully authored with
    // EXACTLY the three keys kind/playful/bold — no NEUTRAL fourth. The reward
    // is flat (WARDING_AFFINITY_GAIN) so there is nothing to gain from a wider
    // set; the three keys just pick which `close` line shows.
    const responseKeys = Object.keys(card.responses ?? {});
    if (responseKeys.length !== 0) {
      const want = ["kind", "playful", "bold"];
      const ok =
        responseKeys.length === want.length &&
        want.every((k) => responseKeys.includes(k));
      if (!ok) {
        throw new Error(
          `Warding card "${key}" (${origin}) has responses ` +
            `${JSON.stringify(responseKeys)}. A written warding card has exactly ` +
            `["kind","playful","bold"] (order free); leave responses: {} until ` +
            `written.`,
        );
      }
      for (const k of responseKeys) {
        const { label, close } = card.responses[k];
        if (!label || !close) {
          throw new Error(
            `Warding card "${key}" (${origin}) response "${k}" is missing a ` +
              `${!label ? "label" : "close"}. A written response carries both.`,
          );
        }
      }
    }
    merged[key] = card;
  };

  for (const [id, cards] of Object.entries(SOLO_SOURCES)) {
    for (const [key, card] of Object.entries(cards)) {
      if (!card.characters?.includes(id)) {
        throw new Error(
          `Warding card "${key}" is in ${id}.js but its characters ` +
            `(${JSON.stringify(card.characters)}) don't include "${id}". ` +
            `Solo files hold only that character's cards; multi-character ` +
            `cards belong in shared.js.`,
        );
      }
      add(key, card, `${id}.js`);
    }
  }

  for (const [key, card] of Object.entries(shared)) {
    if (!(card.characters?.length >= 2)) {
      throw new Error(
        `Warding card "${key}" is in shared.js but lists ` +
          `${card.characters?.length ?? 0} character(s). shared.js is for ` +
          `cards with two or more; a solo card belongs in that character's file.`,
      );
    }
    add(key, card, "shared.js");
  }

  return merged;
}

export const WARDING_CARDS = buildWardingCards();

// A card the player can actually be shown: its `responses` are written.
// Unwritten stubs (responses: {}) are in WARDING_CARDS so `node` can see
// coverage, but they never enter a live pool — this is the soft-rollout gate
// (docs/warding-cards.md §rollout). Both the WARDING_CHANCE roll and the pity
// "is this character warding-capable" check run off eligibleWardingCards, so an
// in-progress character behaves exactly like one with no cards at all.
export function wardingCardWritten(card) {
  return Object.keys(card?.responses ?? {}).length > 0;
}

// Coverage at load, so a deploy log shows how far the rollout has come.
{
  const total = Object.keys(WARDING_CARDS).length;
  const ready = Object.values(WARDING_CARDS).filter(wardingCardWritten).length;
  const chars = new Set();
  for (const card of Object.values(WARDING_CARDS)) {
    if (wardingCardWritten(card)) for (const id of card.characters) chars.add(id);
  }
  console.log(
    `[warding] ${ready}/${total} cards written, ` +
      `${chars.size} character(s) with a live pool`,
  );
}

// Every warding card a given character id appears on (solo or shared),
// regardless of any affinity gate or whether the card is written yet. Each
// result carries its own `key` (the asset filename stem). For the actual draw
// use eligibleWardingCards, which applies the written + minLevel gates.
export function wardingCardsForCharacter(characterId) {
  return Object.entries(WARDING_CARDS)
    .filter(([, card]) => card.characters.includes(characterId))
    .map(([key, card]) => ({ key, ...card }));
}

// The character's cards that can actually spawn for a player at `levelName`
// (a RELATIONSHIP_LEVELS name — the caller passes
// getRelationshipLevel(affinity).name). This is wardingCardsForCharacter minus
// any card that is still an unwritten stub and minus any card whose minLevel
// the player hasn't reached.
export function eligibleWardingCards(characterId, levelName) {
  return wardingCardsForCharacter(characterId).filter(
    (card) => wardingCardWritten(card) && wardingCardUnlocked(card, levelName),
  );
}

// Step 3 of the flow: one warding card drawn uniformly from the eligible pool
// for this player, or null if none are eligible (caller falls back to a normal
// encounter). The WARDING_CHANCE roll and the pity check stay in the /roam and
// /meet handlers.
export function pickWardingCardForCharacter(
  characterId,
  levelName,
  rng = Math.random,
) {
  const pool = eligibleWardingCards(characterId, levelName);
  if (pool.length === 0) return null;
  return pool[Math.floor(rng() * pool.length)];
}
