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
      label: "Found his other sock",
      afterline: "He'd lost a sock again. You found it before Rui did.",
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
      emoji: "🥪",
      bucket: "new",
      label: "Brought his lunch instead of Rui",
      afterline:
        "He called for Rui about his lunch. You brought it instead, and he didn't seem to mind the swap.",
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
      label: "Got his love advice, unasked",
      afterline:
        "He wanted to know whether it was Rui or Lyca. He didn't believe either answer.",
      hint: "that talk about Rui and Lyca",
    },
    edward_dispute: {
      minTier: "warm",
      emoji: "⚖️",
      bucket: "warm",
      label: "Told him about a petty dispute",
      afterline:
        "You'd gotten caught up in another petty human dispute. He said humans were absurd, then called you over to sit with him.",
      hint: "that petty dispute",
    },
    edward_ache: {
      minTier: "warm",
      emoji: "🩹",
      bucket: "warm",
      label: "Sat with him through an ache",
      afterline:
        "He had an ache where Rui had touched him earlier. You sat with him while he rested it.",
      hint: "that ache",
    },

    // --- Close Friend and up ---
    edward_bed: {
      minTier: "spark",
      emoji: "🛏️",
      bucket: "spark",
      label: "Got him back to bed",
      afterline:
        "He said he felt worse than usual. You got him back to his room, and he recovered the moment he was lying down.",
      hint: "that trip back to bed",
    },
    edward_welcome_back: {
      minTier: "spark",
      emoji: "🫖",
      bucket: "spark",
      label: "Came back to a warm welcome",
      afterline:
        "You'd been away a while. He told you to come over, since he'd been looking forward to your return.",
      hint: "that welcome back",
    },

    // --- Confidant and up ---
    edward_devils_hour: {
      minTier: "close",
      emoji: "🕛",
      bucket: "close",
      label: "Stayed up until the devil's hour",
      afterline:
        "You stayed until the devil's hour. He was livelier than he'd been all day.",
      hint: "the devil's hour",
    },
    edward_lap: {
      minTier: "close",
      emoji: "💤",
      bucket: "close",
      label: "Let him nap in your lap",
      afterline:
        "He asked to rest his head in your lap. He was asleep before you'd answered.",
      hint: "that nap in your lap",
    },
    edward_midnight_visit: {
      minTier: "close",
      emoji: "🌑",
      bucket: "close",
      label: "Visited his room in the middle of the night",
      afterline:
        "You came to his room in the middle of the night. He asked what you were hoping for, and waited for you to say it.",
      hint: "that midnight visit",
    },

    // --- Devoted and up ---
    edward_old_days: {
      minTier: "bound",
      emoji: "🕯️",
      bucket: "bound",
      label: "Heard about his years in Eastern Europe",
      afterline:
        "He told you a little about his years in Eastern Europe, and more than he meant to.",
      hint: "those stories about Eastern Europe",
    },
    edward_arms: {
      minTier: "bound",
      emoji: "🌙",
      bucket: "bound",
      label: "Fell asleep in his arms",
      afterline: "You couldn't sleep, so he held you until you did.",
      hint: "that night you fell asleep",
    },
  },

  // The campus moments (./shared.js) that happen after dark or indoors, and
  // don't assume class, daylight or reading.
  shared: [
    "signed_report",
    "walked_back",
    "skipped_briefing",
    "movie_night",
    "storm_watch",
    "courtyard_stars",
    "stayed_up",
    "lamplit_steps",
    "late_call",
    "made_playlist",
    "left_note",
    "first_snow",
    "their_scarf",
    "lazy_day",
    "got_flowers",
    "watched_sunset",
  ],
};
