export default {
  // The level-up DMs (docs/bond-scene-dms.md). Jo runs a house of eccentrics and
  // has never once been asked how he is; the arc is somebody finally asking and
  // him not having an answer ready. He calls you "cutie" as a way of keeping the
  // register light, and the top of the ladder is the first message where he
  // doesn't do it.
  bondScenes: {
    acquaintance: {
      beats: [
        "**{firstName}**: Hey, cutie. Hope this isn't a strange hour. I've stopped being able to tell which hours are strange.",
        "Quick thing and then I'll leave you alone. You came through the hall on Tuesday while I was dealing with three separate crises and you didn't add a fourth.\n\nThat's it. That's the whole compliment. {timesMet} times you've been in this house and not once have you needed something from me, and I would like you to understand that in Dionysia, that makes you rare. Precious, even, and I don't say that lightly.",
      ],
      choice: {
        prompt: "Anyway. How are you? And answer properly, I'll know.",
        options: [
          {
            key: "kind",
            label: "Ask him back",
            style: 3,
            close:
              "Ha. Nice try.\n\n*A pause. A long one, for someone whose whole job is having an answer ready.*\n\n...Tired. That's the honest one. Don't tell Mio, he'll build me something.",
          },
          {
            key: "playful",
            label: "Offer to be crisis four",
            style: 1,
            close:
              "Don't you dare. I've got a system and it does not have room for a fourth.\n\n...Although. If you were the fourth I'd probably enjoy the day more. Forget I said that, I'm running on about two hours.",
          },
          {
            key: "bold",
            label: "Say you'd need something",
            style: 4,
            close:
              "Oh, would you.\n\n*There's real interest in it, the first thing in the whole message that isn't managed.*\n\nWell. Ask, then. I'd like to see what it does to me, and I don't get many chances to find that out.",
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
        "I adapt. It's what I do: I read a room and I become the version of me that room needs, and I've been doing it so long I couldn't tell you where the seam is any more. On stage, in the hall, with Shion, with the board. Different man every time and all of them mine.\n\nYou come at me with {favResponse} no matter which one you're getting. Same every time. And it's started to feel like being addressed by name in a room where everyone else is calling me by a job.",
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
              "*There is no reply for some minutes.*\n\nNobody's ever said that to me.\n\nThey've said \"be yourself\", which is different. That's a compliment with nothing in it. You said stop, which is an instruction, and I don't get given those.\n\nI don't know how yet. But I noticed you said it.",
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
        "**{firstName}**: Five thirty. The east gate. Don't be late and don't ask why.",
        "*It's still dark. He's in a hoodie and running shoes with none of the artifact on him at all, and he looks about six years younger and considerably less finished.*\n\n> This is the jog. Every morning, five thirty, an hour, alone. It's the only part of the day nobody has an opinion about.",
        "*You run. He doesn't talk for the first twenty minutes, which from Jo is unheard of.*\n\n*Somewhere near the water he says, without slowing down:*\n\n> I've done this alone for six years. Mio's asked. Haru's asked twice. I said no both times without even thinking about it.\n\n> Then I thought about asking you and I couldn't come up with a single reason not to, which frankly alarmed me.",
      ],
      choice: {
        prompt: "Well? Verdict. And be honest, you're wheezing.",
        options: [
          {
            key: "kind",
            label: "Ask to come tomorrow",
            style: 3,
            close:
              "*He does actually stop running for a second.*\n\n> ...Yeah. All right.\n\n*He doesn't say anything else about it. But the next morning he waits at the gate rather than starting without you, and every morning after that.*",
          },
          {
            key: "playful",
            label: "Say he set the pace wrong",
            style: 1,
            close:
              "> I set it *low*, cutie. That was the courteous pace.\n\n> ...Fine. Tomorrow I'll set it properly and you can find out what I actually do out here. Bring water. I'm serious about the water.",
          },
          {
            key: "bold",
            label: "Ask what he thinks about",
            style: 4,
            close:
              "*He runs another hundred meters before answering.*\n\n> Nothing. That's the point of it.\n\n*Then:*\n\n> That was a lie and you'd have let me get away with it. Everybody in the house. Every single one of them, one at a time, for an hour, and then I go back in and do the day.\n\n> You were in it this morning. That's new, and I haven't decided what to do about it.",
          },
        ],
      },
      keepsake: {
        emoji: "👟",
        line: "A gate he started waiting at instead of running from.",
      },
    },

    confidant: {
      beats: [
        "**{firstName}**: I'm going to tell you a thing about this house and then I'd like you to forget I have a title.",
        "Shion's had a bad week. Mio's covering and pretending he isn't tired. Elias is doing three jobs and calling it errands so nobody has to say the word demotion.\n\nI hold all of that. That's not a complaint, it's an inventory. I chose it, I'd choose it again, and I'm good at it.",
        "Here's the part I've never said.\n\nI don't know if any of them like me. I know they need me. I've built an entire life out of being needed because it's load-bearing and being liked is not, and somewhere in the last six years I stopped being able to tell the difference from the inside.\n\nAnd then there's you, who has never needed a single thing from me, and keeps turning up anyway, and I have genuinely no idea what to do with that. I run an hour a morning thinking about it.",
      ],
      choice: {
        prompt: "Go on. You're the only person I could ask.",
        options: [
          {
            key: "kind",
            label: "Tell him you like him",
            style: 3,
            close:
              "*There's a very long gap.*\n\n...Say that in the morning too. When I'm not like this.\n\nI want to find out if I can hear it when I'm the competent one. I don't think I can. I'd like to be wrong.",
          },
          {
            key: "playful",
            label: "Say you're here for the jog",
            style: 1,
            close:
              "The jog. Six years of holding this house together and you're in it for cardio.\n\nThat's the funniest thing anyone's said to me in a month and I needed it more than the sincere version. Thank you, cutie. Genuinely.",
          },
          {
            key: "bold",
            label: "Tell him to ask them",
            style: 4,
            close:
              "Absolutely not.\n\n...Because I'd have to survive the answer, and I've built the whole thing on not needing one.\n\nYou'd ask, wouldn't you. You'd just walk in and ask. God. I've spent six years being impressed by nobody and now this.",
          },
        ],
      },
      keepsake: {
        emoji: "📋",
        line: "An inventory of everyone he carries, with himself left off it.",
      },
    },

    devoted: {
      beats: [
        "**{firstName}**: I canceled the show.",
        "Full house. Two months of rehearsal. Board's furious, Romeo's going to bill me for the room, and I have not canceled a performance in nine years, not for illness, not for a funeral, not once.\n\nYou were in the lower halls when it went wrong and nobody could tell me where. So I put the artifact down mid-transformation in front of a hundred and forty people and I walked off, and I did not think about it. That's the part I want you to have: I did not think about it.",
        "I've spent my whole life being the one who decides what gets sacrificed. I'm extremely good at it. I've sacrificed sleep, friendships, four years of my twenties, and I've never once resented any of it.\n\nTonight somebody else did the deciding and it wasn't me, and it turns out that person is you, and you weren't even in the room.",
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
              "*He's at the door before you've finished, still half in costume with the paint smudged, having very clearly walked straight there.*\n\n*He doesn't say anything for a while. He just puts both hands on your shoulders, holds you at arm's length to check, and then gives up entirely and pulls you in.*\n\n> Nine years,\n\n*he says into your hair.*\n\n> Nine years and one of you.",
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
        "I adapt to everybody. I told you that months ago and you told me to stop and I said I didn't know how.\n\nI've worked out that I do know how. I know exactly how. It's this: it's whoever I am at six in the morning halfway round the water with no artifact on and nothing to run. That's the seam. You've been looking at it for a year.",
        "So: I love you.\n\nNot the captain, not the Venus of Dionysia, not whichever version the room ordered. The one who's out of breath and hasn't got a line ready.\n\nYou can take that at whatever speed you like. I've spent nine years making decisions for a house full of people. I'm quite happy to not make this one.",
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
        "He's buried in paperwork: proposals, schedules, a budget that won't balance. He looks up anyway.",
        '"Anything troubling you, cutie? If you run into any problems, just come talk to me."',
        "The charisma lands before he's said a word. Running Dionysia hasn't dulled it.",
        '"You look pretty busy. I\'ll get some work done. Holler if you need anything."',
      ],
    },
    known: {
      uniform: [
        '"You came back." He sets down the pen like he\'d been looking for an excuse.',
        '"House meeting with Mio in a minute. You think we shoulder too much? It\'s just quicker to handle it ourselves."',
        "He works something small you mentioned once into the conversation like it's nothing.",
        '"Have you seen Elias, cutie? Asked him to do something and he\'s still not back..."',
        '"Elias is back, so we\'re stealing a coffee break before I lose the afternoon to that budget. Join us, cutie."',
      ],
      casual: [
        '"You came back." He sets down the pen like he\'d been looking for an excuse.',
        '"House meeting with Mio in a minute. You think we shoulder too much? It\'s just quicker to handle it ourselves."',
        "He works something small you mentioned once into the conversation like it's nothing.",
        '"Have you seen Elias, cutie? Asked him to do something and he\'s still not back..."',
        '"Elias is back, so we\'re stealing a coffee break before I lose the afternoon to that budget. Join us, cutie."',
      ],
    },
    warm: {
      uniform: [
        "He lights up the moment he sees you, whatever he was signing forgotten.",
        '"I\'m driving the Aqua-line later to catch the sunset. Come with, cutie."',
        '"My people march to the beat of their own drum. You\'ve fit right in with that."',
        '"There\'s just not enough hours in the day." He says it, then makes an hour for you.',
        "\"There's a coffee with your name on it and fifteen minutes I'm refusing to spend on anything else. Sit with me, cutie.\"",
      ],
      casual: [
        "He lights up the moment he sees you, whatever he was signing forgotten.",
        '"I\'m driving the Aqua-line later to catch the sunset. Come with, cutie."',
        '"My people march to the beat of their own drum. You\'ve fit right in with that."',
        '"There\'s just not enough hours in the day." He says it, then makes an hour for you.',
        "\"There's a coffee with your name on it and fifteen minutes I'm refusing to spend on anything else. Sit with me, cutie.\"",
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
        "The even, easy voice he keeps for everyone else slips. What's under it is only for you.",
        "He was fitting a costume on you. Somewhere in it his hands stopped being a stylist's.",
        '"That look," he says, the schedule forgotten. "Do it again. I want to be sure."',
        '"I thought I was done feeling like this," he admits. "So, what are you going to do about it?"',
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
        "For you he'd put down the proposal, the schedule, all of it, and just be a person for an hour.",
        "The work is finally done for the night. He doesn't reach for more. He stays.",
        "He's stopped asking which version of him you prefer. You never did have a favorite.",
        '"No audience tonight," he says softly. "Just you. That\'s better anyway."',
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
        "Nothing is scheduled, nothing is owed. For once he is entirely off the clock, and stays there.",
        "He takes the paint off and lets you see the tired underneath, and doesn't put it back.",
        '"No audience," he murmurs against your neck. "Only you. Only ever you."',
        "He isn't managing anyone or performing anything, which is the most extraordinary thing he's done.",
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
    known: [
      '"Twice now, cutie. You\'re becoming a regular around here."',
      '"Sit anywhere. Mind the paperwork... actually, don\'t. It can suffer."',
      '"Tell me honestly what you thought. No, actually honestly."',
      '"I noticed you noticing. Don\'t stop."',
      '"House meeting with Mio soon. Between us, we probably do shoulder too much."',
    ],
    warm: [
      "\"You're back! I was hoping you'd return.\"",
      "\"I'm driving the Aqua-line at sunset. Come with me, cutie. Don't argue.\"",
      '"Proposal, schedule, program, budget... and yet here I am, making time for you."',
      '"I looked up from the budget last time and you weren\'t there. I noticed that."',
      '"Stay a while. This is the best part of my day, and it isn\'t close."',
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
        "Close the laptop for them",
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
      '"Come on over, cutie." **{name}** greets {user} as though the schedule weren\'t already ruined.',
    ],
    warm: [
      '"You\'re back!" **{name}** forgets whatever he was signing. {user} did that.',
      "{user} calls out, and **{name}** puts the pen down mid-signature.",
      "\"I'm driving the Aqua-line later, cutie. Come with.\" **{name}** isn't really asking {user}.",
    ],
    spark: [
      "**{name}** hears his name, and the professional smile becomes a real one for {user}.",
      '"Proposal, schedule, budget... and yet here I am." **{name}** is walking over to {user} regardless.',
      "{user} got there first, and **{name}** looks caught in the nicest possible way.",
    ],
    close: [
      "**{name}** takes the paint off for {user}, right there in the middle of everyone.",
      '"No. I\'m taking you home." **{name}** says it to {user} the way he never says anything.',
      "{user} calls, and **{name}**, who is never off the clock, clocks off.",
    ],
    bound: [
      '"No audience," **{name}** murmurs, reaching {user}. "Only you."',
      "**{name}** hands the **{house}** program to Mio without explaining. {user} called.",
      "{user} says the name, and every version of **{name}** answers to it.",
    ],
  },
};
