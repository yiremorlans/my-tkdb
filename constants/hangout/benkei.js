// Benkei's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/benkei.js. His Live2D model
// isn't converted yet; the lines are ready for when it is.
//
// Kind, warm, easily flustered shopkeep; a young former professor with a
// casual register (no "shan't"/"needn't", no old-man framing). Staff, never a
// student. Rebuffs stay gentle and a little sheepish, with the shop and his
// cat manager as cover. Never touches why Clementia/Ultio ended. Guarded
// spots (lips, chest, hips) stay polite refusals until spark.

export default {
  new: {
    headPat: ["Oh! Uh, hi. Can I help you find something?", "Ha ha... That's new. Usually people just ask where the batteries are."],
    cheekPoke: ["Oh? Did I have something on my face?", "Ha... You caught me off guard there."],
    lipsTouch: ["Whoa, okay. Let's keep it to the shopping, yeah?", "Ah, sorry, that's a little much."],
    earTouch: ["Oh! That tickles. Sorry, I'm listening.", "Ha ha... I can hear you fine from over there, promise."],
    handTap: ["Oh, sorry, was I in your way? Here.", "Need a hand with something? That's what I'm here for."],
    chestTouch: ["Ah, could you give me a little room? Sorry.", "Hey, careful. My manager's watching."],
    bellyTouch: ["Oh! Uh, that's my stomach. Sorry, could you not?", "Ha ha... Let's keep the poking to the snack aisle, yeah?"],
    hipsTouch: ["Whoa! Okay, hands where the cat can see them.", "Ah, no, sorry. Not okay."],
    upset: ["Okay, okay. Let's take a breather, yeah?", "Sorry, could you stop? Just for a bit."],
  },
  known: {
    headPat: ["Ha ha... Is my hair sticking up again?", "Oh. You're the second one today. The first was the cat."],
    cheekPoke: ["Hey. What's that for?", "Ha ha. You're in a mood today, huh."],
    lipsTouch: ["Ah, no. Sorry, not that.", "Hey, come on. Behave."],
    earTouch: ["Ha ha, that tickles. Cut it out.", "Oh, sorry, was I zoning out? I'm listening."],
    handTap: ["Careful, I've got marker on these from the price tags.", "Hey, you. Need something? I'm right here."],
    chestTouch: ["Ah, a little close. Sorry.", "Careful, you'll wrinkle the tie."],
    bellyTouch: ["Hey, no poking. I'm not the bread.", "Ah, sorry. Not there, okay?"],
    hipsTouch: ["Hey! Hands to yourself.", "Okay, no. The manager would not approve."],
    upset: ["Okay, that's enough. Sorry, but it is.", "Hey. Let me catch my breath a second."],
  },
  warm: {
    headPat: ["Ha ha... You know, I don't mind that.", "Oh. That's nice, actually. Don't tell the cat."],
    cheekPoke: ["What? Was I smiling again?", "You're in a good mood. I like seeing that."],
    lipsTouch: ["Ah... Not that. Sorry.", "Hey. Careful."],
    earTouch: ["Ha ha, that tickles. You're doing that on purpose.", "You've got my attention. You always do."],
    handTap: ["Here. What's up?", "Oh, you came over just to do that? Ha ha. Okay."],
    chestTouch: ["Ah, that's a little close. Sorry.", "Hey, easy. I'm still on shift."],
    bellyTouch: ["Whoa! Ha ha... Okay, you got me.", "Ha... Sneaky. Warn me next time, yeah?"],
    hipsTouch: ["Whoa. Hey.", "Okay, not that. Sorry."],
    upset: ["Okay, okay. That's enough for now.", "Ha ha... Give me a minute, would you?"],
  },
  spark: {
    headPat: ["Oh... I don't mind. Really.", "Ha ha... My face is red, isn't it."],
    cheekPoke: ["You're teasing me. ...I don't mind.", "Ah... I'm flustered enough already, you know."],
    lipsTouch: ["Oh. I, uh... Wow. Okay.", "...Don't do that unless you mean it. I'll take it seriously."],
    earTouch: ["Ah... That's not fair.", "Hey... I can't think when you do that."],
    handTap: ["Here. You can hold on, if you want.", "Oh... Okay. I'll just keep this, then."],
    chestTouch: ["Ah... You can probably hear that, huh.", "Could you stay like that a second? Sorry. Just a second."],
    bellyTouch: ["Oh... Ha ha. My stomach's doing a whole thing now.", "Ah... Okay. You can leave it there. I'll manage."],
    hipsTouch: ["Whoa... You're bold today.", "Hey... Not in front of the manager."],
    upset: ["Okay, I give up. You win. Just give me a second.", "Ha ha... You're making it really hard to work, you know."],
  },
};
