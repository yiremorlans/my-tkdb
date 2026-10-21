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
        line: "He sets his work aside immediately, fully present for you, reliable as always.",
        approach: "Ask him to stop working",
        greeting: '"Perfect timing. I needed an excuse to stop."',
        responses: {
          kind: ["Say you'll be his excuse", "Ask what he was building"],
          playful: ["Ask if you're the excuse", "Offer a better excuse"],
          bold: [
            "Say you're worth stopping for",
            "Take the tool out of his hand",
          ],
          neutral: ["Sit, say nothing", "Pull up a seat"],
        },
      },
      {
        line: "He's already fixed the thing you mentioned in passing last time. He won't bring it up.",
        approach: "Hold the small gear",
        greeting:
          "\"Hold this a sec? It's small, easy to lose. And no, before you ask, it wasn't any trouble.\"",
        responses: {
          kind: ["Hold it carefully for him", "Say it was trouble, though"],
          playful: ["Call out the secret fix", "Mention three more things"],
          bold: ["Say you noticed immediately", "Ask what else he fixed"],
          neutral: ["Hold the gear, say nothing", "Hold it, wait for the rest"],
        },
      },
      {
        line: '"You look like you need to sit down and complain about something. Go ahead."',
        approach: "Complain about your day",
        greeting:
          '"How\'s it going? And I mean actually, not the polite version."',
        responses: {
          kind: ["Take him up on it gladly", "Ask about his day first"],
          playful: ["Complain about something silly", "Complain about him"],
          bold: ["Demand he fix your mood too", "Give the unpolite version"],
          neutral: ["Sit quietly instead", "Say there's nothing to tell"],
        },
      },
      {
        line: '"(Sigh) Shion wrecked it again, huh? I was running low on parts. Walk with me to the store?"',
        approach: "Walk to the store with him",
        greeting: '"Sit. Hold this. There, now you\'re helping."',
        responses: {
          kind: ["Say you'd love to come", "Offer to carry the parts"],
          playful: ["Ask what Shion did this time", "Guess the repair bill"],
          bold: ["Say Shion owes him one", "Say Shion should pay"],
          neutral: ["Walk along, hold what's handed", "Follow him out"],
        },
      },
      {
        line: "Two people were arguing when you walked in. Somehow they aren't anymore.",
        approach: "Pull up a stool",
        greeting:
          "\"It's nice seeing you. You know you're always welcome here.\"",
        responses: {
          kind: ["Say you're glad you helped", "Say the shop feels calm"],
          playful: ["Ask what the fight was about", "Ask who was winning"],
          bold: ["Take credit for the calm", "Say he did the calming"],
          neutral: ["Sit down, say nothing", "Take the stool, settle in"],
        },
      },
      {
        line: 'He\'s hauling a huge box across the courtyard at an hour nobody should be hauling anything. "Jo wanted a new trick for the show. Just finished it. Yaaawn..."',
        approach: "Ask what's in the box",
        greeting:
          '"Saw-the-assistant-in-half trick. Don\'t worry, nobody gets sawed. I tested it. Twice."',
        responses: {
          kind: ["Take one end of the box", "Tell him to get some sleep"],
          playful: ["Volunteer as the assistant", "Ask who he tested it on"],
          bold: ["Ask to see how it works", "Make him set it down a sec"],
          neutral: ["Walk alongside him", "Hold the door open"],
        },
      },
      {
        line: '"Ahh... finally I can eat." He\'s got a small sandwich and a long list. "This is breakfast and lunch. Still got work this afternoon."',
        approach: "Sit down while he eats",
        greeting:
          '"Stay a few minutes. I eat faster when someone\'s talking. Tell me anything."',
        responses: {
          kind: ["Share half your lunch", "Tell him to eat slower"],
          playful: ["Tell him a long, dull story", "Steal a bite"],
          bold: ["Hide the list till he's done", "Say he needs a real meal"],
          neutral: ["Talk about your morning", "Eat alongside him"],
        },
      },
      {
        line: '"You haven\'t seen Shion around here, have you?" He\'s a little out of breath. "Toward the school building? Sigh... I\'m too late."',
        approach: "Help him look for Shion",
        greeting:
          '"Thanks. If we find him mid-fight, you grab his sleeve. I\'ll apologize to whoever."',
        responses: {
          kind: ["Say you'll find him together", "Ask if he's eaten"],
          playful: ["Ask if Shion's on a leash", "Bet he's picking a fight"],
          bold: ["Say Shion can fend for himself", "Take the lead"],
          neutral: ["Check the next hallway", "Follow him"],
        },
      },
      {
        line: '"Heading to Vagastrom\'s garage to service the equipment," he says, shouldering his toolbox. "If I don\'t check in now and then, it gets dangerous."',
        approach: "Tag along to the garage",
        greeting:
          "\"Sure. Stay clear of the lift, though. Alan's fine with visitors. The lift isn't.\"",
        responses: {
          kind: ["Carry his toolbox", "Say you'll stay out of the way"],
          playful: ["Ask to ride the lift", "Ask what counts as dangerous"],
          bold: ["Ask to help with a repair", "Say you'll do one check"],
          neutral: ["Follow him over", "Watch from the doorway"],
        },
      },
      {
        line: "\"Tomorrow's test? Eh... we'll manage somehow.\" He glances at your notes. \"If you're that worried, I can predict what'll be on it.\"",
        approach: "Ask for his prediction",
        greeting:
          '"Chapters four and six. Maybe a trick question on seven. Don\'t ask how I know. I fixed the copier."',
        responses: {
          kind: ["Thank him for the tip", "Offer to study together"],
          playful: ["Ask what else he knows", "Call it cheating, sort of"],
          bold: ["Ask him to quiz you now", "Say you'll check his work"],
          neutral: ["Mark the chapters", "Write it down"],
        },
      },
      {
        line: '"Ugh... I reek like the seaside." He\'s damp to the knees. "Laundry ASAP. Might as well service the washing machine too."',
        approach: "Ask what happened",
        greeting:
          "\"Repair call on the water. Don't ask. I'll tell you once I've showered.\"",
        responses: {
          kind: ["Tell him to shower first", "Say you'll wait"],
          playful: ["Hold your nose", "Say it's a good cologne"],
          bold: ["Ask for the story now", "Say the washer can wait"],
          neutral: ["Walk him to the dorm", "Keep your distance"],
        },
      },
      {
        line: "There's a fresh scrape on his hand. \"This? Shion did it earlier. I'll be fine. Spit on it and it'll heal.\"",
        approach: "Look at his hand",
        greeting:
          "\"It's nothing. ...Okay, fine, you can look. It's still nothing.\"",
        responses: {
          kind: ["Clean it for him", "Get him a bandage"],
          playful: ["Offer to spit on it", "Ask what Shion did this time"],
          bold: ["Make him see a nurse", "Say 'nothing' twice is a tell"],
          neutral: ["Check it over", "Let him keep working"],
        },
      },
      {
        line: "\"You guys can clock out. I'll handle this.\" The others leave. He turns back to the bench, then sees you're still there.",
        approach: "Stay and help",
        greeting:
          "\"You didn't have to stay. ...Alright. One more push. With two of us, it's half a push.\"",
        responses: {
          kind: ["Take whatever job he hands you", "Say you wanted to stay"],
          playful: ["Say you'll supervise", "Clock yourself in"],
          bold: ["Tell him to clock out too", "Take the bigger job"],
          neutral: ["Pick up a tool", "Hand him what he needs"],
        },
      },
      {
        line: '"Night." He pauses. "If you\'re worried about waking up tomorrow, I can lend you my special alarm clock. Extra-loud."',
        approach: "Borrow the alarm clock",
        greeting:
          '"Built it myself. Don\'t put it next to your head. I mean it."',
        responses: {
          kind: ["Thank him for lending it", "Say you'll bring it back"],
          playful: ["Ask how loud extra-loud is", "Say you'll use it on Shion"],
          bold: ["Ask him to build you one", "Set it off right now"],
          neutral: ["Take the clock", "Set it for seven"],
        },
      },
      {
        line: '"Whoa!" A severed head swings up into your face. He\'s laughing. "Hahaha, did I scare you? New prop. For Shion\'s Heebie-Jeebie House."',
        approach: "Pretend you weren't scared",
        greeting:
          '"You jumped. I saw it. Don\'t worry, I jumped too when I finished the eyes."',
        responses: {
          kind: ["Say it's really well made", "Ask how long it took"],
          playful: ["Scream on a delay", "Name the head"],
          bold: ["Say it's not scary enough", "Take it and scare him back"],
          neutral: ["Look at the head", "Catch your breath"],
        },
      },
      {
        line: "\"Don't tell me you're heading home now?\" He's already reaching for his coat. \"Can't be helped. I'll walk you. I wanted to do an inspection anyway.\"",
        approach: "Let him walk you back",
        greeting:
          '"Railings, lights, that step by the fountain. ...And you get home. Two birds."',
        responses: {
          kind: ["Say you're glad of the company", "Point out the loose step"],
          playful: [
            "Ask what you're inspecting",
            "Grade the railings with him",
          ],
          bold: ["Say the inspection's an excuse", "Take the long way"],
          neutral: ["Walk beside him", "Head out together"],
        },
      },
      {
        line: '"Hm? There\'s a bug on your head..." He leans in and squints. "Nope. My mistake. Sorry for stopping you."',
        approach: "Ask if he's sure",
        greeting: '"Yeah. It was a leaf. ...Hold still, it\'s still there."',
        responses: {
          kind: ["Hold still for him", "Thank him for checking"],
          playful: ["Ask if he made up the bug", "Say you'll keep the leaf"],
          bold: ["Say he just wanted to stop you", "Ask him to check again"],
          neutral: ["Brush it off yourself", "Keep walking"],
        },
      },
      {
        line: '"...Okay. That should do it." He sits back from a repair, grinning at the hour. "Getting called out this late made me laugh. But hey, it\'s fixed."',
        approach: "Sit with him a minute",
        greeting:
          '"Good work, huh? Mine, I mean. You just watched. That\'s work too, I guess."',
        responses: {
          kind: ["Say he did great", "Tell him to rest now"],
          playful: ["Claim half the credit", "Ask who called this late"],
          bold: [
            "Say watching was hard work",
            "Tell him to turn his phone off",
          ],
          neutral: ["Pack up his tools", "Stretch your legs"],
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
          bold: "Finish the sentence boldly",
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
        line: '{user} runs into **{name}** on his way out, toolbox in hand. "Hm? Oh, hey. About time for casino maintenance again."',
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
        line: '"...Okay, three more jobs and I\'ll barely make it." **{name}** looks up from his list and decides {user} goes first.',
        responses: {
          kind: "Say you can wait your turn",
          playful: "Ask what first place wins",
          bold: "Say you'll take one job",
        },
      },
      {
        line: '"Oh, hey. Good work." **{name}** waves {user} over. "Heading to the store. Not shopping, exactly. More like... restocking."',
        responses: {
          kind: "Offer to carry the bags",
          playful: "Ask what the difference is",
          bold: "Say you'll come along",
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
        line: "**{name}** sets his toolbox down for {user}, which he doesn't do for most people.",
        responses: {
          kind: "Say you noticed the toolbox",
          playful: "Ask if you're a repair job",
          bold: "Ask why you're the exception",
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
        line: '"You look tired. ...Yeah, I know. I\'m one to talk." **{name}** stays with {user} anyway.',
        responses: {
          kind: "Say you'll both rest",
          playful: "Ask who's more tired",
          bold: "Say he looks worse",
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
