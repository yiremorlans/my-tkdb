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

export default {
  new: {
    headPat: ["Did you just pat me? Like a dog? Bold.", "Hands off the hair, Honor Roll."],
    cheekPoke: ["...Was that on purpose?", "Wow. Do that again and I'm filming it."],
    lipsTouch: ["Gross. Who said you could do that?", "Nope. Denied."],
    earTouch: ["Hey, careful with the earrings.", "Ugh, not by my ear. Everything's loud enough already."],
    handTap: ["You need something? Make it quick.", "What, you want an autograph?"],
    chestTouch: ["Back off. You don't get to do that.", "Hands off the headphones."],
    bellyTouch: ["Did you just poke my stomach? Wow. Weird.", "Nope. Not you, not there."],
    hipsTouch: ["Excuse me? Hands to yourself.", "Seriously? Back up."],
    upset: ["Okay, stop. That's annoying.", "Keep it up and you're going on my story. Not the flattering kind."],
  },
  known: {
    headPat: ["You again? Who said you could pet me?", "...You're really testing your luck, huh."],
    cheekPoke: ["What? Are you bored or something?", "Poke me again and I'm poking back."],
    lipsTouch: ["Tch. Cute. No.", "Don't. I'm not in the mood for whatever this is."],
    earTouch: ["Leave the earrings alone, I mean it.", "Not near my ears. You have no idea how loud you are."],
    handTap: ["What, you want my hand? Ask nicely. ...Denied.", "Huh. You're braver than you look."],
    chestTouch: ["Hey. Who said you could get that close?", "Back up. I'm not your pillow."],
    bellyTouch: ["Wow. Bold move for someone with no permission.", "Do that again and you're the punchline of my next vid."],
    hipsTouch: ["Nope. Not happening.", "You're really pushing it, Honor Roll."],
    upset: ["Ugh, enough. You're so annoying.", "Stop, or I start telling people things about you. True or not."],
  },
  warm: {
    headPat: ["...Fine. Once. Don't tell anyone.", "Huh. Nobody else would dare."],
    cheekPoke: ["What's with the face? You want something?", "You're in a weird mood. I'm into it."],
    lipsTouch: ["Don't. Seriously.", "Nope. I'm not the one who gets flustered here."],
    earTouch: ["You're one of the few people who isn't loud. Don't ruin it.", "Careful with the earrings. ...Okay, you can stay there."],
    handTap: ["You're getting comfortable, huh. ...I'll allow it.", "What? ...Fine. You can hold it for a second."],
    chestTouch: ["Back up a little. I can't see my screen.", "Hey. Hands where I can see them."],
    bellyTouch: ["Hey! ...Okay, that caught me off guard. Don't get used to it.", "Ugh, cut it out. I'm not laughing. ...I'm not."],
    hipsTouch: ["Don't push it.", "Hey. You don't get that one."],
    upset: ["Okay, stop. I mean it.", "Ugh, you're so loud. Give it a rest."],
  },
  spark: {
    headPat: ["...Who said you could do that? Whatever. Keep going.", "You're getting cocky. I kind of like it."],
    cheekPoke: ["Stop. ...I'm not blushing, it's just hot.", "Poke me all you want. You're the one turning red."],
    lipsTouch: ["...You're playing with fire, Honor Roll.", "Curious about the piercing? ...Ask nicely."],
    earTouch: ["...Hey. I can hear how fast your heart's going, you know.", "Not the ear. ...Okay. Maybe the ear."],
    handTap: ["I can touch you, but you can't touch me. ...I'm making an exception.", "Fine. Hold on. Don't let go till I say."],
    chestTouch: ["...Don't. My heart's being stupid right now.", "Okay, that's not fair. Back up before I do something about it."],
    bellyTouch: ["...Careful, Honor Roll. You're touching the merchandise.", "Okay, that was kind of a cheap shot. ...Do it again and I'm doing it back."],
    hipsTouch: ["...Wow. Look who got bold.", "Hands up. I'm the one who makes the moves here."],
    upset: ["Okay, stop, before I forget I'm supposed to be annoyed.", "Enough. You're making it really hard to stay mad."],
  },
};
