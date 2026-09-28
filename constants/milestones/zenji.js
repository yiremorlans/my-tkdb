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
      label: "Played along with his celebrity act",
      afterline:
        "He played the celebrity and told you he was fresh out of autographs. You played the fan, and he looked pleased with himself.",
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
      label: "Went through his fan mail with him",
      afterline:
        "He was sure he'd gotten fan mail. You went through the pile together, and he took the news that none of it was his rather well.",
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
      afterline: "Haku was busy, so you filmed his folktale video instead.",
      hint: "that folktale video you filmed",
    },
    zenji_romanticism: {
      minTier: "warm",
      emoji: "📖",
      bucket: "warm",
      label: "Sat through his romanticism lecture",
      afterline:
        "You asked what one of his lines meant. He gave you a whole lecture on romanticism instead.",
      hint: "that lecture on romanticism",
    },
    zenji_siblings: {
      minTier: "warm",
      emoji: "👪",
      bucket: "warm",
      label: "Took a quiet walk with him",
      afterline:
        "You took a walk with him. He asked if you had any siblings, then said he didn't mean anything by it.",
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
      label: "Watched the moon with him",
      afterline:
        "You watched the moon with him. He said it was beautiful, and didn't explain what he meant.",
      hint: "that moon",
    },

    // --- Confidant and up ---
    zenji_feast: {
      minTier: "close",
      emoji: "🍡",
      bucket: "close",
      label: "Shared a meal, his way",
      afterline:
        "He wouldn't eat, being on a diet. He watched you finish yours like it was a feast.",
      hint: "that feast for one",
    },
    zenji_mortkranken: {
      minTier: "close",
      emoji: "🏥",
      bucket: "close",
      label: "Walked partway to Mortkranken with him",
      afterline:
        "He walked you partway to Mortkranken, asked if you were hurt, and hoped you'd take care.",
      hint: "that trip to Mortkranken",
    },
    zenji_goodnight: {
      minTier: "close",
      emoji: "🌙",
      bucket: "close",
      label: "Ended an evening with his good night",
      afterline:
        "You spent the evening together. At the end he looked into your eyes and bid you good night, and called himself the luckiest fella for miles around.",
      hint: "that good night",
    },

    zenji_see_me: {
      minTier: "close",
      emoji: "👻",
      bucket: "close",
      label: "Told him you could still see him",
      afterline:
        "You'd been quiet so long that he asked if you could still see him. You could, and he was so relieved.",
      hint: "that quiet spell",
    },

    // --- Devoted and up ---
    zenji_hapless_fool: {
      minTier: "bound",
      emoji: "📜",
      bucket: "bound",
      label: "Got asked to hear his story someday",
      afterline:
        "He said he had a little story about a hapless fool of a man, and asked if you'd hear it someday.",
      hint: "that story about a hapless fool",
    },
    zenji_next_life: {
      minTier: "bound",
      emoji: "🌸",
      bucket: "bound",
      label: "Got promised the next life",
      afterline:
        "He said maybe you'd met too late. Then he promised he'd find you in the next life.",
      hint: "that promise about the next life",
    },
    zenji_poem: {
      minTier: "bound",
      emoji: "🪶",
      bucket: "bound",
      label: "Heard him read you his poem",
      afterline:
        "He wrote you a poem and read it aloud with you beside him, before you could read it yourself.",
      hint: "that poem",
    },
    zenji_note: {
      minTier: "bound",
      emoji: "📝",
      bucket: "bound",
      label: "Found a note he'd had Haku write",
      afterline:
        "There was a note waiting for you in Haku's handwriting. Every word of it was Zenji's.",
      hint: "that note in Haku's handwriting",
    },
  },

  // The campus moments (./shared.js) a ghost can share: walking, watching,
  // staying up. Nothing that needs him to eat, touch, or be seen.
  shared: [
    "walked_back",
    "movie_night",
    "campus_bench",
    "storm_watch",
    "stayed_up",
    "lamplit_steps",
    "watched_sunrise",
    "first_snow",
    "lazy_day",
    "watched_sunset",
    "inside_joke",
    "long_goodbye",
    "long_way",
    "courtyard_stars",
  ],
};
