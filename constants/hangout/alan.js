// Alan's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/alan.js.
//
// No contact in his lines before spark (the player touches him; he doesn't
// touch back until spark). Guarded spots (lips, chest, hips) stay serious
// until spark.
//
// Holds (spark+): one line on letting go. Close hints and holds back;
// bound treats intimacy as shared history. Not good with words, careful
// with his own strength.

export default {
  new: {
    headPat: ["...What are you doing?", "Don't. You don't know me yet."],
    cheekPoke: ["...What.", "You poke everyone you meet like that?"],
    lipsTouch: ["...Hey. Not my lips.", "...Don't. That's personal."],
    earTouch: ["Watch it. Those catch.", "Leave the earrings alone."],
    handTap: ["What is it?", "...You need something?"],
    chestTouch: ["Back up.", "Step back. Not a good idea."],
    bellyTouch: ["...Don't poke me there.", "That's my stomach. Leave it."],
    hipsTouch: ["Hey. Hands to yourself.", "...Move your hand."],
    upset: ["...Stop that.", "Don't come any closer. I mean it."],
  },
  known: {
    headPat: [
      "...You keep doing that.",
      "Huh. Didn't think you'd try that twice.",
    ],
    cheekPoke: ["What is it?", "...You're bored, aren't you."],
    lipsTouch: ["...Not the lips.", "...Leave that alone. Okay?"],
    earTouch: [
      "They're just earrings. Leave them be.",
      "...You're gonna pull one out.",
    ],
    handTap: [
      "Something on my hand?",
      "...You okay? Need a hand with something?",
    ],
    chestTouch: ["Back up a little.", "...Too close."],
    bellyTouch: ["Knock it off.", "...Yeah, it's solid. Now quit it."],
    hipsTouch: ["Hey. Cut it out.", "Don't push your luck."],
    upset: ["...Stop that.", "...I said stop. Give me a minute."],
  },
  warm: {
    headPat: [
      "...You're braver than most.",
      "Nobody does that. ...You're fine.",
    ],
    cheekPoke: ["What? Something on my face?", "...You're in a good mood."],
    lipsTouch: ["...No. Leave those be.", "...You're close enough already."],
    earTouch: ["...That tickles. Quit it.", "You like the earrings that much?"],
    handTap: [
      "Rough hands. ...Doesn't bother you, huh.",
      "...I'm here. What's up?",
    ],
    chestTouch: ["...Back up a little.", "That's close."],
    bellyTouch: [
      "...Hey. Warn me first.",
      "...You caught me off guard. Don't make it a habit.",
    ],
    hipsTouch: ["Hey.", "Don't."],
    upset: ["...Stop that.", "...Okay. Give me some room."],
  },
  spark: {
    headPat: ["...That's my line.", "You're doing it back now? ...Fine."],
    cheekPoke: [
      "...What's that face for?",
      "You keep poking. I'm not gonna break.",
    ],
    lipsTouch: ["...Hey.", "...Didn't see that coming. Give me a second."],
    earTouch: [
      "...That's not fair.",
      "...You found a weak spot. Don't tell anyone.",
    ],
    handTap: ["...Here. Give me your hand.", "You can hold on. I don't mind."],
    chestTouch: [
      "...You can hear that, can't you.",
      "Careful. I'm not used to this.",
    ],
    bellyTouch: [
      "...Your hand's cold. No, leave it.",
      "Hey. ...You're gonna make me smile, doing that.",
    ],
    hipsTouch: ["...You're getting bold.", "Hey. ...Not here."],
    upset: [
      "...Stop that. I'll lose track of my own hands.",
      "Give me a second. I need to cool off.",
    ],
    heartbeatHold: [
      "...That's not from the run.",
      "Yeah. It does that around you. ...Don't make a big deal of it.",
    ],
    lipHold: [
      "...I stayed still. Figured you'd stop on your own.",
      "...I don't know what to say to that. I'm no good with words.",
    ],
    handHold: [
      "...Small hands. I'll be careful with them.",
      "Warm. ...I'll walk you back like this, if you want.",
    ],
  },
  close: {
    headPat: [
      "...Don't stop. I'll owe you one.",
      "I'll get you back for that. Same spot.",
    ],
    cheekPoke: [
      "...Yeah, I'm smiling. That's on you.",
      "Again? ...Go ahead. I'm not going anywhere.",
    ],
    lipsTouch: [
      "Don't start something you're not gonna finish.",
      "...Do that again. I'm not stopping you this time.",
    ],
    earTouch: [
      "...You know that spot now. Use it whenever.",
      "Come closer. You don't have to reach.",
    ],
    handTap: [
      "...Yeah. I've got you.",
      "...Come here. I'll hold on this time.",
    ],
    chestTouch: [
      "...Stay there. I'm used to you now.",
      "Lean in. I'll be careful.",
    ],
    bellyTouch: [
      "Go on. I'm not gonna flinch this time.",
      "Keep that up and I'm pulling you in.",
    ],
    hipsTouch: [
      "...Bold. Looks good on you.",
      "Keep that up and you're not going back to your dorm.",
    ],
    heartbeatHold: [
      "Go ahead and count. It's not slowing down for you.",
      "...Yeah. That's you. Every time.",
    ],
    lipHold: [
      "...You're gonna keep me up, doing that.",
      "...Next time I'm not standing still for it.",
    ],
    handHold: [
      "Hold as tight as you want. I'll watch my grip.",
      "I'd get lost on purpose, if it meant keeping this.",
    ],
    caughtTease: [
      "...Not yet. I want to do this right.",
      "Hey. ...Not like this. Give me a little longer.",
    ],
  },
  bound: {
    heartbeatHold: [
      "...You know what it does around you. Still checking?",
      "It's yours. Count it whenever you want.",
    ],
    lipHold: [
      "...I remember. You don't have to remind me.",
      "...You know what that does to me now.",
    ],
    handHold: [
      "Long as I've got this hand, I'm fine.",
      "...Not scared of my own hands with you around.",
    ],
    breakAway: [
      "...Hold on. Give me a second. I can't think straight.",
      "...Damn. You don't play fair.",
    ],
    teaseLetGo: [
      "...That's where you stop? ...Okay. I'll remember that.",
      "...You did that on purpose. Later, then. I'm holding you to it.",
    ],
  },
};
