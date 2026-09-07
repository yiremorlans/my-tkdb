export default {
  // The level-up DMs (docs/bond-scene-dms.md). Haru flirts constantly and bolts
  // the instant it lands, so his scenes are built on that reflex: he says
  // something enormous, panics, and covers it with a tour plug. The arc is the
  // gap between the enormous thing and the bolt getting shorter, until at
  // Soulbound he says it and stays put. At Confidant he admits the
  // relentless-cheer act is a system he built so nobody would offer him help.
  // The prosthetic arm is NOT a secret to him (Mio built it, he'll take the
  // glove off in front of a tour group) — never write it as a shameful reveal,
  // and never invent how he lost it; reference.md is silent on the cause.
  //
  // Texting voice, per reference.md's "## Bond Scenes" notes: little kaomoji
  // faces in his typed lines — (^__^;) sheepish, (;__;) for the sad ones — plus
  // shortened words like "btw". Not in the `> ` lines he says out loud.
  bondScenes: {
    acquaintance: {
      beats: [
        "**{firstName}**: Hey, Honor Roll! Big news.\n\nJabberwock evening tour's got a spare slot and I've gone and put your name on it. Didn't ask. Bit late to argue now, it's laminated (^__^;)",
        "Nah, hang on. Honest truth for a sec: I do the tour pitch with everyone. It's basically a nervous tic at this point (^__^;)\n\nBut you've come round {timesMet} times and every single one you've said hello to the animals before you've said hello to me. Every time. Nobody does that.\n\nSo the slot's real. And I shuffled someone for it btw, which you didn't hear from me.",
      ],
      choice: {
        prompt:
          "So you'll come, hey? Say you'll come. I've already laminated it.",
        options: [
          {
            key: "kind",
            label: "Say you'd love to",
            style: 3,
            close:
              "YES! Best news all week!\n\n*Then, about four seconds later:* ...okay, that was a lot. Sorry (^__^;) That was a really normal amount of excited and I've overshot it a bit.",
          },
          {
            key: "playful",
            label: "Ask who got moved",
            style: 1,
            close:
              "Nobody! Nobody got moved!\n\n...Towa got moved (^__^;) Towa got moved and he doesn't know yet and I'd like to keep it that way for as long as humanly possible.",
          },
          {
            key: "bold",
            label: "Ask if it's just the tour",
            style: 4,
            close:
              "*There's a gap. A real one, from someone who types like he talks.*\n\nHa! Yeah, nah, course it is, it's the tour, it's a great tour, five stars, people rave...\n\n...Bring a jacket. Gets cold by the water and I'm not sharing mine. I am absolutely going to share mine.",
          },
        ],
      },
      keepsake: {
        emoji: "🎟️",
        line: "A laminated tour slot with somebody else's name scratched off.",
      },
    },

    friend: {
      beats: [
        "**{firstName}**: Righto, got a question, and I've been sitting on it a couple weeks now like a coward.",
        "You come at me with {favResponse} every time and you never once use it as an exit.\n\nHere's the thing. I say something a bit much, and people either laugh it off to give me an out, or they go quiet and I crack a bigger joke to patch it. Two options my whole life.\n\nYou just... take it. Straight. Like I meant it. Which is a nightmare, hey, because turns out I do mean it, and the whole thing falls apart if nobody hands me the out.",
      ],
      choice: {
        prompt:
          "So can you stop? Or, you know. Don't. Either's... yeah. Either.",
        options: [
          {
            key: "kind",
            label: "Say you'll keep taking it",
            style: 3,
            close:
              "Oh, cool. Cool cool cool.\n\nThat's the worst possible answer and I'm rapt about it (^__^;) I'm gonna go stand in the aviary for a bit.",
          },
          {
            key: "playful",
            label: "Offer him one out a week",
            style: 1,
            close:
              "One a WEEK? That's rationing! That's cruel and unusual!\n\n...Fine. One a week. I'm saving it for something big, don't waste it on me being weird about the weather.",
          },
          {
            key: "bold",
            label: "Tell him to mean it out loud",
            style: 4,
            close:
              "*There's a very long silence, and then a voice note that is four seconds of him going* \"...\" *and then hanging up.*\n\n*Then:* couldn't do it. sorry (;__;) gave it a red hot go and everything.\n\nAsk me again in a bit though. Don't let me off.",
          },
        ],
      },
      keepsake: {
        emoji: "🗺️",
        line: "The out he asked for and then hoped you wouldn't give him.",
      },
    },

    closeFriend: {
      beats: [
        "**{firstName}**: Park's shut. Come round the side gate anyway. Bring nothing, I've got it covered.",
        "*It's the middle of the night and every enclosure light is off except one, and he's sitting on an upturned crate in front of it with two thermoses.*\n\n> This is the old girl. She came in eleven years ago and she's the reason there's a park at all. Doesn't do tours. Doesn't do visitors. Doesn't really do me most days.",
        "> I sit here about three nights a week. Have done since I got the captaincy. Nobody's ever come with me. I've never asked anyone, and I've had plenty of chances.\n\n*He hands you the second thermos without looking over.*\n\n> Brought two of these on the off chance for about a year, by the way. Just so you know the standard of pathetic we're operating at.",
      ],
      choice: {
        prompt: "Say something. She's judging us both.",
        options: [
          {
            key: "kind",
            label: "Say you'll come every week",
            style: 3,
            close:
              "*He doesn't answer for a bit. Then he laughs at nothing, sort of helplessly.*\n\n> Yeah, alright.\n\n> You'll have to. I've got two thermoses now, haven't I. That's a commitment. That's practically a mortgage.",
          },
          {
            key: "playful",
            label: "Ask how long she'll judge",
            style: 1,
            close:
              "> Eleven years and counting. She's still deciding about me.\n\n> Reckon she's decided about you already, though. She hasn't moved to the back once. That's... yeah. That's not nothing.",
          },
          {
            key: "bold",
            label: "Ask about the second thermos",
            style: 4,
            close:
              "> Aw, don't...\n\n*He stops. He actually stops, which he never does.*\n\n> ...A year.\n\n*he says.*\n\n> Filled the second one every single night I came out here on the off chance you'd say yes to something I hadn't asked yet.\n\n*And then he doesn't cover it with a joke. He just sits there in the dark next to you and lets it be true.*",
          },
        ],
      },
      keepsake: {
        emoji: "🫖",
        line: "A second thermos filled every night for a year on the off chance.",
      },
    },

    confidant: {
      beats: [
        "**{firstName}**: Gonna tell you something and I need you to just not make a thing of it. Dead flat. It's the only way it comes out.",
        "First, so it's not weird: the arm's not a secret. You've watched me take the glove off to shift a fence post in front of a tour group. Mio built it, joints and all, and he'll corner anyone who stands still long enough to explain how it works.\n\nSo this isn't a big reveal. I'm not owed a gasp (^__^;)",
        "Here's the actual thing. That whole 'nothing slows me down, all stamina and bad luck' routine? I built it. On purpose, years back. So nobody would ever look at me and go, hey, d'you need a hand with that.\n\nAnd it worked for ages. Then you started turning up and doing half my rounds without being asked and leaving food where I'd trip over it, and I let you, and that's the nearest I've come to dropping the whole act since I started running it.\n\nSay something normal now. Or plug the tour, genuinely, I'd take the tour.",
      ],
      choice: {
        prompt: "Go on then. Flat. You promised.",
        options: [
          {
            key: "kind",
            label: "Say he's allowed a hand",
            style: 3,
            close:
              "*A long pause.*\n\n...Yeah. That's the exact sentence. That's the one the whole routine exists to stop anyone saying to me.\n\nGive us a sec. Gone all... yeah (;__;) Give us a sec.",
          },
          {
            key: "playful",
            label: "Plug the tour back at him",
            style: 1,
            close:
              "OH, THAT'S LOW.\n\n*He's laughing properly, which is what you were going for.*\n\nThat's the meanest kindest thing anyone's ever done to me. Five stars. People rave.",
          },
          {
            key: "bold",
            label: "Say you're not going to stop",
            style: 4,
            close:
              "*No reply for a bit.*\n\n...Yeah, I know. Worked that out a month ago. It's why I'm telling you any of this.\n\n*Then, with the drawl gone out of it:*\n\nOkay. You do the morning rounds with me. Properly, not tagging along. Don't make it weird.\n\n> ...Cheers. For not making it weird.",
          },
        ],
      },
      keepsake: {
        emoji: "🧤",
        line: "A black glove on the fence post, off like it was nothing, because it was.",
      },
    },

    devoted: {
      beats: [
        "**{firstName}**: Righto, so I've done something and Jo is going to have my hide for it.",
        "There was a thing in the park tonight and it went for the small enclosure, and you were between it and the gate, and I made a call.\n\nI opened the small enclosure. On purpose. Let the whole lot out into the park so it'd have twenty things to chase instead of one thing to chase.\n\nTook us four hours to get them back in. Got them all. Every single one, I counted twice.",
        "Here's the bit I can't get straight in my head.\n\nEvery life in this park is mine. That's not a slogan, that's the actual job, I know all their names and I'd fight anyone in this academy over any one of them.\n\nAnd I put all of them at risk in about a second and a half because you were standing in the wrong place, and I'd do it again, and I don't know what that makes me.",
      ],
      choice: {
        prompt:
          "You'll be right. You always say that to me. Say it back, I need to hear it off someone.",
        options: [
          {
            key: "kind",
            label: "Tell him he got them all back",
            style: 3,
            close:
              "Yeah. Yeah, I did.\n\n*A long gap.*\n\n...say it again. Sorry (;__;) I've been counting them in my head for four hours and I can't make the number stick.\n\n*You say it about nine times. Eventually he sends a photo of the enclosure, all present, and one word:* ok.",
          },
          {
            key: "playful",
            label: "Ask what Jo said",
            style: 1,
            close:
              "Nothing! That's the worst part! He just looked at me and went \"right\" and walked off!\n\nI'd rather he yelled. I'd much rather he yelled. He's going to bring it up in about eight months when I've relaxed.",
          },
          {
            key: "bold",
            label: "Say it makes him yours",
            style: 4,
            close:
              "*There's no reply at all for about a minute.*\n\n*Then he's at the gate, still in the mud, absolutely wrecked, and he doesn't do a joke and he doesn't do the tour and he doesn't bolt.*\n\n*He just gets both arms round you, the gloved one and the other one, and holds on, and says into your shoulder,*\n\n> Yeah. Reckon it does.",
          },
        ],
      },
      keepsake: {
        emoji: "🌾",
        line: "Four hours of counting, and every one of them back inside.",
      },
    },

    soulbound: {
      beats: [
        "**{firstName}**: No tour plug on this one. I want that noted at the top. I've never once managed a message without a tour plug.",
        "{timesMet} times you've come round, and every single one of them you've said hello to the animals first, and I've stood there grinning like an idiot every single time, enjoying it more than is reasonable (^__^;)",
        "Here's my whole thing, right. I say the big stuff and then I bolt. Always have. Say something that means something, watch it land, and then immediately turn it into a bit so if it wasn't wanted I can pretend I never said it.\n\nI've done it to you about forty times. You've never once used the out. You've just stood there and waited for me to come back, and I always have, and that's... yeah. Nobody waits.",
        "So I'm not bolting.\n\nI love you. That's it. I'm not doing a bit after it, I'm not plugging anything, I'm not going to say something dumb about the aviary in three seconds to get out of it.\n\nI'm just going to sit here having said it. Which is the single hardest thing I've ever made myself do.",
      ],
      choice: {
        prompt:
          "Take your time. I'm not going anywhere. That's sort of the whole point of tonight.",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close:
              "...Say that again, I've gone and dropped my phone in the mud.\n\n*He's already running by the time you've typed it. He arrives at the side gate absolutely filthy and completely undone, and for once in his life he does not bolt and he does not joke.*\n\n*He kisses you against the gate with the enclosure lights off and the old girl watching, and afterwards he laughs (properly, wrecked, delighted) and says,*\n\n> Right. Yeah. Beauty.",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close:
              "Course, mate. Take as long as you want.\n\n*A pause. Then, with none of the drawl doing any work:*\n\nAnd listen, I'm not going to get weird. I'm not going to stop asking you on the tour, I'm not going to stop filling the second thermos. That was all real before tonight and it's all still real.\n\nYou'll be right. And so will I. I'm extremely good at waiting, turns out (^__^;) Did it for a year with a thermos.",
          },
        ],
      },
      keepsake: {
        emoji: "📣",
        line: "The first message he ever sent without plugging the tour.",
      },
    },
  },
  dialogue: {
    new: [
      "He's got a feed bucket in one hand and something small in his sling backpack. \"Don't mind Peekaboo. He's shy.\"",
      "He looks up from a fence post and grins wide. \"Well, hey there. You after somethin', or just havin' a wander?\"",
      "\"Phew... that's the last of the feed crops in for the day. Every critter here's only as healthy as what's in the bucket, so you do it right or you don't bother.\"",
      "He smells like feed and straw and something faintly sulfurous, and seems entirely unbothered by all three.",
      'Something skitters behind him. "Ah, ignore that," he says cheerfully. "That one\'s supposed to be in a pen."',
    ],
    known: [
      "\"Honor Roll, right? That's what everyone's calling you. Suits you.\" He shoulders the feed bucket.",
      "Peekaboo peers at you over the edge of his sling and immediately ducks back down.",
      "He hands you the feed bucket without asking. You've been drafted into the rounds.",
      '"You remembered which one bites," he says, delighted. "That\'s more than most of my house manages."',
      '"Folks are going wild over the Anomalous Animal Back To Nature Tour, your chance to experience it at a discount rate! C\'mon, help me hand out these fliers."',
    ],
    warm: [
      "His whole face lights up when he sees you: genuine delight, the kind that makes his warmth impossible to resist.",
      '"You reckon I work hard? Nah, this is nothing to write home about." He\'s filthy to the elbows and beaming.',
      '"Hey, nice work out there today! Let\'s knock a few more jobs off the list then take a break, hey?"',
      "Peekaboo comes out when you arrive now. Haru says that has never once happened before.",
      '"Honor Roll!" he calls, over the noise of about nine different critters.',
    ],
    spark: [
      "The teasing lands differently now. He's noticed. He's doing it more.",
      "He wipes something off your cheek with his thumb and takes his time putting his hand back.",
      "He's gentle with every creature in this place. With you he's gentle differently.",
      "Peekaboo watches the pair of you from a rafter with what can only be described as judgment.",
      "He catches your wrist mid-laugh and the laugh stops for both of you.",
    ],
    close: [
      '"You make every day feel like an adventure," he says, taking your hand. "Like... like home. That\'s the honest truth."',
      "He's trusted you with the west pens alone. He has never trusted anyone with the west pens.",
      "The mischief goes quiet for once, and what's left is unguarded and warm.",
      "He introduces you to a new arrival by name: yours first, then the anomaly's.",
      "Peekaboo rides on your shoulder out of preference now. Haru pretends not to be jealous.",
    ],
    bound: [
      "He kisses you in doorways, in stairwells, mid-sentence, constantly, without warning.",
      "You do the night rounds together now. Neither of you calls it a routine. It is.",
      '"Home," he says, meaning you, with his forehead against yours.',
      "He wakes you at 2am because something's hatching and he refuses to see it without you.",
      "Peekaboo sleeps at the foot of the bed. Haru insists this was entirely your idea.",
    ],
  },
  temperamentDialogue: {
    new: [
      '"Gahaha! Someone interesting wandered in!"',
      '"Careful where you step, half of what\'s on this floor is alive and the other half bites."',
      "\"Rule one: don't feed anything unless I say so. Rule two: Peekaboo doesn't count.\"",
      "\"Hold this. No, it's friendly. Mostly friendly. It's fine!\"",
      '"Gahaha! You didn\'t even flinch. All right, I like you already."',
    ],
    known: [
      '"Hey, Honor Roll! That\'s the name that stuck, huh? Fair enough."',
      "\"Perfect timing. I'm on the evening rounds. You're comin' with me, hey? C'mon, let's get this show on the road.\"",
      '"You sure are fond of Honor Roll, aren\'t you, Peekaboo? You did nothing but bite me for the first three days after we met."',
      '"What a coinkydink, you keep turnin\' up wherever I am. Not that I mind. Grab a bucket."',
      '"Everyone stuffs up sometimes. Don\'t let it get to you, just think of it as a funny story you can pull out later and laugh at! Gahaha!"',
    ],
    warm: [
      '"Hey, Honor Roll! Miss me?"',
      "\"Grab a bucket, we're flat out today. I'll make it fun, I promise.\"",
      "\"Peekaboo, look who's here, no, don't hide. Don't... okay. He'll come around.\"",
      "\"You've got a way with the mean ones. That's a genuine skill, you know.\"",
      "\"Stay for the night feed. It's the good shift. Everything's sleepy.\"",
    ],
    spark: [
      '"C\'mon, sit with me a minute. Animals can wait. ...Did I just say that? Huh."',
      '"I tease everybody, sure. But with you I mean it. That\'s the honest difference, Honor Roll."',
      "\"Stay for the night rounds. Everything's asleep. Nobody's watching but Peekaboo.\"",
      "\"You've got straw in your hair. No, leave it. It's working for you.\"",
      "\"You're gonna have to move first. I've used up all my nerve getting this close.\"",
    ],
    close: [
      '"I really like seeing you smile. Can I be honest about that?"',
      "\"Everywhere's better with you in it. That's the honest truth, not a line.\"",
      "\"You feed them like they matter to you. That's... yeah. That's the thing that got me.\"",
      '"Take the west pens tonight. I trust you with them. I don\'t say that."',
      '"Come here. No punchline. I just want you closer."',
    ],
    bound: [
      '"C\'mere, Honor Roll. No joke this time. Not even a small one."',
      '"I love you. Told you I\'d say it eventually. Took me long enough, huh?"',
      '"Ren and Towa can hold down the fort. Come do the night rounds with me, then come back to bed."',
      "\"You're it for me. That's the whole thing. That's all I've got.\"",
      "\"Peekaboo picked you before I'd admit it myself. He's real smug about that, too. Gahaha.\"",
    ],
  },
  approach: {
    new: [
      "Don't flinch",
      "Meet Peekaboo",
      "Hold the bucket",
      "Walk into the pens",
    ],
    known: [
      "Take the feed bucket",
      "Join the rounds",
      "Say hello to Peekaboo",
      "Answer to Honor Roll",
    ],
    warm: [
      "Grab a bucket",
      "Stay for the night feed",
      "Coax Peekaboo out",
      "Learn the feeding order",
    ],
    spark: [
      "Move first",
      "Stay for the night rounds",
      "Leave the straw in",
      "Let him take his time",
    ],
    close: [
      "Go to him",
      "Take the west pens",
      "Let Peekaboo settle",
      "Say it back",
    ],
    bound: [
      "Do the rounds together",
      "Come back to bed",
      "Go see what's hatching",
      "Say it back",
    ],
  },
  responses: {
    kind: {
      new: [
        "Appreciate his warmth",
        "Ask about Peekaboo",
        "Take his bad advice kindly",
      ],
      spark: [
        "Tell him you knew",
        "Say the critters adore him",
        "Take his hand properly",
      ],
      close: [
        "Show him home is with you",
        "Take the west pens",
        "Say it wasn't a joke either",
      ],
      bound: [
        "Say it back",
        "Tell him he's home too",
        "Let him wake you at 2am",
      ],
    },
    playful: {
      new: [
        "Call it a coinkydink",
        "Feed something you shouldn't",
        "Tease him before he teases you",
      ],
      spark: [
        "Make him move first",
        "Put the straw back in his hair",
        "Out-flirt him",
      ],
      close: [
        "Match his mischief",
        "Let Peekaboo choose you",
        "Get into trouble with him",
      ],
      bound: [
        "Make him wait for it",
        "Blame Peekaboo",
        "Kiss him mid-sentence first",
      ],
    },
    bold: {
      new: [
        "Be daring with him",
        "Hold whatever he offers",
        "Walk into the pens",
      ],
      spark: ["Move first", "Close the inch", "Tell him to stop joking"],
      close: [
        "Match his boldness",
        "Take his hand first",
        "Tell him you'd follow anywhere",
      ],
      bound: [
        "Say it first",
        "Pull him into the stairwell",
        "Tell him he's it for you",
      ],
    },
    neutral: {
      new: ["Be present", "Watch him work", "Let him finish the rounds"],
      spark: ["Laugh it off", "Watch Peekaboo instead", "Let the moment go"],
      close: [
        "Rest with him",
        "Finish the rounds in silence",
        "Sit close and say nothing",
      ],
      bound: [
        "Hold his hand and say nothing",
        "Do the rounds quietly",
        "Let the night run",
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
      '"Well, hey there!" **{name}** grins at {user} over an armful of feed sacks. "You after somethin\'?"',
      '{user} says the name, and **{name}** laughs, delighted. "Gahaha! Look at that."',
      "\"Don't mind Peekaboo, he's shy.\" **{name}** introduces Peekaboo before he introduces himself to {user}.",
    ],
    warm: [
      '"Hey, Honor Roll!" **{name}** is filthy to the elbows and beaming at {user}.',
      "{user} calls out, and **{name}** drops the sack he was hauling. It can wait.",
      '"Grab a bucket." That is how **{name}** tells {user} he\'s glad they came.',
    ],
    spark: [
      "**{name}** flirts, lands it, and immediately looks somewhere else. {user} is used to this.",
      '"Miss me, Honor Roll?" **{name}** asks {user}, then can\'t hold eye contact for the answer.',
      "{user} says the name, and **{name}**'s grin goes about ten percent honest.",
    ],
    close: [
      '"C\'mere, Honor Roll. No joke this time." **{name}** means it at {user}, for once.',
      "**{name}** goes to kiss {user} mid-sentence, clocks the audience, and grins his way out of it instead.",
      "{user} calls, and **{name}** leaves the rounds to Ren without a second thought.",
    ],
    bound: [
      '"Home," **{name}** says, meaning {user}, with his forehead against theirs.',
      "**{name}** hears his name, and every animal in the park can wait. {user} can't.",
      "{user} says the name, and **{name}** stops chickening out about any of it.",
    ],
  },
};
