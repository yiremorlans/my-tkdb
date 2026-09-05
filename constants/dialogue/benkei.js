export default {
  // The level-up DMs (docs/bond-scene-dms.md).
  //
  // SOURCE NOTE: reference.md now carries a (short) entry for Benkei. Everything
  // below is written to stay inside it: shopkeep at Darkwick's campus store,
  // former professor and advisor to the now-defunct Clementia House and Ultio
  // House, kind hearted, warm and gentle smile, managed day-to-day by one of
  // Cornelius' cats. No age is established, no name for anyone but himself, and
  // no reason either house ended. None of that is invented here.
  //
  // The one piece of connective tissue added on top of canon: a man who used to
  // be responsible for a whole house of people, now answers to a cat, and is
  // still working out whether that was a demotion or a mercy. That throughline
  // is interpretation, not established fact, but it's the thread every scene
  // below pulls on.
  bondScenes: {
    acquaintance: {
      beats: [
        "**{firstName}**: Ah, hello. It's Benkei, from the shop. I hope you don't mind the message. My manager insisted, and when your manager is a cat, you learn not to argue.",
        "There's a shelf under the counter with a few things set aside on it. Nothing dramatic. I just noticed you actually read the labels instead of grabbing and going, and I don't get many people who do that.",
      ],
      choice: {
        prompt: "Do come by and collect it. I'd rather it not just gather dust.",
        options: [
          {
            key: "kind",
            label: "Say you'll come by soon",
            style: 3,
            close: "Oh, good. Good.\n\nI'll tidy up a little. Not that it needs tidying.",
          },
          {
            key: "playful",
            label: "Ask what's on the shelf",
            style: 1,
            close: "That would rather spoil it, wouldn't it.\n\n*He almost smiles.* Come and see.",
          },
          {
            key: "bold",
            label: "Ask why you got noticed",
            style: 4,
            close: "Would you like the honest answer? You're the only person who's ever asked to meet the cat.\n\nShe was flattered. I don't believe cats are meant to be flattered, but there it is.",
          },
        ],
      },
      keepsake: {
        emoji: "🏷️",
        line: "A shelf under the counter, kept for someone who reads the labels.",
      },
    },

    friend: {
      beats: [
        "**{firstName}**: May I say something, and will you let an old habit of plain speaking through?",
        "You've got {favResponse} for me every time you come in, and you talk to me like I'm a person and not part of the shelving. I spent a long while being called \"Professor\" by people who mostly wanted something from me. This is a different thing entirely, and I don't think you know you're doing anything unusual by it.",
      ],
      choice: {
        prompt: "There. Said. You needn't answer, I shan't be offended.",
        options: [
          {
            key: "kind",
            label: "Say he's worth talking to",
            style: 3,
            close: "Oh, now.\n\n*A rather long silence.*\n\nThank you. I shall be turning that over for a good while, which is more than I've gotten out of most conversations lately.",
          },
          {
            key: "playful",
            label: "Say the shelf listens well",
            style: 1,
            close: "It does! Excellent listener. Never once interrupts.\n\n...That was funnier than it had any right to be. You'll have to stop doing that, I'm out of practice laughing in an empty shop.",
          },
          {
            key: "bold",
            label: "Ask if he misses the title",
            style: 4,
            close: "Sometimes.\n\n*He doesn't dress it up at all, which he usually would.* Not the standing at the front of a room. The being needed for something particular. I've made my peace with it. Mostly.",
          },
        ],
      },
      keepsake: {
        emoji: "🫖",
        line: "The first real conversation in a good while that wasn't with the shelf.",
      },
    },

    closeFriend: {
      beats: [
        "**{firstName}**: Come by after closing, if you would. I've something at the back I'd like to show somebody, and I've been waiting for the right somebody to show it to.",
        "*The back room has a drawer that doesn't get opened often. He opens it carefully.*\n\n*It's two pins, one crimson-trimmed and one iron-gray, and a photograph gone soft at the corners.*",
        "> That one's Clementia's. That one's Ultio's. I advised them both, in their time, and neither house exists anymore, so there's nobody left who asks after them.\n\n> You've been coming around a good while now. I decided you were somebody who might actually want to see it, rather than just be polite about it.",
      ],
      choice: {
        prompt: "Say if I've misjudged that. I've a thick skin and I'd rather know.",
        options: [
          {
            key: "kind",
            label: "Ask to hear about them",
            style: 3,
            close: "*He turns the pins over in his hand for a moment.*\n\n> All right.\n\n*he says, to the drawer as much as to you.*\n\n> All right, then.\n\n*He doesn't put them away that night.*",
          },
          {
            key: "playful",
            label: "Ask which house was worse",
            style: 1,
            close: "> Ultio, without question. Clementia at least pretended to listen to me.\n\n*He says it fondly.*\n\n> I've missed being exasperated by a whole house of people. It's a very particular kind of tired.",
          },
          {
            key: "bold",
            label: "Ask if that's a lonely thing",
            style: 4,
            close: "*He goes quiet for a moment, turning the photograph rather than looking up.*\n\n> Yes.\n\n*he says simply.*\n\n> I hadn't said that plainly to anyone before. I'm glad it's said now.",
          },
        ],
      },
      keepsake: {
        emoji: "📌",
        line: "Two house pins from houses that don't exist anymore, out of their drawer for someone who actually asked.",
      },
    },

    confidant: {
      beats: [
        "**{firstName}**: It's late, and I'm going to say a thing I don't say, and I'd ask you not to be kind about it straight away. Let it sit a moment first.",
        "I used to be responsible for an entire house of people. Advising them, arguing with them, worrying over the ones who skipped breakfast. And now I'm responsible for a shelf of snacks and a schedule set by a cat, and most days I don't mind that at all, which is the part that troubles me.",
        "I've turned it over a great many times: whether it was a demotion or a mercy. I still don't know. I only know I've never said any of that aloud before, and I'm saying it to you because you're the one who actually asks how I'm doing, rather than what I've got in stock.",
      ],
      choice: {
        prompt: "There. Go on. I've braced myself and everything.",
        options: [
          {
            key: "kind",
            label: "Say it sounds like both",
            style: 3,
            close: "Both.\n\n*He tests the word.* Yes. I think that's probably the honest shape of it. Thank you for not making me choose.",
          },
          {
            key: "playful",
            label: "Say the cat has good taste",
            style: 1,
            close: "She'd agree with you, and never let me hear the end of it.\n\n*A real, surprised laugh.* I needed that more than I expected.",
          },
          {
            key: "bold",
            label: "Ask if he misses Professor",
            style: 4,
            close: "*A longer pause than the question wants.*\n\nSome days. Less than I thought I would, and that frightens me a little, if I'm honest.",
          },
        ],
      },
      keepsake: {
        emoji: "🗝️",
        line: "The truth about the shelf and the cat, told plainly for the first time.",
      },
    },

    devoted: {
      beats: [
        "**{firstName}**: You'll have heard about this by now. I'd rather you heard it from me, and I'd rather you didn't hear a heroic version of it, because there isn't one.",
        "There was a man in the shop at closing who oughtn't have been there, and he'd come in about you, and I asked him to leave. He didn't. So I stood in the doorway and used a voice I haven't needed since I stopped being anyone's advisor.",
        "He went. They generally go, when somebody won't move and means it. And I've been sitting in the back since, rather surprised at myself, because I'd assumed that part of me had gone quiet along with the title.",
      ],
      choice: {
        prompt: "Now don't fuss. I've had quite enough fussing already today.",
        options: [
          {
            key: "kind",
            label: "Fuss anyway",
            style: 3,
            close: "> I said not to.\n\n*He lets you, though. He doesn't argue about a single thing.*\n\n> It's nice.\n\n*he admits eventually.*\n\n> Being looked after. I'd nearly forgotten what that felt like from this side of it.",
          },
          {
            key: "playful",
            label: "Ask if he did the stern voice",
            style: 1,
            close: "> I did a tremendous voice. Advising a house teaches you exactly one, but it's a good one.\n\n*He looks unbearably pleased with himself, and there's been nobody to tell until now.*",
          },
          {
            key: "bold",
            label: "Tell him not to do it again",
            style: 4,
            close: "> No.\n\n*Flat, with none of the usual fluster in it.*\n\n> Anything else you ask of me, I'll do. Not that one.\n\n*Then, gentler:*\n\n> Come sit down. I've put the kettle on.",
          },
        ],
      },
      keepsake: {
        emoji: "🚪",
        line: "A doorway held by someone who thought that part of him had gone quiet.",
      },
    },

    soulbound: {
      beats: [
        "**{firstName}**: I've written this out because I think better with a pen, and I'm reading it back to you word for word so I don't lose my nerve partway through.",
        "{timesMet} times you've come through that door. I've kept count without meaning to, and there's a thing on the shelf for every single one, and I couldn't bring myself to throw out a single one of them.",
        "I'm not a young man, and I'd like that said plainly before anything else, because I've spent a long while treating it as a reason to stay quiet rather than a reason to say something sooner.",
        "So here it is, and then I'll put the kettle on and let you think.\n\nI love you. I ran two houses into the ground, or watched them go, at any rate, and ended up answering to a cat, and I did not expect any part of that story to lead here. I'm glad it did. There's no expectation in this. I'd simply rather you knew than let another year pass with it unsaid.",
      ],
      choice: {
        prompt: "Take whatever time you need. The kettle's on and the shop isn't going anywhere, and neither am I.",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close: "*He doesn't reply right away, which isn't like him.*\n\n*When you get to the shop the door's unlocked, and he's standing behind the counter with the page still in his hand, clearly having stood there a while.*\n\n> Say it here.\n\n*he says.*\n\n> Where I can see you say it.\n\n*Afterward he holds both your hands across the counter and doesn't manage another word for quite some time.*",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close: "Of course. Of course, take it. I'd think rather less of you if you didn't.\n\nAnd I want to be clear, because I know how these things can curdle: nothing changes. The shelf stays. There'll be something set aside on Thursday same as every Thursday, and I'll be glad to see you regardless. None of this was ever a bid for anything back.",
          },
        ],
      },
      keepsake: {
        emoji: "🧾",
        line: "The page he read back word for word so he wouldn't lose his nerve.",
      },
    },
  },
  dialogue: {
    new: [
      'He looks up from restocking, a little flustered, and gives you a warm, gentle smile. "Oh! Hello. Can I help you find something?"',
      '"That\'s my manager," he says, nodding at a cat asleep on the counter, like it explains everything. It somehow does.',
      "He's carrying far too much and insists it's no trouble at all.",
      "He starts to say something, thinks better of it, and offers you a snack instead.",
      "There's a kindness to him that feels worn in, like it's had a long career to settle into.",
    ],
    known: [
      "He knows your name, and says it like he's glad of the chance to.",
      "He's stopped asking whether you need help. He just starts helping.",
      "There's something set aside on the counter, like it's been waiting for you specifically.",
      '"You\'re one of the ones who says thank you," he says. "I notice that."',
      "Even the cat seems to tolerate you, which he says is rare praise.",
    ],
    warm: [
      'He gets a bit red in the face when he sees you, but his smile stays warm and gentle. "You came back! What can I get you?"',
      "He's set something aside for you. He's started doing that most days, just in case.",
      '"You\'d have made a good student," he says, then looks briefly startled that he said it out loud.',
      "He fusses over whether you're eating enough, then apologizes for fussing.",
      "He remembers exactly what you asked about last time, down to the detail.",
    ],
    spark: [
      "He goes red to the ears and busies himself with something that needed no attention.",
      "He steadies you by the elbow, and takes a long moment letting go.",
      "\"Ah, I've been meaning to say... no, it'll keep. It'll keep.\"",
      'He\'s clearly rehearsed something. What comes out is "you look nice today."',
      "He walks you to the gate and finds three reasons to walk slower.",
    ],
    close: [
      '"You\'re really important to me," he says softly, a hint of bashfulness in his voice. "I\'m always happy to help you with anything you need."',
      "He tells you a story from his advising days that he doesn't tell anyone else.",
      '"Don\'t push yourself so hard," he says gently. "Somebody ought to say it."',
      "He's quietly made your life easier in three ways this week and mentioned none of them.",
      "He looks at you the way someone looks at a reason to be glad about where they ended up.",
    ],
    bound: [
      "He still goes red. He's stopped letting it stop him.",
      "He kisses your forehead every morning like it's a small ceremony he takes seriously.",
      '"I\'d made my peace with a quiet life," he admits. "You\'ve ruined that rather thoroughly."',
      "He holds you carefully, like something he's been trusted with and means to deserve.",
      "He's old-fashioned about all of it, and it turns out that's rather lovely.",
    ],
  },
  temperamentDialogue: {
    new: [
      '"Oh! H-hi there. Need a hand with something?"',
      '"Careful, that shelf\'s got opinions of its own."',
      '"New around here? It\'s a strange school. It grows on you."',
      '"My manager\'s a cat, if you\'re wondering about the sign."',
      '"Anything you need carried, just say the word."',
    ],
    known: [
      '"Oh, you\'re back. Good, good. I set something aside, hang on."',
      "\"Don't carry that yourself, I've got two good arms doing nothing.\"",
      '"You always say thank you. Not everyone does, you know."',
      "\"Eating properly? Ah, sorry, that was forward of me.\"",
      '"Take it. No charge. I\'d only have eaten it myself."',
    ],
    warm: [
      "\"You're back! I'm glad. What can I do for you?\"",
      '"Set that down, I\'ll take it. No arguing."',
      "\"I kept this aside for you. Wasn't sure you'd come. Glad you did.\"",
      '"Warm enough? Here, take mine."',
      '"Good to see a friendly face. Been a long day."',
    ],
    spark: [
      "\"You look... ah. Very nice. That's what I meant to say.\"",
      '"I\'m too old for this kind of nervous, and here we are."',
      "\"Let me walk you back. It's dark. That's the only reason.\"",
      '"I\'ve been meaning to tell you something. Give me a moment to find my nerve."',
      '"You make an old shopkeep feel rather silly. I don\'t mind it."',
    ],
    close: [
      '"You mean a great deal to me. I\'d do anything to help you."',
      '"Sit with me a bit. The shop can spare me a few minutes."',
      "\"You've been running yourself ragged. Don't think I haven't noticed.\"",
      "\"I've watched a lot of students come and go. You're the one I'll remember.\"",
      "\"Whatever it is, bring it here first. That's what I'm for.\"",
    ],
    bound: [
      '"Come here. Let me look at you a moment."',
      '"I love you. Took me far too long to say that plainly."',
      "\"Stay a while? I won't pretend I don't want you to.\"",
      "\"You make me feel young and foolish. I've decided I don't mind.\"",
      '"Sit with me. Just here. That\'s all I want, most days."',
    ],
  },
  approach: {
    new: [
      "Offer to help carry",
      "Accept the snack",
      "Say hello",
      "Mind the shelf",
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
    bound: ["Come here", "Stay a while", "Sit with him", "Say it back"],
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
        "Let him find his nerve",
      ],
      close: [
        "Let him care for you",
        "Tell him to rest too",
        "Say he's been noticed",
      ],
      bound: [
        "Say it back",
        "Let him look at you",
        "Tell him he's not foolish",
      ],
    },
    playful: {
      new: [
        "Fluster him on purpose",
        "Tease him about fussing",
        "Ask for a second snack",
        "Catch him mid-apology",
      ],
      spark: [
        "Make him say it again",
        "Slow down to watch him",
        "Tease the blush",
        "Make him lose his nerve",
      ],
      close: [
        "Match his dry humor",
        "Tease him about the shop",
        "Make him laugh out loud",
        "Needle him for a rise",
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
        "Rest in the quiet",
        "Sit and say nothing",
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
      '{user} says the name, and **{name}** goes red to the ears. "You... you remembered?"',
      'A cat watches with total disdain as **{name}** waves {user} over. "Don\'t mind her," he says. "She\'s the manager."',
    ],
    warm: [
      '"You came back!" **{name}** beams at {user} and immediately offers to carry something.',
      "{user} calls out, and **{name}** sets down the crate he'd been managing badly.",
      "**{name}** had put something aside for {user}. He does that most days now, just in case.",
    ],
    spark: [
      "**{name}** goes red, apologizes for going red, and stays exactly where {user} can see him.",
      '"You\'d have made a good student," **{name}** tells {user}, then looks startled he said it aloud.',
      "{user} says the name, and **{name}** forgets the whole afternoon's restocking list.",
    ],
    close: [
      '"Come here. Let me look at you a moment." **{name}** means it to {user} kindly. Mostly.',
      "**{name}** hears {user}, and every ache of the day goes somewhere else.",
      "{user} calls, and **{name}** walks the long way round with them, just to have the time.",
    ],
    bound: [
      '"I\'d made my peace with a quiet life," **{name}** tells {user}. "You\'ve ruined that rather thoroughly."',
      "**{name}** kisses {user}'s forehead in front of half the campus, like a small ceremony he takes seriously.",
      "{user} says the name, and **{name}** stops going red about it. Mostly.",
    ],
  },
};
