// Subaru's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/subaru.js.
//
// Gentle, apologizes even when he's the one being prodded, but "I'm sorry"
// is capped at one per tier so it lands; the rest of his fretting shows in
// trailing off and asking. Upset is the one place he doesn't soften: no
// laughing it off through warm. From spark it turns flustered instead (the
// rig's upset face does too). His stigma reads people on contact and their
// belongings, but touch lines never have him reading the player; the
// new-tier gloves carry his wariness; no glove lines past new. He doesn't name his feelings; the detail implies them.
// Guarded spots (lips, chest, hips) stay polite rebuffs until spark.
// Holds (spark+) are flustered, never upset (touch-averse rule); the
// one-"I'm sorry"-per-tier cap counts the hold pools too.

export default {
  new: {
    headPat: [
      "Oh! Is there something in my hair?",
      "May I ask what that was for?",
    ],
    cheekPoke: [
      "Did I have something on my face?",
      "Was there a crumb? I had sweets with my tea.",
    ],
    lipsTouch: [
      "Please, I'd rather you didn't.",
      "Oh... Excuse me. Not my lips.",
    ],
    earTouch: [
      "The earring... Please be careful with it.",
      "Oh! That tickles.",
    ],
    handTap: [
      "The gloves stay on. It's better that way.",
      "Oh, please be careful. I'd hate to... Never mind. I'm sorry.",
    ],
    chestTouch: [
      "Could you step back a little?",
      "That's a little close, I think.",
    ],
    bellyTouch: [
      "Um... Could you please not?",
      "I'm not sure what you were checking for.",
    ],
    hipsTouch: ["Ah! Please don't.", "Oh, that's... That's troubling."],
    upset: [
      "Please stop. I'd really like you to stop.",
      "Please... That's enough.",
    ],
  },
  known: {
    headPat: [
      "Is my hair sticking up again?",
      "Oh... That's a little embarrassing.",
    ],
    cheekPoke: [
      "Was I smiling again?",
      "Was that to get my attention? You have it.",
    ],
    lipsTouch: [
      "Ah! Um... Not my lips, please.",
      "I don't think that's... Please don't.",
    ],
    earTouch: [
      "Careful. That earring is very dear to me.",
      "Oh, that tickles... I'm not used to it.",
    ],
    handTap: [
      "Oh! You caught me off guard.",
      "Do you need something? I'm right here.",
    ],
    chestTouch: [
      "Forgive me, but could you give me some room?",
      "I'd feel better with a little space.",
    ],
    bellyTouch: [
      "Oh! Please, I'm ticklish there.",
      "I'd appreciate it if you didn't.",
    ],
    hipsTouch: [
      "Oh! No, please.",
      "That isn't something I'm comfortable with.",
    ],
    upset: [
      "Um... Could you stop, please?",
      "Please, that's enough. I mean it.",
    ],
  },
  warm: {
    headPat: [
      "Mm... I suppose I don't mind.",
      "That's nice, actually. I'm sorry, is that strange?",
    ],
    cheekPoke: ["What is it?", "You're in a good mood today."],
    lipsTouch: ["Please, not that.", "Oh... Those are... No. Please."],
    earTouch: [
      "The wisteria? You like it? ...I'm glad.",
      "Ha ha... That tickles. Gently, please.",
    ],
    handTap: [
      "Your hands are cold. Shall I make some tea?",
      "Is something the matter? You can tell me.",
    ],
    chestTouch: [
      "I'm sure you mean well, but please.",
      "Please, a little room. Even for you.",
    ],
    bellyTouch: [
      "Oh! Ha ha... That's not fair at all.",
      "Was that to make me laugh? It worked, I'm afraid.",
    ],
    hipsTouch: [
      "No. That's not all right.",
      "That's... Please. Anywhere else.",
    ],
    upset: [
      "That's enough now. Please.",
      "I thought you knew better than this. Please stop.",
    ],
  },
  spark: {
    headPat: [
      "I don't mind at all. Please, don't stop on my account.",
      "...That's lovely. I could stay like this for a long while.",
    ],
    cheekPoke: [
      "Ah... You've made me lose my train of thought.",
      "You're teasing me. ...I don't mind.",
    ],
    lipsTouch: [
      "Oh... I, um. I don't know what to say.",
      "...Please don't do that unless you mean it.",
    ],
    earTouch: [
      "That's a little unfair, you know.",
      "Please, I can't think when you do that.",
    ],
    handTap: [
      "Your hand's warmer than I expected.",
      "You can hold my hand, if you'd like.",
    ],
    chestTouch: [
      "Could you stay like that, just a moment?",
      "...Ah. You've found it, haven't you?",
    ],
    bellyTouch: [
      "Oh... Um. Ha ha... You know I'm ticklish now.",
      "Um... Give me a moment.",
    ],
    hipsTouch: [
      "Oh! ...You're very bold today.",
      "I... I think I need to sit down.",
    ],
    upset: [
      "Please... I'll lose my words entirely if you keep on.",
      "All right, all right. I surrender. Please stop.",
    ],
    heartbeatHold: [
      "...I never realized it raced like this around you. Now I can't stop noticing.",
      "It always beats like that. ...Truly.",
    ],
    lipHold: [
      "...Oh. That was... I've forgotten my line entirely.",
      "Um... Please, let me find my words first.",
    ],
    handHold: [
      "...I'm not letting go first. Just so you know.",
      "Oh... Already? No, that's all right. Of course.",
    ],
  },
  close: {
    headPat: [
      "Again, please. Just a little longer.",
      "Mm... I could get used to this.",
    ],
    cheekPoke: [
      "You always find the same spot. Go on, then.",
      "Hold still. It's my turn to poke you back.",
    ],
    lipsTouch: [
      "...So you did mean it. Then please, don't stop at one.",
      "If that was a question, the answer's yes.",
    ],
    earTouch: [
      "If you whisper something, I'll keep it to myself.",
      "Mm... You can stay there. I'll hold still.",
    ],
    handTap: [
      "There you are. I was hoping you'd do that.",
      "Your hand's cold. Here, let me keep it warm a while.",
    ],
    chestTouch: [
      "Mm... This is nice. Just like this.",
      "Lean in, if you like. I'm not going anywhere.",
    ],
    bellyTouch: [
      "Ha ha... Keep that up and I'll have to return the favor.",
      "I'm still ticklish there, you know. ...I'm not stopping you.",
    ],
    hipsTouch: [
      "Somewhere quieter, perhaps? ...Only if you'd like.",
      "That wasn't an accident, was it?",
    ],
    heartbeatHold: [
      "So now you know. ...I'd hoped the smile would hide it.",
      "It's been like that since you came in.",
    ],
    lipHold: [
      "...You're very patient. I'm afraid I'm not, anymore.",
      "Oh... I had something to say. I don't think I need it now.",
    ],
    handHold: [
      "Mm... My hand feels very empty now.",
      "Next time, I'll be the one who holds on longer.",
    ],
    caughtTease: [
      "Ah...! Not yet. ...Please don't take that as a no.",
      "O-oh... I'm sorry, I'm not quite ready. ...But I'd like to be.",
    ],
  },
  bound: {
    heartbeatHold: [
      "It still does that. Even now, after everything.",
      "You know that sound better than anyone by now.",
    ],
    lipHold: [
      "Only your finger? You've gone shy. That's supposed to be my part.",
      "Please don't stop there. ...You know I mean it.",
    ],
    handHold: [
      "Mm... I'd have held yours first, if you'd waited.",
      "Stay a little longer? I'll put the kettle on in a while.",
    ],
    breakAway: [
      "Ah...! Wait, please. I can't... Let me breathe.",
      "Please... I've lost my composure completely. Just a moment.",
    ],
    teaseLetGo: [
      "You stopped. ...That's a little cruel of you, you know.",
      "Later, then. Please don't make me wait too long.",
    ],
  },
};
