export default {
  // The level-up DMs (docs/bond-scene-dms.md). Haku deflects every sincere
  // thing said to him and spooks people to watch their faces, so his scenes are
  // built as a long failure to deflect: each level he tries the joke, and each
  // level it works a little less. He sees what nobody else can, and the last
  // thing he admits is that being the only one who sees is lonely.
  bondScenes: {
    acquaintance: {
      beats: [
        "**{firstName}**: hey. don't panic.\n\nthere's something standing behind you.\n\n...there isn't. couldn't resist. how'd you do?",
        "Okay, real reason. You walked through the Hotarubi hall today and stepped round something in the middle of the floor.\n\nThere is something in the middle of that floor. Has been for a long time. Nobody's ever stepped round it before: they walk straight through and get a headache and blame the weather.\n\nSo that's {timesMet} times you've been here and at least one of them you saw something. Or felt it. Either way I've been curious ever since and I'm too lazy to be curious for long, so I'm asking.",
      ],
      choice: {
        prompt: "Well? Was that just a coincidence?",
        options: [
          {
            key: "kind",
            label: "Say it just felt wrong",
            style: 3,
            close:
              "Yeah. That's how it starts.\n\nFor what it's worth, that's a decent instinct and I'd trust it.",
          },
          {
            key: "playful",
            label: "Ask if you passed the test",
            style: 1,
            close:
              "It wasn't a test.\n\n...it was completely a test. You did fine. Most people jump, which is honestly the best part of my week, so thanks for ruining it.",
          },
          {
            key: "bold",
            label: "Ask what's actually there",
            style: 4,
            close:
              "*There's a longer gap than the question deserves.*\n\nBelongs to someone who doesn't know they're finished, *he says.* That's all. It's not scary, it's just sad, and everyone would rather I said scary.",
          },
        ],
      },
      keepsake: {
        emoji: "🕯️",
        line: "The thing on the hall floor that you stepped round without knowing.",
      },
    },

    friend: {
      beats: [
        "**{firstName}**: okay observation time. don't look into it too much.",
        "You come back with {favResponse} every single time. Even when I've deflected. Especially when I've deflected, actually. You just wait it out and go again.\n\nEveryone else takes the joke and leaves. That's what the joke is for. It's a door I hold open so people can get out of a conversation they didn't want to be in.\n\nYou keep not going through it. It's starting to be a whole thing.",
      ],
      choice: {
        prompt:
          "So. What's the plan here. Do you have one or are you just like this.",
        options: [
          {
            key: "kind",
            label: "Say the door's still open",
            style: 3,
            close:
              "...huh.\n\nThat's annoyingly good. Give me a sec.\n\n*The sec is eleven minutes long.* Okay. Yeah. Leave it open then.",
          },
          {
            key: "playful",
            label: "Say you're just slow",
            style: 1,
            close:
              "You are not slow, and that's the problem.\n\nIt'd be so much easier if you were slow. I'd know exactly what to do with slow. I've got nothing for whatever this is.",
          },
          {
            key: "bold",
            label: "Tell him to stop deflecting",
            style: 4,
            close:
              "Can't. It's load-bearing.\n\n...I'll try. Not tonight. But I'll try, and you'll have to be really obvious about noticing, because I won't be.",
          },
        ],
      },
      keepsake: {
        emoji: "🚪",
        line: "A door held open that you kept declining to walk through.",
      },
    },

    closeFriend: {
      beats: [
        "**{firstName}**: you free? bring a coat. it's the roof and it's freezing and I'm not explaining over text.",
        "*He's already up there with two cans and a blanket he clearly brought for you, and he's looking at the far corner of the roof rather than at you.*\n\n> So there's a kid up here. Been here since before I arrived. Sits on that ledge every night and won't go, and I've tried everything and I'm out of ideas, and I come up and sit with her because that's all that's left.",
        "> Every night. Two years. Nobody knows.\n\n*He finally looks over.*\n\n> That's the actual thing about me, by the way. Not the medium stuff, not the shrine family, not the ghosts. It's that I come up here every night because if I don't, nobody does.\n\n> You're the first person I've told. I'd like it on record that I told you sober, so I can't take it back later.",
      ],
      choice: {
        prompt: "Right. Say something lazy so we can move on.",
        options: [
          {
            key: "kind",
            label: "Ask if you can come too",
            style: 3,
            close:
              "*He doesn't answer for a while. Just drinks.*\n\n> ...yeah.\n\n*he says eventually, at the ledge rather than at you.*\n\n> Yeah, come. She won't know. But I'll know.\n\n*You go, most nights, after that. He never once thanks you for it, which is how you know it matters.*",
          },
          {
            key: "playful",
            label: "Point out he brought a blanket",
            style: 1,
            close:
              "> That's mine.\n\n> ...it's not mine, I bought it Tuesday, it's still got the tag on. Shut up. Put it on, you're shaking.",
          },
          {
            key: "bold",
            label: "Ask why he never gave up",
            style: 4,
            close:
              "> Because everyone in my family gave up on the ones that were hard.\n\n*Flat. No performance in it at all, which for Haku is unheard of.*\n\n> That's the whole answer. I'm not a good person, I'm just a really stubborn one about exactly one thing.",
          },
        ],
      },
      keepsake: {
        emoji: "🧣",
        line: "A blanket bought on Tuesday with the tag still on.",
      },
    },

    confidant: {
      beats: [
        "**{firstName}**: my family sent a letter. first one in three years. thought you should know before I do something stupid with it.",
        "Kusanagi shrine. Long line of mediums, big house, lot of expectations. I was the strongest one they'd produced in four generations and they were *thrilled* to see the back of me.\n\nNot disappointed. Thrilled. There's a difference and I've had a long time to work it out. I saw the wrong things and said so out loud, and it turns out a family business runs better when the medium tells people what they want.",
        "So they sent me here and told everyone it was an honor, and the letter's asking when I'm coming back to be useful.\n\nI've read it eleven times. I keep waiting to feel something about it. Nothing's arriving, and that's worse than if it did.\n\nAnyway. That's the most I've ever said about myself in one go. I'd like to formally blame you for it.",
      ],
      choice: {
        prompt:
          "Don't tell me to burn it. Everyone tells me to burn it. I like having it, that's the embarrassing part.",
        options: [
          {
            key: "kind",
            label: "Say you'll read it with him",
            style: 3,
            close:
              "...that's not one of the options I'd prepared for.\n\n*A long pause.*\n\nRoof. Bring the blanket. I'll read it out loud and you can tell me if I'm allowed to feel anything about it, because apparently I've stopped being able to tell.",
          },
          {
            key: "playful",
            label: "Offer to write the reply",
            style: 1,
            close:
              "God, please. Make it really formal and completely unhinged.\n\nActually don't. If you write it I'll send it, and then I'll have sent it, and I'm not ready for the version of me who sends it.",
          },
          {
            key: "bold",
            label: "Tell him he's not going back",
            style: 4,
            close:
              "You don't get to decide that.\n\n*Then, almost immediately:* sorry. that was... yeah. sorry.\n\nSay it again. I'm not going to argue this time. I just want to hear somebody say it who isn't me at 4am.",
          },
        ],
      },
      keepsake: {
        emoji: "✉️",
        line: "A letter read eleven times, waiting for a feeling to arrive.",
      },
    },

    devoted: {
      beats: [
        "**{firstName}**: don't freak out. you're fine. I need you to not freak out.",
        "There was something following you back from the east wing tonight. Not a big one, it wasn't going to do anything, they mostly don't, but it had picked you and it was going to keep picking you.\n\nSo I dealt with it. Properly, the shrine way, the way I swore I was never doing again because of who taught it to me.",
        "It took about four hours and it hurt in a way I'd genuinely forgotten about, and I'd have done it if it took four days.\n\nI'm telling you because I don't want to be someone who quietly does things for you and lets you think the world is easier than it is. That's my dad's whole personality and I'd rather die.\n\nAlso I'm knackered and slightly emotional and it's five in the morning, so, you know. Grain of salt.",
      ],
      choice: {
        prompt: "Go on then. Have a go at me. I've earned at least one.",
        options: [
          {
            key: "kind",
            label: "Ask if he's okay",
            style: 3,
            close:
              "...nobody asks that.\n\nEveryone asks if it's gone. Nobody's ever asked the other thing.\n\n*A long gap.*\n\nNo. Not really. Can you come up. You don't have to say anything, I just don't want to be on this roof by myself tonight.",
          },
          {
            key: "playful",
            label: "Say that sounds like effort",
            style: 1,
            close:
              "It was SO much effort. It was the most effort I've made since I got here.\n\nDon't tell Subaru. He'll want to talk about it. I would rather be followed by the thing.",
          },
          {
            key: "bold",
            label: "Go up to the roof",
            style: 4,
            close:
              "*He's flat on his back on the concrete when you get there, gray, done in, arm over his eyes.*\n\n*He doesn't sit up. He just moves over about six inches and says,*\n\n> if you're going to lie down do it now, I'm not doing the being-brave thing tonight.\n\n*You lie down. He puts his head against your shoulder and is asleep in ninety seconds, and doesn't move until it's light.*",
          },
        ],
      },
      keepsake: {
        emoji: "⏳",
        line: "Four hours of something he swore he'd never do again.",
      },
    },

    soulbound: {
      beats: [
        "**{firstName}**: I'm going to say this badly and I'm not going to make a joke at the end of it, which is going to take everything I've got.",
        "{timesMet} times. And I've had the deflection ready every single one of them: the door, the bit, the thing behind you. It's automatic. It's been automatic since I was nine.\n\nIt stopped working on you somewhere around the middle and I've been running it anyway, out of pure cowardice, which you've very kindly pretended not to notice.",
        "Here's the thing about being the only one who sees. Everyone thinks it's frightening. It's not frightening, it's lonely: you're in a room full of people and there's a whole other room and you're the only one in it.\n\nYou came into the other room. You didn't even make a thing of it. You just started stepping round stuff on the floor and sitting on a freezing roof with a kid you can't see.",
        "So: I love you.\n\nNo bit. No door. I love you and I've loved you since the roof and probably before it, and I've been half-arsing every conversation we've had since because half-arsing it is the only way I know how to survive meaning something.\n\nThat's it. That's the whole message. God, this is awful.",
      ],
      choice: {
        prompt:
          "Take your time. I'm extremely lazy, I'll wait forever, it's genuinely no effort.",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close:
              "...say it again but with the joke removed. I've put a joke in on your behalf and I need to hear it without one.\n\n*You say it again.*\n\n*The reply is just:* roof. now. *And he's standing when you get up there for once, not lying down, not looking at the ledge, looking straight at you, and he kisses you like a man finally putting down something he's carried up a lot of stairs.*",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close:
              "Yeah. Course. That's... yeah, take it.\n\n*A pause. No joke arrives, which is how you know he means it.*\n\nI'm going to be on the roof at midnight regardless. That was true before tonight and it'll be true after. Nothing I said changes what that is.\n\nAnd if you never bring it up again, I won't either. I'm world-class at not bringing things up. It's basically my only skill.\n\n*He's up there every night. He never brings it up. He always moves over six inches.*",
          },
        ],
      },
      keepsake: {
        emoji: "📧",
        line: "A whole confession with no joke at the end of it.",
      },
    },
  },
  dialogue: {
    new: [
      'He\'s found the one quiet corner of the grounds and claimed it. You found him anyway. "Oh. Hey."',
      '"...Hey, you alive? Not much point me just standing here waiting around. Guess I\'ll take off."',
      '"Don\'t expect too much from me," he says, not moving from the step. "Ghouls are glorified street magicians, really. Let\'s keep it light."',
      "A slow nod, half a wave. That's the whole greeting, and it's more than most people get.",
      "\"What are you doing here? Don't tell me you've gotten yourself mixed up in something again.\"",
    ],
    known: [
      "\"Oh, it's you.\" He doesn't get up, but he does set the phone down.",
      "\"How's the hunt for clues about your curse going? Don't put too much pressure on yourself.\"",
      "He starts to say something, thinks better of it, and points you at the repairs list instead.",
      "\"You keep turning up. I've stopped bracing for it. ...That's a compliment, kind of.\"",
      "The wave comes half a second faster than it used to. He'd deny it.",
    ],
    warm: [
      "He shifts over on the step to make room, still not looking up. The space is for you.",
      "\"Zenji's off wandering again. People are raw this time of year. I wish he'd just stay put.\"",
      "He starts a sentence that was heading somewhere honest, then shrugs it off with a joke. You both notice.",
      "\"Mornin'. You've got a sleep mark on your face. ...Good. Means you actually slept.\"",
      '"Made too much tea. You\'ll have to help me with it." He did not make too much tea by accident.',
    ],
    spark: [
      "You fall asleep against his shoulder. He stays put until his arm goes numb, and then a while longer.",
      "He takes your hand to steady you over a loose board, and then just... keeps it.",
      '"I had a whole thing I was going to say. You\'ve wrecked it. Again."',
      "The joke he'd normally hide behind doesn't come. He lets you watch him mean it.",
      "\"For what it's worth, I like you. Don't make it a whole thing.\"",
    ],
    close: [
      '"I keep waiting for you to turn up," he admits, the easy deflection gone for a second. "More than I should."',
      "He says something that costs him, means every word of it, and then looks like he'd like to walk off into the twilight and not come back.",
      '"Would you..." He stops. Doesn\'t try again. Just moves a little closer instead.',
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
          '"Mind the path, the lanterns only pretend to light it. Watch your feet."',
        ],
        known: [
          "He's lit the path lanterns already, and left the brightest one on your side of the step.",
          '"You always turn up right as the light goes gold. I\'ve stopped calling it luck."',
          "\"Walk you back to the gate? It's dark, and I'm only half doing it to be nice.\"",
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
      "\"You've got the look of someone with a story. Go on, I've got nowhere to be.\"",
      "\"Watch the path there. It forks bad, and you're a pain to find once you're lost.\"",
      "\"Haha. Don't expect too much from me. Let's keep it light, huh?\"",
    ],
    known: [
      '"Oh, you. ...Yeah, I was hoping it\'d be you."',
      "\"You're around enough now that I've stopped keeping count. That's rare, for me.\"",
      '"Walk you to the gate? Purely practical. ...Mostly."',
      '"I had something halfway clever to say and it\'s gone. Figures."',
      "\"How's the search for clues about your curse going? Don't put too much pressure on yourself.\"",
    ],
    warm: [
      '"There you are. If you ever want to talk (the curse, anything), I\'ll listen."',
      "\"I'd say I wasn't waiting for you. ...Nah. I was.\"",
      '"You make it hard to stay unbothered. Take that as a compliment."',
      '"Walk with me a bit. The twilight\'s actually behaving tonight."',
      "\"Hey, you're smiling at me. That's cheating.\"",
    ],
    spark: [
      '"Mind if I drop the polite act for a second? ...You look unfair tonight."',
      '"I\'ve spent years keeping everything light. Not really working right now."',
      '"If I lean any closer I\'ll have to explain myself. ...Want me to?"',
      '"Say something. Anything. You stay quiet and I\'ll do something reckless."',
      '"I\'m going to regret being this honest in about an hour. Let me have it now."',
    ],
    close: [
      "\"I... you've turned into someone I look forward to. That's not nothing, for me.\"",
      '"Let me say it before I talk myself out of it: I want you to stay."',
      '"Stop looking at me like that. ...No. Don\'t. Keep doing that."',
      "\"I've spent my whole life keeping things light. You've wrecked that completely.\"",
      '"Give me your hand. ...Yeah. I\'m going to be unbearable about this later."',
    ],
    bound: [
      '"This okay? ...You never say no. I\'ll be honest, I like that more than I should."',
      '"I love you. Got it out without stalling. You catch that? I caught that."',
      '"Stay. Let the dorm talk. I stopped minding a while back."',
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
    // him too: deadpan and playing along when he spooks you is his default
    // register, but it reads as his deflection more than a real bid, so it lands
    // softer (1). bold glances off (0) — he meets forwardness by keeping it
    // light and undercutting himself, so those moves read as the player pushing
    // and Haku stepping back rather than meeting it.
    kind: {
      new: [
        "Say you don't need anything",
        "Tell him to take it easy",
        "Just take the tea",
      ],
      spark: [
        "Say it back, low-key",
        "Stay tucked against him",
        "Let him off the hook",
      ],
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
        "Refuse to be spooked",
        "Rib him about filming Zenji",
      ],
      spark: [
        "Make him say it again",
        "Out-deadpan him",
        "Play along with the bit",
      ],
      close: ["Actually make him laugh", "Prank him back", "Steal his hoodie"],
      bound: [
        "Spook him for once",
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
      bound: [
        "Pull him back down",
        "Kiss him mid-sentence",
        "Don't wait for him",
      ],
    },
    neutral: {
      new: ["Let him be", "Watch the twilight with him", "Say nothing at all"],
      spark: ["Let the fireflies drift", "Move over", "Pretend you dozed off"],
      close: [
        "Be quiet with him",
        "Share the step in silence",
        "Let the twilight settle",
      ],
      bound: [
        "Let the lanterns burn down",
        "Stay still",
        "Drift back to sleep",
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
      '"Oh. Hey." **{name}** doesn\'t get up. {user} still got it right.',
      '{user} says the name, and **{name}** glances at something over their shoulder. "...Ignore that."',
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
