// Edward is the Obscuary captain in name only: he's "more or less confined to
// this house most days", sleeps through the day, can't manage the sun without
// his parasol, and leaves every duty to Rui. He doesn't go to class, so the
// campus set mostly passes him by. His moments come from the life he actually
// has: letters he can't read, YouTube, a lost sock, the hill Towa chases him
// off, the devil's hour when his vitality returns. No sunrise, and nothing that
// needs good eyesight. See ./index.js for the contract and entry shape.
export default {
  milestones: {
    // --- Stranger and up ---
    edward_letters: {
      minTier: "new",
      emoji: "✉️",
      bucket: "new",
      label: "Read his letters out to him",
      afterline:
        "He had letters and couldn't make out a word of them. You read every one aloud.",
      hint: "those letters you read aloud",
    },
    edward_parasol: {
      minTier: "new",
      emoji: "🌂",
      bucket: "new",
      label: "Held his parasol for him",
      afterline:
        "The sun was out. You held his parasol over him all the way back to Obscuary.",
      hint: "that parasol you held",
    },

    // --- Acquaintance and up ---
    edward_sock: {
      minTier: "known",
      emoji: "🧦",
      bucket: "new",
      label: "Hunted down his other sock",
      afterline:
        "He'd lost a sock again. You hunted for it together and found it before Rui did.",
      hint: "that missing sock",
    },
    edward_video: {
      minTier: "known",
      emoji: "📺",
      bucket: "new",
      label: "Watched one of his YouTube videos",
      afterline:
        "He had a video about a shady cabal of elites he wanted you to see. He paused it twice to make sure you were following.",
      hint: "that video about the elites",
    },
    edward_lunch: {
      minTier: "known",
      emoji: "🍽️",
      bucket: "new",
      label: "Brought his lunch in Rui's place",
      afterline:
        "He called for Rui about his lunch. You brought it instead and he didn't seem to mind the swap.",
      hint: "that lunch you brought",
    },
    edward_tavern_night: {
      minTier: "known",
      emoji: "🍷",
      bucket: "new",
      label: "Kept him company while Rui worked",
      afterline:
        "Rui had his tavern work tonight and had left him everything he needed. You stayed anyway.",
      hint: "that night Rui was at the tavern",
    },

    // --- Friend and up ---
    edward_hill: {
      minTier: "warm",
      emoji: "🔭",
      bucket: "warm",
      label: "Went stargazing on the hill",
      afterline:
        "He wanted to go stargazing. Towa wasn't on the hill tonight, so you stayed as long as he liked.",
      hint: "that night on the hill",
    },
    edward_advice: {
      minTier: "warm",
      emoji: "💘",
      bucket: "warm",
      label: "Talked love lives with him",
      afterline:
        "He wanted to know whether it was Rui or Lyca. He didn't believe either answer.",
      hint: "that talk about Rui and Lyca",
    },
    edward_dispute: {
      minTier: "warm",
      emoji: "⚖️",
      bucket: "warm",
      label: "Talked over a petty dispute with him",
      afterline:
        "You'd gotten caught up in another petty human dispute. He said humans were absurd, then called you over to sit with him.",
      hint: "that talk about absurd humans",
    },
    edward_video_stopped: {
      minTier: "warm",
      emoji: "▶️",
      bucket: "warm",
      label: "Got his video playing again",
      afterline:
        "His YouTube video had stopped playing and Rui was nowhere to be found. You got it going again, and he asked you to stay for the rest.",
      hint: "that video you got playing again",
    },
    edward_ache: {
      minTier: "warm",
      emoji: "🩹",
      bucket: "warm",
      label: "Sat with him through an ache",
      afterline:
        "He had an ache where Rui had touched him earlier. You sat with him while he rested it.",
      hint: "sitting out that ache together",
    },

    // --- Close Friend and up ---
    edward_blunder: {
      minTier: "spark",
      emoji: "🔰",
      bucket: "spark",
      label: "Helped him fix a careless blunder",
      afterline:
        "Rui's been teaching him how the human world works, but he'd made another careless blunder. You helped him set it right.",
      hint: "fixing that blunder together",
    },
    edward_welcome_back: {
      minTier: "spark",
      emoji: "🫖",
      bucket: "spark",
      label: "Caught up with him after time away",
      afterline:
        "You'd been away a while. He called you over and said he'd been looking forward to your return, so you sat with him and caught up.",
      hint: "that welcome back",
    },

    edward_bed: {
      minTier: "spark",
      emoji: "🛏️",
      bucket: "spark",
      label: "Got him to bed on a bad day",
      afterline:
        "He was feeling worse than usual, and asked if you could carry him to bed. You got him there.",
      hint: "that carry to bed",
    },

    // --- Confidant and up ---
    edward_devils_hour: {
      minTier: "close",
      emoji: "🕛",
      bucket: "close",
      label: "Stayed up until the devil's hour",
      afterline:
        "You stayed until the devil's hour. He was livelier than he'd been all day.",
      hint: "staying up to the devil's hour",
    },

    edward_gift: {
      minTier: "close",
      emoji: "🎁",
      bucket: "close",
      label: "Got offered the gift again",
      afterline:
        "He brought up the gift again, as if it were a small thing to give. He didn't press when you let it go.",
      hint: "that gift you turned down",
    },

    // --- Devoted and up ---
    edward_peckish: {
      minTier: "bound",
      emoji: "🍒",
      bucket: "bound",
      label: "Heard he was feeling a little peckish",
      afterline:
        "He pulled you in close and said he was feeling a little peckish. He didn't look toward the kitchen once.",
      hint: "that little request",
    },
    edward_lap: {
      minTier: "bound",
      emoji: "💤",
      bucket: "bound",
      label: "Let him rest his head on your lap",
      afterline:
        "He'd slept even worse than usual. He said the cleaning could wait, and rested his head on your lap.",
      hint: "that rest on your lap",
    },
    edward_memories: {
      minTier: "bound",
      emoji: "🕯️",
      bucket: "bound",
      label: "Reminded him of old memories",
      afterline:
        "He said being with you brought up old, old memories. You remind him a little of her.",
      hint: "hearing who you're a reminder of",
    },
  },

  // The campus moments (./shared.js) that happen after dark or indoors, and
  // don't assume class, daylight or reading.
  shared: [
    "signed_report",
    "movie_night",
    "storm_watch",
    "stayed_up",
    "lamplit_steps",
    "made_playlist",
    "left_note",
    "first_snow",
    "their_scarf",
    "lazy_day",
    "got_flowers",
    "people_talking",
    "long_goodbye",

    "inside_joke",
  ],
};
