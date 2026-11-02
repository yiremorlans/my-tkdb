// Leo's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/leo.js.
//
// Volatile, enemies-to-lovers: he stays prickly at every tier and stops aiming
// it at her by spark. His menace is social (filming, posting, gossip), never
// physical. Sound sensitivity shows in the ear lines; the super-hearing
// heartbeat beat waits for spark. Guarded spots (lips, chest, hips) stay
// rebuffs until spark.
// Holds (spark+): he deflects the heart monitor, then owns it; bound
// handHold pays off the canon bet (LVL 25), and he still runs the rules.

export default {
  new: {
    headPat: [
      "Did you just pat me? Like a dog? Bold.",
      "Hands off the hair, Honor Roll.",
    ],
    cheekPoke: [
      "...Was that on purpose?",
      "Did you seriously just poke me? Who does that?",
    ],
    lipsTouch: ["Hey! ...What was that? Hands off the lips.", "Nope. Denied."],
    earTouch: [
      "Hey, careful with the earrings.",
      "Ugh, not by my ear. Everything's fucking loud enough already.",
    ],
    handTap: [
      "You need something? Make it quick.",
      "Did I say you could do that? No? Then don't.",
    ],
    chestTouch: [
      "Back off. You don't get to do that.",
      "Hands off the headphones.",
    ],
    bellyTouch: [
      "Did you just poke my stomach? Wow. Weird.",
      "Nope. Not you, not there.",
    ],
    hipsTouch: ["Excuse me? Hands to yourself.", "Seriously? Back up."],
    upset: [
      "Okay, stop. That's fucking annoying.",
      "Keep it up and you're going on my story. Not the flattering kind.",
    ],
  },
  known: {
    headPat: [
      "You again? Who said you could pet me?",
      "...You're really testing your luck, huh.",
    ],
    cheekPoke: [
      "What? Are you bored or something?",
      "Poke me again and I'm poking back.",
    ],
    lipsTouch: [
      "Ugh, yes, it's a piercing. Hands to yourself.",
      "Seriously? My lips? Not a chance, Honor Roll.",
    ],
    earTouch: [
      "Leave the earrings alone, I mean it.",
      "Not near my ears. You have no idea how loud you are.",
    ],
    handTap: [
      "What? Use your words, Honor Roll.",
      "Huh. You're braver than you look.",
    ],
    chestTouch: [
      "What the hell? Who said you could get that close?",
      "Back up. I'm not your pillow.",
    ],
    bellyTouch: [
      "Wow. Bold move for someone with no permission.",
      "Ugh. Do I look like a stress ball to you?",
    ],
    hipsTouch: [
      "Nope. Not happening.",
      "You're really pushing it, Honor Roll.",
    ],
    upset: [
      "Ugh, stop. You're so annoying.",
      "Stop, or I start telling people things about you.",
    ],
  },
  warm: {
    headPat: [
      "...Fine. Once. Don't get used to it.",
      "Huh. Nobody else would dare.",
    ],
    cheekPoke: [
      "What's with the face? You want something?",
      "Again? You're lucky I'm used to you by now.",
    ],
    lipsTouch: [
      "...Hey. No. Those aren't up for grabs.",
      "Nope. I'm not the one who gets flustered here.",
    ],
    earTouch: [
      "Hey, easy. My ears are sensitive. Like, really sensitive.",
      "Careful with the earrings.",
    ],
    handTap: [
      "You're getting comfortable, huh. ...I'll allow it.",
      "What? ...You want something, or are you just bored?",
    ],
    chestTouch: [
      "Back up a little. I can't see my screen.",
      "Hey. Hands where I can see them.",
    ],
    bellyTouch: [
      "Hey! ...Okay, that caught me off guard. Don't get used to it.",
      "Shit, cut it out. I'm not laughing. ...I'm not.",
    ],
    hipsTouch: ["Don't push it.", "Wow. Getting brave, huh? Still no."],
    upset: [
      "Okay, stop. I mean it.",
      "Seriously, quit it. I'm not in the mood.",
    ],
  },
  spark: {
    headPat: [
      "...Who said you could do that? Whatever. Keep going.",
      "You're getting cocky. I kind of like it.",
    ],
    cheekPoke: [
      "Stop. ...I'm not blushing, it's just hot.",
      "Poke me all you want. You're the one turning red.",
    ],
    lipsTouch: [
      "...You're playing with fire, Honor Roll.",
      "Curious about the piercing? ...Ask nicely.",
    ],
    earTouch: [
      "...Hey. I can hear how fast your heart's going, you know.",
      "Ugh. You're gonna make me lose my train of thought.",
    ],
    handTap: [
      "I can touch you, but you can't touch me.",
      "Fine. Hold on. ...Don't make it weird.",
    ],
    chestTouch: [
      "...Don't. My heart's being fucking stupid right now.",
      "Okay, that's not fair. I wasn't ready.",
    ],
    bellyTouch: [
      "...Hey. Who said that was allowed? ...Fine.",
      "Okay, that was kind of a cheap shot. ...Do it again and I'm doing it back.",
    ],
    hipsTouch: [
      "...Wow. Look who got bold.",
      "Hey. Who taught you that? ...Don't answer.",
    ],
    upset: [
      "Okay, okay! Time out. My face is literally on fire.",
      "Ugh. You're making it really hard to stay mad.",
    ],
    heartbeatHold: [
      "That's from yelling at chat all night. ...Ugh. Fine. It's not.",
      "So now you know what I hear from you all day. Fun, right?",
    ],
    lipHold: [
      "...You kept it there that long? Bold. Next time I'm not sitting still.",
      "Wow. Okay. Not gonna lie, I didn't hate that.",
    ],
    handHold: [
      "Who said you could let go? Not me.",
      "Wait, no. My hand's gonna get cold. Get back here.",
    ],
  },
  close: {
    headPat: [
      "Look who's got me trained. ...Don't stop.",
      "Mm. I'm keeping you. ...For the head pats, obviously.",
    ],
    cheekPoke: [
      "Again? You're obsessed with me. ...Same, honestly.",
      "Bored? Liar. You just wanted me to look at you, Honor Roll.",
    ],
    lipsTouch: [
      "...You keep doing that. Either commit or I will.",
      "...Tease. You know exactly what you're doing, Honor Roll.",
    ],
    earTouch: [
      "Careful. Keep that up and I'm returning the favor.",
      "Ugh. Making you squirm is my job.",
    ],
    handTap: [
      "Hold on tight. I'm not letting go first, so that's on you.",
      "Rules changed. You can touch me now too. Tell anyone and I'll deny it.",
    ],
    chestTouch: [
      "Back up before I do something about it.",
      "...Yeah, it's racing. Stay there and find out why.",
    ],
    bellyTouch: [
      "Hah. Keep that up and I'm pinning your hands.",
      "Bold. ...Keep going, Honor Roll. I dare you.",
    ],
    hipsTouch: [
      "Hands up. I'm the one who makes the moves here.",
      "...Okay. My move, then. Come here.",
    ],
    heartbeatHold: [
      "Don't look so smug. You'd be racing too if you were me.",
      "You keep checking like it's gonna slow down, but it's not.",
    ],
    lipHold: [
      "...You know I'm counting how long you stay there. That was a new record.",
      "Ugh. Stop looking at my mouth like that. ...Or come closer and make your move.",
    ],
    handHold: [
      "That's it? I wasn't done with you yet, Honor Roll.",
      "When people find out, it won't be like this. Fingers laced. My way.",
    ],
    caughtTease: [
      "Hey. Not yet. ...I'm the one who decides when, remember?",
      "Ha. Nice try. ...Not yet, Honor Roll. You'll know when.",
    ],
  },
  bound: {
    heartbeatHold: [
      "Still racing? Shocking. You'd think I'd have built up a tolerance to you by now.",
      "You already know what you do to me. You don't need to listen for it.",
    ],
    lipHold: [
      "Just your finger? After everything? You're getting shy on me, Honor Roll.",
      "You know how this ends. ...Fine. Take your time.",
    ],
    handHold: [
      "Lost the bet, by the way. I fell first. Worth it.",
      "Go ahead, let go. You'll be back. You always are.",
    ],
    breakAway: [
      "Fuck. Okay, stop. ...I can't even hear myself think.",
      "Hah... Give me a second. You're the only one who gets to see me like this.",
    ],
    teaseLetGo: [
      "Seriously? Right there? ...Wow. You're gonna pay for that later, Honor Roll.",
      "Who said you could stop? ...Next time, you don't leave till I tell you to.",
    ],
  },
};
