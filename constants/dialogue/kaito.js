export default {
  // The level-up DMs (docs/bond-scene-dms.md). Kaito over-sends and then
  // apologizes for having sent; the intimacy is that he keeps hitting send
  // anyway. Kind is what reaches him, so every choice is really about whether
  // the reassurance he is fishing for actually arrives.
  bondScenes: {
    acquaintance: {
      beats: [
        "*Nine messages arrive at once, then a tenth that just says: ignore all that.*\n\n**{firstName}**: okay so I got your contact off the house sheet which is probably WEIRD, is that weird? that's weird\n\nI'm deleting this\n\nI can't delete this you've already seen it",
        "Okay okay okay. Real reason. *A photo comes through: a tray of something small and burnt on one side.* I made too many. Like, a genuinely stupid amount. And I thought... you've turned up {timesMet} times now and you never once looked at me like I was a waste of a conversation, so.\n\nSo there's some with your name on. Literally. I wrote your name on the paper. That's the part I regret.",
      ],
      choice: {
        prompt:
          "...You can say no! Seriously! I'm so normal about being told no!",
        options: [
          {
            key: "kind",
            label: "Say yes before he spirals",
            style: 3,
            close:
              "WAIT REALLY?\n\n*Then, immediately:* cool. cool cool cool. that's... yeah. cool.\n\n*The next message is a photo of him grinning so hard his eyes have shut, and then a fourth message that just says: ignore that one.*",
          },
          {
            key: "playful",
            label: "Ask about the burnt side",
            style: 1,
            close:
              "THAT'S THE CARAMELIZED SIDE. That's on PURPOSE.\n\nIt is not on purpose. I panicked and turned the oven up. Please still come.",
          },
          {
            key: "bold",
            label: "Ask if yours came first",
            style: 4,
            close:
              "*There is a very long gap.*\n\n...I made the tray for you and then made extra so it'd look like an accident, *he types, all at once, like ripping a plaster off.* OKAY BYE.",
          },
        ],
      },
      keepsake: {
        emoji: "🍪",
        line: "A slip of baking paper with your name written on it in blue biro.",
      },
    },

    friend: {
      beats: [
        "**{firstName}**: hey can I ask you something and you have to promise not to make it a whole thing",
        "You always come back with {favResponse}. Every single time. Even when I've been... you know. A lot. Even when I could hear myself being a lot.\n\nAnd I've been trying to work out why, because everyone else waits for me to run out of steam and then talks about something else, and I've gotten really good at not minding that. Like, professionally good.\n\nYou don't do the waiting thing. That's all. That's the question. Why don't you do the waiting thing.",
      ],
      choice: {
        prompt: "...Was that too much? That was too much. Sorry.",
        options: [
          {
            key: "kind",
            label: "Tell him you like listening",
            style: 3,
            close:
              "*The typing indicator runs for a long time and produces one word.*\n\noh.\n\n*Then, four minutes later:* sorry I had to put the phone down for a sec.",
          },
          {
            key: "playful",
            label: "Say he's growing on you",
            style: 1,
            close:
              "LIKE MOLD?\n\nWait, no, I'm taking that as a win. That's a win. I'm screenshotting that and looking at it later, which is a normal thing people do.",
          },
          {
            key: "bold",
            label: "Tell him to stop apologizing",
            style: 4,
            close:
              "Sorr... okay. Not saying it.\n\nThat's really hard actually. Can I have one? Just one, banked, for emergencies.",
          },
        ],
      },
      keepsake: {
        emoji: "📤",
        line: "The message he sent instead of deleting it, for once.",
      },
    },

    closeFriend: {
      beats: [
        "*It's late. The message isn't loud, which from him is the first sign something is off.*\n\n**{firstName}**: are you up\n\ndon't answer if you're not up. I'll be fine. I'm always fine.",
        "Collections came round again. It's handled. It's... I handled it. Mostly.\n\nI didn't tell anyone in the house because they'd look at me the way they look at me. Lucas would want to *help*. Jin would pay it and then own me forever, which honestly, you know, tempting.",
        "I just wanted to say it out loud to someone who's not going to fix it. Does that make sense? I don't want it fixed, I want it to have been heard.\n\nYou're the only person I could think of at two in the morning. That's not a small thing for me. That's basically the biggest thing.",
      ],
      choice: {
        prompt: "Say something dumb so I stop feeling like this.",
        options: [
          {
            key: "kind",
            label: "Tell him you're staying up",
            style: 3,
            close:
              "You don't have to.\n\nStay up. Please stay up. You can just leave the read receipt on, you don't even have to type, I just want to see it say online.\n\n*It says online until six.*",
          },
          {
            key: "playful",
            label: "Send him something stupid",
            style: 1,
            close:
              "*He reacts to it in under a second. Then sends four worse ones back. Then:* okay I'm laughing. I hate that that worked. thank you for making that work.",
          },
          {
            key: "bold",
            label: "Tell him you're coming over",
            style: 4,
            close:
              "WHAT... no, it's two in the...\n\n*He stops typing.*\n\n...The side door sticks. You have to lift it. I'll leave the light on.\n\n*He doesn't say a word when you get there. He just sits down against you on the floor of the kitchen with his head on your shoulder, and the two of you stay there until the ovens come on.*",
          },
        ],
      },
      keepsake: {
        emoji: "💡",
        line: "The kitchen light he left on for you at two in the morning.",
      },
    },

    confidant: {
      beats: [
        "**{firstName}**: okay I need you to read this whole thing before you say anything\n\nI've typed it out four times",
        "Everyone here has a thing. Lucas has the strength. Jin has the... being Jin. Tohma has whatever Tohma has, which I've decided not to look into.\n\nMy gran raised me on instant ramen and hand-me-downs, and I still don't know how I ended up in a house where everyone's family tree has a crest on it. I got in on a technicality and I've been waiting nearly two years for somebody to notice and send me home. Every single mission I'm the one you have to work around. I know that. I've known that the whole time.",
        "And the thing is I'm not brave, I'm not going to get brave, that's not... that's not a thing that's coming.\n\nBut I want to be. For you specifically, which I know is embarrassing, and I've decided to be embarrassing about it because you're the only person I've ever wanted to be worth something in front of.\n\nThat's it. That's the four drafts.",
      ],
      choice: {
        prompt:
          "Please say literally anything. The silence is doing numbers on me.",
        options: [
          {
            key: "kind",
            label: "Say he already is worth it",
            style: 3,
            close:
              "don't.\n\n*Then:* sorry. don't stop. say it again but slower, I want to actually hear it this time instead of deciding you didn't mean it.\n\n*So you say it again, slower. He goes quiet for a while, and when he comes back all he sends is a heart, which from him, who sends fourteen of everything, is the loudest thing he has ever done.*",
          },
          {
            key: "playful",
            label: "Point out he sent it anyway",
            style: 1,
            close:
              "...I did send it, didn't I.\n\nHuh. Put that on the list. Sent one (1) terrifying message. That's the bravest thing I've done all year and it was aimed at you, which tracks.",
          },
          {
            key: "bold",
            label: "Tell him to be brave right now",
            style: 4,
            close:
              "Right now? Like... now now?\n\n*The phone rings before you can answer. He is audibly holding it with both hands.*\n\n> Hi. Hi. I called. That's the bravest thing available at this hour, I checked.\n\n*He doesn't hang up for an hour and a half, and mostly you both just breathe at each other.*",
          },
        ],
      },
      keepsake: {
        emoji: "📝",
        line: "The fifth draft, the one he actually sent.",
      },
    },

    devoted: {
      beats: [
        "**{firstName}**: don't be mad\n\nI did something",
        "*The photo is his hand, wrapped badly, the bandage clearly done one-handed by somebody who has never bandaged anything.*\n\nSo there was a thing in the corridor and it was going for you and I did the... I did a shout. I shouted at it. Really loud. And it looked at me instead.\n\nWhich was the plan! That was the entire plan! I don't have a second part of the plan, that was it, and it WORKED.",
        "Yuri says it's fine in like a week. Yuri also said \"fascinating\" twice, which I've decided not to think about.\n\nI'm not telling you so you'll feel bad. I'm telling you because I've spent my whole life being the one who runs, and tonight I was in front of you and I didn't, and I need someone to know that happened. Specifically you. Only you, really.",
      ],
      choice: {
        prompt: "Was that... did I do good? Tell me I did good.",
        options: [
          {
            key: "kind",
            label: "Tell him he did good",
            style: 3,
            close:
              "*There's no reply for a bit. Then a voice note, four seconds long, of him just breathing out.*\n\n*Then:* okay. okay. I'm going to listen to you say that on a loop probably forever.\n\n*When you find him he lets you redo the bandage properly, and he watches your hands the whole time and doesn't say one word.*",
          },
          {
            key: "playful",
            label: "Critique the bandage work",
            style: 1,
            close:
              "IT'S STRUCTURALLY SOUND.\n\nIt is not structurally sound. It came off twice. Please come and do it, I've been sitting here for an hour hoping you'd offer so I wouldn't have to ask.",
          },
          {
            key: "bold",
            label: "Tell him never to do it again",
            style: 4,
            close:
              "...No.\n\n*It's the flattest thing he's ever sent you. No caps, no scramble, nothing.*\n\nSorry. Anything else. Not that. I said I wanted to be your knight in shining armor and everyone thought it was a bit, including me, honestly. It wasn't a bit.",
          },
        ],
      },
      keepsake: {
        emoji: "🩹",
        line: "The bandage he did wrong, so you'd have to do it right.",
      },
    },

    soulbound: {
      beats: [
        "**{firstName}**: I'm not going to chicken out this time. I've told three people I'm doing this so I can't chicken out. Ren is watching me type.\n\n(Ren has left. Ren says good luck. I'm alone now. It's worse.)",
        "{timesMet} times. I counted them on the calendar app like a complete lunatic, I have a color for you and everything.\n\nEvery single one of them I've thought, this is it, this is the day I say it, and then you smile at something and my entire brain leaves.",
        "And I know what I am. I'm the one everyone's nice about. I'm the one you're kind to. I've had my whole life to get used to being the one people are kind to.\n\nBut you're not kind to me. You're... you *pick* me. You keep picking me and I don't understand it and I've stopped trying to.\n\nMy gran used to say that, actually. That kindness isn't luck, it's a decision somebody keeps making about you. I was like fourteen, I said \"okay grandma\" and rolled my eyes so hard. I get it now.",
        "So here it is and I'm not deleting it.\n\nI love you. I've loved you since way before I was allowed to, since before I was anything worth loving back, and I'm saying it out loud with my whole chest for once instead of hiding it in nine messages at once.\n\nYou don't have to say it. Genuinely. I've already done the impossible part.",
      ],
      choice: {
        prompt:
          "Okay. I'm going to put the phone face down now. Do your worst.",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close:
              "*The phone is face down for exactly eleven seconds.*\n\n*Then it's a call, then it's him at your door out of breath with his jacket on inside out, and he gets about half of* I ran *out before you pull him in, and he holds onto you like someone who genuinely expected to be turned away and has no plan for this at all.*\n\n> Say it again.\n\n*he says into your shoulder.*\n\n> Sorry. Say it like ninety more times.",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close:
              "Yeah! Yeah, of course, that's... that's completely fine, that's so fine.\n\n*Then, with none of the scramble in it:*\n\nI mean it. Take ages. I've been carrying this around for two years, I'm extremely good at carrying it, it's basically the one thing I'm good at.\n\nAnd I'll still be here being annoying at you tomorrow. That was never conditional. That was never even a question.",
          },
        ],
      },
      keepsake: {
        emoji: "📨",
        line: "The message he told three people about so he couldn't take it back.",
      },
    },
  },
  dialogue: {
    new: [
      "He's pressed into a doorway watching the hall, and startles hard when he clocks you. \"Oh... oh thank god, it's just you.\"",
      "He's mid-rant about something leaked on WickHive before he's said hello. You've just become the audience.",
      "\"You're new? Ask me anything you want to know, I'm pretty savvy when it comes to Darkwick.\" It's the one thing he says without a wobble.",
      'He waves so hard he nearly clips a lamp. "Hey! Over here! Hiya!"',
      "He offers you half of whatever he's snacking on before he thinks to ask your name.",
    ],
    known: [
      "He lights up when he spots you, then immediately checks whether he's bothering you.",
      '"Hey, you! From the... yeah! You!" He\'s thrilled to have placed you and not embarrassed he needed a second.',
      "He shows you the same TikTok he showed you yesterday. You let him.",
      "He's ducking around a corner. \"Shit, it's Luca, he's off to train, I gotta... oh. Just you. Phew.\"",
      "You've been upgraded from stranger to person Kaito waves at across the whole courtyard.",
    ],
    warm: [
      "He's saved you a seat at the diner and is very obviously proud of himself for thinking of it.",
      '"There you are!". Like you\'d been the missing piece of his afternoon.',
      "He talks faster when you turn up. Everyone in the room has noticed. He hasn't.",
      '"It\'s on me today," he says, patting a pocket that did well at something he won\'t name. "Get whatever you want."',
      "He's practicing a greeting under his breath when you catch him at it. \"Ack! How long've you been there?!\"",
    ],
    spark: [
      "He goes red mid-sentence and completely loses the sentence.",
      '"Do you... okay, this\'ll sound weird... do you actually pay attention to me? Because it kind of seems like you do."',
      "He's turning the pendant over between two fingers without noticing he's doing it. \"My gran gave me this. It's... yeah. I don't usually let people ask about it, so don't get used to it.\"",
      "He starts to ask you something, bails, starts again, bails again.",
      '"There\'s this spot where you can see the stars really well," he tells his shoes. "I just... thought maybe. Sometime."',
      "He catches your sleeve when you go to leave and has no plan for after that.",
    ],
    close: [
      '"You came," he says, like he\'d half-braced for you not to.',
      "The grin drops for a second, pure relief, before it comes roaring back.",
      '"Don\'t laugh," he says, already braced for it, "but I bake when I can\'t sleep, and there\'s a lot of cookies right now."',
      "He picks the conversation up mid-sentence, like it never actually stopped.",
      "He'd been watching the door. He'll deny it. He was.",
    ],
    bound: [
      "He kisses you and forgets whatever he was in the middle of saying.",
      "\"I still can't believe it's you,\" he says, tucked against your shoulder.",
      "\"I know I'm not... y'know. Brave. But I'm working on it. For you I'm working on it.\"",
      "He wakes you by being unable to stop looking at you, somehow loudly.",
      "He's still a little embarrassed by how much he means it. He's never once wanted it to stop.",
    ],
  },
  dialogueWhen: [
    {
      when: { time: "evening" },
      dialogue: {
        new: [
          "The Frostheim kitchen light is on well after hours. It's him, flour to the elbow, and he jumps when the door goes.",
          '"Couldn\'t sleep," he says, not looking up from the bowl. "I bake when I can\'t. Don\'t tell Tohma whose sugar this is."',
          '"You\'re up late too, huh?" He slides a plate of something warm across the counter without being asked.',
          "\"Careful, the tray's hot... agh, see, told you. Sorry. Here, this one's cooled.\"",
        ],
        known: [
          '"I always end up in here after curfew. It\'s quiet. Nobody asks me anything."',
          '"Taste this? Be honest. ...Not that honest."',
          '"You should be in bed," he says, nudging a stool out for you. "...So should I. One more batch."',
        ],
        warm: [
          "\"Stay while these bake? It's twelve minutes. I'll put the kettle on.\"",
          '"I kept hoping you\'d wander in tonight," he admits, scraping the bowl. "Glad I made extra."',
        ],
        spark: [
          "He hands you the spoon to lick without thinking about it, then goes pink when he realizes he did.",
        ],
        close: [
          '"This is the only place I\'m not bracing for something," he says quietly. "Well, here, and wherever you are."',
        ],
      },
    },
  ],
  approachWhen: [
    {
      when: { time: "evening" },
      approach: {
        new: ["Come in out of the hall", "Take the cooled one"],
        known: ["Stay past curfew with him"],
        warm: ["Wait out the twelve minutes"],
      },
    },
  ],
  temperamentDialogue: {
    new: [
      '"YO... sorry. Hi. You came round the corner really fast."',
      '"Whoa, hi! Careful, that step\'s... ah. Yeah. Everyone does that one."',
      "\"You're new, right? I'm Kaito. That's... that's the whole intro, sorry.\"",
      '"Ask me anything you want to know! I\'m pretty savvy when it comes to Darkwick."',
      '"Don\'t let the whole Frostheim thing scare you off. Half of us are fine."',
    ],
    known: [
      '"Hey, I know you! You\'re the one who... okay, I lost it. But I know you!"',
      '"You keep showing up. I... that\'s nice. I like that."',
      "\"Have you been on WickHive? Someone leaked next month's cafeteria menu. ...Oh. I already told you that, didn't I.\"",
      '"Noooo, Tohma wants to see me. That\'s never good. Come with me? Please?"',
      '"I fell asleep in class so I\'ve got no clue what the homework is. Help me out here."',
    ],
    warm: [
      '"There you are! I was just... okay, this\'ll sound weird... I was just thinking about you."',
      "\"They want me on another mission. It's not like me being there helps anyone. ...You showing up, though. That part's good.\"",
      '"Got a bit of spare cash this month, don\'t ask, so lunch is on me. Get whatever."',
      "\"You free? Say you're free. Please say you're free.\"",
      "\"Am I being annoying? Tell me if I'm being annoying. You're probably busy.\"",
    ],
    spark: [
      "\"Okay so, don't laugh, I think about you kind of a lot. That's the thing. That's all of it.\"",
      "\"I'm not blushing, it's warm in here. It's Frostheim, I KNOW how that sounds, don't.\"",
      '"Can I... is it okay if I hold your hand? Cool. Cool cool cool."',
      '"You actually notice stuff about me. Do you know how weird that is? Good weird. Really good weird."',
      "\"There's a place you can see the stars from. I just thought... maybe you'd wanna. Sometime.\"",
    ],
    close: [
      '"You made it! I was kind of scared you wouldn\'t, honestly."',
      '"I saved you the good chair. Don\'t make it a thing, just sit."',
      '"Whatever you were doing can wait, right? You\'re here now."',
      "\"I don't say this a lot, but... yeah. Really glad it's you.\"",
      '"I baked way too much again. That\'s a you-problem now. Sit down."',
    ],
    bound: [
      '"C\'mere. No reason. Okay, one reason. Come HERE."',
      "\"I got you something. It's dumb. You're getting it anyway.\"",
      '"Five more minutes. Then five more. Don\'t argue."',
      "\"I know I'm weak, and a coward. I still want to be the guy who shows up for you. I'm trying.\"",
      '"You\'re stuck with me. You know that, right? Like... permanently."',
    ],
  },
  approach: {
    new: [
      "Wave back",
      "Follow the noise",
      "Take the offered half",
      "Say hi before he bolts",
    ],
    known: [
      "Let him place you",
      "Watch the video again",
      "Wave across the courtyard",
      "Go with him to Tohma",
    ],
    warm: [
      "Take the saved seat",
      "Let him treat you",
      "Catch him practicing",
      "Match his grin",
    ],
    spark: [
      "Take his hand",
      "Let him stumble through it",
      "Say you noticed too",
      "Hear him out",
    ],
    close: [
      "Take the good chair",
      "Answer him mid-sentence",
      "Eat the extra cookies",
      "Tell him you're glad too",
    ],
    bound: [
      "Go to him",
      "Five more minutes",
      "Say it back",
      "Take the dumb gift",
    ],
  },
  responses: {
    kind: {
      new: [
        "Tell him he's doing fine",
        "Wave off the burden question",
        "Let him show off for once",
      ],
      spark: [
        "Tell him he did fine",
        "Say you noticed on purpose",
        "Let him say it badly",
      ],
      close: [
        "See past the grin",
        "Tell him he's enough as he is",
        "Notice the part he plays off",
      ],
      bound: [
        "Say it back",
        "Stay the five minutes",
        "Tell him he already shows up",
      ],
    },
    playful: {
      new: ["Get swept up in his energy", "Out-shout him", "Bet him he won't"],
      spark: [
        "Make him blush harder",
        "Repeat it back to him",
        "Refuse to let go of his hand",
      ],
      close: [
        "Laugh along with him",
        "Start the trouble yourself",
        "Raid the cookie stash",
      ],
      bound: [
        "Make him say it louder",
        "Refuse to get up",
        "Re-gift the dumb gift",
      ],
    },
    bold: {
      new: ["Cut straight to it", "Call his bluff", "Push him to commit"],
      spark: [
        "Say it for him",
        "Pull him in by the collar",
        "Put him on the spot",
      ],
      close: [
        "Demand the honest version",
        "Push past the grin",
        "Tell him to keep up",
      ],
      bound: [
        "Kiss him first",
        "Say it before he can",
        "Tell him he's got no choice",
      ],
    },
    neutral: {
      new: ["Just listen", "Let him run out of steam", "Nod along"],
      spark: ["Let him flail", "Let go first", "Pretend you didn't catch it"],
      close: [
        "Be his calm",
        "Sit through the quiet part",
        "Let him catch his breath",
      ],
      bound: [
        "Let him ramble",
        "Stay quiet and close",
        "Let the morning be slow",
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
      '**{name}** jumps a foot. "AH... oh. Oh, it\'s just you." {user} had only said his name.',
      '"Wait, you know my name? Mine?" **{name}** looks at {user} like it\'s a prize.',
      "{user} calls out, and **{name}** startles, recovers, and pretends he didn't.",
    ],
    warm: [
      '"There you are!" **{name}** is talking to {user} at twice his usual speed already.',
      "{user} says his name, and **{name}** lights up like it's going in his story later.",
      "**{name}** was halfway into a WickHive rant. {user} turning up improved it enormously.",
    ],
    spark: [
      "**{name}** goes red before he's finished turning around. {user} does that to him now.",
      '"You... you called ME." **{name}** will be replaying this at {user} for a week.',
      "{user} got there first, and **{name}** forgot every word of what he was saying.",
    ],
    close: [
      "**{name}** is through the crowd before {user} finishes the second syllable.",
      "\"Please don't leave again,\" **{name}** says into {user}'s shoulder. Half joking.",
      "{user} calls, and **{name}** doesn't check who's watching. That's new for him.",
    ],
    bound: [
      "\"I still can't believe it's you,\" **{name}** says, arriving at {user} at a run.",
      "**{name}** had been working up the nerve for something. {user} calling out did the work for him.",
      "{user} says the name, and **{name}** decides he can be brave today after all.",
    ],
  },
};
