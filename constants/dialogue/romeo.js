export default {
  // The level-up DMs (docs/bond-scene-dms.md). One of the six volatile
  // characters — see docs/negative-affinity-enemies-to-lovers.md. Romeo yells in
  // text, coins acronyms nobody asked for, and prices everything, and none of
  // that softens on the way up. What changes is what he spends the money on and
  // who he counts as his. The care is always backhanded and always expensive.
  bondScenes: {
    acquaintance: {
      beats: [
        "**{firstName}**: \"Tch. Before you say anything, no, you're not in trouble, and no, this isn't a bill. Yet.\"",
        '"Somebody put your name on the floor list as a mark. Standard stuff, happens to everyone who walks through here more than twice, it\'s not personal, it\'s just Sinostra."\n\n"I took it off. Personally. Which cost me a conversation I did not enjoy having at nine in the morning with my face not done."\n\n"{timesMet} visits and you\'ve never once tried to get anything out of this house. Do you know how rare that is? That\'s a rounding error. That\'s ONE person."',
      ],
      choice: {
        prompt: "\"So don't make me regret it. That's it.\"",
        options: [
          {
            key: "kind",
            label: "Thank him for it",
            style: 3,
            close:
              "\"Don't thank me, it's undignified for both of us.\"\n\n*A pause.*\n\n\"...You're welcome. That's all you're getting. That's the entire allocation for the year.\"",
          },
          {
            key: "playful",
            label: "Ask if you're still a mark",
            style: 1,
            close:
              "\"Obviously not, or I wouldn't be wasting a perfectly good morning explaining myself to you.\"\n\n*A pause.*\n\n\"...You're something else. I haven't worked out what yet. Don't push it.\"",
          },
          {
            key: "bold",
            label: "Ask what it cost him",
            style: 4,
            close:
              '"Nothing."\n\n*Then, four seconds later:* "A favor, two hundred thousand yen of goodwill, and I had to be nice to a man I hate. Don\'t mention it. Genuinely. Do not mention it, ever, to anyone."',
          },
        ],
      },
      keepsake: {
        emoji: "💳",
        line: "A name struck off the floor list before nine in the morning.",
      },
    },

    friend: {
      beats: [
        "**{firstName}**: \"Right. Something's been irritating me for a MONTH and I've finally worked out what it is.\"",
        "\"You do {favResponse} with me every single time and you have NEVER ONCE ASKED ME FOR ANYTHING.\"\n\n\"Everybody wants something. That's not me being bleak, that's the actual operating model of this entire academy. People try to suck up to me and then there's an ask, and I've priced that in since I was eleven, and honestly it's fine. I like being useful, it's the only currency I've got that doesn't depreciate.\"\n\n\"You've had a month of opportunities. Nothing. It's INSULTING.\"",
      ],
      choice: {
        prompt:
          "\"So ask me for something. Anything. I'm begging you, it's making me itch.\"",
        options: [
          {
            key: "kind",
            label: "Ask him to sit down a minute",
            style: 3,
            close:
              "\"That's not a... that's not an ASK, that's not...\"\n\n*A long pause.*\n\n\"...Fine. Fine! I'm sitting. I've sat. Are you happy? This is the worst favor I've ever done anyone.\"\n\n*He sits for forty minutes.*",
          },
          {
            key: "playful",
            label: "Ask for his skincare routine",
            style: 1,
            close:
              "\"NOW you're talking. Right. Clear your evening. There are ELEVEN STEPS and I'm not skipping the explanations.\"\n\n*He sends fourteen messages about serums. It's the happiest you've ever seen him.*",
          },
          {
            key: "bold",
            label: "Say you don't want anything",
            style: 4,
            close:
              '"Everyone wants something."\n\n"...You\'re going to keep saying that, aren\'t you. And I\'m going to keep waiting for the ask, and it\'s going to be like this for years, and I\'m going to be extremely annoyed the entire time."\n\n"Fine. FINE. Consider me annoyed."',
          },
        ],
      },
      keepsake: {
        emoji: "🧴",
        line: "Eleven steps, explained in fourteen messages, unprompted.",
      },
    },

    closeFriend: {
      beats: [
        "**{firstName}**: \"Casino. After close. Come up to the balcony office, not the floor, and DON'T let Taiga see you on the way up or he'll steal you for the night at the casino before I've said two words.\"",
        "*The floor is dark below and he is sitting on the balcony with his jacket off and his hair down and a ledger open in front of him, and he doesn't do the voice when you come in.*\n\n\"This is the real book. Not the one the academy sees. Every fee, every mark, every person in this house who owes and every person who's owed to.\"",
        "*He turns it round so you can see, which is the single most dangerous thing anyone in Sinostra could do.*\n\n\"Half of that is people who'll never pay and I've never once chased. Fuji-kun's on there four times. There's a second-year on there whose mom's ill and she's never going to know I wrote it off.\"\n\n\"Everyone thinks I'm the money. I AM the money. But nobody's ever asked what I actually spend it on, and it turns out the answer's on page nine and I've never shown anybody page nine.\"",
      ],
      choice: {
        prompt:
          "\"Say something. And if you say I'm secretly nice I'm throwing you off this balcony.\"",
        options: [
          {
            key: "kind",
            label: "Say page nine is the real book",
            style: 3,
            close:
              '*He shuts the ledger rather harder than necessary.*\n\n"...Yeah. Yeah, alright."\n\n*He doesn\'t say anything else for a bit. Then:* "Don\'t repeat that. I\'ve got a reputation and it does about ninety percent of my job for me."',
          },
          {
            key: "playful",
            label: "Threaten to tell everyone",
            style: 1,
            close:
              "\"HDY. I will RUIN you. I will ruin you SO efficiently...\"\n\n*A pause.*\n\n\"...You wouldn't though. That's the annoying bit. You're the only person I've shown this to and I'm not even slightly worried, and I've been worried about everything since I was nine.\"",
          },
          {
            key: "bold",
            label: "Ask if you're in the book",
            style: 4,
            close:
              "*He goes very still.*\n\n\"...Page one.\"\n\n*He doesn't turn it back round.*\n\n\"Not as a debt. There's a second column. There's exactly one name in the second column and it's been there since about March and I'm not explaining what the column is.\"",
          },
        ],
      },
      keepsake: {
        emoji: "📒",
        line: "Page nine of a ledger nobody else has ever been shown.",
      },
    },

    confidant: {
      beats: [
        '**{firstName}**: "Taiga lost three days again. I\'ve been running the floor since Wednesday and I have not slept and I look INCREDIBLE, which is not the point."',
        "\"Here's the bit I don't say. He doesn't remember that I do it. Every time. I cover four days, he comes back, and by lunch we're back to screaming at each other about the bar tab like nothing happened. He's not being ungrateful, he genuinely doesn't clock it.\"\n\n\"So I've been holding this house up for two years for a man I fight with on a near-daily basis, and if he ever worked it out, he wouldn't say thank you. He'd never say thank you. He'd turn it into ammunition and bring it up every single time we argue for the rest of our lives, and I would rather run this floor blind than give him that.\"",
        "\"I yell because if I'm the loudest person in the room nobody asks what I'm actually doing. It's worked brilliantly. It's worked for eleven years, and it works best of all on him, because he's too busy yelling back to ever notice what I'm covering.\"\n\n\"You asked. Last Tuesday. You just said 'are you all right' in the corridor like it was a normal question and I've been thinking about it for six days and I'm FURIOUS about it.\"",
      ],
      choice: {
        prompt:
          "\"So? Go on. You've clearly got something, you've had that face on for a week.\"",
        options: [
          {
            key: "kind",
            label: "Ask if he's all right again",
            style: 3,
            close:
              '"DON\'T..."\n\n*Nothing for four minutes.*\n\n"No," *he writes eventually, and it\'s the quietest thing he\'s ever sent.* "No, I\'m not. Obviously I\'m not."\n\n"Come up. Don\'t say anything about it when you get here. Just be up here."',
          },
          {
            key: "playful",
            label: "Agree that he looks incredible",
            style: 1,
            close:
              '"THANK YOU. Finally. Somebody in this building with EYES."\n\n*Then, much later:* "...that helped, actually. Don\'t tell anyone that helped. I\'d rather people thought I was unreachable."',
          },
          {
            key: "bold",
            label: "Say he should tell Taiga",
            style: 4,
            close:
              "\"Absolutely not.\"\n\n\"He'd never let it go. He'd bring it up every time we argue for the rest of our lives, turn it into a scoreboard, and somehow make ME feel like I owe HIM for having 'let' me do it. That's not... no. I'm not handing him that.\"\n\n\"Besides. I've got the better memory. It's the one advantage I've got over him and I'm keeping it.\"",
          },
        ],
      },
      keepsake: {
        emoji: "💼",
        line: "Four days of covering for someone who'll never know it happened.",
      },
    },

    devoted: {
      beats: [
        "**{firstName}**: \"Don't come in tomorrow. I mean it. The floor's closed and I'm dealing with something.\"",
        "\"Somebody had a go at you in the west block. Verbally. In front of about nine people.\"\n\n\"I've heard about it from three separate sources and I've spent the evening finding out exactly who he owes, what to, and when it's due, and it turns out he owes a REMARKABLE amount and it's due whenever I say it is.\"",
        "\"I want to be honest about what this is, because you'll hear it as protecting you and it's uglier than that.\"\n\n\"This is me being the most frightening thing in the building on purpose, at somebody, because he made you look at the floor. That's the whole of it. There's no noble version.\"\n\n\"You're mine. Not like... I'm not TAIGA about it. I mean you're on my list, and everyone on my list is protected, and nobody has ever got onto that list without paying and you never paid a thing.\"",
      ],
      choice: {
        prompt:
          "\"Now tell me to stop. You're the only one who could and I'd like to know if you will.\"",
        options: [
          {
            key: "kind",
            label: "Tell him to stop",
            style: 3,
            close:
              '"...Right."\n\n*A long silence.*\n\n"Stopped. Done. It\'s... yeah. It\'s stopped."\n\n*Then:* "Come up anyway. I\'ve canceled a whole evening of being frightening and I\'ve got nothing to do with myself and I\'d rather not sit here alone with it."',
          },
          {
            key: "playful",
            label: "Ask how remarkable the debt is",
            style: 1,
            close:
              '"OBSCENE. Genuinely obscene. He\'s been rolling it over for a year and a half and I\'ve been letting him because it amuses me."\n\n"It has stopped amusing me. Funny how that works."',
          },
          {
            key: "bold",
            label: "Say you don't want him to",
            style: 4,
            close:
              "\"That's not the same as telling me to stop and you know it isn't.\"\n\n*A pause.*\n\n\"...It's better, actually. It's worse for me and it's better. Because now I've got to want to stop rather than just being told, and I don't, and I'm going to anyway.\"\n\n\"HDY. Genuinely. How dare you.\"",
          },
        ],
      },
      keepsake: {
        emoji: "💰",
        line: "A debt he stopped calling in because you asked him to.",
      },
    },

    soulbound: {
      beats: [
        "**{firstName}**: \"Balcony. Now. And before you get there, I've had eleven weeks to do this properly and I've decided to do it badly instead, so brace.\"",
        "*The ledger is open on the desk at page one. He's turned it round already.*\n\n_There is a second column, and there's one name in it, and it says: *not a debt. never bill.*_\n\n\"March. I wrote that in March and I've looked at it about four hundred times.\"",
        "\"Everything's a price. That's not a philosophy, it's the only language I was taught. My family bought their way out of things and into things and I learned exactly one skill, which is knowing what everybody costs.\"\n\n\"I can price anyone in this academy in about four seconds. Taiga. Jo. The captain of Frostheim, who thinks he's above it, and isn't.\"\n\n\"{timesMet} visits and I have NEVER been able to price you. Not once. It's been driving me out of my MIND for a year.\"",
        "\"So here's the badly done bit.\"\n\n\"I love you. There's no invoice, there's no favor attached, and there's nothing you owe me, and if you ever try to pay me back for anything I have EVER done for you I will genuinely never speak to you again.\"\n\n\"That's it. That's the whole thing. I've spent my entire life making sure everything had a number on it and there's one thing that doesn't and it's you and I've just told you, out loud, on a balcony, like a MANIAC.\"",
      ],
      choice: {
        prompt:
          "\"Say something. Anything. I'm going to start yelling in about four seconds and it won't be at you, it'll just be VOLUME.\"",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close:
              "*There is a sound that is almost certainly a chair going over.*\n\n\"Say it AGAIN... no. No, don't. Don't, I heard it, I'm...\"\n\n*He stops trying to type. He comes round the desk instead, and for once he isn't loud at all: he takes your hands, both of them, and looks at them rather than at you.*\n\n\"Nobody's ever done that for free,\" *he says.* \"Not once, in my whole life. Say it again in the morning. I'll need it in the morning.\"",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close:
              "\"Fine. GREAT. Excellent. Take all of it.\"\n\n*A pause. Then, without the volume:*\n\n\"...That wasn't sarcasm, for once. Take it. I dropped that on you off a balcony at two in the morning, you're entitled to a bit of thinking.\"\n\n\"Second column stays. That's not a maneuver. It was true in March and it's true now and it'd be true if you never came up here again. Nobody bills you. That's the arrangement and it isn't up for negotiation, which I'm aware is a very me way of being kind.\"",
          },
        ],
      },
      keepsake: {
        emoji: "📓",
        line: "One name in a second column, marked never bill.",
      },
    },
  },
  dialogue: {
    new: [
      'He\'s barking orders at the staff, managing every angle of the casino floor. "HDY waste my time? Quick, put on this dress and work table seven, we need someone sharp out there."',
      "He's on two conversations and one phone call. You are somehow now the third conversation.",
      "\"Come to my private office later, I've got a little proposal I think you'll want to hear. But make sure you come alone.\"",
      "He looks you up and down, does arithmetic, and apparently likes the result.",
      "He's got a sheet mask on and a phone to his ear and does not consider either a reason to stop running the floor.",
    ],
    known: [
      "He's stopped trying to put you to work. Mostly.",
      '"Oh, it\'s YOU," at a volume that carries across the entire floor.',
      "He complains about something to you specifically, which is a form of trust.",
      '"Have you seen Shinjo anywhere? I just asked him to organize some documents and he ran off to make copies!"',
      'He pushes a glass of something green across the desk. "Noni juice. Drink it. Your skin cell turnover is suboptimal and it shows."',
    ],
    warm: [
      "He pauses mid-command when he spots you, actually stepping away from the action to greet you properly. Suddenly you matter more than the operation.",
      '"You show up unannounced, no appointment. Sit down. I\'ll get you something. Ugh. Fine. I want to."',
      "He complains about you at length to someone else, loudly, entirely as a compliment.",
      "He's had the good seat held all night. He will absolutely deny that.",
      "The yelling drops a full register when he turns to you. Everyone notices. He doesn't.",
    ],
    spark: [
      "He clears the whole VIP room. For a conversation. That he then can't start.",
      '"HDY look like that in MY casino," he snaps, meaning something entirely different.',
      "He fixes your collar, aggressively, and doesn't step back afterward.",
      "The yelling stops. The silence that replaces it is much louder.",
      "He buys you something absurd and refuses to explain why, badly.",
    ],
    close: [
      '"You\'re not just money or status to me," he admits, voice uncharacteristically sincere. "You\'re everything."',
      "He hands the floor to someone else, the floor, because you looked like you needed a minute.",
      "\"Don't tell me what it cost. It's yours. That's the end of the conversation.\"",
      "The performance of not caring finally collapses, and he's not even embarrassed about it.",
      "\"I like you. This much. It's ridiculous,\" he mutters, and doesn't let go of your hand.",
    ],
    bound: [
      "He's bought out the floor for the night. For you. He'll never explain it properly.",
      '"Look what you\'ve done to me," he mutters, with his face in your neck.',
      "He yells at everyone all day and comes home and is completely, quietly undone.",
      "He drapes something absurdly expensive over your shoulders and refuses all thanks.",
      "The money means nothing. He's finally, loudly, stopped pretending otherwise.",
    ],
  },
  temperamentDialogue: {
    new: [
      '"Perfect timing. I need someone I can trust to manage the VIP section. You in?"',
      '"HDY come in here with your skin like that and no routine. Sit. We are fixing this."',
      "\"Tch... If you don't have any business for me, I'm leaving! You're wasting my precious time!\"",
      '"Fuji-kun... Come out, come out, wherever you are... Tch, where did he go? Why is running away the only thing he\'s good at?!"',
      "\"You're new. Rule one: don't touch the chips. Rule two: see rule one.\"",
    ],
    known: [
      '"You again! HDY keep showing up without an appointment. Sit down."',
      '"Don\'t touch the... okay, fine, you know not to. Fine."',
      '"Just go! I cannot deal with this WTWUT! Wall-To-Wall Useless Trash, obviously! ...Not you. You can stay."',
      "\"I'm not saying I remembered your name. I'm saying I said it. Different thing.\"",
      "\"Drink's on the house. Don't tell the house.\"",
    ],
    warm: [
      "\"Oh, you're back! Actually... I'm kind of happy to see you. Don't tell anyone.\"",
      '"Sit. The good seat. No, I didn\'t hold it. Shut up."',
      '"You had me worried all evening. Somebody put that look on your face. Give me a name. I\'ll have a word. ...A thorough one."',
      '"You eaten? Don\'t answer, I already ordered."',
      "\"You're not staff and you're not a guest. You're... whatever. You're welcome here.\"",
    ],
    spark: [
      '"Everybody out. Not you. Obviously not you."',
      "\"You've cost me something I can't put a number on. Do you have ANY idea how much that irritates me?\"",
      '"Wear it. I bought it. Don\'t argue, just... just wear it for me."',
      "\"I'm not good at quiet. Give me a second. I'm trying.\"",
      "\"You're the only thing in this building that isn't for sale. That's the problem.\"",
    ],
    close: [
      "\"I'd spend all my money on you if you asked. Not that I'd ever admit that normally.\"",
      "\"Take it. Don't look at the price. I said don't look.\"",
      "\"Everything on this floor, I can price. Then there's you. It's infuriating.\"",
      "\"I've got people for everything. I don't have anyone for you. That's the point.\"",
      '"Stay till close. I\'ll be insufferable the whole time. You like that."',
    ],
    bound: [
      "\"Floor's closed. Everyone's gone. It's just us, so... come here already.\"",
      '"I love you. HDY make me say it out loud. Ugh. I love you."',
      "\"Wear it to bed. I don't care that it's expensive, that's the POINT.\"",
      "\"Stay. I'll cancel everything. I've already canceled everything.\"",
      "\"You're the only thing I've ever wanted that I couldn't just buy.\"",
    ],
  },
  approach: {
    new: [
      "Cut into the conversation",
      "Make yourself useful",
      "Walk faster",
      "Ask what the job pays",
    ],
    known: [
      "Take the free drink",
      "Sit without an appointment",
      "Interrupt the yelling",
      "Say what you want, quickly",
    ],
    warm: [
      "Take the good seat",
      "Interrupt him anyway",
      "Complain right back",
      "Let him order for you",
    ],
    spark: [
      "Stay when the room clears",
      "Wear it",
      "Give him a second",
      "Let the yelling stop",
    ],
    close: [
      "Go straight to him",
      "Take his hand",
      "Stay till close",
      "Tell him to hand off the floor",
    ],
    bound: [
      "Come here already",
      "Wear it to bed",
      "Stay",
      "Let him cancel everything",
    ],
  },
  responses: {
    kind: {
      new: [
        "Let him fuss over you",
        "Take the work seriously",
        "Thank him and mean it",
      ],
      spark: [
        "Give him the second",
        "Wear it for him",
        "Tell him he's not business",
      ],
      close: [
        "Know his worth is you",
        "Tell him to stop buying things",
        "Say the money was never it",
      ],
      bound: [
        "Say it back",
        "Wear it for him",
        "Tell him he's more than money",
      ],
    },
    playful: {
      new: ["Trade sass back", "Use his own acronym", "Touch the chips"],
      spark: ["Ask what it cost", "Out-yell him", "Refuse to wear it"],
      close: [
        "Match his wit",
        "Out-yell him affectionately",
        "Spend his money on him",
      ],
      bound: [
        "Make him say it louder",
        "Ask what it cost",
        "Refuse the gift twice",
      ],
    },
    bold: {
      new: ["Bet on yourself", "Name your price", "Take the VIP section"],
      spark: [
        "Stay when the room clears",
        "Fix his collar back",
        "Tell him what he's worth",
      ],
      close: [
        "Know you're worth his money",
        "Tell him to say it plainly",
        "Take his hand openly",
      ],
      bound: [
        "Close the floor yourself",
        "Say it first",
        "Tell him he couldn't buy you",
      ],
    },
    neutral: {
      new: ["Stay quiet", "Let him run the floor", "Nod and get on with it"],
      spark: ["Let him find the words", "Leave with the room", "Say nothing"],
      close: [
        "Let him have this moment",
        "Wait out the rant",
        "Sit through the closing count",
      ],
      bound: ["Let him rant", "Sit in the empty room", "Say nothing"],
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
      '"HDY say my name so casually." **{name}** snaps at {user}, like anyone else would dare.',
      "{user} says the name, and **{name}** is already talking. About three things. At once.",
      '"Perfect timing. I need someone I can trust." **{name}** decides this about {user} instantly.',
    ],
    warm: [
      "**{name}** steps away from the floor to greet {user} properly. Suddenly the operation can wait.",
      '"Sit. The good seat. No, I didn\'t hold it. Shut up." **{name}** absolutely held it for {user}.',
      "{user} calls out, and **{name}** complains about them loudly to somebody else, as a compliment.",
    ],
    spark: [
      "\"I'm kind of happy to see you. Don't tell anyone.\" **{name}** says this to {user} at volume.",
      "{user} says the name, and **{name}** loses his thread entirely, which never happens.",
      "**{name}** yells at three people on his way over to {user}, and none of it was about them.",
    ],
    close: [
      '"Somebody put that look on your face? Give me a name." **{name}** is already rolling his sleeves for {user}.',
      "**{name}** hears {user}, and whatever he was collecting on becomes somebody else's job.",
      "{user} calls, and **{name}** buys out the rest of the night without explaining why.",
    ],
    bound: [
      '"HDY make me say it out loud. Ugh. I love you." **{name}** tells {user} this in front of everyone in earshot.',
      "**{name}** yells at everyone all day, reaches {user}, and goes completely, quietly undone.",
      "{user} says the name, and **{name}** claims them out loud, because that is what he does with his people.",
    ],
  },
};
