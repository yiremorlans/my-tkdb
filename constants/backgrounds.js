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

export const GENERAL_LOCATIONS = {
  DARKWICK: 'Darkwick',
  ULTIO: 'Ultio',
  GALAXY: 'Galaxy',
  CLEMENTIA: 'Clementia',
};

// All location keys a background (and therefore an encounter) can belong to.
export const LOCATION_KEYS = { ...HOUSES, ...GENERAL_LOCATIONS };

// Backgrounds that only appear once the user's local time is past 6 PM
// live in this list by filename convention (ends in "_PM"). Discord
// interactions don't tell us the invoking user's timezone, so "evening"
// is judged against the bot server's local clock as a best-effort default.
const EVENING_SUFFIX = '_PM';

export function isEveningBackground(filename) {
  return filename.replace(/\.webp$/, '').endsWith(EVENING_SUFFIX);
}

export const BACKGROUNDS_BY_LOCATION = {
  [HOUSES.FROSTHEIM]: [
    'Frostheim_Balcony.webp',
    'Frostheim_Ballroom.webp',
    'Frostheim_Castle.webp',
    'Frostheim_Entrance.webp',
    'Frostheim_Entrance_PM.webp',
    'Frostheim_Jin_Entrance.webp',
    'Frostheim_Jin_Room.webp',
    'Frostheim_Jin_Room_PM.webp',
    'Frostheim_Vault.webp',
    'Frostheim_Vault_Entrance.webp',
  ],
  [HOUSES.VAGASTROM]: [
    'Vagastrom_Alan_Room.webp',
    'Vagastrom_Alan_Room_Entrance.webp',
    'Vagastrom_Back_Garage.webp',
    'Vagastrom_Corridor.webp',
    'Vagastrom_Garage.webp',
    'Vagastrom_Garage_PM.webp',
    'Vagastrom_Leo_Room.webp',
    'Vagastrom_Secret_Car.webp',
    'Vagastrom_Shohei_Room.webp',
    'Vagastrom_The_Pit.webp',
  ],
  [HOUSES.HOTARUBI]: [
    'Hotarubi_Bamboo_Forest.webp',
    'Hotarubi_Corridor.webp',
    'Hotarubi_Eternal_Bamboo.webp',
    'Hotarubi_Forest_2.webp',
    'Hotarubi_Garden.webp',
    'Hotarubi_Garden_PM.webp',
    'Hotarubi_Garden_Star_Festival.webp',
    'Hotarubi_Garden_Star_Festival_PM.webp',
    'Hotarubi_Harbor.webp',
    'Hotarubi_Harbor_Star_Festival.webp',
    'Hotarubi_Lake.webp',
    'Hotarubi_Lake_2.webp',
    'Hotarubi_Lake_PM.webp',
    'Hotarubi_Parlor.webp',
    'Hotarubi_Parlor_PM.webp',
    'Hotarubi_River.webp',
    'Hotarubi_Stall_Star_Festival.webp',
    'Hotarubi_Stall_Star_Festival_PM.webp',
    'Hotarubi_Subaru_Room.webp',
    'Hotarubi_Tea_Room.webp',
    'Hotarubi_Tea_Room_PM.webp',
    'Hotarubi_Temple.webp',
    'Hotarubi_Temple_PM.webp',
    'Hotarubi_Zenji_Room_PM.webp',
  ],
  [HOUSES.DIONYSIA]: [
    'Dionysia_Circus.webp',
    'Dionysia_Entrance.webp',
    'Dionysia_Workshop.webp',
  ],
  [HOUSES.MORTKRANKEN]: [
    'Mortkranken_Entrance.webp',
    'Mortkranken_Entrance_PM.webp',
    'Mortkranken_Examination_Room.webp',
    'Mortkranken_Examination_Room_2.webp',
    'Mortkranken_Examination_Room_PM.webp',
    'Mortkranken_Jiro_Room.webp',
    'Mortkranken_Lab.webp',
    'Mortkranken_Lab_PM.webp',
    'Mortkranken_Underpass.webp',
  ],
  [HOUSES.JABBERWOCK]: [
    'Jabberwock_Cave.webp',
    'Jabberwock_Cave_PM.webp',
    'Jabberwock_Dorm_Room.webp',
    'Jabberwock_Entrance.webp',
    'Jabberwock_Field.webp',
    'Jabberwock_Field_PM.webp',
    'Jabberwock_Kitchen.webp',
    'Jabberwock_Mountain_PM.webp',
    'Jabberwock_Ren_Room.webp',
    'Jabberwock_Ushi-Oni_Pen.webp',
  ],
  [HOUSES.OBSCUARY]: [
    'Obscuary_Bar.webp',
    'Obscuary_Edward_Room.webp',
    'Obscuary_Edward_Room_2.webp',
    'Obscuary_Edward_Room_Entrance.webp',
    'Obscuary_Entrance.webp',
    'Obscuary_Garden.webp',
    'Obscuary_Guest_Room.webp',
    'Obscuary_Lost_Forest.webp',
    'Obscuary_Rui_Room.webp',
  ],
  [HOUSES.SINOSTRA]: [
    'Sinostra_Auction_Hall.webp',
    'Sinostra_Auction_Hall_Cage.webp',
    'Sinostra_Casino.webp',
    'Sinostra_Casino_Nook.webp',
    'Sinostra_Taiga_Room.webp',
    'Sinostra_Taiga_Room_Entrance.webp',
    'Sinostra_VIP_Room.webp',
    'Sinostra_VIP_Room_Entrance.webp',
  ],
  [GENERAL_LOCATIONS.DARKWICK]: [
    'Camp_Darkwick.webp',
    'Darkwick_Artifact_Storeroom.webp',
    'Darkwick_Auditorium.webp',
    'Darkwick_Bus_Stop.webp',
    'Darkwick_Cafeteria.webp',
    'Darkwick_Cafeteria_Kitchen.webp',
    'Darkwick_Campus_Store.webp',
    'Darkwick_Classroom.webp',
    'Darkwick_Classroom_2.webp',
    'Darkwick_Corridor.webp',
    'Darkwick_Corridor_2.webp',
    'Darkwick_Corridor_3.webp',
    'Darkwick_Corridor_4.webp',
    'Darkwick_Corridor_PM.webp',
    'Darkwick_Counseling_Room.webp',
    'Darkwick_Courtyard.webp',
    'Darkwick_Courtyard_PM.webp',
    'Darkwick_Docks.webp',
    'Darkwick_Entrance.webp',
    'Darkwick_Food_Truck.webp',
    'Darkwick_Hospital_Room.webp',
    'Darkwick_Infirmary.webp',
    'Darkwick_Library.webp',
    'Darkwick_Main_Street.webp',
    'Darkwick_Mystery_Diner.webp',
    'Darkwick_Office.webp',
    'Darkwick_Office_PM.webp',
    'Darkwick_Staffroom.webp',
    'Darkwick_Substreet.webp',
    'Darkwick_Substreet_1.webp',
    'Darkwick_Substreet_3.webp',
    'Darkwick_Substreet_4.webp',
    'Darkwick_Substreet_5.webp',
    'Darkwick_Substreet_PM.webp',
    'Darkwick_Terrace.webp',
    'Darkwick_Training_Grounds.webp',
    'Darkwick_Underpass.webp',
  ],
  [GENERAL_LOCATIONS.ULTIO]: [
    'Ultio_Cave.webp',
    'Ultio_Jail_Cell.webp',
    'Ultio_Jail_Hall.webp',
  ],
  [GENERAL_LOCATIONS.GALAXY]: [
    'Galaxy_Express_AM.webp',
    'Galaxy_Express_PM.webp',
    'Galaxy_Express_Platform.webp',
    'Galaxy_Express_Space.webp',
    'Galaxy_Express_Station.webp',
  ],
  [GENERAL_LOCATIONS.CLEMENTIA]: [
    'Clementia_Attic.webp',
    'Clementia_Attic_PM.webp',
    'Clementia_Cathedral.webp',
    'Clementia_Cathedral_Corridor.webp',
    'Clementia_Cathedral_Hall.webp',
    'Clementia_Cathedral_Hall_PM.webp',
    'Clementia_Cathedral_PM.webp',
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
