export default {
  // The level-up DMs (docs/bond-scene-dms.md). Towa can't speak in daylight,
  // so every one of these lands after dark — which makes the DM the natural home
  // for him in a way it isn't for anyone else. He hums, he eats flowers, he is
  // casually morbid about things nobody else would be casual about, and the
  // possessiveness is real and never played for a laugh. The intimacy is that he
  // keeps asking permission for things he could simply take.
  //
  // Texting voice, per reference.md's "## Bond Scenes" notes: Towa leans on
  // stickers and one or two emojis and keeps his typed lines short. The
  // night-verbose conceit (his confidant beat: "At night I could say anything")
  // stays, so the prose survives — but his typed messages carry emoji/stickers
  // and the phrasing is trimmed. Not in the `> ` lines he says out loud.
  bondScenes: {
    acquaintance: {
      // He barely types. Stickers do most of his talking, and a beat or close
      // that carries one is the sticker alone, with empty text (validateContent
      // allows that only when a sticker is attached). His name leads the first
      // beat he types, so it's clear who's texting. What he does type is a
      // few short, bright words at a time. Being mute by day is about
      // speaking, not texting, so the hour is never his reason to write.
      beats: [
        "",
        "**{firstName}**: You keep coming back 🌼\n\nMost things don't. I like that you do!",
        "{timesMet} times. I count the days in between\n\nMost was five. Bad five\n\nCome more, Dandelion. Every day!",
      ],
      stickers: { 0: "Hi.png" },
      choice: {
        prompt:
          "Haru's always around doing his rounds\n\nI want you around too",
        options: [
          {
            key: "kind",
            label: "Say you'll come more often",
            style: 3,
            close: "",
            sticker: "Happy.png",
          },
          {
            key: "playful",
            label: "Ask if he missed you",
            style: 1,
            close:
              "Yes! I missed you\n\nI counted the days you didn't come. So it's true",
          },
          {
            key: "bold",
            label: "Ask why it matters so much",
            style: 4,
            close:
              "Because I don't have much\n\nThis is mine. I want to keep it",
          },
        ],
      },
      keepsake: {
        emoji: "🌼",
        line: "When he asked you to come by more, and meant it.",
      },
    },

    friend: {
      // Same texting rules as acquaintance: sticker beats and closes are the
      // sticker alone, and his name leads the first beat he types. He's been
      // keeping track of how you answer him ({favResponse}), and what he wants
      // for it is a love story. He believes in love, simply and completely;
      // the soulmate "struck by lightning" line waits for a later tier.
      beats: [
        "",
        "**{firstName}**: You always give me {favResponse} 🌷\n\nEvery single time. I noticed",
        "So I want a love story from you next\n\nA real one",
      ],
      stickers: { 0: "Question.png" },
      choice: {
        prompt: "Do you believe in love, Dandelion? I do!",
        options: [
          {
            key: "kind",
            label: "Say you believe in it too",
            style: 3,
            close: "",
            sticker: "Smug.png",
          },
          {
            key: "playful",
            label: "Ask what makes a good one",
            style: 1,
            close: "Someone keeps coming back\n\nThat's all it needs ♪",
          },
          {
            key: "bold",
            label: "Say love isn't real",
            style: 4,
            close: "",
            sticker: "No.png",
          },
        ],
      },
      keepsake: {
        emoji: "🌷",
        line: "When he asked if you believe in love, and told you he does.",
      },
    },

    closeFriend: {
      beats: [
        "**{firstName}**: Come to the far field 🌙 The one past the fence where nobody goes. They think it's out of bounds. It is. Come anyway.",
        "*It is completely dark and completely silent, and the field is full of dandelions gone to seed, thousands of them, the whole slope, pale in what light there is.*\n\n> I planted this. Not the first ones, they were already here. But I've been carrying seed heads out from the park for two years and letting them go here.",
        "*He sits down in the middle of it without checking whether you'll follow.*\n\n> Nobody knows. Not Haru, and Haru knows every square foot of that park. This bit isn't the park. This bit's mine.\n\n*He hums for a while.*\n\n> You can be in it. That's what I'm asking. Not visiting it, *in* it, so it's a place with you in it and then I can come here when you're not here and you'll still sort of be here.",
      ],
      choice: {
        prompt:
          "Is that all right? You can say no. Say no properly if you mean it, I get confused by the polite kind.",
        options: [
          {
            key: "kind",
            label: "Say yes and sit down",
            style: 3,
            close:
              "*You sit. He goes very still for a moment, and then leans over sideways until his whole weight is against you, exactly like a child falling asleep on a bus.*\n\n> Good,\n\n*he says.*\n\n> That's it now. That's done. You're in it.\n\n*He hums until it gets light.*",
          },
          {
            key: "playful",
            label: "Blow a seed head at him",
            style: 1,
            close:
              "*It goes everywhere. He is absolutely delighted and appalled in equal measure.*\n\n> That's a WHOLE ONE. That's about two hundred!\n\n> ...Good. Do another. There should be more of them if you're going to be in it.",
          },
          {
            key: "bold",
            label: "Ask what happens if you go",
            style: 4,
            close:
              "*The humming stops.*\n\n> Then it's still yours,\n\n*he says, after a long time.*\n\n> I'd still come. I'd just be sad in it instead.\n\n> That's better than not having it. I worked that out already. I worked it out before I brought you.",
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
        "**{firstName}**: I don't sleep at night 🌙 You knew that. Here's the bit you didn't.",
        "I don't sleep because I'm listening for the park. Everything in it makes a noise. I know all of them. If one stops I have to go and see why.\n\nHaru thinks that's me being good at my job. It isn't. I'm frightened all the time, and the job is the only shape I've got to put it in 🎵",
        "Everything I've ever liked has gone quiet eventually. That's not sad, it's just true. People get upset when I say it, so I stopped.\n\nYou make a noise too. I know it now. Your feet on the gravel from forty feet off.\n\nSo I listen for that as well. It's worse, because most hours you're not on the gravel 🪨",
      ],
      choice: {
        prompt:
          "Is that a bad thing to have said? I can't always tell at night. Tell me if it was bad.",
        options: [
          {
            key: "kind",
            label: "Say you'll come more often",
            style: 3,
            close:
              "How often.\n\n*You tell him.*\n\n...Say the days. Say them out loud so I can put them somewhere.\n\n*You list them. He repeats every one back. He never misses one after that, and neither do you.*",
          },
          {
            key: "playful",
            label: "Ask what your noise is like",
            style: 1,
            close:
              "Uneven. You take the corner wide because of the puddle. Everyone else walks through the puddle.\n\nIt's my favorite one 🎵 Don't tell the birds.",
          },
          {
            key: "bold",
            label: "Tell him to sleep instead",
            style: 4,
            close:
              "I can't do it on my own.\n\n*A long pause. Then, very simply, with no wheedling anywhere in it:*\n\nYou could sit in the field with me. I've slept there before. I've never slept there with anyone.\n\n*He does sleep, that night, for about three hours, flat out in the seed heads with his head on your leg, humming even in his sleep.*",
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
        "**{firstName}**: The one standing near you today. In the courtyard.\n\nI know his name, where he sleeps, when he eats. Eleven minutes, it took me.\n\nI'm telling you that I found it out.",
        "I'm not going to do anything. I want you to know that.\n\nBut I sat with it all afternoon. Ren asked what was wrong tonight and I said nothing. First time I've ever lied to him.",
        "So instead I went to the field and pulled up about a hundred of them. Then I felt awful, they hadn't done anything, and I sat there putting the seed heads back even though that doesn't work.\n\nThat's where it went. Into the flowers 💐 It has to go somewhere. I'd rather there than anywhere with a name.",
      ],
      choice: {
        prompt:
          "Was that right? I think it was right. I'd like you to say it was right.",
        options: [
          {
            key: "kind",
            label: "Tell him it was right",
            style: 3,
            close:
              "...Good.\n\n*A long silence, and then the humming starts up again, unsteady at first.*\n\nI'll do the flowers every time. That's the rule now. You made the rule and I'm keeping it.",
          },
          {
            key: "playful",
            label: "Offer to replant them with him",
            style: 1,
            close:
              "They won't grow. I've done it before. It doesn't work.\n\n...You can help anyway 🌱 I'd like there to be two of us doing something that doesn't work.",
          },
          {
            key: "bold",
            label: "Tell him to lie to you never",
            style: 4,
            close:
              "I haven't. Not once. That's why I told you about the eleven minutes.\n\nI could have not told you. It would have been so easy to not tell you.\n\n*Then, after a while:* Come to the field. I want to be next to you when you're not angry with me. I've been imagining it all afternoon and it's much better than the other thing I was imagining.",
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
        "**{firstName}**: It's night, so my mouth works 🌙 I've been waiting all day for it to be night.",
        "{timesMet} times. I know every gap between them. The nine. And the four when you were ill and I sat at the gate all four.\n\nI never told you about the four. I'm telling you everything tonight. That's the plan.",
        "I know what I am. Ren's explained it twice, kindly. Haru once, badly.\n\nI hold on too hard. I count things I shouldn't. I find out names in eleven minutes. That won't change. When I try, I just do it quietly instead, which is worse.\n\nSo I won't promise I'll be normal. That would be a lie, and I don't lie to you.",
        "Here's the one thing I do promise. It's the only one I've got.\n\nI love you. And you can go. Any time. I won't follow, I won't find anything out, I won't sit at the gate where you can see me.\n\nI'd be sad in the field instead. I worked out how ages ago, so that when I said this I'd mean it.",
      ],
      choice: {
        prompt:
          "You can say anything. I've had all day to get ready for anything.",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close:
              "*The humming stops dead.*\n\n*Then, after a very long time:* Say it in the field. I want it to happen there so it's in the ground with everything else.\n\n*He's sitting in the middle of the slope when you get there, absolutely still for once, and when you say it he closes his eyes and tips forward until his forehead is against yours.*\n\n> There,\n\n*he says.*\n\n> Now it's a place with that in it. Now it can't go anywhere.",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close:
              "All right.\n\n*No wheedling. No guilt. He doesn't ask how long, which is the most enormous thing he has ever not done.*\n\nI said you could go, so I have to mean the smaller ones too. That's how it works. Ren explained it.\n\nThe field's still yours. That was done ages ago and it doesn't undo. And I'll still know your feet on the gravel, and I'll still be glad, and you don't have to do anything about that at all.",
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
      {
        line: "He's crouched by the flower beds, eating a dandelion head in two bites. He looks up at you, still chewing, and beams.",
        approach: "Say hello",
        greeting: '"Hi! ...You\'re a nice one. I can tell. ♪"',
        responses: {
          kind: ["Thank him, smiling", "Smile back at him"],
          playful: ["Ask how the flower tastes", "Ask how he can tell"],
          bold: ["Crouch down beside him", "Say he's a nice one too"],
          neutral: ["Smile, say nothing", "Let him finish the flower"],
        },
      },
      {
        line: '"Huh? Where did Haru go?" He turns a full circle on the path, looking, and stops when he finds you instead.',
        approach: "Say you haven't seen him",
        greeting:
          '"He was right here! ...Wait with me? Waiting is boring by myself."',
        responses: {
          kind: ["Wait with him gladly", "Help him look for Haru"],
          playful: ["Guess where Haru went", "Say Haru's hiding from him"],
          bold: ["Say you're better company", "Tell him to forget Haru"],
          neutral: ["Wait beside him quietly", "Look down the path too"],
        },
      },
      {
        line: "He's drinking straight from the outdoor tap, head tipped under the spout. He comes up dripping and grinning.",
        approach: "Wait for him to finish",
        greeting: '"Want some? It\'s cold! ~~ ♪"',
        responses: {
          kind: ["Offer him a handkerchief", "Cup your hands for a sip"],
          playful: ["Take a turn at the tap", "Flick the water back at him"],
          bold: ["Drink from the tap too", "Wipe his chin for him"],
          neutral: [
            "Shake your head, say nothing",
            "Watch him shake off the water",
          ],
        },
      },
      {
        line: "He drops onto the bench beside you like he's known you for years, knees pulled up, humming.",
        approach: "Stay on the bench",
        greeting: '"Do you know any love stories? Tell me lots of them, okay?"',
        responses: {
          kind: ["Tell him a short one", "Promise him a story later"],
          playful: ["Ask what kind he likes", "Make one up on the spot"],
          bold: ["Ask him to tell one first", "Say you'll tell the best one"],
          neutral: ["Let him hum beside you", "Stay put, say nothing"],
        },
      },
      {
        line: '"...Hmphm." He\'s been waiting, and he hates waiting. "Are you done yet? Come play with me!"',
        approach: "Agree to play",
        greeting:
          "\"Finally! Okay, you're it. I'll give you a head start. ...A small one.\"",
        responses: {
          kind: ["Promise to go easy on him", "Give him a big head start"],
          playful: ["Make him wait a little longer", "Tag him right away"],
          bold: ["Ask what he wants", "Say you'll catch him easily"],
          neutral: ["Shrug, agree quietly", "Start counting, say nothing"],
        },
      },
    ],
    known: [
      {
        line: "He spots you from across the courtyard and comes straight over, no detour, like you were the thing he was out looking for.",
        approach: "Wait for him",
        greeting: '"Ah! Dandelion, I found you!"',
        responses: {
          kind: ["Wave him over warmly", "Say you're glad he found you"],
          playful: ["Ask if you were lost", "Ask who Dandelion is"],
          bold: ["Meet him halfway", "Say you found him first"],
          neutral: ["Stay put, let him arrive", "Wait to see what he does"],
        },
      },
      {
        line: "He's already leaning into you when you sit down, warm and pleased, humming the same three notes over and over.",
        approach: "Let him lean on you",
        greeting: "\"~~ ♪ ...Don't get up yet. I'm comfy.\"",
        responses: {
          kind: ["Say you'll stay put", "Hum along with him softly"],
          playful: ["Guess the three notes", "Hum something different back"],
          bold: ["Lean into him first", "Say you like the humming"],
          neutral: ["Stay seated, say nothing", "Sit still beside him"],
        },
      },
      {
        line: '"Haru\'s going patrolling again." He says it lightly. "I don\'t get it. They\'re all going to die someday anyway."',
        approach: "Let the comment go",
        greeting:
          '"You\'re not going patrolling, are you? Good. Stay here with me."',
        responses: {
          kind: ["Say that's not true", "Say you'll stay with him"],
          playful: ["Tease him for being morbid", "Ask if he includes himself"],
          bold: ["Push back on the comment", "Call the comment bleak"],
          neutral: ["Let it go unremarked", "Say nothing about it"],
        },
      },
      {
        line: "There's a clover in his hand already. He's been holding it a while.",
        approach: "Take it from him",
        greeting:
          '"I picked this for you. It\'s a clover! Look look, it has five leaves!"',
        responses: {
          kind: ["Take it and thank him", "Accept the clover warmly"],
          playful: ["Ask how long he held it", "Wear it somewhere silly"],
          bold: ["Take it without asking", "Say he waited long enough"],
          neutral: ["Take it, say nothing", "Accept it quietly"],
        },
      },
      {
        line: 'He\'s eating a flower, petal by petal. He offers you the last one. "...You have this bit."',
        approach: "Eat it from his hand",
        greeting: '"It\'s the sweetest bit. I saved it. ...Eat it, Dandelion."',
        responses: {
          kind: ["Say it's sweet, like he said", "Thank him for sharing"],
          playful: ["Feed him one back", "Ask if it tastes different"],
          bold: ["Take the whole flower instead", "Eat it without hesitation"],
          neutral: ["Eat it, say nothing", "Take the petal quietly"],
        },
      },
      {
        line: "He's plucking petals off a flower one at a time, lips moving, counting something with each one.",
        approach: "Ask what he's counting",
        greeting:
          '"...Loves me. Loves me not. Loves me. ...It\'s a love story. Tell me one after."',
        responses: {
          kind: ["Promise him a love story", "Let him keep counting"],
          playful: ["Guess how it ends", "Count along with him"],
          bold: ["Ask who the flower's about", "Take the flower from him"],
          neutral: ["Let him count in peace", "Say nothing, watch him count"],
        },
      },
      {
        line: '"That one," he says, pointing at a cloud, "looks like you." He seems very pleased with this.',
        approach: "Ask what shape you are",
        greeting: '"Look look! It\'s you. See? Heh heh ♪"',
        responses: {
          kind: ["Say the cloud got it right", "Take the compliment kindly"],
          playful: ["Pick a shape for him too", "Argue the cloud is wrong"],
          bold: ["Agree, and say why", "Claim the shape, pleased"],
          neutral: ["Look at the cloud, say nothing", "Shrug at the cloud"],
        },
      },
      {
        line: "He's spinning slowly in circles to see how dizzy he can get, and grins wide when he wobbles straight into you.",
        approach: "Steady him",
        greeting: '"Heh heh ♪ Caught you. Or you caught me. Again!"',
        responses: {
          kind: ["Laugh, ask if he's okay", "Tell him to sit a minute"],
          playful: [
            "Spin him back the other way",
            "Tease him for the dizziness",
          ],
          bold: ["Catch him and hold on", "Say he did that on purpose"],
          neutral: ["Let go once he's steady", "Wait for him to stop wobbling"],
        },
      },
      {
        line: "He's sitting in the tree over the path in plain view, legs swinging. You only look up when he drops down in front of you.",
        approach: "Catch your breath",
        greeting: '"Boo! Heh heh. Were you scared?"',
        responses: {
          kind: ["Laugh, say a little", "Admit he got you"],
          playful: ["Say boo right back", "Pretend you saw him coming"],
          bold: ["Say it takes more than that", "Dare him to do it again"],
          neutral: ["Give him a look", "Shake it off, say nothing"],
        },
      },
      {
        line: "Something with too many teeth watches you both from the tree line. Towa doesn't even turn around.",
        approach: "Stay close to him",
        greeting:
          "\"Hm? Are you afraid of that carnivore? Don't worry. I'm the boss around here.\"",
        responses: {
          kind: ["Thank him for looking out", "Say you feel safer now"],
          playful: ["Ask what makes him boss", "Ask if it takes orders"],
          bold: ["Say you're not afraid", "Ask him to prove it"],
          neutral: ["Watch the tree line", "Stay quiet beside him"],
        },
      },
      {
        line: "Someone across the path says something ugly about Haru. Towa stops smiling, his eyes go thin, and the sky goes gray with him.",
        approach: "Say his name",
        greeting: '"...Hm? Oh! Dandelion. It\'s going to rain, I think. ♪"',
        responses: {
          kind: ["Say something kind about Haru", "Change the subject"],
          playful: [
            "Ask why the sky did that",
            "Tease him about the mood swing",
          ],
          bold: ["Ask him what just happened", "Call out the reaction"],
          neutral: ["Let it go unremarked", "Change the subject quietly"],
        },
      },
      {
        line: 'He has his face tipped up, sniffing the air. "It\'s going to rain again tomorrow."',
        approach: "Ask how he knows",
        greeting: '"I just know! I have to go tell Haru. ...Come with me?"',
        responses: {
          kind: ["Walk with him to find Haru", "Say Haru will be glad"],
          playful: ["Bet him it stays dry", "Ask if he's ever wrong"],
          bold: ["Race him to Haru", "Say you'll tell Haru yourself"],
          neutral: ["Fall in beside him", "Follow without a word"],
        },
      },
      {
        line: '"Haru always goes off somewhere by himself around this time," he tells you, very seriously. "He calls it Grown-up R&R."',
        approach: "Ask what that means",
        greeting:
          "\"I don't know! He won't tell me. So you keep me company instead. ♪\"",
        responses: {
          kind: ["Keep him company gladly", "Say you'd love to"],
          playful: ["Guess what Haru's up to", "Call this Towa R&R instead"],
          bold: ["Say Haru's missing out", "Claim the evening for you two"],
          neutral: ["Nod, say nothing", "Sit with him quietly"],
        },
      },
    ],
    warm: [
      {
        line: '"You\'re here." He catches your sleeve before you\'ve stopped walking. "Where were you? Come give me a sorry cuddle."',
        approach: "Let him fall into step",
        greeting: "\"Dandelion. You're here. That's all that matters.\"",
        responses: {
          kind: ["Fall into step gladly", "Give him the cuddle"],
          playful: ["Ask for the sorry cuddle", "Ask what he's sorry for"],
          bold: ["Take his hand instead", "Say you're not sorry"],
          neutral: ["Walk with him, say nothing", "Keep walking together"],
        },
      },
      {
        line: "He offers the dandelion without a word, and waits to see if you'll take it.",
        approach: "Accept the flower",
        greeting: '"Take it. I picked it for you. Only you."',
        responses: {
          kind: ["Thank him for the dandelion", "Hold it carefully"],
          playful: ["Ask if it's really only you", "Pick one for him back"],
          bold: ["Take it like it's expected", "Ask what it means to him"],
          neutral: ["Take the flower quietly", "Tuck it away safely"],
        },
      },
      {
        line: '"I can\'t see the stars from here..." He tugs your sleeve. "Come on, Dandelion! Let\'s go somewhere higher!"',
        approach: "Step into the light with him",
        greeting: '"Look up! See? Way more of them up here. I told you."',
        responses: {
          kind: ["Go with him gladly", "Say you'd climb anywhere"],
          playful: ["Race him to the top", "Ask if he can see better"],
          bold: ["Lead the way yourself", "Pick the highest spot"],
          neutral: ["Follow, say nothing", "Look up with him"],
        },
      },
      {
        line: "He counts something under his breath. You suspect it's the days since you last came.",
        approach: "Say his name",
        greeting: '"I counted. It was nine days. I counted every one."',
        responses: {
          kind: ["Say you're glad he counted", "Say nine days was too many"],
          playful: ["Try to guess the count", "Ask what else he counts"],
          bold: ["Say of course he counted", "Promise fewer days next time"],
          neutral: ["Don't interrupt the count", "Let the number stand"],
        },
      },
      {
        line: '"That tree on the hill says it\'s been waiting a long time." He tilts his head. "Can you hear it? It\'s crying again."',
        approach: "Listen to the tree",
        greeting: '"You always come back. Say you always will."',
        responses: {
          kind: ["Listen to the tree kindly", "Ask what the tree needs"],
          playful: ["Ask why the tree's crying", "Ask if the tree likes you"],
          bold: ["Say you'll always come back", "Promise it out loud"],
          neutral: ["Listen, say nothing", "Look at the tree, quiet"],
        },
      },
      {
        line: "He tilts his head before you've said a word. \"Your heart's going fast. Did you run here? ...Did you run here for me?\"",
        approach: "Say you walked",
        greeting: "\"Liar. I can hear it from here. Heh heh ♪ It's okay. I like it fast.\"",
        responses: {
          kind: ["Say you ran to see him", "Let him listen"],
          playful: ["Say it's for someone else", "Ask what his sounds like"],
          bold: ["Put his hand over it", "Say he's imagining it"],
          neutral: ["Catch your breath", "Say nothing"],
        },
      },
      {
        line: 'He flops down next to you in the grass. "Tell me a love story. A new one. The old ones end too fast."',
        approach: "Start a love story",
        greeting: '"Ooh. Is there a prince? Is there a monster? ...Can the monster win this time?"',
        responses: {
          kind: ["Let the monster win", "Make it a happy ending"],
          playful: ["Make him the prince", "Give it a silly twist"],
          bold: ["Say the monster is him", "Let the prince win instead"],
          neutral: ["Keep telling it", "Ask how he wants it to end"],
        },
      },
      {
        line: "He and Kaito are practicing a dance in the courtyard, and he spots you mid-spin. \"Dandelion! Watch us! We're almost good!\"",
        approach: "Watch them dance",
        greeting: "\"Kaito keeps counting wrong. ...Dance with us? Then there's three and it looks better.\"",
        responses: {
          kind: ["Clap for both of them", "Say they look great"],
          playful: ["Count wrong on purpose", "Join the back row"],
          bold: ["Take Kaito's spot", "Teach them a new move"],
          neutral: ["Watch from the steps", "Keep time for them"],
        },
      },
      {
        line: "Edward says something to him too softly for you to catch. Towa stops smiling. The wind picks up. Then he sees you, and it drops.",
        approach: "Ask what Edward said",
        greeting: '"Nothing. He likes my other face. I like this one better. ...Do you?"',
        responses: {
          kind: ["Say you like this one", "Say you like all of him"],
          playful: ["Ask to see the other one", "Say Edward has odd taste"],
          bold: ["Tell Edward to back off", "Ask what his other face is"],
          neutral: ["Watch Edward go", "Stay beside him"],
        },
      },
      {
        line: "\"Haru went on rounds without me.\" He's on the steps, chin on his knees, sulking. \"He said it's a grown-up thing. I hate being left out.\"",
        approach: "Sit with him on the steps",
        greeting: "\"You won't leave me out. Right? Say you won't.\"",
        responses: {
          kind: ["Promise you won't", "Say Haru will be back soon"],
          playful: ["Start your own rounds", "Make it a secret club"],
          bold: ["Say Haru needs time alone", "Tell him to go catch Haru"],
          neutral: ["Wait with him", "Say nothing"],
        },
      },
      {
        line: "Someone stops to ask you for directions. Towa watches them the whole time, then relaxes. \"That one's fine. Nice inside.\"",
        approach: "Ask what he heard",
        greeting: "\"Their voice didn't have edges. Mean people have edges. You never do.\"",
        responses: {
          kind: ["Thank him for looking out", "Say he has good ears"],
          playful: ["Ask if you have any edges", "Test him on the next one"],
          bold: ["Say you can tell too", "Ask who has edges"],
          neutral: ["Give the directions", "Watch them go"],
        },
      },
      {
        line: "He's lying flat on the path, looking up. \"The ground's warm. Lie down. You can hear everything from here.\"",
        approach: "Lie down beside him",
        greeting: "\"Shh. That's a moth. That's Haru snoring, all the way over there. ...That's you.\"",
        responses: {
          kind: ["Listen with him", "Ask what else he hears"],
          playful: ["Snore louder than Haru", "Ask what the moth is saying"],
          bold: ["Say he's making it up", "Ask what you sound like"],
          neutral: ["Close your eyes", "Look at the sky"],
        },
      },
      {
        line: "You were talking to someone else. Now he's standing very close, humming, not quite smiling.",
        approach: "Turn to face him",
        greeting: "\"Who was that? ...Are they nicer than me? They aren't. I checked.\"",
        responses: {
          kind: ["Say nobody's nicer than him", "Say it was nothing"],
          playful: ["Ask how he checked", "Say they were very nice"],
          bold: ["Say you can talk to anyone", "Ask why he checked"],
          neutral: ["Tell him who it was", "Let the moment pass"],
        },
      },
      {
        line: "He's weaving flowers into a crown and eating every third one. \"This one's for you. It's got fewer bites than mine.\"",
        approach: "Bend so he can crown you",
        greeting: "\"There. Now you're the flower queen. I'm the flower boss. It's different.\"",
        responses: {
          kind: ["Say you'll keep it on", "Make him one too"],
          playful: ["Eat a flower off it", "Ask about the bite marks"],
          bold: ["Crown him back", "Say queens outrank bosses"],
          neutral: ["Wear it", "Check it in a window"],
        },
      },
      {
        line: "He's dozing on a bench, head tipped back. One eye opens as you get close. \"I heard you from the gate. You walk like you're thinking.\"",
        approach: "Ask what you were thinking",
        greeting: "\"I don't know! You tell me. ...It sounded like a nice thought. Was I in it?\"",
        responses: {
          kind: ["Say he was in it", "Share the thought"],
          playful: ["Say it was about lunch", "Make him guess"],
          bold: ["Say it's private", "Ask what he was dreaming"],
          neutral: ["Sit on the bench", "Let him doze"],
        },
      },
      {
        line: "It's raining. He's standing out in it, face up, soaked, delighted. \"Come here! It tastes like the sky!\"",
        approach: "Step into the rain",
        greeting: "\"See? See? ...You're shivering. Okay. Under the tree. But you have to stay close.\"",
        responses: {
          kind: ["Say you don't mind the cold", "Pull him under the tree"],
          playful: ["Stick your tongue out too", "Splash in a puddle"],
          bold: ["Stay out in it longer", "Say it tastes like mud"],
          neutral: ["Stand under the tree", "Hold out your hand"],
        },
      },
      {
        line: "\"Haru says you're good for me.\" He says it proudly, like he won something. \"I already knew that. I knew first.\"",
        approach: "Ask what else Haru says",
        greeting: "\"That I talk about you too much. That's not a thing. You can't talk about Dandelion too much.\"",
        responses: {
          kind: ["Say you talk about him too", "Say Haru's right"],
          playful: ["Ask for Haru's exact words", "Say it's definitely a thing"],
          bold: ["Say he could talk less", "Tell Haru to mind his business"],
          neutral: ["Smile at that", "Let him keep talking"],
        },
      },
      {
        line: "Zenji is reciting something to the moon. Towa is lying beside him, humming the tune wrong on purpose. He waves you over.",
        approach: "Join them under the moon",
        greeting: "\"Zenji's making it sad again. Help me make it happy. You hum, I'll hum louder.\"",
        responses: {
          kind: ["Hum along with him", "Say Zenji's poem is nice"],
          playful: ["Hum it even more wrong", "Ask for a happy verse"],
          bold: ["Say sad is better", "Ask Zenji to start over"],
          neutral: ["Lie back and listen", "Watch the moon"],
        },
      },
    ],
    spark: [
      {
        line: "He's stopped holding your sleeve. He's holding your hand now.",
        approach: "Take his hand",
        greeting: "\"...Dandelion. Say it's me. Say it's only me.\"",
        responses: {
          kind: "Tell him it's only him",
          playful: "Squeeze his hand playfully",
          bold: "Say it's only him",
          neutral: "Say nothing at all",
        },
      },
      {
        line: "He rests his forehead against yours and breathes out, slowly, like relief.",
        approach: "Let him closer",
        greeting: '"I dream about this. Being this close. It\'s better awake."',
        responses: {
          kind: "Let him stay close",
          playful: "Tease him for the sigh",
          bold: "Close the last of it",
          neutral: "Breathe with him, say nothing",
        },
      },
      {
        line: '"Come here. Closer. ...There. Now stay like this. One minute. Just one."',
        approach: "Stay just like this",
        greeting:
          '"Don\'t talk. I just want to be near you for a minute. One minute."',
        responses: {
          kind: "Stay as long as he needs",
          playful: "Hum it back against him",
          bold: "Don't let him step back",
          neutral: "Let the minute pass",
        },
      },
      {
        line: "He tucks the dandelion behind your ear and lets his fingers linger.",
        approach: "Don't move",
        greeting: '"You smell like the outside. I want to keep it."',
        responses: {
          kind: "Let his hand linger",
          playful: "Steal the dandelion",
          bold: "Take his hand and hold it",
          neutral: "Stay still, let it happen",
        },
      },
      {
        line: '"Tell me a love story," he says, settling against you. "A long one. I want it to last."',
        approach: "Tell him a story",
        greeting: '"Stay. Just here. Just like this. Please."',
        responses: {
          kind: "Tell him a gentle story",
          playful: "Make him stop mid-note",
          bold: "Make the story about him",
          neutral: "Stay still and quiet",
        },
      },
    ],
    close: [
      {
        line: '"I\'ve been waiting every moment since you left," he says, drawing impossibly close. "Don\'t ever leave again. Please."',
        approach: "Promise you'll stay",
        greeting: "\"You're mine. Only mine. Promise me you'll never leave.\"",
        responses: {
          kind: "Accept his possessiveness",
          playful: "Tease him for the drama",
          bold: "Tell him you're not leaving",
          neutral: "Be his constant",
        },
      },
      {
        line: "He takes hold of your sleeve and does not let go for the rest of the conversation.",
        approach: "Let him take your sleeve",
        greeting: "\"Warm. You're warm. Don't go anywhere yet.\"",
        responses: {
          kind: "Let him hold on",
          playful: "Give him your full attention",
          bold: "Take his hand instead",
          neutral: "Let him hold on, say nothing",
        },
      },
      {
        line: '"You came back," he breathes, as though it had genuinely been in doubt.',
        approach: "Tell him you came back",
        greeting: "\"I'd wait forever. I'd rather not have to.\"",
        responses: {
          kind: "Promise you'll come back",
          playful: "Play the counting game back",
          bold: "Own him completely",
          neutral: "Let the relief settle quietly",
        },
      },
      {
        line: "He's tucked a fresh dandelion somewhere on you before you noticed him move.",
        approach: "Go to him",
        greeting:
          "\"If you disappear, I'll find you. That's not a threat, Dandelion.\"",
        responses: {
          kind: "Thank him for the flower",
          playful: "Hide, and let him find you",
          bold: "Take his hand first",
          neutral: "Let him tuck it, say nothing",
        },
      },
      {
        line: '"When you meet your soulmate, it feels like getting struck by lightning," he says. "Have you felt it, Dandelion?"',
        approach: "Say you've felt it",
        greeting: '"Everything is quiet when you\'re here. Everything."',
        responses: {
          kind: "Say you might have",
          playful: "Tease the lightning metaphor",
          bold: "Say yes, and mean it",
          neutral: "Stay in the quiet with him",
        },
      },
    ],
    bound: [
      {
        line: "He sleeps with a fistful of your shirt and breathes like someone finally safe.",
        approach: "Let him hold on",
        greeting: '"I love you. I loved you before I knew the word for it."',
        responses: {
          kind: "Tell him he's safe",
          playful: "Hum until it gets light",
          bold: "Hold him just as tight",
          neutral: "Let him sleep",
        },
      },
      {
        line: '"Mine," he murmurs into your neck, over and over, like a lullaby he wrote himself.',
        approach: "Say it's true",
        greeting: '"Dandelion. My Dandelion. Say it\'s true."',
        responses: {
          kind: "Say it's true",
          playful: "Say it back like a lullaby",
          bold: "Say you're his",
          neutral: "Stay exactly there",
        },
      },
      {
        line: "He's tucked dandelions into every pocket you own. You stopped taking them out.",
        approach: "Stay forever",
        greeting: '"Closer. Closer. There. Now stay exactly there forever."',
        responses: {
          kind: "Let him keep tucking them in",
          playful: "Make him chase you",
          bold: "Promise him forever",
          neutral: "Say nothing at all",
        },
      },
      {
        line: '"You\'re tired?" He smiles into your hair. "You\'re so weak. ...It\'s cute."',
        approach: "Let him tease you",
        greeting:
          '"Everything is quiet with you. Everything. I didn\'t know it could be."',
        responses: {
          kind: "Lean into him, yawning",
          playful: "Hide the dandelions",
          bold: "Say he's the weak one",
          neutral: "Let the teasing pass",
        },
      },
      {
        line: "He kisses you slowly, endlessly, as though he's making up for every hour apart.",
        approach: "Don't leave",
        greeting: '"Don\'t leave. Not tonight. Not any night. Please."',
        responses: {
          kind: "Let him hold your shirt",
          playful: "Ask how long he's owed",
          bold: "Pull him closer still",
          neutral: "Let it happen, unhurried",
        },
      },
    ],
  },
  // Every daytime line is a full beat — { line, approach, greeting, responses } —
  // the same shape as `dialogue`, so the wordless daytime /roam button, payoff
  // caption, and response labels all answer the hum the line just set. The
  // separate `daytimeApproach` pool this replaced was index-aligned with these
  // lines; its labels now live on the beat they belong to, and it's gone.
  daytimeDialogue: {
    new: [
      {
        line: "~ ~ ~!",
        approach: "Follow the humming",
        greeting: "~ ~ ~ ♪ (he stops, and turns to look at you)",
        responses: {
          kind: ["Keep listening", "Smile when he turns"],
          playful: ["Hum a wrong note on purpose", "Tiptoe after the tune"],
          bold: ["Walk right up to him", "Wave until he looks"],
          neutral: ["Follow along at a distance", "Stop when he stops"],
        },
      },
      {
        line: "~ ~ ~? . . . ~ ~ ~ .",
        approach: "Hum back",
        greeting: "~ ~ ~ . . . ♪ (he tilts his head, pleased)",
        responses: {
          kind: ["Smile back at him", "Tilt your head too"],
          playful: ["Tilt your head the other way", "Hum him a new question"],
          bold: ["Step closer, pleased too", "Hum the next line yourself"],
          neutral: ["Hold still, say nothing", "Nod along instead"],
        },
      },
      {
        line: "He hums a few notes at you, and waits, expectantly.",
        approach: "Listen closely",
        greeting: "~ ~ ~ ♪ (he hums the same notes again, slower)",
        responses: {
          kind: ["Wait as long as he needs", "Nod so he keeps going"],
          playful: ["Guess the song out loud", "Clap along off the beat"],
          bold: ["Step in close to listen", "Hum the next note for him"],
          neutral: ["Keep listening", "Wait, say nothing"],
        },
      },
      {
        line: "~ ~ ~ ♪",
        approach: "Answer without words",
        greeting: "~ ~ ~ ♫ (he lights up like you said something)",
        responses: {
          kind: ["Smile and nod at him", "Give him a small wave"],
          playful: ["Answer with a silly noise", "Whistle back at him"],
          bold: ["Point at him, then yourself", "Hold out your hand to him"],
          neutral: ["Nod once", "Hold his gaze a moment"],
        },
      },
    ],
    known: [
      {
        line: "~ ~ ~ . . . ~ ~ ~?",
        approach: "Wait for the second note",
        greeting: "~ ~ ~ ♪ (he finishes the phrase, satisfied)",
        responses: {
          kind: ["Hold still for him", "Nod him on"],
          playful: ["Hum the phrase back wrong", "Hum a different ending"],
          bold: ["Ask him to hum it again", "Hum the whole phrase back"],
          neutral: ["Let the phrase settle", "Listen, say nothing"],
        },
      },
      {
        line: "He hums two notes, stops, and waits to see whether you stay.",
        approach: "Hum back",
        greeting: "~ ~ ~ ♪ (he hums the third note, decided you're staying)",
        responses: {
          kind: ["Stay right where you are", "Nod that you're staying"],
          playful: ["Pretend to leave, then stay", "Hum the third note first"],
          bold: ["Sit down next to him", "Take his sleeve and stay"],
          neutral: ["Stay put", "Wait with him quietly"],
        },
      },
      {
        line: "~ ~ ~ ♪ (he holds out a dandelion)",
        approach: "Take what he's holding",
        greeting: "~ ~ ~ ♫ (he presses the stem into your palm)",
        responses: {
          kind: ["Accept it carefully", "Thank him with a smile"],
          playful: ["Sniff it like it's fancy", "Tuck it behind your ear"],
          bold: ["Take it, and his hand too", "Pick one back for him"],
          neutral: ["Take it without a word", "Hold it, say nothing"],
        },
      },
      {
        line: "~ ~ ~! . . . ~ ~ ~",
        approach: "Stay for the tune",
        greeting: "~ ~ ~ ♫ (he sways a little, and keeps going)",
        responses: {
          kind: ["Sway along with him", "Stay until the last note"],
          playful: ["Conduct him with a finger", "Tap out the rhythm"],
          bold: ["Sit down in front of him", "Hum along, loudly"],
          neutral: ["Let the tune run", "Listen from where you are"],
        },
      },
    ],
    warm: [
      {
        line: "~ ~ ~! ♫",
        approach: "Hum the tune with him",
        greeting: "~ ~ ~ ♫ (he bounces on his tip toes as you join in)",
        responses: {
          kind: "Hum in harmony with him",
          playful: "Add a little dance",
          bold: "Take the melody from him",
          neutral: "Hum along, quietly",
        },
      },
      {
        line: "~ ~ ~ ♪ ~ ~ ~ ♪",
        approach: "Follow the melody",
        greeting: "~ ~ ~ ♪ (he glances back to check you're still there)",
        responses: {
          kind: "Stay right behind him",
          playful: "Zigzag behind him",
          bold: "Catch up and walk beside him",
          neutral: "Follow him at his pace",
        },
      },
      {
        line: "The humming picks up the moment he sees you. It's cheerful. It's for you.",
        approach: "Let him lead",
        greeting: "~ ~ ~ ♫ (he catches your sleeve, and hums it right at you)",
        responses: {
          kind: "Tell him it's lovely",
          playful: "Take a bow",
          bold: "Ask him to hum it again",
          neutral: "Let him hum it through",
        },
      },
      {
        line: "~ ~ ~! . . .~ ~ ~ ♫",
        approach: "Answer in his language",
        greeting: "~ ~ ~ ♪ (he grins, delighted you answered)",
        responses: {
          kind: "Hum him a gentle answer",
          playful: "Answer in a silly voice",
          bold: "Hum the whole thing back",
          neutral: "Answer with one note",
        },
      },
    ],
    spark: [
      {
        line: "~ ~ ~ ♪ (he hums it against your shoulder)",
        approach: "Let him hum it close",
        greeting: "~ ~ ~ ♪ (his forehead settles against your shoulder)",
        responses: {
          kind: "Lean into the sound",
          playful: "Hold still, it tickles",
          bold: "Put a hand on his back",
          neutral: "Let him hum",
        },
      },
      {
        line: "He hums low, close to your ear, and doesn't step back.",
        approach: "Don't step back",
        greeting: "~ ~ ~ . . . ♪ (he hums it again, lower)",
        responses: {
          kind: "Stay right where you are",
          playful: "Whisper a note back",
          bold: "Lean in toward him",
          neutral: "Stay still, keep listening",
        },
      },
      {
        line: "~ ~ ~ . . . ~ ~ ~ ♫ (softer than usual, and much nearer)",
        approach: "Hold the note with him",
        greeting: "~ ~ ~ ♫ (he ends on your note, and grins)",
        responses: {
          kind: "Match his softer volume",
          playful: "Hit a note way too high",
          bold: "Take the lead in the tune",
          neutral: "Hold the note, no more",
        },
      },
      {
        line: "~ ~ ~ ♪ (he stops mid-note when you look at him)",
        approach: "Stay through the tune",
        greeting: "~ ~ ~ . . . ♪ (he starts over, without looking away)",
        responses: {
          kind: "Smile so he keeps going",
          playful: "Look away, then look back",
          bold: "Hold his gaze and wait",
          neutral: "Keep looking at him",
        },
      },
    ],
    close: [
      {
        line: "~ ~ ~! ~ ~ ~! ♫ ♫",
        approach: "Finish the melody",
        greeting: "~ ~ ~ ♫ (he holds the last note out for you)",
        responses: {
          kind: "Hum the last note back",
          playful: "Finish it with a flourish",
          bold: "Sing the ending loudly",
          neutral: "Finish it and stop",
        },
      },
      {
        line: "~ ~ ~ ♪ ~ ~ ~ ♫ ~ ~ ~ ♪",
        approach: "Answer the way only you can",
        greeting: "~ ~ ~ ♪ (he beams, and hums it all again for you)",
        responses: {
          kind: "Answer him tenderly",
          playful: "Answer with a little wiggle",
          bold: "Answer by pulling him close",
          neutral: "Answer in your own way",
        },
      },
      {
        line: "He hums the same three notes over and over. You've come to know that one.",
        approach: "Hum his three notes back",
        greeting: "~ ~ ~ ♫ (he hums it once more, and watches you know it)",
        responses: {
          kind: "Hum it back, just for him",
          playful: "Hum it wrong to tease him",
          bold: "Hum it and hold his eyes",
          neutral: "Hum it once, softly",
        },
      },
      {
        line: "~ ~ ~ ♫ (he taps your sleeve, twice, and hums it again)",
        approach: "Take his hand and listen",
        greeting: "~ ~ ~ ♪ (he laces his fingers through yours, still humming)",
        responses: {
          kind: "Squeeze his hand",
          playful: "Tap his sleeve back twice",
          bold: "Pull him a little closer",
          neutral: "Listen without a word",
        },
      },
    ],
    bound: [
      {
        line: "~ ~ ~ ♪ (hummed into your hair, half asleep)",
        approach: "Let him hum you awake",
        greeting: "~ ~ ~ . . . ♪ (he trails off, then keeps humming anyway)",
        responses: {
          kind: "Stroke his hair, half awake",
          playful: "Poke him until he hums louder",
          bold: "Pull him in against you",
          neutral: "Lie still and listen",
        },
      },
      {
        line: "He hums against your collarbone until you feel it more than hear it.",
        approach: "Feel the tune",
        greeting: "~ ~ ~ ♫ (the hum settles, and so does he)",
        responses: {
          kind: "Rest your hand on his chest",
          playful: "Hum a different song at him",
          bold: "Kiss the top of his head",
          neutral: "Feel it, and stay still",
        },
      },
      {
        line: "~ ~ ~ ♫ . . . ~ ~ ~ ♪ (the same three notes, over and over, just for you)",
        approach: "Hum it back to him",
        greeting: "~ ~ ~ ♪ (he lifts his head, hoping you'll join)",
        responses: {
          kind: "Hum it back, soft and slow",
          playful: "Hum it back too fast",
          bold: "Hum it right against his ear",
          neutral: "Hum it back, once",
        },
      },
      {
        line: "He hums, stops to kiss your shoulder, and picks the tune back up.",
        approach: "Stay in the melody",
        greeting: "~ ~ ~ ♫ (he lifts his head, looking pleased with himself)",
        responses: {
          kind: "Tell him it's a lovely tune",
          playful: "Steal a kiss between notes",
          bold: "Kiss him back, slowly",
          neutral: "Wait for the tune to resume",
        },
      },
    ],
  },
  // When the old per-tier `responses` pool was folded onto the beats above,
  // two labels had no genuine beat match ("Hum the tune back" from
  // playful.new; "Let him count in peace" from neutral.close) and were dropped
  // rather than force-placed. "Tuck it behind your ear" later found a home on
  // the daytime dandelion beat.
  // The /call reveal lines for this character, keyed by the register in
  // WINNER_LINE_BUCKETS (constants/publicEncounters.js). Picked from at random
  // like the dialogue; {user} is the winner's mention and {name} their full
  // name, and the embed's winner line is the only place the reveal names
  // either of them. A register left out here falls back to the generic
  // WINNER_LINES pool.
  winnerLines: {
    new: [
      {
        line: "**{name}** stops humming. His eyes land on {user} and stay there, unblinking.",
        responses: {
          kind: "Wave hello to him",
          playful: "Try not to blink first",
          bold: "Ask what he's looking at",
        },
      },
      {
        line: '"...Dandelion?" **{name}** tries the word out on {user} for the first time.',
        responses: {
          kind: "Answer to Dandelion",
          playful: "Ask if you smell like one",
          bold: "Tell him your real name",
        },
      },
      {
        line: "{user} says the name, and **{name}** turns a dandelion over and over, watching them.",
        responses: {
          kind: "Ask about the dandelion",
          playful: "Make a wish on it",
          bold: "Ask why he's watching you",
        },
      },
      {
        line: '**{name}** is already watching {user}, humming. He tilts his head. "Found you."',
        responses: {
          kind: "Say you're glad he did",
          playful: "Hum back at him",
          bold: "Ask why he's staring",
        },
      },
    ],
    known: [
      {
        line: '"Ah! Dandelion, I found you!" **{name}** is all smiles, practically bouncing over to {user}.',
        responses: {
          kind: "Say you missed him",
          playful: "Say you were hiding",
          bold: "Say you weren't lost",
        },
      },
      {
        line: "{user} says the name, and **{name}** holds out a clover he's clearly been holding a while.",
        responses: {
          kind: "Take the clover",
          playful: "Count its leaves",
          bold: "Ask how long he held it",
        },
      },
      {
        line: "**{name}** was already watching {user} before they called, humming the same three notes.",
        responses: {
          kind: "Listen to the whole tune",
          playful: "Guess the song",
          bold: "Ask how long he's watched",
        },
      },
    ],
    warm: [
      {
        line: "\"You're here.\" **{name}** catches {user}'s sleeve before they've stopped walking.",
        responses: {
          kind: "Let him hold on",
          playful: "Tug your sleeve back",
          bold: "Ask him to let go",
        },
      },
      {
        line: "{user} calls out, and **{name}** holds out a dandelion without a word.",
        responses: {
          kind: "Take the dandelion",
          playful: "Tuck it behind your ear",
          bold: "Ask what it's for",
        },
      },
      {
        line: '"I counted the days." **{name}** tells {user} the exact number.',
        responses: {
          kind: "Say you counted too",
          playful: "Ask him to count again",
          bold: "Say that's a lot of days",
        },
      },
    ],
    spark: [
      {
        line: "**{name}** starts humming again the moment {user} says his name.",
        responses: {
          kind: "Listen to him hum",
          playful: "Hum the next part",
          bold: "Ask what he's humming",
        },
      },
      {
        line: '"Come give me a sorry cuddle," **{name}** says to {user}, who hadn\'t done anything wrong.',
        responses: {
          kind: "Give him the cuddle",
          playful: "Ask what you're sorry for",
          bold: "Say you did nothing wrong",
        },
      },
      {
        line: "{user} got there first, and **{name}** looks at everyone else like they lost.",
        responses: {
          kind: "Say you came for him",
          playful: "Take a victory lap",
          bold: "Ask what he thinks he won",
        },
      },
    ],
    close: [
      {
        line: "\"Where are you going, Dandelion? Take me with you!\" **{name}** has {user}'s sleeve and isn't giving it back.",
        responses: {
          kind: "Take him with you",
          playful: "Ask where he wants to go",
          bold: "Say you're going alone",
        },
      },
      {
        line: "**{name}** had been watching the dark. It stopped mattering when {user} called.",
        responses: {
          kind: "Stay with him",
          playful: "Ask what's in the dark",
          bold: "Ask what he was watching",
        },
      },
      {
        line: "{user} calls, and **{name}** tucks another dandelion into their pocket. There are several now.",
        responses: {
          kind: "Keep every one",
          playful: "Count the dandelions",
          bold: "Ask how many he'll add",
        },
      },
    ],
    bound: [
      {
        line: '"Do you like me, Dandelion? Because I love you!" **{name}** hums it into {user}\'s shoulder.',
        responses: {
          kind: "Say you love him too",
          playful: "Ask how much",
          bold: "Ask what love means",
        },
      },
      {
        line: "**{name}** reaches {user} and tips his head, listening to their heartbeat like it's his favorite song.",
        responses: {
          kind: "Hold still for him",
          playful: "Ask how it sounds",
          bold: "Ask what he hears",
        },
      },
      {
        line: "{user} says the name, and **{name}** decides never to let them out of sight again.",
        responses: {
          kind: "Say you'll stay close",
          playful: "Say good luck with that",
          bold: "Say you need space too",
        },
      },
    ],
  },
  // The /call reveal lines for a daytime spawn. Towa can't speak until
  // evening, so these swap in for `winnerLines` whenever the encounter was
  // posted by day (pickWinnerLine's `daytime`). Same registers and
  // placeholders; not one word out of him, only humming and what he does.
  daytimeWinnerLines: {
    new: [
      {
        line: "{user} calls his name, and **{name}** stops humming, turns, and tilts his head at them. ...?",
        responses: {
          kind: "Say hello to him",
          playful: "Tilt your head back",
          bold: "Ask what the look means",
        },
      },
      {
        line: "**{name}** answers {user} with three bright notes and a wave. ~ ~ ~ ♪",
        responses: {
          kind: "Wave back at him",
          playful: "Hum three notes back",
          bold: "Ask what the notes mean",
        },
      },
      {
        line: "{user} calls out, and **{name}** looks them over, head tilted, and then beams. ~ ~ ~!",
        responses: {
          kind: "Beam back at him",
          playful: "Strike a pose for him",
          bold: "Ask what he's sizing up",
        },
      },
    ],
    known: [
      {
        line: "{user} calls, and **{name}** hums two notes, then waits to see whether they'll stay. ~ ~ ~ ♪",
        responses: {
          kind: "Stay right where you are",
          playful: "Hum the third note",
          bold: "Say you can't stay long",
        },
      },
      {
        line: "**{name}** comes straight over to {user} and hums the rest of a phrase he'd started. ~ ~ ~ ♫",
        responses: {
          kind: "Listen until it ends",
          playful: "Hum along off-key",
          bold: "Ask what song it is",
        },
      },
      {
        line: "{user} calls out, and **{name}** presses a dandelion stem into their palm. ~ ~ ~ ♪",
        responses: {
          kind: "Close your hand around it",
          playful: "Blow the seeds at him",
          bold: "Ask why dandelions",
        },
      },
    ],
    warm: [
      {
        line: "**{name}** starts humming the moment {user} calls, and catches their sleeve. ~ ~ ~ ♫",
        responses: {
          kind: "Let him keep your sleeve",
          playful: "Hum with him",
          bold: "Ask where he's taking you",
        },
      },
      {
        line: "{user} calls, and **{name}** holds out a five-leaf clover, bouncing on his toes until they take it.",
        responses: {
          kind: "Take it and say it's lucky",
          playful: "Make him wait a second",
          bold: "Ask where he found five",
        },
      },
      {
        line: "**{name}** comes straight to {user}, humming, like he'd been waiting all day for them to call.",
        responses: {
          kind: "Say you're here now",
          playful: "Ask if he waited all day",
          bold: "Ask why he waited",
        },
      },
    ],
    spark: [
      {
        line: "{user} calls, and **{name}** hums the same three notes back at them, over and over.",
        responses: {
          kind: "Hum them back to him",
          playful: "Add a fourth note",
          bold: "Ask for a different tune",
        },
      },
      {
        line: "{user} got there first, and **{name}** looks at everyone else like they lost. ~ ~ ~ ♪",
        responses: {
          kind: "Smile at him",
          playful: "Take a bow with him",
          bold: "Ask what he won",
        },
      },
      {
        line: "**{name}** tugs {user}'s sleeve toward somewhere quieter, humming. Whatever he wants to say will have to wait until dark.",
        responses: {
          kind: "Go where he leads",
          playful: "Ask him to mime it",
          bold: "Say you'll wait for dark",
        },
      },
    ],
    close: [
      {
        line: "**{name}** has {user}'s sleeve before they've finished calling, and isn't giving it back. ~ ~ ~?",
        responses: {
          kind: "Let him keep it",
          playful: "Ask if it's his sleeve now",
          bold: "Tug your sleeve free",
        },
      },
      {
        line: "{user} calls, and **{name}** hums a tune only they know by now, and waits for them to finish it.",
        responses: {
          kind: "Finish the tune",
          playful: "Finish it wrong on purpose",
          bold: "Make him finish it",
        },
      },
      {
        line: "**{name}** reaches {user} and hums low, his eyes going thin at everyone still watching.",
        responses: {
          kind: "Tell him it's okay",
          playful: "Glare at them with him",
          bold: "Tell him to stop glaring",
        },
      },
    ],
    bound: [
      {
        line: "**{name}** reaches {user} and tips his head to their chest, listening to their heartbeat like it's his favorite song.",
        responses: {
          kind: "Let him listen",
          playful: "Hum along to the beat",
          bold: "Ask if it's fast",
        },
      },
      {
        line: "{user} calls, and **{name}** hums the same three notes into their shoulder, all he can say until dark.",
        responses: {
          kind: "Hum the notes back",
          playful: "Guess what they mean",
          bold: "Say tell you tonight",
        },
      },
      {
        line: "**{name}** pulls {user} close and doesn't let go, humming. The words can keep until night.",
        responses: {
          kind: "Hold on to him too",
          playful: "Hum the harmony",
          bold: "Wriggle free",
        },
      },
    ],
  },
};
