// Jin's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/jin.js.
//
// Phrasing built from his canon voicelines. He's patient: upset lines dismiss
// on content, never impatience. No PDA: affection shows in what he allows.
// Guarded spots (lips, chest, hips) stay serious until spark. The hand-holding
// resonance hint stays in spark.

export default {
  new: {
    headPat: [
      "...Who the hell said you could touch me?",
      "Tsk. Get your hand off my head.",
    ],
    cheekPoke: ["What?", "You've got some nerve, poking me."],
    lipsTouch: ["Hands off.", "...Don't even think about it."],
    earTouch: ["Tsk...", "What are you, a child? Hands down."],
    handTap: ["Get to the point.", "You want something? Spit it out."],
    chestTouch: ["Back off.", "Who do you think you are?"],
    bellyTouch: ["Tsk. Don't touch me.", "Hands off, peasant."],
    hipsTouch: ["Know your place.", "...Leave."],
    upset: [
      "Enough. I didn't ask to be poked.",
      "Stop that. It's a waste of both our time.",
    ],
  },
  known: {
    headPat: ["...You've got guts, servant.", "Again? Tsk. ...Fine."],
    cheekPoke: [
      "What? You got a problem? Spit it out.",
      "Quit poking. Say what you came to say.",
    ],
    lipsTouch: ["Don't.", "...Watch it, servant."],
    earTouch: [
      "Tsk... Cut that out.",
      "If you've got something to say, say it to my face.",
    ],
    handTap: ["What. You need something?", "You want something? Ask."],
    chestTouch: ["Back off, servant.", "Who said you could get that close?"],
    bellyTouch: [
      "Tsk. What the hell was that, servant?",
      "Hey. I didn't say you could do that.",
    ],
    hipsTouch: ["Know your place.", "Hey. Hands where I can see them."],
    upset: [
      "Enough. That's an order.",
      "Stop. You won't get anything out of me that way.",
    ],
  },
  warm: {
    headPat: [
      "...Nobody else would dare. You know that?",
      "Tsk. Only you would try that.",
    ],
    cheekPoke: [
      "What's that look for?",
      "You're in a good mood. Don't push it.",
    ],
    lipsTouch: ["...Don't.", "That's not a game, servant."],
    earTouch: ["...Cut it out. That's not funny.", "Tsk. Bold, aren't you?"],
    handTap: ["...What? You cold?", "You've got my attention. Happy?"],
    chestTouch: ["...Back off. A little.", "You're getting comfortable."],
    bellyTouch: [
      "Hey. Warn me before you do that.",
      "What the hell was that? ...Don't laugh.",
    ],
    hipsTouch: ["Careful. You're pushing it.", "...Don't."],
    upset: [
      "Enough. I'm not a toy.",
      "Stop. You don't need to do that to keep my attention.",
    ],
  },
  spark: {
    headPat: [
      "...Tsk. Don't look so pleased with yourself.",
      "Only you. ...That's all I'm going to say.",
    ],
    cheekPoke: [
      "What? ...Stop staring.",
      "You've got guts. I'll give you that.",
    ],
    lipsTouch: ["...Not here.", "Careful. You're starting something, servant."],
    earTouch: ["...Shit. Cut that out.", "...Tsk. You found that on purpose."],
    handTap: [
      "...Don't let go yet.",
      "Keep holding on. ...I feel like my old self.",
    ],
    chestTouch: [
      "...Don't say a word about that.",
      "Tsk. Who taught you to be this bold?",
    ],
    bellyTouch: [
      "...Careful, servant. I'm going to have to retrain you.",
      "...Tsk. Your hand's cold. That's the only reason I flinched.",
    ],
    hipsTouch: [
      "...Not here. Know where we are.",
      "Hey. ...You've got some nerve.",
    ],
    upset: [
      "Enough. ...This is throwing me off.",
      "Stop. I can't think straight like this.",
    ],
  },
  close: {
    headPat: ["...Fine. Keep going.", "Tsk. Who said you could stop?"],
    cheekPoke: [
      "You want my attention? Come here and take it.",
      "Ha. Bold. Do it again and see what happens.",
    ],
    lipsTouch: [
      "...Again. That's an order.",
      "Shit. ...You don't get to do that just once.",
    ],
    earTouch: [
      "Do that again and I'm not responsible for what happens.",
      "...Stay there. I'm not done with you.",
    ],
    handTap: [
      "You're late. Give me your hand.",
      "Stay. Your schedule can arrange itself around me.",
    ],
    chestTouch: [
      "...Yeah. That's your fault. Stay there and own it.",
      "Tsk. Lean in, then. Nobody's coming up here.",
    ],
    bellyTouch: [
      "...Keep your hand there. I didn't say move.",
      "Hell. ...Fine, you can stay. Retraining can wait.",
    ],
    hipsTouch: [
      "Bold. ...You know what you're asking for, servant?",
      "Careful. Keep that up and you're not leaving this room.",
    ],
  },
};
