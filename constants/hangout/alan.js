// Alan's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/alan.js.
//
// No contact in his lines before spark (the player touches him; he doesn't
// touch back until spark). Guarded spots (lips, chest, hips) stay serious
// until spark.

export default {
  new: {
    headPat: ["...What are you doing?", "Don't. You don't know me yet."],
    cheekPoke: ["...What.", "You poke everyone you meet like that?"],
    lipsTouch: ["Hands off.", "...Don't."],
    earTouch: ["Watch it. Those catch.", "Leave the earrings alone."],
    handTap: ["Careful. There's grease on these.", "...You need something?"],
    chestTouch: ["Back up.", "Step back. Not a good idea."],
    bellyTouch: ["...Don't poke me there.", "That's my stomach. Leave it."],
    hipsTouch: ["Hey. Hands to yourself.", "That's enough."],
    upset: ["...Stop that.", "Don't come any closer. I mean it."],
  },
  known: {
    headPat: ["...You keep doing that.", "Huh. Didn't think you'd try that twice."],
    cheekPoke: ["What is it?", "...You're bored, aren't you."],
    lipsTouch: ["Don't.", "...That's not funny."],
    earTouch: ["They're just earrings. Leave them be.", "...You're gonna pull one out."],
    handTap: ["Gloves stay on. You'll get grease on you.", "...You okay? Need a hand with something?"],
    chestTouch: ["Back up a little.", "...Too close."],
    bellyTouch: ["Knock it off.", "...I ate already, if that's what you're checking."],
    hipsTouch: ["Hey. Cut it out.", "Don't push your luck."],
    upset: ["...Stop that.", "Enough. Give me a minute."],
  },
  warm: {
    headPat: ["...You're braver than most.", "Nobody does that. ...You're fine."],
    cheekPoke: ["What? Something on my face?", "...You're in a good mood."],
    lipsTouch: ["...Don't.", "...Not that one."],
    earTouch: ["...That tickles. Don't tell anyone.", "You like the earrings that much?"],
    handTap: ["Still got grease on them. ...Doesn't bother you, huh.", "...I'm here. What's up?"],
    chestTouch: ["...Back up. I mean it, a little.", "That's close."],
    bellyTouch: ["...Hey. Warn me first.", "...You caught me off guard. Don't make it a habit."],
    hipsTouch: ["Hey.", "Don't."],
    upset: ["...Stop that.", "Okay. That's enough for now."],
  },
  spark: {
    headPat: ["...That's my line.", "You're doing it back now? ...Fine."],
    cheekPoke: ["...What's that face for?", "You keep poking. I'm not gonna break."],
    lipsTouch: ["...Hey.", "Don't start something you're not gonna finish."],
    earTouch: ["...That's not fair.", "Keep that up and I'll forget what I was doing."],
    handTap: ["...Here. I wiped them off.", "You can hold on. I don't mind."],
    chestTouch: ["...You can hear that, can't you.", "Careful. I'm not used to this."],
    bellyTouch: ["...Your hand's cold. No, leave it.", "Hey. ...You're gonna make me smile, doing that."],
    hipsTouch: ["...You're getting bold.", "Hey. ...Not here."],
    upset: ["...Stop that. I'll lose track of my own hands.", "Give me a second. I need to cool off."],
  },
};
