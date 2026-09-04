export default {
  // The level-up DMs (docs/bond-scene-dms.md). One of the six volatile
  // characters — see docs/negative-affinity-enemies-to-lovers.md. Ritsu is
  // thorny by way of procedure rather than temper: everything is a clause, a
  // schedule, a filed record. He warms up slowly and the warmth arrives as
  // paperwork — an exception granted, a clause struck out, a standing
  // appointment with no billable purpose. He does not become informal. He
  // becomes precise about something other than work.
  bondScenes: {
    acquaintance: {
      beats: [
        '**{firstName}**: "Good evening. This message is sent at 23:47, which is outside the hours I have set aside for correspondence. I am noting that at the top so that you understand it was deliberate."',
        '"I maintain a record of everyone who enters Sinostra on business. It is not surveillance; it is the reason this house has not been sued in four years."\n\n"Your entry reads: {timesMet} visits, no petition, no dispute, no request for representation. That column is blank for exactly one person in a document of four hundred and six."\n\n"I have checked it three times. I found the blankness irritating and then, on the third check, I found that I did not."',
      ],
      choice: {
        prompt:
          '"I would like to know what you want. Not as an accusation. As a matter of completeness."',
        options: [
          {
            key: "kind",
            label: "Say you don't want anything",
            style: 3,
            close:
              '"That is not a category the record has."\n\nA pause of some length.\n\n"I will create one. It will contain a single entry. Good night."',
          },
          {
            key: "playful",
            label: "Offer to file a petition",
            style: 1,
            close:
              '"Do not. The forms are extensive and I would have to process it."\n\n"...I would process it immediately. I would be at my desk within four minutes. Please do not test that; I am aware of how it would look."',
          },
          {
            key: "bold",
            label: "Ask what he wants instead",
            style: 4,
            close:
              'There is no reply for nearly two minutes, which for a man who is punctual to the second is a great deal of time.\n\n"That question is outside the scope of this correspondence," he writes.\n\n"I have not deleted it, however. I want that noted also."',
          },
        ],
      },
      keepsake: {
        emoji: "📄",
        line: "A new category in a four-hundred-line record, with one entry in it.",
      },
    },

    friend: {
      beats: [
        '**{firstName}**: "A matter I have modeled at some length and been unable to resolve. I am therefore asking, which is a method I resort to rarely and dislike."',
        '"Your conduct toward me is {favResponse} without variance. I have run it against every input available: Romeo shouting, the captain\'s condition, the hour, whether I have been of any use to you. It does not move."\n\n"People are transactional. That is not cynicism, it is the observed data, and I have built a functioning practice on it. I predict what a person will do by determining what they are owed and what they want."\n\n"I cannot predict you. That is the first time the model has failed in six years and I have been unable to enjoy anything since I noticed."',
      ],
      choice: {
        prompt: '"Explain the discrepancy. I would like the model repaired."',
        options: [
          {
            key: "kind",
            label: "Say you're not a transaction",
            style: 3,
            close:
              '"Everything is a transaction."\n\nA long pause.\n\n"That was said reflexively and I have reviewed it and I do not think it survives scrutiny. I will require some days."',
          },
          {
            key: "playful",
            label: "Say you'll invoice him",
            style: 1,
            close:
              '"For what, precisely."\n\n"...That was a joke. I have identified it as a joke on the second reading. It was a good one. I am recording that I laughed, since you cannot see it and would otherwise not know."',
          },
          {
            key: "bold",
            label: "Tell him to bin the model",
            style: 4,
            close:
              '"The model is eleven years old."\n\n"I built it at fourteen, in a house where knowing what everybody wanted was the only reliable form of safety available to me. I am aware of how that sounds and I have never written it down before."\n\n"I am not going to discard it. I am prepared to make one exception in it. That is a larger concession than it appears."',
          },
        ],
      },
      keepsake: {
        emoji: "📐",
        line: "A single exception written into an eleven-year-old model.",
      },
    },

    closeFriend: {
      beats: [
        '**{firstName}**: "I am proposing a standing arrangement. Tuesdays, 19:00 to 20:30, the small reading room on the second floor. Attendance optional; I will be present regardless."',
        'You go. He has laid out two chairs, a lamp, tea, and absolutely no paperwork whatsoever, which for Ritsu Shinjo is a room stripped bare.\n\n"There is no purpose. I want that stated plainly at the outset, because you will look for one and its absence is the entire point."',
        '"Every hour of my week is allocated. I have kept a schedule since I was twelve. There is a block on Tuesdays that has read \'contingency\' for four years and has never once been used for a contingency."\n\n"I have been sitting in this room in it. Alone. Reading things that are of no professional use to me and telling nobody."\n\n"I am now telling one person. The chair is for you. I bought it in March and I have been rehearsing this since roughly the same period."',
      ],
      choice: {
        prompt:
          '"You may decline. I would prefer a plain refusal to a polite acceptance."',
        options: [
          {
            key: "kind",
            label: "Take the chair",
            style: 3,
            close:
              'You sit down. He does not say anything at all for about four minutes, which is the longest he has ever gone without speaking in your presence.\n\n"...Good," he says eventually. "That is Tuesdays settled, then."\n\nHe is there at 18:52 every week after that, and never once mentions being early.',
          },
          {
            key: "playful",
            label: "Ask what he reads in here",
            style: 1,
            close:
              '"That is not relevant to the arrangement."\n\nA pause.\n\n"Poetry. It is extremely bad poetry and I have never told a living person. Romeo would have it engraved on something."',
          },
          {
            key: "bold",
            label: "Ask why it took until March",
            style: 4,
            close:
              '"It did not take until March. I decided in November."\n\n"I spent four months determining whether the request could be made without imposing an obligation on you. I concluded that it could not, and I have made it anyway, which is the first knowingly improper thing I have done since I arrived at this academy."',
          },
        ],
      },
      keepsake: {
        emoji: "🪑",
        line: "A second chair bought in March for a block marked contingency.",
      },
    },

    confidant: {
      beats: [
        '**{firstName}**: "It is 03:14. I am aware this is a violation of the arrangement and I am proceeding."',
        '"I collect the protection fees. You know this. Everybody knows this and nobody says it in the plain form, which is: a first-year law student walks into rooms and explains to people what will happen to them if they do not pay."\n\n"I am extremely good at it. That is not a boast. It is the observation that has kept me awake since Tuesday."',
        '"I do not raise my voice. I do not threaten. I set out the consequences accurately and in order, and people find that considerably more frightening than Romeo shouting, and I have known that since my second week and used it every day since."\n\n"I came here to become a lawyer because the law is the one system in which what is right and what is written are supposed to be the same thing."\n\n"They are not the same thing. I found that out at fifteen and I have been billing by the hour ever since, and there is nobody I could say that to except you."',
      ],
      choice: {
        prompt:
          '"You may respond however you wish. I have no preferred answer, which is itself unusual for me."',
        options: [
          {
            key: "kind",
            label: "Say he's still deciding",
            style: 3,
            close:
              'There is a very long silence.\n\n"That is not established."\n\nThen, at 03:41: "I would like it to be established. I have not wanted anything in that particular way in some years and I am finding it difficult to sit still, which does not happen."',
          },
          {
            key: "playful",
            label: "Ask what it'd cost to hire him",
            style: 1,
            close:
              '"You could not afford me."\n\nA pause.\n\n"You have never been billed. Not once, in {timesMet} visits. I have handled four matters on your behalf that you are not aware of and there is no invoice for any of them, and I have declined to examine why."',
          },
          {
            key: "bold",
            label: "Tell him to stop collecting",
            style: 4,
            close:
              '"I cannot. There is a contract and I drafted it, which makes it rather difficult to argue my way out of."\n\nThen, some minutes later:\n\n"There is a clause. I put it in at the time without knowing why. It permits termination on ninety days\' notice and I have read it perhaps two hundred times."\n\n"I have never given the notice. Ask me again in the spring."',
          },
        ],
      },
      keepsake: {
        emoji: "⚖️",
        line: "A termination clause read two hundred times and never used.",
      },
    },

    devoted: {
      beats: [
        '**{firstName}**: "Your name has been removed from the Sinostra register. Every entry. Retroactively."',
        '"This was not an oversight and it was not a courtesy. It was a decision I made at 02:00 and executed personally, and it required me to alter a document I have described to this house as inviolable."\n\n"The reason is that a man came to my office asking who in the register had been visiting the captain, and I gave him a complete and accurate answer that did not contain you."',
        '"I have never lied on a record. Not once, at any point, under any pressure, including from Romeo, including twice from the captain."\n\n"I have now. Deliberately, cleanly, and with a fabricated audit trail that will withstand review."\n\n"I would like you to understand exactly what I have handed you. If that is ever found, my practice is finished and I am finished with it. It is in your keeping now and I put it there on purpose."',
      ],
      choice: {
        prompt:
          '"Say something. I have been at this desk since two and I would like to stop being at it."',
        options: [
          {
            key: "kind",
            label: "Tell him to come to the room",
            style: 3,
            close:
              'He arrives at the reading room at 04:11 with his tie undone, which you have never seen.\n\nHe sits in his chair and says nothing for a long while, and then leans over and puts his head on your shoulder, an entirely unprecedented breach of everything he has ever observed about distance, and stays there.\n\n"I am not going to discuss this," he says. "I am simply going to be here for a period."',
          },
          {
            key: "playful",
            label: "Ask if there's a form for it",
            style: 1,
            close:
              '"There is not."\n\n"There is now. I have drafted one. It is a single page and it is titled \'Matters I Have Elected Not To Record\' and it has one line on it and I am aware that is the most sentimental thing I have ever done."',
          },
          {
            key: "bold",
            label: "Ask what happens if it's found",
            style: 4,
            close:
              '"I lose the practice, the placement, and the reference. Approximately eleven years of work."\n\n"I did the calculation before I altered the file. It took four seconds. I have never in my life completed a decision of that magnitude in four seconds and I have been sitting here since two trying to be alarmed about it."\n\n"I am not alarmed. That is the part I cannot file anywhere."',
          },
        ],
      },
      keepsake: {
        emoji: "🗂️",
        line: "A one-page file titled Matters I Have Elected Not To Record.",
      },
    },

    soulbound: {
      beats: [
        '**{firstName}**: "Tuesday, 19:00, as usual. I am sending this in advance because I intend to say something and I have found that I say things more accurately when the other party has had notice."',
        '"{timesMet} attendances. I have the figure to hand, as you would expect. What you would not expect is that I stopped recording them in February and have simply known the number since."\n\n"I have never held a figure in my head. That is the entire purpose of a record."',
        '"I have been drafting this for eleven weeks. I have twenty-three versions. The early ones set out the position, the risks, and a proposed structure, and read (I have reviewed them) like a merger."\n\n"The twenty-fourth version has no structure in it at all. I found I could not draft it and mean it at the same time, and I have chosen meaning it, which is not a trade I have made before in my life."',
        '"I love you."\n\n"There is no clause attached. Nothing is contingent, nothing is reciprocal, and there is no term. I have deliberately given you an instrument with no obligation in it whatsoever, which every part of my training says is negligent drafting."\n\n"It is the only document I have ever produced that I am certain of."',
      ],
      choice: {
        prompt:
          '"You are under no obligation to respond. That is not politeness. It is the actual legal position and I have made sure of it."',
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close:
              'He is silent for a length of time that would be alarming in anyone else and is unprecedented in him.\n\n"Repeat that. I am not being difficult. I have modeled a considerable number of outcomes and that one had a low weighting and I would like to hear it again."\n\nYou repeat it. He stands up, crosses the small reading room, and kisses you with the entire eleven weeks of drafting behind it, and afterwards says, unsteadily, "That was not in any of the twenty-four versions."',
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close:
              '"Of course. That is the correct handling of an instrument of this kind and I would have advised it."\n\nA pause.\n\n"I will say one thing that is not advice. Tuesday is not conditional. The chair was bought in March and it is not being taken away, and I will be in that room at 19:00 for as long as I am in this academy whether or not you ever attend again."\n\n"That is on the record. It is the only entry in it that I have made for my own benefit."',
          },
        ],
      },
      keepsake: {
        emoji: "📃",
        line: "The twenty-fourth draft, the one with no clauses in it.",
      },
    },
  },
  dialogue: {
    new: [
      'He looks up with genuine interest, already assessing your potential. "Partner, your timing is fortuitous. I could use someone sharp."',
      "He finishes a paragraph, caps the pen, and gives you a précis of his day before you asked.",
      '"What business do you have with me? Please keep in mind that I charge 5500 yen per half hour for consultations, tax inclusive."',
      "There are eleven documents on the desk and he knows exactly where each one is.",
      "He speaks in complete sentences at a speed that suggests he's already ahead of them.",
    ],
    known: [
      "He's stopped introducing himself. He opens mid-argument now, which is friendlier.",
      '"Partner," he says, and this time it\'s a name rather than a proposition.',
      "He hands you a document unprompted. He wants your read on it.",
      '"Have you seen Taiga Hoshibami? Strange... According to my behavioral model, he should be in the casino at this time."',
      '"I have been assigned to Sinostra, so I will not allow them to stand trial, no matter how villainous their actions. That is the Shinjo family policy."',
    ],
    warm: [
      "His eyes light up when he sees you. He's eager now, ready to collaborate and strategize together.",
      "He's drafted something with your name on it. He drafted it optimistically.",
      '"Partner. Excellent. I\'ve had a thought and no one worth telling it to."',
      "The verbosity slows down around you. He's actually listening, which is the tell.",
      "He argues the opposite side just to hear you dismantle it. He enjoys losing to you.",
    ],
    spark: [
      "He sets down the file and gives you a look with nothing legal in it.",
      '"I\'d like to renegotiate the terms of this partnership," he says carefully.',
      "He's rehearsed this. He's a very good speaker. It isn't helping.",
      "He takes off his glasses, which for him is practically undressing.",
      '"There is no precedent for what I want to say. So I\'ll simply say it."',
    ],
    close: [
      '"You\'ve become my partner in more ways than just business," he says warmly, stepping closer. "I wouldn\'t trust the calculation to anyone but you."',
      "He sets the file down mid-clause. That has never once happened for anyone else.",
      '"There\'s no clause for this," he admits. "I\'ve looked. Extensively."',
      "He explains the whole risk, honestly, and then asks you to decide.",
      "The lawyer goes quiet, and the person behind him is much less careful with words.",
    ],
    bound: [
      "The files stay shut. He's stopped pretending anything else has priority.",
      '"I have no argument for this," he says, "and no interest in constructing one."',
      "He takes his glasses off, sets them down deliberately, and stops talking entirely.",
      "He's verbose about everything except this, where he's suddenly and completely direct.",
      "He holds you like the one thing in his life he never had to negotiate for.",
    ],
  },
  temperamentDialogue: {
    new: [
      '"Ah, my new partner. Perfect timing. Let\'s work through this together."',
      '"Before you commit to anything in this house, read it. All of it. I\'ll wait."',
      '"You have a good face for negotiation. That\'s a compliment, incidentally."',
      "\"State your position and I'll tell you whether it's defensible.\"",
      '"Keep in mind: I charge 5500 yen per half hour for consultations. Tax inclusive."',
    ],
    known: [
      '"Partner. Good. I need a second opinion, and yours is becoming reliable."',
      '"Read this. Tell me what\'s wrong with it. Something is."',
      '"I\'ve stopped explaining the basics to you. Take that as the compliment it is."',
      '"You disagreed with me last time. You were half right. That\'s remarkable."',
      "\"Any self-respecting inspector would stay comfortably ahead of schedule. I suggest you get into the habit. Let's go. There's no time to waste.\"",
    ],
    warm: [
      "\"I was hoping you'd come by. We make a good team, don't we?\"",
      "\"Sit. I've got a problem and you've got the better instincts.\"",
      '"Argue the other side for me. You\'re the only one who does it properly."',
      '"I\'ve reserved this hour. Coincidence, obviously."',
      '"Your reasoning has improved. So has my mood. Related, I suspect."',
    ],
    spark: [
      '"I move to amend our arrangement. Clause one: I\'d like to be closer."',
      "\"I've prepared an argument. It's excellent. May I skip to the conclusion?\"",
      "\"Objection. You're distracting. Sustained. I'm not asking you to stop.\"",
      "\"Everything I've calculated says this is unwise. I'm proceeding regardless.\"",
      "\"Say no and I'll never raise it again. Say yes and I'll not let it rest.\"",
    ],
    close: [
      '"You\'re the only person I trust completely. We can accomplish anything with you by my side."',
      '"Set the file aside. I\'d rather talk to you than about anything else."',
      "\"I've calculated every outcome. They're all better with you in them.\"",
      '"No contract, no terms. Just tell me you\'ll stay a partner."',
      "\"I could argue anything. I can't argue myself out of this. I've stopped trying.\"",
    ],
    bound: [
      '"Close the file. Close it. There, now come here."',
      '"I love you. No preamble, no clause, no conditions. It\'s rather freeing."',
      "\"Stay. I'll clear the docket. I'll clear the entire week if you ask.\"",
      "\"I've argued my way out of everything. Not this. I don't want out.\"",
      '"Take the glasses. I won\'t be needing them."',
    ],
  },
  approach: {
    new: [
      "Take the consultation",
      "Answer his three questions",
      "State your position",
      "Sit across the desk",
    ],
    known: [
      "Give a second opinion",
      "Read the document",
      "Disagree with him",
      "Take the offered seat",
    ],
    warm: [
      "Take the reserved hour",
      "Argue the other side",
      "Pull up a chair",
      "Hear out the thought",
    ],
    spark: [
      "Hear the amendment",
      "Let him skip to the conclusion",
      "Say yes",
      "Overrule the objection",
    ],
    close: [
      "Set the file aside",
      "Go sit beside him",
      "Take the partnership",
      "Tell him you'll stay",
    ],
    bound: ["Close the file", "Take his glasses", "Stay the week", "Come here"],
  },
  responses: {
    kind: {
      new: [
        "Tell him you trust his read",
        "Take the advice seriously",
        "Thank him for the free hour",
      ],
      spark: [
        "Let him skip to the conclusion",
        "Tell him there's precedent",
        "Say yes gently",
      ],
      close: [
        "Show him friendship is real",
        "Tell him no contract is needed",
        "Say the calculation can wait",
      ],
      bound: [
        "Say it back without clauses",
        "Close the file for him",
        "Tell him he needn't argue",
      ],
    },
    playful: {
      new: [
        "Engage his mind playfully",
        "Object on principle",
        "Argue an absurd position",
      ],
      spark: [
        "Object on principle",
        "Cross-examine him",
        "Make him argue for it",
      ],
      close: [
        "Make him smile despite logic",
        "Win the argument on purpose",
        "Cross-examine him instead",
      ],
      bound: [
        "Object one last time",
        "Take his glasses",
        "Make him say it out loud",
      ],
    },
    bold: {
      new: ["Be straightforward", "Name your terms", "Refuse the fine print"],
      spark: [
        "Say yes",
        "Amend the clause yourself",
        "Take the glasses off him",
      ],
      close: [
        "Make a bold choice about him",
        "Tell him he's more than that",
        "Close the deal yourself",
      ],
      bound: [
        "Clear his docket yourself",
        "Say it first",
        "Tell him he's not getting out",
      ],
    },
    neutral: {
      new: [
        "Be logical",
        "Read before you answer",
        "Let him finish the clause",
      ],
      spark: ["Table the motion", "Let the file stay open", "Reserve judgment"],
      close: [
        "Understand his logic",
        "Sit through the long argument",
        "Let the office go quiet",
      ],
      bound: ["Let him work", "Sit in the quiet office", "Say nothing"],
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
      '"Partner. Your timing is fortuitous." **{name}** had not, until {user} spoke, been expecting one.',
      "{user} says the name, and **{name}** notes the exact hour, out of habit.",
      '"Consultations are 5,500 yen per half hour." **{name}** waives it for {user}, and mentions that he is waiving it.',
    ],
    warm: [
      '"Partner. Excellent." **{name}** had a thought and no one worth telling it to until {user} turned up.',
      "{user} calls out, and **{name}** caps the pen mid-clause.",
      "**{name}** has drafted something with {user}'s name on it. He drafted it optimistically.",
    ],
    spark: [
      "**{name}** loses his place in a sentence. {user} watches it happen and says nothing.",
      '"Argue the other side for me," **{name}** says to {user}. "You\'re the only one who does it properly."',
      "{user} says the name, and **{name}** files it under nothing at all. There is no file.",
    ],
    close: [
      "**{name}** takes his glasses off, sets them down deliberately, and goes to {user}.",
      '"I have no argument for this," **{name}** tells {user}, "and no interest in constructing one."',
      "{user} calls, and **{name}**, punctual to the second, is late to the **{house}** meeting.",
    ],
    bound: [
      '"No preamble, no clause, no conditions." **{name}** says it to {user} in front of everyone.',
      "**{name}** closes the file. For {user}, he closes all of them.",
      "{user} says the name, and **{name}** clears the docket, and then the week.",
    ],
  },
};
