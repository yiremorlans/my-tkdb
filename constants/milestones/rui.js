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

    // --- Acquaintance and up ---
    rui_thread: {
      minTier: "known",
      emoji: "🧵",
      bucket: "new",
      label: "Got a loose thread fixed",
      afterline:
        "He spotted a loose thread on your blazer. You handed it over, and he had it fixed in a minute.",
      hint: "that loose thread",
    },
    rui_roses: {
      minTier: "known",
      emoji: "🥀",
      bucket: "new",
      label: "Helped save his rose bushes",
      afterline:
        "His rose bushes were wilting. You helped him save what you could.",
      hint: "those rose bushes",
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
      label: "Got asked if it was all for him",
      afterline:
        "He admired how hard you work, then asked, grinning, if it was all for him.",
      hint: "all that hard work",
    },

    // --- Confidant and up ---
    rui_talked_to_sleep: {
      minTier: "close",
      emoji: "💬",
      bucket: "close",
      label: "Got talked to sleep",
      afterline: "He can't get tired, so he talked until you drifted off.",
      hint: "that talk you fell asleep to",
    },

    // --- Devoted and up ---
    rui_stayed_over: {
      minTier: "bound",
      emoji: "🚪",
      bucket: "bound",
      label: "Took him up on his open door",
      afterline:
        "He always says his door is open. This time you stayed the night.",
      hint: "that night at Obscuary",
    },
    rui_rose: {
      minTier: "bound",
      emoji: "🌹",
      bucket: "bound",
      label: "Got a rose from his garden",
      afterline: "He cut you a rose from his garden, thorns already off.",
      hint: "that rose",
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
    "rooftop_lunch",
    "storm_watch",
    "courtyard_stars",
    "stayed_up",
    "midnight_snack",
    "made_playlist",
    "galaxy_express",
    "lamplit_steps",
    "late_call",
    "watched_sunrise",
    "left_note",
    "first_snow",
    "their_scarf",
    "found_bookmark",
    "watched_sunset",
  ],
};
