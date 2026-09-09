export default {
  // The level-up DMs (docs/bond-scene-dms.md). Rui's whole ladder is built round
  // the one thing he cannot do: his touch kills the living, so the gloves never
  // come off and the intimacy has to be found everywhere else — a drink made to
  // your taste, a garden grown for you, a hand held through two layers of
  // leather. The brightness is real and it is also a wall; the arc is the wall
  // coming down without the brightness going out.
  //
  // Texting voice, per reference.md's "## Bond Scenes" notes: the odd emoji in
  // his typed lines — crying-laughing 😂, sparkle ✨ — and his eager questions
  // land on "?!". Not in the `> ` lines he says out loud.
  bondScenes: {
    acquaintance: {
      beats: [
        "**{firstName}**: Hey! Okay, first time texting you, I know, very forward of me. But I've got a reason, promise. I made you a drink ✨ and it's just sitting on my bar getting warm. Kind of a tragedy. You should come rescue it?",
        "Okay, full disclosure: I make a drink for everyone who comes in. That part's not special. Don't be impressed yet.\n\nThe part that is: I've remade yours four times. You've been in {timesMet} times and I paid attention to every one, what you finish, what you leave. That's where the four came from.\n\nAnyway! Fifth version's in your glass now ✨ Think I finally got it. Feels good to get something right today, ahaha.",
      ],
      choice: {
        prompt:
          "So?! Come try it, tell me it's the best thing you've ever tasted. Or don't, and I'll just make a sixth. I've got nothing but time, trust me.",
        options: [
          {
            key: "kind",
            label: "Say you'll come right now",
            style: 3,
            close:
              "Ha! Okay. Great. Amazing.\n\nSo I just wiped the bar down twice for absolutely no reason. Super normal thing to do. Don't read into it.",
          },
          {
            key: "playful",
            label: "Demand a sixth on principle",
            style: 1,
            close:
              "Wait, you haven't even tried the fifth one!\n\n...Okay, fine. Sixth it is. Sixth, seventh, whatever you want, cutie, and I'll enjoy every second of it. You knew that though 😂",
          },
          {
            key: "bold",
            label: "Ask what he was watching for",
            style: 4,
            close:
              "You.\n\n...Sorry, that was quick, wasn't it 😂 It's my whole thing though, I'm not gonna pretend it isn't. Come have the drink, cutie. I'm way better in person and only a little less obvious.",
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
        "**{firstName}**: Okay, hang on. Serious for like one second, then I go right back to normal, promise 😂",
        "So here's what I noticed. You come back at me with {favResponse} every time. Even when I'm laying it on thick, you still do.\n\nMost people take the charm at face value and move on. That's kind of the point of it.\n\nYou don't. You ask the next question. The real one. It's a little rude and I've started looking forward to it 😂",
      ],
      choice: {
        prompt:
          "So what happens now that I've gone and said all that?! Asking for a friend. The friend is me, obviously.",
        options: [
          {
            key: "kind",
            label: "Say you'll keep asking",
            style: 3,
            close:
              "...Aw, c'mon. That's not fair.\n\nThat's genuinely not fair. Do you know how long that wall took me?! And it had a door in it the whole time, apparently. You've just been knocking. Politely. Ahaha.",
          },
          {
            key: "playful",
            label: "Ask him a follow-up now",
            style: 1,
            close:
              "Immediately?! Just straight in? No run-up?\n\n*He answers it. Fully, at length, and then goes suspiciously quiet.*\n\n...Okay. Yeah. That was awful and I kind of want to do it again.",
          },
          {
            key: "bold",
            label: "Say the charm isn't working",
            style: 4,
            close:
              "It's working a little.\n\n...It's not working at all, is it. Man. Years of a flawless system and you just strolled right through it 😂\n\nDon't tell Edward. He'll be unbearable about it. And he'll be right.",
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
        "**{firstName}**: Hey, you up? Come to the garden. It's the good hour, everything opens around four ✨ and nobody's ever awake for it. Their loss.",
        "*It is four in the morning and the anomaly garden is doing something quietly extraordinary, and he is standing in the middle of it in gloves and a coat with a look about him you've never seen at the bar.*\n\n> This one's mine. Not the house's, not a job, not anything. I started it my second year because I wanted one thing on this campus I couldn't accidentally kill.",
        "*He holds up both hands, gloved, palms out.*\n\n> Nothing living. That's the deal. Anything with a pulse, one contact, that's it. No warning, no second chance.\n\n> So I grow things instead. Things without a pulse, that I can put my hands right into.\n\n*He looks at the bed nearest you.*\n\n> That row's about eight months old. Started it the week after I met you. And that's all I'm saying about that one, you can do the math.",
      ],
      choice: {
        prompt:
          "Okay. That's the tour. Say something quick, before I start telling you about drainage.",
        options: [
          {
            key: "kind",
            label: "Ask what the row is called",
            style: 3,
            close:
              "*He tells you. It is not a real name; it is very obviously a name he made up eight months ago and has been using privately ever since.*\n\n> ...Don't,\n\n*he says, before you can say anything.*\n\n> I know. I *know*. Let me have it.",
          },
          {
            key: "playful",
            label: "Ask about the drainage",
            style: 1,
            close:
              "> Oh, you've done it now.\n\n*He talks about drainage for twenty-five minutes and it is the happiest you have ever seen him, and at the end of it he says:*\n\n> Nobody's ever let me finish that. Not once. Thank you, genuinely, that was the best part of my month.",
          },
          {
            key: "bold",
            label: "Take his gloved hand",
            style: 4,
            close:
              "*He goes completely still.*\n\n> That's... there's leather in the way. That doesn't count. That's not really...\n\n*He stops. He looks down at your hand round his, and after a moment he closes his fingers, carefully, like a man handling something that could go off.*\n\n> ...Okay,\n\n*he says, not brightly at all.*\n\n> Okay. It counts. I'd like it to count.",
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
        "**{firstName}**: Can't sleep. Which is a joke coming from me, obviously 😂 I've been not-sleeping since the curse, curse twin. It's basically my whole personality now.",
        "Here's the part about the curse nobody gets. It's not the touching. The gloves fixed that years ago.\n\nIt's that I never get tired. Like, ever. There's no point where my body goes okay, that's enough, sit down.\n\nSo I don't. I run the bar, the house, the garden, I keep Edward alive, I sort out everyone's everything. The other option is nine hours in a chair, wide awake.",
        "And everyone reads it as cheerfulness. Rui the bright one. Rui who's always up for it.\n\nI'm not, really. I've just got nowhere to put the hours, and there've been a lot of them. You're the first person who's ever told me to sit down.",
      ],
      choice: {
        prompt: "Okay. That's the ugly one. Your turn.",
        options: [
          {
            key: "kind",
            label: "Ask him to sit down now",
            style: 3,
            close:
              "...Now?!\n\nI don't know how to do that. That's not a joke, I genuinely don't know what the instruction is.\n\n*So you talk him through it, badly, over text, and he sits in a chair in the garden for forty minutes doing absolutely nothing, and afterwards he says it was the worst and best thing he's done in years.*",
          },
          {
            key: "playful",
            label: "Offer him the boring hours",
            style: 1,
            close:
              "You want to *give* me boring?! That's the offer?\n\n...Yeah, alright. Give me the boring ones. I'll take the boring ones. Nobody's ever offered me boring, it's usually jobs.",
          },
          {
            key: "bold",
            label: "Tell him he's allowed to stop",
            style: 4,
            close:
              "*There's a long gap.*\n\nIf I stop I'm just a guy who can't touch anyone, stuck in a room, forever.\n\n*Then, much later:* That was the real one. Sorry. You asked and I've spent years not answering it and it came out worse than I meant.\n\nDon't go, though. Say something else. Anything. I've got about six more hours.",
          },
        ],
      },
      keepsake: {
        emoji: "⏳",
        line: "Forty minutes of doing nothing, for the first time since the curse.",
      },
    },

    devoted: {
      beats: [
        "**{firstName}**: I need to tell you what I did before somebody else does.",
        "Edward was going for you in the lower hallway. Not seriously. He always pulls back, he's four hundred years old and he's never once not pulled back.\n\nI didn't wait to find out. I got between you.\n\nBare-handed. Both gloves off. In front of him.",
        "He's not living, so it wouldn't have killed him. It would've hurt him badly and he wouldn't have deserved it, and I did it anyway, no thought in my head.\n\nI'm the guy who's against violence. Always have been. I talked three people out of fights just this month. And then I pulled my gloves off in a hallway because someone stood too close to you.\n\nI've been in the garden ever since, trying to figure out who that was. Because it wasn't me.",
      ],
      choice: {
        prompt:
          "Say it. Whatever it is. I've been sitting out here for two hours waiting to hear it.",
        options: [
          {
            key: "kind",
            label: "Tell him to put them back on",
            style: 3,
            close:
              "...They're back on. Have been for an hour.\n\nI keep pulling them off and putting them back on. That's the whole activity out here. Come sit with me and make me stop. I'm not quite myself tonight.",
          },
          {
            key: "playful",
            label: "Ask how Edward took it",
            style: 1,
            close:
              "He went white as a sheet. Four hundred years old and caught with his hand in the cookie jar.\n\nThen he apologized. The full old-world version, every formal clause of it. I almost passed out 😂",
          },
          {
            key: "bold",
            label: "Say he was defending you",
            style: 4,
            close:
              "*There's no answer for a long time.*\n\n*Then he's at your door with the gloves on and a look he can't do anything about, and he holds out one hand, palm up, waiting rather than taking.*\n\n> Yeah,\n\n*he says.*\n\n> It was you. Figured that out about eight months ago, and I've been growing a flowerbed about it instead of saying so, like a total coward.",
          },
        ],
      },
      keepsake: {
        emoji: "🧤",
        line: "Two gloves pulled off in a hallway and put back on in a garden.",
      },
    },

    soulbound: {
      beats: [
        "**{firstName}**: Garden. Four a.m. Don't reply to this, just come, okay? If there's a message sitting there for me to read I'll lose my nerve halfway through it.",
        "*The whole bed is out at once, which does not happen, and he is standing at the end of the row with the made-up name looking like he has been up all night rehearsing, which he has.*\n\n> {timesMet} times. I've got a mark on the bench for each one. I started doing it before I'd admitted why I was doing it.",
        "> I want to say the worst part first, so you can decide with all of it in front of you.\n\n> I will never be able to touch you. Not once, not in forty years. No hand on your face, nothing at the end of a bad day. That doesn't get fixed. I've looked, really looked, ever since the curse, and there's nothing there.",
        "> And I love you anyway. Which is such a raw deal for you, and I spent eight months not saying it for that exact reason.\n\n> Then it hit me that making that call for you was the actually unfair part. So. I love you. I've got a garden, a bar, about a thousand spare hours, and a pair of gloves. That's the whole offer. It's yours if you want it.",
      ],
      choice: {
        prompt:
          "Take as long as you need. I've got nothing but hours, remember. It's the one thing I'm rich in.",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close:
              "*He laughs, cracked, disbelieving, both hands over his face for a second.*\n\n*Then he pulls the gloves on tighter, deliberately, and takes both your hands in both of his through two layers of leather, and holds on hard enough that it doesn't matter.*\n\n> This is it,\n\n*he says.*\n\n> This is all of it, forever. Are you sure.\n\n*You tell him yes. He puts his forehead against yours, the one place a coat collar makes safe, and stays there until it gets light.*",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close:
              "> Good. Take it. Genuinely, take a lot of it. That's a big thing to hand someone at four in the morning next to a flowerbed.\n\n> And nothing changes. The drink's still on the bar. The garden's still open at four. The row's still called what it's called and I'm not renaming it, because it was true before tonight and it'll be true after.\n\n> I've got years of spare hours, remember. Waiting's the one thing I'm actually built for.",
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
      "He lights up, practically bouncing. \"Oh wow, look who showed up! You're a sight for sore eyes!\" The brightness is real. It's also working a little too hard.",
      "He reaches out to greet you, catches himself an inch away, and turns it into a wave.",
      "Everything on his desk is labeled, sorted, and immaculate. He is not.",
      '"Careful, not too close! Sorry. Sorry, that came out weird. Hi!"',
      'He\'s got Edward slung over one shoulder. "Oof, Ed popped out of nowhere so I accidentally touched him and he died again. Gotta carry him all the way back to the dorm..."',
    ],
    known: [
      "He's stopped warning you off. The careful distance is still there. It always will be. He just doesn't say it out loud anymore.",
      "He beams. \"Oh hey, it's Honor Roll! Can't believe I ran into you here, so random! Guess we've gotta go on a date now, huh?\"",
      '"You look wiped, Honor Roll. Come by the bar later? I\'ll make you something easy and you can just... not be anywhere else for a bit."',
      "He asks how you are and then actually waits, which not everyone does.",
      "He wipes down the same spot on the bar twice. \"Harurin hasn't been in. He's been swamped with the animals again. I keep a stool open for him, just in case.\"",
      "He's in the anomaly garden, gloves on, snipping the dead heads off a rose bush that's wilting anyway. \"They don't do great near me. I keep planting them anyway.\"",
      "The brightness dims for half a second, and he covers it faster than before.",
    ],
    warm: [
      "His grin is real when he sees you. You also catch the half-second where it slips, like you're the only thing standing between him and a very long night.",
      "He talks with his whole body, gestures a foot from your shoulder and never landing.",
      "He's halfway through pruning something that keeps leaning toward him. \"New elixir. Try it later. It's mostly safe.\"",
      'The Obscuary bar, lights down, your drink already waiting. He leans on his elbows across from you, close as the curse lets him get. "This is the best part of my night. Don\'t tell the others."',
      '"Look at you! Okay, tell me everything, and don\'t leave the boring parts out."',
      "He hovers close, hands carefully at his sides, and doesn't leave.",
    ],
    spark: [
      "His hand hovers a half-inch from your cheek. Neither of you moves for a while.",
      '"This is as close as I get," he says. "I\'ve had a lot of practice. Wish I hadn\'t, but I have."',
      "He traces the shape of your hand in the air above it, and it's worse than touching.",
      "The brightness is gone. What's underneath wants you badly and can't say so.",
      "He leans in until you can feel him breathing, and stops exactly there.",
    ],
    close: [
      '"You don\'t make me forget the curse. The gloves see to that," he says, hands staying carefully at his sides. "You just make it feel less like the whole story. That\'s a big deal, actually."',
      "He holds his hand up, palm out, and waits for you to hold yours an inch from it.",
      "The brightness goes quiet. What's underneath is tired, and grateful, and honest.",
      '"One day," he says, not finishing the sentence. He doesn\'t need to.',
      "He walks you to the door and stands in it long after you've gone.",
    ],
    bound: [
      "Gloves. Layers. A scarf between his palm and your cheek. He's worked out every way there is.",
      '"Can\'t touch you," he says, "so I\'ve gotten creative. Just go with it."',
      "He kisses you through the fabric of his sleeve and it wrecks you both entirely.",
      "He lies beside you all night with a hand's width of air between, and neither of you sleeps.",
      "He loves you louder than anyone ever has, because it's the one thing the curse can't stop.",
      '"Sometimes I wish you\'d met me as a regular guy," he says, light as anything. "You\'d never have looked twice. ...Still glad it went the way it did."',
    ],
  },
  temperamentDialogue: {
    new: [
      '"Oh! Lucky me, you wandered in! Come closer... but not too close, yeah? Just let me look at you."',
      "\"Hi! Hi. Don't shake my hand, long story, but it's great to meet you!\"",
      '"You need directions? Paperwork? A friend? I do all three!"',
      '"Whoa, careful... okay, good, you stopped. Phew. Hi!"',
      '"New face! I keep a list. You\'re on it now," he says with a wink.',
    ],
    known: [
      "\"You're back! Okay, that's officially a pattern. I love a pattern.\"",
      "\"How've you been? No, the real answer. I've got time.\"",
      '"Have you seen Haru? He hasn\'t stopped by for his drink in days. I worry when he pushes himself that hard."',
      "\"Aw, c'mon Ed, again? Why does he always leave his socks on the floor... It's actually exhausting picking up after him all the time.\"",
      "\"A mission? Nah, I'm good. Take Lyca, he'd be all over it. I'll keep the bar warm for when you're back.\"",
      '"Careful... okay, you already knew. You\'re getting good at this."',
      '"You don\'t flinch anymore. That means a lot, actually."',
    ],
    warm: [
      "\"You're back! You know it's genuinely brighter in here when you're around? Like, measurably. Kind of amazing.\"",
      '"Tell me about your day. All of it. I\'ve got nowhere better to be."',
      '"Come by the bar after, I\'ll mix you something and you can just unwind. No pressure, no plans. Just us."',
      "\"Hands to myself, promise. Doesn't mean I'm not thrilled you're here, cutie.\"",
      '"Hey, hey hey! We finally get to spend some time together, it\'s illegal to take your eyes off me!"',
      "\"My eyes? Ha. Onions. I was prepping the appetizers for the bar, that's all. ...Anyway! You're here.\"",
    ],
    spark: [
      "\"Hold your hand up. Right there. Don't close it. ...Honestly, that's almost enough.\"",
      "\"I'd trade a lot to be able to touch you right now. Don't ask me what, I've already done the math, ahaha.\"",
      '"Okay, that\'s close enough. For you, I mean. I could stand here all day. Hold right there for me, cutie?"',
      "\"Honor Roll... were you just checking me out? Hey, it's all good, don't be embarrassed!\"",
      "\"You're one inch away and I swear it's the loudest thing in the whole room.\"",
    ],
    close: [
      '"This curse is worth putting up with on the days you smile at me like that. Easily."',
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
      '"I\'ve never wanted anything like I want to just hold you. Never. ...Sorry. Heavy. But true."',
    ],
  },
  approach: {
    new: ["Wave back", "Stop just short", "Say hi", "Keep a careful distance"],
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
      spark: ["Lower your hand", "Let the distance win", "Say nothing at all"],
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
      "**{name}** puts his sleeve between his hand and {user}'s cheek.",
      "{user} calls, and **{name}** leaves the cuttings he was carrying on the nearest bench.",
    ],
    bound: [
      '"Whole curse, and it never stopped me from wanting to be with you." **{name}** says it to {user} across the gap.',
      "**{name}** reaches {user} and stands as close as the curse allows, which is closer than it used to be.",
      "{user} says the name, and **{name}** stops being happy enough for the both of them and is simply happy.",
    ],
  },
};
