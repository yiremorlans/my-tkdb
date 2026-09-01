// Reference data for every character in assets/chars, grouped by the house
// they belong to (matched against character-named rooms in assets/bg where
// possible). Characters with `house: null` are general encounters only —
// they can turn up at any GENERAL_LOCATIONS spot (see constants/backgrounds.js),
// never inside another house.
import { HOUSES, CHARACTER_ROOMS, timeBucket } from "./backgrounds.js";
import {
  DIALOGUE,
  SHARED_APPROACH_WHEN,
  SHARED_DIALOGUE_WHEN,
} from "./dialogue.js";

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
    aliases: ["luca"],
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
    affinityByResponse: { kind: 2, playful: 0, bold: 1 },
    archetype: ["Kuudere"],
    keywords: [
      "stoic",
      "taciturn",
      "guarded",
      "protective",
      "reliable",
      "disciplined",
      "gruffly affectionate",
      "mechanic",
      "biker",
      "captain",
      "haunted past",
      "big appetite",
      "no sense of direction",
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
      "gossip-monger",
      "brand-conscious",
      "entitled",
      "possessive",
    ],
  },
  {
    id: "shohei",
    aliases: ["sho"],
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
      "sweary",
      "biker",
      "fighter",
      "food-truck",
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
    // kind is what actually reaches Subaru (affinityByResponse.kind = 2): the
    // script is starved for gentle notice and reassurance — "I really am so
    // lucky to be surrounded by so many kind people like you", "You've been
    // kind to this house. I notice these things" — and every anxious beat
    // ("I was worried I'd done something to make you feel uncomfortable", the
    // Max Affinity "I get really anxious sometimes... I'm being weird, aren't
    // I?") wants warmth in reply, not wit or a push. playful lands second (1):
    // he takes gentle ribbing and deflects with it himself — "You think I'm
    // always smiling? Ha ha" — and by Goodnight LVL 24 he'll spin ghost
    // stories for you. bold lands worst (0): he's conflict-averse to the bone
    // — "If I cancel now, they'll hate me", compulsive apology, the figurehead
    // who defers every call to Haku — so a blunt or demanding advance makes
    // him comply anxiously instead of opening up.
    affinityByResponse: { kind: 2, playful: 1, bold: 0 },
    archetype: ["Dandere", "Megaredere"],
    keywords: [
      "polite",
      "self-deprecating",
      "anxious",
      "people-pleaser",
      "selfless",
      "hardworking",
      "bottled emotions",
      "former child performer",
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
    // kind is what actually reaches Zenji (affinityByResponse.kind = 2): under
    // the showmanship the script is a ghost on borrowed time who treasures
    // being listened to and looked after — "Watching you is enough food for my
    // soul", "if I can save you, and our friends, I could ask for nothing
    // more", the quiet worry when you go silent or head for Mortkranken.
    // playful lands too (1): he's a performer who lives for banter, wordplay
    // and gentle spooky teasing — "Has this inspired man of the quill left you
    // speechless?", "Horsefeathers, I'd never. I was there the night before
    // last." bold lands worst (0): he deflects directness into metaphor and the
    // moon ("The moon is beautiful" carries "I love you" until the very last
    // line), so a blunt advance is received graciously but isn't what moves him.
    affinityByResponse: { kind: 2, playful: 1, bold: 0 },
    archetype: ["Deredere"],
    keywords: [
      "florid theatrical showman",
      "self-styled genius of the pen",
      "romantic novelist and folklorist",
      "old-fashioned romanticist",
      "Jazz-Age slang",
      "calls you 'my dear'",
      "gentle",
      "warm",
      "empathetic",
      "observant",
      "spiritual",
      "haunted by mortality",
      "ghostly, uncanny presence",
      "quietly protective",
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
    // Verified against his voiceline script: quiet, undemanding care is what
    // reaches him (kind 2); deadpan and his fake-scare bits are his default
    // register but read as deflection, so playful lands softer (1); he meets
    // forwardness by keeping it light and undercutting himself, so bold glances
    // off (0).
    affinityByResponse: { kind: 2, playful: 1, bold: 0 },
    archetype: ["Dandere", "Kuudere"],
    keywords: [
      "laid-back",
      "deadpan",
      "slacker",
      "dorm handyman",
      "fake-scares people",
      "folk-supernatural patter",
      "quietly attentive",
      "world-weary",
      "self-deprecating",
      "deflects sincerity",
      "shrine-raised",
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
    affinityByResponse: { kind: 1, playful: 2, bold: 0 },
    archetype: ["Dandere"],
    keywords: [
      "deadpan wit",
      "slacker",
      "gamer",
      "pop culture fan",
      "meme editor",
      "observant",
      "quietly loyal",
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
      "teasing",
      "warm",
      "affectionate",
      "zookeeper",
      "devoted caretaker",
      "protective of every life in the park",
      "hardworking",
      "self-deprecating",
      "chickens out when flirting lands",
      "Aussie drawl",
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
      "childlike",
      "hums constantly",
      "obsessive",
      "intensely attached",
      "clingy",
      "possessive",
      "jealous",
      "dandelion",
      "eats flowers",
      "nature-attuned",
      "casually morbid",
      "quietly unnerving",
      "devoted",
    ],
    pmOnly: true,
  },

  // Obscuary
  {
    id: "edward",
    aliases: ["ed"],
    firstName: "Edward",
    lastName: "Hart",
    house: HOUSES.OBSCUARY,
    exclusiveRoom: CHARACTER_ROOMS.EDWARD,
    images: {
      uniform: "Edward_Hart_Uniform.png",
      casual: "Edward_Hart_Casual.png",
    },
    // bold is what actually reaches Edward (affinityByResponse.bold = 2). The
    // frail gentleman is a performance — parasol, cough, "carry me to bed,"
    // eyesight too poor to read his own letters — and underneath it is an
    // ancient, lonely predator tired of the act. The partner who sees past it
    // and does not flinch is the one who gets there: "you've stopped
    // flinching," he observes, thrilled and put out; "wicked girl, you ought to
    // know better than to play with fire"; "what were you hoping for? Go on,
    // say it." kind lands too (1): he genuinely wants to be doted on — head on
    // your lap, held until he sleeps, "it would be troublesome for me if you
    // were to disappear" — so tending the act is welcome, just not the deepest
    // hit. playful lands worst (0): he is the one who does the teasing, and he
    // is too languid and melancholy for banter volleyed back to land — "sorry,
    // but could we continue this tomorrow?" Note this is "didn't resonate," not
    // dislike.
    affinityByResponse: { kind: 1, playful: 0, bold: 2 },
    archetype: ["Bodere", "Deredere"],
    keywords: [
      "fragile act",
      "secretly the most powerful vampire",
      "old-world, courtly eloquence",
      "languid, wants to be doted on",
      "predatory charm under the manners",
      "asks before he bites",
      "detached about humans — 'they die so quickly'",
      "YouTube addict, conspiracy theories",
      "centuries-old loneliness, a lost 'her'",
      "no personal space",
      "wicked girl / lovely lady",
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
    // kind is what actually reaches Rui (affinityByResponse.kind = 2). The home
    // script is a bright surface with a crack running under it — the onion-
    // cutting excuse for red eyes, "my face is my only redeeming feature",
    // "you're not doing this all for me, are you?", "I wish I could've met you
    // as a regular guy" — and a partner who is gentle and sincere is the one
    // who gets past the cheer. playful lands too but only on the surface (1):
    // he loves matching energy ("it's illegal to take your eyes off me",
    // "leaving me on delivered! Ahaha") and enjoys the banter without it
    // touching the thing underneath. bold lands worst (0): recklessness toward
    // the curse — closing the distance he carefully keeps, testing the touch —
    // frightens him more than it flatters him ("don't think about trying to
    // grab my hand", "just be happy enough for the both of us"). Note this is
    // "didn't resonate," not dislike.
    affinityByResponse: { kind: 2, playful: 1, bold: 0 },
    archetype: ["Bright Deredere"],
    keywords: [
      "reaper",
      "bright soul",
      "cheer that masks his pain",
      "self-deprecating",
      "cursed touch kills the living",
      "gloves and careful distance",
      "bartender and mixologist",
      "tends the anomaly garden",
      "houseparent to Obscuary",
      "organized",
      "forward about his affection",
      "dodges missions and class",
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
      "part werewolf",
      "raised apart from humans",
      "learning to read",
      "blunt, simple speech",
      "childlike, literal phrasing",
      "coins phonetic words (thingy, so-shul skill, roo-teen)",
      "reads emotions by scent",
      "wary of strangers",
      "skittish about attraction",
      "moon-cycle transformation",
      "territorial about his dirty blanket",
      "possessive",
      "dog-like loyalty",
      "walks as bonding",
      "protective and self-sacrificing",
      "wants to belong with humans (Neros)",
      "defies rules and authority",
      "calls Edward 'moth-eaten Casanova'",
      "not tech-savvy",
      "hardworking, eager to prove himself",
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
      "blunt insults",
      "domineering",
      "kitten",
      "kitty-cat",
      "dumbass",
      "Gyahaha laugh",
      "gambler",
      "Sinostra captain",
      "huge appetite",
      "eats anomaly beasts",
      "time-slipping stigma",
      "forgets people and places",
      "fatalistic",
      "easily bored",
      "predatory flirtation",
      "possessive",
      "protective",
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
    affinityByResponse: { kind: 1, playful: 0, bold: 2 },
    archetype: ["Kuudere"],
    keywords: [
      "lawyer",
      "legalistic",
      "analytical",
      "runs behavioral models",
      "punctual to the second",
      "transactional",
      "keeps meticulous records",
      "formal and polite",
      "diligent overachiever",
      "verbose",
      "warms up slowly",
    ],
  },
  {
    id: "romeo",
    firstName: "Romeo",
    lastName: "Scorpius Lucci",
    house: HOUSES.SINOSTRA,
    images: {
      uniform: "Romeo_Lucci_Uniform.png",
      casual: "Romeo_Lucci_Casual.png",
    },
    // bold is what Romeo actually respects (affinityByResponse.bold = 2): the
    // script hires for nerve — "someone sharp", "someone I can trust", "walk
    // with your head held high or I'll step on it" — and rewards a partner who
    // names their price and meets him level. kind reaches him too, but only
    // sideways and embarrassed — "I'm kind of happy to see you, don't tell
    // anyone" (1). playful lands worst (0): being needled genuinely gets under
    // his skin — Taiga's "Lulu", Frostheim whispering — so teasing reads as the
    // player poking a short fuse, not banter he enjoys.
    affinityByResponse: { kind: 1, playful: 0, bold: 2 },
    archetype: ["Teasedere", "Kanedere"],
    keywords: [
      "vain",
      "elaborate skincare and gym regimen",
      "money-solves-everything worldview",
      "casino floor boss",
      "protection-fee collector",
      "yells constantly",
      "coins acronyms",
      "HDY",
      "teasing sarcasm",
      "casual menace",
      "brand- and status-obsessed",
      "backhanded care",
      "fiercely claims his people",
    ],
  },

  // General (no house — encountered only at general locations)
  {
    id: "benkei",
    firstName: "Benkei",
    lastName: null,
    house: null,
    images: { uniform: "Benkei_Uniform.png", work: "Benkei_Work.png" },
    affinityByResponse: { kind: 2, playful: 1, bold: 0 },
    archetype: ["Deredere"],
    keywords: ["pervy", "gentle", "kind", "nostalgic", "protective"],
  },
];

export function getCharacterById(id) {
  if (!id) return null;
  const normalized = String(id).trim().toLowerCase();
  return (
    CHARACTERS.find((c) => c.id === normalized) ||
    CHARACTERS.find((c) => c.aliases && c.aliases.includes(normalized)) ||
    null
  );
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

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// Fallback for the /roam narration button when a character has no `approach`
// entry in dialogue.js. Deliberately generic, since it has to front any scene.
const APPROACH_LABEL_FALLBACK = [
  "Step forward",
  "Close the distance",
  "Make yourself known",
  "Walk over to them",
];

// Resolve one tier of a dialogue pool to a flat list of lines, following the
// variant map (Jo's uniform/casual pronouns) when one is present. Always returns
// a fresh array — callers merge pools with `.push`, and the source arrays live
// in DIALOGUE and must not be mutated.
function resolvePoolTier(pool, tier, variant) {
  if (!pool) return [];
  let lines = pool[tier] || pool.new;
  if (variant && lines && typeof lines === "object" && !Array.isArray(lines)) {
    lines = lines[variant] || Object.values(lines)[0];
  }
  if (Array.isArray(lines)) return [...lines];
  if (typeof lines === "string") return [lines];
  return [];
}

// The dimensions a conditional-dialogue `when` block can constrain. Each field
// is optional (absent = "don't care") and accepts a scalar or an array; every
// present field must match for the block to apply. Adding a genuinely new
// dimension means one key here, one line in matchesWhen, and one key on the
// `ctx` that encounters.js builds — nothing else.
export const DIALOGUE_WHEN_DIMENSIONS = [
  "time",
  "location",
  "background",
  "event",
];

function fieldMatches(rule, value) {
  if (rule === undefined) return true;
  return Array.isArray(rule) ? rule.includes(value) : rule === value;
}

// Evaluate a declarative `when` block against the encounter context.
export function matchesWhen(when, ctx = {}) {
  if (!when) return true;
  return (
    fieldMatches(when.time, timeBucket(ctx.now)) &&
    fieldMatches(when.location, ctx.locationKey) &&
    fieldMatches(when.background, ctx.backgroundFile) &&
    fieldMatches(when.event, ctx.event ?? null)
  );
}

// Flatten every matching conditional entry's tier into one list. `poolKey` is
// the field on each `{ when, <poolKey> }` block that holds the tiered lines —
// "dialogue" for narration, "approach" for the step-forward button.
function collectConditional(entries, poolKey, tier, variant, ctx) {
  const out = [];
  for (const entry of entries || []) {
    if (matchesWhen(entry.when, ctx)) {
      out.push(...resolvePoolTier(entry[poolKey], tier, variant));
    }
  }
  return out;
}

// `ctx` carries the encounter context: { now, locationKey, backgroundFile,
// event }. All fields optional — an absent field just means `when` rules that
// constrain it won't match.
export function getRandomDialogueLine(
  character,
  tier,
  variant = null,
  ctx = {},
) {
  const content = DIALOGUE[character.id];
  if (!content) return "...";

  // A pmOnly character (Towa) only truly speaks in the evening; the rest of the
  // day it hard-swaps to a wordless replacement pool. Gated by the same evening
  // cutoff as `_PM` backgrounds (timeBucket, off ctx.now) — not a separate
  // threshold. Separate from the additive `when` system below.
  if (
    character.pmOnly &&
    content.daytimeDialogue &&
    timeBucket(ctx.now) === "day"
  ) {
    const daytime =
      content.daytimeDialogue[tier] || content.daytimeDialogue.new;
    return Array.isArray(daytime) ? pickRandom(daytime) : daytime;
  }

  // Base pool, plus every conditional block whose `when` matches this scene —
  // the character's own `dialogueWhen` and the shared roster-wide pool. Additive:
  // a matched scene adds its flavor without ever emptying a tier.
  const lines = resolvePoolTier(content.dialogue, tier, variant);
  lines.push(
    ...collectConditional(content.dialogueWhen, "dialogue", tier, variant, ctx),
  );
  lines.push(
    ...collectConditional(SHARED_DIALOGUE_WHEN, "dialogue", tier, variant, ctx),
  );

  if (lines.length === 0) return "...";
  return pickRandom(lines);
}

// The greeting rendered onto the encounter image. Driven only by the character's
// temperament tier — never by time, location, or event.
export function getTemperamentGreeting(character, tier) {
  const content = DIALOGUE[character.id] || {};
  const lines = resolvePoolTier(content.temperamentDialogue, tier, null);
  if (lines.length === 0) return "...";
  return pickRandom(lines);
}

// The label on the single button that turns the /roam narration into an actual
// encounter — the "Step forward" beat. Tiered like the dialogue so the
// invitation matches the scene the narration just set. `approachWhen` (per
// character) and SHARED_APPROACH_WHEN add scene/time-specific labels the same
// way `dialogueWhen` adds narration; the pmOnly daytime swap is still a hard
// replacement, gated on the evening cutoff. `ctx` is the same object
// getRandomDialogueLine takes.
export function getRandomApproachLabel(
  character,
  tier,
  variant = null,
  ctx = {},
) {
  const content = DIALOGUE[character.id];
  if (!content) return pickRandom(APPROACH_LABEL_FALLBACK);

  if (
    character.pmOnly &&
    content.daytimeApproach &&
    timeBucket(ctx.now) === "day"
  ) {
    const daytime =
      content.daytimeApproach[tier] || content.daytimeApproach.new;
    return Array.isArray(daytime) ? pickRandom(daytime) : daytime;
  }

  const labels = resolvePoolTier(content.approach, tier, variant);
  labels.push(
    ...collectConditional(content.approachWhen, "approach", tier, variant, ctx),
  );
  labels.push(
    ...collectConditional(SHARED_APPROACH_WHEN, "approach", tier, variant, ctx),
  );

  if (labels.length === 0) return pickRandom(APPROACH_LABEL_FALLBACK);
  return pickRandom(labels);
}

// `ctx` (optional, same shape as getRandomDialogueLine's) lets a character's
// `responsesWhen` blocks add scene/time-specific button labels. No shared layer
// for responses — a bespoke choice ("Stay till the lanterns are out") is always
// character-specific.
export function generateCharacterResponses(character, tier = "new", ctx = {}) {
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
      ctx,
    ),
    [RESPONSE_TYPES.PLAYFUL]: generatePlayfulResponse(
      character,
      archetypeSet,
      keywordSet,
      tier,
      ctx,
    ),
    [RESPONSE_TYPES.BOLD]: generateBoldResponse(
      character,
      archetypeSet,
      keywordSet,
      tier,
      ctx,
    ),
    [RESPONSE_TYPES.NEUTRAL]: generateNeutralResponse(
      character,
      archetypeSet,
      keywordSet,
      tier,
      ctx,
    ),
  };

  return responses;
}

// Button labels live in constants/dialogue.js, authored at three tiers rather
// than all six — the buttons only need to change where the register does. The
// dialogue tiers that share a register share a label set: everything up to
// "warm" reads as an approach, "spark" turns flirtatious, "close" is intimate,
// "bound" is romantic.
const RESPONSE_LABEL_TIER = {
  new: "new",
  known: "new",
  warm: "new",
  spark: "spark",
  close: "close",
  bound: "bound",
};

// Each slot is a collection, picked from at random so a character the player
// sees often doesn't always get the same four buttons. Base labels come from
// `responses`; any `responsesWhen` block whose `when` matches `ctx` adds its
// labels on top. A character with nothing here falls through to the archetype
// defaults below.
function responseLabel(characterId, responseType, tier, ctx = {}) {
  const content = DIALOGUE[characterId];
  const labelTier = RESPONSE_LABEL_TIER[tier] || "new";
  const labels = resolvePoolTier(
    content?.responses?.[responseType],
    labelTier,
    null,
  );
  for (const entry of content?.responsesWhen || []) {
    if (matchesWhen(entry.when, ctx)) {
      labels.push(
        ...resolvePoolTier(entry.responses?.[responseType], labelTier, null),
      );
    }
  }
  if (labels.length === 0) return null;
  return pickRandom(labels);
}

function generateKindResponse(character, archetypeSet, keywordSet, tier, ctx) {
  const label = responseLabel(character.id, RESPONSE_TYPES.KIND, tier, ctx);
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

function generatePlayfulResponse(
  character,
  archetypeSet,
  keywordSet,
  tier,
  ctx,
) {
  const label = responseLabel(character.id, RESPONSE_TYPES.PLAYFUL, tier, ctx);
  if (label) return { label };

  if (archetypeSet.has("teasedere")) return { label: "Tease them back" };
  if (archetypeSet.has("sadodere")) return { label: "Make them laugh" };
  if (archetypeSet.has("deredere") || archetypeSet.has("bakadere"))
    return { label: "Share a laugh" };
  if (archetypeSet.has("yandere")) return { label: "Play their game" };
  if (archetypeSet.has("kuudere")) return { label: "Exchange wit with them" };

  return { label: "Crack a joke" };
}

function generateBoldResponse(character, archetypeSet, keywordSet, tier, ctx) {
  const label = responseLabel(character.id, RESPONSE_TYPES.BOLD, tier, ctx);
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

function generateNeutralResponse(
  character,
  archetypeSet,
  keywordSet,
  tier,
  ctx,
) {
  const label = responseLabel(character.id, RESPONSE_TYPES.NEUTRAL, tier, ctx);
  if (label) return { label };

  if (archetypeSet.has("kuudere") || archetypeSet.has("dandere"))
    return { label: "Stay quiet" };
  if (archetypeSet.has("yandere")) return { label: "Observe them carefully" };
  if (archetypeSet.has("deredere") || archetypeSet.has("bright deredere"))
    return { label: "Simply be present" };
  if (archetypeSet.has("sadodere")) return { label: "Watch and listen" };

  return { label: "Stay silent" };
}
