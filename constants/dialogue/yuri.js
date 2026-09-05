export default {
  // The level-up DMs (docs/bond-scene-dms.md). One of the six volatile
  // characters — see docs/negative-affinity-enemies-to-lovers.md. Yuri never
  // stops declaiming; the bravado is the load-bearing wall and it does not come
  // down, it only develops cracks. "Specimen" and "worm" belong to the early
  // levels, where they are simply how he addresses anyone he has not decided
  // about yet; they thin out of their own accord once the cracks start, and he
  // never announces that they have. He does not stammer here — that tic lives
  // in the encounter lines, where there is room for it.
  bondScenes: {
    acquaintance: {
      beats: [
        "**{firstName}**: SPECIMEN. You'll attend to this message immediately. It comes from the genius and visionary Dr. Yuri Isami, and is therefore of considerable historical importance.",
        "You've entered my facility {timesMet} times and left on your own feet each occasion. Do you understand the significance!? No. Of course you don't. Nobody does.\n\nThe significance is that you keep coming *back*. Every other student in this academy treats Mortkranken as a place one is carried into. You walk in. Unprompted.\n\nIt's either bravery or a diagnosable condition, worm, and as your physician I intend to establish which.",
      ],
      choice: {
        prompt: "Well!? Answer! I haven't got all night. I have, but that's beside the point!",
        options: [
          {
            key: "kind",
            label: "Say the facility's impressive",
            style: 3,
            close: "It... yes. YES. It is. Thank you. Finally, an eye that sees.\n\n*A pause.*\n\n...You're the first person to say so without being sedated. I shall be recording the date.",
          },
          {
            key: "playful",
            label: "Ask for the diagnosis",
            style: 1,
            close: "Inconclusive! Which never happens! I am NEVER inconclusive!\n\nI shall require further visits to establish a baseline. Many further visits. It's a clinical necessity and not, as Jiro suggested, anything else.",
          },
          {
            key: "bold",
            label: "Say you walk in for him",
            style: 4,
            close: "*There is a full minute of nothing.*\n\nThat's... that is an absurd thing to say to a man of science.\n\nYou won't repeat it. To anyone. Particularly not to Jiro, who has an expression he does.",
          },
        ],
      },
      keepsake: {
        emoji: "🔬",
        line: "A tally he keeps of every visit, still filed under 'unexplained'.",
      },
    },

    friend: {
      beats: [
        "**{firstName}**: A matter of scientific interest. Don't read anything into the hour at which I'm raising it.",
        "You address me with {favResponse}. Invariably. I've subjected it to considerable strain: I have been magnificent at you, I have been insufferable at you, I once shouted for Jiro directly into your ear, and the result doesn't change.\n\nHmph. Frostheim's people go stiff. My own house goes quiet. You do neither, worm, which is anomalous, and I'm a man who cannot leave an anomaly alone.",
      ],
      choice: {
        prompt: "Explain yourself! In detail! I intend to write it up!",
        options: [
          {
            key: "kind",
            label: "Say you enjoy his company",
            style: 3,
            close: "You... what?\n\n*A long silence, from a man who has never been silent.*\n\nThat's not a valid experimental result. Nobody enjoys... I shall have to re-run the entire... I'm going to bed.\n\n*He doesn't go to bed. The read receipt says so.*",
          },
          {
            key: "playful",
            label: "Ask how loud the shout was",
            style: 1,
            close: "IT WAS NECESSARY. He was three rooms away!\n\n...It was extremely loud. Jiro's hearing has been formally assessed since. Don't bring it up in front of him, he keeps a record.",
          },
          {
            key: "bold",
            label: "Say the bravado isn't working",
            style: 4,
            close: "*There is no reply for eight minutes, which from a man who cannot be quiet for eight seconds is its own kind of answer.*\n\nHow dare you.\n\n*Then:* ...How long have you known. Be precise. I need to know exactly how long I've been failing.",
          },
        ],
      },
      keepsake: {
        emoji: "📋",
        line: "An anomaly he wrote up and never found an explanation for.",
      },
    },

    closeFriend: {
      beats: [
        "**{firstName}**: The lab. Now. Don't knock, don't announce yourself, and do not, I cannot stress this enough, laugh.",
        "*He is sitting on the floor between two benches with a paperback in his hands, and the cover has a great deal of purple on it and a young doctor being magnificent at a dragon.*\n\n> It's a medical journal. It's *research*, it's comparative anatomy, it's...\n\n*He stops. He looks at the book. He looks at you.*\n\n> It's *The Ace Doctor Wows Minds In Another World Thesis*. It's a novel. It's about a physician who is transported to another world and immediately and correctly recognized as the finest mind of his generation, and I've read it eleven times.",
        "> I lost everything in the fire. Four years of research, my instruments, my notes, my... everything. This was in my coat pocket and it's the only object I own that predates it.\n\n> Jiro doesn't know. Nobody knows. I've told you because you didn't laugh, and because I've discovered that not being laughed at is a thing I've been rationing since I was nineteen.",
      ],
      choice: {
        prompt: "Say something. And if it's unkind I shall never recover, so choose carefully.",
        options: [
          {
            key: "kind",
            label: "Ask him to read some of it",
            style: 3,
            close: "> Aloud?\n\n*He does it. Badly at first, then with increasing and entirely unembarrassed relish, doing every voice.*\n\n*An hour in he looks up and finds you still sitting on the lab floor listening, and stops mid-sentence and goes very red and cannot get going again for some time.*",
          },
          {
            key: "playful",
            label: "Ask if the doctor's handsome",
            style: 1,
            close: "> Devastatingly. Obviously. That's simply accurate characterisation.\n\n> ...He's described as having teal hair in the second volume. I've thought about this more than is healthy and I would like you to say nothing at all.",
          },
          {
            key: "bold",
            label: "Ask what else burned",
            style: 4,
            close: "*The performance drops out of him completely.*\n\n> Everything I had done. Everything I was going to be.\n\n*A pause.*\n\n> I haven't said that sentence without shouting before. It's much worse quietly. Sit down... no. Stay. Don't go. I'd like you to stay while it's quiet.",
          },
        ],
      },
      keepsake: {
        emoji: "📕",
        line: "A battered paperback, the only thing that survived the fire.",
      },
    },

    confidant: {
      beats: [
        "**{firstName}**: I lost a patient tonight. Not one of ours. A second-year from Vagastrom whose name I'm not going to type.",
        "I want to be extremely clear that this isn't a failure of technique. I've gone through it six times. There was no intervention available to me at the time it presented and there is none available now.\n\nThat's the correct clinical assessment and I've delivered it to three people this evening in a very steady voice.",
        "It doesn't help. It has never once helped. I've said that sentence perhaps nine times since I came to this academy and it has never helped and I keep saying it as though the tenth might.\n\nEveryone believes I want to be acknowledged. The world's greatest, and so forth. That's true and it's also the smaller half.\n\nThe larger half is that I want nobody to die. Not a single one. Ever. It isn't a research program, it's a... it isn't reasonable and I'm aware it isn't reasonable.",
      ],
      choice: {
        prompt: "Don't tell me it wasn't my fault. I have that sentence. I have it in four languages.",
        options: [
          {
            key: "kind",
            label: "Ask if he's eaten today",
            style: 3,
            close: "...That's not the question I was braced for.\n\n*A long pause.*\n\nNo. I haven't. Nobody asks me that. Everyone asks about the patient.\n\nCome to the lab. Bring something. Anything, I don't care what. I simply don't want to be the only person in the building who's awake.",
          },
          {
            key: "playful",
            label: "Ask for the four languages",
            style: 1,
            close: "You're a dreadful person and I'm going to tell you all four.\n\n*He does. It takes a while and by the third one he has stopped sounding like a man reciting and started sounding like one talking, which was rather the point.*",
          },
          {
            key: "bold",
            label: "Tell him it isn't his to carry",
            style: 4,
            close: "IT IS MINE. They are ALL mine. That is what a physician IS.\n\n*Then, immediately, much smaller:*\n\n...I'm aware that isn't what a physician is. I've been told. I was told the week after the fire and I didn't listen and I'm not going to start listening now.\n\nBut you may say it again. Say it again in the morning. I find I want to be argued with by someone who isn't being paid to argue with me.",
          },
        ],
      },
      keepsake: {
        emoji: "💊",
        line: "The night somebody asked about the doctor instead of the patient.",
      },
    },

    devoted: {
      beats: [
        "**{firstName}**: You're in my facility. You're stable. I haven't left this room in six hours and I'm not going to, so don't suggest it.",
        "> I'm not a fighter. I've never pretended otherwise: I send Jiro, everybody knows I send Jiro, it's an efficient allocation of resources and I've never once been ashamed of it.\n\n> I was ashamed of it tonight. Standing in a corridor. For approximately eleven seconds, while somebody else carried you past me.",
        "> You belong to me. I say that about my patients and everybody finds it distasteful and I've never cared.\n\n> I find that when I say it about you it means something else entirely, and I've been sitting here for six hours discovering the difference, and it's been the worst night of my life and I wouldn't have spent it anywhere else.",
      ],
      choice: {
        prompt: "Don't thank me. You're my patient. This is simply what I... don't thank me.",
        options: [
          {
            key: "kind",
            label: "Thank him anyway",
            style: 3,
            close: "> I said not to.\n\n*His voice does something on the second word. He turns away and busies himself with a tray that doesn't require attention for nearly two minutes.*\n\n*When he comes back he sits down on the edge of the bed, which is against every protocol he has ever written, and does not get up again.*",
          },
          {
            key: "playful",
            label: "Ask about the eleven seconds",
            style: 1,
            close: "> Twelve. It was twelve. I've been over it.\n\n> Do you know how long twelve seconds is when you're the cleverest man in the building and there's nothing whatsoever you can do!? It's a geological age. I intend to never experience it again.",
          },
          {
            key: "bold",
            label: "Ask what it means instead",
            style: 4,
            close: "*He goes red to the ears and stays that way.*\n\n> I'm not... this is neither the time nor the... you're CONCUSSED...\n\n*Then he stops. He takes your hand, which he has done a thousand times to take a pulse, and this time doesn't take the pulse.*\n\n> You know precisely what it means,\n\n*he says, very quietly, for once not shouting at all.*\n\n> Don't make me be the one who says it while you're on a drip.",
          },
        ],
      },
      keepsake: {
        emoji: "🧤",
        line: "The first time he took your hand without taking a pulse.",
      },
    },

    soulbound: {
      beats: [
        "**{firstName}**: I'm going to do this properly, which for me means without an audience, without a title, and, this is the difficult one, without shouting.",
        "{timesMet} times. I have the figure. I've had the figure since it was in single digits and I've never once needed to check it.\n\nYou walked into a building people are carried into, over and over, for no reason that survives examination. I've examined it. I've examined it at three in the morning on many occasions.",
        "I've called myself a genius since I was seventeen years old. It isn't modesty I lack: it's that if I stop saying it for one minute I'm a man who lost his laboratory in a fire and has been shouting to cover the sound of it ever since.\n\nYou've never once required me to shout. That is the thing. In my entire life, one person, and it was you, and I didn't deserve it and accepted it anyway because I'm greedy and always have been.",
        "So.\n\nI love you. There. Said at conversational volume, which cost me more than the fire did.\n\nI'm not going to dress it up. I have no experiment to hide it behind and no diagnosis to file it under. I love you, Yuri Isami loves you, and it's the only claim I've ever made that I have absolutely no evidence for and complete confidence in.",
      ],
      choice: {
        prompt: "Answer. Or don't. I shall be magnificent about it either way. I shall be *devastated* and magnificent.",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close: "*There is a crash, some distance away, that is probably a tray.*\n\nDo NOT move. Don't... stay exactly where you are, I'm coming, I'm... JIRO, WHERE ARE MY... no. No, I don't need them. I don't need anything.\n\n*He arrives without his coat, which has never happened, and stops in the doorway looking utterly undone, and then crosses the room and holds onto you and says your name three times as though checking it still works.*",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close: "Naturally. Naturally! Take as long as you require. I'm a scientist, I'm *made* of patience, I once waited seven weeks for a culture.\n\n*A pause. Then, without the flourish:*\n\n...That was bravado. You'll have spotted it. Take the time anyway. I mean it, and I won't raise it again, and you'll find me exactly where I always am, being insufferable at Jiro.\n\nAnd you may still walk in. That was never conditional on anything. It's always simply been the best part of my week.",
          },
        ],
      },
      keepsake: {
        emoji: "📔",
        line: "A declaration made at conversational volume.",
      },
    },
  },
  dialogue: {
    new: [
      '"What are you dawdling for? Change out of those rags and report to my lab immediately!"',
      '"Fascinating," he says, about you, in the tone one uses about a specimen.',
      "He doesn't look up from the slide. \"Don't breathe on that. Or on me.\"",
      "The lab hums. He's been awake for an unreasonable number of hours and it shows.",
      '"You should feel honored to be chosen as the test subject of Dr. Yuri Isami, genius and visionary!"',
    ],
    known: [
      "He's stopped calling you 'worm.' He hasn't replaced it with anything yet.",
      "There's a second chair in the lab. He'll insist it has always been there.",
      '"Are you injured or ill? Oh dear, how unfortunate. I shall begin the experi... Ahem, the treatment, immediately."',
      "He notes something about you in the margin, and covers it when you look.",
      "The insults have gotten more specific, which means he's been paying attention.",
    ],
    warm: [
      "His cold demeanor cracks slightly: there's obsession in his eyes now, the drive to save you consuming him.",
      "He has a new set of notes. Every page of them is about you.",
      '"Where on earth have you been, worm?" he snaps. "Next time you take a leave of absence, you inform me in advance."',
      "He shoves a bottle at you without a word. It's the good painkiller. He'd deny caring.",
      "He turns bright red mid-sentence and blames the lab lighting.",
    ],
    spark: [
      "He takes your pulse for the fourth time today. It's fine. It's always fine.",
      "He's gone red to the tips of his ears and has not taken his hand back.",
      '"Purely clinical," he mutters, with his hand still on your face.',
      "The insults have gone quiet. What replaced them is much harder for him.",
      "He leans in to examine something, and forgets to invent a reason.",
    ],
    close: [
      '"I\'ll find your cure," he says with absolute conviction, "because I\'m the only one capable enough. And you\'re mine to save."',
      "He's asleep at the bench over your file. He'd rather die than let you say so.",
      '"Don\'t you dare thank me," he warns, ears scarlet. "I\'m not doing it for gratitude."',
      "He's stopped flinching when you reach for your coat. He hadn't noticed he was doing it until it stopped.",
      "He grips your wrist a moment too long, checking a pulse he already knows is fine.",
    ],
    bound: [
      "He is furious about how much he loves you and expresses it almost entirely with his hands.",
      '"Don\'t look at me like that," he snaps, already crossing the lab toward you.',
      "He falls asleep on your chest mid-argument and would deny it under oath.",
      "He kisses you like it's a problem he intends to solve thoroughly and repeatedly.",
      '"Stay," is all he says now, where he used to build a whole excuse around the word.',
    ],
  },
  temperamentDialogue: {
    new: [
      '"A test subject wanders in of its own accord. How convenient."',
      '"Don\'t touch that. Or that. Honestly, just stand still."',
      '"Are you here to be useful, or to be a variable?"',
      '"Hm. Poor posture, poor sleep, poor decisions. Textbook."',
      "\"I am a very busy man, so if you don't require examination, then we're done here.\"",
    ],
    known: [
      "\"Oh. It's you. Don't touch anything, but... you may sit.\"",
      "\"You're less useless than average. Don't celebrate.\"",
      '"Jiro!! Jiro!!! What on earth are you... ah. It\'s you. Sit."',
      "\"That's the wrong chair. ...Fine. That's your chair now, apparently.\"",
      "\"You're sleeping badly. It's written all over you. Do something about it.\"",
    ],
    warm: [
      '"You again? ...I suppose I don\'t mind."',
      '"You\'re late. Not that I was... never mind. Sit."',
      "\"Take this. It's for the headache you've been pretending not to have.\"",
      '"I\'ve read your file eleven times. Purely academic interest, obviously."',
      '"I do this for the future of humanity. And... fine. For you specifically. Don\'t repeat that."',
    ],
    spark: [
      '"Hold still. I\'m... this is a medical assessment. Stop smiling."',
      '"Your proximity is affecting my concentration. Don\'t you dare move."',
      "\"I've catalogued every symptom you have. This one's mine. Shut up.\"",
      '"If you laugh I will never speak to you again. ...Fine. Laugh."',
      '"I don\'t want anything from you. Except... no. Never mind. Come here."',
    ],
    close: [
      '"Don\'t go worrying me like that. I have better things to do than panic over you."',
      '"I always preserve the lives of my patients. I cannot make guarantees for any other parts of them, however. ...You, I keep whole."',
      '"I said sit down. Please. ...There. Was that so hard for either of us?"',
      '"If anything happens to you I\'ll be extremely inconvenienced. Emotionally. Shut up."',
      '"I will solve this. You don\'t get to give up before I do."',
    ],
    bound: [
      '"You belong to me. I won\'t hand you to another researcher..." He stops cold. "N-No. You\'ve misunderstood. I merely..."',
      '"I love you. There. I said it. Never bring it up again. ...Bring it up again."',
      "\"You're impossible and I've stopped wanting you to be anything else.\"",
      "\"Stay the night. The lab's cold. That's the reason. That's the only reason.\"",
      '"Stop smiling at me like that or I\'ll never get anything done."',
    ],
  },
  approach: {
    new: [
      "Enter the lab",
      "Stand still",
      "Be interesting",
      "Roll up your sleeve",
    ],
    known: [
      "Take the second chair",
      "Don't touch anything",
      "Be less useless",
      "Sit without asking",
    ],
    warm: [
      "Take the offered bottle",
      "Sit down as told",
      "Ask what he's working on",
      "Be late on purpose",
    ],
    spark: ["Hold still", "Don't move", "Come here", "Laugh anyway"],
    close: [
      "Go to him",
      "Wake him from the bench",
      "Let him take your pulse",
      "Refuse to be a burden",
    ],
    bound: [
      "Get over there",
      "Smile at him like that",
      "Stay the night",
      "Bring it up again",
    ],
  },
  responses: {
    // kind is Yuri's real channel (affinityByResponse.kind = 2): steady,
    // unsentimental care he never has to perform anything back for — telling
    // him to sleep, letting "worm" slide, not laughing at the novel he hides,
    // being gentle with the fear of failure under the bravado. playful reaches
    // him too (1): he flusters more easily than anyone in the script, so
    // teasing lands and is half the fun — it just makes him sputter and re-arm
    // rather than open up. bold glances off (0): a blunt challenge to his
    // genius or a refusal to be his specimen hits the one nerve he can't
    // defend and makes him bombastic instead of honest — not dislike, just the
    // move that doesn't get through.
    kind: {
      new: [
        "Let the 'worm' slide",
        "Thank him anyway",
        "Tell him to get some sleep",
      ],
      known: [
        "Take the second chair",
        "Don't laugh at the novel",
        "Say the research can wait",
      ],
      warm: [
        "Take the painkiller",
        "Sleep, doctor's orders",
        "Let him fuss over your pulse",
      ],
      spark: [
        "Let him keep pretending",
        "Tell him it's mutual",
        "Be gentle about the blush",
      ],
      close: [
        "Say the next one won't fail",
        "Tell him to sleep",
        "Say the thanks he forbade",
      ],
      bound: [
        "Say it back",
        "Let him fall asleep on you",
        "Tell him he's allowed",
      ],
    },
    playful: {
      new: [
        "Tease him carefully",
        "Touch what he said not to",
        "Be a deliberate variable",
      ],
      known: [
        "Read his margin notes aloud",
        "Claim the second chair",
        "Ask what counts as 'lowbrow'",
      ],
      warm: [
        "Blame the lab lighting",
        "Show up late on purpose",
        "Quote his novel back at him",
      ],
      spark: ["Laugh anyway", "Take his pulse instead", "Call it clinical too"],
      close: [
        "Make him laugh despite himself",
        "Fluster him on purpose",
        "Read his notes out loud",
      ],
      bound: [
        "Bring it up again",
        "Smile at him deliberately",
        "Call him impossible back",
      ],
    },
    bold: {
      new: [
        "Talk back to the genius",
        "Poke a hole in his logic",
        "Refuse to be his specimen",
      ],
      known: [
        "Say the bravado's showing",
        "Demand he say what he means",
        "Push past the lab-coat act",
      ],
      warm: [
        "Say he was clearly waiting",
        "Name the savior complex",
        "Match his volume",
      ],
      spark: [
        "Close the distance yourself",
        "Say what he won't",
        "Take his hand off the chart",
      ],
      close: [
        "Match his intensity",
        "Tell him you won't give up",
        "Say you're his to save",
      ],
      bound: [
        "Cross the lab first",
        "Say it before he can",
        "Kiss him mid-argument",
      ],
    },
    neutral: {
      new: ["Give him space", "Let him work", "Answer only what's asked"],
      known: [
        "Take the chair quietly",
        "Let him finish his notes",
        "Say nothing",
      ],
      warm: ["Let it stay clinical", "Sit in the lab quietly", "Don't name it"],
      spark: ["Let it stay clinical", "Move away first", "Say nothing at all"],
      close: [
        "Understand his withdrawal",
        "Sit quietly in the lab",
        "Let him pretend it's nothing",
      ],
      bound: ["Let him blame the cold", "Say nothing", "Let him sleep"],
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
      '"A test subject, wandering in of its own accord." **{name}** looks {user} over, delighted.',
      '{user} says the name, and **{name}** draws himself up. "You should feel honored to have recognized me."',
      '"You know of me. Naturally." **{name}** informs {user} of this at considerable length.',
    ],
    warm: [
      '"Where on earth have you been, worm?" **{name}** demands of {user}, having clearly counted the days.',
      "{user} calls out, and **{name}** drops a pipette. He denies dropping it.",
      '**{name}** waves {user} over. "You\'re late. Not that I was... never mind." ',
    ],
    spark: [
      '"Wh-Where did you come from!?" **{name}** knows exactly where {user} came from.',
      "{user} says the name, and **{name}** goes an interesting color. Science cannot explain it.",
      "**{name}** re-arms the bravado twice on the way to {user}. Neither attempt survives.",
    ],
    close: [
      '"You belong to..." **{name}** stops. "...You\'ve misunderstood." {user} hasn\'t.',
      "**{name}** abandons whatever he was striding off to do, mid-stride, because {user} called his name.",
      "{user} calls, and **{name}** shouts for Jiro to cover the **{house}** ward. Jiro already was.",
    ],
    bound: [
      '"You are indispensable. To the research. And... and to me. Obviously to me." **{name}** announces it to {user} at volume, then urgently requires a distraction.',
      "**{name}** is furious about how much he loves {user}, and crosses to them anyway.",
      "{user} says the name, and the entire genius act falls off **{name}** at once.",
    ],
  },
};
