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
// belongings, but touch lines never have him reading the player. Before
// spark he won't hold hands or allow bare skin (spark is the first time,
// matching his Close Friend bond scene); handTap never talks about the
// gloves, and glovesPat mixes glove lines with hand ones. From spark, bare
// skin costs him (canon: handling things bare drains him): handTap is dizzy
// and drained and he'd rather hold hands gloved; it eases by bound but never
// turns casual. handHold lines fit a gloved or bare hold (holdThrough), so
// they never mention the cost. Both outfits: his gloves are a removable
// article (docs/hangout-activity.md §4.2), a tap on them is glovesPat and from spark
// (user, 2026-11-07: his Close Friend bond scene is the first bare-hand
// contact) a double-tap takes both off (glovesOff), and then handTap is his
// bare hand. He doesn't name his feelings; the detail implies them.
// Guarded spots (lips, chest, hips) stay polite rebuffs until spark.
// Holds (spark+) are flustered, never upset (touch-averse rule); the
// one-"I'm sorry"-per-tier cap counts the hold pools too.

export default {
  new: {
    glovesPat: [
      "Oh! Please, mind the gloves. They're there for a reason.",
      "Ah... Did you need my hand for something?",
    ],
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
      "Oh! Please, not my hands.",
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
    glovesPat: [
      "The gloves? Just a habit of mine.",
      "I'd rather keep my hands to myself. It's nothing you did.",
    ],
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
    glovesPat: [
      "It's all right. With the gloves on, I don't mind.",
      "Oh... Hello to you too.",
    ],
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
      "Oh... That's all right. You only surprised me a little.",
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
    glovesPat: [
      "...Were you hoping I'd take these off?",
      "If you want them off, I won't stop you.",
    ],
    glovesOff: [
      "Oh...! My gloves. I... No. It's all right. Leave them off.",
      "Oh... They're yours to keep for now. Please don't lose them.",
    ],
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
      "Ah... Your hand. ...One moment. The room's tilting a little.",
      "Ah... This is easier with my gloves on. ...I'll get used to it.",
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
      "...Oh. You let go. I'd only just found the nerve.",
      "That was... Thank you. For being patient with me.",
    ],
  },
  close: {
    glovesPat: [
      "I still need these, you know. ...But you can take them off. I'll manage.",
      "They do help. ...Still, I'd rather feel your hand. I'll be all right.",
    ],
    glovesOff: [
      "You make that look so easy. ...I suppose it is, with you.",
      "Oh... All right. Go slowly with me, please.",
    ],
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
      "With a glove on, I'd hold it for hours. Like this, only a moment.",
      "...There. That one didn't take as much out of me.",
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
    glovesPat: [
      "Ah... Is that a hint? I can take a hint, you know.",
      "I still put them on every morning. Then you come along.",
    ],
    glovesOff: [
      "You do that so neatly now. ...I've stopped bracing for it.",
      "Mm. Hold on to them for me?",
    ],
    heartbeatHold: [
      "It still does that. Even now, after everything.",
      "You know that sound better than anyone by now.",
    ],
    lipHold: [
      "Only your finger? You've gone shy. That's supposed to be my part.",
      "Please don't stop there. ...You know I mean it.",
    ],
    handTap: [
      "I've gotten better at this. ...Gloves for the long walks, though.",
      "Mm... Only a little dizzy now. You're easy to hold onto.",
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
