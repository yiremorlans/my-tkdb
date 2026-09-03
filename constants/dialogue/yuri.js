export default {
  dialogue: {
    new: [
      '"What are you dawdling for? Change out of those rags and report to my lab immediately!"',
      '"Fascinating," he says, about you, in the tone one uses about a specimen.',
      "He doesn't look up from the slide. \"Don't breathe on that. Or on me.\"",
      "The lab hums. He's been awake for an unreasonable number of hours and it shows.",
      '"You should feel honored to be chosen as the test subject of Dr. Yuri Isami, genius and visionary!"',
    ],
    known: [
      "He's stopped calling you 'worm.' He hasn't replaced it with anything yet.",
      "There's a second chair in the lab. He'll insist it has always been there.",
      '"Are you injured or ill? Oh dear, how unfortunate. I shall begin the experi— Ahem, the treatment, immediately."',
      "He notes something about you in the margin, and covers it when you look.",
      "The insults have gotten more specific, which means he's been paying attention.",
    ],
    warm: [
      "His cold demeanor cracks slightly — there's obsession in his eyes now, the drive to save you consuming him.",
      "He has a new set of notes. Every page of them is about you.",
      '"Where on earth have you been, worm?" he snaps. "Next time you take a leave of absence, you inform me in advance."',
      "He shoves a bottle at you without a word. It's the good painkiller. He'd deny caring.",
      "He turns bright red mid-sentence and blames the lab lighting.",
    ],
    spark: [
      "He takes your pulse for the fourth time today. It's fine. It's always fine.",
      "He's gone red to the tips of his ears and has not taken his hand back.",
      '"Purely clinical," he mutters, with his hand still on your face.',
      "The insults have gone quiet. What replaced them is much harder for him.",
      "He leans in to examine something, and forgets to invent a reason.",
    ],
    close: [
      '"I\'ll find your cure," he says with absolute conviction, "because I\'m the only one capable enough. And you\'re mine to save."',
      "He's asleep at the bench over your file. He'd rather die than let you say so.",
      '"Don\'t you dare thank me," he warns, ears scarlet. "I\'m not doing it for gratitude."',
      "He's stopped flinching when you reach for your coat. He hadn't noticed he was doing it until it stopped.",
      "He grips your wrist a moment too long, checking a pulse he already knows is fine.",
    ],
    bound: [
      "He is furious about how much he loves you and expresses it almost entirely with his hands.",
      '"Don\'t look at me like that," he snaps, already crossing the lab toward you.',
      "He falls asleep on your chest mid-argument and would deny it under oath.",
      "He kisses you like it's a problem he intends to solve thoroughly and repeatedly.",
      '"Stay," is all he says now, where he used to build a whole excuse around the word.',
    ],
  },
  temperamentDialogue: {
    new: [
      '"A test subject wanders in of its own accord. How convenient."',
      '"Don\'t touch that. Or that. Honestly, just stand still."',
      '"Are you here to be useful, or to be a variable?"',
      '"Hm. Poor posture, poor sleep, poor decisions. Textbook."',
      "\"I am a very busy man, so if you don't require examination, then we're done here.\"",
    ],
    known: [
      "\"Oh. It's you. Don't touch anything, but... you may sit.\"",
      "\"You're less useless than average. Don't celebrate.\"",
      '"Jiro!! Jiro!!! What on earth are you — ...ah. It\'s you. Sit."',
      "\"That's the wrong chair. ...Fine. That's your chair now, apparently.\"",
      "\"You're sleeping badly. It's written all over you. Do something about it.\"",
    ],
    warm: [
      '"You again? ...I suppose I don\'t mind."',
      '"You\'re late. Not that I was — never mind. Sit."',
      "\"Take this. It's for the headache you've been pretending not to have.\"",
      '"I\'ve read your file eleven times. Purely academic interest, obviously."',
      '"I do this for the future of humanity. And — fine. For you specifically. Don\'t repeat that."',
    ],
    spark: [
      '"Hold still. I\'m — this is a medical assessment. Stop smiling."',
      '"Your proximity is affecting my concentration. Don\'t you dare move."',
      "\"I've catalogued every symptom you have. This one's mine. Shut up.\"",
      '"If you laugh I will never speak to you again. ...Fine. Laugh."',
      '"I don\'t want anything from you. Except — no. Never mind. Come here."',
    ],
    close: [
      '"Don\'t go worrying me like that. I have better things to do than panic over you."',
      '"I always preserve the lives of my patients. I cannot make guarantees for any other parts of them, however. ...You, I keep whole."',
      '"I said sit down. Please. ...There. Was that so hard for either of us?"',
      '"If anything happens to you I\'ll be extremely inconvenienced. Emotionally. Shut up."',
      '"I will solve this. You don\'t get to give up before I do."',
    ],
    bound: [
      '"You belong to me. I won\'t hand you to another researcher — " He stops cold. "N-No. You\'ve misunderstood. I merely —"',
      '"I love you. There. I said it. Never bring it up again. ...Bring it up again."',
      "\"You're impossible and I've stopped wanting you to be anything else.\"",
      "\"Stay the night. The lab's cold. That's the reason. That's the only reason.\"",
      '"Stop smiling at me like that or I\'ll never get anything done."',
    ],
  },
  approach: {
    new: [
      "Enter the lab",
      "Stand still",
      "Be interesting",
      "Roll up your sleeve",
    ],
    known: [
      "Take the second chair",
      "Don't touch anything",
      "Be less useless",
      "Sit without asking",
    ],
    warm: [
      "Take the offered bottle",
      "Sit down as told",
      "Ask what he's working on",
      "Be late on purpose",
    ],
    spark: ["Hold still", "Don't move", "Come here", "Laugh anyway"],
    close: [
      "Go to him",
      "Wake him from the bench",
      "Let him take your pulse",
      "Refuse to be a burden",
    ],
    bound: [
      "Get over there",
      "Smile at him like that",
      "Stay the night",
      "Bring it up again",
    ],
  },
  responses: {
    // kind is Yuri's real channel (affinityByResponse.kind = 2): steady,
    // unsentimental care he never has to perform anything back for — telling
    // him to sleep, letting "worm" slide, not laughing at the novel he hides,
    // being gentle with the fear of failure under the bravado. playful reaches
    // him too (1): he flusters more easily than anyone in the script, so
    // teasing lands and is half the fun — it just makes him sputter and re-arm
    // rather than open up. bold glances off (0): a blunt challenge to his
    // genius or a refusal to be his specimen hits the one nerve he can't
    // defend and makes him bombastic instead of honest — not dislike, just the
    // move that doesn't get through.
    kind: {
      new: [
        "Let the 'worm' slide",
        "Thank him anyway",
        "Tell him to get some sleep",
      ],
      known: [
        "Take the second chair",
        "Don't laugh at the novel",
        "Say the research can wait",
      ],
      warm: [
        "Take the painkiller",
        "Sleep — doctor's orders",
        "Let him fuss over your pulse",
      ],
      spark: [
        "Let him keep pretending",
        "Tell him it's mutual",
        "Be gentle about the blush",
      ],
      close: [
        "Say the next one won't fail",
        "Tell him to sleep",
        "Say the thanks he forbade",
      ],
      bound: [
        "Say it back",
        "Let him fall asleep on you",
        "Tell him he's allowed",
      ],
    },
    playful: {
      new: [
        "Tease him carefully",
        "Touch what he said not to",
        "Be a deliberate variable",
      ],
      known: [
        "Read his margin notes aloud",
        "Claim the second chair",
        "Ask what counts as 'lowbrow'",
      ],
      warm: [
        "Blame the lab lighting",
        "Show up late on purpose",
        "Quote his novel back at him",
      ],
      spark: ["Laugh anyway", "Take his pulse instead", "Call it clinical too"],
      close: [
        "Make him laugh despite himself",
        "Fluster him on purpose",
        "Read his notes out loud",
      ],
      bound: [
        "Bring it up again",
        "Smile at him deliberately",
        "Call him impossible back",
      ],
    },
    bold: {
      new: [
        "Talk back to the genius",
        "Poke a hole in his logic",
        "Refuse to be his specimen",
      ],
      known: [
        "Say the bravado's showing",
        "Demand he say what he means",
        "Push past the lab-coat act",
      ],
      warm: [
        "Say he was clearly waiting",
        "Name the savior complex",
        "Match his volume",
      ],
      spark: [
        "Close the distance yourself",
        "Say what he won't",
        "Take his hand off the chart",
      ],
      close: [
        "Match his intensity",
        "Tell him you won't give up",
        "Say you're his to save",
      ],
      bound: [
        "Cross the lab first",
        "Say it before he can",
        "Kiss him mid-argument",
      ],
    },
    neutral: {
      new: ["Give him space", "Let him work", "Answer only what's asked"],
      known: [
        "Take the chair quietly",
        "Let him finish his notes",
        "Say nothing",
      ],
      warm: ["Let it stay clinical", "Sit in the lab quietly", "Don't name it"],
      spark: ["Let it stay clinical", "Move away first", "Say nothing at all"],
      close: [
        "Understand his withdrawal",
        "Sit quietly in the lab",
        "Let him pretend it's nothing",
      ],
      bound: ["Let him blame the cold", "Say nothing", "Let him sleep"],
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
      '"A test subject, wandering in of its own accord." **{name}** looks {user} over, delighted.',
      '{user} says the name, and **{name}** draws himself up. "You should feel honored to have recognized me."',
      '"You know of me. Naturally." **{name}** informs {user} of this at considerable length.',
    ],
    warm: [
      '"Where on earth have you been, worm?" **{name}** demands of {user}, having clearly counted the days.',
      "{user} calls out, and **{name}** drops a pipette. He denies dropping it.",
      '**{name}** waves {user} over. "You\'re late. Not that I was— never mind." ',
    ],
    spark: [
      '"Wh-Where did you come from!?" **{name}** knows exactly where {user} came from.',
      "{user} says the name, and **{name}** goes an interesting color. Science cannot explain it.",
      "**{name}** re-arms the bravado twice on the way to {user}. Neither attempt survives.",
    ],
    close: [
      '"You belong to—" **{name}** stops. "...You\'ve misunderstood." {user} hasn\'t.',
      "**{name}** abandons whatever he was striding off to do, mid-stride, because {user} called his name.",
      "{user} calls, and **{name}** shouts for Jiro to cover the **{house}** ward. Jiro already was.",
    ],
    bound: [
      '"You are indispensable. To the research. And— and to me. Obviously to me." **{name}** announces it to {user} at volume, then urgently requires a distraction.',
      "**{name}** is furious about how much he loves {user}, and crosses to them anyway.",
      "{user} says the name, and the entire genius act falls off **{name}** at once.",
    ],
  },
};
