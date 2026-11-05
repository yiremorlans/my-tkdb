// Mio's bond scenes, read as DIALOGUE.mio.bondScenes
// (constants/dialogue/mio.js imports this file).
//
// The level-up DMs (docs/bond-scene-dms.md). Mio doesn't make speeches, he
// makes objects, so every scene here is a thing he built plus the plain
// sentence it stood in for. He isn't fumbling for words; building is just his
// register, and he undercuts the warm line every time. The intimacy is that
// the objects get more and more obviously about you, until at Soulbound he
// says it outright, flat, and goes straight back to talking about your latch.
export default {
  acquaintance: {
    beats: [
      "**{firstName}**: It's Mio. From Dionysia. You already know who I am, so I'll skip the rest.",
      "We've talked {timesMet} times, and every one of them has been about something to fix. That's not on you. But it means I've only ever come by your room when something's broken.\n\nSo while I'm over next, anything you actually want me to look at?\n\nDoesn't have to be broken. If there's something that'd make your week easier, I can probably build it.\n\n...Your desk, though. The light's behind you. Every time I've been by, you're reading in your own shadow. I could build you a lamp that clips on and swings clear when you don't need it. Hour, maybe.",
    ],
    faces: { 0: "default", 1: "smile" },
    choice: {
      prompt: "Yes or no on the lamp.",
      options: [
        {
          key: "kind",
          face: "smile",
          label: "Say yes, and thank him",
          style: 3,
          close:
            "It's a lamp.\n\n...You don't have to thank me for a lamp. I'll take it, though.",
        },
        {
          key: "playful",
          face: "sweat",
          label: "Ask what else is broken",
          style: 1,
          close:
            "Your window latch, the second stair, and whatever you did to that chair.\n\nI keep a list. Don't read anything into the list.",
        },
        {
          key: "bold",
          face: "surprise",
          label: "Ask him to stay after",
          style: 4,
          close:
            "Stay after?\n\n...Sure. Yeah. I'll finish the lamp first, then I'm all yours for a bit.",
        },
      ],
    },
    keepsake: {
      emoji: "💡",
      line: "A lamp that aims the light where you need it, because he noticed where it wasn't.",
    },
  },

  friend: {
    beats: [
      "**{firstName}**: Jo baked. Shion's already on his second slice, so I moved fast.",
      "I saved you one. It's in a tin, but a lock wouldn't do anything against Shion. Remember my toolbox full of worms?\n\nSo I'm not letting it out of my sight until you get here.",
      "It's good cake. You'll like it.\n\nYou always have {favResponse} for me, even when I'm running between three jobs. Cake's the least I can do.\n\nTake a break when you get here. I'll keep Shion off you for it.",
    ],
    faces: { 0: "default", 1: "annoyed", 2: "smile" },
    choice: {
      prompt: "So. You coming?",
      options: [
        {
          key: "kind",
          face: "sweat",
          label: "Say he needs the break more",
          style: 3,
          close:
            "...That's not how this works. I saved the cake, you take the break.\n\nFine. Ten minutes. Both of us. Hold me to it, or I'll be back at the bench in five.",
        },
        {
          key: "playful",
          face: "smile",
          label: "Ask if Shion's tried yet",
          style: 1,
          close:
            "He's been staring at the tin for ten minutes. Jo's watching him and laughing.\n\nCome quick. If you open it and there's a worm inside, that's not on me.",
        },
        {
          key: "bold",
          face: "close",
          label: "Ask him to split it with you",
          style: 4,
          close:
            "...Half? Sure. I skipped lunch anyway.\n\nCome by the office. I'll put the kettle on.",
        },
      ],
    },
    keepsake: {
      emoji: "🍰",
      line: "A slice of Jo's cake in a tin, kept safe from Shion until you came for it.",
    },
  },

  closeFriend: {
    beats: [
      "**{firstName}**: You up? I'm in the workshop. Come down if you are. Don't get up if you're not, it's not important.",
      "*Three in the morning, and he clearly hasn't slept. The bench holds the same small mechanism built eleven times over, ten of them wrong.*\n\n> Shion had a bad night. I've been up with him since one, and now I can't stop, so I'm doing this instead.",
      "*He puts the file down.*\n\n> Everyone here thinks I've got it handled. Jo, Elias, Shion. And I have got it handled, I'm not complaining. I'd do it forever.\n\n> I just wanted one person to have seen the bench look like this. That's all. Go back to bed.",
    ],
    faces: { 0: "default", 1: "serious", 2: "close" },
    choice: {
      prompt:
        "...That wasn't fair to send. Say something and I'll pretend I didn't.",
      options: [
        {
          key: "kind",
          face: "blush",
          label: "Sit down and stay",
          style: 3,
          close:
            "*You pull the other stool over and sit. He doesn't comment on it.*\n\n*Around five he gets the eleventh one right, holds it up, and looks at you properly for the first time all night.*\n\n> Thanks for not leaving.\n\n*A beat.*\n\n> That was the whole thing, and I couldn't ask for it.",
        },
        {
          key: "playful",
          face: "smile",
          label: "Count the failures for him",
          style: 1,
          close:
            "> Ten. I know it's ten. I've been staring at them for two hours.\n\n*Something that's almost a laugh.*\n\n> Tell me it's eleven again in an hour. I'd sooner be wound up than fussed over.",
        },
        {
          key: "bold",
          face: "serious",
          label: "Ask who looks after him",
          style: 4,
          close:
            "*He goes still.*\n\n> That's not how it works. He's my brother.\n\n*Quieter, at the bench:*\n\n> Nobody. It's nobody, and you're the first person who's made me say it out loud. You can stop now.\n\n*He doesn't move off when you put a hand on his back. He leans into it, a little.*",
        },
      ],
    },
    keepsake: {
      emoji: "🔧",
      line: "Ten failed attempts on a bench, and one person there to see them.",
    },
  },

  confidant: {
    beats: [
      "**{firstName}**: I'm going to tell you something about Shion. It doesn't leave this DM. Not Jo, not anyone.",
      "Shion calls me his little brother. Has for years. Blood doesn't come into it and he'd bite your head off if you asked, so don't.\n\nIt didn't used to run this way round. When we first knew each other he was the one who turned up for me, wherever I'd ended up, frightening about it even then. I never minded.",
      "Somewhere in the last few years it flipped. Now I'm the one who turns up, and he lets me, and we don't talk about the swap.\n\nI'd do it another sixty years, so don't hear this wrong. I just miss having a brother instead of a duty.\n\n(I've got a real kid brother and sister back home. I miss them the ordinary way. This isn't that.)",
    ],
    faces: { 0: "serious", 1: "smile", 2: "close" },
    choice: {
      prompt: "Say something back.",
      options: [
        {
          key: "kind",
          face: "smile",
          label: "Say he's allowed to miss it",
          style: 3,
          close:
            "*The reply takes a while.*\n\nNot sure I am. But I'll sit here with you saying it.\n\n*Later:* Still there? Don't answer. I just want the two ticks.\n\n*You stay up. He checks four more times.*",
        },
        {
          key: "playful",
          face: "full_smile",
          label: "Say you'd have guessed older",
          style: 1,
          close:
            "You would not have.\n\n...You might have. He's got eight inches on me and a temper like a house fire.\n\nThat helped more than the serious version would have. Don't repeat the house fire part.",
        },
        {
          key: "bold",
          face: "serious",
          label: "Tell him to say it to Shion",
          style: 4,
          close:
            "No.\n\n*Immediate. Then a long silence.*\n\n...He'd hear it as me being tired of him. As me leaving. He's spent his whole life waiting for someone to, and I made a job out of being the one who doesn't.\n\nAsk me again in a year. You will, won't you.",
        },
      ],
    },
    keepsake: {
      emoji: "🖼️",
      line: "The older brother is the one nobody would guess.",
    },
  },

  devoted: {
    beats: [
      "**{firstName}**: Don't be angry.",
      "*The photo is his forearm, bandaged wrist to elbow. Behind it on the bench, something bent badly out of true.*\n\nThe gantry in the lower hall was coming down and you were under it. No time to do it properly, so I did it improperly. I had about four seconds. It held for six.\n\nNormally I'd tell you to spit on it and it'll heal. I've told Shion that more times than I can count. Not this time.",
      "Here's the honest part. I run the numbers on everything before anyone moves. Every load, every risk. That's the job, and it's most of me.\n\nThis time I didn't run anything. I looked up, saw where you were standing, and my hands were already on the gantry.\n\nSix years, and that has not happened once.",
    ],
    faces: { 0: "sweat", 1: "serious", 2: "blush" },
    choice: {
      prompt: "You can be angry. I'd honestly prefer it.",
      options: [
        {
          key: "kind",
          face: "close",
          label: "Ask to see the arm",
          style: 3,
          close:
            "It's a boring arm.\n\n*It is not, and he lets you redo the bandage anyway, sleeve pushed up, sitting on the workshop stool and watching your hands the whole time without a word.*\n\n> You're better at this than I am.\n\n*It's the only thing he says for an hour.*",
        },
        {
          key: "playful",
          face: "smile",
          label: "Say six over four is a brag",
          style: 1,
          close:
            "It's a fifty percent margin. That's competent engineering, not showing off.\n\n...It was showing off. Slightly. With nobody watching, which makes it worse.",
        },
        {
          key: "bold",
          face: "surprise_blush",
          label: "Give the thing a name for him",
          style: 4,
          close:
            "*You tell him what to call it.*\n\n*The typing indicator comes on and goes off, four separate times.*\n\n...Right. Yes. That's the word. I knew it was that word.\n\nGive me a minute. Don't go anywhere.",
        },
      ],
    },
    keepsake: {
      emoji: "🧮",
      line: "Four seconds of math he didn't stop to do.",
    },
  },

  soulbound: {
    beats: [
      "**{firstName}**: I built a thing. I'm going to describe it, then say the actual sentence, because a thing on its own still has to be guessed at and you've done enough of that.",
      "*The photo is a small brass box with two dials. One shows a number. The other is blank.*\n\nFirst dial is {timesMet}. It climbs on its own. I wired it to the door sensor, which took a month and is completely absurd.\n\nSecond dial doesn't do anything yet. I couldn't work out what it was for. That's been the problem for about eight months.",
      "I've made you a lamp, fixed your latch, guarded a slice of cake from Shion, and done forty other things. Every one of them stood in for something I hadn't said.\n\nMy dad gave me a wind-up music box when I was small. No words on it, and I still knew. That's probably where all of this started.\n\nYou kept every piece. I noticed that too.",
      "So. The second dial.\n\nI love you. Since roughly the hinge. I built around it for a year because that's how I say things. The blank dial was always where the sentence went. I just hadn't put it there.\n\nThere it is, in words. Sending it before I take the dial off the box.",
    ],
    faces: { 0: "sweat", 1: "smile", 2: "close", 3: "blush" },
    choice: {
      prompt:
        "There. You don't have to do anything with that. It's just out of the box now.",
      options: [
        {
          key: "answered",
          face: "full_smile_blush",
          label: "Say it back",
          style: 3,
          close:
            "*Nothing at all for six minutes.*\n\n*Then footsteps on the stairs, fast, which Mio never does, and he's at your door with the box still in his hand and no plan for having arrived.*\n\n*He sets it down. Takes your face in both hands, careful, the way he handles anything he's scared of breaking, and kisses you. It is the least careful thing he has ever done.*",
        },
        {
          key: "held",
          face: "smile",
          label: "Ask him to give you time",
          style: 2,
          close:
            "Yes. Obviously. Take as long as you want.\n\nI spent a year not saying it. I'm not going to hand it over and start a clock on you.\n\nI'm still fixing your latch. And the second stair you keep ignoring. None of that was ever about this. I'd have done it if you'd never spoken to me at all. It's just what I do about people.\n\n*The box stays on your shelf. The first dial keeps climbing.*",
        },
      ],
    },
    keepsake: {
      emoji: "🎛️",
      line: "A brass box with two dials, and the blank one finally filled.",
    },
  },
};
