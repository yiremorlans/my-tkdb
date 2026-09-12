export default {
  // The level-up DMs (docs/bond-scene-dms.md). Alan is not good with words and
  // these do not pretend otherwise — his beats are the shortest in the game, and
  // the intimacy is in the fact of a man who says four words a day sitting there
  // typing at all. What he cannot write, he does instead.
  //
  // Per reference.md's "## Bond Scenes" notes, Alan's typed messages use no full
  // stops and never put two sentences in one line — each thought gets its own
  // line break. Narration and anything he says out loud (the `> ` lines) keep
  // normal punctuation.
  //
  // The typos are deliberate. He is canonically hopeless with a phone (he has to
  // ask how to add someone on WickChat), so roughly one line a scene carries a
  // dropped apostrophe, a missing full stop, or a mistype he corrects on the next
  // line. Do not spellcheck them out. They only ever appear in text he is typing
  // — never in narration, and never in a line he says out loud.
  bondScenes: {
    acquaintance: {
      beats: [
        "**{firstName}**: Its Alan\n\n*That's the whole message. It sits there for eleven minutes.*",
        "Not good at this\n\n*Another gap.*\n\nYouve been around {timesMet} times now\n\nBandana says I shoulda said something by now\n\nHe's right\n\nNot telling him that\n\nGlad you keep coming by\n\nShoulda said it sooner",
      ],
      choice: {
        prompt: "That's it",
        options: [
          {
            key: "kind",
            label: "Tell him it's a good start",
            style: 3,
            close:
              "…Yeah\n\n*A minute later:* Thnaks\n\n*Then:* \\*Thanks\n\n*That's the last one.*",
          },
          {
            key: "playful",
            label: "Ask if that took long",
            style: 1,
            close:
              "40 minutes\n\n*No defensiveness in it at all. Just the number, handed over.*\n\nWasnt so bad",
          },
          {
            key: "bold",
            label: "Tell him to say more",
            style: 4,
            close:
              "*A long silence.*\n\nGarage\n\nTomorrow, after six\n\n*A pause.* Easier out loud\n\nLittle bit",
          },
        ],
      },
      keepsake: {
        emoji: "📱",
        line: "The eleven minutes between his name and what he'd meant to say.",
      },
    },

    friend: {
      beats: [
        "**{firstName}**: Noticed something",
        "I run missions the same way every time\n\nCount everyone in, check it twice\n\nDone that since I made captain\n\nStopped checking on you a while back\n\nJust count on you and move on\n\nDont know when that started\n\nYou give me {favResponse} every time\n\nQuit bracing for it to change\n\nGuess that's what reliable means to me",
      ],
      choice: {
        prompt: "Don't need anything back",
        options: [
          {
            key: "kind",
            label: "Say you plan around him too",
            style: 3,
            close:
              "…Yeah\n\n*A long pause.*\n\nGood\n\nWasn't sure it went both ways",
          },
          {
            key: "playful",
            label: "Ask if you get a vote",
            style: 1,
            close:
              "Didn't think to ask\n\nWant a vote now\n\nStill happening either way",
          },
          {
            key: "bold",
            label: "Ask if he'd notice you gone",
            style: 4,
            close: "Yeah\n\nEvery time\n\nDont test it",
          },
        ],
      },
      keepsake: {
        emoji: "📋",
        line: "The one name on his roster he stopped double-checking.",
      },
    },

    closeFriend: {
      beats: [
        "**{firstName}**: You good",
        "Not asking as your captain\n\nAsking as me\n\nThat thing went straight for you back there\n\nDidnt feel like a choice\n\nJust moved\n\nStill thinking about it now though",
        "Known you since {sinceMet}\n\nNever once done the math on how close that was till today\n\nDidn't like the answer\n\nGlad this is the version where you're fine",
      ],
      choice: {
        prompt: "Anyway\n\nSay something",
        options: [
          {
            key: "kind",
            label: "Thank him for the two seconds",
            style: 3,
            close:
              "…Nothing to thank me for\n\nWasn't gonna stand there and watch\n\n…Still glad you're okay",
          },
          {
            key: "playful",
            label: "Ask if he does that math often",
            style: 1,
            close:
              "Only when it's you\n\nUsually don't bother counting\n\nGonna start",
          },
          {
            key: "bold",
            label: "Tell him not to scare you",
            style: 4,
            close:
              "Fair\n\nWasn't planning on it happening again\n\nGonna keep you further back next time\n\nWorking on it",
          },
        ],
      },
      keepsake: {
        emoji: "🛡️",
        line: "The two seconds he never had to think about, and never once called brave.",
      },
    },

    confidant: {
      beats: [
        "*It comes through at four in the morning.*\n\n**{firstName}**: You awake",
        "Bad one tonight\n\nDont need anything\n\nJust didn't want to sit with it on my own and you were the only name I could stand to look at",
        "They say I killed someone\n\nYou've heard it\n\nEveryone has\n\nNobody's ever asked me\n\nTwo years, nobody's asked\n\nThey just decide, and then they're careful around me, and I let them, because careful's easier than the conversation\n\nYou've never asked either\n\nDifference is I don't think you're being careful\n\nI think you're waiting on me\n\nBeen sitting with that a while",
      ],
      choice: {
        prompt: "Ask me\n\nOr don't\n\nEither's fine\n\nI mean that",
        options: [
          {
            key: "kind",
            label: "Say you'll wait for it",
            style: 3,
            close:
              "*Nothing for six minutes.*\n\n…Yeah\n\nOkay\n\nNot tonight\n\nBut it'll be you\n\nWanted you to know that much",
          },
          {
            key: "playful",
            label: "Say you'd already decided",
            style: 1,
            close:
              "Decided what\n\n*You tell him.*\n\n…Huh\n\n*A long gap.* Most people decide the other way\n\nYou went and did it without the facts, same as them\n\nBothers me a lot less than it should",
          },
          {
            key: "bold",
            label: "Ask him straight out",
            style: 4,
            close:
              "*The typing indicator runs for almost ten minutes and produces this.*\n\nEveryone who hears it decides. One way or the other. Then they're careful around me\n\nYou haven't decided. Two years\n\nNot handing you the answer just to watch which way you go. Not yet\n\n*Then:* You still there\n\n*You say yes. He doesn't answer. The read receipt just sits there, timestamped, until the sun comes up.*",
          },
        ],
      },
      keepsake: {
        emoji: "📲",
        line: "A read receipt, timestamped, that never got a reply before sunrise.",
      },
    },

    devoted: {
      beats: [
        "**{firstName}**: Dont go out tonight",
        "*You ask why. It takes him a while.*\n\nBecause I'd have to come find you, and I'd have to use it, and I've got a rule about using it\n\nRule's held three years\n\nFigure it'd last about four seconds where you're concerned\n\nThat scares me more than whatever's in the corridor does",
        "Only ever told one person what the rule is\n\nOnly if someone's about to die\n\nLast resort, nothing before it\n\nYou've gone and made yourself the last resort\n\nDon't know when\n\nNobody asked me about it first\n\nIncluding me",
      ],
      choice: {
        prompt: "So stay in\n\nPlease",
        options: [
          {
            key: "kind",
            label: "Tell him you'll stay in",
            style: 3,
            close:
              "Good\n\n*Then, twenty minutes later, a photo taken from outside your building: his car, parked, engine off.*\n\nNot coming up\n\nJust gonna be here a while\n\n*It's still there in the morning.*",
          },
          {
            key: "playful",
            label: "Ask if he's on the doorstep",
            style: 1,
            close:
              "No\n\n*A pause.*\n\nYes\n\nBeen out here an hour\n\nDon't come down, it's freezing and I'll just tell you to go back up",
          },
          {
            key: "bold",
            label: "Tell him to come up instead",
            style: 4,
            close:
              "*He comes up. He stands in the doorway without taking his jacket off, like leaving is still an option he's keeping open.*\n\n*Then he puts one hand flat against your cheek, careful, the way you'd hold something you were scared of breaking, and closes his eyes.*\n\n> Not good with words.\n\n*he says.*\n\n> This is the whole sentence.",
          },
        ],
      },
      keepsake: {
        emoji: "🚗",
        line: "A car parked outside all night with the engine off.",
      },
    },

    soulbound: {
      beats: [
        "**{firstName}**: Going to try and get this right\n\nMight take me a minute",
        "{timesMet} times you've turned up\n\nNever once because you needed something off me\n\nTook me about half of those to quit waiting for the ask",
        "I'm not a safe thing to be near\n\nThat's not me being modest\n\nI've had to be told to stop before\n\nBandana's seen it\n\nLeo's seen it\n\nNeither of them looks at me the same way after\n\nYou've seen it too\n\nYou came back the next day like nothing happened\n\nThen the day after that",
        "So here it is\n\nOnly doing this once\n\nI love you\n\nBeen true a long time\n\nWasnt going to say it, because saying it makes it yours to carry and I didn't want to put that on you\n\nPutting it on you anyway\n\n…Sorry",
      ],
      choice: {
        prompt:
          "Take your time\n\nI'm good at waiting\n\nHad a lot of practice",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close:
              "*Nothing comes back. Nothing for so long you think the phone's died.*\n\n*Then there's an engine outside, and then there's him: no jacket, hair wrecked, clearly not having stopped to think about a single part of it.*\n\n*He doesn't say anything. He just picks you up off the step and holds on, and it's the first time you've ever seen him smile without trying to hide it.*",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close:
              "That's fine\n\n*Two words, straight back, no wobble in them.*\n\nWasn't asking for an answer\n\nWas just done not saying it\n\nGarage is open\n\nSame as always\n\nCome by whenever\n\n*And it is, and he never brings it up again, but the passenger seat gets finished that month, and he never mentions that either.*",
          },
        ],
      },
      keepsake: {
        emoji: "💺",
        line: "The passenger seat he'd been building for a month without saying so.",
      },
    },
  },
  dialogue: {
    new: [
      'Grease-stained and worn, he looks you over once. "Get back. It\'s dangerous."',
      "He doesn't stop working. He just moves the toolbox so you won't trip over it.",
      "Nobody else in the garage stands this close to him. You haven't learned why yet.",
      '"Don\'t touch that," he says flatly. "It\'s hot." That\'s the whole greeting.',
      "He's holding a campus map the wrong way up and won't admit he's lost. \"...What do you want?\"",
    ],
    known: [
      "He steers you clear of the loose floor panel before you even notice it's there.",
      "He grunts once in your direction. Two weeks ago he didn't do that.",
      "The toolbox is already out of your path before you arrive. He still checks.",
      '"Looks like we\'ve got another mission order," he says. "Rest while you can. Next one\'s a long one."',
      "\"Hand me that.\" It's the first thing he's ever asked you for.",
      "He shoves a rag your way before you've noticed the grease on your hands.",
      '"You\'re early," he says. Not a complaint.',
      "He still tells you to stay clear of the bikes while they're up on the lift. Just gentler about it now.",
      "He's started leaving the garage door unlocked before you even get there.",
      "He starts leaving the spare gloves out in your size. Never brings it up.",
      "He doesn't send you on the easy jobs anymore. Figures you can handle harder ones.",
      "He waves off Leo's teasing about you without looking up from his work.",
      "He tells you when the weather's about to turn before you've checked. Force of habit, maybe.",
    ],
    // Pool sizes track the affinity width of the level(s) they cover (see
    // RELATIONSHIP_LEVELS / DIALOGUE_TIER_BY_LEVEL in constants/game.js) —
    // roughly 1 line per POOL_POINTS_PER_LINE affinity points, so a wider band
    // doesn't repeat more often than a narrow one. known=55 wide → 13, warm=75
    // wide → 18 at the current POOL_POINTS_PER_LINE of 4.
    warm: [
      "He works beside you in steady silence, a quiet understanding growing between you.",
      "He hands you a rag without being asked. Somehow that means something.",
      "He's left the second stool out again. He's never once mentioned it.",
      '"You eat today?" he asks, wiping his hands. It\'s the third time this week.',
      "The garage radio is on. He turned it on because you like it. He won't say so.",
      "He hands you the mission file before you've even reached for it, like waiting was never the plan.",
      "He laughs, short and surprised at himself. He doesn't do that often.",
      "He steps between you and Leo without a word, like it's reflex now.",
      "He says your name under his breath when a job's going sideways. Doesn't notice he does it.",
      "He splits his lunch in half before you've said you're hungry.",
      "He's memorized which drink you always grab from the vending machine.",
      "He doesn't rush you out of the garage anymore, even when he's closing up.",
      "He starts fixing whatever's wrong with your things before you mention it, like it's not on purpose.",
      "He remembers exactly how you take your coffee and just makes it that way now.",
      "Other housemates have started asking him where you are instead of asking around.",
      "He tries a joke. It lands badly. He tries again anyway.",
      "He's stopped correcting people who assume you two are a pair.",
      "The captain's log has a line in it now that isn't about missions. He never shows you which one.",
    ],
    spark: [
      "He wipes his hands twice before he touches you. He touches you anyway.",
      "He's careful with you in a way he isn't careful with anything else.",
      "The silence between you has stopped being comfortable and started being loaded.",
      "He tucks your hair back with grease-stained fingers and says nothing about it.",
      '"...Come here," he says. It takes him a long time to get those two words out.',
    ],
    close: [
      '"I keep my head better with you around," he says, low, like a confession. "Thank you."',
      "He stops working entirely. For him, that's practically a declaration.",
      "He puts his jacket over your shoulders before you've admitted you're cold.",
      '"Stay a while," he says. Three words from him weigh more than most speeches.',
      "The tired in his shoulders eases the moment you sit down beside him.",
    ],
    bound: [
      "He sleeps through the night now. He knows why. He'll never say it out loud.",
      "His hands are rough and careful and everywhere, and he still doesn't speak.",
      "He pulls you into his lap in the quiet of the garage like it's nothing. It isn't.",
      '"...Love you," he says into your hair, so quietly it\'s almost deniable.',
      "He's stopped washing the grease off before he touches you. You told him not to bother.",
    ],
  },
  temperamentDialogue: {
    new: [
      '"Get back. Don\'t want to hurt you."',
      '"Watch your step. Half this floor\'s sharp."',
      '"...What do you want?"',
      '"Ask anyone. They\'ll tell you to stay clear of me."',
      '"...Hm. You\'re still standing there."',
    ],
    known: [
      '"...You again. Fine."',
      '"Hand me the eight-mil. It\'s the one that looks like the others."',
      "\"You're not in the way. That's rare.\"",
      '"Careful. Meant that."',
      "\"Don't stand there. Sit, if you're staying.\"",
      '"Watch the floor. Not everyone remembers where the oil is."',
      '"...Still here. Good."',
      '"Ask, if you\'re gonna hover. Faster than guessing."',
      '"Door\'s open. Wipe your feet."',
      '"Got gloves that\'ll fit. Wear them."',
      '"Leo talks too much. Ignore him."',
      '"You can handle the harder one."',
      "\"Storm's coming. Don't just stand there.\"",
    ],
    warm: [
      "\"I'm glad you're here. Really.\"",
      '"Sit. I\'m almost done."',
      '"You came back. Good."',
      "\"Lunch? Huh. I forgot to eat. ...I don't eat in the cafeteria. Portions aren't big enough. That's the only reason.\"",
      '"Long day. Yours or mine, doesn\'t matter. Sit down."',
      "\"Hungry? Say so. I'll split what I've got.\"",
      '"Sho give you trouble? Point him out."',
      '"Didn\'t expect you today. Not complaining."',
      '"You look tired. Sit."',
      '"Don\'t mention the lunch thing to Bandana."',
      '"Stay if you want. Door\'s open either way."',
      '"...You again. Good, this time."',
      '"Riding somewhere? I\'ll drop you first."',
      "\"Coffee's how you like it. Don't make it weird.\"",
      '"They keep asking where you are. Tell them yourself next time."',
      '"...That joke landed wrong. Give me another shot."',
      '"Let them think what they want. Not correcting it."',
      '"Wrote something in the log today. Not mission stuff. Not telling you which."',
    ],
    spark: [
      '"Come here. Closer than that."',
      "\"I'm no good at saying it. You'll have to read it off me.\"",
      '"Hold still. Got oil on your cheek. ...There. Got it."',
      '"You keep standing that close, I\'m gonna do something about it."',
      "\"Don't go home yet. That's all. That's the whole ask.\"",
    ],
    close: [
      "\"Most of what sticks with me, I'd rather forget. You're not on that list. Stay.\"",
      "\"I don't sleep much. It's easier when I know you're all right.\"",
      '"Come here. Let me look at you."',
      '"Whatever it is, you tell me first. I\'ll handle it."',
      '"I\'m not good with words. You already know what I mean."',
    ],
    bound: [
      '"Come here. Don\'t need a reason anymore, do I."',
      '"Stay. Whole night. I sleep better."',
      '"...Love you. Don\'t make me repeat it, I barely got it out."',
      '"Sit here. On me. Yeah. Like that."',
      '"I don\'t say much. Never had to, with you."',
    ],
  },
  approach: {
    new: [
      "Step over the toolbox",
      "Stay out of his way",
      "Ask what he's building",
      "Wait for the engine to stop",
    ],
    known: [
      "Hand him the spanner",
      "Sit, if you're staying",
      "Stay out from underfoot",
      "Ask what it is",
    ],
    warm: [
      "Take the second stool",
      "Pick up the spanner",
      "Work beside him",
      "Break the quiet",
    ],
    spark: ["Come here", "Hold still", "Stay a bit longer", "Read it off him"],
    close: [
      "Sit down beside him",
      "Take his hands",
      "Tell him to rest",
      "Stay a while",
    ],
    bound: [
      "Come here",
      "Stay the whole night",
      "Sit with him",
      "Say it for him",
    ],
  },
  responses: {
    kind: {
      new: [
        "Appreciate his honesty",
        "Thank him for the warning",
        "Ask if he's eaten",
      ],
      spark: [
        "Let him be careful with you",
        "Read it off him",
        "Cover his hands with yours",
      ],
      close: [
        "Accept what he's done for you",
        "Tell him he can put it down",
        "Let him look after you",
      ],
      bound: [
        "Say it back for him",
        "Stay the whole night",
        "Let him not speak",
      ],
    },
    playful: {
      new: [
        "Accept his humor",
        "Touch the thing he said not to",
        "Answer his grunt with a grin",
      ],
      spark: [
        "Get oil back on him",
        "Stand closer on purpose",
        "Make him say it",
      ],
      close: ["Get him laughing", "Steal his jacket", "Talk until he gives in"],
      bound: [
        "Make him repeat it",
        "Get grease on him deliberately",
        "Steal his jacket again",
      ],
    },
    bold: {
      new: [
        "Stand your ground",
        "Tell him you're staying",
        "Say you can handle it",
      ],
      spark: [
        "Do something about it",
        "Close the distance first",
        "Tell him not to be careful",
      ],
      close: [
        "Trust his protection",
        "Tell him he isn't alone",
        "Ask him to lean on you",
      ],
      bound: [
        "Climb into his lap",
        "Say it first",
        "Tell him to leave the grease",
      ],
    },
    neutral: {
      new: ["Be straightforward", "Work in silence", "Let him finish"],
      spark: ["Let the silence sit", "Step back", "Say nothing, stay anyway"],
      close: [
        "Understand his quiet",
        "Sit through the long pause",
        "Match his silence",
      ],
      bound: ["Let him sleep", "Sit in the quiet", "Say nothing at all"],
    },
  },
  // The /call reveal lines for this character, keyed by the register in
  // WINNER_LINE_BUCKETS (constants/publicEncounters.js). Picked from at random
  // like the dialogue; {user} is the winner's mention and {name} their full
  // name, and the embed's winner line is the only place the reveal names
  // either of them. A register left out here falls back to the generic
  // WINNER_LINES pool.
  winnerLines: {
    new: [
      '**{name}** looks {user} over once. "...Yeah. That\'s me."',
      "**{name}** had been at that corner a while, working out which way it went. {user} named him before he managed it.",
      '"Careful." **{name}** moves something sharp out of {user}\'s way before he says anything else.',
    ],
    warm: [
      "{user} calls out, and **{name}** stops walking.",
      "{user} says the name, and **{name}** turns, wiping his hands on a rag.",
      '**{name}** grunts. {user} has learned to hear "good" in it.',
    ],
    spark: [
      "**{name}** turns at {user}'s voice and takes a second too long to look away.",
      '"You came looking." **{name}** says it flat to {user}, and stays put.',
      "**{name}** doesn't say anything when {user} reaches him. He tips his head toward the quiet end of the lot and waits.",
    ],
    close: [
      "**{name}** was already walking {user}'s way before the name finished.",
      "{user} calls, and **{name}** puts a hand at their back, steering them out of the crowd.",
      "**{name}** says nothing. He stays where {user} can reach him.",
    ],
    bound: [
      '"Come here. Don\'t need a reason anymore, do I." **{name}** says it low, only to {user}.',
      "**{name}** hears {user}, and his shoulders finally come down.",
      "**{name}** crosses the lot to {user} without once checking which way he's going.",
    ],
  },
};
