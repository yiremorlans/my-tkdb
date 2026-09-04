export default {
  // The level-up DMs (docs/bond-scene-dms.md). Jin does not ask, so none of
  // these are requests; the warmth is in what he permits and what he admits to
  // having noticed. The arc is the crown coming off by degrees — bold is the
  // register that reaches him, so every choice rewards refusing to be dismissed.
  bondScenes: {
    acquaintance: {
      beats: [
        '**{firstName}**: "Servant."\n\n"Tohma\'s decided I can\'t keep sending someone to fetch you every time I want a word. Says it\'s a waste of the staff. Fine. His way, then. Answer."',
        "\"You've been underfoot {timesMet} times now. I haven't had you thrown out. Make of that whatever you want. I'm not explaining it.\"\n\n*The typing indicator starts. Stops. Starts again.*\n\n\"Don't get ideas. It's not a promotion.\"",
      ],
      choice: {
        prompt: "\"Well? Say something. You've got a mouth, use it.\"",
        options: [
          {
            key: "kind",
            label: "Say you're glad he wrote",
            style: 3,
            close: "\"...Glad.\" *A long pause.* \"Ha. Whatever. Be glad, then. Costs me nothing.\"",
          },
          {
            key: "playful",
            label: "Ask if that was praise",
            style: 1,
            close: "\"Praise? Tsk. That was a fact.\"\n\n*A beat.*\n\n\"...You don't need praise anyway. You'd just get cocky. Forget I said that.\"",
          },
          {
            key: "bold",
            label: "Tell him you'll decide that",
            style: 4,
            close: "\"Ha.\" *It comes back instantly.* \"*There* it is.\"\n\n\"I've got no use for anyone who waits to be told what to think. Go to bed, servant.\"",
          },
        ],
      },
      keepsake: {
        emoji: "❄️",
        line: "The first order he gave you that wasn't really an order.",
      },
    },

    friend: {
      beats: [
        '**{firstName}**: "Question. Answer it straight or don\'t bother."',
        "\"Every time I throw something at you, you come back with {favResponse}. Not once have you tried to sweeten me up first.\"\n\n\"Everyone in this house has a voice they save for me. Softer. Rehearsed as hell. I hear it coming three rooms off and I quit listening at the first word.\"\n\n\"You've never used it. So which is it: guts, or you're too dumb to know better?\"",
      ],
      choice: {
        prompt: "\"Think before you open your mouth. I'll know if you're lying.\"",
        options: [
          {
            key: "kind",
            label: "Say he's worth honesty",
            style: 3,
            close: "*The typing indicator comes and goes three separate times.*\n\n\"...Then keep it up,\" *he sends eventually. Nothing else. Four words took him two minutes.*",
          },
          {
            key: "playful",
            label: "Say it's mostly ignorance",
            style: 1,
            close: "\"Ignorance.\" *A pause.* \"You're lying, you're bad at it, and I don't care.\"\n\n\"Stay dumb, then. It suits you better than the alternative.\"",
          },
          {
            key: "bold",
            label: "Tell him guts, obviously",
            style: 4,
            close: "\"Obviously,\" *he repeats, and there's something in it that's too close to a laugh.*\n\n\"You know what happens to people who talk to me like that? Nothing. Not a damn thing. That's the whole problem with this place.\"",
          },
        ],
      },
      keepsake: {
        emoji: "🖋️",
        line: "A note in a hand that never writes anything down twice.",
      },
    },

    closeFriend: {
      beats: [
        "*There's no message first. There's a photo of a small flat box on a desk, and then, half a minute later, the words.*\n\n**{firstName}**: \"That's yours. Has been for weeks. I just didn't get around to saying so.\"",
        "\"It's nothing. A signet. The house's, not the family's, so don't go building a fantasy out of it. Frostheim's, so anyone who wonders what you're doing here has an answer that isn't me.\"\n\n\"Take it before I change my mind. I change my mind constantly.\"",
        "\"...Picked it out in March,\" *he adds, after a silence that clearly cost him something.* \"Been finding reasons not to hand it over ever since. Do whatever you want with that.\"",
      ],
      choice: {
        prompt: "\"Say something. Not thank you. I hate being thanked.\"",
        options: [
          {
            key: "kind",
            label: "Tell him you'll wear it",
            style: 3,
            close: "\"Obviously you'll wear it. That's what it's *for*.\"\n\n*Then, after a moment:* \"...Suits you. Wearing my house suits you. I heard how that sounded. I'm not saying it again.\"",
          },
          {
            key: "playful",
            label: "Ask what took him so long",
            style: 1,
            close: "\"I was *busy*.\" *A pause.* \"I wasn't busy. I was a coward about a piece of metal. Don't tell Tohma. He'll be unbearable and he'll be right.\"",
          },
          {
            key: "bold",
            label: "Ask him to put it on you",
            style: 4,
            close: "*The reply takes a long time.*\n\n\"Come up. Now, before I change my mind.\"\n\n*He does it in the captain's room without turning the lamp on, your hand held flat in both of his, and he takes a hell of a lot longer over it than the job needs. Neither of you mentions that.*",
          },
        ],
      },
      keepsake: {
        emoji: "💍",
        line: "The house signet he chose in March and took until now to hand over.",
      },
    },

    confidant: {
      beats: [
        "*It comes through at an hour when even Frostheim is dark.*\n\n**{firstName}**: \"You don't repeat this. I'm not asking.\"",
        "\"Everyone here calls me king. Not one of them picked me. I got handed a room, a title, and a set of faces people arrange before they knock: a figurehead with a good view. I've been holding the whole thing up by myself since before you showed up.\"\n\n\"There was someone here once who didn't do that. He's not here now. I'm not getting into it.\"",
        "\"I worked out a long time ago that nothing good sticks around. That's not self-pity, it's just the math.\"\n\n\"Then you kept turning up, and I caught myself running the math again, hoping it'd come out different. That's it. That's the whole thing. I hate every word of it.\"",
      ],
      choice: {
        prompt: "\"Now tell me I'm being pathetic so we can both move on.\"",
        options: [
          {
            key: "kind",
            label: "Refuse to move past it",
            style: 3,
            close: "*Nothing for a long time.*\n\n\"No. You wouldn't, would you.\" *A pause.* \"That was the whole risk of telling you.\"\n\n\"...Stay put. I'm not done being looked at.\"",
          },
          {
            key: "playful",
            label: "Call him extremely pathetic",
            style: 1,
            close: "\"Thanks. That's exactly what I asked for and I hate it.\"\n\n*A pause.* \"Do it again tomorrow. Apparently I need it.\"",
          },
          {
            key: "bold",
            label: "Tell him you're not leaving",
            style: 4,
            close: "\"Nobody gets to promise that,\" *he writes, fast, almost angry.* \"People say it and then the math happens anyway.\"\n\n*Then, much slower:* \"...Say it again. I won't believe you. Say it anyway.\"\n\n*You say it four times before he stops asking. He never once says thank you, and he doesn't put the phone down until it's light.*",
          },
        ],
      },
      keepsake: {
        emoji: "🕰️",
        line: "The hour he spent admitting he'd been alone in that room.",
      },
    },

    devoted: {
      beats: [
        '**{firstName}**: "Where the hell are you."\n\n"That\'s not a question you get to ignore. Where. Exactly."',
        "*You send it. Nothing comes back for four minutes.*\n\n\"Good,\" *he says finally.* \"I heard what went down in the east corridor tonight and I couldn't account for you. Turns out I'm not someone who handles that well.\"",
        "\"It's been drilled into me my whole life that a captain doesn't run down a hallway.\"\n\n\"I ran.\"\n\n\"Your place is at my back. I've said that to you before and you took it for possessiveness. It was. It was also the only way I had of saying I want to know where you are.\"",
      ],
      choice: {
        prompt: "\"So. What are you going to do about a man who ran?\"",
        options: [
          {
            key: "kind",
            label: "Tell him you're all right",
            style: 3,
            close: "\"I know you're all right. I've known for six minutes.\"\n\n\"Turns out knowing and believing aren't the same thing. Say it once more and I'll work on the second one.\"",
          },
          {
            key: "playful",
            label: "Say you'd pay to see it",
            style: 1,
            close: "\"Nobody saw it. I made sure nobody saw it.\"\n\n*A pause.*\n\n\"Tohma saw it. Tohma hasn't said a word, which from him is basically a parade. I'm never living it down.\"",
          },
          {
            key: "bold",
            label: "Tell him to come find you",
            style: 4,
            close: "*No reply at all.*\n\n*Seven minutes later there are footsteps outside, unhurried, because he won't be caught hurrying twice in one night. He doesn't knock. He takes your face in both hands, rings cold against your jaw, looks at you far longer than he needs to, and says,* \"There. Accounted for,\" *and doesn't let go for a good while after that.*",
          },
        ],
      },
      keepsake: {
        emoji: "🧥",
        line: "The coat he put around you without once admitting he'd run.",
      },
    },

    soulbound: {
      beats: [
        "**{firstName}**: \"I'm going to say something and I'd rather do it where I can't see your face. Yeah. That's cowardice. Doing it anyway.\"",
        "\"I counted. {timesMet} times you've come to me, and not once did I send for you.\"\n\n\"I want that on the record. My whole life people have been delivered to me. You just showed up.\"",
        "\"I was raised to make a good match. I can name you the families, the terms, the damn seating charts. There's no version of that where someone like you turns up at all.\"\n\n\"And I don't care. Haven't for a while. I've just been managing it carefully enough not to notice.\"",
        "\"So.\"\n\n*The typing indicator holds for a long while.*\n\n\"I love you. I know exactly what it costs me to put that in writing. I wrote it anyway. No title in front of it, no order behind it.\"\n\n\"Do what you want with it. You always do. It's the single most infuriating thing about you and I wouldn't take it back.\"",
      ],
      choice: {
        prompt: "\"Answer or don't. I can take either one.\"",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close: "*Nothing. Nothing for so long that you check the message sent.*\n\n\"Come here. Now. I don't care what time it is.\"\n\n*He meets you at the top of the stairs still in yesterday's shirt, and for a man who has never in his life been at a loss for what to say, he says nothing at all for a very long moment before he kisses you, carefully, the way he does everything, and then not carefully in the least.*",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close: "\"Fine.\" *It comes back without a second's hesitation, and there's nothing wounded in it.*\n\n\"I've never wanted anything I could just order. Take as long as you need. I'm terrible at waiting. I'll learn.\"\n\n*And he does. Nothing changes. He's exactly where he always is, insufferable and immovable, holding open the door of a room he has never once made you knock at.*",
          },
        ],
      },
      keepsake: {
        emoji: "💌",
        line: "The night the king wrote it down without a title in front of it.",
      },
    },
  },
  dialogue: {
    new: [
      "The frost never bothered him. That you walked into Frostheim uninvited is another matter.",
      "He doesn't turn to look at you. The cold in the room sharpens anyway.",
      "Frostheim's captain is holding court with no one at all. He notices you, and says nothing.",
      "He weighs you the way one weighs a servant he did not hire, quickly, and without much interest.",
      "Ice creeps along the window frame beside him. He lights a cigarette and waits for you to explain yourself.",
    ],
    known: [
      "He recognizes you now. He makes a point of not showing it.",
      '"You again," he says, and returns to his cigarette. He doesn\'t call you trash this time.',
      "Twice this week. He's noticed. He would deny having counted.",
      "The dismissal comes a beat slower than it used to.",
      "He looks up, places you, and looks back down. From Jin, that is nearly a greeting.",
    ],
    warm: [
      "He almost looks pleased when he sees you coming. Almost.",
      "He keeps speaking to whoever's in front of him, but the door stays open behind them.",
      "The room is still freezing. Somehow the chair nearest to him is not.",
      "He's already turned toward the sound of your footsteps by the time you round the corner.",
      '"You took the long way," he notes, without looking up. He\'d been counting.',
    ],
    spark: [
      "He allows you nearer than he allows anyone, and dares you to remark on it.",
      "He adjusts your collar without asking. His hand stays a moment past necessary.",
      "\"Don't move,\" he says quietly, and takes his time about whatever he's looking at.",
      "The cold doesn't reach you when you stand this close. He arranged that.",
      "He says your name once, low, and appears annoyed at how it came out.",
    ],
    close: [
      'The ice in his voice is long gone around you. "I was hoping I\'d run into you."',
      "He dismisses the others with a flick of his hand the moment he sees you.",
      "For once he isn't performing for anybody. He just looks glad.",
      '"You\'re late," he says, and the complaint has no teeth in it at all.',
      "He sets down whatever he was holding. Whatever it was, it can wait now.",
    ],
    bound: [
      "The door closes and every ounce of composure goes with it.",
      "He wakes before you and stays exactly where he is rather than disturb you.",
      '"Mine," he says against your throat, like a fact he\'s tired of not saying aloud.',
      "He kisses you like it's a thing he's owed and has waited far too long to collect.",
      "Frostheim is freezing. His bed is not. He has opinions about you leaving it.",
    ],
  },
  dialogueWhen: [
    {
      when: { time: "evening" },
      dialogue: {
        new: [
          "He hasn't turned on a light. The cold has teeth after dark and he seems to prefer it that way.",
          '"Frostheim after dark is mine," he says without turning. "You\'re standing in it."',
          "Frost has crept across the balcony doors behind him. He watches the black campus like he owns the view.",
          '"The cold gets worse after sundown," he says. "You knew that, and came anyway."',
        ],
        known: [
          '"Late," he observes. He doesn\'t say for what, and doesn\'t tell you to leave either.',
          "The cold doesn't reach the spot he's left open beside him. He arranged that before you arrived.",
          '"It\'s late," he says. "Stand somewhere useful and don\'t let the cold in."',
        ],
        warm: [
          '"Stay until the cold drives you in," he says. "Not before."',
          "He lights a cigarette against the dark and, for once, offers the rail beside him without a word.",
          '"Past curfew," he notes. "I won\'t report you. Sit down."',
        ],
      },
    },
  ],
  approachWhen: [
    {
      when: { time: "evening" },
      approach: {
        new: ["Step onto the dark balcony", "Meet him at the rail"],
        known: ["Take the cold beside him"],
        warm: ["Take the offered rail"],
      },
    },
  ],
  temperamentDialogue: {
    new: [
      "\"You're not supposed to be here. Don't waste my time.\"",
      '"Don\'t just stand there like an idiot. Hurry up."',
      '"Frostheim does not entertain wanderers. Explain yourself, servant."',
      '"Get to the point. The trash here is so long-winded."',
      '"Speak quickly. I don\'t like to wait."',
    ],
    known: [
      '"You. I remember you. Don\'t let it go to your head."',
      '"Still here? Then stand somewhere useful."',
      '"A class C anomaly? Miss me with that weak shit. Why do you think we have a Vice Captain?"',
      '"What? Your schedule\'s not my problem. Just arrange it around me."',
      '"Don\'t mistake familiarity for permission."',
    ],
    warm: [
      '"Your presence is... tolerable."',
      '"You again. Sit, if you must. Don\'t touch anything."',
      '"I didn\'t summon you. But you can stay."',
      '"Hmph. At least you had the sense to come to me directly."',
      "\"Don't stand in the doorway. You're letting the cold out.\"",
    ],
    spark: [
      '"Closer. I dislike raising my voice."',
      "\"You've grown bold. I find I don't mind it.\"",
      '"Look at me when I\'m speaking to you. ...Yes. Like that."',
      '"Everyone in this room is watching. Let them."',
      '"You are the only one here I have any interest in. Take that as you like."',
    ],
    close: [
      '"I suppose I can make an exception for you."',
      '"Stand closer. The cold doesn\'t reach you here."',
      '"There is no one else I would allow to see me like this."',
      '"Say what you came to say. I\'ll listen. Only for you."',
      "\"I don't repeat myself. So hear this once: I'd rather you stayed.\"",
    ],
    bound: [
      '"Come back to bed. That was not a request."',
      '"Let them talk. You wear my name well."',
      '"Stay. I have spent my whole life being denied things. Not this."',
      '"Do that again. ...Slower."',
      '"You are the single indulgence I refuse to apologize for."',
    ],
  },
  approach: {
    new: [
      "Step into the cold",
      "Meet his eyes anyway",
      "Announce yourself",
      "Refuse to be dismissed",
    ],
    known: [
      "Let him place you",
      "Stand somewhere useful",
      "Speak while allowed",
      "Come back anyway",
    ],
    warm: [
      "Walk over to him",
      "Take the seat he left open",
      "Break the silence first",
      "Greet him properly",
    ],
    spark: [
      "Close the last step",
      "Hold his gaze",
      "Let him fix your collar",
      "Let them watch",
    ],
    close: [
      "Go to him",
      "Close the distance",
      "Say his name",
      "Let him see you smile",
    ],
    bound: [
      "Come back to bed",
      "Wear his name",
      "Kiss him first",
      "Refuse to leave",
    ],
  },
  responses: {
    kind: {
      new: [
        "Show respect for his pride",
        "Thank him for his time",
        "Address him the way he expects",
      ],
      spark: [
        "Let him hold your gaze",
        "Be gentle with his pride",
        "Lean in when he allows it",
      ],
      close: [
        "See his pain without judgment",
        "Tell him he's not alone",
        "Let the crown come off",
      ],
      bound: [
        "Stay where you are",
        "Touch his face",
        "Tell him he's allowed this",
      ],
    },
    playful: {
      new: [
        "Tease the frost right back",
        "Refuse to be impressed",
        "Call his bluff lightly",
      ],
      spark: [
        "Tease the ice",
        "Make him lose his composure",
        "Call him possessive",
      ],
      close: [
        "Tease him out of his shell",
        "Poke at his pride, gently",
        "Call him spoiled to his face",
      ],
      bound: [
        "Steal the warm side",
        "Make him ask nicely",
        "Wear his coat out",
      ],
    },
    bold: {
      new: [
        "Stand with confidence",
        "Meet him as an equal",
        "Refuse to look away",
      ],
      spark: [
        "Close the last inch",
        "Take his hand without asking",
        "Tell him you want this",
      ],
      close: [
        "Show him you won't break",
        "Take his hand first",
        "Tell him you're staying",
      ],
      bound: [
        "Pull him back down",
        "Say it against his mouth",
        "Tell him to be slower",
      ],
    },
    neutral: {
      new: [
        "Respect his space",
        "Wait for him to speak",
        "Say nothing at all",
      ],
      spark: [
        "Let the moment pass",
        "Look away first",
        "Say nothing, let him wonder",
      ],
      close: [
        "Sit with him in silence",
        "Stay within reach",
        "Let the quiet do the talking",
      ],
      bound: [
        "Let him sleep",
        "Lie still beside him",
        "Stay quiet in the dark",
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
      '**{name}** does not turn. "...Speak. You have my attention for exactly that long." {user} had used his name.',
      "{user} named him, and **{name}** looked over, unimpressed that it took this long.",
      '"You know who I am. Good." **{name}** allows {user} one step closer.',
    ],
    warm: [
      "\"Walk with me, then. Don't dawdle.\" **{name}** doesn't break stride, but {user} had guessed right.",
      '"You again." **{name}** says it to {user} like a verdict he has stopped appealing.',
      "{user} got the name out, and **{name}** waved off whoever else was waiting.",
    ],
    spark: [
      '"Say it again." **{name}** turns fully to {user} this time.',
      "{user} named him first, and **{name}** looks far too pleased for a man of his composure.",
      "**{name}** does not summon {user} over. He simply stops, and waits, which is worse.",
    ],
    close: [
      "The **{house}** dispatch goes to Tohma. **{name}** goes to {user}.",
      "\"You needn't shout. I hear you before anyone.\" **{name}** is already at {user}'s side.",
      "**{name}** drops the court voice the second it's {user} saying his name.",
    ],
    bound: [
      '"Mine," **{name}** says, as though {user} calling out had settled an argument he\'d been having alone.',
      "**{name}** hands the **{house}** roster to someone else without looking. {user} called; that ends it.",
      "{user} says the name, and **{name}**, who has spent a lifetime being denied things, takes what is his.",
    ],
  },
};
