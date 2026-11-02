// Kaito's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/kaito.js.
//
// He's a physical-touch person once he's comfortable, so head and hands warm
// up fast; guarded spots (lips, chest, hips) stay a flustered no until spark.
// The pendant on his chest is Gram's gift (no Ardici reveal); mention it in
// new-warm only, never from spark up. Max two "!" per line, never "!!!".
// Holds (spark+): the heartbeat lines are the caught-out denial that
// collapses at once; bound pays off the knight voiceline (LVL 25).

export default {
  new: {
    headPat: [
      "Eek! Oh, okay. Hi?",
      "Wait, are you patting me or theres something in my hair?!",
    ],
    cheekPoke: [
      "Hey! What was that for?",
      "Whoa, what? Are you counting my freckles or something?",
    ],
    lipsTouch: [
      "W-Whoa! Okay, nope. Lips are off-limits.",
      "Hey, hold on. Hands down, hands down.",
    ],
    earTouch: [
      "Careful! Those hoops snag on everything.",
      "Ow, okay. Not the earrings.",
    ],
    handTap: [
      "Huh? Oh, hi! Did you need something?",
      "You lost? I know where everything is. Mostly.",
    ],
    chestTouch: [
      "Hey, not the necklace. Seriously.",
      "Whoa, personal space. Sorry. But personal space.",
    ],
    bellyTouch: [
      "Hey! Hands off, hands off.",
      "Eek! Okay, nope. No poking there.",
    ],
    hipsTouch: [
      "W-What are you doing?! Okay, no.",
      "Hey, that's, um. No. Just no.",
    ],
    upset: [
      "Hey, stop! That's not funny.",
      "Seriously, quit it. I don't like that.",
    ],
  },
  known: {
    headPat: [
      "Heh. Okay, that's kinda nice, actually.",
      "You're messing up my hair. ...Fine. Keep going.",
    ],
    cheekPoke: [
      "What? Is it my freckles? Don't look at my freckles.",
      "Ow. Okay, I probably deserved that.",
    ],
    lipsTouch: [
      "Eek! H-Hey, my lips are not a fidget toy!",
      "Nope. Not happening. ...Sorry. But no.",
    ],
    earTouch: [
      "Silver on this side, gold on the other. Don't mix them up.",
      "Ah, careful! They snag.",
    ],
    handTap: [
      "Huh? You want my attention? You've got it.",
      "That's my thumb ring. Cool, right?",
    ],
    chestTouch: [
      "Hey, careful with the pendant. Gram gave me that.",
      "Not the necklace, okay? It's important.",
    ],
    bellyTouch: [
      "Ack! Okay, rude. I wasn't ready.",
      "Hey, no poking there. That's off-limits, okay?",
    ],
    hipsTouch: [
      "Whoa! Okay, hands where I can see them.",
      "That's... no. We're not there.",
    ],
    upset: [
      "Okay, stop. I mean it this time!",
      "Hey! Cut it out. I'm serious.",
    ],
  },
  warm: {
    headPat: [
      "Heh. Okay, you can do that whenever.",
      "Don't stop. I'm serious, don't stop.",
    ],
    cheekPoke: [
      "Hey! I'm gonna get you back for that.",
      "Is this payback for the WickHive post? Because that was funny.",
    ],
    lipsTouch: [
      "Hey. Not that. ...Seriously, not that.",
      "W-Whoa. Okay. Lips are a no-go zone.",
    ],
    earTouch: [
      "Haha, that tickles! Stop!",
      "You're gonna knock a hoop loose, and I can't afford another one.",
    ],
    handTap: [
      "Oh, hey! Need something? I'm all yours.",
      "Oh, hi. I was literally about to text you.",
    ],
    chestTouch: [
      "That's Gram's pendant. I'm careful with it, so you be careful too.",
      "Hands off there, okay? Anything else, fine.",
    ],
    bellyTouch: [
      "Pfft, hey! Okay, okay, that one got me.",
      "W-Wait, I'm so not ready for that. Pat my head instead, that's safe.",
    ],
    hipsTouch: [
      "Hey! Where are your hands going?",
      "Okay, that's a no. A big no.",
    ],
    upset: [
      "Okay, stop. I'm actually getting mad here!",
      "Stop, stop. I'm gonna tell Luca on you.",
    ],
  },
  spark: {
    headPat: [
      "...Oh. Okay. I'm not gonna survive this.",
      "Keep doing that and I'll follow you anywhere. ...I said that out loud, didn't I?",
    ],
    cheekPoke: [
      "Don't look at my face right now! It's red, isn't it?",
      "You're doing that on purpose. I can tell...",
    ],
    lipsTouch: [
      "W-Wait. Wait. Is this happening? Is this a dream?",
      "I... um. Okay. Deep breaths, Kaito.",
    ],
    earTouch: [
      "Ah, that's not fair. My ears are weak.",
      "Hey, I can feel my whole face burning.",
    ],
    handTap: [
      "You wanna hold hands? Oh my god. Yes. Okay. Yes.",
      "Your hand's so warm. ...Sorry, is that weird?",
    ],
    chestTouch: [
      "Can you feel that? That's my heart freaking out.",
      "Okay, don't move. I'm trying to be cool and it is not working.",
    ],
    bellyTouch: [
      "Okay, my stomach just flipped. That's normal, right?",
      "Whoa, hey. I'm gonna start giggling and ruin the moment.",
    ],
    hipsTouch: [
      "W-Whoa! You can't just... okay, I need a second.",
      "You're gonna kill me. You know that, right?",
    ],
    upset: [
      "Okay, stop, stop! I can't think when you do that.",
      "Mercy. My heart can't take this many.",
    ],
    heartbeatHold: [
      "It's not usually that fast. ...Okay, it is around you.",
      "Okay, yes, it's racing. You don't have to look so happy about it.",
    ],
    lipHold: [
      "...Wow. Okay. My lips are still tingling. Is that a thing?",
      "Okay. Best moment of my life, and I'm not even exaggerating. ...Much.",
    ],
    handHold: [
      "Wait, you're letting go already? ...Sorry. That came out super needy.",
      "My hand's all sweaty now. Sorry! ...I'd hold it again in a second, though.",
    ],
  },
  close: {
    headPat: [
      "Heh. Keep going. I'm literally melting here.",
      "Okay, new rule: you do that every time you see me. No exceptions.",
    ],
    cheekPoke: [
      "Okay, yeah, my face is red. I've stopped hiding it. Happy?",
      "Poke me all you want. Just stay where I can poke you back.",
    ],
    lipsTouch: [
      "...Okay. I'm not freaking out this time. Mostly. Do it again?",
      "Is this real? Pinch me. ...Actually, no. Do that again instead.",
    ],
    earTouch: [
      "Ah, my ears! ...Okay, fine, they're yours. Just go easy.",
      "Haha, stop! ...No, don't stop. Ugh, I can't decide.",
    ],
    handTap: [
      "Gimme. I'm not letting go, so get comfy.",
      "Hey, look, our hands match. ...Okay, they don't. I just wanted an excuse.",
    ],
    chestTouch: [
      "Still racing. It kinda just does that around you now.",
      "You can lean on me, you know. I can be the strong one sometimes.",
    ],
    bellyTouch: [
      "Hey! Pfft, okay, you win. I'm all yours.",
      "Haha, stop, I'm ticklish! ...Okay, one more. Just one.",
    ],
    hipsTouch: [
      "Heh. Okay, I'm not even pretending to be surprised anymore.",
      "If you're gonna be bold, I'm gonna be bold too. ...Gimme a sec to work up to it.",
    ],
    heartbeatHold: [
      "Guess you know now. It does that every time you show up. Every single time.",
      "Don't listen too hard. ...Okay, listen. It's all for you anyway.",
    ],
    lipHold: [
      "...I really wanted to kiss you just now. I'm being good. Barely.",
      "You know I'm gonna be thinking about that all night, right? Thanks a lot.",
    ],
    handHold: [
      "You let go first again. I'm keeping score, you know.",
      "Can we do that again? Like, right now? ...Okay, in a minute.",
    ],
    caughtTease: [
      "W-Wait. Not yet. ...I want to. I really, really do. Just not yet.",
      "Hey, hey. Slow down. ...I'm not saying no. I'm saying not yet, before I pass out.",
    ],
  },
  bound: {
    heartbeatHold: [
      "Yeah, yeah, it's racing. You'd think I'd be used to you by now. I'm so not.",
      "It still does that. Even after everything. I kinda hope it never stops.",
    ],
    lipHold: [
      "I used to freak out over that. Now I just want more. ...Is that bad?",
      "Your finger again? Come on. We both know I like the real thing better.",
    ],
    handHold: [
      "I'm still working on the knight thing. Holding your hand counts as training, right?",
      "You let go and my hand gets all cold. Come back, I wasn't done.",
    ],
    breakAway: [
      "O-Okay, time out! My heart's gonna explode. Gimme a sec.",
      "I-I need a second. Or ten. Or a whole minute. ...Okay, maybe don't go far.",
    ],
    teaseLetGo: [
      "Wait, you're stopping? Right there? ...That's so mean. I was finally getting brave.",
      "Huh? That's it? ...I'm not whining. Okay, I'm totally whining. Five more minutes, please?",
    ],
  },
};
