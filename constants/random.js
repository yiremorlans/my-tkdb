// A single home for the random-pick helper used across constants/. Both
// characters.js and publicEncounters.js need it, and publicEncounters.js
// imports from characters.js, so it can't live in either without a cycle —
// this module has no local imports, so it can sit under both.
export function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}
