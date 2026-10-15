// Taiga never goes to class or studies ("Class? You don't need to go there"),
// so the walk to class, the library table and the borrowed book aren't his.
// His Stranger slot goes to chasing a smell ("That smells amazing... Shit,
// where's it coming from?"), and his Acquaintance slots to a card game ("I'm
// bored... Hey, you over there. Come play") and a getaway ("Oops. I lost all
// the money Lulu gave me. Better make a run for it before he notices").
// Everything else in the campus set fits him as it is. See ./index.js for the
// contract and entry shape.
import shared from "./shared.js";

const NOT_HIS = ["walked_to_class", "library_study", "borrowed_book"];

export default {
  milestones: {
    // --- Stranger ---
    taiga_smell: {
      tier: "new",
      emoji: "🍖",
      bucket: "new",
      label: "Followed a smell across the courtyard",
      afterline:
        "Something smelled amazing. He went looking for it, and you went too.",
      hint: "chasing that smell",
    },

    // --- Acquaintance ---
    taiga_card_game: {
      tier: "known",
      emoji: "🃏",
      bucket: "new",
      label: "Got dealt into a card game",
      afterline: "He was bored and dealt you in. You didn't win a single hand.",
      hint: "that card game",
    },
    taiga_getaway: {
      tier: "known",
      emoji: "🏃",
      bucket: "new",
      label: "Helped him make a run for it",
      afterline:
        "He'd lost all the money Romeo gave him and had to disappear before Romeo noticed. You went with him.",
      hint: "that getaway",
    },
  },

  shared: Object.keys(shared).filter((key) => !NOT_HIS.includes(key)),
};
