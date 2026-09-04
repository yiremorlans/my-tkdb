export default {
  // The level-up DMs (docs/bond-scene-dms.md). One of the six volatile
  // characters — see docs/negative-affinity-enemies-to-lovers.md. Taiga never
  // gets nice; he gets specific. The engine of the whole ladder is the
  // time-slipping stigma: he loses people and places, and the intimacy is the
  // increasingly desperate machinery he builds to keep hold of one person.
  // "Kitten" and "dumbass" stay in to the last line.
  bondScenes: {
    acquaintance: {
      beats: [
        '**{firstName}**: "oi. kitten."\n\n"this is Taiga. writing it down so I know it\'s me later. long story."',
        "\"Here's the deal. I've got your name on a bit of paper in my pocket. Been there about a month.\"\n\n\"Every time I find it I have to sit there for a second and work out who you are, and then I do, and then I'm in a good mood about it, which is a stupid thing for a bit of paper to do.\"\n\n\"{timesMet} times you've turned up. That's from Lulu, not from me. I don't have the number, I've got the paper. Gyahaha.\"",
      ],
      choice: {
        prompt: '"So. Say something worth writing down, dumbass."',
        options: [
          {
            key: "kind",
            label: "Say you'll keep turning up",
            style: 3,
            close:
              "\"Yeah, they all say that.\"\n\nA pause.\n\n\"...Right. Writing it on the paper. If you don't turn up I'm going to look like an idiot to myself and I'll never know why. That's your problem now.\"",
          },
          {
            key: "playful",
            label: "Ask what else is on the paper",
            style: 1,
            close:
              '"None of your business."\n\n"It\'s a room number, a debt, and your name. In that order. Don\'t read anything into the order, the order\'s garbage."',
          },
          {
            key: "bold",
            label: "Ask why he wrote you down",
            style: 4,
            close:
              "There's a longer gap than he'd ever admit to.\n\n\"'Cause I forgot you once and it was annoying.\"\n\n\"That's it. That's the whole reason. Don't make it a thing, kitten, I hate it when things get made into things.\"",
          },
        ],
      },
      keepsake: {
        emoji: "🃏",
        line: "A scrap of paper in a coat pocket with your name third on it.",
      },
    },

    friend: {
      beats: [
        '**{firstName}**: "right. noticed something and it\'s messing with my head."',
        "\"You come at me with {favResponse} every single time. Doesn't matter what mood I'm in, doesn't matter if I've been a prick, doesn't matter if I've had to ask your name again.\"\n\n\"That last one's the bit. Everyone changes after that. They go careful, or they go sad about it, or they start explaining who they are before I've asked, which is the worst one.\"\n\n\"You just carry on like it never happened. Every time. Like it's nothing.\"",
      ],
      choice: {
        prompt: "\"So what's your angle. Everyone's got an angle.\"",
        options: [
          {
            key: "kind",
            label: "Say it isn't a big deal",
            style: 3,
            close:
              '"It is a big deal."\n\nA pause.\n\n"...Keep saying it isn\'t though. It\'s easier when someone says it isn\'t."',
          },
          {
            key: "playful",
            label: "Say you'll start charging him",
            style: 1,
            close:
              "\"Gyahaha! Get in line, kitten, Lulu's got first claim on everything I've got.\"\n\n\"Put it on the tab. I like knowing there's a tab. Means there's a next time on it.\"",
          },
          {
            key: "bold",
            label: "Tell him to just ask",
            style: 4,
            close:
              "\"I hate asking.\"\n\n\"Every time I ask I watch somebody's face do the math on how much of them I've lost. It's the worst two seconds there is.\"\n\n\"...Your face doesn't do it. That's the actual thing I was getting at and I've taken four messages to get there like a dickhead.\"",
          },
        ],
      },
      keepsake: {
        emoji: "🎲",
        line: "A tab with no amount on it, just the promise of a next time.",
      },
    },

    closeFriend: {
      beats: [
        '**{firstName}**: "come up to the floor after close. not the tables. the office."',
        "The office is a mess and there is a corkboard on the back wall that is not a mess at all. It is the only organized thing in the building.\n\nIt is covered in paper. Names, places, times, a lot of them in his own handwriting getting steadily worse down the years.\n\n\"That's the whole system. That's everything I've had to nail down 'cause I couldn't keep it in my head.\"",
        "He points at the top left, which is neat and old and faded.\n\n\"Mom. That's from when I still thought I could win it back.\"\n\nThen he points at the bottom right, where there are eleven notes about the same person, in eleven different pens, over what is clearly months.\n\n\"That's you. Eleven. Lulu's the only other person on this board more than twice and he's on it 'cause he pays me.\"",
      ],
      choice: {
        prompt:
          '"Go on then. Say the sad thing. Everyone says the sad thing when they see the board."',
        options: [
          {
            key: "kind",
            label: "Say eleven isn't enough",
            style: 3,
            close:
              'He actually stops.\n\n"...What?"\n\nYou say it again.\n\n"Right." He takes a pen out. He writes a twelfth one, right there, while you\'re standing in the room, and pins it up without looking at you.\n\n"Don\'t say anything. Get out. Come back tomorrow."',
          },
          {
            key: "playful",
            label: "Read one of them out loud",
            style: 1,
            close:
              '"Don\'t..."\n\nToo late. It says, in handwriting that got away from him halfway: *the one who doesn\'t do the face. keep this one.*\n\nThere\'s a very long silence.\n\n"Gyahaha," he says, entirely without conviction. "Yeah. Alright."',
          },
          {
            key: "bold",
            label: "Ask him to write one now",
            style: 4,
            close:
              '"About what."\n\nYou tell him what. He looks at you for a good while, then writes it, slowly, properly, the best handwriting on the whole board, and pins it dead center where the light hits.\n\n"There," he says. "That one\'s not going anywhere. I don\'t care what my head does."',
          },
        ],
      },
      keepsake: {
        emoji: "📌",
        line: "The twelfth note on a corkboard, written while you were standing there.",
      },
    },

    confidant: {
      beats: [
        '**{firstName}**: "lost four days. found out an hour ago. don\'t come up."',
        "\"Lulu's had to run the floor. He's not said a word about it, which means he'll say something about it in about a month when I've forgotten to be grateful.\"\n\n\"Four days. Wednesday to Sunday. I've got nothing. Not fuzzy. Nothing. Somebody's moved a chair in my office and I've been staring at it for an hour like it's going to explain itself.\"",
        "\"Here's the thing nobody gets about it. It doesn't hurt. That's what people expect. It doesn't hurt at all.\"\n\n\"It's that one day it'll be the board and nothing else. Just paper. Just a bloke reading about his own life off a wall and taking somebody else's word for all of it.\"\n\n\"And you're on that wall twelve times, kitten, and I've spent this whole hour working out whether that's a good thing to have done to you.\"",
      ],
      choice: {
        prompt: "\"Say it straight. Don't be nice about it, I'll know.\"",
        options: [
          {
            key: "kind",
            label: "Say you'd tell him about you",
            style: 3,
            close:
              'There\'s nothing for a long time.\n\n"Every time?"\n\nYou say yes.\n\n"...Every time. Right."\n\nThen: "come up. I said don\'t and now I\'m saying do, and I\'m not explaining the change."',
          },
          {
            key: "playful",
            label: "Say you moved the chair",
            style: 1,
            close:
              '"YOU MOVED THE..."\n\nA pause. Then a noise that is almost the laugh.\n\n"Gyahaha. You dickhead. Right. One mystery down."\n\n"...Don\'t do that again. Actually do. It was the best hour I\'ve had since Wednesday."',
          },
          {
            key: "bold",
            label: "Say the board isn't the point",
            style: 4,
            close:
              "\"It's the only point I've got.\"\n\nThen, four minutes later:\n\n\"Explain that. Properly. I'm not being funny, kitten, I want the actual argument, 'cause I've had this one with myself for six years and I keep losing it.\"\n\nYou give him the argument. He doesn't concede. But he asks you to say it again the next week, and the week after.",
          },
        ],
      },
      keepsake: {
        emoji: "🪑",
        line: "A chair moved four inches, and the hour he spent staring at it.",
      },
    },

    devoted: {
      beats: [
        "**{firstName}**: \"don't be in the lower halls tonight. that's not me asking.\"",
        "\"There's a thing down there and Lulu's put a price on it and I'm going to go and collect, 'cause that's the job and I'm hungry and it's honestly a nice night for it.\"\n\n\"You're not coming. Before you start.\"",
        "\"Here's why, and I'm only saying it once so read it properly.\"\n\n\"I don't know what I do down there. Not always. Sometimes I come back up and there's an hour gone and Lulu won't look at me.\"\n\n\"I've got no idea what I'd be like with you standing in the middle of it. And I'm not finding out. That's the one experiment I'm not running, and if you turn up anyway I swear on the board I'll never speak to you again.\"",
      ],
      choice: {
        prompt: '"Say you\'ll stay out of it. Say it so I can go."',
        options: [
          {
            key: "kind",
            label: "Say you'll stay put",
            style: 3,
            close:
              '"Good."\n\nNothing for three hours.\n\nThen, at half four: "done. all fine. counted the hour and it\'s all there."\n\nAnd then, much later, when he thinks you\'ve gone to sleep: "was thinking about the paper the whole way down. that\'s never happened before. it\'s usually nothing down there."',
          },
          {
            key: "playful",
            label: "Ask what's on the menu",
            style: 1,
            close:
              "\"Gyahaha! That's my girl... that's my...\"\n\nA pause where he clearly reconsiders the sentence and then decides not to fix it.\n\n\"Something with too many legs. I'll tell you if it's any good.\"",
          },
          {
            key: "bold",
            label: "Refuse to promise",
            style: 4,
            close:
              "\"Don't.\"\n\nIt's the only time he has ever sent you a single word.\n\n\"Kitten. Don't. I've got about four things left that I'm sure of and you're all of them, and I'm not putting one of them in a corridor to find out what I am.\"\n\n\"...Promise me. Please. That's the first time I've used that word in about nine years.\"",
          },
        ],
      },
      keepsake: {
        emoji: "📩",
        line: "The one word he sent alone, and the one he'd not used in nine years.",
      },
    },

    soulbound: {
      beats: [
        "**{firstName}**: \"office. now. I'm not typing this one out, I'll lose it halfway.\"",
        'The board has been rebuilt. Everything else is gone: the debts, the room numbers, the rest of it in a box on the floor.\n\nIt is all you. {timesMet} notes, one for every single time, in eleven different pens.\n\n"Took me two days. Lulu thinks I\'ve cracked."',
        "\"Here's the thing I've never said out loud to anybody, so shut up for a minute.\"\n\n\"I don't get to keep things. That's not me being dramatic, that's just the arrangement: people go through me and out the other side and I get a bit of paper out of it if I'm quick. I've been fine with that. Honestly fine. Bored of people anyway, mostly.\"\n\n\"And then you turned up and I started writing things down before I needed to. Not after I'd forgotten. *Before.* Like I was frightened of it for the first time in six years.\"",
        'He points at the middle of the board, at the one in the good handwriting.\n\n"That one says I love you. Been there since March. I wrote it for me, not for you, so that whatever happens up here, some version of me walks in one morning and reads it and knows."\n\n"So that\'s it. That\'s the whole thing, kitten, and I\'ve said it in the worst possible way, off a wall, like a dumbass."',
      ],
      choice: {
        prompt: '"Go on. Whatever it is. I\'ve read worse off this board."',
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close:
              'He doesn\'t say anything for a long moment. Then he takes the pen out again and holds it out to you, handle first.\n\n"Write it. Your handwriting, not mine."\n\nAnd when you have, and it\'s pinned up next to his, he looks at the two of them together for a while, and then just picks you up off the floor entirely, one arm, no warning, the way he does everything, and holds on.\n\n"Now it\'s on the wall," he says into your hair. "Now it\'s true even when I\'m not."',
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close:
              "\"Yeah.\"\n\nNo argument, which from him is unheard of.\n\n\"Board stays up either way. That's not pressure, kitten, that's just... I need it up there. It's not for you, it's for whoever I am in the morning.\"\n\nHe puts the pen away.\n\n\"Take as long as you want. And keep turning up, 'cause I'll still ask your name some days and I'd rather ask you than read you.\"",
          },
        ],
      },
      keepsake: {
        emoji: "📍",
        line: "A note in the middle of the board that's been there since March.",
      },
    },
  },
  dialogue: {
    new: [
      'He eyes you with a challenging smirk, cards deftly shuffled in his hands. "You lost, kitten?"',
      "The cards keep moving. So does the grin. Neither is friendly, exactly.",
      '"Huh. You\'ve got guts walking in here. Stupid ones, but guts."',
      "He kicks a chair out, not toward you, just near you. Interpret it however you like.",
      '"Who the fuck are you again?" He squints. "...Whatever. Sit down."',
    ],
    known: [
      '"Kitten" has stuck. He\'s stopped bothering to make it sound like an insult.',
      "He deals you in without asking, and doesn't explain the rules. Figure it out.",
      "He kicks the chair out properly this time, in your direction.",
      '"Do I know you? ...Right. Kitten. Course I do." The stigma ate a few days again.',
      "The smirk stays. The edge on it has gone somewhere else.",
    ],
    warm: [
      "His aggressive posture softens when he sees you're really there. He pulls out a seat beside him without a word.",
      "He calls you an idiot. He deals you in anyway. Same thing, from him.",
      '"Took your damn time," he says, having very obviously held the seat.',
      'He\'s eating something charred off a skewer. "You wanna know what kind of meat this is? Anomaly meat, what else? ...Want some?"',
      "The whole table gets quieter when he's talking to you. He hasn't noticed.",
    ],
    spark: [
      "He hooks a finger in your collar to pull you down to his level, grinning.",
      '"Kitten," he says, and this time it isn\'t a jab at all.',
      "He wins the hand, sweeps the pot, and puts his arm across the back of your chair.",
      "He gets close enough to make a point and then forgets what the point was.",
      "The insults have gone soft around the edges. He'd fight you for saying so.",
    ],
    close: [
      '"You\'re the only one I\'d ever go all-in for," he says roughly, pulling you close. "Don\'t make me regret it."',
      "He puts his hand on the back of your chair. Just there. It stays.",
      '"Don\'t do anything stupid," he growls, which is his entire vocabulary for worry.',
      "He folds a winning hand because you looked tired and he wanted to leave.",
      "The bravado is completely transparent now, and he's stopped trying to fix that.",
    ],
    bound: [
      "He's rough with everyone and unspeakably careful with you, and hates being caught at it.",
      "He pulls you into his lap mid-hand and the whole table pretends not to notice.",
      '"Love you, kitten," he growls, daring you to make something of it.',
      "He falls asleep with an arm across you like a bar across a door.",
      '"Kitten" has become the softest word in his entire vocabulary and he knows it.',
    ],
  },
  temperamentDialogue: {
    new: [
      "\"Who're you? Don't pop up out of nowhere like that.\"",
      '"Hah! Look at this one. You gonna cry, kitten?"',
      '"Sit or scram. I don\'t care which, just pick."',
      '"You got money? No? Then you got nothin\' I want. Probably."',
      "\"Heads or tails, even or odd, on or off... It's all so fucking tedious! ...Oh. You're real. Hey.\"",
    ],
    known: [
      '"Oh, it\'s the kitten. Sit down before you embarrass yourself standing."',
      '"You know the rules yet? No? Tch. Watch, then."',
      "\"You keep coming back. Either you're broke or you're lonely.\"",
      "\"Don't bet what you can't lose. Free advice. Only one you get.\"",
      '"Playing with these morons is exhausting... Lulu gets all mad if I win too much. Sit. You\'re better company."',
    ],
    warm: [
      '"...So you came back, kitten?"',
      '"Sit down, dumbass. Seat\'s already out."',
      '"You\'re late. Not that I was waiting. Shut up."',
      '"Here. Drink it. Don\'t make a thing out of it."',
      "\"This is boring. I'm outta here. ...Something smells amazing. C'mon, we're getting food. Ciao, losers.\"",
    ],
    spark: [
      "\"C'mere. Closer. I'm not gonna bite. Probably.\"",
      '"You keep looking at me like that, kitten, something\'s gonna happen."',
      '"Sit on my side of the table. I don\'t care how it looks."',
      "\"Hah! You're blushing. Good. Now we're even.\"",
      "\"I'd bet the whole damn house on you. Don't make me say it sober.\"",
    ],
    close: [
      "\"Don't you dare go getting hurt. That's MY job to protect you. Gyahaha!\"",
      '"Get over here. Closer. I\'m not asking twice."',
      "\"I'd bet everything on you, kitten. Everything. Don't let it go to your head.\"",
      "\"You look tired. We're leaving. No, I don't care about the hand.\"",
      '"Anybody touches you, they answer to me. That\'s the deal. Always was."',
    ],
    bound: [
      "\"Get over here. On my lap. I don't care who's watching.\"",
      '"Love you. Yeah. Said it. What\'re you gonna do about it?"',
      '"Stay the night. Whole night. Don\'t make me ask twice, kitten."',
      "\"You're the only bet I'd never hedge. Ever.\"",
      '"Come back to bed. The game\'ll still be rigged in the morning."',
    ],
  },
  approach: {
    new: [
      "Take the kicked-out chair",
      "Smirk right back",
      "Ask to be dealt in",
      "Don't flinch",
    ],
    known: [
      "Sit before he says it twice",
      "Get dealt in",
      "Take the free advice",
      "Watch the hand",
    ],
    warm: [
      "Take the held seat",
      "Call him a dumbass back",
      "Take the drink",
      "Sit down and play",
    ],
    spark: [
      "Get closer",
      "Sit on his side",
      "Look at him like that",
      "Let him pull you down",
    ],
    close: [
      "Get over there",
      "Go all-in",
      "Let him pull you close",
      "Tell him to fold",
    ],
    bound: [
      "Get over there",
      "Sit in his lap",
      "Stay the night",
      "Make something of it",
    ],
  },
  responses: {
    kind: {
      new: [
        "Be kind despite his bark",
        "Thank him for the seat",
        "Ignore the insult entirely",
      ],
      spark: [
        "Let the softness show",
        "Say kitten back",
        "Tell him he's already won",
      ],
      close: [
        "See past the snarl",
        "Tell him you worry too",
        "Take the bet off his shoulders",
      ],
      bound: ["Say it back", "Let him be careful", "Call him kitten too"],
    },
    playful: {
      new: [
        "Trade insults with him",
        "Call him kitten back",
        "Cheat, badly, on purpose",
      ],
      spark: [
        "Make him blush first",
        "Cheat where he can see",
        "Call the bluff",
      ],
      close: [
        "Be the one who can rile him",
        "Beat him at his own table",
        "Laugh in his face fondly",
      ],
      bound: [
        "Make something of it",
        "Ruin his hand",
        "Say it in front of the table",
      ],
    },
    bold: {
      new: [
        "Meet his challenge head-on",
        "Raise the stakes",
        "Sit without being invited",
      ],
      spark: [
        "Sit on his side",
        "Pull him down instead",
        "Make something happen",
      ],
      close: [
        "Go all-in with him",
        "Tell him you're his bet",
        "Grab his collar first",
      ],
      bound: [
        "Climb into his lap",
        "Say it first",
        "Tell him he's your bet too",
      ],
    },
    neutral: {
      new: [
        "Let him posture",
        "Play your hand quietly",
        "Say nothing and stay",
      ],
      spark: ["Play the hand out", "Stay on your side", "Let him posture"],
      close: [
        "Let the bravado run out",
        "Sit through the losing hand",
        "Keep him company in silence",
      ],
      bound: ["Play the hand out", "Let him growl", "Say nothing"],
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
      '"Huh." **{name}** looks {user} over. "You got guts, kitten. Stupid ones, but guts."',
      '{user} says the name, and **{name}** grins around it. "Do I know you? ...Whatever. C\'mere."',
      '"You lost, kitten?" **{name}** asks {user}, shuffling the whole time.',
    ],
    warm: [
      '"Took your damn time." **{name}** had very obviously been waiting on {user}.',
      "{user} calls out, and **{name}** kicks a chair out in their direction.",
      "**{name}** calls {user} a dumbass and deals them in. Same thing, from him.",
    ],
    spark: [
      '"Kitten." **{name}** says it to {user}, and this time it isn\'t a jab at all.',
      "{user} says the name, and **{name}** folds a hand he was winning.",
      "**{name}** hooks a finger in {user}'s collar to pull them down to his level, grinning.",
    ],
    close: [
      '"Anybody touches you, they answer to me." **{name}** tells {user} that was always the deal.',
      "**{name}** hears {user}, and everyone else stops existing.",
      "{user} calls, and **{name}** walks away from a bet he was about to win.",
    ],
    bound: [
      '"Love you, kitten," **{name}** growls, daring {user} to make something of it.',
      "**{name}** pulls {user} in right there in the open, and the passers-by pretend not to notice.",
      "{user} says the name, and **{name}**, who loses whole days, remembers exactly this.",
    ],
  },
};
