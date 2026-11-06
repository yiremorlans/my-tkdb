// Jo's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/jo.js.
//
// Calm, measured, caretaking even when he's the one being touched: he turns a
// tap into "any trouble?". "Cutie" from known on. No gendered self-reference
// (his stigma form is still him). Guarded spots (lips, chest, hips) stay
// gently firm until spark.
//
// Holds (spark+): the caretaker on the receiving end; caughtTease is
// "not yet, I want to do this properly"; bound leans on honey tea
// (LVL 20) as shared history.

export default {
  new: {
    headPat: [
      "Oh? That's a first. Is something wrong?",
      "Easy, now. Did you need something from me?",
    ],
    cheekPoke: [
      "Hm? Something on my face?",
      "You've got my attention. What can I do for you?",
    ],
    lipsTouch: [
      "Whoa. ...Sorry, that's not on the program.",
      "That's a little much, don't you think?",
    ],
    earTouch: ["That tickles. Careful.", "Hey, now. Are you okay?"],
    handTap: [
      "Any trouble? Tell me right away.",
      "Need a hand? I can make a little time.",
    ],
    chestTouch: [
      "Let's keep a little distance, okay?",
      "Hold on. Step back for me.",
    ],
    bellyTouch: [
      "Whoa. Hands back, please.",
      "Easy there. That's a little personal.",
    ],
    hipsTouch: ["No. Hands off, please.", "That's not okay. Let's stop there."],
    upset: [
      "Okay, that's enough. Let's take a breath.",
      "Stop for a second. Is something going on?",
    ],
  },
  known: {
    headPat: [
      "Ha. That's usually my job, you know.",
      "You're the first to try that in a while.",
    ],
    cheekPoke: [
      "What is it, cutie?",
      "You're in a playful mood. Did something good happen?",
    ],
    lipsTouch: ["Ah. ...No. Hands down, okay?", "Let's not, cutie."],
    earTouch: ["Careful, that tickles.", "You're getting brave, aren't you?"],
    handTap: [
      "Cold hands. Did you forget your coat again?",
      "I'm right here. What's up?",
    ],
    chestTouch: ["Hey, a little space.", "That's close. Too close."],
    bellyTouch: [
      "Hey. No poking there.",
      "Ah, not the stomach. Let's keep it friendly.",
    ],
    hipsTouch: ["No. Let's stop there.", "Hands up here, please."],
    upset: ["Okay. That's enough for now.", "Hey. I'm asking nicely. Stop."],
  },
  warm: {
    headPat: [
      "...Don't stop on my account.",
      "Nobody does that for me. ...It's nice.",
    ],
    cheekPoke: [
      "Okay, okay. You've got my attention.",
      "What's that grin for, cutie?",
    ],
    lipsTouch: ["...Hey. Not those. I mean it.", "Off limits, cutie."],
    earTouch: [
      "Hah... That tickles. Easy.",
      "You found a weak spot. Keep it to yourself.",
    ],
    handTap: [
      "Your hands are freezing. Where are your gloves?",
      "I'm here. Did something happen?",
    ],
    chestTouch: ["...That's close.", "Hey. A little space, okay?"],
    bellyTouch: [
      "Hah! Okay, that one caught me off guard.",
      "Hey, I wasn't braced for that. Sneaky, cutie.",
    ],
    hipsTouch: ["No. Let's not.", "Hey. Hands to yourself."],
    upset: ["Okay. Enough. I mean it.", "Hey. Even I have limits."],
  },
  spark: {
    headPat: [
      "...You're spoiling me, cutie.",
      "Keep that up and I won't get any work done.",
    ],
    cheekPoke: [
      "What? ...Don't look at me like that.",
      "You're enjoying this a little too much.",
    ],
    lipsTouch: [
      "...Careful. I might take that seriously.",
      "Cutie... Not here.",
    ],
    earTouch: ["...You know that's not fair.", "That's dangerous, you know."],
    handTap: [
      "...Can I hold on a little longer?",
      "Your hand fits. ...Sorry, that came out on its own.",
    ],
    chestTouch: [
      "...It's not usually this loud.",
      "Careful. I'm not as calm as I look.",
    ],
    bellyTouch: [
      "...Okay. I didn't think that would get to me this much.",
      "Cutie... That one got me. Give me a sec.",
    ],
    hipsTouch: ["...Hey. You're bold today.", "Cutie. ...You're testing me."],
    upset: [
      "Okay, enough. You're making it hard to stay calm.",
      "Stop, stop. I need a second.",
    ],
    heartbeatHold: [
      "Okay, you caught me. Keep that between us, cutie.",
      "Ha... It only does that around you, you know.",
    ],
    lipHold: [
      "Hah... Cutie. You're not making this easy.",
      "Hah... Okay. I'll need a minute before I go back to work.",
    ],
    handHold: [
      "...I liked that more than I should admit.",
      "Already? ...Okay. I'll take what I can get.",
    ],
  },
  close: {
    headPat: [
      "Mm. Don't stop, cutie. I've earned a little of this.",
      "...I could get used to this. Actually, I already have.",
    ],
    cheekPoke: [
      "What's that look, cutie? Go on, I'm all yours.",
      "Careful. I poke back, and I don't stop at one.",
    ],
    lipsTouch: [
      "Cutie. If you want a kiss, all you have to do is ask.",
      "Nobody's watching this time. ...So go on.",
    ],
    earTouch: [
      "Hah... You know exactly what that does to me, cutie.",
      "...Do that again and I'm getting you back. Right here.",
    ],
    handTap: [
      "There you are. I've been waiting all day for this.",
      "Hold on as long as you like. Everything else can wait.",
    ],
    chestTouch: [
      "I stopped pretending to be calm around you, cutie. Feel for yourself.",
      "...Leave your hand there. I like knowing you're close.",
    ],
    bellyTouch: [
      "Keep that up and I'll have to play a trick on you.",
      "...Don't move. I like you right there.",
    ],
    hipsTouch: [
      "Bold, cutie. ...Fine. Two can play that game.",
      "Careful, cutie. I always keep a trick up my sleeve.",
    ],
    heartbeatHold: [
      "Every time. You'd think I'd be used to it by now.",
      "Ha... You're the one person I can't fool, aren't you?",
    ],
    lipHold: [
      "...Ha. I'm trying very hard to behave right now, cutie.",
      "Mm. One of these days I'll stop being patient about that.",
    ],
    handHold: [
      "I'd rather put you in the passenger seat and drive somewhere quiet.",
      "Sorry, I'm not letting go yet. The budget can wait.",
    ],
    caughtTease: [
      "Ah... Not yet, cutie. I want to do this properly.",
      "Hey, hey. ...Not yet. Believe me, it isn't that I don't want to.",
    ],
  },
  bound: {
    heartbeatHold: [
      "You know that rhythm by now, cutie. You've fallen asleep to it.",
      "Still loud. Some things don't settle down, even now.",
    ],
    lipHold: [
      "Careful, cutie. You know where that leads now.",
      "Keep that up and nobody's getting any work done. Least of all me.",
    ],
    handHold: [
      "I used to work so I wouldn't have to think. Now I just think about you.",
      "Stay over. I'll make honey tea, just the two of us.",
    ],
    breakAway: [
      "Hah... Okay. Okay, cutie. You win this round. Let me breathe.",
      "Whew... I'm supposed to be the magician here. Where did you learn that?",
    ],
    teaseLetGo: [
      "Ah... Stopping there, cutie? That's cruel. ...I'll remember it when it's my turn.",
      "Hah... You're leaving me like this? ...Okay. Then you'll have to take responsibility later.",
    ],
  },
};
