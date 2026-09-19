export default {
  // The level-up DMs (docs/bond-scene-dms.md). Haku deflects every sincere
  // thing said to him and spooks people to watch their faces, so his scenes are
  // built as a long failure to deflect: each level he tries the joke, and each
  // level it works a little less. He sees what nobody else can, and the last
  // thing he admits is that being the only one who sees is lonely.
  //
  // Texting voice, per reference.md's "## Bond Scenes" notes: he clips words
  // ("prob", "No prob") and drops "tbh" into his typed lines, but writes in
  // normal sentence case, not all-lowercase. Not in the `> ` lines he says out
  // loud.
  bondScenes: {
    acquaintance: {
      beats: [
        "**{firstName}**: Hey, it's Haku. Got your number the boring way, before you ask.\n\nI do actually have a reason for this. I also just wanted an excuse to text you. The reason came first. Barely.",
        "Okay, real reason. There's something in the middle of the Hotarubi hall floor, been there for years. Everyone walks straight through it and blames the headache on the weather.\n\nExcept you. {timesMet} times here, and you're the only one I've watched go round it instead of through. Could be nothing. I've been curious ever since tbh, so I'm asking.",
      ],
      choice: {
        prompt: "Well? Was that just a coincidence?",
        options: [
          {
            key: "kind",
            label: "Say it just felt wrong",
            style: 3,
            close:
              "Yeah. That's how it starts.\n\nFor what it's worth, that's a decent instinct and you should trust it.",
          },
          {
            key: "playful",
            label: "Ask if you passed the test",
            style: 1,
            close:
              "It wasn't a test.\n\n...It was completely a test. And you passed, which almost nobody does. Most people are still checking over their shoulder an hour later.\n\nShame, though. I had a whole second scare lined up.",
          },
          {
            key: "bold",
            label: "Ask if the excuse came first",
            style: 4,
            close:
              "You blew right past the question I asked to go for that one. Bold.\n\nBoth reasons are real, for the record. Which one came first is a braver text than I've got in me tonight.",
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
        "**{firstName}**: Okay, observation time. Don't look into it too much.",
        "You come back with {favResponse} every single time. Even when I've been kidding. Especially then, actually.\n\nHalf the time I say I'm kidding, I'm not. There really was something behind you. Everyone else laughs and takes the out.\n\nYou're the only one who's ever asked which half. It's starting to be a whole thing tbh.",
      ],
      choice: {
        prompt:
          "So. What's the plan here. Do you have one or are you just like this.",
        options: [
          {
            key: "kind",
            label: "Say you'll always ask which",
            style: 3,
            close:
              "...Huh.\n\nThat's annoyingly good. Give me a sec.\n\n*The sec is a long one.* Okay. Deal. Ask, and I'll tell you which.",
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
            label: "Tell him to stop kidding",
            style: 4,
            close:
              "Can't. It's load-bearing.\n\n...I'll try. Not tonight. But I'll try, and you'll prob have to be really obvious about noticing, because I won't be.",
          },
        ],
      },
      keepsake: {
        emoji: "👻",
        line: "The half of his jokes that weren't jokes.",
      },
    },

    closeFriend: {
      beats: [
        "**{firstName}**: You free? C'mon, bring a coat. It's the back veranda and it's freezing and I'm not explaining over text.",
        "*He's already out there with two cans and a blanket he clearly brought for you, and he's looking at the far end of the veranda rather than at you.*\n\n> So there's a kid out here. Been here since before I arrived. Sits on the edge every night and won't go, and I've tried everything and I'm out of ideas, and I come out and sit with her because that's all that's left.",
        "> Every night. Since I moved in here. Nobody knows.\n\n*He finally looks over.*\n\n> That's the actual thing about me, by the way. Not the medium stuff, not the shrine family, not the ghosts. It's that I come out here every night because if I don't, nobody does.\n\n> You're the first person I've told. I'd like it on record that I told you sober, so I can't take it back later.",
      ],
      choice: {
        prompt: "Right. Say something lazy so we can move on.",
        options: [
          {
            key: "kind",
            label: "Ask if you can come too",
            style: 3,
            close:
              "*He doesn't answer for a while. Just drinks.*\n\n> ...Yeah.\n\n*he says eventually, out at the garden rather than at you.*\n\n> Yeah, come. She won't know. But I'll know.\n\n*You go, most nights, after that. He never once thanks you for it, which is how you know it matters.*",
          },
          {
            key: "playful",
            label: "Point out he brought a blanket",
            style: 1,
            close:
              "> That's mine.\n\n> ...It's not mine, I bought it Tuesday, it's still got the tag on. Shut up. Put it on, princess, you're shaking.",
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
        "**{firstName}**: My family sent a letter. First one in three years. Thought you should know before I do something stupid with it.",
        "Kusanagi shrine. Long line of mediums, big house, lot of expectations. I was the strongest one they'd produced in a long time and they were *thrilled* to see the back of me.\n\nNot disappointed. Thrilled. I saw the wrong things and said so out loud, and it turns out a family business runs better when the medium tells people what they want tbh.",
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
              "...That's not one of the options I'd prepared for.\n\n*A long pause.*\n\nThe veranda. Bring the blanket. I'll read it out loud and you can tell me if I'm allowed to feel anything about it, because apparently I've stopped being able to tell.",
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
              "You don't get to decide that.\n\n*Then, almost immediately:* Sorry. That was... yeah. Sorry.\n\nSay it again. I'm not going to argue this time. I just want to hear somebody say it who isn't me at 4am.",
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
        "**{firstName}**: Don't freak out. You're fine. I need you to not freak out.",
        "There was something following you back from the east wing tonight. Not a big one, it wasn't going to do anything, they mostly don't, but it had picked you and it was prob going to keep picking you.\n\nSo I dealt with it. Properly, the shrine way, the way I swore I was never doing again because of who taught it to me.",
        "It took about four hours and it hurt in a way I'd genuinely forgotten about, and I'd have done it if it took four days.\n\nI'm telling you because I don't want to be someone who quietly does things for you and lets you think the world is easier than it is. That's my dad's whole personality and I'd rather die.\n\nAlso I'm exhausted and slightly emotional and it's five in the morning tbh, so, you know. Grain of salt.",
      ],
      choice: {
        prompt: "Go on then. Have a go at me. I've earned at least one.",
        options: [
          {
            key: "kind",
            label: "Ask if he's okay",
            style: 3,
            close:
              "...Nobody asks that.\n\nEveryone asks if it's gone. Nobody's ever asked the other thing.\n\n*A long gap.*\n\nNo. Not really. Can you come out. You don't have to say anything, I just don't want to be out there by myself tonight.",
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
            label: "Go out to the veranda",
            style: 4,
            close:
              "*He's flat on his back on the boards when you get there, gray, done in, arm over his eyes.*\n\n*He doesn't sit up. He just moves over about six inches and says,*\n\n> If you're going to lie down do it now, I'm not doing the being-brave thing tonight.\n\n*You lie down. He puts his head against your shoulder and is asleep in ninety seconds, and doesn't move until it's light.*",
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
        "Here's the thing about being the only one who sees. Everyone thinks it's frightening. It's not frightening, it's lonely: you're in a room full of people and there's a whole other room and you're the only one in it.\n\nYou came into the other room. You didn't even make a thing of it. You just started stepping round stuff on the floor and sitting on a freezing veranda with a kid you can't see.",
        "So: I love you.\n\nNo bit. No door. I've loved you since the veranda, probably before it, and I've spent every conversation since half-assing it, because half-assing it is the only way I know how to survive meaning something.\n\nI keep going back over what I let slide. Walking you home and cracking a joke at your door instead of saying this. The morning you answered half asleep in your pajamas and I decided I wasn't allowed to notice. C'mon. Stupid things to miss. I miss them anyway.\n\nThat's the whole message. God, this is awful.",
      ],
      choice: {
        prompt:
          "Take your time. I'm extremely lazy, I'll wait forever, it's genuinely no effort tbh.",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close:
              "...Say it again but with the joke removed. I've put a joke in on your behalf and I need to hear it without one.\n\n*You say it again.*\n\n*The reply is just:* Veranda. Now. *And he's standing when you get out there for once, not lying down, not looking at the far end, looking straight at you, and he kisses you like a man finally putting down something he's carried a long way.*",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close:
              "Yeah. Course. That's... yeah, take it.\n\n*A pause. No joke arrives, which is how you know he means it.*\n\nI'm going to be on the veranda at midnight regardless. That was true before tonight and it'll be true after. Nothing I said changes what that is.\n\nAnd if you never bring it up again, I won't either. I'm world-class at not bringing things up. It's basically my only skill.\n\n*He's out there every night. He never brings it up. He always moves over six inches.*",
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
      {
        line: 'He\'s found the one quiet corner of the grounds and claimed it. You found him anyway. "Oh. Hey."',
        approach: "Say hey back",
        greeting:
          '"Well, look who wandered in. You lost, or is this on purpose?"',
        responses: {
          kind: ["Say you came to see him", "Tell him to take it easy"],
          playful: ["Say you're very lost", "Claim half his corner"],
          bold: ["Sit too close on purpose", "Say it's on purpose"],
          neutral: ["Say nothing at all", "Sit down a little way off"],
        },
      },
      {
        line: '"I wouldn\'t stand there." He waits out your look at the corner. "...No reason. Wanted to see if you\'d jump."',
        approach: "Look over your shoulder",
        greeting:
          '"Ha ha, you actually looked. Relax, there\'s nothing there. ...Probably."',
        responses: {
          kind: ["Laugh it off with him", "Say you're fine, really"],
          playful: ["Refuse to be spooked", "Pretend to see something too"],
          bold: ["Call him out for the scare", "Ask what's really there"],
          neutral: ["Step away from the corner", "Don't give him the reaction"],
        },
      },
      {
        line: '"Don\'t expect too much from me," he says, not getting up. "Ghouls are glorified street magicians, really. Let\'s keep it light."',
        approach: "Sit on the step with him",
        greeting:
          '"Haha, look at you. Most people keep their distance by now. Pull up some step, there\'s plenty."',
        responses: {
          kind: ["Let him keep it light", "Say he's selling himself short"],
          playful: ["Ask for a magic trick", "Call him a street magician"],
          bold: ["Say you expect more of him", "Ask what he's hiding"],
          neutral: ["Sit and say nothing", "Take the step beside him"],
        },
      },
      {
        line: 'He\'s stretched out on the bench and lifts a hand without opening his eyes. "Hey. Give me five more minutes."',
        approach: "Let him nap",
        greeting:
          '"...Mm. You waited. That\'s nice of you. Most people just poke me."',
        responses: {
          kind: ["Give him his five minutes", "Wait quietly beside him"],
          playful: ["Poke him anyway", "Count down the five minutes"],
          bold: ["Tell him to wake up now", "Take half the bench"],
          neutral: ["Let him be", "Sit and wait it out"],
        },
      },
      {
        line: "\"What are you doing back here? Don't tell me you've gone and gotten yourself mixed up in something.\"",
        approach: "Own up to it",
        greeting:
          "\"You've got the look of someone with a story. Go on, I've got nowhere to be.\"",
        responses: {
          kind: ["Explain calmly", "Say it's nothing to worry over"],
          playful: ["Make up a wild story", "Say trouble found you"],
          bold: ["Refuse to explain yourself", "Ask why he cares"],
          neutral: ["Shrug, say nothing", "Keep the story short"],
        },
      },
      {
        line: '"You shouldn\'t be out this far alone." He\'s already up. "To the lights, at least. Humor me."',
        approach: "Walk with him",
        greeting:
          '"Watch your step out there. You shouldn\'t wander around with your guard down."',
        responses: {
          kind: ["Thank him for walking you", "Say you'll humor him"],
          playful: ["Ask if he's being dramatic", "Ask if a fox spirit's out"],
          bold: ["Walk off on your own", "Say you can handle the dark"],
          neutral: ["Let him walk, say nothing", "Fall into step quietly"],
        },
      },
    ],
    known: [
      {
        line: '"Oh, it\'s you." He cracks one eye open. "Good timing. I was getting bored."',
        approach: "Ask if he was waiting for you",
        greeting: '"Oh, you. ...Yeah, I was hoping it\'d be you."',
        responses: {
          kind: ["Say you're glad too", "Admit you came looking"],
          playful: ["Ask if he was really bored", "Tease him for waiting"],
          bold: ["Say of course it's you", "Own the good timing"],
          neutral: ["Shrug, take a seat", "Sit without comment"],
        },
      },
      {
        line: "\"Zenji's got me filming him again. He's wandered off to pick the spot, and it's never the easy one.\"",
        approach: "Offer to help film",
        greeting:
          '"Hold the reflector, then. If he asks you to play a corpse, say no. He\'ll ask."',
        responses: {
          kind: ["Offer to help him film", "Say you don't mind waiting"],
          playful: ["Guess the worst possible spot", "Tease Zenji's pickiness"],
          bold: ["Pick the spot yourself", "Take over the filming"],
          neutral: ["Wait for Zenji, say nothing", "Watch without helping"],
        },
      },
      {
        line: '"You keep turning up. I\'ve started counting on it."',
        approach: "Say you'll keep turning up",
        greeting:
          "\"You're around enough now that I've stopped keeping count. That's rare, for me.\"",
        responses: {
          kind: ["Say you like being counted on", "Thank him for noticing"],
          playful: ["Ask what the count is", "Tease him for keeping count"],
          bold: ["Say you show up now", "Claim the count as yours"],
          neutral: ["Shrug at being counted", "Let it go unremarked"],
        },
      },
      {
        line: "\"Mornin'. You've got a sleep mark on your face. ...Good. Means you actually slept.\"",
        approach: "Rub at the sleep mark",
        greeting:
          '"Left cheek. No, your other left. ...Ha ha. Still there, actually."',
        responses: {
          kind: ["Admit you actually slept", "Thank him for noticing"],
          playful: ["Deny the sleep mark", "Blame the pillow"],
          bold: ["Say he's staring", "Ask why he's checking"],
          neutral: ["Wipe it off, say nothing", "Ignore the comment"],
        },
      },
      {
        line: '"Made too much tea. You\'ll have to help me with it." He did not make too much tea by accident.',
        approach: "Help him with the tea",
        greeting:
          '"You keep turning up right when things get quiet around here. I don\'t mind the company."',
        responses: {
          kind: ["Help without complaint", "Say you don't mind the tea"],
          playful: ["Call out the excuse", "Ask who the tea's really for"],
          bold: ["Drink it, no thanks needed", "Say you knew it was for you"],
          neutral: ["Drink the tea quietly", "Take a cup, say nothing"],
        },
      },
      {
        line: '"You were hunting everywhere for those forms. I already handed them in for you. It\'s fine, it was on the way."',
        approach: "Thank him for handling it",
        greeting:
          "\"Caught me actually working for once. Don't tell anyone, I've got a reputation to protect.\"",
        responses: {
          kind: ["Thank him sincerely", "Say that saved you a headache"],
          playful: [
            "Ask what he wants in return",
            "Tease him for actually working",
          ],
          bold: [
            "Say you'd have managed anyway",
            "Demand to know why he bothered",
          ],
          neutral: ["Take it in stride", "Say nothing about it"],
        },
      },
      {
        line: "\"Hang on, I'll walk you. I don't love the idea of you crossing the campus alone in the dark.\"",
        approach: "Let him walk you",
        greeting: '"Walk you back? Purely practical. ...Mostly."',
        responses: {
          kind: ["Accept the company gladly", "Thank him for walking with you"],
          playful: ["Ask what 'mostly' means", "Call out the practical excuse"],
          bold: ["Say he wants to walk with you", "Refuse the excuse entirely"],
          neutral: ["Walk along, say nothing", "Let him walk without comment"],
        },
      },
      {
        line: "\"Anyway. I'll try not to keep you out this late from now on. ...No promises. Come on, I'll see you back.\"",
        approach: "Hold him to it",
        greeting:
          '"Don\'t look at me like that. I said I\'d try. Trying counts."',
        responses: {
          kind: ["Say you don't mind either way", "Thank him for the thought"],
          playful: ["Hold him to the no-promises", "Bet he'll do it again"],
          bold: ["Call out the empty promise", "Demand he actually try"],
          neutral: [
            "Let the promise go unremarked",
            "Say nothing, keep walking",
          ],
        },
      },
      {
        line: "\"Subaru's doing paperwork in the common room. I'm keeping him company. You should join.\"",
        approach: "Join the common room",
        greeting:
          '"Subaru asked if you\'re doing okay. I told him you seem tougher than you look. Was I right?"',
        responses: {
          kind: ["Join them both gladly", "Say you're glad to help"],
          playful: [
            "Ask what Subaru really thinks",
            "Tease him for keeping tabs",
          ],
          bold: [
            "Say you're tougher, plainly",
            "Prove Subaru right on purpose",
          ],
          neutral: ["Join quietly, say little", "Sit without much comment"],
        },
      },
      {
        line: '"That old thing?" He tucks the charm back out of sight. "Something I grabbed on my way out. Never got around to throwing it away."',
        approach: "Ask about the charm",
        greeting:
          '"Ha ha. You\'ve got that look again. It\'s nothing interesting, promise."',
        responses: {
          kind: ["Let him keep the charm", "Say there's no need to explain"],
          playful: ["Guess what the charm does", "Demand to see it properly"],
          bold: ["Ask what it's really for", "Push past the deflection"],
          neutral: ["Let it go unremarked", "Say nothing about the charm"],
        },
      },
      {
        line: '"I\'ve been keeping tabs on you." He doesn\'t bother denying it. "Somebody\'s got to get to the bottom of that curse of yours."',
        approach: "Ask if that's really why",
        greeting:
          "\"How's the search for clues about your curse going? Don't try to carry the whole thing yourself. I've got time. Point me at whatever's next.\"",
        responses: {
          kind: ["Thank him for the help", "Say you appreciate it"],
          playful: ["Call it stalking, lightly", "Tease him for keeping tabs"],
          bold: ["Ask what he's really after", "Demand the real reason"],
          neutral: ["Accept the help, say little", "Let him keep helping"],
        },
      },
      {
        line: "He's the one still up when you can't sleep, like he timed it that way.",
        approach: "Wait him out",
        greeting: [
          '"Oh hey. Didn\'t peg you as a regular around here, but here you are again."',
          '"You never scream anymore when I sneak up on you. Kind of took the fun out of it, honestly."',
        ],
        responses: {
          kind: ["Say you're glad he's up too", "Sit with him a while"],
          playful: ["Ask if he ever sleeps", "Tease him for waiting up"],
          bold: ["Say he timed it on purpose", "Call out the waiting"],
          neutral: ["Sit quietly with him", "Say nothing, just stay"],
        },
      },
      {
        line: '"Devilish charm," Zenji calls it. Haku just shrugs like the label\'s not his problem.',
        approach: "Ask if it's true",
        greeting:
          '"Zenji says hi, by the way. Well, he said something longer, but that was the gist."',
        responses: {
          kind: ["Say the charm suits him", "Defend him kindly"],
          playful: [
            "Ask which charm he means",
            "Tease him about being devilish",
          ],
          bold: ["Say Zenji's not wrong", "Agree with Zenji outright"],
          neutral: ["Shrug at the label", "Let the label stand"],
        },
      },
    ],
    warm: [
      {
        line: '"Careful, princess. Sit that close and people start talking." He doesn\'t move away.',
        approach: "Take the space beside him",
        greeting:
          '"You make it hard to stay unbothered. Take that as a compliment."',
        responses: {
          kind: "Stay close, unbothered",
          playful: "Let them talk",
          bold: "Sit even closer",
          neutral: "Stay put, say nothing",
        },
      },
      {
        line: 'He catches your sleeve as you pass. "Stay a minute. The place is better with you in it. ...God, ignore that."',
        approach: "Stay the minute",
        greeting: "\"I'd say I wasn't waiting for you. ...Nah. I was.\"",
        responses: {
          kind: "Stay the minute gladly",
          playful: "Ask what he meant",
          bold: "Call out what he said",
          neutral: "Stay, say nothing",
        },
      },
      {
        line: "\"You know Zenji's decided I've got a thing for you?\" A beat. \"He's not wrong. Don't tell him.\"",
        approach: "Call his bluff",
        greeting:
          '"There you are. If you ever want to talk, the curse or anything else, I\'ll listen."',
        responses: {
          kind: "Let the rumor be true",
          playful: "Ask what tipped Zenji off",
          bold: "Say Zenji's right",
          neutral: "Shrug at the rumor",
        },
      },
      {
        line: '"Boo." You don\'t flinch anymore. He looks almost let down. "...Shame. It was a good excuse to catch your arm."',
        approach: "Refuse to flinch",
        greeting:
          '"Tch. Guess I need a new excuse. Give me a sec, I\'ll think of one."',
        responses: {
          kind: "Say the boo still works",
          playful: "Boo him back",
          bold: "Grab his arm first",
          neutral: "Stay unbothered",
        },
      },
      {
        line: "\"Wish I hadn't missed you in your pajamas this morning. ...I'm going to leave that there and see how it does.\"",
        approach: "Don't let him take it back",
        greeting:
          '"...Huh. Okay. Then I\'m not taking it back. Your call how that goes."',
        responses: {
          kind: "Let the comment stand",
          playful: "Ask what else he noticed",
          bold: "Say he can keep looking",
          neutral: "Let it go unremarked",
        },
      },
      {
        line: '"I had a nap planned. You\'re barely more interesting." He pats the step beside him.',
        approach: "Smile at him on purpose",
        greeting: "\"Hey, you're smiling at me. That's cheating.\"",
        responses: {
          kind: "Smile at him again",
          playful: "Call it cheating right back",
          bold: "Smile wider on purpose",
          neutral: "Sit down, say nothing",
        },
      },
      {
        line: "\"Up you get. I'm seeing you to your door tonight. ...It's the one chore I've never minded.\"",
        approach: "Walk you to your door",
        greeting:
          "\"Walk with me a bit. It's been too quiet tonight, and I'd rather not be the only one who notices.\"",
        responses: {
          kind: "Thank him for walking you",
          playful: "Call it his favorite chore",
          bold: "Say he likes the excuse",
          neutral: "Walk with him quietly",
        },
      },
    ],
    spark: [
      {
        line: "You fall asleep against his shoulder. He stays put until his arm goes numb, and then a while longer.",
        approach: "Stay leaned on him",
        greeting:
          '"Don\'t let it go to your head, princess, but I cleared my whole evening for this."',
        responses: {
          kind: "Stay tucked against him",
          playful: "Fake-snore for effect",
          bold: "Wake him with a kiss",
          neutral: "Let the quiet stretch",
        },
      },
      {
        line: "He takes your hand to steady you over a loose board, and then just... keeps it.",
        approach: "Keep his hand",
        greeting:
          '"If I lean any closer I\'ll have to explain myself. ...Want me to?"',
        responses: {
          kind: "Let him off the hook",
          playful: "Out-blank him",
          bold: "Close the last inch",
          neutral: "Let him keep holding it",
        },
      },
      {
        line: '"I had a whole thing I was going to say. You\'ve wrecked it. Again. ...Do that more often."',
        approach: "Wreck his plans again",
        greeting:
          '"Mind if I drop the polite act for a second? ...You look unfair tonight."',
        responses: {
          kind: "Say his plans deserved it",
          playful: "Make him say it again",
          bold: "Say it first",
          neutral: "Let him regroup",
        },
      },
      {
        line: "The joke he'd normally hide behind doesn't come. He lets you watch him mean it.",
        approach: "Let him mean it",
        greeting: [
          '"Say something. You go quiet and I start saying things I actually mean."',
          '"I\'ve spent years keeping everything light. Not really working right now."',
        ],
        responses: {
          kind: "Let him mean it quietly",
          playful: "Tease him for slipping",
          bold: "Don't let him keep it light",
          neutral: "Stay quiet, let him mean it",
        },
      },
      {
        line: '"For what it\'s worth, I like you. You can take it or leave it, whatever you want."',
        approach: "Sit in the quiet with him",
        greeting:
          '"I\'m going to regret being this honest in about an hour. Let me have it now."',
        responses: {
          kind: "Say it back, low-key",
          playful: "Play along with the bit",
          bold: "Say you feel the same, loudly",
          neutral: "Move over",
        },
      },
    ],
    close: [
      {
        line: '"I keep waiting for you to turn up," he admits, the easy deflection gone for a second. "More than I should."',
        approach: "Get in before he does",
        greeting:
          "\"I... you've turned into someone I look forward to. That's not nothing, for me.\"",
        responses: {
          kind: "Say you're staying",
          playful: "Actually make him laugh",
          bold: "Say it before he does",
          neutral: "Share the step in silence",
        },
      },
      {
        line: "He says something that costs him, means every word of it, then immediately looks like he wishes he could take it back.",
        approach: "Tell him what's eating you",
        greeting:
          "\"My whole life I've half-assed anything that mattered, so it couldn't hurt when it broke. Then you turned up.\"",
        responses: {
          kind: "Say the repairs can wait",
          playful: "Tease him gently about it",
          bold: "Push him to stop hiding",
          neutral: "Let the night settle",
        },
      },
      {
        line: '"Would you..." He stops. Doesn\'t try again. Just moves a little closer instead.',
        approach: "Ask what he almost said",
        greeting:
          '"Let me say it before I talk myself out of it: I want you to stay."',
        responses: {
          kind: "Finish the sentence for him",
          playful: "Guess what he almost asked",
          bold: "Name what this is",
          neutral: "Let him move closer",
        },
      },
      {
        line: "The lightness drops. What's underneath is very tired and very honest.",
        approach: "Sit down hard beside him",
        greeting:
          '"Stop looking at me like that. ...No. Don\'t. Keep doing that."',
        responses: {
          kind: "Stay honest with him too",
          playful: "Tease him lightly, gently",
          bold: "Keep looking, don't look away",
          neutral: "Be quiet with him",
        },
      },
      {
        line: "He takes your hand, properly this time, and doesn't let go first.",
        approach: "Take his hand first",
        greeting:
          '"Give me your hand. ...Yeah. I\'m going to be unbearable about this later."',
        responses: {
          kind: "Say you'd have waited",
          playful: "Warn him he started it",
          bold: "Hold on just as tight",
          neutral: "Let him hold on, say nothing",
        },
      },
    ],
    bound: [
      {
        line: "He's stopped keeping it light. Turns out there was a lot he'd been keeping light.",
        approach: "Say yes",
        greeting:
          '"I had a whole polite way of being about this. It\'s gone. Good riddance."',
        responses: {
          kind: "Let him hold on",
          playful: "Tease him for dropping the act",
          bold: "Don't wait for him",
          neutral: "Stay still",
        },
      },
      {
        line: "He kisses you like a man who spent months talking himself out of it and finally quit arguing.",
        approach: "Pull him in",
        greeting:
          '"I love you. Got it out without stalling. You catch that? I caught that."',
        responses: {
          kind: "Say it back",
          playful: "Say it back, flat",
          bold: "Pull him back down",
          neutral: "Let the night burn down",
        },
      },
      {
        line: '"I keep meaning to play this cool," he says against your mouth. "Going badly."',
        approach: "Don't let go",
        greeting: '"Come here and let me stop playing this cool."',
        responses: {
          kind: "Let him play it badly",
          playful: "Spook him for once",
          bold: "Kiss him mid-sentence",
          neutral: "Let the cool slip away",
        },
      },
      {
        line: "He works the knot of your collar loose with the patience of someone who's thought about it a great deal.",
        approach: "Stay over",
        greeting: '"Stay. Let the dorm talk. I stopped minding a while back."',
        responses: {
          kind: "Stay right where you are",
          playful: "Tease him for taking his time",
          bold: "Undo it yourself instead",
          neutral: "Let him take his time",
        },
      },
      {
        line: "The lazy calm is still there. It's just aimed entirely at you now.",
        approach: "Let him be lazy with you",
        greeting:
          '"This okay? ...You never say no. I\'ll be honest, I like that more than I should."',
        responses: {
          kind: "Settle into the lazy calm",
          playful: "Hog the whole step",
          bold: "Claim all his attention",
          neutral: "Drift back to sleep",
        },
      },
    ],
  },
  // Evening block: dialogue and approach paired per beat
  // (docs/dialogue-approach-pairing.md) instead of two separately-drawn lists.
  dialogueWhen: [
    {
      when: { time: "evening" },
      dialogue: {
        new: [
          {
            line: "He's sitting out watching the dark come in. \"...Oh. It's you. Sit, if you want.\"",
            approach: "Take the step beside him",
          },
          {
            line: '"You\'re out late. This isn\'t a great place to wander around alone after dark." A beat. "...I\'ll come with you."',
            approach: "Head in out of the dark",
          },
          {
            line: '"It\'s been too quiet tonight. Probably nothing." He doesn\'t sound sure. "Stick around a bit."',
            approach: "Take the step beside him",
          },
          {
            line: "\"Watch your feet on the way in. Don't come crying to me if a fox spirit gets you.\" He's mostly joking.",
            approach: "Head in out of the dark",
          },
        ],
        known: [
          {
            line: '"You always turn up right as it gets dark. I\'ve stopped calling it luck."',
            approach: "Fall into step with him",
          },
          {
            line: "\"Walk you back? It's dark, and I'm only half doing it to be nice.\"",
            approach: "Fall into step with him",
          },
          {
            line: "\"There's something I've been meaning to tell you. Not tonight. Walk with me anyway.\"",
            approach: "Fall into step with him",
          },
          {
            line: "\"I'm walking you back. Don't argue. I've decided, and I'm too lazy to decide twice.\"",
            approach: "Fall into step with him",
          },
        ],
        warm: [
          {
            line: '"Stay a while. It\'s quieter with someone else here."',
            approach: "Let him walk you back",
          },
          {
            line: '"Can\'t sleep? Me neither. Walk with me a bit. It helps, the company."',
            approach: "Let him walk you back",
          },
          {
            line: "\"Too bad I couldn't walk you back. Safety thing. ...Fine, and I wanted to catch you in your pjs. It's allowed to be both.\"",
            approach: "Let him walk you back",
          },
        ],
      },
    },
  ],
  // No temperamentDialogue pool: every leftover line was placed onto a
  // dialogue beat's `greeting` (docs/dialogue-greeting-pairing.md).
  // kind is Haku's channel — low-key, unsentimental care he doesn't have to
  // perform anything back for (affinityByResponse.kind = 2). playful reaches
  // him too: deadpan and playing along when he spooks you is his default
  // register, but it reads as his deflection more than a real bid, so it lands
  // softer (1). bold glances off (0) — he meets forwardness by keeping it
  // light and undercutting himself, so those moves read as the player pushing
  // and Haku stepping back rather than meeting it.
  //
  // No top-level `responses` pool: every dialogue[tier] beat (new/known/warm/
  // spark/close/bound) now carries bespoke responses for all four types (see
  // dialogue above), making the old per-tier pools fully unreachable — same
  // end state as yuri.js/benkei.js/jin.js/kaito.js/lucas.js/tohma.js/leo.js/
  // shohei.js/subaru.js/zenji.js. One neutral label had no genuine beat match
  // ("Pretend you dozed off") and was dropped rather than force-placed.
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
      "**{name}** hears his name and the unbothered act slips for about a second. {user} caught it.",
      '"You make it hard to stay unbothered." **{name}** says it to {user} like a complaint.',
      "{user} got there first, and **{name}** stops pretending to be asleep.",
    ],
    close: [
      "**{name}** has stopped keeping it light. {user} calling his name did that.",
      '"Yeah, yeah. Coming." **{name}** is already up for {user}.',
      "{user} calls, and **{name}** leaves the busted fixture exactly where it is.",
    ],
    bound: [
      '"I keep meaning to play this cool," **{name}** tells {user}. "Going badly."',
      "**{name}** crosses to {user} like a man who quit arguing with himself months ago.",
      "{user} says the name, and **{name}** doesn't deflect it. Not even a little.",
    ],
  },
};
