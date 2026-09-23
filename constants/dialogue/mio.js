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
        "**{firstName}**: Made you something. It's small. Not really a big deal.",
        "*The photo is a brass mechanism about the size of a matchbox, with a fold-out arm.*\n\nIt's a doorstop. Clockwork, because I couldn't help myself. It lets go once the room drops past a set temperature, so your door shuts itself when that corridor gets cold, around three.",
        "You leave it propped open. You've got {favResponse} for everyone, me included. I notice things and then build about them instead of saying them. Jo calls that a personality problem.\n\nAnyway. Doorstop.",
      ],
      choice: {
        prompt: "That's the message. You don't have to answer it.",
        options: [
          {
            key: "kind",
            label: "Say nobody's done that",
            style: 3,
            close:
              "...Oh.\n\n*A few minutes later:* I build things for people all the time. Haru's arm, Romeo's prosthetic. People just start using them, which is the job and that's fine.\n\nNobody's put it the way you did. Give me a minute.",
          },
          {
            key: "playful",
            label: "Ask what it does at three",
            style: 1,
            close:
              "Nothing. It's a doorstop.\n\n...It chimes. Very quietly. I can take that out. Don't, actually. I like it.",
          },
          {
            key: "bold",
            label: "Ask him to fit it himself",
            style: 4,
            close:
              "*He's at your door with the toolbox before you've put your phone down, and it takes him four times as long as it should because his hands won't settle.*\n\n*He tells the doorframe, not you:*\n\n> I'll come check it. Regularly.\n\n*It will not need checking.*",
          },
        ],
      },
      keepsake: {
        emoji: "⚙️",
        line: "A clockwork doorstop that chimes at three and won't say why.",
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
        "I've made you a doorstop, a latch, a lamp, the thing that chimes at three, and forty other objects. Every one of them stood in for something I hadn't said.\n\nMy dad gave me a wind-up music box when I was small. No words on it, and I still knew. That's probably where all of this started.\n\nYou kept every piece. I noticed that too.",
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
          '"This? Hinge on a stage set. Somebody sat on it. ...Shion sat on it."',
        responses: {
          kind: ["Offer to hold something", "Say it's looking good"],
          playful: ["Share a laugh", "Ask if Shion's okay too"],
          bold: ["Say you came just for him", "Ask to try fixing it"],
          neutral: ["Watch him work", "Let him finish the hinge"],
        },
      },
      {
        line: "He looks like he hasn't slept. \"I'm a natural short sleeper,\" he says, like that settles it.",
        approach: "Don't buy the excuse",
        greeting:
          '"Yeah, yeah. I know how it looks. I\'m fine, really. Yaaawn..."',
        responses: {
          kind: ["Tell him to actually rest", "Offer to cover a job for him"],
          playful: ["Tease the 'natural' excuse", "Count his yawns out loud"],
          bold: ["Call out the lie directly", "Tell him to go take a nap"],
          neutral: ["Let the excuse stand", "Take his word for it"],
        },
      },
      {
        line: '"Give me one second," he says, and finishes the movement without a single wasted motion.',
        approach: "Wait for him to finish",
        greeting:
          '"Okay. Done. Thanks for waiting, most people start talking halfway through."',
        responses: {
          kind: ["Say he's got a lot on", "Ask if he's had a break"],
          playful: ["Time how long 'one sec' was", "Ask if you get a prize"],
          bold: ["Say you'd have waited longer", "Ask what he just finished"],
          neutral: ["Say it was no trouble", "Let him pack up"],
        },
      },
      {
        line: '"Wait, wait. You shouldn\'t run around here. The floor over there is slightly sloped."',
        approach: "Watch your step",
        greeting: '"There you go. Safety first."',
        responses: {
          kind: ["Thank him for the warning", "Say it's good advice"],
          playful: ["Salute him", "Lean with the slope on purpose"],
          bold: ["Run anyway, on purpose", "Tell him to relax a little"],
          neutral: ["Nod and keep going", "Say nothing, walk on"],
        },
      },
      {
        line: "His phone buzzes with another repair request. He reads it and adds it to the list.",
        approach: "Ask what came in",
        greeting:
          '"Wait a sec… Wasn\'t this one the carpenter cat\'s job? Well… complaining is more trouble than it\'s worth."',
        responses: {
          kind: ["Say he takes on too much", "Offer to take a job off him"],
          playful: ["Ask who the carpenter cat is", "Offer to complain for him"],
          bold: ["Tell him to send it back", "Say he's allowed to say no"],
          neutral: ["Let him add it to the list", "Say nothing"],
        },
      },
    ],
    known: [
      {
        line: "He's learned your name and roughly when you turn up, like it's worth remembering.",
        approach: "Say that counts",
        greeting: '"You again, huh. Not complaining, just noting it."',
        responses: {
          kind: ["Say it's nice being noticed", "Say you'll keep turning up"],
          playful: ["Ask what else he's tracking", "Tease him for noting it"],
          bold: ["Say of course it counts", "Claim the noticing as yours"],
          neutral: ["Shrug, it counts or not", "Let it go unremarked"],
        },
      },
      {
        line: "A little pile of spare parts sits apart from the rest of the bin. He won't say what they're for.",
        approach: "Ask what he's building",
        greeting:
          "\"Hm? Oh, those. Spare parts. We're gonna need to restock soon.\"",
        responses: {
          kind: ["Let him keep his secret", "Say you're just curious"],
          playful: [
            "Guess what he's building",
            "Poke through the pile a little",
          ],
          bold: ["Demand to know what it's for", "Look through the parts"],
          neutral: ["Leave the pile alone", "Say nothing about it"],
        },
      },
      {
        line: '"Back again? Good. Hold this." You\'re being included, in his way.',
        approach: "Hold it a second",
        greeting:
          '"Hold this a sec. Congratulations, you\'re an apprentice now."',
        responses: {
          kind: ["Hold it carefully", "Take the job seriously"],
          playful: ["Ask for a real apprenticeship", "Demand a title upgrade"],
          bold: ["Take over the tool instead", "Ask to do more than hold"],
          neutral: ["Hold it, say nothing", "Do as asked, quietly"],
        },
      },
      {
        line: '"How\'d that thing turn out? The one from last week." He wants the actual answer.',
        approach: "Say it's working great",
        greeting:
          '"The lamp. Still swinging clear when you don\'t need it, or did the hinge stick again?"',
        responses: {
          kind: ["Say it's working perfectly", "Thank him again for the lamp"],
          playful: ["Report a fake malfunction", "Ask for an upgrade"],
          bold: [
            "Say it's fine, stop worrying",
            "Tell him to trust his own work",
          ],
          neutral: ["Give a flat status update", "Say it's fine, move on"],
        },
      },
      {
        line: '"Nice work today. Let\'s get through this day too."',
        approach: "Cheer him on",
        greeting: '"Yeah. Good work. ...Alright. One more push."',
        responses: {
          kind: ["Offer to help him finish", "Tell him not to overdo it"],
          playful: ["Bet he won't make it", "Race him to the end"],
          bold: [
            "Tell him to just stop for once",
            "Push him to take the break",
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
          kind: ["Say you don't mind staying", "Offer to help him finish"],
          playful: [
            "Side with Jo, tease him",
            "Threaten to tell Jo you stayed",
          ],
          bold: ["Refuse to leave either", "Tell him to actually quit"],
          neutral: ["Stay quietly, say nothing", "Wait without pushing him"],
        },
      },
      {
        line: "He's got a running list of small things you've mentioned. He swears it doesn't mean anything.",
        approach: "Ask what's on the list",
        greeting:
          "\"Nothing much. Stuff that needs fixing, mostly. Don't read into it.\"",
        responses: {
          kind: ["Say that's sweet, actually", "Let him keep the list"],
          playful: ["Demand to see the list", "Guess what's on it"],
          bold: ["Read into it anyway", "Push him to admit it matters"],
          neutral: ["Let the list go unremarked", "Shrug, say nothing"],
        },
      },
      {
        line: '"Shion\'s not answering his phone. Come with me to check on him?"',
        approach: "Go with him to check",
        greeting:
          '"He does this. Turns the phone off, then acts surprised anyone came looking."',
        responses: {
          kind: ["Go with him gladly", "Say you're glad to help check"],
          playful: ["Guess what Shion broke", "Bet he's just asleep"],
          bold: ["Say you'll handle Shion", "March over there immediately"],
          neutral: ["Go along quietly", "Follow without comment"],
        },
      },
      {
        line: "He's fixed something of yours without mentioning it, and you only notice because it finally works right.",
        approach: "Ask when he fixed it",
        greeting:
          "\"Fixed the thing you didn't ask me to fix. Don't mention it.\"",
        responses: {
          kind: ["Say you'll return the favor", "Say that means a lot"],
          playful: ["Demand he admit he did it", "Tease him for the secrecy"],
          bold: ["Call him out for hiding it", "Say you noticed right away"],
          neutral: ["Say nothing about the fix", "Let it go unremarked"],
        },
      },
      {
        line: "A half-finished stage prop for the next Dionysia show takes up half the bench. He needs an extra pair of hands.",
        approach: "Lend him a hand",
        greeting:
          '"I\'ve got two hands and about six jobs today. Pick a number."',
        responses: {
          kind: ["Lend a hand gladly", "Offer to help however's useful"],
          playful: ["Ask what happens if it breaks", "Demand the easiest job"],
          bold: ["Take the hardest part yourself", "Just start without asking"],
          neutral: ["Help without much comment", "Do the task quietly"],
        },
      },
      {
        line: '"Oh, somebody\'s in a good mood," Elias says softly, passing through. He just shrugs and keeps working.',
        approach: "Smile at the thought",
        greeting:
          "\"Don't you start too. Something finally worked on the first try, that's all.\"",
        responses: {
          kind: ["Say the good mood suits him", "Ask what finally worked"],
          playful: ["Side with Elias", "Tease him for smiling"],
          bold: ["Tell him to own the good mood", "Say he's earned a win"],
          neutral: ["Let the moment pass", "Shrug, keep walking"],
        },
      },
      {
        line: "He's heading out with his toolbox and offers to walk you partway to class.",
        approach: "Walk with him",
        greeting:
          "\"You're heading to class, right? I've got a job that way. Let's go together.\"",
        responses: {
          kind: ["Say you'd like that", "Offer to carry something"],
          playful: ["Ask what's broken this time", "Guess who broke it"],
          bold: ["Ask to tag along to the job", "Say you'll walk him there too"],
          neutral: ["Fall into step beside him", "Nod and head off together"],
        },
      },
      {
        line: "He looks you over like you're the one who needs looking after.",
        approach: "Turn it back on him",
        greeting:
          '"You\'re busy again today? Yeah, same for me. You should take a break sometimes too."',
        responses: {
          kind: ["Promise to actually rest", "Say the same goes for him"],
          playful: ["Ask when he last took one", "Point out the double standard"],
          bold: ["Say he never rests either", "Demand he rest too"],
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
  // No temperamentDialogue pool: every leftover line was placed onto a
  // dialogue beat's `greeting`.
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
      '"Hm? Oh, {user}. Good work today." **{name}** shifts the box of parts to his other arm so he can wave.',
      '{user} says the name, and **{name}** stops mid-yawn. "Sorry. Short sleeper. Hi."',
      '"...Okay, three more jobs and I\'ll barely make it." **{name}** looks up from his list and decides {user} goes first.',
    ],
    warm: [
      "**{name}** sets his toolbox down for {user}, which he doesn't do for most people.",
      '"Shion can wait five minutes." **{name}** pockets his phone and turns to {user}.',
      '"You look tired. ...Yeah, I know. I\'m one to talk." **{name}** stays with {user} anyway.',
    ],
    spark: [
      '"Hm? Looks like there\'s a bug on your head… Nope, my mistake." **{name}** just wanted a closer look at {user}.',
      "**{name}** answers {user} and forgets which pocket the screwdriver's in. Twice.",
      '"...Huh. It\'s you." **{name}** stops pretending to check his tool case and just looks at {user}.',
    ],
    close: [
      '"Why do I always get sleepy around you?" **{name}** asks {user}, and doesn\'t wait for an answer.',
      "**{name}** lets his phone ring out for {user}. Whoever's broken something can wait.",
      '"Stay a sec. You\'re the only one who doesn\'t need something fixed." **{name}** says it to {user} like a complaint.',
    ],
    bound: [
      '"I love you. ...Okay, that\'s the sentence. Now tell me about your day." **{name}** doesn\'t let go of {user}\'s hand.',
      "**{name}** rests his forehead on {user}'s shoulder, yawns, and stays right there.",
      '"I\'ll walk you back. I wanted to do an inspection anyway." **{name}** falls into step beside {user}.',
    ],
  },
};
