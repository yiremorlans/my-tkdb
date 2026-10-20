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
        "**{firstName}**: A small matter of house business. Yours, as it happens, which is why I'd rather it didn't come up in the common room.",
        "Half of Frostheim comes to me in the course of a day. A book that was never returned, a first year who has upset the captain, a dispute nobody else wants to touch. I sort it, they go on their way, and nobody gives it another thought. That's how it ought to be.",
        "You have never once come to me. You meet everything with {favResponse}, deal with your own trouble, and carry on as though there was none. It hasn't escaped my notice that lately there has been rather a lot of it.",
        "So consider this formal notice. Whatever you need, a hand with your work, a word in the right ear, a matter handled quietly, you may bring it to me. You won't need to explain, and you won't owe me anything for it.\n\nMy services are technically spoken for by our king. I assure you he won't miss an hour or two. I'm told I'm rather good at this.",
      ],
      choice: {
        prompt:
          "Well? The next time you're in difficulty, I would much prefer to hear it from you than to happen to overhear it.",
        options: [
          {
            key: "kind",
            label: "Say you'll come to him",
            style: 3,
            close:
              "Good. That's all I wanted to hear.\n\nI'll admit it's rather pleasant, being sought out by name instead of by title. Whatever it turns out to be, you'll find me ready for it.",
          },
          {
            key: "playful",
            label: "Ask what the catch is",
            style: 1,
            close:
              "A catch. Honestly. I offer my services free of charge and you go looking for the poison.\n\nThere's no catch. If it would set your mind at ease, I could invent one. I'm told I'm quite good at that, too.",
          },
          {
            key: "bold",
            label: "Hand him a problem now",
            style: 4,
            close:
              "Already. Well, you certainly don't let an offer go to waste.\n\nSend me the particulars. It will be dealt with by morning, and you may thank me for it in person.",
          },
        ],
      },
      keepsake: {
        emoji: "🛎️",
        line: "{firstName}'s standing offer: bring it to him, whatever it is.",
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
        greeting:
          '"Well, well. Lost, are we? Perhaps I can be of some assistance."',
        responses: {
          kind: ["Say you'd follow his lead", "Admit you're a little lost"],
          playful: ["Ask if he's the map", "Say you're lost on purpose"],
          bold: ["Say you're exploring", "Say you know exactly where"],
          neutral: ["Wait for his verdict", "Nod, say nothing more"],
        },
      },
      {
        line: "He sets his pen down the moment you walk in, pleasant as anything.",
        approach: "Walk over to him",
        greeting:
          '"Well, hello there. I\'ve been expecting you. May I ask for your assistance with something?"',
        responses: {
          kind: ["Offer to help right away", "Ask what he needs"],
          playful: ["Ask how he expected you", "Ask if this is a trap"],
          bold: ["Ask why you, specifically", "Say you're busy, but go on"],
          neutral: ["Ask what the task is", "Hear him out first"],
        },
      },
      {
        line: 'He inclines his head, courteous. "Business in Frostheim? Then you\'ll want our captain."',
        approach: "State your business",
        greeting:
          '"Frostheim is ruled by a king, you see. I\'m no more than a servant."',
        responses: {
          kind: [
            "Ask if the king keeps him busy",
            "Offer to wait for the king",
          ],
          playful: ["Ask to be announced", "Ask for the servant's name"],
          bold: [
            "Call him more than a servant",
            "Say you'd rather talk to him",
          ],
          neutral: ["Say only what's needed", "State your business, briefly"],
        },
      },
      {
        line: "He checks the corridor behind you before he looks at you. Habit, not suspicion.",
        approach: "Let him finish",
        greeting:
          '"This academy has far more than its fair share of loose cannons, wouldn\'t you agree?"',
        responses: {
          kind: ["Ask if he's ever off duty", "Offer to keep watch with him"],
          playful: [
            "Ask if you look suspicious",
            "Ask who's on his watch list",
          ],
          bold: ["Ask if he's the dangerous one", "Ask who he's expecting"],
          neutral: ["Say it's been lively lately", "Glance back down the hall"],
        },
      },
      {
        line: "He mentions, in passing, a problem of yours you never told him about.",
        approach: "Ask how he knew",
        greeting:
          "\"Seems you've become involved in a difficult situation. How do I know? I just happened to overhear, that's all.\"",
        responses: {
          kind: ["Ask if he can help", "Admit it's been rough"],
          playful: ["Ask who he overheard", "Ask how often he overhears"],
          bold: ["Ask what he'd advise", "Ask what else he overheard"],
          neutral: ["Hear what he has to say", "Let the overhearing go"],
        },
      },
    ],
    known: [
      {
        line: "He waves you in mid-errand, the way he does for people who belong here.",
        approach: "Proceed",
        greeting: '"Ah. You again. Proceed, by all means."',
        responses: {
          kind: ["Ask how his errand's going", "Say it's nice to belong"],
          playful: ["Ask if you live here now", "Bow and proceed"],
          bold: ["Say you earned it", "Walk past like it's nothing"],
          neutral: ["Slip in and let him work", "Nod and move on"],
        },
      },
      {
        line: "He doesn't ask your name. He had it the first time and kept it.",
        approach: "Skip the explanation",
        greeting: '"No need to explain yourself this time."',
        responses: {
          kind: ["Ask how his day's been", "Say you're glad he remembers"],
          playful: ["Ask what else he's kept", "Ask if he remembers everyone"],
          bold: ["Say you noticed him notice", "Call it memory, not habit"],
          neutral: ["Skip the explanation", "Let it go unremarked"],
        },
      },
      {
        line: '"You haven\'t slept properly in days," he notes. "Don\'t argue. It shows."',
        approach: "Ask how he can tell",
        greeting:
          '"An orderly schedule is the key to good health. Yours, I\'m afraid, is not orderly."',
        responses: {
          kind: ["Ask if his is orderly", "Promise to sleep tonight"],
          playful: ["Ask how many days, exactly", "Blame the second years"],
          bold: ["Say you'll sleep if he does", "Ask what he'd suggest"],
          neutral: ["Shrug it off", "Let the remark pass"],
        },
      },
      {
        line: "He brings up a party the way you'd mention the weather, then waits.",
        approach: "Ask about the party",
        greeting:
          '"I hope you\'ll join us for a party some time. Our king, naturally, will not be attending."',
        responses: {
          kind: ["Say you'd love to come", "Ask if he gets to enjoy it"],
          playful: [
            "Ask if there's a dress code",
            "Ask why the king won't come",
          ],
          bold: ["Say you'll come if he's there", "Ask why he's inviting you"],
          neutral: ["Ask when it is", "Say you'll think about it"],
        },
      },
      {
        line: "He nods once as you pass, then thinks better of letting you go.",
        approach: "Return the nod",
        greeting:
          "\"You ask fewer questions than you did at first. Either you're learning, or you've simply given up asking.\"",
        responses: {
          kind: ["Say you're still learning", "Say you'll never stop asking"],
          playful: [
            "Ask if that's a compliment",
            "Ask which one he's hoping for",
          ],
          bold: ["Say you ask better ones now", "Ask a question right now"],
          neutral: ["Shrug and keep walking", "Nod back, say nothing"],
        },
      },
      {
        line: "He walks you through Frostheim's schedule like you'll actually need to know it now.",
        approach: "Learn the layout",
        greeting:
          '"If you intend to keep coming, learn the layout. Start here."',
        responses: {
          kind: [
            "Say you plan to keep coming",
            "Say he's kind to take the time",
          ],
          playful: [
            "Pretend to already know it",
            "Ask if there's a quiz later",
          ],
          bold: ["Say you'll figure it out", "Say you'll know it by tomorrow"],
          neutral: ["Take it in, say little", "Nod along at the schedule"],
        },
      },
      {
        line: '"Honestly," he murmurs, in the tone he reserves for people he has stopped needing to warn off.',
        approach: "Ask what that means",
        greeting: '"You\'ve made yourself rather difficult to overlook."',
        responses: {
          kind: ["Ask if he minds the company", "Say you don't mind the tone"],
          playful: ["Ask what you did to earn it", "Mimic the murmur back"],
          bold: [
            "Say you mean to stay that way",
            "Say you never needed warning",
          ],
          neutral: ["Let the murmur pass", "Say nothing, let it stand"],
        },
      },
      {
        line: "He's watching two of Frostheim's own spar in the yard below.",
        approach: "Watch with him",
        greeting:
          "\"Errant and Fuji lack polish, but they've got potential. They're sincere, and that's what counts.\"",
        responses: {
          kind: ["Say they're lucky to have him", "Ask who looks out for him"],
          playful: ["Ask which one he'd bet on", "Ask if he was ever that raw"],
          bold: ["Say he'd beat them both", "Ask what he sees in them"],
          neutral: ["Ask who's winning", "Say they look evenly matched"],
        },
      },
      {
        line: '"Well, well," he says, a little pleased. He was within earshot when you held your own earlier.',
        approach: "Ask what he overheard",
        greeting:
          '"I happened to overhear you holding your own earlier. Well done."',
        responses: {
          kind: ["Say you learned from him", "Say it wasn't easy"],
          playful: [
            "Say you'd have bowed for him",
            "Say you'll charge for the show",
          ],
          bold: ["Say you won't back down", "Say you'd do it again"],
          neutral: ["Say it was nothing", "Let the praise stand"],
        },
      },
      {
        line: "He finds you in the courtyard, which means he came looking.",
        approach: "Ask what the captain wants",
        greeting:
          '"So this is where you\'ve been idling your time away. Our captain is waiting for you."',
        responses: {
          kind: ["Say you'll go right away", "Walk back with him"],
          playful: ["Say you were waiting for him", "Ask if you're in trouble"],
          bold: ["Say Jin can wait a minute", "Ask why he came himself"],
          neutral: ["Follow him back", "Head to Jin's room"],
        },
      },
      {
        line: "He offers you some of his lunch. \"I assure you, it's not poisoned,\" he says, and this time he means it as a joke you're in on.",
        approach: "Eat it anyway",
        greeting:
          '"I tend to eat lightly. Would you care for some? ...You know the rest by now."',
        responses: {
          kind: ["Say you'll split it", "Say it looks good"],
          playful: ["Ask him to taste it first", "Ask what poison it is"],
          bold: ["Eat it without hesitating", "Say you'd know if it were"],
          neutral: ["Eat it, say nothing", "Take the joke in stride"],
        },
      },
      {
        line: "He's halfway out the door with a stack of papers when you catch him.",
        approach: "Catch him on his way out",
        greeting:
          '"Is that everything? I\'m afraid there are several matters I must attend to."',
        responses: {
          kind: ["Say it can wait until later", "Offer to carry some papers"],
          playful: ["Ask what's in the stack", "Ask if the king assigned them"],
          bold: ["Say it'll only take a minute", "Walk alongside him anyway"],
          neutral: ["Say that's everything", "Let him go"],
        },
      },
      {
        line: "\"Don't repeat that,\" he says, already knowing you won't.",
        approach: "Note he didn't need to ask",
        greeting: ['"This conversation never happened. Understand?"'],
        responses: {
          kind: ["Promise it stays with you", "Say his secrets are safe"],
          playful: ["Ask what never happened", "Swear on the king's crown"],
          bold: ["Say your word is enough", "Say it's already forgotten"],
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
          kind: ["Ask if he's had a quiet day", "Ask how he's been keeping"],
          playful: ["Ask what softened him", "Ask if you're the reason"],
          bold: [
            "Say you'll keep coming, then",
            "Say you'll be near more often",
          ],
          neutral: ["Nod a hello", "Ask after his day only"],
        },
      },
      {
        line: "He finishes his sentence, then gives you his whole attention. That's rare.",
        approach: "Interrupt him anyway",
        greeting: '"There are worse interruptions than you."',
        responses: {
          kind: ["Tell him what's on your mind", "Ask what he was working on"],
          playful: ["Interrupt him again", "Ask if you earned that"],
          bold: ["Say you're worth it", "Make it worth his while"],
          neutral: ["Interrupt, then go quiet", "Wait until he's finished"],
        },
      },
      {
        line: '"You\'re on time," he says, which from him is close to a compliment.',
        approach: "Arrive on time",
        greeting: '"You\'re consistent. I respect consistency."',
        responses: {
          kind: [
            "Say his time matters to you",
            "Say he's worth being early for",
          ],
          playful: ["Act smug about the compliment", "Ask if he timed you"],
          bold: ["Say you'll always be on time", "Ask for the full compliment"],
          neutral: ["Accept the near-compliment", "Nod and get started"],
        },
      },
      {
        line: "He shifts to make room without ever acknowledging that he did.",
        approach: "Walk up to him",
        greeting: '"Well, then. How have you been? And the truth, this time."',
        responses: {
          kind: ["Ask how he's doing today", "Sit in the space he made"],
          playful: ["Ask if there's room for you", "Call it lucky timing"],
          bold: ["Sit closer than he planned", "Stay longer than usual"],
          neutral: ["Take the space, say nothing", "Say a quick hello"],
        },
      },
      {
        line: "The report in his hands stops being urgent the moment you speak.",
        approach: "Ask what he's working on",
        greeting:
          '"I\'ve adjusted my schedule. Purely a matter of efficiency, I assure you."',
        responses: {
          kind: [
            "Ask if the report can wait",
            "Say you'll wait while he works",
          ],
          playful: ["Ask if it was ever urgent", "Offer to come back later"],
          bold: ["Say you'll keep him a while", "Ask for his full attention"],
          neutral: [
            "Let the report stay closed",
            "Ask about the report anyway",
          ],
        },
      },
      {
        line: "He pours a second cup of tea without asking whether you wanted one. You did.",
        approach: "Accept the poured cup",
        greeting:
          "\"I can tell at a glance when you're in need of a cup. Drink it while it's hot.\"",
        responses: {
          kind: ["Drink it while it's hot", "Say the tea is perfect"],
          playful: [
            "Ask if he always assumes right",
            "Ask if he read your mind",
          ],
          bold: ["Pour him one in return", "Ask him to sit and drink too"],
          neutral: ["Take the cup without a word", "Ask what blend it is"],
        },
      },
      {
        line: 'The chessboard is set up between you. "Sit. I\'ll go easy. Somewhat."',
        // A game he's sure to win: volleying the banter lands, earnest effort doesn't.
        mood: true,
        approach: "Sit for a game",
        greeting:
          '"Excellent. I\'ll show you how to win. Against opponents other than myself, of course."',
        responses: {
          kind: ["Say you'd like to learn", "Ask him to show you the trick"],
          playful: ["Ask how easy is 'somewhat'", "Play for bragging rights"],
          bold: ["Say you'll win one day", "Move first without asking"],
          neutral: ["Sit, say nothing, play", "Take the white pieces"],
        },
      },
      {
        line: '"Honestly." He\'s pinching the bridge of his nose beneath the monocle. "The second years have been making quite the racket this morning."',
        approach: "Ask who's to blame",
        greeting:
          '"Fuji, predictably. Something about a leaked cafeteria menu. Sit. I could use one sensible voice this morning."',
        responses: {
          kind: ["Offer to quiet them down", "Ask if he's had his tea"],
          playful: [
            "Ask who's in trouble first",
            "Ask if Jin slept through it",
          ],
          bold: ["Say you'll handle them", "Bring him a cup of tea"],
          neutral: ["Sit and keep quiet", "Hand him a cup of tea"],
        },
      },
      {
        line: "It's late and he's still at the desk, working through Frostheim's paperwork. He glances up. \"You should be asleep.\"",
        approach: "Offer to help him finish",
        greeting:
          '"Good health is the greatest treasure, you know. ...Very well. Sort those by date, and not one page more."',
        responses: {
          kind: ["Take a pile off his desk", "Tell him to rest too"],
          playful: ["Say you'll go when he does", "Say you're sleepwalking"],
          bold: ["Say he's worth the lost sleep", "Say you'll stay till it's done"],
          neutral: ["Help without talking", "Work until he stops"],
        },
      },
      {
        line: "\"Honestly. If he'd just take action, everything would be resolved instantaneously.\" He sighs at a door down the corridor. Jin's door.",
        approach: "Ask what Jin's avoiding",
        greeting:
          '"Our king prefers to rule from his room. I\'ve learned to work around the door."',
        responses: {
          kind: ["Say Frostheim's in good hands", "Ask if he's carrying it alone"],
          playful: ["Ask if Jin's still asleep", "Ask if the king takes visitors"],
          bold: ["Say Jin will come around", "Say you'll wait it out too"],
          neutral: ["Glance at Jin's door", "Ask how long he's waited"],
        },
      },
      {
        line: '"Look at you, you\'re trembling." He\'s in front of you before you\'ve come to a stop. "What happened?"',
        approach: "Tell him about it",
        greeting:
          '"You must have had quite a frightening encounter. You poor thing. Sit down. I\'ll see to the rest."',
        responses: {
          kind: ["Let him fuss over you", "Say you're glad he's here"],
          playful: ["Blame the cold", "Say you should see the anomaly"],
          bold: ["Tell him exactly what happened", "Ask him to come look"],
          neutral: ["Sit where he says", "Catch your breath first"],
        },
      },
      {
        line: "You ask him something you should probably already know. He doesn't sigh, and he doesn't check the time.",
        approach: "Admit you don't know",
        greeting:
          '"Inexperience is not a crime. The crime is choosing to remain ignorant. Now. From the beginning."',
        responses: {
          kind: ["Ask him to walk you through", "Say you'll take notes"],
          playful: ["Ask if you're a lost cause", "Ask how he learned it all"],
          bold: ["Ask for the hard version", "Say you'll teach him something"],
          neutral: ["Listen to him explain", "Pay attention"],
        },
      },
      {
        line: "You find him out back of the Vagastrom garage, jacket off, sleeves rolled. He doesn't look surprised you found him.",
        // Off duty and out of the uniform: banter lands, earnest care doesn't.
        mood: true,
        approach: "Ask why he's out here",
        greeting:
          '"I was Vagastrom once, you know. Some habits don\'t transfer."',
        responses: {
          kind: ["Say it suits him out here", "Say you never saw him here"],
          playful: ["Ask if he knew you'd come", "Say he almost looks the part"],
          bold: ["Roll up your sleeves too", "Ask to stay out here too"],
          neutral: ["Lean on the wall beside him", "Let him keep his reasons"],
        },
      },
      {
        line: '"You\'ve been asking around about something," he says mildly, and hands you a folded page. "I happened to overhear."',
        approach: "Take the folded page",
        greeting: '"Names and times. Where I got them needn\'t concern you."',
        responses: {
          kind: ["Ask how he finds the time", "Ask what it cost him"],
          playful: ["Ask who he overheard", "Ask if he overhears you often"],
          bold: ["Say you'll put it to use", "Say you'd have found it"],
          neutral: ["Read the page", "Pocket it for later"],
        },
      },
      {
        line: 'He falls into step beside you in the hallway. "You\'re fatigued. You may insist otherwise. You may even believe it."',
        approach: "Insist you're fine",
        greeting:
          '"I can tell at a glance. Take the afternoon. I\'ll inform whoever needs to know."',
        responses: {
          kind: ["Admit he's right", "Promise to slow down"],
          playful: ["Ask how bad you look", "Say you'll nap in his office"],
          bold: ["Say you'll rest if he does", "Say he can walk you back"],
          neutral: ["Match his stride", "Head back to your room"],
        },
      },
      {
        line: 'You walk past without seeing him. His voice follows you, amused. "Ignoring me, are you?"',
        approach: "Turn back to him",
        greeting:
          "\"You've certainly got guts. I'll assume it was an accident. This time.\"",
        responses: {
          kind: ["Admit you were lost in thought", "Say you'd never ignore him"],
          playful: ["Blame a very good daydream", "Swear it was nothing personal"],
          bold: ["Say he has your attention now", "Ask if he missed you"],
          neutral: ["Say hello this time", "Blink back to the present"],
        },
      },
      {
        line: "He watches you haul a box across the hall, then takes it off you without a word. It seems to weigh nothing to him.",
        // His canon brute strength on show: teasing it lands, earnest care doesn't.
        mood: true,
        approach: "Let him take the box",
        greeting:
          '"Please don\'t overexert yourself. There are many people here who need you in one piece."',
        responses: {
          kind: ["Promise to be more mindful", "Hold the door for him"],
          playful: ["Ask if he lifts for fun", "Ask if he could carry you too"],
          bold: ["Grab the other end anyway", "Grab the next box yourself"],
          neutral: ["Point where it goes", "Walk ahead of him"],
        },
      },
      {
        line: '"No need to look so wary." He holds out an envelope sealed with Frostheim\'s crest. "I\'ve nothing but the noblest of intentions."',
        approach: "Open the envelope",
        greeting:
          '"An invitation. Frostheim\'s evening. I took the liberty of adding your name myself."',
        responses: {
          kind: ["Say it's an honor", "Take it with both hands"],
          playful: ["Ask about his real intentions", "Ask if it's a summons"],
          bold: ["Say you hoped for less noble", "Open it in front of him"],
          neutral: ["Read what's inside", "Tuck it away"],
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
  // The /call reveal lines for this character, keyed by the register in
  // WINNER_LINE_BUCKETS (constants/publicEncounters.js). Picked from at random
  // like the dialogue; {user} is the winner's mention and {name} their full
  // name, and the embed's winner line is the only place the reveal names
  // either of them. A register left out here falls back to the generic
  // WINNER_LINES pool.
  winnerLines: {
    new: [
      {
        line: '"Well, well." **{name}** turns to {user} with a courtesy that gives away nothing.',
        responses: {
          kind: "Say you hoped to find him",
          playful: 'Say "well, well" right back',
          bold: "Say you're not easy to read",
        },
      },
      {
        line: '{user} names him, and **{name}** files it somewhere, smiling. "How resourceful."',
        responses: {
          kind: "Say you wanted to meet him",
          playful: "Ask what he's filing away",
          bold: "Say he's not hard to find",
        },
      },
      {
        line: '"Perhaps I can be of some assistance?" **{name}** asks {user}, as though he hadn\'t already overheard they were looking for him.',
        responses: {
          kind: "Say you'd love some help",
          playful: "Ask how much he overheard",
          bold: "Say he already knows",
        },
      },
      {
        line: '**{name}** turns to {user}, already smiling. "Ah, you must be new. Is there something I can do for you?"',
        responses: {
          kind: "Say you'd be glad of a guide",
          playful: "Ask how he could tell",
          bold: "Ask what he'd recommend",
        },
      },
    ],
    known: [
      {
        line: '"Ah. You again." **{name}** turns to {user}. "Proceed, by all means."',
        responses: {
          kind: "Ask if it's a bad time",
          playful: "Ask if you need a permit",
          bold: "Skip the pleasantries",
        },
      },
      {
        line: "**{name}** greets {user} by name before they've finished calling his. He makes a point of remembering.",
        responses: {
          kind: "Say it's nice to be remembered",
          playful: "Ask if he keeps a list",
          bold: "Ask what else he remembers",
        },
      },
      {
        line: '"No need to explain yourself this time." **{name}** gives {user} a moment he could have spent elsewhere.',
        responses: {
          kind: "Say you're glad he made time",
          playful: "Explain yourself anyway",
          bold: "Ask what changed his mind",
        },
      },
    ],
    warm: [
      {
        line: '"Honestly." **{name}** was two steps from a clean escape, and {user} caught him anyway.',
        responses: {
          kind: "Offer to keep watch for him",
          playful: "Ask to be his accomplice",
          bold: "Block his escape route",
        },
      },
      {
        line: "{user} calls out, and **{name}** gives them his whole attention.",
        responses: {
          kind: "Ask how he's holding up",
          playful: "Ask if Jin can spare him",
          bold: "Keep his attention on you",
        },
      },
      {
        line: "**{name}** adjusts his monocle, then decides {user} is worth being late for.",
        responses: {
          kind: "Say you won't keep him long",
          playful: "Tease him for running late",
          bold: "Tell him to stay a while",
        },
      },
    ],
    spark: [
      {
        line: '"Shouting my name across half the campus. You\'ve certainly got guts." **{name}** looks delighted with {user}.',
        responses: {
          kind: "Say you wanted to see him",
          playful: "Shout it again",
          bold: "Say he's worth shouting for",
        },
      },
      {
        line: "{user} calls out a hello, and something behind **{name}**'s composure gives, briefly.",
        responses: {
          kind: "Pretend you didn't notice",
          playful: "Say his name again",
          bold: "Say you saw it slip",
        },
      },
      {
        line: "**{name}** was en route to the **{house}** briefing. He is now walking {user}'s way instead.",
        responses: {
          kind: "Say you'll walk him there",
          playful: "Ask if the briefing knows",
          bold: "Say he's late now",
        },
      },
    ],
    close: [
      {
        line: '"This conversation never happened," **{name}** murmurs, already steering {user} out of earshot.',
        responses: {
          kind: "Go where he leads",
          playful: "Ask which conversation",
          bold: "Lead him somewhere quieter",
        },
      },
      {
        line: "**{name}** hears {user}, and the servant's mask comes off between one step and the next.",
        responses: {
          kind: "Say you like him like this",
          playful: "Ask where the mask goes",
          bold: "Ask him to leave it off",
        },
      },
      {
        line: "{user} calls, and **{name}**'s next appointment quietly stops mattering.",
        responses: {
          kind: "Say you'll walk him over after",
          playful: "Ask who he's standing up",
          bold: "Say they can wait",
        },
      },
    ],
    bound: [
      {
        line: '"I stopped weighing you up a long while ago," **{name}** tells {user}, taking their hand in the open.',
        responses: {
          kind: "Hold his hand back",
          playful: "Ask what the verdict was",
          bold: "Say you never weighed him",
        },
      },
      {
        line: "**{name}** hands the **{house}** dispatch to a passing first-year. {user} called; the matter is settled.",
        responses: {
          kind: "Say he can rest easy now",
          playful: "Ask if that's allowed",
          bold: "Say the matter's settled",
        },
      },
      {
        line: "{user} calls his name, and **{name}** clears his entire schedule.",
        responses: {
          kind: "Say he deserves the day",
          playful: "Ask if Jin approved",
          bold: "Book the whole day",
        },
      },
    ],
  },
};
