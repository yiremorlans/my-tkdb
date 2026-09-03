export default {
  dialogue: {
    new: [
      "He keeps his distance, observing you carefully. There's wariness in his posture, but curiosity flickers in his eyes.",
      "He circles wide around you, watching, deciding. Nothing about it is hostile.",
      "He repeats a word you used, quietly, testing the shape of it.",
      'The phone in his pocket buzzes and he flinches hard. "This phone thingy keeps making noises and making me jump... Why do I gotta carry it everywhere? It\'s scary!"',
      "He doesn't come closer, but he doesn't leave either. That's the whole conversation.",
    ],
    known: [
      "He's stopped circling. He stands where he can see you, and stays.",
      "He's learned your name, and repeats it once, quietly, getting it right.",
      "\"When I find Neros, I wanna prove I've been getting along with humans. Then he'll definitely let me live with him.\"",
      "He watches what you do with your hands, and copies it half an hour later.",
      "The wariness has become attention, which is an entirely different thing.",
    ],
    warm: [
      "The guarded distance closes when he recognizes you. A genuine, warm smile breaks through his usual reserve.",
      "He's practiced something to say to you. It comes out slightly formal and completely sincere.",
      "He falls in at your side without being asked, and stays exactly a step behind.",
      '"Your scent\'s all squeezy today. You\'re sad," he says. He\'s rarely wrong about that.',
      "\"I'm gonna go practice swimming at Harurin's place. Can you do other stuff besides doggy paddle?\"",
    ],
    spark: [
      "He presses his face into your shoulder and breathes in, and doesn't apologize.",
      '"I don\'t have a word for this one," he says. "I\'ve been looking."',
      "He's stopped keeping a respectful distance. He's chosen a different one.",
      "He takes your hand and turns it over, learning it, taking his time.",
      "He looks at your mouth, then away, then back, and gives up on the away part.",
    ],
    close: [
      '"You\'re my most important person," he says, plain and certain. "You safe. You happy. Nothing matters more than that."',
      "He puts himself between you and the noise without thinking about it at all.",
      "He rests his head against your shoulder, briefly, and pretends he didn't.",
      '"I understand more now," he says. "Mostly because of you."',
      "The wariness is gone entirely. What's left is loyal all the way down.",
    ],
    bound: [
      "He's found the word. He uses it constantly now, and gets it right every time.",
      "He curls around you in his sleep and makes a sound like something finally at rest.",
      '"You smell like mine," he says, delighted, with no idea how that lands.',
      "He kisses clumsily, enthusiastically, improving at an alarming rate.",
      "He's stopped keeping any distance at all. There simply isn't one anymore.",
    ],
  },
  temperamentDialogue: {
    new: [
      '"Hmm? I don\'t know your scent yet. ...What do you want?"',
      '"You smell like somewhere else. Sorry — is that rude? I\'m still learning."',
      '"Stay there a moment. I want to understand you first."',
      "\"You're not afraid. Most people are. Why aren't you?\"",
      '"I won\'t hurt you. I want to say that before anything else."',
    ],
    known: [
      '"You. I remember. I\'m glad I remembered."',
      '"Can I ask you something? I\'m allowed to ask, right?"',
      '"You came back twice. That means something. Doesn\'t it?"',
      "\"I don't understand you yet. I'd like to.\"",
      "\"Hey! Moth-eaten Casanova! Where'd you go? I'm going to show you my special move today.\"",
    ],
    warm: [
      "\"You're back. I'm... really happy about that.\"",
      '"I learned a new word today. I was saving it for you."',
      '"Walk with me? I\'ll keep to your pace."',
      "\"Something's wrong. I can tell. You don't have to say what.\"",
      '"I like it when you\'re here. Is that all right to say?"',
    ],
    spark: [
      '"Can I be close? Not careful-close. The other one."',
      '"You smell sweeter than usual today. ...Stop. Go away." He doesn\'t move.',
      '"I found the word. I\'m not going to say it yet. But I found it."',
      '"Stay still. I want to remember this exactly."',
      '"Everyone else, I keep a distance. You, I keep close. That\'s the difference."',
    ],
    close: [
      '"You being safe. You being happy. That\'s the most important thing there is."',
      '"Wherever you go, I go. That\'s already decided."',
      '"You taught me what this feeling is called. I use it a lot now."',
      '"Let me stand in front. Just this once. Just let me."',
      '"You never once treated me like an animal. I remember every time."',
    ],
    bound: [
      '"I love you. That\'s the word. I found it ages ago. I just wanted to be sure."',
      '"Come lie down. I sleep better with you. I sleep properly."',
      '"Can I — yes? Good. I\'ll never stop asking, I like the yes."',
      "\"You're mine and I'm yours. Both. It has to be both.\"",
      "\"Stay close. Closer. There's no such thing as too close, I've checked.\"",
    ],
  },
  approach: {
    new: [
      "Stand still and let him look",
      "Hold out your hand",
      "Speak gently",
      "Wait for him to decide",
    ],
    known: [
      "Let him ask",
      "Stand where he can see",
      "Say your name again",
      "Come back twice",
    ],
    warm: [
      "Walk with him",
      "Ask about the new word",
      "Match his pace",
      "Tell him what's wrong",
    ],
    spark: [
      "Say yes to the other close",
      "Stay still",
      "Let him learn your hand",
      "Ask for the word",
    ],
    close: [
      "Go to him",
      "Let him take the front",
      "Rest against his shoulder",
      "Tell him you're safe",
    ],
    bound: ["Lie down with him", "Say yes", "Get closer", "Say it back"],
  },
  responses: {
    kind: {
      new: [
        "Be genuinely kind",
        "Answer his question honestly",
        "Tell him you're not afraid",
      ],
      spark: [
        "Give him the word",
        "Let him stay close",
        "Tell him he's allowed",
      ],
      close: [
        "Remind him he's not an animal",
        "Teach him another word",
        "Say he taught you too",
      ],
      bound: [
        "Say it back",
        "Let him curl around you",
        "Tell him he got it right",
      ],
    },
    playful: {
      new: ["Be kind and playful", "Give him a new word", "Race him there"],
      spark: [
        "Make him find it himself",
        "Breathe him in back",
        "Hold the hand hostage",
      ],
      close: [
        "Roughhouse with him",
        "Ruffle his hair",
        "Let him win the race",
      ],
      bound: [
        "Make him ask again",
        "Teach him a better kiss",
        "Say you smell like his",
      ],
    },
    bold: {
      new: ["Be brave", "Close the distance first", "Reach out anyway"],
      spark: [
        "Choose the other close",
        "Say the word for him",
        "Don't let him look away",
      ],
      close: [
        "Stand with him proudly",
        "Refuse to let him lead",
        "Say wherever you go, he goes",
      ],
      bound: ["Close what's left", "Say it first", "Tell him it's both"],
    },
    neutral: {
      new: ["Be calm with him", "Let him circle", "Say nothing and wait"],
      spark: ["Keep the careful distance", "Let him wonder", "Stay quiet"],
      close: [
        "Understand his quiet",
        "Walk in silence together",
        "Let him lean on you",
      ],
      bound: ["Let him sleep", "Lie still", "Say nothing at all"],
    },
  },
  // The /call reveal lines for this character, keyed by the register in
  // WINNER_LINE_BUCKETS (constants/publicEncounters.js). Picked from at random
  // like the dialogue; {user} is the winner's mention and {name} their full
  // name, and the embed's winner line is the only place the reveal names
  // either of them. A register left out here falls back to the generic
  // WINNER_LINES pool.
  winnerLines: {
    new: [
      '**{name}** circles wide around {user}, watching. "...You know my name. I don\'t know your scent yet."',
      "{user} says the name, and **{name}** repeats it back quietly, testing the shape of it.",
      '"Stay there a moment." **{name}** wants to understand {user} first.',
    ],
    warm: [
      "**{name}** knows the voice before he's found the face, and comes straight to {user}.",
      '"I learned a new word today." **{name}** had been saving it for {user}.',
      "{user} calls out, and **{name}** falls in at their side, exactly one step behind.",
    ],
    spark: [
      '"You smell happy." **{name}** tells {user} this as a plain fact, with no idea what it does.',
      "{user} says the name, and **{name}**'s ears do something he has no control over.",
      "**{name}** had practiced a greeting for {user}. It comes out formal and completely sincere.",
    ],
    close: [
      "**{name}** hears {user}, and nothing else on campus is interesting any more.",
      '"Walk with me? I\'ll keep to your pace." **{name}** always says it to {user} the same way.',
      "{user} calls, and **{name}** abandons the **{house}** errand without a flicker of guilt.",
    ],
    bound: [
      '"You smell like mine," **{name}** says to {user}, delighted, with no idea how that lands.',
      "**{name}** found the word ages ago. He says it to {user} again anyway, and gets it right.",
      "{user} says the name, and **{name}** makes a sound like something finally at rest.",
    ],
  },
};
