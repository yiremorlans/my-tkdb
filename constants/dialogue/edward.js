export default {
  // The level-up DMs (docs/bond-scene-dms.md). Edward is four hundred years old
  // and performs fragility as a hobby; the courtly register never drops, it just
  // stops being armor. He asks before he bites and he asks before everything
  // else too, which is the shape of the intimacy here — a predator who has made
  // consent into a manner. The lost "her" surfaces at Confidant, unnamed and
  // kept deliberately vague — canon only gives us "you remind me a little of
  // her," so no name, no dates, no biography beyond what grief needs.
  // Texting is the one modern custom Rui never fully broke him of. Per
  // reference.md's "## Bond Scenes" notes he types boomer-style: ornate
  // sentences close on two or more painfully literal emojis in a row, and
  // grand declarations come out in Title Case ("I Do Not Count Things"). The
  // same notes say his DMs are terser and more direct than he is aloud, so the
  // typed beats stay short even where the `> ` lines he speaks run long. Emojis
  // and Title Case never appear in button labels or the keepsake line.
  bondScenes: {
    acquaintance: {
      beats: [
        "**{firstName}**: You Will Forgive The Hour. I keep no other kind, and I have found that the living are at their most honest when tired. 😴🌙",
        "I have watched you cross the Obscuary hall {timesMet} times, and every time, you look directly at me.\n\nThat is not nothing. The living look at my collar, my hands, a point six inches beside my head. Four centuries and I can name every place they look instead.\n\nI once performed a cough for you outside the infirmary. Tragic, consumptive, the fruit of centuries. You told me to find Rui. 😷🎭\n\nYou Look Me In The Eye. 👀✨ I have begun arranging my afternoons around it. 🌇🖤",
      ],
      choice: {
        prompt: "Now. Say something dreadful to me. It has been an age since anybody dared. 😈🔪",
        options: [
          {
            key: "kind",
            label: "Say his face is worth it",
            style: 3,
            close: "...That was not dreadful at all. You have cheated.\n\nDo it again some time when I am braced for it. I was not braced for it. 😤😳",
          },
          {
            key: "playful",
            label: "Say he looks tired",
            style: 1,
            close: "I am *four hundred years old*, wicked thing, of course I look tired.\n\nNobody says so. They say *pale*, which is a polite way of saying they have not looked. 😩💀",
          },
          {
            key: "bold",
            label: "Ask what he's watching for",
            style: 4,
            close: "*There is a considered silence.*\n\nAn answer I have not had in a very long while, *he says.* Which is not a proper reply, and you will not get a better one tonight. Sleep well, lovely creature. 🌙💤",
          },
        ],
      },
      keepsake: {
        emoji: "🕯️",
        line: "The first person in a century to look him in the eye rather than beside it.",
      },
    },

    friend: {
      beats: [
        "**{firstName}**: A confession, offered at an hour when confessions are cheapest. 💌🕯️",
        "First, one piece of business. As your self-appointed advisor in matters of the heart, I must ask: Rui, or Lyca. I am dying to be proven right, figuratively; I no longer do the other kind.\n\nRui is somewhere in the house right now, developing a headache over the mere fact that I have asked. 🤕😌 That is the appeal of asking.\n\nOr you could say me, and spare the boy his headache. Purely as a mercy. 😇🤝",
        "That was not the confession. This is.\n\nYou answer me with {favResponse}, every time, without the small recalculation I get from everyone who learns what I am. The living flinch. A quarter-second half-step back, weight onto the back foot. I have never once been wrong about it.\n\nYou Have Not Done It. Not once in {timesMet}. I find the absence more interesting than anything else in this building. 🤔🔍",
      ],
      choice: {
        prompt: "Well? Am I to be flattered or frightened? I have a fondness for both. 😏🖤",
        options: [
          {
            key: "kind",
            label: "Say he's not frightening",
            style: 3,
            close: "How very disappointing.\n\n*A long pause.*\n\n...And how very restful. I had forgotten there was such a thing as being restful at somebody. Do carry on. 😌☺️",
          },
          {
            key: "playful",
            label: "Do the step back on purpose",
            style: 1,
            close: "You did not.\n\nYou did. You did it deliberately and badly and I have not laughed in some months, 😂😂 so I shall have to allow it.",
          },
          {
            key: "bold",
            label: "Ask what he'd do if you had",
            style: 4,
            close: "Nothing whatsoever. That is the tragedy of it.\n\nI would have been charming, shown you out, and thought about it for a decade. That is the entire repertoire, lovely thing. Four centuries and no second move. 😔🎭",
          },
        ],
      },
      keepsake: {
        emoji: "🪞",
        line: "The quarter-second step back that you never once took.",
      },
    },

    closeFriend: {
      beats: [
        "**{firstName}**: Come up to the tower. I have something to show you and I have decided to be embarrassed about it in advance, so that the moment itself may pass off smoothly. 😳🙈",
        "*The room is exactly as ancient and theatrical as advertised, and in the middle of it is a laptop on a velvet cushion, playing a two-hour video about the shady cabal of elites secretly governing human society. 🕵️*\n\n> I am aware.\n\n> I have watched eleven hours of this particular gentleman's output. He is *magnificently* wrong, and he is wrong at three in the morning, which is when I want company and have none. 😔",
        "> Four hundred years, wicked girl. Do you know what four hundred years of nights is? It is not romantic. It is a very great deal of sitting.\n\n> This is what I do with them. Not blood, not brooding, not whatever the Frostheim boys imagine. A man in a shed explaining that the pyramids were a battery.\n\n> You are the first person I have ever admitted that to, and I would take it as a kindness if you sat down. 🙏",
      ],
      choice: {
        prompt: "Well? Sit, or flee. 🏃🚪 Both are perfectly reasonable.",
        options: [
          {
            key: "kind",
            label: "Sit down and watch it",
            style: 3,
            close: "*You get through two of them. He talks over the whole of the second, which is clearly the point of the exercise.*\n\n*At some stage you fall asleep against his shoulder, 😴 and he does not move for the rest of it, and in the morning he affects not to have noticed, badly.*",
          },
          {
            key: "playful",
            label: "Ask who's in the cabal",
            style: 1,
            close: "> Oh, do not *encourage* it.\n\n*He explains the entire conspiracy for eleven minutes without drawing breath, footnotes and all, entirely delighted, then stops and looks appalled at himself.*\n\n> ...You did that on purpose. Wicked thing. 😅",
          },
          {
            key: "bold",
            label: "Ask why you're the first",
            style: 4,
            close: "> Because it is undignified, and dignity is very nearly all I have left.\n\n> And because you would not use it. I have known perhaps four people in four centuries of whom that was true, and three of them are some while dead. 💀",
          },
        ],
      },
      keepsake: {
        emoji: "🛋️",
        line: "Eleven hours of nonsense, admitted to out loud.",
      },
    },

    confidant: {
      beats: [
        "**{firstName}**: I am going to tell you about her, and then I shall not mention her again, and you will please not ask me to. 🥀🕯️",
        "Her name is not the point and I am not going to give it to you. She was not remarkable in any way that would survive being written down, and I loved her past all sense. 🥀\n\nShe was young when I met her and she was old when she stopped, and I was precisely as I am now for the whole of it, which is the part nobody ever understands.",
        "I have said for centuries that the living die so quickly. I say it languidly, at parties; people find it chilling and I let them. It is the only sentence I have built that holds the whole fact without making me feel it.\n\nThey also call me the most powerful vampire who ever lived. 🧛🦇 Useful for keeping first-years out of the east wing. I have never confirmed it and I have never denied it; the ambiguity does more work than either answer would.\n\nWhat I will tell you is the dull part. A long, forgettable life in Eastern Europe, quiet as a shut drawer, that nobody repeats because it makes a poor story. You strike me as someone worth being dull with. 🫖📖",
      ],
      choice: {
        prompt: "There. You may say something now, and I would very much rather it were not sympathy. 🙏🥀",
        options: [
          {
            key: "kind",
            label: "Ask what she was like",
            style: 3,
            close: "*The reply takes a very long time.*\n\nDifficult. Funny at the wrong moments. Certain about small things in a way I found exhausting and now miss unbearably.\n\n*And then, unmistakably, a man who has not talked about someone in a hundred years talking about them until it gets light, and at the end of it:* Thank you. Not for the sympathy. For the question. Nobody asks what she was *like*. 🥺💭",
          },
          {
            key: "playful",
            label: "Ask if she knew what he was",
            style: 1,
            close: "She worked it out inside the year and stayed regardless. Appalling judgment. I adored her for it.\n\n...I have not smiled about her in some decades. 😊🥲 That is your doing and I have not decided whether to be grateful.",
          },
          {
            key: "bold",
            label: "Say you'll die quickly too",
            style: 4,
            close: "*There is nothing at all for several minutes.*\n\nI am aware, *he writes.* Since the first evening. I have gone on arranging my afternoons regardless, which is either courage or the great foolishness of my life.\n\nDo not say it again. Not because it is untrue, but because I have decided to be foolish and should like to manage it uninterrupted. 🙈⏳",
          },
        ],
      },
      keepsake: {
        emoji: "🥀",
        line: "Someone he loved and outlived, described out loud for the first time in a hundred years.",
      },
    },

    devoted: {
      beats: [
        "**{firstName}**: You are unharmed. I have established that before writing, because I did not trust myself to establish it after. 😮‍💨🖤",
        "I have spent four centuries being languid at people. It is not an affectation; it is a discipline. What I am, unmanaged, is not something anybody in this academy has ever seen and I have taken a very great deal of care that they should not.\n\nRui saw it tonight. He will not say anything. He went rather white 😨😰 and he will not say anything.",
        "I will not describe the lower corridor. Only what came after: I stood there some minutes, certain of one thing.\n\nWhatever the sun takes from me by day, the dark gives back with interest, and tonight I was more myself than usual by a wide margin.\n\nI Would Do It Again. Without the discipline, in front of anybody. That is not romantic, lovely creature. It is a warning, from someone fond of you, about someone you should be careful of. ⚠️🩸",
      ],
      choice: {
        prompt: "Now you may be frightened. It is quite the correct response and I shall not think less of you. 😰💔",
        options: [
          {
            key: "kind",
            label: "Say you're not frightened",
            style: 3,
            close: "You ought to be.\n\n*A long pause.*\n\n...Come up. Not to discuss it. I have been sitting in this chair for two hours being extremely composed and I find I would rather be in a room with you and stop.\n\n*He does stop. He puts his head down on your shoulder, four hundred years old and entirely undone, and does not move for a long while. 🥹🖤*",
          },
          {
            key: "playful",
            label: "Ask if the discipline's ruined",
            style: 1,
            close: "Utterly. Four centuries, and I am back to first principles because of a corridor.\n\nRui has offered me a drink and a conversation about my feelings. I would rather be staked. 😵⚰️ Come up instead and let me be ridiculous at somebody who will not be gentle about it.",
          },
          {
            key: "bold",
            label: "Tell him to bite you",
            style: 4,
            close: "*The reply is immediate and quite unlike anything he has sent before.*\n\nNo.\n\n*Then, more slowly:* I ask. Always, of everyone, and I have never once wanted an answer as much as I do not want that one from you.\n\nAsk me again some evening when I have not just come out of a corridor. I shall almost certainly say something disgraceful, and I should like to be in my right mind when I do. 🩸🖤",
          },
        ],
      },
      keepsake: {
        emoji: "⛓️",
        line: "A discipline of four centuries, given up over one corridor.",
      },
    },

    soulbound: {
      beats: [
        "**{firstName}**: I have written this six times. Each attempt was more elegant than the last, and I have discarded all of them for that reason. 📝🗑️",
        "{timesMet} occasions. I Do Not Count Things. Counting is for creatures with a reason to hurry, and I have been very careful never to have one.\n\nI have counted every single one of yours. 🔢🖤",
        "I told you about her and said I would not mention her again. One more thing, then I close the subject.\n\nI never told her what I felt. All those years of it, and I decided, nobly I thought, that it would be cruel to make her carry the weight of what I am.\n\nShe died not knowing. I have had a hundred years to call that noble. It was not. It was cowardice with excellent manners. 🎭🥀",
        "So.\n\nI love you. ❤️❤️ Said plainly, no elegant construction anywhere near it, which for me is like standing in a doorway with no clothes on.\n\nYou will die quickly. I know it, you know it, I am saying it anyway. I made that mistake once. A creature who makes it twice deserves the four hundred years he gets. 🖤⏳",
      ],
      choice: {
        prompt: "Take whatever time you like, wicked thing. I have a certain amount of it. ⏳🖤",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close: "Come up.\n\n*He is standing when you arrive, not languid, not draped over anything, simply standing in the middle of the room like a man who has been waiting.*\n\n*He takes your jaw in both cold hands and looks at you for an unreasonably long time.*\n\n> Say it once more.\n\n*he says.*\n\n> I waited an entire mortal lifetime to hear it the last time and it never came. I intend to be quite greedy about hearing it now. 🥰",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close: "But of course. I have made a specialization of waiting, though not, historically, a successful one.\n\nUnderstand this: the tower is open, the dreadful videos continue at three. None of it was a maneuver. It was the best part of four centuries and I would not give it up for a refusal.\n\nTake your time, lovely creature. I shall be here, ridiculous about the cabal. 🕵️📺",
          },
        ],
      },
      keepsake: {
        emoji: "🍷",
        line: "The mistake he refused to make a second time.",
      },
    },
  },
  dialogue: {
    new: [
      "He greets you with a charming smile, but there's something dangerous beneath the gentleman's facade.",
      "He takes your hand to bow over it before asking whether he may. He does ask. Afterward.",
      '"How delicate you look," he murmurs, in a room where he is by far the more dangerous thing.',
      "He is standing much too close for a first meeting, and entirely unbothered by that.",
      '"The most powerful vampire? No, those are just rumors." He smiles as if it amuses him.',
    ],
    known: [
      "The gentleman act is unchanged. The interest behind it is no longer performed.",
      '"You\'ve returned," he says, as though it were remarkable. To him it is.',
      "He's had a chair moved. He'll claim it was always positioned that way.",
      "\"Ah, there you are. I've a favor to ask of you: come to my room and I'll explain.\"",
      "The fragility slips for a moment. He lets it, and watches what you do.",
    ],
    warm: [
      "The fragile act drops for a moment when you're near: you see the predator underneath, and he lets you.",
      '"You\'ve stopped flinching," he observes, sounding thrilled and slightly put out.',
      'He winces, a hand at his ribs. "Oh, it hurts... I cannot seem to shake this ache in the place Rui touched me earlier. I think I\'ll rest a while."',
      "He offers his arm, then his coat, then a chair, in rapid succession. It's a lot.",
      "There's a glass poured for you already. It's your preference. He remembered.",
    ],
    spark: [
      "His gaze settles on your throat, and he takes rather too long to look away.",
      '"You do test a man\'s restraint," he murmurs, testing nothing at all.',
      "He kisses the back of your hand and lingers well past the century's etiquette.",
      "The fragile act is gone. What's left is old, hungry, and extremely well-mannered about it.",
      "He tilts his head, considering you, the way one considers something one intends to have.",
    ],
    close: [
      '"I\'ve been waiting lifetimes for someone who could see me like this," he says, pulling you close. "Don\'t leave me again."',
      "The theatrics finally exhaust themselves, and what's left is old, and lonely, and yours.",
      "He rests his forehead against yours and stops talking, which is unprecedented.",
      '"Everything I\'ve pretended to be," he says, "you saw past on the first night."',
      "He holds on a little too tightly. Neither of you comments on it.",
    ],
    bound: [
      "He asks before he bites, every time, and the asking is somehow worse.",
      '"Centuries," he murmurs against your throat, "and not one of them was this."',
      "He undresses you the way he does everything: slowly, and with immaculate manners.",
      "He keeps the curtains drawn well past dawn and blames the sun entirely.",
      "The gentleman is intact. What's under it has stopped pretending to be tame.",
    ],
  },
  temperamentDialogue: {
    new: [
      '"Oh my, what a lovely lady. Welcome to my home."',
      '"Do come in. I bite, but rarely without permission."',
      '"You mustn\'t wander Obscuary alone. Allow me. I insist."',
      '"How fragile you are. It\'s terribly charming."',
      '"I have no interest in harming humans. After all, they die so quickly. They should enjoy their short lives while they can."',
    ],
    known: [
      '"Back so soon? How wonderfully poor of your judgment."',
      '"I remember you. I remember everyone, but I remember you pleasantly."',
      "\"Do sit. I've had the chair moved. No, I've no idea why either.\"",
      "\"You've stopped looking for the exit. That's progress, lovely lady.\"",
      "\"I'm more or less confined to this house most days, for various reasons. I'm on my best behavior. But I'll do what I can to support you from the sidelines.\"",
    ],
    warm: [
      '"Lovely lady, I was hoping you\'d visit. Come closer."',
      '"You\'re not afraid of me anymore. How disappointing. How wonderful."',
      '"Sit. No, here, beside me. Personal space is a modern invention."',
      '"I poured this before you arrived. Call it optimism."',
      '"What did I do before Darkwick? I eked out a humble existence in Eastern Europe. Nothing worth the telling."',
    ],
    spark: [
      '"Come closer, lovely lady. I promise to behave. I make poor promises."',
      '"You know what I am. You keep standing there anyway. How flattering."',
      '"May I? Only your hand. ...For now."',
      '"I have restrained myself for a very long time. Do say if I needn\'t."',
      '"That pulse of yours is being terribly loud about all this."',
    ],
    close: [
      '"You belong right here, next to me. Don\'t ever leave."',
      '"I have outlived a great deal. I would rather not outlive this."',
      '"No performance tonight, lovely lady. Only me. Is that enough?"',
      '"Stay until dawn. Stay past it. I\'ll manage the curtains."',
      '"Come here. Closer. There, now the room is bearable."',
    ],
    bound: [
      '"May I? ...You always say yes. It undoes me every time."',
      '"I love you. I\'ve had a very long time to be certain of something."',
      '"Stay past dawn, lovely lady. I\'ll manage the curtains."',
      '"Come here. Let me be terribly, terribly improper about you."',
      '"You\'re mine and I am, rather more surprisingly, entirely yours."',
    ],
  },
  approach: {
    new: [
      "Let him take your hand",
      "Step into the candlelight",
      "Accept the invitation",
      "Don't flinch",
    ],
    known: [
      "Take the moved chair",
      "Stop looking for the exit",
      "Tell him about your week",
      "Let the act slip",
    ],
    warm: [
      "Take his arm",
      "Sit beside him",
      "Accept the poured glass",
      "Close the distance yourself",
    ],
    spark: [
      "Come closer",
      "Offer your hand",
      "Say he can let loose",
      "Stand there anyway",
    ],
    close: [
      "Go to him",
      "Let him hold on",
      "Stay past dawn",
      "Tell him you see him",
    ],
    bound: [
      "Say yes",
      "Stay past dawn",
      "Let him be improper",
      "Bare your throat",
    ],
  },
  responses: {
    kind: {
      new: [
        "Let him be gracious",
        "Accept the courtesy",
        "Thank him for the escort",
      ],
      spark: [
        "Offer your hand",
        "Tell him you're not frightened",
        "Take him at his word",
      ],
      close: [
        "Let him get closer",
        "Tell him he's not alone",
        "Say the act was never needed",
      ],
      bound: ["Say yes again", "Tell him he's yours too", "Let him ask"],
    },
    playful: {
      new: [
        "Keep him at bay playfully",
        "Out-charm the gentleman",
        "Pretend to swoon",
      ],
      spark: [
        "Test the restraint",
        "Make a poor promise back",
        "Withdraw the hand slowly",
      ],
      close: [
        "Flirt back with him",
        "Tease him about the theatrics",
        "Call him lovely first",
      ],
      bound: ["Make him ask twice", "Open the curtains", "Say no, then yes"],
    },
    bold: {
      new: [
        "Meet his gaze with strength",
        "Step closer instead of back",
        "Give him permission",
      ],
      spark: [
        "Tell him to let loose",
        "Tilt your head back",
        "Say you know what he is",
      ],
      close: [
        "Pull him closer yourself",
        "Tell him you're not leaving",
        "Say you'd stay lifetimes",
      ],
      bound: [
        "Bare your throat",
        "Tell him not to ask",
        "Pull him past the manners",
      ],
    },
    neutral: {
      new: [
        "Stay watchful",
        "Let him do the talking",
        "Keep your hand to yourself",
      ],
      spark: ["Withdraw your hand", "Let the moment cool", "Say nothing"],
      close: [
        "Let him watch in silence",
        "Stay through the quiet hour",
        "Let him hold on wordlessly",
      ],
      bound: ["Draw the curtains", "Let him wait", "Say nothing"],
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
      "**{name}** bows over {user}'s hand and asks permission afterward.",
      '"Oh my. What a lovely lady." **{name}** greets {user} as though they were in a drawing room and not the middle of everything.',
      "{user} says the name, and **{name}** smiles with rather too many implications in it.",
    ],
    warm: [
      '"You\'ve stopped flinching," **{name}** observes to {user}, thrilled and slightly put out.',
      "{user} calls out, and **{name}**'s cough evaporates. He forgets to bring it back.",
      '"Do come here." **{name}** informs {user} that personal space is a modern invention.',
    ],
    spark: [
      '"Wicked girl." **{name}** says it to {user} as a compliment.',
      "{user} says the name, and **{name}** stops performing frailty for the length of one look.",
      '"What were you hoping for? Go on, say it." **{name}** waits on {user}, unhurried.',
    ],
    close: [
      '"May I?" **{name}** asks {user}, in public, about something unspecified.',
      "**{name}** takes {user}'s arm and leaves the **{house}** business entirely unattended.",
      "{user} calls, and the ancient thing under **{name}**'s manners answers immediately.",
    ],
    bound: [
      '"Centuries," **{name}** murmurs to {user}, "and not one of them was this."',
      "**{name}** crosses to {user} without the parasol, the cough, or any of the rest of it.",
      "{user} says the name, and **{name}** stops being alone.",
    ],
  },
};
