export default {
  dialogue: {
    new: [
      'Calm as still water, he tilts his head. "You\'re new around here."',
      "He notes your arrival, files it somewhere, and returns to what he was doing.",
      'He inclines his head, courteous. "Business in Frostheim? I serve the one who runs it."',
      "He checks the corridor behind you before he looks at you. Habit, not suspicion.",
      "Nothing about his expression moves. Something behind it is definitely taking notes.",
    ],
    known: [
      "You've moved from unknown to accounted for. From him, that's a promotion.",
      "He doesn't ask your name. He logged it the first time.",
      '"Twelve days," he notes. "That\'s the interval. I keep track."',
      "The assessment is shorter now. He's already reached his conclusion about you.",
      "He nods once as you pass. It isn't nothing.",
    ],
    warm: [
      "His usual calm softens into something warmer whenever you're near.",
      "He finishes his sentence, then gives you his whole attention. That's rare.",
      '"You\'re on time," he says, which from him is close to a compliment.',
      "He shifts to make room without ever acknowledging that he did.",
      "The report in his hands stops being urgent the moment you speak.",
    ],
    spark: [
      "The composure holds. It is very obviously costing him something.",
      "He straightens something on your uniform with unnecessary precision.",
      '"I\'ve run the assessment repeatedly," he says. "The result doesn\'t change."',
      "He stands closer than protocol allows and does not correct it.",
      '"You\'re a distraction," he states, without any apparent intention of removing it.',
    ],
    close: [
      "\"You've become someone I look forward to seeing,\" he says plainly, like it's just a fact.",
      "He breaks his own rule about interruptions. For you. Again.",
      '"I had an hour free," he says. He did not have an hour free.',
      "The composure holds, but his eyes give him away completely.",
      "He tells you the truth without softening it, because you're the one person he doesn't have to.",
    ],
    bound: [
      "He states what he wants plainly, and then is exceedingly efficient about it.",
      "He wakes at his usual hour, looks at you, and elects to be late for the first time.",
      '"I\'ve stopped assessing you," he says. "The conclusion was reached some time ago."',
      "His hands are precise everywhere. It is deeply unfair.",
      "He holds you the way he does everything else — deliberately, and completely.",
    ],
  },
  dialogueWhen: [
    {
      when: { time: "evening" },
      dialogue: {
        new: [
          "He checks his watch, then the dark stairwell behind you, and decides not to remark on the hour.",
          '"You\'re past curfew," he notes. "So am I. We\'ll call it even."',
          "The balcony's empty except for him. After dark, he says, is the only time it's quiet enough to think.",
          '"It\'s after curfew. I\'m not going to report you," he says. "Stand where the light reaches, though."',
        ],
        known: [
          '"I\'ll sign you back in if anyone asks," he says, already turning a blind eye.',
          "He's less starched after dark. The clipboard is nowhere in sight.",
          '"The balcony\'s better at night," he says. "No one to perform for."',
        ],
        warm: [
          '"Nobody comes up here this late. That\'s rather the point of it."',
        ],
      },
    },
  ],
  approachWhen: [
    {
      when: { time: "evening" },
      approach: {
        new: ["Slip past curfew with him", "Take the empty balcony"],
        known: ["Let him sign you in"],
        warm: ["Keep him company up here"],
      },
    },
  ],
  temperamentDialogue: {
    new: [
      '"No need to be nervous. I\'ve nothing but the noblest of intentions."',
      '"Well, well. Frostheim is ruled by a king, you see. I\'m no more than a servant."',
      '"This academy has far more than its fair share of loose cannons, wouldn\'t you agree?"',
      "\"If you're lost, say so. I don't have time to cater to your ambivalence.\"",
      '"What do you mean? I lend a sympathetic ear to those in need — that\'s all."',
    ],
    known: [
      '"Providing this level of assistance goes without saying. Only once you can do so without instruction can you call yourself qualified."',
      '"Ah. You again. Proceed, by all means."',
      "\"You've been consistent. I've adjusted my expectations accordingly.\"",
      '"No need to explain yourself this time."',
      '"If you intend to keep coming, learn the layout. Start here."',
    ],
    warm: [
      '"Well, well. You again. I find I don\'t mind it."',
      '"You\'re consistent. I respect consistency."',
      "\"I've adjusted my schedule. Don't read into it.\"",
      '"Report, then. How have you been?"',
      '"There are worse interruptions than you."',
    ],
    spark: [
      '"Hold still. This will take a moment and I intend to take it."',
      '"My focus is compromised. You are the variable. I\'ve stopped trying to correct for it."',
      "\"Closer. I'm not going to ask twice, and I'd rather not have to.\"",
      '"That look is inefficient and I would like you to keep making it."',
      '"State plainly what you want. I\'ll tell you whether I want the same."',
    ],
    close: [
      '"Well, well..I must say your company is preferred. To my surprise."',
      '"I\'ve stopped calling this a coincidence. So should you."',
      '"Say it plainly. I\'d rather hear the truth from you than anything else."',
      "\"I don't make exceptions. I've made one. Draw your own conclusions.\"",
      '"If something happens, come to me first. Not second. First."',
    ],
    bound: [
      "\"Stay. I've cleared the morning. I've never cleared a morning.\"",
      '"Tell me what you want. I\'d rather be accurate about this."',
      '"I love you. It\'s not a complicated finding. It simply took a while to confirm."',
      "\"Closer. That's better. That's — yes.\"",
      '"You are the only disorder in my life I have no intention of correcting."',
    ],
  },
  approach: {
    new: [
      "State your business",
      "Step into view",
      "Answer his question",
      "Stand where he can see you",
    ],
    known: [
      "Proceed",
      "Skip the explanation",
      "Learn the layout",
      "Return the nod",
    ],
    warm: [
      "Report in",
      "Walk up to him",
      "Interrupt him anyway",
      "Ask what he's working on",
    ],
    spark: [
      "Hold still",
      "Be the distraction",
      "Step inside protocol",
      "State what you want",
    ],
    close: [
      "Go to him directly",
      "Take the seat beside him",
      "Say it plainly",
      "Tell him the truth",
    ],
    bound: [
      "Tell him what you want",
      "Stay the morning",
      "Let him be late",
      "Say it back",
    ],
  },
  responses: {
    kind: {
      new: [
        "Respect his discipline",
        "Answer him honestly",
        "Thank him for the warning",
      ],
      spark: [
        "Let him take his moment",
        "Tell him it's mutual",
        "Be still for him",
      ],
      close: [
        "See through his composure",
        "Tell him he can stand down",
        "Ask what he's carrying",
      ],
      bound: [
        "Say it back plainly",
        "Let him be late",
        "Tell him the finding is mutual",
      ],
    },
    playful: {
      new: [
        "Try to make him crack",
        "Answer far too casually",
        "Test his patience",
      ],
      spark: [
        "Compromise his focus",
        "Break protocol on purpose",
        "Ask for the assessment",
      ],
      close: [
        "Crack through his mask",
        "Catch him almost smiling",
        "Break his rules with him",
      ],
      bound: [
        "Ruin his schedule",
        "Be deliberately imprecise",
        "Make him lose the thread",
      ],
    },
    bold: {
      new: [
        "Hold your own",
        "Give him a straight answer",
        "Refuse to be assessed",
      ],
      spark: [
        "Say plainly what you want",
        "Close the last step",
        "Tell him to stop correcting",
      ],
      close: [
        "Demand the truth from him",
        "Tell him you're staying",
        "Meet him without flinching",
      ],
      bound: [
        "Tell him exactly what you want",
        "Pull him back down",
        "Be the disorder",
      ],
    },
    neutral: {
      new: [
        "Observe him carefully",
        "Say only what's needed",
        "Wait for his verdict",
      ],
      spark: [
        "Let him recompose",
        "Give him nothing",
        "Stand at regulation distance",
      ],
      close: [
        "See what he won't say",
        "Let the silence stand",
        "Stay until he's finished",
      ],
      bound: ["Let him keep the hour", "Lie still", "Say nothing at all"],
    },
  },
};
