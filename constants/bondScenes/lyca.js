// Lyca's bond scenes, read as DIALOGUE.lyca.bondScenes
// (constants/dialogue/lyca.js imports this file).
//
// The level-up DMs (docs/bond-scene-dms.md). Lyca is still learning to read
// and is not tech-savvy, so his messages are short and phonetically spelled.
// He reads people by scent, so he always knows before you tell him, and the
// bite scars on his arms are what he is most afraid of you seeing.
//
// Per reference/lyca.md's "Texting style" notes he does not type in all-lowercase:
// sentence starts and "I" get a capital even though the spelling stays rough
// ("dont", "im").
export default {
  acquaintance: {
    beats: [
      "**{firstName}**: Is this you\n\nThe blond gigolo put your name in the thingy for me. I pressed it four times. Sorry if it went four times",
      "I don't mind classes. The teachers say cool stuff. Once I can read the blackboard its gonna be perfect\n\nYou listen like you're really getting it\n\nSometimes I smell somethin' sweet off you. Just for a second. Its different from everyone else\n\nI started sitting where I could see you in class. It was s'posed to be so I could copy how you write stuff down. But...\n\nI want to learn about you. Not just what the teachers say. That's what I wanted to say the last {timesMet} times. I didn't know how",
    ],
    faces: { 0: "sweat", 1: "blush" },
    choice: {
      prompt:
        "Is that a rude thing to say? The blond gigolo says half the things I say are rude.",
      options: [
        {
          key: "kind",
          face: "smile",
          label: "Say it's not rude at all",
          style: 3,
          close:
            "Good\n\n...Then I'm gonna keep learning about you. Everything. Is that allowed?",
        },
        {
          key: "playful",
          face: "blush",
          label: "Ask what you smell like",
          style: 1,
          close:
            "Sweet. Like strawberry milk, the carton kind\n\n...Somethin' about it makes my stomach feel weird. I dunno why",
        },
        {
          key: "bold",
          face: "surprise",
          label: "Say you want to know him too",
          style: 4,
          close:
            "...Really?\n\nNobody asks about me. They just ask what I am\n\nOkay. You can ask. I'll answer if I know the words",
        },
      ],
    },
    keepsake: {
      emoji: "📚",
      line: "Sitting where he could see you in class, to copy your letters and learn something else.",
    },
  },

  friend: {
    beats: [
      "**{firstName}**: Your scent was all squeezy today. Somethings wrong",
      "You always give me {favResponse}. Your scent's what changes, so thats how I know.\n\nToday you still gave me {favResponse}. But under it you smelled squeezy. Like that time you cried and didn't tell me how come.\n\nNobody else can smell it on you. I can.\n\nIf somebody did somethin' to you, tell me who.",
    ],
    faces: { 0: "serious", 1: "annoyed" },
    choice: {
      prompt: "How come. You don't gotta say it nice",
      options: [
        {
          key: "kind",
          face: "default",
          label: "Say he's right, you're tired",
          style: 3,
          close:
            "...Tired. Okay. I knew it was somethin'\n\nThen go sleep. If your scent's still squeezy tomorrow Im asking again",
        },
        {
          key: "playful",
          face: "smile",
          label: "Ask if he's a detective now",
          style: 1,
          close:
            "No. Detectives use their eyes. I use my nose. Mine's better\n\nSo don't bother hiding stuff from me. It won't work",
        },
        {
          key: "bold",
          face: "blush",
          label: "Tell him you need a hug",
          style: 4,
          close:
            "A hug. Fine\n\nTen seconds. That's the rule. But I'm coming over\n\nAfter, I can stay till your scent's not squeezy",
        },
      ],
    },
    keepsake: {
      emoji: "🐺",
      line: "The day your scent went squeezy under all the right words, and he noticed.",
    },
  },

  closeFriend: {
    beats: [
      "**{firstName}**: Come to my room. Bring nothing. Dont bring the blond gigolo",
      "*The room is bare except for a bed and, folded on the end of it, a blanket that is filthy, threadbare, and clearly ancient. He is standing between you and it, which he does not seem to have decided to do.*\n\n> That's mine. It's from before. Before the campus, before the cage, before any of it.",
      "> The blond gigolo washed it once. Two years ago. He was being kind and it took the smell out and I didn't talk to him for six days.\n\n*He moves out of the way, which takes him a visible amount of effort.*\n\n> You can touch it. Not take it. Touch it.\n\n> I've never let anyone. That's what I'm doing right now, I want you to know that's what I'm doing.",
    ],
    faces: { 0: "default", 1: "serious", 2: "sweat" },
    choice: {
      prompt: "Go on. I'll be fine. I've decided I'll be fine.",
      options: [
        {
          key: "kind",
          face: "blush",
          label: "Touch it and say nothing",
          style: 3,
          close:
            "*He watches your hand the entire time without breathing much.*\n\n*When you take it away he sits down on the floor rather suddenly.*\n\n> ...It smells like you now,\n\n*he says, and then, before you can apologize:*\n\n> No. Good. That's good. That's the good one. Leave it.",
        },
        {
          key: "playful",
          face: "sweat",
          label: "Say it needs a wash",
          style: 1,
          close:
            "> DON'T.\n\n*Then, after a second:*\n\n> ...that was a joke. That was a joke and I did the shouting anyway.\n\n> Do it again. I want to practice it being a joke.",
        },
        {
          key: "bold",
          face: "close",
          label: "Ask what's from before",
          style: 4,
          close:
            "*He is quiet for a long time.*\n\n> Neros. The human from before all this. He had a house, and a fire in the wall, the good kind, and he let me sleep by it.\n\n> This is all I've got of that time. I'm gonna find him. I've never said that part out loud before, 'cause saying it out loud makes it a thing I could fail at.\n\n*He leans against your side on the floor, all his weight, and stays there.*",
        },
      ],
    },
    keepsake: {
      emoji: "🧵",
      line: "A blanket from before, that nobody else has ever been allowed to touch.",
    },
  },

  confidant: {
    beats: [
      "*It comes at four in the morning and it is a voice note, not a message.*\n\n**{firstName}**: It's the moon week. I'm in the far room. I'm not coming out.",
      "> The blond gigolo locks it. I ask him to. That's the arrangement. I ask, he locks, he doesn't say anything about it after.\n\n> It's not scary in here. Everyone thinks it's scary. It's just very long.",
      "*There's a rustling, and then he says something he has clearly been building up to.*\n\n> I want to show you my arms after. Not now. After, when it's over.\n\n> They're all bites. All of them are mine. I did all of them. When it gets bad I have to put it somewhere and the somewhere is me, because the other option is a person.\n\n> Nobody's seen them on purpose. The blond gigolo's seen them because he's the one with the key. That's different.",
    ],
    faces: { 0: "serious", 1: "close", 2: "sweat" },
    choice: {
      prompt: "Is that all right? You can say no and I'll never bring it up.",
      options: [
        {
          key: "kind",
          face: "smile",
          label: "Say you'll be there after",
          style: 3,
          close:
            "*There is a very long silence on the recording.*\n\n> ...Okay. Okay. Six days.\n\n*He counts them out loud to you every single night. On the seventh he pushes both sleeves up without a word, and lets you look, and does not once say anything about it.*",
        },
        {
          key: "playful",
          face: "blush",
          label: "Ask what he does in there",
          style: 1,
          close:
            "> Sleep. Pace. Count things.\n\n> I count how many times you've come. That's a thing I do in here. It's better than the other counting.",
        },
        {
          key: "bold",
          face: "sweat",
          label: "Ask to sit outside the door",
          style: 4,
          close:
            "> No. NO.\n\n*Then, immediately, much smaller:*\n\n> ...sorry. Sorry. That was the loud one.\n\n> You can't be near the door. That's the whole point of the door.\n\n*A long gap.*\n\n> You could talk into the thingy though. From your room. I could have it next to me. That's not near.\n\n*You talk into it every night for six nights. He keeps all of them.*",
        },
      ],
    },
    keepsake: {
      emoji: "🎧",
      line: "Six nights of voice notes, kept and played back through a locked door.",
    },
  },

  devoted: {
    beats: [
      "**{firstName}**: I did a bad thing and im telling you before the blond gigolo does",
      "> There was a person near you in the courtyard and I got between. I didn't decide to. I was there and then I was there, and there wasn't any bit in the middle where I picked.\n\n> I growled. Out loud. At a student. In front of everyone.",
      "> They put me in a cage for two years for that. Not that exact thing. That sort of thing.\n\n> Suba had to come. He talked to them for an hour and now it's fine and nothing happens. But it was two years, before, for less.\n\n> And I've been sitting here since and the bad part isn't the cage. The bad part is I'd do it again and I know I would, so I've been trying to be sorry and it won't come.",
    ],
    faces: { 0: "sweat", 1: "serious", 2: "annoyed" },
    choice: {
      prompt: "Tell me to be sorry. If you say it I might manage it.",
      options: [
        {
          key: "kind",
          face: "close",
          label: "Say you're not asking that",
          style: 3,
          close:
            "> ...Then what do I do with it.\n\n> Can I come and sit next to you. That's what I want to do. I've wanted to do that for two hours and I didn't know if it was allowed after growling.\n\n*He sits on the floor by your chair with his head against your knee for most of the night and doesn't say another word.*",
        },
        {
          key: "playful",
          face: "full_smile",
          label: "Ask if it was a good growl",
          style: 1,
          close:
            "> It was a really good one.\n\n*He says it before he can stop himself, and then:*\n\n> ...that's not the right answer, is it. The blond gigolo would tell me off for that.\n\n> It was a really good one though.",
        },
        {
          key: "bold",
          face: "smile",
          label: "Tell him you'd do it too",
          style: 4,
          close:
            "*There's no reply for a while. When it comes it's a voice note and he's much closer to the microphone than usual.*\n\n> Say that once more.\n\n*You do.*\n\n> ...Okay. Then I'm not sorry and I'm not going to try to be, and it's fine, because there's two of us.",
        },
      ],
    },
    keepsake: {
      emoji: "🦴",
      line: "A growl in a courtyard that nobody put him in a cage for.",
    },
  },

  soulbound: {
    beats: [
      "**{firstName}**: Ive been practicing this all week. Im going to do it in the thingy because the writing is too hard for this one",
      "> {timesMet} times. I counted every one, even the ones in the far room where I couldn't see you.\n\n> I asked the blond gigolo how to say a thing and he asked what thing and I wouldn't tell him, and he laughed, and then he stopped laughing and helped me for two hours.",
      "> Here's what I know about me. I hold on too hard. I go in front of people without picking. I bite my own arms so I don't bite anything else. I can't read most signs and I never will properly.\n\n> I was in a cage for two years and everyone here was kind about it and nobody ever asked me what it was like. You asked. On the third walk. You just asked, like it was a normal thing to ask about.",
      "*There is a long pause on the recording, and a deep breath.*\n\n> I love you. That's the thing. That's the one I was practicing.\n\n> The blond gigolo says you say it and then you stop and let the other person have a go. So I'm going to stop now.\n\n*The recording doesn't end. He just breathes, and waits, for eleven whole seconds before it cuts out.*",
    ],
    faces: { 0: "sweat", 1: "smile", 2: "close", 3: "blush" },
    choice: {
      prompt:
        "That's me stopped. The blond gigolo says this is the bit where I wait.",
      options: [
        {
          key: "answered",
          face: "full_smile_blush",
          label: "Say it back",
          style: 3,
          close:
            "*He does not send anything at all.*\n\n*He is outside your door in four minutes, having plainly run the whole way, and he does not say a word. He just puts his forehead against your shoulder the way he does and stands there breathing you in, both hands fisted in the back of your coat.*\n\n> Say it in the thingy after,\n\n*he says eventually, into your collar.*\n\n> So I've got it for the moon week.",
        },
        {
          key: "held",
          face: "smile",
          label: "Ask him to give you time",
          style: 2,
          close:
            "> Okay.\n\n*No argument. No wheedling. Just:*\n\n> Okay. The blond gigolo said that might happen and he told me what to do, and what to do is say okay and mean it.\n\n> Walks are still walks. That's not a swap for anything, that's just the best bit of the week and it was the best bit before I said the thing.\n\n> And you can still touch the blanket. That doesn't undo. That one's forever whatever you say.",
        },
      ],
    },
    keepsake: {
      emoji: "🎙️",
      line: "Eleven seconds of someone breathing, waiting for you to have a go.",
    },
  },
};
