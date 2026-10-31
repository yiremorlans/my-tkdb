// Mio's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/mio.js.
//
// Dry, kind, undercuts himself; leans on canon beats (yawns, Shion wrangling,
// repairs, "safety first", the bug-on-your-head bit). Never "fragile".
// Guarded spots (lips, chest, hips) stay serious until spark.

export default {
  new: {
    headPat: ["Hm? ...Was there a bug on my head?", "Uh. Okay. Hi."],
    cheekPoke: [
      "Hm? Oh, did I nod off?",
      "...Do I have grease on my face or something?",
    ],
    lipsTouch: ["Whoa. Hey, let's not.", "...Okay, that's a no."],
    earTouch: ["Hm? Sorry, I was miles away.", "Ha. That tickles. Don't."],
    handTap: [
      "Careful, my hands are covered in oil.",
      "Need something fixed? Get in line. ...Kidding. What is it?",
    ],
    chestTouch: [
      "Hey. Personal space.",
      "...Let's keep a little distance, okay?",
    ],
    bellyTouch: [
      "Whoa. Hey, that's not a switch.",
      "Uh, hi. Hands to yourself, maybe?",
    ],
    hipsTouch: ["Whoa. Hands off.", "Okay. That's enough of that."],
    upset: [
      "Okay, okay. I get it. Stop.",
      "Sigh... Shion put you up to this, didn't he?",
    ],
  },
  known: {
    headPat: ["...You're doing that again.", "Did Shion dare you to do that?"],
    cheekPoke: [
      "Yaaawn... Hm? I'm awake. I'm awake.",
      "That's not how you wake someone up, you know.",
    ],
    lipsTouch: ["Hey. Not that.", "...Let's pretend that didn't happen."],
    earTouch: [
      "Hah, that tickles. Quit it.",
      "Hm? Sorry, I was counting parts in my head.",
    ],
    handTap: [
      "Hold still, there's a splinter. ...Nope, my mistake.",
      "Here. Hold this for me a sec.",
    ],
    chestTouch: ["Little close there.", "...Okay, back up a bit."],
    bellyTouch: [
      "If you're checking whether I ate: yes. Once.",
      "Hey. Don't. I was almost awake.",
    ],
    hipsTouch: ["Hey. No.", "That's a firm no."],
    upset: [
      "Okay, stop. I'm not in the mood.",
      "Sigh... I get enough of this from Shion.",
    ],
  },
  warm: {
    headPat: [
      "...Huh. That's nice, actually.",
      "Nobody does that for me, you know. ...Thanks.",
    ],
    cheekPoke: ["What? Do I look that tired?", "Ha. Okay, I'm awake now."],
    lipsTouch: ["...Hey. Don't.", "That one's off limits. Sorry."],
    earTouch: [
      "That's ticklish. Don't tell Shion.",
      "Okay, you found it. Keep it to yourself.",
    ],
    handTap: [
      "My hands are a mess. ...You don't mind, huh.",
      "Cold? Here, take my hand warmer. Shake it when it cools.",
    ],
    chestTouch: ["...That's close.", "Hey. Let's keep a little space, okay?"],
    bellyTouch: [
      "Hah! Hey. Warn a guy first.",
      "...Huh. You startled me. That doesn't happen much.",
    ],
    hipsTouch: ["Hey.", "Nope."],
    upset: ["Okay. That's enough for now.", "Sigh... You and Shion, I swear."],
  },
  spark: {
    headPat: [
      "...Keep that up and I'll fall asleep on you.",
      "Ha. Okay. You can do that whenever.",
    ],
    cheekPoke: [
      "What's that face for? ...Don't answer that.",
      "You're grinning. I'm in trouble, huh.",
    ],
    lipsTouch: [
      "...Hey. That's not fair.",
      "You can't just... Okay. Give me a second.",
    ],
    earTouch: [
      "...Ah. Found the weak spot.",
      "Don't. I'll lose count of every screw I've got.",
    ],
    handTap: [
      "Your hands are cold. Here, take mine.",
      "...I'll hold on. Safety first, right?",
    ],
    chestTouch: [
      "...Yeah, it's running fast. Don't read into it.",
      "Careful. That's one thing I can't fix.",
    ],
    bellyTouch: [
      "...Hey. Now I'm wide awake. Thanks a lot.",
      "...Don't look so pleased. I'll recover.",
    ],
    hipsTouch: ["...You're bold today. Okay.", "Whoa. Hey. ...Not here."],
    upset: [
      "Okay, stop, stop. My face is hot enough.",
      "Give me a minute. I need to cool down.",
    ],
  },
  close: {
    headPat: [
      "Mm. Keep going. I'm not asleep. ...Yet.",
      "You're the only one who gets to do that. Don't tell Shion it's an option.",
    ],
    cheekPoke: [
      "You're grinning. ...Okay, I'm grinning too. Happy?",
      "Go ahead. I'm awake now, and I'm not complaining.",
    ],
    lipsTouch: [
      "...I told you that wasn't fair. Do it again anyway.",
      "...Hm. One more. For quality control.",
    ],
    earTouch: [
      "Still my weakest spot. You never forget it, huh.",
      "Lean in closer if you're gonna do that. I won't stop you.",
    ],
    handTap: [
      "Here. Mine's warmer. Hang on to it a while.",
      "Don't let go yet. The next job can wait a minute.",
    ],
    chestTouch: [
      "...Yeah. Running fast again. I've stopped pretending it's nothing.",
      "Stay there. ...It's quieter in my head when you do that.",
    ],
    bellyTouch: [
      "Hah. Okay, okay. I'm awake. Don't move, though.",
      "...You've got good hands. Should I put you on the crew?",
    ],
    hipsTouch: [
      "Hm. Bold. ...Lucky for you, I'm off the clock.",
      "...Okay. The workshop can wait. Come here.",
    ],
  },
};
