export default {
  dialogue: {
    new: [
      'He\'s scrolling through his phone, barely acknowledging you at first. "Oh. Hey."',
      "One earbud comes out. That's the entire greeting, and it's more than most people get.",
      "He's found the one spot in the whole building where nobody looks. You found him anyway.",
      '"...You need something?" He sounds like he hopes the answer is no.',
      "\"Shift at the Darkwick Mystery Diner. Summer was our busy period back home, so I always killed myself helping out. Now I'm here though... nothing's changed.\"",
    ],
    known: [
      "Both earbuds come out. That's a significant escalation.",
      "\"Oh, it's you,\" he says, and doesn't go back to the phone right away.",
      '"Oh, Senpai... could you open the link I sent you? No, you don\'t have to sign up or anything. Thanks."',
      "He asks if you've seen the thing. He's asking because he wants to talk about it.",
      "He remembers what you said about the ending. He'd been thinking about it.",
    ],
    warm: [
      "He actually puts his phone down when you arrive. Doesn't pick it back up, either.",
      "He shifts over on the couch without looking up. The space is for you.",
      "\"You're behind on the episodes,\" he says. He's been keeping count for you.",
      "He hands you the second controller. He's already set your profile up.",
      "The slouch stays. The attention does not — that's entirely on you now.",
    ],
    spark: [
      "You fall asleep against his shoulder. He doesn't move for two hours.",
      '"You\'re kind of in my space," he says, not moving an inch.',
      "He looks at you during the quiet part of the episode instead of the screen.",
      "The controller goes down. He's looking at you like the game stopped mattering.",
      '"...I like you," he says, flat as a weather report, and goes back to the show.',
    ],
    close: [
      '"Senpai... look, if it comes down to it, I\'m on your side. Obviously. Don\'t make it weird." The phone\'s already face down.',
      "He notices you're off before you've said a word, and quietly changes the plan.",
      '"Stay," he says, casual as anything, meaning it more than anything.',
      "He plays badly on purpose so the round lasts longer. He'd never admit that.",
      "The phone stays face down for the entire conversation. That's not nothing.",
    ],
    bound: [
      "You wake up tangled in him and the show has been on the menu screen for six hours.",
      '"Don\'t move," he mumbles into your hair. "Seriously. This is perfect."',
      "He kisses you lazily, halfway through a level, and loses the level entirely.",
      "He's stopped hiding. He's just quietly, thoroughly yours, and everyone knows it.",
      'He says "love you" like it\'s punctuation now — flat, constant, absolutely meant.',
    ],
  },
  temperamentDialogue: {
    new: [
      '"Huh? Oh, didn\'t see you there. You lost or something?"',
      '"...Hey. You can sit, I guess. It\'s not my couch."',
      "\"If you're just gonna stand there, could you go feed the animals in the aquatic zone? I'm too busy.\" (He isn't.)",
      "\"Nah, I'm not doing anything. That's kind of the point.\"",
      '"Cool. Yeah. Anyway."',
    ],
    known: [
      '"Oh — hey. You can sit, if you want. Whatever."',
      '"Preach about doing it for your friends or the animals or whatever all you want — I really don\'t give a shit. People who say that stuff are just deluding themselves."',
      "\"I moved my bag. That's not a big deal, don't make it one.\"",
      "\"You're around a lot lately. It's fine. Not a complaint.\"",
      "\"Don't spoil it. Seriously. I'll leave.\"",
    ],
    warm: [
      "\"Oh, it's you. Yeah, I was hoping you'd show up.\"",
      '"Second controller\'s charged. No reason. Shut up."',
      '"You look wrecked. Sit down, I\'ll find something dumb to watch."',
      '"Took you long enough. Not that I was counting."',
      '"You want the good snacks? I hid them. From everyone but you."',
    ],
    spark: [
      "\"Don't move. You're comfortable. That's — yeah. Don't move.\"",
      '"I said it already. I\'m not saying it twice. ...Fine. I like you."',
      '"You can sit closer. Obviously. Why are you making me say it."',
      "\"Stay over. Couch is fine. I'm fine. Everything's fine.\"",
      '"You keep falling asleep on me. I keep letting you. Draw your own conclusions."',
    ],
    close: [
      "\"Hey, senpai... I'm really glad you're here. More than you know.\"",
      "\"Something's up with you. Don't bother lying, just tell me.\"",
      '"You can stay as long as you want. Seriously. As long as you want."',
      '"I don\'t do this with anybody else. You get that, right?"',
      "\"If someone's giving you trouble — say the word. I'll stop being lazy.\"",
    ],
    bound: [
      '"Don\'t get up. Seriously. Stay right there."',
      '"Love you. Yeah, I know I said it this morning. Still true."',
      '"Come back to bed, senpai. The game\'s not going anywhere."',
      "\"You're on my side of the couch. That's fine. That's ideal, actually.\"",
      "\"I'm not good at big gestures. This is the gesture. You, here. That's it.\"",
    ],
  },
  approach: {
    new: [
      "Say hey back",
      "Sit down uninvited",
      "Ask what he's watching",
      "Wait for the earbud",
    ],
    known: [
      "Take the cleared seat",
      "Talk about the ending",
      "Don't spoil it",
      "Sit without asking",
    ],
    warm: [
      "Take the empty space",
      "Grab the second controller",
      "Steal the good snacks",
      "Put your feet up",
    ],
    spark: ["Don't move", "Sit closer", "Stay over", "Make him say it"],
    close: [
      "Flop down next to him",
      "Tell him what's wrong",
      "Stay as long as you want",
      "Let him have your back",
    ],
    bound: [
      "Don't get up",
      "Come back to bed",
      "Take his side of the couch",
      "Say it back",
    ],
  },
  responses: {
    // playful is Ren's register — dry banter, gaming, ribbing the clown; it
    // lands hardest (affinityByResponse.playful = 2). kind reaches him too, but
    // only low-key and unsentimental (1). bold glances off — he deflects
    // forwardness rather than meeting it (0), so those moves read as the player
    // pushing and Ren not biting.
    kind: {
      new: [
        "Be steady with him",
        "Match his quiet",
        "Don't make it a thing",
      ],
      spark: ["Say it back, low-key", "Stay on his shoulder", "Let him off the hook"],
      close: [
        "Tell him he's off the clock",
        "Tell him he's not lazy",
        "Say you'll stick it out",
      ],
      bound: ["Say it back", "Stay right there", "Let him keep hold"],
    },
    playful: {
      new: [
        "Trade deadpan with him",
        "Rib him about the clown",
        "Challenge him to a round",
      ],
      spark: [
        "Make him say it twice",
        "Out-deadpan him",
        "Pause it to mess with him",
      ],
      close: [
        "Get a real laugh out of him",
        "Beat him at his own game",
        "Steal his hoodie",
      ],
      bound: [
        "Lose the level for him",
        "Hog the whole couch",
        "Make him say it again",
      ],
    },
    bold: {
      new: [
        "Ask the blunt question",
        "Sit far too close",
        "Put it right out there",
      ],
      spark: ["Say it first", "Sit closer without asking", "Stay over"],
      close: [
        "Name what this is",
        "Push him to stop hiding",
        "Say it before he does",
      ],
      bound: ["Pull him back to bed", "Say it first", "Turn the game off"],
    },
    neutral: {
      new: ["Let him be", "Watch the screen with him", "Say nothing at all"],
      spark: ["Let the episode run", "Move over", "Pretend you were asleep"],
      close: [
        "Be quiet with him",
        "Share the couch in silence",
        "Let the episode run",
      ],
      bound: ["Let the menu screen run", "Stay still", "Fall back asleep"],
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
      "One earbud comes out. From **{name}**, that's a full greeting for {user}.",
      '"Oh. Hey." **{name}** is mildly impressed {user} found him at all.',
      "{user} says the name, and **{name}** pauses the game. Doesn't unpause it, either.",
    ],
    warm: [
      "**{name}** puts the phone down for {user}, and doesn't pick it back up.",
      "\"You're behind on the episodes,\" **{name}** tells {user}, who didn't know he'd been counting.",
      "{user} calls out, and **{name}** shifts over. The space is for them.",
    ],
    spark: [
      "\"Second controller's charged.\" **{name}** says it to {user} like it isn't a confession.",
      "{user} says the name, and **{name}** goes very deliberately deadpan about it.",
      "**{name}** was in the one spot on campus nobody looks. {user} looked.",
    ],
    close: [
      '"Don\'t move. Seriously." **{name}** arrives at {user} and stays exactly there.',
      "**{name}** loses the run because {user} called his name. Worth it, apparently.",
      "{user} calls, and **{name}** pockets the phone and straightens up, both unprecedented.",
    ],
    bound: [
      '"Love you, senpai. Yeah, I know I said it this morning." **{name}** says it to {user} again anyway.',
      "**{name}** reaches {user} and puts his chin on their shoulder. That was the whole plan.",
      "{user} says the name, and **{name}** decides the **{house}** roster can manage without him.",
    ],
  },
};
