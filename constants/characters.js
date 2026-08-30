// Reference data for every character in assets/chars, grouped by the house
// they belong to (matched against character-named rooms in assets/bg where
// possible). Characters with `house: null` are general encounters only —
// they can turn up at any GENERAL_LOCATIONS spot (see constants/backgrounds.js),
// never inside another house.
import { HOUSES, CHARACTER_ROOMS } from "./backgrounds.js";
import { DIALOGUE } from "./dialogue.js";

export const RESPONSE_TYPES = {
  KIND: "kind",
  PLAYFUL: "playful",
  BOLD: "bold",
  NEUTRAL: "neutral",
};

// Each character's affinityByResponse ranks KIND/PLAYFUL/BOLD as a
// permutation of {2, 1, 0} points — their favorite response type, a
// neutral-liked type, and a least-liked type. A NEUTRAL response always
// yields 0 points regardless of character (see constants/game.js).
//
// dialogue holds the lines a character can greet the user with, grouped by
// how far along the relationship is (see DIALOGUE_TIER_BY_LEVEL in
// constants/game.js). Each tier is a collection so more lines can be added
// over time without changing any code — one is picked at random per encounter.
export const CHARACTERS = [
  // Frostheim
  {
    id: "jin",
    firstName: "Jin",
    lastName: "Kamurai",
    house: HOUSES.FROSTHEIM,
    exclusiveRoom: CHARACTER_ROOMS.JIN,
    images: {
      uniform: "Jin_Kamurai_Uniform.png",
      casual: "Jin_Kamurai_Casual.png",
    },
    affinityByResponse: { kind: 1, playful: 0, bold: 2 },
    archetype: ["Himedere", "Oujidere"],
    keywords: [
      "arrogant",
      "high-status",
      "treats others as servants",
      "short-spoken",
      "protective",
      "aristocratic",
    ],
  },
  {
    id: "kaito",
    firstName: "Kaito",
    lastName: "Fuji",
    house: HOUSES.FROSTHEIM,
    images: {
      uniform: "Kaito_Fuji_Uniform.png",
      casual: "Kaito_Fuji_Casual.png",
    },
    affinityByResponse: { kind: 1, playful: 2, bold: 0 },
    archetype: ["Bakadere"],
    keywords: [
      "excitable",
      "clumsy",
      "loud",
      "expressive",
      "good-hearted",
      "enthusiastic",
    ],
  },
  {
    id: "lucas",
    firstName: "Lucas",
    lastName: "Errant",
    house: HOUSES.FROSTHEIM,
    images: {
      uniform: "Lucas_Errant_Uniform.png",
      casual: "Lucas_Errant_Casual.png",
    },
    affinityByResponse: { kind: 2, playful: 0, bold: 1 },
    archetype: ["Dandere", "Pure Angel"],
    keywords: [
      "polite",
      "soft-spoken",
      "innocent",
      "protective",
      "gentle",
      "sincere",
    ],
  },
  {
    id: "tohma",
    firstName: "Tohma",
    lastName: "Ishibashi",
    house: HOUSES.FROSTHEIM,
    additionalHouses: [HOUSES.VAGASTROM],
    additionalRooms: [CHARACTER_ROOMS.JIN],
    images: {
      uniform: "Tohma_Ishibashi_Uniform.png",
      casual: "Tohma_Ishibashi_Casual.png",
    },
    affinityByResponse: { kind: 2, playful: 0, bold: 1 },
    archetype: ["Kuudere"],
    keywords: [
      "serious",
      "blunt",
      "rule-focused",
      "lawful neutral",
      "composed",
      "mission-oriented",
    ],
  },

  // Vagastrom
  {
    id: "alan",
    firstName: "Alan",
    lastName: "Mido",
    house: HOUSES.VAGASTROM,
    exclusiveRoom: CHARACTER_ROOMS.ALAN,
    images: {
      uniform: "Alan_Mido_Uniform.png",
      casual: "Alan_Mido_Casual.png",
    },
    affinityByResponse: { kind: 2, playful: 1, bold: 0 },
    archetype: ["Kuudere"],
    keywords: [
      "stoic",
      "quiet",
      "practical",
      "emotionally distant",
      "reliable",
      "mechanical",
    ],
  },
  {
    id: "leo",
    firstName: "Leo",
    lastName: "Kurosagi",
    house: HOUSES.VAGASTROM,
    exclusiveRoom: CHARACTER_ROOMS.LEO,
    images: {
      uniform: "Leo_Kurosagi_Uniform.png",
      casual: "Leo_Kurosagi_Casual.png",
    },
    affinityByResponse: { kind: 0, playful: 1, bold: 2 },
    archetype: ["Sadodere", "Teasedere"],
    keywords: [
      "cynical",
      "mocking",
      "ego-driven",
      "influencer",
      "teasing",
      "sharp-tongued",
    ],
  },
  {
    id: "shohei",
    firstName: "Shohei",
    lastName: "Haizono",
    house: HOUSES.VAGASTROM,
    exclusiveRoom: CHARACTER_ROOMS.SHOHEI,
    images: {
      uniform: "Shohei_Haizono_Uniform.png",
      casual: "Shohei_Haizono_Casual.png",
    },
    affinityByResponse: { kind: 2, playful: 0, bold: 1 },
    archetype: ["Deredere"],
    keywords: [
      "sweet",
      "respectful",
      "underclassman",
      "nonchalant",
      "friendly",
      "earnest",
    ],
  },

  // Hotarubi
  {
    id: "subaru",
    firstName: "Subaru",
    lastName: "Kagami",
    house: HOUSES.HOTARUBI,
    exclusiveRoom: CHARACTER_ROOMS.SUBARU,
    images: {
      uniform: "Subaru_Kagami_Uniform.png",
      casual: "Subaru_Kagami_Casual.png",
    },
    affinityByResponse: { kind: 2, playful: 1, bold: 0 },
    archetype: ["Dandere", "Megaredere"],
    keywords: [
      "polite",
      "earnest",
      "hardworking",
      "captain",
      "overly kind",
      "bottled emotions",
      "responsible",
    ],
  },
  {
    id: "zenji",
    firstName: "Zenji",
    lastName: "Kotodama",
    house: HOUSES.HOTARUBI,
    exclusiveRoom: CHARACTER_ROOMS.ZENJI,
    images: {
      uniform: "Zenji_Kotodama_Uniform.png",
      casual: "Zenji_Kotodama_Casual.png",
    },
    affinityByResponse: { kind: 2, playful: 1, bold: 0 },
    archetype: ["Deredere"],
    keywords: [
      "empathetic",
      "gentle",
      "caring",
      "observant",
      "haiku-writer",
      "warm",
      "spiritual",
    ],
  },
  {
    id: "haku",
    firstName: "Haku",
    lastName: "Kusanagi",
    house: HOUSES.HOTARUBI,
    images: {
      uniform: "Haku_Kusanagi_Uniform.png",
      casual: "Haku_Kusanagi_Casual.png",
    },
    affinityByResponse: { kind: 2, playful: 1, bold: 0 },
    archetype: ["Oujidere"],
    keywords: [
      "formal",
      "courtesy",
      "flirty",
      "priest-family",
      "charming",
      "chickens out",
      "teasing",
    ],
  },

  // Dionysia
  {
    id: "elias",
    firstName: "Elias",
    lastName: "Pratt",
    house: HOUSES.DIONYSIA,
    images: { uniform: "Elias_Pratt_Uniform.png" },
    affinityByResponse: { kind: 2, playful: 1, bold: 0 },
    archetype: ["Kuudere", "Shundere"],
    keywords: [
      "charming southern gentleman",
      "manipulative",
      "former captain",
      "tired",
      "demoted",
      "smooth-talking",
    ],
  },
  {
    id: "jo",
    firstName: "Jo",
    lastName: "Kongoza",
    house: HOUSES.DIONYSIA,
    images: {
      uniform: "Jo_Kongoza_Uniform.png",
      casual: "Jo_Kongoza_Casual.png",
    },
    affinityByResponse: { kind: 2, playful: 0, bold: 1 },
    archetype: ["Charismatic Oujidere"],
    keywords: [
      "brilliant performer",
      "commands attention",
      "Venus of Dionysia",
      "transformation artifact",
      "beautiful",
      "legendary",
    ],
  },
  {
    id: "mio",
    firstName: "Mio",
    lastName: "Susuhara",
    house: HOUSES.DIONYSIA,
    images: { uniform: "Mio_Susuhara_Uniform.png" },
    affinityByResponse: { kind: 2, playful: 1, bold: 0 },
    archetype: ["Deredere"],
    keywords: [
      "reliable",
      "loyal",
      "clockwork artisan",
      "glue of the group",
      "socially aware",
      "smooth",
      "mediator",
    ],
  },
  {
    id: "shion",
    firstName: "Shion",
    lastName: "Genkai",
    house: HOUSES.DIONYSIA,
    images: { uniform: "Shion_Genkai_Uniform.png" },
    affinityByResponse: { kind: 0, playful: 1, bold: 2 },
    archetype: ["Yandere", "Sadodere"],
    keywords: [
      "obsessive",
      "protective",
      "loves to watch suffering",
      "dangerous",
      "intense",
      "theatrical",
      "cruel",
    ],
  },

  // Mortkranken
  {
    id: "jiro",
    firstName: "Jiro",
    lastName: "Kirisaki",
    house: HOUSES.MORTKRANKEN,
    exclusiveRoom: CHARACTER_ROOMS.JIRO,
    images: {
      uniform: "Jiro_Kirisaki_Uniform.png",
      casual: "Jiro_Kirisaki_Casual.png",
    },
    affinityByResponse: { kind: 2, playful: 0, bold: 1 },
    archetype: ["Kuudere"],
    keywords: [
      "blunt",
      "straight-to-the-point",
      "no fluff",
      "charming laugh",
      "serious",
      "direct",
    ],
  },
  {
    id: "yuri",
    firstName: "Yuri",
    lastName: "Isami",
    house: HOUSES.MORTKRANKEN,
    images: {
      uniform: "Yuri_Isami_Uniform.png",
      casual: "Yuri_Isami_Casual.png",
    },
    affinityByResponse: { kind: 1, playful: 0, bold: 2 },
    archetype: ["Sadodere", "Hinedere"],
    keywords: [
      "cynical",
      "medical genius",
      "cold",
      "easily flustered",
      "callous exterior",
      "mocking",
    ],
  },

  // Jabberwock
  {
    id: "ren",
    firstName: "Ren",
    lastName: "Shiranami",
    house: HOUSES.JABBERWOCK,
    exclusiveRoom: CHARACTER_ROOMS.REN,
    images: {
      uniform: "Ren_Shiranami_Uniform.png",
      casual: "Ren_Shiranami_Casual.png",
    },
    affinityByResponse: { kind: 0, playful: 1, bold: 2 },
    archetype: ["Dandere"],
    keywords: [
      "quiet",
      "slacker",
      "gamer",
      "pop culture fan",
      "keeps to himself",
      "observant",
      "loyal",
    ],
  },
  {
    id: "haru",
    firstName: "Haru",
    lastName: "Sagara",
    house: HOUSES.JABBERWOCK,
    additionalHouses: [HOUSES.DIONYSIA],
    images: {
      uniform: "Haru_Sagara_Uniform.png",
      casual: "Haru_Sagara_Casual.png",
    },
    affinityByResponse: { kind: 1, playful: 2, bold: 0 },
    archetype: ["Teasedere", "Deredere"],
    keywords: [
      "playful",
      "charming",
      "warm",
      "mischievous",
      "thoughtful",
      "affectionate",
      "flirty",
    ],
  },
  {
    id: "towa",
    firstName: "Towa",
    lastName: "Otonashi",
    house: HOUSES.JABBERWOCK,
    images: {
      uniform: "Towa_Otonashi_Uniform.png",
      casual: "Towa_Otonashi_Casual.png",
    },
    affinityByResponse: { kind: 2, playful: 1, bold: 0 },
    archetype: ["Yandere", "Mayadere"],
    keywords: [
      "obsessive",
      "intensely attached",
      "clinging",
      "dandelion",
      "dangerous vibe",
      "possessive",
      "devoted",
    ],
    pmOnly: true,
  },

  // Obscuary
  {
    id: "edward",
    firstName: "Edward",
    lastName: "Hart",
    house: HOUSES.OBSCUARY,
    exclusiveRoom: CHARACTER_ROOMS.EDWARD,
    images: {
      uniform: "Edward_Hart_Uniform.png",
      casual: "Edward_Hart_Casual.png",
    },
    affinityByResponse: { kind: 1, playful: 0, bold: 2 },
    archetype: ["Bodere", "Deredere"],
    keywords: [
      "fragile act",
      "powerful vampire",
      "affectionate",
      "flirty",
      "no personal space",
      "lovely lady",
      "possessive",
    ],
  },
  {
    id: "rui",
    firstName: "Rui",
    lastName: "Mizuki",
    house: HOUSES.OBSCUARY,
    exclusiveRoom: CHARACTER_ROOMS.RUI,
    images: {
      uniform: "Rui_Mizuki_Uniform.png",
      casual: "Rui_Mizuki_Casual.png",
    },
    affinityByResponse: { kind: 2, playful: 1, bold: 0 },
    archetype: ["Bright Deredere"],
    keywords: [
      "bright soul",
      "reaper",
      "cursed",
      "organized",
      "enthusiastic",
      "caring",
      "flirty",
      "cannot touch",
    ],
  },
  {
    id: "lyca",
    firstName: "Lyca",
    lastName: "Colt",
    house: HOUSES.OBSCUARY,
    additionalHouses: [HOUSES.HOTARUBI],
    images: {
      uniform: "Lyca_Colt_Uniform.png",
      casual: "Lyca_Colt_Casual.png",
    },
    affinityByResponse: { kind: 2, playful: 1, bold: 0 },
    archetype: ["Deredere"],
    keywords: [
      "loyal companion",
      "empathetic",
      "emotionally intelligent",
      "learns constantly",
      "observant",
      "hardworking",
      "protective",
    ],
  },

  // Sinostra
  {
    id: "taiga",
    firstName: "Taiga",
    lastName: "Hoshibami",
    house: HOUSES.SINOSTRA,
    exclusiveRoom: CHARACTER_ROOMS.TAIGA,
    images: {
      uniform: "Taiga_Hoshibami_Uniform.png",
      casual: "Taiga_Hoshibami_Casual.png",
    },
    affinityByResponse: { kind: 0, playful: 1, bold: 2 },
    archetype: ["Tsundere", "Thugdere"],
    keywords: [
      "rough",
      "aggressive",
      "insults",
      "kitten",
      "dumbass",
      "protective",
      "flirty",
      "loyal",
    ],
  },
  {
    id: "ritsu",
    firstName: "Ritsu",
    lastName: "Shinjo",
    house: HOUSES.SINOSTRA,
    images: {
      uniform: "Ritsu_Shinjo_Uniform.png",
      casual: "Ritsu_Shinjo_Casual.png",
    },
    affinityByResponse: { kind: 2, playful: 0, bold: 1 },
    archetype: ["Kuudere"],
    keywords: [
      "analytical",
      "legalistic",
      "lawyer",
      "verbose",
      "calculation",
      "logical",
      "warms up slowly",
    ],
  },
  {
    id: "romeo",
    firstName: "Romeo",
    lastName: "Lucci",
    house: HOUSES.SINOSTRA,
    images: {
      uniform: "Romeo_Lucci_Uniform.png",
      casual: "Romeo_Lucci_Casual.png",
    },
    affinityByResponse: { kind: 1, playful: 0, bold: 2 },
    archetype: ["Teasedere", "Kanedere"],
    keywords: [
      "sassy",
      "money-oriented",
      "high-maintenance",
      "teasing sarcasm",
      "yells",
      "acronyms",
      "HDY",
      "genuine concern",
    ],
  },

  // General (no house — encountered only at general locations)
  {
    id: "benkei",
    firstName: "Benkei",
    lastName: null,
    house: null,
    images: { uniform: "Benkei_Uniform.png", work: "Benkei_Work.png" },
    affinityByResponse: { kind: 2, playful: 0, bold: 1 },
    archetype: ["Deredere"],
    keywords: ["pervy", "gentle", "kind", "nostalgic", "protective"],
  },
];

export function getCharacterById(id) {
  return CHARACTERS.find((c) => c.id === id) || null;
}

export function getCharactersByHouse(house) {
  return CHARACTERS.filter(
    (c) =>
      c.house === house ||
      (c.additionalHouses && c.additionalHouses.includes(house)) ||
      (c.additionalLocations && c.additionalLocations.includes(house)),
  );
}

// Characters eligible to appear at a given location: same-house characters,
// plus (for general locations) every character in the game.
// Exclusive rooms only allow their specific character.
export function getCharactersForLocation(locationKey, isGeneral) {
  if (isGeneral) return CHARACTERS;

  // Check if this is an exclusive room location
  const charsForRoom = CHARACTERS.filter(
    (c) =>
      c.exclusiveRoom === locationKey ||
      (c.additionalRooms && c.additionalRooms.includes(locationKey)),
  );
  if (charsForRoom.length > 0) return charsForRoom;

  return getCharactersByHouse(locationKey);
}

export function getFullName(character) {
  return character.lastName
    ? `${character.firstName} ${character.lastName}`
    : character.firstName;
}

export function getCharacterImageUrl(character, variant) {
  const images = character.images;
  const key = variant && images[variant] ? variant : Object.keys(images)[0];
  const baseUrl = process.env.BASE_URL || "";
  return `${baseUrl}/assets/chars/${images[key]}`;
}

export function getRandomCharacterImageVariant(character) {
  const keys = Object.keys(character.images);
  return keys[Math.floor(Math.random() * keys.length)];
}

// Affinity gained for a given response type, from this character's
// perspective. NEUTRAL always yields 0, regardless of character.
export function getAffinityForResponse(character, responseType) {
  if (responseType === RESPONSE_TYPES.NEUTRAL) return 0;
  return character.affinityByResponse[responseType] ?? 0;
}

export function getRandomDialogueLine(
  character,
  tier,
  variant = null,
  now = null,
) {
  const content = DIALOGUE[character.id];
  if (!content) return "...";

  // Handle pmOnly characters (e.g., Towa can only speak in afternoon/evening)
  if (character.pmOnly && content.amOnlyDialogue && now) {
    const hour = now.getHours();
    // AM is 0-11 (midnight to 11:59 AM), PM is 12-23 (noon to 11:59 PM)
    if (hour < 12) {
      const amLines =
        content.amOnlyDialogue[tier] || content.amOnlyDialogue.new;
      return Array.isArray(amLines)
        ? amLines[Math.floor(Math.random() * amLines.length)]
        : amLines;
    }
  }

  let lines = content.dialogue[tier] || content.dialogue.new;

  // Handle variant-specific dialogue (e.g., Jo with different pronouns for casual vs uniform)
  if (
    variant &&
    typeof lines === "object" &&
    !Array.isArray(lines) &&
    lines[variant]
  ) {
    lines = lines[variant];
  }

  return Array.isArray(lines)
    ? lines[Math.floor(Math.random() * lines.length)]
    : lines;
}

export function getTemperamentGreeting(character, tier) {
  const temperamentLines =
    DIALOGUE[character.id]?.temperamentDialogue || {};
  const lines = temperamentLines[tier] || temperamentLines.new || ["..."];
  return lines[Math.floor(Math.random() * lines.length)];
}

export function generateCharacterResponses(character, tier = "new") {
  const archetypes = character.archetype || [];
  const keywords = character.keywords || [];

  const archetypeSet = new Set(archetypes.map((a) => a.toLowerCase()));
  const keywordSet = new Set(keywords.map((k) => k.toLowerCase()));

  // Define response options based on archetype + keywords combinations + relationship tier
  const responses = {
    [RESPONSE_TYPES.KIND]: generateKindResponse(
      character,
      archetypeSet,
      keywordSet,
      tier,
    ),
    [RESPONSE_TYPES.PLAYFUL]: generatePlayfulResponse(
      character,
      archetypeSet,
      keywordSet,
      tier,
    ),
    [RESPONSE_TYPES.BOLD]: generateBoldResponse(
      character,
      archetypeSet,
      keywordSet,
      tier,
    ),
    [RESPONSE_TYPES.NEUTRAL]: generateNeutralResponse(
      character,
      archetypeSet,
      keywordSet,
      tier,
    ),
  };

  return responses;
}

// Per-character button labels live in constants/dialogue.js. Only "close" and
// everything-before-it are distinguished. A character with no entry falls
// through to the archetype defaults below.
function responseLabel(characterId, responseType, tier) {
  const entry = DIALOGUE[characterId]?.responses?.[responseType];
  if (!entry) return null;
  return tier === "close" ? entry.close : entry.new;
}

function generateKindResponse(character, archetypeSet, keywordSet, tier) {
  const label = responseLabel(character.id, RESPONSE_TYPES.KIND, tier);
  if (label) return { label };

  if (
    archetypeSet.has("kuudere") ||
    archetypeSet.has("tsundere") ||
    archetypeSet.has("yandere")
  ) {
    return { label: "Be honest with them" };
  }
  if (archetypeSet.has("deredere") || archetypeSet.has("bright deredere")) {
    return { label: "Light up with warmth" };
  }
  if (archetypeSet.has("dandere")) {
    return { label: "Speak gently" };
  }
  if (
    archetypeSet.has("oujidere") ||
    archetypeSet.has("charismatic oujidere")
  ) {
    return { label: "Admire them openly" };
  }

  return { label: "Offer kind words" };
}

function generatePlayfulResponse(character, archetypeSet, keywordSet, tier) {
  const label = responseLabel(character.id, RESPONSE_TYPES.PLAYFUL, tier);
  if (label) return { label };

  if (archetypeSet.has("teasedere")) return { label: "Tease them back" };
  if (archetypeSet.has("sadodere")) return { label: "Make them laugh" };
  if (archetypeSet.has("deredere") || archetypeSet.has("bakadere"))
    return { label: "Share a laugh" };
  if (archetypeSet.has("yandere")) return { label: "Play their game" };
  if (archetypeSet.has("kuudere")) return { label: "Exchange wit with them" };

  return { label: "Crack a joke" };
}

function generateBoldResponse(character, archetypeSet, keywordSet, tier) {
  const label = responseLabel(character.id, RESPONSE_TYPES.BOLD, tier);
  if (label) return { label };

  if (archetypeSet.has("yandere")) return { label: "Match their intensity" };
  if (archetypeSet.has("sadodere")) return { label: "Challenge them directly" };
  if (archetypeSet.has("tsundere") || archetypeSet.has("thugdere"))
    return { label: "Stand your ground" };
  if (archetypeSet.has("oujidere") || archetypeSet.has("charismatic oujidere"))
    return { label: "Be bold and charming" };
  if (archetypeSet.has("deredere") || archetypeSet.has("bright deredere"))
    return { label: "Express yourself boldly" };
  if (archetypeSet.has("kuudere")) return { label: "Make a bold move" };

  return { label: "Flirt boldly" };
}

function generateNeutralResponse(character, archetypeSet, keywordSet, tier) {
  const label = responseLabel(character.id, RESPONSE_TYPES.NEUTRAL, tier);
  if (label) return { label };

  if (archetypeSet.has("kuudere") || archetypeSet.has("dandere"))
    return { label: "Stay quiet" };
  if (archetypeSet.has("yandere")) return { label: "Observe them carefully" };
  if (archetypeSet.has("deredere") || archetypeSet.has("bright deredere"))
    return { label: "Simply be present" };
  if (archetypeSet.has("sadodere")) return { label: "Watch and listen" };

  return { label: "Stay silent" };
}
