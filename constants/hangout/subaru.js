// Subaru's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/subaru.js.
//
// Gentle, apologizes even when he's the one being prodded, but "I'm sorry"
// is capped at one per tier so it lands; the rest of his fretting shows in
// trailing off and asking. Upset is the one place he doesn't soften: no
// laughing it off through warm. From spark it turns flustered instead (the
// rig's upset face does too). His stigma reads belongings only, so touch lines never have him reading the player; the
// gloves carry his wariness at new/known, and the glove coming off is the
// spark detail. He doesn't name his feelings; the detail implies them.
// Guarded spots (lips, chest, hips) stay polite rebuffs until spark.

export default {
  new: {
    headPat: [
      "Oh! Is there something in my hair?",
      "May I ask what that was for?",
    ],
    cheekPoke: [
      "Did I have something on my face?",
      "Ha ha... Was there a crumb? I had sweets with my tea.",
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
      "Ah! Um... Could you please not?",
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
      "Ha ha... That's a little embarrassing.",
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
      "I keep the gloves on for a reason.",
      "Do you need something? I'm right here.",
    ],
    chestTouch: [
      "Forgive me, but could you give me some room?",
      "I'd feel better with a little space.",
    ],
    bellyTouch: [
      "I did have some hot water, if that's what you were checking.",
      "I'd appreciate it if you didn't.",
    ],
    hipsTouch: [
      "Oh! No, please.",
      "That isn't something I'm comfortable with.",
    ],
    upset: [
      "Um... Could you stop, please? I'm sorry.",
      "Please, that's enough. I mean it.",
    ],
  },
  warm: {
    headPat: [
      "Ha ha... I suppose I don't mind.",
      "That's nice, actually. I'm sorry, is that strange?",
    ],
    cheekPoke: [
      "What is it?",
      "You're in a good mood today.",
    ],
    lipsTouch: ["Ah... Please, not that.", "Oh... Those are... No. Please."],
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
      "Ah! ...Was that to make me laugh? It worked, I'm afraid.",
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
      "Ha ha... I'm sure my face is red now.",
    ],
    cheekPoke: [
      "Please, I'm flustered enough already.",
      "You're teasing me. ...I don't mind.",
    ],
    lipsTouch: [
      "Oh... I, um. I don't know what to say.",
      "...Please don't do that unless you mean it.",
    ],
    earTouch: [
      "Ah... That's a little unfair.",
      "Please, I can't think when you do that.",
    ],
    handTap: [
      "Here. ...I took the glove off. Is that all right?",
      "You can hold on, if you'd like.",
    ],
    chestTouch: [
      "Could you stay like that, just a moment?",
      "I wasn't going to ask you to move.",
    ],
    bellyTouch: [
      "Oh... Um. Ha ha... You know I'm ticklish now.",
      "Ha ha... Please don't look at me just now.",
    ],
    hipsTouch: [
      "Ah! ...You're very bold today.",
      "That's... Please, that's a little much.",
    ],
    upset: [
      "I-I'm trying to stay calm, and you're not helping.",
      "Ha ha... All right. I surrender. Please stop.",
    ],
  },
  close: {
    headPat: [
      "Ha ha... Again, please. Just a little longer.",
      "Leave my hair however you've made it. I'll keep it that way.",
    ],
    cheekPoke: [
      "You always find the same spot. Go on, then.",
      "Hold still. It's my turn to poke you back.",
    ],
    lipsTouch: [
      "...So you did mean it. Ha ha... Then please, don't stop at one.",
      "If that was a question, the answer's yes.",
    ],
    earTouch: [
      "You always go for the wisteria side. I've noticed.",
      "Mm... You can stay there. I'll hold still.",
    ],
    handTap: [
      "The glove's already off. ...I took it off when I saw you coming.",
      "Your hand's cold. Here, let me keep it warm a while.",
    ],
    chestTouch: [
      "It's very loud in there, isn't it? Stay anyway.",
      "Lean in, if you like. I'm not going anywhere.",
    ],
    bellyTouch: [
      "Ha ha... Keep that up and I'll have to return the favor.",
      "Your hand's warm. Leave it there a little longer.",
    ],
    hipsTouch: [
      "Somewhere quieter, perhaps? ...Only if you'd like.",
      "That wasn't an accident, was it? ...Good.",
    ],
  },
};
