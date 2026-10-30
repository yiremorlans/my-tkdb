// Lucas's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/lucas.js.
//
// Courteous and assertive, never meek: he sets the boundary plainly and
// politely. British spelling (canon UK transfer). Guarded spots (lips, chest,
// hips) stay a firm, gentlemanly no until spark. No Stigma/Artifact/knife
// material; biscuits and training are canon home-screen detail.

export default {
  new: {
    headPat: ["Oh. That's a first. Is that a custom here?", "I'm all right, thank you. Was there something you needed?"],
    cheekPoke: ["Have I something on my face?", "Hm? Can I help you?"],
    lipsTouch: ["That's not appropriate. We've only just met.", "Please don't. I'd rather we were properly introduced first."],
    earTouch: ["Careful. The piercings catch.", "Ah. Mind the earrings, please."],
    handTap: ["Hello there. Are you all right?", "Do you need a hand with something? I'm happy to help."],
    chestTouch: ["I'll ask you to keep your hands to yourself.", "That's quite enough. Step back, please."],
    bellyTouch: ["Excuse me. I don't know you nearly well enough for that.", "That's hardly a proper greeting. Hands down, please."],
    hipsTouch: ["That isn't how one treats a stranger. Please stop.", "No. I won't stand for that."],
    upset: ["Please stop that. I've asked politely.", "That's enough now. I mean it."],
  },
  known: {
    headPat: ["Is this a Japanese custom? Kaito never mentioned it.", "...Thank you, I think. You're in good spirits."],
    cheekPoke: ["Is that to keep me awake? I'm perfectly all right.", "Ha. You've caught me thinking again."],
    lipsTouch: ["Please don't. That's not something I take lightly.", "No. I'd rather you didn't."],
    earTouch: ["Curious about the piercings? Fair enough. Gently, though.", "Mind them, please. They catch."],
    handTap: ["Your hands are freezing. Have you been out in the cold?", "I'm here. What do you need?"],
    chestTouch: ["I'll ask you not to do that.", "Step back, please. I'd say the same to anyone."],
    bellyTouch: ["Please don't. That's a bit much, even between friends.", "Hands off, please. I've a biscuit if you're after one."],
    hipsTouch: ["That's far enough. Please don't.", "I'd thank you to stop there."],
    upset: ["All right, that's enough. Is something the matter?", "Please stop. If something's wrong, just tell me."],
  },
  warm: {
    headPat: ["Ha. All right, I'll allow it.", "You're in a good mood. I'm glad."],
    cheekPoke: ["Ha. You're as bad as Kaito.", "You're up to something. I can tell."],
    lipsTouch: ["Please don't. Not that.", "Let's leave that, shall we? I mean it kindly."],
    earTouch: ["That tickles, honestly. Stop it.", "You've a fascination with these, haven't you?"],
    handTap: ["Rough, aren't they? That's the training.", "I'm right here. Whatever it is, we'll sort it out together."],
    chestTouch: ["Back a little, please. I mean it kindly.", "That's close. Even for us."],
    bellyTouch: ["Ha! You caught me off guard. Don't make a habit of it.", "Hey, that's startling. I train for anomalies, not for you."],
    hipsTouch: ["Hey. Not there.", "I'd rather you didn't. Truly."],
    upset: ["All right, all right. I surrender.", "Enough now. You'll have Kaito thinking we've fallen out."],
  },
  spark: {
    headPat: ["...That's rather nice. Don't tell Kaito.", "I'm meant to be the one looking after you. ...Just a moment longer, then."],
    cheekPoke: ["Am I blushing? I'm sure I'm not blushing.", "You're teasing me. I don't mind it as much as I should."],
    lipsTouch: ["...You'll make me forget my manners.", "Careful. I'm not sure I'd want you to stop."],
    earTouch: ["That's... very distracting.", "Please. You'll have me red to the ears."],
    handTap: ["Here. Let me hold onto it a while.", "Your hand fits rather well in mine."],
    chestTouch: ["There's no hiding it, is there? I've never been any good at secrets.", "...My heart's going far too fast. You've noticed, I expect."],
    bellyTouch: ["...You'll undo a year of training doing that.", "Steady on. A gentleman's allowed to be flustered once."],
    hipsTouch: ["...That's bold of you. I'm not sure what to do with my hands.", "Hold on. A gentleman asks first. ...So should you."],
    upset: ["All right, mercy. I can't think straight when you do that.", "Give me a moment. My composure's in pieces."],
  },
};
