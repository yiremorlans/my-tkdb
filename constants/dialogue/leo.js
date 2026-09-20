export default {
  // The level-up DMs (docs/bond-scene-dms.md). One of the six volatile
  // characters — see docs/negative-affinity-enemies-to-lovers.md. Leo stays
  // thorny the whole way up: he never softens his mouth, he just stops aiming
  // it at you, and the warmth is entirely in what he does while insulting you.
  // Bold is what reaches him; being flattered makes him worse.
  //
  // Texting voice, per reference.md's "## Bond Scenes" notes: Leo texts in
  // mixed case (never all-lowercase), drops full stops, keeps paragraphs short,
  // and uses "u"/"ur", "lol", "rn", "tho". "Ugh" and "Tch" survive into private
  // DMs, casual profanity (shit/fuck) when riled or deflecting, and "Honor Roll"
  // as his own address for her, same as everyone else in the game calls her —
  // mocking at Acquaintance, protective by Devoted, said straight by Soulbound.
  // Alan is "Cap" to him, same as in every other pool. Spoken voice notes and
  // narration keep normal punctuation; the texting rules are only for what he
  // actually types.
  bondScenes: {
    acquaintance: {
      beats: [
        "**{firstName}**: Don't get excited\n\nI message a lot of people\n\nUr not special, ur like extremely not special",
        "So there's a thread going round about u\n\nNothing too bad, which is honestly the boring outcome, I was hoping for something I could use\n\nAnyway I killed it, ur welcome. didn't like the guy who started it and this was cheaper than dealing with him properly\n\n{timesMet} times you've been round and nobody's got anything on u\n\nkind of impressive and I'm annoyed about it",
      ],
      choice: {
        prompt: "go on then, thank me",
        options: [
          {
            key: "kind",
            label: "Thank him sincerely",
            style: 3,
            close:
              "Ugh\n\nDo it again but sarcastic, I don't know what to do with the other kind, it's making my skin crawl",
          },
          {
            key: "playful",
            label: "Ask how he even found it",
            style: 1,
            close:
              "I see everything that gets posted on this campus, it's kind of my whole thing\n\nalso I bugged the guy's car\n\njoking\n\nmostly",
          },
          {
            key: "bold",
            label: "Say you didn't ask him to",
            style: 4,
            close:
              "No, u didn't, that's the entire point honor roll\n\nanyone can do a favor they got asked for\n\n*Then, faster, like he's covering:* anyway don't read into it, reading into it is so embarrassing for u",
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
        "**{firstName}**: Ok serious question and if u screenshot this I'll ruin ur life",
        "u come at me with {favResponse} and u never take the bait\n\nnot once, everyone takes the bait. that's the whole job, I say something and watch it land\n\nu just answer, like I'm a person having a conversation instead of content\n\nit's throwing off my entire operation, and I need to know if ur doing it on purpose, because it's pissing me off how much I don't mind it",
      ],
      choice: {
        prompt:
          "and be honest, I'll know if ur managing me, everyone *tries* to manage me",
        options: [
          {
            key: "kind",
            label: "Say you like talking to him",
            style: 3,
            close:
              "nobody likes talking to me\n\npeople like being *near* me, there's a difference and I've built a career on it\n\n*A long gap.*\n\n…say that again in like a week and see if I still hate it",
          },
          {
            key: "playful",
            label: "Say you bite on the inside",
            style: 1,
            close:
              "HA\n\nokay that's good, I'm using that\n\nalso that's a lie and we both know it, but it's a funny lie, so, points",
          },
          {
            key: "bold",
            label: "Say he isn't that intimidating",
            style: 4,
            close:
              "I'm extremely intimidating\n\nGod, two years of work and one person just walks in and isn't rattled by any of it\n\nand I can't even get properly mad about it, I've tried, it won't take\n\nSho's the only other person who's never once taken the bait and he's had since middle school to build up the tolerance, u've had like a month\n\nso yeah, it's not working on u. I'd appreciate u not looking so pleased about it",
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
        "**{firstName}**: So I need u to look at something rn and not be normal about it",
        "*It's a folder. Photos, hundreds of them, and none of them are the ones he posts: no ring light, no angles, no captions. Cap asleep in the garage. Sho with his mouth full. A courtyard at six in the morning with nobody in it.*\n\nthat's the real drive\n\nnobody's seen it, not the house, not the numbers guys, definitely not the internet",
        "the stuff I put out is the product\n\nthis is just some pointless shit I take and then never do anything with, and I've never worked out why\n\nur in a bunch of them, I didn't crop u out\n\nI want u to know I thought about cropping u out for like an hour and then didn't",
      ],
      choice: {
        prompt:
          "ugh, say something withering, please, the sincerity in this chat is unbearable",
        options: [
          {
            key: "kind",
            label: "Tell him they're better",
            style: 3,
            close:
              "lol better than the ones that make me money? cool, great, love that for my business model\n\n…yeah, I know, that's why I don't post them",
          },
          {
            key: "playful",
            label: "Ask for one of yourself",
            style: 1,
            close:
              "absolutely not, they're MINE…\n\n*One arrives four minutes later anyway. It's from a night you don't remember him being at, and you're laughing at something out of frame, and he's clearly been sitting on it for months.*",
          },
          {
            key: "bold",
            label: "Ask why you get to see",
            style: 4,
            close:
              "because ur the only person who'd look at them and not immediately ask what the play is\n\nthere's no play, that's the whole horrible thing about it\n\ngo away now",
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
        "**{firstName}**: the numbers dipped this week\n\nI know that's not a thing to message a person at 3am about\n\nI'm doing it anyway",
        "here's the bit nobody gets\n\nit's not vanity, vanity would be fine, vanity's cheap\n\nit's that if the numbers go, there's nothing under them\n\nCap's got the strength, Sho's got… whatever Sho's got, the food thing, people love him for free\n\nI've got a follower count and a very good jawline and both of those depreciate",
        "I'm the vice-captain of a house where everyone would pick him over me in a heartbeat, including me\n\nand I've built an entire personality out of not letting that land\n\nanyway don't be nice about it\n\nif ur nice about it I'll have to block u, that's just how I'm built",
      ],
      choice: {
        prompt: "go on, worst thing you've got, I've earned it",
        options: [
          {
            key: "kind",
            label: "Be nice about it anyway",
            style: 3,
            close:
              "I said I'd block u\n\n*He doesn't block you.*\n\n…I'm not blocking u, obviously\n\nsay the rest of it, I hate it, keep going",
          },
          {
            key: "playful",
            label: "Insult the jawline",
            style: 1,
            close:
              "THE JAWLINE IS THE ONE THING\n\nokay that helped, I'm furious that helped tho\n\nur a menace and I'm going to sleep",
          },
          {
            key: "bold",
            label: "Tell him you'd pick him",
            style: 4,
            close:
              "*There's no answer for eleven minutes.*\n\ndon't say stuff like that at 3am, *he sends finally, and there's none of the voice left in it at all.* I'll believe it at 3am, that's how it gets u\n\n…say it again in daylight and I'll decide then",
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
        "**{firstName}**: saw what he said to u in the courtyard",
        "he's done\n\nnot like… nothing dramatic, I'm not Cap, I don't hit people\n\nhe's just going to find that everyone's suddenly very busy for about a month and he's never going to work out why the fuck that is\n\nthat's the version of me people know better than to test\n\nyou've never seen it pointed anywhere near u and u never will",
        "and yeah, I know that's not a nice thing about me, I'm aware, I've got a whole list\n\nbut u looked at the floor when he said it, and I've spent two years making sure nobody ever makes me look at the floor, so\n\nso nobody gets to do it to u either\n\nthat's it, that's the rule now",
      ],
      choice: {
        prompt: "don't tell me not to Honor Roll, I've already done it",
        options: [
          {
            key: "kind",
            label: "Tell him you didn't need it",
            style: 3,
            close:
              "I know u didn't\n\nthat's not why I did it\n\nI did it because I had to do something with my hands or I was going to have a whole feeling in public",
          },
          {
            key: "playful",
            label: "Ask if that's a declaration",
            style: 1,
            close:
              "it's a *hit job*, completely different thing, wildly different\n\n…it's the same thing, isn't it\n\nGod, this is so beneath me",
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
        "**{firstName}**: Ok so I've drafted this eleven times and every version made me sound insane so I'm just going to type it badly",
        "{timesMet} times\n\nand every single one of them I've had a bit ready, something cutting, something that'd land, I'm never not holding one\n\nand the bits have got worse and worse because I stopped meaning them somewhere around the middle\n\na bit u don't mean is just noise, and you've been listening to noise for months",
        "here's the actual thing\n\nI'm not a nice person and I'm not going to become one\n\nI gossip, I'm petty, I keep score, and I will absolutely ruin someone's month over a look they gave u. none of that's changing\n\nwhat changed is I stopped wanting to point any of it at u and started wanting to point all of it *for* u, and I don't know what to call that except the obvious",
        "I love u, Honor Roll\n\nthere, typed it, not deleting it, which is genuinely the hardest thing I've done this year\n\nand before u say anything, I know exactly what I am and I know exactly what u could have instead, and I've done the math on that at 3am more times than I'm going to admit\n\nsay whatever u want, I've survived worse crowds",
      ],
      choice: {
        prompt:
          "come on then, I'm not going to break, I'm probably not going to break",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close:
              "…say that again\n\nno wait don't, I've got to… hang on\n\n*The next thing is a voice note, eight seconds, and it's just him swearing quietly and then laughing at himself.*\n\n> Okay.\n\n*he says at the end of it, and for once there is not one single ounce of performance in his voice.*\n\n> Okay. I'm coming over. Don't be normal about it, I'm going to be so weird when I get there.",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close:
              "yeah, yep, cool, totally\n\n*A gap.*\n\nthat was three lies in a row, sorry, give me one second\n\n…okay, take whatever u need, I mean that one\n\nI've been holding it for ages and it's not heavy, it just talks a lot\n\nand I'm not going anywhere, obviously, I live here and I'm extremely attention-seeking\n\nyou'll be sick of me, that's the plan Honor Roll",
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
      {
        line: "He smirks dangerously, eyes lit with a hint of amusement.",
        approach: "Walk into the lion's den",
        greeting: "\"You're either brave or stupid. Let's find out which.\"",
        responses: {
          kind: ["Match his confidence", "Say you're just here to talk"],
          playful: ["Banter back at him", "Say you're a bit of both"],
          bold: ["Meet him head-on", "Say you're brave, obviously"],
          neutral: ["Watch and listen", "Let him do the sizing up"],
        },
      },
      {
        line: "His phone is up before he's even looked at you. Everything is content to him.",
        approach: "Ignore the camera",
        greeting: '"Smile. You\'re on camera. Ah, too late."',
        responses: {
          kind: ["Let him get the shot", "Smile for him anyway"],
          playful: ["Pose for the camera", "Ask for a retake"],
          bold: ["Refuse to look away", "Cover the lens with your hand"],
          neutral: ["Let him perform", "Don't react to the camera"],
        },
      },
      {
        line: '"Oh, this is good," he murmurs, to himself, about you. It doesn\'t sound like a compliment.',
        approach: "Smirk at him",
        greeting: '"New face. Cute. How long do you think you\'ll last?"',
        responses: {
          kind: ["Take 'cute' as a compliment", "Say you plan to stick around"],
          playful: ["Ask what's so good about you", "Ask if he's taking bets"],
          bold: ["Say you'll outlast him", "Ask how long he's lasted"],
          neutral: ["Let the comment slide", "Don't give him an answer"],
        },
      },
      {
        line: "He takes you in slowly, head to toe, and grins at whatever conclusion he reaches. You've been filed somewhere.",
        approach: "Hold his gaze",
        greeting:
          "\"Relax. I'm not gonna bite. I just like knowing what I'm working with.\"",
        responses: {
          kind: ["Refuse to be rattled", "Smile through the once-over"],
          playful: ["Ask what you got filed as", "Look him over right back"],
          bold: ["Meet the once-over evenly", "Say you're not his to use"],
          neutral: ["Give him nothing", "Wait for him to finish"],
        },
      },
      {
        line: "\"Who's DMing me? Oh, it's this account. Huh... now that's interesting.\" He glances up at you mid-scroll.",
        approach: "Joke it was you",
        greeting:
          '"Say something interesting. I\'m running low on entertainment."',
        responses: {
          kind: ["Ask who's texting, kindly", "Offer to leave him to it"],
          playful: ["Guess who it is", "Say you sent it, obviously"],
          bold: ["Demand he look up", "Ask what's so interesting"],
          neutral: ["Let him keep scrolling", "Wait until he's done"],
        },
      },
      {
        line: '"Ugh, you\'re loud. Ask permission if you want to talk to me. ...Nope. Denied." He goes back to the phone.',
        approach: "Call out to him",
        greeting:
          '"...You\'re still here. Fine. Say what you want, but make it worth my time."',
        responses: {
          kind: ["Ask nicely anyway", "Say you'll keep it short"],
          playful: ["Steal his line", "Ask permission, very formally"],
          bold: ["Talk without permission", "Say you don't need his okay"],
          neutral: ["Wait for him to look up", "Say nothing, stay put"],
        },
      },
    ],
    known: [
      {
        line: "He's learned your name. He holds it like a weapon he hasn't decided to fire.",
        approach: "Say his name back",
        greeting: '"I remember you. Don\'t get excited, I remember everyone."',
        responses: {
          kind: ["Say it's nice to be known", "Thank him for remembering"],
          playful: ["Dare him to use it", "Ask when he'll fire it"],
          bold: ["Say his name back first", "Tell him to use it already"],
          neutral: ["Say your name back plainly", "Let him hold onto it"],
        },
      },
      {
        line: '"Oh. It\'s you," he says, in a tone that could mean anything at all.',
        approach: "Wait him out",
        greeting: '"Huh, you again? Guess I\'ll allow it."',
        responses: {
          kind: ["Say hello warmly anyway", "Assume the best of the tone"],
          playful: ["Ask which tone he meant", "Guess what he's thinking"],
          bold: ["Ask him to just say it", "Call out the vague tone"],
          neutral: ["Wait him out calmly", "Let the tone go unread"],
        },
      },
      {
        line: "\"Have you seen Cap? Bet he's lurching around lost again.\" He doesn't wait for an answer.",
        approach: "Guess where Alan went",
        greeting:
          '"That himbo left me behind again. Can\'t find a door to save his life."',
        responses: {
          kind: ["Offer to help find him", "Say Alan's probably fine"],
          playful: [
            "Guess where Alan's lost now",
            "Tease Leo for tracking him",
          ],
          bold: ["Say you don't know or care", "Skip the guessing game"],
          neutral: ["Shrug, no idea", "Say nothing, let it go"],
        },
      },
      {
        line: '"You\'re up. Go buy me a drink." A beat. "What kind? Take a guess." He\'s already looking back down.',
        approach: "Go buy his drink",
        greeting:
          '"Took you long enough. ...Wait, you actually got it right? Ugh. Fine."',
        responses: {
          kind: ["Buy him the drink kindly", "Get it right on purpose"],
          playful: [
            "Guess the most annoying drink",
            "Bring the wrong one on purpose",
          ],
          bold: ["Refuse to buy it", "Tell him to buy his own"],
          neutral: ["Buy it, say nothing", "Hand it over without comment"],
        },
      },
      {
        line: '"That video got ten thousand interacts? You\'re all so basic." He mutes something with his thumb.',
        approach: "Ask what would impress him",
        greeting:
          '"What would impress me? Ha. Good luck, Honor Roll. Nobody\'s managed it yet."',
        responses: {
          kind: [
            "Ask what impresses him instead",
            "Admit you don't know either",
          ],
          playful: ["Guess something absurd", "Ask if he's ever impressed"],
          bold: ["Blame his high standards", "Challenge him to top it"],
          neutral: ["Shrug at the standard", "Let the scroll continue"],
        },
      },
      {
        line: "He remembers exactly what rattled you last time. He's saving it.",
        approach: "Refuse to be rattled",
        greeting:
          '"Oh, you\'re back. Still jumpy about the thing from last time? No? We\'ll see."',
        responses: {
          kind: ["Ask him not to use it", "Trust he won't be cruel"],
          playful: ["Dare him to use it now", "Ask what else he's saving"],
          bold: ["Tell him it won't work twice", "Call out the collecting"],
          neutral: [
            "Let him keep his ammunition",
            "Say nothing, stay unbothered",
          ],
        },
      },
      {
        line: "\"Honor Roll,\" he says, testing how you'll react to the nickname now that it's stuck.",
        approach: "Own the nickname",
        greeting:
          '"What, you don\'t like it? Too bad. It\'s stuck now, Honor Roll."',
        responses: {
          kind: ["Accept the nickname warmly", "Say you like it, honestly"],
          playful: ["Give him a nickname back", "Wear the nickname proudly"],
          bold: ["Own the nickname outright", "Dare him to top it"],
          neutral: ["Let the nickname stand", "Not react to it at all"],
        },
      },
      {
        line: "He holds his phone up without asking, films you anyway, and dares you to object.",
        approach: "Let him film you",
        greeting: '"Say something worth filming. Go on, I\'ll wait."',
        responses: {
          kind: ["Let him film, no complaint", "Say you don't mind the camera"],
          playful: ["Ham it up for the camera", "Demand a copy of the clip"],
          bold: ["Object to the filming", "Take the phone from him"],
          neutral: ["Ignore the camera entirely", "Let it happen, say nothing"],
        },
      },
      {
        line: '"You\'re not as boring as I thought," he says, like it pains him to admit it.',
        approach: "Take it as a compliment",
        greeting: "\"You're still not boring. Don't ruin it.\"",
        responses: {
          kind: ["Thank him, sort of", "Say the feeling's mutual"],
          playful: ["Ask what changed his mind", "Act offended he thought so"],
          bold: ["Say you knew that already", "Tell him to just admit it"],
          neutral: ["Shrug at the backhand", "Let the comment pass"],
        },
      },
      {
        line: '"Nobody invited you," he mutters, but he\'s already shifted his stuff over to make room.',
        approach: "Sit down",
        greeting: '"Fine, sit. Just don\'t touch my phone."',
        responses: {
          kind: ["Thank him for the room", "Sit down gratefully"],
          playful: ["Point out he made room anyway", "Sit closer than invited"],
          bold: ["Sit like you were invited", "Take the space regardless"],
          neutral: ["Sit without a word", "Take the seat quietly"],
        },
      },
      {
        line: '"Your playlist is genuinely embarrassing," he says, and adds three songs off it to his own anyway.',
        approach: "Catch him copying you",
        greeting:
          "\"Copying? I'm curating. Your taste is trash, but three songs out of forty isn't nothing.\"",
        responses: {
          kind: ["Let him keep the songs", "Say good taste is good taste"],
          playful: ["Call out the theft", "Demand credit for the songs"],
          bold: ["Take the songs back", "Say your playlist wins"],
          neutral: ["Let it go unremarked", "Say nothing about the songs"],
        },
      },
      {
        line: "He shows you something on his phone before he posts it, like your opinion actually counts for something.",
        approach: "Give him your honest opinion",
        greeting: '"Don\'t post that. ...Okay, fine, you can post that one."',
        responses: {
          kind: ["Give an honest, gentle opinion", "Say it looks great"],
          playful: [
            "Give an opinion he won't like",
            "Demand veto power always",
          ],
          bold: ["Tell him exactly what to cut", "Say your opinion is final"],
          neutral: ["Give a flat, honest take", "Shrug, say it's fine"],
        },
      },
      {
        line: "\"You're still here,\" he says, not a complaint, just a fact he's cataloguing.",
        approach: "Stay anyway",
        greeting: [
          "\"Don't get used to this. I'm only letting you hang around 'cause you're mildly interesting.\"",
          "\"Night, then. What? I haven't slept. Unlike you, I've actually got shit to do.\"",
        ],
        responses: {
          kind: ["Say you're glad to be here", "Confirm you're not leaving"],
          playful: ["Ask what category that is", "Threaten to stay forever"],
          bold: ["Say you're not going anywhere", "Dare him to catalogue that"],
          neutral: ["Stay, say nothing", "Let him keep cataloguing"],
        },
      },
    ],
    warm: [
      {
        line: "He insults you the way other people say hello, and it means the same thing now.",
        approach: "Insult him back",
        greeting: '"You\'re my favorite kind of trouble, you know that?"',
        responses: {
          kind: ["Insult him back gently", "Take it as affection"],
          playful: ["Out-insult him", "Rate his insult out of ten"],
          bold: ["Match his energy exactly", "Say trouble suits you fine"],
          neutral: ["Take the insult in stride", "Say hello like normal"],
        },
      },
      {
        line: "The camera comes up when you walk in, then goes back down. He's decided you're not for the feed.",
        approach: "Make him put the phone down",
        greeting:
          '"I\'ve got something on half the people in this room. Not you. Yet."',
        responses: {
          kind: ["Thank him for the privacy", "Say you trust him with it"],
          playful: ["Ask why you're not content", "Ask for a better angle"],
          bold: ["Demand to know the criteria", "Ask what he has on you"],
          neutral: ["Let the camera stay down", "Ignore the phone entirely"],
        },
      },
      {
        line: '"Late again," he drawls, having very obviously been checking.',
        approach: "Admit you're late",
        greeting: '"Finally came back, huh? I was getting bored without you."',
        responses: {
          kind: ["Apologize, mean it a little", "Say you hurried over"],
          playful: ["Ask how long he checked", "Say boredom suits him"],
          bold: ["Say he was clearly waiting", "Say he missed you, plainly"],
          neutral: ["Shrug off being late", "Say nothing about it"],
        },
      },
      {
        line: '"We\'re fighting again? Which house? ...Ugh, pass." He means the Pit. He stays right where he is, next to you.',
        approach: "Take the spot beside him",
        greeting:
          '"Don\'t get comfortable. ...Fine. Get a little comfortable."',
        responses: {
          kind: ["Say you're glad he stayed", "Say the Pit can wait"],
          playful: ["Tease him about the Pit", "Ask who he's avoiding"],
          bold: ["Stand closer on purpose", "Tell him to stay put"],
          neutral: ["Stay beside him quietly", "Get comfortable anyway"],
        },
      },
      {
        line: "Headphones on against the noise, but he lifts one side when you talk. Only for you, and he'd deny it.",
        approach: "Lift the headphone",
        greeting:
          '"Everyone\'s so loud. Headphones are going on. ...Tap here if you need me. Only you."',
        responses: {
          kind: ["Thank him for listening", "Say two minutes, tops"],
          playful: ["Tap the headphone again", "Tap it for no reason"],
          bold: ["Say you're the exception", "Take the other headphone"],
          neutral: ["Talk, then let him refocus", "Say your piece and stop"],
        },
      },
      {
        line: '"You think I smell good? L\'Occitane. I throw it on after a shower." He says it like it bores him.',
        approach: "Ask what he's wearing",
        greeting:
          '"It\'s mine. Get your own. ...Or just stand closer. Whatever."',
        responses: {
          kind: ["Say it suits him", "Say he smells expensive"],
          playful: [
            "Ask if he tested other scents",
            "Threaten to steal a spray",
          ],
          bold: ["Say you noticed already", "Stand closer, like he said"],
          neutral: ["Shrug, unbothered either way", "Let the topic drop"],
        },
      },
    ],
    spark: [
      {
        line: "He backs you gently into the wall and looks delighted with himself.",
        approach: "Let him back you up",
        greeting:
          "\"You're not intimidated. You're something else. I like that better.\"",
        responses: {
          kind: "See under the cruelty",
          playful: "Bite back",
          bold: "Push back against the wall",
          neutral: "Refuse to react",
        },
      },
      {
        line: '"You\'ve stopped running," he murmurs. "That\'s so much more interesting."',
        approach: "Say his name",
        greeting: '"Say my name. The way you did last time. Yes, that."',
        responses: {
          kind: "Say his name gently",
          playful: "Make him work for it",
          bold: "Close the distance instead",
          neutral: "Let the moment sit quietly",
        },
      },
      {
        line: "He tilts your chin up with one finger, purely to see what your face does.",
        approach: "Ask for it",
        greeting:
          '"Look at you. Standing there like you want something. Say it."',
        responses: {
          kind: "Let him look, stay soft",
          playful: "Tilt his chin up instead",
          bold: "Ask for what you want",
          neutral: "Hold still, give nothing away",
        },
      },
      {
        line: "The teasing has developed a lower register. It isn't for the camera.",
        approach: "Notice the new register",
        greeting:
          '"No camera. No audience. Just me being awful at you. Lucky."',
        responses: {
          kind: "Let him be soft, briefly",
          playful: "Ask if that's just for you",
          bold: "Push past the new register",
          neutral: "Let him talk himself out",
        },
      },
      {
        line: "He's close enough that his next insult lands as something else entirely.",
        approach: "Take the insult differently",
        greeting: "\"I could ruin you. Slowly. You'd let me, wouldn't you?\"",
        responses: {
          kind: "Let the insult land softly",
          playful: "Take it as a compliment",
          bold: "Tell him to ruin you",
          neutral: "Let it land, say nothing",
        },
      },
      {
        line: "\"I can touch you. You can't touch me. That's how this works.\" He's enjoying the rule far too much.",
        approach: "Break his no-touch rule",
        greeting:
          "\"You're staring. Good. Means I'm still worth the trouble.\"",
        responses: {
          kind: "Let him keep the rule",
          playful: "Duck under his arm",
          bold: "Break the no-touch rule",
          neutral: "Respect the rule, for now",
        },
      },
    ],
    close: [
      {
        line: '"I could destroy you without thinking," he whispers, "but I\'d rather keep you all to myself."',
        approach: "Let him keep you",
        greeting: '"I don\'t share. You knew that when you got close."',
        responses: {
          kind: "Be gentle while it's quiet",
          playful: "Be his favorite game",
          bold: "Claim him in the open",
          neutral: "Watch him watching you",
        },
      },
      {
        line: "The performance drops. What's left is sharper, quieter, and entirely yours.",
        approach: "Be the only signal",
        greeting:
          '"Everyone else is noise. You\'re the only signal in this place."',
        responses: {
          kind: "Tell him the mask can rest",
          playful: "Beat him at his own bit",
          bold: "Give as good as you get",
          neutral: "Let the smirk fade",
        },
      },
      {
        line: "He pulls you out of the crowd's eyeline before he lets his face change.",
        approach: "Let him pull you close",
        greeting:
          '"The demon nickname? People can call me what they want. I know what I am. You know too."',
        responses: {
          kind: "See who's under the act",
          playful: "Peek at the real face early",
          bold: "Own his attention",
          neutral: "Let him have the privacy",
        },
      },
      {
        line: '"Say something cruel to me," he grins. "You\'re the only one who does it right."',
        approach: "Say something cruel",
        greeting:
          "\"You're the only thing sharp enough to match my wit. The only one I'd never want to hurt.\"",
        responses: {
          kind: "Say something soft instead",
          playful: "Cut him down fondly",
          bold: "Match his cruelty evenly",
          neutral: "Let the game continue quietly",
        },
      },
      {
        line: "He's been waiting. He'll spend the next ten minutes pretending he wasn't.",
        approach: "Go straight to him",
        greeting: '"Come here. Let them wonder what I\'m telling you."',
        responses: {
          kind: "Apologize for making him wait",
          playful: "Ask how long he waited",
          bold: "Go straight to him, no waiting",
          neutral: "Let him keep pretending",
        },
      },
      {
        line: '"Sit. Not there, next to me. Good." He puts his head down on you. "Don\'t move. I\'m taking a nap."',
        approach: "Take the seat beside him",
        greeting: '"Say my name like you mean it. That\'s all I want."',
        responses: {
          kind: "Let him nap on you",
          playful: "Poke him awake",
          bold: "Say his name like he asked",
          neutral: "Sit through the quiet",
        },
      },
    ],
    bound: [
      {
        line: "He leaves marks where a collar won't hide them, and looks extremely pleased about it.",
        approach: "Come here",
        greeting:
          '"You\'ve got that look. Yeah, that one. Come here before I lose my mind."',
        responses: {
          kind: "Let him keep you",
          playful: "Cover the marks on purpose",
          bold: "Leave marks of your own",
          neutral: "Turn over and sleep",
        },
      },
      {
        line: '"Say it again," he murmurs. "The way you said it last night."',
        approach: "Say it",
        greeting: '"Mine. Say it. I want to hear you say it."',
        responses: {
          kind: "Say it how he wants",
          playful: "Make him say it first",
          bold: "Say it back, no hesitation",
          neutral: "Refuse to say it",
        },
      },
      {
        line: "He's cruel to everyone else and unbearably soft with you at three in the morning.",
        approach: "Let him be soft",
        greeting:
          '"Do you have any idea what you do to me? No? Good. Stay ignorant."',
        responses: {
          kind: "Be soft with him at 3am",
          playful: "Give him nothing back",
          bold: "Ask what you do to him",
          neutral: "Let him talk",
        },
      },
      {
        line: "He keeps you in bed by simply refusing to let go, which is unanswerable.",
        approach: "Stay put",
        greeting: "\"Stay in bed. The world's boring and you're not.\"",
        responses: {
          kind: "Let him hold on",
          playful: "Test how tight the grip is",
          bold: "Refuse to leave either",
          neutral: "Stay put, say nothing",
        },
      },
      {
        line: "The camera has never once been pointed at this. He's not sharing you.",
        approach: "Keep this off the record",
        greeting:
          '"Stay like this till I tell you to leave. ...I didn\'t hear an answer."',
        responses: {
          kind: "Say you don't mind being his",
          playful: "Tease him about the secrecy",
          bold: "Say you're his",
          neutral: "Let it stay off the record",
        },
      },
      {
        line: '"Wanna make a bet?" he murmurs. "Which comes first: me falling for you, or you getting hooked on me."',
        approach: "Take the bet",
        greeting: '"...Fine. I already lost. Don\'t tell anyone."',
        responses: {
          kind: "Hope you both fall equally",
          playful: "Take the bet seriously",
          bold: "Call the bet",
          neutral: "Refuse to bet on it",
        },
      },
    ],
  },
  // No temperamentDialogue pool: every leftover line was placed onto a
  // dialogue beat's `greeting`.
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
      "**{name}** raises his phone at {user}, then lowers it. They're not for the feed.",
      '"Finally," **{name}** drawls at {user}, not hiding that he had been watching for them.',
      "{user} calls out, and **{name}** insults them warmly.",
    ],
    spark: [
      "**{name}** stops the recording. {user} gets the version nobody else does.",
      '"Say it again. Slower." **{name}** isn\'t talking about his name, and {user} knows it.',
      "{user} got there first, and **{name}** looks entirely too pleased to be caught.",
    ],
    close: [
      '"Wow, you wanted me that bad?" **{name}** says it loud enough for everyone nearby. {user} had only called his name.',
      "**{name}** goes unbearably soft the moment {user} reaches him.",
      "{user} calls, and **{name}** puts the phone away. Face down.",
    ],
    bound: [
      "**{name}** takes {user}'s hand in public specifically so that it is seen.",
      '"Do you have any idea what that does to me?" **{name}** mutters, crossing to {user} anyway.',
      "{user} says the name, and **{name}** keeps this one off the record.",
    ],
  },
};
