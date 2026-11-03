// Zenji's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/zenji.js.
//
// He's a ghost: the MC can't physically touch him, so a line answers what
// she meant by the gesture (the pat as fondness, the offered hand, the lean
// to whisper), not the hand passing through him. He takes the meaning as if
// it landed. No contact at any tier, no object handling. Guarded spots
// (lips, chest, hips) stay gentlemanly rebuffs until spark.
//
// Holds (spark+): she can't really check his heart, hush him or hold his
// hand, so they pretend, and his lines wish it were real. Make-believe,
// never contact (no hand passing through, no chill, no "I felt it"); he
// never calls himself a ghost. Bound treats the pretending as their shared
// history.

export default {
  new: {
    headPat: [
      "A pat on the head? Why, I know what you meant by it. Consider it received.",
      "Ha ha. There's not much to pat, my dear, but the kindness came through.",
    ],
    cheekPoke: [
      "Oh! After my attention? You have it, my dear. No poking required.",
      "A poke! How playful. I'll pretend it landed, shall I?",
    ],
    lipsTouch: [
      "My dear! I can see what you're aiming for. Kindly don't!",
      "Ah, ah. Some verses aren't for reciting.",
    ],
    earTouch: [
      "Reaching for my ear? Then lend me yours. I have a story.",
      "Leaning in to whisper? Splendid. I adore a secret.",
    ],
    handTap: [
      "Offering your hand? How gracious. I'll take the gesture, if not the hand.",
      "A handshake! Why, pleased to make your acquaintance too, my dear.",
    ],
    chestTouch: [
      "My dear, I can see where that hand is headed. A gentleman's heart isn't to be prodded.",
      "Gracious! Whatever you meant by that, I'll thank you to mean it elsewhere.",
    ],
    bellyTouch: [
      "Was that meant to tickle? From someone I've only just met?",
      "A poke in the ribs! I'll assume you meant it in good fun.",
    ],
    hipsTouch: [
      "My dear! I saw that, you know. Such forwardness!",
      "Ah, ah, ah. Not even an inspired man of the quill allows that.",
    ],
    upset: [
      "My dear, please. Whatever you're trying to say, this isn't how to say it.",
      "Enough, enough! I understood you the first time.",
    ],
  },
  known: {
    headPat: [
      "Again? You're fond of me, I gather. I'll allow it.",
      "It's the thought that counts, my dear, and that was a lovely thought.",
    ],
    cheekPoke: [
      "You keep doing that to make me laugh, don't you? It's working.",
      "A poke! You're keeping me on my toes. Ha ha, figuratively.",
    ],
    lipsTouch: [
      "My dear, such boldness! Even a romance knows where to stop.",
      "I know what that gesture means. I'll write it down and never publish it.",
    ],
    earTouch: [
      "Whispering secrets? I'm a vault, I assure you.",
      "Leaning close to tell me something? Then I'm listening, my dear.",
    ],
    handTap: [
      "Reaching for my hand? I'll pretend I caught it. ...There.",
      "You keep offering your hand, my dear. I keep noticing.",
    ],
    chestTouch: [
      "My dear, I see where you're aiming. Let's keep my heart out of it for now.",
      "Careful. A hand over a fella's heart says rather a lot.",
    ],
    bellyTouch: [
      "Trying to tickle me? I'll put that in a comedy, not a romance.",
      "Horsefeathers! A poke in the middle? I know mischief when I see it.",
    ],
    hipsTouch: [
      "My dear, have you no shame?",
      "I can see what you're after, my dear, and the answer is no.",
    ],
    upset: [
      "My dear, please! I've understood, I promise. You can stop.",
      "Enough! Even a poet has his limits.",
    ],
  },
  warm: {
    headPat: [
      "If I were solid, I'd lean right into that. Know that I'm leaning anyway.",
      "My dear, that's terribly sweet. I felt the meaning, if not the hand.",
    ],
    cheekPoke: [
      "Most people walk right past me. You stop to poke. I'm touched, in a manner of speaking.",
      "Ha ha. A poke for a poet. Copacetic.",
    ],
    lipsTouch: [
      "My dear, I must ask you not to. I'd only want to write about it.",
      "Not there, I'm afraid. Some pages stay blank.",
    ],
    earTouch: [
      "Is that a secret coming? Lean in. I'm listening.",
      "My dear, you needn't reach for my ear. You've had it for weeks.",
    ],
    handTap: [
      "I can't hold it. But I can walk beside it.",
      "You keep offering it anyway. That's the part I treasure.",
    ],
    chestTouch: [
      "Gently. You're very near where my heart used to be.",
      "My dear, I know what a hand there means. I'd rather you didn't mean it yet.",
    ],
    bellyTouch: [
      "Oh! I... I think I flinched. How peculiar.",
      "Gracious, my dear! Tickling a poet without warning?",
    ],
    hipsTouch: [
      "My dear, really! What would Haku say?",
      "Ah, ah. Not even for a friend.",
    ],
    upset: [
      "Enough, please. My dear, I know you mean well, but enough.",
      "My dear, please, stop. Even a gentleman's patience runs thin.",
    ],
  },
  spark: {
    headPat: [
      "...You meant that so sweetly I could almost feel it.",
      "Do that again, my dear. I want to write down what it's like to be meant.",
    ],
    cheekPoke: [
      "My dear, I'm crimson to the ears. You've made a gentleman blush.",
      "You reach for me like I'm really here. You'll have me believing it.",
    ],
    lipsTouch: [
      "...My dear. You don't know what that does to a poet.",
      "I can't return that. Gracious, how I wish I could.",
    ],
    earTouch: [
      "Whisper something, my dear. I'll keep it.",
      "You leaned in to tell me something. I'm all ears, my dear.",
    ],
    handTap: [
      "Leave your hand there, my dear. I know what you're offering, and I accept.",
      "Your hand's resting where mine is. Let's call that holding hands.",
    ],
    chestTouch: [
      "...If I still had a heartbeat, you'd hear it racing.",
      "My dear... You'll have me writing sonnets about this.",
    ],
    bellyTouch: [
      "Butterflies, my dear. I'd forgotten a fella could still get those.",
      "Ha ha... Gracious. Give a poor man a moment to collect himself.",
    ],
    hipsTouch: [
      "My dear! I'm... I'm a gentleman, you know!",
      "I've no words for that. Me, of all people.",
    ],
    upset: [
      "My dear, mercy! You've made your feelings very clear.",
      "Enough, please. I can't keep up, and I want to.",
    ],
    heartbeatHold: [
      "Listening for my heart, my dear? Let's pretend you heard it.",
      "I'd give anything for you to really hear it. Since I can't, take my word: it was all yours.",
    ],
    lipHold: [
      "If only you could really hush me like that. ...Let's say you did. I'm hushed.",
      "My dear, I wish that had been real. Pretend with me? I've already started.",
    ],
    handHold: [
      "How I wish I could hold on back. Shall we pretend I did? I'm very convincing.",
      "We'll play make-believe, you and I. In this version, I never let go.",
    ],
  },
  close: {
    headPat: [
      "Every pat you give me, I keep. Not one has gone to waste.",
      "My dear, you've a talent for patting thin air. Lucky for me, I'm in it.",
    ],
    cheekPoke: [
      "Ha ha! You found me first try. You know exactly where I am now.",
      "You're terribly fond of that spot, my dear. So am I, now.",
    ],
    lipsTouch: [
      "I can't return that, my dear. So I'll write it down, and you'll know it was returned.",
      "My dear, that was the cat's pajamas. Do it again, and I'll pretend with my whole self.",
    ],
    earTouch: [
      "Lean closer, my dear. I'll recite you something no one else gets to hear.",
      "Ha ha... That went clear down to my toes. And I'm not certain I have toes.",
    ],
    handTap: [
      "Your hand in mine, near enough. I'll take near enough with you over anything.",
      "There. That's holding hands, as far as I'm concerned. Don't argue with a poet.",
    ],
    chestTouch: [
      "Leave it there, my dear. You'll find out how much of me is yours.",
      "Stay, my dear. Whatever's left of my heart, you're holding it.",
    ],
    bellyTouch: [
      "Ha ha! Mercy, my dear. Who knew I was ticklish?",
      "Stay there. When you're this close, I almost forget what I am.",
    ],
    hipsTouch: [
      "My dear... A gentleman would stop you. I'm finding I'd rather be a poet.",
      "Gracious. That's a scene I'd never let Haku film. ...Go on.",
    ],
    heartbeatHold: [
      "You keep listening for it, my dear, so I keep pretending it's racing. It's the truest fib I tell.",
      "I wish you could hear how it would be pounding. Close your eyes and imagine it. I am.",
    ],
    lipHold: [
      "Pretend or not, my dear, I'll call it a kiss and blush accordingly.",
      "We're getting awfully good at pretending, my dear. Some days I wish we weren't. I'd rather it were real.",
    ],
    handHold: [
      "Pretend I squeezed back just now, my dear. I did, as hard as a fella can pretend.",
      "If wishing made it real, you'd never get your hand back.",
    ],
    caughtTease: [
      "My dear...! Not yet. Even pretending, a gentleman has to work up to that.",
      "Ah, ah... Not yet. Let me wish for it a while longer. I'm very good at wishing.",
    ],
  },
  bound: {
    heartbeatHold: [
      "We both know the game by now. You listen, I pretend, and somehow it's true.",
      "You've pretended to hear it so often, I've started to believe it beats for you.",
    ],
    lipHold: [
      "My dear... We've pretended well past this before. I remember every line of it.",
      "If I could have one real thing, my dear, it would be this. Pretend for me once more?",
    ],
    handHold: [
      "In every version we pretend, my dear, I'm holding on. In the real one, I'm wishing I could.",
      "I'd trade every poem I own for one real minute of this. Until then, pretend with me.",
    ],
    breakAway: [
      "M-My dear...! Mercy. That was only pretend, and I've lost every word I own.",
      "Ha... Gracious. If pretending does that to me, the real thing would leave me without a verse to my name.",
    ],
    teaseLetGo: [
      "Ha... My dear! Stopping a fella mid-stanza? That's the cruelest cliffhanger in all of literature.",
      "Very well, my dear. I'll keep wishing right where you left off. Pick it up again soon?",
    ],
  },
};
