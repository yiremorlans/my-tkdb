// Edward's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/edward.js.
//
// He disarms, never menaces: amused, courtly, idle, no fang/blood or bite
// jokes, and he never restates the rumors, the sun or his health. "Ask Rui"
// is his deflection, never a threat. No "wicked girl" (gendered for a player
// line). Guarded spots (lips, chest, hips) stay serious until spark, where he
// is charged rather than flustered: he does the teasing.
//
// Holds (spark+): his pulse is very slow (the monitor rests at 24 bpm and
// rises a third as far), so a heartbeat check catches it hurrying by his
// standards. He's amused at being caught, never alarmed. Close hints and
// holds back; bound treats intimacy as shared history.

export default {
  new: {
    headPat: [
      "My, my. Is that how humans greet one another now?",
      "How forward. I don't believe we've been introduced.",
    ],
    cheekPoke: [
      "Oh? Checking whether I'm real? I'm told I am.",
      "Why, hello there. Was there something you needed?",
    ],
    lipsTouch: [
      "Oh. My. That's rather personal, isn't it?",
      "My, how bold. Hands down, I think.",
    ],
    earTouch: [
      "Ah ha ha. You're a curious one.",
      "That tickles. Ears are rather sensitive at my age.",
    ],
    handTap: ["Ah, a handshake. How very proper of you.", "Hm? What is it?"],
    chestTouch: [
      "Now, now. Let's not get ahead of ourselves.",
      "Ah. I think that's quite far enough.",
    ],
    bellyTouch: [
      "Ah. I don't believe that's customary, even here.",
      "Goodness. Do you poke everyone you've only just met?",
    ],
    hipsTouch: ["My, my. That's rather presumptuous.", "No, I don't think so."],
    upset: [
      "Enough, now. You'll tire me out.",
      "That will do. Go and pester Rui instead.",
    ],
  },
  known: {
    headPat: [
      "Hm. Not many would try that. Carry on.",
      "Ah ha ha. Am I being humored?",
    ],
    cheekPoke: [
      "Is that meant to wake me? I wasn't asleep.",
      "My, my. You're in a playful mood.",
    ],
    lipsTouch: [
      "Ah. Not my lips, if you please.",
      "Goodness. I'd rather you kept your hands to yourself.",
    ],
    earTouch: [
      "Ah ha ha. A weak spot. Do be gentle with it.",
      "The earring stays where it is, I'm afraid.",
    ],
    handTap: [
      "Ah, there you are. I wondered when you'd come.",
      "Hm? You may keep it a moment, if you like.",
    ],
    chestTouch: [
      "Now, now. Mind yourself.",
      "Hm. Quite close enough, I think.",
    ],
    bellyTouch: [
      "Hm. I'd thank you to keep your hands to yourself.",
      "Is that a new game of yours? I'd rather not play it.",
    ],
    hipsTouch: ["That's far enough.", "No. I think not."],
    upset: [
      "Do stop. I was having such a pleasant time.",
      "My patience is longer than most, but it isn't endless.",
    ],
  },
  warm: {
    headPat: [
      "Mm. You may continue. I've no objections.",
      "How indulgent. I could grow used to this.",
    ],
    cheekPoke: [
      "Ah ha ha. Making sure I'm still among the living? Debatable.",
      "You're very attentive today. I don't mind.",
    ],
    lipsTouch: ["Ah. Not that, I think.", "Hm. ...Those I keep to myself."],
    earTouch: [
      "Ah ha ha. That tickles. Rui would be scandalized.",
      "Hm. I suppose I'll allow it. Just this once.",
    ],
    handTap: [
      "There you are. Come here, then.",
      "Mm. Your hands are so warm. Hardly fair to an old man.",
    ],
    chestTouch: ["Now, now. That's quite close.", "Ah. Mind yourself, now."],
    bellyTouch: [
      "Oh! My. You caught me quite unawares.",
      "Ah ha ha. Stop, stop. That's hardly fair.",
    ],
    hipsTouch: ["Hm. No.", "Ah. Let's keep this civilized, shall we?"],
    upset: [
      "That will do. Go and pester Rui for a while.",
      "Enough, now. You'll wear an old man out.",
    ],
  },
  spark: {
    headPat: [
      "Mm. Careful. I may never let you leave.",
      "How lovely. Do that again.",
    ],
    cheekPoke: [
      "Oh? Is that all you came for? How disappointing.",
      "You keep doing that. What are you hoping for?",
    ],
    lipsTouch: [
      "Playing with fire again, are we?",
      "You ought to be more careful. I might take that seriously.",
    ],
    earTouch: [
      "Ah. Now you're simply being cruel.",
      "Keep that up and I'll forget my manners.",
    ],
    handTap: [
      "Come here. I've no intention of letting go.",
      "Your hand fits rather nicely in mine, doesn't it?",
    ],
    chestTouch: [
      "My. It's been a long time since anyone dared.",
      "Careful. You'll make an old man's heart race.",
    ],
    bellyTouch: [
      "Oh? Is that where your curiosity led you?",
      "Mm. How forward. I'm quite out of breath.",
    ],
    hipsTouch: [
      "How very bold. I can't decide whether to scold you or applaud.",
      "...You know better than this. Don't you?",
    ],
    upset: [
      "Enough, enough. You'll undo me entirely.",
      "That will do. Even I have my limits.",
    ],
    heartbeatHold: [
      "Ah ha ha. Slow, I know. But it was slower before you came.",
      "Ah. Caught. I had hoped you wouldn't look so pleased about it.",
    ],
    lipHold: [
      "Mm. You're very patient. Fortunately, so am I.",
      "My, my. And now you've no idea what to do next, have you?",
    ],
    handHold: [
      "Cold, I know. You needn't let go on my account.",
      "Mm. I've held a great many things over the years. This I'll keep.",
    ],
  },
  close: {
    headPat: [
      "Mm. You've spoiled me. I won't settle for less now.",
      "Don't stop. I was just beginning to drift off.",
    ],
    cheekPoke: [
      "Ah ha ha. You needn't poke. Come here and you'll have my full attention.",
      "You're terribly fond of that, aren't you? So am I.",
    ],
    lipsTouch: [
      "Mm. You ought to know better. I'm glad you don't.",
      "Is that a promise? I intend to hold you to it.",
    ],
    earTouch: [
      "Ah. You've learned exactly where to find me.",
      "Mm. Stay there and whisper something. I'm listening.",
    ],
    handTap: [
      "There you are. I was beginning to miss this hand.",
      "Lace your fingers through mine. Yes, just like that.",
    ],
    chestTouch: [
      "Mm. Rest your head here, if you like. I won't object.",
      "Stay a while. It's been a very long time since anyone listened this closely.",
    ],
    bellyTouch: [
      "Careful. I may decide to return the favor.",
      "You really should be more careful. I've grown terribly fond of this.",
    ],
    hipsTouch: [
      "My, my. And here I thought I was the wicked one.",
      "Mm. Keep going and I'll stop pretending to be a gentleman.",
    ],
    heartbeatHold: [
      "Ah ha ha. You may stop checking. It only does that for you.",
      "There. You've made it hurry again. Few have managed that in four hundred years.",
    ],
    lipHold: [
      "Such patience. I wonder what you're waiting for.",
      "My, my. You've quite stolen the last word from me.",
    ],
    handHold: [
      "Ah. I find I don't want to let go. How inconvenient.",
      "Mm. Stay. My video can wait.",
    ],
    caughtTease: [
      "Ah. ...Not yet, I think. Let me savor the wait.",
      "My, my. Not yet. I've waited centuries. I can wait a little longer.",
    ],
  },
  bound: {
    heartbeatHold: [
      "Ah ha ha. You know full well it only hurries for you.",
      "Count it, if you like. It's yours for as long as it beats.",
    ],
    lipHold: [
      "Mm. You remember how this ends, don't you? So do I.",
      "How wicked. You know exactly what that does to me now.",
    ],
    handHold: [
      "Mm. An eternity like this. I'd ask for nothing else.",
      "Don't let go. I've grown used to keeping you.",
    ],
    breakAway: [
      "Ah... Mercy. I haven't been this out of breath in centuries.",
      "Ha... Ah. Give me a moment. Then it's my turn with you.",
    ],
    teaseLetGo: [
      "Ah... You'd stop there? I'll be collecting on that later.",
      "Ha... Leaving me like this? Come back here and finish it. Go on.",
    ],
  },
};
