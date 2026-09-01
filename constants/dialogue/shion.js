export default {
  dialogue: {
    new: [
      'A slow bow, a theatrical flourish. "Welcome to the Heebie Jeebie house."',
      "His head turns to follow you across the room. Nothing else about him moves.",
      '"Ah — a fresh expression," he says, delighted. "Do hold that one a moment longer."',
      '"Closer," he says. "You\'re still too far away. Closer." He does not appear to be joking.',
      "Something about the way he watches you feels less like curiosity and more like cataloguing.",
      '"They call this place the Heebie Jeebie house. I do so much of my best work here." He leans in. "Stay. Be startled."',
    ],
    known: [
      "His gaze finds you faster now. It has stopped being a coincidence.",
      '"The returning player," he muses. "I do love a second act."',
      "He's stopped trying to frighten you. He has begun studying you instead.",
      '"You\'ve gone quiet. This is boring." A pause. "...Don\'t. Stay. I\'ll allow talking."',
      "Something in the room decides against approaching you. He watches it decide.",
      "He's resetting a trick in one of the Heebie Jeebie house's back corridors — a trapdoor, a cold breath, a sound from nowhere. \"People pay me to stop their hearts a moment. I never disappoint.\"",
    ],
    warm: [
      "His attention tilts your way first, before anyone else in the room.",
      "He's been waiting in this exact spot. He'd like you to know he doesn't wait for people.",
      "\"You're not frightened anymore,\" he observes. He can't decide if he's disappointed.",
      "Whatever threat was standing near you a moment ago has quietly stopped existing.",
      '"I\'m thirsty... Go over to Elias\'s place and bring me that sickly brown stuff." A beat. "...Please."',
      "\"Walk the Heebie Jeebie house with me tonight. I'll frighten the others. You I'd rather just watch enjoy it.\"",
    ],
    spark: [
      "He lets the act slip an inch — just enough for you, just long enough to matter.",
      "He circles behind you and speaks very close to your ear, entirely on purpose.",
      '"You\'ve stopped being afraid," he murmurs. "Now you\'re something far more dangerous."',
      "He takes your wrist, turns it over, and studies your pulse like a compliment.",
      "The theatre is empty. He hasn't stopped performing. It's all for one seat now.",
    ],
    close: [
      '"For you," Shion says, the performance slipping just enough to show a genuine smile.',
      "He places himself between you and the room without appearing to have decided to.",
      '"Nothing here can touch you," he says pleasantly. "It\'s mine. I\'ve made arrangements."',
      "The theatrics fall away, and what remains underneath is startlingly gentle.",
      "He drops every last piece of the act. Only you get that. Only ever you.",
    ],
    bound: [
      "The act is off and stays off, and what's underneath adores you unbearably.",
      "He kneels to take your hand, which from him is not submission but something worse.",
      '"My wife," he breathes, and means every syllable of it.',
      "He traces your pulse with his mouth and takes an extremely long time about it.",
      "He'd end the world for you. He mentions this the way others mention the weather.",
    ],
  },
  temperamentDialogue: {
    new: [
      '"What a delicious expression. I wonder what frightens you?"',
      '"Come closer. You\'re still too far away. ...Closer."',
      '"Oh, don\'t run. Running is so terribly predictable."',
      '"A new player takes the stage. How does the first act go, I wonder?"',
      '"You flinched. That\'s honest of you. I appreciate honesty."',
      '"You wandered into the Heebie Jeebie house alone. Marvelous instincts. Truly awful, but marvelous."',
    ],
    known: [
      "\"Ah — the one who didn't run. I've thought about you since.\"",
      '"Second act. Tell me, do you improvise, or do you follow a script?"',
      "\"You've stopped flinching. I'm not certain how I feel about that.\"",
      '"Why have you gone all quiet? This is boring. ...Fine. I\'ll find something to do with you."',
      '"You interest me. That is rarely good news. It is, however, true."',
      '"The Heebie Jeebie house had three faintings this week. I keep the records. It has been a good year."',
    ],
    warm: [
      '"You came back. How... thrilling. I missed that look in your eyes."',
      '"They said you\'d stop visiting. They were wrong. They usually are."',
      '"Take my arm. Nothing in this district would dare."',
      "\"You're no longer afraid of me. That's a new game entirely.\"",
      "\"I'm thirsty... Go over to Elias's place and bring me that sickly brown stuff. ...You'll do it. You like me.\"",
    ],
    spark: [
      "\"Let me look at you properly. I've earned that much, haven't I?\"",
      '"Your pulse is quick. I do enjoy being the reason."',
      '"Come behind the curtain. The interesting things happen there."',
      "\"Say you're mine. You needn't mean it yet. I'm patient.\"",
      '"I\'m not in the mood to make you cry today. Come back later for that."',
    ],
    close: [
      '"You\'re mine to protect. My wife."',
      '"The world is a cruel theatre. You will simply never be on that stage."',
      '"Look — no act, no theatre, nothing performed. Do you understand what that costs me?"',
      '"Anything that reaches you goes through me first. That is not a threat to you."',
      '"I have watched a great many things suffer. I will not watch you."',
    ],
    bound: [
      '"Come here. Let me look at what\'s mine."',
      "\"I love you. It's a very old feeling and I've had it for far too long quietly.\"",
      '"Stay in the dark with me. It suits you. It suits us."',
      '"Say you\'re mine. Say it properly this time."',
      '"Nothing will ever reach you. I\'ve been extremely thorough."',
    ],
  },
  approach: {
    new: [
      "Step onto the stage",
      "Hold his gaze",
      "Don't run",
      "Take a careful step closer",
    ],
    known: [
      "Play the second act",
      "Improvise",
      "Follow where he stands",
      "Refuse to flinch",
    ],
    warm: [
      "Take his arm",
      "Step into his eyeline",
      "Greet him first",
      "Stand where he can see you",
    ],
    spark: [
      "Go behind the curtain",
      "Let him take your wrist",
      "Let him look properly",
      "Say it",
    ],
    close: [
      "Go to him",
      "Let the act drop",
      "Let him take your hand",
      "Stand behind his shield",
    ],
    bound: [
      "Come here",
      "Say it properly",
      "Stay in the dark",
      "Let him kneel",
    ],
  },
  responses: {
    kind: {
      new: [
        "Be careful around him",
        "Answer him gently",
        "Refuse to look afraid",
      ],
      spark: [
        "Let him look properly",
        "Reach for him gently",
        "Tell him you're not afraid",
      ],
      close: [
        "Let him protect you",
        "Thank him for dropping the act",
        "Tell him he isn't a monster",
      ],
      bound: ["Hold his face", "Say it back", "Let him kneel"],
    },
    playful: {
      new: [
        "Don't take him seriously",
        "Applaud the theatrics",
        "Give him a better expression",
      ],
      spark: [
        "Make his pulse quick instead",
        "Steal his next line",
        "Play the dangerous thing",
      ],
      close: [
        "Play along with him",
        "Steal his dramatic timing",
        "Make the villain laugh",
      ],
      bound: [
        "Make him wait for it",
        "Upstage him for once",
        "Refuse to say it properly",
      ],
    },
    bold: {
      new: [
        "Challenge him boldly",
        "Step closer, not back",
        "Ask what's under the act",
      ],
      spark: [
        "Say you're his",
        "Go behind the curtain",
        "Turn his wrist over instead",
      ],
      close: [
        "Surrender to him",
        "Claim him right back",
        "Tell him you're not fragile",
      ],
      bound: [
        "Say you're his",
        "Pull him up by the collar",
        "Tell him to be thorough",
      ],
    },
    neutral: {
      new: [
        "Observe him carefully",
        "Give him nothing to read",
        "Wait for the act to end",
      ],
      spark: [
        "Let him have the theatre",
        "Say nothing",
        "Let the curtain fall",
      ],
      close: [
        "Let him watch over you",
        "Stay silent beside him",
        "Let the theatre go quiet",
      ],
      bound: [
        "Let him watch you",
        "Stay silent in the dark",
        "Let the moment stretch",
      ],
    },
  },
};
