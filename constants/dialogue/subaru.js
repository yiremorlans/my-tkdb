export default {
  // The level-up DMs (docs/bond-scene-dms.md). Per reference.md, Subaru is
  // reflexively accommodating and apologizes when he thinks he's overstepped —
  // that's one situational tic among several (see his canon voice lines), not
  // the engine of the scene. The real throughline is his stigma: he reads the
  // thoughts left on anything he touches, and an object that belonged to someone
  // lets him recall that person's own memories and feelings. He's ashamed of it
  // — it means reading what people never meant to share — so the romance runs on
  // the inverse: MC deliberately handing him her own things, letting him in,
  // wanting him to know. Each tier turns that involuntary, shameful ability a
  // little more into something given freely, which is what makes the physical
  // intimacy at the top of the ladder cost him something and what makes him
  // reach for it anyway.
  bondScenes: {
    acquaintance: {
      beats: [
        "**{firstName}**: Are you still awake? Nothing's wrong. I wanted to say this while I still had the nerve.",
        "Every time you come by, I'm mid pot of tea with half the steps still to go, and you just wait. You find somewhere to sit and let me finish. You don't sigh or check the time.\n\nI've spent most of my life being someone people are waiting on. I didn't know it could feel like company instead of a delay.\n\n{timesMet} visits now, and I've wanted to say that on every one.",
      ],
      choice: {
        prompt:
          "Sorry. That's a great deal of feeling to hang on a pot of tea. Say something?",
        options: [
          {
            key: "kind",
            label: "Tell him you like the wait",
            style: 3,
            close:
              "*A pause.*\n\nOh.\n\nThen I'll work twice as slowly tomorrow, and you can hold me to it. I just want the evening where you're still there when I straighten up.",
          },
          {
            key: "playful",
            label: "Tease him about the fuss",
            style: 1,
            close:
              "You're laughing at me. That's all right, I rather set that up.\n\nI make the tea properly because that's how I was trained. The part where I dawdle so someone stays longer is new. That one's yours.",
          },
          {
            key: "bold",
            label: "Tell him to leave the tea",
            style: 4,
            close:
              "Leave it? I... all right. Yes.\n\n*The next message takes a while.*\n\nSorry. You said it and I'd set the pot down before I'd thought. I do that. Give me a moment to choose for myself, and I'll tell you: no. I'd like to finish slowly, with you still there when I do.",
          },
        ],
      },
      keepsake: {
        emoji: "🍵",
        line: "A pot of tea made slowly, because someone had stayed to watch it steep.",
      },
    },

    friend: {
      beats: [
        "**{firstName}**: May I tell you something unpleasant about myself? I'd rather you heard it from me.",
        "Everyone thinks I'm kind. I'm not, especially. I'm accommodating, which looks the same from outside and is mostly fear.\n\nAnd I think people are worse than the anomalies. I've read enough of what they leave on things, doorframes, handrails, cups. They put the ugliest parts of themselves down without noticing, and I pick all of it up.\n\nYou answer me with {favResponse} every time and there's never a second thing under it. Do you know how rare that is, for someone who can check?",
      ],
      choice: {
        prompt: "There. Now you know I'm a bit horrible. Say something.",
        options: [
          {
            key: "kind",
            label: "Say that isn't horrible",
            style: 3,
            close:
              "It is a bit.\n\nBut thank you for arguing. Nobody argues with me. They agree with whatever I say about myself, and I've never found that comforting.",
          },
          {
            key: "playful",
            label: "Ask what your doorframe said",
            style: 1,
            close:
              "I'd never...!\n\n...Nothing bad. Nothing at all, which almost never happens. Like putting my hand on clean water.\n\nThat was far too much. Good night.",
          },
          {
            key: "bold",
            label: "Tell him to stop accommodating",
            style: 4,
            close:
              "*A long silence.*\n\nI don't know what I'd be, *he writes.* That's the honest answer. I've been accommodating since I was eight and standing on a stage.\n\nBut you're the first to ask me to find out. I might try. Slowly. Be patient with me.",
          },
        ],
      },
      keepsake: {
        emoji: "🪡",
        line: "The one set of hands that left nothing ugly behind.",
      },
    },

    closeFriend: {
      beats: [
        "**{firstName}**: Are you awake? There's something in the Hotarubi tea room I'd like you to see, tonight. It's the anniversary, and I don't think I can do it alone this year.",
        "*The room is dark. A fan, a comb, and a folded haori are laid out on the low table with a precision that is clearly ritual.*\n\n> These are from the first role I ever danced. I was four. Once a year I hold them and read what's left on them, and it's the only time I've been glad of this stigma.",
        "> I've never brought anyone. I thought it would spoil it. It hasn't.\n\n*He holds the fan out, hesitates, then puts it in your hands anyway.*\n\n> Now there'll be some of you on it, and next year I'll read that too. I've made you part of a very old thing without asking. I'm not sorry.",
      ],
      choice: {
        prompt: "...Say something. My hands are shaking a bit.",
        options: [
          {
            key: "kind",
            label: "Ask about the first dance",
            style: 3,
            close:
              "*He tells you, then shows you: three steps of it in the dark in his socks, stopping halfway, embarrassed and lit up at once.*\n\n> I haven't done that in two years,\n\n*he says.*\n\n> Not for anyone. Not even myself.",
          },
          {
            key: "playful",
            label: "Ask what the fan says now",
            style: 1,
            close:
              "*He goes very red.*\n\n> I'm not telling you.\n\n> It's warm. That's all you're getting, and I'll be thinking about it for a year.",
          },
          {
            key: "bold",
            label: "Take his hand instead",
            style: 4,
            close:
              "*He freezes, the one thing he never lets happen: skin on skin, no glove, nothing between.*\n\n*He doesn't pull away. He closes his eyes, stands very still, and after a long moment says, unsteadily:*\n\n> There's nothing frightening in you at all. I've been so afraid there would be.",
          },
        ],
      },
      keepsake: {
        emoji: "🎴",
        line: "A fan that will carry the memory of your hands for a year.",
      },
    },

    confidant: {
      beats: [
        "**{firstName}**: I know it's late. I've started this message six times and deleted it. The seventh is sending whether I'm ready or not.",
        "They ask when I'm going back to the stage. Every letter, every visit. The hiatus is \"temporary\", and it's been three years of temporary.\n\nThe truth is I stopped being able to do it. A stage is a hundred years of other people's hands on every rope and rail and prop, and it all comes through the moment I touch anything. Somewhere along the way I lost the knack of shutting it out.",
        "So I'm here instead, a kabuki actor who doesn't act, filling the days with the house and other people's errands. Good at making everyone else comfortable, bad at doing it for myself.\n\nI've told nobody. Haku suspects. Zenji would understand, and I can't bear the thought of him being gentle about it.\n\nYou get it because you're the one person I don't have to be anything in front of. That's not a small thing to hand someone. Be careful with it.",
      ],
      choice: {
        prompt:
          "Now. Say something before I talk myself out of having sent it.",
        options: [
          {
            key: "kind",
            label: "Tell him he's allowed to stop",
            style: 3,
            close:
              "*There's no reply for a long time.*\n\nNobody has ever said that to me, *he writes finally.* Not once. Everyone's always been so *encouraging*.\n\nI think I'm going to cry, and I'd rather do it here than anywhere with people in it. Stay a minute?\n\n*You stay all night.*",
          },
          {
            key: "playful",
            label: "Ask if Haku wrote this",
            style: 1,
            close:
              "Absolutely not, this is all me, and now I'm a little offended.\n\n...Though he did talk me out of three endings. He's very patient with me.",
          },
          {
            key: "bold",
            label: "Offer to go with him",
            style: 4,
            close:
              "To a *theater*?\n\n*A long pause.*\n\n...If you were holding the other end of my sleeve, I might manage the door. Not the stage. The door.\n\nThat's more than I've had in three years. Ask me again in spring, and don't let me talk you out of it. I'll try.",
          },
        ],
      },
      keepsake: {
        emoji: "🎭",
        line: "The reason for a three-year hiatus, told to exactly one person.",
      },
    },

    devoted: {
      beats: [
        "**{firstName}**: You left your scarf in the common room. I picked it up without thinking, and... well.",
        "I read it. Not on purpose, it doesn't ask me first.\n\nThere was a great deal of me on it. More than I expected. You've been thinking about me at times when there was no reason to.",
        "I should have put it down. I held it for nearly an hour instead, in an empty room, like a thief.\n\nI've spent my whole life reading what people never meant to tell me and being ashamed of it. This is the first time I haven't been ashamed, and that frightens me more than the reading ever did.",
      ],
      choice: {
        prompt: "So. Am I forgiven, or ought I to be?",
        options: [
          {
            key: "kind",
            label: "Tell him you don't mind",
            style: 3,
            close:
              "You should mind. Everyone minds.\n\n...I'm keeping it until tomorrow, then. Just tonight. Don't ask me why.",
          },
          {
            key: "playful",
            label: "Ask what else it told him",
            style: 1,
            close:
              "Absolutely not.\n\n...It told me you were cold. Which I'd have known by looking at you, so the stigma was no help at all and I've been dramatic for nothing.",
          },
          {
            key: "bold",
            label: "Tell him he read it right",
            style: 4,
            close:
              "*The typing indicator starts and stops for nearly five minutes.*\n\n*Then he's at your door with the scarf in both hands. He doesn't hand it over, he puts it round your neck himself, and doesn't step back after.*\n\n> I read it right,\n\n*he says, barely a whisper.*\n\n> I've never wanted to be right about something so badly.",
          },
        ],
      },
      keepsake: {
        emoji: "🧶",
        line: "A scarf he held for an hour in an empty room.",
      },
    },

    soulbound: {
      beats: [
        "**{firstName}**: I've rehearsed this more than anything I ever rehearsed for the stage, which, given my history, is saying a great deal.",
        "{timesMet} times. I've read every doorframe you've touched in this house, and never once found a bad thought about me. I looked. I want you to know I looked, because it's the least generous thing I've done and you deserve to know it.",
        "I was raised to be watched. Thousands of people, and none of them could see me at all. That's rather the point of the paint.\n\nYou've never seen the paint. Only the boy who fusses and reads doorframes and can't go near a theater, and you keep coming back to *that*. That has never once happened to me.",
        "I love you.\n\nI've kept that on a shelf a long time, telling myself it was improper, or unfair to you, or a burden. Every one of those was a way of not saying it.\n\nSo it's said. Badly rehearsed and entirely honest, and the only thing in this message I'm sure of.",
      ],
      choice: {
        prompt:
          "Take all the time you want. I've been patient for three years about far less important things.",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close:
              "*The reply is just:* Come to the tea room.\n\n*He's standing in the dark with the lights off, and when you take his hands he lets you, both of them, bare: everything you've ever thought about him arriving at once, nothing held back.*\n\n*He makes a small sound and puts his forehead to yours.*\n\n> Oh. You've been saying it all along, haven't you. I just couldn't read it until you let me.",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close:
              "Of course. Truly, of course.\n\nI've spent three years being asked when I'm going back to something I'm not ready for. I'd be the last to put a clock on you.\n\nNothing changes. I'll be in the tea room on Thursdays, making far too much of it. I shan't mention this again unless you do, so you can come and sit with me without a question in the room.\n\n*And he doesn't. Not once. But the fan stays out on the table where it can read your hands, all year.*",
          },
        ],
      },
      keepsake: {
        emoji: "📃",
        line: "The one message he never once rehearsed.",
      },
    },
  },
  dialogue: {
    new: [
      "He looks up from the lantern he's trimming, a quiet warmth in his eyes as he notices you.",
      "He bows before he speaks. It's automatic, and completely sincere.",
      '"I\'ve been working since I was four, so people said I was mature for my age," he says. "But the truth is, I still have a lot to learn."',
      '"Forgive the mannerisms," he says, unprompted. "The stage was my whole childhood. I came out of it a little too formal for ordinary rooms."',
      "He finishes the note he's leaving for Haku first. Duty, then greeting. Always in that order.",
      '"You\'ve caught me just before lunch," he says. "Lyca and I usually eat together. I started out teaching him words for things, and stayed for the company."',
      "He's partway through making a pot of tea when you arrive, and sets out a second cup without being asked.",
    ],
    known: [
      "He greets you by name now, and looks pleased to have gotten it right.",
      "He's stopped putting his gloves on before he takes anything from your hands.",
      "There's a cup already out. He'll say it was poured for no one in particular.",
      "He doesn't call you a guest anymore. It slipped out once, and he let it.",
      "\"I'm sorry I'm so late. The campus is so crowded I can never manage to walk in a straight line. Silly, isn't it?\"",
      '"Lyca used a word today that I only taught him last week, and used it perfectly," he says, quietly delighted. "Sorry. Small thing. It rather made my afternoon."',
    ],
    warm: [
      "His usual composure softens immediately: there's genuine gladness in his expression when he sees you.",
      "He'd saved up three small things to tell you. He leads with the least important, to make it last.",
      '"You\'re just in time," he says, though nothing in particular is happening. Then, catching himself: "...Sorry. That was a strange thing to say, wasn\'t it?"',
      "The paperwork gets set aside faster than his own rules should allow.",
      '"I really am lucky," he says, half to himself. "Surrounded by people this kind. I don\'t say it enough, but I think it constantly."',
    ],
    spark: [
      "The restraint is fraying and he knows you can see it.",
      '"I shouldn\'t want this," he says quietly. "I\'ve stopped being able to talk myself out of it."',
      "His sleeve brushes yours at the gate. He notices, and for once doesn't apologize, or move away.",
      '"You left your glove here on purpose, didn\'t you," he says. "You wanted me to read it."',
    ],
    close: [
      "He lets his shoulders drop. It's the first time all day he's allowed that.",
      '"Don\'t tell the others I stopped working," he says, already sitting down.',
      "He turns your worn keyring over in his hand, reading it, and for once doesn't say sorry.",
      "For once, he lets someone take care of him. It's you. It's only ever you.",
      '"Stay, and I\'ll tell you ghost stories," he says. "A hundred of them summons a spirit. We\'ve got all night to try."',
    ],
    bound: [
      "He finally lets someone hold him. It takes him a long time to stop apologizing for it.",
      "He kisses you at the gate, in full view, and doesn't check who's watching.",
      '"I\'ve been performing my whole life," he says. "With you I\'m just yours."',
      "He falls asleep against you before the tea has even gone cold.",
      "The restraint is gone entirely. What replaced it is overwhelming and very quiet.",
    ],
  },
  dialogueWhen: [
    {
      when: { time: "evening" },
      dialogue: {
        new: [
          '"Ah, a guest. Please, come in out of the dark."',
          "He's bringing the outer lanterns in for the night, and waves you in toward the house.",
          '"The forest changes character after sundown," he says. "Stay close and it stays kind."',
          '"You\'re safe here, even at this hour," he says. "That much I can promise."',
        ],
        known: [
          "He walks you in the long way, as always, naming the forest's night sounds so none of them startle you.",
          '"I do the rounds of the house about now, shutters and lamps. Keep me company while I do?"',
          '"The tea\'s still warm and there\'s no hurry anywhere," he says. "Stay a while."',
        ],
        warm: [
          '"I find myself listening for the gate after dark lately. I wonder why."',
          "There's a cup already poured and a cushion already set on your side of the step.",
          "\"Don't rush off. Lamp, then kettle, and then I'm not needed anywhere else.\"",
        ],
        spark: [
          "He walks you back through the dark and takes the longest possible route.",
        ],
        close: [
          "\"I was hoping... you'd come by tonight,\" he admits quietly, and doesn't look away afterward the way he usually would.",
        ],
      },
    },
  ],
  approachWhen: [
    {
      when: { time: "evening" },
      approach: {
        new: ["Come in out of the dark", "Follow him to the house"],
        known: ["Help him lock up the house"],
        warm: ["Take the cushion he set out"],
      },
    },
  ],
  temperamentDialogue: {
    new: [
      '"Welcome. Forgive the state of the path. I meant to sweep it this morning and lost track of the hour."',
      '"Mind the step, the stones are uneven past the gate."',
      "\"I'm very sorry to have kept you waiting. It's wonderful to see you again.\"",
      '"A visitor? Then let me at least offer you tea."',
      '"You\'re safe here. That much I can promise."',
    ],
    known: [
      '"Welcome back. I hoped that was you at the gate."',
      "\"The tea's fresh. No, please, it's no trouble at all.\"",
      '"I never thought I\'d get the chance to enjoy the lifestyle of a student until I came to Darkwick. Every day truly is fulfilling here."',
      "\"Forgive me, I've only a moment. But I'd rather spend it here.\"",
      '"You\'ve been kind to this house. I notice these things."',
      '"Lyca and I have lunch on the terrace most days. You\'d be welcome, if you ever wanted the company."',
      "\"You've caught me mid pot, actually. Sit down, it'll be ready in a moment.\"",
    ],
    warm: [
      "\"You're here... I'm very glad.\"",
      "\"You think I'm always smiling? Ha ha, I hear that a lot. It just happens when I'm around all of you.\"",
      '"Sit with me a moment? Haku has the house tonight."',
      '"I find myself listening for the gate lately. I wonder why."',
      '"You always come at the right hour. How do you manage that?"',
    ],
    spark: [
      '"Stay. Not for the house. For me. I\'m asking for me."',
      '"I\'ve been careful all day. Let me stop being careful, just for an hour."',
      '"May I walk you back? ...The long way. If you\'d allow it."',
      '"You make it very difficult to be dutiful. I\'ve stopped minding."',
      '"Don\'t look at me like that. I have very little left to hold on to."',
    ],
    close: [
      '"I... I\'ve missed you more than I should admit."',
      '"Stay a while longer. Please. The house can spare me."',
      '"With you, I can set it all down. Just... let me set it down, tonight."',
      "\"I'd carry twice as much if it meant you'd keep coming back.\"",
      '"You are the one thing I never think of as a duty."',
    ],
    bound: [
      '"Stay tonight. Don\'t make me be noble about it."',
      '"I love you. I\'ve loved you since the night of the ghost stories. I should have said sooner."',
      '"Let me put my head here. Just for a moment. ...Thank you."',
      '"Come to bed. The house can see to itself. Everything can wait."',
      "\"I'd give up the house before I'd give up this. Don't tell them I said so.\"",
    ],
  },
  approach: {
    new: [
      "Step through the gate",
      "Return his bow",
      "Accept the tea",
      "Wait while he finishes up",
    ],
    known: [
      "Take the poured cup",
      "Answer at the gate",
      "Spend his moment",
      "Return the bow",
    ],
    warm: [
      "Take the second cup",
      "Sit with him",
      "Ask how he's holding up",
      "Join him on the veranda",
    ],
    spark: [
      "Take the long way",
      "Let him be selfish",
      "Stay for him",
      "Look at him like that",
    ],
    close: [
      "Go sit beside him",
      "Take the work from his hands",
      "Stay till the tea goes cold",
      "Tell him to rest",
    ],
    bound: [
      "Stay tonight",
      "Hold him",
      "Take him to bed",
      "Tell him it can wait",
    ],
  },
  responses: {
    kind: {
      new: [
        "Acknowledge his effort",
        "Thank him for the welcome",
        "Notice how hard he works",
      ],
      spark: [
        "Tell him he's allowed",
        "Let him be selfish",
        "Stay till he straightens up",
      ],
      close: [
        "Help him set down his burden",
        "Tell him he's allowed to rest",
        "Take the broom from him",
      ],
      bound: [
        "Let him put his head down",
        "Say it back",
        "Tell him to stop apologizing",
      ],
    },
    playful: {
      new: [
        "See his softer side",
        "Catch him off script",
        "Tease him about the tea",
      ],
      spark: [
        "Fray the last of it",
        "Take the longest route",
        "Fluster him properly",
      ],
      close: [
        "Make him blush",
        "Talk him into slacking off",
        "Laugh until he does",
      ],
      bound: [
        "Steal him from his rounds",
        "Kiss him where they'll see",
        "Call it an early night",
      ],
    },
    bold: {
      new: [
        "Be direct with him",
        "Say what you came to say",
        "Refuse the polite version",
      ],
      spark: [
        "Tell him to stop holding on",
        "Stay the night talking",
        "Ask him to be selfish",
      ],
      close: [
        "Push past his restraint",
        "Take his hand at the gate",
        "Ask for him, not the house",
      ],
      bound: [
        "Take him to bed",
        "Tell him to stop managing you",
        "Say it first",
      ],
    },
    neutral: {
      new: ["Be gentle", "Let him finish up", "Sit quietly while he works"],
      spark: [
        "Let him keep his restraint",
        "Say goodnight at the gate",
        "Let the evening be quiet",
      ],
      close: [
        "Keep him quiet company",
        "Let him lean, wordlessly",
        "Share the quiet hour",
      ],
      bound: [
        "Let him sleep",
        "Let the house go quiet",
        "Sit with him in the dark",
      ],
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
      '"Have we met before?" **{name}** asks {user}, then apologizes for not being sure.',
      "**{name}** turns to {user} and bows.",
      '{user} says it first, and **{name}** goes a little pink. "Forgive me. I didn\'t expect that."',
    ],
    warm: [
      "{user} calls out, and **{name}**'s polite smile turns into a real one.",
      "**{name}** sets the teapot down a little too quickly the moment {user}'s voice reaches him.",
      "**{name}** had been hoping it was {user}.",
    ],
    spark: [
      "**{name}** hears his name in {user}'s voice and loses his place.",
      '"Sorry, I\'m staring." **{name}** says it to {user} and carries right on staring.',
      "{user} got there first, and **{name}** is quietly undone.",
    ],
    close: [
      "**{name}** stops apologizing mid-sentence when he sees it's {user}.",
      "{user} presses something personal into **{name}**'s hand on purpose. He reads it the way only {user} is allowed to now, and forgets to look sorry.",
      "{user} calls, and whatever **{name}** was carrying gets set down.",
    ],
    bound: [
      "**{name}** goes straight to {user} the moment he hears them.",
      "**{name}** reaches {user} and doesn't check who's watching.",
      "{user} says the name, and **{name}** doesn't apologize for a single part of it.",
    ],
  },
};
