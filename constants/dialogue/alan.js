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
        "I run missions the same way every time\n\nCount everyone in, check it twice\n\nDone that since I made captain\n\nStopped double-checking you a while back\n\nJust count on you and move on\n\nDont know when that started\n\nYou give me {favResponse} every time\n\nQuit bracing for it to change",
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
              "Fair\n\nWasn't planning on it happening again\n\nGonna keep you further back next time",
          },
        ],
      },
      keepsake: {
        emoji: "🛡️",
        line: "The two seconds he never had to think about, and hasn't stopped thinking about since.",
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
  dialogue: {
    new: [
      {
        line: 'Gloves already on, he looks you over once. "Get back. It\'s dangerous."',
        approach: "Stay out of his way",
        greeting: '"Get back. Don\'t want you getting hurt."',
        responses: {
          kind: ["Say you'll be careful", "Trust his judgment"],
          playful: ["Ask how far is far enough", "Call him overprotective"],
          bold: ["Hold his gaze, then step back", "Say you're not going far"],
          neutral: ["Step back without a word", "Give him the space"],
        },
      },
      {
        line: "He doesn't stop working. He just moves the toolbox so you won't trip over it.",
        approach: "Step over the toolbox",
        greeting: '"Watch your step. Keep meaning to clean this up."',
        responses: {
          kind: ["Offer to clear a path", "Say you don't mind the mess"],
          playful: ["Bet he never cleans it up", "Tease him about the mess"],
          bold: ["Say you're here to help", "Say you'll sort it with him"],
          neutral: ["Let him finish", "Step where it's clear"],
        },
      },
      {
        line: "Nobody else in the garage stands this close to him. You haven't learned why yet.",
        approach: "Stay close anyway",
        greeting: '"...Don\'t get involved with me."',
        responses: {
          kind: ["Say you like it right here", "Say you'd miss the company"],
          playful: ["Ask if this is too close", "Ask if standing here counts"],
          bold: ["Tell him you're not leaving", "Say you're already involved"],
          neutral: ["Don't move, don't answer", "Let him say his piece"],
        },
      },
      {
        line: '"Don\'t touch that," he says flatly. "It\'s hot." That\'s the whole greeting.',
        approach: "Ask what he's building",
        greeting: '"Bike part. Just came off the engine. Give it a minute."',
        responses: {
          kind: ["Ask if you can help instead", "Wait it out beside him"],
          playful: [
            "Blow on it to cool it",
            "Ask how long his minute is",
          ],
          bold: ["Ask to see it once it cools", "Say you'll stay right there"],
          neutral: [
            "Keep your hands to yourself",
            "Don't touch it, say nothing",
          ],
        },
      },
      {
        line: "He's holding a campus map the wrong way up and won't admit he's lost. \"...What do you want?\"",
        approach: "Flip his map around",
        greeting: '"...Huh. That makes more sense."',
        responses: {
          kind: ["Point him the right way", "Offer to walk with him"],
          playful: ["Tease him about the map", "Ask if he's ever not lost"],
          bold: ["Ask straight where he's headed", "Say you'll lead from here"],
          neutral: ["Let the moment pass", "Say nothing, just point"],
        },
      },
    ],
    known: [
      {
        line: "You walk in on him doing pushups on the garage floor. He doesn't stop until he hits the count.",
        approach: "Let him hit the count",
        greeting: '"...499... 500. Phew. ...You been waiting long?"',
        responses: {
          kind: ["Hand him something to drink", "Say you were happy to wait"],
          playful: ["Offer to count for him", "Say you lost count at 300"],
          bold: ["Say you'll join him tomorrow", "Tell him you watched them all"],
          neutral: ["Hold off till he's done", "Wait for him at the door"],
        },
      },
      {
        line: "He looks up when you come in and nods once. Two weeks ago he didn't do that.",
        approach: "Walk over to him",
        greeting: '"...You came back. Good."',
        responses: {
          kind: ["Say you missed hanging out", "Ask how his week went"],
          playful: ["Ask if the nod's new", "Nod back twice as hard"],
          bold: ["Hold his eyes, nod back", "Say you'll be here tomorrow"],
          neutral: ["Nod once, back at him", "Head in, say nothing"],
        },
      },
      {
        line: "You catch the end of a sparring round in the Pit. Sho's flat on his back, exhausted, and Alan is already offering him a hand up.",
        approach: "Head down to the Pit",
        greeting: '"You came down to watch? ...Next round\'s cleaner. Stick around."',
        responses: {
          kind: ["Say you'll stay for it", "Ask if his hands are okay"],
          playful: ["Cheer for Sho instead", "Ask if Sho's still alive"],
          bold: ["Say it doesn't scare you", "Ask him to teach you after"],
          neutral: ["Watch quietly from outside", "Let them finish the round"],
        },
      },
      {
        line: '"Looks like we\'ve got another mission order," he says. "Rest while you can. Next one\'s a long one."',
        approach: "Ask what the mission is",
        greeting: '"You\'ll get the details when I do. Sleep first."',
        responses: {
          kind: ["Promise to rest up", "Tell him to rest too"],
          playful: ["Ask if he'll take own advice", "Joke that he never rests"],
          bold: ["Say you'll be ready first", "Ask what makes it long"],
          neutral: ["Nod and say nothing", "Take the warning in stride"],
        },
      },
      {
        line: "He's lacing up his shoes by the garage door when you come in.",
        approach: "Ask where he's off to",
        greeting: '"Heading out for a run. ...Could you wait here for me?"',
        responses: {
          kind: ["Say you'll wait right here", "Tell him to take it easy"],
          playful: ["Ask if he knows the route", "Bet you'd beat him back"],
          bold: ["Ask to run with him", "Say you'll keep pace"],
          neutral: ["Wait by the door", "Let him go, stay put"],
        },
      },
      {
        line: "He catches your wrist before it brushes the hot engine.",
        approach: "Let him check you over",
        greeting: '"Engine\'s still hot. ...You okay?"',
        responses: {
          kind: ["Tell him you're okay", "Trust his quick hands"],
          playful: [
            "Ask if he's always this fast",
            "Pretend you meant to reach",
          ],
          bold: ["Say you'll mind the engine", "Hold steady, say you're fine"],
          neutral: [
            "Pull back, say thanks quietly",
            "Take the save without comment",
          ],
        },
      },
      {
        line: '"You\'re early," he says. Not a complaint.',
        approach: "Come by before he expects",
        greeting: '"Wasn\'t expecting anyone this early. ...Come in."',
        responses: {
          kind: ["Ask if he's eaten yet", "Say you couldn't wait"],
          playful: ["Ask if early counts as eager", "Ask who he was expecting"],
          bold: ["Say you'll always be early", "Say you came for him"],
          neutral: ["Let him get started", "Hang back, say nothing"],
        },
      },
      {
        line: "Leo's sprawled across a workbench, phone up, filming Alan work. Alan is ignoring him with real dedication.",
        approach: "Step around Leo's shot",
        greeting: '"He\'s been here an hour. Hasn\'t touched a thing. ...You staying too?"',
        responses: {
          kind: ["Say you'll actually help", "Say you'll stay if he wants"],
          playful: ["Ask if Leo's filming you too", "Wave at Leo's camera"],
          bold: ["Tell Leo to pitch in", "Say you're staying, phone-free"],
          neutral: ["Let Leo keep filming", "Let them have their bit"],
        },
      },
      {
        line: "He's started propping the garage door open when he knows you're coming.",
        approach: "Let yourself in",
        greeting: '"Left it open. Figured you\'d be by."',
        responses: {
          kind: ["Say it feels like a welcome", "Say you'll always come by"],
          playful: ["Ask if the door's just for you", "Knock after you're inside"],
          bold: ["Head straight over to him", "Say you'll be by tomorrow too"],
          neutral: ["Let yourself in quietly", "Come in, say nothing"],
        },
      },
      {
        line: "He starts leaving the spare gloves out in your size. Never brings it up.",
        approach: "Take the gloves he left out",
        greeting: '"Got gloves that\'ll fit. Wear them."',
        responses: {
          kind: ["Say they fit perfectly", "Say you'll look after them"],
          playful: ["Ask when he measured you", "Model the gloves for him"],
          bold: ["Say you'll keep them on hand", "Wear them every time"],
          neutral: ["Put them on, say nothing", "Take them without comment"],
        },
      },
      {
        line: "He answers your question about the engine in four words. A while later, he adds a fifth.",
        approach: "Ask what that part does",
        greeting: '"...Carburetor. That\'s what that is."',
        responses: {
          kind: ["Let him take his time", "Listen like it matters"],
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
          kind: ["Notice he had your back", "Let him handle Leo"],
          playful: [
            "Ask what Leo said this time",
            "Tease him for defending you",
          ],
          bold: ["Tell Leo to drop it", "Say Leo's all talk"],
          neutral: ["Let it go, say nothing", "Ignore Leo, move on"],
        },
      },
      {
        line: "He keeps glancing at the garage door like he's waiting for someone who isn't coming.",
        approach: "Ask who he's waiting on",
        greeting:
          '"Bandana disappears right around this time every day lately... What\'s he doing?"',
        responses: {
          kind: ["Say Sho's probably fine", "Say you'll keep an eye out"],
          playful: ["Guess Sho's got a secret hobby", "Ask if he's worried about Sho"],
          bold: ["Say you'll ask Sho for him", "Tell him to just ask Sho"],
          neutral: ["Say you haven't seen Sho", "Leave Sho's business be"],
        },
      },
    ],
    warm: [
      {
        line: "You find him at a fork in the campus path, turning slowly on the spot. When he sees you, he doesn't pretend this time.",
        approach: "Walk him where he's going",
        greeting: '"Passed that same bench three times. ...Walk with me?"',
        responses: {
          kind: ["Walk with him, no questions", "Say you're headed the same way"],
          playful: ["Ask how many laps he's done", "Take the scenic route"],
          bold: ["Answer yes before he's done", "Say you'll walk him every time"],
          neutral: ["Fall into step beside him", "Point the way, walk along"],
        },
      },
      {
        line: "He's loading gear outside the garage for a trip with a few of the Vagastrom guys. He stops when he sees you.",
        approach: "Ask what the gear is for",
        greeting:
          '"Signed off on an R&R permit for once. Taking the guys to the mountains. ...You want to come too?"',
        responses: {
          kind: ["Say you'd like to come along", "Ask what you should bring"],
          playful: ["Ask who's reading the map", "Ask if Leo's coming"],
          bold: ["Say you're already packed", "Ask when you're leaving"],
          neutral: ["Say you might come", "Go grab your things"],
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
            "Ask if you're in on it now",
          ],
          bold: ["Say you'll keep watch", "Nod to Tohma, then go"],
          neutral: ["Walk on like you saw nothing", "Wait until they're done"],
        },
      },
      {
        line: '"You eat today?" he asks. It\'s the third time this week.',
        approach: "Split his lunch with him",
        greeting:
          "\"Huh. I forgot to eat myself. ...I don't eat in the cafeteria. Portions aren't big enough. That's the only reason.\"",
        responses: {
          kind: ["Say you'll eat together", "Offer to make him a plate"],
          playful: ["Tease him for keeping count", "Ask if he's asking for him"],
          bold: ["Say you're feeding him today", "Tell him to eat first"],
          neutral: [
            "Say you're fine, let it go",
            "Answer, then change subject",
          ],
        },
      },
      {
        line: "The garage radio is on. He turned it on because you like it. He won't say so.",
        approach: ["Notice the radio", "Let the radio play"],
        greeting: '"...Figured you\'d want it on. Don\'t tell Leo."',
        responses: {
          kind: ["Stay and listen while he works", "Say he figured right"],
          playful: ["Ask if it's your radio now", "Ask what station he picked"],
          bold: ["Say you'll pick next time", "Hum along to the radio"],
          neutral: ["Leave the dial alone", "Listen without comment"],
        },
      },
      {
        line: "He hands you the mission file before anyone else in the house has seen it.",
        // He's in captain mode, asking for a second pair of eyes: getting
        // straight to work lands better than reassuring him.
        mood: true,
        approach: "Ask why you're first",
        greeting: '"Read it tonight. Tell me what I missed."',
        responses: {
          kind: ["Promise you'll read it", "Say you've got his back on it"],
          playful: ["Ask if you're promoted now", "Ask if there's a quiz after"],
          bold: ["Say you'll check it twice", "Say you'll go over it together"],
          neutral: ["Take the file, say nothing", "Take it, stay by the door"],
        },
      },
      {
        line: "He laughs, short and surprised at himself. He doesn't do that often.",
        approach: "Ask what's so funny",
        greeting: '"Was I laughing? ...Huh. Didn\'t notice."',
        responses: {
          kind: ["Laugh with him", "Say it suits him"],
          playful: ["Ask if it was your joke", "Try for another laugh"],
          bold: ["Say you're keeping that one", "Say you noticed it"],
          neutral: ["Let him have the moment", "Make nothing of it"],
        },
      },
      {
        line: "He's just finished tearing into Sho and Leo. When he turns to you, his voice drops back to normal.",
        approach: "Ask if they'll be okay",
        greeting: "\"They've got potential. Don't tell them I said that.\"",
        responses: {
          kind: ["Ask if he's okay too", "Say he's good for them"],
          playful: ["Ask if you're in trouble too", "Ask how loud it got"],
          bold: ["Say he was right to", "Tell him they'll come around"],
          neutral: ["Wait for him to cool off", "Leave the lecture be"],
        },
      },
      {
        line: "He waits for you outside the garage before the mission instead of setting off alone. Everyone knows why. Nobody says it.",
        // He's on mission footing: being ready at his side lands better than
        // softness about the wait.
        mood: true,
        approach: "Meet him outside the garage",
        greeting: '"...There you are. Get your things. We\'re going."',
        responses: {
          kind: ["Say you'd rather go together", "Say you were hoping he'd wait"],
          playful: ["Ask if he packed snacks", "Ask if he's lost again"],
          bold: ["Tell him you're ready", "Fall in at his side"],
          neutral: ["Set off, say nothing", "Head out with him"],
        },
      },
      {
        line: 'He holds his phone out to you, screen first. "How do you send a picture on this?"',
        approach: "Show him how",
        greeting: '"Leo laughed at me last time. You won\'t."',
        responses: {
          kind: ["Show him where the button is", "Say the app is confusing"],
          playful: ["Send yourself a photo of him", "Ask who it's going to"],
          bold: [
            "Set the whole thing up for him",
            "Have him send one to you",
          ],
          neutral: [
            "Show him once, hand it back",
            "Tap through it, say nothing",
          ],
        },
      },
      {
        line: "His wallet's held together with tape at this point. He catches you looking.",
        approach: "Ask about the wallet",
        greeting:
          '"Yeah, it\'s pretty beat up. Can\'t bring myself to chuck it, though. Got some good memories with it."',
        responses: {
          kind: ["Say it's worth keeping", "Say you'd keep it too"],
          playful: ["Ask if it still holds cash", "Ask if the tape's load-bearing"],
          bold: ["Tell him not to replace it", "Say good memories count"],
          neutral: ["Leave the wallet be", "Let it go back in his pocket"],
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
        line: "He stops by on his way out to a mission, already halfway to the door.",
        approach: "Catch him before he goes",
        greeting:
          '"I\'m heading out. Mission. Make sure you go to class. ...I\'ll let you know when I\'m back."',
        responses: {
          kind: ["Tell him to come back safe", "Say you'll be here after"],
          playful: ["Ask if he's got directions", "Ask for a souvenir"],
          bold: ["Say he'd better text you", "Ask to come with him"],
          neutral: ["Nod and let him go", "Let him head out"],
        },
      },
      {
        line: "He sets a can from the vending machine down next to you and keeps walking, like it just happened to be there.",
        approach: "Take the drink he left",
        greeting: '"Machine gave me two. Take one."',
        responses: {
          kind: ["Catch up and walk with him", "Say it's your favorite"],
          playful: ["Ask if it just appeared", "Ask what he got himself"],
          bold: ["Tell him to wait up", "Buy him one next time"],
          neutral: ["Take the can, say nothing", "Drink it, carry on"],
        },
      },
      {
        line: "People have stopped asking around when they need Alan. Now they just ask you.",
        approach: "Tell him who came looking",
        greeting: '"Who was it this time? ...Sorry they keep bothering you."',
        responses: {
          kind: ["Say you don't mind being asked", "Say you'd rather it be you"],
          playful: ["Tease him about being popular", "Start charging them a fee"],
          bold: ["Say you always know his spot", "Say they ask you for a reason"],
          neutral: ["Shrug, let them keep asking", "Pass the message along"],
        },
      },
      {
        line: "You skipped training yesterday. He noticed, and he hasn't said a word about it until now.",
        approach: "Ask if he's mad",
        greeting:
          '"Not mad. ...Slack off once, and you\'ll find out how hard it is to get back in the game."',
        responses: {
          kind: ["Say you'll be there tomorrow", "Say you missed being there"],
          playful: ["Ask if he took attendance", "Say you were resting your legs"],
          bold: ["Ask him to train you himself", "Say you'll make it up today"],
          neutral: ["Nod and take the lecture", "Let him have his say"],
        },
      },
      {
        line: "After the debrief he stops you at the door before you can slip out.",
        // He's handing out a captain's praise: owning it lands better than
        // modest thanks.
        mood: true,
        approach: "Wait to hear him out",
        greeting:
          '"I\'ve noticed your efforts. You\'re doing a good job. Hold your head high."',
        responses: {
          kind: ["Tell him he did good too", "Say you learned it from him"],
          playful: ["Ask if it's going in the log", "Stand up extra straight"],
          bold: ["Say you'll keep earning it", "Ask what's next, captain"],
          neutral: ["Nod and head out", "Take it and go"],
        },
      },
      {
        line: "The captain's log has a line in it now that isn't about missions. He never shows you which one.",
        approach: "Ask what he wrote in the log",
        greeting:
          '"Some things I write down so I don\'t forget them. ...That\'s all."',
        responses: {
          kind: ["Let him keep his secret", "Say the log is his own"],
          playful: ["Guess which line is yours", "Guess wildly on purpose"],
          bold: ["Say you'll write one back", "Say you'll find it someday"],
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
          playful: "Ask how long he can wait",
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
          bold: "Say it for him",
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
          playful: ["Tease the long pause", "Ask if that took practice"],
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
          bold: "Say you'll tell him first",
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
          kind: "Give him better things to keep",
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
          kind: "Say you know what he means",
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
          bold: "Say you know why",
          neutral: "Let him sleep",
        },
      },
      {
        line: "His hands are rough and careful and everywhere, and he still doesn't speak.",
        approach: "Come here",
        greeting: '"I don\'t say much. Never had to, with you."',
        responses: {
          kind: "Let him not speak",
          playful: "Talk enough for two",
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
          playful: "Pretend you missed it",
          bold: "Say it back louder",
          neutral: "Hold him, say nothing",
        },
      },
      {
        line: "He's stopped holding back before he touches you. He used to be so careful. You told him he didn't have to be.",
        approach: "Meet him without holding back",
        greeting: '"Come here. Don\'t need a reason anymore, do I."',
        responses: {
          kind: "Go to him, no reason needed",
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
      {
        line: '**{name}** looks {user} over once. "...Yeah. That\'s me."',
        responses: {
          kind: "Say it's nice to meet him",
          playful: "Ask if he's sure",
          bold: "Say you knew it was",
        },
      },
      {
        line: "**{name}** had been at that corner a while, working out which way it went. {user} named him before he managed it.",
        responses: {
          kind: "Ask where he's headed",
          playful: "Ask if the corner's winning",
          bold: "Tell him which way to go",
        },
      },
      {
        line: '"Careful." **{name}** moves something sharp out of {user}\'s way before he says anything else.',
        responses: {
          kind: "Say you'll watch your step",
          playful: "Ask if you look that clumsy",
          bold: "Say you saw it coming",
        },
      },
      {
        line: '**{name}** stops mid-stride and turns to {user}. After a pause: "...You lost?"',
        responses: {
          kind: "Admit you are, a little",
          playful: "Say he's the one who's lost",
          bold: "Say you came looking for him",
        },
      },
    ],
    known: [
      {
        line: "**{name}** knows {user}'s voice by now. He doesn't need to check who it is.",
        responses: {
          kind: "Say you'd know his too",
          playful: "Ask how he knew it was you",
          bold: "Stand where he'll see you",
        },
      },
      {
        line: '{user} calls out a hello, and **{name}** looks up. "...Still around. Good."',
        responses: {
          kind: "Say you're not going anywhere",
          playful: "Ask if that's a compliment",
          bold: "Say you'll stay around",
        },
      },
      {
        line: '**{name}** doesn\'t look up from the engine when {user} names him. "Yeah. Heard you coming."',
        responses: {
          kind: "Ask what's wrong with it",
          playful: "Ask if you're that loud",
          bold: "Wait until he looks up",
        },
      },
    ],
    warm: [
      {
        line: "{user} calls out, and **{name}** stops walking.",
        responses: {
          kind: "Catch up to him",
          playful: "Ask if you broke him",
          bold: "Ask where he's off to",
        },
      },
      {
        line: "{user} runs into **{name}** at lunch, and the food is forgotten.",
        responses: {
          kind: "Tell him to keep eating",
          playful: "Ask if he's sharing",
          bold: "Sit down across from him",
        },
      },
      {
        line: "**{name}** almost smiles at {user}. It's gone before anyone else catches it.",
        responses: {
          kind: "Pretend you didn't see",
          playful: "Say you caught that",
          bold: "Ask him to do it again",
        },
      },
    ],
    spark: [
      {
        line: "**{name}** turns at {user}'s voice and takes a second too long to look away.",
        responses: {
          kind: "Let him look",
          playful: "Ask if you have something on",
          bold: "Hold his gaze",
        },
      },
      {
        line: '"You came looking." **{name}** says it flat to {user}, and stays put.',
        responses: {
          kind: "Say you always do",
          playful: "Say you got lost again",
          bold: "Say you found him",
        },
      },
      {
        line: "**{name}** doesn't say anything when {user} reaches him. He tips his head toward the quiet end of the yard and waits.",
        responses: {
          kind: "Follow him there",
          playful: "Ask what's at the quiet end",
          bold: "Lead the way there",
        },
      },
    ],
    close: [
      {
        line: "**{name}** was already walking {user}'s way before the name finished.",
        responses: {
          kind: "Walk to meet him",
          playful: "Ask if he heard the first part",
          bold: "Say you knew he'd come",
        },
      },
      {
        line: "{user} calls, and **{name}** puts a hand at their back, steering them out of the crowd.",
        responses: {
          kind: "Let him steer you",
          playful: "Ask where he's taking you",
          bold: "Steer him right back",
        },
      },
      {
        line: "**{name}** says nothing. He stays where {user} can reach him.",
        responses: {
          kind: "Reach for him",
          playful: "Ask if he's waiting on you",
          bold: "Stay right there too",
        },
      },
    ],
    bound: [
      {
        line: '"Come here. Don\'t need a reason anymore, do I." **{name}** says it low, only to {user}.',
        responses: {
          kind: "Go to him",
          playful: "Ask for a reason anyway",
          bold: "Say he never did",
        },
      },
      {
        line: "**{name}** hears {user}, and his shoulders finally come down.",
        responses: {
          kind: "Say you're here now",
          playful: "Ask what he was bracing for",
          bold: "Say he can rest now",
        },
      },
      {
        line: "**{name}** crosses the yard to {user} without once checking which way he's going.",
        responses: {
          kind: "Meet him in the middle",
          playful: "Say he didn't get lost",
          bold: "Say he knows the way now",
        },
      },
    ],
  },
};
