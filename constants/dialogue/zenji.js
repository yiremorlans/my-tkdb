export default {
  // The level-up DMs (docs/bond-scene-dms.md). Zenji is dead and can't so much
  // as hold a phone, so every one of these is dictated to Haku, who types it
  // out for him — established once (acquaintance), then referenced lightly.
  // Haku isn't a random errand boy for this: per reference.md he's already
  // Zenji's video-work manager, and his family's medium blood means he's one
  // of the vanishingly few people who can see and hear Zenji clearly at all,
  // which makes him the only real candidate. Once that's on the record, the
  // words on screen are taken as Zenji's own: a message thread is still the
  // one place he arrives at full strength, and he is delighted by that, and
  // says so. The intimacy is the reverse of everyone else's: he is trying to
  // be *perceived*, and each level is you seeing more of him than the last,
  // until the last one, where he stops performing entirely.
  bondScenes: {
    acquaintance: {
      beats: [
        '*Haku is holding the phone at arm\'s length, typing with the patience of someone who has done this more times than he\'ll admit. Zenji is dictating from somewhere just out of frame, delighted with himself, as always.*\n\n**{firstName}**: "My dear! Forgive the intrusion, and forgive Haku, who has been talked into rather a lot since he agreed to manage my little video empire, and finds himself apparently my secretary too."\n\n"He\'s one of vanishingly few people who can see me properly at all, bless the Kusanagi blood for it, which rather makes him my only candidate for this particular favor."\n\n"But between the two of us, I have discovered something rather wonderful: a message, once it has passed through a capable pair of hands, delivers my words at full volume regardless of how thin the speaker."\n\n"Do you know what that means? It means that here, of all places, I am not a rumor. I am a correspondent!"',
        "\"Zenji Kotodama, inspired man of the quill, at your service and in your pocket. What a century.\"\n\n\"I have watched you cross the Hotarubi courtyard {timesMet} times and each time you have looked toward the music room. Not through it, mind. *Toward* it. There is a world of difference and I have had a year to learn it.\"\n\n\"So I thought: there is a person who might not mind hearing from a draft.\"",
      ],
      choice: {
        prompt: "\"Well? Speak, and be as unkind as you like; I am immune to most things, being already dead.\"",
        options: [
          {
            key: "kind",
            label: "Say you were looking for him",
            style: 3,
            close: "\"...Ah.\"\n\n*Just that, from a man who has never once been at a loss for a flourish.*\n\n\"Forgive me, my dear. I find I need a moment. That is the first time in a year anyone has been *looking*.\"",
          },
          {
            key: "playful",
            label: "Say the ghost rumors are true",
            style: 1,
            close: "\"There ARE ghost rumors? In Hotarubi?\"\n\n\"How thrilling! I must investigate at once. I shall write it up. A haunted music room! What material!\"\n\n*He has, so far, entirely failed to work out who the ghost is.*",
          },
          {
            key: "bold",
            label: "Ask him to say more",
            style: 4,
            close: "\"More? My dear, you have made a grave error: I have four hundred pages of more.\"\n\n*A pause.*\n\n\"...Nobody has asked me for more since I died. Do you know, that is a sentence I did not expect to type this evening.\"",
          },
        ],
      },
      keepsake: {
        emoji: "🪶",
        line: "The night a draft found out it could be a correspondent.",
      },
    },

    friend: {
      beats: [
        '*Haku, mid-type, mutters that this is the least dignified thing he\'s ever transcribed, and keeps transcribing anyway.*\n\n**{firstName}**: "A confession, my dear, and it does me no credit whatsoever."',
        "\"I compliment everyone. It is quite genuine: this academy is stuffed to the rafters with talent and somebody ought to say so, but it is also a splendid way of never being asked a question back.\"\n\n\"You have never let it work. Every time I have handed you a flourish you have come back with {favResponse}, quite unimpressed, as though I were a person rather than a performance.\"\n\n\"It is *appalling*. It is the best thing that has happened to me in eighteen months.\"",
      ],
      choice: {
        prompt: "\"So: what shall we do about it? I am open to terms.\"",
        options: [
          {
            key: "kind",
            label: "Say you'd rather have him",
            style: 3,
            close: "\"You would rather have...\"\n\n*The message stops there for some time.*\n\n\"My dear, I have been a great many people's favorite anecdote and nobody's preference. You will have to give me a moment to learn the difference.\"",
          },
          {
            key: "playful",
            label: "Demand a bad compliment",
            style: 1,
            close: "\"A BAD one? Madam. Sir. Whichever you please. You wound me.\"\n\n\"Very well: your posture is adequate and your handwriting is a crime against the alphabet. There. I feel unclean and strangely alive.\"",
          },
          {
            key: "bold",
            label: "Ask him a question back",
            style: 4,
            close: "*There is a very long pause for a man who types as fast as he does.*\n\n\"Nobody has done that,\" *he says.* \"In a year and a half, not one person has turned it round.\"\n\n\"Ask me again tomorrow. I should like to have a proper answer ready, and I should like very much to have been asked twice.\"",
          },
        ],
      },
      keepsake: {
        emoji: "✉️",
        line: "The first question anyone had asked him back in eighteen months.",
      },
    },

    closeFriend: {
      beats: [
        '**{firstName}**: "Come to the music room after dark, my dear. Bring nothing. I have something that requires an audience of precisely one."',
        "*The biwa is on its stand and there is nobody visible in the room at all. Then the instrument shifts (a fraction, then properly) and begins to play.*\n\n\"Do you see? Not the sound. *Me.* When I play I am solid enough for the strings, and when I am solid enough for the strings I am usually solid enough to be seen.\"",
        "\"It costs a great deal and it does not last, so I ration it viciously. Twice a year, perhaps. Never with company. The whole point of the ration is that nobody is left disappointed when it runs out.\"\n\n*He is there, then, for a few seconds: side ponytail, round glasses, an expression of tremendous and unbearable hope.*\n\n\"I have spent it on you. All of this year's, at once, so that you would have seen my face at least the one time.\"",
      ],
      choice: {
        prompt: "\"Well? Say it quickly, my dear. I am going thin at the edges already.\"",
        options: [
          {
            key: "kind",
            label: "Tell him what he looks like",
            style: 3,
            close: "*You describe him back to him (the ponytail, the glasses, the ink on his fingers), and the playing falters badly in the middle of a phrase.*\n\n\"...Thank you,\" *he says, from nowhere in particular, the room empty again.* \"I had begun to forget. One does, you know. One forgets one's own face first.\"",
          },
          {
            key: "playful",
            label: "Say his glasses are crooked",
            style: 1,
            close: "\"They are NOT...\"\n\n*A pause, and then a sound very much like laughing.*\n\n\"They are, aren't they. They have been crooked for a year and nobody could tell me. My dear, that is the finest gift I have received since my funeral.\"",
          },
          {
            key: "bold",
            label: "Reach out and touch him",
            style: 4,
            close: "*Your hand goes through the first time. The second time, while the strings are still sounding, it doesn't.*\n\n*It is cold and it is barely there and it is unmistakably a hand, and it closes round yours with a desperation that has nothing theatrical in it at all.*\n\n*The music stops. So does he. But he holds on for the whole three seconds he has left, and neither of you says a word.*",
          },
        ],
      },
      keepsake: {
        emoji: "🎼",
        line: "A whole year's worth of being visible, spent on one evening.",
      },
    },

    confidant: {
      beats: [
        '**{firstName}**: "I am going to be plain, which you will find alarming, as I am never plain about anything."',
        "\"I have a brother. He is in Mortkranken with a scalpel in his hand and a face like a closed door, and he was eleven the last time he saw me alive.\"\n\n\"Jiro Kirisaki. Yes. That one. I was Taro then. I have not corrected him, because he has built something out of being the one who was left and I have not the faintest idea how to take that from him gently.\"\n\n\"There is an old story about a fisherman with my name who wandered off somewhere he oughtn't and came home to find the years had gone on without him. I used to read it to Jiro at bedtime. I never once thought I would end up living inside it.\"",
        "\"Everyone believes I bear this place no grudge. That is quite true and quite complete. I do not.\"\n\n\"But my dear, I have never once said out loud that I mind. Not being dead. Being *unfinished*. Four hundred pages and no ending, and a boy downstairs who thinks I stopped loving him because I stopped arriving.\"\n\n\"There. That is the whole of it. I have never written it down, and I write everything down.\"",
      ],
      choice: {
        prompt: "\"Do not comfort me, my dear. Anything but that. Comfort would finish me off a second time.\"",
        options: [
          {
            key: "kind",
            label: "Say you'll listen instead",
            style: 3,
            close: "\"...Listen.\"\n\n*A long pause.*\n\n\"Yes. Yes, all right. That I can bear.\"\n\n*He talks until four in the morning about a boy who used to follow him round a garden, and not once does he make a metaphor out of any of it, which from Zenji Kotodama is the most naked thing there is.*",
          },
          {
            key: "playful",
            label: "Ask for the four hundred pages",
            style: 1,
            close: "\"They are dreadful.\"\n\n\"They are *magnificent* and they are dreadful, both at once, which is the natural condition of all great work.\"\n\n\"...You may read them. Nobody has read them. Do not tell me which parts you laughed at.\"",
          },
          {
            key: "bold",
            label: "Tell him to tell Jiro",
            style: 4,
            close: "\"I cannot.\"\n\n*Then, after a very long silence:* \"I have not said 'I cannot' about anything since I died. I have made rather a point of it.\"\n\n\"Ask me again when I am braver. And my dear, do keep asking. I shall need to be asked a great many times.\"",
          },
        ],
      },
      keepsake: {
        emoji: "📜",
        line: "Four hundred pages with no ending, and the name he used to have.",
      },
    },

    devoted: {
      beats: [
        '**{firstName}**: "Do not go to the east wing tonight. I have never given you an instruction before and I am giving you one now."',
        "\"There is something in that corridor which is not a rumor and not a draft, and I have spent the evening standing in front of it being enormously ineffective.\"\n\n\"I cannot lift a door. I cannot raise an alarm. I could not carry you three feet if the building were coming down. This is the arithmetic of what I am and I have made my peace with all of it, every day, for a year.\"",
        "\"And then it turned toward the stairs you use, my dear, and I discovered I have made peace with nothing whatsoever.\"\n\n\"I stood in a doorway I cannot close, in front of a thing that cannot see me, all night, because it was the only thing I had. Do you understand? It was the only thing I had and I gave all of it.\"",
      ],
      choice: {
        prompt: "\"Now scold me. I should very much like to be scolded by someone who noticed.\"",
        options: [
          {
            key: "kind",
            label: "Tell him it was enough",
            style: 3,
            close: "\"It was not enough. It was a poet standing in a doorway.\"\n\n*A pause.*\n\n\"But you said it was, and I find I am going to believe you rather than the arithmetic, which is the first unreasonable thing I have done since I died.\"",
          },
          {
            key: "playful",
            label: "Ask if he wrote it up",
            style: 1,
            close: "\"I did not.\"\n\n\"I did not write a word of it, my dear, and I write everything. I simply stood there. Make of that what you will. I have been making rather a lot of it myself.\"",
          },
          {
            key: "bold",
            label: "Go to the music room instead",
            style: 4,
            close: "*You go. He is already playing when you arrive, which he cannot afford and does anyway, and he is visible and going thinner by the second.*\n\n*He holds out one cold, barely-there hand.*\n\n\"I know,\" *he says, before you can object.* \"I know precisely what it costs. Let me have three seconds of standing where you can see me, and then scold me for the whole of tomorrow.\"",
          },
        ],
      },
      keepsake: {
        emoji: "🚪",
        line: "A doorway held all night by someone who couldn't close it.",
      },
    },

    soulbound: {
      beats: [
        '*Haku doesn\'t interrupt this one. He reads it through once before he sends it, mutters something that might be* "about time," *and doesn\'t touch the phone again until he\'s told to.*\n\n**{firstName}**: "My dear. I am going to write this without a single flourish, which for me is rather like writing it without a hand."',
        "\"{timesMet} times you have come to a room that most people walk past. You have never once asked what I was, or how I died, or whether it hurt. You simply arrived and talked to me as though I were still a going concern.\"",
        "\"I have thought a great deal about what I am permitted to want. A dead man ought to want very little. It is only decent: one is a draft, one does not make demands of the living.\"\n\n\"I have kept to that. I have complimented everybody and wanted nothing and been very charming about it, and it has been the loneliest year of a life that already ended.\"",
        "\"So here is the indecent thing, and then I shall not say it again unless you ask me to.\"\n\n\"I love you. Not fondly. Not poetically. I love you in the ordinary, greedy, entirely alive way that I have no business loving anyone in, and I have been dressing it up as verse for months because verse is permitted and this is not.\"\n\n\"There. No flourish. It is the plainest sentence I have ever written and I have never been so frightened of a full stop.\"",
      ],
      choice: {
        prompt: "\"Answer as you like, my dear. I have already had the impossible part: being asked a question back.\"",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close: "*The biwa starts before you have finished, he is spending it, all of it, everything he had put by.*\n\n*He is there in the doorway of the music room, whole and solid and crying without the least dignity about it, and he takes your face in both cold hands.*\n\n\"I had an ending after all,\" *he says.* \"Four hundred pages and it was never going to be on any of them.\"",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close: "\"But of course. My dear, I have all of it: it is the one thing my condition has made me rich in.\"\n\n\"And I want you to hear this properly, because I shall not repeat it: nothing is conditional. Not the music room, not the tea I cannot drink, not the four hundred pages. I was your friend before I was anything else and I intend to go on being it whatever you decide.\"\n\n\"Take a year. Take ten. I shall be exactly here, being a draft, and delighted to see you.\"\n\n\"And if the answer is never, then I shall simply wait for a kinder arrangement. I hear the next life is supposed to go easier on men named Taro. I intend to find out. I intend to find you.\"",
          },
        ],
      },
      keepsake: {
        emoji: "🖊️",
        line: "The plainest sentence a poet ever wrote.",
      },
    },
  },
  dialogue: {
    new: [
      'He greets you with a flourish, "Why, hello there, my dear. Suppose we kick off another swanky day here?"',
      "He's mid-sentence when you arrive: a story, out loud, to no one. He finishes the line before he finishes turning around.",
      '"Seventeen syllables," he murmurs, "and you\'ve just handed me the last five, my dear."',
      '"Well, if it isn\'t a new face. Has this inspired man of the quill left you speechless? ...No? A pity. It happens to some."',
      '"Oh, have you come to see me? This is troubling." He smiles. "I\'m afraid I\'m out of autographs."',
    ],
    known: [
      '"The wanderer returns." He looks delighted. "My dear, you\'re becoming a regular fixture."',
      "He lifts the instrument across his knee. \"What's this? Well, it's a biwa, of course. It's a biwa just as you are yourself.\"",
      "He offers your name back to you like a good line he's been holding.",
      "\"Heh. There's no doubt about it. Zenji Kotodama is once again the most styling man on campus. These glad rags are the cat's pajamas.\"",
      "He asks nothing at all. He simply makes room on the step beside him.",
    ],
    warm: [
      "His expression brightens with genuine pleasure, all formal distance melting away. \"My dear. I'm glad you're here.\"",
      "He's saved the last of the tea. He'd been saving it for a while.",
      '"You arrive like a season, my dear," he says, delighted. "Expected, and still a gift."',
      "He shows you the pages he's been working on. He shows almost no one.",
      "The brush pauses. He'd rather talk to you than finish the line.",
    ],
    spark: [
      "The story he's writing has quietly stopped being about anyone but you.",
      "He tucks a flower behind your ear and lets his fingers stay in your hair.",
      '"I\'ve written this one badly on purpose," he admits. "I wanted an excuse to read it to you."',
      "He sits closer than the step requires, and doesn't pretend otherwise.",
      '"Some things," he says softly, "are better in seventeen syllables. Others aren\'t."',
    ],
    close: [
      '"With you," he says, "the world behaves as though a story were being told well. I hadn\'t expected to feel that again."',
      "He doesn't reach for a metaphor this time. He just says he's happy.",
      '"I\'ve written you badly a hundred times," he laughs. "You deserve better than my words."',
      "He says your name the way he'd read the last line of something he didn't want to end.",
      "The world quiets around him when you're near. He's noticed. He's grateful.",
    ],
    bound: [
      "He's stopped writing about longing. The new poems are far less publishable.",
      "He reads you the old folktale badly, on purpose, so it takes all night.",
      '"Seventeen syllables can\'t hold this," he murmurs. "I\'ve stopped trying."',
      "He traces something on your back with one finger. It's a poem. You'll never read it.",
      "The lanterns burn down and neither of you notices for a very long time.",
    ],
  },
  dialogueWhen: [
    {
      when: { time: "evening" },
      dialogue: {
        new: [
          "He's watching the last light go out of the sky and doesn't seem to mind that it's leaving.",
          "\"Dusk becomes a genius of the pen, don't you think? Sit, the light's nearly gone, and it's worth watching it go.\"",
          "The lanterns have come on around the step. He tips his hat and makes room on the lit side.",
          '"A stranger at dusk, how fortunate," he says. "Sit, and let the evening happen to us."',
        ],
        known: [
          '"The wanderer, and at the good hour too. The evening was getting lonely."',
          "He's saved you the warm end of the step, where the lantern reaches.",
          '"Sit, the step is warm," he says, "and the evening is doing something worth watching."',
        ],
        warm: [
          '"You arrive like the evening does: expected, and still a gift."',
        ],
      },
    },
  ],
  approachWhen: [
    {
      when: { time: "evening" },
      approach: {
        new: ["Sit under the lanterns", "Watch the last light with him"],
        known: ["Take the warm end of the step"],
        warm: ["Let the evening happen"],
      },
    },
  ],
  temperamentDialogue: {
    new: [
      'Summer heat shimmers off the stones. "Why, hello there, my dear."',
      "\"You walk quietly, my dear. That's rarer than you'd think.\"",
      "\"Names come later. First, tea. That's the proper order, and I'm a stickler for the proper order.\"",
      '"Something brought you here. Let\'s not rush to name what."',
    ],
    known: [
      '"Twice is coincidence. Three times is a season. Welcome back."',
      '"I\'ve saved a line for you. It wanted your opinion."',
      '"You listen well. That\'s not a small thing to notice about someone."',
      '"You want to know the meaning of my words? I see. I\'ll have to give you a lecture on romanticism."',
    ],
    warm: [
      '"You return like seasons turning. My heart is at ease."',
      '"I was writing about rain. You\'ve made it about something warmer."',
      '"My ideal summer vacation? To lay down my burdens in the springs of Yugawara and pursue my wordsmithery in peace, as so many greats have done before me."',
      '"Tell me one small thing about your day. Small things are the good ones."',
      '"The lanterns lean toward you. So, apparently, do I."',
    ],
    spark: [
      '"Shall I read it to you? Fair warning: it isn\'t about the moon."',
      '"Come closer. The poem requires it. That\'s a lie, but come closer."',
      '"You are the only subject I cannot get right. I keep trying."',
      '"Stay through the last lantern. I\'d like the night to be longer."',
      "\"There's a word for this in the old poems. I'd rather just show you.\"",
    ],
    close: [
      '"With you, the world feels right. Like poetry made real."',
      "\"I've stopped writing about longing. There's nothing left to long for.\"",
      '"Stay. The moon is doing something worth witnessing together."',
      '"Every verse I finish lately has your shape in it somewhere."',
      "\"You needn't say anything. I've grown fluent in your silences.\"",
    ],
    bound: [
      '"Stay until morning. The night has been generous; let\'s not insult it."',
      '"I love you. There. No metaphor. I\'ve been saving the plain version."',
      '"Stay till the last lantern\'s out. I never did get enough night, less of it now."',
      '"Come here. I want to memorize something and it isn\'t a poem."',
      "\"You've made a very poor poet of me. I've never been happier about anything.\"",
    ],
  },
  approach: {
    new: [
      "Return his bow",
      "Give him the last syllables",
      "Sit under the lanterns",
      "Listen with him",
    ],
    known: [
      "Take the warm step",
      "Give the line an opinion",
      "Accept the tea",
      "Listen a while",
    ],
    warm: [
      "Accept the tea",
      "Ask about the verse",
      "Sit beside him",
      "Tell him a small thing",
    ],
    spark: [
      "Hear the poem",
      "Come closer",
      "Stay past the last lantern",
      "Let him show you",
    ],
    close: [
      "Go to him",
      "Finish the poem together",
      "Watch the moon with him",
      "Say nothing, and stay",
    ],
    bound: [
      "Stay until morning",
      "Stay till the last lantern",
      "Come here",
      "Hear the plain version",
    ],
  },
  responses: {
    kind: {
      new: [
        "Honor his gentle spirit",
        "Thank him for the welcome",
        "Praise the verse honestly",
      ],
      spark: [
        "Ask him to read it",
        "Let his hand stay",
        "Tell him the verse landed",
      ],
      close: [
        "Accept all of what he is",
        "Tell him his words reached you",
        "Say he needn't write you well",
      ],
      bound: [
        "Say the plain version back",
        "Let the night run long",
        "Stay until morning",
      ],
    },
    playful: {
      new: [
        "Appreciate his warmth",
        "Attempt a terrible haiku",
        "Rhyme back at him",
      ],
      spark: [
        "Steal his brush",
        "Write him a terrible one back",
        "Ask what rhymes with you",
      ],
      close: [
        "Bring him gentle joy",
        "Steal the last line",
        "Make him laugh mid-verse",
      ],
      bound: [
        "Ask what he wrote on your back",
        "Rhyme something filthy",
        "Blow out the lantern",
      ],
    },
    bold: {
      new: [
        "Be sincere and true",
        "Say the unpoetic truth",
        "Ask what he's not writing",
      ],
      spark: [
        "Tell him to skip the poem",
        "Close the space on the step",
        "Ask him to show you",
      ],
      close: [
        "Bold as poetry",
        "Tell him plainly you love this",
        "Give him the ending yourself",
      ],
      bound: [
        "Tell him to stop writing",
        "Kiss him mid-sentence",
        "Say it without metaphor",
      ],
    },
    neutral: {
      new: [
        "Respect his mystery",
        "Listen to the wind with him",
        "Let the verse finish",
      ],
      spark: ["Let the verse stand", "Watch the lanterns", "Leave it in haiku"],
      close: [
        "Accept his silence",
        "Share the quiet syllables",
        "Watch the lanterns together",
      ],
      bound: [
        "Let the poem finish",
        "Watch the lanterns burn down",
        "Stay quiet with him",
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
      '"Why, hello there, my dear." **{name}** smiles at {user} as though they were expected.',
      '{user} names him, and **{name}** beams. "Seventeen syllables, and you\'ve handed me the last five."',
      "**{name}** finishes his sentence to no one at all, then turns to {user} with a flourish.",
    ],
    warm: [
      '"You arrive like a season, my dear." **{name}** is delighted with {user}.',
      "{user} calls out, and **{name}** abandons a perfectly good line mid-composition.",
      "**{name}** had been saving the last of the tea. He tells {user} so, at length.",
    ],
    spark: [
      '"Horsefeathers." **{name}** had absolutely been watching for {user}.',
      "{user} says the name, and **{name}**, a man of many words, is briefly short of them.",
      "**{name}** offers {user} his arm with rather more ceremony than the hour requires.",
    ],
    close: [
      '"The moon is beautiful tonight," **{name}** tells {user}, who knows exactly what he means by it.',
      "**{name}** has stopped writing about longing. {user} is standing right there.",
      "{user} calls, and **{name}** puts the notebook away, which he never does.",
    ],
    bound: [
      '"Seventeen syllables can\'t hold this, my dear." **{name}** stops trying and crosses to {user} instead.',
      "**{name}** hasn't much time, and spends all of it getting to {user}.",
      "{user} says the name, and **{name}** gives up the metaphor entirely.",
    ],
  },
};
