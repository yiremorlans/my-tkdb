export default {
  // The level-up DMs (docs/bond-scene-dms.md). One of the six volatile
  // characters — see docs/negative-affinity-enemies-to-lovers.md. Leo stays
  // thorny the whole way up: he never softens his mouth, he just stops aiming
  // it at you, and the warmth is entirely in what he does while insulting you.
  // Bold is what reaches him; being flattered makes him worse.
  //
  // Texting voice, per reference.md: "Ugh" surfaces even in private DMs, casual
  // profanity (shit/fuck) when riled or deflecting, and "Honor Roll" as his own
  // address for her, same as everyone else in the game calls her — mocking at
  // Acquaintance, protective by Devoted, said straight by Soulbound. Alan is
  // "Cap" to him, same as in every other pool.
  bondScenes: {
    acquaintance: {
      beats: [
        "**{firstName}**: don't get excited\n\nI message a lot of people. you're not special. you're like, extremely not special.",
        "so there's a thread going round about you. nothing bad, which honestly is the boring outcome, I was hoping for something I could use.\n\nanyway I killed it. you're welcome. don't make it weird, I just didn't like the guy who started it and this was cheaper than dealing with him properly.\n\n{timesMet} times you've been round and nobody's got anything on you. that's actually kind of impressive and I'm annoyed about it.",
      ],
      choice: {
        prompt: "so. thank me.",
        options: [
          {
            key: "kind",
            label: "Thank him sincerely",
            style: 3,
            close:
              "ugh\n\ndo it again but sarcastic. I don't know what to do with the other kind, it's making my skin crawl.\n\n*He doesn't leave the chat, though.*",
          },
          {
            key: "playful",
            label: "Ask what it cost him",
            style: 1,
            close:
              "nothing! Tch. not everything's a transaction.\n\nit cost me a favor I was saving. don't tell anyone I said that, I have a brand.",
          },
          {
            key: "bold",
            label: "Say you didn't ask him to",
            style: 4,
            close:
              "no, you didn't. that's the entire point, Honor Roll. anyone can do a favor they got asked for.\n\n*Then, faster, like he's covering:* anyway don't read into it. reading into it is so embarrassing for you.",
          },
        ],
      },
      keepsake: {
        emoji: "🗑️",
        line: "A thread about you that got deleted before you ever saw it.",
      },
    },

    friend: {
      beats: [
        "**{firstName}**: okay serious question and if you screenshot this I'll ruin your life",
        "you come at me with {favResponse} and you never flinch. not once. everyone flinches. that's the whole job, I say something and I watch it land.\n\nyou just answer. like I'm a person having a conversation instead of a hazard.\n\nit's throwing off my entire operation, and I need to know if you're doing it on purpose, because it's genuinely pissing me off how much I don't mind it.",
      ],
      choice: {
        prompt:
          "and be honest, I'll know if you're managing me. everyone manages me.",
        options: [
          {
            key: "kind",
            label: "Say you like talking to him",
            style: 3,
            close:
              "nobody likes talking to me. people like being *near* me. there's a difference and I've built a career on it.\n\n*A long gap.*\n\n...say that again in like a week and see if I still hate it.",
          },
          {
            key: "playful",
            label: "Say you flinch on the inside",
            style: 1,
            close:
              "HA. okay. okay, that's good, I'm using that.\n\nalso that's a lie and we both know it. but it's a funny lie, so, points.",
          },
          {
            key: "bold",
            label: "Say he isn't that intimidating",
            style: 4,
            close:
              "I'm extremely intimidating.\n\n...I'm not, am I. God. two years of work and one person just walks in and isn't rattled by any of it.\n\ndon't tell Sho. Sho's still rattled. it's the only thing keeping me going.",
          },
        ],
      },
      keepsake: {
        emoji: "🕶️",
        line: "The admission that the whole act isn't working on you.",
      },
    },

    closeFriend: {
      beats: [
        "**{firstName}**: so I need you to look at something and not be normal about it",
        "*It's a folder. Photos, hundreds of them, and none of them are the ones he posts: no ring light, no angles, no captions. Cap asleep in the garage. Sho with his mouth full. A courtyard at six in the morning with nobody in it.*\n\nthat's the real drive. nobody's seen it. not the house, not the numbers guys, definitely not the internet.",
        "the stuff I put out is the product. this is just some pointless shit I take and then never do anything with, and I've never worked out why.\n\nyou're in a bunch of them. I didn't crop you out. I want you to know I thought about cropping you out for like an hour and then didn't.",
      ],
      choice: {
        prompt:
          "ugh, say something withering. please. the sincerity in this chat is unbearable.",
        options: [
          {
            key: "kind",
            label: "Tell him they're better",
            style: 3,
            close:
              "better than the ones that make me money? cool. great. love that for my business model.\n\n...yeah. I know. that's why I don't post them.",
          },
          {
            key: "playful",
            label: "Ask for one of yourself",
            style: 1,
            close:
              "absolutely not, they're MINE...\n\n*One arrives four minutes later anyway. It's from a night you don't remember him being at, and you're laughing at something out of frame, and he's clearly been sitting on it for months.*",
          },
          {
            key: "bold",
            label: "Ask why you get to see",
            style: 4,
            close:
              "because you're the only person who'd look at them and not immediately ask what the play is.\n\nthere's no play. that's the whole horrible thing about it. go away now.",
          },
        ],
      },
      keepsake: {
        emoji: "📸",
        line: "A photo off the drive nobody else has ever been shown.",
      },
    },

    confidant: {
      beats: [
        "**{firstName}**: the numbers dipped this week\n\nI know that's not a thing to message a person at 3am about. I'm doing it anyway.",
        "here's the bit nobody gets. it's not vanity. vanity would be fine, vanity's cheap. it's that if the numbers go, there's nothing under them.\n\nCap's got the strength. Sho's got... whatever Sho's got, the food thing, people love him for free. I've got a follower count and a very good jawline and both of those depreciate.",
        "I'm the vice-captain of a house where everyone would pick him over me in a heartbeat, including me, and I've built an entire personality out of not letting that land.\n\nanyway. don't be nice about it. if you're nice about it I'll have to block you, that's just how I'm built.",
      ],
      choice: {
        prompt: "go on. worst thing you've got. I've earned it.",
        options: [
          {
            key: "kind",
            label: "Be nice about it anyway",
            style: 3,
            close:
              "I said I'd block you.\n\n*He doesn't block you.*\n\n...I'm not blocking you. obviously. say the rest of it, I hate it, keep going.",
          },
          {
            key: "playful",
            label: "Insult the jawline",
            style: 1,
            close:
              "THE JAWLINE IS THE ONE THING.\n\nokay. that helped. I'm furious that helped. you're a menace and I'm going to sleep.",
          },
          {
            key: "bold",
            label: "Tell him you'd pick him",
            style: 4,
            close:
              "*There's no answer for eleven minutes.*\n\ndon't say stuff like that at 3am, *he sends finally, and there's none of the voice left in it at all.* I'll believe it at 3am. that's how it gets you.\n\n...say it again in daylight and I'll decide then.",
          },
        ],
      },
      keepsake: {
        emoji: "💻",
        line: "The week the numbers dipped and he told exactly one person.",
      },
    },

    devoted: {
      beats: [
        "**{firstName}**: saw what he said to you in the courtyard",
        "he's done. not like... nothing dramatic, I'm not Cap, I don't hit people. he's just going to find that everyone's suddenly very busy for about a month and he's never going to work out why the fuck that is.\n\nthat's the version of me people know better than to test. you've never seen it pointed anywhere near you and you never will.",
        "and yeah, I know that's not a nice thing about me. I'm aware. I've got a whole list.\n\nbut you looked at the floor when he said it, and I've spent two years making sure nobody ever makes me look at the floor, so.\n\nso nobody gets to do it to you either. that's it. that's the rule now.",
      ],
      choice: {
        prompt: "don't tell me not to, Honor Roll. I've already done it.",
        options: [
          {
            key: "kind",
            label: "Tell him you didn't need it",
            style: 3,
            close:
              "I know you didn't.\n\nthat's not why I did it. I did it because I had to do something with my hands or I was going to have a whole feeling in public.",
          },
          {
            key: "playful",
            label: "Ask if that's a declaration",
            style: 1,
            close:
              "it's a *hit job*. completely different thing. wildly different.\n\n...it's the same thing, isn't it. God. this is so beneath me.",
          },
          {
            key: "bold",
            label: "Tell him to come here",
            style: 4,
            close:
              "*He shows up twenty minutes later in a hoodie with the hood up, which for Leo Kurosagi is basically appearing in public undressed.*\n\n*He doesn't say anything clever. He just gets an arm around you, hard, chin on the top of your head, and stands there in the corridor where anyone could see, which is the most reckless thing he's ever done.*",
          },
        ],
      },
      keepsake: {
        emoji: "🧢",
        line: "A hood pulled up so he could stand in a corridor and hold on.",
      },
    },

    soulbound: {
      beats: [
        "**{firstName}**: right so I've drafted this eleven times and every version made me sound insane so I'm just going to type it badly",
        "{timesMet} times. and every single one of them I've had a bit ready: something cutting, something that'd land. I'm never not holding one.\n\nand the bits have got worse and worse because I stopped meaning them somewhere around the middle, and a bit you don't mean is just noise, and you've been listening to noise for months.",
        "here's the actual thing. I'm not a nice person. I'm not going to become one. I gossip, I'm petty, I keep score, and I will absolutely ruin someone's month over a look they gave you.\n\nnone of that's changing. what changed is I stopped wanting to point any of it at you and started wanting to point all of it *for* you, and I don't know what to call that except the obvious.",
        "I love you, Honor Roll. there. typed it. not deleting it, which is genuinely the hardest thing I've done this year.\n\nand before you say anything, I know exactly what I am and I know exactly what you could have instead, and I've done the math on that at three in the morning more times than I'm going to admit.\n\nsay whatever you want. I've survived worse crowds.",
      ],
      choice: {
        prompt:
          "come on then. I'm not going to break. I'm probably not going to break.",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close:
              "...say that again.\n\nno wait don't, I've got to... hang on.\n\n*The next thing is a voice note, eight seconds, and it's just him swearing quietly and then laughing at himself.*\n\n> Okay.\n\n*he says at the end of it, and for once there is not one single ounce of performance in his voice.*\n\n> Okay. I'm coming over. Don't be normal about it, I'm going to be so weird when I get there.",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close:
              "yeah. yep. cool. totally.\n\n*A gap.*\n\nthat was three lies in a row, sorry. give me one second.\n\n...okay. take whatever you need. I mean that one. I've been holding it for ages and it's not heavy, it just talks a lot.\n\nand I'm not going anywhere, obviously, I live here and I'm extremely attention-seeking. you'll be sick of me. that's the plan, Honor Roll.",
          },
        ],
      },
      keepsake: {
        emoji: "📱",
        line: "The twelfth draft, sent badly, and never deleted.",
      },
    },
  },
  dialogue: {
    new: [
      'He smirks dangerously, eyes lit with a hint of amusement. "What brings you to the lion\'s den?"',
      "His phone is up before he's even looked at you. Everything is content to him.",
      '"Oh, this is good," he murmurs, to himself, about you. It doesn\'t sound like a compliment.',
      "He takes you in slowly, head to toe, and grins at whatever conclusion he reaches. You've been filed somewhere.",
      "\"Who's DMing me? Oh, it's this account. Huh... now that's interesting.\" He glances up at you mid-scroll.",
      '"Ugh, you\'re loud. Ask permission if you want to talk to me. ...Nope. Denied." He goes back to the phone.',
    ],
    known: [
      "He's learned your name. He holds it like a weapon he hasn't decided to fire.",
      '"Oh. It\'s you," he says, in a tone that could mean anything at all.',
      "\"Have you seen Cap? Bet he's lurching around lost again.\" He doesn't wait for an answer.",
      '"You\'re up. Go buy me a drink." A beat. "What kind? Take a guess." He\'s already looking back down.',
      '"That video got ten thousand interacts? You\'re all so basic." He mutes something with his thumb.',
      "He remembers exactly what rattled you last time. He's saving it.",
    ],
    warm: [
      "He insults you the way other people say hello, and it means the same thing now.",
      "The camera comes up when you walk in, then goes back down. He's decided you're not for the feed.",
      '"Late again," he drawls, having very obviously been checking.',
      '"We\'re fighting again? Which house? ...Ugh, pass." He means the Pit. He stays right where he is, next to you.',
      "Headphones on against the noise, but he lifts one side when you talk. Only for you, and he'd deny it.",
      '"You think I smell good? L\'Occitane. I throw it on after a shower." He says it like it bores him.',
    ],
    spark: [
      "He backs you gently into the wall and looks delighted with himself.",
      '"You\'ve stopped running," he murmurs. "That\'s so much more interesting."',
      "He tilts your chin up with one finger, purely to see what your face does.",
      "The teasing has developed a lower register. It isn't for the camera.",
      "He's close enough that his next insult lands as something else entirely.",
      "\"I can touch you. You can't touch me. That's how this works.\" He's enjoying the rule far too much.",
    ],
    close: [
      '"I could destroy you without thinking," he whispers, "but I\'d rather keep you all to myself."',
      "The performance drops. What's left is sharper, quieter, and entirely yours.",
      "He pulls you out of the crowd's eyeline before he lets his face change.",
      '"Say something cruel to me," he grins. "You\'re the only one who does it right."',
      "He's been waiting. He'll spend the next ten minutes pretending he wasn't.",
      '"Sit. Not there, next to me. Good." He puts his head down on you. "Don\'t move. I\'m taking a nap."',
    ],
    bound: [
      "He leaves marks where a collar won't hide them, and looks extremely pleased about it.",
      '"Say it again," he murmurs. "The way you said it last night."',
      "He's cruel to everyone else and unbearably soft with you at three in the morning.",
      "He keeps you in bed by simply refusing to let go, which is unanswerable.",
      "The camera has never once been pointed at this. He's not sharing you.",
      '"Wanna make a bet?" he murmurs. "Which comes first: me falling for you, or you getting hooked on me."',
    ],
  },
  temperamentDialogue: {
    new: [
      "\"You're either brave or stupid. Let's find out which.\"",
      '"Smile. You\'re on camera. Ah, too late."',
      '"New face. Cute. How long do you think you\'ll last?"',
      '"Say something interesting. I\'m running low on entertainment."',
      '"Ask for permission if you want to talk to me. ...Nope. Denied."',
      "\"I'm so done with these classes. I'll show up for the tests and skip the rest.\"",
    ],
    known: [
      "\"Back again? Either you're stubborn or you're stupid. Jury's out.\"",
      '"I remember you. Don\'t get excited, I remember everyone."',
      '"Was that on purpose? Are you seriously ignoring me right now?"',
      '"Say something worth filming. Go on, I\'ll wait."',
      "\"Night, then. What? I haven't slept. Unlike you, I've actually got shit to do.\"",
      "\"The kabuki prince's sister married into another troupe? Mm. Bet there's a story there.\"",
    ],
    warm: [
      '"Finally came back, huh? I was getting bored without you."',
      '"You\'re my favorite kind of trouble, you know that?"',
      '"Don\'t get comfortable. ...Fine. Get a little comfortable."',
      '"I\'ve got something on half the people in this room. Not you. Yet."',
      '"Cap left me behind again. Known that himbo, he still can\'t find a door."',
      '"Everyone\'s so loud. Headphones are going on. ...Tap here if you need me. Only you."',
    ],
    spark: [
      '"Look at you. Standing there like you want something. Say it."',
      "\"I could ruin you. Slowly. You'd let me, wouldn't you?\"",
      '"No camera. No audience. Just me being awful at you. Lucky."',
      '"Say my name. The way you did last time. Yes, that."',
      "\"You're not intimidated. You're something else. I like that better.\"",
      '"I can touch you. You can\'t touch me. Those are the rules. I make the rules."',
    ],
    close: [
      "\"You're the only thing sharp enough to match my wit. The only one I'd never want to hurt.\"",
      '"Everyone else is noise. You\'re the only signal in this place."',
      '"I don\'t share. You knew that when you got close."',
      '"Come here. Let them wonder what I\'m telling you."',
      '"Say my name like you mean it. That\'s all I want."',
      '"The demon nickname? People can call me what they want. I know what I am. You know too."',
    ],
    bound: [
      '"Mine. Say it. I want to hear you say it."',
      '"You\'ve got that look. Yeah, that one. Come here before I lose my mind."',
      '"Do you have any idea what you do to me? No? Good. Stay ignorant."',
      "\"Stay in bed. The world's boring and you're not.\"",
      '"Wanna make a bet? Which comes first: me falling for you, or you getting hooked on me. ...I already lost. Don\'t tell anyone."',
      '"Stay like this till I tell you to leave. ...I didn\'t hear an answer."',
    ],
  },
  approach: {
    new: [
      "Walk into the lion's den",
      "Smirk right back",
      "Ignore the camera",
      "Ask permission to talk",
    ],
    known: [
      "Go buy his drink",
      "Refuse to be rattled",
      "Say his name back",
      "Give him filming material",
    ],
    warm: [
      "Take the spot beside him",
      "Insult him back",
      "Make him put the phone down",
      "Lift the headphone",
    ],
    spark: [
      "Let him back you up",
      "Say his name",
      "Ask for it",
      "Break his no-touch rule",
    ],
    close: [
      "Go straight to him",
      "Let him pull you close",
      "Say something cruel",
      "Be the only signal",
    ],
    bound: ["Say it", "Come here", "Take the bet", "Stay put"],
  },
  responses: {
    kind: {
      new: [
        "Match his confidence",
        "Refuse to be rattled",
        "Mean the compliment",
      ],
      spark: [
        "See under the cruelty",
        "Let him be soft, briefly",
        "Say his name gently",
      ],
      close: [
        "See who's under the act",
        "Be gentle while it's quiet",
        "Tell him the mask can rest",
      ],
      bound: [
        "Be soft with him at 3am",
        "Say it how he wants",
        "Let him keep you",
      ],
    },
    playful: {
      new: ["Banter back at him", "Steal his line", "Pose for the camera"],
      spark: ["Bite back", "Make him work for it", "Tilt his chin up instead"],
      close: [
        "Be his favorite game",
        "Cut him down fondly",
        "Beat him at his own bit",
      ],
      bound: [
        "Make him say it first",
        "Cover the marks on purpose",
        "Give him nothing back",
      ],
    },
    bold: {
      new: ["Meet him head-on", "Say what nobody says", "Refuse to look away"],
      spark: [
        "Tell him to ruin you",
        "Break the no-touch rule",
        "Ask for what you want",
      ],
      close: [
        "Own his attention",
        "Claim him in the open",
        "Give as good as you get",
      ],
      bound: ["Say you're his", "Leave marks of your own", "Call the bet"],
    },
    neutral: {
      new: ["Watch and listen", "Give him nothing", "Let him perform"],
      spark: [
        "Refuse to react",
        "Duck under his arm",
        "Let him talk himself out",
      ],
      close: [
        "Watch him watching you",
        "Let the smirk fade",
        "Sit through the quiet",
      ],
      bound: ["Refuse to say it", "Let him talk", "Turn over and sleep"],
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
      "**{name}**'s phone is up before he's turned. \"Oh, this is good.\" {user} had guessed right.",
      '"Brave or stupid?" **{name}** asks {user}, already deciding it\'s content.',
      "{user} says the name, and **{name}** grins like he's already framing the shot.",
    ],
    warm: [
      "**{name}** raises the camera at {user}, then lowers it. They're not for the feed.",
      '"Finally," **{name}** drawls at {user}, having very obviously been watching for them.',
      "{user} calls out, and **{name}** insults them warmly, which is how he says hello now.",
    ],
    spark: [
      "**{name}** stops the recording. {user} gets the version nobody else does.",
      '"Say it again. Slower." **{name}** isn\'t talking about his name, and {user} knows it.',
      "{user} got there first, and **{name}** looks entirely too pleased to be caught.",
    ],
    close: [
      '"Mine," **{name}** says, loud enough for everyone nearby. {user} had only called his name.',
      "**{name}** is cruel to everyone in earshot and unbearably soft the moment {user} reaches him.",
      "{user} calls, and **{name}** puts the phone away. Face down.",
    ],
    bound: [
      "**{name}** takes {user}'s hand in public specifically so that it is seen.",
      '"Do you have any idea what that does to me?" **{name}** mutters, crossing to {user} anyway.',
      "{user} says the name, and **{name}**, who monetizes everything, keeps this one off the record.",
    ],
  },
};
