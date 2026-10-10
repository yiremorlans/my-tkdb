// Jin is a student, but he spends his days locked in the Frostheim captain's
// room, so most of campus life (classes, the library, festival stalls, walks
// across the courtyard) never happens with him. The encounter has already put
// him out in public, so these moments take him back to his room with the
// caller in tow, most of them built on his canon orders and invitations. They
// carry every tier, since the campus set he keeps is thin; at Devoted, the
// helicopter and the jacket stand in for a drive and a scarf.
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
        'You carried his dinner up to his room. "I\'ll eat it later if I feel like it."',
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
      label: "Went over his menu with him",
      afterline:
        "He wasn't in the mood for meat. You went over the menu with him until something suited him, then took it down to the chef.",
      hint: "that menu you went over",
    },
    jin_mail: {
      minTier: "known",
      emoji: "📬",
      bucket: "new",
      label: "Sorted through his mail",
      afterline:
        "He handed you a stack of his mail and tasked you with sorting through it.",
      hint: "that mail you sorted",
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
      label: "Went over coursework with him",
      afterline:
        "You didn't know something he thought was obvious. He complained about what they teach at Darkwick, then went over it with you himself.",
      hint: "that lesson Darkwick didn't teach",
    },
    jin_schedule: {
      minTier: "warm",
      emoji: "📅",
      bucket: "warm",
      label: "Rearranged your schedule with him",
      afterline:
        "You mentioned plans. He told you to rearrange your schedule around him, and sat you down to do it then and there.",
      hint: "that schedule you rearranged",
    },

    // --- Close Friend and up ---
    jin_infirmary: {
      minTier: "spark",
      emoji: "🩺",
      bucket: "spark",
      label: "Rested up in his room",
      afterline:
        "He said you looked worn out and told you to take better care of yourself. Then he had you rest in his room until he was satisfied.",
      hint: "that rest you were ordered to take",
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

    jin_get_ready: {
      minTier: "spark",
      emoji: "👔",
      bucket: "spark",
      label: "Helped him get ready",
      afterline:
        "He told you to quit dawdling and help him get ready, then found something to redo at every step.",
      hint: "all that getting ready",
    },

    // --- Confidant and up ---
    jin_massage: {
      minTier: "close",
      emoji: "💆",
      bucket: "close",
      label: "Gave him a massage",
      afterline:
        "He'd been too active yesterday and wanted a massage. He told you to put some muscle into it.",
      hint: "that massage you gave",
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
      label: "Shared his imported chocolates",
      afterline:
        "He was in a good mood and opened a box of imported chocolates. He let you pick first, before he could change his mind.",
      hint: "those imported chocolates",
    },

    // --- Devoted and up ---
    jin_forever: {
      minTier: "bound",
      emoji: "❄️",
      bucket: "bound",
      label: "Got a rare admission out of him",
      afterline:
        "He said he didn't take you being there for granted, and that he knew it wouldn't last forever. That was all he'd say.",
      hint: "that talk about forever",
    },
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
      label: "Wore the jacket he lent you",
      afterline:
        "It was late and cold. He put his jacket over your shoulders, and you stayed a while longer.",
      hint: "that jacket over your shoulders",
    },
    jin_duet: {
      minTier: "bound",
      emoji: "🎼",
      bucket: "bound",
      label: "Played a duet with him",
      afterline:
        "It was quiet. He had you sit next to him for a duet, and you knew the song.",
      hint: "that piano duet",
    },
    jin_retrain: {
      minTier: "bound",
      emoji: "🔙",
      bucket: "bound",
      label: "Got retrained at his back",
      afterline:
        "You'd been away a while. He said you had guts abandoning your place at his back, and that he'd have to retrain you. He took his time about it.",
      hint: "that retraining you had coming",
    },
  },

  // The campus moments (./shared.js) that can happen in or from his room, or
  // anywhere at all.
  shared: [
    "signed_report",
    "borrowed_book",
    "movie_night",
    "storm_watch",
    "stayed_up",
    "midnight_snack",
    "made_playlist",
    "people_talking",
    "left_note",
    "first_snow",
    "lazy_day",

  ],
};
