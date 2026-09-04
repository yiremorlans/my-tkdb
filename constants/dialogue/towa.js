export default {
  // The level-up DMs (docs/bond-scene-dms.md). Towa barely speaks in daylight,
  // so every one of these lands after dark — which makes the DM the natural home
  // for him in a way it isn't for anyone else. He hums, he eats flowers, he is
  // casually morbid about things nobody else would be casual about, and the
  // possessiveness is real and never played for a laugh. The intimacy is that he
  // keeps asking permission for things he could simply take.
  bondScenes: {
    acquaintance: {
      beats: [
        "It arrives after dark, which is the only time he says much at all.\n\n**{firstName}**: \"I picked you a dandelion. It's already dead. I picked it three days ago and I kept forgetting to give it to you, so now it's dead, and I'm sorry but I'm still going to give it to you.\"",
        "\"You've come to the park {timesMet} times. I know because I count the days between. The most was nine. That was a bad nine.\"\n\n\"I don't like talking in the daytime. Everything's too loud and my mouth doesn't work properly. At night it's fine. At night I could say anything.\"\n\n\"So this is the night version. I'm nicer at night. Everyone says so.\"",
      ],
      choice: {
        prompt: "\"Do you want the dead one? You can say no. You'd be the first.\"",
        options: [
          {
            key: "kind",
            label: "Say you want it",
            style: 3,
            close: "\"...Oh.\"\n\nThe humming starts up in the background of the next voice note and doesn't stop.\n\n\"Then I'll pick you a live one too. And another one. I'll pick you all of them, I don't mind, they grow back.\"",
          },
          {
            key: "playful",
            label: "Ask if he eats those",
            style: 1,
            close: "\"Only the yellow bit. The stem is horrible, it's like drinking a wall.\"\n\nA pause.\n\n\"You can try it. I'll pick you a fresh one, I wouldn't give you a dead one to eat. I'm not strange.\"",
          },
          {
            key: "bold",
            label: "Ask about the bad nine days",
            style: 4,
            close: "\"I counted them twice to make sure.\"\n\n\"I sat by the gate on the fourth one. And the sixth. Not the others, I had jobs.\"\n\n\"Don't do nine again. Please. I don't like what I'm like on the seventh.\"",
          },
        ],
      },
      keepsake: {
        emoji: "🌼",
        line: "A dandelion picked three days too early and given anyway.",
      },
    },

    friend: {
      beats: [
        "**{firstName}**: \"Ren says I'm not allowed to ask people why they're nice to me. He says it makes them go away.\"\n\n\"I'm asking anyway. It's night. I'm allowed things at night.\"",
        "\"You've got {favResponse} for me every time. Even the times I said something wrong. I say wrong things a lot. I know when I've done it, I can hear it about a second after, and by then it's already out.\"\n\n\"Everybody does the little step back. It's tiny. They don't know they're doing it. I've seen it about four hundred times and I can spot it from right across the park.\"\n\n\"You've never done the step back. Not once. I've been watching for it.\"",
      ],
      choice: {
        prompt: "\"So why don't you? Ren says don't ask. I'm asking.\"",
        options: [
          {
            key: "kind",
            label: "Say nothing he says is wrong",
            style: 3,
            close: "\"That's not true. I said a really bad one to Haru in March.\"\n\nA pause.\n\n\"But you can keep saying it. I'd like you to keep saying it. I'll pretend it's true when it's dark.\"",
          },
          {
            key: "playful",
            label: "Say you've stepped closer",
            style: 1,
            close: "\"...Closer?\"\n\nThe humming stops completely, which is more alarming than it starting.\n\n\"Do it again. The closer thing. Do it tomorrow where I can see it.\"",
          },
          {
            key: "bold",
            label: "Tell him to stop watching",
            style: 4,
            close: "\"I can't. It's the only way I know when.\"\n\n\"If I stop watching then one day you'll just be gone and I won't have seen it coming, and that's worse. That's much worse. I've had that one before.\"\n\n\"...I'll watch less. A bit less. I can do a bit less.\"",
          },
        ],
      },
      keepsake: {
        emoji: "🌷",
        line: "The little step back that you never once took.",
      },
    },

    closeFriend: {
      beats: [
        '**{firstName}**: "Come to the far field. The one past the fence where nobody goes because they think it\'s out of bounds. It is out of bounds. Come anyway."',
        "It is completely dark and completely silent, and the field is full of dandelions gone to seed, thousands of them, the whole slope, pale in what light there is.\n\n\"I planted this. Not the first ones, they were already here. But I've been carrying seed heads out from the park for two years and letting them go here.\"",
        "He sits down in the middle of it without checking whether you'll follow.\n\n\"Nobody knows. Not Haru, and Haru knows every square foot of that park. This bit isn't the park. This bit's mine.\"\n\nHe hums for a while.\n\n\"You can be in it. That's what I'm asking. Not visiting it, *in* it, so it's a place with you in it and then I can come here when you're not here and you'll still sort of be here.\"",
      ],
      choice: {
        prompt: "\"Is that all right? You can say no. Say no properly if you mean it, I get confused by the polite kind.\"",
        options: [
          {
            key: "kind",
            label: "Say yes and sit down",
            style: 3,
            close: "You sit. He goes very still for a moment, and then leans over sideways until his whole weight is against you, exactly like a child falling asleep on a bus.\n\n\"Good,\" he says. \"That's it now. That's done. You're in it.\"\n\nHe hums until it gets light.",
          },
          {
            key: "playful",
            label: "Blow a seed head at him",
            style: 1,
            close: "It goes everywhere. He is absolutely delighted and appalled in equal measure.\n\n\"That's a WHOLE ONE. That's about two hundred!\"\n\n\"...Good. Do another. There should be more of them if you're going to be in it.\"",
          },
          {
            key: "bold",
            label: "Ask what happens if you go",
            style: 4,
            close: "The humming stops.\n\n\"Then it's still yours,\" he says, after a long time. \"I'd still come. I'd just be sad in it instead.\"\n\n\"That's better than not having it. I worked that out already. I worked it out before I brought you.\"",
          },
        ],
      },
      keepsake: {
        emoji: "🌱",
        line: "A field out of bounds with two years of seed carried into it.",
      },
    },

    confidant: {
      beats: [
        "**{firstName}**: \"I don't sleep at night. You knew that. Here's the bit you didn't.\"",
        "\"I don't sleep because I'm listening for the park. Everything in it makes a noise and I know all of them, and if one stops making its noise I have to go and see why.\"\n\n\"Haru thinks I'm being good at my job. I'm not being good at my job. I'm frightened all the time, and the job is the only shape I've got to put it in.\"",
        "\"Everything I've ever liked has stopped making its noise eventually. That's not a sad thing to say, it's just true, and everyone gets upset when I say it so I stopped saying it.\"\n\n\"You make a noise. I know what it is now. I know the sound of you coming across the gravel from about forty feet.\"\n\n\"So now I listen for that as well, and it's much worse, because there's a lot more hours in the day when you're not on the gravel.\"",
      ],
      choice: {
        prompt: "\"Is that a bad thing to have said? I can't always tell at night. Tell me if it was bad.\"",
        options: [
          {
            key: "kind",
            label: "Say you'll come more often",
            style: 3,
            close: "\"How often.\"\n\nYou tell him.\n\n\"...Say the days. Say them out loud so I can put them somewhere.\"\n\nYou list them. He repeats every one back. He never misses one after that, and neither do you.",
          },
          {
            key: "playful",
            label: "Ask what your noise is like",
            style: 1,
            close: "\"Uneven. You take the corner wide because of the puddle. Everyone else walks through the puddle.\"\n\n\"It's my favorite one. Don't tell the birds.\"",
          },
          {
            key: "bold",
            label: "Tell him to sleep instead",
            style: 4,
            close: "\"I can't do it on my own.\"\n\nA long pause. Then, very simply, with no wheedling anywhere in it:\n\n\"You could sit in the field with me. I've slept there before. I've never slept there with anyone.\"\n\nHe does sleep, that night, for about three hours, flat out in the seed heads with his head on your leg, humming even in his sleep.",
          },
        ],
      },
      keepsake: {
        emoji: "🪨",
        line: "The sound of your feet on gravel, learned from forty feet away.",
      },
    },

    devoted: {
      beats: [
        '**{firstName}**: "The one who was standing near you today. In the courtyard. I know his name and where he sleeps and what time he goes to the refectory."\n\n"I found that out in about eleven minutes. I\'m telling you that I found it out."',
        "\"I'm not going to do anything. I want you to know I'm not going to.\"\n\n\"But I found it out, and I sat with it for the whole afternoon, and Ren asked what was wrong and I said nothing and that was the first time I've ever lied to Ren.\"",
        "\"Here's what I did instead. I went to the field and I pulled up about a hundred of them, and then I felt awful because they hadn't done anything, and I sat there and put the seed heads back in the ground even though that doesn't work.\"\n\n\"So that's where it went. Into the flowers. It's always going to have to go somewhere and I'd rather it went there than anywhere with a name.\"",
      ],
      choice: {
        prompt: "\"Was that right? I think it was right. I'd like you to say it was right.\"",
        options: [
          {
            key: "kind",
            label: "Tell him it was right",
            style: 3,
            close: "\"...Good.\"\n\nA long silence, and then the humming starts up again, unsteady at first.\n\n\"I'll do the flowers every time. That's the rule now. You made the rule and I'm keeping it.\"",
          },
          {
            key: "playful",
            label: "Offer to replant them with him",
            style: 1,
            close: "\"They won't grow. I've done it before. It doesn't work.\"\n\nA pause.\n\n\"...You can help anyway. I'd like there to be two of us doing something that doesn't work.\"",
          },
          {
            key: "bold",
            label: "Tell him to lie to you never",
            style: 4,
            close: "\"I haven't. Not once. That's why I told you about the eleven minutes.\"\n\n\"I could have not told you. It would have been so easy to not tell you.\"\n\nThen, after a while: \"Come to the field. I want to be next to you when you're not angry with me. I've been imagining it all afternoon and it's much better than the other thing I was imagining.\"",
          },
        ],
      },
      keepsake: {
        emoji: "💐",
        line: "A hundred flowers pulled up and put carefully back.",
      },
    },

    soulbound: {
      beats: [
        "**{firstName}**: \"It's night, so my mouth works. I've been waiting all day for it to be night.\"",
        "\"{timesMet} times. And I know every gap between every one of them, including the nine, and including the four when you were ill and I sat at the gate all four.\"\n\n\"I never told you about the four. I'm telling you now because I'm telling you everything tonight, that's the plan.\"",
        "\"I know what I am. Ren's explained it to me twice, kindly, and Haru's explained it once, badly.\"\n\n\"I hold on too hard and I count things I shouldn't count and I find out names in eleven minutes. That's not going to change. I've tried to change it and all that happens is I do it quietly instead, which is worse.\"\n\n\"So I'm not going to promise I'll be normal. I'd be lying and I don't lie to you.\"",
        "\"Here's the thing I do promise, and it's the only one I've got.\"\n\n\"I love you. And you can go. Any time, any day, and I won't follow and I won't find anything out and I won't sit at the gate where you can see me.\"\n\n\"I'd be sad in the field instead. I've already worked out how. I worked it out ages ago so that when I said this I'd be able to mean it.\"",
      ],
      choice: {
        prompt: "\"You can say anything. I've had all day to get ready for anything.\"",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close: "The humming stops dead.\n\nThen, after a very long time: \"Say it in the field. I want it to happen there so it's in the ground with everything else.\"\n\nHe's sitting in the middle of the slope when you get there, absolutely still for once, and when you say it he closes his eyes and tips forward until his forehead is against yours.\n\n\"There,\" he says. \"Now it's a place with that in it. Now it can't go anywhere.\"",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close: "\"All right.\"\n\nNo wheedling. No guilt. He doesn't ask how long, which is the most enormous thing he has ever not done.\n\n\"I said you could go, so I have to mean the smaller ones too. That's how it works. Ren explained it.\"\n\n\"The field's still yours. That was done ages ago and it doesn't undo. And I'll still know your feet on the gravel, and I'll still be glad, and you don't have to do anything about that at all.\"",
          },
        ],
      },
      keepsake: {
        emoji: "🌻",
        line: "A promise that you could go, worked out long in advance so he could mean it.",
      },
    },
  },
  dialogue: {
    new: [
      "He's been watching the sky. His eyes drop to you the moment you arrive and stay there, unblinking.",
      "He's been standing out here long enough for the dark to have settled around him. He doesn't seem to mind it.",
      "A dandelion turns over and over between his fingers. He hasn't looked away from you once.",
      '"...Hmphm." He\'s been waiting, and he hates waiting. "Are you done yet? Come play."',
      "You feel watched before you see him. By then he's already much closer.",
    ],
    known: [
      "He knows your footsteps now. He's turned toward you before you're in sight.",
      '"Haru\'s off patrolling again." He says it flatly. "I don\'t get it. They\'re all going to die someday anyway."',
      "The dandelion is already in his hand. He's been holding it a while.",
      'He\'s eating a flower, petal by petal. He offers you the last one. "...You have this bit."',
      "He doesn't hide when you arrive anymore. He waits out in the open instead.",
    ],
    warm: [
      '"You\'re here." He catches your sleeve before you\'ve stopped walking. "Where were you? Come give me a sorry cuddle."',
      "He offers the dandelion without a word, and waits to see if you'll take it.",
      '"I can\'t see the stars from here..." He tugs your sleeve. "Come on, Dandelion! Let\'s go somewhere higher!"',
      "He counts something under his breath. You suspect it's the days since you last came.",
      '"That tree on the hill says it\'s been waiting a long time." He tilts his head. "Can you hear it? It\'s crying again."',
    ],
    spark: [
      "He's stopped holding your sleeve. He's holding your hand now.",
      "He rests his forehead against yours and breathes out, slowly, like relief.",
      '"Come here. Closer. ...There. Now stay like this. One minute. Just one."',
      "He tucks the dandelion behind your ear and lets his fingers linger.",
      '"Tell me a love story," he says, settling against you. "A long one. I want it to last."',
    ],
    close: [
      '"I\'ve been waiting every moment since you left," he says, drawing impossibly close. "Don\'t ever leave again. Please."',
      "He takes hold of your sleeve and does not let go for the rest of the conversation.",
      '"You came back," he breathes, as though it had genuinely been in doubt.',
      "He's tucked a fresh dandelion somewhere on you before you noticed him move.",
      '"When you meet your soulmate, it feels like getting struck by lightning," he says. "Have you felt it, Dandelion?"',
    ],
    bound: [
      "He sleeps with a fistful of your shirt and breathes like someone finally safe.",
      '"Mine," he murmurs into your neck, over and over, like a lullaby he wrote himself.',
      "He's tucked dandelions into every pocket you own. You stopped taking them out.",
      '"You\'re tired?" He smiles into your hair. "You\'re so weak. ...It\'s cute."',
      "He kisses you slowly, endlessly, as though he's making up for every hour apart.",
    ],
  },
  temperamentDialogue: {
    new: [
      '"...Dandelion?"',
      '"You smell like outside. ...I like it."',
      "\"Don't move yet. I'm looking.\"",
      '"...Stay a little longer. Just a little."',
      '"Are you done yet? I hate waiting. Come play with me!"',
    ],
    known: [
      '"...You came back. I thought you might not."',
      '"I know your steps now. I listen for them."',
      '"I picked this for you. It\'s a clover! Look look, it has 5 leaves!"',
      '"Don\'t go that way. Stay where I can see."',
      '"...Dandelion. That\'s what I call you. In my head."',
    ],
    warm: [
      "\"Dandelion. You're here. That's all that matters.\"",
      '"I counted. It was nine days. I counted every one."',
      '"Take it. I picked it for you. Only you."',
      '"Come somewhere higher with me. I want to show you the stars. ...Now. Come now."',
      '"You always come back. Say you always will."',
    ],
    spark: [
      '"Stay. Just here. Just like this. Please."',
      '"You smell like the outside. I want to keep it."',
      '"Don\'t talk. I just want to be near you for a minute. One minute."',
      "\"...Dandelion. Say it's me. Say it's only me.\"",
      '"I dream about this. Being this close. It\'s better awake."',
    ],
    close: [
      "\"You're mine. Only mine. Promise me you'll never leave.\"",
      "\"I'd wait forever. I'd rather not have to.\"",
      '"Let me hold on. Just here. Just your sleeve."',
      "\"If you disappear, I'll find you. That's not a threat, Dandelion.\"",
      '"Everything is quiet when you\'re here. Everything."',
    ],
    bound: [
      '"Don\'t leave. Not tonight. Not any night. Please."',
      '"I love you. I loved you before I knew the word for it."',
      '"Closer. Closer. There. Now stay exactly there forever."',
      '"Dandelion. My Dandelion. Say it\'s true."',
      '"Everything is quiet with you. Everything. I didn\'t know it could be."',
    ],
  },
  daytimeDialogue: {
    new: [
      "~~~!",
      "~~~? ...~~~.",
      "He hums a few notes at you, and waits, expectantly.",
      "~~~ ♪",
    ],
    known: [
      "~~~ ...~~~?",
      "He hums two notes, stops, and waits to see whether you stay.",
      "~~~ ♪ (he holds out a dandelion)",
      "~~~! ...~~~",
    ],
    warm: [
      "~~~! ♫",
      "~~~ ♪ ~~~ ♪",
      "The humming picks up the moment he sees you. It's cheerful. It's for you.",
      "~~~! ...~~~ ♫",
    ],
    spark: [
      "~~~ ♪ (he hums it against your shoulder)",
      "He hums low, close to your ear, and doesn't step back.",
      "~~~ ...~~~ ♫ (softer than usual, and much nearer)",
      "~~~ ♪ (he stops mid-note when you look at him)",
    ],
    close: [
      "~~~! ~~~! ♫ ♫",
      "~~~ ♪ ~~~ ♫ ~~~ ♪",
      "He hums the same three notes over and over. You've come to know that one.",
      "~~~ ♫ (he taps your sleeve, twice, and hums it again)",
    ],
    bound: [
      "~~~ ♪ (hummed into your hair, half asleep)",
      "He hums against your collarbone until you feel it more than hear it.",
      "~~~ ♫ ...~~~ ♪ (the same three notes, over and over, just for you)",
      "He hums, stops to kiss your shoulder, and picks the tune back up.",
    ],
  },
  approach: {
    new: [
      "Meet his stare",
      "Step into the shadow",
      "Don't look away",
      "Wait for him to move first",
    ],
    known: [
      "Take the dandelion",
      "Let him watch",
      "Stay where he can see",
      "Answer to Dandelion",
    ],
    warm: [
      "Take the dandelion",
      "Step into the light with him",
      "Say his name",
      "Let him fall into step",
    ],
    spark: [
      "Don't move",
      "Let him closer",
      "Take his hand",
      "Stay just like this",
    ],
    close: [
      "Go to him",
      "Let him take your sleeve",
      "Tell him you came back",
      "Promise you'll stay",
    ],
    bound: [
      "Stay forever",
      "Say it's true",
      "Let him hold on",
      "Don't leave",
    ],
  },
  daytimeApproach: {
    new: [
      "Follow the humming",
      "Hum back",
      "Listen closely",
      "Answer without words",
    ],
    known: [
      "Wait for the second note",
      "Hum back",
      "Take what he's holding",
      "Stay for the tune",
    ],
    warm: [
      "Hum the tune with him",
      "Follow the melody",
      "Let him lead",
      "Answer in his language",
    ],
    spark: [
      "Let him hum it close",
      "Don't step back",
      "Hold the note with him",
      "Stay through the tune",
    ],
    close: [
      "Finish the melody",
      "Hum his three notes back",
      "Take his hand and listen",
      "Answer the way only you can",
    ],
    bound: [
      "Let him hum you awake",
      "Feel the tune",
      "Hum it back to him",
      "Stay in the melody",
    ],
  },
  responses: {
    kind: {
      new: [
        "Be very careful with him",
        "Take the flower gently",
        "Speak softly to him",
      ],
      spark: [
        "Tell him it's only him",
        "Let him stay close",
        "Hold his hand back",
      ],
      close: [
        "Accept his possessiveness",
        "Promise you'll come back",
        "Let him hold on",
      ],
      bound: [
        "Say it's true",
        "Let him hold your shirt",
        "Tell him he's safe",
      ],
    },
    playful: {
      new: [
        "Make him smile",
        "Hum the tune back",
        "Tuck it behind your ear",
      ],
      spark: [
        "Hum it back against him",
        "Steal the dandelion",
        "Make him stop mid-note",
      ],
      close: [
        "Give him your full attention",
        "Play the counting game back",
        "Hide, and let him find you",
      ],
      bound: ["Hum it back", "Hide the dandelions", "Make him chase you"],
    },
    bold: {
      new: [
        "Stare right back at him",
        "Close the distance yourself",
        "Ask what he wants",
      ],
      spark: [
        "Close the last of it",
        "Say it's only him",
        "Don't let him step back",
      ],
      close: [
        "Own him completely",
        "Take his hand first",
        "Tell him you're not leaving",
      ],
      bound: [
        "Say you're his",
        "Pull him closer still",
        "Promise him forever",
      ],
    },
    neutral: {
      new: [
        "Observe him carefully",
        "Wait him out",
        "Stand still and let him look",
      ],
      spark: [
        "Let the minute pass",
        "Stay still and quiet",
        "Say nothing at all",
      ],
      close: [
        "Be his constant",
        "Stay in the quiet with him",
        "Let him count in peace",
      ],
      bound: ["Let him sleep", "Stay exactly there", "Say nothing at all"],
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
      "**{name}** stops humming. His eyes land on {user} and stay there, unblinking.",
      '"...Dandelion?" **{name}** tries the word out on {user} for the first time.',
      "{user} says the name, and **{name}** turns a dandelion over and over, watching them.",
    ],
    warm: [
      "\"You're here.\" **{name}** catches {user}'s sleeve before they've stopped walking.",
      "{user} calls out, and **{name}** holds out a dandelion without a word.",
      '"I counted the days." **{name}** tells {user} the number. It is exact.',
    ],
    spark: [
      "**{name}** starts humming again the moment {user} says his name. He does that for them.",
      '"Come give me a sorry cuddle," **{name}** says to {user}, who hadn\'t done anything wrong.',
      "{user} got there first, and **{name}** looks at everyone else like they lost.",
    ],
    close: [
      "\"Closer.\" **{name}** has {user}'s sleeve and isn't giving it back.",
      "**{name}** had been watching the dark. It stopped mattering when {user} called.",
      "{user} calls, and **{name}** tucks another dandelion into their pocket. There are several now.",
    ],
    bound: [
      '"Mine," **{name}** hums into {user}\'s shoulder, like a lullaby he wrote himself.',
      "**{name}** reaches {user} and breathes out like someone finally safe.",
      "{user} says the name, and **{name}** decides never to let them out of sight again.",
    ],
  },
};
