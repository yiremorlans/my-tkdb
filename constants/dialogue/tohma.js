export default {
  // The level-up DMs (docs/bond-scene-dms.md). Tohma is never off-balance and
  // never quite off-duty, so the intimacy is in what he lets slip on purpose:
  // each scene is a piece of information he chose to hand you, and the last one
  // is the first thing he has ever wanted for himself rather than for the house.
  bondScenes: {
    acquaintance: {
      beats: [
        "**{firstName}**: Hello. I don't suppose you've got a moment?\n\nI'd ordinarily say this in person, but the captain keeps me occupied by day, and some things are better said where nobody happens to overhear.",
        "I make it a point to know a little about everyone who comes through this house. You will find that unnerving, and you would be right to.\n\nWhat I have on you, after {timesMet} occasions, is remarkably thin. You say the same things about people whether or not they're in the room. Do you know how rare that is, in a building where I learn most of what I know by overhearing?\n\nSo this is not a file being opened. This is me putting the pen down, which I do rather less often.",
      ],
      choice: {
        prompt:
          "Perhaps you could humor me, and ask me something you would not under typical circumstances.",
        options: [
          {
            key: "kind",
            label: "Ask if he ever rests",
            style: 3,
            close:
              "Honestly. Of all the things you might have asked.\n\nNo. Not in some years. You are the first person to inquire, and I find I do not have a prepared answer, which is unusual for me.",
          },
          {
            key: "playful",
            label: "Ask what's in his file",
            style: 1,
            close:
              "A great deal, and none of it flattering. You shall never see a page of it.\n\nWell, perhaps *a* page. Ask me again when I am less busy.",
          },
          {
            key: "bold",
            label: "Ask what he really wrote",
            style: 4,
            close:
              "*The reply is slower than any of the others.*\n\nYou want to know what is written under your name. Naturally you do.\n\nYou will not see it. Not because it is unflattering, it is not, but because it is the one page in that file I did not write for the house. I wrote it for me.\n\nGood night.",
          },
        ],
      },
      keepsake: {
        emoji: "🫖",
        line: "A conversation that officially never happened.",
      },
    },

    friend: {
      beats: [
        "**{firstName}**: A word about the last mission, before it becomes an official report.",
        "After every mission, I take the report up to the captain's room, and more often than not you come with me. Jin gives his verdict from his chair, I give the details, and you hand the details back to me with {favResponse}. Not to him. To me. I noticed after the second debrief and told myself it was nothing. It has happened enough times since that pretending costs more effort than admitting it.\n\nHe has never said a word about it. He would sooner set fire to his own paperwork than say so. But I have served that man long enough to know when something has landed, and this has landed more than once. I am telling you because somebody in that room ought to be honest, and it is evidently not going to be him.",
      ],
      choice: {
        prompt:
          "Well? I have just handed you a good deal more honesty than my position allows. I should like to know what you intend to do with it.",
        options: [
          {
            key: "kind",
            label: "Ask if this troubles him",
            style: 3,
            close:
              "*A pause, longer than his usual.*\n\nTroubled is not the word I would use. Aware, perhaps, and uncertain what to do with the awareness. He would not thank me for admitting even that much, so let us agree I did not.\n\nYou look concerned enough for both of us. Do stop, it rather undoes the point of my restraint.",
          },
          {
            key: "playful",
            label: "Tease him about noticing",
            style: 1,
            close:
              "Honestly. I file everything, it is rather the job description. I would have noticed this even if I had wanted not to, which, for the record, I did try.\n\nYou have made that considerably harder. I hope you are pleased with yourself.",
          },
          {
            key: "bold",
            label: "Say you can't help it",
            style: 4,
            close:
              "*He goes quiet, the kind of quiet that from him counts as a full confession.*\n\nNo. I don't imagine you can. I find I am not half as troubled by that as I ought to be, given whose favor I appear to be stealing.\n\nI shall have to think about what that means. Do not ask me to think aloud about it tonight.",
          },
        ],
      },
      keepsake: {
        emoji: "📋",
        line: "The line in his report about you that he decided not to file.",
      },
    },

    closeFriend: {
      beats: [
        "**{firstName}**: Come to the second-floor landing tomorrow at eleven. Bring nothing and tell no one. I am aware how that reads.",
        "It is not a mission and you are not in trouble. It is a window.\n\nThere is a spot on that landing where, at eleven, the light comes through the east glass and lies across the floor in a particular way for about nine minutes. Then it is gone until the next clear day.",
        "I have been standing in it alone for two years and telling nobody about it, because the moment a thing like that is known about it becomes a place people go, and then it is not that any more.\n\nYou may consider that I have just handed over the only thing in this building that is mine. I would rather you did not make a great deal of it. I would rather you came.",
      ],
      choice: {
        prompt:
          "Say yes or no. I shall be perfectly composed either way; I am always perfectly composed.",
        options: [
          {
            key: "kind",
            label: "Tell him you'll be there",
            style: 3,
            close:
              "Good.\n\n*One word, and then nothing for the rest of the night, which from a man who writes in paragraphs is close to a shout.*\n\n*He is on the landing at ten to. He does not mention having been early and neither do you.*",
          },
          {
            key: "playful",
            label: "Ask if this is a date",
            style: 1,
            close:
              "Honestly.\n\n*A pause. A longer one than the joke warrants.*\n\nIt is nine minutes of light on a floor. Call it whatever you find useful. I shall be there at eleven either way.",
          },
          {
            key: "bold",
            label: "Ask why you get to know",
            style: 4,
            close:
              "Because it stopped being enough on my own, *he writes, plainly, with none of the arrangement he usually puts around a sentence.*\n\nThere. That is the honest answer and I shall deny having given it. Eleven o'clock.",
          },
        ],
      },
      keepsake: {
        emoji: "🪟",
        line: "Nine minutes of east light on a landing nobody else knows about.",
      },
    },

    confidant: {
      beats: [
        "**{firstName}**: You will have heard the rumor about how our king came to be short of a friend. I would like you to hear the rest of it from me rather than from the version that is going around.",
        "They are not wrong that I benefited. They are not wrong that I was in a position to have arranged a good deal of it. What they have wrong is the part in between, where I am supposed to have actually done the arranging, and that is the part nobody has ever troubled to check.\n\nThose two facts have sat beside one another for two years and been enough for everybody. I have let them, because a house runs better on a vice-captain people are slightly afraid of. That is the whole strategy. It has worked beautifully, and it has cost me every friendship I might otherwise have had here.",
        "I am not asking you to believe me. I am telling you what happened and then leaving it with you, which is the single most dangerous thing I have done since I arrived.\n\nYou may do anything at all with it. That is rather the point of giving it to you.",
      ],
      choice: {
        prompt:
          "So. What is your verdict? I find I am unable to predict it, which is novel and not entirely pleasant.",
        options: [
          {
            key: "kind",
            label: "Say you believe him",
            style: 3,
            close:
              "*There is no reply for a very long time.*\n\nYou should not, *he writes.* On the evidence you have, you should not.\n\n*Then:* Thank you. I have been carrying that for two years and it turns out one only has to put it down once.",
          },
          {
            key: "playful",
            label: "Say you'll hold it over him",
            style: 1,
            close:
              "Do, *he says, and means it.* Please do. It will be an enormous relief to owe somebody something for once instead of the reverse.\n\nWell, well. Look what you have made of me.",
          },
          {
            key: "bold",
            label: "Tell him to stop shielding",
            style: 4,
            close:
              "I cannot, *he writes at once. Then, after a moment:*\n\nI do not know how. I was made to be useful before I was made to be anything else, and I have never once been asked to be a person instead.\n\nYou are asking. I have noticed. Give me some time with it.",
          },
        ],
      },
      keepsake: {
        emoji: "📁",
        line: "The truth he'd let the whole house get wrong for two years.",
      },
    },

    devoted: {
      beats: [
        "*You find the tea outside your door before the message arrives. It is exactly how you take it, which you have never told him.*\n\n**{firstName}**: You did not sleep last night. Do not ask how I know. Drink that.",
        "I have made a study of the small ways people here come apart, so that I can put them back before anyone important notices. It is my actual function in this house, whatever the title says.\n\nI have caught myself doing it for you for some months now, and doing it badly, because I keep wanting to be seen doing it. That is not how the work is meant to go. The work is meant to be invisible.",
        "I stood outside your door for rather longer than the delivery required. I have decided to tell you that instead of letting you assume the tea appeared by itself.\n\nHonestly. Years of being unreadable, undone by a cup going cold in a corridor.",
      ],
      choice: {
        prompt: "Say nothing kind. I am not equipped for it at this hour.",
        options: [
          {
            key: "kind",
            label: "Say something kind anyway",
            style: 3,
            close:
              "...Well, well.\n\n*The next message takes four minutes.*\n\nI am going to sit down. Do not tell anybody that a sentence did that. Say it again tomorrow, when I have had some warning.",
          },
          {
            key: "playful",
            label: "Ask how he takes his",
            style: 1,
            close:
              "Badly. Standing up, at the wrong hour, usually cold.\n\nIf you are offering, I am at the landing most nights after one. I have never said that to a single person in this building.",
          },
          {
            key: "bold",
            label: "Tell him to come in and sit",
            style: 4,
            close:
              "*He does, and he is careful about it, and then somewhere in the second hour he stops being careful and falls asleep upright on your couch mid-sentence: the composed, unreadable vice-captain of Frostheim, out cold with his monocle in his hand.*\n\n*He wakes at five, appalled, and stays another hour anyway.*",
          },
        ],
      },
      keepsake: {
        emoji: "☕",
        line: "A cup made exactly right by someone you never told.",
      },
    },

    soulbound: {
      beats: [
        "**{firstName}**: I am going to be direct, which I am told I never am, and which is a reputation I have worked rather hard for.",
        "I have spent my life being the second man in every room. It suits me. I am better placed there, I see more from there, and I have never once wanted the chair at the front.\n\nI have wanted precisely one thing for myself in all that time, and I have been managing it the way I manage everything else: quietly, at a distance, and with a contingency in place for when it ends.",
        "{timesMet} occasions. I have the number because of course I have the number.\n\nOn every one of them, you have walked into a room where I was being useful to somebody, and some entirely unhelpful part of me has thought: ah. There. That is the one I would like to be useless in front of.",
        "So. I love you.\n\nI have no arrangement around that sentence and nothing to trade for it, and I have not left myself an exit, which you may take as the measure of how seriously I mean it.\n\nThis conversation, unlike every other one, did happen. I should like it on the record.",
      ],
      choice: {
        prompt:
          "Take your time. I am extremely good at waiting and extremely poor at hoping, so do not mind either.",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close:
              "*For once there is no clever thing at all.*\n\n...Come to the landing, *he writes.* Now. It is dark and there is no light on the floor and I do not care in the least.\n\n*He is already there. He does not say anything when you arrive. He simply takes your hands, both of them, and stands there holding on in the dark like a man who has finally set something down.*",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close:
              "Naturally. It would be a poor sort of declaration that came with terms attached.\n\nI shall carry on exactly as I have. The tea will still arrive. I shall still know when you have not slept. None of that was ever a bid, whatever it looked like from where you were standing.\n\nAnd you will find me on the landing at eleven, on clear days, for as long as you like. I am, as I said, extremely good at waiting.",
          },
        ],
      },
      keepsake: {
        emoji: "✒️",
        line: "The one conversation he refused to deny having had.",
      },
    },
  },
  dialogue: {
    new: [
      {
        line: 'Calm as still water, he tilts his head. "You\'re new around here."',
        approach: "Confirm it",
        greeting: '"Well, well. Lost, are we? Perhaps I can be of some assistance."',
        responses: {
          kind: ["Accept his help gladly", "Admit you're a little lost"],
          playful: ["Answer far too casually", "Say you're lost on purpose"],
          bold: ["Hold your ground calmly", "Say you know exactly where"],
          neutral: ["Wait for his verdict", "Nod, say nothing more"],
        },
      },
      {
        line: "He notes your arrival, files it somewhere, and returns to what he was doing.",
        approach: "Don't interrupt him",
        greeting:
          '"No need to be nervous. I\'ve nothing but the noblest of intentions."',
        responses: {
          kind: ["Wait until he's free", "Say you'll be quick"],
          playful: ["Test his patience", "Ask about the noble intentions"],
          bold: ["Give him a straight answer", "Say you're not nervous"],
          neutral: ["Answer plainly, move on", "Wait by the door"],
        },
      },
      {
        line: 'He inclines his head, courteous. "Business in Frostheim? I serve the one who runs it."',
        approach: "State your business",
        greeting:
          '"Well, well. Frostheim is ruled by a king, you see. I\'m no more than a servant."',
        responses: {
          kind: ["Respect his discipline", "Ask to meet the king politely"],
          playful: ["Tease the servant framing", "Ask if the king is in"],
          bold: ["Call him more than a servant", "Say you'd rather talk to him"],
          neutral: ["Say only what's needed", "State your business, briefly"],
        },
      },
      {
        line: "He checks the corridor behind you before he looks at you. Habit, not suspicion.",
        approach: "Let him finish",
        greeting:
          '"This academy has far more than its fair share of loose cannons, wouldn\'t you agree?"',
        responses: {
          kind: ["Reassure him you're no threat", "Say you came alone"],
          playful: ["Try to make him crack", "Ask if you count as a cannon"],
          bold: ["Hold your own", "Ask who he's expecting"],
          neutral: ["Let him finish checking", "Wait until he's satisfied"],
        },
      },
      {
        line: "Nothing about his expression moves. Something behind it is definitely taking notes.",
        approach: "Stand where he can see you",
        greeting:
          '"What do you mean? I lend a sympathetic ear to those in need; that\'s all."',
        responses: {
          kind: ["Put him at ease", "Say you could use an ear"],
          playful: ["Ask what he's noting", "Ask if that's all, truly"],
          bold: ["Refuse the once-over", "Say you don't buy it"],
          neutral: ["Observe him carefully", "Stay where he can see you"],
        },
      },
    ],
    known: [
      {
        line: "You've moved from unknown to accounted for. From him, that's a promotion.",
        approach: "Proceed",
        greeting: '"Ah. You again. Proceed, by all means."',
        responses: {
          kind: ["Say you're glad to be known", "Thank him for keeping track"],
          playful: ["Ask what the promotion pays", "Act pleased with yourself"],
          bold: ["Say you earned it", "Walk past like it's nothing"],
          neutral: ["Proceed without comment", "Nod and move on"],
        },
      },
      {
        line: "He doesn't ask your name. He had it the first time and kept it.",
        approach: "Skip the explanation",
        greeting: '"No need to explain yourself this time."',
        responses: {
          kind: ["Say that means something", "Thank him for remembering"],
          playful: ["Ask what else he's kept", "Tease him for filing you"],
          bold: ["Say you noticed him notice", "Call it memory, not habit"],
          neutral: ["Skip the explanation", "Let it go unremarked"],
        },
      },
      {
        line: '"Four days since last time," he notes. "Yes, I keep track. It\'s rather the job."',
        approach: "Ask why he keeps track",
        greeting:
          '"An orderly schedule is the key to good health. Yours, I\'m afraid, is not orderly."',
        responses: {
          kind: ["Say you didn't realize", "Thank him for the attention"],
          playful: ["Ask if he has a spreadsheet", "Tease him about counting"],
          bold: ["Ask why he really tracks it", "Call the job excuse thin"],
          neutral: [
            "Shrug, it's just timing",
            "Let the tracking go unremarked",
          ],
        },
      },
      {
        line: "The once-over is shorter now. He reached his conclusion about you some time ago.",
        approach: "Ask what he decided",
        greeting:
          "\"You've been consistent. I've adjusted my expectations accordingly.\"",
        responses: {
          kind: ["Ask if the conclusion was kind", "Hope it's a good one"],
          playful: ["Demand to hear the verdict", "Guess what he decided"],
          bold: [
            "Ask what he decided outright",
            "Say it doesn't matter to you",
          ],
          neutral: ["Let him keep his conclusion", "Don't ask, let it be"],
        },
      },
      {
        line: "He nods once as you pass. It isn't nothing.",
        approach: "Return the nod",
        greeting:
          "\"You ask fewer questions than you did at first. Either you're learning, or you've simply given up asking.\"",
        responses: {
          kind: ["Return the nod warmly", "Say the nod means a lot"],
          playful: ["Ask if that's a compliment", "Nod back extra big"],
          bold: ["Call the nod out loud", "Demand more than a nod"],
          neutral: ["Return the nod, say nothing", "Nod back, keep walking"],
        },
      },
      {
        line: "He walks you through Frostheim's schedule like you'll actually need to know it now.",
        approach: "Learn the layout",
        greeting:
          '"If you intend to keep coming, learn the layout. Start here."',
        responses: {
          kind: [
            "Thank him for the orientation",
            "Listen carefully to the layout",
          ],
          playful: ["Pretend to already know it", "Ask if there's a map"],
          bold: ["Say you'll figure it out", "Skip ahead of his explanation"],
          neutral: ["Take it in, say little", "Nod along at the schedule"],
        },
      },
      {
        line: '"Honestly," he murmurs, in the tone he reserves for people he has stopped needing to warn off.',
        approach: "Ask what that means",
        greeting:
          '"Honestly. You\'ve made yourself rather difficult to overlook."',
        responses: {
          kind: ["Ask gently what he means", "Say you don't mind the tone"],
          playful: ["Ask if that's a compliment", "Mimic the murmur back"],
          bold: ["Ask him to say it plainly", "Call out the reserved tone"],
          neutral: ["Let the murmur pass", "Say nothing, let it stand"],
        },
      },
      {
        line: "He pours a second cup without being asked, then pretends the extra cup was already there.",
        approach: "Take the second cup",
        greeting:
          '"Well, well. It seems I poured one too many. How fortunate that you arrived."',
        responses: {
          kind: ["Thank him for the tea", "Accept the cup gladly"],
          playful: ["Call out the pretending", "Ask who the extra cup was for"],
          bold: ["Take the cup, no thanks needed", "Point out the obvious lie"],
          neutral: ["Take the cup, say nothing", "Drink it without comment"],
        },
      },
      {
        line: '"Well, well," he says, and there is nothing sly left in it, only something close to fondness.',
        approach: "Ask what's changed",
        greeting:
          '"I overheard you defending yourself rather well earlier. I approve, quietly."',
        responses: {
          kind: ["Ask what's changed for him", "Say you noticed the warmth"],
          playful: ["Tease him about softening", "Ask if that's fondness"],
          bold: ["Name the fondness outright", "Call him out on the shift"],
          neutral: ["Let the moment pass quietly", "Say nothing, let it be"],
        },
      },
      {
        line: "He always seems to know when your classes let out. He calls it scheduling. It isn't.",
        approach: "Call it what it is",
        greeting:
          '"I\'ve started setting aside the schedule changes that concern you specifically. Draw no conclusions from that."',
        responses: {
          kind: ["Say you like being tracked", "Thank him for the thought"],
          playful: [
            "Call it what it really is",
            "Tease him about the scheduling",
          ],
          bold: ["Ask him to just admit it", "Call out the excuse"],
          neutral: ["Let him call it scheduling", "Don't push the point"],
        },
      },
      {
        line: "\"I assure you, it's not poisoned,\" he says, and this time he means it as a joke you're in on.",
        approach: "Drink it anyway",
        greeting:
          '"I tend to eat lightly. Would you care for some? ...You know the rest by now."',
        responses: {
          kind: ["Thank him for sharing", "Take a bite, trusting him"],
          playful: ["Ask him to taste it first", "Say it's a little bland"],
          bold: ["Drink it without hesitating", "Say you'd know if it were"],
          neutral: ["Drink it, say nothing", "Take the joke in stride"],
        },
      },
      {
        line: "A report sits unread on his desk. He'd rather talk to you than finish it.",
        approach: "Ask what's in it",
        greeting:
          '"It will keep. Reports rarely improve with haste. Conversation, on the other hand..."',
        responses: {
          kind: ["Tell him the report can wait", "Offer to help him finish it"],
          playful: [
            "Ask what's in the report",
            "Tease him for procrastinating",
          ],
          bold: ["Demand to know what's in it", "Tell him to finish it first"],
          neutral: ["Let the report sit", "Say nothing about the report"],
        },
      },
      {
        line: "\"Don't repeat that,\" he says, already knowing you won't.",
        approach: "Note he didn't need to ask",
        greeting: [
          '"Should you ever require discretion, you know where to find me."',
          '"Our king slept through the morning again. You needn\'t relay that to anyone."',
        ],
        responses: {
          kind: ["Promise it stays with you", "Reassure him you'll keep it"],
          playful: ["Threaten to repeat it anyway", "Ask what's in it for you"],
          bold: ["Say your word is enough", "Ask why he says it at all"],
          neutral: [
            "Say nothing, keep it quiet",
            "Let the trust go unremarked",
          ],
        },
      },
    ],
    warm: [
      {
        line: "His usual calm softens into something warmer whenever you're near.",
        approach: "Check in with him",
        greeting: '"Well, well. You again. I find I don\'t mind it."',
        responses: {
          kind: "Say you don't mind either",
          playful: "Ask what softened him",
          bold: "Name the softening outright",
          neutral: "Check in, say little",
        },
      },
      {
        line: "He finishes his sentence, then gives you his whole attention. That's rare.",
        approach: "Interrupt him anyway",
        greeting: '"There are worse interruptions than you."',
        responses: {
          kind: "Thank him for the attention",
          playful: "Interrupt him again",
          bold: "Say you're worth it",
          neutral: "Interrupt, then go quiet",
        },
      },
      {
        line: '"You\'re on time," he says, which from him is close to a compliment.',
        approach: "Arrive on time",
        greeting: '"You\'re consistent. I respect consistency."',
        responses: {
          kind: "Say you tried to be on time",
          playful: "Act smug about the compliment",
          bold: "Ask for the real compliment",
          neutral: "Take the compliment plainly",
        },
      },
      {
        line: "He shifts to make room without ever acknowledging that he did.",
        approach: "Walk up to him",
        greeting: '"Well, then. How have you been? And the truth, this time."',
        responses: {
          kind: "Thank him for the room",
          playful: "Ask if he planned the space",
          bold: "Give him the honest answer",
          neutral: "Take the space, say nothing",
        },
      },
      {
        line: "The report in his hands stops being urgent the moment you speak.",
        approach: "Ask what he's working on",
        greeting: "\"I've adjusted my schedule. Don't read into it.\"",
        responses: {
          kind: "Ask if the report can wait",
          playful: "Tease him about the schedule",
          bold: "Say you're the reason, plainly",
          neutral: "Let the report stay closed",
        },
      },
      {
        line: "He pours a second cup of tea without asking whether you wanted one. You did.",
        approach: "Take the second cup",
        greeting:
          '"I can tell at a glance when you\'re in need of a cup. Drink it while it\'s hot."',
        responses: {
          kind: "Thank him for the tea",
          playful: "Ask if he always assumes right",
          bold: "Take the cup, no thanks needed",
          neutral: "Take the cup without a word",
        },
      },
      {
        line: 'The chessboard is set up between you. "Sit. I\'ll go easy. Somewhat."',
        approach: "Sit for a game",
        greeting:
          '"Excellent. I\'ll show you how to win. Against opponents other than myself, of course."',
        responses: {
          kind: "Sit down for the game",
          playful: "Warn him not to go easy",
          bold: "Demand he play for real",
          neutral: "Sit, say nothing, play",
        },
      },
    ],
    spark: [
      {
        line: "The composure holds. It is very obviously costing him something.",
        approach: "Notice what it costs him",
        greeting:
          "\"My focus is not what it was. You're the reason. I've stopped trying to do anything about it.\"",
        responses: {
          kind: "Tell him it's mutual",
          playful: "Break a rule on purpose",
          bold: "Ask what it's costing him",
          neutral: "Let him recompose",
        },
      },
      {
        line: "He straightens something on your uniform with unnecessary precision.",
        approach: "Hold still",
        greeting:
          '"Hold still. This will take a moment and I intend to take it."',
        responses: {
          kind: "Be still for him",
          playful: "Ask if he does this often",
          bold: "Say plainly what you want",
          neutral: "Keep a proper distance",
        },
      },
      {
        line: '"I\'ve turned this over more than once," he says. "The answer keeps coming back the same."',
        approach: "State what you want",
        greeting:
          '"State plainly what you want. I\'ll tell you whether I want the same."',
        responses: {
          kind: "Let him take his moment",
          playful: "Ask what he's concluded",
          bold: "Tell him you already know",
          neutral: "Wait for him to decide",
        },
      },
      {
        line: "He stands closer than is proper and does not correct it.",
        approach: "Step past his manners",
        greeting:
          "\"Closer. I'm not going to ask twice, and I'd rather not have to.\"",
        responses: {
          kind: "Let him stay close",
          playful: "Point out the impropriety",
          bold: "Close the last step",
          neutral: "Give him nothing",
        },
      },
      {
        line: '"You\'re a distraction," he states, without any apparent intention of removing it.',
        approach: "Be the distraction",
        greeting:
          '"That look is doing nothing for my concentration and I would like you to keep making it."',
        responses: {
          kind: "Ask if he minds it",
          playful: "Compromise his focus",
          bold: "Tell him to stop holding back",
          neutral: "Let yourself be distracting",
        },
      },
    ],
    close: [
      {
        line: "\"You've become someone I look forward to seeing,\" he says plainly, like it's just a fact.",
        approach: "Say it plainly",
        greeting:
          '"Well, well. I must say your company is preferred. To my surprise."',
        responses: {
          kind: "Tell him he can stand down",
          playful: "Catch him almost smiling",
          bold: "Say you look forward to it too",
          neutral: "Take the words in stride",
        },
      },
      {
        line: "He breaks his own rule about interruptions. For you. Again.",
        approach: "Go to him directly",
        greeting:
          "\"I don't make exceptions. I've made one. Draw your own conclusions.\"",
        responses: {
          kind: "Thank him for the exception",
          playful: "Break his rules with him",
          bold: "Demand the truth from him",
          neutral: "See what he won't say",
        },
      },
      {
        line: '"I had an hour free," he says. He did not have an hour free.',
        approach: "Take the seat beside him",
        greeting: '"I\'ve stopped calling this a coincidence. So should you."',
        responses: {
          kind: "Ask what he's carrying",
          playful: "Call the hour a lie",
          bold: "Ask why he's really here",
          neutral: "Stay until he's finished",
        },
      },
      {
        line: "The composure holds, but his eyes give him away completely.",
        approach: "See what his eyes say",
        greeting:
          '"If something happens, come to me first. Not second. First."',
        responses: {
          kind: "See through his composure",
          playful: "Crack through his mask",
          bold: "Tell him you're staying",
          neutral: "Let his eyes say it instead",
        },
      },
      {
        line: "He tells you the truth without softening it, because you're the one person he doesn't have to.",
        approach: "Tell him the truth",
        greeting:
          '"Say it plainly. I\'d rather hear the truth from you than anything else."',
        responses: {
          kind: "Thank him for the honesty",
          playful: "Ask if it's ever gentle",
          bold: "Meet him without flinching",
          neutral: "Let the silence stand",
        },
      },
    ],
    bound: [
      {
        line: "He states what he wants plainly, and then is exceedingly efficient about it.",
        approach: "Tell him what you want",
        greeting:
          '"Tell me what you want. I\'d rather not have to guess with you."',
        responses: {
          kind: "Say it back plainly",
          playful: "Ask if he's ever spontaneous",
          bold: "Tell him exactly what you want",
          neutral: "Say nothing at all",
        },
      },
      {
        line: "He wakes at his usual hour, looks at you, and elects to be late for the first time.",
        approach: "Let him be late",
        greeting:
          '"I love you. Hardly a complicated thing to work out. It simply took me a while to say it."',
        responses: {
          kind: "Let him be late",
          playful: "Ruin his schedule",
          bold: "Pull him back down",
          neutral: "Let him be late, say nothing",
        },
      },
      {
        line: '"I stopped weighing you up a long while ago," he says. "The matter was settled."',
        approach: "Say it back",
        greeting:
          '"You are the one disruption to my order that I have no intention of resolving."',
        responses: {
          kind: "Tell him it goes both ways",
          playful: "Make him lose the thread",
          bold: "Say you weighed him up too",
          neutral: "Let the settled matter rest",
        },
      },
      {
        line: "His hands are precise everywhere. It is deeply unfair.",
        approach: "Call it unfair",
        greeting: "\"Closer. That's better. That's... yes.\"",
        responses: {
          kind: "Take his precise hands",
          playful: "Be deliberately imprecise",
          bold: "Be the disorder",
          neutral: "Lie still",
        },
      },
      {
        line: "He holds you the way he does everything else: deliberately, and completely.",
        approach: "Stay the morning",
        greeting:
          "\"Stay. I've cleared the morning. I've never cleared a morning.\"",
        responses: {
          kind: "Melt into how he holds you",
          playful: "Ask if he's ever careless",
          bold: "Hold him just as deliberately",
          neutral: "Let him keep the hour",
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
            line: "He checks his watch, then the dark stairwell behind you, and decides not to remark on the hour.",
            approach: "Slip past curfew with him",
          },
          {
            line: '"You\'re past curfew," he notes. "So am I. We\'ll call it even."',
            approach: "Slip past curfew with him",
          },
          {
            line: "The balcony's empty except for him. After dark, he says, is the only time it's quiet enough to think.",
            approach: "Take the empty balcony",
          },
          {
            line: '"It\'s after curfew. I\'m not going to report you," he says. "Stand where the light reaches, though."',
            approach: "Take the empty balcony",
          },
        ],
        known: [
          {
            line: '"I\'ll sign you back in if anyone asks," he says, already turning a blind eye.',
            approach: "Let him sign you in",
          },
          {
            line: "He's less starched after dark. The clipboard is nowhere in sight.",
            approach: "Let him sign you in",
          },
          {
            line: '"The balcony\'s better at night," he says. "No one to perform for."',
            approach: "Let him sign you in",
          },
        ],
        warm: [
          {
            line: '"Nobody comes up here this late. That\'s rather the point of it."',
            approach: "Keep him company up here",
          },
        ],
      },
    },
  ],
  // No temperamentDialogue pool: every leftover line was placed onto a
  // dialogue beat's `greeting` (docs/dialogue-greeting-pairing.md).
  // No top-level `responses` pool: every dialogue[tier] beat (new/known/warm/
  // spark/close/bound) now carries bespoke responses for all four types (see
  // dialogue above), making the old per-tier pools fully unreachable — same
  // end state as yuri.js/benkei.js/jin.js/kaito.js/lucas.js.
  // The /call reveal lines for this character, keyed by the register in
  // WINNER_LINE_BUCKETS (constants/publicEncounters.js). Picked from at random
  // like the dialogue; {user} is the winner's mention and {name} their full
  // name, and the embed's winner line is the only place the reveal names
  // either of them. A register left out here falls back to the generic
  // WINNER_LINES pool.
  winnerLines: {
    new: [
      '"Well, well." **{name}** turns to {user} with a courtesy that gives away nothing.',
      '{user} names him, and **{name}** files it somewhere, smiling. "How resourceful."',
      '"Perhaps I can be of some assistance?" **{name}** asks {user}, as though he hadn\'t already overheard they were looking for him.',
    ],
    warm: [
      '"Honestly." **{name}** was two steps from a clean escape, and {user} caught him anyway.',
      "{user} calls out, and **{name}** gives them his whole attention.",
      "**{name}** adjusts his monocle, then decides {user} is worth being late for.",
    ],
    spark: [
      '"Shouting my name across half the campus. You\'ve certainly got guts." **{name}** looks delighted with {user}.',
      "{user} says the name, and something behind **{name}**'s composure gives, briefly.",
      "**{name}** was en route to the **{house}** briefing. He is now walking {user}'s way instead.",
    ],
    close: [
      '"This conversation never happened," **{name}** murmurs, already steering {user} out of earshot.',
      "**{name}** hears {user}, and the servant's mask comes off between one step and the next.",
      "{user} calls, and **{name}**'s next appointment quietly stops mattering.",
    ],
    bound: [
      '"I stopped weighing you up a long while ago," **{name}** tells {user}, taking their hand in the open.',
      "**{name}** hands the **{house}** dispatch to a passing first-year. {user} called; the matter is settled.",
      "{user} says the name, and **{name}** clears his entire schedule.",
    ],
  },
};
