export default {
  // The level-up DMs (docs/bond-scene-dms.md). Lucas writes the way he speaks —
  // full sentences, courtesy first, apologizing for the space he takes up. The
  // intimacy is him gradually failing to be polite about how much he needs you,
  // and the leashed thing underneath getting closer to the surface each time.
  bondScenes: {
    acquaintance: {
      beats: [
        '**{firstName}**: "Good evening. I hope this is a reasonable hour to write. I confess I checked twice and then wrote anyway, which rather defeats the checking."',
        "\"I wanted to say something properly, and I find I can only manage it in writing, which I suspect says a good deal about me.\"\n\n\"You have been kind to me {timesMet} times now. I do not think you were keeping count. I was. It is a habit: I keep account of kindnesses because I was raised to believe one ought to pay them back, and I have not the first idea how to pay this one.\"",
      ],
      choice: {
        prompt: "\"So I am asking rather clumsily: how might I? Repay it, I mean.\"",
        options: [
          {
            key: "kind",
            label: "Tell him he doesn't owe you",
            style: 3,
            close: "\"That is a very generous answer and I am afraid I shall not accept it.\"\n\nA pause.\n\n\"...I shall accept it. Thank you. I am not accustomed to being let off, and I find it sits strangely and rather well.\"",
          },
          {
            key: "playful",
            label: "Ask for the whole ledger",
            style: 1,
            close: "\"There is no ledger. There is absolutely a ledger. It is in the back of my training notebook and I would sooner you did not see it.\"\n\n\"...It is four pages. Good night.\"",
          },
          {
            key: "bold",
            label: "Tell him to stop counting",
            style: 4,
            close: "The reply is slow in coming.\n\n\"I do not know how to do that,\" he writes at last, and there is no politeness in it at all. \"But I should like to learn, if you would be patient with a very slow student.\"",
          },
        ],
      },
      keepsake: {
        emoji: "📖",
        line: "A page torn out of the back of his training notebook.",
      },
    },

    friend: {
      beats: [
        '**{firstName}**: "May I be improper for a moment? I shall be brief about it."',
        "\"You always answer me with {favResponse}, and I have been turning over why that unsettles me so, when it is plainly a good thing.\"\n\n\"I think it is this. Most people speak to me carefully, as one speaks near something that might go off. They are not wrong to. And you do not do it, and every time you do not do it I feel a little less like a loaded thing and a little more like a person, and I have grown greedy for the sensation.\"",
      ],
      choice: {
        prompt: "\"That was improper. I did warn you. Do go on and say whatever you like in return.\"",
        options: [
          {
            key: "kind",
            label: "Tell him he's just a person",
            style: 3,
            close: "\"You cannot know that.\"\n\nThen, after a long while: \"Forgive me. That was ungracious. What I meant to write was thank you, and that I shall be thinking about it for some days, and that I would rather you did not take it back.\"",
          },
          {
            key: "playful",
            label: "Call that his worst crime yet",
            style: 1,
            close: "\"Dreadful, isn't it. Improper conduct by post.\"\n\n\"Do you know, I believe that is the first time I have made a joke since I arrived here. I shall have to sit down.\"",
          },
          {
            key: "bold",
            label: "Tell him to be greedier",
            style: 4,
            close: "There is a very long pause indeed.\n\n\"You should be careful what you offer me,\" he writes. \"I am not always as well-mannered as I appear, and you keep saying things that make the manners feel like a great deal of trouble for nothing.\"",
          },
        ],
      },
      keepsake: {
        emoji: "🛡️",
        line: "The first joke he'd made since he came to Darkwick.",
      },
    },

    closeFriend: {
      beats: [
        '**{firstName}**: "I am going to tell you something I have told no one here, and I am going to do it quickly before the sense returns to me."',
        "\"I have a brother. Had... no. Have. I refuse the other word and I have refused it for four years.\"\n\n\"His name is Nox. He is the reason I came to this place, and the reason I train past the point where it is useful, and the reason I am poor company after a mission. I have let everyone believe it is duty. It is not duty. It is a search, and it is not going well.\"",
        "\"I ought not to have burdened you with that. I have been told I am hopeless at keeping things to myself and it appears I have proven it again.\"\n\n\"But I did not tell Jin, and I did not tell Kaito, and I have had a great many opportunities. I told you. I should like you to know that I noticed myself choosing.\"",
      ],
      choice: {
        prompt: "\"Say you have not thought less of me. That is all I want, and it is a coward's request.\"",
        options: [
          {
            key: "kind",
            label: "Tell him you think more",
            style: 3,
            close: "He does not answer for some minutes.\n\n\"I had prepared myself for several responses,\" he writes. \"Not that one. I find I have nothing polite to put after it, which may be the truest thing I have written all evening.\"",
          },
          {
            key: "playful",
            label: "Say he's a terrible liar",
            style: 1,
            close: "\"Catastrophic,\" he agrees. \"Tohma tells me my face does the work of a signed confession.\"\n\n\"He means it as a criticism. I have decided to take it as an argument for keeping company only with people I do not mind seeing through me. There is currently one.\"",
          },
          {
            key: "bold",
            label: "Ask to help him look",
            style: 4,
            close: "\"No.\" It comes back instantly, and then, very slowly, undoes itself:\n\n\"...I meant no, because it is dangerous, and because I have already lost one person to my own certainty that I could manage alone.\"\n\n\"Come to the gymnasium tomorrow. I shall show you what I have. I have never shown anybody what I have.\"",
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
        'It arrives at an hour when he is usually training, which is itself a sort of message.\n\n**{firstName}**: "I am not well tonight. I do not mean unwell. I mean the other thing."',
        "\"There is a version of me that I keep at a distance and I do not always manage it. It came very near tonight and I have been sitting on the floor of my room since, waiting for it to go back down.\"\n\n\"I have never written that sentence to anyone. I have practiced saying it aloud a number of times and my voice will not do it.\"",
        "\"I am not frightened of it hurting me. I am frightened of what it would do with the fact that I love...\"\n\nThe message ends there. A second one follows immediately.\n\n\"That it would use what I care for. That is all I meant. I should stop writing at this hour.\"",
      ],
      choice: {
        prompt: "\"Tell me to stop, and I shall. I will not hold it against you. I would rather like to be told.\"",
        options: [
          {
            key: "kind",
            label: "Tell him to keep going",
            style: 3,
            close: "\"...Very well.\"\n\nHe writes until nearly four, and none of it is polite, and he never once apologizes for the length of it. At the end he says: \"I am on the floor still. But I am not on it alone, which is a distinction I did not know could be made by text.\"",
          },
          {
            key: "playful",
            label: "Say he didn't finish that word",
            style: 1,
            close: "A very long silence.\n\n\"I did not,\" he agrees. \"I am aware you noticed. I am counting on your discretion, and I am aware that I am the last person in this house entitled to ask for it.\"",
          },
          {
            key: "bold",
            label: "Ask him to open the door",
            style: 4,
            close: "\"You should not be in this corridor tonight.\"\n\nThe lock turns anyway. He is gray-faced and shaking and holds himself very straight in the doorway out of pure habit, and when you take his hand he closes his eyes as though it hurts.\n\n\"Don't go,\" he says, which in four years he has never said to anybody. \"I am sorry. Don't go.\"",
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
        '**{firstName}**: "You are unhurt. I have confirmed it three times through three people and I am writing to you regardless, which I recognize is excessive."',
        "\"I was not there. That is the whole of it. There was a thing in the west wing and I was two floors away being useful to somebody else, and I have been standing outside your door for some minutes without knocking, because it occurred to me that I have no right to.\"",
        "\"They have always told me that strength carries a duty. I have believed it since I was a boy. It has always been an abstract, and I have always been rather proud of how well I carried the abstract.\"\n\n\"It has stopped being one. That is what I came to say. It has a name now and it is yours, and I do not know what to do with a duty that keeps me awake.\"",
      ],
      choice: {
        prompt: "\"May I come in? I shall go if you say no, and I shall be entirely all right about it.\"",
        options: [
          {
            key: "kind",
            label: "Tell him to come in",
            style: 3,
            close: "He comes in and does not sit down for a long while, and then he does, on the floor with his back against the side of your bed, the way people sit when they intend to stay.\n\n\"Might I stay until it is light,\" he says. \"I shall not be any trouble. I should simply like to hear you breathing.\"",
          },
          {
            key: "playful",
            label: "Ask how long he's been there",
            style: 1,
            close: "\"...Forty minutes.\"\n\nA pause.\n\n\"Fifty. I have been rehearsing. Every version of it was worse than simply standing here, which I imagine you could have told me for nothing.\"",
          },
          {
            key: "bold",
            label: "Open the door yourself",
            style: 4,
            close: "You open it while he is still typing, and he actually startles, this boy who has never once been surprised by anything.\n\nHe looks at you for a moment with all the courtesy gone out of his face, and then he pulls you into him and holds on far too hard, one hand at the back of your head, saying nothing at all.",
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
        '**{firstName}**: "I have written this out on paper first. I am copying it across so that I do not lose my nerve halfway and turn it into something else."',
        "\"I came here to find my brother and to make myself into an instrument, in that order, and I was entirely content with that arrangement. I did not intend for there to be a third thing.\"\n\n\"There has been a third thing since roughly the second time I met you, and I have been calling it duty, and gratitude, and the obligations of a friend, and each of those was a lie I told very carefully to myself.\"",
        "\"{timesMet} times. I know because I did not stop keeping the ledger. I only stopped calling it a ledger.\"\n\n\"Every page of it is you being kind to me when there was nothing in it for you, and me deciding not to look directly at what I felt, in case it made me useless.\"",
        "\"It has not made me useless. It has made me a great deal more careful about coming home.\"\n\n\"I love you. I have loved you for longer than is decent and I have been extremely well-mannered about it, and I find that I am done being well-mannered.\"\n\n\"There. It is copied across. I did not lose my nerve.\"",
      ],
      choice: {
        prompt: "\"Whatever you answer, I shall be glad I wrote it. Please be honest. I could not bear kindness here.\"",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close: "There is no reply, and then there is a knock, not the careful one he has used every other time, but a proper knock, and him on the other side of it with the paper still in his hand.\n\n\"Say it where I can hear it,\" he says. \"Please. I have imagined it and I want to know how far off I was.\"\n\nYou tell him. He was, he says afterwards with his forehead against yours, nowhere near.",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close: "\"Of course. Of course, take it. I am rather relieved, if I am honest. I have had four years to arrive at that sentence and it is unreasonable to hand it to you and start a clock.\"\n\n\"I shall be exactly as I was. I shall walk you back from the east wing and I shall be unbearable about your eating properly, and none of it was ever leverage.\"\n\nAnd he is, and it never was, and he does not ask again, not once, until you do.",
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
      "He studies you for a long moment before offering the faintest nod.",
      "He steps aside to let you pass, and apologizes for having been in the way at all.",
      "He's checking his gear over with far more care than the hour warrants. A mission, maybe.",
      '"Forgive me," he says softly, before you\'ve said anything. "I didn\'t hear you come in."',
      "Everything about him is quiet. That includes whatever he's decided not to say.",
    ],
    known: [
      "He remembers you. The apology for existing comes a little quicker now.",
      "He looks up when you enter now, rather than after.",
      "\"You've been well?\" It's the first question he's asked you unprompted.",
      '"You\'re early," he notes, quietly impressed. "Good. We can go over the details."',
      "The nod has become a nod and half a smile.",
    ],
    warm: [
      "He offers a small, genuine smile now instead of just a nod.",
      "He moves a half-step closer than he used to, and pretends he hasn't.",
      "He's already checking the room for anything that might hurt you. He always does.",
      '"You look tired," he observes gently. He noticed before you did.',
      "The politeness is still there, but it isn't a wall anymore.",
    ],
    spark: [
      "The politeness has thinned. What shows through it is not gentle at all.",
      "He takes your hand to check it for injury, and forgets to give it back.",
      '"Forgive me," he murmurs, standing far closer than forgiveness requires.',
      "He looks at your mouth for exactly a second too long, and knows it.",
      '"I\'m not always as harmless as I let people believe," he says quietly. "You should know that."',
    ],
    close: [
      '"I don\'t say this to just anyone," he admits quietly, "but I\'m glad you\'re here."',
      "He reaches for your sleeve, stops himself, and then does it anyway.",
      "There's something less careful in how he looks at you now. Something honest.",
      '"Stay where I can see you," he says. It isn\'t a request, quite.',
      "He lets the softness show, just for you, and it costs him something to do it.",
    ],
    bound: [
      "The gentleness is still there. It is no longer the whole of him, with you.",
      "He kisses your knuckles, then your wrist, then stops asking permission.",
      '"I\'d burn a great deal down for you," he says softly. "I hope that doesn\'t frighten you."',
      "He falls asleep with a hand fisted in your shirt, as though you might go.",
      "He touches you like something he has been given and can hardly believe he keeps.",
    ],
  },
  dialogueWhen: [
    {
      when: { time: "evening" },
      dialogue: {
        new: [
          "He's doing a slow circuit of the balcony rail, checking the dark below, and only then turns to you.",
          "The campus lights have come on behind him. He's clearly been out here a while.",
          '"You\'re out late," he says, not quite a reproach. "I\'ll walk you back when you\'re ready."',
          '"You shouldn\'t wander alone," he says quietly. "Not here. Not at this hour."',
        ],
        known: [
          "He falls into step to walk you along the lit path before you can decline the escort.",
          '"I don\'t like this hour for wandering," he admits. "I like that you came to find me in it."',
          '"Curfew\'s soon," he says. "Stay a little. I\'ll make sure you\'re not caught."',
        ],
        warm: [
          "He's saved you the sheltered corner out of the wind. He'd deny having planned it.",
          "The dark makes him less careful with what he says. Not much. Enough to notice.",
          '"The quiet out here is the honest part of my day," he says. "I\'m glad you\'re in it."',
        ],
      },
    },
  ],
  approachWhen: [
    {
      when: { time: "evening" },
      approach: {
        new: ["Let him walk you back", "Fall into step with him"],
        known: ["Accept the escort"],
        warm: ["Take the sheltered corner"],
      },
    },
  ],
  temperamentDialogue: {
    new: [
      '"Oh... hello. Please, be careful around here."',
      '"Ah, my apologies. Did you need something?"',
      "\"I'm sorry, I don't think we've met properly.\"",
      "\"You're here 10 minutes early. I'm impressed. Let's check the details for today's mission.\"",
    ],
    known: [
      '"Ah, it\'s you. Good. I\'d hoped it would be."',
      "\"You've been coming by more often. That's... that's good.\"",
      '"Do I find it tough training every day? Those with strength have a duty to use it for others. I\'m perfectly all right."',
      '"I invited Kaito to train with me, but he turned me down. I\'m worried about his lack of strength..."',
      '"I remembered your name. I hope that isn\'t strange."',
    ],
    warm: [
      "\"I'm glad you're safe. How have you been?\"",
      '"You came back. I... was hoping you would."',
      '"Sit, please. You look like you\'ve been on your feet all day."',
      '"May I walk with you? Only if you\'d like."',
      '"I kept thinking I heard you in the hall. I was wrong, until now."',
    ],
    spark: [
      '"Stay near me. I\'d rather not explain why."',
      '"You trust me too easily. I\'d like you to keep doing it."',
      '"May I? ...Thank you. You needn\'t look so surprised."',
      "\"There's a part of me that isn't gentle. It's very fond of you.\"",
      "\"Don't apologize for standing close. Please don't.\"",
    ],
    close: [
      '"Your safety means more to me than anything else."',
      '"Stay close. Just for a while. Please."',
      '"I would rather be the one who\'s hurt than watch it happen to you."',
      '"You don\'t have to be gentle with me. Not you."',
      '"I\'ve stopped apologizing for wanting you near. Is that all right?"',
    ],
    bound: [
      '"Stay the night. I\'ve stopped pretending I want anything else."',
      "\"Don't be gentle with me. I'm not made of glass. Not with you.\"",
      '"I love you. I\'ve said it in my head so often it should be easier aloud."',
      '"Closer. I want to feel you breathing."',
      "\"Whatever's left of me that isn't kind, it's yours too.\"",
    ],
  },
  approach: {
    new: [
      "Approach quietly",
      "Return his nod",
      "Speak softly first",
      "Let him notice you",
    ],
    known: [
      "Accept the better spot",
      "Answer his question",
      "Return the half-smile",
      "Say his name",
    ],
    warm: [
      "Walk up to him",
      "Ask him how he's been",
      "Fall into step with him",
      "Return the small smile",
    ],
    spark: [
      "Let him keep your hand",
      "Stand closer than needed",
      "Say yes",
      "Trust him anyway",
    ],
    close: [
      "Go to his side",
      "Take his hand",
      "Stay where he can see you",
      "Tell him you're safe",
    ],
    bound: [
      "Stay the night",
      "Don't be gentle",
      "Say it back",
      "Let him hold on",
    ],
  },
  responses: {
    kind: {
      new: [
        "Speak gently like he does",
        "Thank him for the warning",
        "Tell him he isn't in the way",
      ],
      spark: [
        "Let him keep your hand",
        "Tell him you're not afraid",
        "Be soft with the harder part",
      ],
      close: [
        "Trust his quiet strength",
        "Tell him he can stop",
        "Let him take care of you",
      ],
      bound: [
        "Tell him you're not scared",
        "Say it back softly",
        "Hold him through it",
      ],
    },
    playful: {
      new: [
        "Be gentle and playful",
        "Coax a smile out of him",
        "Tease him very carefully",
      ],
      spark: [
        "Catch him looking",
        "Fluster the polite one",
        "Ask what he's thinking",
      ],
      close: [
        "Make him laugh softly",
        "Catch him being sweet",
        "Fluster him on purpose",
      ],
      bound: [
        "Make the polite one blush",
        "Refuse to be handled gently",
        "Steal his shirt",
      ],
    },
    bold: {
      new: [
        "Be gentle but firm",
        "Tell him you can handle it",
        "Step in front of him",
      ],
      spark: [
        "Close the space yourself",
        "Tell him you like the danger",
        "Say yes before he asks",
      ],
      close: [
        "Be bold for him",
        "Refuse to let him take the hit",
        "Say it before he can",
      ],
      bound: [
        "Tell him not to be gentle",
        "Pull him down to you",
        "Say you'd burn it with him",
      ],
    },
    neutral: {
      new: ["Stay silent", "Let him finish the thought", "Wait beside him"],
      spark: [
        "Let the moment pass",
        "Step back gently",
        "Say nothing at all",
      ],
      close: [
        "Be quiet with him",
        "Stay through the silence",
        "Let the moment be enough",
      ],
      bound: [
        "Let him sleep",
        "Stay quiet beside him",
        "Let the night be still",
      ],
    },
  },
  // The /call reveal lines for this character, keyed by the register in
  // WINNER_LINE_BUCKETS (constants/publicEncounters.js). Picked from at random
  // like the dialogue; {user} is the winner's mention and {name} their full
  // name, and the embed's winner line is the only place the reveal names
  // either of them. A register left out here falls back to the generic
  // WINNER_LINES pool.
  winnerLines: {
    new: [
      "**{name}** turns and apologizes to {user} for not noticing sooner, which wasn't his fault.",
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
      '"I\'d burn a great deal down for you," **{name}** says quietly, because {user} called his name in public and he is still not over it.',
      "**{name}** kisses {user}'s knuckles with people going past on both sides, and does not apologize for it.",
      "{user} says the name, and every ounce of **{name}**'s restraint goes somewhere else.",
    ],
  },
};
