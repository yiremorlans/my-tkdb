export default {
  // The level-up DMs (docs/bond-scene-dms.md). Per reference.md, Subaru is
  // reflexively accommodating and apologizes when he thinks he's overstepped —
  // that's one situational tic among several (see his canon voice lines), not
  // the engine of the scene. The real throughline is his stigma: he reads the
  // thoughts left on anything he touches, and an object that belonged to someone
  // lets him recall that person's own memories and feelings. He's ashamed of it
  // — it means reading what people never meant to share — so the romance runs on
  // the inverse: MC deliberately handing him her own things, letting him in,
  // wanting him to know. Each tier turns that involuntary, shameful ability a
  // little more into something given freely, which is what makes the physical
  // intimacy at the top of the ladder cost him something and what makes him
  // reach for it anyway.
  bondScenes: {
    acquaintance: {
      beats: [
        "**{firstName}**: Hello Honor Roll, is now an alright time?",
        "You've helped Hotarubi more times than most people would ever bother counting. {timesMet}, by my count, and I don't say that enough.\n\nHaku and I keep a pot of tea going most evenings, nothing formal, and I've wanted to ask you to join us for longer than I'll admit. I just kept finding a reason it wasn't quite the right moment. I know you're busy, and you don't owe us the visit just because you've done so much for the house already. I only wanted you to know I'd like it very much, if you said yes.",
      ],
      choice: {
        prompt:
          "Please don't feel you have to say yes on our account. I mean that.",
        options: [
          {
            key: "kind",
            label: "Tell him you'd love to come",
            style: 3,
            close:
              "*A short pause*\n\nThank you. I know I said you didn't have to, but I'm glad you want to. I'll tell Haku, he'll be pleased to have you at the table properly, for once. I'll get the good cups out.",
          },
          {
            key: "playful",
            label: "Tease him for the long delay",
            style: 1,
            close:
              "Ha ha, I suppose I earned that. In my defense, I rewrote the first line alone six times.\n\nCome anyway. I promise the company is better than the drafting.",
          },
          {
            key: "bold",
            label: "Tell him you'd been waiting",
            style: 4,
            close:
              "*A pause before he replies, longer than the last.*\n\nYou were waiting? All this time I was so certain I'd be a bother, and you were only waiting for me to catch up.\n\nCome tonight, then. I promise, I won't leave you waiting again.",
          },
        ],
      },
      keepsake: {
        emoji: "🫖",
        line: "An invitation it took him weeks to work up the nerve to send.",
      },
    },

    friend: {
      beats: [
        "**{firstName}**: May I tell you something unpleasant about myself? I'd rather you heard it from me.",
        "Everyone thinks I'm kind. I'm not, especially. I'm accommodating, which looks the same from outside and is mostly fear.\n\nAnd I think people are worse than the anomalies. I've read enough of what they leave on things, doorframes, handrails, cups. They put the ugliest parts of themselves down without noticing, and I pick all of it up.\n\nYou answer me with {favResponse} every time and there's never a second thing under it. Do you know how rare that is, for someone who can check?",
      ],
      choice: {
        prompt: "There. Now you know I'm a bit horrible. Say something.",
        options: [
          {
            key: "kind",
            label: "Say that isn't horrible",
            style: 3,
            close:
              "It is a bit.\n\nBut thank you for arguing. Nobody argues with me. They agree with whatever I say about myself, and I've never found that comforting.",
          },
          {
            key: "playful",
            label: "Ask what your doorframe said",
            style: 1,
            close:
              "I'd never...!\n\n...Nothing bad. Nothing at all, which almost never happens. Like putting my hand on clean water.\n\nThat was far too much. Good night.",
          },
          {
            key: "bold",
            label: "Tell him to stop accommodating",
            style: 4,
            close:
              "*A long silence.*\n\nI don't know what I'd be, *he writes.* That's the honest answer. I've been accommodating since I was four and standing on a stage.\n\nBut you're the first to ask me to find out. I might try. Slowly. Be patient with me.",
          },
        ],
      },
      keepsake: {
        emoji: "🪡",
        line: "The one set of hands that left nothing ugly behind.",
      },
    },

    closeFriend: {
      beats: [
        "**{firstName}**: Are you awake? There's something in the Hotarubi tea room I'd like you to see, tonight. It's the anniversary, and I don't think I can do it alone this year.",
        "*The room is dark. A fan, a comb, and a folded haori are laid out on the low table with a precision that is clearly ritual.*\n\n> These are from the first role I ever danced. I was four. Once a year I hold them and read what's left on them, and it's the only time I've been glad of this stigma.",
        "> I've never brought anyone. I thought it would spoil it. It hasn't.\n\n*He holds the fan out, hesitates, then puts it in your hands anyway.*\n\n> Now there'll be some of you on it, and next year I'll read that too. I've made you part of a very old thing without asking. I'm not sorry.",
      ],
      choice: {
        prompt: "...Say something. My hands are shaking a bit.",
        options: [
          {
            key: "kind",
            label: "Ask about the first dance",
            style: 3,
            close:
              "*He tells you, then shows you: three steps of it in the dark in his socks, stopping halfway, embarrassed and lit up at once.*\n\n> I haven't done that in two years,\n\n*he says.*\n\n> Not for anyone. Not even myself.",
          },
          {
            key: "playful",
            label: "Ask what the fan says now",
            style: 1,
            close:
              "*He goes very red.*\n\n> I'm not telling you.\n\n> It's warm. That's all you're getting, and I'll be thinking about it for a year.",
          },
          {
            key: "bold",
            label: "Take his hand instead",
            style: 4,
            close:
              "*He freezes, the one thing he never lets happen: skin on skin, no glove, nothing between.*\n\n*He doesn't pull away. He closes his eyes, stands very still, and after a long moment says, unsteadily:*\n\n> There's nothing frightening in you at all. I've been so afraid there would be.",
          },
        ],
      },
      keepsake: {
        emoji: "🎴",
        line: "A fan that will carry the memory of your hands for a year.",
      },
    },

    confidant: {
      beats: [
        "**{firstName}**: I know it's late. I've started this message six times and deleted it. The seventh is sending whether I'm ready or not.",
        "They ask when I'm going back to the stage. Every letter, every visit. The hiatus is \"temporary\", and it's been three years of temporary.\n\nThe truth is I stopped being able to do it. A stage is a hundred years of other people's hands on every rope and rail and prop, and it all comes through the moment I touch anything. Somewhere along the way I lost the knack of shutting it out.",
        "So I'm here instead, a kabuki actor who doesn't act, filling the days with the house and other people's errands. Good at making everyone else comfortable, bad at doing it for myself.\n\nI've told nobody. Haku suspects. Zenji would understand, and I can't bear the thought of him being gentle about it.\n\nYou get it because you're the one person I don't have to be anything in front of. That's not a small thing to hand someone. Be careful with it.",
      ],
      choice: {
        prompt:
          "Now. Say something before I talk myself out of having sent it.",
        options: [
          {
            key: "kind",
            label: "Tell him he's allowed to stop",
            style: 3,
            close:
              "*There's no reply for a long time.*\n\nNobody has ever said that to me, *he writes finally.* Not once. Everyone's always been so *encouraging*.\n\nI think I'm going to cry, and I'd rather do it here than anywhere with people in it. Stay a minute?\n\n*You stay all night.*",
          },
          {
            key: "playful",
            label: "Ask if Haku wrote this",
            style: 1,
            close:
              "Absolutely not, this is all me, and now I'm a little offended.\n\n...Though he did talk me out of three endings. He's very patient with me.",
          },
          {
            key: "bold",
            label: "Offer to go with him",
            style: 4,
            close:
              "To a *theater*?\n\n*A long pause.*\n\n...If you were holding the other end of my sleeve, I might manage the door. Not the stage. The door.\n\nThat's more than I've had in three years. Ask me again in spring, and don't let me talk you out of it. I'll try.",
          },
        ],
      },
      keepsake: {
        emoji: "🎭",
        line: "The reason for a three-year hiatus, told to exactly one person.",
      },
    },

    devoted: {
      beats: [
        "**{firstName}**: You left your scarf in the common room. I picked it up without thinking, and... well.",
        "I read it. Not on purpose, it doesn't ask me first.\n\nThere was a great deal of me on it. More than I expected. You've been thinking about me at times when there was no reason to.",
        "I should have put it down. I held it for nearly an hour instead, in an empty room, like a thief.\n\nI've spent my whole life reading what people never meant to tell me and being ashamed of it. This is the first time I haven't been ashamed, and that frightens me more than the reading ever did.",
      ],
      choice: {
        prompt: "So. Am I forgiven, or ought I to be?",
        options: [
          {
            key: "kind",
            label: "Tell him you don't mind",
            style: 3,
            close:
              "You should mind. Everyone minds.\n\n...I'm keeping it until tomorrow, then. Just tonight. Don't ask me why.",
          },
          {
            key: "playful",
            label: "Ask what else it told him",
            style: 1,
            close:
              "Absolutely not.\n\n...It told me you were cold. Which I'd have known by looking at you, so the stigma was no help at all and I've been dramatic for nothing.",
          },
          {
            key: "bold",
            label: "Tell him he read it right",
            style: 4,
            close:
              "*The typing indicator starts and stops for nearly five minutes.*\n\n*Then he's at your door with the scarf in both hands. He doesn't hand it over, he puts it round your neck himself, and doesn't step back after.*\n\n> I read it right,\n\n*he says, barely a whisper.*\n\n> I've never wanted to be right about something so badly.",
          },
        ],
      },
      keepsake: {
        emoji: "🧶",
        line: "A scarf he held for an hour in an empty room.",
      },
    },

    soulbound: {
      beats: [
        "**{firstName}**: I've rehearsed this more than anything I ever rehearsed for the stage, which, given my history, is saying a great deal.",
        "{timesMet} times. I've read every doorframe you've touched in this house, and never once found a bad thought about me. I looked. I want you to know I looked, because it's the least generous thing I've done and you deserve to know it.",
        "I was raised to be watched. Thousands of people, and none of them could see me at all. That's rather the point of the paint.\n\nYou've never seen the paint. Only the boy who fusses and reads doorframes and can't go near a theater, and you keep coming back to *that*. That has never once happened to me.",
        "I love you.\n\nI've kept that on a shelf a long time, telling myself it was improper, or unfair to you, or a burden. Every one of those was a way of not saying it.\n\nSo it's said. Badly rehearsed and entirely honest, and the only thing in this message I'm sure of.",
      ],
      choice: {
        prompt:
          "Take all the time you want. I've been patient for three years about far less important things.",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close:
              "*The reply is just:* Come to the tea room.\n\n*He's standing in the dark with the lights off, and when you take his hands he lets you, both of them, bare: everything you've ever thought about him arriving at once, nothing held back.*\n\n*He makes a small sound and puts his forehead to yours.*\n\n> Oh. You've been saying it all along, haven't you. I just couldn't read it until you let me.",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close:
              "Of course. Truly, of course.\n\nI've spent three years being asked when I'm going back to something I'm not ready for. I'd be the last to put a clock on you.\n\nNothing changes. I'll be in the tea room on Thursdays, making far too much of it. I shan't mention this again unless you do, so you can come and sit with me without a question in the room.\n\n*And he doesn't. Not once. But the fan stays out on the table where it can read your hands, all year.*",
          },
        ],
      },
      keepsake: {
        emoji: "📃",
        line: "The one message he never once rehearsed.",
      },
    },
  },
  dialogue: {
    new: [
      {
        line: "He looks up from the lantern he's trimming, a quiet warmth in his eyes as he notices you.",
        approach: "Step through the gate",
        greeting:
          '"Welcome. Forgive the state of the path. I meant to sweep it this morning and lost track of the hour."',
        responses: {
          kind: ["Tell him the path looks fine", "Offer to help sweep"],
          playful: ["Inspect the path, gravely", "Say the path looks fine"],
          bold: ["Be direct with him", "Say the path doesn't matter"],
          neutral: ["Sit quietly while he works", "Step through, say little"],
        },
      },
      {
        line: "He bows before he speaks. It's automatic, and completely sincere.",
        approach: "Return his bow",
        greeting:
          "\"Welcome. Hotarubi can seem a little quiet at first. I hope it doesn't feel unwelcoming. It isn't meant to.\"",
        responses: {
          kind: ["Acknowledge his effort", "Say it doesn't feel that way"],
          playful: ["Catch him off script", "Bow deeper than he did"],
          bold: ["Say what you came to say", "Ask why it's so quiet"],
          neutral: ["Take him at his word", "Nod and take it in"],
        },
      },
      {
        line: '"I\'ve been working since I was four, so people said I was mature for my age," he says. "But the truth is, I still have a lot to learn."',
        approach: "Wave off the modesty",
        greeting:
          '"Oh, no, please, I wasn\'t fishing for anything. Ha ha... I only meant I still get things wrong."',
        responses: {
          kind: ["Notice how hard he works", "Say four is very young"],
          playful: [
            "Tease him about being 'mature'",
            "Admit you're a mess too",
          ],
          bold: ["Refuse the polite version", "Say he's selling himself short"],
          neutral: ["Let him underplay it", "Just listen"],
        },
      },
      {
        line: "He finishes the note he's leaving for Haku first. Duty, then greeting. Always in that order.",
        approach: "Wait while he finishes up",
        greeting:
          "\"I'm very sorry to have kept you waiting. It's wonderful to see you again.\"",
        responses: {
          kind: ["Say the wait was fine", "Tell him not to apologize"],
          playful: ["Tease him for the order", "Ask what the note says"],
          bold: ["Ask to be greeted first", "Greet him before he's done"],
          neutral: ["Let him finish up", "Wait without a word"],
        },
      },
      {
        line: '"You\'ve caught me just before lunch," he says. "Lyca and I eat on the terrace now and then."',
        approach: "Ask to join them",
        greeting:
          "\"Oh. I'd have to ask him first, if you don't mind. He's still getting used to new people.\"",
        responses: {
          kind: ["Say of course, ask him first", "Tell him to take his time"],
          playful: ["Ask if Lyca will vet you", "Ask what Lyca eats"],
          bold: ["Say he doesn't need to ask", "Say you'll ask Lyca yourself"],
          neutral: ["Nod and leave it there", "Leave them to it"],
        },
      },
      {
        line: "He's partway through making a pot of tea when you arrive. He reaches for a second cup the moment he sees you.",
        approach: "Accept the tea",
        greeting: '"A visitor? Then let me at least offer you tea."',
        responses: {
          kind: ["Accept the tea gratefully", "Thank him for the second cup"],
          playful: ["Tease him about the tea", "Ask if he expected you"],
          bold: ["Take the cup before he offers", "Pour it yourself"],
          neutral: ["Take the tea, say nothing", "Sit and wait for the tea"],
        },
      },
    ],
    known: [
      {
        line: "He uses your name now, without the small pause he used to leave in front of it.",
        approach: "Return the bow",
        greeting:
          '"Welcome back, Honor Roll. I hoped that was you at the gate."',
        responses: {
          kind: [
            "Say it's nice to be remembered",
            "Say you hoped it was him too",
          ],
          playful: [
            "Ask if he practiced that",
            "Tease him for getting it right",
          ],
          bold: [
            "Say of course he got it right",
            "Expect to be remembered now",
          ],
          neutral: ["Return the bow, say nothing", "Nod and move on"],
        },
      },
      {
        line: "He takes the bag by the strap rather than the handle, the way he takes everything.",
        approach: "Let him take it",
        greeting:
          '"Here, let me. ...Sorry. I\'ll be careful with it, I promise."',
        responses: {
          kind: ["Reassure him it's fine", "Hand him the bag"],
          playful: ["Ask why not the handle", "Tease him about the care"],
          bold: ["Hand it over without asking", "Say he can just take it"],
          neutral: ["Let him take it, say nothing", "Hand it over quietly"],
        },
      },
      {
        line: "There's a cup already out. He'll say it was poured for no one in particular.",
        approach: "Take the tea",
        greeting: "\"Oh, good, it's still hot. Please, sit, before it isn't.\"",
        responses: {
          kind: ["Sit down while it's hot", "Say he didn't have to"],
          playful: ["Ask who the cup was really for", "Claim the extra cup"],
          bold: ["Take the cup, no argument", "Say it was obviously for you"],
          neutral: ["Take the cup, say nothing", "Sit and wait quietly"],
        },
      },
      {
        line: "He hands you his umbrella without the half-second hesitation he still gives everyone else.",
        approach: "Thank him",
        greeting: "\"Please, take it. I'll run. It's no trouble, truly.\"",
        responses: {
          kind: ["Thank him sincerely", "Say that was thoughtful"],
          playful: ["Ask what else he noticed", "Tease him about the umbrella"],
          bold: ["Take it without fuss", "Say he didn't need to explain"],
          neutral: ["Take it, say nothing", "Accept it quietly"],
        },
      },
      {
        line: "\"I'm sorry I'm so late. The campus is so crowded I can never manage to walk in a straight line. Silly, isn't it?\"",
        approach: "Tell him it's not silly",
        greeting:
          '"I really am sorry. I did try to leave early. I just... didn\'t manage it."',
        responses: {
          kind: ["Say it's really not silly", "Say you didn't mind waiting"],
          playful: [
            "Agree it's a little silly",
            "Tease him for making you wait",
          ],
          bold: ["Tell him to stop apologizing", "Say lateness doesn't matter"],
          neutral: ["Shrug it off", "Let the apology pass"],
        },
      },
      {
        line: '"Lyca used a word today that I only taught him last week, and used it perfectly," he says, quietly delighted. "Sorry. Small thing. It rather made my afternoon."',
        approach: "Celebrate together",
        greeting:
          '"I know it\'s small. But he was so proud, and he tried so hard to hide it."',
        responses: {
          kind: ["Celebrate with him warmly", "Say that's wonderful to hear"],
          playful: ["Ask what word it was", "Tease him for being so pleased"],
          bold: ["Say you're proud of them both", "Demand the full story"],
          neutral: ["Smile, say little", "Let him have the moment"],
        },
      },
      {
        line: "He's stopped apologizing for taking up your time before he's even finished the sentence.",
        approach: "Smile at the change",
        greeting: "\"I've only a moment. But I'd rather spend it here.\"",
        responses: {
          kind: ["Say you don't mind the time", "Say you'd rather be here too"],
          playful: ["Notice the change in him", "Tease him about the change"],
          bold: ["Say no apology's needed", "Ask him to stay longer"],
          neutral: ["Let the moment pass quietly", "Say nothing about it"],
        },
      },
      {
        line: "\"You think I'm always smiling? Ha ha,\" he says, and for once doesn't deflect the question after.",
        approach: "Ask what makes him happy",
        greeting:
          "\"No one's ever asked me why. ...I think it's that here, no one needs anything from me. Is that a strange answer?\"",
        responses: {
          kind: ["Ask what he needs", "Listen without pushing"],
          playful: [
            "Guess what makes him happy",
            "Tease him for smiling so much",
          ],
          bold: ["Push him for a real answer", "Say the smile might be a mask"],
          neutral: ["Let him decide what to share", "Wait for him to answer"],
        },
      },
      {
        line: '"I read something off this," he admits, turning an object over in his hands, "but it isn\'t mine to tell."',
        approach: "Don't press him",
        greeting:
          "\"I'm sorry. It's a gross ability, really. I'd rather not spread what I shouldn't have seen.\"",
        responses: {
          kind: ["Respect what he won't say", "Say it's fine to stay private"],
          playful: ["Guess what he read", "Beg for just a hint"],
          bold: ["Ask him to tell you anyway", "Push past the discretion"],
          neutral: ["Let it go unremarked", "Don't press for more"],
        },
      },
      {
        line: '"Would you come with me to Sho\'s truck?" he asks. "I\'ve stood in front of that menu twice now and couldn\'t decide."',
        approach: "Say yes to the truck",
        greeting:
          '"Thank you. The line keeps moving while I\'m still deciding, and I feel terrible holding it up."',
        responses: {
          kind: ["Agree to go with him gladly", "Offer to help him decide"],
          playful: ["Tease him for taking so long", "Guess his order for him"],
          bold: ["Just order for him", "Take charge of the menu"],
          neutral: ["Go along without comment", "Say yes, keep it simple"],
        },
      },
      {
        line: "He catches himself mid-bow when you wave instead, and laughs at his own reflex.",
        approach: "Laugh with him",
        greeting:
          '"Ha ha... Years of habit. I don\'t think I know how to say hello any other way."',
        responses: {
          kind: ["Say the bow suits him", "Say it's a nice habit"],
          playful: [
            "Tease him about the reflex",
            "Ask if he'll ever stop bowing",
          ],
          bold: ["Wave before he can bow", "Call out the old habit"],
          neutral: ["Let him laugh it off", "Smile, say nothing"],
        },
      },
      {
        line: "He asks how your day went before you can ask about his. For once, he gets there first.",
        approach: "Tell him about your day",
        greeting:
          "\"I hope I'm not being presumptuous, but I'm glad you're here.\"",
        responses: {
          kind: ["Say you're glad too", "Tell him about your day gladly"],
          playful: ["Act surprised he beat you", "Tease him for going first"],
          bold: ["Ask about his day right back", "Insist on his day first"],
          neutral: ["Answer plainly, move on", "Give a short answer"],
        },
      },
      {
        line: "He waits until you and Haku are both there before he starts the mission briefing.",
        approach: "Take a seat",
        greeting:
          "\"Haku should be here any moment. I'd rather he hear it all at once. He's better at this than I am.\"",
        responses: {
          kind: ["Wait with him patiently", "Say you don't mind waiting"],
          playful: [
            "Guess what the briefing is",
            "Tease him for the formality",
          ],
          bold: ["Ask him to start without Haku", "Push him to just begin"],
          neutral: ["Wait quietly for Haku", "Sit and wait, say nothing"],
        },
      },
    ],
    warm: [
      {
        line: "He still braces before he takes anything from your hands. He just doesn't hesitate anymore before offering to.",
        approach: "Hand it to him yourself",
        greeting:
          "\"Here, let me. ...It's all right. With you, I don't mind what I might read.\"",
        responses: {
          kind: ["Tell him you trust him", "Say you don't mind either"],
          playful: ["Ask what it says about you", "Ask for a reading"],
          bold: [
            "Say you wanted him to read it",
            "Say there's nothing to hide",
          ],
          neutral: ["Hand it over, say nothing", "Let him read what he reads"],
        },
      },
      {
        line: "His usual composure softens immediately: there's genuine gladness in his expression when he sees you.",
        approach: "Ask how he's holding up",
        greeting: "\"You're here... I'm very glad.\"",
        responses: {
          kind: ["Ask how he's doing", "Ask if he's been resting"],
          playful: ["Tease the sudden gladness", "Ask what he's so glad about"],
          bold: ["Say you're glad too, plainly", "Tell him to say more"],
          neutral: ["Sit with him quietly", "Settle in across from him"],
        },
      },
      {
        line: "He'd saved up three small things to tell you. He leads with the least important, to make it last.",
        approach: "Join him on the veranda",
        greeting:
          '"I find myself listening for the gate lately. I wonder why."',
        responses: {
          kind: ["Ask to hear all three things", "Ask about the smallest one"],
          playful: ["Guess the bigger secret", "Rank them as he tells you"],
          bold: [
            "Demand the important one first",
            "Ask what he's saving for last",
          ],
          neutral: ["Let him tell it his way", "Listen without prompting"],
        },
      },
      {
        line: '"You\'re just in time," he says, though nothing in particular is happening. Then, catching himself: "...Sorry. That was a strange thing to say, wasn\'t it?"',
        approach: "Take the second cup",
        greeting:
          '"You always come at the right hour. How do you manage that?"',
        responses: {
          kind: [
            "Say you're glad to be on time",
            "Say the phrasing was lovely",
          ],
          playful: [
            "Ask what's actually happening",
            "Pretend something is happening",
          ],
          bold: ["Call out the odd phrasing", "Say you'd come either way"],
          neutral: ["Take it and drink", "Say nothing was strange"],
        },
      },
      {
        line: "The paperwork gets set aside faster than his own rules should allow.",
        approach: "Sit with him",
        greeting: '"Sit with me a moment? Haku has the house tonight."',
        responses: {
          kind: ["Sit down and thank him", "Ask if the work can wait"],
          playful: [
            "Tease him for the exception",
            "Ask who's minding the rules",
          ],
          bold: ["Say you're worth the exception", "Move the papers yourself"],
          neutral: ["Sit in comfortable quiet", "Sit, let him decide"],
        },
      },
      {
        line: '"I really am lucky," he says, half to himself. "Surrounded by people this kind. I don\'t say it enough, but I think it constantly."',
        approach: "Say you feel lucky too",
        greeting:
          "\"You think I'm always smiling? Ha ha, I hear that a lot. It just happens when I'm around all of you.\"",
        responses: {
          kind: ["Say the feeling's mutual", "Tell him he's kind too"],
          playful: ["Ask if that's why he smiles", "Add yourself to the list"],
          bold: ["Say he should hear it more", "Tell him to say it out loud"],
          neutral: ["Let him have the thought", "Nod, leave it there"],
        },
      },
    ],
    spark: [
      {
        line: "The restraint is fraying and he knows you can see it.",
        approach: "Look at him like that",
        greeting:
          '"Don\'t look at me like that. I have very little left to hold on to."',
        responses: {
          kind: "Stay till he straightens up",
          playful: "Fray the last of it",
          bold: "Tell him to stop holding on",
          neutral: "Let him keep his restraint",
        },
      },
      {
        line: '"I shouldn\'t want this," he says quietly. "I\'ve stopped being able to talk myself out of it."',
        approach: "Let him be selfish",
        greeting: [
          '"I\'ve been careful all day. Let me stop being careful, just for an hour."',
          '"You make it very difficult to be dutiful. I\'ve stopped minding."',
        ],
        responses: {
          kind: "Give him the hour",
          playful: "Fluster him properly",
          bold: "Stay the night talking",
          neutral: "Let the evening be quiet",
        },
      },
      {
        line: "His sleeve brushes yours at the gate. He notices, and for once doesn't apologize, or move away.",
        approach: "Take the long way",
        greeting: '"May I walk you back? ...The long way. If you\'d allow it."',
        responses: {
          kind: "Let the touch linger",
          playful: "Take the longest route",
          bold: "Ask him to be selfish",
          neutral: "Say goodnight at the gate",
        },
      },
      {
        line: '"You left your glove here on purpose, didn\'t you," he says. "You wanted me to read it."',
        approach: "Stay for him",
        greeting: '"Stay. Not for the house. For me. I\'m asking for me."',
        responses: {
          kind: "Tell him he's allowed",
          playful: "Admit you left it on purpose",
          bold: "Hand him something else too",
          neutral: "Let him read it in peace",
        },
      },
    ],
    close: [
      {
        line: "He lets his shoulders drop. It's the first time all day he's allowed that.",
        approach: "Watch him relax",
        greeting:
          '"With you, I can set it all down. Just... let me set it down, tonight."',
        responses: {
          kind: "Help him set down his burden",
          playful: "Make him blush",
          bold: "Ask for him, not the house",
          neutral: "Let him lean, wordlessly",
        },
      },
      {
        line: '"Don\'t tell the others I stopped working," he says, already sitting down.',
        approach: "Tell him to rest",
        greeting:
          "\"I'd carry twice as much if it meant you'd keep coming back.\"",
        responses: {
          kind: "Tell him he's allowed to rest",
          playful: "Talk him into slacking off",
          bold: "Insist he actually rest",
          neutral: "Share the quiet hour",
        },
      },
      {
        line: "He turns your worn keyring over in his hand, reading it, and for once doesn't say sorry.",
        approach: "Take the work from his hands",
        greeting: '"I... I\'ve missed you more than I should admit."',
        responses: {
          kind: "Take the broom from him",
          playful: "Ask what the keyring says",
          bold: "Push past his restraint",
          neutral: "Let him keep reading it",
        },
      },
      {
        line: "For once, he lets someone take care of him. It's you. It's only ever you.",
        approach: "Go sit beside him",
        greeting: '"You are the one thing I never think of as a duty."',
        responses: {
          kind: "Let him be cared for",
          playful: "Tease him for accepting help",
          bold: "Insist on taking care of him",
          neutral: "Keep him quiet company",
        },
      },
      {
        line: '"Stay, and I\'ll tell you ghost stories," he says. "A hundred of them summons a spirit. We\'ve got all night to try."',
        approach: "Stay till the tea goes cold",
        greeting: '"Stay a while longer. Please. The house can spare me."',
        responses: {
          kind: "Stay and listen kindly",
          playful: "Laugh until he does",
          bold: "Dare him to actually scare you",
          neutral: "Stay through every story",
        },
      },
    ],
    bound: [
      {
        line: "He finally lets someone hold him. It takes him a long time to stop apologizing for it.",
        approach: "Hold him",
        greeting: '"Let me put my head here. Just for a moment. ...Thank you."',
        responses: {
          kind: "Tell him he's earned this",
          playful: "Tease him about apologizing",
          bold: "Pull him closer instead",
          neutral: "Let the house go quiet",
        },
      },
      {
        line: "He kisses you at the gate, in full view, and doesn't check who's watching.",
        approach: "Let them see",
        greeting:
          '"I love you. I\'ve loved you since the night of the ghost stories. I should have said sooner."',
        responses: {
          kind: "Say you love him too",
          playful: "Kiss him where they'll see",
          bold: "Kiss him back just as openly",
          neutral: "Let him kiss you, say nothing",
        },
      },
      {
        line: '"I\'ve been performing my whole life," he says. "With you I\'m just yours."',
        approach: "Stay tonight",
        greeting: '"Stay tonight. Don\'t make me be noble about it."',
        responses: {
          kind: "Say it back",
          playful: "Call it an early night",
          bold: "Tell him you're not leaving",
          neutral: "Sit with him in the dark",
        },
      },
      {
        line: "He falls asleep against you before the tea has even gone cold.",
        approach: "Take him to bed",
        greeting:
          '"Come to bed. The house can see to itself. Everything can wait."',
        responses: {
          kind: "Let him put his head down",
          playful: "Steal him from his rounds",
          bold: "Carry him to bed yourself",
          neutral: "Let him sleep",
        },
      },
      {
        line: "The restraint is gone entirely. What replaced it is overwhelming and very quiet.",
        approach: "Tell him it can wait",
        greeting:
          "\"I'd give up the house before I'd give up this. Don't tell them I said so.\"",
        responses: {
          kind: "Reassure him it's safe",
          playful: "Tease him about losing control",
          bold: "Tell him to stop managing you",
          neutral: "Let the quiet hold",
        },
      },
    ],
  },
  // No temperamentDialogue pool: every leftover line was placed onto a
  // dialogue beat's `greeting`.
  // When the old per-tier `responses` pool was folded onto the beats above,
  // two bold labels had no genuine beat match ("Take his hand at the gate",
  // "Say it first") and were dropped rather than force-placed.
  // The /call reveal lines for this character, keyed by the register in
  // WINNER_LINE_BUCKETS (constants/publicEncounters.js). Picked from at random
  // like the dialogue; {user} is the winner's mention and {name} their full
  // name, and the embed's winner line is the only place the reveal names
  // either of them. A register left out here falls back to the generic
  // WINNER_LINES pool.
  winnerLines: {
    new: [
      '"Have we met before?" **{name}** asks {user}, then apologizes for not being sure.',
      "**{name}** turns to {user} and bows, a little too gracefully for the middle of a crowd.",
      '{user} says it first, and **{name}** goes a little pink. "Forgive me. I didn\'t expect that."',
    ],
    warm: [
      "{user} calls out, and **{name}**'s polite smile turns into a real one.",
      "**{name}** tries to cross the crowd to {user} in a straight line, and fails, and keeps trying.",
      "**{name}** had been hoping it was {user}.",
    ],
    spark: [
      "**{name}** hears his name in {user}'s voice and loses his place.",
      '"Sorry, I\'m staring." **{name}** says it to {user} and carries right on staring.',
      "{user} got there first, and **{name}** is quietly undone.",
    ],
    close: [
      "**{name}** stops apologizing mid-sentence when he sees it's {user}.",
      "{user} presses something personal into **{name}**'s hand on purpose. He reads it the way only {user} is allowed to now, and forgets to look sorry.",
      "{user} calls, and whatever **{name}** was carrying gets set down.",
    ],
    bound: [
      "**{name}** goes straight to {user} the moment he hears them.",
      "**{name}** reaches {user} with the soft smile everyone gets, then a different one nobody else does.",
      "{user} says the name, and **{name}** doesn't apologize for a single part of it.",
    ],
  },
};
