export default {
  // The level-up DMs (docs/bond-scene-dms.md). Lucas writes the way he speaks:
  // warm, direct, contractions and plain British idiom, courteous without being
  // stiff. He apologises lightly and moves on. The intimacy is him gradually
  // dropping the good manners about how much he needs you, and the "out of
  // sorts, like I'm not myself" thing under the courtesy edging closer each time.
  bondScenes: {
    acquaintance: {
      beats: [
        "**{firstName}**: Evening! Lucas here. Kaito gave me your number, then made me promise to tell you he said hello first. So: Kaito says hello.",
        "About today in the east corridor. Two Frostheim third-years were trying to intimidate a first-year, and I was on my way over. You got there first, and you'd calmed the whole thing down before I'd even reached you. No raised voices, nobody made a fool of, and everyone walked away.\n\nI'm usually the one stepping in. Watching you settle it like that was genuinely impressive.",
        "So here's my proposal. I train in the yard at six every morning. We've crossed paths {timesMet} times now, and you've turned up early to every one of them.\n\nI keep a training log, and the partners column has been empty since Emrys. I'd like to put a name in it.",
      ],
      choice: {
        prompt: "Six sharp. I'll bring biscuits. Is that a yes?",
        options: [
          {
            key: "kind",
            label: "Say yes, you'll be there",
            style: 3,
            close:
              "Thank you. I'm very glad you said yes.\n\nMake sure you get a proper night's sleep first, all right? I'll see you at six. Good night!",
          },
          {
            key: "playful",
            label: "Ask if six is a threat",
            style: 1,
            close:
              "It's a kindness, I promise. Emrys started at five.\n\nI'm usually there by ten to, and I'd be very surprised to find anyone there before me. Then again, you've already surprised me once today.",
          },
          {
            key: "bold",
            label: "Say you hope he keeps up",
            style: 4,
            close:
              "Then I'd better not fall behind on the first morning. That would be rather embarrassing.\n\nI'm glad, truly. A partner who pushes me is exactly what I've been missing.",
          },
        ],
      },
      keepsake: {
        emoji: "📓",
        line: "The first name in the partners column of his training log since Emrys.",
      },
    },

    friend: {
      beats: [
        "**{firstName}**: Urgent question, and I need a straight answer, because Kaito has stopped giving me those.",
        "Is a \"pajama party\" some sort of important event? He's been insisting for a week that we invite you to one. He says it's a sacred Tokyo tradition. He also said that about ramen, and he was right about ramen, so I can't rule it out.",
        "I'm asking you because you're the one I always ask. You answer me with {favResponse} every time, whether it's pajama parties or which of two teachers is wrong about a mock anomaly.\n\nEveryone else either laughs or looks at me like a boy from Emrys ought to know already. You just explain it. I don't think you realize how much easier this place got the day I worked out I could come to you.",
      ],
      choice: {
        prompt: "So. Pajama party. Real, or is Kaito having me on?",
        options: [
          {
            key: "kind",
            label: "Say it's real, and you'll come",
            style: 3,
            close:
              "Right. Then I'll tell him yes before he talks himself out of asking.\n\n*A minute later:* He's replied with a whole row of crying emojis. I'm choosing to read that as happy.",
          },
          {
            key: "playful",
            label: "Say he's being had, completely",
            style: 1,
            close:
              "I knew it. I knew it the moment he mentioned a mandatory pillow fight.\n\n...I'm still going, obviously. He'd be crushed. Will you come and be had with me?",
          },
          {
            key: "bold",
            label: "Say he can always ask you",
            style: 4,
            close:
              "I know. That's rather the point of this message.\n\nI've got a list, actually. It's longer than I'd like to admit. Seppuku's near the top. So is whether spirits really come out at twilight, which I'd like to test, with you, some evening soon.",
          },
        ],
      },
      keepsake: {
        emoji: "📝",
        line: "The list of questions he saves for you, pajama parties first.",
      },
    },

    closeFriend: {
      beats: [
        "**{firstName}**: I'm going to tell you something I haven't told anyone here, and I'm going to do it quickly, before the sense comes back to me.",
        "I have a brother. Had. No. Have. I won't use the other word, and I haven't used it since the day he disappeared.\n\nHis name is Nox. He's the reason I came here, and the reason I train past the point where it helps, and the reason I'm poor company after a mission. I've let everyone think it's duty. It isn't. It's a search, and it isn't going well.",
        "I shouldn't have put that on you. I've been told I'm hopeless at keeping things to myself, and there I've gone and proved it again.\n\nBut I didn't tell Jin, and I didn't tell Kaito, and I've had plenty of chances. I told you. I wanted you to know I noticed myself choosing.",
      ],
      choice: {
        prompt:
          "Tell me this hasn't changed how you see me. That's the only thing I want to hear tonight, and I'd rather hear it from you than from anyone.",
        options: [
          {
            key: "kind",
            label: "Tell him you think more",
            style: 3,
            close:
              "*He doesn't answer for a few minutes.*\n\nI'd braced for a few different responses, *he writes.* Not that one. I haven't got anything polite to put after it, which might be the truest thing I've written all night.",
          },
          {
            key: "playful",
            label: "Say he's a terrible liar",
            style: 1,
            close:
              "Catastrophic, *he agrees.* Tohma says I give myself away before I've finished the sentence.\n\nHe means it as a fault. I've decided to take it as a reason to keep company only with people I don't mind seeing through me. There's currently one.",
          },
          {
            key: "bold",
            label: "Ask to help him look",
            style: 4,
            close:
              "No. *It comes back straight away, and then, very slowly, undoes itself:*\n\n...I meant no because it's dangerous, and because I've already lost one person to being certain I could manage on my own.\n\nCome to the gymnasium tomorrow. I'll show you what I've got. I've never shown anyone what I've got.",
          },
        ],
      },
      keepsake: {
        emoji: "🖼️",
        line: "A photograph of two boys, one of them still missing.",
      },
    },

    confidant: {
      beats: [
        "*It arrives at an hour when he's normally training, which is a sort of message on its own.*\n\n**{firstName}**: I'm not well tonight. I don't mean ill. I mean the other thing.",
        "There's a version of me I keep at arm's length, and I don't always manage it. It came very close tonight, and I've been sat on the floor of my room since, waiting for it to settle back down.\n\nI've never written that to anyone. I've practised saying it out loud a few times and my voice won't do it.",
        "I'm not afraid of it hurting me. I'm afraid of what it would do with the fact that I love...\n\n*The message stops there. Another one comes straight after.*\n\nThat it would use what I care about. That's all I meant. I should stop writing at this hour.",
      ],
      choice: {
        prompt:
          "If this is too much, tell me and I'll stop. I promise I won't hold it against you. Part of me is even hoping you will.",
        options: [
          {
            key: "kind",
            label: "Tell him to keep going",
            style: 3,
            close:
              "...All right.\n\n*He writes until nearly four, and none of it is polite, and he doesn't once say sorry for the length of it. At the end he writes:* I'm still on the floor. But I'm not on it alone, which turns out to be a difference you can make by text.",
          },
          {
            key: "playful",
            label: "Say he didn't finish that word",
            style: 1,
            close:
              "*A long silence.*\n\nI didn't, *he agrees.* I know you noticed. I'm relying on your discretion, and I'm well aware I'm the last person in this house with any right to ask for it.",
          },
          {
            key: "bold",
            label: "Ask him to open the door",
            style: 4,
            close:
              "You shouldn't be in this corridor tonight.\n\n*The lock turns anyway. He's grey in the face and shaking, and he holds himself very straight in the doorway out of pure habit, and when you take his hand he shuts his eyes as though it hurts.*\n\n> Don't go,\n\n*he says, which he hasn't said to anyone since he lost his brother.*\n\n> I'm sorry. Don't go.",
          },
        ],
      },
      keepsake: {
        emoji: "🗝️",
        line: "The sound of a lock he has never once turned for anyone else.",
      },
    },

    devoted: {
      beats: [
        "**{firstName}**: You're unhurt. I've had it confirmed three times, through three different people, and I still couldn't stop myself writing to hear it once more from you.",
        "I wasn't there. That's the whole of it. There was something in the west wing and I was two floors away being useful to someone else, and I've been stood outside your door a while now without knocking, because it occurred to me I might not have the right to.",
        "I was always told that strength carries a duty. I've believed it since I was a boy, and I was rather proud of how well I carried the idea of it.\n\nIt's stopped being an idea. That's what I came to say. It has a name now, and the name is yours, and I don't know what to do with a duty that keeps me awake.",
      ],
      choice: {
        prompt:
          "May I come in? I'll go if you say no, and I'll be completely all right about it.",
        options: [
          {
            key: "kind",
            label: "Tell him to come in",
            style: 3,
            close:
              "*He comes in and doesn't sit down for a long while, and then he does, on the floor with his back against the side of your bed, the way people sit when they mean to stay.*\n\n> Can I stay until it's light,\n\n*he says.*\n\n> I won't be any trouble. I'd just like to hear you breathing.",
          },
          {
            key: "playful",
            label: "Ask how long he's been there",
            style: 1,
            close:
              "...Forty minutes.\n\nFifty. I've been rehearsing. Every version was worse than just standing here, which I expect you could have told me for free.",
          },
          {
            key: "bold",
            label: "Open the door yourself",
            style: 4,
            close:
              "*You open it while he's still typing, and he actually startles, this boy who's never once been caught out by anything.*\n\n*He looks at you for a moment with all the courtesy gone out of him, and then he pulls you in and holds on far too hard, one hand at the back of your head, saying nothing at all.*",
          },
        ],
      },
      keepsake: {
        emoji: "🛏️",
        line: "The night he sat on the floor just to hear you breathing.",
      },
    },

    soulbound: {
      beats: [
        "**{firstName}**: I've written this out on paper first. I'm copying it across so I don't lose my nerve halfway and turn it into something safer.",
        "I came here to find my brother and to make myself into an instrument, in that order, and I was quite content with that. I hadn't planned on a third thing.\n\nThere's been a third thing since about the second time we met, and I've been calling it duty, and gratitude, and what you owe a friend, and every one of those was a lie I told myself very carefully.",
        "{timesMet} times. I know the number because I never stopped keeping the log. I only stopped calling it training.\n\nEvery page of it is you being kind to me with nothing in it for you, and me deciding not to look straight at what I felt, in case it made me useless.",
        "It hasn't made me useless. It's made me a great deal more careful about coming home.\n\nI love you. I've loved you longer than is decent, and I've been terribly well-mannered about it, and I'd like, very much, to stop pretending otherwise.\n\nThere. It's copied across. I didn't lose my nerve after all.",
      ],
      choice: {
        prompt:
          "Whatever you answer, I'll be glad I wrote it. Please be honest. I couldn't bear kindness here.",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close:
              "*There's no reply, and then there's a knock, not the careful one he's used every other time, but a proper knock, and him on the other side of it with the paper still in his hand.*\n\n> Say it where I can hear it,\n\n*he says.*\n\n> Please. I've imagined it, and I want to know how far off I was.\n\n*You tell him. He was, he says afterwards with his forehead against yours, nowhere near.*",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close:
              "Of course. Of course, take it. I'm relieved, honestly. I've had to fight for every honest sentence I own, and it would be unfair to hand you this one and start a clock.\n\nI'll be exactly as I was. I'll walk you back from the east wing, and I'll be unbearable about whether you've eaten, and none of it was ever leverage.\n\n*And he is, and it never was, and he doesn't ask again, not once, until you do.*",
          },
        ],
      },
      keepsake: {
        emoji: "📄",
        line: "The sheet of paper he copied it from, folded twice.",
      },
    },
  },
  dialogue: {
    new: [
      {
        line: "He catches your eye straightaway and breaks into an easy, ready smile.",
        approach: "Return his smile",
        greeting:
          "\"Oh, hello. I'm still finding my own way round here, if I'm honest. Are you lost too?\"",
        responses: {
          kind: ["Offer to show him around", "Say you're still learning too"],
          playful: [
            "Say you're hopelessly lost",
            "Suggest you get lost together",
          ],
          bold: ["Ask where he's headed", "Lead the way yourself"],
          neutral: ["Smile back, say little", "Stay silent"],
        },
      },
      {
        line: "He holds the door without a word, like it's simply the natural thing to do.",
        approach: "Thank him as you pass",
        greeting:
          "\"Need a hand with something? I don't know much yet, but I'll help however I can.\"",
        responses: {
          kind: ["Thank him for the door", "Say you're fine, but thanks"],
          playful: ["Curtsy on the way through", "Ask if he holds every door"],
          bold: [
            "Say you'll get the next one",
            "Hold the door for him instead",
          ],
          neutral: ["Walk through, say nothing", "Nod your thanks"],
        },
      },
      {
        line: "He's checking his gear over with far more care than the hour warrants. A mission, maybe.",
        approach: "Let him notice you",
        greeting:
          "\"You're here 10 minutes early. I'm impressed. Let's check the details for today's mission.\"",
        responses: {
          kind: ["Offer to help him prep", "Say you're glad to join"],
          playful: [
            "Ask if it's a secret mission",
            "Ask if you get a gold star",
          ],
          bold: ["Demand to know the mission", "Say you're ready to go now"],
          neutral: ["Wait beside him", "Go over the details quietly"],
        },
      },
      {
        line: '"Careful," he says, catching your arm before you trip over the loose flagstone.',
        approach: "Steady yourself on him",
        greeting:
          "\"We haven't been introduced properly. Lucas Errant. Pleasure's mine.\"",
        responses: {
          kind: ["Thank him for catching you", "Introduce yourself warmly"],
          playful: ["Say you tripped on purpose", "Ask if he catches everyone"],
          bold: ["Tell him you can handle it", "Shake his hand firmly"],
          neutral: ["Nod and keep walking", "Give your name, nothing more"],
        },
      },
      {
        line: "He's already stepped between a first-year and a pack of older students, calm as if it's nothing.",
        approach: "Back him up",
        greeting:
          '"Thank you. They\'ll think twice now there are two of us. Stay close, though."',
        responses: {
          kind: ["Thank him for stepping in", "Check on the first-year"],
          playful: ["Peek around him at the pack", "Ask if he does this daily"],
          bold: ["Step in front of him", "Stand shoulder to shoulder"],
          neutral: ["Stay behind him quietly", "Stay close, like he asked"],
        },
      },
    ],
    known: [
      {
        line: "He spots you across the courtyard and starts walking before he's finished raising a hand in greeting.",
        approach: "Meet him halfway",
        greeting: [
          "\"Ah, it's you. Good. I'd hoped it would be.\"",
          '"I remembered your name. Of course I did."',
        ],
        responses: {
          kind: ["Wave back just as eagerly", "Say you're glad to see him"],
          playful: ["Race him across the courtyard", "Tease him for hurrying"],
          bold: ["Meet him more than halfway", "Close the distance yourself"],
          neutral: ["Meet him halfway, say little", "Wait for him to arrive"],
        },
      },
      {
        line: "He's watching Kaito from across the room, some private worry crossing his face before he catches you looking.",
        approach: "Ask what's wrong",
        greeting:
          '"I invited Kaito to train with me. He turned me down, but I mean to keep asking. He\'s stronger than he thinks."',
        responses: {
          kind: ["Ask if Kaito's all right", "Offer to check on Kaito too"],
          playful: ["Catch him staring", "Ask what he's plotting"],
          bold: ["Ask him outright what's wrong", "Push past the deflection"],
          neutral: ["Let him keep his worry", "Say nothing, let it pass"],
        },
      },
      {
        line: '"You\'re early," he notes, openly impressed. "Good. We can go over the details."',
        approach: "Say you wanted to be on time",
        greeting:
          "\"Right, then. Kaito's running late, as ever, so it's just us for now.\"",
        responses: {
          kind: ["Say punctuality matters to you", "Thank him for noticing"],
          playful: ["Act smug about being early", "Ask if he timed you"],
          bold: ["Say you're always this good", "Challenge him to keep up"],
          neutral: ["Get straight to the details", "Nod and move to business"],
        },
      },
      {
        line: "He's moved to the seat with the worse view so you can have the better one.",
        approach: "Accept the better spot",
        greeting:
          "\"You've grown easier to talk to than I expected. I hope the feeling's mutual.\"",
        responses: {
          kind: ["Thank him for the seat", "Offer to switch back"],
          playful: ["Tease him for the chivalry", "Ask if he planned it"],
          bold: ["Take the seat like it's owed", "Insist on switching back"],
          neutral: ["Take the seat, say nothing", "Sit without comment"],
        },
      },
      {
        line: '"You\'re stronger than you were a month ago," he tells Kaito, steady and certain. "That\'s not nothing." Then he catches your eye, like you\'re in on it.',
        approach: "Nod in agreement",
        greeting:
          '"Kaito says you\'re stubborn. I happen to think stubborn suits you rather well."',
        responses: {
          kind: ["Agree Kaito's improved", "Say he's a good influence"],
          playful: ["Ask if you're in on what", "Wink back conspiratorially"],
          bold: ["Say you noticed the look", "Call him out for including you"],
          neutral: ["Nod along, say nothing", "Let the moment pass quietly"],
        },
      },
      {
        line: "He's drilling forms alone in the training yard, sweat-soaked and relentless, until he looks up and finds you watching.",
        approach: "Hold his gaze",
        greeting:
          '"Do I find it tough training every day? Those with strength have a duty to use it for others. I\'m perfectly all right."',
        responses: {
          kind: ["Tell him to take a break", "Say he's worked hard enough"],
          playful: ["Ask if he's showing off", "Applaud the performance"],
          bold: ["Tell him to stop overdoing it", "Match him rep for rep"],
          neutral: ["Watch without interrupting", "Wait for him to finish"],
        },
      },
      {
        line: '"Allow me," he says, and has your bag before you can protest.',
        approach: "Let him carry it",
        greeting:
          "\"There. It's no trouble at all, honestly. You've enough to carry as it is.\"",
        responses: {
          kind: ["Let him carry it gladly", "Thank him for the help"],
          playful: ["Make him carry more", "Ask if chivalry ever rests"],
          bold: ["Take the bag back yourself", "Say you don't need saving"],
          neutral: ["Let him carry it, say nothing", "Walk on without comment"],
        },
      },
      {
        line: "He asks if you've eaten today in a tone that expects the honest answer, not the polite one.",
        approach: "Tell him the truth",
        greeting:
          '"Breakfast. Did you actually have any? You lose muscle mass on an empty stomach, you know."',
        responses: {
          kind: ["Answer him honestly", "Thank him for asking"],
          playful: [
            "Try to dodge the question",
            "Ask if he's checking up on you",
          ],
          bold: ["Admit you skipped a meal", "Challenge him to guess"],
          neutral: ["Give a short, plain answer", "Answer and move on"],
        },
      },
      {
        line: "He's brought an extra biscuit. He doesn't say who for.",
        approach: "Take the extra biscuit",
        greeting:
          '"I kept a biscuit aside for you. In case you\'d skipped breakfast again."',
        responses: {
          kind: ["Thank him for the biscuit", "Say he didn't have to"],
          playful: ["Ask who it's really for", "Steal a second one"],
          bold: ["Take it without asking", "Call it out as thoughtful"],
          neutral: ["Take it, say nothing", "Eat it without comment"],
        },
      },
      {
        line: '"I do think it\'s important to think carefully," he says, then admits he came looking for you anyway.',
        approach: "Ask what changed his mind",
        greeting:
          "\"You've a habit of turning up right when I need the company. I don't mind it one bit.\"",
        responses: {
          kind: ["Say you're glad he came", "Thank him for looking"],
          playful: [
            "Point out the contradiction",
            "Tease him about overthinking",
          ],
          bold: ["Ask what he really came for", "Call out the excuse"],
          neutral: ["Let the moment go unremarked", "Take it in stride"],
        },
      },
      {
        line: "He's pacing outside the captain's room, rehearsing under his breath how he'll ask Jin for the assignment.",
        approach: "Offer to go in with him",
        greeting:
          '"Ah. You caught me. I\'d rather ask Jin directly than wait to be handed something safe."',
        responses: {
          kind: ["Offer him quiet encouragement", "Reassure him he'll do fine"],
          playful: ["Tease him about rehearsing", "Do a practice run with him"],
          bold: ["Tell him to just go in", "March in there with him"],
          neutral: ["Wait with him quietly", "Let him rehearse in peace"],
        },
      },
      {
        line: "He's still hunched over demon subjugation texts well past the library's closing time, and the cold look is back in his eyes.",
        approach: "Ask what he's looking for",
        greeting:
          '"Any record of demons I can find. Someone I care about may depend on it."',
        responses: {
          kind: ["Ask gently what he's chasing", "Offer to help him search"],
          playful: ["Tease him for staying so late", "Guess what he's hiding"],
          bold: ["Ask him outright what it is", "Push him to explain"],
          neutral: ["Let him keep his research", "Leave him to it quietly"],
        },
      },
      {
        line: "He notices you swaying on your feet before you do, and shifts closer so his shoulder's there before you ask.",
        approach: "Rest against him",
        greeting:
          "\"I'll walk you back, if you'll allow it. Just until the path's better lit.\"",
        responses: {
          kind: ["Lean into the offered support", "Thank him for noticing"],
          playful: [
            "Tease him for hovering again",
            "Ask if he's always watching",
          ],
          bold: ["Take his arm without asking", "Say you don't need steadying"],
          neutral: ["Accept the support quietly", "Lean in without a word"],
        },
      },
    ],
    warm: [
      {
        line: "The easy smile turns private more often now, just for you.",
        approach: "Return the small smile",
        greeting: '"You came back. I... was hoping you would."',
        responses: {
          kind: "Say you're glad to be back",
          playful: "Ask what earned the smile",
          bold: "Smile back just as private",
          neutral: "Return the smile quietly",
        },
      },
      {
        line: "He moves a half-step closer than he used to, and pretends he hasn't.",
        approach: "Fall into step with him",
        greeting:
          '"I kept thinking I heard you in the hall. I was wrong, until now."',
        responses: {
          kind: "Fall into step gladly",
          playful: "Ask what he thought he heard",
          bold: "Close the half-step yourself",
          neutral: "Walk beside him, say nothing",
        },
      },
      {
        line: "He's already checking the room for anything that might hurt you. He always does.",
        approach: "Walk up to him",
        greeting: "\"I'm glad you're safe. How have you been?\"",
        responses: {
          kind: "Thank him for the care",
          playful: "Ask what could get past him",
          bold: "Say you watch your own back",
          neutral: "Let him check, say nothing",
        },
      },
      {
        line: '"You look tired," he observes gently. He noticed before you did.',
        approach: "Ask him how he's been",
        greeting:
          '"Sit, please. You look like you\'ve been on your feet all day."',
        responses: {
          kind: "Admit you're a little tired",
          playful: "Ask if he's checking on you",
          bold: "Say he looks tired too",
          neutral: "Sit, say nothing",
        },
      },
      {
        line: "The breezy courtesy is still there. It's just not the whole of him around you anymore.",
        approach: "See past the courtesy",
        greeting: '"May I walk with you? Only if you\'d like."',
        responses: {
          kind: "Walk with him gladly",
          playful: "Ask what's under the courtesy",
          bold: "Say you see past it already",
          neutral: "Walk with him quietly",
        },
      },
    ],
    spark: [
      {
        line: "The politeness has thinned. What shows through it is not gentle at all.",
        approach: "Let the mask slip",
        greeting:
          "\"There's a part of me that isn't gentle. It's very fond of you.\"",
        responses: {
          kind: "Be soft with the harder part",
          playful: "Fluster the polite one",
          bold: "Close the space yourself",
          neutral: "Let the moment pass",
        },
      },
      {
        line: "He takes your hand to check it for injury, and forgets to give it back.",
        approach: "Let him keep your hand",
        greeting: '"May I? ...Thank you. You needn\'t look so surprised."',
        responses: {
          kind: "Let him keep your hand",
          playful: "Ask what he's thinking",
          bold: "Turn your hand into his",
          neutral: "Step back gently",
        },
      },
      {
        line: '"Forgive me," he murmurs, standing far closer than forgiveness requires.',
        approach: "Stand closer than needed",
        greeting: "\"Don't apologize for standing close. Please don't.\"",
        responses: {
          kind: "Tell him you're not afraid",
          playful: "Ask what forgiveness costs",
          bold: "Say yes before he asks",
          neutral: "Say nothing at all",
        },
      },
      {
        line: "He looks at your mouth for exactly a second too long, and knows it.",
        approach: "Say yes",
        greeting: '"Stay near me. I\'d rather not explain why."',
        responses: {
          kind: "Let him look a while longer",
          playful: "Catch him looking",
          bold: "Hold his gaze right back",
          neutral: "Look away first",
        },
      },
      {
        line: '"I\'m not always as harmless as I let people believe," he says evenly. "You should know that."',
        approach: "Trust him anyway",
        greeting: '"You trust me too easily. I\'d like you to keep doing it."',
        responses: {
          kind: "Trust him without hesitation",
          playful: "Ask just how not-harmless",
          bold: "Tell him you like the danger",
          neutral: "Take the risk, say nothing",
        },
      },
    ],
    close: [
      {
        line: '"I don\'t say this to just anyone," he admits plainly, "but I\'m glad you\'re here."',
        approach: "Go to his side",
        greeting:
          '"I\'ve stopped apologizing for wanting you near. Is that all right?"',
        responses: {
          kind: "Let him take care of you",
          playful: "Make him laugh softly",
          bold: "Be bold for him",
          neutral: "Stay silent with him",
        },
      },
      {
        line: "He reaches for your sleeve, stops himself, and then does it anyway.",
        approach: "Take his hand",
        greeting:
          '"I would rather be the one who\'s hurt than watch it happen to you."',
        responses: {
          kind: "Trust his steady strength",
          playful: "Catch him being sweet",
          bold: "Take his hand first",
          neutral: "Let the moment be enough",
        },
      },
      {
        line: "There's something less careful in how he looks at you now. Something honest.",
        approach: "Tell him you're safe",
        greeting: '"You don\'t have to be gentle with me. Not you."',
        responses: {
          kind: "Meet his honesty with your own",
          playful: "Fluster him on purpose",
          bold: "Say it before he can",
          neutral: "Hold the eye contact quietly",
        },
      },
      {
        line: '"Stay where I can see you," he says. It isn\'t a request, quite.',
        approach: "Stay where he can see you",
        greeting: '"Stay close. Just for a while. Please."',
        responses: {
          kind: "Stay exactly where he can see",
          playful: "Test how close he means",
          bold: "Say it isn't a request either",
          neutral: "Stay through the silence",
        },
      },
      {
        line: "He lets the softness show, just for you, and it costs him something to do it.",
        approach: "Let him be soft",
        greeting: '"Your safety means more to me than anything else."',
        responses: {
          kind: "Tell him he can stop",
          playful: "Tease the softness out further",
          bold: "Meet the softness head-on",
          neutral: "Let him have the quiet",
        },
      },
    ],
    bound: [
      {
        line: "The gentleness is still there. It is no longer the whole of him, with you.",
        approach: "Don't be gentle",
        greeting:
          "\"Don't be gentle with me. I'm not made of glass. Not with you.\"",
        responses: {
          kind: "Tell him you're not scared",
          playful: "Refuse to be handled gently",
          bold: "Tell him not to be gentle",
          neutral: "Stay silent beside him",
        },
      },
      {
        line: "He kisses your knuckles, then your wrist, then stops asking permission.",
        approach: "Let him keep going",
        greeting:
          '"I love you. I\'ve said it in my head so often it should be easier aloud."',
        responses: {
          kind: "Say it back softly",
          playful: "Make the polite one blush",
          bold: "Pull him down to you",
          neutral: "Let the night be still",
        },
      },
      {
        line: '"I\'d burn a great deal down for you," he says softly. "I hope that doesn\'t frighten you."',
        approach: "Say it back",
        greeting: "\"Whatever's left of me that isn't kind, it's yours too.\"",
        responses: {
          kind: "Tell him you're not afraid",
          playful: "Ask what's worth burning",
          bold: "Say you'd burn it with him",
          neutral: "Take the declaration quietly",
        },
      },
      {
        line: "He falls asleep with a hand fisted in your shirt, as though you might go.",
        approach: "Let him hold on",
        greeting: '"Closer. I want to feel you breathing."',
        responses: {
          kind: "Stay so he doesn't wake alone",
          playful: "Steal his shirt",
          bold: "Hold on just as tightly",
          neutral: "Let him sleep",
        },
      },
      {
        line: "He touches you like something he has been given and can hardly believe he keeps.",
        approach: "Stay the night",
        greeting:
          '"Stay the night. I\'ve stopped pretending I want anything else."',
        responses: {
          kind: "Hold him through it",
          playful: "Ask if he still doubts it",
          bold: "Tell him to stop doubting it",
          neutral: "Let him hold on, say nothing",
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
            line: "He's doing a slow circuit of the balcony rail, checking the dark below, and only then turns to you.",
            approach: "Fall into step with him",
          },
          {
            line: "The campus lights have come on behind him. He's clearly been out here a while.",
            approach: "Fall into step with him",
          },
          {
            line: '"You\'re out late," he says, not quite a reproach. "I\'ll walk you back when you\'re ready."',
            approach: "Let him walk you back",
          },
          {
            line: '"You shouldn\'t wander alone," he says firmly. "Not here. Not at this hour."',
            approach: "Let him walk you back",
          },
        ],
        known: [
          {
            line: "He falls into step to walk you along the lit path before you can decline the escort.",
            approach: "Accept the escort",
          },
          {
            line: '"I don\'t like this hour for wandering," he admits. "I like that you came to find me in it."',
            approach: "Accept the escort",
          },
          {
            line: '"Curfew\'s soon," he says. "Stay a little. I\'ll make sure you\'re not caught."',
            approach: "Accept the escort",
          },
        ],
        warm: [
          {
            line: "He's saved you the sheltered corner out of the wind. He'd deny having planned it.",
            approach: "Take the sheltered corner",
          },
          {
            line: "The dark makes him less careful with what he says. Not much. Enough to notice.",
            approach: "Take the sheltered corner",
          },
          {
            line: '"The stillness out here is the honest part of my day," he says. "I\'m glad you\'re in it."',
            approach: "Take the sheltered corner",
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
  // end state as yuri.js/benkei.js/jin.js/kaito.js. Two labels had no genuine
  // beat match ("Let him finish the thought", "Refuse to let him take the
  // hit") and were dropped rather than force-placed.
  // The /call reveal lines for this character, keyed by the register in
  // WINNER_LINE_BUCKETS (constants/publicEncounters.js). Picked from at random
  // like the dialogue; {user} is the winner's mention and {name} their full
  // name, and the embed's winner line is the only place the reveal names
  // either of them. A register left out here falls back to the generic
  // WINNER_LINES pool.
  winnerLines: {
    new: [
      "**{name}** turns and apologizes to {user} for not noticing sooner.",
      '"You have me at a disadvantage." **{name}** inclines his head anyway. {user} had it right.',
      "{user} says the name, and **{name}** steps out of the way first and greets them second.",
    ],
    warm: [
      '"I\'d hoped that was you." **{name}** takes whatever {user} is carrying without asking.',
      "{user} calls out, and **{name}**'s careful expression goes entirely soft.",
      "**{name}** had been checking the crowd for hazards. Now he's checking {user} for the same.",
    ],
    spark: [
      "**{name}** hears his name in {user}'s voice and loses count of the drill entirely.",
      '"You shouldn\'t be out here alone." **{name}** falls in beside {user} rather than say the rest of it.',
      "{user} got there first, and **{name}** looks at them a moment too long to be only polite.",
    ],
    close: [
      "**{name}** doesn't ask whether {user} needs anything. He simply stays.",
      '"Please don\'t make that face." **{name}** is smiling. {user} caught him mid-training again.',
      "{user} calls, and **{name}** sets the **{house}** dispatch down without finishing the line.",
    ],
    bound: [
      "\"There's very little I wouldn't set aside for you,\" **{name}** says, only to {user}.",
      "**{name}** kisses {user}'s knuckles with people going past on both sides, and does not apologize for it.",
      "{user} says the name, and every ounce of **{name}**'s restraint goes somewhere else.",
    ],
  },
};
