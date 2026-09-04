export default {
  // The level-up DMs (docs/bond-scene-dms.md). Rui's whole ladder is built round
  // the one thing he cannot do: his touch kills the living, so the gloves never
  // come off and the intimacy has to be found everywhere else — a drink made to
  // your taste, a garden grown for you, a hand held through two layers of
  // leather. The brightness is real and it is also a wall; the arc is the wall
  // coming down without the brightness going out.
  bondScenes: {
    acquaintance: {
      beats: [
        "**{firstName}**: \"Okay so this is going to sound like a line and I promise it isn't. I've made you a drink and it's sitting on my bar going flat, so the clock is genuinely ticking.\"",
        "\"I make everyone a drink. That's not the flattering part, don't get excited yet.\"\n\n\"The flattering part is that I've remade yours four times. You've been round {timesMet} times and every single one I've watched what you actually finished and what you politely didn't, and I've been adjusting.\"\n\n\"This one's the fifth version. I think it's right. I'd quite like to be right about something today.\"",
      ],
      choice: {
        prompt: "\"So? Come and tell me I've cracked it. Or don't, and I'll do a sixth.\"",
        options: [
          {
            key: "kind",
            label: "Say you'll come right now",
            style: 3,
            close: "\"Ha! Great. Excellent. Perfect.\"\n\nA pause.\n\n\"I've just tidied the bar twice. That's a completely normal thing to do and you should read nothing into it.\"",
          },
          {
            key: "playful",
            label: "Demand a sixth on principle",
            style: 1,
            close: "\"You haven't tasted the fifth!\"\n\n\"...Fine. I'll do a sixth. I'll do a sixth and a seventh and I'll enjoy every minute of it, which I feel like you already knew.\"",
          },
          {
            key: "bold",
            label: "Ask what he was watching for",
            style: 4,
            close: "\"You,\" he says, immediately, because he is never coy about this part.\n\nThen: \"Sorry. That's my whole thing, I know. It's true though. Come and have the drink, I'm much better in person and only slightly less obvious.\"",
          },
        ],
      },
      keepsake: {
        emoji: "🍸",
        line: "The fifth version of a drink, adjusted four times without being asked.",
      },
    },

    friend: {
      beats: [
        '**{firstName}**: "Right. Serious for a second, and then I\'ll go back to being unbearable."',
        "\"You come at me with {favResponse} every time, and here's the thing: you do it after I've been unbearable, too. That's the bit I've noticed.\"\n\n\"I'm very charming. I'm aware, it's on purpose, it works on about ninety percent of people and it's the most efficient way I've found of never being asked a follow-up question.\"\n\n\"You ask follow-up questions. Constantly. It's rude and I've started looking forward to it.\"",
      ],
      choice: {
        prompt: "\"So what's it going to take to make you stop? Asking for a friend. The friend is me.\"",
        options: [
          {
            key: "kind",
            label: "Say you'll keep asking",
            style: 3,
            close: "\"...Oh, that's not fair.\"\n\nA pause.\n\n\"That's genuinely not fair. Do you know how long I've had that wall up? Turns out it's got a door in it and you've just been knocking politely this whole time.\"",
          },
          {
            key: "playful",
            label: "Ask him a follow-up now",
            style: 1,
            close: "\"Immediately? Straight in? No warning?\"\n\nHe answers it. Properly, at length, and then goes suspiciously quiet.\n\n\"...Right. Well. That was horrible and I'd like to do it again.\"",
          },
          {
            key: "bold",
            label: "Say the charm isn't working",
            style: 4,
            close: "\"It's working a bit.\"\n\n\"...It's not working at all, is it. God. Nine years of a flawless system and you've just wandered through it like a door was open.\"\n\n\"Don't tell Edward. He'll be insufferable and he'll be right.\"",
          },
        ],
      },
      keepsake: {
        emoji: "🚪",
        line: "A wall with a door in it that you'd been knocking on the whole time.",
      },
    },

    closeFriend: {
      beats: [
        "**{firstName}**: \"Garden. Now, if you're up. It's the good hour. Everything opens at about four and nobody's ever awake to see it.\"",
        "It is four in the morning and the anomaly garden is doing something quietly extraordinary, and he is standing in the middle of it in gloves and a coat with a look on his face you have never seen at the bar.\n\n\"This is mine. Not the house's, not a job. I started it in my second year because I needed one thing on this campus I couldn't accidentally kill.\"",
        "He holds up both hands, gloved, palms out.\n\n\"Nothing living. That's the deal. Anything with a pulse, one contact, that's it. I don't get a warning and it doesn't get a second chance.\"\n\n\"So I grow things instead. Things that don't have a pulse, that I can put my hands right into.\"\n\nHe looks at the bed nearest you.\n\n\"That row's about eight months old. I started it the week after I met you. I'm not going to say anything else about that, you can do the math yourself.\"",
      ],
      choice: {
        prompt: "\"Right. That's the tour. Say something before I start talking about drainage.\"",
        options: [
          {
            key: "kind",
            label: "Ask what the row is called",
            style: 3,
            close: "He tells you. It is not a real name; it is very obviously a name he made up eight months ago and has been using privately ever since.\n\n\"...Don't,\" he says, before you can say anything. \"I know. I *know*. Let me have it.\"",
          },
          {
            key: "playful",
            label: "Ask about the drainage",
            style: 1,
            close: "\"Oh, you've done it now.\"\n\nHe talks about drainage for twenty-five minutes and it is the happiest you have ever seen him, and at the end of it he says: \"Nobody's ever let me finish that. Not once. Thank you, genuinely, that was the best part of my month.\"",
          },
          {
            key: "bold",
            label: "Take his gloved hand",
            style: 4,
            close: "He goes completely still.\n\n\"That's... there's leather in the way. That doesn't count. That's not really...\"\n\nHe stops. He looks down at your hand round his, and after a moment he closes his fingers, carefully, like a man handling something that could go off.\n\n\"...Okay,\" he says, not brightly at all. \"Okay. It counts. I'd like it to count.\"",
          },
        ],
      },
      keepsake: {
        emoji: "🌱",
        line: "A row of the garden started the week after you met, with a made-up name.",
      },
    },

    confidant: {
      beats: [
        "**{firstName}**: \"Can't sleep. Which is a joke, obviously. I've been not-sleeping for eleven years, it's my whole personality.\"",
        "\"Here's the thing about the curse nobody gets. It's not the touching. Everyone fixates on the touching and honestly the gloves solved that years ago.\"\n\n\"It's that I never get tired. Not once, not ever. There's no end to a day. There's no point at which my body says right, that's enough, stop now.\"\n\n\"So I don't stop. I run the bar and the house and the garden and I keep Edward alive and I organize everyone's everything, because the alternative is sitting in a chair being awake for nine hours.\"",
        "\"And everyone thinks it's cheerfulness. Rui the bright one. Rui who's always up for it.\"\n\n\"I'm not up for it. I've got nowhere to put the hours and I've had eleven years of them, and you're the only person who's ever asked me to sit down.\"",
      ],
      choice: {
        prompt: "\"Right. That's the ugliest thing about me. Your go.\"",
        options: [
          {
            key: "kind",
            label: "Ask him to sit down now",
            style: 3,
            close: "\"...Now?\"\n\nA pause.\n\n\"I don't know how to do that. That's not a joke, I genuinely don't know what the instruction is.\"\n\nSo you talk him through it, badly, over text, and he sits in a chair in the garden for forty minutes doing absolutely nothing, and afterwards he says it was the worst and best thing he's done in a decade.",
          },
          {
            key: "playful",
            label: "Offer him the boring hours",
            style: 1,
            close: "\"You want to *give* me boring? That's the offer?\"\n\n\"...Yeah, alright. Give me the boring ones. I'll take the boring ones. Nobody's ever offered me boring, it's usually jobs.\"",
          },
          {
            key: "bold",
            label: "Tell him he's allowed to stop",
            style: 4,
            close: "There's a long gap.\n\n\"If I stop I'm just a bloke who can't touch anyone, sat in a room, forever.\"\n\nThen, much later: \"That was the real one. Sorry. You asked and I've spent eleven years not answering it and it came out worse than I meant.\"\n\n\"Don't go, though. Say something else. Anything. I've got about six more hours.\"",
          },
        ],
      },
      keepsake: {
        emoji: "⏳",
        line: "Forty minutes of doing nothing, for the first time in eleven years.",
      },
    },

    devoted: {
      beats: [
        '**{firstName}**: "I need to tell you what I did before somebody else does."',
        "\"Edward was going for you in the lower corridor. Not properly. He'd have stopped, he always stops, he's four hundred years old and he has never once not stopped.\"\n\n\"I didn't wait to find out. I got between you.\"\n\n\"Bare-handed. Both gloves off. In front of him.\"",
        "\"He's not living, so it wouldn't have killed him. It would have hurt him a great deal and he'd have deserved none of it, and I did it anyway without a single thought in my head.\"\n\n\"Eleven years I've been the one who's against violence. It's not a pose. I've talked three people out of fights this month. And I took my gloves off in a corridor because somebody was standing near you.\"\n\n\"I've been sitting in the garden since trying to work out who that was, because it wasn't me.\"",
      ],
      choice: {
        prompt: "\"Say it. Whatever it is. I've been sat here two hours waiting to be told.\"",
        options: [
          {
            key: "kind",
            label: "Tell him to put them back on",
            style: 3,
            close: "\"...They're back on. They've been back on for an hour.\"\n\nA pause.\n\n\"I keep taking them off and putting them back on. That's what I've been doing out here. Come and sit with me and make me stop, I've gone a bit strange.\"",
          },
          {
            key: "playful",
            label: "Ask what Edward's face did",
            style: 1,
            close: "\"He went absolutely white. Four hundred years old and he looked like a man who'd been caught scrumping.\"\n\n\"He apologized. Properly, in the old-fashioned way, with the whole construction. I nearly fell over.\"",
          },
          {
            key: "bold",
            label: "Say he was defending you",
            style: 4,
            close: "There's no answer for a long time.\n\nThen he's at your door with the gloves on and a look he can't do anything about, and he holds out one hand, palm up, waiting rather than taking.\n\n\"Yeah,\" he says. \"It was you. I've known for about eight months and I've been growing a row of flowers about it like an absolute coward.\"",
          },
        ],
      },
      keepsake: {
        emoji: "🧤",
        line: "Two gloves taken off in a corridor and put back on in a garden.",
      },
    },

    soulbound: {
      beats: [
        "**{firstName}**: \"Garden. Four in the morning. Don't answer this, just come. If I've got a reply to read I'll lose my nerve reading it.\"",
        "The whole bed is out at once, which does not happen, and he is standing at the end of the row with the made-up name looking like he has been up all night rehearsing, which he has.\n\n\"{timesMet} times. I've got a mark on the bench for each one. I started doing it before I'd admitted why I was doing it.\"",
        "\"I want to say the worst part first so it's out of the way and you can decide with all of it.\"\n\n\"I will never be able to touch you. Not once, not ever, not in forty years. No hand on your face, nothing at the end of a bad day, nothing at all. That is not a thing that gets solved. I've looked. I've looked properly, for eleven years, and there's nothing.\"",
        "\"And I love you anyway. Which is monstrously unfair to you and I've spent eight months deciding not to say it for exactly that reason.\"\n\n\"But I worked out that deciding for you was the actual unfair bit. So: I love you. I've got a garden and a bar and about a thousand spare hours and a pair of gloves, and that's the whole offer, and it's yours if you want it.\"",
      ],
      choice: {
        prompt: "\"Take as long as you need. I've got nothing but hours, remember. It's the one thing I'm rich in.\"",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close: "He laughs, cracked, disbelieving, both hands over his face for a second.\n\nThen he pulls the gloves on tighter, deliberately, and takes both your hands in both of his through two layers of leather, and holds on hard enough that it doesn't matter.\n\n\"This is it,\" he says. \"This is all of it, forever. Are you sure.\"\n\nYou tell him yes. He puts his forehead against yours, the one place a coat collar makes safe, and stays there until it gets light.",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close: "\"Good. Take it. Genuinely, take a lot of it. That's a big thing to hand someone at four in the morning next to a flowerbed.\"\n\n\"And nothing changes. The drink's still on the bar. The garden's still open at four. The row's still called what it's called and I'm not renaming it, because it was true before tonight and it'll be true after.\"\n\n\"I've got eleven years of spare hours, remember. Waiting's the one thing I'm actually built for.\"",
          },
        ],
      },
      keepsake: {
        emoji: "🪑",
        line: "A bench with a mark on it for every time you came.",
      },
    },
  },
  dialogue: {
    new: [
      "He lights up with a radiant smile, practically bouncing with energy. \"Oh wow, look who showed up! You're a sight for sore eyes!\" Behind the brightness, there's a shadow of something darker he's desperately hiding.",
      "He reaches out to greet you, catches himself an inch away, and turns it into a wave.",
      "Everything on his desk is labeled, sorted, and immaculate. He is not.",
      '"Careful, not too close! Sorry. Sorry, that came out weird. Hi!"',
      'He\'s got Edward slung over one shoulder. "Oof, Ed popped out of nowhere so I accidentally touched him and he died again. Gotta carry him all the way back to the dorm..."',
    ],
    known: [
      'He\'s stopped saying "not too close." He just leaves the distance where it is.',
      "He beams. \"Oh hey, it's Honor Roll! Can't believe I ran into you here, so random! Guess we've gotta go on a date now, huh?\"",
      '"You look kind of tired, Honor Roll. Come by the bar later, I\'ll pour you something slow and you can just stop being anywhere else for a while."',
      "He asks how you are and then actually waits, which not everyone does.",
      "He wipes down the same spot on the bar twice. \"Harurin hasn't been in. He's been flat-out with the animals again. I keep a stool open for him, just in case.\"",
      "He's in the anomaly garden, gloves on, snipping the dead heads off a rose bush that's wilting anyway. \"They don't do great near me. I keep planting them anyway.\"",
      "The brightness dims for half a second, and he covers it faster than before.",
    ],
    warm: [
      "His grin is warm and genuine when he sees you, though you catch the moment his cheerfulness falters, like you're the only thing holding back the darkness.",
      "He talks with his whole body, gestures a foot from your shoulder and never landing.",
      "He's halfway through pruning something that keeps leaning toward him. \"New elixir. Try it later. It's mostly safe.\"",
      'The Obscuary bar, lights down, your drink already waiting. He leans on his elbows across from you, close as the curse lets him get. "This is the best part of my night. Don\'t tell the others."',
      '"Look at you! Okay, tell me everything, and don\'t leave the boring parts out."',
      "He hovers close, hands carefully at his sides, and doesn't leave.",
    ],
    spark: [
      "His hand hovers a half-inch from your cheek. Neither of you moves for a while.",
      '"This is the closest I get," he says quietly. "I\'ve gotten very good at it."',
      "He traces the shape of your hand in the air above it, and it's worse than touching.",
      "The brightness is gone. What's underneath wants you badly and can't say so.",
      "He leans in until you can feel him breathing, and stops exactly there.",
    ],
    close: [
      '"You make me feel alive," he says softly, hands hovering near you but never quite touching. "Like the curse doesn\'t matter when you\'re near."',
      "He holds his hand up, palm out, and waits for you to hold yours an inch from it.",
      "The brightness goes quiet. What's underneath is tired, and grateful, and honest.",
      '"One day," he says, not finishing the sentence. He doesn\'t need to.',
      "He walks you to the door and stands in it long after you've gone.",
    ],
    bound: [
      "Gloves. Layers. A scarf between his palm and your cheek. He's worked out every way there is.",
      '"I can\'t touch you," he says, "so I\'ve gotten very inventive. Bear with me."',
      "He kisses you through the fabric of his sleeve and it wrecks you both entirely.",
      "He lies beside you all night with a hand's width of air between, and neither of you sleeps.",
      "He loves you louder than anyone ever has, because it's the one thing the curse can't stop.",
      "\"Sometimes I wish you'd met me as a regular guy,\" he says, light as anything. \"You'd never have looked twice. ...Still glad it went the way it did.\"",
    ],
  },
  temperamentDialogue: {
    new: [
      '"Oh! Lucky me, you wandered in! Come closer... but not too close, yeah? Just let me look at you."',
      "\"Hi! Hi. Don't shake my hand, long story, but it's great to meet you!\"",
      '"You need directions? Paperwork? A friend? I do all three!"',
      '"Whoa, careful... okay, good, you stopped. Phew. Hi!"',
      "\"New face! I keep a list. You're on it now. It's a nice list.\"",
    ],
    known: [
      "\"You're back! Okay, that's officially a pattern. I love a pattern.\"",
      "\"How've you been? No, the real answer. I've got time.\"",
      '"Have you seen Harurin? He hasn\'t stopped by for his drink in days. I worry when he pushes himself that hard."',
      "\"Aw, c'mon Ed, again? Why does he always leave his socks on the floor... It's actually exhausting picking up after him all the time.\"",
      "\"A mission? Nah, I'm good. Take Lyca, he'd be all over it. I'll keep the bar warm for when you're back.\"",
      '"Careful... okay, you already knew. You\'re getting good at this."',
      '"You don\'t flinch anymore. That means a lot, actually."',
    ],
    warm: [
      "\"You're back! You know you make everything feel less dark when you're around? It's actually kind of amazing.\"",
      '"Tell me about your day. All of it. I\'ve got nowhere better to be."',
      '"Come by the bar after, I\'ll mix you something and you can just unwind. No pressure, no plans. Just us."',
      "\"Hands to myself, promise. Doesn't mean I'm not thrilled you're here, cutie.\"",
      '"Hey, hey hey! We finally get to spend some time together, it\'s illegal to take your eyes off me!"',
      "\"My eyes? Ha. Onions. I was prepping the appetizers for the bar, that's all. ...Anyway! You're here.\"",
    ],
    spark: [
      "\"Hold your hand up. Right there. Don't close it. ...God, that's almost enough.\"",
      "\"I'd give up a lot to touch you. Don't tell me what. I've already done the math.\"",
      "\"Okay, that's close enough. For you, I mean. I could stand here all day. Hold right there for me, cutie?\"",
      "\"Honor Roll... were you just checking me out? Hey, it's all good, don't be embarrassed!\"",
      "\"You're an inch away and it's the loudest thing in the room.\"",
    ],
    close: [
      '"Even with this curse, I\'d bear it a thousand times if it meant seeing you smile."',
      '"Hold your hand up. Right there. Close enough counts, right?"',
      "\"I'm okay. Really. I'm better than okay when it's you.\"",
      "\"Don't feel sorry for me. Just... keep coming back. That's the whole ask.\"",
      "\"You're not doing all this for me, are you? ...Don't. I'm not worth rearranging your life over. I just really like having you around.\"",
      "\"One day I'll be able to hold your hand properly. I'm counting on it.\"",
    ],
    bound: [
      '"Hold still. Gloves are on. I\'ve been thinking about this all week."',
      "\"I love you. That one doesn't need hands. That one's free.\"",
      '"Lie down. Right there. I\'ll stay on this side of the air."',
      '"One day I\'ll do this properly. Until then, humor me. Please."',
      '"I\'ve never wanted anything the way I want to hold you. Never."',
    ],
  },
  approach: {
    new: [
      "Wave back",
      "Stop just short",
      "Say hi",
      "Keep a careful distance",
    ],
    known: [
      "Give him the real answer",
      "Keep the careful distance",
      "Make it a pattern",
      "Ask about the note",
    ],
    warm: [
      "Take the good seat",
      "Tell him about your day",
      "Stand as close as you can",
      "Match his brightness",
    ],
    spark: [
      "Hold your hand up",
      "Stop exactly there",
      "Don't close the inch",
      "Lean in anyway",
    ],
    close: [
      "Hold your hand up to his",
      "Go to him",
      "Stay a little longer",
      "Close every inch you can",
    ],
    bound: ["Hold still", "Lie down beside him", "Humor him", "Say it back"],
  },
  responses: {
    kind: {
      new: [
        "Be sincere with him",
        "Thank him for the warning",
        "Tell him it's good to see him",
      ],
      spark: [
        "Hold your palm to his",
        "Tell him the inch is enough",
        "Say you think about it too",
      ],
      close: [
        "Let him know you need him",
        "Say distance doesn't matter",
        "Tell him you'll come back",
      ],
      bound: [
        "Say it back louder",
        "Hold still for the gloves",
        "Tell him this is enough",
      ],
    },
    playful: {
      new: ["Share your happiness", "Ask to be on the list", "Out-cheer him"],
      spark: ["Trace him back", "Close half the inch", "Make him ask for it"],
      close: [
        "Let him see your joy",
        "Play the almost-touching game",
        "Make him laugh for real",
      ],
      bound: ["Get inventive back", "Steal a glove", "Close half the air"],
    },
    bold: {
      new: [
        "Be honest about wanting him",
        "Step closer than allowed",
        "Ask about the curse",
      ],
      spark: [
        "Lean in anyway",
        "Tell him to do the math again",
        "Say the inch isn't enough",
      ],
      close: [
        "Need him without apology",
        "Hold your palm to his",
        "Tell him one day is a promise",
      ],
      bound: [
        "Tell him one day is a promise",
        "Kiss through the sleeve first",
        "Say you want it too",
      ],
    },
    neutral: {
      new: [
        "Simply accept it",
        "Let him talk it out",
        "Keep the careful distance",
      ],
      spark: [
        "Lower your hand",
        "Let the distance win",
        "Say nothing at all",
      ],
      close: [
        "Let him serve in silence",
        "Stay in the quiet with him",
        "Let the brightness rest",
      ],
      bound: [
        "Keep the hand's width",
        "Lie still in the dark",
        "Let the night pass",
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
      '"Oh wow, look who showed up!" **{name}** beams at {user} from a careful arm\'s length.',
      "{user} says the name, and **{name}** reaches out, catches himself an inch away, and turns it into a wave.",
      '"Don\'t shake my hand, long story!" **{name}** tells {user} cheerfully.',
    ],
    warm: [
      '"You\'re back!" **{name}** talks to {user} with his whole body and never quite lands a touch.',
      "{user} calls out, and **{name}**'s brightness stops being a performance for a second.",
      '"Come by the bar after," **{name}** tells {user}. "I\'ll mix you something."',
    ],
    spark: [
      "**{name}** forgets the careful distance {user} is owed. Then remembers. Then regrets remembering.",
      "\"It's illegal to take your eyes off me,\" **{name}** informs {user}, who wasn't going to.",
      "{user} says the name, and the crack under **{name}**'s cheer shows, briefly.",
    ],
    close: [
      '"You\'re not doing all this for me, are you?" **{name}** asks {user}, gloves already on.',
      "**{name}** puts his sleeve between his hand and {user}'s cheek. He's worked out every way there is.",
      "{user} calls, and **{name}** leaves the cuttings he was carrying on the nearest bench.",
    ],
    bound: [
      '"That one doesn\'t need hands," **{name}** says, telling {user} he loves them across two feet of air.',
      "**{name}** reaches {user} and stands as close as the curse allows, which is closer than it used to be.",
      "{user} says the name, and **{name}** stops being happy enough for the both of them and is simply happy.",
    ],
  },
};
