// Haku's bond scenes, read as DIALOGUE.haku.bondScenes
// (constants/dialogue/haku.js imports this file).
//
// The level-up DMs (docs/bond-scene-dms.md). Haku deflects every sincere
// thing said to him and spooks people to watch their faces. The joke carries
// the acquaintance scene (a test he swears wasn't one); from friend on he
// leads with the sincere thing instead (her first week, his own coasting),
// and what deflection is left is thin and he knows it. He sees what nobody
// else can, and the last thing he admits is that being the only one who sees
// is lonely.
//
// Texting voice, per reference/haku.md's "Texting style" notes: he clips words
// ("prob", "No prob") and drops "tbh" into his typed lines, but writes in
// normal sentence case, not all-lowercase. Not in the `> ` lines he says out
// loud.
export default {
  acquaintance: {
    beats: [
      "**{firstName}**: Hey, it's Haku. Got your number the boring way, before you ask.\n\nI do actually have a reason for this. I also just wanted an excuse to text you. The reason came first. Barely.",
      "Okay, real reason. There's something in the middle of the Hotarubi hall floor, been there for years. Everyone walks straight through it and blames the headache on the weather.\n\nExcept you. {timesMet} times here, and you're the only one I've watched go around it instead of through. Could be nothing. I've been curious ever since tbh, so I'm asking.",
    ],
    faces: { 0: "smile", 1: "default" },
    choice: {
      prompt: "Well? Was that just a coincidence?",
      options: [
        {
          key: "kind",
          face: "serious",
          label: "Say it just felt wrong",
          style: 3,
          close:
            "Yeah. That's how it starts.\n\nFor what it's worth, that's a decent instinct and you should trust it.",
        },
        {
          key: "playful",
          face: "smile",
          label: "Ask if you passed the test",
          style: 1,
          close:
            "It wasn't a test.\n\n...It was completely a test. And you passed, which almost nobody does. Most people are still checking over their shoulder an hour later.\n\nShame, though. I had a whole second scare lined up.",
        },
        {
          key: "bold",
          face: "sweat",
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
    faces: { 0: "close", 1: "serious" },
    choice: {
      prompt: "Not to pry, but... you still think about leaving sometimes?",
      options: [
        {
          key: "kind",
          face: "close",
          label: "Say you're glad you stayed",
          style: 3,
          close:
            "Good, that's a relief.\n\nOn the days it's rough, come find me. If you want to talk, I'm happy to listen.",
        },
        {
          key: "playful",
          face: "smile",
          label: "Say only on Mondays",
          style: 1,
          close:
            "Fair. Mondays are rough here.\n\nI'll come find you on Mondays, then. Consider me on call.",
        },
        {
          key: "bold",
          face: "blush",
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
      "**{firstName}**: You free? Come have tea with me. Hotarubi guest room, kettle's on.",
      "The veranda off the guest room is my spot. Tea, the garden, the rain.\n\nI don't bring people out here. Not because it's a secret. It's the one spot that's always felt calm. Can't explain it better than that.",
      "Since {sinceMet}, I keep catching myself out here thinking you'd like the view. Got tired of just thinking it.\n\nSo come see it.",
    ],
    faces: { 0: "smile", 1: "close", 2: "blush" },
    choice: {
      prompt: "Tea's getting cold. That's a hint, by the way.",
      options: [
        {
          key: "kind",
          face: "smile",
          label: "Say you'll be right there",
          style: 3,
          close:
            "Cool. I've had this spot to myself a long time. Pretty sure it's better shared. With you, specifically.",
        },
        {
          key: "playful",
          face: "default",
          label: "Ask if the spot's haunted",
          style: 1,
          close:
            "The veranda? Nah.\n\nWell. Not by anything that minds company. \n\nKidding. Come anyway.",
        },
        {
          key: "bold",
          face: "smile",
          label: "Say you're coming for him",
          style: 4,
          close:
            "I had a feeling. Nice to know I wasn't imagining it.\n\nCome on, then, princess. Don't keep me waiting.",
        },
      ],
    },
    keepsake: {
      emoji: "🍵",
      line: "A view he got tired of only thinking you'd like.",
    },
  },

  confidant: {
    beats: [
      "**{firstName}**: My family sent a letter. First one in three years. Thought you should know before I do something stupid with it.",
      "Kusanagi shrine. Long line of mediums, big house, lot of expectations. I was the strongest one they'd produced in a long time and they were *thrilled* to see the back of me.\n\nNot disappointed. Thrilled. I saw the wrong things and said so out loud, and it turns out a family business runs better when the medium tells people what they want tbh.",
      "So they sent me here and told everyone it was an honor, and the letter's asking when I'm coming back to be useful.\n\nI've read it eleven times. I keep waiting to feel something about it. Nothing's arriving, and that's worse than if it did.\n\nAnyway. That's the most I've ever said about myself in one go. I'd like to formally blame you for it.",
    ],
    faces: { 0: "sweat", 1: "serious", 2: "smile" },
    choice: {
      prompt:
        "Don't tell me to burn it. Everyone tells me to burn it. I like having it, that's the embarrassing part.",
      options: [
        {
          key: "kind",
          face: "surprise",
          label: "Say you'll read it with him",
          style: 3,
          close:
            "...That's not one of the options I'd prepared for.\n\n*A long pause.*\n\nThe veranda. Bring a coat. I'll read it out loud and you can tell me if I'm allowed to feel anything about it, because apparently I've stopped being able to tell.",
        },
        {
          key: "playful",
          face: "sweat",
          label: "Offer to write the reply",
          style: 1,
          close:
            "God, please. Make it really formal and completely unhinged.\n\nActually don't. If you write it I'll send it, and then I'll have sent it, and I'm not ready for the version of me who sends it.",
        },
        {
          key: "bold",
          face: "close",
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
    faces: { 0: "sweat", 1: "serious", 2: "close" },
    choice: {
      prompt: "Go on then. Have a go at me. I've earned at least one.",
      options: [
        {
          key: "kind",
          face: "surprise",
          label: "Ask if he's okay",
          style: 3,
          close:
            "...Nobody asks that.\n\nEveryone asks if it's gone. Nobody's ever asked the other thing.\n\n*A long gap.*\n\nNo. Not really. Can you come out. You don't have to say anything, I just don't want to be out there by myself tonight.",
        },
        {
          key: "playful",
          face: "smile",
          label: "Say that sounds like effort",
          style: 1,
          close:
            "It was SO much effort. It was the most effort I've made since I got here.\n\nDon't tell Subaru. He'll want to talk about it. I would rather be followed by the thing.",
        },
        {
          key: "bold",
          face: "close",
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
      "Here's the thing about being the only one who sees. Everyone thinks it's frightening. It's not frightening, it's lonely: you're in a room full of people and there's a whole other room and you're the only one in it.\n\nYou came into the other room. You didn't even make a thing of it. You just started stepping around stuff on the floor and drinking tea on a freezing veranda like you'd always had a spot there.",
      "So: I love you.\n\nNo bit. No door. I've loved you since the veranda, probably before it, and I've spent every conversation since half-assing it, because half-assing it is the only way I know how to survive meaning something.\n\nI keep going back over what I let slide. Walking you home and cracking a joke at your door instead of saying this. The morning you answered half asleep in your pajamas and I decided I wasn't allowed to notice. C'mon. Stupid things to miss. I miss them anyway.\n\nThat's the whole message. God, this is awful.",
    ],
    faces: { 0: "sweat", 1: "serious", 2: "close", 3: "blush" },
    choice: {
      prompt:
        "Take your time. I'm extremely lazy, I'll wait forever, it's genuinely no effort tbh.",
      options: [
        {
          key: "answered",
          face: "full_smile_blush",
          label: "Say it back",
          style: 3,
          close:
            "...Say it again but with the joke removed. I've put a joke in on your behalf and I need to hear it without one.\n\n*You say it again.*\n\n*The reply is just:* Veranda. Now. *And he's standing when you get out there for once, not lying down, not looking at the far end, looking straight at you, and he kisses you like a man finally putting down something he's carried a long way.*",
        },
        {
          key: "held",
          face: "smile",
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
};
