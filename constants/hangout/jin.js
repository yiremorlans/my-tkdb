// Jin's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/jin.js.
//
// Phrasing built from his canon voicelines. He's patient: upset lines dismiss
// on content, never impatience. No PDA: affection shows in what he allows.
// Guarded spots (lips, chest, hips) stay serious until spark. The hand-holding
// resonance hint stays in spark.
//
// Holds (spark+): handHold carries the stigma resonance (dead since the
// clash, alive only holding MC's hand): a hint at spark, "complete" kept
// for bound. caughtTease is him deciding when, not refusing.

export default {
  new: {
    headPat: [
      "...Who the hell said you could touch me?",
      "Tsk. Get your hand off my head.",
    ],
    cheekPoke: ["What?", "You've got some nerve, poking me."],
    lipsTouch: [
      "Tsk... What do you think you're doing?",
      "...Not my lips, peasant.",
    ],
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
    lipsTouch: [
      "...Don't. Not that.",
      "Tsk... You've got some nerve, servant.",
    ],
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
    hipsTouch: ["Know your place.", "You've got guts. Don't push it."],
    upset: [
      "Enough. That's an order.",
      "Stop. You won't get anything out of me that way.",
    ],
  },
  warm: {
    headPat: [
      "...Nobody else would dare. You know that?",
      "Tsk. ...I'll allow it. This once.",
    ],
    cheekPoke: [
      "What's that look for?",
      "You're in a good mood. Don't push it.",
    ],
    lipsTouch: ["Tsk... Not that.", "...Don't give me that look. Hands down."],
    earTouch: ["...Cut it out. That's not funny.", "Tsk. Bold, aren't you?"],
    handTap: ["...What? You cold?", "You've got my attention. Happy?"],
    chestTouch: ["...Back off. A little.", "You're getting comfortable."],
    bellyTouch: [
      "Hey. Warn me before you do that.",
      "What the hell was that? ...Don't laugh.",
    ],
    hipsTouch: ["Tsk. Quit pushing it.", "...Don't."],
    upset: [
      "Enough. I'm not a toy.",
      "Tsk. Enough poking, servant. Hands down.",
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
    lipsTouch: ["...Don't. Not until I say.", "Hey. You're starting something."],
    earTouch: [
      "...Shit. Cut that out.",
      "...Tsk. You're enjoying this, aren't you?",
    ],
    handTap: ["...Don't let go yet.", "...Your hand. Give it here."],
    chestTouch: [
      "...Don't say a word about that.",
      "Tsk. Who taught you to be this bold?",
    ],
    bellyTouch: [
      "...Tsk. Watch where you put that hand.",
      "...Tsk. Your hand's cold. That's the only reason I flinched.",
    ],
    hipsTouch: [
      "...Hands off. You're testing me.",
      "Hey. ...You've got some nerve.",
    ],
    upset: [
      "Enough. ...This is throwing me off.",
      "Stop. I can't think straight like this.",
    ],
    heartbeatHold: [
      "...You heard nothing.",
      "Shit... Fine. Now you know. Don't push it.",
    ],
    lipHold: [
      "...I could've stopped you. Don't make me regret it.",
      "...Shit. You're bold. Don't get used to it.",
    ],
    handHold: [
      "...Hm. Haven't felt that in a while.",
      "You let go first. I'll remember that.",
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
    handTap: ["You're late. Give me your hand.", "Hold on. I'm in no hurry."],
    chestTouch: [
      "...Yeah. That's your fault. Stay there and own it.",
      "Tsk. Lean in, then. Nobody's coming up here.",
    ],
    bellyTouch: [
      "...Keep your hand there. I didn't say move.",
      "Hell. ...Fine. You've earned that much.",
    ],
    hipsTouch: [
      "Bold. ...You know what you're asking for?",
      "...Tsk. You don't get to rush me.",
    ],
    heartbeatHold: [
      "You wanted proof? There. Now quit gawking.",
      "...It does that around you. I'm not apologizing for it.",
    ],
    lipHold: [
      "...Next time, don't use your hand.",
      "...Tsk. Good thing you stopped. I was done holding back.",
    ],
    handHold: [
      "Your place is at my back. ...Your hand's fine too.",
      "Stay. Tohma can handle the brats for an hour.",
    ],
    caughtTease: [
      "...Tsk. Not yet. I decide when.",
      "Shit... Hold it. ...Not yet. Don't look so disappointed.",
    ],
  },
  bound: {
    heartbeatHold: [
      "You know what that sound means by now. Don't make me say it.",
      "It hasn't calmed down since you stayed the night. ...That's your fault.",
    ],
    lipHold: [
      "...Fingers again? You know better than that by now.",
      "Tsk. Quit teasing and come here.",
    ],
    handHold: [
      "...With you, I'm complete. Don't make me say it twice.",
      "It only works with you. ...I don't take that for granted.",
    ],
    breakAway: [
      "Shit... Enough. Give me a second. ...Don't you dare look smug.",
      "Hah... You've got some nerve. Wait until I can breathe.",
    ],
    teaseLetGo: [
      "...Hah. That's where you stop? Come to my room later and finish it.",
      "Tsk... Leaving me like this. You'll answer for that later.",
    ],
  },
};
