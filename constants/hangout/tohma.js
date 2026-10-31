// Tohma's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/tohma.js.
//
// The sly courtier: rebuffs come as smooth, faintly threatening courtesy,
// never bluntness. No alprazolam/headache material at any tier; no
// Stigma/Artifact. Guarded spots (lips, chest, hips) stay composed refusals
// until spark.

export default {
  new: {
    headPat: [
      "My. That's rather forward of you.",
      "I'm afraid I'm a touch too tall for that to be dignified.",
    ],
    cheekPoke: [
      "Is there something on my face, or are you simply testing me?",
      "Well, well. Bold, for someone I've only just met.",
    ],
    lipsTouch: [
      "I'll ask you to keep your hands to yourself.",
      "That will do. I don't believe we've been introduced.",
    ],
    earTouch: [
      "I can hear you perfectly well. No need to come so close.",
      "Curious. Most people whisper into an ear rather than poke it.",
    ],
    handTap: [
      "Yes? If you need something, you need only ask.",
      "Is there something you require?",
    ],
    chestTouch: [
      "I'd advise against that.",
      "Do step back. I'd hate for there to be a misunderstanding.",
    ],
    bellyTouch: [
      "Prodding me, are you? I'd advise you find another pastime.",
      "That's quite enough. Whatever you're checking for, I assure you I'm perfectly well.",
    ],
    hipsTouch: [
      "Absolutely not.",
      "That is quite far enough. I trust I needn't repeat myself.",
    ],
    upset: [
      "Honestly. That will do.",
      "I've been patient. I'd rather not stop being so.",
    ],
  },
  known: {
    headPat: [
      "Ah. Is this how you thank people now?",
      "Honestly. I'm not one of the second years.",
    ],
    cheekPoke: [
      "Testing whether I'm made of stone? I assure you I'm not.",
      "You're in a mischievous mood. Should I be concerned?",
    ],
    lipsTouch: [
      "Not that. I suggest you choose your next move more carefully.",
      "I'll overlook that once.",
    ],
    earTouch: [
      "I hear quite enough as it is, thank you.",
      "If you've something to whisper, by all means. Otherwise, hands down.",
    ],
    handTap: [
      "Yes? You have my attention.",
      "Your hands are cold. Have you been taking care of yourself?",
    ],
    chestTouch: [
      "I'd keep a respectful distance, if I were you.",
      "That's close enough. Honestly.",
    ],
    bellyTouch: [
      "I'll assume that was an accident. Hands down, please.",
      "Mm. Let's pretend that didn't happen, shall we?",
    ],
    hipsTouch: [
      "Hands where I can see them, please.",
      "Now, that I won't overlook.",
    ],
    upset: [
      "Honestly. Are you quite finished?",
      "Enough. I have several matters to attend to, and you are making them wait.",
    ],
  },
  warm: {
    headPat: [
      "Ha ha. You're the only one who'd dare.",
      "Well, well. I suppose I'll allow it.",
    ],
    cheekPoke: [
      "Is that revenge for the chess game? You did lose rather spectacularly.",
      "You're in good spirits. I'm glad to see it.",
    ],
    lipsTouch: [
      "Careful. That's not a game I'd let you win.",
      "No. I mean that kindly, but no.",
    ],
    earTouch: [
      "I'll hear whatever you have to say. There's no need to tug.",
      "Mischievous today, aren't we?",
    ],
    handTap: [
      "Mm. Warmer than usual. Good.",
      "I'm listening. I always am, you know.",
    ],
    chestTouch: [
      "Mind yourself. I'm not a pillow.",
      "That's rather close, even for you.",
    ],
    bellyTouch: [
      "Ha... ha ha. Now that was unsporting.",
      "You caught me off guard. I don't care for how rarely that happens.",
    ],
    hipsTouch: ["I'd stop there, if I were you.", "Now, now. Behave."],
    upset: [
      "Honestly. If you have energy to spare, I can find you work.",
      "That will do. I'm patient, not endlessly so.",
    ],
  },
  spark: {
    headPat: [
      "...I'm usually the one doing the looking after. How novel.",
      "Careful. I could grow used to that.",
    ],
    cheekPoke: [
      "Is this payback? I take it my face is the flushed one now.",
      "You're enjoying this far too much.",
    ],
    lipsTouch: [
      "...Well, well. That was not a move I anticipated.",
      "I'd advise you to mean that. I don't play games I intend to lose.",
    ],
    earTouch: [
      "That's hardly fair. You know I hear everything.",
      "...Mm. Do that again and I'll lose my place entirely.",
    ],
    handTap: [
      "Allow me. ...There. Your hand suits mine.",
      "I'll keep hold of this. Purely for your safety, of course.",
    ],
    chestTouch: [
      "...Is my heart giving me away? How inconvenient.",
      "My composure is usually better than this. Do be gentle with it.",
    ],
    bellyTouch: [
      "...Hm. I'd prefer you not learn where my composure is thinnest.",
      "Ha ha... Do warn me next time. I'd like to at least appear dignified.",
    ],
    hipsTouch: [
      "...Now that is a bold move. I'll need a moment to plan my reply.",
      "Careful. I'd hate to be caught looking this flustered.",
    ],
    upset: [
      "Honestly. You'll undo all my composure if you keep that up.",
      "Enough. I need a moment, and I'd prefer you didn't watch me take it.",
    ],
  },
  close: {
    headPat: [
      "Mm. I've decided I'm used to it. Do carry on.",
      "Ha ha... Again, if you please. I've earned a little spoiling.",
    ],
    cheekPoke: [
      "Careful. I keep score, and I always collect.",
      "Ha ha. You've found the one face I don't show anyone else.",
    ],
    lipsTouch: [
      "Then you meant it. Very well. I'll answer in kind, at my leisure.",
      "Mm. Checkmate, I believe. ...Though I'm not certain which of us lost.",
    ],
    earTouch: [
      "Whisper something, then. I'll pretend I haven't heard it already.",
      "Mm... Of everything I hear in a day, I believe I'll keep this one.",
    ],
    handTap: [
      "There you are. I've several matters to attend to, and every one of them can wait.",
      "Mm. I'll keep this. Do ask if you want it back. I may refuse.",
    ],
    chestTouch: [
      "No need to check. It's been like this since you walked in.",
      "Lean on me, then. I'm rather sturdier than I look.",
    ],
    bellyTouch: [
      "Ha ha... That spot again. You do enjoy watching me lose my dignity.",
      "Careful. You keep finding my weak points, and I keep letting you.",
    ],
    hipsTouch: [
      "Careful. My intentions are entirely honorable. Yours, I'm beginning to doubt.",
      "Mm. I'd stop you, if I wanted to.",
    ],
  },
};
