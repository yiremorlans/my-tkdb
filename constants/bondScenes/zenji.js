// Zenji's bond scenes, read as DIALOGUE.zenji.bondScenes
// (constants/dialogue/zenji.js imports this file).
//
// The level-up DMs (docs/bond-scene-dms.md). Zenji is dead and can't so much
// as hold a phone, so every one of these is dictated to Haku, who types it
// out for him — established once (acquaintance), then referenced lightly.
// Haku isn't a random errand boy for this: per the reference files he's already
// Zenji's video-work manager, and his family's medium blood means he's one
// of the vanishingly few people who can see and hear Zenji clearly at all,
// which makes him the only real candidate. Once that's on the record, the
// words on screen are taken as Zenji's own: a message thread is still the
// one place he arrives at full strength, and he is delighted by that, and
// says so. The intimacy is the reverse of everyone else's: he is trying to
// be *perceived*, and each level is you seeing more of him than the last,
// until the last one, where he stops performing entirely.
export default {
  acquaintance: {
    beats: [
      "**{firstName}**: My dear! Forgive the intrusion, and forgive Haku, who agreed to manage my little video empire and finds himself my secretary too.\n\nHe is one of vanishingly few who can see me at all, bless the Kusanagi blood for it. But we have discovered something swanky between us: a message passed through a capable pair of hands carries my words at full volume, however thin the speaker.\n\nDo you know what that makes me, here of all places? Not a rumor. A correspondent!",
      "Zenji Kotodama, inspired man of the quill, at your service and in your pocket\n\n{timesMet} times I have watched you cross the Hotarubi courtyard, and each time you looked toward the music room. Not through it. *Toward* it. I have had a year to learn the difference.\n\nSo I thought: here is a person who might not mind hearing from a draft.",
    ],
    faces: { 0: "full_smile", 1: "smile" },
    choice: {
      prompt:
        "Speak, and be as unkind as you like; I am immune to most things, being already dead.",
      options: [
        {
          key: "kind",
          face: "close",
          label: "Say you were looking for him",
          style: 3,
          close:
            "...Ah.\n\nForgive me, my dear. I find I need a moment. That is the first time in a year anyone has been *looking*.",
        },
        {
          key: "playful",
          face: "sweat",
          label: "Say the ghost rumors are true",
          style: 1,
          close:
            "There ARE ghost rumors? In Hotarubi?\n\n...Ha ha. Let's not, my dear. I would really rather not think about that sort of thing right before bed.\n\nCan we speak of something else? Anything else. I insist.",
        },
        {
          key: "bold",
          face: "full_smile",
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
      "**{firstName}**: My dear! The Kotodama Advice Salon is taking its write-ins out into the field, and you have been selected. Congratulations.",
      "I confess an ulterior motive. The columnist has a letter of his own and nobody to send it to. Haku refuses to answer it. He says it is a conflict of interest.",
      "*Dear Salon,*\n\n*There is a person who goes off on missions and comes back in one piece, every time, and still I fret the whole while that they will get hurt. They have {favResponse} for me whenever we meet, which is more than a fella like me ever expected, and I should hate to lose it.*\n\n*How does one stop worrying?*\n\n*Signed, A Worrywart of Hotarubi*",
    ],
    faces: { 0: "full_smile", 1: "smile", 2: "sweat" },
    choice: {
      prompt:
        "There. The salon awaits your reply. Be gentle with the letter writer, my dear. I hear he is very sensitive.",
      options: [
        {
          key: "kind",
          face: "close",
          label: "Say you'll check in after",
          style: 3,
          close:
            "You will tell me when you're home safe? Every time?\n\nThen the salon has its answer, my dear. A worry never goes away. It simply needs a place to rest, and your word will do.",
        },
        {
          key: "playful",
          face: "surprise",
          label: "Answer as the columnist",
          style: 1,
          close:
            "*Dear Worrywart, the person in question is fine, she is having a lovely time, and she would like you to stop fretting immediately.*\n\n...My dear, you have stolen my column. Stolen it, and answered it better than I would have. I am outraged. I am also somewhat reassured.",
        },
        {
          key: "bold",
          face: "blush",
          label: "Tell him to come with you",
          style: 4,
          close:
            "Come along? Horsefeathers, I'd never sneak onto a mission.\n\nI was only on the last three.\n\n...Ah. Oh dear. Haku is laughing at me.\n\nA man who is everywhere but can be found nowhere, my dear. It is simply the nature of an inspired man of the quill. I only meant to keep an eye on you from a respectful distance.\n\n...But if I'm to be invited, I suppose I could be found somewhere. Right beside you would be swell.",
        },
      ],
    },
    keepsake: {
      emoji: "✉️",
      line: "A letter the salon's columnist finally got to send.",
    },
  },

  closeFriend: {
    beats: [
      "**{firstName}**: Come to the music room after dark, my dear. Bring nothing. I have something that requires an audience of precisely one.",
      "*The biwa lifts off its stand on its own, hangs a moment, and begins to play.*\n\n> You have heard the rumor, I expect. The haunted music room. The instrument that plays itself. That is this. That is the loudest I get to be.",
      "> Holding it takes a great deal out of me and I cannot keep it up for long, so I ration it. Twice a year, perhaps. Never with anyone in the room, so that nobody has to watch it give out.\n\n*The playing is unsteady, and somewhere under it is the sense of a voice.*\n\n> I have spent all of this year's on you. So that once, somebody was the audience for the whole of it, and knew who was playing.",
    ],
    faces: { 0: "smile", 1: "close", 2: "blush" },
    choice: {
      prompt:
        "Well? Say it quickly, my dear. The strings are already tiring.",
      options: [
        {
          key: "kind",
          face: "close",
          label: "Tell him what you picture",
          style: 3,
          close:
            "*You tell him what you have built of him from fragments: the side ponytail, the round glasses, ink worked into his fingers. The playing falters in the middle of a phrase.*\n\n> ...Almost exactly. Thank you. I had begun to lose the shape of my own face. One forgets that first, you know.\n\n*The music stops. The room goes still.*",
        },
        {
          key: "playful",
          face: "full_smile",
          label: "Say he dropped a note",
          style: 1,
          close:
            "> I did NOT...\n\n*A pause, and then a sound very much like laughing.*\n\n> I did, didn't I. Three of them. Nobody has been near enough to catch me at that since I died. My dear, that is the finest gift I have received since my funeral.",
        },
        {
          key: "bold",
          face: "surprise_blush",
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
    faces: { 0: "default", 1: "serious", 2: "close" },
    choice: {
      prompt:
        "Do not comfort me, my dear. Anything but that. Comfort would finish me off a second time.",
      options: [
        {
          key: "kind",
          face: "smile",
          label: "Say you'll listen instead",
          style: 3,
          close:
            "...Listen.\n\n*A long pause.*\n\nYes. All right. That I can bear.\n\n*He talks until four in the morning about a boy who used to follow him round a garden, and never once makes a metaphor of any of it. From Zenji Kotodama, that is the most naked thing there is.*",
        },
        {
          key: "playful",
          face: "blush",
          label: "Ask for the four hundred pages",
          style: 1,
          close:
            "They are dreadful.\n\nThey are *magnificent* and they are dreadful, both at once, which is the natural condition of all great work.\n\n...You may read them. Nobody has read them. Do not tell me which parts you laughed at.",
        },
        {
          key: "bold",
          face: "sweat",
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
    faces: { 0: "serious", 1: "sweat", 2: "close" },
    choice: {
      prompt:
        "Now scold me. I should very much like to be scolded by someone who noticed.",
      options: [
        {
          key: "kind",
          face: "blush",
          label: "Tell him it was enough",
          style: 3,
          close:
            "It was not enough. It was a poet standing in a doorway.\n\n*A pause.*\n\nBut you said it was, and I find I am going to believe you rather than the arithmetic, which is the first unreasonable thing I have done since I died.",
        },
        {
          key: "playful",
          face: "smile",
          label: "Ask if he wrote it up",
          style: 1,
          close:
            "I did not.\n\nI did not write a word of it, my dear, and I write everything. I simply stood there. Make of that what you will. I have been making rather a lot of it myself.",
        },
        {
          key: "bold",
          face: "close",
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
    faces: { 0: "sweat", 1: "smile", 2: "close", 3: "blush" },
    choice: {
      prompt:
        "Answer as you like, my dear. I have already had the impossible part: being asked a question back.",
      options: [
        {
          key: "answered",
          face: "full_smile_blush",
          label: "Say it back",
          style: 3,
          close:
            "*The biwa starts before you have finished. He is spending it, all of it, everything he had put by.*\n\n*In the doorway of the music room the air goes cold and close, and something that is almost hands cups your face, and he is crying without the least dignity.*\n\n> I had an ending after all. Four hundred pages, and it was never going to be on any of them.",
        },
        {
          key: "held",
          face: "smile",
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
};
