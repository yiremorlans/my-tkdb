// Romeo's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/romeo.js.
//
// Loud, vain, prices everything; canon acronyms only, used bare,
// never spelled out (user, 2026-10-31). Kindness only sideways. No skincare/self-care before warm
// (where it's done together). The prosthetic leg is never mentioned. Guarded
// spots (lips, chest, hips) snap back until spark, where he flusters.

export default {
  new: {
    headPat: [
      "Excuse me!? Do you know how long this hair takes?",
      "Who said you could touch me?",
    ],
    cheekPoke: ["HDY!?", "What do you want?"],
    lipsTouch: [
      "Excuse me!? Hands off my lips!",
      "Wh-What do you think you're doing!? ...Don't.",
    ],
    earTouch: [
      "Those earrings cost more than your whole wardrobe. Don't.",
      "Tch. Hands off the gold.",
    ],
    handTap: [
      "I don't shake on bad deals.",
      "What? You want something? Spit it out.",
    ],
    chestTouch: ["Back off! You'll wrinkle the jacket!", "Get out of my way."],
    bellyTouch: [
      "Excuse me!? Who said you could poke me!?",
      "You'll ruin my posture! Back off!",
    ],
    hipsTouch: [
      "Try that again and you'll be wiping tables for a month.",
      "Hands off! Now!",
    ],
    upset: [
      "Enough! You're wasting my precious time!",
      "Keep it up and I'll deal with you.",
    ],
  },
  known: {
    headPat: [
      "You again!? Watch the part, BB.",
      "...Hmph. At least your hands are clean.",
    ],
    cheekPoke: [
      "What!? Is something on my face? Tell me!",
      "You're bored. Go wipe a table.",
    ],
    lipsTouch: ["Absolutely not.", "Tch... Don't even think about it."],
    earTouch: [
      "Careful with those, they're real gold.",
      "If you scratch them, you're paying.",
    ],
    handTap: [
      "What? You need something from Fico?",
      "Not bad, for you. Still, that's enough.",
    ],
    chestTouch: [
      "Hands off the suit! Do you know what this cost!?",
      "Back up. Personal space, BB.",
    ],
    bellyTouch: ["What!? Keep your fingers to yourself, BB.", "Tch. SIH."],
    hipsTouch: [
      "Hands where I can see them!",
      "Try that again. See what happens.",
    ],
    upset: ["That's it! Out!", "You're giving me a headache. Stop."],
  },
  warm: {
    headPat: [
      "...Fine. Just don't mess it up.",
      "You're lucky I like you.",
    ],
    cheekPoke: [
      "What are you grinning at? ...Tch.",
      "Flawless, isn't it? You get one more.",
    ],
    lipsTouch: ["Excuse me!? Not a chance.", "...No. Not even for you."],
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
    hipsTouch: ["HDY!", "Don't push it. You're on thin ice."],
    upset: ["Enough! I'll put you on table duty!", "Stop. I mean it."],
  },
  spark: {
    headPat: [
      "...Only you get to do that.",
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
      "...It's the noni juice. Obviously.",
    ],
    bellyTouch: [
      "...Don't do that while I'm trying to look composed.",
      "Hey! ...Stop smiling. That didn't get me.",
    ],
    hipsTouch: [
      "E-excuse me!? Not here!",
      "...Bold. I'll deal with you later.",
    ],
    upset: [
      "Stop! I can't think when you do that!",
      "Tch... Give me a minute. My face is hot.",
    ],
  },
  close: {
    headPat: [
      "Mess it up if you want. I'll fix it later.",
      "Keep going. You're getting good at this.",
    ],
    cheekPoke: [
      "Fine, I'm blushing. Look all you want. Just don't tell anyone.",
      "Again? That's the third one. I'm counting.",
    ],
    lipsTouch: [
      "...You're serious, then. Good. So am I.",
      "Tch. That's priceless. Do it again before I change my mind.",
    ],
    earTouch: [
      "Do that again and I won't answer for what happens.",
      "...Again. And this time, don't stop halfway.",
    ],
    handTap: [
      "Hold on. Your hands are mine to look after now.",
      "Hold tighter. I didn't say you could loosen up.",
    ],
    chestTouch: [
      "Feel that? That's your doing. Take responsibility.",
      "Stay there. I said stay. Don't make me repeat myself.",
    ],
    bellyTouch: [
      "You know exactly what you're doing. Keep doing it.",
      "Ah! ...You'll pay for that. Do it again first.",
    ],
    hipsTouch: [
      "...Bold. I like that in my people.",
      "Tch. ...Fine. You've earned that one.",
    ],
  },
};
