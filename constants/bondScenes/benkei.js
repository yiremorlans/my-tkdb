// Benkei's bond scenes, read as DIALOGUE.benkei.bondScenes
// (constants/dialogue/benkei.js imports this file).
//
// The level-up DMs (docs/bond-scene-dms.md).
//
// SOURCE NOTE: reference/benkei.md now carries a (short) entry for Benkei. Everything
// below is written to stay inside it: shopkeep at Darkwick's campus store,
// former professor and advisor to the now-defunct Clementia House and Ultio
// House, kind hearted, warm and gentle smile, managed day-to-day by one of
// Cornelius' cats. He was a young professor, not an old one, and talks
// casually rather than formally or old-fashioned (no "shan't," "needn't,"
// etc.). No name for anyone but himself, and no reason either house ended.
// School specifics stay vague too (no named forms, no crested merchandise),
// because reference/benkei.md doesn't furnish Darkwick that far.
// None of that is invented here. The closeFriend scene names "the clash" and,
// on the bold branch, says students died and the fallout took both houses
// apart. Beyond that it stays silent on cause, because canon is.
//
// The one piece of connective tissue added on top of canon: a man who used to
// be responsible for a whole house of people, now answers to a cat, and is
// still working out whether that was a demotion or a mercy. That throughline
// is interpretation, not established fact, but it's the thread every scene
// below pulls on.
export default {
  acquaintance: {
    beats: [
      "**{firstName}**: Hey, it's Benkei, from the shop. Hope you don't mind the message. My manager insisted, and when your manager's a cat, you learn not to argue.",
      "There's a shelf under the counter with a few things set aside on it. Nothing dramatic. All {timesMet} times you've been in, I noticed you actually read the labels instead of grabbing and going, and not many people do that.",
    ],
    faces: { 0: "sweat", 1: "smile" },
    choice: {
      prompt:
        "Come by and grab it sometime? I'd rather it not just sit there.",
      options: [
        {
          key: "kind",
          face: "blush",
          label: "Say you'll come by soon",
          style: 3,
          close: "Oh, good. Good.\n\nI'll tidy the shelf before you come by.",
        },
        {
          key: "playful",
          face: "sweat",
          label: "Ask what's on the shelf",
          style: 1,
          close:
            "That'd spoil the whole thing, wouldn't it.\n\nI'm bad at keeping secrets, so come by soon.",
        },
        {
          key: "bold",
          face: "smile",
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
    faces: { 0: "sweat", 1: "close" },
    choice: {
      prompt: "There. You don't have to answer, I won't be offended.",
      options: [
        {
          key: "kind",
          face: "blush",
          label: "Say he's worth talking to",
          style: 3,
          close:
            "Oh...\n\n*A long gap.*\n\nThanks. I'm going to be turning that over for a good while, which is more than I've gotten out of most conversations lately.",
        },
        {
          key: "playful",
          face: "smile",
          label: "Say he beats 'Professor'",
          style: 1,
          close:
            "Lower bar than you'd think. Most people who called me that wanted a signature, not a conversation.\n\nYou're neither, and it took me a while to notice that's rarer than it should be.",
        },
        {
          key: "bold",
          face: "default",
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
      "**{firstName}**: Come by after closing tonight, if you're free. I'll flip the sign and put the kettle on. We've known each other since {sinceMet}, and there's something I've been sitting on that whole time. I'd like you to know about it.",
      "Before the shop, I advised two houses. Ultio and Clementia. That was before the clash, and I know how people are about that word, so I'll leave it where it is. Nobody talks about any of it now, which is fair enough.",
      "And those years were good. That's the part I want on the record. I had a lot of students worth the trouble, and one or two you'd know if I said the names. Haku came through Clementia his first year. He'd tell you he coasted the whole way. He did not coast.",
      "And now there's no Clementia and no Ultio. Both houses, gone. I've given up working out which part of it was mine to stop, because that road doesn't come out anywhere useful.",
    ],
    faces: { 0: "default", 1: "sweat", 2: "smile", 3: "close" },
    choice: {
      prompt:
        "Darkwick keeps its secrets, and it keeps this one buried. But you've given a lot to this place. I'd rather you heard it from me than not at all.",
      options: [
        {
          key: "kind",
          face: "smile",
          label: "Ask about a good day",
          style: 3,
          close:
            "A good day was somebody knocking on my office door with something only I could fix.\n\nThat was all it took. They'd go off and forget it ever happened, which is how you know it was handled properly.",
        },
        {
          key: "playful",
          face: "sweat",
          label: "Ask if he had a favorite",
          style: 1,
          close:
            "Absolutely not. Advisors don't have favorites.\n\nAdvisors have a list, they keep it in their head, and they take it to the grave with them.\n\nOh, all right. The list came out about even, Ultio and Clementia both, which is the one thing neither house ever wanted to hear. Repeat that to any of them, wherever they've landed since, and I'll deny every word.",
        },
        {
          key: "bold",
          face: "close",
          label: "Ask why no one talks about it",
          style: 4,
          close:
            "Because students died. That's the short answer, and there isn't a longer one that comes out any kinder. The fallout took both houses apart, and everything in front of it went quiet too, including the part that was worth keeping.\n\nIt was never an easy place, and I won't pretend it was. But there were good years in among the hard ones, and they got buried with the rest of it. Somebody should remember the good years. Tonight that was you and me.",
        },
      ],
    },
    keepsake: {
      emoji: "🎞️",
      line: "A photograph of Ultio and Clementia students in one frame, from the years nobody talks about.",
    },
  },

  confidant: {
    beats: [
      "**{firstName}**: It's late, and I'm going to say a thing I don't say, and I'd ask you not to be kind about it straight away. Let it sit a moment first.",
      "I used to be responsible for an entire house of people. Advising them, arguing with them, worrying over the ones who skipped breakfast. And now I'm responsible for a shelf of snacks and a schedule set by a cat, and most days I don't mind that at all, which is the part that troubles me.",
      "I've turned it over a great many times: whether it was a demotion or a mercy. I still don't know. I only know I've never said any of that aloud before, and I'm saying it to you because you're the one who actually asks how I'm doing, rather than what I've got in stock.",
    ],
    faces: { 0: "sweat", 1: "default", 2: "close" },
    choice: {
      prompt: "There. Go on. I've braced myself and everything.",
      options: [
        {
          key: "kind",
          face: "smile",
          label: "Say it sounds like both",
          style: 3,
          close:
            "Both.\n\n*He tests the word.* Yes. I think that's probably the honest shape of it. Thank you for not making me choose.",
        },
        {
          key: "playful",
          face: "full_smile",
          label: "Say the cat has good taste",
          style: 1,
          close:
            "She'd agree with you, and never let me hear the end of it.\n\n*A real, surprised laugh.* I needed that more than I expected.",
        },
        {
          key: "bold",
          face: "sweat",
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
    faces: { 0: "default", 1: "annoyed", 2: "surprise" },
    choice: {
      prompt: "Now don't fuss. I've had quite enough fussing already today.",
      options: [
        {
          key: "kind",
          face: "blush",
          label: "Fuss anyway",
          style: 3,
          close:
            "I said not to.\n\n*He lets you, though. He doesn't argue about a single thing.*\n\nIt's nice.\n\n*he admits eventually.*\n\nBeing looked after. I'd nearly forgotten what that felt like from this side of it.",
        },
        {
          key: "playful",
          face: "full_smile",
          label: "Ask if he did the stern voice",
          style: 1,
          close:
            "I did a tremendous voice. Advising a house teaches you exactly one, but it's a good one.\n\n*He looks unbearably pleased with himself, and there's been nobody to tell until now.*",
        },
        {
          key: "bold",
          face: "default",
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
    faces: { 0: "sweat", 1: "smile", 2: "close", 3: "blush" },
    choice: {
      prompt:
        "Take whatever time you need. The kettle's on and the shop isn't going anywhere, and neither am I.",
      options: [
        {
          key: "answered",
          face: "full_smile_blush",
          label: "Say it back",
          style: 3,
          close:
            "*He doesn't reply right away, which isn't like him.*\n\n*When you get to the shop the door's unlocked, and he's standing behind the counter with the page still in his hand, clearly having stood there a while.*\n\nSay it here.\n\n*he says.*\n\nWhere I can see you say it.\n\n*Afterward he holds both your hands across the counter and doesn't manage another word for quite some time.*",
        },
        {
          key: "held",
          face: "smile",
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
};
