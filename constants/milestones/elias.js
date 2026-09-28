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
      label: "Shared his candy",
      afterline: "He offered you a candy. He was already on his third one.",
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
      label: "Helped him clean out of habit",
      afterline:
        "He was cleaning something that wasn't his job anymore. It kept bothering him, he said, so you helped him finish.",
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

    // --- Devoted and up ---
    elias_one_drink: {
      minTier: "bound",
      emoji: "🥃",
      bucket: "bound",
      label: "Kept him company for one drink",
      afterline: "Neither of you could sleep, so he offered one drink. You stayed long after the glass was empty.",
      hint: "that one drink",
    },
    elias_goodbye_hand: {
      minTier: "bound",
      emoji: "🫱",
      bucket: "bound",
      label: "Had your hand taken at goodbye",
      afterline:
        "You turned to leave, and he took your hand to say goodbye, smiling like he was in no hurry to let go.",
      hint: "that quick goodbye",
    },
  },

  // The campus moments (./shared.js) that don't assume he's in class or doing
  // the caller a favor.
  shared: [
    "walked_back",
    "borrowed_book",
    "shared_umbrella",
    "movie_night",
    "campus_bench",
    "storm_watch",
    "courtyard_stars",
    "stayed_up",
    "midnight_snack",
    "stolen_glances",
    "lamplit_steps",
    "long_way",
    "long_goodbye",
    "watched_sunrise",
    "left_note",
    "first_snow",
    "lazy_day",
    "shared_book",
    "watched_sunset",
    "people_talking",
  ],
};
