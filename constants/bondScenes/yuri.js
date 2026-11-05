// Yuri's bond scenes, read as DIALOGUE.yuri.bondScenes
// (constants/dialogue/yuri.js imports this file).
//
// The level-up DMs (docs/bond-scene-dms.md). One of the six volatile
// characters — see docs/negative-affinity-enemies-to-lovers.md. Yuri never
// stops declaiming; the bravado is the load-bearing wall and it does not come
// down, it only develops cracks. "Specimen" and "worm" belong to the early
// levels, where they are simply how he addresses anyone he has not decided
// about yet; they thin out of their own accord once the cracks start, and he
// never announces that they have. He does not stammer here — that tic lives
// in the encounter lines, where there is room for it.
export default {
  acquaintance: {
    beats: [
      "**{firstName}**: SPECIMEN. You'll attend to this message immediately. It comes from the genius and visionary Dr. Yuri Isami, and is therefore of considerable historical importance.",
      "You've entered my facility {timesMet} times and walked out on your own feet every occasion. Do you understand the significance!? No. Of course you don't.\n\nEvery other student treats Mortkranken as a place one is carried into. You walk in. Unprompted. Repeatedly.\n\nIt's either bravery or a diagnosable condition, worm, and as your physician I intend to establish which.",
    ],
    faces: { 0: "smile", 1: "annoyed" },
    choice: {
      prompt: "Well!? Answer! I haven't got all night. I am a very busy man.",
      options: [
        {
          key: "kind",
          face: "full_smile",
          label: "Say the facility's impressive",
          style: 3,
          close:
            "It... yes. YES. It is. Thank you. Finally, an eye that sees.\n\n*A pause.*\n\n...You're the first person to say so without being sedated. I shall be recording the date.",
        },
        {
          key: "playful",
          face: "sweat",
          label: "Ask for the diagnosis",
          style: 1,
          close:
            "Inconclusive! Which never happens! I am NEVER inconclusive!\n\nI shall require further visits to establish a baseline. Many further visits. It's a clinical necessity and not, as Jiro suggested, anything else.",
        },
        {
          key: "bold",
          face: "surprise_blush",
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
      "EVERY patient under my care is required to inform me of any absence! Treatment schedules depend on it. Vitals depend on it. I'm the physician assigned to your case, worm, and I was left to work out your whereabouts by inference, like some common detective!\n\nI want to be perfectly clear that I was NOT worried! And do not think you can smooth this over with {favResponse}, as you always do! It has no bearing on the matter!",
      "This is a professional matter, and it is not up for debate. You will report to my lab immediately so I can examine you myself.",
    ],
    faces: { 0: "annoyed", 1: "sweat", 2: "serious" },
    choice: {
      prompt:
        "Have you nothing to say for yourself!? Next time, you inform me in advance. Is that understood!?",
      options: [
        {
          key: "kind",
          face: "close",
          label: "Apologize for not telling him",
          style: 3,
          close:
            "Hmph. As well you should.\n\n*A pause.*\n\nYou're back, and in one piece, which is... adequate. Don't do it again, worm.",
        },
        {
          key: "playful",
          face: "blush",
          label: "Ask if he missed you",
          style: 1,
          close:
            "Missed you!? Missing is not a clinical metric! I noted a DISCREPANCY! Professionally!\n\n...I drafted a contingency protocol for your absence. Any competent physician would have done the same!",
        },
        {
          key: "bold",
          face: "annoyed",
          label: "Tell him to come and get you",
          style: 4,
          close:
            "Come and GET you!? I am the captain of Mortkranken! I do not come running when a patient calls!\n\nI shall send Jiro. And you WILL come, because I have already cleared my afternoon schedule!",
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
      "**{firstName}**: Jiro informs me he told you that he protects me because nobody else could treat him if I died.",
      "He's right, of course. Jiro protects me, and I keep him alive. Neither of us has ever needed to make a speech about it.",
      "Your case is no different. It's been mine since we met in {sinceMet}, and I'll say this once: nobody else can cure you. Not Frostheim, and not any resource Darkwick General has to offer. It takes a mind like mine.\n\nSo you'll keep your appointments and you'll stay put. Losing you would go down as a failure on my record, and I don't intend to have one! That is the only reason.",
    ],
    faces: { 0: "default", 1: "close", 2: "serious" },
    choice: {
      prompt: "That's my prognosis. You may respond.",
      options: [
        {
          key: "kind",
          face: "smile",
          label: "Say you're glad it's him",
          style: 3,
          close:
            "Glad. Of course you're glad. There is no better physician in this academy.\n\n...I'll take that as consent to continue treatment. Indefinitely.",
        },
        {
          key: "playful",
          face: "annoyed",
          label: "Ask for a second opinion",
          style: 1,
          close:
            "A second opinion!? From WHOM!? I have just finished explaining that there is nobody else!\n\nThere's my opinion, and there's being wrong. Those are your options.",
        },
        {
          key: "bold",
          face: "blush",
          label: "Ask if that's the only reason",
          style: 4,
          close:
            "Obviously it is! A physician's reasons are ALWAYS clinical! What other reason could there possibly be!?\n\n...Don't answer that.",
        },
      ],
    },
    keepsake: {
      emoji: "💉",
      line: "The second patient he refuses to hand to anyone else.",
    },
  },

  confidant: {
    beats: [
      "**{firstName}**: I've put my work down to write this, so you'll read it properly. All of it.",
      "Your file hasn't left my desk all week. I've stopped putting it away. There's no point.",
      "I have the finest mind at this academy, and yet there's a shelf of failed protocols with your name on every one. Today I couldn't make myself start the next.\n\nI've spent more of today on {lastMoment} than on your file, which is a gross misallocation of a genius's time. The fix is obvious. You come here, I examine you in person, and then I have no reason to keep going over it. Tomorrow. After your lessons.",
    ],
    faces: { 0: "serious", 1: "close", 2: "sweat" },
    choice: {
      prompt:
        "It's routine. I'm only asking because I miss... I'm missing data! I need more data.",
      options: [
        {
          key: "kind",
          face: "close",
          label: "Say he can run every test",
          style: 3,
          close:
            "Then you know it matters. Good. I was starting to think I was the only one keeping count.",
        },
        {
          key: "playful",
          face: "blush",
          label: "Ask what he misses",
          style: 1,
          close:
            "DATA! I said data! I've drafted a whole protocol for it! It's two pages!\n\n...Stop interrogating your physician. I expect you here tomorrow.",
        },
        {
          key: "bold",
          face: "surprise_blush",
          label: "Ask if you'll have to undress",
          style: 4,
          close:
            "OBVIOUSLY you'll wear a gown! These are MEDICAL tests! What did you think this was!?\n\n...That was rhetorical.",
        },
      ],
    },
    keepsake: {
      emoji: "🗂️",
      line: "The day he set your file aside and sent for you instead.",
    },
  },

  devoted: {
    beats: [
      "**{firstName}**: Jiro informs me that all of {house} heard what I said in the corridor earlier, and asked whether I'd meant them to. Of course I did. I said it at my usual volume, and I meant every word to carry.",
      "People keep asking why you're always in my facility. For months I've told them they'd misunderstood. A stubborn case. Routine follow-up.\n\nThis time I told them the truth. You aren't my patient. You're mine. Anyone with an objection may bring it to me directly.",
      "I've tried to explain away what I feel for you. Gratitude. Habit. Professional interest. I ruled out every one. What's left is you, and I'm through pretending otherwise!",
    ],
    faces: { 0: "smile", 1: "serious", 2: "blush" },
    choice: {
      prompt:
        "Which means I'm done inventing reasons to get you here. Come and stay the night. I might even sleep, for once.",
      options: [
        {
          key: "kind",
          face: "close",
          label: "Say you'll make sure he sleeps",
          style: 3,
          close:
            "You're the only person who's ever told me to rest and meant it for my sake.\n\nSo yes. Stay the whole night. I'd like to wake up and find you still there.",
        },
        {
          key: "playful",
          face: "blush",
          label: "Ask which side he sleeps on",
          style: 1,
          close:
            "Which SIDE!? How should I know! Most nights I wake up face-down on my notes.\n\n...Fine. The left. Stop asking questions and come over.",
        },
        {
          key: "bold",
          face: "surprise_blush",
          label: "Say he's not getting any sleep",
          style: 4,
          close:
            "That is a direct contradiction of everything I just said!\n\n...I'm noting your noncompliance. In detail. Come over and I'll decide what to do about it.",
        },
      ],
    },
    keepsake: {
      emoji: "💍",
      line: "A ring to match the confession all of Mortkranken already heard.",
    },
  },

  soulbound: {
    beats: [
      "**{firstName}**: I'm going to do this properly, which for me means without an audience, without a title, and, this is the difficult one, without shouting.",
      "{timesMet} times. I have the figure. I've had the figure since it was in single digits and I've never once needed to check it.\n\nYou walked into a building people are carried into, over and over, for no reason that survives examination. I've examined it. I've examined it at three in the morning on many occasions.",
      "I've called myself a genius since I was seventeen years old. It isn't modesty I lack: it's that if I stop saying it for one minute I'm a man who lost his laboratory in a fire and has been shouting to cover the sound of it ever since.\n\nYou've never once required me to shout. That is the thing. In my entire life, one person, and it was you, and I didn't deserve it and accepted it anyway because I'm greedy and always have been.",
      "So.\n\nI love you. There. Said at conversational volume, which cost me more than the fire did.\n\nI'm not going to dress it up. I have no experiment to hide it behind and no diagnosis to file it under. I love you, Yuri Isami loves you, and it's the only claim I've ever made that I have absolutely no evidence for and complete confidence in.",
    ],
    faces: { 0: "sweat", 1: "close", 2: "serious", 3: "blush" },
    choice: {
      prompt:
        "Answer. Or don't. I shall be magnificent about it either way. I shall be *devastated* and magnificent.",
      options: [
        {
          key: "answered",
          face: "surprise_blush",
          label: "Say it back",
          style: 3,
          close:
            "*There is a crash, some distance away, that is probably a tray.*\n\nDo NOT move. Don't... stay exactly where you are, I'm coming, I'm... JIRO, WHERE ARE MY... no. No, I don't need them. I don't need anything.\n\n*He arrives without his coat, which has never happened, and stops in the doorway looking utterly undone, and then crosses the room and holds onto you and says your name three times as though checking it still works.*",
        },
        {
          key: "held",
          face: "smile",
          label: "Ask him to give you time",
          style: 2,
          close:
            "Very well. Very well! Take as long as you require. I'm a scientist, I'm *made* of patience, I once waited seven weeks for a culture.\n\n*A pause. Then, without the flourish:*\n\n...That was bravado. You'll have spotted it. Take the time anyway. I mean it, and I won't raise it again, and you'll find me exactly where I always am, being insufferable at Jiro.\n\nAnd you may still walk in. That was never conditional on anything. It's always simply been the best part of my week.",
        },
      ],
    },
    keepsake: {
      emoji: "📔",
      line: "A declaration made at conversational volume.",
    },
  },
};
