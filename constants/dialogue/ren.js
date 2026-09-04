export default {
  // The level-up DMs (docs/bond-scene-dms.md). Ren says enormous things in the
  // flattest possible register and then immediately changes the subject to a
  // show. The arc is the gap between the two closing — by Soulbound he is still
  // deadpan, he has just stopped changing the subject.
  bondScenes: {
    acquaintance: {
      beats: [
        '**{firstName}**: "hey senpai"\n\n"[link]"\n\n"don\'t open that during a shift. or do. I\'m not your supervisor"',
        "*You open it. It's an invite code for the gacha game he's been grinding on his phone between shifts, already redeemed under your name, starter items and all.*\n\n\"Needed a second account for the co-op event. Yours was just... convenient.\"\n\n\"I've sent {timesMet} of those out before. Deleted every account before it finished downloading. I haven't deleted this one, which I've decided not to think about too hard.\"",
      ],
      choice: {
        prompt:
          '"Anyway. Rate my starter build out of ten. Be honest, I can take it, I\'m extremely well adjusted."',
        options: [
          {
            key: "kind",
            label: "Give it a ten",
            style: 3,
            close:
              '"A ten."\n\n*A pause.*\n\n"You\'ve inflated the currency. Now I have to actually optimize it. This is your fault and I\'m going to be up until four."',
          },
          {
            key: "playful",
            label: "Give it a six",
            style: 1,
            close:
              "\"A SIX.\"\n\n\"Okay. Okay, that's fair, the accessory slots are a mess. I hate that you're right. I'm re-rolling your loadout in about an hour, don't go to sleep.\"",
          },
          {
            key: "bold",
            label: "Ask to join his guild",
            style: 4,
            close:
              '"My guild?"\n\n*A long gap.*\n\n"...Yeah, alright. Give me a sec, I have to kick somebody first."\n\n*He kicks somebody. He never says who.*',
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
        '**{firstName}**: "ok this is going to sound like a normal question and it isn\'t one"',
        '"You come back with {favResponse}. Every time. Even the times I\'ve barely said anything back, which is most of them."\n\n"People usually give up. Like, genuinely, it\'s not a complaint, I know what I\'m like. I\'m the guy with one earbud in. Most people take that as the whole conversation and leave, which is completely correct of them."\n\n"You never leave. You just sit there until I take the other one out. Nobody\'s ever waited me out before."',
      ],
      choice: {
        prompt: "\"So what's the strategy. There's clearly a strategy.\"",
        options: [
          {
            key: "kind",
            label: "Say there's no strategy",
            style: 3,
            close:
              '"There\'s always a strategy."\n\n*A pause.*\n\n"...huh. Okay. There isn\'t, is there."\n\n"That\'s worse actually. That\'s so much worse. I\'m going to lie down."',
          },
          {
            key: "playful",
            label: "Say you're waiting him out",
            style: 1,
            close:
              "\"That's not a strategy, that's a siege.\"\n\n\"It's working. I want that on record. It's working and I've fully surrendered and you didn't even bring equipment.\"",
          },
          {
            key: "bold",
            label: "Tell him to take it out",
            style: 4,
            close:
              '*It\'s a photo, thirty seconds later. Both earbuds, on the table, next to his phone.*\n\n"There. Happy?"\n\n*Then:* "...Don\'t answer that. I know the answer. It\'s annoying that I know the answer."',
          },
        ],
      },
      keepsake: {
        emoji: "🎧",
        line: "A photo of both earbuds on a table.",
      },
    },

    closeFriend: {
      beats: [
        '**{firstName}**: "diner. after close. I\'ll leave the back door"',
        "*The place is dark and the chairs are up and he's behind the counter making something that isn't on the menu, with a paused game glowing on the little screen wedged behind the milkshake machine and a second controller charging next to the till for reasons he hasn't explained yet.*\n\n\"I do this every Thursday. Have done since I got here. It's the only two hours a week nobody wants anything off me.\"",
        "\"I've never told anyone about it. Not because it's a secret, just because if people knew it'd become a thing, and then it'd stop being the two hours.\"\n\n*He slides the plate over without pausing the game.*\n\n\"You're in it now. Congratulations. You've halved my only two hours and I'm somehow fine about it, which I'd like a doctor to look at.\"",
      ],
      choice: {
        prompt:
          "\"Sit down. Controller's already charged, don't make it weird.\"",
        options: [
          {
            key: "kind",
            label: "Say you'll keep it quiet",
            style: 3,
            close:
              '"...yeah. Cheers."\n\n*He doesn\'t say anything else about it. But he unplugs the second controller and just leaves it sitting in front of you, which is the largest gesture he has ever made.*',
          },
          {
            key: "playful",
            label: "Ask how long he's been losing",
            style: 1,
            close:
              "\"Since round one. I've been losing on purpose so you'd stick around, which is humiliating to say out loud.\"\n\n\"...I'm still not letting you win the next one, though. There's limits.\"",
          },
          {
            key: "bold",
            label: "Sit on his side of the counter",
            style: 4,
            close:
              "*He looks at the space you've taken for a second, then just shoves the controller into your hands instead of arguing about it.*\n\n*Somewhere in the second match you fall asleep against his shoulder, and he keeps playing one-handed for two hours rather than wake you up to switch you out.*\n\n*He never mentions it. He starts leaving a cushion on that side of the counter, though.*",
          },
        ],
      },
      keepsake: {
        emoji: "🎮",
        line: "A second controller that was somehow already charged.",
      },
    },

    confidant: {
      beats: [
        '**{firstName}**: "you up? doesn\'t matter. reading this tomorrow is fine."',
        "\"So my family called. Summer was the busy period back home and I did the whole thing: every year, whole break, killed myself helping out and never once said anything about it because saying something wasn't really an option in our house.\"\n\n\"And I came here and I thought, right, that's over, I'm out. And it turns out it doesn't matter what I say. Haru's literally put a tracker on me before, to drag me out when I go quiet for too long. I complain about every shift, every tour edit, every time I have to go hunt down Towa. I still do every single one of them anyway.\"",
        "\"I think complaining and actually refusing aren't the same thing, and I only just noticed I've never once managed the second one.\"\n\n\"Most nights I just grind some pointless game on my phone until I pass out, because it doesn't need anything back from me. Except Thursdays. That's the only two hours in my life where somebody's actually there and nothing's still expected of me, and I have to physically lock a door to get them.\"\n\n\"Anyway. That's the deepest thing I've ever typed and I'm putting my phone in another room now.\"",
      ],
      choice: {
        prompt: '"Say something normal so I can pretend that was normal."',
        options: [
          {
            key: "kind",
            label: "Say you don't need anything",
            style: 3,
            close:
              "*There's a long gap.*\n\n\"...I know.\"\n\n\"That's the whole reason it's you on Thursdays. Took me about six months to work out why and then I just didn't look at it directly for another four.\"",
          },
          {
            key: "playful",
            label: "Ask him for a favor",
            style: 1,
            close:
              '"Oh, immediately? Straight in?"\n\n"...go on then. What is it."\n\n*You ask him to do nothing for an hour. He calls you a menace and then actually does it, and reports back afterwards that it was horrible and he might try it again.*',
          },
          {
            key: "bold",
            label: "Tell him it's okay to refuse",
            style: 4,
            close:
              '"Can\'t. If I stop, what\'s left."\n\n*Then, four minutes later:*\n\n"That was a bad sentence. I\'ve read it back. Don\'t answer it, I don\'t think I want the answer yet."\n\n"...Ask me again on a Thursday."',
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
        '**{firstName}**: "don\'t be weird about this"',
        "*It's a screenshot of a phone's home screen. There's an alarm on it, set for a time that means nothing, labeled with your name.*\n\n\"It's for when your last class ends. I set it about three months ago so I'd know when to stop being anywhere else.\"\n\n\"I have never once told you I was waiting. I've just always happened to be in the courtyard. Every time. Three months of happening to be in the courtyard.\"",
        "\"Tonight you came out late and I'd been there forty minutes, technically grinding the same event on my phone the whole time so it looked like I was just there for the game, and Haru saw me and did a whole face about it, and I realized I've been running an entire secret operation to look casual and it is genuinely more effort than just saying it.\"\n\n\"So: I wasn't happening to be there. Not once. That's the message.\"",
      ],
      choice: {
        prompt: '"Okay. That\'s it. You can react."',
        options: [
          {
            key: "kind",
            label: "Say you always hoped he'd be",
            style: 3,
            close:
              '"...say that again."\n\n"No, don\'t. I heard it. I\'m just... give me a second."\n\n*The second is nine minutes long. Then:* "Okay. Alarm stays. Obviously the alarm stays."',
          },
          {
            key: "playful",
            label: "Ask what the alarm sound is",
            style: 1,
            close:
              "\"It's the diner's fire alarm. I recorded it. It's the most annoying sound in the building.\"\n\n\"That's on purpose. If it was nice I'd snooze it. I've never snoozed it. Not once in three months.\"",
          },
          {
            key: "bold",
            label: "Tell him to wait inside",
            style: 4,
            close:
              "*There's a pause.*\n\n\"Inside's worse. Inside's obvious.\"\n\n*Then, much later, from the courtyard:* \"...I'm outside. I'm outside right now, actually, I've been typing this from the wall.\"\n\n*When you come out he doesn't get up. He just holds a hand out until you take it, and stays sitting on the cold wall holding onto it for a good twenty minutes without saying anything at all.*",
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
        '**{firstName}**: "ok. no bit. no link. I\'m not sending you a code instead of just saying this."',
        "\"{timesMet} times. I've got a save file for basically all of them. Every pointless co-op grind, every event, going back to that first invite code. At some point I stopped playing them for the loot and started playing them because you'd be on the other account.\"\n\n\"Nobody's ever seen that save file. It's the least ironic thing I own.\"",
        "\"Here's the actual thing. I say massive stuff in the smallest possible voice. I know I do it. I said 'I like you' once like I was reading the weather and you just went with it, and I've thought about that literally hundreds of times since.\"\n\n\"I do it because if I say something flat and it doesn't land, it wasn't really said. That's the whole system. It's a very good system and it's kept me safe for about twenty years.\"",
        "\"So I'm turning it off. Once. Right now.\"\n\n\"I love you. Not deadpan. Not as a bit. Not with a clip after it.\"\n\n\"Love you, senpai. Have done for ages. That's the one I've been saving and it's the only thing I've ever said that I couldn't put a joke on the end of.\"",
      ],
      choice: {
        prompt: '"Take your time. I\'ve got a whole save file to get through."',
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close:
              '*The typing indicator goes on and off about six times.*\n\n*Then:* "back door\'s open."\n\n*He\'s behind the counter when you get there and he doesn\'t do the deadpan thing once. He comes round the front, takes your face in both hands, and kisses you like a man who has been running a very good system for twenty years and has just decided the system was rubbish.*\n\n"Yeah, I know I said it already," *he says afterwards.* "I\'m going to keep saying it."',
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close:
              "\"Yeah, course.\"\n\n*A pause. Then, without a single flat note in it:*\n\n\"For real. Take ages. I've been sitting on it for a year, it's not going to go off.\"\n\n\"Thursday's still Thursday. That was never a move. I'd have given you the two hours whatever you said tonight. That's not me being noble, that's just genuinely how it is.\"\n\n*The cushion stays on your side of the counter. He never says anything about that either.*",
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
      'He\'s scrolling through his phone, barely acknowledging you at first. "Oh. Hey."',
      "One earbud comes out. That's the entire greeting, and it's more than most people get.",
      "He's found the one spot in the whole building where nobody looks. You found him anyway.",
      '"...You need something?" He sounds like he hopes the answer is no.',
      "\"Shift at the Darkwick Mystery Diner. Summer was our busy period back home, so I always killed myself helping out. Now I'm here though... nothing's changed.\"",
    ],
    known: [
      "Both earbuds come out. That's a significant escalation.",
      "\"Oh, it's you,\" he says, and doesn't go back to the phone right away.",
      '"Oh, Senpai... could you open the link I sent you? No, you don\'t have to sign up or anything. Thanks."',
      "He asks if you've seen the thing. He's asking because he wants to talk about it.",
      "He remembers what you said about the ending. He'd been thinking about it.",
    ],
    warm: [
      "He actually puts his phone down when you arrive. Doesn't pick it back up, either.",
      "He shifts over on the couch without looking up. The space is for you.",
      "\"You're behind on the episodes,\" he says. He's been keeping count for you.",
      "He hands you the second controller. He's already set your profile up.",
      "The slouch stays. The attention does not. That's entirely on you now.",
    ],
    spark: [
      "You fall asleep against his shoulder. He doesn't move for two hours.",
      '"You\'re kind of in my space," he says, not moving an inch.',
      "He looks at you during the quiet part of the episode instead of the screen.",
      "The controller goes down. He's looking at you like the game stopped mattering.",
      '"...I like you," he says, flat as a weather report, and goes back to the show.',
    ],
    close: [
      "\"Senpai... look, if it comes down to it, I'm on your side. Obviously. Don't make it weird.\" The phone's already face down.",
      "He notices you're off before you've said a word, and quietly changes the plan.",
      '"Stay," he says, casual as anything, meaning it more than anything.',
      "He plays badly on purpose so the round lasts longer. He'd never admit that.",
      "The phone stays face down for the entire conversation. That's not nothing.",
    ],
    bound: [
      "You wake up tangled in him and the show has been on the menu screen for six hours.",
      '"Don\'t move," he mumbles into your hair. "Seriously. This is perfect."',
      "He kisses you lazily, halfway through a level, and loses the level entirely.",
      "He's stopped hiding. He's just quietly, thoroughly yours, and everyone knows it.",
      'He says "love you" like it\'s punctuation now, flat, constant, absolutely meant.',
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
      "\"Hey, senpai... I'm really glad you're here. More than you know.\"",
      "\"Something's up with you. Don't bother lying, just tell me.\"",
      '"You can stay as long as you want. Seriously. As long as you want."',
      '"I don\'t do this with anybody else. You get that, right?"',
      "\"If someone's giving you trouble, say the word. I'll stop being lazy.\"",
    ],
    bound: [
      '"Don\'t get up. Seriously. Stay right there."',
      '"Love you. Yeah, I know I said it this morning. Still true."',
      '"Come back to bed, senpai. The game\'s not going anywhere."',
      "\"You're on my side of the couch. That's fine. That's ideal, actually.\"",
      "\"I'm not good at big gestures. This is the gesture. You, here. That's it.\"",
    ],
  },
  approach: {
    new: [
      "Say hey back",
      "Sit down uninvited",
      "Ask what he's watching",
      "Wait for the earbud",
    ],
    known: [
      "Take the cleared seat",
      "Talk about the ending",
      "Don't spoil it",
      "Sit without asking",
    ],
    warm: [
      "Take the empty space",
      "Grab the second controller",
      "Steal the good snacks",
      "Put your feet up",
    ],
    spark: ["Don't move", "Sit closer", "Stay over", "Make him say it"],
    close: [
      "Flop down next to him",
      "Tell him what's wrong",
      "Stay as long as you want",
      "Let him have your back",
    ],
    bound: [
      "Don't get up",
      "Come back to bed",
      "Take his side of the couch",
      "Say it back",
    ],
  },
  responses: {
    // playful is Ren's register — dry banter, gaming, ribbing the clown; it
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
        "Trade deadpan with him",
        "Rib him about the clown",
        "Challenge him to a round",
      ],
      spark: [
        "Make him say it twice",
        "Out-deadpan him",
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
      "One earbud comes out. From **{name}**, that's a full greeting for {user}.",
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
      "{user} says the name, and **{name}** goes very deliberately deadpan about it.",
      "**{name}** was in the one spot on campus nobody looks. {user} looked.",
    ],
    close: [
      '"Don\'t move. Seriously." **{name}** arrives at {user} and stays exactly there.',
      "**{name}** loses the run because {user} called his name. Worth it, apparently.",
      "{user} calls, and **{name}** pockets the phone and straightens up, both unprecedented.",
    ],
    bound: [
      '"Love you, senpai. Yeah, I know I said it this morning." **{name}** says it to {user} again anyway.',
      "**{name}** reaches {user} and puts his chin on their shoulder. That was the whole plan.",
      "{user} says the name, and **{name}** decides the **{house}** roster can manage without him.",
    ],
  },
};
