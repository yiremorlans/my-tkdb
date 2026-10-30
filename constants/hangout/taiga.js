// Taiga's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/taiga.js.
//
// Bored, predatory, trigger-happy; "kitten" from known on (new forgets who
// the player is). "Ciao!" is always his last word. Hunger-for-blood beats
// stay out (spoiler). Guarded spots (lips, chest, hips) stay serious until
// spark.

export default {
  new: {
    headPat: ["Huh? Who the hell're you?", "Touch my hair again and lose the hand."],
    cheekPoke: ["...What? Don't poke me, I'm starving.", "You wanna die or something?"],
    lipsTouch: ["Keep your fingers away from my teeth.", "Hah? You lookin' to lose those?"],
    earTouch: ["Hands off the gold.", "Touch the gold again and see what happens. Back off."],
    handTap: ["Easy. I've got a gun in the other one.", "Wanna play five finger filet? No? Then let go."],
    chestTouch: ["Back off before I shoot you.", "...Seriously. Hands off."],
    bellyTouch: ["Hah? Get your hand off my stomach.", "Poke me there again and I'm shooting first. Ciao!"],
    hipsTouch: ["Hey. That's where the pistol lives.", "Try that again and see what happens."],
    upset: ["Stop. I'm bored of you already.", "Screw this. Ciao!"],
  },
  known: {
    headPat: ["Kitten's petting me now? Gyahaha! That's backwards.", "...Huh. You're still around."],
    cheekPoke: ["What, kitten? I'm hungry, not bored.", "Quit it. You got food on you or what?"],
    lipsTouch: ["Hah? Fingers away from my mouth.", "Don't. I haven't eaten."],
    earTouch: ["Hey. That's mine.", "Pull that and I'm pulling yours."],
    handTap: ["Left hand. Spread your fingers. ...Gyahaha! Kidding.", "Heads or tails, kitten. Go on, pick."],
    chestTouch: ["Not your chips. Hands off.", "Back off, kitten."],
    bellyTouch: ["Kitten. That's my stomach, not a card table.", "Back off. You're not dealing me in."],
    hipsTouch: ["Hey. Hands where I can see 'em.", "Don't push your luck, kitten."],
    upset: ["Enough. You're getting annoying.", "Screw this! I'm going home!"],
  },
  warm: {
    headPat: ["...Huh. Don't make it a habit.", "Gyahaha! You got some nerve, kitten. Keep going."],
    cheekPoke: ["You poking for a reaction? Here. Gyahaha!", "Do that again and I'm eating your share."],
    lipsTouch: ["Hey. Not that.", "...Watch the teeth, kitten. I mean it."],
    earTouch: ["That tickles, damn it.", "Yank it and you're paying for a new one."],
    handTap: ["Cold hands. Figures.", "Want a game? Fine. Gimme your left hand."],
    chestTouch: ["Back off, kitten. Not a game.", "...Too close."],
    bellyTouch: ["Hey! Gyahaha! Knock it off, I'm hungry, not a drum.", "...Huh. Didn't see that one coming, kitten."],
    hipsTouch: ["Hey. Hands off the holster.", "Don't."],
    upset: ["Okay, that's enough. You're gonna get shot.", "Quit it. I'll forget your name on purpose."],
  },
  spark: {
    headPat: ["...Okay. You can keep doing that.", "C'mere, kitty-cat. My turn after."],
    cheekPoke: ["Keep poking, kitten. I'll poke back.", "What's that look? You wanna take a bite or what?"],
    lipsTouch: ["...Shit. Don't do that out of nowhere.", "Do that again and I'm not letting go."],
    earTouch: ["Damn it. That one actually got me.", "Hey. ...Who told you about that?"],
    handTap: ["Gimme. You're keeping me warm.", "Don't let go. My luck's better when you don't."],
    chestTouch: ["...Feel that? Your fault, kitten.", "Careful. I bite when I'm cornered."],
    bellyTouch: ["...Shit. You're making me forget I'm hungry, kitten.", "Hey. Don't stop 'cause I flinched."],
    hipsTouch: ["...Gutsy. Not here, though.", "Hey. You're gonna get us both in trouble, kitten."],
    upset: ["Okay, okay. Quit it before I do something about it.", "Enough, kitten. I'm counting to three."],
  },
};
