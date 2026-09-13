export default {
  // The level-up DMs (docs/bond-scene-dms.md). Ren says enormous things in the
  // flattest possible register and then immediately changes the subject to a
  // show. The arc is the gap between the two closing — by Soulbound he is still
  // deadpan, he has just stopped changing the subject.
  bondScenes: {
    acquaintance: {
      beats: [
        "**{firstName}**: hey senpai\n\n[link]\n\ndon't open that during a shift. Or do. I'm not your supervisor",
        "*You open it. It's an invite code for the gacha game he's been grinding on his phone between shifts, already redeemed under your name, starter items and all.*\n\nyou've been by the diner {timesMet} times and seemed curious. So now you have your own.\n\nI've made throwaway accounts before. Deleted every one of them almost straight away. yours is still there. not going to unpack that.",
      ],
      choice: {
        prompt:
          "anyway. You don't have to look at the build or whatever. it's rough, I already know. Wasn't the point.",
        options: [
          {
            key: "kind",
            label: "Give it a ten",
            style: 3,
            close:
              "a ten.\n\nyou've inflated the currency. now I have to actually optimize it. This is your fault and I'm going to be up until four.",
          },
          {
            key: "playful",
            label: "Give it a six",
            style: 1,
            close:
              "a SIX.\n\nokay. Okay, that's fair, the accessory slots are a mess. I hate that you're right. I'm re-rolling your loadout in about an hour, don't go to sleep.",
          },
          {
            key: "bold",
            label: "Ask to join his guild",
            style: 4,
            close:
              "my guild?\n\n*A long gap.*\n\n...yeah, alright. Give me a sec, I have to kick somebody first.\n\n*He kicks somebody. He never says who.*",
          },
        ],
      },
      keepsake: {
        emoji: "🎁",
        line: "A starter pack redeemed in your name before you'd even downloaded the game.",
      },
    },

    friend: {
      beats: [
        "**{firstName}**: So Haru mentioned my diner shift tonight",
        "Only I didn't have one. I was ducking the Jabberwock rounds with my phone dead, which you knew, because I told you that this morning.\n\nTurns out he came by looking for me when I went quiet, and you told him I was already at the diner. He's got this thing where if I go quiet too long he decides something's wrong and starts checking every room in the house. He's tracked me down before. Actual GPS tracker. I'm not exaggerating for effect.\n\nso you lying straight to his face for me. that's... something. thanks, I guess.\n\nYou come back with {favResponse} every time. I clocked that about you a while back, actually, since noticing things is basically my whole skill tree.\n\nI keep waiting for the part where you want something back.",
      ],
      choice: {
        prompt: "So what is it? might as well say it now.",
        options: [
          {
            key: "kind",
            label: "Say you don't want anything",
            style: 3,
            close:
              "Yeah, that's usually what people say right before they want something.\n\n...I believe you, though. Which is new. I don't know what to do with that so I'm just going to say thanks again and hope that covers it.",
          },
          {
            key: "playful",
            label: "Threaten to collect later",
            style: 1,
            close:
              "There it is. knew it.\n\nFine. name it whenever. Within reason. I'm not fighting Haru for you, I've seen what he does to people who skip the tour signup.",
          },
          {
            key: "bold",
            label: "Ask if he'd rather get caught",
            style: 4,
            close:
              "No.\n\n[screenshot]\n\nthat's the fake location, saved for next time he comes looking again. Don't ask why I already had it ready.",
          },
        ],
      },
      keepsake: {
        emoji: "📍",
        line: "A fake location, saved and ready in case Haru comes looking again.",
      },
    },

    closeFriend: {
      beats: [
        "**{firstName}**: You doing anything tonight?",
        "Not the diner. My room, for once.\n\n...that came out wrong. To play games. Diner's not exactly built for a second player anyway. I've got an actual couch, a second controller, and wifi that won't die on you\n\nKnown you since {sinceMet}, and you've finished basically every game I've put you onto since. Nobody else in this house gets why I like this stuff. Never really tried explaining it to anyone before",
        "Been meaning to ask you over for actual ages. Whatever, it's cool if you've got plans",
      ],
      choice: {
        prompt: "So. that's the ask. yes or no, I'm not typing it twice",
        options: [
          {
            key: "kind",
            label: "Say you'd love to come over",
            style: 3,
            close:
              "Yeah?\n\n...good.\n\nDoor's unlocked. Don't take forever, I already picked the game.",
          },
          {
            key: "playful",
            label: "Tease him for finally asking",
            style: 1,
            close:
              "Yeah, laugh it up.\n\nfor the record I had at least three better versions of this text and sent the worst one anyway. bring snacks. I've got a system, don't mess with it.",
          },
          {
            key: "bold",
            label: "Ask if this counts as a date",
            style: 4,
            close:
              "...No.\n\n*A long gap.*\n\nOkay, I wouldn't correct you if you called it that. Doesn't mean I'm saying it first. Just show up.",
          },
        ],
      },
      keepsake: {
        emoji: "🎮",
        line: "A standing invitation to his room that took him embarrassingly long to send.",
      },
    },

    confidant: {
      beats: [
        "**{firstName}**: you up? doesn't matter. Reading this tomorrow is fine.",
        "so I've been chewing on something and it won't leave me alone. I complain about everything here. Every shift, every tour edit, every time Haru drags me out to go find Towa. loudly. On the record.\n\nHaru's put a tracker on me before, to haul me out when I go quiet too long. And here's the thing: I've never once actually refused any of it. I just complain, and then I do it.",
        "complaining and refusing aren't the same thing. Took me way too long to notice that.\n\nmost nights I grind some pointless game until I pass out, because it doesn't need anything back. Except Thursdays. that's the only two hours where somebody's there and nothing's expected of me, and I have to lock a door to get them.\n\nanyway. Deepest thing I've ever typed. putting my phone in another room now.",
      ],
      choice: {
        prompt: "say something normal so I can pretend that was normal.",
        options: [
          {
            key: "kind",
            label: "Say you don't need anything",
            style: 3,
            close:
              "*There's a long gap.*\n\n...I know.\n\nthat's the whole reason it's you on Thursdays. Took me about six months to work out why and then I just didn't look at it directly for another four.",
          },
          {
            key: "playful",
            label: "Ask him for a favor",
            style: 1,
            close:
              "oh, immediately? Straight in?\n\n...go on then. what is it.\n\n*You ask him to do nothing for an hour. He calls you a menace and then actually does it, and reports back afterwards that it was horrible and he might try it again.*",
          },
          {
            key: "bold",
            label: "Tell him it's okay to refuse",
            style: 4,
            close:
              "can't. If I stop, what's left.\n\n*Then, four minutes later:*\n\nthat was a bad sentence. I've read it back. Don't answer it, I don't think I want the answer yet.\n\n...ask me again on a Thursday.",
          },
        ],
      },
      keepsake: {
        emoji: "🔒",
        line: "A back door left unlocked on a Thursday.",
      },
    },

    devoted: {
      beats: [
        "**{firstName}**: don't be weird about this",
        "*It's a screenshot of a phone's home screen. There's an alarm on it, set for a time that means nothing, labeled with your name.*\n\nit's for when your last class ends. I set it about three months ago so I'd know when to stop being anywhere else.\n\nI have never once told you I was waiting. I've just always happened to be in the courtyard. Every time. three months of happening to be in the courtyard.",
        "tonight you came out late and I'd been there forty minutes, grinding the same event so it'd look like I was there for the game. Haru saw me and made it a whole thing, and I realized I've been running an entire secret operation to look casual, which is more effort than just saying it.\n\nso: I wasn't happening to be there. Not once. that's the message.",
      ],
      choice: {
        prompt: "okay. That's it. you can react.",
        options: [
          {
            key: "kind",
            label: "Say you always hoped he'd be",
            style: 3,
            close:
              "...say that again.\n\nno, don't. I heard it. I'm just... give me a second.\n\n*The second is nine minutes long. Then:* okay. Alarm stays. obviously the alarm stays.",
          },
          {
            key: "playful",
            label: "Ask what the alarm sound is",
            style: 1,
            close:
              "it's the diner's fire alarm. I recorded it. It's the most annoying sound in the building.\n\nthat's on purpose. If it was nice I'd snooze it. I've never snoozed it. not once in three months.",
          },
          {
            key: "bold",
            label: "Tell him to wait inside",
            style: 4,
            close:
              "inside's worse. Inside's obvious.\n\n*Then, much later, from the courtyard:* ...I'm outside. I'm outside right now, actually, I've been typing this from the wall.\n\n*When you come out he doesn't get up. He just holds a hand out until you take it, and stays sitting on the cold wall holding onto it for a good twenty minutes without saying anything at all.*",
          },
        ],
      },
      keepsake: {
        emoji: "⏰",
        line: "An alarm with your name on it that he never once snoozed.",
      },
    },

    soulbound: {
      beats: [
        "**{firstName}**: ok. No bit. no link. I'm not sending you a code instead of just saying this.",
        "{timesMet} times. I've got a save file for basically all of them. Every pointless co-op grind, every event, going back to that first invite code. at some point I stopped playing them for the loot and started playing them because you'd be on the other account.\n\nnobody's ever seen that save file. It's the least ironic thing I own.",
        "here's the actual thing. I say massive stuff in the smallest possible voice. I know I do it. I said \"I like you\" once like I was reading the weather and you just went with it, and I've thought about that literally hundreds of times since.\n\nI do it because if I say something flat and it doesn't land, it wasn't really said. That's the whole system. it's a very good system and it's kept me safe basically my whole life.",
        "so I'm turning it off. once. Right now.\n\nI love you. not as a bit. not with a clip after it.\n\nlove you, senpai. Have done for ages. that's the one I've been saving and it's the only thing I've ever said that I couldn't put a joke on the end of.",
      ],
      choice: {
        prompt: "take your time. I've got a whole save file to get through.",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close:
              "*The typing indicator goes on and off about six times.*\n\n*Then:* back door's open.\n\n*He's behind the counter when you get there and he doesn't do the bit once. He comes round the front, takes your jaw in both hands, and kisses you like a man who has been running a very good system for most of his life and has just decided the system was garbage.*\n\n> Yeah, I know I said it already,\n\n*he says afterwards.*\n\n> I'm going to keep saying it.",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close:
              "yeah, course.\n\n*A pause. Then, without a single flat note in it:*\n\nfor real. Take ages. I've been sitting on it for a year, it's not going to go off.\n\nThursday's still Thursday. That was never a move. I'd have given you the two hours whatever you said tonight. that's not me being noble, that's just genuinely how it is.\n\n*The cushion stays on your side of the counter. He never says anything about that either.*",
          },
        ],
      },
      keepsake: {
        emoji: "💾",
        line: "A save file going back to the first invite code, never shown to anyone.",
      },
    },
  },
  dialogue: {
    new: [
      {
        line: 'He\'s scrolling through his phone, barely acknowledging you at first. "Oh. Hey."',
        approach: "Say hey back",
      },
      {
        line: "One earbud comes out. That's the entire greeting, and it's more than most people get.",
        approach: "Take it as a hello",
      },
      {
        line: "He's found the one spot in the whole building where nobody looks. You found him anyway.",
        approach: "Sit down uninvited",
      },
      {
        line: '"...You need something?" He sounds like he hopes the answer is no.',
        approach: "Tell him it's nothing",
      },
      {
        line: '"Great, shift change. I was gonna head out... What? Do I really need to be here for that?"',
        approach: "Tell him he can go",
      },
    ],
    known: [
      {
        line: "Both earbuds come out. That's a significant escalation.",
        approach: "Note the upgrade",
      },
      {
        line: "\"Oh, it's you,\" he says, and doesn't go back to the phone right away.",
        approach: "Sit without asking",
      },
      {
        line: '"Oh, Senpai... could you open the link I sent you? No, you don\'t have to sign up or anything. Thanks."',
        approach: "Open the link he sent",
      },
      {
        line: "He asks if you've seen the video. He's asking because he wants to talk about it.",
        approach: "Say you've seen it",
      },
      {
        line: "He remembers what you said about the ending. He'd been thinking about it.",
        approach: "Talk about the ending",
      },
      {
        line: "He clears a stack of controllers off the cushion next to him without being asked.",
        approach: "Take the cleared seat",
      },
      {
        line: "The show hits some big cliffhanger right as you walk in. He glares like a warning shot.",
        approach: "Don't spoil it",
      },
      {
        line: "He mutes his phone the second you walk in. Small thing. He never used to bother.",
        approach: "Ask what he muted",
      },
      {
        line: '"You\'re not gonna make this weird, right?" he says, already regretting saying hi first.',
        approach: "Promise not to make it weird",
      },
      {
        line: "He complains about doing rounds in Jabberwock for a solid minute before noticing you're still standing there.",
        approach: "Let him finish complaining",
      },
      {
        line: "He asks if the aquatic zone smells as bad from the hallway. It does. He knows it does.",
        approach: "Tell him it's pretty bad",
      },
      {
        line: "He holds up two horror movie thumbnails and makes you pick, like your opinion actually counts for something now.",
        approach: "Pick the scarier one",
      },
      {
        line: '"Hey, senpai... you\'re not gonna sign me up for something, right?" He sounds legitimately worried.',
        approach: "Say it's nothing bad",
      },
    ],
    warm: [
      {
        line: "He actually puts his phone down when you arrive. Doesn't pick it back up, either.",
        approach: "Steal all his attention",
      },
      {
        line: "He shifts over on the couch without looking up. The space is for you.",
        approach: "Take the empty space",
      },
      {
        line: "\"You're behind on the episodes,\" he says. He's been keeping count for you.",
        approach: "Ask him to catch you up",
      },
      {
        line: "He hands you the second controller. He's already set your profile up.",
        approach: "Grab the second controller",
      },
      {
        line: "The slouch stays. The attention does not. That's entirely on you now.",
        approach: "Let him watch you instead",
      },
      {
        line: "He's got actual snacks stashed for once, and doesn't even pretend they're for anyone but you.",
        approach: "Steal the good snacks",
      },
      {
        line: '"Don\'t judge the queue," he says, already scrolling to the next episode before you sit down.',
        approach: "Don't judge the queue",
      },
      {
        line: "He turns the volume down without you asking, so you can actually hear each other over it.",
        approach: "Acknowledge the gesture",
      },
      {
        line: "The second the diner shift ends, he's already texting you where he's headed next.",
        approach: "Ask what his plans are",
      },
      {
        line: "He holds up the phone to show you an edit he's proud of before you even sit down.",
        approach: "Tell him it's good",
      },
      {
        line: '"You can have the good blanket," he says, like it\'s not a big deal. It is a big deal.',
        approach: "Take the good blanket",
      },
      {
        line: "He complains about his shift the entire walk over, then doesn't leave once he's here.",
        approach: "Point out he's still here",
      },
      {
        line: "He's already memorized your favorite instant noodles toppings. Never once asked.",
        approach: "Let him make it for you",
      },
      {
        line: '"Don\'t make it weird," he says, handing you the controller with your name written on a sticky note stuck to it.',
        approach: "Hold back your grin",
      },
      {
        line: "He pauses the show without complaint the second you start talking. That never used to happen.",
        approach: "Keep talking",
      },
      {
        line: '"You\'re late," he says, not looking up, already scooted over to make room.',
        approach: "Apologize for being late",
      },
      {
        line: "He's rewatching something you both already saw, just because you liked it the first time.",
        approach: "Ask why he's rewatching it",
      },
      {
        line: "The couch cushion's already dented in the shape of two people. He doesn't mention it. Neither do you.",
        approach: "Sit in the usual spot",
      },
    ],
    spark: [
      {
        line: "You fall asleep against his shoulder. He doesn't move for two hours.",
        approach: "Don't move",
      },
      {
        line: '"You\'re kind of in my space," he says, not moving an inch.',
        approach: "Sit closer",
      },
      {
        line: "He looks at you during the quiet part of the episode instead of the screen.",
        approach: "Look back at him",
      },
      {
        line: "The controller goes down. He's looking at you like the game stopped mattering.",
        approach: "Make him say it",
      },
      {
        line: '"...I like you," he says, flat as a weather report, and goes back to the show.',
        approach: "Stay over",
      },
    ],
    close: [
      {
        line: "\"Senpai... look, if it comes down to it, I'm on your side. Obviously.\" The phone's already face down.",
        approach: "Let him have your back",
      },
      {
        line: "He notices you're off before you've said a word, and quietly changes the plan.",
        approach: "Tell him what's wrong",
      },
      {
        line: '"Stay," he says, casual as anything, meaning it more than anything.',
        approach: "Stay as long as you want",
      },
      {
        line: "He plays badly on purpose so the round lasts longer. He'd never admit that.",
        approach: "Flop down next to him",
      },
      {
        line: "The phone stays face down for the entire conversation. That's not nothing.",
        approach: "Notice the phone stays down",
      },
    ],
    bound: [
      {
        line: "You wake up tangled in him and the show has been on the menu screen for six hours.",
        approach: "Take his side of the couch",
      },
      {
        line: '"Don\'t move," he mumbles into your hair. "Seriously. This is perfect."',
        approach: "Don't get up",
      },
      {
        line: "He kisses you lazily, halfway through a level, and loses the level entirely.",
        approach: "Kiss him back",
      },
      {
        line: "He's stopped hiding. He's just quietly, thoroughly yours, and everyone knows it.",
        approach: "Stop hiding it too",
      },
      {
        line: 'He says "love you" like it\'s punctuation now, flat, constant, absolutely meant.',
        approach: "Say it back",
      },
    ],
  },
  temperamentDialogue: {
    new: [
      '"Huh? Oh, didn\'t see you there. You lost or something?"',
      '"...Hey. You can sit, I guess. It\'s not my couch."',
      "\"If you're just gonna stand there, could you go feed the animals in the aquatic zone? I'm too busy.\" (He isn't.)",
      "\"Nah, I'm not doing anything. That's kind of the point.\"",
      '"Cool. Yeah. Anyway."',
    ],
    known: [
      '"Oh, hey. You can sit, if you want. Whatever."',
      '"Preach about doing it for your friends or the animals or whatever all you want. I really don\'t give a shit. People who say that stuff are just deluding themselves."',
      "\"I moved my bag. That's not a big deal, don't make it one.\"",
      "\"You're around a lot lately. It's fine. Not a complaint.\"",
      "\"Don't spoil it. Seriously. I'll leave.\"",
    ],
    warm: [
      "\"Oh, it's you. Yeah, I was hoping you'd show up.\"",
      '"Second controller\'s charged. No reason. Shut up."',
      '"You look wrecked. Sit down, I\'ll find something dumb to watch."',
      '"Took you long enough. Not that I was counting."',
      '"You want the good snacks? I hid them. From everyone but you."',
    ],
    spark: [
      "\"Don't move. You're comfortable. That's... yeah. Don't move.\"",
      '"I said it already. I\'m not saying it twice. ...Fine. I like you."',
      '"You can sit closer. Obviously. Why are you making me say it."',
      "\"Stay over. Couch is fine. I'm fine. Everything's fine.\"",
      '"You keep falling asleep on me. I keep letting you. Draw your own conclusions."',
    ],
    close: [
      "\"Hey, Senpai... I'm really glad you're here. More than you know.\"",
      "\"Something's up with you. Don't bother lying, just tell me.\"",
      '"You can stay as long as you want. Seriously. As long as you want."',
      '"I don\'t do this with anybody else. You get that, right?"',
      "\"If someone's giving you trouble, say the word. I'll stop being lazy.\"",
    ],
    bound: [
      '"Don\'t get up. Seriously. Stay right there."',
      '"Love you. Yeah, I know I said it this morning. Still true."',
      '"Come back to bed, Senpai. The game\'s not going anywhere."',
      "\"You're on my side of the couch. That's fine. That's ideal, actually.\"",
      "\"I'm not good at big gestures. This is the gesture. You, here. That's it.\"",
    ],
  },
  responses: {
    // playful is Ren's register — dry banter, gaming, teasing his video hobby; it
    // lands hardest (affinityByResponse.playful = 2). kind reaches him too, but
    // only low-key and unsentimental (1). bold glances off — he deflects
    // forwardness rather than meeting it (0), so those moves read as the player
    // pushing and Ren not biting.
    kind: {
      new: ["Be steady with him", "Match his quiet", "Don't make it a thing"],
      spark: [
        "Say it back, low-key",
        "Stay on his shoulder",
        "Let him off the hook",
      ],
      close: [
        "Tell him he's off the clock",
        "Tell him he's not lazy",
        "Say you'll stick it out",
      ],
      bound: ["Say it back", "Stay right there", "Let him keep hold"],
    },
    playful: {
      new: [
        "Trade flat lines with him",
        "Tease him about his videos",
        "Challenge him to a round",
      ],
      spark: [
        "Make him say it twice",
        "Out-blank him",
        "Pause it to mess with him",
      ],
      close: [
        "Get a real laugh out of him",
        "Beat him at his own game",
        "Steal his hoodie",
      ],
      bound: [
        "Lose the level for him",
        "Hog the whole couch",
        "Make him say it again",
      ],
    },
    bold: {
      new: [
        "Ask the blunt question",
        "Sit far too close",
        "Put it right out there",
      ],
      spark: ["Say it first", "Sit closer without asking", "Stay over"],
      close: [
        "Name what this is",
        "Push him to stop hiding",
        "Say it before he does",
      ],
      bound: ["Pull him back to bed", "Say it first", "Turn the game off"],
    },
    neutral: {
      new: ["Let him be", "Watch the screen with him", "Say nothing at all"],
      spark: ["Let the episode run", "Move over", "Pretend you were asleep"],
      close: [
        "Be quiet with him",
        "Share the couch in silence",
        "Let the episode run",
      ],
      bound: ["Let the menu screen run", "Stay still", "Fall back asleep"],
    },
  },
  // The /call reveal lines for this character, keyed by the register in
  // WINNER_LINE_BUCKETS (constants/publicEncounters.js). Picked from at random
  // like the dialogue; {user} is the winner's mention and {name} their full
  // name, and the embed's winner line is the only place the reveal names
  // either of them. A register left out here falls back to the generic
  // WINNER_LINES pool.
  winnerLines: {
    new: [
      "One earbud comes out for {user}. **{name}** leaves the other in.",
      '"Oh. Hey." **{name}** is mildly impressed {user} found him at all.',
      "{user} says the name, and **{name}** pauses the game. Doesn't unpause it, either.",
    ],
    warm: [
      "**{name}** puts the phone down for {user}, and doesn't pick it back up.",
      "\"You're behind on the episodes,\" **{name}** tells {user}, who didn't know he'd been counting.",
      "{user} calls out, and **{name}** shifts over. The space is for them.",
    ],
    spark: [
      "\"Second controller's charged.\" **{name}** says it to {user} like it isn't a confession.",
      "{user} says the name, and **{name}** goes very deliberately blank-faced about it.",
      "**{name}** was in the one spot on campus nobody looks. {user} looked.",
    ],
    close: [
      '"Don\'t move. Seriously." **{name}** arrives at {user} and stays exactly there.',
      "**{name}** loses the run because {user} called his name.",
      "{user} calls, and **{name}** pockets the phone and straightens up.",
    ],
    bound: [
      "\"Found me again. Pretty sure that's not luck anymore, Senpai.\" **{name}** doesn't dress it up for {user}.",
      "**{name}** reaches {user} and puts his chin on their shoulder. That was the whole plan.",
      "{user} says the name, and **{name}** decides the **{house}** roster can manage without him.",
    ],
  },
};
