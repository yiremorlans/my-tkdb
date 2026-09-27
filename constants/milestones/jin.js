// Jin is a student, but he spends his days locked in the Frostheim captain's
// room, so most of campus life (classes, the library, festival stalls, walks
// across the courtyard) never happens with him. The encounter has already put
// him out in public, so these moments take him back to his room with the
// caller in tow. They fill the new/known/warm tiers, where the campus set he
// keeps is thinnest, plus two Devoted swaps for the drive and the scarf.
// See ./index.js for the contract and entry shape.
export default {
  milestones: {
    // --- Stranger and up ---
    jin_tea: {
      minTier: "new",
      emoji: "🫖",
      bucket: "new",
      label: "Poured his tea",
      afterline:
        "He went back to his room and you followed. He pointed at the teapot and waited.",
      hint: "that pot of tea",
    },
    jin_dinner: {
      minTier: "new",
      emoji: "🍽️",
      bucket: "new",
      label: "Carried his dinner up to his room",
      afterline:
        "He sent you up to his room with his dinner, then ate it while you were still standing there.",
      hint: "that dinner you carried up",
    },

    // --- Acquaintance and up ---
    jin_mess: {
      minTier: "known",
      emoji: "🧹",
      bucket: "new",
      label: "Dug something out of his wrecked room",
      afterline:
        "He'd lost something in his room again. It took you an hour to find it under the mess.",
      hint: "that hour you spent digging through the mess",
    },

    // --- Friend and up ---
    jin_lunch_for_two: {
      minTier: "warm",
      emoji: "🥡",
      bucket: "warm",
      label: "Ordered lunch for two to his room",
      afterline:
        "He had you order lunch for two, and didn't say who the second one was for until it came.",
      hint: "that lunch for two",
    },
    jin_waltz: {
      minTier: "warm",
      emoji: "💃",
      bucket: "warm",
      label: "Asked him to teach you the waltz",
      afterline:
        "You asked him to teach you the waltz. He kept you at it until your feet ached.",
      hint: "that waltz lesson",
    },

    // --- Devoted and up ---
    jin_helicopter: {
      minTier: "bound",
      emoji: "🚁",
      bucket: "bound",
      label: "Rode in his helicopter",
      afterline:
        "His helicopter was waiting. He told you to stop staring and get in.",
      hint: "that helicopter ride",
    },
    jin_jacket: {
      minTier: "bound",
      emoji: "🧥",
      bucket: "bound",
      label: "Left his room in his jacket",
      afterline:
        "He put his jacket over your shoulders before you left his room. He didn't ask for it back.",
      hint: "his jacket",
    },
  },

  // The campus moments (./shared.js) that can happen in or from his room, or
  // anywhere at all.
  shared: [
    "signed_report",
    "borrowed_book",
    "skipped_briefing",
    "movie_night",
    "storm_watch",
    "stayed_up",
    "late_call",
    "made_playlist",
    "left_note",
    "first_snow",
    "lazy_day",
    "found_bookmark",
  ],
};
