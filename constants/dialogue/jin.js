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
              "Did I say that? I said *you'll* be there.\n\nWhere I spend my Friday is none of your business, servant.",
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
        "**{firstName}**: Where the fuck are you.\n\nThat's not a question you get to ignore. Where. Exactly.",
        "*You send it. Nothing comes back for four minutes.*\n\nGood, *he says finally.* I heard what went down in the east corridor tonight and I couldn't account for you. Turns out I'm not someone who handles that well.",
        "It's been drilled into me my whole life that a captain doesn't run down a hallway.\n\nI ran.\n\nYour place is at my back. I've said that to you before and you took it for possessiveness. It was. It was also the only way I had of saying I want to know where you are.",
      ],
      choice: {
        prompt: "So. What are you going to do about a man who ran?",
        options: [
          {
            key: "kind",
            label: "Tell him you're all right",
            style: 3,
            close:
              "I know you're all right. I've known for six minutes.\n\nTurns out knowing and believing aren't the same thing. Say it once more and I'll work on the second one.",
          },
          {
            key: "playful",
            label: "Say you'd pay to see it",
            style: 1,
            close:
              "Nobody saw it. I made sure nobody saw it.\n\nTohma saw it. Tohma hasn't said a word, which from him is basically a parade. I'm never living it down.",
          },
          {
            key: "bold",
            label: "Tell him to come find you",
            style: 4,
            close:
              "*No reply at all.*\n\n*Seven minutes later there are footsteps outside, unhurried, because he won't be caught hurrying twice in one night. He doesn't knock. He puts both hands to your jaw, rings cold against it, looks at you far longer than he needs to, and says,*\n\n> There. Accounted for.\n\n*and doesn't let go for a good while after that.*",
          },
        ],
      },
      keepsake: {
        emoji: "🧥",
        line: "The coat he put around you without once admitting he'd run.",
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
          kind: ["Say you came to check on him", "Explain your reason calmly"],
          playful: ["Tease the frost right back", "Joke about being uninvited"],
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
          bold: ["Refuse to look away", "Tell him you're staying put"],
          neutral: ["Wait for him to speak", "Match the cold with silence"],
        },
      },
      {
        line: "He's alone, like always, cigarette burning down in the ashtray, and doesn't look up when the door opens.",
        approach: "Close the door after you",
        greeting: "\"You're not supposed to be here. Don't waste my time.\"",
        responses: {
          kind: ["Ask if he's eaten today", "Offer to come back later"],
          playful: ["Call his bluff lightly", "Joke about the cigarette"],
          bold: ["Push past the dismissal", "Refuse to be waved off"],
          neutral: ["Respect his space", "Stay quiet by the door"],
        },
      },
      {
        line: "He weighs you the way one weighs a servant he did not hire, quickly, and without much interest.",
        approach: "Refuse to be sized up",
        greeting: '"Don\'t just stand there like an idiot. Hurry up."',
        responses: {
          kind: ["Stay composed under his gaze", "Let the insult roll off"],
          playful: [
            "Call him rude to his face",
            "Ask if you passed inspection",
          ],
          bold: ["Meet him as an equal", "Meet his stare head-on"],
          neutral: ["Wait for him to look up", "Shrug off the insult"],
        },
      },
      {
        line: "He sets his pen down and waits for you to explain yourself.",
        approach: "State your case",
        greeting: '"Get to the point. The trash here is so long-winded."',
        responses: {
          kind: [
            "Thank him for hearing you out",
            "Keep your explanation brief",
          ],
          playful: ["Promise a very long story", "Take your time explaining"],
          bold: ["Stand with confidence", "Refuse to be rushed"],
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
          bold: ["Call out his pretending", "Say you noticed him notice"],
          neutral: ["Let him have the denial", "Say nothing, let it stand"],
        },
      },
      {
        line: '"You again," he says, and returns to his cigarette. He doesn\'t call you servant this time.',
        approach: "Ask what he needs",
        greeting: '"Tsk. Make yourself useful while you\'re at it."',
        responses: {
          kind: ["Ask if he needs anything", "Offer to make yourself useful"],
          playful: ["Notice he dropped 'servant'", "Ask if that's an upgrade"],
          bold: ["Ask what he actually needs", "Refuse to just linger"],
          neutral: ["Wait for an actual order", "Stand by without asking"],
        },
      },
      {
        line: "Twice this week. He's noticed. He would deny having counted.",
        approach: "Stand somewhere useful",
        greeting: '"Still here? Then stand somewhere useful."',
        responses: {
          kind: ["Offer to help where needed", "Ask where he'd like you"],
          playful: ["Point out he's counting", "Tease him for noticing"],
          bold: ["Choose your own spot", "Stand wherever you want"],
          neutral: ["Find a quiet spot to stand", "Wait for him to notice"],
        },
      },
      {
        line: "The dismissal comes a beat slower than it used to.",
        approach: "Stay while he allows it",
        greeting: '"Sit if you want. Touch anything and you\'re out."',
        responses: {
          kind: ["Promise not to touch a thing", "Thank him for the seat"],
          playful: [
            "Hover a finger over his desk",
            "Ask what counts as anything",
          ],
          bold: ["Pick something up anyway", "Refuse to shrink back"],
          neutral: ["Sit without a word", "Keep your hands in your lap"],
        },
      },
      {
        line: "He looks up, places you, and looks back down. From Jin, that is nearly a greeting.",
        approach: "Hold his glance",
        greeting: "\"You. Don't hover, it's annoying.\"",
        responses: {
          kind: ["Take a seat so you don't hover", "Ask how his day's been"],
          playful: ["Hover a little closer", "Call that a warm welcome"],
          bold: ["Hold his glance right back", "Say you'll stand if you like"],
          neutral: [
            "Hold his glance in silence",
            "Let the moment pass quietly",
          ],
        },
      },
      {
        line: "He doesn't order you off this time. He just watches to see if you'll leave on your own.",
        approach: "Stay without being told to",
        greeting: '"Door\'s behind you. ...Well? Use it or sit the hell down."',
        responses: {
          kind: ["Sit and keep him company", "Say you'd rather stay"],
          playful: ["Lean on the doorframe", "Ask which he'd prefer"],
          bold: ["Refuse to leave on cue", "Call his bluff and stay put"],
          neutral: ["Stay a while longer", "Wait to see what he does"],
        },
      },
      {
        line: '"Servant," he says, out of habit now more than insult.',
        approach: "Answer to the name anyway",
        greeting:
          "\"You're a nuisance. A tolerable one. Don't make me regret saying that.\"",
        responses: {
          kind: ["Say tolerable suits you", "Thank him for the backhand"],
          playful: ["Upgrade your own title", "Ask for a better nickname"],
          bold: ["Reject the nuisance label", "Demand a real compliment"],
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
          bold: ["Say you're right on time", "Say he can wait next time"],
          neutral: ["Take your usual spot", "Let the scolding pass"],
        },
      },
      {
        line: "He asks a question he already knows the answer to, just to hear how you'll answer it.",
        approach: "Answer him straight",
        greeting: '"You don\'t even know that? ...No, you do. Say it anyway."',
        responses: {
          kind: [
            "Answer patiently, no complaint",
            "Play along without irritation",
          ],
          playful: [
            "Call the question pointless",
            "Guess why he's really asking",
          ],
          bold: ["Ask why he's testing you", "Refuse to play his game"],
          neutral: ["Answer plainly and move on", "Give the expected answer"],
        },
      },
      {
        line: "He watches you come in again and doesn't bother hiding the sigh.",
        approach: "Take it as a compliment",
        greeting: "\"You're persistent. I'll give you that much.\"",
        responses: {
          kind: ["Say he's worth the effort", "Take it as sincere, not snide"],
          playful: ["Agree you're relentless", "Ask which one he meant"],
          bold: ["Own the persistence proudly", "Tell him it's not stopping"],
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
          kind: ["Reassure him you mean no harm", "Say you wanted to see him"],
          playful: ["Refuse to reveal your methods", "Brag about your way in"],
          bold: ["Say you'll always get in", "Dare him to try stopping you"],
          neutral: ["Shrug and say nothing", "Let him wonder how"],
        },
      },
      {
        line: "He lets a silence sit instead of filling it with a dismissal. From him, that's a kind of patience.",
        approach: "Let the silence hold",
        greeting: "\"...It's quiet in here. Don't ruin it.\"",
        responses: {
          kind: ["Let the patience be mutual", "Sit with him in the quiet"],
          playful: [
            "Point out his newfound calm",
            "Tease him about the silence",
          ],
          bold: ["Break the silence first", "Name the patience out loud"],
          neutral: ["Let the silence hold", "Stay quiet along with him"],
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
        line: "He keeps speaking to whoever's in front of him, but the door stays open behind them.",
        approach: "Walk over to him",
        greeting:
          "\"Don't stand in the doorway. You're letting the cold out.\"",
        responses: {
          kind: ["Walk in like you're welcome", "Shut the cold out for him"],
          playful: ["Ask if the door's for you", "Ask who else gets the door"],
          bold: ["Walk straight up to him", "Interrupt whoever's talking"],
          neutral: [
            "Step through without a word",
            "Wait for the room to clear",
          ],
        },
      },
      {
        line: "The room is still freezing. Somehow the chair nearest to him is not.",
        approach: "Take the seat he left open",
        greeting: '"You again. Sit, if you must. Don\'t touch anything."',
        responses: {
          kind: ["Sit, and touch nothing", "Thank him for the warm spot"],
          playful: ["Ask if he saved it for you", "Ask who warmed the chair"],
          bold: ["Take the seat like it's yours", "Touch something on purpose"],
          neutral: ["Sit without remarking on it", "Sit, hands to yourself"],
        },
      },
      {
        line: "He's already turned toward the sound of your footsteps by the time you round the corner.",
        approach: "Step into his line of sight",
        greeting: '"Hmph. At least you had the sense to come to me directly."',
        responses: {
          kind: ["Say you knew he'd hear you", "Say you came straight here"],
          playful: ["Ask how he always knows", "Tease him for listening out"],
          bold: ["Speak before he does", "Tell him he was waiting"],
          neutral: ["Say nothing, just approach", "Close the gap, quietly"],
        },
      },
      {
        line: '"You took the long way," he notes, without looking up. He\'d been counting.',
        approach: "Own the long way",
        greeting: '"I didn\'t summon you. But you can stay."',
        responses: {
          kind: ["Say you didn't mean to worry", "Promise to be quicker"],
          playful: ["Ask if he was counting", "Ask if he missed you yet"],
          bold: ["Own the long way outright", "Say you came uninvited"],
          neutral: ["Offer no explanation", "Stay, since he allows it"],
        },
      },
      {
        line: "His room is a wreck again. Papers on the floor, his jacket thrown over the lamp. He watches you notice.",
        approach: "Start picking up his papers",
        greeting:
          '"Leave that. ...No. Since you\'re already down there, the pile by the desk too."',
        responses: {
          kind: ["Sort the pile by the desk", "Ask how he wants them filed"],
          playful: ["Ask how it got this bad", "Say he did this on purpose"],
          bold: ["Make him take half the pile", "Hand him the jacket to hang"],
          neutral: [
            "Stack them without comment",
            "Clear the floor, say nothing",
          ],
        },
      },
      {
        line: '"I\'m hungry," he says, not looking up. "Go order lunch." A pause. "For two."',
        approach: "Ask who the second is for",
        greeting:
          "\"Who do you think? Sit. You're eating whatever I don't finish.\"",
        responses: {
          kind: ["Sit and eat with him", "Ask what he's in the mood for"],
          playful: ["Say you'll finish all of it", "Ask if Tohma's invited"],
          bold: ["Pick the menu yourself", "Say you'll eat first"],
          neutral: ["Sit and wait for the food", "Take the seat across"],
        },
      },
      {
        line: "He hands you a folded note for the chef without explanation. Inside, in his sharp handwriting: no meat today.",
        approach: "Take the note to the chef",
        greeting:
          '"Don\'t read it. ...You read it. Fine. Tell him fish, if he argues."',
        responses: {
          kind: ["Promise to deliver it now", "Ask if he's feeling all right"],
          playful: ["Ask what the meat did to him", "Offer to add a dessert"],
          bold: ["Say he can tell him himself", "Make him say please first"],
          neutral: ["Pocket the note and go", "Take it, no questions"],
        },
      },
      {
        line: '"You look like hell," he says, frowning at you across the room. "When did you last sleep?"',
        approach: "Tell him you're fine",
        greeting:
          "\"Fine. Ha. If you're going to hang around me, take better care of yourself. That's an order.\"",
        responses: {
          kind: ["Promise to rest tonight", "Thank him for noticing"],
          playful: ["Ask if he's worried", "Say he looks worse"],
          bold: ["Say he doesn't sleep either", "Order him to rest too"],
          neutral: ["Accept the order", "Sit down a moment"],
        },
      },
      {
        line: "There's a second cup on the tray. He pushes it an inch toward you and goes back to his papers.",
        approach: "Take the second cup",
        greeting: '"It was going cold. Quit gawking and drink it."',
        responses: {
          kind: ["Top up his cup first", "Drink it and let him work"],
          playful: ["Ask who it was really for", "Gawk at him a little longer"],
          bold: ["Say he poured it for you", "Toast him with it"],
          neutral: ["Drink without comment", "Hold the cup, say nothing"],
        },
      },
      {
        line: "He's reading mission documents with a cigarette going. He tilts one page toward you without a word.",
        approach: "Read over his shoulder",
        greeting:
          '"Class C. Beneath me. But the vice-captain missed something. Tell me what you see."',
        responses: {
          kind: ["Read it through with care", "Ask what he's already caught"],
          playful: ["Guess wildly on purpose", "Ask if this is a test"],
          bold: ["Give your read, no hedging", "Take the whole file from him"],
          neutral: ["Study the page in silence", "Hand it back when done"],
        },
      },
      {
        line: '"You hold your fork like a shovel. It\'s been bothering me for weeks."',
        approach: "Ask him to show you",
        greeting:
          "\"Fine. Sit. If I'm teaching you, I'd better see that nose on the grindstone.\"",
        responses: {
          kind: ["Sit and pay attention", "Thank him for the lesson"],
          playful: ["Hold it wrong on purpose", "Ask why it bothers him"],
          bold: ["Say your grip is fine", "Tell him to prove his way"],
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
          playful: ["Ask if he looked for you", "Say it's a secret"],
          bold: ["Say he could have texted", "Ask why it matters to him"],
          neutral: ["Apologize once and sit", "Let it go, stay now"],
        },
      },
      {
        line: "He's out on his balcony with a cigarette, somewhere even colder than his room. He doesn't send you back inside.",
        approach: "Step out onto the balcony",
        greeting:
          '"Stand upwind. I\'m not listening to you complain about the smoke."',
        responses: {
          kind: ["Stand upwind like he said", "Ask if he's been out here long"],
          playful: ["Complain about the smoke", "Ask what's so good out here"],
          bold: ["Stand downwind anyway", "Take the cigarette from him"],
          neutral: ["Look out at the grounds", "Keep him company, no talk"],
        },
      },
      {
        line: '"Tohma says I talk about you." He looks furious about it. "I don\'t. He\'s lying. ...Sit down."',
        approach: "Ask what he says about you",
        greeting: '"Nothing. Tohma exaggerates. Drop it or get out."',
        responses: {
          kind: ["Drop it and sit", "Say you talk about him too"],
          playful: ["Say you'll ask Tohma", "Ask for one example"],
          bold: ["Refuse to drop it", "Say Tohma isn't lying"],
          neutral: ["Sit down as told", "Change the subject"],
        },
      },
      {
        line: "He tosses you something small without warning. A wrapped chocolate, imported, the kind nobody at Darkwick can buy.",
        approach: "Catch what he throws",
        greeting:
          '"I\'m in a good mood today. Eat it before I change my mind."',
        responses: {
          kind: ["Thank him for the gift", "Save it for later"],
          playful: ["Ask what put him in a mood", "Offer him half"],
          bold: ["Ask for another one", "Eat it in front of him"],
          neutral: ["Pocket the chocolate", "Unwrap it, say nothing"],
        },
      },
      {
        line: '"You have plans tonight?" He waits. "Think about whether they\'re more important than me before you answer."',
        approach: "Weigh your plans out loud",
        greeting:
          "\"Take your time. I'm not in a hurry. ...That's a lie. Answer.\"",
        responses: {
          kind: ["Say he comes first tonight", "Offer to move your plans"],
          playful: ["Pretend to think it over", "Ask what he's offering"],
          bold: ["Say your plans win", "Tell him to ask, not order"],
          neutral: ["Say you're free", "Tell him your plans"],
        },
      },
      {
        line: '"Wake me tomorrow." He says it like it\'s already been decided. "Not Tohma. You. Seven."',
        approach: "Agree to wake him",
        greeting: '"Seven means seven. Late and you\'re scrubbing the floors."',
        responses: {
          kind: ["Promise to bring his tea", "Say you'll be there at seven"],
          playful: [
            "Offer six-thirty to annoy him",
            "Ask what Tohma did wrong",
          ],
          bold: ["Say eight or nothing", "Ask what you get for it"],
          neutral: ["Nod and note the time", "Set an alarm in front of him"],
        },
      },
    ],
    spark: [
      {
        line: "He allows you nearer than he allows anyone, and dares you to remark on it.",
        approach: "Let them watch",
        greeting: '"Everyone in this room is watching. Let them."',
        responses: {
          neutral: "Say nothing, let him wonder",
          kind: "Be gentle with his pride",
          playful: "Tease him for allowing it",
          bold: "Tell him you want this",
        },
      },
      {
        line: "He adjusts your collar without asking. His hand stays a moment past necessary.",
        approach: "Let him fix your collar",
        greeting: '"Closer. I dislike raising my voice."',
        responses: {
          kind: "Let him take his time",
          bold: "Take his hand without asking",
          playful: "Tease the ice",
          neutral: "Look away first",
        },
      },
      {
        line: "\"Don't move,\" he says quietly, and takes his time about whatever he's looking at.",
        approach: "Hold his gaze",
        greeting: '"Look at me when I\'m speaking to you. ...Yes. Like that."',
        responses: {
          kind: "Let him hold your gaze",
          playful: "Ask what he's staring at",
          bold: "Close the distance yourself",
          neutral: "Hold still, say nothing",
        },
      },
      {
        line: "The cold doesn't reach you when you stand this close. He arranged that.",
        approach: "Close the last step",
        greeting:
          '"You are the only one here I have any interest in. Take that as you like."',
        responses: {
          bold: "Close the last inch",
          kind: "Lean in when he allows it",
          playful: "Call him possessive",
          neutral: "Let him have his moment",
        },
      },
      {
        line: "He says your name once, low, and appears annoyed at how it came out.",
        approach: "Make him say your name",
        greeting: "\"You've grown bold. I find I don't mind it.\"",
        responses: {
          kind: "Let him say your name",
          playful: "Make him lose his composure",
          bold: "Say his name back slower",
          neutral: "Let the moment pass",
        },
      },
    ],
    close: [
      {
        line: 'The ice in his voice is long gone around you. "I was hoping I\'d run into you."',
        approach: "Go to him",
        greeting:
          "\"I don't repeat myself. So hear this once: I'd rather you stayed.\"",
        responses: {
          bold: "Tell him you're staying",
          kind: "Tell him he's not alone",
          playful: "Tease him for hoping",
          neutral: "Let the quiet do the talking",
        },
      },
      {
        line: "He dismisses the others with a flick of his hand the moment he sees you.",
        approach: "Close the distance",
        greeting: '"There is no one else I would allow to see me like this."',
        responses: {
          kind: "Say you're glad you came",
          playful: "Call him spoiled to his face",
          bold: "Say you're not going anywhere",
          neutral: "Sit with him in silence",
        },
      },
      {
        line: "For once he isn't performing for anybody. He just looks glad.",
        approach: "Let him see you smile",
        greeting: '"I suppose I can make an exception for you."',
        responses: {
          kind: "Let the crown come off",
          playful: "Point out the rare smile",
          bold: "Show him you won't break",
          neutral: "Let him have the moment",
        },
      },
      {
        line: '"You\'re late," he says, and the complaint has no teeth in it at all.',
        approach: "Say his name",
        greeting: '"Say what you came to say. I\'ll listen. Only for you."',
        responses: {
          kind: "See his pain without judgment",
          playful: "Poke at his pride",
          bold: "Take his hand first",
          neutral: "Stay and let him speak",
        },
      },
      {
        line: "He sets down whatever he was holding. Whatever it was, it can wait now.",
        approach: "Take his full attention",
        greeting: '"Stand closer. The cold doesn\'t reach you here."',
        responses: {
          kind: "Thank him for his attention",
          playful: "Tease him out of his shell",
          bold: "Hold his attention longer",
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
          bold: ["Pull him back down", "Tell him to be slower"],
          neutral: "Let him set the pace",
        },
      },
      {
        line: "He wakes before you and stays exactly where he is rather than disturb you.",
        approach: "Let him watch you sleep",
        greeting:
          '"Stay. I have spent my whole life being denied things. Not this."',
        responses: {
          kind: "Stay where you are",
          playful: "Tease him for staying still",
          bold: "Wake him with a kiss",
          neutral: ["Lie still beside him", "Let him sleep"],
        },
      },
      {
        line: '"Mine," he says against your throat, like a fact he\'s tired of not saying aloud.',
        approach: "Wear his name",
        greeting: '"Let them talk. You wear my name well."',
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
        greeting: '"You are the single indulgence I refuse to apologize for."',
        responses: {
          kind: "Tell him he's allowed this",
          playful: "Ask what he's not sorry for",
          bold: "Say you're the indulgence",
          neutral: "Let him have this quietly",
        },
      },
      {
        line: "Frostheim is freezing. His bed is not. He has opinions about you leaving it.",
        approach: "Come back to bed",
        greeting: '"Come back to bed. That was not a request."',
        responses: {
          kind: "Come back gladly",
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
      '"...Get to the point." **{name}** doesn\'t turn around, but {user} has his attention.',
      "{user} names him, and **{name}** looks over, unimpressed that it took this long.",
      '"You know who I am. Good." **{name}** allows {user} one step closer.',
    ],
    known: [
      '"You." **{name}** places {user} at a glance, which from him is nearly a greeting.',
      '{user} names him, and **{name}** sighs. "Persistent. I\'ll give you that much."',
      '"Don\'t hover, it\'s annoying." **{name}** doesn\'t send {user} away, either.',
    ],
    warm: [
      '"Walk with me, then. Keep up." **{name}** doesn\'t break stride, but {user} had guessed right.',
      '"You again." **{name}** says it to {user} like a verdict he has stopped appealing.',
      '"Ha. Took you long enough." **{name}** lets {user} fall in at his back.',
    ],
    spark: [
      '"Ha. Guess I\'ll give you some attention." **{name}** turns fully to {user} this time.',
      "{user} named him first, and **{name}** looks far too pleased.",
      "**{name}** does not summon {user} over. He simply stops, and waits.",
    ],
    close: [
      "The **{house}** dispatch goes to Tohma. **{name}** goes to {user}.",
      '"Where the hell have you been?" **{name}** is already at {user}\'s side.',
      "**{name}** drops the court voice the second it's {user} saying his name.",
    ],
    bound: [
      '"Mine," **{name}** says, as though {user} calling out had settled an argument he\'d been having alone.',
      "**{name}** lets the **{house}** business wait. {user} called; that ends it.",
      "{user} says the name, and **{name}** takes what is his.",
    ],
  },
};
