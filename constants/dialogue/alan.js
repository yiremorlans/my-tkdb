export default {
  // The level-up DMs (docs/bond-scene-dms.md). Alan is not good with words and
  // these do not pretend otherwise — his beats are the shortest in the game, and
  // the intimacy is in the fact of a man who says four words a day sitting there
  // typing at all. What he cannot write, he does instead.
  //
  // The typos are deliberate. He is canonically hopeless with a phone (he has to
  // ask how to add someone on WickChat), so roughly one line a scene carries a
  // dropped apostrophe, a missing full stop, or a mistype he corrects on the next
  // line. Do not spellcheck them out. They only ever appear in text he is typing
  // — never in narration, and never in a line he says out loud.
  bondScenes: {
    acquaintance: {
      beats: [
        '**{firstName}**: "Its Alan."\n\n*That\'s the whole message. It sits there for eleven minutes.*',
        '"Not good at this."\n\n*Another gap.*\n\n"Youve been around {timesMet} times now. Bandana says I shoulda said something by now. He\'s right. Not telling him that."\n\n"...So. Said something."',
      ],
      choice: {
        prompt: "\"That's it. That's the message.\"",
        options: [
          {
            key: "kind",
            label: "Tell him it's a good start",
            style: 3,
            close:
              '"...Yeah."\n\n*A minute later:* "Thnaks."\n\n*Then:* "*Thanks."\n\n*That\'s the last one. But the read receipt sits there a long time, so he didn\'t put the phone down.*',
          },
          {
            key: "playful",
            label: "Ask if that took long",
            style: 1,
            close:
              '"40 minutes."\n\n*No defensiveness in it at all. Just the number, handed over.*\n\n"Worth it."',
          },
          {
            key: "bold",
            label: "Tell him to say more",
            style: 4,
            close:
              '*A long silence.*\n\n"Garage. Tomorrow, after six."\n\n*A pause.* "Easier out loud. Little bit."',
          },
        ],
      },
      keepsake: {
        emoji: "📱",
        line: "The eleven minutes between his name and what he'd meant to say.",
      },
    },

    friend: {
      beats: [
        '**{firstName}**: "Noticed something."',
        '"You\'ve got {favResponse} for me. Every time. Doesn\'t change when I\'m in a mood."\n\n"People change when I\'m in a mood. Whole house does. Been like that since I got here and I quit minding it a long time ago."\n\n"You don\'t. Just wanted you to know I see it."',
      ],
      choice: {
        prompt: '"Not asking you to explain it. Say whatever you want."',
        options: [
          {
            key: "kind",
            label: "Say you're not scared of him",
            style: 3,
            close:
              '"Know you\'re not."\n\n*A long pause.*\n\n"That\'s the part I can\'t figure out. Give me a while with it."',
          },
          {
            key: "playful",
            label: "Say his moods aren't subtle",
            style: 1,
            close:
              '"They\'re not."\n\n*Then, out of nowhere:* "Leo says I\'ve got two faces. Angry and asleep."\n\n"He\'s wrong. There\'s a third one. You\'ve seen it."',
          },
          {
            key: "bold",
            label: "Tell him he's not that scary",
            style: 4,
            close:
              '"I am."\n\n*Flat. No argument in it. Just something he\'s carried a long way.*\n\n"Not to you though. Don\'t know why that\'s different. Not gonna poke at it in case it stops."',
          },
        ],
      },
      keepsake: {
        emoji: "🥊",
        line: "The third face, that only ever shows up around you.",
      },
    },

    closeFriend: {
      beats: [
        '**{firstName}**: "Come by the garage."\n\n"Not urgent. Not a job."',
        "*The car is stripped down across half the floor and he doesn't look up when you come in. He hands you a spanner. That's the greeting.*\n\n*An hour goes by. Neither of you says much. He passes you things before you've asked for them.*",
        "*Later, hands black, sitting on the floor against the bench, he says it to the wall instead of to you.*\n\n\"Don't let people down here. Only room where I'm not the captain and nobody's watching to see what I'll do.\"\n\n\"You've been down here four times. Wasn't an accident.\"",
      ],
      choice: {
        prompt: '"...Say something. I\'m out of words."',
        options: [
          {
            key: "kind",
            label: "Ask if you can come back",
            style: 3,
            close:
              '*He looks at you properly for the first time all evening.*\n\n"Yeah."\n\n*Then, after a while, quieter:* "Don\'t ask next time. Just come."',
          },
          {
            key: "playful",
            label: "Ask what you're building",
            style: 1,
            close:
              '"Passenger seat."\n\n*He says it to the engine. Doesn\'t explain. Doesn\'t have to.*\n\n"Been on it a month. Take a guess who for."',
          },
          {
            key: "bold",
            label: "Sit down next to him",
            style: 4,
            close:
              "*You sit. Shoulder to shoulder against the bench, in the cold, with the light off over the door.*\n\n*He goes very still. Then, after a long time, he leans a fraction of an inch into you, not enough for anyone else to have seen, and stays there until the heater cuts out.*",
          },
        ],
      },
      keepsake: {
        emoji: "🔧",
        line: "A spanner he handed over without being asked.",
      },
    },

    confidant: {
      beats: [
        '*It comes through at four in the morning.*\n\n**{firstName}**: "You awake"',
        '"Bad one tonight. Dont need anything. Just didn\'t want to sit with it on my own and you were the only name I could stand to look at."',
        "\"They say I killed someone. You've heard it. Everyone has.\"\n\n\"Nobody's ever asked me. Two years, nobody's asked. They just decide, and then they're careful around me, and I let them, because careful's easier than the conversation.\"\n\n\"You've never asked either. Difference is I don't think you're being careful. I think you're waiting on me. Been sitting with that a while.\"",
      ],
      choice: {
        prompt: "\"Ask me. Or don't. Either's fine. I mean that.\"",
        options: [
          {
            key: "kind",
            label: "Say you'll wait for it",
            style: 3,
            close:
              '*Nothing for six minutes.*\n\n"...Yeah. Okay."\n\n"Not tonight. But it\'ll be you. Wanted you to know that much."',
          },
          {
            key: "playful",
            label: "Say you'd already decided",
            style: 1,
            close:
              '"Decided what."\n\n*You tell him.*\n\n"...Huh." *A long gap.* "Most people decide the other way. You went and did it without the facts, same as them. Bothers me a lot less than it should."',
          },
          {
            key: "bold",
            label: "Ask him straight out",
            style: 4,
            close:
              '*The typing indicator runs for almost ten minutes and produces one line.*\n\n"Yes. And I\'d do it again, and that\'s the part that keeps me up."\n\n*Then:* "You still there"\n\n*You say yes. He doesn\'t answer, but the read receipt stays lit until the sun comes up.*',
          },
        ],
      },
      keepsake: {
        emoji: "📲",
        line: "A read receipt that stayed lit until sunrise.",
      },
    },

    devoted: {
      beats: [
        '**{firstName}**: "Dont go out tonight."',
        "*You ask why. It takes him a while.*\n\n\"Because I'd have to come find you, and I'd have to use it, and I've got a rule about using it.\"\n\n\"Rule's held eleven years. Figure it'd last about four seconds where you're concerned. That scares me more than whatever's in the corridor does.\"",
        '"Only ever told one person what the rule is. Only if someone\'s about to die. Last resort, nothing before it."\n\n"You\'ve gone and made yourself the last resort. Don\'t know when. Nobody asked me about it first. Including me."',
      ],
      choice: {
        prompt: '"So stay in. Please."',
        options: [
          {
            key: "kind",
            label: "Tell him you'll stay in",
            style: 3,
            close:
              '"Good."\n\n*Then, twenty minutes later, a photo taken from outside your building: his car, parked, engine off.*\n\n"Not coming up. Just gonna be here a while."\n\n*It\'s still there in the morning.*',
          },
          {
            key: "playful",
            label: "Ask if he's on the doorstep",
            style: 1,
            close:
              '"No."\n\n*A pause.*\n\n"Yes. Been out here an hour. Don\'t come down, it\'s freezing and I\'ll just tell you to go back up."',
          },
          {
            key: "bold",
            label: "Tell him to come up instead",
            style: 4,
            close:
              '*He comes up. He stands in the doorway without taking his jacket off, like leaving is still an option he\'s keeping open.*\n\n*Then he puts one hand flat against your cheek, careful, the way you\'d hold something you were scared of breaking, and closes his eyes.*\n\n"Not good with words," *he says.* "This is the whole sentence."',
          },
        ],
      },
      keepsake: {
        emoji: "🚗",
        line: "A car parked outside all night with the engine off.",
      },
    },

    soulbound: {
      beats: [
        '**{firstName}**: "Going to try and get this right. Might take me a minute."',
        '"{timesMet} times you\'ve turned up. Never once because you needed something off me. Took me about half of those to quit waiting for the ask."',
        "\"I'm not a safe thing to be near. That's not me being modest. I've had to be told to stop before. Bandana's seen it. Leo's seen it. Neither of them looks at me the same way after.\"\n\n\"You've seen it too. You came back the next day like nothing happened. Then the day after that.\"",
        '"So here it is. Only doing this once."\n\n"I love you. Been true a long time. Wasnt going to say it, because saying it makes it yours to carry and I didn\'t want to put that on you."\n\n"Putting it on you anyway. ...Sorry."',
      ],
      choice: {
        prompt:
          '"Take your time. I\'m good at waiting. Had a lot of practice."',
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close:
              "*Nothing comes back. Nothing for so long you think the phone's died.*\n\n*Then there's an engine outside, and then there's him: no jacket, hair wrecked, clearly not having stopped to think about a single part of it.*\n\n*He doesn't say anything. He just picks you up off the step and holds on, and it's the first time you've ever seen him smile without trying to hide it.*",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close:
              '"That\'s fine."\n\n*Two words, straight back, no wobble in them.*\n\n"Wasn\'t asking for an answer. Was just done not saying it."\n\n*A pause.*\n\n"Garage is open. Same as always. Come by whenever."\n\n*And it is, and he never brings it up again, but the passenger seat gets finished that month, and he never mentions that either.*',
          },
        ],
      },
      keepsake: {
        emoji: "💺",
        line: "The passenger seat he'd been building for a month without saying so.",
      },
    },
  },
  dialogue: {
    new: [
      'Grease-stained and worn, he looks you over once. "Get back. It\'s dangerous."',
      "He doesn't stop working. He just moves the toolbox so you won't trip over it.",
      "The engine dies under his hand. In the quiet, he finally acknowledges you exist.",
      '"Don\'t touch that," he says flatly. "It\'s hot." That\'s the whole greeting.',
      "He's holding a campus map the wrong way up and won't admit he's lost. \"...What do you want?\"",
    ],
    known: [
      "He doesn't warn you about the floor anymore. You've learned it.",
      "He grunts once in your direction. Two weeks ago he didn't do that.",
      "The toolbox has already been moved before you arrive.",
      '"Looks like we\'ve got another mission order," he says. "There\'s more anomalies in the summer."',
      "\"Hand me that.\" It's the first thing he's ever asked you for.",
    ],
    warm: [
      "He works beside you in steady silence, a quiet understanding growing between you.",
      "He hands you a rag without being asked. Somehow that means something.",
      "He's left the second stool out again. He's never once mentioned it.",
      '"You eat today?" he asks, wiping his hands. It\'s the third time this week.',
      "The garage radio is on. He turned it on because you like it. He won't say so.",
    ],
    spark: [
      "He wipes his hands twice before he touches you. He touches you anyway.",
      "He's careful with you in a way he isn't careful with anything else.",
      "The silence between you has stopped being comfortable and started being loaded.",
      "He tucks your hair back with grease-stained fingers and says nothing about it.",
      '"...Come here," he says. It takes him a long time to get those two words out.',
    ],
    close: [
      '"I keep my head better with you around," he says, low, like a confession. "Thank you."',
      "He stops working entirely. For him, that's practically a declaration.",
      "He puts his jacket over your shoulders before you've admitted you're cold.",
      '"Stay a while," he says. Three words from him weigh more than most speeches.',
      "The tired in his shoulders eases the moment you sit down beside him.",
    ],
    bound: [
      "He sleeps through the night now. He knows why. He'll never say it out loud.",
      "His hands are rough and careful and everywhere, and he still doesn't speak.",
      "He pulls you into his lap in the quiet of the garage like it's nothing. It isn't.",
      '"...Love you," he says into your hair, so quietly it\'s almost deniable.',
      "He's stopped washing the grease off before he touches you. You told him not to bother.",
    ],
  },
  temperamentDialogue: {
    new: [
      '"This place isn\'t meant for people like you. Stay safe."',
      '"Watch your step. Half this floor\'s sharp."',
      '"...What do you want?"',
      '"You wandered into the wrong house. Go back the way you came."',
      '"...Hm. You\'re still standing there."',
    ],
    known: [
      '"...You again. Fine."',
      '"Hand me the eight-mil. It\'s the one that looks like the others."',
      "\"You're not in the way. That's rare.\"",
      '"Slack off once, you\'ll find out how hard it is to get back in the game."',
      "\"Don't stand there. Sit, if you're staying.\"",
    ],
    warm: [
      "\"I'm glad you're here. Really.\"",
      '"Sit. I\'m almost done."',
      '"You came back. Good."',
      "\"Lunch? Huh. I forgot to eat. ...I don't eat in the cafeteria. Portions aren't big enough. That's the only reason.\"",
      '"Long day. Yours or mine, doesn\'t matter. Sit down."',
    ],
    spark: [
      '"Come here. Closer than that."',
      "\"I'm no good at saying it. You'll have to read it off me.\"",
      '"Hold still. Got oil on your cheek. ...There. Got it."',
      '"You keep standing that close, I\'m gonna do something about it."',
      "\"Don't go home yet. That's all. That's the whole ask.\"",
    ],
    close: [
      "\"Most of what sticks with me, I'd rather forget. You're not on that list. Stay.\"",
      "\"I don't sleep much. It's easier when I know you're all right.\"",
      '"Come here. Let me look at you."',
      '"Whatever it is, you tell me first. I\'ll handle it."',
      '"I\'m not good with words. You already know what I mean."',
    ],
    bound: [
      '"Come here. Don\'t need a reason anymore, do I."',
      '"Stay. Whole night. I sleep better."',
      '"...Love you. Don\'t make me repeat it, I barely got it out."',
      '"Sit here. On me. Yeah. Like that."',
      '"I don\'t say much. Never had to, with you."',
    ],
  },
  approach: {
    new: [
      "Step over the toolbox",
      "Stay out of his way",
      "Ask what he's building",
      "Wait for the engine to stop",
    ],
    known: [
      "Hand him the spanner",
      "Sit, if you're staying",
      "Stay out from underfoot",
      "Ask what it is",
    ],
    warm: [
      "Take the second stool",
      "Pick up the spanner",
      "Work beside him",
      "Break the quiet",
    ],
    spark: ["Come here", "Hold still", "Stay a bit longer", "Read it off him"],
    close: [
      "Sit down beside him",
      "Take his hands",
      "Tell him to rest",
      "Stay a while",
    ],
    bound: [
      "Come here",
      "Stay the whole night",
      "Sit with him",
      "Say it for him",
    ],
  },
  responses: {
    kind: {
      new: [
        "Appreciate his honesty",
        "Thank him for the warning",
        "Ask if he's eaten",
      ],
      spark: [
        "Let him be careful with you",
        "Read it off him",
        "Cover his hands with yours",
      ],
      close: [
        "Accept what he's done for you",
        "Tell him he can put it down",
        "Let him look after you",
      ],
      bound: [
        "Say it back for him",
        "Stay the whole night",
        "Let him not speak",
      ],
    },
    playful: {
      new: [
        "Accept his humor",
        "Touch the thing he said not to",
        "Answer his grunt with a grin",
      ],
      spark: [
        "Get oil back on him",
        "Stand closer on purpose",
        "Make him say it",
      ],
      close: ["Get him laughing", "Steal his jacket", "Talk until he gives in"],
      bound: [
        "Make him repeat it",
        "Get grease on him deliberately",
        "Steal his jacket again",
      ],
    },
    bold: {
      new: [
        "Stand your ground",
        "Tell him you're staying",
        "Say you can handle it",
      ],
      spark: [
        "Do something about it",
        "Close the distance first",
        "Tell him not to be careful",
      ],
      close: [
        "Trust his protection",
        "Tell him he isn't alone",
        "Ask him to lean on you",
      ],
      bound: [
        "Climb into his lap",
        "Say it first",
        "Tell him to leave the grease",
      ],
    },
    neutral: {
      new: ["Be straightforward", "Work in silence", "Let him finish"],
      spark: ["Let the silence sit", "Step back", "Say nothing, stay anyway"],
      close: [
        "Understand his quiet",
        "Sit through the long pause",
        "Match his silence",
      ],
      bound: ["Let him sleep", "Sit in the quiet", "Say nothing at all"],
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
      '**{name}** looks {user} over once. "...Yeah. That\'s me."',
      "**{name}** had been at that corner a while, working out which way it went. {user} named him before he managed it.",
      '"Careful." **{name}** moves something sharp out of {user}\'s way before he says anything else.',
    ],
    warm: [
      "{user} calls out, and **{name}** stops walking. He doesn't do that for people.",
      "**{name}** was going the wrong way again. {user} saying his name fixed it.",
      '**{name}** grunts. {user} has learned to hear "good" in it.',
    ],
    spark: [
      "**{name}** turns at {user}'s voice and takes a second too long to look away.",
      '"You came looking." **{name}** says it flat to {user}, and stays put.',
      "**{name}** had no idea which block this was. He knew {user}'s voice.",
    ],
    close: [
      "**{name}** is lost again. He won't say so. {user} calling out saves him having to.",
      "{user} calls, and **{name}** puts a hand at their back, steering them out of the crowd.",
      "**{name}** says nothing. He stays where {user} can reach him.",
    ],
    bound: [
      '"Come here. Don\'t need a reason anymore, do I." **{name}** says it low, only to {user}.',
      "**{name}** hears {user}, and his shoulders finally come down.",
      "**{name}** has never once known where he is. He always knows where {user} is.",
    ],
  },
};
