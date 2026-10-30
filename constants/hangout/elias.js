// Elias's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/elias.js.
//
// Short, plain, polite; the trailing "…" softens, "Oh," always takes a comma.
// No pet names, no dialect ("reckon", "folks", "ought", "rather"). Guarded
// spots (lips, chest, hips) get courtly deflection until spark, where he turns
// coy and insinuating. He invites; he never promises or escorts.

export default {
  new: {
    headPat: ["Oh, my. That's not something I'm used to.", "…Was there something on my head?"],
    cheekPoke: ["Oh, did you need something?", "Hm? I'm right here."],
    lipsTouch: ["…Let's not do that.", "I think that's far enough."],
    earTouch: ["Oh, that tickles. Please don't.", "…My ears are fine, thank you."],
    handTap: ["Careful. I've been cleaning all day.", "Hm? …Would you like a candy?"],
    chestTouch: ["…I'd prefer you didn't.", "Please step back a little."],
    bellyTouch: ["…Please don't poke me there.", "Oh, that's a little personal."],
    hipsTouch: ["…No. Not there.", "Please don't. I mean that."],
    upset: ["…Please stop that.", "That's enough, I think."],
  },
  known: {
    headPat: ["…You're doing that again.", "Oh, I don't mind. It's just unexpected."],
    cheekPoke: ["Hm? Was I lost in thought again?", "…Bored? I have candy, if that helps."],
    lipsTouch: ["…Let's not.", "That's a little much, don't you think?"],
    earTouch: ["Oh, that tickles.", "…You're curious about the strangest things."],
    handTap: ["Here. Take one. They're from home.", "…Sorry, they're cold. I've been working."],
    chestTouch: ["…That's close enough.", "Please, a little space."],
    bellyTouch: ["…Still no, I'm afraid.", "…That's not where I keep the candy."],
    hipsTouch: ["…Not there.", "Let's keep this polite."],
    upset: ["…All right. That's enough now.", "Please stop. I'm asking nicely."],
  },
  warm: {
    headPat: ["…That's nice. Don't tell Jo.", "Oh, I don't mind that at all."],
    cheekPoke: ["Hm? Do I have candy on my face?", "Oh, I wasn't asleep. Just thinking."],
    lipsTouch: ["…I'll have to say no to that one.", "That's not like you. …Let's not."],
    earTouch: ["Hehe. That tickles.", "…You've found a weak spot. Please keep it to yourself."],
    handTap: ["Take two. I won't count.", "…I'm here. Did you need something?"],
    chestTouch: ["…That's a little close.", "Please. Just a little space."],
    bellyTouch: ["Oh, you startled me.", "…Careful. I wasn't ready for that."],
    hipsTouch: ["…No.", "That's where I draw the line."],
    upset: ["…All right, all right. That's enough.", "Please stop. I'll start to think you're upset with me."],
  },
  spark: {
    headPat: ["…Careful. I could get used to that.", "You're spoiling me. I won't stop you."],
    cheekPoke: ["What is it? …You've been staring.", "Oh, did you want my attention? You have it."],
    lipsTouch: ["…That's dangerous, you know.", "Keep that up and I won't be the one to stop."],
    earTouch: ["…You remembered that spot. That's unfair.", "Hm… Whisper something, while you're there."],
    handTap: ["You can hold on, if you'd like.", "…The last candy's yours. Don't tell anyone."],
    chestTouch: ["…Can you hear it? It's been doing that lately.", "Careful. I'm not as calm as I look."],
    bellyTouch: ["…Your hands are warm. I don't mind.", "Oh, you're getting comfortable. …So am I."],
    hipsTouch: ["…Bold. I didn't think you had it in you.", "Oh, my. …Let's not get ahead of ourselves."],
    upset: ["…Please. You're making it hard to stay polite.", "All right. Give me a moment to collect myself."],
  },
};
