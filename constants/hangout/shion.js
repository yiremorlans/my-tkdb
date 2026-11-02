// Shion's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/shion.js.
//
// Sparse, flat, childish and cruel; fear is "being happy". "My wife" from
// warm on, never new/known (user, 2026-10-31). No water/mermaid hints, no swap explained, no favors,
// no hunting. Guarded spots (lips, chest, hips) stay serious until spark.
// Head pats land on his hat (the model has no hair under it): no hair,
// scalp or hand-temperature lines. The hat never comes off (user, 2026-11-01).

export default {
  new: {
    headPat: [
      "...Who said you could touch my hat?",
      "Do that again. I'll remember your face.",
    ],
    cheekPoke: [
      "Hm. Your face isn't scared yet.",
      "You poke. I poke back. Harder.",
    ],
    lipsTouch: ["...Stop that.", "...Why. What do you want with them."],
    earTouch: ["...What are you doing.", "Leave it."],
    handTap: ["...Hm? What.", "You want something? Say it, then."],
    chestTouch: ["Back.", "Who told you that was allowed?"],
    bellyTouch: ["Hands off.", "...Why my stomach. You're weird."],
    hipsTouch: ["No.", "Touch me there again and I'll make you cry."],
    upset: [
      "Stop. Now I'm in a terrible mood.",
      "Annoying. Go away before I do something.",
    ],
  },
  known: {
    headPat: [
      "...You again. Fine.",
      "Hm. You like my hat that much?",
    ],
    cheekPoke: ["Bored? Me too.", "...You're getting cocky."],
    lipsTouch: ["...Don't. I didn't say you could.", "...Leave my lips alone."],
    earTouch: [
      "Hm. Nothing in there for you.",
      "Leave it. ...Or don't. I'm deciding.",
    ],
    handTap: [
      "...Hm. You keep doing that.",
      "...You want something. Say it.",
    ],
    chestTouch: ["Back. I said back.", "That's not yours to touch. Yet."],
    bellyTouch: [
      "...No. Hand back.",
      "Do that again and I pick what happens next.",
    ],
    hipsTouch: ["No.", "Try it again. See what I do."],
    upset: [
      "Stop it. Or I stop being nice.",
      "Enough. You're worse than Mio's noisy clock.",
    ],
  },
  warm: {
    headPat: [
      "...Tilt it back. I want to see your face.",
      "Now it's crooked. Fix it. That's an order.",
    ],
    cheekPoke: [
      "Hehehe. You're in a mood.",
      "Poke me again and I'll scribble on your face.",
    ],
    lipsTouch: ["...Not my lips. Pick somewhere else.", "...No. I said no."],
    earTouch: [
      "That tickles. I'm not happy about it.",
      "Whisper something, then. Something mean.",
    ],
    handTap: [
      "Hold on, then. Don't let go first.",
      "...What now?",
    ],
    chestTouch: [
      "Careful. That's not a game.",
      "...Back a little. I'm thinking.",
    ],
    bellyTouch: [
      "...Hm. You surprised me. Don't make it a habit.",
      "Hehehe. Sneaky. I'll get you back for that.",
    ],
    hipsTouch: ["No.", "My wife has terrible manners."],
    upset: [
      "Stop. You're making me cranky.",
      "That's enough. Now I want to make someone cry.",
    ],
  },
  spark: {
    headPat: ["Hat's in the way? Good. Earn the rest.", "Only you. Remember that."],
    cheekPoke: [
      "Your face is red. I like it.",
      "Poke me again. I'm keeping count.",
    ],
    lipsTouch: [
      "...You did that on purpose.",
      "...Hm. I'll allow it. Once.",
    ],
    earTouch: [
      "...Hm. My wife learned something.",
      "Don't. ...Okay, once more.",
    ],
    handTap: [
      "You're not letting go. I won't either.",
      "Hold on. You're mine anyway.",
    ],
    chestTouch: [
      "...Feel that? That's you.",
      "...That's not close enough. Closer.",
    ],
    bellyTouch: [
      "...Hm. Leave it there. Don't move.",
      "Hm. Don't look at my face right now.",
    ],
    hipsTouch: ["...Cocky. Very cocky.", "...My wife's getting brave."],
    upset: [
      "...Stop. You're making my face do something weird.",
      "Enough. Now you owe me.",
    ],
  },
  close: {
    headPat: [
      "Want it off? ...Keep wanting. Hehehe.",
      "Hat stays on. My wife can keep trying.",
    ],
    cheekPoke: [
      "Hehehe. Again. I'm not done.",
      "My wife can't stop touching me. Good.",
    ],
    lipsTouch: [
      "Do that again. Slower.",
      "...Again. I wasn't paying attention.",
    ],
    earTouch: [
      "...Mm. Say something. Right there.",
      "Do it again. I'll pretend it doesn't work.",
    ],
    handTap: [
      "Hold tighter. Nobody else gets this hand.",
      "...Foolish. You came back again. Stay.",
    ],
    chestTouch: [
      "Hehehe. Feel that? Your fault.",
      "Don't take it away. I'll get cranky.",
    ],
    bellyTouch: [
      "Brave. I like my wife brave.",
      "Again. I'll get you back later. You'll be happy.",
    ],
    hipsTouch: [
      "Do that and you don't get to leave.",
      "...You're staying. I decided.",
    ],
  },
};
