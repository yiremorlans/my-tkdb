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
        "**{firstName}**: My dear! Forgive the intrusion, and forgive Haku, who agreed to manage my little video empire and finds himself my secretary too.\n\nHe is one of vanishingly few who can see me at all, bless the Kusanagi blood for it. But we have discovered something swanky between us: a message passed through a capable pair of hands carries my words at full volume, however thin the speaker.\n\nDo you know what that makes me, here of all places? Not a rumor. A correspondent!",
        "Zenji Kotodama, inspired man of the quill, at your service and in your pocket\n\n{timesMet} times I have watched you cross the Hotarubi courtyard, and each time you looked toward the music room. Not through it. *Toward* it. I have had a year to learn the difference.\n\nSo I thought: here is a person who might not mind hearing from a draft.",
      ],
      choice: {
        prompt:
          "Speak, and be as unkind as you like; I am immune to most things, being already dead.",
        options: [
          {
            key: "kind",
            label: "Say you were looking for him",
            style: 3,
            close:
              "...Ah.\n\nForgive me, my dear. I find I need a moment. That is the first time in a year anyone has been *looking*.",
          },
          {
            key: "playful",
            label: "Say the ghost rumors are true",
            style: 1,
            close:
              "There ARE ghost rumors? In Hotarubi?\n\n...Ha ha. Let's not, my dear. I would really rather not think about that sort of thing right before bed.\n\nCan we speak of something else? Anything else. I insist.",
          },
          {
            key: "bold",
            label: "Ask him to say more",
            style: 4,
            close:
              "More? My dear, you have made a grave error: I have four hundred pages of more.\n\n...Say the word and I shall dictate every page of it. Haku's already backing toward the door. The poor man knows exactly what an all-nighter with me sounds like.",
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
        "*Haku, mid-type, mutters that this is the least dignified thing he's ever transcribed, and keeps transcribing anyway.*\n\n**{firstName}**: A confession, my dear, and it does me no credit whatsoever.",
        "I compliment everyone. It is genuine (this academy is stuffed with talent, somebody ought to say so) but it is also a splendid way of never being asked a question back.\n\nYou have never let it work. Every flourish I hand you, back it comes with {favResponse}, unimpressed, as though I were a person and not a performance.\n\nIt is *appalling*. It is the best thing to happen to me in a year.",
      ],
      choice: {
        prompt: "So: what shall we do about it? I am open to terms.",
        options: [
          {
            key: "kind",
            label: "Say you'd rather have him",
            style: 3,
            close:
              "You would rather have...\n\n*The message stops there for some time.*\n\nMy dear, I have been a great many people's favorite anecdote and nobody's preference. You will have to give me a moment to learn the difference.",
          },
          {
            key: "playful",
            label: "Demand a bad compliment",
            style: 1,
            close:
              "A BAD one? Madam. Sir. Whichever you please. You wound me.\n\nVery well: your posture is adequate and your handwriting is a crime against the alphabet. There. I feel unclean and strangely alive.",
          },
          {
            key: "bold",
            label: "Ask him a question back",
            style: 4,
            close:
              "*There is a very long pause for a man who types as fast as he does.*\n\nNobody has done that, *he says.* In a year, not one person has turned it round.\n\nAsk me again tomorrow. I should like to have a proper answer ready, and I should like very much to have been asked twice.",
          },
        ],
      },
      keepsake: {
        emoji: "✉️",
        line: "The first question anyone had asked him back in a year.",
      },
    },

    closeFriend: {
      beats: [
        "**{firstName}**: Come to the music room after dark, my dear. Bring nothing. I have something that requires an audience of precisely one.",
        "*The biwa lifts off its stand on its own, hangs a moment, and begins to play.*\n\n> You have heard the rumor, I expect. The haunted music room. The instrument that plays itself. That is this. That is the loudest I get to be.",
        "> Holding it takes a great deal out of me and I cannot keep it up for long, so I ration it. Twice a year, perhaps. Never with anyone in the room, so that nobody has to watch it give out.\n\n*The playing is unsteady, and somewhere under it is the sense of a voice.*\n\n> I have spent all of this year's on you. So that once, somebody was the audience for the whole of it, and knew who was playing.",
      ],
      choice: {
        prompt:
          "Well? Say it quickly, my dear. The strings are already tiring.",
        options: [
          {
            key: "kind",
            label: "Tell him what you picture",
            style: 3,
            close:
              "*You tell him what you have built of him from fragments: the side ponytail, the round glasses, ink worked into his fingers. The playing falters in the middle of a phrase.*\n\n> ...Almost exactly. Thank you. I had begun to lose the shape of my own face. One forgets that first, you know.\n\n*The music stops. The room goes still.*",
          },
          {
            key: "playful",
            label: "Say he dropped a note",
            style: 1,
            close:
              "> I did NOT...\n\n*A pause, and then a sound very much like laughing.*\n\n> I did, didn't I. Three of them. Nobody has been near enough to catch me at that since I died. My dear, that is the finest gift I have received since my funeral.",
          },
          {
            key: "bold",
            label: "Reach toward the sound",
            style: 4,
            close:
              "*Your hand finds nothing the first time. The second time, with the strings still sounding, there is something: cold, faint, the barest suggestion of a hand, and it closes round yours for as long as the note holds.*\n\n*Then the string stills, and so does he, and neither of you says a word.*",
          },
        ],
      },
      keepsake: {
        emoji: "🎼",
        line: "A song nobody else was ever meant to be the audience for.",
      },
    },

    confidant: {
      beats: [
        "**{firstName}**: I am going to be plain, which you will find alarming, as I am never plain about anything.",
        "I have a brother. He is in Mortkranken with a scalpel in his hand and a face like a closed door, and he was younger, and not yet so closed-off, the last time he saw me alive.\n\nJiro Kirisaki. Yes. That one. I was Taro then. I have not corrected him. He has built something out of being the one who was left, and I do not know how to take that from him gently.\n\nThere is an old story about a fisherman with my name who wandered somewhere he oughtn't and came home to find the years gone on without him. I read it to Jiro at bedtime. I never thought I would end up living inside it.",
        "Everyone believes I bear this place no grudge. That is true and complete. I do not.\n\nBut I have never once said out loud that I mind. Not being dead. Being *unfinished*. Four hundred pages and no ending, and a boy downstairs who thinks I stopped loving him because I stopped arriving.\n\nThere. I have never written that down, and I write everything down.",
      ],
      choice: {
        prompt:
          "Do not comfort me, my dear. Anything but that. Comfort would finish me off a second time.",
        options: [
          {
            key: "kind",
            label: "Say you'll listen instead",
            style: 3,
            close:
              "...Listen.\n\n*A long pause.*\n\nYes. All right. That I can bear.\n\n*He talks until four in the morning about a boy who used to follow him round a garden, and never once makes a metaphor of any of it. From Zenji Kotodama, that is the most naked thing there is.*",
          },
          {
            key: "playful",
            label: "Ask for the four hundred pages",
            style: 1,
            close:
              "They are dreadful.\n\nThey are *magnificent* and they are dreadful, both at once, which is the natural condition of all great work.\n\n...You may read them. Nobody has read them. Do not tell me which parts you laughed at.",
          },
          {
            key: "bold",
            label: "Tell him to tell Jiro",
            style: 4,
            close:
              "I cannot.\n\n*Then, after a very long silence:* I have not said 'I cannot' about anything since I died. I have made rather a point of it.\n\nAsk me again when I am braver. And my dear, do keep asking. I shall need to be asked a great many times.",
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
        "**{firstName}**: Do not go to the east wing tonight. I have never given you an instruction before and I am giving you one now.",
        "There is something in that corridor which is not a rumor and not a draft, and I have spent the evening standing in front of it being enormously ineffective.\n\nI cannot lift a door. I cannot raise an alarm. I could not carry you three feet if the building came down. That is the arithmetic of what I am, and I have made my peace with it every day for a year.",
        "And then it turned toward the stairs you use, and I discovered I have made peace with nothing whatsoever.\n\nI stood in a doorway I cannot close, in front of a thing that cannot see me, all night, because it was the only thing I had to give. So I gave all of it.",
      ],
      choice: {
        prompt:
          "Now scold me. I should very much like to be scolded by someone who noticed.",
        options: [
          {
            key: "kind",
            label: "Tell him it was enough",
            style: 3,
            close:
              "It was not enough. It was a poet standing in a doorway.\n\n*A pause.*\n\nBut you said it was, and I find I am going to believe you rather than the arithmetic, which is the first unreasonable thing I have done since I died.",
          },
          {
            key: "playful",
            label: "Ask if he wrote it up",
            style: 1,
            close:
              "I did not.\n\nI did not write a word of it, my dear, and I write everything. I simply stood there. Make of that what you will. I have been making rather a lot of it myself.",
          },
          {
            key: "bold",
            label: "Go to the music room instead",
            style: 4,
            close:
              "*You go. He is already playing when you arrive, which he cannot afford and does anyway, the sound of it thinning by the second.*\n\n*Cold brushes your hand, the barest suggestion of fingers.*\n\n> I know what it costs. Let me have three seconds of being almost real, and then scold me the whole of tomorrow.",
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
        "*Haku doesn't interrupt this one. He reads it through once before he sends it, mutters something that might be* \"about time,\" *and doesn't touch the phone again until he's told to.*\n\n**{firstName}**: My dear. I am going to write this without a single flourish, which for me is rather like writing it without a hand.",
        "{timesMet} times you have come to a room that most people walk past. You have never once asked what I was, or how I died, or whether it hurt. You simply arrived and talked to me as though I were still a going concern.",
        "I have thought a great deal about what I am permitted to want. A dead man ought to want very little; it is only decent. One is a draft. One does not make demands of the living.\n\nI have kept to that. Complimented everybody, wanted nothing, been very charming about it. It has been the loneliest year of a life that had already ended.",
        "So here is the indecent thing, and I shall not say it again unless you ask.\n\nI love you. Not fondly. Not poetically. I love you in the ordinary, greedy, entirely alive way I have no business loving anyone, and I have been dressing it as verse for months because verse is permitted and this is not.\n\nThere. No flourish. The plainest sentence I have ever written, and I have never been so frightened of a full stop.",
      ],
      choice: {
        prompt:
          "Answer as you like, my dear. I have already had the impossible part: being asked a question back.",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close:
              "*The biwa starts before you have finished. He is spending it, all of it, everything he had put by.*\n\n*In the doorway of the music room the air goes cold and close, and something that is almost hands cups your face, and he is crying without the least dignity.*\n\n> I had an ending after all. Four hundred pages, and it was never going to be on any of them.",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close:
              "But of course. I have all of it. Time is the one thing my condition has made me rich in.\n\nHear this properly, because I shall not repeat it: nothing is conditional. Not the music room, not the tea I cannot drink, not the four hundred pages. I was your friend before I was anything else, and I intend to go on being it whatever you decide.\n\nTake a year. Take ten. I shall be exactly here, being a draft, and delighted to see you.\n\nAnd if the answer is never, I shall wait for a kinder arrangement. The next life is meant to go easier on men named Taro. I intend to find out. I intend to find you.",
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
      {
        line: 'He greets you with a flourish, "Why, hello there, my dear. Suppose we kick off another swanky day here?"',
        approach: "Return his bow",
        greeting:
          '"Splendid manners. I do so enjoy a visitor who bows back, my dear."',
        responses: {
          kind: ["Thank him for the welcome", "Say it's lovely to meet him"],
          playful: ["Appreciate his warmth", "Bow even lower, grandly"],
          bold: ["Be sincere and true", "Ask what makes it swanky"],
          neutral: ["Bow back without a word", "Nod and smile"],
        },
      },
      {
        line: "He's mid-sentence when you arrive: a story, out loud, to no one. He finishes the line before he finishes turning around.",
        approach: "Listen with him",
        greeting:
          '"...And they lived happily ever after. Ah! An audience. Did you catch the ending, my dear?"',
        responses: {
          kind: ["Honor his gentle spirit", "Say you caught the ending"],
          playful: ["Ask who he was talking to", "Ask for the beginning too"],
          bold: ["Say the unpoetic truth", "Admit you only heard the end"],
          neutral: ["Let the verse finish", "Listen, say nothing"],
        },
      },
      {
        line: '"Seventeen syllables," he murmurs, "and you\'ve just handed me the last five, my dear."',
        approach: "Give him the last syllables",
        greeting:
          '"Why, that\'s the bee\'s knees! Half this verse is yours now, my dear. I\'ll have to give you credit."',
        responses: {
          kind: ["Praise the verse honestly", "Say the credit is all his"],
          playful: ["Rhyme back at him", "Demand top billing"],
          bold: ["Finish the verse yourself", "Ask to hear the whole thing"],
          neutral: ["Listen to the wind with him", "Let him keep the verse"],
        },
      },
      {
        line: '"Well, if it isn\'t a new face. Has this inspired man of the quill left you speechless? ...No? A pity. It happens to some."',
        approach: "Recover your words",
        greeting: '"Something brought you here. Let\'s not rush to name what."',
        responses: {
          kind: ["Reassure him gently", "Say it's nice to meet him"],
          playful: ["Refuse to explain why you came", "Pretend to be speechless"],
          bold: ["Ask what he's not writing", "Say you came on purpose"],
          neutral: ["Respect his mystery", "Let the question sit"],
        },
      },
      {
        line: '"Oh, have you come to see me? This is troubling." He smiles. "I\'m afraid I\'m out of autographs."',
        approach: "Ask for an autograph anyway",
        greeting:
          '"Well, since you asked so nicely... Zenji Kotodama, signed in the air, with a flourish. Treasure it, my dear."',
        responses: {
          kind: ["Say you came for him", "Thank him for the autograph"],
          playful: ["Attempt a terrible haiku", "Ask him to sign it twice"],
          bold: ["Demand a real one anyway", "Ask for a dedication too"],
          neutral: ["Watch the flourish quietly", "Accept it with a nod"],
        },
      },
    ],
    known: [
      {
        line: '"The wanderer returns." He looks delighted. "My dear, you\'re becoming a regular fixture."',
        approach: "Say you'll keep returning",
        greeting: [
          '"Ha! Splendid. The other spirits will be positively green about it, I\'d wager."',
          '"Ah, twice in one week. Fate does love a repeat verse."',
        ],
        responses: {
          kind: ["Say you're happy to return", "Thank him for the welcome"],
          playful: ["Ask if you're a regular now", "Tease him about 'fixture'"],
          bold: ["Say you'll keep coming back", "Claim the title outright"],
          neutral: ["Nod, keep walking", "Take the compliment quietly"],
        },
      },
      {
        line: "He lifts the instrument across his knee. \"What's this? Well, it's a biwa, of course. It's a biwa just as you are yourself.\"",
        approach: "Listen a while",
        greeting:
          '"Come, sit a spell. The biwa\'s been dreadfully lonely for an audience."',
        responses: {
          kind: ["Ask to hear it played", "Say the biwa suits him"],
          playful: ["Ask what instrument you'd be", "Tease the comparison"],
          bold: ["Ask him to play it now", "Ask him to explain it"],
          neutral: ["Sit and listen quietly", "Let the biwa rest"],
        },
      },
      {
        line: "He says your name like it's the best line he's been saving all week.",
        approach: "Take the compliment",
        greeting:
          '"Ah, there you are, my dear. I\'ve had your name on the tip of my tongue all week."',
        responses: {
          kind: [
            "Say his voice makes it special",
            "Thank him for saying it well",
          ],
          playful: ["Ask for an even better line", "Demand he say it again"],
          bold: ["Say you know it's a good line", "Ask him to top it"],
          neutral: ["Take it in stride", "Let the line pass"],
        },
      },
      {
        line: "\"Heh. There's no doubt about it. Zenji Kotodama is once again the most styling man on campus. These glad rags are the cat's pajamas.\"",
        approach: "Compliment his style",
        greeting:
          '"Aw, you\'re a real pal. You\'ve got a keen eye, my dear, and a kind one besides."',
        responses: {
          kind: ["Say the outfit works", "Compliment him sincerely"],
          playful: ["Ask where he shops", "Tease the cat's pajamas line"],
          bold: ["Say he's not wrong", "Challenge him to prove it"],
          neutral: ["Nod at the outfit", "Say nothing, let him preen"],
        },
      },
      {
        line: "He asks nothing at all. He's just been narrating the evening, step by step, and leaves the last line open for you to fill in.",
        approach: "Finish his sentence",
        greeting: '"I\'ve saved a line for you. It wanted your opinion."',
        responses: {
          kind: ["Fill in something gentle", "Thank him for the line"],
          playful: ["Fill in something silly", "Steal the ending for yourself"],
          bold: ["Finish it better than he would", "Take over the whole story"],
          neutral: ["Fill it in plainly", "Say the line, move on"],
        },
      },
      {
        line: "You ask about his brother. His smile doesn't slip, not quite, but something behind it does, and he steers the conversation back to poetry before you can ask anything real.",
        approach: "Let it go, for now",
        greeting:
          '"Now then! Where was I? Ah, yes. Romanticism. A much more cheerful subject."',
        responses: {
          kind: [
            "Let the subject change gently",
            "Say he doesn't have to explain",
          ],
          playful: ["Tease him for dodging", "Guess at the real story"],
          bold: ["Ask about the brother anyway", "Push past the poetry"],
          neutral: ["Let it drop entirely", "Follow him back to poetry"],
        },
      },
      {
        line: 'He calls you "my dear" now without the theatrical pause that used to come before it.',
        approach: "Let the nickname stick",
        greeting:
          '"Twice is coincidence. Three times is a season. Welcome back."',
        responses: {
          kind: ["Say the name suits you now", "Thank him for the nickname"],
          playful: ["Ask when it became official", "Tease the missing pause"],
          bold: ["Claim the nickname as yours", "Say you noticed the change"],
          neutral: ["Let the nickname stand", "Not remark on it"],
        },
      },
      {
        line: '"Zenji Kotodama, a wonderful name, don\'t you think?" he asks, then actually waits to hear what you think.',
        approach: "Tell him what you think",
        greeting:
          '"A sensational name befitting of my sensational sensibilities, wouldn\'t you say? ...Well? Go on."',
        responses: {
          kind: ["Say it's a wonderful name", "Agree, kindly"],
          playful: ["Suggest a sillier name", "Ask for the lecture anyway"],
          bold: ["Say the name is a bit much", "Demand the short version"],
          neutral: ["Shrug, say it's fine", "Give a plain opinion"],
        },
      },
      {
        line: "He's woven you into one of his stories as a character, and seems nervous about how you'll take it.",
        approach: "Ask which one you are",
        greeting:
          "\"I wrote you into today's stanza. Don't fret, I changed your name. Slightly.\"",
        responses: {
          kind: [
            "Reassure him you're flattered",
            "Say the character suits you",
          ],
          playful: ["Guess which one you are", "Demand a bigger role"],
          bold: [
            "Ask to read the whole stanza",
            "Say you don't need it changed",
          ],
          neutral: ["Let him have his story", "Don't remark on the character"],
        },
      },
      {
        line: '"Haku filmed these at my behest," he says of an old video, "but I can\'t imagine these old things will capture anyone\'s heart." He seems to hope you disagree.',
        approach: "Say you liked it",
        greeting: '"Be honest, my dear. ...No, be kind. Then honest."',
        responses: {
          kind: ["Say you genuinely liked it", "Thank him for showing you"],
          playful: ["Tease the old footage", "Ask Haku for outtakes"],
          bold: ["Say it's better than he thinks", "Tell him to post more"],
          neutral: ["Give a plain nod", "Watch without much comment"],
        },
      },
      {
        line: "He asks after your day with an attention that makes the question feel like the whole point of the conversation.",
        approach: "Tell him about your day",
        greeting:
          '"Tell me something true, my dear. I\'ve grown tired of my own inventions today."',
        responses: {
          kind: ["Tell him something true", "Thank him for really asking"],
          playful: [
            "Make up something absurd",
            "Test if he's really listening",
          ],
          bold: ["Tell him something surprising", "Ask why he's so invested"],
          neutral: ["Answer plainly", "Give a short answer"],
        },
      },
      {
        line: '"A burst of inspiration has taken hold of me," he announces, then admits it was really just you walking by.',
        approach: "Ask what inspired him",
        greeting:
          '"The ghost of artistry visits me most when you\'re near. Coincidence? I think not."',
        responses: {
          kind: [
            "Say you're glad to inspire him",
            "Take the compliment sweetly",
          ],
          playful: ["Ask if that happens often", "Tease him for the excuse"],
          bold: ["Say of course it was you", "Claim credit outright"],
          neutral: ["Shrug it off", "Don't remark on it"],
        },
      },
      {
        line: "He's stopped introducing you as a fan and started calling you a friend.",
        approach: "Say you're glad to know him",
        greeting:
          '"You\'ve a good ear for nonsense, my dear. I mean that as the highest compliment."',
        responses: {
          kind: ["Say you're glad to be a friend", "Thank him for the shift"],
          playful: ["Ask when he decided that", "Tease him about the upgrade"],
          bold: ["Say friend was always accurate", "Say it fits better anyway"],
          neutral: ["Accept the change quietly", "Let the word settle"],
        },
      },
    ],
    warm: [
      {
        line: "His expression brightens with genuine pleasure, all formal distance melting away. \"My dear. I'm glad you're here.\"",
        approach: "Sit beside him",
        greeting: '"The lanterns lean toward you. So, apparently, do I."',
        responses: {
          kind: "Say you're glad too",
          playful: "Ask what drew you in",
          bold: "Sit closer than invited",
          neutral: "Sit beside him quietly",
        },
      },
      {
        line: "He's saved the last of the tea. He'd been saving it for a while.",
        approach: "Accept the tea",
        greeting:
          '"Go on, drink up. Watching you enjoy it is enough food for my soul."',
        responses: {
          kind: "Thank him for saving it",
          playful: "Ask how long he saved it",
          bold: "Drink it before he explains",
          neutral: "Take the tea, say nothing",
        },
      },
      {
        line: '"You arrive like a season, my dear," he says, delighted. "Expected, and still a gift."',
        approach: "Arrive like clockwork",
        greeting: '"You return like seasons turning. My heart is at ease."',
        responses: {
          kind: "Say the same about him",
          playful: "Ask which season he means",
          bold: "Say you're the gift then",
          neutral: "Arrive, say little",
        },
      },
      {
        line: "He shows you the pages he's been working on. He shows almost no one.",
        approach: "Ask about the verse",
        greeting: [
          '"I was writing about rain. You\'ve made it about something warmer."',
          '"My ideal summer vacation? To lay down my burdens in the springs of Yugawara and pursue my wordsmithery in peace, as so many greats have done before me."',
        ],
        responses: {
          kind: "Thank him for showing you",
          playful: "Demand to see even more",
          bold: "Read it before he stops you",
          neutral: "Read quietly, say nothing",
        },
      },
      {
        line: "The brush pauses. He'd rather talk to you than finish the line.",
        approach: "Tell him a small thing",
        greeting:
          '"Tell me one small thing about your day. Small things are the good ones."',
        responses: {
          kind: "Tell him something warm",
          playful: "Make the small thing absurd",
          bold: "Say you're worth the pause",
          neutral: "Tell him something plain",
        },
      },
    ],
    spark: [
      {
        line: "The story he's writing has quietly stopped being about anyone but you.",
        approach: "Let him show you",
        greeting:
          '"You are the only subject I cannot get right. I keep trying."',
        responses: {
          kind: "Tell him the verse landed",
          playful: "Steal his brush",
          bold: "Ask him to show you",
          neutral: "Let the verse stand",
        },
      },
      {
        line: "A flower turns up tucked behind your ear. You never quite catch him doing it.",
        approach: "Wear the flower",
        greeting:
          "\"There's a word for this in the old poems. I'd rather just show you.\"",
        responses: {
          kind: "Let his hand stay",
          playful: "Ask what rhymes with you",
          bold: "Catch his hand this time",
          neutral: "Wear it, say nothing",
        },
      },
      {
        line: '"I\'ve written this one badly on purpose," he admits. "I wanted an excuse to read it to you."',
        approach: "Hear the poem",
        greeting:
          '"Shall I read it to you? Fair warning: it isn\'t about the moon."',
        responses: {
          kind: "Ask him to read it",
          playful: "Write him a terrible one back",
          bold: "Tell him to skip the poem",
          neutral: "Leave it in haiku",
        },
      },
      {
        line: "He sits closer than the step requires, and doesn't pretend otherwise.",
        approach: "Come closer",
        greeting:
          '"Come closer. The poem requires it. That\'s a lie, but come closer."',
        responses: {
          kind: "Let him stay close",
          playful: "Point out the cheating",
          bold: "Close the space on the step",
          neutral: "Don't move away",
        },
      },
      {
        line: '"Some things," he says softly, "are better in seventeen syllables. Others aren\'t."',
        approach: "Stay past the last lantern",
        greeting:
          '"Stay through the last lantern. I\'d like the night to be longer."',
        responses: {
          kind: "Ask him to say the rest",
          playful: "Guess which 'others' he means",
          bold: "Say it plainly instead",
          neutral: "Watch the lanterns",
        },
      },
    ],
    close: [
      {
        line: '"With you," he says, "the world behaves as though a story were being told well. I hadn\'t expected to feel that again."',
        approach: "Finish the poem together",
        greeting: '"With you, the world feels right. Like poetry made real."',
        responses: {
          kind: "Accept all of what he is",
          playful: "Make him laugh mid-verse",
          bold: "Tell him plainly you love this",
          neutral: "Share the quiet syllables",
        },
      },
      {
        line: "He doesn't reach for a metaphor this time. He just says he's happy.",
        approach: "Say nothing, and stay",
        greeting:
          "\"You needn't say anything. I've grown fluent in your silences.\"",
        responses: {
          kind: "Say happy suits him",
          playful: "Bring him gentle joy",
          bold: "Say it plainly back",
          neutral: "Accept his silence",
        },
      },
      {
        line: '"I\'ve written you badly a hundred times," he laughs. "You deserve better than my words."',
        approach: "Tell him the words are enough",
        greeting:
          "\"I've stopped writing about longing. There's nothing left to long for.\"",
        responses: {
          kind: "Say he needn't write you well",
          playful: "Ask for the worst one",
          bold: "Give him the ending yourself",
          neutral: "Say the words are enough",
        },
      },
      {
        line: "He says your name the way he'd read the last line of something he didn't want to end.",
        approach: "Go to him",
        greeting:
          '"Every verse I finish lately has your shape in it somewhere."',
        responses: {
          kind: "Say you don't want it to end",
          playful: "Steal the last line",
          bold: "Bold as poetry",
          neutral: "Watch the lanterns together",
        },
      },
      {
        line: "The world quiets around him when you're near. He's noticed. He's grateful.",
        approach: "Watch the moon with him",
        greeting:
          '"Stay. The moon is doing something worth witnessing together."',
        responses: {
          kind: "Tell him his words reached you",
          playful: "Ask what he's grateful for",
          bold: "Say you feel it too",
          neutral: "Let the quiet stay",
        },
      },
    ],
    bound: [
      {
        line: "He's stopped writing about longing. The new poems are far less publishable.",
        approach: "Ask what he's writing now",
        greeting:
          "\"You've made a very poor poet of me. I've never been happier about anything.\"",
        responses: {
          kind: "Let the night run long",
          playful: "Rhyme something filthy",
          bold: "Say it without metaphor",
          neutral: "Let the poem finish",
        },
      },
      {
        line: "He reads you the old folktale badly, on purpose, so it takes all night.",
        approach: "Stay until morning",
        greeting:
          '"Stay until morning. The night has been generous; let\'s not insult it."',
        responses: {
          kind: "Stay until morning",
          playful: "Blow out the lantern",
          bold: "Kiss him mid-sentence",
          neutral: "Stay quiet with him",
        },
      },
      {
        line: '"Seventeen syllables can\'t hold this," he murmurs. "I\'ve stopped trying."',
        approach: "Hear the plain version",
        greeting:
          '"I love you. There. No metaphor. I\'ve been saving the plain version."',
        responses: {
          kind: "Say the plain version back",
          playful: "Tease him for trying at all",
          bold: "Tell him to stop writing",
          neutral: "Let the plain version stand",
        },
      },
      {
        line: "He hums something low against the back of your neck. It's a poem. You'll never read it.",
        approach: "Come here",
        greeting:
          '"Come here. I want to memorize something and it isn\'t a poem."',
        responses: {
          kind: "Let him hum a while longer",
          playful: "Hum it back at him, badly",
          bold: "Ask him to say it instead",
          neutral: "Stay still, let him hum",
        },
      },
      {
        line: "The lanterns burn down and neither of you notices for a very long time.",
        approach: "Stay till the last lantern",
        greeting:
          '"Stay till the last lantern\'s out. I never did get enough night, less of it now."',
        responses: {
          kind: "Let the night keep going",
          playful: "Blame him for losing track",
          bold: "Say you didn't notice either",
          neutral: "Watch the lanterns burn down",
        },
      },
    ],
  },
  // Evening block: dialogue and approach paired per beat
  // (docs/dialogue-approach-pairing.md) instead of two separately-drawn lists.
  dialogueWhen: [
    {
      when: { time: "evening" },
      dialogue: {
        new: [
          {
            line: "He's watching the last light go out of the sky and doesn't seem to mind that it's leaving.",
            approach: "Watch the last light with him",
          },
          {
            line: "\"Dusk becomes a genius of the pen, don't you think? Sit, the light's nearly gone, and it's worth watching it go.\"",
            approach: "Watch the last light with him",
          },
          {
            line: "The lanterns have come on around the step. He's already there on the lit side, like he's had the seat picked out all evening.",
            approach: "Sit under the lanterns",
          },
          {
            line: '"A stranger at dusk, how fortunate," he says. "Sit, and let the evening happen to us."',
            approach: "Sit under the lanterns",
          },
        ],
        known: [
          {
            line: '"The wanderer, and at the good hour too. The evening was getting lonely."',
            approach: "Take the warm end of the step",
          },
          {
            line: "He's saved you the warm end of the step, where the lantern reaches.",
            approach: "Take the warm end of the step",
          },
          {
            line: '"Sit, the step is warm," he says, "and the evening is doing something worth watching."',
            approach: "Take the warm end of the step",
          },
        ],
        warm: [
          {
            line: '"You arrive like the evening does: expected, and still a gift."',
            approach: "Let the evening happen",
          },
        ],
      },
    },
  ],
  // No temperamentDialogue pool: every leftover line was placed onto a
  // dialogue beat's `greeting` (docs/dialogue-greeting-pairing.md).
  // No top-level `responses` pool: every dialogue[tier] beat (new/known/warm/
  // spark/close/bound) now carries bespoke responses for all four types (see
  // dialogue above), making the old per-tier pools fully unreachable — same
  // end state as yuri.js/benkei.js/jin.js/kaito.js/lucas.js/tohma.js/leo.js/
  // shohei.js/subaru.js.
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
      "**{name}** had a story saved for {user}. He tells it at length, with gestures.",
    ],
    spark: [
      '"Horsefeathers." **{name}** had absolutely been watching for {user}.',
      "{user} says the name, and **{name}** finds himself briefly short of words.",
      "**{name}** bows to {user} with rather more ceremony than the moment requires.",
    ],
    close: [
      '"The moon is beautiful, isn\'t it?" **{name}** asks {user}, whatever the hour, and they know exactly what he means by it.',
      "**{name}** has stopped composing verses about longing. {user} is standing right there.",
      '"Can you see me? Phew..." **{name}** is so relieved it\'s {user} that he forgets to be dashing.',
    ],
    bound: [
      '"Seventeen syllables can\'t hold this, my dear." **{name}** stops trying and crosses to {user} instead.',
      "**{name}** hasn't much time, and spends all of it getting to {user}.",
      "{user} says the name, and **{name}** gives up the metaphor entirely.",
    ],
  },
};
