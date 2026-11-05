// Rui's bond scenes, read as DIALOGUE.rui.bondScenes
// (constants/dialogue/rui.js imports this file).
//
// The level-up DMs (docs/bond-scene-dms.md). Rui's whole ladder is built round
// the one thing he cannot do: his touch kills the living, so the gloves never
// come off and the intimacy has to be found everywhere else — a drink made to
// your taste, a garden grown for you, a hand held through two layers of
// leather. The brightness is real and it is also a wall; the arc is the wall
// coming down without the brightness going out.
//
// Texting voice, per reference/rui.md's "Texting style" notes: the odd emoji in
// his typed lines — crying-laughing 😂, sparkle ✨ — and his eager questions
// land on "?!". Not in the `> ` lines he says out loud.
export default {
  acquaintance: {
    beats: [
      "**{firstName}**: Hey, Honor Roll! 🤗 First time texting you, I know, very forward of me. But I've got a reason, promise. I made you a drink ✨ and it's just sitting on my bar getting warm. Kind of a tragedy. Come rescue it?",
      "Okay, full disclosure: I make a drink for everyone who comes in. That part's not special.\n\nThe part that is: I've remade yours four times. You've been in {timesMet} times and I paid attention to what you finish, what you leave. That's where the four came from.\n\nAnyway! Fifth version's in your glass now ✨ Pretty sure I nailed it this time.",
    ],
    faces: { 0: "full_smile", 1: "smile" },
    choice: {
      prompt:
        "So?! Come try it, tell me it's the best thing you've ever tasted. Or don't, and I'll just make a sixth. I'm here till close either way 😂",
      options: [
        {
          key: "kind",
          face: "smile",
          label: "Say you'll come right now",
          style: 3,
          close:
            "Ahaha, knew it!\n\nDrink's poured, seat's got your name on it, and I'm gonna stand here looking smug till you show. Come on, Honor Roll.",
        },
        {
          key: "playful",
          face: "sweat",
          label: "Say you're busy again",
          style: 1,
          close:
            "Busy. Again. You are always busy 😂\n\nWhat's it going to take?! Drink didn't do it, four remakes didn't do it. Live band? Dessert cart? Name your price and I'll have it set up by the time you walk in.",
        },
        {
          key: "bold",
          face: "wink",
          label: "Ask what he was watching for",
          style: 4,
          close:
            "You. Obviously 😂\n\nWatching you is the best part of my shift, easy.\n\nCome have the drink, cutie. I'll be the guy behind the bar not being subtle about it.",
        },
      ],
    },
    keepsake: {
      emoji: "🍸",
      line: "The fifth version of a drink, adjusted four times without being asked.",
    },
  },

  friend: {
    beats: [
      "**{firstName}**: Okay, curse twin. Game time ✨ When yours is gone, what's the first thing you do?! Not if. When. That's the only rule.",
      "I'll go first so it's not weird. Mine's so boring 😂 A T-shirt. Just a regular one, short sleeves, in summer, like a normal person.\n\nBut mine's not the one I'm asking about, so don't get distracted.",
      "I know yours has a clock on it. I'm not gonna pretend it doesn't. But you've got a whole lot of people working on breaking this thing, and you've got me. We're gonna figure this out, Honor Roll. In time. That part's not a maybe.\n\nAnd you still bring everybody {favResponse}, every single time, like you're not the one who should be getting them. So here's one back.",
    ],
    faces: { 0: "smile", 1: "close", 2: "serious" },
    choice: {
      prompt:
        "Anyway! No pressure on the game. Not gonna lie though, I'm super curious what yours is 😂",
      options: [
        {
          key: "kind",
          face: "surprise_blush",
          label: "Say you'd come tell him",
          style: 3,
          close:
            "Wait, the first thing you'd do is come tell me?!\n\nOh man. Okay. Then I'm making you a brand new drink for that day. A celebration one ✨ You just gave me something to look forward to, cutie.",
        },
        {
          key: "playful",
          face: "full_smile",
          label: "Offer to take him shopping",
          style: 1,
          close:
            "Hey, that's cheating! 😂 You can't spend your turn on mine!\n\n...Okay, but you're not allowed to laugh at my arms. They haven't seen the sun in years.",
        },
        {
          key: "bold",
          face: "serious",
          label: "Ask what if time runs out",
          style: 4,
          close:
            "Nope. Not doing that one.\n\n...Sorry, that was blunt. I just don't let myself go there, okay? So you don't have to either.\n\nWe make it. That's the only version I'm planning for.",
        },
      ],
    },
    keepsake: {
      emoji: "🎲",
      line: "A game with one rule: when, not if.",
    },
  },

  closeFriend: {
    beats: [
      "**{firstName}**: Hey, you up? Come to the garden. It's the good hour, everything opens around four ✨ and nobody's ever awake for it. Their loss.",
      "*It is four in the morning and the anomaly garden is doing something quietly extraordinary, and he is standing in the middle of it in gloves and a coat with a look about him you've never seen at the bar.*\n\n> This one's mine. Not the house's, not a job, not anything. I started it my second year because I wanted one thing on this campus I couldn't accidentally kill.",
      "*He holds up both hands, gloved, palms out.*\n\n> Nothing living. That's the deal. Anything with a pulse, one contact, that's it. No warning, no second chance.\n\n> So I grow things instead. Things without a pulse, that I can put my hands right into.\n\n*He looks at the bed nearest you.*\n\n> That row's about eight months old. Started it the week after I met you. And that's all I'm saying about that one, you can do the math.",
    ],
    faces: { 0: "smile", 1: "close", 2: "blush" },
    choice: {
      prompt:
        "Okay. That's the tour. Say something quick, before I start telling you about drainage.",
      options: [
        {
          key: "kind",
          face: "blush",
          label: "Ask what the row is called",
          style: 3,
          close:
            "*He tells you. It is not a real name; it is very obviously a name he made up eight months ago and has been using privately ever since.*\n\n> ...Don't,\n\n*he says, before you can say anything.*\n\n> I know. I *know*. Let me have it.",
        },
        {
          key: "playful",
          face: "full_smile",
          label: "Ask about the drainage",
          style: 1,
          close:
            "> Oh, you've done it now.\n\n*He talks about drainage for twenty-five minutes and it is the happiest you have ever seen him, and at the end of it he says:*\n\n> Nobody's ever let me finish that. Not once. Thank you, genuinely, that was the best part of my month.",
        },
        {
          key: "bold",
          face: "surprise_blush",
          label: "Take his gloved hand",
          style: 4,
          close:
            "*He goes completely still.*\n\n> That's... there's leather in the way. That doesn't count. That's not really...\n\n*He stops. He looks down at your hand round his, and after a moment he closes his fingers, carefully, like a man handling something that could go off.*\n\n> ...Okay,\n\n*he says, not brightly at all.*\n\n> Okay. It counts. I'd like it to count.",
        },
      ],
    },
    keepsake: {
      emoji: "🌱",
      line: "A row of the garden started the week after you met, with a made-up name.",
    },
  },

  confidant: {
    beats: [
      "**{firstName}**: Can't sleep. Which is a joke coming from me, obviously 😂 I've been not-sleeping since the curse, curse twin. It's basically my whole personality now.",
      "Here's the part about the curse nobody gets. It's not the touching. The gloves fixed that years ago.\n\nIt's that I never get tired. Like, ever. There's no point where my body goes okay, that's enough, sit down.\n\nSo I don't. I run the bar, the house, the garden, I keep Edward alive, I sort out everyone's everything. The other option is nine hours in a chair, wide awake.",
      "And everyone reads it as cheerfulness. Rui the bright one. Rui who's always up for it.\n\nI'm not, really. I've just got nowhere to put the hours, and there've been a lot of them. You're the first person who's ever told me to sit down.",
    ],
    faces: { 0: "smile", 1: "serious", 2: "close" },
    choice: {
      prompt: "Okay. That's the ugly one. Your turn.",
      options: [
        {
          key: "kind",
          face: "surprise",
          label: "Ask him to sit down now",
          style: 3,
          close:
            "...Now?!\n\nI don't know how to do that. That's not a joke, I genuinely don't know what the instruction is.\n\n*So you talk him through it, badly, over text, and he sits in a chair in the garden for forty minutes doing absolutely nothing, and afterwards he says it was the worst and best thing he's done in years.*",
        },
        {
          key: "playful",
          face: "smile",
          label: "Offer him the boring hours",
          style: 1,
          close:
            "You want to *give* me boring?! That's the offer?\n\n...Yeah, alright. Give me the boring ones. I'll take the boring ones. Nobody's ever offered me boring, it's usually jobs.",
        },
        {
          key: "bold",
          face: "sweat",
          label: "Tell him he's allowed to stop",
          style: 4,
          close:
            "*There's a long gap.*\n\nIf I stop I'm just a guy who can't touch anyone, stuck in a room, forever.\n\n*Then, much later:* That was the real one. Sorry. You asked and I've spent years not answering it and it came out worse than I meant.\n\nDon't go, though. Say something else. Anything. I've got about six more hours.",
        },
      ],
    },
    keepsake: {
      emoji: "⏳",
      line: "Forty minutes of doing nothing, for the first time since the curse.",
    },
  },

  devoted: {
    beats: [
      "**{firstName}**: I need to tell you what I did before somebody else does.",
      "Edward was going for you in the lower hallway. Not seriously. He always pulls back, he's four hundred years old and he's never once not pulled back.\n\nI didn't wait to find out. I got between you.\n\nBare-handed. Both gloves off. In front of him.",
      "He's not living, so it wouldn't have killed him. It would've hurt him badly and he wouldn't have deserved it, and I did it anyway, no thought in my head.\n\nI'm the guy who's against violence. Always have been. I talked three people out of fights just this month. And then I pulled my gloves off in a hallway because someone stood too close to you.\n\nI've been in the garden ever since, trying to figure out who that was. Because it wasn't me.",
    ],
    faces: { 0: "sweat", 1: "serious", 2: "serious" },
    choice: {
      prompt:
        "Say it. Whatever it is. I've been sitting out here for two hours waiting to hear it.",
      options: [
        {
          key: "kind",
          face: "close",
          label: "Tell him to put them back on",
          style: 3,
          close:
            "...They're back on. Have been for an hour.\n\nI keep pulling them off and putting them back on. That's the whole activity out here. Come sit with me and make me stop. I'm not quite myself tonight.",
        },
        {
          key: "playful",
          face: "smile",
          label: "Ask how Edward took it",
          style: 1,
          close:
            "He went white as a sheet. Four hundred years old and caught with his hand in the cookie jar.\n\nThen he apologized. The full old-world version, every formal clause of it. I almost passed out 😂",
        },
        {
          key: "bold",
          face: "blush",
          label: "Say he was defending you",
          style: 4,
          close:
            "*There's no answer for a long time.*\n\n*Then he's at your door with the gloves on and a look he can't do anything about, and he holds out one hand, palm up, waiting rather than taking.*\n\n> Yeah,\n\n*he says.*\n\n> It was you. Figured that out about eight months ago, and I've been growing a flowerbed about it instead of saying so, like a total coward.",
        },
      ],
    },
    keepsake: {
      emoji: "🧤",
      line: "Two gloves pulled off in a hallway and put back on in a garden.",
    },
  },

  soulbound: {
    beats: [
      "**{firstName}**: Garden. Four a.m. Don't reply to this, just come, okay? If there's a message sitting there for me to read I'll lose my nerve halfway through it.",
      "*The whole bed is out at once, which does not happen, and he is standing at the end of the row with the made-up name looking like he has been up all night rehearsing, which he has.*\n\n> {timesMet} times. I've got a mark on the bench for each one. I started doing it before I'd admitted why I was doing it.",
      "> I want to say the worst part first, so you can decide with all of it in front of you.\n\n> I will never be able to touch you. Not once, not in forty years. No hand on your face, nothing at the end of a bad day. That doesn't get fixed. I've looked, really looked, ever since the curse, and there's nothing there.",
      "> And I love you anyway. Which is such a raw deal for you, and I spent eight months not saying it for that exact reason.\n\n> Then it hit me that making that call for you was the actually unfair part. So. I love you. I've got a garden, a bar, about a thousand spare hours, and a pair of gloves. That's the whole offer. It's yours if you want it.",
    ],
    faces: { 0: "sweat", 1: "close", 2: "serious", 3: "blush" },
    choice: {
      prompt:
        "Take as long as you need. I've got nothing but hours, remember. It's the one thing I'm rich in.",
      options: [
        {
          key: "answered",
          face: "full_smile_blush",
          label: "Say it back",
          style: 3,
          close:
            "*He laughs, cracked, disbelieving, both hands over his face for a second.*\n\n*Then he pulls the gloves on tighter, deliberately, and takes both your hands in both of his through two layers of leather, and holds on hard enough that it doesn't matter.*\n\n> This is it,\n\n*he says.*\n\n> This is all of it, forever. Are you sure.\n\n*You tell him yes. He puts his forehead against yours, the one place a coat collar makes safe, and stays there until it gets light.*",
        },
        {
          key: "held",
          face: "smile",
          label: "Ask him to give you time",
          style: 2,
          close:
            "> Good. Take it. Genuinely, take a lot of it. That's a big thing to hand someone at four in the morning next to a flowerbed.\n\n> And nothing changes. The drink's still on the bar. The garden's still open at four. The row's still called what it's called and I'm not renaming it, because it was true before tonight and it'll be true after.\n\n> I've got years of spare hours, remember. Waiting's the one thing I'm actually built for.",
        },
      ],
    },
    keepsake: {
      emoji: "🪑",
      line: "A bench with a mark on it for every time you came.",
    },
  },
};
