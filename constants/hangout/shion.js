// Shion's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/shion.js.
//
// Sparse, flat, childish and cruel; fear is "being happy". "My wife" from
// known on, never new. No water/mermaid hints, no swap explained, no favors,
// no hunting. Guarded spots (lips, chest, hips) stay serious until spark.

export default {
  new: {
    headPat: ["...Who said you could touch my hat?", "Do that again. I'll remember your face."],
    cheekPoke: ["Hm. Your face isn't scared yet.", "You poke. I poke back. Harder."],
    lipsTouch: ["Don't.", "Put that finger near my teeth again. Go on."],
    earTouch: ["...What are you doing.", "Leave it."],
    handTap: ["Gloves stay on.", "Oh. You're not running. Strange."],
    chestTouch: ["Back.", "Who told you that was allowed?"],
    bellyTouch: ["Hands off.", "Poke me there again. See how happy you get."],
    hipsTouch: ["No.", "Touch me there again and I'll make you cry."],
    upset: ["Stop. Now I'm in a terrible mood.", "Annoying. Go away before I do something."],
  },
  known: {
    headPat: ["...You again. Fine.", "Only you get to do that. Don't tell anyone."],
    cheekPoke: ["Bored? Me too.", "My wife's getting cocky."],
    lipsTouch: ["Don't.", "...Not that. Not yet."],
    earTouch: ["Hm. Nothing in there for you.", "Leave it. ...Or don't. I'm deciding."],
    handTap: ["Hold the glove, then. Not the hand.", "...You want something. Say it."],
    chestTouch: ["Back. I said back.", "That's not yours to touch. Yet."],
    bellyTouch: ["...No. Hand back.", "Do that again and I pick what happens next."],
    hipsTouch: ["No.", "Try it again. See what I do."],
    upset: ["Stop it. Or I stop being nice.", "Enough. You're worse than Mio's noisy clock."],
  },
  warm: {
    headPat: ["...Again.", "Don't stop. That's an order."],
    cheekPoke: ["Hehehe. You're in a mood.", "Poke me again and I'll scribble on your face."],
    lipsTouch: ["...No.", "Not that. Not here."],
    earTouch: ["That tickles. I'm not happy about it.", "Whisper something, then. Something mean."],
    handTap: ["Hold on, then. Don't let go first.", "You keep coming closer. Good."],
    chestTouch: ["Careful. That's not a game.", "...Back a little. I'm thinking."],
    bellyTouch: ["...Hm. You surprised me. Don't make it a habit.", "Hehehe. Sneaky. I'll get you back for that."],
    hipsTouch: ["No.", "My wife has terrible manners."],
    upset: ["Stop. You're making me cranky.", "That's enough. Now I want to make someone cry."],
  },
  spark: {
    headPat: ["...Closer. Do it properly.", "Only you. Remember that."],
    cheekPoke: ["Your face is red. I like it.", "Poke me again. I'm keeping count."],
    lipsTouch: ["...You did that on purpose.", "Do that again. Slower."],
    earTouch: ["...Hm. My wife learned something.", "Don't. ...Okay, once more."],
    handTap: ["You're not letting go. I won't either.", "Hold on. You're mine anyway."],
    chestTouch: ["...Feel that? Don't tell Mio.", "You're too close. ...Stay there."],
    bellyTouch: ["...Hm. Leave it there. Don't move.", "Hm. Don't look at my face right now."],
    hipsTouch: ["...Cocky. Very cocky.", "Do that and you don't get to leave."],
    upset: ["Stop, or I'll keep you here till you cry.", "Enough. Now you owe me."],
  },
};
