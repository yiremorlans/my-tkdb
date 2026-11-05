// Subaru's bond scenes, read as DIALOGUE.subaru.bondScenes
// (constants/dialogue/subaru.js imports this file).
//
// The level-up DMs (docs/bond-scene-dms.md). Per reference/subaru.md, Subaru is
// reflexively accommodating and apologizes when he thinks he's overstepped —
// that's one situational tic among several (see his canon voice lines), not
// the engine of the scene. The real throughline is his stigma: he reads the
// thoughts left on anything he touches, and an object that belonged to someone
// lets him recall that person's own memories and feelings. He's ashamed of it
// — it means reading what people never meant to share — so the romance runs on
// the inverse: MC deliberately handing him her own things, letting him in,
// wanting him to know. Each tier turns that involuntary, shameful ability a
// little more into something given freely, which is what makes the physical
// intimacy at the top of the ladder cost him something and what makes him
// reach for it anyway.
export default {
  acquaintance: {
    beats: [
      "**{firstName}**: Hello Honor Roll, is now an alright time?",
      "You've helped Hotarubi more times than most people would ever bother counting. {timesMet}, by my count, and I don't say that enough.\n\nHaku and I keep a pot of tea going most evenings, nothing formal, and I've wanted to ask you to join us for longer than I'll admit. I just kept finding a reason it wasn't quite the right moment. I know you're busy, and you don't owe us the visit just because you've done so much for the house already. I only wanted you to know I'd like it very much, if you said yes.",
    ],
    faces: { 0: "default", 1: "sweat" },
    choice: {
      prompt:
        "Please don't feel you have to say yes on our account. I mean that.",
      options: [
        {
          key: "kind",
          face: "smile",
          label: "Tell him you'd love to come",
          style: 3,
          close:
            "*A short pause*\n\nThank you. I know I said you didn't have to, but I'm glad you want to. I'll tell Haku, he'll be pleased to have you at the table properly, for once. I'll get the good cups out.",
        },
        {
          key: "playful",
          face: "sweat",
          label: "Tease him for the long delay",
          style: 1,
          close:
            "Ha ha, I suppose I earned that. In my defense, I rewrote the first line alone six times.\n\nCome anyway. I promise the company is better than the drafting.",
        },
        {
          key: "bold",
          face: "surprise_blush",
          label: "Tell him you'd been waiting",
          style: 4,
          close:
            "*A pause before he replies, longer than the last.*\n\nYou were waiting? All this time I was so certain I'd be a bother, and you were only waiting for me to catch up.\n\nCome tonight, then. I promise, I won't leave you waiting again.",
        },
      ],
    },
    keepsake: {
      emoji: "🫖",
      line: "An invitation it took him weeks to work up the nerve to send.",
    },
  },

  friend: {
    beats: [
      "**{firstName}**: I hope this isn't a bother. I haven't seen you around Hotarubi for a few days, and I only wanted to check in.",
      "I went back over everything I said the last time. People have always said my manner is a little peculiar. I've been on a stage since I was four, so maybe that's why. I worried it bothered you too.\n\nThen I remembered you've answered me with {favResponse} every time I've ever asked you anything, and I felt a bit silly.",
      "The tea room has been very quiet. I keep setting out one cup too many.",
    ],
    faces: { 0: "default", 1: "sweat", 2: "close" },
    choice: {
      prompt: "I'm worrying over nothing, aren't I?",
      options: [
        {
          key: "kind",
          face: "smile",
          label: "Say it wasn't anything he did",
          style: 3,
          close:
            "Oh... Thank you. I'd talked myself into all sorts of things.\n\nIt's good to hear from you. Truly. There's always a place for you at Hotarubi.",
        },
        {
          key: "playful",
          face: "blush",
          label: "Ask if Haku noticed",
          style: 1,
          close:
            "Haha... Haku notices everything. I'd hoped I was being less obvious.",
        },
        {
          key: "bold",
          face: "surprise_blush",
          label: "Say you missed him too",
          style: 4,
          close:
            "Oh... You did?\n\nThen I'm glad it wasn't only me. Come by soon, if you can. I'd like that very much.",
        },
      ],
    },
    keepsake: {
      emoji: "☕",
      line: "The extra cup he kept setting out while you were gone.",
    },
  },

  closeFriend: {
    beats: [
      "**{firstName}**: Are you awake? There's something in the Hotarubi tea room I'd like you to see, tonight. It's the anniversary, and I don't think I can do it alone this year.",
      "*The room is dark. A fan, a comb, and a folded haori are laid out on the low table with a precision that is clearly ritual.*\n\n> These are from the first role I ever danced. I was four. Once a year I hold them and read what's left on them, and it's the only time I've been glad of this stigma.",
      "> I've never brought anyone. I thought it would spoil it. It hasn't.\n\n*He holds the fan out, hesitates, then puts it in your hands anyway.*\n\n> Now there'll be some of you on it, and next year I'll read that too. I've made you part of a very old thing without asking. I'm not sorry.",
    ],
    faces: { 0: "serious", 1: "close", 2: "sweat" },
    choice: {
      prompt: "...Say something. My hands are shaking a bit.",
      options: [
        {
          key: "kind",
          face: "full_smile_blush",
          label: "Ask about the first dance",
          style: 3,
          close:
            "*He tells you, then shows you: three steps of it in the dark in his socks, stopping halfway, embarrassed and lit up at once.*\n\n> I haven't done that in two years,\n\n*he says.*\n\n> Not for anyone. Not even myself.",
        },
        {
          key: "playful",
          face: "blush",
          label: "Ask what the fan says now",
          style: 1,
          close:
            "*He goes very red.*\n\n> I'm not telling you.\n\n> It's warm. That's all you're getting, and I'll be thinking about it for a year.",
        },
        {
          key: "bold",
          face: "close",
          label: "Take his hand instead",
          style: 4,
          close:
            "*He freezes, the one thing he never lets happen: skin on skin, no glove, nothing between.*\n\n*He doesn't pull away. He closes his eyes, stands very still, and after a long moment says, unsteadily:*\n\n> There's nothing frightening in you at all. I've been so afraid there would be.",
        },
      ],
    },
    keepsake: {
      emoji: "🎴",
      line: "A fan that will carry the memory of your hands for a year.",
    },
  },

  confidant: {
    beats: [
      "**{firstName}**: I know it's late. I've started this message six times and deleted it. The seventh is sending whether I'm ready or not.",
      "They ask when I'm going back to the stage. Every letter, every visit. The hiatus is \"temporary\", and it's been three years of temporary.\n\nThe truth is I stopped being able to do it. A stage is a hundred years of other people's hands on every rope and rail and prop, and it all comes through the moment I touch anything. Somewhere along the way I lost the knack of shutting it out.",
      "So I'm here instead, a kabuki actor who doesn't act, filling the days with the house and other people's errands. Good at making everyone else comfortable, bad at doing it for myself.\n\nI've told nobody. Haku suspects. Zenji would understand, and I can't bear the thought of him being gentle about it.\n\nYou get it because you're the one person I don't have to be anything in front of. That's not a small thing to hand someone. Be careful with it.",
    ],
    faces: { 0: "sweat", 1: "close", 2: "serious" },
    choice: {
      prompt:
        "Now. Say something before I talk myself out of having sent it.",
      options: [
        {
          key: "kind",
          face: "close",
          label: "Tell him he's allowed to stop",
          style: 3,
          close:
            "*There's no reply for a long time.*\n\nNobody has ever said that to me, *he writes finally.* Not once. Everyone's always been so *encouraging*.\n\nI think I'm going to cry, and I'd rather do it here than anywhere with people in it. Stay a minute?\n\n*You stay all night.*",
        },
        {
          key: "playful",
          face: "smile",
          label: "Ask if Haku wrote this",
          style: 1,
          close:
            "Absolutely not, this is all me, and now I'm a little offended.\n\n...Though he did talk me out of three endings. He's very patient with me.",
        },
        {
          key: "bold",
          face: "surprise",
          label: "Offer to go with him",
          style: 4,
          close:
            "To a *theater*?\n\n*A long pause.*\n\n...If you were holding the other end of my sleeve, I might manage the door. Not the stage. The door.\n\nThat's more than I've had in three years. Ask me again in spring, and don't let me talk you out of it. I'll try.",
        },
      ],
    },
    keepsake: {
      emoji: "🎭",
      line: "The reason for a three-year hiatus, told to exactly one person.",
    },
  },

  devoted: {
    beats: [
      "**{firstName}**: You left your scarf in the common room. I picked it up without thinking, and... well.",
      "I read it. Not on purpose, it doesn't ask me first.\n\nThere was a great deal of me on it. More than I expected. You've been thinking about me at times when there was no reason to.",
      "I should have put it down. I held it for nearly an hour instead, in an empty room, like a thief.\n\nI've spent my whole life reading what people never meant to tell me and being ashamed of it. This is the first time I haven't been ashamed, and that frightens me more than the reading ever did.",
    ],
    faces: { 0: "sweat", 1: "blush", 2: "serious" },
    choice: {
      prompt: "So. Am I forgiven, or ought I to be?",
      options: [
        {
          key: "kind",
          face: "blush",
          label: "Tell him you don't mind",
          style: 3,
          close:
            "You should mind. Everyone minds.\n\n...I'm keeping it until tomorrow, then. Just tonight. Don't ask me why.",
        },
        {
          key: "playful",
          face: "smile",
          label: "Ask what else it told him",
          style: 1,
          close:
            "Absolutely not.\n\n...It told me you were cold. Which I'd have known by looking at you, so the stigma was no help at all and I've been dramatic for nothing.",
        },
        {
          key: "bold",
          face: "close",
          label: "Tell him he read it right",
          style: 4,
          close:
            "*The typing indicator starts and stops for nearly five minutes.*\n\n*Then he's at your door with the scarf in both hands. He doesn't hand it over, he puts it round your neck himself, and doesn't step back after.*\n\n> I read it right,\n\n*he says, barely a whisper.*\n\n> I've never wanted to be right about something so badly.",
        },
      ],
    },
    keepsake: {
      emoji: "🧶",
      line: "A scarf he held for an hour in an empty room.",
    },
  },

  soulbound: {
    beats: [
      "**{firstName}**: I've rehearsed this more than anything I ever rehearsed for the stage, which, given my history, is saying a great deal.",
      "{timesMet} times. I've read every doorframe you've touched in this house, and never once found a bad thought about me. I looked. I want you to know I looked, because it's the least generous thing I've done and you deserve to know it.",
      "I was raised to be watched. Thousands of people, and none of them could see me at all. That's rather the point of the paint.\n\nYou've never seen the paint. Only the boy who fusses and reads doorframes and can't go near a theater, and you keep coming back to *that*. That has never once happened to me.",
      "I love you.\n\nI've kept that on a shelf a long time, telling myself it was improper, or unfair to you, or a burden. Every one of those was a way of not saying it.\n\nSo it's said. Badly rehearsed and entirely honest, and the only thing in this message I'm sure of.",
    ],
    faces: { 0: "sweat", 1: "serious", 2: "close", 3: "blush" },
    choice: {
      prompt:
        "Take all the time you want. I've been patient for three years about far less important things.",
      options: [
        {
          key: "answered",
          face: "full_smile_blush",
          label: "Say it back",
          style: 3,
          close:
            "*The reply is just:* Come to the tea room.\n\n*He's standing in the dark with the lights off, and when you take his hands he lets you, both of them, bare: everything you've ever thought about him arriving at once, nothing held back.*\n\n*He makes a small sound and puts his forehead to yours.*\n\n> Oh. You've been saying it all along, haven't you. I just couldn't read it until you let me.",
        },
        {
          key: "held",
          face: "smile",
          label: "Ask him to give you time",
          style: 2,
          close:
            "Of course. Truly, of course.\n\nI've spent three years being asked when I'm going back to something I'm not ready for. I'd be the last to put a clock on you.\n\nNothing changes. I'll be in the tea room on Thursdays, making far too much of it. I shan't mention this again unless you do, so you can come and sit with me without a question in the room.\n\n*And he doesn't. Not once. But the fan stays out on the table where it can read your hands, all year.*",
        },
      ],
    },
    keepsake: {
      emoji: "📃",
      line: "The one message he never once rehearsed.",
    },
  },
};
