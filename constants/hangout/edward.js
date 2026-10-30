// Edward's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/edward.js.
//
// He disarms, never menaces: amused, courtly, idle, no fang/blood or bite
// jokes, and he never restates the rumors, the sun or his health. "Ask Rui"
// is his deflection, never a threat. No "wicked girl" (gendered for a player
// line). Guarded spots (lips, chest, hips) stay serious until spark, where he
// is charged rather than flustered: he does the teasing.

export default {
  new: {
    headPat: ["My, my. Is that how humans greet one another now?", "How forward. I don't believe we've been introduced."],
    cheekPoke: ["Oh? Checking whether I'm real? I'm told I am.", "Why, hello there. Was there something you needed?"],
    lipsTouch: ["Ah. I'd advise against that.", "My, how bold. We've barely met."],
    earTouch: ["Ah ha ha. You're a curious one.", "That tickles. Ears are rather sensitive at my age."],
    handTap: ["Ah, a handshake. How very proper of you.", "Hm? Oh, it's you. What is it?"],
    chestTouch: ["Now, now. Let's not get ahead of ourselves.", "Ah. I think that's quite far enough."],
    bellyTouch: ["Ah. I don't believe that's customary, even here.", "Goodness. Do you poke everyone you've only just met?"],
    hipsTouch: ["My, my. That's rather presumptuous.", "No, I don't think so."],
    upset: ["Enough, now. You'll tire me out.", "That will do. Go and pester Rui instead."],
  },
  known: {
    headPat: ["Hm. Not many would try that. Carry on.", "Ah ha ha. Am I being humored?"],
    cheekPoke: ["Is that meant to wake me? I wasn't asleep. Entirely.", "My, my. You're in a playful mood."],
    lipsTouch: ["Ah. Careful.", "That's not a game I'd start, if I were you."],
    earTouch: ["Ah ha ha. You've found a weak spot. Don't tell Rui.", "The earring stays where it is, I'm afraid."],
    handTap: ["Ah, there you are. I wondered when you'd come.", "Hm? You may keep it a moment, if you like."],
    chestTouch: ["Now, now. Mind yourself.", "Hm. Quite close enough, I think."],
    bellyTouch: ["Hm. I'd thank you to keep your hands to yourself.", "Is that a new game of yours? I'd rather not play it."],
    hipsTouch: ["That's far enough.", "No. I think not."],
    upset: ["Do stop. I was having such a pleasant time.", "My patience is longer than most, but it isn't endless."],
  },
  warm: {
    headPat: ["Mm. You may continue. I've no objections.", "How indulgent. I could grow used to this."],
    cheekPoke: ["Ah ha ha. Making sure I'm still among the living? Debatable.", "You're very attentive today. I don't mind."],
    lipsTouch: ["Ah. Not that, I think.", "Careful. Some things are not so easily taken back."],
    earTouch: ["Ah ha ha. That tickles. Rui would be scandalized.", "Hm. I suppose I'll allow it. Just this once."],
    handTap: ["There you are. Come here, then.", "Mm. Stay a moment. Your hands are so warm."],
    chestTouch: ["Now, now. That's quite close.", "Ah. Mind yourself, now."],
    bellyTouch: ["Oh! My. You caught me quite unawares.", "Ah ha ha. Stop, stop. That's hardly fair."],
    hipsTouch: ["Hm. No.", "Not there, I think."],
    upset: ["That will do. Go and pester Rui for a while.", "Enough, now. You'll wear an old man out."],
  },
  spark: {
    headPat: ["Mm. Careful. I may never let you leave.", "How lovely. Do that again."],
    cheekPoke: ["Oh? Is that all you came for? How disappointing.", "You keep doing that. What are you hoping for?"],
    lipsTouch: ["Playing with fire again, are we?", "You ought to be more careful. I might take that seriously."],
    earTouch: ["Ah. Now you're simply being cruel.", "Keep that up and I'll forget my manners."],
    handTap: ["Come here. I've no intention of letting go.", "Your hand fits rather nicely in mine, doesn't it?"],
    chestTouch: ["My. It's been a long time since anyone dared.", "Careful. You'll make an old man's heart race."],
    bellyTouch: ["Oh? Is that where your curiosity led you?", "Careful. I may decide to return the favor."],
    hipsTouch: ["How very bold. I can't decide whether to scold you or applaud.", "...You know better than this. Don't you?"],
    upset: ["Enough, enough. You'll undo me entirely.", "That will do. Even I have my limits."],
  },
};
