export default {
  // The level-up DMs (docs/bond-scene-dms.md). Lyca is still learning to read
  // and is not tech-savvy, so his messages are short and phonetically spelled.
  // He reads people by scent, so he always knows before you tell him, and the
  // bite scars on his arms are what he is most afraid of you seeing.
  //
  // Per reference.md's "## Bond Scenes" notes he does not type in all-lowercase:
  // sentence starts and "I" get a capital even though the spelling stays rough
  // ("dont", "im").
  bondScenes: {
    acquaintance: {
      beats: [
        "**{firstName}**: Is this you\n\nThe blond gigolo put your name in the thingy for me. I pressed it four times. Sorry if it went four times",
        "I don't mind classes. The teachers say cool stuff. Once I learn to read the textbooks and the blackboard it'll be perfect.\n\nYou listen the same way. Like you're really getting it.\n\nSometimes, I can smell something sweet off you. Just for a second. Its different from everyone else\n\nI started sitting where I could see you in class. I told myself it was to hear better. But...\n\nI want to learn about you. Not just what the teachers say. That's what I wanted to tell you {timesMet} classes ago.",
      ],
      choice: {
        prompt:
          "Is that a rude thing to say? The blond gigolo says half the things I say are rude.",
        options: [
          {
            key: "kind",
            label: "Say it's not rude at all",
            style: 3,
            close:
              "Good\n\n...Then I'm gonna keep learning about you. Everything. Is that allowed?",
          },
          {
            key: "playful",
            label: "Ask what you smell",
            style: 1,
            close:
              "Strawberry milk. The carton kind, from the cafeteria. That's what you smelled like earlier, right when you got the answer.",
          },
          {
            key: "bold",
            label: "Say you want to know him too",
            style: 4,
            close:
              "...Really?\n\nOkay. Then I don't gotta stop myself from asking stuff about you. That's better. Can we keep doing that?",
          },
        ],
      },
      keepsake: {
        emoji: "📚",
        line: "Sitting close in class to hear one thing, staying to learn another.",
      },
    },

    friend: {
      beats: [
        "**{firstName}**: Your scents gone squeezy. Somethings wrong",
        "You always give me {favResponse}. Every time, don't matter what mood I catch you in. Stopped noticing it a while back, it's just how you smell to me now.\n\nToday you still gave me {favResponse}. Same words. But underneath it your scent went all squeezy, like the time you cried and never told me why.\n\nNobody else can smell that on you. I can. That's the one thing I'm really good at, so I'm not gonna pretend I didn't.",
      ],
      choice: {
        prompt: "So what happened. You don't gotta tell me the whole thing",
        options: [
          {
            key: "kind",
            label: "Say you're fine, just tired",
            style: 3,
            close:
              "...Okay. I'll believe that. For now\n\nBut your scent doesn't lie to me even when you do. So if it goes squeezy again, I'm asking again.",
          },
          {
            key: "playful",
            label: "Ask if he's a detective now",
            style: 1,
            close:
              "No. Detectives use their eyes. I use my nose. Mine's better\n\nThat's not a so-shul skill either, before you say it. It's just how noses work.",
          },
          {
            key: "bold",
            label: "Tell him you need a hug",
            style: 4,
            close:
              "I get that one\n\nI'm coming over. Don't argue, I'm already putting my shoes on\n\nI can stay till you feel better",
          },
        ],
      },
      keepsake: {
        emoji: "👃",
        line: "The day your scent went squeezy and he noticed before you said a word.",
      },
    },

    closeFriend: {
      beats: [
        "**{firstName}**: Come to my room. Bring nothing. Dont bring the blond gigolo",
        "*The room is bare except for a bed and, folded on the end of it, a blanket that is filthy, threadbare, and clearly ancient. He is standing between you and it, which he does not seem to have decided to do.*\n\n> That's mine. It's from before. Before the campus, before the cage, before any of it.",
        "> The blond gigolo washed it once. Two years ago. He was being kind and it took the smell out and I didn't talk to him for six days.\n\n*He moves out of the way, which takes him a visible amount of effort.*\n\n> You can touch it. Not take it. Touch it.\n\n> I've never let anyone. That's what I'm doing right now, I want you to know that's what I'm doing.",
      ],
      choice: {
        prompt: "Go on. I'll be fine. I've decided I'll be fine.",
        options: [
          {
            key: "kind",
            label: "Touch it and say nothing",
            style: 3,
            close:
              "*He watches your hand the entire time without breathing much.*\n\n*When you take it away he sits down on the floor rather suddenly.*\n\n> ...It smells like you now,\n\n*he says, and then, before you can apologize:*\n\n> No. Good. That's good. That's the good one. Leave it.",
          },
          {
            key: "playful",
            label: "Say it needs a wash",
            style: 1,
            close:
              "> DON'T.\n\n*Then, after a second:*\n\n> ...that was a joke. That was a joke and I did the shouting anyway.\n\n> Do it again. I want to practice it being a joke.",
          },
          {
            key: "bold",
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
      choice: {
        prompt: "Is that all right? You can say no and I'll never bring it up.",
        options: [
          {
            key: "kind",
            label: "Say you'll be there after",
            style: 3,
            close:
              "*There is a very long silence on the recording.*\n\n> ...Okay. Okay. Six days.\n\n*He counts them out loud to you every single night. On the seventh he pushes both sleeves up without a word, and lets you look, and does not once say anything about it.*",
          },
          {
            key: "playful",
            label: "Ask what he does in there",
            style: 1,
            close:
              "> Sleep. Pace. Count things.\n\n> I count how many times you've come. That's a thing I do in here. It's better than the other counting.",
          },
          {
            key: "bold",
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
      choice: {
        prompt: "Tell me to be sorry. If you say it I might manage it.",
        options: [
          {
            key: "kind",
            label: "Say you're not asking that",
            style: 3,
            close:
              "> ...Then what do I do with it.\n\n> Can I come and sit next to you. That's what I want to do. I've wanted to do that for two hours and I didn't know if it was allowed after growling.\n\n*He sits on the floor by your chair with his head against your knee for most of the night and doesn't say another word.*",
          },
          {
            key: "playful",
            label: "Ask if it was a good growl",
            style: 1,
            close:
              "> It was a really good one.\n\n*He says it before he can stop himself, and then:*\n\n> ...that's not the right answer, is it. The blond gigolo would tell me off for that.\n\n> It was a really good one though.",
          },
          {
            key: "bold",
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
      choice: {
        prompt:
          "That's me stopped. The blond gigolo says this is the bit where I wait.",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close:
              "*He does not send anything at all.*\n\n*He is outside your door in four minutes, having plainly run the whole way, and he does not say a word. He just puts his forehead against your shoulder the way he does and stands there breathing you in, both hands fisted in the back of your coat.*\n\n> Say it in the thingy after,\n\n*he says eventually, into your collar.*\n\n> So I've got it for the moon week.",
          },
          {
            key: "held",
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
  },
  dialogue: {
    new: [
      {
        line: "He keeps his distance, observing you carefully. There's wariness in his posture, but curiosity flickers in his eyes.",
        approach: "Stand still and let him look",
      },
      {
        line: "He circles wide around you, watching, deciding. Nothing about it is hostile.",
        approach: "Wait for him to decide",
      },
      {
        line: "He repeats a word you used, quietly, testing the shape of it.",
        approach: "Speak gently",
      },
      {
        line: 'The phone in his pocket buzzes and he flinches hard. "This phone thingy keeps making noises and making me jump... Why do I gotta carry it everywhere?"',
        approach: "Ask what spooked him",
      },
      {
        line: "He doesn't come closer, but he doesn't leave either. That's the whole conversation.",
        approach: "Wave at him",
      },
    ],
    known: [
      {
        line: "He's stopped circling. He stands where he can see you, and stays.",
        approach: "Face towards him",
      },
      {
        line: "He's learned your name, and repeats it once, quietly, getting it right.",
        approach: "Respond to him",
      },
      {
        line: "\"When I find Neros, I wanna prove I've been getting along with humans. Then he'll definitely let me live with him.\"",
        approach: "Ask him about Neros",
      },
      {
        line: "He watches what you do with your hands, and copies it half an hour later.",
        approach: "Show him with your hands",
      },
      {
        line: "The wariness has become attention, which is an entirely different thing.",
        approach: "Hold his attention",
      },
      {
        line: "He asks you to say something again, then repeats it back until he's got it exactly right.",
        approach: "Say it again for him",
      },
      {
        line: "\"You don't smell like a stranger anymore,\" he says, like it's a fact he's only just confirmed.",
        approach: "Ask what changed",
      },
      {
        line: "He's stopped standing at the edge of the group. Now he stands in it, closer to you than anyone.",
        approach: "Stand closer",
      },
      {
        line: '"The blond gigolo says I\'m getting better at the so-shul stuff. Because of you, he said." He looks almost pleased about it.',
        approach: "Tell him he's doing fine",
      },
      {
        line: "He falls into step beside you without a word, like it stopped needing an invitation somewhere along the way.",
        approach: "Let him walk with you",
      },
      {
        line: '"Suba took me to lunch at Sho\'s food truck. I ate too fast and he laughed at me, but I still had a good time."',
        approach: "Ask what he had for lunch",
      },
      {
        line: "He sniffs the air when you arrive before he even turns around, and relaxes on the spot.",
        approach: "Let him catch your scent",
      },
      {
        line: "\"You could've left me at Ultio when you found me, but you didn't.\" He still hasn't figured out why.",
        approach: "Say you wanted to be friends",
      },
    ],
    warm: [
      {
        line: "The guarded distance closes when he recognizes you. A genuine, warm smile breaks through his usual reserve.",
        approach: "Smile back",
      },
      {
        line: "He's practiced something to say to you. It comes out slightly formal and completely sincere.",
        approach: "Ask about the new word",
      },
      {
        line: "He falls in at your side without being asked, and stays exactly a step behind.",
        approach: "Match his pace",
      },
      {
        line: "\"Your scent's all squeezy today. You're sad,\" he says. He's rarely wrong about that.",
        approach: "Tell him what's wrong",
      },
      {
        line: "\"I'm gonna go practice swimming at Haru's place. Can you do other stuff besides doggy paddle?\"",
        approach: "Ask him to teach you",
      },
      {
        line: 'He\'s stopped flinching at his own phone. Mostly. "Suba showed me how to turn the noise off."',
        approach: "Ask how he'll know you texted",
      },
      {
        line: '"That blond gigolo tried to sit between us at lunch. I moved. He can sit somewhere else."',
        approach: "Ask if he's jealous",
      },
      {
        line: "He offers you half of whatever he's eating before you've asked, like it was always the plan.",
        approach: "Take the half he's offering",
      },
      {
        line: "\"I read the whole chapter myself last night. Took a while, but I got it.\" He says it like it's nothing, but he's watching for your reaction.",
        approach: "Tell him that's great",
      },
      {
        line: "He growls, quiet and short, at someone who got too close to you in the hall. Then he looks embarrassed about it.",
        approach: "Tell him it's okay",
      },
      {
        line: '"You\'re not scared of me. Everyone else still is, a little. I noticed a while back."',
        approach: "Say you never were",
      },
      {
        line: "He's started saving you a seat without being asked, and glares at anyone who tries to take it.",
        approach: "Take the seat he saved",
      },
      {
        line: "\"I draw what happened every day so I don't forget it. You're in most of the pages now.\"",
        approach: "Ask to see the pages",
      },
      {
        line: "He sniffs the air the second you walk in, and his whole posture eases before he even says hello.",
        approach: "Say hello first",
      },
      {
        line: "\"I asked Suba what 'sarcasm' means. He said you use it a lot. I still don't always catch it.\"",
        approach: "Explain the joke",
      },
      {
        line: "He tugs your sleeve instead of saying your name now, when he wants your attention.",
        approach: "Give him your attention",
      },
      {
        line: "\"I'm getting better at the human stuff. The blond gigolo says so, and he'd tell me if I wasn't.\"",
        approach: "Tell him he's right",
      },
      {
        line: "He waits by the gate most days now, like it stopped being a coincidence a while ago.",
        approach: "Ask if he's waited long",
      },
    ],
    spark: [
      "He presses his face into your shoulder and breathes in, and doesn't apologize.",
      '"I don\'t have a word for this one," he says. "I\'ve been looking."',
      "He's stopped keeping a respectful distance. He's chosen a different one.",
      "He takes your hand and turns it over, learning it, taking his time.",
      "He looks at your mouth, then away, then back, and gives up on the away part.",
    ],
    close: [
      '"You\'re my most important person," he says, plain and certain. "You safe. You happy. Nothing matters more than that."',
      "He puts himself between you and the noise without thinking about it at all.",
      "He rests his head against your shoulder, briefly, and pretends he didn't.",
      '"I understand more now," he says. "Mostly because of you."',
      "The wariness is gone entirely. What's left is loyal all the way down.",
    ],
    bound: [
      "He's found the word. He uses it constantly now, and gets it right every time.",
      "He curls around you in his sleep and makes a sound like something finally at rest.",
      '"You smell like mine," he says, delighted, with no idea how that lands.',
      "He kisses clumsily, enthusiastically, improving at an alarming rate.",
      "He's stopped keeping any distance at all. There simply isn't one anymore.",
    ],
  },
  temperamentDialogue: {
    new: [
      '"Hmm? I don\'t know your scent yet. ...What do you want?"',
      '"You smell like somewhere else. Sorry, is that rude? I\'m still learning."',
      '"Stay there a moment. I want to understand you first."',
      "\"You're not afraid. Most people are. Why aren't you?\"",
      '"I won\'t hurt you. I want to say that before anything else."',
    ],
    known: [
      '"You. I remember. I\'m glad I remembered."',
      '"Can I ask you something? I\'m allowed to ask, right?"',
      '"You came back twice. That means something. Doesn\'t it?"',
      "\"I don't understand you yet. I'd like to.\"",
      "\"Hey! Moth-eaten Casanova! Where'd you go? I'm going to show you my special move today.\"",
      '"Your scent changed. Good change. I think that means you\'re happy."',
      '"I learned your footsteps. I know it\'s you before I look."',
      "\"You didn't have to bring that. But... thank you. I mean it.\"",
      '"I practiced saying hello properly. Did it sound right?"',
      "\"You're not scared of me anymore. I noticed. I like that a lot.\"",
      '"Can we walk again? I liked the last one. A lot."',
      "\"I saved you a piece. It's the good one. Don't tell the others.\"",
      "\"You use my name right. Most people don't bother. You do.\"",
    ],
    warm: [
      "\"You're back. I'm... really happy about that.\"",
      '"I learned a new word today. I was saving it for you."',
      '"Walk with me? I\'ll keep to your pace."',
      "\"Something's wrong. I can tell. You don't have to say what.\"",
      '"I like it when you\'re here. Is that all right to say?"',
      "\"I waited by the gate. I wasn't sure when you'd come, so I just waited.\"",
      '"Your scent is my favorite one. I checked. It still is."',
      '"I made room next to me. It\'s yours, if you want it."',
      "\"You're tired. I can smell it. Sit. I'll be quiet.\"",
      '"I brought you something. It\'s small. I hope that\'s okay."',
      "\"I don't get scared much anymore. Not since you started staying close.\"",
      "\"You're the human I hoped to find. I didn't say that part before.\"",
      '"I want to protect this. Us, I mean. Whatever this is."',
      "\"I learned a new word for how I feel around you. I'll tell you when I'm sure.\"",
      '"Stay a little. I like the quiet better when you\'re in it."',
      "\"I don't share food. I share with you. That's different.\"",
      "\"You make the wary feeling go away. I didn't think anything could.\"",
      "\"I'd rather be here than anywhere else. That's new. I like it.\"",
    ],
    spark: [
      '"Can I be close? Not careful-close. The other one."',
      '"You smell sweeter than usual today. ...Stop. Go away." He doesn\'t move.',
      '"I found the word. I\'m not going to say it yet. But I found it."',
      '"Stay still. I want to remember this exactly."',
      '"Everyone else, I keep a distance. You, I keep close. That\'s the difference."',
    ],
    close: [
      '"You being safe. You being happy. That\'s the most important thing there is."',
      '"Wherever you go, I go. That\'s already decided."',
      '"You taught me what this feeling is called. I use it a lot now."',
      '"Let me stand in front. Just this once. Just let me."',
      '"You never once treated me like an animal. I remember every time."',
    ],
    bound: [
      '"I love you. That\'s the word. I found it ages ago. I just wanted to be sure."',
      '"Come lie down. I sleep better with you. I sleep properly."',
      '"Can I... yes? Good. I\'ll never stop asking, I like the yes."',
      "\"You're mine and I'm yours. Both. It has to be both.\"",
      "\"Stay close. Closer. There's no such thing as too close, I've checked.\"",
    ],
  },
  approach: {
    // new/known/warm are migrated to { line, approach } beats above.
    spark: [
      "Say yes to the other close",
      "Stay still",
      "Let him learn your hand",
      "Ask for the word",
    ],
    close: [
      "Go to him",
      "Let him take the front",
      "Rest against his shoulder",
      "Tell him you're safe",
    ],
    bound: ["Lie down with him", "Say yes", "Get closer", "Say it back"],
  },
  responses: {
    kind: {
      new: [
        "Be genuinely kind",
        "Answer his question honestly",
        "Tell him you're not afraid",
      ],
      spark: [
        "Give him the word",
        "Let him stay close",
        "Tell him he's allowed",
      ],
      close: [
        "Remind him he's not an animal",
        "Teach him another word",
        "Say he taught you too",
      ],
      bound: [
        "Say it back",
        "Let him curl around you",
        "Tell him he got it right",
      ],
    },
    playful: {
      new: ["Be kind and playful", "Give him a new word", "Race him there"],
      spark: [
        "Make him find it himself",
        "Breathe him in back",
        "Hold the hand hostage",
      ],
      close: ["Roughhouse with him", "Ruffle his hair", "Let him win the race"],
      bound: [
        "Make him ask again",
        "Teach him a better kiss",
        "Say you smell like his",
      ],
    },
    bold: {
      new: ["Be brave", "Close the distance first", "Reach out anyway"],
      spark: [
        "Choose the other close",
        "Say the word for him",
        "Don't let him look away",
      ],
      close: [
        "Stand with him proudly",
        "Refuse to let him lead",
        "Say wherever you go, he goes",
      ],
      bound: ["Close what's left", "Say it first", "Tell him it's both"],
    },
    neutral: {
      new: ["Be calm with him", "Let him circle", "Say nothing and wait"],
      spark: ["Keep the careful distance", "Let him wonder", "Stay quiet"],
      close: [
        "Understand his quiet",
        "Walk in silence together",
        "Let him lean on you",
      ],
      bound: ["Let him sleep", "Lie still", "Say nothing at all"],
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
      '**{name}** circles wide around {user}, watching. "...You know my name. I don\'t know your scent yet."',
      "{user} says the name, and **{name}** repeats it back quietly, testing the shape of it.",
      '"Stay there a moment." **{name}** takes {user} in slowly, scent and all.',
    ],
    warm: [
      "**{name}** knows the voice before he's found the face, and comes straight to {user}.",
      '"I learned a new word today." **{name}** had been saving it for {user}.',
      "{user} calls out, and **{name}** falls in at their side, exactly one step behind.",
    ],
    spark: [
      '"You smell happy." **{name}** tells {user} this as a plain fact.',
      "{user} says the name, and **{name}**'s ears do something he has no control over.",
      "**{name}** had practiced a greeting for {user}. It comes out formal and completely sincere.",
    ],
    close: [
      "**{name}** hears {user}, and nothing else on campus is interesting any more.",
      '"Walk with me? I\'ll keep to your pace." **{name}** holds still until {user} moves first.',
      "{user} calls, and **{name}** abandons the **{house}** errand without a flicker of guilt.",
    ],
    bound: [
      '"You smell like mine," **{name}** says to {user}, delighted.',
      "**{name}** doesn't reach for a new word this time. He just says {user}'s name, slow.",
      "{user} says the name, and **{name}** makes a sound like something finally at rest.",
    ],
  },
};
