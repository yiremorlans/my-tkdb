export default {
  // The level-up DMs (docs/bond-scene-dms.md). Mio doesn't make speeches, he
  // makes objects, so every scene here is a thing he built plus the plain
  // sentence it stood in for. He isn't fumbling for words; building is just his
  // register, and he undercuts the warm line every time. The intimacy is that
  // the objects get more and more obviously about you, until at Soulbound he
  // says it outright, flat, and goes straight back to talking about your latch.
  bondScenes: {
    acquaintance: {
      beats: [
        "**{firstName}**: This is Mio. Dionysia, the toolbox. You already know who I am, so I'll skip the rest.",
        "Your door's sticking. The bottom hinge has dropped about two millimeters and the frame's swollen with the damp. Five minute fix. I've walked past it four times.\n\nSo I'm asking. Can I fix your door.\n\n...We've talked {timesMet} times and it's always been maintenance. I did notice that.",
      ],
      choice: {
        prompt: "Yes or no on the hinge.",
        options: [
          {
            key: "kind",
            label: "Say yes, and thank him",
            style: 3,
            close:
              "It's a hinge.\n\n...Thanks for saying thanks, though. Most people just stop noticing the door.",
          },
          {
            key: "playful",
            label: "Ask what else is broken",
            style: 1,
            close:
              "Your window latch, the second stair, and whatever you did to that chair.\n\nI keep a list. Don't read anything into the list.",
          },
          {
            key: "bold",
            label: "Ask him to stay after",
            style: 4,
            close:
              "*A pause.*\n\nStay after and do what?\n\n...Fine. Yes. I'll bring the good tea. Shion drinks all of it, so I keep some hidden.",
          },
        ],
      },
      keepsake: {
        emoji: "🔩",
        line: "A door that stopped sticking, from the one person who kept walking past it.",
      },
    },

    friend: {
      beats: [
        "**{firstName}**: Made you something. It's small. Don't make it a thing.",
        "*The photo is a brass mechanism about the size of a matchbox, with a fold-out arm.*\n\nIt's a doorstop. Clockwork, because I couldn't help myself. It lets go once the room drops past a set temperature, so your door shuts itself when that corridor gets cold, around three.",
        "You leave it propped open. You've got {favResponse} for everyone, me included. I notice things and then build about them instead of saying them. Jo calls that a personality problem.\n\nAnyway. Doorstop.",
      ],
      choice: {
        prompt:
          "That's the message. You don't have to answer it.",
        options: [
          {
            key: "kind",
            label: "Say nobody's done that",
            style: 3,
            close:
              "...Oh.\n\n*A few minutes later:* I've built two hundred of these. Haru's arm, Romeo's leg. People just start using them, which is the job and that's fine.\n\nNobody's put it the way you did. Give me a minute.",
          },
          {
            key: "playful",
            label: "Ask what it does at three",
            style: 1,
            close:
              "Nothing. It's a doorstop.\n\n...It chimes. Very quietly. I can take that out. Don't, actually. I like it.",
          },
          {
            key: "bold",
            label: "Ask him to fit it himself",
            style: 4,
            close:
              "*He's at your door in eleven minutes with the toolbox, and it takes him four times as long as it should because his hands won't settle.*\n\n*He tells the doorframe, not you:*\n\n> I'll come check it. Regularly.\n\n*It will not need checking.*",
          },
        ],
      },
      keepsake: {
        emoji: "⚙️",
        line: "A clockwork doorstop that chimes at three and won't say why.",
      },
    },

    closeFriend: {
      beats: [
        "**{firstName}**: You up? I'm in the workshop. Come down if you are. Don't get up if you're not, it's not important.",
        "*Three in the morning, and he clearly hasn't slept. The bench holds the same small mechanism built eleven times over, ten of them wrong.*\n\n> Shion had a bad night. I've been up with him since one, and now I can't stop, so I'm doing this instead.",
        "*He puts the file down.*\n\n> Everyone here thinks I've got it handled. Jo, Elias, Shion. And I have got it handled, I'm not complaining. I'd do it forever.\n\n> I just wanted one person to have seen the bench look like this. That's all. Go back to bed.",
      ],
      choice: {
        prompt:
          "...That wasn't fair to send. Say something and I'll pretend I didn't.",
        options: [
          {
            key: "kind",
            label: "Sit down and stay",
            style: 3,
            close:
              "*You pull the other stool over and sit. He doesn't comment on it.*\n\n*Around five he gets the eleventh one right, holds it up, and looks at you properly for the first time all night.*\n\n> Thanks for not leaving.\n\n*A beat.*\n\n> That was the whole thing, and I couldn't ask for it.",
          },
          {
            key: "playful",
            label: "Count the failures for him",
            style: 1,
            close:
              "> Ten. I know it's ten. I've been staring at them for two hours.\n\n*Something that's almost a laugh.*\n\n> Tell me it's eleven again in an hour. I'd sooner be wound up than fussed over.",
          },
          {
            key: "bold",
            label: "Ask who looks after him",
            style: 4,
            close:
              "*He goes still.*\n\n> That's not how it works. He's my brother.\n\n*Quieter, at the bench:*\n\n> Nobody. It's nobody, and you're the first person who's made me say it out loud. You can stop now.\n\n*He doesn't move off when you put a hand on his back. He leans into it, a little.*",
          },
        ],
      },
      keepsake: {
        emoji: "🔧",
        line: "Ten failed attempts on a bench, and one person there to see them.",
      },
    },

    confidant: {
      beats: [
        "**{firstName}**: I'm going to tell you something about Shion. It doesn't leave this DM. Not Jo, not anyone.",
        "He's my older brother. Everyone reads it the other way because of how it looks now, and I've let them, for six years.\n\nWhen we were kids, he was the one who came and got me. Every time, wherever I'd ended up. He was frightening about it even then. I never minded.",
        "Then something happened that I won't go into. Now I'm the one who turns up, and he doesn't remember that it used to be him.\n\nI'd do it another sixty years, so don't hear this wrong. I just miss having a brother instead of a duty.\n\n(I've got a real kid brother and sister back home. I miss them the ordinary way. This isn't that.)",
      ],
      choice: {
        prompt:
          "Say something back.",
        options: [
          {
            key: "kind",
            label: "Say he's allowed to miss it",
            style: 3,
            close:
              "*The reply takes a while.*\n\nNot sure I am. But I'll sit here with you saying it.\n\n*Later:* Still there? Don't answer. I just want the two ticks.\n\n*You stay up. He checks four more times.*",
          },
          {
            key: "playful",
            label: "Say you'd have guessed older",
            style: 1,
            close:
              "You would not have.\n\n...You might have. He's got eight inches on me and a temper like a house fire.\n\nThat helped more than the serious version would have. Don't repeat the house fire part.",
          },
          {
            key: "bold",
            label: "Tell him to say it to Shion",
            style: 4,
            close:
              "No.\n\n*Immediate. Then a long silence.*\n\n...He'd hear it as me being tired of him. As me leaving. He's spent his whole life waiting for someone to, and I made a job out of being the one who doesn't.\n\nAsk me again in a year. You will, won't you.",
          },
        ],
      },
      keepsake: {
        emoji: "🖼️",
        line: "The older brother is the one nobody would guess.",
      },
    },

    devoted: {
      beats: [
        "**{firstName}**: Don't be angry.",
        "*The photo is his forearm, bandaged wrist to elbow. Behind it on the bench, something bent badly out of true.*\n\nThe gantry in the lower hall was coming down and you were under it. No time to do it properly, so I did it improperly. I had about four seconds. It held for six.\n\nNormally I'd tell you to spit on it and it'll heal. I've told Shion that more times than I can count. Not this time.",
        "Here's the honest part. I run the numbers on everything before anyone moves. Every load, every risk. That's the job, and it's most of me.\n\nThis time I didn't run anything. I looked up, saw where you were standing, and my hands were already on the gantry.\n\nSix years, and that has not happened once.",
      ],
      choice: {
        prompt: "You can be angry. I'd honestly prefer it.",
        options: [
          {
            key: "kind",
            label: "Ask to see the arm",
            style: 3,
            close:
              "It's a boring arm.\n\n*It is not, and he lets you redo the bandage anyway, sleeve pushed up, sitting on the workshop stool and watching your hands the whole time without a word.*\n\n> You're better at this than I am.\n\n*It's the only thing he says for an hour.*",
          },
          {
            key: "playful",
            label: "Say six over four is a brag",
            style: 1,
            close:
              "It's a fifty percent margin. That's competent engineering, not showing off.\n\n...It was showing off. Slightly. With nobody watching, which makes it worse.",
          },
          {
            key: "bold",
            label: "Give the thing a name for him",
            style: 4,
            close:
              "*You tell him what to call it.*\n\n*The typing indicator comes on and goes off, four separate times.*\n\n...Right. Yes. That's the word. I knew it was that word.\n\nGive me a minute. Don't go anywhere.",
          },
        ],
      },
      keepsake: {
        emoji: "🧮",
        line: "Four seconds of math he didn't stop to do.",
      },
    },

    soulbound: {
      beats: [
        "**{firstName}**: I built a thing. I'm going to describe it, then say the actual sentence, because a thing on its own still has to be guessed at and you've done enough of that.",
        "*The photo is a small brass box with two dials. One shows a number. The other is blank.*\n\nFirst dial is {timesMet}. It climbs on its own. I wired it to the door sensor, which took a month and is completely absurd.\n\nSecond dial doesn't do anything yet. I couldn't work out what it was for. That's been the problem for about eight months.",
        "I've made you a doorstop, a latch, a lamp, the thing that chimes at three, and forty other objects. Every one of them stood in for something I hadn't said.\n\nMy dad gave me a wind-up music box when I was small. No words on it, and I still knew. That's probably where all of this started.\n\nYou kept every piece. I noticed that too.",
        "So. The second dial.\n\nI love you. Since roughly the hinge. I built around it for a year because that's how I say things. The blank dial was always where the sentence went. I just hadn't put it there.\n\nThere it is, in words. Sending it before I take the dial off the box.",
      ],
      choice: {
        prompt:
          "There. You don't have to do anything with that. It's just out of the box now.",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close:
              "*Nothing at all for six minutes.*\n\n*Then footsteps on the stairs, fast, which Mio never does, and he's at your door with the box still in his hand and no plan for having arrived.*\n\n*He sets it down. Takes your face in both hands, careful, the way he handles anything he's scared of breaking, and kisses you. It is the least careful thing he has ever done.*",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close:
              "Yes. Obviously. Take as long as you want.\n\nI spent a year not saying it. I'm not going to hand it over and start a clock on you.\n\nI'm still fixing your latch. And the second stair you keep ignoring. None of that was ever about this. I'd have done it if you'd never spoken to me at all. It's just what I do about people.\n\n*The box stays on your shelf. The first dial keeps climbing.*",
          },
        ],
      },
      keepsake: {
        emoji: "🎛️",
        line: "A brass box with two dials, and the blank one finally filled.",
      },
    },
  },
  dialogue: {
    new: [
      "He looks up from tinkering with something, hands still steady. There's a ready smile for you.",
      "Tiny gears are laid out in perfect order across the bench. He moves one aside for you to sit.",
      '"Give me one second," he says, and finishes the movement without a single wasted motion.',
      "\"Whoa, hold up. You don't wanna run here, trust me. The floor's not level.\"",
      "He's the calmest thing in a very loud house, and he seems to know it's his job.",
    ],
    known: [
      "He's learned your name, your order, and roughly when you turn up.",
      "The stool is already pulled out. He'd say it always is. It isn't.",
      '"Back again? Good. Hold this." You\'re being included, in his way.',
      "He asks about the thing you mentioned last week, and wants the actual answer.",
      '"Hey, Honor Roll. One more day. Let\'s power through."',
    ],
    warm: [
      "He sets his work aside immediately, fully present for you, reliable as always.",
      "He's already fixed the thing you mentioned in passing last time. He won't bring it up.",
      '"You look like you need to sit down and complain about something. Go ahead."',
      '"(Sigh) Shion wrecked it again, huh? I was running low on parts. Walk with me to the store?"',
      "Two people were arguing when you walked in. Somehow they aren't anymore.",
    ],
    spark: [
      "The steady hands aren't steady. He notices you noticing.",
      "He fixes your watch strap and keeps hold of your wrist afterward.",
      '"I\'m usually better at saying things," he admits. "This one keeps not coming out."',
      "He's the calm one. He is not calm right now, and it's entirely your fault.",
      "He looks up from the bench and doesn't look away when you catch him.",
    ],
    close: [
      '"You know you can always count on me, right?" he says warmly. "For anything you need."',
      "He asks how you really are, and then waits, properly waits, for the real answer.",
      '"I keep this one wound for you," he says, showing you the little mechanism. "No reason."',
      "He's the one everyone leans on. With you, he lets himself lean back.",
      "The steady hands go still when you take them. He lets that happen.",
    ],
    bound: [
      "The steady hands are steady again, and they know exactly what they're doing.",
      "He fixes your necklace clasp, kisses the back of your neck, and goes back to work.",
      '"You undo me," he says calmly, which from him is practically shouting.',
      "He holds you like something he intends to keep in working order forever.",
      "He's the calm one. In the dark he is not calm at all, and it's a revelation.",
    ],
  },
  temperamentDialogue: {
    new: [
      '"Oh! Welcome! Can I get you anything?"',
      '"Mind the bench, everything on it is smaller than it looks."',
      "\"You're new, right? Don't worry, this house is friendlier than it sounds.\"",
      "\"Sit anywhere. I'll clear a space. I'm always clearing a space.\"",
      "\"Careful, the floor's not level here. You really don't wanna run.\"",
    ],
    known: [
      '"Hey! Good timing, I was about to take a break anyway."',
      '"Hold this a sec. Congratulations, you\'re an apprentice now."',
      '"How\'d that thing turn out? The one from last week."',
      '"You think I look busy? Takes one to know one. Make sure you give yourself a break every once in a while."',
      '"Oh, hey. I was just heading to the campus store. Not really shopping... more like restocking. Come along?"',
    ],
    warm: [
      "\"It's nice seeing you. You know you're always welcome here.\"",
      '"Perfect timing. I needed an excuse to stop."',
      '"How\'s it going? And I mean actually, not the polite version."',
      '"I fixed that thing you mentioned. It was bugging me too."',
      '"Sit. Hold this. There, now you\'re helping."',
    ],
    spark: [
      '"Give me your hand a sec. ...Okay, I don\'t actually need it. I just wanted it."',
      '"I hold everyone together. You\'re the thing that undoes me. Bit inconvenient."',
      '"Stay past closing. Please. That\'s not an artisan asking."',
      '"You keep sitting that close. I keep letting you. Neither of us is subtle."',
      "\"I've been trying to say this since spring. I'm still trying.\"",
    ],
    close: [
      '"You\'ve become someone really important to me. I hope you know that."',
      '"Anything you need. I mean that literally. Test it sometime."',
      "\"You're the only one who asks how I'm doing. It gets me every time.\"",
      '"Stay as long as you want. I like the workshop better with you in it."',
      '"I hold everyone together around here. You hold me. Fair trade."',
    ],
    bound: [
      '"Stay. The workshop\'s not going anywhere. Neither am I."',
      '"I love you. Took me eleven months to say it. I\'ll say it daily to make up the deficit."',
      '"Come here. Yeah, just like that. Don\'t move."',
      "\"Everyone leans on me. You're the one I lean back on. Do you know what that's worth?\"",
      '"Close the door. Not for anything sinister. Okay, somewhat sinister."',
    ],
  },
  approach: {
    new: [
      "Sit at the workbench",
      "Ask what he's fixing",
      "Take the cleared space",
      "Wait for him to finish",
    ],
    known: [
      "Take the pulled-out stool",
      "Hold this a second",
      "Answer about last week",
      "Stay a while",
    ],
    warm: [
      "Pull up a stool",
      "Hold the small gear",
      "Complain about your day",
      "Ask him to stop working",
    ],
    spark: [
      "Give him your hand",
      "Stay past closing",
      "Sit closer",
      "Let him try to say it",
    ],
    close: [
      "Go sit beside him",
      "Ask how he's really doing",
      "Take his hands",
      "Stay as long as you want",
    ],
    bound: ["Close the door", "Come here", "Stay", "Let him lean back"],
  },
  responses: {
    // kind is Mio's channel (affinityByResponse.kind = 2): he pours care outward
    // and waves off anything coming back ("Make sure you give yourself a break",
    // "I don't need much sleep", "bit of spit and it'll heal"), so noticing him,
    // telling him to rest, and letting him lean is what actually lands. playful
    // reaches him too (1): dry banter and fake-scares ("Boo! Ha ha, did I scare
    // you?") are a register he enjoys, but they double as his deflection, so
    // they land softer. bold glances off (0): he can't finish his own confession
    // ("This one keeps not coming out") and undercuts sincerity the moment it
    // turns heavy, so a blunt push reads as the player pressing and Mio easing
    // back rather than meeting it.
    kind: {
      new: [
        "Notice how much he does",
        "Tell him to actually rest",
        "Thank him, and mean it",
      ],
      spark: [
        "Give him your hand",
        "Tell him to take his time",
        "Say it for him, gently",
      ],
      close: [
        "Tell him he matters too",
        "Ask what he needs for once",
        "Let him lean on you",
      ],
      bound: ["Let him lean on you", "Say it back", "Tell him what it's worth"],
    },
    playful: {
      new: [
        "Share a laugh",
        "Fake-scare him back",
        "Give him a fake emergency",
      ],
      spark: ["Sit closer still", "Catch him looking again", "Wind him up"],
      close: [
        "Make him laugh genuinely",
        "Drag him out of the workshop",
        "Wind up his clockwork",
      ],
      bound: [
        "Close the door yourself",
        "Undo the clasp again",
        "Make the calm one falter",
      ],
    },
    bold: {
      new: [
        "Say you came just for him",
        "Ask him for a favor",
        "Hold his gaze",
      ],
      spark: [
        "Stay past closing",
        "Keep hold of his wrist",
        "Say the thing he can't",
      ],
      close: [
        "Be bold enough to need him",
        "Tell him to stop fixing",
        "Take the work out of his hands",
      ],
      bound: [
        "Pull him from the bench",
        "Say it first",
        "Tell him not to move",
      ],
    },
    neutral: {
      new: ["Be there for him", "Watch him work", "Let the workshop hum"],
      spark: ["Let him find the words", "Let go first", "Let the phone ring"],
      close: [
        "Sit with him",
        "Keep him company in silence",
        "Let him finish the movement",
      ],
      bound: [
        "Let him finish the piece",
        "Sit in the quiet",
        "Let the clocks tick",
      ],
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
      "**{name}** looks up from something tiny and intricate, and has a ready smile for {user}.",
      '{user} says the name, and **{name}** sets the tweezers down. "Huh. Good eye."',
      '"Careful, everything I\'m carrying is smaller than it looks." **{name}** tells {user} that first, hello second.',
    ],
    warm: [
      "**{name}** sets the work aside completely. {user} gets his whole attention, as usual.",
      '"Perfect timing. I needed an excuse to stop." **{name}** tells {user} that every time.',
      "{user} calls out, and **{name}** has already fixed the thing they mentioned last week.",
    ],
    spark: [
      "**{name}**'s steady hands are, briefly, not steady. {user} pretends not to notice.",
      '"Ha ha. Kidding." **{name}** wasn\'t, and {user} is getting good at telling.',
      "{user} says the name, and **{name}** loses the thread of what he was building.",
    ],
    close: [
      '"You undo me," **{name}** says calmly to {user}, which from him is shouting.',
      "**{name}** hears {user} and leaves a repair half-finished, which he has never once done.",
      "{user} calls, and **{name}** gets there before Shion can invent an emergency.",
    ],
    bound: [
      '"I love you. I\'ll say it daily to make up the deficit." **{name}** greets {user} with it, deadpan.',
      "**{name}** rests his forehead on {user}'s shoulder for about three seconds, then goes right back to complaining about his day.",
      "{user} says the name, and **{name}**, who never asks for anything, asks {user} to stay.",
    ],
  },
};
