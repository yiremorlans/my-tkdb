// Rui's solo warding cards. Shared cards featuring Rui live in ./shared.js.
// See ./index.js for the full contract and entry shape.
export default {
  Rui: {
    file: "Rui.png",
    characters: ["rui"],
    title: "Just a Moment More",
    approach: "Hold his eyes across the bar",
    // setting: the Obscuary bar, late, lights down. The MC is a little flushed
    // and in no hurry to leave; her drink is barely touched. No contact the
    // whole scene, per the reaper curse. The intimacy is all in the look he
    // holds across the measured foot of air he keeps.
    dialogue: [
      "\"You look at me, then at the drink like it'll help. It won't, cutie. I've watched you leave it sitting there for an hour.\"",
    ],
    choice: {
      prompt:
        "*He leans on the bar, as close as the curse lets him get, and doesn't look away.* \"Stay till close? It's twenty minutes. Just a moment more, cutie. I've got nothing but moments.\"",
      options: [
        {
          key: "kind",
          label: "Say you're staying till close",
          style: 3,
          close:
            "\"Then I'm in no hurry with these glasses. The dishes can wait.\"\n\n*He puts the towel down and doesn't pick it up again.*",
        },
        {
          key: "playful",
          label: "Hold his gaze on purpose",
          style: 1,
          close:
            "*You lock eyes and refuse to blink. He grins.* \"Oh, it's a contest now? I'll lose on purpose and love every second of it. Don't push me, I've got all night to lose.\"",
        },
        {
          key: "bold",
          label: "Say looking isn't enough",
          style: 4,
          close:
            "\"It's not. I know it's not. Hasn't been for a while now.\"\n\n*A beat, and the brightness comes back up, gentler.* \"But it's what's on the menu. So let me enjoy this moment a while.\"",
        },
      ],
    },
  },
  Rui_2: {
    file: "Rui_2.png",
    characters: ["rui"],
    title: "Midsummer Shadow",
    dialogue: [],
    choice: { prompt: "", options: [] },
  },
  Rui_3: {
    file: "Rui_3.png",
    characters: ["rui"],
    title: "Sweet Tour",
    dialogue: [],
    choice: { prompt: "", options: [] },
  },
};
