// The campus-life milestones: the default set. Any character without a file
// of their own in this folder draws from every entry here; a character with a
// file picks which of these they keep. See ./index.js for the contract and
// entry shape.
//
// Everything here is student life: reports, classes, the dorms, briefings,
// curfew. Ordered loosely by how much of a relationship each one implies,
// which is also `minTier` order.
export default {
  // --- Stranger and up: public, no intimacy assumed ---
  signed_report: {
    minTier: "new",
    emoji: "📋",
    bucket: "any",
    label: "Caught them for a {house} report signature",
    afterline: "They signed your {house} report on the way past.",
    hint: "that report hand-off",
  },
  coffee_break: {
    minTier: "new",
    emoji: "☕",
    bucket: "new",
    label: "Coffee breaks together",
    afterline: "You both slipped off for a quick coffee after.",
    hint: "that coffee break",
  },
  walked_to_class: {
    minTier: "new",
    emoji: "🎒",
    bucket: "new",
    label: "Walked to class the same way",
    afterline: "Turns out you were headed the same direction anyway.",
    hint: "that walk to class",
  },

  // --- Acquaintance and up: shared errands, still incidental ---
  library_study: {
    minTier: "known",
    emoji: "📚",
    bucket: "new",
    label: "Studied across the same library table",
    afterline: "You both had reading to do. The table was big enough.",
    hint: "that study session",
  },
  vending_machine: {
    minTier: "known",
    emoji: "🥤",
    bucket: "new",
    label: "Split whatever the vending machine gave up",
    afterline: "The machine ate your money, so they bought instead.",
    hint: "the vending machine that ate your money",
  },

  borrowed_book: {
    minTier: "known",
    emoji: "📕",
    bucket: "new",
    label: "Borrowed a book from them",
    afterline: "They lent you a book they'd just finished.",
    hint: "that book you borrowed",
  },
  helped_search: {
    minTier: "known",
    emoji: "🔦",
    bucket: "new",
    label: "Helped them find something they'd lost",
    afterline: "They'd lost something on the way across campus. You stayed and helped look until it turned up.",
    hint: "that search you helped with",
  },

  // --- Friend and up: choosing each other's company ---
  walked_back: {
    minTier: "warm",
    emoji: "🌙",
    bucket: "warm",
    label: "Walked back to the dorms together",
    afterline: "You walked back toward the dorms, in no hurry.",
    hint: "that walk back to the dorms",
  },
  shared_umbrella: {
    minTier: "warm",
    emoji: "🌧️",
    bucket: "warm",
    label: "Shared an umbrella across the courtyard",
    afterline: "It started raining. One umbrella between you.",
    hint: "sharing that umbrella",
  },
  festival_stall: {
    minTier: "warm",
    emoji: "🎏",
    bucket: "warm",
    label: "Ran a festival stall together",
    afterline: "You both got roped into working the same festival stall all afternoon.",
    hint: "that shift at the stall",
  },
  shared_earbuds: {
    minTier: "warm",
    emoji: "🎧",
    bucket: "warm",
    label: "Shared a pair of earbuds on the Galaxy Express",
    afterline: "You sat together on the Galaxy Express, one earbud each.",
    hint: "sharing earbuds on the Galaxy Express",
  },

  same_table: {
    minTier: "warm",
    emoji: "🍱",
    bucket: "warm",
    label: "Ate lunch at the same table",
    afterline: "The only free seat was at their table. They didn't mind.",
    hint: "that lunch together",
  },

  // --- Close Friend and up: slipping away together, sharing what's only yours ---
  movie_night: {
    minTier: "spark",
    emoji: "🎬",
    bucket: "spark",
    label: "Watched a movie in {firstName}'s room",
    afterline:
      "You ended up back at {firstName}'s room with a movie on, and stayed for all of it.",
    hint: "that movie night",
  },

  campus_bench: {
    minTier: "spark",
    emoji: "🪵",
    bucket: "spark",
    label: "Lost an afternoon on a campus bench",
    afterline: "You sat down for a minute. It was dark when you got up.",
    hint: "that afternoon on the bench",
  },
  storm_watch: {
    minTier: "spark",
    emoji: "⛈️",
    bucket: "spark",
    label: "Watched a storm from inside",
    afterline: "A storm came through. You watched it from the window together.",
    hint: "watching that storm together",
  },
  inside_joke: {
    minTier: "spark",
    emoji: "🤭",
    bucket: "spark",
    label: "Started an inside joke",
    afterline: "Something set you both off, and now one word does it. Nobody else gets it.",
    hint: "that inside joke",
  },
  courtyard_stars: {
    minTier: "spark",
    emoji: "✨",
    bucket: "spark",
    label: "Watched the stars from the courtyard",
    afterline: "You watched the sky until it got too cold to stay.",
    hint: "that night under the stars",
  },
  long_way: {
    minTier: "spark",
    emoji: "🛣️",
    bucket: "spark",
    label: "Took the long way back on purpose",
    afterline: "You both took the long way back, and neither of you mentioned it.",
    hint: "that long way back",
  },

  // --- Confidant and up: staying longer than you need to, and it shows ---
  stayed_up: {
    minTier: "close",
    emoji: "🌌",
    bucket: "close",
    label: "Stayed up talking past curfew",
    afterline: "You lost track of the hour completely.",
    hint: "that late night",
  },

  midnight_snack: {
    minTier: "close",
    emoji: "🌃",
    bucket: "close",
    label: "Went on a midnight snack run",
    afterline:
      "It was past midnight and you were both hungry. That settled it.",
    hint: "that midnight snack run",
  },
  made_playlist: {
    minTier: "close",
    emoji: "🎶",
    bucket: "close",
    label: "Got a playlist made just for you",
    afterline: "They'd made you a playlist and acted like it was nothing.",
    hint: "that playlist made for you",
  },
  stolen_glances: {
    minTier: "close",
    emoji: "👀",
    bucket: "close",
    label: "Couldn't stop looking at each other",
    afterline:
      "You were with a group after, and barely heard a word. You couldn't stop looking at each other.",
    hint: "those looks",
  },
  lamplit_steps: {
    minTier: "close",
    emoji: "🪜",
    bucket: "close",
    label: "Talked on the steps until the lamps went out",
    afterline: "You sat on the steps and talked until the lamps went out.",
    hint: "that talk on the steps",
  },

  long_goodbye: {
    minTier: "close",
    emoji: "👋",
    bucket: "close",
    label: "Took forever to say goodbye",
    afterline: "You said goodbye three times, and neither of you left.",
    hint: "that long goodbye",
  },
  people_talking: {
    minTier: "close",
    emoji: "🗣️",
    bucket: "close",
    label: "Gave people something to talk about",
    afterline: "People have noticed how much time you two spend together. Neither of you minds.",
    hint: "all that talk about you two",
  },

  // --- Devoted and up ---
  watched_sunrise: {
    minTier: "bound",
    emoji: "🌅",
    bucket: "bound",
    label: "Watched the sun come up together",
    afterline: "It got light out before either of you went home.",
    hint: "that sunrise",
  },
  left_note: {
    minTier: "bound",
    emoji: "📝",
    bucket: "bound",
    label: "Found a note they'd left for you",
    afterline: "There was a note waiting for you, in their handwriting.",
    hint: "that note waiting for you",
  },
  first_snow: {
    minTier: "bound",
    emoji: "❄️",
    bucket: "bound",
    label: "Watched the first snow together",
    afterline: "The first snow came down, and you watched it together.",
    hint: "the first snow",
  },
  their_scarf: {
    minTier: "bound",
    emoji: "🧣",
    bucket: "bound",
    label: "Wore their scarf all day",
    afterline: "You wore their scarf all day. They kept glancing at it, pleased.",
    hint: "wearing that scarf all day",
  },
  lazy_day: {
    minTier: "bound",
    emoji: "🍃",
    bucket: "bound",
    label: "Spent a whole day doing nothing together",
    afterline: "A whole day with nowhere to be. You spent it together.",
    hint: "that lazy day",
  },
  shared_book: {
    minTier: "bound",
    emoji: "🔖",
    bucket: "bound",
    label: "Shared a book together",
    afterline: "You read one book side by side, on the same page.",
    hint: "that book you shared",
  },
  got_flowers: {
    minTier: "bound",
    emoji: "💐",
    bucket: "bound",
    label: "Got flowers for no reason",
    afterline: "They brought you flowers and wouldn't give a reason.",
    hint: "those flowers for no reason",
  },
  watched_sunset: {
    minTier: "bound",
    emoji: "🌆",
    bucket: "bound",
    label: "Watched the sunset together",
    afterline: "You watched the sun go down and stayed after.",
    hint: "that sunset",
  },
};
