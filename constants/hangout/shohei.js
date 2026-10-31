// Sho's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/shohei.js.
//
// He teases her and never insults her; any bite lands on Leo, himself, or the
// situation. "Senpai" is his standing address, capitalized when spoken.
// Guarded spots (lips, chest, hips) stay rebuffs until spark.

export default {
  new: {
    headPat: [
      "Hey. Watch the bandana.",
      "What're you doing? I'm not a dog, Senpai.",
    ],
    cheekPoke: ["...What was that for?", "Pfft. What, something on my face?"],
    lipsTouch: ["Whoa. Hands off.", "Hey. Don't."],
    earTouch: ["Easy on the piercings, Senpai.", "Huh? Quit it."],
    handTap: [
      "Don't. My hands smell like onions.",
      "You need something? I'm on the clock.",
    ],
    chestTouch: ["Back up. What's the idea?", "Hey. Personal space, Senpai."],
    bellyTouch: [
      "Whoa. Hands off the stomach.",
      "What're you doing? Poke somebody else, Senpai.",
    ],
    hipsTouch: ["Whoa. Nope.", "Hands to yourself. I mean it."],
    upset: ["Geez, cut it out.", "Okay, that's enough. Go bug Leo instead."],
  },
  known: {
    headPat: [
      "Pfft. You trying to make me shorter or something?",
      "C'mon, not the bandana. Took me forever.",
    ],
    cheekPoke: ["Huh? What's that for?", "Pfft. Bored already, Senpai?"],
    lipsTouch: ["Hey. Not funny.", "Don't. I'm serious."],
    earTouch: [
      "You keep going for the piercings. Want one?",
      "Geez, that tickles. Quit it.",
    ],
    handTap: [
      "Careful, I just had them in the fryer. ...Kidding.",
      "What, you need a hand with something? Just ask.",
    ],
    chestTouch: ["Back up a little, Senpai.", "Whoa. Too close."],
    bellyTouch: [
      "Hey. Quit it. That's not a button.",
      "Pfft. What was that, Senpai? Some kinda test?",
    ],
    hipsTouch: ["Hey. Cut that out.", "Nope. Not that one."],
    upset: ["Geez, enough already.", "Okay, okay. I get it. Quit it."],
  },
  warm: {
    headPat: [
      "Pfft. What's that for? ...Whatever, I don't mind.",
      "You're gonna mess up the bandana. ...Fine.",
    ],
    cheekPoke: [
      "What? You got something to say, Senpai?",
      "Pfft. Someone's in a mood.",
    ],
    lipsTouch: ["Hey. Don't play like that.", "...Not funny, Senpai."],
    earTouch: [
      "That tickles. Quit it. ...Or don't.",
      "Keep that up and I'll have to get another one just so you can mess with it.",
    ],
    handTap: [
      "Here. ...What, you just wanted to hold it?",
      "What, you cold? C'mon, give it here.",
    ],
    chestTouch: ["Hey. Back up a little.", "...Don't. That's a weird spot."],
    bellyTouch: [
      "Whoa! Geez, Senpai, warn a guy first.",
      "Pfft. Sneak attack, huh? I'll remember that.",
    ],
    hipsTouch: ["Whoa. No.", "Senpai. Hands."],
    upset: ["Geez. Enough, Senpai.", "Hey. Quit it. I mean it."],
  },
  spark: {
    headPat: [
      "...Okay, that one actually got me.",
      "Pfft. Keep doing that and I'm doing it back.",
    ],
    cheekPoke: [
      "What're you looking at? ...Don't answer that.",
      "Geez, Senpai. My face is hot enough already.",
    ],
    lipsTouch: [
      "...Senpai. You can't just do that.",
      "Careful. I might not let that one go.",
    ],
    earTouch: ["...Hey. That's not fair.", "Quit it. ...Okay, once more."],
    handTap: [
      "Your hands are freezing. Here, give 'em here.",
      "You can hold on. I'm not letting go first.",
    ],
    chestTouch: [
      "...Yeah, it's going fast. Don't make it a thing.",
      "Geez. Back up before I do something stupid.",
    ],
    bellyTouch: [
      "Hey... Your hands are warm. Don't get any ideas.",
      "...Pfft. You're really testing me today, Senpai.",
    ],
    hipsTouch: [
      "You're bold today. ...I'm not complaining.",
      "Whoa. Okay. Give me a sec, Senpai.",
    ],
    upset: [
      "Okay, stop. You're making it real hard to act cool.",
      "Geez, enough. My heart can't take this.",
    ],
  },
  close: {
    headPat: [
      "Pfft. Keep that up and I'm gonna get spoiled, Senpai.",
      "...Yeah, okay. You can mess up the bandana. Just you.",
    ],
    cheekPoke: [
      "Yeah, yeah, I'm red. You gonna do something about it, Senpai?",
      "Pfft. Again? C'mon, at least make it count.",
    ],
    lipsTouch: [
      "...Careful, Senpai. I'm gonna start asking for that.",
      "...Yeah? C'mere, then, Senpai.",
    ],
    earTouch: [
      "Pfft. You found the spot. Now you're stuck with it, Senpai.",
      "Keep going. I'll pretend I'm not into it.",
    ],
    handTap: [
      "C'mon, give it here. Your hand fits better in mine anyway.",
      "Not letting go. You're riding with me later, Senpai.",
    ],
    chestTouch: [
      "Yeah, it's going fast. You do that to me, Senpai.",
      "Stay there. ...Yeah, I like it. Happy?",
    ],
    bellyTouch: [
      "Pfft. That tickles. ...Don't stop, though.",
      "Careful, Senpai. Two can play that game.",
    ],
    hipsTouch: [
      "Bold. ...C'mere, then. Your move, Senpai.",
      "Keep that up and you're staying over. Just saying.",
    ],
  },
};
