// Lucas's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/lucas.js.
//
// Courteous and assertive, never meek: he sets the boundary plainly and
// politely. British spelling (canon UK transfer). Guarded spots (lips, chest,
// hips) stay a firm, gentlemanly no until spark. No Stigma/Artifact/knife
// material; biscuits and training are canon home-screen detail.
// Holds (spark+): honest about the monitor (he can't keep secrets), and
// "not yet" is wanting to do it properly, never reluctance.

export default {
  new: {
    headPat: [
      "Oh. That's a first. Is that a custom here?",
      "I'm all right, thank you. Was there something you needed?",
    ],
    cheekPoke: ["Have I something on my face?", "Hm? Can I help you?"],
    lipsTouch: [
      "Oh! I... Please don't. That isn't proper.",
      "Hands down, please. I mean that.",
    ],
    earTouch: [
      "Careful. The piercings catch.",
      "Ah. Mind the earrings, please.",
    ],
    handTap: [
      "Hello there. Are you all right?",
      "Do you need a hand with something? I'm happy to help.",
    ],
    chestTouch: [
      "I'll ask you to keep your hands to yourself.",
      "Step back, please. That's out of line.",
    ],
    bellyTouch: [
      "Excuse me. I don't know you nearly well enough for that.",
      "That's hardly a proper greeting. Hands down, please.",
    ],
    hipsTouch: [
      "That isn't how one treats a stranger. Please stop.",
      "No. I won't stand for that.",
    ],
    upset: [
      "Please stop that. I've asked politely.",
      "That's enough now. I mean it.",
    ],
  },
  known: {
    headPat: [
      "Is this a Japanese custom? Kaito never mentioned it.",
      "...Thank you, I think. You're in good spirits.",
    ],
    cheekPoke: [
      "Is that to keep me awake? I'm perfectly all right.",
      "Ha. You've caught me thinking again.",
    ],
    lipsTouch: [
      "Please don't. That's not something I take lightly.",
      "Ah. ...Forgive me, but no. Not my lips.",
    ],
    earTouch: [
      "Curious about the piercings? Fair enough. Gently, though.",
      "Mind them, please. They catch.",
    ],
    handTap: [
      "Your hands are freezing. Have you been out in the cold?",
      "I'm here. What do you need?",
    ],
    chestTouch: [
      "I'll ask you not to do that.",
      "Step back, please. I'd say the same to anyone.",
    ],
    bellyTouch: [
      "Please don't. That's a bit much, even between friends.",
      "Hands off, please. I've a biscuit if you're after one.",
    ],
    hipsTouch: [
      "That's far enough. Please don't.",
      "I'd thank you to stop there.",
    ],
    upset: [
      "All right, stop there. Is something the matter?",
      "Please stop. If something's wrong, just tell me.",
    ],
  },
  warm: {
    headPat: [
      "Ha. All right, I'll allow it.",
      "You're in a good mood. I'm glad.",
    ],
    cheekPoke: [
      "Ha. You're as bad as Kaito.",
      "You're up to something. I can tell.",
    ],
    lipsTouch: [
      "Please don't. Not that.",
      "Let's leave that, shall we? I mean it kindly.",
    ],
    earTouch: [
      "That tickles, honestly. Stop it.",
      "You've a fascination with these, haven't you?",
    ],
    handTap: [
      "Rough, aren't they? That's the training.",
      "I'm right here. Whatever it is, we'll sort it out together.",
    ],
    chestTouch: [
      "Back a little, please. I mean it kindly.",
      "That's close. Even for us.",
    ],
    bellyTouch: [
      "Ha! You caught me off guard. Don't make a habit of it.",
      "Hey, that's startling. I train for anomalies, not for you.",
    ],
    hipsTouch: ["Hey. Not there.", "I'd rather you didn't. Truly."],
    upset: [
      "All right, that's enough. I won't ask again.",
      "Stop that, please. You'll have Kaito thinking we've fallen out.",
    ],
  },
  spark: {
    headPat: [
      "...That's rather nice. Carry on.",
      "I'm meant to be the one looking after you. ...Just a moment longer, then.",
    ],
    cheekPoke: [
      "Am I blushing? I'm sure I'm not blushing.",
      "You're teasing me. I don't mind it as much as I should.",
    ],
    lipsTouch: [
      "...You'll make me forget my manners.",
      "Careful. I'm not sure I'd want you to stop.",
    ],
    earTouch: [
      "That's... very distracting.",
      "Please. You'll have me red to the ears.",
    ],
    handTap: [
      "Here. Let me hold onto it a while.",
      "Your hand fits rather well in mine.",
    ],
    chestTouch: [
      "There's no hiding it, is there? I've never been any good at secrets.",
      "...My heart's going far too fast. You've noticed, I expect.",
    ],
    bellyTouch: [
      "...You'll undo a year of training doing that.",
      "Steady on. A gentleman's allowed to be flustered once.",
    ],
    hipsTouch: [
      "...That's bold of you. I'm not sure what to do with my hands.",
      "Hold on. A gentleman asks first. ...So should you.",
    ],
    upset: [
      "All right, mercy. I can't think straight when you do that.",
      "Give me a moment. My composure's in pieces.",
    ],
    heartbeatHold: [
      "I train every morning for a steady pulse. Clearly I've a great deal more training to do.",
      "So now you know. I'd rather you'd heard it from me, but my heart beat me to it.",
    ],
    lipHold: [
      "You've no idea how difficult that was.",
      "A gentleman doesn't kiss someone's hand without asking. ...So consider this me asking.",
    ],
    handHold: [
      "You let go first. I'll admit I was hoping you wouldn't.",
      "Let me walk you back. I'd like to hold on a little longer, if that's all right.",
    ],
  },
  close: {
    headPat: [
      "I'll not pretend I don't like that. Carry on.",
      "You can do that whenever you like. I'll make the time.",
    ],
    cheekPoke: [
      "Yes, I'm blushing. I've given up denying it around you.",
      "If you're going to tease me, at least stay close while you do it.",
    ],
    lipsTouch: [
      "I've been very patient, you know. Don't test it too far.",
      "...If you mean that, I'll not hold back.",
    ],
    earTouch: [
      "You know exactly what that does. ...Do it again, then.",
      "...Come closer. I'd rather you whispered than poked.",
    ],
    handTap: [
      "There. I've got you. I'll not let go first.",
      "Stay close. Wherever you're going, I'm coming too.",
    ],
    chestTouch: [
      "Leave your hand there. I've nothing to hide from you.",
      "Feel that? It's been like this since you walked in. I'm not sorry.",
    ],
    bellyTouch: [
      "Ha! You've found a weak spot. I'll trust you with it.",
      "Mind yourself. I'll return fire, and I'm quicker than you.",
    ],
    hipsTouch: [
      "Bold. ...All right. Then allow me.",
      "Steady. If we're doing this, I'll lead. ...May I?",
    ],
    heartbeatHold: [
      "Yes, it's racing. I'll not apologise for it.",
      "That's what you do to me. I thought you ought to see it for yourself.",
    ],
    lipHold: [
      "I'll be honest. I spent that entire time wanting to kiss you.",
      "...You stopped. I'm relieved and disappointed in equal measure.",
    ],
    handHold: [
      "Wherever the road goes from here, I'd like your hand in mine for it.",
      "I'll keep you safe. That was always a promise. Now it's personal.",
    ],
    caughtTease: [
      "Ah... Not yet. Not because I don't want to. Because I want to do this properly.",
      "Steady. ...I'd like nothing more, honestly. But not yet.",
    ],
  },
  bound: {
    heartbeatHold: [
      "It's no calmer than it was the first time. I don't expect it ever will be.",
      "You know it races for you. You've known for a while now.",
    ],
    lipHold: [
      "You're allowed far more than your fingertip, you know. I'd have thought you'd remember.",
      "You're making it very hard to be a gentleman. You always do.",
    ],
    handHold: [
      "I'd like to show you the aurora over Frostheim one of these nights. Just like this.",
      "I'm glad we met. I tell you that often, I know. I'll keep telling you.",
    ],
    breakAway: [
      "Hold on. Give me a moment to breathe. ...You're quite unfair, you know that?",
      "That's... I can't think. Steady, Lucas. ...Steady.",
    ],
    teaseLetGo: [
      "You've stopped? Now? ...That's hardly sporting, you know. I was nearly undone.",
      "I could ask you to keep going, but I suspect that's precisely what you're waiting for. ...Later, then. I'll hold you to it.",
    ],
  },
};
