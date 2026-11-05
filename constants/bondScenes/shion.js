// Shion's bond scenes, read as DIALOGUE.shion.bondScenes
// (constants/dialogue/shion.js imports this file).
//
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
export default {
  acquaintance: {
    beats: [
      "**{firstName}**: Found your number.\n\nWasn't going to ask. You'd have said yes anyway so it's the same thing, isn't it.",
      "You've come by {timesMet} times. I count everything about you.\n\nMio says that's a lot. Mio says a lot of things.\n\nCome to the Heebie-Jeebie House tonight. It's dark and it's cold and people scream in there, which is the best bit. You wouldn't scream, though. I've watched. People go stiff and back off in there. You just walk in.",
    ],
    faces: { 0: "default", 1: "smile" },
    choice: {
      prompt: "Say yes.",
      options: [
        {
          key: "kind",
          face: "close",
          label: "Say yes",
          style: 3,
          close:
            "Knew you would.\n\n...Wanted you to say it anyway. That's different from knowing. Didn't know that till now.",
        },
        {
          key: "playful",
          face: "smile",
          label: "Ask what else is in there",
          style: 1,
          close:
            "Me, mostly.\n\nAnd whoever wanders in after dark. You can watch their faces with me. You'll like it or you won't, and either's fine, because you'll still be standing next to me.",
        },
        {
          key: "bold",
          face: "annoyed",
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
    faces: { 0: "serious", 1: "annoyed", 2: "serious" },
    choice: {
      prompt: "Say you won't.",
      options: [
        {
          key: "kind",
          face: "smile",
          label: "Say he was just a classmate",
          style: 3,
          close:
            "I know. He can have your nodding and your polite laughing.\n\nI'll keep him in mind anyway. For later.",
        },
        {
          key: "playful",
          face: "annoyed",
          label: "Ask if he's jealous",
          style: 1,
          close:
            "No.\n\nMaybe. Don't know what it's called. I just didn't like him. You were looking at him and he had a boring face.",
        },
        {
          key: "bold",
          face: "smile",
          label: "Say only he gets that side",
          style: 4,
          close:
            "Yeah. Only me.\n\nNo taking it back. Give it to him anyway and he'll disappear, just so I can be there when you cry.",
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
    faces: { 0: "default", 1: "serious", 2: "close" },
    choice: {
      prompt: "Go on then. Name it.",
      options: [
        {
          key: "kind",
          face: "close",
          label: "Give it a name",
          style: 3,
          close:
            "*He repeats it twice, flat, testing the shape of it.*\n\n> ...Right. That'll do.\n\n*Then he leans over sideways until his head is on your shoulder, all his weight, no warning at all, and stays there in the wet until it starts getting light.*",
        },
        {
          key: "playful",
          face: "full_smile",
          label: "Say it's got too many bits",
          style: 1,
          close:
            "> It has! It has too many bits!\n\n*He's delighted. It's the loudest you've ever heard him.*\n\n> Mio said that. Mio said it and then wouldn't look at it again. You said it and you're still sitting here.",
        },
        {
          key: "bold",
          face: "serious",
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
    faces: { 0: "sweat", 1: "serious", 2: "close" },
    choice: {
      prompt: "Talk at me till it's light. Don't care what about.",
      options: [
        {
          key: "kind",
          face: "blush",
          label: "Stay up and talk to him",
          style: 3,
          close:
            "*You talk about nothing. He answers about a third of it.*\n\n*At five he sends:* It's getting light.\n\n*Then:* Do that again tomorrow. And the one after. Don't stop doing it. Please.\n\n*That last word is the first time you've seen him use it.*",
        },
        {
          key: "playful",
          face: "annoyed",
          label: "Threaten him with a lullaby",
          style: 1,
          close:
            "That's *my* one. You've stolen my one.\n\n...Sing it, then. Go on. You might never get me to admit it helped.",
        },
        {
          key: "bold",
          face: "serious",
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
    faces: { 0: "annoyed", 1: "smile", 2: "serious" },
    choice: {
      prompt: "Go on. Tell me to leave it.",
      options: [
        {
          key: "kind",
          face: "close",
          label: "Tell him to leave it",
          style: 3,
          close:
            "...Right.\n\n*A long pause.*\n\nLeft. It's left. Done.\n\n*Then, much later:* Come here after, though. I've been holding it too long and it's gone wrong in me.\n\n*He doesn't say a word when you get there. He just puts his forehead against your shoulder and breathes for about twenty minutes.*",
        },
        {
          key: "playful",
          face: "smile",
          label: "Ask about the lovely shape",
          style: 1,
          close:
            "You don't want to know.\n\n...You do want to know. That's worse. That's so much worse and I like you so much.\n\nI won't tell you. Not because of the shape. Because you'd laugh and then I'd do it.",
        },
        {
          key: "bold",
          face: "surprise_blush",
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
    faces: { 0: "serious", 1: "default", 2: "annoyed", 3: "blush" },
    choice: {
      prompt: "Now say. Whatever it is. I'll take it.",
      options: [
        {
          key: "answered",
          face: "full_smile_blush",
          label: "Say it back",
          style: 3,
          close:
            "...Say it again.\n\n*You say it again.*\n\nAgain.\n\n*The fourth time he stops asking. He turns up at your door twenty minutes later soaked through with no coat on and stands there for a moment just looking at you, properly, greedily, the way he looks at things he's decided are his, and then he puts both arms round you and holds on so hard it aches, and says, into your hair, flat as anything:*\n\n> Forever. I did tell you.",
        },
        {
          key: "held",
          face: "close",
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
};
