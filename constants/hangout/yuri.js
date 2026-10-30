// Yuri's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/yuri.js.
//
// Genius bravado over a fluster machine: he stammers, re-arms, and turns a
// touch into an examination. "Keep away" is arrogance, never germs. Guarded
// spots (lips, chest, hips) are outrage until spark, where the outrage cracks.

export default {
  new: {
    headPat: ["Wh-What do you think you're doing, worm!?", "Hmph. Hands off the genius."],
    cheekPoke: ["Poking a physician? How juvenile.", "If you're here for treatment, say so."],
    lipsTouch: ["Unhand me this instant!", "Wh-Wha... Have you no shame, worm!?"],
    earTouch: ["Mind the piercings, worm!", "Kindly keep your hands off a genius at work."],
    handTap: ["Careful! These are a surgeon's hands.", "Are you injured? Then I shall begin the examination."],
    chestTouch: ["Wh-Who gave you permission!? I am the one who examines!", "Back! I am a very busy man."],
    bellyTouch: ["Wh-Who said you could palpate a genius!?", "Abdominal exams are my job, worm! Not yours!"],
    hipsTouch: ["Wh-Wh-What!? Unhand me!", "Absolutely not! Keep your distance, worm!"],
    upset: ["Enough! I am a very busy man!", "Cease this at once! A genius has no time for this!"],
  },
  known: {
    headPat: ["Again!? Do you take me for some sort of specimen?", "Hmph. ...Your technique is acceptable, I suppose."],
    cheekPoke: ["What!? Is there something on my face?", "Must you!? I am thinking!"],
    lipsTouch: ["Unhand me!", "Wh-What sort of examination is that supposed to be!?"],
    earTouch: ["Admiring the piercings? Understandable.", "Careful, worm! Those are not toys!"],
    handTap: ["Your pulse is elevated. Hold still.", "These are a surgeon's hands, worm. Treat them with respect."],
    chestTouch: ["Wh-What are you doing!? I am the physician here!", "Back! You'll throw off my concentration!"],
    bellyTouch: ["What diagnosis do you expect to reach like that!?", "Wh-What!? Prodding me won't get you seen any faster!"],
    hipsTouch: ["Absolutely not!", "Wh-Where do you think you're putting that hand!?"],
    upset: ["That's quite enough, worm!", "Stop that this instant! I have research to do!"],
  },
  warm: {
    headPat: ["Hmph. I suppose I've earned it.", "...You may continue. For research purposes."],
    cheekPoke: ["Wh-What!? Stop smiling like that!", "Poking the genius again? Hmph."],
    lipsTouch: ["Wh-Wha... Absolutely not!", "That is not a medical procedure, worm!"],
    earTouch: ["Th-That tickles! I mean, that's irrelevant!", "My ears are in perfect health, thank you."],
    handTap: ["Cold! Have you eaten today? Answer honestly.", "Your hands are like ice. Have you been sleeping properly?"],
    chestTouch: ["Kindly remove your hand. I am not your patient.", "Back! Who is the doctor here!?"],
    bellyTouch: ["Hah! Th-That was an involuntary reflex! Purely medical!", "D-Don't do that without warning! My concentration!"],
    hipsTouch: ["Unhand me this instant!", "Wh-Where is that hand going!?"],
    upset: ["Enough! A genius is at work!", "That's quite enough poking for one appointment!"],
  },
  spark: {
    headPat: ["...Hmph. You're spoiling a genius.", "D-Don't stop. I mean, you may continue, if you must."],
    cheekPoke: ["My face is perfectly normal! Stop staring!", "You're enjoying this, aren't you, worm."],
    lipsTouch: ["Wh-Wh-What are you... You can't just...!", "Th-That is highly unscientific!"],
    earTouch: ["Ah! That's... N-No, that was a cough!", "Must you find every weak point, worm!?"],
    handTap: ["Your pulse is... No, that's mine. Ignore it.", "Hold still. I'm... taking your pulse. Yes."],
    chestTouch: ["My heart is fine! Perfectly fine!", "D-Don't listen to that! It's a minor arrhythmia!"],
    bellyTouch: ["Wh-Why is your hand still there!? I-I'm not complaining, I'm asking!", "My breathing is perfectly regular! Stop monitoring it!"],
    hipsTouch: ["Wh-Wh-What!? Have you no sense of propriety!?", "N-Not here, worm! Have some decorum!"],
    upset: ["Enough! I can't think straight!", "Stop! My concentration is in ruins!"],
  },
};
