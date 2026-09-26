export default {
  // The level-up DMs (docs/bond-scene-dms.md). One of the six volatile
  // characters — see docs/negative-affinity-enemies-to-lovers.md. Romeo yells in
  // text, coins acronyms nobody asked for, and prices everything, and none of
  // that softens on the way up. What changes is what he spends the money on and
  // who he counts as his. The care is always backhanded and always expensive.
  bondScenes: {
    acquaintance: {
      beats: [
        "**{firstName}**: Tch. Before you say anything, no, you're not in trouble, and no, this isn't a bill. Yet.",
        "Somebody put your name on the floor list as a mark. Standard stuff, happens to everyone who comes through more than twice. Not personal, just Sinostra.\n\nI took it off. Personally. Cost me a conversation I did not enjoy having at nine in the morning.\n\n{timesMet} visits and you've never once sat down at a table. Marks play. You don't even look. You know how rare that is? That's ONE person.",
      ],
      choice: {
        prompt: "So don't make me regret it.",
        options: [
          {
            key: "kind",
            label: "Thank him for it",
            style: 3,
            close:
              "Don't thank me, it's undignified for both of us.\n\n...You're welcome. That's all you're getting. That's the entire allocation for the year.",
          },
          {
            key: "playful",
            label: "Ask if you're still a mark",
            style: 1,
            close:
              "Obviously not, or I wouldn't be wasting a perfectly good morning explaining myself to you.\n\n...You're something else. I haven't worked out what yet. Don't push it.",
          },
          {
            key: "bold",
            label: "Ask what it cost him",
            style: 4,
            close:
              "Nothing.\n\nA favor, two hundred thousand yen of goodwill, and I had to be nice to a man I hate. Don't mention it. Genuinely. Do not mention it, ever, to anyone.",
          },
        ],
      },
      keepsake: {
        emoji: "💳",
        line: "A name struck off the floor list at nine in the morning.",
      },
    },

    friend: {
      beats: [
        "**{firstName}**: Right. Something's been irritating me for a MONTH and I've finally worked out what it is.",
        "You do {favResponse} with me every single time and you have NEVER ONCE ASKED ME FOR ANYTHING.\n\nEverybody wants something. That's not me being bleak, it's the operating model of this entire academy. People suck up, then comes the ask. I price it in. Honestly it's fine, the ask is where the margin is.\n\nYou've had a month of opportunities. Nothing. You're a WMOO. Wasted Month Of Opportunities, obviously. It's INSULTING.",
      ],
      choice: {
        prompt:
          "So ask me for something. Anything. I'm begging you, it's making me itch.",
        options: [
          {
            key: "kind",
            label: "Ask him to sit down a minute",
            style: 3,
            close:
              "That's not a... that's not an ASK, that's not...\n\n*A long pause.*\n\n...Fine. Fine! I'm sitting. I've sat. Are you happy? This is the worst favor I've ever done anyone.\n\n*He sits for forty minutes.*",
          },
          {
            key: "playful",
            label: "Ask for his skincare routine",
            style: 1,
            close:
              "NOW you're talking. Right. Clear your evening. There are ELEVEN STEPS and I'm not skipping the explanations.\n\n*He sends fourteen messages about serums. It's the happiest you've ever seen him.*",
          },
          {
            key: "bold",
            label: "Say you don't want anything",
            style: 4,
            close:
              "Everyone wants something.\n\n...You're going to keep saying that, aren't you. And I'm going to keep waiting for the ask, and it's going to be like this for years, and I'm going to be extremely annoyed the entire time.\n\nFine. FINE. Consider me annoyed.",
          },
        ],
      },
      keepsake: {
        emoji: "🧴",
        line: "Eleven steps, explained in fourteen messages, unprompted.",
      },
    },

    closeFriend: {
      beats: [
        "**{firstName}**: Casino. After close. Come up to the balcony office, not the floor, and DON'T let Taiga see you on the way up or he'll steal you for the night at the casino before I've said two words.",
        "*The floor is dark below and he is sitting on the balcony with his jacket off and his hair down and a ledger open in front of him, and he doesn't do the voice when you come in.*\n\n> This is the real book. Not the one the academy sees. Every fee, every mark, every person in this house who owes and every person who's owed to.",
        "*He turns it round so you can see, which is the single most dangerous thing anyone in Sinostra could do.*\n\n> Half of that is people who'll never pay and I've never once chased. Fuji-kun's on there four times. There's a second-year on there whose mom's ill and she's never going to know I wrote it off.\n\n> Everyone thinks I'm the money. I AM the money. But nobody's ever asked what I actually spend it on, and it turns out the answer's on page nine and I've never shown anybody page nine.",
      ],
      choice: {
        prompt:
          "Say something. And if you say I'm secretly nice I'm throwing you off this balcony.",
        options: [
          {
            key: "kind",
            label: "Say page nine is the real book",
            style: 3,
            close:
              "*He shuts the ledger rather harder than necessary.*\n\n> ...Yeah. Yeah, alright.\n\n*He doesn't say anything else for a bit. Then:*\n\n> Don't repeat that. I've got a reputation and it does about ninety percent of my job for me.",
          },
          {
            key: "playful",
            label: "Threaten to tell everyone",
            style: 1,
            close:
              "> HDY. I will RUIN you. I will ruin you SO efficiently...\n\n> ...You wouldn't though. That's the annoying bit. You're the only person I've shown this to and I'm not even slightly worried, and I've been worried about everything since I was nine.",
          },
          {
            key: "bold",
            label: "Ask if you're in the book",
            style: 4,
            close:
              "*He goes very still.*\n\n> ...Page one.\n\n*He doesn't turn it back round.*\n\n> Not as a debt. There's a second column. There's exactly one name in the second column and it's been there since about March and I'm not explaining what the column is.",
          },
        ],
      },
      keepsake: {
        emoji: "📒",
        line: "Page nine of a ledger nobody else has ever been shown.",
      },
    },

    confidant: {
      beats: [
        "**{firstName}**: Taiga lost three days again. I've been running the floor since Wednesday and I have not slept and I look INCREDIBLE, which is not the point.",
        "Here's the bit I don't say. He doesn't remember that I do it. Every time. I cover four days, he comes back, and by lunch we're screaming at each other about the bar tab like nothing happened. He's not ungrateful, he genuinely doesn't register it.\n\nSo I've held this house up for two years for a man I fight with daily. And if he ever worked it out, he wouldn't say thank you. He'd make it ammunition. I'd rather run this floor blind than give him that.",
        "I yell because if I'm the loudest person in the room nobody asks what I'm actually doing. Worked for as long as I can remember. Works best on him, he's too busy yelling back to notice what I'm covering.\n\nYou asked. Last Tuesday. Just said \"are you all right\" in the corridor like it was a normal question, and I've been thinking about it for six days and I'm FURIOUS about it.",
      ],
      choice: {
        prompt:
          "So? Go on. You've clearly got something, you've been chewing on it for a week.",
        options: [
          {
            key: "kind",
            label: "Ask if he's all right again",
            style: 3,
            close:
              "DON'T...\n\n*Nothing for four minutes.*\n\nNo, *he writes eventually, and it's the quietest thing he's ever sent.* No, I'm not. Obviously I'm not.\n\nCome up. Don't say anything about it when you get here. Just be up here.",
          },
          {
            key: "playful",
            label: "Agree that he looks incredible",
            style: 1,
            close:
              "THANK YOU. Finally. Somebody in this building with EYES.\n\n*Then, much later:* ...that helped, actually. Don't tell anyone that helped. I'd rather people thought I was unreachable.",
          },
          {
            key: "bold",
            label: "Say he should tell Taiga",
            style: 4,
            close:
              "Absolutely not.\n\nHe'd never let it go. He'd bring it up every time we argue for the rest of our lives, turn it into a scoreboard, and somehow make ME feel like I owe HIM for having \"let\" me do it. That's not... no. I'm not handing him that.\n\nBesides. I've got the better memory. It's the one advantage I've got over him and I'm keeping it.",
          },
        ],
      },
      keepsake: {
        emoji: "💼",
        line: "Four days of covering for someone who'll never know it happened.",
      },
    },

    devoted: {
      beats: [
        "**{firstName}**: Don't come in tomorrow. I mean it. The floor's closed and I'm dealing with something.",
        "Somebody laid into you in the west block. Verbally. In front of about nine people.\n\nI've heard about it from three separate sources and I've spent the evening finding out exactly who he owes, what to, and when it's due, and it turns out he owes a REMARKABLE amount and it's due whenever I say it is.",
        "I want to be honest about what this is, because you'll hear it as protecting you and it's uglier than that.\n\nThis is me being the most frightening thing in the building on purpose, at somebody, because he made you look at the floor. That's the whole of it. There's no noble version.\n\nYou're mine. Not like... I'm not TAIGA about it. You're on my list. Everyone on my list is protected, nobody's ever got on it without paying, and you never paid a thing.",
      ],
      choice: {
        prompt:
          "Now tell me to stop. You're the only one who could and I'd like to know if you will.",
        options: [
          {
            key: "kind",
            label: "Tell him to stop",
            style: 3,
            close:
              "...Right.\n\n*A long silence.*\n\nStopped. Done. It's... yeah. It's stopped.\n\n*Then:* Come up anyway. I've canceled a whole evening of being frightening and I've got nothing to do with myself and I'd rather not sit here alone with it.",
          },
          {
            key: "playful",
            label: "Ask how remarkable the debt is",
            style: 1,
            close:
              "OBSCENE. Genuinely obscene. He's been rolling it over for a year and a half and I've been letting him because it amuses me.\n\nIt has stopped amusing me. Funny how that works.",
          },
          {
            key: "bold",
            label: "Say you don't want him to",
            style: 4,
            close:
              "That's not the same as telling me to stop and you know it isn't.\n\n...It's better, actually. It's worse for me and it's better. Because now I've got to want to stop rather than just being told, and I don't, and I'm going to anyway.\n\nHDY. Genuinely. How dare you.",
          },
        ],
      },
      keepsake: {
        emoji: "💰",
        line: "A debt he stopped calling in because you asked him to.",
      },
    },

    soulbound: {
      beats: [
        "**{firstName}**: Balcony. Now. And before you get there, I've had eleven weeks to do this properly and I've decided to do it badly instead, so brace.",
        "*The ledger is open on the desk at page one. He's turned it round already.*\n\n*There is a second column, and there's one name in it, and it says: \"not a debt. never bill.\"*\n\n> March. I wrote that in March and I've looked at it about four hundred times.",
        "> Everything's a price. That's not a philosophy, it's the only language I was taught. My family bought their way out of things and into things, and I learned exactly one skill: knowing what everybody costs.\n\n> I can price anyone in this academy in four seconds. Taiga. Jo. The captain of Frostheim, who thinks he's above it and isn't.\n\n> {timesMet} visits and I have NEVER been able to price you. Not once. It's been driving me out of my MIND for a year.",
        "> So here's the badly done bit.\n\n> I love you. There's no invoice, there's no favor attached, and there's nothing you owe me, and if you ever try to pay me back for anything I have EVER done for you I will genuinely never speak to you again.\n\n> That's it. That's the whole thing. I've spent my entire life making sure everything had a number on it and there's one thing that doesn't and it's you and I've just told you, out loud, on a balcony, like a MANIAC.",
      ],
      choice: {
        prompt:
          "Say something. Anything. I'm going to start yelling in about four seconds and it won't be at you, it'll just be VOLUME.",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close:
              "*There is a sound that is almost certainly a chair going over.*\n\nSay it AGAIN... no. No, don't. Don't, I heard it, I'm...\n\n*He stops trying to type. He comes round the desk instead, and for once he isn't loud at all: he takes your hands, both of them, and looks at them rather than at you.*\n\n> Nobody's ever done that for free,\n\n*he says.*\n\n> Not once, in my whole life. Say it again in the morning. I'll need it in the morning.",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close:
              "Fine. GREAT. Excellent. Take all of it.\n\n*A pause. Then, without the volume:*\n\n...That wasn't sarcasm, for once. Take it. I dropped that on you off a balcony at two in the morning, you're entitled to a bit of thinking.\n\nSecond column stays. That's not a maneuver. It was true in March and it's true now and it'd be true if you never came up here again. Nobody bills you. That's the arrangement and it isn't up for negotiation, which I'm aware is a very me way of being kind.",
          },
        ],
      },
      keepsake: {
        emoji: "📓",
        line: "One name in a second column, marked never bill.",
      },
    },
  },
  dialogue: {
    new: [
      {
        line: 'He\'s barking orders at the Sinostra students, managing every angle of the casino floor. "HDY waste my time? Quick, put on this dress and work table seven, we need someone sharp out there."',
        approach: "Make yourself useful",
        greeting: '"Well? Table seven isn\'t going to deal itself. Move!"',
        responses: {
          kind: ["Do it without complaint", "Say you'll do your best"],
          playful: ["Trade sass back", "Ask what the dress code is"],
          bold: ["Take the table without asking", "Bet on yourself"],
          neutral: ["Nod and get on with it", "Stay quiet"],
        },
      },
      {
        line: "He's on two conversations and one phone call. You are somehow now the third conversation.",
        approach: "Cut into the conversation",
        greeting: '"Hold on. ...No, not you. ...Yes, you. What do you want?"',
        responses: {
          kind: ["Wait for a natural pause", "Let him finish his call"],
          playful: ["Interrupt with an absurd claim", "Use his own acronym"],
          bold: ["Make him hang up first", "Refuse to wait your turn"],
          neutral: ["Let him run the floor", "Wait for him to notice you"],
        },
      },
      {
        line: "\"Come to my private office later, I've got a little proposal I think you'll want to hear. But make sure you come alone.\"",
        approach: "Hear the proposal",
        greeting:
          '"You came alone. Good. The VIP section needs a face at the door, and yours will do. There\'s money in it."',
        responses: {
          kind: ["Say you'd be glad to help", "Thank him for the chance"],
          playful: ["Guess the proposal first", "Tease him about secrecy"],
          bold: ["Take the VIP section", "Ask what your cut is"],
          neutral: ["Take the offer at face value", "Wait to hear the terms"],
        },
      },
      {
        line: "He's a dealer short tonight. He looks you up and down, does arithmetic, and apparently likes the result.",
        approach: "Ask what the job pays",
        greeting:
          '"Pays? Tch. Depends how you work. The face alone gets you a base rate."',
        responses: {
          kind: ["Accept whatever's fair", "Say you'll earn a raise"],
          playful: ["Fish for a bigger number", "Joke about your own price"],
          bold: ["Name your price", "Ask for hazard pay"],
          neutral: ["Ask for the base rate", "Wait for an actual figure"],
        },
      },
      {
        line: "He's got a sheet mask on and a phone to his ear and does not consider either a reason to stop running the floor.",
        approach: "Walk faster",
        greeting:
          "\"You're new. Rule one: don't touch the chips. Rule two: see rule one.\"",
        responses: {
          kind: ["Keep pace without complaint", "Help him multitask"],
          playful: ["Touch the chips", "Dare him to stop you"],
          bold: ["Keep pace and outdo him", "Take over a task yourself"],
          neutral: ["Keep your hands off the chips", "Keep up without a word"],
        },
      },
    ],
    known: [
      {
        line: "He's stopped trying to put you to work. Mostly.",
        approach: "Point out the exception",
        greeting:
          '"Table seven. ...No. Not you. Tch. Force of habit. Sit somewhere."',
        responses: {
          kind: ["Say you don't mind helping", "Take a seat, as told"],
          playful: ["Ask what table seven pays", "Ask if you're special now"],
          bold: ["Call yourself the exception", "Demand he admit it"],
          neutral: ["Note it, say nothing", "Let the exception stand"],
        },
      },
      {
        line: '"Oh, it\'s YOU," at a volume that carries across the entire floor.',
        approach: "Interrupt the yelling",
        greeting:
          '"Tch. I wasn\'t looking for you. I looked up, you were there, and I said so. Loudly. It happens."',
        responses: {
          kind: ["Say it's good to see him too", "Wave back across the floor"],
          playful: ["Yell back just as loud", "Ask who else heard that"],
          bold: ["Say he was looking for you", "Ask why he looked up"],
          neutral: ["Walk over to him", "Let the volume go unremarked"],
        },
      },
      {
        line: "He complains about something to you specifically, which is a form of trust.",
        approach: "Let him complain",
        greeting:
          "\"You're not on the payroll and you're still working harder than half of it. Infuriating.\"",
        responses: {
          kind: ["Listen to the whole complaint", "Say you like helping out"],
          playful: ["Add your own complaint too", "Egg the complaining on"],
          bold: ["Tell him to stop complaining", "Ask to go on the payroll"],
          neutral: ["Nod along, say nothing", "Say someone has to"],
        },
      },
      {
        line: '"Have you seen Shinjo anywhere? I just asked him to organize some documents and he ran off to make copies!"',
        approach: "Help him find Ritsu",
        greeting:
          '"I cannot deal with this WTWUT! Wall-To-Wall Useless Trash, obviously! ...Not you. You can stay."',
        responses: {
          kind: ["Stay, since he asked", "Reassure him it's fine"],
          playful: ["Guess Ritsu's hiding spot", "Tease the new acronym"],
          bold: ["Go drag Ritsu back yourself", "Tell him to calm down"],
          neutral: ["Check the usual room first", "Search without comment"],
        },
      },
      {
        line: 'He pushes a glass of something green across the desk. "Noni juice. Drink it. Your skin cell turnover is suboptimal and it shows."',
        approach: "Drink the green stuff",
        greeting:
          '"Don\'t make that face. That shot costs more than your shoes. Drink."',
        responses: {
          kind: ["Say you'll try anything once", "Thank him for the thought"],
          playful: ["Ask what's really in it", "Tease the diagnosis"],
          bold: ["Say your shoes are worth more", "Demand a better flavor"],
          neutral: [
            "Take the glass, say nothing",
            "Wait for him to drink first",
          ],
        },
      },
      {
        line: "He's scrawling out a check Taiga has no business asking for, muttering a number with too many zeros in it.",
        approach: "Sit without an appointment",
        greeting:
          "\"You again! HDY walk into my office like it's a hallway. Sit down, I'm nearly finished.\"",
        responses: {
          kind: ["Apologize for barging in", "Say you'll keep it short"],
          playful: [
            "Sit like you own the chair",
            "Ask what Taiga did this time",
          ],
          bold: ["Say the door was open", "Demand your own check too"],
          neutral: ["Watch the zeros pile up", "Wait for him to finish"],
        },
      },
      {
        line: '"Spit it out, I don\'t have all day," he snaps, then actually stops to listen.',
        approach: "Say what you want, quickly",
        greeting: "\"...Well? I'm listening. Don't make me regret it.\"",
        responses: {
          kind: ["Take your time anyway", "Thank him for listening"],
          playful: [
            "Drag it out just to annoy him",
            "Watch him try to rush you",
          ],
          bold: ["Say he won't regret it", "Cut straight to the point"],
          neutral: ["State it, then wait", "Ask plainly, no preamble"],
        },
      },
      {
        line: '"That color actually works on you. Don\'t let it go to your head."',
        approach: "Take the compliment",
        greeting: '"What? I said it once. I\'m not saying it again."',
        responses: {
          kind: ["Say you'll wear it more", "Say once was plenty"],
          playful: ["Fish for a bigger compliment", "Tease him for noticing"],
          bold: ["Own the compliment outright", "Say you already knew"],
          neutral: ["Take it without comment", "Nod, say nothing"],
        },
      },
      {
        line: "He's sizing up your outfit with the exact focus he gives a bad hand of cards.",
        approach: "Brace for the critique",
        greeting:
          '"Do you even know anything about brands? Stand still. Turn. ...Hm."',
        responses: {
          kind: ["Ask him what he'd change", "Stand still and turn"],
          playful: ["Ask for the full review", "Model it, badly, on purpose"],
          bold: ["Cut off the critique first", "Say the outfit's fine as is"],
          neutral: ["Stand still, say nothing", "Let him finish looking"],
        },
      },
      {
        line: '"Don\'t think this means anything," he says, of the seat he just pulled out for you. It means something.',
        approach: "Take the seat anyway",
        greeting:
          "\"Sit there. That chair's reserved. It's reserved for you, obviously, keep up.\"",
        responses: {
          kind: ["Thank him for saving it", "Say you'll keep up"],
          playful: [
            "Ask what it means, out loud",
            "Ask who else it's reserved for",
          ],
          bold: ["Say you'll reserve him one", "Call the gesture what it is"],
          neutral: ["Settle in, say nothing", "Don't ask why it's yours"],
        },
      },
      {
        line: '"That\'s going to cost you," he says when you ask to hold a chip, already doing the math on how much.',
        approach: "Haggle with him",
        greeting:
          "\"Nothing's free, you know. Well. Almost nothing. Don't push it.\"",
        responses: {
          kind: ["Pay whatever he asks", "Ask what he'd call fair"],
          playful: [
            "Ask what's on the almost list",
            "Argue the price on principle",
          ],
          bold: ["Refuse to pay at all", "Name your own price back"],
          neutral: ["Pay without comment", "Wait for the final number"],
        },
      },
      {
        line: '"You have an eye for quality," he says, surprised, like he didn\'t expect to mean it as a compliment.',
        approach: "Take it as a compliment",
        greeting: '"You\'ve got taste. Somebody around here finally does."',
        responses: {
          kind: ["Say his taste rubs off", "Say that means a lot"],
          playful: ["Act surprised he meant it", "Tease him for the surprise"],
          bold: ["Say you knew you had taste", "Say it takes one to know one"],
          neutral: ["Take it without comment", "Nod, say nothing"],
        },
      },
      {
        line: "He snaps at one of his guys for bumping into you, louder than the bump warranted.",
        approach: "Let him defend you",
        greeting:
          "\"Tch. Watch where you're going! ...You. You're fine? Good.\"",
        responses: {
          kind: ["Tell him you're fine", "Thank him for checking"],
          playful: ["Watch him deal with it", "Egg on the confrontation"],
          bold: ["Handle it yourself instead", "Ask him to ease off his guy"],
          neutral: ["Stay out of it, say nothing", "Let him deal with it"],
        },
      },
    ],
    warm: [
      {
        line: "He pauses mid-command when he spots you, actually stepping away from the action to greet you properly. Suddenly you matter more than the operation.",
        approach: "Interrupt him anyway",
        greeting:
          "\"Oh, you're back! Actually... I'm kind of happy to see you. Don't tell anyone.\"",
        responses: {
          kind: ["Hold back until he's done", "Say the operation matters"],
          playful: ["Interrupt him right back", "Threaten to tell everyone"],
          bold: ["Demand his full attention", "Step into the middle of it"],
          neutral: ["Stand by, say nothing", "Wait for him to come over"],
        },
      },
      {
        line: '"You show up unannounced, no appointment. Sit down. I\'ll get you something. Ugh. Fine. I want to."',
        approach: "Let him order for you",
        greeting: '"You eaten? Don\'t answer, I already ordered."',
        responses: {
          kind: ["Thank him for ordering", "Say you'll eat whatever"],
          playful: ["Guess what he ordered", "Ask for an appointment slot"],
          bold: ["Order something else instead", "Say you knew he'd want to"],
          neutral: ["Take the food, say nothing", "Sit down and eat"],
        },
      },
      {
        line: "He complains about you at length to someone else, loudly, entirely as a compliment.",
        approach: "Complain right back",
        greeting:
          '"You had me worried all evening. Somebody put that look on your face. Give me a name. I\'ll have a word. ...A thorough one."',
        responses: {
          kind: ["Let the compliment stand", "Say he can keep complaining"],
          playful: ["Complain right back at him", "Complain louder than him"],
          bold: ["Call out the backhanded praise", "Give him no name"],
          neutral: ["Ride out the praise", "Let the audience listen"],
        },
      },
      {
        line: "He's had the good seat held all night. He will absolutely deny that.",
        approach: "Take the good seat",
        greeting:
          '"Sit. Don\'t read into it. It was just open. All night. For no reason."',
        responses: {
          kind: ["Sit, reading nothing into it", "Say the seat is perfect"],
          playful: ["Call out the obvious lie", "Ask who held it all night"],
          bold: ["Claim it without thanking him", "Say he saved it on purpose"],
          neutral: ["Sit down, no comment", "Take it, read nothing in"],
        },
      },
      {
        line: "The yelling drops a full register when he turns to you. Everyone notices. He doesn't.",
        approach: "Notice the register drop",
        greeting:
          "\"You're not staff and you're not a guest. You're... whatever. You're welcome here.\"",
        responses: {
          kind: [
            "Let the softness go unremarked",
            "Say you like being welcome",
          ],
          playful: [
            "Point out the register drop",
            "Ask him to yell at you too",
          ],
          bold: ["Call out the change directly", "Say everyone noticed"],
          neutral: ["Let the moment pass quietly", "Take the welcome as given"],
        },
      },
      {
        line: '"What? I\'m on my way to the gym." He adjusts his bag strap, not quite looking at you. "...You can join me if you\'re interested."',
        approach: "Join him at the gym",
        greeting:
          '"Form first, weight second. If you hurt yourself on my watch, I\'m billing you for the embarrassment."',
        responses: {
          kind: ["Ask him to spot you", "Say you'll follow his lead"],
          playful: ["Race him to the treadmill", "Ask what the bill would be"],
          bold: ["Match his reps", "Say you'll outlift him"],
          neutral: ["Stretch beside him", "Grab a water"],
        },
      },
      {
        line: '"Room-temperature water. Electric facial. Mask. Body cream. Neck routine." He\'s counting on his fingers. "I have no free time in the morning."',
        approach: "Ask to see the routine",
        greeting:
          "\"Sit. You're getting the mask. Don't argue, your pores are a cry for help.\"",
        responses: {
          kind: ["Let him do the mask", "Say he knows best"],
          playful: ["Ask which step is the neck", "Say your pores are fine"],
          bold: ["Ask what it all costs", "Put a mask on him too"],
          neutral: ["Hold still", "Lean back in the chair"],
        },
      },
      {
        line: '"Listen up. Call me Fico." He jabs a finger at you. "That\'s the only name I\'ll answer to, understand?"',
        approach: "Try out the name",
        greeting:
          '"Again. With feeling. ...Better. You can keep saying it. Only you, though."',
        responses: {
          kind: ["Say it suits him", "Say it with a smile"],
          playful: ["Call him Lulu instead", "Say it three times fast"],
          bold: ["Ask what it means", "Say you'll call him Romeo"],
          neutral: ["Say it once", "Nod"],
        },
      },
      {
        line: "He's cleaning a pistol at his desk, piece by piece. \"I maintain my bullets myself. You think I'd let another man handle my crown jewels?\"",
        approach: "Watch him clean it",
        greeting:
          "\"Don't touch. You can look. Looking's free. For you, anyway.\"",
        responses: {
          kind: ["Keep your hands to yourself", "Say he's careful with it"],
          playful: ["Ask if they have names", "Ask for the jewel appraisal"],
          bold: ["Ask him to teach you", "Pick up a cloth and help"],
          neutral: ["Watch in silence", "Sit across from him"],
        },
      },
      {
        line: '"You\'re smelling the bedtime fragrance Kurossa picked out for me." He caught you leaning in. "He has a good eye. I often ask him to choose."',
        approach: "Say it smells good",
        greeting:
          "\"Of course it does. It costs more than your wardrobe. ...I'll have him find you one. Don't make it weird.\"",
        responses: {
          kind: ["Thank him for the offer", "Say you'd like that"],
          playful: ["Say Leo has him figured out", "Sniff again, louder"],
          bold: ["Ask him to pick it himself", "Say you'd rather borrow his"],
          neutral: ["Step back", "Nod at the bottle"],
        },
      },
      {
        line: '"Mickey\'s bar? Yes, I\'m going again tonight." He straightens his cuffs. "Only because there\'s nowhere else to drink. ...Coming?"',
        approach: "Go to Mickey's with him",
        greeting:
          "\"First round's on me. Second's on you. Third, we'll see how you've behaved.\"",
        responses: {
          kind: ["Say one round is plenty", "Say you'll get the second"],
          playful: ["Ask how to behave", "Order the priciest thing"],
          bold: ["Say you'll buy the first", "Tell him to pick the table"],
          neutral: ["Follow him out", "Grab your coat"],
        },
      },
      {
        line: '"You want to see my Insta?" He\'s already holding the phone out. "Fine. But do you even know anything about brands?"',
        approach: "Scroll his Insta",
        greeting:
          "\"That one's a limited run. That one's vintage. That one's me, which is priceless.\"",
        responses: {
          kind: ["Say he looks great", "Like every post"],
          playful: ["Ask who took the photos", "Like one from years back"],
          bold: ["Point out a bad angle", "Say you've got better brands"],
          neutral: ["Keep scrolling", "Hand the phone back"],
        },
      },
      {
        line: '"Why are you carrying that!?" He\'s across the floor in three strides. "What if you drop it? I\'ll get one of the young guys. Put it down already!"',
        approach: "Put it down",
        greeting:
          "\"Good. Your hands are worth more than the box. ...That's an insurance thing. Don't read into it.\"",
        responses: {
          kind: ["Thank him for the help", "Say you were being careful"],
          playful: ["Pretend to fumble it", "Ask what your hands are worth"],
          bold: ["Say you had it handled", "Pick it back up"],
          neutral: ["Step back from it", "Let the guys take it"],
        },
      },
      {
        line: '"There\'s a hair on the ground! And dust over here!" He\'s yelling at the whole floor. Then he sees you. "...You. You didn\'t see me yell."',
        approach: "Say you saw everything",
        greeting:
          '"Tch. Fine. You saw. Now help me look for more dust, since you\'re here."',
        responses: {
          kind: ["Help him check the corners", "Say the floor looks fine"],
          playful: ["Point at imaginary dust", "Ask if he's got a white glove"],
          bold: ["Tell him to yell less", "Say he missed a spot"],
          neutral: ["Look for dust", "Grab a cloth"],
        },
      },
      {
        line: '"Those Frostheim slugs start whispering the second they see my face." He\'s glaring down the hall. "One day they\'ll be groveling."',
        approach: "Stand beside him",
        greeting:
          '"Head up. We\'re walking past them. Slowly. Let them whisper about both of us."',
        responses: {
          kind: ["Say they're just jealous", "Walk past with him"],
          playful: ["Wave at them", "Whisper back at them"],
          bold: ["Stare them down", "Say you'll make them grovel"],
          neutral: ["Keep walking", "Ignore them"],
        },
      },
      {
        line: '"Looks like I\'m due for a tune-up." He rolls his shoulder, frowning. "I\'ll call Mio. Keeping my posture beautiful isn\'t easy, no matter how much I train my core."',
        approach: "Offer to go with him",
        greeting:
          '"To Mio\'s? Why? ...Fine. You can carry my water. Room temperature."',
        responses: {
          kind: ["Carry his water", "Say you'll keep him company"],
          playful: ["Ask if Mio charges him", "Say his posture is flawless"],
          bold: ["Say he's stalling", "Call Mio for him"],
          neutral: ["Walk with him", "Wait outside"],
        },
      },
      {
        line: '"This is when the regulars come in, so I sweeten the pot." He\'s adjusting the lights over a table. "And I saw that HNTW out there. Has No Taste Whatsoever, obviously."',
        approach: "Ask what sweetening means",
        greeting:
          '"Better lights, better drinks, better faces on the floor. Yours counts. Stand there."',
        responses: {
          kind: ["Stand where he says", "Say you'll help tonight"],
          playful: ["Ask which one is the HNTW", "Ask for a better name tag"],
          bold: ["Ask what you get for it", "Pick your own spot"],
          neutral: ["Watch the regulars", "Stand by the door"],
        },
      },
      {
        line: '"Well, look what the cat dragged in." He doesn\'t look up from the counting table. "Do I have to teach you how to maintain an adult relationship?"',
        approach: "Apologize for the absence",
        greeting:
          '"This is your last chance, got it? ...That\'s what I said last time. Sit down."',
        responses: {
          kind: ["Say you missed him", "Promise to text next time"],
          playful: [
            "Ask how many chances are left",
            "Ask if he counted the days",
          ],
          bold: ["Say he could have called", "Say he's glad you're back"],
          neutral: ["Sit down", "Tell him where you were"],
        },
      },
    ],
    spark: [
      {
        line: "He clears the whole VIP room. For a conversation. That he then can't start.",
        approach: "Stay when the room clears",
        greeting: '"Everybody out. Not you. Obviously not you."',
        responses: {
          kind: "Tell him he's not business",
          playful: "Ask what he's building up to",
          bold: "Stay when the room clears",
          neutral: "Let him find the words",
        },
      },
      {
        line: '"HDY look like that in MY casino," he snaps, meaning something entirely different.',
        approach: "Give him a second",
        greeting:
          "\"You've cost me something I can't put a number on. Do you have ANY idea how much that irritates me?\"",
        responses: {
          kind: "Reassure him it's fine",
          playful: "Ask what it cost",
          bold: "Tell him what he's worth",
          neutral: "Wait for him to explain",
        },
      },
      {
        line: "He fixes your collar, aggressively, and doesn't step back afterward.",
        approach: "Let him fix your collar",
        greeting:
          "\"You're the only thing in this building that isn't for sale. That's the problem.\"",
        responses: {
          kind: "Let him fix it, say thanks",
          playful: "Tease him for staying close",
          bold: "Fix his collar back",
          neutral: "Let him finish fixing it",
        },
      },
      {
        line: "The yelling stops. The silence that replaces it is much louder.",
        approach: "Let the yelling stop",
        greeting: "\"I'm not good at quiet. Give me a second. I'm trying.\"",
        responses: {
          kind: "Give him the second",
          playful: "Out-yell him",
          bold: "Fill the silence yourself",
          neutral: "Say nothing",
        },
      },
      {
        line: "He buys you something absurd and refuses to explain why, badly.",
        approach: "Wear it",
        greeting:
          '"Wear it. I bought it. Don\'t argue, just... just wear it for me."',
        responses: {
          kind: "Wear it for him",
          playful: "Refuse to wear it",
          bold: "Wear it and own the moment",
          neutral: "Leave with the room",
        },
      },
    ],
    close: [
      {
        line: '"You\'re not just money or status to me," he admits, voice uncharacteristically sincere. "You\'re everything."',
        approach: "Go straight to him",
        greeting:
          "\"I'd spend all my money on you if you asked. Not that I'd ever admit that normally.\"",
        responses: {
          kind: "Know his worth is you",
          playful: "Match his wit",
          bold: "Know you're worth his money",
          neutral: "Let the moment sit quietly",
        },
      },
      {
        line: "He hands the floor to someone else, the floor, because you looked like you needed a minute.",
        approach: "Tell him to hand off the floor",
        greeting:
          "\"Everything on this floor, I can price. Then there's you. It's infuriating.\"",
        responses: {
          kind: "Say the money was never it",
          playful: "Tease him about delegating",
          bold: "Take the floor duty yourself",
          neutral: "Let him have this moment",
        },
      },
      {
        line: "\"Don't tell me what it cost. It's yours. That's the end of the conversation.\"",
        approach: "Accept the gift",
        greeting: "\"Take it. Don't look at the price. I said don't look.\"",
        responses: {
          kind: "Tell him to stop buying things",
          playful: "Spend his money on him",
          bold: "Accept it and raise the stakes",
          neutral: "Sit through the closing count",
        },
      },
      {
        line: "The performance of not caring finally collapses, and he's not even embarrassed about it.",
        approach: "Stay till close",
        greeting:
          '"Stay till close. I\'ll be insufferable the whole time. You like that."',
        responses: {
          kind: "Stay, let him drop the act",
          playful: "Out-yell him affectionately",
          bold: "Tell him to say it plainly",
          neutral: "Wait out the rant",
        },
      },
      {
        line: "\"I like you. This much. It's ridiculous,\" he mutters, and doesn't let go of your hand.",
        approach: "Take his hand",
        greeting:
          "\"I've got people for everything. I don't have anyone for you. That's the point.\"",
        responses: {
          kind: "Say it back, just as plainly",
          playful: "Tease him for holding on",
          bold: "Take his hand openly",
          neutral: "Let him hold on in silence",
        },
      },
    ],
    bound: [
      {
        line: "He's bought out the floor for the night. For you. He'll never explain it properly.",
        approach: "Let him cancel everything",
        greeting:
          "\"You're the only thing I've ever wanted that I couldn't just buy.\"",
        responses: {
          kind: "Tell him he's more than money",
          playful: "Ask how much the floor cost",
          bold: "Tell him he couldn't buy you",
          neutral: "Let him have the gesture",
        },
      },
      {
        line: '"Look what you\'ve done to me," he mutters, with his face in your neck.',
        approach: "Come here already",
        greeting:
          "\"Floor's closed. Everyone's gone. It's just us, so... come here already.\"",
        responses: {
          kind: "Come here, say nothing else",
          playful: "Make him say it louder",
          bold: "Say it first",
          neutral: "Come closer without a word",
        },
      },
      {
        line: "He yells at everyone all day and comes home and is completely, quietly undone.",
        approach: "Stay",
        greeting:
          "\"Stay. I'll cancel everything. I've already canceled everything.\"",
        responses: {
          kind: "Hold him, say nothing more",
          playful: "Ask what it cost",
          bold: "Close the floor yourself",
          neutral: "Sit in the empty room",
        },
      },
      {
        line: "He drapes something absurdly expensive over your shoulders and refuses all thanks.",
        approach: "Wear it to bed",
        greeting:
          "\"Wear it to bed. I don't care that it's expensive, that's the POINT.\"",
        responses: {
          kind: "Wear it for him",
          playful: "Refuse the gift twice",
          bold: "Wear it, thank him anyway",
          neutral: "Let him rant",
        },
      },
      {
        line: "The money means nothing. He's finally, loudly, stopped pretending otherwise.",
        approach: "Let him admit it",
        greeting: '"I love you. HDY make me say it out loud. Ugh. I love you."',
        responses: {
          kind: "Say it back",
          playful: "Make him say it twice",
          bold: "Say it back just as loud",
          neutral: "Say nothing",
        },
      },
    ],
  },
  // temperamentDialogue removed: every line was moved onto a dialogue beat's
  // `greeting` — every tier's pool matched onto a beat exactly, nothing left
  // over.
  // The /call reveal lines for this character, keyed by the register in
  // WINNER_LINE_BUCKETS (constants/publicEncounters.js). Picked from at random
  // like the dialogue; {user} is the winner's mention and {name} their full
  // name, and the embed's winner line is the only place the reveal names
  // either of them. A register left out here falls back to the generic
  // WINNER_LINES pool.
  winnerLines: {
    new: [
      '"HDY waste my time." **{name}** snaps at {user}.',
      "{user} says the name, and **{name}** is already talking. About three things. At once.",
      '"Perfect timing. I need someone I can trust." **{name}** decides this about {user} instantly.',
    ],
    warm: [
      "**{name}** hangs up on a call mid-sentence to greet {user} properly. Suddenly the operation can wait.",
      '"Sit. The good seat. No, I didn\'t hold it. Shut up." **{name}** absolutely held it for {user}.',
      "{user} calls out, and **{name}** loudly tells someone else what a pain {user} is, beaming the whole time.",
    ],
    spark: [
      "\"I'm kind of happy to see you. Don't tell anyone.\" **{name}** says this to {user} at volume.",
      "{user} says the name, and **{name}** loses his thread entirely.",
      "**{name}** yells at three people on his way over to {user}, and none of it was about them.",
    ],
    close: [
      '"Somebody put that look on your face? Give me a name." **{name}** is already rolling his sleeves for {user}.',
      "**{name}** hears {user}, and whatever he was collecting on becomes somebody else's job.",
      '"Stand up straight. I only walk with quality." **{name}** fixes {user}\'s collar himself.',
    ],
    bound: [
      '**{name}** yells at everyone around them to shut up. Then, to {user}: "Now. You have my attention."',
      "**{name}** yells at everyone all day, reaches {user}, and goes completely, quietly undone.",
      "{user} says the name, and **{name}** claims them out loud.",
    ],
  },
};
