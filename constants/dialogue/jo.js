export default {
  // The level-up DMs (docs/bond-scene-dms.md). Jo runs a house of eccentrics and
  // has never once been asked how he is; the arc is somebody finally asking and
  // him not having an answer ready. He calls you "cutie" as a way of keeping the
  // register light, and the top of the ladder is the first message where he
  // doesn't do it.
  bondScenes: {
    acquaintance: {
      beats: [
        "**{firstName}**: Odd hour for this. I've stopped being able to tell which hours are odd.",
        "Quick thing, then I'll leave you be. You came through the hall Tuesday while I was dealing with three separate crises, and you didn't add a fourth.\n\nThat's the whole compliment, cutie. {timesMet} times in this house and you've never once needed something from me. In Dionysia, that makes you rare.",
      ],
      choice: {
        prompt: "Anyway. How are you? And answer properly, I'll know.",
        options: [
          {
            key: "kind",
            label: "Ask him back",
            style: 3,
            close:
              "Ha. Nice try.\n\n*A long pause, for someone whose whole job is having an answer ready.*\n\n...Tired. That's the honest one. Don't tell Mio, he'll build me something.",
          },
          {
            key: "playful",
            label: "Offer to be crisis four",
            style: 1,
            close:
              "Don't. The system doesn't have room for a fourth.\n\n...Though if it were you, I'd probably enjoy the day more. Forget I said that. Two hours' sleep talking.",
          },
          {
            key: "bold",
            label: "Say you'd need something",
            style: 4,
            close:
              "Oh, would you.\n\n*Real interest, the first thing in the whole message he hasn't managed.*\n\nAsk, then. I'd like to know what it does to me. I don't get many chances to find out.",
          },
        ],
      },
      keepsake: {
        emoji: "🎩",
        line: "One honest word from a man who always has an answer ready.",
      },
    },

    friend: {
      beats: [
        "**{firstName}**: Something's been bothering me and I've decided you're going to hear about it.",
        "I adapt. It's what I do. I read a room and I become the version of me that room needs, and I've been doing it so long I couldn't tell you where the seam is any more. On stage, in the hall, with Shion, with the teachers. Different man every time and all of them mine.\n\nYou come at me with {favResponse} no matter which one you're getting. Same every time. And it's started to feel like being addressed by name in a room where everyone else is calling me by a job.",
      ],
      choice: {
        prompt: "So what am I supposed to do with that, cutie?",
        options: [
          {
            key: "kind",
            label: "Say you'd like the real one",
            style: 3,
            close:
              "That's the trouble. I'd have to find him first.\n\n...I'll look. Give me a while. He's under a lot of paperwork.",
          },
          {
            key: "playful",
            label: "Ask which one you're getting",
            style: 1,
            close:
              "Honestly? The one who's had four hours' sleep and is being charming at you out of sheer muscle memory.\n\nWhich is not the good one. Come back Thursday, the Thursday one is much better company.",
          },
          {
            key: "bold",
            label: "Tell him to stop adapting",
            style: 4,
            close:
              "*He doesn't answer for a long moment, slower than usual when he does.*\n\nNo one's told me to stop before. I've been told to rest, to take a night off. Never just stop.\n\nI don't know what that looks like yet. I'd like to find out.",
          },
        ],
      },
      keepsake: {
        emoji: "🪪",
        line: "The night somebody addressed him by name instead of by job.",
      },
    },

    closeFriend: {
      beats: [
        "**{firstName}**: Five thirty tomorrow. East gate. Don't ask why yet, just say yes.",
        "I run alone every morning, an hour, before the house is awake enough to have opinions about it. Nobody's ever been invited. It never once occurred to me that anybody should be.",
        "Here's the part I wasn't going to send: I've known you since {sinceMet}, and you've been running through my head for most of that hour lately, which does nothing good for my splits. So I decided the efficient fix was to stop thinking about you out there and just have you next to me instead.\n\nCall it training. Call it whatever gets you up. I want an hour that isn't a job, isn't a mission, and doesn't end with either of us owing the other one a report.",
      ],
      choice: {
        prompt:
          "Well? I already set two alarms, cutie. Don't make that a wasted decision.",
        options: [
          {
            key: "kind",
            label: "Say you'll be there",
            style: 3,
            close:
              "Good.\n\n...I wasn't going to admit to the two alarms, but there it is. Five thirty. Don't make me run this one alone after all that.",
          },
          {
            key: "playful",
            label: "Ask if this counts as a date",
            style: 1,
            close:
              "Absolutely not. It's cardio with company.\n\n...Ask me again after the third morning. I might have a different answer by then.",
          },
          {
            key: "bold",
            label: "Say he could've just asked",
            style: 4,
            close:
              "I know. I sat on it for a week deciding whether saying it out loud would ruin the whole exercise.\n\nApparently not. Five thirty. Try not to be smug about it before you've even laced up.",
          },
        ],
      },
      keepsake: {
        emoji: "👟",
        line: "A five thirty text he sent instead of running alone with the thought of her.",
      },
    },

    confidant: {
      beats: [
        "**{firstName}**: Do you have a little time this afternoon? There's an outfit I want you to try on, deep green silk, for the show. I'll be waiting at the office.",
        "Before you ask, it can't be one of the storeroom artifacts. Those run one size for the whole cast and call it close enough. This one needs it exact, and I don't trust anyone else's hands near you for that part.\n\nWould you come alone? I'd rather it just be the two of us for this one.",
        "Also, if I'm honest...\n\nIt's the one hour this week where nobody needs anything from me except you, standing still while I take my time with you. I don't get many hours like that, and I don't intend to share a single minute of it.",
      ],
      choice: {
        prompt: "So? Office, three o'clock, if that works for you, cutie.",
        options: [
          {
            key: "kind",
            label: "Tell him you're coming",
            style: 3,
            close:
              "Good.\n\nYou're going to look good in it. I picked it out myself, so I'd know.",
          },
          {
            key: "playful",
            label: "Ask if you're the mannequin",
            style: 1,
            close:
              "Close enough. Stand still, hold that pose, and try not to look that good while I'm trying to concentrate. No one else here to blame it on.\n\nThree o'clock.",
          },
          {
            key: "bold",
            label: "Call the fitting an excuse",
            style: 4,
            close:
              "Caught.\n\nFine. I wanted to see you in something I picked out myself. Don't gloat about it.",
          },
        ],
      },
      keepsake: {
        emoji: "🧵",
        line: "A fitting he could've finished in thirty seconds, and didn't.",
      },
    },

    devoted: {
      beats: [
        "**{firstName}**: I canceled the show.",
        "Full house. Two months of rehearsal. Romeo's already going to bill me for the room, and I have not canceled a performance in my life, not for illness, not for a funeral, not once.\n\nYou were in the lower halls when it went wrong and nobody could tell me where. So I dropped the stigma mid-transformation in front of a hundred and forty people and I walked off, and I did not think about it. That's the part I want you to have: I did not think about it.",
        "I've spent my whole life being the one who decides what gets sacrificed. I'm extremely good at it. I've sacrificed sleep, friendships, whole years of being a person, and I've never once resented any of it.\n\nTonight somebody else did the deciding and it wasn't me, and it turns out that person is you, and you weren't even in the room.",
      ],
      choice: {
        prompt:
          "Tell me I was an idiot. Nobody else is going to, they're all too polite.",
        options: [
          {
            key: "kind",
            label: "Tell him you're all right",
            style: 3,
            close:
              "I know. I've known for an hour.\n\nSay it in person. I'm outside. I've been outside for a while and I couldn't work out how to knock without it meaning something.",
          },
          {
            key: "playful",
            label: "Ask what Romeo billed him",
            style: 1,
            close:
              "More than the show made. He put it in writing. He put it in an *acronym*.\n\nWorth it. Don't tell him that, he'll raise it.",
          },
          {
            key: "bold",
            label: "Tell him it wasn't idiotic",
            style: 4,
            close:
              "*He's at the door before you've finished, still half in costume with the paint smudged, having very clearly walked straight there.*\n\n*He doesn't say anything for a while. He just puts both hands on your shoulders, holds you at arm's length to check, and then gives up entirely and pulls you in.*\n\n> A lifetime on that stage,\n\n*he says into your hair.*\n\n> ...and one of you.",
          },
        ],
      },
      keepsake: {
        emoji: "🎟️",
        line: "A ticket to a show that didn't happen.",
      },
    },

    soulbound: {
      beats: [
        "**{firstName}**: No nickname on this one. You'll notice, and I want you to.",
        "{timesMet} times. I've counted, which I don't do, because I don't keep count of people. Keeping count is how you end up with a ledger of who owes what and I have quite enough of those.\n\nYou're the only person in my life who isn't on one. Not on the debit side, not on the credit side. You're just there, at five thirty, at the gate.",
        "I adapt to everybody. I told you that months ago and you told me to stop and I said I didn't know how.\n\nI've worked out that I do know how. I know exactly how. It's this: it's whoever I am at six in the morning halfway round the water with the stage nowhere on me and nothing to run. That's the seam. You've been looking at it for a year.",
        "So: I love you.\n\nNot the captain, not the Venus of Dionysia, not whichever version the room ordered. The one who's out of breath and hasn't got a line ready.\n\nYou can take that at whatever speed you like. I've spent years making decisions for a house full of people. I'm quite happy to not make this one.",
      ],
      choice: {
        prompt:
          "Your call. Entirely, and I mean that more than I've meant anything.",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close:
              "...East gate. Now. I know it's not five thirty.\n\n*He's there in the dark with no shoes on properly and no explanation for that, and when you get to him he laughs, a real one, cracked open, nothing performed anywhere in it.*\n\n> Say it out here,\n\n*he says, hands either side of your jaw.*\n\n> Where there's nobody to be a captain in front of.",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close:
              "Of course. Take it.\n\n*And then, because he cannot help himself:* And don't manage me about it. If you decide no, say no. I've had a lifetime of people managing me and I'd rather have one person who doesn't.\n\nThe gate's at five thirty. It was at five thirty before any of this and it'll be at five thirty after. I'll wait. That part isn't a favor, it's just where I am.",
          },
        ],
      },
      keepsake: {
        emoji: "📇",
        line: "The one message that didn't start with a nickname.",
      },
    },
  },
  dialogue: {
    new: {
      uniform: [
        "He's buried in paperwork: proposals, schedules, a budget that won't balance. He looks up anyway.",
        '"Anything troubling you, cutie? If you run into any problems, just come talk to me."',
        "The charisma lands before he's said a word. Running Dionysia hasn't dulled it.",
        '"You look pretty busy. I\'ll get some work done. Holler if you need anything."',
      ],
      casual: [
        "She's buried in paperwork: proposals, schedules, a budget that won't balance. She looks up anyway.",
        '"Anything troubling you, cutie? If you run into any problems, just come talk to me."',
        "The charisma lands before she's said a word. Running Dionysia hasn't dulled it.",
        '"You look pretty busy. I\'ll get some work done. Holler if you need anything."',
      ],
    },
    // Pool sizes track the affinity width of the level(s) they cover (see
    // RELATIONSHIP_LEVELS / DIALOGUE_TIER_BY_LEVEL in constants/game.js) —
    // roughly 1 line per POOL_POINTS_PER_LINE affinity points, so a wider band
    // doesn't repeat more often than a narrow one. known=55 wide → 13, warm=75
    // wide → 18 at the current POOL_POINTS_PER_LINE of 4.
    known: {
      uniform: [
        '"You came back." He sets down the pen like he\'d been looking for an excuse.',
        '"House meeting with Mio in a minute. You think we shoulder too much? It\'s just quicker to handle it ourselves."',
        "He works something small you mentioned once into the conversation like it's nothing.",
        '"Have you seen Elias, cutie? Asked him to do something and he\'s still not back..."',
        '"Elias is back, so we\'re stealing a coffee break before I lose the afternoon to that budget. Join us, cutie."',
        "He clears a stack of paperwork off the second chair before you've even asked to sit.",
        '"Another fire at the circus tent. Small one. I\'ve told them twice about the flames, so make that three."',
        "He remembers exactly how you take your snacks after practice now, and sets a plate aside before anyone else gets to it.",
        "\"The students here don't run on a normal clock. Neither do you, I've noticed. Works out.\"",
        "\"Shion again. I'll go apologize, it's the dorm captain's job. Not the first time this week.\"",
        "He's mid-sentence about the program lineup when he notices you and just... stops rushing.",
        '"Sorry, I was somewhere else for a second there. Nothing serious. Where were we?"',
        "He's learned your schedule well enough to know when you're free before you do.",
      ],
      casual: [
        '"You came back." She sets down the pen like she\'d been looking for an excuse.',
        '"House meeting with Mio in a minute. You think we shoulder too much? It\'s just quicker to handle it ourselves."',
        "She works something small you mentioned once into the conversation like it's nothing.",
        '"Have you seen Elias, cutie? Asked him to do something and he\'s still not back..."',
        '"Elias is back, so we\'re stealing a coffee break before I lose the afternoon to that budget. Join us, cutie."',
        "She clears a stack of paperwork off the second chair before you've even asked to sit.",
        '"Another fire at the circus tent. Small one. I\'ve told them twice about the flames, so make that three."',
        "She remembers exactly how you take your snacks after practice now, and sets a plate aside before anyone else gets to it.",
        "\"The students here don't run on a normal clock. Neither do you, I've noticed. Works out.\"",
        "\"Shion again. I'll go apologize, it's the dorm captains's job. Not the first time this week.\"",
        "She's mid-sentence about the program lineup when she notices you and just... stops rushing.",
        '"Sorry, I was somewhere else for a second there. Nothing serious. Where were we?"',
        "She's learned your schedule well enough to know when you're free before you do.",
      ],
    },
    warm: {
      uniform: [
        "He lights up the moment he sees you, whatever he was signing forgotten.",
        '"I\'m driving the Aqua-line later to catch the sunset. Come with, cutie."',
        '"My people march to the beat of their own drum. You\'ve fit right in with that."',
        '"There\'s just not enough hours in the day." He says it, then makes an hour for you.',
        "\"There's a coffee with your name on it and fifteen minutes I'm refusing to spend on anything else. Sit with me, cutie.\"",
        '"Botanical garden duty today. Rui knows the equipment better than Mio does, believe it or not. I just carry things."',
        "He's swapped his coffee order to match yours without a word about it.",
        '"Come to the school building with me? I\'ve got the house advisor to see, and the company beats the walk alone."',
        "\"You stayed up last night. Don't lie to me, cutie, I can hear it in your voice. I'll make you some honey tea.\"",
        "He saves you the seat next to the one with the least paperwork stacked on it. Small mercy, from him.",
        '"Leadership meeting with Mio again. Between us, I think we take on more than we should. Don\'t tell him I said that."',
        "The circus troupe listens to him without question. You're the only one who gets to argue back, and he seems to prefer it that way.",
        '"I finished the budget early just so I\'d have the afternoon free."',
        "He's stopped pretending the jog is just exercise. You're half the reason he still gets up for it.",
        '"Gathering research for new costumes. Tedious work, but the result is worth it. Want to see what I\'ve got so far?"',
        "He notices when you've had a long day before you say a word, and quietly clears an hour for you.",
        '"You\'re rare, you know that? Never once needed anything from me. I still catch myself waiting for it."',
        '"Don\'t look so surprised every time I make time for you. I keep doing it on purpose."',
      ],
      casual: [
        "She lights up the moment she sees you, whatever she was signing forgotten.",
        '"I\'m driving the Aqua-line later to catch the sunset. Come with, cutie."',
        '"My people march to the beat of their own drum. You\'ve fit right in with that."',
        '"There\'s just not enough hours in the day." She says it, then makes an hour for you.',
        "\"There's a coffee with your name on it and fifteen minutes I'm refusing to spend on anything else. Sit with me, cutie.\"",
        '"Botanical garden duty today. Rui knows the equipment better than Mio does, believe it or not. I just carry things."',
        "She's swapped her coffee order to match yours without a word about it.",
        '"Come to the school building with me? I\'ve got the house advisor to see, and the company beats the walk alone."',
        "\"You stayed up last night. Don't lie to me, cutie, I can hear it in your voice. I'll make you some honey tea.\"",
        "She saves you the seat next to the one with the least paperwork stacked on it. Small mercy, from her.",
        '"Leadership meeting with Mio again. Between us, I think we take on more than we should. Don\'t tell him I said that."',
        "The circus troupe listens to her without question. You're the only one who gets to argue back, and she seems to prefer it that way.",
        '"I finished the budget early just so I\'d have the afternoon free."',
        "She's stopped pretending the jog is just exercise. You're half the reason she still gets up for it.",
        '"Gathering research for new costumes. Tedious work, but the result is worth it. Want to see what I\'ve got so far?"',
        "She notices when you've had a long day before you say a word, and quietly clears an hour for you.",
        '"You\'re rare, you know that? Never once needed anything from me. I still catch myself waiting for it."',
        '"Don\'t look so surprised every time I make time for you. I keep doing it on purpose."',
      ],
    },
    spark: {
      uniform: [
        "The even, easy voice he keeps for everyone else slips. What's under it is only for you.",
        "He was fitting a costume on you. Somewhere in it his hands stopped being a stylist's.",
        '"That look," he says, the schedule forgotten. "Do it again. I want to be sure."',
        '"I thought I was done feeling like this," he admits. "So, what are you going to do about it?"',
      ],
      casual: [
        "The even, easy voice she keeps for everyone else slips. What's under it is only for you.",
        "She was fitting a costume on you. Somewhere in it her hands stopped being a stylist's.",
        '"That look," she says, the schedule forgotten. "Do it again. I want to be sure."',
        '"I thought I was done feeling like this," she admits. "So, what are you going to do about it?"',
      ],
    },
    close: {
      uniform: [
        "For you he'd put down the proposal, the schedule, all of it, and just be a person for an hour.",
        "The work is finally done for the night. He doesn't reach for more. He stays.",
        "He's stopped asking which version of him you prefer. You never did have a favorite.",
        '"No audience tonight," he says softly. "Just you. That\'s better anyway."',
      ],
      casual: [
        "For you she'd put down the proposal, the schedule, all of it, and just be a person for an hour.",
        "The work is finally done for the night. She doesn't reach for more. She stays.",
        "She's stopped asking which version of her you prefer. You never did have a favorite.",
        '"No audience tonight," she says softly. "Just you. That\'s better anyway."',
      ],
    },
    bound: {
      uniform: [
        "Nothing is scheduled, nothing is owed. For once he is entirely off the clock, and stays there.",
        "He takes the paint off and lets you see the tired underneath, and doesn't put it back.",
        '"No audience," he murmurs against your neck. "Only you. Only ever you."',
        "He isn't managing anyone or performing anything, which is the most extraordinary thing he's done.",
      ],
      casual: [
        "Nothing is scheduled, nothing is owed. For once she is entirely off the clock, and stays there.",
        "She takes the paint off and lets you see the tired underneath, and doesn't put it back.",
        '"No audience," she murmurs against your neck. "Only you. Only ever you."',
        "She isn't managing anyone or performing anything, which is the most extraordinary thing she's done.",
      ],
    },
  },
  temperamentDialogue: {
    new: [
      '"A new face! Come on in, cutie. What\'s your name?"',
      '"You look pretty busy. I\'m going to get some work done. Holler if you need anything."',
      '"Anything troubling you? My people march to the beat of their own drum, so if you\'ve got problems, come talk to me."',
      '"Pull up a chair. I\'ve got a budget to fight with, but I can talk and lose at the same time."',
      '"Oh, you\'ll do nicely. I can always tell."',
    ],
    // Pool sizes track the affinity width of the level(s) they cover (see
    // RELATIONSHIP_LEVELS / DIALOGUE_TIER_BY_LEVEL in constants/game.js) —
    // roughly 1 line per POOL_POINTS_PER_LINE affinity points, so a wider band
    // doesn't repeat more often than a narrow one. known=55 wide → 13, warm=75
    // wide → 18 at the current POOL_POINTS_PER_LINE of 4.
    known: [
      '"Twice now, cutie. You\'re becoming a regular around here."',
      '"Sit anywhere. Mind the paperwork... actually, don\'t. It can suffer."',
      '"Tell me honestly what you thought. No, actually honestly."',
      '"You notice things around here. Not many people bother."',
      '"House meeting with Mio soon. Between us, we probably do shoulder too much."',
      '"Another small fire at the tent. I mean that literally, before you ask."',
      "\"Elias still isn't back. If you see him, tell him I'm not even mad. I am, a little.\"",
      "\"You're here again. I'm starting to expect it, which is dangerous for my schedule.\"",
      "\"Shion won't listen to anyone twice. I've stopped counting how many times I've tried.\"",
      '"Sit with me a minute. The budget will still be losing when I get back to it."',
      '"You handle the chaos here better than half my own house does."',
      '"Ask me anything. I promise the honest version is more interesting than the polished one."',
      '"I lost track of the time again. You\'re a bad influence on my schedule, cutie."',
    ],
    warm: [
      "\"You're back! I was hoping you'd return.\"",
      "\"I'm driving the Aqua-line at sunset. Come with me, cutie. Don't argue.\"",
      '"Proposal, schedule, program, budget... and yet here I am, making time for you."',
      '"I looked up from the budget last time and you weren\'t there. I noticed that."',
      '"Stay a while. This is the best part of my day, and it isn\'t close."',
      "\"Botanical garden run today. Rui's the expert, not me, but don't tell Mio I said that.\"",
      "\"You stayed up too late again, didn't you. Sit down. I'm making you honey tea whether you ask or not.\"",
      '"Leadership meeting with Mio in a bit. I think we both take on too much. Don\'t repeat that."',
      '"I finished early today. On purpose."',
      "\"The circus troupe listens to everything I say. You're the only one who argues back. I don't mind it.\"",
      '"Come to the school building with me. The teachers can wait a minute longer than usual."',
      '"You\'re rare, you know. Never needed a thing from me. I still catch myself waiting for it."',
      '"Gathering research for new costumes. Want to see what I\'ve found so far?"',
      '"Don\'t look so surprised when I make time for you. I do it on purpose now."',
      '"I saved you the good seat. The one without three weeks of paperwork on it."',
      '"Long day? Sit. I\'ll deal with the rest of this later, for once."',
      "\"I'm not going to pretend the jog is just exercise anymore. You're half the reason I get up for it.\"",
      "\"Twice now you've caught me somewhere else in my head. I'll tell you eventually.\"",
    ],
    spark: [
      "\"Stay after everyone's gone home. I'm not done with you, and the budget can wait.\"",
      '"Every night I look for you first. Every single night. Do with that what you like."',
      "\"Come here. Closer. I've spent all day being reasonable and I'm done with it.\"",
      '"That look you give me. Say what you mean by it, cutie. Out loud."',
      '"No proposal, no lineup, no one to keep steady but you. I thought I was past feeling like this."',
    ],
    close: [
      '"With you, I don\'t need to perform. I can just be myself."',
      "\"Every version of me is yours. That's not a line. I've checked.\"",
      "\"Sit with me a while after the work's put away. It's my favorite part of the day now.\"",
      '"You looked at me tired and unglamorous and stayed anyway. Nobody else does that."',
      '"Ask me to stop working and I will. That\'s how much you have."',
    ],
    bound: [
      '"Come to bed. The lights are down and I\'m all out of brilliance."',
      '"I love you. Every version of me does. I\'ve polled them."',
      '"Stay till the theater\'s cold. Then stay longer."',
      '"Undress me. No, slowly. I\'m a performer, I have standards."',
      '"You\'ve seen me with the paint off. Nobody else gets that. Nobody."',
    ],
  },
  approach: {
    new: [
      "Pull up a chair",
      "Let the paragraph finish",
      "Cut through the charisma",
      "Ask what's buried on that desk",
    ],
    known: [
      "Take the cleared seat",
      "Give an honest read",
      "Interrupt the paperwork",
      "Answer to 'cutie'",
    ],
    warm: [
      "Take the saved seat",
      "Ride along at sunset",
      "Insist on a break",
      "Match the easy charm",
    ],
    spark: [
      "Take the passenger seat",
      "Say what you mean",
      "Let the work wait",
      "Take the offered hand",
    ],
    close: [
      "Go to them",
      "Free them from the work",
      "Say it can be handed off",
      "Stay past the sunset",
    ],
    bound: [
      "Come to bed",
      "Steal the car keys",
      "Leave the work till morning",
      "Say it back",
    ],
  },
  responses: {
    kind: {
      new: [
        "Admire how they command a room",
        "Thank them for making the time",
        "Say the work can wait",
      ],
      spark: [
        "Say what you meant by it",
        "Take the hand they offered",
        "Tell them they do too much",
      ],
      close: [
        "See the tired under the charm",
        "Tell them to share the burden",
        "Say they needn't manage alone",
      ],
      bound: [
        "Say it back",
        "Set the pen down for them",
        "Tell them they can rest now",
      ],
    },
    playful: {
      new: [
        "Match the easy charm",
        "Tease them about the paperwork",
        "Say 'cutie' first",
      ],
      spark: [
        "Steal the car keys",
        "Tease them out of the office",
        "Answer 'cutie' with 'cutie'",
      ],
      close: [
        "Drag them from the desk",
        "Demand the scenic route",
        "Out-charm them for once",
      ],
      bound: [
        "Make them leave the work",
        "Take the wheel",
        "Keep them away from it",
      ],
    },
    bold: {
      new: [
        "Meet the charisma head-on",
        "Name what you want",
        "Ask them to work less for you",
      ],
      spark: [
        "Get in the passenger seat",
        "Tell them you want this",
        "Take their hand first",
      ],
      close: [
        "Tell them it runs itself",
        "Hold their hand openly",
        "Say the work can wait for you",
      ],
      bound: ["Take them to bed", "Drive off with them", "Say it first"],
    },
    neutral: {
      new: [
        "Simply be present",
        "Let the page get finished",
        "Sit while they work",
      ],
      spark: [
        "Ride along in silence",
        "Let the moment pass",
        "Stay in your seat",
      ],
      close: [
        "Keep them company at the desk",
        "Sit through their to-do list",
        "Stay after the others leave",
      ],
      bound: [
        "Leave the docket till morning",
        "Watch the sunset in quiet",
        "Say nothing",
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
      '"A new face." **{name}** looks up from the budget for {user} and doesn\'t look back down.',
      "{user} says the name, and **{name}** turns the charisma on like a stage light.",
      '"Come on over, cutie." **{name}** greets {user} as though their schedule weren\'t already full.',
    ],
    warm: [
      '"You\'re back!" **{name}** forgets whatever he was signing. {user} did that.',
      "{user} calls out, and **{name}** puts the pen down mid-signature.",
      "\"I'm driving the Aqua-line later, cutie. Come with.\" **{name}** isn't really asking {user}.",
    ],
    spark: [
      "**{name}** hears his name, and the professional smile becomes a real one for {user}.",
      '"Proposal, schedule, budget... and yet here I am." **{name}** is walking over to {user} regardless.',
      "{user} got there first, and **{name}** looks caught.",
    ],
    close: [
      "**{name}** takes the paint off for {user}, right there in the middle of everyone.",
      '"No. I\'m taking you home." **{name}** says it to {user}.',
      "{user} calls, and **{name}** clocks off.",
    ],
    bound: [
      '"No audience," **{name}** murmurs, reaching {user}. "Only you."',
      "**{name}** hands the **{house}** program to Mio without explaining. {user} called.",
      "{user} says the name, and every version of **{name}** answers to it.",
    ],
  },
};
