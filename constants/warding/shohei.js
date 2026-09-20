// Shohei's solo warding cards. Shared cards featuring Shohei (e.g. Sho_Leo)
// live in ./shared.js. See ./index.js for the full contract and entry shape.
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
// Temperature sits close to the bond scenes (constants/dialogue/shohei.js) — the
// delinquent front dropping and the care showing under the mouth, not banter.
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
//     In-person speech, so normal punctuation, and "Senpai" is capitalised.
//   - kind reaches him (nobody checks on the one who cooks), playful meets the
//     tease he opens himself, bold pushes on the front instead of getting under
//     it (base gain 2/1/0 in some order, plus the flat +1). Options are
//     kind / playful / bold.
// `// setting:` notes preserve what each card's art shows.
export default {
  Shohei: {
    file: "Shohei.png",
    characters: ["shohei"],
    title: "Ordinary Morning",
    approach: "Make yourself at home",
    // setting: his living room. The MC came over on his invite; he'd just
    // finished a pickup basketball game with some guys when she arrived, so he's
    // in a tank top and activewear with a towel round his neck, sweaty and not
    // cleaned up. A casual morning hangout, coffee and breakfast. Keep it light.
    line:
      '"You got here first, huh. Sit down, ignore the mess. Give me a couple minutes and I\'ll make you some breakfast, Senpai."',
    greeting:
      '"Ran some pickup before you got here, lost the last one, don\'t ask. Got some fresh coffee waiting for ya."',
    responses: {
      kind: {
        label: "Say a slow morning is perfect",
        close:
          "*He huffs, sets a mug down in front of you.* \"...Yeah. That's what I figured. Nobody plans these. You just get one, and it's a good one.\"\n\n*He knocks his mug against yours before he drinks.*",
      },
      playful: {
        label: "Tease him about the sweat",
        close:
          '*He pulls the towel off his neck and lobs it at the couch, missing you on purpose.* "Up before you, and still the one making you breakfast. Little respect, Senpai."\n\n*A grin.*',
      },
      bold: {
        label: "Say you like him like this",
        close:
          "\"Pfft... it's way too early for you to trust whatever's coming outta your mouth.\" *He turns back to the burner, ears blushing.*",
      },
    },
  },
};
