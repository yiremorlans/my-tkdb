// Alan's bond scenes, read as DIALOGUE.alan.bondScenes
// (constants/dialogue/alan.js imports this file).
//
// The level-up DMs (docs/bond-scene-dms.md). Alan is not good with words and
// these do not pretend otherwise — his beats are the shortest in the game, and
// the intimacy is in the fact of a man who says four words a day sitting there
// typing at all. What he cannot write, he does instead.
//
// Per reference/alan.md's "Texting style" notes, Alan's typed messages use no full
// stops and never put two sentences in one line — each thought gets its own
// line break. Narration and anything he says out loud (the `> ` lines) keep
// normal punctuation.
//
// The typos are deliberate. He is canonically hopeless with a phone (he has to
// ask how to add someone on WickChat), so roughly one line a scene carries a
// dropped apostrophe, a missing full stop, or a mistype he corrects on the next
// line. Do not spellcheck them out. They only ever appear in text he is typing
// — never in narration, and never in a line he says out loud.
export default {
  acquaintance: {
    beats: [
      "**{firstName}**: Its Alan\n\n*That's the whole message. It sits there for eleven minutes.*",
      "Not good at this\n\n*Another gap.*\n\nYouve been around {timesMet} times now\n\nBandana says I shoulda said something by now\n\nHe's right\n\nNot telling him that\n\nGlad you keep coming by\n\nShoulda said it sooner",
    ],
    faces: { 0: "default", 1: "sweat" },
    choice: {
      prompt: "That's it",
      options: [
        {
          key: "kind",
          face: "blush",
          label: "Tell him it's a good start",
          style: 3,
          close:
            "Yeah\n\n*A minute later:* Thnaks\n\n*Then:* \\*Thanks\n\n*That's the last one.*",
        },
        {
          key: "playful",
          face: "default",
          label: "Ask if that took long",
          style: 1,
          close:
            "40 minutes\n\n*No defensiveness in it at all. Just the number, handed over.*\n\nWasnt so bad",
        },
        {
          key: "bold",
          face: "serious",
          label: "Tell him to say more",
          style: 4,
          close:
            "*A long silence.*\n\nGarage\n\nTomorrow, after six\n\n*A pause.* Easier out loud\n\nLittle bit",
        },
      ],
    },
    keepsake: {
      emoji: "📱",
      line: "The eleven minutes between his name and what he'd meant to say.",
    },
  },

  friend: {
    beats: [
      "**{firstName}**: Noticed something",
      "I run missions the same way every time\n\nCount everyone in, check it twice\n\nYou're always on the list\n\nStopped checking you twice a while back\n\nPut you next to me now instead",
      "Dont know when that started\n\nYou give me {favResponse} every time\n\nQuit bracing for it to change",
    ],
    faces: { 0: "serious", 1: "default", 2: "close" },
    choice: {
      prompt: "Don't need anything back",
      options: [
        {
          key: "kind",
          face: "smile_blush",
          label: "Say you plan around him too",
          style: 3,
          close:
            "Yeah\n\n*A long pause.*\n\nGood\n\nWasn't sure it went both ways",
        },
        {
          key: "playful",
          face: "smile",
          label: "Ask if you get a vote",
          style: 1,
          close:
            "Didn't think to ask\n\nYou want one\n\nYou'd vote yes anyway",
        },
        {
          key: "bold",
          face: "serious",
          label: "Ask if he'd notice you gone",
          style: 4,
          close: "Yeah\n\nDont make me find out",
        },
      ],
    },
    keepsake: {
      emoji: "📋",
      line: "The spot beside him he stopped saving for anyone else.",
    },
  },

  closeFriend: {
    beats: [
      "**{firstName}**: You good",
      "Not asking as your captain\n\nAsking as me\n\nYou were right next to me\n\nThat thing went straight for you back there\n\nDidnt feel like a choice\n\nJust moved\n\nStill thinking about it now though",
      "Known you since {sinceMet}\n\nNever once done the math on how close that was till today\n\nDidn't like the answer\n\nGlad this is the version where you're fine",
    ],
    faces: { 0: "serious", 1: "sweat", 2: "close" },
    choice: {
      prompt: "Anyway\n\nJust checking in",
      options: [
        {
          key: "kind",
          face: "smile",
          label: "Ask if he's good too",
          style: 3,
          close:
            "Wasn't me it went for\n\n*A pause.*\n\nYeah\n\nAm now",
        },
        {
          key: "playful",
          face: "blush",
          label: "Ask if he does that math often",
          style: 1,
          close:
            "Only when it's you\n\nNever used to\n\nGonna start",
        },
        {
          key: "bold",
          face: "serious",
          label: "Tell him not to scare you",
          style: 4,
          close:
            "Fair\n\nWasn't planning on it happening again\n\nGonna keep you further back next time",
        },
      ],
    },
    keepsake: {
      emoji: "🛡️",
      line: "The two seconds he never had to think about, and hasn't stopped thinking about since.",
    },
  },

  confidant: {
    beats: [
      "*It comes through at four in the morning.*\n\n**{firstName}**: You awake",
      "Bad one tonight\n\nDont need anything\n\nJust didn't want to sit with it on my own and you were the only name I could stand to look at",
      "They say I killed someone\n\nYou've heard it\n\nEveryone has\n\nNobody's ever asked me\n\nTwo years, nobody's asked\n\nThey just decide, and then they're careful around me, and I let them, because careful's easier than the conversation\n\nYou've never asked either\n\nDifference is I don't think you're being careful\n\nI think you're waiting on me\n\nBeen sitting with that a while",
    ],
    faces: { 0: "sweat", 1: "close", 2: "serious" },
    choice: {
      prompt: "Ask me\n\nOr don't\n\nEither's fine\n\nI mean that",
      options: [
        {
          key: "kind",
          face: "close",
          label: "Say you'll wait for it",
          style: 3,
          close:
            "*Nothing for six minutes.*\n\nYeah\n\nOkay\n\nNot tonight\n\nBut it'll be you\n\nWanted you to know that much",
        },
        {
          key: "playful",
          face: "surprise",
          label: "Say you'd already decided",
          style: 1,
          close:
            "Decided what\n\n*You tell him.*\n\nHuh\n\n*A long gap.* Most people decide the other way\n\nYou went and did it without the facts, same as them\n\nBothers me a lot less than it should",
        },
        {
          key: "bold",
          face: "sweat",
          label: "Ask him straight out",
          style: 4,
          close:
            "*The typing indicator runs for almost ten minutes and produces this.*\n\nEveryone who hears it decides. One way or the other. Then they're careful around me\n\nYou haven't decided. Two years\n\nNot handing you the answer just to watch which way you go. Not yet\n\n*Then:* You still there\n\n*You say yes. He doesn't answer. The read receipt just sits there, timestamped, until the sun comes up.*",
        },
      ],
    },
    keepsake: {
      emoji: "📲",
      line: "A read receipt, timestamped, that never got a reply before sunrise.",
    },
  },

  devoted: {
    beats: [
      "**{firstName}**: Dont go out tonight",
      "*You ask why. It takes him a while.*\n\nBecause I'd have to come find you, and I'd have to use it, and I've got a rule about using it\n\nRule's held three years\n\nFigure it'd last about four seconds where you're concerned\n\nThat scares me more than whatever's in the corridor does",
      "Only ever told one person what the rule is\n\nOnly if someone's about to die\n\nLast resort, nothing before it\n\nYou've gone and made yourself the last resort\n\nDon't know when\n\nNobody asked me about it first\n\nIncluding me",
    ],
    faces: { 0: "serious", 1: "sweat", 2: "blush" },
    choice: {
      prompt: "So stay in\n\nPlease",
      options: [
        {
          key: "kind",
          face: "default",
          label: "Tell him you'll stay in",
          style: 3,
          close:
            "Good\n\n*Then, twenty minutes later, a photo taken from outside your building: his car, parked, engine off.*\n\nNot coming up\n\nJust gonna be here a while\n\n*It's still there in the morning.*",
        },
        {
          key: "playful",
          face: "blush",
          label: "Ask if he's on the doorstep",
          style: 1,
          close:
            "No\n\n*A pause.*\n\nYes\n\nBeen out here an hour\n\nDon't come down, it's freezing and I'll just tell you to go back up",
        },
        {
          key: "bold",
          face: "close",
          label: "Tell him to come up instead",
          style: 4,
          close:
            "*He comes up. He stands in the doorway without taking his jacket off, like leaving is still an option he's keeping open.*\n\n*Then he puts one hand flat against your cheek, careful, the way you'd hold something you were scared of breaking, and closes his eyes.*\n\n> Not good with words.\n\n*he says.*\n\n> This is the whole sentence.",
        },
      ],
    },
    keepsake: {
      emoji: "🚗",
      line: "A car parked outside all night with the engine off.",
    },
  },

  soulbound: {
    beats: [
      "**{firstName}**: Going to try and get this right\n\nMight take me a minute",
      "{timesMet} times you've turned up\n\nNever once because you needed something off me\n\nTook me about half of those to quit waiting for the ask",
      "I'm not a safe thing to be near\n\nThat's not me being modest\n\nI've had to be told to stop before\n\nBandana's seen it\n\nLeo's seen it\n\nNeither of them looks at me the same way after\n\nYou've seen it too\n\nYou came back the next day like nothing happened\n\nThen the day after that",
      "So here it is\n\nOnly doing this once\n\nI love you\n\nBeen true a long time\n\nWasnt going to say it, because saying it makes it yours to carry and I didn't want to put that on you\n\nPutting it on you anyway\n\nSorry",
    ],
    faces: { 0: "sweat", 1: "close", 2: "serious", 3: "blush" },
    choice: {
      prompt:
        "Take your time\n\nI'm good at waiting\n\nHad a lot of practice",
      options: [
        {
          key: "answered",
          face: "full_smile_blush",
          label: "Say it back",
          style: 3,
          close:
            "*Nothing comes back. Nothing for so long you think the phone's died.*\n\n*Then there's an engine outside, and then there's him: no jacket, hair wrecked, clearly not having stopped to think about a single part of it.*\n\n*He doesn't say anything. He just picks you up off the step and holds on, and it's the first time you've ever seen him smile without trying to hide it.*",
        },
        {
          key: "held",
          face: "smile",
          label: "Ask him to give you time",
          style: 2,
          close:
            "That's fine\n\n*Two words, straight back, no wobble in them.*\n\nWasn't asking for an answer\n\nWas just done not saying it\n\nGarage is open\n\nSame as always\n\nCome by whenever\n\n*And it is, and he never brings it up again, but the passenger seat gets finished that month, and he never mentions that either.*",
        },
      ],
    },
    keepsake: {
      emoji: "💺",
      line: "The passenger seat he'd been building for a month without saying so.",
    },
  },
};
