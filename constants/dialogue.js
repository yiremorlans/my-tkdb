// Authored content for every character, keyed by the ids in
// constants/characters.js. Kept separate from the character records so dialogue
// can grow — many lines per tier — without bloating character configuration,
// which is close to static by comparison.
//
// Each tier is a collection; one line is picked at random per encounter (see
// getRandomDialogueLine). `dialogue` tiers are normally string arrays, but may
// instead be keyed by image variant where a character's lines differ by outfit
// (Jo's pronouns change between uniform and casual).
//
// `responses` holds the button labels offered to the player. Only two tiers are
// stored: "close" and everything before it. A character omitted here, or missing
// a response type, falls back to archetype defaults in constants/characters.js —
// constants/validateContent.js reports any such gap at startup.

export const DIALOGUE = {
  jin: {
    dialogue: {
      new: [
        "The frost never bothered him — but he's curious why you're here.",
      ],
      warm: [
        "He almost smiles now when he sees you coming — almost.",
      ],
      close: [
        "The ice in his voice is long gone around you. \"I was hoping I'd run into you.\"",
      ],
    },
    temperamentDialogue: {
      new: [
        "\"You're not supposed to be here. Don't waste my time.\"",
      ],
      warm: [
        "\"Your presence is... tolerable.\"",
      ],
      close: [
        "\"I suppose I can make an exception for you.\"",
      ],
    },
    responses: {
      kind: {
        new: "Show respect for his pride",
        close: "Acknowledge his pain without judgment",
      },
      playful: {
        new: "Be bold enough for him",
        close: "Tease him out of his shell",
      },
      bold: {
        new: "Stand with confidence",
        close: "Show him you won't break",
      },
      neutral: {
        new: "Respect his space",
        close: "Sit with him in silence",
      },
    },
  },

  kaito: {
    dialogue: {
      new: [
        "He flashes a big grin. \"Lost, or just brave enough to wander into Frostheim?\"",
      ],
      warm: [
        "He nudges your shoulder like you're part of the Frostheim crew.",
      ],
      close: [
        "\"Took you long enough,\" he grins, pulling you into a quick shoulder-bump hug.",
      ],
    },
    temperamentDialogue: {
      new: [
        "\"YO! Another fresh face! You lost or what?\"",
      ],
      warm: [
        "\"Hey, Honor roll! Ready to hang out?\"",
      ],
      close: [
        "\"You made it! I was hoping you'd show up!\"",
      ],
    },
    responses: {
      kind: {
        new: "Celebrate with his enthusiasm",
        close: "See past his bravado",
      },
      playful: {
        new: "Get swept up in his energy",
        close: "Laugh with his whole heart",
      },
      bold: {
        new: "Go along for the ride",
        close: "Embrace the chaos together",
      },
      neutral: {
        new: "Just listen",
        close: "Be his calm",
      },
    },
  },

  lucas: {
    dialogue: {
      new: [
        "He studies you for a long moment before offering the faintest nod.",
      ],
      warm: [
        "He offers a small, genuine smile now instead of just a nod.",
      ],
      close: [
        "\"I don't say this to just anyone,\" he admits quietly, \"but I'm glad you're here.\"",
      ],
    },
    temperamentDialogue: {
      new: [
        "\"Oh... hello. Please, be careful around here.\"",
      ],
      warm: [
        "\"I'm glad you're safe. How have you been?\"",
      ],
      close: [
        "\"Your safety means more to me than anything else.\"",
      ],
    },
    responses: {
      kind: {
        new: "Speak gently like he does",
        close: "Trust his quiet strength",
      },
      playful: {
        new: "Be gentle and playful",
        close: "Make him laugh softly",
      },
      bold: {
        new: "Be gentle but firm",
        close: "Be bold for him",
      },
      neutral: {
        new: "Stay silent",
        close: "Be quiet with him",
      },
    },
  },

  tohma: {
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
      new: [
        "\"State your purpose here.\"",
      ],
      warm: [
        "\"I see you again. That's... acceptable.\"",
      ],
      close: [
        "\"Well, well..I must say your company is preferred. To my surprise.\"",
      ],
    },
    responses: {
      kind: {
        new: "Respect his discipline",
        close: "See through his composure",
      },
      playful: {
        new: "Try to make him crack",
        close: "Crack through his mask",
      },
      bold: {
        new: "Hold your own",
        close: "Demand the truth from him",
      },
      neutral: {
        new: "Observe him carefully",
        close: "See what he won't say",
      },
    },
  },

  alan: {
    dialogue: {
      new: [
        "Grease-stained and worn, he looks at you with eyes that have seen too much. \"Be careful here.\"",
      ],
      warm: [
        "He works beside you in steady silence, a quiet understanding growing between you.",
      ],
      close: [
        "\"You make everything feel... lighter,\" he says softly, like a confession. \"Thank you.\"",
      ],
    },
    temperamentDialogue: {
      new: [
        "\"This place isn't meant for people like you. Stay safe.\"",
      ],
      warm: [
        "\"I'm glad you're here. Really.\"",
      ],
      close: [
        "\"You're the only constant in my life that doesn't haunt me. Please stay by my side.\"",
      ],
    },
    responses: {
      kind: {
        new: "Appreciate his straightforwardness",
        close: "Accept what he's done for you",
      },
      playful: {
        new: "Accept his humor",
        close: "Get him laughing",
      },
      bold: {
        new: "Stand your ground",
        close: "Trust his protection",
      },
      neutral: {
        new: "Be straightforward",
        close: "Understand his quiet",
      },
    },
  },

  leo: {
    dialogue: {
      new: [
        "He smirks dangerously, eyes lit with a hint of amusement. \"What brings you to the lion's den?\"",
      ],
      warm: [
        "He runs his fingers along your jawline, still taunting, but there's something protective underneath.",
      ],
      close: [
        "\"I could destroy you without thinking,\" he whispers, \"but I'd rather keep you all to myself.\"",
      ],
    },
    temperamentDialogue: {
      new: [
        "\"You're either brave or stupid. Let's find out which.\"",
      ],
      warm: [
        "\"Finally came back, huh? I was getting bored without you.\"",
      ],
      close: [
        "\"You're the only thing sharp enough to match my wit. The only one I'd never want to hurt.\"",
      ],
    },
    responses: {
      kind: {
        new: "Match his confidence",
        close: "See the real him beneath the act",
      },
      playful: {
        new: "Banter back at him",
        close: "Be his favorite game",
      },
      bold: {
        new: "Meet him head-on",
        close: "Own his attention completely",
      },
      neutral: {
        new: "Watch and listen",
        close: "Watch him watching you",
      },
    },
  },

  shohei: {
    dialogue: {
      new: [
        "His face lights up when he sees you. There's something genuinely kind in his eyes.",
      ],
      warm: [
        "He greets you with a warm smile, already thinking about how to make your day better.",
      ],
      close: [
        "\"You mean so much to me,\" he says earnestly. \"I hope you know that by now.\"",
      ],
    },
    temperamentDialogue: {
      new: [
        "\"Oh! Senpai! What brings you by?\"",
      ],
      warm: [
        "\"Senpai! I'm always happy to see you around.\"",
      ],
      close: [
        "\"Senpai... I'm really glad you're here. You know that, right?\"",
      ],
    },
    responses: {
      kind: {
        new: "Return his warmth",
        close: "Let him know you care too",
      },
      playful: {
        new: "Enjoy his charm",
        close: "Share genuine laughter",
      },
      bold: {
        new: "Express yourself to him",
        close: "Be bold with him",
      },
      neutral: {
        new: "Simply be there",
        close: "Be present for him",
      },
    },
  },

  subaru: {
    dialogue: {
      new: [
        "He looks up from tending the lanterns, a quiet warmth in his eyes as he notices you.",
      ],
      warm: [
        "His usual composure softens immediately—there's genuine gladness in his expression when he sees you.",
      ],
      close: [
        "\"I was hoping... you'd come by tonight,\" he admits quietly, the lantern light catching the sincerity in his gaze.",
      ],
    },
    temperamentDialogue: {
      new: [
        "\"Welcome. Please, make yourself comfortable.\"",
      ],
      warm: [
        "\"You're here... I'm very glad.\"",
      ],
      close: [
        "\"I... I've missed you more than I should admit.\"",
      ],
    },
    responses: {
      kind: {
        new: "Acknowledge his effort",
        close: "Help him set down his burden",
      },
      playful: {
        new: "See his softer side",
        close: "Make him blush",
      },
      bold: {
        new: "Be direct with him",
        close: "Push past his restraint",
      },
      neutral: {
        new: "Be gentle",
        close: "Sit with him in care",
      },
    },
  },

  zenji: {
    dialogue: {
      new: [
        "He greets you with a gentle bow, the lantern light soft in his warm eyes. \"Welcome.\"",
      ],
      warm: [
        "His expression brightens with genuine pleasure, all formal distance melting away. \"Friend. I'm glad you're here.\"",
      ],
      close: [
        "\"With you, everything feels like it's exactly as it should be,\" he says softly, eyes reflecting starlight and something deeper.",
      ],
    },
    temperamentDialogue: {
      new: [
        "\"Autumn winds carry you here. Welcome, wanderer.\"",
      ],
      warm: [
        "\"You return like seasons turning. My heart is at ease.\"",
      ],
      close: [
        "\"With you, the world feels right. Like poetry made real.\"",
      ],
    },
    responses: {
      kind: {
        new: "Honor his gentle spirit",
        close: "Accept all of what he is",
      },
      playful: {
        new: "Appreciate his warmth",
        close: "Bring him gentle joy",
      },
      bold: {
        new: "Be sincere and true",
        close: "Bold as poetry",
      },
      neutral: {
        new: "Respect his mystery",
        close: "Accept his silence",
      },
    },
  },

  haku: {
    dialogue: {
      new: [
        "He regards you with gentle courtesy, petals dancing around him. \"An unexpected pleasure.\"",
      ],
      warm: [
        "There's warmth in his eyes as he acknowledges you, a small smile playing at his lips. His usual formality softens slightly.",
      ],
      close: [
        "\"I find myself waiting for you,\" he admits quietly, dropping the courteous mask for just a moment. \"More than I should.\"",
      ],
    },
    temperamentDialogue: {
      new: [
        "\"How lovely. A visitor graces us with their presence.\"",
      ],
      warm: [
        "\"Princess, you honor us with your return.\"",
      ],
      close: [
        "\"I... you've become someone I always look forward to seeing.\"",
      ],
    },
    responses: {
      kind: {
        new: "Accept his kindness",
        close: "Trust him with your heart",
      },
      playful: {
        new: "Banter with him",
        close: "See if you can catch him in a truth",
      },
      bold: {
        new: "Make a bold move",
        close: "Challenge him directly",
      },
      neutral: {
        new: "Let him observe you",
        close: "Let him read your mind",
      },
    },
  },

  elias: {
    dialogue: {
      new: [
        "He juggles a coin with practiced ease, barely sparing you a glance. \"Another spectator?\"",
      ],
      warm: [
        "He catches the coin mid-flip, actually meeting your eyes this time. There's something almost genuine in his smile.",
      ],
      close: [
        "\"I wasn't expecting to care about anyone,\" he admits quietly, the charm dropping for just a moment. \"But you changed that.\"",
      ],
    },
    temperamentDialogue: {
      new: [
        "\"Well, hello there. New face in town?\"",
      ],
      warm: [
        "\"Always a pleasure to see you again, sweetheart.\"",
      ],
      close: [
        "\"You've become my favorite person in this place lately, you know.\"",
      ],
    },
    responses: {
      kind: {
        new: "Be cautious of his charm",
        close: "Ask what he's really after",
      },
      playful: {
        new: "Enjoy his performance",
        close: "Play his game back",
      },
      bold: {
        new: "Call his bluff",
        close: "Confront him about it all",
      },
      neutral: {
        new: "Stay wary",
        close: "Watch what he's really doing",
      },
    },
  },

  jo: {
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
      new: [
        "\"A new admirer! How delightful! What's your name?\"",
      ],
      warm: [
        "\"You're back! I was hoping you'd return.\"",
      ],
      close: [
        "\"With you, I don't need to perform. I can just be myself.\"",
      ],
    },
    responses: {
      kind: {
        new: "Admire his presence",
        close: "Accept both sides of him",
      },
      playful: {
        new: "Share his spotlight",
        close: "Delight in both sides",
      },
      bold: {
        new: "Be bold and charming",
        close: "Be the star they want",
      },
      neutral: {
        new: "Simply be present",
        close: "Share the spotlight quietly",
      },
    },
  },

  mio: {
    dialogue: {
      new: [
        "He looks up from tinkering with something, hands still steady. There's a ready smile for you.",
      ],
      warm: [
        "He sets his work aside immediately, fully present for you—reliable as always.",
      ],
      close: [
        "\"You know you can always count on me, right?\" he says warmly. \"For anything you need.\"",
      ],
    },
    temperamentDialogue: {
      new: [
        "\"Oh! Welcome! Can I get you anything?\"",
      ],
      warm: [
        "\"It's nice seeing you. You know you're always welcome here.\"",
      ],
      close: [
        "\"You've become someone really important to me. I hope you know that.\"",
      ],
    },
    responses: {
      kind: {
        new: "Show appreciation for him",
        close: "Tell him he matters too",
      },
      playful: {
        new: "Share a laugh",
        close: "Make him laugh genuinely",
      },
      bold: {
        new: "Express yourself boldly",
        close: "Be bold enough to need him",
      },
      neutral: {
        new: "Be there for him",
        close: "Sit with him",
      },
    },
  },

  shion: {
    dialogue: {
      new: [
        "A masked bow, a theatrical flourish. \"Welcome to the show.\"",
      ],
      warm: [
        "The mask tilts your way first, before anyone else in the room.",
      ],
      close: [
        "\"For you,\" Shion says, lifting the mask just enough to show a genuine smile.",
      ],
    },
    temperamentDialogue: {
      new: [
        "\"What a delicious expression. I wonder what frightens you?\"",
      ],
      warm: [
        "\"You came back. How... thrilling. I missed that look in your eyes.\"",
      ],
      close: [
        "\"You're mine to protect. My wife.\"",
      ],
    },
    responses: {
      kind: {
        new: "Be careful around him",
        close: "Let him protect you",
      },
      playful: {
        new: "Don't take him seriously",
        close: "Play along with him",
      },
      bold: {
        new: "Challenge him boldly",
        close: "Surrender to him",
      },
      neutral: {
        new: "Observe them carefully",
        close: "Let him watch over you",
      },
    },
  },

  jiro: {
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
      new: [
        "\"You're not qualified for this. Leave.\"",
      ],
      warm: [
        "\"You. Stay for a moment.\"",
      ],
      close: [
        "\"I don't usually make exceptions. But for you... I will.\"",
      ],
    },
    responses: {
      kind: {
        new: "Be patient with him",
        close: "Help him remember what matters",
      },
      playful: {
        new: "Try to lighten the mood",
        close: "Make him laugh",
      },
      bold: {
        new: "Be direct with him",
        close: "Stand firm for him",
      },
      neutral: {
        new: "Give him quiet",
        close: "Be patient with his silence",
      },
    },
  },

  yuri: {
    dialogue: {
      new: [
        "He studies you with clinical precision, already calculating. \"You came back. Good.\"",
      ],
      warm: [
        "His cold demeanor cracks slightly—there's obsession in his eyes now, the drive to save you consuming him.",
      ],
      close: [
        "\"I'll find your cure,\" he says with absolute conviction, \"because I'm the only one capable enough. And you're mine to save.\"",
      ],
    },
    temperamentDialogue: {
      new: [
        "\"A novice stumbles in. How amusing.\"",
      ],
      warm: [
        "\"You again? ...I suppose I don't mind.\"",
      ],
      close: [
        "\"Don't go worrying me like that. I have better things to do than panic over you.\"",
      ],
    },
    responses: {
      kind: {
        new: "Don't take his coldness to heart",
        close: "Show him his care shows",
      },
      playful: {
        new: "Tease him carefully",
        close: "Make him laugh despite himself",
      },
      bold: {
        new: "Challenge him back",
        close: "Match his intensity",
      },
      neutral: {
        new: "Give him space",
        close: "Understand his withdrawal",
      },
    },
  },

  ren: {
    dialogue: {
      new: [
        "He's scrolling through his phone, barely acknowledging you at first. \"Oh. Hey.\"",
      ],
      warm: [
        "He actually puts his phone down when you arrive. There's genuine concern in his gaze now.",
      ],
      close: [
        "\"Senpai... you know I'll always have your back, right?\" he says quietly, protective concern replacing his usual detachment.",
      ],
    },
    temperamentDialogue: {
      new: [
        "\"Huh? Oh, didn't see you there. You lost or something?\"",
      ],
      warm: [
        "\"Oh, it's you. Yeah, I was hoping you'd show up.\"",
      ],
      close: [
        "\"Hey, senpai... I'm really glad you're here. More than you know.\"",
      ],
    },
    responses: {
      kind: {
        new: "Be steady with him",
        close: "Heal what his family broke",
      },
      playful: {
        new: "Be playful around him",
        close: "Make him genuinely smile",
      },
      bold: {
        new: "Be bold with him",
        close: "Fight for him",
      },
      neutral: {
        new: "Let him be",
        close: "Be quiet with him",
      },
    },
  },

  haru: {
    dialogue: {
      new: [
        "There's mischief written all over his face as he assesses you with warm eyes. \"Trouble or destiny?\"",
      ],
      warm: [
        "His whole face lights up when he sees you—genuine delight, the kind that makes his warmth impossible to resist.",
      ],
      close: [
        "\"I love this about you,\" he says genuinely, taking your hand. \"The way you make everything feel like an adventure. Like... like home.\"",
      ],
    },
    temperamentDialogue: {
      new: [
        "\"Well, well! Someone interesting wandered in!\"",
      ],
      warm: [
        "\"Hey, Ojou-chan! Miss me?\"",
      ],
      close: [
        "\"I really like seeing you smile. Can I be honest about that?\"",
      ],
    },
    responses: {
      kind: {
        new: "Appreciate his warmth",
        close: "Show him home is with you",
      },
      playful: {
        new: "Enjoy his charm",
        close: "Match his mischief",
      },
      bold: {
        new: "Be daring with him",
        close: "Match his boldness",
      },
      neutral: {
        new: "Be present",
        close: "Rest with him",
      },
    },
  },

  towa: {
    dialogue: {
      new: [
        "He watches from the shadows, his gaze fixed and unblinking. There's something possessive in how he looks at you.",
      ],
      warm: [
        "He steps into the light when you arrive, like he's been waiting for only you. \"Don't leave,\" he says quietly.",
      ],
      close: [
        "\"I've been waiting every moment since you left,\" he confesses, drawing impossibly close. \"Don't ever leave again. Please.\"",
      ],
    },
    temperamentDialogue: {
      new: [
        "\"...Dandelion?\"",
      ],
      warm: [
        "\"Dandelion. You're here. That's all that matters.\"",
      ],
      close: [
        "\"You're mine. Only mine. Promise me you'll never leave.\"",
      ],
    },
    amOnlyDialogue: {
      new: [
        "~~~!",
      ],
      warm: [
        "~~~! ♫",
      ],
      close: [
        "~~~! ~~~! ♫ ♫",
      ],
    },
    responses: {
      kind: {
        new: "Be very careful with him",
        close: "Accept his possessiveness",
      },
      playful: {
        new: "Make him smile",
        close: "Give him your full attention",
      },
      bold: {
        new: "Stare right back at him",
        close: "Own him completely",
      },
      neutral: {
        new: "Observe them carefully",
        close: "Be his constant",
      },
    },
  },

  edward: {
    dialogue: {
      new: [
        "He greets you with a charming smile, but there's something dangerous beneath the gentleman's facade.",
      ],
      warm: [
        "The fragile act drops for a moment when you're near—you see the predator underneath, and he lets you.",
      ],
      close: [
        "\"I've been waiting lifetimes for someone who could see me like this,\" he says, pulling you close. \"Don't leave me again.\"",
      ],
    },
    temperamentDialogue: {
      new: [
        "\"Oh my, what a lovely lady. Welcome to my home.\"",
      ],
      warm: [
        "\"Lovely lady, I was hoping you'd visit. Come closer.\"",
      ],
      close: [
        "\"You belong right here, next to me. Don't ever leave.\"",
      ],
    },
    responses: {
      kind: {
        new: "Stand firm against his advances",
        close: "Let him get closer",
      },
      playful: {
        new: "Keep him at bay playfully",
        close: "Flirt back with him",
      },
      bold: {
        new: "Meet his gaze without flinching",
        close: "Pull him closer yourself",
      },
      neutral: {
        new: "Stay watchful",
        close: "Let him watch in silence",
      },
    },
  },

  rui: {
    dialogue: {
      new: [
        "He lights up with a radiant smile, practically bouncing with energy. \"Oh wow, look who showed up! You're a sight for sore eyes!\" Behind the brightness, there's a shadow of something darker he's desperately hiding.",
      ],
      warm: [
        "His grin is warm and genuine when he sees you, though you catch the moment his cheerfulness falters—like you're the only thing holding back the darkness.",
      ],
      close: [
        "\"You make me feel alive,\" he says softly, hands hovering near you but never quite touching. \"Like the curse doesn't matter when you're near.\"",
      ],
    },
    temperamentDialogue: {
      new: [
        "\"Oh! Well, well! Lucky me—you wandered in! Come closer, but not too close, yeah? Just... let me look at you.\"",
      ],
      warm: [
        "\"You're back! You know you make everything feel less dark when you're around? It's actually kind of amazing.\"",
      ],
      close: [
        "\"Even with this curse, I'd bear it a thousand times if it meant seeing you smile.\"",
      ],
    },
    responses: {
      kind: {
        new: "Be sincere with him",
        close: "Let him know you need him",
      },
      playful: {
        new: "Share your happiness",
        close: "Let him see your joy",
      },
      bold: {
        new: "Be honest about wanting him",
        close: "Need him without apology",
      },
      neutral: {
        new: "Simply accept it",
        close: "Let him serve in silence",
      },
    },
  },

  lyca: {
    dialogue: {
      new: [
        "He keeps his distance, observing you carefully. There's wariness in his posture, but curiosity flickers in his eyes.",
      ],
      warm: [
        "The guarded distance closes when he recognizes you. A genuine, warm smile breaks through his usual reserve.",
      ],
      close: [
        "\"You're my most important person,\" he says simply, sincerely. \"Your safety, your happiness—that's everything to me.\"",
      ],
    },
    temperamentDialogue: {
      new: [
        "\"Hmm? You're... interesting. What brings you here?\"",
      ],
      warm: [
        "\"You're back. I'm... really happy about that.\"",
      ],
      close: [
        "\"Seeing you safe and happy is the most important thing to me.\"",
      ],
    },
    responses: {
      kind: {
        new: "Be genuinely kind",
        close: "Remind him he's not a monster",
      },
      playful: {
        new: "Be kind and playful",
        close: "Play with his playfulness",
      },
      bold: {
        new: "Be brave",
        close: "Stand with him proudly",
      },
      neutral: {
        new: "Be calm with him",
        close: "Understand his quiet",
      },
    },
  },

  taiga: {
    dialogue: {
      new: [
        "He eyes you with a challenging smirk, cards deftly shuffled in his hands. \"You lost, kitten?\"",
      ],
      warm: [
        "His aggressive posture softens when he sees you're really there. He pulls out a seat beside him without a word.",
      ],
      close: [
        "\"You're the only one I'd ever go all-in for,\" he says roughly, pulling you close. \"Don't make me regret it.\"",
      ],
    },
    temperamentDialogue: {
      new: [
        "\"What are you doing here?\"",
      ],
      warm: [
        "\"...So you came back, kitten?\"",
      ],
      close: [
        "\"Don't you dare go getting hurt. That's MY job to protect you. Gyahaha!\"",
      ],
    },
    responses: {
      kind: {
        new: "Be kind despite his bark",
        close: "See the softness under the snarl",
      },
      playful: {
        new: "Trade insults with him",
        close: "Be the one who can rile him",
      },
      bold: {
        new: "Meet his challenge head-on",
        close: "Go all-in with him",
      },
      neutral: {
        new: "Let him posture",
        close: "Let the bravado run out",
      },
    },
  },

  ritsu: {
    dialogue: {
      new: [
        "He looks up with genuine interest, already assessing your potential. \"Partner, your timing is fortuitous. I could use someone sharp.\"",
      ],
      warm: [
        "His eyes light up when he sees you—he's eager now, ready to collaborate and strategize together.",
      ],
      close: [
        "\"You've become my partner in more ways than just business,\" he says warmly, stepping closer. \"I wouldn't trust the calculation to anyone but you.\"",
      ],
    },
    temperamentDialogue: {
      new: [
        "\"Ah, my new partner. Perfect timing. Let's work through this together.\"",
      ],
      warm: [
        "\"I was hoping you'd come by. We make a good team, don't we?\"",
      ],
      close: [
        "\"You're the only person I trust completely. We can accomplish anything with you by my side.\"",
      ],
    },
    responses: {
      kind: {
        new: "Be logical with him",
        close: "Show him friendship is real",
      },
      playful: {
        new: "Engage his mind playfully",
        close: "Make him smile despite logic",
      },
      bold: {
        new: "Be straightforward",
        close: "Make a bold choice about him",
      },
      neutral: {
        new: "Be logical",
        close: "Understand his logic",
      },
    },
  },

  romeo: {
    dialogue: {
      new: [
        "He's barking orders at the staff, managing every angle of the casino floor. \"HDY wast my time? Quick, put on this dress and work table seven—we need someone sharp out there.\"",
      ],
      warm: [
        "He pauses mid-command when he spots you, actually stepping away from the action to greet you properly. Suddenly you matter more than the operation.",
      ],
      close: [
        "\"You're not just money or status to me,\" he admits, voice uncharacteristically sincere. \"You're everything.\"",
      ],
    },
    temperamentDialogue: {
      new: [
        "\"Perfect timing—I need someone I can trust to manage the VIP section. You in?\"",
      ],
      warm: [
        "\"Oh, you're back! Actually... I'm kind of happy to see you. Don't tell anyone.\"",
      ],
      close: [
        "\"I'd spend all my money on you if you asked. Not that I'd ever admit that normally.\"",
      ],
    },
    responses: {
      kind: {
        new: "Match his sass",
        close: "Know his real worth is you",
      },
      playful: {
        new: "Trade sass with him",
        close: "Match his wit",
      },
      bold: {
        new: "Bet on yourself",
        close: "Know you're worth his money",
      },
      neutral: {
        new: "Stay quiet",
        close: "Let him have this moment",
      },
    },
  },

  benkei: {
    dialogue: {
      new: [
        "He looks up from his work, a little flustered but smiling warmly. \"Oh! H-hello. Do you need help with something?\"",
      ],
      warm: [
        "He gets a bit red in the face when he sees you, but his smile is genuine and eager. \"You came back! Can I help you with anything?\"",
      ],
      close: [
        "\"You're really important to me,\" he says softly, a hint of bashfulness in his voice. \"I'm always happy to help you with anything you need.\"",
      ],
    },
    temperamentDialogue: {
      new: [
        "\"Oh! H-hi! Did you need something? I'm here to help!\"",
      ],
      warm: [
        "\"You're back! I'm really happy to see you. What can I do for you?\"",
      ],
      close: [
        "\"You mean a lot to me. I'd do anything to help you.\"",
      ],
    },
    responses: {
      kind: {
        new: "Trust his wisdom",
        close: "Let him care for you",
      },
      playful: {
        new: "Appreciate his warmth",
        close: "Enjoy his quiet humor",
      },
      bold: {
        new: "Be honest with him",
        close: "Accept his strength",
      },
      neutral: {
        new: "Be quiet",
        close: "Rest with his wisdom",
      },
    },
  },
};
