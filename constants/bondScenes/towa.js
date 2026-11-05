// Towa's bond scenes, read as DIALOGUE.towa.bondScenes
// (constants/dialogue/towa.js imports this file).
//
// The level-up DMs (docs/bond-scene-dms.md). Towa can't speak in daylight,
// so every one of these lands after dark — which makes the DM the natural home
// for him in a way it isn't for anyone else. He hums, he eats flowers, he is
// casually morbid about things nobody else would be casual about, and the
// possessiveness is real and never played for a laugh. The intimacy is that he
// keeps asking permission for things he could simply take.
//
// Texting voice, per reference/towa.md's "Texting style" notes: Towa leans on
// stickers and one or two emojis and keeps his typed lines short. The
// night-verbose conceit (his confidant beat: "At night I could say anything")
// stays, so the prose survives — but his typed messages carry emoji/stickers
// and the phrasing is trimmed. Not in the `> ` lines he says out loud.
export default {
  acquaintance: {
    // He barely types. Stickers do most of his talking, and a beat or close
    // that carries one is the sticker alone, with empty text (validateContent
    // allows that only when a sticker is attached). His name leads the first
    // beat he types, so it's clear who's texting. What he does type is a
    // few short, bright words at a time. Being mute by day is about
    // speaking, not texting, so the hour is never his reason to write.
    beats: [
      "",
      "**{firstName}**: You keep coming back 🌼\n\nMost things don't. I like that you do!",
      "{timesMet} times. I count the days in between\n\nMost was five. Bad five\n\nCome more, Dandelion. Every day!",
    ],
    faces: { 0: "smile", 1: "full_smile", 2: "annoyed" },
    stickers: { 0: "Hi.png" },
    choice: {
      prompt:
        "Haru's always around doing his rounds\n\nI want you around too",
      options: [
        {
          key: "kind",
          face: "full_smile",
          label: "Say you'll come more often",
          style: 3,
          close: "",
          sticker: "Happy.png",
        },
        {
          key: "playful",
          face: "smile",
          label: "Ask if he missed you",
          style: 1,
          close:
            "Yes! I missed you\n\nI counted the days you didn't come. So it's true",
        },
        {
          key: "bold",
          face: "serious",
          label: "Ask why it matters so much",
          style: 4,
          close:
            "Because I don't have much\n\nThis is mine. I want to keep it",
        },
      ],
    },
    keepsake: {
      emoji: "🌼",
      line: "When he asked you to come by more, and meant it.",
    },
  },

  friend: {
    // Same texting rules as acquaintance: sticker beats and closes are the
    // sticker alone, and his name leads the first beat he types. He's been
    // keeping track of how you answer him ({favResponse}), and what he wants
    // for it is a love story. He believes in love, simply and completely;
    // the soulmate "struck by lightning" line waits for a later tier.
    beats: [
      "",
      "**{firstName}**: You always give me {favResponse} 🌷\n\nEvery single time. I noticed",
      "So I want a love story from you next\n\nA real one",
    ],
    faces: { 0: "default", 1: "smile", 2: "full_smile" },
    stickers: { 0: "Question.png" },
    choice: {
      prompt: "Do you believe in love, Dandelion? I do!",
      options: [
        {
          key: "kind",
          face: "smile",
          label: "Say you believe in it too",
          style: 3,
          close: "",
          sticker: "Smug.png",
        },
        {
          key: "playful",
          face: "close",
          label: "Ask what makes a good one",
          style: 1,
          close: "Someone keeps coming back\n\nThat's all it needs ♪",
        },
        {
          key: "bold",
          face: "annoyed",
          label: "Say love isn't real",
          style: 4,
          close: "",
          sticker: "No.png",
        },
      ],
    },
    keepsake: {
      emoji: "🌷",
      line: "When he asked if you believe in love, and told you he does.",
    },
  },

  closeFriend: {
    beats: [
      "**{firstName}**: Come to the far field 🌙 The one past the fence where nobody goes. They think it's out of bounds. It is. Come anyway.",
      "*It is completely dark and completely silent, and the field is full of dandelions gone to seed, thousands of them, the whole slope, pale in what light there is.*\n\n> I planted this. Not the first ones, they were already here. But I've been carrying seed heads out from the park for two years and letting them go here.",
      "*He sits down in the middle of it without checking whether you'll follow.*\n\n> Nobody knows. Not Haru, and Haru knows every square foot of that park. This bit isn't the park. This bit's mine.\n\n*He hums for a while.*\n\n> You can be in it. That's what I'm asking. Not visiting it, *in* it, so it's a place with you in it and then I can come here when you're not here and you'll still sort of be here.",
    ],
    faces: { 0: "smile", 1: "close", 2: "blush" },
    choice: {
      prompt:
        "Is that all right? You can say no. Say no properly if you mean it, I get confused by the polite kind.",
      options: [
        {
          key: "kind",
          face: "close",
          label: "Say yes and sit down",
          style: 3,
          close:
            "*You sit. He goes very still for a moment, and then leans over sideways until his whole weight is against you, exactly like a child falling asleep on a bus.*\n\n> Good,\n\n*he says.*\n\n> That's it now. That's done. You're in it.\n\n*He hums until it gets light.*",
        },
        {
          key: "playful",
          face: "full_smile",
          label: "Blow a seed head at him",
          style: 1,
          close:
            "*It goes everywhere. He is absolutely delighted and appalled in equal measure.*\n\n> That's a WHOLE ONE. That's about two hundred!\n\n> ...Good. Do another. There should be more of them if you're going to be in it.",
        },
        {
          key: "bold",
          face: "serious",
          label: "Ask what happens if you go",
          style: 4,
          close:
            "*The humming stops.*\n\n> Then it's still yours,\n\n*he says, after a long time.*\n\n> I'd still come. I'd just be sad in it instead.\n\n> That's better than not having it. I worked that out already. I worked it out before I brought you.",
        },
      ],
    },
    keepsake: {
      emoji: "🌱",
      line: "A field out of bounds with two years of seed carried into it.",
    },
  },

  confidant: {
    beats: [
      "**{firstName}**: I don't sleep at night 🌙 You knew that. Here's the bit you didn't.",
      "I don't sleep because I'm listening for the park. Everything in it makes a noise. I know all of them. If one stops I have to go and see why.\n\nHaru thinks that's me being good at my job. It isn't. I'm frightened all the time, and the job is the only shape I've got to put it in 🎵",
      "Everything I've ever liked has gone quiet eventually. That's not sad, it's just true. People get upset when I say it, so I stopped.\n\nYou make a noise too. I know it now. Your feet on the gravel from forty feet off.\n\nSo I listen for that as well. It's worse, because most hours you're not on the gravel 🪨",
    ],
    faces: { 0: "default", 1: "sweat", 2: "serious" },
    choice: {
      prompt:
        "Is that a bad thing to have said? I can't always tell at night. Tell me if it was bad.",
      options: [
        {
          key: "kind",
          face: "smile",
          label: "Say you'll walk it more often",
          style: 3,
          close:
            "How often.\n\n*You tell him.*\n\n...Say the days. Say them out loud so I can put them somewhere.\n\n*You list them. He repeats every one back. He never misses one after that, and neither do you.*",
        },
        {
          key: "playful",
          face: "blush",
          label: "Ask what your noise is like",
          style: 1,
          close:
            "Uneven. You take the corner wide because of the puddle. Everyone else walks through the puddle.\n\nIt's my favorite one 🎵 Don't tell the birds.",
        },
        {
          key: "bold",
          face: "close",
          label: "Tell him to sleep instead",
          style: 4,
          close:
            "I can't do it on my own.\n\n*A long pause. Then, very simply, with no wheedling anywhere in it:*\n\nYou could sit in the field with me. I've slept there before. I've never slept there with anyone.\n\n*He does sleep, that night, for about three hours, flat out in the seed heads with his head on your leg, humming even in his sleep.*",
        },
      ],
    },
    keepsake: {
      emoji: "🪨",
      line: "The sound of your feet on gravel, learned from forty feet away.",
    },
  },

  devoted: {
    beats: [
      "**{firstName}**: The one standing near you today. In the courtyard.\n\nI know his name, where he sleeps, when he eats. Eleven minutes, it took me.\n\nI'm telling you that I found it out.",
      "I'm not going to do anything. I want you to know that.\n\nBut I sat with it all afternoon. Ren asked what was wrong tonight and I said nothing. First time I've ever lied to him.",
      "So instead I went to the field and pulled up about a hundred of them. Then I felt awful, they hadn't done anything, and I sat there putting the seed heads back even though that doesn't work.\n\nThat's where it went. Into the flowers 💐 It has to go somewhere. I'd rather there than anywhere with a name.",
    ],
    faces: { 0: "serious", 1: "sweat", 2: "close" },
    choice: {
      prompt:
        "Was that right? I think it was right. I'd like you to say it was right.",
      options: [
        {
          key: "kind",
          face: "smile",
          label: "Tell him it was right",
          style: 3,
          close:
            "...Good.\n\n*A long silence, and then the humming starts up again, unsteady at first.*\n\nI'll do the flowers every time. That's the rule now. You made the rule and I'm keeping it.",
        },
        {
          key: "playful",
          face: "blush",
          label: "Offer to replant them with him",
          style: 1,
          close:
            "They won't grow. I've done it before. It doesn't work.\n\n...You can help anyway 🌱 I'd like there to be two of us doing something that doesn't work.",
        },
        {
          key: "bold",
          face: "serious",
          label: "Tell him to lie to you never",
          style: 4,
          close:
            "I haven't. Not once. That's why I told you about the eleven minutes.\n\nI could have not told you. It would have been so easy to not tell you.\n\n*Then, after a while:* Come to the field. I want to be next to you when you're not angry with me. I've been imagining it all afternoon and it's much better than the other thing I was imagining.",
        },
      ],
    },
    keepsake: {
      emoji: "💐",
      line: "A hundred flowers pulled up and put carefully back.",
    },
  },

  soulbound: {
    beats: [
      "**{firstName}**: It's night, so my mouth works 🌙 I've been waiting all day for it to be night.",
      "{timesMet} times. I know every gap between them. The nine. And the four when you were ill and I sat at the gate all four.\n\nI never told you about the four. I'm telling you everything tonight. That's the plan.",
      "I know what I am. Ren's explained it twice, kindly. Haru once, badly.\n\nI hold on too hard. I count things I shouldn't. I find out names in eleven minutes. That won't change. When I try, I just do it quietly instead, which is worse.\n\nSo I won't promise I'll be normal. That would be a lie, and I don't lie to you.",
      "Here's the one thing I do promise. It's the only one I've got.\n\nI love you. And you can go. Any time. I won't follow, I won't find anything out, I won't sit at the gate where you can see me.\n\nI'd be sad in the field instead. I worked out how ages ago, so that when I said this I'd mean it.",
    ],
    faces: { 0: "full_smile", 1: "close", 2: "serious", 3: "blush" },
    choice: {
      prompt:
        "You can say anything. I've had all day to get ready for anything.",
      options: [
        {
          key: "answered",
          face: "full_smile_blush",
          label: "Say it back",
          style: 3,
          close:
            "*The humming stops dead.*\n\n*Then, after a very long time:* Say it in the field. I want it to happen there so it's in the ground with everything else.\n\n*He's sitting in the middle of the slope when you get there, absolutely still for once, and when you say it he closes his eyes and tips forward until his forehead is against yours.*\n\n> There,\n\n*he says.*\n\n> Now it's a place with that in it. Now it can't go anywhere.",
        },
        {
          key: "held",
          face: "smile",
          label: "Ask him to give you time",
          style: 2,
          close:
            "All right.\n\n*No wheedling. No guilt. He doesn't ask how long, which is the most enormous thing he has ever not done.*\n\nI said you could go, so I have to mean the smaller ones too. That's how it works. Ren explained it.\n\nThe field's still yours. That was done ages ago and it doesn't undo. And I'll still know your feet on the gravel, and I'll still be glad, and you don't have to do anything about that at all.",
        },
      ],
    },
    keepsake: {
      emoji: "🌻",
      line: "A promise that you could go, worked out long in advance so he could mean it.",
    },
  },
};
