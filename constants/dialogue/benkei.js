export default {
  // The level-up DMs (docs/bond-scene-dms.md).
  //
  // SOURCE CAVEAT, same as the note on his entry in constants/characters.js:
  // Benkei has no section in reference.md and no voiceline script. These scenes
  // are extrapolated from his tiered dialogue above — the fluster, the things
  // set aside on the counter, the "you remind me of someone" he never finishes —
  // and from nothing else. Confirm against canon before treating any detail here
  // as established, particularly the person he is nostalgic about.
  //
  // He is much older than everyone else in this game and the scenes are written
  // to know it: the intimacy is careful, unhurried, and always slightly braced
  // for being told it isn't wanted.
  bondScenes: {
    acquaintance: {
      beats: [
        '**{firstName}**: "Ah, hello. It\'s Benkei. From the shop. I hope this is all right; the young man who set this up for me assured me it was, but he assures me of a great many things."',
        "\"I've been putting something aside for you. Not today. For a while now. There's a shelf under the counter and it's got rather more on it than I'd like to admit.\"\n\n\"You've been in {timesMet} times and you say thank you every single one. I remember the ones who say thank you. I've been doing this a long while and it's a shorter list than you'd think.\"\n\n\"That's all. That's the whole message. I did draft a longer one.\"",
      ],
      choice: {
        prompt: "\"Do come and take it off my hands. It's getting to be a fire hazard.\"",
        options: [
          {
            key: "kind",
            label: "Say you'll come tomorrow",
            style: 3,
            close: "\"Oh, good. Good!\"\n\n*A pause.*\n\n\"I shall tidy. There's no need for me to tidy. I'm going to tidy.\"",
          },
          {
            key: "playful",
            label: "Ask how big the shelf is",
            style: 1,
            close: "\"It's a normal shelf.\"\n\n\"...It was a normal shelf. It has become a project. Please come before it becomes a second shelf.\"",
          },
          {
            key: "bold",
            label: "Ask why you got a shelf",
            style: 4,
            close: "*There's a longer pause than the question wants.*\n\n\"Because you looked at the old things,\" *he says.* \"Not the new stock. The old things at the back that nobody's asked about in eleven years.\"\n\n\"I'd rather forgotten what that felt like. Good night, now.\"",
          },
        ],
      },
      keepsake: {
        emoji: "🏷️",
        line: "A shelf under the counter that was only meant to hold one thing.",
      },
    },

    friend: {
      beats: [
        '**{firstName}**: "May I say something, and will you forgive an old man for saying it badly?"',
        "\"You've got {favResponse} for me every time you come in. Every time, without fail, and I've noticed because it doesn't happen much at my age.\"\n\n\"People are perfectly polite. I'm not complaining. The students here are better than they're given credit for. But there's a way of being polite to somebody old that's really just being polite to the counter, and I've had about thirty years of it and I stopped minding a long while ago.\"\n\n\"You talk to me. Not to the counter. I don't think you know you're doing anything unusual.\"",
      ],
      choice: {
        prompt: "\"There. That's said. You needn't answer, I shan't be offended.\"",
        options: [
          {
            key: "kind",
            label: "Say he's worth talking to",
            style: 3,
            close: "\"Oh, now.\"\n\n*A rather long silence.*\n\n\"That's... well. Thank you. I shall be thinking about that on and off for a week, which is more than I've got out of most conversations this decade.\"",
          },
          {
            key: "playful",
            label: "Say the counter listens well",
            style: 1,
            close: "\"It is! It's an excellent listener. It's never once interrupted.\"\n\n\"...That was funnier than it ought to have been. You'll have to stop doing that, I'm out of practice at laughing in an empty shop.\"",
          },
          {
            key: "bold",
            label: "Ask what thirty years is like",
            style: 4,
            close: "\"Quiet.\"\n\n*He doesn't dress it up at all, which he usually would.*\n\n\"Quiet, and full of other people's beginnings. That's the job: they arrive, they're loud for four years, they go. You get very good at the goodbye bit and very rusty at the rest of it.\"",
          },
        ],
      },
      keepsake: {
        emoji: "🫖",
        line: "The first conversation in a decade that wasn't with the counter.",
      },
    },

    closeFriend: {
      beats: [
        "**{firstName}**: \"Come by after closing, if you would. I've something at the back I'd like to show somebody, and I've been waiting rather a long time for the right somebody.\"",
        "*The back room is full of boxes and one of them is old enough to have handwriting on it that isn't his. He opens it with a great deal of care.*\n\n*It's a photograph, and a folded paper crane gone yellow, and a pair of reading glasses with one arm mended.*\n\n\"That's the shop in its first year. That's me, the one looking terrified, and that's the woman who ran it before I did.\"",
        "\"She taught me the trade and put up with me and mended those about four times rather than let me buy new ones. She had views about waste.\"\n\n\"I've not had this box out in eleven years. It isn't sad, particularly. It's just that there's no one to get it out *for*. You can't show a box like this to a student who'll be gone by summer. It'd be a weight on them.\"\n\n\"You've been coming a good while now. I decided you weren't going by summer. I hope that wasn't presumptuous of me.\"",
      ],
      choice: {
        prompt: "\"Say if it was. I've a thick skin and I'd rather know.\"",
        options: [
          {
            key: "kind",
            label: "Say you're not going anywhere",
            style: 3,
            close: "*He busies himself with the box for rather a long time.*\n\n\"...Well,\" *he says, to the box.* \"Good. Good.\"\n\n*He doesn't put it away that night. It stays out on the back table, and it stays out for weeks.*",
          },
          {
            key: "playful",
            label: "Ask about the terrified face",
            style: 1,
            close: "\"I was twenty-two and I'd broken a whole crate on my first morning.\"\n\n\"She never let me forget it. Thirty years and she never once let me forget it, and I've been rather at a loss for someone to not let me forget things since.\"",
          },
          {
            key: "bold",
            label: "Ask who you remind him of",
            style: 4,
            close: "*He goes very still, because you have finished a sentence he has started in front of you perhaps a dozen times.*\n\n\"...Her,\" *he says.* \"Not the face. The way you go to the back of the shop first.\"\n\n\"I've been not saying that for about a year, in case it was a strange thing to put on a person. It probably is. I'm glad it's said.\"",
          },
        ],
      },
      keepsake: {
        emoji: "🕊️",
        line: "A paper crane gone yellow, out of its box for the first time in eleven years.",
      },
    },

    confidant: {
      beats: [
        "**{firstName}**: \"It's late and I'm going to say a thing I've never said to a living soul, and I'd ask you not to be kind about it straight away. Let it sit a moment first.\"",
        "\"I'm frightened of the summers.\"\n\n\"Every year the same. They come in, they're marvelous, they're loud, they're in and out of here four times a day for four years, and then it's summer and the shop's quiet and I go through the shelf under the counter and throw out the things I'd set aside for people who've gone.\"",
        "\"I've done that thirty times. I'm quite good at it. That's the part that troubles me: that I'm good at it.\"\n\n\"And this year I've been standing at that counter in March thinking about next summer, which I have never once done before, and I know precisely why and I've been refusing to look at it directly for months.\"\n\n\"There. It's said. You may be kind now.\"",
      ],
      choice: {
        prompt: "\"Go on. I've braced myself and everything.\"",
        options: [
          {
            key: "kind",
            label: "Say you'll still be here",
            style: 3,
            close: "\"You can't know that.\"\n\n*Then, after some minutes:* \"...No. Say it anyway. I've spent thirty years being sensible about this and I should like, just once, to be told something lovely and not immediately weigh it.\"",
          },
          {
            key: "playful",
            label: "Say you'll write from anywhere",
            style: 1,
            close: "\"A letter? An actual letter, on paper?\"\n\n\"Nobody's written me a letter since... well. A very long while. If you did that I should have to buy a frame, and then I'd be embarrassed about the frame, and then I'd keep it up anyway.\"",
          },
          {
            key: "bold",
            label: "Tell him to stop throwing out",
            style: 4,
            close: "\"Then the shelf never empties.\"\n\n*A pause.*\n\n\"...That's rather the point you're making, isn't it. Yes. All right. I shall stop throwing them out.\"\n\n\"I've kept yours anyway. All of it. Every single week's, since the beginning. I've been quietly not throwing yours out for about a year and telling myself I'd get to it.\"",
          },
        ],
      },
      keepsake: {
        emoji: "📦",
        line: "A year of set-aside things he never quite got round to throwing out.",
      },
    },

    devoted: {
      beats: [
        "**{firstName}**: \"You'll have heard by now. I'd rather you heard it from me, and I'd rather you didn't hear a heroic version of it, because there isn't one.\"",
        "\"There was a man in the shop at closing who oughtn't have been, and he'd come in about you, and I asked him to leave and he didn't, and so I stood in the doorway.\"\n\n\"That's all I did. I'm sixty-one and I've not raised a hand to anybody in forty years and I couldn't have done a thing if he'd pressed it. I simply stood in the doorway and was extremely stubborn.\"",
        "\"He went. They usually go, when somebody won't move.\"\n\n\"And I've been sat in the back since with a cup of tea going cold thinking about how badly that could have finished, and I find I don't mind. That's the part I wanted to tell you.\"\n\n\"I've spent thirty years being careful and useful and out of the way. I stood in a doorway on Tuesday and I'd stand in it again tomorrow, and I'm sixty-one and I've only just found that out about myself.\"",
      ],
      choice: {
        prompt: "\"Now don't fuss. I've had Rui fuss and it was quite enough.\"",
        options: [
          {
            key: "kind",
            label: "Fuss anyway",
            style: 3,
            close: "\"I said not to.\"\n\n*He lets you, though. He sits in the back room and lets you make the tea he was going to make himself and doesn't argue about a single thing.*\n\n\"...It's nice,\" *he admits eventually.* \"Being fussed over. I'd forgotten. I've been the one doing it for so long I'd genuinely forgotten what the other side was like.\"",
          },
          {
            key: "playful",
            label: "Ask if he did a stern face",
            style: 1,
            close: "\"I did a *tremendous* face. Thirty years of retail, you learn one.\"\n\n\"He was a good foot taller than me and he went. I've been unbearably pleased with myself about it since Tuesday and there's been nobody to tell.\"",
          },
          {
            key: "bold",
            label: "Tell him not to do it again",
            style: 4,
            close: "\"No.\"\n\n*It's the flattest thing he has ever said to you, and there isn't a trace of the fluster anywhere in it.*\n\n\"I'm sorry. Anything else you ask me, I'll do. Not that.\"\n\n*Then, gentler:* \"Come and have the tea. I've made two, rather optimistically.\"",
          },
        ],
      },
      keepsake: {
        emoji: "🚪",
        line: "A doorway stood in on a Tuesday by somebody who couldn't have won.",
      },
    },

    soulbound: {
      beats: [
        "**{firstName}**: \"I've written this out on the back of an order form because I think better with a pen, and I'm copying it across word for word so I don't lose my nerve in the middle.\"",
        "\"{timesMet} times you've come through that door. I've the number because I've kept the shelf, and there's a thing on it for every one, and I couldn't throw out a single one of them.\"",
        "\"I'm sixty-one years old. I want that at the front, because everything after it has to be read with it in mind, and because I've spent a year finding reasons why that ought to be the end of the sentence rather than the start of one.\"\n\n\"I've been very sensible. I've been sensible for thirty years and it's kept me safe and it's kept me alone and I've called it contentment and mostly meant it.\"",
        "\"So here it is, and then I shall put the kettle on and let you think.\"\n\n\"I love you. I'm well aware of how that reads and I've decided to send it regardless, because I stood in a doorway on a Tuesday and found out I'm not as careful a man as I've been pretending.\"\n\n\"There's no expectation in it. Truly none. I'd simply rather you knew than have another summer come round with it unsaid. I've had one of those already, a long while ago, and I've never got over it.\"",
      ],
      choice: {
        prompt: "\"Take all the time you want. The kettle's on and the shop's not going anywhere and neither am I.\"",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close: "*He doesn't reply at all, which is not like him.*\n\n*When you get to the shop the door is unlocked and he is standing behind the counter with the order form still in his hand, and he has very obviously been standing exactly there for some time.*\n\n\"Say it here,\" *he says.* \"Where I can see you say it. I'm sorry. I've waited a long while and I find I want the whole of it.\"\n\n*And afterwards he holds onto both your hands across the counter and doesn't manage to say anything else for quite a while.*",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close: "\"Of course. Of course, take it. I'd think rather less of you if you didn't.\"\n\n\"And I'd like to be very clear, because I know how these things curdle: nothing alters. The shelf stays. There'll be something set aside on Thursday same as every Thursday, and I shall be glad to see you, and none of that was ever a bid for anything.\"\n\n\"I've had thirty years of practice at being glad to see people who don't stay. This is the first time I've had any hope in it at all, and that's already a good deal more than I had in March.\"",
          },
        ],
      },
      keepsake: {
        emoji: "🧾",
        line: "The back of an order form, copied across word for word.",
      },
    },
  },
  dialogue: {
    new: [
      'He looks up from his work, a little flustered but smiling warmly. "Oh! H-hello. Do you need help with something?"',
      "He's carrying far too much and insists it's no trouble at all.",
      '"Careful there, mind the... ah, you\'ve got it. Good, good."',
      "He starts to say something, thinks better of it, and offers you a snack instead.",
      "There's a kindness to him that's older than everyone else in this school put together.",
    ],
    known: [
      "He knows your name, and says it like he's glad of the chance to.",
      "He's stopped asking whether you need help. He just starts helping.",
      "There's something set aside on the counter. It's been there a couple of days.",
      '"You\'re one of the ones who says thank you," he says. "I remember those."',
      "The fluster has settled into something easier.",
    ],
    warm: [
      'He gets a bit red in the face when he sees you, but his smile is genuine and eager. "You came back! Can I help you with anything?"',
      "He's set something aside for you. He does that most days now, just in case.",
      '"You remind me of someone," he says fondly, and doesn\'t finish the thought.',
      "He fusses over whether you're warm enough, then apologizes for fussing.",
      "He remembers exactly what you asked about last time, down to the detail.",
    ],
    spark: [
      "He goes red to the ears and busies himself with something that needed no attention.",
      "He steadies you by the elbow, and takes a long moment letting go.",
      "\"Ah, I've been meaning to say... no, it'll keep. It'll keep.\"",
      'He\'s practiced this in his head about forty times. It comes out as "you look nice."',
      "He walks you to the gate and finds three reasons to walk slower.",
    ],
    close: [
      '"You\'re really important to me," he says softly, a hint of bashfulness in his voice. "I\'m always happy to help you with anything you need."',
      "He tells you a story about the old days that he doesn't tell anyone.",
      '"Don\'t push yourself so hard," he says gently. "Somebody ought to say it."',
      "He's quietly made your life easier in three ways this week and mentioned none of them.",
      "He looks at you the way one looks at something worth having stayed around for.",
    ],
    bound: [
      "He still goes red. He's stopped letting it stop him.",
      "He kisses your forehead every single morning like a man observing a sacrament.",
      '"I\'d got used to being alone," he admits quietly. "You\'ve ruined that entirely."',
      "He holds you carefully, like something he's been trusted with and means to deserve.",
      "He's old-fashioned about all of it, and it turns out that's devastating.",
    ],
  },
  temperamentDialogue: {
    new: [
      '"Oh! H-hi! Did you need something? I\'m here to help!"',
      '"Whoa there, careful now. This old floor\'s got opinions."',
      '"You look hungry. Ah, sorry, that was forward of me."',
      '"Anything you need carried? I\'m good for it, honest."',
      '"New face! Well, welcome. It\'s a strange place, but it grows on you."',
    ],
    known: [
      '"Oh, you\'re back! Good, good. I set something aside, hang on."',
      "\"Don't carry that yourself, I've got two good arms doing nothing.\"",
      '"You always say thank you. Not everyone does, you know."',
      "\"How've you been keeping? Eating properly? Ah, sorry, I'm fussing.\"",
      '"Take it. No charge. I\'d only have eaten it myself."',
    ],
    warm: [
      "\"You're back! I'm really happy to see you. What can I do for you?\"",
      '"Set that down, I\'ll take it. No arguing."',
      "\"I kept this aside for you. Wasn't sure you'd come. Glad you did.\"",
      '"Warm enough? Here, take it, I\'ve got another."',
      '"Ah, it\'s good to see a friendly face. Been a long day."',
    ],
    spark: [
      "\"You look... ah. Very nice. That's all. That's what I meant to say.\"",
      '"I\'m too old to be this flustered and here we are."',
      "\"Let me walk you back. It's dark. That's the reason. That's the only reason.\"",
      '"I\'ve been meaning to tell you something. Give me a minute to lose my nerve."',
      '"You make an old man feel very silly. I don\'t mind it a bit."',
    ],
    close: [
      '"You mean a lot to me. I\'d do anything to help you."',
      '"Sit with me a bit. These old bones like the company."',
      "\"You've been running yourself ragged. Don't think I haven't noticed.\"",
      "\"I've seen a lot of students come and go. You're the one I'll remember.\"",
      "\"Whatever it is, bring it to me first. That's what I'm here for.\"",
    ],
    bound: [
      '"Come here, love. Let me look at you a minute."',
      '"I love you. Took an old man far too long to get that out."',
      "\"Stay the night? I'll not pretend I don't want you to.\"",
      "\"You make me feel like a young fool. I've decided I don't mind.\"",
      '"Sit with me. Just here. That\'s all I ever want, most days."',
    ],
  },
  approach: {
    new: [
      "Offer to help carry",
      "Accept the snack",
      "Say hello",
      "Mind the floor",
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
    bound: ["Come here", "Stay the night", "Sit with him", "Say it back"],
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
        "Let him lose his nerve",
      ],
      close: [
        "Let him care for you",
        "Tell him to rest too",
        "Say he's been remembered",
      ],
      bound: [
        "Say it back",
        "Let him look at you",
        "Tell him he's not a fool",
      ],
    },
    playful: {
      new: [
        "Fluster him on purpose",
        "Tease him about the fussing",
        "Ask for the second snack",
        "Catch him mid-apology and grin",
      ],
      spark: [
        "Make him say it again",
        "Slow down just to watch him",
        "Tease the blush",
        "Make him lose his nerve",
      ],
      close: [
        "Match his dry humor",
        "Tease him about the old days",
        "Make him laugh out loud",
        "Needle him just to get a rise",
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
        "Rest with his wisdom",
        "Sit in the old quiet",
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
      '"Careful there, mind the..." **{name}** stops. {user} has already got it.',
    ],
    warm: [
      '"You came back!" **{name}** beams at {user} and immediately offers to carry something.',
      "{user} calls out, and **{name}** sets down the crate he'd been managing badly.",
      "**{name}** had put something aside for {user}. He does that most days now, just in case.",
    ],
    spark: [
      "**{name}** goes red, apologizes for going red, and stays exactly where {user} can see him.",
      '"You remind me of someone," **{name}** tells {user} fondly, and doesn\'t finish the thought.',
      "{user} says the name, and **{name}** forgets the whole afternoon's list.",
    ],
    close: [
      '"Come here, love. Let me look at you a minute." **{name}** means it to {user} kindly. Mostly.',
      "**{name}** hears {user}, and every ache of the day goes somewhere else.",
      "{user} calls, and **{name}** walks the long way round with them, just to have the time.",
    ],
    bound: [
      '"I\'d got used to being alone," **{name}** tells {user}. "You\'ve ruined that entirely."',
      "**{name}** kisses {user}'s forehead in front of half the campus, like a man observing a sacrament.",
      "{user} says the name, and **{name}** stops going red about it. Mostly.",
    ],
  },
};
