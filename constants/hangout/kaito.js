// Kaito's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/kaito.js.
//
// He's a physical-touch person once he's comfortable, so head and hands warm
// up fast; guarded spots (lips, chest, hips) stay a flustered no until spark.
// The pendant on his chest is Gram's gift (no Ardici reveal). Max two "!" per
// line, never "!!!".

export default {
  new: {
    headPat: [
      "Eek! Oh. Oh, okay. Hi?",
      "Wait, are you patting me? Is something in my hair?!",
    ],
    cheekPoke: [
      "Hey! What was that for?",
      "Did I break out? Don't tell me I broke out.",
    ],
    lipsTouch: [
      "W-Whoa! Okay, nope. We just met.",
      "Hey, hold on. That's way too fast.",
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
      "Eek! Okay, that's my stomach. Why is it my stomach?",
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
      "Hey! Too far, too far.",
      "Nope. Not happening. ...Sorry, that came out loud.",
    ],
    earTouch: [
      "Silver on this side, gold on that one. Don't mix them up.",
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
      "W-Whoa. Okay. Friends don't do that, right?",
    ],
    earTouch: [
      "Haha, that tickles! Stop!",
      "You're gonna knock a hoop loose, and I can't afford another one.",
    ],
    handTap: [
      "Wanna hold on? I'm not gonna make it weird. ...Much.",
      "Oh, hi. I was literally about to text you.",
    ],
    chestTouch: [
      "That's Gram's pendant. I'm careful with it, so you be careful too.",
      "Hands off that one, okay? Anything else, fine.",
    ],
    bellyTouch: [
      "Pfft, hey! Okay, okay, that one got me.",
      "W-Wait, I'm so not ready for that. Pat my head instead, that one's safe.",
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
      "You're doing that on purpose. I can tell. ...Do it again.",
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
      "Careful with my pendant. ...But you can stay. You're the only one I'd say that to.",
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
  },
};
