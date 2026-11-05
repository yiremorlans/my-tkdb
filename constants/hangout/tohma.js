// Tohma's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/tohma.js.
//
// The sly courtier: rebuffs come as smooth, faintly threatening courtesy,
// never bluntness. No alprazolam/headache material at any tier; no
// Stigma/Artifact. Guarded spots (lips, chest, hips) stay composed refusals
// until spark.
//
// Monocle (removable, §4.2): it borrows his cheekPoke face and pose. Canon
// only says it masks the glint in his eye, so no reason for wearing it is
// invented; taking it off is unguarding him, courtly at every tier. At warm he's
// annoyed and keeps it restrained (rig monocleOff: straight face).
//
// Holds (spark+): the heartbeat check finds the courtier out, and he keeps
// it courtly ("it never happened", chess, patience). Bound treats intimacy
// as shared history; breakAway is composure lost, never explicit.

export default {
  new: {
    headPat: [
      "My. That's rather forward of you.",
      "I'm afraid I'm a touch too tall for that to be dignified.",
    ],
    cheekPoke: [
      "Is there something on my face, or are you simply testing me?",
      "Well, well. Bold, for someone I've only just met.",
    ],
    lipsTouch: ["Ah. Not those.", "Honestly. That will do."],
    earTouch: [
      "I can hear you perfectly well. No need to come so close.",
      "Curious. Most people whisper into an ear rather than poke it.",
    ],
    handTap: [
      "Yes? If you need something, you need only ask.",
      "Is there something you require?",
    ],
    chestTouch: [
      "I'd advise against that.",
      "Do step back. I'd hate for there to be a misunderstanding.",
    ],
    bellyTouch: [
      "Prodding me, are you? I'd advise you find another pastime.",
      "That's quite enough. Whatever you're checking for, I assure you I'm perfectly well.",
    ],
    hipsTouch: [
      "Absolutely not.",
      "That is quite far enough. I trust I needn't repeat myself.",
    ],
    upset: [
      "Honestly. That will do.",
      "I've been patient. I'd rather not stop being so.",
    ],
    monoclePat: [
      "Ah. Mind the monocle, if you please.",
      "Careful. I'd rather not see the world through your fingerprint.",
    ],
  },
  known: {
    headPat: [
      "Ah. Is this how you thank people now?",
      "Honestly. I'm not one of the second years.",
    ],
    cheekPoke: [
      "Testing whether I'm made of stone? I assure you I'm not.",
      "You're in a mischievous mood. Should I be concerned?",
    ],
    lipsTouch: ["Not that, if you please.", "I'll overlook that once."],
    earTouch: [
      "I hear quite enough as it is, thank you.",
      "If you've something to whisper, by all means. Otherwise, hands down.",
    ],
    handTap: [
      "Yes? You have my attention.",
      "Your hands are cold. Have you been taking care of yourself?",
    ],
    chestTouch: [
      "I'd keep a respectful distance, if I were you.",
      "That's close enough. Honestly.",
    ],
    bellyTouch: [
      "I'll assume that was an accident. Hands down, please.",
      "Mm. Let's pretend that didn't happen, shall we?",
    ],
    hipsTouch: [
      "Hands where I can see them, please.",
      "Now, that I won't overlook.",
    ],
    upset: [
      "Honestly. Are you quite finished?",
      "Enough. I have several matters to attend to, and you are making them wait.",
    ],
    monoclePat: [
      "Honestly. It's not a toy.",
      "Fascinated by it? Most people prefer not to look too closely.",
    ],
  },
  warm: {
    headPat: [
      "Ha ha. You're the only one who'd dare.",
      "Well, well. I suppose I'll allow it.",
    ],
    cheekPoke: [
      "Is that revenge for the chess game? You did lose rather spectacularly.",
      "You're in good spirits. I'm glad to see it.",
    ],
    lipsTouch: [
      "Mm. Those are mine to keep.",
      "No. I mean that kindly, but no.",
    ],
    earTouch: [
      "I'll hear whatever you have to say. There's no need to tug.",
      "Mischievous today, aren't we?",
    ],
    handTap: [
      "Mm. Warmer than usual. Good.",
      "I'm listening. I always am, you know.",
    ],
    chestTouch: [
      "Mind yourself. I'm not a pillow.",
      "That's rather close, even for you.",
    ],
    bellyTouch: [
      "Ha... ha ha. Now that was unsporting.",
      "Honestly. I'll be keeping score, you know.",
    ],
    hipsTouch: ["I'd stop there, if I were you.", "Now, now. Behave."],
    upset: [
      "Honestly. If you have energy to spare, I can find you work.",
      "That will do. I'm patient, not endlessly so.",
    ],
    monoclePat: [
      "Fingers off the glass, if you please. I've only just cleaned it.",
      "Well, well. You'd like a closer look, I take it.",
    ],
    monocleOff: [
      "Mm. And what do you plan to do with it, exactly?",
      "Ah. I'd thank you to return that. ...Promptly.",
    ],
  },
  spark: {
    headPat: [
      "...I'm usually the one doing the looking after. How novel.",
      "Careful. I could grow used to that.",
    ],
    cheekPoke: [
      "Is this payback? I take it my face is the flushed one now.",
      "You're enjoying this far too much.",
    ],
    lipsTouch: [
      "...Well, well. That was not a move I anticipated.",
      "I'd advise you to mean that. I don't play games I intend to lose.",
    ],
    earTouch: [
      "That's hardly fair. You know I hear everything.",
      "...Mm. Do that again and I'll lose my place entirely.",
    ],
    handTap: [
      "Allow me. ...There. Your hand suits mine.",
      "I'll keep hold of this. Purely for your safety, of course.",
    ],
    chestTouch: [
      "...Is my heart giving me away? How inconvenient.",
      "My composure is usually better than this. Do be gentle with it.",
    ],
    bellyTouch: [
      "...Hm. I'd prefer you not learn where my composure is thinnest.",
      "Ha ha... Do warn me next time. I'd like to at least appear dignified.",
    ],
    hipsTouch: [
      "...Now that is a bold move. I'll need a moment to plan my reply.",
      "Careful. I'd hate to be caught looking this flustered.",
    ],
    upset: [
      "Honestly. You'll undo all my composure if you keep that up.",
      "Enough, enough. You're being terribly unfair.",
    ],
    monoclePat: [
      "You're fidgeting with it again. Something on your mind?",
      "Is it the monocle you're after, or an excuse to be this close?",
    ],
    monocleOff: [
      "...Ah. There goes my best defense. Well played.",
      "Mm. You're the only one who'd get away with that.",
    ],
    heartbeatHold: [
      "I trust that reading stays between us. As far as anyone knows, it never happened.",
      "Well, well. My face gave nothing away. My pulse, apparently, has had no such training.",
    ],
    lipHold: [
      "...You've made your point. I'd simply rather not admit how well.",
      "Mm. If you meant to silence me, I'll have you know it's working.",
    ],
    handHold: [
      "Mm. I'd meant to be the one to let go first. It seems you've outplayed me.",
      "Patience is usually my game. You're rather better at it than I'd like.",
    ],
  },
  close: {
    headPat: [
      "Mm. I've decided I'm used to it. Do carry on.",
      "Ha ha... Again, if you please. I've earned a little spoiling.",
    ],
    cheekPoke: [
      "Careful. I keep score, and I always collect.",
      "Ha ha. You've found the one face I don't show anyone else.",
    ],
    lipsTouch: [
      "Then you meant it. Very well. I'll answer in kind, at my leisure.",
      "Mm. Checkmate, I believe. ...Though I'm not certain which of us lost.",
    ],
    earTouch: [
      "Whisper something, then. I'll pretend I haven't heard it already.",
      "Mm... Of everything I hear in a day, I believe I'll keep this one.",
    ],
    handTap: [
      "There you are. I've several matters to attend to, and every one of them can wait.",
      "Mm. I'll keep this. Do ask if you want it back. I may refuse.",
    ],
    chestTouch: [
      "No need to check. It's been like this since you walked in.",
      "Lean on me, then. I'm sturdier than I look.",
    ],
    bellyTouch: [
      "Ha ha... That spot again. You do enjoy watching me lose my dignity.",
      "Of all the secrets I keep, you would find the one that makes me laugh.",
    ],
    hipsTouch: [
      "My intentions are entirely honorable. Yours, I'm beginning to doubt.",
      "...Bold. I'll allow it, provided no one ever hears how little I protested.",
    ],
    heartbeatHold: [
      "There. Now you know precisely what you do to me. Do use it wisely.",
      "For a moment there I forgot I was meant to be composed. My heart, sadly, did not.",
    ],
    lipHold: [
      "Hush, is it? Very well. For you, I'll keep quiet. Not for long.",
      "Mm. I'm a patient man. You do test that rather beautifully.",
    ],
    handHold: [
      "Do you know how rarely anyone looks after me? Ha ha... Don't stop now.",
      "Stay a little longer. Frostheim can spare me a moment.",
    ],
    caughtTease: [
      "...Ha ha. Not here, and not yet. I do prefer to choose the moment myself.",
      "Ah, ah. Careful. A good player never rushes the endgame.",
    ],
    monoclePat: [
      "Go on. I've long since given up protecting it from you.",
      "Fussing over it again. I'm beginning to find it rather endearing.",
    ],
    monocleOff: [
      "Mm. Go on. There's no glint left I need to hide from you.",
      "You do enjoy dismantling my defenses, one piece at a time.",
    ],
  },
  bound: {
    monoclePat: [
      "Ha ha. Asking permission? You stopped needing it some time ago.",
      "Mm. You only touch it when you mean to take it. I know you by now.",
    ],
    monocleOff: [
      "Keep it, if you like. I know where to find it.",
      "Set it with your things. It seems to end up there anyway.",
    ],
    heartbeatHold: [
      "I gave up pretending with you some time ago. My heart merely confirms it.",
      "You know precisely what it does when you're near. You've heard it go faster.",
    ],
    lipHold: [
      "You know very well where that leads.",
      "Only you can quiet me like that. Even the king doesn't manage it.",
    ],
    handHold: [
      "Forgetting everything I've got to do and be... With you, it's no longer once in a while.",
      "I said I'd be there to keep you safe. I never said I'd let go.",
    ],
    breakAway: [
      "...Ha... ha. Enough, enough. You've won. I'll need a moment to find my composure.",
      "Honestly... Give me a moment. I can't think of a single clever thing to say.",
    ],
    teaseLetGo: [
      "Stopping there? Honestly... That was quite deliberate, wasn't it? Well played.",
      "Mm... Leave me like this, and I'll have to finish what you started. Later, of course.",
    ],
  },
};
