// Jin's bond scenes, read as DIALOGUE.jin.bondScenes
// (constants/dialogue/jin.js imports this file).
//
// The level-up DMs (docs/bond-scene-dms.md). Jin does not ask, so none of
// these are requests; the warmth is in what he permits and what he admits to
// having noticed. The arc is the crown coming off by degrees — bold is the
// register that reaches him, so every choice rewards refusing to be dismissed.
//
// Texting voice, per reference/jin.md's "Texting style" notes: Jin is not afraid
// of curse words. They stay rare enough to land, and surface when he is riled
// or raw rather than in the cold register.
export default {
  acquaintance: {
    beats: [
      "**{firstName}**: Servant.\n\nTohma's decided I can't keep sending someone to fetch you. Says it's a waste of the staff. Fine. His way, then. Answer.",
      "You've been underfoot {timesMet} times now. I haven't had you thrown out. Make of that whatever you want. I'm not explaining it.\n\n...\n\nDon't get ideas. It's not a promotion.",
    ],
    faces: { 0: "serious", 1: "annoyed" },
    choice: {
      prompt: "Well? You've got thumbs. Use them.",
      options: [
        {
          key: "kind",
          face: "blush",
          label: "Say you're glad he wrote",
          style: 3,
          close: "...Glad.\n\nHa. Whatever. Be glad, then. Costs me nothing.",
        },
        {
          key: "playful",
          face: "annoyed",
          label: "Ask if that was praise",
          style: 1,
          close:
            "Praise? Tsk. That was a fact.\n\n...You don't need praise anyway. You'd just get cocky.",
        },
        {
          key: "bold",
          face: "smile",
          label: "Tell him you'll decide that",
          style: 4,
          close:
            "Ha. *There* it is.\n\nGood answer. Keep that. Go do something useful, servant.",
        },
      ],
    },
    keepsake: {
      emoji: "❄️",
      line: "The first order he gave you that wasn't really an order.",
    },
  },

  friend: {
    beats: [
      "**{firstName}**: Why do you keep coming up here? Answer me.",
      "Half this school talks about me behind my back. Anyone who wants something from me goes through Tohma.\n\nYou? Whatever I throw at you, I get {favResponse} back. Then you stay and pick up whatever I left on the floor anyway.\n\nSo which is it: guts, or you're too dumb to know better?",
    ],
    faces: { 0: "serious", 1: "annoyed" },
    choice: {
      prompt: "Pick one. I'm waiting.",
      options: [
        {
          key: "kind",
          face: "blush",
          label: "Say you like the company",
          style: 3,
          close:
            "Tsk. That's the dumbest thing you've ever said to me.\n\n...Whatever. The door's not locked.",
        },
        {
          key: "playful",
          face: "annoyed",
          label: "Say you came for the mess",
          style: 1,
          close:
            "I didn't ask for a joke.\n\nThen you won't mind that I'm never cleaning it again. Get used to it.",
        },
        {
          key: "bold",
          face: "smile",
          label: "Say you're staying either way",
          style: 4,
          close:
            "Ha. Stubborn.\n\nOnly Tohma talks to me like that, and he's stuck with me. You're not.\n\nFine. Stay. That's an order.",
        },
      ],
    },
    keepsake: {
      emoji: "❔",
      line: "The time he asked you straight why you keep coming, and waited on the answer.",
    },
  },

  closeFriend: {
    beats: [
      "**{firstName}**: Frostheim's throwing another party Friday. Tohma's handling it. You know I don't waste air on bootlickers.",
      "Everyone's already decided I won't show. They'd have been right, once. That was before we met in {sinceMet}.\n\nLet them keep thinking it.",
      "You'll be there. Eight o'clock. Your schedule's not my problem. Arrange it around me.",
    ],
    faces: { 0: "annoyed", 1: "smile", 2: "serious" },
    choice: {
      prompt: "I'm waiting on a yes. Anything else, keep it to yourself.",
      options: [
        {
          key: "kind",
          face: "blush",
          label: "Say you'll be there",
          style: 3,
          close:
            "Good.\n\nDon't wander off with the brats once you're inside. Stay somewhere I can find you.",
        },
        {
          key: "playful",
          face: "smile",
          label: "Ask if he's finally going",
          style: 1,
          close:
            "Did I say that? I said *you'll* be there.\n\nYou'll find out at eight, servant.",
        },
        {
          key: "bold",
          face: "serious",
          label: "Say you'll go if he does",
          style: 4,
          close:
            "You've got some nerve setting terms with me.\n\n...Be there by eight. I want one person in that room who isn't surprised.",
        },
      ],
    },
    keepsake: {
      emoji: "🥂",
      line: "The order to show up at a party he's never once shown up to.",
    },
  },

  confidant: {
    beats: [
      "**{firstName}**: It's quiet tonight. I've been at the piano for an hour.",
      "I kept losing my place. My head was on {lastMoment}.",
      "Somebody should be turning pages for me. Tohma's asleep.\n\nThat's all I'm going to say.",
    ],
    faces: { 0: "close", 1: "blush", 2: "annoyed" },
    choice: {
      prompt: "The door's open. Quit dawdling.",
      options: [
        {
          key: "kind",
          face: "blush",
          label: "Ask him to play for you",
          style: 3,
          close:
            "Tsk. You think I play on request?\n\n...Get up here first. Sit where I tell you and don't talk.",
        },
        {
          key: "playful",
          face: "smile",
          label: "Ask if you broke his focus",
          style: 1,
          close:
            "Don't flatter yourself. My focus is fine.\n\nGet up here and I'll prove it.",
        },
        {
          key: "bold",
          face: "surprise_blush",
          label: "Say you're already outside",
          style: 4,
          close:
            "Bold, aren't you.\n\nThen why are you still typing? Get in here. Sit next to me.",
        },
      ],
    },
    keepsake: {
      emoji: "🎹",
      line: "A page-turning job he could have done himself.",
    },
  },

  devoted: {
    beats: [
      "**{firstName}**: Can't sleep, and it's your fault.\n\nI used to like this room best with nobody else in it. Door locked, nobody wanting anything from me. Now you leave and all I notice is that it's empty.",
      "Since the clash, I've kept most of {house} out of this room. Somewhere along the way, I started looking forward to your visits. I don't care who knows it. Let them talk. I'm done pretending you're just here to clean up after me.",
      "There's a part of me I gave up on.\n\nWith you, I'm whole again. That's as plain as I'm going to say it.",
    ],
    faces: { 0: "serious", 1: "smile", 2: "close" },
    choice: {
      prompt: "Come over tonight. Don't make me ask twice.",
      options: [
        {
          key: "kind",
          face: "blush",
          label: "Say you'll stay the night",
          style: 3,
          close:
            "...Good.\n\nYou're not leaving in the morning either. I've decided.",
        },
        {
          key: "playful",
          face: "smile",
          label: "Ask which side is yours",
          style: 1,
          close:
            "Doesn't matter. You'll end up on mine anyway.\n\nGet up here.",
        },
        {
          key: "bold",
          face: "full_smile",
          label: "Say you won't let him sleep",
          style: 4,
          close:
            "Ha. Big talk from someone who isn't here yet.\n\nCome prove it.",
        },
      ],
    },
    keepsake: {
      emoji: "💍",
      line: "The ring he left on the nightstand, on the side of the bed that's yours now.",
    },
  },

  soulbound: {
    beats: [
      "**{firstName}**: I'm going to say something and I'd rather do it where I can't watch you read it. Yeah. That's cowardice. Doing it anyway.",
      "I counted. {timesMet} times you've come to me, and not once did I send for you.\n\nI want that on the record. My whole life people have been delivered to me. You just showed up.",
      "I was raised to make a good match. I can name you the families, the terms, the fucking seating charts. There's no version of that where someone like you turns up at all.\n\nAnd I don't care. Haven't for a while. I've just been managing it carefully enough not to notice.",
      "So.\n\n*The typing indicator holds for a long while.*\n\nI love you. I know exactly what it costs me to put that in writing. I wrote it anyway. No title in front of it, no order behind it.\n\nDo what you want with it. You always do. It's the single most infuriating thing about you and I wouldn't take it back.",
    ],
    faces: { 0: "sweat", 1: "smile", 2: "serious", 3: "blush" },
    choice: {
      prompt: "Answer or don't. I can take either one.",
      options: [
        {
          key: "answered",
          face: "full_smile_blush",
          label: "Say it back",
          style: 3,
          close:
            "*Nothing. Nothing for so long that you check the message sent.*\n\nCome here. Now. I don't care what time it is.\n\n*He meets you at the top of the stairs still in yesterday's shirt, and for a man who has never in his life been at a loss for what to say, he says nothing at all for a very long moment before he kisses you, carefully, the way he does everything, and then not carefully in the least.*",
        },
        {
          key: "held",
          face: "smile",
          label: "Ask him to give you time",
          style: 2,
          close:
            "Fine. *It comes back without a second's hesitation, and there's nothing wounded in it.*\n\nI've never wanted anything I could just order. Take as long as you need. I'm terrible at waiting. I'll learn.\n\n*And he does. Nothing changes. He's exactly where he always is, insufferable and immovable, holding open the door of a room he has never once made you knock at.*",
        },
      ],
    },
    keepsake: {
      emoji: "💌",
      line: "The night the king wrote it down without a title in front of it.",
    },
  },
};
