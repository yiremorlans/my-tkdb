export default {
  dialogue: {
    new: [
      'He looks up from his work, a little flustered but smiling warmly. "Oh! H-hello. Do you need help with something?"',
      "He's carrying far too much and insists it's no trouble at all.",
      '"Careful there — mind the — ah, you\'ve got it. Good, good."',
      "He starts to say something, thinks better of it, and offers you a snack instead.",
      "There's a kindness to him that's older than everyone else in this school put together.",
    ],
    known: [
      "He knows your name, and says it like he's glad of the chance to.",
      "He's stopped asking whether you need help. He just starts helping.",
      "There's something set aside on the counter. It's been there a couple of days.",
      '"You\'re one of the ones who says thank you," he says. "I remember those."',
      "The fluster has settled into something easier.",
    ],
    warm: [
      'He gets a bit red in the face when he sees you, but his smile is genuine and eager. "You came back! Can I help you with anything?"',
      "He's set something aside for you. He does that most days now, just in case.",
      '"You remind me of someone," he says fondly, and doesn\'t finish the thought.',
      "He fusses over whether you're warm enough, then apologizes for fussing.",
      "He remembers exactly what you asked about last time, down to the detail.",
    ],
    spark: [
      "He goes red to the ears and busies himself with something that needed no attention.",
      "He steadies you by the elbow, and takes a long moment letting go.",
      "\"Ah — I've been meaning to say — no, it'll keep. It'll keep.\"",
      'He\'s practiced this in his head about forty times. It comes out as "you look nice."',
      "He walks you to the gate and finds three reasons to walk slower.",
    ],
    close: [
      '"You\'re really important to me," he says softly, a hint of bashfulness in his voice. "I\'m always happy to help you with anything you need."',
      "He tells you a story about the old days that he doesn't tell anyone.",
      '"Don\'t push yourself so hard," he says gently. "Somebody ought to say it."',
      "He's quietly made your life easier in three ways this week and mentioned none of them.",
      "He looks at you the way one looks at something worth having stayed around for.",
    ],
    bound: [
      "He still goes red. He's stopped letting it stop him.",
      "He kisses your forehead every single morning like a man observing a sacrament.",
      '"I\'d got used to being alone," he admits quietly. "You\'ve ruined that entirely."',
      "He holds you carefully, like something he's been trusted with and means to deserve.",
      "He's old-fashioned about all of it, and it turns out that's devastating.",
    ],
  },
  temperamentDialogue: {
    new: [
      '"Oh! H-hi! Did you need something? I\'m here to help!"',
      '"Whoa there — careful now. This old floor\'s got opinions."',
      '"You look hungry. Ah — sorry, that was forward of me."',
      '"Anything you need carried? I\'m good for it, honest."',
      '"New face! Well, welcome. It\'s a strange place, but it grows on you."',
    ],
    known: [
      '"Oh — you\'re back! Good, good. I set something aside, hang on."',
      "\"Don't carry that yourself, I've got two good arms doing nothing.\"",
      '"You always say thank you. Not everyone does, you know."',
      "\"How've you been keeping? Eating properly? Ah — sorry, I'm fussing.\"",
      '"Take it. No charge. I\'d only have eaten it myself."',
    ],
    warm: [
      "\"You're back! I'm really happy to see you. What can I do for you?\"",
      '"Set that down, I\'ll take it. No arguing."',
      "\"I kept this aside for you. Wasn't sure you'd come. Glad you did.\"",
      '"Warm enough? Here — take it, I\'ve got another."',
      '"Ah, it\'s good to see a friendly face. Been a long day."',
    ],
    spark: [
      "\"You look — ah. Very nice. That's all. That's what I meant to say.\"",
      '"I\'m too old to be this flustered and here we are."',
      "\"Let me walk you back. It's dark. That's the reason. That's the only reason.\"",
      '"I\'ve been meaning to tell you something. Give me a minute to lose my nerve."',
      '"You make an old man feel very silly. I don\'t mind it a bit."',
    ],
    close: [
      '"You mean a lot to me. I\'d do anything to help you."',
      '"Sit with me a bit. These old bones like the company."',
      "\"You've been running yourself ragged. Don't think I haven't noticed.\"",
      "\"I've seen a lot of students come and go. You're the one I'll remember.\"",
      "\"Whatever it is, bring it to me first. That's what I'm here for.\"",
    ],
    bound: [
      '"Come here, love. Let me look at you a minute."',
      '"I love you. Took an old man far too long to get that out."',
      "\"Stay the night? I'll not pretend I don't want you to.\"",
      "\"You make me feel like a young fool. I've decided I don't mind.\"",
      '"Sit with me. Just here. That\'s all I ever want, most days."',
    ],
  },
  approach: {
    new: [
      "Offer to help carry",
      "Accept the snack",
      "Say hello",
      "Mind the floor",
    ],
    known: [
      "Take what he set aside",
      "Let him carry it",
      "Say thank you again",
      "Let him fuss",
    ],
    warm: [
      "Let him take the load",
      "Take what he set aside",
      "Ask about his day",
      "Sit with him a while",
    ],
    spark: [
      "Let him walk you back",
      "Wait out his nerve",
      "Take his arm",
      "Walk slower",
    ],
    close: [
      "Go sit with him",
      "Ask for the old story",
      "Bring it to him first",
      "Tell him he matters",
    ],
    bound: ["Come here", "Stay the night", "Sit with him", "Say it back"],
  },
  responses: {
    kind: {
      new: [
        "Trust his wisdom",
        "Thank him warmly",
        "Tell him it's no trouble",
      ],
      spark: [
        "Tell him it came out fine",
        "Take his arm",
        "Let him lose his nerve",
      ],
      close: [
        "Let him care for you",
        "Tell him to rest too",
        "Say he's been remembered",
      ],
      bound: [
        "Say it back",
        "Let him look at you",
        "Tell him he's not a fool",
      ],
    },
    playful: {
      new: [
        "Fluster him on purpose",
        "Tease him about the fussing",
        "Ask for the second snack",
        "Catch him mid-apology and grin",
      ],
      spark: [
        "Make him say it again",
        "Slow down just to watch him",
        "Tease the blush",
        "Make him lose his nerve",
      ],
      close: [
        "Match his dry humor",
        "Tease him about the old days",
        "Make him laugh out loud",
        "Needle him just to get a rise",
      ],
      bound: [
        "Make him blush again",
        "Call him an old fool, fondly",
        "Kiss him first",
        "Steal his last bite",
      ],
    },
    bold: {
      new: [
        "Say just what you're thinking",
        "Take the load from his arms",
        "Ask him straight out",
      ],
      spark: [
        "Say the thing he won't",
        "Take his hand at the gate",
        "Close the distance first",
      ],
      close: [
        "Tell him you're staying",
        "Promise to look after him",
        "Say you'd stay too",
      ],
      bound: [
        "Say it first",
        "Tell him to stop pretending",
        "Pull him in",
      ],
    },
    neutral: {
      new: ["Be quiet", "Let him fuss", "Wait while he finishes"],
      spark: ["Let it keep", "Say goodnight", "Walk on ahead"],
      close: [
        "Rest with his wisdom",
        "Sit in the old quiet",
        "Let the story trail off",
      ],
      bound: ["Sit with him quietly", "Let the evening pass", "Say nothing"],
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
      '"Oh! H-hello." **{name}** is carrying far too much and insists to {user} that it\'s no trouble.',
      '{user} says the name, and **{name}** goes red to the ears. "You— you remembered?"',
      '"Careful there — mind the—" **{name}** stops. {user} has already got it.',
    ],
    warm: [
      '"You came back!" **{name}** beams at {user} and immediately offers to carry something.',
      "{user} calls out, and **{name}** sets down the crate he'd been managing badly.",
      "**{name}** had put something aside for {user}. He does that most days now, just in case.",
    ],
    spark: [
      "**{name}** goes red, apologizes for going red, and stays exactly where {user} can see him.",
      '"You remind me of someone," **{name}** tells {user} fondly, and doesn\'t finish the thought.',
      "{user} says the name, and **{name}** forgets the whole afternoon's list.",
    ],
    close: [
      '"Come here, love. Let me look at you a minute." **{name}** means it to {user} kindly. Mostly.',
      "**{name}** hears {user}, and every ache of the day goes somewhere else.",
      "{user} calls, and **{name}** walks the long way round with them, just to have the time.",
    ],
    bound: [
      '"I\'d got used to being alone," **{name}** tells {user}. "You\'ve ruined that entirely."',
      "**{name}** kisses {user}'s forehead in front of half the campus, like a man observing a sacrament.",
      "{user} says the name, and **{name}** stops going red about it. Mostly.",
    ],
  },
};
