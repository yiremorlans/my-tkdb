// Shohei feeds people; he would never let the caller buy from a vending
// machine. His fishing trip takes its Acquaintance slot ("Sometimes I catch
// and filet the fish myself"), and everything else in the campus set fits him
// as it is. See ./index.js for the contract and entry shape.
import shared from "./shared.js";

export default {
  milestones: {
    // --- Acquaintance ---
    shohei_fishing: {
      tier: "known",
      emoji: "🎣",
      bucket: "new",
      label: "Went fishing with him",
      afterline:
        "He took the rod out and you went along. He filleted the catch himself and wouldn't let you leave without eating some.",
      hint: "that fishing trip",
    },
  },

  shared: Object.keys(shared).filter((key) => key !== "vending_machine"),
};
