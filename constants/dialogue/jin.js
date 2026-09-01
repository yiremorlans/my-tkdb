export default {
  dialogue: {
    new: [
      "The frost never bothered him. That you walked into Frostheim uninvited is another matter.",
      "He doesn't turn to look at you. The cold in the room sharpens anyway.",
      "Frostheim's captain is holding court with no one at all. He notices you, and says nothing.",
      "He weighs you the way one weighs a servant he did not hire — quickly, and without much interest.",
      "Ice creeps along the window frame beside him. He lights a cigarette and waits for you to explain yourself.",
    ],
    known: [
      "He recognizes you now. He makes a point of not showing it.",
      '"You again," he says, and returns to his cigarette. He doesn\'t call you trash this time.',
      "Twice this week. He's noticed. He would deny having counted.",
      "The dismissal comes a beat slower than it used to.",
      "He looks up, places you, and looks back down. From Jin, that is nearly a greeting.",
    ],
    warm: [
      "He almost looks pleased when he sees you coming — almost.",
      "He keeps speaking to whoever's in front of him, but the door stays open behind them.",
      "The room is still freezing. Somehow the chair nearest to him is not.",
      "He's already turned toward the sound of your footsteps by the time you round the corner.",
      '"You took the long way," he notes, without looking up. He\'d been counting.',
    ],
    spark: [
      "He allows you nearer than he allows anyone, and dares you to remark on it.",
      "He adjusts your collar without asking. His hand stays a moment past necessary.",
      "\"Don't move,\" he says quietly, and takes his time about whatever he's looking at.",
      "The cold doesn't reach you when you stand this close. He arranged that.",
      "He says your name once, low, and appears annoyed at how it came out.",
    ],
    close: [
      'The ice in his voice is long gone around you. "I was hoping I\'d run into you."',
      "He dismisses the others with a flick of his hand the moment he sees you.",
      "For once he isn't performing for anybody. He just looks glad.",
      '"You\'re late," he says, and the complaint has no teeth in it at all.',
      "He sets down whatever he was holding. Whatever it was, it can wait now.",
    ],
    bound: [
      "The door closes and every ounce of composure goes with it.",
      "He wakes before you and stays exactly where he is rather than disturb you.",
      '"Mine," he says against your throat, like a fact he\'s tired of not saying aloud.',
      "He kisses you like it's a thing he's owed and has waited far too long to collect.",
      "Frostheim is freezing. His bed is not. He has opinions about you leaving it.",
    ],
  },
  dialogueWhen: [
    {
      when: { time: "evening" },
      dialogue: {
        new: [
          "He hasn't turned on a light. The cold has teeth after dark and he seems to prefer it that way.",
          '"Frostheim after dark is mine," he says without turning. "You\'re standing in it."',
          "Frost has crept across the balcony doors behind him. He watches the black campus like he owns the view.",
          '"The cold gets worse after sundown," he says. "You knew that, and came anyway."',
        ],
        known: [
          '"Late," he observes. He doesn\'t say for what, and doesn\'t tell you to leave either.',
          "The cold doesn't reach the spot he's left open beside him. He arranged that before you arrived.",
          '"It\'s late," he says. "Stand somewhere useful and don\'t let the cold in."',
        ],
        warm: [
          '"Stay until the cold drives you in," he says. "Not before."',
          "He lights a cigarette against the dark and, for once, offers the rail beside him without a word.",
          '"Past curfew," he notes. "I won\'t report you. Sit down."',
        ],
      },
    },
  ],
  approachWhen: [
    {
      when: { time: "evening" },
      approach: {
        new: ["Step onto the dark balcony", "Meet him at the rail"],
        known: ["Take the cold beside him"],
        warm: ["Take the offered rail"],
      },
    },
  ],
  temperamentDialogue: {
    new: [
      "\"You're not supposed to be here. Don't waste my time.\"",
      '"Don\'t just stand there like an idiot. Hurry up."',
      '"Frostheim does not entertain wanderers. Explain yourself, servant."',
      '"Get to the point. The trash here is so long-winded."',
      '"Speak quickly. I don\'t like to wait."',
    ],
    known: [
      '"You. I remember you. Don\'t let it go to your head."',
      '"Still here? Then stand somewhere useful."',
      '"A class C anomaly? Miss me with that weak shit. Why do you think we have a Vice Captain?"',
      '"What? Your schedule\'s not my problem. Just arrange it around me."',
      '"Don\'t mistake familiarity for permission."',
    ],
    warm: [
      '"Your presence is... tolerable."',
      '"You again. Sit, if you must. Don\'t touch anything."',
      '"I didn\'t summon you. But you can stay."',
      '"Hmph. At least you had the sense to come to me directly."',
      "\"Don't stand in the doorway. You're letting the cold out.\"",
    ],
    spark: [
      '"Closer. I dislike raising my voice."',
      "\"You've grown bold. I find I don't mind it.\"",
      '"Look at me when I\'m speaking to you. ...Yes. Like that."',
      '"Everyone in this room is watching. Let them."',
      '"You are the only one here I have any interest in. Take that as you like."',
    ],
    close: [
      '"I suppose I can make an exception for you."',
      '"Stand closer. The cold doesn\'t reach you here."',
      '"There is no one else I would allow to see me like this."',
      '"Say what you came to say. I\'ll listen. Only for you."',
      "\"I don't repeat myself. So hear this once: I'd rather you stayed.\"",
    ],
    bound: [
      '"Come back to bed. That was not a request."',
      '"Let them talk. You wear my name well."',
      '"Stay. I have spent my whole life being denied things. Not this."',
      '"Do that again. ...Slower."',
      '"You are the single indulgence I refuse to apologize for."',
    ],
  },
  approach: {
    new: [
      "Step into the cold",
      "Meet his eyes anyway",
      "Announce yourself",
      "Refuse to be dismissed",
    ],
    known: [
      "Let him place you",
      "Stand somewhere useful",
      "Speak while allowed",
      "Come back anyway",
    ],
    warm: [
      "Walk over to him",
      "Take the seat he left open",
      "Break the silence first",
      "Greet him properly",
    ],
    spark: [
      "Close the last step",
      "Hold his gaze",
      "Let him fix your collar",
      "Let them watch",
    ],
    close: [
      "Go to him",
      "Close the distance",
      "Say his name",
      "Let him see you smile",
    ],
    bound: [
      "Come back to bed",
      "Wear his name",
      "Kiss him first",
      "Refuse to leave",
    ],
  },
  responses: {
    kind: {
      new: [
        "Show respect for his pride",
        "Thank him for his time",
        "Address him the way he expects",
      ],
      spark: [
        "Let him hold your gaze",
        "Be gentle with his pride",
        "Lean in when he allows it",
      ],
      close: [
        "See his pain without judgment",
        "Tell him he's not alone",
        "Let the crown come off",
      ],
      bound: [
        "Stay where you are",
        "Touch his face",
        "Tell him he's allowed this",
      ],
    },
    playful: {
      new: [
        "Be bold enough for him",
        "Refuse to be impressed",
        "Call his bluff lightly",
      ],
      spark: [
        "Tease the ice",
        "Make him lose his composure",
        "Call him possessive",
      ],
      close: [
        "Tease him out of his shell",
        "Poke at his pride, gently",
        "Call him spoiled to his face",
      ],
      bound: [
        "Steal the warm side",
        "Make him ask nicely",
        "Wear his coat out",
      ],
    },
    bold: {
      new: [
        "Stand with confidence",
        "Meet him as an equal",
        "Refuse to look away",
      ],
      spark: [
        "Close the last inch",
        "Take his hand without asking",
        "Tell him you want this",
      ],
      close: [
        "Show him you won't break",
        "Take his hand first",
        "Tell him you're staying",
      ],
      bound: [
        "Pull him back down",
        "Say it against his mouth",
        "Tell him to be slower",
      ],
    },
    neutral: {
      new: [
        "Respect his space",
        "Wait for him to speak",
        "Say nothing at all",
      ],
      spark: [
        "Let the moment pass",
        "Look away first",
        "Say nothing, let him wonder",
      ],
      close: [
        "Sit with him in silence",
        "Stay within reach",
        "Let the quiet do the talking",
      ],
      bound: [
        "Let him sleep",
        "Lie still beside him",
        "Stay quiet in the dark",
      ],
    },
  },
};
