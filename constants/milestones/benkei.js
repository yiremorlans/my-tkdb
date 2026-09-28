// Benkei isn't a student. He's the shopkeep at the campus store (open 24/7)
// and used to be a professor, so his moments are built on that instead. Same
// tier spread idea: every step up unlocks something. See ./index.js for the
// contract and entry shape.
export default {
  milestones: {
    // --- Stranger and up ---
    benkei_delivery: {
      minTier: "new",
      emoji: "📦",
      bucket: "new",
      label: "Helped carry a delivery back to the store",
      afterline:
        "He was carrying too much again. You took half of it back to the store with him.",
      hint: "that delivery you helped carry",
    },
    benkei_snack: {
      minTier: "new",
      emoji: "🍙",
      bucket: "new",
      label: "Split a snack he wouldn't take money for",
      afterline:
        "He opened a snack to split with you and wouldn't hear a word about paying.",
      hint: "that snack on the house",
    },

    // --- Acquaintance and up ---
    benkei_restock: {
      minTier: "known",
      emoji: "🛒",
      bucket: "new",
      label: "Helped restock the shelves",
      afterline:
        "You stayed to help restock. He thanked you for every single box.",
      hint: "that restock",
    },
    benkei_counter: {
      minTier: "known",
      emoji: "🏪",
      bucket: "new",
      label: "Kept him company behind the counter",
      afterline:
        "You kept him company behind the counter. Nobody came in, which suited you both.",
      hint: "that quiet shift",
    },

    // --- Friend and up ---
    benkei_advising: {
      minTier: "warm",
      emoji: "📖",
      bucket: "warm",
      label: "Talked over your classes with him",
      afterline:
        "You talked through your classes with him. The professor in him came out, and he had notes on every one.",
      hint: "that talk about your classes",
    },
    benkei_walk_back: {
      minTier: "warm",
      emoji: "🌙",
      bucket: "warm",
      label: "Walked back to the store together",
      afterline: "You walked back to the store with him, in no hurry.",
      hint: "that walk back to the store",
    },
    benkei_umbrella: {
      minTier: "warm",
      emoji: "☂️",
      bucket: "warm",
      label: "Shared an umbrella from the store's stock",
      afterline:
        "It started raining. He had an umbrella off the shelf, and it was one between you.",
      hint: "the umbrella",
    },

    benkei_new_stock: {
      minTier: "warm",
      emoji: "🧃",
      bucket: "warm",
      label: "Taste-tested the new stock",
      afterline:
        "A new snack came in. He wanted your opinion before shelving it.",
      hint: "that taste test",
    },

    // --- Close Friend and up ---
    benkei_tea: {
      minTier: "spark",
      emoji: "🍵",
      bucket: "spark",
      label: "Had tea in the store's back room",
      afterline: "He made tea in the back room and let the restocking wait.",
      hint: "that tea",
    },
    benkei_front_step: {
      minTier: "spark",
      emoji: "🌇",
      bucket: "spark",
      label: "Ate lunch on the store's front step",
      afterline: "Lunch on the store's front step, just the two of you.",
      hint: "that lunch on the step",
    },

    benkei_late_delivery: {
      minTier: "spark",
      emoji: "🚚",
      bucket: "spark",
      label: "Counted a late delivery with him",
      afterline: "A delivery came in late. You stayed to count it with him.",
      hint: "that late delivery",
    },

    benkei_book_rec: {
      minTier: "spark",
      emoji: "📚",
      bucket: "spark",
      label: "Went through a book from his old syllabus",
      afterline:
        "He pulled out a book he used to assign, and you went through it together.",
      hint: "that book from the old syllabus",
    },

    // --- Confidant and up ---
    benkei_night_shift: {
      minTier: "close",
      emoji: "🌌",
      bucket: "close",
      label: "Kept him company through a night shift",
      afterline: "The store never closes, and neither of you noticed the hour.",
      hint: "that night shift",
    },

    benkei_noodles: {
      minTier: "close",
      emoji: "🍜",
      bucket: "close",
      label: "Ate cup noodles behind the counter",
      afterline: "Two cup noodles behind the counter. He paid for both.",
      hint: "those noodles",
    },
    benkei_advising_keepsake: {
      minTier: "close",
      emoji: "🗂️",
      bucket: "close",
      label: "Looked through his advising keepsakes",
      afterline:
        "He dug out what he kept from his advising days, and you went through it together.",
      hint: "that keepsake from the advising days",
    },
    benkei_stock_list: {
      minTier: "close",
      emoji: "📋",
      bucket: "close",
      label: "Wrote up the stock list with him",
      afterline:
        "You wrote up the stock list together. What you like is on it now.",
      hint: "your spot on the stock list",
    },
    // --- Devoted and up ---
    benkei_sunrise: {
      minTier: "bound",
      emoji: "🌄",
      bucket: "bound",
      label: "Watched the sun come up from behind the counter",
      afterline: "It got light out, and neither of you had left the counter.",
      hint: "that sunrise",
    },
    benkei_humming: {
      minTier: "bound",
      emoji: "🎵",
      bucket: "bound",
      label: "Hummed your song together",
      afterline:
        "He was humming the song you like. You joined in, and he didn't stop.",
      hint: "that song",
    },
  },

  // The campus moments (./shared.js) that don't assume he's a student.
  shared: [
    "coffee_break",
    "vending_machine",
    "shared_umbrella",
    "watched_sunrise",
    "borrowed_book",
    "storm_watch",
    "courtyard_stars",
    "made_playlist",
    "first_snow",
    "their_scarf",
    "shared_book",
    "got_flowers",
    "watched_sunset",
    "long_goodbye",
    "people_talking",
  ],
};
