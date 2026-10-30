// Subaru's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/subaru.js.
//
// Gentle, apologizes even when he's the one being prodded. His stigma reads
// belongings only, so touch lines never have him reading the player; the
// gloves carry his wariness at new/known, and the glove coming off is the
// spark detail. He doesn't name his feelings; the detail implies them.
// Guarded spots (lips, chest, hips) stay polite rebuffs until spark.

export default {
  new: {
    headPat: ["Oh! Is there something in my hair?", "Ah, forgive me, I wasn't expecting that."],
    cheekPoke: ["Oh? Did I have something on my face? I'm sorry.", "Ha ha... You surprised me."],
    lipsTouch: ["Ah, please, I'd rather you didn't.", "Oh... Excuse me. That's a little too close."],
    earTouch: ["Ah, the earring... Please be careful with it.", "Oh! That tickles. Forgive me."],
    handTap: ["Ah, the gloves stay on. I'm sorry, it's better that way.", "Oh, please be careful. I'd hate to... Never mind. I'm sorry."],
    chestTouch: ["Oh, um... Could you step back a little? I'm sorry.", "Please, not there. Forgive me."],
    bellyTouch: ["Ah! Um... Excuse me. Could you please not?", "Oh, I'm sorry... That startled me. Please don't."],
    hipsTouch: ["Ah! Please don't.", "I'm sorry, that's... Please keep your hands to yourself."],
    upset: ["I'm sorry, could you stop? Just for a moment.", "Please... That's enough. I'm sorry."],
  },
  known: {
    headPat: ["Oh... Is my hair sticking up again?", "Ha ha... That's a little embarrassing."],
    cheekPoke: ["Oh? Ha ha. Was I smiling again?", "Ah... Was that to get my attention? You have it."],
    lipsTouch: ["Oh... No, please. I'm sorry.", "Ah, I don't think that's... Please don't."],
    earTouch: ["Ah, please mind the earring.", "Oh, that tickles... I'm sorry, I'm not used to it."],
    handTap: ["Oh, careful. I keep the gloves on for a reason.", "Ah... Do you need something? I'm right here."],
    chestTouch: ["Ah, um... That's a little close. Forgive me.", "Please, step back a little. I'm sorry."],
    bellyTouch: ["Ah, um... I did have some hot water, if that's what you were checking.", "Oh, um... I'd appreciate it if you didn't. I'm sorry."],
    hipsTouch: ["Oh! Please, don't.", "I'm sorry, I'd really rather you didn't."],
    upset: ["Um... Could you stop, please? I'm sorry.", "Please, that's enough. ...Thank you."],
  },
  warm: {
    headPat: ["Ha ha... I suppose I don't mind.", "Oh... That's nice, actually. I'm sorry, is that strange?"],
    cheekPoke: ["Oh? Ha ha. What is it?", "You've caught me smiling again, haven't you."],
    lipsTouch: ["Ah... Please, not that.", "Oh... I'm sorry. Not there."],
    earTouch: ["The wisteria? You like it? ...I'm glad.", "Ha ha, that tickles. Please be gentle with the earring."],
    handTap: ["Oh... Here. You can hold it, if you like.", "Is something the matter? I'm right here."],
    chestTouch: ["Ah, um... Please, a little further back.", "Oh... That's a bit too close. Forgive me."],
    bellyTouch: ["Oh! Ha ha... You caught me completely off guard.", "Ah! ...Was that to make me laugh? It worked, I'm afraid."],
    hipsTouch: ["Oh! Please don't.", "That's... I'm sorry, no."],
    upset: ["Ha ha... All right, that's enough now. Please.", "Could you stop, just for a moment? I'm sorry."],
  },
  spark: {
    headPat: ["Oh... I don't mind at all. Please, don't stop on my account.", "Ha ha... I'm sure my face is red now."],
    cheekPoke: ["Ah... Please, I'm flustered enough already.", "You're teasing me. ...I don't mind."],
    lipsTouch: ["Oh... I, um. I don't know what to say.", "...Please don't do that unless you mean it."],
    earTouch: ["Ah... That's a little unfair.", "Oh... Please, I can't think when you do that."],
    handTap: ["Here. ...I took the glove off. Is that all right?", "Oh... You can hold on, if you'd like."],
    chestTouch: ["Oh... I'm sorry. Could you stay like that, just a moment?", "Ah... Please, give me a moment."],
    bellyTouch: ["Oh... Um. I'm sorry, I've lost my train of thought.", "Ha ha... Please don't look at me just now."],
    hipsTouch: ["Ah! ...You're very bold today.", "Oh... I, um. Not here, please."],
    upset: ["Please... You're making it very hard to keep my composure.", "Ha ha... All right. I surrender. Please stop."],
  },
};
