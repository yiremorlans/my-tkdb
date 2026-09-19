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
        "You've entered my facility {timesMet} times and walked out on your own feet every occasion. Do you understand the significance!? No. Of course you don't.\n\nEvery other student treats Mortkranken as a place one is carried into. You walk in. Unprompted. Repeatedly.\n\nIt's either bravery or a diagnosable condition, worm, and as your physician I intend to establish which.",
      ],
      choice: {
        prompt: "Well!? Answer! I haven't got all night. I am a very busy man.",
        options: [
          {
            key: "kind",
            label: "Say the facility's impressive",
            style: 3,
            close:
              "It... yes. YES. It is. Thank you. Finally, an eye that sees.\n\n*A pause.*\n\n...You're the first person to say so without being sedated. I shall be recording the date.",
          },
          {
            key: "playful",
            label: "Ask for the diagnosis",
            style: 1,
            close:
              "Inconclusive! Which never happens! I am NEVER inconclusive!\n\nI shall require further visits to establish a baseline. Many further visits. It's a clinical necessity and not, as Jiro suggested, anything else.",
          },
          {
            key: "bold",
            label: "Say you walk in for him",
            style: 4,
            close:
              "*There is a full minute of nothing.*\n\nThat's... that is an absurd thing to say to a man of science.\n\nYou won't repeat it. To anyone. Particularly not to Jiro. He will look insufferably vindicated, and I will not be on the receiving end of it.",
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
        "**{firstName}**: You were GONE. No notice, no note, nothing filed. I learned it from Jiro, who learned it from someone else, which is an intolerable chain of custody for information about my own patient!",
        "EVERY patient under my care is required to inform me of any absence! Treatment schedules depend on it. Vitals depend on it. I'm the physician assigned to your case, worm, and I was left to work out your whereabouts by inference, like a COMMON DETECTIVE!\n\nI want to be perfectly clear that I was NOT worried! And do not think you can smooth this over with {favResponse}, as you always do! It has no bearing on the matter!",
        "This is a professional matter, and it is not up for debate! You will report to my lab immediately so I can examine you myself!",
      ],
      choice: {
        prompt:
          "Have you nothing to say for yourself!? Next time, you inform me in advance. Is that understood!?",
        options: [
          {
            key: "kind",
            label: "Apologize for not telling him",
            style: 3,
            close:
              "Hmph. As well you should.\n\n*A pause.*\n\nYou're back, and in one piece, which is... adequate. Don't do it again, worm.",
          },
          {
            key: "playful",
            label: "Ask if he was worried",
            style: 1,
            close:
              "Worried!? That is not the operative word! I was INCONVENIENCED! Professionally!\n\n...I drafted a contingency protocol for your absence. Any competent physician would have done the same!",
          },
          {
            key: "bold",
            label: "Tell him to come and get you",
            style: 4,
            close:
              "Come and GET you!? I am the captain of Mortkranken! I do not fetch patients like a common orderly!\n\nI shall send Jiro. He will drag you here by the collar, and he will not care whether you are ready for it or not.",
          },
        ],
      },
      keepsake: {
        emoji: "🩺",
        line: "An appointment card with 'notify your physician of all absences' written on the back, underlined twice.",
      },
    },

    closeFriend: {
      beats: [
        "**{firstName}**: The lab. Now. Don't knock, don't announce yourself, and do not, I cannot stress this enough, laugh.",
        "*He is sitting on the floor between two benches with a paperback in his hands, and the cover has a great deal of purple on it and a young doctor being magnificent at a dragon.*\n\n> It's a medical journal. It's *research*, it's comparative anatomy, it's...\n\n*He stops. He looks at the book. He looks at you.*\n\n> It's *The Ace Doctor Wows Minds In Another World Thesis*. It's a novel. A physician transported to another world and immediately, correctly recognized as the finest mind of his generation. I've read it eleven times.",
        "> I lost everything in the fire. Four years of research, my instruments, my notes, my... everything. This was in my coat pocket and it's the only object I own that predates it.\n\n> Jiro doesn't know. Nobody knows. I've told you because you didn't laugh, and because I've discovered that not being laughed at is a thing I've been rationing since I was seventeen.",
      ],
      choice: {
        prompt:
          "Say something. And if it's unkind I shall never recover, so choose carefully.",
        options: [
          {
            key: "kind",
            label: "Ask him to read some of it",
            style: 3,
            close:
              "> Aloud?\n\n*He does it. Badly at first, then with increasing and entirely unembarrassed relish, doing every voice.*\n\n*An hour in he looks up and finds you still sitting on the lab floor listening, and stops mid-sentence and goes very red and cannot get going again for some time.*",
          },
          {
            key: "playful",
            label: "Ask if the doctor's handsome",
            style: 1,
            close:
              "> Devastatingly. Obviously. That's simply accurate characterization.\n\n> ...He's described as having teal hair in the second volume. I've thought about this more than is healthy and I would like you to say nothing at all.",
          },
          {
            key: "bold",
            label: "Ask what else burned",
            style: 4,
            close:
              "*The performance drops out of him completely.*\n\n> Everything I had done. Everything I was going to be.\n\n*A pause.*\n\n> I haven't said that sentence without shouting before. It's much worse quietly. Sit down... no. Stay. Don't go. I'd like you to stay while it's quiet.",
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
        "It doesn't help. It has never once helped. I've said that sentence perhaps nine times since I came here, and I keep saying it as though the tenth might.\n\nEveryone believes I want to be acknowledged. The world's greatest, and so forth. That's true, and it's the smaller half.\n\nThe larger half is that I want nobody to die. Not a single one. Ever. It isn't a research program and it isn't reasonable, and I'm aware it isn't reasonable.",
      ],
      choice: {
        prompt:
          "Don't tell me it wasn't my fault. I have that sentence. I have it in four languages.",
        options: [
          {
            key: "kind",
            label: "Ask if he's eaten today",
            style: 3,
            close:
              "...That's not the question I was braced for.\n\n*A long pause.*\n\nNo. I haven't. Nobody asks me that. Everyone asks about the patient.\n\nCome to the lab. Bring something. Anything, I don't care what. I simply don't want to be the only person in the building who's awake.",
          },
          {
            key: "playful",
            label: "Ask for the four languages",
            style: 1,
            close:
              "You're a dreadful person and I'm going to tell you all four.\n\n*He does. It takes a while and by the third one he has stopped sounding like a man reciting and started sounding like one talking, which was rather the point.*",
          },
          {
            key: "bold",
            label: "Tell him it isn't his to carry",
            style: 4,
            close:
              "IT IS MINE. They are ALL mine. That is what a physician IS.\n\n*Then, immediately, much smaller:*\n\n...I'm aware that isn't what a physician is. I've been told. I was told the week after the fire and I didn't listen and I'm not going to start listening now.\n\nBut you may say it again. Say it again in the morning. I find I want to be argued with by someone who isn't being paid to argue with me.",
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
        prompt:
          "Don't thank me. You're my patient. This is simply what I... don't thank me.",
        options: [
          {
            key: "kind",
            label: "Thank him anyway",
            style: 3,
            close:
              "> I said not to.\n\n*His voice does something on the second word. He turns away and busies himself with a tray that doesn't require attention for nearly two minutes.*\n\n*When he comes back he sits down on the edge of the bed, which is against every protocol he has ever written, and does not get up again.*",
          },
          {
            key: "playful",
            label: "Ask about the eleven seconds",
            style: 1,
            close:
              "> Twelve. It was twelve. I've been over it.\n\n> Do you know how long twelve seconds is when you're the cleverest man in the building and there's nothing whatsoever you can do!? It's a geological age. I intend to never experience it again.",
          },
          {
            key: "bold",
            label: "Ask what it means instead",
            style: 4,
            close:
              "*He goes red to the ears and stays that way.*\n\n> I'm not... this is neither the time nor the... you're CONCUSSED...\n\n*Then he stops. He takes your hand, which he has done a thousand times to take a pulse, and this time doesn't take the pulse.*\n\n> You know precisely what it means,\n\n*he says, very quietly, for once not shouting at all.*\n\n> Don't make me be the one who says it while you're on a drip.",
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
        prompt:
          "Answer. Or don't. I shall be magnificent about it either way. I shall be *devastated* and magnificent.",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close:
              "*There is a crash, some distance away, that is probably a tray.*\n\nDo NOT move. Don't... stay exactly where you are, I'm coming, I'm... JIRO, WHERE ARE MY... no. No, I don't need them. I don't need anything.\n\n*He arrives without his coat, which has never happened, and stops in the doorway looking utterly undone, and then crosses the room and holds onto you and says your name three times as though checking it still works.*",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close:
              "Naturally. Naturally! Take as long as you require. I'm a scientist, I'm *made* of patience, I once waited seven weeks for a culture.\n\n*A pause. Then, without the flourish:*\n\n...That was bravado. You'll have spotted it. Take the time anyway. I mean it, and I won't raise it again, and you'll find me exactly where I always am, being insufferable at Jiro.\n\nAnd you may still walk in. That was never conditional on anything. It's always simply been the best part of my week.",
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
      {
        line: '"What are you dawdling for? Change out of those rags and report to my lab immediately!"',
        approach: "Enter the lab",
        greeting: '"Are you here to be useful, or to be a variable?"',
        responses: {
          kind: ["Offer to help without fuss", "Get to work without complaint"],
          playful: ["Be a deliberate variable", "Dawdle on purpose"],
          bold: ["Talk back to the genius", "Question the urgency"],
          neutral: ["Don't answer either way", "Skip the argument, go"],
        },
      },
      {
        line: '"Fascinating," he says, about you, in the tone one uses about a specimen.',
        approach: "Be interesting",
        greeting:
          "\"I am a very busy man, so if you don't require examination, then we're done here.\"",
        responses: {
          kind: ["Take it as a compliment", "Wish him a good day"],
          playful: [
            "Ask if he's taking notes",
            "Offer to be his prize specimen",
          ],
          bold: ["Refuse to be his specimen", "Turn the observation around"],
          neutral: ["Don't react to the label", "Let him look, say nothing"],
        },
      },
      {
        line: "He doesn't look up from the slide. \"Don't breathe on that. Or on me.\"",
        approach: "Stand still",
        greeting:
          '"Good. You can be still after all. Try to remember it next time."',
        responses: {
          kind: ["Ask if you're in his way", "Stay perfectly still for him"],
          playful: ["Breathe on him anyway", "Lean in a little closer"],
          bold: ["Tell him to ask nicely", "Move closer to the slide"],
          neutral: ["Give him space, unbothered", "Step back and wait"],
        },
      },
      {
        line: "The lab hums. He's been awake for an unreasonable number of hours and it shows.",
        approach: "Ask if he's slept",
        greeting: '"Hm. Poor posture, poor sleep, poor decisions. Textbook."',
        responses: {
          kind: ["Tell him to get some sleep", "Offer to sit with him a while"],
          playful: [
            "Point out he looks exhausted",
            "Guess how long he's been awake",
          ],
          bold: ["Call out the overworking", "Demand he go home"],
          neutral: ["Let him work", "Say nothing about it"],
        },
      },
      {
        line: '"You should feel honored to be chosen as the test subject of Dr. Yuri Isami, genius and visionary!"',
        approach: "Roll up your sleeve",
        greeting: '"Still. This is a privilege, not a conversation."',
        responses: {
          kind: ["Let your guard down", "Trust the process quietly"],
          playful: ["Touch what he said not to", "Ask if it'll hurt"],
          bold: ["Refuse to be impressed", "Demand to know the point"],
          neutral: [
            "Hold out your arm, indifferent",
            "Wait without asking questions",
          ],
        },
      },
    ],
    known: [
      {
        line: "He's stopped calling you 'worm.' He hasn't replaced it with anything yet.",
        approach: "Ask what he'll call you now",
        greeting: '"You\'ve returned. I permit it, provisionally."',
        responses: {
          kind: ["Say you don't mind waiting", "Let him take his time"],
          playful: [
            "Offer terrible suggestions",
            "Guess wildly at what's next",
          ],
          bold: ["Push him to just say it", "Tell him stalling won't work"],
          neutral: ["Shrug and let it go", "Don't chase an answer"],
        },
      },
      {
        line: "He hasn't eaten since yesterday. There's proof, if you look for the wrappers he pretends aren't there.",
        approach: "Bring him something to eat",
        greeting:
          '"I don\'t require sustenance. I require silence and a working centrifuge. ...What is that."',
        responses: {
          kind: ["Insist he eat something", "Set it down without a word"],
          playful: ["Wave it under his nose", "Dare him to ignore it"],
          bold: ["Put the meal in his hands", "Tell him to eat or else"],
          neutral: ["Leave it on his desk", "Say nothing, just walk away"],
        },
      },
      {
        line: '"Are you injured or ill? Oh dear, how unfortunate. I shall begin the experi... Ahem, the treatment, immediately."',
        approach: "Let him examine you",
        greeting:
          '"Do try not to bleed on anything. I only just cleaned the equipment."',
        responses: {
          kind: ["Reassure him you trust him", "Stay calm for his sake"],
          playful: ["Call him out on 'experi-'", "Ask if you're lab rat #1"],
          bold: ["Demand a real diagnosis", "Push past the deflection"],
          neutral: ["Let him work without a word", "Watch him work in silence"],
        },
      },
      {
        line: "He notes something about you in the margin, and covers it when you look.",
        approach: "Ask what he wrote",
        greeting:
          '"I catalogued your visit. Purely for scientific record-keeping."',
        responses: {
          kind: ["Let him keep his secret", "Don't make him explain"],
          playful: ["Read his margin notes aloud", "Peek over his shoulder"],
          bold: ["Demand to read what he wrote", "Take the notebook from him"],
          neutral: ["Let him finish his notes", "Say nothing about the it"],
        },
      },
      {
        line: "The insults have gotten more specific, which means he's been paying attention.",
        approach: "Take it as flattery",
        greeting:
          '"My observations got sharper. That\'s not the same as caring."',
        responses: {
          kind: ["Say the attention is sweet", "Let it warm you anyway"],
          playful: ["Return an insult of your own", "Keep count of them"],
          bold: ["Call his bluff on the insults", "Ask what he really means"],
          neutral: ["Let the insults roll past", "Take none of it personally"],
        },
      },
      {
        line: "He's shouted Jiro's name down the hall three times now, too busy to go looking himself.",
        approach: "Tell him you found him",
        greeting:
          '"Jiro!! Jiro!!! What on earth are you... ah. It\'s you. Sit."',
        responses: {
          kind: ["Offer to go look for him", "Wait for him patiently"],
          playful: ["Ask if you look like Jiro", "Answer to Jiro's name"],
          bold: ["Point out he's stalling", "Tell him to look himself"],
          neutral: ["Don't announce yourself", "Stay quiet in the doorway"],
        },
      },
      {
        line: "\"You're less useless than the last one,\" he announces, like it's the nicest thing he's ever said.",
        approach: "Be less useless",
        greeting: '"That was observation, not praise. Don\'t confuse the two."',
        responses: {
          kind: ["Take the compliment kindly", "Smile and take it to heart"],
          playful: ["Ask who the last one was", "Demand a real compliment"],
          bold: ["Call it a compliment anyway", "Tell him to just say it"],
          neutral: ["Take none of it seriously", "Not worth a reaction"],
        },
      },
      {
        line: "He's cleared a space on the bench beside him without being asked, mid-rant, like it's obvious you'd sit there.",
        approach: "Sit without asking",
        greeting: '"...Sit, then. I already made room, don\'t act shocked."',
        responses: {
          kind: ["Say you're glad he made room", "Sit gently, no fuss"],
          playful: ["Ask if he saved it for you", "Act surprised by the space"],
          bold: ["Take the seat like you own it", "Sit before he can protest"],
          neutral: ["Sit like it's nothing", "Take the space, unbothered"],
        },
      },
      {
        line: '"Obviously, I solved it first," he says, already unrolling a diagram no one asked to see.',
        approach: "Ask to see it anyway",
        greeting:
          '"Hmph. You noticed the new equipment. The research grant committee finally saw sense. About time."',
        responses: {
          kind: [
            "Admire the diagram sincerely",
            "Ask him to walk you through it",
          ],
          playful: ["Pretend to already know it", "Act unimpressed on purpose"],
          bold: ["Call the boast overblown", "Ask what took so long"],
          neutral: ["Glance at it and say nothing", "Look away, uninterested"],
        },
      },
      {
        line: "He's humming classical music under his breath and doesn't stop when he notices you noticing.",
        approach: "Let him keep humming",
        greeting:
          '"Yes, I\'m aware. I have talents beyond medicine. Try not to be too astonished."',
        responses: {
          kind: ["Hum along quietly", "Let him have the moment"],
          playful: ["Hum off-key on purpose", "Guess the composer wrong"],
          bold: ["Ask him to stop performing", "Say it's not that impressive"],
          neutral: ["Tune it out", "Not notice the humming at all"],
        },
      },
      {
        line: "He's muttering about Professor Nicholas's methodology like it's a personal insult, entirely unprompted.",
        approach: "Take his side",
        greeting:
          '"His entire thesis is amateur guesswork dressed up in Latin."',
        responses: {
          kind: ["Back him up completely", "Let him vent"],
          playful: ["Egg on the rant a little", "Ask for more details"],
          bold: ["Argue the other side", "Tell him to let it go"],
          neutral: ["Half-listen, say nothing", "Tune out the rant"],
        },
      },
      {
        line: "He's hidden the isekai novel under a stack of medical journals, badly, the spine sticking out.",
        approach: "Don't mention the book",
        greeting:
          '"...You didn\'t see anything. Not a word, or I revoke your visiting privileges."',
        responses: {
          kind: ["Smile to yourself, say nothing", "Keep his secret safe"],
          playful: [
            "Ask what counts as 'lowbrow'",
            "Quote the title back at him",
          ],
          bold: ["Call him out for hiding it", "Pull it out into the open"],
          neutral: ["Pretend you didn't see it", "Look away, say nothing"],
        },
      },
      {
        line: '"You should feel honored," he says, of something small and ordinary he just did for you.',
        approach: "Feel honored anyway",
        greeting:
          '"You walk in with zero notice, now I have to rearrange my schedule. Try to appreciate that."',
        responses: {
          kind: ["Tell him it means a lot", "Let yourself feel honored"],
          playful: ["Play along with the bit", "Demand a parade next time"],
          bold: ["Ask what he actually did", "Refuse the vague praise"],
          neutral: ["Accept it, ask nothing", "Nod and move on"],
        },
      },
    ],
    // warm/spark/close/bound below are migrated to full { line, approach,
    // greeting, responses } beats, same as new/known — even though none of
    // these four tiers are anywhere near DIALOGUE_POOL_TARGET_BY_TIER yet (5
    // lines each vs. targets of 18/27/38/46). Pairing doesn't wait on pool
    // growth; it's a separate axis.
    warm: [
      {
        line: "His cold demeanor cracks slightly: there's obsession in his eyes now, the drive to cure your curse is consuming him.",
        approach: "Notice the obsession",
        greeting:
          '"I do this for the future of humanity. And... fine. For you specifically. Don\'t repeat that."',
        responses: {
          kind: [
            "Let him fuss over your pulse",
            "Say it means something to you",
          ],
          playful: ["Repeat 'for you' back at him", "Ask him to say it again"],
          bold: ["Name the savior complex", "Tell him to slow down"],
          neutral: ["Stay professional about it", "Let him work, say nothing"],
        },
      },
      {
        line: "He has a new set of notes. Every page of them is about you.",
        approach: "Ask what he's working on",
        greeting:
          '"I\'ve read your file eleven times. Purely academic interest, obviously."',
        responses: {
          kind: ["Ask to see the notes", "Say you're flattered"],
          playful: ["Ask what page you're on", "Tease him about the notes"],
          bold: ["Demand to see the file", "Call the interest suspicious"],
          neutral: ["Don't name it", "Let it go unremarked"],
        },
      },
      {
        line: '"Where on earth have you been, worm?" he snaps. "Next time you take a leave of absence, you inform me in advance."',
        approach: "Sit down as told",
        greeting: '"You\'re late. Not that I was... never mind. Sit."',
        responses: {
          kind: ["Reassure him you're back", "Apologize, mean it"],
          playful: ["Show up late on purpose", "Blame the traffic, poorly"],
          bold: ["Say he was clearly waiting", "Call out the near-slip"],
          neutral: ["Sit in the lab quietly", "Take the seat, say nothing"],
        },
      },
      {
        line: "He shoves a bottle at you without a word. It's the good painkiller. He'd deny caring.",
        approach: "Take the offered bottle",
        greeting:
          "\"Take this. It's for the headache you've been pretending not to have.\"",
        responses: {
          kind: ["Take the painkiller", "Murmur that you're grateful"],
          playful: ["Ask if he's worried about you", "Ask how he even noticed"],
          bold: ["Call it what it is: caring", "Ask since when he cares"],
          neutral: ["Take it without a word", "Pocket it, say nothing"],
        },
      },
      {
        line: "He turns bright red mid-sentence and blames the lab lighting.",
        approach: "Ask what he was saying",
        greeting: '"You again? ...I suppose I don\'t mind."',
        responses: {
          kind: ["Let him recover quietly", "Give him a moment"],
          playful: ["Blame the lab lighting", "Ask what he was really saying"],
          bold: ["Match his volume", "Push him to finish the thought"],
          neutral: ["Say nothing, let him recover", "Wait it out, unbothered"],
        },
      },
    ],
    spark: [
      {
        line: "He takes your pulse for the fourth time today. It's fine. It's always fine.",
        approach: "Hold still",
        greeting:
          '"Hold still. I\'m... this is a medical assessment. Stop smiling."',
        responses: {
          kind: "Let it run its course",
          playful: "Call it clinical too",
          bold: "Ask what he's checking for",
          neutral: "Let it stay clinical",
        },
      },
      {
        line: "He's gone red to the tips of his ears and has not taken his hand back.",
        approach: "Don't move",
        greeting:
          '"Your proximity is affecting my concentration. Don\'t you dare move."',
        responses: {
          kind: "Be gentle about the blush",
          playful: "Take his pulse instead",
          bold: "Say what he won't",
          neutral: "Move away first",
        },
      },
      {
        line: '"Purely clinical," he mutters, with his hand still on your face.',
        approach: "Lean into his hand",
        greeting:
          "\"I've catalogued every symptom you have. This one's mine. Shut up.\"",
        responses: {
          kind: "Let him keep pretending",
          playful: "Ask what symptom this is",
          bold: "Call the excuse thin",
          neutral: "Let the silence hold",
        },
      },
      {
        line: "The insults have gone quiet. What replaced them is much harder for him.",
        approach: "Ask what changed",
        greeting:
          '"If you laugh I will never speak to you again. ...Fine. Laugh."',
        responses: {
          kind: "Let him know it's shared",
          playful: "Grin and let it show",
          bold: "Ask what replaced the insults",
          neutral: "Let it go unnamed",
        },
      },
      {
        line: "He leans in to examine something, and forgets to invent a reason.",
        approach: "Come here",
        greeting:
          '"I don\'t want anything from you. Except... no. Never mind. Come here."',
        responses: {
          kind: "Stay close, let him look",
          playful: "Ask what he's really examining",
          bold: "Close the distance yourself",
          neutral: "Let the quiet hold",
        },
      },
    ],
    close: [
      {
        line: '"I\'ll find your cure," he says with absolute conviction, "because I\'m the only one capable enough. And you\'re mine to save."',
        approach: "Insist you don't need saving",
        greeting: '"I will solve this. You don\'t get to give up before I do."',
        responses: {
          kind: "Say the next one won't fail",
          playful: "Ask if you get a discount",
          bold: "Say you're his to save",
          neutral: "Let him have the conviction",
        },
      },
      {
        line: "He's asleep at the bench over your file. He'd rather die than let you say so.",
        approach: "Wake him from the bench",
        greeting:
          '"Don\'t go worrying me like that. I have better things to do than panic over you."',
        responses: {
          kind: "Let him rest, no argument",
          playful: "Read his notes out loud",
          bold: "Take the file away from him",
          neutral: "Sit quietly in the lab",
        },
      },
      {
        line: '"Don\'t you dare thank me," he warns, ears scarlet. "I\'m not doing it for gratitude."',
        approach: "Ignore the warning",
        greeting:
          '"If anything happens to you I\'ll be extremely inconvenienced. Emotionally. Shut up."',
        responses: {
          kind: "Say the thanks he forbade",
          playful: "Fluster him on purpose",
          bold: "Refuse to take it back",
          neutral: "Let him deflect, say nothing",
        },
      },
      {
        line: "He's stopped flinching when you reach for your coat. He hadn't noticed he was doing it until it stopped.",
        approach: "Go to him",
        greeting:
          '"I always preserve the lives of my patients. I cannot make guarantees for any other parts of them, however. ...You, I keep whole."',
        responses: {
          kind: "Reach for his hand instead",
          playful: "Reach for his coat pointedly",
          bold: "Ask when he stopped flinching",
          neutral: "Let him pretend it's nothing",
        },
      },
      {
        line: "He grips your wrist a moment too long, checking a pulse he already knows is fine.",
        approach: "Let him take your pulse",
        greeting:
          '"I said sit down. Please. ...There. Was that so hard for either of us?"',
        responses: {
          kind: "Let him hold on longer",
          playful: "Ask how long he'll pretend",
          bold: "Match his intensity",
          neutral: "Let the moment stretch quietly",
        },
      },
    ],
    bound: [
      {
        line: "He is furious about how much he loves you and expresses it almost entirely with his hands.",
        approach: "Get over there",
        greeting:
          '"You belong to me. I won\'t hand you to another researcher..." He stops cold. "N-No. You\'ve misunderstood. I merely..."',
        responses: {
          kind: "Tell him he's allowed",
          playful: "Tease him about the hands",
          bold: "Ask what he's so furious about",
          neutral: "Let his hands do the talking",
        },
      },
      {
        line: '"Don\'t look at me like that," he snaps, already crossing the lab toward you.',
        approach: "Smile at him like that",
        greeting:
          '"Stop. You know exactly what that does to my concentration. ...Come here."',
        responses: {
          kind: "Let him cross the distance",
          playful: "Smile at him deliberately",
          bold: "Cross the lab first",
          neutral: "Hold his gaze, say nothing",
        },
      },
      {
        line: "He falls asleep on your chest mid-argument and would deny it under oath.",
        approach: "Let him rest against you",
        greeting:
          "\"You're impossible and I've stopped wanting you to be anything else.\"",
        responses: {
          kind: "Let him fall asleep on you",
          playful: "Argue on without him",
          bold: "Kiss him mid-argument",
          neutral: "Let him sleep",
        },
      },
      {
        line: "He kisses you like it's a problem he intends to solve thoroughly and repeatedly.",
        approach: "Stay the night",
        greeting:
          "\"Stay the night. The lab's cold. That's the reason. That's the only reason.\"",
        responses: {
          kind: "Melt into it quietly",
          playful: "Ask if he's solved it yet",
          bold: "Demand he show his work",
          neutral: "Let it happen, unhurried",
        },
      },
      {
        line: '"Stay," is all he says now, where he used to build a whole excuse around the word.',
        approach: "Just stay",
        greeting:
          '"I love you. There. I said it. Never bring it up again. ...Bring it up again."',
        responses: {
          kind: "Stay, no questions asked",
          playful: "Bring it up again",
          bold: "Beat him to the word",
          neutral: "Stay without a word",
        },
      },
    ],
  },
  // No top-level `approach` pool: every dialogue[tier] beat, at every tier,
  // now carries its own `approach` (see dialogue above) — the independent
  // pool this used to be is fully unreachable, so it's removed rather than
  // left as dead weight (see getFallbackApproachLabel's fallback chain for
  // what a beat without one would use instead: SHARED_APPROACH_WHEN, then
  // APPROACH_LABEL_FALLBACK).
  // The /call reveal lines for this character, keyed by the register in
  // WINNER_LINE_BUCKETS (constants/publicEncounters.js). Picked from at random
  // like the dialogue; {user} is the winner's mention and {name} their full
  // name, and the embed's winner line is the only place the reveal names
  // either of them. A register left out here falls back to the generic
  // WINNER_LINES pool.
  winnerLines: {
    new: [
      '"A test subject, wandering in of its own accord." **{name}** looks {user} over, delighted.',
      '{user} says the name, and **{name}** draws himself up. "You should feel honored to have some of my attention."',
      '"You know of me. Naturally." **{name}** informs {user} of this at considerable length.',
    ],
    warm: [
      '"Where on earth have you been, worm?" **{name}** demands of {user}, then looks annoyed at himself for asking.',
      "{user} calls out, and **{name}** drops his notes. He denies dropping them.",
      '**{name}** waves {user} over. "You\'re late. Not that I was waiting... N-never mind!"',
    ],
    spark: [
      '"Wh-Where did you come from!?" **{name}** knows exactly where {user} came from.',
      "{user} says the name, and **{name}** goes an interesting color.",
      "**{name}** re-arms the bravado twice on the way to {user}. Neither attempt survives.",
    ],
    close: [
      '"You belong to..." **{name}** stops. "...You\'ve misunderstood." {user} hasn\'t.',
      "**{name}** abandons whatever he was striding off to do, mid-stride, because {user} called his name.",
      "{user} calls, and **{name}** shouts for Jiro to cover the **{house}** ward. Jiro already was.",
    ],
    bound: [
      '"You are indispensable. To the research. And... and to me. Obviously to me." **{name}** announces it to {user} at volume, then urgently requires a distraction.',
      "**{name}** is furious about how hard it is to walk past {user}, and crosses to them anyway.",
      "{user} says the name, and the entire genius act falls off **{name}** at once.",
    ],
  },
};
