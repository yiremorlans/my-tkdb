export default {
  // The level-up DMs (docs/bond-scene-dms.md). Haku deflects every sincere
  // thing said to him and spooks people to watch their faces. The joke carries
  // the acquaintance scene (a test he swears wasn't one); from friend on he
  // leads with the sincere thing instead (her first week, his own coasting),
  // and what deflection is left is thin and he knows it. He sees what nobody
  // else can, and the last thing he admits is that being the only one who sees
  // is lonely.
  //
  // Texting voice, per reference.md's "## Bond Scenes" notes: he clips words
  // ("prob", "No prob") and drops "tbh" into his typed lines, but writes in
  // normal sentence case, not all-lowercase. Not in the `> ` lines he says out
  // loud.
  bondScenes: {
    acquaintance: {
      beats: [
        "**{firstName}**: Hey, it's Haku. Got your number the boring way, before you ask.\n\nI do actually have a reason for this. I also just wanted an excuse to text you. The reason came first. Barely.",
        "Okay, real reason. There's something in the middle of the Hotarubi hall floor, been there for years. Everyone walks straight through it and blames the headache on the weather.\n\nExcept you. {timesMet} times here, and you're the only one I've watched go around it instead of through. Could be nothing. I've been curious ever since tbh, so I'm asking.",
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
        line: "The thing on the hall floor that you stepped around without knowing.",
      },
    },

    friend: {
      beats: [
        "**{firstName}**: Been thinking about your first week here.",
        "Wanting to go home that bad, and staying anyway. I know that wasn't easy. You made the right call. I mean that, even on the days it doesn't feel like it.\n\nAll that going on, and somehow you've still got {favResponse} for me every time. Most people figure I'm a slacker and don't ask much of me tbh.\n\nCan't really pull that with you, though. Your curse, the missions, all of it. Not gonna half-ass this one.",
      ],
      choice: {
        prompt: "Not to pry, but... you still think about leaving sometimes?",
        options: [
          {
            key: "kind",
            label: "Say you're glad you stayed",
            style: 3,
            close:
              "Good, that's a relief.\n\nOn the days it's rough, come find me. If you want to talk, I'm happy to listen.",
          },
          {
            key: "playful",
            label: "Say only on Mondays",
            style: 1,
            close:
              "Fair. Mondays are rough here.\n\nI'll come find you on Mondays, then. I'll bring tea.",
          },
          {
            key: "bold",
            label: "Ask if he'd come after you",
            style: 4,
            close:
              "You'd make me run after you? That's a lot of effort, princess.\n\n...Yeah. I would.",
          },
        ],
      },
      keepsake: {
        emoji: "🧳",
        line: "The first week you almost left, and didn't.",
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
        "Here's the thing about being the only one who sees. Everyone thinks it's frightening. It's not frightening, it's lonely: you're in a room full of people and there's a whole other room and you're the only one in it.\n\nYou came into the other room. You didn't even make a thing of it. You just started stepping around stuff on the floor and sitting on a freezing veranda with a kid you can't see.",
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
          '"Haha. Most people take that as a hint and wander off. Pull up some step, there\'s plenty."',
        responses: {
          kind: ["Let him keep it light", "Say he's selling himself short"],
          playful: ["Ask for a magic trick", "Call him a street magician"],
          bold: ["Say you expect more of him", "Ask what he's hiding"],
          neutral: ["Sit and say nothing", "Take the step beside him"],
        },
      },
      {
        line: 'He\'s stretched out on the bench and waves a lazy hand in your direction. "Hey. Give me five more minutes."',
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
        line: '"You shouldn\'t be out this far alone." He\'s already up. "I\'ll walk you to the lights, at least."',
        approach: "Walk with him",
        greeting:
          "\"Stay where I can see you. It's not far. ...And don't look at the treeline.\"",
        responses: {
          kind: ["Stay where he can see you", "Keep your eyes off the trees"],
          playful: ["Ask if he's being dramatic", "Ask if a fox spirit's out"],
          bold: ["Walk off on your own", "Say you can handle the dark"],
          neutral: ["Let him walk, say nothing", "Fall into step quietly"],
        },
      },
    ],
    known: [
      {
        line: '"Look at that. Sun\'s going down and nothing\'s exploded." He sounds honestly relieved. "Might actually get through today without a disaster."',
        approach: "Say the day's not over yet",
        greeting:
          "\"Don't. You'll jinx it. ...Okay, sit. If something goes wrong, at least I'll have a witness.\"",
        responses: {
          kind: ["Sit and keep him company", "Promise not to jinx it"],
          playful: ["Jinx it anyway", "Knock on wood for him"],
          bold: ["Bet on a disaster by dark", "Say you'll handle any disaster"],
          neutral: ["Sit, say nothing", "Watch the sun go down"],
        },
      },
      {
        line: "\"Zenji's got me filming him again. He's wandered off to pick the spot, and it's never the easy one.\"",
        approach: "Offer to help film",
        greeting:
          '"Hold the reflector, then. If he starts saying nobody wants his old stories, tell him you do. He\'ll believe it from you."',
        responses: {
          kind: ["Offer to help him film", "Say you don't mind waiting"],
          playful: ["Guess the worst possible spot", "Tease Zenji's pickiness"],
          bold: ["Pick the spot yourself", "Take over the filming"],
          neutral: ["Wait for Zenji, say nothing", "Watch without helping"],
        },
      },
      {
        line: '"You again." He doesn\'t sound put out about it. "Third time this week. Not that I\'m counting."',
        approach: "Say you'll keep turning up",
        greeting: '"Don\'t look so pleased," he says with a smirk.',
        responses: {
          kind: ["Say you like being counted on", "Say you've kept count too"],
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
          kind: ["Admit you actually slept", "Laugh and wipe it off"],
          playful: ["Deny the sleep mark", "Blame the pillow"],
          bold: ["Say he's staring", "Ask why he's checking"],
          neutral: ["Wipe it off, say nothing", "Ignore the comment"],
        },
      },
      {
        line: '"Made too much tea. You\'ll have to help me with it." He did not make too much tea by accident.',
        approach: "Help him with the tea",
        greeting:
          '"Grab a cup, then. I\'d have drunk all of it myself and regretted it around midnight."',
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
          kind: [
            "Offer to cover his next one",
            "Say that saved you a headache",
          ],
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
        greeting: '"Walk you back? Purely practical. It\'s on my way."',
        responses: {
          kind: ["Say you'll take practical", "Fall into step beside him"],
          playful: ["Ask what 'mostly' means", "Call out the practical excuse"],
          bold: ["Say he wants to walk with you", "Refuse the excuse entirely"],
          neutral: ["Walk along, say nothing", "Let him walk without comment"],
        },
      },
      {
        line: "In the Hotarubi hall he steps around the same patch of floor you do, and gives you a look like you're both in on something.",
        approach: "Step around it with him",
        greeting: '"Still going around it, huh. Good. Keep doing that."',
        responses: {
          kind: ["Say you'll keep going around", "Share the look with him"],
          playful: ["Hop over it instead", "Ask what happens if you don't"],
          bold: ["Ask what it actually is", "Step closer to it, testing"],
          neutral: ["Go around it, say nothing", "Keep walking past"],
        },
      },
      {
        line: "\"Subaru's doing paperwork in the common room. I'm keeping him company. You should join.\"",
        approach: "Join the common room",
        greeting:
          '"Subaru asked if you\'re doing okay. I told him you seem tougher than you look. Was I right?"',
        responses: {
          kind: ["Say you're holding up", "Say you're glad to help"],
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
        line: '"Saw Tohma earlier. First real chat we\'ve had in a while." He sounds almost pleased. "Guy\'s got his hands full, as always."',
        approach: "Ask how Tohma's doing",
        greeting:
          '"Busy. Tired. Pretending he isn\'t. ...Takes one to know one, I guess."',
        responses: {
          kind: ["Say they both need a break", "Say you're glad they talked"],
          playful: ["Ask who's more tired", "Call them two of a kind"],
          bold: ["Say he should rest too", "Ask what they talked about"],
          neutral: ["Listen, say nothing", "Nod along quietly"],
        },
      },
      {
        line: '"I\'ve been keeping tabs on you." He says it like it\'s nothing. "Somebody\'s got to keep an eye on you and that curse."',
        approach: "Ask if that's really why",
        greeting:
          "\"How's the search for clues going? Don't try to carry the whole thing yourself. If you ever want to talk it through, I'm happy to listen.\"",
        responses: {
          kind: ["Say you won't go it alone", "Say you appreciate it"],
          playful: ["Call it stalking, lightly", "Tease him for keeping tabs"],
          bold: ["Ask him to help you look", "Say you'll take him up on it"],
          neutral: ["Accept the help, say little", "Let him keep helping"],
        },
      },
      {
        line: "He's the one still up when you can't sleep, like he timed it that way.",
        approach: "Wait him out",
        greeting: [
          "\"Can't sleep either? Pull up a seat. I'm not great company this late, but I'm here.\"",
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
          '"Devilish? Ha ha. That\'s Zenji being Zenji. He needs everything to have a title."',
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
          '"Ha ha. Don\'t look at me like that. It was a warning, not an invitation. ...Mostly."',
        responses: {
          kind: ["Say you'll risk the talk", "Say gossip doesn't scare you"],
          playful: ["Let them talk", "Ask what they'd say"],
          bold: ["Sit even closer", "Dare him to move away"],
          neutral: ["Stay put, say nothing", "Sit at a normal distance"],
        },
      },
      {
        line: 'He catches your sleeve as you pass. "Stay a minute. The place is better with you in it."',
        approach: "Stay the minute",
        greeting: "\"I'd say I wasn't waiting for you. ...Nah. I was.\"",
        responses: {
          kind: ["Say you're glad he waited", "Say the minute's his"],
          playful: ["Ask what he meant", "Refuse to ignore that"],
          bold: ["Call out what he said", "Ask him to say it again"],
          neutral: ["Stay put, no comment", "Stay, pretend you missed it"],
        },
      },
      {
        line: "\"You know Zenji's got a whole theory about you and me?\" He doesn't say whether Zenji's wrong. He just lets it sit.",
        approach: "Ask if Zenji's wrong",
        greeting:
          "\"Ha ha. Nice try. I'm not grading Zenji's homework for him.\"",
        responses: {
          kind: ["Let him keep his answer", "Promise not to ask Zenji"],
          playful: ["Ask what tipped Zenji off", "Threaten to ask Zenji"],
          bold: ["Say Zenji might be right", "Ask for a straight answer"],
          neutral: ["Shrug at the theory", "Let the theory sit"],
        },
      },
      {
        line: '"Boo." You don\'t flinch anymore. He looks almost let down. "...Shame. Your reactions were the best part of my week."',
        approach: "Ask if he's disappointed",
        greeting:
          '"Ha. A little. Guess I\'ll have to get creative. Give me a sec."',
        responses: {
          kind: ["Say the boo still works", "Offer him a real reaction"],
          playful: ["Boo him back", "Offer a fake flinch"],
          bold: ["Tell him to try harder", "Say you'll never flinch again"],
          neutral: ["Wait for the new scare", "Walk on, say nothing"],
        },
      },
      {
        line: '"You\'ve been quiet all day." He drops down next to you. "Everyone here comes from somewhere different, you know. No reason you should feel out of place."',
        approach: "Admit you've felt out of place",
        greeting:
          "\"Figured. For what it's worth, you fit in here better than most of us did at first. I'd know.\"",
        responses: {
          kind: ["Ask how long it took him", "Say he makes it easier"],
          playful: ["Ask who fit in worst", "Ask if that's a compliment"],
          bold: ["Ask what 'I'd know' means", "Say he fits in fine now"],
          neutral: ["Sit with that a while", "Lean back, say nothing"],
        },
      },
      {
        line: '"I had a nap planned. You\'re barely more interesting." He pats the step beside him.',
        approach: "Smile at him on purpose",
        greeting: "\"Hey, you're smiling at me. That's cheating.\"",
        responses: {
          kind: ["Smile at him again", "Take the step he patted"],
          playful: [
            "Call it cheating right back",
            "Say he's barely interesting",
          ],
          bold: ["Smile wider on purpose", "Tell him to cancel the nap"],
          neutral: ["Sit down, say nothing", "Take the step, quiet"],
        },
      },
      {
        line: "\"Up you get. I'm seeing you to your door tonight. ...It's the one chore I've never minded.\"",
        approach: "Let him walk you to your door",
        greeting:
          "\"Walk with me a bit. It's been too quiet tonight, and I'd rather not be the only one who notices.\"",
        responses: {
          kind: ["Say you like the company", "Say the walk is nice"],
          playful: [
            "Call it his favorite chore",
            "Ask for door-to-door service",
          ],
          bold: ["Say he likes the excuse", "Take his arm on the way"],
          neutral: ["Walk on in silence", "Let him see you home"],
        },
      },
      {
        line: "You're lingering at the edge of the mission briefing when he falls in beside you. \"Cold feet? Good. Means you're a normal human being.\"",
        approach: "Admit you're nervous",
        greeting:
          "\"We're the crazy ones, not you. If you want to talk it through after, I'll listen.\"",
        responses: {
          kind: ["Say that helps, actually", "Ask him to check in after"],
          playful: ["Ask how crazy he is", "Say he's not that crazy"],
          bold: ["Say you're going anyway", "Ask if he's ever nervous"],
          neutral: ["Take a breath, say nothing", "Stand with him a while"],
        },
      },
      {
        line: '"Hey there, stranger." He\'s up before you\'ve made it across the room. "Everyone\'s missed you, you know."',
        approach: "Say you're back",
        greeting:
          '"...Even I was starting to get a little worried. Don\'t make a thing of it."',
        responses: {
          kind: ["Say you missed him too", "Apologize for disappearing"],
          playful: ["Make a thing of it", "Ask how worried, exactly"],
          bold: ["Say you knew he'd worry", "Say he was your first stop"],
          neutral: ["Let it go unremarked", "Just say hi back"],
        },
      },
      {
        line: '"Your parents ever tell you ghosts get the ones who don\'t go to bed?" He looks at the clock, pointedly. "Just asking."',
        approach: "Say you're not tired",
        greeting:
          '"Weird. Zenji\'s the only one who ever gets spooked by that one. ...Bed. Go on."',
        responses: {
          kind: ["Say you'll go in a minute", "Tell him to sleep too"],
          playful: ["Ask if he's the ghost", "Say Zenji's got a point"],
          bold: ["Say you'll stay up anyway", "Stay up just to prove it"],
          neutral: ["Head off to bed", "Say goodnight quietly"],
        },
      },
      {
        line: '"Clementia, then Frostheim, now here." He knocks on the wall beside him. "Third house. First one I\'ve bothered learning which boards creak."',
        approach: "Ask why this one stuck",
        greeting:
          "\"Ha ha. Long story, and I'm lazy. Short version: this one's got better company.\"",
        responses: {
          kind: ["Say you're glad it stuck", "Say Hotarubi suits him"],
          playful: ["Ask which boards creak", "Ask who the company is"],
          bold: ["Ask for the long version", "Say you're the company"],
          neutral: ["Let him keep the story", "Listen to the boards creak"],
        },
      },
      {
        line: "Someone's had you cornered with questions about your curse for twenty minutes. Haku wanders over, says about three words, and they leave.",
        approach: "Ask what he said to them",
        greeting:
          '"Told them you were needed at Hotarubi. Technically true. Nobody else was going to get you out of there."',
        responses: {
          kind: ["Play along with his story", "Say that was kind of him"],
          playful: ["Ask who needed you", "Call it a daring rescue"],
          bold: ["Say you had it handled", "Ask if he was watching"],
          neutral: ["Walk off with him quietly", "Let it pass without comment"],
        },
      },
      {
        line: "He slides your notes out from under your hand. \"Don't put so much pressure on yourself. It's okay to half-ass stuff, you know.\"",
        approach: "Let him take the notes",
        greeting:
          '"I\'m a professional. Step one, put it down. Step two, there is no step two."',
        responses: {
          kind: ["Say you'll take a break", "Let him take the notes"],
          playful: ["Ask for his professional tips", "Try to snatch them back"],
          bold: ["Say you can't half-ass this", "Make him take a break too"],
          neutral: ["Put the pen down", "Sit back, say nothing"],
        },
      },
      {
        line: "He nods at an empty chair on the way past, polite, the way you'd nod at a neighbor. \"Don't mind him. He only sits there on Thursdays.\"",
        approach: "Nod at the chair too",
        greeting:
          '"Ha ha. You nodded. He\'s going to be insufferable about that."',
        responses: {
          kind: ["Say hello to the chair", "Ask if he's friendly"],
          playful: ["Ask what he's like", "Ask if it's Thursday"],
          bold: ["Ask if he's really there", "Sit in the chair"],
          neutral: ["Keep walking", "Leave the chair alone"],
        },
      },
      {
        line: "He's halfway up a ladder under a busted light fixture. \"Oh, good. Hold that. The ladder, not the fixture. The fixture's got opinions.\"",
        approach: "Hold the ladder steady",
        greeting:
          "\"This dorm's seen better days. Somebody's got to keep it standing, and it's never the geniuses.\"",
        responses: {
          kind: ["Ask if he needs a hand", "Say you'll stay till he's done"],
          playful: ["Ask about the opinions", "Threaten to let go"],
          bold: ["Climb up and help", "Ask why it's always him"],
          neutral: ["Keep the ladder steady", "Watch him work"],
        },
      },
      {
        line: "He said today didn't really work for him. He turns up anyway, with a very weak excuse already loaded.",
        approach: "Ask for the weak excuse",
        greeting:
          '"The excuse is I finished early. I actually did finish early. Nobody believes me, it\'s very insulting."',
        responses: {
          kind: ["Say you're glad he came", "Say he didn't need one"],
          playful: ["Rate the excuse out of ten", "Ask what he's skipping"],
          bold: ["Say he came to see you", "Ask why he really came"],
          neutral: ["Just make room for him", "Let the excuse stand"],
        },
      },
      {
        line: '"All these geniuses and their lectures are giving me heartburn." He drops onto the bench beside you. "Complain to me about something. Anything normal."',
        approach: "Complain about your day",
        greeting:
          '"Yes. Perfect. Nobody invented anything or summoned anything. Keep going."',
        responses: {
          kind: ["Tell him the whole thing", "Ask about his day instead"],
          playful: ["Complain about him", "Invent a worse problem"],
          bold: ["Make him go first", "Say he needs it more than you"],
          neutral: ["Keep it short", "Grumble, then go quiet"],
        },
      },
      {
        line: '"Everyone in Hotarubi\'s got one thing they pour their whole heart into. I lose interest way too easily." He glances at you. "...Mostly."',
        approach: "Ask what the exception is",
        greeting:
          '"Ha ha. No. I\'m not answering that one. Try me again in a week."',
        responses: {
          kind: ["Let him keep the answer", "Say you don't bore easily"],
          playful: ["Guess the exception", "Ask if it's his naps"],
          bold: ["Say it's you, then", "Ask why he said mostly"],
          neutral: ['Let the "mostly" sit', "Leave it there"],
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
          playful: "Tease him about it",
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
          playful: "Tease him, but lightly",
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
  // kind is Haku's channel — low-key, unsentimental care he doesn't have to
  // perform anything back for (affinityByResponse.kind = 2). playful reaches
  // him too: deadpan and playing along when he spooks you is his default
  // register, but it reads as his deflection more than a real bid, so it lands
  // softer (1). bold glances off (0) — he meets forwardness by keeping it
  // light and undercutting himself, so those moves read as the player pushing
  // and Haku stepping back rather than meeting it.
  //
  // When the old per-tier `responses` pool was folded onto the beats above,
  // one neutral label had no genuine beat match ("Pretend you dozed off") and
  // was dropped rather than force-placed.
  // The /call reveal lines for this character, keyed by the register in
  // WINNER_LINE_BUCKETS (constants/publicEncounters.js). Picked from at random
  // like the dialogue; {user} is the winner's mention and {name} their full
  // name, and the embed's winner line is the only place the reveal names
  // either of them. A register left out here falls back to the generic
  // WINNER_LINES pool.
  winnerLines: {
    new: [
      {
        line: '**{name}** gives {user} an easy smile. "Got it in one. Not bad."',
        responses: {
          kind: "Say he wasn't hard to find",
          playful: "Ask for a prize",
          bold: "Say you don't miss",
        },
      },
      {
        line: '{user} says the name, and **{name}** glances at something just over their shoulder. "...Ignore that."',
        responses: {
          kind: "Ignore it, for him",
          playful: "Wave at whatever it is",
          bold: "Ask what you're ignoring",
        },
      },
      {
        line: "\"Yep, that's me.\" **{name}** asks {user} if they need anything while they're here.",
        responses: {
          kind: "Say his company is enough",
          playful: "Ask what's on offer",
          bold: "Ask what he's doing here",
        },
      },
      {
        line: '**{name}** smiles at {user}, then his eyes flick to something just past their shoulder. "Hey. Don\'t turn around for a sec, okay?"',
        responses: {
          kind: "Stay still and trust him",
          playful: "Turn around anyway",
          bold: "Ask what's back there",
        },
      },
    ],
    known: [
      {
        line: '{user} calls, and **{name}** hands them the umbrella he was holding. "Rain\'s coming. Trust me on that one."',
        responses: {
          kind: "Take it and trust him",
          playful: "Bet him it stays dry",
          bold: "Ask how he knows",
        },
      },
      {
        line: '**{name}** is sorting out a question Subaru passed his way when {user} calls it. "Hotarubi stuff. Done now. What\'s up?"',
        responses: {
          kind: "Ask if Subaru's okay",
          playful: "Ask what Subaru broke",
          bold: "Say you need a favor",
        },
      },
      {
        line: '**{name}** is halfway through chasing down late papers when {user} calls it. "Good timing. Two names left. Want to help?"',
        responses: {
          kind: "Say you'll help find them",
          playful: "Ask if your name's on it",
          bold: "Say they're his problem",
        },
      },
    ],
    warm: [
      {
        line: "**{name}** shifts over on the step. The space is for {user}.",
        responses: {
          kind: "Sit in the space",
          playful: "Ask if it's reserved",
          bold: "Sit right up next to him",
        },
      },
      {
        line: '"There you are." **{name}** has already saved {user} the good end of the bench. "...It was free anyway."',
        responses: {
          kind: "Take the good end",
          playful: "Say you believe him, sure",
          bold: "Say he saved it for you",
        },
      },
      {
        line: "{user} calls it, and **{name}** is already looking their way. \"Knew it'd be you. Don't ask how.\"",
        responses: {
          kind: "Don't ask how",
          playful: "Ask if a ghost told him",
          bold: "Ask how anyway",
        },
      },
    ],
    spark: [
      {
        line: "**{name}** hears his name and the unbothered act slips for about a second. {user} caught it.",
        responses: {
          kind: "Let it slide",
          playful: "Say you caught that",
          bold: "Ask what slipped",
        },
      },
      {
        line: '"Took you long enough, princess." **{name}** says it just loud enough for {user} to hear.',
        responses: {
          kind: "Say sorry for the wait",
          playful: "Curtsy for him",
          bold: "Say don't call you that",
        },
      },
      {
        line: "{user} got there first, and **{name}** stops pretending to be asleep.",
        responses: {
          kind: "Say you knew he was awake",
          playful: "Pretend to be asleep too",
          bold: "Ask why he was faking",
        },
      },
    ],
    close: [
      {
        line: '"Yeah, yeah. Coming." **{name}** is already up for {user}.',
        responses: {
          kind: "Wait for him",
          playful: "Ask if he's really coming",
          bold: "Say he's quick for once",
        },
      },
      {
        line: "{user} calls, and **{name}** leaves the busted fixture exactly where it is.",
        responses: {
          kind: "Say it can wait",
          playful: "Ask if it's haunted",
          bold: "Say he should fix it",
        },
      },
      {
        line: "**{name}** starts a joke on reflex, looks at {user}, and lets it go unfinished.",
        responses: {
          kind: "Say he doesn't need it",
          playful: "Ask for the punchline",
          bold: "Ask why he stopped",
        },
      },
    ],
    bound: [
      {
        line: "{user} says the name, and **{name}** doesn't deflect it. Not even a little.",
        responses: {
          kind: "Say you'll take it",
          playful: "Ask if he's feeling okay",
          bold: "Ask him to do it again",
        },
      },
      {
        line: "**{name}** is lazy about everything except getting to {user}.",
        responses: {
          kind: "Say you're glad he came",
          playful: "Ask if it took effort",
          bold: "Say he can hurry more",
        },
      },
      {
        line: '"Of course it\'s you." **{name}** moves over six inches for {user} without being asked.',
        responses: {
          kind: "Sit in the six inches",
          playful: "Ask for seven",
          bold: "Take more than six",
        },
      },
    ],
  },
};
