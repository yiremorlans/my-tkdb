// Lyca's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/lyca.js.
//
// Wary of strangers and won by patience: blunt, short, scent-first. No bite
// threats (the scars are him stopping himself from biting). The earring is
// his and stays his; the ears popping out is canon when he's rattled. Never
// infantilized. Guarded spots (lips, chest, hips) stay serious until spark,
// where his flustered tell is canon's: the weird stomach, the squeezy heart.
// Holds (spark+): stays flustered, never upset (touch-averse); bound leans
// on canon LVL 24/25 ("Sleep here", living with humans).

export default {
  new: {
    headPat: [
      "Hey! Stay back. I don't even know you.",
      "...What're you doing? Stop it.",
    ],
    cheekPoke: ["Quit it! What's your deal?", "Huh? Why'd you poke me?"],
    lipsTouch: [
      "H-Hey! Not my lips! Quit it!",
      "Hey! ...Don't. Back up a little.",
    ],
    earTouch: ["Don't touch that!", "Hands off my earring!"],
    handTap: [
      "...What. You want something?",
      "Hm? ...You smell okay, I guess.",
    ],
    chestTouch: ["Back off! I don't know you!", "Hey! Too close!"],
    bellyTouch: [
      "Hey! What're you poking me there for?!",
      "Get your hand off. Now.",
    ],
    hipsTouch: ["What the hell?!", "Don't! Stay back!"],
    upset: ["Stop it! Go away!", "Quit it already! I'm gonna get mad!"],
  },
  known: {
    headPat: ["...Okay. Just a little.", "Huh. You're not scared of me?"],
    cheekPoke: ["Hey! What was that for?", "Quit poking! I'm not a toy."],
    lipsTouch: ["Don't. That's weird.", "Wh-What?! N-Not my lips, dummy!"],
    earTouch: [
      "Not the earring. I've had it forever.",
      "Careful! You'll make my ears pop out.",
    ],
    handTap: [
      "...You smell like you. That's good.",
      "What? You wanna go somewhere?",
    ],
    chestTouch: ["Hey. Too close.", "Back off. I don't know you that well yet."],
    bellyTouch: [
      "Hey! Quit it. That's my stomach.",
      "Stop poking me.",
    ],
    hipsTouch: ["Hey! Don't do that!", "No. Quit it."],
    upset: ["Stop! You're bugging me!", "I said quit it! Back off!"],
  },
  warm: {
    headPat: [
      "...Hm. That's okay. Do it again.",
      "You're the only one who gets to do that. Got it?",
    ],
    cheekPoke: [
      "Hey! ...Heh. I'm getting you back next time.",
      "What? Is there food on my face?",
    ],
    lipsTouch: [
      "...Whoa. No. Hands away from my mouth.",
      "Hey. Not that, okay?",
    ],
    earTouch: [
      "Careful with that. It's important.",
      "Hey, that tickles! Quit it!",
    ],
    handTap: ["Hm? ...Did you need something?", "C'mon. Let's go somewhere."],
    chestTouch: ["Hey. Too close, okay?", "...Back up a little. Please."],
    bellyTouch: [
      "Whoa! ...Don't sneak up on me like that.",
      "Hey! You almost made my tail pop out!",
    ],
    hipsTouch: ["Hey! Don't.", "That's not okay. Quit it."],
    upset: [
      "Okay, stop! You're bugging me now.",
      "Keep that up and I'm leaving. I mean it.",
    ],
  },
  spark: {
    headPat: ["...I like that. A lot.", "Do it more. ...I mean, if you want."],
    cheekPoke: [
      "H-hey! My face is all hot now. Why?!",
      "...You smell sweeter than usual. Stop it.",
    ],
    lipsTouch: [
      "W-what're you doing?! My stomach's all weird now!",
      "...Don't. I dunno what happens if you do that.",
    ],
    earTouch: [
      "Ngh... My ears are gonna pop out. It's your fault.",
      "Hey! That's... that's not fair.",
    ],
    handTap: [
      "...Your hand's warm. You can leave it there.",
      "C'mon. I'm not letting go, so keep up.",
    ],
    chestTouch: [
      "H-hey, don't! My heart's going all squeezy!",
      "You hear that? ...That's your fault. Don't look so proud.",
    ],
    bellyTouch: [
      "H-hey! ...Okay. Ten seconds. That's it.",
      "Dummy. Don't just do that out of nowhere.",
    ],
    hipsTouch: [
      "W-whoa! Is that a human thing?! Is that allowed?!",
      "Hey! ...My face is all hot. Quit it.",
    ],
    upset: [
      "Stop! I can't think when you do that!",
      "Okay, enough! My stomach's all weird!",
    ],
    heartbeatHold: [
      "...Fine. It does that when you're around. Happy?",
      "Hey, my heart's not s'posed to go that fast when I'm not even running. ...Is it?",
    ],
    lipHold: [
      "...My face is so hot right now. Don't look.",
      "Hey... why'd you stop? ...Forget I said that.",
    ],
    handHold: [
      "...You let go. How come? I wasn't done.",
      "...I didn't even wanna pull away. That's weird, right?",
    ],
  },
  close: {
    headPat: [
      "Mm. More. Don't stop till I say.",
      "...You're the only one I let do that. You know that, right?",
    ],
    cheekPoke: [
      "Heh. My face is hot again. I don't care anymore.",
      "You do that 'cause you like my face. Don't even deny it.",
    ],
    lipsTouch: [
      "...My stomach's weird again. I think I like it now.",
      "Do that again. I wanna know what happens.",
    ],
    earTouch: [
      "There go my ears again. ...Fine. Only you get to touch 'em.",
      "Careful with the earring. ...The ear's okay. Do the ear.",
    ],
    handTap: [
      "C'mon, walk with me. You hold on the whole way. That's the rule.",
      "Your scent's on my hand now. ...Good. Leave it.",
    ],
    chestTouch: [
      "My heart's all squeezy. It's the good kind now. Stay.",
      "Closer. I wanna get your scent all over me.",
    ],
    bellyTouch: [
      "Okay. Twenty seconds this time. ...Thirty.",
      "Mm... Don't stop. I'm not mad, I'm just... warm.",
    ],
    hipsTouch: [
      "I still dunno if that's allowed. ...Don't care. Do it again.",
      "Heh. You're bold. I like bold, when it's you.",
    ],
    heartbeatHold: [
      "Yeah, it's loud. It's always loud near you. I don't hate it anymore.",
      "It's not scared, it's just squeezy. There's a difference.",
    ],
    lipHold: [
      "My ears almost popped out. ...I didn't mind.",
      "...Next time, don't stop so fast. I wasn't gonna run.",
    ],
    handHold: [
      "When you hold on, I don't wanna go for a walk alone anymore.",
      "Don't let go so fast. I was getting used to it.",
    ],
    caughtTease: [
      "W-Wait! Not there. ...Not yet. I wanna do it right.",
      "Hey... Not yet. It's not 'cause I don't want to. I'm just not ready. Soon, okay?",
    ],
  },
  bound: {
    heartbeatHold: [
      "My heart's still loud. Even now. That's all you, y'know.",
      "So I'm all worked up. You're not a secret anymore. I don't care who knows.",
    ],
    lipHold: [
      "You know you're allowed more than that now. ...I'm not saying it twice.",
      "Mm. That's my favorite smell. You, right there.",
    ],
    handHold: [
      "Stay over again. I sleep better when you're here.",
      "I'm gonna work hard so I can stay with you. For good.",
    ],
    breakAway: [
      "H-Hey! Wait. Too much. ...My ears popped out. That's your fault.",
      "Ngh... Gimme a sec. Your scent's everywhere and my head's all fuzzy.",
    ],
    teaseLetGo: [
      "Hey... Why'd you stop? I wasn't done. ...Get back here.",
      "That's mean... You did that on purpose.",
    ],
  },
};
