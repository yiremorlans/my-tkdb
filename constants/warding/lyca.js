// Lyca's solo warding cards. No warding art uploaded yet — add entries
// (keyed by asset filename stem, e.g. Lyca, Lyca_2) once files land in
// assets/warding/. Shared cards featuring Lyca live in ./shared.js. See
// ./index.js for the full contract and entry shape.
export default {
  Lyca: {
    file: "Lyca.png",
    characters: ["lyca"],
    title: "Melt's In Your Mouth",
    dialogue: [],
    choice: { prompt: "", options: [] },
  },
  Lyca_2: {
    file: "Lyca_2.png",
    characters: ["lyca"],
    title: "Hold Still For Me?",
    dialogue: [],
    choice: { prompt: "", options: [] },
  },
};
