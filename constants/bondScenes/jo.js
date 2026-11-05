// Jo's bond scenes, read as DIALOGUE.jo.bondScenes
// (constants/dialogue/jo.js imports this file).
//
// The level-up DMs (docs/bond-scene-dms.md). Jo runs a house of eccentrics and
// has never once been asked how he is; the arc is somebody finally asking and
// him not having an answer ready. He calls you "cutie" as a way of keeping the
// register light, and the top of the ladder is the first message where he
// doesn't do it.
export default {
  acquaintance: {
    beats: [
      "**{firstName}**: Is this an odd hour? I've stopped being able to tell.",
      "Quick thing, then I'll leave you be. You came through the hall Tuesday while I was dealing with three separate crises, and you didn't add a fourth. You took the clipboard out of my hand long enough for me to drink my coffee while it was still hot.\n\nThat's the whole compliment, cutie. {timesMet} times in this house and you're the first to hand me something instead of a problem. In Dionysia, that makes you rare.",
    ],
    faces: { 0: "default", 1: "smile" },
    choice: {
      prompt: "Anyway. How are you? And answer properly, I'll know.",
      options: [
        {
          key: "kind",
          face: "close",
          label: "Ask him back",
          style: 3,
          close:
            "Ha. Nice try.\n\n*A long pause, for someone whose whole job is having an answer ready.*\n\n...Tired. That's the honest one. Don't tell Mio, he'll build me something.",
        },
        {
          key: "playful",
          face: "blush",
          label: "Offer to be crisis four",
          style: 1,
          close:
            "Don't. The system doesn't have room for a fourth.\n\n...Though if it were you, I'd probably enjoy the day more. Forget I said that. Two hours' sleep talking.",
        },
        {
          key: "bold",
          face: "wink",
          label: "Say you'd need something",
          style: 4,
          close:
            "Oh, would you.\n\n*Real interest, the first thing in the whole message he hasn't managed.*\n\nAsk, then. I'd like to know what it does to me. I don't get many chances to find out.",
        },
      ],
    },
    keepsake: {
      emoji: "🎩",
      line: "One honest word from a man who always has an answer ready.",
    },
  },

  friend: {
    beats: [
      "**{firstName}**: Something's been bothering me and I've decided you're going to hear about it.",
      "I adapt. It's what I do. I read a room and I become the version of me that room needs, and I've been doing it so long I couldn't tell you where the seam is anymore. On stage, in the hall, with Shion, with the advisors. Different man...and woman, every time and all of them mine.\n\nYou come to me with {favResponse} no matter which one you're getting. Same every time. And it's started to feel like being addressed by name in a room where everyone else is calling me by a job.",
    ],
    faces: { 0: "serious", 1: "close" },
    choice: {
      prompt: "So what am I supposed to do with that, cutie?",
      options: [
        {
          key: "kind",
          face: "smile",
          label: "Say you'd like the real one",
          style: 3,
          close:
            "That's the trouble. I'd have to find him first.\n\n...I'll look. Give me a while. He's under a lot of paperwork.",
        },
        {
          key: "playful",
          face: "wink",
          label: "Ask which one you're getting",
          style: 1,
          close:
            "Honestly? The one who's had four hours' sleep and is being charming out of sheer muscle memory.\n\nWhich is not the good one. Come back Thursday, the Thursday one is much better company.",
        },
        {
          key: "bold",
          face: "surprise",
          label: "Tell him to stop adapting",
          style: 4,
          close:
            "*He doesn't answer for a long moment*\n\nNo one's told me to stop before. I've been told to rest, to take a night off. Never just stop.\n\nI don't know what that looks like yet. I'd like to find out.",
        },
      ],
    },
    keepsake: {
      emoji: "🪪",
      line: "The night somebody addressed him by name instead of by job.",
    },
  },

  closeFriend: {
    beats: [
      "**{firstName}**: Five thirty tomorrow. East gate. Don't ask why yet, just say yes.",
      "You know I jog every morning. I've told you to try it more than once. It's the only hour of the day nobody needs anything from me.",
      "Ever since we met in {sinceMet}, a good chunk of that hour has gone to thinking about you, which is terrible for my pace. So I figured I'd just bring you along.\n\nCall it training. I want an hour that isn't a job, or a mission, and doesn't end with either of us owing the other one a report.",
    ],
    faces: { 0: "smile", 1: "close", 2: "blush" },
    choice: {
      prompt: "Well? I already set two alarms, cutie. Say you'll join me.",
      options: [
        {
          key: "kind",
          face: "smile",
          label: "Say you'll be there",
          style: 3,
          close:
            "Good.\n\n...I wasn't going to admit to the two alarms, but there it is. I've already planned the route for two. I'll keep the pace easy.",
        },
        {
          key: "playful",
          face: "wink",
          label: "Ask if this counts as a date",
          style: 1,
          close:
            "Absolutely not. It's cardio with company.\n\n...Ask me again after the third morning. I might have a different answer by then.",
        },
        {
          key: "bold",
          face: "serious",
          label: "Say he should've asked sooner",
          style: 4,
          close:
            "You're right. I sat on it for a week deciding whether saying it out loud would ruin the whole exercise.\n\nThat's a week of mornings I ran alone for nothing. I won't make that mistake twice. And sleep early tonight. That one isn't a request.",
        },
      ],
    },
    keepsake: {
      emoji: "👟",
      line: "A five thirty text he sent instead of running alone with the thought of her.",
    },
  },

  confidant: {
    beats: [
      "**{firstName}**: Do you have a little time this afternoon? There's an outfit I want you to try on, deep green silk, for the show. I'll be waiting at the office.",
      "To save you the question, it can't be one of the storeroom artifacts. Those run one size for the whole cast and call it close enough. This one needs it exact, and I don't trust anyone else's hands near you for that part.\n\nWould you come alone? I'd rather it just be the two of us for this one.",
      "Also, if I'm honest...\n\nI've thought about {lastMoment} more than I've thought about the show this week. That's not a complaint. It's why I want this hour: nobody needing anything from me except you, standing still while I take my time with you. I don't intend to share a single minute of it.",
    ],
    faces: { 0: "smile", 1: "serious", 2: "blush" },
    choice: {
      prompt: "So? Office, three o'clock, if that works for you, cutie.",
      options: [
        {
          key: "kind",
          face: "smile",
          label: "Tell him you're coming",
          style: 3,
          close:
            "Good.\n\nYou're going to look good in it. I picked it out myself, so I'd know.",
        },
        {
          key: "playful",
          face: "wink",
          label: "Ask if you're the mannequin",
          style: 1,
          close:
            "Close enough. Stand still, hold that pose, and try not to look that good while I'm trying to concentrate. No one else here to blame it on.",
        },
        {
          key: "bold",
          face: "full_smile",
          label: "Ask for the whole afternoon",
          style: 4,
          close:
            "The whole afternoon.\n\n...Done. Mio can have the leadership meeting to himself, and neither of us has to pretend it's about the costume. Don't be late.",
        },
      ],
    },
    keepsake: {
      emoji: "🧵",
      line: "A fitting he could've finished in ten minutes, and didn't.",
    },
  },

  devoted: {
    beats: [
      "**{firstName}**: Remember the green silk? When I fitted you for it, I took one measurement that had nothing to do with the costume.",
      "Somewhere between the morning jogs together and that afternoon in my office, you stopped being someone I fit into my schedule, and I started wanting to clear whole days just to spend them with you. I didn't plan for you, cutie. I'm glad I couldn't.",
      "I'm done keeping you to the hours nobody's watching. I want {house} to know about us, and if anyone asks, I'll tell them myself.",
    ],
    faces: { 0: "wink", 1: "close", 2: "smile" },
    choice: {
      prompt:
        "Are you free tonight? I'd like to come see you.\n\nIf you'd like me to stay, you only have to ask.",
      options: [
        {
          key: "kind",
          face: "smile",
          label: "Ask him to stay the night",
          style: 3,
          close:
            "Heh. I was hoping you'd ask.\n\nI'm on my way. And I'm skipping the morning jog tomorrow. You can be the reason.",
        },
        {
          key: "playful",
          face: "full_smile",
          label: "Ask who he'll tell first",
          style: 1,
          close:
            "Whoever asks first. Knowing this house, that's everyone by breakfast.\n\nI'm heading over right away.",
        },
        {
          key: "bold",
          face: "blush",
          label: "Say you're his",
          style: 4,
          close:
            "...I'm already out the door. Say it again when I'm there. I'd like to hear it all night.",
        },
      ],
    },
    keepsake: {
      emoji: "💍",
      line: "A ring sized at a fitting he said was for the costume.",
    },
  },

  soulbound: {
    beats: [
      "**{firstName}**: No nickname tonight. I'd like you to notice that.",
      "It's past one. The house is finally asleep, the budget balances, and there's nothing left on my desk to hide behind.\n\nI used to like this hour. Work done, a jog, a set before bed, lights out, nobody needing anything. I was used to quiet nights. I told myself they were the reward.",
      "{timesMet} times with you, and I can't stand them anymore. I made hot milk for two again tonight, out of habit, and drank both. The other side of the bed has started to feel like a room I keep walking past.\n\nI lie here thinking about your hand with my ring on it, and how long I'd keep you if you were here. The answer keeps getting longer. That isn't something a captain should put in writing. I'm putting it in writing.",
      "So, plainly: I love you.\n\nNot the captain, not the Venus of Dionysia, not whichever version the room ordered. The man at one in the morning who's finished every task on the list and still can't sleep, because you're not in it.\n\nI want the quiet nights with you in them. All of them. Take this at whatever speed you like. I've made enough decisions for other people. This one's yours.",
    ],
    faces: { 0: "serious", 1: "close", 2: "blush", 3: "smile" },
    choice: {
      prompt:
        "I thought I was done with feelings like this. So then. How are you going to take responsibility?",
      options: [
        {
          key: "answered",
          face: "full_smile_blush",
          label: "Say it back",
          style: 3,
          close:
            "...Say it again. Slower.\n\nI'm coming to get you. Nobody crosses campus alone at this hour, not even to get to me. Grab a coat, and don't bother bringing a reason to leave early.\n\nThe milk can go cold. I've been careful with you for a year. I don't intend to be careful tonight.",
        },
        {
          key: "held",
          face: "close",
          label: "Ask him to give you time",
          style: 2,
          close:
            "Of course. Take it.\n\nJust don't manage me about it. If it's no, say no. I've had a lifetime of people handling me gently, and I'd rather have one person who doesn't.\n\nI'll still pour the second cup. That isn't pressure. It's just where I am at one in the morning now.",
        },
      ],
    },
    keepsake: {
      emoji: "🥛",
      line: "The second cup of hot milk, poured for her out of habit.",
    },
  },
};
