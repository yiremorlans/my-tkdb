export default {
  // The level-up DMs (docs/bond-scene-dms.md). Elias deflects with courtesy the
  // way other people put up a hand — the formality and self-effacement are the
  // armor, and the arc is him letting the mask slip a little further each
  // level. He answers every question about himself with a question about you,
  // so the intimacy is measured in how often that stops working.
  bondScenes: {
    acquaintance: {
      beats: [
        "**{firstName}**: Good evening. I hope this doesn't startle you, turning up out of nowhere. It's nothing serious, I promise. There's something I've been meaning to say, and the right moment keeps slipping away, so… I suppose I'm making one.",
        "You've passed me on campus {timesMet} times. I've counted, which sounds odd said out loud. Every single time, you've said good evening to the man with the mop. You don't have to, but you do it anyway.\n\nMost people don't, you know. Not out of unkindness. They just don't see the help. And I've always liked going unnoticed, if I'm honest.",
        "There's a second half, and it's the part I nearly left out. You mentioned once you don't care for the east path after dark. Since then I've found reasons for my rounds to pass through there about when you do.\n\nIt isn't much. I only wanted to know you'd gotten where you were going, and I wanted you to hear it from me, not puzzle it out and think I was strange.",
      ],
      choice: {
        prompt: "That's all of it, and a bit more than I meant to say tonight.",
        options: [
          {
            key: "kind",
            label: "Say he's worth knowing",
            style: 3,
            close:
              "*A pause, longer than his replies usually take.*\n\nOh, that's very kind of you. It isn't quite true. But I'd like it if you kept saying so anyway.\n\n*A second, shorter pause.* And I'd like it if you let me keep walking that path, when you do. Only because it isn't any trouble. Good night.",
          },
          {
            key: "playful",
            label: "Ask what took so long",
            style: 1,
            close:
              "Oh, I drafted several versions in my head. Discarded most of them.\n\n…It's been some time since anyone made me smile at my own foolishness. I'll be thinking about that for a while.",
          },
          {
            key: "bold",
            label: "Ask what he used to be",
            style: 4,
            close:
              "*The pause runs longer than the question should need.*\n\nWhat I used to be? I'll leave that to your imagination, for now.\n\nAsk me again sometime, when it's later and I'm tired enough not to mind answering it. Good night.",
          },
        ],
      },
      keepsake: {
        emoji: "🍭",
        line: "A wrapped candy left on the step outside your door.",
      },
    },

    friend: {
      beats: [
        "**{firstName}**: Can I ask you something? You're welcome to tell me it's none of my business.",
        "Every time I turn one of your questions back around, you let me. You don't push, and you don't sulk about it. Then the next time, you come to tell me {favResponse} again, as if nothing happened.\n\nI've been deflecting people, professionally, for a long while now. It works because people tire of it eventually. You don't seem to. I'd really like to know why.",
      ],
      choice: {
        prompt:
          "Please, go ahead. I'll try not to change the subject this time.",
        options: [
          {
            key: "kind",
            label: "Say you're a patient person",
            style: 3,
            close:
              "Oh, that's the trouble with patient people. I can hold a door shut against a push, but I can't do much about someone who just waits outside it.",
          },
          {
            key: "playful",
            label: "Say you enjoy the deflecting",
            style: 1,
            close:
              "Oh, you *enjoy* it? Well, that's a first. Most people find it tiresome.\n\nThen I suppose there's no harm in it. It's become one of the nicer parts of my rounds, if I'm honest. I think I'd miss it if you stopped.",
          },
          {
            key: "bold",
            label: "Ask him why he deflects",
            style: 4,
            close:
              "Oh, turning it around on me.\n\nBecause an honest answer invites a second question, and the second one is usually the one I can't answer well. It's easier to be pleasant than to be known.",
          },
        ],
      },
      keepsake: {
        emoji: "📻",
        line: "The first question he answered without turning it back around.",
      },
    },

    closeFriend: {
      beats: [
        "**{firstName}**: Are you awake? If you don't mind… would you come down to the hall? You don't need to bring anything. It isn't that sort of night.",
        "*There's a record playing, something old and warm, nothing like what Dionysia usually puts on, and the whole hall smells like jambalaya.*\n\n> My mother's recipe. I import half the ingredients from home, and customs and I are on a first-name basis because of the rest. I make it once a year, at two in the morning, when nobody's awake to be polite about it.",
        "> It's my mother's music, and my mother's cooking, and this is the closest I get to New Orleans from here.\n\n*He sets the plate down in front of you and doesn't sit yet.*\n\n> I've done this alone for years. It wasn't a rule, exactly. It simply never occurred to me there was anyone I'd want in the room. Then it occurred to me, and it wouldn't stop occurring to me. So… here we are.",
      ],
      choice: {
        prompt: "…Would you say something? I've made myself nervous.",
        options: [
          {
            key: "kind",
            label: "Ask about his mother",
            style: 3,
            close:
              "*He talks for two hours. No one in this house has ever heard any of it.*\n\n*At the end, quietly, with none of his usual carefulness:*\n\n> I'd like to bring her here one day. I wanted someone to know that. It's the only real plan I have.",
          },
          {
            key: "playful",
            label: "Ask about the customs man",
            style: 1,
            close:
              "> Oh, we're very close now. He knows my name, my face, and my opinion of his paperwork.\n\n> Eat, please, while it's hot. I'll be unbearable if you let it go cold.",
          },
          {
            key: "bold",
            label: "Ask him to dance to it",
            style: 4,
            close:
              "*He looks at you for a long moment over the record player.*\n\n> …I haven't done that in a long time either.\n\n*He does it anyway, slow, unhurried, one hand at your back, the whole thing conducted at perhaps a third of the speed the song is asking for. Neither of you mentions that the record ended some time ago.*",
          },
        ],
      },
      keepsake: {
        emoji: "🎷",
        line: "A record that kept turning long after the song had finished.",
      },
    },

    confidant: {
      beats: [
        "**{firstName}**: You asked me once what I used to be. I told you to ask again when it was later, and I was tired enough.\n\nIt's later. I'm tired enough.",
        "Captain of Dionysia. For a good while. It isn't a secret, exactly. It's simply something people have agreed to be tactful about, which is worse.\n\nI lost it. Not a scandal, nothing you could put in a report. I simply reached a point where I couldn't keep up, and I let it go on long enough that someone had to say so, out loud, in a room with other people in it.",
        "Jo took it over. He does it better than I ever did, and I mean that entirely.\n\nNow I run his errands. Now and then someone calls me Captain by accident, and the whole hall goes quiet for half a second while everyone decides not to look at me.\n\nI've never said any of this aloud before. A year ago I'd have made a joke of it instead.",
      ],
      choice: {
        prompt:
          "Please, don't be gentle about it. Gentle is all I get from the rest of the house…",
        options: [
          {
            key: "kind",
            label: "Say you'd have followed him",
            style: 3,
            close:
              "*There is a very long silence.*\n\nYou wouldn't have wanted to, *he says.* You'd have gotten a man who was already running out.\n\n*Then, quieter:* …Say it again anyway. I find I'd like to hear it a second time, and I'm not proud of that.",
          },
          {
            key: "playful",
            label: "Call him Captain on purpose",
            style: 1,
            close:
              "*The reply takes a while.*\n\nHehe… Bad kid. And I'm very fond of you.\n\n…Do it again sometime, where people can hear. I'd like to see what happens too.",
          },
          {
            key: "bold",
            label: "Ask if he wants it back",
            style: 4,
            close:
              "No.\n\n*Then, after a pause:* That was too quick, wasn't it. Let me try again.\n\nNo. But I would like to be something again, one day. I hadn't let myself want that in about three years, until you started asking me questions.",
          },
        ],
      },
      keepsake: {
        emoji: "🗝️",
        line: "The door he said he'd open some time when it was later.",
      },
    },

    devoted: {
      beats: [
        "**{firstName}**: You're all right. I already know you are, I checked twice. This message is just for my own sake.",
        "There was an incident in the lower hall tonight, and I went at it, and… I was slow. Not disastrously so. Slow. There was a time it would have taken me twenty seconds. Tonight it took four minutes, and I felt every one of them.\n\nThat's the fear I don't say aloud. Not dying. Being the man who used to be able to.",
        "And here is what I actually meant to tell you, plainly, and then I'll go to bed.\n\nI went at it anyway. Didn't weigh it, didn't count the odds, didn't think about my knees. You were on the other side of that hall, and three years of being careful went straight out the window.\n\nI'd been treasuring the quiet. Dreading the day it ended. It seems I'd take it ending over having you on the far side of a bad hall.",
      ],
      choice: {
        prompt: "Tell me something true… It's been a long night.",
        options: [
          {
            key: "kind",
            label: "Tell him he wasn't slow",
            style: 3,
            close:
              "Now you're only being kind to me.\n\n…Be kind to me. Just tonight. I'll be sensible again in the morning, and you can go back to being honest.",
          },
          {
            key: "playful",
            label: "Say four minutes is a brag",
            style: 1,
            close:
              "Four minutes is *showing off.*\n\nI'm going to be repeating that to myself for a week, and I want you to know precisely what you've done.",
          },
          {
            key: "bold",
            label: "Go down to the hall",
            style: 4,
            close:
              "*He's sitting on the bottom step with his hands shaking, which he would never in his life have let anyone see.*\n\n*He doesn't reach for a joke. He simply holds out a hand, and when you take it, he pulls you down onto the step beside him and leans his whole weight into you, and stays there a long while.*\n\n> Don't say anything.\n\n*he says quietly.*\n\n> Just sit here. That's all I want.",
          },
        ],
      },
      keepsake: {
        emoji: "🕰️",
        line: "Four minutes he'll be counting for a long time.",
      },
    },

    soulbound: {
      beats: [
        "**{firstName}**: I'm going to try to say this without any of my usual deflecting, which you'll find is harder than it sounds.",
        "{timesMet} times. Every one of them, you've said good evening to a man with a mop, and never once asked him to be anything grander.\n\nYou have no idea what that is, to someone who used to be grander. Or perhaps you do, and you've simply been kind enough never to say so.",
        "I've spent three years treasuring quiet days and dreading the end of them. That isn't peace. That's only fear with the lights turned low. I've known that for a while, and I've done nothing about it, because doing something about it would mean wanting something, and anyone who wants something can lose it.",
        "So. Here is me, wanting something.\n\nI love you. I have for a long while now, since before that night in the kitchen, if I'm honest, and I've been meaning to be honest about it for months.\n\nI'm not asking you to do anything about it. I'm just done choosing nothing over the risk of losing something. That's the whole of my message, and it took me four cups of coffee to get here.",
      ],
      choice: {
        prompt: "Take your time. I have nothing but.",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close:
              "*The reply is one word:* Kitchen.\n\n*The record is already playing when you arrive, the same one, and he's standing in the middle of the floor with his hands in his pockets, looking younger than he is.*\n\n> Come here.\n\n*he says, quiet and entirely without his usual carefulness. He gets both arms around you and holds on like a man who has been standing very still for a very long time, and has finally been told he can stop.*",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close:
              "Of course. That's the right answer, and I mean that.\n\nIt took me a very long time to work up to one sentence. It would be a poor sort of man who handed it over and started a clock.\n\nThere will be candy on your sill Tuesday, same as always, and I'll still wish you good evening in the west corridor. None of it was ever a down payment on anything. It was only ever me, glad you were there.",
          },
        ],
      },
      keepsake: {
        emoji: "🍬",
        line: "The night he chose wanting something over keeping nothing.",
      },
    },
  },
  dialogue: {
    new: [
      {
        line: "He's winding a string of festival lights around one arm, in no hurry about it. \"Oh, I don't think I've seen you around here before.\"",
        approach: "Play along",
        greeting:
          '"You\'ve arrived at just the right time. Would you mind holding this end for me?"',
        responses: {
          kind: ["Take the end of the lights", "Offer to help untangle them"],
          playful: [
            "Ask if this is how he says hi",
            "Make him say please first",
          ],
          bold: ["Ask why you should help", "Tell him to hold his own end"],
          neutral: ["Hold it without a word", "Take the end and wait"],
        },
      },
      {
        line: 'His careful courtesy arrives a good second before he does. "Oh, are you lost? This part of campus is a little out of the way."',
        approach: "Admit you're lost",
        greeting:
          "\"This academy has a lot of corners like this. If you don't mind, I'll walk you back.\"",
        responses: {
          kind: ["Accept the walk back", "Thank him for the offer"],
          playful: [
            "Ask if he walks everyone back",
            "Say you'd rather stay lost",
          ],
          bold: [
            "Say you can find your own way",
            "Ask what he's doing out here",
          ],
          neutral: ["Follow a step behind him", "Nod and let him lead"],
        },
      },
      {
        line: "A lollipop stick shifts from one corner of his mouth to the other. He's leaning where he shouldn't be, doing nothing with real dedication.",
        approach: "Ask if he could help you",
        greeting:
          '"I was just taking a walk around campus. For my health, of course."',
        responses: {
          kind: ["Notice he looks tired", "Say resting counts too"],
          playful: ["Ask how the walk is going", "Tease him about slacking"],
          bold: ["Point out he isn't walking", "Ask what he's avoiding"],
          neutral: ["Lean on the wall beside him", "Let the excuse slide"],
        },
      },
      {
        line: '"Oh, I just run the odd errand around here," he says, easy as anything. "Anything you need, you only have to ask."',
        approach: "Ask about the odd jobs",
        greeting:
          '"Mostly errands for Jo. Lights today, something else tomorrow. It keeps me out of trouble, mostly."',
        responses: {
          kind: ["Say it's nice he helps Jo", "Offer to help with the lights"],
          playful: ["Ask what kind of trouble", "Ask if you count as trouble"],
          bold: ["Ask if Jo pays him for it", "Ask why he needs keeping busy"],
          neutral: ["Nod, file it away", "Let him get back to it"],
        },
      },
      {
        line: "The smile comes slow and lands just right, warm, unhurried, and a half-second too practiced.",
        approach: "Ask if the smile is real",
        greeting:
          '"Sorry… I\'m a little short on time. Would you mind if I went on ahead?"',
        responses: {
          kind: ["Tell him not to apologize", "Say he can skip the smile"],
          playful: ["Ask to see the real one", "Say you'll wait for the story"],
          bold: ["Ask what he'd have to explain", "Tell him to try explaining"],
          neutral: ["Smile back, say nothing", "Let it rest there"],
        },
      },
      {
        line: '"Sweep\'s already done, don\'t mind me." He\'s leaning on the broom instead of using it. "Old habit. Hard to break."',
        approach: "Ask why he can't put it down",
        greeting:
          '"It used to be my job. It isn\'t anymore, but… a dirty floor still bothers me."',
        responses: {
          kind: ["Ask gently what changed", "Say the floor looks spotless"],
          playful: ["Take the broom from him", "Point out a spot he missed"],
          bold: ["Ask whose job it is now", "Ask why it isn't anymore"],
          neutral: ["Let him talk", "Stand with him a while"],
        },
      },
    ],
    known: [
      {
        line: "The charm's still running, just dialed down to something that costs him less.",
        approach: "See through it anyway",
        greeting:
          "\"Oh, it's you again… I don't mind the interruption, honestly.\"",
        responses: {
          kind: ["Let him have the quiet charm", "Say you don't mind it"],
          playful: [
            "Call out the dialed-down charm",
            "Ask what happened to the rest",
          ],
          bold: [
            "Say you see right through it",
            "Push past the charm entirely",
          ],
          neutral: ["Let it slide", "Say nothing about it"],
        },
      },
      {
        line: 'He hands you a soda he bought "for the dorm" and doesn\'t make anything of it.',
        approach: "Take the soda",
        greeting: '"Twice in one day… I\'d almost call it a habit."',
        responses: {
          kind: ["Thank him for the soda", "Accept it warmly"],
          playful: ["Ask who it's really for", "Call it a habit already"],
          bold: ["Say you came looking for him", "Say he planned this"],
          neutral: ["Take the soda, say nothing", "Drink it without comment"],
        },
      },
      {
        line: "He's holding something wrapped in cloth that's the wrong shape for a parcel. \"Shion asked me to hold onto it. I wouldn't look, if I were you.\"",
        approach: "Don't even ask",
        greeting:
          '"Oh, not even a little curious? …Good. I\'ve been trying very hard not to be."',
        responses: {
          kind: ["Ask if it's bothering him", "Offer to keep him company"],
          playful: [
            "Ask how that's going for him",
            "Admit you're a little curious",
          ],
          bold: ["Tell him to hand it back", "Ask why Shion picked him"],
          neutral: [
            "Keep your eyes off the cloth",
            "Change the subject for him",
          ],
        },
      },
      {
        line: "He skips his usual hedging and just tells you plainly. Progress, apparently.",
        approach: "Take him at his word",
        greeting:
          '"Oh, you took my word for it… That doesn\'t happen to me very often."',
        responses: {
          kind: ["Say you trust him", "Tell him it suits him"],
          playful: ["Ask how often is not often", "Offer to doubt him instead"],
          bold: ["Ask him to keep it up", "Say he should try it more"],
          neutral: ["Nod and let it stand", "Give him a moment"],
        },
      },
      {
        line: "He nods at the step beside him without looking up from whatever he's reading.",
        approach: "Sit with him",
        greeting:
          '"Sit, if you like… I don\'t have anywhere to be. I rarely do, lately."',
        responses: {
          kind: ["Sit down gladly", "Thank him for the space"],
          playful: ["Ask what he's reading", "Sit closer than invited"],
          bold: ["Sit down without asking", "Take the seat like it's yours"],
          neutral: ["Sit quietly beside him", "Take the seat, say nothing"],
        },
      },
      {
        line: '"Oh no, I\'m nothing special," he says, on reflex, before he can stop himself.',
        approach: "Disagree with him",
        greeting:
          '"Oh, well… If you insist. I\'ll try to believe it, at least for today."',
        responses: {
          kind: ["Say today is a good start", "Tell him you'll remind him"],
          playful: ["Ask what happens tomorrow", "Bet he forgets by tonight"],
          bold: ["Say not just for today", "Make him say it himself"],
          neutral: ["Let him have the moment", "Nod and leave it there"],
        },
      },
      {
        line: "He's sweeping a stretch of hallway that was already spotless the last time you passed it.",
        approach: "Ask why he's really here",
        greeting:
          '"You keep turning up in the corners I sweep. I\'ve started clearing them earlier, just in case."',
        responses: {
          kind: ["Ask gently what's wrong", "Offer to walk with him"],
          playful: [
            "Guess why he's really there",
            "Tease him about the excuse",
          ],
          bold: ["Ask him outright why", "Call out the real reason"],
          neutral: ["Let him keep sweeping", "Say nothing, walk on"],
        },
      },
      {
        line: "He offers you the last of his candy without checking what flavor's left.",
        approach: "Take the last piece",
        greeting: "\"I don't mind the company, if you're offering it.\"",
        responses: {
          kind: ["Thank him for the candy", "Stay for the company"],
          playful: [
            "Ask if he checked the flavor",
            "Demand a specific one instead",
          ],
          bold: ["Take it without asking", "Say he should've checked"],
          neutral: ["Take it, say nothing", "Eat it without comment"],
        },
      },
      {
        line: '"I was lost in thought," he admits, like it costs him something to say it plainly.',
        approach: "Ask what he was thinking about",
        greeting:
          "\"Home, mostly. New Orleans… My mother's still there. …Don't mind me.\"",
        responses: {
          kind: ["Ask what he misses most", "Say he can talk about it"],
          playful: ["Ask what sweets he misses", "Tease him for admitting it"],
          bold: ["Ask when he last went home", "Push him to say more"],
          neutral: ["Let him keep the thought", "Don't press for more"],
        },
      },
      {
        line: "He's stopped pretending he wasn't waiting for you to walk by.",
        approach: "Ask how long he's been waiting",
        greeting: '"Careful… I\'m starting to expect you."',
        responses: {
          kind: [
            "Say you're glad to be expected",
            "Admit you look for him too",
          ],
          playful: ["Ask how long he's waited", "Tease him for expecting you"],
          bold: [
            "Say you knew he was waiting",
            "Call out the waiting outright",
          ],
          neutral: ["Let the comment pass", "Say nothing about it"],
        },
      },
      {
        line: '"Leave that to your imagination," he says, softer than usual, like he half wishes you\'d push.',
        approach: "Push a little",
        greeting: '"You can ask… and I\'ll tell you the truth. Mostly."',
        responses: {
          kind: ["Let him keep his secret", "Say he doesn't have to answer"],
          playful: [
            "Push just a little further",
            "Guess at the answer yourself",
          ],
          bold: ["Ask him outright, no games", "Push past the deflection"],
          neutral: ["Let it go unremarked", "Drop the question"],
        },
      },
      {
        line: "He's found a patch of sun by the courtyard wall, in absolutely no hurry to be anywhere in particular.",
        approach: "Say Jo is looking for him",
        greeting: '"Oh, is he? …Then I suppose I\'d better get moving."',
        responses: {
          kind: ["Let him have the sun", "Say Jo can wait"],
          playful: ["Tease him for hiding from Jo", "Threaten to tell on him"],
          bold: ["Tell Jo yourself anyway", "Say he can't hide forever"],
          neutral: ["Say nothing, let him be", "Leave him to his sunspot"],
        },
      },
      {
        line: '"I\'m a bit out of practice for missions," he admits, easy as anything. "I wouldn\'t want to be the one who holds everyone back…"',
        approach: "Tell him you'd have his back",
        greeting:
          '"You have a knack for finding me, don\'t you… Even here, of all places."',
        responses: {
          kind: [
            "Say you'd find him on missions",
            "Say he'd never hold you back",
          ],
          playful: [
            "Ask if he's dodging missions",
            "Bet he's less rusty than that",
          ],
          bold: ["Say he can't hide from you", "Say he'll keep up, period"],
          neutral: ["Let the doubt pass", "Say nothing, stay put"],
        },
      },
    ],
    warm: [
      {
        line: 'The easy smile goes real for a second. "Seeing you makes my day. Plain and simple, no angle on it."',
        approach: "Take the offered hand",
        greeting: '"Well, hello there. Mind if I hold onto this a while?"',
        responses: {
          kind: "Take his hand gladly",
          playful: "Ask what made it real",
          bold: "Say you see it too",
          neutral: "Take the hand, say nothing",
        },
      },
      {
        line: "\"Jo's had me running errands since sunup. Sit with me a spell. I've earned it, and so have you.\"",
        approach: "Sit a while with him",
        greeting:
          '"Ahh, that\'s better. Now tell me one thing that went right for you today."',
        responses: {
          kind: "Sit with him gladly",
          playful: "Ask what Jo has him doing",
          bold: "Tell him to take a real break",
          neutral: "Sit quietly beside him",
        },
      },
      {
        line: '"Shion wants nagashi somen, so I\'m setting up the bamboo. Slow work. Stay a while?"',
        approach: "Watch him set up",
        greeting: '"Sit down. I\'ll behave. Mostly."',
        responses: {
          kind: "Offer to help set up",
          playful: "Promise not to hold him to it",
          bold: "Say he never behaves",
          neutral: "Watch quietly",
        },
      },
      {
        line: "He looks tired tonight, candy set aside for once, and doesn't trouble himself to hide it from you.",
        approach: "Ask how he really is",
        greeting:
          "\"Everyone's in good spirits today. Here's hoping this quiet holds a good long while.\"",
        responses: {
          kind: "Ask gently how he's doing",
          playful: "Tease him about the candy",
          bold: "Say the tired shows",
          neutral: "Let him set it aside quietly",
        },
      },
      {
        line: '"You\'re harder work than most," he says, and sounds glad of it.',
        approach: "Call the charm out",
        greeting: '"Back for more? Keep it up and I\'ll think you like me."',
        responses: {
          kind: "Say you don't mean to be hard",
          playful: "Ask if that's a compliment",
          bold: "Say he likes it, admit it",
          neutral: "Shrug at the charm",
        },
      },
      {
        line: '"Something smells like jambalaya out of the living tent. Jo\'s got dinner tonight. Come eat with us."',
        approach: "Join them for dinner",
        greeting:
          '"Pull up a crate. Jo cooks for twice the dorm, and I\'d rather you had a bowl than the leftovers."',
        responses: {
          kind: "Accept the invitation gladly",
          playful: "Ask what's in the jambalaya",
          bold: "Invite yourself before he asks",
          neutral: "Join without comment",
        },
      },
    ],
    spark: [
      {
        line: "He takes the sucker out of his mouth and, for once, doesn't reach for a line to fill the quiet.",
        approach: "Enjoy the quiet",
        greeting: "\"Now, I've been real patient. I'd like that noted.\"",
        responses: {
          kind: "Tell him to stop angling",
          playful: "Make him be patient longer",
          bold: "Break the quiet yourself",
          neutral: "Leave him guessing",
        },
      },
      {
        line: "He tips your chin up with two fingers and forgets to make a joke of it.",
        approach: "Say yes",
        greeting:
          '"No coin, no trick, no angle. Just me asking. Say yes or say no."',
        responses: {
          kind: "Say yes, gently",
          playful: "Make him work for the yes",
          bold: "Tell him not to behave",
          neutral: "Hold still, say nothing",
        },
      },
      {
        line: '"I\'ve run clean out of angles with you," he says. "That\'s a first."',
        approach: "Call it a first",
        greeting: '"You look at me like you\'ve already decided. Have you?"',
        responses: {
          kind: "Say the angle was never needed",
          playful: "Turn his own line back on him",
          bold: "Say you already decided",
          neutral: "Step around him",
        },
      },
      {
        line: "He's done playing the long game. What's left is a good deal more direct.",
        approach: "Make up your mind",
        greeting: "\"I'd behave, but you don't seem to want me to.\"",
        responses: {
          kind: "Meet the directness kindly",
          playful: "Make him work even harder",
          bold: "Make up your mind for him",
          neutral: "Let the question hang",
        },
      },
      {
        line: "He holds the door, then leans across it, then grins at his own foolishness.",
        approach: "Lean in the doorway too",
        greeting: '"Well, look at the two of us. Neither one going anywhere."',
        responses: {
          kind: "Let him have the moment",
          playful: "Lean back just as far",
          bold: "Block the door yourself",
          neutral: "Hold the door, say nothing",
        },
      },
      {
        line: '"Come here. I\'m done being clever about it."',
        approach: "Come here",
        greeting:
          '"There you are. That\'s all I was working up to. Took me long enough."',
        responses: {
          kind: "Take his hand",
          playful: "Make him work for this too",
          bold: "Come here first",
          neutral: "Come without a word",
        },
      },
    ],
    close: [
      {
        line: '"Wasn\'t planning on caring about anybody," he admits, quiet. "You went and changed that."',
        approach: "Sit a while with him",
        greeting:
          '"You\'ve gone and become my favorite person in this place. Figured you should know."',
        responses: {
          kind: "Say you liked him anyway",
          playful: "Play his game back",
          bold: "Name what you both know",
          neutral: "Watch what he's really doing",
        },
      },
      {
        line: "The lollipop stays in his pocket. He's got nothing to keep your eyes busy with, and doesn't want one.",
        approach: "Notice the empty hands",
        greeting: '"No tricks tonight. Just me. Try not to look so surprised."',
        responses: {
          kind: "Tell him the act can come off",
          playful: "Catch him in a half-truth",
          bold: "Say tricks were never needed",
          neutral: "Let him have the quiet",
        },
      },
      {
        line: '"Ask me anything," he says. "I\'ll even tell you true. Novel, isn\'t it."',
        approach: "Ask him for the truth",
        greeting:
          '"I\'ve lied to everyone in this house. Not to you. Not once that mattered."',
        responses: {
          kind: "Believe him without proof",
          playful: "Out-charm him",
          bold: "Say you're not a mark",
          neutral: "Take him at his word quietly",
        },
      },
      {
        line: "He says your name without any of his usual polish. It sounds like a different man saying it.",
        approach: "Say his name plain",
        greeting:
          '"Stay a while, would you? The quiet\'s easier with you in it."',
        responses: {
          kind: "Say his real voice suits him",
          playful: "Point out the missing polish",
          bold: "Say his name back the same way",
          neutral: "Sit through the silence",
        },
      },
      {
        line: "For once he lets you see how much of the easy charm was armor.",
        approach: "Stay through the quiet",
        greeting:
          '"I used to be someone here. With you I don\'t have to be anyone."',
        responses: {
          kind: "Ask what he's really after",
          playful: "Tease the armor metaphor",
          bold: "Tell him to stop performing",
          neutral: "Let him keep his guard down",
        },
      },
      {
        line: '"My true self?" The old deflection starts up, then stalls. "...You\'ve seen most of it by now. Don\'t go telling anyone."',
        approach: "Admit you've seen it",
        greeting:
          '"Heh. Figured you had. ...You didn\'t run, so I suppose I can quit hiding the rest."',
        responses: {
          kind: "Say you like what you've seen",
          playful: "Promise to keep it a secret",
          bold: "Say you see all of him now",
          neutral: "Let him keep what's left",
        },
      },
    ],
    bound: [
      {
        line: "No angles, no coin, no charm. Just him, which turns out to be the dangerous part.",
        approach: "Check his hands",
        greeting: '"I love you. No trick in it. Check my hands if you like."',
        responses: {
          kind: "Take his hands",
          playful: "Make him drop the act",
          bold: "Say this is the dangerous part",
          neutral: "Take it in, say nothing",
        },
      },
      {
        line: "He says your name in the dark, unhurried, and it is genuinely unfair.",
        approach: "Say it slower",
        greeting: '"Say my name like that again. Slower."',
        responses: {
          kind: "Say it back",
          playful: "Say his name wrong on purpose",
          bold: "Say his name slower",
          neutral: "Let him talk",
        },
      },
      {
        line: '"Spent years being nobody\'s," he says, low. "Turns out I\'m yours. Who\'d have thought."',
        approach: "Say you're his too",
        greeting:
          '"Yours and mine. Hm. Got a nice sound to it. Say it again, would you?"',
        responses: {
          kind: "Tell him he's someone's now",
          playful: "Call the bluff one more time",
          bold: "Claim him right back",
          neutral: "Turn over",
        },
      },
      {
        line: "He kisses slow, like a man with nowhere pressing to be and no wish to be anywhere else.",
        approach: "Come back to bed",
        greeting: '"Come back to bed. Everything else can wait on us."',
        responses: {
          kind: "Melt into the slow kiss",
          playful: "Ask what the rush was ever for",
          bold: "Pull him back down",
          neutral: "Let it stay unhurried",
        },
      },
      {
        line: "He's quit performing altogether. It cost him something. He'd pay it twice.",
        approach: "Notice what it cost him",
        greeting: '"Got nothing left to hide behind. Suits me fine."',
        responses: {
          kind: "Notice what it cost him",
          playful: "Tease him for finally quitting",
          bold: "Tell him to make it worth it",
          neutral: "Let him just be, quietly",
        },
      },
      {
        line: '"Hope this quiet lasts," he says into your hair. "First time I\'ve wanted something to."',
        approach: "Stay",
        greeting: '"Stay. I\'ll make it worth the morning."',
        responses: {
          kind: "Hope it lasts too",
          playful: "Tease him for wanting that",
          bold: "Promise him it will",
          neutral: "Let the morning come",
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
      '"Oh, hello." His careful courtesy reaches {user} a good second before **{name}** does.',
      '{user} says the name, and **{name}** shifts the lollipop to the other cheek. "Oh, you called me?"',
      "**{name}** had been leaning where he shouldn't be. He straightens up for {user}, slowly.",
    ],
    warm: [
      '"Seeing you makes my day. I mean that." **{name}** says it simply, and {user} can tell.',
      "{user} calls out, and **{name}** puts down whatever errand Jo sent him on.",
      "**{name}** offers {user} a candy before he offers a hello.",
    ],
    spark: [
      '"Keep that up and I\'ll start to think you like me." **{name}** smiles at {user} like it\'s a secret.',
      "{user} says the name, and **{name}**'s easy smile goes real for a second.",
      "**{name}** takes his time getting to {user}.",
    ],
    close: [
      '"Oh, it\'s you… Walk with me a while?" **{name}** falls in beside {user} like the errand never existed.',
      "**{name}** drops the charm the moment it's {user}.",
      "{user} calls, and **{name}** stops working the room entirely.",
    ],
    bound: [
      '"I\'d gotten used to belonging to no one…" **{name}** tells {user}, low. "It seems I\'m yours now."',
      "**{name}** says {user}'s name back, unhurried.",
      "{user} says the name, and **{name}** lets the **{house}** errands rot where they stand.",
    ],
  },
};
