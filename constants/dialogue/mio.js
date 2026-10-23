export default {
  // The level-up DMs (docs/bond-scene-dms.md). Mio doesn't make speeches, he
  // makes objects, so every scene here is a thing he built plus the plain
  // sentence it stood in for. He isn't fumbling for words; building is just his
  // register, and he undercuts the warm line every time. The intimacy is that
  // the objects get more and more obviously about you, until at Soulbound he
  // says it outright, flat, and goes straight back to talking about your latch.
  bondScenes: {
    acquaintance: {
      beats: [
        "**{firstName}**: It's Mio. From Dionysia. You already know who I am, so I'll skip the rest.",
        "We've talked {timesMet} times, and every one of them has been about something to fix. That's not on you. But it means I've only ever come by your room when something's broken.\n\nSo while I'm over next, anything you actually want me to look at?\n\nDoesn't have to be broken. If there's something that'd make your week easier, I can probably build it.\n\n...Your desk, though. The light's behind you. Every time I've been by, you're reading in your own shadow. I could build you a lamp that clips on and swings clear when you don't need it. Hour, maybe.",
      ],
      choice: {
        prompt: "Yes or no on the lamp.",
        options: [
          {
            key: "kind",
            label: "Say yes, and thank him",
            style: 3,
            close:
              "It's a lamp.\n\n...You don't have to thank me for a lamp. I'll take it, though.",
          },
          {
            key: "playful",
            label: "Ask what else is broken",
            style: 1,
            close:
              "Your window latch, the second stair, and whatever you did to that chair.\n\nI keep a list. Don't read anything into the list.",
          },
          {
            key: "bold",
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
      choice: {
        prompt: "So. You coming?",
        options: [
          {
            key: "kind",
            label: "Say he needs the break more",
            style: 3,
            close:
              "...That's not how this works. I saved the cake, you take the break.\n\nFine. Ten minutes. Both of us. Hold me to it, or I'll be back at the bench in five.",
          },
          {
            key: "playful",
            label: "Ask if Shion's tried yet",
            style: 1,
            close:
              "He's been staring at the tin for ten minutes. Jo's watching him and laughing.\n\nCome quick. If you open it and there's a worm inside, that's not on me.",
          },
          {
            key: "bold",
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
      choice: {
        prompt:
          "...That wasn't fair to send. Say something and I'll pretend I didn't.",
        options: [
          {
            key: "kind",
            label: "Sit down and stay",
            style: 3,
            close:
              "*You pull the other stool over and sit. He doesn't comment on it.*\n\n*Around five he gets the eleventh one right, holds it up, and looks at you properly for the first time all night.*\n\n> Thanks for not leaving.\n\n*A beat.*\n\n> That was the whole thing, and I couldn't ask for it.",
          },
          {
            key: "playful",
            label: "Count the failures for him",
            style: 1,
            close:
              "> Ten. I know it's ten. I've been staring at them for two hours.\n\n*Something that's almost a laugh.*\n\n> Tell me it's eleven again in an hour. I'd sooner be wound up than fussed over.",
          },
          {
            key: "bold",
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
      choice: {
        prompt: "Say something back.",
        options: [
          {
            key: "kind",
            label: "Say he's allowed to miss it",
            style: 3,
            close:
              "*The reply takes a while.*\n\nNot sure I am. But I'll sit here with you saying it.\n\n*Later:* Still there? Don't answer. I just want the two ticks.\n\n*You stay up. He checks four more times.*",
          },
          {
            key: "playful",
            label: "Say you'd have guessed older",
            style: 1,
            close:
              "You would not have.\n\n...You might have. He's got eight inches on me and a temper like a house fire.\n\nThat helped more than the serious version would have. Don't repeat the house fire part.",
          },
          {
            key: "bold",
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
      choice: {
        prompt: "You can be angry. I'd honestly prefer it.",
        options: [
          {
            key: "kind",
            label: "Ask to see the arm",
            style: 3,
            close:
              "It's a boring arm.\n\n*It is not, and he lets you redo the bandage anyway, sleeve pushed up, sitting on the workshop stool and watching your hands the whole time without a word.*\n\n> You're better at this than I am.\n\n*It's the only thing he says for an hour.*",
          },
          {
            key: "playful",
            label: "Say six over four is a brag",
            style: 1,
            close:
              "It's a fifty percent margin. That's competent engineering, not showing off.\n\n...It was showing off. Slightly. With nobody watching, which makes it worse.",
          },
          {
            key: "bold",
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
      choice: {
        prompt:
          "There. You don't have to do anything with that. It's just out of the box now.",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close:
              "*Nothing at all for six minutes.*\n\n*Then footsteps on the stairs, fast, which Mio never does, and he's at your door with the box still in his hand and no plan for having arrived.*\n\n*He sets it down. Takes your face in both hands, careful, the way he handles anything he's scared of breaking, and kisses you. It is the least careful thing he has ever done.*",
          },
          {
            key: "held",
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
  },
  dialogue: {
    new: [
      {
        line: "He looks up from tinkering with something, hands still steady. There's a ready smile for you.",
        approach: "Ask what he's fixing",
        greeting:
          '"This? Hinge off the Heebie-Jeebie House door. Somebody slammed it. ...It was Shion."',
        responses: {
          kind: ["Ask if he needs another hand", "Hold the light for him"],
          playful: [
            "Ask if it's under warranty",
            "Ask if it'll come back haunted",
          ],
          bold: ["Say you came just for him", "Ask to try fixing it"],
          neutral: ["Watch him work", "Let him finish up"],
        },
      },
      {
        line: "He looks like he hasn't slept. \"I'm a natural short sleeper,\" he says, like that settles it.",
        approach: "Ask how much he slept",
        greeting:
          '"Yeah, yeah. I know how it looks. I\'m fine, really. (Yaaawn...)"',
        responses: {
          kind: ["Offer to run his next errand", "Offer him a coffee"],
          playful: ["Ask if it's genetic", "Ask if naps count against it"],
          bold: [
            "Say you'll wake him in an hour",
            "Take his next call yourself",
          ],
          neutral: ["Let the excuse stand", "Take his word for it"],
        },
      },
      {
        line: 'He\'s working on a mission tool. "Give me one second," he says, without looking up.',
        approach: "Wait until he's done",
        greeting:
          '"...There. Done. Thanks for waiting, most people start talking halfway through."',
        responses: {
          kind: ["Pass him what he reaches for", "Offer to tidy up for him"],
          playful: ["Say you nearly dozed off", "Ask if you're hired now"],
          bold: ["Say you'd have waited longer", "Ask him to show you how"],
          neutral: ["Say it was no trouble", "Let him pack up"],
        },
      },
      {
        line: "He's lugging a heavy bag through the dorm. \"Hm? Oh, this luggage? I've got a pretty big repair job to do now.\"",
        approach: "Wish him luck",
        greeting: '"Thanks. Well, safety first. I\'ll do my best."',
        responses: {
          kind: ["Help him carry it over", "Offer to hand him tools"],
          playful: ["Ask if there's a body in it", "Guess what's in it"],
          bold: ["Say you'll come along", "Ask to see the job"],
          neutral: ["Step out of his way", "Let him get going"],
        },
      },
      {
        line: "His phone buzzes with another repair request. He starts to add it to the list, then stops.",
        approach: "Ask what came in",
        greeting:
          "\"Wait a sec… Wasn't this one the carpenter cat's job? Well… complaining is more trouble than it's worth.\"",
        responses: {
          kind: ["Say he takes on too much", "Offer to take a job off him"],
          playful: ["Ask how long the list is", "Bet the list never shrinks"],
          bold: ["Say you'll come on that one", "Say he's allowed to say no"],
          neutral: ["Let him add it to the list", "Say nothing"],
        },
      },
    ],
    known: [
      {
        line: "You pass the workshop around the same time most days. He's started to notice.",
        approach: "Say hi on the way past",
        greeting: '"There you are. About that time, huh."',
        responses: {
          kind: ["Ask if he needs anything", "Bring him a snack next time"],
          playful: [
            "Ask if he's been timing you",
            "Say you'll be late to test him",
          ],
          bold: [
            "Say you'll keep the schedule",
            "Say you'll stop in next time",
          ],
          neutral: ["Wave and keep going", "Nod on the way past"],
        },
      },
      {
        line: "A little pile of spare parts sits apart from the rest of the bin. He won't say what they're for.",
        approach: "Ask what he's building",
        greeting: '"Hm? Those aren\'t for anything. ...Not yet, anyway."',
        responses: {
          kind: ["Let him keep his secret", "Say you're just curious"],
          playful: [
            "Guess what he's building",
            "Poke through the pile a little",
          ],
          bold: ["Ask to help build it", "Bring him spare parts next"],
          neutral: ["Leave the pile alone", "Say nothing about it"],
        },
      },
      {
        line: '"Back again? Good. Hold this." You\'re being included, in his way.',
        approach: "Hold it a second",
        greeting: '"Perfect. Congratulations, you\'re an apprentice now."',
        responses: {
          kind: ["Say he can count on you", "Ask what else needs a hand"],
          playful: ["Ask if holding pays", "Ask if this makes you staff"],
          bold: ["Ask for the next tool too", "Ask to do more than hold"],
          neutral: ["Keep it steady", "Do as asked, quietly"],
        },
      },
      {
        line: '"How\'s the lamp holding up?" He wants the actual answer, not the polite one.',
        approach: "Tell him you love it",
        greeting:
          '"Yeah? ...Good. I kept wondering if I got the height right."',
        responses: {
          kind: ["Say you use it every day", "Say you can read for hours now"],
          playful: [
            "Give it a five-star review",
            "Ask if it comes in more colors",
          ],
          bold: ["Say his work holds up", "Ask for an upgrade"],
          neutral: ["Give a flat status update", "Say it works, nothing more"],
        },
      },
      {
        line: "He's down to the last repair of a long day, and running on fumes.",
        approach: "Cheer him on",
        greeting: '"Yeah. Good work. ...Alright. One more push."',
        responses: {
          kind: ["Bring him something to eat", "Sweep up so he can leave"],
          playful: ["Ask if he's awake for this", "Ask who's fixing him after"],
          bold: [
            "Say you'll wait till he's done",
            "Say you're walking him back",
          ],
          neutral: ["Nod, let him work", "Say nothing, let him push on"],
        },
      },
      {
        line: "Jo leans in to tell him to quit for the night. He waves Jo off, and doesn't ask you to leave either.",
        approach: "Stay anyway",
        greeting:
          "\"Jo worries. It's nice, but I've got one more thing to finish. You can stay, though.\"",
        responses: {
          kind: [
            "Say you don't mind staying",
            "Say you like watching him work",
          ],
          playful: [
            "Bet it's three more things",
            "Ask if you're his alibi now",
          ],
          bold: ["Say you'll hold him to one", "Say he's walking you after"],
          neutral: ["Stay quietly, say nothing", "Wait without pushing him"],
        },
      },
      {
        line: "He's got a running list of small things you've mentioned. He swears it doesn't mean anything.",
        approach: "Ask what's on the list",
        greeting:
          '"Nothing much. Stuff that needs fixing, mostly. Requests pile up. I\'d lose track otherwise."',
        responses: {
          kind: ["Say you like being listened to", "Let him keep the list"],
          playful: ["Try to read it upside down", "Guess what's on it"],
          bold: ["Add one to the list", "Say you keep one too"],
          neutral: ["Let the list go unremarked", "Shrug, say nothing"],
        },
      },
      {
        line: '"Shion\'s not answering his phone. Come with me to check on him?"',
        approach: "Go with him to check",
        greeting:
          '"Quiet means trouble. Last time, he was picking fights with other dorm students. Dragging him back was a pain."',
        responses: {
          kind: [
            "Say Shion's lucky to have him",
            "Offer to check the other dorms",
          ],
          playful: [
            "Bet he's already won the fight",
            "Ask if this counts as a job",
          ],
          bold: ["Say you'll take one arm", "Say he'll come out for you"],
          neutral: ["Go along quietly", "Follow without comment"],
        },
      },
      {
        line: "The courtyard clock you check on your way to class ran slow for weeks. Now it keeps perfect time. He never said a word about it.",
        approach: "Ask if that was him",
        greeting:
          '"The clock? It was off by a few minutes. That kind of thing gets to me."',
        responses: {
          kind: [
            "Say it's nice to stop rushing",
            "Say your mornings run smoother",
          ],
          playful: ["Mourn your best excuse", "Ask if he fixes people too"],
          bold: ["Say you knew it was him", "Ask to see the clockwork"],
          neutral: ["Check the time against it", "Let it go unremarked"],
        },
      },
      {
        line: "A new rig for the Dionysia fire act sits on the bench, all guards and shutoff valves. He's about to test it.",
        approach: "Watch him test it",
        greeting:
          '"After the last tent fire, I\'m not taking chances. Flame goes up, and the second anything slips, it cuts out."',
        responses: {
          kind: ["Say you trust his work", "Offer to time the shutoff"],
          playful: [
            "Ask if it's Shion-proof too",
            "Ask who started the last fire",
          ],
          bold: ["Say it's his best work yet", "Say it could use more flame"],
          neutral: ["Watch the test quietly", "Wait for the flame"],
        },
      },
      {
        line: "You stop by the Dionysia office mid-meeting. Jo and Mio are buried in next season's schedule.",
        approach: "Knock on the doorframe",
        greeting:
          '"Oh, hey. Good timing. I was starting to read the same line twice."',
        responses: {
          kind: ["Say you can come back later", "Offer to grab them drinks"],
          playful: [
            "Ask if you're on the schedule",
            "Ask if you can be a line item",
          ],
          bold: ["Pull him out for some air", "Steal him for a few minutes"],
          neutral: ["Wait by the door", "Let them finish up"],
        },
      },
      {
        line: "He catches up with you on the way to class, still yawning.",
        approach: "Slow down for him",
        greeting:
          "\"You're heading to class now, right? I've got the same one, I think... Let's go together.\"",
        responses: {
          kind: ["Say you'd like that", "Offer to wake him if he dozes"],
          playful: ["Ask if he did the reading", "Ask if he's even awake yet"],
          bold: ["Say make it a habit", "Say he's stuck with you now"],
          neutral: ["Fall into step beside him", "Nod and head off together"],
        },
      },
      {
        line: "He passes you for the third time today, and you're headed somewhere different every time.",
        approach: "Wave a third time",
        greeting:
          '"You\'re busy again today? Yeah, same for me. You should take a break sometimes too."',
        responses: {
          kind: [
            "Ask where he's headed next",
            "Say it's nice running into him",
          ],
          playful: ["Ask if he's following you", "Say see you on lap four"],
          bold: ["Suggest a break together", "Say he never rests either"],
          neutral: ["Nod, say nothing", "Take the advice, move on"],
        },
      },
    ],
    warm: [
      {
        line: "The shop is stuffy, and he's been bent over the same repair since lunch.",
        approach: "Interrupt the repair",
        greeting:
          '"Oh, a cold drink? Thanks, I owe you one. Working cooped up in here is gonna kill me."',
        responses: {
          kind: ["Ask what you can fetch", "Clear a spot on the bench"],
          playful: ["Ask who broke it this time", "Ask if it has a name yet"],
          bold: ["Make him step outside", "Say he's taking ten minutes"],
          neutral: ["Lean on the workbench", "Watch him work"],
        },
      },
      {
        line: "Last time, you left your umbrella with a snapped spoke in his workshop. He's holding it out to you, fixed.",
        approach: "Ask when he found the time",
        greeting:
          '"Had a feeling you\'d come by, so I got it ready. Impressed?"',
        responses: {
          kind: ["Say you owe him one", "Say you're glad he remembered"],
          playful: [
            "Ask if it's Shion-proof now",
            "Ask if he added any upgrades",
          ],
          bold: ["Say you're keeping him around", "Walk him back under it"],
          neutral: ["Pop it open", "Check the spokes"],
        },
      },
      {
        line: '"...Sorry. Something just came up. I need to duck into the workshop for about fifteen minutes."',
        approach: "Wait for him",
        greeting:
          '"Hm? That was fast? Yeah... I hurried. Okay, what did you need?"',
        responses: {
          kind: ["Ask if he's eaten yet", "Ask for a break together"],
          playful: [
            "Say you'll bill whoever called",
            "Ask what he skipped to hurry",
          ],
          bold: ["Say you're coming along", "Say you just wanted him"],
          neutral: ["Wait where you are", "Wait outside the workshop"],
        },
      },
      {
        line: '"(Sigh) Shion wrecked it again, huh? I was running low on parts. Walk with me to the store?"',
        // Grumbling about Shion: banter on his side lands, fussing over him doesn't.
        mood: true,
        approach: "Tag along",
        greeting:
          '"I keep telling Shion to limit his collateral damage to me. Thanks for coming."',
        responses: {
          kind: ["Say you're happy to join", "Offer to carry parts back"],
          playful: [
            "Say you're his new assistant",
            "Ask if you're on the crew now",
          ],
          bold: ["Say it's a date, then", "Say he should ask more often"],
          neutral: ["Fall in step with him", "Follow him out"],
        },
      },
      {
        line: "He's wearing a scarf you're fairly sure belongs to Jo.",
        approach: "Ask about the scarf",
        greeting:
          '"Hm? Oh, this? I borrowed it from Jo. Does it work on me? Be honest."',
        responses: {
          kind: ["Say it suits him", "Ask if he's warm enough"],
          playful: ["Ask to borrow it next", "Ask what Jo got in trade"],
          bold: ["Say it works better on him", "Fix how it's tied"],
          neutral: ["Look him over", "Say it's fine"],
        },
      },
      {
        line: "He's crossing the courtyard with something bulky in his arms, looking like he worked late the night before.",
        approach: "Eye what he's carrying",
        greeting:
          "\"You're wondering why I'm carrying this huge box in the morning? Jo asked for a 'human-body-cutting' trick, and I just finished it. Yaaawn...\"",
        responses: {
          kind: ["Take one end of the box", "Offer to help him set it up"],
          playful: ["Ask if someone's inside", "Ask if it's safe to open"],
          bold: ["Ask for a private preview", "Say you want the first look"],
          neutral: ["Walk alongside him", "Hold the door open"],
        },
      },
      {
        line: '"Ahh... finally I can eat..." He\'s unwrapping his lunch at noon.',
        approach: "Sit down with him",
        greeting:
          "\"Yeah, this is basically breakfast and lunch. I've still got work this afternoon, though. Guess I'll keep it light.\"",
        responses: {
          kind: ["Offer him your dessert", "Bring him something to drink"],
          playful: ["Ask if Jo packed it", "Offer to trade lunches"],
          bold: ["Say you're buying him dinner", "Tell him not to rush eating"],
          neutral: ["Talk about your morning", "Eat alongside him"],
        },
      },
      {
        line: '"You haven\'t seen Shion around here, have you?"',
        approach: "Say you saw him head that way",
        greeting:
          '"He headed toward the school building? Sigh... I\'m too late..."',
        responses: {
          kind: ["Say you'll find him together", "Say you'll help him look"],
          playful: ["Bet he's picking a fight", "Suggest a Shion tracker"],
          bold: ["Take the lead", "Say you'll go drag him back"],
          neutral: ["Check the next hallway", "Follow him"],
        },
      },
      {
        line: '"I\'m heading to Vagastrom\'s garage to do some maintenance on the equipment." He shoulders his toolbox. "If I don\'t check in once in a while, it gets dangerous."',
        approach: "Follow him to the garage",
        greeting:
          '"You want to come? Okay. Watch your step, the floor\'s a mess back there."',
        responses: {
          kind: ["Offer to clear the floor", "Offer to hold the light"],
          playful: [
            "Ask what counts as dangerous",
            "Ask if Vagastrom breaks it all",
          ],
          bold: ["Ask to help with a repair", "Ask him to show you around"],
          neutral: ["Follow him over", "Watch from the doorway"],
        },
      },
      {
        line: "\"Tomorrow's test? Eh... we'll manage somehow.\"",
        // Breezy about the test: matching his "we'll manage" lands, fussing doesn't.
        mood: true,
        approach: "Admit you're worried",
        greeting: "\"If you're that worried, I can predict what'll be on it.\"",
        responses: {
          kind: ["Offer to study together", "Ask if he's had time to study"],
          playful: [
            "Say you're also winging it",
            "Ask if he can build a cram bot",
          ],
          bold: ["Ask him to quiz you now", "Bet a date on the scores"],
          neutral: ["Open your notes", "Think it over"],
        },
      },
      {
        line: "He's heading back toward Dionysia for dinner and slows down when he sees you.",
        approach: "Ask what's for dinner",
        greeting:
          "\"Jo's cooking isn't fancy or anything. It just tastes like home. Tomorrow's sweet potato rice, apparently.\"",
        responses: {
          kind: ["Offer to help set the table", "Say he deserves a good meal"],
          playful: ["Ask him to save you a bowl", "Ask if Jo takes requests"],
          bold: ["Invite yourself to dinner", "Say you'll come tomorrow"],
          neutral: ["Walk back with him", "Wish him a good dinner"],
        },
      },
      {
        line: "He's back at the workbench like nothing happened, but there's a fresh scrape across the back of his hand.",
        approach: "Look at his hand",
        greeting:
          "\"Huh? This injury? Oh, this. Shion did it earlier. I'll be fine. Spit on it and it'll heal.\"",
        responses: {
          kind: ["Offer to wrap it for him", "Ask if it hurts"],
          playful: ["Ask if that's a new look", "Ask if it was a fair fight"],
          bold: ["Say he can't ignore that", "Say it needs a real bandage"],
          neutral: ["Check it over", "Let him keep working"],
        },
      },
      {
        line: "\"You guys can clock out for today. I'll handle this.\" The clockwork artisans file out. He turns back to the bench, then sees you're still there.",
        approach: "Stay and help",
        greeting:
          "\"You're not on the clock, you know. ...Stay if you want. Just don't stay up as late as me.\"",
        responses: {
          kind: ["Say you wanted to stay", "Say you'll lend a hand"],
          playful: ["Say you'll clock in", "Say you'll supervise"],
          bold: [
            "Say you'll leave when he does",
            "Say you're not going anywhere",
          ],
          neutral: ["Roll up your sleeves", "Hand him what he needs"],
        },
      },
      {
        line: 'You mention an early start tomorrow as you say goodnight. "Night. If you\'re worried about waking up tomorrow, I can lend you my special alarm clock, with an extra-loud alarm."',
        // Showing off a gadget: playing with it lands, fussing over him doesn't.
        mood: true,
        approach: "Borrow the alarm clock",
        greeting: '"Here. Keep it as long as you want. I barely sleep anyway."',
        responses: {
          kind: ["Say you'll take care of it", "Say you'll bring it back"],
          playful: [
            "Ask if it wakes the whole dorm",
            "Ask if it has a snooze button",
          ],
          bold: ["Ask for a wake-up call instead", "Set it off right now"],
          neutral: ["Take the clock", "Set it for seven"],
        },
      },
      {
        line: 'He hears you sniffle again. "Do you get hay fever? I can lend you a high-performance mask I made."',
        approach: "Take him up on it",
        greeting:
          '"Yeah? Okay. It filters out pretty much everything. Take care of yourself, okay?"',
        responses: {
          kind: ["Say it's sweet he noticed", "Ask if it's his only one"],
          playful: [
            "Ask if it's also a disguise",
            "Ask if it blocks out exams too",
          ],
          bold: ["Say you'll keep it, then", "Say you'll take what he's got"],
          neutral: ["Wipe your nose", "Rub your eyes"],
        },
      },
      {
        line: "\"Hey, don't tell me you're heading home now? Guess it can't be helped.\" He's already reaching for his coat. \"I'll walk you back to the dorm. I wanted to do an inspection anyway.\"",
        approach: "Let him walk you back",
        greeting:
          '"Night. ...Hm? Oh, the inspection? Right. I\'ll swing by tomorrow. Catch you later."',
        responses: {
          kind: ["Say you're glad of the company", "Tell him to get home safe"],
          playful: [
            "Ask if he forgot his excuse",
            "Ask if you were the inspection",
          ],
          bold: [
            "Ask if he wants to come in",
            "Say he can inspect you anytime",
          ],
          neutral: ["Walk beside him", "Head out together"],
        },
      },
      {
        line: '"Hm? Looks like there\'s a bug on your head..." He leans in. "Nope. My mistake. Sorry for stopping you."',
        approach: "Ask if he's sure",
        greeting: '"Yeah, I\'m sure. ...So, where were you headed?"',
        responses: {
          kind: ["Thank him for checking", "Say that's a relief"],
          playful: ["Ask if the bug flew away", "Ask if he's sure it's gone"],
          bold: ["Ask why he really stopped you", "Say he can look closer"],
          neutral: ["Brush it off yourself", "Keep walking"],
        },
      },
      {
        line: "You're hurrying through his workshop when he catches your arm and stops you mid-step.",
        approach: "Hold his gaze",
        greeting:
          '"Wait, wait. When you move around here, you shouldn\'t run. The floor over there is slightly sloped."',
        responses: {
          kind: ["Say you'll watch your step", "Say you'll be mindful"],
          playful: [
            "Ask if there's a speed limit",
            "Ask if you're under arrest",
          ],
          bold: ["Say you've already fallen", "Say he's got a strong grip"],
          neutral: ["Slow your steps", "Look down at the floor"],
        },
      },
    ],
    spark: [
      {
        line: "The steady hands aren't steady. He notices you noticing.",
        approach: "Stay past closing",
        greeting: '"Stay past closing. Please. That\'s not an artisan asking."',
        responses: {
          kind: "Tell him to take his time",
          playful: "Wind him up",
          bold: "Say the thing he can't",
          neutral: "Let the moment stretch",
        },
      },
      {
        line: "He fixes your watch strap and keeps hold of your wrist afterward.",
        approach: "Give him your hand",
        greeting:
          '"Give me your hand a sec. ...Okay, I don\'t actually need it. I just wanted it."',
        responses: {
          kind: "Give him your hand",
          playful: "Ask if he's done yet",
          bold: "Keep hold of his wrist",
          neutral: "Let go first",
        },
      },
      {
        line: '"I\'m usually better at saying things," he admits. "This one keeps not coming out."',
        approach: "Let him try to say it",
        greeting:
          "\"I've been trying to say this since spring. I'm still trying.\"",
        responses: {
          kind: "Say it for him",
          playful: "Guess the ending for him",
          bold: "Say you've been waiting too",
          neutral: "Let him find the words",
        },
      },
      {
        line: "He's the calm one. He is not calm right now, and it's entirely your fault.",
        approach: "Sit closer",
        greeting:
          '"You keep sitting that close. I keep letting you. Neither of us is subtle."',
        responses: {
          kind: "Ease off, let him breathe",
          playful: "Sit closer still",
          bold: "Sit closer on purpose",
          neutral: "Watch him struggle quietly",
        },
      },
      {
        line: "He looks up from the bench and doesn't look away when you catch him.",
        approach: "Hold his gaze back",
        greeting:
          '"I hold everyone together. You\'re the thing that undoes me. Bit inconvenient."',
        responses: {
          kind: "Don't look away",
          playful: "Catch him looking again",
          bold: "Close the distance yourself",
          neutral: "Look away first",
        },
      },
    ],
    close: [
      {
        line: '"You know you can always count on me, right?" he says warmly. "For anything you need."',
        approach: "Stay as long as you want",
        greeting:
          "\"Take the stool by the bench. I'll keep tinkering, you keep me company. That's all I need.\"",
        responses: {
          kind: "Tell him he matters too",
          playful: "Drag him out of the workshop",
          bold: "Be bold enough to need him",
          neutral: "Keep him company in silence",
        },
      },
      {
        line: "He asks how you really are, and then waits, properly waits, for the real answer.",
        approach: "Ask how he's really doing",
        greeting:
          "\"You're the only one who asks how I'm doing. It gets me every time.\"",
        responses: {
          kind: "Ask what he needs for once",
          playful: "Make him laugh genuinely",
          bold: "Ask him the same, insist",
          neutral: "Give a plain answer",
        },
      },
      {
        line: '"I keep this one wound for you," he says, showing you the little mechanism. "No reason."',
        approach: "Ask about the mechanism",
        greeting:
          '"You\'ve become someone really important to me. I hope you know that."',
        responses: {
          kind: "Ask why he keeps it wound",
          playful: "Wind up his clockwork",
          bold: "Say you know the reason",
          neutral: "Let him finish the movement",
        },
      },
      {
        line: "He's the one everyone leans on. With you, he lets himself lean back.",
        approach: "Go sit beside him",
        greeting:
          '"I hold everyone together around here. You hold me. Fair trade."',
        responses: {
          kind: "Let him lean on you",
          playful: "Tease him for leaning back",
          bold: "Tell him to stop fixing",
          neutral: "Let him lean, say nothing",
        },
      },
      {
        line: "The steady hands go still when you take them. He lets that happen.",
        approach: "Take his hands",
        greeting:
          '"Stay as long as you want. I like the workshop better with you in it."',
        responses: {
          kind: "Stay as long as he'll let you",
          playful: "Tease him for going still",
          bold: "Take the work out of his hands",
          neutral: "Sit with him",
        },
      },
    ],
    bound: [
      {
        line: "The steady hands are steady again, and they know exactly what they're doing.",
        approach: "Let him lean back",
        greeting:
          "\"Everyone leans on me. You're the one I lean back on. Do you know what that's worth?\"",
        responses: {
          kind: "Tell him what it's worth",
          playful: "Tease him for being smug",
          bold: "Pull him from the bench",
          neutral: "Sit in the quiet",
        },
      },
      {
        line: "He fixes your necklace clasp, kisses the back of your neck, and goes back to work.",
        approach: "Come here",
        greeting: '"Come here. Yeah, just like that. Don\'t move."',
        responses: {
          kind: "Lean into the kiss",
          playful: "Undo the clasp again",
          bold: "Say it first",
          neutral: "Let the clocks tick",
        },
      },
      {
        line: '"You undo me," he says calmly, which from him is practically shouting.',
        approach: "Undo him back",
        greeting:
          '"I love you. Took me eleven months to say it. I\'ll say it daily to make up the deficit."',
        responses: {
          kind: "Say it back",
          playful: "Make the calm one falter",
          bold: "Undo him further, on purpose",
          neutral: "Let the words sit",
        },
      },
      {
        line: "He holds you like something he intends to keep in working order forever.",
        approach: "Stay",
        greeting: '"Stay. The workshop\'s not going anywhere. Neither am I."',
        responses: {
          kind: "Let him lean on you",
          playful: "Close the door yourself",
          bold: "Hold him just as tightly",
          neutral: "Let him finish the piece",
        },
      },
      {
        line: "He's the calm one. In the dark he is not calm at all, and it's a revelation.",
        approach: "Close the door",
        greeting:
          '"Close the door. Not for anything sinister. Okay, somewhat sinister."',
        responses: {
          kind: "Stay close, let him unravel",
          playful: "Tease the 'sinister' line",
          bold: "Tell him not to move",
          neutral: "Let the dark do its work",
        },
      },
    ],
  },
  // kind is Mio's channel (affinityByResponse.kind = 2): he pours care outward
  // and waves off anything coming back ("Make sure you give yourself a break",
  // "I don't need much sleep", "bit of spit and it'll heal"), so noticing him,
  // telling him to rest, and letting him lean is what actually lands. playful
  // reaches him too (1): dry banter and playing along with his fussing are a
  // register he enjoys, but they double as his deflection, so they land
  // softer. bold glances off (0): he can't finish his own confession
  // ("This one keeps not coming out") and undercuts sincerity the moment it
  // turns heavy, so a blunt push reads as the player pressing and Mio easing
  // back rather than meeting it.
  //
  // When the old per-tier `responses` pool was folded onto the beats above,
  // one neutral label had no genuine beat match ("Let the phone ring") and
  // was dropped rather than force-placed.
  // The /call reveal lines for this character, keyed by the register in
  // WINNER_LINE_BUCKETS (constants/publicEncounters.js). Picked from at random
  // like the dialogue; {user} is the winner's mention and {name} their full
  // name, and the embed's winner line is the only place the reveal names
  // either of them. A register left out here falls back to the generic
  // WINNER_LINES pool.
  winnerLines: {
    new: [
      {
        line: '{user} runs into **{name}** on his way out, toolbox in hand. "Oh, hey. About time for casino maintenance again."',
        responses: {
          kind: "Wish him a smooth job",
          playful: "Ask if Romeo tips",
          bold: "Say you'll go with him",
        },
      },
      {
        line: '{user} calls his name, and **{name}** waves without slowing down. "Got work before class. Go on ahead, I\'ll catch up."',
        responses: {
          kind: "Say you'll save him a seat",
          playful: "Ask if that's a promise",
          bold: "Walk with him to the job",
        },
      },
      {
        line: '**{name}** nearly walks into {user} on his way to class. "...School building, then the workshop... I\'ll barely make it on time. Oh, sorry. Didn\'t see you."',
        responses: {
          kind: "Tell him not to worry",
          playful: "Ask if he's always this busy",
          bold: "Say you'll walk him there",
        },
      },
      {
        line: '{user} passes **{name}** between classes. He nods as he goes by. "Nice work today. Let\'s get through this day too."',
        responses: {
          kind: "Wish him luck with his day",
          playful: "Ask if that's a pep talk",
          bold: "Say you'll hold him to it",
        },
      },
    ],
    known: [
      {
        line: '"If this is a repair request, it\'s going on the list." **{name}** looks up and sees it\'s {user}. "Oh, it\'s just you. Good."',
        responses: {
          kind: "Say no repairs today",
          playful: "Add yourself to the list",
          bold: "Ask to skip the list",
        },
      },
      {
        line: '{user} says hi, and **{name}** holds something out to them. "Good timing. Hold this a sec."',
        responses: {
          kind: "Hold it for him",
          playful: "Ask what it does",
          bold: "Say a sec is never a sec",
        },
      },
      {
        line: '"You\'re busy again today? Yeah, same." **{name}** makes a minute for {user} anyway.',
        responses: {
          kind: "Say you'll take the minute",
          playful: "Compare to-do lists",
          bold: "Say he's busier than you",
        },
      },
    ],
    warm: [
      {
        line: '{user} calls his name, and **{name}** startles awake. "Crap... I nodded off. Been doing that a lot lately, even during the day."',
        responses: {
          kind: "Ask what's keeping him up",
          playful: "Say you caught him napping",
          bold: "Say he can nap on you",
        },
      },
      {
        line: '"Shion can wait five minutes." **{name}** pockets his phone and turns to {user}.',
        responses: {
          kind: "Say you'll keep it to five",
          playful: "Ask what Shion broke now",
          bold: "Ask for ten instead",
        },
      },
      {
        line: '{user} calls his name, and **{name}** waves. "Hey, you seen Elias around? Guess the warmer weather\'s got him going on more walks lately."',
        responses: {
          kind: "Say you'd take a walk too",
          playful: "Say you're better company",
          bold: "Ask him on a walk instead",
        },
      },
    ],
    spark: [
      {
        line: '"Hm? Looks like there\'s a bug on your head… Nope, my mistake." **{name}** just wanted a closer look at {user}.',
        responses: {
          kind: "Let him look",
          playful: "Check for the bug anyway",
          bold: "Say he just wanted to look",
        },
      },
      {
        line: "**{name}** answers {user} and forgets which pocket the screwdriver's in. Twice.",
        responses: {
          kind: "Help him find it",
          playful: "Point at the right pocket",
          bold: "Say you fluster him",
        },
      },
      {
        line: '"...Huh. It\'s you." **{name}** stops pretending to check his tool case and just looks at {user}.',
        responses: {
          kind: "Say hi to him",
          playful: "Ask if the case is fine",
          bold: "Say he wasn't checking it",
        },
      },
    ],
    close: [
      {
        line: '"Why do I always get sleepy around you?" **{name}** asks {user}, and doesn\'t wait for an answer.',
        responses: {
          kind: "Say you'll be his pillow",
          playful: "Ask if you're boring",
          bold: "Say it means he trusts you",
        },
      },
      {
        line: "**{name}** lets his phone ring out for {user}. Whoever's broken something can wait.",
        responses: {
          kind: "Say the call can wait",
          playful: "Ask who broke what",
          bold: "Tell him to answer it",
        },
      },
      {
        line: "\"Stay a sec. You're the only one who doesn't need something fixed.\" **{name}** says it to {user} like a complaint.",
        responses: {
          kind: "Stay a while with him",
          playful: "Ask him to fix your hair",
          bold: "Say he needs fixing too",
        },
      },
    ],
    bound: [
      {
        line: "\"I love you. ...Okay, that's the sentence. Now tell me about your day.\" **{name}** doesn't let go of {user}'s hand.",
        responses: {
          kind: "Tell him about your day",
          playful: "Make him say it twice",
          bold: "Say it back first",
        },
      },
      {
        line: "**{name}** rests his forehead on {user}'s shoulder, yawns, and stays right there.",
        responses: {
          kind: "Let him rest there",
          playful: "Count his yawns",
          bold: "Tell him to go to bed",
        },
      },
      {
        line: '"I\'ll walk you back. I wanted to do an inspection anyway." **{name}** falls into step beside {user}.',
        responses: {
          kind: "Let him walk you",
          playful: "Ask what he's inspecting",
          bold: "Say you'll inspect him",
        },
      },
    ],
  },
};
