// Romeo's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/romeo.js.
//
// Loud, vain, prices everything; acronyms are spelled out ("HDY. How Dare
// You, obviously"). Kindness only sideways. No skincare/self-care before warm
// (where it's done together). The prosthetic leg is never mentioned. Guarded
// spots (lips, chest, hips) snap back until spark, where he flusters.

export default {
  new: {
    headPat: [
      "Excuse me!? Do you know how long this hair takes?",
      "Tch. Hands off the merchandise.",
    ],
    cheekPoke: ["HDY!? How Dare You, obviously!", "Tch. What do you want?"],
    lipsTouch: [
      "Get your hands away from my face!",
      "Do you have a death wish!?",
    ],
    earTouch: [
      "Those earrings cost more than your whole wardrobe. Don't.",
      "Tch. Hands off the gold.",
    ],
    handTap: [
      "If you're not paying, you're not touching.",
      "What? You want something? Spit it out.",
    ],
    chestTouch: ["Back off! You'll wrinkle the jacket!", "Get out of my way."],
    bellyTouch: [
      "Excuse me!? Who said you could poke me!?",
      "Tch. That'll cost you. More than you've got.",
    ],
    hipsTouch: [
      "Try that again and you'll be wiping tables for a month.",
      "Hands off! Now!",
    ],
    upset: [
      "Enough! You're wasting my precious time!",
      "Tch... Keep it up and I'll deal with you.",
    ],
  },
  known: {
    headPat: [
      "You again!? Watch the part, BB.",
      "...Hmph. At least your hands are clean.",
    ],
    cheekPoke: [
      "What!? Is something on my face? Tell me!",
      "Tch. You're bored. Go wipe a table.",
    ],
    lipsTouch: [
      "Absolutely not.",
      "Excuse me!? LYP. Learn Your Place, obviously.",
    ],
    earTouch: [
      "Careful with those, they're real gold.",
      "Tch. If you scratch them, you're paying.",
    ],
    handTap: [
      "What? You need something from Fico?",
      "Not bad, for you. Still, that's enough.",
    ],
    chestTouch: [
      "Hands off the suit! Do you know what this cost!?",
      "Back up. Personal space, BB.",
    ],
    bellyTouch: [
      "What!? Keep your fingers to yourself, BB.",
      "Tch. SIH. Shrivel In Hell, obviously.",
    ],
    hipsTouch: [
      "Hands where I can see them!",
      "Try that again. See what happens.",
    ],
    upset: ["That's it! Out!", "Tch... You're giving me a headache. Stop."],
  },
  warm: {
    headPat: [
      "...Tch. Fine. Just don't mess it up.",
      "You're lucky I like you. Don't tell anyone.",
    ],
    cheekPoke: [
      "What are you grinning at? ...Tch.",
      "Flawless, isn't it? You get one more.",
    ],
    lipsTouch: ["Excuse me!? Not a chance.", "...Don't even think about it."],
    earTouch: [
      "You've got an eye for quality. Still, hands off.",
      "They suit me, don't they? Obviously.",
    ],
    handTap: [
      "...Here. Hand cream. Use it before you touch me again.",
      "What is it? You all right?",
    ],
    chestTouch: [
      "Hey! I just had this pressed!",
      "...Back up. You're too close.",
    ],
    bellyTouch: [
      "Ah!? ...That did not tickle. Don't do it again.",
      "Hey! Do you know how much core work that took?",
    ],
    hipsTouch: [
      "HDY. How Dare You, obviously!",
      "Don't push it. You're on thin ice.",
    ],
    upset: ["Enough! I'll put you on table duty!", "Tch. Stop. I mean it."],
  },
  spark: {
    headPat: [
      "...Tch. Only you get to do that.",
      "Don't stop. ...I didn't say anything!",
    ],
    cheekPoke: [
      "My face is not red! It's the lighting!",
      "What!? ...Stop looking at me like that.",
    ],
    lipsTouch: [
      "...You'd better be serious about this.",
      "HDY... Don't tease me like that.",
    ],
    earTouch: [
      "...Watch it. That's not fair.",
      "Tch. That's not... Stop smirking!",
    ],
    handTap: [
      "...Fine. Hold on. Don't make a scene of it.",
      "Your hands are softer. My cream's working.",
    ],
    chestTouch: [
      "...Don't listen to that. It's nothing!",
      "Careful. My heart's not cheap, you know.",
    ],
    bellyTouch: [
      "...Tch. Don't do that while I'm trying to look composed.",
      "Hey! ...Stop smiling. That didn't get me.",
    ],
    hipsTouch: [
      "E-excuse me!? Not here!",
      "...Bold. I'll bill you for that later.",
    ],
    upset: [
      "Stop! I can't think when you do that!",
      "Tch... Give me a minute. My face is hot.",
    ],
  },
  close: {
    headPat: [
      "Mess it up if you want. I'll fix it later.",
      "Tch. Keep going. You're getting good at this.",
    ],
    cheekPoke: [
      "Fine, I'm blushing. Look all you want. It's free, today only.",
      "Again? Tch. That's the third one. I'm keeping a tab.",
    ],
    lipsTouch: [
      "...You're serious, then. Good. So am I.",
      "Tch. That's priceless. Do it again before I change my mind.",
    ],
    earTouch: [
      "Tch. Do that again and I won't answer for what happens.",
      "...Again. And this time, don't stop halfway.",
    ],
    handTap: [
      "Hold on. Your hands are mine to look after now.",
      "Tch. Hold tighter. I didn't say you could loosen up.",
    ],
    chestTouch: [
      "Feel that? That's your doing. I'm sending you the bill.",
      "Stay there. I said stay, BB.",
    ],
    bellyTouch: [
      "Tch. You know exactly what you're doing. Keep doing it.",
      "Ah! ...You'll pay for that. Do it again first.",
    ],
    hipsTouch: [
      "...Bold. I like that in my people.",
      "Tch. ...Fine. You've earned that one.",
    ],
  },
};
