export default {
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
      "His eyes light up when he sees you — he's eager now, ready to collaborate and strategize together.",
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
      '"Before you commit to anything in this house — read it. All of it. I\'ll wait."',
      '"You have a good face for negotiation. That\'s a compliment, incidentally."',
      "\"State your position and I'll tell you whether it's defensible.\"",
      '"Keep in mind: I charge 5500 yen per half hour for consultations. Tax inclusive."',
    ],
    known: [
      '"Partner — good. I need a second opinion, and yours is becoming reliable."',
      '"Read this. Tell me what\'s wrong with it. Something is."',
      '"I\'ve stopped explaining the basics to you. Take that as the compliment it is."',
      '"You disagreed with me last time. You were half right. That\'s remarkable."',
      "\"Any self-respecting inspector would stay comfortably ahead of schedule — I suggest you get into the habit. Let's go — there's no time to waste.\"",
    ],
    warm: [
      "\"I was hoping you'd come by. We make a good team, don't we?\"",
      "\"Sit — I've got a problem and you've got the better instincts.\"",
      '"Argue the other side for me. You\'re the only one who does it properly."',
      '"I\'ve reserved this hour. Coincidence, obviously."',
      '"Your reasoning has improved. So has my mood. Related, I suspect."',
    ],
    spark: [
      '"I move to amend our arrangement. Clause one: I\'d like to be closer."',
      "\"I've prepared an argument. It's excellent. May I skip to the conclusion?\"",
      "\"Objection — you're distracting. Sustained. I'm not asking you to stop.\"",
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
      '"Close the file. Close it. There — now come here."',
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
    bound: [
      "Close the file",
      "Take his glasses",
      "Stay the week",
      "Come here",
    ],
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
      spark: [
        "Table the motion",
        "Let the file stay open",
        "Reserve judgment",
      ],
      close: [
        "Understand his logic",
        "Sit through the long argument",
        "Let the office go quiet",
      ],
      bound: ["Let him work", "Sit in the quiet office", "Say nothing"],
    },
  },
};
