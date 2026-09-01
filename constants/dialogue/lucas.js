export default {
  dialogue: {
    new: [
      "He studies you for a long moment before offering the faintest nod.",
      "He steps aside to let you pass, and apologizes for having been in the way at all.",
      "He's checking his gear over with far more care than the hour warrants. A mission, maybe.",
      '"Forgive me," he says softly, before you\'ve said anything. "I didn\'t hear you come in."',
      "Everything about him is quiet. That includes whatever he's decided not to say.",
    ],
    known: [
      "He remembers you. The apology for existing comes a little quicker now.",
      "He looks up when you enter now, rather than after.",
      "\"You've been well?\" It's the first question he's asked you unprompted.",
      '"You\'re early," he notes, quietly impressed. "Good. We can go over the details."',
      "The nod has become a nod and half a smile.",
    ],
    warm: [
      "He offers a small, genuine smile now instead of just a nod.",
      "He moves a half-step closer than he used to, and pretends he hasn't.",
      "He's already checking the room for anything that might hurt you. He always does.",
      '"You look tired," he observes gently. He noticed before you did.',
      "The politeness is still there, but it isn't a wall anymore.",
    ],
    spark: [
      "The politeness has thinned. What shows through it is not gentle at all.",
      "He takes your hand to check it for injury, and forgets to give it back.",
      '"Forgive me," he murmurs, standing far closer than forgiveness requires.',
      "He looks at your mouth for exactly a second too long, and knows it.",
      '"I\'m not always as harmless as I let people believe," he says quietly. "You should know that."',
    ],
    close: [
      '"I don\'t say this to just anyone," he admits quietly, "but I\'m glad you\'re here."',
      "He reaches for your sleeve, stops himself, and then does it anyway.",
      "There's something less careful in how he looks at you now. Something honest.",
      '"Stay where I can see you," he says. It isn\'t a request, quite.',
      "He lets the softness show, just for you, and it costs him something to do it.",
    ],
    bound: [
      "The gentleness is still there. It is no longer the whole of him, with you.",
      "He kisses your knuckles, then your wrist, then stops asking permission.",
      '"I\'d burn a great deal down for you," he says softly. "I hope that doesn\'t frighten you."',
      "He falls asleep with a hand fisted in your shirt, as though you might go.",
      "He touches you like something he has been given and can hardly believe he keeps.",
    ],
  },
  dialogueWhen: [
    {
      when: { time: "evening" },
      dialogue: {
        new: [
          "He's doing a slow circuit of the balcony rail, checking the dark below, and only then turns to you.",
          "The campus lights have come on behind him. He's clearly been out here a while.",
          '"You\'re out late," he says — not quite a reproach. "I\'ll walk you back when you\'re ready."',
          '"You shouldn\'t wander alone," he says quietly. "Not here. Not at this hour."',
        ],
        known: [
          "He falls into step to walk you along the lit path before you can decline the escort.",
          '"I don\'t like this hour for wandering," he admits. "I like that you came to find me in it."',
          '"Curfew\'s soon," he says. "Stay a little — I\'ll make sure you\'re not caught."',
        ],
        warm: [
          "He's saved you the sheltered corner out of the wind. He'd deny having planned it.",
          "The dark makes him less careful with what he says. Not much. Enough to notice.",
          '"The quiet out here is the honest part of my day," he says. "I\'m glad you\'re in it."',
        ],
      },
    },
  ],
  approachWhen: [
    {
      when: { time: "evening" },
      approach: {
        new: ["Let him walk you back", "Fall into step with him"],
        known: ["Accept the escort"],
        warm: ["Take the sheltered corner"],
      },
    },
  ],
  temperamentDialogue: {
    new: [
      '"Oh... hello. Please, be careful around here."',
      '"Ah — my apologies. Did you need something?"',
      "\"I'm sorry, I don't think we've met properly.\"",
      "\"You're here 10 minutes early — I'm impressed. Let's check the details for today's mission.\"",
    ],
    known: [
      '"Ah — it\'s you. Good. I\'d hoped it would be."',
      "\"You've been coming by more often. That's... that's good.\"",
      '"Do I find it tough training every day? Those with strength have a duty to use it for others. I\'m perfectly all right."',
      '"I invited Kaito to train with me, but he turned me down. I\'m worried about his lack of strength..."',
      '"I remembered your name. I hope that isn\'t strange."',
    ],
    warm: [
      "\"I'm glad you're safe. How have you been?\"",
      '"You came back. I... was hoping you would."',
      '"Sit, please. You look like you\'ve been on your feet all day."',
      '"May I walk with you? Only if you\'d like."',
      '"I kept thinking I heard you in the hall. I was wrong, until now."',
    ],
    spark: [
      '"Stay near me. I\'d rather not explain why."',
      '"You trust me too easily. I\'d like you to keep doing it."',
      '"May I? ...Thank you. You needn\'t look so surprised."',
      "\"There's a part of me that isn't gentle. It's very fond of you.\"",
      "\"Don't apologize for standing close. Please don't.\"",
    ],
    close: [
      '"Your safety means more to me than anything else."',
      '"Stay close. Just for a while. Please."',
      '"I would rather be the one who\'s hurt than watch it happen to you."',
      '"You don\'t have to be gentle with me. Not you."',
      '"I\'ve stopped apologizing for wanting you near. Is that all right?"',
    ],
    bound: [
      '"Stay the night. I\'ve stopped pretending I want anything else."',
      "\"Don't be gentle with me. I'm not made of glass. Not with you.\"",
      '"I love you. I\'ve said it in my head so often it should be easier aloud."',
      '"Closer. I want to feel you breathing."',
      "\"Whatever's left of me that isn't kind — it's yours too.\"",
    ],
  },
  approach: {
    new: [
      "Approach quietly",
      "Return his nod",
      "Speak softly first",
      "Let him notice you",
    ],
    known: [
      "Accept the better spot",
      "Answer his question",
      "Return the half-smile",
      "Say his name",
    ],
    warm: [
      "Walk up to him",
      "Ask him how he's been",
      "Fall into step with him",
      "Return the small smile",
    ],
    spark: [
      "Let him keep your hand",
      "Stand closer than needed",
      "Say yes",
      "Trust him anyway",
    ],
    close: [
      "Go to his side",
      "Take his hand",
      "Stay where he can see you",
      "Tell him you're safe",
    ],
    bound: [
      "Stay the night",
      "Don't be gentle",
      "Say it back",
      "Let him hold on",
    ],
  },
  responses: {
    kind: {
      new: [
        "Speak gently like he does",
        "Thank him for the warning",
        "Tell him he isn't in the way",
      ],
      spark: [
        "Let him keep your hand",
        "Tell him you're not afraid",
        "Be soft with the harder part",
      ],
      close: [
        "Trust his quiet strength",
        "Tell him he can stop",
        "Let him take care of you",
      ],
      bound: [
        "Tell him you're not scared",
        "Say it back softly",
        "Hold him through it",
      ],
    },
    playful: {
      new: [
        "Be gentle and playful",
        "Coax a smile out of him",
        "Tease him very carefully",
      ],
      spark: [
        "Catch him looking",
        "Fluster the polite one",
        "Ask what he's thinking",
      ],
      close: [
        "Make him laugh softly",
        "Catch him being sweet",
        "Fluster him on purpose",
      ],
      bound: [
        "Make the polite one blush",
        "Refuse to be handled gently",
        "Steal his shirt",
      ],
    },
    bold: {
      new: [
        "Be gentle but firm",
        "Tell him you can handle it",
        "Step in front of him",
      ],
      spark: [
        "Close the space yourself",
        "Tell him you like the danger",
        "Say yes before he asks",
      ],
      close: [
        "Be bold for him",
        "Refuse to let him take the hit",
        "Say it before he can",
      ],
      bound: [
        "Tell him not to be gentle",
        "Pull him down to you",
        "Say you'd burn it with him",
      ],
    },
    neutral: {
      new: ["Stay silent", "Let him finish the thought", "Wait beside him"],
      spark: [
        "Let the moment pass",
        "Step back gently",
        "Say nothing at all",
      ],
      close: [
        "Be quiet with him",
        "Stay through the silence",
        "Let the moment be enough",
      ],
      bound: [
        "Let him sleep",
        "Stay quiet beside him",
        "Let the night be still",
      ],
    },
  },
};
