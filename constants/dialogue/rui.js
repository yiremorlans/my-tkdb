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
        "**{firstName}**: Hey, Honor Roll! 🤗 First time texting you, I know, very forward of me. But I've got a reason, promise. I made you a drink ✨ and it's just sitting on my bar getting warm. Kind of a tragedy. Come rescue it?",
        "Okay, full disclosure: I make a drink for everyone who comes in. That part's not special.\n\nThe part that is: I've remade yours four times. You've been in {timesMet} times and I paid attention to what you finish, what you leave. That's where the four came from.\n\nAnyway! Fifth version's in your glass now ✨ Pretty sure I nailed it this time.",
      ],
      choice: {
        prompt:
          "So?! Come try it, tell me it's the best thing you've ever tasted. Or don't, and I'll just make a sixth. I've got nothing but time, trust me. 😂",
        options: [
          {
            key: "kind",
            label: "Say you'll come right now",
            style: 3,
            close:
              "Ha. Knew you would.\n\nDrink's poured, seat's got your name on it, and I'm gonna stand here looking smug till you show. Come on, cutie.",
          },
          {
            key: "playful",
            label: "Say you're busy again",
            style: 1,
            close:
              "Busy. Again. You are always busy 😂\n\nWhat's it going to take?! Drink didn't do it, four remakes didn't do it. Live band? Dessert cart? Name your price and I'll have it set up by the time you walk in.",
          },
          {
            key: "bold",
            label: "Ask what he was watching for",
            style: 4,
            close:
              "You. Obviously 😂\n\nWatching you is the best part of my shift, easy.\n\nCome have the drink, cutie. I'm better up close, and barely less obvious about it.",
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
              "...Aw, c'mon. That's not fair.\n\nThat's genuinely not fair. Do you know how long that act took me?! And you've just been ordering off-menu the whole time. Politely. Ahaha.",
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
              "It's working a little.\n\n...It's not working at all, is it. Man. Years of a flawless system and you just strolled right through it 😂\n\nDon't tell Ed. He'll be unbearable about it. And he'll be right.",
          },
        ],
      },
      keepsake: {
        emoji: "🧾",
        line: "An off-menu order he didn't know he could fill.",
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
      {
        line: "He lights up, practically bouncing. \"Oh wow, look who showed up! You're a sight for sore eyes!\" The brightness is real. It's also working a little too hard.",
        approach: "Say hi",
        greeting:
          '"Oh! Lucky me, you wandered in! Come closer... but not too close, yeah? Just let me look at you."',
        responses: {
          kind: ["Tell him it's good to see him", "Smile back just as brightly"],
          playful: ["Share your happiness", "Ask how close is too close"],
          bold: ["Ask if the brightness is real", "Step closer anyway"],
          neutral: ["Simply accept it", "Stay where you are"],
        },
      },
      {
        line: "He reaches out to greet you, catches himself an inch away, and turns it into a wave.",
        approach: "Wave back",
        greeting:
          "\"Hi! Hi. Don't shake my hand, long story, but it's great to meet you!\"",
        responses: {
          kind: ["Thank him for the warning", "Say a wave works fine"],
          playful: ["Out-cheer him", "Offer an air high-five"],
          bold: ["Ask about the curse", "Ask for the long story"],
          neutral: ["Wave back, say nothing", "Keep your hands to yourself"],
        },
      },
      {
        line: "Every bottle behind his bar is labeled, sorted, and lined up by height. Strange, for someone who plays at being so carefree.",
        approach: "Ask about the order",
        greeting:
          '"Oh, the bottles? Ha, you noticed! Can\'t pour a good drink if you can\'t find anything, right?"',
        responses: {
          kind: ["Be sincere with him", "Say it's impressive work"],
          playful: ["Tease the sorted bottles", "Nudge one out of line"],
          bold: ["Ask what the order means", "Say he's not that carefree"],
          neutral: ["Let him talk it out", "Watch him pour"],
        },
      },
      {
        line: '"Careful, not too close! Sorry. Sorry, that came out weird. Hi!"',
        approach: "Keep a careful distance",
        greeting: '"Whoa, careful... okay, good, you stopped. Phew. Hi!"',
        responses: {
          kind: ["Reassure him you're fine", "Say you don't mind the space"],
          playful: ["Lean in on purpose, teasing", "Ask if this is close enough"],
          bold: ["Step closer than allowed", "Ask why you can't come closer"],
          neutral: ["Keep the careful distance", "Stay put and say hi"],
        },
      },
      {
        line: 'He\'s got Edward slung over one shoulder. "Oof, Ed popped out of nowhere so I accidentally touched him and he died again. Gotta carry him all the way back to the dorm..."',
        approach: "Ask if this happens a lot",
        greeting:
          '"Ahaha, yeah, kinda a lot! Don\'t worry, he\'ll be back up in no time. He always is."',
        responses: {
          kind: ["Offer to help carry Edward", "Ask if Edward's okay"],
          playful: ["Ask if he does it on purpose", "Offer to carry his feet"],
          bold: ["Ask how often he dies", "Say Edward should watch out"],
          neutral: ["Nod, unbothered", "Step aside to let him pass"],
        },
      },
    ],
    known: [
      {
        line: "He's stopped warning you off. The careful distance is still there. He just doesn't say it out loud anymore.",
        approach: "Keep the careful distance",
        greeting:
          '"Careful... okay, you already knew. You\'re getting good at this."',
        responses: {
          kind: ["Say you noticed the care", "Thank him for the distance"],
          playful: [
            "Tease him for not saying it",
            "Ask if he's still counting",
          ],
          bold: ["Close the distance anyway", "Say you don't need the warning"],
          neutral: ["Keep the distance, say nothing", "Nod, keep your space"],
        },
      },
      {
        line: "He beams. \"Oh hey, it's Honor Roll! Can't believe I ran into you here, so random! Guess we've gotta go on a date now, huh?\" Then throws in a wink for good measure.",
        approach: "Make it a pattern",
        greeting:
          "\"You're back! Okay, that's officially a pattern. I love a pattern.\"",
        responses: {
          kind: ["Say you don't mind the pattern", "Agree, warmly"],
          playful: ["Demand an actual date then", "Wink back"],
          bold: [
            "Say yes to the date, plainly",
            "Call the pattern intentional",
          ],
          neutral: ["Shrug at the pattern", "Let the joke pass"],
        },
      },
      {
        line: '"You look wiped, Honor Roll. Come by the bar later? I\'ll make you something easygoing and you can zone out for a bit."',
        approach: "Take him up on it",
        greeting:
          '"Hey, cutie, you made it! I was starting to think you found a better bar."',
        responses: {
          kind: ["Take him up on it gladly", "Say that sounds nice"],
          playful: ["Demand the fanciest drink", "Tease him for reading you"],
          bold: ["Show up and demand it now", "Say he's right, you're wiped"],
          neutral: ["Nod, say maybe later", "Take the offer, say nothing"],
        },
      },
      {
        line: "He remembers something you mentioned once in passing, weeks ago, and brings it up like it's nothing.",
        approach: "Ask how he remembered that",
        greeting:
          '"What, you think I\'d forget? Nah. You said it, so it stuck. Easy!"',
        responses: {
          kind: ["Say that means a lot", "Thank him for remembering"],
          playful: [
            "Ask what else he's tracking",
            "Act suspicious of the memory",
          ],
          bold: ["Say of course he remembered", "Ask why he pays attention"],
          neutral: ["Shrug, say nothing", "Let it go unremarked"],
        },
      },
      {
        line: "He wipes down the same spot on the bar twice. \"Harurin hasn't been in. He's been swamped with the animals again. I keep a stool open for him, just in case.\"",
        approach: "Ask about Haru",
        greeting:
          '"Have you seen Haru? He hasn\'t stopped by for his drink in days. I worry when he pushes himself that hard."',
        responses: {
          kind: ["Say you hope Haru's okay", "Offer to check on Haru too"],
          playful: ["Tease him for the warm stool", "Guess when Haru'll show"],
          bold: ["Say Haru's a big boy", "Push him to just text Haru"],
          neutral: ["Shrug, say nothing", "Let it go unremarked"],
        },
      },
      {
        line: "He's in the anomaly garden, gloves on, coaxing something rare and half-feral into blooming for him. \"This one's fussy. Doesn't do that for just anyone.\"",
        approach: "Ask what it is",
        greeting:
          '"Shh, don\'t spook it. ...Okay, you\'re good. It likes you. I can tell."',
        responses: {
          kind: ["Ask gently about the flower", "Admire his patience with it"],
          playful: ["Ask if it likes you too", "Claim you're fussy as well"],
          bold: ["Say you're not just anyone", "Demand it bloom for you too"],
          neutral: ["Watch quietly", "Say nothing, just watch"],
        },
      },
      {
        line: "For a second he looks like he's turning the same old question over again, then the smile clicks back into place like a switch.",
        approach: "Notice it anyway",
        greeting:
          '"Hm? Oh, sorry, spaced out for a sec! Totally fine. What were we talking about?"',
        responses: {
          kind: ["Let him have the smile", "Say he doesn't have to perform"],
          playful: ["Call out the switch flip", "Tease the recovery"],
          bold: ["Name what just happened", "Ask what he was thinking"],
          neutral: ["Let it go unremarked", "Say nothing about it"],
        },
      },
      {
        line: "He's left a small handwritten note tucked in your bag, something dumb and encouraging, unsigned like you wouldn't know it was him.",
        approach: "Ask about the note",
        greeting:
          '"What note? I don\'t know anything about a note. ...Did it help, though?"',
        responses: {
          kind: ["Say the note made your day", "Thank him quietly for it"],
          playful: ["Pretend you don't know who", "Demand he admit it was him"],
          bold: ["Say you knew it was him", "Call him out directly"],
          neutral: ["Keep the note, say nothing", "Say nothing about it"],
        },
      },
      {
        line: '"We could hang out later, if you\'re free. Ahaha, no pressure though," he says, already bracing for you to say no.',
        approach: "Say yes",
        greeting:
          '"Wait, seriously? You\'re free? Okay, okay, don\'t change your mind!"',
        responses: {
          kind: ["Say yes warmly", "Reassure him it's not pressure"],
          playful: ["Make him sweat a little first", "Ask what he's planning"],
          bold: ["Say yes immediately, plainly", "Ask him out yourself"],
          neutral: ["Say maybe, unbothered", "Shrug, say we'll see"],
        },
      },
      {
        line: "He's already got your drink order memorized, down to how much ice you actually want versus what you ask for.",
        approach: "Order the usual",
        greeting:
          '"Your usual, coming right up! Less ice than you ask for, right? Ahaha, I pay attention."',
        responses: {
          kind: ["Thank him for remembering", "Say that's sweet, honestly"],
          playful: [
            "Test if he really remembers",
            "Order something new instead",
          ],
          bold: ["Say of course he remembered", "Demand he never forget it"],
          neutral: ["Order the usual, say nothing", "Nod, take the drink"],
        },
      },
      {
        line: "\"Aw, don't worry about me,\" he deflects, fast, before you've even finished the sentence.",
        approach: "Worry about him anyway",
        greeting: "\"How've you been? No, the real answer. I've got time.\"",
        responses: {
          kind: ["Push gently, kindly", "Say you're not going anywhere"],
          playful: ["Call out the deflection", "Bribe him with a real answer"],
          bold: ["Refuse to let him deflect", "Demand the real answer now"],
          neutral: ["Let him deflect, say nothing", "Drop it, unbothered"],
        },
      },
      {
        line: "He's fending off Edward on your behalf again, with a little more bite than usual.",
        approach: "Thank him for the cover",
        greeting:
          '"Ed, back off, seriously. Go bug somebody else. ...Sorry, cutie. He\'s such a creep, I swear."',
        responses: {
          kind: ["Thank him for the cover", "Say he didn't have to"],
          playful: ["Ask what Edward did this time", "Tease him for the bite"],
          bold: ["Say you can handle Edward", "Tell him to save the bite"],
          neutral: ["Shrug, say nothing", "Let it go unremarked"],
        },
      },
      {
        line: "\"You're not doing all this for me, are you?\" he asks, light, like the answer doesn't actually matter to him.",
        approach: "Tell him the truth",
        greeting:
          "\"You're not doing all this for me, are you? ...Don't. I'm not worth rearranging your life over. I just really like having you around.\"",
        responses: {
          kind: ["Say it's not just for him", "Reassure him gently"],
          playful: ["Deflect right back at him", "Tease him for asking"],
          bold: ["Say yes, plainly", "Admit it outright"],
          neutral: ["Shrug, say nothing", "Let the question hang"],
        },
      },
    ],
    warm: [
      {
        line: "His grin is real when he sees you. You also catch the half-second where it slips, like you're the only thing standing between him and a very long night.",
        approach: "Match his brightness",
        greeting:
          "\"You're back! You know it's genuinely brighter in here when you're around? Like, measurably. Kind of amazing.\"",
        responses: {
          kind: ["Say you're glad to be back", "Ask about the long night"],
          playful: ["Ask what's making it brighter", "Ask for measurements"],
          bold: ["Say you noticed the slip", "Say the grin can drop"],
          neutral: ["Match him, say little", "Brighten up a little"],
        },
      },
      {
        line: "He talks with his whole body, gestures a foot from your shoulder and never landing.",
        approach: "Take the good seat",
        greeting:
          '"Hey, hey hey! We finally get to spend some time together, it\'s illegal to take your eyes off me!"',
        responses: {
          kind: ["Take the seat gladly", "Say you'd never look away"],
          playful: [
            "Follow the gestures teasingly",
            "Follow the rules, eyes on him",
          ],
          bold: ["Say his whole body agrees", "Catch a gesture mid-air"],
          neutral: ["Take the seat, say nothing", "Sit and watch him talk"],
        },
      },
      {
        line: "He's halfway through pruning something that keeps leaning toward him. \"New elixir. Try it later. It's mostly safe.\"",
        approach: "Try the elixir",
        greeting:
          "\"My eyes? Ha. Onions. I was prepping the appetizers for the bar, that's all. ...Anyway! You're here.\"",
        responses: {
          kind: ["Try it and be honest", "Let the onion story pass"],
          playful: ["Ask what 'mostly' means", "Demand the full ingredients"],
          bold: ["Try it without hesitation", "Drink the whole thing"],
          neutral: ["Try it, say nothing", "Pocket it for later"],
        },
      },
      {
        line: 'The Obscuary bar, lights down, your drink already waiting. He leans on his elbows across from you, close as the curse lets him get. "This is the best part of my night. Don\'t tell the others."',
        approach: "Stand as close as you can",
        greeting:
          '"Come by the bar after, I\'ll mix you something and you can just unwind. No pressure, no plans. Just us."',
        responses: {
          kind: ["Say the closeness is enough", "Say this is your best part"],
          playful: ["Lean in just as close", "Promise not to tell"],
          bold: ["Wish he could be closer too", "Ask him to stay there"],
          neutral: ["Stay close, say nothing", "Take the drink, listen"],
        },
      },
      {
        line: '"Look at you! Okay, tell me everything, and don\'t leave the boring parts out."',
        approach: "Tell him about your day",
        greeting:
          '"Tell me about your day. All of it. I\'ve got nowhere better to be."',
        responses: {
          kind: ["Tell him everything gladly", "Ask about his day too"],
          playful: [
            "Save the boring parts anyway",
            "Start with the dullest part",
          ],
          bold: ["Tell him the good parts first", "Ask what he wants to hear"],
          neutral: ["Give a short version", "Tell him the main points"],
        },
      },
      {
        line: "He hovers close, hands carefully at his sides, and doesn't leave.",
        approach: "Let him linger",
        greeting:
          "\"Hands to myself, promise. Doesn't mean I'm not thrilled you're here, cutie.\"",
        responses: {
          kind: ["Let him linger gladly", "Say the promise isn't needed"],
          playful: ["Tease him for hovering", "Call him 'cutie' back"],
          bold: ["Say you don't mind him close", "Stand closer than he does"],
          neutral: ["Let him stay, say nothing", "Let him hover, keep talking"],
        },
      },
    ],
    spark: [
      {
        line: "His hand hovers a half-inch from your cheek. Neither of you moves for a while.",
        approach: "Don't close the inch",
        greeting:
          "\"Hold your hand up. Right there. Don't close it. ...Honestly, that's almost enough.\"",
        responses: {
          kind: "Tell him the inch is enough",
          playful: "Trace him back",
          bold: "Say the inch isn't enough",
          neutral: "Lower your hand",
        },
      },
      {
        line: '"This is as close as I get," he says. "I\'ve had a lot of practice. Wish I hadn\'t, but I have."',
        approach: "Take what he can give",
        greeting:
          "\"I'd trade a lot to be able to touch you right now. Don't ask me what, I've already done the math, ahaha.\"",
        responses: {
          kind: "Say you think about it too",
          playful: "Ask what the math said",
          bold: "Tell him to do the math again",
          neutral: "Say nothing at all",
        },
      },
      {
        line: "He traces the shape of your hand in the air above it, and it's worse than touching.",
        approach: "Hold your hand up",
        greeting:
          '"Okay, that\'s close enough. For you, I mean. I could stand here all day. Hold right there for me, cutie?"',
        responses: {
          kind: "Hold your palm to his",
          playful: "Close half the inch",
          bold: "Press where his hand traced",
          neutral: "Let him trace, say nothing",
        },
      },
      {
        line: "The brightness is gone. What's underneath wants you badly and can't say so.",
        approach: "Lean in anyway",
        greeting:
          "\"Honor Roll... were you just checking me out? Hey, it's all good, don't be embarrassed!\"",
        responses: {
          kind: "Say you want him too, gently",
          playful: "Make him ask for it",
          bold: "Say it for him",
          neutral: "Let the distance win",
        },
      },
      {
        line: "He leans in until you can feel him breathing, and stops exactly there.",
        approach: "Stop exactly there",
        greeting:
          "\"You're one inch away and I swear it's the loudest thing in the whole room.\"",
        responses: {
          kind: "Stay right where he stopped",
          playful: "Count how long he'll wait",
          bold: "Lean in anyway",
          neutral: "Hold still, say nothing",
        },
      },
    ],
    close: [
      {
        line: '"You don\'t make me forget the curse. The gloves see to that," he says, hands staying carefully at his sides. "You just make it feel less like the whole story. That\'s a big deal, actually."',
        approach: "Go to him",
        greeting:
          '"This curse is worth putting up with on the days you smile at me like that. Easily."',
        responses: {
          kind: "Say distance doesn't matter",
          playful: "Play the almost-touching game",
          bold: "Need him without apology",
          neutral: "Stay in the quiet with him",
        },
      },
      {
        line: "He holds his hand up, palm out, and waits for you to hold yours an inch from it.",
        approach: "Hold your hand up to his",
        greeting:
          '"Hold your hand up. Right there. Close enough counts, right?"',
        responses: {
          kind: "Let him know you need him",
          playful: "Tease the almost-touch",
          bold: "Hold your palm to his",
          neutral: "Hold your palm still, silent",
        },
      },
      {
        line: "The brightness goes quiet. What's underneath is tired, and grateful, and honest.",
        approach: "Let him be tired",
        greeting: "\"I'm okay. Really. I'm better than okay when it's you.\"",
        responses: {
          kind: "Let him be tired, gently",
          playful: "Make him laugh for real",
          bold: "Say you see all of him",
          neutral: "Let the brightness rest",
        },
      },
      {
        line: '"One day," he says, not finishing the sentence. He doesn\'t need to.',
        approach: "Close every inch you can",
        greeting:
          "\"One day I'll be able to hold your hand properly. I'm counting on it.\"",
        responses: {
          kind: "Say you'll wait for one day",
          playful: "Ask how long 'one day' is",
          bold: "Tell him one day is a promise",
          neutral: "Let him serve in silence",
        },
      },
      {
        line: "He walks you to the door and stands in it long after you've gone.",
        approach: "Stay a little longer",
        greeting:
          "\"Don't feel sorry for me. Just... keep coming back. That's the whole ask.\"",
        responses: {
          kind: "Tell him you'll come back",
          playful: "Tease him for standing there",
          bold: "Say you're already coming back",
          neutral: "Look back once, say nothing",
        },
      },
    ],
    bound: [
      {
        line: "Gloves. Layers. A scarf between his palm and your cheek. He's worked out every way there is.",
        approach: "Hold still",
        greeting:
          '"Hold still. Gloves are on. I\'ve been thinking about this all week."',
        responses: {
          kind: "Hold still for the gloves",
          playful: "Steal a glove",
          bold: "Say he's thought of everything",
          neutral: "Hold still, say nothing",
        },
      },
      {
        line: '"Can\'t touch you," he says, "so I\'ve gotten creative. Just go with it."',
        approach: "Humor him",
        greeting:
          '"One day I\'ll do this properly. Until then, humor me. Please."',
        responses: {
          kind: "Tell him this is enough",
          playful: "Get inventive back",
          bold: "Tell him one day is a promise",
          neutral: "Go with it, say nothing",
        },
      },
      {
        line: "He kisses you through the fabric of his sleeve and it wrecks you both entirely.",
        approach: "Kiss him back through it",
        greeting:
          '"Ahaha... look at us. The sleeve stays, okay? Everything else, I\'m not arguing."',
        responses: {
          kind: "Let the sleeve be enough",
          playful: "Kiss him back through it too",
          bold: "Kiss through the sleeve first",
          neutral: "Let it wreck you both quietly",
        },
      },
      {
        line: "He lies beside you all night with a hand's width of air between, and neither of you sleeps.",
        approach: "Lie down beside him",
        greeting:
          '"Lie down. Right there. I\'ll stay on this side of the air."',
        responses: {
          kind: "Stay close despite the gap",
          playful: "Close half the air",
          bold: "Close all the air you can",
          neutral: "Keep the hand's width",
        },
      },
      {
        line: "He loves you louder than anyone ever has, because it's the one thing the curse can't stop.",
        approach: "Say it back",
        greeting:
          "\"I love you. That one doesn't need hands. That one's free.\"",
        responses: {
          kind: "Say it back louder",
          playful: "Say it back even louder",
          bold: "Match how loud he loves you",
          neutral: "Lie still in the dark",
        },
      },
      {
        line: '"Sometimes I wish you\'d met me as a regular guy," he says, light as anything. "You\'d never have looked twice. ...Still glad it went the way it did."',
        approach: "Say you're glad too",
        greeting:
          '"I\'ve never wanted anything like I want to just hold you. Never. ...Sorry. Heavy. But true."',
        responses: {
          kind: "Say you're glad too",
          playful: "Ask what regular Rui was like",
          bold: "Say you want it too",
          neutral: "Let the night pass",
        },
      },
    ],
  },
  // No temperamentDialogue pool: every leftover line was placed onto a
  // dialogue beat's `greeting`.
  // When the old per-tier `responses` pool was folded onto the beats above,
  // one playful label had no genuine beat match ("Let him see your joy") and
  // was dropped rather than force-placed.
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
      "\"It's illegal to take your eyes off me, cutie.\" **{name}** throws {user} a wink, and they weren't going to.",
      "{user} says the name, and the crack under **{name}**'s cheer shows, briefly.",
    ],
    close: [
      '"You\'re not doing all this for me, are you?" **{name}** asks {user}, laughing like it\'s a joke. It isn\'t, quite.',
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
