// Zenji is a ghost. He died at Darkwick last year, most people can't see him,
// he doesn't eat ("I'm on a diet, you see"), and casual contact is off the
// table for him. So nothing here has him in class, at a table, sharing an
// umbrella or handing anything over. His moments are the ones his canon gives
// him: stories and poems, the biwa in the Hotarubi music room, the folktale
// videos Haku films, people-watching, the moon. See ./index.js for the
// contract and entry shape.
export default {
  milestones: {
    // --- Stranger and up ---
    zenji_story: {
      minTier: "new",
      emoji: "📜",
      bucket: "new",
      label: "Listened to one of his new stories",
      afterline:
        "He had a new story and wanted an audience. You listened to the end, which is more than most do.",
      hint: "that new story",
    },
    zenji_people_watching: {
      minTier: "new",
      emoji: "👀",
      bucket: "new",
      label: "People-watched with him",
      afterline:
        "He was people-watching. You watched with him, and nobody passing could tell he was there.",
      hint: "that people-watching",
    },
    zenji_autograph: {
      minTier: "new",
      emoji: "✍️",
      bucket: "new",
      label: "Laughed at his autograph joke",
      afterline:
        "He played the celebrity and told you he was fresh out of autographs. You laughed, and he looked pleased with himself.",
      hint: "that autograph joke",
    },

    // --- Acquaintance and up ---
    zenji_biwa: {
      minTier: "known",
      emoji: "🪕",
      bucket: "new",
      label: "Heard his biwa in the music room",
      afterline:
        "He played his biwa for you in the music room. Someone outside ran off shouting about a ghost, and he asked who they meant.",
      hint: "the biwa in the music room",
    },
    zenji_advice_salon: {
      minTier: "known",
      emoji: "💌",
      bucket: "new",
      label: "Helped run his advice salon",
      afterline:
        "He took his advice salon out into the field. You helped him answer the write-ins.",
      hint: "that advice salon",
    },
    zenji_fan_letters: {
      minTier: "known",
      emoji: "📨",
      bucket: "new",
      label: "Let him down about his fan mail",
      afterline:
        "He was sure he'd gotten fan mail. He took the news that he hadn't rather well.",
      hint: "that fan mail",
    },
    zenji_sensational: {
      minTier: "known",
      emoji: "🔮",
      bucket: "new",
      label: "Went looking for something sensational",
      afterline:
        "He wanted to go in search of something sensational. You went along to see what turned up.",
      hint: "that search for something sensational",
    },

    // --- Friend and up ---
    zenji_filming: {
      minTier: "warm",
      emoji: "🎥",
      bucket: "warm",
      label: "Filmed a folktale video for him",
      afterline:
        "Haku was busy, so you filmed his folktale video instead.",
      hint: "that folktale video you filmed",
    },
    zenji_fishing: {
      minTier: "warm",
      emoji: "🎣",
      bucket: "warm",
      label: "Watched his mastery with a fishing pole",
      afterline:
        "He wanted to show you his mastery with a fishing pole. Nothing bit. He called it a triumph anyway.",
      hint: "that fishing trip",
    },
    zenji_siblings: {
      minTier: "warm",
      emoji: "👪",
      bucket: "warm",
      label: "Got asked about your siblings",
      afterline:
        "He asked if you had any siblings, then said he didn't mean anything by it.",
      hint: "that question about siblings",
    },
    zenji_doll: {
      minTier: "warm",
      emoji: "🎎",
      bucket: "warm",
      label: "Spent time with him and Saburo",
      afterline:
        "He and Saburo kept you company for a while. He talked about Saburo the whole time, and you let him.",
      hint: "that time with Saburo",
    },

    // --- Close Friend and up ---
    zenji_moon: {
      minTier: "spark",
      emoji: "🌕",
      bucket: "spark",
      label: "Heard him say the moon was beautiful",
      afterline:
        "He said the moon was beautiful, and didn't explain what he meant.",
      hint: "that moon",
    },
    zenji_subaru: {
      minTier: "spark",
      emoji: "🛌",
      bucket: "spark",
      label: "Woke Subaru while he played",
      afterline:
        "Subaru had overslept, so he sent you in to wake him and played the biwa to cheer you on.",
      hint: "waking Subaru to the biwa",
    },

    // --- Confidant and up ---
    zenji_feast: {
      minTier: "close",
      emoji: "🍡",
      bucket: "close",
      label: "Ate while he watched",
      afterline:
        "He wouldn't eat, being on a diet. He watched you finish yours like it was a feast.",
      hint: "that feast for one",
    },
    zenji_urashima: {
      minTier: "close",
      emoji: "🐢",
      bucket: "close",
      label: "Fell asleep to Urashima Taro",
      afterline:
        "You couldn't sleep, so he told you the story of Urashima Taro. You didn't hear the end.",
      hint: "that bedtime story",
    },
    zenji_mortkranken: {
      minTier: "close",
      emoji: "🏥",
      bucket: "close",
      label: "Got worried over before Mortkranken",
      afterline:
        "You were headed to Mortkranken. He asked if you were hurt, and hoped you'd take care.",
      hint: "that trip to Mortkranken",
    },
    zenji_goodnight: {
      minTier: "close",
      emoji: "🌙",
      bucket: "close",
      label: "Got bid good night",
      afterline:
        "He looked into your eyes and bid you good night. He called himself the luckiest fella for miles around.",
      hint: "that good night",
    },

    // --- Devoted and up ---
    zenji_pillow: {
      minTier: "bound",
      emoji: "🛌",
      bucket: "bound",
      label: "Woke up to him by your pillow",
      afterline:
        "He was by your pillow when you woke. He swore he'd only just arrived.",
      hint: "that morning by your pillow",
    },
    zenji_poem: {
      minTier: "bound",
      emoji: "🪶",
      bucket: "bound",
      label: "Got a poem written for you",
      afterline:
        "He wrote you a poem, then read it aloud before you could read it yourself.",
      hint: "that poem",
    },
    zenji_fears: {
      minTier: "bound",
      emoji: "🕊️",
      bucket: "bound",
      label: "Came back to him safe",
      afterline:
        "He'd been worried something had happened to you on a mission. He was glad his fears had no teeth.",
      hint: "that safe return",
    },

  },

  // The campus moments (./shared.js) a ghost can share: walking, watching,
  // staying up. Nothing that needs him to eat, touch, or be seen.
  shared: [
    "walked_back",
    "movie_night",
    "campus_bench",
    "storm_watch",
    "courtyard_stars",
    "stayed_up",
    "galaxy_express",
    "lamplit_steps",
    "watched_sunrise",
    "left_note",
    "first_snow",
    "lazy_day",
    "watched_sunset",
  ],
};
