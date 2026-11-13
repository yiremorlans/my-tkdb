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
//
// Removable article (docs/hangout-activity.md §4.2): his phone, out only in
// his m_phone poses, held over the left hand spot. phonePat is a tap on it in
// his hand; from warm a double-tap takes it away (phoneOff). The phone is his
// sanctuary, so warm carries the reluctance and later tiers let it go.

export default {
  new: {
    headPat: ["...What are you doing.", "Don't. I barely know you."],
    cheekPoke: ["Did you just poke me?", "...Can I help you?"],
    lipsTouch: ["Don't. That's harassment.", "Okay. No. Hands down, Senpai."],
    earTouch: ["Don't touch the earrings.", "...That's my ear. Why."],
    handTap: [
      "...My RSI's bad enough already.",
      "...I'm kind of in the middle of something.",
    ],
    chestTouch: ["Back up.", "Personal space. Look it up."],
    bellyTouch: [
      "Hey. Hands off the stomach.",
      "...That's a whole new category of harassment.",
    ],
    phonePat: [
      "Hey. Hands off the phone. I'm mid-raid.",
      "...You're going to smudge the screen.",
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
    phonePat: [
      "Senpai. If I lose this run, it's on you.",
      "Don't. It's loading. ...Okay, fine. You can watch.",
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
      "...What. Is this a new bit?",
    ],
    chestTouch: ["...That's close, Senpai.", "Personal space. Look it up."],
    bellyTouch: [
      "Whoa. ...Okay, that was a jump scare.",
      "Pfft. Hey. Don't. ...That doesn't count as a laugh.",
    ],
    phonePat: [
      "You want to do it? Okay. Ten-pull. If it's trash, I'm blaming you.",
      "Don't even think about it, Senpai. I know that look.",
    ],
    phoneOff: [
      "Hey. Give that back. That's theft, Senpai. Theft and harassment.",
      "Senpai. My streak. Hand it over before it resets.",
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
      "I'll play one-handed. It's fine.",
    ],
    chestTouch: ["...Don't. You'll hear it.", "Yeah, it's fast. Happy now?"],
    bellyTouch: [
      "...Senpai. That's a critical hit. Not cool.",
      "Okay. I'm fine. That was nothing. ...Don't do it again.",
    ],
    phonePat: [
      "Okay, okay. It's going away. ...Happy?",
      "You want my attention that bad? ...Okay. One sec.",
    ],
    phoneOff: [
      "...You're really not giving that back, huh.",
      "Hey. ...Whatever. It was a bad run anyway.",
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
      "...O-Okay. That was... Again. I wasn't ready that time.",
      "...Senpai. I might, uh... start doing it back.",
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
    phonePat: [
      "Relax. I'm not even playing. It's just open.",
      "It's just the menu screen. I wasn't playing. I was waiting on you.",
    ],
    phoneOff: [
      "...Okay. Just you and me, then.",
      "Fine. But if you break my streak, you're making it up to me.",
    ],
    hipsTouch: [
      "...S-Senpai. I'm not saying no. I'm just... not ready to say yes.",
      "You're doing that on purpose. ...My face is hot.",
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
    phonePat: [
      "You already know the passcode. ...You changed it last time, actually.",
      "I wasn't playing. I just wanted you to come over here.",
    ],
    phoneOff: [
      "Every time. ...I'm not even mad anymore.",
      "Phone's gone. So what are you gonna do with me?",
    ],
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
    // Past the crest (holds.js bliss, preview only): gasped out one after
    // another until a choice is picked; then his comedown line for the type
    // picked. Labels stay under 30 characters.
    blissPlead: [
      "Hah... Senpai... You're driving me crazy...",
      "Look what you're doing to me... Hah... This is so unfair...",
      "I can't... think... Senpai, don't stop...",
      "Hah... It's way too fast... You did this...",
    ],
    blissChoices: {
      kind: "Tell him you've got him",
      playful: "Call it a critical hit",
      bold: "Pull him closer",
    },
    blissAfter: {
      kind: [
        "...Hah. Okay. You didn't let go. ...Don't tell anyone I needed that.",
        "...I'm back. Mostly. Stay like this a little longer, Senpai.",
      ],
      playful: [
        "...Critical hit. Yeah. Thanks for the commentary, Senpai.",
        "...You're the worst. ...Do it again sometime.",
      ],
      bold: [
        "...Okay. You don't get to look that pleased about it.",
        "...Hah. Closer, huh. ...Yeah. I'm not complaining.",
      ],
    },
  },
};
