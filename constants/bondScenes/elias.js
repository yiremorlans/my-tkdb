// Elias's bond scenes, read as DIALOGUE.elias.bondScenes
// (constants/dialogue/elias.js imports this file).
//
// The level-up DMs (docs/bond-scene-dms.md). Elias deflects with courtesy the
// way other people put up a hand — the formality and self-effacement are the
// armor, and the arc is him letting the mask slip a little further each
// level. He answers every question about himself with a question about you,
// so the intimacy is measured in how often that stops working.
export default {
  acquaintance: {
    beats: [
      "**{firstName}**: Good evening. I hope this isn't strange, writing out of nowhere. There's something I've been meaning to say.",
      "You've passed me on campus {timesMet} times. Every time, you've said good evening to the man with the mop.\n\nMost people don't. They don't see the help, and usually I like it that way.",
      "You mentioned once you don't care for the east path after dark. I take a walk most evenings, nowhere in particular.\n\nOne path's as good as another to me, if you ever wanted the company.",
    ],
    faces: { 0: "default", 1: "close", 2: "smile" },
    choice: {
      prompt: "That's all of it. More than I meant to say tonight.",
      options: [
        {
          key: "kind",
          face: "blush",
          label: "Say he's worth knowing",
          style: 3,
          close:
            "Oh, that's kind of you. It isn't quite true, but I'd like it if you kept saying so.",
        },
        {
          key: "playful",
          face: "sweat",
          label: "Ask what took so long",
          style: 1,
          close:
            "I drafted a few versions in my head. This was the least embarrassing one.",
        },
        {
          key: "bold",
          face: "smile",
          label: "Ask what he used to be",
          style: 4,
          close:
            "What I used to be? I'll leave that to your imagination, for now.\n\nAsk me again when it's later and I'm too tired to mind.",
        },
      ],
    },
    keepsake: {
      emoji: "🍭",
      line: "A wrapped candy left on the step outside your door.",
    },
  },

  friend: {
    beats: [
      "**{firstName}**: Jo asked why a quick errand took me all afternoon.",
      "I told him the line at the shop was long. He gave me a look and let it slide. I didn't mention you.",
      "You led with {favResponse} the whole walk, and I lost track of the time.\n\nI kept that part to myself. It just felt like mine.",
    ],
    faces: { 0: "sweat", 1: "smile", 2: "close" },
    choice: {
      prompt: "So now you're in on it.",
      options: [
        {
          key: "kind",
          face: "smile",
          label: "Say you liked the walk",
          style: 3,
          close: "Oh, good. So did I.\n\nMaybe my next errand runs long too.",
        },
        {
          key: "playful",
          face: "sweat",
          label: "Offer to back up his story",
          style: 1,
          close:
            "Please don't. Jo can smell a rehearsed answer.\n\nMine was terrible. He knew.",
        },
        {
          key: "bold",
          face: "blush",
          label: "Say you'd have told Jo",
          style: 4,
          close:
            "Oh, I know you would. Let's not.\n\nI'd never hear the end of it…",
        },
      ],
    },
    keepsake: {
      emoji: "⏳",
      line: "An afternoon he told Jo was spent in line.",
    },
  },

  closeFriend: {
    beats: [
      "**{firstName}**: I hope I'm not bothering you. Did I leave a scarf with you, by any chance?",
      "It's the one my mother knit. I've had it longer than anything else I own… and I've only just noticed it's gone.",
      "*A pause.*\n\nI'm not sure I left it by accident. I've been a little careless since we met in {sinceMet}… I can't think why.\n\nIf it's with you, keep it a while. I like knowing where it is.",
    ],
    faces: { 0: "sweat", 1: "close", 2: "blush" },
    choice: {
      prompt: "…Did I guess right?",
      options: [
        {
          key: "kind",
          face: "smile",
          label: "Say you'll keep it safe",
          style: 3,
          close:
            "I know you will. That's why I left it where I did…",
        },
        {
          key: "playful",
          face: "full_smile",
          label: "Say it smells like peppermint",
          style: 1,
          close:
            "Oh, it would. Now you'll think of me every time you wear it.",
        },
        {
          key: "bold",
          face: "blush",
          label: "Say it looks better on you",
          style: 4,
          close: "I don't doubt it. Would you show me sometime?",
        },
      ],
    },
    keepsake: {
      emoji: "🧣",
      line: "A scarf he lost exactly where he meant to.",
    },
  },

  confidant: {
    beats: [
      "**{firstName}**: You asked me once what I used to be. I told you to ask again when it was later, and I was tired enough.\n\nIt's later. I'm tired enough.",
      "Captain of Dionysia. For a good while. It isn't a secret, exactly. It's simply something people have agreed to be tactful about, which is worse.\n\nI lost it. Not a scandal, nothing you could put in a report. I simply reached a point where I couldn't keep up, and I let it go on long enough that someone had to say so, out loud, in a room with other people in it.",
      "Jo took it over. He does it better than I ever did, and I mean that entirely.\n\nNow I run his errands. Now and then someone calls me Captain by accident, and the whole hall goes quiet for half a second while everyone decides not to look at me.\n\nI've never said any of this aloud before. A year ago I'd have made a joke of it instead.",
    ],
    faces: { 0: "close", 1: "serious", 2: "default" },
    choice: {
      prompt:
        "Please, don't be gentle about it. Gentle is all I get from the rest of the house…",
      options: [
        {
          key: "kind",
          face: "blush",
          label: "Say you'd have followed him",
          style: 3,
          close:
            "*There is a very long silence.*\n\nYou wouldn't have wanted to, *he says.* You'd have gotten a man who was already running out.\n\n*Then, quieter:* …Say it again anyway. I find I'd like to hear it a second time, and I'm not proud of that.",
        },
        {
          key: "playful",
          face: "smile",
          label: "Call him Captain on purpose",
          style: 1,
          close:
            "*The reply takes a while.*\n\nHehe. Bad kid. And I'm very fond of you.\n\n…Do it again sometime, where people can hear. I'd like to see what happens too.",
        },
        {
          key: "bold",
          face: "close",
          label: "Ask if he wants it back",
          style: 4,
          close:
            "No.\n\n*Then, after a pause:* That was too quick, wasn't it. Let me try again.\n\nNo. But I would like to be something again, one day. I hadn't let myself want that in about three years, until you started asking me questions.",
        },
      ],
    },
    keepsake: {
      emoji: "🗝️",
      line: "The door he said he'd open some time when it was later.",
    },
  },

  devoted: {
    beats: [
      "**{firstName}**: You're all right. I already know you are, I checked twice. This message is just for my own sake.",
      "There was an incident in the lower hall tonight, and I went at it, and… I was slow. Not disastrously so. Slow. There was a time it would have taken me twenty seconds. Tonight it took four minutes, and I felt every one of them.\n\nThat's the fear I don't say aloud. Not dying. Being the man who used to be able to.",
      "And here is what I actually meant to tell you, plainly, and then I'll go to bed.\n\nI went at it anyway. Didn't weigh it, didn't count the odds, didn't think about my knees. You were on the other side of that hall, and three years of being careful went straight out the window.\n\nI'd been treasuring the quiet. Dreading the day it ended. It seems I'd take it ending over having you on the far side of a bad hall.",
    ],
    faces: { 0: "close", 1: "sweat", 2: "serious" },
    choice: {
      prompt: "Tell me something true… It's been a long night.",
      options: [
        {
          key: "kind",
          face: "blush",
          label: "Tell him he wasn't slow",
          style: 3,
          close:
            "Now you're only being kind to me.\n\n…Be kind to me. Just tonight. I'll be sensible again in the morning, and you can go back to being honest.",
        },
        {
          key: "playful",
          face: "smile",
          label: "Say four minutes is a brag",
          style: 1,
          close:
            "Four minutes is *showing off.*\n\nI'm going to be repeating that to myself for a week, and I want you to know precisely what you've done.",
        },
        {
          key: "bold",
          face: "close",
          label: "Go down to the hall",
          style: 4,
          close:
            "*He's sitting on the bottom step with his hands shaking, which he would never in his life have let anyone see.*\n\n*He doesn't reach for a joke. He simply holds out a hand, and when you take it, he pulls you down onto the step beside him and leans his whole weight into you, and stays there a long while.*\n\n> Don't say anything.\n\n*he says quietly.*\n\n> Just sit here. That's all I want.",
        },
      ],
    },
    keepsake: {
      emoji: "🕰️",
      line: "Four minutes he'll be counting for a long time.",
    },
  },

  soulbound: {
    beats: [
      "**{firstName}**: I'm going to try to say this without any of my usual deflecting, which you'll find is harder than it sounds.",
      "{timesMet} times. Every one of them, you've said good evening to a man with a mop, and never once asked him to be anything grander.\n\nYou have no idea what that is, to someone who used to be grander. Or perhaps you do, and you've simply been kind enough never to say so.",
      "I've spent three years treasuring quiet days and dreading the end of them. That isn't peace. That's only fear with the lights turned low. I've known that for a while, and I've done nothing about it, because doing something about it would mean wanting something, and anyone who wants something can lose it.",
      "So. Here is me, wanting something.\n\nI love you. I have for a long while now, since before that night in the kitchen, if I'm honest, and I've been meaning to be honest about it for months.\n\nI'm not asking you to do anything about it. I'm just done choosing nothing over the risk of losing something. That's the whole of my message, and it took me four cups of coffee to get here.",
    ],
    faces: { 0: "sweat", 1: "smile", 2: "close", 3: "blush" },
    choice: {
      prompt: "Take your time. I have nothing but.",
      options: [
        {
          key: "answered",
          face: "full_smile_blush",
          label: "Say it back",
          style: 3,
          close:
            "*The reply is one word:* Kitchen.\n\n*The record is already playing when you arrive, the same one, and he's standing in the middle of the floor with his hands in his pockets, looking younger than he is.*\n\n> Come here.\n\n*he says, quiet and entirely without his usual carefulness. He gets both arms around you and holds on like a man who has been standing very still for a very long time, and has finally been told he can stop.*",
        },
        {
          key: "held",
          face: "smile",
          label: "Ask him to give you time",
          style: 2,
          close:
            "Of course. That's the right answer, and I mean that.\n\nIt took me a very long time to work up to one sentence. It would be a poor sort of man who handed it over and started a clock.\n\nThere will be candy on your sill Tuesday, same as always, and I'll still wish you good evening in the west corridor. None of it was ever a down payment on anything. It was only ever me, glad you were there.",
        },
      ],
    },
    keepsake: {
      emoji: "🍬",
      line: "The night he chose wanting something over keeping nothing.",
    },
  },
};
