// Rui doesn't attend class, and doesn't go on missions if he can help it. His
// days are Obscuary's housework, the anomaly garden, and the bar he runs at
// night, and his curse means he can't get tired, so he never sits idle. His
// moments come from that, and he keeps the campus ones that don't need a
// classroom or an idle afternoon. His hands-off distance is a given, so
// nothing here mentions it. See ./index.js for the contract and entry shape.
export default {
  milestones: {
    // --- Stranger and up ---
    rui_bar: {
      minTier: "new",
      emoji: "🍸",
      bucket: "new",
      label: "Swung by his bar",
      afterline:
        "He told you to swing by the bar later. You did, and he made you something off the menu.",
      hint: "that drink at the bar",
    },
    rui_carry_ed: {
      minTier: "new",
      emoji: "🧛",
      bucket: "new",
      label: "Helped him carry Edward home",
      afterline:
        "Edward had popped up out of nowhere and died again. You helped Rui carry him home.",
      hint: "that haul back to Obscuary",
    },
    rui_curse_twin: {
      minTier: "new",
      emoji: "🔗",
      bucket: "new",
      label: "Got called his curse twin",
      afterline:
        "He called you his curse twin, like it was the best thing two people could have in common.",
      hint: "that curse twin talk",
    },

    // --- Acquaintance and up ---
    rui_thread: {
      minTier: "known",
      emoji: "🧵",
      bucket: "new",
      label: "Let him fix a loose thread",
      afterline:
        "He spotted a loose thread on your blazer and offered to fix it for you.",
      hint: "that loose thread on your blazer",
    },
    rui_roses: {
      minTier: "known",
      emoji: "🥀",
      bucket: "new",
      label: "Helped save his rose bushes",
      afterline:
        "His rose bushes were wilting. You helped him save what you could.",
      hint: "saving those rose bushes",
    },

    // --- Friend and up ---
    rui_dinner: {
      minTier: "warm",
      emoji: "🍳",
      bucket: "warm",
      label: "Stayed for dinner at Obscuary",
      afterline: "He asked if you'd eaten yet. You hadn't, so he cooked.",
      hint: "that dinner at Obscuary",
    },

    // --- Close Friend and up ---
    rui_after_closing: {
      minTier: "spark",
      emoji: "🍹",
      bucket: "spark",
      label: "Stayed at the bar after closing",
      afterline:
        "You stayed after the bar closed. He washed glasses and talked the whole time.",
      hint: "that night after closing",
    },
    rui_for_me: {
      minTier: "spark",
      emoji: "🌟",
      bucket: "spark",
      label: "Did the housework with him",
      afterline:
        "You worked through the Obscuary housework with him. He admired how hard you work, then asked, grinning, if it was all for him.",
      hint: "all that hard work",
    },

    // --- Confidant and up ---

    // --- Devoted and up ---
    rui_regular_date: {
      minTier: "bound",
      emoji: "💭",
      bucket: "bound",
      label: "Went on a regular-guy date",
      afterline:
        "He asked what a regular guy would do on a date with you, and you spent the evening doing exactly that.",
      hint: "that regular-guy date",
    },
    rui_drift_off: {
      minTier: "bound",
      emoji: "💤",
      bucket: "bound",
      label: "Fell asleep to his voice",
      afterline: "He invited you over to Obscuary, and he talked until you drifted off.",
      hint: "that night you stayed over",
    },
    rui_rose: {
      minTier: "bound",
      emoji: "🌹",
      bucket: "bound",
      label: "Tended his garden with him",
      afterline:
        "You tended his garden together, and he cut you a rose, thorns already off.",
      hint: "that rose with the thorns off",
    },
  },

  // The campus moments (./shared.js) that don't need a classroom, a mission
  // briefing, or him sitting still.
  shared: [
    "signed_report",
    "coffee_break",
    "vending_machine",
    "helped_search",
    "walked_back",
    "shared_umbrella",
    "festival_stall",
    "shared_earbuds",
    "same_table",
    "movie_night",
    "storm_watch",
    "courtyard_stars",
    "stayed_up",
    "midnight_snack",
    "made_playlist",
    "stolen_glances",
    "lamplit_steps",
    "long_way",
    "long_goodbye",
    "watched_sunrise",
    "left_note",
    "first_snow",
    "their_scarf",
    "watched_sunset",
    "people_talking",
  ],
};
