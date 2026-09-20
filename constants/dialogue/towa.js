export default {
  // The level-up DMs (docs/bond-scene-dms.md). Towa barely speaks in daylight,
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
      // His very first message ever is the sticker alone — beat 0 carries no
      // real text, just enough to satisfy the non-empty check, so the sticker
      // is the whole opener rather than sharing the message with a paragraph.
      // This scene is pure texting throughout: no stage directions, no
      // emojis, just what he'd actually type.
      beats: [
        "**{firstName}**: ...",
        "You keep coming back. I notice.\n\nMost things don't. I like that you do.",
        "You've come {timesMet} times. I count the days between. The most was five. Bad five.\n\nCome more, Dandelion. I want to see you everyday!",
      ],
      stickers: { 0: "Hi.png" },
      choice: {
        prompt:
          "Haru's always around doing his rounds. I want it to be you too.",
        options: [
          {
            key: "kind",
            label: "Say you'll come more often",
            style: 3,
            close: "...",
            sticker: "Happy.png",
          },
          {
            key: "playful",
            label: "Ask if he missed you",
            style: 1,
            close:
              "...Yes.\n\nI missed you. I counted the days you didn't come, so I know it's true.",
          },
          {
            key: "bold",
            label: "Ask why it matters so much",
            style: 4,
            close:
              "Because I don't have much.\n\nThis is mine. I'd like to keep it.",
          },
        ],
      },
      keepsake: {
        emoji: "🌼",
        line: "The night he asked you to come by more, and meant it.",
      },
    },

    friend: {
      beats: [
        "**{firstName}**: Ren says asking people why they're nice to me makes them go away.\n\nI'm asking anyway. It's night 🌙 I'm allowed things at night.",
        "You've got {favResponse} for me every time. Even when I say something wrong, and I do that a lot. I hear it a second too late, when it's already out.\n\nEveryone's heart goes fast after. Just a little. They don't know it does. I can hear it from across the park 🌷\n\nYours doesn't. Not once. I've been listening.",
      ],
      choice: {
        prompt: "So why don't you? Ren says don't ask. I'm asking.",
        options: [
          {
            key: "kind",
            label: "Say nothing he says is wrong",
            style: 3,
            close:
              "That's not true. I said a really bad one to Haru in March.\n\nBut keep saying it. I'd like you to. I'll pretend it's true when it's dark 🌙",
          },
          {
            key: "playful",
            label: "Say you've stepped closer",
            style: 1,
            close:
              "...Closer?\n\n*The humming stops completely, which is more alarming than it starting.*\n\nDo it again. The closer thing. Do it tomorrow where I can see it.",
          },
          {
            key: "bold",
            label: "Tell him to stop listening",
            style: 4,
            close:
              "No.\n\nHaru listens to the park. I listen to you. That's fair.\n\n...I'll hum, so you always know where I am 🎶",
          },
        ],
      },
      keepsake: {
        emoji: "🌷",
        line: "The heartbeat that stayed steady when he said the wrong thing.",
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
        "I'm not going to do anything. I want you to know that.\n\nBut I sat with it all afternoon. Ren asked what was wrong and I said nothing. First time I've ever lied to him.",
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
        line: "He's been watching the sky. His eyes drop to you the moment you arrive and stay there, unblinking.",
        approach: "Meet his stare",
        greeting: '"...Stay a little longer. Just a little."',
        responses: {
          kind: ["Meet him at his pace", "Say you'll stay a while"],
          playful: ["Make him smile", "Blink at him slowly"],
          bold: ["Stare right back at him", "Sit down right beside him"],
          neutral: ["Stand still and let him look", "Look up at the sky too"],
        },
      },
      {
        line: "He's been standing out here long enough for the dark to have settled around him. He doesn't seem to mind it.",
        approach: "Go up to him",
        greeting: '"You smell like outside. ...I like it."',
        responses: {
          kind: ["Speak softly to him", "Ask if he's cold"],
          playful: ["Ask what he's doing out here", "Sniff your own sleeve"],
          bold: ["Step closer without asking", "Ask what outside smells like"],
          neutral: ["Wait him out", "Stand in the dark with him"],
        },
      },
      {
        line: "A dandelion turns over and over between his fingers. He hasn't looked away from you once.",
        approach: "Hold his gaze",
        greeting: "\"Don't move yet. I'm looking.\"",
        responses: {
          kind: ["Take the flower gently", "Hold still for him"],
          playful: ["Ask what he's thinking", "Wiggle, just a little"],
          bold: ["Take the dandelion from him", "Look right back at him"],
          neutral: ["Observe him carefully", "Stay still, say nothing"],
        },
      },
      {
        line: '"...Hmphm." He\'s been waiting, and he hates waiting. "Are you done yet? Come play."',
        approach: "Agree to play",
        greeting: "\"Finally! Okay, you're it. I'll give you a head start. ...A small one.\"",
        responses: {
          kind: ["Agree gently to play", "Give him a big head start"],
          playful: ["Make him wait a little longer", "Tag him right away"],
          bold: ["Ask what he wants", "Say you'll catch him easily"],
          neutral: ["Shrug, agree quietly", "Start counting, say nothing"],
        },
      },
      {
        line: "You feel watched before you see him. By then he's already much closer.",
        approach: "Let him close the distance",
        greeting: '"...Dandelion?"',
        responses: {
          kind: ["Let him come closer gently", "Answer to the name softly"],
          playful: ["Turn around and surprise him", "Ask who Dandelion is"],
          bold: ["Close the distance yourself", "Say hello first"],
          neutral: ["Stay still, let him arrive", "Wait to see what he does"],
        },
      },
    ],
    known: [
      {
        line: "He's already leaning into you when you sit down, warm and pleased, humming the same three notes over and over.",
        approach: "Let him lean on you",
        greeting: '"...Stay a little longer. I\'m not ready for you to go yet."',
        responses: {
          kind: ["Let him lean, gladly", "Hum along with him softly"],
          playful: ["Guess the three notes", "Hum something different back"],
          bold: ["Lean into him first", "Say you like the humming"],
          neutral: ["Let him lean, say nothing", "Sit still beside him"],
        },
      },
      {
        line: '"Haru\'s off patrolling again." He says it flatly. "I don\'t get it. They\'re all going to die someday anyway."',
        approach: "Let the comment go",
        greeting: '"...You came back. I thought you might not."',
        responses: {
          kind: ["Say that's not true, gently", "Let the comment go kindly"],
          playful: ["Tease him for being morbid", "Ask if he includes himself"],
          bold: ["Push back on the comment", "Call the comment bleak"],
          neutral: ["Let it go unremarked", "Say nothing about it"],
        },
      },
      {
        line: "There's a clover in his hand already. He's been holding it a while.",
        approach: "Take it from him",
        greeting: '"I picked this for you. It\'s a clover! Look look, it has five leaves!"',
        responses: {
          kind: ["Take it gently, thank him", "Accept the clover warmly"],
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
          kind: ["Eat it gently from his hand", "Thank him for sharing"],
          playful: ["Feed him one back", "Ask if it tastes different"],
          bold: ["Take the whole flower instead", "Eat it without hesitation"],
          neutral: ["Eat it, say nothing", "Take the petal quietly"],
        },
      },
      {
        line: '"Haru takes care of everyone here. I don\'t." He looks right at you. "I just take care of you."',
        approach: "Ask why that is",
        greeting: '"Sit here. Not there. Here, where I can watch you."',
        responses: {
          kind: ["Say that means a lot", "Accept the care gladly"],
          playful: ["Ask if that's a compliment", "Demand equal treatment"],
          bold: ["Say of course he does", "Ask why only you"],
          neutral: ["Shrug, say nothing", "Let it go unremarked"],
        },
      },
      {
        line: '"Dandelion," he says, testing whether you\'ll answer to it yet. You do.',
        approach: "Answer to Dandelion",
        greeting: '"...Dandelion! You answered. So that\'s your name now."',
        responses: {
          kind: ["Answer to it warmly", "Say the name suits you"],
          playful: ["Ask when he decided that", "Give him a nickname back"],
          bold: ["Claim the name outright", "Say you like it, plainly"],
          neutral: ["Answer without comment", "Let the name stand"],
        },
      },
      {
        line: "He's plucked petals off a flower nearby, methodically, and seems to be counting something with each one.",
        approach: "Ask what he's counting",
        greeting:
          '"...Loves me. Loves me not. Loves me. ...It\'s a love story. Tell me one after."',
        responses: {
          kind: ["Ask gently what he's counting", "Let him keep counting"],
          playful: ["Guess the number", "Count along with him"],
          bold: ["Demand to know the count", "Take the flower from him"],
          neutral: ["Let him count in peace", "Say nothing, watch him count"],
        },
      },
      {
        line: '"You cut your hair," he says, before you\'ve even sat down. "I notice everything about you."',
        approach: "Ask what else he's noticed",
        greeting:
          '"The birds go quiet when you walk by. Your left shoe squeaks when it\'s damp. Ask me more."',
        responses: {
          kind: ["Say he notices a lot", "Thank him for noticing"],
          playful: ["Ask what else he's tracking", "Test what he's noticed"],
          bold: ["Say of course he notices", "Ask why he watches so closely"],
          neutral: ["Shrug, say nothing", "Take the comment plainly"],
        },
      },
      {
        line: "He's spinning slowly in circles to see how dizzy he can get, and grins wide when he wobbles straight into you.",
        approach: "Steady him",
        greeting: '"Heh heh ♪ Caught you. Or you caught me. Again!"',
        responses: {
          kind: ["Steady him gently", "Catch him kindly"],
          playful: ["Spin him back the other way", "Tease him for the dizziness"],
          bold: ["Catch him and hold on", "Say he did that on purpose"],
          neutral: ["Steady him, say nothing", "Catch him without comment"],
        },
      },
      {
        line: '"That one," he says, pointing at a cloud, "looks like you." He seems very pleased with this.',
        approach: "Ask what shape you are",
        greeting: '"Look look! It\'s you. See? Fluffy on top."',
        responses: {
          kind: ["Say the cloud got it right", "Take the compliment kindly"],
          playful: ["Pick a shape for him too", "Argue the cloud is wrong"],
          bold: ["Agree, and say why", "Claim the shape, pleased"],
          neutral: ["Look at the cloud, say nothing", "Shrug at the cloud"],
        },
      },
      {
        line: "He wraps both arms around you before you've said a word, tight enough that you feel it in your ribs.",
        approach: "Hug him back",
        greeting:
          '"Where were you? I\'ve been waiting all this time. That\'s a sorry cuddle."',
        responses: {
          kind: ["Hug him back gently", "Let the hug happen kindly"],
          playful: ["Hug him back extra tight", "Ask what brought this on"],
          bold: ["Hold on just as tight", "Hug him first next time"],
          neutral: ["Let him hug you, say nothing", "Stand still through the hug"],
        },
      },
      {
        line: "The sky goes a shade grayer the moment someone speaks badly of Haru nearby. He doesn't seem to notice he did that.",
        approach: "Change the subject",
        greeting: '"...Hm? Oh. Nothing. It\'s going to rain, I think."',
        responses: {
          kind: ["Change the subject gently", "Say something kind about Haru"],
          playful: ["Ask why the sky did that", "Tease him about the mood swing"],
          bold: ["Ask him what just happened", "Call out the reaction"],
          neutral: ["Let it go unremarked", "Change the subject quietly"],
        },
      },
      {
        line: "He suddenly goes still, head tilted, listening to something you can't hear at all.",
        approach: "Ask what he hears",
        greeting: '"The tree on the hill. It\'s crying again. Can you hear it?"',
        responses: {
          kind: ["Ask gently what he hears", "Wait quietly with him"],
          playful: ["Guess what he's listening to", "Make a noise to test him"],
          bold: ["Demand to know what he hears", "Ask him to explain, now"],
          neutral: ["Let him listen, say nothing", "Stay quiet while he listens"],
        },
      },
    ],
    warm: [
      {
        line: '"You\'re here." He catches your sleeve before you\'ve stopped walking. "Where were you? Come give me a sorry cuddle."',
        approach: "Let him fall into step",
        greeting: '"Dandelion. You\'re here. That\'s all that matters."',
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
    ],
    spark: [
      {
        line: "He's stopped holding your sleeve. He's holding your hand now.",
        approach: "Take his hand",
        greeting: '"...Dandelion. Say it\'s me. Say it\'s only me."',
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
        greeting: "\"I dream about this. Being this close. It's better awake.\"",
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
        greeting: '"Don\'t talk. I just want to be near you for a minute. One minute."',
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
        greeting: '"If you disappear, I\'ll find you. That\'s not a threat, Dandelion."',
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
        greeting: '"Everything is quiet with you. Everything. I didn\'t know it could be."',
        responses: {
          kind: "Let him tease you gently",
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
  // temperamentDialogue removed: every line was moved onto a dialogue beat's
  // `greeting` — every tier's pool matched onto a beat exactly, nothing left
  // over.
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
          kind: "Listen to him gently",
          playful: "Hum a wrong note on purpose",
          bold: "Walk right up to him",
          neutral: "Follow along at a distance",
        },
      },
      {
        line: "~ ~ ~? . . . ~ ~ ~ .",
        approach: "Hum back",
        greeting: "~ ~ ~ . . . ♪ (he tilts his head, pleased)",
        responses: {
          kind: "Hum it back softly",
          playful: "Hum it back off-key",
          bold: "Hum louder than he does",
          neutral: "Hum it back, nothing more",
        },
      },
      {
        line: "He hums a few notes at you, and waits, expectantly.",
        approach: "Listen closely",
        greeting: "~ ~ ~ ♪ (he hums the same notes again, slower)",
        responses: {
          kind: "Wait as long as he needs",
          playful: "Guess the song out loud",
          bold: "Ask him what it means",
          neutral: "Keep listening",
        },
      },
      {
        line: "~ ~ ~ ♪",
        approach: "Answer without words",
        greeting: "~ ~ ~ ♫ (he lights up like you said something)",
        responses: {
          kind: "Smile and nod at him",
          playful: "Answer with a silly noise",
          bold: "Point at him, then yourself",
          neutral: "Nod once",
        },
      },
    ],
    known: [
      {
        line: "~ ~ ~ . . . ~ ~ ~?",
        approach: "Wait for the second note",
        greeting: "~ ~ ~ ♪ (he finishes the phrase, satisfied)",
        responses: {
          kind: "Hold still for him",
          playful: "Hum the second note early",
          bold: "Ask him to hum it again",
          neutral: "Wait for the rest",
        },
      },
      {
        line: "He hums two notes, stops, and waits to see whether you stay.",
        approach: "Hum back",
        greeting: "~ ~ ~ ♪ (he hums the third note, decided you're staying)",
        responses: {
          kind: "Stay right where you are",
          playful: "Pretend to leave, then stay",
          bold: "Sit down next to him",
          neutral: "Stay put",
        },
      },
      {
        line: "~ ~ ~ ♪ (he holds out a dandelion)",
        approach: "Take what he's holding",
        greeting: "~ ~ ~ ♫ (he presses the stem into your palm)",
        responses: {
          kind: "Accept it carefully",
          playful: "Sniff it like it's fancy",
          bold: "Take it, and his hand too",
          neutral: "Take it without a word",
        },
      },
      {
        line: "~ ~ ~! . . . ~ ~ ~",
        approach: "Stay for the tune",
        greeting: "~ ~ ~ ♫ (he sways a little, and keeps going)",
        responses: {
          kind: "Sway along with him",
          playful: "Conduct him with a finger",
          bold: "Sit down in front of him",
          neutral: "Let the tune run",
        },
      },
    ],
    warm: [
      {
        line: "~ ~ ~! ♫",
        approach: "Hum the tune with him",
        greeting: "~ ~ ~ ♫ (he bounces on his heels as you join in)",
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
          kind: "Finish it gently for him",
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
          kind: "Squeeze his hand gently",
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
  // three labels had no genuine beat match ("Hum the tune back", "Tuck it
  // behind your ear" from playful.new; "Let him count in peace" from
  // neutral.close) and were dropped rather than force-placed.
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
      '"I counted the days." **{name}** tells {user} the exact number.',
    ],
    spark: [
      "**{name}** starts humming again the moment {user} says his name.",
      '"Come give me a sorry cuddle," **{name}** says to {user}, who hadn\'t done anything wrong.',
      "{user} got there first, and **{name}** looks at everyone else like they lost.",
    ],
    close: [
      "\"Where are you going, Dandelion? Take me with you!\" **{name}** has {user}'s sleeve and isn't giving it back.",
      "**{name}** had been watching the dark. It stopped mattering when {user} called.",
      "{user} calls, and **{name}** tucks another dandelion into their pocket. There are several now.",
    ],
    bound: [
      '"Do you like me, Dandelion? Because I love you!" **{name}** hums it into {user}\'s shoulder.',
      "**{name}** reaches {user} and tips his head, listening to their heartbeat like it's his favorite song.",
      "{user} says the name, and **{name}** decides never to let them out of sight again.",
    ],
  },
};
