export default {
  dialogue: {
    new: [
      'He flashes a big grin. "Lost, or just brave enough to wander into Frostheim?"',
      "Something crashes two rooms over. He jogs out, sees you, and forgets the crash entirely.",
      "He's mid-rant about something leaked on WickHive. You've just become the audience.",
      'He waves so hard he nearly takes out a lamp. "Hey! Hey, over here!"',
      "He spots you and brightens. \"You're new? Ask me anything you want to know — I'm pretty savvy when it comes to Darkwick.\"",
    ],
    known: [
      "He remembers your name and is far too pleased about it.",
      '"Hey — you! The one from the — yeah! You!"',
      "He tells you the same story twice and doesn't notice. You don't stop him.",
      "He's mid-dodge around a corner. \"Shit, it's Luca — he's going to train, I better bail before he ropes me in too... Oh. Just you. Phew.\"",
      "You've been upgraded from stranger to person Kaito yells at cheerfully.",
    ],
    warm: [
      "He nudges your shoulder like you're part of the Frostheim crew.",
      "He's already saved you a spot, and he's very obviously proud of himself for it.",
      '"There you are!" — like you\'d been the missing piece of his afternoon.',
      "He talks faster when you show up. Everyone in the room has noticed. He hasn't.",
      "He's rehearsing something to say to you, badly, when you walk in on him doing it.",
    ],
    spark: [
      "He goes bright red mid-sentence and forgets what the sentence was.",
      "He grabs your hand to drag you somewhere, then forgets to let go.",
      '"You\'re — okay, this is going to sound weird — you look really good today."',
      "He's rehearsing something in the corner. It's about you. It's going badly.",
      "He catches you when you stumble and doesn't set you back down immediately.",
    ],
    close: [
      '"Took you long enough," he grins, pulling you into a quick shoulder-bump hug.',
      "The grin drops for half a second — relief — before it comes roaring back.",
      "He starts talking mid-sentence, like the conversation never actually stopped.",
      '"Okay, don\'t laugh," he says, already laughing, "but I missed you."',
      "He'd been watching the door. He'll deny it. He was.",
    ],
    bound: [
      "He kisses you mid-sentence and forgets the sentence completely.",
      "He wakes you by being unable to stop looking at you, loudly, somehow.",
      "\"I still can't believe it's you,\" he says, tucked against your shoulder.",
      "He lifts you clean off the ground because he can and because you laughed.",
      "He's still red about all of it. He's never once wanted it to stop.",
    ],
  },
  dialogueWhen: [
    {
      when: { time: "evening" },
      dialogue: {
        new: [
          "He's still in his training gear well after dark, breath fogging, hours past when he should have stopped.",
          '"You\'re out late — everything okay?" He relaxes when you nod. "Good. Stick to the lit paths."',
          "He's doing slow laps of the balcony in the dark and waves you over rather than break the rhythm.",
          '"It\'s late to be out here," he says. "Let me walk you back after, okay?"',
        ],
        known: [
          '"Night training," he says, a little sheepish. "You can spot me, if you want."',
          '"I always end up out here after curfew. It\'s quieter. Easier to think."',
          '"You should be inside by now," he says. "...So should I. Five more minutes."',
        ],
        warm: [
          '"Stay for a bit. It\'s cold, but the view\'s worth it after dark."',
          '"I kept hoping you\'d come by tonight," he admits. "Glad I waited."',
        ],
      },
    },
  ],
  approachWhen: [
    {
      when: { time: "evening" },
      approach: {
        new: ["Spot his night training", "Wave and fall into his laps"],
        known: ["Stay past curfew with him"],
        warm: ["Take the cold rail beside him"],
      },
    },
  ],
  temperamentDialogue: {
    new: [
      '"YO! Another fresh face! You lost or what?"',
      '"Whoa, hi! Careful, that step\'s — ah. Yeah. Everyone does that."',
      "\"You're new, right? I'm Kaito! That's — that's the whole intro, sorry.\"",
      '"Ask me anything you want to know! I\'m pretty savvy when it comes to Darkwick."',
      "\"Don't let the ice scare you off, it's not that bad once you're used to it!\"",
    ],
    known: [
      '"Hey, I know you! You\'re the one who — okay, I forgot. But I know you!"',
      '"You keep showing up. I like that in a person."',
      "\"Oh yeah, have you been on WickHive yet? Someone leaked next month's cafeteria menu! Oh.. wait, I-I already told you that, didn't I?\"",
      "\"You're getting the hang of this place, huh? Told you it wasn't so bad.\"",
      '"Okay, quiz — what\'s my name? HA! Correct!"',
    ],
    warm: [
      '"Hey, Honor roll! Ready to hang out?"',
      '"There you are! I was JUST thinking about you. Weird, right?"',
      '"Perfect timing — I need somebody to back me up on something."',
      "\"You free? Say you're free. Please say you're free.\"",
      "\"They want me on another mission... it's not like me being there helps anyone. But you showing up? That part's good.\"",
    ],
    spark: [
      "\"Okay so — don't laugh — I've been thinking about you. A lot. That's it. That's the thing.\"",
      '"Why\'re you looking at me like that?! ...Do it again."',
      "\"I'm not blushing! It's warm in here! It's Frostheim, I KNOW, shut up!\"",
      '"Can I — is it okay if I hold your hand? Cool. Cool cool cool."',
      '"You make it really hard to think straight, you know that?"',
    ],
    close: [
      '"You made it! I was hoping you\'d show up!"',
      '"Hey. Hey. Come here — no, seriously, come here."',
      '"I saved you the good seat. Don\'t make it weird, just take it."',
      '"Whatever you were doing? It can wait. You\'re here now."',
      "\"I don't say this a lot, but... yeah. Really glad it's you.\"",
    ],
    bound: [
      '"C\'mere. No reason. Okay, one reason. Come HERE."',
      "\"I got you something. It's dumb. I'm giving it to you anyway.\"",
      '"Five more minutes. Five. Then five more. Don\'t argue."',
      "\"You're stuck with me, y'know that? Like, permanently.\"",
      "\"I love you. That's it, that's the whole announcement, you can go now. Don't go.\"",
    ],
  },
  approach: {
    new: [
      "Wave back",
      "Follow the noise",
      "See what he's up to",
      "Say hi before he explodes",
    ],
    known: [
      "Let him remember you",
      "Hear the story again",
      "Wave back",
      "Stick around",
    ],
    warm: [
      "Take the seat he saved",
      "Bump his shoulder back",
      "Jump into the story",
      "Match his grin",
    ],
    spark: [
      "Take his hand",
      "Let him catch you",
      "Make it worse on purpose",
      "Hear him out",
    ],
    close: [
      "Go get your hug",
      "Answer him mid-sentence",
      "Let him drag you along",
      "Tell him you missed him too",
    ],
    bound: [
      "Go to him",
      "Five more minutes",
      "Say it back",
      "Let him lift you",
    ],
  },
  responses: {
    kind: {
      new: [
        "Celebrate with his enthusiasm",
        "Tell him he's doing great",
        "Let him show off a little",
      ],
      spark: [
        "Tell him he did fine",
        "Squeeze his hand back",
        "Let him say it badly",
      ],
      close: [
        "See past his bravado",
        "Tell him he's enough as he is",
        "Notice the part he hides",
      ],
      bound: ["Say it back", "Stay the five minutes", "Let him hold on"],
    },
    playful: {
      new: [
        "Get swept up in his energy",
        "Out-shout him",
        "Bet him he can't",
      ],
      spark: [
        "Make him blush harder",
        "Repeat it back to him",
        "Refuse to let go",
      ],
      close: [
        "Laugh with his whole heart",
        "Start the trouble yourself",
        "Ruin his big dramatic moment",
      ],
      bound: [
        "Make him say it louder",
        "Refuse to get up",
        "Give the dumb gift back",
      ],
    },
    bold: {
      new: [
        "Go along for the ride",
        "Say yes before he finishes",
        "Dare him to prove it",
      ],
      spark: [
        "Say it for him",
        "Pull him closer",
        "Tell him he's on your mind",
      ],
      close: [
        "Embrace the chaos together",
        "Pull him along for once",
        "Tell him you'd follow anywhere",
      ],
      bound: [
        "Kiss him mid-sentence",
        "Say it first this time",
        "Tell him he's stuck too",
      ],
    },
    neutral: {
      new: ["Just listen", "Let him run out of steam", "Nod along"],
      spark: ["Let him flail", "Let go first", "Pretend you didn't hear"],
      close: [
        "Be his calm",
        "Sit through the quiet part",
        "Let him catch his breath",
      ],
      bound: [
        "Let him ramble",
        "Stay quiet and close",
        "Let the morning be slow",
      ],
    },
  },
};
