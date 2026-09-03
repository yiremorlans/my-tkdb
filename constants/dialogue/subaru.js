export default {
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
      "His usual composure softens immediately—there's genuine gladness in his expression when he sees you.",
      "He's set out a second cup. He'd been hoping, and he'd never admit to hoping.",
      '"You\'re just in time," he says, though nothing in particular is happening. Then, catching himself: "...Sorry. That was a strange thing to say, wasn\'t it?"',
      "The paperwork gets set aside faster than his own rules should allow.",
      '"I may be the captain, but it\'s just in name," he says mildly. "Haku is much better suited for the job than me."',
    ],
    spark: [
      "The restraint is fraying and he knows you can see it.",
      '"I shouldn\'t want this," he says quietly. "I\'ve stopped being able to talk myself out of it."',
      "His sleeve brushes yours at the gate. He notices — and for once doesn't apologize, or move away.",
      "He looks at you the way he's spent months not letting himself.",
    ],
    close: [
      "He lets his shoulders drop. It's the first time all day he's allowed that.",
      '"Don\'t tell the others I stopped working," he says, already sitting down.',
      "He looks at you the way he looks at the lanterns — like something he'd hate to let go out.",
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
          '"Ah — a guest. Please, come in out of the dark."',
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
      '"Welcome. Forgive the state of the path — I meant to sweep it this morning and lost track of the hour."',
      '"Mind the step — the stones are uneven past the gate."',
      "\"I'm very sorry to have kept you waiting. It's wonderful to see you again.\"",
      '"A visitor? Then let me at least offer you tea."',
      '"You\'re safe here. That much I can promise."',
    ],
    known: [
      '"Welcome back. I hoped that was you at the gate."',
      "\"The tea's fresh — no, please, it's no trouble at all.\"",
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
      '"You— you knew?" **{name}** asks {user}, then apologizes for asking.',
      "{user} says the name, and **{name}** sets down the crate of lanterns he was carrying across campus.",
    ],
    warm: [
      '"You\'re just in time," **{name}** tells {user}, though nothing in particular is happening.',
      "{user} calls out, and **{name}**'s composure goes soft before he can manage it.",
      "**{name}** had been hoping. He'd never say so, but {user} arriving makes it obvious.",
    ],
    spark: [
      "**{name}** hears his name in {user}'s voice and forgets, entirely, what the rounds were for.",
      '"Sorry — that was a strange face to make." **{name}** says it to {user}, still making it.',
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
      "{user} says the name, and **{name}** — who apologizes for everything — apologizes for none of it.",
    ],
  },
};
