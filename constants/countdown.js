// Countdown channels: the pure half (docs/countdown.md). Day counting in a
// server's timezone, the channel names, and validation for /countdown and
// /event input. Everything here is a plain function of its arguments; the
// handlers, the scheduler pass and every Discord call live in countdown.js.

// Discord servers have no timezone of their own, and a channel name is the
// same text for every viewer, so each server picks one calendar (§2).
// Pacific, so the daily flip lands at midnight on the West Coast and in the
// small hours further east: no North American member sees "Today!" before
// their own day starts.
export const DEFAULT_COUNTDOWN_TIMEZONE = "America/Los_Angeles";

export const COUNTDOWN_KINDS = ["wishingwell", "customevent"];

export const COUNTDOWN_KIND_LABEL = {
  wishingwell: "Wishing Well",
  customevent: "custom event",
};

// --- Calendar days ----------------------------------------------------------

// en-CA formats as YYYY-MM-DD, which sorts and compares as a string and is
// also what a Postgres DATE column round-trips as.
const dateKeyFormatters = new Map(); // timeZone -> Intl.DateTimeFormat

/** The local calendar date `now` falls on in `timeZone`, as `YYYY-MM-DD`. */
export function localDateKey(timeZone, now = new Date()) {
  let formatter = dateKeyFormatters.get(timeZone);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat("en-CA", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    dateKeyFormatters.set(timeZone, formatter);
  }
  return formatter.format(now);
}

// Whole days between two YYYY-MM-DD keys. Both are read as UTC midnights, so
// a DST change in the server's zone can't make a "day" 23 or 25 hours long.
function daysBetween(fromKey, toKey) {
  return Math.round((Date.parse(toKey) - Date.parse(fromKey)) / 86_400_000);
}

/** `YYYY-MM-DD` plus `days` calendar days. */
function addDays(dateKey, days) {
  const date = new Date(Date.parse(dateKey) + days * 86_400_000);
  return date.toISOString().slice(0, 10);
}

function countdownSuffix(days) {
  if (days === 0) return "Today!";
  return `in ${days} day${days === 1 ? "" : "s"}`;
}

// --- Channel names (§3) -----------------------------------------------------

/**
 * The Wishing Well channel's name. `dates` are Unix start times, each running
 * `durationSeconds`. While one is running the channel reads "Today!" on its
 * start day, then counts down to its end; the next start only shows once it
 * has ended. An upcoming start reads "Today!" for its whole local day.
 */
export function wishingWellChannelName(dates, durationSeconds, timeZone, now = new Date()) {
  const nowSeconds = now.getTime() / 1000;
  const today = localDateKey(timeZone, now);
  const localKey = (seconds) => localDateKey(timeZone, new Date(seconds * 1000));
  const starts = [...dates].sort((a, b) => a - b);

  const running = starts.find(
    (start) => start <= nowSeconds && nowSeconds < start + durationSeconds,
  );
  if (running !== undefined) {
    if (localKey(running) === today) return "💎 Wishing Well: Today!";
    const days = daysBetween(today, localKey(running + durationSeconds));
    if (days === 0) return "💎 Wishing Well: ends today";
    return `💎 Wishing Well: ends ${countdownSuffix(days)}`;
  }

  const next = starts.find((start) => start > nowSeconds);
  if (next === undefined) return "💎 Wishing Well: TBA";
  return `💎 Wishing Well: ${countdownSuffix(daysBetween(today, localKey(next)))}`;
}

/**
 * Events dated `today` or later, sorted by date then #ID (§6 `list`). The
 * first is what the channel shows: same-day ties go to the one created first.
 */
export function upcomingEvents(events, today) {
  return events
    .filter((event) => event.event_date >= today)
    .sort(
      (a, b) =>
        a.event_date.localeCompare(b.event_date) ||
        a.event_number - b.event_number,
    );
}

/**
 * The custom event channel's name. `events` are countdown_events rows, whose
 * `event_date` is already a local date.
 */
export function customEventChannelName(events, timeZone, now = new Date()) {
  const today = localDateKey(timeZone, now);
  const next = upcomingEvents(events, today)[0];
  if (!next) return "No events scheduled";
  return `${next.name}: ${countdownSuffix(daysBetween(today, next.event_date))}`;
}

// --- /event and /countdown input (§5, §6) -----------------------------------

// Keeps the name plus ": in 999 days" under Discord's 100-character channel
// name limit.
export const EVENT_NAME_MAX = 80;

// Wishing Well dates don't count toward this.
export const EVENT_CAP = 24;

// "~2 years out": far enough for any real plan, near enough to catch a typo
// like 2062.
const EVENT_MAX_DAYS_AHEAD = 730;

/** Trimmed, whitespace collapsed; null when empty or over EVENT_NAME_MAX. */
export function normalizeEventName(raw) {
  const name = String(raw ?? "").trim().replace(/\s+/g, " ");
  if (!name || name.length > EVENT_NAME_MAX) return null;
  return name;
}

/**
 * Why `date` can't be an event date, or null when it can. `today` is the
 * guild's local date, since event dates are local dates too.
 */
export function eventDateError(date, today) {
  const valid =
    /^\d{4}-\d{2}-\d{2}$/.test(date) &&
    // Date.parse rolls Feb 30 over to Mar 2; the round trip catches it.
    !Number.isNaN(Date.parse(date)) &&
    new Date(Date.parse(date)).toISOString().slice(0, 10) === date;
  if (!valid) return "Dates are written YYYY-MM-DD, e.g. 2026-11-14.";
  if (date < today) return "The date has to be today or later.";
  if (date > addDays(today, EVENT_MAX_DAYS_AHEAD)) {
    return "That's more than two years out. Check the year?";
  }
  return null;
}

/**
 * The canonical IANA name for `input` (`asia/tokyo` -> `Asia/Tokyo`), or null
 * when Intl doesn't recognize it.
 */
export function resolveTimeZone(input) {
  if (!input) return null;
  try {
    return new Intl.DateTimeFormat("en-US", { timeZone: input }).resolvedOptions()
      .timeZone;
  } catch {
    return null;
  }
}

// Discord shows at most 25 autocomplete choices.
export const AUTOCOMPLETE_LIMIT = 25;

// Built once: autocomplete asks on every keystroke.
const TIME_ZONES = Intl.supportedValuesOf("timeZone").map((zone) => ({
  zone,
  match: zone.toLowerCase(),
}));

/** Choices for `/countdown timezone tz:` matching what's been typed. */
export function timeZoneChoices(query) {
  const needle = String(query ?? "").toLowerCase().replace(/\s+/g, "_");
  return TIME_ZONES.filter(({ match }) => match.includes(needle))
    .slice(0, AUTOCOMPLETE_LIMIT)
    .map(({ zone }) => ({ name: zone, value: zone }));
}

// --- Event display (§6) -----------------------------------------------------

// Dates are local calendar dates, so they're formatted as UTC to stop the
// host's own zone shifting them a day.
const shortDate = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  month: "short",
  day: "2-digit",
});
const longDate = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  month: "short",
  day: "2-digit",
  year: "numeric",
});

/** `Nov 14 · Fan Meet · #3`, the autocomplete label for `event:`. */
export function eventChoiceLabel(event) {
  return `${shortDate.format(Date.parse(event.event_date))} · ${event.name} · #${event.event_number}`;
}

/** `"Fan Meet" (Nov 14) #3`, how replies name one event. */
export function eventReference(event) {
  return `"${event.name}" (${shortDate.format(Date.parse(event.event_date))}) #${event.event_number}`;
}

/** One `/event list` line: `Nov 14, 2026 - Fan Meet - #3`. */
export function eventListLine(event) {
  return `${longDate.format(Date.parse(event.event_date))} - ${event.name} - #${event.event_number}`;
}

// --- /wishingwell (§8) ------------------------------------------------------

/**
 * The public date list. Discord timestamps render in each viewer's own
 * timezone, so this needs no server setting. A running Wishing Well stays
 * listed, with its end time, until it ends.
 */
export function wishingWellListMessage(dates, durationSeconds, now = new Date()) {
  const nowSeconds = now.getTime() / 1000;
  const listed = [...dates]
    .sort((a, b) => a - b)
    .filter((start) => start + durationSeconds > nowSeconds);
  if (listed.length === 0) return "No Wishing Well dates announced yet.";
  return [
    "💎 Wishing Well Dates 💎",
    ...listed.map((start) => {
      if (start > nowSeconds) return `- <t:${start}:R> <t:${start}:F>`;
      const end = start + durationSeconds;
      return `- Live now, ends <t:${end}:R> <t:${end}:F>`;
    }),
  ].join("\n");
}
