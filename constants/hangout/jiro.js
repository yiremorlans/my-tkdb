// Jiro's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/jiro.js.
//
// Calm, literal and clinical; he reads every touch as a symptom or a test.
// No food in his lines before warm, no confections at all (closeFriend bond
// scene). Chest scars and tearing wounds are canon; the Stigma stays out.
// Guarded spots (lips, chest, hips) stay serious until spark.

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
    lipsTouch: ["Please keep your hands away from my face.", "Don't."],
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
      "...Is that something people do? Okay.",
    ],
    cheekPoke: [
      "You keep doing that. My face is fine.",
      "If you're testing my reflexes, I didn't flinch.",
    ],
    lipsTouch: [
      "No. That's how contact infections spread.",
      "Please don't. I'd have to disinfect you.",
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
    lipsTouch: ["That's still not hygienic. Please stop.", "No. Not that."],
    earTouch: [
      "You've counted them already. Still six.",
      "That tickles. I didn't know it would.",
    ],
    handTap: [
      "I'll check your pulse while I have your hand.",
      "...You can hold it. The gloves are clean.",
    ],
    chestTouch: [
      "Gently. That's where most of the scars are.",
      "Please don't press there. A suture might open.",
    ],
    bellyTouch: [
      "...Oh. My muscles flinched. That doesn't happen during exams.",
      "Lightly. Those sutures open easily. ...That's fine.",
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
      "...That isn't hygienic. I don't care right now.",
      "...I don't have a protocol for this.",
    ],
    earTouch: ["...That's distracting.", "Please stop. ...No. Don't stop."],
    handTap: [
      "Take the glove off, if you want. I'll allow it.",
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
      "I took the glove off already. I thought you'd come back for it.",
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
  },
};
