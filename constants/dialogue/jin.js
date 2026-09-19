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
        "**{firstName}**: Servant.\n\nTohma's decided I can't keep sending someone to fetch you every time I want a word. Says it's a waste of the staff. Fine. His way, then. Answer.",
        "You've been underfoot {timesMet} times now. I haven't had you thrown out. Make of that whatever you want. I'm not explaining it.\n\n*The typing indicator starts. Stops. Starts again.*\n\nDon't get ideas. It's not a promotion.",
      ],
      choice: {
        prompt: "Well? You've got thumbs. Use them.",
        options: [
          {
            key: "kind",
            label: "Say you're glad he wrote",
            style: 3,
            close:
              "...Glad. *A long pause.* Ha. Whatever. Be glad, then. Costs me nothing.",
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
              "Ha. *It comes back instantly.* *There* it is.\n\nGood answer. I've got no patience for people who wait to be told what to think. Go to bed, servant.",
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
        "**{firstName}**: Question. Answer it straight or don't bother.",
        "Every time I throw something at you, you come back with {favResponse}. Not once have you tried to sweeten me up first.\n\nEveryone in this house has a voice they save for me. Softer. Rehearsed as hell. I hear it coming three rooms off and I quit listening at the first word.\n\nYou've never used it. So which is it: guts, or you're too dumb to know better?",
      ],
      choice: {
        prompt: "Think before you open your mouth. I'll know if you're lying.",
        options: [
          {
            key: "kind",
            label: "Say he's worth honesty",
            style: 3,
            close:
              "*The typing indicator comes and goes three separate times.*\n\n...Then keep it up, *he sends eventually. Nothing else. Four words took him two minutes.*",
          },
          {
            key: "playful",
            label: "Say it's mostly ignorance",
            style: 1,
            close:
              "Ignorance. You're lying, you're shit at it, and I don't care.\n\nStay dumb, then. It suits you better than the alternative.",
          },
          {
            key: "bold",
            label: "Tell him guts, obviously",
            style: 4,
            close:
              "Obviously, *he repeats, and the word comes out half a laugh.*\n\nYou know how many people in this house talk to me like that? One. The rest rehearse a soft voice and think I can't hear the seams. That's what's wrong with this place. You're the only part of it I haven't got memorized.",
          },
        ],
      },
      keepsake: {
        emoji: "❔",
        line: "The one question he asked you straight, and waited on the answer.",
      },
    },

    closeFriend: {
      beats: [
        "*There's no message first. There's a photo of a small flat box on a desk, and then, half a minute later, the words.*\n\n**{firstName}**: That's yours. Has been for weeks. I just didn't get around to saying so.",
        "It's nothing. A signet. The house's, not the family's, so don't go building a fantasy out of it. Frostheim's, so anyone who wonders what you're doing here has an answer that isn't me.\n\nTake it before I change my mind. I change my mind constantly.",
        "...Picked it out in March, *he adds, after a silence that clearly cost him something.* Been finding reasons not to hand it over ever since. Do whatever you want with that.",
      ],
      choice: {
        prompt: "Say something. Not thank you. I hate being thanked.",
        options: [
          {
            key: "kind",
            label: "Tell him you'll wear it",
            style: 3,
            close:
              "Obviously you'll wear it. That's what it's *for*.\n\n*Then, after a moment:* ...Suits you. Wearing my house suits you. I heard how that sounded. I'm not saying it again.",
          },
          {
            key: "playful",
            label: "Ask what took him so long",
            style: 1,
            close:
              "I was *busy*. I wasn't busy. I was a coward about a piece of metal. Don't tell Tohma. He'll be unbearable and he'll be right.",
          },
          {
            key: "bold",
            label: "Ask him to put it on you",
            style: 4,
            close:
              "*The reply takes a long time.*\n\nCome up. Now, before I change my mind.\n\n*He does it in the captain's room without turning the lamp on, your hand held flat in both of his, and he takes a hell of a lot longer over it than the job needs. Neither of you mentions that.*",
          },
        ],
      },
      keepsake: {
        emoji: "💍",
        line: "The house signet he chose in March and took until now to hand over.",
      },
    },

    confidant: {
      beats: [
        "*It comes through at an hour when even Frostheim is dark.*\n\n**{firstName}**: You don't repeat this. I'm not asking.",
        "Everyone here calls me king. Not one of them picked me. I got handed a room, a title, and the little performance everyone runs before they knock: a figurehead with a good view. I've been holding the whole thing up by myself since before you showed up.\n\nThere was someone here once who didn't run it. He's not here now. I'm not getting into it.",
        "I worked out a long time ago that nothing good sticks around. That's not self-pity, it's just the math.\n\nThen you kept turning up, and I caught myself running the math again, hoping it'd come out different. That's it. That's the whole thing. I hate every fucking word of it.",
      ],
      choice: {
        prompt: "Now tell me I'm being pathetic so we can both move on.",
        options: [
          {
            key: "kind",
            label: "Refuse to move past it",
            style: 3,
            close:
              "*Nothing for a long time.*\n\nNo. You wouldn't, would you. *A pause.* That was the whole risk of telling you.\n\n...Stay put. I'm not done being looked at.",
          },
          {
            key: "playful",
            label: "Call him extremely pathetic",
            style: 1,
            close:
              "Thanks. That's exactly what I asked for and I hate it.\n\nDo it again tomorrow. Apparently I need it.",
          },
          {
            key: "bold",
            label: "Tell him you're not leaving",
            style: 4,
            close:
              "Nobody gets to promise that, *he writes, fast, almost angry.* People say it and then the math happens anyway.\n\n*Then, much slower:* ...Say it again. I won't believe you. Say it anyway.\n\n*You say it four times before he stops asking. He never once says thank you, and he doesn't put the phone down until it's light.*",
          },
        ],
      },
      keepsake: {
        emoji: "🕰️",
        line: "The hour he spent admitting he'd been alone in that room.",
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
          kind: [
            "Address him the way he expects",
            "Explain your reason calmly",
          ],
          playful: ["Tease the frost right back", "Joke about being uninvited"],
          bold: ["Reject the servant title", "Stand your ground at the door"],
          neutral: ["Say nothing at all", "Wait to see what he wants"],
        },
      },
      {
        line: "He doesn't turn to look at you. The cold in the room sharpens.",
        approach: "Speak up",
        greeting: '"Speak quickly. I don\'t like to wait."',
        responses: {
          kind: ["Thank him for his time", "Answer without hesitation"],
          playful: ["Refuse to be impressed", "Take your time regardless"],
          bold: ["Refuse to look away", "Speak before he asks twice"],
          neutral: ["Wait for him to speak", "Match the cold with silence"],
        },
      },
      {
        line: "He's alone, like always, cigarette burning down in the ashtray, and doesn't look up when the door opens.",
        approach: "Close the door after you",
        greeting: "\"You're not supposed to be here. Don't waste my time.\"",
        responses: {
          kind: ["Show respect for his pride", "Offer to come back later"],
          playful: ["Call his bluff lightly", "Joke about the cigarette"],
          bold: ["Push past the dismissal", "Refuse to be waved off"],
          neutral: ["Respect his space", "Stay quiet by the door"],
        },
      },
      {
        line: "He weighs you the way one weighs a servant he did not hire, quickly, and without much interest.",
        approach: "Refuse to be dismissed",
        greeting: '"Don\'t just stand there like an idiot. Hurry up."',
        responses: {
          kind: ["Stay composed under his gaze", "Let the insult roll off"],
          playful: [
            "Call him rude to his face",
            "Act unbothered by the insult",
          ],
          bold: ["Meet him as an equal", "Meet his stare head-on"],
          neutral: ["Wait for him to look up", "Shrug off the insult"],
        },
      },
      {
        line: "He lights a cigarette and waits for you to explain yourself.",
        approach: "State your case",
        greeting: '"Get to the point. The trash here is so long-winded."',
        responses: {
          kind: ["State your case respectfully", "Keep your explanation brief"],
          playful: ["Tease him for smoking", "Take your time explaining"],
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
          kind: ["Say you're glad he remembers", "Thank him for noticing"],
          playful: ["Ask why your name stuck", "Tease him about noticing"],
          bold: ["Call out his pretending", "Say you noticed him notice"],
          neutral: ["Let him have the denial", "Say nothing, let it stand"],
        },
      },
      {
        line: '"You again," he says, and returns to his cigarette. He doesn\'t call you servant this time.',
        approach: "Ask what he needs",
        greeting: '"Tsk. You again. Make yourself useful while you\'re at it."',
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
        approach: "Speak while allowed",
        greeting: '"Don\'t mistake familiarity for permission."',
        responses: {
          kind: ["Take the warning gently", "Say you understand the line"],
          playful: ["Ask what permission looks like", "Push the line a little"],
          bold: ["Test the line anyway", "Refuse to shrink back"],
          neutral: ["Accept the boundary quietly", "Let the warning sit"],
        },
      },
      {
        line: "He looks up, places you, and looks back down. From Jin, that is nearly a greeting.",
        approach: "Hold his glance",
        greeting: '"You. I remember you. Don\'t let it go to your head."',
        responses: {
          kind: ["Promise it stays humble", "Say you noticed the effort"],
          playful: ["Let it go to your head", "Grin at the almost-greeting"],
          bold: ["Hold his glance right back", "Name it as a real greeting"],
          neutral: [
            "Hold his glance in silence",
            "Let the moment pass quietly",
          ],
        },
      },
      {
        line: "He doesn't order you off this time. He just watches to see if you'll leave on your own.",
        approach: "Stay without being told to",
        greeting: '"Careful. Getting used to me is a bad habit."',
        responses: {
          kind: [
            "Say the habit's worth keeping",
            "Reassure him it's not so bad",
          ],
          playful: [
            "Agree it's a terrible habit",
            "Threaten to stay even longer",
          ],
          bold: ["Refuse to leave on cue", "Call his bluff and stay put"],
          neutral: ["Stay a while longer", "Wait to see what he does"],
        },
      },
      {
        line: '"Servant," he says, out of habit now more than insult, and goes back to his cigarette.',
        approach: "Answer to the name anyway",
        greeting:
          "\"You're a mid-tier nuisance. That's practically a compliment, coming from me.\"",
        responses: {
          kind: ["Take the compliment kindly", "Thank him for the backhand"],
          playful: ["Upgrade your own title", "Ask for a better nickname"],
          bold: ["Reject the nuisance label", "Demand a real compliment"],
          neutral: ["Let the label slide", "Answer to it anyway"],
        },
      },
      {
        line: "The room doesn't warm, but he stops performing indifference the second you walk in.",
        approach: "Take the grudging welcome",
        greeting:
          "\"You're late. You've got some nerve making me wait, servant.\"",
        responses: {
          kind: ["Notice him softening quietly", "Let him drop the act gently"],
          playful: ["Call out the dropped act", "Tease him for softening"],
          bold: ["Name what you just saw", "Call him out on the warmth"],
          neutral: ["Say nothing, just notice", "Let the moment go unremarked"],
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
        line: "\"You're persistent,\" he says, like it's an accusation and a compliment at once.",
        approach: "Take it as a compliment",
        greeting: "\"You're persistent. I'll give you that much.\"",
        responses: {
          kind: ["Thank him, plainly", "Take it as sincere, not snide"],
          playful: ["Agree you're relentless", "Ask which one he meant"],
          bold: ["Own the persistence proudly", "Tell him it's not stopping"],
          neutral: ["Shrug at the label", "Let the comment go unanswered"],
        },
      },
      {
        line: "He doesn't send Tohma to deal with you anymore. That's new, and he knows you've noticed.",
        approach: "Don't call him out",
        greeting: "\"What? Tohma's busy. Don't read into it.\"",
        responses: {
          kind: [
            "Say you're glad he noticed",
            "Thank him for trusting you now",
          ],
          playful: [
            "Point out you outlasted Tohma",
            "Tease him for doing it himself",
          ],
          bold: ["Say you were never worried", "Meet his voice head-on"],
          neutral: ["Take the change in stride", "Let the shift go unremarked"],
        },
      },
      {
        line: "He doesn't ask how you got in this time. He already knows you'll find a way.",
        approach: "Come back uninvited again",
        greeting: '"Tsk. Again. Who keeps letting you in? ...Whatever. Sit."',
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
        greeting: "\"...It's quiet tonight. Don't ruin it.\"",
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
          kind: "Greet him just as warmly",
          playful: "Point out the almost-smile",
          bold: "Call him pleased outright",
          neutral: "Greet him plainly",
        },
      },
      {
        line: "He keeps speaking to whoever's in front of him, but the door stays open behind them.",
        approach: "Walk over to him",
        greeting:
          "\"Don't stand in the doorway. You're letting the cold out.\"",
        responses: {
          kind: "Walk in like you're welcome",
          playful: "Ask if the door's for you",
          bold: "Walk straight up to him",
          neutral: "Step through without a word",
        },
      },
      {
        line: "The room is still freezing. Somehow the chair nearest to him is not.",
        approach: "Take the seat he left open",
        greeting: '"You again. Sit, if you must. Don\'t touch anything."',
        responses: {
          kind: "Thank him for the seat",
          playful: "Ask if he saved it for you",
          bold: "Take the seat like it's yours",
          neutral: "Sit without remarking on it",
        },
      },
      {
        line: "He's already turned toward the sound of your footsteps by the time you round the corner.",
        approach: "Break the silence first",
        greeting: '"Hmph. At least you had the sense to come to me directly."',
        responses: {
          kind: "Say you're glad he noticed",
          playful: "Ask how he always knows",
          bold: "Break the silence yourself",
          neutral: "Say nothing, just approach",
        },
      },
      {
        line: '"You took the long way," he notes, without looking up. He\'d been counting.',
        approach: "Own the long way",
        greeting: '"I didn\'t summon you. But you can stay."',
        responses: {
          kind: "Say you didn't mean to worry",
          playful: "Ask if he was counting",
          bold: "Own the long way outright",
          neutral: "Shrug and say nothing",
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
          playful: "Poke at his pride, gently",
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
  // Evening block: dialogue and approach paired per beat
  // (docs/dialogue-approach-pairing.md) instead of two separately-drawn lists.
  dialogueWhen: [
    {
      when: { time: "evening" },
      dialogue: {
        new: [
          {
            line: "He hasn't turned on a light. The cold has teeth after dark and he seems to prefer it that way.",
            approach: "Step onto the dark balcony",
          },
          {
            line: '"Frostheim after dark is mine," he says without turning. "You\'re standing in it."',
            approach: "Meet him at the rail",
          },
          {
            line: "Frost has crept across the balcony doors behind him. He watches the black campus like he owns the view.",
            approach: "Step onto the dark balcony",
          },
          {
            line: '"The cold gets worse after sundown," he says. "You knew that, and came anyway."',
            approach: "Meet him at the rail",
          },
        ],
        known: [
          {
            line: "\"Late,\" he observes. He doesn't say for what, and doesn't tell you to leave either.",
            approach: "Take the cold beside him",
          },
          {
            line: "The cold doesn't reach the spot he's left open beside him. He arranged that before you arrived.",
            approach: "Take the cold beside him",
          },
          {
            line: '"It\'s late," he says. "Stand somewhere useful and don\'t let the cold in."',
            approach: "Take the cold beside him",
          },
        ],
        warm: [
          {
            line: '"Stay until the cold drives you in," he says. "Not before."',
            approach: "Take the offered rail",
          },
          {
            line: "He lights a cigarette against the dark and, for once, offers the rail beside him without a word.",
            approach: "Take the offered rail",
          },
          {
            line: '"Past curfew," he notes. "I won\'t report you. Sit down."',
            approach: "Take the offered rail",
          },
        ],
      },
    },
  ],
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
      '"...Get to the point." **{name}** doesn\'t turn around, but {user} has his attention.',
      "{user} names him, and **{name}** looks over, unimpressed that it took this long.",
      '"You know who I am. Good." **{name}** allows {user} one step closer.',
    ],
    warm: [
      "\"Walk with me, then. Keep up.\" **{name}** doesn't break stride, but {user} had guessed right.",
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
      "\"Where the hell have you been?\" **{name}** is already at {user}'s side.",
      "**{name}** drops the court voice the second it's {user} saying his name.",
    ],
    bound: [
      '"Mine," **{name}** says, as though {user} calling out had settled an argument he\'d been having alone.',
      "**{name}** lets the **{house}** business wait. {user} called; that ends it.",
      "{user} says the name, and **{name}** takes what is his.",
    ],
  },
};
