// Kaito's bond scenes, read as DIALOGUE.kaito.bondScenes
// (constants/dialogue/kaito.js imports this file).
//
// The level-up DMs (docs/bond-scene-dms.md). Kaito over-sends and then
// apologizes for having sent; the intimacy is that he keeps hitting send
// anyway. Kind is what reaches him, so every choice is really about whether
// the reassurance he is fishing for actually arrives.
//
// The acquaintance scene opens the bond with him working up to asking
// {firstName} to lunch, one-on-one, no Luca along for it. The ask itself
// is reference/kaito.md's Home Screen "Morning 5" line, nearly verbatim
// ("Luca's busy after class, so how about we hit up the diner? It's been
// ages!"); the follow-up quotes his own "Default 3" self-own ("I could've
// taken MC to lunch with that money! God, why am I such a moron?!"); the
// choice prompt echoes "Idle 1" ("Am I being annoying?! I'm sorry!").
//
// Texting voice, per reference/kaito.md's "Texting style" notes: a sob emoji (😭)
// surfaces when he's overwhelmed, his anxious questions almost always double
// the "??", and he stretches letters when exasperated ("Urghhhh").
export default {
  acquaintance: {
    beats: [
      "*Deleted message*\n\n*Deleted message*\n\n*Deleted message*",
      "**{firstName}**: Hey, Honor Roll!!\n\nokay, so, guess what, Luca's busy after class. How about we hit up the diner? It's been ages, right?",
      "Not a group thing, though. Just us. No Luca showing up halfway through to make it a whole thing. 😭\n\nYou've joined us {timesMet} times now and it's always been the three of us. Never just you and me. Kind of wanted to see what that's like, for once.",
    ],
    faces: { 0: "sweat", 1: "full_smile", 2: "blush" },
    choice: {
      prompt: "Okay. Sent it. Can't unsend it now. *Please don't say no.*",
      options: [
        {
          key: "kind",
          face: "surprise_blush",
          label: "Say yes right away",
          style: 3,
          close:
            "WAIT REALLY??\n\nOkay, cool, cool.\n\n*He sends the diner's hours. Then the address, even though you both already know it. Then just: see you there.*",
        },
        {
          key: "playful",
          face: "blush",
          label: "Ask if it's a date",
          style: 1,
          close:
            "IT'S— okay, um. If you want to call it a date, I'm not gonna be the one to argue. I just wasn't going to call it one first, I don't think my heart could take it 😭",
        },
        {
          key: "bold",
          face: "sweat",
          label: "Ask why not with Luca",
          style: 4,
          close:
            "*A long pause.*\n\n...because I wanted just one afternoon where you're not looking past me at him. That's it.\n\n*Then, immediately:* ...okay that was a lot. Anyway! Drinks are on me. Just don't get whatever Luca always orders, his taste is genuinely concerning.",
        },
      ],
    },
    keepsake: {
      emoji: "☕",
      line: "A table for two, with no Luca showing up halfway through.",
    },
  },

  friend: {
    beats: [
      "**{firstName}**: Okay don't laugh. I made you cookies. Just you, not a tray for the whole house",
      "Every time I bake, you're off doing some Honor Roll thing, and by the time you show up it's a crime scene. Luca takes like four \"for after training.\" Tohma takes a plate up to Jin. Jin doesn't even leave his room and he still gets more than you. Urghhhh.\n\nAnd you get the burnt one. EVERY time. The one I was gonna throw out!!\n\nSo I hid a batch for you. First pick, for once.",
      "My Gram used to do that for me. Every winter she'd save me the mandarins before anyone else got to them. I didn't get it back then. I kind of get it now.\n\nAnd you've had {favResponse} even for the burnt ones, so. You deserve the good ones 😭",
    ],
    faces: { 0: "blush", 1: "annoyed", 2: "close" },
    choice: {
      prompt: "Is that weird?? I'm sorry! You're probably busy right now...",
      options: [
        {
          key: "kind",
          face: "surprise_blush",
          label: "Say you're never too busy",
          style: 3,
          close:
            "...Never??\n\nOkay. Give me a sec 😭\n\nI already packed them up for you. They're all yours.",
        },
        {
          key: "playful",
          face: "smile",
          label: "Ask what he'll tell Luca",
          style: 1,
          close:
            "Nothing!! He gets everything else. He can live without cookies for once.",
        },
        {
          key: "bold",
          face: "blush",
          label: "Ask him to eat them with you",
          style: 4,
          close:
            "With me?? Like, together??\n\nOkay. Okay, I'm bringing them over. I'm not eating any though. They're yours.\n\n...Maybe one.",
        },
      ],
    },
    keepsake: {
      emoji: "🍪",
      line: "The batch he hid from the whole house so you'd get first pick.",
    },
  },

  closeFriend: {
    beats: [
      "*It's late. The message isn't loud, which from him is the first sign something is off.*\n\n**{firstName}**: are you up\n\ndon't answer if you're not up. I'll be fine. I'm always fine.",
      "Collections came round again. It's handled. It's... I handled it. Mostly.\n\nI didn't tell anyone in the house because they'd look at me the way they look at me. Lucas would want to *help*. Jin would pay it and then own me forever, which honestly, you know, tempting.",
      "I just wanted to say it out loud to someone who's not going to fix it. Does that make sense?? I don't want it fixed, I want it to have been heard.\n\nYou're the only person I could think of at two in the morning. That's not a small thing for me. That's basically the biggest thing 😭",
    ],
    faces: { 0: "default", 1: "sweat", 2: "close" },
    choice: {
      prompt: "Say something dumb so I stop feeling like this.",
      options: [
        {
          key: "kind",
          face: "blush",
          label: "Tell him you're staying up",
          style: 3,
          close:
            "You don't have to.\n\nStay up. Please stay up 😭 You can just leave the read receipt on, you don't even have to type, I just want to see it say online.\n\n*It says online until six.*",
        },
        {
          key: "playful",
          face: "full_smile",
          label: "Send him something stupid",
          style: 1,
          close:
            "*He reacts to it in under a second. Then sends four worse ones back. Then:* okay I'm laughing. I hate that that worked. thank you for making that work.",
        },
        {
          key: "bold",
          face: "surprise_blush",
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
    faces: { 0: "sweat", 1: "serious", 2: "blush" },
    choice: {
      prompt:
        "Please say literally anything. The silence is doing numbers on me 😭",
      options: [
        {
          key: "kind",
          face: "close",
          label: "Say he already is worth it",
          style: 3,
          close:
            "don't.\n\n*Then:* sorry. don't stop. say it again but slower, I want to actually hear it this time instead of deciding you didn't mean it.\n\n*So you say it again, slower. He goes quiet for a while, and when he comes back all he sends is a heart, which from him, who sends fourteen of everything, is the loudest thing he has ever done.*",
        },
        {
          key: "playful",
          face: "smile",
          label: "Point out he sent it anyway",
          style: 1,
          close:
            "...I did send it, didn't I.\n\nHuh. Put that on the list. Sent one (1) terrifying message. That's the bravest thing I've done all year and it was aimed at you, which tracks.",
        },
        {
          key: "bold",
          face: "surprise_blush",
          label: "Ask him to call you now",
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
    faces: { 0: "sweat", 1: "full_smile", 2: "blush" },
    choice: {
      prompt: "Was that... did I do good?? Tell me I did good.",
      options: [
        {
          key: "kind",
          face: "lovestruck",
          label: "Tell him he did good",
          style: 3,
          close:
            "*There's no reply for a bit. Then a voice note, four seconds long, of him just breathing out.*\n\n*Then:* okay. okay. I'm going to listen to you say that on a loop probably forever.\n\n*When you find him he lets you redo the bandage properly, and he watches your hands the whole time and doesn't say one word.*",
        },
        {
          key: "playful",
          face: "sweat",
          label: "Critique the bandage work",
          style: 1,
          close:
            "IT'S STRUCTURALLY SOUND.\n\nIt is not structurally sound. It came off twice. Please come and do it 😭 I've been sitting here for an hour hoping you'd offer so I wouldn't have to ask.",
        },
        {
          key: "bold",
          face: "serious",
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
    faces: { 0: "sweat", 1: "lovestruck", 2: "close", 3: "blush" },
    choice: {
      prompt:
        "Okay. I'm going to put the phone face down now. Do your worst.",
      options: [
        {
          key: "answered",
          face: "full_smile_blush",
          label: "Say it back",
          style: 3,
          close:
            "*The phone is face down for exactly eleven seconds.*\n\n*Then it's a call, then it's him at your door out of breath with his jacket on inside out, and he gets about half of* I ran *out before you pull him in, and he holds onto you like someone who genuinely expected to be turned away and has no plan for this at all.*\n\n> Say it again.\n\n*he says into your shoulder.*\n\n> Sorry. Say it like ninety more times.",
        },
        {
          key: "held",
          face: "smile",
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
};
