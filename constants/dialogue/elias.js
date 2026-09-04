export default {
  // The level-up DMs (docs/bond-scene-dms.md). Elias deflects with courtesy the
  // way other people put up a hand — the formality and self-effacement are the
  // armor, and the arc is him letting the mask slip a little further each
  // level. He answers every question about himself with a question about you,
  // so the intimacy is measured in how often that stops working.
  bondScenes: {
    acquaintance: {
      beats: [
        "**{firstName}**: \"Oh, good evening. I hope I'm not intruding. I nearly didn't send this. I thought about it rather a long time, actually.\"",
        "\"There's something I've been meaning to say, and the right moment kept not arriving, so… I suppose I'm making one now.\"\n\n\"You say good evening to me in the west corridor. Not to the captain, not to anyone worth knowing, but to the man with the mop. I've counted. {timesMet} times you've passed through this house, and every single time, you've done it.\"\n\n\"Most people don't, you know. Not out of unkindness. They simply don't see the help.\"",
      ],
      choice: {
        prompt: "\"That's really the whole of it. Please, say what you're thinking.\"",
        options: [
          {
            key: "kind",
            label: "Say he's not the help",
            style: 3,
            close: "\"Ah… now.\"\n\nA long pause, gentle and unhurried.\n\n\"That's very kind of you. It isn't quite true. But I'd like it if you kept saying so anyway. Good night.\"",
          },
          {
            key: "playful",
            label: "Ask what took so long",
            style: 1,
            close: "\"Oh, I drafted several versions in my head. Discarded most of them.\"\n\n\"...It's been some time since anyone made me smile at my own foolishness. I'll be thinking on that for a while.\"",
          },
          {
            key: "bold",
            label: "Ask what he used to be",
            style: 4,
            close: "There's a pause rather longer than the question should need.\n\n\"Now that,\" he says softly, \"is a question with a door behind it.\"\n\n\"Ask me again sometime, when it's later and I'm tired enough not to mind opening it. Good night.\"",
          },
        ],
      },
      keepsake: {
        emoji: "🍭",
        line: "A wrapped candy left on the sill outside your door.",
      },
    },

    friend: {
      beats: [
        '**{firstName}**: "A question, if I may. You\'re welcome to tell me to mind my own."',
        "\"Every time I turn one of your questions back around, you let me. You don't push, and you don't sulk about it. Then the next time, you come at me with {favResponse} again, as if nothing happened.\"\n\n\"I have been deflecting people, professionally, for the better part of a decade. It works because people tire of it eventually. You don't seem to. I would very much like to know why.\"",
      ],
      choice: {
        prompt: "\"Go on, then. I'm bracing myself, and I'd rather have it over with.\"",
        options: [
          {
            key: "kind",
            label: "Say you're not in a hurry",
            style: 3,
            close: "\"...Well, now.\"\n\n\"That's the trouble with patient people. A man can hold a door shut against a push. He can't do much about someone simply sitting down outside it.\"",
          },
          {
            key: "playful",
            label: "Say you enjoy the deflecting",
            style: 1,
            close: "\"You *enjoy* it.\"\n\nA pause.\n\n\"That may be the unkindest thing anyone's said to me all year, and I rather think I had it coming. Fine. Fine. Point to you.\"",
          },
          {
            key: "bold",
            label: "Ask him something anyway",
            style: 4,
            close: "He answers it, plainly, the first time, without turning it around, and then there's a long silence while you both notice that he did.\n\n\"...Huh,\" he says quietly. \"Look at that. Still works, apparently.\"",
          },
        ],
      },
      keepsake: {
        emoji: "📻",
        line: "The first question he answered without turning it back around.",
      },
    },

    closeFriend: {
      beats: [
        "**{firstName}**: \"Are you awake? Would you come down to the hall. Bring nothing. It isn't that sort of night.\"",
        "There's a record playing, something old and warm, nothing like what Dionysia usually puts on, and the whole hall smells of chicory and something frying.\n\n\"A family recipe. I imported half of it and made rather a nuisance of myself at customs for the rest. I do this once a year, at two in the morning, when nobody's awake to be polite about it.\"",
        "\"It's my mother's music, and my mother's cooking, and this is the closest I get to New Orleans without a passport I'm not allowed to use.\"\n\nHe sets the plate down in front of you and doesn't sit yet.\n\n\"Eight years I've done this alone. It wasn't a rule, exactly. It simply never occurred to me there was anyone I'd want in the room. Then it occurred to me, and it wouldn't stop occurring to me. So… here we are.\"",
      ],
      choice: {
        prompt: "\"Well? Say something. I've gone and made myself nervous.\"",
        options: [
          {
            key: "kind",
            label: "Ask about his mother",
            style: 3,
            close: "He talks for two hours. No one in this house has ever heard any of it.\n\nAt the end, quietly, with none of his usual carefulness: \"I'd like to bring her here one day. I wanted someone to know that. It's the only real plan I have.\"",
          },
          {
            key: "playful",
            label: "Ask about the customs man",
            style: 1,
            close: "\"Oh, we became close. Quite close, really. He knows my name, my face, and my opinion of his paperwork.\"\n\n\"Eat, please, while it's hot. I'll be unbearable if you let it go cold.\"",
          },
          {
            key: "bold",
            label: "Ask him to dance to it",
            style: 4,
            close: "He looks at you for a long moment over the record player.\n\n\"...I haven't done that in eight years either.\"\n\nHe does it anyway, slow, unhurried, one hand at your back, the whole thing conducted at perhaps a third of the speed the song is asking for. Neither of you mentions that the record ended some time ago.",
          },
        ],
      },
      keepsake: {
        emoji: "🎷",
        line: "A record that kept turning long after the song had finished.",
      },
    },

    confidant: {
      beats: [
        '**{firstName}**: "You asked me once what I used to be. I told you to ask again when it was later, and I was tired enough."\n\n"It\'s later. I\'m tired enough."',
        "\"Captain of Dionysia. Four years. It isn't a secret, exactly. It's simply something people have agreed to be tactful about, which is worse.\"\n\n\"I lost it. Not a scandal, nothing you could put in a report. I simply reached a point where I couldn't keep up, and I let it go on long enough that someone had to say so, out loud, in a room with other people in it.\"",
        "\"Jo took it over. He does it better than I ever did, and I mean that entirely.\"\n\n\"Now I run his errands, and I'm good at it, and every so often someone calls me Captain by accident, and the whole hall goes quiet for half a second while everyone decides not to look at me.\"\n\n\"I've never said any of this aloud before, to anyone. A year ago I'd have made a joke of it instead.\"",
      ],
      choice: {
        prompt: "\"Please, don't be gentle about it. Gentle is what I get from the rest of the house, and I've had my fill.\"",
        options: [
          {
            key: "kind",
            label: "Say you'd have followed him",
            style: 3,
            close: "There is a very long silence.\n\n\"You wouldn't have wanted to,\" he says. \"You'd have gotten a man who was already running out.\"\n\nThen, quieter: \"...Say it again anyway. I find I'd like to hear it a second time, and I'm not proud of that.\"",
          },
          {
            key: "playful",
            label: "Call him Captain on purpose",
            style: 1,
            close: "The reply takes a while.\n\n\"You are a dreadful person, and I am extremely fond of you.\"\n\n\"...Do it again sometime, where people can hear. I'd like to see what happens too.\"",
          },
          {
            key: "bold",
            label: "Ask if he wants it back",
            style: 4,
            close: "\"No.\"\n\nThen, after a pause: \"That was too quick, wasn't it. Let me try again.\"\n\n\"No. But I would like to be something again, one day. I hadn't let myself want that in about three years, until you started asking me questions.\"",
          },
        ],
      },
      keepsake: {
        emoji: "🗝️",
        line: "The door he said he'd open some time when it was later.",
      },
    },

    devoted: {
      beats: [
        "**{firstName}**: \"You're perfectly all right. I already know you're all right, I checked twice. This message is entirely for my own sake.\"",
        "\"There was an incident in the lower hall tonight, and I went at it, and… I was slow. Not disastrously so. Slow. Eight years ago it would have taken me twenty seconds. Tonight it took four minutes, and I felt every one of them.\"\n\n\"That's the fear I don't say aloud. Not dying. Being the man who used to be able to.\"",
        "\"And here is what I actually meant to tell you, so I'll say it plainly and then go to bed.\"\n\n\"I went at it anyway. I didn't weigh it, didn't count the odds, didn't think about my knees. You were on the other side of that hall, and everything I've been careful about for three years went straight out the window.\"\n\n\"I'd been treasuring the quiet. Dreading the day it ended. It seems I'd rather it ended than have you on the far side of a bad hall.\"",
      ],
      choice: {
        prompt: "\"Tell me something true. I've had rather a night of it.\"",
        options: [
          {
            key: "kind",
            label: "Tell him he wasn't slow",
            style: 3,
            close: "\"Now you're only being kind to me.\"\n\nA pause.\n\n\"...Be kind to me. Just tonight. I'll be sensible again in the morning, and you can go back to being honest.\"",
          },
          {
            key: "playful",
            label: "Say four minutes is a brag",
            style: 1,
            close: "\"Four minutes is *showing off.*\"\n\n\"I'm going to be repeating that to myself for a week, and I want you to know precisely what you've done.\"",
          },
          {
            key: "bold",
            label: "Go down to the hall",
            style: 4,
            close: "He's sitting on the bottom step with his hands shaking, which he would never in his life have let anyone see.\n\nHe doesn't reach for a joke. He simply holds out a hand, and when you take it, he pulls you down onto the step beside him and leans his whole weight into you, and stays there a long while.\n\n\"Don't say anything,\" he says quietly. \"Just sit here. That's all I want.\"",
          },
        ],
      },
      keepsake: {
        emoji: "🕰️",
        line: "Four minutes he'll be counting for a long time.",
      },
    },

    soulbound: {
      beats: [
        "**{firstName}**: \"I'm going to try to say this without any of my usual deflecting, which you'll find is harder than it sounds.\"",
        "\"{timesMet} times. Every one of them, you've said good evening to a man with a mop, and never once asked him to be anything grander.\"\n\n\"You've no idea what that is, to someone who used to be grander. Or perhaps you do, and you've simply been kind enough never to say so.\"",
        "\"I've spent three years treasuring quiet days and dreading the end of them. That isn't peace. That's only fear with the lights turned low. I've known that for a while, and I've done nothing about it, because doing something about it would mean wanting something, and a man who wants something can lose it.\"",
        "\"So. Here is me, wanting something.\"\n\n\"I love you. Have done for a good while now, since before that night in the kitchen, if I'm honest, and I've been meaning to be honest about it for months.\"\n\n\"I'm not asking you to do anything about it. I'm simply done being a man who'd rather have nothing than risk losing something. That's the whole of my message, and it took me four cups of coffee to get here.\"",
      ],
      choice: {
        prompt: "\"Take your time. I have nothing but.\"",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close: "The reply is one word: \"Kitchen.\"\n\nThe record is already playing when you arrive, the same one, and he's standing in the middle of the floor with his hands in his pockets, looking rather younger than he is.\n\n\"Come here,\" he says, quiet and entirely without his usual carefulness. He gets both arms around you and holds on like a man who has been standing very still for a very long time, and has finally been told he can stop.",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close: "\"Of course. That's the right answer, and I mean that.\"\n\n\"It took me eight years to work up to one sentence. It would be a poor sort of man who handed it over and started a clock.\"\n\n\"There will be candy on your sill Tuesday, same as always, and I'll still wish you good evening in the west corridor. None of it was ever a down payment on anything. It was only ever me, glad you were there.\"",
          },
        ],
      },
      keepsake: {
        emoji: "🍬",
        line: "The night he decided he'd rather want something than keep nothing.",
      },
    },
  },
  dialogue: {
    new: [
      'He\'s winding a string of festival lights around one arm, in no hurry about it. "Well, now. Haven\'t seen your face around here."',
      'His careful courtesy arrives a good second before he does. "Aren\'t you a long way from anywhere."',
      "A lollipop stick shifts from one corner of his mouth to the other. He's leaning where he shouldn't be, doing nothing with real dedication.",
      '"Oh, I just run the odd errand around here," he says, easy as anything. "Anything you need, you only have to ask."',
      "The smile comes slow and lands just right, warm, unhurried, and a half-second too practiced.",
      '"Sweep\'s already done, don\'t mind me." He\'s leaning on the broom rather than using it. "Old habit. Hard to break."',
    ],
    known: [
      "\"Still tidying up. I don't have to anymore. Nobody's told my hands that.\"",
      '"You keep turning up," he says. "Most people don\'t."',
      "The charm's still running, just dialed down to something that costs him less.",
      'He hands you a soda he bought "for the dorm" and doesn\'t make anything of it.',
      'He\'s holding something wrapped in cloth that\'s the wrong shape for a parcel. "Shion asked me to mind it. Wouldn\'t look, if I were you."',
      "He skips his usual hedging and just tells you plainly. Progress, apparently.",
    ],
    warm: [
      'The easy smile goes real for a second. "Seeing you makes my day. Plain and simple, no angle on it."',
      '"Jo\'s had me running errands since sunup. Sit with me a spell. I\'ve earned it, and so have you."',
      '"Shion wants nagashi somen, so I\'m setting up the bamboo. Slow work. Stay a while?"',
      "He looks tired tonight, candy set aside for once, and doesn't trouble himself to hide it from you.",
      '"You\'re harder work than most," he says, and sounds glad of it.',
      '"Something smells like jambalaya out of the living tent. Jo\'s got dinner tonight. Come eat with us."',
    ],
    spark: [
      "He takes the sucker out of his mouth and, for once, doesn't reach for a line to fill the quiet.",
      "He tips your chin up with two fingers and forgets to make a joke of it.",
      '"I\'ve run clean out of angles with you," he says. "That\'s a first."',
      "He's done playing the long game. What's left is a good deal more direct.",
      "He holds the door, then leans across it, then grins at his own foolishness.",
      '"Come here. I\'m done being clever about it."',
    ],
    close: [
      '"Wasn\'t planning on caring about anybody," he admits, quiet. "You went and changed that."',
      "The lollipop stays in his pocket. He's got nothing to keep your eyes busy with, and doesn't want one.",
      '"Ask me anything," he says. "I\'ll even tell you true. Novel, isn\'t it."',
      "He says your name without any of his usual polish. It sounds like a different man saying it.",
      "For once he lets you see how much of the easy charm was armor.",
      '"My true self?" The old deflection starts up, then stalls. "...You\'ve seen most of it by now. Don\'t go telling anyone."',
    ],
    bound: [
      "No angles, no coin, no charm. Just him, which turns out to be the dangerous part.",
      "He says your name in the dark, unhurried, and it is genuinely unfair.",
      '"Spent years being nobody\'s," he says, low. "Turns out I\'m yours. Who\'d have thought."',
      "He kisses slow, like a man with nowhere pressing to be and no wish to be anywhere else.",
      "He's quit performing altogether. It cost him something. He'd pay it twice.",
      '"Hope this quiet lasts," he says into your hair. "First time I\'ve wanted something to."',
    ],
  },
  temperamentDialogue: {
    new: [
      '"Well, now. New face around here?"',
      '"Everything in Dionysia costs something. Your first favor\'s on the house, though. Call it a welcome."',
      '"Thought I\'d take a slow walk around campus. Doing my part to stay healthy."',
      "\"You've got good instincts. Stick close and they'll keep you out of trouble around here.\"",
      "\"Oh, I just handle the odd errand around here. So if there's anything you need, don't be shy.\"",
    ],
    known: [
      '"Well. If it isn\'t the persistent one."',
      "\"Sorry. I'm a touch short on time. Would you mind if I took my leave here?\"",
      '"Sit, if you like. Nowhere I\'ve got to be. Never is, lately."',
      '"You listen more than you talk. Rare thing, that. I could get used to it."',
      '"Careful now, I\'m starting to expect you."',
    ],
    warm: [
      '"Well, hello there. Seeing you always makes my day."',
      '"Back for more? Keep it up and I\'ll think you like me."',
      '"Sit down. I\'ll behave. Mostly."',
      '"Everyone\'s in good spirits today. Here\'s hoping this quiet holds a good long while."',
      '"Been running errands for Jo all morning. Walk slow with me a minute?"',
    ],
    spark: [
      "\"Now, I've been real patient. I'd like that noted.\"",
      '"No coin, no trick, no angle. Just me asking. Say yes or say no."',
      '"You look at me like you\'ve already decided. Have you?"',
      "\"I'd behave, but you don't seem to want me to.\"",
      '"Come here. I\'ve stopped being clever about it."',
    ],
    close: [
      '"You\'ve gone and become my favorite person in this place. Figured you should know."',
      '"No tricks tonight. Just me. Try not to look so surprised."',
      '"I\'ve lied to everyone in this house. Not to you. Not once that mattered."',
      '"Stay a while, would you? The quiet\'s easier with you in it."',
      '"I used to be someone here. With you I don\'t have to be anyone."',
    ],
    bound: [
      '"Come back to bed. Everything else can wait on us."',
      '"I love you. No trick in it. Check my hands if you like."',
      '"Say my name like that again. Slower."',
      "\"Got nothing left to hide behind. Suits me fine.\"",
      '"Stay. I\'ll make it worth the morning."',
    ],
  },
  approach: {
    new: [
      "Take the free favor",
      "Play along",
      "Ask about the odd jobs",
      "See what it'll cost",
    ],
    known: [
      "Sit a spell",
      "See through it anyway",
      "Pass his little test",
      "Turn up again",
    ],
    warm: [
      "Take the offered hand",
      "Sit a while with him",
      "Call the charm out",
      "Ask how he really is",
    ],
    spark: ["Come here", "Make up your mind", "Lean in the doorway too", "Say yes"],
    close: [
      "Sit a while with him",
      "Ask him for the truth",
      "Say his name plain",
      "Stay through the quiet",
    ],
    bound: [
      "Come back to bed",
      "Check his hands",
      "Say it slower",
      "Stay",
    ],
  },
  responses: {
    kind: {
      new: [
        "Tell him to slow down",
        "Thank him and mean it",
        "Notice he looks tired",
      ],
      spark: [
        "Tell him to stop angling",
        "Take his hand",
        "Say yes, gently",
      ],
      close: [
        "Ask what he's really after",
        "Tell him the act can come off",
        "Say you liked him anyway",
      ],
      bound: ["Say it back", "Take his hands", "Tell him he's someone's now"],
    },
    playful: {
      new: [
        "Enjoy the show he's putting on",
        "Pretend the charm's working",
        "Play the charm right back",
      ],
      spark: [
        "Make him be patient longer",
        "Turn his own line back on him",
        "Make him work for the yes",
      ],
      close: [
        "Play his game back",
        "Catch him in a half-truth",
        "Out-charm him",
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
        "Name what you both know",
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
  // The /call reveal lines for this character, keyed by the register in
  // WINNER_LINE_BUCKETS (constants/publicEncounters.js). Picked from at random
  // like the dialogue; {user} is the winner's mention and {name} their full
  // name, and the embed's winner line is the only place the reveal names
  // either of them. A register left out here falls back to the generic
  // WINNER_LINES pool.
  winnerLines: {
    new: [
      '"Well, now." His careful courtesy reaches {user} a good second before **{name}** does.',
      "{user} says the name, and **{name}** shifts the lollipop to the other cheek. \"Aren't you something.\"",
      "**{name}** had been leaning where he shouldn't be. He straightens up for {user}, slowly.",
    ],
    warm: [
      '"Seeing you makes my day. No angle on it." **{name}** means it, and {user} can tell.',
      "{user} calls out, and **{name}** puts down whatever errand Jo sent him on.",
      "**{name}** offers {user} a candy before he offers a hello.",
    ],
    spark: [
      '"Keep that up and I\'ll think you like me." **{name}** says it to {user}, unhurried as ever.',
      "{user} says the name, and **{name}**'s easy smile goes real for a second.",
      "**{name}** takes his time getting to {user}. He takes his time about everything.",
    ],
    close: [
      '"Can\'t sleep either?" **{name}** falls in beside {user} like the errand never existed.',
      "**{name}** drops the charm the moment it's {user}, which is the dangerous part.",
      "{user} calls, and **{name}** stops working the room entirely.",
    ],
    bound: [
      '"Spent years being nobody\'s," **{name}** tells {user}, low. "Turns out I\'m yours."',
      "**{name}** says {user}'s name back, unhurried, and it is genuinely unfair.",
      "{user} says the name, and **{name}** lets the **{house}** errands rot where they stand.",
    ],
  },
};
