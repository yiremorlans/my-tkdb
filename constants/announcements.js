// Announcements (docs/announcements.md): the notices themselves, and the pure
// helpers that pick which are live and render them. Delivery, the seen/claimed
// bookkeeping and the claim button live in ../announcements.js.
//
// Plain system voice, not character dialogue, so the house dialogue rules
// don't apply here.
//
// Two kinds:
//
//   maintenance  { id, kind: "maintenance", showFrom, startsAt, note?, testOnly? }
//     Shown once a day per player from `showFrom` until `startsAt`. Says when
//     the app goes down, never when it comes back (there is no fixed end).
//     It only informs: maintenance_mode is still flipped by hand in SQL.
//
//   reset        { id, kind: "reset", showFrom, endsAt, message, testOnly? }
//     Shown once a day per player from `showFrom` until `endsAt`, with a
//     button that banks one cooldown reset (clears both /roam and /meet,
//     spent from the cooldown reply like a mission's). Stops for a player once
//     they claim it.
//
// Times are ISO strings with an explicit offset, e.g.
// "2026-11-08T12:00:00-06:00" (US Central, the zone the server runs in).
// Players see them as Discord timestamps in their own timezone.
//
// `id` goes into the claim button's custom_id and the announcement_views
// table (migration 037), so never reuse or rename one that has gone out:
// a renamed reset would be claimable a second time. Lowercase letters,
// digits and dashes.
//
// `testOnly: true` shows the notice to OWNER_DISCORD_ID alone, for checking
// it live before release.
//
// Example:
//   {
//     id: "maint-2026-11-08",
//     kind: "maintenance",
//     showFrom: "2026-11-07T00:00:00-06:00",
//     startsAt: "2026-11-08T12:00:00-06:00",
//   },
//   {
//     id: "reset-2026-11-08",
//     kind: "reset",
//     showFrom: "2026-11-08T00:00:00-06:00",
//     endsAt: "2026-11-15T00:00:00-06:00",
//     message: "Thanks for waiting out the maintenance. Here's a free cooldown reset.",
//   },
export const ANNOUNCEMENTS = [
  {
    id: "maint-2026-11-08",
    kind: "maintenance",
    showFrom: "2026-11-06T00:00:00-05:00",
    startsAt: "2026-11-08T13:00:00-05:00", // 1 PM Eastern (EST, after DST ends 11/1)
  },
  {
    id: "reset-2026-11-08",
    kind: "reset",
    showFrom: "2026-11-08T13:00:00-05:00",
    endsAt: "2026-11-11T19:10:00-05:00", // claimable for 3 days from reopening
    message: "Thanks for waiting out the maintenance. Here's a free cooldown reset.",
  },
  {
    id: "maint-2026-11-14",
    kind: "maintenance",
    showFrom: "2026-11-12T00:00:00-05:00",
    startsAt: "2026-11-14T14:00:00-05:00", // 2 PM Eastern (EST)
  },
  {
    id: "reset-2026-11-14",
    kind: "reset",
    showFrom: "2026-11-14T14:00:00-05:00",
    endsAt: "2026-11-17T14:00:00-05:00", // claimable for 3 days from the start
    message: "Thanks for waiting out the maintenance. Here's a free cooldown reset.",
  },
];

export const ANNOUNCEMENT_KINDS = ["maintenance", "reset"];

export const CLAIM_BUTTON_LABEL = "Claim free cooldown reset"; // 25 chars, under MAX_BUTTON_LABEL_LENGTH

export const CLAIMED_LINE =
  "✅ Cooldown reset banked. Spend it from the `/roam` or `/meet` cooldown reply whenever you need it.";
export const ALREADY_CLAIMED_LINE = "You've already claimed this one.";
export const EXPIRED_LINE = "This offer has ended.";

const ID_PATTERN = /^[a-z0-9-]+$/;

// When a notice stops showing: maintenance at its start, a reset offer at its
// end.
function closesAt(notice) {
  return notice.kind === "maintenance" ? notice.startsAt : notice.endsAt;
}

/** True while `notice` is inside its showing window. */
export function isAnnouncementOpen(notice, now = new Date()) {
  const t = now.getTime();
  return (
    Date.parse(notice.showFrom) <= t && t < Date.parse(closesAt(notice))
  );
}

/**
 * The notices this player may be shown right now, maintenance first, then by
 * id so the order is stable. `isOwner` lets testOnly notices through.
 * Says nothing about whether they've already seen one today; the database
 * decides that (mark_announcements_shown, migration 037).
 */
export function openAnnouncements(
  isOwner,
  now = new Date(),
  announcements = ANNOUNCEMENTS,
) {
  return announcements
    .filter((a) => (isOwner || !a.testOnly) && isAnnouncementOpen(a, now))
    .sort(
      (a, b) =>
        (a.kind !== "maintenance") - (b.kind !== "maintenance") ||
        a.id.localeCompare(b.id),
    );
}

export function findAnnouncement(id, announcements = ANNOUNCEMENTS) {
  return announcements.find((a) => a.id === id) ?? null;
}

// "Sunday, November 8, 2026 at 12:00 PM (in 2 days)" in the viewer's own
// timezone. Discord has no weekday-and-time-only style; F is the closest.
function discordWhen(iso) {
  const seconds = Math.floor(Date.parse(iso) / 1000);
  return `<t:${seconds}:F> (<t:${seconds}:R>)`;
}

/** One notice's text, as it appears in the followup. */
export function announcementText(notice) {
  if (notice.kind === "maintenance") {
    const lines = [
      `🛠️ **Scheduled maintenance** starts ${discordWhen(notice.startsAt)}. The app will be unavailable until it's done.`,
    ];
    if (notice.note) lines.push(notice.note);
    return lines.join("\n");
  }
  return `🎁 ${notice.message}`;
}

/**
 * Startup check (constants/validateContent.js). Pushes a message per problem
 * into `errors`: a bad notice should fail the deploy, not go out broken.
 */
export function validateAnnouncements(
  errors,
  announcements = ANNOUNCEMENTS,
  maxLabel = Infinity,
) {
  const seen = new Set();
  for (const a of announcements) {
    const where = `announcement "${a?.id}"`;
    if (typeof a?.id !== "string" || !ID_PATTERN.test(a.id)) {
      errors.push(`${where}: id must be lowercase letters, digits and dashes`);
    }
    if (seen.has(a?.id)) errors.push(`${where}: duplicate id`);
    seen.add(a?.id);

    if (!ANNOUNCEMENT_KINDS.includes(a?.kind)) {
      errors.push(`${where}: kind must be one of ${ANNOUNCEMENT_KINDS.join(", ")}`);
      continue;
    }

    const dates = a.kind === "maintenance" ? ["showFrom", "startsAt"] : ["showFrom", "endsAt"];
    for (const key of dates) {
      // An offset is required: a bare "2026-11-08T12:00" would be read in the
      // host's zone, which is the very ambiguity Discord timestamps remove.
      if (typeof a[key] !== "string" || !/(Z|[+-]\d\d:\d\d)$/.test(a[key]) || Number.isNaN(Date.parse(a[key]))) {
        errors.push(`${where}: ${key} must be an ISO time with an offset`);
      }
    }
    if (Date.parse(a.showFrom) >= Date.parse(closesAt(a))) {
      errors.push(`${where}: showFrom must come before ${dates[1]}`);
    }
    if (a.kind === "reset" && !(typeof a.message === "string" && a.message.trim())) {
      errors.push(`${where}: a reset notice needs a message`);
    }
  }
  if (CLAIM_BUTTON_LABEL.length > maxLabel) {
    errors.push(`CLAIM_BUTTON_LABEL is ${CLAIM_BUTTON_LABEL.length} chars (max ${maxLabel})`);
  }
}
