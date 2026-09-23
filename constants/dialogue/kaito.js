export default {
  // The level-up DMs (docs/bond-scene-dms.md). Kaito over-sends and then
  // apologizes for having sent; the intimacy is that he keeps hitting send
  // anyway. Kind is what reaches him, so every choice is really about whether
  // the reassurance he is fishing for actually arrives.
  //
  // The acquaintance scene opens the bond with him working up to asking
  // {firstName} to lunch, one-on-one, no Luca along for it. The ask itself
  // is reference.md's Home Screen "Morning 5" line, nearly verbatim
  // ("Luca's busy after class, so how about we hit up the diner? It's been
  // ages!"); the follow-up quotes his own "Default 3" self-own ("I could've
  // taken MC to lunch with that money! God, why am I such a moron?!"); the
  // choice prompt echoes "Idle 1" ("Am I being annoying?! I'm sorry!").
  //
  // Texting voice, per reference.md's "## Bond Scenes" notes: a sob emoji (😭)
  // surfaces when he's overwhelmed, his anxious questions almost always double
  // the "??", and he stretches letters when exasperated ("Urghhhh").
  bondScenes: {
    acquaintance: {
      beats: [
        "*Deleted message*\n\n*Deleted message*\n\n*Deleted message*",
        "**{firstName}**: Hey, Honor Roll!!\n\nokay, so, guess what, Luca's busy after class. How about we hit up the diner? It's been ages, right?",
        "Not a group thing, though. Just us. No Luca showing up halfway through to make it a whole thing. 😭\n\nYou've joined us {timesMet} times now and it's always been the three of us. Never just you and me. Kind of wanted to see what that's like, for once.",
      ],
      choice: {
        prompt: "Okay. Sent it. Can't unsend it now. *Please don't say no.*",
        options: [
          {
            key: "kind",
            label: "Say yes right away",
            style: 3,
            close:
              "WAIT REALLY??\n\nOkay, cool, cool.\n\n*He sends the diner's hours. Then the address, even though you both already know it. Then just: see you there.*",
          },
          {
            key: "playful",
            label: "Ask if it's a date",
            style: 1,
            close:
              "IT'S— okay, um. If you want to call it a date, I'm not gonna be the one to argue. I just wasn't going to call it one first, I don't think my heart could take it 😭",
          },
          {
            key: "bold",
            label: "Ask why not with Luca",
            style: 4,
            close:
              "*A long pause.*\n\n...because I wanted just one lunch where you're not looking past me at him. That's it.\n\n*Then, immediately:* ...okay that was a lot. Anyway! Ramen's on me. Get the good one, not the one Luca always orders, his taste is genuinely concerning.",
          },
        ],
      },
      keepsake: {
        emoji: "🍜",
        line: "The receipt from the diner, kept because he actually got you there.",
      },
    },

    friend: {
      beats: [
        "**{firstName}**: hey can I ask you something and you have to promise not to make it a whole thing",
        "You always come back with {favResponse}. Every single time. Even when I've been... you know. A lot. Even when I could hear myself being a lot.\n\nAnd I've been trying to work out why. Everyone else waits for me to run out of steam and then changes the subject, and I've gotten really good at not minding that. Professionally good.\n\nYou don't do the waiting thing. That's the question. Why don't you do the waiting thing??",
      ],
      choice: {
        prompt: "...Was that too much?? That was too much. Sorry.",
        options: [
          {
            key: "kind",
            label: "Tell him you like listening",
            style: 3,
            close:
              "*The typing indicator runs for a long time and produces one word.*\n\noh.\n\n*Then, four minutes later:* sorry I had to put the phone down for a sec 😭",
          },
          {
            key: "playful",
            label: "Say he's growing on you",
            style: 1,
            close:
              "LIKE MOLD??\n\nWait, no, I'm taking that as a win. That's a win. I'm screenshotting that and looking at it later, which is a normal thing people do.",
          },
          {
            key: "bold",
            label: "Tell him to stop apologizing",
            style: 4,
            close:
              "Sorr... okay. Not saying it.\n\nThat's really hard actually. Can I have one?? Just one, banked, for emergencies.",
          },
        ],
      },
      keepsake: {
        emoji: "📤",
        line: "The message he sent instead of deleting it, for once.",
      },
    },

    closeFriend: {
      beats: [
        "*It's late. The message isn't loud, which from him is the first sign something is off.*\n\n**{firstName}**: are you up\n\ndon't answer if you're not up. I'll be fine. I'm always fine.",
        "Collections came round again. It's handled. It's... I handled it. Mostly.\n\nI didn't tell anyone in the house because they'd look at me the way they look at me. Lucas would want to *help*. Jin would pay it and then own me forever, which honestly, you know, tempting.",
        "I just wanted to say it out loud to someone who's not going to fix it. Does that make sense?? I don't want it fixed, I want it to have been heard.\n\nYou're the only person I could think of at two in the morning. That's not a small thing for me. That's basically the biggest thing 😭",
      ],
      choice: {
        prompt: "Say something dumb so I stop feeling like this.",
        options: [
          {
            key: "kind",
            label: "Tell him you're staying up",
            style: 3,
            close:
              "You don't have to.\n\nStay up. Please stay up 😭 You can just leave the read receipt on, you don't even have to type, I just want to see it say online.\n\n*It says online until six.*",
          },
          {
            key: "playful",
            label: "Send him something stupid",
            style: 1,
            close:
              "*He reacts to it in under a second. Then sends four worse ones back. Then:* okay I'm laughing. I hate that that worked. thank you for making that work.",
          },
          {
            key: "bold",
            label: "Tell him you're coming over",
            style: 4,
            close:
              "WHAT... no, it's two in the...\n\n*He stops typing.*\n\n...The side door sticks. You have to lift it. I'll leave the light on.\n\n*He doesn't say a word when you get there. He just sits down against you on the floor of the kitchen with his head on your shoulder, and the two of you stay there until the ovens come on.*",
          },
        ],
      },
      keepsake: {
        emoji: "💡",
        line: "The kitchen light he left on for you at two in the morning.",
      },
    },

    confidant: {
      beats: [
        "**{firstName}**: okay I need you to read this whole thing before you say anything\n\nI've typed it out four times",
        "Everyone here has a thing. Lucas has the strength. Jin has the... being Jin. Tohma has whatever Tohma has, which I've decided not to look into.\n\nMy gran raised me on instant ramen and hand-me-downs. I don't know how I ended up in a house where everyone's family tree has a crest on it. Got in on a technicality, and I've spent nearly two years waiting for someone to notice and send me home. Every mission I'm the one you have to work around. I've known that the whole time.",
        "And the thing is I'm not brave, I'm not going to get brave, that's not... that's not a thing that's coming.\n\nBut I want to be. For you specifically, which I know is embarrassing, and I've decided to be embarrassing about it because you're the only person I've ever wanted to be worth something in front of.\n\nThat's it. That's the four drafts 😭",
      ],
      choice: {
        prompt:
          "Please say literally anything. The silence is doing numbers on me 😭",
        options: [
          {
            key: "kind",
            label: "Say he already is worth it",
            style: 3,
            close:
              "don't.\n\n*Then:* sorry. don't stop. say it again but slower, I want to actually hear it this time instead of deciding you didn't mean it.\n\n*So you say it again, slower. He goes quiet for a while, and when he comes back all he sends is a heart, which from him, who sends fourteen of everything, is the loudest thing he has ever done.*",
          },
          {
            key: "playful",
            label: "Point out he sent it anyway",
            style: 1,
            close:
              "...I did send it, didn't I.\n\nHuh. Put that on the list. Sent one (1) terrifying message. That's the bravest thing I've done all year and it was aimed at you, which tracks.",
          },
          {
            key: "bold",
            label: "Tell him to be brave right now",
            style: 4,
            close:
              "Right now?? Like... now now??\n\n*The phone rings before you can answer. He is audibly holding it with both hands.*\n\n> Hi. Hi. I called. That's the bravest thing available at this hour, I checked.\n\n*He doesn't hang up for an hour and a half, and mostly you both just breathe at each other.*",
          },
        ],
      },
      keepsake: {
        emoji: "📝",
        line: "The fifth draft, the one he actually sent.",
      },
    },

    devoted: {
      beats: [
        "**{firstName}**: don't be mad\n\nI did something",
        "*The photo is his hand, wrapped badly, the bandage clearly done one-handed by somebody who has never bandaged anything.*\n\nSo there was a thing in the corridor and it was going for you and I did the... I did a shout. I shouted at it. Really loud. And it looked at me instead.\n\nWhich was the plan! That was the entire plan! I don't have a second part of the plan, that was it, and it WORKED.",
        "Yuri says it's fine in like a week. Yuri also said \"fascinating\" twice, which I've decided not to think about.\n\nI'm not telling you so you'll feel bad. I'm telling you because I've spent my whole life being the one who runs, and tonight I was in front of you and I didn't, and I need someone to know that happened. Specifically you. Only you, really 😭",
      ],
      choice: {
        prompt: "Was that... did I do good?? Tell me I did good.",
        options: [
          {
            key: "kind",
            label: "Tell him he did good",
            style: 3,
            close:
              "*There's no reply for a bit. Then a voice note, four seconds long, of him just breathing out.*\n\n*Then:* okay. okay. I'm going to listen to you say that on a loop probably forever.\n\n*When you find him he lets you redo the bandage properly, and he watches your hands the whole time and doesn't say one word.*",
          },
          {
            key: "playful",
            label: "Critique the bandage work",
            style: 1,
            close:
              "IT'S STRUCTURALLY SOUND.\n\nIt is not structurally sound. It came off twice. Please come and do it 😭 I've been sitting here for an hour hoping you'd offer so I wouldn't have to ask.",
          },
          {
            key: "bold",
            label: "Tell him never to do it again",
            style: 4,
            close:
              "...No.\n\n*It's the flattest thing he's ever sent you. No caps, no scramble, nothing.*\n\nSorry. Anything else. Not that. I said I wanted to be your knight in shining armor and everyone thought it was a bit, including me, honestly. It wasn't a bit.",
          },
        ],
      },
      keepsake: {
        emoji: "🩹",
        line: "The bandage he did wrong, so you'd have to do it right.",
      },
    },

    soulbound: {
      beats: [
        "**{firstName}**: I'm not going to chicken out this time. I've told three people I'm doing this so I can't chicken out.\n\n(One of them offered to sit here while I typed it. I said no. Now I'm alone and it's worse.)",
        "{timesMet} times. I counted them on the calendar app like a complete lunatic, I have a color for you and everything.\n\nEvery single one of them I've thought, this is it, this is the day I say it, and then you smile at something and my entire brain leaves.",
        "And I know what I am. I'm the one everyone's nice about, the one you're kind to. I've had my whole life to get used to that.\n\nBut you're not kind to me. You... you *pick* me. You keep picking me and I don't understand it and I've stopped trying to.\n\nMy gran used to say that, actually. Kindness isn't luck, it's a decision somebody keeps making about you. I was fourteen, said \"okay grandma\" and rolled my eyes so hard. I get it now.",
        "So here it is and I'm not deleting it.\n\nI love you. I've loved you since way before I was allowed to, since before I was anything worth loving back, and I'm saying it out loud with my whole chest for once instead of hiding it in nine messages at once.\n\nYou don't have to say it. Genuinely. I've already done the impossible part 😭",
      ],
      choice: {
        prompt:
          "Okay. I'm going to put the phone face down now. Do your worst.",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close:
              "*The phone is face down for exactly eleven seconds.*\n\n*Then it's a call, then it's him at your door out of breath with his jacket on inside out, and he gets about half of* I ran *out before you pull him in, and he holds onto you like someone who genuinely expected to be turned away and has no plan for this at all.*\n\n> Say it again.\n\n*he says into your shoulder.*\n\n> Sorry. Say it like ninety more times.",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close:
              "Yeah! Yeah, of course, that's... that's completely fine, that's so fine.\n\n*Then, with none of the scramble in it:*\n\nI mean it. Take ages. I've been carrying this around for two years, I'm extremely good at carrying it, it's basically the one thing I'm good at.\n\nAnd I'll still be here being annoying at you tomorrow. That was never conditional. That was never even a question.",
          },
        ],
      },
      keepsake: {
        emoji: "📨",
        line: "The message he told three people about so he couldn't take it back.",
      },
    },
  },
  dialogue: {
    new: [
      {
        line: "He's pressed into a doorway watching the hall, and startles hard when he clocks you. \"Oh...thank god, it's just you.\"",
        approach: "Say hi before he bolts",
        greeting: '"YO... sorry. Hi. You came around the corner really fast."',
        responses: {
          kind: ["Tell him he's doing fine", "Reassure him you're friendly"],
          playful: ["Laugh at the jump scare", "Ask if he always does that"],
          bold: ["Ask why he's on edge", "Step into his hiding spot"],
          neutral: ["Nod along", "Give him a second"],
        },
      },
      {
        line: "He's mid-rant about something leaked on WickHive before he's said hello. You've just become the audience.",
        approach: "Follow the noise",
        greeting:
          '"Wait, have you been on WickHive yet? No? Okay, okay, so get this..."',
        responses: {
          kind: ["Let him finish the story", "Listen with real interest"],
          playful: ["Out-shout him", "Egg the rant on further"],
          bold: ["Ask him to get to the point", "Talk over the rant"],
          neutral: ["Let him run out of steam", "Half-listen, say nothing"],
        },
      },
      {
        line: "He straightens up when you ask. Being the guy who knows things about Darkwick is a role he'd very much like to have.",
        approach: "Ask him something",
        greeting:
          "\"You're new, right? I'm Kaito. That's... that's the whole intro, sorry.\"",
        responses: {
          kind: ["Let him show off for once", "Ask something easy first"],
          playful: ["Ask a trick question", "Test how savvy he really is"],
          bold: ["Call his bluff", "Ask why he's in Frostheim"],
          neutral: ["Just listen", "Take the intro at face value"],
        },
      },
      {
        line: 'He waves so hard he nearly clips a lamp. "Hey! Over here! Hiya!"',
        approach: "Wave back",
        greeting: '"You actually came over! Okay, be cool. ...Hi!"',
        responses: {
          kind: ["Wave back warmly", "Say the lamp is fine"],
          playful: ["Get swept up in his energy", "Wave even harder back"],
          bold: ["Tell him to calm down", "Ask why he's so loud"],
          neutral: ["Give a small wave back", "Nod instead of waving"],
        },
      },
      {
        line: "He offers you half of whatever he's snacking on before he thinks to ask your name.",
        approach: "Take the offered half",
        greeting:
          '"Here, take half. Nobody really shares around here. I noticed pretty fast."',
        responses: {
          kind: ["Accept the offered half", "Share something back"],
          playful: ["Steal more than your half", "Ask what's in it first"],
          bold: ["Take the whole thing", "Make him ask your name"],
          neutral: ["Take the food, stay quiet", "Start eating, say nothing"],
        },
      },
    ],
    known: [
      {
        line: "He lights up when he spots you, then immediately checks whether he's bothering you.",
        approach: "Tell him he isn't a bother",
        greeting: '"You keep showing up. I... that\'s nice. I like that."',
        responses: {
          kind: ["Say he's never a bother", "Reassure him warmly"],
          playful: ["Tease him for checking", "Ask if he's always nervous"],
          bold: ["Tell him to stop asking", "Say it's fine, drop it"],
          neutral: ["Say it's fine", "Shrug it off"],
        },
      },
      {
        line: 'He shows up with a tin of something lopsided and vaguely cookie-shaped. "I made these! Don\'t ask how many batches it took."',
        approach: "Try what he baked",
        greeting:
          '"I made extra cookies. It\'s not a big deal. Just... take some. Please."',
        responses: {
          kind: ["Praise the cookies kindly", "Thank him for baking"],
          playful: ["Guess how many batches", "Tease the lopsided shape"],
          bold: ["Demand the recipe", "Take a handful, no asking"],
          neutral: ["Take one, say nothing", "Eat it without comment"],
        },
      },
      {
        line: "He shows you the same WickHive video he showed you yesterday. You let him.",
        approach: "Watch the video again",
        greeting:
          "\"Have you been on WickHive? Someone leaked next month's cafeteria menu. ...Oh. I already told you that, didn't I.\"",
        responses: {
          kind: ["Watch it again, patiently", "Let him have the moment"],
          playful: ["Recite the punchline first", "Pretend it's brand new"],
          bold: ["Tell him you've seen it", "Call out the repeat"],
          neutral: ["Watch without saying anything", "Nod along quietly"],
        },
      },
      {
        line: "He's ducking around a corner. \"Shit, it's Luca, he's off to train, I gotta... oh. Just you. Phew.\"",
        approach: "Tell him the coast is clear",
        greeting:
          '"If he spots me he\'ll make me run laps with him. I can\'t. I would actually die."',
        responses: {
          kind: ["Say he doesn't have to go", "Reassure him it's just you"],
          playful: ["Tease him for hiding", "Offer to run laps instead"],
          bold: ["Tell him to just go train", "Call out the excuse"],
          neutral: ["Let him explain in his time", "Wait for him to relax"],
        },
      },
      {
        line: "You've been upgraded from stranger to person Kaito waves at across the whole courtyard.",
        approach: "Wave across the courtyard",
        greeting:
          '"Oh hey, it\'s you again! I mean, not that I was counting or anything. Okay, maybe a little."',
        responses: {
          kind: ["Wave back just as happily", "Say you're glad to be spotted"],
          playful: ["Tease him about counting", "Ask how long he's tracked it"],
          bold: ["Call it out as counting", "Wave first next time"],
          neutral: ["Wave back, say nothing", "Return the wave plainly"],
        },
      },
      {
        line: "He's bracing himself for a summons that hasn't come yet, and somehow you're his moral support now.",
        approach: "Go with him to Tohma",
        greeting:
          '"Noooo, Tohma wants to see me. That\'s never good. Come with me? Please?"',
        responses: {
          kind: ["Agree to go with him", "Promise to stay close"],
          playful: ["Tease him about the nerves", "Ask what he did this time"],
          bold: ["Tell him to face it head-on", "March him there yourself"],
          neutral: ["Go along without comment", "Wait outside quietly"],
        },
      },
      {
        line: "He fumbles his phone trying to show you something and drops it twice before he just tells you instead.",
        approach: "Let him just tell you",
        greeting:
          '"Okay, hold on, it\'s... no. Forget the phone. So basically..."',
        responses: {
          kind: ["Listen patiently instead", "Say the phone doesn't matter"],
          playful: ["Offer to catch the phone", "Tease him about the fumble"],
          bold: ["Grab the phone yourself", "Tell him to just say it"],
          neutral: ["Wait him out calmly", "Let him get there eventually"],
        },
      },
      {
        line: "He's saved you a seat before you even got there, then acts like it was an accident.",
        approach: "Take the seat he saved",
        greeting:
          "\"Oh, that seat? It was just open. I wasn't saving it. ...Okay, I was saving it.\"",
        responses: {
          kind: ["Say you'd have saved his too", "Sit down gratefully"],
          playful: [
            "Call out the fake accident",
            "Ask if he saved it on purpose",
          ],
          bold: ["Sit like it's expected", "Say you'd have found a seat"],
          neutral: ["Sit without remarking on it", "Take the seat quietly"],
        },
      },
      {
        line: '"You actually remembered that?" He looks stupidly pleased you kept track of something he said in passing.',
        approach: "Say you remembered",
        greeting:
          '"Oh my god. You were actually listening to me? Like, actually?"',
        responses: {
          kind: ["Say it mattered to you too", "Smile and say of course"],
          playful: ["Act smug about remembering", "Ask what else you remember"],
          bold: ["Ask why that surprises him", "Ask if he expected less"],
          neutral: ["Shrug, say it's nothing", "Let the moment pass"],
        },
      },
      {
        line: "He's mid-apology for something that wasn't his fault before you've even asked what happened.",
        approach: "Tell him it's okay",
        greeting: '"Sorry! Sorry. I know, I\'m doing it again. Sorry."',
        responses: {
          kind: [
            "Tell him it's not his fault",
            "Say there's nothing to forgive",
          ],
          playful: ["Point out the apology again", "Count how many sorries"],
          bold: ["Tell him to stop apologizing", "Cut the apology short"],
          neutral: ["Let the apology run its course", "Wait for him to finish"],
        },
      },
      {
        line: '"Okay but don\'t laugh," he says, already laughing at himself first.',
        approach: "Promise not to laugh",
        greeting:
          '"You actually laughed at my joke. That was a real laugh, right? Not a pity laugh?"',
        responses: {
          kind: ["Laugh with him kindly", "Say the joke was actually good"],
          playful: ["Laugh anyway, unashamed", "Tell him it wasn't that funny"],
          bold: ["Laugh loudly on purpose", "Dare him to say it again"],
          neutral: ["Keep a straight face", "Let the joke pass quietly"],
        },
      },
      {
        line: "He checks his phone for a message from you more than he'd ever admit to.",
        approach: "Say you were thinking of him",
        greeting:
          "\"Oh! It's you! I wasn't checking my phone. Why would I be checking my phone.\"",
        responses: {
          kind: ["Send him something small", "Say you thought of him too"],
          playful: [
            "Catch him checking his phone",
            "Ask who he's hoping texted",
          ],
          bold: ["Ask if he's waiting on you", "Call out the phone-checking"],
          neutral: ["Say nothing, let it be", "Ignore the phone check"],
        },
      },
      {
        line: 'He\'s gotten brave enough to save your contact under something other than just "Honor Roll."',
        approach: "Ask what he calls you",
        greeting:
          "\"What? No, you can't see it. It's not weird, okay? It's just not 'Honor Roll' anymore.\"",
        responses: {
          kind: [
            "Ask what he called you sweetly",
            "Say you're glad it's not that",
          ],
          playful: ["Guess the nickname first", "Demand to see the contact"],
          bold: ["Make him say it out loud", "Insist on knowing the name"],
          neutral: ["Let him keep the secret", "Don't ask, let it be"],
        },
      },
    ],
    warm: [
      {
        line: "He's saved you a seat at the diner and is very obviously proud of himself for thinking of it.",
        approach: "Slide into the booth",
        greeting: "\"You free? Say you're free. Please say you're free.\"",
        responses: {
          kind: ["Tell him it was thoughtful", "Say you're free, all evening"],
          playful: ["Ask if he hoped you'd come", "Make him sweat a second"],
          bold: ["Take the seat like you own it", "Say yes before he finishes"],
          neutral: ["Sit down without a word", "Take the seat, no fuss"],
        },
      },
      {
        line: '"There you are!". Like you\'d been the missing piece of his afternoon.',
        approach: "Greet him back",
        greeting:
          '"Hi! I was just... okay, this\'ll sound weird... I was just thinking about you."',
        responses: {
          kind: ["Admit he crossed your mind", "Say that's not weird at all"],
          playful: ["Ask what he was thinking", "Ask if it was flattering"],
          bold: ["Say it fits you well", "Ask what else he thinks"],
          neutral: ["Greet him back plainly", "Say hello, nothing more"],
        },
      },
      {
        line: "He talks faster when you turn up. Everyone in the room has noticed. He hasn't.",
        approach: "Match his grin",
        greeting:
          "\"They want me on another mission. It's not like me being there helps anyone. ...You showing up, though. That part's good.\"",
        responses: {
          kind: ["Listen through the rush", "Say he does help, truly"],
          playful: ["Point out he's speeding up", "Time how fast he's talking"],
          bold: ["Say you make him nervous", "Tell him to slow down"],
          neutral: ["Match his energy quietly", "Let him talk it out"],
        },
      },
      {
        line: '"It\'s on me today," he says, patting a pocket that did well at something he won\'t name. "Get whatever you want."',
        approach: "Let him treat you",
        greeting:
          '"Got a bit of spare cash this month, don\'t ask, so lunch is on me. Get whatever."',
        responses: {
          kind: ["Say next lunch is on you", "Say he didn't have to"],
          playful: ["Order the most expensive thing", "Order dessert first"],
          bold: ["Ask where the cash came from", "Ask what he bet on"],
          neutral: ["Take the offer, say nothing", "Order something small"],
        },
      },
      {
        line: "He's practicing a greeting under his breath when you catch him at it. \"Ack! How long've you been there?!\"",
        approach: "Catch him practicing",
        greeting:
          "\"Am I being annoying? Tell me if I'm being annoying. You're probably busy.\"",
        responses: {
          kind: ["Reassure him it sounded fine", "Say he's never annoying"],
          playful: ["Repeat his greeting back", "Give it a score out of ten"],
          bold: ["Ask for the real greeting", "Tell him to try it again"],
          neutral: ["Pretend you didn't hear it", "Let him recover first"],
        },
      },
    ],
    spark: [
      {
        line: "He goes red mid-sentence and completely loses the sentence.",
        approach: "Let him recover",
        greeting:
          "\"I'm not blushing, it's warm in here. It's Frostheim, I KNOW how that sounds, don't.\"",
        responses: {
          kind: "Tell him he did fine",
          playful: "Make him blush harder",
          bold: "Call out the blush directly",
          neutral: "Pretend you didn't catch it",
        },
      },
      {
        line: '"Do you... okay, this\'ll sound weird... do you actually pay attention to me? Because it kind of seems like you do."',
        approach: "Say you noticed too",
        greeting:
          '"You actually notice stuff about me. Do you know how weird that is? Good weird. Really good weird."',
        responses: {
          kind: "Say you noticed on purpose",
          playful: "Repeat it back to him",
          bold: "Put him on the spot",
          neutral: "Shrug, say you don't know",
        },
      },
      {
        line: "He's turning the pendant over between two fingers without noticing he's doing it. \"My gran gave me this. It's... yeah. I don't usually let people ask about it, so don't get used to it.\"",
        approach: "Hear him out",
        greeting:
          "\"Okay so, don't laugh, I think about you kind of a lot. That's the thing. That's all of it.\"",
        responses: {
          kind: "Ask about the pendant",
          playful: "Tease him for fidgeting",
          bold: "Ask him to tell you the story",
          neutral: "Let him decide what to share",
        },
      },
      {
        line: "He starts to ask you something, bails, starts again, bails again.",
        approach: "Let him stumble through it",
        greeting:
          '"Okay. Okay! Do you wanna... hang out? Like, just us? You can say no! ...Please don\'t say no."',
        responses: {
          kind: "Let him say it badly",
          playful: "Guess wildly at the question",
          bold: "Tell him to just ask already",
          neutral: "Let him flail",
        },
      },
      {
        line: '"There\'s this spot where you can see the stars really well," he tells his shoes. "I just... thought maybe. Sometime."',
        approach: "Ask to see the spot",
        greeting:
          "\"Wait, you want to? Like, actually? Okay. Okay! It's a bit of a walk. I'll go first. Or you go first. Sorry.\"",
        responses: {
          kind: "Say you'd love to see it",
          playful: "Tease him for stalling",
          bold: "Say it for him",
          neutral: "Wait for him to ask outright",
        },
      },
      {
        line: "He catches your sleeve when you go to leave and has no plan for after that.",
        approach: "Take his hand",
        greeting:
          '"Can I... is it okay if I hold your hand? Cool. Cool cool cool."',
        responses: {
          kind: "Lace your fingers with his",
          playful: "Refuse to let go of his hand",
          bold: "Pull him in by the collar",
          neutral: "Let go first",
        },
      },
    ],
    close: [
      {
        line: '"You came," he says, like he\'d half-braced for you not to.',
        approach: "Tell him you're glad too",
        greeting:
          '"You made it! I was kind of scared you wouldn\'t, honestly."',
        responses: {
          kind: "Tell him he's enough as he is",
          playful: "Laugh along with him",
          bold: "Say you'd never miss it",
          neutral: "Be his calm",
        },
      },
      {
        line: "The grin drops for a second, pure relief, before it comes roaring back.",
        approach: "Take the good chair",
        greeting:
          '"I saved you the good chair. Don\'t make it a thing, just sit."',
        responses: {
          kind: "See past the grin",
          playful: "Tease him about the relief",
          bold: "Push past the grin",
          neutral: "Sit through the quiet part",
        },
      },
      {
        line: '"Don\'t laugh," he says, already braced for it, "but I bake when I can\'t sleep, and there\'s a lot of cookies right now."',
        approach: "Eat the extra cookies",
        greeting:
          '"I baked way too much again. That\'s a you-problem now. Sit down."',
        responses: {
          kind: "Thank him for the cookies",
          playful: "Raid the cookie stash",
          bold: "Demand more cookies",
          neutral: "Eat quietly, say nothing",
        },
      },
      {
        line: "He picks the conversation up mid-sentence, like it never actually stopped.",
        approach: "Answer him mid-sentence",
        greeting:
          '"Whatever you were doing can wait, right? You\'re here now."',
        responses: {
          kind: "Pick the thread up with him",
          playful: "Start the trouble yourself",
          bold: "Tell him to keep up",
          neutral: "Let him catch his breath",
        },
      },
      {
        line: "He'd been watching the door. He'll deny it. He was.",
        approach: "Call out the wait",
        greeting:
          "\"I don't say this a lot, but... yeah. Really glad it's you.\"",
        responses: {
          kind: "Notice the part he plays off",
          playful: "Tease him about watching",
          bold: "Demand the honest version",
          neutral: "Let him have his denial",
        },
      },
    ],
    bound: [
      {
        line: "He kisses you and forgets whatever he was in the middle of saying.",
        approach: "Kiss him back",
        greeting: '"C\'mere. No reason. Okay, one reason. Come HERE."',
        responses: {
          kind: "Kiss him first this time",
          playful: "Ask what he forgot",
          bold: "Kiss him first",
          neutral: "Let the kiss speak instead",
        },
      },
      {
        line: "\"I still can't believe it's you,\" he says, tucked against your shoulder.",
        approach: "Go to him",
        greeting:
          "\"I got you something. It's dumb. You're getting it anyway.\"",
        responses: {
          kind: "Say it back",
          playful: "Re-gift the dumb gift",
          bold: "Open the gift immediately",
          neutral: "Let him ramble",
        },
      },
      {
        line: "\"I know I'm not... y'know. Brave. But I'm working on it. For you I'm working on it.\"",
        approach: "Say it back",
        greeting:
          '"You mean that? Okay. ...Okay. Then I\'m gonna keep going, scary parts and all."',
        responses: {
          kind: "Tell him he already shows up",
          playful: "Make him say it louder",
          bold: "Say it before he can",
          neutral: "Let him keep working at it",
        },
      },
      {
        line: "He wakes you by being unable to stop looking at you, somehow loudly.",
        approach: "Five more minutes",
        greeting: '"Five more minutes. Then five more. Don\'t argue."',
        responses: {
          kind: "Stay the five minutes",
          playful: "Refuse to get up",
          bold: "Refuse the five minutes",
          neutral: "Let the morning be slow",
        },
      },
      {
        line: "He's still a little embarrassed by how much he means it. He's never once wanted it to stop.",
        approach: "Say you don't mind",
        greeting:
          '"You\'re stuck with me. You know that, right? Like... permanently."',
        responses: {
          kind: "Say you don't mind at all",
          playful: "Tease him about being stuck",
          bold: "Tell him he's got no choice",
          neutral: "Stay quiet and close",
        },
      },
    ],
  },
  // No temperamentDialogue pool: every leftover line was placed onto a
  // dialogue beat's `greeting`.
  // When the old per-tier `responses` pool was folded onto the beats above,
  // three `new`-tier labels had no genuine beat match ("Wave off the burden
  // question", "Bet him he won't", "Push him to commit") and were dropped
  // rather than force-placed.
  // The /call reveal lines for this character, keyed by the register in
  // WINNER_LINE_BUCKETS (constants/publicEncounters.js). Picked from at random
  // like the dialogue; {user} is the winner's mention and {name} their full
  // name, and the embed's winner line is the only place the reveal names
  // either of them. A register left out here falls back to the generic
  // WINNER_LINES pool.
  winnerLines: {
    new: [
      '**{name}** jumps a foot. "Eeeek?! Oh, it\'s just you." {user} had only said his name.',
      '"Wait, you know my name?" **{name}** looks at {user} like it\'s a prize.',
      "{user} calls out, and **{name}** startles, recovers, and pretends he didn't.",
    ],
    warm: [
      '"There you are!" **{name}** is talking to {user} at top speed already.',
      "{user} says his name, and **{name}** lights up like it's going in his story later.",
      "**{name}** was halfway into a WickHive rant. {user} turning up improved it enormously.",
    ],
    spark: [
      "**{name}** goes red before he's finished turning around. {user} does that to him now.",
      '"You... you called ME." **{name}** is going to bring this up to {user} for a week.',
      "{user} got there first, and **{name}** forgot every word of what he was saying.",
    ],
    close: [
      "**{name}** is through the crowd before {user} finishes the second syllable.",
      "\"Please don't leave again,\" **{name}** says into {user}'s shoulder. Half joking.",
      "{user} calls, and **{name}** doesn't check who's watching.",
    ],
    bound: [
      "\"I still can't believe it's you,\" **{name}** says, arriving at {user} at a run.",
      "**{name}** had been working up the nerve for something. {user} calling out did the work for him.",
      "{user} says the name, and **{name}** decides he can be brave today after all.",
    ],
  },
};
