// Romeo's solo warding cards. No warding art uploaded yet — add entries
// (keyed by asset filename stem, e.g. Romeo, Romeo_2) once files land in
// assets/warding/. Shared cards featuring Romeo live in ./shared.js. See
// ./index.js for the full contract and entry shape.
export default {
  Romeo: {
    file: "Romeo.png",
    characters: ["romeo"],
    title: "UV Protection",
    dialogue: [],
    choice: { prompt: "", options: [] },
  },
  Romeo_2: {
    file: "Romeo_2.png",
    characters: ["romeo"],
    title: "Healthy Menu",
    dialogue: [],
    choice: { prompt: "", options: [] },
  },
};
