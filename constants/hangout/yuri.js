// Yuri's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/yuri.js.
//
// Genius bravado over a fluster machine. He's touch-averse: he examines
// others all day, but being touched rattles him every time, so he stammers,
// re-arms, and tries to turn the touch into an examination. "Keep away" is arrogance, never germs. Guarded
// spots (lips, chest, hips) are outrage until spark, where the outrage cracks.

export default {
  new: {
    headPat: [
      "Wh-What do you think you're doing, worm!?",
      "D-Don't touch me! I examine, I am not examined!",
    ],
    cheekPoke: [
      "Wh-Wha... Did you just poke me!?",
      "N-Never touch a physician without warning, worm!",
    ],
    lipsTouch: [
      "Unhand me this instant!",
      "Wh-Wha... Have you no shame, worm!?",
    ],
    earTouch: [
      "Ah! M-Mind the piercings, worm!",
      "Kindly keep your hands off a genius at work.",
    ],
    handTap: [
      "Careful! These are a surgeon's hands.",
      "Are you injured? Then I shall begin the examination.",
    ],
    chestTouch: [
      "Wh-Who gave you permission!? I am the one who examines!",
      "Back! I am a very busy man.",
    ],
    bellyTouch: [
      "Wh-Who said you could palpate a genius!?",
      "Abdominal exams are my job, worm! Not yours!",
    ],
    hipsTouch: [
      "Wh-Wh-What!? Unhand me!",
      "Absolutely not! Keep your distance, worm!",
    ],
    upset: [
      "Enough! I am a very busy man!",
      "Cease this at once! A genius has no time for this!",
    ],
  },
  known: {
    headPat: [
      "Again!? Do you take me for some sort of specimen?",
      "Wh-Why do you keep touching me!? I never authorized this!",
    ],
    cheekPoke: [
      "What!? Is there something on my face?",
      "Must you!? I am thinking!",
    ],
    lipsTouch: [
      "Unhand me!",
      "Wh-What sort of examination is that supposed to be!?",
    ],
    earTouch: [
      "Wh-Why my ears!? Admiring the piercings, I suppose... Hmph.",
      "Careful, worm! Those are not toys!",
    ],
    handTap: [
      "Your pulse is elevated. Hold still.",
      "These are a surgeon's hands, worm. Treat them with respect.",
    ],
    chestTouch: [
      "Wh-What are you doing!? I am the physician here!",
      "Back! You'll throw off my concentration!",
    ],
    bellyTouch: [
      "What diagnosis do you expect to reach like that!?",
      "Wh-What!? Prodding me won't get you seen any faster!",
    ],
    hipsTouch: [
      "Absolutely not!",
      "Wh-Where do you think you're putting that hand!?",
    ],
    upset: [
      "That's quite enough, worm!",
      "Stop that this instant! I have research to do!",
    ],
  },
  warm: {
    headPat: [
      "Hmph. I s-suppose I've earned it... Don't make a habit of it.",
      "...Y-You may continue. For research purposes. Briefly.",
    ],
    cheekPoke: [
      "Wh-What!? Stop smiling like that!",
      "Poking the genius again? Hmph.",
    ],
    lipsTouch: [
      "Wh-Wha... Absolutely not!",
      "That is not a medical procedure, worm!",
    ],
    earTouch: [
      "Th-That tickles! I mean, that's irrelevant!",
      "Wh-Why must you touch everything!? My ears are perfectly healthy!",
    ],
    handTap: [
      "Cold! Your circulation is appalling. Hold still.",
      "Your hands are like ice. Have you been sleeping properly?",
    ],
    chestTouch: [
      "Y-Your hand! Remove it! I am not your patient!",
      "Back! Who is the doctor here!?",
    ],
    bellyTouch: [
      "Hah! Th-That was an involuntary reflex! Purely medical!",
      "D-Don't do that without warning! My concentration!",
    ],
    hipsTouch: ["Unhand me this instant!", "Wh-Where is that hand going!?"],
    upset: [
      "Enough! A genius is at work!",
      "That's quite enough poking for one appointment!",
    ],
  },
  spark: {
    headPat: [
      "...Hmph. I-I'm only allowing this because it's you.",
      "D-Don't stop. I mean, you may continue, if you must.",
    ],
    cheekPoke: [
      "My face is perfectly normal! Stop staring!",
      "Y-You're enjoying this, aren't you, worm!? I can tell!",
    ],
    lipsTouch: [
      "Wh-Wh-What are you... You can't just...!",
      "Th-That is highly unscientific!",
    ],
    earTouch: [
      "Ah! That's... N-No, that was a cough!",
      "Must you find every weak point, worm!?",
    ],
    handTap: [
      "Your pulse is... No, that's mine. Ignore it.",
      "Hold still. I'm... taking your pulse. Yes.",
    ],
    chestTouch: [
      "My heart is fine! Perfectly fine!",
      "D-Don't listen to that! It's a minor arrhythmia!",
    ],
    bellyTouch: [
      "Wh-Why is your hand still there!? I-I'm not complaining, I'm asking!",
      "My stomach is perfectly fine! Stop investigating it!",
    ],
    hipsTouch: [
      "Wh-Wh-What!? Have you no sense of propriety!?",
      "N-Not here, worm! Have some decorum!",
    ],
    upset: [
      "Enough! I can't think straight!",
      "Stop! My concentration is in ruins!",
    ],
  },
  close: {
    headPat: [
      "Hmph. A genius deserves recognition... Th-This counts. Continue.",
      "...Fine. I've decided this is good for my circulation. Do it again.",
    ],
    cheekPoke: [
      "Y-You're doing that on purpose! ...Hmph. Then I shall allow it on purpose.",
      "Poke me all you like. A genius can withstand... Ah! I-I can withstand it!",
    ],
    lipsTouch: [
      "Th-That requires further study. Repeated trials. For accuracy!",
      "I-If you're going to do that, at least do it properly, worm!",
    ],
    earTouch: [
      "Ah! Th-The piercings are... Fine. You may admire them. Up close.",
      "Stay there. That is... a doctor's order, worm.",
    ],
    handTap: [
      "Hmph. I don't let anyone hold these. ...You may.",
      "Hold still. I prescribe... several more minutes of this. Don't argue!",
    ],
    chestTouch: [
      "Y-Yes, it's racing. I've diagnosed the cause, and the cause is you, worm.",
      "Listen, then, if you must. ...Consider it a privilege, worm.",
    ],
    bellyTouch: [
      "Palpation, is it? Hmph. Your technique needs work. ...K-Keep practicing.",
      "Wh-What are you smiling at? Your hand can stay. I-I've decided!",
    ],
    hipsTouch: [
      "Wh-Wha... Not in the lab! ...We'll continue this in private. Th-That is an order!",
      "Have you no... Hmph. Very well. I'll allow it. For you, and no one else!",
    ],
  },
};
