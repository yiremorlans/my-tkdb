// Mortkranken doubles as a medical facility, and both Yuri and Jiro spend their
// days and nights in it: check-ups, experiments, rounds, house calls, the lab
// after hours. This set is theirs together, so every moment has to fit either
// of them. Never name Yuri or Jiro in an entry, and keep to what both do in
// canon (both run check-ups, both keep lab hours, both attend every class).
// The set runs clinical to personal: early tiers are the clinic, and from
// Friend on the clinic is only where it happens, and by Close Friend the
// moments are personal.
// Nothing leans on Jiro's own treatment, so each line reads right from either
// side. See ./index.js for the contract and entry shape.
export default {
  milestones: {
    // --- Stranger ---
    // The clinic.
    mortkranken_checkup: {
      tier: "new",
      emoji: "🩺",
      bucket: "new",
      label: "Sat through a check-up",
      afterline:
        "He took your pulse, made his notes, and booked your next appointment before you could leave.",
      hint: "that check-up you sat through",
    },
    mortkranken_experiment: {
      tier: "new",
      emoji: "🧪",
      bucket: "new",
      label: "Waited out an experiment",
      afterline:
        "He was in the middle of an experiment and told you to wait until he was finished. You waited.",
      hint: "that experiment you waited out",
    },

    // --- Acquaintance ---
    mortkranken_prescription: {
      tier: "known",
      emoji: "💊",
      bucket: "new",
      label: "Got a prescription",
      afterline:
        "You came in with a cold. He diagnosed it in under a minute and wrote out the dosage twice so you couldn't get it wrong.",
      hint: "that prescription for your cold",
    },
    mortkranken_full_checkup: {
      tier: "known",
      emoji: "📋",
      bucket: "new",
      label: "Kept a follow-up appointment",
      afterline:
        "You came back on the date he'd booked. He went over everything again, start to finish, and wrote it all down.",
      hint: "that follow-up appointment",
    },
    mortkranken_assistant: {
      tier: "known",
      emoji: "🥼",
      bucket: "new",
      label: "Assisted in the lab for a day",
      afterline:
        "He was short a pair of hands, so you stood in for the day. He kept you busy.",
      hint: "that day you spent assisting in the lab",
    },

    // --- Friend ---
    // Still the clinic, but the work stops being the only reason.
    mortkranken_house_call: {
      tier: "warm",
      emoji: "🧳",
      bucket: "warm",
      label: "Went along on a house call",
      afterline:
        "He had a patient to see outside Mortkranken. You went along.",
      hint: "that house call together",
    },
    mortkranken_lab_night: {
      tier: "warm",
      emoji: "🌙",
      bucket: "warm",
      label: "Talked all night in the lab",
      afterline:
        "Somewhere past midnight he stopped working and just talked to you. None of it was about medicine.",
      hint: "that night talking in the lab",
    },
    mortkranken_walk_home: {
      tier: "warm",
      emoji: "🏮",
      bucket: "warm",
      label: "Got walked home",
      afterline:
        "It was late. He could have sent someone to see you home, and went himself instead.",
      hint: "that late walk home",
    },
    mortkranken_rounds: {
      tier: "warm",
      emoji: "🔦",
      bucket: "warm",
      label: "Walked his night rounds",
      afterline:
        "He had rounds to finish before he could stop for the night. You walked them with him, room to room.",
      hint: "those night rounds together",
    },

    // --- Close Friend ---
    // Personal. These feed the Confidant bond scene's {lastMoment}, so they
    // have to carry its "more of today on {lastMoment} than on your file".
    mortkranken_coat: {
      tier: "spark",
      emoji: "🧥",
      bucket: "spark",
      label: "Watched over him while he slept",
      afterline:
        "He fell asleep at the desk for once. You put your coat over him and stayed until he woke.",
      hint: "that coat you left over the desk",
    },
    mortkranken_pulse: {
      tier: "spark",
      emoji: "🫀",
      bucket: "spark",
      label: "Got your pulse taken, slowly",
      afterline:
        "He took your pulse like always, then didn't let go of your wrist for a while after.",
      hint: "that pulse check that ran long",
    },
    mortkranken_rice_ball: {
      tier: "spark",
      emoji: "🍙",
      bucket: "spark",
      label: "Shared a rice ball with him",
      afterline:
        "He'd skipped meals again. You brought a rice ball, and he ate more of it than he meant to because you were eating too.",
      hint: "that rice ball you shared",
    },
    mortkranken_scrape: {
      tier: "spark",
      emoji: "🩹",
      bucket: "spark",
      label: "Got patched up, carefully",
      afterline:
        "He spotted the scrape before you did and patched it up himself, far more carefully than it needed.",
      hint: "patching up that scrape",
    },

    // --- Confidant ---
    mortkranken_no_notes: {
      tier: "close",
      emoji: "🕯️",
      bucket: "close",
      label: "Spent an evening off the clock",
      afterline:
        "No check-up, no notes, no reason. He just wanted you there, and said so.",
      hint: "that evening off the clock",
    },
    mortkranken_goodnight: {
      tier: "close",
      emoji: "🌜",
      bucket: "close",
      label: "Got a proper goodnight",
      afterline:
        "He said he'd see you tomorrow, and very nearly smiled when he said it.",
      hint: "that proper goodnight",
    },
    mortkranken_appointment: {
      tier: "close",
      emoji: "🗓️",
      bucket: "close",
      label: "Got an appointment for nothing",
      afterline:
        "He booked your next appointment. When you asked what it was for, there was nothing left to check.",
      hint: "that appointment with nothing to check",
    },

    // --- Devoted ---
    mortkranken_after_hours: {
      tier: "bound",
      emoji: "🌒",
      bucket: "bound",
      label: "Stayed after the last patient",
      afterline:
        "The last patient left and he locked up. Then he asked you to stay the night, and didn't call it anything clinical.",
      hint: "that night after the last patient",
    },
    mortkranken_hand: {
      tier: "bound",
      emoji: "🫶",
      bucket: "bound",
      label: "Held hands in the lab",
      afterline:
        "It was just the two of you in the lab. He took your hand and kept hold of it, working one-handed rather than let go.",
      hint: "holding hands in the lab",
    },
  },

  // The campus moments (./shared.js) that sit alongside the clinic, picked so
  // each tier, new through bound, holds 3/4/5/6/7/8 entries in all. They both attend every class;
  // nothing that hangs on a meal or a stall.
  shared: [
    "signed_report",
    "library_study",
    "shared_umbrella",
    "storm_watch",
    "inside_joke",
    "stayed_up",
    "people_talking",
    "stolen_glances",
    "long_goodbye",
    "watched_sunrise",
    "left_note",
    "first_snow",
    "lazy_day",
    "shared_book",
    "got_flowers",
  ],
};
