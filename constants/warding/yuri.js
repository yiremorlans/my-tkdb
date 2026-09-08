// Yuri's solo warding cards. Shared cards featuring Yuri (e.g. Yuri_Jiro) live
// in ./shared.js. See ./index.js for the full contract and entry shape.
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
// Temperature sits close to the bond scenes (constants/dialogue/yuri.js) — the
// bravado thinning, not banter.
//
// These render like a /roam encounter, not a bond-scene DM:
//   - `dialogue` is ONE greeting-weight line (<= ~120 chars), painted into the
//     image dialogue box like a temperamentDialogue line, so it has to hook on
//     its own. Everything else moves into `prompt`.
//   - Spoken words are wrapped in double quotes; stage directions left bare.
//   - Options are kind / playful / bold. kind lands for Yuri, playful makes him
//     sputter and re-arm, bold makes him bombastic (base gain 2/1/0 in some order, plus the flat +1).
// `// setting:` notes preserve what each card's art shows.
export default {
  Yuri: {
    file: "Yuri.png",
    characters: ["yuri"],
    title: "An Hour Early",
    approach: "Take the seat anyway",
    // setting: seated inside a cafe, an hour ahead of whatever he is here for,
    // wholly absorbed in a page of dense notes from a recent experiment. A pot
    // of tea has been ordered and is going untouched and cold beside him.
    dialogue: [
      '"Sit. Not a word until I finish this line. ...Written wrong, it kills the patient it was meant to save. So it will be exact."',
    ],
    choice: {
      prompt:
        '"An hour early because the notes would not let me sit still. I ordered tea and have not touched it. ...Well? You pulled up the chair. Say something worth the interruption, worm."',
      options: [
        {
          key: "kind",
          label: "Slide the tea into his hand",
          style: 3,
          close:
            '*He takes it without thinking, drinks, blinks.* "...It is still warm. Hmph.\n\nYou needn\'t look so pleased with yourself. ...Thank you. There. Do not make me say it twice."',
        },
        {
          key: "playful",
          label: "Read his notes upside down",
          style: 1,
          close:
            '"Th-That is classified research, you cannot simply... you are reading the notation WRONG." *He snatches the page back, ears red.*\n\n"...You retained more than I expected. That is not praise. It is an observation."',
        },
        {
          key: "bold",
          label: "Tell him it can wait",
          style: 4,
          close:
            '"Wait? Worm, science does not keep office hours. The moment I stop, someone lesser does not, and the textbooks bear their name instead of mine.\n\n...You are still sitting there. Fine. It can wait the length of one cup of tea. One."',
        },
      ],
    },
  },
  Yuri_2: {
    file: "Yuri_2.png",
    characters: ["yuri"],
    title: "Dr.Isami's Experiment",
    approach: "Hold it to the light",
    // setting: in the lab, holding up a vial from his current experiment with
    // open pride. Jiro is asleep on the cot behind him and does not stir.
    dialogue: [
      '"The reaction held. That shade only appears once the compound goes stable. No literature has this molecule yet, worm. I do."',
    ],
    choice: {
      prompt:
        '"Keep your voice down. Jiro finally went under twenty minutes ago. ...Now. Say something worthy of what you are looking at."',
      options: [
        {
          key: "kind",
          label: "Ask what this one cost him",
          style: 3,
          close:
            '*The bravado drops a notch.* "...Three months. Two failures I do not discuss. A great deal of sleep I intend to reclaim.\n\nYou are the first to ask what it cost rather than what it does. I do not know what to do with that. Sit down."',
        },
        {
          key: "playful",
          label: "Ask if it's safe to hold",
          style: 1,
          close:
            '"Is it... obviously it is safe, I would not hand a live hazard to a... it is ninety percent safe. Ninety-two. Stop tilting it!"\n\n*He steadies your hand with both of his, then pretends he did not.*',
        },
        {
          key: "bold",
          label: "Say to put his name on it",
          style: 4,
          close:
            "\"Oh, I intend to. In letters visible from orbit. Let every institution that laughed me out of a symposium read 'ISAMI' and choke on it.\n\n...You encourage the worst in me, worm. Do not stop.\"",
        },
      ],
    },
  },
};
