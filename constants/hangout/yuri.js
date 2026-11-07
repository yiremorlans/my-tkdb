// Yuri's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/yuri.js.
//
// Genius bravado over a fluster machine. He's touch-averse: he examines
// others all day, but being touched rattles him every time, so he stammers,
// re-arms, and tries to turn the touch into an examination. "Keep away" is arrogance, never germs. Guarded
// spots (lips, chest, hips) are outrage until spark, where the outrage cracks.
//
// Holds (spark+): the heartbeat check flips his doctor role (he takes
// pulses, he isn't read), so he sputters and re-arms. Still flustered at
// bound on sensitive spots (lips), though high affinity has desensitized
// him to MC's touch (only hers), so lower-stakes holds can stay composed;
// bound treats intimacy as shared history.
//
// Removable article (docs/hangout-activity.md §4.2): the stethoscope on his
// belt, house outfit only. stethoscopePat is a tap on it (every tier); from
// warm (user, 2026-11-07) a double-tap takes it (stethoscopeOff). Not
// blocking: belly and hips around it stay his. It hangs into the hips spot
// but always reacts as belly (rig reactsAs). Warm is caught off guard and
// guards his instrument; spark lends it; close hints; bound is routine.

export default {
  new: {
    headPat: [
      "Wh-What do you think you're doing!?",
      "D-Don't touch me! I examine, I am not examined!",
    ],
    cheekPoke: [
      "Wh-Wha... Did you just poke me!?",
      "N-Never touch a physician without warning, worm!",
    ],
    lipsTouch: [
      "How dare you! My lips are not open for examination!",
      "Who said you could!? I am the doctor here!",
    ],
    earTouch: [
      "Ah! M-Mind the piercings!",
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
      "Wh-Who gave you permission to palpate me!?",
      "Abdominal exams are my job! Not yours!",
    ],
    stethoscopePat: [
      "D-Don't touch that! It is a precision instrument!",
      "Hands off! A stethoscope is not a toy, worm!",
    ],
    hipsTouch: [
      "Wh-Wh-What!? Unhand me!",
      "Absolutely not! Keep your distance!",
    ],
    upset: [
      "Enough! I am a very busy man!",
      "Cease this at once! I have patients waiting!",
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
      "Ah! That is a highly personal area!",
      "What sort of examination is that supposed to be!?",
    ],
    earTouch: [
      "Wh-Why my ears!? Admiring the piercings, I suppose... Hmph.",
      "St-Stop that! My hearing is perfectly fine, thank you!",
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
    stethoscopePat: [
      "M-Mind the tubing! Do you have any idea what that costs our budget!?",
      "If you wish to be auscultated, make an appointment like everyone else!",
    ],
    hipsTouch: [
      "Absolutely not!",
      "Wh-Where do you think you're putting that hand!?",
    ],
    upset: [
      "That's quite enough!",
      "Stop that this instant! I have research to do!",
    ],
  },
  warm: {
    headPat: [
      "Hmph. I suppose I've earned it... Don't make a habit of it.",
      "...Y-You may continue. Briefly. And tell no one.",
    ],
    cheekPoke: [
      "Wh-What!? Stop smiling like that!",
      "Poking me again? Hmph. Have you no work to do?",
    ],
    lipsTouch: [
      "Wh-Wha... N-Not there! Not yet... I mean, not ever!",
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
      "Hah! Th-That was an involuntary reflex! It means nothing!",
      "D-Don't do that without warning! I can't concentrate!",
    ],
    stethoscopePat: [
      "Fascinated by my instruments? Hmph. Your taste is improving.",
      "If you're that curious, I could let you listen. ...To Jiro. Not me.",
    ],
    stethoscopeOff: [
      "Wh-What are you doing with my stethoscope!? Give that back! ...At least don't drop it!",
      "Th-That's mine! A physician without his stethoscope is...! Hmph. Be careful with it.",
    ],
    hipsTouch: ["Unhand me this instant!", "Wh-Where is that hand going!?"],
    upset: [
      "Enough! I have a surgery to prepare for!",
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
      "Wh-Why my lips, of all places!? ...Hmph.",
    ],
    earTouch: [
      "Ah! That's... N-No, that was a cough!",
      "Must you find every weak point!?",
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
      "Wh-Why would you poke me there!? I-I can't concentrate like this!",
      "My stomach is perfectly fine! Stop investigating it!",
    ],
    stethoscopePat: [
      "Wh-What do you want with that!? ...N-No. Don't tell me.",
      "Again with the stethoscope? I-If you want to borrow it, ask!",
    ],
    stethoscopeOff: [
      "Y-You're taking it? Then hold it properly. Earpieces forward, worm.",
      "Fine. Borrow it. Return it before Jiro notices, or I'll never hear the end of it.",
    ],
    hipsTouch: [
      "Wh-Wh-What!? Have you no sense of propriety!?",
      "Th-That is... You can't just...! That is a breach of medical ethics!",
    ],
    upset: [
      "Enough! I can't think straight!",
      "Stop! My concentration is in ruins!",
    ],
    heartbeatHold: [
      "I-It was perfectly steady before you got here! ...That is merely an observation!",
      "Elevated? A temporary anomaly. It only occurs under very specific conditions. D-Don't ask which!",
    ],
    lipHold: [
      "Wh-What was that for!? I was in the middle of a sentence! ...What was I saying?",
      "Hmph! If that was meant to quiet me, it worked. D-Don't let it go to your head!",
    ],
    handHold: [
      "Hmph. That was... tolerable. Wh-Why are you smiling!?",
      "Done already? I-I mean, good! ...I was only just getting used to it.",
    ],
  },
  close: {
    headPat: [
      "Hmph. A genius deserves recognition... Th-This counts. Continue.",
      "...Fine. I've decided this is good for my circulation. Do it again.",
    ],
    cheekPoke: [
      "Y-You're doing that on purpose! ...Hmph. Then I shall allow it.",
      "Poke me all you like. A physician is trained to withstand... Ah! I-I can withstand it!",
    ],
    lipsTouch: [
      "Th-That requires further study. Repeated trials. For accuracy!",
      "I-If you're going to do that, at least do it properly!",
    ],
    earTouch: [
      "Ah! M-My ears are going red, aren't they?",
      "Stay there. That is... a doctor's order.",
    ],
    handTap: [
      "Hmph. I don't let anyone hold these. ...You may.",
      "Hold still. I prescribe... several more minutes of this. Don't argue!",
    ],
    chestTouch: [
      "Y-Yes, it's racing. I've diagnosed the cause, and the cause is you, worm.",
      "Listen, then, if you must. ...Consider it a privilege.",
    ],
    bellyTouch: [
      "Palpation, is it? Hmph. Your technique needs work. ...K-Keep practicing.",
      "Ah! ...I am not ticklish. That was a reflex!",
    ],
    stethoscopePat: [
      "Interested in medicine now? Hmph. I'll make an assistant out of you yet.",
      "...I suppose you may borrow it. You and no one else.",
    ],
    stethoscopeOff: [
      "Off my belt already? You're far too comfortable around me. ...I-I didn't say stop.",
      "Go on, then. Listen to whatever you like. ...Within reason!",
    ],
    hipsTouch: [
      "Wh-Wha... Not in the lab! ...We'll continue this in private. Th-That is an order!",
      "Bold. Very bold. ...I-I'm not objecting! I'm making a note of it!",
    ],
    heartbeatHold: [
      "Well? What's your diagnosis? ...Hmph. Don't say it out loud.",
      "Elevated, yes. Chronic, I suspect. I-I am not requesting treatment!",
    ],
    lipHold: [
      "You've rendered me speechless. Do you know how rare that is? Be proud.",
      "Mm... Hmph. A-A finger. Only a finger. ...I wasn't expecting anything else!",
    ],
    handHold: [
      "My hands never shake in surgery. Explain why they're shaking now! ...No, don't.",
      "Not like that. Lace your fingers through mine. I-It's better for circulation! Medically speaking!",
    ],
    caughtTease: [
      "Ah...! N-Not yet! I haven't... prepared! I-I need a moment!",
      "W-Wait. Not... not yet. ...I didn't say never.",
    ],
  },
  bound: {
    stethoscopeOff: [
      "There. Now you're the doctor. ...Be gentle with your patient.",
      "Go on, listen. That rhythm is... yours. Th-That is a clinical observation! ...Mostly.",
    ],
    heartbeatHold: [
      "You've charted that pulse often enough to know it by heart. ...Don't look so pleased.",
      "It climbs exactly as it did before. Consistent results. I-I am a very consistent man!",
    ],
    lipHold: [
      "Only you are permitted there. You know that. You've... made very sure I know it too.",
      "Mm... D-Don't start that unless you intend to finish it. ...You know full well I won't stop you.",
    ],
    handHold: [
      "Your hand is warm. Good. I intend to keep it that way. For... medical reasons. Lifelong ones.",
      "You're mine... N-No! I mean... Hmph. Yes. That is exactly what I mean.",
    ],
    breakAway: [
      "Ha... ha... Give me one moment. Then you're mine.",
      "Ha... ha... Don't look so smug. I-I'm merely catching my breath!",
    ],
    teaseLetGo: [
      "Y-You stopped!? Now!? Of all the... Hmph! Come back here this instant, worm!",
      "Ha... F-Fine. Walk away. You'll be back, and I'll be ready this time.",
    ],
  },
};
