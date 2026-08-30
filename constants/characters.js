// Reference data for every character in assets/chars, grouped by the house
// they belong to (matched against character-named rooms in assets/bg where
// possible). Characters with `house: null` are general encounters only —
// they can turn up at any GENERAL_LOCATIONS spot (see constants/backgrounds.js),
// never inside another house.
import { HOUSES, CHARACTER_ROOMS } from "./backgrounds.js";

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
    dialogue: {
      new: ["The frost never bothered him — but he's curious why you're here."],
      warm: ["He almost smiles now when he sees you coming — almost."],
      close: [
        'The ice in his voice is long gone around you. "I was hoping I\'d run into you."',
      ],
    },
    temperamentDialogue: {
      new: ["You're not supposed to be here. Don't waste my time."],
      warm: ["Your presence is... tolerable."],
      close: ["I suppose I can make an exception for you."],
    },
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
    dialogue: {
      new: [
        "He flashes a big grin. \"Lost, or just brave enough to wander into Frostheim?\"",
      ],
      warm: ["He nudges your shoulder like you're part of the Frostheim crew."],
      close: [
        '"Took you long enough," he grins, pulling you into a quick shoulder-bump hug.',
      ],
    },
    temperamentDialogue: {
      new: ["YO! Another fresh face! You lost or what?"],
      warm: ["Hey, Honor roll! Ready to hang out?"],
      close: ["You made it! I was hoping you'd show up!"],
    },
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
    dialogue: {
      new: [
        "He studies you for a long moment before offering the faintest nod.",
      ],
      warm: ["He offers a small, genuine smile now instead of just a nod."],
      close: [
        '"I don\'t say this to just anyone," he admits quietly, "but I\'m glad you\'re here."',
      ],
    },
    temperamentDialogue: {
      new: ["Oh... hello. Please, be careful around here."],
      warm: ["I'm glad you're safe. How have you been?"],
      close: ["Your safety means more to me than anything else."],
    },
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
    dialogue: {
      new: [
        "Calm as still water, he tilts his head. \"You're new around here.\"",
      ],
      warm: [
        "His usual calm softens into something warmer whenever you're near.",
      ],
      close: [
        "\"You've become someone I look forward to seeing,\" he says plainly, like it's just a fact.",
      ],
    },
    temperamentDialogue: {
      new: ["State your purpose here."],
      warm: ["I see you again. That's... acceptable."],
      close: [
        "Well, well..I must say your company is preferred. To my surprise.",
      ],
    },
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
    dialogue: {
      new: [
        'Grease-stained and worn, he looks at you with eyes that have seen too much. "Be careful here."',
      ],
      warm: [
        "He works beside you in steady silence, a quiet understanding growing between you.",
      ],
      close: [
        '"You make everything feel... lighter," he says softly, like a confession. "Thank you."',
      ],
    },
    temperamentDialogue: {
      new: ["This place isn't meant for people like you. Stay safe."],
      warm: ["I'm glad you're here. Really."],
      close: [
        "You're the only constant in my life that doesn't haunt me. Please stay by my side.",
      ],
    },
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
    dialogue: {
      new: [
        "He smirks dangerously, eyes lit with a hint of amusement. \"What brings you to the lion's den?\"",
      ],
      warm: [
        "He runs his fingers along your jawline, still taunting, but there's something protective underneath.",
      ],
      close: [
        '"I could destroy you without thinking," he whispers, "but I\'d rather keep you all to myself."',
      ],
    },
    temperamentDialogue: {
      new: ["You're either brave or stupid. Let's find out which."],
      warm: ["Finally came back, huh? I was getting bored without you."],
      close: [
        "You're the only thing sharp enough to match my wit. The only one I'd never want to hurt.",
      ],
    },
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
    dialogue: {
      new: [
        "His face lights up when he sees you. There's something genuinely kind in his eyes.",
      ],
      warm: [
        "He greets you with a warm smile, already thinking about how to make your day better.",
      ],
      close: [
        '"You mean so much to me," he says earnestly. "I hope you know that by now."',
      ],
    },
    temperamentDialogue: {
      new: ["Oh! Senpai! What brings you by?"],
      warm: ["Senpai! I'm always happy to see you around."],
      close: ["Senpai... I'm really glad you're here. You know that, right?"],
    },
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
    dialogue: {
      new: [
        "He looks up from tending the lanterns, a quiet warmth in his eyes as he notices you.",
      ],
      warm: [
        "His usual composure softens immediately—there's genuine gladness in his expression when he sees you.",
      ],
      close: [
        '"I was hoping... you\'d come by tonight," he admits quietly, the lantern light catching the sincerity in his gaze.',
      ],
    },
    temperamentDialogue: {
      new: ["Welcome. Please, make yourself comfortable."],
      warm: ["You're here... I'm very glad."],
      close: ["I... I've missed you more than I should admit."],
    },
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
    dialogue: {
      new: [
        "He greets you with a gentle bow, the lantern light soft in his warm eyes. \"Welcome.\"",
      ],
      warm: [
        "His expression brightens with genuine pleasure, all formal distance melting away. \"Friend. I'm glad you're here.\"",
      ],
      close: [
        '"With you, everything feels like it\'s exactly as it should be," he says softly, eyes reflecting starlight and something deeper.',
      ],
    },
    temperamentDialogue: {
      new: ["Autumn winds carry you here. Welcome, wanderer."],
      warm: ["You return like seasons turning. My heart is at ease."],
      close: ["With you, the world feels right. Like poetry made real."],
    },
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
    dialogue: {
      new: [
        "He regards you with gentle courtesy, petals dancing around him. \"An unexpected pleasure.\"",
      ],
      warm: [
        "There's warmth in his eyes as he acknowledges you, a small smile playing at his lips. His usual formality softens slightly.",
      ],
      close: [
        '"I find myself waiting for you," he admits quietly, dropping the courteous mask for just a moment. "More than I should."',
      ],
    },
    temperamentDialogue: {
      new: ["How lovely. A visitor graces us with their presence."],
      warm: ["Princess, you honor us with your return."],
      close: ["I... you've become someone I always look forward to seeing."],
    },
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
    dialogue: {
      new: [
        "He juggles a coin with practiced ease, barely sparing you a glance. \"Another spectator?\"",
      ],
      warm: [
        "He catches the coin mid-flip, actually meeting your eyes this time. There's something almost genuine in his smile.",
      ],
      close: [
        '"I wasn\'t expecting to care about anyone," he admits quietly, the charm dropping for just a moment. "But you changed that."',
      ],
    },
    temperamentDialogue: {
      new: ["Well, hello there. New face in town?"],
      warm: ["Always a pleasure to see you again, sweetheart."],
      close: [
        "You've become my favorite person in this place lately, you know.",
      ],
    },
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
    dialogue: {
      new: {
        uniform: [
          "The spotlight finds him as he commands the stage with magnetic presence.",
        ],
        casual: [
          "The spotlight finds her as she commands the stage with magnetic presence.",
        ],
      },
      warm: {
        uniform: [
          "He lights up the moment he sees you, the star already in motion for you.",
        ],
        casual: [
          "She lights up the moment she sees you, the star already in motion for you.",
        ],
      },
      close: {
        uniform: [
          "For you, he'd abandon every performance, every act. Just to be himself.",
        ],
        casual: [
          "For you, she'd abandon every performance, every act. Just to be herself.",
        ],
      },
    },
    temperamentDialogue: {
      new: ["A new admirer! How delightful! What's your name?"],
      warm: ["You're back! I was hoping you'd return."],
      close: ["With you, I don't need to perform. I can just be myself."],
    },
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
    dialogue: {
      new: [
        "He looks up from tinkering with something, hands still steady. There's a ready smile for you.",
      ],
      warm: [
        "He sets his work aside immediately, fully present for you—reliable as always.",
      ],
      close: [
        '"You know you can always count on me, right?" he says warmly. "For anything you need."',
      ],
    },
    temperamentDialogue: {
      new: ["Oh! Welcome! Can I get you anything?"],
      warm: ["It's nice seeing you. You know you're always welcome here."],
      close: [
        "You've become someone really important to me. I hope you know that.",
      ],
    },
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
    dialogue: {
      new: ["A masked bow, a theatrical flourish. \"Welcome to the show.\""],
      warm: ["The mask tilts your way first, before anyone else in the room."],
      close: [
        '"For you," Shion says, lifting the mask just enough to show a genuine smile.',
      ],
    },
    temperamentDialogue: {
      new: ["What a delicious expression. I wonder what frightens you?"],
      warm: [
        "You came back. How... thrilling. I missed that look in your eyes.",
      ],
      close: ["You're mine to protect. My wife."],
    },
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
    dialogue: {
      new: [
        "He's focused on his work, barely acknowledging you with a glance. Pure efficiency.",
      ],
      warm: [
        "He puts down his notes when he hears you. There's a shift in his expression—focused, but this time on you.",
      ],
      close: [
        "He steps closer, his eyes direct. \"You matter more than anyone ever could.\"",
      ],
    },
    temperamentDialogue: {
      new: ["You're not qualified for this. Leave."],
      warm: ["You. Stay for a moment."],
      close: ["I don't usually make exceptions. But for you... I will."],
    },
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
    dialogue: {
      new: [
        "He studies you with clinical precision, already calculating. \"You came back. Good.\"",
      ],
      warm: [
        "His cold demeanor cracks slightly—there's obsession in his eyes now, the drive to save you consuming him.",
      ],
      close: [
        '"I\'ll find your cure," he says with absolute conviction, "because I\'m the only one capable enough. And you\'re mine to save."',
      ],
    },
    temperamentDialogue: {
      new: ["A novice stumbles in. How amusing."],
      warm: ["You again? ...I suppose I don't mind."],
      close: [
        "Don't go worrying me like that. I have better things to do than panic over you.",
      ],
    },
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
    dialogue: {
      new: [
        "He's scrolling through his phone, barely acknowledging you at first. \"Oh. Hey.\"",
      ],
      warm: [
        "He actually puts his phone down when you arrive. There's genuine concern in his gaze now.",
      ],
      close: [
        '"Senpai... you know I\'ll always have your back, right?" he says quietly, protective concern replacing his usual detachment.',
      ],
    },
    temperamentDialogue: {
      new: ["Huh? Oh, didn't see you there. You lost or something?"],
      warm: ["Oh, it's you. Yeah, I was hoping you'd show up."],
      close: [
        "Hey, senpai... I'm really glad you're here. More than you know.",
      ],
    },
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
    dialogue: {
      new: [
        "There's mischief written all over his face as he assesses you with warm eyes. \"Trouble or destiny?\"",
      ],
      warm: [
        "His whole face lights up when he sees you—genuine delight, the kind that makes his warmth impossible to resist.",
      ],
      close: [
        '"I love this about you," he says genuinely, taking your hand. "The way you make everything feel like an adventure. Like... like home."',
      ],
    },
    temperamentDialogue: {
      new: ["Well, well! Someone interesting wandered in!"],
      warm: ["Hey, Ojou-chan! Miss me?"],
      close: ["I really like seeing you smile. Can I be honest about that?"],
    },
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
    dialogue: {
      new: [
        "He watches from the shadows, his gaze fixed and unblinking. There's something possessive in how he looks at you.",
      ],
      warm: [
        "He steps into the light when you arrive, like he's been waiting for only you. \"Don't leave,\" he says quietly.",
      ],
      close: [
        '"I\'ve been waiting every moment since you left," he confesses, drawing impossibly close. "Don\'t ever leave again. Please."',
      ],
    },
    amOnlyDialogue: {
      new: ["~~~!"],
      warm: ["~~~! ♫"],
      close: ["~~~! ~~~!"],
    },
    temperamentDialogue: {
      new: ["...Dandelion?"],
      warm: ["Dandelion. You're here. That's all that matters."],
      close: ["You're mine. Only mine. Promise me you'll never leave."],
    },
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
    dialogue: {
      new: [
        "He greets you with a charming smile, but there's something dangerous beneath the gentleman's facade.",
      ],
      warm: [
        "The fragile act drops for a moment when you're near—you see the predator underneath, and he lets you.",
      ],
      close: [
        '"I\'ve been waiting lifetimes for someone who could see me like this," he says, pulling you close. "Don\'t leave me again."',
      ],
    },
    temperamentDialogue: {
      new: ["Oh my, what a lovely lady. Welcome to my home."],
      warm: ["Lovely lady, I was hoping you'd visit. Come closer."],
      close: ["You belong right here, next to me. Don't ever leave."],
    },
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
    dialogue: {
      new: [
        "He lights up with a radiant smile, practically bouncing with energy. \"Oh wow, look who showed up! You're a sight for sore eyes!\" Behind the brightness, there's a shadow of something darker he's desperately hiding.",
      ],
      warm: [
        "His grin is warm and genuine when he sees you, though you catch the moment his cheerfulness falters—like you're the only thing holding back the darkness.",
      ],
      close: [
        '"You make me feel alive," he says softly, hands hovering near you but never quite touching. "Like the curse doesn\'t matter when you\'re near."',
      ],
    },
    temperamentDialogue: {
      new: [
        "Oh! Well, well! Lucky me—you wandered in! Come closer, but not too close, yeah? Just... let me look at you.",
      ],
      warm: [
        "You're back! You know you make everything feel less dark when you're around? It's actually kind of amazing.",
      ],
      close: [
        "Even with this curse, I'd bear it a thousand times if it meant seeing you smile.",
      ],
    },
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
    dialogue: {
      new: [
        "He keeps his distance, observing you carefully. There's wariness in his posture, but curiosity flickers in his eyes.",
      ],
      warm: [
        "The guarded distance closes when he recognizes you. A genuine, warm smile breaks through his usual reserve.",
      ],
      close: [
        '"You\'re my most important person," he says simply, sincerely. "Your safety, your happiness—that\'s everything to me."',
      ],
    },
    temperamentDialogue: {
      new: ["Hmm? You're... interesting. What brings you here?"],
      warm: ["You're back. I'm... really happy about that."],
      close: ["Seeing you safe and happy is the most important thing to me."],
    },
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
    dialogue: {
      new: [
        "He eyes you with a challenging smirk, cards deftly shuffled in his hands. \"You lost, kitten?\"",
      ],
      warm: [
        "His aggressive posture softens when he sees you're really there. He pulls out a seat beside him without a word.",
      ],
      close: [
        '"You\'re the only one I\'d ever go all-in for," he says roughly, pulling you close. "Don\'t make me regret it."',
      ],
    },
    temperamentDialogue: {
      new: ["What are you doing here?"],
      warm: ["...So you came back, kitten?"],
      close: [
        "Don't you dare go getting hurt. That's MY job to protect you. Gyahaha!",
      ],
    },
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
    dialogue: {
      new: [
        "He looks up with genuine interest, already assessing your potential. \"Partner, your timing is fortuitous. I could use someone sharp.\"",
      ],
      warm: [
        "His eyes light up when he sees you—he's eager now, ready to collaborate and strategize together.",
      ],
      close: [
        '"You\'ve become my partner in more ways than just business," he says warmly, stepping closer. "I wouldn\'t trust the calculation to anyone but you."',
      ],
    },
    temperamentDialogue: {
      new: [
        "Ah, my new partner. Perfect timing. Let's work through this together.",
      ],
      warm: ["I was hoping you'd come by. We make a good team, don't we?"],
      close: [
        "You're the only person I trust completely. We can accomplish anything with you by my side.",
      ],
    },
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
    dialogue: {
      new: [
        "He's barking orders at the staff, managing every angle of the casino floor. \"HDY wast my time? Quick, put on this dress and work table seven—we need someone sharp out there.\"",
      ],
      warm: [
        "He pauses mid-command when he spots you, actually stepping away from the action to greet you properly. Suddenly you matter more than the operation.",
      ],
      close: [
        '"You\'re not just money or status to me," he admits, voice uncharacteristically sincere. "You\'re everything."',
      ],
    },
    temperamentDialogue: {
      new: [
        "Perfect timing—I need someone I can trust to manage the VIP section. You in?",
      ],
      warm: [
        "Oh, you're back! Actually... I'm kind of happy to see you. Don't tell anyone.",
      ],
      close: [
        "I'd spend all my money on you if you asked. Not that I'd ever admit that normally.",
      ],
    },
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
    dialogue: {
      new: [
        "He looks up from his work, a little flustered but smiling warmly. \"Oh! H-hello. Do you need help with something?\"",
      ],
      warm: [
        "He gets a bit red in the face when he sees you, but his smile is genuine and eager. \"You came back! Can I help you with anything?\"",
      ],
      close: [
        '"You\'re really important to me," he says softly, a hint of bashfulness in his voice. "I\'m always happy to help you with anything you need."',
      ],
    },
    temperamentDialogue: {
      new: ["Oh! H-hi! Did you need something? I'm here to help!"],
      warm: [
        "You're back! I'm really happy to see you. What can I do for you?",
      ],
      close: ["You mean a lot to me. I'd do anything to help you."],
    },
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
  // Handle pmOnly characters (e.g., Towa can only speak in afternoon/evening)
  if (character.pmOnly && character.amOnlyDialogue && now) {
    const hour = now.getHours();
    // AM is 0-11 (midnight to 11:59 AM), PM is 12-23 (noon to 11:59 PM)
    if (hour < 12) {
      const amLines =
        character.amOnlyDialogue[tier] || character.amOnlyDialogue.new;
      return Array.isArray(amLines)
        ? amLines[Math.floor(Math.random() * amLines.length)]
        : amLines;
    }
  }

  let lines = character.dialogue[tier] || character.dialogue.new;

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
  const temperamentLines = character.temperamentDialogue || {};
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

function generateKindResponse(character, archetypeSet, keywordSet, tier) {
  switch (character.id) {
    case "jin":
      return tier === "close"
        ? { label: "Acknowledge his pain without judgment" }
        : { label: "Show respect for his pride" };
    case "kaito":
      return tier === "close"
        ? { label: "See past his bravado" }
        : { label: "Celebrate with his enthusiasm" };
    case "lucas":
      return tier === "close"
        ? { label: "Trust his quiet strength" }
        : { label: "Speak gently like he does" };
    case "tohma":
      return tier === "close"
        ? { label: "See through his composure" }
        : { label: "Respect his discipline" };
    case "alan":
      return tier === "close"
        ? { label: "Accept what he's done for you" }
        : { label: "Appreciate his straightforwardness" };
    case "leo":
      return tier === "close"
        ? { label: "See the real him beneath the act" }
        : { label: "Match his confidence" };
    case "shohei":
      return tier === "close"
        ? { label: "Let him know you care too" }
        : { label: "Return his warmth" };
    case "subaru":
      return tier === "close"
        ? { label: "Help him set down his burden" }
        : { label: "Acknowledge his effort" };
    case "zenji":
      return tier === "close"
        ? { label: "Accept all of what he is" }
        : { label: "Honor his gentle spirit" };
    case "haku":
      return tier === "close"
        ? { label: "Trust him with your heart" }
        : { label: "Accept his kindness" };
    case "elias":
      return tier === "close"
        ? { label: "Ask what he's really after" }
        : { label: "Be cautious of his charm" };
    case "jo":
      return tier === "close"
        ? { label: "Accept both sides of him" }
        : { label: "Admire his presence" };
    case "mio":
      return tier === "close"
        ? { label: "Tell him he matters too" }
        : { label: "Show appreciation for him" };
    case "lyca":
      return tier === "close"
        ? { label: "Remind him he's not a monster" }
        : { label: "Be genuinely kind" };
    case "rui":
      return tier === "close"
        ? { label: "Let him know you need him" }
        : { label: "Be sincere with him" };
    case "shion":
      return tier === "close"
        ? { label: "Let him protect you" }
        : { label: "Be careful around him" };
    case "jiro":
      return tier === "close"
        ? { label: "Help him remember what matters" }
        : { label: "Be patient with him" };
    case "yuri":
      return tier === "close"
        ? { label: "Show him his care shows" }
        : { label: "Don't take his coldness to heart" };
    case "ren":
      return tier === "close"
        ? { label: "Heal what his family broke" }
        : { label: "Be steady with him" };
    case "haru":
      return tier === "close"
        ? { label: "Show him home is with you" }
        : { label: "Appreciate his warmth" };
    case "towa":
      return tier === "close"
        ? { label: "Accept his possessiveness" }
        : { label: "Be very careful" };
    case "ed":
      return tier === "close"
        ? { label: "Let him get closer" }
        : { label: "Stand firm against his advances" };
    case "ritsu":
      return tier === "close"
        ? { label: "Show him friendship is real" }
        : { label: "Be logical with him" };
    case "romeo":
      return tier === "close"
        ? { label: "Know his real worth is you" }
        : { label: "Match his sass" };
    case "benkei":
      return tier === "close"
        ? { label: "Let him care for you" }
        : { label: "Trust his wisdom" };
  }

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
  switch (character.id) {
    case "jin":
      return tier === "close"
        ? { label: "Tease him out of his shell" }
        : { label: "Be bold enough for him" };
    case "kaito":
      return tier === "close"
        ? { label: "Laugh with his whole heart" }
        : { label: "Get swept up in his energy" };
    case "lucas":
      return tier === "close"
        ? { label: "Make him laugh softly" }
        : { label: "Be gentle and playful" };
    case "tohma":
      return tier === "close"
        ? { label: "Crack through his mask" }
        : { label: "Try to make him crack" };
    case "alan":
      return tier === "close"
        ? { label: "Get him laughing" }
        : { label: "Accept his humor" };
    case "leo":
      return tier === "close"
        ? { label: "Be his favorite game" }
        : { label: "Banter back at him" };
    case "shohei":
      return tier === "close"
        ? { label: "Share genuine laughter" }
        : { label: "Enjoy his charm" };
    case "subaru":
      return tier === "close"
        ? { label: "Make him blush" }
        : { label: "See his softer side" };
    case "zenji":
      return tier === "close"
        ? { label: "Bring him gentle joy" }
        : { label: "Appreciate his warmth" };
    case "haku":
      return tier === "close"
        ? { label: "See if you can catch him in a truth" }
        : { label: "Banter with him" };
    case "elias":
      return tier === "close"
        ? { label: "Play his game back" }
        : { label: "Enjoy his performance" };
    case "jo":
      return tier === "close"
        ? { label: "Delight in both sides" }
        : { label: "Share his spotlight" };
    case "mio":
      return tier === "close"
        ? { label: "Make him laugh genuinely" }
        : { label: "Share a laugh" };
    case "lyca":
      return tier === "close"
        ? { label: "Play with his playfulness" }
        : { label: "Be kind and playful" };
    case "rui":
      return tier === "close"
        ? { label: "Let him see your joy" }
        : { label: "Share your happiness" };
    case "shion":
      return tier === "close"
        ? { label: "Play along with him" }
        : { label: "Don't take him seriously" };
    case "jiro":
      return tier === "close"
        ? { label: "Make him laugh" }
        : { label: "Try to lighten the mood" };
    case "yuri":
      return tier === "close"
        ? { label: "Make him laugh despite himself" }
        : { label: "Tease him carefully" };
    case "ren":
      return tier === "close"
        ? { label: "Make him genuinely smile" }
        : { label: "Be playful around him" };
    case "haru":
      return tier === "close"
        ? { label: "Match his mischief" }
        : { label: "Enjoy his charm" };
    case "towa":
      return tier === "close"
        ? { label: "Give him your full attention" }
        : { label: "Make him smile" };
    case "ed":
      return tier === "close"
        ? { label: "Flirt back with him" }
        : { label: "Keep him at bay playfully" };
    case "ritsu":
      return tier === "close"
        ? { label: "Make him smile despite logic" }
        : { label: "Engage his mind playfully" };
    case "romeo":
      return tier === "close"
        ? { label: "Match his wit" }
        : { label: "Trade sass with him" };
    case "benkei":
      return tier === "close"
        ? { label: "Enjoy his quiet humor" }
        : { label: "Appreciate his warmth" };
  }

  if (archetypeSet.has("teasedere")) return { label: "Tease them back" };
  if (archetypeSet.has("sadodere")) return { label: "Make them laugh" };
  if (archetypeSet.has("deredere") || archetypeSet.has("bakadere"))
    return { label: "Share a laugh" };
  if (archetypeSet.has("yandere")) return { label: "Play their game" };
  if (archetypeSet.has("kuudere")) return { label: "Exchange wit with them" };

  return { label: "Crack a joke" };
}

function generateBoldResponse(character, archetypeSet, keywordSet, tier) {
  switch (character.id) {
    case "jin":
      return tier === "close"
        ? { label: "Show him you won't break" }
        : { label: "Stand with confidence" };
    case "kaito":
      return tier === "close"
        ? { label: "Embrace the chaos together" }
        : { label: "Go along for the ride" };
    case "lucas":
      return tier === "close"
        ? { label: "Be bold for him" }
        : { label: "Be gentle but firm" };
    case "tohma":
      return tier === "close"
        ? { label: "Demand the truth from him" }
        : { label: "Hold your own" };
    case "alan":
      return tier === "close"
        ? { label: "Trust his protection" }
        : { label: "Stand your ground" };
    case "leo":
      return tier === "close"
        ? { label: "Own his attention completely" }
        : { label: "Meet him head-on" };
    case "shohei":
      return tier === "close"
        ? { label: "Be bold with him" }
        : { label: "Express yourself to him" };
    case "subaru":
      return tier === "close"
        ? { label: "Push past his restraint" }
        : { label: "Be direct with him" };
    case "zenji":
      return tier === "close"
        ? { label: "Bold as poetry" }
        : { label: "Be sincere and true" };
    case "haku":
      return tier === "close"
        ? { label: "Challenge him directly" }
        : { label: "Make a bold move" };
    case "elias":
      return tier === "close"
        ? { label: "Confront him about it all" }
        : { label: "Call his bluff" };
    case "jo":
      return tier === "close"
        ? { label: "Be the star they want" }
        : { label: "Be bold and charming" };
    case "mio":
      return tier === "close"
        ? { label: "Be bold enough to need him" }
        : { label: "Express yourself boldly" };
    case "lyca":
      return tier === "close"
        ? { label: "Stand with him proudly" }
        : { label: "Be brave" };
    case "rui":
      return tier === "close"
        ? { label: "Need him without apology" }
        : { label: "Be honest about wanting him" };
    case "shion":
      return tier === "close"
        ? { label: "Surrender to him" }
        : { label: "Challenge him boldly" };
    case "jiro":
      return tier === "close"
        ? { label: "Stand firm for him" }
        : { label: "Be direct with him" };
    case "yuri":
      return tier === "close"
        ? { label: "Match his intensity" }
        : { label: "Challenge him back" };
    case "ren":
      return tier === "close"
        ? { label: "Fight for him" }
        : { label: "Be bold with him" };
    case "haru":
      return tier === "close"
        ? { label: "Match his boldness" }
        : { label: "Be daring with him" };
    case "towa":
      return tier === "close"
        ? { label: "Own him completely" }
        : { label: "Be very careful" };
    case "ed":
      return tier === "close"
        ? { label: "Let him get closer" }
        : { label: "Stand firm against his advances" };
    case "ritsu":
      return tier === "close"
        ? { label: "Make a bold choice about him" }
        : { label: "Be straightforward" };
    case "romeo":
      return tier === "close"
        ? { label: "Know you're worth his money" }
        : { label: "Bet on yourself" };
    case "benkei":
      return tier === "close"
        ? { label: "Accept his strength" }
        : { label: "Be honest with him" };
  }

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
  switch (character.id) {
    case "jin":
      return tier === "close"
        ? { label: "Sit with him in silence" }
        : { label: "Respect his space" };
    case "kaito":
      return tier === "close"
        ? { label: "Be his calm" }
        : { label: "Just listen" };
    case "lucas":
      return tier === "close"
        ? { label: "Be quiet with him" }
        : { label: "Stay silent" };
    case "tohma":
      return tier === "close"
        ? { label: "See what he won't say" }
        : { label: "Observe him carefully" };
    case "alan":
      return tier === "close"
        ? { label: "Understand his quiet" }
        : { label: "Be straightforward" };
    case "leo":
      return tier === "close"
        ? { label: "Watch him watching you" }
        : { label: "Watch and listen" };
    case "shohei":
      return tier === "close"
        ? { label: "Be present for him" }
        : { label: "Simply be there" };
    case "subaru":
      return tier === "close"
        ? { label: "Sit with him in care" }
        : { label: "Be gentle" };
    case "zenji":
      return tier === "close"
        ? { label: "Accept his silence" }
        : { label: "Respect his mystery" };
    case "haku":
      return tier === "close"
        ? { label: "Let him read your mind" }
        : { label: "Let him observe you" };
    case "elias":
      return tier === "close"
        ? { label: "Watch what he's really doing" }
        : { label: "Stay wary" };
    case "jo":
      return tier === "close"
        ? { label: "Share the spotlight quietly" }
        : { label: "Simply be present" };
    case "mio":
      return tier === "close"
        ? { label: "Sit with him" }
        : { label: "Be there for him" };
    case "lyca":
      return tier === "close"
        ? { label: "Understand his quiet" }
        : { label: "Be calm with him" };
    case "rui":
      return tier === "close"
        ? { label: "Let him serve in silence" }
        : { label: "Simply accept it" };
    case "shion":
      return tier === "close"
        ? { label: "Let him watch over you" }
        : { label: "Observe them carefully" };
    case "jiro":
      return tier === "close"
        ? { label: "Be patient with his silence" }
        : { label: "Give him quiet" };
    case "yuri":
      return tier === "close"
        ? { label: "Understand his withdrawal" }
        : { label: "Give him space" };
    case "ren":
      return tier === "close"
        ? { label: "Be quiet with him" }
        : { label: "Let him be" };
    case "haru":
      return tier === "close"
        ? { label: "Rest with him" }
        : { label: "Be present" };
    case "towa":
      return tier === "close"
        ? { label: "Be his constant" }
        : { label: "Observe them carefully" };
    case "ed":
      return tier === "close"
        ? { label: "Let him watch in silence" }
        : { label: "Stay watchful" };
    case "ritsu":
      return tier === "close"
        ? { label: "Understand his logic" }
        : { label: "Be logical" };
    case "romeo":
      return tier === "close"
        ? { label: "Let him have this moment" }
        : { label: "Stay quiet" };
    case "benkei":
      return tier === "close"
        ? { label: "Rest with his wisdom" }
        : { label: "Be quiet" };
  }

  if (archetypeSet.has("kuudere") || archetypeSet.has("dandere"))
    return { label: "Stay quiet" };
  if (archetypeSet.has("yandere")) return { label: "Observe them carefully" };
  if (archetypeSet.has("deredere") || archetypeSet.has("bright deredere"))
    return { label: "Simply be present" };
  if (archetypeSet.has("sadodere")) return { label: "Watch and listen" };

  return { label: "Stay silent" };
}
