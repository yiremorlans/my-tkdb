export default {
  dialogue: {
    new: [
      'He\'s winding a string of festival lights around one arm, unhurried. "Well, hello there. New around here?"',
      'The drawl arrives before he does. "Well now. Aren\'t you a long way from anywhere."',
      "He's leaning where he shouldn't be, a lollipop stick shifting from one corner of his mouth to the other, doing nothing extremely well.",
      '"Oh no, I just handle the odd jobs around here," he says. "So if there\'s anything you need, don\'t hesitate to ask."',
      "The smile comes slow and languid and lands just right — warm, easy, and a half-second too practiced.",
    ],
    known: [
      "\"I was just tidying up around here. I know I don't really have to anymore, but... well, I just can't help myself.\"",
      '"You keep turning up," he drawls. "Most people don\'t."',
      "The charm is still running, dialed down to something less expensive.",
      "He returns a detail you mentioned once, casually, to see whether you notice.",
      "He uses your name. It's the first time he hasn't called you sugar.",
    ],
    warm: [
      'The languid smile goes real for a second. "Seeing you always makes my day. I mean that one plain."',
      "The charm dials down a notch. From him, that's practically intimacy.",
      '"You\'re harder work than most," he says, sounding pleased about it.',
      '"This bamboo? Shion wants to do nagashi somen, so I figured I\'d start setting it up. Stay a while?"',
      "He looks tired tonight — the candy set aside, for once — and doesn't bother hiding it from you.",
    ],
    spark: [
      "He takes the sucker out of his mouth. The drawl drops half an octave. That one isn't for the room.",
      "He tips your chin up with two fingers and forgets to make a joke of it.",
      '"I\'ve run out of angles with you," he says. "That\'s a first, sugar."',
      "He's stopped playing the long game. What's left is far more direct.",
      "He holds the door, then blocks it, then grins at his own nonsense.",
    ],
    close: [
      '"I wasn\'t expecting to care about anyone," he admits quietly, the charm dropping for just a moment. "But you changed that."',
      "The coin stays in his pocket. He has nothing to distract you with, and doesn't want one.",
      '"Ask me anything," he says. "I\'ll even tell you the truth. Novel, isn\'t it."',
      "He says your name without the drawl. It sounds like a different man saying it.",
      "For the first time, he lets you see how much of the act was armor.",
    ],
    bound: [
      "No angles, no coin, no charm. Just him, which turns out to be far more dangerous.",
      "He says your name in bed with that drawl and it is genuinely unfair.",
      '"I spent years being nobody\'s," he says quietly. "Turns out I\'m yours. Who knew."',
      "He kisses slow, like a man with nowhere to be and no interest in being anywhere.",
      "He's stopped performing entirely. It cost him something. He'd pay it again.",
    ],
  },
  temperamentDialogue: {
    new: [
      '"Well, hello there. New face in town?"',
      '"Everything in Dionysia costs something, sure. But your first favor\'s on the house — call it a welcome."',
      '"I was thinking about taking a walk around campus. Just doing my part in staying healthy."',
      "\"You've got good instincts. Those'll serve you well around here — stick with me and you'll be fine.\"",
      "\"Oh no, I just handle the odd jobs around here. So if there's anything you need, don't hesitate to ask.\"",
    ],
    known: [
      '"Well. If it isn\'t the persistent one."',
      "\"I'm sorry, but I'm a bit short on time. Would you mind if I take my leave here?\"",
      '"Sit, if you like. I\'ve nowhere pressing to be. Never do, lately."',
      '"You listen more than you talk. Rare, that. I could get used to it."',
      '"Careful — I\'m starting to expect you."',
    ],
    warm: [
      '"Well, hello there. Seeing you always makes my day."',
      '"Back for more? I\'d start to think you liked me."',
      '"Sit down. I\'ll behave. Mostly."',
      '"You never take the easy answer. It\'s very inconvenient of you."',
      '"Nice to see everybody in such good spirits. Here\'s hoping this peace will last."',
    ],
    spark: [
      "\"Now, I've been very patient. I'd like it noted.\"",
      '"No coin, no trick, no angle. Just me asking. Say yes or say no."',
      '"You look at me like you\'ve already decided. Have you?"',
      "\"I'd behave, but you don't seem to want me to.\"",
      '"Come here, sugar. I\'m through being clever about it."',
    ],
    close: [
      '"You\'ve become my favorite person in this place lately, you know."',
      '"No tricks tonight. Just me. Try not to look so surprised."',
      '"I\'ve lied to everyone in this house. Not to you. Not once that mattered."',
      '"Stay a while, would you? The quiet\'s easier with you in it."',
      '"I used to be someone here. With you I don\'t have to be anyone."',
    ],
    bound: [
      '"Come back to bed, sugar. Everything else can wait on us."',
      '"I love you. No trick in it. Check my hands if you like."',
      '"Say my name like that again. Slower."',
      "\"I've got nothin' left to hide behind. Suits me fine.\"",
      '"Stay. I\'ll make it worth the morning."',
    ],
  },
  approach: {
    new: [
      "Take him up on the favor",
      "Play along",
      "Ask what the odd job is",
      "See what it'll cost",
    ],
    known: [
      "Sit, if you like",
      "See through it anyway",
      "Pass his little test",
      "Turn up again",
    ],
    warm: [
      "Take the offered hand",
      "Sit down with him",
      "Call the charm out",
      "Ask how he really is",
    ],
    spark: ["Come here", "Decide", "Let him block the door", "Say yes"],
    close: [
      "Go sit with him",
      "Ask for the truth",
      "Say his name plainly",
      "Stay through the quiet",
    ],
    bound: [
      "Come back to bed",
      "Check his hands",
      "Say his name slower",
      "Stay",
    ],
  },
  responses: {
    kind: {
      new: [
        "Be cautious of his charm",
        "Thank him and mean it",
        "Notice he looks tired",
      ],
      spark: [
        "Tell him he can stop angling",
        "Take his hand",
        "Say yes gently",
      ],
      close: [
        "Ask what he's really after",
        "Tell him walls can come off",
        "Say you liked him anyway",
      ],
      bound: ["Say it back", "Take his hands", "Tell him he's someone's now"],
    },
    playful: {
      new: [
        "Enjoy the show he's putting on",
        "Pretend the charm's working",
        "Flirt shamelessly back",
      ],
      spark: [
        "Make him be patient longer",
        "Turn his own line back on him",
        "Make him work for the yes",
      ],
      close: [
        "Play his game back",
        "Catch him in a half-truth",
        "Out-drawl him",
      ],
      bound: [
        "Make him drop the act",
        "Say his name wrong on purpose",
        "Call the bluff one more time",
      ],
    },
    bold: {
      new: ["Call his bluff", "Ask what he lost", "Refuse to be charmed"],
      spark: ["Say yes", "Block the door yourself", "Tell him not to behave"],
      close: [
        "Confront him about it all",
        "Tell him to stop performing",
        "Say you're not a mark",
      ],
      bound: [
        "Say his name slower",
        "Pull him back down",
        "Tell him to make it worth it",
      ],
    },
    neutral: {
      new: ["Stay wary", "Let him talk", "Give nothing away"],
      spark: [
        "Leave him guessing",
        "Step around him",
        "Let the question hang",
      ],
      close: [
        "Watch what he's really doing",
        "Sit through the silence",
        "Let him have the quiet",
      ],
      bound: ["Let him talk", "Turn over", "Let the morning come"],
    },
  },
};
