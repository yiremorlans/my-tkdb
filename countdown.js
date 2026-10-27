// Countdown channels (docs/countdown.md): /countdown setup, /event, the public
// /wishingwell list, and the scheduler's rename pass. Day counting, channel
// names and input validation are pure and live in constants/countdown.js;
// the Wishing Well dates are constants/wishingWell.js.
//
// Fully independent of public encounters and missions: nothing here reads
// guild_settings.enabled or missions_enabled.

import { optionValue } from './utils.js';
import {
  AUTOCOMPLETE_LIMIT,
  COUNTDOWN_KIND_LABEL,
  COUNTDOWN_KINDS,
  DEFAULT_COUNTDOWN_TIMEZONE,
  EVENT_CAP,
  EVENT_NAME_MAX,
  customEventChannelName,
  eventChoiceLabel,
  eventDateError,
  eventListLine,
  eventReference,
  localDateKey,
  normalizeEventName,
  resolveTimeZone,
  timeZoneChoices,
  upcomingEvents,
  wishingWellChannelName,
  wishingWellListMessage,
} from './constants/countdown.js';
import { WISHING_WELL_DATES } from './constants/wishingWell.js';
import { canManageEncounters } from './publicEncounters.js';
import { getChannel, renameChannel } from './discordRest.js';
import { ephemeral as plainEphemeral, userIdOf } from './missions/shared.js';
import {
  bumpCountdownRenameFailure,
  createCountdownEvent,
  deleteCountdownEvent,
  deletePastCountdownEvents,
  getCountdownGuilds,
  getCountdownSetup,
  getGuildSettings,
  listCountdownEvents,
  saveCountdownChannel,
  setCountdownTimezone,
  updateCountdownEvent,
} from './db/supabase.js';

// Discord allows ~2 name edits per channel per 10 minutes (§4). Spacing
// renames of one channel by at least this keeps every rename inside that.
const RENAME_GUARD_MS = 5 * 60 * 1000;

// Consecutive failed renames before a kind's channel is cleared (§9).
const RENAME_FAILURE_LIMIT = 3;

// The tick runs every 45s, but this pass reads Supabase at most this often,
// for the same free-tier reason TICK_INTERVAL_MS gives in
// encounterScheduler.js. A day's rename lands within this long after local
// midnight.
const PASS_INTERVAL_MS = 5 * 60 * 1000;
let lastPassAt = -Infinity;

/** Lets the next runCountdownPass run regardless of when the last one did. */
export function clearCountdownPassClock() {
  lastPassAt = -Infinity;
}

const CHANNEL_TYPE_CATEGORY = 4;

// Replies quote admin-typed event names, so mentions are never parsed.
function ephemeral(content) {
  return { ...plainEphemeral(content), allowed_mentions: { parse: [] } };
}

// A reply with no side effects to run afterward.
function replyOnly(content) {
  return { reply: ephemeral(content), afterReply: null };
}

// Missing permission (403) and deleted channel (404) are the channel's
// fault. A rate limit (429), a Discord outage (5xx) or a timeout/network
// error (no status) is Discord's, and the next pass retries it without
// counting toward the auto-disable.
function isTransientRenameError(err) {
  return err.status == null || err.status === 429 || err.status >= 500;
}

const NAME_LENGTH_ERROR = `Event names need 1 to ${EVENT_NAME_MAX} characters.`;

function takenByOtherKindReply(channelId, otherKind) {
  return replyOnly(`<#${channelId}> is already the ${COUNTDOWN_KIND_LABEL[otherKind]} countdown. Pick a different channel.`);
}

function renameFailureReason(err) {
  if (err.status === 403) return "I lost access to the channel or can't rename it (needs **View Channel** and **Manage Channels**).";
  if (err.status === 404) return 'The channel was deleted.';
  return `Discord refused the rename (${err.status}).`;
}

function channelName(kind, timezone, events, now) {
  return kind === 'wishingwell'
    ? wishingWellChannelName(WISHING_WELL_DATES, timezone, now)
    : customEventChannelName(events, timezone, now);
}

function guardActive(row, now) {
  return row?.renamed_at != null && now.getTime() - Date.parse(row.renamed_at) < RENAME_GUARD_MS;
}

// --- Render and rename -------------------------------------------------------

/**
 * Bring one configured countdown channel up to date: the one code path for
 * "what should this channel say", shared by the scheduler pass and the
 * immediate renames after /countdown timezone and /event (§4, §11).
 *
 * Renames only when the computed name differs from the last one written and
 * the 5-minute guard allows. Returns the outcome: 'unchanged', 'guarded',
 * 'renamed', 'retry' (rate limit or timeout, not counted), 'failed' or
 * 'disabled' (that failure was the third in a row).
 */
async function syncCountdownChannel(guildId, row, { timezone, events, now }) {
  const name = channelName(row.kind, timezone, events, now);
  if (name === row.rendered_name) return 'unchanged';
  if (guardActive(row, now)) return 'guarded';

  try {
    await renameChannel(row.channel_id, name);
  } catch (err) {
    if (isTransientRenameError(err)) {
      console.warn(`[countdown] Rename of ${row.kind} channel in guild ${guildId} deferred:`, err.message);
      return 'retry';
    }
    console.error(`[countdown] Rename of ${row.kind} channel in guild ${guildId} failed:`, err.message);
    const disabled = await bumpCountdownRenameFailure(
      guildId,
      row.kind,
      row.rename_failures,
      renameFailureReason(err),
      RENAME_FAILURE_LIMIT,
    );
    if (disabled) console.warn(`[countdown] Cleared ${row.kind} channel in guild ${guildId} after ${RENAME_FAILURE_LIMIT} failures`);
    return disabled ? 'disabled' : 'failed';
  }

  await saveCountdownChannel(guildId, row.kind, {
    rendered_name: name,
    renamed_at: now.toISOString(),
    rename_failures: 0,
    disabled_reason: null,
  });
  return 'renamed';
}

/**
 * Sync every row in `rows` (one guild's configured countdown channels).
 * Events are read only when a custom event channel needs them; any past ones
 * among them are pruned (§6). One row failing doesn't stop the other.
 */
async function syncGuildRows(guildId, rows, timezone, now) {
  let events = [];
  if (rows.some((row) => row.kind === 'customevent')) {
    events = await listCountdownEvents(guildId);
    const today = localDateKey(timezone, now);
    if (events.some((event) => event.event_date < today)) {
      await deletePastCountdownEvents(guildId, today);
    }
  }

  for (const row of rows) {
    try {
      await syncCountdownChannel(guildId, row, { timezone, events, now });
    } catch (err) {
      console.error(`[countdown] ${row.kind} sync failed for guild ${guildId}:`, err.message);
    }
  }
}

/**
 * Re-render `kinds` for one guild right now, from the `setup` the command
 * already read. Best effort: anything this misses (guard, rate limit, a
 * failed read) the next pass picks up.
 */
async function rerenderGuild(guildId, setup, kinds, now) {
  const rows = kinds.map((kind) => setup.channels[kind]).filter((row) => row?.channel_id);
  if (rows.length === 0) return;
  try {
    await syncGuildRows(guildId, rows, setup.timezone, now);
  } catch (err) {
    console.error(`[countdown] Immediate rename failed for guild ${guildId}:`, err.message);
  }
}

// Put a channel's saved name back (disable, or a countdown moving away).
// Best effort: the countdown is off either way, and a channel the bot can no
// longer reach can't be restored.
async function restoreOriginalName(guildId, row) {
  if (!row?.channel_id || !row.original_name) return;
  try {
    await renameChannel(row.channel_id, row.original_name);
  } catch (err) {
    console.warn(`[countdown] Could not restore ${row.kind} channel name in guild ${guildId}:`, err.message);
  }
}

// --- Scheduler pass ----------------------------------------------------------

/**
 * The countdown half of encounterScheduler.js's tick (§11). Throttled to one
 * Supabase read per PASS_INTERVAL_MS. Every guild with a countdown channel
 * set and not locked: sync each configured kind, pruning past events.
 *
 * All state is in countdown_channels, so the first pass after a restart
 * compares each computed name with `rendered_name` and fixes any drift.
 */
export async function runCountdownPass(now = new Date()) {
  if (now.getTime() - lastPassAt < PASS_INTERVAL_MS) return;
  lastPassAt = now.getTime();

  const guilds = await getCountdownGuilds();

  // Sequential, like the other passes: a handful of guilds, and one-at-a-time
  // renames keep the Discord rate-limit picture simple.
  for (const guild of guilds) {
    try {
      await syncGuildRows(guild.guild_id, guild.channels, guild.timezone, now);
    } catch (err) {
      console.error(`[countdown] Pass failed for guild ${guild.guild_id}:`, err.message);
    }
  }
}

// --- Shared gates --------------------------------------------------------------

// The guild, Manage Server and locked checks /countdown and /event share.
// Returns `{ guardReply }` on a refusal, else `{ setup }`.
//
// default_member_permissions is only a default an admin can override under
// Integrations, so the member's real permissions are re-checked here, the same
// as /encounters.
async function adminGate(body, commandName) {
  const guildId = body.guild_id;
  if (!guildId) return { guardReply: ephemeral('This only works in a server.') };

  if (!canManageEncounters(body.member)) {
    console.warn(`[countdown] Refused /${commandName} from ${userIdOf(body)} in ${guildId}: lacks Manage Server`);
    return { guardReply: ephemeral(`You need the **Manage Server** permission to use \`/${commandName}\`.`) };
  }

  const setup = await getCountdownSetup(guildId);
  if (setup.locked) {
    console.warn(`[countdown] Refused /${commandName} in locked guild ${guildId}`);
    return { guardReply: ephemeral("Countdowns aren't available in this server.") };
  }
  return { setup };
}

// `event:` is a STRING so autocomplete can match on the name as it's typed
// (an INTEGER field only takes digits). A picked choice's value is the #ID;
// a typed "#3" or "3" works too. Anything else reads as no event.
function eventNumberOption(options) {
  const match = /^#?(\d+)$/.exec(String(optionValue(options, 'event') ?? '').trim());
  return match ? Number(match[1]) : null;
}

// --- /countdown ----------------------------------------------------------------

/**
 * `/countdown wishingwell|customevent|timezone|status` and the
 * `/countdown disable wishingwell|customevent` group (§5).
 * Returns `{ reply, afterReply }`.
 */
export async function handleCountdownAdmin(body, now = new Date()) {
  const { guardReply, setup } = await adminGate(body, 'countdown');
  if (guardReply) return { reply: guardReply, afterReply: null };

  const guildId = body.guild_id;
  const userId = userIdOf(body);
  const top = body.data?.options?.[0];

  // `disable` is a subcommand group (type 2), so the kind is its subcommand
  // rather than a `which:` option.
  if (top?.type === 2 && top.name === 'disable') {
    return disableCountdown(guildId, top.options?.[0]?.name, setup);
  }

  switch (top?.name) {
    case 'wishingwell':
    case 'customevent':
      return setCountdownChannel(guildId, userId, top.name, optionValue(top.options, 'channel'), setup, now);
    case 'timezone':
      return setTimezone(guildId, optionValue(top.options, 'tz'), setup, now);
    case 'status':
      return replyOnly(countdownStatus(setup));
    default:
      return replyOnly('Unknown subcommand.');
  }
}

async function setCountdownChannel(guildId, userId, kind, channelId, setup, now) {
  if (!channelId) return replyOnly('Pick a channel to rename.');

  const other = COUNTDOWN_KINDS.find((k) => k !== kind);
  if (setup.channels[other]?.channel_id === channelId) return takenByOtherKindReply(channelId, other);

  // Independent reads: the channel from Discord, the events from Supabase.
  const [channelRead, events] = await Promise.all([
    getChannel(channelId).then((channel) => ({ channel }), (err) => ({ err })),
    kind === 'customevent' ? listCountdownEvents(guildId) : [],
  ]);
  if (channelRead.err) {
    if (channelRead.err.status === 403 || channelRead.err.status === 404) return cantSeeReply(channelId);
    throw channelRead.err;
  }
  const { channel } = channelRead;

  const current = setup.channels[kind];
  const sameChannel = current?.channel_id === channelId;
  const name = channelName(kind, setup.timezone, events, now);

  // Re-running on the channel it already renames keeps the name saved the
  // first time; the channel's current name is the countdown's own. Same when
  // the channel still carries the countdown's last name after an
  // auto-disable (§9), which keeps `rendered_name` for exactly this.
  const stillShowsCountdown =
    current?.original_name && current.rendered_name && channel.name === current.rendered_name;
  const originalName = sameChannel || stillShowsCountdown ? current.original_name : channel.name;

  const rename = await renameAtSetup(channelId, name, sameChannel ? current : null, now);
  if (rename.refusal) return rename.refusal;
  const kept = sameChannel ? current : {};

  const saved = await saveCountdownChannel(guildId, kind, {
    channel_id: channelId,
    original_name: originalName,
    rendered_name: rename.renamed ? name : kept.rendered_name ?? null,
    renamed_at: rename.renamed ? now.toISOString() : kept.renamed_at ?? null,
    rename_failures: 0,
    disabled_reason: null,
    configured_by: userId,
  });
  if (!saved) {
    // Lost a race with the other kind claiming this channel at the same
    // moment. Undo the rename so the other countdown's name stands.
    if (rename.renamed && !sameChannel) {
      await restoreOriginalName(guildId, { kind, channel_id: channelId, original_name: originalName });
    }
    return takenByOtherKindReply(channelId, other);
  }

  const movedFrom = current?.channel_id && !sameChannel ? current : null;
  const noEvents =
    kind === 'customevent' && upcomingEvents(events, localDateKey(setup.timezone, now)).length === 0;
  return {
    reply: ephemeral(
      setupReplyLines({ kind, channel, name, pending: rename.pending, movedFrom, noEvents, timezone: setup.timezone })
        .join('\n'),
    ),
    afterReply: movedFrom ? () => restoreOriginalName(guildId, movedFrom) : null,
  };
}

function cantSeeReply(channelId) {
  return replyOnly(`I can't see <#${channelId}>. Give me **View Channel** there and try again.`);
}

// Setup's immediate rename, which doubles as the Manage Channels check: a 403
// refuses the setup before anything is saved, so a channel the bot can't
// rename is never stored (§5). `current` is the row when setup is re-run on
// the channel it already renames, else null. Returns `{ refusal }`, or
// `{ renamed, pending }` where pending means the guard or a rate limit held
// the rename for the next pass.
async function renameAtSetup(channelId, name, current, now) {
  if (name === current?.rendered_name) return { renamed: false, pending: false };
  if (guardActive(current, now)) return { renamed: false, pending: true };

  try {
    await renameChannel(channelId, name);
    return { renamed: true, pending: false };
  } catch (err) {
    if (err.status === 403) {
      return {
        refusal: replyOnly(`I need **Manage Channels** on <#${channelId}> to rename it. Add it there and try again.`),
      };
    }
    if (err.status === 404) return { refusal: cantSeeReply(channelId) };
    if (!isTransientRenameError(err)) throw err;
    return { renamed: false, pending: true };
  }
}

function setupReplyLines({ kind, channel, name, pending, movedFrom, noEvents, timezone }) {
  const lines = [
    pending
      ? `<#${channel.id}> will read **${name}** within a few minutes. Discord limits how often a channel can be renamed.`
      : `<#${channel.id}> now reads **${name}**.`,
  ];
  if (movedFrom) {
    lines.push(`The ${COUNTDOWN_KIND_LABEL[kind]} countdown moved here from <#${movedFrom.channel_id}>, which gets its old name back.`);
  }
  lines.push(`Days are counted in **${timezone}**. Change that with \`/countdown timezone\`.`);
  if (noEvents) lines.push('Add events with `/event create`.');
  lines.push(
    channel.type === CHANNEL_TYPE_CATEGORY
      ? "Recommended for @everyone on this category: **View Channel** allow, nothing else. Don't deny Connect on a category: voice channels synced under it inherit that."
      : 'Recommended for @everyone on this channel: **View Channel** allow, **Connect** deny, so it reads as a sign rather than a room.',
  );
  return lines;
}

async function setTimezone(guildId, input, setup, now) {
  const timezone = resolveTimeZone(input);
  if (!timezone) {
    return replyOnly(`I don't recognize \`${input ?? ''}\` as a timezone. Pick one from the list, e.g. America/New_York or Asia/Tokyo.`);
  }

  await setCountdownTimezone(guildId, timezone);
  return {
    reply: ephemeral(
      `Countdown days now follow **${timezone}**, where today is ${localDateKey(timezone, now)}. Event dates already entered stay the same dates.`,
    ),
    // The day count can shift by one either way, for both kinds (§4).
    afterReply: () => rerenderGuild(guildId, { ...setup, timezone }, COUNTDOWN_KINDS, now),
  };
}

async function disableCountdown(guildId, kind, setup) {
  const label = COUNTDOWN_KIND_LABEL[kind];
  if (!label) return replyOnly('Unknown subcommand.');

  const row = setup.channels[kind];
  if (!row?.channel_id) {
    return replyOnly(`The ${label} countdown isn't set up.`);
  }

  await saveCountdownChannel(guildId, kind, {
    channel_id: null,
    rendered_name: null,
    rename_failures: 0,
    disabled_reason: null,
  });

  const lines = [
    `The ${label} countdown is off.` +
      (row.original_name ? ` <#${row.channel_id}> gets its old name back (**${row.original_name}**).` : ''),
  ];
  if (kind === 'customevent') {
    lines.push('Your events are kept. Set a channel with `/countdown customevent` to pick up where you left off.');
  }
  return { reply: ephemeral(lines.join('\n')), afterReply: () => restoreOriginalName(guildId, row) };
}

function countdownStatus(setup) {
  const lines = COUNTDOWN_KINDS.map((kind) => {
    const label = COUNTDOWN_KIND_LABEL[kind];
    const heading = `**${label[0].toUpperCase()}${label.slice(1)}:**`;
    const row = setup.channels[kind];

    if (!row?.channel_id) {
      if (row?.disabled_reason) {
        return `${heading} ⚠️ Stopped after ${RENAME_FAILURE_LIMIT} failed renames in a row. ${row.disabled_reason} Run \`/countdown ${kind}\` to set it up again.`;
      }
      return `${heading} off. Set it up with \`/countdown ${kind}\`.`;
    }

    const shows = row.rendered_name
      ? `reads **${row.rendered_name}**`
      : 'waiting for its first rename';
    const renamed = row.renamed_at
      ? `, last renamed <t:${Math.floor(Date.parse(row.renamed_at) / 1000)}:R>`
      : '';
    const failures = row.rename_failures
      ? ` ⚠️ ${row.rename_failures} recent rename${row.rename_failures === 1 ? '' : 's'} failed; after ${RENAME_FAILURE_LIMIT} in a row I'll stop.`
      : '';
    return `${heading} <#${row.channel_id}> ${shows}${renamed}.${failures}`;
  });
  lines.push(`**Timezone:** ${setup.timezone}`);
  return lines.join('\n');
}

// --- /event ----------------------------------------------------------------------

/**
 * `/event create|edit|delete|list` (§6). Manage Server, all of it, `list`
 * included. Create, edit and delete re-render the custom event channel in
 * afterReply. Returns `{ reply, afterReply }`.
 */
export async function handleEvent(body, now = new Date()) {
  const { guardReply, setup } = await adminGate(body, 'event');
  if (guardReply) return { reply: guardReply, afterReply: null };

  const guildId = body.guild_id;
  const sub = body.data?.options?.[0];
  const today = localDateKey(setup.timezone, now);
  const rerender = () => rerenderGuild(guildId, setup, ['customevent'], now);
  const noChannelNote = setup.channels.customevent?.channel_id
    ? ''
    : '\nNo custom event channel is set, so nothing shows it yet. Set one with `/countdown customevent`.';

  const noSuchEvent = (eventNumber) =>
    eventNumber == null
      ? 'Pick an event from the list.'
      : `There's no event #${eventNumber}. \`/event list\` shows them all.`;

  if (sub?.name === 'create') {
    const name = normalizeEventName(optionValue(sub.options, 'name'));
    if (!name) return replyOnly(NAME_LENGTH_ERROR);
    const date = String(optionValue(sub.options, 'date') ?? '').trim();
    const dateError = eventDateError(date, today);
    if (dateError) return replyOnly(dateError);

    const eventNumber = await createCountdownEvent(guildId, {
      name,
      date,
      userId: userIdOf(body),
      today,
      cap: EVENT_CAP,
    });
    if (eventNumber == null) {
      return replyOnly(`This server already has ${EVENT_CAP} events, the most it can hold. Remove one with \`/event delete\` first.`);
    }
    const added = eventReference({ name, event_date: date, event_number: eventNumber });
    return { reply: ephemeral(`Added ${added}.${noChannelNote}`), afterReply: rerender };
  }

  if (sub?.name === 'edit') {
    const eventNumber = eventNumberOption(sub.options);
    const rawName = optionValue(sub.options, 'name');
    const rawDate = optionValue(sub.options, 'date');
    if (rawName == null && rawDate == null) {
      return replyOnly('Give a new name, a new date, or both.');
    }

    const patch = {};
    if (rawName != null) {
      patch.name = normalizeEventName(rawName);
      if (!patch.name) return replyOnly(NAME_LENGTH_ERROR);
    }
    if (rawDate != null) {
      patch.event_date = String(rawDate).trim();
      const dateError = eventDateError(patch.event_date, today);
      if (dateError) return replyOnly(dateError);
    }

    const updated = await updateCountdownEvent(guildId, eventNumber, patch);
    if (!updated) return replyOnly(noSuchEvent(eventNumber));
    return { reply: ephemeral(`Updated ${eventReference(updated)}.`), afterReply: rerender };
  }

  if (sub?.name === 'delete') {
    const eventNumber = eventNumberOption(sub.options);
    const removed = await deleteCountdownEvent(guildId, eventNumber);
    if (!removed) return replyOnly(noSuchEvent(eventNumber));
    return { reply: ephemeral(`Deleted ${eventReference(removed)}`), afterReply: rerender };
  }

  if (sub?.name === 'list') {
    const events = upcomingEvents(await listCountdownEvents(guildId), today);
    if (events.length === 0) {
      return replyOnly('No events yet. Add one with `/event create`.');
    }
    return replyOnly(events.map(eventListLine).join('\n'));
  }

  return replyOnly('Unknown subcommand.');
}

// --- Autocomplete ------------------------------------------------------------------

// The focused option, at any depth (subcommand or group).
function focusedOption(options) {
  for (const option of options || []) {
    if (option.focused) return option;
    const nested = focusedOption(option.options);
    if (nested) return nested;
  }
  return null;
}

/**
 * Choices for `/countdown timezone tz:` and `/event edit|delete event:`.
 * Returns an array of `{ name, value }`, empty on anything unexpected.
 */
export async function countdownAutocomplete(body, now = new Date()) {
  const focused = focusedOption(body.data?.options);
  if (!focused) return [];

  if (body.data.name === 'countdown' && focused.name === 'tz') {
    return timeZoneChoices(focused.value);
  }

  if (body.data.name === 'event' && focused.name === 'event') {
    if (!body.guild_id || !canManageEncounters(body.member)) return [];
    // Runs per keystroke inside a 3s budget: two independent reads at once,
    // and not the countdown_channels read getCountdownSetup would add.
    const [settings, events] = await Promise.all([
      getGuildSettings(body.guild_id),
      listCountdownEvents(body.guild_id),
    ]);
    if (settings?.locked) return [];
    const timezone = settings?.countdown_timezone || DEFAULT_COUNTDOWN_TIMEZONE;
    const needle = String(focused.value ?? '').toLowerCase();
    return upcomingEvents(events, localDateKey(timezone, now))
      .map((event) => ({ name: eventChoiceLabel(event), value: String(event.event_number) }))
      .filter((choice) => choice.name.toLowerCase().includes(needle))
      .slice(0, AUTOCOMPLETE_LIMIT);
  }

  return [];
}

// --- /wishingwell ------------------------------------------------------------------

/** The public, read-only date list (§8). Needs no setup and no database. */
export function handleWishingWell(now = new Date()) {
  return replyOnly(wishingWellListMessage(WISHING_WELL_DATES, now));
}
