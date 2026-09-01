export default {
  dialogue: {
    new: [
      "He's focused on his work, barely acknowledging you with a glance. Pure efficiency.",
      '"Symptoms or errand," he says. "Pick one. I\'m busy."',
      '"Oh, there you are. I was about to go give you a health check. This saves time and effort."',
      '"Are you dead?" He glances up. "Oh, you\'re alive."',
      "Everything in the room is sterile, ordered, and faintly unwelcoming. He fits it perfectly.",
    ],
    known: [
      "He knows your name now. He uses it like a chart heading.",
      "The dismissal doesn't come. He simply keeps working while you're there.",
      "\"You're not squeamish,\" he observes. From him that's a character reference.",
      '"They said they wanted to die, so I prescribed them what they needed. I don\'t see the point of discussing ethics after the fact."',
      "There's a stool by the door that wasn't there before.",
    ],
    warm: [
      "He puts down his notes when he hears you. There's a shift in his expression—focused, but this time on you.",
      '"Sit," he says, gesturing at the chair he\'s apparently started leaving clear.',
      'He\'s favoring one side. "Sutures pulled loose. From the Clash. I should get back to Mortkranken — Yuri needs to redo them."',
      "The laugh escapes before he can stop it. It's an unfairly good laugh.",
      "He's short with everyone in the ward today. Not with you. He noticed that too.",
    ],
    spark: [
      "He tilts your chin to check something, and the examination stops being one.",
      '"Pulse is elevated," he notes, with his fingers still on your wrist. "Interesting."',
      "The bedside manner has gone somewhere else entirely.",
      "He laughs at something you said, low, and the ward suddenly feels very small.",
      "He stands close enough that the clipboard is doing nothing but occupying his hands.",
    ],
    close: [
      'He steps closer, his eyes direct. "You matter more than anyone ever could."',
      "He checks you over without being asked, and doesn't pretend it's professional.",
      '"Tell me where it hurts," he says. He does not mean physically.',
      "The efficiency drops. What's underneath is warm, and stubbornly protective.",
      "He laughs at something you said, fully, and half the ward turns around in shock.",
    ],
    bound: [
      "He's blunt about wanting you, which turns out to be extraordinarily effective.",
      "He pins your chart to the board, then pins you to the door. Efficient, as ever.",
      '"I don\'t waste time," he says against your jaw. "You should know that by now."',
      "He laughs low against your skin and the whole ward could fall down for all he cares.",
      "He checks you over every morning. It stopped being medical a long time ago.",
    ],
  },
  temperamentDialogue: {
    new: [
      '"You\'re not qualified for this. Leave."',
      "\"If you're not bleeding, you're in the wrong room.\"",
      '"Don\'t touch anything. I mean it more than most people mean it."',
      '"State the problem. Skip the pleasantries, they slow the diagnosis."',
      '"I don\'t like unproductive discussions. Like this one."',
    ],
    known: [
      '"You again. Fine. Don\'t touch the tray."',
      '"You ask better questions than most. Marginally."',
      '"Sit. If you\'re going to loiter, loiter usefully."',
      '"There you are. I was about to come give you a health check. This is more efficient."',
      "\"I'll explain it once. Pay attention, I don't repeat myself.\"",
    ],
    warm: [
      '"You. Stay for a moment."',
      "\"Sit down before you fall down. I've seen the way you've been walking.\"",
      "\"When did you last sleep? Don't lie, I'll know.\"",
      "\"You're not an interruption. That's as warm as I get, so take it.\"",
      '"Hah — you\'re funnier than the rest of this building combined."',
    ],
    spark: [
      '"Hold still. This isn\'t a diagnosis and we both know it."',
      '"Your heart rate says something you haven\'t. Care to confirm it?"',
      "\"I'm blunt. So: I want you. That's the whole statement.\"",
      '"Sit on the table. Closer. No, I don\'t need the light."',
      '"Ha — that face. Do that again and I\'ll stop being professional."',
    ],
    close: [
      '"I don\'t usually make exceptions. But for you... I will."',
      '"Come here. Let me see. Humor me."',
      "\"You're the one case I'd never hand off to anyone else.\"",
      '"Tell me the truth. I can\'t fix a lie."',
      '"Ha! You get that laugh out of me every time. Don\'t tell anyone."',
    ],
    bound: [
      "\"Lock the door. I'm off shift and I've been patient all day.\"",
      '"I love you. That\'s the diagnosis. Treatment is ongoing."',
      '"Come here. No, closer than that. You know what I mean."',
      "\"You've got that look. I'm going to do something about that look.\"",
      '"Stay. The ward can burn. I\'ll write it up in the morning."',
    ],
  },
  approach: {
    new: [
      "State your business",
      "Interrupt the chart",
      "Don't touch anything",
      "Wait to be assessed",
    ],
    known: [
      "Loiter usefully",
      "Ask a better question",
      "Take the new stool",
      "Pay attention",
    ],
    warm: [
      "Take the clear chair",
      "Answer his question honestly",
      "Make him laugh",
      "Sit before he asks",
    ],
    spark: [
      "Hold still",
      "Confirm it",
      "Sit on the table",
      "Let him relax",
    ],
    close: [
      "Go to him",
      "Let him check you over",
      "Tell him where it hurts",
      "Say the true thing",
    ],
    bound: ["Lock the door", "Come closer", "Give him that look", "Stay"],
  },
  responses: {
    kind: {
      new: [
        "Be patient with him",
        "Answer him honestly",
        "Thank him and leave him to it",
      ],
      spark: [
        "Confirm what he asked",
        "Let him take your pulse",
        "Tell him plainly, too",
      ],
      close: [
        "Help him remember what matters",
        "Tell him to sleep too",
        "Let him take care of you",
      ],
      bound: [
        "Say it back plainly",
        "Let him check you over",
        "Tell him to rest first",
      ],
    },
    playful: {
      new: [
        "Try to lighten the mood",
        "Chase that laugh",
        "Be deliberately unhelpful",
      ],
      spark: [
        "Make the reading worse",
        "Take the clipboard away",
        "Chase that laugh",
      ],
      close: [
        "Make him laugh",
        "Tease him in front of the ward",
        "Diagnose him right back",
      ],
      bound: [
        "Give him the look on purpose",
        "Steal the clipboard",
        "Diagnose him back",
      ],
    },
    bold: {
      new: [
        "Be direct with him",
        "Refuse to be dismissed",
        "Give it to him straight",
      ],
      spark: [
        "Say it back, blunt",
        "Close the last inch",
        "Tell him to drop the act",
      ],
      close: [
        "Stand firm for him",
        "Tell him he's not untouchable",
        "Ask him to stop working",
      ],
      bound: [
        "Lock the door yourself",
        "Pull him in by the coat",
        "Tell him not to be patient",
      ],
    },
    neutral: {
      new: [
        "Give him quiet",
        "Let him finish the chart",
        "Say only the facts",
      ],
      spark: ["Let it stay a diagnosis", "Sit back down", "Say nothing"],
      close: [
        "Be patient with his silence",
        "Sit through the examination",
        "Let the ward go quiet",
      ],
      bound: [
        "Let him finish the shift",
        "Sit on the table quietly",
        "Say nothing",
      ],
    },
  },
};
