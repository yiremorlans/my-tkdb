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
//   - `dialogue` is ONE greeting-weight line (<= ~120 chars), painted into the
//     image dialogue box like a temperamentDialogue line, so it has to hook on
//     its own. Everything else moves into `prompt`.
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
    dialogue: [
      '"You got here first, huh. Sit down, ignore the mess. Give me a couple minutes and I\'ll make you some breakfast, Senpai."',
    ],
    choice: {
      prompt:
        '"Ran some pickup before you got here, lost the last one, don\'t ask. Got some fresh coffee waiting for ya."',
      options: [
        {
          key: "kind",
          label: "Say a slow morning is perfect",
          style: 3,
          close:
            "*He huffs, sets a mug down in front of you.* \"...Yeah. That's what I figured. Nobody plans these. You just get one, and it's a good one.\"\n\n*He knocks his mug against yours before he drinks.*",
        },
        {
          key: "playful",
          label: "Tease him about the sweat",
          style: 1,
          close:
            '*He pulls the towel off his neck and lobs it at the couch, missing you on purpose.* "Up before you, and still the one making you breakfast. Little respect, Senpai."\n\n*A grin.*',
        },
        {
          key: "bold",
          label: "Say you like him like this",
          style: 4,
          close:
            "\"Pfft... it's way too early for you to trust whatever's coming outta your mouth.\" *He turns back to the burner, ears blushing.*",
        },
      ],
    },
  },
};
