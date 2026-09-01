export default {
  dialogue: {
    new: [
      'He regards you with gentle courtesy, petals dancing around him. "An unexpected pleasure."',
      "A perfect bow, a perfect smile, and absolutely nothing given away.",
      '"...Hey, you alive? Not much point me just standing here waiting around. Guess I\'ll take off."',
      "He offers his hand, palm up, with the practiced grace of a shrine ceremony.",
      '"Haha. Don\'t expect too much from me," he says lightly. "Ghouls are just glorified street magicians, really."',
    ],
    known: [
      "The courtesy is unchanged. What sits underneath it has begun to look interested.",
      "He greets you by name and seems faintly proud of the effect it has.",
      "He's rehearsed something charming and delivers roughly three quarters of it.",
      "\"What are you doing here? Don't tell me you've gotten yourself mixed up in something again.\"",
      "The sleeve comes up half a second later than it used to.",
    ],
    warm: [
      "There's warmth in his eyes as he acknowledges you, a small smile playing at his lips. His usual formality softens slightly.",
      "He begins a flirtation, gets halfway, and loses his nerve in a way he finds humiliating.",
      '"You\'ve caught me unprepared," he says, which is itself unprecedented.',
      "He hides behind his sleeve. It fools no one, least of all you.",
      "\"Zenji's off roaming around somewhere again... People are more sensitive this time of year, so I wish he'd just stay put.\"",
    ],
    spark: [
      "He gets the whole flirtation out this time, and then has to sit down.",
      "He takes your hand to help you over the step and simply keeps it.",
      '"I had a speech," he says. "It was excellent. You\'ve ruined it. Again."',
      "The sleeve doesn't come up. He lets you watch him mean it.",
      "He leans in — genuinely leans in — and stops a breath away, waiting.",
    ],
    close: [
      '"I find myself waiting for you," he admits quietly, dropping the courteous mask for just a moment. "More than I should."',
      "He says something bold, means it entirely, and immediately looks like he'd like to leave.",
      '"Would you — that is —" He stops. Tries again. Fails beautifully.',
      "The petals settle. So does the performance. What's left is very honest.",
      "He takes your hand properly this time, and doesn't let go first.",
    ],
    bound: [
      "He has entirely stopped chickening out. The results are devastating.",
      "He kisses you like someone who spent months rehearsing and has thrown the script away.",
      '"I was raised to be proper," he says against your mouth. "I\'ve made my peace with failing."',
      "He unties your obi with the patience of a man who has thought about it a great deal.",
      "The courtesy is still there. It's just aimed somewhere much more specific now.",
    ],
  },
  dialogueWhen: [
    {
      when: { time: "evening" },
      dialogue: {
        new: [
          '"An unexpected pleasure — and at the loveliest hour for it," he says, petals catching the lantern light.',
          "A perfect bow, half-lit. The dark keeps whatever the smile isn't giving away.",
          '"The shrine\'s nicer after sundown. Fewer witnesses, better lighting. Come in."',
          '"Mind the path," he says. "The lanterns only pretend to light it."',
        ],
        known: [
          "He's lit the path lanterns already and leaves the brightest one on your side of the step.",
          '"You always seem to arrive when the light\'s gone gold. I\'ve stopped believing it\'s luck."',
          '"Might I walk you as far as the gate? It\'s dark, and I\'m only a little self-interested."',
        ],
        warm: [
          '"The petals show off worse after dark. I\'d say I don\'t either, but you\'re here."',
          '"Stay while the lanterns last," he says. "They last a while, if you\'re wondering."',
        ],
      },
    },
  ],
  approachWhen: [
    {
      when: { time: "evening" },
      approach: {
        new: ["Follow the lantern light in", "Return the half-lit bow"],
        known: ["Take the lit side of the step"],
        warm: ["Let him walk you to the gate"],
      },
    },
  ],
  temperamentDialogue: {
    new: [
      '"How lovely. A visitor graces us with their presence."',
      '"Do come in. The grounds are far kinder to guests than the gossip suggests."',
      '"You\'ve the look of someone with a story. I do adore stories."',
      '"Allow me — the path forks badly ahead. I\'d hate to lose you so soon."',
      "\"Haha. Don't expect too much from me. Let's keep it light, huh?\"",
    ],
    known: [
      '"Ah — you. I confess I\'d hoped it would be."',
      "\"You're becoming a familiar face. I've decided I approve.\"",
      '"Might I walk you as far as the gate? Purely practical, of course."',
      '"I had something clever prepared. It\'s gone entirely. How embarrassing."',
      "\"How's the search for clues about your curse going? Don't put too much pressure on yourself.\"",
    ],
    warm: [
      '"There you are. If you ever want to talk — the curse, anything — I\'m happy to listen."',
      "\"I'd say I've been waiting, but that would be terribly forward of me. ...I've been waiting.\"",
      '"You do make it difficult to be composed. That\'s a compliment."',
      '"Come, walk with me. The petals are showing off tonight."',
      "\"Ah — you're smiling at me. That's cheating.\"",
    ],
    spark: [
      '"May I be improper for a moment? ...Good. You look devastating tonight."',
      '"I\'ve been raised to be courteous. Courtesy is losing."',
      '"If I lean any closer I\'ll have to explain myself. Shall I?"',
      '"Say something. Anything. If you say nothing I\'ll do something rash."',
      '"I\'m going to regret my nerve in an hour. Let me have it now."',
    ],
    close: [
      '"I... you\'ve become someone I always look forward to seeing."',
      '"Let me say this before I lose the courage: I\'d like you to stay."',
      "\"Stop looking at me like that. No — don't. Please don't stop.\"",
      "\"I've been eloquent all my life and you've ruined it entirely.\"",
      '"Your hand. May I? ...Thank you. I\'ll be insufferable about this later."',
    ],
    bound: [
      '"May I? ...You never say no. I confess I find that thrilling."',
      '"I love you. I got it out on the first attempt. Did you notice? I noticed."',
      '"Stay. Let the house scandalize itself, I\'ve stopped minding."',
      '"Come here and let me be entirely improper about you."',
      '"You\'ve undone my manners completely. Please continue."',
    ],
  },
  approach: {
    new: [
      "Take his offered hand",
      "Match his courtesy",
      "Step through the petals",
      "Answer him in kind",
    ],
    known: [
      "Walk as far as the gate",
      "Look pleased anyway",
      "Wait for the clever line",
      "Lower his sleeve",
    ],
    warm: [
      "Walk with him",
      "Call his bluff",
      "Lower his sleeve",
      "Smile at him on purpose",
    ],
    spark: [
      "Let him be improper",
      "Close the last breath",
      "Say nothing",
      "Let him keep your hand",
    ],
    close: [
      "Take his hand first",
      "Let him find the words",
      "Close the distance",
      "Say it before he can",
    ],
    bound: ["Say yes", "Let him be improper", "Stay the night", "Come here"],
  },
  responses: {
    kind: {
      new: [
        "Accept his kindness",
        "Return the courtesy",
        "Compliment him sincerely",
      ],
      spark: [
        "Tell him courtesy can lose",
        "Let him keep your hand",
        "Say it kindly first",
      ],
      close: [
        "Trust him with your heart",
        "Tell him the mask can wait",
        "Say you'd have waited too",
      ],
      bound: [
        "Say yes again",
        "Tell him you noticed",
        "Let him be proper for once",
      ],
    },
    playful: {
      new: ["Banter with him", "Out-flirt him", "Flatter him outrageously"],
      spark: ["Ruin the speech again", "Wait him out", "Ask him to be rash"],
      close: [
        "Catch him in the moment",
        "Fluster him deliberately",
        "Finish his sentence for him",
      ],
      bound: [
        "Make him ask permission",
        "Undo his manners further",
        "Say no, then yes",
      ],
    },
    bold: {
      new: [
        "Make a bold move",
        "Ask for honest, not charming",
        "Hold his gaze too long",
      ],
      spark: [
        "Close the last breath",
        "Be improper first",
        "Give him his nerve back",
      ],
      close: [
        "Challenge him directly",
        "Ask him to say it plainly",
        "Take his hand and keep it",
      ],
      bound: [
        "Be improper first",
        "Pull him in by the collar",
        "Tell him not to ask",
      ],
    },
    neutral: {
      new: [
        "Let him observe you",
        "Say nothing, let him wonder",
        "Walk in silence",
      ],
      spark: [
        "Let him find his footing",
        "Say nothing at all",
        "Step back politely",
      ],
      close: [
        "Let him read your mind",
        "Give him time to gather",
        "Let the petals fall",
      ],
      bound: [
        "Let him gather himself",
        "Say nothing",
        "Let the moment settle",
      ],
    },
  },
};
