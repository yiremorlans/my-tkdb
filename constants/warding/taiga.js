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
//   - `line` is ONE greeting-weight hook (<= ~120 chars), shown as plain text
//     before the art appears, so it has to land on its own. `greeting` is
//     what gets painted into the image dialogue box, so that is where the
//     scene is carried; it can run long, the box grows to fit. Nothing in the
//     card marks it as rare — that is the sparkle on the approach button, and
//     it is added at render, not authored here.
//   - A painted `greeting` is plain text on a canvas, exactly as a /roam
//     greeting is: Discord markdown does nothing there (asterisks are stripped
//     at the paint) and the canvas font has no emoji glyphs, so an emoji would
//     render as an empty box. Write it plain.
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
    approach: "Stand in his sun",
    // setting: a picnic area. He has just demolished a huge meal, the emptied
    // side dishes still on the grass around him, and dropped straight into a
    // nap. The MC has just woken him.
    line:
      '"You woke me up. Better have a damn good reason attached, kitten."',
    greeting:
      "\"There's still food if that's what you're after. Otherwise you're standing in my sun. Talk or lie down, I don't give a shit which.\"",
    responses: {
      kind: {
        label: "Just watch him sleep a while",
        close:
          '"...Why are you still here. Standing there watching a guy eat and pass out, that\'s your whole afternoon?"\n\n*He waves a lazy hand.* "Whatever. Sit where I can see you. Weirdo."',
      },
      playful: {
        label: "Steal a fry from him",
        close:
          '*His hand shoots out and misses on purpose.* "Gyahaha! Bold move, robbing a guy mid-nap.\n\nThat one\'s yours. Next one costs you."',
      },
      bold: {
        label: "Lie down in the sun with him",
        close:
          '*He shifts over just enough, doesn\'t make a thing of it.* "Huh. You don\'t scare easy."\n\n*An eye closes again.* "Fine. Stay. If you snore I\'m rolling your ass off this lawn, kitten."',
      },
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
    line:
      '"Six... Five. Wrong room, wrong night, and I don\'t know your face. This goes quick."',
    greeting:
      "\"Ten. Nine. Eight...'Kitten'? The fuck did that come from. Nothing about you lands but the name.\"",
    responses: {
      kind: {
        label: "Say his name, gently",
        close:
          '*His finger eases off the trigger, but the scowl deepens.* "Don\'t say my name like you know me."\n\n*A long beat.* "...Who the hell are you? Tch. Put your hands down. We\'re figuring this out inside."',
      },
      playful: {
        label: "Say he's shooting his favorite",
        close:
          '*A bark of a laugh, gun tilting off-line.* "My favorite, huh. Gutsy thing to gamble on with a barrel in your face. Gyahaha!\n\n...Count\'s off. Get in here before I change my mind."',
      },
      bold: {
        label: "Don't move. Hold his eyes",
        close:
          "*The gun stays up one more second, then drops.* \"...One.\"\n\n*He holsters it, scowling.* \"You didn't flinch, and I've got a nickname for you I don't remember making. That's twice you don't add up. Start talking.\"",
      },
    },
  },
  Taiga_3: {
    file: "Taiga_3.png",
    characters: ["taiga"],
    title: "Thrills and Spills",
    approach: "Step onto the casino floor",
    // setting: the Sinostra casino floor after hours, and something already died
    // here. Bloodied knife in his hand, blood up his face, the manic grin
    // stretched too wide, and he has just turned that look on the MC. Whether she
    // is prey is, for a moment, an open question.
    line: '"There you are, kitten. I was still hungry."',
    greeting:
      '"That prick had it coming. You? Haven\'t decided yet. Run and I chase."',
    responses: {
      kind: {
        label: "Tell him to breathe, it's over",
        close:
          "*His eyes don't quite focus on you.* \"It's over when I say it's fucking over.\"\n\n*A beat. His shoulders drop half an inch.* \"...Fine. It's over. Hand me a rag and quit staring.\"",
      },
      playful: {
        label: "Ask: dinner or dessert?",
        close:
          '*He laughs, sharp and delighted, the crazy settling a notch.* "Dessert. Obviously. You don\'t waste the good stuff on the main course."\n\n*He points the clean edge of the blade at a chair.* "Sit. I\'ll behave. Mostly."',
      },
      bold: {
        label: "Step over the mess toward him",
        close:
          "*The grin falters, real surprise under it.* \"...Toward me. Nobody does that when I'm like this.\"\n\n*He wipes the knife on his slacks, slow.* \"You're not prey. Prey runs. You're something else. Now I gotta know what. C'mere.\"",
      },
    },
  },
};
