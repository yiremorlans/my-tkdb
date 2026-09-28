// Jin is a student, but he spends his days locked in the Frostheim captain's
// room, so most of campus life (classes, the library, festival stalls, walks
// across the courtyard) never happens with him. The encounter has already put
// him out in public, so these moments take him back to his room with the
// caller in tow, most of them built on his canon orders and invitations. They
// carry every tier, since the campus set he keeps is thin, and include two
// Devoted swaps for the drive and the scarf.
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
        'He went back to his room and you followed. "Don\'t just stand there, servant. Pour my tea."',
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
    jin_chef: {
      minTier: "known",
      emoji: "👨‍🍳",
      bucket: "new",
      label: "Carried his message to the chef",
      afterline:
        "He sent you down to tell the chef he wasn't in the mood for meat.",
      hint: "that message for the chef",
    },
    jin_mail: {
      minTier: "known",
      emoji: "📬",
      bucket: "new",
      label: "Sorted through his mail",
      afterline:
        "He handed you a stack of his mail and tasked you with sorting through it.",
      hint: "that stack of mail",
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
    jin_documents: {
      minTier: "warm",
      emoji: "🗂️",
      bucket: "warm",
      label: "Waited with him for Tohma",
      afterline:
        "He demanded more on the mission and sent Tohma for it. He made you wait with him.",
      hint: "that wait for Tohma",
    },
    jin_lecture: {
      minTier: "warm",
      emoji: "🎓",
      bucket: "warm",
      label: "Heard him knock Darkwick classes",
      afterline:
        "You didn't know something he thought was obvious. He complained about what they teach at Darkwick.",
      hint: "that complaint about Darkwick",
    },
    jin_schedule: {
      minTier: "warm",
      emoji: "📅",
      bucket: "warm",
      label: "Rearranged your schedule for him",
      afterline:
        "You mentioned plans. He told you to rearrange your schedule around him.",
      hint: "that schedule you rearranged",
    },

    // --- Close Friend and up ---
    jin_infirmary: {
      minTier: "spark",
      emoji: "🩺",
      bucket: "spark",
      label: "Got sent to the infirmary",
      afterline:
        "He said you looked worn out, told you to take better care of yourself, and had Tohma take you to the infirmary.",
      hint: "that trip to the infirmary",
    },
    jin_wake_up: {
      minTier: "spark",
      emoji: "⏰",
      bucket: "spark",
      label: "Woke him up in the morning",
      afterline:
        "Waking him up was your idea. He expected you there again tomorrow, and made it an order.",
      hint: "those early mornings",
    },
    jin_dine: {
      minTier: "spark",
      emoji: "🍷",
      bucket: "spark",
      label: "Dined with him",
      afterline:
        "You asked to dine with him. He let you, and watched to see what you'd learned.",
      hint: "dining together",
    },

    // --- Confidant and up ---
    jin_massage: {
      minTier: "close",
      emoji: "💆",
      bucket: "close",
      label: "Gave him a massage",
      afterline:
        "He'd been too active yesterday and wanted a massage. He told you to put some muscle into it.",
      hint: "that massage",
    },
    jin_etiquette: {
      minTier: "close",
      emoji: "🍴",
      bucket: "close",
      label: "Got a lesson in dining etiquette",
      afterline:
        "You didn't know the dining etiquette. He walked you through it course by course, until you got it right.",
      hint: "that etiquette lesson",
    },
    jin_good_mood: {
      minTier: "close",
      emoji: "🍫",
      bucket: "close",
      label: "Got his imported chocolates",
      afterline:
        "He was in a good mood and handed you a box of imported chocolates. You took it before he could change his mind.",
      hint: "those chocolates",
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
      hint: "that jacket",
    },
    jin_stay: {
      minTier: "bound",
      emoji: "🛏️",
      bucket: "bound",
      label: "Stayed the night at Frostheim",
      afterline:
        "He had plans early, and your house was too far, he said. He had you stay the night.",
      hint: "that night at Frostheim",
    },
    jin_duet: {
      minTier: "bound",
      emoji: "🎼",
      bucket: "bound",
      label: "Played a duet with him",
      afterline:
        "It was quiet. He had you sit next to him for a duet, and you knew the song.",
      hint: "that duet",
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
    "midnight_snack",
    "made_playlist",
    "late_call",
    "left_note",
    "first_snow",
    "lazy_day",
    "found_bookmark",
  ],
};
