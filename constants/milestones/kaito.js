// Kaito is always broke ("I'm pretty broke this month"), so he can't be the one
// who buys when the vending machine eats the caller's money. His version of
// the moment has him hand over his own drink instead, and everything else in
// the campus set fits him as it is. See ./index.js for the contract and entry
// shape.
import shared from "./shared.js";

export default {
  milestones: {
    // --- Acquaintance ---
    kaito_vending_machine: {
      tier: "known",
      emoji: "🥤",
      bucket: "new",
      label: "Got his drink when the machine ate your money",
      afterline: "The machine ate your money. He offered you his drink instead and wouldn't take it back.",
      hint: "the vending machine that ate your money",
    },
  },

  shared: Object.keys(shared).filter((key) => key !== "vending_machine"),
};
