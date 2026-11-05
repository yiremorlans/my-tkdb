// Lucas's bond scenes, read as DIALOGUE.lucas.bondScenes
// (constants/dialogue/lucas.js imports this file).
//
// The level-up DMs (docs/bond-scene-dms.md). Lucas writes the way he speaks:
// warm, direct, contractions and plain British idiom, courteous without being
// stiff. He apologises lightly and moves on. The intimacy is him gradually
// dropping the good manners about how much he needs you, and the "out of
// sorts, like I'm not myself" thing under the courtesy edging closer each time.
export default {
  acquaintance: {
    beats: [
      "**{firstName}**: Evening! Lucas here. Kaito gave me your number, then made me promise to tell you he said hello first. So: Kaito says hello.",
      "About the east corridor today. I was on my way over to deal with those Frostheim third-years, and by the time I got there you'd already sorted it. Nobody raised their voice, and nobody was made a fool of.\n\nI'm usually the one stepping in. Watching you settle it like that was genuinely impressive.",
      "So here's my proposal. I train in the yard at six every morning. We've crossed paths {timesMet} times now, purely by chance.\n\nI keep a training log, and the partners column has been empty since Emrys. I'd like to put a name in it.",
    ],
    faces: { 0: "full_smile", 1: "surprise", 2: "default" },
    choice: {
      prompt: "Six sharp. I'll bring biscuits. Is that a yes?",
      options: [
        {
          key: "kind",
          face: "full_smile",
          label: "Say yes, you'll be there",
          style: 3,
          close:
            "Thank you. I'm very glad you said yes.\n\nMake sure you get a proper night's sleep first, all right? I'll see you at six. Good night!",
        },
        {
          key: "playful",
          face: "smile",
          label: "Call six in the morning cruel",
          style: 1,
          close:
            "It's a kindness, I promise. Emrys started at five.\n\nI'm usually there by ten to, and I'd be very surprised to find anyone there before me. Then again, you've already surprised me once today.",
        },
        {
          key: "bold",
          face: "smile",
          label: "Say you hope he keeps up",
          style: 4,
          close:
            "Then I'd better not fall behind on the first morning. That would be rather embarrassing.\n\nI'm glad, truly. A partner who pushes me is exactly what I've been missing.",
        },
      ],
    },
    keepsake: {
      emoji: "📓",
      line: "The first name in the partners column of his training log since Emrys.",
    },
  },

  friend: {
    beats: [
      "**{firstName}**: Urgent question, and I need a straight answer, because Kaito has stopped giving me those.",
      "Is a \"pajama party\" some sort of important event? He's been insisting for a week that we invite you to one. I can't tell if he's serious.",
      "You're the one I always ask. You answer me with {favResponse} every time, no matter how odd the question.\n\nEveryone else tells me that's simply how it's done here. You tell me why. You really are very kind. I'm lucky to count you as a friend.",
    ],
    faces: { 0: "serious", 1: "sweat", 2: "smile" },
    choice: {
      prompt: "So. Pajama party. Real, or is Kaito having me on?",
      options: [
        {
          key: "kind",
          face: "smile",
          label: "Say it's real, and you'll come",
          style: 3,
          close:
            "Right. Then I owe Kaito an apology. I'll tell him you're coming.\n\n*A minute later:* Kaito's replied with a whole row of crying emojis. I'm choosing to read that as happy.",
        },
        {
          key: "playful",
          face: "full_smile",
          label: "Say he's being had, completely",
          style: 1,
          close:
            "I knew it. I knew it the moment he mentioned a mandatory pillow fight.\n\nOf course I'm still going. He'd be crushed. Will you come and be had with me?",
        },
        {
          key: "bold",
          face: "smile",
          label: "Say you'll go if he does",
          style: 4,
          close:
            "Then we're both going. If it's a prank, at least I won't be the only one in pajamas.",
        },
      ],
    },
    keepsake: {
      emoji: "🌙",
      line: "The pajama party he wouldn't go to without asking you first.",
    },
  },

  closeFriend: {
    beats: [
      "**{firstName}**: I'm going to tell you something I haven't told anyone here, and I'm going to do it quickly, before the sense comes back to me.",
      "I have a brother. Had. No. Have. I won't use the other word, and I haven't used it since the day he disappeared.\n\nHis name is Nox. He's the reason I came here, and the reason I train past the point where it helps, and the reason I'm poor company after a mission. I've let everyone think it's duty. It isn't. It's a search, and it isn't going well.",
      "I shouldn't have put that on you. I've been told I'm hopeless at keeping things to myself, and there I've gone and proved it again.\n\nBut I didn't tell Jin, and I didn't tell Kaito, and I've had plenty of chances. I told you. I wanted you to know I noticed myself choosing.",
    ],
    faces: { 0: "sweat", 1: "serious", 2: "close" },
    choice: {
      prompt:
        "Tell me this hasn't changed how you see me. That's the only thing I want to hear tonight, and I'd rather hear it from you than from anyone.",
      options: [
        {
          key: "kind",
          face: "blush",
          label: "Tell him you think more",
          style: 3,
          close:
            "*He doesn't answer for a few minutes.*\n\nI'd braced for a few different responses, *he writes.* Not that one. I haven't got anything polite to put after it, which might be the truest thing I've written all night.",
        },
        {
          key: "playful",
          face: "smile",
          label: "Say he's a terrible liar",
          style: 1,
          close:
            "Catastrophic, *he agrees.* Tohma says I give myself away before I've finished the sentence.\n\nHe means it as a fault. I've decided to take it as a reason to keep company only with people I don't mind seeing through me. There's currently one.",
        },
        {
          key: "bold",
          face: "serious",
          label: "Ask to help him look",
          style: 4,
          close:
            "No. *It comes back straight away, and then, very slowly, undoes itself:*\n\n...I meant no because it's dangerous, and because I've already lost one person to being certain I could manage on my own.\n\nCome to the gymnasium tomorrow. I'll show you what I've got. I've never shown anyone what I've got.",
        },
      ],
    },
    keepsake: {
      emoji: "🖼️",
      line: "A photograph of two boys, one of them still missing.",
    },
  },

  confidant: {
    beats: [
      "*It arrives at an hour when he's normally training, which is a sort of message on its own.*\n\n**{firstName}**: I'm not well tonight. I don't mean ill. I mean the other thing.",
      "There's a version of me I keep at arm's length, and I don't always manage it. It came very close tonight, and I've been sat on the floor of my room since, waiting for it to settle back down.\n\nI've never written that to anyone. I've practised saying it out loud a few times and my voice won't do it.",
      "I'm not afraid of it hurting me. I'm afraid of what it would do with the fact that I love...\n\n*The message stops there. Another one comes straight after.*\n\nThat it would use what I care about. That's all I meant. I should stop writing at this hour.",
    ],
    faces: { 0: "serious", 1: "sweat", 2: "blush" },
    choice: {
      prompt:
        "If this is too much, tell me and I'll stop. I promise I won't hold it against you. Part of me is even hoping you will.",
      options: [
        {
          key: "kind",
          face: "smile",
          label: "Tell him to keep going",
          style: 3,
          close:
            "...All right.\n\n*He writes until nearly four, and none of it is polite, and he doesn't once say sorry for the length of it. At the end he writes:* I'm still on the floor. But I'm not on it alone, which turns out to be a difference you can make by text.",
        },
        {
          key: "playful",
          face: "blush",
          label: "Say he didn't finish that word",
          style: 1,
          close:
            "*A long silence.*\n\nI didn't, *he agrees.* I know you noticed. I'm relying on your discretion, and I'm well aware I'm the last person in this house with any right to ask for it.",
        },
        {
          key: "bold",
          face: "close",
          label: "Ask him to open the door",
          style: 4,
          close:
            "You shouldn't be in this corridor tonight.\n\n*The lock turns anyway. He's grey in the face and shaking, and he holds himself very straight in the doorway out of pure habit, and when you take his hand he shuts his eyes as though it hurts.*\n\n> Don't go,\n\n*he says, which he hasn't said to anyone since he lost his brother.*\n\n> I'm sorry. Don't go.",
        },
      ],
    },
    keepsake: {
      emoji: "🗝️",
      line: "The sound of a lock he has never once turned for anyone else.",
    },
  },

  devoted: {
    beats: [
      "**{firstName}**: You're unhurt. I've had it confirmed three times, through three different people, and I still couldn't stop myself writing to hear it once more from you.",
      "I wasn't there. That's the whole of it. There was something in the west wing and I was two floors away being useful to someone else, and I've been stood outside your door a while now without knocking, because it occurred to me I might not have the right to.",
      "I was always told that strength carries a duty. I've believed it since I was a boy, and I was rather proud of how well I carried the idea of it.\n\nIt's stopped being an idea. That's what I came to say. It has a name now, and the name is yours, and I don't know what to do with a duty that keeps me awake.",
    ],
    faces: { 0: "sweat", 1: "serious", 2: "blush" },
    choice: {
      prompt:
        "May I come in? I'll go if you say no, and I'll be completely all right about it.",
      options: [
        {
          key: "kind",
          face: "close",
          label: "Tell him to come in",
          style: 3,
          close:
            "*He comes in and doesn't sit down for a long while, and then he does, on the floor with his back against the side of your bed, the way people sit when they mean to stay.*\n\n> Can I stay until it's light,\n\n*he says.*\n\n> I won't be any trouble. I'd just like to hear you breathing.",
        },
        {
          key: "playful",
          face: "sweat",
          label: "Ask how long he's been there",
          style: 1,
          close:
            "...Forty minutes.\n\nFifty. I've been rehearsing. Every version was worse than just standing here, which I expect you could have told me for free.",
        },
        {
          key: "bold",
          face: "surprise_blush",
          label: "Open the door yourself",
          style: 4,
          close:
            "*You open it while he's still typing, and he actually startles, this boy who's never once been caught out by anything.*\n\n*He looks at you for a moment with all the courtesy gone out of him, and then he pulls you in and holds on far too hard, one hand at the back of your head, saying nothing at all.*",
        },
      ],
    },
    keepsake: {
      emoji: "🛏️",
      line: "The night he sat on the floor just to hear you breathing.",
    },
  },

  soulbound: {
    beats: [
      "**{firstName}**: I've written this out on paper first. I'm copying it across so I don't lose my nerve halfway and turn it into something safer.",
      "I came here to find my brother and to make myself into an instrument, in that order, and I was quite content with that. I hadn't planned on a third thing.\n\nThere's been a third thing since about the second time we met, and I've been calling it duty, and gratitude, and what you owe a friend, and every one of those was a lie I told myself very carefully.",
      "{timesMet} times. I know the number because I never stopped keeping the log. I only stopped calling it training.\n\nEvery page of it is you being kind to me with nothing in it for you, and me deciding not to look straight at what I felt, in case it made me useless.",
      "It hasn't made me useless. It's made me a great deal more careful about coming home.\n\nI love you. I've loved you longer than is decent, and I've been terribly well-mannered about it, and I'd like, very much, to stop pretending otherwise.\n\nThere. It's copied across. I didn't lose my nerve after all.",
    ],
    faces: { 0: "sweat", 1: "serious", 2: "close", 3: "blush" },
    choice: {
      prompt:
        "Whatever you answer, I'll be glad I wrote it. Please be honest. I couldn't bear kindness here.",
      options: [
        {
          key: "answered",
          face: "full_smile_blush",
          label: "Say it back",
          style: 3,
          close:
            "*There's no reply, and then there's a knock, not the careful one he's used every other time, but a proper knock, and him on the other side of it with the paper still in his hand.*\n\n> Say it where I can hear it,\n\n*he says.*\n\n> Please. I've imagined it, and I want to know how far off I was.\n\n*You tell him. He was, he says afterwards with his forehead against yours, nowhere near.*",
        },
        {
          key: "held",
          face: "smile",
          label: "Ask him to give you time",
          style: 2,
          close:
            "Of course. Of course, take it. I'm relieved, honestly. I've had to fight for every honest sentence I own, and it would be unfair to hand you this one and start a clock.\n\nI'll be exactly as I was. I'll walk you back from the east wing, and I'll be unbearable about whether you've eaten, and none of it was ever leverage.\n\n*And he is, and it never was, and he doesn't ask again, not once, until you do.*",
        },
      ],
    },
    keepsake: {
      emoji: "📄",
      line: "The sheet of paper he copied it from, folded twice.",
    },
  },
};
