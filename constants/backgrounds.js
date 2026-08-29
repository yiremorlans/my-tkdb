// Reference data for every playable location in assets/bg.
// Locations are grouped by "house" (a character's home turf) or as a
// GENERAL location, which any character can be encountered at regardless
// of their own house.

export const HOUSES = {
  FROSTHEIM: 'Frostheim',
  VAGASTROM: 'Vagastrom',
  HOTARUBI: 'Hotarubi',
  DIONYSIA: 'Dionysia',
  MORTKRANKEN: 'Mortkranken',
  JABBERWOCK: 'Jabberwock',
  OBSCUARY: 'Obscuary',
  SINOSTRA: 'Sinostra',
};

export const CHARACTER_ROOMS = {
  JIN: 'Jin_Room',
  ALAN: 'Alan_Room',
  LEO: 'Leo_Room',
  SHOHEI: 'Shohei_Room',
  SUBARU: 'Subaru_Room',
  ZENJI: 'Zenji_Room',
  JIRO: 'Jiro_Room',
  REN: 'Ren_Room',
  EDWARD: 'Edward_Room',
  RUI: 'Rui_Room',
  TAIGA: 'Taiga_Room',
};

export const GENERAL_LOCATIONS = {
  DARKWICK: 'Darkwick',
  ULTIO: 'Ultio',
  GALAXY: 'Galaxy',
  CLEMENTIA: 'Clementia',
};

// All location keys a background (and therefore an encounter) can belong to.
export const LOCATION_KEYS = { ...HOUSES, ...GENERAL_LOCATIONS, ...CHARACTER_ROOMS };

// Backgrounds that only appear once the user's local time is past 6 PM
// live in this list by filename convention (ends in "_PM"). Discord
// interactions don't tell us the invoking user's timezone, so "evening"
// is judged against the bot server's local clock as a best-effort default.
const EVENING_SUFFIX = '_PM';

export function isEveningBackground(filename) {
  return filename.replace(/\.png$/, '').endsWith(EVENING_SUFFIX);
}

export const BACKGROUNDS_BY_LOCATION = {
  [HOUSES.FROSTHEIM]: [
    'Frostheim_Balcony.png',
    'Frostheim_Ballroom.png',
    'Frostheim_Castle.png',
    'Frostheim_Entrance.png',
    'Frostheim_Entrance_PM.png',
    'Frostheim_Jin_Entrance.png',
    'Frostheim_Vault.png',
    'Frostheim_Vault_Entrance.png',
  ],
  [HOUSES.VAGASTROM]: [
    'Vagastrom_Back_Garage.png',
    'Vagastrom_Corridor.png',
    'Vagastrom_Garage.png',
    'Vagastrom_Garage_PM.png',
    'Vagastrom_Secret_Car.png',
    'Vagastrom_The_Pit.png',
  ],
  [HOUSES.HOTARUBI]: [
    'Hotarubi_Bamboo_Forest.png',
    'Hotarubi_Corridor.png',
    'Hotarubi_Eternal_Bamboo.png',
    'Hotarubi_Forest_2.png',
    'Hotarubi_Garden.png',
    'Hotarubi_Garden_PM.png',
    'Hotarubi_Garden_Star_Festival.png',
    'Hotarubi_Garden_Star_Festival_PM.png',
    'Hotarubi_Harbor.png',
    'Hotarubi_Harbor_Star_Festival.png',
    'Hotarubi_Lake.png',
    'Hotarubi_Lake_2.png',
    'Hotarubi_Lake_PM.png',
    'Hotarubi_Parlor.png',
    'Hotarubi_Parlor_PM.png',
    'Hotarubi_River.png',
    'Hotarubi_Stall_Star_Festival.png',
    'Hotarubi_Stall_Star_Festival_PM.png',
    'Hotarubi_Tea_Room.png',
    'Hotarubi_Tea_Room_PM.png',
    'Hotarubi_Temple.png',
    'Hotarubi_Temple_PM.png',
  ],
  [HOUSES.DIONYSIA]: [
    'Dionysia_Circus.png',
    'Dionysia_Entrance.png',
    'Dionysia_Workshop.png',
  ],
  [HOUSES.MORTKRANKEN]: [
    'Mortkranken_Entrance.png',
    'Mortkranken_Entrance_PM.png',
    'Mortkranken_Examination_Room.png',
    'Mortkranken_Examination_Room_2.png',
    'Mortkranken_Examination_Room_PM.png',
    'Mortkranken_Lab.png',
    'Mortkranken_Lab_PM.png',
    'Mortkranken_Underpass.png',
  ],
  [HOUSES.JABBERWOCK]: [
    'Jabberwock_Cave.png',
    'Jabberwock_Cave_PM.png',
    'Jabberwock_Dorm_Room.png',
    'Jabberwock_Entrance.png',
    'Jabberwock_Field.png',
    'Jabberwock_Field_PM.png',
    'Jabberwock_Kitchen.png',
    'Jabberwock_Mountain_PM.png',
    'Jabberwock_Ushi-Oni_Pen.png',
  ],
  [HOUSES.OBSCUARY]: [
    'Obscuary_Bar.png',
    'Obscuary_Entrance.png',
    'Obscuary_Garden.png',
    'Obscuary_Guest_Room.png',
    'Obscuary_Lost_Forest.png',
  ],
  [HOUSES.SINOSTRA]: [
    'Sinostra_Auction_Hall.png',
    'Sinostra_Auction_Hall_Cage.png',
    'Sinostra_Casino.png',
    'Sinostra_Casino_Nook.png',
    'Sinostra_VIP_Room.png',
    'Sinostra_VIP_Room_Entrance.png',
  ],
  [GENERAL_LOCATIONS.DARKWICK]: [
    'Camp_Darkwick.png',
    'Darkwick_Artifact_Storeroom.png',
    'Darkwick_Auditorium.png',
    'Darkwick_Bus_Stop.png',
    'Darkwick_Cafeteria.png',
    'Darkwick_Cafeteria_Kitchen.png',
    'Darkwick_Campus_Store.png',
    'Darkwick_Classroom.png',
    'Darkwick_Classroom_2.png',
    'Darkwick_Corridor.png',
    'Darkwick_Corridor_2.png',
    'Darkwick_Corridor_3.png',
    'Darkwick_Corridor_4.png',
    'Darkwick_Corridor_PM.png',
    'Darkwick_Counseling_Room.png',
    'Darkwick_Courtyard.png',
    'Darkwick_Courtyard_PM.png',
    'Darkwick_Docks.png',
    'Darkwick_Entrance.png',
    'Darkwick_Food_Truck.png',
    'Darkwick_Hospital_Room.png',
    'Darkwick_Infirmary.png',
    'Darkwick_Library.png',
    'Darkwick_Main_Street.png',
    'Darkwick_Mystery_Diner.png',
    'Darkwick_Office.png',
    'Darkwick_Office_PM.png',
    'Darkwick_Staffroom.png',
    'Darkwick_Substreet.png',
    'Darkwick_Substreet_1.png',
    'Darkwick_Substreet_3.png',
    'Darkwick_Substreet_4.png',
    'Darkwick_Substreet_5.png',
    'Darkwick_Substreet_PM.png',
    'Darkwick_Terrace.png',
    'Darkwick_Training_Grounds.png',
    'Darkwick_Underpass.png',
  ],
  [GENERAL_LOCATIONS.ULTIO]: [
    'Ultio_Cave.png',
    'Ultio_Jail_Cell.png',
    'Ultio_Jail_Hall.png',
  ],
  [GENERAL_LOCATIONS.GALAXY]: [
    'Galaxy_Express_AM.png',
    'Galaxy_Express_PM.png',
    'Galaxy_Express_Platform.png',
    'Galaxy_Express_Space.png',
    'Galaxy_Express_Station.png',
  ],
  [GENERAL_LOCATIONS.CLEMENTIA]: [
    'Clementia_Attic.png',
    'Clementia_Attic_PM.png',
    'Clementia_Cathedral.png',
    'Clementia_Cathedral_Corridor.png',
    'Clementia_Cathedral_Hall.png',
    'Clementia_Cathedral_Hall_PM.png',
    'Clementia_Cathedral_PM.png',
  ],
  [CHARACTER_ROOMS.JIN]: [
    'Frostheim_Jin_Room.png',
    'Frostheim_Jin_Room_PM.png',
  ],
  [CHARACTER_ROOMS.ALAN]: [
    'Vagastrom_Alan_Room.png',
    'Vagastrom_Alan_Room_Entrance.png',
  ],
  [CHARACTER_ROOMS.LEO]: [
    'Vagastrom_Leo_Room.png',
  ],
  [CHARACTER_ROOMS.SHOHEI]: [
    'Vagastrom_Shohei_Room.png',
  ],
  [CHARACTER_ROOMS.SUBARU]: [
    'Hotarubi_Subaru_Room.png',
  ],
  [CHARACTER_ROOMS.ZENJI]: [
    'Hotarubi_Zenji_Room_PM.png',
  ],
  [CHARACTER_ROOMS.JIRO]: [
    'Mortkranken_Jiro_Room.png',
  ],
  [CHARACTER_ROOMS.REN]: [
    'Jabberwock_Ren_Room.png',
  ],
  [CHARACTER_ROOMS.EDWARD]: [
    'Obscuary_Edward_Room.png',
    'Obscuary_Edward_Room_2.png',
    'Obscuary_Edward_Room_Entrance.png',
  ],
  [CHARACTER_ROOMS.RUI]: [
    'Obscuary_Rui_Room.png',
  ],
  [CHARACTER_ROOMS.TAIGA]: [
    'Sinostra_Taiga_Room.png',
    'Sinostra_Taiga_Room_Entrance.png',
  ],
};

export function isGeneralLocation(locationKey) {
  return Object.values(GENERAL_LOCATIONS).includes(locationKey);
}

// Backgrounds available for a location right now, given the current time.
export function getAvailableBackgrounds(locationKey, now = new Date()) {
  const all = BACKGROUNDS_BY_LOCATION[locationKey] || [];
  const isEvening = now.getHours() >= 18;
  return isEvening ? all : all.filter((file) => !isEveningBackground(file));
}

// Picks a random location + background out of every location, weighted by
// how many eligible backgrounds each location currently has.
export function getRandomBackground(now = new Date()) {
  const entries = Object.keys(LOCATION_KEYS).map((key) => LOCATION_KEYS[key]);
  const pool = [];

  for (const locationKey of entries) {
    for (const file of getAvailableBackgrounds(locationKey, now)) {
      pool.push({ locationKey, file });
    }
  }

  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

// Picks a random background scoped to one specific location.
export function getRandomBackgroundForLocation(locationKey, now = new Date()) {
  const available = getAvailableBackgrounds(locationKey, now);
  if (available.length === 0) return null;
  return available[Math.floor(Math.random() * available.length)];
}

// Picks a random general-location background (any of Darkwick/Ultio/Galaxy/Clementia).
export function getRandomGeneralBackground(now = new Date()) {
  const keys = Object.values(GENERAL_LOCATIONS);
  const pool = [];
  for (const locationKey of keys) {
    for (const file of getAvailableBackgrounds(locationKey, now)) {
      pool.push({ locationKey, file });
    }
  }
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getBackgroundUrl(filename) {
  const baseUrl = process.env.BASE_URL || '';
  return `${baseUrl}/assets/bg/${filename}`;
}
