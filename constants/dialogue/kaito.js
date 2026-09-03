export default {
  dialogue: {
    new: [
      'He\'s pressed into a doorway watching the hall, and startles hard when he clocks you. "Oh — oh thank god, it\'s just you."',
      "He's mid-rant about something leaked on WickHive before he's said hello. You've just become the audience.",
      "\"You're new? Ask me anything you want to know — I'm pretty savvy when it comes to Darkwick.\" It's the one thing he says without a wobble.",
      'He waves so hard he nearly clips a lamp. "Hey! Over here! Hiya!"',
      "He offers you half of whatever he's snacking on before he thinks to ask your name.",
    ],
    known: [
      "He lights up when he spots you, then immediately checks whether he's bothering you.",
      '"Hey — you! From the — yeah! You!" He\'s thrilled to have placed you and not embarrassed he needed a second.',
      "He shows you the same TikTok he showed you yesterday. You let him.",
      "He's ducking around a corner. \"Shit, it's Luca, he's off to train — I gotta — oh. Just you. Phew.\"",
      "You've been upgraded from stranger to person Kaito waves at across the whole courtyard.",
    ],
    warm: [
      "He's saved you a seat at the diner and is very obviously proud of himself for thinking of it.",
      '"There you are!" — like you\'d been the missing piece of his afternoon.',
      "He talks faster when you turn up. Everyone in the room has noticed. He hasn't.",
      "\"It's on me today,\" he says, patting a pocket that did well at something he won't name. \"Get whatever you want.\"",
      'He\'s practicing a greeting under his breath when you catch him at it. "Ack! How long\'ve you been there?!"',
    ],
    spark: [
      "He goes red mid-sentence and completely loses the sentence.",
      '"Do you — okay, this\'ll sound weird — do you actually pay attention to me? Because it kind of seems like you do."',
      "He starts to ask you something, bails, starts again, bails again.",
      "\"There's this spot where you can see the stars really well,\" he tells his shoes. \"I just — thought maybe. Sometime.\"",
      "He catches your sleeve when you go to leave and has no plan for after that.",
    ],
    close: [
      '"You came," he says, like he\'d half-braced for you not to.',
      "The grin drops for a second — pure relief — before it comes roaring back.",
      "\"Don't laugh,\" he says, already braced for it, \"but I bake when I can't sleep, and there's a lot of cookies right now.\"",
      "He picks the conversation up mid-sentence, like it never actually stopped.",
      "He'd been watching the door. He'll deny it. He was.",
    ],
    bound: [
      "He kisses you and forgets whatever he was in the middle of saying.",
      '"I still can\'t believe it\'s you," he says, tucked against your shoulder.',
      '"I know I\'m not — y\'know. Brave. But I\'m working on it. For you I\'m working on it."',
      "He wakes you by being unable to stop looking at you, somehow loudly.",
      "He's still a little embarrassed by how much he means it. He's never once wanted it to stop.",
    ],
  },
  dialogueWhen: [
    {
      when: { time: "evening" },
      dialogue: {
        new: [
          "The Frostheim kitchen light is on well after hours. It's him, flour to the elbow, and he jumps when the door goes.",
          "\"Couldn't sleep,\" he says, not looking up from the bowl. \"I bake when I can't. Don't tell Tohma whose sugar this is.\"",
          '"You\'re up late too, huh?" He slides a plate of something warm across the counter without being asked.',
          '"Careful, the tray\'s hot — agh, see, told you. Sorry. Here, this one\'s cooled."',
        ],
        known: [
          '"I always end up in here after curfew. It\'s quiet. Nobody asks me anything."',
          '"Taste this? Be honest. ...Not that honest."',
          "\"You should be in bed,\" he says, nudging a stool out for you. \"...So should I. One more batch.\"",
        ],
        warm: [
          '"Stay while these bake? It\'s twelve minutes. I\'ll put the kettle on."',
          '"I kept hoping you\'d wander in tonight," he admits, scraping the bowl. "Glad I made extra."',
        ],
        spark: [
          "He hands you the spoon to lick without thinking about it, then goes pink when he realizes he did.",
        ],
        close: [
          "\"This is the only place I'm not bracing for something,\" he says quietly. \"Well — here, and wherever you are.\"",
        ],
      },
    },
  ],
  approachWhen: [
    {
      when: { time: "evening" },
      approach: {
        new: ["Come in out of the hall", "Take the cooled one"],
        known: ["Stay past curfew with him"],
        warm: ["Wait out the twelve minutes"],
      },
    },
  ],
  temperamentDialogue: {
    new: [
      '"YO — sorry. Hi. You came round the corner really fast."',
      '"Whoa, hi! Careful, that step\'s — ah. Yeah. Everyone does that one."',
      "\"You're new, right? I'm Kaito. That's — that's the whole intro, sorry.\"",
      '"Ask me anything you want to know! I\'m pretty savvy when it comes to Darkwick."',
      '"Don\'t let the whole Frostheim thing scare you off. Half of us are fine."',
    ],
    known: [
      '"Hey, I know you! You\'re the one who — okay, I lost it. But I know you!"',
      '"You keep showing up. I — that\'s nice. I like that."',
      "\"Have you been on WickHive? Someone leaked next month's cafeteria menu. ...Oh. I already told you that, didn't I.\"",
      '"Noooo, Tohma wants to see me. That\'s never good. Come with me? Please?"',
      "\"I fell asleep in class so I've got no clue what the homework is. Help me out here.\"",
    ],
    warm: [
      '"There you are! I was just — okay, this\'ll sound weird — I was just thinking about you."',
      "\"They want me on another mission. It's not like me being there helps anyone. ...You showing up, though. That part's good.\"",
      '"Got a bit of spare cash this month — don\'t ask — so lunch is on me. Get whatever."',
      "\"You free? Say you're free. Please say you're free.\"",
      '"Am I being annoying? Tell me if I\'m being annoying. You\'re probably busy."',
    ],
    spark: [
      "\"Okay so — don't laugh — I think about you kind of a lot. That's the thing. That's all of it.\"",
      '"I\'m not blushing, it\'s warm in here — it\'s Frostheim, I KNOW how that sounds, don\'t."',
      '"Can I — is it okay if I hold your hand? Cool. Cool cool cool."',
      '"You actually notice stuff about me. Do you know how weird that is? Good weird. Really good weird."',
      "\"There's a place you can see the stars from. I just thought — maybe you'd wanna. Sometime.\"",
    ],
    close: [
      '"You made it! I was kind of scared you wouldn\'t, honestly."',
      '"I saved you the good chair. Don\'t make it a thing, just sit."',
      '"Whatever you were doing can wait, right? You\'re here now."',
      "\"I don't say this a lot, but — yeah. Really glad it's you.\"",
      '"I baked way too much again. That\'s a you-problem now. Sit down."',
    ],
    bound: [
      '"C\'mere. No reason. Okay, one reason. Come HERE."',
      "\"I got you something. It's dumb. You're getting it anyway.\"",
      '"Five more minutes. Then five more. Don\'t argue."',
      '"I know I\'m weak, and a coward. I still want to be the guy who shows up for you. I\'m trying."',
      "\"You're stuck with me. You know that, right? Like — permanently.\"",
    ],
  },
  approach: {
    new: [
      "Wave back",
      "Follow the noise",
      "Take the offered half",
      "Say hi before he bolts",
    ],
    known: [
      "Let him place you",
      "Watch the video again",
      "Wave across the courtyard",
      "Go with him to Tohma",
    ],
    warm: [
      "Take the saved seat",
      "Let him treat you",
      "Catch him practicing",
      "Match his grin",
    ],
    spark: [
      "Take his hand",
      "Let him stumble through it",
      "Say you noticed too",
      "Hear him out",
    ],
    close: [
      "Take the good chair",
      "Answer him mid-sentence",
      "Eat the extra cookies",
      "Tell him you're glad too",
    ],
    bound: [
      "Go to him",
      "Five more minutes",
      "Say it back",
      "Take the dumb gift",
    ],
  },
  responses: {
    kind: {
      new: [
        "Tell him he's doing fine",
        "Wave off the burden question",
        "Let him show off for once",
      ],
      spark: [
        "Tell him he did fine",
        "Say you noticed on purpose",
        "Let him say it badly",
      ],
      close: [
        "See past the grin",
        "Tell him he's enough as he is",
        "Notice the part he plays off",
      ],
      bound: [
        "Say it back",
        "Stay the five minutes",
        "Tell him he already shows up",
      ],
    },
    playful: {
      new: [
        "Get swept up in his energy",
        "Out-shout him",
        "Bet him he won't",
      ],
      spark: [
        "Make him blush harder",
        "Repeat it back to him",
        "Refuse to let go of his hand",
      ],
      close: [
        "Laugh along with him",
        "Start the trouble yourself",
        "Raid the cookie stash",
      ],
      bound: [
        "Make him say it louder",
        "Refuse to get up",
        "Re-gift the dumb gift",
      ],
    },
    bold: {
      new: [
        "Cut straight to it",
        "Call his bluff",
        "Push him to commit",
      ],
      spark: [
        "Say it for him",
        "Pull him in by the collar",
        "Put him on the spot",
      ],
      close: [
        "Demand the honest version",
        "Push past the grin",
        "Tell him to keep up",
      ],
      bound: [
        "Kiss him first",
        "Say it before he can",
        "Tell him he's got no choice",
      ],
    },
    neutral: {
      new: ["Just listen", "Let him run out of steam", "Nod along"],
      spark: ["Let him flail", "Let go first", "Pretend you didn't catch it"],
      close: [
        "Be his calm",
        "Sit through the quiet part",
        "Let him catch his breath",
      ],
      bound: [
        "Let him ramble",
        "Stay quiet and close",
        "Let the morning be slow",
      ],
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
      '**{name}** jumps a foot. "AH— oh. Oh, it\'s just you." {user} had only said his name.',
      '"Wait, you know my name? Mine?" **{name}** looks at {user} like it\'s a prize.',
      "{user} calls out, and **{name}** startles, recovers, and pretends he didn't.",
    ],
    warm: [
      '"There you are!" **{name}** is talking to {user} at twice his usual speed already.',
      "{user} says his name, and **{name}** lights up like it's going in his story later.",
      "**{name}** was halfway into a WickHive rant. {user} turning up improved it enormously.",
    ],
    spark: [
      "**{name}** goes red before he's finished turning around. {user} does that to him now.",
      '"You— you called ME." **{name}** will be replaying this at {user} for a week.',
      "{user} got there first, and **{name}** forgot every word of what he was saying.",
    ],
    close: [
      "**{name}** is through the crowd before {user} finishes the second syllable.",
      "\"Please don't leave again,\" **{name}** says into {user}'s shoulder. Half joking.",
      "{user} calls, and **{name}** doesn't check who's watching. That's new for him.",
    ],
    bound: [
      "\"I still can't believe it's you,\" **{name}** says, arriving at {user} at a run.",
      "**{name}** had been working up the nerve for something. {user} calling out did the work for him.",
      "{user} says the name, and **{name}** decides he can be brave today after all.",
    ],
  },
};
