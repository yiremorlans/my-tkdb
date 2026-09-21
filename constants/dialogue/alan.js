export default {
  // The level-up DMs (docs/bond-scene-dms.md). Alan is not good with words and
  // these do not pretend otherwise — his beats are the shortest in the game, and
  // the intimacy is in the fact of a man who says four words a day sitting there
  // typing at all. What he cannot write, he does instead.
  //
  // Per reference.md's "## Bond Scenes" notes, Alan's typed messages use no full
  // stops and never put two sentences in one line — each thought gets its own
  // line break. Narration and anything he says out loud (the `> ` lines) keep
  // normal punctuation.
  //
  // The typos are deliberate. He is canonically hopeless with a phone (he has to
  // ask how to add someone on WickChat), so roughly one line a scene carries a
  // dropped apostrophe, a missing full stop, or a mistype he corrects on the next
  // line. Do not spellcheck them out. They only ever appear in text he is typing
  // — never in narration, and never in a line he says out loud.
  bondScenes: {
    acquaintance: {
      beats: [
        "**{firstName}**: Its Alan\n\n*That's the whole message. It sits there for eleven minutes.*",
        "Not good at this\n\n*Another gap.*\n\nYouve been around {timesMet} times now\n\nBandana says I shoulda said something by now\n\nHe's right\n\nNot telling him that\n\nGlad you keep coming by\n\nShoulda said it sooner",
      ],
      choice: {
        prompt: "That's it",
        options: [
          {
            key: "kind",
            label: "Tell him it's a good start",
            style: 3,
            close:
              "Yeah\n\n*A minute later:* Thnaks\n\n*Then:* \\*Thanks\n\n*That's the last one.*",
          },
          {
            key: "playful",
            label: "Ask if that took long",
            style: 1,
            close:
              "40 minutes\n\n*No defensiveness in it at all. Just the number, handed over.*\n\nWasnt so bad",
          },
          {
            key: "bold",
            label: "Tell him to say more",
            style: 4,
            close:
              "*A long silence.*\n\nGarage\n\nTomorrow, after six\n\n*A pause.* Easier out loud\n\nLittle bit",
          },
        ],
      },
      keepsake: {
        emoji: "📱",
        line: "The eleven minutes between his name and what he'd meant to say.",
      },
    },

    friend: {
      beats: [
        "**{firstName}**: Noticed something",
        "I run missions the same way every time\n\nCount everyone in, check it twice\n\nDone that since I made captain\n\nStopped checking on you a while back\n\nJust count on you and move on\n\nDont know when that started\n\nYou give me {favResponse} every time\n\nQuit bracing for it to change",
      ],
      choice: {
        prompt: "Don't need anything back",
        options: [
          {
            key: "kind",
            label: "Say you plan around him too",
            style: 3,
            close:
              "Yeah\n\n*A long pause.*\n\nGood\n\nWasn't sure it went both ways",
          },
          {
            key: "playful",
            label: "Ask if you get a vote",
            style: 1,
            close:
              "Didn't think to ask\n\nYou want one\n\nYou'd vote yes anyway",
          },
          {
            key: "bold",
            label: "Ask if he'd notice you gone",
            style: 4,
            close: "Yeah\n\nDont make me find out",
          },
        ],
      },
      keepsake: {
        emoji: "📋",
        line: "The one name on his roster he stopped double-checking.",
      },
    },

    closeFriend: {
      beats: [
        "**{firstName}**: You good",
        "Not asking as your captain\n\nAsking as me\n\nThat thing went straight for you back there\n\nDidnt feel like a choice\n\nJust moved\n\nStill thinking about it now though",
        "Known you since {sinceMet}\n\nNever once done the math on how close that was till today\n\nDidn't like the answer\n\nGlad this is the version where you're fine",
      ],
      choice: {
        prompt: "Anyway\n\nJust checking in",
        options: [
          {
            key: "kind",
            label: "Thank him for saving you",
            style: 3,
            close:
              "Nothing to thank me for\n\nWasn't gonna stand there and watch\n\nStill glad you're okay",
          },
          {
            key: "playful",
            label: "Ask if he does that math often",
            style: 1,
            close:
              "Only when it's you\n\nUsually don't bother counting\n\nGonna start",
          },
          {
            key: "bold",
            label: "Tell him not to scare you",
            style: 4,
            close:
              "Fair\n\nWasn't planning on it happening again\n\nGonna keep you further back next time\n\nWorking on it",
          },
        ],
      },
      keepsake: {
        emoji: "🛡️",
        line: "The two seconds he never had to think about, and never once called brave.",
      },
    },

    confidant: {
      beats: [
        "*It comes through at four in the morning.*\n\n**{firstName}**: You awake",
        "Bad one tonight\n\nDont need anything\n\nJust didn't want to sit with it on my own and you were the only name I could stand to look at",
        "They say I killed someone\n\nYou've heard it\n\nEveryone has\n\nNobody's ever asked me\n\nTwo years, nobody's asked\n\nThey just decide, and then they're careful around me, and I let them, because careful's easier than the conversation\n\nYou've never asked either\n\nDifference is I don't think you're being careful\n\nI think you're waiting on me\n\nBeen sitting with that a while",
      ],
      choice: {
        prompt: "Ask me\n\nOr don't\n\nEither's fine\n\nI mean that",
        options: [
          {
            key: "kind",
            label: "Say you'll wait for it",
            style: 3,
            close:
              "*Nothing for six minutes.*\n\nYeah\n\nOkay\n\nNot tonight\n\nBut it'll be you\n\nWanted you to know that much",
          },
          {
            key: "playful",
            label: "Say you'd already decided",
            style: 1,
            close:
              "Decided what\n\n*You tell him.*\n\nHuh\n\n*A long gap.* Most people decide the other way\n\nYou went and did it without the facts, same as them\n\nBothers me a lot less than it should",
          },
          {
            key: "bold",
            label: "Ask him straight out",
            style: 4,
            close:
              "*The typing indicator runs for almost ten minutes and produces this.*\n\nEveryone who hears it decides. One way or the other. Then they're careful around me\n\nYou haven't decided. Two years\n\nNot handing you the answer just to watch which way you go. Not yet\n\n*Then:* You still there\n\n*You say yes. He doesn't answer. The read receipt just sits there, timestamped, until the sun comes up.*",
          },
        ],
      },
      keepsake: {
        emoji: "📲",
        line: "A read receipt, timestamped, that never got a reply before sunrise.",
      },
    },

    devoted: {
      beats: [
        "**{firstName}**: Dont go out tonight",
        "*You ask why. It takes him a while.*\n\nBecause I'd have to come find you, and I'd have to use it, and I've got a rule about using it\n\nRule's held three years\n\nFigure it'd last about four seconds where you're concerned\n\nThat scares me more than whatever's in the corridor does",
        "Only ever told one person what the rule is\n\nOnly if someone's about to die\n\nLast resort, nothing before it\n\nYou've gone and made yourself the last resort\n\nDon't know when\n\nNobody asked me about it first\n\nIncluding me",
      ],
      choice: {
        prompt: "So stay in\n\nPlease",
        options: [
          {
            key: "kind",
            label: "Tell him you'll stay in",
            style: 3,
            close:
              "Good\n\n*Then, twenty minutes later, a photo taken from outside your building: his car, parked, engine off.*\n\nNot coming up\n\nJust gonna be here a while\n\n*It's still there in the morning.*",
          },
          {
            key: "playful",
            label: "Ask if he's on the doorstep",
            style: 1,
            close:
              "No\n\n*A pause.*\n\nYes\n\nBeen out here an hour\n\nDon't come down, it's freezing and I'll just tell you to go back up",
          },
          {
            key: "bold",
            label: "Tell him to come up instead",
            style: 4,
            close:
              "*He comes up. He stands in the doorway without taking his jacket off, like leaving is still an option he's keeping open.*\n\n*Then he puts one hand flat against your cheek, careful, the way you'd hold something you were scared of breaking, and closes his eyes.*\n\n> Not good with words.\n\n*he says.*\n\n> This is the whole sentence.",
          },
        ],
      },
      keepsake: {
        emoji: "🚗",
        line: "A car parked outside all night with the engine off.",
      },
    },

    soulbound: {
      beats: [
        "**{firstName}**: Going to try and get this right\n\nMight take me a minute",
        "{timesMet} times you've turned up\n\nNever once because you needed something off me\n\nTook me about half of those to quit waiting for the ask",
        "I'm not a safe thing to be near\n\nThat's not me being modest\n\nI've had to be told to stop before\n\nBandana's seen it\n\nLeo's seen it\n\nNeither of them looks at me the same way after\n\nYou've seen it too\n\nYou came back the next day like nothing happened\n\nThen the day after that",
        "So here it is\n\nOnly doing this once\n\nI love you\n\nBeen true a long time\n\nWasnt going to say it, because saying it makes it yours to carry and I didn't want to put that on you\n\nPutting it on you anyway\n\nSorry",
      ],
      choice: {
        prompt:
          "Take your time\n\nI'm good at waiting\n\nHad a lot of practice",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close:
              "*Nothing comes back. Nothing for so long you think the phone's died.*\n\n*Then there's an engine outside, and then there's him: no jacket, hair wrecked, clearly not having stopped to think about a single part of it.*\n\n*He doesn't say anything. He just picks you up off the step and holds on, and it's the first time you've ever seen him smile without trying to hide it.*",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close:
              "That's fine\n\n*Two words, straight back, no wobble in them.*\n\nWasn't asking for an answer\n\nWas just done not saying it\n\nGarage is open\n\nSame as always\n\nCome by whenever\n\n*And it is, and he never brings it up again, but the passenger seat gets finished that month, and he never mentions that either.*",
          },
        ],
      },
      keepsake: {
        emoji: "💺",
        line: "The passenger seat he'd been building for a month without saying so.",
      },
    },
  },
  // `new`/`known`/`warm`/`close`/`bound` are paired beats — { line, approach,
  // greeting, responses } — so the /roam button, payoff caption, and response
  // labels all answer the scene the line just set, rather than being drawn
  // from separate pools at random (docs/dialogue-approach-pairing.md). `new`/`known` responses carry at
  // least 2 options per type, matching yuri.js; `warm`/`close`/`bound` carry
  // one, same as yuri.js. `spark` beats carry the same
  // pairing, though `dialogue.spark` is still 5 lines against the 27-line
  // target; expanding it is a dedicated authorial pass, not a gap in the
  // pairing.
  dialogue: {
    new: [
      {
        line: 'Gloves already on, he looks you over once. "Get back. It\'s dangerous."',
        approach: "Stay out of his way",
        greeting: '"Get back. Don\'t want you getting hurt."',
        responses: {
          kind: ["Say you'll be careful", "Trust his judgment"],
          playful: ["Point out he's showing off", "Call him overprotective"],
          bold: ["Stand your ground", "Say you can handle it"],
          neutral: ["Step back without a word", "Give him the space"],
        },
      },
      {
        line: "He doesn't stop working. He just moves the toolbox so you won't trip over it.",
        approach: "Step over the toolbox",
        greeting: '"Watch your step. Half this floor\'s sharp."',
        responses: {
          kind: ["Thank him for the warning", "Watch your step"],
          playful: ["Ask if he moved it for you", "Tease him about the mess"],
          bold: ["Step over it without looking", "Ignore the warning"],
          neutral: ["Let him finish", "Watch your step, unbothered"],
        },
      },
      {
        line: "Nobody else in the garage stands this close to him. You haven't learned why yet.",
        approach: "Stay close anyway",
        greeting: '"Ask anyone. They\'ll tell you to stay clear of me."',
        responses: {
          kind: ["Appreciate his honesty", "Say he doesn't seem so bad"],
          playful: ["Ask why everyone's scared", "Lean in even closer"],
          bold: ["Tell him you're not leaving", "Hold his gaze"],
          neutral: ["Match his quiet", "Outlast the silence"],
        },
      },
      {
        line: '"Don\'t touch that," he says flatly. "It\'s hot." That\'s the whole greeting.',
        approach: "Ask what he's building",
        greeting: '"...Hm. You\'re still standing there."',
        responses: {
          kind: ["Ask if you can help instead", "Back off like he asked"],
          playful: [
            "Touch the thing he said not to",
            "Ask if it's a warning or dare",
          ],
          bold: ["Touch it anyway, on purpose", "Ask him to stop you"],
          neutral: [
            "Keep your hands to yourself",
            "Don't touch it, say nothing",
          ],
        },
      },
      {
        line: "He's holding a campus map the wrong way up and won't admit he's lost. \"...What do you want?\"",
        approach: "Flip his map around",
        greeting: '"...That was on purpose. Fine. Thanks."',
        responses: {
          kind: ["Point him the right way", "Offer to walk with him"],
          playful: ["Tease him about the map", "Ask if he's ever not lost"],
          bold: ["Take the map from him", "Say he's holding it wrong"],
          neutral: ["Let the moment pass", "Say nothing, just point"],
        },
      },
    ],
    known: [
      {
        line: "He steers you clear of the loose floor panel before you even notice it's there.",
        approach: "Let him steady your step",
        greeting:
          '"Watch the floor. Not everyone remembers where the tools land."',
        responses: {
          kind: ["Say you'd have missed it", "Let him steer you clear"],
          playful: ["Ask if he's always watching", "Pretend you meant to trip"],
          bold: ["Insist you had it handled", "Walk it without looking"],
          neutral: ["Step over without a word", "Take the correction quietly"],
        },
      },
      {
        line: "He grunts once in your direction. Two weeks ago he didn't do that.",
        approach: "Ask what he's got to say",
        greeting: '"...Still here. Good."',
        responses: {
          kind: ["Say hello back warmly", "Take the grunt kindly"],
          playful: ["Grunt back at him", "Ask what the grunt meant"],
          bold: ["Make him say a real word", "Call out the grunt"],
          neutral: ["Grunt back, nothing more", "Let the grunt stand"],
        },
      },
      {
        line: "The toolbox is already out of your path before you arrive. He still checks.",
        approach: "Step past the toolbox yourself",
        greeting: '"Careful. Meant that."',
        responses: {
          kind: ["Say you noticed the care", "Say you'll be careful"],
          playful: [
            "Ask if he's always this tidy",
            "Tease him about checking twice",
          ],
          bold: ["Say you don't need the help", "Step around it yourself"],
          neutral: ["Step past, say nothing", "Let it go unremarked"],
        },
      },
      {
        line: '"Looks like we\'ve got another mission order," he says. "Rest while you can. Next one\'s a long one."',
        approach: "Ask what the mission is",
        greeting: '"You\'ll get the details when I do. Sleep first."',
        responses: {
          kind: ["Promise to rest up", "Tell him to rest too"],
          playful: ["Ask if he'll take own advice", "Joke that he never rests"],
          bold: ["Say you don't need the rest", "Ask what makes it long"],
          neutral: ["Nod and say nothing", "Take the warning in stride"],
        },
      },
      {
        line: "\"Hand me that.\" It's the first thing he's ever asked you for.",
        approach: "Hand him the wrench",
        greeting:
          '"Hand me the eight-mil. It\'s the one that looks like the others."',
        responses: {
          kind: ["Get it right on the first try", "Help without being asked"],
          playful: [
            "Hand him the wrong one first",
            "Ask what he'll trade for it",
          ],
          bold: ["Toss it to him instead", "Make him ask nicely"],
          neutral: ["Hand it over, no fuss", "Pass it without a word"],
        },
      },
      {
        line: "He catches your wrist before it brushes the hot engine.",
        approach: "Let him check you over",
        greeting: '"Engine\'s still hot. ...You okay?"',
        responses: {
          kind: ["Thank him for the catch", "Trust his quick hands"],
          playful: [
            "Ask if he's always this fast",
            "Pretend you meant to reach",
          ],
          bold: ["Insist you had it handled", "Lean into the save"],
          neutral: [
            "Pull back, say thanks quietly",
            "Take the save without comment",
          ],
        },
      },
      {
        line: '"You\'re early," he says. Not a complaint.',
        approach: "Sit with him",
        greeting: "\"Don't stand there. Sit, if you're staying.\"",
        responses: {
          kind: ["Apologize for being early", "Say you couldn't wait"],
          playful: ["Ask if early counts as eager", "Tease him about noticing"],
          bold: ["Say you'll always be early", "Ask if he minds"],
          neutral: ["Sit down, say nothing", "Take the seat quietly"],
        },
      },
      {
        line: "He still tells you to stay clear of the bikes while they're up on the lift. Just gentler about it now.",
        approach: "Ask if he needs a hand",
        greeting: '"Ask, if you\'re gonna hover. Faster than guessing."',
        responses: {
          kind: ["Offer to help regardless", "Say you'll stay clear"],
          playful: ["Point out he's gone soft", "Hover on purpose"],
          bold: ["Ask for real work to do", "Push for something harder"],
          neutral: ["Stay clear, say nothing", "Wait without hovering"],
        },
      },
      {
        line: "He's started leaving the garage door unlocked before you even get there.",
        approach: "Let yourself in",
        greeting: '"Left it open. Figured you\'d be by."',
        responses: {
          kind: ["Say it feels like a welcome", "Say you'll always come by"],
          playful: ["Ask if the door's just for you", "Let yourself in loudly"],
          bold: ["Walk in like you own it", "Say you'd have picked the lock"],
          neutral: ["Let yourself in quietly", "Come in, say nothing"],
        },
      },
      {
        line: "He starts leaving the spare gloves out in your size. Never brings it up.",
        approach: "Take the gloves he left out",
        greeting: '"Got gloves that\'ll fit. Wear them."',
        responses: {
          kind: ["Say they fit perfectly", "Wear them without a fuss"],
          playful: ["Ask when he measured you", "Model the gloves for him"],
          bold: ["Call it out as thoughtful", "Ask why he never mentions it"],
          neutral: ["Put them on, say nothing", "Take them without comment"],
        },
      },
      {
        line: "He answers your question about the engine in four words. A while later, he adds a fifth.",
        approach: "Ask what that part does",
        greeting: '"...Carburetor. That\'s what that is."',
        responses: {
          kind: ["Ask him to show you more", "Listen like it matters"],
          playful: ["Ask for the long version", "Name the next part wrong"],
          bold: ["Ask him to show you", "Ask what else he's fixed"],
          neutral: ["Nod and file it away", "Watch him work, quiet"],
        },
      },
      {
        line: "He waves off Leo's teasing about you without looking up from his work.",
        approach: "Wait him out",
        greeting: '"Leo talks too much. Ignore him."',
        responses: {
          kind: ["Thank him for stepping in", "Say Leo means no harm"],
          playful: [
            "Ask what Leo said this time",
            "Tease him for defending you",
          ],
          bold: ["Say you can handle Leo", "Ask why he bothers"],
          neutral: ["Let it go, say nothing", "Ignore Leo, move on"],
        },
      },
      {
        line: "He tells you when the weather's about to turn before you've checked. Force of habit, maybe.",
        approach: "Ask how he knows",
        greeting: "\"Storm's coming. Let's talk inside.\"",
        responses: {
          kind: ["Follow him inside", "Trust his read on the sky"],
          playful: ["Ask how he always knows", "Guess wrong on purpose"],
          bold: ["Doubt the forecast out loud", "Bet against the weather"],
          neutral: ["Head inside, say nothing", "Take shelter without asking"],
        },
      },
    ],
    // Pool sizes track the affinity width of the level(s) they cover (see
    // RELATIONSHIP_LEVELS / DIALOGUE_TIER_BY_LEVEL in constants/game.js) —
    // roughly 1 line per POOL_POINTS_PER_LINE affinity points, so a wider band
    // doesn't repeat more often than a narrow one. known=55 wide → 13, warm=75
    // wide → 18 at the current POOL_POINTS_PER_LINE of 4.
    warm: [
      {
        line: "You find him at a fork in the campus path, turning slowly on the spot. When he sees you, he doesn't pretend this time.",
        approach: "Walk him where he's going",
        greeting: '"Passed that same bench three times. ...Walk with me?"',
        responses: {
          kind: ["Walk with him, no questions", "Say you're headed there too"],
          playful: ["Ask how many laps he's done", "Take the scenic route"],
          bold: ["Set the pace, let him follow", "Say you'll always find him"],
          neutral: ["Fall into step beside him", "Point the way, walk along"],
        },
      },
      {
        line: "He hands you a rag without being asked. Somehow that means something.",
        approach: "Clean up with his rag",
        greeting: '"Grease on your face. Left side."',
        responses: {
          kind: ["Take the rag, say thanks", "Notice the small kindness"],
          playful: ["Point out the grease on him", "Flick the rag at him"],
          bold: ["Call it what it is", "Wipe your hands, stay put"],
          neutral: ["Take the rag, say nothing", "Get back to work"],
        },
      },
      {
        line: "Out back of the garage, you find him talking low with Tohma. Tohma sees you first and smiles. Alan doesn't send you away.",
        approach: "Keep their secret",
        greeting: "\"She's fine, Tohma. ...You didn't see this.\"",
        responses: {
          kind: ["Promise you saw nothing", "Say you'll keep quiet"],
          playful: [
            "Ask what the two are plotting",
            "Wave at Tohma, innocently",
          ],
          bold: ["Ask what's going on", "Stay and listen in"],
          neutral: ["Walk on like you saw nothing", "Wait until they're done"],
        },
      },
      {
        line: '"You eat today?" he asks, wiping his hands. It\'s the third time this week.',
        approach: "Split his lunch with him",
        greeting: [
          "\"Lunch? Huh. I forgot to eat. ...I don't eat in the cafeteria. Portions aren't big enough. That's the only reason.\"",
          '"Don\'t mention the lunch thing to Bandana."',
        ],
        responses: {
          kind: ["Say you're touched he asked", "Ask if he ate today"],
          playful: [
            "Tease him for keeping count",
            "Promise not to tell Bandana",
          ],
          bold: ["Ask why he keeps checking", "Tell him to eat first"],
          neutral: [
            "Say you're fine, let it go",
            "Answer, then change subject",
          ],
        },
      },
      {
        line: "The garage radio is on. He turned it on because you like it. He won't say so.",
        approach: ["Turn the radio up for him", "Let the radio play"],
        greeting:
          '"...Figured you\'d want it on. Garage is too quiet otherwise."',
        responses: {
          kind: ["Hum along to the radio", "Say the garage sounds right"],
          playful: [
            "Sing along badly on purpose",
            "Ask what station he picked",
          ],
          bold: ["Call out that it was for you", "Turn it up louder"],
          neutral: ["Let the radio play, unbothered", "Listen without comment"],
        },
      },
      {
        line: "He hands you the mission file before you've even reached for it, like waiting was never the plan.",
        approach: "Take the mission file from him",
        greeting: '"Read it tonight. Tell me what I missed."',
        responses: {
          kind: ["Promise you'll read it", "Say you've got his back on it"],
          playful: ["Ask how he knew to grab it", "Ask if he reads minds now"],
          bold: ["Take it like it's owed", "Open it and start reading"],
          neutral: ["Take the file, say nothing", "Take it, stay by the door"],
        },
      },
      {
        line: "He laughs, short and surprised at himself. He doesn't do that often.",
        approach: "Point out he's laughing",
        greeting: "\"...Don't make a thing of it. It was funny, that's all.\"",
        responses: {
          kind: ["Say his laugh is nice", "Say it suits him"],
          playful: ["Ask him to do it again", "Try for another laugh"],
          bold: ["Point out how rare that was", "Say he should laugh more"],
          neutral: ["Let him have the moment", "Make nothing of it"],
        },
      },
      {
        line: "He's just finished tearing into Sho and Leo. When he turns to you, his voice drops back to normal.",
        approach: "Ask if they'll be okay",
        greeting: "\"They've got potential. Don't tell them I said that.\"",
        responses: {
          kind: ["Say he's fair with them", "Promise to keep it quiet"],
          playful: ["Threaten to tell them", "Ask if you have potential"],
          bold: ["Say he should tell them", "Ask what they did this time"],
          neutral: [
            "Wait for him to cool off",
            "Let the lecture go unremarked",
          ],
        },
      },
      {
        line: "He waits for you at the gate before the mission instead of setting off alone. Everyone knows why. Nobody says it.",
        approach: "Lead the way",
        greeting: '"You know the way. I\'ll follow."',
        responses: {
          kind: ["Say you don't mind leading", "Wait until he's ready"],
          playful: ["Take the long way on purpose", "Ask if he's lost again"],
          bold: ["Say he'd be lost without you", "Set the pace yourself"],
          neutral: ["Set off, say nothing", "Point the way and go"],
        },
      },
      {
        line: 'He holds his phone out to you, screen first. "How do you send a picture on this?"',
        approach: "Show him how",
        greeting: '"Leo laughed at me last time. You won\'t."',
        responses: {
          kind: ["Walk him through it slowly", "Say the app is confusing"],
          playful: ["Send yourself a photo of him", "Ask who it's going to"],
          bold: [
            "Set the whole thing up for him",
            "Admit you'll laugh a little",
          ],
          neutral: [
            "Show him once, hand it back",
            "Tap through it, say nothing",
          ],
        },
      },
      {
        line: "Your bag strap snapped last week. It turns up on the garage bench restitched, and he acts like he's never seen it.",
        approach: "Thank him for the strap",
        greeting: '"Let me know if anything else breaks. Anything."',
        responses: {
          kind: ["Say the stitching is perfect", "Tell him it means a lot"],
          playful: [
            "Ask who fixed it, innocently",
            "Say you'll break more stuff",
          ],
          bold: ["Call him out for fixing it", "Ask why he didn't say"],
          neutral: ["Take the bag, say nothing", "Sling it on and stay"],
        },
      },
      {
        line: "It gets late in the garage. He doesn't tell you to head back to your dorm anymore.",
        approach: "Stay a while longer",
        greeting: ["\"It's late. I'll walk you back when you're ready.\""],
        responses: {
          kind: ["Say you'll stay till he's done", "Offer to help tidy up"],
          playful: ["Ask if he just likes company", "Ask if he's stalling too"],
          bold: ["Stay as long as you want", "Tell him he's stuck with you"],
          neutral: ["Stay a while, say nothing", "Wait by the door"],
        },
      },
      {
        line: "He comes to find you with the plan for the next mission sketched on the back of a work order. Your name's already on it.",
        approach: "Look over the plan",
        greeting: '"Put you with me. Unless you want a different spot."',
        responses: {
          kind: ["Say you'll be right there", "Say you'd pick that spot too"],
          playful: ["Ask who got stuck with Leo", "Critique his handwriting"],
          bold: ["Ask for the front line", "Suggest a better plan"],
          neutral: ["Study the plan quietly", "Nod, hand it back"],
        },
      },
      {
        line: "He sets a can from the vending machine down next to you and keeps walking, like it just happened to be there.",
        approach: "Take the drink he left",
        greeting: '"Machine gave me two. Take one."',
        responses: {
          kind: ["Thank him before he's gone", "Say it was thoughtful"],
          playful: ["Ask if the machine's broken", "Ask what he got himself"],
          bold: ["Say you know it didn't", "Buy him one next time"],
          neutral: ["Take the can, say nothing", "Drink it, carry on"],
        },
      },
      {
        line: "Other students have started asking you where he is, instead of asking around.",
        approach: "Tell him who came looking",
        greeting: '"Who was it this time? ...Figures. Tell them the garage."',
        responses: {
          kind: ["Say you like being asked", "Say you'll point them to him"],
          playful: [
            "Tease him about being popular",
            "Start charging them a fee",
          ],
          bold: ["Say you always know his spot", "Tell them to ask him"],
          neutral: ["Shrug, let them keep asking", "Let him answer that one"],
        },
      },
      {
        line: "He tries a joke. It lands badly. He tries again anyway.",
        approach: "Break the quiet",
        greeting: '"...That joke landed wrong. Give me another shot."',
        responses: {
          kind: ["Laugh at the second try", "Tell him it was close"],
          playful: ["Give him a real reaction", "Tell a worse joke back"],
          bold: ["Tell him to keep trying", "Demand a better one"],
          neutral: ["Let the joke land quietly", "Let the silence sit"],
        },
      },
      {
        line: 'After the debrief he stops you at the door. "You did good out there. Hold your head up."',
        approach: "Take the compliment",
        greeting: '"Not saying it twice. You heard me."',
        responses: {
          kind: ["Stand a little taller", "Say it helps, hearing it"],
          playful: ["Ask him to say it twice", "Stand up extra straight"],
          bold: ["Say you know you did", "Ask what he'd change"],
          neutral: ["Nod and head out", "Hold your head up, quietly"],
        },
      },
      {
        line: "The captain's log has a line in it now that isn't about missions. He never shows you which one.",
        approach: "Ask what he wrote in the log",
        greeting:
          '"Wrote something in the log today. Not mission stuff. Not telling you which."',
        responses: {
          kind: ["Let him keep his secret", "Say the log is his own"],
          playful: ["Guess which line is yours", "Guess wildly on purpose"],
          bold: ["Demand to see the log", "Ask him to read it aloud"],
          neutral: ["Let the log stay closed", "Drop it, no questions"],
        },
      },
    ],
    spark: [
      {
        line: "He wipes his hands twice before he touches you. He touches you anyway.",
        approach: [
          "Let him wipe his hands first",
          "Wait for him to touch you",
          "Let his hand linger",
          "Stay still for him",
          "Hold still",
          "Hold still for the eyelash",
        ],
        greeting: '"Hold still. Eyelash on your cheek. ...There. Got it."',
        responses: {
          kind: ["Let him be careful with you", "Let him hold still with you"],
          playful: "Press a finger to his cheek",
          bold: "Tell him not to be careful",
          neutral: "Stay without a word",
        },
      },
      {
        line: "He's careful with you in a way he isn't careful with anything else.",
        approach: [
          "Let him go slow",
          "Stay a bit longer",
          "Stay exactly where you are",
          "Let the quiet settle",
          "Hold his gaze",
        ],
        greeting: "\"Don't go home yet. That's all. That's the whole ask.\"",
        responses: {
          kind: ["Say you're not going anywhere", "Tell him to stay close"],
          playful: "Make him say it",
          bold: ["Say you want this", "Hold his gaze first"],
          neutral: "Let him set the pace",
        },
      },
      {
        line: "The silence between you has stopped being comfortable and started being loaded.",
        approach: [
          "Hold the loaded silence",
          "Step into the silence",
          "Ask what's under the quiet",
          "Stand closer than that",
          "Test how close is too close",
          "Stand your ground, closer",
        ],
        greeting:
          '"You keep standing that close, I\'m gonna do something about it."',
        responses: {
          kind: "Let the quiet be enough",
          playful: ["Stand closer on purpose", "Dare him to come closer"],
          bold: ["Do something about it", "Close the distance first"],
          neutral: [
            "Let the silence sit",
            "Match the loaded quiet",
            "Step back",
          ],
        },
      },
      {
        line: "He tucks your hair back with rough, calloused fingers and says nothing about it.",
        approach: [
          "Let him tuck your hair back",
          "Let him read you instead",
          "Read it off him",
          "Say nothing, stay anyway",
        ],
        greeting:
          "\"I'm no good at saying it. You'll have to read it off me.\"",
        responses: {
          kind: "Read it off him",
          playful: "Turn the tease back on him",
          bold: "Tell him to stop stalling",
          neutral: "Say nothing, stay anyway",
        },
      },
      {
        line: '"...Come here," he says. It takes him a long time to get those two words out.',
        approach: [
          "Come here",
          "Wait out his long pause",
          "Let him find the words",
          "Let him close the distance",
          "Ask him to finish the thought",
          "Don't go home yet",
        ],
        greeting: '"Come here. Closer than that."',
        responses: {
          kind: "Cover his hands with yours",
          playful: ["Tease the long pause", "Make him finish the sentence"],
          bold: "Take the first step",
          neutral: "Wait him out",
        },
      },
    ],
    close: [
      {
        line: '"I keep my head better with you around," he says, low, like a confession. "Thank you."',
        approach: "Take his hands",
        greeting:
          "\"I don't sleep much. It's easier when I know you're all right.\"",
        responses: {
          kind: "Say it means a lot to hear",
          playful: "Get him laughing",
          bold: "Tell him he isn't alone",
          neutral: "Take his hands, say nothing",
        },
      },
      {
        line: "He stops working entirely. For him, that's practically a declaration.",
        approach: "Tell him to rest",
        greeting: '"Whatever it is, you tell me first. I\'ll handle it."',
        responses: {
          kind: "Tell him he can put it down",
          playful: "Ask what stopped him",
          bold: "Ask him to say it plainly",
          neutral: "Understand his quiet",
        },
      },
      {
        line: "He puts his jacket over your shoulders before you've admitted you're cold.",
        approach: "Wear his jacket",
        greeting: '"Come here. Let me look at you."',
        responses: {
          kind: "Let him look after you",
          playful: "Steal his jacket",
          bold: "Trust his protection",
          neutral: "Wear it, say nothing",
        },
      },
      {
        line: '"Stay a while," he says. Three words from him weigh more than most speeches.',
        approach: "Stay a while",
        greeting:
          "\"Most of what sticks with me, I'd rather forget. You're not on that list. Stay.\"",
        responses: {
          kind: "Accept what he's done for you",
          playful: "Talk until he gives in",
          bold: "Ask him to lean on you",
          neutral: "Sit through the long pause",
        },
      },
      {
        line: "The tired in his shoulders eases the moment you sit down beside him.",
        approach: "Sit down beside him",
        greeting: '"I\'m not good with words. You already know what I mean."',
        responses: {
          kind: "Say you're glad to help",
          playful: "Ask if a nap beats him",
          bold: "Pull him against you",
          neutral: "Match his silence",
        },
      },
    ],
    bound: [
      {
        line: "He sleeps through the night now. He knows why. He'll never say it out loud.",
        approach: "Stay the whole night",
        greeting: '"Stay. Whole night. I sleep better."',
        responses: {
          kind: "Stay the whole night",
          playful: "Ask what he dreams about",
          bold: "Ask him to say why",
          neutral: "Let him sleep",
        },
      },
      {
        line: "His hands are rough and careful and everywhere, and he still doesn't speak.",
        approach: "Come here",
        greeting: '"I don\'t say much. Never had to, with you."',
        responses: {
          kind: "Let him not speak",
          playful: "Ask him to try anyway",
          bold: "Say it first",
          neutral: "Say nothing at all",
        },
      },
      {
        line: "He pulls you into his lap in the quiet of the garage like it's nothing. It isn't.",
        approach: "Sit with him",
        greeting: '"Sit here. On me. Yeah. Like that."',
        responses: {
          kind: "Settle into him gladly",
          playful: "Tease him for the pull",
          bold: "Climb into his lap",
          neutral: "Sit in the quiet",
        },
      },
      {
        line: '"...Love you," he says into your hair, so quietly it\'s almost deniable.',
        approach: "Say it for him",
        greeting:
          '"...Love you. Don\'t make me repeat it, I barely got it out."',
        responses: {
          kind: "Say it back for him",
          playful: "Make him repeat it",
          bold: "Demand he say it louder",
          neutral: "Hold him, say nothing",
        },
      },
      {
        line: "He's stopped holding back before he touches you. He used to be so careful. You told him he didn't have to be.",
        approach: "Meet him without holding back",
        greeting: '"Come here. Don\'t need a reason anymore, do I."',
        responses: {
          kind: "Meet him just as gently",
          playful: "Steal his jacket again",
          bold: "Tell him not to wash up",
          neutral: "Meet him, say nothing",
        },
      },
    ],
  },
  // When the old per-tier `responses` pool was folded onto the beats above,
  // the 28 `spark` labels that were left were each placed on the beat they
  // fit. One bound playful label, "Wear his gloves to bed", had no genuine
  // beat match and was dropped.
  // The /call reveal lines for this character, keyed by the register in
  // WINNER_LINE_BUCKETS (constants/publicEncounters.js). Picked from at random
  // like the dialogue; {user} is the winner's mention and {name} their full
  // name, and the embed's winner line is the only place the reveal names
  // either of them. A register left out here falls back to the generic
  // WINNER_LINES pool.
  winnerLines: {
    new: [
      '**{name}** looks {user} over once. "...Yeah. That\'s me."',
      "**{name}** had been at that corner a while, working out which way it went. {user} named him before he managed it.",
      '"Careful." **{name}** moves something sharp out of {user}\'s way before he says anything else.',
    ],
    warm: [
      "{user} calls out, and **{name}** stops walking.",
      "{user} says the name, and **{name}** looks up from his lunch, food forgotten.",
      '**{name}** grunts. {user} has learned to hear "good" in it.',
    ],
    spark: [
      "**{name}** turns at {user}'s voice and takes a second too long to look away.",
      '"You came looking." **{name}** says it flat to {user}, and stays put.',
      "**{name}** doesn't say anything when {user} reaches him. He tips his head toward the quiet end of the yard and waits.",
    ],
    close: [
      "**{name}** was already walking {user}'s way before the name finished.",
      "{user} calls, and **{name}** puts a hand at their back, steering them out of the crowd.",
      "**{name}** says nothing. He stays where {user} can reach him.",
    ],
    bound: [
      '"Come here. Don\'t need a reason anymore, do I." **{name}** says it low, only to {user}.',
      "**{name}** hears {user}, and his shoulders finally come down.",
      "**{name}** crosses the yard to {user} without once checking which way he's going.",
    ],
  },
};
