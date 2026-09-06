export default {
  // The level-up DMs (docs/bond-scene-dms.md). Lucas writes the way he speaks:
  // warm, direct, contractions and plain British idiom, courteous without being
  // stiff. He apologises lightly and moves on. The intimacy is him gradually
  // dropping the good manners about how much he needs you, and the "out of
  // sorts, like I'm not myself" thing under the courtesy edging closer each time.
  bondScenes: {
    acquaintance: {
      beats: [
        "**{firstName}**: Good evening. I hope it isn't too late to be writing to you. I checked the hour twice, and then I wrote anyway, because I didn't want to lose my nerve before morning.",
        "I've been wanting to say this properly for a while, and it turns out I can only manage it in writing. That probably tells you something about me.\n\nYou've been kind to me {timesMet} times now. You won't have been keeping count. I was, quietly, every time. I was raised to believe a kindness is something you pay back, and the trouble is I haven't the first idea how to pay back one this large.",
      ],
      choice: {
        prompt: "So I'm asking rather clumsily. How do I? Repay it, I mean.",
        options: [
          {
            key: "kind",
            label: "Tell him he doesn't owe you",
            style: 3,
            close:
              "That's a very generous thing to say, and I'm not going to accept it.\n\n...I'm going to accept it. Thank you. I'm not used to being let off, and it sits oddly, and rather well.",
          },
          {
            key: "playful",
            label: "Ask for the whole ledger",
            style: 1,
            close:
              "There's no ledger. There's absolutely a ledger. It's in the back of my training notebook and I'd rather you didn't see it.\n\n...It's four pages. Good night.",
          },
          {
            key: "bold",
            label: "Tell him to stop counting",
            style: 4,
            close:
              "*The reply is slow in coming.*\n\nI don't know how to do that, *he writes, and there's no courtesy left in it at all.* But I'd like to learn, if you'll be patient with a slow student.",
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
        "**{firstName}**: May I be improper for a moment? I'll keep it short.",
        "You always answer me with {favResponse}, and I've spent far too long working out why something so kind should unsettle me.\n\nI think it's this. Most people are careful with me, the way you're careful near a thing that might go off. They aren't wrong to be. You never are. And every time you aren't, I feel a little less like something to be handled and a little more like a person, and I've grown quietly greedy for the feeling.",
      ],
      choice: {
        prompt:
          "That was improper. I did warn you. Say whatever you like back.",
        options: [
          {
            key: "kind",
            label: "Tell him he's just a person",
            style: 3,
            close:
              "You can't know that.\n\n*Then, after a while:* Forgive me, that came out sharper than I feel. What I meant to say was thank you. And that I'll be turning it over for days. And that I'd very much rather you didn't take it back.",
          },
          {
            key: "playful",
            label: "Call that his worst crime yet",
            style: 1,
            close:
              "Dreadful, isn't it. Improper conduct by post.\n\nThat's the first proper joke I've made since I got here, I think. I might have to sit down.",
          },
          {
            key: "bold",
            label: "Tell him to be greedier",
            style: 4,
            close:
              "*There's a long pause.*\n\nYou should be careful what you offer me, *he writes.* I'm not always as well mannered as I look, and you keep saying things that make the manners feel like a lot of trouble for nothing.",
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
        "{timesMet} times. I know the number because I never stopped keeping the ledger. I only stopped calling it one.\n\nEvery page of it is you being kind to me with nothing in it for you, and me deciding not to look straight at what I felt, in case it made me useless.",
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
      "He studies you for a long moment before offering the faintest nod.",
      "He steps aside to let you pass, and apologizes for having been in the way at all.",
      "He's checking his gear over with far more care than the hour warrants. A mission, maybe.",
      '"Forgive me," he says softly, before you\'ve said anything. "I didn\'t hear you come in."',
      "Everything about him is quiet. That includes whatever he's decided not to say.",
    ],
    known: [
      "He remembers you. The little apology comes quicker now, like a habit he's stopped hearing himself say.",
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
      "\"Oh, hello. It's not often I see a new face out here. Take care as you go, won't you?\"",
      '"Ah, my apologies. Did you need something? I\'m happy to help."',
      "\"I'm sorry, I don't believe we've met properly. Lucas. A pleasure.\"",
      "\"You're here 10 minutes early. I'm impressed. Let's check the details for today's mission.\"",
    ],
    known: [
      "\"Ah, it's you. Good. I'd hoped it would be.\"",
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
        "Thank him for the concern",
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
      spark: ["Let the moment pass", "Step back gently", "Say nothing at all"],
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
