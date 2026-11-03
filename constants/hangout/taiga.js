// Taiga's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/taiga.js.
//
// Bored, predatory, trigger-happy; "kitten" from known on (new forgets who
// the player is). "Ciao!" is always his last word. Hunger-for-blood beats
// stay out (spoiler). Lips and hips stay serious until spark. Chest and
// belly turn by tier from a warning to a dare to an invitation that still
// bites; the meter maxing out is still a real threat.
// Holds (spark+): his poor memory is the deflection; at bound, remembering
// her is the payoff (he forgets names, never her).

export default {
  new: {
    headPat: [
      "Huh? Who the hell're you?",
      "Touch my hair again and lose the hand.",
    ],
    cheekPoke: [
      "...What? Don't poke me, I'm starving.",
      "You wanna die or something?",
    ],
    lipsTouch: [
      "Hah? Poke my lips again and I'm biting that finger.",
      "...Don't. Who're you again?",
    ],
    earTouch: [
      "Hands off the gold.",
      "Touch the gold again and see what happens. Back off.",
    ],
    handTap: [
      "Easy. I've got a gun in the other one.",
      "Wanna play five finger filet? No? Then let go.",
    ],
    chestTouch: ["Back off before I shoot you.", "...Seriously. Hands off."],
    bellyTouch: [
      "Hah? Get your hand off my stomach.",
      "Poke me there again and I'm shooting first.",
    ],
    hipsTouch: [
      "Hey. That's where the pistol lives.",
      "Try that again and see what happens.",
    ],
    upset: ["Stop. I'm bored of you already.", "Screw this."],
  },
  known: {
    headPat: [
      "Kitten's petting me now? Gyahaha! That's backwards.",
      "...Huh. You're still around.",
    ],
    cheekPoke: [
      "What, kitten? I'm hungry, not bored.",
      "Quit it. You got food on you or what?",
    ],
    lipsTouch: [
      "Hah? ...Don't. Not the lips.",
      "...Tch. Fingers that close get bitten, kitten.",
    ],
    earTouch: ["Hey. That's mine.", "Pull that and I'm pulling yours."],
    handTap: [
      "Left hand. Spread your fingers. ...Gyahaha! Kidding.",
      "Heads or tails, kitten. Go on, pick.",
    ],
    chestTouch: [
      "Hah? Feeling me up, kitten? Gutsy.",
      "Keep that hand there and see if you get it back.",
    ],
    bellyTouch: [
      "Kitten. That's my stomach, not a card table.",
      "Hah? You lookin' to feed me or something?",
    ],
    hipsTouch: [
      "Hey. Hands where I can see 'em.",
      "Don't push your luck, kitten.",
    ],
    upset: ["Enough. You're getting annoying.", "Quit it, kitten. I'm not in the mood."],
  },
  warm: {
    headPat: [
      "...Huh. Don't make it a habit.",
      "Gyahaha! You got some nerve, kitten. Keep going.",
    ],
    cheekPoke: [
      "You poking for a reaction? Here. Gyahaha!",
      "Do that again and I'm eating your share.",
    ],
    lipsTouch: ["Hey. Not that.", "...Kitten. You want that finger bitten?"],
    earTouch: [
      "That tickles, damn it.",
      "Yank it and you're paying for a new one.",
    ],
    handTap: [
      "Cold hands. Figures.",
      "Want a game? Fine. Gimme your left hand.",
    ],
    chestTouch: [
      "Go on, then. See how far you get before I bite.",
      "Checking for a heartbeat, kitten? Still got one.",
    ],
    bellyTouch: [
      "Hey! Gyahaha! ...Do that slower, kitten.",
      "Hungry hands, huh? Same.",
    ],
    hipsTouch: ["Hey. Hands off the holster.", "Don't."],
    upset: [
      "Okay, that's enough. You're gonna get shot.",
      "Quit it. I'll forget your name on purpose.",
    ],
  },
  spark: {
    headPat: [
      "...Okay. You can keep doing that.",
      "C'mere, kitty-cat. My turn after.",
    ],
    cheekPoke: [
      "Keep poking, kitten. I'll poke back.",
      "What's that look? You wanna take a bite or what?",
    ],
    lipsTouch: [
      "...Shit. Don't do that out of nowhere.",
      "Do that again and I'm not letting go.",
    ],
    earTouch: [
      "Damn it. That one actually got me.",
      "Hey. ...Who told you about that?",
    ],
    handTap: [
      "Gimme. You're keeping me warm.",
      "Don't let go. My luck's better when you don't.",
    ],
    chestTouch: [
      "...Feel that? Your fault, kitten.",
      "...Hands right there, huh. Damn.",
    ],
    bellyTouch: [
      "...Shit. You're making me forget I'm hungry, kitten.",
      "Gyahaha... Hey. That tickles, kitten.",
    ],
    hipsTouch: [
      "...Gutsy. Not here, though.",
      "Hey. You're gonna get us both in trouble, kitten.",
    ],
    upset: [
      "Shit... Okay, okay. Gimme a sec, kitten.",
      "Gyahaha... Okay, you got me. Now quit it before I return the favor.",
    ],
    heartbeatHold: [
      "Gyahaha... That's not you. I just smelled food.",
      "Shit. You saw that? ...Forget it. I already did.",
    ],
    lipHold: [
      "...That long, huh? I almost bit. Almost.",
      "...Hah. You're braver than you look, kitten.",
    ],
    handHold: [
      "Hey, I wasn't done. That hand's mine till I say, kitten.",
      "That's it? Fine. Ciao!",
    ],
  },
  close: {
    headPat: [
      "Don't stop. I'm napping right here, so you're stuck with me, kitten.",
      "Gyahaha... Somebody's spoiling me. Harder, kitten.",
    ],
    cheekPoke: [
      "Gyahaha! Again. I like you brave, kitten.",
      "One more and I'm keeping you. ...Gyahaha! Too late.",
    ],
    lipsTouch: [
      "Fingers? That's it? C'mon, kitten. You can do better.",
      "Mm. That's trouble. ...Lucky me.",
    ],
    earTouch: [
      "Shit. That spot again? You're cheating, kitten. ...Don't stop.",
      "Keep that up and I fold. ...Gyahaha! Worth it.",
    ],
    handTap: [
      "No knife this time. I just want the hand, kitten.",
      "Mine now. Want it back? You gotta win it off me.",
    ],
    chestTouch: [
      "Keep going. I dare you. Just don't cry when I bite.",
      "...Hear that? Close your eyes, kitten.",
    ],
    bellyTouch: [
      "Lower and I stop playing nice. ...Well? Go on.",
      "...Feel that? Don't you dare stop now, kitten.",
    ],
    hipsTouch: [
      "There, huh? Fine. We're leaving. ...Gyahaha! Look at your face!",
      "Keep wandering, kitten. See where it gets you.",
    ],
    upset: [
      "Shit... Keep that up and I'm not letting you leave, kitten.",
      "...Shit. Now I forgot what I was mad about.",
    ],
    heartbeatHold: [
      "Gyahaha! Busted. Don't tell Lulu, he'll start charging for the show.",
      "Yeah, it's racing. Wanna see what happens if it keeps going, kitten?",
    ],
    lipHold: [
      "Mm. Next time I'm keeping that finger. Gyahaha!",
      "...Kitten. You're playing with your food.",
    ],
    handHold: [
      "Feels like a winning streak. Don't break it, kitten.",
      "Gimme that back. I don't remember saying you could go.",
    ],
    caughtTease: [
      "Hah... Not yet, kitten. I'm the one who deals.",
      "Ha... Greedy kitten. Not yet.",
    ],
  },
  bound: {
    heartbeatHold: [
      "Remember what it did last time? Gyahaha... Me too. For once.",
      "Hear that? It only does that for you, kitten.",
    ],
    lipHold: [
      "Just the finger? We're past that, kitten. Get over here.",
      "Mm. Keep that up and I get a taste. ...Gyahaha! Again.",
    ],
    handHold: [
      "Till death do us part, kitten. You let go, I follow.",
      "Your hand's warm. Stay. I'll deal the cards later.",
    ],
    breakAway: [
      "Shit... Shit. Okay. You win this hand, kitten.",
      "Hah... Shit. Who's eating who here? ...Gimme a sec.",
    ],
    teaseLetGo: [
      "Hah... Quitting while you're ahead, kitten? Smart. Doesn't save you, though.",
      "That's where you stop? Mean. ...I'm collecting the rest later, kitten.",
    ],
  },
};
