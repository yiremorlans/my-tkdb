// Shion's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/shion.js.
//
// Sparse, flat, childish and cruel; fear is "being happy". "My wife" from
// warm on, never new/known (user, 2026-10-31). No water/mermaid hints, no swap explained, no favors,
// no hunting. Guarded spots (lips, chest, hips) stay serious until spark.
// While the hat is on, head taps land on it (hatPat): no hair, scalp or
// hand-temperature lines there. From warm a double-tap takes it off (hatOff,
// docs/hangout-activity.md §4.2; user, 2026-11-05). At warm that makes him
// properly upset (rig hatOff: upset face); he only starts allowing it at spark. headPat is his bare head. New and known have one only
// so a head tap with the hat off never falls to the placeholder.
// Holds (spark+): the heartbeat line denies by saying the opposite, his
// canon habit; the bound break turns "being happy" back on himself.

export default {
  new: {
    hatPat: [
      "...Who said you could touch my hat?",
      "Do that again. I'll remember your face.",
    ],
    headPat: [
      "...Hands off my head.",
      "Pat me again. See what happens to that hand.",
    ],
    cheekPoke: [
      "Hm. Your face isn't scared yet.",
      "You poke. I poke back. Harder.",
    ],
    lipsTouch: [
      "...Stop that.",
      "Touch my mouth again and I'll sew yours shut.",
    ],
    earTouch: [
      "...What are you doing.",
      "Leave it. Unless you want to lose that hand.",
    ],
    handTap: [
      "...Hm? What.",
      "You want something? Say it. Before I get bored of you.",
    ],
    chestTouch: ["Back.", "Who told you that was allowed?"],
    bellyTouch: [
      "Hands off.",
      "...Do that again and I'll introduce you to my pet.",
    ],
    hipsTouch: ["No.", "Touch me there again and I'll make you cry."],
    upset: [
      "Stop. Now I'm in a terrible mood.",
      "Annoying. Go away before I do something.",
    ],
  },
  known: {
    hatPat: ["...You again. Fine.", "Hm. You like my hat that much?"],
    headPat: [
      "...You'll regret that. Probably. Later.",
      "...Hm. You're lucky I'm sleepy.",
    ],
    cheekPoke: ["Bored? Me too.", "...You're getting cocky."],
    lipsTouch: ["...Don't. I didn't say you could.", "...Leave my lips alone."],
    earTouch: [
      "Hm. Nothing in there for you.",
      "Not my ear. Go bother Mio instead.",
    ],
    handTap: ["...Hm. You keep doing that.", "...You want something. Say it."],
    chestTouch: [
      "Back. I said back.",
      "That's not yours to touch. Remember that.",
    ],
    bellyTouch: [
      "...No. Move it before I move it for you.",
      "Do that again and I pick what happens next.",
    ],
    hipsTouch: ["No.", "Try it again. See what I do."],
    upset: [
      "Stop it. Or I stop being nice.",
      "Annoying. You're worse than Mio's noisy clock.",
    ],
  },
  warm: {
    hatPat: ["Now it's crooked.", "Don't even think about taking it."],
    hatOff: [
      "...That's mine. Give it back. Now.",
      "Give it back. Or I'll make you cry.",
    ],
    headPat: [
      "...You think patting me fixes it? ...Hm. Keep going.",
      "...What's that for? I didn't do anything.",
    ],
    cheekPoke: [
      "Hehehe. You're in a mood.",
      "Poke me again and I'll scribble on your face.",
    ],
    lipsTouch: [
      "...Not my lips. You haven't earned that.",
      "...No. I said no.",
    ],
    earTouch: [
      "That tickles. I'm not happy about it.",
      "Whisper something, then. Something mean.",
    ],
    handTap: ["You keep reaching for me.", "...What now?"],
    chestTouch: [
      "That's not a game.",
      "...Back a little. I'm thinking.",
    ],
    bellyTouch: [
      "...Hm. You surprised me. Don't make it a habit.",
      "Hehehe. Sneaky. I'll get you back for that.",
    ],
    hipsTouch: ["No.", "My wife has terrible manners."],
    upset: [
      "Stop. You're making me cranky.",
      "Ugh. Now I want to make someone cry.",
    ],
  },
  spark: {
    hatPat: ["Hat's in the way?", "You're thinking about it. I can see it on your face."],
    hatOff: [
      "...You took it. Now what? Don't just stand there.",
      "...Don't lose it. Or you'll be punished.",
    ],
    headPat: [
      "...Closer. Do it properly.",
      "Hm. My hair's a mess now. Your fault.",
    ],
    cheekPoke: [
      "Your face is red. I like it.",
      "Poke me again. I'm keeping count.",
    ],
    lipsTouch: [
      "...You did that on purpose.",
      "...Why do you keep touching my mouth? Tell me.",
    ],
    earTouch: [
      "...Hm. My wife learned something.",
      "...Stop. Now my ears are hot. Annoying.",
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
    hipsTouch: [
      "...Hm. Hands are wandering.",
      "Just because you're my wife, you're getting cocky.",
    ],
    upset: [
      "...Stop. My face is getting hot. I don't like it.",
      "Stop. Now you owe me.",
    ],
    heartbeatHold: [
      "...What are you listening to? There's nothing there.",
      "...My heart? It's not doing anything. Go away.",
    ],
    lipHold: [
      "...Hm. Now it's my turn.",
      "...That's it? Go further. I dare you.",
    ],
    handHold: [
      "...That hand was mine. Give it back.",
      "Letting go? Where are you going? ...Then I'll come with you.",
    ],
  },
  close: {
    hatPat: [
      "I love this hat. ...Almost as much as my wife.",
      "Don't take my hat. ...I said don't.",
    ],
    hatOff: [
      "Hm. Now you owe me. I'll think of something.",
      "My wife steals things now. ...I like it.",
    ],
    headPat: [
      "Keep going. You stop when I say.",
      "...Good. My wife's getting it right.",
    ],
    cheekPoke: [
      "Hehehe. Again. I'm not done.",
      "My wife can't stop touching me.",
    ],
    lipsTouch: [
      "Do that again. Slower.",
      "...Again. I wasn't paying attention.",
    ],
    earTouch: [
      "...Mm. Say something. Right there.",
      "...It doesn't tickle. Do it again.",
    ],
    handTap: [
      "Hold tighter. Nobody else gets this hand.",
      "...Foolish. You came back again. Next time, I won't let you leave.",
    ],
    chestTouch: [
      "Hehehe. Feel that? Your fault.",
      "Leave your hand there. Move it and I'll be in a terrible mood.",
    ],
    bellyTouch: [
      "Hehehe. Keep going. I'm watching your face.",
      "Again. I'll get you back later. You'll be happy.",
    ],
    hipsTouch: [
      "Do that and you don't get to leave.",
      "...You're staying. I decided.",
    ],
    heartbeatHold: [
      "...Listen all you want. It's yours. Nobody else's.",
      "...It won't shut up. Stupid thing. ...Don't stop listening.",
    ],
    lipHold: [
      "...Hm. I'm still waiting for the rest.",
      "Only your finger? Cruel. I like it.",
    ],
    handHold: [
      "You let go. Bad. You'll be punished later.",
      "Let go again and I'll lock you in my room. Then you can't.",
    ],
    caughtTease: [
      "...Not yet. I decide when.",
      "Bad. Very bad. ...Now I have to think of a punishment.",
    ],
  },
  bound: {
    hatPat: [
      "You've taken it off plenty of times. Why so polite now?",
      "Leave it on. ...You can take it off later.",
    ],
    hatOff: [
      "Hm. You don't even ask anymore.",
      "Fine. Keep it. You keep everything of mine anyway.",
    ],
    headPat: [
      "Hm. I'm being good, aren't I? Keep going.",
      "Hehehe. I'd let you do this all day.",
    ],
    heartbeatHold: [
      "You've heard it closer than that. Don't act surprised.",
      "Listen. Come closer. ...Closer.",
    ],
    lipHold: [
      "Just the finger? You know better than that, my wife.",
      "...Come here and do it properly.",
    ],
    handHold: [
      "...The door's locked, you know. You're staying.",
      "My wife lives in my room now. That's just how it is.",
    ],
    breakAway: [
      "Hah... Stop. My wife plays dirty.",
      "...Hah. I know a place. Nobody finds us there. We're going.",
    ],
    teaseLetGo: [
      "Touch and go, huh? Afraid I'll catch you?",
      "...Hah. You stopped? Come back here, my wife.",
    ],
  },
};
