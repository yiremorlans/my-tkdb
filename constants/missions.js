// Scheduled missions — the pure half (docs/scheduled-missions.md).
// Content pools, tuning constants and everything that can be decided without
// touching Postgres or Discord. The I/O half is missions.js; the tick that
// drives it rides in encounterScheduler.js.
//
// Nothing in this file is admin-configurable. Count, spacing, window, TTLs and
// type weights are the same in every server by design — the same call
// constants/publicEncounters.js makes about encounter cadence, and for the same
// reason: an admin who could see or move the schedule would own it.

import { CHARACTERS, getCharacterById, getFullName } from "./characters.js";
import { HOUSES } from "./backgrounds.js";
import { expressionExists, pickRandom } from "./publicEncounters.js";

// --- scheduling -------------------------------------------------------------

// Requests per guild per local day, one inside each equal band of the active
// window. That spread is the point: an early-morning player and a late-night
// player each get a shot most days, while the time still moves by hours from
// one day to the next inside its band, so there is no "it's always 2pm"
// pattern to camp.
//
// Sized against roughly 20 active players: at 3/day the average player won one
// request a week, which is too scarce for a feature with four commands and a
// dossier behind it. At 6 it's one per three or four days.
//
// 7 is the ceiling this algorithm supports. Each band is WINDOW / N wide and
// has to accommodate MIN_GAP_MS, so the re-roll below starts failing into its
// fallback at 8 (2% of days), does so half the time at 9, and at 10 the last
// slot spills past midnight on every roll. Going higher means lowering
// MIN_GAP_MS, not just this number.
export const MISSIONS_PER_DAY = 6;
export const WINDOW_START_HOUR = 5; // 05:00 local
export const WINDOW_END_HOUR = 24; // midnight local
export const MIN_GAP_MS = 2 * 60 * 60 * 1000;

// "Local" is the process timezone, which app.js pins to America/Chicago (the
// same zone the `_PM` background cutoff is judged against). One zone for every
// server, deliberately.

// A slot that comes due more than this late — the host slept, the process was
// down — is marked fired without posting. Better to lose one of the day's
// requests than to post a briefing at four in the morning.
export const STALE_SLOT_MINUTES = 90;

// How long an unaccepted request stays on the board before it is withdrawn.
export const POST_TTL_HOURS = 2;

// How long an accepted mission has to be finished before it lapses and frees
// the accepter's slot. Passed into claim_mission rather than hard-coded in the
// SQL, so this constant stays the single source of truth.
export const ACCEPT_WINDOW_HOURS = 48;

// How many withdrawn/lapsed post edits sweepExpiredMissions fires at once. A
// long outage can expire missions across many guilds on the same tick, and
// each edit is its own PATCH to Discord — bounding this keeps a mass-expiry
// tick from bursting past Discord's rate limit and stranding posts, without
// giving up the concurrency a small sweep gets from running them together.
export const SWEEP_EDIT_CONCURRENCY = 8;

// How many requests one player may ACCEPT in a local day, however many they
// finish. Six a day does nothing for distribution on its own — the board is
// first-click-wins, so a bigger schedule mostly hands more of it to the same
// always-online players, and "one held at a time" barely slows them down when a
// riddle can be solved inside a minute.
//
// Counted on accepts rather than completions on purpose: accepting is the act
// that denies everyone else, so taking two and letting both lapse spends your
// day either way. At 6/day this guarantees at least three different winners.
export const DAILY_LEAD_CAP = 2;

// Consecutive failed mission POSTs before missions auto-disable for a guild.
// Counted separately from encounters' post_failures — see migration 016.
export const MISSION_POST_FAILURE_LIMIT = 3;

// --- type roll --------------------------------------------------------------

export const MISSION_TYPES = {
  ERRAND: "errand",
  RIDDLE: "riddle",
  COOP: "coop",
};

// Riddle and errand are the two types a player can always finish on their
// own, so they carry equal weight. Co-op is the one type that depends on
// someone else being online to call `/mission assist:true`, which made it the
// type most likely to strand a player holding a mission nobody could help
// clear — cut to a 10-floor (2026-09) rather than 0 so the co-op path still
// sees occasional live use. Riddle and errand split the other 90 evenly.
export const WEIGHT_RIDDLE = 45;
export const WEIGHT_ERRAND = 45;
export const WEIGHT_COOP = 10;

// Chance a /roam by someone holding an errand is steered to a still-unsigned
// target instead of rolling uniformly over the roster. Without this, chasing
// specific students through a 26-way random /roam inside 48h against a 3h
// cooldown is close to hopeless. It changes WHO appears, never how often the
// player may roam.
export const ERRAND_ROAM_TARGET_BIAS = 0.5;

// Most still-unsigned targets seeded into one /meet pick list (2026-10-09). A
// /meet signs at most one student, so seeding more never finishes an errand
// faster; it only crowds out the random slots. Two leaves a choice between
// targets (say, the one a /call boost is waiting on) and keeps the rest of the
// picker for everyone else.
export const ERRAND_MEET_TARGET_SLOTS = 2;

// Gap between wrong /riddle guesses, held in memory (see below). This is what
// stops someone brute-forcing 26 names; there is deliberately no attempt cap,
// because the riddle already dies with the mission.
export const RIDDLE_WRONG_COOLDOWN_SECONDS = 20;

// --- flavor -----------------------------------------------------------------

export const MISSION_TEASERS = [
  "Calling Inspector. A new mission request has come in.",
  "A special mission request just landed on the board.",
  "Report to the Chancellor's office for a new briefing.",
  "The Chancellor is asking for an inspector. Now.",
  "New assignment posted. First one to it takes it.",
  "A request has come down from the top. Who wants it?",
  "Field work available. The briefing is waiting.",
  "An anomaly report needs an inspector attached to it.",
  "There's a folder on the Chancellor's desk with the name space left blank.",
  "One mission. One inspector. Move.",
  "The board just lit up. New request, house withheld.",
  "Someone upstairs needs this handled quietly. Accept?",
];

// `who` is the accepter's plain display name (no `<@id>` tag): the post names
// them but never pings, and the mission message also sends it with
// allowed_mentions.parse === [] so a name that looks like a handle can't ping.
export const MISSION_PICKED_UP = (who) => `${who} has picked up the mission.`;

export const MISSION_WITHDRAWN_LINES = [
  "The request was withdrawn before anyone took it.",
  "Too slow. The Chancellor reassigned it internally.",
  "The folder came off the board. Maybe next time.",
  "Nobody moved on it. The mission lapsed.",
  "The briefing room went dark. Opportunity gone.",
];

// Edited onto a mission post the bot failed to update in the moment it was
// claimed (a dead interaction token, a Discord 5xx, the post gone) — the
// reconciliation backstop in missions.js reconcileMissionPosts(). Deliberately
// name-free: that sweep runs detached from the interaction that knew who
// clicked, and getting the live Accept button off an already-taken mission
// matters more than naming the winner.
export const MISSION_POST_RECONCILED_LINE =
  "This request has already been picked up.";

// Edited onto a co-op assist post whose mission lapsed with no partner.
export const ASSIST_LAPSED_LINES = [
  "Nobody came. The moment passed.",
  "The call for backup went unanswered.",
  "No partner turned up. The mission lapsed.",
];

// What a completed mission actually hands over. Deliberately explicit about
// the reward being held rather than spent: the whole reason it is banked is
// that a player finishing a mission with four minutes left on their clock used
// to get four minutes of value out of it.
export const BANKED_RESET_LINE =
  "**Cooldown reset banked.** Next time `/roam` or `/meet` tells you to wait, there'll be a button to spend it.";

export const RESET_BUTTON_LABEL = "Use a cooldown reset"; // 20 chars, well under MAX_BUTTON_LABEL_LENGTH

// The offer, appended to the "you're still on cooldown" reply. `held` is how
// many unspent resets the player has, so it can say whether spending this one
// leaves anything behind.
export function resetOfferLine(held) {
  return held === 1
    ? "\nYou have **1 cooldown reset** banked. Spend it now, or keep it for later."
    : `\nYou have **${held} cooldown resets** banked. Spend one now, or keep them for later.`;
}

/**
 * What the player is told after spending one reset.
 *
 * 'both' is a solo mission's reward, 'roam'/'meet' a co-op's, which goes on
 * the longer wait (migration 028) and so may not be the command they clicked
 * from. That case is said outright, since the prompt that follows is for the
 * other command.
 *
 * @param {string} outcome   what spend_cooldown_reset returned
 * @param {'roam'|'meet'} clicked  the command whose reply carried the button
 * @returns {string|null}    null when `outcome` isn't a spend
 */
export function resetSpentLine(outcome, clicked) {
  if (outcome === "both") {
    return "Reset spent. Both `/roam` and `/meet` are clear.";
  }
  if (outcome !== "roam" && outcome !== "meet") return null;
  if (outcome === clicked) return `Reset spent. \`/${outcome}\` is clear.`;
  return (
    `Reset spent on \`/${outcome}\`, your longer wait. ` +
    `\`/${clicked}\` is still on its own clock.`
  );
}

// The errand's one free house change (migration 025). Offered on the pickup
// briefing, /mission and /docs while it's still available: once per mission,
// and only before the first signature. Discord shows no tooltip on a disabled
// button, so the reason it went grey is a line in the message itself.
export const HOUSE_CHANGE_BUTTON_LABEL = "Request new house"; // 17 chars

export const HOUSE_CHANGE_UNAVAILABLE_LINES = {
  spent: "🔒 House change already spent on this mission.",
  signed: "🔒 House change closes once a signature is in.",
};

// Appended to an errand's instructions only while the house change is still
// available. Once a signature is in, the 🔒 "signed" line above takes its place;
// once spent, the 🔒 on the button says it and the "spent" line is only the
// reply to a stale click.
export const HOUSE_CHANGE_HINT =
  "Don't like the house? You can request a new one once, before your first signature.";

export const HOUSE_CHANGE_DONE_LINE =
  "🔄 New house assigned. Same errand, fresh signatures.";

// The Chancellor's audience: a lucky house-change click. Instead of a random
// reroll, Cornelius hears the request and the player names the house with
// `/request`. Rolled per click, so it only ever comes up on the one click the
// house change allows (a re-click while an audience is open just reopens it).
export const CHANCELLOR_AUDIENCE_CHANCE = 0.2;

// assets/expressions/cornelius: default while he's listening, close once he
// agrees.
export const CHANCELLOR_FACES = {
  listening: "default.png",
  granted: "close.png",
};

export const CHANCELLOR_AUDIENCE_LINES = [
  "The Chancellor has agreed to hear your request.",
  "The Chancellor will see you now.",
  "Your request reached the Chancellor's desk. He's willing to hear it.",
];

export const CHANCELLOR_AUDIENCE_PROMPT =
  "Name the house you want with:\n`/request`";

// {house} is the house he just granted.
export const CHANCELLOR_GRANTED_LINES = [
  "He will allow it this time. The errand goes to **{house}**.",
  "He agrees with your request. **{house}** it is.",
  "Request granted. **{house}** has your errand now.",
];

export const CHANCELLOR_REQUEST_LINES = {
  noAudience: "The Chancellor isn't hearing requests from you right now.",
  sameHouse: "Your errand is already in {house}. Name a different house.",
  filed: "📜 Request filed.",
};

export const RIDDLE_WRONG_LINES = [
  "That's not who's behind this. Look again.",
  "Wrong read on the evidence.",
  "The pieces don't point there.",
  "Not them. The anomaly persists.",
];

// --- portraits: accusation, culprit reveal, debrief -------------------------

// Faces in assets/expressions/<id>/ (docs/scheduled-missions.md §20, §21).
// An accusation shows the accused annoyed. Anyone with no annoyed drawing
// (Alan, Edward, Haku) gets serious, the same stand-in the call scenes use;
// read off the art itself so there's no list of them to keep in step.
export function accusedFace(characterId) {
  return expressionExists(characterId, "annoyed.png")
    ? "annoyed.png"
    : "serious.png";
}
export const CULPRIT_FACE = "sweat.png";
export const DEBRIEF_FACE = "smile.png";

// Shared by the culprit reveal and the debrief, word for word, so both
// missions teach the same thing. It says a boost is *waiting*, never that one
// was just added: the reply is fixed before the grant resolves, and at the cap
// of 1 the grant adds nothing. First name only, so no pronoun for the
// character.
export const MISSION_BOOST_LINE = (firstName) =>
  `A pending boost with ${firstName} is waiting on your next \`/roam\` or \`/meet\`.`;

export const DEBRIEF_BUTTON_LABEL = "Debrief";
// For a completion post whose lead's name couldn't be read off the call.
export const DEBRIEF_ROLE_FALLBACK_NAMES = { lead: "Lead", helper: "Backup" };

export const DEBRIEF_REFUSAL_LINES = {
  notYours: "This debrief isn't yours.",
  claimed: "You've already been debriefed on that one.",
  closed: "That mission's already closed.",
};

// /mission's reminder: the newest unclaimed debrief, plus how many more.
export function debriefReminderLine(house, more = 0) {
  return `🗂️ A debrief from your ${house} co-op is waiting.${more > 0 ? ` (+${more} more)` : ""}`;
}

// Thresholds are mission_log POINT totals, not mission counts — an errand can
// be worth up to 4, so counting missions would rank a lucky errand run the
// same as four riddles.
//
// Paced against RELATIONSHIP_LEVELS (constants/game.js), not chosen bare: an
// average player earns ~0.36 house logs/day (docs/scheduled-missions.md's own
// "one lead every 3-4 days" at the current type weights, leads only).
//
// Doubled 2026-09 to match RELATIONSHIP_LEVELS' own raise (constants/game.js
// — Friend and up went x1.5 there after /roam + /meet's independent 3h
// cooldowns let a maxed player outpace the "many, many encounters" arc). The
// 0 floor stays at 0, same as Acquaintance staying at 20 there. At the same
// ~0.36 logs/day these now clear in ~83 / ~222 / ~500 / ~889 days.
export const INSPECTOR_RANKS = [
  { min: 0, name: "Novice Inspector" },
  { min: 30, name: "Field Inspector" },
  { min: 80, name: "Senior Inspector" },
  { min: 180, name: "Special Inspector" },
  { min: 320, name: "Chancellor's Right Hand" },
];

export const MISSION_TYPE_LABEL = {
  [MISSION_TYPES.ERRAND]: "errand",
  [MISSION_TYPES.RIDDLE]: "riddle",
  [MISSION_TYPES.COOP]: "co-op",
};

// "How you finish this type", in one clause. Shared between /mission's
// instruction block and the Accept button's "you already hold one" reply, so a
// user who clicks Accept while busy is pointed at exactly the command /mission
// would have told them to run.
export const MISSION_NEXT_STEP = {
  [MISSION_TYPES.ERRAND]: "collect its signatures and file it with `/docs`",
  [MISSION_TYPES.RIDDLE]: "solve it with `/riddle`",
  [MISSION_TYPES.COOP]: "call a partner with `/mission assist:true`",
};

// The catch-all for a failed lookup or write on a mission click or command.
export const MISSION_ERROR_LINE = "Something went wrong there. Try again?";

export const CAPPED_LINE = `You've already taken your ${DAILY_LEAD_CAP} missions for today. Anything you're still holding can be finished as normal, and the board is yours again tomorrow.`;

export function busyLine(type) {
  return `You already have a mission in progress. ${
    MISSION_NEXT_STEP[type]
      ? `Go ${MISSION_NEXT_STEP[type]} first.`
      : "Wrap it up with `/docs`, `/riddle`, or `/mission assist:true` first."
  }`;
}

// The always-present "how this type works" block in /mission (§8). Written as
// instructions rather than hints: the accepter is the only person who ever sees
// this, and a mission they can't work out how to finish is just a dead slot.
export const MISSION_INSTRUCTIONS = {
  [MISSION_TYPES.ERRAND]:
    "Targets are boosted during `/meet` and `/roam` while mission is active. Meet them, then check the sheet and file it with `/docs`. One house log per signature, plus a banked cooldown reset that clears both.",
  [MISSION_TYPES.RIDDLE]:
    "Answer with `/riddle <your answer>`. Solve it for one house log, plus a banked cooldown reset: spend it the next time `/roam` or `/meet` tells you to wait, and it clears both.",
  [MISSION_TYPES.COOP]:
    "Call a partner with `/mission assist:true`. The first inspector to back you up completes it for both of you. One house log each, plus a banked cooldown reset that clears whichever of `/roam` or `/meet` has the longer wait.",
};

// An errand's instruction block once every target has signed: the targets are
// done with, so it's only the filing left.
export const ERRAND_SIGNED_INSTRUCTIONS =
  "Open `/docs` and click Complete mission. One house log per signature, plus a banked cooldown reset that clears both.";

// --- riddles ----------------------------------------------------------------

// One pool per house; `answer` is a character id belonging to that house, so a
// riddle can never be unanswerable by its own mission. The mission stores which
// riddle it drew (`riddle_id`), so two players holding riddles for the same
// house are not necessarily facing the same one.
//
// Exactly two per student, so knowing one report for a house never gives the
// answer to the next one drawn there. The pair is deliberately two different
// sides of the same person rather than one observation told twice; the test
// suite holds the count at two.
//
// Every prompt is an anomaly report written the way the Chancellor's office
// would file one: describe what was observed, name nobody. The observation is
// always something the character's own script supports (see
// constants/dialogue/reference.md and each character's `keywords`).
//
// v1 is "name the student", matched with matchCharacterGuess — the same matcher
// /call uses, so aliases and first names work.
//
// `winningLine` is the culprit's line in the culprit reveal (§20.5): caught out
// over this report, then a reason to see her again (buying her silence, credit
// for catching them, or an invitation), never an apology: she wasn't wronged. The
// same at every tier. It must never give away the student's other riddle. Towa's are wordless.
export const RIDDLES = {
  [HOUSES.FROSTHEIM]: [
    {
      id: "frostheim_crown",
      answer: "jin",
      prompt:
        "A first-year reports being ordered to kneel, then handed a coat worth more than his tuition and told to take it for dry cleaning. Name the student.",
      winningLine:
        "Tch. The kid was standing right there, and the coat needed cleaning. ...Fine. Come by my room later. I'll have the good tea brought up.",
    },
    {
      id: "frostheim_helicopter",
      answer: "jin",
      prompt:
        "A private helicopter set down on the north lawn without filing anything at all. The staff who came to object were informed that the matter was closed and that it had not been a request. Name the student.",
      winningLine:
        "My helicopter, my lawn. What was there to file? ...Whatever. You want a ride or not? I'm not asking twice.",
    },
    {
      id: "frostheim_tea",
      answer: "tohma",
      prompt:
        "Every complaint filed against Frostheim this month was withdrawn within the hour. Each writer describes a very polite conversation over tea that they insist never happened. Name the student.",
      winningLine:
        "Honestly. I merely lent each of them a sympathetic ear. ...Do let me pour you a cup as well. I assure you, it's only tea.",
    },
    {
      id: "frostheim_schedule",
      answer: "tohma",
      prompt:
        "The captain's coat was hung, his tea was poured, and his schedule was amended for an incident nobody has reported yet. Whoever did it was gone before anyone thought to ask how he knew. Name the student.",
      winningLine:
        "Well. I simply happened to overhear about it ahead of time, that's all. ...Allow me to amend your schedule next. You look as though you could use an afternoon off.",
    },
    {
      id: "frostheim_dawn",
      answer: "lucas",
      prompt:
        "The training hall lights burn until dawn. The note left on the desk asks that they stay on, in careful English handwriting. Name the student.",
      winningLine:
        "Ah. My handwriting gave me away, didn't it? Well spotted. Come and train with me one morning, and breakfast is on me.",
    },
    {
      id: "frostheim_intervene",
      answer: "lucas",
      prompt:
        "Three reports this month describe the same student stepping in for students being bullied on campus. Name the student.",
      winningLine:
        "Guilty as charged, I'm afraid. I won't apologise for stepping in, though. If anyone ever gives you trouble, you know where to find me.",
    },
    {
      id: "frostheim_feed",
      answer: "kaito",
      prompt:
        "An anomaly was posted to WickChat before it was ever reported to this office. The post came down, was apologized for four separate times, and went back up with a filter on it. Name the student.",
      winningLine:
        "Okay, okay, I posted it first! The filter was supposed to fix it... Keep this between us? Let me take you to lunch. My treat, I swear!",
    },
    {
      id: "frostheim_debt",
      answer: "kaito",
      prompt:
        "The casino has filed a complaint over three unpaid fines against the same second-year, who promised to settle each of them next week and has not been seen near the floor since. Name the student.",
      winningLine:
        "Next week means next week! ...Please don't tell Romeo you found me. I'll grab you one of the new snack flavors from the campus store, okay?",
    },
  ],

  [HOUSES.VAGASTROM]: [
    {
      id: "vagastrom_garage",
      answer: "alan",
      prompt:
        "Someone in the garage has been repairing the bikes overnight and leaving them better than new. Nobody has heard it say a word about it. Name the student.",
      winningLine:
        "...Wasn't hiding it. Just didn't need saying. Got something that needs fixing? Bring it by the garage.",
    },
    {
      id: "vagastrom_gate",
      answer: "alan",
      prompt:
        "A brawl at the gate ended when one student stepped between the two sides and did nothing at all. Both sides went home. He was found an hour later two streets away, having taken a wrong turn. Name the student.",
      winningLine:
        "...I was heading back. The streets out there all look the same. If you're going that way, I'll walk you. Might take a while.",
    },
    {
      id: "vagastrom_rumor",
      answer: "leo",
      prompt:
        "The rumor reached every phone on campus before it reached the person it was about, cropped and timestamped for maximum reach. Name the student.",
      winningLine:
        "Ugh, you actually traced it back? The edit was flawless, for the record. ...Huh. Not bad, Honor Roll. Come find me later, I've got a use for you.",
    },
    {
      id: "vagastrom_ringlight",
      answer: "leo",
      prompt:
        "Campus footage of a secret incident was leaked and uploaded to WickChat before any official report, complete with subtitles and hashtags that shaped how everyone interpreted it. Name the student.",
      winningLine:
        "Subtitles are basic accessibility, you're welcome. ...You dug all that up yourself? Huh. Next time something blows up, Honor Roll, you're holding the camera.",
    },
    {
      id: "vagastrom_truck",
      answer: "shohei",
      prompt:
        "The truck by the gate served a hot meal to a student who could not pay, and swore at him the entire time for letting it go cold. Name the student.",
      winningLine:
        "Food goes cold, it's wasted. That's the only reason. ...You hungry? Come by the truck. On the house, just this once.",
    },
    {
      id: "vagastrom_bins",
      answer: "shohei",
      prompt:
        "A bike went through the east gate at an unreasonable hour, then came back so its rider could right the bins he had clipped, swearing the whole time about people who leave them there. Name the student.",
      winningLine:
        "Who leaves bins right by the gate, seriously? ...Whatever, I put them back, didn't I? Pfft, don't look so smug, Senpai. And don't you dare tell Leo.",
    },
  ],

  [HOUSES.HOTARUBI]: [
    {
      id: "hotarubi_ghost",
      answer: "zenji",
      prompt:
        'Students keep reporting a ghost in the Hotarubi music room: a biwa played by nobody, footsteps close behind them, and a voice that compliments their posture and calls them "my dear". Name the student.',
      winningLine:
        "A ghost in the music room!? Horsefeathers, I practice there every night! ...You don't suppose it's been listening? Do come with me next time, my dear. I'd feel much braver with company.",
    },
    {
      id: "hotarubi_salon",
      answer: "zenji",
      prompt:
        "A run of folktale videos was uploaded from a room the register lists as empty, each one narrated in the style of a hundred years ago and closing with an invitation to write in with your romantic troubles. Name the student.",
      winningLine:
        "Caught red-handed, inspired man of the quill and all! Do write in with your romantic troubles sometime, my dear. Yours I'll answer first.",
    },
    {
      id: "hotarubi_prop",
      answer: "subaru",
      prompt:
        "A borrowed prop came back with a note listing exactly what its last owner had been feeling while holding it. The writer apologized twice for knowing. Name the student.",
      winningLine:
        "Oh... You found out. I should never have written down what I read, it wasn't mine to know. Could we keep this between us? You're welcome at Hotarubi anytime.",
    },
    {
      id: "hotarubi_figurehead",
      answer: "subaru",
      prompt:
        "One signature appears on every Hotarubi form this month, including the ones that were not his to sign. In the margin of the last, the signer describes himself as just a figurehead. Name the student.",
      winningLine:
        "Ah, you found the margin note... I signed more than I should have, didn't I? Come by for tea sometime. I just got some nice sweets in.",
    },
    {
      id: "hotarubi_swept",
      answer: "haku",
      prompt:
        "Multiple Hotarubi residents report finding one student having a casual conversation in an empty hallway, gesturing to empty air as if someone were there. Name the student.",
      winningLine:
        "Ha ha, busted. The halls weren't empty, though. Walk with me sometime and I'll introduce you.",
    },
    {
      id: "hotarubi_company",
      answer: "haku",
      prompt:
        "Multiple dormitory hauntings were reported throughout the term, each accompanied by strange sounds and unexplained disturbances. In every case, the activity ceased by the next morning after a student was observed walking casually through the halls nearby. Name the student.",
      winningLine:
        "Okay, you got me. I was just passing through, I swear. ...Don't tell Subaru, he'll make a fuss. Tea's on me next time you're in Hotarubi.",
    },
  ],

  [HOUSES.DIONYSIA]: [
    {
      id: "dionysia_roster",
      answer: "jo",
      prompt:
        "Every job on the house roster was somehow already done before the roster went up, by someone who would rather do it himself than explain it twice. Name the student.",
      winningLine:
        "Caught me, cutie. Explaining it twice takes longer than just doing it. Come by the office later, I've got snacks set aside for you.",
    },
    {
      id: "dionysia_jog",
      answer: "jo",
      prompt:
        "A fresh pot of coffee is always brewing in the Dionysia main office, made to each visitor's exact preference. The student responsible for this routine is never there when anyone arrives. Name the student.",
      winningLine:
        "So you figured it out. I just like everyone starting their day comfortably. Next time, stay a while. I'll make yours personally and we can actually sit down.",
    },
    {
      id: "dionysia_lollipop",
      answer: "elias",
      prompt:
        "The corridor was swept at three in the morning by a man with a lollipop and an unhurried drawl who says he was only passing through. Name the student.",
      winningLine:
        "Oh, I was only passing through. ...Would you like a lollipop? I have a few from home.",
    },
    {
      id: "dionysia_wallet",
      answer: "elias",
      prompt:
        "A student was observed working through the dorm while several incidents occurred directly in front of him. When questioned about the commotion, he seemed genuinely confused about what everyone was referring to. Name the student.",
      winningLine:
        "Oh, was something happening? I'm afraid I didn't notice… If you have a minute, I was about to make coffee.",
    },
    {
      id: "dionysia_clocks",
      answer: "mio",
      prompt:
        "The broken campus clocks were fixed for free, overnight. Name the student.",
      winningLine:
        "Ah… you found out. The ticking was bugging me, that's all. If anything of yours needs fixing, bring it to the workshop. I'll squeeze it in.",
    },
    {
      id: "dionysia_handrails",
      answer: "mio",
      prompt:
        "Every stairwell in Dionysia has acquired a handrail nobody requisitioned and a small sign asking people to please stop running on the wet steps. Name the student.",
      winningLine:
        "Safety first. Somebody had to. ...Don't run on the wet steps, okay? And if you ever need something built, ask me. I'll find the time.",
    },
    {
      id: "dionysia_heebie",
      answer: "shion",
      prompt:
        "Residents fled the Heebie-Jeebie House over the bodies and blood inside. Staff found the wounds were prop pieces and paint, arranged to be found, and one student still there enjoying how well it had worked. Name the student.",
      winningLine:
        "Hehehe… You found me. Everyone was so happy that night. Come visit the Heebie-Jeebie House sometime. I'll make you happy too.",
    },
    {
      id: "dionysia_lullaby",
      answer: "shion",
      prompt:
        "Something keeps to the Darkwick docks after dark, at the very edge of the water, humming a lullaby and watching whoever comes to look. Get too close and it slips under without a splash and does not surface again. Name the student.",
      winningLine:
        "You came all the way out there to look? Foolish. ...Fine. I'll sing it for you sometime.",
    },
  ],

  [HOUSES.MORTKRANKEN]: [
    {
      id: "mortkranken_ward",
      answer: "yuri",
      prompt:
        "A student was walked into the Mortkranken lab and informed, 'Congratulations, you have been selected as a test subject for my revolutionary technique. Consider yourself privileged.' When they tried to leave, the researcher whose lab it was blocked the door, indignant that anyone would refuse an honor of this magnitude, and demanded to know whose time they imagined they were wasting. Name the student.",
      winningLine:
        "An honor of that magnitude, refused! ...Hmph. Then the position remains open, worm. Report to my lab and claim it before I change my mind.",
    },
    {
      id: "mortkranken_bellow",
      answer: "yuri",
      prompt:
        "Every hour or so, one name is shouted down the Mortkranken corridor loud enough to carry to the second floor, always by the same student, who never once gets up to go and find the person he is calling. Name the student.",
      winningLine:
        "Wh-What!? I was summoning my assistant, as is my right as captain! ...Ahem. Since you've come all this way, you may stay for tea. I'll have Jiro prepare it.",
    },
    {
      id: "mortkranken_chart",
      answer: "jiro",
      prompt:
        "A patient chart came back complete, correct, and entirely without comfort. Whoever filed it had already gone back to work. Name the student.",
      winningLine:
        "The chart was correct. Comfort isn't part of the format. ...I could brew you some herbal tea, I suppose. People say that's comforting.",
    },
    {
      id: "mortkranken_bedside",
      answer: "jiro",
      prompt:
        "A crying patient was given her exact odds of recovery to two decimal places. Whoever gave them then sat with her for an hour and said nothing else at all. Name the student.",
      winningLine:
        "She asked for the odds, so I gave them. Then I waited for her to leave. Rushing her seemed rude. ...You can visit too, if you like. I won't rush you either.",
    },
  ],

  [HOUSES.JABBERWOCK]: [
    {
      id: "jabberwock_tour",
      answer: "haru",
      prompt:
        "A student was seen after midnight chasing an escaped creature the length of the grounds, never panicking, just calling out that it was doing great and he would have it home soon. Name the student.",
      winningLine:
        "Gahaha! Guilty! He was doing great, honest. Tell you what, come on the tour sometime and I'll do you mates' rates!",
    },
    {
      id: "jabberwock_fenceline",
      answer: "haru",
      prompt:
        "Every night, long after the park has closed, one student walks the whole perimeter fence by torchlight, counts every animal twice, and only then goes to bed. Name the student.",
      winningLine:
        "Ah, you caught me on patrol! Can't sleep till everyone's counted, that's all. Come help me count next time! Peekaboo's coming anyway, and he likes you better than me.",
    },
    {
      id: "jabberwock_garden",
      answer: "towa",
      prompt:
        "The keepers report humming from the flower beds after hours, one old tree spoken to like a friend, and the dandelions gone by morning. Name the student.",
      winningLine:
        "~~~ ♪ *Towa pulls one last dandelion from his pocket and holds it out to you, humming.*",
    },
    {
      id: "jabberwock_bubbles",
      answer: "towa",
      prompt:
        "Bubbles were reported drifting past a third floor window at midnight, blown from the roof by a student who said he wanted to be closer to the stars. The staff who went up were cheerfully warned not to touch them. Name the student.",
      winningLine:
        "...! *Towa tilts his head and watches you a long moment, then hums a few bright notes, points up at the sky, and holds out his hand.*",
    },
    {
      id: "jabberwock_grind",
      answer: "ren",
      prompt:
        "A student sat through the entire anomaly alert without once looking up from a phone game, then filed a grievance about his wrist. Name the student.",
      winningLine:
        "That alert was mid-raid, okay? Leaving would've been a crime. ...Fine. Come by the diner on my shift, Senpai. I'll serve you myself. Just this once.",
    },
    {
      id: "jabberwock_aquatic",
      answer: "ren",
      prompt:
        "The aquatic zone went unfed for a whole day. The student rostered for it says he told someone else to cover it, cannot say who, and was on his phone in the break room the entire shift. Name the student.",
      winningLine:
        "I did tell someone. ...Okay, I meant to. And I was on break. Working through it would be forced labor. Don't tell that clown. I'll show you where I hide from him. Best spot in the park.",
    },
  ],

  [HOUSES.OBSCUARY]: [
    {
      id: "obscuary_permission",
      answer: "edward",
      prompt:
        "An Obscuary resident brought lunch up to a housemate who had not left his bed all day, and was asked, before the tray was even set down, whether he was feeling heartsore. An hour of love advice followed. Name the student.",
      winningLine:
        "Oh dear, was it so obvious? I only offered a little advice. ...Come by my room some evening and tell me about yours. I'm on my best behavior, I assure you.",
    },
    {
      id: "obscuary_parasol",
      answer: "edward",
      prompt:
        "A student was carried to his own room twice this week, having declared himself too weak to walk, and was found wide awake at three in the morning working through a playlist about the moon landing. Name the student.",
      winningLine:
        "I truly was too weak to walk, you see. The moon landing simply revived me. ...Keep me company for the next video, and we'll call it even.",
    },
    {
      id: "obscuary_cocktail",
      answer: "rui",
      prompt:
        "A witness swears he was handed a cocktail he never ordered, mixed to his mood exactly, by a bartender in gloves who had not stopped moving all night. Name the student.",
      winningLine:
        "Ahaha, guilty! Reading the room is like, half the job. Swing by the bar sometime, cutie. First drink's on me.",
    },
    {
      id: "obscuary_houseparent",
      answer: "rui",
      prompt:
        "Three housemates were fed, medicated and put to bed by someone who then did the dishes and started the laundry at four in the morning. Nobody on the corridor has ever seen him sleep. Name the student.",
      winningLine:
        "Okay, okay, you got me! Somebody's gotta keep those two alive. Come by for dinner sometime? I always make extra anyway.",
    },
    {
      id: "obscuary_scent",
      answer: "lyca",
      prompt:
        "A reported thief on campus was found by someone who never looked at the evidence at all. He smelled the room, went straight to the right door, and then went quiet about it. Name the student.",
      winningLine:
        "So what? It smelled like him, so I went there. ...You're not mad? Okay. I'll show you how I did it sometime. First thing, stop looking with your eyes so much.",
    },
    {
      id: "obscuary_blanket",
      answer: "lyca",
      prompt:
        "A large wolf figure was spotted prowling the campus after dark on the full moon. Witnesses report it moved with unusual speed, pausing to look directly at the academy buildings before disappearing into the forest. Name the student.",
      winningLine:
        "...Don't go telling everyone. I was just looking. I didn't hurt anybody. ...You can come on my walk tomorrow. Only if you want.",
    },
  ],

  [HOUSES.SINOSTRA]: [
    {
      id: "sinostra_beast",
      answer: "taiga",
      prompt:
        "An anomaly beast was reported loose near the VIP room. By the time inspectors arrived there was no beast, only a very full student laughing about it. Name the student.",
      winningLine:
        "Gyahaha! There was a beast, then there wasn't. Tasted great. You hungry? I'll save you a bite of the next one. Ciao!",
    },
    {
      id: "sinostra_wager",
      answer: "taiga",
      prompt:
        "A Sinostra dealer was asked his name three nights running by the same student, who had already been told twice. On the third night, that student put a fortune on the dealer's next hand and won all of it. Name the student.",
      winningLine:
        "So? I won, didn't I? Guy's name still isn't sticking, though. Come by my table sometime. Bet you're luckier than him. Ciao!",
    },
    {
      id: "sinostra_ledger",
      answer: "ritsu",
      prompt:
        "The incident report arrived before the incident was over, timestamped to the second and cross-referenced against three earlier filings. Name the student.",
      winningLine:
        "Timeliness is not a crime. ...Very well. In recognition of your diligence, I will waive my consultation fee for your next half hour.",
    },
    {
      id: "sinostra_objection",
      answer: "ritsu",
      prompt:
        "A first-year passes the gate at the same second every morning and has served the office a written objection, with citations, to the wording of the last three notices. Name the student.",
      winningLine:
        "The notices were imprecisely worded, and someone had to say so. ...As a gesture of good faith, I will buy you a coffee at the diner.",
    },
    {
      id: "sinostra_fee",
      answer: "romeo",
      prompt:
        "The shop owner says the protection fee was collected at volume, by someone in a very expensive coat, who assured him the whole time it was for his own good. Name the student.",
      winningLine:
        "It *was* for his own good, and for my bottom line. ...Tch. Fine, I'll take you shopping. You clearly need someone with taste.",
    },
    {
      id: "sinostra_routine",
      answer: "romeo",
      prompt:
        "The casino floor was reorganized overnight, then the staff were kept waiting forty minutes at the morning meeting while the one who called it finished his skincare routine. Name the student.",
      winningLine:
        "Forty minutes is the bare minimum for proper skincare! ...Fine. Come by my office and I'll walk you through a real routine. Your pores will thank me.",
    },
  ],
};
// --- debrief lines ----------------------------------------------------------

// A co-op debrief's line (docs/scheduled-missions.md §21.6), keyed by house
// student and drawn at random: a nod to the inspectors who just worked their
// house, the same at every tier. The boost line beside it carries the
// mechanics, so these never mention boosts, /roam or /meet. Towa's are
// wordless, at any hour.
export const DEBRIEF_LINES = {
  jin: [
    "So you're the ones Tohma had handling my house's business. Whatever. Nothing came back on me, so you can go.",
    "Heard there were inspectors downstairs. ...Next time, knock on my door first. I want to know who's in my house.",
  ],
  tohma: [
    "You two kept pace admirably today. Do stop by for tea before you leave. I believe we've all earned a cup.",
    "Splendid work. Frostheim runs far more smoothly with inspectors about, though I'd never say so to our king.",
  ],
  lucas: [
    "Brilliant work, you two. I'd gladly have you both at my side on the next one.",
    "Thank you for looking after the house today. If anything gave you trouble, tell me and I'll see to it.",
  ],
  kaito: [
    "We actually did it! ...Wait, did anyone get a picture? We totally need a picture for WickChat.",
    "You two were so cool out there! I tried to keep up. I mostly kept up!",
  ],
  alan: [
    "You two kept up. ...Good job. Either of you hurt?",
    "You pulled your weight today. Thanks. Sho made too much food, if you're hungry.",
  ],
  leo: [
    "Ugh, finally done. I got some great footage of you two, by the way. ...Fine, decent work.",
    "Cap says thanks. He won't say it himself, so I'm saying it for him. You're welcome.",
  ],
  shohei: [
    "Not bad out there, Senpai. You kept up better than Leo, anyway.",
    "Inspectors in the dorm, and nothing's on fire. Not bad. You hungry?",
  ],
  zenji: [
    "Two inspectors in Hotarubi! I watched the whole thing, my dear. Such teamwork. Positively sensational.",
    "I tagged along behind you both the whole way. Don't worry, nobody saw me. Nobody ever does.",
  ],
  subaru: [
    "Thank you both for helping Hotarubi. I'm sorry if anyone was difficult... Would you like some tea before you go?",
    "You both did so well today. I'm so relieved we got through it. Please, sit and rest a while before you go.",
  ],
  haku: [
    "Appreciate the help, you two. Made my job easy, ha ha.",
    "Nice work today. Hotarubi's a handful. You both got out without picking up anything extra, right? ...Probably.",
  ],
  jo: [
    "Thank you both for helping Dionysia today. If anything came up, bring it straight to me.",
    "You two kept the show running with us today. The whole troupe owes you a round of applause.",
  ],
  elias: [
    "Oh, good work today. I was a little late getting there… but you two had it handled.",
    "Oh, that went well. Nobody gave you any trouble out there?",
  ],
  mio: [
    "Thanks for the hand today, you two. That's one less thing on my list.",
    "Good work today. Nothing got broken, right? ...Good. I've got enough repairs waiting as it is.",
  ],
  shion: [
    "Hehehe… You two weren't bad. Next time, I'll make it more fun.",
    "I watched you two the whole time. You never looked scared once. Boring.",
  ],
  yuri: [
    "Hmph. Under my direction, the outcome was never in doubt. Adequate work, both of you. You may leave before I find a use for you.",
    "Not a single injury between you. Good. ...Though I do have a new formula ready, should either of you feel faint.",
  ],
  jiro: [
    "You two finished your work in Mortkranken. Neither of you is bleeding. Good.",
    "That took longer than it needed to. ...You both kept up, though. That's rare.",
  ],
  haru: [
    "Cheers, you two! Jabberwock's always short-handed, so a pair of inspectors is a godsend. Gahaha!",
    "Thanks heaps for the help today! Stick around next time and I'll put you both to work feeding the critters.",
  ],
  towa: [
    "~~~~ ♪ *Towa trails after you a few steps, humming, then drops a clover into your hand.*",
    "...! *Towa watches you go with his head tilted, then hums something bright and waves until you're out of sight.*",
  ],
  ren: [
    "You two actually volunteered for that? ...Respect, I guess. I got dragged.",
    "Finally, it's over. You two did most of it, so... good work, I guess.",
  ],
  edward: [
    "Ah, so you two were the inspectors bustling about Obscuary. Rui tells me you were splendid. I was asleep, I'm afraid.",
    "Thank you for tending to the house. I'd have helped, but I'm feeling quite poorly today.",
  ],
  rui: [
    "Thanks a ton for the help today, you two! Stop by the kitchen, I've got leftovers with your names on them.",
    "Ahaha, two inspectors at once! Ed slept through the whole thing, didn't he? Thanks for picking up the slack.",
  ],
  lyca: [
    "You two kept up today. ...You did good.",
    "You didn't run. Most humans run. ...Okay. You can come on the next one too.",
  ],
  taiga: [
    "Gyahaha! That was way less boring with you two around. Ciao!",
    "Lulu's happy with how that went, so I'm happy. Ciao!",
  ],
  ritsu: [
    "I have recorded your conduct in Sinostra today. It was exemplary. It will be noted in my files.",
    "Your work today is in my notebook, timestamped. Should anyone dispute it, I will represent you myself.",
  ],
  romeo: [
    "Hmph. You two were efficient, and free. My favorite kind of labor.",
    "Not bad. You didn't damage anything of value, so I'll allow you back.",
  ],
};

// --- shared -----------------------------------------------------------------

function randInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

/**
 * Every student of one house, in roster order. Missions are the only thing that
 * asks "who lives here" — /roam and /meet both draw a character first and
 * resolve their setting afterwards — so this lives here rather than being
 * pushed back into constants/characters.js.
 *
 * Benkei has no house and so is never a mission target or a riddle answer.
 */
export function getHouseRoster(house) {
  return CHARACTERS.filter((character) => character.house === house);
}

export const MISSION_HOUSES = Object.values(HOUSES);

/**
 * The student a co-op debrief opens with (§21.3): uniform over the house,
 * skipping anyone in `heldIds` (students the player already holds a pending
 * boost with, where a new grant would be capped to nothing). With every
 * student held it draws from the whole house, so a debrief always has a face.
 */
export function pickDebriefStudent(house, heldIds = []) {
  const roster = getHouseRoster(house);
  const held = new Set(heldIds);
  const open = roster.filter((character) => !held.has(character.id));
  return pickRandom(open.length ? open : roster) ?? null;
}

// --- slot rolling -----------------------------------------------------------

/**
 * The process-local calendar date, as `YYYY-MM-DD` — the shape
 * guild_settings.mission_slots_day comes back in, so the two can be compared
 * with ===.
 */
export function localDayKey(now = new Date()) {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Midnight at the start of the local day `now` falls in, as an ISO timestamp.
 * What the daily lead cap counts from — "today" here means the same local day
 * the slot window is drawn against, so the two calendars can never disagree.
 */
export function localDayStart(now = new Date()) {
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0,
    0,
  ).toISOString();
}

// Epoch ms of `hour:00` on the local day `now` falls in. Counted as an offset
// from local midnight rather than passed to the Date constructor so hour 24
// resolves to the following midnight instead of wrapping.
function atLocalHour(now, hour) {
  const midnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0,
    0,
  );
  return midnight.getTime() + hour * 60 * 60 * 1000;
}

/**
 * The day's three slot times, as ISO strings: one uniform-random moment inside
 * each equal third of the active window, re-rolled if it would land less than
 * MIN_GAP_MS after the previous one.
 *
 * The bands (~6h20m) comfortably absorb a 2h re-roll — the worst case still
 * leaves over four hours of the band to land in — so the loop terminates almost
 * immediately. The attempt cap is belt and braces: rather than spin, fall back
 * to "exactly one gap after the previous slot", which is always inside the band.
 */
export function rollDailySlots(now = new Date()) {
  const startMs = atLocalHour(now, WINDOW_START_HOUR);
  const spanMs = (WINDOW_END_HOUR - WINDOW_START_HOUR) * 60 * 60 * 1000;
  const bandMs = spanMs / MISSIONS_PER_DAY;

  const slots = [];
  for (let i = 0; i < MISSIONS_PER_DAY; i++) {
    const bandStart = startMs + i * bandMs;
    let t = bandStart + Math.random() * bandMs;

    for (
      let attempt = 0;
      attempt < 20 && i > 0 && t - slots[i - 1] < MIN_GAP_MS;
      attempt++
    ) {
      t = bandStart + Math.random() * bandMs;
    }
    if (i > 0 && t - slots[i - 1] < MIN_GAP_MS) t = slots[i - 1] + MIN_GAP_MS;

    slots.push(t);
  }

  return slots.map((ms) => new Date(ms).toISOString());
}

// Today's slots that haven't fired yet, as `{ index, at }` — the read both
// dueSlots and nextSlotAt need before they diverge on which side of `now`
// they're filtering for.
function unfiredSlots(slotsToday, firedIndices) {
  const fired = new Set((firedIndices || []).map(Number));
  return (slotsToday || [])
    .map((iso, index) => ({ index, at: new Date(iso).getTime() }))
    .filter(({ index, at }) => !fired.has(index) && Number.isFinite(at));
}

/**
 * The slots that are due and not yet fired, as `{ index, at }`, oldest first.
 * Anything more than STALE_SLOT_MINUTES late is reported as `stale: true` so
 * the caller can burn it without posting.
 */
export function dueSlots(slotsToday, firedIndices, now = new Date()) {
  const staleAfterMs = STALE_SLOT_MINUTES * 60 * 1000;

  return unfiredSlots(slotsToday, firedIndices)
    .filter(({ at }) => at <= now.getTime())
    .map((slot) => ({ ...slot, stale: now.getTime() - slot.at > staleAfterMs }))
    .sort((a, b) => a.at - b.at);
}

/**
 * The next slot that has not fired yet today, as epoch ms, or null if the day
 * is spent. What /mission shows someone with nothing in hand.
 */
export function nextSlotAt(slotsToday, firedIndices, now = new Date()) {
  const upcoming = unfiredSlots(slotsToday, firedIndices)
    .filter(({ at }) => at > now.getTime())
    .sort((a, b) => a.at - b.at);

  return upcoming[0]?.at ?? null;
}

/**
 * Today's slot times as one line: each a `<t:…:t>` stamp, struck through once
 * fired. This is the schedule readout that used to sit in `/missions status`;
 * that command no longer shows it, and `/encdev missions` (owner-only) does.
 */
export function missionSlotsLine(settings, now = new Date()) {
  if (!settings) return "No mission settings for this server yet.";

  if (
    settings.mission_slots_day !== localDayKey(now) ||
    !settings.mission_slots_today?.length
  ) {
    return "Today's times haven't been rolled yet — the next tick will do it.";
  }

  const fired = new Set((settings.mission_slots_fired || []).map(Number));
  const slots = settings.mission_slots_today.map((iso, index) => {
    const stamp = `<t:${Math.floor(new Date(iso).getTime() / 1000)}:t>`;
    return fired.has(index) ? `~~${stamp}~~` : stamp;
  });
  return `Today: ${slots.join(" · ")} (struck through = already posted)`;
}

// --- spawn rolls ------------------------------------------------------------

export function rollMissionType() {
  const total = WEIGHT_RIDDLE + WEIGHT_ERRAND + WEIGHT_COOP;
  const roll = Math.random() * total;
  if (roll < WEIGHT_RIDDLE) return MISSION_TYPES.RIDDLE;
  if (roll < WEIGHT_RIDDLE + WEIGHT_ERRAND) return MISSION_TYPES.ERRAND;
  return MISSION_TYPES.COOP;
}

export function rollHouse() {
  return pickRandom(MISSION_HOUSES);
}

/**
 * How many signatures an errand in this house needs: 1 up to the house's whole
 * roster. Mortkranken (2 students) therefore tops out at 2, Frostheim and
 * Dionysia at 4 — a house can never be asked for more sign-offs than it has
 * people to give them.
 */
export function rollSignatureCount(house) {
  const size = getHouseRoster(house).length;
  if (size === 0) return 0;
  return randInt(1, size);
}

/** `count` distinct students of `house`, drawn at random and frozen at spawn. */
export function pickSignatureTargets(house, count) {
  const pool = getHouseRoster(house).map((character) => character.id);
  const picked = [];
  while (pool.length && picked.length < count) {
    picked.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
  }
  return picked;
}

/**
 * The house an errand is changed to: any other house with a roster, never
 * the one it already has, so the change always changes something.
 */
export function rollHouseChange(currentHouse) {
  return pickRandom(
    MISSION_HOUSES.filter(
      (house) => house !== currentHouse && getHouseRoster(house).length > 0,
    ),
  );
}

/** A fresh errand draw for `house`: the count, then that many distinct students. */
export function drawErrandTargets(house) {
  return pickSignatureTargets(house, rollSignatureCount(house));
}

export function pickRiddle(house) {
  const pool = RIDDLES[house];
  if (!pool?.length) return null;
  return pickRandom(pool);
}

export function getRiddle(house, riddleId) {
  return (
    (RIDDLES[house] || []).find((riddle) => riddle.id === riddleId) || null
  );
}

// --- rendering helpers ------------------------------------------------------

export function inspectorRank(points) {
  let rank = INSPECTOR_RANKS[0];
  for (const candidate of INSPECTOR_RANKS) {
    if (points >= candidate.min) rank = candidate;
  }
  return rank;
}

function nameList(characterIds) {
  return characterIds
    .map((id) => getCharacterById(id))
    .filter(Boolean)
    .map((character) => `**${getFullName(character)}**`);
}

/** "A", "A and B", "A, B and C" — used for target lists in /mission and /docs. */
export function formatNameList(characterIds) {
  const names = nameList(characterIds);
  if (names.length === 0) return "nobody";
  if (names.length === 1) return names[0];
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

/**
 * The one-line "what you are being asked to do", by type. The house is named
 * here and nowhere public — this string only ever reaches the accepter.
 */
export function missionObjectiveLine(
  mission,
  { targetIds = [], riddle = null } = {},
) {
  switch (mission.mission_type) {
    case MISSION_TYPES.ERRAND:
      return targetIds.length
        ? `Darkwick needs signoff from ${mission.house} to complete report. Track down ${formatNameList(
            targetIds,
          )}.`
        : `Every signature from ${mission.house} is in. The report is ready to file.`;
    case MISSION_TYPES.RIDDLE:
      return riddle
        ? `An anomaly report out of ${mission.house} needs debunking.\n\n> ${riddle.prompt}`
        : `An anomaly report out of ${mission.house} needs debunking, but the file has gone missing. Nothing to answer here.`;
    case MISSION_TYPES.COOP:
      return `${mission.house} asked for two inspectors, not one. You need backup before you can move on this.`;
    default:
      return "The briefing is unreadable.";
  }
}

/** The "Progress:" line, by type. Shared between /mission and the dossier. */
export function missionProgressLine(
  mission,
  { signed = 0, required = 0 } = {},
) {
  switch (mission.mission_type) {
    case MISSION_TYPES.ERRAND:
      return `${signed} / ${required} signature${required === 1 ? "" : "s"}`;
    case MISSION_TYPES.RIDDLE:
      return "unsolved";
    case MISSION_TYPES.COOP:
      return mission.assist_message_id
        ? "partner post is live"
        : "waiting on a partner";
    default:
      return "unknown";
  }
}

// --- wrong-guess cooldown ---------------------------------------------------

// A wrong /riddle answer costs the accepter a pause before the next attempt.
// In memory for the same reason /call's guess cooldown is: single app instance,
// so this Map is authoritative and the guess path needs no DB round trip, and a
// deploy mid-mission just hands the holder one extra try.
const riddleCooldown = new Map(); // `${missionId}:${userId}` -> epoch ms

function cooldownKey(missionId, userId) {
  return `${missionId}:${userId}`;
}

export function getRiddleCooldownRemaining(
  missionId,
  userId,
  now = Date.now(),
) {
  const last = riddleCooldown.get(cooldownKey(missionId, userId));
  if (last === undefined) return 0;
  return Math.max(0, RIDDLE_WRONG_COOLDOWN_SECONDS * 1000 - (now - last));
}

export function startRiddleCooldown(missionId, userId, now = Date.now()) {
  riddleCooldown.set(cooldownKey(missionId, userId), now);
}

// Called when a mission resolves, and with no argument from the scheduler tick
// when no guild has missions on at all.
export function clearRiddleCooldowns(missionId = null) {
  if (missionId === null) {
    riddleCooldown.clear();
    return;
  }
  const prefix = `${missionId}:`;
  for (const key of riddleCooldown.keys()) {
    if (key.startsWith(prefix)) riddleCooldown.delete(key);
  }
}
