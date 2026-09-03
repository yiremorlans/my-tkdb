// Reference data for every playable location in assets/bg.
// Locations are grouped by "house" (a character's home turf) or as a
// GENERAL location, which any character can be encountered at regardless
// of their own house.

export const HOUSES = {
  FROSTHEIM: "Frostheim",
  VAGASTROM: "Vagastrom",
  HOTARUBI: "Hotarubi",
  DIONYSIA: "Dionysia",
  MORTKRANKEN: "Mortkranken",
  JABBERWOCK: "Jabberwock",
  OBSCUARY: "Obscuary",
  SINOSTRA: "Sinostra",
};

export const CHARACTER_ROOMS = {
  JIN: "Jin_Room",
  ALAN: "Alan_Room",
  LEO: "Leo_Room",
  SHOHEI: "Shohei_Room",
  SUBARU: "Subaru_Room",
  ZENJI: "Zenji_Room",
  JIRO: "Jiro_Room",
  REN: "Ren_Room",
  EDWARD: "Edward_Room",
  RUI: "Rui_Room",
  TAIGA: "Taiga_Room",
};

export const SPECIAL_BACKGROUNDS = {
  DARKWICK_MYSTERY_DINER: "Darkwick_Mystery_Diner.png",
  DARKWICK_FOOD_TRUCK: "Darkwick_Food_Truck.png",
  DARKWICK_DOCKS: "Darkwick_Docks.png",
  VAGASTROM_THE_PIT: "Vagastrom_The_Pit.png",
  SINOSTRA_VIP_ROOM_ENTRANCE: "Sinostra_VIP_Room_Entrance.png",
  OBSCUARY_BAR: "Obscuary_Bar.png",
  MORTKRANKEN_LAB: "Mortkranken_Lab.png",
  MORTKRANKEN_LAB_PM: "Mortkranken_Lab_PM.png",
};

// Display names for backgrounds with underscores in filenames
export const BACKGROUND_DISPLAY_NAMES = {
  // Special locations
  "Darkwick_Mystery_Diner.png": "Darkwick Mystery Diner",
  "Darkwick_Food_Truck.png": "Sho's Food Truck",
  "Darkwick_Docks.png": "Darkwick Docks",
  "Vagastrom_The_Pit.png": "The Pit",
  "Sinostra_VIP_Room_Entrance.png": "Sinostra VIP Room Entrance",
  "Obscuary_Bar.png": "Obscuary Bar",
  "Mortkranken_Lab.png": "Mortkranken Lab",
  "Mortkranken_Lab_PM.png": "Mortkranken Lab",
  // Character rooms
  "Frostheim_Jin_Room.png": "Jin's Room",
  "Frostheim_Jin_Room_PM.png": "Jin's Quarters",
  "Vagastrom_Alan_Room.png": "Alan's Room",
  "Vagastrom_Alan_Room_Entrance.png": "Alan's Quarters",
  "Vagastrom_Leo_Room.png": "Leo's Room",
  "Vagastrom_Shohei_Room.png": "Sho's Room",
  "Hotarubi_Subaru_Entrance.png": "Subaru's Quarters",
  "Hotarubi_Zenji_Room_PM.png": "Zenji's Room",
  "Mortkranken_Jiro_Room.png": "Jiro's Room",
  "Jabberwock_Ren_Room.png": "Ren's Room",
  "Obscuary_Edward_Room.png": "Edward's Room",
  "Obscuary_Edward_Room_2.png": "Edward's Room",
  "Obscuary_Edward_Room_Entrance.png": "Edward's Quarters",
  "Obscuary_Rui_Room.png": "Rui's Room",
  "Sinostra_Taiga_Room.png": "Taiga's Room",
  "Sinostra_Taiga_Room_Entrance.png": "Taiga's Quarters",
};

export const GENERAL_LOCATIONS = {
  DARKWICK: "Darkwick",
  ULTIO: "Ultio",
  GALAXY: "Galaxy Express",
  CLEMENTIA: "Clementia",
};

export const EVENT_LOCATIONS = {
  STAR_FESTIVAL: "Star Festival",
};

// All location keys a background (and therefore an encounter) can belong to.
export const LOCATION_KEYS = {
  ...HOUSES,
  ...GENERAL_LOCATIONS,
  ...EVENT_LOCATIONS,
  ...CHARACTER_ROOMS,
};

// Backgrounds that only appear in the evening live in this list by filename
// convention (ends in "_PM"). Discord interactions don't tell us the invoking
// user's timezone, so "evening" is judged against one fixed zone for everyone.
const EVENING_SUFFIX = "_PM";

// The single definition of the "evening" window. It runs from EVENING_HOUR
// (inclusive) through MORNING_HOUR (exclusive), wrapping past midnight: 18:00
// up to 23:59, then 00:00 up to 03:59. The pre-dawn hours count as evening so
// overnight scenes keep their _PM backgrounds instead of snapping back to
// daytime at midnight. 04:00 through 17:59 is "day".
//
// Both background filtering and conditional dialogue (`when: { time: 'evening' }`)
// derive from this, off the same `now`, so the scene that renders and the lines
// that get picked can never disagree. If per-user timezones ever land, pass a
// user-local `now` and nothing else changes.
export const EVENING_HOUR = 18;
export const MORNING_HOUR = 4;

// The one fixed zone "evening" is judged against, for every user regardless
// of their own timezone. Read explicitly via Intl below rather than relying
// on the process's ambient local time (a plain `now.getHours()` depends on
// process.env.TZ, which app.js only sets as a fallback default (`??=`) and
// which not every runtime honors if set after startup) — this keeps 18:00
// Central definitive no matter what timezone the host process actually runs
// under, or whether something else already set TZ to a different zone first.
export const EVENING_TIMEZONE = "America/Chicago";

// Intl.DateTimeFormat construction has nonzero overhead — build once.
// hourCycle: 'h23' pins the output to 0-23 (some locales otherwise render
// midnight as "24", which would need separate handling).
const eveningHourFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: EVENING_TIMEZONE,
  hour: "numeric",
  hourCycle: "h23",
});

export function isEveningHour(now = new Date()) {
  const hour = Number(eveningHourFormatter.format(now));
  // Wraps past midnight: evening is [EVENING_HOUR, 24) plus [0, MORNING_HOUR).
  return hour >= EVENING_HOUR || hour < MORNING_HOUR;
}

// Coarse time-of-day label used by conditional dialogue's `when: { time }`.
// Just 'day' vs 'evening' today; split further (morning / afternoon / night) by
// adding cutoffs here — this stays the one place hours are bucketed. Returns
// null when there is no clock context, so a `time` rule simply won't match
// rather than throwing.
export const TIME_BUCKETS = ["day", "evening"];

export function timeBucket(now) {
  if (!now) return null;
  return isEveningHour(now) ? "evening" : "day";
}

export function isEveningBackground(filename) {
  return filename.replace(/\.png$/, "").endsWith(EVENING_SUFFIX);
}

export const BACKGROUNDS_BY_LOCATION = {
  [HOUSES.FROSTHEIM]: [
    "Frostheim_Balcony_PM.png",
    "Frostheim_Ballroom.png",
    "Frostheim_Castle.png",
    "Frostheim_Entrance.png",
    "Frostheim_Entrance_PM.png",
    "Frostheim_Jin_Entrance.png",
    "Frostheim_Vault.png",
    "Frostheim_Vault_Entrance.png",
  ],
  [HOUSES.VAGASTROM]: [
    "Vagastrom_Back_Garage_PM.png",
    "Vagastrom_Corridor.png",
    "Vagastrom_Garage.png",
    "Vagastrom_Garage_PM.png",
    "Vagastrom_Secret_Car.png",
    "Vagastrom_The_Pit.png",
  ],
  [HOUSES.HOTARUBI]: [
    "Hotarubi_Bamboo_Forest.png",
    "Hotarubi_Corridor.png",
    "Hotarubi_Forest_PM.png",
    "Hotarubi_Garden.png",
    "Hotarubi_Garden_PM.png",
    "Hotarubi_Harbor.png",
    "Hotarubi_Lake.png",
    "Hotarubi_Lake_2.png",
    "Hotarubi_Lake_PM.png",
    "Hotarubi_Parlor.png",
    "Hotarubi_Parlor_PM.png",
    "Hotarubi_Tea_Room.png",
    "Hotarubi_Tea_Room_PM.png",
    "Hotarubi_Temple.png",
    "Hotarubi_Temple_PM.png",
  ],
  [HOUSES.DIONYSIA]: [
    "Dionysia_Circus.png",
    "Dionysia_Entrance.png",
    "Dionysia_Workshop.png",
  ],
  [HOUSES.MORTKRANKEN]: [
    "Mortkranken_Entrance.png",
    "Mortkranken_Entrance_PM.png",
    "Mortkranken_Examination_Room.png",
    "Mortkranken_Examination_Room_2.png",
    "Mortkranken_Examination_Room_PM.png",
    "Mortkranken_Lab.png",
    "Mortkranken_Lab_PM.png",
    "Mortkranken_Underpass_PM.png",
  ],
  [HOUSES.JABBERWOCK]: [
    "Jabberwock_Cave.png",
    "Jabberwock_Cave_PM.png",
    "Jabberwock_Dorm_Room.png",
    "Jabberwock_Entrance.png",
    "Jabberwock_Field.png",
    "Jabberwock_Field_PM.png",
    "Jabberwock_Kitchen.png",
    "Jabberwock_Mountain_PM.png",
    "Jabberwock_Ushi-Oni_Pen_PM.png",
  ],
  [HOUSES.OBSCUARY]: [
    "Obscuary_Bar.png",
    "Obscuary_Entrance.png",
    "Obscuary_Garden.png",
    "Obscuary_Guest_Room.png",
    "Obscuary_Lost_Forest.png",
  ],
  [HOUSES.SINOSTRA]: [
    "Sinostra_Auction_Hall.png",
    "Sinostra_Auction_Hall_Cage.png",
    "Sinostra_Casino.png",
    "Sinostra_Casino_Nook.png",
    "Sinostra_VIP_Room.png",
    "Sinostra_VIP_Room_Entrance.png",
  ],
  [GENERAL_LOCATIONS.DARKWICK]: [
    "Camp_Darkwick_PM.png",
    "Darkwick_Artifact_Storeroom.png",
    "Darkwick_Auditorium_PM.png",
    "Darkwick_Bus_Stop.png",
    "Darkwick_Cafeteria.png",
    "Darkwick_Cafeteria_Kitchen.png",
    "Darkwick_Campus_Store.png",
    "Darkwick_Classroom.png",
    "Darkwick_Classroom_2.png",
    "Darkwick_Corridor.png",
    "Darkwick_Corridor_2.png",
    "Darkwick_Corridor_3.png",
    "Darkwick_Corridor_4.png",
    "Darkwick_Corridor_PM.png",
    "Darkwick_Counseling_Room.png",
    "Darkwick_Courtyard.png",
    "Darkwick_Courtyard_PM.png",
    "Darkwick_Docks.png",
    "Darkwick_Entrance.png",
    "Darkwick_Food_Truck.png",
    "Darkwick_Hospital_Room.png",
    "Darkwick_Infirmary.png",
    "Darkwick_Library.png",
    "Darkwick_Main_Street.png",
    "Darkwick_Mystery_Diner.png",
    "Darkwick_Office.png",
    "Darkwick_Office_PM.png",
    "Darkwick_Staffroom.png",
    "Darkwick_Substreet.png",
    "Darkwick_Substreet_1.png",
    "Darkwick_Substreet_3.png",
    "Darkwick_Substreet_4.png",
    "Darkwick_Substreet_5.png",
    "Darkwick_Substreet_PM.png",
    "Darkwick_Terrace.png",
    "Darkwick_Training_Grounds.png",
    "Darkwick_Underpass.png",
  ],
  [GENERAL_LOCATIONS.ULTIO]: [
    "Ultio_Cave.png",
    "Ultio_Jail_Cell.png",
    "Ultio_Jail_Hall.png",
  ],
  [GENERAL_LOCATIONS.GALAXY]: [
    "Galaxy_Express_AM.png",
    "Galaxy_Express_PM.png",
    "Galaxy_Express_Platform.png",
    "Galaxy_Express_Space.png",
    "Galaxy_Express_Station.png",
  ],
  [GENERAL_LOCATIONS.CLEMENTIA]: [
    "Clementia_Attic.png",
    "Clementia_Attic_PM.png",
    "Clementia_Cathedral.png",
    "Clementia_Cathedral_Corridor.png",
    "Clementia_Cathedral_Hall.png",
    "Clementia_Cathedral_Hall_PM.png",
    "Clementia_Cathedral_PM.png",
  ],
  [EVENT_LOCATIONS.STAR_FESTIVAL]: [
    "Hotarubi_Eternal_Bamboo.png",
    "Hotarubi_Garden_Star_Festival.png",
    "Hotarubi_Garden_Star_Festival_PM.png",
    "Hotarubi_Harbor_Star_Festival.png",
    "Hotarubi_River_PM.png",
    "Hotarubi_Stall_Star_Festival.png",
    "Hotarubi_Stall_Star_Festival_PM.png",
  ],
  [CHARACTER_ROOMS.JIN]: [
    "Frostheim_Jin_Room.png",
    "Frostheim_Jin_Room_PM.png",
  ],
  [CHARACTER_ROOMS.ALAN]: [
    "Vagastrom_Alan_Room.png",
    "Vagastrom_Alan_Room_Entrance.png",
  ],
  [CHARACTER_ROOMS.LEO]: ["Vagastrom_Leo_Room.png"],
  [CHARACTER_ROOMS.SHOHEI]: ["Vagastrom_Shohei_Room.png"],
  [CHARACTER_ROOMS.SUBARU]: ["Hotarubi_Subaru_Entrance.png"],
  [CHARACTER_ROOMS.ZENJI]: ["Hotarubi_Zenji_Room_PM.png"],
  [CHARACTER_ROOMS.JIRO]: ["Mortkranken_Jiro_Room.png"],
  [CHARACTER_ROOMS.REN]: ["Jabberwock_Ren_Room.png"],
  [CHARACTER_ROOMS.EDWARD]: [
    "Obscuary_Edward_Room.png",
    "Obscuary_Edward_Room_2.png",
    "Obscuary_Edward_Room_Entrance.png",
  ],
  [CHARACTER_ROOMS.RUI]: ["Obscuary_Rui_Room.png"],
  [CHARACTER_ROOMS.TAIGA]: [
    "Sinostra_Taiga_Room.png",
    "Sinostra_Taiga_Room_Entrance.png",
  ],
};

export function isGeneralLocation(locationKey) {
  return (
    Object.values(GENERAL_LOCATIONS).includes(locationKey) ||
    Object.values(EVENT_LOCATIONS).includes(locationKey)
  );
}

const CHARACTER_ROOM_KEYS = new Set(Object.values(CHARACTER_ROOMS));

// Player-facing label for an encounter spot ({ locationKey, file }).
// Character-room location keys ("Alan_Room", "Jin_Room", …) are internal
// ids, not something to print — resolve the actual background file through
// BACKGROUND_DISPLAY_NAMES first. House / general keys ("Vagastrom",
// "Darkwick") are already readable, so fall back to those; last resort is a
// de-underscored version of a room key ("Alan_Room" -> "Alan Room").
export function getLocationDisplayName(spot) {
  if (!spot) return "";
  if (spot.file && BACKGROUND_DISPLAY_NAMES[spot.file]) {
    return BACKGROUND_DISPLAY_NAMES[spot.file];
  }
  if (CHARACTER_ROOM_KEYS.has(spot.locationKey)) {
    return spot.locationKey.replace(/_/g, " ");
  }
  return spot.locationKey || "";
}

// Backgrounds available for a location right now, given the current time.
export function getAvailableBackgrounds(locationKey, now = new Date()) {
  const all = BACKGROUNDS_BY_LOCATION[locationKey] || [];
  return isEveningHour(now)
    ? all
    : all.filter((file) => !isEveningBackground(file));
}

// In the evening, a _PM background should usually be what a random pick
// lands on — not just occasionally alongside every regular background for
// that location. Each _PM file is repeated this many times in the weighted
// pool built below, so it's this many times as likely to be drawn as a
// regular one. A no-op during the day, since _PM files aren't in the list to
// begin with (getAvailableBackgrounds already excludes them), and a no-op
// for a location with no _PM variant at all.
export const EVENING_PM_WEIGHT = 3;

// Exported for direct, deterministic testing of the pool composition itself
// (see test/backgrounds-time-of-day.test.js) rather than asserting on the
// distribution of many random draws.
export function weightedBackgrounds(locationKey, now) {
  const out = [];
  for (const file of getAvailableBackgrounds(locationKey, now)) {
    const copies = isEveningBackground(file) ? EVENING_PM_WEIGHT : 1;
    for (let i = 0; i < copies; i++) out.push(file);
  }
  return out;
}

// NOTE: there is deliberately no "pick any location, then find who's there"
// helper here any more. /roam used to start that way, which made a character's
// odds of appearing an accident of how many backgrounds their house held and
// how many housemates they shared it with — a 1.73%-6.22% spread nobody
// authored. Both /roam and /meet now draw the character first and the setting
// second (getRandomBackgroundForCharacter below), so every character appears
// equally often and the background weighting is free to express flavor only.
// Reintroducing a location-first picker would reintroduce the skew.

// Picks a random background from everywhere a specific character could be
// found on their own turf: their house, plus their exclusive room if they
// have one (e.g. Jin's Frostheim + Jin_Room). Both pools are combined and
// drawn from once rather than picked between as two equal-odds options, so
// a location with more eligible backgrounds is proportionally more likely
// to come up — same principle getRandomBackground applies globally, just
// scoped to one character instead of every location. Returns null if the
// character has no attributed location with anything eligible right now
// (e.g. Benkei, who has no house) — callers fall back to
// getRandomGeneralBackground in that case.

// Every location a character can be encountered in.
//
// IMPORTANT: this is about scenery, not membership. Every character belongs to
// exactly one house — `character.house` — and that is the only field house
// standing is ever read from (see buildHouseMessage). `additionalHouses` and
// `additionalRooms` say nothing about who a character *is*; they only say where
// they can plausibly be found. Lyca is an Obscuary character who turns up
// around Hotarubi; Tohma is Frostheim, seen at Vagastrom and in Jin's room.
// Adding a key here widens where someone appears and changes nothing else —
// not their house, not their affinity, and (since the character is drawn before
// this is read) not how often they show up.
export function attributedLocations(character) {
  return [
    character.house,
    character.exclusiveRoom,
    ...(character.additionalHouses || []),
    ...(character.additionalRooms || []),
    ...(character.additionalLocations || []),
  ].filter(Boolean);
}

export function getRandomBackgroundForCharacter(character, now = new Date()) {
  const pool = [];
  for (const locationKey of attributedLocations(character)) {
    for (const file of weightedBackgrounds(locationKey, now)) {
      pool.push({ locationKey, file });
    }
  }
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

// Picks a random general-location background (any of Darkwick/Ultio/Galaxy Express/Clementia).
export function getRandomGeneralBackground(now = new Date()) {
  const keys = Object.values(GENERAL_LOCATIONS);
  const pool = [];
  for (const locationKey of keys) {
    for (const file of weightedBackgrounds(locationKey, now)) {
      pool.push({ locationKey, file });
    }
  }
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getBackgroundUrl(filename) {
  const baseUrl = process.env.BASE_URL || "";
  return `${baseUrl}/assets/bg/${filename}`;
}
