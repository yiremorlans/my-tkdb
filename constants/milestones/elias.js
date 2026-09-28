// Elias is a fourth-year ghoul on probation, the former Dionysia captain, and
// until recently the campus janitor. He doesn't go to class: his days are odd
// jobs and errands for Jo, walks around the academy "for my health", his
// newspapers, coffee, candy, and snack runs for the dorm. He's unreliable, so
// nothing here has him doing the caller a standing favor. He invites and they
// come along. See ./index.js for the contract and entry shape.
export default {
  milestones: {
    // --- Stranger and up ---
    elias_walk: {
      minTier: "new",
      emoji: "🚶",
      bucket: "new",
      label: "Kept him company on his walk",
      afterline:
        "He was out for a walk, for his health. You kept him company for a lap of the academy.",
      hint: "that walk around the academy",
    },
    elias_candy: {
      minTier: "new",
      emoji: "🍭",
      bucket: "new",
      label: "Took one of his candies",
      afterline: "He offered you a candy. He was already on his third.",
      hint: "that candy",
    },
    elias_cafeteria: {
      minTier: "new",
      emoji: "🍛",
      bucket: "new",
      label: "Went to the cafeteria with him and Jo",
      afterline:
        "He was headed to the cafeteria with Jo and asked if you'd like to come.",
      hint: "that cafeteria lunch with Jo",
    },

    // --- Acquaintance and up ---
    elias_errand: {
      minTier: "known",
      emoji: "📨",
      bucket: "new",
      label: "Walked partway on one of Jo's errands",
      afterline: "He was on an errand for Jo. You walked with him partway.",
      hint: "that errand for Jo",
    },
    elias_newspapers: {
      minTier: "known",
      emoji: "📰",
      bucket: "new",
      label: "Read through his newspapers with him",
      afterline:
        "He had a stack of newspapers to get through. You took the other half.",
      hint: "those newspapers",
    },
    elias_cleaning: {
      minTier: "known",
      emoji: "🧽",
      bucket: "new",
      label: "Caught him cleaning out of habit",
      afterline:
        "He was cleaning something that wasn't his job anymore. It kept bothering him, he said.",
      hint: "that spot that needed cleaning",
    },

    // --- Friend and up ---
    elias_coffee: {
      minTier: "warm",
      emoji: "☕",
      bucket: "warm",
      label: "Had a cup of his coffee",
      afterline: "He was making coffee anyway. He made two.",
      hint: "those two coffees",
    },
    elias_snack_run: {
      minTier: "warm",
      emoji: "🛍️",
      bucket: "warm",
      label: "Went on a snack run for his dorm",
      afterline:
        "He was buying snacks for the whole dorm. You helped him choose.",
      hint: "that snack run",
    },
    elias_severed_head: {
      minTier: "warm",
      emoji: "💀",
      bucket: "warm",
      label: "Kept him company holding Shion's severed head",
      afterline:
        "Shion had left him holding a severed head and run off on an urgent errand. You kept him company while he held it.",
      hint: "that severed head",
    },

    // --- Close Friend and up ---
    elias_cake: {
      minTier: "spark",
      emoji: "🍰",
      bucket: "spark",
      label: "Had cake in the Dionysia office",
      afterline: "There was cake in the office. He pulled up a chair for you.",
      hint: "that cake in the office",
    },

    // --- Confidant and up ---
    elias_sweets: {
      minTier: "close",
      emoji: "🍬",
      bucket: "close",
      label: "Tried the sweets he imports from home",
      afterline:
        "A box of sweets had come in from New Orleans. He let you pick first.",
      hint: "those sweets from home",
    },
    elias_quiet_night: {
      minTier: "close",
      emoji: "🌘",
      bucket: "close",
      label: "Kept him company on a quiet night",
      afterline:
        "It was a quiet night. He said he didn't mind those, then asked you to stay.",
      hint: "that quiet night",
    },

    // --- Devoted and up ---
    elias_one_drink: {
      minTier: "bound",
      emoji: "🥃",
      bucket: "bound",
      label: "Kept him company for one drink",
      afterline: "Neither of you could sleep. It was one drink, and it lasted.",
      hint: "that one drink",
    },
    elias_mother: {
      minTier: "bound",
      emoji: "🏡",
      bucket: "bound",
      label: "Heard about his mother",
      afterline:
        "He told you about his mother in New Orleans, and how he'd like to bring her here.",
      hint: "that talk about New Orleans",
    },
  },

  // The campus moments (./shared.js) that don't assume he's in class or doing
  // the caller a favor.
  shared: [
    "walked_back",
    "borrowed_book",
    "same_table",
    "movie_night",
    "rooftop_lunch",
    "campus_bench",
    "storm_watch",
    "courtyard_stars",
    "stayed_up",
    "midnight_snack",
    "galaxy_express",
    "lamplit_steps",
    "late_call",
    "watched_sunrise",
    "left_note",
    "first_snow",
    "lazy_day",
    "found_bookmark",
    "watched_sunset",
  ],
};
