export default {
  dialogue: {
    new: [
      "He greets you with a charming smile, but there's something dangerous beneath the gentleman's facade.",
      "He takes your hand to bow over it before asking whether he may. He does ask. Afterward.",
      '"How delicate you look," he murmurs, in a room where he is by far the more dangerous thing.',
      "He is standing much too close for a first meeting, and entirely unbothered by that.",
      '"The most powerful vampire? No, those are just rumors." He smiles as if it amuses him.',
    ],
    known: [
      "The gentleman act is unchanged. The interest behind it is no longer performed.",
      '"You\'ve returned," he says, as though it were remarkable. To him it is.',
      "He's had a chair moved. He'll claim it was always positioned that way.",
      "\"Ah, there you are. I've a favor to ask of you — come to my room and I'll explain.\"",
      "The fragility slips for a moment. He lets it, and watches what you do.",
    ],
    warm: [
      "The fragile act drops for a moment when you're near—you see the predator underneath, and he lets you.",
      '"You\'ve stopped flinching," he observes, sounding thrilled and slightly put out.',
      'He winces, a hand at his ribs. "Oh, it hurts... I cannot seem to shake this ache in the place Rui touched me earlier. I think I\'ll rest a while."',
      "He offers his arm, then his coat, then a chair, in rapid succession. It's a lot.",
      "There's a glass poured for you already. It's your preference. He remembered.",
    ],
    spark: [
      "His gaze settles on your throat, and he takes rather too long to look away.",
      '"You do test a man\'s restraint," he murmurs, testing nothing at all.',
      "He kisses the back of your hand and lingers well past the century's etiquette.",
      "The fragile act is gone. What's left is old, hungry, and extremely well-mannered about it.",
      "He tilts his head, considering you, the way one considers something one intends to have.",
    ],
    close: [
      '"I\'ve been waiting lifetimes for someone who could see me like this," he says, pulling you close. "Don\'t leave me again."',
      "The theatrics finally exhaust themselves, and what's left is old, and lonely, and yours.",
      "He rests his forehead against yours and stops talking, which is unprecedented.",
      '"Everything I\'ve pretended to be," he says, "you saw past on the first night."',
      "He holds on a little too tightly. Neither of you comments on it.",
    ],
    bound: [
      "He asks before he bites, every time, and the asking is somehow worse.",
      '"Centuries," he murmurs against your throat, "and not one of them was this."',
      "He undresses you the way he does everything — slowly, and with immaculate manners.",
      "He keeps the curtains drawn well past dawn and blames the sun entirely.",
      "The gentleman is intact. What's under it has stopped pretending to be tame.",
    ],
  },
  temperamentDialogue: {
    new: [
      '"Oh my, what a lovely lady. Welcome to my home."',
      '"Do come in. I bite, but rarely without permission."',
      '"You mustn\'t wander Obscuary alone. Allow me — I insist."',
      '"How fragile you are. It\'s terribly charming."',
      '"I have no interest in harming humans. After all, they die so quickly. They should enjoy their short lives while they can."',
    ],
    known: [
      '"Back so soon? How wonderfully poor of your judgment."',
      '"I remember you. I remember everyone — but I remember you pleasantly."',
      "\"Do sit. I've had the chair moved. No, I've no idea why either.\"",
      "\"You've stopped looking for the exit. That's progress, lovely lady.\"",
      "\"I'm more or less confined to this house most days, for various reasons. I'm on my best behavior. But I'll do what I can to support you from the sidelines.\"",
    ],
    warm: [
      '"Lovely lady, I was hoping you\'d visit. Come closer."',
      '"You\'re not afraid of me anymore. How disappointing. How wonderful."',
      '"Sit — no, here, beside me. Personal space is a modern invention."',
      '"I poured this before you arrived. Call it optimism."',
      '"What did I do before Darkwick? I eked out a humble existence in Eastern Europe. Nothing worth the telling."',
    ],
    spark: [
      '"Come closer, lovely lady. I promise to behave. I make poor promises."',
      '"You know what I am. You keep standing there anyway. How flattering."',
      '"May I? Only your hand. ...For now."',
      '"I have restrained myself for a very long time. Do say if I needn\'t."',
      '"That pulse of yours is being terribly loud about all this."',
    ],
    close: [
      '"You belong right here, next to me. Don\'t ever leave."',
      '"I have outlived a great deal. I would rather not outlive this."',
      '"No performance tonight, lovely lady. Only me. Is that enough?"',
      '"Stay until dawn. Stay past it. I\'ll manage the curtains."',
      '"Come here. Closer. There — now the room is bearable."',
    ],
    bound: [
      '"May I? ...You always say yes. It undoes me every time."',
      '"I love you. I\'ve had a very long time to be certain of something."',
      '"Stay past dawn, lovely lady. I\'ll manage the curtains."',
      '"Come here. Let me be terribly, terribly improper about you."',
      '"You\'re mine and I am — rather more surprisingly — entirely yours."',
    ],
  },
  approach: {
    new: [
      "Let him take your hand",
      "Step into the candlelight",
      "Accept the invitation",
      "Don't flinch",
    ],
    known: [
      "Take the moved chair",
      "Stop looking for the exit",
      "Tell him about your week",
      "Let the act slip",
    ],
    warm: [
      "Take his arm",
      "Sit beside him",
      "Accept the poured glass",
      "Close the distance yourself",
    ],
    spark: [
      "Come closer",
      "Offer your hand",
      "Say he can let loose",
      "Stand there anyway",
    ],
    close: [
      "Go to him",
      "Let him hold on",
      "Stay past dawn",
      "Tell him you see him",
    ],
    bound: [
      "Say yes",
      "Stay past dawn",
      "Let him be improper",
      "Bare your throat",
    ],
  },
  responses: {
    kind: {
      new: [
        "Let him be gracious",
        "Accept the courtesy",
        "Thank him for the escort",
      ],
      spark: [
        "Offer your hand",
        "Tell him you're not frightened",
        "Take him at his word",
      ],
      close: [
        "Let him get closer",
        "Tell him he's not alone",
        "Say the act was never needed",
      ],
      bound: ["Say yes again", "Tell him he's yours too", "Let him ask"],
    },
    playful: {
      new: [
        "Keep him at bay playfully",
        "Out-charm the gentleman",
        "Pretend to swoon",
      ],
      spark: [
        "Test the restraint",
        "Make a poor promise back",
        "Withdraw the hand slowly",
      ],
      close: [
        "Flirt back with him",
        "Tease him about the theatrics",
        "Call him lovely first",
      ],
      bound: ["Make him ask twice", "Open the curtains", "Say no, then yes"],
    },
    bold: {
      new: [
        "Meet his gaze with strength",
        "Step closer instead of back",
        "Give him permission",
      ],
      spark: [
        "Tell him to let loose",
        "Tilt your head back",
        "Say you know what he is",
      ],
      close: [
        "Pull him closer yourself",
        "Tell him you're not leaving",
        "Say you'd stay lifetimes",
      ],
      bound: [
        "Bare your throat",
        "Tell him not to ask",
        "Pull him past the manners",
      ],
    },
    neutral: {
      new: [
        "Stay watchful",
        "Let him do the talking",
        "Keep your hand to yourself",
      ],
      spark: ["Withdraw your hand", "Let the moment cool", "Say nothing"],
      close: [
        "Let him watch in silence",
        "Stay through the quiet hour",
        "Let him hold on wordlessly",
      ],
      bound: ["Draw the curtains", "Let him wait", "Say nothing"],
    },
  },
};
