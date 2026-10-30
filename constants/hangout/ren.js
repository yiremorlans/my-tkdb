// Ren's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/ren.js.
//
// Spoken lines, so normal capitalization; "Senpai" capped when spoken, Haru
// is "that clown". Flat complaint ("harassment") is his armor; warmth comes
// out as "don't make it a thing". Guarded spots (lips, chest, hips) stay a
// flat no until spark, where he gets flustered and loses his footing.

export default {
  new: {
    headPat: ["...What are you doing.", "Don't. That's harassment."],
    cheekPoke: ["Did you just poke me?", "...Can I help you?"],
    lipsTouch: ["Whoa. No.", "Hands off. Seriously."],
    earTouch: ["Don't touch the earrings.", "...That's my ear. Why."],
    handTap: ["Careful. My RSI's bad enough already.", "...I'm kind of in the middle of something."],
    chestTouch: ["Back up.", "Personal space. Look it up."],
    bellyTouch: ["Hey. Hands off the stomach.", "...That's a whole new category of harassment."],
    hipsTouch: ["Hey. No.", "Okay, that's actual harassment."],
    upset: ["Stop. I'm reporting this.", "...Keep doing that and I'm leaving."],
  },
  known: {
    headPat: ["You again. ...Why does everyone here touch people.", "I'm not one of the animals, you know."],
    cheekPoke: ["What.", "Is there something on my face, or are you just bored?"],
    lipsTouch: ["No. Absolutely not.", "...Don't. Just don't."],
    earTouch: ["Leave the studs alone.", "That tickles. Stop it."],
    handTap: ["Watch the wrist, Senpai. That's my whole livelihood.", "...What? Do you need something?"],
    chestTouch: ["Too close. Back up.", "Hey. What are you doing."],
    bellyTouch: ["Senpai. Personal space. Look it up.", "Is this a bit? I'm not laughing."],
    hipsTouch: ["Senpai. No.", "Don't push it."],
    upset: ["Okay, stop. That's enough.", "Is this a prank? Did that clown put you up to this?"],
  },
  warm: {
    headPat: ["...Fine. Don't make it a thing.", "You're doing that again. ...Whatever. Keep going."],
    cheekPoke: ["What. I'm busy losing this raid.", "Pfft. Did you seriously just poke me?"],
    lipsTouch: ["Hey. ...Not funny.", "No. Don't."],
    earTouch: ["Quit it. That tickles.", "Pull one out and you're buying the replacement."],
    handTap: ["My hand's fine. ...Okay, it's a little sore. Thanks.", "You can leave it there. I can play one-handed."],
    chestTouch: ["...That's close, Senpai.", "Hey. Hands. I'm not mad. Just, hands."],
    bellyTouch: ["Whoa. ...Okay, that was a jump scare.", "Pfft. Hey. Don't. ...That doesn't count as a laugh."],
    hipsTouch: ["Senpai. Seriously.", "Nope. Not happening."],
    upset: ["Okay, now that's harassment.", "Stop. I mean it. Give me a minute."],
  },
  spark: {
    headPat: ["...Okay. That's actually nice. Don't make it a thing.", "Keep doing that and I won't get anything done. Not that I was going to."],
    cheekPoke: ["What. I'm not red. It's the lighting.", "...Why are you looking at me like that."],
    lipsTouch: ["...Senpai. You can't just do that.", "Wait. I. ...Give me a second."],
    earTouch: ["Hey. That's... unfair.", "Stop. My face is getting hot."],
    handTap: ["...You can hold it. I guess. Whatever.", "I'll play one-handed. It's fine. Don't let go."],
    chestTouch: ["...Don't. You'll hear it.", "My heart rate is none of your business. ...It's fine."],
    bellyTouch: ["...Senpai. That's a critical hit. Not cool.", "Okay. I'm fine. That was nothing. ...Don't do it again."],
    hipsTouch: ["Senpai. ...Seriously? Here?", "Whoa. Okay. I'm. Not ready for that."],
    upset: ["Okay, stop. I can't think when you do that.", "Mercy. Seriously. My HP's at zero."],
  },
};
