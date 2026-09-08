// Taiga's solo warding cards. Shared cards featuring Taiga live in ./shared.js.
// See ./index.js for the full contract and entry shape.
//
// Warding cards are a rare /roam outcome. A pick is still scored normally — the
// option's affinityByResponse gain for this character (kind/playful/bold worth
// 2/1/0 in some order) — and then a flat +1 is added on top for the encounter
// being a warding card. The choice still moves the number; the +1 is an additive
// bonus, not a replacement. Every `close` should read as a warm beat, since even
// the character's least-resonant option nets at least +1, and none may read like
// the "what happened after" milestone afterlines in constants/publicEncounters.js.
// The result line also must NOT append the /call boost clause (describeBoost:
// "a warmer welcome, picking up after that coffee") — the warding +1 is its own.
// Temperature sits close to the bond scenes (constants/dialogue/taiga.js): Taiga
// never gets nice, he gets specific, and the volatile enemies-to-lovers edge
// stays in. The time-slipping stigma (he forgets people and places, but never
// the ones he has given a nickname) is the hook for the two dangerous cards.
//
// These render like a /roam encounter, not a bond-scene DM:
//   - `dialogue` is ONE greeting-weight line (<= ~120 chars), painted into the
//     image dialogue box like a temperamentDialogue line, so it has to hook on
//     its own. Everything else moves into `prompt`.
//   - Spoken words are wrapped in double quotes; stage directions left bare.
//     In-person speech keeps normal punctuation (the "u"/"ur"/"k" texting voice
//     is bond-scene DMs only).
//   - bold reaches him, playful matches the mischief, kind loses him (base gain
//     2/1/0 in some order, plus the flat +1). Options are kind / playful / bold.
// `// setting:` notes preserve what each card's art shows.
export default {
  Taiga: {
    file: "Taiga.png",
    characters: ["taiga"],
    title: "Catnap Interrupted",
    approach: "Wait out the glare",
    // setting: a picnic area. He has just demolished a huge meal, the emptied
    // side dishes still on the grass around him, and dropped straight into a
    // nap. The MC has just woken him.
    dialogue: [
      '*One eye cracks open, yellow and unimpressed.* "You woke me up. Better have a reason attached, kitten."',
    ],
    choice: {
      prompt:
        "\"There's still food if that's what you're after. Otherwise you're standing in my sun. Talk or lie down, those are the options.\"",
      options: [
        {
          key: "kind",
          label: "Just watch him sleep a while",
          style: 3,
          close:
            '"...Why are you still here. Standing there watching a guy eat and pass out, that\'s your whole afternoon?"\n\n*He waves a lazy hand.* "Whatever. Sit where I can see you. Weirdo."',
        },
        {
          key: "playful",
          label: "Steal a skewer off his plate",
          style: 1,
          close:
            '*His hand shoots out and misses on purpose.* "Gyahaha! Bold move, robbing a guy mid-nap.\n\nThat one\'s yours now. Next one costs you. Sit down and find out the price."',
        },
        {
          key: "bold",
          label: "Lie down in the sun with him",
          style: 4,
          close:
            '*He shifts over just enough, doesn\'t make a thing of it.* "Huh. You don\'t scare easy."\n\n*An eye closes again.* "Fine. Stay. If you snore I\'m rolling you down the hill, kitten."',
        },
      ],
    },
  },
  Taiga_2: {
    file: "Taiga_2.png",
    characters: ["taiga"],
    title: "Countdown",
    approach: "Stand still, don't run",
    // setting: the MC has wandered somewhere she was not welcome. Taiga does not
    // recognize her at all. He has her at gunpoint, counting down out loud. The
    // turn in the scene is his own mouth supplying a nickname for someone he
    // supposedly doesn't know.
    dialogue: [
      '"Ten. Nine." *The muzzle doesn\'t waver.* "Wrong room, wrong night, and I don\'t know your face. This goes quick."',
    ],
    choice: {
      prompt:
        "\"Six. Five. ...The hell. 'Kitten' just fell out of my mouth. Why have I got a name ready for you.\"",
      options: [
        {
          key: "kind",
          label: "Say his name, gently",
          style: 3,
          close:
            '*His finger eases off the trigger, but the scowl deepens.* "Don\'t do that. Don\'t say it soft like you know me."\n\n*A long beat.* "...Do you know me? Tch. Put your hands down. We\'re figuring this out inside."',
        },
        {
          key: "playful",
          label: "Say he's shooting his favorite",
          style: 1,
          close:
            '*A bark of a laugh, gun tilting off-line.* "My favorite, huh. Gutsy thing to gamble on with a barrel in your face. Gyahaha!\n\n...Problem is it might be true. Count\'s off. Get in here before I change my mind."',
        },
        {
          key: "bold",
          label: "Don't move. Hold his eyes",
          style: 4,
          close:
            "*The gun stays up one more second, then drops.* \"...Two. I stopped at two.\"\n\n*He holsters it, scowling.* \"You didn't flinch, and I've got a nickname for you I don't remember making. That's twice you don't add up. Start talking. Don't leave.\"",
        },
      ],
    },
  },
  Taiga_3: {
    file: "Taiga_3.png",
    characters: ["taiga"],
    title: "Thrills and Spills",
    approach: "Step onto the casino floor",
    // setting: the Sinostra casino floor after hours, and something already died
    // here. Bloodied knife in his hand, blood up his wrist, the manic grin
    // stretched too wide, and he has just turned that look on the MC. Whether she
    // is prey is, for a moment, an open question.
    dialogue: [
      '*Blood on the blade, blood up his wrist, that grin stretched too wide.* "There you are. I was still hungry."',
    ],
    choice: {
      prompt:
        "\"The thing on the floor had it coming. You, though. You I haven't decided about yet, kitten. Run and I chase, or stay and find out I'm mostly full. Pick.\"",
      options: [
        {
          key: "kind",
          label: "Tell him to breathe, it's over",
          style: 3,
          close:
            "*His eyes don't quite focus on you.* \"It's over when I say. Don't come over here cooing at me, kitten, I'm not a spooked animal.\"\n\n*A beat. His shoulders drop half an inch.* \"...It's over. Fine. Hand me a rag and stop looking at me like that.\"",
        },
        {
          key: "playful",
          label: "Ask: dinner or dessert?",
          style: 1,
          close:
            '*He laughs, sharp and delighted, the crazy in it settling a notch.* "Dessert. Obviously. You don\'t waste the good stuff on the main course."\n\n*He points the clean edge at a chair.* "Sit. I\'ll behave. Mostly."',
        },
        {
          key: "bold",
          label: "Step over the mess toward him",
          style: 4,
          close:
            '*The grin falters, real surprise under it.* "...Toward me. Nobody walks toward me when I look like this."\n\n*He wipes the knife on his slacks, slow.* "You\'re not prey. Prey runs. You\'re something else, and now I\'ve gotta know what. Come here."',
        },
      ],
    },
  },
};
