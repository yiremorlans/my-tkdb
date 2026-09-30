// Haru is the Jabberwock captain and spends day and night running after the
// creatures in his care, so he doesn't regularly go to class. His moments come
// from running the park: feeding time, Peekaboo, the tour fliers, the washing
// and the shopping, picking Ren up from work.
// He can't walk the caller back ("Sorry I can't walk you back..."), so the
// shared walk home isn't his. See ./index.js for the contract and entry shape.
export default {
  milestones: {
    // --- Stranger and up ---
    haru_fliers: {
      minTier: "new",
      emoji: "📣",
      bucket: "new",
      label: "Handed out tour fliers with him",
      afterline:
        "He had a stack of fliers for the Anomalous Animal Back To Nature Tour. You helped him hand them out.",
      hint: "those tour fliers",
    },
    haru_feeding: {
      minTier: "new",
      emoji: "🥕",
      bucket: "new",
      label: "Helped out at feeding time",
      afterline:
        "He had to feed everyone first. You helped, and it went quick.",
      hint: "feeding time",
    },

    // --- Acquaintance and up ---
    haru_peekaboo: {
      minTier: "known",
      emoji: "🐾",
      bucket: "new",
      label: "Checked on the Capybus with him",
      afterline:
        "The Capybus made a noise, so you went with him to check on her.",
      hint: "that check on the Capybus",
    },
    haru_energy_drink: {
      minTier: "known",
      emoji: "🥫",
      bucket: "new",
      label: "Had an energy drink with him",
      afterline:
        "The day hadn't started for him until he'd had his energy drink. You had one too, and he finished his in one go.",
      hint: "those energy drinks",
    },

    // --- Friend and up ---
    haru_ren_pickup: {
      minTier: "warm",
      emoji: "🍽️",
      bucket: "warm",
      label: "Went with him to pick up Ren",
      afterline:
        "Ren was working at the Mystery Diner again. You went with Haru to pick him up.",
      hint: "that trip to the Mystery Diner",
    },
    haru_chores: {
      minTier: "warm",
      emoji: "🧺",
      bucket: "warm",
      label: "Helped with his washing and shopping",
      afterline:
        "He had the washing to take in and the shopping to do. You split it with him.",
      hint: "splitting the washing and shopping",
    },

    // --- Close Friend and up ---
    haru_fox: {
      minTier: "spark",
      emoji: "🦊",
      bucket: "spark",
      label: "Got that fox away from him",
      afterline:
        "That fox got in again, and he still can't do foxes. You got it back out while he yelled for Towa.",
      hint: "that fox you got out",
    },
    haru_night_walk: {
      minTier: "spark",
      emoji: "🌠",
      bucket: "spark",
      label: "Went on his walk after lights-out",
      afterline:
        "The kids were all in bed, so he headed out for a little walk. You went with him.",
      hint: "that little walk after lights-out",
    },

    // --- Confidant and up ---
    haru_hold_fort: {
      minTier: "close",
      emoji: "🏠",
      bucket: "close",
      label: "Held down the fort with him",
      afterline:
        "Towa was off to that hill again, so Haru had to stay put for the night. You held down the fort with him.",
      hint: "holding down the fort",
    },

    // --- Devoted and up ---
    haru_night_out: {
      minTier: "bound",
      emoji: "🌃",
      bucket: "bound",
      label: "Let him take you on a night out",
      afterline:
        "He asked if you were up for a cheeky night out. He knew a good place. It was just the two of you, and he didn't mention the tour once.",
      hint: "that night out",
    },
    haru_boat: {
      minTier: "bound",
      emoji: "🛶",
      bucket: "bound",
      label: "Went out on the boat, just you two",
      afterline:
        "After the last tour of the day, he took the boat back out just for you. No stamps needed, he said.",
      hint: "that boat ride just for you",
    },
  },

  // The campus moments (./shared.js) that don't need a classroom or him
  // walking the caller home.
  shared: [
    "signed_report",
    "vending_machine",
    "helped_search",
    "shared_umbrella",
    "festival_stall",
    "same_table",
    "campus_bench",
    "storm_watch",
    "courtyard_stars",
    "stayed_up",
    "midnight_snack",
    "lamplit_steps",
    "watched_sunrise",
    "left_note",
    "first_snow",
    "their_scarf",
    "got_flowers",
    "watched_sunset",
    "long_goodbye",
    "people_talking",
    "stolen_glances",

    "inside_joke",
  ],
};
