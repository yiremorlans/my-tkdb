export default {
  dialogue: {
    new: [
      'He\'s found the one quiet corner of the grounds and claimed it. You found him anyway. "Oh. Hey."',
      '"...Hey, you alive? Not much point me just standing here waiting around. Guess I\'ll take off."',
      '"Don\'t expect too much from me," he says, not moving from the step. "Ghouls are glorified street magicians, really. Let\'s keep it light."',
      "A slow nod, half a wave. That's the whole greeting, and it's more than most people get.",
      "\"What are you doing here? Don't tell me you've gotten yourself mixed up in something again.\"",
    ],
    known: [
      '"Oh, it\'s you." He doesn\'t get up, but he does set the phone down.',
      '"How\'s the hunt for clues about your curse going? Don\'t put too much pressure on yourself."',
      "He starts to say something, thinks better of it, and points you at the repairs list instead.",
      '"You keep turning up. I\'ve stopped bracing for it. ...That\'s a compliment, kind of."',
      "The wave comes half a second faster than it used to. He'd deny it.",
    ],
    warm: [
      "He shifts over on the step to make room, still not looking up. The space is for you.",
      "\"Zenji's off wandering again. People are raw this time of year — I wish he'd just stay put.\"",
      "He starts a sentence that was heading somewhere honest, then shrugs it off with a joke. You both notice.",
      '"Mornin\'. You\'ve got a sleep mark on your face. ...Good. Means you actually slept."',
      '"Made too much tea. You\'ll have to help me with it." He did not make too much tea by accident.',
    ],
    spark: [
      "You fall asleep against his shoulder. He stays put until his arm goes numb, and then a while longer.",
      "He takes your hand to steady you over a loose board, and then just... keeps it.",
      '"I had a whole thing I was going to say. You\'ve wrecked it. Again."',
      "The joke he'd normally hide behind doesn't come. He lets you watch him mean it.",
      '"For what it\'s worth — I like you. Don\'t make it a whole thing."',
    ],
    close: [
      '"I keep waiting for you to turn up," he admits, the easy deflection gone for a second. "More than I should."',
      "He says something that costs him, means every word of it, and then looks like he'd like to walk off into the twilight and not come back.",
      '"Would you —" He stops. Doesn\'t try again. Just moves a little closer instead.',
      "The lightness drops. What's underneath is very tired and very honest.",
      "He takes your hand, properly this time, and doesn't let go first.",
    ],
    bound: [
      "He's stopped keeping it light. Turns out there was a lot he'd been keeping light.",
      "He kisses you like a man who spent months talking himself out of it and finally quit arguing.",
      '"I keep meaning to play this cool," he says against your mouth. "Going badly."',
      "He works the knot of your collar loose with the patience of someone who's thought about it a great deal.",
      "The lazy calm is still there. It's just aimed entirely at you now.",
    ],
  },
  dialogueWhen: [
    {
      when: { time: "evening" },
      dialogue: {
        new: [
          '"You picked the right hour. Everything looks better once the lanterns are lit."',
          "He's on the steps watching the twilight come down. \"...Oh. It's you. Sit, if you want.\"",
          '"Grounds are quieter after dark. Fewer people, better light. Come on in."',
          '"Mind the path — the lanterns only pretend to light it. Watch your feet."',
        ],
        known: [
          "He's lit the path lanterns already, and left the brightest one on your side of the step.",
          '"You always turn up right as the light goes gold. I\'ve stopped calling it luck."',
          '"Walk you back to the gate? It\'s dark, and I\'m only half doing it to be nice."',
        ],
        warm: [
          '"The fireflies show off worse than I do after dark. ...Barely."',
          '"Stay while the lanterns hold out," he says. "They last a while, if you\'re asking."',
        ],
      },
    },
  ],
  approachWhen: [
    {
      when: { time: "evening" },
      approach: {
        new: ["Follow the lantern light in", "Take the step beside him"],
        known: ["Take the lit side of the step"],
        warm: ["Let him walk you to the gate"],
      },
    },
  ],
  temperamentDialogue: {
    new: [
      '"Well, look who wandered in. You lost, or is this on purpose?"',
      '"Come in if you\'re coming. The place bites less than the rumors say."',
      '"You\'ve got the look of someone with a story. Go on — I\'ve got nowhere to be."',
      '"Watch the path there. It forks bad, and you\'re a pain to find once you\'re lost."',
      "\"Haha. Don't expect too much from me. Let's keep it light, huh?\"",
    ],
    known: [
      '"Oh — you. ...Yeah, I was hoping it\'d be you."',
      '"You\'re around enough now that I\'ve stopped keeping count. That\'s rare, for me."',
      '"Walk you to the gate? Purely practical. ...Mostly."',
      '"I had something halfway clever to say and it\'s gone. Figures."',
      "\"How's the search for clues about your curse going? Don't put too much pressure on yourself.\"",
    ],
    warm: [
      "\"There you are. If you ever want to talk — the curse, anything — I'll listen.\"",
      '"I\'d say I wasn\'t waiting for you. ...Nah. I was."',
      '"You make it hard to stay unbothered. Take that as a compliment."',
      '"Walk with me a bit. The twilight\'s actually behaving tonight."',
      '"Hey, you\'re smiling at me. That\'s cheating."',
    ],
    spark: [
      '"Mind if I drop the polite act for a second? ...You look unfair tonight."',
      '"I\'ve spent years keeping everything light. Not really working right now."',
      '"If I lean any closer I\'ll have to explain myself. ...Want me to?"',
      '"Say something. Anything. You stay quiet and I\'ll do something reckless."',
      '"I\'m going to regret being this honest in about an hour. Let me have it now."',
    ],
    close: [
      '"I... you\'ve turned into someone I look forward to. That\'s not nothing, for me."',
      '"Let me say it before I talk myself out of it: I want you to stay."',
      "\"Stop looking at me like that. ...No. Don't. Keep doing that.\"",
      '"I\'ve spent my whole life keeping things light. You\'ve wrecked that completely."',
      '"Give me your hand. ...Yeah. I\'m going to be unbearable about this later."',
    ],
    bound: [
      '"This okay? ...You never say no. I\'ll be honest, I like that more than I should."',
      '"I love you. Got it out without stalling. You catch that? I caught that."',
      '"Stay. Let the dorm talk — I stopped minding a while back."',
      '"Come here and let me stop playing this cool."',
      '"I had a whole polite way of being about this. It\'s gone. Good riddance."',
    ],
  },
  approach: {
    new: [
      "Say hey back",
      "Sit on the step with him",
      "Ask what he's fixing",
      "Let the quiet sit",
    ],
    known: [
      "Take the cleared step",
      "Ask about the repairs",
      "Wait him out",
      "Bring up your curse",
    ],
    warm: [
      "Take the space beside him",
      "Call his bluff",
      "Take the tea",
      "Smile at him on purpose",
    ],
    spark: [
      "Stay leaned on him",
      "Keep his hand",
      "Let him mean it",
      "Watch the fireflies",
    ],
    close: [
      "Sit down hard beside him",
      "Tell him what's eating you",
      "Take his hand first",
      "Get in before he does",
    ],
    bound: ["Say yes", "Don't let go", "Stay over", "Pull him in"],
  },
  responses: {
    // kind is Haku's channel — low-key, unsentimental care he doesn't have to
    // perform anything back for (affinityByResponse.kind = 2). playful reaches
    // him too: deadpan and playing along with his fake-scares is his default
    // register, but it reads as his deflection more than a real bid, so it lands
    // softer (1). bold glances off (0) — he meets forwardness by keeping it
    // light and undercutting himself, so those moves read as the player pushing
    // and Haku stepping back rather than meeting it.
    kind: {
      new: ["Say you don't need anything", "Tell him to take it easy", "Just take the tea"],
      spark: ["Say it back, low-key", "Stay tucked against him", "Let him off the hook"],
      close: [
        "Say the repairs can wait",
        "Say you're staying",
        "Say you'd have waited",
      ],
      bound: ["Say it back", "Stay right where you are", "Let him hold on"],
    },
    playful: {
      new: [
        "Trade deadpan with him",
        "Call his fake-scare",
        "Rib him about filming Zenji",
      ],
      spark: [
        "Make him say it again",
        "Out-deadpan him",
        "Play along with the bit",
      ],
      close: [
        "Actually make him laugh",
        "Prank him back",
        "Steal his hoodie",
      ],
      bound: [
        "Fake-scare him for once",
        "Hog the whole step",
        "Say it back, deadpan",
      ],
    },
    bold: {
      new: [
        "Ask the blunt question",
        "Sit too close on purpose",
        "Put it right out there",
      ],
      spark: [
        "Say it first",
        "Close the last inch",
        "Don't let him keep it light",
      ],
      close: [
        "Name what this is",
        "Push him to stop hiding",
        "Say it before he does",
      ],
      bound: ["Pull him back down", "Kiss him mid-sentence", "Don't wait for him"],
    },
    neutral: {
      new: ["Let him be", "Watch the twilight with him", "Say nothing at all"],
      spark: ["Let the fireflies drift", "Move over", "Pretend you dozed off"],
      close: [
        "Be quiet with him",
        "Share the step in silence",
        "Let the twilight settle",
      ],
      bound: ["Let the lanterns burn down", "Stay still", "Drift back to sleep"],
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
      '"Oh. Hey." **{name}** doesn\'t get up. {user} still got it right.',
      "{user} says the name, and **{name}** considers faking a haunting about it. Decides against.",
      '"Don\'t expect much from me," **{name}** warns {user}, not moving from the step.',
    ],
    warm: [
      "**{name}** shifts over on the step. The space is for {user}.",
      '"I\'d say I wasn\'t waiting." **{name}** looks at {user}. "...Nah. I was."',
      "{user} calls out, and **{name}** starts a sentence that was heading somewhere honest.",
    ],
    spark: [
      "**{name}** hears his name and the deadpan slips for about a second. {user} caught it.",
      '"You make it hard to stay unbothered." **{name}** says it to {user} like a complaint.',
      "{user} got there first, and **{name}** stops pretending to be asleep.",
    ],
    close: [
      "**{name}** has stopped keeping it light. {user} calling his name did that.",
      '"Yeah, yeah. Coming." **{name}** is already up for {user}, which from him is a declaration.',
      "{user} calls, and **{name}** leaves the busted fixture exactly where it is.",
    ],
    bound: [
      '"I keep meaning to play this cool," **{name}** tells {user}. "Going badly."',
      "**{name}** crosses to {user} like a man who quit arguing with himself months ago.",
      "{user} says the name, and **{name}** doesn't deflect it. Not even a little.",
    ],
  },
};
