// Romeo's bond scenes, read as DIALOGUE.romeo.bondScenes
// (constants/dialogue/romeo.js imports this file).
//
// The level-up DMs (docs/bond-scene-dms.md). One of the six volatile
// characters — see docs/negative-affinity-enemies-to-lovers.md. Romeo yells in
// text, coins acronyms nobody asked for, and prices everything, and none of
// that softens on the way up. What changes is what he spends the money on and
// who he counts as his. The care is always backhanded and always expensive.
export default {
  acquaintance: {
    beats: [
      "**{firstName}**: Before you say anything, no, you're not in trouble, and no, this isn't a bill. Yet.",
      "Somebody put your name on the floor list as a mark. Standard stuff, happens to everyone who comes through more than twice. Not personal, just Sinostra.\n\nI took it off. Personally. Cost me a conversation I did not enjoy having at nine in the morning.\n\n{timesMet} visits. You've wiped and waited my tables, and you've never once sat down at one. Marks play. You don't even look. That's either good sense or a scheme. I'll find out which.",
    ],
    faces: { 0: "annoyed", 1: "serious" },
    choice: {
      prompt: "So don't make me regret it.",
      options: [
        {
          key: "kind",
          face: "annoyed",
          label: "Say you'll stay off the tables",
          style: 3,
          close:
            "Good. End up on that list again, and I won't be taking you off, understand!?\n\n...That's all you're getting. That's the entire allocation for the year.",
        },
        {
          key: "playful",
          face: "serious",
          label: "Ask if you're still a mark",
          style: 1,
          close:
            "Tch. I wouldn't be wasting a perfectly good morning explaining myself to a mark.\n\n...You're something else. I haven't worked out what yet. Don't push it.",
        },
        {
          key: "bold",
          face: "sweat",
          label: "Ask what it cost him",
          style: 4,
          close:
            "Nothing.\n\nTwenty thousand yen out of my own pocket, to cover what the floor had you down for, and I had to be nice to the TGA who listed you. Don't mention it. I mean it. Do not mention it, ever, to anyone.",
        },
      ],
    },
    keepsake: {
      emoji: "💳",
      line: "A name struck off the floor list at nine in the morning.",
    },
  },

  friend: {
    beats: [
      "**{firstName}**: That's it. I'm done. Nothing but WOE.",
      "Every job I gave you, I made worse on purpose. Tables, wiped until I couldn't find a single hair. Refills, more than any sane person drinks. Table seven, every peak hour. The chips, counted twice, late, on my orders.\n\nEveryone in this house folds inside a week. Shinjo suddenly has the Compendium of Laws to read the second I put him on the floor. The first-years stand around like TGAs.",
      "I tell them to LYP, and they learn it.\n\nYou? You answer me with {favResponse}. Every single time, no matter what I hand you.\n\nSo I'm not stopping. I'm changing the question. Everyone in this house has a price. Money, fear, a pretty face. Once I know what it is, I know exactly who could buy them out from under me. I'd like to know yours before anyone else does.",
    ],
    faces: { 0: "annoyed", 1: "annoyed", 2: "serious" },
    choice: {
      prompt: "So. What would it take, BB? Name your price.",
      options: [
        {
          key: "kind",
          face: "serious",
          label: "Say you'd never sell him out",
          style: 3,
          close:
            "...Hmph. Big promise from someone I've been working to the bone.\n\nWords are cheap. I'll believe it when it costs you something.",
        },
        {
          key: "playful",
          face: "annoyed",
          label: "Ask him to make an offer",
          style: 1,
          close:
            "HDY! I asked first. Nobody makes ME bid.\n\nName it when you've got a real one, BB.",
        },
        {
          key: "bold",
          face: "surprise_blush",
          label: "Say your price is him",
          style: 4,
          close:
            "Excuse me!? That's not a price. That's extortion.\n\n...Tch. I'll think about it.",
        },
      ],
    },
    keepsake: {
      emoji: "⚖️",
      line: "The one price in his house he still couldn't name.",
    },
  },

  closeFriend: {
    beats: [
      "**{firstName}**: Casino. After close. Come up to the balcony office, not the floor, and DON'T let Taiga see you on the way up or he'll steal you for the night at the casino before I've said two words.",
      "*The floor is dark below and he is sitting on the balcony with his jacket off and his hair down and a ledger open in front of him, and he doesn't do the voice when you come in.*\n\n> This is the real book. Not the one the academy sees. Every fee, every mark, every person in this house who owes and every person who's owed to.",
      "*He turns it round so you can see, which is the single most dangerous thing anyone in Sinostra could do.*\n\n> Half of that is people who'll never pay and I've never once chased. Fuji-kun's on there four times. There's a second-year on there whose mom's ill and she's never going to know I wrote it off.\n\n> Everyone thinks I'm the money. I AM the money. But nobody's ever asked what I actually spend it on, and it turns out the answer's on page nine and I've never shown anybody page nine.",
    ],
    faces: { 0: "annoyed", 1: "serious", 2: "close" },
    choice: {
      prompt:
        "Say something. And if you say I'm secretly nice I'm throwing you off this balcony.",
      options: [
        {
          key: "kind",
          face: "blush",
          label: "Say page nine is the real book",
          style: 3,
          close:
            "*He shuts the ledger rather harder than necessary.*\n\n> ...Yeah. Yeah, alright.\n\n*He doesn't say anything else for a bit. Then:*\n\n> Don't repeat that. I've got a reputation and it does about ninety percent of my job for me.",
        },
        {
          key: "playful",
          face: "smile",
          label: "Threaten to tell everyone",
          style: 1,
          close:
            "> HDY. I will RUIN you. I will ruin you SO efficiently...\n\n> ...You wouldn't though. That's the annoying bit. You're the only person I've shown this to and I'm not even slightly worried, and I've been worried about everything since I was nine.",
        },
        {
          key: "bold",
          face: "surprise_blush",
          label: "Ask if you're in the book",
          style: 4,
          close:
            "*He goes very still.*\n\n> ...Page one.\n\n*He doesn't turn it back round.*\n\n> Not as a debt. There's a second column. There's exactly one name in the second column and it's been there since about March and I'm not explaining what the column is.",
        },
      ],
    },
    keepsake: {
      emoji: "📒",
      line: "Page nine of a ledger nobody else has ever been shown.",
    },
  },

  confidant: {
    beats: [
      "**{firstName}**: Taiga lost three days again. I've been running the floor since Wednesday and I have not slept and I look INCREDIBLE, which is not the point.",
      "Here's the bit I don't say. He doesn't remember that I do it. Every time. I cover four days, he comes back, and by lunch we're screaming at each other about the bar tab like nothing happened. He's not ungrateful, he genuinely doesn't register it.\n\nSo I've held this house up for two years for a man I fight with daily. And if he ever worked it out, he wouldn't say thank you. He'd make it ammunition. I'd rather run this floor blind than give him that.",
      "I yell because if I'm the loudest person in the room nobody asks what I'm actually doing. Worked for as long as I can remember. Works best on him, he's too busy yelling back to notice what I'm covering.\n\nYou asked. Last Tuesday. Just said \"are you all right\" in the corridor like it was a normal question, and I've been thinking about it for six days and I'm FURIOUS about it.",
    ],
    faces: { 0: "annoyed", 1: "serious", 2: "blush" },
    choice: {
      prompt:
        "So? Go on. You've clearly got something, you've been chewing on it for a week.",
      options: [
        {
          key: "kind",
          face: "close",
          label: "Ask if he's all right again",
          style: 3,
          close:
            "DON'T...\n\n*Nothing for four minutes.*\n\nNo, *he writes eventually, and it's the quietest thing he's ever sent.* No, I'm not. Obviously I'm not.\n\nCome up. Don't say anything about it when you get here. Just be up here.",
        },
        {
          key: "playful",
          face: "full_smile",
          label: "Agree that he looks incredible",
          style: 1,
          close:
            "THANK YOU. Finally. Somebody in this building with EYES.\n\n*Then, much later:* ...that helped, actually. Don't tell anyone that helped. I'd rather people thought I was unreachable.",
        },
        {
          key: "bold",
          face: "annoyed",
          label: "Say he should tell Taiga",
          style: 4,
          close:
            "Absolutely not.\n\nHe'd never let it go. He'd bring it up every time we argue for the rest of our lives, turn it into a scoreboard, and somehow make ME feel like I owe HIM for having \"let\" me do it. That's not... no. I'm not handing him that.\n\nBesides. I've got the better memory. It's the one advantage I've got over him and I'm keeping it.",
        },
      ],
    },
    keepsake: {
      emoji: "💼",
      line: "Four days of covering for someone who'll never know it happened.",
    },
  },

  devoted: {
    beats: [
      "**{firstName}**: Don't come in tomorrow. I mean it. The floor's closed and I'm dealing with something.",
      "Somebody laid into you in the west block. Verbally. In front of about nine people.\n\nI've heard about it from three separate sources and I've spent the evening finding out exactly who he owes, what to, and when it's due, and it turns out he owes a REMARKABLE amount and it's due whenever I say it is.",
      "I want to be honest about what this is, because you'll hear it as protecting you and it's uglier than that.\n\nThis is me being the most frightening thing in the building on purpose, at somebody, because he made you look at the floor. That's the whole of it. There's no noble version.\n\nYou're mine. Not like... I'm not TAIGA about it. You're on my list. Everyone on my list is protected, nobody's ever got on it without paying, and you never paid a thing.",
    ],
    faces: { 0: "serious", 1: "annoyed", 2: "serious" },
    choice: {
      prompt:
        "Now tell me to stop. You're the only one who could and I'd like to know if you will.",
      options: [
        {
          key: "kind",
          face: "close",
          label: "Tell him to stop",
          style: 3,
          close:
            "...Right.\n\n*A long silence.*\n\nStopped. Done. It's... yeah. It's stopped.\n\n*Then:* Come up anyway. I've canceled a whole evening of being frightening and I've got nothing to do with myself and I'd rather not sit here alone with it.",
        },
        {
          key: "playful",
          face: "serious",
          label: "Ask how remarkable the debt is",
          style: 1,
          close:
            "OBSCENE. Genuinely obscene. He's been rolling it over for a year and a half and I've been letting him because it amuses me.\n\nIt has stopped amusing me. Funny how that works.",
        },
        {
          key: "bold",
          face: "blush",
          label: "Say you don't want him to",
          style: 4,
          close:
            "That's not the same as telling me to stop and you know it isn't.\n\n...It's better, actually. It's worse for me and it's better. Because now I've got to want to stop rather than just being told, and I don't, and I'm going to anyway.\n\nHDY. Genuinely. How dare you.",
        },
      ],
    },
    keepsake: {
      emoji: "💰",
      line: "A debt he stopped calling in because you asked him to.",
    },
  },

  soulbound: {
    beats: [
      "**{firstName}**: Balcony. Now. And before you get there, I've had eleven weeks to do this properly and I've decided to do it badly instead, so brace.",
      "*The ledger is open on the desk at page one. He's turned it round already.*\n\n*There is a second column, and there's one name in it, and it says: \"not a debt. never bill.\"*\n\n> March. I wrote that in March and I've looked at it about four hundred times.",
      "> Everything's a price. That's not a philosophy, it's the only language I was taught. My family bought their way out of things and into things, and I learned exactly one skill: knowing what everybody costs.\n\n> I can price anyone in this academy in four seconds. Taiga. Jo. The captain of Frostheim, who thinks he's above it and isn't.\n\n> {timesMet} visits and I have NEVER been able to price you. Not once. It's been driving me out of my MIND for a year.",
      "> So here's the badly done bit.\n\n> I love you. There's no invoice, there's no favor attached, and there's nothing you owe me, and if you ever try to pay me back for anything I have EVER done for you I will genuinely never speak to you again.\n\n> That's it. That's the whole thing. I've spent my entire life making sure everything had a number on it and there's one thing that doesn't and it's you and I've just told you, out loud, on a balcony, like a MANIAC.",
    ],
    faces: { 0: "sweat", 1: "close", 2: "serious", 3: "blush" },
    choice: {
      prompt:
        "Say something. Anything. I'm going to start yelling in about four seconds and it won't be at you, it'll just be VOLUME.",
      options: [
        {
          key: "answered",
          face: "full_smile_blush",
          label: "Say it back",
          style: 3,
          close:
            "*There is a sound that is almost certainly a chair going over.*\n\nSay it AGAIN... no. No, don't. Don't, I heard it, I'm...\n\n*He stops trying to type. He comes round the desk instead, and for once he isn't loud at all: he takes your hands, both of them, and looks at them rather than at you.*\n\n> Nobody's ever done that for free,\n\n*he says.*\n\n> Not once, in my whole life. Say it again in the morning. I'll need it in the morning.",
        },
        {
          key: "held",
          face: "close",
          label: "Ask him to give you time",
          style: 2,
          close:
            "Fine. GREAT. Excellent. Take all of it.\n\n*A pause. Then, without the volume:*\n\n...That wasn't sarcasm, for once. Take it. I dropped that on you off a balcony at two in the morning, you're entitled to a bit of thinking.\n\nSecond column stays. That's not a maneuver. It was true in March and it's true now and it'd be true if you never came up here again. Nobody bills you. That's the arrangement and it isn't up for negotiation, which I'm aware is a very me way of being kind.",
        },
      ],
    },
    keepsake: {
      emoji: "📓",
      line: "One name in a second column, marked never bill.",
    },
  },
};
