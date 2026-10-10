export default {
  // The level-up DMs (docs/bond-scene-dms.md). Jin does not ask, so none of
  // these are requests; the warmth is in what he permits and what he admits to
  // having noticed. The arc is the crown coming off by degrees — bold is the
  // register that reaches him, so every choice rewards refusing to be dismissed.
  //
  // Texting voice, per reference.md's "## Bond Scenes" notes: Jin is not afraid
  // of curse words. They stay rare enough to land, and surface when he is riled
  // or raw rather than in the cold register.
  bondScenes: {
    acquaintance: {
      beats: [
        "**{firstName}**: Servant.\n\nTohma's decided I can't keep sending someone to fetch you. Says it's a waste of the staff. Fine. His way, then. Answer.",
        "You've been underfoot {timesMet} times now. I haven't had you thrown out. Make of that whatever you want. I'm not explaining it.\n\n...\n\nDon't get ideas. It's not a promotion.",
      ],
      choice: {
        prompt: "Well? You've got thumbs. Use them.",
        options: [
          {
            key: "kind",
            label: "Say you're glad he wrote",
            style: 3,
            close: "...Glad.\n\nHa. Whatever. Be glad, then. Costs me nothing.",
          },
          {
            key: "playful",
            label: "Ask if that was praise",
            style: 1,
            close:
              "Praise? Tsk. That was a fact.\n\n...You don't need praise anyway. You'd just get cocky.",
          },
          {
            key: "bold",
            label: "Tell him you'll decide that",
            style: 4,
            close:
              "Ha. *There* it is.\n\nGood answer. Keep that. Go do something useful, servant.",
          },
        ],
      },
      keepsake: {
        emoji: "❄️",
        line: "The first order he gave you that wasn't really an order.",
      },
    },

    friend: {
      beats: [
        "**{firstName}**: Why do you keep coming up here? Answer me.",
        "Half this school talks about me behind my back. Anyone who wants something from me goes through Tohma.\n\nYou? Whatever I throw at you, I get {favResponse} back. Then you stay and pick up whatever I left on the floor anyway.\n\nSo which is it: guts, or you're too dumb to know better?",
      ],
      choice: {
        prompt: "Pick one. I'm waiting.",
        options: [
          {
            key: "kind",
            label: "Say you like the company",
            style: 3,
            close:
              "Tsk. That's the dumbest thing you've ever said to me.\n\n...Whatever. The door's not locked.",
          },
          {
            key: "playful",
            label: "Say you came for the mess",
            style: 1,
            close:
              "I didn't ask for a joke.\n\nThen you won't mind that I'm never cleaning it again. Get used to it.",
          },
          {
            key: "bold",
            label: "Say you're staying either way",
            style: 4,
            close:
              "Ha. Stubborn.\n\nOnly Tohma talks to me like that, and he's stuck with me. You're not.\n\nFine. Stay. That's an order.",
          },
        ],
      },
      keepsake: {
        emoji: "❔",
        line: "The time he asked you straight why you keep coming, and waited on the answer.",
      },
    },

    closeFriend: {
      beats: [
        "**{firstName}**: Frostheim's throwing another party Friday. Tohma's handling it. You know I don't waste air on bootlickers.",
        "Everyone's already decided I won't show. They'd have been right, once. That was before we met in {sinceMet}.\n\nLet them keep thinking it.",
        "You'll be there. Eight o'clock. Your schedule's not my problem. Arrange it around me.",
      ],
      choice: {
        prompt: "I'm waiting on a yes. Anything else, keep it to yourself.",
        options: [
          {
            key: "kind",
            label: "Say you'll be there",
            style: 3,
            close:
              "Good.\n\nDon't wander off with the brats once you're inside. Stay somewhere I can find you.",
          },
          {
            key: "playful",
            label: "Ask if he's finally going",
            style: 1,
            close:
              "Did I say that? I said *you'll* be there.\n\nYou'll find out at eight, servant.",
          },
          {
            key: "bold",
            label: "Say you'll go if he does",
            style: 4,
            close:
              "You've got some nerve setting terms with me.\n\n...Be there by eight. I want one person in that room who isn't surprised.",
          },
        ],
      },
      keepsake: {
        emoji: "🥂",
        line: "The order to show up at a party he's never once shown up to.",
      },
    },

    confidant: {
      beats: [
        "**{firstName}**: It's quiet tonight. I've been at the piano for an hour.",
        "I kept losing my place. My head was on {lastMoment}.",
        "Somebody should be turning pages for me. Tohma's asleep.\n\nThat's all I'm going to say.",
      ],
      choice: {
        prompt: "The door's open. Quit dawdling.",
        options: [
          {
            key: "kind",
            label: "Ask him to play for you",
            style: 3,
            close:
              "Tsk. You think I play on request?\n\n...Get up here first. Sit where I tell you and don't talk.",
          },
          {
            key: "playful",
            label: "Ask if you broke his focus",
            style: 1,
            close:
              "Don't flatter yourself. My focus is fine.\n\nGet up here and I'll prove it.",
          },
          {
            key: "bold",
            label: "Say you're already outside",
            style: 4,
            close:
              "Bold, aren't you.\n\nThen why are you still typing? Get in here. Sit next to me.",
          },
        ],
      },
      keepsake: {
        emoji: "🎹",
        line: "A page-turning job he could have done himself.",
      },
    },

    devoted: {
      beats: [
        "**{firstName}**: Can't sleep, and it's your fault.\n\nI used to like this room best with nobody else in it. Door locked, nobody wanting anything from me. Now you leave and all I notice is that it's empty.",
        "Since the clash, I've kept most of {house} out of this room. Somewhere along the way, I started looking forward to your visits. I don't care who knows it. Let them talk. I'm done pretending you're just here to clean up after me.",
        "There's a part of me I gave up on.\n\nWith you, I'm whole again. That's as plain as I'm going to say it.",
      ],
      choice: {
        prompt: "Come over tonight. Don't make me ask twice.",
        options: [
          {
            key: "kind",
            label: "Say you'll stay the night",
            style: 3,
            close:
              "...Good.\n\nYou're not leaving in the morning either. I've decided.",
          },
          {
            key: "playful",
            label: "Ask which side is yours",
            style: 1,
            close:
              "Doesn't matter. You'll end up on mine anyway.\n\nGet up here.",
          },
          {
            key: "bold",
            label: "Say you won't let him sleep",
            style: 4,
            close:
              "Ha. Big talk from someone who isn't here yet.\n\nCome prove it.",
          },
        ],
      },
      keepsake: {
        emoji: "💍",
        line: "The ring he left on the nightstand, on the side of the bed that's yours now.",
      },
    },

    soulbound: {
      beats: [
        "**{firstName}**: I'm going to say something and I'd rather do it where I can't watch you read it. Yeah. That's cowardice. Doing it anyway.",
        "I counted. {timesMet} times you've come to me, and not once did I send for you.\n\nI want that on the record. My whole life people have been delivered to me. You just showed up.",
        "I was raised to make a good match. I can name you the families, the terms, the fucking seating charts. There's no version of that where someone like you turns up at all.\n\nAnd I don't care. Haven't for a while. I've just been managing it carefully enough not to notice.",
        "So.\n\n*The typing indicator holds for a long while.*\n\nI love you. I know exactly what it costs me to put that in writing. I wrote it anyway. No title in front of it, no order behind it.\n\nDo what you want with it. You always do. It's the single most infuriating thing about you and I wouldn't take it back.",
      ],
      choice: {
        prompt: "Answer or don't. I can take either one.",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close:
              "*Nothing. Nothing for so long that you check the message sent.*\n\nCome here. Now. I don't care what time it is.\n\n*He meets you at the top of the stairs still in yesterday's shirt, and for a man who has never in his life been at a loss for what to say, he says nothing at all for a very long moment before he kisses you, carefully, the way he does everything, and then not carefully in the least.*",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close:
              "Fine. *It comes back without a second's hesitation, and there's nothing wounded in it.*\n\nI've never wanted anything I could just order. Take as long as you need. I'm terrible at waiting. I'll learn.\n\n*And he does. Nothing changes. He's exactly where he always is, insufferable and immovable, holding open the door of a room he has never once made you knock at.*",
          },
        ],
      },
      keepsake: {
        emoji: "💌",
        line: "The night the king wrote it down without a title in front of it.",
      },
    },
  },
  dialogue: {
    new: [
      {
        line: "The frost never bothered him. That you walked into Frostheim uninvited is another matter.",
        approach: "Step into the cold",
        greeting: '"Who the hell let you in? ...Tsk. Spit it out, then."',
        responses: {
          kind: ["Say you came to check on him", "Explain why you're here"],
          playful: ["Ask if that's how he greets", "Claim you were invited"],
          bold: ["Say you let yourself in", "Stand your ground at the door"],
          neutral: ["Say nothing at all", "Wait to see what he wants"],
        },
      },
      {
        line: "He doesn't turn to look at you. The cold in the room sharpens.",
        approach: "Speak up",
        greeting: '"What? Talk fast or get out."',
        responses: {
          kind: ["Keep it short for him", "Ask if it's a bad time"],
          playful: ["Talk slow on purpose", "Ask how fast is fast"],
          bold: ["Say what you came to say", "Tell him you're staying put"],
          neutral: ["Wait for him to speak", "Match the cold with silence"],
        },
      },
      {
        line: "He's alone, like always, cigarette burning down in the ashtray, and doesn't look up when the door opens.",
        approach: "Close the door after you",
        greeting: "\"You're not supposed to be here. Don't waste my time.\"",
        responses: {
          kind: ["Ask if he's eaten today", "Offer to come back later"],
          playful: ["Ask whose rule that is", "Joke about the cigarette"],
          bold: ["Push past the dismissal", "Refuse to be waved off"],
          neutral: ["Respect his space", "Stay quiet by the door"],
        },
      },
      {
        line: "He weighs you the way one weighs a servant he did not hire, quickly, and without much interest.",
        approach: "Refuse to be sized up",
        greeting: '"Don\'t just stand there like an idiot. Hurry up."',
        responses: {
          kind: ["Ask what he needs done", "Say you'll be quick"],
          playful: [
            "Ask if he's always this cheery",
            "Ask if you passed inspection",
          ],
          bold: ["Tell him straight why you came", "Meet his stare head-on"],
          neutral: ["Wait for him to look up", "Shrug off the insult"],
        },
      },
      {
        line: "He looks at you for the first time since you came in, and waits for you to explain yourself.",
        approach: "State your case",
        greeting: '"Get to the point. The trash here is so long-winded."',
        responses: {
          kind: ["Say you'll respect his time", "Keep your explanation brief"],
          playful: ["Promise a very long story", "Take your time explaining"],
          bold: ["Stand with confidence", "Make your case in one line"],
          neutral: ["Get straight to the point", "Wait through the silence"],
        },
      },
    ],
    known: [
      {
        line: "He recognizes you now. He makes a point of not showing it.",
        approach: "Let him place you",
        greeting:
          "\"I've stopped bothering to remember most names. Yours stuck. Don't ask why.\"",
        responses: {
          kind: ["Say you're glad he remembers", "Say his name stuck with you"],
          playful: ["Ask why your name stuck", "Tease him about noticing"],
          bold: [
            "Say you're worth remembering",
            "Say you'll make sure it stays",
          ],
          neutral: ["Let him have the denial", "Say nothing, let it stand"],
        },
      },
      {
        line: '"You again," he says, and returns to his cigarette. He doesn\'t call you servant this time.',
        approach: "Ask what he needs",
        greeting: '"Tsk. Make yourself useful while you\'re at it."',
        responses: {
          kind: ["Ask where to start", "Say you're happy to help"],
          playful: ["Notice he dropped 'servant'", "Ask if that's an upgrade"],
          bold: ["Say you'll do the hard part", "Say you'll pick the job"],
          neutral: ["Wait for an actual order", "Stand by without asking"],
        },
      },
      {
        line: "Twice this week. He's noticed. He would deny having counted.",
        approach: "Drop by again",
        greeting: '"Twice in one week. Don\'t you have anywhere better to be?"',
        responses: {
          kind: ["Say there's nowhere better", "Ask if he minds"],
          playful: ["Point out he's counting", "Tease him for noticing"],
          bold: ["Say you'll make it three", "Say this is the better place"],
          neutral: ["Shrug and stay", "Let him keep count"],
        },
      },
      {
        line: "The dismissal comes a beat slower than it used to.",
        approach: "Stay while he allows it",
        greeting: '"...Fine. Stay. Just don\'t get chatty."',
        responses: {
          kind: ["Promise to keep it quiet", "Say you just wanted to stay"],
          playful: [
            "Ask how chatty is too chatty",
            "Start chatting right away",
          ],
          bold: ["Say he'll miss the chatter", "Say he'd never throw you out"],
          neutral: ["Stay without a word", "Settle in and listen"],
        },
      },
      {
        line: "He looks up, places you, and looks back down. From Jin, that is nearly a greeting.",
        approach: "Hold his glance",
        greeting: "\"You. Don't hover, it's annoying.\"",
        responses: {
          kind: ["Step back so you don't hover", "Ask how his day's been"],
          playful: ["Hover a little closer", "Call that a warm welcome"],
          bold: ["Come stand right beside him", "Give him a reason to look up"],
          neutral: ["Wait for him to look up again", "Keep your distance"],
        },
      },
      {
        line: "He doesn't order you off this time. He just watches to see if you'll leave on your own.",
        approach: "Stay without being told to",
        greeting: '"Door\'s behind you. ...Well? Use it or sit the hell down."',
        responses: {
          kind: ["Stay and keep him company", "Say you'd rather stay"],
          playful: ["Lean on the doorframe", "Ask which he'd prefer"],
          bold: [
            "Say you'll go when you're done",
            "Say you're staying either way",
          ],
          neutral: ["Stay a while longer", "Wait to see what he does"],
        },
      },
      {
        line: '"Servant," he says, out of habit now more than insult.',
        approach: "Answer to the name anyway",
        greeting:
          "\"You're a nuisance. A tolerable one. Don't make me regret saying that.\"",
        responses: {
          kind: ["Say tolerable suits you", "Say it means a lot from him"],
          playful: ["Upgrade your own title", "Ask for a better nickname"],
          bold: ["Say he likes the nuisance", "Say he won't regret it"],
          neutral: ["Let the label slide", "Answer to it anyway"],
        },
      },
      {
        line: "He checks the clock when you walk in, like you had an appointment nobody told you about.",
        approach: "Don't apologize for it",
        greeting:
          "\"You're late. You've got some nerve making me wait, servant.\"",
        responses: {
          kind: ["Say you came when you could", "Ask what you missed"],
          playful: ["Ask when you were due", "Tease him for waiting up"],
          bold: ["Say you're worth the wait", "Say he could've sent for you"],
          neutral: ["Take your usual spot", "Let the scolding pass"],
        },
      },
      {
        line: "He asks a question he already knows the answer to, just to hear how you'll answer it.",
        approach: "Answer him straight",
        greeting: '"You don\'t even know that? ...No, you do. Say it anyway."',
        responses: {
          kind: ["Say it, since he asked", "Humor him this once"],
          playful: [
            "Call the question pointless",
            "Guess why he's really asking",
          ],
          bold: ["Answer without blinking", "Say it like you mean it"],
          neutral: ["Answer and move on", "Give the expected answer"],
        },
      },
      {
        line: "He watches you come in again and doesn't bother hiding the sigh.",
        approach: "Take it as a compliment",
        greeting: "\"You're persistent. I'll give you that much.\"",
        responses: {
          kind: ["Say he's worth the effort", "Say you'll take that"],
          playful: ["Agree you're relentless", "Ask which one he meant"],
          bold: ["Say you're only getting going", "Tell him it's not stopping"],
          neutral: ["Shrug at the label", "Let the comment go unanswered"],
        },
      },
      {
        line: "He doesn't send Tohma to deal with you anymore. That's new, and he knows you've noticed.",
        approach: "Don't call him out",
        greeting:
          "\"What? Tohma's got better things to do. Don't read into it.\"",
        responses: {
          kind: ["Say you're glad it's him", "Promise not to read into it"],
          playful: [
            "Point out you outlasted Tohma",
            "Tease him for doing it himself",
          ],
          bold: ["Say you'll read into it", "Ask if Tohma's really busy"],
          neutral: ["Take the change in stride", "Let the shift go unremarked"],
        },
      },
      {
        line: "He doesn't ask how you got in this time. He already knows you'll find a way.",
        approach: "Come back uninvited again",
        greeting: '"Tsk. Again. ...Whatever. Sit."',
        responses: {
          kind: ["Say you're glad to be back", "Ask how he's been"],
          playful: ["Refuse to reveal your methods", "Brag about your way in"],
          bold: ["Say you'll always get in", "Say you'll keep coming back"],
          neutral: ["Shrug and say nothing", "Let him wonder how"],
        },
      },
      {
        line: "He lets a silence sit instead of filling it with a dismissal. He doesn't seem to mind that you're in it.",
        approach: "Let the silence hold",
        greeting: "\"...It's quiet in here. Don't ruin it.\"",
        responses: {
          kind: ["Keep the quiet for him", "Sit with him in the quiet"],
          playful: ["Ask what you'd be ruining", "Tease him about the silence"],
          bold: ["Say you came for the quiet", "Say the quiet's better shared"],
          neutral: ["Listen to the quiet", "Stay quiet along with him"],
        },
      },
    ],
    warm: [
      {
        line: "He almost looks pleased when he sees you coming. Almost.",
        approach: "Greet him properly",
        greeting: '"Your presence is... tolerable."',
        responses: {
          kind: ["Greet him just as warmly", "Take 'tolerable' as praise"],
          playful: ["Point out the almost-smile", "Ask what 'tolerable' means"],
          bold: ["Call him pleased outright", "Say he missed you"],
          neutral: ["Greet him plainly", "Nod and come in"],
        },
      },
      {
        line: "His door is open for once. He doesn't look up when you reach it, and doesn't tell you to leave.",
        approach: "Pause at the open door",
        greeting: '"Tsk. Are you coming in or not?"',
        responses: {
          kind: ["Walk in like you're welcome", "Say you'd hoped he'd ask"],
          playful: ["Ask if the door's for you", "Ask who else gets the door"],
          bold: ["Walk straight up to him", "Close the door behind you"],
          neutral: [
            "Step through without a word",
            "Stand just inside the door",
          ],
        },
      },
      {
        line: "Your phone buzzes while you're in his room. He looks over before you do.",
        approach: "Check your phone",
        greeting:
          '"Who the hell is texting you? ...What? Put it away. You\'ve got work to do."',
        responses: {
          kind: ["Tell him who it's from", "Ask what needs doing"],
          playful: ["Say it's from an admirer", "Ask what work, exactly"],
          bold: ["Ask if he's jealous", "Say it's nobody that matters"],
          neutral: ["Pocket it without a word", "Get back to work"],
        },
      },
      {
        line: "He's already turned toward the sound of your footsteps by the time you round the corner.",
        approach: "Step into his line of sight",
        greeting: '"Hmph. At least you had the sense to come to me directly."',
        responses: {
          kind: ["Say you wanted to see him", "Say you knew he'd hear you"],
          playful: ["Ask how he always knows", "Ask if that earns you points"],
          bold: ["Say you'll always come to him", "Tell him he was waiting"],
          neutral: ["Walk the rest of the way", "Wait for him to go on"],
        },
      },
      {
        line: "He hasn't sent for you. Your being here anyway seems to settle something for him.",
        approach: "Come without being called",
        greeting: '"I didn\'t summon you. But you can stay."',
        responses: {
          kind: ["Say you wanted to come", "Ask if there's anything to do"],
          playful: [
            "Ask if that's an invitation",
            "Ask if he'd have summoned you",
          ],
          bold: ["Say you'd come either way", "Say you were staying anyway"],
          neutral: ["Stay, since he allows it", "Take him at his word"],
        },
      },
      {
        line: "His room is a wreck again. Books on the floor, his jacket thrown over the lamp. He watches you notice.",
        approach: "Start picking up his books",
        greeting:
          '"Leave that. ...No. Since you\'re already down there, the pile by the desk too."',
        responses: {
          kind: ["Sort the pile by the desk", "Ask where he wants them"],
          playful: ["Ask how it got this bad", "Say he did this on purpose"],
          bold: ["Say you'll do the whole room", "Tell him the jacket's next"],
          neutral: [
            "Stack them without comment",
            "Clear the floor, say nothing",
          ],
        },
      },
      {
        line: '"I\'m hungry," he says, not looking up. "Go order lunch." A pause. "For two."',
        approach: "Ask who the second is for",
        greeting: '"Who do you think? Sit. You\'re eating with me."',
        responses: {
          kind: [
            "Say you're glad to join him",
            "Ask what he's in the mood for",
          ],
          playful: ["Ask if this is a date", "Ask if Tohma's invited"],
          bold: ["Pick the menu yourself", "Ask for the first bite"],
          neutral: ["Go place the order", "Order exactly what he likes"],
        },
      },
      {
        line: "It's nearly dinner, and he's already decided what he doesn't want.",
        approach: "Stop by before dinner",
        greeting: '"Tell the chef I\'m not in the mood for meat today."',
        responses: {
          kind: ["Ask if he's feeling all right", "Ask what he'd like instead"],
          playful: ["Ask what the meat did to him", "Offer to add a dessert"],
          bold: ["Say you'll make sure he eats", "Say you'll sort out dinner"],
          neutral: ["Go straight to the chef", "Nod and head out"],
        },
      },
      {
        line: '"You look like hell," he says, frowning at you across the room. "When did you last sleep?"',
        approach: "Tell him you're fine",
        greeting:
          "\"Fine. Ha. If you're going to hang around me, take better care of yourself. That's an order.\"",
        responses: {
          kind: ["Promise to rest tonight", "Say you'll try, for him"],
          playful: ["Ask if he's worried", "Ask if naps count"],
          bold: ["Say he doesn't sleep either", "Say you'll sleep if he does"],
          neutral: ["Accept the order", "Say you'll manage"],
        },
      },
      {
        line: "There's a second cup on the tray. He pushes it an inch toward you and looks away like he didn't.",
        approach: "Take the second cup",
        greeting: '"It was going cold. Quit gawking and drink it."',
        responses: {
          kind: ["Top up his cup first", "Drink it and say it's good"],
          playful: ["Ask who it was really for", "Gawk at him a little longer"],
          bold: ["Say the cup's yours now", "Toast him with it"],
          neutral: ["Drink without comment", "Hold the cup, say nothing"],
        },
      },
      {
        line: "He's reading mission documents with a cigarette going. He tilts one page toward you without a word.",
        approach: "Read over his shoulder",
        greeting:
          '"Class C. Beneath me, but something\'s off. Tell me what you see."',
        responses: {
          kind: ["Read the whole page first", "Ask what he's already caught"],
          playful: ["Guess wildly on purpose", "Ask if this is a test"],
          bold: ["Give your read, no hedging", "Point out what's off"],
          neutral: ["Study the page in silence", "Hand it back when done"],
        },
      },
      {
        line: '"You hold your fork like a shovel. It\'s been bothering me for weeks."',
        approach: "Ask him to show you",
        greeting:
          "\"You don't know about dining etiquette? ...Fine. Sit. If I'm teaching you, I'm only showing you once.\"",
        responses: {
          kind: ["Sit and pay attention", "Ask him where to start"],
          playful: ["Hold it wrong on purpose", "Ask why it bothers him"],
          bold: ["Ask for the hard version", "Say you'll get it in one go"],
          neutral: ["Pick up the fork", "Watch his hands"],
        },
      },
      {
        line: '"Where the hell were you yesterday?" He sounds annoyed. He also sounds like he checked.',
        approach: "Tell him where you were",
        greeting:
          "\"I didn't ask so I could hear excuses. Just don't vanish without telling me again.\"",
        responses: {
          kind: ["Promise to tell him next time", "Say you missed him too"],
          playful: ["Ask if he looked for you", "Ask if that's an order"],
          bold: ["Say he could have texted", "Ask why it matters to him"],
          neutral: ["Apologize once", "Nod and let it go"],
        },
      },
      {
        line: "He's out on his balcony with a cigarette, somewhere even colder than his room. He doesn't send you back inside.",
        // A quiet, low mood: keeping him company lands, pushing at him doesn't.
        mood: true,
        approach: "Step out onto the balcony",
        greeting:
          '"Stand upwind. I\'m not listening to you complain about the smoke."',
        responses: {
          kind: [
            "Lean on the rail beside him",
            "Ask if he's been out here long",
          ],
          playful: ["Complain about the smoke", "Ask what's so good out here"],
          bold: ["Stay as long as he does", "Ask what's on his mind"],
          neutral: ["Look out at the grounds", "Keep him company, no talk"],
        },
      },
      {
        line: 'Tohma passes you on his way out of Jin\'s room. "He was just talking about you," he says pleasantly. Behind him, Jin looks upset.',
        approach: "Ask what he said about you",
        greeting: '"Nothing. Tohma exaggerates. Drop it or get out."',
        responses: {
          kind: ["Drop it and stay", "Say you talk about him too"],
          playful: ["Say you'll ask Tohma", "Ask for one example"],
          bold: ["Say you hope it was good", "Say you're not leaving"],
          neutral: ["Stay and say nothing", "Change the subject"],
        },
      },
      {
        line: "He tosses you something small without warning. A wrapped chocolate, imported, the kind nobody at Darkwick can buy.",
        // His canon good mood: take the gift gladly, don't push for more.
        mood: true,
        approach: "Catch what he throws",
        greeting:
          '"I\'m in a good mood today. Eat it before I change my mind."',
        responses: {
          kind: ["Say it made your day", "Tell him it's really good"],
          playful: ["Ask what put him in a mood", "Offer him half"],
          bold: ["Ask for another one", "Eat it in front of him"],
          neutral: ["Pocket the chocolate", "Unwrap it, say nothing"],
        },
      },
      {
        line: '"You have plans tonight?" He waits. "Think about whether they\'re more important than me before you answer."',
        approach: "Weigh your plans out loud",
        greeting: '"I can wait. I want the right answer, not a fast one."',
        responses: {
          kind: ["Say he comes first tonight", "Offer to move your plans"],
          playful: ["Pretend to think it over", "Ask what he's offering"],
          bold: ["Say you cleared them already", "Say he already knows"],
          neutral: ["Say you're free", "Tell him your plans"],
        },
      },
      {
        line: 'You offered to wake him in the morning. He accepted like it had been his idea. "Not Tohma. You. Seven."',
        approach: "Stand by your offer",
        greeting: '"Seven means seven. Late and you\'re scrubbing the floors."',
        responses: {
          kind: ["Promise to bring his tea", "Say you'll be there at seven"],
          playful: [
            "Offer six-thirty to annoy him",
            "Ask what Tohma did wrong",
          ],
          bold: ["Say you've never been late", "Ask what you get for it"],
          neutral: ["Nod and note the time", "Set an alarm in front of him"],
        },
      },
    ],
    spark: [
      {
        line: "It's still early in the evening, and he's in no hurry to send you off.",
        approach: "Ask him to teach you the waltz",
        greeting: '"You want to practice the waltz? Bold, aren\'t you?"',
        responses: {
          kind: ["Say you'll follow his lead", "Ask where your hand goes"],
          playful: [
            "Warn him about your footwork",
            "Ask if he'll count you in",
          ],
          bold: ["Say you can keep up", "Say you're always bold"],
          neutral: ["Wait for him to start", "Step into position"],
        },
      },
      {
        line: "He adjusts your collar without asking. His hand stays a moment past necessary.",
        approach: "Let him fix your collar",
        greeting:
          '"Hold still. You\'re standing next to me looking like a mess."',
        responses: {
          kind: ["Let him take his time", "Hold still for him"],
          playful: ["Ask if he's done fussing", "Ask if you're presentable now"],
          bold: ["Say you dressed for him", "Stay right where you are"],
          neutral: ["Look away first", "Let him finish"],
        },
      },
      {
        line: "You've been practicing your table manners. He noticed, and said nothing until now.",
        approach: "Ask to dine with him",
        greeting:
          '"You want to dine with me? Ha. All right. Show me if you\'ve learned anything."',
        responses: {
          kind: ["Say he taught you well", "Ask him to correct you"],
          playful: ["Hold the fork like a shovel", "Ask if there's a grade"],
          bold: ["Call it a date", "Say he'll be impressed"],
          neutral: ["Pick up the right fork", "Mind your posture"],
        },
      },
      {
        line: "You've been away a few days. He's on his feet before you're through the door.",
        // He missed you and won't say it: reassurance lands, pushing back doesn't.
        mood: true,
        approach: "Show up after a few days",
        greeting:
          "\"...You've got guts abandoning your place at my back, servant.\"",
        responses: {
          kind: ["Say you're back for good", "Say you missed your place"],
          playful: ["Ask if he was lost without you", "Ask if he kept it warm"],
          bold: [
            "Say no one else can have it",
            "Say you'll stay put this time",
          ],
          neutral: [
            "Take your place at his back",
            "Let him have his complaint",
          ],
        },
      },
      {
        line: "He's moving stiffly today, and he doesn't offer an explanation.",
        // He's worn out: looking after him lands, pushing at him doesn't.
        mood: true,
        approach: "Check on him",
        greeting:
          "\"...I was too active yesterday. That's all. Don't make a thing of it.\"",
        responses: {
          kind: ["Ask where it aches", "Offer to look after him"],
          playful: ["Ask what he was up to", "Ask if he overdid it"],
          bold: ["Say he should've called you", "Say you're staying to help"],
          neutral: ["Bring him his tea", "Tidy up around him"],
        },
      },
    ],
    close: [
      {
        line: 'The ice in his voice is long gone around you. "I was hoping you\'d come by."',
        approach: "Go to him",
        greeting: "\"Don't leave yet. That's an order, if you need one.\"",
        responses: {
          bold: "Tell him you're staying",
          kind: "Say you don't need one",
          playful: "Tease him for hoping",
          neutral: "Let the quiet do the talking",
        },
      },
      {
        line: "He sends Tohma out the moment you walk in.",
        approach: "Close the distance",
        greeting: '"Finally. Tohma\'s been fussing over me all day."',
        responses: {
          kind: "Say you're glad you came",
          playful: "Say Tohma spoils him",
          bold: "Say you're not going anywhere",
          neutral: "Keep him quiet company",
        },
      },
      {
        line: "For once he isn't performing for anybody. He just looks glad.",
        // An unguarded moment: meeting it gently keeps it, pushing ends it.
        mood: true,
        approach: "Let him see you smile",
        greeting:
          "\"What? Don't look at me like that. I'm allowed to be in a good mood.\"",
        responses: {
          kind: "Tell him you're glad too",
          playful: "Point out the rare smile",
          bold: "Say you put him in it",
          neutral: "Let him have the moment",
        },
      },
      {
        line: '"You\'re late," he says, and the complaint has no teeth in it at all.',
        approach: "Say his name",
        greeting: '"Well? I\'ve got all night. Say what you came to say."',
        responses: {
          kind: "Tell him it can wait",
          playful: "Say you'll take all night",
          bold: "Take his hand first",
          neutral: "Stay and let him speak",
        },
      },
      {
        line: "He sets down whatever he was holding. Whatever it was, it can wait now.",
        approach: "Take his full attention",
        greeting: '"You have my attention. Don\'t waste it."',
        responses: {
          kind: "Tell him about your day",
          playful: "Ask how long you've got",
          bold: "Say you want all of it",
          neutral: "Stay within reach",
        },
      },
    ],
    bound: [
      {
        line: "The door closes and every ounce of composure goes with it.",
        approach: "Refuse to leave",
        greeting: '"Do that again. ...Slower."',
        responses: {
          kind: "Pull him close instead",
          playful: "Make him ask nicely",
          bold: ["Pull him back down", "Make him wait for it"],
          neutral: "Let him set the pace",
        },
      },
      {
        line: "He wakes before you and stays exactly where he is rather than disturb you.",
        // "Stay" is the whole ask; doing exactly that is the answer.
        mood: true,
        approach: "Let him watch you sleep",
        greeting: '"Don\'t get up. Tohma can wait. Everyone can."',
        responses: {
          kind: "Stay where you are",
          playful: "Tease him for staying still",
          bold: "Kiss him good morning",
          neutral: ["Lie still beside him", "Let him sleep"],
        },
      },
      {
        line: '"Mine," he says against your throat, like a fact he\'s tired of not saying aloud.',
        approach: "Let them talk",
        greeting: '"Let them talk. Everyone already knows you\'re mine."',
        responses: {
          kind: "Touch his face",
          playful: "Say his name back to him",
          bold: "Say it against his mouth",
          neutral: "Stay quiet in the dark",
        },
      },
      {
        line: "He kisses you like it's a thing he's owed and has waited far too long to collect.",
        approach: "Kiss him first",
        greeting: '"I don\'t apologize. Not for this, either."',
        responses: {
          kind: "Tell him he's allowed this",
          playful: "Ask what he's not sorry for",
          bold: "Say you're not sorry either",
          neutral: "Let him have this",
        },
      },
      {
        line: "Frostheim is freezing. His bed is not. He has opinions about you leaving it.",
        approach: "Come back to bed",
        greeting: '"Come back to bed. That wasn\'t a request."',
        responses: {
          kind: "Slide back in beside him",
          playful: ["Steal the warm side", "Wear his coat out"],
          bold: "Refuse to leave the bed",
          neutral: "Stay a little longer",
        },
      },
    ],
  },
  // The /call reveal lines for this character, keyed by the register in
  // WINNER_LINE_BUCKETS (constants/publicEncounters.js). Picked from at random
  // like the dialogue; {user} is the winner's mention and {name} their full
  // name, and the embed's winner line is the only place the reveal names
  // either of them. A register left out here falls back to the generic
  // WINNER_LINES pool.
  winnerLines: {
    new: [
      {
        line: '"Make it quick." **{name}** doesn\'t turn around, but {user} has his attention.',
        responses: {
          kind: "Say it in one sentence",
          playful: "Start with a long preamble",
          bold: "Wait until he turns around",
        },
      },
      {
        line: "{user} names him, and **{name}** looks over, unimpressed that it took this long.",
        responses: {
          kind: "Say you're glad you found him",
          playful: "Say you took the scenic route",
          bold: "Say it was worth the wait",
        },
      },
      {
        line: '"You know who I am. Good." **{name}** allows {user} one step closer.',
        responses: {
          kind: "Say you're glad to meet him",
          playful: "Ask who doesn't know him",
          bold: "Close the gap yourself",
        },
      },
      {
        line: "**{name}** looks {user} over like he's deciding whether they're worth his time. \"Well? Say something.\"",
        responses: {
          kind: "Say a polite hello",
          playful: "Bow like a servant",
          bold: "Say you're worth it",
        },
      },
    ],
    known: [
      {
        line: '"What? You got a problem?" **{name}** stops for {user} anyway.',
        responses: {
          kind: "Say you only came to see him",
          playful: "Say only a small one",
          bold: "Say he'll want to hear this",
        },
      },
      {
        line: '"I\'m not wasting my time on those brats today." **{name}** stays put for {user}, though.',
        responses: {
          kind: "Say you'll keep it brief",
          playful: "Ask if you're a brat",
          bold: "Say you're not one of them",
        },
      },
      {
        line: '"Kneel!" **{name}** catches sight of {user}. "...Tsk. Not you. Get over here."',
        responses: {
          kind: "Go over to him",
          playful: "Kneel anyway",
          bold: "Say you knew it wasn't you",
        },
      },
    ],
    warm: [
      {
        line: '"Walk with me, then. Keep up." **{name}** doesn\'t break stride, but he slows just enough for {user}.',
        responses: {
          kind: "Fall in beside him",
          playful: "Race a step ahead",
          bold: "Say you were coming anyway",
        },
      },
      {
        line: '"You again." **{name}** says it to {user} like a verdict he has stopped appealing.',
        responses: {
          kind: "Say he'd miss it otherwise",
          playful: "Appeal the verdict",
          bold: "Say get used to it",
        },
      },
      {
        line: '"Ha. Took you long enough." **{name}** lets {user} fall in at his back.',
        responses: {
          kind: "Take the place at his back",
          playful: "Say you were fashionably late",
          bold: "Say he'd have waited longer",
        },
      },
    ],
    spark: [
      {
        line: '"Ha. Guess I\'ll give you some attention." **{name}** turns fully to {user} this time.',
        responses: {
          kind: "Say you'll take all of it",
          playful: "Ask if it's rationed",
          bold: "Say you'd earned it already",
        },
      },
      {
        line: "{user} named him first, and **{name}** looks far too pleased.",
        responses: {
          kind: "Let him enjoy it",
          playful: "Ask what he's grinning at",
          bold: "Say you'll always be first",
        },
      },
      {
        line: "**{name}** does not summon {user} over. He simply stops, and waits.",
        responses: {
          kind: "Go to him",
          playful: "Ask if he's waiting for you",
          bold: "Say you knew he'd wait",
        },
      },
    ],
    close: [
      {
        line: "The **{house}** dispatch goes to Tohma. **{name}** goes to {user}.",
        responses: {
          kind: "Say Tohma can manage",
          playful: "Ask if Tohma knows",
          bold: "Say you outrank the dispatch",
        },
      },
      {
        line: '"Where the hell have you been?" **{name}** is already at {user}\'s side.',
        responses: {
          kind: "Say you're here now",
          playful: "Say you were hiding from him",
          bold: "Say you came straight here",
        },
      },
      {
        line: "**{name}** drops the court voice the second it's {user} saying his name.",
        responses: {
          kind: "Say you like this voice",
          playful: "Ask for the court voice",
          bold: "Ask him to keep it for you",
        },
      },
    ],
    bound: [
      {
        line: '"Never learn, do you?" **{name}** says it to {user} like the best news he\'s had all day.',
        responses: {
          kind: "Say you never will",
          playful: "Ask what you're failing at",
          bold: "Say he doesn't want you to",
        },
      },
      {
        line: "**{name}** lets the **{house}** business wait. {user} called; that ends it.",
        responses: {
          kind: "Say the business can wait",
          playful: "Ask if Tohma will mind",
          bold: "Say you'll call more often",
        },
      },
      {
        line: "\"Your house is too far. You're staying at **{house}** tonight.\" **{name}** doesn't lower his voice for {user}.",
        responses: {
          kind: "Say you'll stay, then",
          playful: "Ask how far is too far",
          bold: "Say you'd already decided",
        },
      },
    ],
  },
};
