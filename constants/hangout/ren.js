// Ren's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/ren.js.
//
// Spoken lines, so normal capitalization; "Senpai" capped when spoken, Haru
// is "that clown". Flat complaint ("harassment") is his armor; warmth comes
// out as "don't make it a thing". Guarded spots (lips, chest, hips) stay a
// flat no until spark, where he gets flustered and loses his footing.
// Holds (spark+): flustered, never upset; the monitor is a stat he can't
// fake. Bound treats intimacy as shared history (the padlocked door).

export default {
  new: {
    headPat: ["...What are you doing.", "Don't. I barely know you."],
    cheekPoke: ["Did you just poke me?", "...Can I help you?"],
    lipsTouch: ["Don't. That's harassment.", "Okay. No. Hands down, Senpai."],
    earTouch: ["Don't touch the earrings.", "...That's my ear. Why."],
    handTap: [
      "Careful. My RSI's bad enough already.",
      "...I'm kind of in the middle of something.",
    ],
    chestTouch: ["Back up.", "Personal space. Look it up."],
    bellyTouch: [
      "Hey. Hands off the stomach.",
      "...That's a whole new category of harassment.",
    ],
    hipsTouch: ["Hey. No.", "Okay, that's actual harassment."],
    upset: ["Stop. I'm reporting this.", "...Keep doing that and I'm leaving."],
  },
  known: {
    headPat: [
      "You again. ...Why does everyone here touch people.",
      "I'm not one of the animals, you know.",
    ],
    cheekPoke: [
      "What.",
      "Is there something on my face, or are you just bored?",
    ],
    lipsTouch: ["Senpai. ...Why.", "...Don't. Just don't."],
    earTouch: ["Leave the studs alone.", "That tickles. Stop it."],
    handTap: [
      "Watch the wrist, Senpai. It's already wrecked from gaming.",
      "...What? Do you need something?",
    ],
    chestTouch: ["Too close. Back up.", "Hey. What are you doing."],
    bellyTouch: [
      "Senpai. Personal space. Look it up.",
      "Is this a bit? I'm not laughing.",
    ],
    hipsTouch: ["Senpai. No.", "Don't push it."],
    upset: [
      "Okay, stop. That's enough.",
      "Is this a prank? Did that clown put you up to this?",
    ],
  },
  warm: {
    headPat: [
      "...Fine. Don't make it a thing.",
      "You're doing that again. ...Whatever. Keep going.",
    ],
    cheekPoke: [
      "What. I'm in the middle of a raid.",
      "Pfft. Did you seriously just poke me?",
    ],
    lipsTouch: [
      "Hey. ...Nope. Those aren't public property.",
      "...Don't. I'm not built for this.",
    ],
    earTouch: [
      "Quit it. That tickles.",
      "Pull one out and you're buying the replacement.",
    ],
    handTap: [
      "My hand's fine. ...Okay, it's a little sore. Thanks.",
      "What. Don't make me pause.",
    ],
    chestTouch: ["...That's close, Senpai.", "Personal space. Look it up."],
    bellyTouch: [
      "Whoa. ...Okay, that was a jump scare.",
      "Pfft. Hey. Don't. ...That doesn't count as a laugh.",
    ],
    hipsTouch: ["Senpai. Seriously.", "Nope. Not happening."],
    upset: [
      "Okay, that's it. Go poke that clown instead.",
      "Stop. I mean it. Give me a minute.",
    ],
  },
  spark: {
    headPat: [
      "...Okay. That's actually nice. Weird.",
      "...You're gonna make me lose focus, Senpai.",
    ],
    cheekPoke: [
      "What. I'm not red. It's the lighting.",
      "...Why are you looking at me like that.",
    ],
    lipsTouch: [
      "...Senpai. You can't just do that.",
      "Wait. I. ...Give me a second.",
    ],
    earTouch: ["Hey. That's... unfair.", "Stop. My face is getting hot."],
    handTap: [
      "...You can hold it. I guess. Whatever.",
      "I'll play one-handed. It's fine. Don't let go.",
    ],
    chestTouch: ["...Don't. You'll hear it.", "Yeah, it's fast. Happy now?"],
    bellyTouch: [
      "...Senpai. That's a critical hit. Not cool.",
      "Okay. I'm fine. That was nothing. ...Don't do it again.",
    ],
    hipsTouch: [
      "Senpai. ...Seriously? Here?",
      "Whoa. Okay. I'm not ready for that.",
    ],
    upset: [
      "Okay, stop. I can't think when you do that.",
      "Mercy. Seriously. My HP's at zero.",
    ],
    heartbeatHold: [
      "That's not what you think it is. ...Fine. It is.",
      "...Okay. You felt that. Let's just not talk about it.",
    ],
    lipHold: [
      "...Senpai. You can't just do that and walk away.",
      "...Okay. My brain's buffering. Don't do anything else.",
    ],
    handHold: [
      "You let go. ...I mean. Fine. Whatever.",
      "My hand's all sweaty now. That's on you.",
    ],
  },
  close: {
    headPat: [
      "...I'm not complaining. Just so you know.",
      "This is my save point now. Don't move.",
    ],
    cheekPoke: [
      "Poke me again, Senpai. Two can play that game.",
      "Fine, I'm red. ...It's your fault, you know.",
    ],
    lipsTouch: [
      "...Okay. Again. I wasn't ready that time.",
      "...Careful, Senpai. I might start doing it back.",
    ],
    earTouch: [
      "Pfft. Okay, you found my weak spot. Go ahead, abuse it.",
      "...Senpai. That's cheating.",
    ],
    handTap: [
      "Hold on, then. ...Yeah. Like that.",
      "You've got my good hand. Don't let go of it.",
    ],
    chestTouch: [
      "Go ahead, listen. It's been like that since you showed up.",
      "Leave your hand there. I'm not embarrassed anymore. ...Mostly.",
    ],
    bellyTouch: [
      "Pfft. Okay, you win this round. Go again.",
      "I'm not even dodging anymore. Figure out what that means.",
    ],
    hipsTouch: [
      "...Okay. I'm not saying no anymore.",
      "You're doing that on purpose. ...Fine.",
    ],
    heartbeatHold: [
      "Congrats. You found the one stat I can't fake.",
      "Yeah, it's fast. You can stop looking so pleased with yourself.",
    ],
    lipHold: [
      "...Senpai. That wasn't fair.",
      "...Great. Now I'm not gonna be able to focus on anything else.",
    ],
    handHold: [
      "My wrist feels better. I'm choosing not to question it.",
      "...Already? Rematch. Gimme your hand.",
    ],
    caughtTease: [
      "Whoa. Hey. ...Not yet. I'm not, like, saying never.",
      "Okay, that's. No. Not yet, Senpai. Let me catch up first.",
    ],
  },
  bound: {
    heartbeatHold: [
      "You already know what it sounds like. Why are you still checking?",
      "Still fast. Even after everything. Kind of embarrassing, honestly.",
    ],
    lipHold: [
      "...You know what that does to me now. That's cheating.",
      "If you're gonna do that, lock the door first. I've got plenty of padlocks.",
    ],
    handHold: [
      "Don't let go yet. ...Okay, now you can. Actually, no.",
      "You know you're the only one I'd do this with, right?",
    ],
    breakAway: [
      "Time out. I'm. Okay. Time out. ...You did that on purpose.",
      "Hah... Wait. I can't. Just... gimme a second.",
    ],
    teaseLetGo: [
      "...Seriously? You're stopping there? That's just mean.",
      "...Cool. Cool. So I'm just stuck like this now. Thanks a lot, Senpai.",
    ],
  },
};
