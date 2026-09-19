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
  // faces in his typed lines — (^_^;) sheepish, (;_;) for the sad ones — plus
  // shortened words like "btw". Not in the `> ` lines he says out loud.
  bondScenes: {
    acquaintance: {
      beats: [
        "**{firstName}**: Hey, Honor Roll! Big news.\n\nJabberwock evening tour's got a spare slot and I've gone and put your name on it. Didn't ask. Bit late to argue now, it's laminated (^_^;)",
        "Nah, hang on. Honest truth for a sec: I do the tour pitch with everyone. It's basically a nervous tic at this point (^_^;)\n\nBut you've come round {timesMet} times and every single one you've said hello to the animals before you've said hello to me. Every time. Nobody does that.\n\nSo the slot's real. And I shuffled someone for it btw, which you didn't hear from me.",
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
              "YES! Best news all week!\n\n*Then, about four seconds later:* ...okay, that was a lot. Sorry (^_^;) That was a really normal amount of excited and I've overshot it a bit.",
          },
          {
            key: "playful",
            label: "Ask who got moved",
            style: 1,
            close:
              "Nobody! Nobody got moved!\n\n...Towa got moved (^_^;) Towa got moved and he doesn't know yet and I'd like to keep it that way for as long as humanly possible.",
          },
          {
            key: "bold",
            label: "Ask if it's just the tour",
            style: 4,
            close:
              "*There's a gap. A real one, from someone who types like he talks.*\n\nHa! Yeah, nah, course it is, it's a great tour, five stars, people rave...\n\n...Bring a jacket. Gets cold by the water and I'm not sharing mine. *He is absolutely going to share his.*",
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
        "**{firstName}**: Hey. Went back and forth on whether I should message you at all, so if this is weird just ignore it (^_^;)",
        "One of the critters isn't doing great. Nothing dramatic, she's stable. But it's a two-person job and I've only got the one of me.\n\nCould rope in Ren or Towa, sure. But yeah, nah. Not for this one.",
        "You, though! You're a real good sport, hey. Doesn't matter what mess I drag you into, you come back with {favResponse} and roll with it. Gahaha!\n\nSo I'm chancing it. Last minute, I know (^_^;) Reckon you could come lend us a hand? You'd be a real lifesaver.",
      ],
      choice: {
        prompt: "No pressure. Well. A bit of pressure. Can you come?",
        options: [
          {
            key: "kind",
            label: "Say you're on your way",
            style: 3,
            close:
              "...Yeah? All right! Cheers.\n\nGate's already propped open, come straight through. Knew you would, btw (^_^)",
          },
          {
            key: "playful",
            label: "Ask if there's a tour discount",
            style: 1,
            close:
              "Mates' rates, obviously. Free, in fact. This one's on the house (^_^;)\n\n...Cheers for making me laugh. Needed that. Gate's open.",
          },
          {
            key: "bold",
            label: "Say he should've asked sooner",
            style: 4,
            close:
              "Yeah, nah, don't go saying that. I'll get used to it.\n\n...Maybe I should've, though. Noted. Now get over here (^_^;)",
          },
        ],
      },
      keepsake: {
        emoji: "🚪",
        line: "The gate he'd already left open, because he knew you'd come.",
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
        "First, so it's not weird: the arm's not a secret. You've watched me take the glove off to shift a fence post in front of a tour group. Mio built it, joints and all, and he'll corner anyone who stands still long enough to explain how it works.\n\nSo this isn't a big reveal. I'm not owed a gasp (^_^;)",
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
              "*A long pause.*\n\n...Yeah. That's the exact sentence. That's the one the whole routine exists to stop anyone saying to me.\n\nGive us a sec. Gone all... yeah (;_;) Give us a sec.",
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
              "*No reply for a bit.*\n\n...Yeah, I know. Worked that out a month ago. It's why I'm telling you any of this.\n\n*Then, with the drawl gone out of it:*\n\nOkay. You do the morning rounds with me. Properly, not tagging along.\n\n> ...Cheers. For not making it weird.",
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
              "Yeah. Yeah, I did.\n\n*A long gap.*\n\n...say it again. Sorry (;_;) I've been counting them in my head for four hours and I can't make the number stick.\n\n*You say it about nine times. Eventually he sends a photo of the enclosure, all present, and one word:* ok.",
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
        "{timesMet} times you've come round, and every single one of them you've said hello to the animals first, and I've stood there grinning like an idiot every single time, enjoying it more than is reasonable (^_^;)",
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
              "...Say that again, I've gone and dropped my phone in the mud.\n\n*He's already running by the time you've typed it. He arrives at the side gate absolutely filthy and completely undone, and for once in his life he does not bolt and he does not joke.*\n\n*He kisses you against the gate with the enclosure lights off and the old girl watching, and afterwards he laughs (properly, wrecked, delighted) and says,*\n\n> Gahaha... yeah. All right.",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close:
              "Course, mate. Take as long as you want.\n\n*A pause. Then, with none of the drawl doing any work:*\n\nAnd listen, I'm not going to get weird. I'm not going to stop asking you on the tour, I'm not going to stop filling the second thermos. That was all real before tonight and it's all still real.\n\nYou'll be right. And so will I. I'm extremely good at waiting, turns out (^_^;) Did it for a year with a thermos.",
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
      {
        line: "He's got a feed bucket in one hand and something small in his sling backpack. \"Don't mind Peekaboo. He's shy.\"",
        approach: "Say Hi to Peekaboo",
        greeting:
          "\"Rule one: don't feed anything unless I say so. Rule two: Peekaboo doesn't count.\"",
        responses: {
          kind: ["Ask what Peekaboo likes", "Promise to follow the rules"],
          playful: ["Sneak Peekaboo a snack", "Ask what rule three is"],
          bold: ["Offer Peekaboo your hand", "Ask to meet the scary ones"],
          neutral: ["Nod along to the rules", "Keep your hands to yourself"],
        },
      },
      {
        line: "He looks up from a fence post and grins wide. \"Well, hey there. You after somethin', or just havin' a wander?\"",
        approach: "Just say you're wandering",
        greeting: '"Gahaha! Someone interesting wandered in!"',
        responses: {
          kind: ["Thank him for the welcome", "Smile back at him"],
          playful: [
            "Say you got lost on purpose",
            "Say you're after free snacks",
          ],
          bold: ["Ask for the full tour", "Say you want to stick around"],
          neutral: ["Wave and look around", "Let him keep working"],
        },
      },
      {
        line: "\"Phew... that's the last of the feed crops in for the day. Every critter here's only as healthy as what's in the bucket, so you do it right or you don't bother.\"",
        approach: "Hold the bucket",
        greeting:
          "\"Hold this. No, it's friendly. Mostly friendly. It's fine!\"",
        responses: {
          kind: ["Say the critters are lucky", "Ask how you can help"],
          playful: ["Ask what's on the menu", "Sniff the bucket, regret it"],
          bold: ["Offer to do the next round", "Ask to mix the feed yourself"],
          neutral: ["Hold it steady and listen", "Watch how he measures it"],
        },
      },
      {
        line: "He smells like feed and straw and something faintly sulfurous, and seems entirely unbothered by all three.",
        approach: "Walk into the pens",
        greeting:
          '"Gahaha! You didn\'t even bat an eye. All right, I like you already."',
        responses: {
          kind: ["Thank him for the compliment", "Say the animals seem happy"],
          playful: ["Pretend you smell nothing", "Hold your nose, grinning"],
          bold: ["Ask to see the worst pen", "Say it takes more than that"],
          neutral: ["Shrug it off", "Just take it all in"],
        },
      },
      {
        line: 'Something skitters behind him. "Ah, ignore that," he says cheerfully. "That one\'s supposed to be in a pen."',
        approach: "Don't freak out",
        greeting:
          '"Careful where you step, half of what\'s on this floor is alive and the other half bites."',
        responses: {
          kind: ["Step where he steps", "Ask if the loose one is okay"],
          playful: ["Ask which half you're on", "Tiptoe dramatically"],
          bold: ["Offer to catch the runaway", "Walk in anyway"],
          neutral: ["Watch the floor", "Follow close behind him"],
        },
      },
    ],
    known: [
      {
        line: 'He shoulders the feed bucket without breaking stride. "Didn\'t figure you for someone who sits still either."',
        approach: "Offer to help",
        greeting:
          "\"You keep turnin' up right when I need an extra pair of hands. I'm not complainin'.\"",
        responses: {
          kind: ["Offer a real hand", "Say you don't mind helping"],
          playful: ["Ask if you're on payroll now", "Demand hazard pay"],
          bold: ["Take the bucket from him", "Say you're basically staff"],
          neutral: ["Help without comment", "Take a task quietly"],
        },
      },
      {
        line: "Peekaboo peers at you over the edge of his sling and immediately ducks back down.",
        approach: "Say hello to Peekaboo",
        greeting:
          '"You sure are fond of Honor Roll, aren\'t you, Peekaboo? You did nothing but bite me for the first three days after we met."',
        responses: {
          kind: ["Greet Peekaboo gently", "Let him warm up slowly"],
          playful: [
            "Ask what changed his mind",
            "Take the credit for Peekaboo",
          ],
          bold: ["Say Peekaboo has good taste", "Pet him with confidence"],
          neutral: ["Nod at Peekaboo, say nothing", "Let him hide, unbothered"],
        },
      },
      {
        line: "He hands you the feed bucket without asking. You've been drafted into the rounds.",
        approach: "Take the feed bucket",
        greeting:
          '"What a coinkydink, you keep turnin\' up wherever I am. Not that I mind. Grab a bucket."',
        responses: {
          kind: ["Take the bucket gladly", "Say you don't mind the draft"],
          playful: ["Ask what the pay is", "Demand a title for the job"],
          bold: [
            "Take the bucket like it's owed",
            "Start before he assigns you",
          ],
          neutral: ["Take the bucket, say nothing", "Get to work quietly"],
        },
      },
      {
        line: '"You remembered which one bites," he says, delighted. "That\'s more than most of my house manages."',
        approach: "Say you're a fast learner",
        greeting:
          "\"Careful of that one, he's decided you're furniture. Just go with it.\"",
        responses: {
          kind: ["Say you were paying attention", "Thank him for the warning"],
          playful: ["Ask to join Jabberwock", "Offer to tutor his house"],
          bold: ["Say you remember everything", "Challenge him to test you"],
          neutral: ["Shrug, say nothing", "Take the praise plainly"],
        },
      },
      {
        line: '"Folks are going wild over the Anomalous Animal Back To Nature Tour, your chance to experience it at a discount rate! C\'mon, help me hand out these fliers."',
        approach: "Help hand out fliers",
        greeting:
          "\"Stick around for feeding time, it's chaos but it's the good kind.\"",
        responses: {
          kind: ["Help hand them out gladly", "Say the tour sounds great"],
          playful: [
            "Improvise a pitch of your own",
            "Heckle the flier wording",
          ],
          bold: ["Hand out more than your share", "Take over the pitch"],
          neutral: ["Hand them out quietly", "Help without comment"],
        },
      },
      {
        line: "He waves you over the second he spots you, already listing off what needs doing today.",
        approach: "Join the rounds",
        greeting:
          "\"Perfect timing. I'm on the evening rounds. You're comin' with me, hey? C'mon, let's get this show on the road.\"",
        responses: {
          kind: ["Join gladly", "Say you're happy to help"],
          playful: ["Ask what disaster's first", "Demand the easy jobs"],
          bold: ["Take the hardest job first", "Jump in before he assigns you"],
          neutral: ["Join without a word", "Get to it quietly"],
        },
      },
      {
        line: "\"You'll be alright, you got this!\" he says, to you, about something you hadn't even realized you were worried about.",
        approach: "Ask how he knew",
        greeting:
          '"Everyone stuffs up sometimes. Don\'t let it get to you, just think of it as a funny story you can pull out later and laugh at! Gahaha!"',
        responses: {
          kind: ["Thank him for noticing", "Say that helped, gently"],
          playful: ["Ask how he always knows", "Guess what tipped him off"],
          bold: [
            "Say you weren't worried at all",
            "Ask him to explain the read",
          ],
          neutral: ["Shrug, say nothing", "Take it in stride"],
        },
      },
      {
        line: "He's penciled you into tomorrow's rounds already, cheerfully, like it was never up for discussion.",
        approach: "Go along with it",
        greeting:
          '"Oi, Honor Roll! Grab a bucket, we\'re short-staffed again."',
        responses: {
          kind: ["Go along cheerfully", "Say you don't mind it"],
          playful: ["Demand a say in the schedule", "Ask what the pay's like"],
          bold: ["Rewrite the schedule yourself", "Say you'd have come anyway"],
          neutral: ["Go along, say nothing", "Show up, unbothered"],
        },
      },
      {
        line: "\"Gahaha! Reckon that's a new record,\" he says, of something small you just did, like it's an achievement.",
        approach: "Take the compliment",
        greeting:
          "\"You're doin' better than half my volunteers, and they've been here longer. Gahaha!\"",
        responses: {
          kind: ["Take the compliment warmly", "Say that means a lot"],
          playful: [
            "Demand a bigger celebration",
            "Ask what the record replaced",
          ],
          bold: ["Say you expected nothing less", "Claim the record proudly"],
          neutral: ["Shrug at the compliment", "Take it plainly"],
        },
      },
      {
        line: '"Oi, you seen Ren about?" He\'s already scanning the treeline. "He\'s dodging rounds again. Good thing I fitted him with a tracker."',
        approach: "Ask why",
        greeting:
          "\"Ren'd never leave his room if I didn't drag him out. Someone's gotta!\"",
        responses: {
          kind: ["Say you hope Ren's okay", "Offer to help find him"],
          playful: ["Guess where Ren's hiding", "Ask about the tracker"],
          bold: ["Say Ren's obviously dodging", "Volunteer to drag Ren back"],
          neutral: ["Shrug, say nothing", "Let it go unremarked"],
        },
      },
      {
        line: "You catch him staring, and he grins like he wasn't. \"What? I'm allowed to admire good work ethic.\"",
        approach: "Call him out",
        greeting:
          '"Peekaboo let you pet him without biting. You\'re his best friend now. Took me days of bites to get there!"',
        responses: {
          kind: ["Say Peekaboo's a sweetheart", "Promise to be a good friend"],
          playful: ["Ask if he's jealous", "Ask if you outrank him now"],
          bold: ["Claim Peekaboo for yourself", "Pet Peekaboo again"],
          neutral: ["Keep petting Peekaboo", "Smile and say nothing"],
        },
      },
      {
        line: '"Mates\' rates, just for you," he says, and it is not, in fact, a discount anyone else gets.',
        approach: "Take the mates' rates",
        greeting:
          "\"Gahaha! Mates' rates means no excuse not to come by every day, hey. Just don't go telling the tour group what you paid.\"",
        responses: {
          kind: ["Promise to come every day", "Thank him for the deal"],
          playful: [
            "Ask if everyone gets this rate",
            "Demand an even bigger discount",
          ],
          bold: ["Say you'd come without it", "Ask why you get special rates"],
          neutral: ["Take the deal, say nothing", "Nod, say you'll be around"],
        },
      },
      {
        line: "He's noticed you've started coming by even on days there's nothing to feed or fix.",
        approach: "Say you like it here",
        greeting:
          '"So is it Towa you keep coming back for? Just curious. No reason. Gahaha!"',
        responses: {
          kind: ["Say it's not just Towa", "Admit you like the company"],
          playful: ["Say it's all for Peekaboo", "Say Towa's great company"],
          bold: ["Say you come for him", "Ask who he hopes it is"],
          neutral: ["Shrug, say nothing", "Say you like it here"],
        },
      },
    ],
    warm: [
      {
        line: "His whole face lights up when he sees you: genuine delight, the kind that makes his warmth impossible to resist.",
        approach: "Stay for the night feed",
        greeting:
          "\"Stay for the night feed. It's the good shift. Everything's sleepy.\"",
        responses: {
          kind: "Say you're happy to stay",
          playful: "Ask what makes the shift good",
          bold: "Say his warmth got you",
          neutral: "Stay, say nothing",
        },
      },
      {
        line: '"You reckon I work hard? Nah, this is nothing to write home about." He\'s filthy to the elbows and beaming.',
        approach: "Learn the feeding order",
        greeting:
          "\"You've got a way with the mean ones. That's a genuine skill, you know.\"",
        responses: {
          kind: "Say the hard work shows",
          playful: "Tease the modesty",
          bold: "Say he's clearly proud of it",
          neutral: "Learn quietly, say nothing",
        },
      },
      {
        line: '"Hey, nice work out there today! Let\'s knock a few more jobs off the list then take a break, hey?"',
        approach: "Grab a bucket",
        greeting:
          "\"Grab a bucket, we're flat out today. I'll make it fun, I promise.\"",
        responses: {
          kind: "Take the compliment gladly",
          playful: "Demand the fun part now",
          bold: "Say you'll hold him to 'fun'",
          neutral: "Grab a bucket, say nothing",
        },
      },
      {
        line: "Peekaboo comes out when you arrive now. Haru says that has never once happened before.",
        approach: "Coax Peekaboo out",
        greeting:
          "\"Peekaboo, look who's here, no, don't hide. Don't... okay. He'll come around.\"",
        responses: {
          kind: "Coax him out gently",
          playful: "Take credit for the moment",
          bold: "Say Peekaboo trusts you now",
          neutral: "Wait quietly for Peekaboo",
        },
      },
      {
        line: '"Honor Roll!" he calls, over the noise of about nine different critters.',
        approach: "Call back over the noise",
        greeting: '"Hey, Honor Roll! Miss me?"',
        responses: {
          kind: "Call back warmly",
          playful: "Tease him for asking",
          bold: "Say of course you missed him",
          neutral: "Wave back, say nothing",
        },
      },
    ],
    spark: [
      {
        line: "The teasing lands differently now. He's noticed. He's doing it more.",
        approach: "Notice the shift",
        greeting:
          '"I tease everybody, sure. But with you I mean it. That\'s the honest difference, Honor Roll."',
        responses: {
          kind: "Tell him you knew",
          playful: "Out-flirt him",
          bold: "Tell him to stop joking",
          neutral: "Laugh it off",
        },
      },
      {
        line: "He wipes something off your cheek with his thumb and takes his time putting his hand back.",
        approach: "Let him take his time",
        greeting:
          '"C\'mon, sit with me a minute. Animals can wait. ...Did I just say that? Huh."',
        responses: {
          kind: "Let his hand stay",
          playful: "Put the straw back in his hair",
          bold: "Close the inch",
          neutral: "Let the moment go",
        },
      },
      {
        line: "He's gentle with every creature in this place. With you he's gentle differently.",
        approach: "Stay for the night rounds",
        greeting:
          "\"Stay for the night rounds. Everything's asleep. Nobody's watching but Peekaboo.\"",
        responses: {
          kind: "Say the critters adore him",
          playful: "Ask if you're a critter too",
          bold: "Ask why you're different",
          neutral: "Let him be gentle, say nothing",
        },
      },
      {
        line: "Peekaboo watches the pair of you from a rafter with what can only be described as judgment.",
        approach: "Ignore the judgment",
        greeting:
          "\"You've got straw in your hair. No, leave it. It's working for you.\"",
        responses: {
          kind: "Take his hand properly",
          playful: "Make him move first",
          bold: "Stare Peekaboo down",
          neutral: "Watch Peekaboo instead",
        },
      },
      {
        line: "He catches your wrist mid-laugh and the laugh stops for both of you.",
        approach: "Move first",
        greeting:
          "\"You're gonna have to move first. I've used up all my nerve getting this close.\"",
        responses: {
          kind: "Let him have the nerve",
          playful: "Tease him for running out",
          bold: "Move first",
          neutral: "Hold still, wait him out",
        },
      },
    ],
    close: [
      {
        line: '"You make every day feel like an adventure," he says, taking your hand. "Like... like home. That\'s the honest truth."',
        approach: "Say it back",
        greeting:
          '"Everywhere\'s better with you in it. ...Not a line. I meant every word."',
        responses: {
          kind: "Show him home is with you",
          playful: "Match his mischief",
          bold: "Match his boldness",
          neutral: "Rest with him",
        },
      },
      {
        line: "He's trusted you with the west pens alone. He has never trusted anyone with the west pens.",
        approach: "Take the west pens",
        greeting:
          '"Go on. They already like you better than me. I\'m not even jealous. Much."',
        responses: {
          kind: "Take the west pens",
          playful: "Ask what earned the trust",
          bold: "Take the pens, no hesitation",
          neutral: "Finish the rounds in silence",
        },
      },
      {
        line: "The mischief goes quiet for once, and what's left is unguarded and warm.",
        approach: "See him unguarded",
        greeting: '"Come here. No punchline. I just want you closer."',
        responses: {
          kind: "Say it wasn't a joke either",
          playful: "Get into trouble with him",
          bold: "Take his hand first",
          neutral: "Sit close and say nothing",
        },
      },
      {
        line: "He introduces you to a new arrival by name: yours first, then the anomaly's.",
        approach: "Go to him",
        greeting:
          "\"You feed them like they matter to you. That's... yeah. That's the thing that got me.\"",
        responses: {
          kind: "Say your name matters too",
          playful: "Ask what the anomaly thinks",
          bold: "Tell him you'd follow anywhere",
          neutral: "Let the introduction stand",
        },
      },
      {
        line: "Peekaboo rides on your shoulder out of preference now. Haru pretends not to be jealous.",
        approach: "Let Peekaboo settle",
        greeting:
          '"I really like seeing you smile. Can I be honest about that?"',
        responses: {
          kind: "Reassure Haru he's still first",
          playful: "Let Peekaboo choose you",
          bold: "Claim Peekaboo's loyalty too",
          neutral: "Let Peekaboo have his choice",
        },
      },
    ],
    bound: [
      {
        line: "He kisses you in doorways, in stairwells, mid-sentence, constantly, without warning.",
        approach: "Kiss him back",
        greeting:
          '"C\'mere, Honor Roll. No joke this time. Not even a small one."',
        responses: {
          kind: "Kiss him back gently",
          playful: "Kiss him mid-sentence first",
          bold: "Pull him into the stairwell",
          neutral: "Let him kiss you, say nothing",
        },
      },
      {
        line: "You do the night rounds together now. Neither of you calls it a routine. It is.",
        approach: "Do the rounds together",
        greeting:
          '"Ren and Towa can hold down the fort. Come do the night rounds with me, then come back to bed."',
        responses: {
          kind: "Tell him he's home too",
          playful: "Make him wait for it",
          bold: "Say it first",
          neutral: "Do the rounds quietly",
        },
      },
      {
        line: '"Home," he says, meaning you, with his forehead against yours.',
        approach: "Say it back",
        greeting:
          "\"You're it for me. That's the whole thing. That's all I've got.\"",
        responses: {
          kind: "Say it back",
          playful: "Ask what home smells like",
          bold: "Tell him he's it for you",
          neutral: "Hold his hand and say nothing",
        },
      },
      {
        line: "He wakes you at 2am because something's hatching and he refuses to see it without you.",
        approach: "Go see what's hatching",
        greeting:
          '"I love you. Told you I\'d say it eventually. Took me long enough, huh?"',
        responses: {
          kind: "Let him wake you at 2am",
          playful: "Complain about the hour",
          bold: "Race him to see it",
          neutral: "Let the night run",
        },
      },
      {
        line: "Peekaboo sleeps at the foot of the bed. Haru insists this was entirely your idea.",
        approach: "Come back to bed",
        greeting:
          "\"Peekaboo picked you before I'd admit it myself. He's real smug about that, too. Gahaha.\"",
        responses: {
          kind: "Let Peekaboo stay",
          playful: "Blame Peekaboo",
          bold: "Deny it was your idea, boldly",
          neutral: "Let them both sleep",
        },
      },
    ],
  },
  // No temperamentDialogue pool: every leftover line was placed onto a
  // dialogue beat's `greeting`.
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
      '"Grab a bucket." **{name}** is grinning when he says it to {user}.',
    ],
    spark: [
      "**{name}** flirts, lands it, and immediately looks somewhere else. {user} is used to this.",
      '"Miss me, Honor Roll?" **{name}** asks {user}, then can\'t hold eye contact for the answer.',
      "{user} says the name, and **{name}**'s grin goes about ten percent honest.",
    ],
    close: [
      '"C\'mere, Honor Roll. No joke this time." **{name}** says it to {user} and, for once, means it.',
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
