export default {
  // The level-up DMs (docs/bond-scene-dms.md). Tohma is never off-balance and
  // never quite off-duty, so the intimacy is in what he lets slip on purpose:
  // each scene is a piece of information he chose to hand you, and the last one
  // is the first thing he has ever wanted for himself rather than for the house.
  bondScenes: {
    acquaintance: {
      beats: [
        '**{firstName}**: "Well, well. You are awake. I did wonder."\n\n"Forgive the hour. I keep unsociable ones, and I have found that people I write to at this hour tend to answer honestly."',
        "\"I make it a point to know a little about everyone who comes through this house. You will find that unnerving, and you would be right to.\"\n\n\"What I have on you, after {timesMet} occasions, is remarkably thin. You want nothing from anybody here. Do you know how rare that makes you, in a building full of people who all want the same three things?\"\n\n\"So this is not a file being opened. This is me putting the pen down, which I do rather less often.\"",
      ],
      choice: {
        prompt: "\"Now. Ask me something you would not ask me in daylight.\"",
        options: [
          {
            key: "kind",
            label: "Ask if he ever rests",
            style: 3,
            close: "\"Honestly. Of all the things you might have asked.\"\n\n*A pause.*\n\n\"No. Not in some years. You are the first person to enquire, and I find I do not have a prepared answer, which is unusual for me.\"",
          },
          {
            key: "playful",
            label: "Ask what's in his file",
            style: 1,
            close: "\"A great deal, and none of it flattering, and you shall never see a page of it.\"\n\n\"Well, well. Perhaps a page. Ask again when I am tired.\"",
          },
          {
            key: "bold",
            label: "Ask why he really wrote",
            style: 4,
            close: "*The reply is slower than any of the others.*\n\n\"Because it is three in the morning and everyone I look after is asleep, and it occurred to me that I have no one to write to.\"\n\n\"This conversation never happened. Good night.\"",
          },
        ],
      },
      keepsake: {
        emoji: "🫖",
        line: "A conversation that officially never happened.",
      },
    },

    friend: {
      beats: [
        '**{firstName}**: "An observation, offered without charge."',
        "\"You come at me with {favResponse} every time, and you have never once adjusted it for the room. Not for the captain, not for me, not for the fact that I could make your life here considerably easier or considerably otherwise.\"\n\n\"I want you to understand that I noticed that in the first week and have been waiting for it to stop. It has not stopped. I have run out of patience for waiting and have decided to simply tell you that I find it remarkable, which is a thing I do not say.\"",
      ],
      choice: {
        prompt: "\"Well? I have paid you a compliment. Those are not on the house.\"",
        options: [
          {
            key: "kind",
            label: "Thank him properly",
            style: 3,
            close: "\"Honestly. Nobody thanks me properly. They thank me the way one thanks a door for opening.\"\n\n\"...That was ungracious of me and you did not deserve it. Thank you for the thanks. I shall stop now before I say something with feeling in it.\"",
          },
          {
            key: "playful",
            label: "Ask what it'll cost you",
            style: 1,
            close: "\"Oh, very good.\" *There is genuine delight in it.* \"You have been paying attention.\"\n\n\"Nothing. That is the trouble: I have gone and given something away for nothing and now I shall have to think about why.\"",
          },
          {
            key: "bold",
            label: "Say you'd never adjust for him",
            style: 4,
            close: "*A long pause.*\n\n\"No. You would not.\"\n\n\"Do you know, I have spent eleven years being spoken to by people calculating what I might do to them. It is a great deal quieter over here. I had not realized how loud it was until you.\"",
          },
        ],
      },
      keepsake: {
        emoji: "♟️",
        line: "A chess piece he set down on your side of the board.",
      },
    },

    closeFriend: {
      beats: [
        '**{firstName}**: "Come to the second-floor landing tomorrow at eleven. Bring nothing and tell no one. I am aware how that reads."',
        "\"It is not a mission and you are not in trouble. It is a window.\"\n\n\"There is a spot on that landing where, at eleven, the light comes through the east glass and lies across the floor in a particular way for about nine minutes. Then it is gone until the next clear day.\"",
        "\"I have been standing in it alone for two years and telling nobody about it, because the moment a thing like that is known about it becomes a place people go, and then it is not that any more.\"\n\n\"You may consider that I have just handed over the only thing in this building that is mine. I would rather you did not make a great deal of it. I would rather you came.\"",
      ],
      choice: {
        prompt: "\"Say yes or no. I shall be perfectly composed either way; I am always perfectly composed.\"",
        options: [
          {
            key: "kind",
            label: "Tell him you'll be there",
            style: 3,
            close: "\"Good.\"\n\n*One word, and then nothing for the rest of the night, which from a man who writes in paragraphs is close to a shout.*\n\n*He is on the landing at ten to. He does not mention having been early and neither do you.*",
          },
          {
            key: "playful",
            label: "Ask if this is a date",
            style: 1,
            close: "\"Honestly.\"\n\n*A pause. A longer one than the joke warrants.*\n\n\"It is nine minutes of light on a floor. Call it whatever you find useful. I shall be there at eleven either way.\"",
          },
          {
            key: "bold",
            label: "Ask why you get to know",
            style: 4,
            close: "\"Because it stopped being enough on my own,\" *he writes, plainly, with none of the arrangement he usually puts round a sentence.*\n\n\"There. That is the honest answer and I shall deny having given it. Eleven o'clock.\"",
          },
        ],
      },
      keepsake: {
        emoji: "🪟",
        line: "Nine minutes of east light on a landing nobody else knows about.",
      },
    },

    confidant: {
      beats: [
        '**{firstName}**: "You will have heard the rumor about how our king came to be short of a friend. I would like you to hear the rest of it from me rather than from the version that is going round."',
        "\"They are not wrong that I benefited. They are not wrong that I was in a position to have arranged a good deal of it. Those two facts sitting beside one another have been enough for everybody for two years and I have never once corrected anyone.\"\n\n\"I let it stand because a house runs better on a vice-captain people are slightly afraid of. That is the whole strategy. It has worked beautifully and it has cost me every friendship I might otherwise have had here.\"",
        "\"I am not asking you to believe me. I am telling you what happened and then leaving it with you, which is the single most dangerous thing I have done since I arrived.\"\n\n\"You may do anything at all with it. That is rather the point of giving it to you.\"",
      ],
      choice: {
        prompt: "\"So. What is your verdict? I find I am unable to predict it, which is novel and not entirely pleasant.\"",
        options: [
          {
            key: "kind",
            label: "Say you believe him",
            style: 3,
            close: "*There is no reply for a very long time.*\n\n\"You should not,\" *he writes.* \"On the evidence you have, you should not.\"\n\n*Then:* \"Thank you. I have been carrying that for two years and it turns out one only has to put it down once.\"",
          },
          {
            key: "playful",
            label: "Say you'll hold it over him",
            style: 1,
            close: "\"Do,\" *he says, and means it.* \"Please do. It will be an enormous relief to owe somebody something for once instead of the reverse.\"\n\n\"Well, well. Look what you have made of me.\"",
          },
          {
            key: "bold",
            label: "Tell him to stop shielding",
            style: 4,
            close: "\"I cannot,\" *he writes at once. Then, after a moment:*\n\n\"I do not know how. I was made to be useful before I was made to be anything else, and I have never once been asked to be a person instead.\"\n\n\"You are asking. I have noticed. Give me some time with it.\"",
          },
        ],
      },
      keepsake: {
        emoji: "📁",
        line: "The truth he'd let the whole house get wrong for two years.",
      },
    },

    devoted: {
      beats: [
        '*You find the tea outside your door before the message arrives. It is exactly how you take it, which you have never told him.*\n\n**{firstName}**: "You did not sleep last night. Do not ask how I know. Drink that."',
        "\"I have made a study of the small ways people here come apart, so that I can put them back before anyone important notices. It is my actual function in this house, whatever the title says.\"\n\n\"I have caught myself doing it for you for some months now, and doing it badly, because I keep wanting to be seen doing it. That is not how the work is meant to go. The work is meant to be invisible.\"",
        "\"I stood outside your door for rather longer than the delivery required. I have decided to tell you that instead of letting you assume the tea appeared by itself.\"\n\n\"Honestly. Eleven years of being unreadable, undone by a cup going cold in a corridor.\"",
      ],
      choice: {
        prompt: "\"Say nothing kind. I am not equipped for it at this hour.\"",
        options: [
          {
            key: "kind",
            label: "Say something kind anyway",
            style: 3,
            close: "\"...Well, well.\"\n\n*The next message takes four minutes.*\n\n\"I am going to sit down. Do not tell anybody that a sentence did that. Say it again tomorrow, when I have had some warning.\"",
          },
          {
            key: "playful",
            label: "Ask how he takes his",
            style: 1,
            close: "\"Badly. Standing up, at the wrong hour, usually cold.\"\n\n*A pause.*\n\n\"If you are offering, I am at the landing most nights after one. I have never said that to a single person in this building.\"",
          },
          {
            key: "bold",
            label: "Tell him to come in and sit",
            style: 4,
            close: "*He does, and he is careful about it, and then somewhere in the second hour he stops being careful and falls asleep upright on your couch mid-sentence: the composed, unreadable vice-captain of Frostheim, out cold with his monocle in his hand.*\n\n*He wakes at five, appalled, and stays another hour anyway.*",
          },
        ],
      },
      keepsake: {
        emoji: "☕",
        line: "A cup made exactly right by someone you never told.",
      },
    },

    soulbound: {
      beats: [
        '**{firstName}**: "I am going to be direct, which I am told I never am, and which is a reputation I have worked rather hard for."',
        "\"I have spent my life being the second man in every room. It suits me. I am better placed there, I see more from there, and I have never once wanted the chair at the front.\"\n\n\"I have wanted precisely one thing for myself in eleven years, and I have been managing it the way I manage everything else: quietly, at a distance, and with a contingency in place for when it ends.\"",
        "\"{timesMet} occasions. I have the number because of course I have the number.\"\n\n\"On {timesMet} occasions you have walked into a room where I was being useful to somebody, and every single time some entirely unhelpful part of me has thought: ah. There. That is the one I would like to be useless in front of.\"",
        "\"So. I love you.\"\n\n\"I have no arrangement round that sentence and nothing to trade for it, and I have not left myself an exit, which you may take as the measure of how seriously I mean it.\"\n\n\"This conversation, unlike every other one, did happen. I should like it on the record.\"",
      ],
      choice: {
        prompt: "\"Take your time. I am extremely good at waiting and extremely poor at hoping, so do not mind either.\"",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close: "*For once there is no clever thing at all.*\n\n\"...Come to the landing,\" *he writes.* \"Now. It is dark and there is no light on the floor and I do not care in the least.\"\n\n*He is already there. He does not say anything when you arrive. He simply takes your hands, both of them, and stands there holding on in the dark like a man who has finally set something down.*",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close: "\"Naturally. It would be a poor sort of declaration that came with terms attached.\"\n\n\"I shall carry on exactly as I have. The tea will still arrive. I shall still know when you have not slept. None of that was ever a bid, whatever it looked like from where you were standing.\"\n\n\"And you will find me on the landing at eleven, on clear days, for as long as you like. I am, as I said, extremely good at waiting.\"",
          },
        ],
      },
      keepsake: {
        emoji: "✒️",
        line: "The one conversation he refused to deny having had.",
      },
    },
  },
  dialogue: {
    new: [
      'Calm as still water, he tilts his head. "You\'re new around here."',
      "He notes your arrival, files it somewhere, and returns to what he was doing.",
      'He inclines his head, courteous. "Business in Frostheim? I serve the one who runs it."',
      "He checks the corridor behind you before he looks at you. Habit, not suspicion.",
      "Nothing about his expression moves. Something behind it is definitely taking notes.",
    ],
    known: [
      "You've moved from unknown to accounted for. From him, that's a promotion.",
      "He doesn't ask your name. He had it the first time and kept it.",
      '"Twelve days since last time," he notes. "Yes, I keep track. It\'s rather the job."',
      "The once-over is shorter now. He reached his conclusion about you some time ago.",
      "He nods once as you pass. It isn't nothing.",
    ],
    warm: [
      "His usual calm softens into something warmer whenever you're near.",
      "He finishes his sentence, then gives you his whole attention. That's rare.",
      '"You\'re on time," he says, which from him is close to a compliment.',
      "He shifts to make room without ever acknowledging that he did.",
      "The report in his hands stops being urgent the moment you speak.",
      "He pours a second cup of tea without asking whether you wanted one. You did.",
      'The chessboard is set up between you. "Sit. I\'ll go easy. Somewhat."',
    ],
    spark: [
      "The composure holds. It is very obviously costing him something.",
      "He straightens something on your uniform with unnecessary precision.",
      '"I\'ve turned this over more than once," he says. "The answer keeps coming back the same."',
      "He stands closer than is proper and does not correct it.",
      '"You\'re a distraction," he states, without any apparent intention of removing it.',
    ],
    close: [
      "\"You've become someone I look forward to seeing,\" he says plainly, like it's just a fact.",
      "He breaks his own rule about interruptions. For you. Again.",
      '"I had an hour free," he says. He did not have an hour free.',
      "The composure holds, but his eyes give him away completely.",
      "He tells you the truth without softening it, because you're the one person he doesn't have to.",
    ],
    bound: [
      "He states what he wants plainly, and then is exceedingly efficient about it.",
      "He wakes at his usual hour, looks at you, and elects to be late for the first time.",
      '"I stopped weighing you up a long while ago," he says. "The matter was settled."',
      "His hands are precise everywhere. It is deeply unfair.",
      "He holds you the way he does everything else: deliberately, and completely.",
    ],
  },
  dialogueWhen: [
    {
      when: { time: "evening" },
      dialogue: {
        new: [
          "He checks his watch, then the dark stairwell behind you, and decides not to remark on the hour.",
          '"You\'re past curfew," he notes. "So am I. We\'ll call it even."',
          "The balcony's empty except for him. After dark, he says, is the only time it's quiet enough to think.",
          '"It\'s after curfew. I\'m not going to report you," he says. "Stand where the light reaches, though."',
        ],
        known: [
          '"I\'ll sign you back in if anyone asks," he says, already turning a blind eye.',
          "He's less starched after dark. The clipboard is nowhere in sight.",
          '"The balcony\'s better at night," he says. "No one to perform for."',
        ],
        warm: [
          '"Nobody comes up here this late. That\'s rather the point of it."',
        ],
      },
    },
  ],
  approachWhen: [
    {
      when: { time: "evening" },
      approach: {
        new: ["Slip past curfew with him", "Take the empty balcony"],
        known: ["Let him sign you in"],
        warm: ["Keep him company up here"],
      },
    },
  ],
  temperamentDialogue: {
    new: [
      '"No need to be nervous. I\'ve nothing but the noblest of intentions."',
      '"Well, well. Frostheim is ruled by a king, you see. I\'m no more than a servant."',
      '"This academy has far more than its fair share of loose cannons, wouldn\'t you agree?"',
      "\"If you're lost, say so. I don't have time to cater to your ambivalence.\"",
      '"What do you mean? I lend a sympathetic ear to those in need; that\'s all."',
    ],
    known: [
      '"Providing this level of assistance goes without saying. Only once you can do so without instruction can you call yourself qualified."',
      '"Ah. You again. Proceed, by all means."',
      "\"You've been consistent. I've adjusted my expectations accordingly.\"",
      '"No need to explain yourself this time."',
      '"If you intend to keep coming, learn the layout. Start here."',
    ],
    warm: [
      '"Well, well. You again. I find I don\'t mind it."',
      '"You\'re consistent. I respect consistency."',
      "\"I've adjusted my schedule. Don't read into it.\"",
      '"Well, then. How have you been? And the truth, this time."',
      '"There are worse interruptions than you."',
    ],
    spark: [
      '"Hold still. This will take a moment and I intend to take it."',
      '"My focus is not what it was. You\'re the reason. I\'ve stopped trying to do anything about it."',
      "\"Closer. I'm not going to ask twice, and I'd rather not have to.\"",
      '"That look is doing nothing for my concentration and I would like you to keep making it."',
      '"State plainly what you want. I\'ll tell you whether I want the same."',
    ],
    close: [
      '"Well, well. I must say your company is preferred. To my surprise."',
      '"I\'ve stopped calling this a coincidence. So should you."',
      '"Say it plainly. I\'d rather hear the truth from you than anything else."',
      "\"I don't make exceptions. I've made one. Draw your own conclusions.\"",
      '"If something happens, come to me first. Not second. First."',
    ],
    bound: [
      "\"Stay. I've cleared the morning. I've never cleared a morning.\"",
      '"Tell me what you want. I\'d rather not have to guess with you."',
      '"I love you. Hardly a complicated thing to work out. It simply took me a while to say it."',
      "\"Closer. That's better. That's... yes.\"",
      '"You are the one disruption to my order that I have no intention of resolving."',
    ],
  },
  approach: {
    new: [
      "State your business",
      "Step into view",
      "Answer his question",
      "Stand where he can see you",
    ],
    known: [
      "Proceed",
      "Skip the explanation",
      "Learn the layout",
      "Return the nod",
    ],
    warm: [
      "Check in with him",
      "Walk up to him",
      "Interrupt him anyway",
      "Ask what he's working on",
    ],
    spark: [
      "Hold still",
      "Be the distraction",
      "Step past his manners",
      "State what you want",
    ],
    close: [
      "Go to him directly",
      "Take the seat beside him",
      "Say it plainly",
      "Tell him the truth",
    ],
    bound: [
      "Tell him what you want",
      "Stay the morning",
      "Let him be late",
      "Say it back",
    ],
  },
  responses: {
    kind: {
      new: [
        "Respect his discipline",
        "Answer him honestly",
        "Thank him for the warning",
      ],
      spark: [
        "Let him take his moment",
        "Tell him it's mutual",
        "Be still for him",
      ],
      close: [
        "See through his composure",
        "Tell him he can stand down",
        "Ask what he's carrying",
      ],
      bound: [
        "Say it back plainly",
        "Let him be late",
        "Tell him it goes both ways",
      ],
    },
    playful: {
      new: [
        "Try to make him crack",
        "Answer far too casually",
        "Test his patience",
      ],
      spark: [
        "Compromise his focus",
        "Break a rule on purpose",
        "Ask what he's concluded",
      ],
      close: [
        "Crack through his mask",
        "Catch him almost smiling",
        "Break his rules with him",
      ],
      bound: [
        "Ruin his schedule",
        "Be deliberately imprecise",
        "Make him lose the thread",
      ],
    },
    bold: {
      new: [
        "Hold your own",
        "Give him a straight answer",
        "Refuse the once-over",
      ],
      spark: [
        "Say plainly what you want",
        "Close the last step",
        "Tell him to stop holding back",
      ],
      close: [
        "Demand the truth from him",
        "Tell him you're staying",
        "Meet him without flinching",
      ],
      bound: [
        "Tell him exactly what you want",
        "Pull him back down",
        "Be the disorder",
      ],
    },
    neutral: {
      new: [
        "Observe him carefully",
        "Say only what's needed",
        "Wait for his verdict",
      ],
      spark: [
        "Let him recompose",
        "Give him nothing",
        "Keep a proper distance",
      ],
      close: [
        "See what he won't say",
        "Let the silence stand",
        "Stay until he's finished",
      ],
      bound: ["Let him keep the hour", "Lie still", "Say nothing at all"],
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
      '"Well, well." **{name}** turns to {user} with a courtesy that gives away nothing.',
      '{user} names him, and **{name}** files it somewhere, smiling. "How resourceful."',
      '**{name}** inclines his head. "You have the advantage of me. For now." {user} had it right.',
    ],
    warm: [
      '"Honestly." **{name}** was two steps from a clean escape, and {user} caught him anyway.',
      "{user} calls out, and **{name}** gives them his whole attention. That is rare.",
      "**{name}** checks his pocket watch, then decides {user} is worth being late for.",
    ],
    spark: [
      '"Shouting my name across half the campus. You\'ve certainly got guts." **{name}** looks delighted with {user}.',
      "{user} says the name, and something behind **{name}**'s composure gives, briefly.",
      "**{name}** was en route to the **{house}** briefing. He is now walking {user}'s way instead.",
    ],
    close: [
      '"This conversation never happened," **{name}** murmurs, already steering {user} out of earshot.',
      "**{name}** hears {user}, and the servant's mask comes off between one step and the next.",
      "{user} calls, and **{name}**, who has never in his life been late, elects to be.",
    ],
    bound: [
      '"I stopped weighing you up a long while ago," **{name}** tells {user}, taking their hand in the open.',
      "**{name}** hands the **{house}** dispatch to a passing first-year. {user} called; the matter is settled.",
      "{user} says the name, and **{name}** clears his entire afternoon, which he has never once done.",
    ],
  },
};
