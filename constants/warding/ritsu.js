// Ritsu's solo warding cards. No warding art uploaded yet — add entries
// (keyed by asset filename stem, e.g. Ritsu, Ritsu_2) once files land in
// assets/warding/. Shared cards featuring Ritsu live in ./shared.js. See
// ./index.js for the full contract and entry shape.
export default {
  Ritsu: {
    file: "Ritsu.png",
    characters: ["ritsu"],
    title: "Second For a Change",
    dialogue: [],
    choice: { prompt: "", options: [] },
  },
  Ritsu_2: {
    file: "Ritsu_2.png",
    characters: ["ritsu"],
    title: "Operatic Aficionado",
    dialogue: [],
    choice: { prompt: "", options: [] },
  },
};
