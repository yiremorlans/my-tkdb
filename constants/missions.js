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
export const POST_TTL_HOURS = 6;

// How long an accepted mission has to be finished before it lapses and frees
// the accepter's slot. Passed into claim_mission rather than hard-coded in the
// SQL, so this constant stays the single source of truth.
export const ACCEPT_WINDOW_HOURS = 48;

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

// Riddle is the common case because it is the one type that can be finished in
// a single sitting, with no cooldown and no second player. The other two both
// make the player wait on something outside their control — a shared 3h
// cooldown for an errand's N meetings, another inspector for a co-op — so they
// carry equal weight behind it.
export const WEIGHT_RIDDLE = 50;
export const WEIGHT_ERRAND = 25;
export const WEIGHT_COOP = 25;

// Chance a /roam by someone holding an errand is steered to a still-unsigned
// target instead of rolling uniformly over the roster. Without this, chasing
// specific students through a 26-way random /roam inside 48h against a 3h
// cooldown is close to hopeless. It changes WHO appears, never how often the
// player may roam.
export const ERRAND_ROAM_TARGET_BIAS = 0.5;

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

export const MISSION_PICKED_UP = (name) =>
  `**${name}** has picked up the mission.`;

export const MISSION_WITHDRAWN_LINES = [
  "The request was withdrawn before anyone took it.",
  "Too slow. The Chancellor reassigned it internally.",
  "The folder came off the board. Maybe next time.",
  "Nobody moved on it. The mission lapsed.",
  "The briefing room went dark. Opportunity gone.",
];

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
    ? "\nYou have **1 cooldown reset** banked from a mission. Spend it now, or keep it for later."
    : `\nYou have **${held} cooldown resets** banked from missions. Spend one now, or keep them for later.`;
}

// What the player is told after spending one. 'both' is a solo mission's
// reward, 'roam'/'meet' a co-op's.
export const RESET_SPENT_LINES = {
  both: "Reset spent. Both `/roam` and `/meet` are clear.",
  roam: "Reset spent. `/roam` is clear.",
  meet: "Reset spent. `/meet` is clear.",
};

export const RIDDLE_WRONG_LINES = [
  "That's not who's behind this. Look again.",
  "Wrong read on the evidence.",
  "The pieces don't point there.",
  "Not them. The anomaly persists.",
];

// Thresholds are mission_log POINT totals, not mission counts — an errand can
// be worth up to 4, so counting missions would rank a lucky errand run the
// same as four riddles.
//
// Paced against RELATIONSHIP_LEVELS (constants/game.js), not chosen bare: an
// average player earns ~0.36 house logs/day (docs/scheduled-missions.md's own
// "one lead every 3-4 days" at the current type weights, leads only). At that
// rate these clear in ~41 / ~110 / ~250 / ~440 days — the same order of
// magnitude as maxing affinity on one favorite character by always picking
// their best response (~67 days to Soulbound at 400). The old thresholds
// (3/10/25/50) cleared in 8-138 days — the early ranks fell in a week or two,
// nothing like the weeks of consistent play affinity's early tiers ask for.
export const INSPECTOR_RANKS = [
  { min: 0, name: "Novice Inspector" },
  { min: 15, name: "Field Inspector" },
  { min: 40, name: "Senior Inspector" },
  { min: 90, name: "Special Inspector" },
  { min: 160, name: "Chancellor's Right Hand" },
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
  [MISSION_TYPES.COOP]: "call a partner with `/mission assist:True`",
};

export const CAPPED_LINE = `You've already taken your ${DAILY_LEAD_CAP} missions for today. Anything you're still holding can be finished as normal, and the board is yours again tomorrow.`;

export function busyLine(type) {
  return `You already have a mission in progress. ${
    MISSION_NEXT_STEP[type]
      ? `Go ${MISSION_NEXT_STEP[type]} first.`
      : "Wrap it up with `/docs`, `/riddle`, or `/mission assist:True` first."
  }`;
}

// The always-present "how this type works" block in /mission (§8). Written as
// instructions rather than hints: the accepter is the only person who ever sees
// this, and a mission they can't work out how to finish is just a dead slot.
export const MISSION_INSTRUCTIONS = {
  [MISSION_TYPES.ERRAND]:
    "Your targets are boosted in your `/roam` and `/meet` while this is open. Meet them, then check the sheet and file it with `/docs`. One house log per signature, plus a banked cooldown reset that clears both.",
  [MISSION_TYPES.RIDDLE]:
    "Answer with `/riddle <your answer>`. Solve it for one house log, plus a banked cooldown reset: spend it the next time `/roam` or `/meet` tells you to wait, and it clears both.",
  [MISSION_TYPES.COOP]:
    "Call a partner with `/mission assist:True`. The first inspector to back you up completes it for both of you. One house log each, plus a banked cooldown reset good for one of `/roam` or `/meet`.",
};

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
export const RIDDLES = {
  [HOUSES.FROSTHEIM]: [
    {
      id: "frostheim_crown",
      answer: "jin",
      prompt:
        "A first-year reports being ordered to kneel, then handed a coat worth more than his tuition and told to take it for dry cleaning. Name the student.",
    },
    {
      id: "frostheim_helicopter",
      answer: "jin",
      prompt:
        "A private helicopter set down on the north lawn without filing anything at all. The staff who came to object were informed that the matter was closed and that it had not been a request. Name the student.",
    },
    {
      id: "frostheim_tea",
      answer: "tohma",
      prompt:
        "Every complaint filed against Frostheim this month was withdrawn within the hour. Each writer describes a very polite conversation over tea that they insist never happened. Name the student.",
    },
    {
      id: "frostheim_schedule",
      answer: "tohma",
      prompt:
        "The captain's coat was hung, his tea was poured, and his schedule was amended for an incident nobody has reported yet. Whoever did it was gone before anyone thought to ask how he knew. Name the student.",
    },
    {
      id: "frostheim_dawn",
      answer: "lucas",
      prompt:
        "The training hall lights burn until dawn. The note left on the desk apologizes for the electricity, not the noise, in careful English handwriting. Name the student.",
    },
    {
      id: "frostheim_intervene",
      answer: "lucas",
      prompt:
        "Three reports this month describe the same student stepping in for students being bullied on campus. Name the student.",
    },
    {
      id: "frostheim_feed",
      answer: "kaito",
      prompt:
        "An anomaly was posted to WickChat before it was ever reported to this office. The post came down, was apologized for four separate times, and went back up with a filter on it. Name the student.",
    },
    {
      id: "frostheim_debt",
      answer: "kaito",
      prompt:
        "The casino has filed a complaint over three unpaid fines against the same second-year, who promised to settle each of them next week and has not been seen near the floor since. Name the student.",
    },
  ],

  [HOUSES.VAGASTROM]: [
    {
      id: "vagastrom_garage",
      answer: "alan",
      prompt:
        "Something in the garage has been repairing the bikes overnight and leaving them better than new. Nobody has heard it say a word about it. Name the student.",
    },
    {
      id: "vagastrom_gate",
      answer: "alan",
      prompt:
        "A brawl at the gate ended when one student stepped between the two sides and did nothing at all. Both sides went home. He was found an hour later two streets away, having taken a wrong turn. Name the student.",
    },
    {
      id: "vagastrom_rumor",
      answer: "leo",
      prompt:
        "The rumor reached every phone on campus before it reached the person it was about, cropped and timestamped for maximum reach. Name the student.",
    },
    {
      id: "vagastrom_ringlight",
      answer: "leo",
      prompt:
        "The lunch queue was held up so one plate could be photographed in better light, with three underclassmen drafted to hold the reflector. Nobody was touched. Everybody moved. Name the student.",
    },
    {
      id: "vagastrom_truck",
      answer: "shohei",
      prompt:
        "The truck by the gate served a hot meal to a student who could not pay, and swore at him the entire time for letting it go cold. Name the student.",
    },
    {
      id: "vagastrom_bins",
      answer: "shohei",
      prompt:
        "A bike went through the east gate at an unreasonable hour, then came back so its rider could right the bins he had clipped, swearing the whole time about people who leave them there. Name the student.",
    },
  ],

  [HOUSES.HOTARUBI]: [
    {
      id: "hotarubi_ghost",
      answer: "zenji",
      prompt:
        'Students keep reporting a ghost in the Hotarubi music room: a biwa played by nobody, footsteps close behind them, and a voice that compliments their posture and calls them "my dear". Name the student.',
    },
    {
      id: "hotarubi_salon",
      answer: "zenji",
      prompt:
        "A run of folktale videos was uploaded from a room the register lists as empty, each one narrated in the slang of a hundred years ago and closing with an invitation to write in with your romantic troubles. Name the student.",
    },
    {
      id: "hotarubi_prop",
      answer: "subaru",
      prompt:
        "A borrowed prop came back with a note listing exactly what its last owner had been feeling while holding it. The writer apologized twice for knowing. Name the student.",
    },
    {
      id: "hotarubi_figurehead",
      answer: "subaru",
      prompt:
        "One signature appears on every Hotarubi form this month, including the ones that were not his to sign. In the margin of the last, the signer describes himself as just a figurehead. Name the student.",
    },
    {
      id: "hotarubi_swept",
      answer: "haku",
      prompt:
        "The dorm mess was cleaned up before anyone woke. Whoever did it left a note insisting it is fine to half-ass things. Name the student.",
    },
    {
      id: "hotarubi_behind",
      answer: "haku",
      prompt:
        "Three general students report being told, very casually and without anyone turning around, exactly who was standing behind them. The teller did not appear to find it interesting. Name the student.",
    },
  ],

  [HOUSES.DIONYSIA]: [
    {
      id: "dionysia_roster",
      answer: "jo",
      prompt:
        "Every job on the house roster was somehow already done before the roster went up, by someone who would rather do it himself than explain it twice. Name the student.",
    },
    {
      id: "dionysia_jog",
      answer: "jo",
      prompt:
        "The lap of the campus wall has been logged at the same minute every morning for a year, by someone the evening audience would walk straight past out of costume. Name the student.",
    },
    {
      id: "dionysia_lollipop",
      answer: "elias",
      prompt:
        "The corridor was swept at three in the morning by a boy with a lollipop and an unhurried drawl who says he was only passing through. Name the student.",
    },
    {
      id: "dionysia_wallet",
      answer: "elias",
      prompt:
        "A witness reports a wallet handed back to him before he had noticed it was gone. Asked how it turned up, whoever found it smiled, said he would leave that to the imagination, and went back to wiping down the counter. Name the student.",
    },
    {
      id: "dionysia_clocks",
      answer: "mio",
      prompt:
        "The broken campus clocks were fixed for free, overnight, by someone running on two hours of sleep who changed the subject when asked if he was all right. Name the student.",
    },
    {
      id: "dionysia_handrails",
      answer: "mio",
      prompt:
        "Every stairwell in Dionysia has acquired a handrail nobody requisitioned and a small sign asking people to please stop running on the wet steps. Name the student.",
    },
    {
      id: "dionysia_heebie",
      answer: "shion",
      prompt:
        'Three students fled the Heebie-Jeebie House swearing something followed them out and called one of them "my wife". Name the student.',
    },
    {
      id: "dionysia_lullaby",
      answer: "shion",
      prompt:
        "Something in the west dorm has been singing a lullaby to a pet no one can identify, and telling passers-by, kindly, that they mightn't ever wake up after it. Name the student.",
    },
  ],

  [HOUSES.MORTKRANKEN]: [
    {
      id: "mortkranken_ward",
      answer: "yuri",
      prompt:
        "The whole ward heard a voice announce that a treatment was in fact an experiment, correct itself, and then start shouting for its assistant. Name the student.",
    },
    {
      id: "mortkranken_drill",
      answer: "yuri",
      prompt:
        "A fire drill in Mortkranken ended with one student on his knees in the corridor, mourning at the top of his lungs a body of research that was not on fire. Name the student.",
    },
    {
      id: "mortkranken_chart",
      answer: "jiro",
      prompt:
        "A patient chart came back complete, correct, and entirely without comfort. Whoever filed it had already gone back to work. Name the student.",
    },
    {
      id: "mortkranken_bedside",
      answer: "jiro",
      prompt:
        "A crying patient was given her exact odds of recovery to two decimal places. Whoever gave them then sat with her for an hour and said nothing else at all. Name the student.",
    },
  ],

  [HOUSES.JABBERWOCK]: [
    {
      id: "jabberwock_tour",
      answer: "haru",
      prompt:
        "Every conversation in the park last week somehow ended in a discount code and an invitation to the tour, delivered by a boy with one gloved hand. Name the student.",
    },
    {
      id: "jabberwock_fenceline",
      answer: "haru",
      prompt:
        "An escaped park animal was carried back through the front gate by someone telling it the whole way that it would be right, who then walked the fence line twice to make sure nothing else had gotten out. Name the student.",
    },
    {
      id: "jabberwock_garden",
      answer: "towa",
      prompt:
        "The keepers report humming from the flower beds after hours, one old tree spoken to like a friend, and the dandelions gone by morning. Name the student.",
    },
    {
      id: "jabberwock_bubbles",
      answer: "towa",
      prompt:
        "Bubbles were reported drifting past a third floor window at midnight, along with a voice promising somebody, by name, that they would never have to be lonely again. Name the student.",
    },
    {
      id: "jabberwock_grind",
      answer: "ren",
      prompt:
        "A student sat through the entire anomaly alert without once looking up from a phone game, then filed a grievance about his wrist. Name the student.",
    },
    {
      id: "jabberwock_clip",
      answer: "ren",
      prompt:
        "The security footage was cut into a thirty second clip with subtitles and a punchline before anybody got around to filing the report. Name the student.",
    },
  ],

  [HOUSES.OBSCUARY]: [
    {
      id: "obscuary_permission",
      answer: "edward",
      prompt:
        "The witness reports being asked, very courteously, for permission first. He gave it. He cannot now say why. Name the student.",
    },
    {
      id: "obscuary_parasol",
      answer: "edward",
      prompt:
        "A student was carried to his own room twice this week, having declared himself too weak to walk, and was found wide awake at three in the morning working through a playlist about the moon landing. Name the student.",
    },
    {
      id: "obscuary_cocktail",
      answer: "rui",
      prompt:
        "A witness swears he was handed a cocktail he never ordered, mixed to his mood exactly, by a bartender in gloves who had not stopped moving all night. Name the student.",
    },
    {
      id: "obscuary_houseparent",
      answer: "rui",
      prompt:
        "Three housemates were fed, medicated and put to bed by someone who then did the dishes and started the laundry at four in the morning. Nobody on the corridor has ever seen him sleep. Name the student.",
    },
    {
      id: "obscuary_scent",
      answer: "lyca",
      prompt:
        "The thief was found by someone who never looked at the evidence at all. He smelled the room, went straight to the right door, and then went quiet about it. Name the student.",
    },
    {
      id: "obscuary_blanket",
      answer: "lyca",
      prompt:
        "A student spent the full moon on the roof and would not come down, guarding a filthy blanket he would not let anybody take away to wash. Name the student.",
    },
  ],

  [HOUSES.SINOSTRA]: [
    {
      id: "sinostra_beast",
      answer: "taiga",
      prompt:
        "An anomaly beast was reported loose near the VIP room. By the time inspectors arrived there was no beast, only a very full student laughing about it. Name the student.",
    },
    {
      id: "sinostra_wager",
      answer: "taiga",
      prompt:
        "The same inspector was asked their name three mornings running by a student who had already been told twice. On the third morning he bet on the outcome of their next mission, and won. Name the student.",
    },
    {
      id: "sinostra_ledger",
      answer: "ritsu",
      prompt:
        "The incident report arrived before the incident was over, timestamped to the second and cross-referenced against three earlier filings. Name the student.",
    },
    {
      id: "sinostra_objection",
      answer: "ritsu",
      prompt:
        "A first-year passes the gate at the same second every morning and has served the office a written objection, with citations, to the wording of the last three notices. Name the student.",
    },
    {
      id: "sinostra_fee",
      answer: "romeo",
      prompt:
        "The shop owner says the protection fee was collected at volume, by someone in a very expensive coat, who assured him the whole time it was for his own good. Name the student.",
    },
    {
      id: "sinostra_routine",
      answer: "romeo",
      prompt:
        "The casino floor was reorganized overnight, after which its boss occupied the staff bathroom for forty minutes of skincare and yelled at everyone who knocked. Name the student.",
    },
  ],
};
// --- shared -----------------------------------------------------------------

export function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

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

/**
 * The slots that are due and not yet fired, as `{ index, at }`, oldest first.
 * Anything more than STALE_SLOT_MINUTES late is reported as `stale: true` so
 * the caller can burn it without posting.
 */
export function dueSlots(slotsToday, firedIndices, now = new Date()) {
  const fired = new Set((firedIndices || []).map(Number));
  const staleAfterMs = STALE_SLOT_MINUTES * 60 * 1000;

  return (slotsToday || [])
    .map((iso, index) => ({ index, at: new Date(iso).getTime() }))
    .filter(
      ({ index, at }) =>
        !fired.has(index) && Number.isFinite(at) && at <= now.getTime(),
    )
    .map((slot) => ({ ...slot, stale: now.getTime() - slot.at > staleAfterMs }))
    .sort((a, b) => a.at - b.at);
}

/**
 * The next slot that has not fired yet today, as epoch ms, or null if the day
 * is spent. What /mission shows someone with nothing in hand.
 */
export function nextSlotAt(slotsToday, firedIndices, now = new Date()) {
  const fired = new Set((firedIndices || []).map(Number));
  const upcoming = (slotsToday || [])
    .map((iso, index) => ({ index, at: new Date(iso).getTime() }))
    .filter(
      ({ index, at }) =>
        !fired.has(index) && Number.isFinite(at) && at > now.getTime(),
    )
    .sort((a, b) => a.at - b.at);

  return upcoming[0]?.at ?? null;
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

/** The next rank up, or null once the ladder is topped out. */
export function nextInspectorRank(points) {
  return INSPECTOR_RANKS.find((rank) => rank.min > points) || null;
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
      return `${mission.house} needs sign-off from ${formatNameList(
        targetIds,
      )}. Track them down. They'll be easier to run into while this stays open.`;
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
