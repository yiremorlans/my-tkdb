// Tohma's solo warding cards. Shared cards featuring Tohma live in ./shared.js.
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
// Temperature sits close to the bond scenes (constants/dialogue/tohma.js) — the
// courtier's guard dropping, not banter.
//
// These render like a /roam encounter, not a bond-scene DM:
//   - `dialogue` is ONE greeting-weight line (<= ~120 chars), painted into the
//     image dialogue box like a temperamentDialogue line, so it has to hook on
//     its own. Everything else moves into `prompt`.
//   - Spoken words are wrapped in double quotes; stage directions left bare.
//   - kind reaches him (nobody returns the caretaking), playful meets the sly
//     register, bold slides off the courtesy (base gain 2/1/0 in some order, plus the flat +1). Options
//     are kind / playful / bold.
// `// setting:` notes preserve what each card's art shows.
export default {
  Tohma: {
    file: "Tohma.png",
    characters: ["tohma"],
    title: "Spotted",
    approach: "Don't look at the window",
    // setting: a private cafe date with the MC. Through the window, first-years
    // Kaito and Lucas have spotted the two of them and are staring in jealous
    // disbelief. Tohma has clocked them and is entirely unbothered.
    dialogue: [
      "\"Don't turn around. Fuji's jaw is near the pavement, and Errant has forgotten where he is going entirely.\"",
    ],
    choice: {
      prompt:
        '"Let them look. I have nothing to be discreet about today. ...Do you?"',
      options: [
        {
          key: "kind",
          label: "Say you'd plan it again",
          style: 3,
          close:
            '*For once he does not turn it into a line.*\n\n"...I arrange a great many things for a great many people. It is a rare afternoon someone arranges one for me. Thank you. Let the boys see that too."',
        },
        {
          key: "playful",
          label: "Wave at the window",
          style: 1,
          close:
            '*A slow, elegant smile.* "Cruel. I approve entirely.\n\nFuji has walked into the door. Errant is reading a menu upside down. Honestly. I shall have to be twice as strict with them Monday to restore the balance."',
        },
        {
          key: "bold",
          label: "Tell him to call it a date",
          style: 4,
          close:
            '*He raises an eyebrow, unbothered, and takes an unhurried sip.* "Bold. I like that you said it plainly.\n\n...A date. Yes. I would have arrived at the word eventually. You spared us both the speech."',
        },
      ],
    },
  },
  Tohma_2: {
    file: "Tohma_2.png",
    characters: ["tohma"],
    title: "Dark Night",
    approach: "Step into the moonlight",
    // setting: a secluded, intimate spot, just the two of them, moonlight the
    // only source of light. He has stopped keeping up appearances.
    dialogue: [
      '"No lanterns out here, and no one to perform for. It is difficult to keep up appearances in this little light."',
    ],
    choice: {
      prompt:
        '"It is only the two of us and the moon. Whatever you say out here does not leave this spot. You have my word. Go on."',
      options: [
        {
          key: "kind",
          label: "Tell him to stop performing",
          style: 3,
          close:
            '*A long breath in the dark.* "...You have no idea how rarely anyone offers me that. The performance is most of what people want from me.\n\nAll right. Just here. Just tonight. This is the version that is tired, and grateful."',
        },
        {
          key: "playful",
          label: "Ask what the monocle's for",
          style: 1,
          close:
            '"Vanity, mostly. And it gives people something to look at instead of my eyes, which is useful in my line of work."\n\n*A quiet laugh.* "You looked at my eyes anyway. You always do. It is very inconvenient of you."',
        },
        {
          key: "bold",
          label: "Close the distance",
          style: 4,
          close:
            '*He goes still as you step in, and does not retreat.* "...You do not do things by halves, do you. I had a whole graceful evening planned."\n\n*His voice drops.* "Keep going. I will catch up."',
        },
      ],
    },
  },
  Tohma_3: {
    file: "Tohma_3.png",
    characters: ["tohma"],
    title: "Roiling Waves",
    approach: "Reach him before he falls",
    // setting: on a mission, in a bad moment. He has just used his stigma power
    // and his head is still ringing from it; his hand is on the pill bottle he
    // carries for exactly this. He wants the MC to be the thing that steadies
    // him. (Do not invent what the stigma does or why the pills — play only the
    // aftermath the card shows.)
    dialogue: [
      '*His hands are shaking too hard to grip the bottle.* "Give me a moment. The noise in my head takes a while to settle."',
    ],
    choice: {
      prompt:
        '"Don\'t call for anyone, I will be fine. You can go on ahead. ...Or you can stay. I find I would prefer the second one."',
      options: [
        {
          key: "kind",
          label: "Steady his hands and stay",
          style: 3,
          close:
            '*He lets you take the weight of it, breathing slow.* "...There. Better.\n\nI have talked half this school through their worst nights. It appears I am terrible at being on this side of it. Stay until it passes. Please."',
        },
        {
          key: "playful",
          label: "Say you'll bill him for it",
          style: 1,
          close:
            '*A rough huff that is almost a laugh.* "Add it to my account. I am good for it."\n\n*He leans a fraction into you.* "...You did that on purpose. Made me laugh so I would breathe. Do not think I did not notice."',
        },
        {
          key: "bold",
          label: "Breathe the count with him",
          style: 4,
          close:
            '*He follows your count, breath matching breath, until the ringing thins out of it.* "...Direct. It worked."\n\n*His hand settles over yours on the bottle.* "I will not call that nothing. The noise has gone quiet, and you are the reason it has."',
        },
      ],
    },
  },
};
