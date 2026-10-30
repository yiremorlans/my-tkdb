// Haku's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/haku.js.
//
// Polite and prompt, never stalling; he spooks the player, never the reverse.
// No admitting he cares before warm. "Princess" is his bold register, held
// for spark. Guarded spots (lips, chest, hips) stay serious until spark.

export default {
  new: {
    headPat: ["Huh. Didn't see that coming. You do that to everyone?", "Easy. I'm not a shrine cat."],
    cheekPoke: ["Something on my face? ...Or checking if I'm real?", "Ha ha. Okay. What was that for?"],
    lipsTouch: ["Whoa. Let's not.", "Hey. Hands down, okay?"],
    earTouch: ["The ribbons? Leave them be, would you?", "Ha... That's my ear. You lost?"],
    handTap: ["Need something? I'll see what I can do.", "Oh. Hey. You need a hand with something?"],
    chestTouch: ["Hey now. Let's keep a little distance.", "Easy. We just met."],
    bellyTouch: ["Whoa. That's my stomach, you know.", "Hey, easy. Something possess you just now?"],
    hipsTouch: ["Whoa. Okay, no.", "Hands to yourself, huh? I mean it."],
    upset: ["Okay, okay. That's enough.", "Keep that up and I'll tell you what's standing behind you."],
  },
  known: {
    headPat: ["...Again? You're braver than you look.", "Ha ha. Is that a thank-you or something?"],
    cheekPoke: ["You've got that look. Bored?", "Poke all you want. I'm not a ghost, I promise."],
    lipsTouch: ["Nope. Not that.", "...Don't push it."],
    earTouch: ["You like the earrings, huh?", "That tickles. Cut it out."],
    handTap: ["Need something? I'm listening.", "Huh. You came over just for that? ...Okay."],
    chestTouch: ["Hey. Little close, don't you think?", "Easy there."],
    bellyTouch: ["Still a no. Go for the hand if you need something.", "Ha... Hey. Ease up, would you?"],
    hipsTouch: ["Okay. Hands off.", "Whoa. Not happening."],
    upset: ["Okay, that's enough. Seriously.", "Don't. Something behind you doesn't like it either. ...Kidding."],
  },
  warm: {
    headPat: ["Ha ha. You're really getting comfortable, huh.", "...Okay, that's kind of nice. Don't make it weird."],
    cheekPoke: ["What? You've got that face again.", "Keep that up and I'll start poking back."],
    lipsTouch: ["Hey. That one's off limits.", "...Don't. I mean it."],
    earTouch: ["That tickles. You knew it would, didn't you.", "Leave the ribbons alone and I'll think about forgiving you."],
    handTap: ["Here. Hold on if you want. I don't mind.", "Need something? You know I'll handle it."],
    chestTouch: ["Easy. That's close, even for you.", "Hey. Back up a little, okay?"],
    bellyTouch: ["Hey! ...Okay, you got me. Happy?", "Ha ha... Easy. I'm not as tough there as I look."],
    hipsTouch: ["Hey. Nope.", "...You lost? That's not my hand."],
    upset: ["Okay, okay. I give. What do you want?", "Hey. Enough. I'm right here, you don't have to keep poking."],
  },
  spark: {
    headPat: ["Careful, princess. I might start expecting that.", "...Ha. You're gonna spoil me."],
    cheekPoke: ["Okay, okay. My face is warm. Happy?", "Keep poking. See what happens, princess."],
    lipsTouch: ["...Careful. I'm not as good at behaving as I look.", "Hey. Do that and I'll lose the joke I had ready."],
    earTouch: ["...That's a dirty trick, princess.", "Keep that up and I'm not responsible."],
    handTap: ["Got you. ...Not letting go, by the way.", "Here. Your hand fits in mine just fine."],
    chestTouch: ["...You can probably hear that. Don't say anything.", "Ha ha... That's not fair. I wasn't ready."],
    bellyTouch: ["Ha... Careful, princess. I'm not great at sitting still for that.", "...Okay. That one got me. Don't tell Zenji."],
    hipsTouch: ["...You're bold today, princess.", "Hey. Not here. ...Ask me again later."],
    upset: ["Okay, I surrender. Stop before I do something out of character.", "Princess. Enough. My heart can't take it."],
  },
};
