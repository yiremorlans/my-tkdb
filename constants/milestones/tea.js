// Subaru, Haku and Tohma are tea drinkers, not coffee drinkers: Subaru serves
// tea and sweets for his friends, Haku makes tea to wake himself up, and Tohma
// starts the day with a cup. So the campus coffee break isn't theirs; they
// head back to their own house for tea instead. Everything else in the campus
// set fits them as it is. See ./index.js for the contract and entry shape.
import shared from "./shared.js";

export default {
  milestones: {
    // --- Stranger ---
    tea_at_house: {
      tier: "new",
      emoji: "🍵",
      bucket: "new",
      label: "Joined them for tea back at {house}",
      afterline: "{He} was heading back to {house} for tea. You decided to join {him}.",
      hint: "that tea back at {house}",
    },
  },

  shared: Object.keys(shared).filter((key) => key !== "coffee_break"),
};
