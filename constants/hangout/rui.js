// Rui's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/rui.js.
//
// His touch kills the living, so the player touching him is the scare, not
// the flirt. Bare-skin spots (head, ears, cheek, lips) are off-limits at
// every tier, spark included: a jump, a laugh to cover the worry, and a
// "don't", never welcome. Light, not grave. Clothed spots (chest, hips) and
// his gloved hands play as a normal touch. He never promises to keep his
// hands to himself and never explains the gloves; the distance is a given.
// Bright and forward, with the crack showing at warm+; "cutie" now and then.
// Close is yearning: they can never be physically intimate, so he wants what
// he refuses (user, 2026-10-31). Belly stays light and ticklish.
// Hangout-only workaround (user, 2026-11-06): clothed and gloved touch is
// allowed so he isn't excluded from the activity; no line may imply sex has
// happened. Holds: lips are a scare plus want, never welcome. Bound can't treat
// physical intimacy as having happened for him (the curse), so its shared
// history is nights he's stayed up beside the player, and the yearning
// peaks instead.

export default {
  new: {
    headPat: [
      "Whoa whoa whoa! Hands up where I can see 'em!",
      "Hey! Not the hair, okay? Trust me on this one.",
    ],
    cheekPoke: [
      "Whoa! Okay, you're still breathing. Don't scare me like that!",
      "Yikes! Ahaha... let's not do that again, okay?",
    ],
    lipsTouch: [
      "Nope nope nope! That's a really bad idea, trust me.",
      "Whoa, hard no! Seriously, not the lips.",
    ],
    earTouch: [
      "Whoa, close call! Look, don't touch, okay?",
      "Hey! The piercings are for looking at. From over there.",
    ],
    handTap: [
      "Hey, now. Tapping's fine, just don't go grabbing it, okay?",
      "Oh, hey! You need something?",
    ],
    chestTouch: [
      "Whoa, we just met! At least let me make you a drink first.",
      "Hey, easy there! Little personal space?",
    ],
    bellyTouch: [
      "Whoa there! We're not that close yet, okay?",
      "Hey! Poking a guy you just met? Bold. Let's not, though.",
    ],
    hipsTouch: [
      "Okay, that's way too close. Back up a little?",
      "Hey! Seriously, not cool.",
    ],
    upset: [
      "Hey! Hands off, okay? I'm serious.",
      "...Hey. Stop. I'm not kidding about this one.",
    ],
  },
  known: {
    headPat: [
      "Whoa there! I know the hair's tempting, but no.",
      "Hey, hey! You're way too relaxed about this, you know?",
    ],
    cheekPoke: [
      "Hey! You're gonna give me gray hairs, Honor Roll.",
      "Whoa, close one! You trying to make my heart stop?",
    ],
    lipsTouch: [
      "Nope, not happening. Not even a little.",
      "Whoa! Okay, please don't do that. Ever.",
    ],
    earTouch: [
      "Checking out the piercings? Cool, right? Just look, though.",
      "Ahaha, okay, that's close enough! My ears are fine, really.",
    ],
    handTap: [
      "Yo! Air high-five next time?",
      "Hey, what's up? You need me for something?",
    ],
    chestTouch: [
      "Whoa, getting friendly, huh? Easy there.",
      "Hands off the shirt, cutie. Took me forever to iron that.",
    ],
    bellyTouch: [
      "Whoa! Easy! That's a no-fly zone.",
      "Ahaha, whoa! Honor Roll! I'm ticklish there.",
    ],
    hipsTouch: [
      "Hey! Okay, that's a no.",
      "Ahaha... no. Seriously, back up a little.",
    ],
    upset: [
      "Okay, no more. Hands off.",
      "Hey. I mean it. Stop, okay?",
    ],
  },
  warm: {
    headPat: [
      "Whoa, hey! I like you way too much to let you do that.",
      "Aw, c'mon, not the head! You're gonna make me a nervous wreck.",
    ],
    cheekPoke: [
      "Hey! I know my face is great, but come on.",
      "...Wait. Are you okay? ...Just don't do that, okay?",
    ],
    lipsTouch: [
      "Hey. Not there, okay? I couldn't stand it if something happened.",
      "...Please don't. I really mean it.",
    ],
    earTouch: [
      "Whoa! Admire the piercings all you want, just with your eyes.",
      "Ahaha... hey. Ears are a no-touch zone, Honor Roll.",
    ],
    handTap: [
      "Hey, you! Yeah, I'm right here.",
      "Gimme one sec, then I'm all yours.",
    ],
    chestTouch: [
      "Hey! That's way too close.",
      "Whoa. Okay, a little space, please?",
    ],
    bellyTouch: [
      "Ahaha! Hey, that tickles! Not fair!",
      "Whoa! Sneak attack! Where'd that come from, cutie?",
    ],
    hipsTouch: ["Hey! Nope.", "Okay, that's off-limits. Sorry, cutie."],
    upset: [
      "Hey. I asked you to stop. Please.",
      "Stop, okay? You're making me nervous.",
    ],
  },
  spark: {
    headPat: [
      "...Hey. Don't do that. I'd miss you way too much.",
      "Ahaha... my heart can't take you doing that. In like, two ways.",
    ],
    cheekPoke: [
      "My face is red? That's the panic talking. Mostly.",
      "Cutie, you're gonna give me a heart attack one of these days.",
    ],
    lipsTouch: [
      "...Hey. You know I can't. Don't make it hard.",
      "Ahaha... wow. Nope. You're way too reckless, you know that?",
    ],
    earTouch: [
      "Hey, that's not fair! You know I can't get you back.",
      "Whoa, close one! Ahaha... my heart can't take you being that brave, cutie.",
    ],
    handTap: [
      "Oh? Holding hands now? Look at you. I'm not letting go first.",
      "Is it weird that this is my favorite part of the day?",
    ],
    chestTouch: [
      "Whoa, okay, my heart's going crazy.",
      "Hey... You'll find out how much I like you.",
    ],
    bellyTouch: [
      "Ahaha... my stomach just did a flip. That's on you.",
      "Whoa, hey... you're way too good at catching me off guard.",
    ],
    hipsTouch: [
      "W-whoa! Okay, you're bold today!",
      "Hey! ...Ahaha. I am so not ready for that.",
    ],
    upset: [
      "Okay, okay! You win! Just give me a second to breathe.",
      "...Hey. Stop. My heart can't keep up with you.",
    ],
    heartbeatHold: [
      "Busted, huh? Ahaha... yeah. That's all you.",
      "So much for playing it cool. Guess my heart didn't get the memo.",
    ],
    lipHold: [
      "...Is that a glove? Ahaha... you scared me. ...Don't make me want this more.",
      "Through a glove, and my heart's still doing laps. ...You're okay, right?",
    ],
    handHold: [
      "Aw, you let go. I was getting used to that.",
      "Ahaha, that's it? Let me walk you back, then.",
    ],
  },
  close: {
    headPat: [
      "...Cutie. You have no idea how much I want to let you do that.",
      "I know. Me too. But don't.",
    ],
    cheekPoke: [
      "Not the face. ...I wish it could be the face, cutie.",
      "Hey... Don't. I need you around way more than I need that.",
    ],
    lipsTouch: [
      "...Hey. Don't. I think about it too. All the time.",
      "...Don't. I want it, but I can't risk you.",
    ],
    earTouch: [
      "Hands off. ...I'd let you if I could. You know that, right?",
      "Ahaha... no. Not even you. Especially not you.",
    ],
    handTap: [
      "Leave it there as long as you want. This much I can have.",
      "My glove, your hand. If that's the closest we get. I'll take it.",
    ],
    chestTouch: [
      "Stay right there. I like you this close, cutie.",
      "...This close, and I still can't hold you. Stay anyway?",
    ],
    bellyTouch: [
      "Ahaha! Okay, you got me. Wanna go again?",
      "You know all my ticklish spots now, huh? That's dangerous info.",
    ],
    hipsTouch: [
      "Whoa, bold! ...You know what you do to me, right? Cruel.",
      "Keep that up and I'm closing the bar early. Even if all we get is the same room.",
    ],
    heartbeatHold: [
      "Feel that? That's all the stuff I can't do.",
      "It races every time you're this close. The rest of the way's what I can't do.",
    ],
    lipHold: [
      "Glove or not, my heart just stopped. ...Don't. I want it way too much.",
      "You're killing me here. ...Bad choice of words. Still. Don't.",
    ],
    handHold: [
      "Hold on a little longer? I've been looking forward to this all day.",
      "You hold on like you're not scared of me at all...",
    ],
    caughtTease: [
      "Whoa... hey. You know I want to. ...That's exactly why we can't.",
      "Ahaha... don't, cutie. I'll always stop. Doesn't mean I want to.",
    ],
  },
  bound: {
    heartbeatHold: [
      "Still checking? It's been like this every night you've stayed over.",
      "Every beat of that is yours. Wish I could give you the rest too.",
    ],
    lipHold: [
      "Even with the glove, I still flinch. ...And then I want it all over again. Every time.",
      "You're way too brave with me, cutie. I love that. I hate that.",
    ],
    handHold: [
      "Remember when this used to scare me? Now the scary part's you letting go.",
      "Stay like this till you fall asleep? I'll be right here. Awake, obviously.",
    ],
    breakAway: [
      "Whoa, okay, time out! Ahaha... you can't do that to a guy who can't touch you back.",
      "Hah... I need a second. ...I want you so bad it actually hurts.",
    ],
    teaseLetGo: [
      "Hah... Good call, stopping there. ...Still wish you hadn't.",
      "Ahaha... you stopped. Is it bad I'm kinda sad about that?",
    ],
  },
};
