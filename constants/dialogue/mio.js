export default {
  // The level-up DMs (docs/bond-scene-dms.md). Mio cannot say a feeling out
  // loud, so he builds things instead — every scene here is an object he made
  // and a sentence he couldn't finish. The intimacy is that the objects get more
  // and more obviously about you, until at Soulbound he finally says it in words
  // and is visibly appalled at himself for having managed it.
  bondScenes: {
    acquaintance: {
      beats: [
        '**{firstName}**: "This is Mio. From Dionysia. The one with the toolbox."\n\n"Sorry, that\'s a stupid way to introduce myself, you know who I am."',
        "\"Your door's been sticking. The bottom hinge has dropped about two millimetres and the frame's swollen. It's a five minute job and I've walked past it four times without saying anything, which is worse than just fixing it.\"\n\n\"So: can I fix it. That's the message. I've been drafting it since Tuesday.\"\n\n\"...You've been round {timesMet} times and I've never once said anything that wasn't about maintenance. I'm aware.\"",
      ],
      choice: {
        prompt: '"Anyway. Yes or no on the hinge."',
        options: [
          {
            key: "kind",
            label: "Say yes, and thank him",
            style: 3,
            close:
              '"It\'s a hinge."\n\n*A pause.*\n\n"...Thanks. For the thanking. Nobody thanks me for hinges, they just stop noticing the door."',
          },
          {
            key: "playful",
            label: "Ask what else is broken",
            style: 1,
            close:
              "\"Your window latch, the second stair, and whatever you've done to that chair.\"\n\n\"I have a list. I've had a list for a while. I didn't want to seem like I'd been looking.\"",
          },
          {
            key: "bold",
            label: "Ask him to stay after",
            style: 4,
            close:
              "*There's a long gap.*\n\n\"After? To... do what?\"\n\n*Then:* \"...Sorry. That was a stupid question. Yes. I'll stay after. I'll bring some of Elias' sweet tea, Shion drinks all of it. I hide some.\"",
          },
        ],
      },
      keepsake: {
        emoji: "🔩",
        line: "A hinge fixed by someone who'd been drafting the offer since Tuesday.",
      },
    },

    friend: {
      beats: [
        "**{firstName}**: \"I made you something. It's not a big thing. Please don't make it a big thing.\"",
        "*The photo is a small brass mechanism, about the size of a matchbox, with a tiny fold-out arm.*\n\n\"It's a doorstop. It's a *clockwork* doorstop, because I couldn't help myself, and it releases when the room gets to a certain temperature so your door shuts on its own when it gets cold. Which it does, in that corridor, at about two.\"",
        "\"I've noticed you leave it open. I've noticed you've got {favResponse} for everyone including me. I notice a lot and I never do anything with any of it except build things about it, which Jo says is a personality problem.\"\n\n\"Anyway. It's a doorstop.\"",
      ],
      choice: {
        prompt:
          "\"Right. That's the message. You don't have to say anything.\"",
        options: [
          {
            key: "kind",
            label: "Say nobody's done that",
            style: 3,
            close:
              '"...Oh."\n\n*Then, after several minutes:* "I\'ve built about two hundred of these. For the house, for the halls, for Shion. I built Haru\'s arm, and Romeo\'s leg. Neither of them ever said it like that, they just started using them. Which is fine, that\'s the job."\n\n"Nobody\'s said it like that before. I might have to go and sit down."',
          },
          {
            key: "playful",
            label: "Ask what it does at three",
            style: 1,
            close:
              '"Nothing! It\'s a doorstop!"\n\n"...It chimes. Very quietly. I\'ll take it out. Don\'t take it out, actually, I liked that bit."',
          },
          {
            key: "bold",
            label: "Ask him to fit it himself",
            style: 4,
            close:
              "*He's there in eleven minutes with the toolbox, and it takes him four times as long as it should because his hands aren't behaving.*\n\n*He doesn't look up from the floor once. But when it's done he says, to the doorframe:* \"I'll come and check it. Regularly. It'll need checking.\"\n\n*It does not need checking.*",
          },
        ],
      },
      keepsake: {
        emoji: "⚙️",
        line: "A clockwork doorstop that chimes at three for no reason at all.",
      },
    },

    closeFriend: {
      beats: [
        "**{firstName}**: \"Are you up? I'm in the workshop. Come down if you're up. Don't if you're not, it's not important.\"",
        "*It is three in the morning and he has clearly not slept. The bench is covered in the same mechanism attempted eleven times, and ten of them are wrong.*\n\n\"Shion had a night. I've been up since one with him and now I can't stop, so I'm doing this instead.\"",
        "*He finally puts the file down.*\n\n\"Everyone in this house thinks I've got it handled. Jo thinks it. Elias thinks it. Shion definitely thinks it, he's never once asked. And I *have* got it handled, that's the thing, I'm not complaining. I'd do it forever.\"\n\n\"I just wanted one person in the building to have seen me at three in the morning with ten failed ones on the bench. That's all. You can go back to bed.\"",
      ],
      choice: {
        prompt:
          "\"...Sorry. That wasn't fair. Say something and I'll pretend I didn't send it.\"",
        options: [
          {
            key: "kind",
            label: "Sit down and stay",
            style: 3,
            close:
              '*You pull the other stool over and sit. He doesn\'t say anything about it.*\n\n*Somewhere around five he gets the eleventh one right, holds it up, and finally looks at you properly for the first time all night.*\n\n"...Thanks for not going," *he says.* "That\'s the whole thing I wanted and I couldn\'t ask for it."',
          },
          {
            key: "playful",
            label: "Count the failures for him",
            style: 1,
            close:
              "\"Ten. It's ten. I know it's ten, I've been looking at them for two hours.\"\n\n*A pause, and then something that's almost a laugh.*\n\n\"...Say it's eleven again in an hour. I'd rather be wound up than fussed over. I don't know what to do with fussed over.\"",
          },
          {
            key: "bold",
            label: "Ask who looks after him",
            style: 4,
            close:
              "*He goes completely still.*\n\n\"That's not... that's not really how it works. He's my brother.\"\n\n*Then, much quieter, at the bench:* \"Nobody. The answer's nobody. I've known that for six years and you're the first person who's made me say it out loud, and I'd quite like you to stop.\"\n\n*He doesn't move away when you put a hand on his back, though. He leans into it a bit.*",
          },
        ],
      },
      keepsake: {
        emoji: "🔧",
        line: "Ten failed attempts on a bench, and one person who saw them.",
      },
    },

    confidant: {
      beats: [
        '**{firstName}**: "I\'m going to say something about Shion and I need you to not repeat it, not to Jo, not to anyone."',
        "\"He's my older brother. Everyone assumes it's the other way round because of how it looks, and I've never corrected a single person, in six years.\"\n\n\"When we were small he was the one who came and got me. Every time. Whatever it was, wherever I'd got to, he'd turn up. He was terrifying about it even then and I never once minded.\"",
        "\"And then something happened that I'm not going to describe, and now I'm the one who turns up, and he doesn't remember being the one who did.\"\n\n\"I'm not tired of it. I want to be really clear. I'd do it for another sixty years.\"\n\n\"(I've got an actual little brother and sister too, back home. I miss them the normal, boring way. This isn't that.)\"\n\n\"I just miss having a brother instead of having a duty, and I have never once said that sentence to a living person, and now it's out and I can't take it back.\"",
      ],
      choice: {
        prompt:
          '"Please say something. I\'m about to do something stupid like apologize for it."',
        options: [
          {
            key: "kind",
            label: "Say he's allowed to miss it",
            style: 3,
            close:
              '*The reply takes eleven minutes.*\n\n"I don\'t think I am. But I\'m going to sit with you saying it for a bit."\n\n*Then, much later:* "Are you still there. You don\'t have to answer. I just want to see the two ticks."\n\n*You stay up. He checks four more times.*',
          },
          {
            key: "playful",
            label: "Say you'd have guessed older",
            style: 1,
            close:
              '"You would not."\n\n"...You might have. He does have about eight inches on me and a personality like a house fire."\n\n"Thanks. That helped more than the serious version would have. Don\'t tell him I said the house fire thing."',
          },
          {
            key: "bold",
            label: "Tell him to say it to Shion",
            style: 4,
            close:
              '"No."\n\n*Immediate. Then a long silence.*\n\n"...He\'d take it as me being tired of him. He\'d take it as leaving. He\'s spent his whole life waiting for somebody to leave and I\'ve made a job out of not being the one who does."\n\n"Ask me again in a year. You will, won\'t you. God, you will."',
          },
        ],
      },
      keepsake: {
        emoji: "🖼️",
        line: "The truth about which of them is the older brother.",
      },
    },

    devoted: {
      beats: [
        '**{firstName}**: "Don\'t be angry."',
        "*The photo is his forearm, bandaged from wrist to elbow, and behind it on the bench is something bent very badly out of shape.*\n\n\"The gantry in the lower hall was going to come down and you were under it, and there wasn't time to do it properly, so I did it improperly. I got about four seconds. It held for six. That's fine, that's within tolerance.\"\n\n\"Normally I'd say spit on it and it'll heal. I've said that to Shion more times than I can count. I'm not saying it this time. I don't know what to do with the ones where I can't say that.\"",
        "\"I want to be honest about something. I do the math on everything. Every job, every load, every risk: that's the whole of me, I'm the one who checks the numbers before anyone moves.\"\n\n\"I didn't check anything. I looked up and saw where you were standing and my hands were already on it.\"\n\n\"That's never happened. In six years of this, not once. I've been sitting here since with a bandage on trying to work out what to call it, and I've got nothing, and I build things for a living so not having a word for something is genuinely upsetting.\"",
      ],
      choice: {
        prompt: '"You can be angry. I\'d probably prefer it."',
        options: [
          {
            key: "kind",
            label: "Ask to see the arm",
            style: 3,
            close:
              '"It\'s fine. It\'s a very boring arm."\n\n*It is not a boring arm, and he lets you redo the bandage anyway, sitting on the workshop stool with his sleeve pushed up, watching your hands the entire time and not saying one word.*\n\n"...You\'re better at this than I am," *he manages eventually. It is the only thing he says for an hour.*',
          },
          {
            key: "playful",
            label: "Say six over four is a brag",
            style: 1,
            close:
              "\"It's a fifty percent margin. That's not showing off, that's competent engineering.\"\n\n*A pause.*\n\n\"It was showing off. Slightly. There was nobody watching, which makes it worse, doesn't it.\"",
          },
          {
            key: "bold",
            label: "Give the thing a name for him",
            style: 4,
            close:
              '*You tell him what to call it.*\n\n*The typing indicator comes on and goes off four separate times.*\n\n"...Right," *he says finally.* "Yes. That\'s the word. I did know it was that word."\n\n"I\'m going to need a minute. Possibly several. Please don\'t go anywhere."',
          },
        ],
      },
      keepsake: {
        emoji: "🧮",
        line: "Four seconds of math he didn't do.",
      },
    },

    soulbound: {
      beats: [
        "**{firstName}**: \"I've built a thing and I'm going to describe it badly and then say the actual sentence, because if I only build the thing you'll have to guess again and that's not fair on you.\"",
        '*The photo is a small brass box with two dials on it. One says a number. The other is blank.*\n\n"The first dial is {timesMet}. It goes up on its own. I wired it to the door sensor, which took a month and is completely absurd."\n\n"The second one doesn\'t do anything. I couldn\'t work out how to build the second one. That\'s been the problem for about eight months."',
        "\"I've made you a doorstop, a latch, a lamp, a thing that chimes at three, and about forty other objects, and every single one of them was a sentence I couldn't say. My dad gave me a music box when I was small, the kind you wind up, no words needed. I think that's where all of this started.\"\n\n\"You've kept all of them. I've noticed that too. I notice everything and do nothing about any of it, and you have never once made me feel stupid for it.\"",
        "\"So here's the second dial.\"\n\n\"I love you. I've loved you since roughly the hinge. I've been building around it for a year because building is the only language I'm any good at and I was frightened that if I said it in words you'd hear how ordinary it sounds.\"\n\n\"It does sound ordinary. I've just read it back. It's the truest ordinary thing I've ever written and I'm sending it before I take the dial off.\"",
      ],
      choice: {
        prompt:
          "\"There. You don't have to do anything with that. It's just... it's out of the box now.\"",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close:
              "*The reply is nothing at all for six minutes.*\n\n*Then there are footsteps on the stairs, fast, which Mio never does, and he's at your door with the box still in his hand and no plan whatsoever for having arrived.*\n\n*He puts it down. Then he takes your face in both hands, carefully, the way he handles everything he's afraid of breaking, and kisses you, and it is the least careful thing he has ever done.*",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close:
              "\"Yes. Obviously. Take as long as you want.\"\n\n\"I've spent a year not saying it. It would be completely unreasonable of me to hand it over and then start counting.\"\n\n\"I'm still going to fix your latch. And the second stair, which you've been ignoring. None of that was ever about this. I'd have done it if you'd never spoken to me at all. That's just what I do about people.\"\n\n*The box stays on your shelf. The first dial keeps going up.*",
          },
        ],
      },
      keepsake: {
        emoji: "🎛️",
        line: "A brass box with one dial that counts and one that never worked.",
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
