// Jo's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/jo.js.
//
// Calm, measured, caretaking even when he's the one being touched: he turns a
// tap into "any trouble?". "Cutie" from known on. No gendered self-reference
// (his stigma form is still him). Guarded spots (lips, chest, hips) stay
// gently firm until spark.

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
      "Ah, no. Let's not.",
      "That's a little much for a first meeting, don't you think?",
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
    lipsTouch: ["Hey. Not that.", "Let's not, cutie."],
    earTouch: ["Careful, that tickles.", "You're getting brave, aren't you?"],
    handTap: [
      "Cold hands. Did you forget your coat again?",
      "I'm right here. What's up?",
    ],
    chestTouch: ["Hey, a little space.", "That's close, cutie."],
    bellyTouch: [
      "Hey. No poking there, cutie.",
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
    lipsTouch: ["...Hey. Careful.", "Not that one, cutie."],
    earTouch: [
      "Hah... That tickles. Don't tell the others.",
      "You found a weak spot. Keep it to yourself.",
    ],
    handTap: [
      "You're freezing. Here, let me warm them up.",
      "I'm here. Did something happen?",
    ],
    chestTouch: ["...That's close.", "Hey. A little space, okay?"],
    bellyTouch: [
      "Hah! Okay, that one caught me off guard.",
      "Hey, I wasn't braced for that. Sneaky, cutie.",
    ],
    hipsTouch: ["No. Let's not.", "Hey. Hands to yourself."],
    upset: ["Okay. Enough. I mean it.", "Hey. Even I have limits, cutie."],
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
      "There you are. I've been waiting all day for this one.",
      "Hold on as long as you like. I cleared my schedule for you. Don't tell Mio.",
    ],
    chestTouch: [
      "I stopped pretending to be calm around you, cutie. Feel for yourself.",
      "...Leave your hand there. I like knowing you're close.",
    ],
    bellyTouch: [
      "Cutie... Keep that up and I'll have to play a trick on you.",
      "...Don't move. I like you right there.",
    ],
    hipsTouch: [
      "Bold, cutie. ...Fine. Two can play that game.",
      "Careful, cutie. A magician always has something up his sleeve.",
    ],
  },
};
