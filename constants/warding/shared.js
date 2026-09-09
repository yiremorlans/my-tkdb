// Warding cards featuring two or more characters. A /roam draw of ANY listed
// character can land on the card — pickWardingCardForCharacter tests membership
// in the `characters` array, so its order carries no meaning. Solo cards live
// in the per-character files. See ./index.js for the full contract and entry
// shape.
//
// The key follows the asset filename (Ren_Haru_Towa.png -> "Ren_Haru_Towa"), so
// keys stay 1:1 with assets/warding/. The `characters` array just needs the
// right ids, in any order: characters ["ren", "haru", "towa"].
export default {
  Kaito_Lucas: {
    file: "Kaito_Lucas.png",
    characters: ["kaito", "lucas"],
    title: "Chaos Combo Pair Shot",
    dialogue: [],
    choice: { prompt: "", options: [] },
  },
  Kaito_Yuri: {
    file: "Kaito_Yuri.png",
    characters: ["kaito", "yuri"],
    title: "Caught! (AHHHHH!!!!)",
    dialogue: [],
    choice: { prompt: "", options: [] },
  },
  Lucas_Kaito: {
    file: "Lucas_Kaito.png",
    characters: ["lucas", "kaito"],
    title: "One Winter's Day",
    dialogue: [],
    choice: { prompt: "", options: [] },
  },
  Alan_Leo: {
    file: "Alan_Leo.png",
    characters: ["alan", "leo"],
    title: "Path of Nonresistance",
    dialogue: [],
    choice: { prompt: "", options: [] },
  },
  Mio_Shion: {
    file: "Mio_Shion.png",
    characters: ["mio", "shion"],
    title: "Used To It",
    dialogue: [],
    choice: { prompt: "", options: [] },
  },
  Sho_Leo: {
    file: "Sho_Leo.png",
    characters: ["shohei", "leo"],
    title: "Delinquent Behavior",
    dialogue: [],
    choice: { prompt: "", options: [] },
  },
  Leo_Sho: {
    file: "Leo_Sho.png",
    characters: ["shohei", "leo"],
    title: "Unconventional Seasoning",
    dialogue: [],
    choice: { prompt: "", options: [] },
  },
  Lyca_Edward_Rui: {
    file: "Lyca_Edward_Rui.png",
    characters: ["lyca", "edward", "rui"],
    title: "Unhelpful Presence",
    dialogue: [],
    choice: { prompt: "", options: [] },
  },
  Jo_Elias: {
    file: "Jo_Elias.png",
    characters: ["jo", "elias"],
    title: "Bitter and Sweet",
    dialogue: [],
    choice: { prompt: "", options: [] },
  },
  Subaru_Lyca: {
    file: "Subaru_Lyca.png",
    characters: ["subaru", "lyca"],
    title: "Lunch on the Terrace",
    dialogue: [],
    choice: { prompt: "", options: [] },
  },
  Haru_Ren: {
    file: "Haru_Ren.png",
    characters: ["haru", "ren"],
    title: "Peaceful Afternoon",
    dialogue: [],
    choice: { prompt: "", options: [] },
  },
  Haku_Rui: {
    file: "Haku_Rui.png",
    characters: ["haku", "rui"],
    title: "Casual Companionship",
    dialogue: [],
    choice: { prompt: "", options: [] },
  },
  Jiro_Yuri: {
    file: "Jiro_Yuri.png",
    characters: ["jiro", "yuri"],
    title: "Shared Silence",
    dialogue: [],
    choice: { prompt: "", options: [] },
  },
  Yuri_Jiro: {
    file: "Yuri_Jiro.png",
    characters: ["jiro", "yuri"],
    title: "Taking Precautions",
    dialogue: [],
    choice: { prompt: "", options: [] },
  },
  Rui_Edward: {
    file: "Rui_Edward.png",
    characters: ["rui", "edward"],
    title: "Arduous Excursion",
    dialogue: [],
    choice: { prompt: "", options: [] },
  },
  Romeo_Leo: {
    file: "Romeo_Leo.png",
    characters: ["romeo", "leo"],
    title: "Vicious Tea Break",
    dialogue: [],
    choice: { prompt: "", options: [] },
  },
};
