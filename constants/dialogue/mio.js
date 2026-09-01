export default {
  dialogue: {
    new: [
      "He looks up from tinkering with something, hands still steady. There's a ready smile for you.",
      "Tiny gears are laid out in perfect order across the bench. He moves one aside for you to sit.",
      '"Give me one second," he says, and finishes the movement without a single wasted motion.',
      "\"Whoa, hold up. You don't wanna run here, trust me. The floor's not level.\"",
      "He's the calmest thing in a very loud house, and he seems to know it's his job.",
    ],
    known: [
      "He's learned your name, your order, and roughly when you turn up.",
      "The stool is already pulled out. He'd say it always is. It isn't.",
      '"Back again? Good — hold this." You\'re being included, in his way.',
      "He asks about the thing you mentioned last week, and wants the actual answer.",
      '"Hey, Honor roll. One more day. Let\'s power through."',
    ],
    warm: [
      "He sets his work aside immediately, fully present for you—reliable as always.",
      "He's already fixed the thing you mentioned in passing last time. He won't bring it up.",
      '"You look like you need to sit down and complain about something. Go ahead."',
      '"(Sigh) Shion wrecked it again, huh? I was running low on parts. Walk with me to the store?"',
      "Two people were arguing when you walked in. Somehow they aren't anymore.",
    ],
    spark: [
      "The steady hands aren't steady. He notices you noticing.",
      "He fixes your watch strap and keeps hold of your wrist afterward.",
      '"I\'m usually better at saying things," he admits. "This one keeps not coming out."',
      "He's the calm one. He is not calm right now, and it's entirely your fault.",
      "He looks up from the bench and doesn't look away when you catch him.",
    ],
    close: [
      '"You know you can always count on me, right?" he says warmly. "For anything you need."',
      "He asks how you really are, and then waits — properly waits — for the real answer.",
      '"I keep this one wound for you," he says, showing you the little mechanism. "No reason."',
      "He's the one everyone leans on. With you, he lets himself lean back.",
      "The steady hands go still when you take them. He lets that happen.",
    ],
    bound: [
      "The steady hands are steady again, and they know exactly what they're doing.",
      "He fixes your necklace clasp, kisses the back of your neck, and goes back to work.",
      '"You undo me," he says calmly, which from him is practically shouting.',
      "He holds you like something he intends to keep in working order forever.",
      "He's the calm one. In the dark he is not calm at all, and it's a revelation.",
    ],
  },
  temperamentDialogue: {
    new: [
      '"Oh! Welcome! Can I get you anything?"',
      '"Mind the bench — everything on it is smaller than it looks."',
      "\"You're new, right? Don't worry, this house is friendlier than it sounds.\"",
      "\"Sit anywhere. I'll clear a space. I'm always clearing a space.\"",
      "\"Careful — the floor's not level here. You really don't wanna run.\"",
    ],
    known: [
      '"Hey! Good timing, I was about to take a break anyway."',
      '"Hold this a sec — congratulations, you\'re an apprentice now."',
      '"How\'d that thing turn out? The one from last week."',
      '"You think I look busy? Takes one to know one. Make sure you give yourself a break every once in a while."',
      '"Oh, hey. I was just heading to the campus store. Not really shopping... more like restocking. Come along?"',
    ],
    warm: [
      "\"It's nice seeing you. You know you're always welcome here.\"",
      '"Perfect timing — I needed an excuse to stop."',
      '"How\'s it going? And I mean actually, not the polite version."',
      '"I fixed that thing you mentioned. It was bugging me too."',
      '"Sit. Hold this. There, now you\'re helping."',
    ],
    spark: [
      '"Give me your hand a sec. ...Okay, I don\'t actually need it. I just wanted it."',
      '"I hold everyone together. You\'re the thing that undoes me. Bit inconvenient."',
      '"Stay past closing. Please. That\'s not an artisan asking."',
      '"You keep sitting that close. I keep letting you. Neither of us is subtle."',
      "\"I've been trying to say this since spring. I'm still trying.\"",
    ],
    close: [
      '"You\'ve become someone really important to me. I hope you know that."',
      '"Anything you need. I mean that literally — test it sometime."',
      "\"You're the only one who asks how I'm doing. It gets me every time.\"",
      '"Stay as long as you want. I like the workshop better with you in it."',
      '"I hold everyone together around here. You hold me. Fair trade."',
    ],
    bound: [
      '"Stay. The workshop\'s not going anywhere. Neither am I."',
      '"I love you. Took me eleven months to say it. I\'ll say it daily to make up the deficit."',
      '"Come here. Yeah — just like that. Don\'t move."',
      "\"Everyone leans on me. You're the one I lean back on. Do you know what that's worth?\"",
      '"Close the door. Not for anything sinister. Okay — somewhat sinister."',
    ],
  },
  approach: {
    new: [
      "Sit at the workbench",
      "Ask what he's fixing",
      "Take the cleared space",
      "Wait for him to finish",
    ],
    known: [
      "Take the pulled-out stool",
      "Hold this a second",
      "Answer about last week",
      "Stay a while",
    ],
    warm: [
      "Pull up a stool",
      "Hold the small gear",
      "Complain about your day",
      "Ask him to stop working",
    ],
    spark: [
      "Give him your hand",
      "Stay past closing",
      "Sit closer",
      "Let him try to say it",
    ],
    close: [
      "Go sit beside him",
      "Ask how he's really doing",
      "Take his hands",
      "Stay as long as you want",
    ],
    bound: ["Close the door", "Come here", "Stay", "Let him lean back"],
  },
  responses: {
    kind: {
      new: [
        "Show appreciation for him",
        "Thank him for making room",
        "Notice how much he does",
      ],
      spark: [
        "Give him your hand",
        "Tell him to take his time",
        "Say it for him, gently",
      ],
      close: [
        "Tell him he matters too",
        "Ask what he needs for once",
        "Let him lean on you",
      ],
      bound: [
        "Let him lean on you",
        "Say it back",
        "Tell him what it's worth",
      ],
    },
    playful: {
      new: [
        "Share a laugh",
        "Poke at the tiny gears",
        "Give him a fake emergency",
      ],
      spark: ["Sit closer still", "Catch him looking again", "Wind him up"],
      close: [
        "Make him laugh genuinely",
        "Drag him out of the workshop",
        "Wind up his clockwork",
      ],
      bound: [
        "Close the door yourself",
        "Undo the clasp again",
        "Make the calm one falter",
      ],
    },
    bold: {
      new: [
        "Express yourself boldly",
        "Ask him for a favor",
        "Say you came just for him",
      ],
      spark: [
        "Stay past closing",
        "Keep hold of his wrist",
        "Say the thing he can't",
      ],
      close: [
        "Be bold enough to need him",
        "Tell him to stop fixing",
        "Take the work out of his hands",
      ],
      bound: [
        "Pull him from the bench",
        "Say it first",
        "Tell him not to move",
      ],
    },
    neutral: {
      new: ["Be there for him", "Watch him work", "Let the workshop hum"],
      spark: [
        "Let him find the words",
        "Let go first",
        "Let the workshop tick",
      ],
      close: [
        "Sit with him",
        "Keep him company in silence",
        "Let him finish the movement",
      ],
      bound: [
        "Let him finish the piece",
        "Sit in the quiet",
        "Let the clocks tick",
      ],
    },
  },
};
