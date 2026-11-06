// Sho's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/shohei.js.
//
// He teases her and never insults her; any bite lands on Leo, himself, or the
// situation. "Senpai" is his standing address, capitalized when spoken.
// Guarded spots (lips, chest, hips) stay rebuffs until spark.
// The bandana is its own touch area: a tap on it is bandanaPat, a tap on his
// hair is headPat, whether it's on or off. From warm a double-tap takes it
// off (bandanaOff, docs/hangout-activity.md §4.2), which annoys him at warm.
// Holds (spark+) keep his tell: bluster, then the accidental confession.

export default {
  new: {
    bandanaPat: ["Hey. Watch the bandana.", "Don't knock it crooked, Senpai."],
    headPat: [
      "What're you doing? I'm not a dog, Senpai.",
      "Huh? ...Hands off the hair.",
    ],
    cheekPoke: ["...What was that for?", "Huh? Something on my face?"],
    lipsTouch: ["Whoa. ...Geez. Not the lips, Senpai.", "Hey. Don't."],
    earTouch: ["Easy on the piercings, Senpai.", "Huh? Quit it."],
    handTap: [
      "Don't. I was cutting onions.",
      "You need something? I got an order going.",
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
    bandanaPat: [
      "Geez. I just fixed that.",
      "Leave the bandana alone, Senpai. It's fine how it is.",
    ],
    headPat: [
      "You trying to make me shorter or something?",
      "Huh? What'd I do to earn that?",
    ],
    cheekPoke: ["Huh? What's that for?", "Bored already, Senpai?"],
    lipsTouch: ["Geez, outta nowhere? ...Don't.", "Don't. I'm serious."],
    earTouch: [
      "You keep going for the piercings. Want one?",
      "Geez, that tickles. Quit it.",
    ],
    handTap: [
      "Hungry? I got leftovers from prep.",
      "What, you need a hand with something? Just ask.",
    ],
    chestTouch: ["Back up a little, Senpai.", "Whoa. Too close."],
    bellyTouch: [
      "Hey. Quit it. That's not a button.",
      "What was that, Senpai? Some kinda test?",
    ],
    hipsTouch: ["Hey. Cut that out.", "Nope. Not there."],
    upset: ["Geez, enough already.", "Okay, okay. I get it. Quit it."],
  },
  warm: {
    bandanaPat: [
      "What is it with you and the bandana?",
      "You keep fussing with it like it's yours or something.",
    ],
    bandanaOff: [
      "Hey! Give that back, Senpai. I'm serious.",
      "Pfft. Real funny. C'mon, give it here.",
    ],
    headPat: [
      "Huh. ...Whatever, I don't mind.",
      "Geez. Just don't do that in front of Leo.",
    ],
    cheekPoke: [
      "What? You got something to say, Senpai?",
      "Someone's in a mood.",
    ],
    lipsTouch: [
      "Hey. You trying to get me in trouble?",
      "...Not funny, Senpai.",
    ],
    earTouch: [
      "That tickles. Quit it. ...Or don't.",
      "You're really into my ears, huh, Senpai?",
    ],
    handTap: [
      "What, you wanna hold hands, Senpai? ...Pfft. I'm kidding.",
      "What, you cold? Hands in your pockets, Senpai.",
    ],
    chestTouch: ["Hey. Back up a little.", "...Don't. That's a weird spot."],
    bellyTouch: [
      "Whoa! Geez, Senpai, warn a guy first.",
      "Sneak attack, huh? I'll remember that.",
    ],
    hipsTouch: ["Whoa. No.", "Senpai. Hands."],
    upset: ["Geez. Enough, Senpai.", "Hey. Quit it. I mean it."],
  },
  spark: {
    bandanaPat: [
      "You'd look weird in mine. ...I'll get you a better one.",
      "You keep going for mine. I'll get you one, okay? Just leave this one.",
    ],
    bandanaOff: [
      "Great. Hair's all in my face now. You happy?",
      "...You look like you won something. Gimme that.",
    ],
    headPat: [
      "My turn. C'mere. ...Good job today, Senpai.",
      "...Huh. Guess I'm doing something right.",
    ],
    cheekPoke: [
      "Hey. Quit it. ...You're doing that on purpose, huh.",
      "Geez, Senpai. My face is hot enough already.",
    ],
    lipsTouch: [
      "...Senpai. You can't just do that.",
      "Careful. I might not let that go.",
    ],
    earTouch: [
      "...Hey. That's not fair.",
      "Ugh. I like that way too much. Don't let it go to your head, Senpai.",
    ],
    handTap: [
      "Your hands are freezing. Give 'em here.",
      "You can hold on. I'm not letting go first.",
    ],
    chestTouch: [
      "...Yeah, it's going fast. We don't have to talk about it.",
      "You know what that does to me, right?",
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
    heartbeatHold: [
      "That's from sparring. Mido's insane. ...Okay, it's not from sparring.",
      "Yeah... yeah. I can't help it around you, Senpai.",
    ],
    lipHold: [
      "...Geez. I forgot what I was saying.",
      "...Okay. I'm gonna be thinking about that all through prep.",
    ],
    handHold: [
      "Huh. Your hand fits pretty good. ...Forget I said that.",
      "Pfft. You're holding on pretty tight there, Senpai.",
    ],
  },
  close: {
    bandanaPat: [
      "Go ahead. I gave up stopping you a while ago.",
      "Still going for mine? I got you your own, Senpai.",
    ],
    bandanaOff: [
      "Pfft... Again? You just like seeing me without it, huh.",
      "Hang onto it, Senpai. I'll get it back later.",
    ],
    headPat: [
      "Keep that up and I'm gonna get spoiled, Senpai.",
      "You always know when I need that, huh.",
    ],
    cheekPoke: [
      "Yeah, yeah, I'm red. You gonna do something about it?",
      "Again? C'mon, at least make it count.",
    ],
    lipsTouch: [
      "...Careful, Senpai. I'm gonna start asking for that.",
      "...Yeah? C'mere, then.",
    ],
    earTouch: [
      "Yeah, that's the spot, Senpai.",
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
      "Hah... That tickles, Senpai. You're lucky I like you.",
      "Careful, Senpai. I know where you're ticklish too.",
    ],
    hipsTouch: [
      "Bold. ...C'mere, then. Your move, Senpai.",
      "Keep that up and you're staying over. Just saying.",
    ],
    heartbeatHold: [
      "Yeah, yeah. You heard it. Now quit grinning, Senpai.",
      "It's been like that since you walked up. Wasn't planning on you finding out.",
    ],
    lipHold: [
      "...You're killing me, Senpai. I can't think about anything else now.",
      "That's it? Geez, Senpai. You're gonna make me ask, huh.",
    ],
    handHold: [
      "Don't go far. I'm cooking for two later.",
      "Five more minutes, Senpai. The mission can wait.",
    ],
    caughtTease: [
      "Whoa. ...Not yet, Senpai. Pfft... Don't make that face.",
      "Hey. Easy. ...I'm trying to do this right, okay?",
    ],
  },
  bound: {
    bandanaPat: [
      "Wearing yours today? ...Then why're you after mine?",
      "You don't even ask anymore, huh, Senpai.",
    ],
    bandanaOff: [
      "There it goes. You'd think I'd stop wearing it around you.",
      "Yeah, yeah. Hair in my face again. You like it like that, huh.",
    ],
    headPat: [
      "...Hey. Proud of me or something?",
      "Still the best part of my day, Senpai.",
    ],
    heartbeatHold: [
      "Still does that, huh. You'd think I'd be used to you by now, Senpai.",
      "Pfft. You've heard it enough mornings to know what it does.",
    ],
    lipHold: [
      "Just the finger? C'mere. I'm done playing that game, Senpai.",
      "...Senpai. You know where that leads. Pfft... Fine by me.",
    ],
    handHold: [
      "That's it? You know you can keep it, Senpai.",
      "Hop on later. Anywhere you wanna go. Same as always.",
    ],
    breakAway: [
      "Hah... Time out. Time out, Senpai. I can't think straight.",
      "Geez... You don't play fair. Gimme a minute, then you're in trouble.",
    ],
    teaseLetGo: [
      "Hah... That's where you stop? Geez, Senpai. ...Not gonna lie, I wanted more.",
      "Pfft... Real cute, Senpai. Leaving me hanging like that. You know I'm getting you back.",
    ],
  },
};
