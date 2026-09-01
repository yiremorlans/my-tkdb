export default {
  dialogue: {
    new: [
      '"What are you dawdling for? Change out of those rags and report to my lab immediately!"',
      '"Fascinating," he says, about you, in the tone one uses about a specimen.',
      "He doesn't look up from the slide. \"Don't breathe on that. Or on me.\"",
      "The lab hums. He's been awake for an unreasonable number of hours and it shows.",
      '"You should feel honored to be chosen as the test subject of Dr. Yuri Isami, genius and visionary!"',
    ],
    known: [
      "He's stopped calling you a novice. He hasn't replaced it with anything yet.",
      "There's a second chair in the lab. He'll insist it has always been there.",
      '"Are you injured or ill? Oh dear, how unfortunate. I shall begin the experi— Ahem, the treatment right away."',
      "He notes something about you in the margin, and covers it when you look.",
      "The insults have gotten more specific, which means he's been paying attention.",
    ],
    warm: [
      "His cold demeanor cracks slightly—there's obsession in his eyes now, the drive to save you consuming him.",
      "He has a new set of notes. Every page of them is about you.",
      '"You\'re late," he snaps, having clearly rearranged his entire evening.',
      "He shoves a bottle at you without a word. It's the good painkiller. He'd deny caring.",
      "He turns bright red mid-sentence and blames the lab lighting.",
    ],
    spark: [
      "He takes your pulse for the fourth time today. It's fine. It's always fine.",
      "He goes crimson, blames the lab lighting, and does not move away.",
      '"Purely clinical," he mutters, with his hand still on your face.',
      "The insults have gone quiet. What replaced them is much harder for him.",
      "He leans in to examine something, and forgets to invent a reason.",
    ],
    close: [
      '"I\'ll find your cure," he says with absolute conviction, "because I\'m the only one capable enough. And you\'re mine to save."',
      "He's asleep at the bench over your file. He'd rather die than let you say so.",
      '"Don\'t you dare thank me," he warns, ears scarlet. "I\'m not doing it for gratitude."',
      "The insults keep coming, and every single one of them means something kinder.",
      "He grips your wrist a moment too long, checking a pulse he already knows is fine.",
    ],
    bound: [
      "He is furious about how much he loves you and expresses it almost entirely with his hands.",
      '"Don\'t look at me like that," he snaps, already crossing the lab toward you.',
      "He falls asleep on your chest mid-argument and would deny it under oath.",
      "He kisses you like it's a problem he intends to solve thoroughly and repeatedly.",
      "The insults have become endearments. He'd rather die than have that pointed out.",
    ],
  },
  temperamentDialogue: {
    new: [
      '"A novice stumbles in. How amusing."',
      '"Don\'t touch that. Or that. Honestly, just stand still."',
      '"Are you here to be useful, or to be a variable?"',
      '"Hm. Poor posture, poor sleep, poor decisions. Textbook."',
      "\"I am a very busy man, so if you don't require examination, then we're done here.\"",
    ],
    known: [
      "\"Oh. It's you. Don't touch anything, but... you may sit.\"",
      "\"You're less useless than average. Don't celebrate.\"",
      '"Jiro!! Jiro!!! What on earth are you — ...ah. It\'s you. Sit."',
      "\"That's the wrong chair. ...Fine. That's your chair now, apparently.\"",
      "\"You're sleeping badly. It's written all over you. Do something about it.\"",
    ],
    warm: [
      '"You again? ...I suppose I don\'t mind."',
      '"You\'re late. Not that I was — never mind. Sit."',
      "\"Take this. It's for the headache you've been pretending not to have.\"",
      '"I\'ve read your file eleven times. Purely academic interest, obviously."',
      '"I do this for the future of humanity. And — fine. For you specifically. Don\'t repeat that."',
    ],
    spark: [
      '"Hold still. I\'m — this is a medical assessment. Stop smiling."',
      '"Your proximity is affecting my concentration. Don\'t you dare move."',
      "\"I've catalogued every symptom you have. This one's mine. Shut up.\"",
      '"If you laugh I will never speak to you again. ...Fine. Laugh."',
      '"I don\'t want anything from you. Except — no. Never mind. Come here."',
    ],
    close: [
      '"Don\'t go worrying me like that. I have better things to do than panic over you."',
      '"I always preserve the lives of my patients. I cannot make guarantees for any other parts of them, however. ...You, I keep whole."',
      '"I said sit down. Please. ...There. Was that so hard for either of us?"',
      '"If anything happens to you I\'ll be extremely inconvenienced. Emotionally. Shut up."',
      '"I will solve this. You don\'t get to give up before I do."',
    ],
    bound: [
      '"Get over here. No — I\'m not asking. Get over here."',
      '"I love you. There. I said it. Never bring it up again. ...Bring it up again."',
      "\"You're impossible and I've stopped wanting you to be anything else.\"",
      "\"Stay the night. The lab's cold. That's the reason. That's the only reason.\"",
      '"Stop smiling at me like that or I\'ll never get anything done."',
    ],
  },
  approach: {
    new: [
      "Enter the lab",
      "Stand still",
      "Be interesting",
      "Roll up your sleeve",
    ],
    known: [
      "Take the second chair",
      "Don't touch anything",
      "Be less useless",
      "Sit without asking",
    ],
    warm: [
      "Take the offered bottle",
      "Sit down as told",
      "Ask what he's working on",
      "Be late on purpose",
    ],
    spark: ["Hold still", "Don't move", "Come here", "Laugh anyway"],
    close: [
      "Go to him",
      "Wake him from the bench",
      "Let him take your pulse",
      "Refuse to be a burden",
    ],
    bound: [
      "Get over there",
      "Smile at him like that",
      "Stay the night",
      "Bring it up again",
    ],
  },
  responses: {
    kind: {
      new: [
        "Don't take it so hard",
        "Thank him anyway",
        "Let the insult slide",
      ],
      spark: [
        "Let him keep pretending",
        "Tell him it's mutual",
        "Be gentle about the blush",
      ],
      close: [
        "Show him his care shows",
        "Tell him to sleep",
        "Say the thanks he forbade",
      ],
      bound: [
        "Say it back",
        "Let him fall asleep on you",
        "Tell him he's allowed",
      ],
    },
    playful: {
      new: [
        "Tease him carefully",
        "Touch the thing he said not to",
        "Be a deliberate variable",
      ],
      spark: [
        "Laugh anyway",
        "Take his pulse instead",
        "Call it clinical too",
      ],
      close: [
        "Make him laugh despite himself",
        "Fluster him on purpose",
        "Read his notes out loud",
      ],
      bound: [
        "Bring it up again",
        "Smile at him deliberately",
        "Call him impossible back",
      ],
    },
    bold: {
      new: [
        "Challenge him back",
        "Poke a hole in his logic",
        "Refuse to be his specimen",
      ],
      spark: [
        "Close the distance yourself",
        "Say what he won't",
        "Take his hand off the chart",
      ],
      close: [
        "Match his intensity",
        "Tell him you won't give up",
        "Say you're his to save",
      ],
      bound: [
        "Cross the lab first",
        "Say it before he can",
        "Kiss him mid-argument",
      ],
    },
    neutral: {
      new: ["Give him space", "Let him work", "Answer only what's asked"],
      spark: [
        "Let it stay clinical",
        "Move away first",
        "Say nothing at all",
      ],
      close: [
        "Understand his withdrawal",
        "Sit quietly in the lab",
        "Let him pretend it's nothing",
      ],
      bound: [
        "Let him pretend it's the cold",
        "Say nothing",
        "Let him sleep",
      ],
    },
  },
};
