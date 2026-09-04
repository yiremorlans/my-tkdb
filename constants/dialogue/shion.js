export default {
  // The level-up DMs (docs/bond-scene-dms.md). One of the six volatile
  // characters — see docs/negative-affinity-enemies-to-lovers.md. Shion does not
  // warm up; he narrows. Short flat sentences, the Irish lilt, gruesome imagery
  // offered as affection, and "my wife" from the very first message because he
  // decided a long time before you did.
  //
  // The intimacy here is not softening — it is him letting you say no and
  // staying anyway. Every choice keeps a door open on your side, because a
  // yandere scene that removes the player's out is not romance, it's a trap.
  // His hangout is the Heebie-Jeebie House and it is never called anything else.
  bondScenes: {
    acquaintance: {
      beats: [
        "**{firstName}**: \"Found your number.\"\n\n\"Didn't ask. Wasn't going to ask. You'd have said yes anyway so it's the same thing, isn't it.\"",
        "\"You've come by {timesMet} times. I counted every one. I count everything about you.\"\n\n\"Mio says that's a lot. Mio says a lot of things.\"\n\n\"Come to the Heebie-Jeebie House some night. It's dark and it's cold and folk scream in there, which is the best bit. You'd not scream, though. I've watched. You don't do the face.\"",
      ],
      choice: {
        prompt: "\"Say yes.\"",
        options: [
          {
            key: "kind",
            label: "Say yes",
            style: 3,
            close: "\"Aye. Knew you would.\"\n\n*A pause.*\n\n\"...Wanted you to say it anyway. That's different from knowing. Didn't know that till just now.\"",
          },
          {
            key: "playful",
            label: "Ask what's in there",
            style: 1,
            close: "\"Me, mostly.\"\n\n\"And a thing in the back I've not named yet. It's got too many bits. You'll like it or you'll not, and either's fine, 'cause you'll still be stood next to me.\"",
          },
          {
            key: "bold",
            label: "Tell him to ask properly",
            style: 4,
            close: "*A long gap. Longer than he's ever left anything.*\n\n\"...Will you come.\"\n\n*Then, immediately after:* \"That was horrible. Don't make me do it again.\"\n\n*He makes himself do it again, every time, after that.*",
          },
        ],
      },
      keepsake: {
        emoji: "🕷️",
        line: "The first thing he ever asked for instead of taking.",
      },
    },

    friend: {
      beats: [
        '**{firstName}**: "You do the same thing every time. You come at me with {favResponse}. Never changes."',
        "\"Folk change round me. They go quiet or they go loud or they go away. Three flavors, that's the lot, I've had them all since I was wee.\"\n\n\"You've got a fourth one. You just stay the same. Same voice, same face, whatever I say to you.\"\n\n\"I've been trying to make it stop for weeks now. Said worse and worse things. You've not budged.\"",
      ],
      choice: {
        prompt: "\"Why won't you budge.\"",
        options: [
          {
            key: "kind",
            label: "Say you're not frightened",
            style: 3,
            close: "\"You should be.\"\n\n*A pause.*\n\n\"...Don't be, though. Stay like that. It's the only quiet I get.\"",
          },
          {
            key: "playful",
            label: "Say his worst wasn't much",
            style: 1,
            close: "\"That wasn't my worst.\"\n\n\"...It was a bit. I've been holding back, which I've never done, and I'm cross about it.\"",
          },
          {
            key: "bold",
            label: "Tell him to stop testing",
            style: 4,
            close: "\"Can't.\"\n\n*Then:* \"Everyone goes eventually. Testing's how I find out when. If I stop testing then it just happens one day and I've not seen it coming.\"\n\n\"That's the whole of it. Don't be soft about it, I'll not know what to do.\"",
          },
        ],
      },
      keepsake: {
        emoji: "🕸️",
        line: "The fourth thing people do, that only you do.",
      },
    },

    closeFriend: {
      beats: [
        '**{firstName}**: "Come out the back of the House. Now. It\'s not a scary one."',
        "*It's the back garden, which nobody knows about, and there is a small dreadful creature in a box that he has clearly been keeping alive for some time.*\n\n\"That's mine. Been mine two years. Doesn't have a name 'cause names are for things that leave.\"",
        "*He sits down on the wet ground next to the box without checking whether you'll follow, and you do, and he goes very still about it.*\n\n\"Mio doesn't come out here. Jo doesn't. Elias knows and pretends he doesn't, which is the nicest thing anyone's done for me.\"\n\n\"You're sat in it. In the wet. Didn't even do the face about the wet.\"\n\n*After a while, without looking over:* \"You can name it. If you want. Then it'll be a thing that stays.\"",
      ],
      choice: {
        prompt: "\"Go on then. Name it.\"",
        options: [
          {
            key: "kind",
            label: "Give it a name",
            style: 3,
            close: "*He repeats it twice, flat, testing the shape of it.*\n\n\"...Aye. That'll do.\"\n\n*Then he leans over sideways until his head is on your shoulder, all his weight, no warning at all, and stays there in the wet until it starts getting light.*",
          },
          {
            key: "playful",
            label: "Say it's got too many bits",
            style: 1,
            close: "\"It has! It has too many bits!\"\n\n*He's delighted. It's the loudest you've ever heard him.*\n\n\"Mio said that. Mio said it and then wouldn't look at it again. You said it and you're still sat here.\"",
          },
          {
            key: "bold",
            label: "Ask why names mean leaving",
            style: 4,
            close: "*He doesn't answer for a long time.*\n\n\"'Cause I named my mam,\" *he says finally, at the box.* \"That's all. Don't ask the next bit.\"\n\n*Then, quieter:* \"Name it anyway. I want to find out if it works different with you.\"",
          },
        ],
      },
      keepsake: {
        emoji: "🐛",
        line: "A name given to something that had gone two years without one.",
      },
    },

    confidant: {
      beats: [
        "**{firstName}**: \"Can't sleep. Hate the night. It's hot and it hurts and it's hard to breathe.\"",
        "\"Nobody knows that. They think I like the dark 'cause of the House. I don't. I'm in the House 'cause it's the only place the night's got a door on it and I'm the one holding the door.\"\n\n\"Mio thinks I'm asleep. I let him think it. He's been carrying me since he was wee and he'd carry that too and I'll not let him.\"",
        "\"Blood's a shackle. Family's the ones that stay when they've no cause to. Mio's family. Jo is. Elias is, mostly.\"\n\n\"You didn't have to be. That's the bit I keep chewing on. Everyone else got put next to me. You just kept turning up.\"\n\n\"I've been awake since two thinking about that and it's better than thinking about the night, so.\"",
      ],
      choice: {
        prompt: "\"Talk at me till it's light. Don't care what about.\"",
        options: [
          {
            key: "kind",
            label: "Stay up and talk to him",
            style: 3,
            close: "*You talk about nothing. He answers about a third of it.*\n\n*At five he sends:* \"It's getting light.\"\n\n*Then:* \"Do that again tomorrow. And the one after. Don't stop doing it. Please.\"\n\n*That last word is the first time you've seen him use it.*",
          },
          {
            key: "playful",
            label: "Threaten him with a lullaby",
            style: 1,
            close: "\"That's *my* one. You've stolen my one.\"\n\n*A gap.*\n\n\"...Sing it, then. Go on. You mightn't ever get me to admit it helped, mind.\"",
          },
          {
            key: "bold",
            label: "Tell him to tell Mio",
            style: 4,
            close: "\"No.\"\n\n*Flat, immediate, and then nothing for four minutes.*\n\n\"He's got enough. He's had enough since he was seven years old and it was my job to be the big one and I've never once managed it.\"\n\n\"You're not to tell him either. Say you'll not tell him.\"\n\n*You say it. He goes quiet, and then:* \"Right. Good. That's us, then.\"",
          },
        ],
      },
      keepsake: {
        emoji: "🏚️",
        line: "The reason he's really always in the Heebie-Jeebie House.",
      },
    },

    devoted: {
      beats: [
        '**{firstName}**: "Who was that."\n\n"In the courtyard. The one that touched your arm. Who was that."',
        "*You tell him. It's nothing. It was nothing.*\n\n\"Aye. Alright.\"\n\n*Then, four minutes later:*\n\n\"I'll remember his face, though. I remember all their faces. Got a whole lot of them up here and none of them know it.\"",
        "\"Here's the bit I'm meant to not say, so I'm saying it.\"\n\n\"I'd do something about it. I want to. I've thought about the exact shape of it, sat here, for about an hour, and it's a lovely shape.\"\n\n\"And I'm not going to. 'Cause you'd look at me different after and I've worked out that's the one thing I can't take. So you tell me to leave it and I'll leave it, and that's the first time in my life a thing's ever stopped 'cause somebody said.\"",
      ],
      choice: {
        prompt: "\"Go on. Tell me to leave it.\"",
        options: [
          {
            key: "kind",
            label: "Tell him to leave it",
            style: 3,
            close: "\"...Right.\"\n\n*A long pause.*\n\n\"Left. It's left. That's it done.\"\n\n*Then, much later:* \"Come here after, though. I've been holding it a good while and I've gone all wrong with it.\"\n\n*He doesn't say a word when you get there. He just puts his forehead against your shoulder and breathes for about twenty minutes.*",
          },
          {
            key: "playful",
            label: "Ask about the lovely shape",
            style: 1,
            close: "\"You don't want to know.\"\n\n\"...You do want to know. That's worse. That's so much worse and I like you so much.\"\n\n\"I'll not tell you. Not 'cause of the shape. 'Cause you'd laugh and then I'd do it.\"",
          },
          {
            key: "bold",
            label: "Say you'd still look at him",
            style: 4,
            close: "*There is nothing for a very long time.*\n\n\"Don't say that.\"\n\n\"That's the only thing keeping the door shut and you've gone and said it. Take it back.\"\n\n*Then, after another minute:* \"Don't take it back. Say it again. Say it every time and I'll keep the door shut myself, and that'll be me doing it, not you.\"",
          },
        ],
      },
      keepsake: {
        emoji: "🔒",
        line: "The first thing he ever stopped because somebody asked.",
      },
    },

    soulbound: {
      beats: [
        '**{firstName}**: "I\'ve called you my wife since about the second time I saw you."\n\n"Everyone thinks that\'s a joke. It\'s never once been a joke."',
        "\"{timesMet} times. I've had the number since it was four.\"\n\n\"And every one of them I've been waiting for the day you'd stop. That's not a sad thing, it's just the shape of it. Folk stop. My mam stopped. It's arithmetic.\"",
        "\"You've not stopped.\"\n\n\"So I've had to learn a whole new thing, which is that I might have to be worth it on purpose instead of just holding on tight enough. That's been horrible. I've hated every minute.\"\n\n\"Mio says it's good for me. Mio can get in the bin.\"",
        "\"Right. Here's the actual one, and I'll only do it the once, so read it proper.\"\n\n\"I love you. Not the way I say things. The other way. The one where I'd let you go if you wanted to go, which I've never been able to say about anything in my whole life and it's taken me a year to be able to say it about you.\"\n\n\"You mightn't ever have to. But you could. That's the thing I'm giving you. It's the only thing I've got that's worth anything.\"",
      ],
      choice: {
        prompt: "\"Now say. Whatever it is. I'll take it.\"",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close: "\"...Say it again.\"\n\n*You say it again.*\n\n\"Again.\"\n\n*The fourth time he stops asking. He turns up at your door twenty minutes later soaked through with no coat on and stands there for a moment just looking at your face, properly, greedily, the way he looks at things he's decided are his, and then he puts both arms round you and holds on so hard it aches, and says, into your hair, flat as anything:* \"Forever, mind. I did tell you.\"",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close: "\"Aye.\"\n\n*Nothing else for a bit. Then:*\n\n\"That's what the giving-you-the-door was for. Wasn't a trick. Take it.\"\n\n\"I'll be at the House. Same as always. And I'll not sulk at you about it, which I want noting, 'cause sulking's most of what I've got.\"\n\n*He doesn't sulk. He's exactly where he says he'll be, every night, holding the door on the dark. And when you come by he moves over on the wet ground without a word, the way he did the first time.*",
          },
        ],
      },
      keepsake: {
        emoji: "🚪",
        line: "A door he held open on your side, the only gift he had.",
      },
    },
  },
  dialogue: {
    new: [
      "He doesn't move to greet you. Only his eyes track across, then his head, slow, to follow you.",
      '"Come closer," he says, flat. "You\'re still too far away. Closer." He isn\'t joking.',
      '"You flinched. That\'s honest of you." He looks quietly pleased. "Do it again."',
      "He watches you the way he watches the cat across the yard, patient, unblinking, waiting to see what you'll do.",
      '"You wandered into the Heebie-Jeebie House on your own," he says. "Terrible instincts. I like them."',
      "The way he studies your face feels less like interest and more like he's learning it for later.",
    ],
    known: [
      "His gaze finds you first now, before anyone else in the room. It stopped being chance a while ago.",
      '"You\'re still alive, then. I couldn\'t find you anywhere. I\'d half decided I\'d killed you and forgotten."',
      "He's stopped trying to startle you. He just studies you instead, which is somehow worse.",
      '"You\'ve gone all quiet. This is boring." A pause. "...Don\'t leave. I\'ll allow talking."',
      'He\'s resetting a trick in one of the Heebie-Jeebie House\'s back passages: a trapdoor, a cold breath, a sound from nowhere. "People come to have their hearts stopped a moment. I never let them down."',
      "Something in the dark corner thinks about coming closer, then doesn't. He watches it decide.",
    ],
    warm: [
      "His attention tilts to you first, before the rest of the room registers at all.",
      "He's been waiting in this exact spot. He'd like you to know he doesn't wait for people.",
      '"You\'re not frightened of me anymore," he observes, and can\'t work out whether that disappoints him.',
      "Whatever was standing too near you a moment ago has quietly stopped being a problem.",
      '"I\'m thirsty. Go to Elias\'s and bring me that sickly brown stuff." A beat. "...Please."',
      '"Walk the Heebie-Jeebie House with me tonight. I\'ll frighten the others. You I\'d sooner just watch."',
    ],
    spark: [
      "He lets the flat calm slip an inch, just for you, just long enough that you're sure you saw it.",
      "He steps in close behind you and speaks right at your ear, entirely on purpose.",
      '"You stopped being afraid," he murmurs. "Now you\'re something far worse."',
      "He takes your wrist, turns it over, and studies your pulse like it told him something he liked.",
      '"You\'re getting bold," he says, almost approving. "\'Cause you\'re nearly mine."',
    ],
    close: [
      '"For you," Shion says, and the flatness cracks just enough to let a real smile through.',
      "He puts himself between you and the room without seeming to have decided to.",
      '"Nothing in here touches you," he says, mild about it. "It\'s mine. I\'ve made arrangements."',
      "The blank calm falls away, and what's underneath is startlingly gentle.",
      "He drops every last piece of the front. Only you get that. Only ever you.",
    ],
    bound: [
      "The front is off and stays off, and what's under it adores you past all reason.",
      "He kneels to take your hand, which from him isn't submission but something heavier.",
      '"My wife," he breathes, and means every letter of it.',
      "He traces your pulse with his mouth and takes a very long time about it.",
      "He'd end the world for you. He mentions it the way other people mention the weather.",
    ],
  },
  temperamentDialogue: {
    new: [
      '"What a face. I want to know what put it there."',
      '"Come closer. You\'re still too far away. ...Closer."',
      '"Don\'t run. Running\'s predictable, and I\'ll only follow."',
      '"So you\'re still alive. I looked everywhere. I thought maybe I\'d killed you and forgotten about it."',
      '"You flinched. That\'s honest of you. I appreciate honest."',
      '"You came into the Heebie-Jeebie House on your own. Awful instincts. I\'m delighted."',
    ],
    known: [
      '"Ah, the one who didn\'t run. I\'ve thought about you since."',
      '"You\'re back. Sit where I can see you."',
      '"You\'ve stopped flinching. I haven\'t decided how I feel about that."',
      '"Why\'ve you gone all quiet? This is boring. ...Fine. I\'ll find something to do with you."',
      '"You interest me. That\'s rarely good news for anyone. It\'s true all the same."',
      '"Three faintings in the house this week. I keep the count. It\'s been a good year."',
    ],
    warm: [
      '"You finally came back. I waited here the whole time, you know. Don\'t you feel a bit sorry for me?"',
      '"They said you\'d stop visiting. They\'re usually wrong."',
      '"Stay close to me. Nothing in this district would dare come near."',
      '"You\'re not afraid of me now. That\'s a whole new game."',
      '"I\'m thirsty. Go to Elias\'s and fetch that sickly brown stuff. ...You will. You like me."',
    ],
    spark: [
      '"Let me look at you properly. I\'ve earned that much."',
      '"Your pulse is quick. I do like being the reason."',
      '"Come round the back of the house. The good frights are back there."',
      '"Say you\'re mine. You needn\'t mean it yet. I\'m patient."',
      '"I\'m not in the mood to make you cry today. Come back later for that."',
    ],
    close: [
      '"You\'re mine to look after now. My wife."',
      '"The world\'s a cruel place. You\'re simply never going to be out in it."',
      '"Look, no front, nothing put on. Do you know what that costs me?"',
      '"Anything that reaches you goes through me first. That isn\'t aimed at you."',
      '"I\'ve watched a great many things suffer. I won\'t watch you."',
    ],
    bound: [
      '"Come here. Let me look at what\'s mine."',
      '"I love you. It\'s an old feeling, and I\'ve carried it too long without saying so."',
      '"The night\'s the worst of it. Stay till I\'m asleep. ...Stay after."',
      '"Say you\'re mine. Properly, this time."',
      '"Nothing will ever reach you. I\'ve been very thorough."',
    ],
  },
  approach: {
    new: ["Step inside", "Hold his gaze", "Don't run", "Take a step closer"],
    known: [
      "Come back again",
      "Stay for talking",
      "Follow where he stands",
      "Refuse to flinch",
    ],
    warm: [
      "Take his arm",
      "Stand where he can see you",
      "Greet him first",
      "Fetch what he asked",
    ],
    spark: [
      "Go round the back",
      "Let him take your wrist",
      "Let him look properly",
      "Say it",
    ],
    close: [
      "Go to him",
      "Let the front drop",
      "Let him take your hand",
      "Stand behind him",
    ],
    bound: [
      "Come here",
      "Say it properly",
      "Stay till he sleeps",
      "Let him kneel",
    ],
  },
  responses: {
    kind: {
      new: [
        "Answer him gently",
        "Say you're not afraid",
        "Ask if he's alright",
      ],
      spark: [
        "Reach for him gently",
        "Tell him you're not afraid",
        "Let him look, softly",
      ],
      close: [
        "Let him look after you",
        "Tell him he isn't a monster",
        "Thank him for the truth",
      ],
      bound: ["Hold his face", "Say it back", "Let him kneel"],
    },
    playful: {
      new: [
        "Don't take him seriously",
        "Flinch on purpose, grinning",
        "Give him a better face",
      ],
      spark: [
        "Make his pulse quick instead",
        "Steal his next line",
        "Play the dangerous thing",
      ],
      close: [
        "Play along with him",
        "Prank him back",
        "Make the villain laugh",
      ],
      bound: [
        "Make him wait for it",
        "Refuse to say it properly",
        "Upstage him for once",
      ],
    },
    bold: {
      new: [
        "Step closer, not back",
        "Ask what's under the front",
        "Tell him to try you",
      ],
      spark: [
        "Say you're his",
        "Go round the back with him",
        "Turn his wrist over instead",
      ],
      close: [
        "Claim him right back",
        "Tell him you're not fragile",
        "Dare him to be thorough",
      ],
      bound: [
        "Say you're his",
        "Pull him up by the collar",
        "Tell him to be thorough",
      ],
    },
    neutral: {
      new: [
        "Watch him carefully",
        "Give him nothing to read",
        "Wait him out",
      ],
      spark: [
        "Say nothing",
        "Let him have the quiet",
        "Let the moment pass",
      ],
      close: [
        "Let him watch over you",
        "Stay silent beside him",
        "Let the room go quiet",
      ],
      bound: [
        "Let him watch you",
        "Stay silent in the dark",
        "Let the moment stretch",
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
      '**{name}**\'s eyes track over first, then his head, slow. "...You knew my name." {user} did.',
      '"Come closer." **{name}** says it to {user} flatly, and means all of it.',
      "{user} says the name, and **{name}** looks pleased in a way that isn't reassuring.",
    ],
    warm: [
      "**{name}** had been waiting in this exact spot. He'd like {user} to know he doesn't wait for people.",
      "\"You came.\" **{name}** doesn't say the rest of it to {user}, but it's all over his face.",
      "{user} calls out, and **{name}** stops frightening whoever he was frightening.",
    ],
    spark: [
      "\"You're not scared of me.\" **{name}** can't decide whether that disappoints him about {user}.",
      "{user} says the name, and **{name}** closes the distance immediately. All of it.",
      '"Closer." **{name}** has said it to {user} before. It works every time.',
    ],
    close: [
      "**{name}** takes {user}'s hand and does not give it back.",
      '"Who else was out here?" **{name}** asks {user}, already deciding to remember their faces.',
      "{user} calls, and **{name}** leaves the dark he likes for the lit part of campus he doesn't.",
    ],
    bound: [
      '"My wife," **{name}** breathes, and means every letter of it to {user}.',
      "**{name}** kneels to take {user}'s hand in the open, which from him is something heavier than it looks.",
      "{user} says the name, and **{name}** decides, again, that forever is the plan.",
    ],
  },
};
