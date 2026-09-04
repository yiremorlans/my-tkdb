export default {
  // The level-up DMs (docs/bond-scene-dms.md). Per reference.md, Subaru is
  // reflexively accommodating and apologizes when he thinks he's overstepped —
  // that's one situational tic among several (see his canon voice lines), not
  // the engine of the scene. The real throughline is his stigma: it reads the
  // thoughts left on anything he touches, so touch is never neutral for him —
  // which is what makes the physical intimacy at the top of the ladder cost him
  // something, and what makes him reach for it anyway.
  bondScenes: {
    acquaintance: {
      beats: [
        "**{firstName}**: \"Is it all right that I'm messaging you like this? Do say if it's an intrusion. I'd rather know now than wonder about it all evening.\"",
        "\"I wanted to say thank you properly and I kept not managing it in person. You've been round {timesMet} times now and every time I've had a whole sentence ready and then said something about the weather instead.\"\n\n\"So this is the sentence. You never call me Captain. Everyone calls me Captain and I have to smile and let it stand each time, because I'm not one, not really. I'm a figurehead, whatever the sheet says.\"\n\n\"You just use my name. It's a small thing. It's been the nicest part of my week for several weeks.\"",
      ],
      choice: {
        prompt: "\"...That was rather a lot at once, wasn't it. Tell me if it was too much.\"",
        options: [
          {
            key: "kind",
            label: "Say his name back",
            style: 3,
            close: "There's a pause.\n\n\"Oh.\"\n\nThen, after a moment: \"That's... yes. That. Thank you. I don't think I'll manage much composure for the rest of the evening.\"",
          },
          {
            key: "playful",
            label: "Ask about the weather",
            style: 1,
            close: "\"...You're teasing me.\"\n\n\"That's all right. I don't mind it from you. Actually I've noticed I don't mind quite a lot of things from you, which is a whole separate thing I'm not going to examine tonight.\"",
          },
          {
            key: "bold",
            label: "Tell him he is the captain",
            style: 4,
            close: "\"Please don't.\"\n\nThen, more gently: \"That came out sharper than I meant it. It's just that when people say it, I have to be it, and for about ten minutes in this conversation I wasn't having to be anything.\"\n\n\"...Could we go back to that part?\"",
          },
        ],
      },
      keepsake: {
        emoji: "🍵",
        line: "Ten minutes of not having to be the captain.",
      },
    },

    friend: {
      beats: [
        '**{firstName}**: "May I tell you something slightly unpleasant about myself? I\'d rather you heard it from me."',
        "\"Everyone thinks I'm kind. I'm not especially. I'm accommodating, which looks the same from outside and is mostly fear.\"\n\n\"And the truth is I think people are worse than the anomalies. I've read enough of what they leave on things. Doorframes, handrails, cups. People put the ugliest parts of themselves down without noticing and I pick them all up.\"\n\n\"You answer me with {favResponse} every time and it never once has a second thing under it. Do you know how rare that is, for someone who can check?\"",
      ],
      choice: {
        prompt: "\"There. Now you know I'm a bit horrible. Say something.\"",
        options: [
          {
            key: "kind",
            label: "Say that isn't horrible",
            style: 3,
            close: "\"It is a bit.\"\n\nA pause.\n\n\"But thank you for arguing. Nobody argues with me. They agree with whatever I've said about myself, and I've never once found that comforting.\"",
          },
          {
            key: "playful",
            label: "Ask what your doorframe said",
            style: 1,
            close: "\"I'd never...!\"\n\n\"...Nothing bad. Nothing at all, actually, which almost never happens. It was like putting my hand on clean water.\"\n\n\"That was far too much. Good night.\"",
          },
          {
            key: "bold",
            label: "Tell him to stop accommodating",
            style: 4,
            close: "A long silence.\n\n\"I don't know what I'd be,\" he writes. \"That's the honest answer. I've been accommodating since I was eight years old and standing on a stage.\"\n\n\"But you're the first person who's asked to find out. I might try. Slowly. Please be patient with me.\"",
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
        "**{firstName}**: \"Are you awake? There's something in the Hotarubi music room I'd like you to see, and it has to be tonight. It's the anniversary and I don't think I can do it on my own this year.\"",
        "The room is dark. He's laid out a fan, a comb, and a folded haori on the low table, arranged with a precision that is clearly ritual.\n\n\"These were my grandmother's. She taught me the first dance I ever performed. I hold them once a year and I read what's left on them, and it's the only time I've ever been glad of this stigma.\"",
        "\"I've never brought anyone. It felt like it would spoil it. It hasn't.\"\n\nHe holds the fan out to you, then hesitates, then puts it in your hands anyway.\n\n\"There. Now there'll be some of you on it, and next year I'll read that too. I've just made you part of a very old thing and I didn't ask first. I'm not sorry, which is new for me.\"",
      ],
      choice: {
        prompt: "\"...Say something. My hands are shaking a bit.\"",
        options: [
          {
            key: "kind",
            label: "Ask about the first dance",
            style: 3,
            close: "He tells you, and then he shows you: three steps of it in the dark in his socks, and stops halfway, embarrassed and lit up all at once.\n\n\"I haven't done that in two years,\" he says. \"Not for anyone. Not even for myself.\"",
          },
          {
            key: "playful",
            label: "Ask what the fan says now",
            style: 1,
            close: "He goes very red.\n\n\"I'm not telling you.\"\n\nA pause.\n\n\"It's warm. That's all you're getting. It's warm and I'm going to be thinking about it for a year.\"",
          },
          {
            key: "bold",
            label: "Take his hand instead",
            style: 4,
            close: "He freezes completely, the one thing he never lets happen, skin on skin, no glove, nothing between.\n\nThen he doesn't pull away. He closes his eyes and stands very still, and after a long moment he says, unsteadily: \"There's nothing frightening in you at all. I've been so afraid there would be.\"",
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
        "**{firstName}**: \"I know it's late. I've started this message six times and deleted it, and the seventh one is going to go whether I'm ready or not.\"",
        "\"They ask when I'm going back to the stage. Every letter, every visit. The hiatus is 'temporary'. It's been three years of temporary.\"\n\n\"I can't tell them the truth, which is that the last time I stood in the wings I touched the curtain rope and read everything the man before me had left on it, and I have not been able to go near a theater since.\"",
        "\"So I'm here being a captain I'm not, and a kabuki actor who doesn't act, and rather good, I'm told, at making everyone else comfortable and rather bad at ever doing the same for myself.\"\n\n\"And I have told exactly nobody. Haku suspects. Zenji would understand and I can't bear the idea of him being gentle about it.\"\n\n\"You get it because you're the only person I don't have to be anything in front of. That's not a small thing to hand somebody. Please be careful with it.\"",
      ],
      choice: {
        prompt: "\"Now. Please say something before I talk myself out of having sent any of this.\"",
        options: [
          {
            key: "kind",
            label: "Tell him he's allowed to stop",
            style: 3,
            close: "There's no reply for a long time.\n\n\"Nobody has ever said that to me,\" he writes finally. \"Not once, in twenty years. Everyone's always been so *encouraging*.\"\n\n\"I think I'm going to cry, and I'd rather do that here than anywhere with people in it. Stay a minute?\"\n\nYou stay all night.",
          },
          {
            key: "playful",
            label: "Ask if Haku wrote this",
            style: 1,
            close: "\"Absolutely not, this is all me, and now I'm a little offended.\"\n\nA pause.\n\n\"...Though he did talk me out of three different endings. He's very patient with me.\"",
          },
          {
            key: "bold",
            label: "Offer to go with him",
            style: 4,
            close: "\"To a *theater*?\"\n\nA long pause.\n\n\"...If you were holding the other end of my sleeve, I might manage the door. Not the stage. The door.\"\n\n\"That's more than I've had in three years. Ask me again in the spring, and don't let me talk you out of it, because I will absolutely try.\"",
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
        '**{firstName}**: "You left your scarf in the common room. I picked it up without thinking, and... well."',
        "\"I read it. Not on purpose. That's the whole trouble with this thing, it doesn't ask me first.\"\n\n\"There was a great deal of me on it. Rather more than I was expecting. You've been thinking about me at times when there was no reason to be thinking about me at all.\"",
        "\"I should have put it down the moment I realized. I held onto it for nearly an hour instead, in an empty room, like a thief.\"\n\n\"I've spent my whole life reading things people never meant to tell me and being ashamed of it. This is the first time I haven't been ashamed, and that frightens me more than the reading ever did.\"",
      ],
      choice: {
        prompt: "\"So. Am I forgiven, or ought I to be?\"",
        options: [
          {
            key: "kind",
            label: "Tell him you don't mind",
            style: 3,
            close: "\"You should mind. Everyone minds.\"\n\nA pause.\n\n\"...I'm keeping it until tomorrow, then. Just tonight. Please don't ask me to explain why.\"",
          },
          {
            key: "playful",
            label: "Ask what else it told him",
            style: 1,
            close: "\"Absolutely not.\"\n\n\"...It told me you were cold. Which I'd have known if I'd simply looked at you, so really the stigma was no help at all and I've been dramatic for nothing.\"",
          },
          {
            key: "bold",
            label: "Tell him he read it right",
            style: 4,
            close: "The typing indicator starts and stops for nearly five minutes.\n\nThen he's at your door with the scarf in both hands, and he doesn't hand it over. He puts it round your neck himself, very carefully, and doesn't step back afterwards.\n\n\"I read it right,\" he says, barely above a whisper. \"I've never once wanted to be right about something so badly.\"",
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
        "**{firstName}**: \"I've rehearsed this more than I've ever rehearsed anything for the stage, which given my history is saying a great deal.\"",
        "\"{timesMet} times. I've read every doorframe you've touched in this house and I have never once found a bad thought about me on any of them, and I have looked. I want you to know I looked, because it's the least generous thing I've ever done and you deserve to know I did it.\"",
        "\"I was raised to be watched. Thousands of people, and none of them could see me at all. That's rather the point of the paint.\"\n\n\"You've never seen the paint. You've had nothing but the boy who fusses and reads doorframes and can't go near a theater, and you keep coming back to *that*, which I have never in my life had happen.\"",
        "\"I love you.\"\n\n\"I've held that on a shelf for a very long time and told myself it was inappropriate, or unfair to you, or that I'd be a burden, and every single one of those was a way of not saying it.\"\n\n\"So it's said. Badly rehearsed and entirely honest, and it's the only thing about this message I'm sure of.\"",
      ],
      choice: {
        prompt: "\"Take all the time you want. I've been patient for three years about far less important things.\"",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close: "The reply is just: \"Come to the music room.\"\n\nHe's standing in the middle of it with the lights off, and when you take his hands he lets you, both of them, bare: everything you have ever thought about him arriving at once, all of it, nothing held back.\n\nHe makes a small sound and puts his forehead against yours.\n\n\"Oh,\" he says. \"Oh, I see. You've been saying it all along, haven't you. I just couldn't read it until you let me.\"",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close: "\"Of course. Truly, of course.\"\n\n\"I've spent three years being asked when I'm going back to something I'm not ready for, so I would be the very last person to put a clock on you.\"\n\n\"Nothing changes. I'll still be in the music room on Thursdays. I'll still make far too much tea. And I shall not mention this again unless you do, not out of pride, but because I'd like you to be able to come and sit with me without a question in the room.\"\n\nAnd he doesn't. Not once. But the fan stays out on the table where it can read your hands, all year.",
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
      "He looks up from tending the lanterns, a quiet warmth in his eyes as he notices you.",
      "He bows before he speaks. It's automatic, and completely sincere.",
      '"I\'ve been working since I was four, so people said I was mature for my age," he says. "But the truth is, I still have a lot to learn."',
      '"Forgive the mannerisms," he says, unprompted. "The stage was my whole childhood. People say I turned out a little peculiar. ...It bothers you too, doesn\'t it?"',
      "He finishes the row of lanterns first. Duty, then greeting. Always in that order.",
    ],
    known: [
      "He greets you by name now, and looks pleased to have gotten it right.",
      "He's stopped apologizing for the state of the grounds when you arrive.",
      "There's a cup already out. He'll say it was poured for no one in particular.",
      "He bows a little less deeply, which from him is a kind of intimacy.",
      "\"I'm sorry I'm so late. The campus is so crowded I can never manage to walk in a straight line. Silly, isn't it?\"",
    ],
    warm: [
      "His usual composure softens immediately: there's genuine gladness in his expression when he sees you.",
      "He's set out a second cup. He'd been hoping, and he'd never admit to hoping.",
      '"You\'re just in time," he says, though nothing in particular is happening. Then, catching himself: "...Sorry. That was a strange thing to say, wasn\'t it?"',
      "The paperwork gets set aside faster than his own rules should allow.",
      '"I may be the captain, but it\'s just in name," he says mildly. "Haku is much better suited for the job than me."',
    ],
    spark: [
      "The restraint is fraying and he knows you can see it.",
      '"I shouldn\'t want this," he says quietly. "I\'ve stopped being able to talk myself out of it."',
      "His sleeve brushes yours at the gate. He notices, and for once doesn't apologize, or move away.",
      "He looks at you the way he's spent months not letting himself.",
    ],
    close: [
      "He lets his shoulders drop. It's the first time all day he's allowed that.",
      '"Don\'t tell the others I stopped working," he says, already sitting down.',
      "He looks at you the way he looks at the lanterns, like something he'd hate to let go out.",
      "For once, he lets someone take care of him. It's you. It's only ever you.",
    ],
    bound: [
      "He finally lets someone hold him. It takes him a long time to stop apologizing for it.",
      "He kisses you at the gate, in full view, and doesn't check who's watching.",
      '"I\'ve been performing my whole life," he says. "With you I\'m just yours."',
      "He falls asleep against you before the lanterns are even out.",
      "The restraint is gone entirely. What replaced it is overwhelming and very quiet.",
    ],
  },
  dialogueWhen: [
    {
      when: { time: "evening" },
      dialogue: {
        new: [
          '"Ah, a guest. Please, come in out of the dark."',
          "He's lighting the last of the lanterns along the path, and waves you in toward the warm ones.",
          '"The forest changes character after sundown," he says. "Stay close and it stays kind."',
          '"You\'re safe here, even at this hour," he says. "That much I can promise."',
        ],
        known: [
          "He walks you in by lantern light and takes, as always, the longest possible way.",
          '"I do the last rounds about now. You\'re welcome to keep me company for them."',
          '"The tea\'s still warm and the lanterns are lit," he says. "Stay a while."',
        ],
        warm: [
          '"I find myself listening for the gate after dark lately. I wonder why."',
          "There's a cup already poured and a lantern already set on your side of the step.",
          '"Sit with me until the lanterns burn low? The rounds can wait."',
        ],
        spark: [
          "He walks you back in lantern light and takes the longest possible route.",
        ],
        close: [
          '"I was hoping... you\'d come by tonight," he admits quietly, the lantern light catching the sincerity in his gaze.',
        ],
      },
    },
  ],
  approachWhen: [
    {
      when: { time: "evening" },
      approach: {
        new: ["Come in out of the dark", "Follow the lanterns in"],
        known: ["Join the last rounds"],
        warm: ["Sit by the lantern he set out"],
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
    ],
    warm: [
      "\"You're here... I'm very glad.\"",
      "\"You think I'm always smiling? Ha ha, I hear that a lot. It just happens when I'm around all of you.\"",
      '"Sit with me a moment? The rounds can wait."',
      '"I find myself listening for the gate lately. I wonder why."',
      '"You always come at the right hour. How do you manage that?"',
    ],
    spark: [
      '"Stay. Not for the house. For me. I\'m asking for me."',
      '"I\'ve been the captain all day. Let me be selfish for an hour."',
      '"May I walk you back? ...The long way. If you\'d allow it."',
      '"You make it very difficult to be dutiful. I\'ve stopped minding."',
      '"Don\'t look at me like that. I have very little left to hold on to."',
    ],
    close: [
      '"I... I\'ve missed you more than I should admit."',
      '"Stay until the lanterns burn down. Please."',
      '"With you, I don\'t have to be the captain. Just... let me not be, tonight."',
      "\"I'd carry twice as much if it meant you'd keep coming back.\"",
      '"You are the one thing I never think of as a duty."',
    ],
    bound: [
      '"Stay tonight. Don\'t make me be noble about it."',
      '"I love you. I\'ve loved you since the lanterns. I should have said sooner."',
      '"Let me put my head here. Just for a moment. ...Thank you."',
      '"Come to bed. The rounds can wait. Everything can wait."',
      "\"I'd give up the house before I'd give up this. Don't tell them I said so.\"",
    ],
  },
  approach: {
    new: [
      "Step through the gate",
      "Return his bow",
      "Accept the tea",
      "Wait by the lanterns",
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
      "Join the evening rounds",
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
      "Stay till lanterns burn down",
      "Tell him to rest",
    ],
    bound: [
      "Stay tonight",
      "Hold him",
      "Take him to bed",
      "Let the rounds wait",
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
        "Take his hand at the gate",
      ],
      close: [
        "Help him set down his burden",
        "Tell him he's allowed to rest",
        "Take the lantern from him",
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
        "Make the captain blush",
      ],
      close: [
        "Make him blush",
        "Talk him into slacking off",
        "Laugh until he does",
      ],
      bound: [
        "Make him skip the rounds",
        "Kiss him where they'll see",
        "Blow the lantern out early",
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
        "Tell him to stop carrying it",
        "Ask for him, not the captain",
      ],
      bound: ["Take him to bed", "Tell him not to be noble", "Say it first"],
    },
    neutral: {
      new: [
        "Be gentle",
        "Let him finish his rounds",
        "Sit quietly by the light",
      ],
      spark: [
        "Let him keep his restraint",
        "Say goodnight at the gate",
        "Let the lanterns burn",
      ],
      close: [
        "Sit with him in care",
        "Let him lean, wordlessly",
        "Share the quiet hour",
      ],
      bound: [
        "Let him sleep",
        "Put out the lanterns",
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
      "**{name}** bows before he's finished turning. {user} got the name right, and he's flustered about it.",
      '"You... you knew?" **{name}** asks {user}, then apologizes for asking.',
      "{user} says the name, and **{name}** sets down the crate of lanterns he was carrying across campus.",
    ],
    warm: [
      '"You\'re just in time," **{name}** tells {user}, though nothing in particular is happening.',
      "{user} calls out, and **{name}**'s composure goes soft before he can manage it.",
      "**{name}** had been hoping. He'd never say so, but {user} arriving makes it obvious.",
    ],
    spark: [
      "**{name}** hears his name in {user}'s voice and forgets, entirely, what the rounds were for.",
      '"Sorry, that was a strange face to make." **{name}** says it to {user}, still making it.',
      "{user} got there first, and **{name}** is quietly undone about it.",
    ],
    close: [
      "**{name}** stops apologizing mid-sentence when he sees it's {user}.",
      '"The rounds can wait." **{name}** never says that, and says it to {user}.',
      "{user} calls, and **{name}** leaves the lanterns untended for the first time all year.",
    ],
    bound: [
      '"I\'ve been performing my whole life," **{name}** says, reaching {user}. "Not with you."',
      "**{name}** reaches {user} and stops scanning the crowd for who might be watching. That took him a year.",
      "{user} says the name, and **{name}**, who apologizes for everything, apologizes for none of it.",
    ],
  },
};
