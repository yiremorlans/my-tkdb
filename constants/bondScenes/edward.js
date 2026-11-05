// Edward's bond scenes, read as DIALOGUE.edward.bondScenes
// (constants/dialogue/edward.js imports this file).
//
// The level-up DMs (docs/bond-scene-dms.md). Edward is a long-lived vampire
// who performs fragility as a hobby; the courtly register never drops, it
// just stops being armor. He asks before he bites and he asks before
// everything else too, which is the shape of the intimacy here.
//
// Canon (reference/edward.md) is deliberately thin on his past, so these scenes stay
// inside it. NO age in years anywhere: reference/edward.md never gives one, only
// "long-lived vampire" and "old, old memories", so his age stays vague ("a
// very long life", "old beyond telling"). The lost "her" is only ever what
// Max Affinity supplies, "you remind me a little of her" plus "old, old
// memories": no name, no dates, no place, no death, no biography. He is
// written as refusing the details, which is itself in character. Grounded
// canon he leans on: the cough act and "ask Rui", the parasol and sunlight,
// vitality returning at night, the shady-cabal YouTube channel, "I eked out a
// humble existence in Eastern Europe", "the most powerful vampire? ...just
// rumors", love-advisor "Rui, or Lyca". He says "I'll", never "I shall"
// (reference/edward.md). No pet name for MC in these scenes: reference/edward.md gives him
// "wicked girl" only twice, both barbed, so it appears only in the one
// known-tier dialogue beat built around the name itself. It stays out of
// winnerLines too, since a /call winner can be any user and the name is
// gendered. "lovely creature" was never canon and has been cut.
//
// Texting is the one modern custom Rui never fully broke him of. Per
// reference/edward.md's "Texting style" notes he types boomer-style: ornate
// sentences close on two or more painfully literal emojis in a row, and
// grand declarations come out in Title Case ("I Do Not Count Things"). The
// same notes say his DMs are terser and more direct than he is aloud, so the
// typed beats stay short even where the `> ` lines he speaks run long. Emojis
// and Title Case never appear in button labels or the keepsake line.
export default {
  acquaintance: {
    beats: [
      "**{firstName}**: Rui Is At The Tavern. I Have A Favor To Ask. 🙏🖤",
      "A Letter Has Come For Me. 💌📜\n\nYou Have Passed My Door {timesMet} Times, So You Know The Way. Would You Come Read It To Me? 🙏🥺",
      "Alas, My Eyesight Is Not What It Used To Be. 👓😔\n\nNo. You Would See Through That. You Always Do.",
      "I Once Performed A Cough For You In The Hall. Tragic, Consumptive, The Full Performance. You Told Me To Find Rui. 😷🎭\n\nYou Look Me In The Eye. 👀✨ I Have Begun Arranging My Evenings Around It. 🌇🖤",
    ],
    faces: { 0: "default", 1: "smile", 2: "sweat", 3: "smile_blush" },
    choice: {
      prompt: "Your Turn. I Am In No Hurry, But I Am Curious. 😏🖤",
      options: [
        {
          key: "kind",
          face: "close",
          label: "Ask why it matters to him",
          style: 3,
          close:
            "Most People Look Somewhere Else. My Fangs, My Neck. 👀\n\nYou Never Do. That Is All, And It Is Plenty. 🖤🌙",
        },
        {
          key: "playful",
          face: "smile",
          label: "Offer to look away next time",
          style: 1,
          close:
            "Do Not You Dare. 😤😤\n\nOr Do. I Am Very Good At Appearing Wherever You Happen To Be Looking. 😏🦇",
        },
        {
          key: "bold",
          face: "surprise_blush",
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
      "**{firstName}**: I Have Been Keeping Track Of Something. Do Not Be Alarmed, It Is One Of My Few Hobbies. 🔍😌",
      "With Me, You Lead With {favResponse} Every Time. 🖤🖤\n\nNever With Rui Or Lyca. I Have Watched Closely. 👀🕯️",
      "As Your Love Advisor, This Is Very Inconvenient. I Had Rui Down As The Favorite. 💌😩\n\nSo I Will Ask Properly, At Last. 🙏🕯️",
    ],
    faces: { 0: "smile", 1: "default", 2: "sweat" },
    choice: {
      prompt:
        "Rui, Or Lyca? Or Some Third Name I Have Not Thought Of. 🤔😌\n\nOne Name Will Do. 🖤🖤",
      options: [
        {
          key: "kind",
          face: "smile",
          label: "Say they're all special to you",
          style: 3,
          close:
            "All Of Us? How Diplomatic. 😌🖤\n\nRui Would Approve Of That Answer. I Am Not Rui. 😏😏\n\nI Will Ask Again Next Time, And I Dare You To Pick One. 🖤🦇",
        },
        {
          key: "playful",
          face: "surprise",
          label: "Say Rui, then take it back",
          style: 1,
          close:
            "You Had Me For One Terrible Second. 😱😱\n\nNow Say The Right Name, I Dare You. 🤫🖤\n\nThis Stays Between Us. I Would Hate For Rui Or Lyca To Feel Left Out. 🙏😇",
        },
        {
          key: "bold",
          face: "smile_blush",
          label: "Admit you like him best",
          style: 4,
          close:
            "My. 😌🖤\n\nI Had My Suspicions. It Is Still Nicer To Know. 🥰🦇\n\nCome Here And Prove It, Then. I Am Not Letting You Take That Back. 😏🖤",
        },
      ],
    },
    keepsake: {
      emoji: "💌",
      line: "The love advisor's one question, and what he made of your answer.",
    },
  },

  closeFriend: {
    beats: [
      "**{firstName}**: Come up to my room. I have something to show you and I have decided to be embarrassed about it in advance, so that the moment itself may pass off smoothly. 😳🙈",
      "*The room is exactly as ancient and theatrical as advertised, and in the middle of it is a laptop on a velvet cushion, playing a video about the shady cabal of elites secretly governing human society. 🕵️*\n\n> I am aware.\n\n> I have watched a great deal of this particular channel. He is *magnificently* wrong, and he is wrong at three in the morning, which is when I want company and have none. 😔",
      "> A very long life. Do you know what a life this long is, one night after another? It is not romantic. It is a very great deal of sitting.\n\n> This is what I do with the nights. Not blood, not brooding, not whatever anybody imagines. Somebody in a video, magnificently wrong about the cabal, at length.\n\n> You are the first person I have ever admitted that to, and I would take it as a kindness if you sat down. 🙏",
    ],
    faces: { 0: "blush", 1: "sweat", 2: "close" },
    choice: {
      prompt: "Well? Sit, or flee. 🏃🚪 Both are perfectly reasonable.",
      options: [
        {
          key: "kind",
          face: "smile_blush",
          label: "Sit down and watch it",
          style: 3,
          close:
            "*You get through two of them. He talks over the whole of the second, which is clearly the point of the exercise.*\n\n*At some stage you fall asleep against his shoulder, 😴 and he does not move for the rest of it, and in the morning he affects not to have noticed, badly.*",
        },
        {
          key: "playful",
          face: "sweat",
          label: "Ask who's in the cabal",
          style: 1,
          close:
            "> Oh, do not *encourage* it.\n\n*He explains the entire conspiracy at length without drawing breath, footnotes and all, entirely delighted, then stops and looks appalled at himself.*\n\n> ...You did that on purpose. 😅",
        },
        {
          key: "bold",
          face: "default",
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
    faces: { 0: "serious", 1: "close", 2: "smile" },
    choice: {
      prompt:
        "There. You may say something now, and I would very much rather it were not sympathy. 🙏🥀",
      options: [
        {
          key: "kind",
          face: "close",
          label: "Ask what she was like",
          style: 3,
          close:
            "*The reply takes a very long time to come.*\n\nNo. I told you I would not, and I find I meant it more than I expected to.\n\n*And then:* But nobody asks what she was *like*. They ask how it ended, or they say they are sorry. You asked the right question, and I still cannot answer it. Thank you for it anyway. 🥺💭",
        },
        {
          key: "playful",
          face: "smile",
          label: "Change the subject for him",
          style: 1,
          close:
            "*A pause, then something that might be relief.*\n\nYou noticed I had run out of road and you simply moved us along. Nobody does that. They dig, gently, believing it a kindness.\n\nAsk me about the dreadful videos instead. I can talk about those until it gets light. 😌📺",
        },
        {
          key: "bold",
          face: "blush",
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
    faces: { 0: "sweat", 1: "default", 2: "serious" },
    choice: {
      prompt:
        "Now you may be frightened. It is quite the correct response and I will not think less of you. 😰💔",
      options: [
        {
          key: "kind",
          face: "close",
          label: "Say you're not frightened",
          style: 3,
          close:
            "You ought to be.\n\n*A long pause.*\n\n...Come up. Not to discuss it. I have been sitting in this chair for two hours being extremely composed and I find I would rather be in a room with you and stop.\n\n*He does stop. He puts his head down on your shoulder, old beyond telling and entirely undone, and does not move for a long while. 🥹🖤*",
        },
        {
          key: "playful",
          face: "smile",
          label: "Ask if the discipline's ruined",
          style: 1,
          close:
            "Utterly. A whole discipline, and I am back to first principles because of one bad night.\n\nRui has offered me a drink and a conversation about my feelings. I would rather be staked. 😵⚰️ Come up instead and let me be ridiculous at somebody who will not be gentle about it.",
        },
        {
          key: "bold",
          face: "serious",
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
    faces: { 0: "sweat", 1: "smile_blush", 2: "close", 3: "blush" },
    choice: {
      prompt:
        "Take whatever time you like. I have a certain amount of it. ⏳🖤",
      options: [
        {
          key: "answered",
          face: "full_smile_blush",
          label: "Say it back",
          style: 3,
          close:
            "Come up.\n\n*He is standing when you arrive, not languid, not draped over anything, simply standing in the middle of the room like a man who has been waiting.*\n\n*He takes your jaw in both cold hands and looks at you for an unreasonably long time.*\n\n> Say it once more.\n\n*he says.*\n\n> I have wanted this said to me for longer than you would credit, and the once it would have mattered, I let the moment pass in silence. I intend to be quite greedy about hearing it now. 🥰",
        },
        {
          key: "held",
          face: "smile",
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
};
