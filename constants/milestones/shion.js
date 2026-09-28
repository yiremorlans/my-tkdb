// Shion is a student on paper, but he sleeps through the morning and sends the
// caller off to "listen to that pointless nonsense" alone. He's a pariah on
// campus, so shared tables, library study and festival stalls aren't his. His
// moments are scaring people "happy", pranks on Mio, the Heebie-Jeebie House,
// tagging along uninvited, and the water he's drawn to after dark. See
// ./index.js for the contract and entry shape.
export default {
  milestones: {
    // --- Stranger and up ---
    shion_cat: {
      minTier: "new",
      emoji: "🐈",
      bucket: "new",
      label: "Watched a cat with him",
      afterline:
        "There was a cat. He watched it, so you watched it too, and nobody else came near.",
      hint: "that cat",
    },
    shion_made_happy: {
      minTier: "new",
      emoji: "😱",
      bucket: "new",
      label: 'Made someone "happy" with him',
      afterline:
        "He showed a passing student his pet while you stood with him. They ran. He said you'd made them happy.",
      hint: "that happy student",
    },
    shion_bad_mood: {
      minTier: "new",
      emoji: "⏰",
      bucket: "new",
      label: "Sat out his terrible mood with him",
      afterline:
        "Mio's noisy clock had woken him up. He told you not to talk to him, then didn't leave, so you sat there together.",
      hint: "that noisy clock",
    },

    // --- Acquaintance and up ---
    shion_tagalong: {
      minTier: "known",
      emoji: "👣",
      bucket: "new",
      label: "Got followed on your errand",
      afterline:
        "He asked where you were going, then came along without waiting for an answer.",
      hint: "that errand you didn't do alone",
    },
    shion_worms: {
      minTier: "known",
      emoji: "🪱",
      bucket: "new",
      label: "Watched Mio open his toolbox with him",
      afterline:
        "Mio's toolbox was full of worms. Shion made sure you were there when he opened it.",
      hint: "Mio's toolbox",
    },
    shion_breakfast: {
      minTier: "known",
      emoji: "🥣",
      bucket: "new",
      label: "Had a late breakfast with him",
      afterline:
        "He'd slept through breakfast and was the only one who missed it. He didn't want to eat alone, so you had a second one with him.",
      hint: "that late breakfast",
    },
    shion_test_subject: {
      minTier: "known",
      emoji: "⚙️",
      bucket: "new",
      label: "Tested Mio's new tool with him",
      afterline:
        "Mio had made him a new magic tool. He wanted you for the test subject, and he wouldn't hear of anyone else.",
      hint: "Mio's new magic tool",
    },

    // --- Friend and up ---
    shion_heebie_jeebie: {
      minTier: "warm",
      emoji: "🏚️",
      bucket: "warm",
      label: "Waited at the Heebie-Jeebie House",
      afterline:
        "He took you to the Heebie-Jeebie House to wait for someone to wander in.",
      hint: "that night at the Heebie-Jeebie House",
    },
    shion_bread: {
      minTier: "warm",
      emoji: "🥖",
      bucket: "warm",
      label: "Shared Jo's bread, barely",
      afterline:
        "He had bread Jo baked and asked if you wanted some. You got one bite before he ate the rest.",
      hint: "Jo's bread",
    },
    shion_briefcase: {
      minTier: "warm",
      emoji: "💼",
      bucket: "warm",
      label: "Returned Elias's briefcase with him",
      afterline:
        "He turned up with Elias's briefcase and wouldn't say why he had it. He asked if it made him look impressive, and you walked it back to Elias together.",
      hint: "that briefcase",
    },
    shion_crowd: {
      minTier: "warm",
      emoji: "👻",
      bucket: "warm",
      label: "Crashed a crowd with him",
      afterline:
        "A few students were laughing together in the courtyard. He said they looked like they were having fun and went to join them, with you in tow. They left soon after.",
      hint: "that crowd in the courtyard",
    },

    // --- Close Friend and up ---
    shion_docks: {
      minTier: "spark",
      emoji: "🌊",
      bucket: "spark",
      label: "Sat at the docks after dark",
      afterline:
        "He took you down to the docks after dark and sat right at the water's edge.",
      hint: "that night at the docks",
    },

    // --- Confidant and up ---
    shion_airless_night: {
      minTier: "close",
      emoji: "🥵",
      bucket: "close",
      label: "Kept him company past dark",
      afterline:
        "He didn't want to go back once it got dark. He said nights were hot and hard to breathe through, so you stayed out with him until he was ready.",
      hint: "that long night",
    },
    shion_tell_everything: {
      minTier: "close",
      emoji: "🔒",
      bucket: "close",
      label: "Got questioned about your day",
      afterline:
        "He wanted to know everything you'd done since he last saw you, and warned you he'd be angry if you left anything out. You went through it all.",
      hint: "that full report",
    },
    // --- Devoted and up ---
    shion_that_guy: {
      minTier: "bound",
      emoji: "👁️",
      bucket: "bound",
      label: "Got asked who you'd been talking to",
      afterline:
        "Someone had been talking to you earlier. He asked who, and said he'd remember that face.",
      hint: "the guy from earlier",
    },
    shion_family: {
      minTier: "bound",
      emoji: "🫀",
      bucket: "bound",
      label: "Spent an evening with him and Mio",
      afterline:
        "You spent the evening with him and Mio. Mio's his little brother and you're his wife, he said, so that made you family. He wasn't joking this time.",
      hint: "being called family",
    },
    shion_meat: {
      minTier: "bound",
      emoji: "🍖",
      bucket: "bound",
      label: "Ate with him, whatever it was",
      afterline:
        "He offered you a bite of his food, and laughed when you asked what it was.",
      hint: "that bite of meat",
    },
  },

  // The campus moments (./shared.js) that don't need a classroom, a crowd that
  // wants him there, or him doing anything for the caller's sake.
  shared: [
    "walked_back",
    "movie_night",
    "campus_bench",
    "storm_watch",
    "courtyard_stars",
    "stayed_up",
    "midnight_snack",
    "lamplit_steps",
    "long_way",
    "people_talking",
    "watched_sunrise",
    "left_note",
    "first_snow",
    "lazy_day",
    "watched_sunset",
    "long_goodbye",
  ],
};
