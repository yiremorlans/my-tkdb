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

export default {
  new: {
    headPat: ["Hey! Stay back. I don't even know you.", "...What're you doing? Stop it."],
    cheekPoke: ["Quit it! What's your deal?", "Tch... Why'd you poke me?"],
    lipsTouch: ["Don't! Get your hand away from my face!", "Hey! Back off!"],
    earTouch: ["Don't touch that! It's mine.", "Hands off my earring!"],
    handTap: ["...What. You want something?", "Hm? ...You smell okay, I guess."],
    chestTouch: ["Back off! I don't know you!", "Hey! Too close!"],
    bellyTouch: ["Hey! What're you poking me there for?!", "Tch... Keep your hands where I can see 'em."],
    hipsTouch: ["What the hell?! Get away!", "Don't! Stay back!"],
    upset: ["Stop it! Go away!", "Quit it already! I'm gonna get mad!"],
  },
  known: {
    headPat: ["...Okay. Just a little.", "Huh. You're not scared of me?"],
    cheekPoke: ["Hey! What was that for?", "Quit poking! I'm not a toy."],
    lipsTouch: ["Don't. That's weird.", "Hey! Not my mouth!"],
    earTouch: ["Not the earring. I've had it forever.", "Careful! You'll make my ears pop out."],
    handTap: ["...You smell like you. That's good.", "What? You wanna go somewhere?"],
    chestTouch: ["Hey. Too close.", "Your scent's right in my face. Back up."],
    bellyTouch: ["Hey! Quit it. That's my stomach.", "Not there. Pick somewhere else."],
    hipsTouch: ["Hey! Don't do that!", "No. Quit it."],
    upset: ["Stop! You're bugging me!", "Tch... I said quit it!"],
  },
  warm: {
    headPat: ["...Hm. That's okay. Do it again.", "You're the only one who gets to do that. Got it?"],
    cheekPoke: ["Hey! ...Heh. I'm getting you back next time.", "What? Is there food on my face?"],
    lipsTouch: ["...Don't. That one's weird.", "Hey. Not that, okay?"],
    earTouch: ["Careful with that. It's important.", "Hey, that tickles! Quit it!"],
    handTap: ["Hm? ...You can hold on. If you want.", "C'mon. Let's go somewhere."],
    chestTouch: ["Hey. Too close, okay?", "...Back up a little. Please."],
    bellyTouch: ["Whoa! ...Don't sneak up on me like that.", "Hey! You almost made my tail pop out!"],
    hipsTouch: ["Hey! Don't.", "That's not okay. Quit it."],
    upset: ["Okay, stop! You're bugging me now.", "I'm gonna go for a walk if you keep that up."],
  },
  spark: {
    headPat: ["...I like that. Don't tell the blond gigolo.", "Do it more. ...I mean, if you want."],
    cheekPoke: ["H-hey! My face is all hot now. Why?!", "...You smell sweeter than usual. Stop it."],
    lipsTouch: ["W-what're you doing?! My stomach's all weird now!", "...Don't. I dunno what happens if you do that."],
    earTouch: ["Ngh... My ears are gonna pop out. It's your fault.", "Hey! That's... that's not fair."],
    handTap: ["...Your hand's warm. You can leave it there.", "C'mon. I'm not letting go, so keep up."],
    chestTouch: ["H-hey, don't! My heart's going all squeezy!", "You hear that? It's 'cause of your scent. Stop it."],
    bellyTouch: ["H-hey! ...Okay. Ten seconds. That's it.", "Dummy. Don't just do that out of nowhere."],
    hipsTouch: ["W-whoa! Is that a human thing?! Is that allowed?!", "Hey! ...My face is all hot. Quit it."],
    upset: ["Stop! I can't think when you do that!", "Okay, enough! My stomach's all weird!"],
  },
};
