// Zenji's solo warding cards. Shared cards featuring Zenji live in ./shared.js.
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
// Temperature sits close to the bond scenes (constants/dialogue/zenji.js).
//
// These render like a /roam encounter, not a bond-scene DM:
//   - `line` is ONE greeting-weight hook (<= ~120 chars), shown as plain text
//     before the art appears, so it has to land on its own. `greeting` is
//     what gets painted into the image dialogue box the way a
//     temperamentDialogue line is, so that is where the scene is carried; it
//     can run long, the box grows to fit. Nothing in the card marks it as
//     rare — that is the sparkle on the approach button, added at render.
//   - A painted `greeting` is plain text on a canvas, exactly as a /roam
//     greeting is: Discord markdown does nothing there (asterisks are stripped
//     at the paint) and the canvas font has no emoji glyphs, so an emoji would
//     render as an empty box. Write it plain.
//   - Spoken words are wrapped in double quotes; stage directions are left bare,
//     matching constants/dialogue/*.js temperamentDialogue.
//   - Fewer options than a normal /roam encounter (kind / playful / bold).
// `// setting:` notes preserve what each card's art shows without re-narrating
// it in the lines.
export default {
  Zenji: {
    file: "Zenji.png",
    characters: ["zenji"],
    title: "To My Dearest",
    approach: "Approach him compassionately",
    // setting: outdoors, alone, a letter open in his hands. Old correspondence
    // has moved him to tears and he has been caught mid-cry. He wants comforting
    // but will make a show of not needing it.
    line:
      '"A year dead, and a letter still found the soft part of me. ...Do not tell anyone it landed."',
    greeting:
      '"You are still here. Most people grant a weeping man his privacy. ...I find I am glad you are not most people."',
    responses: {
      kind: {
        label: "Sit with him a while",
        close:
          '"...Yes. All right. Sit, then, and let an old ghost drip in company.\n\nIt is a great deal better than doing it alone. I had rather forgotten that."',
      },
      playful: {
        label: "Ask him to read it aloud",
        close:
          '"Aloud? To an audience? My dear, you know precisely which string to pluck.\n\n...Very well. And if my voice cracks, we shall both agree it was the wind."',
      },
      bold: {
        label: "Reach up to his face",
        close:
          '*Your hand passes through more than it meets, the barest chill where a cheek should be. He holds still for it anyway.*\n\n"...The moon is bright tonight. I find I cannot look straight at it, either."',
      },
    },
  },
  Zenji_2: {
    file: "Zenji_2.png",
    characters: ["zenji"],
    title: "Antique Cafe",
    approach: "Ask what he's stuck on",
    // setting: standing outside a small cafe, a book held closed against his
    // chest, a haiku half-drafted and stalled on its last line. He wants the
    // one image that finishes it.
    line:
      '"Twelve syllables, and the last five will not come. The haiku has been laughing at me since noon."',
    greeting:
      '"The twelve I do have are sitting there gloating. Be my muse, then. They usually say something clever at this point."',
    responses: {
      kind: {
        label: "Hand him the closing line",
        close:
          '*You give him something small and true. He goes very still, then writes fast.*\n\n"...That is the five. That is exactly the five. I have been fishing for it all afternoon and you simply handed it over. Do you know how rare that is, my dear."',
      },
      playful: {
        label: "Feed him a terrible haiku",
        close:
          '*He writes it down with great ceremony.* "Five, seven, five, and every syllable a small crime.\n\nIt is perfect. I shall publish it under your name, so posterity knows exactly whom to blame."',
      },
      bold: {
        label: "Say to leave it unfinished",
        close:
          '"Leave it. Unfinished." *He turns the word over as though it might bite.*\n\n"...There is a kind of nerve in that I have not grown into yet. A poem with a hole in it, on purpose. Ask me again when I am braver, my dear."',
      },
    },
  },
  Zenji_3: {
    file: "Zenji_3.png",
    characters: ["zenji"],
    title: "Zenji On Stage",
    approach: "Be the first to clap",
    // setting: mid-performance at Hotarubi, biwa in hand, the room held. Haku is
    // filming from the back. Zenji is playing exceptionally well and, the moment
    // he stops, wants to know it landed for the one person watching.
    line:
      '"That is the best I have played since I died, and I cannot tell if one note of it reached you."',
    greeting:
      '"Haku has it all on film. But film is not what I am asking after. Well, my dear? Your verdict, before the critics arrive."',
    responses: {
      kind: {
        label: "Tell him you felt every note",
        close:
          '"...You felt it." *He lowers the biwa very carefully, as though it might break, or he might.*\n\n"A year of playing to an empty room, and tonight one person felt every note. That is not a small thing. That is the whole thing."',
      },
      playful: {
        label: "Demand an encore",
        close:
          '"An ENCORE. From a dead man with tired strings." *He is already retuning.*\n\n"My dear, you have the makings of a truly ruinous influence, and I intend to let you."',
      },
      bold: {
        label: "Say you're his number one fan",
        close:
          '*A pause, the kind he usually fills with a flourish.*\n\n"...I have had fans. I have never had a number one. Say it once more, would you, so I can be quite sure I heard it and did not simply wish it."',
      },
    },
  },
};
