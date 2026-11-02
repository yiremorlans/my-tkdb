// Haru's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/haru.js.
//
// Cheerful even as a stranger; guarded spots (lips, chest, hips) get a
// laughing "Oi" rebuff, not warmth, until spark, where flirting that lands
// makes him retreat into "Gahaha". The right arm is a prosthetic: a hand tap
// may mention it lightly (Mio's work), never how it was broken. The belly
// hotspot is Peekaboo in his sling, so bellyTouch lines react to MC petting
// Peekaboo, not to touching Haru.
//
// Holds (spark+): release lines own the racing pulse and stay cheerful;
// caughtTease is a laughing "not yet"; bound treats the night as shared
// history. Hand holds don't single out the prosthetic.

export default {
  new: {
    headPat: [
      "Gahaha! Usually I'm the one doin' that to the critters!",
      "Oi, oi! Have I got straw in my hair again?",
    ],
    cheekPoke: ["Hm? Somethin' on my face?", "Oi! You're a forward one, hey?"],
    lipsTouch: [
      "Whoa! Hang on, hang on. Not the lips, mate.",
      "Oi. That's not part of the tour.",
    ],
    earTouch: ["Careful, those go right through!", "Ow! ...Kiddin'. Mostly."],
    handTap: [
      "Oh! Here, take a flier!",
      "Careful, that's the prosthetic. Don't go scratchin' Mio's handiwork.",
    ],
    chestTouch: [
      "Whoa. Bit close for a first meetin', hey?",
      "Oi, personal space. Even Peekaboo knows that one.",
    ],
    bellyTouch: [
      "Whoa, careful! Peekaboo bites. Ask me how I know.",
      "Easy! He's not used to you yet. Go slow, hey?",
    ],
    hipsTouch: ["Oi! Hands where I can see 'em.", "That's a no, mate."],
    upset: [
      "Argh! Give it a rest, hey?",
      "Okay, okay! I get it! That's enough!",
    ],
  },
  known: {
    headPat: [
      "Gahaha! You've got the hang of it. That's how I do Peekaboo.",
      "Easy! I only just got the straw out.",
    ],
    cheekPoke: [
      "What's that for? ...Have I got soap on me again?",
      "Oi! Poke me again and you're on cleanin' duty.",
    ],
    lipsTouch: [
      "Ah! Uh... Not the lips, hey?",
      "Oi. Hands off those, Honor Roll.",
    ],
    earTouch: [
      "Like the earrings, hey? Just don't tug.",
      "Gahaha! That tickles! Quit it!",
    ],
    handTap: [
      "Hm? Need somethin'? I'm all yours for a sec.",
      "That's the prosthetic. Tap away, it can take it.",
    ],
    chestTouch: ["Whoa, steady. What's that for?", "Hey. Bit much, hey?"],
    bellyTouch: [
      "Oi, Peekaboo! No nibblin' on Honor Roll!",
      "Gentle scratch, that's it. He's partial to that.",
    ],
    hipsTouch: ["Oi! Watch the hands!", "Oi. Not funny, Honor Roll."],
    upset: [
      "All right, all right! Enough!",
      "Oi, I've got a park to run. Give it a rest!",
    ],
  },
  warm: {
    headPat: [
      "Gahaha! Don't stop on my account.",
      "Feels nice, that. ...Keep it between us, hey?",
    ],
    cheekPoke: [
      "What's that face? You're plannin' somethin'.",
      "Oi! That'll cost you. Mates' rates, though.",
    ],
    lipsTouch: ["Whoa. Let's not, hey?", "Hey. ...Not those, mate."],
    earTouch: [
      "Ah, quit it! That's my ticklish spot.",
      "You keep goin' for the earrings. Want a pair of your own?",
    ],
    handTap: [
      "Oi, a tap? Gimme a proper high five, then!",
      "Hey, you. Need somethin', or just sayin' hi?",
    ],
    chestTouch: [
      "...Hey. That's a bit close.",
      "Steady on. You'll knock the wind out of me.",
    ],
    bellyTouch: [
      "He's sittin' still for you? He never sits still for me!",
      "If Peekaboo lets you do that, you've passed. Tough critic, him.",
    ],
    hipsTouch: ["Oi! Hands, Honor Roll.", "Nope. No, no. Off you go."],
    upset: [
      "Okay, I'm callin' time on that. Enough!",
      "Oi, quit it! That's not funny, Honor Roll.",
    ],
  },
  spark: {
    headPat: [
      "...Oi. You're gonna make me go soft, hey?",
      "...Okay, that's nice. Really nice.",
    ],
    cheekPoke: [
      "Am I red? I'm not red.",
      "Oi. Do that again and I'm pokin' back.",
    ],
    lipsTouch: [
      "...Oh. Uh. Gahaha! You caught me off guard there.",
      "...Hey. Don't do that unless you mean it.",
    ],
    earTouch: [
      "Ah! That's... not fair, that.",
      "You know exactly what you're doin', don't you.",
    ],
    handTap: [
      "Go on, hold on. I'm not lettin' go first.",
      "...Oh. Uh. Here. Hold on as long as you like, hey?",
    ],
    chestTouch: [
      "My heart's not usually this loud. Honest.",
      "Uh... yeah. Ignore that. It's the energy drinks.",
    ],
    bellyTouch: [
      "Peekaboo gets all the attention. ...What about me, hey?",
      "He's gettin' spoiled. ...Can't say I blame him.",
    ],
    hipsTouch: [
      "Whoa! Okay! ...Okay. Warn me first, hey?",
      "Oi... not here. Gahaha... not here.",
    ],
    upset: [
      "All right, mercy! I can't think straight like this.",
      "Enough, enough! Any more and I'll go red for good.",
    ],
    heartbeatHold: [
      "That number's from runnin' rounds all day. ...You're not buyin' that, are you.",
      "Caught red-handed, hey? ...Yeah. That's all you, that.",
    ],
    lipHold: [
      "...Okay. I forgot what I was gonna say.",
      "...Phew. Gimme a sec. My brain's still catchin' up.",
    ],
    handHold: [
      "Already? ...Okay. Next time I'm holdin' on longer, hey?",
      "I'd hold on all day if the rounds'd let me, hey.",
    ],
  },
  close: {
    headPat: [
      "Go on, I'll hold still. Peekaboo's gonna be jealous.",
      "Keep goin'. Best part of my day, that.",
    ],
    cheekPoke: [
      "Yeah, yeah, I'm red. Poke away!",
      "Gotcha back! Gahaha! Fair's fair, hey?",
    ],
    lipsTouch: [
      "...Meant it, did you? Good. C'mere.",
      "...No runnin' off after that one, hey?",
    ],
    earTouch: [
      "Ah! Still ticklish. Go on then, you've earned it.",
      "Gahaha! You're the only one who knows that spot.",
    ],
    handTap: [
      "Grab on! Rounds go quicker with you along.",
      "There you are! Hold on tight. Next stop's wherever you like.",
    ],
    chestTouch: [
      "Yeah, it's loud. Not the energy drinks this time.",
      "Stay there a sec. I like it when you're this close.",
    ],
    bellyTouch: [
      "Look at him. You're spoilin' the both of us, you know.",
      "Peekaboo's decided you're stayin'. Good. So have I.",
    ],
    hipsTouch: [
      "Bold, hey? Keep that up and I'm pullin' you closer.",
      "Gahaha... Careful, mate. I'm not sayin' stop.",
    ],
    heartbeatHold: [
      "Stamina's my strong suit, but that's not what's got it racin'.",
      "There's your proof, hey? Not even gonna deny it this time.",
    ],
    lipHold: [
      "...Phew. Gimme a sec. You've got me all turned around.",
      "Mm. Next time, maybe not just your finger, hey?",
    ],
    handHold: [
      "Phew. Best break I've had all week. Let's take another one soon.",
      "That's it? C'mon, one more minute. The jobs'll wait.",
    ],
    caughtTease: [
      "Hey, hey... I want to. Just... not yet, okay?",
      "Ah! Easy there... I'd forget every job on the list.",
    ],
  },
  bound: {
    heartbeatHold: [
      "Racin' again, hey? You'd think I'd be used to you by now.",
      "You know how loud it gets. You've heard it up close.",
    ],
    lipHold: [
      "You're doin' that on purpose. You know what it does to me now.",
      "Mm... Remember what happened last time you did that?",
    ],
    handHold: [
      "Feels right, this. Like clockin' off after the last round.",
      "Don't let go yet. The kids can manage five minutes without me. ...Probably.",
    ],
    breakAway: [
      "Hah... hah... Okay. Time out. My legs aren't workin' right.",
      "Phew... Gahaha... You're gonna be the death of me, you know that?",
    ],
    teaseLetGo: [
      "Oi, you're stoppin' there? That's just cruel, that is. ...I'll get you back for it.",
      "Hah... Right when it was gettin' good, too. Now I'll be thinkin' about you the whole round.",
    ],
  },
};
