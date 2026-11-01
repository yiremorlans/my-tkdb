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

export default {
  new: {
    headPat: [
      "Gahaha! Usually I'm the one doin' that to the critters!",
      "Oi, oi! Have I got straw in my hair again?",
    ],
    cheekPoke: [
      "Hm? Somethin' on my face?",
      "Gahaha! You're a forward one, hey?",
    ],
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
      "That's the prosthetic. Tap away, it won't bite. Unlike half the critters.",
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
      "Ah, quit it! That's my ticklish spot. ...Forget I said that.",
      "You keep goin' for the earrings. Want a pair of your own?",
    ],
    handTap: [
      "Want to hold onto that? Go on, it's sturdy.",
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
      "Argh! You're worse than the sparrows!",
    ],
  },
  spark: {
    headPat: [
      "...Huh. Nobody does that to me. Keep goin'.",
      "Gahaha... okay, that's nice. Really nice.",
    ],
    cheekPoke: [
      "Am I red? I'm not red. Gahaha!",
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
      "...You can keep that. The hand, I mean. Gahaha!",
    ],
    chestTouch: [
      "My heart's not usually this loud. Honest.",
      "Uh... yeah. Ignore that. It's the energy drinks.",
    ],
    bellyTouch: [
      "Peekaboo gets all the attention. ...What about me, hey?",
      "He's gettin' spoiled. ...Can't say I blame him. Gahaha!",
    ],
    hipsTouch: [
      "Whoa! Okay! ...Okay. Warn a bloke first.",
      "Oi... not here. Gahaha... not here.",
    ],
    upset: [
      "All right, mercy! I can't think straight like this.",
      "Enough, enough! Any more and I'll go red for good.",
    ],
  },
  close: {
    headPat: [
      "Gahaha! Go on, I'll hold still. Peekaboo's gonna be jealous.",
      "Keep goin'. Best part of my day, that.",
    ],
    cheekPoke: [
      "Yeah, yeah, I'm red. Poke away!",
      "Gotcha back! Gahaha! Fair's fair, hey?",
    ],
    lipsTouch: [
      "...Meant it, did you? Good. C'mere.",
      "Gahaha... no runnin' off after that one, hey?",
    ],
    earTouch: [
      "Ah! Still ticklish. Go on then, you've earned it.",
      "Gahaha! You're the only one who knows that spot, hey?",
    ],
    handTap: [
      "Grab on! Rounds go quicker with you along.",
      "There you are! Hold on tight. Next stop's wherever you like.",
    ],
    chestTouch: [
      "Yeah, it's loud. Not the energy drinks this time. Gahaha!",
      "Stay there a sec. I like it when you're this close.",
    ],
    bellyTouch: [
      "Look at him. You're spoilin' the both of us, you know.",
      "Peekaboo's decided you're stayin'. Guess I'm outvoted. Gahaha!",
    ],
    hipsTouch: [
      "Bold, hey? Keep that up and I'm pullin' you closer.",
      "Gahaha... Careful, mate. I'm not sayin' stop.",
    ],
  },
};
