export default {
  // The level-up DMs (docs/bond-scene-dms.md). Edward is a long-lived vampire
  // who performs fragility as a hobby; the courtly register never drops, it
  // just stops being armor. He asks before he bites and he asks before
  // everything else too, which is the shape of the intimacy here.
  //
  // Canon (reference.md) is deliberately thin on his past, so these scenes stay
  // inside it. NO age in years anywhere: reference.md never gives one, only
  // "long-lived vampire" and "old, old memories", so his age stays vague ("a
  // very long life", "old beyond telling"). The lost "her" is only ever what
  // Max Affinity supplies, "you remind me a little of her" plus "old, old
  // memories": no name, no dates, no place, no death, no biography. He is
  // written as refusing the details, which is itself in character. Grounded
  // canon he leans on: the cough act and "ask Rui", the parasol and sunlight,
  // vitality returning at night, the shady-cabal YouTube channel, "I eked out a
  // humble existence in Eastern Europe", "the most powerful vampire? ...just
  // rumors", love-advisor "Rui, or Lyca". He says "I'll", never "I shall"
  // (reference.md). No pet name for MC in these scenes: reference.md gives him
  // "wicked girl" only twice, both barbed, so it appears only in the one
  // known-tier dialogue beat built around the name itself. It stays out of
  // winnerLines too, since a /call winner can be any user and the name is
  // gendered. "lovely creature" was never canon and has been cut.
  //
  // Texting is the one modern custom Rui never fully broke him of. Per
  // reference.md's "## Bond Scenes" notes he types boomer-style: ornate
  // sentences close on two or more painfully literal emojis in a row, and
  // grand declarations come out in Title Case ("I Do Not Count Things"). The
  // same notes say his DMs are terser and more direct than he is aloud, so the
  // typed beats stay short even where the `> ` lines he speaks run long. Emojis
  // and Title Case never appear in button labels or the keepsake line.
  bondScenes: {
    acquaintance: {
      beats: [
        "**{firstName}**: Rui Is At The Tavern. I Have A Favor To Ask. 🙏🖤",
        "A Letter Has Come For Me. 💌📜\n\nYou Have Passed My Door {timesMet} Times, So You Know The Way. Would You Come Read It To Me? 🙏🥺",
        "Alas, My Eyesight Is Not What It Used To Be. 👓😔\n\nNo. You Would See Through That. You Always Do.",
        "I Once Performed A Cough For You In The Hall. Tragic, Consumptive, The Full Performance. You Told Me To Find Rui. 😷🎭\n\nYou Look Me In The Eye. 👀✨ I Have Begun Arranging My Evenings Around It. 🌇🖤",
      ],
      choice: {
        prompt: "Your Turn. I Am In No Hurry, But I Am Curious. 😏🖤",
        options: [
          {
            key: "kind",
            label: "Ask why it matters to him",
            style: 3,
            close:
              "Most People Look Somewhere Else. My Fangs, My Neck. 👀\n\nYou Never Do. That Is All, And It Is Plenty. 🖤🌙",
          },
          {
            key: "playful",
            label: "Offer to look away next time",
            style: 1,
            close:
              "Do Not You Dare. 😤😤\n\nOr Do. I Am Very Good At Appearing Wherever You Happen To Be Looking. 😏🦇",
          },
          {
            key: "bold",
            label: "Say you like looking at him",
            style: 4,
            close:
              "Oh. 😳😳\n\nThat Was Very Direct Of You. 🙈🖤\n\nMind The Hour. My Vitality Returns At Night, And You Really Should Be More Careful. 😏🦇",
          },
        ],
      },
      keepsake: {
        emoji: "👀",
        line: "Looking him in the eye, which he has started planning his evenings around.",
      },
    },

    friend: {
      beats: [
        "**{firstName}**: A confession, offered at an hour when confessions are cheapest. 💌🕯️",
        "First, one piece of business. As your self-appointed advisor in matters of the heart, I must ask: Rui, or Lyca. I am dying to be proven right, figuratively; I no longer do the other kind.\n\nRui is somewhere in the house right now, developing a headache over the mere fact that I have asked. 🤕😌 That is the appeal of asking.\n\nOr you could say me, and spare the boy his headache. Purely as a mercy. 😇🤝",
        "That was not the confession. This is.\n\nYou answer me with {favResponse}, every time, without the small recalculation I get from everyone who learns what I am. The living flinch. A quarter-second half-step back, weight onto the back foot. I have never once been wrong about it.\n\nYou Have Not Done It. Not once in {timesMet}. I find the absence more interesting than anything else in this building. 🤔🔍",
      ],
      choice: {
        prompt:
          "Well? Am I to be flattered or frightened? I have a fondness for both. 😏🖤",
        options: [
          {
            key: "kind",
            label: "Say he's not frightening",
            style: 3,
            close:
              "How very disappointing.\n\n*A long pause.*\n\n...And how very restful. I had forgotten there was such a thing as being restful at somebody. Do carry on. 😌☺️",
          },
          {
            key: "playful",
            label: "Do the step back on purpose",
            style: 1,
            close:
              "You did not.\n\nYou did. You did it deliberately and badly and I have not laughed like that in a while, 😂😂 so I will have to allow it.",
          },
          {
            key: "bold",
            label: "Ask what he'd do if you had",
            style: 4,
            close:
              "Nothing whatsoever. That is the tragedy of it.\n\nI would have been charming, shown you out, and thought about it for a very long time. That is the entire repertoire. A long life and no second move. 😔🎭",
          },
        ],
      },
      keepsake: {
        emoji: "🪞",
        line: "The quarter-second step back that you never once took.",
      },
    },

    closeFriend: {
      beats: [
        "**{firstName}**: Come up to my room. I have something to show you and I have decided to be embarrassed about it in advance, so that the moment itself may pass off smoothly. 😳🙈",
        "*The room is exactly as ancient and theatrical as advertised, and in the middle of it is a laptop on a velvet cushion, playing a video about the shady cabal of elites secretly governing human society. 🕵️*\n\n> I am aware.\n\n> I have watched a great deal of this particular channel. He is *magnificently* wrong, and he is wrong at three in the morning, which is when I want company and have none. 😔",
        "> A very long life. Do you know what a life this long is, one night after another? It is not romantic. It is a very great deal of sitting.\n\n> This is what I do with the nights. Not blood, not brooding, not whatever anybody imagines. Somebody in a video, magnificently wrong about the cabal, at length.\n\n> You are the first person I have ever admitted that to, and I would take it as a kindness if you sat down. 🙏",
      ],
      choice: {
        prompt: "Well? Sit, or flee. 🏃🚪 Both are perfectly reasonable.",
        options: [
          {
            key: "kind",
            label: "Sit down and watch it",
            style: 3,
            close:
              "*You get through two of them. He talks over the whole of the second, which is clearly the point of the exercise.*\n\n*At some stage you fall asleep against his shoulder, 😴 and he does not move for the rest of it, and in the morning he affects not to have noticed, badly.*",
          },
          {
            key: "playful",
            label: "Ask who's in the cabal",
            style: 1,
            close:
              "> Oh, do not *encourage* it.\n\n*He explains the entire conspiracy at length without drawing breath, footnotes and all, entirely delighted, then stops and looks appalled at himself.*\n\n> ...You did that on purpose. 😅",
          },
          {
            key: "bold",
            label: "Ask why you're the first",
            style: 4,
            close:
              "> Because it is undignified, and dignity is very nearly all I have left.\n\n> And because you would not use it. I have known perhaps a handful of people in a long life of whom that was true, and most of them are a long time dead now. 💀",
          },
        ],
      },
      keepsake: {
        emoji: "🛋️",
        line: "The nonsense he watches at three in the morning, admitted to out loud.",
      },
    },

    confidant: {
      beats: [
        "**{firstName}**: I am going to try to tell you about her. I will not manage much, and then I will not mention her again, and you will please not ask me to. 🥀🕯️",
        "Her name is not the point and I am not going to give it to you. I am not going to give you any of it, in truth. The place, the dates, how it ended. I have found that grief kept vague is grief kept portable. 🥀\n\nYou remind me a little of her. That is the whole of what I can say plainly, and it has taken me until now to say that much.",
        "I have said for a very long time that the living die so quickly. I say it languidly, at parties; people find it chilling and I let them. It is the only sentence I have built that holds the whole fact without making me feel it.\n\nThey also call me the most powerful vampire who ever lived. 🧛🦇 Rumors, I tell the first-years, and I leave it there. The ambiguity does more work than a straight answer would.\n\nWhat I will tell you is the dull part. A humble, forgettable existence in Eastern Europe, quiet as a shut drawer, that nobody repeats because it makes a poor story. You strike me as someone worth being dull with. 🫖📖",
      ],
      choice: {
        prompt:
          "There. You may say something now, and I would very much rather it were not sympathy. 🙏🥀",
        options: [
          {
            key: "kind",
            label: "Ask what she was like",
            style: 3,
            close:
              "*The reply takes a very long time to come.*\n\nNo. I told you I would not, and I find I meant it more than I expected to.\n\n*And then:* But nobody asks what she was *like*. They ask how it ended, or they say they are sorry. You asked the right question, and I still cannot answer it. Thank you for it anyway. 🥺💭",
          },
          {
            key: "playful",
            label: "Change the subject for him",
            style: 1,
            close:
              "*A pause, then something that might be relief.*\n\nYou noticed I had run out of road and you simply moved us along. Nobody does that. They dig, gently, believing it a kindness.\n\nAsk me about the dreadful videos instead. I can talk about those until it gets light. 😌📺",
          },
          {
            key: "bold",
            label: "Say you'll die quickly too",
            style: 4,
            close:
              "*There is nothing at all for several minutes.*\n\nI am aware, *he writes.* Since the first evening. I have gone on arranging my evenings regardless, which is either courage or plain foolishness, and I have stopped being able to tell which.\n\nDo not say it again. Not because it is untrue, but because I have decided to be foolish and should like to manage it uninterrupted. 🙈⏳",
          },
        ],
      },
      keepsake: {
        emoji: "🥀",
        line: "The old grief he keeps portable, set down for one evening.",
      },
    },

    devoted: {
      beats: [
        "**{firstName}**: You are unharmed. I have established that before writing, because I did not trust myself to establish it after. 😮‍💨🖤",
        "I have spent a very long time being languid at people. It is not an affectation; it is a discipline. What I am, unmanaged, is not something anybody in this academy has ever seen, and I have taken a very great deal of care that they should not.\n\nRui saw it tonight. He will not say anything. He went rather white 😨😰 and he will not say anything.",
        "I will not describe what happened. Only what came after: I stood there some minutes, certain of one thing.\n\nWhatever the sun takes from me by day, the dark gives back with interest, and tonight I was more myself than usual by a wide margin.\n\nI Would Do It Again. Without the discipline, in front of anybody. That is not romantic. It is a warning, from someone fond of you, about someone you should be careful of. ⚠️🩸",
      ],
      choice: {
        prompt:
          "Now you may be frightened. It is quite the correct response and I will not think less of you. 😰💔",
        options: [
          {
            key: "kind",
            label: "Say you're not frightened",
            style: 3,
            close:
              "You ought to be.\n\n*A long pause.*\n\n...Come up. Not to discuss it. I have been sitting in this chair for two hours being extremely composed and I find I would rather be in a room with you and stop.\n\n*He does stop. He puts his head down on your shoulder, old beyond telling and entirely undone, and does not move for a long while. 🥹🖤*",
          },
          {
            key: "playful",
            label: "Ask if the discipline's ruined",
            style: 1,
            close:
              "Utterly. A whole discipline, and I am back to first principles because of one bad night.\n\nRui has offered me a drink and a conversation about my feelings. I would rather be staked. 😵⚰️ Come up instead and let me be ridiculous at somebody who will not be gentle about it.",
          },
          {
            key: "bold",
            label: "Tell him to bite you",
            style: 4,
            close:
              "*The reply is immediate and quite unlike anything he has sent before.*\n\nNo.\n\n*Then, more slowly:* I ask. Always, of everyone, and I have never once wanted an answer as much as I do not want that one from you.\n\nAsk me again some evening when I have not just had a night like this one. I will almost certainly say something disgraceful, and I should like to be in my right mind when I do. 🩸🖤",
          },
        ],
      },
      keepsake: {
        emoji: "⛓️",
        line: "A discipline of a lifetime, given up in a single night.",
      },
    },

    soulbound: {
      beats: [
        "**{firstName}**: I have written this six times. Each attempt was more elegant than the last, and I have discarded all of them for that reason. 📝🗑️",
        "{timesMet} occasions. I Do Not Count Things. Counting is for creatures with a reason to hurry, and I have been very careful never to have one.\n\nI have counted every single one of yours. 🔢🖤",
        "I told you I would try to tell you about her, and then not again. One more thing, and then the subject is closed for good.\n\nThe worst of that grief is not the missing. It is knowing I had every elegant reason ready, and used them, and never once simply said the plain thing while it could still be heard.\n\nI have had a long time to call that restraint. It was not. It was cowardice with excellent manners. 🎭🥀",
        "So.\n\nI love you. ❤️❤️ Said plainly, no elegant construction anywhere near it, which for me is like standing in a doorway with no clothes on.\n\nYou will die quickly. I know it, you know it, I am saying it anyway. I stayed quiet once and called it kindness. A creature who does that twice deserves every long year he gets. 🖤⏳",
      ],
      choice: {
        prompt:
          "Take whatever time you like. I have a certain amount of it. ⏳🖤",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close:
              "Come up.\n\n*He is standing when you arrive, not languid, not draped over anything, simply standing in the middle of the room like a man who has been waiting.*\n\n*He takes your jaw in both cold hands and looks at you for an unreasonably long time.*\n\n> Say it once more.\n\n*he says.*\n\n> I have wanted this said to me for longer than you would credit, and the once it would have mattered, I let the moment pass in silence. I intend to be quite greedy about hearing it now. 🥰",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close:
              "But of course. I have made a specialization of waiting, though not, historically, a successful one.\n\nUnderstand this: my room is open, the dreadful videos continue at three. None of it was a maneuver. It was the best part of a long life and I would not give it up for a refusal.\n\nTake your time. I will be here, ridiculous about the cabal. 🕵️📺",
          },
        ],
      },
      keepsake: {
        emoji: "🍷",
        line: "The mistake he refused to make a second time.",
      },
    },
  },
  dialogue: {
    new: [
      {
        line: "He greets you with a charming smile, but there's something dangerous beneath the gentleman's facade.",
        approach: "Accept the invitation",
        greeting: '"Oh my. A new face. How delightful."',
        responses: {
          kind: ["Thank him for the welcome", "Say it's nice to meet him"],
          playful: ["Out-charm the gentleman", "Curtsy back at him"],
          bold: ["Ask what's behind the smile", "Say you see through the act"],
          neutral: ["Let him do the talking", "Nod and step inside"],
        },
      },
      {
        line: "He takes your hand and asks, quite properly, whether he may keep hold of it. Then he waits.",
        approach: "Let him take your hand",
        greeting:
          '"Do come in. I won\'t bite. Not without asking first, at any rate."',
        responses: {
          kind: ["Accept the courtesy", "Thank him for asking first"],
          playful: ["Ask what counts as asking", "Ask if anyone ever says yes"],
          bold: ["Give him permission", "Take your hand back"],
          neutral: ["Let him hold it, say nothing", "Wait for him to let go"],
        },
      },
      {
        line: '"How delicate you look," he murmurs, in a room where he is by far the more dangerous thing.',
        approach: "Step into the candlelight",
        greeting: '"Careful. You ought to know better than to play with fire."',
        responses: {
          kind: ["Say you're not scared", "Tell him you'll be careful"],
          playful: ["Pretend to swoon", "Ask if he's the fire"],
          bold: ["Say you're not delicate at all", "Step closer to the flame"],
          neutral: ["Keep a careful distance", "Stay where the light is"],
        },
      },
      {
        line: "He is standing much too close for a first meeting, and entirely unbothered by that.",
        approach: "Say you were exploring",
        greeting:
          '"You mustn\'t wander Obscuary alone. It would be troublesome for me if you were to disappear."',
        responses: {
          kind: ["Ask him to show you around", "Promise to be careful"],
          playful: [
            "Ask if personal space exists",
            "Ask if he'd notice you gone",
          ],
          bold: ["Step closer instead of back", "Say you'll wander anyway"],
          neutral: [
            "Hold your ground, say nothing",
            "Step back a pace",
          ],
        },
      },
      {
        line: '"The most powerful vampire? No, those are just rumors." He smiles as if it amuses him.',
        approach: "Ask if the rumors are true",
        greeting:
          '"I have no interest in harming humans. After all, they die so quickly. They should enjoy their short lives while they can."',
        responses: {
          kind: ["Say you believe him", "Say you'll enjoy yours, then"],
          playful: ["Ask for a demonstration", "Ask how old he really is"],
          bold: ["Call his bluff", "Say rumors start somewhere"],
          neutral: ["Stay watchful", "Keep your thoughts to yourself"],
        },
      },
    ],
    known: [
      {
        line: "The gentleman act is unchanged. The interest behind it is no longer performed.",
        approach: "See past the act",
        greeting:
          '"You visit more than duty requires. I\'ve noticed. I notice everything, given time."',
        responses: {
          kind: ["Let the interest show", "Say you noticed too"],
          playful: ["Call out the dropped act", "Ask how long he's watched"],
          bold: ["Name the interest outright", "Ask why he keeps performing"],
          neutral: ["Let the act be, say nothing", "Notice, say nothing"],
        },
      },
      {
        line: '"You\'ve returned," he says, as though it were remarkable. To him it is.',
        approach: "Say you'll keep returning",
        greeting: '"Back so soon? How wonderfully poor of your judgment."',
        responses: {
          kind: ["Say you meant to", "Say he's worth the trip"],
          playful: ["Call your judgment fine", "Tease him for being surprised"],
          bold: ["Say of course you returned", "Ask why that's remarkable"],
          neutral: ["Shrug, say nothing", "Let the remark pass"],
        },
      },
      {
        line: "\"Ah, there you are. I've a favor to ask of you: come to my room and I'll explain.\"",
        approach: "Ask what he needs",
        greeting:
          '"Do sit. I had Rui move the chair nearer. I find I dislike raising my voice."',
        responses: {
          kind: ["Take the chair he moved", "Ask if he's feeling unwell"],
          playful: ["Ask if Rui minded moving it", "Scoot the chair even closer"],
          bold: ["Say the favor was the chair", "Move the chair back a bit"],
          neutral: ["Sit and wait for the favor", "Leave the chair where it is"],
        },
      },
      {
        line: "The fragility slips for a moment. He lets it, and watches what you do.",
        approach: "Take a chance",
        greeting:
          '"Ah. You saw that. How careless of me... Well, what will you do about it?"',
        responses: {
          kind: ["Don't look away", "Say you won't tell Rui"],
          playful: ["Tease the slip", "Egg him on a little"],
          bold: ["Meet it head-on", "Say you saw it too"],
          neutral: ["Watch, say nothing", "Let it pass unremarked"],
        },
      },
      {
        line: "He's noticed you no longer check where the door is, and looks, for once, genuinely pleased rather than amused.",
        approach: "Stop looking for the exit",
        greeting:
          '"You\'ve stopped looking for the exit. I confess I find that rather flattering."',
        responses: {
          kind: ["Say you weren't leaving", "Say you like it here"],
          playful: ["Admit you eyed the door", "Tease him for noticing"],
          bold: ["Put your feet up", "Own the glance at the door"],
          neutral: ["Shrug, say nothing", "Let it go unremarked"],
        },
      },
      {
        line: "He has no interest in the missions or the gossip. What he wants, apparently, is the boring parts.",
        approach: "Tell him about your week",
        greeting:
          '"Tell me about your week. The dull parts, mind. I\'ve had quite enough of the interesting ones."',
        responses: {
          kind: ["Tell him something dull", "Share something small, human"],
          playful: [
            "Make up something absurd",
            "Ask what counts as dull enough",
          ],
          bold: ["Tell him something surprising", "Demand he share one too"],
          neutral: ["Say it was a quiet week", "Mention the weather"],
        },
      },
      {
        line: '"I\'m feeling worse than usual today," he says, in the exact tone of a man angling for sympathy.',
        approach: "Give him the sympathy",
        greeting:
          '"Ah, sympathy. How restorative. I feel better already... No, wait. Worse. Stay."',
        responses: {
          kind: ["Offer to fetch him tea", "Fuss over him a little"],
          playful: ["Call out the fishing", "Demand he admit he's fine"],
          bold: ["Ask what's actually wrong", "Say he's clearly fine"],
          neutral: ["Nod along, say nothing", "Let him have the performance"],
        },
      },
      {
        line: '"Rui worries too much," he says, of the exact thing Rui is right to worry about.',
        approach: "Ask what Rui's worried about",
        greeting:
          '"Rui thinks I watch too many videos about the shady cabal of elites. He simply hasn\'t seen enough of them."',
        responses: {
          kind: ["Say Rui might have a point", "Say Rui just cares a lot"],
          playful: ["Ask what he did this time", "Tease him about the worry"],
          bold: ["Say the cabal isn't real", "Push him to explain himself"],
          neutral: ["Stay out of it", "Let it go unremarked"],
        },
      },
      {
        line: "He's stopped pretending he wasn't waiting for you to visit.",
        approach: "Say you came to see him",
        greeting:
          "\"I've saved you a seat. I didn't plan to. It simply... happened.\"",
        responses: {
          kind: ["Say you're glad to see him", "Take the seat he saved"],
          playful: ["Tease him for waiting", "Ask how long he waited"],
          bold: ["Say you knew he was waiting", "Call out the pretending"],
          neutral: ["Let the comment pass", "Say nothing about it"],
        },
      },
      {
        line: 'He calls you "wicked girl" in a tone that makes it sound like the nicest thing he\'s said all week.',
        approach: "Ask why he calls you that",
        greeting:
          '"You keep walking into a vampire\'s room of your own accord. What else would I call you?"',
        responses: {
          kind: ["Let him explain it", "Say you like the name"],
          playful: ["Demand a better nickname", "Ask what earned it"],
          bold: ["Claim the name outright", "Say it suits you fine"],
          neutral: ["Let the name stand", "Shrug at the nickname"],
        },
      },
      {
        line: "Rui's left him another list of chores. Edward has read exactly none of it.",
        approach: "Pick up the list",
        greeting:
          '"Ah, the list. Read it to me, would you? My eyesight is not what it used to be."',
        responses: {
          kind: ["Read a little of the list", "Offer to help with it"],
          playful: ["Read it back in his voice", "Threaten to tell Rui"],
          bold: ["Toss the list aside with him", "Say the chores can wait"],
          neutral: ["Set the list down, say nothing", "Leave the list alone"],
        },
      },
      {
        line: "He asks, again, whether you like Rui or Lyca better, far too invested in an answer that isn't his to have.",
        approach: "Refuse to answer",
        greeting:
          '"Oh? Not even a hint? How cruel. I\'ll have to draw my own conclusions, then."',
        responses: {
          kind: ["Say you like them both", "Laugh off his conclusions"],
          playful: ["Name someone else entirely", "Make him guess"],
          bold: ["Say it's none of his business", "Say it's not his to know"],
          neutral: ["Shrug, say nothing", "Change the subject"],
        },
      },
      {
        line: '"Carry me to bed," he says, not really joking, and not really asking either.',
        approach: "Go get Rui",
        greeting: '"Rui? Oh, how unkind. I did ask you so nicely."',
        responses: {
          kind: ["Say Rui's on his way", "Fetch a blanket instead"],
          playful: ["Pretend not to hear him", "Tease him for the demand"],
          bold: ["Refuse and tell him to walk", "Say he's perfectly capable"],
          neutral: ["Wait for Rui to arrive", "Hand him a pillow"],
        },
      },
    ],
    warm: [
      {
        line: "The fragile act drops for a moment when you're near: you see the predator underneath, and he lets you.",
        approach: "Close the distance yourself",
        greeting: '"I was hoping you\'d visit. Come closer."',
        responses: {
          kind: ["Let him see the real thing", "Stay exactly where you are"],
          playful: ["Ask what the predator's like", "Ask for the act back"],
          bold: ["Close the distance boldly", "Meet the look head on"],
          neutral: ["Stay, say nothing", "Come closer, no comment"],
        },
      },
      {
        line: '"You never did flinch," he observes, sounding thrilled and slightly put out.',
        approach: "Refuse to flinch",
        greeting:
          '"Not afraid of me in the least. How disappointing. How wonderful."',
        responses: {
          kind: ["Say it's not disappointing", "Say you trust him now"],
          playful: ["Ask which he'd prefer", "Flinch on purpose, badly"],
          bold: ["Say fear was never real", "Ask what he'd do about it"],
          neutral: ["Let him decide, say nothing", "Let the observation stand"],
        },
      },
      {
        line: 'He winces, a hand at his ribs. "Oh, it hurts... I cannot seem to shake this ache in the place Rui touched me earlier. I think I\'ll rest a while."',
        approach: "Sit beside him",
        greeting:
          '"Sit. No, here, beside me. Personal space is a modern invention."',
        responses: {
          kind: ["Sit and fuss over him", "Ask if it really hurts"],
          playful: ["Tease the dramatics", "Offer a dramatic remedy"],
          bold: ["Say Rui didn't do that much", "Sit closer than he asked"],
          neutral: ["Sit quietly beside him", "Let him rest a while"],
        },
      },
      {
        line: "He offers his arm, then his coat, then a chair, in rapid succession. It's a lot.",
        approach: "Take his arm",
        greeting:
          '"What did I do before Darkwick? I eked out a humble existence in Eastern Europe. Nothing worth the telling."',
        responses: {
          kind: ["Take what he offers gladly", "Say the coat is enough"],
          playful: ["Take all three at once", "Ask what else is on offer"],
          bold: ["Take the arm, skip the rest", "Refuse all three, stay close"],
          neutral: ["Take the arm, say nothing", "Take the chair only"],
        },
      },
      {
        line: "There's a glass poured for you already. It's your preference. He remembered.",
        approach: "Accept the poured glass",
        greeting: '"I poured this before you arrived. Call it optimism."',
        responses: {
          kind: ["Raise the glass to him", "Say the optimism paid off"],
          playful: ["Ask how he knew", "Toast his optimism"],
          bold: ["Say of course he remembered", "Ask what else he predicted"],
          neutral: ["Take the glass, say nothing", "Drink without comment"],
        },
      },
    ],
    spark: [
      {
        line: "His gaze settles on your throat, and he takes rather too long to look away.",
        approach: "Stand there anyway",
        greeting:
          '"You know what I am. You keep standing there anyway. How flattering."',
        responses: {
          kind: "Take him at his word",
          playful: "Ask what's taking so long",
          bold: "Tilt your head back",
          neutral: "Let the moment cool",
        },
      },
      {
        line: '"You do test a man\'s restraint," he murmurs, testing nothing at all.',
        approach: "Say he can let loose",
        greeting:
          '"I have restrained myself for a very long time. Do say if I needn\'t."',
        responses: {
          kind: "Say he needn't restrain it",
          playful: "Test the restraint",
          bold: "Tell him to let loose",
          neutral: "Say nothing",
        },
      },
      {
        line: "He kisses the back of your hand and lingers well past the century's etiquette.",
        approach: "Offer your hand",
        greeting: '"May I? Only your hand. ...For now."',
        responses: {
          kind: "Offer your hand",
          playful: "Make a poor promise back",
          bold: "Ask for more than your hand",
          neutral: "Withdraw your hand",
        },
      },
      {
        line: "The fragile act is gone. What's left is old, hungry, and extremely well-mannered about it.",
        approach: "Come closer",
        greeting: '"Come closer. I promise to behave. I make poor promises."',
        responses: {
          kind: "Take him at his word",
          playful: "Withdraw the hand slowly",
          bold: "Say you know what he is",
          neutral: "Hold still, say nothing",
        },
      },
      {
        line: "He tilts his head, considering you, the way one considers something one intends to have.",
        approach: "Let him consider you",
        greeting:
          '"That pulse of yours is being terribly loud about all this."',
        responses: {
          kind: "Tell him you're not frightened",
          playful: "Ask what he intends",
          bold: "Say you're already his",
          neutral: "Let him look, say nothing",
        },
      },
    ],
    close: [
      {
        line: '"I\'ve been waiting lifetimes for someone who could see me like this," he says, pulling you close. "Don\'t leave me again."',
        approach: "Go to him",
        greeting: '"You belong right here, next to me. Don\'t ever leave."',
        responses: {
          kind: "Let him get closer",
          playful: "Call him lovely first",
          bold: "Tell him you're not leaving",
          neutral: "Stay through the quiet hour",
        },
      },
      {
        line: "The theatrics finally exhaust themselves, and what's left is old, and lonely, and yours.",
        approach: "Stay past dawn",
        greeting: '"Stay until dawn. Stay past it. I\'ll manage the curtains."',
        responses: {
          kind: "Tell him he's not alone",
          playful: "Tease him about the theatrics",
          bold: "Say you'd stay lifetimes",
          neutral: "Stay, say nothing",
        },
      },
      {
        line: "He rests his forehead against yours and stops talking, which is unprecedented.",
        approach: "Let the silence hold",
        greeting: '"No performance tonight. Only me. Is that enough?"',
        responses: {
          kind: "Let the silence be enough",
          playful: "Flirt back with him",
          bold: "Pull him closer yourself",
          neutral: "Let him watch in silence",
        },
      },
      {
        line: '"Everything I\'ve pretended to be," he says, "you saw past on the first night."',
        approach: "Tell him you see him",
        greeting:
          '"I have outlived a great deal. I would rather not outlive this."',
        responses: {
          kind: "Say the act was never needed",
          playful: "Tease him for taking so long",
          bold: "Say you'd have said it sooner",
          neutral: "Let the moment settle quietly",
        },
      },
      {
        line: "He holds on a little too tightly. Neither of you comments on it.",
        approach: "Let him hold on",
        greeting: '"Come here. Closer. There, now the room is bearable."',
        responses: {
          kind: "Hold on just as tight",
          playful: "Point out he's holding tight",
          bold: "Hold on just as tightly",
          neutral: "Let him hold on wordlessly",
        },
      },
    ],
    bound: [
      {
        line: "He asks before he bites, every time, and the asking is somehow worse.",
        approach: "Say yes",
        greeting: '"May I? ...You always say yes. It undoes me every time."',
        responses: {
          kind: "Let him ask",
          playful: "Say no, then yes",
          bold: "Tell him not to ask",
          neutral: "Let him wait",
        },
      },
      {
        line: '"Centuries," he murmurs against your throat, "and not one of them was this."',
        approach: "Bare your throat",
        greeting:
          '"I love you. I\'ve had a very long time to be certain of something."',
        responses: {
          kind: "Say yes again",
          playful: "Make him ask twice",
          bold: "Bare your throat",
          neutral: "Say nothing",
        },
      },
      {
        line: "He undresses you the way he does everything: slowly, and with immaculate manners.",
        approach: "Let him be improper",
        greeting:
          '"Come here. Let me be terribly, terribly improper about you."',
        responses: {
          kind: "Let him take his time",
          playful: "Rush him along, teasingly",
          bold: "Pull him past the manners",
          neutral: "Let it happen slowly",
        },
      },
      {
        line: "He keeps the curtains drawn well past dawn and blames the sun entirely.",
        approach: "Stay past dawn",
        greeting:
          '"Good. Sleep as long as you like. The sun can complain to me."',
        responses: {
          kind: "Say the sun can wait",
          playful: "Open the curtains",
          bold: "Say he's not fooling anyone",
          neutral: "Draw the curtains",
        },
      },
      {
        line: "The gentleman is intact. What's under it has stopped pretending to be tame.",
        approach: "Let him drop the act",
        greeting:
          '"You\'re mine and I am, rather more surprisingly, entirely yours."',
        responses: {
          kind: "Tell him he's yours too",
          playful: "Tease the gentleman act",
          bold: "Say you like what's underneath",
          neutral: "Let him be, say nothing",
        },
      },
    ],
  },
  // temperamentDialogue removed: every line was moved onto a dialogue beat's
  // `greeting` — every tier's pool matched onto a beat exactly, nothing left
  // over.
  // When the old per-tier `responses` pool was folded onto the beats above,
  // one kind label had no genuine beat match ("Let him be gracious") and was
  // dropped rather than force-placed.
  // The /call reveal lines for this character, keyed by the register in
  // WINNER_LINE_BUCKETS (constants/publicEncounters.js). Picked from at random
  // like the dialogue; {user} is the winner's mention and {name} their full
  // name, and the embed's winner line is the only place the reveal names
  // either of them. A register left out here falls back to the generic
  // WINNER_LINES pool.
  winnerLines: {
    new: [
      "**{name}** asks {user} whether he may take their hand, then waits for an answer.",
      '"Oh my. How charming." **{name}** appears at {user}\'s elbow, smiling.',
      "{user} says the name, and **{name}** smiles with rather too many implications in it.",
    ],
    warm: [
      '"You haven\'t flinched once," **{name}** observes to {user}, thrilled and slightly put out.',
      "{user} calls out, and **{name}**'s cough evaporates. He forgets to bring it back.",
      '"Do come here." **{name}** informs {user} that personal space is a modern invention.',
    ],
    spark: [
      '"You ought to know better than to play with fire," **{name}** tells {user}, sounding delighted about it.',
      "{user} says the name, and **{name}** stops performing frailty for the length of one look.",
      '"What were you hoping for? Go on, say it." **{name}** waits on {user}, unhurried.',
    ],
    close: [
      '"May I?" **{name}** asks {user}, in public, about something unspecified.',
      "**{name}** walks {user} the whole way across campus and never once asks to be carried.",
      "{user} calls, and the ancient thing under **{name}**'s manners answers immediately.",
    ],
    bound: [
      '"Centuries," **{name}** murmurs to {user}, "and not one of them was this."',
      "**{name}** crosses to {user} without the parasol, the cough, or any of the rest of it.",
      "{user} says the name, and **{name}** stops being alone.",
    ],
  },
};
