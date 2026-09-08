// Towa's solo warding cards. Shared cards featuring Towa (e.g. Ren_Haru_Towa)
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
// Temperature sits close to the bond scenes (constants/dialogue/towa.js).
//
// These render like a /roam encounter, not a bond-scene DM:
//   - `dialogue` is ONE greeting-weight line (<= ~120 chars), painted into the
//     image dialogue box like a temperamentDialogue line, so it has to hook on
//     its own. Everything else moves into `prompt`.
//   - Spoken words are wrapped in double quotes; stage directions left bare.
//   - Towa's spoken register: simple, bright, short sentences, "Dandelion" for
//     the MC, a cold seam under the sweetness whenever he is pressed. kind is
//     the axis he weighs people on, playful is easy to meet, bold reads as
//     hostility and turns him for a beat. Options are kind / playful / bold.
// `// setting:` notes preserve what each card's art shows.
export default {
  Towa: {
    file: "Towa.png",
    characters: ["towa"],
    title: "Blooming In Silence",
    approach: "Join him under the stars",
    // setting: night, stargazing, pensive. He is turning a single small
    // dandelion gone to seed between his fingers, not quite smiling.
    dialogue: [
      '"Dandelion. If I blow on this one, all the little seeds let go at once. They don\'t get a say. ...Should I?"',
    ],
    choice: {
      prompt:
        '"Sit with me first. The stars are slow tonight, and I want to watch them with you before I let it go."',
      options: [
        {
          key: "kind",
          label: "Make the wish together",
          style: 3,
          close:
            "*He holds it between you both and you breathe out at the same time.*\n\n\"There they go. I wished you'd stay. You can't take it back now, it's already in the sky.\"",
        },
        {
          key: "playful",
          label: "Blow it out of his hand",
          style: 1,
          close:
            '"Hey!" *He laughs, delighted, watching the seeds scatter.*\n\n"You cheated. Now I get two wishes to make up for it. I\'m using both on the same thing."',
        },
        {
          key: "bold",
          label: "Ask what he's really thinking",
          style: 4,
          close:
            '*The smile thins for a second. The air goes cooler.* "...I was thinking everything here ends. The flower, the stars, all of it."\n\n*Then it passes, and he is bright again.* "But not tonight. Tonight you\'re here. Sit closer."',
        },
      ],
    },
  },
  Towa_2: {
    file: "Towa_2.png",
    characters: ["towa"],
    title: "Full Course of Happiness",
    approach: "Sit before he pouts",
    // setting: a cafe date with the MC. The table is covered in sweets he has
    // ordered all at once, one of everything that looked cheerful.
    dialogue: [
      '"Dandelion, look how many they brought! I ordered everything that looked happy. Open your mouth."',
    ],
    choice: {
      prompt:
        '"You have to try them all. I will be sad if your favorite is not the one I like. ...Which is it going to be?"',
      options: [
        {
          key: "kind",
          label: "Let him feed you every one",
          style: 3,
          close:
            '*He watches you eat each one like it matters.*\n\n"You liked the berry one best. I knew you would. I\'m keeping that. I keep everything I learn about you."',
        },
        {
          key: "playful",
          label: "Steal the one off his plate",
          style: 1,
          close:
            '*He gasps, then grins wide.*\n\n"You took mine. That means I take one back later, and I decide which one, and when. That\'s the rule now."',
        },
        {
          key: "bold",
          label: "Ask if this is a date",
          style: 4,
          close:
            "*He tilts his head, pupils narrowing a little.* \"Does it have to have a name? You're here. I got you sweets. I don't want to share you with anyone else in this room.\n\n...You can call that whatever you want.\"",
        },
      ],
    },
  },
  Towa_3: {
    file: "Towa_3.png",
    characters: ["towa"],
    title: "March Affection",
    approach: "Open your arms wide",
    // setting: he has spent the day filling a whole basket with flowers, all of
    // it meant for the MC, and is holding it out to her.
    dialogue: [
      '"I\'ve been picking since this morning. This one means kind, this one means come back. Hold out your arms."',
    ],
    choice: {
      prompt:
        '"The whole basket is yours. I will be upset if even one of them gets left behind. ...Well?"',
      options: [
        {
          key: "kind",
          label: "Take the whole basket",
          style: 3,
          close:
            '*He piles them on until you can barely see over the top, then looks very pleased.*\n\n"Now you smell like the whole field. Now everyone will know you\'re mine to pick flowers for."',
        },
        {
          key: "playful",
          label: "Put one behind his ear",
          style: 1,
          close:
            "*He holds very still, then beams.*\n\n\"You gave one back. That's not how it works. I'll allow it. I'm going to wear it until it falls apart.\"",
        },
        {
          key: "bold",
          label: "Ask why so many",
          style: 4,
          close:
            "*A pause. The sky dims a shade.* \"Because a few didn't feel like enough. A basket doesn't either, really.\"\n\n*Then he smiles.* \"I'll bring more tomorrow. And the day after. Don't tell me to stop.\"",
        },
      ],
    },
  },
};
