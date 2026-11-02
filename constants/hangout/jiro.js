// Jiro's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/jiro.js.
//
// Calm, literal and clinical; he reads every touch as a symptom or a test.
// No food in his lines before warm, no confections at all (closeFriend bond
// scene). Chest scars and tearing wounds are canon; the Stigma stays out.
// Guarded spots (lips, chest, hips) stay serious until spark.
//
// Holds (spark+): he reads the heartbeat hold as MC listening to his heart (his
// job reversed); Yuri's care is the canon he leans on. His amnesia covers
// one event only: he remembers everything now, so no "poor memory" lines.
// The Stigma still stays out.

export default {
  new: {
    headPat: [
      "...Is there something on my head?",
      "That isn't a recognized examination technique.",
    ],
    cheekPoke: [
      "Checking for swelling? There isn't any.",
      "Oh. Was that supposed to do something?",
    ],
    lipsTouch: [
      "Please keep your hands away from my lips.",
      "Don't. You haven't washed your hands.",
    ],
    earTouch: [
      "The piercings are healed. You don't need to check.",
      "...Are you counting them?",
    ],
    handTap: [
      "Do you need something? I can take your pulse.",
      "Oh. Do you want me to look at your hand?",
    ],
    chestTouch: [
      "Please don't. The wounds there tear easily.",
      "That's not where you take a pulse.",
    ],
    bellyTouch: [
      "Please don't. There are sutures there.",
      "That isn't a medical examination. Please stop.",
    ],
    hipsTouch: [
      "Please remove your hand.",
      "That's inappropriate, isn't it? Even I know that.",
    ],
    upset: ["This is annoying.", "Please stop. I'm busy."],
  },
  known: {
    headPat: [
      "You did that last time too. I still don't know what it's for.",
      "...Is that how you say hello now? Okay.",
    ],
    cheekPoke: [
      "You keep doing that. My face is fine.",
      "...Do I look unwell? Is that why?",
    ],
    lipsTouch: [
      "No. That's how contact infections spread.",
      "Please don't. Not there.",
    ],
    earTouch: [
      "There are six. You don't have to count them by touch.",
      "That's my ear. Is something wrong with yours?",
    ],
    handTap: [
      "The gloves stay on. Was there something you needed?",
      "Your hands are cold. That dulls circulation.",
    ],
    chestTouch: [
      "Careful. Some of those wounds tear easily.",
      "Please don't press there.",
    ],
    bellyTouch: [
      "Please don't. If a wound on my stomach tears, Yuri has to suture it.",
      "If you're checking for tenderness, there isn't any. Please stop.",
    ],
    hipsTouch: ["Please remove your hand.", "No."],
    upset: [
      "This is annoying.",
      "That's enough. I'd like to get back to work.",
    ],
  },
  warm: {
    headPat: [
      "...You do that a lot. I don't mind it.",
      "Is this what people do when they're glad to see someone?",
    ],
    cheekPoke: [
      "Your finger's warm. Good circulation.",
      "You're smiling. Was that the point?",
    ],
    lipsTouch: [
      "That's still not hygienic. Please stop.",
      "No. That stays mine.",
    ],
    earTouch: [
      "You've counted them already. Still six.",
      "That tickles. I didn't know it would.",
    ],
    handTap: [
      "I'll check your pulse while I have your hand.",
      "...Something wrong with my glove?",
    ],
    chestTouch: [
      "Gently. That's where most of the scars are.",
      "Please don't press there. A suture might open.",
    ],
    bellyTouch: [
      "...Oh. My muscles flinched. That doesn't happen during exams.",
      "Lightly. Those sutures open easily.",
    ],
    hipsTouch: ["Please remove your hand. I'm asking politely.", "Not there."],
    upset: [
      "This is annoying. Even from you.",
      "That's enough. You can just stay, you know.",
    ],
  },
  spark: {
    headPat: [
      "You can keep doing that. I don't know why I want you to.",
      "...Do it again. I'm observing something.",
    ],
    cheekPoke: [
      "My face is warm. I don't have a fever.",
      "You're doing that on purpose. I don't mind.",
    ],
    lipsTouch: [
      "...I should ask you to stop. I'm not going to.",
      "...I don't have a protocol for this.",
    ],
    earTouch: [
      "...That's distracting.",
      "...I can't remember what I was saying.",
    ],
    handTap: [
      "You can hold on. I'll keep count of the minutes.",
      "Your hand fits here. I checked.",
    ],
    chestTouch: [
      "Can you feel that? It isn't my condition.",
      "My heart rate is up. I know the cause.",
    ],
    bellyTouch: [
      "...Something just fluttered. Yuri never covered that.",
      "I'd chart that as a reaction. To you, specifically.",
    ],
    hipsTouch: [
      "...You're bold. I didn't expect that.",
      "...That's a new symptom. Mine, I mean.",
    ],
    upset: [
      "That's enough. I can't concentrate.",
      "Please stop. My pulse won't settle.",
    ],
    heartbeatHold: [
      "You were listening to my heart. That's usually my job. ...What did you hear?",
      "That's faster than it should be. ...I don't want it to slow down.",
    ],
    lipHold: [
      "...You held that there a long time. I forgot to count.",
      "...I don't have a clinical term for that. I'll look for one.",
    ],
    handHold: [
      "Oh. You let go. ...I was in the middle of something.",
      "Your hand's warm. I don't usually notice temperature unless it makes me sick.",
    ],
  },
  close: {
    headPat: [
      "Keep going. I'd like a longer observation period.",
      "Again. ...That's the third time I've asked. I'm aware.",
    ],
    cheekPoke: [
      "My face goes warm every time. I've stopped charting it.",
      "You're checking whether I'm smiling. I am. You can confirm it.",
    ],
    lipsTouch: [
      "...Again. I need a second sample.",
      "Your fingers aren't what I was hoping for. I'm only noting it.",
    ],
    earTouch: [
      "Still six. You can keep counting. I like it when you do.",
      "That makes my pulse jump. You've worked that out, haven't you?",
    ],
    handTap: [
      "Hold on. I've stopped counting the minutes.",
      "Your pulse is fast too. Then we're even.",
    ],
    chestTouch: [
      "You can leave your hand there. I'll tell you if anything tears.",
      "...You're learning where the scars are. Good. Then you'll know where to be careful.",
    ],
    bellyTouch: [
      "If you're examining me, I'll allow it. I'll lie still as long as you need.",
      "...Leave your hand there. I want to see what happens.",
    ],
    hipsTouch: [
      "I said that was inappropriate once. I'm revising my position.",
      "...You may continue. I'll tell you when to stop. I don't think I will.",
    ],
    heartbeatHold: [
      "It still does that for you. I've stopped looking for another cause.",
      "You're learning my resting rate. That's more than most people know about me.",
    ],
    lipHold: [
      "That was long enough to count as an examination. Was the result what you wanted?",
      "I'd like to return that sometime. Not with my hand.",
    ],
    handHold: [
      "It's been a long time since someone held on to me that long. I think I liked it.",
      "Yuri's calling. ...I'll ignore it for now.",
    ],
    caughtTease: [
      "Wait. ...Not yet. You'll have to teach me first.",
      "...Stop there. Not yet. I'd like to remember it properly.",
    ],
  },
  bound: {
    heartbeatHold: [
      "It's faster than last time. I've been keeping records.",
      "You've seen it go higher than that. You were there.",
    ],
    lipHold: [
      "I remember how this goes now. I wrote it down so I wouldn't forget.",
      "You're stalling. You already know what I want.",
    ],
    handHold: [
      "Hold on a little longer. I like this part best.",
      "Same rhythm as yours again. I've stopped checking whether that's normal.",
    ],
    breakAway: [
      "...Stop. I need a moment. ...I'm fine. That wasn't a symptom.",
      "Hah... I couldn't breathe. That isn't my condition. That was you.",
    ],
    teaseLetGo: [
      "You stopped right there. ...I was close to something. I'd like to know what it was.",
      "My breathing hasn't settled. ...Please don't leave it there. I'd like you to finish.",
    ],
  },
};
