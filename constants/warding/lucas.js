// Lucas's solo warding cards. No solo warding art uploaded yet — add entries
// (keyed by asset filename stem, e.g. Lucas, Lucas_2) once files land in
// assets/warding/. Shared cards featuring Lucas (e.g. Kaito_Lucas) live in
// ./shared.js. See ./index.js for the full contract and entry shape.
export default {
  Lucas: {
    file: "Lucas.png",
    characters: ["lucas"],
    title: "For You",
    dialogue: [],
    choice: { prompt: "", options: [] },
  },
  Lucas_2: {
    file: "Lucas_2.png",
    characters: ["lucas"],
    title: "Words For the Stars",
    dialogue: [],
    choice: { prompt: "", options: [] },
  },
};
