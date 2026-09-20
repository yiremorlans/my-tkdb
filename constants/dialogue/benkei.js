export default {
  // The level-up DMs (docs/bond-scene-dms.md).
  //
  // SOURCE NOTE: reference.md now carries a (short) entry for Benkei. Everything
  // below is written to stay inside it: shopkeep at Darkwick's campus store,
  // former professor and advisor to the now-defunct Clementia House and Ultio
  // House, kind hearted, warm and gentle smile, managed day-to-day by one of
  // Cornelius' cats. He was a young professor, not an old one, and talks
  // casually rather than formally or old-fashioned (no "shan't," "needn't,"
  // etc.). No name for anyone but himself, and no reason either house ended.
  // None of that is invented here.
  //
  // The one piece of connective tissue added on top of canon: a man who used to
  // be responsible for a whole house of people, now answers to a cat, and is
  // still working out whether that was a demotion or a mercy. That throughline
  // is interpretation, not established fact, but it's the thread every scene
  // below pulls on.
  bondScenes: {
    acquaintance: {
      beats: [
        "**{firstName}**: Hey, it's Benkei, from the shop. Hope you don't mind the message. My manager insisted, and when your manager's a cat, you learn not to argue.",
        "There's a shelf under the counter with a few things set aside on it. Nothing dramatic. All {timesMet} times you've been in, I noticed you actually read the labels instead of grabbing and going, and not many people do that.",
      ],
      choice: {
        prompt:
          "Come by and grab it sometime? I'd rather it not just sit there.",
        options: [
          {
            key: "kind",
            label: "Say you'll come by soon",
            style: 3,
            close: "Oh, good. Good.\n\nI'll tidy the shelf before you come by.",
          },
          {
            key: "playful",
            label: "Ask what's on the shelf",
            style: 1,
            close:
              "That'd spoil the whole thing, wouldn't it.\n\nI'm bad at keeping secrets, so come by soon.",
          },
          {
            key: "bold",
            label: "Ask why you got noticed",
            style: 4,
            close:
              "Would you like the honest answer? You're the only person who's ever asked to meet the cat.\n\nShe sat up when I mentioned you. I've not once seen her sit up for anyone.",
          },
        ],
      },
      keepsake: {
        emoji: "🏷️",
        line: "A few things on the shelf under the counter, kept for someone who reads the labels.",
      },
    },

    friend: {
      beats: [
        "**{firstName}**: Can I just say something?",
        "You've got {favResponse} for me every time you come in, and you actually stop to talk to me, not just breeze past to see the cat like everybody else. I spent a long time being called \"Professor\" by people who mostly wanted something out of me. This is a different thing entirely, and I don't think you even realize you're doing anything unusual.",
      ],
      choice: {
        prompt: "There. You don't have to answer, I won't be offended.",
        options: [
          {
            key: "kind",
            label: "Say he's worth talking to",
            style: 3,
            close:
              "Oh...\n\n*A long gap.*\n\nThanks. I'm going to be turning that over for a good while, which is more than I've gotten out of most conversations lately.",
          },
          {
            key: "playful",
            label: "Say he beats 'Professor'",
            style: 1,
            close:
              "Lower bar than you'd think. Most people who called me that wanted a signature, not a conversation.\n\nYou're neither, and it took me a while to notice that's rarer than it should be.",
          },
          {
            key: "bold",
            label: "Ask if he misses the title",
            style: 4,
            close:
              "Sometimes.\n\nNot the standing at the front of a room. The being needed for something particular. I've made my peace with it. Mostly.",
          },
        ],
      },
      keepsake: {
        emoji: "🫖",
        line: "The first real conversation in a good while that wasn't with the cat.",
      },
    },

    closeFriend: {
      beats: [
        "**{firstName}**: Come by after closing, if you can. I've got something in the back I want to show somebody, and I've been waiting for the right somebody to show it to.",
        "*The back room has a drawer that doesn't get opened often. He opens it carefully.*\n\n*It's two pins, one crimson-trimmed and one iron-gray, and a photograph gone soft at the corners.*",
        "That one's Clementia's. That one's Ultio's. I advised them both, in their time, and neither house exists anymore, so there's nobody left who asks after them.\n\nYou've been coming around a good while now. I decided you were somebody who might actually want to see it, rather than just be polite about it.",
      ],
      choice: {
        prompt:
          "Tell me if I've misjudged that. I've got thick skin, I'd rather know.",
        options: [
          {
            key: "kind",
            label: "Ask to hear about them",
            style: 3,
            close:
              "*He turns the pins over in his hand for a moment.*\n\nAll right.\n\n*he says, to the drawer as much as to you.*\n\nAll right, then.\n\n*He doesn't put them away that night.*",
          },
          {
            key: "playful",
            label: "Ask which house was worse",
            style: 1,
            close:
              "Ultio, without question. Clementia at least pretended to listen to me.\n\n*He says it fondly.*\n\nI've missed being exasperated by a whole house of people. It's a very particular kind of tired.",
          },
          {
            key: "bold",
            label: "Ask if that's a lonely thing",
            style: 4,
            close:
              "*He goes quiet for a moment, turning the photograph rather than looking up.*\n\nYes.\n\n*he says simply.*\n\nI hadn't said that plainly to anyone before. I'm glad it's said now.",
          },
        ],
      },
      keepsake: {
        emoji: "📌",
        line: "Two house pins from houses that don't exist anymore, out of their drawer for someone who actually asked.",
      },
    },

    confidant: {
      beats: [
        "**{firstName}**: It's late, and I'm going to say a thing I don't say, and I'd ask you not to be kind about it straight away. Let it sit a moment first.",
        "I used to be responsible for an entire house of people. Advising them, arguing with them, worrying over the ones who skipped breakfast. And now I'm responsible for a shelf of snacks and a schedule set by a cat, and most days I don't mind that at all, which is the part that troubles me.",
        "I've turned it over a great many times: whether it was a demotion or a mercy. I still don't know. I only know I've never said any of that aloud before, and I'm saying it to you because you're the one who actually asks how I'm doing, rather than what I've got in stock.",
      ],
      choice: {
        prompt: "There. Go on. I've braced myself and everything.",
        options: [
          {
            key: "kind",
            label: "Say it sounds like both",
            style: 3,
            close:
              "Both.\n\n*He tests the word.* Yes. I think that's probably the honest shape of it. Thank you for not making me choose.",
          },
          {
            key: "playful",
            label: "Say the cat has good taste",
            style: 1,
            close:
              "She'd agree with you, and never let me hear the end of it.\n\n*A real, surprised laugh.* I needed that more than I expected.",
          },
          {
            key: "bold",
            label: "Ask if he misses Professor",
            style: 4,
            close:
              "*A longer pause than the question wants.*\n\nSome days. Less than I thought I would, and that frightens me a little, if I'm honest.",
          },
        ],
      },
      keepsake: {
        emoji: "🗝️",
        line: "The truth about the shelf and the cat, told plainly for the first time.",
      },
    },

    devoted: {
      beats: [
        "**{firstName}**: You'll probably hear about this by now anyway. I'd rather you heard it from me, and I'd rather you didn't hear some heroic version of it, because there isn't one.",
        "There was a guy in the shop at closing who shouldn't have been there, and he'd come in about you, and I asked him to leave. He didn't. So I stood in the doorway and used a voice I haven't needed since I stopped being anyone's advisor.",
        "He left. People generally do, when somebody won't move and means it. And I've been sitting in the back since, honestly surprised at myself, because I'd figured that part of me had gone quiet along with the title.",
      ],
      choice: {
        prompt: "Now don't fuss. I've had quite enough fussing already today.",
        options: [
          {
            key: "kind",
            label: "Fuss anyway",
            style: 3,
            close:
              "I said not to.\n\n*He lets you, though. He doesn't argue about a single thing.*\n\nIt's nice.\n\n*he admits eventually.*\n\nBeing looked after. I'd nearly forgotten what that felt like from this side of it.",
          },
          {
            key: "playful",
            label: "Ask if he did the stern voice",
            style: 1,
            close:
              "I did a tremendous voice. Advising a house teaches you exactly one, but it's a good one.\n\n*He looks unbearably pleased with himself, and there's been nobody to tell until now.*",
          },
          {
            key: "bold",
            label: "Tell him not to do it again",
            style: 4,
            close:
              "No.\n\n*Flat, with none of the usual fluster in it.*\n\nAnything else you ask of me, I'll do. Not that one.\n\n*Then, gentler:*\n\nCome sit down. I've put the kettle on.",
          },
        ],
      },
      keepsake: {
        emoji: "🚪",
        line: "A doorway held by someone who thought that part of him had gone quiet.",
      },
    },

    soulbound: {
      beats: [
        "**{firstName}**: I've written this out because I think better with a pen, and I'm reading it back to you word for word so I don't lose my nerve partway through.",
        "{timesMet} times you've come through that door. I've kept count without meaning to, and there's a thing on the shelf for every single one, and I couldn't bring myself to throw out a single one of them.",
        "I'm not exactly smooth at this, and I'd like that said plainly before anything else, because I've spent a long while treating it as a reason to stay quiet rather than a reason to say something sooner.",
        "So here it is, and then I'll put the kettle on and let you think.\n\nI love you. I ran two houses into the ground, or watched them go, at any rate, and ended up answering to a cat, and I did not expect any part of that story to lead here. I'm glad it did. There's no expectation in this. I'd simply rather you knew than let another year pass with it unsaid.",
      ],
      choice: {
        prompt:
          "Take whatever time you need. The kettle's on and the shop isn't going anywhere, and neither am I.",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close:
              "*He doesn't reply right away, which isn't like him.*\n\n*When you get to the shop the door's unlocked, and he's standing behind the counter with the page still in his hand, clearly having stood there a while.*\n\nSay it here.\n\n*he says.*\n\nWhere I can see you say it.\n\n*Afterward he holds both your hands across the counter and doesn't manage another word for quite some time.*",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close:
              "Of course. Of course, take it. I'd think less of you if you didn't.\n\nAnd I want to be clear, because I know how these things can curdle: nothing changes. The shelf stays. There'll be something set aside on Thursday same as every Thursday, and I'll be glad to see you regardless. None of this was ever a bid for anything back.",
          },
        ],
      },
      keepsake: {
        emoji: "🧾",
        line: "The page he read back word for word so he wouldn't lose his nerve.",
      },
    },
  },
  // `new` through `bound` (except `spark`, see its own note) are paired
  // beats — { line, approach, greeting, responses } — so the /roam button,
  // the payoff caption, and the four response buttons all answer the scene
  // the line just set, rather than being drawn from separate pools at random
  // (docs/dialogue-approach-pairing.md).
  // `approach`/`greeting` may be an array when more than one reaction
  // genuinely fits the same beat. A beat with no `greeting` had no genuine
  // match left in temperamentDialogue and falls through to an independent
  // draw from whatever's left there, same as before this existed.
  dialogue: {
    new: [
      {
        line: 'He looks up from restocking, a little flustered, and gives you a warm, gentle smile. "Oh! Hello. Can I help you find something?"',
        approach: "Say hello",
        greeting: '"Oh! Didn\'t hear the bell. Sorry, come on in."',
        responses: {
          kind: ["Greet him warmly", "Return his smile"],
          playful: ["Ask if they're closed", "Say something to make him grin"],
          bold: ["Ask him straight out", "Say you're just browsing"],
          neutral: ["Let him restock in peace", "Nod and start looking around"],
        },
      },
      {
        line: '"That\'s my manager," he says, nodding at a cat asleep on the counter, like it explains everything. It somehow does.',
        approach: "Say hi to the cat too",
        greeting:
          '"She doesn\'t usually let people pet her. But she might make an exception for you."',
        responses: {
          kind: ["Say he's no trouble either", "Compliment the cat"],
          playful: ["Ask if the cat agrees", "Joke about taking cat orders"],
          bold: ["Ask who's really in charge", "Say you trust the cat more"],
          neutral: ["Watch the cat instead", "Let the cat sleep in peace"],
        },
      },
      {
        line: "He's carrying far too much and insists it's no trouble at all.",
        approach: "Offer to help carry",
        greeting:
          '"Oh, no, I\'ve got it. ...Actually, would you take the top one? Thank you."',
        responses: {
          kind: ["Tell him it's no trouble", "Say you're happy to help"],
          playful: ["Tease him about fussing", "Ask if he's showing off"],
          bold: ["Take the load from his arms", "Grab the biggest box"],
          neutral: ["Wait while he finishes", "Hold the door for him"],
        },
      },
      {
        line: "He starts to say something, thinks better of it, and offers you a snack instead.",
        approach: "Accept the snack",
        greeting:
          '"Please, go ahead. It\'s nothing special, just something from the back."',
        responses: {
          kind: ["Take it gratefully", "Say it's a kind gesture"],
          playful: ["Steal the good snack", "Ask which is the good one"],
          bold: ["Ask what he almost said", "Say you saw him stop"],
          neutral: ["Say nothing, just nod", "Take it and smile"],
        },
      },
      {
        line: "There's a kindness to him that doesn't feel put on for the customers. It's just how he is.",
        approach: "Reciprocate his kindness",
        greeting: '"New around here? It\'s a strange school. It grows on you."',
        responses: {
          kind: ["Say you feel welcome already", "Say the shop feels friendly"],
          playful: ["Tease him for being so nice", "Ask if it's all an act"],
          bold: ["Call him out on fussing", "Ask if he's ever not nice"],
          neutral: ["Let the moment be quiet", "Just smile back"],
        },
      },
    ],
    known: [
      {
        line: "He knows your name, and says it like he's glad of the chance to.",
        approach: "Greet him by name",
        greeting: '"How are you settling in? Everything going all right?"',
        responses: {
          kind: ["Tell him about your week", "Tell him you're doing well"],
          playful: [
            "Ask if he practiced saying it",
            "Say he makes it sound nice",
          ],
          bold: ["Ask how long he's known it", "Ask how he learned it"],
          neutral: ["Just nod hello", "Say things are fine"],
        },
      },
      {
        line: "He's half-panicking, shoving a stack of magazines under the counter. A glossy cover model is still smiling up at you when he flips the last one face down.",
        approach: ["Ask what he's hiding", "Pretend you saw nothing"],
        greeting: [
          '"What? Nothing. That\'s inventory. Supplier samples. Very boring ones."',
        ],
        responses: {
          kind: ["Promise you saw nothing", "Say nobody's judging"],
          playful: ["Ask to see the inventory", "Ask if the cat ordered them"],
          bold: ["Ask which is his favorite", "Lift one off the pile"],
          neutral: ["Look away politely", "Change the subject"],
        },
      },
      {
        line: "There's something set aside on the counter, like it's been waiting for you specifically.",
        approach: "Take what he set aside",
        greeting:
          '"Oh, you\'re back. Good, good. I set something aside, hang on."',
        responses: {
          kind: ["Tell him he's so thoughtful", "Say it's a lovely surprise"],
          playful: ["Ask how he knew to save it", "Ask if this is a bribe"],
          bold: ["Ask if it's just for you", "Ask how often he does this"],
          neutral: ["Take it without comment", "Nod and leave it at that"],
        },
      },
      {
        line: '"You\'re one of the ones who says thank you," he says. "I notice that."',
        approach: "Say thank you again",
        greeting:
          "\"Ha, sorry. It just makes the day go easier, that's all. You're welcome, again.\"",
        responses: {
          kind: ["Mean it, every time", "Say it's the least you can do"],
          playful: [
            "Say thank you extra loudly",
            "Give a full thank-you speech",
          ],
          bold: ["Ask why it matters to him", "Ask who forgets to say it"],
          neutral: ["Say it plainly, move on", "Just nod back"],
        },
      },
      {
        line: "Even the cat seems to tolerate you, which he says is rare praise.",
        approach: "Glow from the high praise",
        greeting:
          '"My manager seems to like you. Don\'t ask me how I can tell. I just can."',
        responses: {
          kind: ["Take the praise warmly", "Say you like hearing that"],
          playful: [
            "Brag about the cat's approval",
            "Ask the cat for a reference",
          ],
          bold: ["Say you earned it fair", "Ask how he can tell anyway"],
          neutral: ["Shrug off the compliment", "Say that's good to know"],
        },
      },
      {
        line: 'He starts to say "back when I was advising" and catches himself halfway through, looking sheepish about it.',
        approach: "Ask what he almost said",
        greeting: '"You\'re not in a hurry, are you? Good. Stay a minute."',
        responses: {
          kind: ["Let him take his time", "Tell him you'd like to hear"],
          playful: ["Guess what he almost said", "Ask if it's a scandal"],
          bold: ["Press him to finish it", "Say he can't stop there"],
          neutral: ["Wait impatiently", "Wait quietly"],
        },
      },
      {
        line: "He presses a small first-aid kit into your hands before you've said a word about where you're headed, then acts like he didn't.",
        approach: "Take the first-aid kit",
        greeting:
          '"Just come back in one piece, all right? Please don\'t do anything heroic on your next mission."',
        responses: {
          kind: ["Promise to be careful", "Say it's nice someone worries"],
          playful: ["Ask if the cat packed it", "Say heroic is your specialty"],
          bold: ["Ask why he worries so much", "Say you can handle it"],
          neutral: ["Take the kit, say nothing", "Nod and pocket it"],
        },
      },
      {
        line: "He's learned exactly which one you always reach for, and has it waiting at the register before you've even asked.",
        approach: "Take your usual",
        greeting:
          '"You always go for this one. I\'ve started keeping extras, just in case."',
        responses: {
          kind: ["Smile, touched he remembered", "Say that's very thoughtful"],
          playful: ["Ask what gave it away", "Ask if you're a regular now"],
          bold: ["Ask since when he noticed", "Ask if he keeps a list"],
          neutral: ["Pay for it, say nothing", "Take it with a nod"],
        },
      },
      {
        line: '"Here for the usual, or feeling adventurous today?" he asks, already reaching for the shelf.',
        approach: "Check what's on the shelf",
        greeting: '"Eating properly? Ah, sorry, that was forward of me."',
        responses: {
          kind: ["Let him pick for you", "Say you trust his taste"],
          playful: [
            "Ask for something adventurous",
            "Ask for the weirdest one",
          ],
          bold: ["Ask what he'd recommend", "Ask what he'd pick himself"],
          neutral: ["Stick with the usual", "Say you're just browsing"],
        },
      },
      {
        line: "He tells you which snacks are actually good and which ones he just orders because they sell.",
        approach: "Ask which are his favorites",
        greeting:
          '"I order half these snacks because you like them. Don\'t tell anyone."',
        responses: {
          kind: ["Listen, genuinely curious", "Say you love hearing this"],
          playful: ["Guess his favorite first", "Ask which ones he hides"],
          bold: ["Ask why he stocks the rest", "Call out the bad ones"],
          neutral: ["Nod along, say little", "Just pick one up"],
        },
      },
      {
        line: "\"This one's on the house,\" he says, already writing it off like it's settled.",
        approach: "Say you'll owe him one",
        greeting: '"Take it. No charge. I\'d only have eaten it myself."',
        responses: {
          kind: ["Accept it, mean to repay him", "Promise to bring him one"],
          playful: [
            "Keep a running tab, jokingly",
            "Say you'll pay in compliments",
          ],
          bold: ["Refuse to let it slide", "Insist on paying full price"],
          neutral: ["Take it without protest", "Nod, pocket it"],
        },
      },
      {
        line: "He asks how your week's going and actually waits around for the answer.",
        approach: "Tell him about your week",
        greeting:
          '"Go on, I\'m listening. Start anywhere, even the boring parts."',
        responses: {
          kind: ["Tell him the honest version", "Say it's been a good one"],
          playful: ["Give him the long version", "Rate the week out of ten"],
          bold: ["Ask why he actually cares", "Ask about his week instead"],
          neutral: ["Give the short version", "Say it's been fine"],
        },
      },
      {
        line: "He keeps glancing at the shelf under the counter, wiping down a spot that is already clean. A new monthly issue must have come in.",
        approach: "Ask about the monthly issues",
        greeting:
          "\"Monthly issues? Of what? I wouldn't know. They just come in with the deliveries. I don't order them. I don't even... open them. Often.\"",
        responses: {
          kind: ["Say you're just curious", "Tell him it's no big deal"],
          playful: ["Ask for his honest review", "Ask for his personal pick"],
          bold: ["Ask him to show you one", "Ask if he's read them all"],
          neutral: ["Drop the subject", "Say you'll check back"],
        },
      },
    ],
    // Pool sizes track the affinity width of the level(s) they cover (see
    // DIALOGUE_POOL_TARGET_BY_TIER in constants/game.js) — known=13, warm=18 at
    // the current POOL_POINTS_PER_LINE, same target as alan.js and jo.js.
    warm: [
      {
        line: 'The tips of his ears blush when he sees you, but his smile stays warm and gentle. "You\'re back. What can I get you?"',
        approach: "Ask what's got him flustered",
        greeting: [
          "\"Flustered? Me? It's warm in here, that's all. Sit anywhere.\"",
        ],
        responses: {
          kind: ["Ask him to pick for you", "Say you're glad to be back"],
          playful: ["Tease him about the blush", "Blame the heat too"],
          bold: ["Push him to admit it", "Tell him the color suits him"],
          neutral: ["Let him recover, say nothing", "Just order something"],
        },
      },
      {
        line: "He's set something aside for you. He's started doing that most days, just in case.",
        approach: "Take the thing he saved",
        greeting:
          "\"Wasn't sure you'd come. Glad you did. ...It's nothing much, really.\"",
        responses: {
          kind: ["Appreciate it, every time", "Tell him he didn't have to"],
          playful: ["Guess what he saved this time", "Guess before you look"],
          bold: ["Ask why he keeps doing it", "Ask who else gets one"],
          neutral: ["Take it without remark", "Put it in your bag"],
        },
      },
      {
        line: '"You\'d have been one of mine, back in the advising days," he says, then looks briefly startled he said it aloud.',
        approach: "Let it go, easy",
        greeting: '"Glad you\'re here. Really."',
        responses: {
          kind: ["Say you'd have liked that", "Ask about Clementia House"],
          playful: ["Ask what kind of student", "Ask if you'd have passed"],
          bold: ["Ask if he means it", "Ask why he stopped advising"],
          neutral: ["Let the comment pass", "Order and move on"],
        },
      },
      {
        line: "He fusses over whether you're eating enough, then apologizes for fussing.",
        approach: ["Wave off his fussing", "Tell him you're eating fine"],
        greeting: '"Set that down, I\'ll take it. No arguing."',
        responses: {
          kind: ["Reassure him gently", "Promise to eat properly"],
          playful: ["Let him fuss a little longer", "Ask what he'd feed you"],
          bold: ["Tell him to stop apologizing", "Ask when he last ate"],
          neutral: ["Let the fussing go", "Say you're fine"],
        },
      },
      {
        line: "He remembers exactly what you asked about last time, down to the detail.",
        approach: "Point out he remembered",
        greeting:
          '"Course I remembered. You asked like it mattered, so it stuck."',
        responses: {
          kind: ["Tell him that means a lot", "Thank him for remembering"],
          playful: [
            "Act surprised he remembered",
            "Test him with another detail",
          ],
          bold: ["Ask how he keeps track", "Ask what else he remembers"],
          neutral: ["Let it go unremarked", "Pick up where you left off"],
        },
      },
      {
        line: "He says your name before you've even said hello, like he's been listening for the door.",
        approach: "Ask what he's listening for",
        greeting:
          "\"You, mostly. The hinge squeaks a certain way when it's you. ...I'd rather not have said that.\"",
        responses: {
          kind: ["Tell him you're glad too", "Say you listen for him too"],
          playful: [
            "Ask how long he's listened",
            "Squeak the hinge on purpose",
          ],
          bold: ["Call out the door-watching", "Tell him to keep listening"],
          neutral: ["Say nothing, let it be", "Head for the shelf"],
        },
      },
      {
        line: "He starts humming without noticing, then stops the second he catches himself doing it in front of you.",
        approach: "Ask what he was humming",
        greeting:
          '"...Sorry. Something you said earlier just caught up with me."',
        responses: {
          kind: ["Ask him to keep humming", "Say you liked the tune"],
          playful: ["Hum it back at him", "Guess the song wrong"],
          bold: ["Call out the humming", "Ask him to hum it louder"],
          neutral: ["Pretend you didn't notice", "Let the quiet come back"],
        },
      },
      {
        line: "The cat's taken to curling up near you instead of him. He pretends not to be a little offended.",
        approach: "Let the cat curl up on you",
        greeting:
          "\"Look at that. She won't do that for me and I'm the one who feeds her. ...Traitor.\"",
        responses: {
          kind: ["Reassure him it's not personal", "Pet the cat, praise her"],
          playful: ["Rub it in a little", "Call yourself the new manager"],
          bold: ["Ask if he's actually jealous", "Tell him to come sit closer"],
          neutral: ["Let the cat choose", "Scratch the cat's ears"],
        },
      },
      {
        line: "He keeps a mental list of things you've mentioned liking, and the shelf under the counter fills up accordingly.",
        approach: "Bring him something for once",
        greeting:
          '"I set that aside because you mentioned liking it. Ages ago."',
        responses: {
          kind: ["Say it means a lot to you", "Bring him something back"],
          playful: [
            "Ask what else is on the list",
            "Add something to the list",
          ],
          bold: ["Ask why he keeps track", "Ask to see the whole shelf"],
          neutral: ["Take it, say nothing", "Pay for it anyway"],
        },
      },
      {
        line: '"Sit a while," he says, sliding a chair your way. "The shop can spare me a few minutes."',
        approach: ["Sit with him a while", "Take the chair he offered"],
        greeting:
          '"You look tired. Sit a moment, before you tell me you\'re fine."',
        responses: {
          kind: ["Take the chair gladly", "Ask how his day's been"],
          playful: [
            "Ask if he'll sit still too",
            "Steal his side of the counter",
          ],
          bold: ["Pull him down to sit too", "Tell him the shop can wait"],
          neutral: ["Sit quietly beside him", "Stay a few minutes"],
        },
      },
      {
        line: "He laughs at something you said hours ago, out of nowhere, and has to explain himself to the cat.",
        approach: "Ask about his day",
        greeting: '"You always ask how my day\'s been. Not many do. I notice."',
        responses: {
          kind: ["Ask him to share the joke", "Say you're glad it stuck"],
          playful: [
            "Tease him for telling the cat",
            "Ask the cat for her verdict",
          ],
          bold: ["Demand to hear it too", "Make him say it out loud"],
          neutral: ["Let him laugh alone", "Wait for him to finish"],
        },
      },
      {
        line: "He's quicker to smile around you than he is with anyone else who walks through that door.",
        approach: "Point out he's smiling more",
        greeting: '"Good to see a friendly face. Been a long day."',
        responses: {
          kind: ["Say his smile suits him", "Smile back at him"],
          playful: ["Point out the smiling", "Count the smiles out loud"],
          bold: ["Ask why he smiles more here", "Tell him to keep it up"],
          neutral: ["Not mention it", "Let him smile in peace"],
        },
      },
      {
        line: "He asks if you're sleeping enough, then looks embarrassed at how much like a professor that sounded.",
        approach: "Ask if he's sleeping enough",
        greeting: '"You\'re sleeping alright? Ah, sorry, old habits."',
        responses: {
          kind: ["Say the concern is sweet", "Answer him honestly"],
          playful: ["Tease the professor tone", "Call him Professor"],
          bold: ["Ask if he's sleeping either", "Tell him to worry less"],
          neutral: ["Brush the question off", "Say you sleep fine"],
        },
      },
      {
        line: "He's started closing up a little later on the nights you usually come by. Never says why.",
        approach: "Ask why he's still open",
        greeting:
          '"I\'ve been staying open a bit later these days. No particular reason."',
        responses: {
          kind: ["Let him keep his reason", "Tell him not to wait up"],
          playful: ["Guess at the real reason", "Guess wrong on purpose"],
          bold: ["Make him give a reason", "Tell him you noticed"],
          neutral: ["Don't ask why", "Buy something and go"],
        },
      },
      {
        line: '"You didn\'t have to bring that," he says, clearly pleased that you did.',
        approach: "Let him take the load",
        greeting: '"Here, hand it over. ...Thank you. I mean it."',
        responses: {
          kind: ["Say you wanted to", "Hand it over carefully"],
          playful: ["Grin like it's nothing", "Pretend it was for the cat"],
          bold: ["Tell him to get used to it", "Say you'll do it again"],
          neutral: ["Shrug it off", "Set it on the counter"],
        },
      },
      {
        line: "He keeps your favorite snack in stock even though it barely sells to anyone else.",
        approach: "Share it with him",
        greeting: '"Warm enough? Here, take mine."',
        responses: {
          kind: ["Say you're glad he keeps it", "Split it with him"],
          playful: ["Ask if anyone else buys it", "Offer him the bigger half"],
          bold: ["Ask why he bothers stocking it", "Buy the whole shelf of it"],
          neutral: ["Take it, unbothered", "Eat it at the counter"],
        },
      },
      {
        line: "He tells a joke that doesn't quite land, and looks so pleased with himself that you laugh anyway.",
        approach: "Laugh at the joke anyway",
        greeting:
          "\"That joke didn't land at all, did it. I'm still proud of it.\"",
        responses: {
          kind: ["Laugh for his sake", "Tell him it was worth it"],
          playful: ["Tell him it was terrible", "Groan, then laugh anyway"],
          bold: ["Demand a better joke", "Tell one back, worse"],
          neutral: ["Let it land quietly", "Smile and move on"],
        },
      },
      {
        line: "He's easier around you than he is around anyone else in that shop, cat included.",
        approach: "Say he's easier to talk to",
        greeting:
          "\"You noticed? I thought that was just me. I'm glad it isn't.\"",
        responses: {
          kind: ["Say you feel it too", "Tell him it's mutual"],
          playful: [
            "Tease him about the cat, too",
            "Ask the cat to confirm it",
          ],
          bold: ["Ask what makes it different", "Say you like him this way"],
          neutral: ["Let the ease speak for itself", "Stay a little longer"],
        },
      },
    ],
    // Migrated 2026-09-17 to close the gap the two comments below used to
    // describe: `approach.spark` had already been expanded to the tier's
    // 27-line target while `dialogue.spark` was still 5, so the two beats
    // (and their `greeting`/`responses`) drew independently. All 27 of the
    // original `approach.spark` labels are used below, each paired to a new
    // or existing line; all 5 original `temperamentDialogue.spark` lines and
    // all 28 original `responses.spark` labels are used too — nothing left
    // over, so those pools are gone from the file (see the bottom of this
    // object for where they used to live).
    spark: [
      {
        line: "He offers to walk you back before you've even said you're leaving.",
        approach: "Let him walk you back",
        greeting: "\"It's dark out. That's the only reason. Mind the step.\"",
        responses: {
          kind: "Say you'd like that",
          playful: "Tease him for offering so fast",
          bold: "Say you're not afraid of dark",
          neutral: "Say goodnight",
        },
      },
      {
        line: "He starts a sentence three times and abandons it three times, each attempt a little redder than the last.",
        approach: "Wait out his nerve",
        greeting:
          '"I keep starting that sentence and losing my nerve halfway through."',
        responses: {
          kind: "Let him find his nerve",
          playful: "Make him say it again",
          bold: "Say the thing he won't",
          neutral: "Wait without pushing",
        },
      },
      {
        line: "He offers his arm like it's the most natural thing in the world, and immediately looks unsure it was.",
        approach: "Take his arm",
        greeting: "\"Take my arm, the ground's uneven. That's all this is.\"",
        responses: {
          kind: "Take his arm",
          playful: "Doubt the ground's uneven",
          bold: "Take his hand instead",
          neutral: "Take the arm, say nothing",
        },
      },
      {
        line: "He matches his stride to yours without seeming to notice he's doing it.",
        approach: "Walk slower",
        greeting:
          '"I didn\'t mean to match your pace. Apparently I did anyway."',
        responses: {
          kind: "Say the walk was worth it",
          playful: "Slow down to watch him",
          bold: "Match his pace back",
          neutral: "Walk on ahead",
        },
      },
      {
        line: "He steadies you by the elbow, and takes a long moment letting go.",
        approach: "Let him steady you",
        greeting: '"You make a grown man feel rather silly. I don\'t mind it."',
        responses: {
          kind: "Tell him the nerves are fine",
          playful: "Tease the blush",
          bold: "Close the distance first",
          neutral: "Let the silence carry you",
        },
      },
      {
        line: "He trails off mid-sentence and busies himself with the till instead of finishing it.",
        approach: "Ask what he meant to say",
        greeting:
          '"Never mind. It\'ll keep. I really must reorganize this till."',
        responses: {
          kind: "Tell him to take his time",
          playful: "Ask what the till did wrong",
          bold: "Ask him straight, no stalling",
          neutral: "Say nothing, let him find it",
        },
      },
      {
        line: "\"Ah, I've been meaning to say... no, it'll keep. It'll keep.\"",
        approach: "Let it keep, for now",
        greeting:
          '"Thank you. I\'ll find the words, I promise. Just not today."',
        responses: {
          kind: "Tell him it came out fine",
          playful: "Get him to finish the thought",
          bold: "Tell him to just say it",
          neutral: "Let it keep",
        },
      },
      {
        line: "He opens his mouth, closes it again, and tries a third time before anything comes out.",
        approach: "Wait for the words to come",
        greeting:
          '"Give me a moment. I promise there\'s a sentence in here somewhere."',
        responses: {
          kind: "Let him know you noticed",
          playful: "Make him lose his nerve",
          bold: "Take the last step yourself",
          neutral: "Let him take his time",
        },
      },
      {
        line: 'He\'s clearly rehearsed something. What comes out is "you look nice today."',
        approach: "Point out he's rehearsed this",
        greeting: '"You look... ah. Very nice. That\'s what I meant to say."',
        responses: {
          kind: "Tell him it landed just fine",
          playful: "Ask if he practiced that",
          bold: "Say it caught you off guard",
          neutral: "Let the compliment sit",
        },
      },
      {
        line: "He's rehearsed the compliment so many times it comes out stiff, and he winces at himself for it.",
        approach: "Let him say you look nice",
        greeting: '"That came out wrong. Or right. I\'ve truly lost track."',
        responses: {
          kind: "Tell him it was sweet anyway",
          playful: "Tell him to try it again",
          bold: "Say it plainly back",
          neutral: "Accept it quietly",
        },
      },
      {
        line: "He takes the long way to the gate without explaining why, and you don't ask.",
        approach: "Take the long way to the gate",
        greeting:
          "\"The gate's this way. It's also that way. I chose the long one.\"",
        responses: {
          kind: "Let him take the long way",
          playful: "Ask why the detour",
          bold: "Take his hand at the gate",
          neutral: "Walk it without asking",
        },
      },
      {
        line: "He's slowed his pace to something almost glacial, and doesn't seem to notice, or won't admit it.",
        approach: "Ask why he's walking so slow",
        greeting: '"Am I walking slowly? I hadn\'t noticed. ...I noticed."',
        responses: {
          kind: "Let him set the pace",
          playful: "Call out the glacial pace",
          bold: "Ask what he's stalling for",
          neutral: "Match the slow pace",
        },
      },
      {
        line: "He walks you to the gate and finds three reasons to walk slower.",
        approach: "Let him find a third reason",
        greeting:
          "\"There's a fourth one, if you're interested. I'm saving it for tomorrow.\"",
        responses: {
          kind: "Let him keep finding reasons",
          playful: "Point out the third reason",
          bold: "Call out the stalling",
          neutral: "Let him take the long way",
        },
      },
      {
        line: "He goes red to the ears and busies himself with something that needed no attention.",
        approach: "Watch him go red to the ears",
        greeting:
          '"I thought I\'d be over this kind of nervous by now, and here we are."',
        responses: {
          kind: "Let the blush be, gently",
          playful: "Point out the red ears",
          bold: "Ask what's really going on",
          neutral: "Watch without a word",
        },
      },
      {
        line: "He fumbles the till twice in a row and blames the register, not himself.",
        approach: "Let him recover, say nothing",
        greeting:
          '"The register\'s being difficult tonight. It has nothing to do with you standing there."',
        responses: {
          kind: "Let him blame the register",
          playful: "Doubt the register's guilt",
          bold: "Say it's not the register",
          neutral: "Let him recover, say nothing",
        },
      },
      {
        line: '"There\'s something I keep meaning to bring up," he says, and then brings up the weather instead.',
        approach: "Ask what he means to say",
        greeting:
          '"Lovely weather we\'re having. That is not what I meant to say."',
        responses: {
          kind: "Let the weather talk slide",
          playful: "Play along about the weather",
          bold: "Ask what he meant to say",
          neutral: "Talk about the weather instead",
        },
      },
      {
        line: "His hand finds your arm to steady you and stays a beat longer than steadying requires.",
        approach: "Let his hand rest on your arm",
        greeting:
          '"Steady now. There. You can let go of my sleeve. ...Or don\'t."',
        responses: {
          kind: "Let his hand stay",
          playful: "Ask if you're steady yet",
          bold: "Hold on a beat longer too",
          neutral: "Let go first",
        },
      },
      {
        line: "He reaches to fix your collar, hand hovering, like he's asking permission without asking.",
        approach: "Hold still for his nerve",
        greeting: '"Hold still, your collar\'s... may I? Thank you."',
        responses: {
          kind: "Let him fix it, gently",
          playful: "Ask if he's nervous, teasing",
          bold: "Say yes before he asks",
          neutral: "Hold still, say nothing",
        },
      },
      {
        line: "He's found four reasons the shop needs closing later tonight, none of them true.",
        approach: "Stay past the usual time",
        greeting:
          '"The shop simply needed to stay open. For inventory reasons. Entirely."',
        responses: {
          kind: "Stay as long as he needs",
          playful: "Ask about the real reason",
          bold: "Say you're staying regardless",
          neutral: "Stay without asking why",
        },
      },
      {
        line: "The silence between you stretches, and for once he doesn't rush to fill it.",
        approach: "Let the quiet turn warm",
        greeting:
          "\"I don't often let a silence sit this long. I don't mind this one.\"",
        responses: {
          kind: "Let the quiet stay warm",
          playful: "Break it gently, smiling",
          bold: "Close the quiet distance",
          neutral: "Let quiet be enough",
        },
      },
      {
        line: "He circles the same unfinished thought for the third time this week.",
        approach: "Ask him to just say it",
        greeting:
          "\"I've circled back to it again, haven't I. Give me one more moment.\"",
        responses: {
          kind: "Give him the moment",
          playful: "Count how many times now",
          bold: "Ask him to just say it",
          neutral: "Let him circle it again",
        },
      },
      {
        line: "\"It's this way,\" he says, leading you the long way round for no reason he'll name.",
        approach: "Take the long way home",
        greeting:
          "\"This isn't the shorter way. I'm aware. I chose it anyway.\"",
        responses: {
          kind: "Follow without question",
          playful: "Ask why the detour, grinning",
          bold: "Ask him straight out why",
          neutral: "Follow, say nothing",
        },
      },
      {
        line: "He shortens his steps so you'll walk beside him instead of ahead.",
        approach: "Match his slower pace",
        greeting:
          '"Slow down with me a while. There\'s no rush I can think of."',
        responses: {
          kind: "Walk beside him gladly",
          playful: "Tease him for slowing down",
          bold: "Close the gap between you",
          neutral: "Walk beside him, quiet",
        },
      },
      {
        line: "He loses his train of thought mid-sentence, staring at nothing in particular. At you, really.",
        approach: "Let him lose the thread",
        greeting:
          '"Where was I? ...No. It\'s gone. I blame you for that, kindly."',
        responses: {
          kind: "Let him stare a moment",
          playful: "Ask what he's staring at",
          bold: "Call out the staring",
          neutral: "Let the thought stay lost",
        },
      },
      {
        line: "His hands aren't quite steady restocking the shelf, and it isn't the shelf's fault.",
        approach: "Ask if he's this nervous too",
        greeting:
          "\"My hands aren't usually this unsteady. I'll blame the cold.\"",
        responses: {
          kind: "Say you're nervous too",
          playful: "Doubt it's really the cold",
          bold: "Ask if he's this nervous too",
          neutral: "Let his hands settle",
        },
      },
      {
        line: "He looks at you a beat longer than the conversation calls for, then catches himself doing it.",
        approach: "Let him look a moment longer",
        greeting:
          '"Forgive me, I was looking a moment too long. I\'ll stop. ...Eventually."',
        responses: {
          kind: "Let him look, unbothered",
          playful: "Ask what he's looking at",
          bold: "Hold his gaze right back",
          neutral: "Look away first",
        },
      },
      {
        line: "He's building up to something. He's been building up to it for a week.",
        approach: "Stay until he says it",
        greeting:
          "\"Thank you for waiting. I have the whole speech. It's the first word that's giving me trouble.\"",
        responses: {
          kind: "Wait for him, patiently",
          playful: "Guess what he's building to",
          bold: "Tell him to just spit it out",
          neutral: "Wait, say nothing",
        },
      },
    ],
    close: [
      {
        line: '"You\'re really important to me," he says softly, a hint of bashfulness in his voice. "I\'m always happy to help you with anything you need."',
        approach: "Tell him he matters",
        greeting:
          "\"...Thank you. That's a lot. I'm going to need a moment. And it goes both ways, you know.\"",
        responses: {
          kind: "Take the words to heart",
          playful: "Fluster him further",
          bold: "Say it plainly back",
          neutral: "Let the words sit unanswered",
        },
      },
      {
        line: "He tells you a story from his advising days that he doesn't tell anyone else.",
        approach: "Ask for the old story",
        greeting:
          "\"I've watched a lot of students come and go. You're the one I'll remember.\"",
        responses: {
          kind: "Say he's been noticed",
          playful: "Match his dry humor",
          bold: "Ask what he really felt",
          neutral: "Let the story trail off",
        },
      },
      {
        line: '"Don\'t push yourself so hard," he says gently. "Somebody ought to say it."',
        approach: "Take the advice for once",
        greeting:
          "\"You've been running yourself ragged. Don't think I haven't noticed.\"",
        responses: {
          kind: "Tell him to rest too",
          playful: "Tease him for worrying",
          bold: "Promise to look after him",
          neutral: "Sit and say nothing",
        },
      },
      {
        line: "He's quietly made your life easier in three ways this week and mentioned none of them.",
        approach: "Bring it to him first",
        greeting:
          "\"Whatever it is, bring it here first. That's what I'm for.\"",
        responses: {
          kind: "Let him care for you",
          playful: "Tease him about the shop",
          bold: "Say you'd stay too",
          neutral: "Notice, say nothing",
        },
      },
      {
        line: "He looks at you the way someone looks at a reason to be glad about where they ended up.",
        approach: "Go sit with him",
        greeting: '"Sit with me a bit. The shop can spare me a few minutes."',
        responses: {
          kind: "Sit with him gladly",
          playful: "Make him laugh out loud",
          bold: "Tell him you're staying",
          neutral: "Rest in the quiet",
        },
      },
    ],
    bound: [
      {
        line: "He still goes red. He's stopped letting it stop him.",
        approach: "Come here",
        greeting: '"Come here. Let me look at you a moment."',
        responses: {
          kind: "Let him look at you",
          playful: "Make him blush again",
          bold: "Pull him in",
          neutral: "Sit with him quietly",
        },
      },
      {
        line: "He kisses your forehead every morning like it's a small ceremony he takes seriously.",
        approach: "Lean into the kiss",
        greeting:
          "\"You make me feel young and foolish. I've decided I don't mind.\"",
        responses: {
          kind: "Let the ceremony be his",
          playful: "Tease the morning ceremony",
          bold: "Steal the kiss first",
          neutral: "Let the evening pass",
        },
      },
      {
        line: '"I\'d made my peace with a quiet life," he admits. "You\'ve ruined that rather thoroughly."',
        approach: "Stay a while",
        greeting: "\"Stay a while? I won't pretend I don't want you to.\"",
        responses: {
          kind: "Tell him he's not foolish",
          playful: "Call him a soft touch, fondly",
          bold: "Tell him to stop pretending",
          neutral: "Say nothing",
        },
      },
      {
        line: "He holds you carefully, like something he's been trusted with and means to deserve.",
        approach: "Sit with him",
        greeting: '"Sit with me. Just here. That\'s all I want, most days."',
        responses: {
          kind: "Let him hold you close",
          playful: "Tease him about the trust",
          bold: "Trust him right back",
          neutral: "Rest in his arms, quiet",
        },
      },
      {
        line: "He's earnest about all of it, no games, and it turns out that's rather lovely.",
        approach: "Say it back",
        greeting: '"I love you. Took me far too long to say that plainly."',
        responses: {
          kind: "Say it back",
          playful: "Kiss him first",
          bold: "Say it first",
          neutral: "Let the words be enough",
        },
      },
    ],
  },
  // No temperamentDialogue, approach, or responses pools left — every tier
  // (including spark, migrated 2026-09-17 to close its size gap) is fully
  // paired, so every `dialogue[tier]` beat above carries its own `approach`,
  // `greeting`, and `responses`, and there is no independent pool behind any of
  // the three left to fall back to (docs/dialogue-approach-pairing.md). The last hole — dialogue.warm[4]
  // ("He remembers exactly what you asked about last time...") having no
  // `greeting` and no pool to fall back to — is closed; every beat has one.
  //
  // `responses` for the warm tier carry two labels per kind, as `new` and
  // `known` already did. The remaining tiers are still one label per kind.
  // The /call reveal lines for this character, keyed by the register in
  // WINNER_LINE_BUCKETS (constants/publicEncounters.js). Picked from at random
  // like the dialogue; {user} is the winner's mention and {name} their full
  // name, and the embed's winner line is the only place the reveal names
  // either of them. A register left out here falls back to the generic
  // WINNER_LINES pool.
  winnerLines: {
    new: [
      '"Oh! H-hello." **{name}** is carrying far too much and insists to {user} that it\'s no trouble.',
      "**{name}** has a snack pressed into {user}'s hand before he's got through saying hello.",
      'A cat watches with total disdain as **{name}** waves {user} over. "Don\'t mind her," he says. "She\'s the manager."',
    ],
    warm: [
      '"Welcome back!" **{name}** beams at {user} and immediately offers to carry something.',
      "{user} calls out, and **{name}** sets down the crate he'd been managing badly.",
      "**{name}** had put something aside for {user}.",
    ],
    spark: [
      "**{name}** goes red, apologizes for going red, and stays exactly where {user} can see him.",
      '"You\'d have been one of mine, in the advising days." **{name}** tells {user} that much, then looks startled he said it aloud.',
      "{user} says the name, and **{name}** forgets the whole afternoon's restocking list.",
    ],
    close: [
      '"Ah, there you are. Sit down a moment, you look worn through." **{name}** is in no hurry at all with {user}.',
      "**{name}** hears {user}, and every ache of the day goes somewhere else.",
      "{user} calls, and **{name}** walks the long way around with them, just to have the time.",
    ],
    bound: [
      '"I\'d made my peace with a quiet life," **{name}** tells {user}. "You\'ve ruined that rather thoroughly."',
      "**{name}** kisses {user}'s forehead in front of half the campus, like a small ceremony he takes seriously.",
      "{user} says the name, and **{name}** stops going red about it. Mostly.",
    ],
  },
};
