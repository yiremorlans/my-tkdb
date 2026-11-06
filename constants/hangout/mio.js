// Mio's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/mio.js.
//
// Dry, kind, undercuts himself; leans on canon beats (yawns, Shion wrangling,
// repairs, "safety first", the bug-on-your-head bit). Never "fragile".
// Guarded spots (lips, chest, hips) stay serious until spark.
// Holds (spark+): reads his own pulse like a gauge; the bound hand hold
// isn't sleepy (user, 2026-11-06): his canon "One more push" (LVL 3)
// given up for the MC, and the busy hands. No holiday voicelines.
//
// Removable article (docs/hangout-activity.md §4.2): his work apron, work
// outfit only, over the chest and belly spots. apronPat is a tap on it
// (every tier, so a tap never falls back to placeholder lines); from spark
// (user, 2026-11-05) a double-tap unties it (apronOff), and chest and belly
// move onto the tank top under it. Spark is surprised he let it happen;
// close hints, bound treats it as routine.

export default {
  new: {
    headPat: ["Hm? ...Was there a bug on my head?", "Uh. Okay. Hi."],
    cheekPoke: [
      "Hm? Oh, did I nod off?",
      "...Do I have grease on my face or something?",
    ],
    lipsTouch: ["Whoa. Hey, let's not.", "Hm?! ...Sorry. Not the lips."],
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
    apronPat: [
      "Hm? The apron? It's for work. Nothing exciting.",
      "Whoa. Never seen an apron before?",
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
    lipsTouch: ["...Hey. Hands off.", "...Let's pretend that didn't happen."],
    earTouch: [
      "Hah, that tickles. Quit it.",
      "Hm? Sorry, my head was still on a repair job.",
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
    apronPat: [
      "Curious? It's all scrap. Not worth the digging.",
      "Hm? It's just spare parts. You'll be disappointed.",
    ],
    hipsTouch: ["Hey. No.", "That's a firm no."],
    upset: [
      "Okay, stop. I'm not in the mood.",
      "Knock it off. I have a lot of work to do.",
    ],
  },
  warm: {
    headPat: [
      "...Huh. That's nice, actually.",
      "Nobody does that for me, you know. ...Thanks.",
    ],
    cheekPoke: ["What? Do I look that tired?", "Ha. Okay, I'm awake now."],
    lipsTouch: ["...Hey. Don't. Hands down.", "That's off limits. Sorry."],
    earTouch: [
      "I'm ticklish. Stop that.",
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
    apronPat: [
      "Had this apron since first year. It's held up better than I have.",
      "Don't tug too hard. That strap's been sewn back on more than once.",
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
      "...I'll hold on. Just for a bit.",
    ],
    chestTouch: [
      "...Yeah, it's running fast. Guess you're the reason.",
      "Careful. That's one thing I can't fix.",
    ],
    bellyTouch: [
      "...Hey. Now I'm wide awake. Thanks a lot.",
      "...Don't look so pleased. I'll recover.",
    ],
    apronPat: [
      "Looking for something in my pockets? ...You could just ask.",
      "Okay, now I'm the one who's curious. What are you doing?",
    ],
    apronOff: [
      "Keep that up and I'm signing you up as an artisan. Apron included.",
      "Huh. So that's how you get me to stop working.",
    ],
    hipsTouch: ["...You're bold today. Okay.", "Whoa. Hey. ...Not here."],
    upset: [
      "Okay, stop, stop. My face is hot enough.",
      "Give me a minute. I need to cool down.",
    ],
    heartbeatHold: [
      "Huh. Thought I could keep that steady. Guess not around you.",
      "...Okay. You caught me. Don't make me say it.",
    ],
    lipHold: [
      "...Huh. My brain just went blank. That never happens.",
      "Okay. That's going to keep me up. And I really don't need the help.",
    ],
    handHold: [
      "Your hand's warmer now. ...Guess that's my doing.",
      "That's the first time I've stood still all day. You should do that more.",
    ],
  },
  close: {
    headPat: [
      "Mm. Keep going. I'm not asleep. ...Yet.",
      "...That's nice. Feels like I'm actually off the clock for once.",
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
    apronPat: [
      "Find anything? ...Take your time looking.",
      "Mm. You've got that look. ...Go on, then.",
    ],
    apronOff: [
      "You're getting good at that. ...I'm not complaining.",
      "Hah. And here I thought I'd get one more repair in.",
    ],
    hipsTouch: [
      "Hm. Bold. ...Lucky for you, I'm off the clock.",
      "...Okay. The workshop can wait. Come here.",
    ],
    heartbeatHold: [
      "Fast again? Yeah. Hasn't slowed down since you got close.",
      "You keep checking it like a gauge. The reading's the same every time, you know. It's you.",
    ],
    lipHold: [
      "...Okay. I'm not getting any work done for the rest of the day.",
      "Hm. You stopped right before I was gonna do something about it.",
    ],
    handHold: [
      "You're the only call I don't mind getting at any hour.",
      "Let me walk you back. ...Mostly so I can hold your hand a little longer.",
    ],
    caughtTease: [
      "Hah... Okay, stop there. Not yet. I don't rush the things I want to get right.",
      "Hey. Easy. ...Not yet. Don't look at me like that, I'm trying to be responsible.",
    ],
  },
  bound: {
    apronPat: [
      "I know that tug. ...Give me five minutes to finish this, then I'm yours.",
      "Mm. You don't have to ask anymore.",
    ],
    apronOff: [
      "Hah. You don't even wait for me to finish the job anymore.",
      "You're the only one who ever gets me out of this thing.",
    ],
    heartbeatHold: [
      "Still runs fast around you. I've stopped trying to fix it.",
      "Don't need a gauge for that. You already know the reading.",
    ],
    lipHold: [
      "Hm. You know that's not where you usually stop.",
      "Careful. Keep that up and I'll be awake all night.",
    ],
    handHold: [
      "The work can wait. ...Let's go for a walk. I'm not letting go, so you're coming too.",
      "My hands are full all day. This is the only thing I never want to put down.",
    ],
    breakAway: [
      "Okay. Okay. I need to cool down before something in here overheats. ...Me. It's me.",
      "Hah... Give me a sec. You took me apart faster than I take apart a clock.",
    ],
    teaseLetGo: [
      "Hah... You shut it off mid-cycle. That's bad for the parts, you know.",
      "Hm. Fine. I'll be patient. ...For about five minutes.",
    ],
  },
};
