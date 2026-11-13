// Romeo's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/romeo.js.
//
// Loud, vain, prices everything; canon acronyms only, used bare,
// never spelled out (user, 2026-10-31). Kindness only sideways. No skincare/self-care before warm
// (where it's done together). The prosthetic leg is never mentioned. Guarded
// spots (lips, chest, hips) snap back until spark, where he flusters.
// Holds are spark+: no "BB" address, never pricing himself or a touch.

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
      "Tch! Do I look like a stress ball to you? Back off!",
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
      "Hands off, those are real gold.",
      "If you scratch them, you're paying.",
    ],
    handTap: ["What? You need something from me?", "Hands off, BB."],
    chestTouch: [
      "Hands off the suit! Do you know what this cost!?",
      "Back up. Personal space, BB.",
    ],
    bellyTouch: ["What!? Keep your hands to yourself.", "Tch. SIH."],
    hipsTouch: [
      "Excuse you!? Hands off, BB.",
      "Try that again. See what happens.",
    ],
    upset: ["That's it! Out!", "You're giving me a headache. Stop."],
  },
  warm: {
    headPat: ["...Fine. Just don't mess it up.", "You're lucky I like you."],
    cheekPoke: [
      "What are you grinning at? ...Tch.",
      "Flawless, isn't it? You get one more.",
    ],
    lipsTouch: ["Excuse me!? Not a chance.", "...No. Not even for you."],
    earTouch: [
      "You've got an eye for quality. Still, hands off.",
      "Go ahead, admire them. Just don't tug, BB.",
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
      "Hey! One more poke and I'm filing a complaint with Shinjo.",
    ],
    hipsTouch: ["HDY!", "Don't push it. You're on thin ice."],
    upset: [
      "Enough! Keep it up and you're on table seven!",
      "Stop. I mean it.",
    ],
  },
  spark: {
    headPat: ["...Only you get to do that.", "Tch. Now I have to fix it."],
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
      "Your hands are freezing. ...Give it here. Not a word.",
      "Your hands are softer. My cream's working.",
    ],
    chestTouch: [
      "W-what? My heart always sounds like that!",
      "Tch. Don't look so pleased. ...Fine. It's you. Happy?",
    ],
    bellyTouch: [
      "...You're the only one who'd dare.",
      "Ah! ...Do that in front of anyone and you're finished.",
    ],
    hipsTouch: [
      "E-excuse me!? Where do you think you're grabbing!?",
      "...Bold. I'll deal with you later.",
    ],
    upset: [
      "Stop! I can't think when you do that!",
      "...Give me a minute. My face is hot.",
    ],
    heartbeatHold: [
      "What are you smirking at? A man's pulse is his own business!",
      "...Fine, so it's fast. I came straight from the gym. Obviously.",
    ],
    lipHold: [
      "Tch... Do you have any idea what that does to my composure?",
      "...That's enough. My face is going to stay this color.",
    ],
    handHold: [
      "I'm only allowing this because you'd sulk otherwise.",
      "Hm. I could get used to this.",
    ],
  },
  close: {
    headPat: [
      "...Long day. That helps more than you think.",
      "Keep going. ...I've gotten used to this.",
    ],
    cheekPoke: [
      "Fine, I'm blushing. Look all you want.",
      "Keep it up and I'm poking back. See how you like it.",
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
      "Don't be stingy. Take my hand.",
    ],
    chestTouch: [
      "Feel that? That's your doing. Take responsibility.",
      "Stay there. I said stay. Don't make me repeat myself.",
    ],
    bellyTouch: [
      "You know exactly what you're doing.",
      "Ah! ...You'll pay for that.",
    ],
    hipsTouch: [
      "...Bold. Not out here. My office, later.",
      "...Tch. Your hands are getting confident. I'm not complaining.",
    ],
    heartbeatHold: [
      "It's racing, and it's your fault. Obviously. Who else would it be?",
      "Don't look so smug. ...All right, maybe a little. You earned it.",
    ],
    lipHold: [
      "...Tch. You know I can't think straight when you do that.",
      "I'll start expecting that every time.",
    ],
    handHold: [
      "Don't let go yet. I'm not done looking after you.",
      "Your grip's better. You learn fast, for once.",
    ],
    caughtTease: [
      "Ah! ...Not yet. When it happens, it'll be done properly.",
      "Tch... Not like this. You deserve better than rushed.",
    ],
  },
  bound: {
    heartbeatHold: [
      "Still checking? You already know what you do to me.",
      "It never slows down for you. I've stopped being embarrassed about it.",
    ],
    lipHold: [
      "Keep that up and I'm closing the casino early.",
      "...You remember what happened the last time you did that. Good. So do I.",
    ],
    handHold: [
      "Hold on to me where everyone can see. Let them talk.",
      "I spent all day on the books. This is the part I was waiting for.",
    ],
    breakAway: [
      "Ah... Enough! I can't... Give me a minute to pull myself together.",
      "HDY... You did that on purpose. And you're not even sorry.",
    ],
    teaseLetGo: [
      "Excuse me!? You're stopping now? ...Get back here. I'm not done with you.",
      "Tch... Stopping right there? Cruel. I'll repay that a thousandfold. Later.",
    ],
  },
};
