export default {
  // The level-up DMs (docs/bond-scene-dms.md). One of the six volatile
  // characters — see docs/negative-affinity-enemies-to-lovers.md. Shion does not
  // warm up; he narrows. Short flat sentences, plain and unadorned (no dialect
  // or Irish lilt), gruesome imagery offered as affection. He decided on you a
  // long time before you did, and "my wife" is out loud from the known tier on.
  // Everyone else takes it as a joke; soulbound is where he says it never was.
  //
  // The intimacy here is not softening — it is him letting you say no and
  // staying anyway. Every choice keeps a door open on your side, because a
  // yandere scene that removes the player's out is not romance, it's a trap.
  // His hangout is the Heebie-Jeebie House and it is never called anything else.
  bondScenes: {
    acquaintance: {
      beats: [
        "**{firstName}**: Found your number.\n\nWasn't going to ask. You'd have said yes anyway so it's the same thing, isn't it.",
        "You've come by {timesMet} times. I count everything about you.\n\nMio says that's a lot. Mio says a lot of things.\n\nCome to the Heebie-Jeebie House tonight. It's dark and it's cold and people scream in there, which is the best bit. You wouldn't scream, though. I've watched. People go stiff and back off in there. You just walk in.",
      ],
      choice: {
        prompt: "Say yes.",
        options: [
          {
            key: "kind",
            label: "Say yes",
            style: 3,
            close:
              "Knew you would.\n\n...Wanted you to say it anyway. That's different from knowing. Didn't know that till now.",
          },
          {
            key: "playful",
            label: "Ask what else is in there",
            style: 1,
            close:
              "Me, mostly.\n\nAnd whoever wanders in after dark. You can watch their faces with me. You'll like it or you won't, and either's fine, because you'll still be standing next to me.",
          },
          {
            key: "bold",
            label: "Tell him to ask properly",
            style: 4,
            close:
              "*A long gap.*\n\n...Will you come.\n\n*Then, immediately after:* Don't make me do it again.",
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
        "**{firstName}**: That guy earlier. Outside the library. Who was he.",
        "A classmate. Talking about a lecture.\n\n...I see.\n\nI watched the whole thing. You were nice to him. Nodding. Laughing at the bit that wasn't funny.",
        "You don't do that with me. With me it's {favResponse}, every time. Straight in, like you want to see what I'll do.\n\nI like that one. That one's mine.\n\nDon't go giving it to him.",
      ],
      choice: {
        prompt: "Say you won't.",
        options: [
          {
            key: "kind",
            label: "Say he was just a classmate",
            style: 3,
            close:
              "I know. You said.\n\nThat's not what I asked, though. I asked you to say you won't.\n\nHow you are with me stays with me. Keep it there.",
          },
          {
            key: "playful",
            label: "Ask if he's jealous",
            style: 1,
            close:
              "No.\n\nMaybe. Don't know what it's called. I just didn't like him. You were looking at him and he had a boring face.",
          },
          {
            key: "bold",
            label: "Say only he gets that side",
            style: 4,
            close:
              "Yeah. Only me.\n\nSaved that. You can't take it back now.\n\nMine, then. Not anybody's. You bring it to me and nobody else gets any.",
          },
        ],
      },
      keepsake: {
        emoji: "🐚",
        line: "The side of you he's decided nobody else gets.",
      },
    },

    closeFriend: {
      beats: [
        "**{firstName}**: Come out the back of the House. Now. It's not a scary one.",
        "*It's the back garden, which nobody knows about, and there is a small dreadful creature in a box that he has clearly been keeping alive for some time.*\n\n> That's mine. Been mine two years. Doesn't have a name because names are for things that leave.",
        "*He sits down on the wet ground next to the box without checking whether you'll follow, and you do, and he goes very still about it.*\n\n> Mio doesn't come out here. Jo doesn't. Elias knows and pretends he doesn't, which is the nicest thing anyone's done for me.\n\n> You're sitting in it. In the wet. Didn't even flinch about the wet.\n\n*After a while, without looking over:*\n\n> You can name it. If you want. Then it'll be a thing that stays.",
      ],
      choice: {
        prompt: "Go on then. Name it.",
        options: [
          {
            key: "kind",
            label: "Give it a name",
            style: 3,
            close:
              "*He repeats it twice, flat, testing the shape of it.*\n\n> ...Right. That'll do.\n\n*Then he leans over sideways until his head is on your shoulder, all his weight, no warning at all, and stays there in the wet until it starts getting light.*",
          },
          {
            key: "playful",
            label: "Say it's got too many bits",
            style: 1,
            close:
              "> It has! It has too many bits!\n\n*He's delighted. It's the loudest you've ever heard him.*\n\n> Mio said that. Mio said it and then wouldn't look at it again. You said it and you're still sitting here.",
          },
          {
            key: "bold",
            label: "Ask why names mean leaving",
            style: 4,
            close:
              "*He doesn't answer for a long time.*\n\n> Because everything I've ever named got taken off me after.\n\n*he says finally, at the box.*\n\n> Pets. People. The lot. You name it, they know it matters, then it's gone. So I stopped.\n\n> Name it anyway. I want to find out if it works different with you.",
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
        "**{firstName}**: Can't sleep. Hate the night. It's hot and it hurts and it's hard to breathe.",
        "Nobody knows that. They think I like the dark because of the House. I don't. I'm in the House because it's the only place the night's got a door on it and I'm the one holding the door.\n\nMio thinks I'm asleep. I let him think it. He's been carrying me since he was little and he'd carry that too and I won't let him.",
        "Blood's a shackle. Family's the ones that stay when they've no cause to. Mio's family. Jo is. Elias is, mostly.\n\nYou didn't have to be. That's the bit I keep chewing on. Everyone else got put next to me. You just kept turning up.\n\nI've been awake since two thinking about that and it's better than thinking about the night, so.",
      ],
      choice: {
        prompt: "Talk at me till it's light. Don't care what about.",
        options: [
          {
            key: "kind",
            label: "Stay up and talk to him",
            style: 3,
            close:
              "*You talk about nothing. He answers about a third of it.*\n\n*At five he sends:* It's getting light.\n\n*Then:* Do that again tomorrow. And the one after. Don't stop doing it. Please.\n\n*That last word is the first time you've seen him use it.*",
          },
          {
            key: "playful",
            label: "Threaten him with a lullaby",
            style: 1,
            close:
              "That's *my* one. You've stolen my one.\n\n...Sing it, then. Go on. You might never get me to admit it helped.",
          },
          {
            key: "bold",
            label: "Tell him to tell Mio",
            style: 4,
            close:
              "No.\n\n*Flat, immediate, and then nothing for four minutes.*\n\nHe's got enough. Always has. My job was to be the big one and I've never once managed it.\n\nYou're not to tell him either. Say you won't tell him.\n\n*You say it. He goes quiet, and then:* Right. Good. That's us, then.",
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
        "**{firstName}**: Who was that.\n\nIn the courtyard. The one that touched your arm. Who was that.",
        "*You tell him. It's nothing. It was nothing.*\n\nFine. Alright.\n\n*Then, four minutes later:*\n\nI won't forget him, though. I don't forget them. Got a whole lot of them up here and none of them know it.",
        "Here's the part I'm not supposed to say, so I'm saying it.\n\nI'd do something about it. I want to. I've thought about the exact shape of it, sitting here, for about an hour, and it's a good shape.\n\nAnd I'm not going to. Because you'd look at me different after and I've figured out that's the one thing I can't take. So you tell me to leave it and I'll leave it, and that's the first time in my life a thing's ever stopped because somebody said.",
      ],
      choice: {
        prompt: "Go on. Tell me to leave it.",
        options: [
          {
            key: "kind",
            label: "Tell him to leave it",
            style: 3,
            close:
              "...Right.\n\n*A long pause.*\n\nLeft. It's left. Done.\n\n*Then, much later:* Come here after, though. I've been holding it too long and it's gone wrong in me.\n\n*He doesn't say a word when you get there. He just puts his forehead against your shoulder and breathes for about twenty minutes.*",
          },
          {
            key: "playful",
            label: "Ask about the lovely shape",
            style: 1,
            close:
              "You don't want to know.\n\n...You do want to know. That's worse. That's so much worse and I like you so much.\n\nI won't tell you. Not because of the shape. Because you'd laugh and then I'd do it.",
          },
          {
            key: "bold",
            label: "Say you'd still look at him",
            style: 4,
            close:
              "*There is nothing for a very long time.*\n\nDon't say that.\n\nThat's the only thing keeping the door shut and you've gone and said it. Take it back.\n\n*Then, after another minute:* Don't take it back. Say it again. Say it every time and I'll keep the door shut myself, and that'll be me doing it, not you.",
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
        "**{firstName}**: I've called you my wife since about the second time I saw you.\n\nEveryone thinks that's a joke. It's never once been a joke.",
        "{timesMet} times. I've had the number since it was four.\n\nAnd every one of them I've been waiting for the day you'd stop. That's not a sad thing, it's just the shape of it. People stop. My mom stopped. It's arithmetic.",
        "You haven't stopped.\n\nSo I've had to learn a whole new thing, which is that I might have to be worth it on purpose instead of just holding on tight enough. That's been horrible. I've hated every minute.\n\nMio says it's good for me. Mio can shut up.",
        "Right. Here's the actual one, and I'm only doing it once, so read it properly.\n\nI love you. Not the way I say things. The other way. The one where I'd let you go if you wanted to go, which I've never been able to say about anything in my whole life and it's taken me a year to be able to say it about you.\n\nYou might never have to. But you could. That's the thing I'm giving you. It's the only thing I've got that's worth anything.",
      ],
      choice: {
        prompt: "Now say. Whatever it is. I'll take it.",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close:
              "...Say it again.\n\n*You say it again.*\n\nAgain.\n\n*The fourth time he stops asking. He turns up at your door twenty minutes later soaked through with no coat on and stands there for a moment just looking at you, properly, greedily, the way he looks at things he's decided are his, and then he puts both arms round you and holds on so hard it aches, and says, into your hair, flat as anything:*\n\n> Forever. I did tell you.",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close:
              "Alright.\n\n*Nothing else for a bit. Then:*\n\nThat's what the giving-you-the-door was for. Wasn't a trick. Take it.\n\nI'll be at the House. Same as always. And I won't sulk at you about it, which I want noting, because sulking's most of what I've got.\n\n*He doesn't sulk. He's exactly where he says he'll be, every night, holding the door on the dark. And when you come by he moves over on the wet ground without a word, the way he did the first time.*",
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
      {
        line: "He doesn't move to greet you. Only his eyes track across, then his head, slow, to follow you.",
        approach: "Back away slowly",
        greeting: "\"Don't run. Running's predictable, and I'll only follow.\"",
        responses: {
          kind: ["Say you're not scared", "Say you weren't going to run"],
          playful: [
            "Flinch on purpose, grinning",
            "Pretend to run, then don't",
          ],
          bold: ["Tell him to try you", "Walk toward him instead"],
          neutral: ["Watch him carefully", "Stay exactly where you are"],
        },
      },
      {
        line: '"Come closer," he says, flat. "You\'re still too far away. Closer." He isn\'t joking.',
        approach: "Take a step closer",
        greeting: '"Better. Stay there. Let me look at you."',
        responses: {
          kind: ["Try to look at him", "Ask if this is close enough"],
          playful: ["Take your time closing the gap", "Take a tiny, tiny step"],
          bold: ["Step closer, not back", "Make him come to you"],
          neutral: ["Wait him out", "Let him look, say nothing"],
        },
      },
      {
        line: "He watches you the way he watches the cat across the yard, patient, unblinking, waiting to see what you'll do.",
        approach: "Avoid eye contact",
        greeting: '"Looking away won\'t help. The cat tried that too."',
        responses: {
          kind: ["Meet his gaze softly", "Ask him to go easy"],
          playful: ["Give him a better face", "Ask what happened to the cat"],
          bold: ["Stare right back", "Tell him you're not the cat"],
          neutral: ["Give him nothing to read", "Look at the cat instead"],
        },
      },
      {
        line: '"You wandered into the Heebie-Jeebie House on your own," he says. "Terrible instincts. I like them."',
        approach: "Call it curiosity",
        greeting:
          '"Curiosity. Fine. Sit down and be curious where I can see you."',
        responses: {
          kind: ["Say you meant no harm", "Sit where he can see you"],
          playful: ["Don't take him seriously", "Ask for a tour of the house"],
          bold: ["Own the bad instincts", "Sit wherever you like"],
          neutral: ["Shrug at the label", "Sit down without a word"],
        },
      },
      {
        line: "The way he studies your face feels less like interest and more like he's learning it for later.",
        approach: "Hold still",
        greeting:
          '"That face is nice. I wonder what it looks like when you cry."',
        responses: {
          kind: ["Say his face is nice too", "Ask why he studies you"],
          playful: [
            "Ask what he's really learning",
            "Make a silly face instead",
          ],
          bold: ["Say you're not afraid", "Tell him he'll never see it"],
          neutral: ["Hold still, give nothing", "Keep your face blank"],
        },
      },
    ],
    known: [
      {
        line: "You keep catching his eyes already on you. He doesn't look away when you notice.",
        approach: "Hold his gaze",
        greeting: '"What. I can look at you if I want."',
        responses: {
          kind: ["Hold his gaze warmly", "Let him have the attention"],
          playful: ["Ask since when", "Call out the staring"],
          bold: ["Hold his gaze right back", "Say you noticed too"],
          neutral: ["Meet his gaze, say nothing", "Look away first"],
        },
      },
      {
        line: "\"You're still alive, then. I couldn't find you anywhere. I figured I'd killed you and forgotten about it.\"",
        approach: "Ask if he missed you",
        greeting: '"Missed you? No. I just looked everywhere."',
        responses: {
          kind: ["Say you're glad to be found", "Reassure him you're fine"],
          playful: ["Ask if he really looked", "Tease the murder joke"],
          bold: ["Say you'd have found him too", "Call the worry out"],
          neutral: ["Shrug, say nothing", "Let the comment pass"],
        },
      },
      {
        line: "He's holding something behind his back and waiting for you to ask about it. He'll wait all day.",
        approach: "Refuse to ask",
        greeting:
          "\"...You're not going to ask. Fine. Then I'll just show you.\"",
        responses: {
          kind: ["Ask him nicely", "Let him show you"],
          playful: ["Guess what it is", "Refuse to play along"],
          bold: ["Take it out of his hand", "Say you'd never have asked"],
          neutral: ["Wait him out", "Say nothing at all"],
        },
      },
      {
        line: "He's eating a piece of Jo's bread, slowly, and making sure you can see every bite.",
        approach: "Eye the bread",
        greeting: '"You want some too? ...Never giving you any."',
        responses: {
          kind: ["Tell him to enjoy it", "Say Jo bakes well"],
          playful: ["Look tragically hungry", "Steal a bite anyway"],
          bold: ["Hold your hand out for some", "Take a piece yourself"],
          neutral: ["Watch him eat, say nothing", "Let him have the bread"],
        },
      },
      {
        line: "He's resetting the trapdoor trick again. It catches him off guard this time and he goes down with it, and comes back up looking delighted about it.",
        approach: "Ask if he's okay",
        greeting:
          '"Did you see that? Straight down... wait till someone else finds it."',
        responses: {
          kind: ["Ask if he's hurt", "Help him up"],
          playful: ["Laugh at the fall with him", "Ask if the trapdoor won"],
          bold: ["Dare him to go again", "Offer to lure the next one"],
          neutral: ["Watch without reacting", "Say nothing about the fall"],
        },
      },
      {
        line: "Someone bolts past you in the corridor, white-faced. He's strolling up from the direction they came.",
        approach: "Ask what he did",
        greeting:
          '"They were so happy they almost fainted. That\'s three now. Good week."',
        responses: {
          kind: ["Ask if they're all right", "Say that's not funny"],
          playful: ["Ask how he managed it", "Ask if you're next"],
          bold: ["Ask to watch the next one", "Say you wouldn't drop"],
          neutral: ["Let it pass unremarked", "Say nothing about it"],
        },
      },
      {
        line: "He holds something small and dead out to you on his palm, and waits for your face to do something.",
        approach: "Say thank you",
        greeting:
          "\"Thank you? People usually scream. That's how I know they're happy.\"",
        responses: {
          kind: ["Say you are happy, truly", "Keep the gift safe"],
          playful: ["Ask what it is exactly", "Ask where he found it"],
          bold: ["Say you don't need to scream", "Ask for a bigger one"],
          neutral: ["Take it, say nothing", "Leave it on his palm"],
        },
      },
      {
        line: "Your books are gone. In their place is one of the Heebie-Jeebie House's bloody head props, and he doesn't pretend it wasn't him.",
        approach: "Don't even blink",
        greeting:
          '"Why are you so quiet? This is boring. ...Fine. I\'ll find something to do with you."',
        responses: {
          kind: ["Let him have his trick", "Play along kindly"],
          playful: ["Demand your books back", "Ask what else he can vanish"],
          bold: ["Toss the head back to him", "Ask for a scarier prop"],
          neutral: ["Don't react at all", "Let the books stay gone"],
        },
      },
      {
        line: "He's soaking wet, and offers no explanation for it.",
        approach: "Don't ask why he's wet",
        greeting: '"Not even curious? ...Fine. Now I\'m not telling you."',
        responses: {
          kind: ["Offer him a towel, no fuss", "Let him stay wet"],
          playful: ["Guess where he's been", "Ask if he went swimming"],
          bold: ["Demand to know why", "Say you'll find out anyway"],
          neutral: ["Don't ask, let it be", "Ignore the wet clothes"],
        },
      },
      {
        line: '"Mio says you asked about me," he says, and it\'s not clear yet if that pleases him or not.',
        approach: "Say you were curious",
        greeting:
          '"Next time, ask me, not Mio. He sighs when I call you my wife."',
        responses: {
          kind: ["Say you just wondered", "Admit you were curious"],
          playful: ["Ask what else Mio says", "Ask since when you're his wife"],
          bold: ["Ask him everything, then", "Say Mio's answers were boring"],
          neutral: ["Shrug, say nothing", "Let it go unremarked"],
        },
      },
      {
        line: "He's turning something over in his gloved hands, something Mio built and plainly didn't build for this.",
        approach: "Ask what it does",
        greeting: '"It\'s new. Mio made it. Want to be the test subject?"',
        responses: {
          kind: ["Agree, a little warily", "Ask him to be careful"],
          playful: ["Volunteer immediately", "Ask what happened to the last"],
          bold: ["Say yes without asking", "Ask to test it on him next"],
          neutral: ["Neither agree nor refuse", "Say nothing, wait"],
        },
      },
      {
        line: "\"Don't tell Jo,\" he says, holding something he clearly isn't supposed to have.",
        approach: "Keep his secret",
        greeting: '"If Jo finds out, I\'ll know it was you."',
        responses: {
          kind: ["Keep the secret gladly", "Say you won't tell Jo"],
          playful: ["Ask what he's hiding", "Threaten to tell Jo anyway"],
          bold: ["Demand to see it", "Ask what it's worth to him"],
          neutral: ["Don't ask, don't tell", "Let it go unremarked"],
        },
      },
      {
        line: "He's put something in your bag while you weren't looking, and now he's watching your hand go in after it.",
        approach: "Reach in anyway",
        greeting: "\"...Nothing? That's no fun. I'll try harder next time.\"",
        responses: {
          kind: ["Reach in without fuss", "Hand it back to him"],
          playful: ["Scream for his benefit", "Guess before you look"],
          bold: ["Say it'll take more than that", "Slip it into his pocket"],
          neutral: ["Look, say nothing", "Leave it in there"],
        },
      },
    ],
    warm: [
      {
        line: "His attention tilts to you first, before the rest of the room registers at all.",
        approach: "Step into his eyeline",
        greeting: "\"They said you'd stop visiting. They're usually wrong.\"",
        responses: {
          kind: ["Say you're not going anywhere", "Say you'd have come anyway"],
          playful: ["Ask when that started", "Ask who 'they' are"],
          bold: ["Tell him to keep watching", "Tell him they're wrong"],
          neutral: ["Stand there, say nothing", "Wait to be noticed"],
        },
      },
      {
        line: "He's been waiting in this exact spot. He'd like you to know he doesn't wait for people.",
        approach: "Greet him first",
        greeting:
          '"You finally came back. I waited here the whole time, you know. Don\'t you feel a bit sorry for me?"',
        responses: {
          kind: ["Say you're glad he waited", "Say you feel a bit sorry"],
          playful: ["Ask how long he waited", "Refuse to feel sorry"],
          bold: ["Say he clearly does wait", "Say he waited for you"],
          neutral: ["Shrug at the wait", "Let the waiting go"],
        },
      },
      {
        line: "\"You're not frightened of me anymore,\" he observes, and can't work out whether that disappoints him.",
        approach: "Hold steady",
        greeting: "\"You're not afraid of me now. That's a whole new game.\"",
        responses: {
          kind: ["Say it's not disappointing", "Say he's not frightening"],
          playful: ["Ask which he'd prefer", "Ask about the new game"],
          bold: ["Say fear was never the point", "Say you like the danger"],
          neutral: ["Let him decide, say nothing", "Hold steady, say nothing"],
        },
      },
      {
        line: "Whatever was standing too near you a moment ago has quietly stopped being a problem.",
        approach: "Notice what he did",
        greeting:
          '"Stay close to me. Nothing in this district would dare come near."',
        responses: {
          kind: ["Stay close to him", "Say you feel safer near him"],
          playful: ["Ask what he did to it", "Ask if it's still breathing"],
          bold: ["Ask him to admit it", "Tell him to stay close, too"],
          neutral: ["Move on, unbothered", "Stay close, ask nothing"],
        },
      },
      {
        line: "\"I'm thirsty. Go to Elias's and bring me that sickly brown stuff.\" He doesn't say please.",
        approach: "Fetch what he asked",
        greeting:
          '"You actually went. ...You like me. Don\'t bother denying it."',
        responses: {
          kind: ["Fetch it gladly", "Bring it without complaint"],
          playful: ["Make him ask nicer", "Bring back the wrong drink"],
          bold: ["Say of course you like him", "Deny nothing"],
          neutral: ["Fetch it without a word", "Hand it over, say nothing"],
        },
      },
      {
        line: "\"Walk the Heebie-Jeebie House with me tonight. I'll frighten the others. You I'd sooner just watch.\"",
        approach: "Take his arm",
        greeting:
          '"Good. Hold on tight. If you let go, I\'ll have to come find you. ...I always do."',
        responses: {
          kind: ["Take his arm gladly", "Say you'll hold on tight"],
          playful: ["Ask who he'll scare first", "Threaten to let go"],
          bold: ["Say frights don't scare you", "Dare him to find you"],
          neutral: ["Take his arm, say nothing", "Walk in beside him"],
        },
      },
    ],
    spark: [
      {
        line: "He lets the flat calm slip an inch, just for you, just long enough that you're sure you saw it.",
        approach: "Let him look properly",
        greeting: '"Let me look at you properly. I\'ve earned that much."',
        responses: {
          kind: "Let him look, softly",
          playful: "Steal his next line",
          bold: "Hold his gaze right back",
          neutral: "Say nothing",
        },
      },
      {
        line: "He steps in close behind you and speaks right at your ear, entirely on purpose.",
        approach: "Go round the back",
        greeting:
          '"Come round the back of the house. The good frights are back there."',
        responses: {
          kind: "Reach for his hand",
          playful: "Play the dangerous thing",
          bold: "Go round the back with him",
          neutral: "Let him have the quiet",
        },
      },
      {
        line: '"You stopped being afraid," he murmurs. "Now you\'re something far worse."',
        approach: "Ask what's worse",
        greeting:
          '"I\'m not in the mood to make you cry today. Come back later for that."',
        responses: {
          kind: "Tell him you're not afraid",
          playful: "Ask what's worse, teasingly",
          bold: "Say you like being worse",
          neutral: "Let the moment pass",
        },
      },
      {
        line: "He takes your wrist, turns it over, and studies your pulse like it told him something he liked.",
        approach: "Let him take your wrist",
        greeting: '"Your pulse is quick. I do like being the reason."',
        responses: {
          kind: "Let him hold your wrist",
          playful: "Make his pulse quick instead",
          bold: "Turn his wrist over instead",
          neutral: "Let him study it, say nothing",
        },
      },
      {
        line: '"You\'re getting bold," he says, almost approving. "Because you\'re nearly mine."',
        approach: "Say it",
        greeting:
          "\"Say you're mine. You don't have to mean it yet. I'm patient.\"",
        responses: {
          kind: "Say you're getting there",
          playful: "Tease the word 'nearly'",
          bold: "Say you're his",
          neutral: "Let the claim sit unanswered",
        },
      },
    ],
    close: [
      {
        line: '"For you," Shion says, and the flatness cracks just enough to let a real smile through.',
        approach: "Go to him",
        greeting: '"You\'re mine to look after now. My wife."',
        responses: {
          kind: "Let him look after you",
          playful: "Make the villain laugh",
          bold: "Claim him right back",
          neutral: "Take it in, say nothing",
        },
      },
      {
        line: "He puts himself between you and the room without seeming to have decided to.",
        approach: "Stand behind him",
        greeting:
          "\"The world's a cruel place. You're simply never going to be out in it.\"",
        responses: {
          kind: "Let him stand there",
          playful: "Play along with him",
          bold: "Step out from behind him",
          neutral: "Let him watch over you",
        },
      },
      {
        line: '"Nothing in here touches you," he says, mild about it. "It\'s mine. I\'ve made arrangements."',
        approach: "Trust his arrangements",
        greeting:
          '"Anything that reaches you goes through me first. That isn\'t aimed at you."',
        responses: {
          kind: "Trust the arrangements",
          playful: "Prank him back",
          bold: "Tell him you're not fragile",
          neutral: "Let the room go quiet",
        },
      },
      {
        line: "The blank calm falls away, and what's underneath is startlingly gentle.",
        approach: "Let him take your hand",
        greeting:
          "\"I've watched a great many things suffer. I won't watch you.\"",
        responses: {
          kind: "Thank him for the truth",
          playful: "Tease the softness out",
          bold: "Dare him to be thorough",
          neutral: "Stay silent beside him",
        },
      },
      {
        line: "He drops every last piece of the front. Only you get that. Only ever you.",
        approach: "Let the front drop",
        greeting:
          '"Look, no front, nothing put on. Do you know what that costs me?"',
        responses: {
          kind: "Tell him he isn't a monster",
          playful: "Tease him for dropping the act",
          bold: "Say you see all of him now",
          neutral: "Let him have the quiet",
        },
      },
    ],
    bound: [
      {
        line: "The front is off and stays off, and what's under it adores you past all reason.",
        approach: "Come here",
        greeting: '"Come here. Let me look at what\'s mine."',
        responses: {
          kind: "Hold his face",
          playful: "Upstage him for once",
          bold: "Pull him up by the collar",
          neutral: "Let him watch you",
        },
      },
      {
        line: "He kneels to take your hand, which from him isn't submission but something heavier.",
        approach: "Let him kneel",
        greeting: '"Nothing will ever reach you. I\'ve been very thorough."',
        responses: {
          kind: "Let him kneel",
          playful: "Make him wait for it",
          bold: "Pull him back to his feet",
          neutral: "Let him kneel, say nothing",
        },
      },
      {
        line: '"My wife," he breathes, and means every letter of it.',
        approach: "Say it properly",
        greeting: '"Say you\'re mine. Properly, this time."',
        responses: {
          kind: "Say it back",
          playful: "Refuse to say it properly",
          bold: "Say it back louder",
          neutral: "Let the moment stretch",
        },
      },
      {
        line: "He traces your pulse with his mouth and takes a very long time about it.",
        approach: "Stay till he sleeps",
        greeting:
          "\"The night's the worst of it. Stay till I'm asleep. ...Stay after.\"",
        responses: {
          kind: "Let him take his time",
          playful: "Count how long he takes",
          bold: "Tell him to be thorough",
          neutral: "Stay silent in the dark",
        },
      },
      {
        line: "He'd end the world for you. He mentions it the way other people mention the weather.",
        approach: "Let him mean it",
        greeting:
          "\"I love you. It's an old feeling, and I've carried it too long without saying so.\"",
        responses: {
          kind: "Say you'd do the same",
          playful: "Ask for a smaller gesture",
          bold: "Say you're his",
          neutral: "Let him mean it quietly",
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
      '**{name}**\'s eyes track over first, then his head, slow. "...You knew my name." {user} did.',
      '"Come closer." **{name}** says it to {user} flatly, and means all of it.',
      "{user} says the name, and **{name}** looks pleased in a way that isn't reassuring.",
    ],
    warm: [
      "**{name}** had been waiting in this exact spot for {user}.",
      "\"You came.\" **{name}** doesn't say the rest of it to {user}, but it's all over his face.",
      "{user} calls out, and **{name}** stops frightening whoever he was frightening.",
    ],
    spark: [
      "\"You're not scared of me.\" **{name}** can't decide whether that disappoints him about {user}.",
      "{user} says the name, and **{name}** closes the distance immediately. All of it.",
      '"Closer." **{name}** has said it to {user} before.',
    ],
    close: [
      "**{name}** takes {user}'s hand and does not give it back.",
      '"Who else was out here?" **{name}** asks {user}, already deciding to remember their faces.',
      "\"Where are you going? ...Hmm. Then I'll come with you.\" **{name}** doesn't give {user} a vote.",
    ],
    bound: [
      '"My wife," **{name}** breathes, and means every letter of it to {user}.',
      "**{name}** tucks {user} under the jacket draped over his shoulders, like he's hiding them from everyone else.",
      "{user} says the name, and **{name}** decides, again, that forever is the plan.",
    ],
  },
};
