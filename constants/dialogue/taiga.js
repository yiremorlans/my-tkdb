export default {
  // The level-up DMs (docs/bond-scene-dms.md). One of the six volatile
  // characters — see docs/negative-affinity-enemies-to-lovers.md. Taiga never
  // gets nice; he gets specific. The engine of the whole ladder is the
  // time-slipping stigma: he loses people and places, and the intimacy is the
  // increasingly desperate machinery he builds to keep hold of one person.
  // "Kitten" and "dumbass" stay in to the last line.
  //
  // Texting voice, per reference.md's "## Bond Scenes" notes: lowercase, one
  // short sentence per line (no paragraphs), and "u"/"ur", "k", "yea", "lol".
  // "Gyahaha!" is still his. In-person `> ` speech and narration keep normal
  // punctuation.
  bondScenes: {
    acquaintance: {
      beats: [
        "**{firstName}**: oi. kitten.\n\nthis is Taiga.\n\nwriting it down so I know it's me later.\n\nlong story.",
        "here's the deal.\n\nur name's on a scrap of paper in my pocket.\n\nthird one down, under a room number and a debt.\n\nevery time I find it I gotta work out who the hell u are.\n\nthen I remember.\n\nthen I stop caring why.\n\n{timesMet} times now.\n\nthat's Lulu's count, not mine.\n\nI just got the paper. Gyahaha!",
      ],
      choice: {
        prompt: "so. say something worth writing down, dumbass.",
        options: [
          {
            key: "kind",
            label: "Say you'll keep turning up",
            style: 3,
            close:
              "yea, they all say that.\n\n…writing it down anyway.\n\ndon't turn up, I'll feel like an idiot when I read this back.\n\nur problem now.",
          },
          {
            key: "playful",
            label: "Ask what else is on the paper",
            style: 1,
            close:
              "none of ur business.\n\nroom number, a debt, ur name.\n\ndon't read into the order.",
          },
          {
            key: "bold",
            label: "Ask why he wrote you down",
            style: 4,
            close:
              "*A longer gap than he'd ever admit to.*\n\nforgot u once.\n\nannoyed me.\n\nthat's the whole reason.\n\ndon't make it a thing, kitten.",
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
        "**{firstName}**: hey.\n\nnoticed something and I don't like it.",
        "u keep coming back with {favResponse}. every time.\n\ndoesn't matter what mood I'm in, doesn't matter if I forgot ur name an hour before.\n\nused to flinch when I pulled my gun too. everyone does, it's funny.\n\nu quit flinching a while back. sit closer than u used to. talk first instead of waiting for me to work out who u are.\n\nso that's what's stuck. figure it's on u to explain it to me.",
      ],
      choice: {
        prompt: "everyone's running something. what's urs.",
        options: [
          {
            key: "kind",
            label: "Say there's no angle",
            style: 3,
            close:
              "no angle, huh\n\ndon't jinx it, kitten. odds are bad enough as is.",
          },
          {
            key: "playful",
            label: "Ask if he's keeping count",
            style: 1,
            close:
              "gyahaha! course I'm keeping count, what, u think I do this for free?\n\nkeeping receipts, kitten. everyone pays eventually",
          },
          {
            key: "bold",
            label: "Ask what his angle is",
            style: 4,
            close:
              "since when do I explain myself?\n\n…keep coming at me like that, I'll start asking for more than answers.",
          },
        ],
      },
      keepsake: {
        emoji: "🔫",
        line: "The flinch you don't do anymore, and he can't stop noticing.",
      },
    },

    closeFriend: {
      beats: [
        "**{firstName}**: come up to the floor after close.\n\nnot the tables.\n\nthe office.",
        "*The office is a mess. The corkboard on the back wall isn't. Only organized thing in the building.*\n\n*Covered in paper. Names, places, times, his handwriting getting worse down the years.*\n\n> That's the system. Everything I couldn't keep in my head.",
        "*He points top left. Neat, old, faded.*\n\n> First one I ever pinned. Back when I still thought I could out-play this thing. Keep enough notes, never lose a hand.\n\n*Bottom right: eleven notes, same person, eleven pens, months apart.*\n\n> You. Eleven. Lulu's the only other one with more than two, and he pays me.",
      ],
      choice: {
        prompt:
          "Go on then. Say the sad thing. Everyone says the sad thing when they see the board.",
        options: [
          {
            key: "kind",
            label: "Say eleven isn't enough",
            style: 3,
            close:
              "*He stops.*\n\n> ...What?\n\n*You say it again.*\n\n> Right.\n\n*He pulls out a pen. Writes a twelfth one right there, pins it without looking at you.*\n\n> Don't say anything. Get out. Come back tomorrow.",
          },
          {
            key: "playful",
            label: "Read one of them out loud",
            style: 1,
            close:
              "> Don't...\n\n*Too late. It says, handwriting getting away from him halfway:* \"the one who doesn't do the math. keep this one.\"\n\n*Long silence.*\n\n> Gyahaha,\n\n*no conviction behind it.*\n\n> Yeah. Alright.",
          },
          {
            key: "bold",
            label: "Ask him to write one now",
            style: 4,
            close:
              "> About what.\n\n*You tell him. He looks at you a while, then writes it slow, best handwriting on the board, pins it dead center.*\n\n> There,\n\n*he says.*\n\n> Not going anywhere. Don't care what my head does.",
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
        "**{firstName}**: lost four days.\n\nfound out an hour ago.\n\ndon't come up.",
        "Lulu ran the floor.\n\nhasn't said a word.\n\nmeans he'll bring it up in a month, when I've forgot to be grateful.\n\nfour days gone.\n\nwednesday to sunday.\n\nnothing.\n\nsomebody moved a chair in my office and I've been staring at it an hour like it'll explain itself.",
        "thing nobody gets: it doesn't hurt.\n\npeople expect it to. it doesn't.\n\nit's that one day it's just the board. paper. some guy reading his own life off a wall, taking somebody else's word for it.\n\nur on it twelve times, kitten.\n\nspent the hour working out if that's a good thing to have done to u.",
      ],
      choice: {
        prompt: "say it straight. don't be nice about it, I'll know.",
        options: [
          {
            key: "kind",
            label: "Say you'd tell him about you",
            style: 3,
            close:
              "*Nothing for a long time.*\n\nevery time?\n\n*You say yes.*\n\n…every time.\n\nright.\n\n*Then:* come up.\n\nsaid don't, now I'm saying do.\n\nnot explaining the switch.",
          },
          {
            key: "playful",
            label: "Say you moved the chair",
            style: 1,
            close:
              "U MOVED THE…\n\n*A pause. Then something close to a laugh.*\n\nGyahaha.\n\ndickhead.\n\none mystery down.\n\n…don't do it again.\n\nactually, do.\n\nlol best hour I've had since Wednesday.",
          },
          {
            key: "bold",
            label: "Say the board isn't the point",
            style: 4,
            close:
              "it's the only point I've got.\n\n*Four minutes later:*\n\nexplain that.\n\nproperly.\n\nnot messing with u, I want the actual argument.\n\nbeen losing it to myself for years.\n\n*You give him the argument. He doesn't fold. But he asks again next week. And the week after.*",
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
        "**{firstName}**: don't be in the lower halls tonight.\n\nthat's not me asking.",
        "there's a thing down there, Lulu's put a price on it.\n\nI'm collecting.\n\nthat's the job, I'm hungry, decent night for it.\n\nur not coming.\n\nbefore u start.",
        "here's why, once, so listen.\n\ndon't always know what I do down there.\n\ncome back up sometimes, an hour's gone, Lulu won't look at me.\n\nnot finding out what I'm like with u in the middle of it.\n\nturn up anyway, I swear on the board I'm done talking to u.",
      ],
      choice: {
        prompt: "say ur staying out of it. say it so I can go.",
        options: [
          {
            key: "kind",
            label: "Say you'll stay put",
            style: 3,
            close:
              "k.\n\n*Nothing for three hours.*\n\n*Half four:* done.\n\nall fine.\n\nhour's all there.\n\n*Later, thinking you're asleep:* thought about the paper the whole way down.\n\nnever happens down there.",
          },
          {
            key: "playful",
            label: "Ask what's on the menu",
            style: 1,
            close:
              "Gyahaha! that's my girl… that's my…\n\n*A pause where he clearly reconsiders the sentence and then decides not to fix it.*\n\nsomething with too many legs.\n\nI'll tell u if it's any good.",
          },
          {
            key: "bold",
            label: "Refuse to promise",
            style: 4,
            close:
              "don't.\n\n*Only time he's ever sent one word.*\n\nkitten.\n\ndon't.\n\ngot about four things left I'm sure of, ur all of them.\n\nnot putting one in a corridor to find out what I am.\n\n…promise me.\n\nfirst time I've said that in years.",
          },
        ],
      },
      keepsake: {
        emoji: "📩",
        line: "The one word he sent alone, and the one he'd not used in years.",
      },
    },

    soulbound: {
      beats: [
        "**{firstName}**: office.\n\nnow.\n\nI'm not typing this one out, I'll lose it halfway.",
        "*Board's been rebuilt. Debts, room numbers, the rest, gone, boxed on the floor.*\n\n*Just you left. {timesMet} notes, one for every time, eleven different pens.*\n\n> Took two days. Lulu thinks I've cracked.",
        "> Never said this out loud. Shut up a minute.\n\n> Don't get to keep things. People go through me and out the other side, I get a bit of paper if I'm quick. Fine with that. Mostly.\n\n> Then you turned up. Started writing things down before I forgot 'em. Before, not after. Like I was scared of it, for the first time in six years.",
        "*Points at the middle of the board. The good handwriting.*\n\n> Says I love you. Since March. Wrote it for me, not you. So whatever happens up here, some version of me reads it and knows.\n\n> That's it. Said it worst way possible. Off a wall. Like a dumbass.",
      ],
      choice: {
        prompt: "Go on. Whatever it is. I've read worse off this board.",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close:
              "*Doesn't say anything a moment. Takes the pen out, holds it out handle-first.*\n\n> Write it. Your writing, not mine.\n\n*Pinned up next to his, he looks at the two a while, then just picks you up off the floor, one arm, no warning, holds on.*\n\n> Now it's on the wall,\n\n*into your hair.*\n\n> True even when I'm not.",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close:
              "> Yeah.\n\n*No argument. Unheard of, from him.*\n\n> Board stays up either way. Not pressure. Just... need it up there. Not for you. For whoever I am in the morning.\n\n*Pen away.*\n\n> Take your time. Keep turning up. I'll still ask your name some days. Rather ask you than read you.",
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
      "He pulls the chair out with his hand this time, not his boot.",
      '"Do I know you? ...Right. Kitten. Course I do." The stigma ate a few days again.',
      "The smirk stays. The edge on it has gone somewhere else.",
      "Some days he needs half a second to place you. Never longer than that anymore.",
      '"You again, kitten," he says, like the word\'s just a fact now, not a jab.',
      "He starts dealing you a hand before you've even sat down.",
      "The mooks have stopped asking who you are. Taiga made sure of that.",
      '"Sit," he says. "You standing there\'s bad for my nerves."',
      "He starts saving you a bite of whatever he's eating, no matter how questionable it looks.",
      "He runs a side bet on when you'll show up. He's never once lost it.",
      '"Lulu\'s asking about you," he says. "Told him to mind his own. Don\'t make me start."',
    ],
    warm: [
      "His aggressive posture softens when he sees you're really there. He pulls out a seat beside him without a word.",
      "He calls you an idiot. He deals you in anyway. Same thing, from him.",
      '"Took your damn time," he says, having very obviously held the seat.',
      'He\'s eating something charred off a skewer. "You wanna know what kind of meat this is? Anomaly meat, what else? ...Want some?"',
      "The whole table gets quieter when he's talking to you. He hasn't noticed.",
      "He forgets more than he lets on. He never forgets to look for you first.",
      '"Eat something," he says, shoving half his plate over. Not a suggestion.',
      "He starts every game with your seat held, whether you're there yet or not.",
      "Lulu tried to move you to a different table once. Taiga vetoed it before he finished the sentence.",
      '"You\'re late," he says, not looking up. He\'d clearly been counting the minutes.',
      "He tells the mooks to knock it off before they've even started needling you.",
      "He wins a hand and slides half the pot your way like it's nothing.",
      '"Kitten\'s hungry," he announces to the table, already ordering for two.',
      "He forgets the day of the week more than once a month. He never forgets what you drink.",
      "He's put that gun in every mook's face at least once. Never yours, not even as a joke.",
      '"Don\'t wander off," he says. "Not an order. Just... don\'t."',
      "He blows an ugly amount of chips buying out every other seat at the table so nobody sits near you.",
      "He loses a hand on purpose so the night runs longer. He'd never admit that's why.",
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
      '"Oh, it\'s the kitten. Sit down before you embarrass yourself."',
      '"You know the rules yet? No? Tch. Watch, then."',
      "\"You keep coming back. Either you're broke or you're lonely.\"",
      "\"Don't bet what you can't lose. Free advice. Only one you get.\"",
      '"Playing with these morons is exhausting... Lulu gets all mad if I win too much. Sit. You\'re better company."',
      "\"Don't tell me your name again. I'll get it. Eventually.\"",
      '"Deal you in? Fine. Don\'t cry when you lose."',
      "\"The mooks like you. Weird. They don't like anybody.\"",
      '"You\'re still here. Guess that\'s something."',
      "\"Hungry? There's some anomaly meat left. Probably safe.\"",
      '"Lulu asked about you. Told him to mind his business."',
      "\"Gyahaha! You actually bluffed me. Rookie luck. I'll allow it, once.\"",
      "\"Last time I fired one off indoors, everyone bolted for the door. You ordered food.\"",
    ],
    warm: [
      '"...So you came back, kitten?"',
      '"Sit down, dumbass. Seat\'s already out."',
      '"You\'re late. Not that I was waiting. Shut up."',
      '"Here. Drink it. Don\'t make a thing out of it."',
      "\"This is boring. I'm outta here. ...Something smells amazing. C'mon, we're getting food. Ciao, losers.\"",
      "\"Eat. I don't care if you're not hungry. Eat anyway.\"",
      '"Told the mooks to back off you. They listened. Miracle."',
      "\"Forgot what day it is. Didn't forget you were coming, though.\"",
      '"Lulu tried to bench you from my table. Didn\'t happen."',
      "\"Sit closer. Table's crowded. ...Fine, it's not. Sit closer anyway.\"",
      "\"Won the hand. Here, it's yours. Don't make it weird.\"",
      '"Gyahaha! Easier to laugh with you around. Don\'t read into it."',
      '"Don\'t wander off. That\'s not me asking."',
      "\"Keep the gun away from you? Nah. Just means I keep it pointed everywhere else.\"",
      "\"You're still hungry? Course you are. Sit, I'll get you something.\"",
      '"Tipping my chair back. Only do that when you\'re around. Don\'t make it a thing."',
      "\"Folded a winning hand 'cause you looked tired. Don't get used to it.\"",
      '"Kitten\'s the only good bet at this table. Don\'t tell the others."',
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
      "{user} says the name, and **{name}** grins around it. \"Who're you? ...Whatever. C'mere.\"",
      '"You lost, kitten?" **{name}** asks {user}, shuffling the whole time.',
      '{user} says the name and **{name}** is already up, done with the table. "Yeah, yeah, smooth talker. Ciao!"',
    ],
    warm: [
      '"Took your damn time." **{name}** had been waiting on {user}.',
      "{user} calls out, and **{name}** kicks a chair out in their direction.",
      "**{name}** calls {user} a dumbass and deals them in.",
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
      "\"You're the one hand I'd never fold, kitten.\" **{name}** growls it at {user}, daring them to make something of it.",
      "**{name}** pulls {user} in right there in the open, and the passers-by pretend not to notice.",
      "{user} says the name, and it's the one thing **{name}** doesn't lose track of.",
    ],
  },
};
