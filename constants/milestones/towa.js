// Towa can't speak by day. He hums, and only finds words after dark. He's
// more animal than student: he eats flowers, reads the weather, hears what
// others can't, and goes wherever Haru goes. Classes, library tables and
// coffee breaks don't fit him, so his moments are wordless ones by day and
// night-time ones after. He watches and follows openly; nothing here has him
// hiding or jumping out. See ./index.js for the contract and entry shape.
export default {
  milestones: {
    // --- Stranger and up ---
    towa_clover: {
      minTier: "new",
      emoji: "🍀",
      bucket: "new",
      label: "Hunted for clovers with him",
      afterline:
        "He found a clover with five leaves and gave it to you. Then you both went looking for another.",
      hint: "that five-leaf clover",
    },
    towa_heard_you: {
      minTier: "new",
      emoji: "👂",
      bucket: "new",
      label: "Found him at the park",
      afterline:
        "You went to the park to find him. He'd heard you from the far side of it, and was already on his way over.",
      hint: "that visit to the park",
    },

    // --- Acquaintance and up ---
    towa_flowerbeds: {
      minTier: "known",
      emoji: "🌼",
      bucket: "new",
      label: "Stopped at every flowerbed with him",
      afterline:
        "He stopped at every flowerbed on the way. You waited while he ate his favorite.",
      hint: "every flowerbed on the way",
    },
    towa_rain: {
      minTier: "known",
      emoji: "🌦️",
      bucket: "new",
      label: "Read the weather with him",
      afterline:
        "You watched the sky with him, and he told you it would rain tomorrow. It rained.",
      hint: "reading the sky together",
    },
    towa_where_haru: {
      minTier: "known",
      emoji: "🔍",
      bucket: "new",
      label: "Helped him look for Haru",
      afterline:
        "He'd lost track of Haru. You looked with him until Haru turned up.",
      hint: "that search for Haru",
    },
    towa_read_them: {
      minTier: "known",
      emoji: "👀",
      bucket: "new",
      label: "Got steered away by him",
      afterline:
        "Someone came up the path toward you. He watched them for a second, then took your sleeve and walked you the other way.",
      hint: "that turn off the path",
    },

    // --- Friend and up ---
    towa_higher: {
      minTier: "warm",
      emoji: "⛰️",
      bucket: "warm",
      label: "Went somewhere higher for the stars",
      afterline:
        "He couldn't see the stars from there, so he took you somewhere higher.",
      hint: "that climb for the stars",
    },
    towa_left_behind: {
      minTier: "warm",
      emoji: "🧸",
      bucket: "warm",
      label: "Stood in for Haru",
      afterline:
        "Haru had gone to pick Ren up from the Mystery Diner. Towa decided you would do until he got back.",
      hint: "that night Haru went to get Ren",
    },
    towa_tune: {
      minTier: "warm",
      emoji: "🎵",
      bucket: "warm",
      label: "Caught his tune",
      afterline:
        "He hummed the same tune the whole way. By the end you were humming it too, and he looked delighted.",
      hint: "humming that tune together",
    },
    towa_dance: {
      minTier: "warm",
      emoji: "💃",
      bucket: "warm",
      label: "Got pulled into dance practice",
      afterline:
        "He was practicing steps with Kaito and pulled you in. You never quite got the steps, and he didn't let go.",
      hint: "that dance practice",
    },

    // --- Close Friend and up ---
    towa_love_stories: {
      minTier: "spark",
      emoji: "📖",
      bucket: "spark",
      label: "Told him a love story",
      afterline:
        "He wanted a love story. You told him one, and he wanted another.",
      hint: "those love stories",
    },
    towa_tree: {
      minTier: "spark",
      emoji: "🌳",
      bucket: "spark",
      label: "Listened to the tree on the hill",
      afterline:
        "He took you to the tree on the hill and asked if you could hear it crying.",
      hint: "listening to the tree on the hill",
    },
    towa_boss: {
      minTier: "spark",
      emoji: "🐺",
      bucket: "spark",
      label: "Walked past a carnivore with him",
      afterline:
        "There was a carnivore on the path. He told you not to worry, since he's the boss around here.",
      hint: "that carnivore on the path",
    },

    // --- Confidant and up ---
    towa_patrol: {
      minTier: "close",
      emoji: "🌩️",
      bucket: "close",
      label: "Waited out Haru's patrol with him",
      afterline:
        "Haru had gone out patrolling again. Towa didn't see the point, and kept you with him until Haru was back.",
      hint: "waiting out that patrol",
    },

    // --- Devoted and up ---
    towa_sorry_cuddle: {
      minTier: "bound",
      emoji: "🤗",
      bucket: "bound",
      label: "Owed him a sorry cuddle",
      afterline:
        "He'd been waiting for you all evening. He didn't let you go anywhere until you'd given him a sorry cuddle.",
      hint: "that sorry cuddle",
    },
    towa_heartbeat: {
      minTier: "bound",
      emoji: "💓",
      bucket: "bound",
      label: "Let him hear your heartbeat",
      afterline:
        "He pressed his ear to your chest to listen to your heartbeat, and stayed there long after he'd heard it.",
      hint: "that long listen",
    },
  },

  // The campus moments (./shared.js) that are outdoors, after dark, or need no
  // words from him.
  shared: [
    "signed_report",
    "shared_umbrella",
    "campus_bench",
    "storm_watch",
    "stayed_up",
    "midnight_snack",
    "lamplit_steps",
    "long_way",
    "watched_sunrise",
    "first_snow",
    "lazy_day",
    "their_scarf",
    "got_flowers",
    "watched_sunset",
    "stolen_glances",
    "long_goodbye",
    "people_talking",
  ],
};
