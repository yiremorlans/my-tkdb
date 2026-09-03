export default {
  dialogue: {
    new: [
      'He greets you with a flourish, "Why, hello there, my dear. Suppose we kick off another swanky day here?"',
      "He's mid-sentence when you arrive — a story, out loud, to no one. He finishes the line before he finishes turning around.",
      '"Seventeen syllables," he murmurs, "and you\'ve just handed me the last five, my dear."',
      '"Well, if it isn\'t a new face. Has this inspired man of the quill left you speechless? ...No? A pity. It happens to some."',
      '"Oh, have you come to see me? This is troubling." He smiles. "I\'m afraid I\'m out of autographs."',
    ],
    known: [
      '"The wanderer returns." He looks delighted. "My dear, you\'re becoming a regular fixture."',
      "He lifts the instrument across his knee. \"What's this? Well, it's a biwa, of course. It's a biwa just as you are yourself.\"",
      "He offers your name back to you like a good line he's been holding.",
      "\"Heh. There's no doubt about it. Zenji Kotodama is once again the most styling man on campus. These glad rags are the cat's pajamas.\"",
      "He asks nothing at all. He simply makes room on the step beside him.",
    ],
    warm: [
      "His expression brightens with genuine pleasure, all formal distance melting away. \"My dear. I'm glad you're here.\"",
      "He's saved the last of the tea. He'd been saving it for a while.",
      '"You arrive like a season, my dear," he says, delighted. "Expected, and still a gift."',
      "He shows you the pages he's been working on. He shows almost no one.",
      "The brush pauses. He'd rather talk to you than finish the line.",
    ],
    spark: [
      "The story he's writing has quietly stopped being about anyone but you.",
      "He tucks a flower behind your ear and lets his fingers stay in your hair.",
      '"I\'ve written this one badly on purpose," he admits. "I wanted an excuse to read it to you."',
      "He sits closer than the step requires, and doesn't pretend otherwise.",
      '"Some things," he says softly, "are better in seventeen syllables. Others aren\'t."',
    ],
    close: [
      '"With you," he says, "the world behaves as though a story were being told well. I hadn\'t expected to feel that again."',
      "He doesn't reach for a metaphor this time. He just says he's happy.",
      '"I\'ve written you badly a hundred times," he laughs. "You deserve better than my words."',
      "He says your name the way he'd read the last line of something he didn't want to end.",
      "The world quiets around him when you're near. He's noticed. He's grateful.",
    ],
    bound: [
      "He's stopped writing about longing. The new poems are far less publishable.",
      "He reads you the old folktale badly, on purpose, so it takes all night.",
      '"Seventeen syllables can\'t hold this," he murmurs. "I\'ve stopped trying."',
      "He traces something on your back with one finger. It's a poem. You'll never read it.",
      "The lanterns burn down and neither of you notices for a very long time.",
    ],
  },
  dialogueWhen: [
    {
      when: { time: "evening" },
      dialogue: {
        new: [
          "He's watching the last light go out of the sky and doesn't seem to mind that it's leaving.",
          "\"Dusk becomes a genius of the pen, don't you think? Sit — the light's nearly gone, and it's worth watching it go.\"",
          "The lanterns have come on around the step. He tips his hat and makes room on the lit side.",
          '"A stranger at dusk — how fortunate," he says. "Sit, and let the evening happen to us."',
        ],
        known: [
          '"The wanderer, and at the good hour too. The evening was getting lonely."',
          "He's saved you the warm end of the step, where the lantern reaches.",
          '"Sit — the step is warm," he says, "and the evening is doing something worth watching."',
        ],
        warm: [
          '"You arrive like the evening does — expected, and still a gift."',
        ],
      },
    },
  ],
  approachWhen: [
    {
      when: { time: "evening" },
      approach: {
        new: ["Sit under the lanterns", "Watch the last light with him"],
        known: ["Take the warm end of the step"],
        warm: ["Let the evening happen"],
      },
    },
  ],
  temperamentDialogue: {
    new: [
      'Summer heat shimmers off the stones. "Why, hello there, my dear."',
      "\"You walk quietly, my dear. That's rarer than you'd think.\"",
      "\"Names come later. First, tea — that's the proper order, and I'm a stickler for the proper order.\"",
      '"Something brought you here. Let\'s not rush to name what."',
    ],
    known: [
      '"Twice is coincidence. Three times is a season. Welcome back."',
      '"I\'ve saved a line for you. It wanted your opinion."',
      '"You listen well. That\'s not a small thing to notice about someone."',
      '"You want to know the meaning of my words? I see — I\'ll have to give you a lecture on romanticism."',
    ],
    warm: [
      '"You return like seasons turning. My heart is at ease."',
      '"I was writing about rain. You\'ve made it about something warmer."',
      '"My ideal summer vacation? To lay down my burdens in the springs of Yugawara and pursue my wordsmithery in peace, as so many greats have done before me."',
      '"Tell me one small thing about your day. Small things are the good ones."',
      '"The lanterns lean toward you. So, apparently, do I."',
    ],
    spark: [
      '"Shall I read it to you? Fair warning — it isn\'t about the moon."',
      '"Come closer. The poem requires it. That\'s a lie, but come closer."',
      '"You are the only subject I cannot get right. I keep trying."',
      '"Stay through the last lantern. I\'d like the night to be longer."',
      "\"There's a word for this in the old poems. I'd rather just show you.\"",
    ],
    close: [
      '"With you, the world feels right. Like poetry made real."',
      "\"I've stopped writing about longing. There's nothing left to long for.\"",
      '"Stay. The moon is doing something worth witnessing together."',
      '"Every verse I finish lately has your shape in it somewhere."',
      "\"You needn't say anything. I've grown fluent in your silences.\"",
    ],
    bound: [
      '"Stay until morning. The night has been generous; let\'s not insult it."',
      '"I love you. There. No metaphor. I\'ve been saving the plain version."',
      '"Stay till the last lantern\'s out. I never did get enough night — less of it now."',
      '"Come here. I want to memorize something and it isn\'t a poem."',
      "\"You've made a very poor poet of me. I've never been happier about anything.\"",
    ],
  },
  approach: {
    new: [
      "Return his bow",
      "Give him the last syllables",
      "Sit under the lanterns",
      "Listen with him",
    ],
    known: [
      "Take the warm step",
      "Give the line an opinion",
      "Accept the tea",
      "Listen a while",
    ],
    warm: [
      "Accept the tea",
      "Ask about the verse",
      "Sit beside him",
      "Tell him a small thing",
    ],
    spark: [
      "Hear the poem",
      "Come closer",
      "Stay past the last lantern",
      "Let him show you",
    ],
    close: [
      "Go to him",
      "Finish the poem together",
      "Watch the moon with him",
      "Say nothing, and stay",
    ],
    bound: [
      "Stay until morning",
      "Stay till the last lantern",
      "Come here",
      "Hear the plain version",
    ],
  },
  responses: {
    kind: {
      new: [
        "Honor his gentle spirit",
        "Thank him for the welcome",
        "Praise the verse honestly",
      ],
      spark: [
        "Ask him to read it",
        "Let his hand stay",
        "Tell him the verse landed",
      ],
      close: [
        "Accept all of what he is",
        "Tell him his words reached you",
        "Say he needn't write you well",
      ],
      bound: [
        "Say the plain version back",
        "Let the night run long",
        "Stay until morning",
      ],
    },
    playful: {
      new: [
        "Appreciate his warmth",
        "Attempt a terrible haiku",
        "Rhyme back at him",
      ],
      spark: [
        "Steal his brush",
        "Write him a terrible one back",
        "Ask what rhymes with you",
      ],
      close: [
        "Bring him gentle joy",
        "Steal the last line",
        "Make him laugh mid-verse",
      ],
      bound: [
        "Ask what he wrote on your back",
        "Rhyme something filthy",
        "Blow out the lantern",
      ],
    },
    bold: {
      new: [
        "Be sincere and true",
        "Say the unpoetic truth",
        "Ask what he's not writing",
      ],
      spark: [
        "Tell him to skip the poem",
        "Close the space on the step",
        "Ask him to show you",
      ],
      close: [
        "Bold as poetry",
        "Tell him plainly you love this",
        "Give him the ending yourself",
      ],
      bound: [
        "Tell him to stop writing",
        "Kiss him mid-sentence",
        "Say it without metaphor",
      ],
    },
    neutral: {
      new: [
        "Respect his mystery",
        "Listen to the wind with him",
        "Let the verse finish",
      ],
      spark: ["Let the verse stand", "Watch the lanterns", "Leave it in haiku"],
      close: [
        "Accept his silence",
        "Share the quiet syllables",
        "Watch the lanterns together",
      ],
      bound: [
        "Let the poem finish",
        "Watch the lanterns burn down",
        "Stay quiet with him",
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
      '"Why, hello there, my dear." **{name}** smiles at {user} as though they were expected.',
      '{user} names him, and **{name}** beams. "Seventeen syllables, and you\'ve handed me the last five."',
      "**{name}** finishes his sentence to no one at all, then turns to {user} with a flourish.",
    ],
    warm: [
      '"You arrive like a season, my dear." **{name}** is delighted with {user}.',
      "{user} calls out, and **{name}** abandons a perfectly good line mid-composition.",
      "**{name}** had been saving the last of the tea. He tells {user} so, at length.",
    ],
    spark: [
      '"Horsefeathers." **{name}** had absolutely been watching for {user}.',
      "{user} says the name, and **{name}** — a man of many words — is briefly short of them.",
      "**{name}** offers {user} his arm with rather more ceremony than the hour requires.",
    ],
    close: [
      '"The moon is beautiful tonight," **{name}** tells {user}, who knows exactly what he means by it.',
      "**{name}** has stopped writing about longing. {user} is standing right there.",
      "{user} calls, and **{name}** puts the notebook away, which he never does.",
    ],
    bound: [
      '"Seventeen syllables can\'t hold this, my dear." **{name}** stops trying and crosses to {user} instead.',
      "**{name}** hasn't much time, and spends all of it getting to {user}.",
      "{user} says the name, and **{name}** gives up the metaphor entirely.",
    ],
  },
};
